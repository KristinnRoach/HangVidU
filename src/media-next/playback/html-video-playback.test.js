import { describe, expect, it, vi } from 'vitest';
import { createHtmlVideoPlaybackRuntime } from './html-video-playback.js';

describe('createHtmlVideoPlaybackRuntime', () => {
  it('removes video listeners on destroy before recreating on the same element', () => {
    const videoEl = document.createElement('video');
    const controllerA = createController();
    const controllerB = createController();

    Object.defineProperty(videoEl, 'currentTime', {
      configurable: true,
      writable: true,
      value: 12,
    });
    Object.defineProperty(videoEl, 'duration', {
      configurable: true,
      writable: true,
      value: 42,
    });
    videoEl.pause = vi.fn();
    videoEl.load = vi.fn();

    const runtimeA = createHtmlVideoPlaybackRuntime({
      controller: controllerA,
      videoEl,
    });
    runtimeA.destroy();

    createHtmlVideoPlaybackRuntime({
      controller: controllerB,
      videoEl,
    });

    videoEl.dispatchEvent(new Event('loadedmetadata'));

    expect(controllerA.syncMetrics).not.toHaveBeenCalled();
    expect(controllerB.syncMetrics).toHaveBeenCalledTimes(1);
    expect(controllerB.syncMetrics).toHaveBeenCalledWith({
      currentTime: 12,
      duration: 42,
    });
  });
});

function createController() {
  return {
    load: vi.fn(),
    play: vi.fn(),
    pause: vi.fn(),
    stop: vi.fn(),
    fail: vi.fn(),
    syncMetrics: vi.fn(),
    getState: vi.fn(),
  };
}
