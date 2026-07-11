import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

const mocks = vi.hoisted(() => {
  const handlers = new Map();
  const register = (eventName, handler, options = {}) => {
    handlers.set(eventName, handler);
    const unsubscribe = () => handlers.delete(eventName);
    if (options.signal) {
      if (options.signal.aborted) unsubscribe();
      else
        options.signal.addEventListener('abort', unsubscribe, { once: true });
    }
    return unsubscribe;
  };
  return {
    handlers,
    subscribe: vi.fn(register),
    initAuth: vi.fn(() => Promise.resolve()),
  };
});

vi.mock('../../shared/events/index.js', () => ({
  subscribe: mocks.subscribe,
}));
vi.mock('../auth-setup.js', () => ({
  initAuth: mocks.initAuth,
}));

describe('auth setup', () => {
  let localStorageData;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mocks.handlers.clear();
    localStorageData = new Map();
    vi.stubGlobal('localStorage', {
      get length() {
        return localStorageData.size;
      },
      key: (index) => Array.from(localStorageData.keys())[index] ?? null,
      getItem: (key) =>
        localStorageData.has(String(key))
          ? localStorageData.get(String(key))
          : null,
      setItem: (key, value) => localStorageData.set(String(key), String(value)),
      removeItem: (key) => localStorageData.delete(String(key)),
      clear: () => localStorageData.clear(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('registers the logout listener before calling initAuth', async () => {
    const { setup } = await import('../setup.js');
    await setup();

    expect(mocks.subscribe).toHaveBeenCalledWith(
      'evt:auth:session:logged-out',
      expect.any(Function),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
    expect(mocks.initAuth).toHaveBeenCalled();

    const subscribeOrder = mocks.subscribe.mock.invocationCallOrder[0];
    const initAuthOrder = mocks.initAuth.mock.invocationCallOrder[0];
    expect(subscribeOrder).toBeLessThan(initAuthOrder);
  });

  it('clears user-scoped localStorage on logout, preserving locale and debug: keys', async () => {
    globalThis.localStorage.setItem('locale', 'is');
    globalThis.localStorage.setItem('debug:foo', '1');
    globalThis.localStorage.setItem('volatileKey', 'drop-me');

    const { setup } = await import('../setup.js');
    await setup();

    await mocks.handlers.get('evt:auth:session:logged-out')();

    expect(globalThis.localStorage.getItem('locale')).toBe('is');
    expect(globalThis.localStorage.getItem('debug:foo')).toBe('1');
    expect(globalThis.localStorage.getItem('volatileKey')).toBeNull();
  });

  it('is idempotent and aborts the subscription on teardown', async () => {
    const { setup } = await import('../setup.js');
    const teardown = await setup();

    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(true);
    expect(await setup()).toBe(teardown);

    teardown();
    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(false);
    expect(mocks.initAuth).toHaveBeenCalledTimes(1);
  });

  it('aborts the logout listener when initAuth fails', async () => {
    const error = new Error('auth failed');
    mocks.initAuth.mockRejectedValueOnce(error);

    const { setup } = await import('../setup.js');

    await expect(setup()).rejects.toBe(error);
    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(false);

    mocks.initAuth.mockResolvedValueOnce(undefined);
    await setup();
    expect(mocks.handlers.has('evt:auth:session:logged-out')).toBe(true);
    expect(mocks.initAuth).toHaveBeenCalledTimes(2);
  });
});
