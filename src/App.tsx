import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Tab } from '@/types';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import { useWorldCup } from '@/hooks/useWorldCup';
import AppHeader from '@/sections/AppHeader';
import BottomNav from '@/sections/BottomNav';
import HomePage from '@/sections/HomePage';
import SchedulePage from '@/sections/SchedulePage';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function ThemedApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { theme } = useTheme();
  const { matches, days, loading, lastUpdated } = useWorldCup();

  return (
    <div data-theme={theme} className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[430px] mx-auto relative">
        <AppHeader matches={matches} />

        <main className="pt-16 px-4 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {activeTab === 'home' ? (
                <HomePage
                  matches={matches}
                  loading={loading}
                  lastUpdated={lastUpdated}
                />
              ) : (
                <SchedulePage days={days} loading={loading} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
