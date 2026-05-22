/**
 * Create an async action wrapper that runs immediately on first call,
 * then suppresses repeated calls while in-flight and during cooldown.
 *
 * @param {(...args: any[]) => Promise<any>} action
 * @param {{ waitMs?: number, onPendingChange?: ((isPending: boolean) => void) | null }} [options]
 * @returns {((...args: any[]) => Promise<any>) & { isPending: () => boolean, cancel: () => void }}
 */
export function createDebouncedAsyncAction(action, options = {}) {
  const waitMs =
    typeof options.waitMs === 'number' && options.waitMs >= 0
      ? options.waitMs
      : 500;
  const onPendingChange =
    typeof options.onPendingChange === 'function'
      ? options.onPendingChange
      : null;

  let isPending = false;
  let cooldownTimer = null;

  function setPending(nextValue) {
    if (isPending === nextValue) return;
    isPending = nextValue;
    onPendingChange?.(isPending);
  }

  const wrapped = async (...args) => {
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
