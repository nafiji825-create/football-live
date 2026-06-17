import { leagues } from '@/data';

interface LeagueFilterProps {
  activeLeague: string;
  onLeagueChange: (league: string) => void;
}

export default function LeagueFilter({ activeLeague, onLeagueChange }: LeagueFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {leagues.map((league) => (
        <button
          key={league}
          onClick={() => onLeagueChange(league)}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
            activeLeague === league
              ? 'bg-[#00E676] text-black border-[#00E676]'
              : 'bg-[#161A22] text-white border-[#2A3142] hover:border-[#64748B]'
          }`}
        >
          {league}
        </button>
      ))}
    </div>
  );
}
