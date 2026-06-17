export interface Match {
  id: string;
  homeTeam: string;
  homeAbbr: string;
  awayTeam: string;
  awayAbbr: string;
  league: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  isFeatured?: boolean;
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
  matches: {
    home: string;
    homeFlag: string;
    away: string;
    awayFlag: string;
    time: string;
    status: string;
  }[];
}

export type Tab = 'home' | 'live' | 'favorites';
