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
  useAuth: vi.fn(),
  getContactsIsHydrated: vi.fn(),
  openSelectedConversation: vi.fn(),
  openDirectConversation: vi.fn(),
  publish: vi.fn(),
}));

vi.mock('@auth', () => ({ useAuth: mocks.useAuth }));

vi.mock('../stores/contacts-store', () => ({
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
  let setLoggedIn;
  let messageListener;

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    messageListener = null;

    const [isHydrated, updateHydrated] = createSignal(false);
    setHydrated = updateHydrated;
    const [isLoggedIn, updateLoggedIn] = createSignal(true);
    setLoggedIn = updateLoggedIn;
    mocks.useAuth.mockReturnValue({ isLoggedIn, isLoggingOut: () => false });
    mocks.getContactsIsHydrated.mockImplementation(() => isHydrated());

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
    window.history.replaceState(null, '', '/');
  });

  it('opens the notification launch URL once sign-in and contacts are ready', async () => {
    const path =
      '/?contact=sender-1&conversationId=conversation-1&kind=direct&keep=yes#top';
    window.history.replaceState(null, '', path);
    setLoggedIn(false);
    render(() => <SWNavigation />);

    setHydrated(true);
    expect(mocks.openSelectedConversation).not.toHaveBeenCalled();
    expect(window.location.search).toContain('conversationId=conversation-1');

    setLoggedIn(true);
    expect(mocks.openSelectedConversation).toHaveBeenCalledWith(
      'conversation-1',
      { displayUI: true },
    );
    expect(mocks.openDirectConversation).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(window.location.search + window.location.hash).toBe(
        '?keep=yes#top',
      );
    });

    setHydrated(false);
    setHydrated(true);
    expect(mocks.openSelectedConversation).toHaveBeenCalledTimes(1);
  });

  it.each([
    [true, ''],
    [false, '?contact=sender-1'],
  ])(
    'consumes a contact launch URL only if opening succeeds (%s)',
    async (opened, expectedSearch) => {
      const search = '?contact=sender-1';
      window.history.replaceState(null, '', `/${search}`);
      let finishOpen;
      mocks.openDirectConversation.mockReturnValueOnce(
        new Promise((resolve) => {
          finishOpen = resolve;
        }),
      );
      setHydrated(true);
      render(() => <SWNavigation />);

      expect(mocks.openDirectConversation).toHaveBeenCalledWith('sender-1', {
        displayUI: true,
      });
      expect(window.location.search).toBe(search);

      finishOpen(opened);
      await Promise.resolve();
      expect(window.location.search).toBe(expectedSearch);
    },
  );

  it('leaves the incoming-call launch URL to the call provider', () => {
    window.history.replaceState(null, '', '/?call=1&conversationId=room-1');
    setHydrated(true);
    render(() => <SWNavigation />);

    expect(mocks.publish).not.toHaveBeenCalled();
    expect(mocks.openSelectedConversation).not.toHaveBeenCalled();
    expect(window.location.search).toBe('?call=1&conversationId=room-1');
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
        path: '/?call=1&conversationId=room-1&callInviteId=call-invite-1&callerId=caller-1&callerName=Caller&accept=1',
      },
    });

    expect(mocks.publish).toHaveBeenCalledWith(
      'evt:call:notification:opened',
      expect.objectContaining({
        callInviteId: 'call-invite-1',
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
