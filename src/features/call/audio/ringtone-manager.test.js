import { beforeEach, describe, expect, it, vi } from 'vitest';

const audioPlayerMocks = vi.hoisted(() => ({
  constructor: vi.fn(),
}));

vi.mock('./audio-player.js', () => ({
  AudioPlayer: class {
    constructor(src, options) {
      audioPlayerMocks.constructor(src, options);
    }

    play = vi.fn().mockResolvedValue(true);
    stop = vi.fn();
    dispose = vi.fn();
    isPlaying = false;
  },
}));

describe('ringtoneManager', () => {
  beforeEach(async () => {
    vi.resetModules();
    Object.defineProperty(globalThis, 'navigator', {
      value: {},
      configurable: true,
      writable: true,
    });
    audioPlayerMocks.constructor.mockClear();
  });

  it('uses the local default busy tone by default', async () => {
    const { ringtoneManager } = await import('./ringtone-manager.js');

    await ringtoneManager.playBusy();

    expect(audioPlayerMocks.constructor).toHaveBeenCalledWith(
      '/sounds/busy.default.opus',
      expect.objectContaining({
        loop: false,
        volume: expect.any(Number),
      }),
    );
  });

  it('switches to play-and-record for audio-only outgoing ringtones when supported', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        audioSession: {
          type: 'auto',
        },
      },
      configurable: true,
      writable: true,
    });

    const { ringtoneManager } = await import('./ringtone-manager.js');

    await ringtoneManager.playOutgoing({ audioOnly: true });
    expect(globalThis.navigator.audioSession.type).toBe('play-and-record');

    ringtoneManager.stop();
    expect(globalThis.navigator.audioSession.type).toBe('auto');
  });

  it('leaves the audio session untouched for non-audio-only outgoing ringtones', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        audioSession: {
          type: 'auto',
        },
      },
      configurable: true,
      writable: true,
    });

    const { ringtoneManager } = await import('./ringtone-manager.js');

    await ringtoneManager.playOutgoing({ audioOnly: false });
    expect(globalThis.navigator.audioSession.type).toBe('auto');
  });
});
