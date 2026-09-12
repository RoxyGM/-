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

  return (
    <div className="timeline-container relative z-[1000] p-4 bg-slate-900/90 border border-amber-900/40 rounded-xl backdrop-blur-md text-amber-100">
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onYearChange(Math.max(minYear, selectedYear - 10))}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => onYearChange(Math.max(minYear, selectedYear - 1))}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onTogglePlay}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded flex items-center gap-2 text-sm"
          >
            {isPlaying ? '⏸ Тоқтату' : '▶ Тарихты бастау'}
          </button>
          <button
            type="button"
            onClick={() => onYearChange(Math.min(maxYear, selectedYear + 1))}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => onYearChange(Math.min(maxYear, selectedYear + 10))}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs"
          >
            »
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={showAllEvents}
            onChange={(e) => onToggleShowAllEvents(e.target.checked)}
            className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-amber-500"
          />
          Барлық оқиғаларды көрсету
        </label>
      </div>

      <div className="relative pt-6">
        <div
          className="absolute -top-1 transform -translate-x-1/2 bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-bold text-xs shadow-md"
          style={{
            left: `${((selectedYear - minYear) / (maxYear - minYear)) * 100}%`,
          }}
        >
          {selectedYear} ж.
        </div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="w-full accent-amber-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>{minYear}</span>
          <span>{maxYear}</span>
        </div>
      </div>
    </div>
  );
};