// Фиксированные праздники РФ (каждый год в одну дату)
export const FIXED_HOLIDAYS = [
  '01-01',
  '01-02',
  '01-03',
  '01-04',
  '01-05',
  '01-06',
  '01-07',
  '01-08',
  '02-23',
  '03-08',
  '05-01',
  '05-09',
  '06-12',
  '11-04'
];

// Ручные выходные (позже будем сохранять в IndexedDB)
export const manualHolidays = new Set();

export function isHoliday(date) {
  const mmdd = date.toISOString().slice(5, 10);
  const iso = date.toISOString().slice(0, 10);

  return FIXED_HOLIDAYS.includes(mmdd) || manualHolidays.has(iso);
}
