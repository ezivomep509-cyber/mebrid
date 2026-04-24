/**
 * Глобальные настройки сайта.
 * Все реквизиты компании, контакты и юр. данные — в одном месте.
 * Используется в layout, header, footer, оформлении заказа, юр. страницах.
 */

export const site = {
  name: 'Мебрид',
  tagline: 'Мебель из искусственного ротанга от производителя',
  description:
    'Мебель из искусственного ротанга, алюминия и для сада от производителя. Работаем с 2016 года. Доставка по России.',
  domain: 'mebrid.ru',
  url: 'https://mebrid.ru',
  yearFounded: 2016,
} as const;

export const company = {
  legalName: 'ИП Ханова Насиха Мирзариповна',
  ogrnip: '304165033400421',
  inn: '165000923810',
} as const;

export const contacts = {
  phone: '+7 (8552) 50-20-61',
  phoneTel: '+78552502061', // для href="tel:"
  email: 'mebrid@yandex.ru',
  address: 'г. Набережные Челны, пр. Мира, 24А, ТЦ «Мебельный EuropaCenter»',
  city: 'Набережные Челны',
  workingHours: 'Ежедневно, 10:00 – 20:00', // уточнить у клиента
  // Координаты для карты (Набережные Челны, пр. Мира, 24А — приблизительно)
  geo: { lat: 55.7396, lng: 52.4060 },
} as const;

export const social = {
  vkPage: 'https://vk.com/mebrid',
  vkMessage: 'https://vk.me/mebrid', // ссылка на оформление заказа
} as const;

// Удобный конструктор ссылки на VK с предзаполненным сообщением
export function buildVkOrderLink(message: string): string {
  // vk.me не поддерживает GET-параметр для текста, но мы можем хотя бы
  // открыть диалог; сам текст придётся скопировать пользователю.
  return social.vkMessage;
}
