import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';
import type { Channel } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';

interface ChannelCardProps {
  channel: Channel;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function ChannelCard({ channel, isSelected, onSelect }: ChannelCardProps) {
  const { isFavoriteChannel, toggleFavoriteChannel } = useFavorites();
  const favorited = isFavoriteChannel(channel.id);
  const hasStream = Boolean(channel.streamUrl);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
        isSelected
          ? 'bg-[#161A22] border-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.15)]'
          : 'bg-[#161A22] border-[#2A3142] hover:border-[#3A4156]'
      }`}
    >
      {/* Channel Logo */}
      <div className="w-10 h-10 rounded-full bg-[#1E2330] border border-[#2A3142] flex items-center justify-center shrink-0">
        <span className="text-[11px] font-bold text-[#94A3B8]">{channel.logo.slice(0, 4)}</span>
      </div>

      {/* Channel Info (clickable to play) */}
      <button
        onClick={() => onSelect(channel.id)}
        className="flex-1 min-w-0 flex items-center gap-2 text-left"
      >
        <span className={`text-sm font-semibold truncate ${isSelected ? 'text-[#00E676]' : 'text-white'}`}>
          {channel.name}
        </span>
        {channel.countryFlag && (
          <span className="text-base shrink-0">{channel.countryFlag}</span>
        )}
        {hasStream && isSelected && (
          <Play className="w-3.5 h-3.5 text-[#00E676] fill-[#00E676] shrink-0" />
        )}
      </button>

      {/* Favorite Star */}
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={() => toggleFavoriteChannel(channel.id)}
        className="shrink-0 p-1.5 rounded-full hover:bg-[#1E2330] transition-colors"
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Star
          className={`w-5 h-5 transition-colors ${favorited ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#64748B]'}`}
        />
      </motion.button>

      {/* Quality Badge */}
      <div className="shrink-0 px-2.5 py-1 rounded-lg bg-[#1E2330] border border-[#FFC107]/40">
        <span className="text-[10px] font-bold text-[#FFC107] tracking-wider">{channel.quality}</span>
      </div>
    </motion.div>
  );
}
