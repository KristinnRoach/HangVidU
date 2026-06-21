import { reportApiAuthFailure } from '../../infra/api-auth-failure.js';

export type R2StorageDescriptor = {
  provider: 'r2';
  bucket: string;
  key: string;
};

type FilesClientOptions = {
  baseUrl: string;
  getToken: () => Promise<string | null>;
  getAppCheckToken?: () => Promise<string | null>;
};

type UploadResponse = R2StorageDescriptor;

function normalizeBaseUrl(baseUrl: string) {
  const normalized = baseUrl.trim().replace(/\/+$/, '');
  if (!normalized) {
    throw new Error('files client requires a non-empty base URL');
  }

  let parsed: URL;
  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error('files client base URL must be absolute');
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error('files client base URL must use HTTP(S)');
  }

  return normalized;
}

export function createFilesClient({
  baseUrl,
  getToken,
  getAppCheckToken,
}: FilesClientOptions) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);

  async function authHeaders() {
    const token = await getToken();
    if (!token) throw new Error('files client requires an authenticated user');
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    const appCheckToken = await getAppCheckToken?.();
    if (appCheckToken) {
      headers['X-Firebase-AppCheck'] = appCheckToken;
    }
    return headers;
  }

  function conversationFilesUrl(conversationId: string) {
    return `${normalizedBaseUrl}/conversations/${encodeURIComponent(
      conversationId,
    )}/files`;
  }

  function conversationFileObjectUrl(
    conversationId: string,
    storage: R2StorageDescriptor,
  ) {
    return `${conversationFilesUrl(conversationId)}/object?key=${encodeURIComponent(
      storage.key,
    )}`;
  }

  return {
    async uploadFile(
      conversationId: string,
      file: File,
    ): Promise<R2StorageDescriptor> {
      const response = await fetch(
        conversationFilesUrl(conversationId),
        {
          method: 'POST',
          headers: {
            ...(await authHeaders()),
            'Content-Type': file.type || 'application/octet-stream',
          },
          body: file,
        },
      );
      if (!response.ok) {
        if (response.status === 401) {
          const detail = await response.text().catch(() => '');
          reportApiAuthFailure(
            `files upload ${conversationId}`,
            response.status,
            detail,
          );
          throw new Error(`file upload failed: ${response.status} ${detail}`);
        }
        throw new Error(`file upload failed: ${response.status}`);
      }

      const body = (await response.json()) as Partial<UploadResponse>;
      if (
        body.provider !== 'r2' ||
        typeof body.bucket !== 'string' ||
        typeof body.key !== 'string'
      ) {
        throw new Error('file upload returned invalid storage metadata');
      }
      return {
        provider: 'r2',
        bucket: body.bucket,
        key: body.key,
      };
    },

    async createObjectUrl(
      conversationId: string,
      storage: R2StorageDescriptor,
      signal?: AbortSignal,
    ) {
      const response = await fetch(
        conversationFileObjectUrl(conversationId, storage),
        {
          headers: await authHeaders(),
          signal,
        },
      );
      if (!response.ok) {
        if (response.status === 401) {
          const detail = await response.text().catch(() => '');
          reportApiAuthFailure(
            `files download ${conversationId}`,
            response.status,
            detail,
          );
          throw new Error(`file download failed: ${response.status} ${detail}`);
        }
        throw new Error(`file download failed: ${response.status}`);
      }

      return URL.createObjectURL(await response.blob());
    },

    async deleteFile(conversationId: string, storage: R2StorageDescriptor) {
      const response = await fetch(
        conversationFileObjectUrl(conversationId, storage),
        {
          method: 'DELETE',
          headers: await authHeaders(),
        },
      );
      if (!response.ok && response.status !== 404) {
        if (response.status === 401) {
          const detail = await response.text().catch(() => '');
          reportApiAuthFailure(
            `files delete ${conversationId}`,
            response.status,
            detail,
          );
          throw new Error(`file delete failed: ${response.status} ${detail}`);
        }
        throw new Error(`file delete failed: ${response.status}`);
      }
    },
  };
}
