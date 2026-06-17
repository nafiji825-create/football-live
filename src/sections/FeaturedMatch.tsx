import type { Match } from '@/types';
import CountdownTimer from './CountdownTimer';

interface FeaturedMatchProps {
  match: Match;
}

export default function FeaturedMatch({ match }: FeaturedMatchProps) {
  return (
    <div className="relative bg-[#161A22] rounded-2xl border border-[#2A3142] p-5 overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#00E676]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* League Badge */}
      <div className="text-[#00E676] text-xs font-bold tracking-wider mb-4">
        FEATURED · {match.league}
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-center flex-1">
          <span className="text-[#00E676] font-bold text-2xl">{match.homeAbbr}</span>
          <p className="text-white text-sm mt-1">{match.homeTeam}</p>
        </div>
        <div className="text-center px-4">
          <span className="text-white font-bold text-2xl">VS</span>
          <p className="text-[#94A3B8] text-xs mt-1">{match.time}</p>
        </div>
        <div className="text-center flex-1">
          <span className="text-[#00E676] font-bold text-2xl">{match.awayAbbr}</span>
          <p className="text-white text-sm mt-1">{match.awayTeam}</p>
        </div>
      </div>

      {/* Countdown */}
      <div className="flex justify-center">
        <CountdownTimer targetDate={match.date} targetTime={match.time} />
      </div>
    </div>
  );
}
