import { createSignal, For, Show, onCleanup } from 'solid-js';
import Button from '../../../components/Button';
import Dialog from '../../../components/dialogs/Dialog';
import TextField from '../../../components/TextField';
import { Share2, Copy } from 'lucide-solid';
import { t as t_, useI18n } from '@shared/i18n/index.js';
import {
  buildReferralLink,
  copyInviteLink,
  shareInvite,
} from '@shared/utils/share-invite.js';
import { getLoggedInUserId, useAuth } from '@auth';
import { sendContactInvite } from '../invites/send-contact-invite.js';
import {
  getAllContacts,
  hydrateContacts,
} from '../../../stores/contacts-store.js';
import {
  listIncomingContactRequests,
  listOutgoingContactRequests,
  getLoggedInUserProfile,
  lookupRegisteredUserByEmail,
  searchUsersByHandle,
  type UserSearchResult,
} from '../../../stores/user-profile-store.js';
import ImportContactsSection from './ImportContactsSection';
import { createDebouncedAsyncAction } from '../utils/createDebouncedAsyncAction';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../components/base-legacy/toast.js';

type Tone = 'success' | 'error';
type Status = { text: string; tone?: Tone };
type ShareResult = { status: string };
type InviteStatus =
  | 'already_saved'
  | 'already_invited'
  | 'incoming_pending'
  | 'sent';

const inviteLabels: Record<InviteStatus, string> = {
  already_saved: 'contact.add.already_saved',
  already_invited: 'contact.add.already_invited',
  incoming_pending: 'contact.add.invited_you',
  sent: 'contact.invite.sent_one',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email matches are exact and only cover verified, discoverable accounts.
async function findUsers(query: string): Promise<UserSearchResult[]> {
  if (!EMAIL_PATTERN.test(query)) return searchUsersByHandle(query);
  const result = await lookupRegisteredUserByEmail(query);
  if (result.status === 'lookup_error') throw result.error;
  return result.user ? [result.user] : [];
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function openEmailComposeFallback(
  contacts: { email: string }[],
  userId: string,
  senderName: string,
) {
  const referralLink = buildReferralLink(userId);
  const subject = encodeURIComponent(t_('contact.invite.subject'));
  const body = encodeURIComponent(
    t_('contact.invite.body', { name: senderName, link: referralLink }),
  );
  const recipients = contacts.map(({ email }) => email.trim()).filter(Boolean);
  if (recipients.length === 0) return;

  const rawTo = recipients.join(',');
  const encodedTo = recipients.map(encodeURIComponent).join(',');
  const firstRecipient = recipients[0];
  const recipientParam =
    recipients.length === 1 && firstRecipient
      ? `to=${encodeURIComponent(firstRecipient)}`
      : `bcc=${encodedTo}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&${recipientParam}&su=${subject}&body=${body}`;
  const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  if (!opened) {
    const mailtoLink =
      recipients.length === 1 && firstRecipient
        ? `mailto:${encodeURIComponent(firstRecipient)}?subject=${subject}&body=${body}`
        : `mailto:?bcc=${rawTo}&subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
}

export function AddContactDialog(props: Props) {
  const { t } = useI18n();
  const { user } = useAuth();
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      title={t('contact.add.title')}
    >
      {/* Each account owns a fresh form and pending-operation lifetime. */}
      <Show when={user()?.uid} keyed>
        {(_userId) => <AddContactContent />}
      </Show>
    </Dialog>
  );
}

function AddContactContent() {
  const { t } = useI18n();
  const userId = getLoggedInUserId();
  let disposed = false;
  const isCurrent = () => !disposed && getLoggedInUserId() === userId;
  onCleanup(() => {
    disposed = true;
  });
  const senderName = () =>
    getLoggedInUserProfile()?.displayName ||
    t('contact.invite.sender_fallback');

  const [searchInput, setSearchInput] = createSignal('');
  const [searching, setSearching] = createSignal(false);
  const [results, setResults] = createSignal<UserSearchResult[]>([]);
  const [notFound, setNotFound] = createSignal(false);
  const [inviteStatuses, setInviteStatuses] = createSignal<
    Record<string, InviteStatus>
  >({});
  const [requestingUserId, setRequestingUserId] = createSignal<string | null>(
    null,
  );
  const [status, setStatus] = createSignal<Status>({ text: '' });
  const [sharePending, setSharePending] = createSignal(false);

  function notify(text: string, tone?: Tone) {
    if (tone === 'success') showSuccessToast(text);
    if (tone === 'error') showErrorToast(text);
    setStatus({ text, tone });
  }

  // Unlisted results (including copy_failed) fall back to the copy error.
  const share = createDebouncedAsyncAction(
    async (
      opening: string,
      run: () => Promise<ShareResult>,
      messages: Record<string, [string, Tone?]>,
    ) => {
      setStatus({ text: opening });
      try {
        const { status } = await run();
        if (!isCurrent()) return;
        const [text, tone] = messages[status] ?? [
          t('contact.invite.share.copy_failed'),
          'error',
        ];
        notify(text, tone);
      } catch (error) {
        if (!isCurrent()) return;
        console.error('[AddContactDialog] Share error:', error);
        notify(t('contact.invite.share.copy_failed'), 'error');
      }
    },
    {
      waitMs: 600,
      onPendingChange: (value) => {
        if (isCurrent()) setSharePending(value);
      },
    },
  );
  onCleanup(() => share.cancel());

  const copiedMessage: [string, Tone] = [
    t('contact.invite.share.copied'),
    'success',
  ];

  function shareGeneric() {
    void share(
      t('contact.invite.share.opening'),
      () => shareInvite({ senderName: senderName(), userId, isCurrent }),
      {
        opened_elsewhere: [t('contact.invite.share.opened_elsewhere')],
        cancelled: [t('contact.invite.share.cancelled')],
        copied: copiedMessage,
      },
    );
  }

  function copyLink() {
    void share(
      t('contact.invite.copying'),
      () => copyInviteLink({ userId: getLoggedInUserId() as string }),
      { copied: copiedMessage },
    );
  }

  async function handleSearch() {
    if (searching() || !isCurrent()) return;
    const query = searchInput().trim().replace(/^@+/, '');
    setStatus({ text: '' });
    setNotFound(false);
    if (!query) {
      setResults([]);
      setInviteStatuses({});
      return;
    }
    setSearching(true);
    try {
      await hydrateContacts().catch((error) => {
        console.warn(
          '[AddContactDialog] Contact hydration before search failed:',
          error,
        );
      });
      if (!isCurrent()) return;
      const [users, outgoingRequests, incomingRequests] = await Promise.all([
        findUsers(query),
        listOutgoingContactRequests().catch((error) => {
          console.warn(
            '[AddContactDialog] Outgoing contact requests lookup failed:',
            error,
          );
          return [];
        }),
        listIncomingContactRequests().catch((error) => {
          console.warn(
            '[AddContactDialog] Incoming contact requests lookup failed:',
            error,
          );
          return [];
        }),
      ]);
      if (!isCurrent()) return;
      const contacts = getAllContacts();
      const outgoingIds = new Set(
        outgoingRequests.map((request) => request.toId),
      );
      const incomingIds = new Set(
        incomingRequests.map((request) => request.fromId),
      );
      setResults(users);
      setInviteStatuses(
        Object.fromEntries(
          users.flatMap((user): [string, InviteStatus][] => {
            if (contacts?.[user.uid]) return [[user.uid, 'already_saved']];
            if (incomingIds.has(user.uid))
              return [[user.uid, 'incoming_pending']];
            if (outgoingIds.has(user.uid))
              return [[user.uid, 'already_invited']];
            return [];
          }),
        ),
      );
      setNotFound(users.length === 0);
    } catch (error) {
      if (!isCurrent()) return;
      setResults([]);
      setInviteStatuses({});
      console.error('[AddContactDialog] Search error:', error);
      setStatus({ text: t('contact.add.lookup_error'), tone: 'error' });
    } finally {
      if (isCurrent()) setSearching(false);
    }
  }

  async function handleSendRequest(user: UserSearchResult) {
    if (searching() || requestingUserId() || !isCurrent()) return;
    setRequestingUserId(user.uid);
    setStatus({ text: '' });
    try {
      const result = await sendContactInvite(user.uid, user.displayName);
      if (!isCurrent()) return;
      if (
        result.status === 'already_invited' ||
        result.status === 'already_saved'
      ) {
        const inviteStatus = result.status;
        setInviteStatuses((statuses) => ({
          ...statuses,
          [user.uid]: inviteStatus,
        }));
        setStatus({ text: t(inviteLabels[inviteStatus]) });
        return;
      }
      if (result.status !== 'sent') {
        setStatus({ text: t('contact.add.email_error'), tone: 'error' });
        return;
      }
      setInviteStatuses((statuses) => ({
        ...statuses,
        [user.uid]: 'sent',
      }));
      notify(`✓ ${t('contact.invite.sent_one')}`, 'success');
    } catch (error) {
      if (!isCurrent()) return;
      console.error('[AddContactDialog] Contact request error:', error);
      setStatus({ text: t('contact.add.email_error'), tone: 'error' });
    } finally {
      if (isCurrent()) setRequestingUserId(null);
    }
  }

  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const statusTone = () =>
    status().tone === 'success'
      ? 'text-success'
      : status().tone === 'error'
        ? 'text-danger'
        : '';

  return (
    <>
      <div class='flex flex-col gap-3'>
        <p class='text-sm text-text-secondary'>
          {t('contact.add.invite_hint')}
        </p>
        <div class='flex flex-wrap gap-2'>
          <Button
            variant='success'
            disabled={sharePending()}
            onClick={copyLink}
          >
            <Copy size={16} aria-hidden='true' />
            {t('contact.invite.copy.label')}
          </Button>
          {/* Web Share is mostly missing on desktop; Copy covers it there. */}
          <Show when={canNativeShare}>
            <Button
              variant='success'
              disabled={sharePending()}
              aria-label={t('contact.invite.share.label')}
              onClick={shareGeneric}
            >
              <Share2 size={16} aria-hidden='true' />
              {t('contact.invite.share.short')}
            </Button>
          </Show>
        </div>
      </div>

      <div class='my-2 flex items-center gap-2 text-xs text-text-secondary'>
        <hr class='flex-1 border-border-primary' />
        <span>{t('contact.add.find_divider')}</span>
        <hr class='flex-1 border-border-primary' />
      </div>

      <form
        class='flex gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          void handleSearch();
        }}
      >
        <TextField
          class='flex-1'
          label={t('contact.add.search')}
          hideLabel
          placeholder={t('contact.add.search')}
          value={searchInput()}
          onChange={setSearchInput}
          autocomplete='off'
          autocapitalize='none'
        />
        <Button type='submit' loading={searching()}>
          {searching() ? t('shared.searching') : t('shared.search')}
        </Button>
      </form>

      <Show when={notFound()}>
        <div class='flex flex-wrap items-center justify-between gap-2 text-sm text-text-secondary'>
          <span>{t('contact.add.not_found')}</span>
          <Button
            variant='ghost'
            disabled={sharePending()}
            onClick={canNativeShare ? shareGeneric : copyLink}
          >
            {t('contact.add.send_link_instead')}
          </Button>
        </div>
      </Show>

      <Show when={results().length > 0}>
        <div class='flex flex-col gap-2' aria-busy={searching()}>
          <For each={results()}>
            {(user) => {
              const inviteStatus = () => inviteStatuses()[user.uid];
              const inviteLabel = () => {
                const current = inviteStatus();
                if (requestingUserId() === user.uid) return t('shared.sending');
                if (!current) return t('contact.invite');
                const label = t(inviteLabels[current]);
                return current === 'sent' ? `✓ ${label}` : label;
              };
              return (
                <div class='flex items-center justify-between gap-2 text-sm'>
                  <span class='min-w-0 truncate'>
                    {user.displayName}
                    <Show when={user.username}>
                      <small class='ml-1.5 text-text-secondary'>
                        @{user.username}
                      </small>
                    </Show>
                  </span>
                  <Button
                    variant={inviteStatus() ? 'secondary' : 'success'}
                    loading={requestingUserId() === user.uid}
                    disabled={searching() || Boolean(inviteStatus())}
                    onClick={() => handleSendRequest(user)}
                  >
                    {inviteLabel()}
                  </Button>
                </div>
              );
            }}
          </For>
        </div>
      </Show>

      <hr class='my-2 border-border-primary' />

      <ImportContactsSection
        onEmailFallback={(contacts) =>
          openEmailComposeFallback(contacts, userId!, senderName())
        }
      />

      {/* Stays mounted so screen readers announce changes to it. */}
      <div
        class={`text-sm text-text-secondary empty:hidden ${statusTone()}`}
        role='status'
      >
        {status().text}
      </div>
    </>
  );
}
