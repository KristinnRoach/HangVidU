import { describe, expect, it, vi } from 'vitest';

vi.mock('../../shared/i18n/index.js', () => ({
  t: (key, params) => {
    if (!params) return key;
    return `${key} ${Object.values(params).join(' ')}`;
  },
}));

import {
  buildReferralLink,
  buildInviteText,
  shareInvite,
} from './share-invite.js';

describe('share-invite', () => {
  describe('buildReferralLink', () => {
    it('returns origin link with ref query when user id exists', () => {
      const result = buildReferralLink('user-123', 'https://hangvidu.com');
      expect(result).toBe('https://hangvidu.com/?ref=user-123');
    });

    it('returns origin only when user id is missing', () => {
      const result = buildReferralLink('', 'https://hangvidu.com');
      expect(result).toBe('https://hangvidu.com');
    });

    it('encodes special characters in user id', () => {
      const id = 'user 123+&';
      const result = buildReferralLink(id, 'https://hangvidu.com');
      expect(result).toBe(
        `https://hangvidu.com/?ref=${encodeURIComponent(id)}`,
      );
    });
  });

  describe('buildInviteText', () => {
    it('includes sender name and invite link', () => {
      const link = 'https://hangvidu.com/?ref=user-123';
      const text = buildInviteText({ senderName: 'Alice', link });

      expect(text).toContain('Alice');
      expect(text).toContain(link);
    });
  });

  describe('shareInvite', () => {
    it('uses native share when available', async () => {
      const shareImpl = vi.fn().mockResolvedValue(undefined);
      const copyImpl = vi.fn().mockResolvedValue(false);

      const result = await shareInvite({
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

      const result = await shareInvite({
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

      const result = await shareInvite({
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

    it('returns cancelled when share is aborted', async () => {
      const abortError = new DOMException('Share aborted', 'AbortError');
      const shareImpl = vi.fn().mockRejectedValue(abortError);
      const copyImpl = vi.fn().mockResolvedValue(true);

      const result = await shareInvite({
        senderName: 'Alice',
        userId: 'user-123',
        origin: 'https://hangvidu.com',
        shareImpl,
        copyImpl,
      });

      expect(result).toEqual(
        expect.objectContaining({ ok: false, status: 'cancelled' }),
      );
      expect(copyImpl).not.toHaveBeenCalled();
    });
  });
});
