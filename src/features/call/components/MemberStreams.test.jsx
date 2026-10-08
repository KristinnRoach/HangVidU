import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({ p2p: undefined }));

vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => mocks.p2p,
}));

const { MemberStreams } = await import('./MemberStreams');

// Minimal CallMedia stand-in: only the accessors MemberStreams reads.
const fakeMedia = {
  cameraOn: () => true,
  screenSharing: () => false,
};

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
      <MemberStreams media={fakeMedia} remoteAudioMuted={false} />
    ));

    stream.tracks.push(new FakeTrack('video'));
    setLocalStream(stream);

    // No remote streams in this room, so the only video is the self preview.
    await waitFor(() => {
      expect(container.querySelector('video').hidden).toBe(false);
    });
  });

  it('keeps capture controls on the source video and previews locally', () => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    const local = new FakeStream([new FakeTrack('video')]);
    const remote = new FakeStream([new FakeTrack('video')]);
    const [source, setSource] = createSignal();
    const [preview, setPreview] = createSignal();
    mocks.p2p = {
      localStream: () => local,
      memberCount: () => 2,
      memberPresence: () => [{ memberId: 'remote', data: { cameraOn: true } }],
      remoteMemberStreams: () => [{ memberId: 'remote', stream: remote }],
    };
    const apply = vi.fn();
    const { getByRole, queryByRole, container } = render(() => (
      <MemberStreams
        media={{
          ...fakeMedia,
          faceMaskCapturing: () => true,
          faceMaskCaptureTrack: source,
          faceMaskPreview: preview,
          faceMaskOutline: () => false,
          faceMaskCaptureReady: () => true,
          remoteCaptureAvailable: () => true,
          setFaceMaskSource: (useRemote) =>
            setSource(useRemote ? remote.getVideoTracks()[0] : undefined),
          applyFaceMask: apply,
        }}
        remoteAudioMuted={false}
      />
    ));
    const videos = container.querySelectorAll('video');
    const captureSurface = () =>
      getByRole('button', { name: 'Capture face' }).parentElement.parentElement;
    expect(captureSurface().contains(videos[0])).toBe(true);
    fireEvent.click(getByRole('button', { name: 'Use other camera' }));
    expect(captureSurface().contains(videos[1])).toBe(true);
    setPreview(new FakeStream([new FakeTrack('video')]));
    expect(queryByRole('button', { name: 'Capture face' })).toBeNull();
    const applyButton = getByRole('button', { name: 'Apply mask' });
    expect(applyButton.parentElement.parentElement.contains(videos[0])).toBe(
      true,
    );
    fireEvent.click(applyButton);
    expect(apply).toHaveBeenCalledOnce();
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
      <MemberStreams media={fakeMedia} remoteAudioMuted={true} />
    ));

    expect(container.querySelector('video').muted).toBe(true);
  });
});
