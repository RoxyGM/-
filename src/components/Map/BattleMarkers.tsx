import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { HistoricalEvent } from '../../types';

interface BattleMarkersProps {
  events: HistoricalEvent[];
  onEventSelect: (event: HistoricalEvent) => void;
}

// Кастомные иконки для категории
const createBattleIcon = (category: string) => {
  let iconUrl = 'https://cdn-icons-png.flaticon.com/512/929/929429.png'; // Мечи
  if (category === 'reform') {
    iconUrl = 'https://cdn-icons-png.flaticon.com/512/3534/3534033.png'; // Свиток
  } else if (category === 'diplomacy') {
    iconUrl = 'https://cdn-icons-png.flaticon.com/512/1904/1904773.png'; // Рукопожатие
  }

  return L.divIcon({
    className: 'custom-battle-marker',
    html: `
      <div style="
        background-color: #78350F;
        border: 2px solid #FDE68A;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.35);
        cursor: pointer;
        transition: transform 0.2s ease;
      " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">
        <img src="${iconUrl}" style="width: 18px; height: 18px; filter: invert(1);" />
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  });
};

export const BattleMarkers: React.FC<BattleMarkersProps> = ({ events, onEventSelect }) => {
  return (
    <>
      {events.map((event) => {
        // Поддержка разных форматов координат: [lat, lng] или { lat, lng }
        let pos: [number, number] | null = null;
        if (Array.isArray(event.coordinates)) {
          pos = event.coordinates as [number, number];
        } else if (event.coordinates && typeof event.coordinates === 'object') {
          const { lat, lng } = event.coordinates as any;
          if (lat !== undefined && lng !== undefined) {
            pos = [lat, lng];
          }
        }

        if (!pos) return null;

        return (
          <Marker
            key={`${event.id}-${event.year}`} // KEY с добавлением года гарантирует обновление маркеров на карте
            position={pos}
            icon={createBattleIcon(event.category)}
            eventHandlers={{
              click: () => onEventSelect(event),
            }}
          >
            <Tooltip direction="top" offset={[0, -18]} opacity={0.95} permanent={false}>
              <div className="font-sans text-xs px-1 py-0.5">
                <span className="font-bold text-amber-900">{event.year} ж.</span> — {event.name}
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};