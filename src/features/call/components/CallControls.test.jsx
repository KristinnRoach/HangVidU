import { beforeEach, describe, expect, it, vi } from 'vite-plus/test';
import { createSignal } from 'solid-js';
import { render, cleanup } from '@solidjs/testing-library';

import { StartCallButton } from './CallControls';

const mocks = vi.hoisted(() => ({
  startCall: vi.fn(),
}));

vi.mock('../call-handshake', () => ({
  useCallHandshake: () => ({ startCall: mocks.startCall }),
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

describe('StartCallButton', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('uses the latest reactive call target when clicked', () => {
    const { container, getByText, unmount } = render(() => {
      const [calleeId, setCalleeId] = createSignal('contact-1');
      const [calleeName, setCalleeName] = createSignal('Alice');

      return (
        <>
          <button
            type="button"
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

    getByText('update target').dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    );
    container
      .querySelector('.contact-call-btn')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mocks.startCall).toHaveBeenCalledWith({
      calleeId: 'contact-2',
      calleeName: 'Bob',
      audioOnly: false,
    });

    unmount();
  });
});
