import { getLoggedInUserToken } from '../auth/index.js';
import { getFirebaseAppCheckToken } from '../infra/firebase.js';
import {
  createFilesClient,
  type R2StorageDescriptor,
} from '../storage/files/index.js';
import type { ConversationId } from '../features/messaging-next/types.js';

const DEFAULT_FILES_URL = 'http://localhost:8789';

function getFilesBaseUrl() {
  const configuredUrl = import.meta.env.VITE_FILES_URL?.trim();
  if (configuredUrl) return configuredUrl;
  if (import.meta.env.DEV) return DEFAULT_FILES_URL;
  throw new Error('VITE_FILES_URL is required for the files Worker');
}

const filesClient = createFilesClient({
  baseUrl: getFilesBaseUrl(),
  getToken: getLoggedInUserToken,
  getAppCheckToken: getFirebaseAppCheckToken,
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
