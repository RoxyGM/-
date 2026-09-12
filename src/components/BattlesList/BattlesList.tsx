import React, { useState } from 'react';
import type { HistoricalEvent } from '../../types';

interface BattlesListProps {
  events: HistoricalEvent[];
  onSelectEvent: (event: HistoricalEvent) => void;
}

export const BattlesList: React.FC<BattlesListProps> = ({ events = [], onSelectEvent }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Обрабатываем фильтрацию с проверкой наличия типа
  const filtered = events.filter((e: any) => {
    if (filterType === 'all') return true;
    if (filterType === 'battle') {
      return e.type === 'battle' || e.category === 'battle' || !e.type; // если тип не указан, считаем битвой
    }
    return e.type === filterType;
  });

  // Сортировка по году
  const sorted = [...filtered].sort((a: any, b: any) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return sortAsc ? yearA - yearB : yearB - yearA;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 text-amber-50 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-amber-200">Барлық шайқастар мен оқиғалар</h2>
          <p className="text-sm text-slate-400 mt-1">
            Дерекқордағы оқиғалардың толық тізімі (Барлығы: {sorted.length})
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSortAsc(!sortAsc)}
          className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs text-amber-300 hover:bg-slate-700 cursor-pointer"
        >
          Жыл {sortAsc ? '↑' : '↓'}
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
            filterType === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Барлығы
        </button>
        <button
          type="button"
          onClick={() => setFilterType('battle')}
          className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
            filterType === 'battle' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Шайқас
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          Оқиғалар табылмады
        </div>
      ) : (
        <div className="space-y-2 pb-10">
          {sorted.map((e: any, idx) => (
            <div
              key={e.id || idx}
              onClick={() => onSelectEvent(e)}
              className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-lg hover:border-amber-500/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-amber-400 font-bold w-16 shrink-0">{e.year} ж.</span>
                <span className="text-amber-100 font-medium">{e.name || e.title || 'Атаусыз оқиға'}</span>
              </div>
              <span className="text-xs text-slate-400 shrink-0 ml-2">{e.location || e.place || ''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};