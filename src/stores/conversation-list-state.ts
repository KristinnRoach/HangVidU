// Conversation-list state: drives MRU reorder + the unread badge.
//
// Two inputs, one reactive map keyed by conversationId:
//   - seed: GET /conversations once on start (and on demand), carrying each
//     conversation's latest message time + sender.
//   - live: the per-user mailbox pushes an `activity` envelope on every message
//     to a conversation you're in (see shared/user-mailbox/protocol).
//
// Read state (lastReadAt) is per-device localStorage for now; markConversationRead
// bumps a version signal so the unread derivation re-runs without a refetch.
//
// Live push rides the user's shared mailbox socket (subscribeToUserMailbox), the
// same connection CallService uses — no second per-user socket.

import { createSignal } from 'solid-js';
import { getLoggedInUserId, getLoggedInUserToken } from '../auth/index.js';
import { getConversationsClient } from './conversations-client';
import {
  closeUserMailbox,
  subscribeToUserMailbox,
} from '../realtime/user-mailbox';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url';
import type { ConversationMember } from '../storage/conversations/data-client';

export type ConversationSummary = {
  conversationId: string;
  kind: 'direct' | 'group' | null;
  title: string | null;
  members: ConversationMember[];
  latestSentAt: number;
  latestSenderId: string | null;
};

const [listState, setListState] = createSignal<
  Map<string, ConversationSummary>
>(new Map());
const [seeded, setSeeded] = createSignal(false);
const [readVersion, setReadVersion] = createSignal(0);
// Server-owned read markers (conversationId -> lastReadAt), seeded from
// GET /conversations. Makes the unread badge cross-device: a read on another
// device clears here on the next seed. localStorage stays as the optimistic
// in-tab layer; getLastReadAt returns the max of the two.
const [serverLastRead, setServerLastRead] = createSignal<Map<string, number>>(
  new Map(),
);

/** Reactive: conversationId -> latest list state. Read by app/ConversationsList. */
export const conversationListState = listState;
export const conversationListSeeded = seeded;
// ── per-device read state ────────────────────────────────────────────────────
const readKey = (conversationId: string) =>
  `hangvidu:lastRead:${conversationId}`;

export function getLastReadAt(conversationId: string): number {
  readVersion();
  const server = serverLastRead().get(conversationId) ?? 0;
  let local = 0;
  try {
    local = Number(localStorage.getItem(readKey(conversationId))) || 0;
  } catch {
    local = 0;
  }
  return Math.max(local, server);
}

/**
 * Mark read up to `latestSentAt` — the SERVER timestamp of the newest seen
 * message. Must be server-clock, not Date.now(): unread compares against
 * server-stamped message times, so a client clock running ahead of the server
 * would otherwise suppress every later message's badge.
 */
export function markConversationRead(
  conversationId: string,
  latestSentAt: number,
): void {
  const lastReadAt = getLastReadAt(conversationId);
  const nextLastReadAt = Math.max(lastReadAt, latestSentAt);
  try {
    localStorage.setItem(readKey(conversationId), String(nextLastReadAt));
  } catch {
    // localStorage unavailable: read state is best-effort.
  }
  if (nextLastReadAt !== lastReadAt) setReadVersion((v) => v + 1);
}

// ── seed + live wiring ───────────────────────────────────────────────────────
function upsert(
  conversationId: string,
  next: Partial<ConversationSummary>,
): void {
  setListState((prev) => {
    const cur = prev.get(conversationId);
    const latestSentAt = next.latestSentAt ?? cur?.latestSentAt ?? 0;
    if (cur && cur.latestSentAt > latestSentAt) return prev; // older: ignore
    return new Map(prev).set(conversationId, {
      conversationId,
      kind: 'kind' in next ? (next.kind ?? null) : (cur?.kind ?? null),
      title: 'title' in next ? (next.title ?? null) : (cur?.title ?? null),
      members: 'members' in next ? (next.members ?? []) : (cur?.members ?? []),
      latestSentAt,
      latestSenderId:
        'latestSenderId' in next
          ? (next.latestSenderId ?? null)
          : (cur?.latestSenderId ?? null),
    });
  });
}

/**
 * Record activity for the open conversation's message stream. Covers
 * the sender's OWN send, which never comes back over the mailbox (the server
 * fans `activity` to other members only).
 */
export function recordConversationListMessage(
  conversationId: string,
  latestSentAt: number,
  latestSenderId: string | null,
): void {
  upsert(conversationId, { latestSentAt, latestSenderId });
}

/** Refetch the current conversation-list state snapshot (seed). */
export async function refreshConversationListState(): Promise<void> {
  const me = getLoggedInUserId();
  if (!me) {
    setListState(new Map());
    setServerLastRead(new Map());
    setSeeded(false);
    return;
  }
  try {
    const conversations = await getConversationsClient().list();
    if (getLoggedInUserId() !== me) return;

    const map = new Map<string, ConversationSummary>();
    const reads = new Map<string, number>();
    for (const c of conversations) {
      map.set(c.id, {
        conversationId: c.id,
        kind: c.kind,
        title: c.title ?? null,
        members: c.members,
        latestSentAt: c.latest_sent_at ?? c.updated_at,
        latestSenderId: c.latest_sender_id ?? null,
      });
      reads.set(c.id, c.last_read_at ?? 0);
    }
    setServerLastRead(reads);
    setListState((current) => {
      for (const [rowKey, existing] of current) {
        const fetched = map.get(rowKey);
        if (fetched && existing.latestSentAt > fetched.latestSentAt) {
          map.set(rowKey, existing);
        }
      }
      return map;
    });
    setSeeded(true);
  } catch (error) {
    console.warn('[conversation-list-state] seed failed', error);
  }
}

let started = false;
let unsubscribeMailbox: (() => void) | undefined;

function refreshWhenVisible(): void {
  if (document.visibilityState === 'visible') {
    void refreshConversationListState();
  }
}

/** Release login-scoped list state and the shared mailbox. */
export function stopConversationListSync(): void {
  unsubscribeMailbox?.();
  unsubscribeMailbox = undefined;
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', refreshWhenVisible);
  }
  closeUserMailbox();
  started = false;
  setListState(new Map());
  setServerLastRead(new Map());
  setSeeded(false);
}

/** Idempotent: seed once + open the live mailbox subscription. */
export function startConversationListSync(): void {
  if (started) return;
  started = true;

  void refreshConversationListState();

  unsubscribeMailbox = subscribeToUserMailbox(
    {
      localUID: getLoggedInUserId(),
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
    },
    (envelope) => {
      if (envelope.t !== 'activity') return; // ignore call invites/responses
      upsert(envelope.conversationId, {
        latestSentAt: envelope.sentAt,
        latestSenderId: envelope.senderId,
      });
    },
  );

  // Cheap liveness for anything missed while disconnected (seed is authoritative).
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', refreshWhenVisible);
  }
}
