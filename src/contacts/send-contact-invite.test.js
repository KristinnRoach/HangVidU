import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendInvite: vi.fn(),
}));

vi.mock('./invitations.js', () => ({
  sendInvite: mocks.sendInvite,
}));

import { sendContactInvite } from './send-contact-invite.js';

describe('sendContactInvite', () => {
  it('returns sent on successful invite write', async () => {
    mocks.sendInvite.mockResolvedValue(undefined);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: true, status: 'sent' });
  });

  it('maps duplicate invite by firebase error code', async () => {
    const error = new Error('Invite already exists');
    error.code = 'already_invited';
    mocks.sendInvite.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: false, status: 'already_invited' });
  });

  it('maps duplicate invite by fallback error message', async () => {
    const error = new Error('invite exists for this pair');
    mocks.sendInvite.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: false, status: 'already_invited' });
  });

  it('maps permission denied separately from duplicate invites', async () => {
    const error = new Error('Permission denied');
    error.code = 'PERMISSION_DENIED';
    mocks.sendInvite.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({
      ok: false,
      status: 'permission_denied',
      error,
    });
  });
});
