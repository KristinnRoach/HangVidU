// src/messaging/reactions/ReactionManager.test.js
// Unit tests for ReactionManager

import { describe, it, expect, beforeEach } from 'vitest';
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

    it('should increment count when adding same reaction multiple times', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.addReaction('msg1', 'heart');
      expect(reactions).toEqual({ heart: 2 });
    });

    it('should support multiple reaction types on same message', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.addReaction('msg1', 'thumbsUp');
      expect(reactions).toEqual({ heart: 1, thumbsUp: 1 });
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
    it('should decrement reaction count', () => {
      manager.addReaction('msg1', 'heart');
      manager.addReaction('msg1', 'heart');
      const reactions = manager.removeReaction('msg1', 'heart');
      expect(reactions).toEqual({ heart: 1 });
    });

    it('should remove reaction entry when count reaches 0', () => {
      manager.addReaction('msg1', 'heart');
      const reactions = manager.removeReaction('msg1', 'heart');
      expect(reactions).toEqual({});
    });

    it('should not go below 0 when removing non-existent reaction', () => {
      const reactions = manager.removeReaction('msg1', 'heart');
      expect(reactions).toEqual({});
    });

    it('should delete message entry when no reactions left', () => {
      manager.addReaction('msg1', 'heart');
      manager.removeReaction('msg1', 'heart');
      expect(manager.reactions.has('msg1')).toBe(false);
    });
  });

  describe('getReactions', () => {
    it('should return empty object for message with no reactions', () => {
      const reactions = manager.getReactions('msg1');
      expect(reactions).toEqual({});
    });

    it('should return all reactions for a message', () => {
      manager.addReaction('msg1', 'heart');
      manager.addReaction('msg1', 'thumbsUp');
      const reactions = manager.getReactions('msg1');
      expect(reactions).toEqual({ heart: 1, thumbsUp: 1 });
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

    it('should return false after all reactions removed', () => {
      manager.addReaction('msg1', 'heart');
      manager.removeReaction('msg1', 'heart');
      expect(manager.hasReactions('msg1')).toBe(false);
    });
  });

  describe('getReactionCount', () => {
    it('should return 0 for non-existent reaction', () => {
      expect(manager.getReactionCount('msg1', 'heart')).toBe(0);
    });

    it('should return correct count for specific reaction', () => {
      manager.addReaction('msg1', 'heart');
      manager.addReaction('msg1', 'heart');
      expect(manager.getReactionCount('msg1', 'heart')).toBe(2);
    });
  });

  describe('clearReactions', () => {
    it('should remove all reactions from a message', () => {
      manager.addReaction('msg1', 'heart');
      manager.addReaction('msg1', 'thumbsUp');
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
      
      const reactions1 = manager.getReactions('msg1');
      const reactions2 = manager.getReactions('msg2');
      
      expect(reactions1).toEqual({ heart: 1 });
      expect(reactions2).toEqual({ heart: 1 });
      
      manager.removeReaction('msg1', 'heart');
      
      expect(manager.hasReactions('msg1')).toBe(false);
      expect(manager.hasReactions('msg2')).toBe(true);
    });
  });
});
