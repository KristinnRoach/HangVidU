import { Show, onMount } from 'solid-js';
import { dispatchCommand } from '../../../shared/events/index.js';
import { useI18n } from '../../../shared/i18n/index.js';
import PresenceIndicator from '../../presence/components/PresenceIndicator';
import { StartCallButton } from '../../call/components/CallControls';
import { openDirectConversation } from '../../../stores/selectedConversationStore';

const MAX_CONTACT_NAME_CHARS = 18;

function shortName(name) {
  if (!name) return '';
  return name.length > MAX_CONTACT_NAME_CHARS
    ? name.slice(0, MAX_CONTACT_NAME_CHARS - 2) + '..'
    : name;
}

/**
 * One contact row. Reads props from a reactive store row and delegates
 * conversation selection to its parent. Owns no business logic.
 *
 * Props (reactive; read via `props.x` not destructuring to preserve reactivity):
 *   id: string
 *   name: string|null
 *   conversationId: string|null
 *   hasUnread: boolean
 */
export default function ContactEntry(props) {
  const { t } = useI18n();
  let rootEl;

  const displayName = () => props.name || t('call.unknown_caller');
  const editLabel = () => t('contact.action.edit');

  const onOpenConversation = () => {
    if (!props.id) return;
    // The DM conversation id is resolved from the contact id (opaque for d1,
    // derived for rtdb) inside the store — see openDirectConversation.
    void openDirectConversation(props.id, {
      displayUI: true,
      contactNickName: displayName(),
    });
  };

  const onEdit = () => {
    if (!props.id) return;
    dispatchCommand('cmd:dialog:contact-edit:open', {
      contactId: props.id,
      currentName: props.name ?? '',
    });
  };

  return (
    <div class='contact-entry' ref={rootEl}>
      {/* 
      // TODO: fix audio only call UX before uncommenting
      <StartCallButton
        calleeId={props.id}
        calleeName={displayName()}
        audioOnly={true}
      /> */}

      <StartCallButton
        calleeId={props.id}
        calleeName={displayName()}
        audioOnly={false}
      />
      <button
        type='button'
        class='contact-name'
        data-contact-id={props.id}
        onClick={onOpenConversation}
        aria-label={displayName()}
      >
        {shortName(displayName())}
      </button>
      <Show when={props.hasUnread}>
        <span
          class='unread-badge'
          aria-live='polite'
          aria-atomic='true'
          role='status'
          aria-label={t('contact.unread')}
        >
          <span aria-hidden='true'>•</span>
        </span>
      </Show>
      <PresenceIndicator userId={props.id} />
      {/* <button
        class='contact-edit-btn'
        type='button'
        onClick={onEdit}
        title={editLabel()}
        aria-label={editLabel()}
      >
        ⋮
      </button> */}
    </div>
  );
}
