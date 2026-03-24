import { describe, expect, it } from 'vitest';
import { createPlaybackController } from './index.js';

describe('createPlaybackController', () => {
  it('treats play as a no-op when no source is loaded', () => {
    const controller = createPlaybackController();

    controller.play();

    expect(controller.getState()).toEqual({
      status: 'idle',
      currentSourceId: null,
      currentTime: 0,
      duration: null,
      error: null,
    });
  });

  it('treats pause as a no-op when playback is not active', () => {
    const controller = createPlaybackController();

    controller.pause();

    expect(controller.getState()).toEqual({
      status: 'idle',
      currentSourceId: null,
      currentTime: 0,
      duration: null,
      error: null,
    });
  });

  it('allows ready to playing to paused transitions', () => {
    const controller = createPlaybackController();

    controller.load({ id: 'playable-1' });
    controller.syncMetrics({ currentTime: 0, duration: 42 });
    controller.play();
    controller.pause();

    expect(controller.getState()).toEqual({
      status: 'paused',
      currentSourceId: 'playable-1',
      currentTime: 0,
      duration: 42,
      error: null,
    });
  });
});
