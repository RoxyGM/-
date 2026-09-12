/** Форматирует год с пометкой "до н.э." при отрицательном значении (на будущее) и склонением "год/года/лет" */
export function formatYear(year: number): string {
  return `${year} г.`;
}

/** Активна ли территория/событие в заданном году (включительно) */
export function isActiveInYear(year: number, start: number, end: number): boolean {
  return year >= start && year <= end;
}

/** Насколько близко событие к выбранному году (для определения видимости маркеров) */
export function yearDistance(eventYear: number, eventYearEnd: number | undefined, selectedYear: number): number {
  const end = eventYearEnd ?? eventYear;
  if (selectedYear >= eventYear && selectedYear <= end) return 0;
  return selectedYear < eventYear ? eventYear - selectedYear : selectedYear - end;
}
