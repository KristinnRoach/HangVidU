import { createConversationFileObjectUrl } from '@stores/files-store';
import {
  IMAGE_COMPRESSION_THRESHOLD_BYTES,
  isImageAttachment,
  isR2FileAttachment,
} from '@stores/conversation/attachments';
import { RECENT_MESSAGES_WINDOW } from '@stores/conversation/message-ordering';
import type {
  ConversationId,
  MessageAttachment,
} from '@stores/conversation/types';

export function attachmentPreviewKey(
  conversationId: ConversationId,
  storage: MessageAttachment['storage'],
) {
  return JSON.stringify([
    conversationId,
    storage.provider,
    storage.bucket,
    storage.key,
  ]);
}

type Preview = {
  conversationId: ConversationId;
  storage: MessageAttachment['storage'];
  controller: AbortController;
  started: boolean;
  url?: string;
};

/** One component's shared previews; ownership ends at eviction or unmount. */
export function createAttachmentPreviews(
  onChange: (urls: Record<string, string>) => void,
) {
  const entries = new Map<string, Preview>();
  let active = 0;
  let disposed = false;
  const notify = () =>
    onChange(
      Object.fromEntries(
        [...entries].flatMap(([key, entry]) =>
          entry.url ? [[key, entry.url]] : [],
        ),
      ),
    );

  function pump() {
    if (disposed) return;
    for (const [key, entry] of entries) {
      if (active >= 3) break;
      if (entry.started) continue;
      entry.started = true;
      active++;
      void createConversationFileObjectUrl(
        entry.conversationId,
        entry.storage,
        entry.controller.signal,
        IMAGE_COMPRESSION_THRESHOLD_BYTES,
      )
        .then((url) => {
          if (
            disposed ||
            entry.controller.signal.aborted ||
            entries.get(key) !== entry
          ) {
            URL.revokeObjectURL(url);
            return;
          }
          entry.url = url;
          notify();
        })
        .catch((error) => {
          if (!entry.controller.signal.aborted) {
            console.warn('[conversation] failed to load R2 preview', error);
          }
        })
        .finally(() => {
          active--;
          pump();
        });
    }
  }

  return {
    update(
      conversationId: ConversationId | null,
      attachments: MessageAttachment[],
    ) {
      if (disposed) return;
      const needed = new Map<string, MessageAttachment>();
      // Prefer newer messages. The count and per-preview byte limits also cover
      // local failed sends that intentionally outlive the recent message window.
      if (conversationId)
        for (const attachment of [...attachments].reverse()) {
          if (
            !isR2FileAttachment(attachment) ||
            !isImageAttachment(attachment) ||
            !Number.isFinite(attachment.fileSize) ||
            attachment.fileSize <= 0 ||
            attachment.fileSize > IMAGE_COMPRESSION_THRESHOLD_BYTES
          )
            continue;
          needed.set(
            attachmentPreviewKey(conversationId, attachment.storage),
            attachment,
          );
          if (needed.size >= RECENT_MESSAGES_WINDOW) break;
        }
      for (const [key, entry] of entries) {
        if (needed.has(key)) continue;
        entry.controller.abort();
        if (entry.url) URL.revokeObjectURL(entry.url);
        entries.delete(key);
      }
      for (const [key, attachment] of needed) {
        if (entries.has(key)) continue;
        entries.set(key, {
          conversationId: conversationId!,
          storage: attachment.storage,
          controller: new AbortController(),
          started: false,
        });
      }
      notify();
      pump();
    },
    dispose() {
      disposed = true;
      for (const entry of entries.values()) {
        entry.controller.abort();
        if (entry.url) URL.revokeObjectURL(entry.url);
      }
      entries.clear();
    },
  };
}
