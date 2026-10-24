import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

import { ParticipantMedia } from './ParticipantMedia';

class FakeTrack extends EventTarget {
  constructor(kind, { muted = false } = {}) {
    super();
    this.kind = kind;
    this.muted = muted;
    this.readyState = 'live';
  }
}

class FakeStream extends EventTarget {
  constructor(tracks = []) {
    super();
    this.tracks = tracks;
  }

  getTracks() {
    return this.tracks;
  }

  getAudioTracks() {
    return this.tracks.filter((track) => track.kind === 'audio');
  }

  getVideoTracks() {
    return this.tracks.filter((track) => track.kind === 'video');
  }

  addTrack(track) {
    this.tracks.push(track);
    this.dispatchEvent(new Event('addtrack'));
  }
}

// ParticipantMedia constructs an audio-only MediaStream in the audio state;
// node env has no MediaStream, FakeStream shares the constructor shape.
globalThis.MediaStream ??= FakeStream;

describe('ParticipantMedia', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('scales remote framing toward a full fill, capped', () => {
    let resized;
    let observed;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback) {
          resized = callback;
        }
        observe(target) {
          observed = target;
        }
        disconnect() {}
      },
    );
    const setSource = (video, width, height) => {
      Object.defineProperty(video, 'videoWidth', {
        configurable: true,
        value: width,
      });
      Object.defineProperty(video, 'videoHeight', {
        configurable: true,
        value: height,
      });
      video.dispatchEvent(new Event('resize'));
    };
    try {
      const stream = new FakeStream([new FakeTrack('video')]);
      const { container } = render(() => <ParticipantMedia stream={stream} />);
      const surface = container.firstElementChild;
      const video = container.querySelector('video');
      const scale = () => surface.style.getPropertyValue('--video-scale');
      expect(observed).toBe(surface);

      resized([{ contentRect: { width: 400, height: 800 } }]);
      // Landscape source in a portrait frame: capped, still letterboxed.
      setSource(video, 1920, 1080);
      expect(scale()).toBe('1.35');

      // Portrait source, mild mismatch: scaled to an exact fill.
      setSource(video, 1080, 1920);
      expect(scale()).toBe('1.13');

      // Frame matches the source: untouched.
      resized([{ contentRect: { width: 450, height: 800 } }]);
      expect(scale()).toBe('1');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('never scales screen shares or the self preview', () => {
    let resized;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback) {
          resized = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    try {
      const stream = new FakeStream([new FakeTrack('video')]);
      const { container } = render(() => (
        <ParticipantMedia stream={stream} screenShare />
      ));
      const surface = container.firstElementChild;
      resized([{ contentRect: { width: 400, height: 800 } }]);
      expect(surface.style.getPropertyValue('--video-scale')).toBe('1');
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('reshapes the preview after source dimensions change without empty bands', () => {
    let resized;
    let observed;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback) {
          resized = callback;
        }
        observe(target) {
          observed = target;
        }
        disconnect() {}
      },
    );
    try {
      const stream = new FakeStream([new FakeTrack('video')]);
      const { container } = render(() => (
        <ParticipantMedia stream={stream} variant='self-preview' />
      ));
      const surface = container.firstElementChild;
      const video = container.querySelector('video');
      expect(observed).toBe(surface.parentElement);
      resized([{ contentRect: { width: 400, height: 800 } }]);
      for (const [width, height] of [
        [1080, 1920],
        [1920, 1080],
      ]) {
        Object.defineProperty(video, 'videoWidth', {
          configurable: true,
          value: width,
        });
        Object.defineProperty(video, 'videoHeight', {
          configurable: true,
          value: height,
        });
        video.dispatchEvent(new Event('resize'));
        expect(
          parseFloat(surface.style.width) / parseFloat(surface.style.height),
        ).toBeCloseTo(width / height);
        expect(parseFloat(surface.style.width)).toBeLessThanOrEqual(120);
        expect(parseFloat(surface.style.height)).toBeLessThanOrEqual(200);
      }
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('keeps remote audio attached while showing the audio fallback', () => {
    const stream = new FakeStream([new FakeTrack('audio')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    const video = container.querySelector('video');

    expect(video).not.toBeNull();
    expect(video.hidden).toBe(true);
    expect(video.muted).toBe(false);
    // Audio state attaches an audio-only stream (a muted camera-slot video
    // track in srcObject blocks Chromium audio output).
    expect(video.srcObject.getTracks()).toEqual(stream.getAudioTracks());
  });

  it('shows the local self preview muted', () => {
    const stream = new FakeStream([new FakeTrack('video')]);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} variant='self-preview' />
    ));

    const video = container.querySelector('video');

    expect(video.hidden).toBe(false);
    expect(video.muted).toBe(true);
  });

  it('reactively mutes remote playback without changing the remote stream', async () => {
    const stream = new FakeStream([new FakeTrack('audio')]);
    const [remoteAudioMuted, setRemoteAudioMuted] = createSignal(false);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} remoteAudioMuted={remoteAudioMuted()} />
    ));
    const video = container.querySelector('video');

    expect(video.muted).toBe(false);

    setRemoteAudioMuted(true);

    await waitFor(() => expect(video.muted).toBe(true));
    expect(stream.getAudioTracks()[0].enabled).not.toBe(false);
  });

  it('reveals video when an audio-first stream gains a video track', async () => {
    const stream = new FakeStream([new FakeTrack('audio')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    stream.addTrack(new FakeTrack('video'));

    await waitFor(() => {
      expect(container.querySelector('video').hidden).toBe(false);
    });
  });

  it('hides remote video when the participant reports their camera is off', () => {
    const stream = new FakeStream([
      new FakeTrack('audio'),
      new FakeTrack('video'),
    ]);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} videoEnabled={false} />
    ));

    const video = container.querySelector('video');

    expect(video.hidden).toBe(true);
    expect(container.textContent).not.toContain('Connecting video');
  });

  it('explains when an expected remote video track is still connecting', () => {
    const stream = new FakeStream([
      new FakeTrack('audio'),
      new FakeTrack('video', { muted: true }),
    ]);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} videoEnabled={true} />
    ));

    expect(container.textContent).toContain('Connecting');
  });

  it('explains when a previously visible remote video is interrupted', async () => {
    const track = new FakeTrack('video');
    const stream = new FakeStream([track]);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} videoEnabled={true} />
    ));

    track.muted = true;
    track.dispatchEvent(new Event('mute'));

    await waitFor(() =>
      expect(container.textContent).toContain('Connection interrupted'),
    );
  });

  it('keeps an interrupted video sticky across camera presence toggles', async () => {
    const track = new FakeTrack('video');
    const stream = new FakeStream([track]);
    const [videoEnabled, setVideoEnabled] = createSignal(true);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} videoEnabled={videoEnabled()} />
    ));

    track.muted = true;
    track.dispatchEvent(new Event('mute'));
    setVideoEnabled(false);
    setVideoEnabled(true);

    await waitFor(() =>
      expect(container.textContent).toContain('Connection interrupted'),
    );
  });

  it('shows the continue-call prompt only for autoplay-gesture rejections', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    HTMLMediaElement.prototype.play.mockRejectedValue(
      Object.assign(new Error('gesture required'), {
        name: 'NotAllowedError',
      }),
    );
    const stream = new FakeStream([new FakeTrack('video')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    await waitFor(() => {
      expect(container.querySelector('button')?.textContent).toBe(
        'Continue call',
      );
    });
    expect(warn).toHaveBeenCalledWith('[ParticipantMedia] play() rejected', {
      variant: 'remote',
      name: 'NotAllowedError',
      message: 'gesture required',
    });
  });

  it('ignores transient play() rejections like AbortError', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    HTMLMediaElement.prototype.play.mockRejectedValue(
      Object.assign(new Error('interrupted by a new load request'), {
        name: 'AbortError',
      }),
    );
    const stream = new FakeStream([new FakeTrack('video')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    await waitFor(() =>
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled(),
    );
    // Flush the rejection handling chain before the negative assertion.
    await Promise.resolve();
    await Promise.resolve();
    expect(container.querySelector('button')).toBeNull();
    expect(warn).not.toHaveBeenCalled();
  });
});
