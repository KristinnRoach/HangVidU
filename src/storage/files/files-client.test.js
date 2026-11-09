import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { ReadableStream } from 'node:stream/web';

const mocks = vi.hoisted(() => ({
  reportApiAuthFailure: vi.fn(),
  captureException: vi.fn(),
}));

vi.mock('@sentry/browser', () => ({
  captureException: mocks.captureException,
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
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    mocks.reportApiAuthFailure.mockReset();
    mocks.captureException.mockReset();
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

  const previewStorage = { provider: 'r2', bucket: 'files', key: 'image' };
  const previewClient = () =>
    createFilesClient({ ...options, baseUrl: 'https://files.example.com' });

  it('rejects declared oversized previews before buffering and cancels their body', async () => {
    const cancel = vi.fn();
    const body = new ReadableStream({ cancel });
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(body, { headers: { 'Content-Length': '100' } }),
      ),
    );
    const create = vi.spyOn(URL, 'createObjectURL');
    await expect(
      previewClient().createObjectUrl(
        'conversation',
        previewStorage,
        undefined,
        4,
      ),
    ).rejects.toThrow('preview exceeds size limit');
    expect(cancel).toHaveBeenCalledOnce();
    expect(create).not.toHaveBeenCalled();
  });

  it.each([undefined, '1'])(
    'enforces the actual streamed preview size with Content-Length %s',
    async (contentLength) => {
      const cancel = vi.fn();
      const body = new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array([1, 2]));
          controller.enqueue(new Uint8Array([3, 4, 5]));
        },
        cancel,
      });
      vi.stubGlobal(
        'fetch',
        vi.fn(
          async () =>
            new Response(body, {
              headers: contentLength ? { 'Content-Length': contentLength } : {},
            }),
        ),
      );
      const create = vi.spyOn(URL, 'createObjectURL');
      await expect(
        previewClient().createObjectUrl(
          'conversation',
          previewStorage,
          undefined,
          4,
        ),
      ).rejects.toThrow('preview exceeds size limit');
      expect(cancel).toHaveBeenCalledOnce();
      expect(create).not.toHaveBeenCalled();
    },
  );

  it('allows a preview exactly at the byte cap and retains its media type', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(new Uint8Array([1, 2, 3, 4]), {
            headers: { 'Content-Type': 'image/png' },
          }),
      ),
    );
    const create = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:preview');
    await expect(
      previewClient().createObjectUrl(
        'conversation',
        previewStorage,
        undefined,
        4,
      ),
    ).resolves.toBe('blob:preview');
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({ size: 4, type: 'image/png' }),
    );
  });

  it('does not create a URL if a preview finishes after cancellation', async () => {
    const controller = new AbortController();
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        controller.abort();
        return new Response('tiny');
      }),
    );
    const create = vi.spyOn(URL, 'createObjectURL');
    await expect(
      previewClient().createObjectUrl(
        'conversation',
        previewStorage,
        controller.signal,
        4,
      ),
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(create).not.toHaveBeenCalled();
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
  it.each([
    [
      'network',
      () => {
        throw new TypeError('Failed to fetch');
      },
      true,
    ],
    [
      'server',
      () => new Response('secret server detail', { status: 500 }),
      true,
    ],
    ['invalid-response', () => Response.json({ wrong: 'metadata' }), true],
    ['server', () => new Response('unavailable', { status: 503 }), true],
    [
      'initializing',
      () =>
        new Response('initializing', {
          status: 503,
          headers: { 'Retry-After': '1' },
        }),
      false,
    ],
    ['quota', () => new Response('full', { status: 507 }), false],
    ['validation', () => new Response('too large', { status: 413 }), false],
  ])(
    'reports %s failures selectively without file details',
    async (kind, result, reports) => {
      vi.stubGlobal(
        'fetch',
        vi.fn(async () => result()),
      );
      const client = createFilesClient({
        ...options,
        baseUrl: 'https://files.example.com',
      });
      await expect(
        client.uploadFile(
          'private-conversation',
          new File(['secret contents'], 'private-name.txt'),
        ),
      ).rejects.toThrow();
      expect(mocks.captureException).toHaveBeenCalledTimes(reports ? 1 : 0);
      if (reports) {
        const [error, context] = mocks.captureException.mock.calls[0];
        expect(error.message).toBe(`File upload failed (${kind})`);
        expect(context).toEqual({
          tags: { operation: 'file-upload', failure: kind },
          extra: {
            status:
              kind === 'network'
                ? null
                : kind === 'server'
                  ? result().status
                  : 200,
            fileSizeBytes: 15,
          },
        });
      }
    },
  );
});
