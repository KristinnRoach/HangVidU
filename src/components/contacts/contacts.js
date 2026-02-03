// contacts.js - Simple contacts management

import { ref, set, get, remove, update, onValue, off } from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getCurrentUser } from '../../firebase/auth.js';
import { joinOrCreateRoomWithId, listenForIncomingOnRoom } from '../../main.js';
import { hideCallingUI, showCallingUI } from '../calling/calling-ui.js';
import confirmDialog from '../base/confirm-dialog.js';
import { hideElement, showElement } from '../../utils/ui/ui-utils.js';
import { messagingController } from '../../messaging/messaging-controller.js';
import { messagesUI } from '../messages/messages-ui.js';
import { createMessageToggle } from '../messages/message-toggle.js';
import { getDeterministicRoomId } from '../../utils/room-id.js';
import { pushNotificationController } from '../../notifications/push-notification-controller.js';

// Track presence listeners for cleanup
const presenceListeners = new Map();

// Track message badge listeners for cleanup - Map<contactId, unsubscribe function>
const messageBadgeListeners = new Map();

// Track contact message toggles for cleanup
const contactMessageToggles = new Map();

// Limit displayed contact name length in the UI (keep full name in title)
const MAX_CONTACT_NAME_CHARS = 14;

function getSortedContactIds(contacts) {
  return Object.keys(contacts).sort((a, b) => {
    const aTime = contacts[a]?.lastInteractionAt || contacts[a]?.savedAt || 0;
    const bTime = contacts[b]?.lastInteractionAt || contacts[b]?.savedAt || 0;
    return bTime - aTime;
  });
}

/**
 * Save a contact for the current user (RTDB if logged in, localStorage otherwise).
 */
export async function saveContactData(contactId, contactName, roomId) {
  const loggedInUid = getLoggedInUserId();
  const now = Date.now();

  if (loggedInUid) {
    const contactRef = ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`);
    await set(contactRef, {
      contactId,
      contactName,
      roomId,
      savedAt: now,
      lastInteractionAt: now,
    });
    return;
  }

  // fallback to localStorage for guests
  try {
    const raw = localStorage.getItem('contacts') || '{}';
    const obj = JSON.parse(raw);
    obj[contactId] = {
      contactId,
      contactName,
      roomId,
      savedAt: now,
      lastInteractionAt: now,
    };
    localStorage.setItem('contacts', JSON.stringify(obj));
  } catch (e) {
    console.warn('Failed to save contact to localStorage', e);
  }
}

export async function updateLastInteraction(contactId) {
  const loggedInUid = getLoggedInUserId();
  if (!loggedInUid) return;

  try {
    const contactRef = ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`);
    await update(contactRef, { lastInteractionAt: Date.now() });
  } catch (e) {
    console.warn('Failed to update lastInteractionAt', e);
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
 * Get contact by roomId. Returns the contact object or null if not found.
 * Useful for finding who was called when we only have the roomId.
 */
export async function getContactByRoomId(roomId) {
  if (!roomId) return null;

  try {
    const contacts = await getContacts();
    for (const contact of Object.values(contacts || {})) {
      if (contact?.roomId === roomId) {
        return contact;
      }
    }
  } catch (e) {
    console.warn('Failed to get contact by roomId', e);
  }

  return null;
}

/**
 * Resolve caller display name from roomId by looking up saved contact.
 */
export async function resolveCallerName(roomId, fallbackUserId) {
  if (!roomId) return fallbackUserId || 'Unknown';

  try {
    const contacts = await getContacts();
    for (const contact of Object.values(contacts || {})) {
      if (contact?.roomId === roomId) {
        return contact.contactName || contact.contactId || fallbackUserId;
      }
    }
  } catch (e) {
    console.warn('Failed to resolve caller name', e);
  }

  return fallbackUserId || 'Unknown';
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
  const contactIds = getSortedContactIds(contacts);

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
    <h3>Contacts</h3>
    <div class="contacts-list">
      ${contactIds
        .map((id) => {
          const contact = contacts[id];
          return `
            <div class="contact-entry">
              <div class="contact-msg-toggle-container" data-contact-id="${id}"></div>
              <span
                class="contact-name"
                data-room-id="${contact.roomId || ''}"
                data-contact-name="${contact.contactName}"
                data-contact-id="${id}"
                title="Call ${contact.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${id}"></span>
                <i class="fa fa-phone"></i>
                ${
                  contact.contactName &&
                  contact.contactName.length > MAX_CONTACT_NAME_CHARS
                    ? contact.contactName.slice(0, MAX_CONTACT_NAME_CHARS - 2) +
                      '..'
                    : contact.contactName
                }
              </span>
              <button
                class="contact-delete-btn"
                data-contact-id="${id}"
                title="Delete contact"
              >
                ✕
              </button>
              <button
                class="contact-edit-btn"
                data-contact-id="${id}"
                title="Edit contact name"
              >
                ✏️
              </button>
            </div>
          `;
        })
        .join('')}
    </div>
  `;

  // Attach event listeners for call/delete buttons
  attachContactListeners(contactsContainer, lobbyElement);

  // Setup presence indicators for each contact
  setupPresenceIndicators(contactIds);

  // Create message toggles directly (no placeholders needed)
  await createContactMessageToggles(contactsContainer, contactIds, contacts);

  // Prune deleted users in the background (after render) to avoid blocking
  if (getLoggedInUserId()) {
    Promise.all(
      contactIds.map(async (id) => {
        const snapshot = await get(ref(rtdb, `users/${id}/presence`));
        if (!snapshot.exists()) {
          const entry = contactsContainer.querySelector(
            `.contact-entry:has([data-contact-id="${id}"])`,
          );
          if (entry) entry.remove();
        }
      }),
    ).catch((err) =>
      console.warn('[CONTACTS] Background presence check failed:', err),
    );
  }
}

/**
 * Attach event listeners to contact list elements.
 */
function attachContactListeners(container, lobbyElement) {
  // Message buttons - click to open messaging
  container.querySelectorAll('.contact-message-btn').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation(); // Don't trigger other handlers
      const contactId = btn.getAttribute('data-contact-id');
      const contactName = btn.getAttribute('data-contact-name');
      if (contactId) {
        messagesUI.openContactMessages(contactId, contactName);
        const toggle = contactMessageToggles.get(contactId);
        if (toggle) toggle.clearBadge();
      }
    };
  });

  // Contact names - click to call
  container.querySelectorAll('.contact-name').forEach((nameEl) => {
    nameEl.onclick = async () => {
      let roomId = nameEl.getAttribute('data-room-id');
      const contactName = nameEl.getAttribute('data-contact-name');
      const contactId = nameEl.getAttribute('data-contact-id');

      if (roomId || contactId) {
        // Reuse the unified callContact flow from main.js
        // We use dynamic import to avoid circular dependency issues
        try {
          const { callContact } = await import('../../main.js');
          await callContact(contactId, contactName, roomId);
        } catch (e) {
          console.error('[CONTACTS] Failed to initiate call:', e);
        }
      }
    };
  });

  // Delete buttons
  container.querySelectorAll('.contact-delete-btn').forEach((btn) => {
    btn.onclick = async () => {
      const contactId = btn.getAttribute('data-contact-id');
      if (!contactId) return;

      const confirmed = await confirmDialog('Delete this contact?');
      if (!confirmed) return;

      await deleteContact(contactId);
      await renderContactsList(lobbyElement);
    };
  });

  // Edit buttons
  container.querySelectorAll('.contact-edit-btn').forEach((btn) => {
    btn.onclick = async () => {
      const contactId = btn.getAttribute('data-contact-id');
      if (!contactId) return;

      const contacts = await getContacts();
      const contact = contacts[contactId];
      if (!contact) return;

      const newName = prompt(
        'Enter new name for this contact:',
        contact.contactName,
      );
      if (newName && newName.trim() && newName.trim() !== contact.contactName) {
        await saveContactData(contactId, newName.trim(), contact.roomId);
        await renderContactsList(lobbyElement);
      }
    };
  });
}

/**
 * Setup presence indicators for contacts list.
 * Watches each contact's presence and updates indicator color.
 */
function setupPresenceIndicators(contactIds) {
  // Clean up old listeners
  presenceListeners.forEach(({ ref: presenceRef, callback }) => {
    off(presenceRef, 'value', callback);
  });
  presenceListeners.clear();

  // Only set up presence for logged-in users (guests don't have RTDB presence)
  if (!getLoggedInUserId()) return;

  contactIds.forEach((contactId) => {
    const presenceRef = ref(rtdb, `users/${contactId}/presence`);
    const indicatorEl = document.querySelector(
      `.presence-indicator[data-contact-id="${contactId}"]`,
    );

    if (!indicatorEl) return;

    const callback = (snapshot) => {
      const presence = snapshot.val();
      const isOnline = presence?.state === 'online';

      indicatorEl.classList.toggle('online', isOnline);
      indicatorEl.title = isOnline ? 'Online' : 'Offline';
    };

    // Start listening
    onValue(presenceRef, callback);

    // Track for cleanup
    presenceListeners.set(contactId, { ref: presenceRef, callback });
  });
}

// Track if toggle replacement is in progress to prevent race conditions
let toggleReplacementInProgress = false;
let toggleReplacementTimeout = null;

/**
 * Create message toggle components for contacts.
 * Creates toggle for each contact with unread badge support.
 */
async function createContactMessageToggles(container, contactIds, contacts) {
  if (!getLoggedInUserId()) return; // Only for logged-in users

  // Wait if another replacement is in progress (with timeout)
  const maxWait = 10; // 10 attempts x 100ms = 1 second max wait
  let attempts = 0;
  while (toggleReplacementInProgress && attempts < maxWait) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    attempts++;
  }

  if (toggleReplacementInProgress) {
    console.debug(
      '[CONTACTS] Toggle replacement still in progress after waiting, skipping',
    );
    return;
  }

  toggleReplacementInProgress = true;

  // Safety timeout: force reset flag after 5 seconds to prevent permanent lock
  if (toggleReplacementTimeout) {
    clearTimeout(toggleReplacementTimeout);
  }
  toggleReplacementTimeout = setTimeout(() => {
    console.warn('[CONTACTS] Toggle replacement timeout - forcing flag reset');
    toggleReplacementInProgress = false;
  }, 5000);

  try {
    // Clean up old toggles before creating new ones
    contactMessageToggles.forEach((toggle) => {
      toggle.cleanup();
    });
    contactMessageToggles.clear();

    // Clean up old badge listeners
    messageBadgeListeners.forEach((unsubscribe) => {
      unsubscribe();
    });
    messageBadgeListeners.clear();

    const myUserId = getLoggedInUserId();

    // Phase 1: Create all toggles immediately (non-blocking)
    for (const contactId of contactIds) {
      const contact = contacts[contactId];
      const toggleContainer = container.querySelector(
        `.contact-msg-toggle-container[data-contact-id="${contactId}"]`,
      );

      if (!toggleContainer) {
        console.warn(
          `[CONTACTS] No toggle container found for contact ${contactId}`,
        );
        continue;
      }

      // Create toggle with 0 count initially - will update asynchronously
      const toggle = createMessageToggle({
        parent: toggleContainer,
        onToggle: () => {
          messagesUI.openContactMessages(contactId, contact.contactName, true);
          const toggle = contactMessageToggles.get(contactId);
          if (toggle) toggle.clearBadge();
        },
        icon: '💬',
        initialUnreadCount: 0,
      });

      if (!toggle) {
        console.error(
          `[CONTACTS] Failed to create toggle for contact ${contactId}`,
        );
        continue;
      }

      // Store toggle reference
      contactMessageToggles.set(contactId, toggle);

      // Set up real-time listener for badge updates via messaging controller
      const unsubscribe = messagingController.listenToUnreadCount(
        contactId,
        (count) => {
          toggle.setUnreadCount(count);
          if (count > 0) updateLastInteraction(contactId);
        },
      );

      // Track unsubscribe function for cleanup
      messageBadgeListeners.set(contactId, unsubscribe);
    }

    // Phase 2: Fetch all unread counts in parallel (non-blocking)
    Promise.all(
      contactIds.map((contactId) =>
        messagingController
          .getUnreadCount(contactId)
          .then((count) => {
            const toggle = contactMessageToggles.get(contactId);
            if (toggle) {
              toggle.setUnreadCount(count);
            }
          })
          .catch((err) =>
            console.warn(
              `[CONTACTS] Failed to get unread count for ${contactId}:`,
              err,
            ),
          ),
      ),
    );
  } finally {
    // Clear timeout and reset flag
    if (toggleReplacementTimeout) {
      clearTimeout(toggleReplacementTimeout);
      toggleReplacementTimeout = null;
    }
    toggleReplacementInProgress = false;
  }
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

export function cleanupContacts() {
  presenceListeners.forEach(({ ref: presenceRef, callback }) => {
    off(presenceRef, 'value', callback);
  });
  presenceListeners.clear();

  messageBadgeListeners.forEach((unsubscribe) => unsubscribe());
  messageBadgeListeners.clear();

  contactMessageToggles.forEach((toggle) => toggle.cleanup());
  contactMessageToggles.clear();
}
