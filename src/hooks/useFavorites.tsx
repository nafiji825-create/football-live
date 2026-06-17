import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  favoriteChannels: string[];
  toggleFavorite: (id: string) => void;
  toggleFavoriteChannel: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isFavoriteChannel: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const MATCHES_KEY = 'flive-fav-matches';
const CHANNELS_KEY = 'flive-fav-channels';

function readArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => readArray(MATCHES_KEY));
  const [favoriteChannels, setFavoriteChannels] = useState<string[]>(() => readArray(CHANNELS_KEY));

  useEffect(() => {
    try {
      localStorage.setItem(MATCHES_KEY, JSON.stringify(favorites));
    } catch { /* storage unavailable */ }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(CHANNELS_KEY, JSON.stringify(favoriteChannels));
    } catch { /* storage unavailable */ }
  }, [favoriteChannels]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const toggleFavoriteChannel = useCallback((id: string) => {
    setFavoriteChannels(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const isFavoriteChannel = useCallback((id: string) => favoriteChannels.includes(id), [favoriteChannels]);

  return (
    <FavoritesContext.Provider value={{ favorites, favoriteChannels, toggleFavorite, toggleFavoriteChannel, isFavorite, isFavoriteChannel }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
}
