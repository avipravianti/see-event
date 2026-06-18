const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export interface EventDateFields {
  /** ISO / datetime-local value set on events created via the form. */
  dateValue?: string;
  /** Friendly display string, e.g. "SUN, OCT 24 @ 1:15 AM ICT". */
  time?: string;
  dateStart?: string;
}

/**
 * Resolve an event's date. Prefers the precise `dateValue`; falls back to
 * parsing the friendly display string (assuming the current year, which it
 * lacks). Returns null when nothing parseable is available.
 */
export function parseEventDate(event: EventDateFields, now: Date = new Date()): Date | null {
  if (event.dateValue) {
    const d = new Date(event.dateValue);
    if (!Number.isNaN(d.getTime())) return d;
  }

  const display = event.time ?? event.dateStart ?? '';
  const match = display.match(/([A-Z]{3})\s+(\d{1,2})\s*@\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (match) {
    const month = MONTHS.indexOf(match[1].toUpperCase());
    if (month >= 0) {
      const day = Number(match[2]);
      let hour = Number(match[3]) % 12;
      if (/PM/i.test(match[5])) hour += 12;
      const minute = Number(match[4]);
      return new Date(now.getFullYear(), month, day, hour, minute);
    }
  }
  return null;
}

export const DATE_BUCKETS = [
  'Today',
  'Tomorrow',
  'This Week',
  'This Month',
  'This Year',
] as const;

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const DAY_MS = 86_400_000;

/**
 * Does `date` fall within the named bucket relative to `now`?
 * An empty/"All Time" bucket matches everything; a specific bucket never
 * matches a null date.
 */
export function matchesDateBucket(
  date: Date | null,
  bucket: string,
  now: Date = new Date(),
): boolean {
  if (!bucket || bucket === 'All Time') return true;
  if (!date) return false;

  const today = startOfDay(now);
  const target = startOfDay(date);
  const dayDiff = Math.round((target.getTime() - today.getTime()) / DAY_MS);

  switch (bucket) {
    case 'Today':
      return dayDiff === 0;
    case 'Tomorrow':
      return dayDiff === 1;
    case 'This Week':
      return dayDiff >= 0 && dayDiff < 7;
    case 'This Month':
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    case 'This Year':
      return date.getFullYear() === now.getFullYear();
    default:
      return true;
  }
}
