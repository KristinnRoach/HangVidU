import { describe, expect, it, vi } from 'vitest';
import { createDebouncedAsyncAction } from './createDebouncedAsyncAction';

describe('createDebouncedAsyncAction', () => {
  it('runs immediately and suppresses repeated calls while pending', async () => {
    vi.useFakeTimers();
    const action = vi.fn().mockResolvedValue({ ok: true });
    const guarded = createDebouncedAsyncAction(action, { waitMs: 300 });

    const first = guarded('a');
    const second = guarded('b');

    expect(action).toHaveBeenCalledTimes(1);
    await expect(second).resolves.toEqual({ ok: false, status: 'debounced' });
    await first;

    await vi.advanceTimersByTimeAsync(300);
    await guarded('c');
    expect(action).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('reports pending state changes for in-flight + cooldown', async () => {
    vi.useFakeTimers();
    const pendingStates = [];

    const action = vi.fn().mockResolvedValue({ ok: true });
    const guarded = createDebouncedAsyncAction(action, {
      waitMs: 200,
      onPendingChange: (isPending) => pendingStates.push(isPending),
    });

    const promise = guarded();
    expect(guarded.isPending()).toBe(true);
    await promise;
    expect(guarded.isPending()).toBe(true);

    await vi.advanceTimersByTimeAsync(200);
    expect(guarded.isPending()).toBe(false);
    expect(pendingStates).toEqual([true, false]);

    vi.useRealTimers();
  });
});
