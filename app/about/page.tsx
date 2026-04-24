import LegalPage from '../components/LegalPage';
import { site, contacts, company } from '@/lib/site';

export const metadata = { title: 'О компании' };

export default function AboutPage() {
  return (
    <LegalPage title={`О компании ${site.name}`} subtitle={`Производитель мебели из ротанга с ${site.yearFounded} года`}>
      <p>
        {site.name} — российский производитель и&nbsp;продавец мебели из&nbsp;искусственного ротанга, алюминия и&nbsp;других материалов для дома, террасы и&nbsp;коммерческих пространств. Работаем с&nbsp;{site.yearFounded} года.
      </p>

      <h2>Что мы делаем</h2>
      <ul>
        <li>Поставляем готовые комплекты садовой и&nbsp;интерьерной мебели</li>
        <li>Подбираем мебель под задачи дома, ресторана, отеля или офиса</li>
        <li>Доставляем заказы по&nbsp;России</li>
        <li>Консультируем по&nbsp;выбору материалов, цвета и&nbsp;комплектации</li>
      </ul>

      <h2>Шоурум</h2>
      <p>
        Приезжайте посмотреть мебель вживую: <strong>{contacts.address}</strong>.<br />
        Время работы: {contacts.workingHours}.
      </p>

      <h2>Реквизиты</h2>
      <ul>
        <li><strong>{company.legalName}</strong></li>
        <li>ИНН: {company.inn}</li>
        <li>ОГРНИП: {company.ogrnip}</li>
        <li>Телефон: <a href={`tel:${contacts.phoneTel}`}>{contacts.phone}</a></li>
        <li>E-mail: <a href={`mailto:${contacts.email}`}>{contacts.email}</a></li>
      </ul>
    </LegalPage>
  );
}
