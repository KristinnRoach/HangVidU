import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventEmitter } from './event-emitter.js';

describe('EventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  // ─── on / off / emit ─────────────────────────────────────────────────────

  describe('on() + emit()', () => {
    it('delivers payload to a subscribed listener', () => {
      const cb = vi.fn();
      emitter.on('event', cb);
      emitter.emit('event', 'hello');
      expect(cb).toHaveBeenCalledWith('hello');
    });

    it('returns an unsubscribe function that stops delivery', () => {
      const cb = vi.fn();
      const unsub = emitter.on('event', cb);
      unsub();
      emitter.emit('event', 'after-unsub');
      expect(cb).not.toHaveBeenCalled();
    });

    it('accepts AbortSignal for auto-cleanup', () => {
      const controller = new AbortController();
      const cb = vi.fn();
      emitter.on('event', cb, { signal: controller.signal });
      controller.abort();
      emitter.emit('event', 'data');
      expect(cb).not.toHaveBeenCalled();
    });
  });

  describe('off()', () => {
    it('removes the specific listener', () => {
      const cb = vi.fn();
      emitter.on('event', cb);
      emitter.off('event', cb);
      emitter.emit('event', 'data');
      expect(cb).not.toHaveBeenCalled();
    });
  });

  // ─── once() ──────────────────────────────────────────────────────────────

  describe('once()', () => {
    it('fires callback exactly once', () => {
      const cb = vi.fn();
      emitter.once('event', cb);
      emitter.emit('event', 1);
      emitter.emit('event', 2);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('returns an unsubscribe function', () => {
      const cb = vi.fn();
      const unsub = emitter.once('event', cb);
      unsub();
      emitter.emit('event', 'data');
      expect(cb).not.toHaveBeenCalled();
    });
  });

  // ─── emitAsync() ─────────────────────────────────────────────────────────

  describe('emitAsync()', () => {
    it('awaits async listener and resolves', async () => {
      const cb = vi.fn().mockResolvedValue('done');
      emitter.on('evt', cb);
      await expect(emitter.emitAsync('evt', {})).resolves.toBeUndefined();
      expect(cb).toHaveBeenCalled();
    });

    it('returns settled results when returnSettled=true', async () => {
      emitter.on('evt', vi.fn().mockResolvedValue(99));
      const results = await emitter.emitAsync('evt', {}, { returnSettled: true });
      expect(results).toEqual([{ status: 'fulfilled', value: 99 }]);
    });

    it('throws AggregateError when throwOnError=true and listener rejects', async () => {
      emitter.on('evt', vi.fn().mockRejectedValue(new Error('fail')));
      await expect(
        emitter.emitAsync('evt', {}, { throwOnError: true }),
      ).rejects.toBeInstanceOf(AggregateError);
    });
  });

  // ─── emitAsyncSequential() ───────────────────────────────────────────────

  describe('emitAsyncSequential()', () => {
    it('processes events in order and resolves', async () => {
      const order = [];
      emitter.on('a', async () => { order.push('a'); });
      emitter.on('b', async () => { order.push('b'); });
      await emitter.emitAsyncSequential([['a', {}], ['b', {}]]);
      expect(order).toEqual(['a', 'b']);
    });

    it('returns undefined by default', async () => {
      emitter.on('evt', vi.fn());
      const result = await emitter.emitAsyncSequential([['evt', {}]]);
      expect(result).toBeUndefined();
    });

    it('returns settled results per event when returnSettled=true', async () => {
      emitter.on('x', vi.fn().mockResolvedValue(1));
      const settled = await emitter.emitAsyncSequential([['x', {}]], { returnSettled: true });
      expect(settled[0][0]).toBe('x');
      expect(settled[0][1]).toEqual([{ status: 'fulfilled', value: 1 }]);
    });
  });

  // ─── removeAllListeners() ────────────────────────────────────────────────

  describe('removeAllListeners()', () => {
    it('removes all listeners when called without argument', () => {
      emitter.on('a', vi.fn());
      emitter.on('b', vi.fn());
      emitter.removeAllListeners();
      expect(emitter.listenerCount('a')).toBe(0);
      expect(emitter.listenerCount('b')).toBe(0);
    });

    it('removes listeners for specific event when called with argument', () => {
      emitter.on('a', vi.fn());
      emitter.on('b', vi.fn());
      emitter.removeAllListeners('a');
      expect(emitter.listenerCount('a')).toBe(0);
      expect(emitter.listenerCount('b')).toBe(1);
    });
  });

  // ─── listenerCount() ─────────────────────────────────────────────────────

  describe('listenerCount()', () => {
    it('returns 0 for unknown events', () => {
      expect(emitter.listenerCount('none')).toBe(0);
    });

    it('returns the correct count', () => {
      emitter.on('evt', vi.fn());
      emitter.on('evt', vi.fn());
      expect(emitter.listenerCount('evt')).toBe(2);
    });
  });

  // ─── options passthrough ─────────────────────────────────────────────────

  describe('constructor options', () => {
    it('forwards onListenerError option to Emitter', () => {
      const hook = vi.fn();
      const ee = new EventEmitter({ onListenerError: hook });
      ee.on('evt', () => { throw new Error('oops'); });
      ee.emit('evt', {});
      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ phase: 'emit' }),
      );
    });

    it('throws TypeError for non-function onListenerError', () => {
      expect(() => new EventEmitter({ onListenerError: 'bad' })).toThrow(TypeError);
    });
  });

  // ─── symbol keys ─────────────────────────────────────────────────────────

  describe('symbol event keys', () => {
    it('works end-to-end with symbol keys', () => {
      const KEY = Symbol('test-key');
      const cb = vi.fn();
      emitter.on(KEY, cb);
      emitter.emit(KEY, 'sym-payload');
      expect(cb).toHaveBeenCalledWith('sym-payload');
      expect(emitter.listenerCount(KEY)).toBe(1);
      emitter.off(KEY, cb);
      expect(emitter.listenerCount(KEY)).toBe(0);
    });
  });
});