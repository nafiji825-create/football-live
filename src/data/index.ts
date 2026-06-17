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
// CHANNELS — REAL, LEGAL, FREE-TO-AIR live sports channels.
//
// All streams come from iptv-org (https://github.com/iptv-org/iptv), a public
// directory of freely-available, free-to-air TV channels. Each channel below
// has been verified to be online. These are the channels' own official
// free-to-air feeds — not pirated pay-TV retransmission.
// ---------------------------------------------------------------------------

interface RawChannel {
  name: string;
  logo: string;
  url: string;
}

// Inserted/verified channels from iptv-org sports category (tested live)
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
  { name: 'Pluto TV E-Sports', logo: 'https://images.pluto.tv/channels/5ff3934600d4c7000733ff49/colorLogoPNG.png', url: 'https://jmp2.uk/plu-5ff3934600d4c7000733ff49.m3u8' },
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

// Keep a few of the classic demo streams as a "Demo" category too
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
