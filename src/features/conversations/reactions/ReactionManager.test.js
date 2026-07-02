// Unit tests for ReactionManager

import { describe, it, expect, beforeEach } from 'vite-plus/test';
import { ReactionManager } from './ReactionManager.js';

describe('ReactionManager', () => {
  let manager;

  beforeEach(() => {
    manager = new ReactionManager();
  });

  describe('addReaction', () => {
    it('should add a reaction to a message', () => {
      const reactions = manager.addReaction('msg1', 'heart');
      expect(reactions).toEqual({ heart: 1 });
    });

    it('should be a no-op when re-selecting the same reaction', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.addReaction('msg1', 'heart');
      expect(reactions).toEqual({ heart: 1 });
    });

    it('should replace the previous reaction when a different type is selected', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.addReaction('msg1', 'thumbsUp');
      expect(reactions).toEqual({ thumbsUp: 1 });
      expect(manager.getUserReactionType('msg1')).toBe('thumbsUp');
    });

    it('should throw error if messageId is missing', () => {
      expect(() => manager.addReaction('')).toThrow('messageId is required');
      expect(() => manager.addReaction(null)).toThrow('messageId is required');
    });

    it('should use default reaction type if not specified', () => {
      const reactions = manager.addReaction('msg1');
      expect(reactions.heart).toBeDefined();
    });
  });

  describe('removeReaction', () => {
    it('should remove the actor reaction', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.removeReaction('msg1');
      expect(reactions).toEqual({});
    });

    it('should not go below 0 when removing with no existing reaction', () => {
      const reactions = manager.removeReaction('msg1');
      expect(reactions).toEqual({});
    });

    it('should delete message entry when no reactions left', () => {
      manager.addReaction('msg1', 'heart');
      manager.removeReaction('msg1');
      expect(manager.reactions.has('msg1')).toBe(false);
    });

    it('should clear getUserReactionType after removal', () => {
      manager.addReaction('msg1', 'heart');
      manager.removeReaction('msg1');
      expect(manager.getUserReactionType('msg1')).toBe(null);
    });
  });

  describe('getReactions', () => {
    it('should return empty object for message with no reactions', () => {
      const reactions = manager.getReactions('msg1');
      expect(reactions).toEqual({});
    });

    it('should return the message reactions', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.getReactions('msg1');
      expect(reactions).toEqual({ heart: 1 });
    });
  });

  describe('hasReactions', () => {
    it('should return false for message with no reactions', () => {
      expect(manager.hasReactions('msg1')).toBe(false);
    });

    it('should return true for message with reactions', () => {
      manager.addReaction('msg1', 'heart');
      expect(manager.hasReactions('msg1')).toBe(true);
    });

    it('should return false after reaction removed', () => {
      manager.addReaction('msg1', 'heart');
      manager.removeReaction('msg1');
      expect(manager.hasReactions('msg1')).toBe(false);
    });
  });

  describe('getReactionCount', () => {
    it('should return 0 for non-existent reaction', () => {
      expect(manager.getReactionCount('msg1', 'heart')).toBe(0);
    });

    it('should return the count for the actor reaction', () => {
      manager.addReaction('msg1', 'heart');
      expect(manager.getReactionCount('msg1', 'heart')).toBe(1);
    });
  });

  describe('syncFromSummaries', () => {
    it('hydrates aggregate counts and the local actor reaction', () => {
      manager.syncFromSummaries('msg1', [
        { key: 'heart', count: 2, reactedByMe: true },
        { key: 'laugh', count: 1, reactedByMe: false },
      ]);

      expect(manager.getReactions('msg1')).toEqual({ heart: 2, laugh: 1 });
      expect(manager.getUserReactionType('msg1')).toBe('heart');
    });

    it('clears state when summaries are empty', () => {
      manager.addReaction('msg1', 'heart');
      manager.syncFromSummaries('msg1', []);
      expect(manager.hasReactions('msg1')).toBe(false);
    });
  });

  describe('clearReactions', () => {
    it('should remove all reactions from a message', () => {
      manager.addReaction('msg1', 'heart');
      manager.clearReactions('msg1');
      expect(manager.hasReactions('msg1')).toBe(false);
    });
  });

  describe('clearAll', () => {
    it('should remove all reactions from all messages', () => {
      manager.addReaction('msg1', 'heart');
      manager.addReaction('msg2', 'thumbsUp');
      manager.clearAll();
      expect(manager.hasReactions('msg1')).toBe(false);
      expect(manager.hasReactions('msg2')).toBe(false);
      expect(manager.reactions.size).toBe(0);
    });
  });

  describe('multiple messages', () => {
    it('should track reactions independently for different messages', () => {
      manager.addReaction('msg1', 'heart');
      manager.addReaction('msg2', 'heart');

      expect(manager.getReactions('msg1')).toEqual({ heart: 1 });
      expect(manager.getReactions('msg2')).toEqual({ heart: 1 });

      manager.removeReaction('msg1');

      expect(manager.hasReactions('msg1')).toBe(false);
      expect(manager.hasReactions('msg2')).toBe(true);
    });
  });
});
