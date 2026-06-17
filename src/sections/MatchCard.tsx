import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Match } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(match.id);

  return (
    <motion.div
      whileHover={{ borderColor: '#00E676' }}
      className="flex items-center gap-3 p-4 bg-[#161A22] rounded-xl border border-[#2A3142] transition-shadow hover:shadow-[0_4px_20px_rgba(0,230,118,0.08)]"
    >
      {/* Home Team */}
      <div className="flex-1 text-left">
        <span className="text-[#00E676] font-semibold text-sm">{match.homeAbbr}</span>
        <p className="text-white text-xs mt-0.5">{match.homeTeam}</p>
      </div>

      {/* Center - Score or Time */}
      <div className="flex flex-col items-center gap-1">
        {match.status === 'live' && (
          <>
            <span className="text-white font-bold text-lg font-mono">
              {match.homeScore} - {match.awayScore}
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#EF4444]/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#EF4444] rounded-full animate-pulse" />
              <span className="text-[#EF4444] text-[10px] font-bold">{match.minute}&apos;</span>
            </span>
          </>
        )}
        {match.status === 'upcoming' && (
          <>
            <span className="text-white font-bold text-base font-mono">{match.time}</span>
            <span className="text-[#94A3B8] text-[10px]">{match.league}</span>
          </>
        )}
        {match.status === 'finished' && (
          <>
            <span className="text-white font-bold text-lg font-mono">
              {match.homeScore} - {match.awayScore}
            </span>
            <span className="px-2 py-0.5 bg-[#00E676]/20 rounded-full text-[#00E676] text-[10px] font-bold">FT</span>
          </>
        )}
      </div>

      {/* Away Team */}
      <div className="flex-1 text-right">
        <span className="text-[#00E676] font-semibold text-sm">{match.awayAbbr}</span>
        <p className="text-white text-xs mt-0.5">{match.awayTeam}</p>
      </div>

      {/* Favorite Button */}
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={() => toggleFavorite(match.id)}
        className="shrink-0 p-1"
      >
        <Star
          className={`w-5 h-5 transition-colors ${favorited ? 'text-[#FFC107] fill-[#FFC107]' : 'text-[#64748B]'}`}
        />
      </motion.button>
    </motion.div>
  );
}
