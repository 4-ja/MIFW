import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import type { WaitlistState } from '../../types';

interface WaitlistFormProps {
  email: string;
  setEmail: (email: string) => void;
  honeypot: string;
  setHoneypot: (hp: string) => void;
  state: WaitlistState;
  onSubmit: (e?: React.FormEvent) => void;
}

export function WaitlistForm({
  email,
  setEmail,
  honeypot,
  setHoneypot,
  state,
  onSubmit,
}: WaitlistFormProps) {
  const isSubmitting = state.status === 'submitting';
  const isSuccess = state.status === 'success';

  if (isSuccess) {
    return null; // FeedbackNotice will show the confirmed pass
  }

  return (
    <form 
      onSubmit={onSubmit}
      className="w-full max-w-xl mx-auto relative z-10"
      noValidate
    >
      {/* Honeypot field for bot deterrence */}
      <input
        type="text"
        name="hp_field"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="opacity-0 absolute -top-96 -left-96 pointer-events-none w-0 h-0"
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-0 p-1 bg-[#080F1E]/90 border border-[#00E5FF]/40 hud-bracket shadow-[0_0_20px_rgba(0,229,255,0.15)] focus-within:border-[#00E5FF] focus-within:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all">
        {/* Email Input */}
        <div className="relative flex-1 flex items-center">
          <span className="pl-4 pr-1 font-mono text-xs text-[#00E5FF] select-none font-bold">
            &gt;
          </span>
          <input
            id="waitlist-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            placeholder="ENTER INSTITUTIONAL EMAIL..."
            aria-label="Institutional Email for VIP clearance"
            className="w-full bg-transparent px-3 py-3.5 sm:py-3 font-mono text-sm sm:text-xs text-white placeholder-[#94A3B8]/60 focus:outline-none tracking-wider disabled:opacity-50"
            required
          />
        </div>

        {/* CTA Button */}
        <button
          id="waitlist-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-[#00E5FF] hover:bg-[#38BDF8] active:bg-[#00E5FF] text-[#040711] font-display font-extrabold text-xs tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed glow-cyan-sm hover:glow-cyan"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#040711]" />
              <span>TRANSMITTING...</span>
            </>
          ) : (
            <>
              <span>REQUEST CLEARANCE</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#040711] group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#94A3B8] px-1">
        <span>ENCRYPTED END-TO-END // DISPATCH 004</span>
        <span className="text-[#38BDF8]">STRICT CAPACITY: 2,500 MAX</span>
      </div>
    </form>
  );
}
