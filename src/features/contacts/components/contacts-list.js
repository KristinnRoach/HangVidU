import { ref, onValue, off } from 'firebase/database';
import { rtdb } from '../../../shared/storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../../auth/index.js';
import confirmDialog from '../../../shared/components/base/confirm-dialog.js';
import editContactModal from './edit-contact-modal.js';
import {
  hideElement,
  showElement,
} from '../../../shared/components/ui/utils/ui-utils.js';
import { t, onLocaleChange } from '../../../shared/i18n/index.js';
import { escapeHtml } from '../../../shared/components/ui/component-system/dom-utils.js';
import { initIcons } from '../../../shared/components/ui/icons.js';
import { dispatchCommand, subscribe } from '../../../shared/events/index.js';
import { contactsService } from '../contacts-service.js';
import { getAllContacts, getAllContactsSorted } from '../contacts-state.js';

// TODO: WIP decoupling considerations:
// This feature-owned UI still composes shared UI primitives and messaging side effects.
// Keep shared primitives in src/ui, and avoid pulling broader UI orchestration into src/contacts.

// Track presence listeners for cleanup
const presenceListeners = new Map();

// Track unread count listeners for cleanup
const unreadListeners = new Map();

// Track locale change listener for cleanup
let localeUnsubscribe = null;

// Track state change listener for cleanup
let stateUnsubscribe = null;

// Track mounted lobby element for rerendering
let mountedLobbyElement = null;

// Limit displayed contact name length in the UI  (keep full name in title)
const MAX_CONTACT_NAME_CHARS = 18;

/**
 * Mount or rerender the contacts list into the mounted lobby element.
 */
async function mountContactsListInternal() {
  if (!mountedLobbyElement) {
    return;
  }

  // `getAllContactsSorted()` returns an array of contact objects (sorted by lastInteractionAt).
  const contactsResult = getAllContactsSorted();

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
  let contactsContainer = mountedLobbyElement.querySelector('.contacts-container');
  if (!contactsContainer) {
    contactsContainer = document.createElement('div');
    contactsContainer.className = 'contacts-container';
    mountedLobbyElement.appendChild(contactsContainer);
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
        .map(({ id, contactId, contactNickName, roomId, conversationId }) => {
          const rawName = contactNickName || t('contact.no_name');
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
                data-conversation-id="${escapeHtml(conversationId || '')}"
                title="${escapeHtml(t('contact.action.call', { name: escapedName }))}"
              >
                <i data-lucide="phone" fill="currentColor" stroke-width="0"></i>
              </button>

              <span class="presence-indicator" data-contact-id="${escapeHtml(id)}"></span>

              <span
                class="contact-name"
                data-contact-id="${escapeHtml(id)}"
                data-contact-name="${escapedName}"
                data-conversation-id="${escapeHtml(conversationId || '')}"
              >
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
  attachContactListeners(contactsContainer);

  // Setup presence indicators for each contact
  setupPresenceIndicators(contactIds, contactsContainer);

  // Setup unread message badges
  setupUnreadBadges(entries);
}

/**
 * Mount the contacts list once and keep it in sync with contacts state.
 *
 * @param {HTMLElement} lobbyElement
 * @returns {Promise<void>}
 */
export async function mountContactsList(lobbyElement) {
  if (lobbyElement !== undefined) {
    mountedLobbyElement = lobbyElement ?? null;
  }

  if (!localeUnsubscribe) {
    localeUnsubscribe = onLocaleChange(() => {
      mountContactsList().catch((error) => {
        console.warn('[contacts] Failed to rerender on locale change:', error);
      });
    });
  }

  if (!stateUnsubscribe) {
    stateUnsubscribe = subscribe('evt:contacts:state:changed', () => {
      mountContactsList().catch((error) => {
        console.warn('[contacts] Failed to rerender on state change:', error);
      });
    });
  }

  await mountContactsListInternal();
}

/**
 * Attach event listeners to contact list elements.
 */
function attachContactListeners(container) {
  if (!container || !mountedLobbyElement) {
    console.error(
      'attachContactListeners(): Container or mountedLobbyElement missing!',
    );
    return;
  }
  // Call buttons - click to call
  container.querySelectorAll('.contact-call-btn').forEach((nameEl) => {
    nameEl.onclick = async () => {
      let roomId = nameEl.getAttribute('data-room-id');
      const contactNickName = nameEl.getAttribute('data-contact-name');
      const contactId = nameEl.getAttribute('data-contact-id');
      const conversationId =
        nameEl.getAttribute('data-conversation-id') || null;

      if (roomId || contactId) {
        dispatchCommand('cmd:call:outgoing:initiate', {
          contactId,
          contactNickName,
          conversationId,
          roomId,
        });
      }
    };
  });

  // Contact name - click to open messages
  container.querySelectorAll('.contact-name[data-contact-id]').forEach((el) => {
    el.onclick = async () => {
      const contactId = el.getAttribute('data-contact-id');
      const conversationId = el.getAttribute('data-conversation-id') || null;
      if (contactId) {
        try {
          if (!conversationId) {
            console.warn('[contacts] No conversation id for contact', {
              contactId,
            });
            return;
          }

          dispatchCommand('cmd:messaging:conversation:select', {
            conversationId,
            remoteParticipantIds: [contactId],
            displayUI: true,
            contactNickName: el.getAttribute('data-contact-name') || null,
          });

          clearUnreadBadge(contactId);
        } catch (error) {
          console.warn('[contacts] Failed to open conversation', {
            contactId,
            error,
          });
        }
      }
    };
  });

  // Edit buttons — opens modal with rename + delete
  container.querySelectorAll('.contact-edit-btn').forEach((btn) => {
    btn.onclick = async () => {
      const contactId = btn.getAttribute('data-contact-id');
      if (!contactId) return;

      const contacts = getAllContacts();
      const contact = contacts[contactId];
      if (!contact) return;

      const result = await editContactModal(contact.contactNickName ?? '');
      if (!result) return;

      if (result.action === 'rename') {
        await contactsService.updateContact(
          contactId,
          result.name,
          contact.roomId,
        );
      } else if (result.action === 'delete') {
        const confirmed = await confirmDialog(t('contact.delete.confirm'));
        if (!confirmed) return;
        await contactsService.deleteContact(contactId);
      }
      await mountContactsList();
    };
  });
}

/**
 * Setup presence indicators for contacts list.
 * Watches each contact's presence and updates indicator color.
 */
function setupPresenceIndicators(contactIds, contactsContainer) {
  // Clean up old listeners
  presenceListeners.forEach(({ ref: presenceRef, callback }) => {
    off(presenceRef, 'value', callback);
  });
  presenceListeners.clear();

  if (!contactIds || !contactsContainer) {
    return;
  }

  // Only set up presence for logged-in users (guests don't have RTDB presence)
  if (!getLoggedInUserId()) return;

  contactIds.forEach((contactId) => {
    const presenceRef = ref(rtdb, `users/${contactId}/presence`);
    const indicatorEl = contactsContainer.querySelector(
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
function setupUnreadBadges(entries) {
  // Clean up old listeners
  unreadListeners.forEach((unsub) => unsub());
  unreadListeners.clear();

  if (!getLoggedInUserId()) return;

  entries.forEach(({ contactId, conversationId }) => {
    const badgeEl = document.querySelector(
      `.unread-badge[data-contact-id="${contactId}"]`,
    );
    if (!badgeEl || !conversationId) return;

    // Debounce rapid-fire callbacks during initial onChildAdded replay
    let debounceTimer = null;

    const offUnreadChanged = subscribe(
      'evt:messaging:conversation:unread-count-changed',
      ({ conversationId: updatedConversationId, unreadCount }) => {
        if (updatedConversationId !== conversationId) {
          return;
        }

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (unreadCount > 0) {
            badgeEl.textContent =
              unreadCount > 99 ? '99+' : String(unreadCount);
            badgeEl.hidden = false;
          } else {
            badgeEl.hidden = true;
          }
        }, 50);
      },
    );

    dispatchCommand('cmd:messaging:conversation:unread-count-listen', {
      conversationId,
    });

    unreadListeners.set(contactId, () => {
      clearTimeout(debounceTimer);
      offUnreadChanged();
      dispatchCommand('cmd:messaging:conversation:unread-count-unlisten', {
        conversationId,
      });
    });
  });
}

/**
 * Clear the unread badge for a specific contact (e.g. when messages are opened).
 */
function clearUnreadBadge(contactId) {
  const badgeEl = document.querySelector(
    `.unread-badge[data-contact-id="${contactId}"]`,
  );
  if (badgeEl) badgeEl.hidden = true;
}

/**
 * Remove contacts-list subscriptions and per-contact listeners created by `mountContactsList()`.
 *
 * @returns {void}
 */
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

  if (stateUnsubscribe) {
    stateUnsubscribe();
    stateUnsubscribe = null;
  }

  mountedLobbyElement = null;
}
