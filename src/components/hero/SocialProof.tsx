import { Users, CheckCircle2, Lock } from 'lucide-react';

interface SocialProofProps {
  count: number;
}

export function SocialProof({ count }: SocialProofProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 text-xs font-mono text-[#94A3B8]">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-[#00E5FF]" />
        <span>
          <strong className="text-white font-bold">{count.toLocaleString()}</strong> INSTITUTIONAL DELEGATES IN QUEUE
        </span>
      </div>

      <div className="hidden sm:inline text-white/20">|</div>

      <div className="flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
        <span>TIER 1 PROTOCOL SPONSORSHIP ALLOCATED</span>
      </div>

      <div className="hidden sm:inline text-white/20">|</div>

      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-[#38BDF8]" />
        <span>256-BIT ENCRYPTED CREDENTIALS</span>
      </div>
    </div>
  );
}
