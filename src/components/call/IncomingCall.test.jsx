import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import IncomingCall from './IncomingCall.jsx';

vi.mock('../../shared/i18n/index.js', () => ({
  useI18n: () => ({
    t: (key, params) => {
      if (key === 'call.incoming') return `${params?.name} is calling...`;
      if (key === 'call.accept') return 'Accept';
      if (key === 'call.decline') return 'Decline';
      if (key === 'message.audioCall') return 'Audio call';
      if (key === 'message.videoCall') return 'Video call';
      if (key === 'shared.unknown') return 'Unknown';
      if (key === 'notification.invite.accepting') return 'Accepting...';
      if (key === 'notification.invite.declining') return 'Declining...';
      return key;
    },
  }),
}));

describe('IncomingCall', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders caller details and default actions', () => {
    const { getByText, queryByText } = render(() => (
      <IncomingCall callerName='Alice' details='Room available' />
    ));

    expect(getByText('Alice is calling...')).toBeTruthy();
    expect(queryByText('Audio call')).toBeNull();
    expect(getByText('Video call')).toBeTruthy();
    expect(getByText('Room available')).toBeTruthy();
    expect(getByText('Accept')).toBeTruthy();
    expect(getByText('Decline')).toBeTruthy();
  });

  it('invokes accept and decline callbacks', async () => {
    const onAccept = vi.fn();
    const onDecline = vi.fn();
    const { getByText } = render(() => (
      <IncomingCall
        callerName='Alice'
        onAccept={onAccept}
        onDecline={onDecline}
      />
    ));

    await fireEvent.click(getByText('Accept'));
    await fireEvent.click(getByText('Decline'));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('renders audio-call badge and busy labels from props', () => {
    const { getByText } = render(() => (
      <IncomingCall callerName='Alice' audioOnly isAccepting />
    ));

    expect(getByText('Audio call')).toBeTruthy();
    expect(getByText('Accepting...')).toBeTruthy();
  });
});
