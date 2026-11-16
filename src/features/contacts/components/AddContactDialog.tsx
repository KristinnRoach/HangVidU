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

type StatusState = { text: string; type: string };
type HandleInviteStatus =
  | 'already_saved'
  | 'already_invited'
  | 'incoming_pending'
  | 'sent';

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
  const [status, setStatus] = createSignal<StatusState>({ text: '', type: '' });
  const [sharePending, setSharePending] = createSignal(false);

  // --- Share actions ---

  const debouncedShare = createDebouncedAsyncAction(
    async ({
      type,
      providerId,
    }: {
      type: 'generic' | 'copy' | 'provider';
      providerId?: string;
    }) => {
      if (type === 'generic') return runGenericShare();
      if (type === 'copy') return runCopyLink();
      return runPresetShare(providerId!);
    },
    {
      waitMs: 600,
      onPendingChange: (value) => {
        if (isCurrent()) setSharePending(value);
      },
    },
  );

  onCleanup(() => debouncedShare.cancel());

  async function runGenericShare() {
    setStatus({ text: t('contact.invite.share.opening'), type: 'loading' });
    const result = await shareInvite({
      senderName: senderName(),
      userId: getLoggedInUserId(),
    });
    if (!isCurrent()) return result;
    const statusConfig: Record<
      string,
      { toast: ((msg: string) => void) | null; type: string }
    > = {
      opened_elsewhere: { toast: null, type: 'info' },
      copied: { toast: showSuccessToast, type: 'success' },
      cancelled: { toast: null, type: 'cancelled' },
      copy_failed: { toast: showErrorToast, type: 'error' },
    };
    const safe = Object.hasOwn(statusConfig, result.status)
      ? result.status
      : 'copy_failed';
    const cfg = statusConfig[safe] ?? { toast: showErrorToast, type: 'error' };
    const key = `contact.invite.share.${safe}`;
    cfg.toast?.(t(key));
    setStatus({ text: t(key), type: cfg.type });
    return result;
  }

  async function runPresetShare(providerId: string) {
    const provider = shareProviders.find((p) => p.id === providerId);
    if (!provider) throw new Error(`Unsupported provider: ${providerId}`);
    const providerLabel = t(provider.labelKey);
    setStatus({
      text: t('contact.invite.share.provider_opening', {
        provider: providerLabel,
      }),
      type: 'loading',
    });
    const result = await shareInviteViaProvider({
      providerId: providerId as 'whatsapp' | 'telegram',
      senderName: senderName(),
      userId: getLoggedInUserId(),
    });
    if (!isCurrent()) return result;
    if (result.status === 'opened') {
      setStatus({
        text: t('contact.invite.share.provider_opened', {
          provider: providerLabel,
        }),
        type: 'info',
      });
      return result;
    }
    if (result.status === 'copied') {
      const msg = t('contact.invite.share.provider_copied', {
        provider: providerLabel,
      });
      showSuccessToast(msg);
      setStatus({ text: msg, type: 'success' });
      return result;
    }
    // copy_failed fallthrough
    showErrorToast(t('contact.invite.share.copy_failed'));
    setStatus({ text: t('contact.invite.share.copy_failed'), type: 'error' });
    return result;
  }

  async function runCopyLink() {
    setStatus({ text: t('contact.invite.copying'), type: 'loading' });
    const result = await copyInviteLink({
      userId: getLoggedInUserId() as string,
    });
    if (!isCurrent()) return result;
    if (result.status === 'copied') {
      showSuccessToast(t('contact.invite.share.copied'));
      setStatus({ text: t('contact.invite.share.copied'), type: 'success' });
      return result;
    }
    showErrorToast(t('contact.invite.share.copy_failed'));
    setStatus({ text: t('contact.invite.share.copy_failed'), type: 'error' });
    return result;
  }

  async function handleShareAction(
    type: 'generic' | 'copy' | 'provider',
    providerId?: string,
  ) {
    try {
      await debouncedShare({ type, providerId });
    } catch (err) {
      if (!isCurrent()) return;
      console.error('[AddContactDialog] Share error:', err);
      showErrorToast(t('contact.invite.share.copy_failed'));
      setStatus({ text: t('contact.invite.share.copy_failed'), type: 'error' });
    }
  }

  // --- Manual email invite ---

  async function handleManualEmailInvite() {
    const email = emailInput().trim().toLowerCase();
    if (!email || emailSending() || !isCurrent()) return;
    setEmailInput(email);
    setEmailSending(true);
    setStatus({ text: '', type: '' });

    const result = await inviteContactByEmail(email, {
      isCurrent,
      onNotFound: () =>
        openEmailComposeFallback([{ email }], userId!, senderName()),
    });

    if (!isCurrent()) return;
    if (result.status === 'sent') {
      showSuccessToast(t('contact.invite.sent_one'));
      setStatus({ text: `✓ ${t('contact.invite.sent_one')}`, type: 'success' });
    } else if (result.status === 'not_found') {
      setStatus({ text: t('contact.add.not_found_emailing'), type: 'info' });
    } else if (result.status === 'self') {
      setStatus({ text: t('contact.add.self_error'), type: 'error' });
    } else if (result.status === 'already_saved') {
      setStatus({ text: t('contact.add.already_saved'), type: 'info' });
    } else if (result.status === 'already_invited') {
      setStatus({ text: t('contact.add.already_invited'), type: 'info' });
    } else if (result.status === 'permission_denied') {
      setStatus({ text: t('contact.invite.permission_denied'), type: 'error' });
    } else if (result.status === 'lookup_error') {
      setStatus({ text: t('contact.add.lookup_error'), type: 'error' });
    } else {
      console.error(
        '[AddContactDialog] Manual email invite error:',
        (result as any).error,
      );
      setStatus({ text: t('contact.add.email_error'), type: 'error' });
    }

    setEmailSending(false);
  }

  async function handleSearchByHandle() {
    if (handleSearching() || !isCurrent()) return;
    const handle = handleInput().trim().replace(/^@+/, '');
    setStatus({ text: '', type: '' });
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
        setStatus({ text: t('contact.add.handle_not_found'), type: 'info' });
      }
    } catch (error) {
      if (!isCurrent()) return;
      setHandleResults([]);
      setHandleInviteStatuses({});
      console.error('[AddContactDialog] Handle search error:', error);
      setStatus({ text: t('contact.add.lookup_error'), type: 'error' });
    } finally {
      if (isCurrent()) setHandleSearching(false);
    }
  }

  async function handleSendRequest(user: UserSearchResult) {
    if (!user?.uid || handleSearching() || requestingUserId() || !isCurrent())
      return;
    if (user.uid === getLoggedInUserId()) {
      setStatus({ text: t('contact.add.self_error'), type: 'error' });
      return;
    }
    setRequestingUserId(user.uid);
    setStatus({ text: '', type: '' });
    try {
      if (handleInviteStatuses()[user.uid] === 'already_saved') {
        setStatus({ text: t('contact.add.already_saved'), type: 'info' });
        return;
      }
      const result = await sendContactInvite(user.uid, user.displayName);
      if (!isCurrent()) return;
      if (result.status === 'already_invited') {
        setHandleInviteStatuses((statuses) => ({
          ...statuses,
          [user.uid]: 'already_invited',
        }));
        setStatus({ text: t('contact.add.already_invited'), type: 'info' });
        return;
      }
      if (result.status !== 'sent') {
        setStatus({ text: t('contact.add.email_error'), type: 'error' });
        return;
      }
      setHandleInviteStatuses((statuses) => ({
        ...statuses,
        [user.uid]: 'sent',
      }));
      showSuccessToast(t('contact.invite.sent_one'));
      setStatus({ text: `✓ ${t('contact.invite.sent_one')}`, type: 'success' });
    } catch (error) {
      if (!isCurrent()) return;
      console.error('[AddContactDialog] Contact request error:', error);
      setStatus({ text: t('contact.add.email_error'), type: 'error' });
    } finally {
      if (isCurrent()) setRequestingUserId(null);
    }
  }

  const statusTone = () =>
    ({ success: 'text-success', error: 'text-danger', loading: 'opacity-70' })[
      status().type
    ] ?? '';

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
                if (requestingUserId() === user.uid) return t('shared.sending');
                if (inviteStatus() === 'already_saved')
                  return t('contact.add.already_saved');
                if (inviteStatus() === 'already_invited')
                  return t('contact.add.already_invited');
                if (inviteStatus() === 'incoming_pending')
                  return t('contact.add.invited_you');
                if (inviteStatus() === 'sent')
                  return `✓ ${t('contact.invite.sent_one')}`;
                return t('contact.invite');
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
              onClick={() => handleShareAction('provider', provider.id)}
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
          onClick={() => handleShareAction('generic')}
        >
          <Share2 size={20} />
        </Button>
        <Button
          disabled={sharePending()}
          aria-label={t('contact.invite.copy.label')}
          onClick={() => handleShareAction('copy')}
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
