import Link from 'next/link';
import { site, company, contacts, social } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        {/* Колонка 1: бренд */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="inline-block h-9 w-9 rounded-full bg-sage-700" />
            <span className="font-display text-lg font-semibold">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-ink/60">{site.tagline}</p>
          <p className="mt-2 text-xs text-ink/50">Работаем с {site.yearFounded} года</p>

          <div className="mt-4 flex gap-2">
            <a
              href={social.vkPage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ВКонтакте"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-ink/10 transition hover:ring-sage-700"
            >
              <svg className="h-4 w-4 text-ink/70" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.7 7.5c.2-.5 0-.9-.8-.9h-2.5c-.7 0-1 .4-1.1.7 0 0-1.3 3.3-3.3 5.4-.6.6-.9.8-1.2.8-.2 0-.4-.2-.4-.7V7.5c0-.6-.2-.9-.7-.9H8.7c-.4 0-.6.3-.6.6 0 .6.9.7 1 2.5v3.7c0 .8-.1.9-.4.9-.8 0-3-3.3-4.3-7.1-.3-.7-.5-1-1.2-1H.7c-.7 0-.9.4-.9.7 0 .6 1 4.2 4.5 8.9 2.4 3.2 5.7 5 8.7 5 1.8 0 2.1-.4 2.1-1v-2.4c0-.7.1-.9.7-.9.4 0 1 .2 2.6 1.7 1.8 1.8 2.1 2.6 3.1 2.6h2.5c.7 0 1.1-.4.9-1-.2-.6-1.1-1.5-2.3-2.6-.6-.7-1.6-1.5-1.9-1.9-.4-.5-.3-.7 0-1.2 0 0 3.4-4.7 3.7-6.3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Колонка 2: каталог */}
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">Каталог</div>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/catalog" className="hover:underline">Все товары</Link></li>
            <li><Link href="/catalog?category=Комплекты+мебели+из+ротанга" className="hover:underline">Мебель из ротанга</Link></li>
            <li><Link href="/catalog?category=Алюминиевая+мебель+для+сада" className="hover:underline">Алюминиевая мебель</Link></li>
            <li><Link href="/catalog?category=Кресла+садовые" className="hover:underline">Кресла</Link></li>
            <li><Link href="/catalog?stock=1" className="hover:underline">В наличии</Link></li>
          </ul>
        </div>

        {/* Колонка 3: компания */}
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">Покупателю</div>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/about" className="hover:underline">О компании</Link></li>
            <li><Link href="/delivery" className="hover:underline">Доставка и оплата</Link></li>
            <li><Link href="/returns" className="hover:underline">Возврат и обмен</Link></li>
            <li><Link href="/contacts" className="hover:underline">Контакты</Link></li>
            <li><Link href="/offer" className="hover:underline">Публичная оферта</Link></li>
            <li><Link href="/privacy" className="hover:underline">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        {/* Колонка 4: контакты */}
        <div>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">Контакты</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`tel:${contacts.phoneTel}`} className="font-medium hover:underline">
                {contacts.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contacts.email}`} className="hover:underline">{contacts.email}</a>
            </li>
            <li className="text-ink/60">{contacts.workingHours}</li>
            <li className="text-ink/60">{contacts.address}</li>
          </ul>
        </div>
      </div>

      {/* Реквизиты — обязательно для Яндекса и закона */}
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-ink/50 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              © {new Date().getFullYear()} {company.legalName}. ИНН: {company.inn}. ОГРНИП: {company.ogrnip}.
            </div>
            <div>
              Сайт: <a href={site.url} className="hover:underline">{site.domain}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
