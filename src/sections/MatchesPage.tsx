import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { matches } from '@/data';
import FeaturedMatch from './FeaturedMatch';
import LeagueFilter from './LeagueFilter';
import MatchCard from './MatchCard';
import AdBanner from './AdBanner';

export default function MatchesPage() {
  const [activeLeague, setActiveLeague] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredMatch = useMemo(() => matches.find((m) => m.isFeatured), []);

  const filteredMatches = useMemo(() => {
    let filtered = matches.filter((m) => !m.isFeatured);
    if (activeLeague !== 'All') {
      filtered = filtered.filter((m) => m.league === activeLeague);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.homeTeam.toLowerCase().includes(q) ||
          m.awayTeam.toLowerCase().includes(q) ||
          m.homeAbbr.toLowerCase().includes(q) ||
          m.awayAbbr.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [activeLeague, searchQuery]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-5 pb-6">
      {/* Featured Match */}
      {featuredMatch && <FeaturedMatch match={featuredMatch} />}

      {/* Ad Banner */}
      <AdBanner size="320x50" />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#161A22] border border-[#2A3142] rounded-xl text-white text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#00E676] transition-colors"
        />
      </div>

      {/* League Filter */}
      <LeagueFilter activeLeague={activeLeague} onLeagueChange={setActiveLeague} />

      {/* Today's Matches Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Today&apos;s Matches</h2>
        <span className="px-3 py-1 bg-[#161A22] border border-[#2A3142] rounded-full text-[#94A3B8] text-xs">
          {today}
        </span>
      </div>

      {/* Match List */}
      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#64748B] text-sm">No matches found</p>
          </div>
        ) : (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        )}
      </div>
    </div>
  );
}
