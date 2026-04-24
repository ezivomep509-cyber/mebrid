import Link from 'next/link';
import { Suspense } from 'react';
import SearchBar from './SearchBar';
import CartBadge from './CartBadge';
import { site, contacts } from '@/lib/site';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-cream/85 backdrop-blur">
      {/* Верхняя полоска: телефон, адрес, часы */}
      <div className="hidden border-b border-ink/5 bg-sage-50/50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-ink/60 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {contacts.address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {contacts.workingHours}
            </span>
          </div>
          <a
            href={`tel:${contacts.phoneTel}`}
            className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-sage-700"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {contacts.phone}
          </a>
        </div>
      </div>

      {/* Основная строка */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-9 w-9 rounded-full bg-sage-700" aria-hidden />
          <div className="leading-none">
            <div className="font-display text-xl font-semibold tracking-tight">{site.name}</div>
            <div className="mt-0.5 hidden text-[11px] text-ink/50 sm:block">мебель из ротанга с {site.yearFounded}</div>
          </div>
        </Link>

        <nav className="ml-4 hidden items-center gap-5 text-sm text-ink/70 lg:flex">
          <Link href="/catalog" className="hover:text-ink">Каталог</Link>
          <Link href="/delivery" className="hover:text-ink">Доставка</Link>
          <Link href="/about" className="hover:text-ink">О нас</Link>
          <Link href="/contacts" className="hover:text-ink">Контакты</Link>
        </nav>

        <Suspense fallback={<div className="ml-auto hidden md:block flex-1 max-w-md" />}>
          <SearchBar />
        </Suspense>

        {/* Телефон в шапке для мобильных */}
        <a href={`tel:${contacts.phoneTel}`} className="ml-auto flex items-center md:hidden">
          <svg className="h-5 w-5 text-sage-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>

        <div className="ml-2 md:ml-0">
          <CartBadge />
        </div>
      </div>

      <Suspense fallback={null}>
        <SearchBar mobile />
      </Suspense>
    </header>
  );
}
