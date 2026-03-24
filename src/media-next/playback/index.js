/**
 * Minimal placeholder controller for the new playback domain.
 * This is intentionally state-only scaffolding until the contract is finalized.
 */
export function createPlaybackController() {
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
    load(source) {
      state = {
        status: 'ready',
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
