import { getLoggedInUserToken } from '../auth/index.js';
import {
  createFilesClient,
  type R2StorageDescriptor,
} from '../storage/files/index.js';
import type { ConversationId } from '../features/messaging-next/types.js';

const DEFAULT_FILES_URL = 'http://localhost:8789';

function getFilesBaseUrl() {
  return (import.meta.env.VITE_FILES_URL ?? DEFAULT_FILES_URL).trim();
}

const filesClient = createFilesClient({
  baseUrl: getFilesBaseUrl(),
  getToken: getLoggedInUserToken,
});

export function uploadConversationImage(
  conversationId: ConversationId,
  file: File,
) {
  return filesClient.uploadImage(conversationId, file);
}

export function createConversationFileObjectUrl(
  conversationId: ConversationId,
  storage: R2StorageDescriptor,
  signal?: AbortSignal,
) {
  return filesClient.createObjectUrl(conversationId, storage, signal);
}

export function deleteConversationFile(
  conversationId: ConversationId,
  storage: R2StorageDescriptor,
) {
  return filesClient.deleteFile(conversationId, storage);
}
