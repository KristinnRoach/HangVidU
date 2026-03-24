import { z } from 'zod';

const SourceBaseSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['playable', 'stream']),
  label: z.string().min(1),
  origin: z.enum(['local-file', 'received-file', 'url', 'capture']),
  mimeType: z.string().min(1).nullable().default(null),
});

export const PlayableSourceSchema = SourceBaseSchema.extend({
  kind: z.literal('playable'),
  playableType: z.enum(['file', 'blob-url', 'sw-url', 'remote-url']),
  handle: z.object({
    url: z.string().min(1).optional(),
    fileId: z.string().min(1).optional(),
    fileName: z.string().min(1).optional(),
  }),
});

export const StreamSourceSchema = SourceBaseSchema.extend({
  kind: z.literal('stream'),
  streamType: z.enum(['camera', 'microphone', 'screen', 'system-audio']),
  handle: z.object({
    streamId: z.string().min(1).optional(),
    trackIds: z.array(z.string().min(1)).default([]),
  }),
});

export function parsePlayableSource(input) {
  return PlayableSourceSchema.parse(input);
}

export function parseStreamSource(input) {
  return StreamSourceSchema.parse(input);
}
