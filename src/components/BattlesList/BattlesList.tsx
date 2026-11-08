import React, { useState } from 'react';
import type { HistoricalEvent } from '../../types';
import './BattlesList.css';

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
    return e.type === filterType || e.category === filterType;
  });

  // Сортировка по году
  const sorted = [...filtered].sort((a: any, b: any) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return sortAsc ? yearA - yearB : yearB - yearA;
  });

  return (
    <div className="battles-list-view">
      {/* Шапка списка */}
      <div className="battles-list__header">
        <div>
          <h2 className="battles-list__title">Барлық шайқастар мен тарихи оқиғалар</h2>
          <p className="battles-list__subtitle">
            Қазақ хандығы мен дала мемлекеттерінің шешуші қақтығыстары (Барлығы: {sorted.length})
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSortAsc(!sortAsc)}
          className="battles-list__sort-btn"
          title="Жыл бойынша сұрыптау"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
          Жыл бойынша {sortAsc ? '↑ (ертеден)' : '↓ (кейіннен)'}
        </button>
      </div>

      {/* Панель фильтров категорий */}
      <div className="battles-list__toolbar">
        <div className="battles-list__chips">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`battles-list__chip ${filterType === 'all' ? 'is-active' : ''}`}
          >
            Барлығы
          </button>
          <button
            type="button"
            onClick={() => setFilterType('battle')}
            className={`battles-list__chip ${filterType === 'battle' ? 'is-active' : ''}`}
          >
            ⚔️ Шайқастар
          </button>
        </div>
      </div>

      {/* Сетка карточек событий */}
      {sorted.length === 0 ? (
        <div className="battles-list__empty">
          <p>Сүзгі бойынша сәйкес келетін оқиғалар табылмады</p>
        </div>
      ) : (
        <div className="battles-list__grid">
          {sorted.map((e: any, idx) => (
            <article
              key={e.id || idx}
              onClick={() => onSelectEvent(e)}
              className="battles-card transition-all duration-300 hover:border-amber-500/50 hover:-translate-y-1"
            >
              {/* Верхняя строка: бейдж даты и локация */}
              <div className="battles-card__top">
                <div className="battles-card__badges">
                  <span className="battles-card__date-badge">
                    <span className="battles-card__date-dot" />
                    {e.dateLabel || `${e.year} жыл`}
                  </span>
                </div>
                {e.location && (
                  <span className="battles-card__location" title={e.location}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-gold)' }}>
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {e.location}
                  </span>
                )}
              </div>

              {/* Название события: крупнее и контрастнее */}
              <h3 className="battles-card__title">
                {e.name || e.title || 'Атаусыз оқиға'}
              </h3>

              {/* Краткое описание */}
              {e.description && (
                <p className="battles-card__description">
                  {e.description}
                </p>
              )}

              {/* Подвал карточки: статус исхода и кнопка перехода на карту */}
              <div className="battles-card__footer">
                {e.outcome ? (
                  <span className={`battles-card__outcome ${
                    e.outcome === 'Жеңіс'
                      ? 'battles-card__outcome--win'
                      : e.outcome === 'Жеңіліс'
                      ? 'battles-card__outcome--defeat'
                      : 'battles-card__outcome--draw'
                  }`}>
                    {e.outcome}
                  </span>
                ) : (
                  <span />
                )}
                <span className="battles-card__action">
                  Картада көру
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};