import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, RefreshCw, Tv, Radio, Trophy, CheckCircle2, Star } from 'lucide-react';
import { featuredChannel, otherChannels } from '@/data';
import { viewerTimezoneLabel, formatLocalClock, timeUntil } from '@/lib/timezone';
import { useWorldCup } from '@/hooks/useWorldCup';
import VideoPlayer from './VideoPlayer';
import type { WcMatch } from '@/lib/worldcup';
import type { Channel } from '@/types';

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------
function SectionTitle({
  icon: Icon,
  title,
  subtitle,
  accent,
}: {
  icon: typeof Trophy;
  title: string;
  subtitle?: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: accent + '22' }}
      >
        <Icon className="w-5 h-5" style={{ color: accent }} />
      </div>
      <div>
        <h2 className="font-bold text-base leading-tight" style={{ color: 'var(--text)' }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] font-semibold tracking-wider" style={{ color: accent }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Match card — clean, no per-match channel expander
// ---------------------------------------------------------------------------
function MatchCard({ match }: { match: WcMatch }) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const hasScore = match.homeScore !== null && match.awayScore !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border overflow-hidden shadow-card"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: isLive ? 'var(--live)' + '55' : 'var(--border)',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3.5">
        {/* Home */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-2xl shrink-0 leading-none">{match.homeFlag}</span>
          <span className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
            {match.home}
          </span>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center px-3 shrink-0 min-w-[72px]">
          {hasScore ? (
            <div className="flex items-center gap-1.5">
              {isLive && (
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--live)' }}
                />
              )}
              <span
                className="font-extrabold text-lg tabular-nums"
                style={{ color: isLive ? 'var(--live)' : 'var(--text)' }}
              >
                {match.homeScore}
              </span>
              <span className="text-base" style={{ color: 'var(--text-muted)' }}>
                –
              </span>
              <span
                className="font-extrabold text-lg tabular-nums"
                style={{ color: isLive ? 'var(--live)' : 'var(--text)' }}
              >
                {match.awayScore}
              </span>
            </div>
          ) : (
            <span
              className="font-mono text-sm font-semibold"
              style={{ color: 'var(--text)' }}
            >
              {formatLocalClock(match.date, match.time)}
            </span>
          )}
          <div className="mt-0.5 h-3.5 flex items-center">
            {isLive && match.minute && (
              <span className="text-[10px] font-bold" style={{ color: 'var(--live)' }}>
                {match.minute}
              </span>
            )}
            {isFinished && (
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                Full Time
              </span>
            )}
            {!isLive && !isFinished && (
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {timeUntil(match.date, match.time)}
              </span>
            )}
          </div>
        </div>

        {/* Away */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
          <span className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
            {match.away}
          </span>
          <span className="text-2xl shrink-0 leading-none">{match.awayFlag}</span>
        </div>
      </div>

      {isLive && (
        <div
          className="h-[2px]"
          style={{
            background: `linear-gradient(to right, transparent, var(--live), transparent)`,
          }}
        />
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Day group
// ---------------------------------------------------------------------------
function DayGroup({ label, matches }: { label: string; matches: WcMatch[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          ({matches.length})
        </span>
      </div>
      <div className="space-y-2">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Channel tile for the "Watch Live Sports TV" wall
// ---------------------------------------------------------------------------
function ChannelTile({
  channel,
  selected,
  onSelect,
  featured,
}: {
  channel: Channel;
  selected: boolean;
  onSelect: (id: string) => void;
  featured?: boolean;
}) {
  return (
    <button
      onClick={() => onSelect(channel.id)}
      className="w-full text-left rounded-2xl border p-3 transition-all shadow-card"
      style={{
        backgroundColor: selected ? 'var(--accent-soft)' : 'var(--surface)',
        borderColor: selected ? 'var(--accent)' : 'var(--border)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          {channel.logoUrl ? (
            <img
              src={channel.logoUrl}
              alt={channel.name}
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = 'none';
                el.parentElement!.innerHTML = `<span style="font-size:10px;font-weight:700;color:var(--text-muted)">${channel.logo.slice(0, 3)}</span>`;
              }}
            />
          ) : (
            <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
              {channel.logo.slice(0, 3)}
            </span>
          )}
        </div>

        {/* Name + live dot */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="text-sm font-semibold truncate"
              style={{ color: selected ? 'var(--accent)' : 'var(--text)' }}
            >
              {channel.name}
            </span>
            {featured && (
              <Star className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--gold)' }} fill="currentColor" />
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--live)' }}
            />
            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
              LIVE · {channel.quality}
            </span>
          </div>
        </div>

        {/* Watch button */}
        <div
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold shrink-0"
          style={{
            backgroundColor: selected ? 'var(--accent)' : 'var(--surface-2)',
            color: selected ? '#FFFFFF' : 'var(--text-muted)',
            border: '1px solid ' + (selected ? 'var(--accent)' : 'var(--border)'),
          }}
        >
          <Play className="w-3 h-3" fill="currentColor" />
          {selected ? 'Playing' : 'Watch'}
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------
export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(featuredChannel.id);
  const { matches, loading, lastUpdated } = useWorldCup();

  const live = matches.filter((m) => m.status === 'live');
  const upcoming = matches.filter((m) => m.status === 'upcoming');
  const finished = matches.filter((m) => m.status === 'finished');

  const upcomingByDay = useMemo(() => {
    const map = new Map<string, WcMatch[]>();
    upcoming.forEach((m) => {
      if (!map.has(m.date)) map.set(m.date, []);
      map.get(m.date)!.push(m);
    });
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([day, ms]) => ({
        day,
        label: day === today ? 'Today' : day === tomorrow ? 'Tomorrow' : day,
        matches: ms,
      }));
  }, [upcoming]);

  return (
    <div className="space-y-6">
      {/* Player */}
      <VideoPlayer selectedChannel={selectedChannel} />

      {/* Timezone + refresh */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
          🕐 {viewerTimezoneLabel()}
        </span>
        {lastUpdated && (
          <span
            className="flex items-center gap-1 text-[10px]"
            style={{ color: 'var(--text-muted)' }}
          >
            <RefreshCw className="w-2.5 h-2.5" />
            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <RefreshCw className="w-6 h-6 animate-spin" style={{ color: 'var(--accent)' }} />
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Loading FIFA World Cup 2026 fixtures…
          </p>
        </div>
      )}

      {/* Live Now */}
      {!loading && live.length > 0 && (
        <section>
          <SectionTitle
            icon={Radio}
            title="Live Now"
            subtitle={`${live.length} MATCH${live.length !== 1 ? 'ES' : ''} PLAYING`}
            accent="var(--live)"
          />
          <div className="space-y-2.5">
            {live.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {!loading && upcoming.length > 0 && (
        <section>
          <SectionTitle
            icon={Trophy}
            title="FIFA World Cup 2026"
            subtitle="UPCOMING FIXTURES"
            accent="var(--accent)"
          />
          <div className="space-y-4">
            {upcomingByDay.map((g) => (
              <DayGroup key={g.day} label={g.label} matches={g.matches} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Results */}
      {!loading && finished.length > 0 && (
        <section>
          <SectionTitle
            icon={CheckCircle2}
            title="Recent Results"
            accent="var(--text-muted)"
          />
          <div className="space-y-2.5">
            {finished.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state (pre-tournament) */}
      {!loading && matches.length === 0 && (
        <div
          className="text-center py-10 rounded-2xl border"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gold)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
            World Cup 2026 kicks off soon
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Fixtures and live scores will appear here once the tournament begins.
          </p>
        </div>
      )}

      {/* Watch Live Sports TV — single channel wall */}
      <section>
        <SectionTitle icon={Tv} title="Watch Live Sports TV" accent="var(--accent)" />

        {/* Featured (best) channel */}
        <div className="space-y-2.5">
          <ChannelTile
            channel={featuredChannel}
            selected={selectedChannel === featuredChannel.id}
            onSelect={setSelectedChannel}
            featured
          />

          {/* Other channels */}
          {otherChannels.map((ch) => (
            <ChannelTile
              key={ch.id}
              channel={ch}
              selected={selectedChannel === ch.id}
              onSelect={setSelectedChannel}
            />
          ))}
        </div>

        <p className="text-[10px] mt-3 leading-relaxed px-1" style={{ color: 'var(--text-muted)' }}>
          Free-to-air public sports channels. Some streams may be region-restricted and won't play in every country.
        </p>
      </section>

      {/* Footer */}
      <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px] leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--text-muted)' }}>
          Live scores from TheSportsDB · FIFA World Cup 2026
        </p>
      </div>
    </div>
  );
}
