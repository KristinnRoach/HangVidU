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
  room: vi.fn(),
  callConversationId: vi.fn(),
  remoteMemberStreams: vi.fn(() => [{}]),
  startCall: vi.fn(),
  showToast: vi.fn(),
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
    callConversationId: mocks.callConversationId,
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
    room: mocks.room,
    remoteMemberStreams: mocks.remoteMemberStreams,
  }),
}));
vi.mock('@components/toast', () => ({
  showToast: mocks.showToast,
}));
vi.mock('./MemberStreams', () => ({ MemberStreams: () => null }));
vi.mock('./CallControls', () => ({ ActiveCallControls: () => null }));

const media = { faceMaskCapturing: () => mocks.capturing() };

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  mocks.user.mockReset();
  mocks.roomState.mockReset();
  mocks.room.mockReset();
  mocks.callConversationId.mockReset();
  mocks.remoteMemberStreams.mockReset();
  mocks.showToast.mockClear();
  window.history.replaceState(null, '', '/');
});

it('submits the first eligible search result and closes the picker', async () => {
  mocks.capturing.mockReturnValue(false);
  mocks.user.mockReturnValue({ uid: 'caller' });
  mocks.roomState.mockReturnValue('joined');
  const conversationId = '12345678-1234-1234-1234-123456789abc';
  mocks.room.mockReturnValue({ roomId: conversationId });
  mocks.callConversationId.mockReturnValue(conversationId);
  render(() => <ActiveCallRoom media={media} holdTopBar={() => () => {}} />);

  expect(screen.queryByRole('button', { name: 'Copy invite link' })).toBeNull();
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

it.each([
  {
    callKind: 'room-link call',
    path: '/?publicRoom=12345678-1234-1234-1234-123456789abc',
    roomId: '12345678-1234-1234-1234-123456789abc',
  },
  {
    callKind: 'contact call',
    path: '/?conversationId=private-id',
    roomId: 'call-12345678-1234-1234-1234-123456789abc',
  },
])(
  'lets a signed-in participant copy the $callKind after someone joins',
  async ({ callKind, path, roomId }) => {
    mocks.user.mockReturnValue({ uid: 'signed-in-user' });
    window.history.replaceState(null, '', path);
    mocks.room.mockReturnValue({ roomId });
    if (callKind === 'contact call')
      mocks.callConversationId.mockReturnValue('private-id');
    const expectedLink = `${window.location.origin}/?publicRoom=${roomId}`;
    mocks.roomState.mockReturnValue('joined');
    const [streams, setStreams] = createSignal([]);
    mocks.remoteMemberStreams.mockImplementation(streams);
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
      render(() => (
        <ActiveCallRoom media={media} holdTopBar={() => () => {}} />
      ));
      const copy = screen.getByRole('button', { name: 'Copy invite link' });
      expect(copy.classList.contains('bg-bg-secondary')).toBe(true);
      expect(screen.getByRole('button', { name: 'Add caller' })).toBeTruthy();
      setStreams([{}]);
      expect(screen.getByRole('button', { name: 'Copy invite link' })).toBe(
        copy,
      );
      fireEvent.click(copy);

      const input = await screen.findByRole('textbox', {
        name: 'Copy this link manually',
      });
      expect(input.readOnly).toBe(true);
      expect(input.value).toBe(expectedLink);

      expect(mocks.showToast).not.toHaveBeenCalled();
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
      fireEvent.click(
        await screen.findByRole('button', { name: 'Copy invite link' }),
      );
      await waitFor(() => {
        expect(mocks.showToast).toHaveBeenCalledExactlyOnceWith('Link copied', {
          tone: 'success',
        });
      });
      expect(writeText).toHaveBeenCalledWith(expectedLink);
    } finally {
      if (clipboard) Object.defineProperty(navigator, 'clipboard', clipboard);
      else delete navigator.clipboard;
    }
  },
);
