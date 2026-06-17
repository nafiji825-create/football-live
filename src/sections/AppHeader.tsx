import { useEffect, useState } from 'react';
import { Trophy, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import type { WcMatch } from '@/lib/worldcup';

interface AppHeaderProps {
  matches: WcMatch[];
}

export default function AppHeader({ matches }: AppHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const ticker = matches
    .filter((m) => m.status === 'live' || m.status === 'upcoming')
    .slice(0, 8);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--surface) 88%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-[430px] mx-auto flex items-center justify-between px-4 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Trophy className="w-6 h-6" style={{ color: 'var(--gold)' }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>
          <span className="font-extrabold text-base tracking-tight" style={{ color: 'var(--text)' }}>
            World<span style={{ color: 'var(--accent)' }}>Cup</span> TV
          </span>
        </div>

        {/* Ticker — uses real flag images */}
        <div className="flex-1 mx-3 overflow-hidden">
          {ticker.length > 0 ? (
            <div className="flex animate-marquee whitespace-nowrap">
              {[...ticker, ...ticker].map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 mx-4 text-[13px] font-semibold"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <img src={m.homeFlagImg} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
                  <span style={{ color: 'var(--text)' }}>{m.home}</span>
                  {m.status === 'live' ? (
                    <span style={{ color: 'var(--live)' }} className="font-bold">
                      {m.homeScore}–{m.awayScore}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>vs</span>
                  )}
                  <span style={{ color: 'var(--text)' }}>{m.away}</span>
                  <img src={m.awayFlagImg} alt="" className="w-5 h-3.5 object-cover rounded-sm" />
                  {m.status === 'live' && (
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: 'var(--live-soft)', color: 'var(--live)' }}
                    >
                      LIVE
                    </span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center text-[12px] font-medium" style={{ color: 'var(--text-muted)' }}>
              FIFA World Cup 2026
            </div>
          )}
        </div>

        {/* Dark / Light toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border transition-colors shrink-0"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </motion.header>
  );
}
