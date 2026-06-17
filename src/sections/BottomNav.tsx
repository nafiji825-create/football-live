import { Home, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Tab } from '@/types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Live', icon: Home },
  { key: 'fixtures', label: 'Fixtures', icon: CalendarDays },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl rounded-t-[20px] border-t"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--surface) 92%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-[430px] mx-auto flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex flex-col items-center justify-center gap-0.5 w-20 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-px left-3 right-3 h-0.5 rounded-full gold-shimmer"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[var(--gold)]' : 'text-[var(--text-muted)]'
                }`}
              />
              <span
                className={`text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-[var(--gold)]' : 'text-[var(--text-muted)]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
