import { useMemo } from 'react';
import { Star } from 'lucide-react';
import { matches, channels } from '@/data';
import { useFavorites } from '@/hooks/useFavorites';
import MatchCard from './MatchCard';
import ChannelCard from './ChannelCard';

export default function FavoritesPage() {
  const { favorites, favoriteChannels } = useFavorites();

  const favoriteMatches = useMemo(
    () => matches.filter((m) => favorites.includes(m.id)),
    [favorites]
  );

  const favChannels = useMemo(
    () => channels.filter((c) => favoriteChannels.includes(c.id)),
    [favoriteChannels]
  );

  const hasFavorites = favoriteMatches.length > 0 || favChannels.length > 0;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Star className="w-6 h-6 text-[#FFC107] fill-[#FFC107]" />
        <h1 className="text-white font-bold text-xl">Your Favorites</h1>
      </div>

      {!hasFavorites ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Star className="w-16 h-16 text-[#2A3142] stroke-1" />
          <p className="text-[#64748B] text-sm text-center">
            No favorites yet.
            <br />
            Star a match or channel to add it here.
          </p>
        </div>
      ) : (
        <>
          {/* Favorite Matches */}
          {favoriteMatches.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-[#94A3B8] text-sm font-semibold uppercase tracking-wider">
                Matches
              </h2>
              {favoriteMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          {/* Favorite Channels */}
          {favChannels.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-[#94A3B8] text-sm font-semibold uppercase tracking-wider">
                Channels
              </h2>
              {favChannels.map((ch) => (
                <ChannelCard
                  key={ch.id}
                  channel={ch}
                  isSelected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
