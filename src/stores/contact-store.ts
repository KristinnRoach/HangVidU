import { createStore, produce } from 'solid-js/store';
import { getIsLoggedIn, getLoggedInUserId } from '../auth/index.js';
import { rtdb } from '../shared/storage/fb-rtdb/rtdb.js';
import {
  createContactsLocalStorageRepository,
  createContactsRTDBStoreRepository,
} from '../features/contacts/storage/index.js';
import {
  resolveContactIdFromDirectConversationId,
  resolveDirectConversationId,
} from '../shared/utils/direct-conversation-id.js';

type Contact = any;

const [state, setState] = createStore<{
  byId: Record<string, Contact>;
  isHydrated: boolean;
}>({ byId: {}, isHydrated: false });

let hydrationPromise: Promise<void> | null = null;
let hydratedScopeKey: string | null = null;
let hydrationRequestId = 0;

function getScopeKey(ownerId: string | null = getLoggedInUserId()): string {
  return ownerId ? `user:${ownerId}` : 'guest';
}

function getRepo(ownerId: string | null = getLoggedInUserId()) {
  if (ownerId) {
    return createContactsRTDBStoreRepository({
      database: rtdb,
      getOwnerId: () => ownerId,
    });
  }
  return createContactsLocalStorageRepository({ storageKey: 'contacts' });
}

function logFailure(
  action: string,
  error: unknown,
  context: Record<string, unknown> = {},
) {
  console.warn(`[contacts] ${action} failed`, { ...context, error });
}

// ---------- reads ----------

export function getContactsStore() {
  return state;
}

export function getAllContacts(): Record<string, Contact> {
  return state.byId;
}

export function getContactById(contactId: string): Contact | null {
  return state.byId[contactId] ?? null;
}

export function getContactByRoomId(
  roomId: string | null | undefined,
): Contact | null {
  if (!roomId) return null;
  for (const contact of Object.values(state.byId)) {
    if (contact?.roomId === roomId) return contact;
  }
  return null;
}

export function getConversationId(contactId: string): string | null {
  return state.byId[contactId]?.conversationId ?? null;
}

export function getAllContactsSorted(): Contact[] {
  return Object.values(state.byId).sort((a: any, b: any) => {
    const aTime = a?.lastInteractionAt || a?.savedAt || 0;
    const bTime = b?.lastInteractionAt || b?.savedAt || 0;
    if (aTime !== bTime) return bTime - aTime;
    const aName = (a?.contactNickName || '').toLowerCase();
    const bName = (b?.contactNickName || '').toLowerCase();
    return aName.localeCompare(bName);
  });
}

export function getContactByMostRecentInteraction(): Contact | null {
  return getAllContactsSorted()[0] ?? null;
}

export function getContactsIsHydrated(): boolean {
  return state.isHydrated;
}

// ---------- mutations ----------

export async function saveContact(
  contactId: string,
  contactNickName: string,
  roomId: string | null | undefined,
) {
  try {
    const ownerId = getLoggedInUserId();
    const repo = getRepo(ownerId);
    const existing = await repo.get(contactId);
    const now = Date.now();
    const conversationId =
      existing?.conversationId ??
      (ownerId ? resolveDirectConversationId(ownerId, contactId) : null);

    const contact = await repo.put({
      contactId,
      contactNickName,
      roomId,
      conversationId,
      savedAt: existing?.savedAt ?? now,
      lastInteractionAt: existing?.lastInteractionAt ?? now,
    });

    setState('byId', contactId, contact);
    return contact;
  } catch (error) {
    logFailure('saveContact', error, { contactId, roomId: roomId ?? null });
    return null;
  }
}

export async function updateContact(
  contactId: string,
  contactNickName: string,
  roomId: string | null | undefined,
) {
  try {
    const repo = getRepo();
    const existing = await repo.get(contactId);
    if (!existing) return null;
    const updated = await repo.patch(contactId, { contactNickName, roomId });
    if (!updated) return null;
    setState('byId', contactId, updated);
    return updated;
  } catch (error) {
    logFailure('updateContact', error, { contactId, roomId: roomId ?? null });
    return null;
  }
}

export async function deleteContact(contactId: string): Promise<boolean> {
  try {
    const deleted = await getRepo().remove(contactId);
    if (!deleted) return false;
    setState(
      'byId',
      produce((byId: Record<string, Contact>) => {
        delete byId[contactId];
      }),
    );
    return true;
  } catch (error) {
    logFailure('deleteContact', error, { contactId });
    return false;
  }
}

export async function recordInteraction(contactId: string) {
  if (!contactId || !getLoggedInUserId()) return null;
  try {
    const updated = await getRepo().patch(contactId, {
      lastInteractionAt: Date.now(),
    });
    if (updated) setState('byId', contactId, updated);
    return updated;
  } catch (error) {
    logFailure('recordInteraction', error, { contactId });
    return null;
  }
}

export async function recordInteractionByConversation(conversationId: string) {
  const myUserId = getLoggedInUserId();
  if (!conversationId || !myUserId) return null;
  const contactId = resolveContactIdFromDirectConversationId(
    conversationId,
    myUserId,
  );
  if (!contactId) return null;
  return recordInteraction(contactId);
}

export async function handleHangUp(contactUserId: string, roomId: string) {
  if (getIsLoggedIn() && !state.isHydrated) {
    try {
      await hydrateContacts();
    } catch (error) {
      logFailure('handleHangUp.hydrate', error, { contactUserId, roomId });
      return { action: 'skip' as const, reason: 'contacts-not-ready' };
    }
  }

  const entry = state.byId[contactUserId];
  if (entry) {
    if (entry.roomId !== roomId) {
      await updateContact(contactUserId, entry.contactNickName, roomId);
    }
    return { action: 'existing' as const };
  }

  if (!getIsLoggedIn()) {
    return { action: 'skip' as const, reason: 'not-logged-in' };
  }

  return { action: 'prompt-save' as const };
}

// ---------- lifecycle ----------

export async function hydrateContacts(): Promise<void> {
  const ownerId = getLoggedInUserId();
  const scopeKey = getScopeKey(ownerId);

  if (state.isHydrated && hydratedScopeKey === scopeKey) return;
  if (hydrationPromise) return hydrationPromise;

  const requestId = ++hydrationRequestId;
  hydrationPromise = (async () => {
    try {
      const records = await getRepo(ownerId).list();
      if (requestId !== hydrationRequestId) return;
      const byId: Record<string, Contact> = {};
      for (const record of records) {
        if (record?.contactId) byId[record.contactId] = record;
      }
      hydratedScopeKey = scopeKey;
      setState({ byId, isHydrated: true });
    } catch (error) {
      logFailure('hydrateContacts', error);
      throw error;
    } finally {
      if (requestId === hydrationRequestId) hydrationPromise = null;
    }
  })();

  return hydrationPromise;
}

export function resetContacts(): void {
  hydrationPromise = null;
  hydratedScopeKey = null;
  hydrationRequestId += 1;
  setState({ byId: {}, isHydrated: false });
}
