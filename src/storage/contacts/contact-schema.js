import { z } from 'zod';

/**
 * Canonical contact record shape for the storage layer.
 * `contactId` is the remote user's UID and must match the storage key for the record.
 * @typedef {Object} ContactRecord
 * @property {string} contactId // TODO: rename to userId for consistency?
 * @property {string} nickname
 * @property {string} displayName
 * @property {string} username
 * @property {string|null} conversationId // TODO: required?
 * @property {number} savedAt
 * @property {number} lastInteractionAt
 */

/**
 * Partial update shape for persisted contacts.
 * @typedef {Object} ContactPatch
 * @property {string} [nickname]
 * @property {string|null} [conversationId]
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

/** @type {import('zod').ZodType<string|null>} */
export const ContactConversationIdSchema = z.preprocess((value) => {
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
export const ContactTimestampSchema = z.number().finite().nonnegative();

/** @type {import('zod').ZodType<string>} */
const ContactLabelSchema = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : ''),
  z.string(),
);

/** @type {import('zod').ZodType<ContactRecord>} */
export const ContactRecordSchema = z.object({
  contactId: ContactIdSchema,
  nickname: ContactLabelSchema,
  displayName: ContactLabelSchema,
  username: ContactLabelSchema,
  conversationId: ContactConversationIdSchema,
  savedAt: ContactTimestampSchema,
  lastInteractionAt: ContactTimestampSchema,
});

/** @type {import('zod').ZodType<ContactPatch>} */
export const ContactPatchSchema = z
  .object({
    nickname: ContactLabelSchema.optional(),
    conversationId: ContactConversationIdSchema.optional(),
    savedAt: ContactTimestampSchema.optional(),
    lastInteractionAt: ContactTimestampSchema.optional(),
  })
  .strict();
