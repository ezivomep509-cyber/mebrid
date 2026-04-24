'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export type FilterProps = {
  brands: string[];
  categories: string[];
  priceMin: number;
  priceMax: number;
  counts: {
    byBrand: Record<string, number>;
    byCategory: Record<string, number>;
    inStock: number;
  };
};

export default function Filters({ brands, categories, priceMin, priceMax, counts }: FilterProps) {
  const router = useRouter();
  const params = useSearchParams();

  const update = useCallback(
    (key: string, value: string | null) => {
      const sp = new URLSearchParams(params.toString());
      if (value === null || value === '') sp.delete(key);
      else sp.set(key, value);
      router.push(`/catalog?${sp.toString()}`);
    },
    [params, router]
  );

  const toggle = useCallback(
    (key: string, value: string) => {
      const sp = new URLSearchParams(params.toString());
      const current = sp.getAll(key);
      if (current.includes(value)) {
        sp.delete(key);
        current.filter((v) => v !== value).forEach((v) => sp.append(key, v));
      } else {
        sp.append(key, value);
      }
      router.push(`/catalog?${sp.toString()}`);
    },
    [params, router]
  );

  const selectedBrands = params.getAll('brand');
  const selectedCategories = params.getAll('category');
  const inStockOnly = params.get('stock') === '1';
  const minP = params.get('min') ?? '';
  const maxP = params.get('max') ?? '';

  const hasAny =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    inStockOnly ||
    minP !== '' ||
    maxP !== '' ||
    params.get('q');

  function reset() {
    router.push('/catalog');
  }

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Фильтры</h2>
        {hasAny && (
          <button onClick={reset} className="text-xs text-ink/60 underline hover:text-ink">
            Сбросить
          </button>
        )}
      </div>

      {/* Бренд */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">Бренд</div>
        <div className="space-y-1.5">
          {brands.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggle('brand', b)}
                className="h-4 w-4 rounded border-ink/20 text-sage-700 focus:ring-sage-700"
              />
              <span className="flex-1">{b}</span>
              <span className="text-xs text-ink/40">{counts.byBrand[b] ?? 0}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Категория */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">Категория</div>
        <div className="max-h-72 space-y-1.5 overflow-auto pr-1">
          {categories.map((c) => (
            <label key={c} className="flex cursor-pointer items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c)}
                onChange={() => toggle('category', c)}
                className="mt-0.5 h-4 w-4 rounded border-ink/20 text-sage-700 focus:ring-sage-700"
              />
              <span className="flex-1 leading-tight">{c}</span>
              <span className="text-xs text-ink/40">{counts.byCategory[c] ?? 0}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Цена */}
      <div>
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
          Цена
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={String(priceMin)}
            value={minP}
            onChange={(e) => update('min', e.target.value)}
            className="input px-3 text-sm"
          />
          <span className="text-ink/40">—</span>
          <input
            type="number"
            placeholder={String(priceMax)}
            value={maxP}
            onChange={(e) => update('max', e.target.value)}
            className="input px-3 text-sm"
          />
        </div>
        <div className="mt-1 text-xs text-ink/40">Диапазон объединяет все валюты</div>
      </div>

      {/* Наличие */}
      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => update('stock', e.target.checked ? '1' : null)}
            className="h-4 w-4 rounded border-ink/20 text-sage-700 focus:ring-sage-700"
          />
          <span className="flex-1">Только в наличии</span>
          <span className="text-xs text-ink/40">{counts.inStock}</span>
        </label>
      </div>
    </aside>
  );
}
