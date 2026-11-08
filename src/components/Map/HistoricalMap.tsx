import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { HistoricalEvent, HistoricalTerritory } from '../../types';
import { HISTORICAL_TERRITORIES } from '../../data/territories';
import './HistoricalMap.css';

function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [map]);

  return null;
}

interface HistoricalMapProps {
  events: HistoricalEvent[];
  selectedYear: number;
  onEventSelect?: (event: HistoricalEvent) => void;
}

// Создаем кастомную иконку маркера для сражений
const createBattleIcon = (name: string) => {
  return L.divIcon({
    className: 'custom-battle-marker',
    html: `
      <div class="battle-pin" title="${name}">
        <span class="battle-pin-pulse"></span>
        <span class="battle-pin-icon">⚔️</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
};

export function HistoricalMap({ events, selectedYear, onEventSelect }: HistoricalMapProps) {
  const activeTerritories = (HISTORICAL_TERRITORIES || []).filter((territory) => {
    const rawTerritory = territory as HistoricalTerritory & {
      start_year?: number;
      end_year?: number;
    };
    const start = rawTerritory.startYear ?? rawTerritory.start_year ?? 0;
    const end = rawTerritory.endYear ?? rawTerritory.end_year ?? 3000;
    return selectedYear >= start && selectedYear <= end;
  });

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#020617' }}>
      <MapContainer
        center={[48.0196, 66.9237]}
        zoom={5}
        attributionControl={false}
        style={{ height: '100%', width: '100%', backgroundColor: '#090d16' }}
      >
        <MapResizeHandler />

        {/* Бесплатный темный слой Esri World Dark Gray Base без подписей и без API-ключа */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          maxZoom={18}
          maxNativeZoom={16}
        />

        {/* Исторические территории с контрастными границами и полупрозрачным фоном */}
        {activeTerritories.map((territory) => {
          if (!territory.geojson) return null;

          const baseColor = territory.color || '#eab308';
          const fillOpacity = Math.min(0.5, Math.max(0.32, (territory.fillOpacity ?? 0.3) * 1.15));

          return (
            <GeoJSON
              key={`${territory.id}-${selectedYear}`}
              data={territory.geojson as any}
              style={{
                color: baseColor,
                weight: 2.5,
                opacity: 0.95,
                fillColor: baseColor,
                fillOpacity: fillOpacity,
              }}
            >
              <Popup>
                <div className="historical-popup">
                  <h4 className="historical-popup__title">{territory.name}</h4>
                  {territory.capital && (
                    <div className="historical-popup__row">
                      <span className="historical-popup__label">Астанасы:</span> {territory.capital}
                    </div>
                  )}
                  {territory.rulers && (
                    <div className="historical-popup__row">
                      <span className="historical-popup__label">Билеушілері:</span> {territory.rulers}
                    </div>
                  )}
                  <div className="historical-popup__years">
                    Кезең: {territory.startYear} — {territory.endYear} жж.
                  </div>
                </div>
              </Popup>
            </GeoJSON>
          );
        })}

        {/* Маркеры исторических битв и событий с золотистым свечением */}
        {events.map((event) => {
          let coords = event.coordinates;
          if (!coords && event.latitude !== undefined && event.longitude !== undefined) {
            coords = [event.latitude, event.longitude];
          }
          if (!coords || !Array.isArray(coords) || coords.length < 2) return null;

          const position: [number, number] =
            coords[0] > 50 && coords[1] < 50
              ? [coords[1], coords[0]]
              : [coords[0], coords[1]];

          return (
            <Marker
              key={event.id}
              position={position}
              icon={createBattleIcon(event.name)}
              eventHandlers={{
                click: () => onEventSelect && onEventSelect(event),
              }}
            >
              <Popup>
                <div className="historical-popup">
                  <div className="historical-popup__year-badge">{event.year} ж.</div>
                  <h4 className="historical-popup__title">{event.name}</h4>
                  {event.location && (
                    <div className="historical-popup__row">
                      <span className="historical-popup__label">Орны:</span> {event.location}
                    </div>
                  )}
                  {event.outcome && (
                    <div className="historical-popup__outcome">
                      Нәтижесі: <strong>{event.outcome}</strong>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}