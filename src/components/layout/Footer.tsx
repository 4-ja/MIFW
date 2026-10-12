import { ShieldCheck, Globe2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 mt-auto border-t border-[rgba(0,229,255,0.12)] relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#94A3B8]">
        {/* Left: Terminal metadata & copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-white font-bold tracking-wider">
            <Globe2 className="w-4 h-4 text-[#00E5FF]" />
            <span>MIFIS FOUNDATION &copy; 2026</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="text-[11px] text-[#94A3B8]">
            GLOBAL ALLIANCE FOR AUTONOMOUS MONETARY SYSTEMS
          </span>
        </div>

        {/* Right: Cryptographic verification stamp */}
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 bg-[#080F1E]/80 border border-white/10 px-2.5 py-1 text-[#38BDF8]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>HASH: 0x98A...F104</span>
          </div>
          <span className="text-white/40">|</span>
          <span className="hover:text-[#00E5FF] transition-colors cursor-pointer">
            PROTOCOL_POLICY.MD
          </span>
          <span className="text-white/40">|</span>
          <span className="hover:text-[#00E5FF] transition-colors cursor-pointer">
            TERMS_OF_ACCESS
          </span>
        </div>
      </div>
    </footer>
  );
}
