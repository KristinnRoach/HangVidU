import { getContacts, deleteContact } from '../../storage/idb.js';

let contactsContainer = null;

export function initContactsUI() {
  // Create contacts container if it doesn't exist
  if (!contactsContainer) {
    contactsContainer = document.createElement('div');
    contactsContainer.id = 'contacts-container';
    contactsContainer.className = 'contacts-container';

    // Insert after the lobby div
    const lobby = document.getElementById('lobby');
    lobby.parentNode.insertBefore(contactsContainer, lobby.nextSibling);
  }

  renderContacts();
}

export async function renderContacts() {
  if (!contactsContainer) return;

  const contacts = await getContacts();

  if (contacts.length === 0) {
    contactsContainer.innerHTML = '';
    return;
  }

  contactsContainer.innerHTML = `
    <div class="contacts-section">
      <h3>Saved Rooms</h3>
      <div class="contacts-list">
        ${contacts
          .map(
            (contact) => `
          <div class="contact-item" data-contact-id="${contact.id}">
            <button class="contact-call-btn" data-room-id="${contact.roomId}">
              📞 Room ${contact.roomId.slice(-6)}
            </button>
            <button class="contact-delete-btn" data-contact-id="${contact.id}">
              ✕
            </button>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  // Add event listeners
  contactsContainer.addEventListener('click', handleContactClick);
}

async function handleContactClick(event) {
  const callBtn = event.target.closest('.contact-call-btn');
  const deleteBtn = event.target.closest('.contact-delete-btn');

  if (callBtn) {
    const roomId = callBtn.dataset.roomId;
    // Trigger room join - we'll need to expose this from main.js
    if (window.joinSavedRoom) {
      window.joinSavedRoom(roomId);
    }
  }

  if (deleteBtn) {
    const contactId = parseInt(deleteBtn.dataset.contactId);
    await deleteContact(contactId);
    renderContacts();
  }
}

export function hideContacts() {
  if (contactsContainer) {
    contactsContainer.style.display = 'none';
  }
}

export function showContacts() {
  if (contactsContainer) {
    contactsContainer.style.display = 'block';
  }
}
