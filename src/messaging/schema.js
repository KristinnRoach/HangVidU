// src/messaging/schema.js
// Data shapes for conversations, messages, and reactions

import { z } from 'zod';

// ============================================================================
// CONVERSATION STRUCTURE
// ============================================================================
// Path: conversations/{conversationId}/
// conversationId format: "{userId1}_{userId2}" where userId1 < userId2
//
// Example structure:
// {
//   messages: {
//     {messageId}: { type: 'text', text: '...', from: 'user-id', ... },
//     {messageId}: { type: 'file', fileName: '...', from: 'user-id', ... },
//     {messageId}: { type: 'event', eventType: 'missed_call', from: 'caller-uid', ... }
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
  _reactionUpdate: z.boolean().optional(),
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
  _reactionUpdate: z.boolean().optional(),
});

// Event Message (e.g., missed calls, typing, polls)
const EventMessageSchema = z.object({
  messageId: z.string(),
  type: z.literal('event'),
  eventType: z.enum(['missed_call', 'rejected_call']),
  from: z.string().min(1),
  sentAt: z.number(),
  read: z.boolean().default(false),
  details: z
    .object({
      callerId: z.string().optional(),
      callerName: z.string().optional(),
      callId: z.string().nullable().optional(),
    })
    .optional(),
  reactions: reactionsField,
  _reactionUpdate: z.boolean().optional(),
});

// Union of all message types — single schema for both read and write paths
export const MessageSchema = z.union([
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
