import { cleanup, render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
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
  hydrateContacts: vi.fn(),
}));
vi.mock('../../../stores/user-profile-store.js', () => ({
  getLoggedInUserProfile: () => null,
  listIncomingContactRequests: vi.fn(),
  listOutgoingContactRequests: vi.fn(),
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
vi.mock('./import-contacts-component.js', () => ({
  createImportContactsComponent: () => {
    const element = document.createElement('div');
    element.textContent = 'Import contacts';
    return { element, reset: vi.fn() };
  },
}));

describe('AddContactDialog', () => {
  afterEach(cleanup);

  it('attaches the import section when initially open and after reopening', async () => {
    const [open, setOpen] = createSignal(true);
    render(() => <AddContactDialog open={open()} onOpenChange={setOpen} />);

    expect(await screen.findByText('Import contacts')).toBeTruthy();
    setOpen(false);
    expect(screen.queryByText('Import contacts')).toBeNull();
    setOpen(true);
    expect(await screen.findByText('Import contacts')).toBeTruthy();
  });
});
