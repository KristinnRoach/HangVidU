import { authenticate, authenticateWebSocket } from '../auth';
import { corsHeaders, isAllowedOrigin } from '../cors';
import type { WorkerEnv } from '../types';
import {
  getConversation,
  getMembers,
  insertMessage,
  isMember,
  listConversations,
  loadMessages,
  resolveOrCreateDirect,
  upsertUser,
  RECENT_MESSAGES_WINDOW,
  type MessageWithAttachments,
  type NewAttachment,
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
      const expiresAt =
        numOrUndef(body?.expiresAt) ?? startedAt + CALLING_TTL_MS;
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
      if (
        !(await isMember(env.DB, conversationId, callerId)) ||
        !(await isMember(env.DB, conversationId, targetCallerId))
      ) {
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

    // POST /conversations/resolve-direct  { otherUserId } -> { conversationId }
    if (request.method === 'POST' && url.pathname === '/conversations/resolve-direct') {
      const otherUserId = (await readJson(request))?.otherUserId;
      if (typeof otherUserId !== 'string' || !otherUserId.trim()) {
        return json({ error: 'otherUserId required' }, 400, cors);
      }
      const trimmedOtherUserId = otherUserId.trim();
      if (trimmedOtherUserId === callerId) {
        return json({ error: 'cannot open a direct conversation with self' }, 400, cors);
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
  };
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
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
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
