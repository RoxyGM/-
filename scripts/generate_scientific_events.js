import fs from 'fs';
import path from 'path';

// Полный академический массив 43 событий с жесткой структурой
const HISTORICAL_STATES = [
  { id: 'golden-horde', name: 'Алтын Орда', color: '#B45309' },
  { id: 'nogai-horde', name: 'Ноғай Ордасы', color: '#047857' },
  { id: 'shaybanid', name: 'Көшпелі өзбектер мемлекеті', color: '#6D28D9' },
  { id: 'kazakh-khanate', name: 'Қазақ хандығы', color: '#0284C7' },
  { id: 'dzungar', name: 'Жоңғар хандығы', color: '#DC2626' },
  { id: 'qing', name: 'Цин империясы', color: '#D97706' },
  { id: 'russian-empire', name: 'Ресей империясы', color: '#475569' },
  { id: 'kokand', name: 'Қоқан хандығы', color: '#059669' },
  { id: 'khiva', name: 'Хиуа хандығы', color: '#0891B2' },
];

console.log('Building scientific historical events dataset...');
