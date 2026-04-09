import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Emitter } from './emitter.js';
import { ListenerRegistry } from './listener-registry.js';

/**
 * Helper: create a registry pre-populated with handlers for a given event.
 */
function makeRegistryWith(event, ...handlers) {
  const registry = new ListenerRegistry();
  handlers.forEach((h) => registry.on(event, h));
  return registry;
}

describe('Emitter', () => {
  // ─── constructor ─────────────────────────────────────────────────────────

  describe('constructor', () => {
    it('throws TypeError when registry is missing', () => {
      expect(() => new Emitter(null)).toThrow(TypeError);
      expect(() => new Emitter(undefined)).toThrow(TypeError);
    });

    it('throws TypeError when registry lacks getListeners', () => {
      expect(() => new Emitter({})).toThrow(TypeError);
      expect(() => new Emitter({ getListeners: 'not-a-fn' })).toThrow(TypeError);
    });

    it('throws TypeError when onListenerError option is not a function', () => {
      const registry = new ListenerRegistry();
      expect(() => new Emitter(registry, { onListenerError: 'bad' })).toThrow(TypeError);
    });

    it('constructs without error with a valid registry', () => {
      const registry = new ListenerRegistry();
      expect(() => new Emitter(registry)).not.toThrow();
    });

    it('constructs with a custom onListenerError hook', () => {
      const registry = new ListenerRegistry();
      const hook = vi.fn();
      expect(() => new Emitter(registry, { onListenerError: hook })).not.toThrow();
    });
  });

  // ─── emit() ──────────────────────────────────────────────────────────────

  describe('emit()', () => {
    it('calls all registered listeners with the payload', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      const registry = makeRegistryWith('evt', cb1, cb2);
      const emitter = new Emitter(registry);
      emitter.emit('evt', { value: 42 });
      expect(cb1).toHaveBeenCalledWith({ value: 42 });
      expect(cb2).toHaveBeenCalledWith({ value: 42 });
    });

    it('does nothing when no listeners are registered', () => {
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry);
      expect(() => emitter.emit('unknown', {})).not.toThrow();
    });

    it('catches synchronous listener errors and does not rethrow', () => {
      const throwing = vi.fn(() => { throw new Error('sync error'); });
      const safe = vi.fn();
      const registry = makeRegistryWith('evt', throwing, safe);
      const emitter = new Emitter(registry);
      expect(() => emitter.emit('evt', {})).not.toThrow();
      expect(safe).toHaveBeenCalled();
    });

    it('routes sync errors to onListenerError hook when provided', () => {
      const hook = vi.fn();
      const throwing = () => { throw new Error('boom'); };
      const registry = makeRegistryWith('evt', throwing);
      const emitter = new Emitter(registry, { onListenerError: hook });
      emitter.emit('evt', {});
      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ eventName: 'evt', phase: 'emit' }),
      );
    });

    it('falls back to console.error for sync errors when no hook provided', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const throwing = () => { throw new Error('oops'); };
      const registry = makeRegistryWith('evt', throwing);
      const emitter = new Emitter(registry);
      emitter.emit('evt', {});
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('catches async listener rejections without unhandled rejection', async () => {
      const hook = vi.fn();
      const asyncReject = vi.fn(() => Promise.reject(new Error('async fail')));
      const registry = makeRegistryWith('evt', asyncReject);
      const emitter = new Emitter(registry, { onListenerError: hook });
      emitter.emit('evt', {});
      // Allow microtask queue to flush
      await Promise.resolve();
      await Promise.resolve();
      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ eventName: 'evt', phase: 'emit' }),
      );
    });

    it('continues calling remaining listeners even after one throws', () => {
      const cb1 = vi.fn(() => { throw new Error('fail'); });
      const cb2 = vi.fn();
      const registry = makeRegistryWith('evt', cb1, cb2);
      const emitter = new Emitter(registry);
      emitter.emit('evt', {});
      expect(cb2).toHaveBeenCalled();
    });

    it('works with symbol event keys', () => {
      const key = Symbol('sym');
      const cb = vi.fn();
      const registry = makeRegistryWith(key, cb);
      const emitter = new Emitter(registry);
      emitter.emit(key, 'data');
      expect(cb).toHaveBeenCalledWith('data');
    });
  });

  // ─── emitAsync() ─────────────────────────────────────────────────────────

  describe('emitAsync()', () => {
    it('awaits all listeners and resolves when all succeed', async () => {
      const cb1 = vi.fn().mockResolvedValue('a');
      const cb2 = vi.fn().mockResolvedValue('b');
      const registry = makeRegistryWith('evt', cb1, cb2);
      const emitter = new Emitter(registry);
      await expect(emitter.emitAsync('evt', {})).resolves.toBeUndefined();
      expect(cb1).toHaveBeenCalled();
      expect(cb2).toHaveBeenCalled();
    });

    it('returns undefined by default (not returnSettled)', async () => {
      const registry = makeRegistryWith('evt', vi.fn());
      const emitter = new Emitter(registry);
      const result = await emitter.emitAsync('evt', {});
      expect(result).toBeUndefined();
    });

    it('returns empty array when returnSettled=true and no listeners', async () => {
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry);
      const result = await emitter.emitAsync('evt', {}, { returnSettled: true });
      expect(result).toEqual([]);
    });

    it('returns PromiseSettledResult[] when returnSettled=true', async () => {
      const registry = makeRegistryWith('evt', vi.fn().mockResolvedValue(42));
      const emitter = new Emitter(registry);
      const results = await emitter.emitAsync('evt', {}, { returnSettled: true });
      expect(results).toEqual([{ status: 'fulfilled', value: 42 }]);
    });

    it('reports listener errors and resolves (does not throw) by default', async () => {
      const hook = vi.fn();
      const throwing = vi.fn().mockRejectedValue(new Error('fail'));
      const registry = makeRegistryWith('evt', throwing);
      const emitter = new Emitter(registry, { onListenerError: hook });
      await expect(emitter.emitAsync('evt', {})).resolves.toBeUndefined();
      expect(hook).toHaveBeenCalled();
    });

    it('throws AggregateError when throwOnError=true and a listener rejects', async () => {
      const err = new Error('listener blew up');
      const registry = makeRegistryWith('evt', vi.fn().mockRejectedValue(err));
      const emitter = new Emitter(registry);
      await expect(
        emitter.emitAsync('evt', {}, { throwOnError: true }),
      ).rejects.toBeInstanceOf(AggregateError);
    });

    it('AggregateError message includes listener count', async () => {
      const registry = makeRegistryWith(
        'evt',
        vi.fn().mockRejectedValue(new Error('e1')),
        vi.fn().mockRejectedValue(new Error('e2')),
      );
      const emitter = new Emitter(registry);
      let thrown;
      try {
        await emitter.emitAsync('evt', {}, { throwOnError: true });
      } catch (e) {
        thrown = e;
      }
      expect(thrown).toBeInstanceOf(AggregateError);
      expect(thrown.message).toContain('2 listener(s)');
    });

    it('does not throw AggregateError when throwOnError=true but no listener fails', async () => {
      const registry = makeRegistryWith('evt', vi.fn().mockResolvedValue('ok'));
      const emitter = new Emitter(registry);
      await expect(
        emitter.emitAsync('evt', {}, { throwOnError: true }),
      ).resolves.toBeUndefined();
    });

    it('runs all listeners concurrently (not sequentially)', async () => {
      const order = [];
      const slow = vi.fn(
        () => new Promise((res) => setTimeout(() => { order.push('slow'); res(); }, 10)),
      );
      const fast = vi.fn(() => { order.push('fast'); });
      const registry = makeRegistryWith('evt', slow, fast);
      const emitter = new Emitter(registry);
      await emitter.emitAsync('evt', {});
      // fast should complete while slow is still pending
      expect(order[0]).toBe('fast');
      expect(order[1]).toBe('slow');
    });

    it('catches synchronous throws inside handlers', async () => {
      const hook = vi.fn();
      const syncThrow = vi.fn(() => { throw new Error('sync in async'); });
      const registry = makeRegistryWith('evt', syncThrow);
      const emitter = new Emitter(registry, { onListenerError: hook });
      await expect(emitter.emitAsync('evt', {})).resolves.toBeUndefined();
      expect(hook).toHaveBeenCalled();
    });

    it('passes payload to all listeners', async () => {
      const payload = { id: 'test-id' };
      const cb = vi.fn();
      const registry = makeRegistryWith('evt', cb);
      const emitter = new Emitter(registry);
      await emitter.emitAsync('evt', payload);
      expect(cb).toHaveBeenCalledWith(payload);
    });
  });

  // ─── emitAsyncSequential() ───────────────────────────────────────────────

  describe('emitAsyncSequential()', () => {
    it('processes events in strict order, awaiting each', async () => {
      const order = [];
      const registry = new ListenerRegistry();

      registry.on('a', vi.fn(async () => { order.push('a'); }));
      registry.on('b', vi.fn(async () => { order.push('b'); }));
      registry.on('c', vi.fn(async () => { order.push('c'); }));

      const emitter = new Emitter(registry);
      await emitter.emitAsyncSequential([
        ['a', {}],
        ['b', {}],
        ['c', {}],
      ]);
      expect(order).toEqual(['a', 'b', 'c']);
    });

    it('returns undefined by default', async () => {
      const registry = makeRegistryWith('evt', vi.fn());
      const emitter = new Emitter(registry);
      const result = await emitter.emitAsyncSequential([['evt', {}]]);
      expect(result).toBeUndefined();
    });

    it('returns settled results per event when returnSettled=true', async () => {
      const registry = new ListenerRegistry();
      registry.on('x', vi.fn().mockResolvedValue(1));
      registry.on('y', vi.fn().mockResolvedValue(2));
      const emitter = new Emitter(registry);
      const settled = await emitter.emitAsyncSequential(
        [['x', {}], ['y', {}]],
        { returnSettled: true },
      );
      expect(settled).toHaveLength(2);
      expect(settled[0][0]).toBe('x');
      expect(settled[1][0]).toBe('y');
      expect(settled[0][1]).toEqual([{ status: 'fulfilled', value: 1 }]);
    });

    it('resolves with empty array for returnSettled when events array is empty', async () => {
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry);
      const result = await emitter.emitAsyncSequential([], { returnSettled: true });
      expect(result).toEqual([]);
    });

    it('second event does not start until first event listeners complete', async () => {
      const log = [];
      const registry = new ListenerRegistry();
      registry.on(
        'first',
        () => new Promise((res) => setTimeout(() => { log.push('first done'); res(); }, 20)),
      );
      registry.on('second', () => { log.push('second start'); });

      const emitter = new Emitter(registry);
      await emitter.emitAsyncSequential([['first', {}], ['second', {}]]);
      expect(log).toEqual(['first done', 'second start']);
    });

    it('propagates throwOnError from options to individual emitAsync calls', async () => {
      const registry = new ListenerRegistry();
      registry.on('evt', vi.fn().mockRejectedValue(new Error('boom')));
      const emitter = new Emitter(registry);
      await expect(
        emitter.emitAsyncSequential([['evt', {}]], { throwOnError: true }),
      ).rejects.toBeInstanceOf(AggregateError);
    });
  });

  // ─── _reportListenerError() ──────────────────────────────────────────────

  describe('_reportListenerError()', () => {
    it('calls onListenerError hook with full context', () => {
      const hook = vi.fn();
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry, { onListenerError: hook });
      const err = new Error('test');
      emitter._reportListenerError('myEvent', err, 'emit');
      expect(hook).toHaveBeenCalledWith({
        eventName: 'myEvent',
        error: err,
        phase: 'emit',
      });
    });

    it('uses console.error with emit-phase message when no hook', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry);
      emitter._reportListenerError('evt', new Error('e'), 'emit');
      expect(consoleSpy.mock.calls[0][0]).toMatch(/listener for "evt"/);
      consoleSpy.mockRestore();
    });

    it('uses console.error with emitAsync-phase message when no hook', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry);
      emitter._reportListenerError('evt', new Error('e'), 'emitAsync');
      expect(consoleSpy.mock.calls[0][0]).toMatch(/Async error in "evt"/);
      consoleSpy.mockRestore();
    });

    it('handles symbol event keys in error messages', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const key = Symbol('sym');
      const registry = new ListenerRegistry();
      const emitter = new Emitter(registry);
      expect(() => emitter._reportListenerError(key, new Error('e'), 'emit')).not.toThrow();
      consoleSpy.mockRestore();
    });
  });
});