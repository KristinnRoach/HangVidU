import { Show, onMount } from 'solid-js';
import { dispatchCommand } from '../../shared/events/index.js';
import { useI18n } from '../../shared/i18n/index.js';
import { initIcons } from '../../components/base-legacy/icons.js';
import PresenceIndicator from './presence/PresenceIndicator.jsx';
import StartCallButton from '../../features/call/components/StartCallButton.jsx';

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
 *   roomId: string|null
 *   conversationId: string|null
 *   unreadCount: number
 *   onOpenConversation?: (selection: object) => void
 */
export default function ContactEntry(props) {
  const { t } = useI18n();
  let rootEl;

  onMount(() => initIcons(rootEl));

  const displayName = () => props.name || t('contact.no_name');
  const callLabel = () => t('contact.action.call', { name: displayName() });
  const editLabel = () => t('contact.action.edit');

  const onOpenConversation = () => {
    if (!props.id) return;
    if (!props.conversationId) {
      console.warn('[app] No conversation id for contact', {
        contactId: props.id,
      });
      return;
    }
    props.onOpenConversation?.({
      conversationId: props.conversationId,
      remoteParticipantIds: [props.id],
      displayUI: true,
      contactNickName: displayName(),
    });
  };

  const onEdit = () => {
    if (!props.id) return;
    dispatchCommand('cmd:dialog:contact-edit:open', {
      contactId: props.id,
      currentName: props.name ?? '',
      roomId: props.roomId,
    });
  };

  return (
    <div class='contact-entry' ref={rootEl}>
      <StartCallButton
        contactId={props.id}
        calleeName={displayName()}
        // roomId={props.roomId}
        title={callLabel()}
      />

      <PresenceIndicator userId={props.id} />

      <button
        type='button'
        class='contact-name'
        data-contact-id={props.id}
        onClick={onOpenConversation}
        aria-label={displayName()}
      >
        {shortName(displayName())}
      </button>

      <Show when={props.unreadCount > 0}>
        <span class='unread-badge' aria-live='polite' aria-atomic='true'>
          {props.unreadCount > 99 ? '99+' : props.unreadCount}
        </span>
      </Show>

      <button
        class='contact-edit-btn'
        type='button'
        onClick={onEdit}
        title={editLabel()}
        aria-label={editLabel()}
      >
        ⋮
      </button>
    </div>
  );
}
