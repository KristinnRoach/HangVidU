// src/components/contacts/add-contact-modal.js
// Modal for adding contacts by email or importing from Google

import { findUserByEmail, findUsersByEmails } from '../../contacts/user-discovery.js';
import { sendInvite } from '../../contacts/invitations.js';
import { getCurrentUser, requestContactsAccess } from '../../firebase/auth.js';
import { fetchGoogleContacts } from '../../contacts/google-contacts.js';

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
        searchStatus.textContent = 'Error searching for user. Please try again.';
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

        // Step 3: Cross-reference with HangVidU users
        const emails = contacts.map((c) => c.email);
        const registeredUsers = await findUsersByEmails(emails);

        // Build results
        const currentUser = getCurrentUser();
        const onHangVidU = [];
        const notOnHangVidU = [];

        for (const contact of contacts) {
          const user = registeredUsers[contact.email];
          if (user && user.uid !== currentUser?.uid) {
            onHangVidU.push({ ...contact, user });
          } else if (!user) {
            notOnHangVidU.push(contact);
          }
        }

        // Display results
        importStatus.textContent = `${onHangVidU.length} on HangVidU, ${notOnHangVidU.length} not yet`;
        importStatus.className = 'import-status success';

        renderImportResults(importResults, onHangVidU, notOnHangVidU);
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
 * Render import results with invite buttons.
 */
function renderImportResults(container, onHangVidU, notOnHangVidU) {
  container.innerHTML = '';

  // Case: Some contacts are on HangVidU
  if (onHangVidU.length > 0) {
    const section = document.createElement('div');
    section.className = 'results-section';
    section.innerHTML = `<h4>On HangVidU (${onHangVidU.length})</h4>`;

    const list = document.createElement('ul');
    list.className = 'contact-list';

    for (const { name, email, user } of onHangVidU) {
      const li = document.createElement('li');
      li.className = 'contact-item';
      li.innerHTML = `
        <span class="contact-info">
          <strong>${escapeHtml(name)}</strong>
          <small>${escapeHtml(email)}</small>
        </span>
        <button type="button" class="invite-btn" data-uid="${user.uid}" data-name="${escapeHtml(user.displayName)}">
          Invite
        </button>
      `;

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

      list.appendChild(li);
    }

    section.appendChild(list);
    container.appendChild(section);
  }

  // Case: No contacts on HangVidU - show empty state
  if (onHangVidU.length === 0 && notOnHangVidU.length > 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <p>None of your ${notOnHangVidU.length} contacts are on HangVidU yet.</p>
      <p>Be the first to invite them!</p>
    `;
    container.appendChild(emptyState);
  }

  // Show "Not on HangVidU" as collapsed count + invite link
  if (notOnHangVidU.length > 0) {
    const section = document.createElement('div');
    section.className = 'results-section not-on-app';

    const countText = onHangVidU.length > 0
      ? `${notOnHangVidU.length} contacts not on HangVidU yet`
      : '';

    section.innerHTML = `
      ${countText ? `<p class="muted-text">${countText}</p>` : ''}
      <button type="button" class="copy-link-btn">
        <i class="fa fa-link"></i> Copy Invite Link
      </button>
      <span class="copy-feedback"></span>
    `;

    const copyBtn = section.querySelector('.copy-link-btn');
    const feedback = section.querySelector('.copy-feedback');

    copyBtn.addEventListener('click', async () => {
      const inviteLink = getAppInviteLink();

      try {
        await navigator.clipboard.writeText(inviteLink);
        feedback.textContent = '✓ Copied!';
        feedback.className = 'copy-feedback success';
        setTimeout(() => {
          feedback.textContent = '';
        }, 2000);
      } catch (err) {
        // Fallback for browsers without clipboard API
        feedback.textContent = inviteLink;
        feedback.className = 'copy-feedback show-link';
      }
    });

    container.appendChild(section);
  }
}

/**
 * Get the app invite link (base URL without room parameter).
 */
function getAppInviteLink() {
  const base = window.location.origin + window.location.pathname;
  // Remove trailing index.html if present
  return base.replace(/index\.html$/, '');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
