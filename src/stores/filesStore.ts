import { getLoggedInUserToken } from '../auth/index.js';
import { getFirebaseAppCheckToken } from '../infra/firebase.js';
import {
  createFilesClient,
  type R2StorageDescriptor,
} from '../storage/files/index.js';
import type { ConversationId } from '../features/messaging-next/types.js';
import { getHangViduApiBaseUrl } from '../infra/hangvidu-api-url';

let filesClientCache: ReturnType<typeof createFilesClient> | null | undefined;

function getFilesClient() {
  if (filesClientCache !== undefined) return filesClientCache;

  try {
    filesClientCache = createFilesClient({
      baseUrl: getHangViduApiBaseUrl(),
      getToken: getLoggedInUserToken,
      getAppCheckToken: getFirebaseAppCheckToken,
    });
    return filesClientCache;
  } catch {
    filesClientCache = null;
    return null;
  }
}

export function uploadConversationImage(
  conversationId: ConversationId,
  file: File,
) {
  const client = getFilesClient();
  if (!client) {
    return Promise.reject(new Error('Files client not available'));
  }
  return client.uploadImage(conversationId, file);
}

export function uploadConversationFile(
  conversationId: ConversationId,
  file: File,
) {
  return uploadConversationImage(conversationId, file);
}

export function createConversationFileObjectUrl(
  conversationId: ConversationId,
  storage: R2StorageDescriptor,
  signal?: AbortSignal,
) {
  const client = getFilesClient();
  if (!client) {
    return Promise.reject(new Error('Files client not available'));
  }
  return client.createObjectUrl(conversationId, storage, signal);
}

export function deleteConversationFile(
  conversationId: ConversationId,
  storage: R2StorageDescriptor,
) {
  const client = getFilesClient();
  if (!client) {
    return Promise.reject(new Error('Files client not available'));
  }
  return client.deleteFile(conversationId, storage);
}
