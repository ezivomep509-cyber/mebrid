'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { Product, formatPrice } from '@/lib/products';

export default function AddToCartButton({ product }: { product: Product }) {
  const { add, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.find((i) => i.id === product.id);

  function handleAdd() {
    add({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      currency: product.currency,
      photo: product.main_photo,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAdd}
        disabled={!product.stock.in_stock && false /* даём добавлять даже предзаказ */}
        className="btn-primary flex-1 py-3"
      >
        {justAdded ? '✓ Добавлено' : inCart ? `В корзине: ${inCart.qty} · добавить ещё` : `Добавить · ${formatPrice(product.price, product.currency)}`}
      </button>
      <Link href="/cart" className="btn-outline py-3">
        Перейти в корзину
      </Link>
    </div>
  );
}
