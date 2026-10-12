import type { SubmissionResult, WaitlistEntry, WaitlistSubmission } from '../types';
import type { WaitlistService } from './api';

const STORAGE_KEY = 'mifis_waitlist_entries';
const BASE_DELEGATES = 1480;

let memoryStorage: Record<string, string> = {};

export class MockWaitlistService implements WaitlistService {
  public clearStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    memoryStorage = {};
  }

  private getStoredEntries(): WaitlistEntry[] {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        return JSON.parse(data) as WaitlistEntry[];
      }
      const memData = memoryStorage[STORAGE_KEY];
      return memData ? JSON.parse(memData) : [];
    } catch {
      return [];
    }
  }

  private saveStoredEntries(entries: WaitlistEntry[]): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } else {
        memoryStorage[STORAGE_KEY] = JSON.stringify(entries);
      }
    } catch (e) {
      console.warn('Storage unavailable:', e);
    }
  }

  public getSubscriberCount(): number {
    const entries = this.getStoredEntries();
    return BASE_DELEGATES + entries.length;
  }

  public async submit(submission: WaitlistSubmission): Promise<SubmissionResult> {
    // Artificial realistic network delay (10ms in testing, 500ms in browser)
    const isTest = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
    const delay = isTest ? 10 : 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Honeypot bot protection
    if (submission.honeypot && submission.honeypot.trim().length > 0) {
      return {
        success: false,
        errorCode: 'BOT_DETECTED',
        message: 'SECURITY ALERT: Automated bot signal intercepted and denied.',
      };
    }

    const cleanEmail = submission.email.trim().toLowerCase();
    const existing = this.getStoredEntries();

    const isDuplicate = existing.some((entry) => entry.email.toLowerCase() === cleanEmail);
    if (isDuplicate) {
      return {
        success: false,
        errorCode: 'DUPLICATE_ENTRY',
        message: 'CLEARANCE RECORD EXISTS: This terminal identity is already cleared for VIP accreditation.',
      };
    }

    const newEntry: WaitlistEntry = {
      id: `WL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      email: cleanEmail,
      position: BASE_DELEGATES + existing.length + 1,
      createdAt: new Date().toISOString(),
      source: submission.source || 'summit_portal',
    };

    existing.push(newEntry);
    this.saveStoredEntries(existing);

    return {
      success: true,
      data: newEntry,
      message: 'CREDENTIAL CLEARANCE GRANTED: Priority delegate pass reserved.',
    };
  }
}

export const waitlistService = new MockWaitlistService();
