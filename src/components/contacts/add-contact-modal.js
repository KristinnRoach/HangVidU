// src/components/contacts/add-contact-modal.js
// Modal for adding contacts by email or importing from Google

import { findUsersByEmails } from '../../contacts/user-discovery.js';
import { sendInvite } from '../../contacts/invitations.js';
import { escapeHtml } from '../../utils/dom/dom-utils.js';
import {
  getCurrentUser,
  requestContactsAccess,
  getLoggedInUserId,
  requestGmailSendAccess,
} from '../../auth/auth.js';
import { fetchGoogleContacts } from '../../contacts/google-contacts.js';
import { getContacts } from '../contacts/contacts.js';
import { sendBulkEmailsViaGmail } from '../../contacts/gmail-send.js';
import { t } from '../../i18n/index.js';

/**
 * Show a modal to add contacts with platform selection and search.
 * @returns {Promise<void>}
 */
export async function showAddContactModal() {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('add-contact-modal');

    dialog.innerHTML = `
      <button type="button" data-action="cancel" class="close-btn" aria-label="Close">×</button>

      <h2>${t('contact.add.title')}</h2>

      <div class="platform-selector">
        <button type="button" class="platform-btn active" data-platform="google" title="${t('contact.import.google')}">
          <i class="fa-brands fa-google"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="facebook" title="${t('contact.import.facebook')}" disabled>
          <i class="fa-brands fa-facebook"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="instagram" title="${t('contact.import.instagram')}" disabled>
          <i class="fa-brands fa-instagram"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="tiktok" title="${t('contact.import.tiktok')}" disabled>
          <i class="fa-brands fa-tiktok"></i>
        </button>
      </div>

      <div class="search-section">
        <input
          type="text"
          id="contact-search-input"
          class="contact-search-input"
          placeholder="${t('contact.search')}"
        />
      </div>

      <div id="contacts-container" class="contacts-container-modal">
        <p class="empty-state">${t('contact.import.select_platform')}</p>
      </div>

      <div id="import-status" class="import-status"></div>

      <div id="bulk-actions-container" class="bulk-actions-container"></div>

      <!-- <div class="modal-footer">
        <button type="button" data-action="cancel" class="cancel-btn">Close</button>
      </div> -->
    `;

    const cancelBtn = dialog.querySelector('[data-action="cancel"]');
    const searchInput = dialog.querySelector('#contact-search-input');
    const importStatus = dialog.querySelector('#import-status');
    const contactsContainer = dialog.querySelector('#contacts-container');
    const bulkActionsContainer = dialog.querySelector(
      '#bulk-actions-container',
    );
    const platformBtns = dialog.querySelectorAll('.platform-btn');

    let currentPlatform = 'google';
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

    // Platform selection handler
    platformBtns.forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (btn.disabled) return;

        const platform = btn.getAttribute('data-platform');

        // Update active state
        platformBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        currentPlatform = platform;

        // Import contacts for selected platform
        if (platform === 'google') {
          await importGoogleContacts();
        }
        // Future: Add handlers for other platforms
      });
    });

    // Search input handler - filters displayed contacts
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
      );
    });

    // Import Google Contacts function
    async function importGoogleContacts() {
      importStatus.textContent = t('contact.import.requesting');
      importStatus.className = 'import-status loading';
      contactsContainer.innerHTML = '';
      allContacts = [];
      filteredContacts = [];

      try {
        // Step 1: Get access token
        const accessToken = await requestContactsAccess();

        importStatus.textContent = t('contact.import.fetching');

        // Step 2: Fetch Google Contacts
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

        // Step 3: Get saved contacts to check if already connected
        const savedContacts = await getContacts();
        const savedContactIds = new Set(Object.keys(savedContacts || {}));

        // Step 4: Cross-reference with HangVidU users
        const emails = contacts.map((c) => c.email);
        const registeredUsers = await findUsersByEmails(emails);

        // Build results - now including ALL contacts
        const currentUser = getCurrentUser();
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

        // Sort contacts by priority:
        // 1. On HangVidU but not saved (highest priority)
        // 2. Not on HangVidU or already saved
        // Within each group, sort alphabetically by name
        allContacts.sort((a, b) => {
          // Determine priority groups
          const getPriority = (contact) => {
            if (contact.user && !contact.isAlreadySaved) return 1; // On app, not saved
            return 2; // Not on app or already saved
          };

          const priorityA = getPriority(a);
          const priorityB = getPriority(b);

          // Sort by priority first
          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          // Within same priority, sort alphabetically by name
          return (a.name || '').localeCompare(b.name || '', undefined, {
            sensitivity: 'base',
          });
        });

        // Display results
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
    dialog.showModal();

    // Auto-trigger import for the default active platform
    if (currentPlatform === 'google') {
      importGoogleContacts();
    }
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
        <button type="button" class="invite-btn" data-uid="${escapeHtml(user.uid)}" data-name="${escapeHtml(user.displayName)}">
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
          await sendInvite(user.uid, user.displayName);
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
        await sendInvite(contact.user.uid, contact.user.displayName);
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
      const currentUser = getCurrentUser();
      const senderName = currentUser?.displayName || 'A friend';

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
      } else {
        shareLinkBtn.textContent = t('contact.invite.failed_emails');
        shareLinkBtn.disabled = false;
      }

      if (results.failed > 0) {
        console.warn(
          `[ADD CONTACT] ${results.failed} emails failed:`,
          results.errors,
        );
      }
    } catch (err) {
      console.error('[ADD CONTACT] Gmail send error:', err);

      // Fallback to mailto: if Gmail API fails
      if (err.message === 'Authorization cancelled') {
        shareLinkBtn.textContent = t('contact.invite.permission_denied');

        // Wait a moment then open mailto: as fallback
        setTimeout(() => {
          openMailtoFallback(notOnApp);
          shareLinkBtn.textContent = t('contact.invite.email', {
            count: notOnApp.length,
          });
          shareLinkBtn.disabled = false;
        }, 1500);
      } else {
        shareLinkBtn.textContent = t('contact.invite.error_retry');
        shareLinkBtn.disabled = false;
        alert(t('contact.invite.failed_detail', { error: err.message }));
      }
    }
  });

  // Fallback function to open mailto: link
  function openMailtoFallback(contacts) {
    const myUserId = getLoggedInUserId();
    const referralLink = myUserId
      ? `${window.location.origin}/?ref=${myUserId}`
      : window.location.origin;

    const currentUser = getCurrentUser();
    const senderName = currentUser?.displayName || 'A friend';

    const subject = encodeURIComponent(t('contact.invite.subject'));
    const body = encodeURIComponent(
      t('contact.invite.body', { name: senderName, link: referralLink }),
    );

    let mailtoLink;
    if (contacts.length === 1) {
      mailtoLink = `mailto:${contacts[0].email}?subject=${subject}&body=${body}`;
    } else {
      const emails = contacts.map((c) => c.email).join(',');
      mailtoLink = `mailto:?bcc=${emails}&subject=${subject}&body=${body}`;
    }

    window.location.href = mailtoLink;
  }
}
