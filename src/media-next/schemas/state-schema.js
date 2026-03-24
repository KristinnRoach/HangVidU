import { z } from 'zod';
import { SourceIdSchema } from './source-schema.js';

export const PlaybackStatusSchema = z.enum([
  'idle',
  'loading',
  'ready',
  'playing',
  'paused',
  'error',
]);

export const PlaybackStateSchema = z.object({
  status: PlaybackStatusSchema,
  currentSourceId: SourceIdSchema.nullable().default(null),
  isPlaying: z.boolean().default(false),
  currentTime: z.number().min(0).default(0),
  duration: z.number().min(0).nullable().default(null),
  error: z.string().min(1).nullable().default(null),
});

export const LiveStreamStatusSchema = z.enum([
  'idle',
  'attached',
  'active',
  'error',
]);

export const LiveStreamStateSchema = z.object({
  status: LiveStreamStatusSchema,
  currentSourceId: SourceIdSchema.nullable().default(null),
  trackCount: z.number().int().min(0).default(0),
  error: z.string().min(1).nullable().default(null),
});

export function parsePlaybackState(input) {
  return PlaybackStateSchema.parse(input);
}

export function parseLiveStreamState(input) {
  return LiveStreamStateSchema.parse(input);
}
