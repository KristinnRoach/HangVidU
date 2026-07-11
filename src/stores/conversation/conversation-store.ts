import { createSignal } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';
import { compressImage } from '@lib/media/image-compress.js';
import { getHangViduApiBaseUrl } from '@infra/hangvidu-api-url';

import { getLoggedInUserId, getLoggedInUserToken } from '../../auth/index.js';
import { createConversationChannel } from '../../realtime/conversation-channel.js';

import { getLoggedInUserProfile } from '../user-profile-store.js';
import {
  conversationListState,
  conversationPeers,
  ensureDirectConversationListed,
  markConversationRead,
  recordConversationListMessage,
  refreshConversationListState,
  type Conversation,
} from './conversation-list-state.js';
import {
  getConversationsClient,
  resolveDirectConversationId,
} from './conversations-client.js';
import {
  cacheContactConversationId,
  getContactById,
  getContactLabel,
} from '../contacts-store.js';
import {
  deleteConversationFile,
  uploadConversationFile,
} from '../files-store.js';

import { publish } from '@shared/events/index.js';

import { sortMessagesBySentAt } from './message-ordering.js';
import {
  clearLocalDraft,
  loadLocalDraft,
  saveLocalDraft,
} from './draft-persistence.js';
import {
  IMAGE_COMPRESSION_THRESHOLD_BYTES,
  MAX_R2_FILE_UPLOAD_BYTES,
  attachmentFileName,
  isImageFile,
  readImageDimensions,
} from './attachments.js';
import type {
  ChatMessage,
  IncomingMessage,
  MessageRepository,
} from './types.js';
import type { SystemMessageType } from '../../../shared/conversation-channel/protocol';
import type {
  ConversationId,
  FileMessagePayload,
  TextMessagePayload,
  UserId,
} from './types.js';
import type { ReactionChange } from '@lib/reactions/solid/solid.js';

import {
  createMessageSyncRepository,
  type MessageSyncClient,
} from './message-sync.js';

// Composes storage history + realtime live-push, both authenticated with the
// logged-in user's token.
function createMessageRepositoryFromEnv(): MessageRepository {
  const http = getConversationsClient();
  const baseUrl = getHangViduApiBaseUrl();

  const client: MessageSyncClient = {
    loadMessages: (conversationId) => http.loadMessages(conversationId),
    sendMessage: (conversationId, input) =>
      http.sendMessage(conversationId, input),
    setMyReaction: (conversationId, messageId, reactionKey) =>
      http.setMyReaction(conversationId, messageId, reactionKey),
    markRead: async (conversationId) => {
      await http.markRead(conversationId);
    },
    getUserId: getLoggedInUserId,
    subscribe: (conversationId, onEvent) => {
      const channel = createConversationChannel({
        baseUrl,
        conversationId,
        getToken: getLoggedInUserToken,
      });
      const off = channel.onEvent(onEvent);
      return () => {
        off();
        channel.close();
      };
    },
  };

  return createMessageSyncRepository(client);
}

type ConversationSelection = {
  conversationId: ConversationId;
  displayUI: boolean;
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

/**
 * Reactive: the selected conversation's list record (kind, members, title),
 * or null while it hasn't landed in conversation-list-state yet.
 */
export function selectedConversation(): Conversation | null {
  const sel = selection();
  return sel ? (conversationListState().get(sel.conversationId) ?? null) : null;
}

const [latestReadCandidate, setLatestReadCandidate] = createSignal<{
  conversationId: ConversationId;
  myUserId: UserId;
  sentAt: number;
} | null>(null);

let repository: MessageRepository | null = null;
function getRepo(): MessageRepository {
  return (repository ??= createMessageRepositoryFromEnv());
}

export function getConversationState() {
  return state;
}

const STORAGE_PREFIX = 'hangvidu:conversations:selected';

function getLocalStorage(): Storage | null {
  return typeof globalThis.localStorage === 'undefined'
    ? null
    : globalThis.localStorage;
}

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}:${encodeURIComponent(userId)}`;
}

function saveSelectedConversationId(conversationId: string | null): void {
  try {
    const userId = getLoggedInUserId();
    const storage = getLocalStorage();
    if (!userId || !storage) return;

    const key = storageKey(userId);
    if (conversationId) storage.setItem(key, conversationId);
    else storage.removeItem(key);
  } catch {
    // Selection persistence is best-effort; in-memory state remains canonical.
  }
}

export function loadSelectedConversationId(): string | null {
  try {
    const userId = getLoggedInUserId();
    const storage = getLocalStorage();
    if (!userId || !storage) return null;

    return storage.getItem(storageKey(userId))?.trim() || null;
  } catch {
    return null;
  }
}

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

function isChatMessage(message: ChatMessage | null): message is ChatMessage {
  return Boolean(message);
}

function fileAttachment(payload: FileMessagePayload) {
  return {
    type: 'file' as const,
    fileName: payload.fileName,
    mimeType: payload.mimeType,
    fileSize: payload.fileSize,
    width: payload.width,
    height: payload.height,
    storage: payload.storage,
  };
}

function envelopeToChatMessage(message: IncomingMessage): ChatMessage | null {
  if (message.payload.type === 'system') {
    return {
      type: 'system',
      id: message.messageId,
      conversationId: message.conversationId,
      senderId: message.senderId,
      callerUId: message.payload.callerUId,
      systemType: message.payload.systemType,
      sentAt: message.sentAt,
      status: 'sent',
      reactions: [],
    };
  }

  const text =
    message.payload.type === 'text'
      ? message.payload.text
      : (message.payload.text ?? '');
  const attachment =
    message.payload.type === 'file'
      ? fileAttachment(message.payload)
      : undefined;

  return {
    type: 'user',
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

export async function recordSystemMessage(
  conversationId: ConversationId,
  systemType: SystemMessageType,
  messageId: string = crypto.randomUUID(),
): Promise<void> {
  const message = await getConversationsClient().recordCallSystemMessage(
    conversationId,
    {
      messageId,
      systemType,
    },
  );
  recordConversationListMessage(
    conversationId,
    message.sentAt,
    message.senderId,
  );
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

let stopWatch: (() => void) | undefined;

function startWatch(
  conversationId: ConversationId,
  myUserId: UserId,
  displayUI: boolean,
) {
  let disposed = false;
  let cleanup: (() => void) | undefined;

  // Capture the DM peer now: a concurrent reseed drops server-unknown
  // conversations from the list, which is exactly the stale-id case the
  // 404 retry below needs the contact for.
  const conversation = conversationListState().get(conversationId);
  const retryContactId =
    conversation?.kind === 'direct'
      ? conversationPeers(conversation)[0]
      : undefined;

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
        // Keep the list row ordered for the open conversation; covers the
        // user's own send, which is never echoed over the mailbox.
        recordConversationListMessage(
          conversationId,
          latest.sentAt,
          latest.senderId,
        );
      }
    },
    (error) => {
      if (disposed || conversationId !== state.conversationId) return;
      // Stale cached conversationId (env switch, deleted conversation):
      // resolve-or-create will replace the cached id on retry.
      if ((error as { status?: number })?.status === 404 && retryContactId) {
        void openDirectConversation(retryContactId, {
          displayUI,
          forceResolve: true,
        });
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
  startWatch(next.conversationId, myUserId, next.displayUI);
}

export function openConversation(
  conversationId: ConversationId,
  opts?: { displayUI?: boolean },
): void {
  saveSelectedConversationId(conversationId);
  // Deep links / push nav can open an id the seed hasn't delivered yet;
  // reseed so kind/members/label fill in.
  if (!conversationListState().get(conversationId)?.kind) {
    void refreshConversationListState();
  }
  activate({ conversationId, displayUI: opts?.displayUI ?? true });
}

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
  opts?: { displayUI?: boolean; forceResolve?: boolean },
): Promise<void> {
  const contact = getContactById(contactId);
  let conversationId: string | null = contact?.conversationId ?? null;

  if (!conversationId || opts?.forceResolve) {
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

  ensureDirectConversationListed(conversationId, {
    user_id: contactId,
    display_name: contact ? getContactLabel(contact) : null,
    joined_at: 0,
  });
  openConversation(conversationId, { displayUI: opts?.displayUI });
}

/** Release the active conversation and all its state. Called on logout. */
export function resetConversationStore(): void {
  flushDraftSave();
  stopWatch?.();
  setSelection(null);
  setLatestReadCandidate(null);
  setState({ ...initial });
}

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
    payload.type === 'file' ? fileAttachment(payload) : undefined;

  addOptimisticMessage({
    type: 'user',
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

  const conversation = conversationListState().get(conversationId);
  const recipientIds = conversation
    ? (conversationPeers(conversation) as UserId[])
    : [];
  const conversationKind = conversation?.kind ?? undefined;

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
      publish('evt:conversation:message:sent', {
        recipientIds,
        conversationId,
        conversationKind,
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

export function persistMyReaction(change: ReactionChange): void {
  const conversationId = state.conversationId;
  if (!conversationId) return;
  void Promise.resolve(
    getRepo().setMyReaction(
      conversationId,
      change.messageId,
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
