'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart, formatOrderMessage } from '@/lib/cart';
import { formatPrice } from '@/lib/products';
import { social, contacts } from '@/lib/site';

export default function CartPage() {
  const { items, remove, setQty, clear, totalAmount, totalQty, ready } = useCart();
  const [copied, setCopied] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  if (!ready) {
    return <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">Загрузка…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center">
        <h1 className="font-display text-3xl font-semibold">Корзина пуста</h1>
        <p className="mt-2 text-ink/60">Самое время выбрать что-то для дома или сада.</p>
        <Link href="/catalog" className="btn-primary mt-8 inline-flex">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const orderText = formatOrderMessage(items, totalAmount);

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }

  async function handleCheckout() {
    await copyOrder();
    setShowOrderModal(true);
  }

  function openVkAndClose() {
    window.open(social.vkMessage, '_blank', 'noopener,noreferrer');
    setShowOrderModal(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">Корзина</h1>
          <p className="mt-1 text-sm text-ink/60">
            {totalQty} {pluralize(totalQty)} в корзине
          </p>
        </div>
        <button onClick={clear} className="text-sm text-ink/60 underline hover:text-ink">
          Очистить
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/5">
              <Link href={`/product/${item.id}`} className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-sage-50">
                {item.photo && (
                  <Image src={item.photo} alt={item.name} fill sizes="96px" className="object-cover" />
                )}
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="text-xs text-ink/50">{item.brand}</div>
                <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                  {item.name}
                </Link>
                <div className="mt-1 text-sm text-ink/60">
                  {formatPrice(item.price, item.currency)} × {item.qty}
                </div>
                <div className="mt-auto flex items-center gap-3 pt-2">
                  <div className="inline-flex items-center rounded-full border border-ink/15">
                    <button onClick={() => setQty(item.id, item.qty - 1)} className="px-3 py-1 text-lg leading-none text-ink/60 hover:text-ink" aria-label="Уменьшить">−</button>
                    <span className="min-w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button onClick={() => setQty(item.id, item.qty + 1)} className="px-3 py-1 text-lg leading-none text-ink/60 hover:text-ink" aria-label="Увеличить">+</button>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-sm text-ink/50 hover:text-clay-600">
                    Удалить
                  </button>
                </div>
              </div>

              <div className="text-right font-display text-lg font-semibold">
                {formatPrice(item.price * item.qty, item.currency)}
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 ring-1 ring-ink/5">
          <h2 className="font-display text-xl font-semibold">Итого</h2>

          <div className="border-b border-ink/5 pb-4">
            <div className="flex justify-between text-sm">
              <span className="text-ink/60">Товары ({totalQty})</span>
              <span className="font-medium">{formatPrice(totalAmount)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-ink/60">Доставка</span>
              <span className="text-ink/60">по запросу</span>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-sm text-ink/60">К оплате</span>
              <span className="font-display text-2xl font-semibold">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <button onClick={handleCheckout} className="btn-primary w-full">
              Оформить через ВКонтакте
            </button>
            <a href={`tel:${contacts.phoneTel}`} className="btn-outline w-full text-sm">
              Позвонить · {contacts.phone}
            </a>
          </div>

          <p className="text-xs text-ink/50">
            При&nbsp;оформлении список заказа автоматически копируется в&nbsp;буфер обмена. Откроется диалог с&nbsp;менеджером — просто&nbsp;вставьте сообщение (Ctrl+V).
          </p>

          <Link href="/catalog" className="block text-center text-sm text-ink/60 hover:text-ink">
            ← Продолжить покупки
          </Link>
        </aside>
      </div>

      {/* Превью текста заказа */}
      <details className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
        <summary className="cursor-pointer text-sm font-medium text-ink/70">
          Посмотреть текст заказа
        </summary>
        <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-sage-50 p-4 text-xs text-ink/80">{orderText}</pre>
      </details>

      {/* Модалка: «текст скопирован, открыть VK» */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowOrderModal(false)}>
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-700">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold">
              {copied ? 'Список заказа скопирован' : 'Готово к отправке'}
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              Сейчас откроется диалог с&nbsp;нашим менеджером в&nbsp;ВКонтакте. Просто&nbsp;вставьте сообщение (<kbd className="rounded bg-sage-50 px-1.5 py-0.5 text-xs ring-1 ring-ink/10">Ctrl</kbd> + <kbd className="rounded bg-sage-50 px-1.5 py-0.5 text-xs ring-1 ring-ink/10">V</kbd>) и&nbsp;отправьте.
            </p>

            <div className="mt-4 max-h-40 overflow-y-auto rounded-lg bg-sage-50 p-3 text-xs text-ink/70">
              <pre className="whitespace-pre-wrap">{orderText}</pre>
            </div>

            {!copied && (
              <button
                onClick={copyOrder}
                className="btn-outline mt-3 w-full text-sm"
              >
                Скопировать текст заказа
              </button>
            )}

            <div className="mt-5 flex flex-col gap-2">
              <button onClick={openVkAndClose} className="btn-primary w-full">
                Открыть ВКонтакте →
              </button>
              <button onClick={() => setShowOrderModal(false)} className="text-sm text-ink/50 hover:text-ink">
                Закрыть
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-ink/40">
              Или позвоните: <a href={`tel:${contacts.phoneTel}`} className="underline">{contacts.phone}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function pluralize(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'товар';
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'товара';
  return 'товаров';
}
