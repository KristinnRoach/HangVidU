import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ListenerRegistry } from './listener-registry.js';

describe('ListenerRegistry', () => {
  let registry;

  beforeEach(() => {
    registry = new ListenerRegistry();
  });

  // ─── on() ────────────────────────────────────────────────────────────────

  describe('on()', () => {
    it('registers a listener and calls it when the event fires', () => {
      const cb = vi.fn();
      registry.on('foo', cb);
      registry.getListeners('foo').forEach((fn) => fn('payload'));
      expect(cb).toHaveBeenCalledWith('payload');
    });

    it('returns an unsubscribe function that removes the listener', () => {
      const cb = vi.fn();
      const unsub = registry.on('foo', cb);
      unsub();
      expect(registry.getListeners('foo')).toHaveLength(0);
    });

    it('registers multiple listeners for the same event', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      registry.on('foo', cb1);
      registry.on('foo', cb2);
      expect(registry.getListeners('foo')).toHaveLength(2);
    });

    it('registers listeners for different events independently', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      registry.on('foo', cb1);
      registry.on('bar', cb2);
      expect(registry.getListeners('foo')).toEqual([cb1]);
      expect(registry.getListeners('bar')).toEqual([cb2]);
    });

    it('throws TypeError when callback is not a function', () => {
      expect(() => registry.on('foo', 'not-a-function')).toThrow(TypeError);
      expect(() => registry.on('foo', null)).toThrow(TypeError);
      expect(() => registry.on('foo', 42)).toThrow(TypeError);
    });

    it('accepts symbol as event key', () => {
      const key = Symbol('sym');
      const cb = vi.fn();
      registry.on(key, cb);
      expect(registry.getListeners(key)).toContain(cb);
    });

    it('returns noop unsubscribe when signal is already aborted', () => {
      const controller = new AbortController();
      controller.abort();
      const cb = vi.fn();
      const unsub = registry.on('foo', cb, { signal: controller.signal });
      expect(registry.getListeners('foo')).toHaveLength(0);
      expect(() => unsub()).not.toThrow();
    });

    it('auto-unsubscribes listener when signal is aborted', () => {
      const controller = new AbortController();
      const cb = vi.fn();
      registry.on('foo', cb, { signal: controller.signal });
      expect(registry.listenerCount('foo')).toBe(1);
      controller.abort();
      expect(registry.listenerCount('foo')).toBe(0);
    });

    it('unsubscribe function removes abort listener from signal', () => {
      const controller = new AbortController();
      const cb = vi.fn();
      const removeEventListener = vi.spyOn(controller.signal, 'removeEventListener');
      const unsub = registry.on('foo', cb, { signal: controller.signal });
      unsub();
      expect(removeEventListener).toHaveBeenCalled();
    });

    it('unsubscribe after abort does not throw', () => {
      const controller = new AbortController();
      const cb = vi.fn();
      const unsub = registry.on('foo', cb, { signal: controller.signal });
      controller.abort();
      expect(() => unsub()).not.toThrow();
    });
  });

  // ─── once() ──────────────────────────────────────────────────────────────

  describe('once()', () => {
    it('calls the listener exactly once on first emission', () => {
      const cb = vi.fn();
      registry.once('foo', cb);
      const listeners = registry.getListeners('foo');
      listeners[0]('first');
      // Simulate second emission — listener should be gone
      registry.getListeners('foo').forEach((fn) => fn('second'));
      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb).toHaveBeenCalledWith('first');
    });

    it('removes the wrapper listener after first call', () => {
      const cb = vi.fn();
      registry.once('foo', cb);
      expect(registry.listenerCount('foo')).toBe(1);
      registry.getListeners('foo')[0]('data');
      expect(registry.listenerCount('foo')).toBe(0);
    });

    it('returns an unsubscribe function that can cancel before first call', () => {
      const cb = vi.fn();
      const unsub = registry.once('foo', cb);
      unsub();
      expect(registry.listenerCount('foo')).toBe(0);
      registry.getListeners('foo').forEach((fn) => fn('data'));
      expect(cb).not.toHaveBeenCalled();
    });

    it('accepts an already-aborted signal and registers nothing', () => {
      const controller = new AbortController();
      controller.abort();
      const cb = vi.fn();
      registry.once('foo', cb, { signal: controller.signal });
      expect(registry.listenerCount('foo')).toBe(0);
    });

    it('auto-removes when signal aborts before first emission', () => {
      const controller = new AbortController();
      const cb = vi.fn();
      registry.once('foo', cb, { signal: controller.signal });
      controller.abort();
      expect(registry.listenerCount('foo')).toBe(0);
      expect(cb).not.toHaveBeenCalled();
    });
  });

  // ─── off() ───────────────────────────────────────────────────────────────

  describe('off()', () => {
    it('removes a specific listener', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      registry.on('foo', cb1);
      registry.on('foo', cb2);
      registry.off('foo', cb1);
      expect(registry.getListeners('foo')).toEqual([cb2]);
    });

    it('cleans up the event key when last listener is removed', () => {
      const cb = vi.fn();
      registry.on('foo', cb);
      registry.off('foo', cb);
      expect(registry.listenerCount('foo')).toBe(0);
      // Internal map should not keep the key
      expect(registry._listeners.has('foo')).toBe(false);
    });

    it('is a no-op when the event has no listeners', () => {
      expect(() => registry.off('nonexistent', vi.fn())).not.toThrow();
    });

    it('is a no-op when removing a listener that was never added', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      registry.on('foo', cb1);
      expect(() => registry.off('foo', cb2)).not.toThrow();
      expect(registry.listenerCount('foo')).toBe(1);
    });
  });

  // ─── getListeners() ──────────────────────────────────────────────────────

  describe('getListeners()', () => {
    it('returns empty array when no listeners registered', () => {
      expect(registry.getListeners('foo')).toEqual([]);
    });

    it('returns a snapshot array, not the live Set', () => {
      const cb = vi.fn();
      registry.on('foo', cb);
      const snap = registry.getListeners('foo');
      registry.off('foo', cb);
      // snapshot still contains the old listener
      expect(snap).toContain(cb);
    });

    it('returns all registered listeners in insertion order', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      const cb3 = vi.fn();
      registry.on('foo', cb1);
      registry.on('foo', cb2);
      registry.on('foo', cb3);
      expect(registry.getListeners('foo')).toEqual([cb1, cb2, cb3]);
    });
  });

  // ─── removeAllListeners() ────────────────────────────────────────────────

  describe('removeAllListeners()', () => {
    it('removes all listeners for a specific event when called with one arg', () => {
      registry.on('foo', vi.fn());
      registry.on('foo', vi.fn());
      registry.on('bar', vi.fn());
      registry.removeAllListeners('foo');
      expect(registry.listenerCount('foo')).toBe(0);
      expect(registry.listenerCount('bar')).toBe(1);
    });

    it('removes all listeners for all events when called with no args', () => {
      registry.on('foo', vi.fn());
      registry.on('bar', vi.fn());
      registry.on('baz', vi.fn());
      registry.removeAllListeners();
      expect(registry.listenerCount('foo')).toBe(0);
      expect(registry.listenerCount('bar')).toBe(0);
      expect(registry.listenerCount('baz')).toBe(0);
    });

    it('is a no-op for unknown event name', () => {
      registry.on('foo', vi.fn());
      expect(() => registry.removeAllListeners('nonexistent')).not.toThrow();
      expect(registry.listenerCount('foo')).toBe(1);
    });

    it('works with symbol event keys', () => {
      const key = Symbol('sym');
      registry.on(key, vi.fn());
      registry.removeAllListeners(key);
      expect(registry.listenerCount(key)).toBe(0);
    });
  });

  // ─── listenerCount() ─────────────────────────────────────────────────────

  describe('listenerCount()', () => {
    it('returns 0 for unknown event', () => {
      expect(registry.listenerCount('unknown')).toBe(0);
    });

    it('returns the correct count after adding listeners', () => {
      registry.on('foo', vi.fn());
      registry.on('foo', vi.fn());
      expect(registry.listenerCount('foo')).toBe(2);
    });

    it('decrements after off()', () => {
      const cb = vi.fn();
      registry.on('foo', cb);
      registry.off('foo', cb);
      expect(registry.listenerCount('foo')).toBe(0);
    });
  });
});