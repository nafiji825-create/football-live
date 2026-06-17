import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Tab } from '@/types';
import { FavoritesProvider } from '@/hooks/useFavorites';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import AppHeader from '@/sections/AppHeader';
import BottomNav from '@/sections/BottomNav';
import HomePage from '@/sections/HomePage';
import MatchesPage from '@/sections/MatchesPage';
import FavoritesPage from '@/sections/FavoritesPage';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

function ThemedApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const { theme } = useTheme();

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'live':
        return <MatchesPage />;
      case 'favorites':
        return <FavoritesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      data-theme={theme}
      className={theme === 'light' ? 'flive-light min-h-screen' : 'min-h-screen bg-[#0B0E13]'}
    >
      {/* Mobile Container */}
      <div className="max-w-[430px] mx-auto relative">
        {/* Header */}
        <AppHeader />

        {/* Main Content */}
        <main className="pt-14 px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Spacer for Nav */}
        <div className="h-20" />

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <ThemedApp />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
