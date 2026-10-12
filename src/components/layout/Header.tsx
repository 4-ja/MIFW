import { Shield, Terminal } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between border-b border-[rgba(0,229,255,0.12)] relative z-10">
      {/* Brand & Terminal Identifier */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 border border-[#00E5FF]/40 bg-[#080F1E]/80 flex items-center justify-center relative glow-cyan-sm">
          <Terminal className="w-4 h-4 text-[#00E5FF]" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#00E5FF]" />
          <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-[#00E5FF]" />
        </div>
        <div>
          <div className="font-display font-extrabold tracking-[0.2em] text-white text-lg leading-none">
            MIFIS<span className="text-[#00E5FF]"> // 2026</span>
          </div>
          <div className="font-mono text-[10px] tracking-wider text-[#94A3B8] uppercase">
            GLOBAL SUMMIT PROTOCOL
          </div>
        </div>
      </div>

      {/* Status Live Indicator Badge */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#080F1E]/60 border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[#94A3B8]">
          <Shield className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>SECURITY LVL: 4-SIGMA</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080F1E]/90 border border-[#00E5FF]/30 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48]"></span>
          </span>
          <span className="text-[#E11D48] font-bold tracking-wider">REGISTRATION: ACTIVE</span>
        </div>
      </div>
    </header>
  );
}
