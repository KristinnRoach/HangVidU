import { describe, it, expect, vi } from 'vite-plus/test';
import { Emitter } from '../emitter.js';
import { ListenerRegistry } from '../listener-registry.js';

function makeRegistryWith(event, ...handlers) {
  const registry = new ListenerRegistry();
  handlers.forEach((h) => registry.on(event, h));
  return registry;
}

describe('Emitter', () => {
  describe('constructor', () => {
    it('validates registry and error hook', () => {
      expect(() => new Emitter(null)).toThrow(TypeError);
      expect(() => new Emitter({})).toThrow(TypeError);
      expect(
        () => new Emitter(new ListenerRegistry(), { onListenerError: 'bad' }),
      ).toThrow(TypeError);
      expect(() => new Emitter(new ListenerRegistry())).not.toThrow();
    });
  });

  describe('emit()', () => {
    it('calls listeners with payload', () => {
      const cb1 = vi.fn();
      const cb2 = vi.fn();
      const emitter = new Emitter(makeRegistryWith('evt', cb1, cb2));

      emitter.emit('evt', { x: 1 });
      expect(cb1).toHaveBeenCalledWith({ x: 1 });
      expect(cb2).toHaveBeenCalledWith({ x: 1 });
    });

    it('continues after sync throw and reports via hook', () => {
      const hook = vi.fn();
      const fail = () => {
        throw new Error('sync fail');
      };
      const ok = vi.fn();
      const emitter = new Emitter(makeRegistryWith('evt', fail, ok), {
        onListenerError: hook,
      });

      emitter.emit('evt', {});
      expect(ok).toHaveBeenCalled();
      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ eventName: 'evt', phase: 'emit' }),
      );
    });

    it('captures async rejections in fire-and-forget mode', async () => {
      const hook = vi.fn();
      const rejectAsync = () => Promise.reject(new Error('async fail'));
      const emitter = new Emitter(makeRegistryWith('evt', rejectAsync), {
        onListenerError: hook,
      });

      emitter.emit('evt', {});
      await Promise.resolve();
      await Promise.resolve();

      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ eventName: 'evt', phase: 'emit' }),
      );
    });

    it('handles thenables without a .catch method', async () => {
      const hook = vi.fn();
      const thenableReject = {
        then(_resolve, reject) {
          reject(new Error('thenable fail'));
        },
      };
      const listener = () => thenableReject;
      const emitter = new Emitter(makeRegistryWith('evt', listener), {
        onListenerError: hook,
      });

      emitter.emit('evt', {});
      await Promise.resolve();
      await Promise.resolve();

      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ eventName: 'evt', phase: 'emit' }),
      );
    });
  });

  describe('emitAsync()', () => {
    it('awaits listeners and returns undefined by default', async () => {
      const cb = vi.fn().mockResolvedValue('ok');
      const emitter = new Emitter(makeRegistryWith('evt', cb));

      await expect(
        emitter.emitAsync('evt', { id: 1 }),
      ).resolves.toBeUndefined();
      expect(cb).toHaveBeenCalledWith({ id: 1 });
    });

    it('returns settled results when requested', async () => {
      const emitter = new Emitter(
        makeRegistryWith('evt', vi.fn().mockResolvedValue(42)),
      );
      await expect(
        emitter.emitAsync('evt', {}, { returnSettled: true }),
      ).resolves.toEqual([{ status: 'fulfilled', value: 42 }]);
      await expect(
        emitter.emitAsync('none', {}, { returnSettled: true }),
      ).resolves.toEqual([]);
    });

    it('reports failures and throws AggregateError when throwOnError=true', async () => {
      const hook = vi.fn();
      const emitter = new Emitter(
        makeRegistryWith('evt', vi.fn().mockRejectedValue(new Error('bad'))),
        { onListenerError: hook },
      );

      await expect(emitter.emitAsync('evt', {})).resolves.toBeUndefined();
      expect(hook).toHaveBeenCalledWith(
        expect.objectContaining({ eventName: 'evt', phase: 'emitAsync' }),
      );

      await expect(
        emitter.emitAsync('evt', {}, { throwOnError: true }),
      ).rejects.toBeInstanceOf(AggregateError);
    });

    it('runs listeners concurrently', async () => {
      const order = [];
      const slow = () =>
        new Promise((res) =>
          setTimeout(() => {
            order.push('slow');
            res();
          }, 10),
        );
      const fast = () => {
        order.push('fast');
      };
      const emitter = new Emitter(makeRegistryWith('evt', slow, fast));

      await emitter.emitAsync('evt', {});
      expect(order).toEqual(['fast', 'slow']);
    });
  });

  describe('emitAsyncSequential()', () => {
    it('processes events in strict order', async () => {
      const order = [];
      const registry = new ListenerRegistry();
      registry.on('a', async () => {
        order.push('a');
      });
      registry.on('b', async () => {
        order.push('b');
      });

      const emitter = new Emitter(registry);
      await emitter.emitAsyncSequential([
        ['a', {}],
        ['b', {}],
      ]);
      expect(order).toEqual(['a', 'b']);
    });

    it('returns settled results by event when requested', async () => {
      const registry = new ListenerRegistry();
      registry.on('x', vi.fn().mockResolvedValue(1));
      const emitter = new Emitter(registry);

      await expect(
        emitter.emitAsyncSequential([['x', {}]], { returnSettled: true }),
      ).resolves.toEqual([['x', [{ status: 'fulfilled', value: 1 }]]]);
    });

    it('propagates throwOnError to each event emit', async () => {
      const registry = new ListenerRegistry();
      registry.on('x', vi.fn().mockRejectedValue(new Error('boom')));
      const emitter = new Emitter(registry);

      await expect(
        emitter.emitAsyncSequential([['x', {}]], { throwOnError: true }),
      ).rejects.toBeInstanceOf(AggregateError);
    });
  });

  describe('symbol keys', () => {
    it('supports symbol events for emit/emitAsync', async () => {
      const key = Symbol('evt');
      const cb = vi.fn().mockResolvedValue(undefined);
      const emitter = new Emitter(makeRegistryWith(key, cb));

      emitter.emit(key, 'a');
      await emitter.emitAsync(key, 'b');

      expect(cb).toHaveBeenNthCalledWith(1, 'a');
      expect(cb).toHaveBeenNthCalledWith(2, 'b');
    });
  });
});
