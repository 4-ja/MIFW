import { useState, useEffect } from 'react';
import { BackgroundGlow } from './components/layout/BackgroundGlow';
import { Moon, Sun } from 'lucide-react';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mifw-theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default to dark mode
  });

  useEffect(() => {
    localStorage.setItem('mifw-theme', isDark ? 'dark' : 'light');
    const root = document.documentElement;
    const body = document.body;
    const metaTheme = document.querySelector('meta[name="theme-color"]');

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      body.className = 'bg-[#0a0e17] text-[#f8fafc] selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden antialiased';
      if (metaTheme) metaTheme.setAttribute('content', '#0a0e17');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      body.className = 'bg-[#fafaf9] text-[#0f172a] selection:bg-amber-200 selection:text-amber-950 overflow-x-hidden antialiased';
      if (metaTheme) metaTheme.setAttribute('content', '#fafaf9');
    }
  }, [isDark]);

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-[#0a0e17] text-[#f8fafc] selection:bg-amber-500/30 selection:text-amber-200' 
          : 'bg-[#fafaf9] text-[#0f172a] selection:bg-amber-200 selection:text-amber-950'
      }`}
    >
      {/* Background Atmosphere */}
      <BackgroundGlow isDark={isDark} />

      {/* Theme Toggle Button */}
      <button
        type="button"
        id="theme-toggle-btn"
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 border cursor-pointer ${
          isDark
            ? 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-amber-400/50 hover:text-amber-300 hover:bg-slate-800/90 shadow-lg shadow-black/20'
            : 'bg-white/80 text-slate-700 border-slate-200 hover:border-amber-400 hover:text-slate-900 shadow-sm'
        }`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wide">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-slate-600" />
            <span className="tracking-wide">Dark</span>
          </>
        )}
      </button>

      <main className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Megaphone Icon with Ambient Glow */}
        <div className="relative mb-6 group">
          {isDark && (
            <div 
              className="absolute inset-0 rounded-full bg-amber-500/25 blur-2xl scale-150 pointer-events-none group-hover:scale-175 transition-transform duration-500" 
              aria-hidden="true"
            />
          )}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-transform hover:scale-110 duration-300">
            <img 
              src="/megaphone.png" 
              alt="Announcement Megaphone" 
              className={`w-full h-full object-contain select-none transition-all duration-300 ${
                isDark 
                  ? 'drop-shadow-[0_12px_28px_rgba(245,158,11,0.35)] filter brightness-105' 
                  : 'drop-shadow-[0_10px_20px_rgba(245,158,11,0.2)]'
              }`}
            />
          </div>
        </div>

        {/* Single Horizontal Line "Coming soon!" Headline */}
        <h1 
          className={`font-display font-normal tracking-[-0.03em] mb-5 leading-none whitespace-nowrap transition-colors duration-300 ${
            isDark
              ? 'text-white'
              : 'text-[#0f172a]'
          }`}
          style={{
            fontSize: 'clamp(2.75rem, 7.5vw, 6.75rem)',
          }}
        >
          Coming soon!
        </h1>

        {/* Updated Domain & Subtext */}
        <p 
          className={`font-body text-base sm:text-lg md:text-xl font-normal max-w-lg mx-auto leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          <span 
            className={`font-semibold transition-colors duration-200 ${
              isDark ? 'text-amber-400' : 'text-slate-900'
            }`}
          >
            manilafinancesummit.com
          </span>{' '}
          is going live soon. Please stay tuned. Thank you!
        </p>

        {/* Footer */}
        <div 
          className={`mt-14 text-xs font-medium transition-colors duration-300 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          &copy; 2026 Manila Finance Summit. All rights reserved.
        </div>
      </main>
    </div>
  );
}

export default App;
