const MUTABLE_CONTACT_FIELDS = new Set([
  'contactName',
  'roomId',
  'savedAt',
  'lastInteractionAt',
]);

function isFiniteTimestamp(value) {
  return Number.isFinite(value) && value >= 0;
}

export function assertContactId(contactId) {
  if (typeof contactId !== 'string' || !contactId.trim()) {
    throw new TypeError('contactId must be a non-empty string');
  }

  return contactId.trim();
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

function normalizeTimestamp(value, fieldName, fallbackValue) {
  if (value == null) {
    return fallbackValue;
  }

  if (!isFiniteTimestamp(value)) {
    throw new TypeError(`${fieldName} must be a non-negative number`);
  }

  return value;
}

export function normalizeContactRecord(input, { now = Date.now() } = {}) {
  if (!input || typeof input !== 'object') {
    throw new TypeError('contact record must be an object');
  }

  const contactId = assertContactId(input.contactId);
  const savedAt = normalizeTimestamp(input.savedAt, 'savedAt', now);

  return {
    contactId,
    contactName: normalizeContactName(input.contactName),
    roomId: normalizeRoomId(input.roomId),
    savedAt,
    lastInteractionAt: normalizeTimestamp(
      input.lastInteractionAt,
      'lastInteractionAt',
      savedAt,
    ),
  };
}

export function normalizeContactPatch(patch) {
  if (!patch || typeof patch !== 'object') {
    throw new TypeError('contact patch must be an object');
  }

  const next = {};

  for (const [key, value] of Object.entries(patch)) {
    if (!MUTABLE_CONTACT_FIELDS.has(key)) {
      throw new TypeError(`unsupported contact patch field: ${key}`);
    }

    if (key === 'contactName') {
      next.contactName = normalizeContactName(value);
      continue;
    }

    if (key === 'roomId') {
      next.roomId = normalizeRoomId(value);
      continue;
    }

    next[key] = normalizeTimestamp(value, key, value);
  }

  return next;
}

export function mergeContactRecord(existingRecord, patch) {
  const existing = normalizeContactRecord(existingRecord);
  const nextPatch = normalizeContactPatch(patch);

  return normalizeContactRecord({
    ...existing,
    ...nextPatch,
    contactId: existing.contactId,
  });
}
