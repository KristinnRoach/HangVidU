import {
  ContactIdSchema,
  ContactPatchSchema,
  ContactRecordSchema,
} from './contact-schema.js';

/**
 * Validate and normalize a contact id.
 * @param {unknown} contactId
 * @returns {string}
 */
export function assertContactId(contactId) {
  return ContactIdSchema.parse(contactId);
}

function normalizeContactNickName(contactNickName) {
  if (contactNickName == null) {
    return '';
  }
  if (typeof contactNickName !== 'string') {
    throw new TypeError('contactNickName must be a string');
  }
  return contactNickName.trim();
}

function normalizeRoomId(roomId) {
  if (roomId == null) {
    return null;
  }

  if (typeof roomId !== 'string') {
    throw new TypeError('roomId must be a string or null');
  }

  const normalized = roomId.trim();
  return normalized || null;
}

function normalizeConversationId(conversationId) {
  if (conversationId == null) {
    return null;
  }

  if (typeof conversationId !== 'string') {
    throw new TypeError('conversationId must be a string or null');
  }

  const normalized = conversationId.trim();
  return normalized || null;
}

function normalizeTimestamp(value, fallbackValue) {
  if (value == null) {
    return fallbackValue;
  }

  return value;
}

/**
 * Normalize a raw contact-like input into the canonical storage record shape.
 * @param {unknown} input
 * @param {{ now?: number }} [options]
 * @returns {import('./contact-schema.js').ContactRecord}
 */
export function normalizeContactRecord(input, { now = Date.now() } = {}) {
  if (!input || typeof input !== 'object') {
    throw new TypeError('contact record must be an object');
  }

  const contactId = assertContactId(input.contactId);
  const savedAt = normalizeTimestamp(input.savedAt, now);
  const contactNickName = normalizeContactNickName(
    input.contactNickName ??
      // TODO(2026-04-08): Remove legacy alias fallback once migration is complete and old clients are retired.
      input.contactName,
  );

  return ContactRecordSchema.parse({
    contactId,
    contactNickName,
    // TODO(2026-04-08): Remove legacy mirror once migration is complete and old clients are retired.
    contactName: contactNickName,
    roomId: normalizeRoomId(input.roomId),
    conversationId:
      'conversationId' in input
        ? normalizeConversationId(input.conversationId)
        : undefined,
    savedAt,
    lastInteractionAt: normalizeTimestamp(input.lastInteractionAt, savedAt),
  });
}

/**
 * Normalize a partial contact update before persistence.
 * @param {unknown} patch
 * @returns {import('./contact-schema.js').ContactPatch}
 */
export function normalizeContactPatch(patch) {
  if (!patch || typeof patch !== 'object') {
    throw new TypeError('contact patch must be an object');
  }

  const next = {};

  for (const [key, value] of Object.entries(patch)) {
    if (key === 'contactNickName' || key === 'contactName') {
      const contactNickName = normalizeContactNickName(value);
      next.contactNickName = contactNickName;
      // TODO(2026-04-08): Remove legacy mirror once migration is complete and old clients are retired.
      next.contactName = contactNickName;
      continue;
    }

    if (key === 'roomId') {
      next.roomId = normalizeRoomId(value);
      continue;
    }

    if (key === 'conversationId') {
      next.conversationId = normalizeConversationId(value);
      continue;
    }

    next[key] = normalizeTimestamp(value, value);
  }

  return ContactPatchSchema.parse(next);
}

/**
 * Merge an existing contact record with a validated patch.
 * Keeps `contactId` immutable.
 *
 * @param {unknown} existingRecord
 * @param {unknown} patch
 * @returns {import('./contact-schema.js').ContactRecord}
 */
export function mergeContactRecord(existingRecord, patch) {
  const existing = normalizeContactRecord(existingRecord);
  const nextPatch = normalizeContactPatch(patch);

  return normalizeContactRecord({
    ...existing,
    ...nextPatch,
    contactId: existing.contactId,
  });
}
