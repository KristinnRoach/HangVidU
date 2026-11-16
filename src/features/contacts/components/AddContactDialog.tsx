import { createSignal, For, Show, onCleanup } from 'solid-js';
import Button from '../../../components/Button';
import Dialog from '../../../components/dialogs/Dialog';
import TextField from '../../../components/TextField';
import { Share2, Copy } from 'lucide-solid';
import { t as t_, useI18n } from '@shared/i18n/index.js';
import {
  getInviteShareProviders,
  shareInviteViaProvider,
} from '@shared/utils/share-invite-presets.js';
import {
  buildReferralLink,
  copyInviteLink,
  shareInvite,
} from '@shared/utils/share-invite.js';
import { getLoggedInUserId } from '@auth';
import { inviteContactByEmail } from '../invites/manual-contact-invite.js';
import { sendContactInvite } from '../invites/send-contact-invite.js';
import {
  getAllContacts,
  hydrateContacts,
} from '../../../stores/contacts-store.js';
import {
  listIncomingContactRequests,
  listOutgoingContactRequests,
  getLoggedInUserProfile,
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
type HandleInviteStatus =
  | 'already_saved'
  | 'already_invited'
  | 'incoming_pending'
  | 'sent';

const handleInviteLabels: Record<HandleInviteStatus, string> = {
  already_saved: 'contact.add.already_saved',
  already_invited: 'contact.add.already_invited',
  incoming_pending: 'contact.add.invited_you',
  sent: 'contact.invite.sent_one',
};

const emailInviteMessages: Record<string, [string, Tone?]> = {
  not_found: ['contact.add.not_found_emailing'],
  self: ['contact.add.self_error', 'error'],
  already_saved: ['contact.add.already_saved'],
  already_invited: ['contact.add.already_invited'],
  permission_denied: ['contact.invite.permission_denied', 'error'],
  lookup_error: ['contact.add.lookup_error', 'error'],
};

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
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      title={t('contact.add.title')}
    >
      <AddContactContent />
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
  const shareProviders = getInviteShareProviders();
  const senderName = () =>
    getLoggedInUserProfile()?.displayName ||
    t('contact.invite.sender_fallback');

  const [emailInput, setEmailInput] = createSignal('');
  const [emailSending, setEmailSending] = createSignal(false);
  const [handleInput, setHandleInput] = createSignal('');
  const [handleSearching, setHandleSearching] = createSignal(false);
  const [handleResults, setHandleResults] = createSignal<UserSearchResult[]>(
    [],
  );
  const [handleInviteStatuses, setHandleInviteStatuses] = createSignal<
    Record<string, HandleInviteStatus>
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

  function shareViaProvider(provider: { id: string; labelKey: string }) {
    const name = t(provider.labelKey);
    void share(
      t('contact.invite.share.provider_opening', { provider: name }),
      () =>
        shareInviteViaProvider({
          providerId: provider.id as 'whatsapp' | 'telegram',
          senderName: senderName(),
          userId: getLoggedInUserId(),
        }),
      {
        opened: [t('contact.invite.share.provider_opened', { provider: name })],
        copied: [
          t('contact.invite.share.provider_copied', { provider: name }),
          'success',
        ],
      },
    );
  }

  function shareGeneric() {
    void share(
      t('contact.invite.share.opening'),
      () =>
        shareInvite({ senderName: senderName(), userId: getLoggedInUserId() }),
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

  // --- Manual email invite ---

  async function handleManualEmailInvite() {
    const email = emailInput().trim().toLowerCase();
    if (!email || emailSending() || !isCurrent()) return;
    setEmailInput(email);
    setEmailSending(true);
    setStatus({ text: '' });

    const result = await inviteContactByEmail(email, {
      isCurrent,
      onNotFound: () =>
        openEmailComposeFallback([{ email }], userId!, senderName()),
    });

    if (!isCurrent()) return;
    const message = emailInviteMessages[result.status];
    if (result.status === 'sent') {
      notify(`✓ ${t('contact.invite.sent_one')}`, 'success');
    } else if (message) {
      setStatus({ text: t(message[0]), tone: message[1] });
    } else {
      console.error(
        '[AddContactDialog] Manual email invite error:',
        (result as { error?: unknown }).error,
      );
      setStatus({ text: t('contact.add.email_error'), tone: 'error' });
    }
    setEmailSending(false);
  }

  async function handleSearchByHandle() {
    if (handleSearching() || !isCurrent()) return;
    const handle = handleInput().trim().replace(/^@+/, '');
    setStatus({ text: '' });
    if (!handle) {
      setHandleResults([]);
      setHandleInviteStatuses({});
      return;
    }
    setHandleSearching(true);
    try {
      await hydrateContacts().catch((error) => {
        console.warn(
          '[AddContactDialog] Contact hydration before search failed:',
          error,
        );
      });
      if (!isCurrent()) return;
      const [users, outgoingRequests, incomingRequests] = await Promise.all([
        searchUsersByHandle(handle),
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
      setHandleResults(users);
      setHandleInviteStatuses(
        Object.fromEntries(
          users.flatMap((user): [string, HandleInviteStatus][] => {
            if (contacts?.[user.uid]) return [[user.uid, 'already_saved']];
            if (incomingIds.has(user.uid))
              return [[user.uid, 'incoming_pending']];
            if (outgoingIds.has(user.uid))
              return [[user.uid, 'already_invited']];
            return [];
          }),
        ),
      );
      if (users.length === 0) {
        setStatus({ text: t('contact.add.handle_not_found') });
      }
    } catch (error) {
      if (!isCurrent()) return;
      setHandleResults([]);
      setHandleInviteStatuses({});
      console.error('[AddContactDialog] Handle search error:', error);
      setStatus({ text: t('contact.add.lookup_error'), tone: 'error' });
    } finally {
      if (isCurrent()) setHandleSearching(false);
    }
  }

  async function handleSendRequest(user: UserSearchResult) {
    if (handleSearching() || requestingUserId() || !isCurrent()) return;
    if (user.uid === getLoggedInUserId()) {
      setStatus({ text: t('contact.add.self_error'), tone: 'error' });
      return;
    }
    setRequestingUserId(user.uid);
    setStatus({ text: '' });
    try {
      const result = await sendContactInvite(user.uid, user.displayName);
      if (!isCurrent()) return;
      if (result.status === 'already_invited') {
        setHandleInviteStatuses((statuses) => ({
          ...statuses,
          [user.uid]: 'already_invited',
        }));
        setStatus({ text: t('contact.add.already_invited') });
        return;
      }
      if (result.status !== 'sent') {
        setStatus({ text: t('contact.add.email_error'), tone: 'error' });
        return;
      }
      setHandleInviteStatuses((statuses) => ({
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

  const statusTone = () =>
    status().tone === 'success'
      ? 'text-success'
      : status().tone === 'error'
        ? 'text-danger'
        : '';

  return (
    <>
      <form
        class='flex gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          void handleSearchByHandle();
        }}
      >
        <TextField
          class='flex-1'
          label={t('contact.add.enter_handle')}
          hideLabel
          placeholder={t('contact.add.enter_handle')}
          value={handleInput()}
          onChange={setHandleInput}
          autocomplete='off'
          autocapitalize='none'
        />
        <Button type='submit' loading={handleSearching()}>
          {handleSearching() ? t('shared.searching') : t('shared.search')}
        </Button>
      </form>

      <Show when={handleResults().length > 0}>
        <div class='flex flex-col gap-2' aria-busy={handleSearching()}>
          <For each={handleResults()}>
            {(user) => {
              const inviteStatus = () => handleInviteStatuses()[user.uid];
              const inviteLabel = () => {
                const current = inviteStatus();
                if (requestingUserId() === user.uid) return t('shared.sending');
                if (!current) return t('contact.invite');
                const label = t(handleInviteLabels[current]);
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
                    disabled={handleSearching() || Boolean(inviteStatus())}
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

      {/* type='email' lets the browser validate the address on submit. */}
      <form
        class='flex gap-2'
        onSubmit={(e) => {
          e.preventDefault();
          void handleManualEmailInvite();
        }}
      >
        <TextField
          class='flex-1'
          type='email'
          label={t('contact.add.enter_email')}
          hideLabel
          placeholder={t('contact.add.enter_email')}
          value={emailInput()}
          onChange={setEmailInput}
          autocomplete='email'
        />
        <Button variant='success' type='submit' loading={emailSending()}>
          {emailSending() ? t('shared.sending') : t('contact.invite')}
        </Button>
      </form>

      <div
        class='flex flex-wrap gap-2'
        role='group'
        aria-label={t('contact.invite.share.presets_label')}
      >
        <For each={shareProviders}>
          {(provider) => (
            <Button
              disabled={sharePending()}
              onClick={() => shareViaProvider(provider)}
            >
              {/* Provider icons are custom SVGs from share-invite-presets.js */}
              <span innerHTML={provider.iconSvg} aria-hidden='true' />
              {t(provider.labelKey)}
            </Button>
          )}
        </For>
        <Button
          disabled={sharePending()}
          aria-label={t('contact.invite.share.label')}
          onClick={shareGeneric}
        >
          <Share2 size={20} />
        </Button>
        <Button
          disabled={sharePending()}
          aria-label={t('contact.invite.copy.label')}
          onClick={copyLink}
        >
          <Copy size={20} />
        </Button>
      </div>

      <hr class='border-border-primary' />

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
