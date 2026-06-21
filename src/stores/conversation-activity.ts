// Conversation-list activity: drives MRU reorder + the unread badge.
//
// Two inputs, one reactive map keyed by the OTHER participant's uid (DMs):
//   - seed: GET /conversations once on start (and on demand), carrying each
//     conversation's latest message time + sender.
//   - live: the per-user mailbox pushes an `activity` envelope on every message
//     to a conversation you're in (see shared/call-mailbox/protocol). For a DM
//     the envelope only reaches the *other* member, so senderId is exactly the
//     participant we key on.
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

interface ParticipantActivity {
  conversationId: string;
  latestSentAt: number;
  latestSenderId: string | null;
}

const [activity, setActivity] = createSignal<Map<string, ParticipantActivity>>(
  new Map(),
);
const [readVersion, setReadVersion] = createSignal(0);

/** Reactive: participant uid -> latest activity. Read in useContacts. */
export const conversationActivity = activity;
// ── per-device read state ────────────────────────────────────────────────────
const readKey = (conversationId: string) => `hangvidu:lastRead:${conversationId}`;

export function getLastReadAt(conversationId: string): number {
  readVersion();
  try {
    return Number(localStorage.getItem(readKey(conversationId))) || 0;
  } catch {
    return 0;
  }
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
function upsert(participantId: string, next: ParticipantActivity): void {
  setActivity((prev) => {
    const cur = prev.get(participantId);
    if (cur && cur.latestSentAt >= next.latestSentAt) return prev; // older: ignore
    return new Map(prev).set(participantId, next);
  });
}

/**
 * Record activity for a DM from the open conversation's message stream. Covers
 * the sender's OWN send, which never comes back over the mailbox (the server
 * fans `activity` to other members only). `participantId` is the peer's uid.
 */
export function recordConversationActivity(
  participantId: string,
  conversationId: string,
  latestSentAt: number,
  latestSenderId: string | null,
): void {
  upsert(participantId, { conversationId, latestSentAt, latestSenderId });
}

/** Refetch the current activity snapshot (seed). */
export async function refreshConversationActivity(): Promise<void> {
  const me = getLoggedInUserId();
  if (!me) {
    setActivity(new Map());
    return;
  }
  try {
    const conversations = await getConversationsClient().list();
    if (getLoggedInUserId() !== me) return;

    const map = new Map<string, ParticipantActivity>();
    for (const c of conversations) {
      if (c.kind !== 'direct') continue; // contacts list is DMs only for now
      const other = c.members.find((m) => m.user_id !== me);
      if (!other) continue;
      map.set(other.user_id, {
        conversationId: c.id,
        latestSentAt: c.latest_sent_at ?? c.updated_at,
        latestSenderId: c.latest_sender_id ?? null,
      });
    }
    setActivity((current) => {
      for (const [participantId, existing] of current) {
        const fetched = map.get(participantId);
        if (fetched && existing.latestSentAt > fetched.latestSentAt) {
          map.set(participantId, existing);
        }
      }
      return map;
    });
  } catch (error) {
    console.warn('[conversation-activity] seed failed', error);
  }
}

let started = false;
let unsubscribeMailbox: (() => void) | undefined;

function refreshWhenVisible(): void {
  if (document.visibilityState === 'visible') {
    void refreshConversationActivity();
  }
}

/** Release login-scoped activity state and the shared mailbox. */
export function stopConversationActivity(): void {
  unsubscribeMailbox?.();
  unsubscribeMailbox = undefined;
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', refreshWhenVisible);
  }
  closeUserMailbox();
  started = false;
  setActivity(new Map());
}

/** Idempotent: seed once + open the live mailbox subscription. */
export function startConversationActivity(): void {
  if (started) return;
  started = true;

  void refreshConversationActivity();

  unsubscribeMailbox = subscribeToUserMailbox(
    {
      localUID: getLoggedInUserId(),
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
    },
    (envelope) => {
      if (envelope.t !== 'activity') return; // ignore call invites/responses
      // DM: the envelope reaches only the other member, so senderId IS the
      // participant this row is keyed on.
      upsert(envelope.senderId, {
        conversationId: envelope.conversationId,
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
