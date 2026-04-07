import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  setupNotificationsHandlers: vi.fn(),
  setupContacts: vi.fn(),
}));

vi.mock('./setupNotificationsHandlers.js', () => ({
  setupNotificationsHandlers: mocks.setupNotificationsHandlers,
}));

vi.mock('./setupContacts.js', () => ({
  setupContacts: mocks.setupContacts,
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

    const orderedSteps = [
      'setupNotificationsHandlers',
      'setupContacts',
      'runInit',
      'bindCallUI',
      'setupMainAppBusListeners',
    ];
    for (const step of orderedSteps) {
      expect(trace, `expected "${step}" to have been traced`).toContain(step);
    }

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

  it('uses single-flight initialization for concurrent setupApp calls', async () => {
    let resolveInit;
    const initGate = new Promise((resolve) => {
      resolveInit = resolve;
    });

    mocks.setupNotificationsHandlers.mockResolvedValue(() => {});
    mocks.setupContacts.mockResolvedValue(() => {});

    const options = {
      runInit: vi.fn(async () => {
        await initGate;
        return true;
      }),
      bindCallUI: vi.fn(),
      setupMainAppBusListeners: vi.fn(),
      startListeningForSavedRooms: vi.fn(async () => {}),
      renderContactsList: vi.fn(async () => {}),
      autoInitMsgSessionIfNeeded: vi.fn(async () => {}),
      registerServiceWorkerNavigation: vi.fn(),
      autoJoinFromUrl: vi.fn(async () => true),
      onInitFailed: vi.fn(),
      onReady: vi.fn(),
    };

    const { setupApp } = await import('./setupApp.js');
    const p1 = setupApp(options);
    const p2 = setupApp(options);

    resolveInit();
    const [cleanup1, cleanup2] = await Promise.all([p1, p2]);

    expect(options.runInit).toHaveBeenCalledTimes(1);
    expect(mocks.setupNotificationsHandlers).toHaveBeenCalledTimes(1);
    expect(mocks.setupContacts).toHaveBeenCalledTimes(1);
    expect(cleanup1).toBe(cleanup2);
  });

  it('drains pre-init cleanup immediately when runInit returns false', async () => {
    const notificationsCleanup = vi.fn();
    const contactsCleanup = vi.fn();

    mocks.setupNotificationsHandlers.mockResolvedValue(notificationsCleanup);
    mocks.setupContacts.mockResolvedValue(contactsCleanup);

    const options = {
      runInit: vi.fn(async () => false),
      bindCallUI: vi.fn(),
      setupMainAppBusListeners: vi.fn(),
      startListeningForSavedRooms: vi.fn(async () => {}),
      renderContactsList: vi.fn(async () => {}),
      autoInitMsgSessionIfNeeded: vi.fn(async () => {}),
      registerServiceWorkerNavigation: vi.fn(),
      autoJoinFromUrl: vi.fn(async () => true),
      onInitFailed: vi.fn(),
      onReady: vi.fn(),
    };

    const { setupApp } = await import('./setupApp.js');
    await setupApp(options);

    expect(options.onInitFailed).toHaveBeenCalledTimes(1);
    expect(notificationsCleanup).toHaveBeenCalledTimes(1);
    expect(contactsCleanup).toHaveBeenCalledTimes(1);
    expect(options.bindCallUI).not.toHaveBeenCalled();
    expect(options.setupMainAppBusListeners).not.toHaveBeenCalled();
  });

  it('allows retry after a failed initialization', async () => {
    const notificationsCleanup = vi.fn();
    const contactsCleanup = vi.fn();

    mocks.setupNotificationsHandlers.mockResolvedValue(notificationsCleanup);
    mocks.setupContacts.mockResolvedValue(contactsCleanup);

    const options = {
      runInit: vi
        .fn()
        .mockRejectedValueOnce(new Error('init failed'))
        .mockResolvedValueOnce(true),
      bindCallUI: vi.fn(),
      setupMainAppBusListeners: vi.fn(),
      startListeningForSavedRooms: vi.fn(async () => {}),
      renderContactsList: vi.fn(async () => {}),
      autoInitMsgSessionIfNeeded: vi.fn(async () => {}),
      registerServiceWorkerNavigation: vi.fn(),
      autoJoinFromUrl: vi.fn(async () => true),
      onInitFailed: vi.fn(),
      onReady: vi.fn(),
    };

    const { setupApp } = await import('./setupApp.js');

    await expect(setupApp(options)).rejects.toThrow('init failed');
    await expect(setupApp(options)).resolves.toEqual(expect.any(Function));

    expect(options.runInit).toHaveBeenCalledTimes(2);
    expect(mocks.setupNotificationsHandlers).toHaveBeenCalledTimes(2);
    expect(mocks.setupContacts).toHaveBeenCalledTimes(2);
    expect(options.bindCallUI).toHaveBeenCalledTimes(1);
  });
});
