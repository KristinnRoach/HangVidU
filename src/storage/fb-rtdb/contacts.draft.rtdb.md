import { rtdb } from '../../p2p/firebase/firebase.js';
import { auth } from '../../p2p/firebase/auth.js';
import { ref, set, get, serverTimestamp } from 'firebase/database';

// Save a contact for the currently authenticated user using the modular SDK
async function saveContact(roomId, remoteUser) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('No authenticated user. Cannot save contact.');
  }

  const contactRef = ref(
    rtdb,
    `users/${currentUser.uid}/contacts/${remoteUser.uid}`
  );

  await set(contactRef, {
    roomId,
    displayName: remoteUser.displayName || null,
    photoURL: remoteUser.photoURL || null,
    lastCall: serverTimestamp(),
  });
}

// Read contacts for the currently authenticated user using the modular SDK
async function getContacts() {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('No authenticated user. Cannot get contacts.');
  }

  const contactsRef = ref(rtdb, `users/${currentUser.uid}/contacts`);
  const snapshot = await get(contactsRef);
  return snapshot && snapshot.exists() ? snapshot.val() : {};
}

export { saveContact, getContacts };
