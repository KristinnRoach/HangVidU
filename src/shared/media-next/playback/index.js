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
      return { ...state };
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
    /**
     * @param {{
     *   currentTime?: number,
     *   duration?: number | null,
     * }} [options]
     */
    syncMetrics(options = {}) {
      const {
        currentTime = state.currentTime,
        duration = state.duration,
      } = options;

      state = parsePlayerState({
        ...state,
        status: state.status === 'loading' ? 'ready' : state.status,
        currentTime,
        duration,
      });
      emit();
    },
    play() {
      if (state.status !== 'ready' && state.status !== 'paused') {
        return;
      }

      state = parsePlayerState({
        ...state,
        status: 'playing',
      });
      emit();
    },
    pause() {
      if (state.status !== 'playing') {
        return;
      }

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
      if (state.status === 'idle') {
        return;
      }

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
