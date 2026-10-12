import type { WaitlistSubmission, SubmissionResult } from '../types';

export interface WaitlistService {
  submit(submission: WaitlistSubmission): Promise<SubmissionResult>;
  getSubscriberCount(): number;
}
