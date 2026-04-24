import Link from 'next/link';
import Image from 'next/image';
import { data } from '@/lib/products';
import { site, contacts } from '@/lib/site';
import ProductCard from './components/ProductCard';

export default function HomePage() {
  const { products, meta } = data;

  const categoryCounts = meta.categories
    .map((c) => ({ name: c, count: products.filter((p) => p.category === c).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const featured = products
    .filter((p) => p.old_price && p.old_price > p.price && p.stock.in_stock)
    .slice(0, 8);
  const filler = products.filter((p) => p.stock.in_stock && !featured.includes(p)).slice(0, 8 - featured.length);
  const featuredList = [...featured, ...filler].slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-b from-sage-50 to-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-ink/70 ring-1 ring-ink/10">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-700" />
              Производитель с {site.yearFounded} года · {meta.total} товаров
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
              Мебель из ротанга для&nbsp;<em className="font-normal italic text-sage-700">дома, террасы и&nbsp;бизнеса</em>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink/70">
              Стильная и&nbsp;надёжная мебель из&nbsp;искусственного ротанга и&nbsp;алюминия. Поможем подобрать идеальное решение для&nbsp;вашего пространства.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn-primary">
                Смотреть каталог
                <span aria-hidden>→</span>
              </Link>
              <a href={`tel:${contacts.phoneTel}`} className="btn-outline">
                {contacts.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { title: 'С 2016 года', text: 'Производим и продаём мебель из ротанга' },
            { title: 'Свой шоурум', text: `${contacts.city}, ТЦ EuropaCenter` },
            { title: 'Доставка по РФ', text: 'Уточняйте условия для вашего города' },
            { title: 'Подбор под задачу', text: 'Поможем выбрать для дома или бизнеса' },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-5 ring-1 ring-ink/5">
              <div className="font-display text-lg font-semibold">{f.title}</div>
              <div className="mt-1 text-sm text-ink/60">{f.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* КАТЕГОРИИ */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold">Категории</h2>
          <Link href="/catalog" className="text-sm text-ink/60 hover:text-ink">
            Все товары →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {categoryCounts.map(({ name, count }) => {
            const sample = products.find((p) => p.category === name && p.main_photo);
            return (
              <Link
                key={name}
                href={`/catalog?category=${encodeURIComponent(name)}`}
                className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl bg-sage-100 p-4 transition hover:ring-2 hover:ring-sage-700"
              >
                {sample?.main_photo && (
                  <Image
                    src={sample.main_photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw"
                    className="object-cover opacity-70 transition group-hover:opacity-90 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative">
                  <div className="text-sm font-medium leading-tight text-white">{name}</div>
                  <div className="text-xs text-white/70">{count} товаров</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ПОДБОРКА */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">Хиты продаж</h2>
            <p className="mt-1 text-sm text-ink/60">Лучшее по цене и в наличии</p>
          </div>
          <Link href="/catalog" className="text-sm text-ink/60 hover:text-ink">
            Все товары →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredList.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA с шоурумом */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-sage-700 px-6 py-12 text-white md:px-12">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                Приезжайте посмотреть мебель в&nbsp;шоурум
              </h2>
              <p className="mt-3 text-white/80">
                {contacts.address}. {contacts.workingHours}.
              </p>
            </div>
            <div className="flex flex-col gap-3 self-end md:items-end">
              <a href={`tel:${contacts.phoneTel}`} className="btn bg-white text-sage-900 hover:bg-cream">
                Позвонить · {contacts.phone}
              </a>
              <Link href="/contacts" className="btn border border-white/30 text-white hover:bg-white/10">
                Как нас найти →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
