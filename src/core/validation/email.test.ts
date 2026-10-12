import { describe, it, expect } from 'vitest';
import { validateEmail } from './email';

describe('Email Validation Engine', () => {
  it('accepts valid email addresses', () => {
    const validEmails = [
      'delegate@mifis.io',
      'researcher.lead@fintech-labs.ac.jp',
      'fund_manager+vip@capital.co',
      'user123@domain.org',
    ];

    for (const email of validEmails) {
      const result = validateEmail(email);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    }
  });

  it('rejects empty or whitespace-only inputs', () => {
    expect(validateEmail('').isValid).toBe(false);
    expect(validateEmail('   ').isValid).toBe(false);
  });

  it('rejects malformed email formats', () => {
    const invalidEmails = [
      'not-an-email',
      'user@',
      '@domain.com',
      'user@domain',
      'user@.com',
      'user..name@domain.com',
    ];

    for (const email of invalidEmails) {
      const result = validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    }
  });

  it('rejects overly long strings (>254 chars)', () => {
    const longString = 'a'.repeat(250) + '@domain.com';
    const result = validateEmail(longString);
    expect(result.isValid).toBe(false);
  });
});
