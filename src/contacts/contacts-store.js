import { ref, set, get, remove, update, onValue, off } from 'firebase/database';
import { rtdb } from '../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../auth/auth-state.js';
import { t } from '../i18n/index.js';

// Storage-layer helpers for contacts. Kept intentionally free of DOM logic.

function sortContactIdsByLastInteraction(contacts) {
  return Object.keys(contacts).sort((a, b) => {
    const aTime = contacts[a]?.lastInteractionAt || contacts[a]?.savedAt || 0;
    const bTime = contacts[b]?.lastInteractionAt || contacts[b]?.savedAt || 0;
    if (aTime !== bTime) return bTime - aTime;
    const aName = (contacts[a]?.contactName || '').toLowerCase();
    const bName = (contacts[b]?.contactName || '').toLowerCase();
    return aName.localeCompare(bName);
  });
}

// Returns the contactEntry object if successful otherwize null
async function saveContact(contactId, contactName, roomId) {
  if (!contactName || typeof contactName !== 'string' || !contactName.trim()) {
    console.warn(
      `[CONTACTS] Invalid contactName for ${contactId}, falling back to 'No Name'`,
    );
    contactName = '';
  }

  const loggedInUid = getLoggedInUserId();
  const now = Date.now();

  const contactEntry = {
    contactId,
    contactName,
    roomId,
    savedAt: now,
    lastInteractionAt: now,
  };

  if (loggedInUid) {
    const contactRef = ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`);
    await set(contactRef, contactEntry);
    return contactEntry;
  }

  // fallback to localStorage for guests
  try {
    const raw = localStorage.getItem('contacts') || '{}';
    const obj = JSON.parse(raw);
    obj[contactId] = contactEntry;
    localStorage.setItem('contacts', JSON.stringify(obj));
    return contactEntry;
  } catch (e) {
    console.warn('Failed to save contact to localStorage', e);
  }
  return null;
}

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

async function updateLastInteraction(contactId) {
  const loggedInUid = getLoggedInUserId();
  if (!loggedInUid) return;

  try {
    const contactRef = ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`);
    // Only update if the contact already exists. `update()` creates a new node otherwise
    const snap = await get(contactRef);
    if (snap.exists()) {
      await update(contactRef, { lastInteractionAt: Date.now() });
    } else {
      // No existing contact — skip
      return;
    }
  } catch (e) {
    console.warn('Failed to update lastInteractionAt', e);
  }
}

async function getContacts() {
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

async function getContactsSorted(sortedBy = 'lastInteractionAt') {
  if (sortedBy !== 'lastInteractionAt') {
    console.warn(
      `Unsupported sort field "${sortedBy}", defaulting to "lastInteractionAt"`,
    );
  }

  const contacts = await getContacts();
  const sortedIds = sortContactIdsByLastInteraction(contacts);
  return sortedIds.map((id) => contacts[id]);
}

async function getContact(contactId, loggedInUid = getLoggedInUserId()) {
  if (loggedInUid) {
    try {
      const contactRef = ref(
        rtdb,
        `users/${loggedInUid}/contacts/${contactId}`,
      );
      const snap = await get(contactRef);
      return snap.exists() ? snap.val() : null;
    } catch (e) {
      console.warn('Failed to read contact from RTDB', e);
      return null;
    }
  }

  // Guest: localStorage
  try {
    const raw = localStorage.getItem('contacts') || '{}';
    const obj = JSON.parse(raw);
    return obj[contactId] || null;
  } catch (e) {
    console.warn('Failed to read contact from localStorage', e);
    return null;
  }
}

async function getContactByMostRecentInteraction() {
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

async function getContactByRoomId(roomId) {
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

async function resolveCallerName(roomId, fallbackUserId) {
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

export const contactsStore = {
  saveContact,
  deleteContact,
  updateLastInteraction,
  getContacts,
  getContactsSorted,
  getContact,
  getContactByMostRecentInteraction,
  getContactByRoomId,
  resolveCallerName,
};
