import { Suspense } from 'react';
import CatalogView from './CatalogView';

export const metadata = {
  title: 'Каталог — Garden Atelier',
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">Загрузка…</div>}>
      <CatalogView />
    </Suspense>
  );
}
