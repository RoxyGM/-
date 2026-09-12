import type { PeriodBookmark } from '../types';

// Быстрые "закладки" для временной шкалы — ключевые вехи истории.
export const periodBookmarks: PeriodBookmark[] = [
  { year: 1242, label: '1242', description: 'Золотая Орда' },
  { year: 1310, label: '1310', description: 'Ак-Орда' },
  { year: 1347, label: '1347', description: 'Могулистан' },
  { year: 1440, label: '1440', description: 'Ногайская Орда' },
  { year: 1465, label: '1465', description: 'Казахское ханство' },
  { year: 1634, label: '1634', description: 'Джунгарское ханство' },
  { year: 1643, label: '1643', description: 'Орбулакская битва' },
  { year: 1723, label: '1723', description: 'Актабан шұбырынды' },
  { year: 1729, label: '1729', description: 'Аңырақайская битва' },
  { year: 1731, label: '1731', description: 'Подданство Младшего жуза' },
  { year: 1771, label: '1771', description: 'Абылай-хан' },
  { year: 1822, label: '1822', description: 'Устав 1822 года' },
  { year: 1847, label: '1847', description: 'Гибель Кенесары' },
];

export const TIMELINE_MIN_YEAR = 1200;
export const TIMELINE_MAX_YEAR = 1900;
export const DEFAULT_YEAR = 1465;
