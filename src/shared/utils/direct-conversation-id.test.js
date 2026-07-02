import { describe, expect, it } from 'vite-plus/test';
import { resolveContactIdFromDirectConversationId } from './direct-conversation-id.js';

describe('resolveContactIdFromDirectConversationId', () => {
  it('returns the other participant when myUserId is in the legacy id', () => {
    expect(resolveContactIdFromDirectConversationId('a_b', 'a')).toBe('b');
    expect(resolveContactIdFromDirectConversationId('a_b', 'b')).toBe('a');
  });

  it('returns null when myUserId is not part of the legacy id', () => {
    expect(resolveContactIdFromDirectConversationId('a_b', 'me')).toBeNull();
  });

  it('returns null for opaque (non-legacy) ids', () => {
    expect(
      resolveContactIdFromDirectConversationId('0f8c1a2b-uuid', 'me'),
    ).toBeNull();
  });
});
