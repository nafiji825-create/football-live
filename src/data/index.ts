import type { Match, Channel, Fixture } from '@/types';

// ---------------------------------------------------------------------------
// MATCHES — organized by league, with channel IDs and team flags.
// Times are stored as UTC. The UI converts them to the viewer's local timezone.
// ---------------------------------------------------------------------------

export const matches: Match[] = [
  // ── FIFA World Cup 2026 ──────────────────────────────────────────────
  {
    id: 'wc1',
    homeTeam: 'Portugal', homeAbbr: 'POR', homeFlag: '🇵🇹',
    awayTeam: 'Congo DR', awayAbbr: 'COD', awayFlag: '🇨🇩',
    league: 'FIFA World Cup', date: '2026-06-17', time: '01:00',
    status: 'live', homeScore: 2, awayScore: 1, minute: 72,
    isFeatured: true,
    channelIds: ['1', '2', '3', '4', '12'],
  },
  {
    id: 'wc2',
    homeTeam: 'England', homeAbbr: 'ENG', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'Croatia', awayAbbr: 'CRO', awayFlag: '🇭🇷',
    league: 'FIFA World Cup', date: '2026-06-17', time: '20:00',
    status: 'upcoming',
    isFeatured: true,
    channelIds: ['1', '2', '5', '6'],
  },
  {
    id: 'wc3',
    homeTeam: 'Ghana', homeAbbr: 'GHA', homeFlag: '🇬🇭',
    awayTeam: 'Panama', awayAbbr: 'PAN', awayFlag: '🇵🇦',
    league: 'FIFA World Cup', date: '2026-06-17', time: '22:00',
    status: 'upcoming',
    isFeatured: true,
    channelIds: ['1', '2', '12', '13'],
  },
  {
    id: 'wc4',
    homeTeam: 'USA', homeAbbr: 'USA', homeFlag: '🇺🇸',
    awayTeam: 'Australia', awayAbbr: 'AUS', awayFlag: '🇦🇺',
    league: 'FIFA World Cup', date: '2026-06-18', time: '01:00',
    status: 'upcoming',
    isFeatured: true,
    channelIds: ['4', '5', '6', '12'],
  },
  {
    id: 'wc5',
    homeTeam: 'Brazil', homeAbbr: 'BRA', homeFlag: '🇧🇷',
    awayTeam: 'Serbia', awayAbbr: 'SRB', awayFlag: '🇷🇸',
    league: 'FIFA World Cup', date: '2026-06-18', time: '03:00',
    status: 'upcoming',
    isFeatured: true,
    channelIds: ['1', '2', '3', '12'],
  },
  {
    id: 'wc6',
    homeTeam: 'France', homeAbbr: 'FRA', homeFlag: '🇫🇷',
    awayTeam: 'Peru', awayAbbr: 'PER', awayFlag: '🇵🇪',
    league: 'FIFA World Cup', date: '2026-06-18', time: '21:00',
    status: 'upcoming',
    isFeatured: true,
    channelIds: ['1', '2', '4', '12'],
  },
  // ── UEFA Champions League ────────────────────────────────────────────
  {
    id: 'ucl1',
    homeTeam: 'Man City', homeAbbr: 'MCI', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'Real Madrid', awayAbbr: 'RMA', awayFlag: '🇪🇸',
    league: 'UEFA Champions League', date: '2026-06-20', time: '21:00',
    status: 'upcoming',
    isFeatured: false,
    channelIds: ['1', '2', '3', '4'],
  },
  // ── English Premier League ────────────────────────────────────────────
  {
    id: 'epl1',
    homeTeam: 'Arsenal', homeAbbr: 'ARS', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'Chelsea', awayAbbr: 'CHE', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    league: 'English Premier League', date: '2026-06-17', time: '19:30',
    status: 'live', homeScore: 3, awayScore: 1, minute: 65,
    channelIds: ['4', '5', '6'],
  },
  {
    id: 'epl2',
    homeTeam: 'Liverpool', homeAbbr: 'LIV', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    awayTeam: 'Man United', awayAbbr: 'MUN', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    league: 'English Premier League', date: '2026-06-17', time: '22:00',
    status: 'upcoming',
    channelIds: ['4', '5', '12'],
  },
  // ── La Liga ──────────────────────────────────────────────────────────
  {
    id: 'lal1',
    homeTeam: 'Barcelona', homeAbbr: 'BAR', homeFlag: '🇪🇸',
    awayTeam: 'Sevilla', awayAbbr: 'SEV', awayFlag: '🇪🇸',
    league: 'La Liga', date: '2026-06-17', time: '21:00',
    status: 'upcoming',
    channelIds: ['1', '2', '12'],
  },
  // ── Serie A ──────────────────────────────────────────────────────────
  {
    id: 'ser1',
    homeTeam: 'Juventus', homeAbbr: 'JUV', homeFlag: '🇮🇹',
    awayTeam: 'Inter Milan', awayAbbr: 'INT', awayFlag: '🇮🇹',
    league: 'Serie A', date: '2026-06-17', time: '20:45',
    status: 'upcoming',
    channelIds: ['12', '13', '14'],
  },
  // ── Bundesliga ───────────────────────────────────────────────────────
  {
    id: 'bun1',
    homeTeam: 'Bayern Munich', homeAbbr: 'BAY', homeFlag: '🇩🇪',
    awayTeam: 'Dortmund', awayAbbr: 'BVB', awayFlag: '🇩🇪',
    league: 'Bundesliga', date: '2026-06-16', time: '18:00',
    status: 'finished', homeScore: 3, awayScore: 2,
    channelIds: ['12', '13'],
  },
  // ── Ligue 1 ─────────────────────────────────────────────────────────
  {
    id: 'lig1',
    homeTeam: 'PSG', homeAbbr: 'PSG', homeFlag: '🇫🇷',
    awayTeam: 'Marseille', awayAbbr: 'OL', awayFlag: '🇫🇷',
    league: 'Ligue 1', date: '2026-06-18', time: '21:00',
    status: 'upcoming',
    channelIds: ['1', '2', '12'],
  },
];

// ---------------------------------------------------------------------------
// CHANNELS — REAL, LEGAL, FREE-TO-AIR live sports channels from iptv-org
// ---------------------------------------------------------------------------

interface RawChannel {
  name: string;
  logo: string;
  url: string;
}

const verified: RawChannel[] = [
  { name: 'beIN SPORTS XTRA', logo: 'https://i.ibb.co/HT49GPmB/XTRA-2.png', url: 'https://bein-xtra-bein.amagi.tv/playlist.m3u8' },
  { name: 'beIN Sports XTRA Español', logo: 'https://i.imgur.com/V562tpO.png', url: 'https://dc1644a9jazgj.cloudfront.net/beIN_Sports_Xtra_Espanol.m3u8' },
  { name: 'ESPN 8 The Ocho', logo: 'https://images.fubo.tv/channel-config-ui/station-logos/on-demand-images/ESPNTheOcho_light.png', url: 'https://d3b6q2ou5kp8ke.cloudfront.net/ESPNTheOcho.m3u8' },
  { name: 'FOX Sports', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/FOX_Sports_logo.svg/512px-FOX_Sports_logo.svg.png', url: 'https://jmp2.uk/plu-5a74b8e1e22a61737979c6bf.m3u8' },
  { name: 'fubo Sports Network', logo: 'https://i.imgur.com/qFNRJLb.png', url: 'https://dnf08l6u6uxnz.cloudfront.net/master.m3u8' },
  { name: 'Pac 12 Insider', logo: 'https://i.imgur.com/736QREy.png', url: 'https://pac12-firetv.amagi.tv/playlist.m3u8' },
  { name: 'ACCN (ACCDN)', logo: 'https://i.imgur.com/V6Kaqha.png', url: 'https://raycom-accdn-firetv.amagi.tv/playlist.m3u8' },
  { name: 'PFL MMA', logo: 'https://provider-static.plex.tv/epg/cms/production/96dd0531f04f426a8e7f580e970e040d.png', url: 'https://jmp2.uk/plu-64f6180130ab3300083d896b.m3u8' },
  { name: 'DAZN Combat', logo: 'https://i.postimg.cc/VsW3Jsrz/logo-DAZN-Combat.png', url: 'https://dazn-combat-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-dazn-combat-rakuten/playlist.m3u8' },
  { name: 'Red Bull TV', logo: 'https://i.imgur.com/Ru5gWCh.png', url: 'https://3ea22335.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlbg/redbulltv/master.m3u8' },
  { name: 'Red Bull TV US', logo: 'https://i.imgur.com/Ru5gWCh.png', url: 'https://0b73ace69ebb45eaa249bb87837cb958.mediatailor.us-west-2.amazonaws.com/v1/master/04fd926bb418090b6c44751329447444ff6e3b5f/redbull-desktop/playlist.m3u8' },
  { name: 'Pluto TV Sports', logo: 'https://images.pluto.tv/channels/608030eff4b6f70007e1684c/colorLogoPNG.png', url: 'https://jmp2.uk/plu-608030eff4b6f70007e1684c.m3u8' },
  { name: 'Pluto TV Deportes', logo: 'https://images.pluto.tv/channels/5dcde07af1c85b0009b18651/colorLogoPNG.png', url: 'https://jmp2.uk/plu-5dcde07af1c85b0009b18651.m3u8' },
  { name: 'Pluto TV E-Sports', logo: 'https://images.pluto.tv/channels/5ff3934600d4b0000733ff49/colorLogoPNG.png', url: 'https://jmp2.uk/plu-5ff3934600d4b0000733ff49.m3u8' },
  { name: 'Pluto TV Esportes', logo: 'https://images.pluto.tv/channels/5f32d2db0af67400077f29c4/colorLogoPNG.png', url: 'https://jmp2.uk/plu-5f32d2db0af67400077f29c4.m3u8' },
  { name: 'Pluto TV Fishing', logo: 'https://images.pluto.tv/channels/619e1874e0d3a7000729a036/colorLogoPNG.png', url: 'https://jmp2.uk/plu-619e1874e0d3a7000729a036.m3u8' },
  { name: 'Pluto TV Snooker 900', logo: 'https://images.pluto.tv/channels/68ac5543a1ac0c90f2c8943e/colorLogoPNG.png', url: 'https://jmp2.uk/plu-68ac5543a1ac0c90f2c8943e.m3u8' },
  { name: 'DAZN Darts', logo: 'https://images.pluto.tv/channels/64b67f0424ade50008a3be17/colorLogoPNG.png', url: 'https://jmp2.uk/plu-64b67f0424ade50008a3be17.m3u8' },
  { name: 'DAZN Handball', logo: 'https://images.pluto.tv/channels/6683f7fe36a2f9000804940c/colorLogoPNG.png', url: 'https://jmp2.uk/plu-6683f7fe36a2f9000804940c.m3u8' },
  { name: '30A Golf Kingdom', logo: 'https://i.imgur.com/Lv53nh4.png', url: 'https://30a-tv.com/feeds/vidaa/golf.m3u8' },
  { name: 'TSN The Ocho', logo: 'https://tvpnlogopus.samsungcloud.tv/platform/image/sourcelogo/10543.png', url: 'https://d3pnbvng3bx2nj.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a98c1a79/SITES/180Directv/tsn-ocho/index.m3u8' },
];

function pickCategory(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('bein') || n.includes('fox sports') || n.includes('espn') || n.includes('tsn')) return 'Premium Sports';
  if (n.includes('fubo') || n.includes('accn') || n.includes('pac 12')) return 'US Sports';
  if (n.includes('mma') || n.includes('combat') || n.includes('dazn combat')) return 'Combat Sports';
  if (n.includes('dart') || n.includes('snooker') || n.includes('billiard')) return 'Indoor Sports';
  if (n.includes('red bull')) return 'Action Sports';
  if (n.includes('golf')) return 'Golf';
  if (n.includes('fishing')) return 'Outdoors';
  if (n.includes('esport') || n.includes('e-sports')) return 'E-Sports';
  if (n.includes('handball')) return 'Handball';
  if (n.includes('pluto')) return 'Pluto TV Sports';
  return 'World Sports';
}

function pickCountry(name: string): { country: string; flag: string } {
  const n = name.toLowerCase();
  if (n.includes('español') || n.includes('deportes')) return { country: 'Spain', flag: '🇪🇸' };
  if (n.includes('esportes')) return { country: 'Brazil', flag: '🇧🇷' };
  if (n.includes('us') || n.includes('red bull tv us')) return { country: 'USA', flag: '🇺🇸' };
  if (n.includes('red bull')) return { country: 'Global', flag: '🌍' };
  return { country: 'USA', flag: '🇺🇸' };
}

export const channels: Channel[] = verified.map((c, idx) => {
  const { country, flag } = pickCountry(c.name);
  return {
    id: String(idx + 1),
    name: c.name,
    category: pickCategory(c.name),
    logo: c.name.slice(0, 3).toUpperCase(),
    logoUrl: c.logo,
    country,
    countryFlag: flag,
    quality: 'FULL HD',
    streamUrl: c.url,
    poster: c.logo,
  };
});

// Demo channels
channels.push(
  {
    id: 'd1',
    name: 'Big Buck Bunny TV',
    category: 'Free Demo Channels',
    logo: 'BBB',
    country: 'Blender', countryFlag: '🎬',
    quality: 'FULL HD',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
  {
    id: 'd2',
    name: 'Apple Demo HD',
    category: 'Free Demo Channels',
    logo: 'APPLE',
    quality: 'FULL HD',
    streamUrl: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
  },
);

// ---------------------------------------------------------------------------
// FIXTURES — upcoming schedule with flags & live scores
// ---------------------------------------------------------------------------

export const fixtures: Fixture[] = [
  {
    matchday: '2026-06-17',
    label: 'Today',
    matches: [
      { home: 'Portugal', homeFlag: '🇵🇹', away: 'Congo DR', awayFlag: '🇨🇩', time: '01:00', status: 'LIVE', homeScore: 2, awayScore: 1, minute: 72 },
      { home: 'Arsenal', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Chelsea', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', time: '19:30', status: 'LIVE', homeScore: 3, awayScore: 1, minute: 65 },
      { home: 'England', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Croatia', awayFlag: '🇭🇷', time: '20:00', status: 'Upcoming' },
      { home: 'Barcelona', homeFlag: '🇪🇸', away: 'Sevilla', awayFlag: '🇪🇸', time: '21:00', status: 'Upcoming' },
      { home: 'Juventus', homeFlag: '🇮🇹', away: 'Inter Milan', awayFlag: '🇮🇹', time: '20:45', status: 'Upcoming' },
      { home: 'Ghana', homeFlag: '🇬🇭', away: 'Panama', awayFlag: '🇵🇦', time: '22:00', status: 'Upcoming' },
      { home: 'Liverpool', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Man United', awayFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', time: '22:00', status: 'Upcoming' },
    ]
  },
  {
    matchday: '2026-06-18',
    label: 'Tomorrow',
    matches: [
      { home: 'USA', homeFlag: '🇺🇸', away: 'Australia', awayFlag: '🇦🇺', time: '01:00', status: 'Upcoming' },
      { home: 'Brazil', homeFlag: '🇧🇷', away: 'Serbia', awayFlag: '🇷🇸', time: '03:00', status: 'Upcoming' },
      { home: 'France', homeFlag: '🇫🇷', away: 'Peru', awayFlag: '🇵🇪', time: '21:00', status: 'Upcoming' },
      { home: 'PSG', homeFlag: '🇫🇷', away: 'Marseille', awayFlag: '🇫🇷', time: '21:00', status: 'Upcoming' },
    ]
  },
  {
    matchday: '2026-06-20',
    label: 'Sat, 20 Jun',
    matches: [
      { home: 'Man City', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Real Madrid', awayFlag: '🇪🇸', time: '21:00', status: 'Upcoming' },
    ]
  },
];

// All unique leagues for filtering
export const leagues = ['All', 'FIFA World Cup', 'UEFA Champions League', 'English Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'];
