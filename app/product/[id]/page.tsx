import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductById, formatPrice, discountPercent } from '@/lib/products';
import Gallery from '@/app/components/Gallery';
import AddToCartButton from '@/app/components/AddToCartButton';
import ProductCard from '@/app/components/ProductCard';

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const p = getProductById(params.id);
  if (!p) return { title: 'Товар не найден' };
  return {
    title: p.name,
    description: p.description.slice(0, 160),
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const discount = discountPercent(product.price, product.old_price);

  // Похожие товары: та же категория, другой продукт
  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-ink/50">
        <Link href="/" className="hover:text-ink">Главная</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-ink">Каталог</Link>
        <span>/</span>
        <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-ink">
          {product.category}
        </Link>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Галерея */}
        <Gallery photos={product.photos} alt={product.name} />

        {/* Правая колонка */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="chip">{product.category}</span>
            {product.stock.in_stock ? (
              <span className="chip bg-sage-50 text-sage-700">● {product.stock.label}</span>
            ) : (
              <span className="chip bg-clay-500/10 text-clay-600">● {product.stock.label}</span>
            )}
          </div>

          <h1 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-semibold">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.old_price && product.old_price > product.price && (
              <>
                <span className="text-lg text-ink/40 line-through">
                  {formatPrice(product.old_price, product.currency)}
                </span>
                {discount && (
                  <span className="rounded-full bg-clay-500 px-2.5 py-1 text-xs font-semibold text-white">
                    −{discount}%
                  </span>
                )}
              </>
            )}
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>

          {product.description && (
            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink/50">
                Описание
              </h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-ink/80">
                {product.description}
              </div>
            </div>
          )}

          {product.specs.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink/50">
                Характеристики
              </h2>
              <dl className="divide-y divide-ink/5 rounded-2xl bg-white ring-1 ring-ink/5">
                {product.specs.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1.5fr] gap-3 px-4 py-2.5 text-sm">
                    <dt className="text-ink/50">{s.key || '—'}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-semibold">Похожие товары</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
