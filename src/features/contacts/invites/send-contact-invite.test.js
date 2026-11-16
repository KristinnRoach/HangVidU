import { describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  sendContactRequest: vi.fn(),
}));

vi.mock('../../../stores/user-profile-store.js', () => ({
  sendContactRequest: mocks.sendContactRequest,
}));

import { sendContactInvite } from './send-contact-invite.js';

describe('sendContactInvite', () => {
  it('returns sent on successful invite write', async () => {
    mocks.sendContactRequest.mockResolvedValue(undefined);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: true, status: 'sent' });
  });

  it('returns already_saved when the server creates no request for existing contacts', async () => {
    mocks.sendContactRequest.mockResolvedValue({
      ok: true,
      alreadyContacts: true,
    });
    await expect(sendContactInvite('u2', 'Bob')).resolves.toEqual({
      ok: true,
      status: 'already_saved',
    });
  });

  it('maps duplicate invite by firebase error code', async () => {
    const error = new Error('Invite already exists');
    error.code = 'already_invited';
    mocks.sendContactRequest.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: false, status: 'already_invited' });
  });

  it('maps duplicate invite by fallback error message', async () => {
    const error = new Error('invite exists for this pair');
    mocks.sendContactRequest.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: false, status: 'already_invited' });
  });

  it('maps permission denied separately from duplicate invites', async () => {
    const error = new Error('Permission denied');
    error.code = 'PERMISSION_DENIED';
    mocks.sendContactRequest.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({
      ok: false,
      status: 'permission_denied',
      error,
    });
  });
});
