import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Monitor, Link2, X, RefreshCw, Tv } from 'lucide-react';
import { channels } from '@/data';
import { viewerTimezoneLabel, formatLocalClock, timeUntil } from '@/lib/timezone';
import { useWorldCup } from '@/hooks/useWorldCup';
import VideoPlayer from './VideoPlayer';
import type { WcMatch } from '@/lib/worldcup';

// ---------------------------------------------------------------------------
// Custom Stream Input — paste any .m3u8 / video URL to play in the player
// ---------------------------------------------------------------------------
function CustomStreamInput({
  value,
  onSubmit,
  onClear,
}: {
  value: string | null;
  onSubmit: (url: string) => void;
  onClear: () => void;
}) {
  const [draft, setDraft] = useState('');
  const active = Boolean(value);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = draft.trim();
    if (!v) return;
    if (!/^https?:\/\//i.test(v)) {
      alert('Please paste a full URL starting with http:// or https://');
      return;
    }
    onSubmit(v);
    setDraft('');
  };

  return (
    <div className="bg-[#161A22] rounded-xl border border-[#2A3142] p-3">
      <div className="flex items-center gap-2 mb-2">
        <Tv className="w-4 h-4 text-emerald-400" />
        <span className="text-white text-xs font-semibold">Play your own stream</span>
        <span className="text-[#64748B] text-[10px]">— paste any .m3u8 or video URL</span>
      </div>

      {active ? (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/40 rounded-lg">
            <Link2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-emerald-300 text-xs truncate flex-1">{value}</span>
          </div>
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#1E2330] border border-[#2A3142] text-[#94A3B8] hover:text-white text-xs font-medium"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="flex items-center gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="https://example.com/stream.m3u8"
            className="flex-1 px-3 py-2 bg-[#0B0E13] border border-[#2A3142] rounded-lg text-white text-xs placeholder:text-[#64748B] focus:outline-none focus:border-emerald-500/50"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold"
          >
            <Play className="w-3.5 h-3.5 fill-emerald-400" />
            Play
          </button>
        </form>
      )}
      <p className="text-[#64748B] text-[10px] mt-2 leading-relaxed">
        Tip: If the built-in channels don't work in your region, find a working .m3u8 link from your provider and paste it here. It plays directly in the player above.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Live Ticker
// ---------------------------------------------------------------------------
function LiveTicker({ live }: { live: WcMatch[] }) {
  if (live.length === 0) return null;
  return (
    <div className="bg-[#161A22] rounded-xl border border-red-500/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2A3142]">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-red-400 text-xs font-bold tracking-wider">LIVE NOW</span>
        <span className="text-[#64748B] text-[10px]">{live.length} match{live.length !== 1 ? 'es' : ''}</span>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 p-3">
          {live.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2.5 px-3 py-2 bg-[#1E2330] rounded-lg border border-[#2A3142] shrink-0"
            >
              <span className="text-base">{m.homeFlag}</span>
              <span className="text-white text-xs font-semibold">{m.home}</span>
              <span className="text-red-400 font-bold text-sm tabular-nums">
                {m.homeScore ?? 0} - {m.awayScore ?? 0}
              </span>
              <span className="text-white text-xs font-semibold">{m.away}</span>
              <span className="text-base">{m.awayFlag}</span>
              {m.minute && (
                <span className="text-red-400 text-[10px] font-bold bg-red-500/10 px-1.5 py-0.5 rounded">{m.minute}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MatchCard
// ---------------------------------------------------------------------------
function MatchCard({
  match,
  selectedChannel,
  onSelectChannel,
}: {
  match: WcMatch;
  selectedChannel: string | null;
  onSelectChannel: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  // All real channels available for each match
  const matchChannels = useMemo(() => channels.filter((c) => c.streamUrl), []);

  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const hasScore = match.homeScore !== null && match.awayScore !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#161A22] to-[#1a1f2e] rounded-xl border border-[#2A3142] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-2xl shrink-0">{match.homeFlag}</span>
          <span className="text-white text-sm font-semibold truncate">{match.home}</span>
        </div>

        <div className="flex flex-col items-center px-3 shrink-0 min-w-[70px]">
          {hasScore ? (
            <div className="flex items-center gap-1.5">
              {isLive && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-0.5" />}
              <span className={`font-bold text-base tabular-nums ${isLive ? 'text-red-400' : 'text-white'}`}>
                {match.homeScore}
              </span>
              <span className="text-[#64748B] text-xs">-</span>
              <span className={`font-bold text-base tabular-nums ${isLive ? 'text-red-400' : 'text-white'}`}>
                {match.awayScore}
              </span>
            </div>
          ) : (
            <span className="text-[#94A3B8] font-mono text-xs">{formatLocalClock(match.date, match.time)}</span>
          )}
          <div className="mt-0.5">
            {isLive && match.minute && (
              <span className="text-red-400 text-[10px] font-bold">{match.minute} LIVE</span>
            )}
            {isFinished && <span className="text-[#64748B] text-[10px] font-medium">Full Time</span>}
            {!isLive && !isFinished && (
              <span className="text-[#64748B] text-[10px]">{timeUntil(match.date, match.time)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
          <span className="text-white text-sm font-semibold truncate">{match.away}</span>
          <span className="text-2xl shrink-0">{match.awayFlag}</span>
        </div>
      </div>

      {isLive && <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />}

      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 border-t border-[#1E2330] text-[#64748B] hover:text-[#94A3B8] transition-colors text-xs font-medium"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>{expanded ? 'Hide' : 'Watch'} — {matchChannels.length} channels</span>
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#1E2330]"
          >
            <div className="p-2 space-y-1.5">
              {matchChannels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => onSelectChannel(ch.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                    selectedChannel === ch.id
                      ? 'bg-emerald-500/10 border-emerald-500/40'
                      : 'bg-[#1E2330]/40 border-[#2A3142] hover:border-[#3A4156]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0B0E13] border border-[#2A3142] flex items-center justify-center shrink-0 overflow-hidden">
                    {ch.logoUrl ? (
                      <img
                        src={ch.logoUrl}
                        alt={ch.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          (e.currentTarget as HTMLImageElement).parentElement!.innerHTML =
                            `<span class="text-[9px] font-bold text-[#94A3B8]">${ch.logo.slice(0, 3)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-[9px] font-bold text-[#94A3B8]">{ch.logo.slice(0, 3)}</span>
                    )}
                  </div>
                  <span className={`text-xs font-medium truncate flex-1 text-left ${
                    selectedChannel === ch.id ? 'text-emerald-400' : 'text-white'
                  }`}>
                    {ch.name}
                  </span>
                  {selectedChannel === ch.id && (
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
                  )}
                  <span className="text-[9px] font-bold text-[#FFC107] tracking-wider px-2 py-0.5 rounded bg-[#FFC107]/10 border border-[#FFC107]/30">
                    {ch.quality}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Day Group
// ---------------------------------------------------------------------------
function DayGroup({
  label,
  matches,
  selectedChannel,
  onSelectChannel,
}: {
  label: string;
  matches: WcMatch[];
  selectedChannel: string | null;
  onSelectChannel: (id: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="text-[#94A3B8] text-xs font-semibold tracking-wider">📅 {label}</span>
        <span className="text-[#64748B] text-[10px]">({matches.length})</span>
      </div>
      <div className="space-y-2">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} selectedChannel={selectedChannel} onSelectChannel={onSelectChannel} />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------
export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [customStream, setCustomStream] = useState<string | null>(null);
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

  const handleSelectChannel = (id: string) => {
    setSelectedChannel(id);
    setCustomStream(null);
  };
  const handleSubmitCustom = (url: string) => {
    setSelectedChannel(null);
    setCustomStream(url);
  };

  return (
    <div className="space-y-5 pb-6">
      <VideoPlayer selectedChannel={selectedChannel} customStream={customStream} />

      <CustomStreamInput
        value={customStream}
        onSubmit={handleSubmitCustom}
        onClear={() => setCustomStream(null)}
      />

      <div className="flex items-center justify-center gap-3">
        <span className="text-[#64748B] text-[11px] font-medium">
          🕐 {viewerTimezoneLabel()}
        </span>
        {lastUpdated && (
          <span className="flex items-center gap-1 text-[#64748B] text-[10px]">
            <RefreshCw className="w-2.5 h-2.5" />
            Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-12">
          <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
          <p className="text-[#64748B] text-xs">Loading FIFA World Cup 2026 fixtures…</p>
        </div>
      )}

      {!loading && <LiveTicker live={live} />}

      {!loading && live.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🔴</span>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">Live Now</h2>
              <p className="text-red-400 text-[11px] font-semibold tracking-wider">{live.length} MATCH{live.length !== 1 ? 'ES' : ''} PLAYING</p>
            </div>
          </div>
          <div className="space-y-3">
            {live.map((m) => (
              <MatchCard key={m.id} match={m} selectedChannel={selectedChannel} onSelectChannel={handleSelectChannel} />
            ))}
          </div>
        </section>
      )}

      {!loading && upcoming.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">FIFA World Cup 2026</h2>
              <p className="text-emerald-400 text-[11px] font-semibold tracking-wider">UPCOMING FIXTURES</p>
            </div>
          </div>
          <div className="space-y-4">
            {upcomingByDay.map((g) => (
              <DayGroup
                key={g.day}
                label={g.label}
                matches={g.matches}
                selectedChannel={selectedChannel}
                onSelectChannel={handleSelectChannel}
              />
            ))}
          </div>
        </section>
      )}

      {!loading && finished.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">✅</span>
            <h2 className="text-white font-semibold text-sm tracking-wide">Recent Results</h2>
          </div>
          <div className="space-y-2">
            {finished.map((m) => (
              <MatchCard key={m.id} match={m} selectedChannel={selectedChannel} onSelectChannel={handleSelectChannel} />
            ))}
          </div>
        </section>
      )}

      {!loading && matches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#64748B] text-sm">No FIFA World Cup fixtures found in the next 10 days.</p>
        </div>
      )}

      <div className="text-center space-y-2 pt-4 border-t border-[#2A3142]">
        <p className="text-[#64748B] text-[10px] leading-relaxed max-w-xs mx-auto">
          Live scores from TheSportsDB. Channels are free-to-air public streams — paste your own stream URL above if they're blocked in your region.
        </p>
      </div>
    </div>
  );
}
