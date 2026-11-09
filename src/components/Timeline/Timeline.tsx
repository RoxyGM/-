import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Timeline.css';

interface TimelineProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
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

  // Синхронизация при внешнем изменении (например, из URL или автоплея)
  useEffect(() => {
    if (!isDraggingRef.current) {
      setLocalYear(selectedYear);
    }
  }, [selectedYear]);

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

  // Автоплей
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setLocalYear((prev) => {
          const next = prev >= maxYear ? minYear : prev + 1;
          onYearChange(next);
          return next;
        });
      }, 800);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, maxYear, minYear, onYearChange]);

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