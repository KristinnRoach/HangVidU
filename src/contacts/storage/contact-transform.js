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

function normalizeContactName(contactName) {
  if (typeof contactName !== 'string') {
    return '';
  }

  return contactName.trim();
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

  return ContactRecordSchema.parse({
    contactId,
    contactName: normalizeContactName(input.contactName),
    roomId: normalizeRoomId(input.roomId),
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
    if (key === 'contactName') {
      next.contactName = normalizeContactName(value);
      continue;
    }

    if (key === 'roomId') {
      next.roomId = normalizeRoomId(value);
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
