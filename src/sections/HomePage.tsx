import { useState, useMemo } from 'react';
import { channels, fixtures } from '@/data';
import VideoPlayer from './VideoPlayer';
import ChannelCategory from './ChannelCategory';
import MatchFixtureGroup from './MatchFixtureGroup';
import AdBanner from './AdBanner';

export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const groupedChannels = useMemo(() => {
    const groups: Record<string, typeof channels> = {};
    channels.forEach((ch) => {
      if (!groups[ch.category]) groups[ch.category] = [];
      groups[ch.category].push(ch);
    });
    return groups;
  }, []);

  return (
    <div className="space-y-6 pb-6">
      {/* Video Player */}
      <VideoPlayer selectedChannel={selectedChannel} />

      {/* Channel List */}
      <div className="space-y-4">
        {Object.entries(groupedChannels).map(([category, chs]) => (
          <ChannelCategory
            key={category}
            title={category}
            channels={chs}
            selectedChannel={selectedChannel}
            onSelectChannel={setSelectedChannel}
          />
        ))}
      </div>

      {/* Ad Banner */}
      <AdBanner size="300x100" />

      {/* Match Fixtures */}
      <div className="space-y-3">
        <h2 className="text-white font-semibold text-base">📅 Upcoming Fixtures</h2>
        {fixtures.map((fixture) => (
          <MatchFixtureGroup key={fixture.matchday} fixture={fixture} />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center space-y-2 pt-4 border-t border-[#2A3142]">
        <p className="text-[#94A3B8] text-xs">
          Made with <span className="text-red-500">❤</span> by Noob AI
        </p>
        <p className="text-[#64748B] text-[10px] leading-relaxed max-w-xs mx-auto">
          All streams are public, royalty-free demo content intended for playback testing. Swap in your own .m3u8 URLs to broadcast your content.
        </p>
      </div>
    </div>
  );
}
