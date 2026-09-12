import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { HistoricalEvent, HistoricalTerritory } from '../../types';
import { HISTORICAL_TERRITORIES } from '../../data/territories';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Хендлер для автоматического перерасчета размеров контейнера карты на телефоне
function MapResizeHandler() {
  const map = useMap();

  useEffect(() => {
    // Небольшой таймаут гарантирует, что DOM и Flexbox на мобиле уже окончательно встали на свои места
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
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <MapContainer
        center={[48.0196, 66.9237]}
        zoom={5}
        style={{ height: '100%', width: '100%', backgroundColor: '#020617' }}
      >
        <MapResizeHandler />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {activeTerritories.map((territory) => {
          if (!territory.geojson) return null;

          return (
            <GeoJSON
              key={`${territory.id}-${selectedYear}`}
              data={territory.geojson as any}
              style={{
                color: territory.color || '#3B82F6',
                weight: 2,
                fillColor: territory.color || '#3B82F6',
                fillOpacity: territory.fillOpacity ?? 0.3,
              }}
            >
              <Popup>
                <div style={{ color: '#000' }}>
                  <strong>{territory.name}</strong>
                  <br />
                  <small>Билеушілері: {territory.rulers}</small>
                </div>
              </Popup>
            </GeoJSON>
          );
        })}

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
              eventHandlers={{
                click: () => onEventSelect && onEventSelect(event),
              }}
            >
              <Popup>
                <div style={{ color: '#000' }}>
                  <strong>{event.name}</strong> ({event.year} ж.)
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}