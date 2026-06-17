import type { Channel } from '@/types';

// ---------------------------------------------------------------------------
// CHANNELS — curated free-to-air sports TV streams (iptv-org).
// beIN SPORTS XTRA is pinned as the recommended ("best") channel; the rest
// are general sports channels shown underneath it in the channel wall.
// Duplicate, demo, and pure-niche channels have been removed.
// ---------------------------------------------------------------------------

interface RawChannel {
  name: string;
  logo: string;
  url: string;
  /** Pinned as the recommended channel at the top of the wall. */
  best?: boolean;
}

const curated: RawChannel[] = [
  {
    name: 'beIN SPORTS XTRA',
    logo: 'https://i.ibb.co/HT49GPmB/XTRA-2.png',
    url: 'https://bein-xtra-bein.amagi.tv/playlist.m3u8',
    best: true,
  },
  {
    name: 'beIN Sports XTRA Español',
    logo: 'https://i.imgur.com/V562tpO.png',
    url: 'https://dc1644a9jazgj.cloudfront.net/beIN_Sports_Xtra_Espanol.m3u8',
  },
  {
    name: 'ESPN 8 The Ocho',
    logo: 'https://images.fubo.tv/channel-config-ui/station-logos/on-demand-images/ESPNTheOcho_light.png',
    url: 'https://d3b6q2ou5kp8ke.cloudfront.net/ESPNTheOcho.m3u8',
  },
  {
    name: 'FOX Sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/FOX_Sports_logo.svg/512px-FOX_Sports_logo.svg.png',
    url: 'https://jmp2.uk/plu-5a74b8e1e22a61737979c6bf.m3u8',
  },
  {
    name: 'fubo Sports Network',
    logo: 'https://i.imgur.com/qFNRJLb.png',
    url: 'https://dnf08l6u6uxnz.cloudfront.net/master.m3u8',
  },
  {
    name: 'Pluto TV Sports',
    logo: 'https://images.pluto.tv/channels/608030eff4b6f70007e1684c/colorLogoPNG.png',
    url: 'https://jmp2.uk/plu-608030eff4b6f70007e1684c.m3u8',
  },
  {
    name: 'Pluto TV Deportes',
    logo: 'https://images.pluto.tv/channels/5dcde07af1c85b0009b18651/colorLogoPNG.png',
    url: 'https://jmp2.uk/plu-5dcde07af1c85b0009b18651.m3u8',
  },
  {
    name: 'Pluto TV Esportes',
    logo: 'https://images.pluto.tv/channels/5f32d2db0af67400077f29c4/colorLogoPNG.png',
    url: 'https://jmp2.uk/plu-5f32d2db0af67400077f29c4.m3u8',
  },
  {
    name: 'Red Bull TV',
    logo: 'https://i.imgur.com/Ru5gWCh.png',
    url: 'https://3ea22335.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlbg/redbulltv/master.m3u8',
  },
];

export const channels: Channel[] = curated.map((c, idx) => ({
  id: String(idx + 1),
  name: c.name,
  category: c.best ? 'Featured' : 'More Sports Channels',
  logo: c.name.slice(0, 3).toUpperCase(),
  logoUrl: c.logo,
  quality: 'HD',
  streamUrl: c.url,
  poster: c.logo,
}));

/** The recommended channel shown at the top of the wall. */
export const featuredChannel = channels.find((c) => c.category === 'Featured') ?? channels[0];

/** Remaining channels shown underneath the featured one. */
export const otherChannels = channels.filter((c) => c.id !== featuredChannel.id);
