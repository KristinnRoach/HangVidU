import { onCleanup } from 'solid-js';
import { Paperclip } from 'lucide-solid';
import { useI18n } from '../../../shared/i18n';
import { isIOSOrAndroidDevice } from '@lib/utils/detect-device.js';
import { keepVirtualKeyboardOpenOnTap } from '@shared/utils/ui-utils/keepVirtualKeyboardOpenOnTap.js';
import {
  getConversationState,
  sendMessage,
  setConversationDraft,
} from '../../../stores/conversationStore';
import styles from './ConversationPanel.module.css';

type ComposerProps = {
  onFiles: (files: File[]) => void;
  /** Exposes the draft textarea so the panel can refocus it after file sends. */
  inputRef?: (el: HTMLTextAreaElement) => void;
};

/** The draft textarea + attach/send controls for the active conversation. */
export function Composer(props: ComposerProps) {
  const state = getConversationState();
  const { t } = useI18n();

  let inputTextAreaEl: HTMLTextAreaElement | undefined;
  let fileInputEl: HTMLInputElement | undefined;
  let sendButtonCleanup: (() => void) | undefined;

  const busy = () => state.sending || state.preparingFile;

  function attachSendButton(el: HTMLButtonElement) {
    sendButtonCleanup?.();
    sendButtonCleanup = isIOSOrAndroidDevice()
      ? keepVirtualKeyboardOpenOnTap(el, (event) => {
          event.preventDefault();
          el.form?.requestSubmit();
        })
      : undefined;
  }

  onCleanup(() => sendButtonCleanup?.());

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (busy()) return;

    void sendMessage();
    // Defensive refocus within the tap gesture so the iOS virtual keyboard
    // stays open across sends even if something downstream steals focus.
    inputTextAreaEl?.focus();
  }

  function onFileInput(e: Event & { currentTarget: HTMLInputElement }) {
    const file = e.currentTarget.files?.[0];
    e.currentTarget.value = '';
    if (file) props.onFiles([file]);
  }

  function onDraftKeyDown(
    e: KeyboardEvent & { currentTarget: HTMLTextAreaElement },
  ) {
    if (
      e.isComposing ||
      e.key !== 'Enter' ||
      e.shiftKey ||
      isIOSOrAndroidDevice()
    )
      return;

    e.preventDefault();
    if (busy()) return;

    e.currentTarget.form?.requestSubmit();
  }

  return (
    <form class={styles.form} onSubmit={onSubmit}>
      <input
        title={t('conversation.attach_file')}
        ref={fileInputEl}
        class={styles.fileInput}
        type="file"
        onChange={onFileInput}
      />
      <button
        class={styles.attach}
        type="button"
        aria-label={t('conversation.attach_file')}
        title={t('conversation.attach_file')}
        disabled={busy()}
        onClick={() => fileInputEl?.click()}
      >
        <Paperclip size={20} aria-hidden="true" />
      </button>
      <textarea
        autofocus
        aria-label={t('message_input.placeholder')}
        ref={(el) => {
          inputTextAreaEl = el;
          props.inputRef?.(el);
        }}
        class={styles.growableTextArea}
        placeholder={t('message_input.placeholder')}
        value={state.draft}
        onInput={(e) => setConversationDraft(e.currentTarget.value)}
        onKeyDown={onDraftKeyDown}
      />
      <button
        ref={attachSendButton}
        class={styles.send}
        type="submit"
        disabled={!state.draft.trim() || busy()}
      >
        {t('conversation.send')}
      </button>
    </form>
  );
}
