import { describe, expect, it, vi } from 'vitest';
import { createCaptureRuntime } from './capture-runtime.js';

describe('createCaptureRuntime', () => {
  it('releases the acquired stream when startup fails after attachment begins', async () => {
    const track = { stop: vi.fn() };
    const stream = {
      getTracks: () => [track],
    };
    const controller = {
      attach: vi.fn(() => {
        throw new Error('attach failed');
      }),
      activate: vi.fn(),
      stop: vi.fn(),
      fail: vi.fn(),
    };
    const videoEl = { srcObject: null };
    const audioEl = { srcObject: null };

    const runtime = createCaptureRuntime({
      controller,
      getStream: vi.fn().mockResolvedValue(stream),
      sourceFactory: vi.fn(() => ({
        id: 'stream-1',
        kind: 'stream',
        label: 'Camera',
        origin: 'capture',
        mediaType: 'video',
        mimeType: 'video/webm',
        codecHints: [],
        streamType: 'camera',
        handle: {
          streamId: 'native-stream-1',
          trackIds: ['track-1'],
        },
      })),
      videoEl,
      audioEl,
    });

    await expect(runtime.start()).rejects.toThrow('attach failed');

    expect(track.stop).toHaveBeenCalledTimes(1);
    expect(videoEl.srcObject).toBe(null);
    expect(audioEl.srcObject).toBe(null);
    expect(controller.fail).toHaveBeenCalledWith('attach failed');
    expect(controller.activate).not.toHaveBeenCalled();
  });
});
