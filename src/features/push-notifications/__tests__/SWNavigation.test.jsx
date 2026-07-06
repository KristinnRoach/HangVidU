import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';

import SWNavigation from '../SWNavigation';

const mocks = vi.hoisted(() => ({
  getContactById: vi.fn(),
  getContactsIsHydrated: vi.fn(),
  openSelectedConversation: vi.fn(),
  openDirectConversation: vi.fn(),
}));

vi.mock('../../../stores/contactsStore', () => ({
  getContactById: mocks.getContactById,
  getContactsIsHydrated: mocks.getContactsIsHydrated,
}));

vi.mock('../../../stores/conversationStore', () => ({
  open: mocks.openSelectedConversation,
  openDirectConversation: mocks.openDirectConversation,
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
    mocks.getContactById.mockReturnValue({ nickname: 'Sender' });

    const descriptor = Object.getOwnPropertyDescriptor(
      globalThis.navigator,
      'serviceWorker',
    );
    restoreServiceWorker = () => {
      if (descriptor) {
        Object.defineProperty(
          globalThis.navigator,
          'serviceWorker',
          descriptor,
        );
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

    expect(mocks.openDirectConversation).not.toHaveBeenCalled();

    setHydrated(true);

    await waitFor(() => {
      expect(mocks.openDirectConversation).toHaveBeenCalledWith('sender-1', {
        displayUI: true,
        nickname: 'Sender',
      });
    });

    unmount();

    expect(navigator.serviceWorker.removeEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });

  it('preserves group kind on conversation deep links', async () => {
    const { unmount } = render(() => <SWNavigation />);

    messageListener?.({
      data: {
        type: 'NAVIGATE',
        path: '/?conversationId=group-1&kind=group',
      },
    });

    setHydrated(true);

    await waitFor(() => {
      expect(mocks.openSelectedConversation).toHaveBeenCalledWith({
        conversationId: 'group-1',
        kind: 'group',
        remoteParticipantIds: [],
        displayUI: true,
        nickname: undefined,
      });
    });

    unmount();
  });
});
