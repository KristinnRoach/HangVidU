import { authenticate, authenticateWebSocket } from '../auth';
import { corsHeaders, isAllowedOrigin } from '../cors';
import type { WorkerEnv } from '../types';
import {
  acceptRequest,
  connectUsers,
  createRequest,
  declineRequest,
  getContact,
  getConversation,
  getMembers,
  getProfile,
  insertMessage,
  isHandleTaken,
  isMember,
  listContacts,
  listConversations,
  listIncomingRequests,
  listOutgoingRequests,
  loadMessages,
  lookupByEmailHash,
  lookupByHandle,
  patchContact,
  putContact,
  removeContact,
  resolveOrCreateDirect,
  setDiscoverable,
  setMyReaction,
  updateProfile,
  upsertUser,
  RECENT_MESSAGES_WINDOW,
  type ContactRow,
  type ContactRequestRow,
  type MessageWithAttachments,
  type NewAttachment,
  type UserProfileRow,
} from './repo';
import type {
  ConversationServerEvent,
  WireMessage,
} from '../../../../shared/conversation-channel/protocol';
import { CALLING_TTL_MS } from '../../../../shared/constants';

const MAX_ATTACHMENT_FILE_NAME_LENGTH = 180;

export async function handleDataRequest(
  request: Request,
  env: WorkerEnv,
): Promise<Response> {
  const origin = request.headers.get('Origin');
  const cors = corsHeaders(origin, env);

  // CORS preflight.
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  const url = new URL(request.url);

  // Health check — no auth, for local-dev / uptime verification.
  if (request.method === 'GET' && url.pathname === '/health') {
    return json({ ok: true }, 200, cors);
  }

  // WebSocket live-push channel. Auth rides in the subprotocol (browsers
  // can't set headers on a WS handshake), so this is handled before the
  // Bearer-header auth block below.
  const wsMatch = url.pathname.match(/^\/conversations\/([^/]+)\/ws$/);
  if (wsMatch) {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }
    // Origin allowlist — defense-in-depth on top of token auth; stops other
    // web origins from driving the channel with a user's token.
    if (!isAllowedOrigin(origin, env)) {
      return new Response('Forbidden origin', { status: 403 });
    }
    const identity = await authenticateWebSocket(request, env);
    if (!identity) return new Response('Unauthorized', { status: 401 });

    const conversationId = decodeURIComponent(wsMatch[1]);
    if (!(await isMember(env.DB, conversationId, identity.userId))) {
      // 404 (not 403) so non-members can't probe which ids exist.
      return new Response('Not found', { status: 404 });
    }
    const stub = env.CONVERSATION_CHANNEL.getByName(conversationId);
    return stub.fetch(request);
  }

  // Per-user call-invite mailbox WS. You can only open your OWN mailbox, so no
  // D1 check here — identity IS the key. Same subprotocol auth as above.
  if (url.pathname === '/users/me/mailbox/ws') {
    if (request.headers.get('Upgrade') !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 });
    }
    if (!isAllowedOrigin(origin, env)) {
      return new Response('Forbidden origin', { status: 403 });
    }
    const identity = await authenticateWebSocket(request, env);
    if (!identity) return new Response('Unauthorized', { status: 401 });
    return env.USER_MAILBOX.getByName(identity.userId).fetch(request);
  }

  // Everything below requires authentication.
  const identity = await authenticate(request, env);
  if (!identity) return json({ error: 'unauthorized' }, 401, cors);
  const callerId = identity.userId;
  const now = Date.now();

  // Record/refresh the caller. `name` query param optionally seeds display_name.
  await upsertUser(env.DB, callerId, url.searchParams.get('name'), now);

  // Identity echo — exercises the Bearer auth seam end-to-end.
  if (request.method === 'GET' && url.pathname === '/me') {
    return json({ userId: callerId }, 200, cors);
  }

  // Call-invite mailbox sends. Receiving is the WS above; these REST endpoints
  // are the writes. Authz is authoritative here: the authenticated sender AND
  // the target user must both be members of the conversation, then the envelope
  // is delivered to the target's mailbox DO. roomId === conversationId.
  if (request.method === 'POST' && url.pathname === '/calls/invite') {
    const body = await readJson(request);
    const conversationId = str(body?.conversationId);
    const calleeId = str(body?.calleeId);
    if (!conversationId || !calleeId) {
      return json({ error: 'conversationId and calleeId required' }, 400, cors);
    }
    if (
      !(await isMember(env.DB, conversationId, callerId)) ||
      !(await isMember(env.DB, conversationId, calleeId))
    ) {
      return json({ error: 'not_found' }, 404, cors);
    }
    const startedAt = now;
    const expiresAt = numOrUndef(body?.expiresAt) ?? startedAt + CALLING_TTL_MS;
    await env.USER_MAILBOX.getByName(calleeId).deliver({
      t: 'invite',
      invite: {
        roomId: conversationId,
        callerId,
        calleeId,
        callerName: str(body?.callerName) ?? undefined,
        audioOnly: body?.audioOnly === true,
        startedAt,
        expiresAt,
      },
    });
    return json({ ok: true }, 200, cors);
  }

  if (request.method === 'POST' && url.pathname === '/calls/response') {
    const body = await readJson(request);
    const conversationId = str(body?.conversationId);
    const targetCallerId = str(body?.callerId);
    const responseType = str(body?.responseType);
    if (
      !conversationId ||
      !targetCallerId ||
      (responseType !== 'accepted' &&
        responseType !== 'rejected' &&
        responseType !== 'busy')
    ) {
      return json({ error: 'invalid response' }, 400, cors);
    }
    const members = await getMembers(env.DB, conversationId);
    if (!members.some((member) => member.user_id === callerId)) {
      return json({ error: 'not_found' }, 404, cors);
    }
    const otherMember =
      members.length === 2
        ? (members.find((member) => member.user_id !== callerId)?.user_id ??
          null)
        : null;
    if (otherMember !== targetCallerId) {
      return json({ error: 'not_found' }, 404, cors);
    }
    // Retire this invite on the responder's OWN other sockets (other tabs/
    // devices still ringing): `handled` both clears the retained invite and
    // fans a dismiss to them. `by` is the responder who handled it.
    await env.USER_MAILBOX.getByName(callerId).deliver({
      t: 'handled',
      roomId: conversationId,
      by: callerId,
    });
    await env.USER_MAILBOX.getByName(targetCallerId).deliver({
      t: 'response',
      response: {
        roomId: conversationId,
        responseType,
        by: callerId,
        respondedAt: now,
        expiresAt: numOrUndef(body?.expiresAt),
      },
    });
    return json({ ok: true }, 200, cors);
  }

  if (request.method === 'POST' && url.pathname === '/calls/response/ack') {
    const conversationId = str((await readJson(request))?.conversationId);
    if (!conversationId)
      return json({ error: 'conversationId required' }, 400, cors);
    if (!(await isMember(env.DB, conversationId, callerId))) {
      return json({ error: 'not_found' }, 404, cors);
    }
    await env.USER_MAILBOX.getByName(callerId).clearPendingResponse(
      conversationId,
    );
    return json({ ok: true }, 200, cors);
  }

  if (request.method === 'POST' && url.pathname === '/calls/cancel') {
    const body = await readJson(request);
    const conversationId = str(body?.conversationId);
    const calleeId = str(body?.calleeId);
    if (!conversationId || !calleeId) {
      return json({ error: 'conversationId and calleeId required' }, 400, cors);
    }
    if (
      !(await isMember(env.DB, conversationId, callerId)) ||
      !(await isMember(env.DB, conversationId, calleeId))
    ) {
      return json({ error: 'not_found' }, 404, cors);
    }
    await env.USER_MAILBOX.getByName(calleeId).deliver({
      t: 'cancel',
      roomId: conversationId,
      by: callerId,
    });
    return json({ ok: true }, 200, cors);
  }

  // --- users: profile + directory ----------------------------------------

  // GET/PUT /users/me/profile — the caller's own profile (display name, photo,
  // handle). Handle uniqueness is DB-enforced; the preflight check keeps the
  // common collision path friendly, and the UNIQUE catch handles races.
  if (url.pathname === '/users/me/profile') {
    if (request.method === 'GET') {
      const profile = await getProfile(env.DB, callerId);
      return json(
        { profile: profile ? toWireProfile(profile) : null },
        200,
        cors,
      );
    }
    if (request.method === 'PUT') {
      const body = await readJson(request);
      const username = str(body?.username);
      if (username && (await isHandleTaken(env.DB, username, callerId))) {
        return json({ error: 'handle_taken' }, 409, cors);
      }
      let updated: UserProfileRow | null;
      try {
        updated = await updateProfile(
          env.DB,
          callerId,
          {
            displayName: str(body?.displayName),
            photoUrl: str(body?.photoURL),
            username,
            emailHash: str(body?.emailHash),
          },
          now,
        );
      } catch (error) {
        if (isUniqueUsernameConstraint(error)) {
          return json({ error: 'handle_taken' }, 409, cors);
        }
        throw error;
      }
      return json(
        { profile: updated ? toWireProfile(updated) : null },
        200,
        cors,
      );
    }
  }

  // GET /users/:id/profile — public read of another user by KNOWN uid (no
  // discoverable gate; not an enumeration surface since uids are opaque, and
  // it mirrors how conversation members already expose display names). Used by
  // referral-handler to name the referrer. The /users/me/profile block above
  // already returned for the self case.
  const userProfileMatch = url.pathname.match(/^\/users\/([^/]+)\/profile$/);
  if (request.method === 'GET' && userProfileMatch) {
    const targetId = decodeURIComponent(userProfileMatch[1]);
    const profile = await getProfile(env.DB, targetId);
    return json(
      { profile: profile ? toPublicProfile(profile) : null },
      200,
      cors,
    );
  }

  // PUT /users/me/discoverable  { discoverable: bool } — directory opt-in/out.
  if (request.method === 'PUT' && url.pathname === '/users/me/discoverable') {
    const body = await readJson(request);
    if (typeof body?.discoverable !== 'boolean') {
      return json({ error: 'discoverable must be a boolean' }, 400, cors);
    }
    await setDiscoverable(env.DB, callerId, body.discoverable);
    return json({ ok: true }, 200, cors);
  }

  // GET /users/lookup?handle= | ?emailHash= — directory lookup. Handle search is
  // partial; email-hash search stays exact. Always returns an array.
  if (request.method === 'GET' && url.pathname === '/users/lookup') {
    const handle = str(url.searchParams.get('handle'));
    const emailHash = str(url.searchParams.get('emailHash'));
    let rows: UserProfileRow[];
    if (handle) rows = await lookupByHandle(env.DB, handle);
    else if (emailHash) rows = await lookupByEmailHash(env.DB, emailHash);
    else return json({ error: 'handle or emailHash required' }, 400, cors);
    // Don't surface the caller in their own search results.
    return json(
      { users: rows.filter((r) => r.id !== callerId).map(toDirectoryEntry) },
      200,
      cors,
    );
  }

  // --- contacts -----------------------------------------------------------

  // GET list / POST upsert  /users/me/contacts
  if (url.pathname === '/users/me/contacts') {
    if (request.method === 'GET') {
      const rows = await listContacts(env.DB, callerId);
      return json({ contacts: rows.map(toWireContact) }, 200, cors);
    }
    if (request.method === 'POST') {
      const body = await readJson(request);
      const contactId = str(body?.contactId);
      if (!contactId) return json({ error: 'contactId required' }, 400, cors);
      await putContact(
        env.DB,
        callerId,
        {
          contactId,
          nickname: typeof body?.nickname === 'string' ? body.nickname : '',
          conversationId: str(body?.conversationId),
          savedAt: numOrUndef(body?.savedAt) ?? now,
          lastInteractionAt: numOrUndef(body?.lastInteractionAt) ?? now,
        },
        now,
      );
      const stored = await getContact(env.DB, callerId, contactId);
      return json(
        { contact: stored ? toWireContact(stored) : null },
        200,
        cors,
      );
    }
  }

  // GET one / PATCH / DELETE  /users/me/contacts/:id
  const contactMatch = url.pathname.match(/^\/users\/me\/contacts\/([^/]+)$/);
  if (contactMatch) {
    const contactId = decodeURIComponent(contactMatch[1]);
    if (request.method === 'GET') {
      const row = await getContact(env.DB, callerId, contactId);
      if (!row) return json({ error: 'not_found' }, 404, cors);
      return json({ contact: toWireContact(row) }, 200, cors);
    }
    if (request.method === 'PATCH') {
      const body = await readJson(request);
      const updated = await patchContact(env.DB, callerId, contactId, {
        nickname:
          typeof body?.nickname === 'string' ? body.nickname : undefined,
        conversationId:
          'conversationId' in (body ?? {})
            ? str(body?.conversationId)
            : undefined,
        lastInteractionAt: numOrUndef(body?.lastInteractionAt),
      });
      if (!updated) return json({ error: 'not_found' }, 404, cors);
      return json({ contact: toWireContact(updated) }, 200, cors);
    }
    if (request.method === 'DELETE') {
      await removeContact(env.DB, callerId, contactId);
      return json({ ok: true }, 200, cors);
    }
  }

  // --- contact requests (the request/accept handshake) --------------------

  // POST send / GET list incoming/outgoing  /contact-requests
  if (url.pathname === '/contact-requests') {
    if (request.method === 'POST') {
      const body = await readJson(request);
      const toId = str(body?.toId);
      if (!toId) return json({ error: 'toId required' }, 400, cors);
      if (toId === callerId) {
        return json({ error: 'cannot request self' }, 400, cors);
      }
      const result = await createRequest(env.DB, callerId, toId, now);
      if (result === 'already_contacts') {
        return json({ ok: true, alreadyContacts: true }, 200, cors);
      }
      // Live nudge to the recipient (fire-and-forget; D1 is source of truth).
      try {
        const me = await getProfile(env.DB, callerId);
        await env.USER_MAILBOX.getByName(toId).deliver({
          t: 'contact_request',
          fromId: callerId,
          fromName: me?.display_name ?? undefined,
          createdAt: now,
        });
      } catch (err) {
        console.warn('[data] contact_request nudge failed', { toId, err });
      }
      return json({ ok: true }, 200, cors);
    }
    if (request.method === 'GET') {
      const rows =
        url.searchParams.get('direction') === 'outgoing'
          ? await listOutgoingRequests(env.DB, callerId)
          : await listIncomingRequests(env.DB, callerId);
      return json({ requests: rows.map(toWireRequest) }, 200, cors);
    }
  }

  // POST /contact-requests/:fromId/accept | /decline
  const reqActionMatch = url.pathname.match(
    /^\/contact-requests\/([^/]+)\/(accept|decline)$/,
  );
  if (request.method === 'POST' && reqActionMatch) {
    const fromId = decodeURIComponent(reqActionMatch[1]);
    const action = reqActionMatch[2];
    if (action === 'accept') {
      const conversationId = await acceptRequest(env.DB, callerId, fromId, now);
      if (!conversationId) return json({ error: 'not_found' }, 404, cors);
      await nudgeContactRefresh(env, callerId, fromId, now, 'accept');
      return json({ ok: true, conversationId }, 200, cors);
    }
    const ok = await declineRequest(env.DB, callerId, fromId, now);
    if (!ok) return json({ error: 'not_found' }, 404, cors);
    return json({ ok: true }, 200, cors);
  }

  // POST /referrals/connect { referrerId } — current raw-referrer-id referral
  // path auto-connects without creating a pending request.
  if (request.method === 'POST' && url.pathname === '/referrals/connect') {
    const referrerId = str((await readJson(request))?.referrerId);
    if (!referrerId) return json({ error: 'referrerId required' }, 400, cors);
    if (referrerId === callerId) {
      return json({ error: 'cannot connect self' }, 400, cors);
    }
    const conversationId = await connectUsers(
      env.DB,
      callerId,
      referrerId,
      now,
    );
    await nudgeContactRefresh(env, callerId, referrerId, now, 'referral');
    return json({ ok: true, conversationId }, 200, cors);
  }

  // POST /conversations/resolve-direct  { otherUserId } -> { conversationId }
  if (
    request.method === 'POST' &&
    url.pathname === '/conversations/resolve-direct'
  ) {
    const otherUserId = (await readJson(request))?.otherUserId;
    if (typeof otherUserId !== 'string' || !otherUserId.trim()) {
      return json({ error: 'otherUserId required' }, 400, cors);
    }
    const trimmedOtherUserId = otherUserId.trim();
    if (trimmedOtherUserId === callerId) {
      return json(
        { error: 'cannot open a direct conversation with self' },
        400,
        cors,
      );
    }
    const conversationId = await resolveOrCreateDirect(
      env.DB,
      callerId,
      trimmedOtherUserId,
      now,
    );
    return json({ conversationId }, 200, cors);
  }

  // GET /conversations -> caller's conversations (each with members)
  if (request.method === 'GET' && url.pathname === '/conversations') {
    const conversations = await listConversations(env.DB, callerId);
    return json({ conversations }, 200, cors);
  }

  // GET /conversations/:id -> conversation + members (membership-guarded)
  const convoMatch = url.pathname.match(/^\/conversations\/([^/]+)$/);
  if (request.method === 'GET' && convoMatch) {
    const conversationId = decodeURIComponent(convoMatch[1]);
    if (!(await isMember(env.DB, conversationId, callerId))) {
      // 404 (not 403) so non-members can't probe which ids exist.
      return json({ error: 'not_found' }, 404, cors);
    }
    const conversation = await getConversation(env.DB, conversationId);
    if (!conversation) return json({ error: 'not_found' }, 404, cors);
    const members = await getMembers(env.DB, conversationId);
    return json({ conversation, members }, 200, cors);
  }

  const reactionMatch = url.pathname.match(
    /^\/conversations\/([^/]+)\/messages\/([^/]+)\/reaction$/,
  );
  if (request.method === 'PUT' && reactionMatch) {
    const conversationId = decodeURIComponent(reactionMatch[1]);
    const messageId = decodeURIComponent(reactionMatch[2]);
    if (!(await isMember(env.DB, conversationId, callerId))) {
      return json({ error: 'not_found' }, 404, cors);
    }

    const reactionKey = parseReactionKey(
      (await readJson(request))?.reactionKey,
    );
    if (reactionKey === undefined) {
      return json(
        { error: 'reactionKey must be null or 1-64 characters' },
        400,
        cors,
      );
    }
    const reactions = await setMyReaction(
      env.DB,
      conversationId,
      messageId,
      callerId,
      reactionKey,
    );
    if (!reactions) return json({ error: 'not_found' }, 404, cors);

    const event: ConversationServerEvent = {
      t: 'reaction',
      messageId,
      actorUserId: callerId,
      actorReactionKey: reactionKey,
      reactions: reactions.map(({ key, count }) => ({ key, count })),
    };
    try {
      await env.CONVERSATION_CHANNEL.getByName(conversationId).broadcast(event);
    } catch (err) {
      console.warn('[data] reaction broadcast failed', {
        conversationId,
        messageId,
        err,
      });
    }
    return json({ messageId, reactions }, 200, cors);
  }

  // GET /conversations/:id/messages -> recent messages (membership-guarded)
  const messagesMatch = url.pathname.match(
    /^\/conversations\/([^/]+)\/messages$/,
  );
  if (messagesMatch) {
    const conversationId = decodeURIComponent(messagesMatch[1]);
    if (!(await isMember(env.DB, conversationId, callerId))) {
      return json({ error: 'not_found' }, 404, cors);
    }

    if (request.method === 'GET') {
      const rows = await loadMessages(
        env.DB,
        conversationId,
        RECENT_MESSAGES_WINDOW,
        callerId,
      );
      return json({ messages: rows.map(toWireMessage) }, 200, cors);
    }

    // POST -> send a text or file message; server allocates id + timestamp.
    if (request.method === 'POST') {
      const payload = await readJson(request);
      const parsed = parseSendBody(payload);
      if ('error' in parsed) {
        return json({ error: parsed.error }, 400, cors);
      }
      const stored = await insertMessage(
        env.DB,
        conversationId,
        parsed.messageId,
        callerId,
        parsed.kind,
        parsed.body,
        parsed.attachment,
        now,
      );
      if (!stored) {
        return json({ error: 'insert_failed' }, 500, cors);
      }
      const wire = toWireMessage(stored);
      // DO notification pattern: after successful write, notify the Durable Object
      // to broadcast the event. Uses hibernation RPC (direct method invocation) —
      // the DO trusts the worker since they share the same process and the worker
      // already authenticated + validated the write. The DO broadcasts to all
      // connected members, including the sender (client deduplicates by message id).
      const event: ConversationServerEvent = { t: 'message', message: wire };
      // Best-effort live push: the message is already committed, so a transient
      // DO failure must not fail the send (would cause client retry / dup). The
      // sender renders optimistically; peers reconcile on next load if missed.
      try {
        await env.CONVERSATION_CHANNEL.getByName(conversationId).broadcast(
          event,
        );
      } catch (err) {
        console.warn('[data] live broadcast failed', { conversationId, err });
      }
      // Per-user activity push: ping every other member's mailbox so their
      // conversation list reorders + badges without the conversation open.
      // Best-effort, fire-and-forget (not persisted in the mailbox).
      try {
        const members = await getMembers(env.DB, conversationId);
        await Promise.all(
          members
            .filter((m) => m.user_id !== callerId)
            .map((m) =>
              env.USER_MAILBOX.getByName(m.user_id).deliver({
                t: 'activity',
                conversationId,
                senderId: callerId,
                sentAt: now,
              }),
            ),
        );
      } catch (err) {
        console.warn('[data] activity fan-out failed', { conversationId, err });
      }
      return json({ message: wire }, 200, cors);
    }
  }

  return json({ error: 'not_found' }, 404, cors);
}

/** D1 row (snake_case) -> wire envelope (camelCase) shared with the client. */
function toWireMessage(row: MessageWithAttachments): WireMessage {
  return {
    id: row.id,
    conversationId: row.conversation_id,
    senderId: row.sender_id,
    senderName: row.sender_name,
    kind: row.kind,
    body: row.body,
    sentAt: row.created_at,
    attachments: row.attachments.map((a) => ({
      id: a.id,
      r2Key: a.r2_key,
      bucket: a.bucket,
      fileName: a.file_name,
      mimeType: a.mime_type,
      fileSize: a.file_size,
      width: a.width,
      height: a.height,
    })),
    reactions: row.reactions,
  };
}

/**
 * Profile row → wire. `displayName` is the display name; `username` is the handle
 * (matches the client's UserProfileSchema split). email_hash is never returned.
 */
function toWireProfile(row: UserProfileRow) {
  return {
    displayName: row.display_name,
    photoURL: row.photo_url,
    username: row.username,
    discoverable: row.discoverable === 1,
  };
}

/** Public profile read by known uid — display fields only, no discoverable. */
function toPublicProfile(row: UserProfileRow) {
  return {
    displayName: row.display_name,
    photoURL: row.photo_url,
    username: row.username,
  };
}

/** Profile row → directory entry (mirrors client DirectoryEntrySchema). */
function toDirectoryEntry(row: UserProfileRow) {
  return {
    uid: row.id,
    displayName: row.display_name ?? 'Anonymous',
    photoURL: row.photo_url,
    registeredAt: row.registered_at ?? row.created_at,
    username: row.username,
  };
}

/** Contact row → wire (mirrors client ContactRecordSchema). */
function toWireContact(row: ContactRow) {
  return {
    contactId: row.contact_id,
    username: row.username ?? '',
    displayName: row.display_name ?? '',
    nickname: row.nickname ?? '',
    conversationId: row.conversation_id,
    savedAt: row.saved_at,
    lastInteractionAt: row.last_interaction_at,
  };
}

function toWireRequest(row: ContactRequestRow) {
  return {
    fromId: row.from_id,
    toId: row.to_id,
    fromName: row.from_name ?? null,
    toName: row.to_name ?? null,
    createdAt: row.created_at,
  };
}

async function nudgeContactRefresh(
  env: WorkerEnv,
  a: string,
  b: string,
  now: number,
  reason: string,
) {
  try {
    await Promise.all([
      env.USER_MAILBOX.getByName(a).deliver({
        t: 'contact_request',
        fromId: b,
        createdAt: now,
      }),
      env.USER_MAILBOX.getByName(b).deliver({
        t: 'contact_request',
        fromId: a,
        createdAt: now,
      }),
    ]);
  } catch (err) {
    console.warn('[data] contact refresh nudge failed', { a, b, reason, err });
  }
}

type SendBody =
  | {
      messageId: string;
      kind: 'text' | 'file';
      body: string | null;
      attachment: NewAttachment | null;
    }
  | { error: string };

/**
 * Validate a POST /messages body. `messageId` is client-reserved (for optimistic
 * reconcile). Text needs a body; file needs an attachment.
 */
function parseSendBody(payload: Record<string, unknown> | null): SendBody {
  const messageId = payload?.messageId;
  if (typeof messageId !== 'string' || !messageId.trim()) {
    return { error: 'messageId required' };
  }
  const kind = payload?.kind;
  if (kind === 'text') {
    const body = payload?.body;
    if (typeof body !== 'string' || !body.trim()) {
      return { error: 'text message requires a body' };
    }
    return { messageId, kind, body, attachment: null };
  }
  if (kind === 'file') {
    const a = payload?.attachment as Record<string, unknown> | undefined;
    const fileName =
      typeof a?.fileName === 'string'
        ? normalizeAttachmentFileName(a.fileName)
        : null;
    if (
      !a ||
      typeof a.r2Key !== 'string' ||
      typeof a.bucket !== 'string' ||
      fileName === null ||
      typeof a.mimeType !== 'string' ||
      typeof a.fileSize !== 'number' ||
      !Number.isFinite(a.fileSize) ||
      a.fileSize <= 0
    ) {
      return { error: 'file message requires a valid attachment' };
    }
    // Accept width/height only as finite positive px; anything else → null.
    const posOrNull = (v: unknown): number | null =>
      typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : null;
    return {
      messageId,
      kind,
      body: typeof payload?.body === 'string' ? payload.body : null,
      attachment: {
        r2Key: a.r2Key,
        bucket: a.bucket,
        fileName,
        mimeType: a.mimeType,
        fileSize: a.fileSize,
        width: posOrNull(a.width),
        height: posOrNull(a.height),
      },
    };
  }
  return { error: "kind must be 'text' or 'file'" };
}

// Authoritative filename sanitization: strip control chars and path separators,
// reject empty names, and truncate over-long ones (rather than reject) so a long
// filename degrades gracefully instead of failing the send.
function normalizeAttachmentFileName(fileName: string): string | null {
  const normalized = fileName.replace(/[\x00-\x1f\x7f/\\]/g, '_').trim();
  if (!normalized) return null;
  return normalized.slice(0, MAX_ATTACHMENT_FILE_NAME_LENGTH);
}

async function readJson(
  request: Request,
): Promise<Record<string, unknown> | null> {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Non-empty trimmed string, or null. */
function str(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

/** Finite number, or undefined (for optional payload fields). */
function numOrUndef(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value)
    ? value
    : undefined;
}

function isUniqueUsernameConstraint(error: unknown): boolean {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : '';
  return (
    message.includes('UNIQUE constraint failed') &&
    message.includes('users.username')
  );
}

function parseReactionKey(value: unknown): string | null | undefined {
  if (value === null) return null;
  if (typeof value !== 'string') return undefined;
  const key = value.trim();
  return key.length >= 1 && key.length <= 64 ? key : undefined;
}

function json(
  body: unknown,
  status: number,
  cors: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}
