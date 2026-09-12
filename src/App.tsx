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
import type { HistoricalEvent } from './types';
import './App.css';

type View = 'map' | 'list' | 'about';

function App() {
  const store = useHistoricalData();
  const [view, setView] = useState<View>('map');
  const [filtersOpen, setFiltersOpen] = useState(false); // На мобилках фильтры по умолчанию лучше закрыть
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
      />

      <main style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', width: '100%', height: 'calc(100dvh - 64px)' }}>
        {view === 'map' && (
          <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative' }}>
            {/* FilterPanel поверх карты для мобилок */}
            <div style={{ 
              zIndex: 30, 
              position: window.innerWidth < 768 ? 'absolute' : 'relative', 
              top: 0, 
              left: 0, 
              height: '100%',
              maxHeight: '100%'
            }}>
              <FilterPanel store={store} open={filtersOpen} onClose={() => setFiltersOpen(false)} />
            </div>

            <div style={{ flex: 1, height: '100%', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
              
              <HistoricalMap
                events={eventsList}
                selectedYear={store.selectedYear}
                onEventSelect={handleSelectEvent}
              />

              <Legend territories={[]} />

              {/* Адаптированный Timeline под мобилки */}
              <div style={{ 
                position: 'absolute', 
                bottom: window.innerWidth < 768 ? '12px' : '24px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                width: '95%', 
                maxWidth: '800px', 
                zIndex: 1000 
              }}>
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