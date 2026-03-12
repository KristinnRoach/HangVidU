// src/messaging/message-factory.js
// Builds complete, validated message objects.
// The controller uses this to produce canonical messages before passing to any store.

import { MessageSchema } from './schema.js';
import { generateId } from './utils/generate-id.js';
import { getLoggedInUserId, getUser } from '../auth/auth-state.js';

/**
 * Build base fields common to all outgoing messages.
 * @returns {Object} { messageId, from, fromName, sentAt, read }
 */
function baseFields() {
  const from = getLoggedInUserId();
  if (!from) throw new Error('Cannot create message: not logged in');
  const fromName = getUser()?.displayName || 'Guest User';
  return { messageId: generateId(), from, fromName, sentAt: Date.now(), read: false };
}

/**
 * Create a validated text message.
 * @param {string} text
 * @returns {Object} Validated MessageSchema object
 */
export function createTextMessage(text) {
  return MessageSchema.parse({ type: 'text', text, ...baseFields() });
}

/**
 * Create a validated file message.
 * @param {Object} file - { fileName, mimeType, fileSize, data (base64) }
 * @returns {Object} Validated MessageSchema object
 */
export function createFileMessage({ fileName, mimeType, fileSize, data }) {
  return MessageSchema.parse({ type: 'file', fileName, mimeType, fileSize, data, ...baseFields() });
}

/**
 * Create a validated event message (e.g. missed call).
 * @param {string} eventType
 * @param {Object} [details]
 * @param {Object} [overrides] - Optional field overrides (e.g. from, for call events)
 * @returns {Object} Validated MessageSchema object
 */
export function createEventMessage(eventType, details = {}, overrides = {}) {
  return MessageSchema.parse({ type: 'event', eventType, details, ...baseFields(), ...overrides });
}
