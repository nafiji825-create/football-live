import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Monitor } from 'lucide-react';
import { matches, channels, fixtures } from '@/data';
import { viewerTimezoneLabel } from '@/lib/timezone';
import { useFavorites } from '@/hooks/useFavorites';
import VideoPlayer from './VideoPlayer';
import MatchFixtureGroup from './MatchFixtureGroup';
import type { Match } from '@/types';

// ---------------------------------------------------------------------------
// MatchCard — a single match with flags, scores, live badge, and its channels
// ---------------------------------------------------------------------------
function MatchCard({
  match,
  allChannels,
  selectedChannel,
  onSelectChannel,
  isFavoritesOnly,
}: {
  match: Match;
  allChannels: typeof channels;
  selectedChannel: string | null;
  onSelectChannel: (id: string) => void;
  isFavoritesOnly: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const { isFavoriteChannel } = useFavorites();

  // Get channels for this match
  const matchChannels = useMemo(
    () => match.channelIds.map((id) => allChannels.find((c) => c.id === id)).filter(Boolean) as typeof allChannels,
    [match.channelIds, allChannels]
  );

  // Filter favorites only if needed
  const displayChannels = isFavoritesOnly
    ? matchChannels.filter((ch) => isFavoriteChannel(ch.id))
    : matchChannels;

  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#161A22] to-[#1a1f2e] rounded-xl border border-[#2A3142] overflow-hidden"
    >
      {/* Match Header — teams, flags, score, time */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#1E2330]/30 transition-colors"
        onClick={() => matchChannels.length > 0 && setExpanded(!expanded)}
      >
        {/* Home Team */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-2xl shrink-0">{match.homeFlag}</span>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{match.homeTeam}</p>
            <p className="text-[#64748B] text-[10px]">{match.homeAbbr}</p>
          </div>
        </div>

        {/* Score / Status Center */}
        <div className="flex flex-col items-center px-3 shrink-0 min-w-[70px]">
          {(isLive || isFinished) && match.homeScore !== undefined ? (
            <div className="flex items-center gap-1.5">
              {isLive && (
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-0.5" />
              )}
              <span className={`font-bold text-base tabular-nums ${isLive ? 'text-red-400' : 'text-white'}`}>
                {match.homeScore}
              </span>
              <span className="text-[#64748B] text-xs">-</span>
              <span className={`font-bold text-base tabular-nums ${isLive ? 'text-red-400' : 'text-white'}`}>
                {match.awayScore}
              </span>
            </div>
          ) : (
            <span className="text-[#94A3B8] font-mono text-xs">VS</span>
          )}
          <div className="mt-0.5">
            {isLive && match.minute && (
              <span className="text-red-400 text-[10px] font-bold">{match.minute}' LIVE</span>
            )}
            {isFinished && (
              <span className="text-[#64748B] text-[10px] font-medium">Full Time</span>
            )}
            {!isLive && !isFinished && (
              <span className="text-[#64748B] text-[10px]">{match.league}</span>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
          <div className="min-w-0 text-right">
            <p className="text-white text-sm font-semibold truncate">{match.awayTeam}</p>
            <p className="text-[#64748B] text-[10px]">{match.awayAbbr}</p>
          </div>
          <span className="text-2xl shrink-0">{match.awayFlag}</span>
        </div>
      </div>

      {/* LIVE indicator bar */}
      {isLive && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      )}

      {/* Channel list (expandable) */}
      {matchChannels.length > 0 && (
        <>
          {/* Expand/collapse toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 border-t border-[#1E2330] text-[#64748B] hover:text-[#94A3B8] transition-colors text-xs font-medium"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{displayChannels.length} channel{displayChannels.length !== 1 ? 's' : ''} available</span>
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
                  {displayChannels.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => onSelectChannel(ch.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all ${
                        selectedChannel === ch.id
                          ? 'bg-emerald-500/10 border-emerald-500/40'
                          : 'bg-[#1E2330]/40 border-[#2A3142] hover:border-[#3A4156]'
                      }`}
                    >
                      {/* Logo */}
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

                      {/* Name */}
                      <span className={`text-xs font-medium truncate flex-1 text-left ${
                        selectedChannel === ch.id ? 'text-emerald-400' : 'text-white'
                      }`}>
                        {ch.name}
                      </span>

                      {/* Play icon if selected */}
                      {selectedChannel === ch.id && (
                        <Play className="w-3 h-3 text-emerald-400 fill-emerald-400 shrink-0" />
                      )}

                      {/* Quality */}
                      <span className="text-[9px] font-bold text-[#FFC107] tracking-wider px-2 py-0.5 rounded bg-[#FFC107]/10 border border-[#FFC107]/30">
                        {ch.quality}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Live Ticker — horizontal scrolling bar of live matches
// ---------------------------------------------------------------------------
function LiveTicker() {
  const liveMatches = matches.filter((m) => m.status === 'live');

  if (liveMatches.length === 0) return null;

  return (
    <div className="bg-[#161A22] rounded-xl border border-red-500/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#2A3142]">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-red-400 text-xs font-bold tracking-wider">LIVE NOW</span>
        <span className="text-[#64748B] text-[10px]">{liveMatches.length} match{liveMatches.length !== 1 ? 'es' : ''}</span>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 p-3">
          {liveMatches.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-2.5 px-3 py-2 bg-[#1E2330] rounded-lg border border-[#2A3142] shrink-0"
            >
              <span className="text-base">{m.homeFlag}</span>
              <span className="text-white text-xs font-semibold">{m.homeTeam}</span>
              <span className="text-red-400 font-bold text-sm tabular-nums">{m.homeScore ?? 0} - {m.awayScore ?? 0}</span>
              <span className="text-white text-xs font-semibold">{m.awayTeam}</span>
              <span className="text-base">{m.awayFlag}</span>
              {m.minute && (
                <span className="text-red-400 text-[10px] font-bold bg-red-500/10 px-1.5 py-0.5 rounded">{m.minute}'</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// HomePage — main layout
// ---------------------------------------------------------------------------
export default function HomePage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  // Group matches by league
  const matchesByLeague = useMemo(() => {
    const groups: Record<string, Match[]> = {};
    matches.forEach((m) => {
      if (!groups[m.league]) groups[m.league] = [];
      groups[m.league].push(m);
    });
    return groups;
  }, []);

  // Put FIFA World Cup first
  const leagueOrder = Object.keys(matchesByLeague).sort((a, b) => {
    if (a === 'FIFA World Cup') return -1;
    if (b === 'FIFA World Cup') return 1;
    return 0;
  });

  return (
    <div className="space-y-5 pb-6">
      {/* Video Player */}
      <VideoPlayer selectedChannel={selectedChannel} />

      {/* Timezone Indicator */}
      <div className="flex items-center justify-center">
        <span className="text-[#64748B] text-[11px] font-medium">
          🕐 {viewerTimezoneLabel()}
        </span>
      </div>

      {/* Live Ticker */}
      <LiveTicker />

      {/* ── FIFA WORLD CUP 2026 — MUST WATCH ─────────────────────── */}
      {matchesByLeague['FIFA World Cup'] && (
        <section>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h2 className="text-white font-bold text-base leading-tight">FIFA World Cup 2026</h2>
              <p className="text-emerald-400 text-[11px] font-semibold tracking-wider">MUST WATCH</p>
            </div>
          </div>
          <div className="space-y-3">
            {matchesByLeague['FIFA World Cup'].map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                allChannels={channels}
                selectedChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                isFavoritesOnly={false}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── OTHER LEAGUES ─────────────────────────────────────────── */}
      {leagueOrder.filter((l) => l !== 'FIFA World Cup').map((league) => (
        <section key={league}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">⚽</span>
            <h2 className="text-white font-semibold text-sm tracking-wide">{league}</h2>
            <span className="text-[#64748B] text-[10px]">({matchesByLeague[league].length} match{matchesByLeague[league].length !== 1 ? 'es' : ''})</span>
          </div>
          <div className="space-y-3">
            {matchesByLeague[league].map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                allChannels={channels}
                selectedChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                isFavoritesOnly={false}
              />
            ))}
          </div>
        </section>
      ))}

      {/* ── UPCOMING SCHEDULE ────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📅</span>
          <h2 className="text-white font-semibold text-sm tracking-wide">Full Schedule</h2>
        </div>
        <div className="space-y-3">
          {fixtures.map((fixture) => (
            <MatchFixtureGroup key={fixture.matchday} fixture={fixture} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center space-y-2 pt-4 border-t border-[#2A3142]">
        <p className="text-[#64748B] text-[10px] leading-relaxed max-w-xs mx-auto">
          Live Football — Free-to-air sports channels from public sources. Streams may be geo-restricted in some regions.
        </p>
      </div>
    </div>
  );
}
