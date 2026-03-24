import { parsePlayerState } from '../schemas/state-schema.js';

/**
 * Minimal placeholder controller for the new playback domain.
 * This is intentionally state-only scaffolding until the contract is finalized.
 */
export function createPlaybackController() {
  let state = parsePlayerState({
    status: 'idle',
    currentSourceId: null,
    currentTime: 0,
    duration: null,
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
    load(source) {
      state = parsePlayerState({
        status: 'loading',
        currentSourceId: source?.id ?? null,
        currentTime: 0,
        duration: null,
        error: null,
      });
      emit();
    },
    syncMetrics({ currentTime = state.currentTime, duration = state.duration }) {
      state = parsePlayerState({
        ...state,
        status: state.status === 'loading' ? 'ready' : state.status,
        currentTime,
        duration,
      });
      emit();
    },
    play() {
      state = parsePlayerState({
        ...state,
        status: 'playing',
      });
      emit();
    },
    pause() {
      state = parsePlayerState({
        ...state,
        status: 'paused',
      });
      emit();
    },
    fail(error) {
      state = parsePlayerState({
        ...state,
        status: 'error',
        error,
      });
      emit();
    },
    stop() {
      state = parsePlayerState({
        status: 'idle',
        currentSourceId: null,
        currentTime: 0,
        duration: null,
        error: null,
      });
      emit();
    },
  };
}
