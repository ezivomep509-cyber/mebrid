'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  currency: string;
  photo: string | null;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: number;
  totalAmount: number;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'mebrid-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add: CartContextValue['add'] = (item, qty = 1) => {
    setItems((curr) => {
      const existing = curr.find((i) => i.id === item.id);
      if (existing) {
        return curr.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...curr, { ...item, qty }];
    });
  };

  const remove: CartContextValue['remove'] = (id) =>
    setItems((curr) => curr.filter((i) => i.id !== id));

  const setQty: CartContextValue['setQty'] = (id, qty) =>
    setItems((curr) =>
      qty <= 0
        ? curr.filter((i) => i.id !== id)
        : curr.map((i) => (i.id === id ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const totalAmount = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, totalQty, totalAmount, ready }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

/**
 * Формирует текст заказа для отправки в VK или копирования.
 */
export function formatOrderMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    (i, idx) =>
      `${idx + 1}. ${i.name} — ${i.qty} шт. × ${formatRub(i.price)} = ${formatRub(i.price * i.qty)}`
  );
  return [
    'Здравствуйте! Хочу оформить заказ:',
    '',
    ...lines,
    '',
    `Итого: ${formatRub(total)}`,
  ].join('\n');
}

function formatRub(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
}
