import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, expect, it, vi } from 'vite-plus/test';
import { createAutoHide } from '@shared/createAutoHide';
import { ActiveCallRoom } from './ActiveCallRoom';

const mocks = vi.hoisted(() => ({
  capturing: vi.fn(),
  inviteOutcome: () => null,
  user: vi.fn(() => null),
  roomState: vi.fn(() => 'idle'),
  startCall: vi.fn(),
}));
vi.mock('@auth', () => ({
  useAuth: () => ({ user: mocks.user, isLoggingOut: () => false }),
}));
vi.mock('@stores/contacts-store', () => ({
  getContactsStore: () => ({
    status: 'ready',
    byId: {
      cleo: { contactId: 'cleo', displayName: 'Cleo' },
      sam: { contactId: 'sam', displayName: 'Sam' },
    },
  }),
  getContactLabel: (contact) => contact.displayName,
}));
vi.mock('../call-handshake.js', () => ({
  useCallHandshake: () => ({
    reconnectStatus: () => 'connected',
    outgoingCall: () => null,
    inviteOutcome: () => mocks.inviteOutcome(),
    cancelOutgoing: () => {},
    startCall: mocks.startCall,
    isCallDisabled: (uid) => uid === 'sam',
  }),
}));
vi.mock('@shared/p2p-context.js', () => ({
  useP2PContext: () => ({
    state: mocks.roomState,
    remoteMemberStreams: () => [{}],
  }),
}));
vi.mock('./MemberStreams', () => ({ MemberStreams: () => null }));
vi.mock('./CallControls', () => ({ ActiveCallControls: () => null }));

const media = { faceMaskCapturing: () => mocks.capturing() };

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  mocks.user.mockReset();
  mocks.roomState.mockReset();
});

it('invites an eligible contact into the call and closes the picker', async () => {
  mocks.capturing.mockReturnValue(false);
  mocks.user.mockReturnValue({ uid: 'caller' });
  mocks.roomState.mockReturnValue('joined');
  render(() => <ActiveCallRoom media={media} holdTopBar={() => () => {}} />);

  fireEvent.click(screen.getByRole('button', { name: 'Add caller' }));
  await screen.findByRole('dialog', { name: 'Add caller' });
  expect(screen.queryByRole('button', { name: 'Sam' })).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Cleo' }));

  expect(mocks.startCall).toHaveBeenCalledExactlyOnceWith({
    calleeId: 'cleo',
    calleeName: 'Cleo',
    audioOnly: false,
  });
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
});

it('holds the top bar hidden throughout setup and resumes after setup ends', () => {
  vi.useFakeTimers();
  const [capturing, setCapturing] = createSignal(false);
  mocks.capturing.mockImplementation(capturing);
  let header;
  render(() => {
    header = createAutoHide(1000);
    return <ActiveCallRoom media={media} holdTopBar={header.hold} />;
  });

  expect(header.visible()).toBe(true);
  setCapturing(true);
  for (const event of ['pointermove', 'pointerdown', 'keydown']) {
    fireEvent(window, new Event(event));
    vi.advanceTimersByTime(2000);
    expect(header.visible()).toBe(false);
  }
  setCapturing(false);
  expect(header.visible()).toBe(true);
  vi.advanceTimersByTime(1000);
  expect(header.visible()).toBe(false);
});

it('releases the top-bar hold when the call room unmounts during setup', () => {
  mocks.capturing.mockReturnValue(true);
  const hold = vi.fn(() => release);
  const release = vi.fn();
  render(() => <ActiveCallRoom media={media} holdTopBar={hold} />);
  expect(hold).toHaveBeenCalledExactlyOnceWith('hidden');
  cleanup();
  expect(release).toHaveBeenCalledOnce();
});

it('reports how an add-invite ended in the call view, not as a dialog', () => {
  mocks.capturing.mockReturnValue(false);
  const call = { calleeName: 'Cleo', joinRoomId: 'room' };
  const [outcome, setOutcome] = createSignal({ call, result: 'busy' });
  mocks.inviteOutcome = outcome;
  const { getByRole } = render(() => (
    <ActiveCallRoom media={media} holdTopBar={() => () => {}} />
  ));
  expect(getByRole('status').textContent).toBe('Cleo is busy');
  setOutcome({ call, result: 'declined' });
  expect(getByRole('status').textContent).toBe('Cleo declined');
  setOutcome({ call, result: 'unanswered' });
  expect(getByRole('status').textContent).toBe('No answer from Cleo');
  mocks.inviteOutcome = () => null;
});
