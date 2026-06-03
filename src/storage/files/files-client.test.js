import { afterEach, describe, expect, it, vi } from 'vitest';
import { createFilesClient } from './files-client.js';

describe('files client', () => {
  const options = {
    getToken: async () => 'token',
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('rejects an empty base URL', () => {
    expect(() =>
      createFilesClient({
        ...options,
        baseUrl: '   ',
      }),
    ).toThrow('files client requires a non-empty base URL');
  });

  it('rejects a relative base URL', () => {
    expect(() =>
      createFilesClient({
        ...options,
        baseUrl: '/files',
      }),
    ).toThrow('files client base URL must be absolute');
  });

  it('deletes files by full R2 storage key', async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = createFilesClient({
      ...options,
      baseUrl: 'https://files.example.com',
    });

    await client.deleteFile('conversation-1', {
      provider: 'r2',
      bucket: 'hangvidu-files',
      key: 'conversation-files/conversation-1/object-1',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://files.example.com/conversations/conversation-1/files/object?key=conversation-files%2Fconversation-1%2Fobject-1',
      {
        method: 'DELETE',
        headers: { Authorization: 'Bearer token' },
      },
    );
  });

  it('sends an app check token when one is available', async () => {
    const fetchMock = vi.fn(async () => new Response('image', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const client = createFilesClient({
      ...options,
      baseUrl: 'https://files.example.com',
      getAppCheckToken: async () => 'app-check-token',
    });

    await client.createObjectUrl('conversation-1', {
      provider: 'r2',
      bucket: 'hangvidu-files',
      key: 'conversation-files/conversation-1/object-1',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://files.example.com/conversations/conversation-1/files/object?key=conversation-files%2Fconversation-1%2Fobject-1',
      {
        headers: {
          Authorization: 'Bearer token',
          'X-Firebase-AppCheck': 'app-check-token',
        },
        signal: undefined,
      },
    );
  });
});
