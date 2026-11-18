import { cleanup, fireEvent, render, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
    room: vi.fn(),
    dispose: vi.fn(),
    error: vi.fn(),
    errorKind: vi.fn(),
  },
  signInAsGuest: vi.fn(),
  joinRoomLink: vi.fn(),
  showSuccessToast: vi.fn(),
}));

vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => mocks.p2p,
}));
vi.mock('../call-handshake.js', () => ({
  useCallHandshake: () => ({ joinRoomLink: mocks.joinRoomLink }),
}));
vi.mock('@auth', () => ({
  signInAsGuest: mocks.signInAsGuest,
}));
vi.mock('@components/base-legacy/toast.js', () => ({
  showSuccessToast: mocks.showSuccessToast,
}));
vi.mock('@shared/i18n', () => ({
  t: (key) => key,
}));

const { CallLobby } = await import('./CallLobby');

function setupMediaDevices() {
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
  return { camera, localStream, microphone };
}

describe('CallLobby', () => {
  const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.p2p.state.mockReturnValue('idle');
    mocks.p2p.room.mockReset();
    mocks.p2p.errorKind.mockReset();
    window.history.replaceState(
      null,
      '',
      '/?publicRoom=12345678-1234-1234-1234-123456789abc',
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard);
    else delete navigator.clipboard;
    window.history.replaceState(null, '', '/');
  });

  it('starts a new guest call in one submission', async () => {
    window.history.replaceState(null, '', '/');
    const { localStream } = setupMediaDevices();
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    mocks.joinRoomLink.mockResolvedValue(undefined);

    const { getByRole, getAllByRole } = render(() => <CallLobby />);
    expect(getAllByRole('button')).toHaveLength(1);
    const start = getByRole('button', { name: 'call.lobby.start' });
    const input = getByRole('textbox', { name: 'call.lobby.invite_label' });
    expect(
      start.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    fireEvent.click(start);

    await waitFor(() => expect(mocks.joinRoomLink).toHaveBeenCalledOnce());
    const id = new URLSearchParams(window.location.search).get('publicRoom');
    expect(id).toMatch(/^[0-9a-f-]{36}$/);
    expect(mocks.joinRoomLink).toHaveBeenCalledWith(
      id,
      'guest-user',
      localStream,
    );
  });

  it('auto-copies only after the new room starts and shows a success toast', async () => {
    window.history.replaceState(null, '', '/');
    setupMediaDevices();
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    let finishJoin;
    mocks.joinRoomLink.mockReturnValue(
      new Promise((resolve) => {
        finishJoin = resolve;
      }),
    );
    let copiedText;
    vi.stubGlobal(
      'ClipboardItem',
      class ClipboardItem {
        constructor(data) {
          this.data = data;
        }
      },
    );
    const write = vi.fn(async ([item]) => {
      const blob = await item.data['text/plain'];
      copiedText = await blob.text();
    });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { write },
    });

    const { getByRole } = render(() => <CallLobby />);
    fireEvent.click(getByRole('button', { name: 'call.lobby.start' }));
    expect(write).toHaveBeenCalledOnce();
    expect(mocks.joinRoomLink).not.toHaveBeenCalled();
    await waitFor(() => expect(mocks.joinRoomLink).toHaveBeenCalledOnce());
    expect(copiedText).toBeUndefined();
    expect(mocks.showSuccessToast).not.toHaveBeenCalled();

    finishJoin();
    await waitFor(() => {
      expect(mocks.showSuccessToast).toHaveBeenCalledExactlyOnceWith(
        'call.link_copied',
      );
    });
    expect(copiedText).toBe(window.location.href);
  });

  it('shows a single join action for a direct invite and resets after hangup', async () => {
    const { localStream } = setupMediaDevices();
    const [state, setState] = createSignal('idle');
    mocks.p2p.state.mockImplementation(state);
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    mocks.joinRoomLink.mockImplementationOnce(async () => setState('joined'));

    const { getByRole, queryByRole } = render(() => <CallLobby />);
    expect(queryByRole('textbox')).toBeNull();
    const join = getByRole('button', { name: 'call.lobby.join' });
    expect(join.classList.contains('bg-success')).toBe(true);
    const writeText = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    fireEvent.click(join);
    await waitFor(() =>
      expect(mocks.joinRoomLink).toHaveBeenCalledExactlyOnceWith(
        '12345678-1234-1234-1234-123456789abc',
        'guest-user',
        localStream,
      ),
    );

    expect(writeText).not.toHaveBeenCalled();
    expect(mocks.showSuccessToast).not.toHaveBeenCalled();
    setState('idle');
    expect(window.location.search).toBe('');
    expect(getByRole('button', { name: 'call.lobby.start' }).disabled).toBe(
      false,
    );
    expect(
      getByRole('textbox', { name: 'call.lobby.invite_label' }),
    ).toBeTruthy();
    expect(getByRole('status').textContent).toBe('call.lobby.ended');
  });

  it('joins a pasted invite without needing an address bar', async () => {
    window.history.replaceState(null, '', '/');
    setupMediaDevices();
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    mocks.joinRoomLink.mockResolvedValue(undefined);
    const { getByRole } = render(() => <CallLobby />);
    const input = getByRole('textbox', { name: 'call.lobby.invite_label' });
    fireEvent.input(input, { target: { value: 'not a call link' } });
    expect(getByRole('button', { name: 'call.lobby.join' }).disabled).toBe(
      true,
    );
    expect(getByRole('alert').textContent).toBe('call.lobby.error.link');
    expect(navigator.mediaDevices.getUserMedia).not.toHaveBeenCalled();

    const roomId = '87654321-1234-1234-1234-123456789abc';
    const link = `https://dev.hangvidu.com/?publicRoom=${roomId}`;
    fireEvent.input(input, { target: { value: ` ${link} ` } });
    expect(getByRole('button', { name: 'call.lobby.join' }).disabled).toBe(
      false,
    );
    input.form.requestSubmit();

    await waitFor(() => expect(mocks.joinRoomLink).toHaveBeenCalledOnce());
    expect(mocks.joinRoomLink.mock.calls[0][0]).toBe(roomId);
    expect(new URLSearchParams(window.location.search).get('publicRoom')).toBe(
      roomId,
    );
  });

  it('lets the host retry without leaving a failed room link in the address', async () => {
    window.history.replaceState(null, '', '/?test=1');
    setupMediaDevices();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    mocks.joinRoomLink.mockRejectedValueOnce(
      new Error('signaling unavailable'),
    );
    const writeText = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const { findByRole, getByRole } = render(() => <CallLobby />);
    fireEvent.click(getByRole('button', { name: 'call.lobby.start' }));

    expect((await findByRole('alert')).textContent).toBe(
      'call.lobby.error.generic',
    );
    expect(window.location.search).toBe('?test=1');
    expect(writeText).not.toHaveBeenCalled();
    expect(mocks.showSuccessToast).not.toHaveBeenCalled();
    expect(getByRole('button', { name: 'call.lobby.start' }).disabled).toBe(
      false,
    );
  });

  it('returns to the lobby with a retryable message when the room is full', async () => {
    setupMediaDevices();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const [state, setState] = createSignal('idle');
    mocks.p2p.state.mockImplementation(state);
    mocks.signInAsGuest.mockResolvedValue('guest-user');
    mocks.joinRoomLink.mockImplementationOnce(async (roomId) => {
      mocks.p2p.room.mockReturnValue({ roomId });
      mocks.p2p.errorKind.mockReturnValue('room-full');
      setState('full');
      throw new Error('room full');
    });
    mocks.p2p.dispose.mockImplementationOnce(async () => {
      mocks.p2p.room.mockReturnValue(undefined);
      mocks.p2p.errorKind.mockReturnValue(undefined);
      setState('idle');
    });

    const { getByRole } = render(() => (
      <div hidden={state() !== 'idle'}>
        <CallLobby />
      </div>
    ));
    fireEvent.click(getByRole('button', { name: 'call.lobby.join' }));

    await waitFor(() => {
      expect(getByRole('alert').textContent).toBe('call.lobby.error.full');
    });
    expect(getByRole('button', { name: 'call.lobby.join' }).disabled).toBe(
      false,
    );
  });

  it('starts capture within the tap and stops it when guest sign-in fails', async () => {
    const { camera, microphone } = setupMediaDevices();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    let failSignIn;
    mocks.signInAsGuest.mockReturnValue(
      new Promise((_, reject) => {
        failSignIn = reject;
      }),
    );

    const { getByRole } = render(() => <CallLobby />);
    fireEvent.click(getByRole('button', { name: 'call.lobby.join' }));
    expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledOnce();

    failSignIn(new Error('auth unavailable'));
    await waitFor(() => expect(microphone.stop).toHaveBeenCalledOnce());
    expect(camera.stop).toHaveBeenCalledOnce();
    expect(mocks.joinRoomLink).not.toHaveBeenCalled();
  });
});
