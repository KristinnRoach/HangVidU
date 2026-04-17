import { Show, onMount } from 'solid-js';
import { dispatchCommand } from '../../shared/events/index.js';
import { t } from '../../shared/i18n/index.js';
import { initIcons } from '../../shared/components/ui/icons.js';
import PresenceIndicator from './PresenceIndicator.jsx';

const MAX_CONTACT_NAME_CHARS = 18;

function shortName(name) {
  if (!name) return '';
  return name.length > MAX_CONTACT_NAME_CHARS
    ? name.slice(0, MAX_CONTACT_NAME_CHARS - 2) + '..'
    : name;
}

/**
 * One contact row. Reads props from a reactive store row; dispatches commands
 * on interaction. Owns no business logic.
 *
 * Props (reactive; read via `props.x` not destructuring to preserve reactivity):
 *   id: string
 *   name: string|null
 *   roomId: string|null
 *   conversationId: string|null
 *   unreadCount: number
 */
export default function ContactEntry(props) {
  let rootEl;

  onMount(() => initIcons(rootEl));

  const displayName = () => props.name || t('contact.no_name');

  const onCall = () => {
    if (!props.roomId && !props.id) return;
    dispatchCommand('cmd:call:outgoing:initiate', {
      contactId: props.id,
      contactNickName: displayName(),
      conversationId: props.conversationId,
      roomId: props.roomId,
    });
  };

  const onOpenConversation = () => {
    if (!props.id) return;
    if (!props.conversationId) {
      console.warn('[app] No conversation id for contact', {
        contactId: props.id,
      });
      return;
    }
    dispatchCommand('cmd:messaging:conversation:select', {
      conversationId: props.conversationId,
      remoteParticipantIds: [props.id],
      displayUI: true,
      contactNickName: displayName(),
    });
  };

  const onEdit = () => {
    if (!props.id) return;
    dispatchCommand('cmd:contacts:contact:edit', { contactId: props.id });
  };

  return (
    <div class="contact-entry" ref={rootEl}>
      <button
        class="contact-call-btn"
        onClick={onCall}
        title={t('contact.action.call', { name: displayName() })}
      >
        <i data-lucide="phone" fill="currentColor" stroke-width="0" />
      </button>

      <PresenceIndicator userId={props.id} />

      <span
        class="contact-name"
        data-contact-id={props.id}
        onClick={onOpenConversation}
      >
        {shortName(displayName())}
      </span>

      <Show when={props.unreadCount > 0}>
        <span class="unread-badge" aria-live="polite" aria-atomic="true">
          {props.unreadCount > 99 ? '99+' : props.unreadCount}
        </span>
      </Show>

      <button
        class="contact-edit-btn"
        onClick={onEdit}
        title={t('contact.action.edit')}
      >
        ⋮
      </button>
    </div>
  );
}
