import { z } from 'zod';

/**
 * Canonical contact record shape for the storage layer.
 * `contactId` is the remote user's UID and must match the storage key for the record.
 * @typedef {Object} ContactRecord
 * @property {string} contactId
 * @property {string} contactNickName
 * @property {string|null} roomId
 * @property {string|null|undefined} [conversationId]
 * @property {number} savedAt
 * @property {number} lastInteractionAt
 */

/**
 * Partial update shape for persisted contacts.
 * @typedef {Object} ContactPatch
 * @property {string} [contactNickName]
 * @property {string|null} [roomId]
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

/** @type {import('zod').ZodType<string>} */
export const ContactNickNameSchema = z.preprocess(
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
export const ContactTimestampSchema = z
  .number()
  .finite()
  .nonnegative();

/** @type {import('zod').ZodType<ContactRecord>} */
export const ContactRecordSchema = z.object({
  contactId: ContactIdSchema,
  contactNickName: ContactNickNameSchema,
  roomId: ContactRoomIdSchema,
  conversationId: ContactConversationIdSchema.optional(),
  savedAt: ContactTimestampSchema,
  lastInteractionAt: ContactTimestampSchema,
});

/** @type {import('zod').ZodType<ContactPatch>} */
export const ContactPatchSchema = z
  .object({
    contactNickName: ContactNickNameSchema.optional(),
    roomId: ContactRoomIdSchema.optional(),
    conversationId: ContactConversationIdSchema.optional(),
    savedAt: ContactTimestampSchema.optional(),
    lastInteractionAt: ContactTimestampSchema.optional(),
  })
  .strict();
