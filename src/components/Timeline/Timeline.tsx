import React, { useEffect, useRef } from 'react';
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
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        onYearChange(selectedYear >= maxYear ? minYear : selectedYear + 1);
      }, 800);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, selectedYear, maxYear, minYear, onYearChange]);

  const rawPercent = ((selectedYear - minYear) / (maxYear - minYear)) * 100;
  const progressPercent = Math.max(2.5, Math.min(97.5, rawPercent));

  return (
    <div className="timeline-container">
      {/* Верхняя строка управления */}
      <div className="timeline-top-row">
        <div className="timeline-controls-group">
          <button
            type="button"
            onClick={() => onYearChange(Math.max(minYear, selectedYear - 10))}
            className="timeline-step-btn"
            title="10 жыл бұрын"
            aria-label="10 жыл бұрын"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => onYearChange(Math.max(minYear, selectedYear - 1))}
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
                <span>⏸</span> Тоқтату
              </>
            ) : (
              <>
                <span>▶</span> Тарихты бастау
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => onYearChange(Math.min(maxYear, selectedYear + 1))}
            className="timeline-step-btn"
            title="1 жыл кейін"
            aria-label="1 жыл кейін"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => onYearChange(Math.min(maxYear, selectedYear + 10))}
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
          <span>Барлық оқиғаларды көрсету</span>
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
          <span>{selectedYear} жыл</span>
        </div>

        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
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