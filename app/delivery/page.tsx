import Link from 'next/link';
import LegalPage from '../components/LegalPage';
import { contacts, social, site } from '@/lib/site';

export const metadata = { title: 'Доставка и оплата' };

const carriers = [
  {
    icon: '🚚',
    title: 'СДЭК',
    desc: 'До пункта выдачи или адреса. По всей России. Срок: 3–10 рабочих дней.',
  },
  {
    icon: '📦',
    title: 'ПЭК',
    desc: 'Грузовая доставка до терминала или адреса. Подходит для крупногабаритной мебели. Срок: 5–14 рабочих дней.',
  },
  {
    icon: '🚛',
    title: 'Деловые Линии',
    desc: 'Грузоперевозки по всей России. Подходит для комплектов мебели. Срок: 5–14 рабочих дней.',
  },
];

export default function DeliveryPage() {
  return (
    <LegalPage title="Доставка и оплата" subtitle="По всей России — СДЭК, ПЭК, Деловые Линии, самовывоз">
      {/* Карточки с ТК */}
      <div className="not-prose mb-10 grid gap-3 md:grid-cols-3">
        {carriers.map((c) => (
          <div key={c.title} className="flex gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink/5">
            <div className="text-2xl leading-none">{c.icon}</div>
            <div>
              <div className="text-sm font-semibold text-ink">{c.title}</div>
              <div className="mt-1 text-xs leading-relaxed text-ink/60">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Оплата */}
      <h2>Оплата</h2>

      <p><strong>В нашем шоуруме в Набережных Челнах:</strong></p>
      <ul>
        <li>наличными;</li>
        <li>банковской картой через платёжный терминал;</li>
        <li>переводом по СБП.</li>
      </ul>

      <p><strong>При заказе с доставкой в другой город:</strong></p>
      <ul>
        <li>переводом на карту по реквизитам менеджера;</li>
        <li>безналичный расчёт по счёту — для юридических лиц.</li>
      </ul>

      <p>Цена товара, согласованная при оформлении заказа, изменению не подлежит.</p>

      <div className="not-prose my-6 rounded-2xl border-l-4 border-sage-700 bg-sage-50 px-5 py-4 text-sm text-ink/80">
        Вопросы по оплате:{' '}
        <a href={social.vkMessage} target="_blank" rel="noopener noreferrer" className="font-semibold text-sage-700 underline">
          написать менеджеру в ВКонтакте
        </a>{' '}
        или позвонить{' '}
        <a href={`tel:${contacts.phoneTel}`} className="font-semibold text-sage-700 underline">
          {contacts.phone}
        </a>
      </div>

      {/* Доставка */}
      <h2>Доставка</h2>

      <p>
        Доставка осуществляется транспортными компаниями по всей территории Российской Федерации — СДЭК, ПЭК, Деловые Линии и&nbsp;другие по&nbsp;согласованию.
      </p>

      <p><strong>Сроки доставки:</strong> от&nbsp;3 до&nbsp;14 рабочих дней в&nbsp;зависимости от&nbsp;региона, габаритов товара и&nbsp;выбранной транспортной компании.</p>

      <p>
        <strong>Стоимость доставки</strong> рассчитывается индивидуально при&nbsp;оформлении заказа. На&nbsp;стоимость влияют габариты и&nbsp;вес мебели, удалённость адреса доставки и&nbsp;тариф транспортной компании. Точную сумму назовёт менеджер при&nbsp;подтверждении заказа.
      </p>

      <p>
        Обязанности по&nbsp;доставке считаются выполненными с&nbsp;момента передачи товара в&nbsp;транспортную компанию или непосредственно покупателю при&nbsp;самовывозе.
      </p>

      <h2>Доставка по&nbsp;Набережным Челнам</h2>

      <p>
        По&nbsp;{contacts.city} и&nbsp;ближайшим пригородам доставляем собственным транспортом. Срок — 1–3 дня после согласования заказа. Стоимость уточняется у&nbsp;менеджера и&nbsp;зависит от&nbsp;объёма заказа.
      </p>

      {/* Самовывоз */}
      <h2>Самовывоз</h2>

      <p>
        Самовывоз бесплатно из&nbsp;нашего шоурума:{' '}
        <strong>{contacts.address}</strong>.
      </p>

      <p>
        {contacts.workingHours}. Перед визитом рекомендуем согласовать наличие выбранной модели с&nbsp;менеджером — часть позиций поставляется под&nbsp;заказ.
      </p>

      <p>Товар передаётся покупателю после подтверждения оплаты.</p>

      {/* Возврат */}
      <h2>Возврат товара</h2>

      <p>
        При&nbsp;дистанционной покупке покупатель вправе отказаться от&nbsp;товара надлежащего качества в&nbsp;течение <strong>7 (семи) календарных дней</strong> с&nbsp;момента получения — при&nbsp;условии сохранения товарного вида, упаковки и&nbsp;потребительских свойств товара. Это право предусмотрено ст.&nbsp;26.1 Закона РФ «О&nbsp;защите прав потребителей».
      </p>

      <p>
        Денежные средства возвращаются тем&nbsp;же способом, которым была произведена оплата, в&nbsp;течение <strong>10 (десяти) календарных дней</strong> с&nbsp;момента получения товара обратно.
      </p>

      <p>
        Расходы на&nbsp;возврат товара по&nbsp;адресу продавца несёт покупатель, за&nbsp;исключением случаев возврата товара ненадлежащего качества.
      </p>

      <p>
        <strong>Не&nbsp;подлежат возврату:</strong> товары, изготовленные на&nbsp;заказ по&nbsp;индивидуальным размерам или с&nbsp;индивидуальной комплектацией, если такой товар может быть использован исключительно покупателем, его&nbsp;приобретающим.
      </p>

      <div className="not-prose my-6 rounded-2xl border-l-4 border-sage-700 bg-sage-50 px-5 py-4 text-sm text-ink/80">
        По&nbsp;вопросам возврата:{' '}
        <a href={social.vkMessage} target="_blank" rel="noopener noreferrer" className="font-semibold text-sage-700 underline">
          написать менеджеру в&nbsp;ВКонтакте
        </a>{' '}
        или позвонить{' '}
        <a href={`tel:${contacts.phoneTel}`} className="font-semibold text-sage-700 underline">
          {contacts.phone}
        </a>{' '}
        · Email:{' '}
        <a href={`mailto:${contacts.email}`} className="font-semibold text-sage-700 underline">
          {contacts.email}
        </a>
      </div>

      {/* Гарантия */}
      <h2>Гарантия</h2>

      <p>На&nbsp;продукцию интернет-магазина {site.name} предоставляется гарантия:</p>
      <ul>
        <li><strong>12 месяцев</strong> — на&nbsp;каркас и&nbsp;металлические элементы;</li>
        <li><strong>6 месяцев</strong> — на&nbsp;текстиль, подушки и&nbsp;элементы обивки.</li>
      </ul>

      <p>
        Гарантия действует с&nbsp;момента получения товара покупателем и&nbsp;распространяется на&nbsp;недостатки товара, возникшие по&nbsp;вине производителя.
      </p>

      <p>
        <strong>Гарантия не&nbsp;распространяется</strong> на: механические повреждения, нарушение правил эксплуатации (использование вне&nbsp;соответствующих условий, перегрузка свыше предельной нагрузки, контакт с&nbsp;агрессивными химическими средствами), естественный износ ткани и&nbsp;покрытий, а&nbsp;также на&nbsp;последствия неправильной сборки или&nbsp;транспортировки силами покупателя.
      </p>

      <div className="not-prose my-6 rounded-2xl border-l-4 border-sage-700 bg-sage-50 px-5 py-4 text-sm text-ink/80">
        Подробные условия — в&nbsp;{' '}
        <Link href="/offer" className="font-semibold text-sage-700 underline">
          Публичной оферте
        </Link>
        .
      </div>
    </LegalPage>
  );
}
