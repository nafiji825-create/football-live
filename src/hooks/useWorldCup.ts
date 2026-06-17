import { useState, useEffect, useCallback } from 'react';
import { fetchWorldCup, groupByDay, type WcMatch } from '@/lib/worldcup';

interface State {
  matches: WcMatch[];
  days: { day: string; label: string; matches: WcMatch[] }[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * Live FIFA World Cup hook.
 * Fetches real fixtures + scores from TheSportsDB and auto-refreshes every 60s.
 */
export function useWorldCup() {
  const [state, setState] = useState<State>({
    matches: [],
    days: [],
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const load = useCallback(async () => {
    try {
      const matches = await fetchWorldCup(9);
      setState({
        matches,
        days: groupByDay(matches),
        loading: false,
        error: null,
        lastUpdated: new Date(),
      });
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : 'Failed to load',
      }));
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, 60000); // refresh every 60s
    return () => clearInterval(id);
  }, [load]);

  return state;
}
