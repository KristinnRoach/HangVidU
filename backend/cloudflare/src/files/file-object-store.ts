export interface FileObjectWrite {
  body: ArrayBuffer;
  contentType: string;
  conversationId: string;
  uploadedBy: string;
}

export interface FileObjectInfo {
  uploadedBy?: string;
}

export interface FileObject extends FileObjectInfo {
  body: ReadableStream;
  contentType?: string;
  etag: string;
  size: number;
}

export interface FileObjectStore {
  put(key: string, file: FileObjectWrite): Promise<void>;
  get(key: string): Promise<FileObject | null>;
  head(key: string): Promise<FileObjectInfo | null>;
  delete(key: string): Promise<void>;
}
