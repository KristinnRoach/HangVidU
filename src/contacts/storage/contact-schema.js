import { z } from 'zod';

/**
 * Canonical contact record shape for the storage layer.
 * @typedef {Object} ContactRecord
 * @property {string} contactId
 * @property {string} contactName
 * @property {string|null} roomId
 * @property {number} savedAt
 * @property {number} lastInteractionAt
 */

/**
 * Partial update shape for persisted contacts.
 * @typedef {Object} ContactPatch
 * @property {string} [contactName]
 * @property {string|null} [roomId]
 * @property {number} [savedAt]
 * @property {number} [lastInteractionAt]
 */

function trimString(value) {
  return typeof value === 'string' ? value.trim() : value;
}

/** @type {import('zod').ZodType<string>} */
export const ContactIdSchema = z.preprocess(
  trimString,
  z.string().min(1, 'contactId must be a non-empty string'),
);

/** @type {import('zod').ZodType<string>} */
export const ContactNameSchema = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : ''),
  z.string(),
);

/** @type {import('zod').ZodType<string|null>} */
export const ContactRoomIdSchema = z.preprocess((value) => {
  if (value == null) {
    return null;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const normalized = value.trim();
  return normalized || null;
}, z.string().min(1).nullable());

/** @type {import('zod').ZodType<number>} */
export const ContactTimestampSchema = z
  .number()
  .finite()
  .nonnegative();

/** @type {import('zod').ZodType<ContactRecord>} */
export const ContactRecordSchema = z.object({
  contactId: ContactIdSchema,
  contactName: ContactNameSchema,
  roomId: ContactRoomIdSchema,
  savedAt: ContactTimestampSchema,
  lastInteractionAt: ContactTimestampSchema,
});

/** @type {import('zod').ZodType<ContactPatch>} */
export const ContactPatchSchema = z
  .object({
    contactName: ContactNameSchema.optional(),
    roomId: ContactRoomIdSchema.optional(),
    savedAt: ContactTimestampSchema.optional(),
    lastInteractionAt: ContactTimestampSchema.optional(),
  })
  .strict();
