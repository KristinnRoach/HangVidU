import { authenticate, authenticateWebSocket } from './auth';
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
import { ConversationChannel } from './conversation-channel';
import type {
  ConversationServerEvent,
  WireMessage,
} from '../../../shared/conversation-channel/protocol';

export { ConversationChannel };

export interface Env {
  DB: D1Database;
  CONVERSATION_CHANNEL: DurableObjectNamespace<ConversationChannel>;
  FIREBASE_PROJECT_ID: string;
  ALLOWED_ORIGINS: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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
        // Live push: broadcast to all connected members (incl. sender, who
        // dedupes against its optimistic row by this server-allocated id).
        const event: ConversationServerEvent = { t: 'message', message: wire };
        await env.CONVERSATION_CHANNEL.getByName(conversationId).broadcast(
          event,
        );
        return json({ message: wire }, 200, cors);
      }
    }

    return json({ error: 'not_found' }, 404, cors);
  },
} satisfies ExportedHandler<Env>;

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
    if (
      !a ||
      typeof a.r2Key !== 'string' ||
      typeof a.fileName !== 'string' ||
      typeof a.mimeType !== 'string' ||
      typeof a.fileSize !== 'number'
    ) {
      return { error: 'file message requires a valid attachment' };
    }
    return {
      messageId,
      kind,
      body: typeof payload?.body === 'string' ? payload.body : null,
      attachment: {
        r2Key: a.r2Key,
        fileName: a.fileName,
        mimeType: a.mimeType,
        fileSize: a.fileSize,
        width: typeof a.width === 'number' ? a.width : null,
        height: typeof a.height === 'number' ? a.height : null,
      },
    };
  }
  return { error: "kind must be 'text' or 'file'" };
}

function isAllowedOrigin(origin: string | null, env: Env): boolean {
  if (!origin) return false;
  return env.ALLOWED_ORIGINS.split(',')
    .map((o) => o.trim())
    .filter(Boolean)
    .includes(origin);
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (origin && allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
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
