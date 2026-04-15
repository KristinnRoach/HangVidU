import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./audio-player.js', () => ({
  AudioPlayer: class {
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
