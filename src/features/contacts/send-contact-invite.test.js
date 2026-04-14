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
    const error = new Error('Permission denied');
    error.code = 'PERMISSION_DENIED';
    mocks.sendInvite.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: false, status: 'already_invited' });
  });

  it('maps duplicate invite by fallback error message', async () => {
    const error = new Error('write blocked: permission_denied');
    mocks.sendInvite.mockRejectedValue(error);

    const result = await sendContactInvite('u2', 'Bob');
    expect(result).toEqual({ ok: false, status: 'already_invited' });
  });
});
