import { describe, it, expect, beforeEach } from 'vitest';
import {
  registerVideo,
  unregisterVideo,
  isVideoServeRequest,
  handleVideoFetch,
} from '../../src/file-transfer/sw-video-handler.js';

// Helper to create a mock OPFS environment
function setupMockOPFS(fileId, fileContent) {
  const blob = new Blob([fileContent], { type: 'application/octet-stream' });

  const mockFileHandle = {
    getFile: async () => blob,
  };

  const mockDirHandle = {
    getFileHandle: async (id) => {
      if (id === fileId) return mockFileHandle;
      throw new DOMException('Not found', 'NotFoundError');
    },
  };

  const mockRoot = {
    getDirectoryHandle: async (name) => {
      if (name === 'file-transfers') return mockDirHandle;
      throw new DOMException('Not found', 'NotFoundError');
    },
  };

  // Mock navigator.storage.getDirectory
  if (!navigator.storage) {
    Object.defineProperty(navigator, 'storage', {
      value: {},
      writable: true,
      configurable: true,
    });
  }
  navigator.storage.getDirectory = async () => mockRoot;

  return blob;
}

describe('sw-video-handler', () => {
  const FILE_ID = 'test-video-123';
  const MIME_TYPE = 'video/mp4';

  beforeEach(() => {
    // Clean up registrations between tests
    unregisterVideo(FILE_ID);
  });

  describe('isVideoServeRequest', () => {
    it('matches /_video-serve/ URLs', () => {
      const url = new URL('http://localhost/_video-serve/some-file-id');
      expect(isVideoServeRequest(url)).toBe(true);
    });

    it('does not match other URLs', () => {
      expect(isVideoServeRequest(new URL('http://localhost/index.html'))).toBe(
        false,
      );
      expect(isVideoServeRequest(new URL('http://localhost/video-serve'))).toBe(
        false,
      );
    });
  });

  describe('handleVideoFetch', () => {
    it('returns null for unregistered fileId', async () => {
      const request = new Request(
        'http://localhost/_video-serve/unknown-file-id',
      );
      const response = await handleVideoFetch(request);
      expect(response).toBeNull();
    });

    it('serves full file with 200 when no Range header', async () => {
      const content = new Uint8Array(1024).fill(42);
      setupMockOPFS(FILE_ID, content);
      registerVideo(FILE_ID, MIME_TYPE);

      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe(MIME_TYPE);
      expect(response.headers.get('Accept-Ranges')).toBe('bytes');
      expect(response.headers.get('Content-Length')).toBe('1024');

      const body = await response.arrayBuffer();
      expect(body.byteLength).toBe(1024);
    });

    it('serves partial content with 206 for Range: bytes=0-499', async () => {
      const content = new Uint8Array(1024);
      for (let i = 0; i < 1024; i++) content[i] = i % 256;
      setupMockOPFS(FILE_ID, content);
      registerVideo(FILE_ID, MIME_TYPE);

      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
        { headers: { Range: 'bytes=0-499' } },
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(206);
      expect(response.headers.get('Content-Range')).toBe(
        'bytes 0-499/1024',
      );
      expect(response.headers.get('Content-Length')).toBe('500');
      expect(response.headers.get('Accept-Ranges')).toBe('bytes');

      const body = await response.arrayBuffer();
      expect(body.byteLength).toBe(500);
    });

    it('serves from offset to end for Range: bytes=500-', async () => {
      const content = new Uint8Array(1024).fill(7);
      setupMockOPFS(FILE_ID, content);
      registerVideo(FILE_ID, MIME_TYPE);

      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
        { headers: { Range: 'bytes=500-' } },
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(206);
      expect(response.headers.get('Content-Range')).toBe(
        'bytes 500-1023/1024',
      );
      expect(response.headers.get('Content-Length')).toBe('524');
    });

    it('returns 416 for range beyond file size', async () => {
      const content = new Uint8Array(100).fill(1);
      setupMockOPFS(FILE_ID, content);
      registerVideo(FILE_ID, MIME_TYPE);

      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
        { headers: { Range: 'bytes=200-300' } },
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(416);
      expect(response.headers.get('Content-Range')).toBe('bytes */100');
    });

    it('returns 416 for invalid Range header format', async () => {
      const content = new Uint8Array(100).fill(1);
      setupMockOPFS(FILE_ID, content);
      registerVideo(FILE_ID, MIME_TYPE);

      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
        { headers: { Range: 'invalid' } },
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(416);
    });

    it('returns 404 when OPFS file is missing', async () => {
      registerVideo(FILE_ID, MIME_TYPE);

      // Setup OPFS mock with no matching file
      const mockDirHandle = {
        getFileHandle: async () => {
          throw new DOMException('Not found', 'NotFoundError');
        },
      };
      const mockRoot = {
        getDirectoryHandle: async () => mockDirHandle,
      };
      navigator.storage.getDirectory = async () => mockRoot;

      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(404);
    });

    it('handles URL-encoded fileId', async () => {
      const specialId = 'my video (1).mp4-1234-5678';
      const content = new Uint8Array(50).fill(3);
      setupMockOPFS(specialId, content);
      registerVideo(specialId, MIME_TYPE);

      const encodedId = encodeURIComponent(specialId);
      const request = new Request(
        `http://localhost/_video-serve/${encodedId}`,
      );
      const response = await handleVideoFetch(request);

      expect(response.status).toBe(200);
    });
  });

  describe('registerVideo / unregisterVideo', () => {
    it('allows serving after register and blocks after unregister', async () => {
      const content = new Uint8Array(10).fill(1);
      setupMockOPFS(FILE_ID, content);

      registerVideo(FILE_ID, MIME_TYPE);
      const request = new Request(
        `http://localhost/_video-serve/${FILE_ID}`,
      );

      let response = await handleVideoFetch(request);
      expect(response.status).toBe(200);

      unregisterVideo(FILE_ID);
      response = await handleVideoFetch(request);
      expect(response).toBeNull();
    });
  });
});
