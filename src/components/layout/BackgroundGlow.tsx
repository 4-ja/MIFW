interface BackgroundGlowProps {
  isDark?: boolean;
}

export function BackgroundGlow({ isDark = true }: BackgroundGlowProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Texture */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          isDark ? 'bg-dark-dots opacity-70' : 'bg-warm-dots opacity-80'
        }`} 
      />

      {/* Primary warm amber & coral spotlight behind the megaphone */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] blur-[100px] rounded-full transition-all duration-700 ${
          isDark ? 'ambient-glow-dark' : 'ambient-glow-megaphone'
        }`}
      />

      {/* Secondary soft top ambient corner warm glow */}
      <div 
        className={`absolute -top-32 -right-32 w-[520px] h-[520px] blur-[110px] rounded-full transition-colors duration-500 ${
          isDark ? 'bg-amber-500/10' : 'bg-amber-100/50'
        }`}
      />
      <div 
        className={`absolute -bottom-32 -left-32 w-[520px] h-[520px] blur-[110px] rounded-full transition-colors duration-500 ${
          isDark ? 'bg-rose-500/10' : 'bg-rose-100/40'
        }`}
      />
    </div>
  );
}
