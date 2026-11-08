import type { HistoricalTerritory } from '../../types';
import './Legend.css';

interface LegendProps {
  territories: HistoricalTerritory[];
}

export function Legend({ territories }: LegendProps) {
  if (territories.length === 0) {
    return (
      <div className="legend legend--empty">
        <span className="legend__empty-icon" aria-hidden="true">🗺️</span>
        <p>Для этого года на карте нет отмеченных территорий.</p>
      </div>
    );
  }

  return (
    <div className="legend">
      <div className="legend__title">Аумақтар (Территории)</div>
      <ul>
        {territories.map((t) => (
          <li key={t.id}>
            <span className="legend__swatch" style={{ background: t.color }} />
            <span className="legend__name">{t.shortName ?? t.name}</span>
          </li>
        ))}
      </ul>
      <p className="legend__note">Шекаралар шартты — тарихи реконструкция</p>
    </div>
  );
}
