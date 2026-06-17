import type { Match, Channel, Fixture } from '@/types';

export const matches: Match[] = [
  {
    id: '1',
    homeTeam: 'Man City', homeAbbr: 'MCI',
    awayTeam: 'Real Madrid', awayAbbr: 'RMA',
    league: 'UCL', date: '2026-06-20', time: '21:00',
    status: 'upcoming', isFeatured: true
  },
  {
    id: '2',
    homeTeam: 'Arsenal', homeAbbr: 'ARS',
    awayTeam: 'Chelsea', awayAbbr: 'CHE',
    league: 'EPL', date: '2026-06-17', time: '20:30',
    status: 'live', homeScore: 3, awayScore: 1, minute: 65
  },
  {
    id: '3',
    homeTeam: 'Barcelona', homeAbbr: 'BAR',
    awayTeam: 'Sevilla', awayAbbr: 'SEV',
    league: 'La Liga', date: '2026-06-17', time: '21:00',
    status: 'upcoming'
  },
  {
    id: '4',
    homeTeam: 'Juventus', homeAbbr: 'JUV',
    awayTeam: 'Inter', awayAbbr: 'INT',
    league: 'Serie A', date: '2026-06-17', time: '22:45',
    status: 'upcoming'
  },
  {
    id: '5',
    homeTeam: 'Bayern', homeAbbr: 'BAY',
    awayTeam: 'Dortmund', awayAbbr: 'DOR',
    league: 'Bundesliga', date: '2026-06-16', time: '20:00',
    status: 'finished', homeScore: 3, awayScore: 2
  },
  {
    id: '6',
    homeTeam: 'Liverpool', homeAbbr: 'LIV',
    awayTeam: 'Man United', awayAbbr: 'MUN',
    league: 'EPL', date: '2026-06-17', time: '20:30',
    status: 'upcoming'
  },
  {
    id: '7',
    homeTeam: 'PSG', homeAbbr: 'PSG',
    awayTeam: 'Marseille', awayAbbr: 'MAR',
    league: 'Ligue 1', date: '2026-06-18', time: '21:00',
    status: 'upcoming'
  },
  {
    id: '8',
    homeTeam: 'Portugal', homeAbbr: 'POR',
    awayTeam: 'Congo DR', awayAbbr: 'CON',
    league: 'FIFA', date: '2026-06-17', time: '01:00',
    status: 'upcoming'
  },
  {
    id: '9',
    homeTeam: 'England', homeAbbr: 'ENG',
    awayTeam: 'Croatia', awayAbbr: 'CRO',
    league: 'FIFA', date: '2026-06-18', time: '04:00',
    status: 'upcoming'
  },
  {
    id: '10',
    homeTeam: 'Ghana', homeAbbr: 'GHA',
    awayTeam: 'Panama', awayAbbr: 'PAN',
    league: 'FIFA', date: '2026-06-18', time: '07:00',
    status: 'upcoming'
  }
];

// ---------------------------------------------------------------------------
// CHANNELS — now wired to REAL, legal, free HLS (.m3u8) streams.
//
// Every URL below is a publicly-available demo / free-to-use stream intended
// for testing and embedding. They are stable, royalty-free, and legal to play
// in any player. Replace any of them with YOUR OWN .m3u8 / video URLs later.
//
// Sources used:
//  - Apple's public HLS test streams (sample content, free for testing)
//  - Mux test streams (publicly published for HLS playback testing)
//  - Akamai public demo streams
//  - librsvg / Big Buck Bunny (Creative Commons, royalty-free)
// ---------------------------------------------------------------------------
export const channels: Channel[] = [
  {
    id: '1',
    name: 'Apple Demo HD',
    category: 'Free Demo Channels',
    logo: 'APPLE',
    quality: 'FULL HD',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
  {
    id: '2',
    name: 'Big Buck Bunny TV',
    category: 'Free Demo Channels',
    logo: 'BBB',
    quality: 'FULL HD',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
  {
    id: '3',
    name: 'Mux Adaptive HD',
    category: 'Free Demo Channels',
    logo: 'MUX',
    country: 'Global', countryFlag: '🌍',
    quality: 'ADAPTIVE',
    streamUrl: 'https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
  },
  {
    id: '4',
    name: 'Tears of Steel',
    category: 'Free Demo Channels',
    logo: 'ToS',
    quality: 'FULL HD',
    streamUrl: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
  },
  {
    id: '5',
    name: 'Sintel Cinema',
    category: 'Free Demo Channels',
    logo: 'SNTL',
    country: 'Blender', countryFlag: '🎬',
    quality: 'FULL HD',
    streamUrl: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
  },
  {
    id: '6',
    name: 'Elephants Dream',
    category: 'Free Demo Channels',
    logo: 'ED',
    country: 'Blender', countryFlag: '🎬',
    quality: 'FULL HD',
    streamUrl: 'https://test-streams.mux.dev/test_001/stream.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
  },
];

export const fixtures: Fixture[] = [
  {
    matchday: '2026-06-18',
    matches: [
      { home: 'Portugal', homeFlag: '🇵🇹', away: 'Congo DR', awayFlag: '🇨🇩', time: '01:00', status: 'Upcoming' },
      { home: 'England', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Croatia', awayFlag: '🇭🇷', time: '04:00', status: 'Upcoming' },
      { home: 'Ghana', homeFlag: '🇬🇭', away: 'Panama', awayFlag: '🇵🇦', time: '07:00', status: 'Upcoming' },
      { home: 'Uzbekistan', homeFlag: '🇺🇿', away: 'Colombia', awayFlag: '🇨🇴', time: '10:00', status: 'Upcoming' },
    ]
  },
  {
    matchday: '2026-06-19',
    matches: [
      { home: 'Czechia', homeFlag: '🇨🇿', away: 'South Africa', awayFlag: '🇿🇦', time: '00:00', status: 'Upcoming' },
      { home: 'Switzerland', homeFlag: '🇨🇭', away: 'Bosnia', awayFlag: '🇧🇦', time: '03:00', status: 'Upcoming' },
      { home: 'Canada', homeFlag: '🇨🇦', away: 'Qatar', awayFlag: '🇶🇦', time: '06:00', status: 'Upcoming' },
      { home: 'Mexico', homeFlag: '🇲🇽', away: 'Korea Rep.', awayFlag: '🇰🇷', time: '09:00', status: 'Upcoming' },
    ]
  },
  {
    matchday: '2026-06-20',
    matches: [
      { home: 'USA', homeFlag: '🇺🇸', away: 'Australia', awayFlag: '🇦🇺', time: '03:00', status: 'Upcoming' },
      { home: 'Scotland', homeFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', away: 'Morocco', awayFlag: '🇲🇦', time: '06:00', status: 'Upcoming' },
      { home: 'Brazil', homeFlag: '🇧🇷', away: 'Haiti', awayFlag: '🇭🇹', time: '08:30', status: 'Upcoming' },
      { home: 'Turkiye', homeFlag: '🇹🇷', away: 'Paraguay', awayFlag: '🇵🇾', time: '11:00', status: 'Upcoming' },
    ]
  },
];

export const leagues = ['All', 'EPL', 'La Liga', 'UCL', 'Serie A', 'Bundesliga', 'Ligue 1', 'FIFA'];
