import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '../../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../../auth/auth-state.js';
import confirmDialog from '../base/confirm-dialog.js';
import editContactModal from './edit-contact-modal.js';
import { hideElement, showElement } from '../../utils/ui-utils.js';
import { t, onLocaleChange } from '../../../i18n/index.js';
import { escapeHtml } from '../../../ui/component-system/dom-utils.js';
import { initIcons } from '../../icons.js';
import { messagingController } from '../../../messaging/messaging-controller.js';
import { contactsController } from '../../../contacts/contacts-controller.js';

// Track presence listeners for cleanup
const presenceListeners = new Map();

// Track unread count listeners for cleanup
const unreadListeners = new Map();

// Track locale change listener for cleanup
let localeUnsubscribe = null;
let lastRenderedLobby = null;

// Limit displayed contact name length in the UI (keep full name in title)
const MAX_CONTACT_NAME_CHARS = 18;

/**
 * Prompt user to save contact after hangup, and render contacts list in lobby.
 */
export async function saveContact(contactUserId, roomId, parentContainerEl) {
  if (!contactUserId || !roomId) return;

  if (!getLoggedInUserId()) {
    // TODO: Fix - simple local save for guests, needs review to guard against any functionality that is currently not available unless logged in via google
    console.warn(
      '[CONTACTS] saveContact called while logged out. Only logged-in users can save contacts.',
    ); // Prompt to log in?
    alert('Must log in to save contacts!'); // TEMP fix
    return;
  }

  // If this contact is already saved, don't prompt again.
  // If the roomId changed, update it silently.
  const existing = await contactsController.getContacts();
  const existingEntry = existing?.[contactUserId];
  if (existingEntry) {
    if (existingEntry.roomId !== roomId) {
      // Keep existing name, just update the roomId
      await contactsController.saveContact(
        contactUserId,
        existingEntry.contactName,
        roomId,
      );
      await renderContactsList(parentContainerEl);
    }

    // TODO: Move dispatch to controller emmitter
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

  await contactsController.saveContact(contactUserId, contactName, roomId);

  // Ensure listener is active for incoming calls on this room
  document.dispatchEvent(
    new CustomEvent('contact:saved', { detail: { roomId } }),
  );

  // Re-render contacts list
  await renderContactsList(parentContainerEl);
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

  const contactsResult = await contactsController.getContactsSorted();

  // `getContactsSorted()` returns an array of contact objects (sorted by
  // lastInteractionAt). Older code assumed an object keyed by contactId,
  // which caused `Object.keys()` to return numeric indices ("0", "1") —
  // resulting in contact IDs like "0" being used downstream. Normalize
  // into an array of entries { id, ...contact } and a parallel id list.
  let entries = [];
  if (Array.isArray(contactsResult)) {
    entries = contactsResult.map((c) => ({ id: c.contactId || '', ...c }));
  } else if (contactsResult && typeof contactsResult === 'object') {
    entries = Object.keys(contactsResult).map((id) => ({
      id,
      ...contactsResult[id],
    }));
  }

  const contactIds = entries.map((e) => e.id);

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
      ${entries
        .map(({ id, contactId, contactName, roomId }) => {
          const rawName = contactName || t('contact.no_name');
          const escapedName = escapeHtml(rawName);
          const shortName =
            escapedName.length > MAX_CONTACT_NAME_CHARS
              ? escapedName.slice(0, MAX_CONTACT_NAME_CHARS - 2) + '..'
              : escapedName;
          return `
            <div class="contact-entry">
              <button
                class="contact-call-btn"
                data-room-id="${escapeHtml(roomId || '')}"
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
        contactsController.emit('contact:call', {
          contactId,
          contactName,
          roomId,
        });
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

      const contacts = await contactsController.getContacts();
      const contact = contacts[contactId];
      if (!contact) return;

      const result = await editContactModal(contact.contactName || '');
      if (!result) return;

      if (result.action === 'rename') {
        await contactsController.saveContact(
          contactId,
          result.name,
          contact.roomId,
        );
      } else if (result.action === 'delete') {
        const confirmed = await confirmDialog(t('contact.delete.confirm'));
        if (!confirmed) return;
        await contactsController.deleteContact(contactId);
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

    const conversationId =
      messagingController.resolveConversationIdFromContact(contactId);

    const unsub = messagingController.listenToUnreadCount(
      conversationId,
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
