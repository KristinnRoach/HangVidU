import { z } from 'zod';

export const SourceIdSchema = z.string().min(1);

export const MediaTypeSchema = z.enum(['video', 'audio', 'av']);

export const MimeTypeSchema = z.string().min(1).nullable().default(null);

export const SourceBaseSchema = z.object({
  id: SourceIdSchema,
  kind: z.enum(['playable', 'stream']),
  label: z.string().min(1),
  origin: z.enum(['local-file', 'received-file', 'url', 'capture']),
  mediaType: MediaTypeSchema,
  mimeType: MimeTypeSchema,
  codecHints: z.array(z.string().min(1)).default([]),
});

const PlayableHandleSchema = z.object({
  url: z.string().min(1).optional(),
  fileId: z.string().min(1).optional(),
  fileName: z.string().min(1).optional(),
});

export const PlayableSourceSchema = SourceBaseSchema.extend({
  kind: z.literal('playable'),
  playableType: z.enum(['file', 'blob-url', 'sw-url', 'remote-url']),
  handle: PlayableHandleSchema,
}).superRefine((value, ctx) => {
  const requiresUrl = new Set(['blob-url', 'sw-url', 'remote-url']);

  if (requiresUrl.has(value.playableType) && !value.handle.url) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['handle', 'url'],
      message: `handle.url is required for playableType="${value.playableType}"`,
    });
  }

  if (
    value.playableType === 'file' &&
    !value.handle.fileId &&
    !value.handle.fileName
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['handle'],
      message: 'file sources require handle.fileId or handle.fileName',
    });
  }
});

export const StreamHandleSchema = z.object({
  streamId: z.string().min(1).optional(),
  trackIds: z.array(z.string().min(1)).default([]),
});

export const StreamSourceSchema = SourceBaseSchema.extend({
  kind: z.literal('stream'),
  origin: z.literal('capture'),
  streamType: z.enum(['camera', 'microphone', 'screen', 'system-audio']),
  handle: StreamHandleSchema,
});

export const SourceSchema = z.discriminatedUnion('kind', [
  PlayableSourceSchema,
  StreamSourceSchema,
]);

export function parsePlayableSource(input) {
  return PlayableSourceSchema.parse(input);
}

export function parseStreamSource(input) {
  return StreamSourceSchema.parse(input);
}

export function parseSource(input) {
  return SourceSchema.parse(input);
}
