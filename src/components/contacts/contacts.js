// contacts.js - Simple contacts management

import { ref, set, get, remove } from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../firebase/auth.js';
import { joinOrCreateRoomWithId, listenForIncomingOnRoom } from '../../main.js';
import { hideCallingUI, showCallingUI } from '../calling/calling-ui.js';
import confirmDialog from '../base/confirm-dialog.js';
import { hideElement, showElement } from '../../utils/ui/ui-utils.js';

/**
 * Save a contact for the current user (RTDB if logged in, localStorage otherwise).
 */
async function saveContactData(contactId, contactName, roomId) {
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    const contactRef = ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`);
    await set(contactRef, {
      contactId,
      contactName,
      roomId,
      savedAt: Date.now(),
    });
    return;
  }

  // fallback to localStorage for guests
  try {
    const raw = localStorage.getItem('contacts') || '{}';
    const obj = JSON.parse(raw);
    obj[contactId] = { contactId, contactName, roomId, savedAt: Date.now() };
    localStorage.setItem('contacts', JSON.stringify(obj));
  } catch (e) {
    console.warn('Failed to save contact to localStorage', e);
  }
}

/**
 * Get all saved contacts for the current user.
 */
export async function getContacts() {
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    try {
      const contactsRef = ref(rtdb, `users/${loggedInUid}/contacts`);
      const snap = await get(contactsRef);
      return snap.exists() ? snap.val() : {};
    } catch (e) {
      console.warn('Failed to read contacts from RTDB', e);
      return {};
    }
  }

  // Guest: localStorage
  try {
    const raw = localStorage.getItem('contacts') || '{}';
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to read contacts from localStorage', e);
    return {};
  }
}

/**
 * Prompt user to save contact after hangup, and render contacts list in lobby.
 */
export async function saveContact(contactUserId, roomId, lobbyElement) {
  if (!contactUserId || !roomId) return;

  // If this contact is already saved, don't prompt again.
  // If the roomId changed, update it silently.
  const existing = await getContacts();
  const existingEntry = existing?.[contactUserId];
  if (existingEntry) {
    if (existingEntry.roomId !== roomId) {
      // Keep existing name, just update the roomId
      await saveContactData(contactUserId, existingEntry.contactName, roomId);
      await renderContactsList(lobbyElement);
    }
    // CRITICAL FIX: Re-attach listener even if contact already exists
    // This ensures listener is active after call cleanup removed it
    console.log(
      `[CONTACT SAVE] Re-attaching listener for existing contact room: ${roomId}`
    );
    listenForIncomingOnRoom(roomId);
    return;
  }

  const shouldSave = await confirmDialog(`Save contact?`, {
    autoRemoveSeconds: 15,
  });

  if (!shouldSave) return;

  const contactName =
    window.prompt('Enter a name for this contact:', contactUserId) ||
    contactUserId;

  await saveContactData(contactUserId, contactName, roomId);

  // QUICK FIX: Immediately attach listener for incoming calls on this room
  console.log(
    `[CONTACT SAVE] Attaching listener for saved contact room: ${roomId}`
  );
  listenForIncomingOnRoom(roomId);

  // Re-render contacts list
  await renderContactsList(lobbyElement);
}

/**
 * Render the contacts list in the lobby element.
 */
export async function renderContactsList(lobbyElement) {
  if (!lobbyElement) return;

  const contacts = await getContacts();
  const contactIds = Object.keys(contacts);

  // Find or create contacts container
  let contactsContainer = lobbyElement.querySelector('.contacts-container');
  if (!contactsContainer) {
    contactsContainer = document.createElement('div');
    contactsContainer.className = 'contacts-container';
    lobbyElement.appendChild(contactsContainer);
  }

  if (contactIds.length === 0) {
    contactsContainer.innerHTML = '<p>No saved contacts yet.</p>';

    hideElement(contactsContainer);
    return;
  }
  // Ensure container is visible when contacts exist (if using display: none above)
  showElement(contactsContainer);

  // Render contact items
  contactsContainer.innerHTML = `
    <h3>Saved Contacts</h3>
    <div class="contacts-list">
      ${contactIds
        .map((id) => {
          const contact = contacts[id];
          return `
            <div class="contact-entry">
              <button 
                class="contact-call-btn" 
                data-room-id="${contact.roomId}"
                data-contact-name="${contact.contactName}"
              >
                Call
              </button>
              <span class="contact-name">${contact.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${id}"
              >
                ✕
              </button>
            </div>
          `;
        })
        .join('')}
    </div>
  `;

  // Attach event listeners for call/delete buttons
  attachContactListeners(contactsContainer, lobbyElement);
}

/**
 * Attach event listeners to contact list buttons.
 */
function attachContactListeners(container, lobbyElement) {
  // Call buttons
  container.querySelectorAll('.contact-call-btn').forEach((btn) => {
    btn.onclick = async () => {
      const roomId = btn.getAttribute('data-room-id');
      const contactName = btn.getAttribute('data-contact-name');
      if (roomId) {
        // QUICK FIX: Ensure listener is active for this room before calling
        console.log(
          `[CONTACT CALL] Ensuring listener is active for room: ${roomId}`
        );
        listenForIncomingOnRoom(roomId);

        // Show calling UI with contact name
        await showCallingUI(roomId, contactName, () => {
          // onCancel callback - could add cleanup here if needed
        });

        // Force initiator role when calling a saved contact to ensure a fresh call
        joinOrCreateRoomWithId(roomId, { forceInitiator: true }).catch((e) => {
          console.warn('Failed to call contact:', e);
          hideCallingUI();
        });
      }
    };
  });

  // Delete buttons
  container.querySelectorAll('.contact-delete-btn').forEach((btn) => {
    btn.onclick = async () => {
      const contactId = btn.getAttribute('data-contact-id');
      if (!contactId) return;

      const confirmed = window.confirm('Delete this contact?');
      if (!confirmed) return;

      await deleteContact(contactId);
      await renderContactsList(lobbyElement);
    };
  });
}

/**
 * Delete a contact.
 */
async function deleteContact(contactId) {
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    try {
      await remove(ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`));
    } catch (e) {
      console.warn('Failed to delete contact from RTDB', e);
    }
    return;
  }

  // Guest: remove from localStorage
  try {
    const raw = localStorage.getItem('contacts') || '{}';
    const obj = JSON.parse(raw);
    if (obj[contactId]) {
      delete obj[contactId];
      localStorage.setItem('contacts', JSON.stringify(obj));
    }
  } catch (e) {
    console.warn('Failed to delete contact from localStorage', e);
  }
}
