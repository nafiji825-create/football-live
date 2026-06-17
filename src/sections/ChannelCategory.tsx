import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Triangle } from 'lucide-react';
import type { Channel } from '@/types';
import ChannelCard from './ChannelCard';

interface ChannelCategoryProps {
  title: string;
  channels: Channel[];
  selectedChannel: string | null;
  onSelectChannel: (id: string) => void;
}

export default function ChannelCategory({ title, channels, selectedChannel, onSelectChannel }: ChannelCategoryProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-[#FFC107] font-semibold text-base"
      >
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Triangle className="w-4 h-4 fill-current" />
        </motion.span>
        {title}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="space-y-2 overflow-hidden"
          >
            {channels.map((ch) => (
              <ChannelCard
                key={ch.id}
                channel={ch}
                isSelected={selectedChannel === ch.id}
                onSelect={onSelectChannel}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
