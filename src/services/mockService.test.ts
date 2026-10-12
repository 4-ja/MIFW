import { describe, it, expect, beforeEach } from 'vitest';
import { MockWaitlistService } from './mockService';

describe('MockWaitlistService Interactivity', () => {
  let service: MockWaitlistService;

  beforeEach(() => {
    service = new MockWaitlistService();
    service.clearStorage();
  });

  it('successfully registers an early access delegate', async () => {
    const res = await service.submit({ email: 'director@quantum-hedge.com' });
    expect(res.success).toBe(true);
    expect(res.data).toBeDefined();
    expect(res.data?.email).toBe('director@quantum-hedge.com');
    expect(res.data?.id).toMatch(/^WL-/);
    expect(res.data?.position).toBeGreaterThan(1480);
  });

  it('rejects duplicate email submissions with DUPLICATE_ENTRY', async () => {
    await service.submit({ email: 'partner@capital.io' });
    const duplicateRes = await service.submit({ email: 'PARTNER@CAPITAL.IO' });

    expect(duplicateRes.success).toBe(false);
    expect(duplicateRes.errorCode).toBe('DUPLICATE_ENTRY');
  });

  it('intercepts and denies automated bots via honeypot', async () => {
    const botRes = await service.submit({
      email: 'bot@spammer.org',
      honeypot: 'spam-payload',
    });

    expect(botRes.success).toBe(false);
    expect(botRes.errorCode).toBe('BOT_DETECTED');
  });
});
