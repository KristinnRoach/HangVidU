import { cleanup, fireEvent, render } from '@solidjs/testing-library';
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
        mediaState={createMediaState()}
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
      <ChatControls mediaState={createMediaState()} />
    ));

    expect(container.querySelector('#remote-pip-btn')).toBeNull();
  });

  it('drives media button disabled and hidden state from Solid state', () => {
    const { container } = render(() => (
      <ChatControls
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
    expect(container.querySelector('#hang-up-btn').disabled).toBe(true);
  });
});

