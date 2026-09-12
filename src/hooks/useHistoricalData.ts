import { useState, useMemo, useEffect, useCallback } from 'react';
import { HISTORICAL_EVENTS } from '../data/events';
import { HISTORICAL_TERRITORIES } from '../data/territories';
import { HistoricalEvent } from '../types';

const HISTORICAL_STATE_IDS = Array.from(
  new Set(HISTORICAL_TERRITORIES.map((territory) => territory.stateId))
);

export function useHistoricalData() {
  const getInitialYear = (): number => {
    const params = new URLSearchParams(window.location.search);
    const y = params.get('year');
    if (y) {
      const parsed = parseInt(y, 10);
      if (!isNaN(parsed) && parsed >= 1200 && parsed <= 1900) {
        return parsed;
      }
    }
    return 1729;
  };

  const [selectedYear, _setSelectedYear] = useState<number>(getInitialYear);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllEvents, setShowAllEvents] = useState<boolean>(false);
  const [selectedStateIds, setSelectedStateIds] = useState<string[]>(HISTORICAL_STATE_IDS);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  // Синхронизация года между компонентами в реальном времени
  useEffect(() => {
    const handleYearSync = (e: CustomEvent) => {
      if (e.detail !== undefined && e.detail !== selectedYear) {
        _setSelectedYear(e.detail);
      }
    };
    window.addEventListener('sync_historical_year', handleYearSync as EventListener);
    return () => {
      window.removeEventListener('sync_historical_year', handleYearSync as EventListener);
    };
  }, [selectedYear]);

  const setSelectedYear = useCallback((year: number | ((prev: number) => number)) => {
    _setSelectedYear((prevYear) => {
      const nextYear = typeof year === 'function' ? year(prevYear) : year;
      
      // Обновляем URL в строке браузера
      const params = new URLSearchParams(window.location.search);
      params.set('year', nextYear.toString());
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      
      // Рассылаем событие обновления всем инстансам хука
      window.dispatchEvent(new CustomEvent('sync_historical_year', { detail: nextYear }));
      
      return nextYear;
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('year', selectedYear.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [selectedYear]);

  const toggleState = useCallback((stateId: string) => {
    setSelectedStateIds((prev) =>
      prev.includes(stateId)
        ? prev.filter((id) => id !== stateId)
        : [...prev, stateId]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedStateIds(HISTORICAL_STATE_IDS);
    setShowAllEvents(false);
    searchQuery && setSearchQuery('');
  }, [searchQuery]);

  // Фильтрация событий СТРОГО год в год
  const filteredEvents = useMemo(() => {
    return HISTORICAL_EVENTS.filter((event) => {
      const hasMatchingState =
        !event.stateIds ||
        event.stateIds.length === 0 ||
        event.stateIds.some((id) => selectedStateIds.includes(id));

      if (!hasMatchingState) return false;

      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const name = (event.name || (event as any).title || '').toLowerCase();
        const loc = (event.location || '').toLowerCase();
        const desc = (event.description || '').toLowerCase();
        return name.includes(query) || loc.includes(query) || desc.includes(query);
      }

      if (showAllEvents) {
        return true;
      }

      // Если у события есть диапазон лет (например, war с year по yearEnd)
      const endYear = (event as any).yearEnd || event.year;
      return selectedYear >= event.year && selectedYear <= endYear;
    });
  }, [selectedYear, searchQuery, showAllEvents, selectedStateIds]);

  // Фильтрация территорий
  const visibleTerritories = useMemo(() => {
    return HISTORICAL_TERRITORIES.filter((territory) => {
      const isStateActive = selectedStateIds.includes(territory.stateId);
      if (!isStateActive) return false;

      return selectedYear >= territory.startYear && selectedYear <= territory.endYear;
    });
  }, [selectedYear, selectedStateIds]);

  return {
    events: HISTORICAL_EVENTS,
    selectedYear,
    setSelectedYear,
    searchQuery,
    setSearchQuery,
    showAllEvents,
    setShowAllEvents,
    selectedStateIds,
    toggleState,
    resetFilters,
    filteredEvents,
    visibleTerritories,
    selectedEvent,
    setSelectedEvent,
  };
}