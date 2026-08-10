import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  p2p: {
    state: vi.fn(() => 'idle'),
    join: vi.fn(),
    error: vi.fn(),
    errorKind: vi.fn(),
  },
  signInAsGuest: vi.fn(),
  createRoomSignaling: vi.fn(),
}));

vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => mocks.p2p,
}));
vi.mock('@realtime', () => ({
  createRoomSignaling: mocks.createRoomSignaling,
}));
vi.mock('@auth', () => ({
  signInAsGuest: mocks.signInAsGuest,
}));
vi.mock('@shared/i18n', () => ({
  t: (key) => key,
}));

const { CallLobby } = await import('./CallLobby');

describe('CallLobby', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.replaceState(
      null,
      '',
      '/?publicRoom=12345678-1234-1234-1234-123456789abc',
    );
  });

  afterEach(() => {
    cleanup();
    window.history.replaceState(null, '', '/');
  });

  it('joins guest calls with initial presence and stable media slots', async () => {
    const microphone = {
      kind: 'audio',
      enabled: true,
      readyState: 'live',
      stop: vi.fn(),
    };
    const camera = {
      kind: 'video',
      enabled: true,
      readyState: 'live',
      stop: vi.fn(),
    };
    const localStream = {
      getTracks: () => [microphone, camera],
      getAudioTracks: () => [microphone],
      getVideoTracks: () => [camera],
    };
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getSupportedConstraints: () => ({}),
        getUserMedia: vi.fn(async () => localStream),
      },
    });
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    mocks.p2p.join.mockResolvedValue({ roomId: 'guest-room' });

    const { getByRole } = render(() => <CallLobby />);
    fireEvent.click(getByRole('button', { name: 'call.lobby.join' }));

    await waitFor(() => expect(mocks.p2p.join).toHaveBeenCalledOnce());
    const options = mocks.p2p.join.mock.calls[0][0];
    expect(options).toEqual(
      expect.objectContaining({
        createSignaling: mocks.createRoomSignaling,
        localTrackSlots: [
          { id: 'microphone', kind: 'audio', track: microphone },
          { id: 'primary-video', kind: 'video', track: camera },
        ],
        presenceData: { micOn: true, cameraOn: true },
      }),
    );
    await expect(options.getLocalStream()).resolves.toBe(localStream);
    expect(microphone.stop).not.toHaveBeenCalled();
    expect(camera.stop).not.toHaveBeenCalled();
  });
});
