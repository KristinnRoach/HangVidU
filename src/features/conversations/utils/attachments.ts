// Pure attachment helpers for the conversation view: type predicates, display
// name/size formatting, and best-effort image dimension reads.

import type { MessageAttachment } from '../interfaces.js';

export const MAX_R2_FILE_UPLOAD_BYTES = 5 * 1024 * 1024;
export const IMAGE_COMPRESSION_THRESHOLD_BYTES = Math.round(1.5 * 1024 * 1024);
const DISPLAY_ATTACHMENT_FILE_NAME_LENGTH = 24;

export function isImageAttachment(attachment: MessageAttachment) {
  return attachment.mimeType.trim().toLowerCase().startsWith('image/');
}

export function isR2FileAttachment(attachment: MessageAttachment) {
  return attachment.storage.provider === 'r2';
}

export function isImageFile(file: File) {
  return file.type.trim().toLowerCase().startsWith('image/');
}

// Strip control chars and path separators for a safe optimistic display +
// download name. Length is the worker's concern (it truncates authoritatively).
export function attachmentFileName(file: File) {
  return file.name.replace(/[\x00-\x1f\x7f/\\]/g, '_').trim() || 'attachment';
}

export function displayAttachmentFileName(fileName: string) {
  if (fileName.length <= DISPLAY_ATTACHMENT_FILE_NAME_LENGTH) return fileName;

  const extension = shortFileExtension(fileName);
  const stemLength = DISPLAY_ATTACHMENT_FILE_NAME_LENGTH - extension.length - 3;
  return `${fileName.slice(0, Math.max(1, stemLength))}...${extension}`;
}

function shortFileExtension(fileName: string) {
  const extensionStart = fileName.lastIndexOf('.');
  return extensionStart > 0 && fileName.length - extensionStart <= 16
    ? fileName.slice(extensionStart)
    : '';
}

/**
 * Natural pixel dimensions of an image file, captured at send so the receiver's
 * renderer can reserve layout space before the image loads. Best-effort —
 * resolves undefined on decode failure rather than blocking the send.
 */
export async function readImageDimensions(
  file: File,
): Promise<{ width: number; height: number } | undefined> {
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    bitmap.close();
    return width > 0 && height > 0 ? { width, height } : undefined;
  } catch {
    return undefined;
  }
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
