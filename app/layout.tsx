import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { site, contacts, company } from '@/lib/site';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
  verification: {
    yandex: '9835bde2df17aef2',
  },
};

// JSON-LD для Яндекса/Google: организация + локальный бизнес
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  legalName: company.legalName,
  description: site.description,
  url: site.url,
  telephone: contacts.phone,
  email: contacts.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'пр. Мира, 24А, ТЦ «Мебельный EuropaCenter»',
    addressLocality: contacts.city,
    addressCountry: 'RU',
  },
  taxID: company.inn,
  foundingDate: String(site.yearFounded),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
