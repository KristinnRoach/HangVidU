// src/components/contacts/add-contact-modal.js
// Simple modal for adding contacts by email

import { findUserByEmail } from '../../contacts/user-discovery.js';
import { sendInvite } from '../../contacts/invitations.js';
import { getCurrentUser } from '../../firebase/auth.js';

/**
 * Show a modal to add a contact by email address.
 * Searches for the user in the directory and sends an invite if found.
 * @returns {Promise<void>}
 */
export async function showAddContactModal() {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.classList.add('add-contact-modal');
    
    dialog.innerHTML = `
      <h2>Add Contact</h2>
      <p>Enter the email address of someone you want to connect with:</p>
      <form id="add-contact-form">
        <input 
          type="email" 
          id="contact-email-input" 
          placeholder="friend@example.com"
          required
          autofocus
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

    function cleanup() {
      dialog.close();
      dialog.remove();
      resolve();
    }

    cancelBtn.addEventListener('click', cleanup);
    dialog.addEventListener('cancel', cleanup);

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
          searchStatus.textContent = `${email} is not on HangVidU yet. You can invite them via email or share a link when this feature is available.`;
          searchStatus.className = 'search-status not-found';
          searchBtn.disabled = false;
          emailInput.disabled = false;
          return;
        }

        // Check if it's the current user
        const currentUser = getCurrentUser();
        if (currentUser && user.uid === currentUser.uid) {
          searchStatus.textContent = "That's your own email address!";
          searchStatus.className = 'search-status error';
          searchBtn.disabled = false;
          emailInput.disabled = false;
          return;
        }

        // Found user - send invite
        searchStatus.textContent = `Found ${user.displayName}! Sending invitation...`;
        searchStatus.className = 'search-status found';

        await sendInvite(user.uid, user.displayName);

        searchStatus.textContent = `✓ Invitation sent to ${user.displayName}!`;
        searchStatus.className = 'search-status success';

        // Close modal after a short delay
        setTimeout(() => {
          cleanup();
        }, 1500);

      } catch (error) {
        console.error('[ADD CONTACT] Error searching for user:', error);
        searchStatus.textContent = 'Error searching for user. Please try again.';
        searchStatus.className = 'search-status error';
        searchBtn.disabled = false;
        emailInput.disabled = false;
      }
    });

    document.body.appendChild(dialog);
    dialog.showModal();
  });
}
