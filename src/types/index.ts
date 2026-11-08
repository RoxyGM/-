export type EventCategory = 'battle' | 'reform' | 'diplomacy';

export interface HistoricalSource {
  title: string;
  url?: string;
  archiveRef?: string;
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

// 1. Кезеңдер мен фазалар (Қақтығыстың сипаты)
export interface HistoricalPhase {
  stage: string;       // Мысалы: "I кезең. Шоғырлану", "Шешуші шайқас"
  description: string; // Әскери маневрлер мен нақты әрекеттер
}

// 2. Тараптар мен басшылар құрылымы
export interface ConflictSideDetails {
  name: string;        // Тарап атауы
  leaders: string[];   // Қолбасшылар, батырлар, хандар
  forces?: string;     // Қарулы күштер құрамы мен саны
}

export interface HistoricalConflictSides {
  sideA: ConflictSideDetails;
  sideB: ConflictSideDetails;
}

// 3. Архивтік құжаттар мен дереккөздер
export interface HistoricalArchiveSource {
  title: string;          // Құжат немесе еңбек атауы
  archiveRef?: string;    // Архив қоры, опись, іс нөмірі (РМӘТА, ҚР ОМА, т.б.)
  author?: string;        // Авторы немесе зерттеушісі
  docType?: string;       // Құжат түрі (рапорт, жарлық, шежіре, хат)
  url?: string;
}

// Толық тарихи-аналитикалық оқиға форматы
export interface HistoricalEvent {
  id: string;
  name: string;              // Тақырып: толық тарихи атауы және нақты мерзімі
  year: number;              // Жыл
  yearEnd?: number;          // Аяқталу жылы
  dateLabel?: string;        // Толық календарлық мерзімі немесе маусымы
  isDateApproximate?: boolean;

  // Жергілікті орын және гео-бағдарлар
  location: string;          // Қысқаша топоним
  region?: string;           // Нақты географиялық бағдарлар (өзен алқабы, тау шатқалы, урочище)
  isLocationApproximate?: boolean;
  coordinates?: [number, number];
  latitude?: number;
  longitude?: number;
  needsVerification?: boolean;

  category: EventCategory;
  stateIds: string[];

  // 1. Оқиғаның тұжырымдамалық сипаттамасы
  description: string;

  // 2. Тарихи контекст пен себептері (экономикалық, жер, геосаяси)
  cause?: string;

  // 3. Тараптар мен қолбасшылар
  sidesAndLeaders?: HistoricalConflictSides;
  commanders?: {
    kazakh?: string[];
    opponents?: string[];
  } | string[];
  participants?: string[];
  sides?: HistoricalSide[];

  // 4. Қақтығыстың сипаты мен кезеңдері
  coursePhases?: HistoricalPhase[];
  course?: string;

  // 5. Дереккөздер мен архивтік құжаттар
  sourcesAndArchives?: HistoricalArchiveSource[];
  sources?: HistoricalSource[];

  // 6. Салдары мен мемлекеттілікке ықпалы
  significance?: string;
  result?: string;
  outcome?: 'Жеңіс' | 'Жеңіліс' | 'Нәтижесіз / Келісім';
  casualties?: string;

  imageUrl?: string;
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