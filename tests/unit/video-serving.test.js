import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  isSwServingSupported,
  registerVideoForServing,
  unregisterVideo,
  isSwVideoUrl,
} from '../../src/file-transfer/video-serving.js';

describe('video-serving', () => {
  let mockPostMessage;

  beforeEach(() => {
    mockPostMessage = vi.fn();
  });

  afterEach(() => {
    // Restore navigator.serviceWorker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: undefined,
      writable: true,
      configurable: true,
    });
  });

  function setController(controller) {
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { controller },
      writable: true,
      configurable: true,
    });
  }

  describe('isSwServingSupported', () => {
    it('returns false when no service worker controller', () => {
      setController(null);
      expect(isSwServingSupported()).toBe(false);
    });

    it('returns true when service worker controller exists', () => {
      setController({ postMessage: mockPostMessage });
      expect(isSwServingSupported()).toBe(true);
    });

    it('returns false when serviceWorker is undefined', () => {
      // navigator.serviceWorker is already undefined from afterEach
      expect(isSwServingSupported()).toBe(false);
    });
  });

  describe('registerVideoForServing', () => {
    it('sends REGISTER_VIDEO message and returns virtual URL', async () => {
      setController({ postMessage: mockPostMessage });

      const url = await registerVideoForServing('file-123', 'video/mp4');

      expect(mockPostMessage).toHaveBeenCalledWith({
        type: 'REGISTER_VIDEO',
        fileId: 'file-123',
        mimeType: 'video/mp4',
      });
      expect(url).toBe('/_video-serve/file-123');
    });

    it('URL-encodes fileId with special characters', async () => {
      setController({ postMessage: mockPostMessage });

      const url = await registerVideoForServing(
        'my video (1).mp4-123',
        'video/webm',
      );
      expect(url).toBe(
        '/_video-serve/' + encodeURIComponent('my video (1).mp4-123'),
      );
    });

    it('throws when no SW controller', async () => {
      setController(null);

      await expect(
        registerVideoForServing('file-123', 'video/mp4'),
      ).rejects.toThrow('No active service worker');
    });
  });

  describe('unregisterVideo', () => {
    it('sends UNREGISTER_VIDEO message', () => {
      setController({ postMessage: mockPostMessage });

      unregisterVideo('file-123');

      expect(mockPostMessage).toHaveBeenCalledWith({
        type: 'UNREGISTER_VIDEO',
        fileId: 'file-123',
      });
    });

    it('does nothing when no SW controller', () => {
      setController(null);
      // Should not throw
      unregisterVideo('file-123');
    });
  });

  describe('isSwVideoUrl', () => {
    it('returns true for SW video URLs', () => {
      expect(isSwVideoUrl('/_video-serve/abc-123')).toBe(true);
    });

    it('returns false for blob URLs', () => {
      expect(isSwVideoUrl('blob:http://localhost/abc')).toBe(false);
    });

    it('returns false for regular URLs', () => {
      expect(isSwVideoUrl('https://example.com/video.mp4')).toBe(false);
    });

    it('returns false for non-strings', () => {
      expect(isSwVideoUrl(null)).toBe(false);
      expect(isSwVideoUrl(undefined)).toBe(false);
      expect(isSwVideoUrl(123)).toBe(false);
    });
  });
});
