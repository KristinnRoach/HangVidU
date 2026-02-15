import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProgressivePlayer } from '../progressive-player.js';

describe('ProgressivePlayer', () => {
  let mockVideoElement;
  let mockMetadata;
  let player;

  beforeEach(() => {
    // Create mock video element
    mockVideoElement = document.createElement('video');
    mockVideoElement.id = 'test-video';
    document.body.appendChild(mockVideoElement);

    // Create mock metadata
    mockMetadata = {
      fileId: 'test-file-123',
      name: 'test-video.mp4',
      size: 1024 * 1024 * 100, // 100MB
      mimeType: 'video/mp4',
      totalChunks: 100,
    };
  });

  afterEach(() => {
    // Cleanup
    if (player) {
      player.cleanup();
    }
    if (mockVideoElement && mockVideoElement.parentNode) {
      mockVideoElement.parentNode.removeChild(mockVideoElement);
    }
  });

  describe('Constructor', () => {
    it('should create a ProgressivePlayer instance', () => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);

      expect(player).toBeInstanceOf(ProgressivePlayer);
      expect(player.metadata).toBe(mockMetadata);
      expect(player.videoElement).toBe(mockVideoElement);
      expect(player.totalChunks).toBe(100);
      expect(player.chunks).toEqual([]);
      expect(player.canPlayThreshold).toBe(0.25);
      expect(player.isPlaybackReady).toBe(false);
      expect(player.isPlaybackStarted).toBe(false);
    });

    it('should initialize with correct threshold', () => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);

      expect(player.canPlayThreshold).toBe(0.25);
    });

    it('should initialize callbacks as null', () => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);

      expect(player.onPlaybackReady).toBeNull();
      expect(player.onError).toBeNull();
      expect(player.onProgress).toBeNull();
    });
  });

  describe('addChunk', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should add chunk at correct index', () => {
      const chunk = new Uint8Array([1, 2, 3, 4]);

      player.addChunk(chunk, 0);

      expect(player.chunks[0]).toBe(chunk);
      expect(player.chunks.length).toBe(1);
    });

    it('should add multiple chunks at different indices', () => {
      const chunk1 = new Uint8Array([1, 2, 3]);
      const chunk2 = new Uint8Array([4, 5, 6]);
      const chunk3 = new Uint8Array([7, 8, 9]);

      player.addChunk(chunk1, 0);
      player.addChunk(chunk2, 5);
      player.addChunk(chunk3, 10);

      expect(player.chunks[0]).toBe(chunk1);
      expect(player.chunks[5]).toBe(chunk2);
      expect(player.chunks[10]).toBe(chunk3);
    });

    it('should call onProgress callback when chunk is added', () => {
      const onProgressSpy = vi.fn();
      player.onProgress = onProgressSpy;

      const chunk = new Uint8Array([1, 2, 3]);
      player.addChunk(chunk, 0);

      expect(onProgressSpy).toHaveBeenCalledWith(0.01); // 1/100 = 0.01
    });

    it('should not trigger onPlaybackReady before 25% threshold', () => {
      const onPlaybackReadySpy = vi.fn();
      player.onPlaybackReady = onPlaybackReadySpy;

      // Add 24 chunks (24% - below threshold)
      for (let i = 0; i < 24; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(onPlaybackReadySpy).not.toHaveBeenCalled();
      expect(player.isPlaybackReady).toBe(false);
    });

    it('should trigger onPlaybackReady at 25% threshold', () => {
      const onPlaybackReadySpy = vi.fn();
      player.onPlaybackReady = onPlaybackReadySpy;

      // Add 25 chunks (25% - at threshold)
      for (let i = 0; i < 25; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(onPlaybackReadySpy).toHaveBeenCalledTimes(1);
      expect(player.isPlaybackReady).toBe(true);
    });

    it('should only trigger onPlaybackReady once', () => {
      const onPlaybackReadySpy = vi.fn();
      player.onPlaybackReady = onPlaybackReadySpy;

      // Add 50 chunks (50% - well above threshold)
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(onPlaybackReadySpy).toHaveBeenCalledTimes(1);
      expect(player.isPlaybackReady).toBe(true);
    });
  });

  describe('canPlay', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should return false when no chunks received', () => {
      expect(player.canPlay()).toBe(false);
    });

    it('should return false when less than 25% chunks received', () => {
      // Add 24 chunks (24%)
      for (let i = 0; i < 24; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.canPlay()).toBe(false);
    });

    it('should return true when exactly 25% chunks received', () => {
      // Add 25 chunks (25%)
      for (let i = 0; i < 25; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.canPlay()).toBe(true);
    });

    it('should return true when more than 25% chunks received', () => {
      // Add 50 chunks (50%)
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.canPlay()).toBe(true);
    });

    it('should return true when all chunks received', () => {
      // Add 100 chunks (100%)
      for (let i = 0; i < 100; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.canPlay()).toBe(true);
    });

    it('should handle different total chunk counts correctly', () => {
      // Test with 200 chunks
      const largeMetadata = { ...mockMetadata, totalChunks: 200 };
      player = new ProgressivePlayer(largeMetadata, mockVideoElement);

      // Add 49 chunks (24.5% - below threshold)
      for (let i = 0; i < 49; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      expect(player.canPlay()).toBe(false);

      // Add 1 more chunk (50 chunks = 25% - at threshold)
      player.addChunk(new Uint8Array([50]), 50);
      expect(player.canPlay()).toBe(true);
    });
  });

  describe('getProgress', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should return 0 when no chunks received', () => {
      expect(player.getProgress()).toBe(0);
    });

    it('should return correct progress for partial chunks', () => {
      // Add 25 chunks
      for (let i = 0; i < 25; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.getProgress()).toBe(0.25);
    });

    it('should return correct progress for half chunks', () => {
      // Add 50 chunks
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.getProgress()).toBe(0.5);
    });

    it('should return 1 when all chunks received', () => {
      // Add 100 chunks
      for (let i = 0; i < 100; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.getProgress()).toBe(1);
    });

    it('should calculate progress correctly with non-sequential chunks', () => {
      // Add chunks at random indices
      player.addChunk(new Uint8Array([1]), 0);
      player.addChunk(new Uint8Array([2]), 10);
      player.addChunk(new Uint8Array([3]), 20);
      player.addChunk(new Uint8Array([4]), 30);
      player.addChunk(new Uint8Array([5]), 40);

      // 5 chunks out of 100 = 0.05
      expect(player.getProgress()).toBe(0.05);
    });

    it('should handle progress calculation with different total chunks', () => {
      const smallMetadata = { ...mockMetadata, totalChunks: 10 };
      player = new ProgressivePlayer(smallMetadata, mockVideoElement);

      // Add 3 chunks
      for (let i = 0; i < 3; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.getProgress()).toBe(0.3);
    });
  });

  describe('cleanup', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should clear chunks array', () => {
      // Add some chunks
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.chunks.length).toBeGreaterThan(0);

      player.cleanup();

      expect(player.chunks).toEqual([]);
    });

    it('should reset playback state flags', () => {
      // Set flags to true
      player.isPlaybackReady = true;
      player.isPlaybackStarted = true;

      player.cleanup();

      expect(player.isPlaybackReady).toBe(false);
      expect(player.isPlaybackStarted).toBe(false);
    });

    it('should clear MediaBunny components', () => {
      // Set some mock components
      player.input = { dispose: vi.fn() };
      player.videoSink = {};
      player.audioSink = {};

      player.cleanup();

      expect(player.input).toBeNull();
      expect(player.videoSink).toBeNull();
      expect(player.audioSink).toBeNull();
    });

    it('should clear iterators', () => {
      player.videoIterator = { return: vi.fn() };
      player.audioIterator = { return: vi.fn() };

      player.cleanup();

      expect(player.videoIterator).toBeNull();
      expect(player.audioIterator).toBeNull();
    });

    it('should clear audio context', () => {
      player.audioContext = { close: vi.fn() };
      player.gainNode = {};

      player.cleanup();

      expect(player.audioContext).toBeNull();
      expect(player.gainNode).toBeNull();
    });

    it('should clear canvas elements', () => {
      player.canvas = document.createElement('canvas');
      player.canvasContext = player.canvas.getContext('2d');

      player.cleanup();

      expect(player.canvas).toBeNull();
      expect(player.canvasContext).toBeNull();
    });

    it('should clear queued audio nodes', () => {
      player.queuedAudioNodes.add({ stop: vi.fn() });
      player.queuedAudioNodes.add({ stop: vi.fn() });

      expect(player.queuedAudioNodes.size).toBe(2);

      player.cleanup();

      expect(player.queuedAudioNodes.size).toBe(0);
    });

    it('should restore video element display', () => {
      mockVideoElement.style.display = 'none';

      player.cleanup();

      expect(mockVideoElement.style.display).toBe('');
    });

    it('should be safe to call multiple times', () => {
      player.cleanup();
      player.cleanup();
      player.cleanup();

      // Should not throw errors
      expect(player.chunks).toEqual([]);
      expect(player.isPlaybackReady).toBe(false);
    });

    it('should increment asyncId to cancel ongoing operations', () => {
      const initialAsyncId = player.asyncId;

      player.cleanup();

      expect(player.asyncId).toBe(initialAsyncId + 1);
    });
  });

  describe('25% Threshold Logic', () => {
    it('should calculate correct threshold for 100 chunks', () => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);

      // 25% of 100 = 25 chunks
      const expectedThreshold = 25;

      // Add 24 chunks - should not be ready
      for (let i = 0; i < 24; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      expect(player.canPlay()).toBe(false);

      // Add 25th chunk - should be ready
      player.addChunk(new Uint8Array([24]), 24);
      expect(player.canPlay()).toBe(true);
    });

    it('should calculate correct threshold for 200 chunks', () => {
      const metadata = { ...mockMetadata, totalChunks: 200 };
      player = new ProgressivePlayer(metadata, mockVideoElement);

      // 25% of 200 = 50 chunks
      for (let i = 0; i < 49; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      expect(player.canPlay()).toBe(false);

      player.addChunk(new Uint8Array([49]), 49);
      expect(player.canPlay()).toBe(true);
    });

    it('should calculate correct threshold for 1000 chunks', () => {
      const metadata = { ...mockMetadata, totalChunks: 1000 };
      player = new ProgressivePlayer(metadata, mockVideoElement);

      // 25% of 1000 = 250 chunks
      for (let i = 0; i < 249; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      expect(player.canPlay()).toBe(false);

      player.addChunk(new Uint8Array([249]), 249);
      expect(player.canPlay()).toBe(true);
    });

    it('should handle odd total chunk counts', () => {
      const metadata = { ...mockMetadata, totalChunks: 99 };
      player = new ProgressivePlayer(metadata, mockVideoElement);

      // 25% of 99 = 24.75, should round up to 25
      for (let i = 0; i < 24; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      expect(player.canPlay()).toBe(false);

      player.addChunk(new Uint8Array([24]), 24);
      expect(player.canPlay()).toBe(true);
    });
  });

  describe('Progress Calculation Edge Cases', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should handle sparse chunk arrays correctly', () => {
      // Add chunks with gaps
      player.addChunk(new Uint8Array([1]), 0);
      player.addChunk(new Uint8Array([2]), 50);
      player.addChunk(new Uint8Array([3]), 99);

      // Only 3 chunks received out of 100
      expect(player.getProgress()).toBe(0.03);
    });

    it('should not count empty/null slots in progress', () => {
      // Manually create sparse array
      player.chunks[0] = new Uint8Array([1]);
      player.chunks[10] = new Uint8Array([2]);
      player.chunks[20] = new Uint8Array([3]);
      // Slots 1-9, 11-19, 21-99 are empty

      const receivedCount = player.chunks.filter((c) => c).length;
      expect(receivedCount).toBe(3);
      expect(player.getProgress()).toBe(0.03);
    });

    it('should handle overwriting chunks at same index', () => {
      const chunk1 = new Uint8Array([1, 2, 3]);
      const chunk2 = new Uint8Array([4, 5, 6]);

      player.addChunk(chunk1, 0);
      expect(player.getProgress()).toBe(0.01);

      // Overwrite same index
      player.addChunk(chunk2, 0);
      expect(player.getProgress()).toBe(0.01); // Still just 1 chunk
      expect(player.chunks[0]).toBe(chunk2); // Should be the new chunk
    });
  });

  describe('Callback Integration', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should call onProgress for each chunk added', () => {
      const progressValues = [];
      player.onProgress = (progress) => progressValues.push(progress);

      for (let i = 0; i < 10; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(progressValues).toEqual([
        0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1,
      ]);
    });

    it('should call onPlaybackReady exactly once at threshold', () => {
      let callCount = 0;
      player.onPlaybackReady = () => callCount++;

      // Add chunks up to and past threshold
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(callCount).toBe(1);
    });

    it('should not call callbacks if they are not set', () => {
      // Should not throw errors
      expect(() => {
        for (let i = 0; i < 30; i++) {
          player.addChunk(new Uint8Array([i]), i);
        }
      }).not.toThrow();
    });

    it('should handle callback errors gracefully', () => {
      player.onProgress = () => {
        throw new Error('Callback error');
      };

      // Should not prevent chunk from being added
      expect(() => {
        player.addChunk(new Uint8Array([1]), 0);
      }).toThrow('Callback error');

      // But chunk should still be added
      expect(player.chunks[0]).toBeDefined();
    });
  });

  describe('Memory Management', () => {
    it('should not keep references after cleanup', () => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);

      // Add chunks
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array(1024), i); // 1KB each
      }

      // Set up various components
      player.input = { dispose: vi.fn() };
      player.canvas = document.createElement('canvas');

      player.cleanup();

      // Verify all references are cleared
      expect(player.chunks).toEqual([]);
      expect(player.input).toBeNull();
      expect(player.canvas).toBeNull();
      expect(player.videoSink).toBeNull();
      expect(player.audioSink).toBeNull();
    });

    it('should handle cleanup with partial state', () => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);

      // Only set some components
      player.chunks = [new Uint8Array(100)];
      player.input = { dispose: vi.fn() };
      // Leave others as null

      expect(() => player.cleanup()).not.toThrow();
    });
  });

  describe('State Management', () => {
    beforeEach(() => {
      player = new ProgressivePlayer(mockMetadata, mockVideoElement);
    });

    it('should track playback ready state correctly', () => {
      expect(player.isPlaybackReady).toBe(false);

      // Add chunks to reach threshold
      for (let i = 0; i < 25; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      expect(player.isPlaybackReady).toBe(true);
    });

    it('should not reset playback ready state when adding more chunks', () => {
      // Reach threshold
      for (let i = 0; i < 25; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      expect(player.isPlaybackReady).toBe(true);

      // Add more chunks
      for (let i = 25; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }

      // Should still be ready
      expect(player.isPlaybackReady).toBe(true);
    });

    it('should reset state after cleanup', () => {
      // Set up state
      for (let i = 0; i < 50; i++) {
        player.addChunk(new Uint8Array([i]), i);
      }
      player.isPlaybackReady = true;
      player.isPlaybackStarted = true;

      player.cleanup();

      expect(player.isPlaybackReady).toBe(false);
      expect(player.isPlaybackStarted).toBe(false);
    });
  });
});
