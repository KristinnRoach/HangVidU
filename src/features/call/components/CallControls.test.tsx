import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import type { CallMedia } from '../call-media';
import type { MessageParams } from '@shared/i18n';
import { ActiveCallControls, StartCallButton } from './CallControls';

const mocks = vi.hoisted(() => ({
  hangUp: vi.fn(),
  showErrorToast: vi.fn(),
  startCall: vi.fn(),
  media: {
    faceMaskSupported: () => false,
    mediaFlowing: () => false,
    faceMaskOn: () => false,
    faceMaskError: () => '',
    toggleFaceMask: vi.fn<CallMedia['toggleFaceMask']>(async () => {}),
    faceMaskCapturing: () => false,
    faceMaskCaptureStatus: () => 'preparing',
    faceMaskOutline: () => false,
    toggleFaceMaskOutline: vi.fn(),
    faceMaskPreview: () => undefined,
    applyFaceMask: vi.fn(),
    retakeFaceMask: vi.fn(),
    dismissFaceMaskError: vi.fn(),
    faceMaskCaptureTrack: () => undefined,
    remoteCaptureAvailable: () => false,
    setFaceMaskSource: vi.fn(),
    faceMaskCaptureReady: () => false,
    captureFaceMask: vi.fn(),
    cancelFaceMaskCapture: vi.fn(),
    micOn: () => true,
    cameraOn: () => true,
    cameraPending: () => false,
    cameraSwitchAvailable: () => false,
    screenShareAvailable: () => false,
    screenSharing: () => false,
    setMicEnabled: vi.fn<CallMedia['setMicEnabled']>(async () => {}),
    setCameraEnabled: vi.fn<CallMedia['setCameraEnabled']>(async () => {}),
    switchCamera: vi.fn<CallMedia['switchCamera']>(async () => {}),
    toggleScreenShare: vi.fn<CallMedia['toggleScreenShare']>(async () => {}),
  } satisfies CallMedia,
}));

vi.mock('../call-handshake', () => ({
  useCallHandshake: () => ({
    hangUp: mocks.hangUp,
    startCall: mocks.startCall,
  }),
}));
vi.mock('@shared/createAutoHide', () => ({
  createAutoHide: () => ({ visible: () => true }),
}));
vi.mock('../../../shared/i18n', () => ({
  useI18n: () => ({
    t: (key: string, params?: MessageParams) => {
      if (key === 'call.unknown_caller') return 'Unknown Caller';
      if (params?.name) return `${key}:${params.name}`;
      return key;
    },
  }),
}));

vi.mock('../../../components/base-legacy/toast.js', () => ({
  showErrorToast: mocks.showErrorToast,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('StartCallButton', () => {
  it('uses the latest reactive call target when clicked', () => {
    const [calleeId, setCalleeId] = createSignal('contact-1');
    const [calleeName, setCalleeName] = createSignal('Alice');
    const { getByRole } = render(() => (
      <StartCallButton calleeId={calleeId()} calleeName={calleeName()} />
    ));

    setCalleeId('contact-2');
    setCalleeName('Bob');
    fireEvent.click(getByRole('button', { name: 'contact.action.call:Bob' }));

    expect(mocks.startCall).toHaveBeenCalledWith({
      calleeId: 'contact-2',
      calleeName: 'Bob',
      audioOnly: false,
    });
  });
});

describe('ActiveCallControls', () => {
  it('keeps the face mask disabled until the call is ready', () => {
    const toggleFaceMask = vi.fn<CallMedia['toggleFaceMask']>(async () => {});
    const [ready, setReady] = createSignal(false);
    const [maskOn, setMaskOn] = createSignal(false);
    const { getByRole } = render(() => (
      <ActiveCallControls
        media={{
          ...mocks.media,
          faceMaskSupported: () => true,
          mediaFlowing: ready,
          faceMaskOn: maskOn,
          toggleFaceMask,
        }}
        remoteAudioMuted={false}
        onRemoteAudioMutedChange={() => {}}
      />
    ));
    const button = getByRole<HTMLButtonElement>('button', {
      name: 'Face mask',
    });
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

  it.each([
    ['microphone', 'Unmute mic', 'setMicEnabled', 'NotAllowedError', 'blocked'],
    ['microphone', 'Unmute mic', 'setMicEnabled', 'NotFoundError', 'not_found'],
    ['microphone', 'Unmute mic', 'setMicEnabled', 'NotReadableError', 'in_use'],
    ['microphone', 'Unmute mic', 'setMicEnabled', 'UnknownError', 'generic'],
    [
      'camera',
      'Turn camera on',
      'setCameraEnabled',
      'NotAllowedError',
      'blocked',
    ],
    [
      'camera',
      'Turn camera on',
      'setCameraEnabled',
      'NotFoundError',
      'not_found',
    ],
    [
      'camera',
      'Turn camera on',
      'setCameraEnabled',
      'NotReadableError',
      'in_use',
    ],
    ['camera', 'Turn camera on', 'setCameraEnabled', 'UnknownError', 'generic'],
    ['camera', 'Switch camera', 'switchCamera', 'NotReadableError', 'in_use'],
  ] as const)(
    'reports %s %s failure (%s: %s)',
    async (device, button, method, errorName, reason) => {
      mocks.media[method].mockRejectedValueOnce(
        new DOMException('Capture failed', errorName),
      );
      const { getByRole } = render(() => (
        <ActiveCallControls
          media={{
            ...mocks.media,
            micOn: () => false,
            cameraOn: () => method === 'switchCamera',
            cameraSwitchAvailable: () => true,
          }}
          remoteAudioMuted={false}
          onRemoteAudioMutedChange={() => {}}
        />
      ));

      fireEvent.click(getByRole('button', { name: button }));

      await vi.waitFor(() =>
        expect(mocks.showErrorToast).toHaveBeenCalledExactlyOnceWith(
          `call.media_error.${device}.${reason}`,
        ),
      );
      if (method !== 'switchCamera')
        expect(mocks.media[method]).toHaveBeenCalledWith(true);
    },
  );
});
