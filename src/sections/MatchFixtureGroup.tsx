import { motion } from 'framer-motion';
import type { Fixture } from '@/types';
import { formatLocalClock } from '@/lib/timezone';

interface MatchFixtureGroupProps {
  fixture: Fixture;
}

export default function MatchFixtureGroup({ fixture }: MatchFixtureGroupProps) {
  const isLive = (status: string) => status.toUpperCase() === 'LIVE';
  const isFinished = (status: string) => status.toUpperCase() === 'FT' || status.toUpperCase() === 'FINISHED';

  return (
    <div className="bg-[#161A22] rounded-xl border border-[#2A3142] overflow-hidden">
      {/* Matchday Label */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A3142]">
        <span className="text-[#94A3B8] text-xs font-semibold tracking-wider">📅 {fixture.label || fixture.matchday}</span>
      </div>

      {/* Matches */}
      <div className="divide-y divide-[#1E2330]">
        {fixture.matches.map((match, i) => {
          const live = isLive(match.status);
          const finished = isFinished(match.status);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-4 py-3 hover:bg-[#1E2330]/40 transition-colors"
            >
              {/* Home Team */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <span className="text-lg shrink-0">{match.homeFlag}</span>
                <span className="text-white text-sm font-medium truncate">{match.home}</span>
              </div>

              {/* Center: Score or Time */}
              <div className="flex items-center gap-2 px-4 shrink-0">
                {(live || finished || match.homeScore !== undefined) ? (
                  <div className="flex items-center gap-1.5">
                    {live && (
                      <span className="flex items-center gap-1 mr-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      </span>
                    )}
                    <span className={`font-bold text-sm tabular-nums ${live ? 'text-red-400' : 'text-white'}`}>
                      {match.homeScore ?? 0}
                    </span>
                    <span className="text-[#64748B] text-xs">-</span>
                    <span className={`font-bold text-sm tabular-nums ${live ? 'text-red-400' : 'text-white'}`}>
                      {match.awayScore ?? 0}
                    </span>
                    {live && match.minute && (
                      <span className="text-red-400 text-[10px] ml-1 font-medium">{match.minute}'</span>
                    )}
                    {finished && (
                      <span className="text-[#64748B] text-[10px] ml-1 font-medium">FT</span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-[#94A3B8] text-xs font-mono">{formatLocalClock(fixture.matchday, match.time)}</span>
                  </div>
                )}
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
                <span className="text-white text-sm font-medium truncate">{match.away}</span>
                <span className="text-lg shrink-0">{match.awayFlag}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
