import { createMemo, createSignal, For, onCleanup, Show } from 'solid-js';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import TextField from '../../../components/TextField';
import { getAuthState, getLoggedInUserId } from '@auth';
import { useI18n } from '@shared/i18n';
import { requestGmailSendAccess } from '@shared/utils/google/gis-tokens.js';
import { sendBulkEmailsViaGmail } from '@shared/utils/google/gmail-send.js';
import { buildReferralLink } from '@shared/utils/share-invite.js';
import { getLoggedInUserProfile } from '../../../stores/user-profile-store.js';
import { importGoogleContacts } from '../import/google-import.js';
import { filterImportableContacts } from '../import/import-contacts-utils.js';
import { sendContactInvite } from '../invites/send-contact-invite.js';

import type { ImportContact } from '../import/types';

type InviteStatus = 'sent' | 'already_invited' | 'already_saved';
type Status = { text: string; error?: boolean };

export default function ImportContactsSection(props: {
  onEmailFallback: (contacts: ImportContact[]) => void;
}) {
  const { t } = useI18n();
  const userId = getLoggedInUserId();
  let disposed = false;
  // Dialog content owns this lifetime. Closing discards selection and results;
  // requests already sent may finish, but cannot start more work or update UI.
  const isCurrent = () => !disposed && getLoggedInUserId() === userId;
  onCleanup(() => {
    disposed = true;
  });

  const [contacts, setContacts] = createSignal<ImportContact[]>([]);
  const [query, setQuery] = createSignal('');
  const [busy, setBusy] = createSignal<'import' | 'invite' | 'email' | null>(
    null,
  );
  const [selected, setSelected] = createSignal<Set<string>>(new Set());
  const [invites, setInvites] = createSignal<Record<string, InviteStatus>>({});
  const [status, setStatus] = createSignal<Status>({ text: '' });
  const visible = createMemo(
    () => filterImportableContacts(contacts(), query()) as ImportContact[],
  );
  const selectable = (contact: ImportContact) =>
    !contact.isAlreadySaved && !invites()[contact.email];
  const available = () => visible().filter(selectable);
  const chosen = () =>
    contacts().filter(
      (contact) => selected().has(contact.email) && selectable(contact),
    );
  const onApp = () => chosen().filter((contact) => contact.user);
  const offApp = () => chosen().filter((contact) => !contact.user);
  const selectedVisibleCount = () =>
    available().filter((contact) => selected().has(contact.email)).length;

  function select(email: string, checked: boolean) {
    setSelected((previous) => {
      const next = new Set(previous);
      if (checked) next.add(email);
      else next.delete(email);
      return next;
    });
  }

  async function runImport() {
    if (busy() || !isCurrent()) return;
    setBusy('import');
    setContacts([]);
    setSelected(new Set<string>());
    setInvites({});
    setQuery('');
    try {
      const result = await importGoogleContacts({
        onProgress: ({ step, count }: { step: string; count?: number }) => {
          if (!isCurrent()) return;
          const text =
            step === 'checking'
              ? t('contact.import.found_checking', { count: count ?? 0 })
              : t(`contact.import.${step}`);
          setStatus({ text });
        },
      });
      if (!isCurrent()) return;
      if (result.status === 'success') {
        setContacts(result.contacts);
        setStatus({
          text: t('contact.import.found', { count: result.contacts.length }),
        });
      } else {
        setStatus({
          text: t(`contact.import.${result.status}`, {
            error:
              result.status === 'error'
                ? String(
                    result.error instanceof Error
                      ? result.error.message
                      : result.error,
                  )
                : '',
          }),
          error: result.status === 'error',
        });
      }
    } finally {
      if (isCurrent()) setBusy(null);
    }
  }

  async function invite(items: ImportContact[]) {
    if (busy() || !isCurrent()) return;
    setBusy('invite');
    setStatus({ text: t('contact.invite.sending') });
    let sent = 0;
    let alreadyInvited = 0;
    let alreadySaved = 0;
    let failed = 0;
    try {
      for (const contact of items) {
        if (!isCurrent()) return;
        const result = await sendContactInvite(
          contact.user!.uid,
          contact.user!.displayName,
        );
        if (!isCurrent()) return;
        if (
          result.status === 'sent' ||
          result.status === 'already_invited' ||
          result.status === 'already_saved'
        ) {
          const inviteStatus = result.status;
          setInvites((previous) => ({
            ...previous,
            [contact.email]: inviteStatus,
          }));
          select(contact.email, false);
          if (result.status === 'sent') sent++;
          else if (result.status === 'already_invited') alreadyInvited++;
          else alreadySaved++;
        } else failed++;
      }
      const text =
        alreadyInvited > 0 && sent > 0
          ? t('contact.invite.partial_with_already_invited', {
              sent,
              alreadyInvited,
            })
          : sent > 0
            ? t('contact.invite.sent', { count: sent })
            : alreadyInvited > 0
              ? t('contact.add.already_invited')
              : '';
      setStatus({
        text: [
          text,
          alreadySaved > 0 ? t('contact.add.already_saved') : '',
          failed > 0 ? t('contact.invite.error_retry') : '',
        ]
          .filter(Boolean)
          .join(' '),
        error: failed > 0,
      });
    } catch {
      if (isCurrent())
        setStatus({ text: t('contact.invite.error_retry'), error: true });
    } finally {
      if (isCurrent()) setBusy(null);
    }
  }

  async function emailSelected() {
    if (busy() || !isCurrent()) return;
    const items = offApp();
    if (!items.length) return;
    setBusy('email');
    setStatus({ text: t('contact.invite.requesting_permission') });
    try {
      const accessToken = await requestGmailSendAccess({
        hint: getAuthState().user?.email ?? undefined,
      });
      if (!isCurrent()) return;
      setStatus({ text: t('contact.invite.sending') });
      const result = await sendBulkEmailsViaGmail(
        accessToken,
        items,
        t('contact.invite.subject'),
        t('contact.invite.body', {
          name:
            getLoggedInUserProfile()?.displayName ||
            t('contact.invite.sender_fallback'),
          link: buildReferralLink(userId),
        }),
        {
          isCurrent,
          onSent: (contact: ImportContact) => {
            if (isCurrent()) select(contact.email, false);
          },
        },
      );
      if (!isCurrent()) return;
      setStatus({
        text: [
          result.sent > 0
            ? t('contact.invite.sent_emails', { count: result.sent })
            : '',
          result.failed > 0 ? t('contact.invite.failed_emails') : '',
        ]
          .filter(Boolean)
          .join(' '),
        error: result.failed > 0,
      });
    } catch (error) {
      if (!isCurrent()) return;
      const cancelled =
        error instanceof Error && error.message === 'Authorization cancelled';
      setStatus({
        text: t(
          cancelled
            ? 'contact.invite.permission_denied'
            : 'contact.invite.error_retry',
        ),
        error: true,
      });
      if (cancelled) props.onEmailFallback(items);
    } finally {
      if (isCurrent()) setBusy(null);
    }
  }

  return (
    <section
      class='flex min-w-0 flex-col gap-3'
      aria-label={t('contact.import.google')}
    >
      <Button
        variant='ghost'
        loading={busy() === 'import'}
        disabled={Boolean(busy())}
        onClick={() => void runImport()}
      >
        {t('contact.import.google')}
      </Button>
      <Show when={contacts().length > 0}>
        <TextField
          label={t('contact.search')}
          hideLabel
          placeholder={t('contact.search')}
          value={query()}
          onChange={setQuery}
        />
        <Show
          when={visible().length > 0}
          fallback={
            <p class='m-0 py-4 text-center text-sm text-text-secondary'>
              {t('contact.import.none')}
            </p>
          }
        >
          <Checkbox
            checked={
              available().length > 0 &&
              selectedVisibleCount() === available().length
            }
            indeterminate={
              selectedVisibleCount() > 0 &&
              selectedVisibleCount() < available().length
            }
            disabled={Boolean(busy()) || available().length === 0}
            onChange={(checked) => {
              const eligible = available();
              setSelected((previous) => {
                const next = new Set(previous);
                for (const contact of eligible) {
                  if (checked) next.add(contact.email);
                  else next.delete(contact.email);
                }
                return next;
              });
            }}
          >
            {t('contact.select_all', { count: visible().length })}
          </Checkbox>
          <ul class='m-0 max-h-72 list-none divide-y divide-border-primary overflow-auto rounded-md border border-border-primary p-0'>
            <For each={visible()}>
              {(contact) => (
                <li class='flex flex-wrap items-center justify-between gap-2 p-3'>
                  <div class='min-w-0 flex-1 basis-48'>
                    <Checkbox
                      checked={selected().has(contact.email)}
                      disabled={Boolean(busy()) || !selectable(contact)}
                      onChange={(checked) => select(contact.email, checked)}
                    >
                      <span class='flex min-w-0 flex-col'>
                        <strong class='truncate font-medium'>
                          {contact.name}
                        </strong>{' '}
                        <span class='truncate text-text-secondary'>
                          {contact.email}
                        </span>
                      </span>
                    </Checkbox>
                  </div>
                  <span class='text-xs text-text-secondary'>
                    {t(
                      contact.isAlreadySaved ||
                        invites()[contact.email] === 'already_saved'
                        ? 'contact.status.saved'
                        : contact.user
                          ? 'contact.status.on_app'
                          : 'contact.status.not_on_app',
                    )}
                  </span>
                  <Show when={contact.user && !contact.isAlreadySaved}>
                    <Button
                      variant={
                        invites()[contact.email] ? 'secondary' : 'success'
                      }
                      disabled={Boolean(busy() || invites()[contact.email])}
                      onClick={() => void invite([contact])}
                    >
                      {invites()[contact.email] === 'sent'
                        ? `✓ ${t('contact.invite.sent_one')}`
                        : invites()[contact.email] === 'already_invited'
                          ? t('contact.add.already_invited')
                          : invites()[contact.email] === 'already_saved'
                            ? t('contact.add.already_saved')
                            : t('contact.invite')}
                    </Button>
                  </Show>
                </li>
              )}
            </For>
          </ul>
          <div class='flex flex-wrap gap-2'>
            <Show when={onApp().length > 0}>
              <Button
                variant='success'
                loading={busy() === 'invite'}
                disabled={Boolean(busy())}
                onClick={() => void invite(onApp())}
              >
                {t('contact.invite.selected', { count: onApp().length })}
              </Button>
            </Show>
            <Button
              variant='success'
              loading={busy() === 'email'}
              disabled={Boolean(busy()) || offApp().length === 0}
              onClick={() => void emailSelected()}
            >
              {t('contact.invite.email', { count: offApp().length })}
            </Button>
          </div>
        </Show>
      </Show>
      <div
        role='status'
        class={`text-sm empty:hidden ${status().error ? 'text-danger' : 'text-text-secondary'}`}
      >
        {status().text}
      </div>
    </section>
  );
}
