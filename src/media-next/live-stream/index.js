/**
 * Minimal placeholder controller for the new live-stream domain.
 * This is intentionally state-only scaffolding until the contract is finalized.
 */
export function createLiveStreamController() {
  let state = {
    status: 'idle',
    currentSourceId: null,
  };

  const listeners = new Set();

  function emit() {
    for (const listener of listeners) listener(state);
  }

  return {
    getState() {
      return state;
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    attach(source) {
      state = {
        status: 'attached',
        currentSourceId: source?.id ?? null,
      };
      emit();
    },
    stop() {
      state = {
        status: 'idle',
        currentSourceId: null,
      };
      emit();
    },
  };
}
