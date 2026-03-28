import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const listeners = new Map();

  return {
    listeners,
    getConversation: vi.fn(),
    on: vi.fn((eventName, callback) => {
      listeners.set(eventName, callback);
      return () => listeners.delete(eventName);
    }),
    updateLastInteraction: vi.fn(() => Promise.resolve(null)),
  };
});

vi.mock('../messaging/messaging-controller.js', () => ({
  messagingController: {
    getConversation: mocks.getConversation,
    on: mocks.on,
  },
}));

vi.mock('../contacts/contacts-service.js', () => ({
  contactsService: {
    updateLastInteraction: mocks.updateLastInteraction,
  },
}));

describe('setupMessagingContactsIntegration', () => {
  beforeEach(() => {
    mocks.listeners.clear();
    mocks.getConversation.mockReset();
    mocks.on.mockClear();
    mocks.updateLastInteraction.mockClear();
  });

  it('updates the matching contact when messaging events arrive', async () => {
    const { setupMessagingContactsIntegration } = await import(
      './messaging-contacts-integration.js'
    );
    const teardown = setupMessagingContactsIntegration();

    mocks.getConversation.mockReturnValue({
      remoteParticipantIds: ['contact-1'],
    });

    await mocks.listeners.get('message:received')({ conversationId: 'conv-1' });
    expect(mocks.updateLastInteraction).toHaveBeenCalledWith('contact-1');

    teardown();
  });

  it('ignores non-1:1 conversations', async () => {
    const { setupMessagingContactsIntegration } = await import(
      './messaging-contacts-integration.js'
    );
    const teardown = setupMessagingContactsIntegration();

    mocks.getConversation.mockReturnValue({
      remoteParticipantIds: ['contact-1', 'contact-2'],
    });

    await mocks.listeners.get('message:sent')({ conversationId: 'conv-1' });
    expect(mocks.updateLastInteraction).not.toHaveBeenCalled();

    teardown();
  });
});
