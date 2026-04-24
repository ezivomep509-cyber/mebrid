'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product, formatPrice, discountPercent } from '@/lib/products';
import { useCart } from '@/lib/cart';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const discount = discountPercent(product.price, product.old_price);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5 transition hover:ring-ink/20">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-sage-50">
        {product.main_photo ? (
          <Image
            src={product.main_photo}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink/30">нет фото</div>
        )}
        {discount && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-clay-500 px-2.5 py-1 text-xs font-semibold text-white">
            −{discount}%
          </span>
        )}
        {!product.stock.in_stock && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-white">
            Под заказ
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2 text-xs text-ink/50">
          <span>{product.brand}</span>
          <span>·</span>
          <span className="truncate">{product.category}</span>
        </div>

        <Link href={`/product/${product.id}`} className="font-medium leading-snug hover:underline">
          {product.name}
        </Link>

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold">{formatPrice(product.price, product.currency)}</span>
            {product.old_price && product.old_price > product.price && (
              <span className="text-sm text-ink/40 line-through">{formatPrice(product.old_price, product.currency)}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              add({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                currency: product.currency,
                photo: product.main_photo,
              })
            }
            className="mt-3 w-full rounded-full border border-ink/15 bg-white py-2 text-sm font-medium transition hover:border-sage-700 hover:bg-sage-50"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
