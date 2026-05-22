import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  dispatchCommandAndAwait: vi.fn(() => Promise.resolve()),
  getContactById: vi.fn(() => null),
  getConversationId: vi.fn(() => null),
}));

vi.mock('../../shared/events/index.js', () => ({
  dispatchCommandAndAwait: mocks.dispatchCommandAndAwait,
}));

vi.mock('../../stores/contact-store.js', () => ({
  getContactById: mocks.getContactById,
  getConversationId: mocks.getConversationId,
}));

describe('handleServiceWorkerNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getContactById.mockReturnValue(null);
    mocks.getConversationId.mockReturnValue(null);
  });

  it('selects the explicit conversation id and uses contact as participant metadata', async () => {
    mocks.getContactById.mockReturnValue({ contactNickName: 'Sender' });
    const { handleServiceWorkerNavigation } = await import(
      '../handleServiceWorkerNavigation.js'
    );

    await expect(
      handleServiceWorkerNavigation(
        '/?contact=sender-1&conversationId=conversation-1',
      ),
    ).resolves.toBe(true);

    expect(mocks.getConversationId).not.toHaveBeenCalled();
    expect(mocks.getContactById).toHaveBeenCalledWith('sender-1');
    expect(mocks.dispatchCommandAndAwait).toHaveBeenCalledWith(
      'cmd:messaging:conversation:select',
      {
        conversationId: 'conversation-1',
        remoteParticipantIds: ['sender-1'],
        displayUI: true,
        contactNickName: 'Sender',
      },
    );
  });

  it('resolves a contact-only path to its conversation id', async () => {
    mocks.getConversationId.mockReturnValue('conversation-2');
    const { handleServiceWorkerNavigation } = await import(
      '../handleServiceWorkerNavigation.js'
    );

    await expect(
      handleServiceWorkerNavigation('/?contact=sender-2'),
    ).resolves.toBe(true);

    expect(mocks.getConversationId).toHaveBeenCalledWith('sender-2');
    expect(mocks.dispatchCommandAndAwait).toHaveBeenCalledWith(
      'cmd:messaging:conversation:select',
      {
        conversationId: 'conversation-2',
        remoteParticipantIds: ['sender-2'],
        displayUI: true,
        contactNickName: undefined,
      },
    );
  });

  it('does not handle unsupported paths', async () => {
    const { handleServiceWorkerNavigation } = await import(
      '../handleServiceWorkerNavigation.js'
    );

    await expect(handleServiceWorkerNavigation('/?room=room-1')).resolves.toBe(
      false,
    );

    expect(mocks.dispatchCommandAndAwait).not.toHaveBeenCalled();
  });

  it('does not handle contact paths without a known conversation id', async () => {
    mocks.getConversationId.mockReturnValue(null);
    const { handleServiceWorkerNavigation } = await import(
      '../handleServiceWorkerNavigation.js'
    );

    await expect(
      handleServiceWorkerNavigation('/?contact=sender-3'),
    ).resolves.toBe(false);

    expect(mocks.dispatchCommandAndAwait).not.toHaveBeenCalled();
  });
});
