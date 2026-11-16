import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@solidjs/testing-library';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vite-plus/test';
import ImportContactsSection from './ImportContactsSection';
import { importGoogleContacts } from '../import/google-import.js';
import { sendContactInvite } from '../invites/send-contact-invite.js';
import { requestGmailSendAccess } from '@shared/utils/google/gis-tokens.js';
import { sendBulkEmailsViaGmail } from '@shared/utils/google/gmail-send.js';
import type { ImportContact } from '../import/types';

vi.mock('@shared/i18n', () => ({
  useI18n: () => ({
    t: (key: string, args?: { count?: number }) =>
      args?.count === undefined ? key : `${key} ${args.count}`,
  }),
}));
vi.mock('@auth', () => ({
  getLoggedInUserId: () => 'self',
  getAuthState: () => ({ user: { email: 'self@example.com' } }),
}));
vi.mock('../../../stores/user-profile-store.js', () => ({
  getLoggedInUserProfile: () => ({ displayName: 'Me' }),
}));
vi.mock('../import/google-import.js', () => ({
  importGoogleContacts: vi.fn(),
}));
vi.mock('../invites/send-contact-invite.js', () => ({
  sendContactInvite: vi.fn(),
}));
vi.mock('@shared/utils/google/gis-tokens.js', () => ({
  requestGmailSendAccess: vi.fn(),
}));
vi.mock('@shared/utils/google/gmail-send.js', () => ({
  sendBulkEmailsViaGmail: vi.fn(),
}));

const contacts: ImportContact[] = [
  {
    name: 'Alice',
    email: 'alice@example.com',
    user: { uid: 'alice', displayName: 'Alice' },
  },
  {
    name: 'Bob',
    email: 'bob@example.com',
    user: { uid: 'bob', displayName: 'Bob' },
  },
  { name: 'Guest', email: 'guest@example.com' },
  {
    name: 'Saved',
    email: 'saved@example.com',
    isAlreadySaved: true,
    user: { uid: 'saved', displayName: 'Saved' },
  },
];
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
async function load() {
  fireEvent.click(
    screen.getByRole('button', { name: 'contact.import.google' }),
  );
  await screen.findByText('Alice');
}
const checkbox = (name: string) =>
  screen.getByRole('checkbox', { name }) as HTMLInputElement;

describe('ImportContactsSection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(importGoogleContacts).mockResolvedValue({
      status: 'success',
      contacts,
    });
  });
  afterEach(cleanup);

  it('keeps selection across filtering and selects only available visible contacts', async () => {
    render(() => <ImportContactsSection onEmailFallback={vi.fn()} />);
    await load();
    fireEvent.click(checkbox('Alice alice@example.com'));
    expect(checkbox('contact.select_all 4').indeterminate).toBe(true);
    fireEvent.input(screen.getByRole('textbox', { name: 'contact.search' }), {
      target: { value: 'Guest' },
    });
    fireEvent.click(checkbox('contact.select_all 1'));
    expect(
      screen.getByRole('button', { name: 'contact.invite.selected 1' }),
    ).toHaveProperty('disabled', false);
    expect(
      screen.getByRole('button', { name: 'contact.invite.email 1' }),
    ).toHaveProperty('disabled', false);
    fireEvent.input(screen.getByRole('textbox', { name: 'contact.search' }), {
      target: { value: '' },
    });
    expect(checkbox('Alice alice@example.com').checked).toBe(true);
    expect(checkbox('Guest guest@example.com').checked).toBe(true);
    expect(checkbox('Saved saved@example.com').disabled).toBe(true);
    fireEvent.input(screen.getByRole('textbox', { name: 'contact.search' }), {
      target: { value: 'Guest' },
    });
    fireEvent.click(checkbox('contact.select_all 1'));
    expect(checkbox('Guest guest@example.com').checked).toBe(false);
    expect(
      screen.getByRole('button', { name: 'contact.invite.selected 1' }),
    ).toHaveProperty('disabled', false);
  });

  it('records successful and duplicate invitations and leaves failures selected for retry', async () => {
    vi.mocked(sendContactInvite)
      .mockResolvedValueOnce({ ok: true, status: 'sent' })
      .mockResolvedValueOnce({
        ok: false,
        status: 'error',
        error: new Error('offline'),
      });
    render(() => <ImportContactsSection onEmailFallback={vi.fn()} />);
    await load();
    fireEvent.click(checkbox('contact.select_all 4'));
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.invite.selected 2' }),
    );
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toContain(
        'contact.invite.error_retry',
      ),
    );
    expect(checkbox('Alice alice@example.com').disabled).toBe(true);
    expect(checkbox('Alice alice@example.com').checked).toBe(false);
    expect(checkbox('Bob bob@example.com').checked).toBe(true);
    expect(checkbox('Guest guest@example.com').checked).toBe(true);
    vi.mocked(sendContactInvite).mockResolvedValueOnce({
      ok: false,
      status: 'already_invited',
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.invite.selected 1' }),
    );
    await waitFor(() =>
      expect(checkbox('Bob bob@example.com').disabled).toBe(true),
    );
    expect(checkbox('Bob bob@example.com').checked).toBe(false);
  });

  it('ignores a late import after closing and allows a fresh import on reopening', async () => {
    const request =
      deferred<Awaited<ReturnType<typeof importGoogleContacts>>>();
    vi.mocked(importGoogleContacts).mockReturnValueOnce(request.promise);
    const view = render(() => (
      <ImportContactsSection onEmailFallback={vi.fn()} />
    ));
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.import.google' }),
    );
    expect(
      screen.getByRole('button', { name: 'contact.import.google' }),
    ).toHaveProperty('disabled', true);
    view.unmount();
    render(() => <ImportContactsSection onEmailFallback={vi.fn()} />);
    request.resolve({ status: 'success', contacts });
    await Promise.resolve();
    expect(screen.queryByText('Alice')).toBeNull();
    await load();
  });

  it('stops a bulk invitation after the in-flight request finishes on close', async () => {
    const request = deferred<Awaited<ReturnType<typeof sendContactInvite>>>();
    vi.mocked(sendContactInvite).mockReturnValue(request.promise);
    const view = render(() => (
      <ImportContactsSection onEmailFallback={vi.fn()} />
    ));
    await load();
    fireEvent.click(checkbox('contact.select_all 4'));
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.invite.selected 2' }),
    );
    view.unmount();
    request.resolve({ ok: true, status: 'sent' });
    await Promise.resolve();
    expect(sendContactInvite).toHaveBeenCalledTimes(1);
  });

  it('deselects successful email recipients and keeps failures selected', async () => {
    const otherGuest = { name: 'Other Guest', email: 'other@example.com' };
    vi.mocked(importGoogleContacts).mockResolvedValueOnce({
      status: 'success',
      contacts: [...contacts, otherGuest],
    });
    vi.mocked(requestGmailSendAccess).mockResolvedValueOnce('token');
    vi.mocked(sendBulkEmailsViaGmail).mockImplementationOnce(
      async (_token, items, _subject, _body, options) => {
        options?.onSent?.(items[0]!);
        return { sent: 1, failed: 1, errors: [] };
      },
    );
    render(() => <ImportContactsSection onEmailFallback={vi.fn()} />);
    await load();
    fireEvent.click(checkbox('Guest guest@example.com'));
    fireEvent.click(checkbox('Other Guest other@example.com'));
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.invite.email 2' }),
    );
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toContain(
        'contact.invite.failed_emails',
      ),
    );
    expect(checkbox('Guest guest@example.com').checked).toBe(false);
    expect(checkbox('Other Guest other@example.com').checked).toBe(true);
    expect(
      screen.getByRole('button', { name: 'contact.invite.email 1' }),
    ).toHaveProperty('disabled', false);
  });

  it('offers email compose after denied permission, but never after closing during authorization', async () => {
    const fallback = vi.fn();
    vi.mocked(requestGmailSendAccess).mockRejectedValueOnce(
      new Error('Authorization cancelled'),
    );
    const view = render(() => (
      <ImportContactsSection onEmailFallback={fallback} />
    ));
    await load();
    fireEvent.click(checkbox('Guest guest@example.com'));
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.invite.email 1' }),
    );
    await waitFor(() => expect(fallback).toHaveBeenCalledOnce());
    expect(checkbox('Guest guest@example.com').checked).toBe(true);
    const request = deferred<string>();
    vi.mocked(requestGmailSendAccess).mockReturnValueOnce(request.promise);
    fireEvent.click(
      screen.getByRole('button', { name: 'contact.invite.email 1' }),
    );
    view.unmount();
    request.resolve('token');
    await Promise.resolve();
    expect(sendBulkEmailsViaGmail).not.toHaveBeenCalled();
    expect(fallback).toHaveBeenCalledOnce();
  });

  it.each(['cancelled', 'no_email', 'error'] as const)(
    'shows %s import feedback and allows retry',
    async (status) => {
      vi.mocked(importGoogleContacts).mockResolvedValueOnce(
        status === 'error'
          ? { status, contacts: [], error: new Error('offline') }
          : { status, contacts: [] },
      );
      render(() => <ImportContactsSection onEmailFallback={vi.fn()} />);
      fireEvent.click(
        screen.getByRole('button', { name: 'contact.import.google' }),
      );
      await waitFor(() =>
        expect(screen.getByRole('status').textContent).toContain(
          `contact.import.${status}`,
        ),
      );
      expect(
        screen.getByRole('button', { name: 'contact.import.google' }),
      ).toHaveProperty('disabled', false);
      await load();
    },
  );
});
