import { describe, it, expect, vi, beforeEach } from 'vite-plus/test';
import { EventEmitter } from '../event-emitter.js';

describe('EventEmitter facade', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('supports on/emit/off flow', () => {
    const cb = vi.fn();
    emitter.on('evt', cb);
    emitter.emit('evt', 'one');
    expect(cb).toHaveBeenCalledWith('one');

    emitter.off('evt', cb);
    emitter.emit('evt', 'two');
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('supports once and returned unsubscribe', () => {
    const cb = vi.fn();
    const unsub = emitter.once('evt', cb);
    unsub();
    emitter.emit('evt', 'x');
    expect(cb).not.toHaveBeenCalled();

    emitter.once('evt', cb);
    emitter.emit('evt', 'a');
    emitter.emit('evt', 'b');
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('supports emitAsync and emitAsyncSequential options passthrough', async () => {
    emitter.on('a', vi.fn().mockResolvedValue(1));
    emitter.on('b', vi.fn().mockResolvedValue(2));

    await expect(
      emitter.emitAsync('a', {}, { returnSettled: true }),
    ).resolves.toEqual([{ status: 'fulfilled', value: 1 }]);

    await expect(
      emitter.emitAsyncSequential(
        [
          ['a', {}],
          ['b', {}],
        ],
        { returnSettled: true },
      ),
    ).resolves.toEqual([
      ['a', [{ status: 'fulfilled', value: 1 }]],
      ['b', [{ status: 'fulfilled', value: 2 }]],
    ]);
  });

  it('removeAllListeners clears all when called without args', () => {
    const a = vi.fn();
    const b = vi.fn();
    emitter.on('a', a);
    emitter.on('b', b);

    emitter.removeAllListeners();
    emitter.emit('a');
    emitter.emit('b');

    expect(a).not.toHaveBeenCalled();
    expect(b).not.toHaveBeenCalled();
  });

  it('removeAllListeners(event) clears only one event', () => {
    const a = vi.fn();
    const b = vi.fn();
    emitter.on('a', a);
    emitter.on('b', b);

    emitter.removeAllListeners('a');
    emitter.emit('a');
    emitter.emit('b');

    expect(a).not.toHaveBeenCalled();
    expect(b).toHaveBeenCalledTimes(1);
  });

  it('forwards onListenerError constructor option', () => {
    const hook = vi.fn();
    const ee = new EventEmitter({ onListenerError: hook });

    ee.on('evt', () => {
      throw new Error('oops');
    });
    ee.emit('evt', {});

    expect(hook).toHaveBeenCalledWith(
      expect.objectContaining({ eventName: 'evt', phase: 'emit' }),
    );
  });

  it('supports symbol keys end-to-end', async () => {
    const key = Symbol('evt');
    const cb = vi.fn().mockResolvedValue(undefined);

    emitter.on(key, cb);
    emitter.emit(key, 'x');
    await emitter.emitAsync(key, 'y');

    expect(cb).toHaveBeenNthCalledWith(1, 'x');
    expect(cb).toHaveBeenNthCalledWith(2, 'y');
    expect(emitter.listenerCount(key)).toBe(1);
  });
});
