import React from 'react';
import { Polygon, Popup } from 'react-leaflet';
import { HistoricalTerritory } from '../../types';

interface TerritoryLayerProps {
  territories: HistoricalTerritory[];
}

export const TerritoryLayer: React.FC<TerritoryLayerProps> = ({ territories }) => {
  return (
    <>
      {territories.map((territory) => {
        // Достаем массив координат из geojson или прямых coordinates
        let rawCoords: any = territory.geojson?.geometry?.coordinates;

        if (!rawCoords || !Array.isArray(rawCoords) || rawCoords.length === 0) {
          return null;
        }

        // Если координаты обернуты по стандарту GeoJSON [[[lng, lat], ...]]
        if (Array.isArray(rawCoords[0]) && Array.isArray(rawCoords[0][0])) {
          rawCoords = rawCoords[0];
        }

        // Преобразуем из GeoJSON [lng, lat] в Leaflet [lat, lng]
        const leafletPositions: [number, number][] = rawCoords
          .filter((pt: any) => Array.isArray(pt) && pt.length >= 2)
          .map((pt: [number, number]) => [pt[1], pt[0]]); // Переворачиваем lng/lat -> lat/lng

        if (leafletPositions.length < 3) {
          return null;
        }

        return (
          <Polygon
            key={`${territory.id}-${territory.startYear}-${territory.endYear}`}
            positions={leafletPositions}
            pathOptions={{
              color: territory.color || '#eab308',
              fillColor: territory.color || '#eab308',
              fillOpacity: territory.fillOpacity ?? 0.3,
              weight: 2,
              dashArray: '4, 4',
            }}
          >
            <Popup>
              <div className="text-slate-900 font-sans p-1 max-w-xs">
                <h3 className="font-bold text-sm text-amber-900">{territory.name}</h3>
                {territory.capital && (
                  <p className="text-xs text-slate-700 mt-1">
                    <strong>Астанасы:</strong> {territory.capital}
                  </p>
                )}
                {territory.rulers && (
                  <p className="text-xs text-slate-700 mt-0.5">
                    <strong>Билеушілері:</strong> {territory.rulers}
                  </p>
                )}
                <p className="text-xs text-slate-500 mt-1">
                  Кезең: {territory.startYear} — {territory.endYear} жж.
                </p>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
};