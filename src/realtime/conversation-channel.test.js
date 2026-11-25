import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import { createConversationChannel } from './conversation-channel.js';

class FakeWebSocket {
  static instances = [];
  constructor(url, protocols) {
    this.url = url;
    this.protocols = protocols;
    this.listeners = new Map();
    FakeWebSocket.instances.push(this);
  }
  addEventListener(type, fn) {
    const set = this.listeners.get(type) ?? new Set();
    set.add(fn);
    this.listeners.set(type, set);
  }
  close() {
    for (const fn of this.listeners.get('close') ?? []) fn({});
  }
}

describe('createConversationChannel offline pause', () => {
  let online = true;

  beforeEach(() => {
    vi.useFakeTimers();
    FakeWebSocket.instances = [];
    online = true;
    vi.stubGlobal('WebSocket', FakeWebSocket);
    vi.stubGlobal('navigator', {
      get onLine() {
        return online;
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('pauses reconnect timers while offline and resumes immediately on online', async () => {
    const getToken = vi.fn(async () => 'tok');
    const channel = createConversationChannel({
      baseUrl: 'https://api.example.com',
      conversationId: 'c1',
      getToken,
    });

    await vi.advanceTimersByTimeAsync(0);
    expect(FakeWebSocket.instances).toHaveLength(1);

    // Go offline and drop the socket: no reconnect timer should fire.
    online = false;
    FakeWebSocket.instances[0].close();
    await vi.advanceTimersByTimeAsync(30_000);
    expect(FakeWebSocket.instances).toHaveLength(1);
    expect(getToken).toHaveBeenCalledTimes(1);

    // Returning to foreground while still offline must not attempt to connect.
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(0);
    expect(FakeWebSocket.instances).toHaveLength(1);

    // Coming back online reconnects immediately.
    online = true;
    window.dispatchEvent(new Event('online'));
    await vi.advanceTimersByTimeAsync(0);
    expect(FakeWebSocket.instances).toHaveLength(2);

    channel.close();
  });
});
