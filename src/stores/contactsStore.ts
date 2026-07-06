import { z } from 'zod';
import { createStore } from 'solid-js/store';
import {
  getIsLoggedIn,
  getLoggedInUserId,
  getLoggedInUserToken,
} from '../auth/index.js';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url';
import {
  ContactRecordSchema,
  createContactsLocalStorageRepository,
  createContactsD1Repository,
} from '../storage/contacts/index.js';

export type Contact = z.infer<typeof ContactRecordSchema>;

type ContactsStatus = 'idle' | 'loading' | 'ready' | 'error';

const [state, setState] = createStore<{
  byId: Record<string, Contact>;
  status: ContactsStatus;
}>({ byId: {}, status: 'idle' });

let hydrationPromise: Promise<void> | null = null;
let hydratedScopeKey: string | null = null;
let hydrationRequestId = 0;

function getScopeKey(ownerId: string | null = getLoggedInUserId()): string {
  return ownerId ? `user:${ownerId}` : 'guest';
}

function getRepo(ownerId: string | null = getLoggedInUserId()) {
  if (ownerId) {
    // Owner is derived server-side from the bearer token; the D1 adapter needs
    // no getOwnerId. ownerId only gates logged-in vs guest here.
    return createContactsD1Repository({
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
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

function recordsById(records: Contact[]): Record<string, Contact> {
  const byId: Record<string, Contact> = {};
  for (const record of records) {
    if (record?.contactId) byId[record.contactId] = record;
  }
  return byId;
}

async function patchContactState(
  contactId: string,
  patch: Partial<Pick<Contact, 'nickname' | 'conversationId'>>,
  action: string,
): Promise<Contact | null> {
  try {
    const updated = await getRepo().patch(contactId, patch);
    if (updated) setState('byId', contactId, updated);
    return updated;
  } catch (error) {
    logFailure(action, error, { contactId });
    return null;
  }
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

export function getContactByConversationId(
  conversationId: string | null | undefined,
): Contact | null {
  if (!conversationId) return null;
  for (const contact of Object.values(state.byId)) {
    if (contact?.conversationId === conversationId) return contact;
  }
  return null;
}

/** Display label precedence for a contact; null when no name is known. */
export function getContactLabel(contact: Contact): string | null {
  return contact.nickname || contact.displayName || contact.username || null;
}

export function getContactsIsHydrated(): boolean {
  return state.status === 'ready';
}

// ---------- mutations ----------

export async function updateContact(contactId: string, nickname: string) {
  return patchContactState(contactId, { nickname }, 'updateContact');
}

/**
 * Cache a lazily-resolved conversationId onto the contact record so future
 * opens use the fast local path instead of re-resolving over the network.
 * Best-effort: failures are logged, not surfaced — the caller already has
 * the id in memory for the current open.
 */
export async function cacheContactConversationId(
  contactId: string,
  conversationId: string | null,
): Promise<void> {
  await patchContactState(
    contactId,
    { conversationId },
    'cacheContactConversationId',
  );
}

export async function handleHangUp(
  contactUserId: string,
  conversationId: string,
) {
  if (!getIsLoggedIn()) {
    return { action: 'skip' as const, reason: 'not-logged-in' };
  }

  try {
    await hydrateContacts();
  } catch (error) {
    logFailure('handleHangUp.hydrate', error, {
      contactUserId,
      conversationId,
    });
    return { action: 'skip' as const, reason: 'contacts-not-ready' };
  }

  if (!getIsLoggedIn()) {
    return { action: 'skip' as const, reason: 'not-logged-in' };
  }

  const entry = state.byId[contactUserId];
  if (entry) {
    if (entry.conversationId !== conversationId) {
      await cacheContactConversationId(contactUserId, conversationId);
    }
    return { action: 'existing' as const };
  }

  return { action: 'prompt-save' as const };
}

// ---------- lifecycle ----------

export async function hydrateContacts(): Promise<void> {
  const ownerId = getLoggedInUserId();
  const scopeKey = getScopeKey(ownerId);

  if (state.status === 'ready' && hydratedScopeKey === scopeKey) return;
  if (hydrationPromise) return hydrationPromise;

  const requestId = ++hydrationRequestId;
  setState({ status: 'loading' });

  const promise = Promise.resolve().then(async () => {
    try {
      const records = await getRepo(ownerId).list();
      if (requestId !== hydrationRequestId) return;
      const byId = recordsById(records);
      hydratedScopeKey = scopeKey;
      setState({ byId, status: 'ready' });
    } catch (error) {
      if (requestId === hydrationRequestId) setState({ status: 'error' });
      logFailure('hydrateContacts', error);
      throw error;
    } finally {
      if (hydrationPromise === promise) hydrationPromise = null;
    }
  });

  hydrationPromise = promise;
  return promise;
}

/**
 * Force a re-list from storage, bypassing the `ready` short-circuit in
 * `hydrateContacts`. This is the live-refresh path after a connect (request
 * accept / referral auto-connect): the new contact must appear on an
 * already-hydrated tab without a manual reload. No `loading` flip — the current
 * list stays visible to avoid a flicker. Bumps the request id so any in-flight
 * hydrate bails out in favor of this fresher read.
 */
export async function reloadContacts(): Promise<void> {
  const ownerId = getLoggedInUserId();
  const scopeKey = getScopeKey(ownerId);
  const requestId = ++hydrationRequestId;
  hydrationPromise = null;
  try {
    const records = await getRepo(ownerId).list();
    if (requestId !== hydrationRequestId) return;
    const byId = recordsById(records);
    hydratedScopeKey = scopeKey;
    setState({ byId, status: 'ready' });
  } catch (error) {
    if (requestId === hydrationRequestId) hydrationPromise = null;
    logFailure('reloadContacts', error);
  }
}

export function resetContacts(): void {
  hydrationPromise = null;
  hydratedScopeKey = null;
  hydrationRequestId += 1;
  setState({ byId: {}, status: 'idle' });
}
