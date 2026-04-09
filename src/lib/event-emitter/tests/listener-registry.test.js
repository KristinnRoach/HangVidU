import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ListenerRegistry } from '../listener-registry.js';

describe('ListenerRegistry', () => {
  let registry;

  beforeEach(() => {
    registry = new ListenerRegistry();
  });

  describe('on()', () => {
    it('registers listeners and supports unsubscribe', () => {
      const cb = vi.fn();
      const unsub = registry.on('foo', cb);

      registry.getListeners('foo')[0]('payload');
      expect(cb).toHaveBeenCalledWith('payload');

      unsub();
      expect(registry.listenerCount('foo')).toBe(0);
    });

    it('throws for non-function callbacks', () => {
      expect(() => registry.on('foo', null)).toThrow(TypeError);
    });

    it('supports symbol keys', () => {
      const key = Symbol('evt');
      const cb = vi.fn();
      registry.on(key, cb);
      expect(registry.getListeners(key)).toEqual([cb]);
    });

    it('supports AbortSignal cleanup', () => {
      const controller = new AbortController();
      const cb = vi.fn();
      const removeEventListener = vi.spyOn(controller.signal, 'removeEventListener');

      const unsub = registry.on('foo', cb, { signal: controller.signal });
      expect(registry.listenerCount('foo')).toBe(1);

      unsub();
      expect(registry.listenerCount('foo')).toBe(0);
      expect(removeEventListener).toHaveBeenCalled();
    });

    it('returns noop unsubscribe when signal is already aborted', () => {
      const controller = new AbortController();
      controller.abort();
      const unsub = registry.on('foo', vi.fn(), { signal: controller.signal });
      expect(registry.listenerCount('foo')).toBe(0);
      expect(() => unsub()).not.toThrow();
    });
  });

  describe('once()', () => {
    it('fires once and then removes itself', () => {
      const cb = vi.fn();
      registry.once('foo', cb);

      const [listener] = registry.getListeners('foo');
      listener('first');
      registry.getListeners('foo').forEach((fn) => fn('second'));

      expect(cb).toHaveBeenCalledTimes(1);
      expect(registry.listenerCount('foo')).toBe(0);
    });

    it('throws for non-function callbacks', () => {
      expect(() => registry.once('foo', null)).toThrow(TypeError);
    });
  });

  describe('off()', () => {
    it('removes only the targeted listener', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      registry.on('foo', cb1);
      registry.on('foo', cb2);

      registry.off('foo', cb1);
      expect(registry.getListeners('foo')).toEqual([cb2]);
    });

    it('detaches AbortSignal listener when removed via off()', () => {
      const controller = new AbortController();
      const removeEventListener = vi.spyOn(controller.signal, 'removeEventListener');
      const cb = vi.fn();

      registry.on('foo', cb, { signal: controller.signal });
      registry.off('foo', cb);

      expect(removeEventListener).toHaveBeenCalled();
    });
  });

  describe('getListeners()', () => {
    it('returns a snapshot, not a live collection', () => {
      const cb = vi.fn();
      registry.on('foo', cb);
      const snapshot = registry.getListeners('foo');

      registry.off('foo', cb);
      expect(snapshot).toEqual([cb]);
      expect(registry.getListeners('foo')).toEqual([]);
    });
  });

  describe('removeAllListeners()', () => {
    it('removes listeners for one event or all events', () => {
      registry.on('foo', vi.fn());
      registry.on('bar', vi.fn());

      registry.removeAllListeners('foo');
      expect(registry.listenerCount('foo')).toBe(0);
      expect(registry.listenerCount('bar')).toBe(1);

      registry.removeAllListeners();
      expect(registry.listenerCount('bar')).toBe(0);
    });

    it('detaches AbortSignal listeners when clearing listeners', () => {
      const a = new AbortController();
      const b = new AbortController();
      const aRemove = vi.spyOn(a.signal, 'removeEventListener');
      const bRemove = vi.spyOn(b.signal, 'removeEventListener');

      registry.on('foo', vi.fn(), { signal: a.signal });
      registry.on('bar', vi.fn(), { signal: b.signal });

      registry.removeAllListeners('foo');
      expect(aRemove).toHaveBeenCalled();

      registry.removeAllListeners();
      expect(bRemove).toHaveBeenCalled();
    });
  });

  describe('listenerCount()', () => {
    it('returns 0 for unknown events', () => {
      expect(registry.listenerCount('unknown')).toBe(0);
    });
  });
});
