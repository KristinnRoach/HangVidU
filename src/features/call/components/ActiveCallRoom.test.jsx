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
  remoteMemberStreams: vi.fn(() => [{}]),
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
      ana: { contactId: 'ana', displayName: 'Ana' },
      alice: { contactId: 'alice', displayName: 'Alice' },
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
    remoteMemberStreams: mocks.remoteMemberStreams,
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
  mocks.remoteMemberStreams.mockReset();
  window.history.replaceState(null, '', '/');
});

it('submits the first eligible search result and closes the picker', async () => {
  mocks.capturing.mockReturnValue(false);
  mocks.user.mockReturnValue({ uid: 'caller' });
  mocks.roomState.mockReturnValue('joined');
  render(() => <ActiveCallRoom media={media} holdTopBar={() => () => {}} />);

  fireEvent.click(screen.getByRole('button', { name: 'Add caller' }));
  await screen.findByRole('dialog', { name: 'Add caller' });
  expect(screen.queryByRole('button', { name: 'Sam' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Ana' })).toBeTruthy();
  const search = screen.getByRole('textbox', { name: 'Search...' });
  fireEvent.input(search, { target: { value: 'missing' } });
  search.form.requestSubmit();
  expect(mocks.startCall).not.toHaveBeenCalled();

  fireEvent.input(search, { target: { value: 'A' } });
  expect(screen.queryByRole('button', { name: 'Cleo' })).toBeNull();
  expect(screen.queryByRole('button', { name: 'Sam' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Alice' })).toBeTruthy();
  search.form.requestSubmit();

  expect(mocks.startCall).toHaveBeenCalledExactlyOnceWith({
    calleeId: 'alice',
    calleeName: 'Alice',
    audioOnly: false,
  });
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  fireEvent.click(screen.getByRole('button', { name: 'Add caller' }));
  await screen.findByRole('button', { name: 'Cleo' });
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

it('offers manual invite sharing if copying the guest-call link fails', async () => {
  window.history.replaceState(
    null,
    '',
    '/?publicRoom=12345678-1234-1234-1234-123456789abc',
  );
  mocks.roomState.mockReturnValue('joined');
  mocks.remoteMemberStreams.mockReturnValue([]);
  const writeText = vi
    .fn()
    .mockRejectedValueOnce(new Error('clipboard denied'))
    .mockResolvedValueOnce(undefined);
  const clipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  });

  try {
    const { getByRole, findByRole } = render(() => (
      <ActiveCallRoom media={media} holdTopBar={() => () => {}} />
    ));
    const copy = getByRole('button', { name: 'Copy invite link' });
    fireEvent.click(copy);

    const input = await findByRole('textbox', {
      name: 'Copy this link manually',
    });
    expect(input.readOnly).toBe(true);
    expect(input.value).toBe(window.location.href);

    fireEvent.click(copy);
    await waitFor(() =>
      expect(getByRole('status').textContent).toBe('Link copied'),
    );
    expect(writeText).toHaveBeenCalledWith(window.location.href);
  } finally {
    if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard);
    else delete navigator.clipboard;
  }
});
