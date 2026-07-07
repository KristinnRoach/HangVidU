import { Show, createEffect, on } from 'solid-js';
import { useI18n } from '../../../shared/i18n';
import { LoadBoundary } from '../../../components/app/LoadBoundary';
// eslint-disable-next-line no-unused-vars -- consumed by the Solid `use:fileDrop` directive
import { fileDrop } from '@shared/utils/ui-utils/fileDrop/onFileDrop.solid.js';
import {
  getConversationState,
  markActiveConversationRead,
  sendFileMessage,
} from '../../../stores/selectedConversationStore';
import { MessageList } from './MessageList';
import { Composer } from './Composer';
import styles from './ConversationPanel.module.css';

function MessageHistorySkeleton() {
  return (
    <div
      class={`${styles.messages} ${styles.messageSkeleton}`}
      aria-busy="true"
      aria-label="Loading message history"
    >
      <div class={`${styles.skeletonBubble} ${styles.skeletonIncoming}`} />
      <div class={`${styles.skeletonBubble} ${styles.skeletonOwn}`} />
      <div class={`${styles.skeletonBubble} ${styles.skeletonIncoming}`} />
      <div class={`${styles.skeletonBubble} ${styles.skeletonOwn}`} />
    </div>
  );
}

type ConversationPanelProps = {
  /**
   * Whether the messaging view is the one on screen. The panel stays mounted
   * (and watching) when nav switches away, so this gates marking-read: an
   * incoming message must not clear the unread badge while you're looking at
   * the contacts list.
   */
  visible: boolean;
};

/**
 * View-only shell for the active conversation: state lives in
 * stores/selectedConversationStore; this composes MessageList + Composer and owns the
 * cross-cutting view concerns (file-drop target, alerts, read-marking).
 */
export default function ConversationPanel(props: ConversationPanelProps) {
  const state = getConversationState();
  const { t } = useI18n();

  let inputEl: HTMLTextAreaElement | undefined;

  // Tracks the store's read candidate through the call, so this re-runs as
  // new messages land — but only marks read while this view is on screen.
  createEffect(() => {
    if (!props.visible) return;
    markActiveConversationRead();
  });

  // Focus the composer once a conversation's history first loads.
  createEffect(
    on(
      () => state.history,
      (status, prev) => {
        if (status === 'ready' && prev === 'loading') {
          queueMicrotask(() => inputEl?.focus());
        }
      },
    ),
  );

  // Option A: fan out a multi-file drop into one message per file. Sequential
  // so optimistic messages stay ordered and the shared sending/preparing
  // guards in sendFileMessage don't trip each other. The text draft becomes a
  // caption on the first message only (send clears it), matching the
  // single-file behavior.
  // TODO: switch to a single message carrying a MessageAttachment[] (Option B).
  async function submitFiles(files: File[]) {
    for (const file of files) {
      const result = await sendFileMessage(file);
      if (result === 'empty-file') window.alert(t('conversation.file_empty'));
      else if (result === 'too-large')
        window.alert(t('conversation.file_too_large'));
      else if (result === 'failed')
        window.alert(t('conversation.file_send_failed'));
      inputEl?.focus();
    }
  }

  return (
    <div
      class={styles.panel}
      use:fileDrop={{
        onDrop: (files) => void submitFiles(files),
      }}
    >
      <Show
        when={state.conversationId}
        fallback={
          <div class={styles.conversationNotFound}>
            {t('conversation.not_found')}
          </div>
        }
      >
        <LoadBoundary
          loading={state.history === 'loading'}
          fallback={<MessageHistorySkeleton />}
          error={state.historyError}
          errorFallback={
            <div class={styles.messagesEmpty}>
              {t('conversation.load_error')}
            </div>
          }
        >
          <Show
            when={state.messages.length > 0}
            fallback={
              <div class={styles.messagesEmpty}>{t('conversation.empty')}</div>
            }
          >
            <MessageList />
          </Show>
        </LoadBoundary>

        <Composer
          onFiles={(files) => void submitFiles(files)}
          inputRef={(el) => (inputEl = el)}
        />
      </Show>
    </div>
  );
}
