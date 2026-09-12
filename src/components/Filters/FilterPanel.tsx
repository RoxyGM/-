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
        <h2>Сүзгілер</h2>
        <button className="filter-panel__mobile-close" onClick={onClose} aria-label="Сүзгілерді жабу">
          ×
        </button>
      </div>

      <div className="filter-panel__section">
        <div className="filter-panel__section-title">Оқиға түрі</div>
        <ul className="filter-panel__list">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAllEvents}
                  onChange={(e) => setShowAllEvents && setShowAllEvents(e.target.checked)}
                />
                <span className="filter-panel__icon">{CATEGORY_ICONS[c] || '⚔️'}</span>
                {CATEGORY_LABELS[c] || 'Шайқас'}
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
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={isStateActive(t.stateId)}
                  onChange={() => toggleState && toggleState(t.stateId)}
                />
                <span className="filter-panel__swatch" style={{ background: t.color || '#f59e0b' }} />
                {t.name || t.stateId}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="filter-panel__reset mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded text-xs transition-colors cursor-pointer"
        onClick={() => resetFilters && resetFilters()}
      >
        Сүзгілерді тазалау
      </button>
    </aside>
  );
}