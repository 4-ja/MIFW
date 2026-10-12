import { StatusBadge } from './StatusBadge';
import { WaitlistForm } from '../waitlist/WaitlistForm';
import { FeedbackNotice } from '../waitlist/FeedbackNotice';
import { SocialProof } from './SocialProof';
import type { WaitlistState } from '../../types';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  email: string;
  setEmail: (val: string) => void;
  honeypot: string;
  setHoneypot: (val: string) => void;
  state: WaitlistState;
  onSubmit: (e?: React.FormEvent) => void;
  onReset: () => void;
  subscriberCount: number;
}

export function HeroSection({
  email,
  setEmail,
  honeypot,
  setHoneypot,
  state,
  onSubmit,
  onReset,
  subscriberCount,
}: HeroSectionProps) {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col items-center text-center">
      {/* Category / Status Pill Badge */}
      <StatusBadge />

      {/* Main Display Title with Exact Design Token Hierarchy */}
      <h1 
        className="font-display text-white uppercase text-center font-black tracking-[0.2em] leading-[1.08] text-glow-white max-w-4xl"
        style={{
          fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
        }}
      >
        MIFIS <span className="text-[#00E5FF] text-glow-cyan">SUMMIT</span>
      </h1>

      {/* Sub-headline / Terminal Teaser */}
      <div className="mt-3 flex items-center justify-center gap-2 font-display text-sm sm:text-base md:text-lg tracking-[0.14em] text-[#38BDF8] font-bold uppercase">
        <Sparkles className="w-4 h-4 text-[#00E5FF]" />
        <span>AUTONOMOUS FINANCIAL PROTOCOLS &amp; NEURAL SURVEILLANCE</span>
        <Sparkles className="w-4 h-4 text-[#00E5FF]" />
      </div>

      {/* Value Pitch / High-Contrast Stage-Legible Narrative */}
      <p className="mt-6 font-body text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-2xl font-medium tracking-[0.05em] leading-relaxed">
        The definitive global gathering of algorithmic market makers, sovereign capital allocators, 
        and high-assurance cryptography engineers. Concurrently deploying in Tokyo and via encrypted neural satellite stream.
      </p>

      {/* Event Meta Specifications Ribbon */}
      <div className="my-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2 bg-[#080F1E]/80 border border-white/10 px-3.5 py-2 hud-bracket">
          <Calendar className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>DATE: OCT 24–26, 2026</span>
        </div>

        <div className="flex items-center gap-2 bg-[#080F1E]/80 border border-white/10 px-3.5 py-2 hud-bracket">
          <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
          <span>LOCATION: TOKYO METROPOLITAN STAGE &amp; NETLINK</span>
        </div>

        <div className="flex items-center gap-2 bg-[#080F1E]/80 border border-white/10 px-3.5 py-2 hud-bracket">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
          <span>FORMAT: CLOSED-DOOR TECHNICAL SUMMIT</span>
        </div>
      </div>

      {/* Waitlist Form Component */}
      <div className="w-full mt-2">
        <WaitlistForm
          email={email}
          setEmail={setEmail}
          honeypot={honeypot}
          setHoneypot={setHoneypot}
          state={state}
          onSubmit={onSubmit}
        />

        {/* Feedback / State Indicator */}
        <FeedbackNotice state={state} onReset={onReset} />
      </div>

      {/* Social Proof & Queue Counter */}
      <div className="mt-10 w-full border-t border-[rgba(0,229,255,0.12)] pt-6">
        <SocialProof count={subscriberCount} />
      </div>
    </section>
  );
}
