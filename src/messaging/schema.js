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
//     {messageId}: { type: 'event', eventType: 'missed_call', from: 'system', ... }
//   }
// }

// ============================================================================
// MESSAGE TYPES
// ============================================================================

// Text Message (user-authored message with text content)
const TextMessageSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
  from: z.string().min(1, 'Sender UID required'),
  fromName: z.string(),
  sentAt: z.number(), // Firebase server timestamp (milliseconds)
  read: z.boolean().default(false),
  reactions: z
    .record(
      // { 'emoji': { userId1: true, userId2: true } }
      z.record(z.boolean()),
    )
    .optional(),
  messageId: z.string().optional(), // Added by transport layer
});

// File Message (user-authored file transfer, optionally with caption)
const FileMessageSchema = z.object({
  type: z.literal('file'),
  fileName: z.string(),
  mimeType: z.string(), // e.g., 'application/pdf', 'image/png'
  fileSize: z.number(),
  data: z.string(), // Base64-encoded file data
  text: z.string().optional(), // Optional caption/description
  from: z.string().min(1),
  fromName: z.string(),
  sentAt: z.number(),
  read: z.boolean().default(false),
  reactions: z.record(z.record(z.boolean())).optional(),
  messageId: z.string().optional(),
});

// Event Message (system-generated event, e.g., missed calls, typing, polls)
const EventMessageSchema = z.object({
  type: z.literal('event'),
  eventType: z.enum(['missed_call', 'rejected_call']),
  from: z.literal('system'), // System-generated events
  sentAt: z.number(),
  read: z.boolean().default(false),
  details: z
    .object({
      callerId: z.string().optional(),
      callerName: z.string().optional(),
      callId: z.string().nullable().optional(),
    })
    .optional(),
  messageId: z.string().optional(),
});

// Union of all message types
export const MessageSchema = z.union([
  TextMessageSchema,
  FileMessageSchema,
  EventMessageSchema,
]);

// ============================================================================
// CONVERSATION STRUCTURE
// ============================================================================

export const ConversationMessagesSchema = z.record(MessageSchema);

// Full conversation object (as it exists in RTDB)
export const ConversationSchema = z.object({
  messages: ConversationMessagesSchema.optional(),
});

// ============================================================================
// EVENT MESSAGE DETAILS
// ============================================================================
// Event messages store event-specific data in the details field.
// Examples:
//
// missed_call:
// { callerId: 'user-123', callerName: 'Alice Smith', callId: 'room-xyz' }
//
// rejected_call:
// { callerId: 'user-123', callerName: 'Alice Smith', callId: 'room-xyz' }
//
// typing (future):
// { userId: 'user-123', conversationId: 'conv-id' }
//
// poll_created (future):
// { pollId: 'poll-456', title: 'Lunch spot?', options: [...] }

// ============================================================================
// REACTIONS STRUCTURE
// ============================================================================
// Path: conversations/{conversationId}/messages/{messageId}/reactions/
//
// {
//   'emoji_type': {
//     userId1: true,
//     userId2: true,
//     userId3: true
//   },
//   'heart': {
//     userId1: true
//   }
// }

export const ReactionsSchema = z.record(
  // reaction type (emoji) -> users who reacted
  z.record(z.boolean()),
);

// ============================================================================
// PARSED MESSAGE (for UI/application use)
// ============================================================================
// This is what the messaging controller emits to the UI.
// Includes both original RTDB fields + computed fields

const parsedFields = {
  messageId: z.string(), // Always present after parsing (added by transport)
  reactions: z.record(z.array(z.string())).optional(), // { emoji: [uid1, uid2] }
  _reactionUpdate: z.boolean().optional(), // Internal flag for reaction-only updates
};

export const ParsedMessageSchema = z.union([
  TextMessageSchema.extend(parsedFields),
  FileMessageSchema.extend(parsedFields),
  EventMessageSchema.extend(parsedFields),
]);

// ============================================================================
// PARSER FUNCTIONS (following user/schema.js pattern)
// ============================================================================

export const parseMessage = (data) => {
  // Handle missing/undefined gracefully during initial loading
  if (!data) return null;

  // Merge reactions from nested structure: { emoji: { uid: true } } -> { emoji: [uids] }
  const reactions = data.reactions
    ? Object.entries(data.reactions).reduce((acc, [type, users]) => {
        acc[type] = Object.keys(users);
        return acc;
      }, {})
    : undefined;

  const parsed = {
    ...data,
    reactions,
  };

  return ParsedMessageSchema.parse(parsed);
};

export const parseConversation = (data) => ConversationSchema.parse(data);
export const parseReactions = (data) => ReactionsSchema.parse(data);
