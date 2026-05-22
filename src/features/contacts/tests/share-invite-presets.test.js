import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  copyToClipboard: vi.fn(),
}));

vi.mock('../../../shared/utils/clipboard.js', () => ({
  copyToClipboard: mocks.copyToClipboard,
}));

vi.mock('../helpers/share-invite.js', () => ({
  buildReferralLink: vi.fn(() => 'https://hangvidu.com/?ref=user-123'),
  buildInviteText: vi.fn(
    () => 'Alice invited you to HangVidU: https://hangvidu.com/?ref=user-123',
  ),
}));

import {
  buildProviderShareUrl,
  getInviteShareProviders,
  shareInviteViaProvider,
} from '../helpers/share-invite-presets.js';

describe('share-invite-presets', () => {
  it('exposes WhatsApp and Telegram providers', () => {
    const providers = getInviteShareProviders();
    const ids = providers.map((provider) => provider.id);
    expect(ids).toEqual(['whatsapp', 'telegram']);
  });

  it('builds deterministic WhatsApp and Telegram URLs', () => {
    const text = 'Hello world https://hangvidu.com/?ref=user-123';
    const link = 'https://hangvidu.com/?ref=user-123';

    const whatsappUrl = buildProviderShareUrl('whatsapp', { text, link });
    const telegramUrl = buildProviderShareUrl('telegram', { text, link });

    expect(whatsappUrl).toBe(`https://wa.me/?text=${encodeURIComponent(text)}`);
    const textWithoutLink = text.replace(link, '').trim();
    expect(telegramUrl).toBe(
      `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(textWithoutLink)}`,
    );
  });

  it('returns opened when provider URL launches', async () => {
    mocks.copyToClipboard.mockResolvedValue(false);
    const openImpl = vi.fn(() => ({}));

    const result = await shareInviteViaProvider({
      providerId: 'whatsapp',
      openImpl,
    });

    expect(result.status).toBe('opened');
    expect(result.ok).toBe(true);
    expect(openImpl).toHaveBeenCalledTimes(1);
    expect(mocks.copyToClipboard).not.toHaveBeenCalled();
  });

  it('falls back to copy when provider URL fails to open', async () => {
    mocks.copyToClipboard.mockResolvedValue(true);
    const openImpl = vi.fn(() => null);

    const result = await shareInviteViaProvider({
      providerId: 'telegram',
      openImpl,
    });

    expect(result.status).toBe('copied');
    expect(result.ok).toBe(true);
    expect(mocks.copyToClipboard).toHaveBeenCalledTimes(1);
  });

  it('returns copy_failed when open and copy both fail', async () => {
    mocks.copyToClipboard.mockResolvedValue(false);
    const openImpl = vi.fn(() => null);

    const result = await shareInviteViaProvider({
      providerId: 'telegram',
      openImpl,
    });

    expect(result.status).toBe('copy_failed');
    expect(result.ok).toBe(false);
  });

  it('falls back to copy when open throws', async () => {
    mocks.copyToClipboard.mockResolvedValue(true);
    const openImpl = vi.fn(() => {
      throw new Error('popup blocked');
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await shareInviteViaProvider({
      providerId: 'telegram',
      openImpl,
    });

    expect(result.status).toBe('copied');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('returns copy_failed when copy fallback throws', async () => {
    mocks.copyToClipboard.mockRejectedValue(new Error('clipboard denied'));
    const openImpl = vi.fn(() => null);

    const result = await shareInviteViaProvider({
      providerId: 'telegram',
      openImpl,
    });

    expect(result.status).toBe('copy_failed');
    expect(result.ok).toBe(false);
  });
});
