import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
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
});
