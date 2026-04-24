'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');

  useEffect(() => {
    setQ(params.get('q') ?? '');
  }, [params]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams(params.toString());
    if (q) sp.set('q', q);
    else sp.delete('q');
    router.push(`/catalog?${sp.toString()}`);
  }

  return (
    <form onSubmit={submit} className={mobile ? 'px-4 pb-3 md:hidden' : 'ml-auto hidden flex-1 max-w-md md:block'}>
      <div className="relative">
        <input
          className="input pl-10"
          placeholder={mobile ? 'Поиск по каталогу' : 'Найти мебель, кресло, качели…'}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
    </form>
  );
}
