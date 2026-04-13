// src/contacts/components/add-contact-modal.js

// Modal for adding contacts by email or importing from Google

import { contactsService } from '../contacts-service.js';
import { findUserByEmail, findUsersByEmails } from '../user-discovery.js';
import { sendInvite } from '../invitations.js';
import { escapeHtml } from '../../../shared/components/ui/component-system/dom-utils.js';
import {
  requestContactsAccess,
  requestGmailSendAccess,
  getLoggedInUserId,
  getUser,
  getIsLoggedIn,
} from '../../../auth/index.js';
import { fetchGoogleContacts } from '../google-contacts.js';
import { sendBulkEmailsViaGmail } from '../gmail-send.js';
import { shareInvite } from '../share-invite.js';
import { t } from '../../../shared/i18n/index.js';
import { initIcons } from '../../../shared/components/ui/icons.js';
import {
  showErrorToast,
  showSuccessToast,
} from '../../../shared/components/toast.js';

// TODO: WIP decoupling considerations:
// This modal mixes feature UI with auth/OAuth and external contact-import side effects.
// Keep the UI here, but push reusable import/auth orchestration down before standardizing the pattern.

/**
 * Open Gmail compose (preferred) or mailto: as fallback for emailing invite links.
 */
function openEmailComposeFallback(contacts) {
  const myUserId = getLoggedInUserId();
  const referralLink = myUserId
    ? `${window.location.origin}/?ref=${myUserId}`
    : window.location.origin;

  const currentUser = getUser();
  const senderName = currentUser?.userName || 'A friend';

  const subject = encodeURIComponent(t('contact.invite.subject'));
  const body = encodeURIComponent(
    t('contact.invite.body', { name: senderName, link: referralLink }),
  );
  const to = contacts.map((c) => c.email).join(',');

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
  const opened = window.open(gmailUrl, '_blank');

  if (!opened) {
    const mailtoLink =
      contacts.length === 1
        ? `mailto:${contacts[0].email}?subject=${subject}&body=${body}`
        : `mailto:?bcc=${to}&subject=${subject}&body=${body}`;
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
                 autocomplete="email" />
          <button type="button" id="manual-email-send" class="action-btn">
            ${t('contact.invite')}
          </button>
        </div>
        <div id="manual-email-status" class="import-status"></div>

        <button type="button" id="share-invite-btn" class="action-btn secondary share-invite-btn">
          <i data-lucide="share"></i>
          ${t('contact.import.share')}
        </button>
      </div>

      <hr class="divider" />

      <div class="import-section">
        <div class="platform-selector">
          <button type="button" class="platform-btn" data-platform="google" title="${t('contact.import.google')}">
            <i data-lucide="mail"></i>
          </button>

          <!-- Future platform buttons
          <button type="button" class="platform-btn" data-platform="facebook" title="${t('contact.import.facebook')}" disabled>
            <i data-lucide="monitor"></i>
          </button>
          -->
        </div>
      </div>

      <div id="import-results-section" class="import-results-section" hidden>
        <div class="search-section">
          <input
            type="text"
            id="contact-search-input"
            class="contact-search-input"
            placeholder="${t('contact.search')}"
          />
        </div>

        <p class="disclosure-note">
          ${t('contact.disclosure.import')}
        </p>

        <div id="contacts-container" class="contacts-container-modal"></div>

        <div id="import-status" class="import-status"></div>

        <div id="bulk-actions-container" class="bulk-actions-container"></div>
      </div>
    `;

    const cancelBtn = dialog.querySelector('[data-action="cancel"]');
    const manualEmailInput = dialog.querySelector('#manual-email-input');
    const manualEmailSendBtn = dialog.querySelector('#manual-email-send');
    const manualEmailStatus = dialog.querySelector('#manual-email-status');
    const shareInviteBtn = dialog.querySelector('#share-invite-btn');
    const importResultsSection = dialog.querySelector(
      '#import-results-section',
    );
    const searchInput = dialog.querySelector('#contact-search-input');
    const importStatus = dialog.querySelector('#import-status');
    const contactsContainer = dialog.querySelector('#contacts-container');
    const bulkActionsContainer = dialog.querySelector(
      '#bulk-actions-container',
    );
    const platformBtns = dialog.querySelectorAll('.platform-btn');

    let allContacts = [];
    let filteredContacts = [];
    const selectedContacts = new Set();

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

      manualEmailSendBtn.disabled = true;
      manualEmailSendBtn.textContent = t('contact.import.fetching');
      manualEmailStatus.textContent = '';
      manualEmailStatus.className = 'import-status';

      try {
        const user = await findUserByEmail(email);

        if (user) {
          const currentUser = getUser();
          if (user.uid === currentUser?.uid) {
            manualEmailStatus.textContent = t('contact.add.self_error');
            manualEmailStatus.className = 'import-status error';
            return;
          }

          const savedContacts = await contactsService.getAllContacts();
          if (savedContacts && savedContacts[user.uid]) {
            manualEmailStatus.textContent = t('contact.add.already_saved');
            manualEmailStatus.className = 'import-status info';
            return;
          }

          await sendInvite(user.uid, user.userName);
          manualEmailStatus.textContent = `✓ ${t('contact.invite.sent_one')}`;
          manualEmailStatus.className = 'import-status success';
          showSuccessToast(t('contact.invite.sent_one'), {
            containerEl: dialog,
          });
        } else {
          openEmailComposeFallback([{ email }]);
          manualEmailStatus.textContent = t('contact.add.not_found_emailing');
          manualEmailStatus.className = 'import-status info';
        }
      } catch (err) {
        // TODO: Pre-check whether an invite already exists instead of relying on PERMISSION_DENIED.
        // The RTDB rule blocks duplicate writes (!data.exists()), so this works, but a read-first
        // approach would be cleaner and let us distinguish "already sent" from real errors.
        if (err?.message?.includes('PERMISSION_DENIED')) {
          manualEmailStatus.textContent = t('contact.add.already_invited');
          manualEmailStatus.className = 'import-status info';
        } else {
          console.error('[ADD CONTACT] Manual email invite error:', err);
          manualEmailStatus.textContent = t('contact.add.email_error');
          manualEmailStatus.className = 'import-status error';
        }
      } finally {
        manualEmailSendBtn.disabled = false;
        manualEmailSendBtn.textContent = t('contact.invite');
      }
    }

    manualEmailSendBtn.addEventListener('click', handleManualEmailInvite);
    manualEmailInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleManualEmailInvite();
    });

    // --- Share invite link ---

    shareInviteBtn.addEventListener('click', async () => {
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

    // --- Platform import ---

    platformBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (btn.disabled) return;

        const platform = btn.getAttribute('data-platform');

        platformBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        if (platform === 'google') {
          await importGoogleContacts();
        }
      });
    });

    // --- Import results search filter ---

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();

      if (!query) {
        filteredContacts = allContacts;
      } else {
        filteredContacts = allContacts.filter((contact) => {
          const nameMatch = (contact.name || '').toLowerCase().includes(query);
          const emailMatch = (contact.email || '')
            .toLowerCase()
            .includes(query);
          return nameMatch || emailMatch;
        });
      }

      renderImportResults(
        contactsContainer,
        bulkActionsContainer,
        filteredContacts,
        selectedContacts,
        dialog,
      );
    });

    // --- Google Contacts import ---
    // Must be called from a user click so the browser allows the OAuth popup.

    async function importGoogleContacts() {
      importResultsSection.hidden = false;
      importStatus.textContent = t('contact.import.requesting');
      importStatus.className = 'import-status loading';
      contactsContainer.innerHTML = '';
      allContacts = [];
      filteredContacts = [];

      try {
        const accessToken = await requestContactsAccess({ interactive: true });

        importStatus.textContent = t('contact.import.fetching');

        const contacts = await fetchGoogleContacts(accessToken);

        if (contacts.length === 0) {
          importStatus.textContent = t('contact.import.no_email');
          importStatus.className = 'import-status not-found';
          contactsContainer.innerHTML = `<p class="empty-state">${t('contact.import.none')}</p>`;
          return;
        }

        importStatus.textContent = t('contact.import.found_checking', {
          count: contacts.length,
        });

        const savedContacts = await contactsService.getAllContacts();
        const savedContactIds = new Set(Object.keys(savedContacts || {}));

        const emails = contacts.map((c) => c.email);
        const registeredUsers = await findUsersByEmails(emails);

        const currentUser = getUser();
        allContacts = [];

        for (const contact of contacts) {
          const user = registeredUsers[contact.email];
          const isCurrentUser = user && user.uid === currentUser?.uid;
          const isAlreadySaved = user && savedContactIds.has(user.uid);

          if (!isCurrentUser) {
            allContacts.push({
              ...contact,
              user,
              isAlreadySaved,
            });
          }
        }

        allContacts.sort((a, b) => {
          const getPriority = (contact) => {
            if (contact.user && !contact.isAlreadySaved) return 1;
            return 2;
          };

          const priorityA = getPriority(a);
          const priorityB = getPriority(b);

          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          return (a.name || '').localeCompare(b.name || '', undefined, {
            sensitivity: 'base',
          });
        });

        filteredContacts = allContacts;
        importStatus.textContent = t('contact.import.found', {
          count: allContacts.length,
        });
        importStatus.className = 'import-status success';

        renderImportResults(
          contactsContainer,
          bulkActionsContainer,
          filteredContacts,
          selectedContacts,
          dialog,
        );
      } catch (error) {
        console.error('[ADD CONTACT] Import error:', error);

        if (error.message === 'Authorization cancelled') {
          importStatus.textContent = t('contact.import.cancelled');
          importStatus.className = 'import-status cancelled';
        } else {
          importStatus.textContent = t('contact.import.error', {
            error: error.message,
          });
          importStatus.className = 'import-status error';
        }

        contactsContainer.innerHTML = `<p class="empty-state">${t('contact.import.failed')}</p>`;
      }
    }

    document.body.appendChild(dialog);
    initIcons(dialog);
    dialog.showModal();
  });
}

/**
 * Render import results with checkboxes for selection and invite/share actions.
 * Shows all contacts with indicators for: already saved, on HangVidU, not on HangVidU.
 */
function renderImportResults(
  container,
  bulkActionsContainer,
  allContacts,
  selectedContacts,
  toastContainerEl,
) {
  container.innerHTML = '';

  if (allContacts.length === 0) {
    container.innerHTML = `<p class="empty-state">${t('contact.import.none')}</p>`;
    return;
  }

  // Create header with select all checkbox
  const header = document.createElement('div');
  header.className = 'results-header';
  header.innerHTML = `
    <label class="select-all-label">
      <input type="checkbox" id="select-all-checkbox" />
      <span>${t('contact.select_all', { count: allContacts.length })}</span>
    </label>
  `;
  container.appendChild(header);

  // Create scrollable contact list
  const listContainer = document.createElement('div');
  listContainer.className = 'contacts-scroll-list';

  const list = document.createElement('ul');
  list.className = 'contact-list';

  for (const contact of allContacts) {
    const { name, email, user, isAlreadySaved } = contact;

    const li = document.createElement('li');
    li.className = 'contact-item';

    // Determine status badge
    let statusBadge = '';
    let actionButton = '';

    if (isAlreadySaved) {
      statusBadge = `<span class="status-badge saved">✓ ${t('contact.status.saved')}</span>`;
      actionButton = ''; // No action needed
    } else if (user) {
      statusBadge = `<span class="status-badge on-app">${t('contact.status.on_app')}</span>`;
      actionButton = `
        <button type="button" class="invite-btn" data-uid="${escapeHtml(user.uid)}" data-name="${escapeHtml(user.userName)}">
          ${t('contact.invite')}
        </button>
      `;
    } else {
      statusBadge = `<span class="status-badge not-on-app">${t('contact.status.not_on_app')}</span>`;
      actionButton = ''; // Will use referral link for these
    }

    li.innerHTML = `
      <label class="contact-item-label">
        <input type="checkbox" class="contact-checkbox" data-email="${escapeHtml(email)}" ${isAlreadySaved ? 'disabled' : ''} />
        <span class="contact-info">
          <strong class="contact-name">${escapeHtml(name)}</strong>
          <small class="contact-email">${escapeHtml(email)}</small>
        </span>
        ${statusBadge}
      </label>
      ${actionButton}
    `;

    // Handle individual invite button (for users on HangVidU)
    if (user && !isAlreadySaved) {
      const btn = li.querySelector('.invite-btn');
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = t('shared.sending');

        try {
          await sendInvite(user.uid, user.userName);
          btn.textContent = `✓ ${t('contact.invite.sent_one')}`;
          btn.classList.add('sent');
        } catch (err) {
          console.error('[ADD CONTACT] Invite error:', err);
          btn.textContent = t('shared.error');
          btn.disabled = false;
        }
      });
    }

    // Handle checkbox selection — restore checked state from Set
    const checkbox = li.querySelector('.contact-checkbox');
    if (checkbox && !isAlreadySaved) {
      checkbox.checked = selectedContacts.has(contact);
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          selectedContacts.add(contact);
        } else {
          selectedContacts.delete(contact);
        }
        updateActionButtons();
      });
    }

    list.appendChild(li);
  }

  listContainer.appendChild(list);
  container.appendChild(listContainer);

  // Handle "Select All" checkbox
  const selectAllCheckbox = header.querySelector('#select-all-checkbox');
  selectAllCheckbox.addEventListener('change', () => {
    const checkboxes = list.querySelectorAll(
      '.contact-checkbox:not([disabled])',
    );
    checkboxes.forEach((cb) => {
      cb.checked = selectAllCheckbox.checked;
      const email = cb.getAttribute('data-email');
      const contact = allContacts.find((c) => c.email === email);
      if (contact) {
        if (selectAllCheckbox.checked) {
          selectedContacts.add(contact);
        } else {
          selectedContacts.delete(contact);
        }
      }
    });
    updateActionButtons();
  });

  // Create action buttons section - now in separate container outside scrollable area
  bulkActionsContainer.innerHTML = `
    <div class="bulk-actions">
      <button type="button" id="invite-selected-btn" class="action-btn" disabled>
        ${t('contact.invite.selected', { count: 0 })}
      </button>
      <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
        ${t('contact.invite.email', { count: 0 })}
      </button>
    </div>
    <p class="disclosure-note bulk-action-disclosure">
      ${t('contact.disclosure.gmail_send')}
    </p>
  `;

  const inviteSelectedBtn = bulkActionsContainer.querySelector(
    '#invite-selected-btn',
  );
  const shareLinkBtn = bulkActionsContainer.querySelector('#share-link-btn');

  // Update button states based on selection
  function updateActionButtons() {
    const selectedArray = Array.from(selectedContacts);
    const onAppCount = selectedArray.filter(
      (c) => c.user && !c.isAlreadySaved,
    ).length;
    const notOnAppCount = selectedArray.filter((c) => !c.user).length;

    inviteSelectedBtn.disabled = onAppCount === 0;
    inviteSelectedBtn.textContent = t('contact.invite.selected', {
      count: onAppCount,
    });

    shareLinkBtn.disabled = notOnAppCount === 0;
    shareLinkBtn.textContent = t('contact.invite.email', {
      count: notOnAppCount,
    });
  }

  // Handle "Invite Selected" button (for users on HangVidU)
  inviteSelectedBtn.addEventListener('click', async () => {
    const toInvite = Array.from(selectedContacts).filter(
      (c) => c.user && !c.isAlreadySaved,
    );

    if (toInvite.length === 0) return;

    inviteSelectedBtn.disabled = true;
    inviteSelectedBtn.textContent = t('contact.invite.sending');

    let successCount = 0;
    for (const contact of toInvite) {
      try {
        await sendInvite(contact.user.uid, contact.user.userName);
        successCount++;
      } catch (err) {
        console.error('[ADD CONTACT] Failed to invite:', contact.name, err);
      }
    }

    inviteSelectedBtn.textContent = `✓ ${t('contact.invite.sent', { count: successCount })}`;
    setTimeout(() => {
      selectedContacts.clear();
      updateActionButtons();
      // Uncheck all checkboxes
      list
        .querySelectorAll('.contact-checkbox')
        .forEach((cb) => (cb.checked = false));
      selectAllCheckbox.checked = false;
    }, 2000);
  });

  // Handle "Email Invite" button (for users not on HangVidU)
  shareLinkBtn.addEventListener('click', async () => {
    const notOnApp = Array.from(selectedContacts).filter((c) => !c.user);

    if (notOnApp.length === 0) return;

    // Disable button during operation
    shareLinkBtn.disabled = true;
    shareLinkBtn.textContent = t('contact.invite.requesting_permission');

    try {
      // Step 1: Request Gmail send permission
      const accessToken = await requestGmailSendAccess();

      shareLinkBtn.textContent = t('contact.invite.sending_emails');

      // Step 2: Generate referral link
      const myUserId = getLoggedInUserId();
      const referralLink = myUserId
        ? `${window.location.origin}/?ref=${myUserId}`
        : window.location.origin;

      // Step 3: Get current user's name for personalization
      const currentUser = getUser();
      const senderName = currentUser?.userName || 'A friend';

      // Step 4: Prepare email content
      const subject = t('contact.invite.subject');
      const body = t('contact.invite.body', {
        name: senderName,
        link: referralLink,
      });

      // Step 5: Send emails via Gmail API
      const results = await sendBulkEmailsViaGmail(
        accessToken,
        notOnApp,
        subject,
        body,
      );

      // Step 6: Show results
      if (results.sent > 0) {
        shareLinkBtn.textContent = `✓ ${t('contact.invite.sent_emails', { count: results.sent })}`;
        shareLinkBtn.classList.add('success');

        // TODO: Separate UI concern (emit event)
        showSuccessToast(
          t('contact.invite.sent_emails', { count: results.sent }),
          { containerEl: toastContainerEl },
        );

        // Potential partial failures - some sent, some failed
        if (results.failed > 0) {
          showErrorToast(t('contact.invite.failed_emails'), {
            containerEl: toastContainerEl,
          });
          console.warn(
            `[ADD CONTACT] Partial failure - ${results.failed} emails failed:`,
            results.errors,
          );
        }

        // Clear selection after success
        setTimeout(() => {
          selectedContacts.clear();
          updateActionButtons();
          list
            .querySelectorAll('.contact-checkbox')
            .forEach((cb) => (cb.checked = false));
          selectAllCheckbox.checked = false;
          shareLinkBtn.classList.remove('success');
        }, 3000);
      } else if (results.failed > 0) {
        // All failed, none sent
        shareLinkBtn.textContent = t('contact.invite.failed_emails');
        shareLinkBtn.disabled = false;

        // TODO: Separate UI concern (emit event)
        showErrorToast(t('contact.invite.failed_emails'), {
          containerEl: toastContainerEl,
        });

        console.warn(
          `[ADD CONTACT] ${results.failed} emails failed:`,
          results.errors,
        );
      }
    } catch (err) {
      console.error('[ADD CONTACT] Gmail send error:', err);

      // Fallback to Gmail compose URL, then mailto: as last resort
      if (err.message === 'Authorization cancelled') {
        shareLinkBtn.textContent = t('contact.invite.permission_denied');

        // TODO: Separate UI concern (emit event)
        showErrorToast(t('contact.invite.permission_denied'), {
          containerEl: toastContainerEl,
        });

        setTimeout(() => {
          openEmailComposeFallback(notOnApp);
          shareLinkBtn.textContent = t('contact.invite.email', {
            count: notOnApp.length,
          });
          shareLinkBtn.disabled = false;
        }, 1500);
      } else {
        shareLinkBtn.textContent = t('contact.invite.error_retry');
        shareLinkBtn.disabled = false;

        // TODO: Separate UI concern (emit event)
        showErrorToast(
          t('contact.invite.failed_detail', { error: err.message }),
          { containerEl: toastContainerEl },
        );
      }
    }
  });

}
