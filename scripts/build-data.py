"""
Конвертер xlsx → data/products.json
Читает оба файла, нормализует поля, парсит фото/характеристики.
Запуск: python scripts/build-data.py
"""
import pandas as pd
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
OUT = ROOT / "data" / "products.json"
OUT.parent.mkdir(exist_ok=True)

# Если есть объединённый products-all.xlsx — используем его (приоритет)
# иначе читаем два файла по отдельности (обратная совместимость)
MERGED_FILE = ROOT / "scripts" / "products-all.xlsx"

SOURCES = [
    {"file": ROOT / "scripts" / "royfamily.xlsx", "brand": "Royal Family", "brand_slug": "royfamily"},
    {"file": ROOT / "scripts" / "dajar-products.xlsx", "brand": "Dajar", "brand_slug": "dajar"},
]

# Маппинг названий брендов → slug для id товара
BRAND_SLUGS = {
    "Royal Family": "royfamily",
    "Dajar": "dajar",
}

# Порог ID для определения бренда в объединённом файле без колонки "Бренд".
# Royal Family ID: 5785..11968 (четырёхзначные)
# Dajar ID:        47524..464654 (пятизначные+)
# Порог 20000 даёт большой запас на расширение номенклатуры.
BRAND_ID_THRESHOLD = 20000

def detect_brand(product_id: int) -> tuple[str, str]:
    """По ID товара возвращает (brand_name, brand_slug)."""
    if product_id <= BRAND_ID_THRESHOLD:
        return ("Royal Family", "royfamily")
    return ("Dajar", "dajar")

def parse_photos(raw):
    """Разделяем по \n, убираем дубли (оригинал + -300x225 thumbnail)."""
    if not isinstance(raw, str):
        return []
    urls = [u.strip() for u in raw.split("\n") if u.strip()]
    # Удаляем thumbnail'ы, если есть полноразмерная версия
    full = set()
    thumbs = {}
    for u in urls:
        # типичные паттерны: -300x225, -150x150, _thumbnail_1024
        base = re.sub(r"-\d+x\d+(?=\.(jpe?g|png|webp))", "", u, flags=re.I)
        base = re.sub(r"_thumbnail_\d+(?=\.(jpe?g|png|webp))", "", base, flags=re.I)
        if base == u:
            full.add(u)
        else:
            thumbs.setdefault(base, u)
    result = list(full)
    for base, thumb in thumbs.items():
        if base not in full:
            result.append(thumb)
    # Возвращаем первые 10 — больше в галерее не нужно
    return result[:10]

def parse_specs(raw):
    """Парсим характеристики вида 'Ключ: значение' построчно."""
    if not isinstance(raw, str):
        return []
    specs = []
    for line in raw.split("\n"):
        line = line.strip()
        if not line:
            continue
        if ":" in line:
            k, _, v = line.partition(":")
            k, v = k.strip(), v.strip()
            if k and v:
                specs.append({"key": k, "value": v})
        else:
            specs.append({"key": "", "value": line})
    return specs

def parse_stock(raw):
    """Приводим наличие к {in_stock: bool, label: str}."""
    s = str(raw).lower() if pd.notna(raw) else ""
    if "out of stock" in s or "нет в наличии" in s:
        return {"in_stock": False, "label": str(raw)}
    if "предзаказ" in s and "в наличии" not in s:
        return {"in_stock": False, "label": str(raw)}
    if "in stock" in s or "в наличии" in s:
        return {"in_stock": True, "label": str(raw)}
    return {"in_stock": True, "label": str(raw) if pd.notna(raw) else "—"}

def slugify(text):
    """Простой slug: для ID в URL — используем brand-id, но нужен чистый idx."""
    return re.sub(r"[^a-z0-9-]+", "-", text.lower()).strip("-")

all_products = []

def build_product(row, brand: str, brand_slug: str):
    """Из строки датафрейма собирает dict продукта.
    Поля brand и url очищаются — поставщики и источники не должны
    светиться нигде на сайте, в HTML или JSON."""
    photos = parse_photos(row.get("Фото"))
    return {
        "id": f"{brand_slug}-{row['ID']}",
        "source_id": int(row["ID"]),
        "brand": "",            # скрыто
        "brand_slug": brand_slug,  # используется только для формирования id
        "category": str(row["Категория"]).strip() if pd.notna(row["Категория"]) else "",
        "name": str(row["Название"]).strip(),
        "url": "",              # скрыто
        "price": float(row["Цена"]) if pd.notna(row["Цена"]) else 0,
        "old_price": float(row["Старая цена (опционально)"]) if pd.notna(row.get("Старая цена (опционально)")) else None,
        "currency": str(row["Валюта"]).strip() if pd.notna(row.get("Валюта")) else "RUB",
        "stock": parse_stock(row.get("В наличии")),
        "photos": photos,
        "main_photo": photos[0] if photos else None,
        "description": str(row["Описание"]).strip() if pd.notna(row.get("Описание")) else "",
        "specs": parse_specs(row.get("Характеристики")),
    }


if MERGED_FILE.exists():
    # Режим 1: один объединённый файл. Бренд определяется по ID товара.
    print(f"→ Читаю объединённый файл: {MERGED_FILE.name}")
    df = pd.read_excel(MERGED_FILE)

    # Поддержка обоих вариантов — с колонкой "Бренд" и без неё
    has_brand_col = "Бренд" in df.columns

    for _, row in df.iterrows():
        pid = int(row["ID"])
        if has_brand_col:
            brand = str(row["Бренд"]).strip()
            brand_slug = BRAND_SLUGS.get(brand, brand.lower().replace(" ", "-"))
        else:
            brand, brand_slug = detect_brand(pid)
        all_products.append(build_product(row, brand, brand_slug))
else:
    # Режим 2: два отдельных файла (legacy)
    print("→ Объединённого файла нет, читаю по-отдельности")
    for src in SOURCES:
        if not src["file"].exists():
            print(f"  ⚠ {src['file'].name} не найден, пропускаю")
            continue
        df = pd.read_excel(src["file"])
        for _, row in df.iterrows():
            all_products.append(build_product(row, src["brand"], src["brand_slug"]))

# Собираем метаданные для фильтров
categories = sorted({p["category"] for p in all_products if p["category"]})
brands = sorted({p["brand"] for p in all_products})
currencies = sorted({p["currency"] for p in all_products})

output = {
    "products": all_products,
    "meta": {
        "total": len(all_products),
        "categories": categories,
        "brands": brands,
        "currencies": currencies,
    }
}

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"✓ Wrote {len(all_products)} products to {OUT}")
print(f"  Brands: {brands}")
print(f"  Categories: {len(categories)}")
print(f"  File size: {OUT.stat().st_size / 1024:.1f} KB")
