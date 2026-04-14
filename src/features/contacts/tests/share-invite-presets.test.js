import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  copyToClipboard: vi.fn(),
  publish: vi.fn(),
}));

vi.mock('../../../shared/components/modal/copyLinkModal.js', () => ({
  copyToClipboard: mocks.copyToClipboard,
}));

vi.mock('../../../shared/events/index.js', () => ({
  publish: mocks.publish,
}));

vi.mock('../share-invite.js', () => ({
  buildReferralLink: vi.fn(() => 'https://hangvidu.com/?ref=user-123'),
  buildInviteText: vi.fn(
    () => 'Alice invited you to HangVidU: https://hangvidu.com/?ref=user-123',
  ),
}));

import {
  buildProviderShareUrl,
  getInviteShareProviders,
  shareInviteViaProvider,
} from '../share-invite-presets.js';

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
    expect(telegramUrl).toBe(
      `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
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

  it('logs and emits provider error before fallback when open throws', async () => {
    const openError = new Error('popup blocked');
    mocks.copyToClipboard.mockResolvedValue(true);
    const openImpl = vi.fn(() => {
      throw openError;
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await shareInviteViaProvider({
      providerId: 'telegram',
      openImpl,
    });

    expect(result.status).toBe('copied');
    expect(consoleSpy).toHaveBeenCalled();
    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:contacts:invite:share-result',
      expect.objectContaining({
        channel: 'telegram',
        status: 'error',
        error: expect.objectContaining({ message: 'popup blocked' }),
      }),
    );

    consoleSpy.mockRestore();
  });

  it('publishes attempt and result events', async () => {
    mocks.copyToClipboard.mockResolvedValue(true);
    const openImpl = vi.fn(() => null);

    await shareInviteViaProvider({
      providerId: 'whatsapp',
      openImpl,
    });

    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:contacts:invite:share-attempted',
      expect.objectContaining({ channel: 'whatsapp' }),
    );
    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:contacts:invite:share-result',
      expect.objectContaining({
        channel: 'copy',
        sourceChannel: 'whatsapp',
        status: 'copied',
      }),
    );
  });
});
