import { getLoggedInUserToken } from '@auth/index.js';
import { getFirebaseAppCheckToken } from '@infra/firebase.js';
import {
  createFilesClient,
  type R2StorageDescriptor,
} from '@storage/files/index.js';
import type { ConversationId } from '@features/conversations/types.js';
import { getHangViduApiBaseUrl } from '@infra/hangvidu-api-url.js';

let filesClientCache: ReturnType<typeof createFilesClient> | undefined;

function getFilesClient() {
  return (filesClientCache ??= createFilesClient({
    baseUrl: getHangViduApiBaseUrl(),
    getToken: getLoggedInUserToken,
    getAppCheckToken: getFirebaseAppCheckToken,
  }));
}

export function uploadConversationFile(
  conversationId: ConversationId,
  file: File,
) {
  return getFilesClient().uploadFile(conversationId, file);
}

export function createConversationFileObjectUrl(
  conversationId: ConversationId,
  storage: R2StorageDescriptor,
  signal?: AbortSignal,
) {
  return getFilesClient().createObjectUrl(conversationId, storage, signal);
}

export function deleteConversationFile(
  conversationId: ConversationId,
  storage: R2StorageDescriptor,
) {
  return getFilesClient().deleteFile(conversationId, storage);
}
