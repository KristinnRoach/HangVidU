import { z } from 'zod';
import { SourceIdSchema } from './source-schema.js';

export const PlayerStatusSchema = z.enum([
  'idle',
  'loading',
  'ready',
  'playing',
  'paused',
  'error',
]);

export const PlayerStateSchema = z.object({
  status: PlayerStatusSchema,
  currentSourceId: SourceIdSchema.nullable().default(null),
  currentTime: z.number().min(0).default(0),
  duration: z.number().min(0).nullable().default(null),
  error: z.string().min(1).nullable().default(null),
}).superRefine((value, ctx) => {
  const needsSource = new Set(['loading', 'ready', 'playing', 'paused']);

  if (value.status === 'idle') {
    if (value.currentSourceId !== null) {
      ctx.addIssue({
        code: 'custom',
        path: ['currentSourceId'],
        message: 'currentSourceId must be null when status="idle"',
      });
    }

    if (value.error !== null) {
      ctx.addIssue({
        code: 'custom',
        path: ['error'],
        message: 'error must be null when status="idle"',
      });
    }
  }

  if (needsSource.has(value.status) && value.currentSourceId === null) {
    ctx.addIssue({
      code: 'custom',
      path: ['currentSourceId'],
      message: `currentSourceId is required when status="${value.status}"`,
    });
  }

  if (value.status === 'error' && value.error === null) {
    ctx.addIssue({
      code: 'custom',
      path: ['error'],
      message: 'error is required when status="error"',
    });
  }
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
}).superRefine((value, ctx) => {
  const needsSource = new Set(['attached', 'active']);

  if (value.status === 'idle') {
    if (value.currentSourceId !== null) {
      ctx.addIssue({
        code: 'custom',
        path: ['currentSourceId'],
        message: 'currentSourceId must be null when status="idle"',
      });
    }

    if (value.trackCount !== 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['trackCount'],
        message: 'trackCount must be 0 when status="idle"',
      });
    }

    if (value.error !== null) {
      ctx.addIssue({
        code: 'custom',
        path: ['error'],
        message: 'error must be null when status="idle"',
      });
    }
  }

  if (needsSource.has(value.status) && value.currentSourceId === null) {
    ctx.addIssue({
      code: 'custom',
      path: ['currentSourceId'],
      message: `currentSourceId is required when status="${value.status}"`,
    });
  }

  if (value.status === 'error' && value.error === null) {
    ctx.addIssue({
      code: 'custom',
      path: ['error'],
      message: 'error is required when status="error"',
    });
  }
});

export function parsePlayerState(input) {
  return PlayerStateSchema.parse(input);
}

export function parseLiveStreamState(input) {
  return LiveStreamStateSchema.parse(input);
}
