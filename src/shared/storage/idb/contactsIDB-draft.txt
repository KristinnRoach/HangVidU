import Dexie from 'dexie';

class ContactsDB extends Dexie {
  constructor() {
    super('HangVidU:Contacts');

    this.version(1).stores({
      contacts: '++id, roomId, lastConnected',
    });
  }
}

const db = new ContactsDB();

export async function saveContactIDB(roomId) {
  try {
    const existing = await db.contacts.where('roomId').equals(roomId).first();

    if (existing) {
      // Update existing contact
      await db.contacts.update(existing.id, {
        lastConnected: Date.now(),
      });
      return existing.id;
    } else {
      // Create new contact
      const id = await db.contacts.add({
        roomId,
        lastConnected: Date.now(),
      });
      return id;
    }
  } catch (error) {
    console.error('Failed to save contact:', error);
    return null;
  }
}

export async function getContactsIDB() {
  try {
    return await db.contacts.orderBy('lastConnected').reverse().toArray();
  } catch (error) {
    console.error('Failed to get contacts:', error);
    return [];
  }
}

export async function deleteContactIDB(id) {
  try {
    await db.contacts.delete(id);
    return true;
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return false;
  }
}
