import { describe, expect, it, vi } from 'vitest';
import {
  buildReferralLink,
  buildMessengerInviteText,
  shareMessengerInvite,
} from './messenger-invite.js';

describe('messenger-invite', () => {
  describe('buildReferralLink', () => {
    it('returns origin link with ref query when user id exists', () => {
      const result = buildReferralLink('user-123', 'https://hangvidu.com');
      expect(result).toBe('https://hangvidu.com/?ref=user-123');
    });

    it('returns origin only when user id is missing', () => {
      const result = buildReferralLink('', 'https://hangvidu.com');
      expect(result).toBe('https://hangvidu.com');
    });
  });

  describe('buildMessengerInviteText', () => {
    it('includes sender name and invite link', () => {
      const link = 'https://hangvidu.com/?ref=user-123';
      const text = buildMessengerInviteText({ senderName: 'Alice', link });

      expect(text).toContain('Alice');
      expect(text).toContain(link);
    });
  });

  describe('shareMessengerInvite', () => {
    it('uses native share when available', async () => {
      const shareImpl = vi.fn().mockResolvedValue(undefined);
      const copyImpl = vi.fn().mockResolvedValue(false);

      const result = await shareMessengerInvite({
        senderName: 'Alice',
        userId: 'user-123',
        origin: 'https://hangvidu.com',
        shareImpl,
        copyImpl,
      });

      expect(result).toEqual(
        expect.objectContaining({ ok: true, status: 'shared' }),
      );
      expect(shareImpl).toHaveBeenCalledTimes(1);
      expect(copyImpl).not.toHaveBeenCalled();
    });

    it('falls back to copy when share is unavailable', async () => {
      const copyImpl = vi.fn().mockResolvedValue(true);

      const result = await shareMessengerInvite({
        senderName: 'Alice',
        userId: 'user-123',
        origin: 'https://hangvidu.com',
        shareImpl: null,
        copyImpl,
      });

      expect(result).toEqual(
        expect.objectContaining({ ok: true, status: 'copied' }),
      );
      expect(copyImpl).toHaveBeenCalledWith(
        'https://hangvidu.com/?ref=user-123',
      );
    });

    it('returns copy_failed when share fails and copy fallback fails', async () => {
      const shareImpl = vi
        .fn()
        .mockRejectedValue(new Error('Share failed unexpectedly'));
      const copyImpl = vi.fn().mockResolvedValue(false);

      const result = await shareMessengerInvite({
        senderName: 'Alice',
        userId: 'user-123',
        origin: 'https://hangvidu.com',
        shareImpl,
        copyImpl,
      });

      expect(result).toEqual(
        expect.objectContaining({ ok: false, status: 'copy_failed' }),
      );
      expect(copyImpl).toHaveBeenCalledTimes(1);
    });
  });
});
