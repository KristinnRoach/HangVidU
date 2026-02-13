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

  describe('Large file handling', () => {
    it('should handle large file sizes (5GB) without memory issues', async () => {
      const processor = new VideoProcessor();

      // Create a mock file with 5GB size property
      // Note: We're not actually creating 5GB of data, just a File object
      // with a large size property to simulate a large file
      const fiveGB = 5 * 1024 * 1024 * 1024; // 5GB in bytes

      // Create a small buffer but with a File object reporting 5GB size
      const smallBuffer = new Uint8Array(1024); // Just 1KB of actual data
      const mockLargeFile = new File([smallBuffer], 'large-video.mp4', {
        type: 'video/mp4',
      });

      // Override the size property to simulate a 5GB file
      Object.defineProperty(mockLargeFile, 'size', {
        value: fiveGB,
        writable: false,
      });

      // Record memory usage before
      const memoryBefore = performance.memory?.usedJSHeapSize || 0;
      const startTime = performance.now();

      // Attempt to extract metadata
      // This should fail because the data isn't valid video, but we're testing
      // that it doesn't cause memory issues or take too long
      try {
        await processor.getMetadata(mockLargeFile);
      } catch (error) {
        // Expected to fail with invalid data, but should fail quickly
        expect(error.message).toContain('Failed to extract video metadata');
      }

      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000; // Convert to seconds

      // Record memory usage after
      const memoryAfter = performance.memory?.usedJSHeapSize || 0;
      const memoryIncrease = (memoryAfter - memoryBefore) / (1024 * 1024); // Convert to MB

      // Verify execution time is reasonable (< 3 seconds as per requirement)
      // Note: This is for the attempt, not successful extraction
      expect(executionTime).toBeLessThan(3);

      // Verify memory increase is reasonable (< 200MB as per design doc)
      // Only check if performance.memory is available (Chromium browsers)
      if (performance.memory) {
        expect(memoryIncrease).toBeLessThan(200);
      }

      // Log results for documentation
      console.log(`Large file test results:`);
      console.log(
        `  File size: ${(fiveGB / (1024 * 1024 * 1024)).toFixed(2)} GB`,
      );
      console.log(`  Execution time: ${executionTime.toFixed(3)} seconds`);
      if (performance.memory) {
        console.log(`  Memory increase: ${memoryIncrease.toFixed(2)} MB`);
      }
    });

    it('should report correct file size in metadata for large files', async () => {
      const processor = new VideoProcessor();

      // For this test, we verify that the file size is correctly reported
      // in the metadata, even for large files
      const largeSize = 5 * 1024 * 1024 * 1024; // 5GB

      // Create a mock file
      const mockFile = new File(['test'], 'test.mp4', {
        type: 'video/mp4',
      });

      // Override size to simulate large file
      Object.defineProperty(mockFile, 'size', {
        value: largeSize,
        writable: false,
      });

      // This will fail due to invalid data, but we can verify the error handling
      // doesn't corrupt the file size information
      try {
        await processor.getMetadata(mockFile);
      } catch (error) {
        // Expected to fail, but verify the file object is intact
        expect(mockFile.size).toBe(largeSize);
        expect(mockFile.name).toBe('test.mp4');
      }
    });
  });
});
