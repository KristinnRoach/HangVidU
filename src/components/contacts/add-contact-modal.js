// src/components/contacts/add-contact-modal.js
// Modal for adding contacts by email or importing from Google

import {
  findUserByEmail,
  findUsersByEmails,
} from '../../contacts/user-discovery.js';
import { sendInvite } from '../../contacts/invitations.js';
import {
  getCurrentUser,
  requestContactsAccess,
  getLoggedInUserId,
} from '../../firebase/auth.js';
import { fetchGoogleContacts } from '../../contacts/google-contacts.js';
import { getContacts } from '../contacts/contacts.js';

/**
 * Show a modal to add a contact by email address or import from Google.
 * @returns {Promise<void>}
 */
export async function showAddContactModal() {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('add-contact-modal');

    dialog.innerHTML = `
      <h2>Add Contact</h2>

      <div class="import-section">
        <button type="button" id="import-google-btn" class="import-btn">
          <i class="fa fa-google"></i> Import from Google Contacts
        </button>
        <div id="import-status" class="import-status"></div>
        <div id="import-results" class="import-results"></div>
      </div>

      <hr class="divider" />

      <p>Or search by email:</p>
      <form id="add-contact-form">
        <input
          type="email"
          id="contact-email-input"
          placeholder="friend@example.com"
          required
        />
        <div id="search-status" class="search-status"></div>
        <div class="modal-actions">
          <button type="button" data-action="cancel">Cancel</button>
          <button type="submit" data-action="search">Search</button>
        </div>
      </form>
    `;

    const form = dialog.querySelector('#add-contact-form');
    const emailInput = dialog.querySelector('#contact-email-input');
    const searchStatus = dialog.querySelector('#search-status');
    const cancelBtn = dialog.querySelector('[data-action="cancel"]');
    const searchBtn = dialog.querySelector('[data-action="search"]');
    const importBtn = dialog.querySelector('#import-google-btn');
    const importStatus = dialog.querySelector('#import-status');
    const importResults = dialog.querySelector('#import-results');

    function cleanup() {
      dialog.close();
      dialog.remove();
      resolve();
    }

    cancelBtn.addEventListener('click', cleanup);
    dialog.addEventListener('cancel', cleanup);

    // Manual email search (existing functionality)
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      if (!email) return;

      searchBtn.disabled = true;
      emailInput.disabled = true;
      searchStatus.textContent = 'Searching...';
      searchStatus.className = 'search-status searching';

      try {
        const user = await findUserByEmail(email);

        if (!user) {
          searchStatus.textContent = `${email} is not on HangVidU yet.`;
          searchStatus.className = 'search-status not-found';
          searchBtn.disabled = false;
          emailInput.disabled = false;
          return;
        }

        const currentUser = getCurrentUser();
        if (currentUser && user.uid === currentUser.uid) {
          searchStatus.textContent = "That's your own email address!";
          searchStatus.className = 'search-status error';
          searchBtn.disabled = false;
          emailInput.disabled = false;
          return;
        }

        searchStatus.textContent = `Found ${user.displayName}! Sending invitation...`;
        searchStatus.className = 'search-status found';

        await sendInvite(user.uid, user.displayName);

        searchStatus.textContent = `✓ Invitation sent to ${user.displayName}!`;
        searchStatus.className = 'search-status success';

        setTimeout(cleanup, 1500);
      } catch (error) {
        console.error('[ADD CONTACT] Error searching for user:', error);
        searchStatus.textContent =
          'Error searching for user. Please try again.';
        searchStatus.className = 'search-status error';
        searchBtn.disabled = false;
        emailInput.disabled = false;
      }
    });

    // Google Contacts import
    importBtn.addEventListener('click', async () => {
      importBtn.disabled = true;
      importStatus.textContent = 'Requesting access...';
      importStatus.className = 'import-status loading';
      importResults.innerHTML = '';

      try {
        // Step 1: Get access token
        const accessToken = await requestContactsAccess();

        importStatus.textContent = 'Fetching contacts...';

        // Step 2: Fetch Google Contacts
        const contacts = await fetchGoogleContacts(accessToken);

        if (contacts.length === 0) {
          importStatus.textContent = 'No contacts with email addresses found.';
          importStatus.className = 'import-status not-found';
          importBtn.disabled = false;
          return;
        }

        importStatus.textContent = `Found ${contacts.length} contacts. Checking HangVidU...`;

        // Step 3: Get saved contacts to check if already connected
        const savedContacts = await getContacts();
        const savedContactIds = new Set(Object.keys(savedContacts || {}));

        // Step 4: Cross-reference with HangVidU users
        const emails = contacts.map((c) => c.email);
        const registeredUsers = await findUsersByEmails(emails);

        // Build results - now including ALL contacts
        const currentUser = getCurrentUser();
        const allContacts = [];

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

        // Display results
        importStatus.textContent = `Found ${allContacts.length} contacts`;
        importStatus.className = 'import-status success';

        renderImportResults(importResults, allContacts);
        importBtn.disabled = false;
      } catch (error) {
        console.error('[ADD CONTACT] Import error:', error);

        if (error.message === 'Authorization cancelled') {
          importStatus.textContent = 'Import cancelled.';
          importStatus.className = 'import-status cancelled';
        } else {
          importStatus.textContent = `Error: ${error.message}`;
          importStatus.className = 'import-status error';
        }

        importBtn.disabled = false;
      }
    });

    document.body.appendChild(dialog);
    dialog.showModal();
  });
}

/**
 * Render import results with checkboxes for selection and invite/share actions.
 * Shows all contacts with indicators for: already saved, on HangVidU, not on HangVidU.
 */
function renderImportResults(container, allContacts) {
  container.innerHTML = '';

  if (allContacts.length === 0) {
    container.innerHTML = '<p class="empty-state">No contacts found.</p>';
    return;
  }

  // Create header with select all checkbox
  const header = document.createElement('div');
  header.className = 'results-header';
  header.innerHTML = `
    <label class="select-all-label">
      <input type="checkbox" id="select-all-checkbox" />
      <span>Select All (${allContacts.length})</span>
    </label>
  `;
  container.appendChild(header);

  // Create scrollable contact list
  const listContainer = document.createElement('div');
  listContainer.className = 'contacts-scroll-list';

  const list = document.createElement('ul');
  list.className = 'contact-list';

  // Track selected contacts
  const selectedContacts = new Set();

  for (const contact of allContacts) {
    const { name, email, user, isAlreadySaved } = contact;

    const li = document.createElement('li');
    li.className = 'contact-item';

    // Determine status badge
    let statusBadge = '';
    let actionButton = '';

    if (isAlreadySaved) {
      statusBadge = '<span class="status-badge saved">✓ Saved</span>';
      actionButton = ''; // No action needed
    } else if (user) {
      statusBadge = '<span class="status-badge on-app">On HangVidU</span>';
      actionButton = `
        <button type="button" class="invite-btn" data-uid="${escapeHtml(user.uid)}" data-name="${escapeHtml(user.displayName)}">
          Invite
        </button>
      `;
    } else {
      statusBadge = '<span class="status-badge not-on-app">Not on app</span>';
      actionButton = ''; // Will use referral link for these
    }

    li.innerHTML = `
      <label class="contact-item-label">
        <input type="checkbox" class="contact-checkbox" data-email="${escapeHtml(email)}" ${isAlreadySaved ? 'disabled' : ''} />
        <span class="contact-info">
          <strong>${escapeHtml(name)}</strong>
          <small>${escapeHtml(email)}</small>
          ${statusBadge}
        </span>
      </label>
      ${actionButton}
    `;

    // Handle individual invite button (for users on HangVidU)
    if (user && !isAlreadySaved) {
      const btn = li.querySelector('.invite-btn');
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
          await sendInvite(user.uid, user.displayName);
          btn.textContent = '✓ Sent';
          btn.classList.add('sent');
        } catch (err) {
          console.error('[ADD CONTACT] Invite error:', err);
          btn.textContent = 'Error';
          btn.disabled = false;
        }
      });
    }

    // Handle checkbox selection
    const checkbox = li.querySelector('.contact-checkbox');
    if (checkbox && !isAlreadySaved) {
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

  // Create action buttons section
  const actionsSection = document.createElement('div');
  actionsSection.className = 'bulk-actions';
  actionsSection.innerHTML = `
    <button type="button" id="invite-selected-btn" class="action-btn" disabled>
      Invite Selected (0)
    </button>
    <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
      Email Invite (0)
    </button>
  `;
  container.appendChild(actionsSection);

  const inviteSelectedBtn = actionsSection.querySelector(
    '#invite-selected-btn',
  );
  const shareLinkBtn = actionsSection.querySelector('#share-link-btn');

  // Update button states based on selection
  function updateActionButtons() {
    const selectedArray = Array.from(selectedContacts);
    const onAppCount = selectedArray.filter(
      (c) => c.user && !c.isAlreadySaved,
    ).length;
    const notOnAppCount = selectedArray.filter((c) => !c.user).length;

    inviteSelectedBtn.disabled = onAppCount === 0;
    inviteSelectedBtn.textContent = `Invite Selected (${onAppCount})`;

    shareLinkBtn.disabled = notOnAppCount === 0;
    shareLinkBtn.textContent = `Email Invite (${notOnAppCount})`;
  }

  // Handle "Invite Selected" button (for users on HangVidU)
  inviteSelectedBtn.addEventListener('click', async () => {
    const toInvite = Array.from(selectedContacts).filter(
      (c) => c.user && !c.isAlreadySaved,
    );

    if (toInvite.length === 0) return;

    inviteSelectedBtn.disabled = true;
    inviteSelectedBtn.textContent = 'Sending invites...';

    let successCount = 0;
    for (const contact of toInvite) {
      try {
        await sendInvite(contact.user.uid, contact.user.displayName);
        successCount++;
      } catch (err) {
        console.error('[ADD CONTACT] Failed to invite:', contact.name, err);
      }
    }

    inviteSelectedBtn.textContent = `✓ Sent ${successCount} invite${successCount !== 1 ? 's' : ''}`;
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

  // Handle "Share Invite Link" button (for users not on HangVidU)
  shareLinkBtn.addEventListener('click', () => {
    const notOnApp = Array.from(selectedContacts).filter((c) => !c.user);

    if (notOnApp.length === 0) return;

    // Generate referral link
    const myUserId = getLoggedInUserId();
    const referralLink = myUserId
      ? `${window.location.origin}/?ref=${myUserId}`
      : window.location.origin;

    // Get current user's name for personalization
    const currentUser = getCurrentUser();
    const senderName = currentUser?.displayName || 'A friend';

    // Prepare email content
    const subject = encodeURIComponent('Join me on HangVidU!');
    const body = encodeURIComponent(
      `Hi!\n\n${senderName} invited you to join HangVidU - a simple video chat app.\n\nClick here to get started:\n${referralLink}\n\nSee you there!\n`,
    );

    // Build mailto: link
    let mailtoLink;
    if (notOnApp.length === 1) {
      // Single contact: use "to" field
      mailtoLink = `mailto:${notOnApp[0].email}?subject=${subject}&body=${body}`;
    } else {
      // Multiple contacts: use "bcc" to keep emails private
      const emails = notOnApp.map((c) => c.email).join(',');
      mailtoLink = `mailto:?bcc=${emails}&subject=${subject}&body=${body}`;
    }

    // Open email client
    try {
      window.location.href = mailtoLink;

      // Visual feedback
      shareLinkBtn.textContent = '✓ Opening email...';
      setTimeout(() => {
        shareLinkBtn.textContent = `Email Invite (${notOnApp.length})`;
      }, 2000);
    } catch (err) {
      console.error('[ADD CONTACT] Failed to open mailto:', err);
      alert('Failed to open email client. Please check your email settings.');
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  // Browser escapes <, >, & via textContent. Also escape quotes for attribute safety.
  return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
