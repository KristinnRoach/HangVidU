import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { searchUsersByHandle } from '../../../stores/user-profile-store.js';
import { AddContactDialog } from './AddContactDialog';

vi.mock('@shared/i18n/index.js', () => ({
  t: (key: string) => key,
  useI18n: () => ({ t: (key: string) => key }),
}));
vi.mock('@auth', () => ({
  getAuthState: () => ({}),
  getLoggedInUserId: () => 'self',
}));
vi.mock('../../../stores/contacts-store.js', () => ({
  getAllContacts: () => ({}),
  hydrateContacts: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../../../stores/user-profile-store.js', () => ({
  getLoggedInUserProfile: () => null,
  listIncomingContactRequests: vi.fn().mockResolvedValue([]),
  listOutgoingContactRequests: vi.fn().mockResolvedValue([]),
  searchUsersByHandle: vi.fn(),
}));
vi.mock('../invites/manual-contact-invite.js', () => ({
  inviteContactByEmail: vi.fn(),
}));
vi.mock('../invites/send-contact-invite.js', () => ({
  sendContactInvite: vi.fn(),
}));
vi.mock('../import/google-import.js', () => ({
  importGoogleContacts: vi.fn(),
}));

describe('AddContactDialog', () => {
  afterEach(cleanup);

  it('attaches the import section when initially open and after reopening', async () => {
    const [open, setOpen] = createSignal(true);
    render(() => <AddContactDialog open={open()} onOpenChange={setOpen} />);

    expect(
      await screen.findByRole('button', { name: 'contact.import.google' }),
    ).toBeTruthy();
    setOpen(false);
    expect(
      screen.queryByRole('button', { name: 'contact.import.google' }),
    ).toBeNull();
    setOpen(true);
    expect(
      await screen.findByRole('button', { name: 'contact.import.google' }),
    ).toBeTruthy();
  });
  it('resets form state on close and rejects a late handle search after reopening', async () => {
    let finish!: (
      users: { uid: string; displayName: string; username: string }[],
    ) => void;
    vi.mocked(searchUsersByHandle).mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const [open, setOpen] = createSignal(true);
    render(() => <AddContactDialog open={open()} onOpenChange={setOpen} />);
    const input = await screen.findByRole('textbox', {
      name: 'contact.add.enter_handle',
    });
    fireEvent.input(input, { target: { value: 'alice' } });
    fireEvent.submit(input.closest('form')!);
    await waitFor(() => expect(searchUsersByHandle).toHaveBeenCalled());
    setOpen(false);
    setOpen(true);
    expect(
      await screen.findByRole('textbox', { name: 'contact.add.enter_handle' }),
    ).toHaveProperty('value', '');
    finish([{ uid: 'alice', displayName: 'Late Alice', username: 'alice' }]);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByText('Late Alice')).toBeNull();
  });
  it('retains username results and disables their invitations while refreshing', async () => {
    vi.mocked(searchUsersByHandle).mockResolvedValueOnce([
      { uid: 'alice', displayName: 'Alice', username: 'alice' },
    ]);
    render(() => <AddContactDialog open onOpenChange={vi.fn()} />);
    const input = await screen.findByRole('textbox', {
      name: 'contact.add.enter_handle',
    });
    fireEvent.input(input, { target: { value: 'alice' } });
    fireEvent.submit(input.closest('form')!);
    const name = await screen.findByText('Alice');
    const invite = within(name.parentElement!.parentElement!).getByRole(
      'button',
      { name: 'contact.invite' },
    );
    expect(invite).toHaveProperty('disabled', false);

    let finish!: (
      users: { uid: string; displayName: string; username: string }[],
    ) => void;
    vi.mocked(searchUsersByHandle).mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    fireEvent.input(input, { target: { value: 'bob' } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(invite).toHaveProperty('disabled', true);
    finish([{ uid: 'bob', displayName: 'Bob', username: 'bob' }]);
    await screen.findByText('Bob');
    expect(screen.queryByText('Alice')).toBeNull();
  });
});
