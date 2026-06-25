// src/features/contacts/components/AddContactModal.tsx
//
// Minimal SolidJS port of add-contact-modal.js.
// The import-contacts section is mounted as a vanilla JS island via ref.
// TODO: Port import-contacts-component.js to SolidJS (ImportContactsSection.tsx)

import {
  createSignal,
  createEffect,
  For,
  Show,
  onMount,
  onCleanup,
} from 'solid-js';
import Modal from '../../../components/dialogs/Modal.js';
import styles from './AddContactModal.module.css';
import { Share2, Copy } from 'lucide-solid';
import { t as t_, useI18n } from '../../../shared/i18n/index.js';
import {
  getInviteShareProviders,
  shareInviteViaProvider,
} from '../../../shared/utils/share-invite-presets.js';
import {
  buildReferralLink,
  copyInviteLink,
  shareInvite,
} from '../../../shared/utils/share-invite.js';
import {
  getLoggedInUserId,
  getUser,
  requestGmailSendAccess,
} from '../../../auth/index.js';
import { inviteContactByEmail } from '../invites/manual-contact-invite.js';
import { sendContactInvite } from '../invites/send-contact-invite.js';
import {
  getAllContacts,
  hydrateContacts,
} from '../../../stores/contactsStore.js';
import {
  listOutgoingContactRequests,
  searchUsersByHandle,
} from '../../../stores/userDirectoryStore.js';
import { sendBulkEmailsViaGmail } from '../../../shared/utils/google/gmail-send.js';
import { filterImportableContacts } from '../import/import-contacts-utils.js';
import { createImportContactsComponent } from './import-contacts-component.js';
import { importGoogleContacts as importGoogleContactsFlow } from '../import/google-import.js';
import { createDebouncedAsyncAction } from './add-contact-modal.js';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../components/base-legacy/toast.js';

type StatusState = { text: string; type: string };
type DirectoryUser = {
  uid: string;
  displayName: string;
  username?: string | null;
};
type HandleInviteStatus = 'already_saved' | 'already_invited' | 'sent';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function openEmailComposeFallback(
  contacts: { email: string }[],
  userId: string,
) {
  const referralLink = buildReferralLink(userId);
  const currentUser = getUser();
  const senderName = currentUser?.displayName || 'A friend';
  const subject = encodeURIComponent(t_('contact.invite.subject'));
  const body = encodeURIComponent(
    t_('contact.invite.body', { name: senderName, link: referralLink }),
  );
  const rawTo = contacts.map((c) => c.email).join(',');
  const encodedTo = contacts.map((c) => encodeURIComponent(c.email)).join(',');
  const recipientParam =
    contacts.length === 1
      ? `to=${encodeURIComponent(contacts[0].email)}`
      : `bcc=${encodedTo}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&${recipientParam}&su=${subject}&body=${body}`;
  const opened = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  if (!opened) {
    const mailtoLink =
      contacts.length === 1
        ? `mailto:${encodeURIComponent(contacts[0].email)}?subject=${subject}&body=${body}`
        : `mailto:?bcc=${rawTo}&subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
}

export default function AddContactModal(props: Props) {
  const { t } = useI18n();
  const shareProviders = getInviteShareProviders();

  const [emailInput, setEmailInput] = createSignal('');
  const [emailSending, setEmailSending] = createSignal(false);
  const [handleInput, setHandleInput] = createSignal('');
  const [handleSearching, setHandleSearching] = createSignal(false);
  const [handleResults, setHandleResults] = createSignal<DirectoryUser[]>([]);
  const [handleInviteStatuses, setHandleInviteStatuses] = createSignal<
    Record<string, HandleInviteStatus>
  >({});
  const [requestingUserId, setRequestingUserId] = createSignal<string | null>(
    null,
  );
  const [status, setStatus] = createSignal<StatusState>({ text: '', type: '' });
  const [sharePending, setSharePending] = createSignal(false);

  let importContainerRef!: HTMLDivElement;
  let importComponent: ReturnType<typeof createImportContactsComponent> | null =
    null;
  let allContacts: unknown[] = [];

  onMount(() => {
    importComponent = createImportContactsComponent({
      onPlatformSelect: async (platform: string) => {
        if (platform === 'google') await handleGoogleContactsImport();
      },
      onSearchChange: (query: string) => {
        importComponent?.renderContacts(
          filterImportableContacts(allContacts, query),
        );
      },
      onInviteContact: async (contact: any) => {
        return sendContactInvite(contact.user.uid, contact.user.displayName);
      },
      onInviteSelected: async (contacts: any[]) => {
        let count = 0;
        let alreadyInvitedCount = 0;
        for (const contact of contacts) {
          const result = await sendContactInvite(
            contact.user.uid,
            contact.user.displayName,
          );
          if (result.status === 'sent') {
            count++;
            continue;
          }
          if (result.status === 'already_invited') {
            alreadyInvitedCount++;
            continue;
          }
          console.error(
            '[AddContactModal] Failed to invite:',
            contact.name,
            result.error,
          );
        }
        if (count === 0) {
          return {
            ok: false,
            status: alreadyInvitedCount > 0 ? 'already_invited' : 'failed',
            count,
            alreadyInvitedCount,
          };
        }
        if (count < contacts.length) {
          return { ok: true, status: 'partial', count, alreadyInvitedCount };
        }
        return { ok: true, status: 'sent', count };
      },
      onEmailSelected: async (contacts: any[]) => {
        try {
          const accessToken = await requestGmailSendAccess();
          const referralLink = buildReferralLink(getLoggedInUserId());
          const currentUser = getUser();
          const senderName = currentUser?.displayName || 'A friend';
          const subject = t('contact.invite.subject');
          const body = t('contact.invite.body', {
            name: senderName,
            link: referralLink,
          });
          const results = await sendBulkEmailsViaGmail(
            accessToken,
            contacts,
            subject,
            body,
          );
          if (results.sent > 0) {
            showSuccessToast(
              t('contact.invite.sent_emails', { count: results.sent }),
            );
          }
          if (results.failed > 0) {
            showErrorToast(t('contact.invite.failed_emails'));
            console.warn(
              `[AddContactModal] Partial failure - ${results.failed} emails failed:`,
              results.errors,
            );
          }
          return results.sent > 0
            ? { ok: true, status: 'sent', count: results.sent }
            : { ok: false, status: 'failed' };
        } catch (err: any) {
          console.error('[AddContactModal] Gmail send error:', err);
          if (err.message === 'Authorization cancelled') {
            showErrorToast(t('contact.invite.permission_denied'));
            openEmailComposeFallback(contacts, getLoggedInUserId()!);
            return { ok: false, status: 'permission_denied' };
          }
          showErrorToast(
            t('contact.invite.failed_detail', { error: err.message }),
          );
          return { ok: false, status: 'error' };
        }
      },
    });
    importContainerRef.appendChild(importComponent.element);
  });

  // Reset the vanilla island when the modal closes
  createEffect(() => {
    if (!props.open) {
      importComponent?.reset?.();
      allContacts = [];
      setHandleInput('');
      setHandleResults([]);
      setHandleInviteStatuses({});
      setStatus({ text: '', type: '' });
    }
  });

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
    { waitMs: 600, onPendingChange: setSharePending },
  );

  onCleanup(() => debouncedShare.cancel());

  async function runGenericShare() {
    setStatus({ text: t('contact.invite.share.opening'), type: 'loading' });
    const currentUser = getUser();
    const result = await shareInvite({
      senderName: currentUser?.displayName,
      userId: getLoggedInUserId(),
    });
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
    const cfg = statusConfig[safe];
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
    const currentUser = getUser();
    const result = await shareInviteViaProvider({
      providerId: providerId as 'whatsapp' | 'telegram',
      senderName: currentUser?.displayName,
      userId: getLoggedInUserId(),
    });
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
      console.error('[AddContactModal] Share error:', err);
      showErrorToast(t('contact.invite.share.copy_failed'));
      setStatus({ text: t('contact.invite.share.copy_failed'), type: 'error' });
    }
  }

  // --- Manual email invite ---

  async function handleManualEmailInvite() {
    const email = emailInput().trim().toLowerCase();
    if (!email) return;
    setEmailSending(true);
    setStatus({ text: '', type: '' });

    const result = await inviteContactByEmail(email, {
      onNotFound: async () =>
        openEmailComposeFallback([{ email }], getLoggedInUserId()!),
    });

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
        '[AddContactModal] Manual email invite error:',
        (result as any).error,
      );
      setStatus({ text: t('contact.add.email_error'), type: 'error' });
    }

    setEmailSending(false);
  }

  async function handleSearchByHandle() {
    const handle = handleInput().trim().replace(/^@+/, '');
    if (!handle) return;
    setHandleSearching(true);
    setHandleResults([]);
    setStatus({ text: '', type: '' });
    try {
      await hydrateContacts().catch((error) => {
        console.warn('[AddContactModal] Contact hydration before search failed:', error);
      });
      const [users, outgoingRequests] = await Promise.all([
        searchUsersByHandle(handle),
        listOutgoingContactRequests().catch((error) => {
          console.warn('[AddContactModal] Outgoing contact requests lookup failed:', error);
          return [];
        }),
      ]);
      const contacts = getAllContacts();
      const outgoingIds = new Set(outgoingRequests.map((request) => request.toId));
      setHandleResults(users as DirectoryUser[]);
      setHandleInviteStatuses(
        Object.fromEntries(
          users.flatMap((user: DirectoryUser) => {
            if (contacts?.[user.uid]) return [[user.uid, 'already_saved']];
            if (outgoingIds.has(user.uid)) return [[user.uid, 'already_invited']];
            return [];
          }),
        ),
      );
      if (users.length === 0) {
        setStatus({ text: t('contact.add.handle_not_found'), type: 'info' });
      }
    } catch (error) {
      console.error('[AddContactModal] Handle search error:', error);
      setStatus({ text: t('contact.add.lookup_error'), type: 'error' });
    } finally {
      setHandleSearching(false);
    }
  }

  async function handleSendRequest(user: DirectoryUser) {
    if (!user?.uid || requestingUserId()) return;
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
      console.error('[AddContactModal] Contact request error:', error);
      setStatus({ text: t('contact.add.email_error'), type: 'error' });
    } finally {
      setRequestingUserId(null);
    }
  }

  // --- Google contacts import ---

  async function handleGoogleContactsImport() {
    importComponent?.prepareForImport();
    allContacts = [];

    const result = await importGoogleContactsFlow({
      onProgress: ({ step, count }: { step: string; count?: number }) => {
        if (step === 'requesting') {
          importComponent?.setStatus(t('contact.import.requesting'), 'loading');
          return;
        }
        if (step === 'fetching') {
          importComponent?.setStatus(t('contact.import.fetching'), 'loading');
          return;
        }
        if (step === 'checking') {
          importComponent?.setStatus(
            t('contact.import.found_checking', { count: count ?? 0 }),
            'loading',
          );
        }
      },
    });

    if (result.status === 'success') {
      allContacts = result.contacts;
      importComponent?.setStatus(
        t('contact.import.found', { count: allContacts.length }),
        'success',
      );
      importComponent?.renderContacts(allContacts);
      return;
    }
    if (result.status === 'no_email') {
      importComponent?.setStatus(t('contact.import.no_email'), 'not-found');
      importComponent?.renderEmptyState(t('contact.import.none'));
      return;
    }
    if (result.status === 'cancelled') {
      importComponent?.setStatus(t('contact.import.cancelled'), 'cancelled');
      importComponent?.renderEmptyState(t('contact.import.failed'));
      return;
    }
    const importErr =
      result.status === 'error' ? (result.error as any) : undefined;
    console.error('[AddContactModal] Import error:', importErr);
    importComponent?.setStatus(
      t('contact.import.error', { error: importErr?.message }),
      'error',
    );
    importComponent?.renderEmptyState(t('contact.import.failed'));
  }

  return (
    <Modal
      open={props.open}
      onOpenChange={props.onOpenChange}
      title={t('contact.add.title')}
    >
      <div class={styles.directActions}>
        <div class={styles.manualEmailRow}>
          <input
            type='text'
            value={handleInput()}
            onInput={(e) => setHandleInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !handleSearching())
                handleSearchByHandle();
            }}
            placeholder={t('contact.add.enter_handle')}
            aria-label={t('contact.add.enter_handle')}
            autocomplete='off'
            autocapitalize='none'
          />
          <button
            type='button'
            class={styles.sharePresetBtn}
            disabled={handleSearching()}
            onClick={handleSearchByHandle}
          >
            {handleSearching() ? t('shared.searching') : t('shared.search')}
          </button>
        </div>

        <Show when={handleResults().length > 0}>
          <div class={styles.handleResults}>
            <For each={handleResults()}>
              {(user) => {
                const inviteStatus = () => handleInviteStatuses()[user.uid];
                const inviteLabel = () => {
                  if (requestingUserId() === user.uid)
                    return t('shared.sending');
                  if (inviteStatus() === 'already_saved')
                    return t('contact.add.already_saved');
                  if (inviteStatus() === 'already_invited')
                    return t('contact.add.already_invited');
                  if (inviteStatus() === 'sent')
                    return `✓ ${t('contact.invite.sent_one')}`;
                  return t('contact.invite');
                };
                return (
                  <div class={styles.handleResult}>
                    <span>
                      {user.displayName}
                      <Show when={user.username}>
                        <small>@{user.username}</small>
                      </Show>
                    </span>
                    <button
                      type='button'
                      class={styles.sharePresetBtn}
                      disabled={
                        requestingUserId() === user.uid ||
                        Boolean(inviteStatus())
                      }
                      onClick={() => handleSendRequest(user)}
                    >
                      {inviteLabel()}
                    </button>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>

        <div class={styles.manualEmailRow}>
          <input
            type='email'
            value={emailInput()}
            onInput={(e) => setEmailInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !emailSending())
                handleManualEmailInvite();
            }}
            placeholder={t('contact.add.enter_email')}
            aria-label={t('contact.add.enter_email')}
            autocomplete='email'
          />
          <button
            type='button'
            class={styles.sharePresetBtn}
            disabled={emailSending()}
            onClick={handleManualEmailInvite}
          >
            {emailSending() ? t('shared.sending') : t('contact.invite')}
          </button>
        </div>

        <div
          class={styles.sharePresetsRow}
          role='group'
          aria-label={t('contact.invite.share.presets_label')}
        >
          <For each={shareProviders}>
            {(provider) => (
              <button
                type='button'
                class={styles.sharePresetBtn}
                disabled={sharePending()}
                aria-label={t(provider.labelKey)}
                title={t(provider.labelKey)}
                onClick={() => handleShareAction('provider', provider.id)}
              >
                {/* Provider icons are custom SVGs from share-invite-presets.js */}
                <span innerHTML={provider.iconSvg} aria-hidden='true' />
                <span>{t(provider.labelKey)}</span>
              </button>
            )}
          </For>

          <button
            type='button'
            class={styles.sharePresetBtn}
            disabled={sharePending()}
            aria-label={t('contact.invite.share.label')}
            onClick={() => handleShareAction('generic')}
          >
            <Share2 size={20} />
          </button>

          <button
            type='button'
            class={styles.sharePresetBtn}
            disabled={sharePending()}
            aria-label={t('contact.invite.copy.label')}
            onClick={() => handleShareAction('copy')}
          >
            <Copy size={20} />
          </button>
        </div>
      </div>

      <hr class={styles.divider} />

      {/* Vanilla JS island — replace with ImportContactsSection.tsx when ported */}
      <div ref={importContainerRef} />

      <div
        class={`${styles.importStatus}${status().type ? ` ${status().type}` : ''}`}
        role='status'
        aria-live='polite'
      >
        {status().text}
      </div>
    </Modal>
  );
}
