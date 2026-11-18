import { cleanup, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, expect, it, vi } from 'vite-plus/test';

import roomStyles from './ActiveCallRoom.module.css';
import { MemberStreams } from './MemberStreams';

const mocks = vi.hoisted(() => ({ p2p: undefined }));

vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => mocks.p2p,
}));

afterEach(cleanup);

it('fills adjoining group tiles with cameras and contains screen shares', () => {
  const peers = ['a', 'b'].map((memberId) => ({
    memberId,
    stream: new MediaStream(),
  }));
  const [sharing, setSharing] = createSignal(false);
  mocks.p2p = {
    localStream: () => undefined,
    memberCount: () => peers.length + 1,
    memberPresence: () => [{ memberId: 'b', data: { screenShare: sharing() } }],
    remoteMemberStreams: () => peers,
  };
  const media = { faceMaskCapturing: () => false };
  const { container } = render(() => (
    <div style={{ width: '393px', height: '852px' }}>
      <div class={roomStyles.room}>
        <MemberStreams media={media} remoteAudioMuted={false} />
      </div>
    </div>
  ));
  const frame = container.firstElementChild;
  const videos = [...container.querySelectorAll('video')];
  const [first, second] = videos.map((video) => video.parentElement);
  const fit = (video) => getComputedStyle(video).objectFit;
  const bounds = () => [
    first.getBoundingClientRect(),
    second.getBoundingClientRect(),
  ];

  const [top, bottom] = bounds();
  expect(top.bottom).toBeCloseTo(bottom.top);
  expect(top.height).toBeCloseTo(bottom.height);
  expect(videos.map(fit)).toEqual(['cover', 'cover']);

  Object.assign(frame.style, { width: '600px', height: '360px' });
  const [left, right] = bounds();
  expect(left.right).toBeCloseTo(right.left);
  expect(left.width).toBeCloseTo(right.width);
  expect(videos.map(fit)).toEqual(['cover', 'cover']);

  setSharing(true);
  expect(videos.map(fit)).toEqual(['cover', 'contain']);
});

it('uses the first cell for the same self-preview in wide four-person calls', () => {
  const local = new MediaStream();
  const [sharing, setSharing] = createSignal(false);
  const [capturing, setCapturing] = createSignal(false);
  const [peers, setPeers] = createSignal(
    ['a', 'b', 'c'].map((memberId) => ({
      memberId,
      stream: new MediaStream(),
    })),
  );
  mocks.p2p = {
    localStream: () => local,
    memberCount: () => peers().length + 1,
    memberPresence: () => [],
    remoteMemberStreams: peers,
  };
  const media = {
    cameraOn: () => false,
    micOn: () => false,
    screenSharing: sharing,
    faceMaskCapturing: capturing,
    faceMaskCaptureTrack: () => undefined,
    faceMaskOutline: () => false,
    remoteCaptureAvailable: () => false,
  };
  const { container } = render(() => (
    <div style={{ width: '600px', height: '360px' }}>
      <div class={roomStyles.room}>
        <MemberStreams media={media} remoteAudioMuted={false} />
      </div>
    </div>
  ));
  const frame = container.firstElementChild;
  const [self, topRight, bottomLeft] = container.querySelectorAll('video');
  const tile = (video) => video.parentElement.getBoundingClientRect();

  expect(tile(self).right).toBeCloseTo(tile(topRight).left);
  expect(tile(self).top).toBeCloseTo(tile(topRight).top);
  expect(tile(self).bottom).toBeCloseTo(tile(bottomLeft).top);
  expect(tile(self).left).toBeCloseTo(tile(bottomLeft).left);

  Object.assign(frame.style, { width: '393px', height: '852px' });
  expect(getComputedStyle(self.parentElement).position).toBe('absolute');
  expect(getComputedStyle(self).objectFit).toBe('cover');
  Object.assign(frame.style, { width: '600px', height: '360px' });
  setPeers(peers().slice(0, 2));
  expect(container.querySelector('video')).toBe(self);
  expect(getComputedStyle(self.parentElement).position).toBe('absolute');

  setPeers(peers().slice(0, 1));
  expect(getComputedStyle(self).objectFit).toBe('cover');
  expect(getComputedStyle(topRight).objectFit).toBe('contain');

  setSharing(true);
  expect(getComputedStyle(self).objectFit).toBe('contain');
  setSharing(false);
  expect(getComputedStyle(self).objectFit).toBe('cover');
  setCapturing(true);
  expect(getComputedStyle(self).objectFit).toBe('contain');
});
