// src/contacts/components/add-contact-modal.js

// Modal for adding contacts by email or importing from Google

import {
  requestGmailSendAccess,
  getLoggedInUserId,
  getUser,
  getIsLoggedIn,
} from '../../auth/index.js';
import {
  buildReferralLink,
  copyInviteLink,
  shareInvite,
} from '../../shared/utils/share-invite.js';
import {
  getInviteShareProviders,
  shareInviteViaProvider,
} from '../../shared/utils/share-invite-presets.js';
import { t } from '../../shared/i18n/index.js';
import { escapeHtml } from '../../shared/utils/ui-utils/dom-utils.js';
import { showErrorToast, showSuccessToast } from '../../components/base-legacy/toast.js';
import { sendBulkEmailsViaGmail } from '../../shared/utils/google/gmail-send.js';
import { filterImportableContacts } from '../import-contacts-utils.js';
import { createImportContactsComponent } from './import-contacts-component.js';
import { importGoogleContacts as importGoogleContactsFlow } from '../google-import.js';
import { inviteContactByEmail } from '../manual-contact-invite.js';
import { sendContactInvite } from '../send-contact-invite.js';

// TODO: WIP decoupling considerations:
// This modal mixes feature UI with auth/OAuth and external contact-import side effects.
// Keep the UI here, but push reusable import/auth orchestration down before standardizing the pattern.

// ! Note - vanilla js icons currently missing

const APP_ORIGIN = import.meta.env.VITE_APP_URL || window.location.origin;

/**
 * Open Gmail compose (preferred) or mailto: as fallback for emailing invite links.
 */
function openEmailComposeFallback(contacts) {
  const referralLink = buildReferralLink(getLoggedInUserId(), APP_ORIGIN);

  const currentUser = getUser();
  const senderName = currentUser?.userName || 'A friend';

  const subject = encodeURIComponent(t('contact.invite.subject'));
  const body = encodeURIComponent(
    t('contact.invite.body', { name: senderName, link: referralLink }),
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

/**
 * Show a modal to add contacts with platform selection and search.
 * @returns {Promise<void>}
 */
export async function showAddContactModal() {
  // For now, only available for logged-in users
  if (!getIsLoggedIn()) {
    showErrorToast(t('contact.add.login_required'));
    return;
  }

  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('add-contact-modal');
    const shareProviders = getInviteShareProviders();
    const providerButtons = shareProviders
      .map((provider) => {
        const label = t(provider.labelKey);
        return `
        <button
          type="button"
          class="share-preset-btn"
          data-provider-id="${provider.id}"
          aria-label="${escapeHtml(label)}"
          title="${escapeHtml(label)}"
        >
          ${provider.iconSvg}
          <span>${escapeHtml(label)}</span>
        </button>
      `;
      })
      .join('');

    dialog.innerHTML = `
      <button type="button" data-action="cancel" class="close-btn" aria-label="Close">×</button>

      <h2>${t('contact.add.title')}</h2>

      <div class="direct-actions">
        <div class="manual-email-row">
          <input type="email" id="manual-email-input"
                 placeholder="${escapeHtml(t('contact.add.enter_email'))}"
                 aria-label="${escapeHtml(t('contact.add.enter_email'))}"
                 autocomplete="email" />
          <button type="button" id="manual-email-send" class="action-btn manual-email-send">
            ${escapeHtml(t('contact.invite'))}
          </button>
        </div>

        <div class="share-presets-row" role="group" aria-label="${escapeHtml(t('contact.invite.share.presets_label'))}">
          ${providerButtons}
          <button type="button" id="share-btn" class="share-preset-btn share-btn" aria-label="${escapeHtml(t('contact.invite.share.label'))}">
            <i data-lucide="share"></i>
          </button>
          <button type="button" id="copy-link-btn" class="share-preset-btn copy-link-btn" aria-label="${escapeHtml(t('contact.invite.copy.label'))}">
            <i data-lucide="copy"></i>
          </button>
        </div>
      </div>

      <hr class="divider" />

      <div id="manual-email-status" class="import-status" role="status" aria-live="polite"></div>
    `;

    const cancelBtn = dialog.querySelector('[data-action="cancel"]');
    const manualEmailInput = dialog.querySelector('#manual-email-input');
    const manualEmailSendBtn = dialog.querySelector('#manual-email-send');
    const manualEmailStatus = dialog.querySelector('#manual-email-status');
    const shareBtn = dialog.querySelector('#share-btn');
    const copyLinkBtn = dialog.querySelector('#copy-link-btn');
    const providerPresetButtons = Array.from(
      dialog.querySelectorAll('.share-preset-btn[data-provider-id]'),
    );
    const providerById = new Map(
      shareProviders.map((provider) => [provider.id, provider]),
    );

    let allContacts = [];
    const importContactsComponent = createImportContactsComponent({
      onPlatformSelect: async (platform) => {
        if (platform === 'google') {
          await handleGoogleContactsImport();
        }
      },
      onSearchChange: (query) => {
        importContactsComponent.renderContacts(
          filterImportableContacts(allContacts, query),
        );
      },
      onInviteContact: async (contact) => {
        return await sendContactInvite(contact.user.uid, contact.user.userName);
      },
      onInviteSelected: async (contacts) => {
        let count = 0;
        let alreadyInvitedCount = 0;

        for (const contact of contacts) {
          const result = await sendContactInvite(
            contact.user.uid,
            contact.user.userName,
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
            '[ADD CONTACT] Failed to invite:',
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
          return {
            ok: true,
            status: 'partial',
            count,
            alreadyInvitedCount,
          };
        }

        return { ok: true, status: 'sent', count };
      },
      onEmailSelected: async (contacts) => {
        try {
          const accessToken = await requestGmailSendAccess();
          const referralLink = buildReferralLink(
            getLoggedInUserId(),
            APP_ORIGIN,
          );
          const currentUser = getUser();
          const senderName = currentUser?.userName || 'A friend';
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
              { containerEl: dialog },
            );
          }

          if (results.failed > 0) {
            showErrorToast(t('contact.invite.failed_emails'), {
              containerEl: dialog,
            });
            console.warn(
              `[ADD CONTACT] Partial failure - ${results.failed} emails failed:`,
              results.errors,
            );
          }

          if (results.sent > 0) {
            return { ok: true, status: 'sent', count: results.sent };
          }

          return { ok: false, status: 'failed' };
        } catch (err) {
          console.error('[ADD CONTACT] Gmail send error:', err);

          if (err.message === 'Authorization cancelled') {
            showErrorToast(t('contact.invite.permission_denied'), {
              containerEl: dialog,
            });
            openEmailComposeFallback(contacts);
            return { ok: false, status: 'permission_denied' };
          }

          showErrorToast(
            t('contact.invite.failed_detail', { error: err.message }),
            { containerEl: dialog },
          );
          return { ok: false, status: 'error' };
        }
      },
    });
    dialog.insertBefore(importContactsComponent.element, manualEmailStatus);

    function cleanup() {
      runDebouncedShareAction?.cancel();
      dialog.close();
      dialog.remove();
      resolve();
    }

    cancelBtn.addEventListener('click', cleanup);
    dialog.addEventListener('cancel', cleanup);

    // --- Manual email invite ---

    async function handleManualEmailInvite() {
      const email = manualEmailInput.value.trim().toLowerCase();
      if (!email) return;

      manualEmailInput.value = email;
      if (!manualEmailInput.checkValidity()) {
        manualEmailInput.reportValidity();
        return;
      }

      manualEmailSendBtn.disabled = true;
      manualEmailSendBtn.textContent = t('shared.sending');
      manualEmailStatus.textContent = '';
      manualEmailStatus.className = 'import-status';

      const result = await inviteContactByEmail(email, {
        onNotFound: async () => {
          openEmailComposeFallback([{ email }]);
        },
      });

      if (result.status === 'sent') {
        manualEmailStatus.textContent = `✓ ${t('contact.invite.sent_one')}`;
        manualEmailStatus.className = 'import-status success';
        showSuccessToast(t('contact.invite.sent_one'), {
          containerEl: dialog,
        });
      } else if (result.status === 'not_found') {
        manualEmailStatus.textContent = t('contact.add.not_found_emailing');
        manualEmailStatus.className = 'import-status info';
      } else if (result.status === 'self') {
        manualEmailStatus.textContent = t('contact.add.self_error');
        manualEmailStatus.className = 'import-status error';
      } else if (result.status === 'already_saved') {
        manualEmailStatus.textContent = t('contact.add.already_saved');
        manualEmailStatus.className = 'import-status info';
      } else if (result.status === 'already_invited') {
        manualEmailStatus.textContent = t('contact.add.already_invited');
        manualEmailStatus.className = 'import-status info';
      } else if (result.status === 'permission_denied') {
        manualEmailStatus.textContent = t('contact.invite.permission_denied');
        manualEmailStatus.className = 'import-status error';
      } else if (result.status === 'lookup_error') {
        manualEmailStatus.textContent = t('contact.add.lookup_error');
        manualEmailStatus.className = 'import-status error';
      } else {
        console.error('[ADD CONTACT] Manual email invite error:', result.error);
        manualEmailStatus.textContent = t('contact.add.email_error');
        manualEmailStatus.className = 'import-status error';
      }

      manualEmailSendBtn.disabled = false;
      manualEmailSendBtn.textContent = t('contact.invite');
    }

    manualEmailSendBtn.addEventListener('click', handleManualEmailInvite);
    manualEmailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !manualEmailSendBtn.disabled) {
        handleManualEmailInvite();
      }
    });

    function setShareButtonsDisabled(isDisabled) {
      shareBtn.disabled = isDisabled;
      copyLinkBtn.disabled = isDisabled;
      providerPresetButtons.forEach((btn) => {
        btn.disabled = isDisabled;
      });
    }

    async function runGenericShare() {
      manualEmailStatus.textContent = t('contact.invite.share.opening');
      manualEmailStatus.className = 'import-status loading';
      const currentUser = getUser();

      const result = await shareInvite({
        senderName: currentUser?.userName,
        userId: getLoggedInUserId(),
      });

      const statusConfig = {
        opened_elsewhere: { toast: null, className: 'info' },
        copied: { toast: showSuccessToast, className: 'success' },
        cancelled: { toast: null, className: 'cancelled' },
        copy_failed: { toast: showErrorToast, className: 'error' },
      };

      const safeStatus = Object.hasOwn(statusConfig, result.status)
        ? result.status
        : 'copy_failed';
      const config = statusConfig[safeStatus];
      const key = `contact.invite.share.${safeStatus}`;

      if (config.toast) {
        config.toast(t(key), { containerEl: dialog });
      }
      manualEmailStatus.textContent = t(key);
      manualEmailStatus.className = `import-status ${config.className}`;
      return result;
    }

    async function runPresetShare(providerId) {
      const provider = providerById.get(providerId);
      if (!provider) {
        throw new Error(`Unsupported provider: ${providerId}`);
      }

      const providerLabel = t(provider.labelKey);
      manualEmailStatus.textContent = t(
        'contact.invite.share.provider_opening',
        {
          provider: providerLabel,
        },
      );
      manualEmailStatus.className = 'import-status loading';

      const currentUser = getUser();
      const result = await shareInviteViaProvider({
        providerId,
        senderName: currentUser?.userName,
        userId: getLoggedInUserId(),
      });

      if (result.status === 'opened') {
        manualEmailStatus.textContent = t(
          'contact.invite.share.provider_opened',
          {
            provider: providerLabel,
          },
        );
        manualEmailStatus.className = 'import-status info';
        return result;
      }

      if (result.status === 'copied') {
        const message = t('contact.invite.share.provider_copied', {
          provider: providerLabel,
        });
        showSuccessToast(message, { containerEl: dialog });
        manualEmailStatus.textContent = message;
        manualEmailStatus.className = 'import-status success';
        return result;
      }

      if (result.status === 'cancelled') {
        manualEmailStatus.textContent = t('contact.invite.share.cancelled');
        manualEmailStatus.className = 'import-status cancelled';
        return result;
      }

      showErrorToast(t('contact.invite.share.copy_failed'), {
        containerEl: dialog,
      });
      manualEmailStatus.textContent = t('contact.invite.share.copy_failed');
      manualEmailStatus.className = 'import-status error';
      return result;
    }

    async function runCopyLink() {
      manualEmailStatus.textContent = t('contact.invite.copying');
      manualEmailStatus.className = 'import-status loading';

      const result = await copyInviteLink({
        userId: getLoggedInUserId(),
      });

      if (result.status === 'copied') {
        showSuccessToast(t('contact.invite.share.copied'), {
          containerEl: dialog,
        });
        manualEmailStatus.textContent = t('contact.invite.share.copied');
        manualEmailStatus.className = 'import-status success';
        return result;
      }

      showErrorToast(t('contact.invite.share.copy_failed'), {
        containerEl: dialog,
      });
      manualEmailStatus.textContent = t('contact.invite.share.copy_failed');
      manualEmailStatus.className = 'import-status error';
      return result;
    }

    const runDebouncedShareAction = createDebouncedAsyncAction(
      async ({ type, providerId }) => {
        if (type === 'generic') {
          return runGenericShare();
        }
        if (type === 'copy') {
          return runCopyLink();
        }
        return runPresetShare(providerId);
      },
      {
        waitMs: 600,
        onPendingChange: setShareButtonsDisabled,
      },
    );

    // --- Share actions (generic + provider presets) ---
    shareBtn.addEventListener('click', async () => {
      try {
        await runDebouncedShareAction({ type: 'generic' });
      } catch (error) {
        console.error('[ADD CONTACT] Web Share invite error:', error);
        showErrorToast(t('contact.invite.share.copy_failed'), {
          containerEl: dialog,
        });
        manualEmailStatus.textContent = t('contact.invite.share.copy_failed');
        manualEmailStatus.className = 'import-status error';
      }
    });

    copyLinkBtn.addEventListener('click', async () => {
      try {
        await runDebouncedShareAction({ type: 'copy' });
      } catch (error) {
        console.error('[ADD CONTACT] Copy invite link error:', error);
        showErrorToast(t('contact.invite.share.copy_failed'), {
          containerEl: dialog,
        });
        manualEmailStatus.textContent = t('contact.invite.share.copy_failed');
        manualEmailStatus.className = 'import-status error';
      }
    });

    providerPresetButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const providerId = btn.getAttribute('data-provider-id');
        try {
          await runDebouncedShareAction({
            type: 'provider',
            providerId,
          });
        } catch (error) {
          console.error('[ADD CONTACT] Preset share invite error:', error);
          showErrorToast(t('contact.invite.share.copy_failed'), {
            containerEl: dialog,
          });
          manualEmailStatus.textContent = t('contact.invite.share.copy_failed');
          manualEmailStatus.className = 'import-status error';
        }
      });
    });

    // --- Google Contacts import ---
    // Must be called from a user click so the browser allows the OAuth popup.

    async function handleGoogleContactsImport() {
      importContactsComponent.prepareForImport();
      allContacts = [];

      const result = await importGoogleContactsFlow({
        onProgress: ({ step, count }) => {
          if (step === 'requesting') {
            importContactsComponent.setStatus(
              t('contact.import.requesting'),
              'loading',
            );
            return;
          }

          if (step === 'fetching') {
            importContactsComponent.setStatus(
              t('contact.import.fetching'),
              'loading',
            );
            return;
          }

          if (step === 'checking') {
            importContactsComponent.setStatus(
              t('contact.import.found_checking', {
                count,
              }),
              'loading',
            );
          }
        },
      });

      if (result.status === 'success') {
        allContacts = result.contacts;
        importContactsComponent.setStatus(
          t('contact.import.found', {
            count: allContacts.length,
          }),
          'success',
        );
        importContactsComponent.renderContacts(allContacts);
        return;
      }

      if (result.status === 'no_email') {
        importContactsComponent.setStatus(
          t('contact.import.no_email'),
          'not-found',
        );
        importContactsComponent.renderEmptyState(t('contact.import.none'));
        return;
      }

      if (result.status === 'cancelled') {
        importContactsComponent.setStatus(
          t('contact.import.cancelled'),
          'cancelled',
        );
        importContactsComponent.renderEmptyState(t('contact.import.failed'));
        return;
      }

      console.error('[ADD CONTACT] Import error:', result.error);
      importContactsComponent.setStatus(
        t('contact.import.error', {
          error: result.error?.message,
        }),
        'error',
      );
      importContactsComponent.renderEmptyState(t('contact.import.failed'));
    }

    document.body.appendChild(dialog);
    dialog.showModal();
  });
}

/**
 * Create an async action wrapper that runs immediately on first call,
 * then suppresses repeated calls while in-flight and during cooldown.
 *
 * @param {(...args: any[]) => Promise<any>} action
 * @param {{ waitMs?: number, onPendingChange?: ((isPending: boolean) => void) | null }} [options]
 * @returns {((...args: any[]) => Promise<any>) & { isPending: () => boolean, cancel: () => void }}
 */
export function createDebouncedAsyncAction(action, options = {}) {
  const waitMs =
    typeof options.waitMs === 'number' && options.waitMs >= 0
      ? options.waitMs
      : 500;
  const onPendingChange =
    typeof options.onPendingChange === 'function'
      ? options.onPendingChange
      : null;

  let isPending = false;
  let cooldownTimer = null;

  function setPending(nextValue) {
    if (isPending === nextValue) return;
    isPending = nextValue;
    onPendingChange?.(isPending);
  }

  const wrapped = async (...args) => {
    if (isPending) {
      return { ok: false, status: 'debounced' };
    }

    setPending(true);
    try {
      return await action(...args);
    } finally {
      if (cooldownTimer) {
        clearTimeout(cooldownTimer);
      }
      cooldownTimer = setTimeout(() => {
        cooldownTimer = null;
        setPending(false);
      }, waitMs);
    }
  };

  wrapped.isPending = () => isPending;
  wrapped.cancel = () => {
    if (cooldownTimer) {
      clearTimeout(cooldownTimer);
      cooldownTimer = null;
    }
    setPending(false);
  };

  return wrapped;
}
