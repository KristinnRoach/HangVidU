import { cleanup, render, waitFor } from '@solidjs/testing-library';
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

  it('keeps remote audio attached while showing the audio fallback', () => {
    const stream = new FakeStream([new FakeTrack('audio')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    const surface = container.querySelector('[data-media-state]');
    const video = container.querySelector('video');

    expect(surface?.getAttribute('data-media-state')).toBe('audio');
    expect(video).not.toBeNull();
    expect(video.hidden).toBe(true);
    expect(video.muted).toBe(false);
    // Audio state attaches an audio-only stream (a muted camera-slot video
    // track in srcObject blocks Chromium audio output).
    expect(video.srcObject.getTracks()).toEqual(stream.getAudioTracks());
  });

  it('mutes and identifies the local self preview', () => {
    const stream = new FakeStream([new FakeTrack('video')]);
    const { container } = render(() => (
      <ParticipantMedia stream={stream} variant='self-preview' />
    ));

    const surface = container.querySelector('[data-variant]');
    const video = container.querySelector('video');

    expect(surface?.getAttribute('data-variant')).toBe('self-preview');
    expect(surface?.getAttribute('data-media-state')).toBe('video');
    expect(video.hidden).toBe(false);
    expect(video.muted).toBe(true);
  });

  it('reveals video when an audio-first stream gains a video track', async () => {
    const stream = new FakeStream([new FakeTrack('audio')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    stream.addTrack(new FakeTrack('video'));

    await waitFor(() => {
      expect(
        container
          .querySelector('[data-media-state]')
          ?.getAttribute('data-media-state'),
      ).toBe('video');
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

    const surface = container.querySelector('[data-media-state]');
    const video = container.querySelector('video');

    expect(surface?.getAttribute('data-media-state')).toBe('audio');
    expect(video.hidden).toBe(true);
  });

  it('shows the continue-call prompt only for autoplay-gesture rejections', async () => {
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
  });

  it('ignores transient play() rejections like AbortError', async () => {
    HTMLMediaElement.prototype.play.mockRejectedValue(
      Object.assign(new Error('interrupted by a new load request'), {
        name: 'AbortError',
      }),
    );
    const stream = new FakeStream([new FakeTrack('video')]);
    const { container } = render(() => <ParticipantMedia stream={stream} />);

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(container.querySelector('button')).toBeNull();
  });
});
