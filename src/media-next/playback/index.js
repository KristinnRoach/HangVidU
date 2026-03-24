import { parsePlaybackState } from '../schemas/state-schema.js';

/**
 * Minimal placeholder controller for the new playback domain.
 * This is intentionally state-only scaffolding until the contract is finalized.
 */
export function createPlaybackController() {
  let state = parsePlaybackState({
    status: 'idle',
    currentSourceId: null,
    isPlaying: false,
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
      state = parsePlaybackState({
        status: 'ready',
        currentSourceId: source?.id ?? null,
        isPlaying: false,
        currentTime: 0,
        duration: null,
        error: null,
      });
      emit();
    },
    play() {
      state = parsePlaybackState({
        ...state,
        status: 'playing',
        isPlaying: true,
      });
      emit();
    },
    pause() {
      state = parsePlaybackState({
        ...state,
        status: 'paused',
        isPlaying: false,
      });
      emit();
    },
    stop() {
      state = parsePlaybackState({
        status: 'idle',
        currentSourceId: null,
        isPlaying: false,
        currentTime: 0,
        duration: null,
        error: null,
      });
      emit();
    },
  };
}
