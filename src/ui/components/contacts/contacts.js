import { ref, set, get, remove, update, onValue, off } from 'firebase/database';
import { rtdb } from '../../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../../auth/auth-state.js';
import confirmDialog from '../base/confirm-dialog.js';
import editContactModal from './edit-contact-modal.js';
import { hideElement, showElement } from '../../utils/ui-utils.js';
import { t, onLocaleChange } from '../../../i18n/index.js';
import { escapeHtml } from '../../../ui/component-system/dom-utils.js';
import { initIcons } from '../../icons.js';
import { messagingController } from '../../../messaging/messaging-controller.js';

// Track presence listeners for cleanup
const presenceListeners = new Map();

// Track unread count listeners for cleanup
const unreadListeners = new Map();

// Track locale change listener for cleanup
let localeUnsubscribe = null;
let lastRenderedLobby = null;

// Limit displayed contact name length in the UI (keep full name in title)
const MAX_CONTACT_NAME_CHARS = 18;

function sortContactIdsByLastInteraction(contacts) {
  return Object.keys(contacts).sort((a, b) => {
    const aTime = contacts[a]?.lastInteractionAt || contacts[a]?.savedAt || 0;
    const bTime = contacts[b]?.lastInteractionAt || contacts[b]?.savedAt || 0;
    if (aTime !== bTime) return bTime - aTime;
    // Alphabetical by display name when timestamps are equal
    const aName = (contacts[a]?.contactName || '').toLowerCase();
    const bName = (contacts[b]?.contactName || '').toLowerCase();
    return aName.localeCompare(bName);
  });
}

/**
 * Save a contact for the current user (RTDB if logged in, localStorage otherwise).
 */
export async function saveContactData(contactId, contactName, roomId) {
  if (!contactName || typeof contactName !== 'string' || !contactName.trim()) {
    console.warn(
      `[CONTACTS] Invalid contactName for ${contactId}, falling back to 'No Name'`,
    );
    contactName = '';
  }

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
 * Get the most recently interacted contact (by lastInteractionAt or savedAt). Returns null if no contacts.
 * Useful for defaulting to most recent contact in messages or call flows.
 */
export async function getContactByMostRecentInteraction() {
  try {
    const contacts = await getContacts();
    const sortedIds = sortContactIdsByLastInteraction(contacts);
    const mostRecentId = sortedIds[0];
    return contacts[mostRecentId] || null;
  } catch (e) {
    console.warn('Failed to get contact by most recent interaction', e);
    return null;
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
  if (!roomId) return fallbackUserId || t('shared.unknown');

  try {
    const contacts = await getContacts();
    for (const contact of Object.values(contacts || {})) {
      if (contact?.roomId === roomId) {
        return contact.contactName || t('contact.no_name');
      }
    }
  } catch (e) {
    console.warn('Failed to resolve caller name', e);
  }

  return fallbackUserId || t('shared.unknown');
}

/**
 * Prompt user to save contact after hangup, and render contacts list in lobby.
 */
export async function saveContact(contactUserId, roomId, lobbyElement) {
  if (!contactUserId || !roomId) return;

  if (!getLoggedInUserId()) {
    console.debug(
      '[CONTACTS] saveContact called while logged out. Only logged-in users can save contacts.',
    ); // Prompt to log in?
    return;
  }

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
    // Ensure listener is active for incoming calls on this room
    document.dispatchEvent(
      new CustomEvent('contact:saved', { detail: { roomId } }),
    );
    return;
  }

  const shouldSave = await confirmDialog(t('contact.save.confirm'), {
    autoRemoveSeconds: 15,
  });

  if (!shouldSave) return;

  const contactName =
    window.prompt(t('contact.name.prompt'), contactUserId) || contactUserId;

  await saveContactData(contactUserId, contactName, roomId);

  // Ensure listener is active for incoming calls on this room
  document.dispatchEvent(
    new CustomEvent('contact:saved', { detail: { roomId } }),
  );

  // Re-render contacts list
  await renderContactsList(lobbyElement);
}

/**
 * Render the contacts list in the lobby element.
 */
export async function renderContactsList(lobbyElement) {
  if (!lobbyElement) return;

  // Update lobby reference on every render
  lastRenderedLobby = lobbyElement;

  // Set up locale change listener on first render
  if (!localeUnsubscribe) {
    localeUnsubscribe = onLocaleChange(() => {
      if (lastRenderedLobby) renderContactsList(lastRenderedLobby);
    });
  }

  const contacts = await getContacts();
  const contactIds = sortContactIdsByLastInteraction(contacts);

  // Find or create contacts container
  let contactsContainer = lobbyElement.querySelector('.contacts-container');
  if (!contactsContainer) {
    contactsContainer = document.createElement('div');
    contactsContainer.className = 'contacts-container';
    lobbyElement.appendChild(contactsContainer);
  }

  if (contactIds.length === 0) {
    // Ensure per-contact listeners are torn down when list becomes empty
    setupPresenceIndicators([]);
    setupUnreadBadges([]);
    contactsContainer.innerHTML = `<p>${t('contact.none')}</p>`;
    hideElement(contactsContainer);
    return;
  }

  // Ensure container is visible when contacts exist (if using display: none above)
  showElement(contactsContainer);

  // Render contact items (escape contact names)
  contactsContainer.innerHTML = `
    <div class="contacts-list">
      ${contactIds
        .map((id) => {
          const contact = contacts[id];
          const rawName = contact.contactName || t('contact.no_name');
          const escapedName = escapeHtml(rawName);
          const shortName =
            escapedName.length > MAX_CONTACT_NAME_CHARS
              ? escapedName.slice(0, MAX_CONTACT_NAME_CHARS - 2) + '..'
              : escapedName;
          return `
            <div class="contact-entry">
              <button
                class="contact-call-btn"
                data-room-id="${escapeHtml(contact.roomId || '')}"
                data-contact-name="${escapedName}"
                data-contact-id="${escapeHtml(id)}"
                title="${escapeHtml(t('contact.action.call', { name: escapedName }))}"
              >
                <i data-lucide="phone" fill="currentColor" stroke-width="0"></i>
              </button>

              <span class="presence-indicator" data-contact-id="${escapeHtml(id)}"></span>

              <span class="contact-name" data-contact-id="${escapeHtml(id)}" data-contact-name="${escapedName}">
                ${shortName}
              </span>

              <span
                class="unread-badge"
                data-contact-id="${escapeHtml(id)}"
                aria-live="polite"
                aria-atomic="true"
                hidden
              ></span>

              <button
                class="contact-edit-btn"
                data-contact-id="${escapeHtml(id)}"
                title="${escapeHtml(t('contact.action.edit'))}"
              >
                ⋮
              </button>

            </div>
          `;
        })
        .join('')}
    </div>
  `;

  initIcons(contactsContainer);

  // Attach event listeners for call/delete buttons
  attachContactListeners(contactsContainer, lobbyElement);

  // Setup presence indicators for each contact
  setupPresenceIndicators(contactIds);

  // Setup unread message badges
  setupUnreadBadges(contactIds);
}

/**
 * Attach event listeners to contact list elements.
 */
function attachContactListeners(container, lobbyElement) {
  // Call buttons - click to call
  container.querySelectorAll('.contact-call-btn').forEach((nameEl) => {
    nameEl.onclick = async () => {
      let roomId = nameEl.getAttribute('data-room-id');
      const contactName = nameEl.getAttribute('data-contact-name');
      const contactId = nameEl.getAttribute('data-contact-id');

      if (roomId || contactId) {
        document.dispatchEvent(
          new CustomEvent('contact:call', {
            detail: { contactId, contactName, roomId },
          }),
        );
      }
    };
  });

  // Contact name - click to open messages
  container.querySelectorAll('.contact-name[data-contact-id]').forEach((el) => {
    el.onclick = () => {
      const contactId = el.getAttribute('data-contact-id');
      const contactName = el.getAttribute('data-contact-name');
      if (contactId) {
        clearUnreadBadge(contactId);
        document.dispatchEvent(
          new CustomEvent('messages:toggle', {
            detail: { contactId, contactName },
          }),
        );
      }
    };
  });

  // Edit buttons — opens modal with rename + delete
  container.querySelectorAll('.contact-edit-btn').forEach((btn) => {
    btn.onclick = async () => {
      const contactId = btn.getAttribute('data-contact-id');
      if (!contactId) return;

      const contacts = await getContacts();
      const contact = contacts[contactId];
      if (!contact) return;

      const result = await editContactModal(contact.contactName || '');
      if (!result) return;

      if (result.action === 'rename') {
        await saveContactData(contactId, result.name, contact.roomId);
      } else if (result.action === 'delete') {
        const confirmed = await confirmDialog(t('contact.delete.confirm'));
        if (!confirmed) return;
        await deleteContact(contactId);
      }
      await renderContactsList(lobbyElement);
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

/**
 * Setup unread message badges for contacts list.
 * Listens to each contact's conversation for unread count changes.
 */
function setupUnreadBadges(contactIds) {
  // Clean up old listeners
  unreadListeners.forEach((unsub) => unsub());
  unreadListeners.clear();

  if (!getLoggedInUserId()) return;

  contactIds.forEach((contactId) => {
    const badgeEl = document.querySelector(
      `.unread-badge[data-contact-id="${contactId}"]`,
    );
    if (!badgeEl) return;

    // Debounce rapid-fire callbacks during initial onChildAdded replay
    let debounceTimer = null;

    const unsub = messagingController.listenToUnreadCount(
      contactId,
      (count) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (count > 0) {
            badgeEl.textContent = count > 99 ? '99+' : String(count);
            badgeEl.hidden = false;
          } else {
            badgeEl.hidden = true;
          }
        }, 50);
      },
    );

    unreadListeners.set(contactId, () => {
      clearTimeout(debounceTimer);
      unsub();
    });
  });
}

/**
 * Clear the unread badge for a specific contact (e.g. when messages are opened).
 */
export function clearUnreadBadge(contactId) {
  const badgeEl = document.querySelector(
    `.unread-badge[data-contact-id="${contactId}"]`,
  );
  if (badgeEl) badgeEl.hidden = true;
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

  unreadListeners.forEach((unsub) => unsub());
  unreadListeners.clear();

  if (localeUnsubscribe) {
    localeUnsubscribe();
    localeUnsubscribe = null;
  }
  lastRenderedLobby = null;
}
