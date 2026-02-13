import { describe, it, expect, beforeEach } from 'vitest';
import { VideoProcessor } from './video-processor.js';

describe('VideoProcessor', () => {
  describe('isSupported', () => {
    it('should return true when WebAssembly and VideoDecoder are available', () => {
      // In browser test environment, these should be available
      expect(VideoProcessor.isSupported()).toBe(true);
    });

    it('should return false when WebAssembly is not available', () => {
      const originalWebAssembly = globalThis.WebAssembly;
      globalThis.WebAssembly = undefined;

      expect(VideoProcessor.isSupported()).toBe(false);

      globalThis.WebAssembly = originalWebAssembly;
    });

    it('should return false when VideoDecoder is not available', () => {
      const originalVideoDecoder = globalThis.VideoDecoder;
      globalThis.VideoDecoder = undefined;

      expect(VideoProcessor.isSupported()).toBe(false);

      globalThis.VideoDecoder = originalVideoDecoder;
    });
  });

  describe('getMetadata', () => {
    let processor;

    beforeEach(() => {
      processor = new VideoProcessor();
    });

    it('should reject with error for invalid file data', async () => {
      // Create a mock file with invalid video data
      const mockFile = new File(['not a video'], 'test.mp4', {
        type: 'video/mp4',
      });

      // MediaBunny should reject this as it's not valid video data
      await expect(processor.getMetadata(mockFile)).rejects.toThrow(
        'Failed to extract video metadata',
      );
    });

    it('should reject with error for empty file', async () => {
      const mockFile = new File([], 'empty.mp4', {
        type: 'video/mp4',
      });

      await expect(processor.getMetadata(mockFile)).rejects.toThrow(
        'Failed to extract video metadata',
      );
    });

    it('should reject with error for corrupted data', async () => {
      // Create file with random bytes that aren't valid video
      const randomBytes = new Uint8Array(1000);
      for (let i = 0; i < randomBytes.length; i++) {
        randomBytes[i] = Math.floor(Math.random() * 256);
      }

      const mockFile = new File([randomBytes], 'corrupted.mp4', {
        type: 'video/mp4',
      });

      await expect(processor.getMetadata(mockFile)).rejects.toThrow(
        'Failed to extract video metadata',
      );
    });

    it('should handle WebM files with invalid data', async () => {
      const mockFile = new File(['invalid webm'], 'test.webm', {
        type: 'video/webm',
      });

      await expect(processor.getMetadata(mockFile)).rejects.toThrow(
        'Failed to extract video metadata',
      );
    });

    it('should handle MKV files with invalid data', async () => {
      const mockFile = new File(['invalid mkv'], 'test.mkv', {
        type: 'video/x-matroska',
      });

      await expect(processor.getMetadata(mockFile)).rejects.toThrow(
        'Failed to extract video metadata',
      );
    });
  });

  describe('VideoProcessor class structure', () => {
    it('should be instantiable', () => {
      const processor = new VideoProcessor();
      expect(processor).toBeInstanceOf(VideoProcessor);
    });

    it('should have getMetadata method', () => {
      const processor = new VideoProcessor();
      expect(typeof processor.getMetadata).toBe('function');
    });

    it('should have static isSupported method', () => {
      expect(typeof VideoProcessor.isSupported).toBe('function');
    });
  });
});
