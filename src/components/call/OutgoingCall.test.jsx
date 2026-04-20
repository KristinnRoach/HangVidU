import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import OutgoingCall from './OutgoingCall.jsx';

vi.mock('../../shared/i18n/index.js', () => ({
  useI18n: () => ({
    t: (key, params) => {
      if (key === 'call.calling') return `Calling ${params?.name}...`;
      if (key === 'call.waiting') return 'Waiting for answer...';
      if (key === 'shared.cancel') return 'Cancel';
      if (key === 'shared.sending') return 'Sending...';
      if (key === 'message.audioCall') return 'Audio call';
      if (key === 'message.videoCall') return 'Video call';
      if (key === 'shared.contact') return 'contact';
      return key;
    },
  }),
}));

describe('OutgoingCall', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders callee details and default status copy', () => {
    const { getByText } = render(() => (
      <OutgoingCall calleeName='Bob' details='Ringing on web' />
    ));

    expect(getByText('Calling Bob...')).toBeTruthy();
    expect(getByText('Waiting for answer...')).toBeTruthy();
    expect(getByText('Video call')).toBeTruthy();
    expect(getByText('Ringing on web')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('invokes cancel callback', async () => {
    const onCancel = vi.fn();
    const { getByText } = render(() => (
      <OutgoingCall calleeName='Bob' onCancel={onCancel} />
    ));

    await fireEvent.click(getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders audio-call badge and cancelling label from props', () => {
    const { getByText } = render(() => (
      <OutgoingCall calleeName='Bob' audioOnly isCancelling />
    ));

    expect(getByText('Audio call')).toBeTruthy();
    expect(getByText('Sending...')).toBeTruthy();
  });
});
