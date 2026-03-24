import { parseLiveStreamState } from '../schemas/state-schema.js';

/**
 * Minimal placeholder controller for the new live-stream domain.
 * This is intentionally state-only scaffolding until the contract is finalized.
 */
export function createLiveStreamController() {
  let state = parseLiveStreamState({
    status: 'idle',
    currentSourceId: null,
    trackCount: 0,
    error: null,
  });

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
      state = parseLiveStreamState({
        status: 'attached',
        currentSourceId: source?.id ?? null,
        trackCount: source?.handle?.trackIds?.length ?? 0,
        error: null,
      });
      emit();
    },
    activate() {
      state = parseLiveStreamState({
        ...state,
        status: 'active',
      });
      emit();
    },
    stop() {
      state = parseLiveStreamState({
        status: 'idle',
        currentSourceId: null,
        trackCount: 0,
        error: null,
      });
      emit();
    },
  };
}
