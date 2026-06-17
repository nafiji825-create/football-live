import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RefreshCw, Tv, Radio, Trophy, CheckCircle2 } from 'lucide-react';
import { featuredChannel, otherChannels } from '@/data';
import { viewerTimezoneLabel, formatLocalClock, timeUntil } from '@/lib/timezone';
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
  color,
}: {
  icon: typeof Trophy;
  title: string;
  subtitle?: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + '1A' }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <h2 className="font-bold text-base leading-tight" style={{ color: 'var(--text)' }}>
          {title}
        </h2>
        {subtitle && (
          <p className="text-[11px] font-semibold tracking-wider" style={{ color }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Flag image component — real PNG with emoji fallback
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
// Match card — compact, real flag images
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
        borderColor: isLive ? 'var(--live-soft)' : 'var(--border)',
        boxShadow: isLive ? '0 0 16px var(--live-soft)' : undefined,
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Home */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Flag src={match.homeFlagImg} alt={match.home} emoji={match.homeFlag} />
          <span className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
            {match.home}
          </span>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center px-2.5 shrink-0 min-w-[68px]">
          {hasScore ? (
            <div className="flex items-center gap-1.5">
              {isLive && (
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--live)' }} />
              )}
              <span className="font-extrabold text-lg tabular-nums" style={{ color: isLive ? 'var(--live)' : 'var(--text)' }}>
                {match.homeScore}
              </span>
              <span className="text-base" style={{ color: 'var(--text-muted)' }}>–</span>
              <span className="font-extrabold text-lg tabular-nums" style={{ color: isLive ? 'var(--live)' : 'var(--text)' }}>
                {match.awayScore}
              </span>
            </div>
          ) : (
            <span className="font-mono text-sm font-semibold" style={{ color: 'var(--text)' }}>
              {formatLocalClock(match.date, match.time)}
            </span>
          )}
          <div className="mt-0.5 h-3.5 flex items-center">
            {isLive && match.minute && (
              <span className="text-[10px] font-bold" style={{ color: 'var(--live)' }}>{match.minute}</span>
            )}
            {isFinished && (
              <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>FT</span>
            )}
            {!isLive && !isFinished && (
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{timeUntil(match.date, match.time)}</span>
            )}
          </div>
        </div>

        {/* Away */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>
            {match.away}
          </span>
          <Flag src={match.awayFlagImg} alt={match.away} emoji={match.awayFlag} />
        </div>
      </div>

      {isLive && (
        <div className="h-[2px]" style={{ background: 'linear-gradient(to right, transparent, var(--live), transparent)' }} />
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Channel button — gold-decorated
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
      className="channel-btn w-full text-left rounded-2xl border p-3 relative overflow-hidden"
      style={{
        backgroundColor: selected ? 'var(--accent-soft)' : 'var(--surface)',
        borderColor: featured && !selected
          ? 'var(--gold-border)'
          : selected
            ? 'var(--accent)'
            : 'var(--border)',
      }}
    >
      {/* Gold glow behind featured */}
      {featured && !selected && (
        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 20% 50%, var(--gold-glow), transparent 70%)' }} />
      )}

      <div className="relative flex items-center gap-3">
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

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold truncate" style={{ color: selected ? 'var(--accent)' : 'var(--text)' }}>
              {channel.name}
            </span>
            {featured && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{
                backgroundColor: 'var(--gold-soft)',
                color: 'var(--gold)',
                border: '1px solid var(--gold-border)',
              }}>
                BEST
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--live)' }} />
            <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>LIVE · {channel.quality}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0" style={{
          backgroundColor: selected ? 'var(--accent)' : 'var(--surface-2)',
          color: selected ? '#FFFFFF' : 'var(--text-muted)',
          border: '1px solid ' + (selected ? 'var(--accent)' : 'var(--border)'),
        }}>
          <Play className="w-3 h-3" fill="currentColor" />
          {selected ? 'ON' : 'Watch'}
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// HomePage — player + channels UP + 1-2 fixtures
// ---------------------------------------------------------------------------
interface HomePageProps {
  matches: WcMatch[];
  loading: boolean;
  lastUpdated: Date | null;
}

export default function HomePage({ matches, loading, lastUpdated }: HomePageProps) {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(featuredChannel.id);

  const live = matches.filter((m) => m.status === 'live');
  const upcoming = matches.filter((m) => m.status === 'upcoming').slice(0, 2);
  const finished = matches.filter((m) => m.status === 'finished').slice(0, 1);

  return (
    <div className="space-y-6">
      {/* ═══ VIDEO PLAYER ═══ */}
      <VideoPlayer selectedChannel={selectedChannel} />

      {/* ═══ CHANNELS — RIGHT BELOW PLAYER ═══ */}
      <section>
        <SectionTitle icon={Tv} title="Watch Live TV" color="var(--gold)" />
        {/* Gold shimmer divider */}
        <div className="h-[2px] rounded-full gold-shimmer mb-3" />

        <div className="space-y-2.5">
          <ChannelTile
            channel={featuredChannel}
            selected={selectedChannel === featuredChannel.id}
            onSelect={setSelectedChannel}
            featured
          />
          {otherChannels.map((ch) => (
            <ChannelTile
              key={ch.id}
              channel={ch}
              selected={selectedChannel === ch.id}
              onSelect={setSelectedChannel}
            />
          ))}
        </div>

        <p className="text-[10px] mt-2 leading-relaxed px-1" style={{ color: 'var(--text-muted)' }}>
          Free-to-air sports channels. Some may be region-restricted.
        </p>
      </section>

      {/* Timezone + refresh */}
      <div className="flex items-center justify-center gap-3">
        <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
          🕐 {viewerTimezoneLabel()}
        </span>
        {lastUpdated && (
          <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-muted)' }}>
            <RefreshCw className="w-2.5 h-2.5" />
            {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <RefreshCw className="w-6 h-6 animate-spin" style={{ color: 'var(--accent)' }} />
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading fixtures…</p>
        </div>
      )}

      {/* Live Now */}
      {!loading && live.length > 0 && (
        <section>
          <SectionTitle icon={Radio} title="Live Now" subtitle={`${live.length} PLAYING`} color="var(--live)" />
          <div className="space-y-2.5">
            {live.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {/* Upcoming (max 2) */}
      {!loading && upcoming.length > 0 && (
        <section>
          <SectionTitle icon={Trophy} title="Upcoming" subtitle="NEXT MATCHES" color="var(--accent)" />
          <div className="space-y-2.5">
            {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
          <p className="text-[10px] mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
            See full schedule → tap "Fixtures" below
          </p>
        </section>
      )}

      {/* Latest result (max 1) */}
      {!loading && finished.length > 0 && (
        <section>
          <SectionTitle icon={CheckCircle2} title="Latest Result" color="var(--text-muted)" />
          <MatchCard match={finished[0]} />
        </section>
      )}

      {/* Empty state */}
      {!loading && matches.length === 0 && (
        <div className="text-center py-8 rounded-2xl border" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gold)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>World Cup 2026 kicks off soon</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Scores will appear here once the tournament begins.</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          FIFA World Cup 2026 · Scores by TheSportsDB
        </p>
      </div>
    </div>
  );
}
