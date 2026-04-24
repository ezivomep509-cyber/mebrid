'use client';

import { useCart } from '@/lib/cart';
import Link from 'next/link';

export default function CartBadge() {
  const { totalQty, ready } = useCart();
  return (
    <Link href="/cart" className="relative flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm hover:border-ink/40">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 1 1-8 0" />
      </svg>
      <span className="hidden sm:inline">Корзина</span>
      {ready && totalQty > 0 && (
        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sage-700 px-1.5 text-xs font-semibold text-white">
          {totalQty}
        </span>
      )}
    </Link>
  );
}
