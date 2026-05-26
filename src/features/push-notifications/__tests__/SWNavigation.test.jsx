import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';

import SWNavigation from '../SWNavigation';

const mocks = vi.hoisted(() => ({
  getContactById: vi.fn(),
  getContactsIsHydrated: vi.fn(),
  getConversationId: vi.fn(),
}));

vi.mock('../../../stores/contactsStore', () => ({
  getContactById: mocks.getContactById,
  getContactsIsHydrated: mocks.getContactsIsHydrated,
  getConversationId: mocks.getConversationId,
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
    const onNavigate = vi.fn();

    const { unmount } = render(() => <SWNavigation onNavigate={onNavigate} />);

    expect(navigator.serviceWorker.startMessages).toHaveBeenCalledTimes(1);
    expect(navigator.serviceWorker.addEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );

    messageListener?.({
      data: { type: 'NAVIGATE', path: '/?contact=sender-1' },
    });

    expect(onNavigate).not.toHaveBeenCalled();

    setHydrated(true);

    await waitFor(() => {
      expect(onNavigate).toHaveBeenCalledWith({
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
