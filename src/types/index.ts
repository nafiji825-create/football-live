export interface Match {
  id: string;
  homeTeam: string;
  homeAbbr: string;
  homeFlag: string;
  awayTeam: string;
  awayAbbr: string;
  awayFlag: string;
  league: string;
  leagueLogo?: string;
  date: string;   // UTC date "2026-06-20"
  time: string;   // UTC time "21:00"
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  isFeatured?: boolean;
  /** Channel IDs assigned to this match */
  channelIds: string[];
}

export interface Channel {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoUrl?: string;
  country?: string;
  countryFlag?: string;
  quality: string;
  streamUrl?: string;
  /** Backup stream URLs tried in order if the primary fails. */
  fallbackUrls?: string[];
  poster?: string;
}

export interface Fixture {
  matchday: string;
  label?: string;
  matches: {
    home: string;
    homeFlag: string;
    away: string;
    awayFlag: string;
    time: string;
    status: string;
    homeScore?: number;
    awayScore?: number;
    minute?: number;
  }[];
}

export type Tab = 'home' | 'live' | 'favorites';
