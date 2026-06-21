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
// MINIMAL SPIKE (verify-then-refine): opens its own mailbox socket separate from
// CallService's — a second per-user connection to the same DO. Consolidate to one
// shared mailbox subscription in the refine pass.

import { createSignal } from 'solid-js';
import { getLoggedInUserId, getLoggedInUserToken } from '../auth/index.js';
import { getConversationsClient } from './conversations-client';
import { createMailboxChannel } from '../realtime/mailbox-channel';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url';

export interface ParticipantActivity {
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
/** Reactive tick: bumped on markConversationRead so unread re-derives. */
export const readStateVersion = readVersion;

// ── per-device read state ────────────────────────────────────────────────────
const readKey = (conversationId: string) => `hangvidu:lastRead:${conversationId}`;

export function getLastReadAt(conversationId: string): number {
  try {
    return Number(localStorage.getItem(readKey(conversationId))) || 0;
  } catch {
    return 0;
  }
}

export function markConversationRead(conversationId: string): void {
  try {
    localStorage.setItem(readKey(conversationId), String(Date.now()));
  } catch {
    // localStorage unavailable: read state is best-effort.
  }
  setReadVersion((v) => v + 1);
}

// ── seed + live wiring ───────────────────────────────────────────────────────
function upsert(participantId: string, next: ParticipantActivity): void {
  setActivity((prev) => {
    const cur = prev.get(participantId);
    if (cur && cur.latestSentAt >= next.latestSentAt) return prev; // older: ignore
    return new Map(prev).set(participantId, next);
  });
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
    setActivity(map);
  } catch (error) {
    console.warn('[conversation-activity] seed failed', error);
  }
}

let started = false;

/** Idempotent: seed once + open the live mailbox subscription. */
export function startConversationActivity(): void {
  if (started) return;
  started = true;

  void refreshConversationActivity();

  const channel = createMailboxChannel({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
  });
  channel.onEnvelope((envelope) => {
    if (envelope.t !== 'activity') return; // ignore call invites/responses
    // DM: the envelope reaches only the other member, so senderId IS the
    // participant this row is keyed on.
    upsert(envelope.senderId, {
      conversationId: envelope.conversationId,
      latestSentAt: envelope.sentAt,
      latestSenderId: envelope.senderId,
    });
  });

  // Cheap liveness for anything missed while disconnected (seed is authoritative).
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        void refreshConversationActivity();
      }
    });
  }
}
