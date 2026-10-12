import { AlertTriangle, CheckCircle, RefreshCw, KeyRound } from 'lucide-react';
import type { WaitlistState } from '../../types';

interface FeedbackNoticeProps {
  state: WaitlistState;
  onReset: () => void;
}

export function FeedbackNotice({ state, onReset }: FeedbackNoticeProps) {
  if (state.status === 'idle' || state.status === 'submitting') {
    return null;
  }

  if (state.status === 'error') {
    return (
      <div 
        role="alert" 
        className="w-full max-w-xl mx-auto mt-5 p-4 bg-[#080F1E]/95 border border-[#E11D48]/80 text-left hud-bracket glow-crimson"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-mono text-xs font-bold text-[#E11D48] tracking-wider uppercase">
              TRANSMISSION REJECTED
            </div>
            <p className="font-mono text-xs text-[#94A3B8] mt-1">
              {state.errorMessage || 'Unknown terminal dispatch exception.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-1 text-[11px] font-mono border border-[#E11D48]/50 hover:bg-[#E11D48]/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className="w-3 h-3" />
            RESET
          </button>
        </div>
      </div>
    );
  }

  if (state.status === 'success' && state.successData) {
    const { id, position, email, createdAt } = state.successData;

    return (
      <div 
        role="status" 
        className="w-full max-w-xl mx-auto mt-6 p-6 bg-[#080F1E]/95 border-2 border-[#00E5FF] hud-bracket glow-cyan text-left"
      >
        <div className="flex items-center justify-between border-b border-[#00E5FF]/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#00E5FF]" />
            <span className="font-display font-bold text-sm tracking-widest text-[#00E5FF] uppercase">
              ACCESS PASS ALLOCATED
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#38BDF8] bg-[#00E5FF]/10 px-2 py-0.5 border border-[#00E5FF]/30">
            SIG: VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-[#94A3B8]">
          <div className="bg-[#040711]/70 p-3 border border-white/10">
            <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase mb-1">DELEGATE CLEARANCE ID</div>
            <div className="text-white font-bold text-sm tracking-wider">{id}</div>
          </div>

          <div className="bg-[#040711]/70 p-3 border border-white/10">
            <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase mb-1">GLOBAL QUEUE POSITION</div>
            <div className="text-[#00E5FF] font-bold text-sm tracking-wider">#{position.toLocaleString()}</div>
          </div>

          <div className="bg-[#040711]/70 p-3 border border-white/10">
            <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase mb-1">AUTHENTICATED IDENTITY</div>
            <div className="text-white truncate font-medium">{email}</div>
          </div>

          <div className="bg-[#040711]/70 p-3 border border-white/10">
            <div className="text-[10px] text-[#38BDF8] tracking-widest uppercase mb-1">TRANSMISSION TIMESTAMP</div>
            <div className="text-white truncate text-[11px]">{new Date(createdAt).toLocaleTimeString()} UTC</div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#94A3B8]">
            <KeyRound className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>CONFIRMATION DISPATCHED TO TERMINAL</span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-mono text-[#00E5FF] hover:underline cursor-pointer"
          >
            + REGISTER ANOTHER PASS
          </button>
        </div>
      </div>
    );
  }

  return null;
}
