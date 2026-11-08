import { CATEGORY_ICONS, CATEGORY_LABELS } from '../../types';
import type { EventCategory } from '../../types';
import { HISTORICAL_TERRITORIES } from '../../data/territories';
import './FilterPanel.css';

interface FilterPanelProps {
  store?: any;
  open?: boolean;
  onClose?: () => void;
}

const CATEGORIES: EventCategory[] = ['battle'];

export function FilterPanel({ store, open = false, onClose }: FilterPanelProps) {
  if (!store) return null;

  const {
    selectedStateIds = [],
    toggleState,
    resetFilters,
    showAllEvents,
    setShowAllEvents
  } = store;

  // Формируем список уникальных ханств/государств
  const uniqueTerritories = Array.from(
    new Map(HISTORICAL_TERRITORIES.map((item) => [item.stateId, item])).values()
  );

  const isStateActive = (id: string): boolean => {
    return selectedStateIds.includes(id);
  };

  return (
    <aside className={`filter-panel${open ? ' is-open' : ''}`}>
      <div className="filter-panel__header">
        <div className="filter-panel__title-wrap">
          <span className="filter-panel__header-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </span>
          <h2>Сүзгілер</h2>
        </div>
        <div className="filter-panel__header-actions">
          <button
            type="button"
            className="filter-panel__reset-btn"
            onClick={() => resetFilters && resetFilters()}
            title="Сүзгілерді тазалау"
            aria-label="Сүзгілерді тазалау"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" />
              <path d="M22 21H7" />
              <path d="m5 11 9 9" />
            </svg>
            <span className="filter-panel__reset-text">Тазалау</span>
          </button>
          <button className="filter-panel__mobile-close" onClick={onClose} aria-label="Сүзгілерді жабу" title="Жабу">
            ×
          </button>
        </div>
      </div>

      <div className="filter-panel__section">
        <div className="filter-panel__section-title">Оқиға түрі</div>
        <ul className="filter-panel__list">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <label className="filter-panel__item-label">
                <input
                  type="checkbox"
                  checked={showAllEvents}
                  onChange={(e) => setShowAllEvents && setShowAllEvents(e.target.checked)}
                />
                <span className="filter-panel__icon">{CATEGORY_ICONS[c] || '⚔️'}</span>
                <span>{CATEGORY_LABELS[c] || 'Шайқас'}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-panel__section">
        <div className="filter-panel__section-title">Мемлекет / Кезең</div>
        <ul className="filter-panel__list">
          {uniqueTerritories.map((t) => (
            <li key={t.id || t.stateId}>
              <label className="filter-panel__item-label">
                <input
                  type="checkbox"
                  checked={isStateActive(t.stateId)}
                  onChange={() => toggleState && toggleState(t.stateId)}
                />
                <span className="filter-panel__swatch" style={{ background: t.color || '#f59e0b' }} />
                <span className="truncate">{t.name || t.stateId}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}