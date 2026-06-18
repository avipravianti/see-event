import { describe, it, expect } from 'vitest';
import { parseEventDate, matchesDateBucket } from './eventDate';

const NOW = new Date(2026, 5, 17, 12, 0); // 2026-06-17

describe('parseEventDate', () => {
  it('uses dateValue when present', () => {
    const d = parseEventDate({ dateValue: '2026-10-24T01:15' });
    expect(d?.getFullYear()).toBe(2026);
    expect(d?.getMonth()).toBe(9); // October
    expect(d?.getDate()).toBe(24);
  });

  it('parses the friendly display string (current year)', () => {
    const d = parseEventDate({ time: 'SUN, OCT 24 @ 1:15 AM ICT' }, NOW);
    expect(d?.getMonth()).toBe(9);
    expect(d?.getDate()).toBe(24);
    expect(d?.getFullYear()).toBe(2026);
  });

  it('returns null when nothing is parseable', () => {
    expect(parseEventDate({ time: 'sometime soon' })).toBeNull();
  });
});

describe('matchesDateBucket', () => {
  const today = new Date(2026, 5, 17, 9, 0);
  const tomorrow = new Date(2026, 5, 18, 9, 0);
  const inThreeDays = new Date(2026, 5, 20, 9, 0);
  const nextMonth = new Date(2026, 7, 1, 9, 0);

  it('matches everything for empty / All Time', () => {
    expect(matchesDateBucket(null, '', NOW)).toBe(true);
    expect(matchesDateBucket(nextMonth, 'All Time', NOW)).toBe(true);
  });

  it('never matches a null date for a specific bucket', () => {
    expect(matchesDateBucket(null, 'Today', NOW)).toBe(false);
  });

  it('buckets Today / Tomorrow / This Week', () => {
    expect(matchesDateBucket(today, 'Today', NOW)).toBe(true);
    expect(matchesDateBucket(tomorrow, 'Today', NOW)).toBe(false);
    expect(matchesDateBucket(tomorrow, 'Tomorrow', NOW)).toBe(true);
    expect(matchesDateBucket(inThreeDays, 'This Week', NOW)).toBe(true);
    expect(matchesDateBucket(nextMonth, 'This Week', NOW)).toBe(false);
  });

  it('buckets This Month / This Year', () => {
    expect(matchesDateBucket(today, 'This Month', NOW)).toBe(true);
    expect(matchesDateBucket(nextMonth, 'This Month', NOW)).toBe(false);
    expect(matchesDateBucket(nextMonth, 'This Year', NOW)).toBe(true);
  });
});
