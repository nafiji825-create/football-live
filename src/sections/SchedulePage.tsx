import { motion } from 'framer-motion';
import { CalendarDays, Radio, Trophy, CheckCircle2 } from 'lucide-react';
import { formatLocalClock, timeUntil } from '@/lib/timezone';
import type { WcMatch } from '@/lib/worldcup';

// ---------------------------------------------------------------------------
// Flag image with emoji fallback
// ---------------------------------------------------------------------------
function Flag({ src, alt, emoji, size = 'md' }: { src: string; alt: string; emoji: string; size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 'w-6 h-4' : size === 'lg' ? 'w-10 h-7' : 'w-8 h-[22px]';
  return (
    <img
      src={src}
      alt={alt}
      className={`${dim} object-cover rounded-sm`}
      style={{ border: '1px solid var(--border)' }}
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement;
        el.style.display = 'none';
        el.parentElement!.textContent = emoji;
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Match row — compact horizontal for the schedule list
// ---------------------------------------------------------------------------
function FixtureRow({ match }: { match: WcMatch }) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const hasScore = match.homeScore !== null && match.awayScore !== null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border"
      style={{
        backgroundColor: isLive ? 'var(--live-soft)' : 'var(--surface)',
        borderColor: isLive ? 'var(--live-soft)' : 'var(--border)',
      }}
    >
      {/* Live badge */}
      <div className="w-10 shrink-0 text-center">
        {isLive ? (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--live)', color: '#fff' }}>
            {match.minute || 'LIVE'}
          </span>
        ) : isFinished ? (
          <span className="text-[9px] font-bold" style={{ color: 'var(--text-muted)' }}>FT</span>
        ) : (
          <span className="text-[10px] font-mono font-semibold" style={{ color: 'var(--text)' }}>
            {formatLocalClock(match.date, match.time)}
          </span>
        )}
      </div>

      {/* Home flag + name */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <Flag src={match.homeFlagImg} alt={match.home} emoji={match.homeFlag} size="sm" />
        <span className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>
          {match.home}
        </span>
      </div>

      {/* Score or VS */}
      <div className="shrink-0 min-w-[44px] text-center">
        {hasScore ? (
          <span className="text-sm font-extrabold tabular-nums" style={{ color: isLive ? 'var(--live)' : 'var(--text)' }}>
            {match.homeScore}–{match.awayScore}
          </span>
        ) : (
          <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
            {timeUntil(match.date, match.time)}
          </span>
        )}
      </div>

      {/* Away name + flag */}
      <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
        <span className="text-[13px] font-semibold truncate" style={{ color: 'var(--text)' }}>
          {match.away}
        </span>
        <Flag src={match.awayFlagImg} alt={match.away} emoji={match.awayFlag} size="sm" />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Day group with gold header
// ---------------------------------------------------------------------------
function DayGroup({ label, matches, count }: { label: string; matches: WcMatch[]; count: number }) {
  return (
    <div className="mb-5">
      {/* Gold header bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 rounded-t-xl"
        style={{
          backgroundColor: 'var(--gold-soft)',
          borderTop: '2px solid var(--gold)',
          borderBottom: '1px solid var(--gold-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4" style={{ color: 'var(--gold)' }} />
          <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{label}</span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
          backgroundColor: 'var(--gold)',
          color: '#fff',
        }}>
          {count}
        </span>
      </div>

      {/* Match list */}
      <div className="space-y-1.5 mt-1.5 px-0.5">
        {matches.map((m) => (
          <FixtureRow key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SchedulePage — full fixture list grouped by day
// ---------------------------------------------------------------------------
interface SchedulePageProps {
  days: { day: string; label: string; matches: WcMatch[] }[];
  loading: boolean;
}

export default function SchedulePage({ days, loading }: SchedulePageProps) {
  // Split days into live+today, upcoming, finished
  const liveDays = days.filter((d) => d.matches.some((m) => m.status === 'live'));
  const todayLabel = days.find((d) => d.label === 'Today');
  const upcomingDays = days.filter(
    (d) => d.label !== 'Today' && d.matches.some((m) => m.status === 'upcoming')
  );
  const finishedDays = days.filter(
    (d) => d.label !== 'Today' && d.matches.every((m) => m.status === 'finished')
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--gold-soft)', borderTop: '2px solid var(--gold)' }}>
          <CalendarDays className="w-5 h-5" style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <h1 className="font-bold text-lg" style={{ color: 'var(--text)' }}>FIFA World Cup 2026</h1>
          <p className="text-[11px] font-semibold tracking-wider" style={{ color: 'var(--gold)' }}>FULL FIXTURE LIST</p>
        </div>
      </div>

      {/* Gold divider */}
      <div className="h-[2px] rounded-full gold-shimmer" />

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading schedule…</p>
        </div>
      )}

      {/* Live matches today */}
      {!loading && liveDays.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4" style={{ color: 'var(--live)' }} />
            <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--live)' }}>LIVE TODAY</span>
          </div>
          {liveDays.map((d) => (
            <DayGroup key={d.day} label={d.label} matches={d.matches.filter((m) => m.status === 'live')} count={d.matches.filter((m) => m.status === 'live').length} />
          ))}
        </section>
      )}

      {/* Today */}
      {!loading && todayLabel && todayLabel.matches.length > 0 && (
        <DayGroup
          key={todayLabel.day}
          label="📅 Today"
          matches={todayLabel.matches.filter((m) => m.status !== 'live')}
          count={todayLabel.matches.filter((m) => m.status !== 'live').length}
        />
      )}

      {/* Upcoming days */}
      {!loading && upcomingDays.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--accent)' }}>UPCOMING</span>
          </div>
          {upcomingDays.map((d) => (
            <DayGroup key={d.day} label={d.label} matches={d.matches.filter((m) => m.status === 'upcoming')} count={d.matches.filter((m) => m.status === 'upcoming').length} />
          ))}
        </section>
      )}

      {/* Finished */}
      {!loading && finishedDays.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>RESULTS</span>
          </div>
          {finishedDays.map((d) => (
            <DayGroup key={d.day} label={d.label} matches={d.matches} count={d.matches.length} />
          ))}
        </section>
      )}

      {/* Empty */}
      {!loading && days.length === 0 && (
        <div className="text-center py-12 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <CalendarDays className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gold)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>No fixtures found</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Schedule will appear as matches are scheduled.
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          Auto-refreshes every 60 seconds · Data by TheSportsDB
        </p>
      </div>
    </div>
  );
}
