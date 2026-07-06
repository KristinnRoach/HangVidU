// Active-conversation store: the selected conversation plus its live chat
// state (messages, draft, sends). Module singleton on the contacts pattern —
// views read `getConversationState()` and call the exported actions; all
// writes stay inside this module. Selection drives the message-watch
// lifecycle directly: open* starts the watch, reset (logout) stops it.

import { createSignal } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { getLoggedInUserId } from '../auth/index.js';
import { getLoggedInUserProfile } from './userProfileStore';
import { createD1MessageRepositoryFromEnv } from './message-repository';
import {
  markConversationRead,
  recordConversationListMessage,
} from './conversation-list-state';
import { resolveDirectConversationId } from './conversations-client';
import { cacheContactConversationId, getContactById } from './contactsStore.js';
import {
  deleteConversationFile,
  uploadConversationFile,
} from './filesStore.js';
import { getPushNotifications } from '../features/push-notifications/index.js';
import { compressImage } from '@lib/media/image-compress.js';
import { sortMessagesBySentAt } from '../features/conversations/message-ordering.js';
import {
  clearLocalDraft,
  loadLocalDraft,
  saveLocalDraft,
} from '../features/conversations/local-drafts.js';
import {
  IMAGE_COMPRESSION_THRESHOLD_BYTES,
  MAX_R2_FILE_UPLOAD_BYTES,
  attachmentFileName,
  isImageFile,
  readImageDimensions,
} from '../features/conversations/utils/attachments.js';
import type {
  ChatMessage,
  IncomingMessage,
  MessageRepository,
} from '../features/conversations/interfaces.js';
import type {
  ConversationId,
  FileMessagePayload,
  TextMessagePayload,
  UserId,
} from '../features/conversations/types.js';
import type { ReactionChange } from '../features/conversations/reactions/solid/solid.js';

export type ConversationSelection = {
  conversationId: ConversationId;
  remoteParticipantIds?: UserId[];
  nickname?: string | null;
  displayUI?: boolean;
};

type HistoryStatus = 'idle' | 'loading' | 'ready' | 'error';

type ConversationState = {
  conversationId: ConversationId | null;
  myUserId: UserId | null;
  draft: string;
  messages: ChatMessage[];
  sending: boolean;
  preparingFile: boolean;
  history: HistoryStatus;
  historyError: unknown;
};

const initial: ConversationState = {
  conversationId: null,
  myUserId: null,
  draft: '',
  messages: [],
  sending: false,
  preparingFile: false,
  history: 'idle',
  historyError: null,
};

const [state, setState] = createStore<ConversationState>({ ...initial });

const [selection, setSelection] = createSignal<ConversationSelection | null>(
  null,
);
export { selection };

const [latestReadCandidate, setLatestReadCandidate] = createSignal<{
  conversationId: ConversationId;
  myUserId: UserId;
  sentAt: number;
} | null>(null);

let repository: MessageRepository | null = null;
function getRepo(): MessageRepository {
  return (repository ??= createD1MessageRepositoryFromEnv());
}

// ---------- reads ----------

export function getConversationState() {
  return state;
}

// ---------- selected-contact persistence ----------

const STORAGE_PREFIX = 'hangvidu:conversations:selected-contact';

function getLocalStorage(): Storage | null {
  return typeof globalThis.localStorage === 'undefined'
    ? null
    : globalThis.localStorage;
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${encodeURIComponent(userId)}`;
}

function saveSelectedContactId(contactId: string | null): void {
  try {
    const userId = getLoggedInUserId();
    const storage = getLocalStorage();
    if (!userId || !storage) return;

    const key = storageKey(userId);
    if (contactId) storage.setItem(key, contactId);
    else storage.removeItem(key);
  } catch {
    // Selection persistence is best-effort; in-memory state remains canonical.
  }
}

export function loadSelectedContactId(): string | null {
  try {
    const userId = getLoggedInUserId();
    const storage = getLocalStorage();
    if (!userId || !storage) return null;

    return storage.getItem(storageKey(userId))?.trim() || null;
  } catch {
    return null;
  }
}

// ---------- draft persistence (debounced) ----------

const DRAFT_SAVE_DELAY_MS = 250;

let draftSaveTimer: ReturnType<typeof setTimeout> | undefined;
let pendingDraft:
  | { userId: UserId; conversationId: ConversationId; text: string }
  | undefined;

function clearDraftSaveTimer() {
  if (draftSaveTimer) {
    clearTimeout(draftSaveTimer);
    draftSaveTimer = undefined;
  }
}

function flushDraftSave() {
  clearDraftSaveTimer();
  if (!pendingDraft) return;

  saveLocalDraft(
    pendingDraft.userId,
    pendingDraft.conversationId,
    pendingDraft.text,
  );
  pendingDraft = undefined;
}

export function setConversationDraft(text: string) {
  setState('draft', text);

  const { conversationId, myUserId } = state;
  if (!conversationId || !myUserId) return;

  clearDraftSaveTimer();
  pendingDraft = { userId: myUserId, conversationId, text };
  draftSaveTimer = setTimeout(flushDraftSave, DRAFT_SAVE_DELAY_MS);
}

function clearPersistedDraft() {
  const { conversationId, myUserId } = state;
  if (!conversationId || !myUserId || !state.draft.trim()) return;

  clearDraftSaveTimer();
  pendingDraft = undefined;
  clearLocalDraft(myUserId, conversationId);
}

// ---------- message-list mutations ----------

function isChatMessage(message: ChatMessage | null): message is ChatMessage {
  return Boolean(message);
}

function envelopeToChatMessage(message: IncomingMessage): ChatMessage | null {
  if (message.payload.type === 'system' || message.payload.type === 'event') {
    return null;
  }

  const text =
    message.payload.type === 'text'
      ? message.payload.text
      : (message.payload.text ?? '');
  const attachment =
    message.payload.type === 'file'
      ? {
          type: 'file' as const,
          fileName: message.payload.fileName,
          mimeType: message.payload.mimeType,
          fileSize: message.payload.fileSize,
          width: message.payload.width,
          height: message.payload.height,
          storage: message.payload.storage,
        }
      : undefined;

  return {
    id: message.messageId,
    conversationId: message.conversationId,
    senderId: message.senderId,
    text,
    attachment,
    sentAt: message.sentAt,
    status: 'sent',
    reactions: message.reactions ?? [],
  };
}

function mergeLoadedMessages(messages: ChatMessage[]) {
  const byId = new Map(state.messages.map((msg) => [msg.id, msg]));
  for (const msg of messages) {
    byId.set(msg.id, msg);
  }
  // Reconcile keyed by id so unchanged messages keep their store identity —
  // otherwise every snapshot rebuilds the whole <For> list (and remounts
  // every <img>, collapsing scroll layout).
  setState(
    'messages',
    reconcile(sortMessagesBySentAt([...byId.values()]), { key: 'id' }),
  );
}

function addOptimisticMessage(msg: ChatMessage) {
  setState('messages', (msgs) => sortMessagesBySentAt([...msgs, msg]));
}

function markSent(tempId: string, realId: string) {
  setState('messages', (msgs) => {
    const realMessageAlreadyArrived =
      tempId !== realId && msgs.some((msg) => msg.id === realId);

    return sortMessagesBySentAt(
      msgs.flatMap((msg) => {
        if (msg.id === tempId) {
          return realMessageAlreadyArrived
            ? []
            : [{ ...msg, id: realId, status: 'sent' as const }];
        }
        if (msg.id === realId) return [{ ...msg, status: 'sent' as const }];
        return [msg];
      }),
    );
  });
}

function markFailed(tempId: string) {
  setState('messages', (m) => m.id === tempId, 'status', 'failed');
}

// ---------- watch lifecycle ----------

let stopWatch: (() => void) | undefined;

function startWatch(
  conversationId: ConversationId,
  myUserId: UserId,
  sel: ConversationSelection,
) {
  let disposed = false;
  let cleanup: (() => void) | undefined;

  const result = getRepo().watchRecentMessages(
    conversationId,
    (messages) => {
      if (disposed || conversationId !== state.conversationId) return;

      const loadedMessages = sortMessagesBySentAt(
        messages.map(envelopeToChatMessage).filter(isChatMessage),
      );
      mergeLoadedMessages(loadedMessages);
      setState({ history: 'ready' });

      const latest = loadedMessages.at(-1);
      if (latest) {
        // Only persisted watcher messages carry authoritative server time.
        setLatestReadCandidate({
          conversationId,
          myUserId,
          sentAt: latest.sentAt,
        });
        // Keep the contact-list row ordered for the open conversation —
        // covers the user's own send (never echoed over the mailbox). DM
        // only: peer uid is the activity map key.
        const peers = sel.remoteParticipantIds;
        if (peers?.length === 1) {
          recordConversationListMessage(
            peers[0],
            conversationId,
            latest.sentAt,
            latest.senderId,
          );
        }
      }
    },
    (error) => {
      if (disposed || conversationId !== state.conversationId) return;
      // Stale cached conversationId (env switch, deleted conversation):
      // clear the cache and re-resolve once. resolve-direct is
      // resolve-or-create, so the retry can't 404 again in a loop.
      const contactId = sel.remoteParticipantIds?.[0];
      if (
        (error as { status?: number })?.status === 404 &&
        sel.remoteParticipantIds?.length === 1 &&
        contactId
      ) {
        void cacheContactConversationId(contactId, null).then(() =>
          openDirectConversation(contactId, {
            nickname: sel.nickname,
            displayUI: sel.displayUI,
          }),
        );
        return;
      }
      setState({ history: 'error', historyError: error });
    },
  );

  if (typeof result === 'function') {
    cleanup = result;
  } else {
    void result
      .then((unsub) => {
        if (disposed) unsub();
        else cleanup = unsub;
      })
      .catch((error) => {
        if (disposed || conversationId !== state.conversationId) return;
        setState({ history: 'error', historyError: error });
      });
  }

  stopWatch = () => {
    disposed = true;
    cleanup?.();
    stopWatch = undefined;
  };
}

function activate(next: ConversationSelection | null) {
  flushDraftSave();
  stopWatch?.();
  setLatestReadCandidate(null);
  setSelection(next);

  const myUserId = getLoggedInUserId() as UserId | null;
  if (!next || !myUserId) {
    setState({ ...initial });
    return;
  }

  setState({
    conversationId: next.conversationId,
    myUserId,
    draft: loadLocalDraft(myUserId, next.conversationId),
    messages: [],
    sending: false,
    preparingFile: false,
    history: 'loading',
    historyError: null,
  });
  startWatch(next.conversationId, myUserId, next);
}

// ---------- selection actions ----------

export function open(next: ConversationSelection): void {
  saveSelectedContactId(
    next.remoteParticipantIds?.length === 1
      ? next.remoteParticipantIds[0]
      : null,
  );
  activate(next);
}

type OpenDirectMeta = Omit<
  ConversationSelection,
  'conversationId' | 'remoteParticipantIds'
>;

/**
 * Open a contact's DM conversation. This is the single place the messaging
 * open flow learns the id, so callers pass a contactId and never handle
 * conversation ids directly.
 *
 * The conversationId is normally already on the contact record (minted at
 * invite-accept time); resolveDirectConversationId() is only a fallback for
 * contacts saved before that existed.
 */
export async function openDirectConversation(
  contactId: string,
  meta?: OpenDirectMeta,
): Promise<void> {
  let conversationId: string | null =
    getContactById(contactId)?.conversationId ?? null;

  if (!conversationId) {
    try {
      // Network + auth call; can reject. Callers fire-and-forget, so catch
      // here to keep failures on the warn-and-return path instead of an
      // unhandled rejection.
      conversationId = await resolveDirectConversationId(contactId);
      void cacheContactConversationId(contactId, conversationId);
    } catch (error) {
      console.warn('[conversation] failed to resolve conversation id', {
        contactId,
        error,
      });
    }
  }

  if (!conversationId) {
    console.warn('[conversation] could not resolve conversation id', {
      contactId,
    });
    return;
  }

  saveSelectedContactId(contactId);
  activate({ ...meta, conversationId, remoteParticipantIds: [contactId] });
}

/** Release the active conversation and all its state. Called on logout. */
export function resetConversationStore(): void {
  flushDraftSave();
  stopWatch?.();
  setSelection(null);
  setLatestReadCandidate(null);
  setState({ ...initial });
}

// ---------- sending ----------

type SendPayload = TextMessagePayload | FileMessagePayload;

export async function sendMessage(
  payloadOverride?: SendPayload,
): Promise<boolean> {
  const { conversationId, myUserId, draft } = state;
  const text = draft.trim();
  const payload: SendPayload =
    payloadOverride?.type === 'file'
      ? {
          ...payloadOverride,
          text: payloadOverride.text?.trim() || text || undefined,
        }
      : payloadOverride?.type === 'text'
        ? {
            ...payloadOverride,
            text: payloadOverride.text.trim(),
          }
        : { type: 'text', text };
  if (!conversationId || !myUserId) return false;
  if (payload.type === 'text' && !payload.text.trim()) return false;

  clearPersistedDraft();

  const repo = getRepo();
  const tempId = repo.createMessageId(conversationId);
  const sentAt = Date.now();
  const senderName = getLoggedInUserProfile()?.displayName ?? undefined;
  const optimisticText =
    payload.type === 'text' ? payload.text : (payload.text ?? '');
  const attachment =
    payload.type === 'file'
      ? {
          type: 'file' as const,
          fileName: payload.fileName,
          mimeType: payload.mimeType,
          fileSize: payload.fileSize,
          width: payload.width,
          height: payload.height,
          storage: payload.storage,
        }
      : undefined;

  addOptimisticMessage({
    id: tempId,
    conversationId,
    text: optimisticText,
    attachment,
    senderId: myUserId,
    sentAt,
    status: 'sending',
    reactions: [],
  });
  setState({ draft: '', sending: true });

  const recipientIds = selection()?.remoteParticipantIds ?? [];

  let sent = false;
  try {
    const saved = await repo.send({
      messageId: tempId,
      conversationId,
      senderId: myUserId,
      senderName,
      sentAt,
      delivery: 'persistent',
      payload,
    });
    markSent(tempId, saved.id);
    sent = true;
  } catch {
    markFailed(tempId);
  } finally {
    setState('sending', false);
  }

  if (!sent) return false;
  if (recipientIds.length > 0) {
    const messageText =
      payload.type === 'text' ? payload.text : payload.text || 'Sent a file';
    try {
      void getPushNotifications()?.sendMessageNotification({
        recipientIds,
        conversationId,
        senderId: myUserId,
        senderName,
        messageText,
      });
    } catch (error) {
      console.warn('[conversation] failed to enqueue message push', error);
    }
  }
  return true;
}

export type SendFileResult =
  | 'sent'
  | 'failed'
  | 'empty-file'
  | 'too-large'
  | 'skipped';

/**
 * Compress (images), upload to R2, then send a file message with the current
 * draft as caption. Returns an outcome for the view to surface; orphaned
 * uploads are cleaned up best-effort on failure.
 */
export async function sendFileMessage(file: File): Promise<SendFileResult> {
  if (state.sending || state.preparingFile) return 'skipped';
  if (file.size === 0) return 'empty-file';

  const conversationId = state.conversationId;
  if (!conversationId) return 'skipped';

  let uploadedStorage:
    | Awaited<ReturnType<typeof uploadConversationFile>>
    | undefined;
  function cleanupUploadedFile() {
    if (!uploadedStorage) return;
    void deleteConversationFile(conversationId!, uploadedStorage).catch(
      (error) => {
        console.warn('[conversation] failed to clean up orphaned file', {
          conversationId,
          key: uploadedStorage?.key,
          error,
        });
      },
    );
  }

  setState('preparingFile', true);
  try {
    let attachmentFile = file;
    const shouldReadImageMetadata = isImageFile(file);
    if (
      shouldReadImageMetadata &&
      file.size > IMAGE_COMPRESSION_THRESHOLD_BYTES
    ) {
      const compressed = await compressImage(file, {
        maxBytes: IMAGE_COMPRESSION_THRESHOLD_BYTES,
      });
      if (compressed) attachmentFile = compressed;
    }

    if (attachmentFile.size > MAX_R2_FILE_UPLOAD_BYTES) return 'too-large';

    const dimensions = shouldReadImageMetadata
      ? await readImageDimensions(attachmentFile)
      : undefined;
    uploadedStorage = await uploadConversationFile(
      conversationId,
      attachmentFile,
    );
    if (state.conversationId !== conversationId) {
      cleanupUploadedFile();
      return 'skipped';
    }

    const sent = await sendMessage({
      type: 'file',
      fileName: attachmentFileName(attachmentFile),
      mimeType: attachmentFile.type || file.type || 'application/octet-stream',
      fileSize: attachmentFile.size,
      width: dimensions?.width,
      height: dimensions?.height,
      storage: uploadedStorage,
    });
    if (!sent) {
      cleanupUploadedFile();
      return 'failed';
    }
    return 'sent';
  } catch (error) {
    cleanupUploadedFile();
    console.warn('[conversation] failed to send file attachment', error);
    return 'failed';
  } finally {
    setState('preparingFile', false);
  }
}

// ---------- reactions + read state ----------

export function persistMyReaction(change: ReactionChange): void {
  const conversationId = state.conversationId;
  if (!conversationId) return;
  void Promise.resolve(
    getRepo().setMyReaction(
      conversationId,
      change.messageId,
      change.userId as UserId,
      change.reactionKey,
    ),
  ).catch((error) => {
    console.warn('[conversation] failed to persist reaction', error);
  });
}

/**
 * Mark the active conversation read up to the latest watcher-delivered
 * message. Reads the candidate + active id reactively, so a view effect that
 * calls this re-runs as new messages land. The view gates on its own
 * visibility: an incoming message must not clear the unread badge while the
 * user is looking at the contacts list.
 */
export function markActiveConversationRead(): void {
  const candidate = latestReadCandidate();
  if (!candidate || candidate.conversationId !== state.conversationId) return;

  markConversationRead(candidate.conversationId, candidate.sentAt);
  void Promise.resolve(
    getRepo().markConversationRead(
      candidate.conversationId,
      candidate.myUserId,
    ),
  ).catch((error) => {
    console.warn('[conversation] failed to mark conversation read', {
      conversationId: candidate.conversationId,
      error,
    });
  });
}
