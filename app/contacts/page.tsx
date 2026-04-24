import LegalPage from '../components/LegalPage';
import { site, contacts, company, social } from '@/lib/site';

export const metadata = { title: 'Контакты' };

export default function ContactsPage() {
  // Яндекс.Карта без API-ключа через iframe (поиск по адресу)
  const mapQuery = encodeURIComponent('Набережные Челны, проспект Мира, 24А');

  return (
    <LegalPage title="Контакты" subtitle={`Шоурум и склад в&nbsp;${contacts.city}`}>
      <div className="not-prose mb-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/5">
          <h2 className="font-display text-lg font-semibold">Связаться</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <span className="text-ink/50">Телефон: </span>
              <a href={`tel:${contacts.phoneTel}`} className="font-medium text-sage-700 hover:underline">
                {contacts.phone}
              </a>
            </li>
            <li>
              <span className="text-ink/50">E-mail: </span>
              <a href={`mailto:${contacts.email}`} className="font-medium text-sage-700 hover:underline">
                {contacts.email}
              </a>
            </li>
            <li>
              <span className="text-ink/50">ВКонтакте: </span>
              <a href={social.vkPage} target="_blank" rel="noopener noreferrer" className="font-medium text-sage-700 hover:underline">
                vk.com/mebrid
              </a>
            </li>
            <li>
              <span className="text-ink/50">Сообщение в VK: </span>
              <a href={social.vkMessage} target="_blank" rel="noopener noreferrer" className="font-medium text-sage-700 hover:underline">
                vk.me/mebrid
              </a>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/5">
          <h2 className="font-display text-lg font-semibold">Шоурум</h2>
          <p className="mt-3 text-sm text-ink/80">{contacts.address}</p>
          <p className="mt-2 text-sm text-ink/60">{contacts.workingHours}</p>
        </div>
      </div>

      <div className="not-prose mb-10 overflow-hidden rounded-2xl ring-1 ring-ink/5">
        <iframe
          src={`https://yandex.ru/map-widget/v1/?text=${mapQuery}&z=16`}
          width="100%"
          height="380"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          title="Карта проезда"
        />
      </div>

      <h2>Реквизиты</h2>
      <ul>
        <li><strong>{company.legalName}</strong></li>
        <li>ИНН: {company.inn}</li>
        <li>ОГРНИП: {company.ogrnip}</li>
        <li>Юридический адрес: уточняется</li>
      </ul>
    </LegalPage>
  );
}
