import { useState, useMemo } from 'react';
import { channels } from '@/data';
import VideoPlayer from './VideoPlayer';
import ChannelCategory from './ChannelCategory';

export default function LivePage() {
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
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📡</span>
        <h1 className="text-white font-bold text-xl">Live Channels</h1>
      </div>

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
    </div>
  );
}
