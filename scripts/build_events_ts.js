import fs from 'fs';
import path from 'path';
import { eventsPart1 } from './events_part1.js';
import { eventsPart2 } from './events_part2.js';

const allEvents = [...eventsPart1, ...eventsPart2];

console.log(`Total events generated: ${allEvents.length}`);

const fileContent = `import { HistoricalEvent } from '../types';

export const HISTORICAL_STATES = [
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

export const HISTORICAL_EVENTS: HistoricalEvent[] = ${JSON.stringify(allEvents, null, 2)};
`;

const targetPath = path.resolve('./src/data/events.ts');
fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log(`Successfully wrote ${allEvents.length} scientific historical events to ${targetPath}`);
