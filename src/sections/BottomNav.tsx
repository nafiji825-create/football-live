import { Home, Radio, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Tab } from '@/types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { key: Tab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'live', label: 'Live', icon: Radio },
  { key: 'favorites', label: 'Favorites', icon: Star },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#1E2330]/90 border-t border-[#2A3142] rounded-t-[20px]">
      <div className="max-w-[430px] mx-auto flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex flex-col items-center justify-center gap-0.5 w-16 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-px left-2 right-2 h-0.5 bg-[#00E676] rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? 'text-[#00E676]' : 'text-[#64748B]'}`}
              />
              <span
                className={`text-[11px] font-medium transition-colors ${isActive ? 'text-[#00E676]' : 'text-[#64748B]'}`}
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
