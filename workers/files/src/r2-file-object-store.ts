import type {
  FileObject,
  FileObjectInfo,
  FileObjectStore,
  FileObjectWrite,
} from './file-object-store';

export class R2FileObjectStore implements FileObjectStore {
  constructor(private readonly bucket: R2Bucket) {}

  async put(key: string, file: FileObjectWrite): Promise<void> {
    await this.bucket.put(key, file.body, {
      httpMetadata: { contentType: file.contentType },
      customMetadata: {
        conversationId: file.conversationId,
        uploadedBy: file.uploadedBy,
      },
    });
  }

  async get(key: string): Promise<FileObject | null> {
    const object = await this.bucket.get(key);
    if (!object) return null;

    return {
      body: object.body,
      contentType: object.httpMetadata?.contentType,
      etag: object.etag,
      size: object.size,
      uploadedBy: object.customMetadata?.uploadedBy,
    };
  }

  async head(key: string): Promise<FileObjectInfo | null> {
    const object = await this.bucket.head(key);
    if (!object) return null;
    return { uploadedBy: object.customMetadata?.uploadedBy };
  }

  async delete(key: string): Promise<void> {
    await this.bucket.delete(key);
  }
}
