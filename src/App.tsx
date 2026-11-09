import { useState, useEffect } from 'react';
import { useHistoricalData } from './hooks/useHistoricalData';
import { Header } from './components/Layout/Header';
import { HistoricalMap } from './components/Map/HistoricalMap';
import { Timeline } from './components/Timeline/Timeline';
import { EventCard } from './components/EventCard/EventCard';
import { FilterPanel } from './components/Filters/FilterPanel';
import { Legend } from './components/Legend/Legend';
import { AboutPanel } from './components/AboutPanel/AboutPanel';
import { BattlesList } from './components/BattlesList/BattlesList';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import type { HistoricalEvent } from './types';
import './App.css';

type View = 'map' | 'list' | 'about';

function App() {
  const store = useHistoricalData();
  const [view, setView] = useState<View>('map');
  const [filtersOpen, setFiltersOpen] = useState(window.innerWidth >= 768);
  const [isPlaying, setIsPlaying] = useState(false);

  // Автоматически закрываем фильтры на экранах меньше 768px при старте
  useEffect(() => {
    if (window.innerWidth < 768) {
      setFiltersOpen(false);
    }
  }, []);

  const handleSelectEvent = (event: HistoricalEvent) => {
    store.setSelectedEvent(event);
    setView('map');
  };

  const eventsList = store.filteredEvents || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', width: '100vw', overflow: 'hidden', backgroundColor: '#020617' }}>
      <Header
        view={view}
        onChangeView={setView}
        events={eventsList}
        onSelectSearchResult={handleSelectEvent}
        searchQuery={store.searchQuery}
        onSearchQueryChange={store.setSearchQuery}
        onToggleFilters={() => setFiltersOpen((v) => !v)}
        isFiltersOpen={filtersOpen}
      />

      <main style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', display: 'flex', width: '100%' }}>
        {view === 'map' && (
          <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
            {/* FilterPanel парит над картой с размытием и скруглением справа */}
            <div className={`filter-panel-wrapper${filtersOpen ? ' is-open' : ''}`}>
              <FilterPanel store={store} open={filtersOpen} onClose={() => setFiltersOpen(false)} />
            </div>

            {filtersOpen && (
              <div
                className="filter-panel-backdrop"
                onClick={() => setFiltersOpen(false)}
                aria-hidden="true"
              />
            )}

            <div style={{ flex: 1, height: '100%', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>

              <ErrorBoundary fallbackTitle="Картаны жүктеу кезінде қате орын алды">
                <HistoricalMap
                  events={eventsList}
                  selectedYear={store.selectedYear}
                  onEventSelect={handleSelectEvent}
                />
              </ErrorBoundary>

              <Legend territories={store.visibleTerritories || []} />

              {/* Адаптированный Timeline под мобилки */}
              <div className="timeline-wrapper">
                <Timeline
                  selectedYear={store.selectedYear}
                  onYearChange={store.setSelectedYear}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying((value) => !value)}
                  showAllEvents={store.showAllEvents}
                  onToggleShowAllEvents={store.setShowAllEvents}
                  minYear={1200}
                  maxYear={1900}
                />
              </div>
            </div>

            <EventCard event={store.selectedEvent} onClose={() => store.setSelectedEvent(null)} />
          </div>
        )}

        {view === 'list' && (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <BattlesList
              events={eventsList}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        )}

        {view === 'about' && (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <AboutPanel />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;