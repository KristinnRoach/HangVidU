import { cleanup, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({ p2p: undefined }));

vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => mocks.p2p,
}));

const { MemberStreams } = await import('./MemberStreams');

class FakeTrack extends EventTarget {
  constructor(kind) {
    super();
    this.kind = kind;
    this.enabled = true;
    this.muted = false;
    this.readyState = 'live';
  }
}

class FakeStream extends EventTarget {
  constructor(tracks) {
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
}

// ParticipantMedia constructs an audio-only MediaStream in the audio state;
// node env has no MediaStream, FakeStream shares the constructor shape.
globalThis.MediaStream ??= FakeStream;

describe('MemberStreams', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('reveals the self preview when the same local stream gains video', async () => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const stream = new FakeStream([new FakeTrack('audio')]);
    const [localStream, setLocalStream] = createSignal(stream, {
      equals: false,
    });
    mocks.p2p = {
      localStream,
      memberCount: () => 2,
      memberPresence: () => [],
      remoteMemberStreams: () => [],
    };
    const { container } = render(() => (
      <MemberStreams remoteAudioMuted={false} />
    ));

    stream.tracks.push(new FakeTrack('video'));
    setLocalStream(stream);

    await waitFor(() => {
      expect(
        container
          .querySelector('[data-variant="self-preview"]')
          ?.getAttribute('data-media-state'),
      ).toBe('video');
    });
  });

  it('mutes remote participant playback when room audio is muted', () => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const remoteStream = new FakeStream([new FakeTrack('audio')]);
    mocks.p2p = {
      localStream: () => undefined,
      memberCount: () => 2,
      memberPresence: () => [],
      remoteMemberStreams: () => [
        { memberId: 'remote-member', stream: remoteStream },
      ],
    };

    const { container } = render(() => (
      <MemberStreams remoteAudioMuted={true} />
    ));

    expect(container.querySelector('video').muted).toBe(true);
  });
});
