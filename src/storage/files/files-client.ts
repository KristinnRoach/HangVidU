export type R2StorageDescriptor = {
  provider: 'r2';
  bucket: string;
  key: string;
};

type FilesClientOptions = {
  baseUrl: string;
  getToken: () => Promise<string | null>;
};

type UploadResponse = R2StorageDescriptor & {
  fileId: string;
};

export function createFilesClient({ baseUrl, getToken }: FilesClientOptions) {
  const normalizedBaseUrl = baseUrl.trim().replace(/\/$/, '');

  async function authHeaders() {
    const token = await getToken();
    if (!token) throw new Error('files client requires an authenticated user');
    return { Authorization: `Bearer ${token}` };
  }

  function fileIdFromKey(conversationId: string, key: string) {
    const prefix = `${conversationId}/`;
    if (!key.startsWith(prefix)) {
      throw new Error('R2 key does not belong to this conversation');
    }
    const fileId = key.slice(prefix.length);
    if (!fileId || fileId.includes('/')) {
      throw new Error('R2 key does not contain a direct file id');
    }
    return fileId;
  }

  function conversationFilesUrl(conversationId: string) {
    return `${normalizedBaseUrl}/conversations/${encodeURIComponent(
      conversationId,
    )}/files`;
  }

  return {
    async uploadImage(
      conversationId: string,
      file: File,
    ): Promise<R2StorageDescriptor> {
      const response = await fetch(`${conversationFilesUrl(conversationId)}/images`, {
        method: 'POST',
        headers: {
          ...(await authHeaders()),
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      });
      if (!response.ok) {
        throw new Error(`image upload failed: ${response.status}`);
      }

      const body = (await response.json()) as Partial<UploadResponse>;
      if (
        body.provider !== 'r2' ||
        typeof body.bucket !== 'string' ||
        typeof body.key !== 'string'
      ) {
        throw new Error('image upload returned invalid storage metadata');
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
      const fileId = fileIdFromKey(conversationId, storage.key);
      const response = await fetch(`${conversationFilesUrl(conversationId)}/${fileId}`, {
        headers: await authHeaders(),
        signal,
      });
      if (!response.ok) {
        throw new Error(`image download failed: ${response.status}`);
      }

      return URL.createObjectURL(await response.blob());
    },

    async deleteFile(conversationId: string, storage: R2StorageDescriptor) {
      const fileId = fileIdFromKey(conversationId, storage.key);
      const response = await fetch(`${conversationFilesUrl(conversationId)}/${fileId}`, {
        method: 'DELETE',
        headers: await authHeaders(),
      });
      if (!response.ok && response.status !== 404) {
        throw new Error(`file delete failed: ${response.status}`);
      }
    },
  };
}
