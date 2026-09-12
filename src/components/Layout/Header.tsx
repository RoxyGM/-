import { useMemo, useState } from 'react';
import type { HistoricalEvent } from '../../types';
import './Header.css';

interface HeaderProps {
  view: 'map' | 'list' | 'about';
  onChangeView: (view: 'map' | 'list' | 'about') => void;
  events: HistoricalEvent[];
  onSelectSearchResult: (event: HistoricalEvent) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  onToggleFilters: () => void;
}

export function Header({
  view,
  onChangeView,
  events,
  onSelectSearchResult,
  searchQuery,
  onSearchQueryChange,
  onToggleFilters,
}: HeaderProps) {
  const [localQuery, setLocalQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    if (!q) return [];
    return events
      .filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          String(e.year).includes(q) ||
          e.location.toLowerCase().includes(q)
      )
      .slice(0, 7);
  }, [events, localQuery]);

  const handlePick = (event: HistoricalEvent) => {
    onSelectSearchResult(event);
    setLocalQuery('');
    setFocused(false);
  };

  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="26" height="26">
            <circle cx="16" cy="16" r="14.5" stroke="var(--color-gold)" strokeWidth="1" fill="none" />
            <path d="M16 4 L16 28 M4 16 L28 16" stroke="var(--color-gold)" strokeWidth="0.75" opacity="0.6" />
            <path d="M16 8 L18.5 14 L25 16 L18.5 18 L16 24 L13.5 18 L7 16 L13.5 14 Z" fill="var(--color-gold)" />
          </svg>
        </span>
        <div className="header__titles">
          <h1 className="header__title">Қазақстан тарихының атласы</h1>
          <p className="header__subtitle">Уақыт ағымындағы аумақтар, хандықтар мен шайқастар</p>
        </div>
      </div>

      <div className="header__search">
        <input
          type="text"
          placeholder="Шайқас атауы, жыл немесе орын бойынша іздеу…"
          value={localQuery}
          onChange={(e) => {
            setLocalQuery(e.target.value);
            onSearchQueryChange(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 150)}
        />
        {focused && suggestions.length > 0 && (
          <ul className="header__suggestions">
            {suggestions.map((s) => (
              <li key={s.id}>
                <button type="button" onClick={() => handlePick(s)}>
                  <span className="header__suggestion-name">{s.name}</span>
                  <span className="header__suggestion-year">{s.year} ж.</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {searchQuery && (
          <button
            className="header__clear-search"
            type="button"
            onClick={() => {
              setLocalQuery('');
              onSearchQueryChange('');
            }}
            aria-label="Іздеуді тазалау"
          >
            ×
          </button>
        )}
      </div>

      <nav className="header__nav">
        <button
          type="button"
          className={view === 'map' ? 'is-active' : ''}
          onClick={() => onChangeView('map')}
        >
          Карта
        </button>
        <button
          type="button"
          className={view === 'list' ? 'is-active' : ''}
          onClick={() => onChangeView('list')}
        >
          Барлық шайқастар
        </button>
        <button
          type="button"
          className={view === 'about' ? 'is-active' : ''}
          onClick={() => onChangeView('about')}
        >
          Жоба туралы
        </button>
        {view === 'map' && (
          <button type="button" className="header__filters-toggle" onClick={onToggleFilters}>
            Сүзгілер
          </button>
        )}
      </nav>
    </header>
  );
}