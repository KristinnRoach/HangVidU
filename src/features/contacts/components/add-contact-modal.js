// src/contacts/components/add-contact-modal.js

// Modal for adding contacts by email or importing from Google

import {
  requestGmailSendAccess,
  getLoggedInUserId,
  getUser,
  getIsLoggedIn,
} from '../../../auth/index.js';
import { buildReferralLink, shareInvite } from '../share-invite.js';
import { t } from '../../../shared/i18n/index.js';
import { initIcons } from '../../../shared/components/ui/icons.js';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../shared/components/toast.js';
import { sendBulkEmailsViaGmail } from '../gmail-send.js';
import { filterImportableContacts } from '../import-contacts-utils.js';
import { createImportContactsComponent } from './import-contacts-component.js';
import { importGoogleContacts as importGoogleContactsFlow } from '../google-import.js';
import { inviteContactByEmail } from '../manual-contact-invite.js';
import { sendContactInvite } from '../send-contact-invite.js';

// TODO: WIP decoupling considerations:
// This modal mixes feature UI with auth/OAuth and external contact-import side effects.
// Keep the UI here, but push reusable import/auth orchestration down before standardizing the pattern.

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
        ? `mailto:${contacts[0].email}?subject=${subject}&body=${body}`
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

    dialog.innerHTML = `
      <button type="button" data-action="cancel" class="close-btn" aria-label="Close">×</button>

      <h2>${t('contact.add.title')}</h2>

      <div class="direct-actions">
        <div class="manual-email-row">
          <input type="email" id="manual-email-input"
                 placeholder="${t('contact.add.enter_email')}"
                 aria-label="${t('contact.add.enter_email')}"
                 autocomplete="email" />
          <button type="button" id="manual-email-send" class="action-btn">
            ${t('contact.invite')}
          </button>
        </div>

        <button type="button" id="share-btn" class="action-btn secondary share-btn" aria-label="${t('contact.invite.share.label')}">
          <i data-lucide="share"></i>
        </button>

      </div>

      <hr class="divider" />

      <div id="manual-email-status" class="import-status" role="status" aria-live="polite"></div>
    `;

    const cancelBtn = dialog.querySelector('[data-action="cancel"]');
    const manualEmailInput = dialog.querySelector('#manual-email-input');
    const manualEmailSendBtn = dialog.querySelector('#manual-email-send');
    const manualEmailStatus = dialog.querySelector('#manual-email-status');
    const shareBtn = dialog.querySelector('#share-btn');

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
      } else {
        console.error('[ADD CONTACT] Manual email invite error:', result.error);
        manualEmailStatus.textContent = t('contact.add.email_error');
        manualEmailStatus.className = 'import-status error';
      }

      // TODO: Pre-check whether an invite already exists instead of relying on PERMISSION_DENIED.
      // The RTDB rule blocks duplicate writes (!data.exists()), so this works, but a read-first
      // approach would be cleaner and let us distinguish "already sent" from real errors.
      manualEmailSendBtn.disabled = false;
      manualEmailSendBtn.textContent = t('contact.invite');
    }

    manualEmailSendBtn.addEventListener('click', handleManualEmailInvite);
    manualEmailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !manualEmailSendBtn.disabled) {
        handleManualEmailInvite();
      }
    });

    // --- Generic Web Share button ---
    shareBtn.addEventListener('click', async () => {
      manualEmailStatus.textContent = t('contact.invite.share.opening');
      manualEmailStatus.className = 'import-status loading';
      try {
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

        const safeStatus = Object.prototype.hasOwnProperty.call(
          statusConfig,
          result.status,
        )
          ? result.status
          : 'copy_failed';
        const config = statusConfig[safeStatus];
        const key = `contact.invite.share.${safeStatus}`;

        if (config.toast) {
          config.toast(t(key), { containerEl: dialog });
        }
        manualEmailStatus.textContent = t(key);
        manualEmailStatus.className = `import-status ${config.className}`;
      } catch (error) {
        console.error('[ADD CONTACT] Web Share invite error:', error);
        showErrorToast(t('contact.invite.share.copy_failed'), {
          containerEl: dialog,
        });
        manualEmailStatus.textContent = t('contact.invite.share.copy_failed');
        manualEmailStatus.className = 'import-status error';
      }
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
    initIcons(dialog);
    dialog.showModal();
  });
}
