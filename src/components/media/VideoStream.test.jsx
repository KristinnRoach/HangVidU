import { cleanup, render } from '@solidjs/testing-library';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

import VideoStream from './VideoStream';

function createStreamWithVideo({ audio = true } = {}) {
  const video = [{ kind: 'video' }];
  const audioTracks = audio ? [{ kind: 'audio' }] : [];
  return {
    getVideoTracks: () => video,
    getAudioTracks: () => audioTracks,
    getTracks: () => [...video, ...audioTracks],
  };
}

describe('VideoStream', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('mutes local preview streams by default', () => {
    const stream = createStreamWithVideo();
    const { container } = render(() => (
      <VideoStream stream={stream} local={true} preview={true} />
    ));

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video.muted).toBe(true);
    expect(video.srcObject).toBe(stream);
  });

  it('leaves remote streams audible by default', () => {
    const { container } = render(() => (
      <VideoStream stream={createStreamWithVideo()} />
    ));

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video.muted).toBe(false);
  });
});
