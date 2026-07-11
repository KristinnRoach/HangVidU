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

import SWNavigation from './SWNavigation';

const mocks = vi.hoisted(() => ({
  getContactById: vi.fn(),
  getContactsIsHydrated: vi.fn(),
  openSelectedConversation: vi.fn(),
  openDirectConversation: vi.fn(),
  publish: vi.fn(),
}));

vi.mock('../stores/contacts-store', () => ({
  getContactById: mocks.getContactById,
  getContactsIsHydrated: mocks.getContactsIsHydrated,
}));

vi.mock('../stores/conversation/conversation-store', () => ({
  openConversation: mocks.openSelectedConversation,
  openDirectConversation: mocks.openDirectConversation,
  selection: () => null,
}));

vi.mock('@shared/events/index.js', () => ({
  publish: mocks.publish,
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
      });
    });

    unmount();

    expect(navigator.serviceWorker.removeEventListener).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });

  it('opens conversation deep links by raw id', async () => {
    const { unmount } = render(() => <SWNavigation />);

    messageListener?.({
      data: {
        type: 'NAVIGATE',
        path: '/?conversationId=group-1&kind=group',
      },
    });

    setHydrated(true);

    await waitFor(() => {
      expect(mocks.openSelectedConversation).toHaveBeenCalledWith('group-1', {
        displayUI: true,
      });
    });

    unmount();
  });

  it('publishes incoming-call notification navigation immediately', async () => {
    const { unmount } = render(() => <SWNavigation />);

    messageListener?.({
      data: {
        type: 'NAVIGATE',
        path: '/?conversationRoom=room-1&callerId=caller-1&callerName=Caller&accept=1',
      },
    });

    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:call:notification:opened',
      expect.objectContaining({
        roomId: 'room-1',
        callerId: 'caller-1',
        callerName: 'Caller',
        accept: true,
        startedAt: undefined,
      }),
    );
    expect(mocks.openDirectConversation).not.toHaveBeenCalled();
    expect(mocks.openSelectedConversation).not.toHaveBeenCalled();

    unmount();
  });
});
