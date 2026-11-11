import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { HistoricalEvent } from '../../types';
import { HISTORICAL_EVENTS } from '../../data/events';
import './Timeline.css';

interface TimelineProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPause?: () => void;
  events?: HistoricalEvent[];
  onSelectEvent?: (event: HistoricalEvent) => void;
  showAllEvents: boolean;
  onToggleShowAllEvents: (show: boolean) => void;
  minYear?: number;
  maxYear?: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  selectedYear,
  onYearChange,
  isPlaying,
  onTogglePlay,
  onPause,
  events,
  onSelectEvent,
  showAllEvents,
  onToggleShowAllEvents,
  minYear = 1200,
  maxYear = 1900,
}) => {
  // Локальное состояние для мгновенного (60fps) отклика UI без лагов карты
  const [localYear, setLocalYear] = useState<number>(selectedYear);
  const debounceTimerRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Множество годов, в которых происходили битвы/события
  const eventYearsSet = useMemo(() => {
    const list = events && events.length > 0 ? events : HISTORICAL_EVENTS;
    const years = new Set<number>();
    for (const ev of list) {
      if (ev && typeof ev.year === 'number') {
        years.add(ev.year);
      }
    }
    return years;
  }, [events]);

  // Отсортированный список всех событий / битв по годам
  const sortedBattleEvents = useMemo(() => {
    const list = events && events.length > 0 ? events : HISTORICAL_EVENTS;
    return [...list]
      .filter((ev) => ev && typeof ev.year === 'number')
      .sort((a, b) => a.year - b.year);
  }, [events]);

  // Предыдущая битва (год строго меньше localYear)
  const prevBattle = useMemo(() => {
    for (let i = sortedBattleEvents.length - 1; i >= 0; i--) {
      if (sortedBattleEvents[i].year < localYear) {
        return sortedBattleEvents[i];
      }
    }
    return null;
  }, [sortedBattleEvents, localYear]);

  // Следующая битва (год строго больше localYear)
  const nextBattle = useMemo(() => {
    for (let i = 0; i < sortedBattleEvents.length; i++) {
      if (sortedBattleEvents[i].year > localYear) {
        return sortedBattleEvents[i];
      }
    }
    return null;
  }, [sortedBattleEvents, localYear]);

  const pauseAutoplay = useCallback(() => {
    if (onPause) {
      onPause();
    } else {
      onTogglePlay();
    }
  }, [onPause, onTogglePlay]);

  // Синхронизация при внешнем изменении (например, из URL или фильтров)
  useEffect(() => {
    if (!isDraggingRef.current && !isPlaying) {
      setLocalYear(selectedYear);
    }
  }, [selectedYear, isPlaying]);

  // Немедленный вызов обновления года (для кнопок шага и автоплея)
  const commitYear = useCallback(
    (year: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      setLocalYear(year);
      onYearChange(year);
    },
    [onYearChange]
  );

  // Переход к предыдущей битве
  const handlePrevBattle = useCallback(() => {
    if (!prevBattle) return;
    if (isPlaying) {
      pauseAutoplay();
    }
    commitYear(prevBattle.year);
    if (onSelectEvent) {
      onSelectEvent(prevBattle);
    }
  }, [prevBattle, isPlaying, pauseAutoplay, commitYear, onSelectEvent]);

  // Переход к следующей битве
  const handleNextBattle = useCallback(() => {
    if (!nextBattle) return;
    if (isPlaying) {
      pauseAutoplay();
    }
    commitYear(nextBattle.year);
    if (onSelectEvent) {
      onSelectEvent(nextBattle);
    }
  }, [nextBattle, isPlaying, pauseAutoplay, commitYear, onSelectEvent]);

  // Автоплей: скорость 50 мс на год с автоматической паузой на годах с битвами
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // 2. Если пользователь уже находится на maxYear (1900 ж.) и нажимает Play:
    // сбрасываемся на начальный год (minYear) и запускаем воспроизведение заново
    let current = localYear;
    if (current >= maxYear) {
      current = minYear;
      setLocalYear(current);
      onYearChange(current);

      if (eventYearsSet.has(current)) {
        pauseAutoplay();
        return;
      }
    } else if (eventYearsSet.has(current)) {
      // Если воспроизведение запускается с года, где уже есть битва,
      // сразу шагаем на следующий год (selectedYear + 1), чтобы не застревать на паузе
      current = current + 1;
      setLocalYear(current);
      onYearChange(current);

      // Если и следующий год сразу содержит другую битву, делаем паузу на ней
      if (eventYearsSet.has(current)) {
        pauseAutoplay();
        return;
      }
    }

    timerRef.current = window.setInterval(() => {
      setLocalYear((prev) => {
        const next = prev + 1;

        // 1. Когда автоплей доходит до 1900 года (maxYear), останавливаемся на нем
        if (next >= maxYear) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          onYearChange(maxYear);
          pauseAutoplay();
          return maxYear;
        }

        onYearChange(next);

        // Как только доходим до года с битвой — ставим автоплей на паузу
        if (eventYearsSet.has(next)) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          pauseAutoplay();
        }

        return next;
      });
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, maxYear, minYear, onYearChange, eventYearsSet, pauseAutoplay]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // Обработка непрерывного перетаскивания ползунка с debounce ~120мс
  const handleRangeChange = (val: number) => {
    isDraggingRef.current = true;
    setLocalYear(val); // Мгновенно обновляет бейдж и положение ползунка в UI

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      onYearChange(val);
      debounceTimerRef.current = null;
    }, 120);
  };

  // Немедленный сброс и фиксация года при отпускании пальца/мыши
  const handleDragEnd = () => {
    isDraggingRef.current = false;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    onYearChange(localYear);
  };

  const rawPercent = ((localYear - minYear) / (maxYear - minYear)) * 100;
  const progressPercent = Math.max(2.5, Math.min(97.5, rawPercent));

  return (
    <div className="timeline-container">
      {/* Верхняя строка управления */}
      <div className="timeline-top-row">
        <div className="timeline-controls-group">
          {/* Предыдущая битва */}
          <button
            type="button"
            onClick={handlePrevBattle}
            disabled={!prevBattle}
            className="timeline-battle-btn timeline-battle-btn--prev"
            title={prevBattle ? `Алдыңғы шайқас: ${prevBattle.name} (${prevBattle.year} ж.)` : 'Алдыңғы шайқас жоқ'}
            aria-label={prevBattle ? `Алдыңғы шайқас: ${prevBattle.name}` : 'Алдыңғы шайқас жоқ'}
          >
            <span className="timeline-battle-arrow">‹</span>
            <span className="timeline-battle-icon" aria-hidden="true">⚔️</span>
            <span className="timeline-battle-text-full">Алдыңғы шайқас</span>
            <span className="timeline-battle-text-short">Шайқас</span>
          </button>

          <button
            type="button"
            onClick={() => commitYear(Math.max(minYear, localYear - 10))}
            className="timeline-step-btn"
            title="10 жыл бұрын"
            aria-label="10 жыл бұрын"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => commitYear(Math.max(minYear, localYear - 1))}
            className="timeline-step-btn"
            title="1 жыл бұрын"
            aria-label="1 жыл бұрын"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onTogglePlay}
            className={`timeline-play-btn ${isPlaying ? 'is-playing' : ''}`}
            title={isPlaying ? 'Тоқтату' : 'Ойнату'}
          >
            {isPlaying ? (
              <>
                <span className="timeline-play-icon">⏸</span>
                <span className="timeline-play-text-full">Тоқтату</span>
                <span className="timeline-play-text-mobile">Кідірту</span>
              </>
            ) : (
              <>
                <span className="timeline-play-icon">▶</span>
                <span className="timeline-play-text-full">Тарихты бастау</span>
                <span className="timeline-play-text-mobile">Ойнату</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => commitYear(Math.min(maxYear, localYear + 1))}
            className="timeline-step-btn"
            title="1 жыл кейін"
            aria-label="1 жыл кейін"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => commitYear(Math.min(maxYear, localYear + 10))}
            className="timeline-step-btn"
            title="10 жыл кейін"
            aria-label="10 жыл кейін"
          >
            »
          </button>

          {/* Следующая битва */}
          <button
            type="button"
            onClick={handleNextBattle}
            disabled={!nextBattle}
            className="timeline-battle-btn timeline-battle-btn--next"
            title={nextBattle ? `Келесі шайқас: ${nextBattle.name} (${nextBattle.year} ж.)` : 'Келесі шайқас жоқ'}
            aria-label={nextBattle ? `Келесі шайқас: ${nextBattle.name}` : 'Келесі шайқас жоқ'}
          >
            <span className="timeline-battle-text-full">Келесі шайқас</span>
            <span className="timeline-battle-text-short">Шайқас</span>
            <span className="timeline-battle-icon" aria-hidden="true">⚔️</span>
            <span className="timeline-battle-arrow">›</span>
          </button>
        </div>

        <label className="timeline-all-toggle">
          <input
            type="checkbox"
            checked={showAllEvents}
            onChange={(e) => onToggleShowAllEvents(e.target.checked)}
          />
          <span className="timeline-all-text-full">Барлық оқиғаларды көрсету</span>
          <span className="timeline-all-text-mobile">Барлық оқиғалар</span>
        </label>
      </div>

      {/* Зона слайдера с бейджем текущего года и диапазоном */}
      <div className="timeline-slider-area">
        <div
          className="timeline-year-bubble"
          style={{
            left: `${progressPercent}%`,
          }}
        >
          <span>{localYear} жыл</span>
        </div>

        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={localYear}
          onChange={(e) => handleRangeChange(Number(e.target.value))}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onKeyUp={handleDragEnd}
          className="timeline-range-input"
          aria-label="Тарихи жылды таңдау"
        />

        <div className="timeline-bounds">
          <span className="timeline-bound-badge">
            {minYear} ж.
          </span>
          <span className="timeline-bound-badge">
            {maxYear} ж.
          </span>
        </div>
      </div>
    </div>
  );
};