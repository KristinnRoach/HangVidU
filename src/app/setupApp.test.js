import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  setupNotificationsHandlers: vi.fn(),
  setupContacts: vi.fn(),
  devDebug: vi.fn(),
}));

vi.mock('./setupNotificationsHandlers.js', () => ({
  setupNotificationsHandlers: mocks.setupNotificationsHandlers,
}));

vi.mock('./setupContacts.js', () => ({
  setupContacts: mocks.setupContacts,
}));

vi.mock('../utils/dev/dev-utils.js', () => ({
  devDebug: mocks.devDebug,
}));

describe('setupApp', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('runs phase-1 startup order with setup modules before init and init before post-init wiring', async () => {
    const trace = [];

    mocks.setupNotificationsHandlers.mockImplementation(async () => {
      trace.push('setupNotificationsHandlers');
      return () => {};
    });
    mocks.setupContacts.mockImplementation(async () => {
      trace.push('setupContacts');
      return () => {};
    });

    const options = {
      runInit: vi.fn(async () => {
        trace.push('runInit');
        return true;
      }),
      bindCallUI: vi.fn(() => trace.push('bindCallUI')),
      setupMainAppBusListeners: vi.fn(() =>
        trace.push('setupMainAppBusListeners'),
      ),
      startListeningForSavedRooms: vi.fn(async () =>
        trace.push('startListeningForSavedRooms'),
      ),
      renderContactsList: vi.fn(async () => trace.push('renderContactsList')),
      autoInitMsgSessionIfNeeded: vi.fn(async () =>
        trace.push('autoInitMsgSessionIfNeeded'),
      ),
      registerServiceWorkerNavigation: vi.fn(() => {
        trace.push('registerServiceWorkerNavigation');
        return () => {};
      }),
      autoJoinFromUrl: vi.fn(async () => {
        trace.push('autoJoinFromUrl');
        return false;
      }),
      onInitFailed: vi.fn(),
      onReady: vi.fn(() => trace.push('onReady')),
    };

    const { setupApp } = await import('./setupApp.js');
    await setupApp(options);

    expect(trace.indexOf('setupNotificationsHandlers')).toBeLessThan(
      trace.indexOf('setupContacts'),
    );
    expect(trace.indexOf('setupContacts')).toBeLessThan(
      trace.indexOf('runInit'),
    );
    expect(trace.indexOf('runInit')).toBeLessThan(trace.indexOf('bindCallUI'));
    expect(trace.indexOf('runInit')).toBeLessThan(
      trace.indexOf('setupMainAppBusListeners'),
    );
  });
});
