import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import AppHeader from '@/sections/AppHeader';
import HomePage from '@/sections/HomePage';

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <div data-theme={theme} className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Mobile Container */}
      <div className="max-w-[430px] mx-auto relative">
        {/* Header */}
        <AppHeader />

        {/* Main Content */}
        <main className="pt-16 px-4 pb-8">
          <HomePage />
        </main>
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
