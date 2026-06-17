/**
 * Live FIFA World Cup 2026 data via TheSportsDB (free, CORS-enabled, no key needed).
 *
 * The site fetches real fixtures + scores directly in the browser, refreshing every
 * 60 seconds so live scores update automatically.
 *
 * Docs: https://www.thesportsdb.com/api.php
 * Endpoint used: eventsday.php?d=YYYY-MM-DD&s=Soccer  (idLeague 4429 = FIFA World Cup)
 */

const API = 'https://www.thesportsdb.com/api/v1/json/3';
const WORLD_CUP_LEAGUE_ID = '4429';

export interface WcMatch {
  id: string;
  home: string;
  away: string;
  homeFlag: string;
  awayFlag: string;
  homeFlagImg: string;   // real PNG flag URL from flagcdn.com
  awayFlagImg: string;
  date: string;     // YYYY-MM-DD (UTC)
  time: string;     // HH:MM (UTC)
  homeScore: number | null;
  awayScore: number | null;
  status: 'upcoming' | 'live' | 'finished';
  minute?: string;  // e.g. "67'" when live
  round?: string;
  stadium?: string;
  thumb?: string;
}

interface RawEvent {
  idEvent: string;
  idLeague: string;
  strHomeTeam: string;
  strAwayTeam: string;
  dateEvent: string;
  strTime: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string | null;
  strRound: string | null;
  strVenue: string | null;
  strThumb: string | null;
  strTimestamp: string | null;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Build a YYYY-MM-DD string for `daysFromNow` offset (0 = today). */
export function dayKey(daysFromNow: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + daysFromNow);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

/** Determine live/finished status from TheSportsDB strStatus field. */
function deriveStatus(raw: RawEvent): { status: WcMatch['status']; minute?: string } {
  const s = (raw.strStatus || '').toUpperCase();
  // Live indicators: numeric minute, "1H", "2H", "HT", "LIVE", "ET", "P"
  if (/^(LIVE|HT|ET|P$)/.test(s)) return { status: 'live', minute: s === 'HT' ? 'HT' : s };
  if (/^\d{1,3}'?$/.test(s)) return { status: 'live', minute: s.endsWith("'") ? s : `${s}'` };
  if (/^[1-9]$|^1[0-9]$|^2[0-9]$/.test(s)) return { status: 'live', minute: `${s}'` };
  // Finished
  if (s === 'FT' || s === 'AET' || s === 'PEN' || s === 'Match Finished' || s.includes('FINISH')) {
    return { status: 'finished' };
  }
  // Not started
  if (s === 'NS' || s === 'TBD' || s === '' || s === 'NOT STARTED') {
    // Fallback: if the match started <2h ago and has a score, treat as live
    return { status: 'upcoming' };
  }
  return { status: 'upcoming' };
}

function normalize(raw: RawEvent): WcMatch {
  // TheSportsDB strTime is like "20:00:00" — keep HH:MM
  const time = (raw.strTime || '00:00:00').slice(0, 5);
  const { status, minute } = deriveStatus(raw);

  // Extra live heuristic: has scores but status NS, and within match window
  const hasScore = raw.intHomeScore !== null && raw.intAwayScore !== null;
  let finalStatus = status;
  let finalMinute = minute;
  if (status === 'upcoming' && hasScore) {
    // already has a score → either live or finished. Treat as finished if FT-ish.
    finalStatus = 'finished';
  }

  return {
    id: raw.idEvent,
    home: raw.strHomeTeam,
    away: raw.strAwayTeam,
    homeFlag: flagForTeamLocal(raw.strHomeTeam),
    awayFlag: flagForTeamLocal(raw.strAwayTeam),
    homeFlagImg: flagImgUrlLocal(raw.strHomeTeam),
    awayFlagImg: flagImgUrlLocal(raw.strAwayTeam),
    date: raw.dateEvent,
    time,
    homeScore: raw.intHomeScore !== null ? Number(raw.intHomeScore) : null,
    awayScore: raw.intAwayScore !== null ? Number(raw.intAwayScore) : null,
    status: finalStatus,
    minute: finalMinute,
    round: raw.strRound || undefined,
    stadium: raw.strVenue || undefined,
    thumb: raw.strThumb || undefined,
  };
}

// local imports to avoid circular issues
import { flagForTeam, flagImgUrl } from './flags';
function flagForTeamLocal(team: string): string {
  return flagForTeam(team);
}
function flagImgUrlLocal(team: string): string {
  return flagImgUrl(team);
}

/** Fetch all FIFA World Cup matches for a single day. */
async function fetchDay(dateKey: string): Promise<WcMatch[]> {
  const url = `${API}/eventsday.php?d=${dateKey}&s=Soccer`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const json = await res.json();
    const events: RawEvent[] = (json.events || []).filter(
      (e: RawEvent) => String(e.idLeague) === WORLD_CUP_LEAGUE_ID
    );
    return events.map(normalize);
  } catch {
    return [];
  }
}

/**
 * Fetch FIFA World Cup matches across a range of days (default today + 9 days).
 * Returns a flat array sorted by date+time. De-dupes by event id.
 */
export async function fetchWorldCup(daysAhead = 9): Promise<WcMatch[]> {
  const dates: string[] = [];
  for (let i = 0; i <= daysAhead; i++) dates.push(dayKey(i));
  const results = await Promise.all(dates.map(fetchDay));
  const all = results.flat();
  // de-dupe by id
  const seen = new Set<string>();
  const unique = all.filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)));
  // sort by datetime UTC
  unique.sort((a, b) => {
    const da = `${a.date}T${a.time}:00Z`;
    const db = `${b.date}T${b.time}:00Z`;
    return da.localeCompare(db);
  });
  return unique;
}

/** Group matches by day for schedule display. */
export function groupByDay(matches: WcMatch[]): { day: string; label: string; matches: WcMatch[] }[] {
  const map = new Map<string, WcMatch[]>();
  matches.forEach((m) => {
    if (!map.has(m.date)) map.set(m.date, []);
    map.get(m.date)!.push(m);
  });
  const today = dayKey(0);
  const tomorrow = dayKey(1);
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, ms]) => ({
      day,
      label: day === today ? 'Today' : day === tomorrow ? 'Tomorrow' : prettyDate(day),
      matches: ms,
    }));
}

function prettyDate(dayKey: string): string {
  const d = new Date(`${dayKey}T00:00:00Z`);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getUTCDay()]}, ${d.getUTCDate()} ${months[d.getUTCMonth()]}`;
}
