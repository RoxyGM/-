export type EventCategory = 'battle' | 'reform' | 'diplomacy';

export interface HistoricalSource {
  title: string;
  url?: string;
}

export interface HistoricalSide {
  side: string;
  description: string;
}
export interface PeriodBookmark {
  year: number;
  label: string;
  description: string;
}

export interface HistoricalEvent {
  id: string;
  name: string;
  year: number;
  yearEnd?: number;
  dateLabel?: string;
  isDateApproximate?: boolean;
  location: string;
  isLocationApproximate?: boolean;
  coordinates?: [number, number];
  latitude?: number;
  longitude?: number;
  needsVerification?: boolean;
  category: EventCategory;
  stateIds: string[];
  description: string;
  imageUrl?: string;
  participants?: string[];
  commanders?: {
    kazakh?: string[];
    opponents?: string[];
  } | string[];
  cause?: string;
  course?: string;
  sides?: HistoricalSide[];
  result?: string;
  casualties?: string;
  outcome?: 'Жеңіс' | 'Жеңіліс' | 'Нәтижесіз / Келісім';
  significance?: string;
  sources?: HistoricalSource[];
}

export interface HistoricalTerritory {
  id: string;
  stateId: string;
  name: string;
  shortName: string;
  startYear: number;
  endYear: number;
  capital: string;
  rulers: string;
  description: string;
  color: string;
  fillOpacity: number;
  isReconstruction: boolean;
  geojson: {
    type: 'Feature';
    geometry: {
      type: 'Polygon' | 'MultiPolygon';
      coordinates: number[][][] | number[][][][];
    };
    properties?: Record<string, any>;
  };
}

export interface UseHistoricalDataReturn {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showAllEvents: boolean;
  setShowAllEvents: (show: boolean) => void;
  activeStateIds: string[];
  toggleStateId: (stateId: string) => void;
  selectedEvent: HistoricalEvent | null;
  setSelectedEvent: (event: HistoricalEvent | null) => void;
  filteredEvents: HistoricalEvent[];
  activeTerritories: HistoricalTerritory[];
}

export const CATEGORY_ICONS: Record<EventCategory, string> = {
  battle: '⚔️',
  reform: '📜',
  diplomacy: '🤝'
};

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  battle: 'Шайқас',
  reform: 'Реформа',
  diplomacy: 'Дипломатия'
};