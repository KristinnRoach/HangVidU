import { describe, expect, it } from 'vitest';
import {
  LiveStreamStateSchema,
  parsePlayerState,
  PlayerStateSchema,
} from './state-schema.js';

describe('PlayerStateSchema', () => {
  it('rejects loaded playback states without a source id', () => {
    const result = PlayerStateSchema.safeParse({
      status: 'playing',
      currentSourceId: null,
      currentTime: 12,
      duration: 42,
      error: null,
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0]?.message).toBe(
      'currentSourceId is required when status="playing"',
    );
  });

  it('rejects error playback states without an error message', () => {
    const result = PlayerStateSchema.safeParse({
      status: 'error',
      currentSourceId: 'playable-1',
      currentTime: 0,
      duration: null,
      error: null,
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0]?.message).toBe(
      'error is required when status="error"',
    );
  });

  it('parses playing state without a redundant isPlaying flag', () => {
    expect(
      parsePlayerState({
        status: 'playing',
        currentSourceId: 'playable-1',
        currentTime: 12,
        duration: 42,
        error: null,
      }),
    ).toEqual({
      status: 'playing',
      currentSourceId: 'playable-1',
      currentTime: 12,
      duration: 42,
      error: null,
    });
  });
});

describe('LiveStreamStateSchema', () => {
  it('rejects active stream states without a source id', () => {
    const result = LiveStreamStateSchema.safeParse({
      status: 'active',
      currentSourceId: null,
      trackCount: 1,
      error: null,
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0]?.message).toBe(
      'currentSourceId is required when status="active"',
    );
  });

  it('rejects error stream states without an error message', () => {
    const result = LiveStreamStateSchema.safeParse({
      status: 'error',
      currentSourceId: 'stream-1',
      trackCount: 1,
      error: null,
    });

    expect(result.success).toBe(false);
    expect(result.error.issues[0]?.message).toBe(
      'error is required when status="error"',
    );
  });
});
