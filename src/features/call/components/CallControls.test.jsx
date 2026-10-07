import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

const mocks = vi.hoisted(() => ({
  hangUp: vi.fn(),
  startCall: vi.fn(),
  media: {
    faceMaskAvailable: () => false,
    enableFaceMask: vi.fn(),
    micOn: () => true,
    cameraOn: () => true,
    cameraPending: () => false,
    cameraSwitchAvailable: () => false,
    screenShareAvailable: () => false,
    screenSharing: () => false,
    setMicEnabled: vi.fn(),
    setCameraEnabled: vi.fn(async () => {}),
    switchCamera: vi.fn(async () => {}),
    toggleScreenShare: vi.fn(async () => {}),
  },
}));

vi.mock('../call-handshake', () => ({
  useCallHandshake: () => ({
    hangUp: mocks.hangUp,
    startCall: mocks.startCall,
  }),
}));
vi.mock('@shared/createAutoHide', () => ({
  createAutoHide: () => () => true,
}));
vi.mock('../../../shared/i18n', () => ({
  useI18n: () => ({
    t: (key, params) => {
      if (key === 'call.unknown_caller') return 'Unknown Caller';
      if (params?.name) return `${key}:${params.name}`;
      return key;
    },
  }),
}));

const { ActiveCallControls, StartCallButton } = await import('./CallControls');

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('StartCallButton', () => {
  it('uses the latest reactive call target when clicked', () => {
    const { container, getByText } = render(() => {
      const [calleeId, setCalleeId] = createSignal('contact-1');
      const [calleeName, setCalleeName] = createSignal('Alice');

      return (
        <>
          <button
            type='button'
            onClick={() => {
              setCalleeId('contact-2');
              setCalleeName('Bob');
            }}
          >
            update target
          </button>
          <StartCallButton
            calleeId={calleeId()}
            calleeName={calleeName()}
            audioOnly={false}
          />
        </>
      );
    });

    fireEvent.click(getByText('update target'));
    fireEvent.click(container.querySelector('.contact-call-btn'));

    expect(mocks.startCall).toHaveBeenCalledWith({
      calleeId: 'contact-2',
      calleeName: 'Bob',
      audioOnly: false,
    });
  });
});

describe('ActiveCallControls', () => {
  it('keeps the face mask disabled until the call is ready', () => {
    const toggleFaceMask = vi.fn();
    let setReady;
    let setMaskOn;
    const { getByRole } = render(() => {
      const [ready, updateReady] = createSignal(false);
      const [maskOn, updateMaskOn] = createSignal(false);
      setReady = updateReady;
      setMaskOn = updateMaskOn;
      return (
        <ActiveCallControls
          media={{
            ...mocks.media,
            faceMaskAvailable: () => true,
            faceMaskReady: ready,
            faceMaskOn: maskOn,
            toggleFaceMask,
          }}
        />
      );
    });
    const button = getByRole('button', { name: 'Experimental face mask' });
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(toggleFaceMask).not.toHaveBeenCalled();

    setReady(true);
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(toggleFaceMask).toHaveBeenCalledOnce();

    setMaskOn(true);
    setReady(false);
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(toggleFaceMask).toHaveBeenCalledTimes(2);

    setMaskOn(false);
    expect(button.disabled).toBe(true);
  });

  it('reveals the face mask by default and keeps Ctrl+Shift+9 available', () => {
    render(() => <ActiveCallControls media={mocks.media} />);
    expect(mocks.media.enableFaceMask).toHaveBeenCalledOnce();
    fireEvent.keyDown(window, { code: 'Digit9' });
    expect(mocks.media.enableFaceMask).toHaveBeenCalledOnce();
    fireEvent.keyDown(window, {
      code: 'Digit9',
      ctrlKey: true,
      shiftKey: true,
    });
    expect(mocks.media.enableFaceMask).toHaveBeenCalledTimes(2);
  });

  it('lets the user mute remote audio locally', () => {
    const onRemoteAudioMutedChange = vi.fn();
    const { getByRole } = render(() => (
      <ActiveCallControls
        media={mocks.media}
        remoteAudioMuted={false}
        onRemoteAudioMutedChange={onRemoteAudioMutedChange}
      />
    ));

    fireEvent.click(getByRole('button', { name: 'Mute remote audio' }));

    expect(onRemoteAudioMutedChange).toHaveBeenCalledWith(true);
  });
});
