import { useState, useEffect } from 'react';
import { Tv, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const tickerMatches = [
  { home: 'GHA', away: 'PAN', date: '18th Jun 5AM', homeFlag: '🇬🇭', awayFlag: '🇵🇦' },
  { home: 'POR', away: 'CON', date: '17th Jun 11PM', homeFlag: '🇵🇹', awayFlag: '🇨🇩' },
  { home: 'ENG', away: 'CRO', date: '18th Jun 2AM', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇭🇷' },
  { home: 'UZB', away: 'COL', date: '18th Jun 10AM', homeFlag: '🇺🇿', awayFlag: '🇨🇴' },
];

export default function AppHeader() {
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

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#1E2330]/90 border-b border-[#2A3142]"
    >
      <div className="max-w-[430px] mx-auto flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Tv className="w-6 h-6 text-[#FFC107]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00E676] rounded-full animate-pulse" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">FLiveTV</span>
        </div>

        {/* Ticker */}
        <div className="flex-1 mx-3 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...tickerMatches, ...tickerMatches].map((match, i) => (
              <span key={i} className="inline-flex items-center gap-1 mx-4 text-[13px] font-semibold text-[#94A3B8]">
                <span>{match.homeFlag}</span>
                <span className="text-white">{match.home}</span>
                <span className="text-[#64748B] mx-0.5">VS</span>
                <span className="text-white">{match.away}</span>
                <span>{match.awayFlag}</span>
                <span className="text-[#64748B] text-[11px]">{match.date}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Dark / Light mode toggle — NOW ACTUALLY WORKS */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[#161A22] border border-[#2A3142] text-[#94A3B8] hover:text-white transition-colors shrink-0"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </motion.header>
  );
}
