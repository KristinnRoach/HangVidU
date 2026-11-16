import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { importGoogleContacts } from '../import/google-import.js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { searchUsersByHandle } from '../../../stores/user-profile-store.js';
import { AddContactDialog } from './AddContactDialog';

vi.mock('@shared/i18n/index.js', () => ({
  t: (key: string) => key,
  useI18n: () => ({ t: (key: string) => key }),
}));
const auth = vi.hoisted(() => ({ user: () => ({ uid: 'self' }) }));
vi.mock('@auth', () => ({
  useAuth: () => ({ user: () => auth.user() }),
  getAuthState: () => ({}),
  getLoggedInUserId: () => auth.user().uid,
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
  afterEach(() => {
    cleanup();
    auth.user = () => ({ uid: 'self' });
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
  it('discards a pending import and resets the form when the account changes', async () => {
    const [user, setUser] = createSignal({ uid: 'self' });
    auth.user = user;
    let finish!: (
      result: Awaited<ReturnType<typeof importGoogleContacts>>,
    ) => void;
    vi.mocked(importGoogleContacts).mockReturnValueOnce(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    render(() => <AddContactDialog open onOpenChange={vi.fn()} />);
    const input = await screen.findByRole('textbox', {
      name: 'contact.add.enter_handle',
    });
    fireEvent.input(input, { target: { value: 'old-query' } });
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.import.google' }),
    );
    expect(
      screen.getByRole('button', { name: 'contact.import.google' }),
    ).toHaveProperty('disabled', true);
    setUser({ uid: 'other' });
    expect(
      screen.getByRole('textbox', { name: 'contact.add.enter_handle' }),
    ).toHaveProperty('value', '');
    expect(
      screen.getByRole('button', { name: 'contact.import.google' }),
    ).toHaveProperty('disabled', false);
    finish({
      status: 'success',
      contacts: [{ name: 'Old Account Contact', email: 'old@example.com' }],
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByText('Old Account Contact')).toBeNull();
  });
});
