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

function normalizeLabel(value, fieldName) {
  if (value == null) return '';
  if (typeof value !== 'string') {
    throw new TypeError(`${fieldName} must be a string`);
  }
  return value.trim();
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function normalizeConversationId(conversationId) {
  if (conversationId == null) {
    return null;
  }

  if (typeof conversationId !== 'string') {
    throw new TypeError('conversationId must be a string or null');
  }

  const normalized = conversationId.trim();
  if (!normalized) return null;

  // Pre-#564 records may still carry the legacy `<uidA>_<uidB>` composite
  // key under this field name; only the opaque D1 UUID is valid here.
  return UUID_RE.test(normalized) ? normalized : null;
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

  const record = {
    contactId,
    nickname: normalizeLabel(
      input.nickname ?? input.contactNickName,
      'nickname',
    ),
    displayName: normalizeLabel(input.displayName, 'displayName'),
    username: normalizeLabel(input.username, 'username'),
    conversationId: normalizeConversationId(input.conversationId),
    savedAt,
    lastInteractionAt: normalizeTimestamp(input.lastInteractionAt, savedAt),
  };

  return ContactRecordSchema.parse(record);
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
    if (key === 'nickname') {
      next.nickname = normalizeLabel(value, 'nickname');
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
