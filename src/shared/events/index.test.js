import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  dispatchCommand,
  dispatchCommandAndAwait,
  dispatchCommandAndAwaitSequential,
  handleCommand,
  publish,
  publishAndAwait,
  publishAndAwaitSequential,
  subscribe,
} from './index.js';

/**
 * All tests use AbortController signals + unique event names so they can share
 * the module-level appBus without leaking state between tests.
 */

let testId = 0;
function uniqueName(label) {
  return `test:${label}:${++testId}`;
}

describe('src/shared/events/index.js', () => {
  // ─── dispatchCommand / handleCommand ─────────────────────────────────────

  describe('dispatchCommand() + handleCommand()', () => {
    it('delivers payload to a registered handler', () => {
      const name = uniqueName('dispatch-basic');
      const ac = new AbortController();
      const handler = vi.fn();
      handleCommand(name, handler, { signal: ac.signal });
      dispatchCommand(name, { x: 1 });
      expect(handler).toHaveBeenCalledWith({ x: 1 });
      ac.abort();
    });

    it('uses empty object as default payload', () => {
      const name = uniqueName('dispatch-default-payload');
      const ac = new AbortController();
      const handler = vi.fn();
      handleCommand(name, handler, { signal: ac.signal });
      dispatchCommand(name);
      expect(handler).toHaveBeenCalledWith({});
      ac.abort();
    });

    it('returns an unsubscribe function from handleCommand', () => {
      const name = uniqueName('handle-unsub');
      const handler = vi.fn();
      const unsub = handleCommand(name, handler);
      unsub();
      expect(() => dispatchCommand(name, {})).toThrow(
        `Command "${name}" has no registered handler`,
      );
      expect(handler).not.toHaveBeenCalled();
    });

    it('signal-based cleanup stops handler delivery', () => {
      const name = uniqueName('handle-signal');
      const ac = new AbortController();
      const handler = vi.fn();
      handleCommand(name, handler, { signal: ac.signal });
      ac.abort();
      expect(() => dispatchCommand(name, {})).toThrow(
        `Command "${name}" has no registered handler`,
      );
      expect(handler).not.toHaveBeenCalled();
    });

    it('throws when no command handler is registered', () => {
      const name = uniqueName('dispatch-no-handler');
      expect(() => dispatchCommand(name, {})).toThrow(
        `Command "${name}" has no registered handler`,
      );
    });

    it('throws when more than one command handler is registered', () => {
      const name = uniqueName('dispatch-multi-handler');
      const ac = new AbortController();
      handleCommand(name, () => {}, { signal: ac.signal });
      handleCommand(name, () => {}, { signal: ac.signal });
      expect(() => dispatchCommand(name, {})).toThrow(
        `Command "${name}" has 2 handlers`,
      );
      ac.abort();
    });
  });

  // ─── dispatchCommandAndAwait ─────────────────────────────────────────────

  describe('dispatchCommandAndAwait()', () => {
    it('awaits async handler completion', async () => {
      const name = uniqueName('dispatch-await');
      const ac = new AbortController();
      let resolved = false;
      handleCommand(
        name,
        async () => {
          await new Promise((res) => setTimeout(res, 5));
          resolved = true;
          return 'ok';
        },
        { signal: ac.signal },
      );
      const result = await dispatchCommandAndAwait(name, {});
      expect(result).toBe('ok');
      expect(resolved).toBe(true);
      ac.abort();
    });

    it('uses empty object as default payload', async () => {
      const name = uniqueName('dispatch-await-default');
      const ac = new AbortController();
      const handler = vi.fn().mockResolvedValue(undefined);
      handleCommand(name, handler, { signal: ac.signal });
      await dispatchCommandAndAwait(name);
      expect(handler).toHaveBeenCalledWith({});
      ac.abort();
    });

    it('rejects when handler throws', async () => {
      const name = uniqueName('dispatch-await-error');
      const ac = new AbortController();
      handleCommand(
        name,
        async () => {
          throw new Error('handler error');
        },
        { signal: ac.signal },
      );
      await expect(dispatchCommandAndAwait(name, {})).rejects.toThrow(
        'handler error',
      );
      ac.abort();
    });

    it('rejects when no command handler is registered', async () => {
      const name = uniqueName('dispatch-await-no-handler');
      await expect(dispatchCommandAndAwait(name, {})).rejects.toThrow(
        `Command "${name}" has no registered handler`,
      );
    });

    it('rejects when more than one command handler is registered', async () => {
      const name = uniqueName('dispatch-await-multi-handler');
      const ac = new AbortController();
      handleCommand(name, async () => 'first', { signal: ac.signal });
      handleCommand(name, async () => 'second', { signal: ac.signal });

      await expect(dispatchCommandAndAwait(name, {})).rejects.toThrow(
        `Command "${name}" has 2 handlers`,
      );
      ac.abort();
    });
  });

  // ─── dispatchCommandAndAwaitSequential (NEW) ─────────────────────────────

  describe('dispatchCommandAndAwaitSequential()', () => {
    it('invokes handlers for each command in order', async () => {
      const name1 = uniqueName('seq-cmd-1');
      const name2 = uniqueName('seq-cmd-2');
      const ac = new AbortController();
      const order = [];
      handleCommand(name1, async () => { order.push('cmd1'); }, { signal: ac.signal });
      handleCommand(name2, async () => { order.push('cmd2'); }, { signal: ac.signal });
      await dispatchCommandAndAwaitSequential([[name1, {}], [name2, {}]]);
      expect(order).toEqual(['cmd1', 'cmd2']);
      ac.abort();
    });

    it('awaits first command handler before starting second', async () => {
      const name1 = uniqueName('seq-order-1');
      const name2 = uniqueName('seq-order-2');
      const ac = new AbortController();
      const log = [];
      handleCommand(
        name1,
        () => new Promise((res) => setTimeout(() => { log.push('first done'); res(); }, 20)),
        { signal: ac.signal },
      );
      handleCommand(name2, () => { log.push('second started'); }, { signal: ac.signal });
      await dispatchCommandAndAwaitSequential([[name1, {}], [name2, {}]]);
      expect(log).toEqual(['first done', 'second started']);
      ac.abort();
    });

    it('passes payloads to each command handler', async () => {
      const name1 = uniqueName('seq-payload-1');
      const name2 = uniqueName('seq-payload-2');
      const ac = new AbortController();
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      handleCommand(name1, handler1, { signal: ac.signal });
      handleCommand(name2, handler2, { signal: ac.signal });
      await dispatchCommandAndAwaitSequential([
        [name1, { a: 1 }],
        [name2, { b: 2 }],
      ]);
      expect(handler1).toHaveBeenCalledWith({ a: 1 });
      expect(handler2).toHaveBeenCalledWith({ b: 2 });
      ac.abort();
    });

    it('rejects when a command has no registered handler', async () => {
      const name = uniqueName('seq-no-handler');
      await expect(dispatchCommandAndAwaitSequential([[name, {}]])).rejects.toThrow(
        `Command "${name}" has no registered handler`,
      );
    });

    it('resolves for an empty commands array with empty results', async () => {
      await expect(dispatchCommandAndAwaitSequential([])).resolves.toEqual([]);
    });
  });

  // ─── publish / subscribe ─────────────────────────────────────────────────

  describe('publish() + subscribe()', () => {
    it('delivers payload to a subscriber', () => {
      const name = uniqueName('pub-basic');
      const ac = new AbortController();
      const handler = vi.fn();
      subscribe(name, handler, { signal: ac.signal });
      publish(name, { data: 'hello' });
      expect(handler).toHaveBeenCalledWith({ data: 'hello' });
      ac.abort();
    });

    it('uses empty object as default payload', () => {
      const name = uniqueName('pub-default');
      const ac = new AbortController();
      const handler = vi.fn();
      subscribe(name, handler, { signal: ac.signal });
      publish(name);
      expect(handler).toHaveBeenCalledWith({});
      ac.abort();
    });

    it('returns unsubscribe from subscribe()', () => {
      const name = uniqueName('sub-unsub');
      const handler = vi.fn();
      const unsub = subscribe(name, handler);
      unsub();
      publish(name, {});
      expect(handler).not.toHaveBeenCalled();
    });
  });

  // ─── publishAndAwait ─────────────────────────────────────────────────────

  describe('publishAndAwait()', () => {
    it('awaits async subscriber', async () => {
      const name = uniqueName('pub-await');
      const ac = new AbortController();
      let done = false;
      subscribe(name, async () => { await new Promise((res) => setTimeout(res, 5)); done = true; }, { signal: ac.signal });
      await publishAndAwait(name, {});
      expect(done).toBe(true);
      ac.abort();
    });

    it('uses empty object as default payload', async () => {
      const name = uniqueName('pub-await-default');
      const ac = new AbortController();
      const handler = vi.fn().mockResolvedValue(undefined);
      subscribe(name, handler, { signal: ac.signal });
      await publishAndAwait(name);
      expect(handler).toHaveBeenCalledWith({});
      ac.abort();
    });
  });

  // ─── publishAndAwaitSequential (NEW) ─────────────────────────────────────

  describe('publishAndAwaitSequential()', () => {
    it('notifies subscribers for each event in order', async () => {
      const name1 = uniqueName('seq-evt-1');
      const name2 = uniqueName('seq-evt-2');
      const ac = new AbortController();
      const order = [];
      subscribe(name1, async () => { order.push('evt1'); }, { signal: ac.signal });
      subscribe(name2, async () => { order.push('evt2'); }, { signal: ac.signal });
      await publishAndAwaitSequential([[name1, {}], [name2, {}]]);
      expect(order).toEqual(['evt1', 'evt2']);
      ac.abort();
    });

    it('awaits first event subscribers before processing second event', async () => {
      const name1 = uniqueName('seq-evt-order-1');
      const name2 = uniqueName('seq-evt-order-2');
      const ac = new AbortController();
      const log = [];
      subscribe(
        name1,
        () => new Promise((res) => setTimeout(() => { log.push('evt1 done'); res(); }, 20)),
        { signal: ac.signal },
      );
      subscribe(name2, () => { log.push('evt2 started'); }, { signal: ac.signal });
      await publishAndAwaitSequential([[name1, {}], [name2, {}]]);
      expect(log).toEqual(['evt1 done', 'evt2 started']);
      ac.abort();
    });

    it('passes payloads to each subscriber', async () => {
      const name1 = uniqueName('seq-evt-payload-1');
      const name2 = uniqueName('seq-evt-payload-2');
      const ac = new AbortController();
      const handler1 = vi.fn();
      const handler2 = vi.fn();
      subscribe(name1, handler1, { signal: ac.signal });
      subscribe(name2, handler2, { signal: ac.signal });
      await publishAndAwaitSequential([
        [name1, { val: 'first' }],
        [name2, { val: 'second' }],
      ]);
      expect(handler1).toHaveBeenCalledWith({ val: 'first' });
      expect(handler2).toHaveBeenCalledWith({ val: 'second' });
      ac.abort();
    });

    it('resolves for an empty events array', async () => {
      await expect(publishAndAwaitSequential([])).resolves.toBeUndefined();
    });

    it('resolves with undefined when no subscribers for event', async () => {
      const name = uniqueName('seq-evt-no-sub');
      await expect(
        publishAndAwaitSequential([[name, {}]]),
      ).resolves.toBeUndefined();
    });

    it('multiple subscribers for same event all receive the payload', async () => {
      const name = uniqueName('seq-multi-sub');
      const ac = new AbortController();
      const sub1 = vi.fn();
      const sub2 = vi.fn();
      subscribe(name, sub1, { signal: ac.signal });
      subscribe(name, sub2, { signal: ac.signal });
      await publishAndAwaitSequential([[name, { msg: 'hi' }]]);
      expect(sub1).toHaveBeenCalledWith({ msg: 'hi' });
      expect(sub2).toHaveBeenCalledWith({ msg: 'hi' });
      ac.abort();
    });
  });
});
