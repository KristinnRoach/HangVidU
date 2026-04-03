// src/messaging/message-factory.js
// Builds complete, validated message objects.
// The controller uses this to produce canonical messages before passing to any store.

import { MessageSchema } from './schema.js';
import { getUserId, getUser } from '../auth/auth-state.js';

/**
 * Generate a unique, time-sortable ID.
 *
 * Format: `{base36 timestamp}-{random}` (e.g. "m1abc23-7f3a9b1c")
 *
 * - Time prefix ensures chronological key ordering (important for RTDB
 *   child_added which fires in key order on initial load).
 * - Random suffix from crypto.getRandomValues prevents collisions.
 *
 * @returns {string} Unique, time-sortable ID
 */
function _createMessageId() {
  const timePart = Date.now().toString(36);
  const randomPart = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  return `${timePart}-${randomPart}`;
}

/**
 * Build base fields common to all outgoing messages.
 * @returns {Object} { messageId, from, fromName, sentAt, read }
 */
function _baseFields() {
  const from = getUserId();
  if (!from) throw new Error('Cannot create message: no active user id');
  const fromName = getUser()?.displayName || 'Guest User';
  return {
    messageId: _createMessageId(),
    from,
    fromName,
    sentAt: Date.now(),
    read: false,
  };
}

/**
 * Create a validated text message.
 * @param {string} text
 * @returns {Object} Validated MessageSchema object
 */
export function createTextMessage(text) {
  return MessageSchema.parse({ type: 'text', text, ..._baseFields() });
}

/**
 * Create a validated file message.
 * @param {Object} file - { fileName, mimeType, fileSize, data (base64) }
 * @returns {Object} Validated MessageSchema object
 */
export function createFileMessage({ fileName, mimeType, fileSize, data }) {
  return MessageSchema.parse({
    type: 'file',
    fileName,
    mimeType,
    fileSize,
    data,
    ..._baseFields(),
  });
}

/**
 * Create a validated event message (e.g. missed call).
 * @param {string} eventType
 * @param {Object} [details]
 * @param {Object} [overrides] - Optional field overrides (e.g. from, for call events)
 * @returns {Object} Validated MessageSchema object
 */
export function createEventMessage(eventType, details = {}, overrides = {}) {
  return MessageSchema.parse({
    type: 'event',
    eventType,
    details,
    ..._baseFields(),
    ...overrides,
  });
}
