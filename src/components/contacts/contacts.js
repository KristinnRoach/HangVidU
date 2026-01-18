// contacts.js - Simple contacts management

import { ref, set, get, remove, onValue, off } from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../firebase/auth.js';
import { joinOrCreateRoomWithId, listenForIncomingOnRoom } from '../../main.js';
import { hideCallingUI, showCallingUI } from '../calling/calling-ui.js';
import confirmDialog from '../base/confirm-dialog.js';
import { hideElement, showElement } from '../../utils/ui/ui-utils.js';
import { messagingController } from '../../messaging/messaging-controller.js';
import { messagesUI } from '../messages/messages-ui.js';
import { createMessageToggle } from '../messages/message-toggle.js';
import { getDeterministicRoomId } from '../../utils/room-id.js';

// Track presence listeners for cleanup
const presenceListeners = new Map();

// Track message badge listeners for cleanup - Map<contactId, unsubscribe function>
const messageBadgeListeners = new Map();

// Track contact message toggles for cleanup
const contactMessageToggles = new Map();

// Limit displayed contact name length in the UI (keep full name in title)
const MAX_CONTACT_NAME_CHARS = 14;

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
        openContactMessages(contactId, contactName);
      }
    };
  });

  // Contact names - click to call
  container.querySelectorAll('.contact-name').forEach((nameEl) => {
    nameEl.onclick = async () => {
      let roomId = nameEl.getAttribute('data-room-id');
      const contactName = nameEl.getAttribute('data-contact-name');
      const contactId = nameEl.getAttribute('data-contact-id');

      // If no roomId is saved, generate and persist it
      if (!roomId && contactId) {
        const myUserId = getLoggedInUserId();
        if (myUserId) {
          try {
            roomId = getDeterministicRoomId(myUserId, contactId);
            console.log('[CONTACTS] Generated deterministic room ID:', roomId);
            // Persist the generated roomId
            await saveContactData(contactId, contactName, roomId);
            nameEl.setAttribute('data-room-id', roomId);
          } catch (e) {
            console.error('[CONTACTS] Failed to generate or save room ID:', e);
            return;
          }
        }
      }

      if (roomId) {
        // QUICK FIX: Ensure listener is active for this room before calling
        listenForIncomingOnRoom(roomId);

        // Request permissions before showing calling ui and playing audio.
        // Force initiator role when calling a saved contact to ensure a fresh call
        const success = await joinOrCreateRoomWithId(roomId, {
          forceInitiator: true,
        }).catch((e) => {
          console.warn('Failed to call contact:', e);
          return false;
        });
        // Only show calling UI if permissions granted and call initiated
        if (success) {
          await showCallingUI(roomId, contactName, () => {
            // TODO: Check if something (e.g. hangup handler, cleanup) needed here
          });
        }
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
 * Open messaging UI for a specific contact.
 * Creates a message session with RTDB transport.
 */
export function openContactMessages(
  contactId,
  contactName,
  openMessageBox = false,
) {
  if (!getLoggedInUserId()) {
    alert('Please sign in to send messages');
    return;
  }

  // Check if already have an active session for this contact
  const existingSession = messagingController.getSession(contactId);
  if (existingSession) {
    messagesUI.showMessagesToggle();
    // Just show the UI if openMessageBox is true (and not already open)
    if (openMessageBox && !messagesUI.isMessagesUIOpen()) {
      messagesUI.toggleMessages();
    }
    return;
  }

  // Close any existing contact message session (only one at a time)
  const allSessions = messagingController.getAllSessions();
  allSessions.forEach((session) => {
    session.close();
  });

  // Clear messages UI and reset session BEFORE opening new session
  // (otherwise onChildAdded fires synchronously and messages get cleared afterward)
  messagesUI.clearMessages();
  messagesUI.setSession(null); // Reset so setSession() below doesn't re-clear

  // Open messaging session
  const session = messagingController.openSession(contactId, {
    onMessage: (text, msgData, isSentByMe) => {
      // Display message in UI with correct prefix
      if (isSentByMe) {
        messagesUI.appendChatMessage(`${text}`, { isSentByMe: true });
      } else {
        // Only count as unread if message hasn't been read yet
        const isUnread = !msgData.read;
        messagesUI.receiveMessage(text, { isUnread });
      }
    },
  });

  // Store metadata on session for reference
  session.contactName = contactName;
  session.toggle = contactMessageToggles.get(contactId);

  // Set this session as the active one in the UI (won't clear since we just did)
  messagesUI.setSession(session);

  // Show and open the messages UI
  messagesUI.showMessagesToggle();

  // Just show the UI if openMessageBox is true (and not already open)
  if (openMessageBox && !messagesUI.isMessagesUIOpen()) {
    messagesUI.toggleMessages();
  }

  // Mark all unread messages as read
  session.markAsRead().catch((err) => {
    console.warn('Failed to mark messages as read:', err);
  });

  // Clear the unread badge for this contact
  const toggle = contactMessageToggles.get(contactId);
  if (toggle) {
    toggle.clearBadge();
  }
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

      // Update indicator color
      indicatorEl.style.backgroundColor = isOnline ? '#00d26a' : '#444';
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
        onToggle: () =>
          openContactMessages(contactId, contact.contactName, true), // Note: true = open message box
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

/* OLD BADGE FUNCTIONS - TO BE REMOVED AFTER TESTING
/**
 * Add unread message badges to contact message buttons.
 * Loads initial unread counts and displays badges.
 */
/*async function addUnreadBadgesToContacts(container, contactIds) {
  if (!getLoggedInUserId()) return; // Only for logged-in users

  for (const contactId of contactIds) {
    const btn = container.querySelector(
      `.contact-message-btn[data-contact-id="${contactId}"]`
    );
    if (!btn) continue;

    // Get unread count for this contact
    const count = await getUnreadCount(contactId);

    // Add or update badge
    updateContactBadge(btn, count);
  }
}

/**
 * Update the badge on a specific contact message button.
 * Creates badge if needed, updates count, shows/hides based on count.
 */
function updateContactBadge(btn, count) {
  let badge = btn.querySelector('.notification-badge');

  if (count > 0) {
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'notification-badge';
      btn.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = 'flex';
  } else {
    // Hide badge if count is 0
    if (badge) {
      badge.style.display = 'none';
    }
  }
}

/**
 * Setup real-time listeners for contact message badges.
 * Listens for new unread messages and updates badge counts.
 */
function setupMessageBadgeListeners(container, contactIds) {
  // Clean up old listeners
  messageBadgeListeners.forEach(({ ref: messageRef, callback }) => {
    off(messageRef, 'child_added', callback);
  });
  messageBadgeListeners.clear();

  // Only set up for logged-in users
  const myUserId = getLoggedInUserId();
  if (!myUserId) return;

  contactIds.forEach((contactId) => {
    // Get conversation ID (sorted user IDs)
    const conversationId = [myUserId, contactId].sort().join('_');
    const messagesRef = ref(rtdb, `conversations/${conversationId}/messages`);

    const btn = container.querySelector(
      `.contact-message-btn[data-contact-id="${contactId}"]`,
    );
    if (!btn) return;

    // Listen for new messages
    const callback = async (snapshot) => {
      const msg = snapshot.val();
      if (!msg) return;

      // Only update badge for unread messages from the contact (not from me)
      if (msg.from === contactId && !msg.read) {
        // Refresh the unread count
        const count = await getUnreadCount(contactId);
        updateContactBadge(btn, count);
      }
    };

    // Start listening
    onChildAdded(messagesRef, callback);

    // Track for cleanup
    messageBadgeListeners.set(contactId, { ref: messagesRef, callback });
  });
}

/**
 * Clear the unread badge for a specific contact.
 * Called when opening messages with that contact.
 */
function clearContactBadge(contactId) {
  const btn = document.querySelector(
    `.contact-message-btn[data-contact-id="${contactId}"]`,
  );
  if (btn) {
    updateContactBadge(btn, 0);
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
