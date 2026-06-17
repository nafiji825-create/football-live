import type { Match } from '@/types';
import CountdownTimer from './CountdownTimer';
import { formatLocalTime, formatLocalClock, timeUntil } from '@/lib/timezone';

interface FeaturedMatchProps {
  match: Match;
}

export default function FeaturedMatch({ match }: FeaturedMatchProps) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <div className="relative bg-gradient-to-br from-[#161A22] to-[#1a1f2e] rounded-2xl border border-[#2A3142] overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-5">
        {/* League Badge + Status */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {isLive && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-red-500/20 border border-red-500/40 rounded-full">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 text-[10px] font-bold tracking-wider">LIVE</span>
              </span>
            )}
            <span className="text-emerald-400 text-xs font-bold tracking-wider">
              ⚽ {match.league}
            </span>
          </div>
          {!isLive && !isFinished && (
            <span className="text-[#64748B] text-[11px] font-medium">
              {timeUntil(match.date, match.time)}
            </span>
          )}
        </div>

        {/* Teams Row */}
        <div className="flex items-center justify-between mb-5">
          {/* Home Team */}
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{match.homeFlag}</span>
            <span className="text-white text-sm font-semibold">{match.homeTeam}</span>
          </div>

          {/* Score / Time / VS */}
          <div className="text-center px-5 min-w-[80px]">
            {isLive || isFinished ? (
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-2xl tabular-nums">{match.homeScore ?? 0}</span>
                <span className="text-[#64748B] text-sm">-</span>
                <span className="text-white font-bold text-2xl tabular-nums">{match.awayScore ?? 0}</span>
              </div>
            ) : (
              <span className="text-[#64748B] font-bold text-lg">VS</span>
            )}
            <div className="mt-1">
              {isLive && match.minute && (
                <span className="text-red-400 text-[11px] font-medium">{match.minute}'</span>
              )}
              {isFinished && (
                <span className="text-[#64748B] text-[11px] font-medium">FT</span>
              )}
              {!isLive && !isFinished && (
                <span className="text-[#94A3B8] text-[11px] font-mono">{formatLocalClock(match.date, match.time)}</span>
              )}
            </div>
          </div>

          {/* Away Team */}
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{match.awayFlag}</span>
            <span className="text-white text-sm font-semibold">{match.awayTeam}</span>
          </div>
        </div>

        {/* Countdown or Match Info */}
        <div className="flex justify-center">
          {!isLive && !isFinished && (
            <CountdownTimer targetDate={match.date} targetTime={match.time} />
          )}
          {isLive && (
            <p className="text-[#94A3B8] text-xs">{formatLocalTime(match.date, match.time)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
