import type { Fixture } from '@/types';

interface MatchFixtureGroupProps {
  fixture: Fixture;
}

export default function MatchFixtureGroup({ fixture }: MatchFixtureGroupProps) {
  return (
    <div className="bg-[#161A22] rounded-xl border border-[#2A3142] p-4 space-y-3">
      {/* Matchday Label */}
      <div className="text-[#94A3B8] text-xs font-medium">
        Matchday: {fixture.matchday}
      </div>

      {/* Matches */}
      <div className="space-y-2">
        {fixture.matches.map((match, i) => (
          <div key={i}>
            <div className="flex items-center justify-between py-2">
              {/* Home Team */}
              <div className="flex items-center gap-2 flex-1">
                <span className="text-base">{match.homeFlag}</span>
                <span className="text-white text-sm font-medium">{match.home}</span>
              </div>

              {/* Time & Status */}
              <div className="flex flex-col items-center px-3">
                <span className="text-white text-sm font-mono">{match.time}</span>
                <span className="text-[#00E676] text-[10px] font-medium">{match.status}</span>
              </div>

              {/* Away Team */}
              <div className="flex items-center gap-2 flex-1 justify-end">
                <span className="text-white text-sm font-medium">{match.away}</span>
                <span className="text-base">{match.awayFlag}</span>
              </div>
            </div>
            {i < fixture.matches.length - 1 && (
              <div className="h-px bg-[#2A3142]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
