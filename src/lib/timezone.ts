/**
 * Timezone helpers.
 *
 * Match "date" + "time" fields are stored as UTC (the world clock).
 * These helpers convert them into the VIEWER's own local timezone so that
 * wherever they open the site — Bangladesh, USA, UK — they see the correct
 * local kickoff time for their device.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Parse a stored "2026-06-18" + "21:00" (UTC) into a real Date object. */
export function parseMatchUTC(date: string, time: string): Date {
  // treat stored time as UTC
  return new Date(`${date}T${time}:00Z`);
}

/**
 * Convert a UTC match date+time into the viewer's local timezone and return
 * a friendly string e.g. "Sat, 18 Jun · 03:00 AM".
 */
export function formatLocalTime(date: string, time: string): string {
  const d = parseMatchUTC(date, time);
  if (isNaN(d.getTime())) return time;
  const day = DAYS[d.getDay()];
  const month = MONTHS[d.getMonth()];
  const dateNum = d.getDate();
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${day}, ${dateNum} ${month} · ${hours}:${mins} ${ampm}`;
}

/** Short version: just the clock e.g. "03:00 AM" in local tz. */
export function formatLocalClock(date: string, time: string): string {
  const d = parseMatchUTC(date, time);
  if (isNaN(d.getTime())) return time;
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const mins = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${mins} ${ampm}`;
}

/** Relative "starts in" countdown string, e.g. "in 3h 20m". */
export function timeUntil(date: string, time: string): string {
  const d = parseMatchUTC(date, time);
  const diff = d.getTime() - Date.now();
  if (diff <= 0) return 'Started';
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `in ${mins}m`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hours < 24) return `in ${hours}h${remMins ? ` ${remMins}m` : ''}`;
  const days = Math.floor(hours / 24);
  return `in ${days}d`;
}

/** The viewer's current timezone label, e.g. "GMT+6 (Dhaka)". */
export function viewerTimezoneLabel(): string {
  try {
    const offset = -new Date().getTimezoneOffset() / 60;
    const sign = offset >= 0 ? '+' : '';
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const city = tzName.split('/').pop()?.replace(/_/g, ' ') || '';
    return `GMT${sign}${offset}${city ? ` · ${city}` : ''}`;
  } catch {
    return 'Local Time';
  }
}
