# 🪑 Мебрид — интернет-каталог

Сайт производителя мебели из искусственного ротанга — **mebrid.рф**.
Next.js 14 (App Router) + Tailwind, статический сайт (SSG), деплой на Vercel.

## Что уже есть

### Витрина
- **Главная** с героем, преимуществами, категориями, хитами и CTA-блоком шоурума
- **Каталог** с сеткой карточек (80 товаров, 11 категорий)
- **Фильтры**: бренд (Royal Family / Dajar), категория, диапазон цены, «только в наличии»
- **Поиск** по названию, бренду, категории, описанию
- **Сортировка** по цене и размеру скидки
- **URL-state**: фильтры и поиск отражаются в адресе, можно делиться ссылками
- **Страница товара** с галереей, лайтбоксом, характеристиками, похожими товарами
- **Корзина** с локальным сохранением (localStorage), оформление через ВКонтакте

### Юридические/информационные страницы
Всё, что обычно требует Яндекс.Директ для модерации:
- `/about` — О компании
- `/contacts` — Контакты + встроенная Яндекс.Карта
- `/delivery` — Доставка и оплата
- `/returns` — Возврат и обмен (по ЗоЗПП)
- `/privacy` — Политика конфиденциальности (по 152-ФЗ)
- `/terms` — Пользовательское соглашение
- `/offer` — Публичная оферта

> ⚠️ Тексты юридических страниц — рабочие шаблоны. Перед запуском рекламы их должен согласовать юрист.

### Техническое
- В шапке: адрес, часы работы, кликабельный телефон
- В футере: все юр. ссылки + реквизиты ИП (ИНН, ОГРНИП)
- `JSON-LD` разметка `LocalBusiness` в `<head>` — для сниппетов в поиске
- Автогенерируемые `sitemap.xml` и `robots.txt`
- Все контакты/реквизиты — в одном месте, `lib/site.ts`

## Структура проекта

```
.
├── app/
│   ├── layout.tsx                  # RootLayout + JSON-LD + CartProvider
│   ├── page.tsx                    # Главная
│   ├── catalog/                    # Каталог с фильтрами
│   ├── product/[id]/               # Страницы товаров (SSG)
│   ├── cart/                       # Корзина + модалка оформления VK
│   ├── about, contacts, delivery,  # Инфо-страницы
│   │   returns, privacy, terms, offer/
│   ├── components/
│   │   ├── Header, Footer          # Шапка/подвал с реквизитами
│   │   ├── SearchBar, CartBadge    # Вложенные клиентские блоки
│   │   ├── Filters, ProductCard    # Каталог
│   │   ├── Gallery, AddToCartButton # Карточка товара
│   │   └── LegalPage               # Обёртка для текстовых страниц
│   ├── sitemap.ts, robots.ts       # SEO
│   └── globals.css
├── lib/
│   ├── site.ts                     # Все контакты/реквизиты
│   ├── products.ts                 # Типы + доступ к JSON
│   └── cart.tsx                    # Корзина + формирование заказа
├── data/
│   └── products.json               # 80 товаров (собираются из Excel)
├── scripts/
│   ├── royfamily.xlsx              # Исходник 1
│   ├── dajar-products.xlsx         # Исходник 2 (переведён на рус.)
│   ├── build-data.py               # Конвертер xlsx → JSON
│   └── cloudinary-upload.ipynb     # Colab-ноутбук для миграции фото
└── README.md
```

## Локальная разработка

```bash
npm install
npm run dev          # → http://localhost:3000
```

Если меняли Excel:

```bash
pip install pandas openpyxl
npm run build-data   # пересобирает data/products.json
```

## Деплой на Vercel

Через GitHub (рекомендую):

```bash
git init
git add .
git commit -m "feat: initial mebrid site"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Далее [vercel.com/new](https://vercel.com/new) → Import → Deploy.
Домен `mebrid.рф` в Vercel: Project → Settings → Domains → Add.

## Миграция фото в Cloudinary

В `scripts/cloudinary-upload.ipynb` лежит готовый Colab-ноутбук:

1. Откройте [colab.research.google.com](https://colab.research.google.com) → `File → Upload notebook` → выберите `.ipynb`
2. Загрузите через панель слева нужный Excel (`royfamily.xlsx` или `dajar-products.xlsx`)
3. В ячейке настроек впишите Cloudinary credentials:
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (со страницы Dashboard в Cloudinary)
4. `Runtime → Run all`
5. Скачайте получившийся `*-cloudinary.xlsx`
6. Положите в `scripts/`, переименовав обратно в `royfamily.xlsx` / `dajar-products.xlsx`
7. `npm run build-data` — пересоберёт JSON с новыми Cloudinary-ссылками

После этого раскомментируйте в `next.config.js`:

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'res.cloudinary.com' },
  ],
  // Можно включить оптимизацию, когда все фото на Cloudinary
  unoptimized: false,
}
```

## Как обновлять контент

**Товары, цены, названия** — правите xlsx → `npm run build-data` → commit → Vercel сам пересоберёт.

**Контакты компании, реквизиты, режим работы** — всё в одном файле: `lib/site.ts`.

**Юр.тексты** — в `app/<page>/page.tsx` соответствующей страницы. Можно переписывать как обычный React, форматирование уже подключено.

## Что ещё имеет смысл сделать

- **Миграция фото в Cloudinary** — сделать через ноутбук (готово к запуску)
- **Оптимизация картинок** — включить после миграции
- **Яндекс.Метрика** — добавить скрипт в `layout.tsx`, настроить цели (клик по VK, клик по телефону)
- **Форма обратной связи** на `/contacts` — пока только прямые контакты; если нужна форма с отправкой на почту, добавим API Route + сервис типа Resend
- **Отдельный флоу «для юрлиц»** — если есть B2B-направление с безналом и УПД
- **Пагинация каталога** — сейчас все 80 товаров рендерятся разом, но при 500+ станет тяжело

---

**Реквизиты**
ИП Ханова Насиха Мирзариповна · ИНН 165000923810 · ОГРНИП 304165033400421
Набережные Челны, пр. Мира, 24А (ТЦ EuropaCenter) · +7 (8552) 50-20-61 · mebrid@yandex.ru
