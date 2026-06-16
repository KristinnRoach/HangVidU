import { getLoggedInUserToken } from '../auth/index.js';
import { getFirebaseAppCheckToken } from '../infra/firebase.js';
import {
  createFilesClient,
  type R2StorageDescriptor,
} from '../storage/files/index.js';
import type { ConversationId } from '../features/messaging-next/types.js';

const DEFAULT_FILES_URL = 'http://localhost:8789';

function getFilesBaseUrl(): string | null {
  try {
    const configuredUrl = import.meta.env.VITE_FILES_URL?.trim();
    if (configuredUrl) return configuredUrl;
    if (import.meta.env.DEV) return DEFAULT_FILES_URL;
    return null;
  } catch {
    return null;
  }
}

let filesClientCache: ReturnType<typeof createFilesClient> | null | undefined;

function getFilesClient() {
  if (filesClientCache !== undefined) return filesClientCache;

  try {
    const baseUrl = getFilesBaseUrl();
    if (!baseUrl) {
      filesClientCache = null;
      return null;
    }

    filesClientCache = createFilesClient({
      baseUrl,
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
