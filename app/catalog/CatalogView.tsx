'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { data } from '@/lib/products';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'discount';

export default function CatalogView() {
  const params = useSearchParams();
  const router = useRouter();
  const { products, meta } = data;

  const q = (params.get('q') ?? '').toLowerCase().trim();
  const selectedBrands = params.getAll('brand');
  const selectedCategories = params.getAll('category');
  const inStockOnly = params.get('stock') === '1';
  const minP = params.get('min') ? Number(params.get('min')) : null;
  const maxP = params.get('max') ? Number(params.get('max')) : null;
  const sort = (params.get('sort') as SortKey) ?? 'popular';

  const [mobileFilters, setMobileFilters] = useState(false);

  // Применяем фильтры
  const filtered = useMemo(() => {
    let res = products.slice();
    if (q) {
      res = res.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (selectedBrands.length) res = res.filter((p) => selectedBrands.includes(p.brand));
    if (selectedCategories.length) res = res.filter((p) => selectedCategories.includes(p.category));
    if (inStockOnly) res = res.filter((p) => p.stock.in_stock);
    if (minP !== null) res = res.filter((p) => p.price >= minP);
    if (maxP !== null) res = res.filter((p) => p.price <= maxP);

    switch (sort) {
      case 'price-asc':
        res.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        res.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        res.sort((a, b) => {
          const da = a.old_price ? 1 - a.price / a.old_price : 0;
          const db = b.old_price ? 1 - b.price / b.old_price : 0;
          return db - da;
        });
        break;
      default:
        // оставляем исходный порядок
        break;
    }
    return res;
  }, [q, selectedBrands, selectedCategories, inStockOnly, minP, maxP, sort, products]);

  // Счётчики для фильтров — считаем на предварительно отфильтрованном множестве
  // (по всем критериям, кроме самой категории/бренда), чтобы числа были адекватные.
  const counts = useMemo(() => {
    const byBrand: Record<string, number> = {};
    const byCategory: Record<string, number> = {};
    let inStock = 0;
    for (const p of filtered) {
      byBrand[p.brand] = (byBrand[p.brand] ?? 0) + 1;
      byCategory[p.category] = (byCategory[p.category] ?? 0) + 1;
      if (p.stock.in_stock) inStock++;
    }
    return { byBrand, byCategory, inStock };
  }, [filtered]);

  const priceMin = Math.min(...products.map((p) => p.price));
  const priceMax = Math.max(...products.map((p) => p.price));

  function setSort(v: string) {
    const sp = new URLSearchParams(params.toString());
    if (v === 'popular') sp.delete('sort');
    else sp.set('sort', v);
    router.push(`/catalog?${sp.toString()}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold md:text-4xl">Каталог</h1>
        <p className="mt-1 text-sm text-ink/60">
          {q && (
            <>
              По запросу <span className="font-medium text-ink">«{q}»</span> ·{' '}
            </>
          )}
          найдено {filtered.length} из {meta.total}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Фильтры на десктопе */}
        <div className="hidden lg:block">
          <Filters
            brands={meta.brands}
            categories={meta.categories}
            priceMin={priceMin}
            priceMax={priceMax}
            counts={counts}
          />
        </div>

        {/* Контент */}
        <div>
          {/* Toolbar */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="btn-outline lg:hidden"
            >
              Фильтры
            </button>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-ink/50">Сортировка:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm focus:border-sage-700 focus:outline-none"
              >
                <option value="popular">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
                <option value="discount">По скидке</option>
              </select>
            </div>
          </div>

          {/* Активные чипы */}
          {(selectedBrands.length > 0 ||
            selectedCategories.length > 0 ||
            inStockOnly ||
            minP !== null ||
            maxP !== null) && (
            <div className="mb-5 flex flex-wrap gap-2">
              {selectedBrands.map((b) => (
                <ActiveChip key={`b-${b}`} label={b} />
              ))}
              {selectedCategories.map((c) => (
                <ActiveChip key={`c-${c}`} label={c} />
              ))}
              {inStockOnly && <ActiveChip label="В наличии" />}
              {(minP !== null || maxP !== null) && (
                <ActiveChip label={`Цена: ${minP ?? '…'} — ${maxP ?? '…'}`} />
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
              <div className="font-display text-xl font-semibold">Ничего не найдено</div>
              <p className="mt-2 text-sm text-ink/60">
                Попробуйте изменить фильтры или сбросить их.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Мобильная шторка фильтров */}
      {mobileFilters && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFilters(false)} />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-cream p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Фильтры</h2>
              <button onClick={() => setMobileFilters(false)} className="text-ink/50 hover:text-ink">✕</button>
            </div>
            <Filters
              brands={meta.brands}
              categories={meta.categories}
              priceMin={priceMin}
              priceMax={priceMax}
              counts={counts}
            />
            <button onClick={() => setMobileFilters(false)} className="btn-primary mt-6 w-full">
              Показать {filtered.length} товаров
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveChip({ label }: { label: string }) {
  return <span className="chip">{label}</span>;
}
