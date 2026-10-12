export interface WaitlistSubmission {
  email: string;
  source?: string;
  referrer?: string;
  honeypot?: string;
  metadata?: {
    timestamp: string;
    userAgent: string;
  };
}

export interface WaitlistEntry {
  id: string;
  email: string;
  position: number;
  createdAt: string;
  source: string;
}

export interface SubmissionResult {
  success: boolean;
  data?: WaitlistEntry;
  message?: string;
  errorCode?: 'INVALID_EMAIL' | 'DUPLICATE_ENTRY' | 'BOT_DETECTED' | 'NETWORK_ERROR';
}

export type WaitlistStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface WaitlistState {
  status: WaitlistStatus;
  errorMessage?: string;
  successData?: WaitlistEntry;
}
