export type Tab = 'home' | 'fixtures';

export interface Channel {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoUrl?: string;
  quality: string;
  streamUrl?: string;
  /** Backup stream URLs tried in order if the primary fails. */
  fallbackUrls?: string[];
  poster?: string;
}
