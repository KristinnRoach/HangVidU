/**
 * Create an async action wrapper that runs immediately on first call,
 * then suppresses repeated calls while in-flight and during cooldown.
 */

interface DebouncedAsyncActionOptions {
  waitMs?: number;
  onPendingChange?: ((isPending: boolean) => void) | null;
}

type DebouncedResult<T> = T | { ok: false; status: 'debounced' };

export function createDebouncedAsyncAction<Args extends unknown[], T>(
  action: (...args: Args) => Promise<T>,
  options: DebouncedAsyncActionOptions = {},
) {
  const waitMs =
    typeof options.waitMs === 'number' && options.waitMs >= 0
      ? options.waitMs
      : 500;
  const onPendingChange =
    typeof options.onPendingChange === 'function'
      ? options.onPendingChange
      : null;

  let isPending = false;
  let cooldownTimer: ReturnType<typeof setTimeout> | null = null;

  function setPending(nextValue: boolean) {
    if (isPending === nextValue) return;
    isPending = nextValue;
    onPendingChange?.(isPending);
  }

  const wrapped = async (...args: Args): Promise<DebouncedResult<T>> => {
    if (isPending) {
      return { ok: false, status: 'debounced' };
    }

    setPending(true);
    try {
      return await action(...args);
    } finally {
      if (cooldownTimer) {
        clearTimeout(cooldownTimer);
      }
      cooldownTimer = setTimeout(() => {
        cooldownTimer = null;
        setPending(false);
      }, waitMs);
    }
  };

  wrapped.isPending = () => isPending;
  wrapped.cancel = () => {
    if (cooldownTimer) {
      clearTimeout(cooldownTimer);
      cooldownTimer = null;
    }
    setPending(false);
  };

  return wrapped;
}
