import { Cpu } from 'lucide-react';

export function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#080F1E]/90 border border-[#00E5FF]/40 text-xs font-mono tracking-widest text-[#00E5FF] hud-bracket mb-6 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
      <Cpu className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
      <span className="font-bold">STATUS // ADVANCE CLEARANCE WINDOW OPEN</span>
      <span className="hidden md:inline text-white/40">|</span>
      <span className="hidden md:inline text-[#94A3B8]">TOKYO // 24-26 OCT 2026</span>
    </div>
  );
}
