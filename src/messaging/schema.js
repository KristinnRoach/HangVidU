// src/messaging/schema.js
// Data shapes for conversations, messages, and reactions

import { z } from 'zod';

// ============================================================================
// CONVERSATION ID CONTRACT
// ============================================================================
// conversationId is an OPAQUE, stable identifier for a conversation.
//
// No runtime code should infer participants by parsing the conversationId.
// Membership is the authoritative source:
//
//   conversations/{conversationId}/members/{uid} = true   (membership authority)
//   users/{uid}/conversations/{conversationId}   = true   (reverse index)
//   users/{uid}/directConversations/{otherUid}   = conversationId  (1:1 dedup index)
//
// Legacy format (existing 1:1 conversations):
//   "{userId1}_{userId2}" where userId1 < userId2 (lexicographic sort)
//   This format is kept for backward compatibility only. Do NOT split or
//   pattern-match it in new code — read membership from the members collection.
//
// See docs/dev/conversation-id-contract.md for the full contract.

// ============================================================================
// CONVERSATION STRUCTURE
// ============================================================================
// Path: conversations/{conversationId}/
//
// {
//   members: { {uid}: true, ... }                  ← membership authority
//   messages: {
//     {messageId}: { type, text/fileName/..., from, sentAt, read, reactions }
//   }
// }

// ============================================================================
// SHARED FIELDS
// ============================================================================

// Reactions: { emoji: [userId1, userId2] }
// RTDB stores { emoji: { uid: true } } — parseMessage() normalizes to arrays.
const reactionsField = z.record(z.string(), z.array(z.string())).optional();

// ============================================================================
// MESSAGE TYPES
// ============================================================================

// Text Message (user-authored message with text content)
const TextMessageSchema = z.object({
  messageId: z.string(),
  type: z.literal('text'),
  text: z.string(),
  from: z.string().min(1, 'Sender UID required'),
  fromName: z.string(),
  sentAt: z.number(),
  read: z.boolean().default(false),
  reactions: reactionsField,
  // _reactionUpdate: z.boolean().optional(),
});

// File Message (user-authored file transfer, optionally with caption)
const FileMessageSchema = z.object({
  messageId: z.string(),
  type: z.literal('file'),
  fileName: z.string(),
  mimeType: z.string(),
  fileSize: z.number(),
  data: z.string(),
  text: z.string().optional(),
  from: z.string().min(1),
  fromName: z.string(),
  sentAt: z.number(),
  read: z.boolean().default(false),
  reactions: reactionsField,
  // _reactionUpdate: z.boolean().optional(),
});

// Event Message (e.g., missed calls, typing, polls)
const EventMessageSchema = z.object({
  messageId: z.string(),
  type: z.literal('event'),
  eventType: z.enum(['call:unanswered']),
  from: z.string().min(1),
  sentAt: z.number(),
  read: z.boolean().default(false),
  details: z
    .object({
      callId: z.string().nullable().optional(),
    })
    .optional(),
  reactions: reactionsField,
  // _reactionUpdate: z.boolean().optional(),
});

// Redacted Message (content scrubbed after account deletion)
const RedactedMessageSchema = z.object({
  messageId: z.string(),
  type: z.string(),
  redacted: z.literal(true),
  from: z.string().min(1),
  sentAt: z.number(),
  read: z.boolean().default(false),
  reactions: reactionsField,
});

// Union of all message types — single schema for both read and write paths
export const MessageSchema = z.union([
  RedactedMessageSchema,
  TextMessageSchema,
  FileMessageSchema,
  EventMessageSchema,
]);

// ============================================================================
// CONVERSATION STRUCTURE
// ============================================================================

export const ConversationMessagesSchema = z.record(z.string(), MessageSchema);

export const ConversationSchema = z.object({
  messages: ConversationMessagesSchema.optional(),
});

// ============================================================================
// REACTIONS STRUCTURE (RTDB storage format)
// ============================================================================
// Path: conversations/{conversationId}/messages/{messageId}/reactions/
//
// RTDB stores: { 'heart': { userId1: true, userId2: true } }
// App uses:    { 'heart': ['userId1', 'userId2'] }
// parseMessage() handles the conversion on read.

export const ReactionsSchema = z.record(
  z.string(),
  z.record(z.string(), z.boolean()),
);

// ============================================================================
// PARSER
// ============================================================================

/**
 * Parse raw message data into a validated MessageSchema object.
 *
 * Handles two normalizations:
 * 1. Merges messageId from the RTDB key (read path) or passes through (write path)
 * 2. Converts reactions from RTDB format { emoji: { uid: true } } to { emoji: [uid] }
 *
 * @param {Object} data - Raw message data (from RTDB or controller)
 * @param {string} messageId - Message ID (RTDB key or controller-generated)
 * @returns {Object|null} Validated message object, or null if data is missing
 */
export const parseMessage = (data, messageId) => {
  if (!data) return null;

  // Normalize reactions from RTDB format { uid: true } -> [uid]
  const reactions = data.reactions
    ? Object.entries(data.reactions).reduce((acc, [type, users]) => {
        if (users && typeof users === 'object') {
          acc[type] = Array.isArray(users) ? users : Object.keys(users);
        }
        return acc;
      }, {})
    : undefined;

  const parsed = {
    ...data,
    ...(messageId && { messageId }),
    reactions,
  };

  return MessageSchema.parse(parsed);
};

export const parseConversation = (data) => ConversationSchema.parse(data);
export const parseReactions = (data) => ReactionsSchema.parse(data);
