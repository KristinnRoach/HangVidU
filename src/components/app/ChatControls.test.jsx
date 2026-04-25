import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initI18n, setLocale } from '../../shared/i18n/index.js';
import ChatControls from './ChatControls.jsx';

function createMediaState(overrides = {}) {
  return {
    hasLocalMedia: () => true,
    micMuted: () => false,
    cameraEnabled: () => true,
    canSwitchCamera: () => true,
    remoteMuted: () => false,
    remoteControlsEnabled: () => true,
    ...overrides,
  };
}

function createCallState(overrides = {}) {
  return {
    isInCall: () => true,
    ...overrides,
  };
}

describe('ChatControls', () => {
  beforeEach(async () => {
    localStorage.clear();
    await setLocale('en');
    await initI18n();
  });

  afterEach(() => {
    cleanup();
  });

  it('routes button clicks through callback props', async () => {
    const onToggleMic = vi.fn();
    const onHangUp = vi.fn();
    const { container } = render(() => (
      <ChatControls
        callState={createCallState()}
        mediaState={createMediaState()}
        onStartCall={vi.fn()}
        onToggleMic={onToggleMic}
        onHangUp={onHangUp}
      />
    ));

    fireEvent.click(container.querySelector('#mic-btn'));
    fireEvent.click(container.querySelector('#hang-up-btn'));

    expect(onToggleMic).toHaveBeenCalledOnce();
    expect(onHangUp).toHaveBeenCalledOnce();
  });

  it('omits the remote PiP control from the core controls', () => {
    const { container } = render(() => (
      <ChatControls
        callState={createCallState()}
        mediaState={createMediaState()}
      />
    ));

    expect(container.querySelector('#remote-pip-btn')).toBeNull();
  });

  it('drives media button disabled and hidden state from Solid state', () => {
    const { container } = render(() => (
      <ChatControls
        callState={createCallState()}
        mediaState={createMediaState({
          hasLocalMedia: () => false,
          canSwitchCamera: () => false,
          remoteControlsEnabled: () => false,
        })}
      />
    ));

    expect(container.querySelector('#mic-btn').disabled).toBe(true);
    expect(container.querySelector('#camera-btn').disabled).toBe(true);
    expect(container.querySelector('#switch-camera-btn').classList).toContain(
      'hidden',
    );
    expect(container.querySelector('#mute-btn').disabled).toBe(true);
  });

  it('drives call button visibility from Solid call state', () => {
    const [isInCall, setIsInCall] = createSignal(false);
    const { container } = render(() => (
      <ChatControls
        callState={createCallState({ isInCall })}
        mediaState={createMediaState()}
      />
    ));

    expect(container.querySelector('#call-btn').classList).not.toContain(
      'hidden',
    );
    expect(container.querySelector('#hang-up-btn').classList).toContain(
      'hidden',
    );
    expect(container.querySelector('#mic-btn').classList).toContain('hidden');

    setIsInCall(true);

    expect(container.querySelector('#call-btn').classList).toContain('hidden');
    expect(container.querySelector('#hang-up-btn').classList).not.toContain(
      'hidden',
    );
    expect(container.querySelector('#mic-btn').classList).not.toContain(
      'hidden',
    );
  });
});
