import { z } from 'zod';

function trimString(value: unknown) {
  return typeof value === 'string' ? value.trim() : value;
}

export const ContactIdSchema = z.preprocess(
  trimString,
  z.string().min(1, 'contactId must be a non-empty string'),
);

const ContactConversationIdSchema = z.preprocess((value) => {
  if (value == null) {
    return null;
  }

  if (typeof value !== 'string') {
    return value;
  }

  const normalized = value.trim();
  return normalized || null;
}, z.string().min(1).nullable());

const ContactTimestampSchema = z.number().finite().nonnegative();

const ContactLabelSchema = z.preprocess(
  (value) => (typeof value === 'string' ? value.trim() : ''),
  z.string(),
);

const ContactPatchConversationIdSchema = z.string().min(1);

export const ContactRecordSchema = z.object({
  contactId: ContactIdSchema,
  nickname: ContactLabelSchema,
  displayName: ContactLabelSchema,
  username: ContactLabelSchema,
  conversationId: ContactConversationIdSchema,
  savedAt: ContactTimestampSchema,
  lastInteractionAt: ContactTimestampSchema,
});

export const ContactPatchSchema = z
  .object({
    nickname: ContactLabelSchema.optional(),
    conversationId: ContactPatchConversationIdSchema.optional(),
    lastInteractionAt: ContactTimestampSchema.optional(),
  })
  .strict();

export type ContactRecord = z.infer<typeof ContactRecordSchema>;
export type ContactPatch = z.infer<typeof ContactPatchSchema>;
