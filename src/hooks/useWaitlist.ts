import { useState, useCallback } from 'react';
import type { WaitlistState, WaitlistSubmission } from '../types';
import { validateEmail } from '../core/validation';
import { waitlistService } from '../services/mockService';

export function useWaitlist() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<WaitlistState>({ status: 'idle' });
  const [subscriberCount, setSubscriberCount] = useState<number>(() => waitlistService.getSubscriberCount());

  const resetState = useCallback(() => {
    setState({ status: 'idle' });
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Check validation
      const validation = validateEmail(email);
      if (!validation.isValid) {
        setState({
          status: 'error',
          errorMessage: validation.error,
        });
        return;
      }

      setState({ status: 'submitting' });

      try {
        const payload: WaitlistSubmission = {
          email,
          honeypot,
          source: 'landing_hud',
          metadata: {
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          },
        };

        const result = await waitlistService.submit(payload);

        if (result.success && result.data) {
          setState({
            status: 'success',
            successData: result.data,
          });
          setSubscriberCount(waitlistService.getSubscriberCount());
          setEmail('');
        } else {
          setState({
            status: 'error',
            errorMessage: result.message || 'TRANSMISSION FAILED: Network handshake timeout.',
          });
        }
      } catch {
        setState({
          status: 'error',
          errorMessage: 'SYSTEM FAULT: Critical gateway exception encountered.',
        });
      }
    },
    [email, honeypot]
  );

  return {
    email,
    setEmail,
    honeypot,
    setHoneypot,
    state,
    resetState,
    handleSubmit,
    subscriberCount,
  };
}
