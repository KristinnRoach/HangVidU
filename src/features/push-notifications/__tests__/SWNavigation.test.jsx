import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';

import SWNavigation from '../SWNavigation';

const mocks = vi.hoisted(() => ({
  getContactById: vi.fn(),
  getContactsIsHydrated: vi.fn(),
  getConversationId: vi.fn(),
  openSelectedConversation: vi.fn(),
}));

vi.mock('../../../stores/contactsStore', () => ({
  getContactById: mocks.getContactById,
  getContactsIsHydrated: mocks.getContactsIsHydrated,
  getConversationId: mocks.getConversationId,
}));

vi.mock('../../../stores/selectedConversationStore', () => ({
  open: mocks.openSelectedConversation,
  clear: vi.fn(),
  selection: () => null,
}));

describe('SWNavigation', () => {
  let restoreServiceWorker;
  let setHydrated;
  let messageListener;

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    messageListener = null;

    const [isHydrated, updateHydrated] = createSignal(false);
    setHydrated = updateHydrated;
    mocks.getContactsIsHydrated.mockImplementation(() => isHydrated());
    mocks.getConversationId.mockReturnValue('conversation-1');
    mocks.getContactById.mockReturnValue({ contactNickName: 'Sender' });

    const descriptor = Object.getOwnPropertyDescriptor(
      globalThis.navigator,
      'serviceWorker',
    );
    restoreServiceWorker = () => {
      if (descriptor) {
        Object.defineProperty(globalThis.navigator, 'serviceWorker', descriptor);
      } else {
        delete globalThis.navigator.serviceWorker;
      }
    };

    Object.defineProperty(globalThis.navigator, 'serviceWorker', {
      configurable: true,
      value: {
        startMessages: vi.fn(),
        addEventListener: vi.fn((type, listener) => {
          if (type === 'message') messageListener = listener;
        }),
        removeEventListener: vi.fn((type, listener) => {
          if (type === 'message' && messageListener === listener) {
            messageListener = null;
          }
        }),
      },
    });
  });

  afterEach(() => {
    cleanup();
    restoreServiceWorker?.();
  });

  it('queues NAVIGATE messages until contacts hydrate, then opens the conversation', async () => {
    const { unmount } = render(() => <SWNavigation />);

    expect(navigator.serviceWorker.startMessages).toHaveBeenCalledTimes(1);
    expect(navigator.serviceWorker.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );

    messageListener?.({
      data: { type: 'NAVIGATE', path: '/?contact=sender-1' },
    });

    expect(mocks.openSelectedConversation).not.toHaveBeenCalled();

    setHydrated(true);

    await waitFor(() => {
      expect(mocks.openSelectedConversation).toHaveBeenCalledWith({
        conversationId: 'conversation-1',
        remoteParticipantIds: ['sender-1'],
        displayUI: true,
        contactNickName: 'Sender',
      });
    });

    unmount();

    expect(navigator.serviceWorker.removeEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });
});
