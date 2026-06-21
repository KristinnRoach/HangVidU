import { afterEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  reportApiAuthFailure: vi.fn(),
}));

vi.mock('../../infra/api-auth-failure.js', () => ({
  reportApiAuthFailure: mocks.reportApiAuthFailure,
}));

import { createFilesClient } from './files-client.js';

describe('files client', () => {
  const options = {
    getToken: async () => 'token',
  };

  afterEach(() => {
    vi.unstubAllGlobals();
    mocks.reportApiAuthFailure.mockReset();
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

  it('reports a 401 to the auth-failure helper', async () => {
    const fetchMock = vi.fn(
      async () => new Response('unauthorized', { status: 401 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const client = createFilesClient({
      ...options,
      baseUrl: 'https://files.example.com',
    });

    await expect(
      client.createObjectUrl('conversation-1', {
        provider: 'r2',
        bucket: 'hangvidu-files',
        key: 'conversation-files/conversation-1/object-1',
      }),
    ).rejects.toThrow('file download failed: 401 unauthorized');

    expect(mocks.reportApiAuthFailure).toHaveBeenCalledWith(
      'files download conversation-1',
      401,
      'unauthorized',
    );
  });

  it('reports a 401 on upload to the auth-failure helper', async () => {
    const fetchMock = vi.fn(
      async () => new Response('unauthorized', { status: 401 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const client = createFilesClient({
      ...options,
      baseUrl: 'https://files.example.com',
    });

    await expect(
      client.uploadFile(
        'conversation-1',
        new File(['x'], 'x.png', { type: 'image/png' }),
      ),
    ).rejects.toThrow('file upload failed: 401 unauthorized');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://files.example.com/conversations/conversation-1/files',
      expect.objectContaining({ method: 'POST' }),
    );

    expect(mocks.reportApiAuthFailure).toHaveBeenCalledWith(
      'files upload conversation-1',
      401,
      'unauthorized',
    );
  });

  it('reports a 401 on delete to the auth-failure helper', async () => {
    const fetchMock = vi.fn(
      async () => new Response('unauthorized', { status: 401 }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const client = createFilesClient({
      ...options,
      baseUrl: 'https://files.example.com',
    });

    await expect(
      client.deleteFile('conversation-1', {
        provider: 'r2',
        bucket: 'hangvidu-files',
        key: 'conversation-files/conversation-1/object-1',
      }),
    ).rejects.toThrow('file delete failed: 401 unauthorized');

    expect(mocks.reportApiAuthFailure).toHaveBeenCalledWith(
      'files delete conversation-1',
      401,
      'unauthorized',
    );
  });
});
