import { t } from '../../../i18n/index.js';
import { initIcons } from '../../icons.js';
import { onClickOutside } from '../../utils/clickOutside.js';
import { hideElement, isHidden, showElement } from '../../utils/ui-utils.js';
import { renderAvatar } from '../../utils/avatar.js';
import { createMessageToggle } from './createMessageToggle.js';
import { isMobileDevice } from '../../../utils/env/isMobileDevice.js';
import { createWatchFileHandler } from '../../../watch/watch-file-handler.js';

import { linkifyToFragment } from '../../../utils/linkify.js';
import {
  ReactionManager,
  ReactionUI,
} from '../../../messaging/reactions/index.js';
import { REACTION_CONFIG } from '../../../messaging/reactions/ReactionConfig.js';
import { getUserId, getIsLoggedIn } from '../../../auth/auth-state.js';
import { messagingController } from '../../../messaging/messaging-controller.js';
import { contactsController } from '../../../contacts/contacts-controller.js';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../utils/toast.js';
import { createMessageBox } from './createMessageBox.js';
import { createMessageTopBar } from './createMessageTopBar.js';
import { devDebug } from '../../../utils/dev/dev-utils.js';
import { showImagePreview } from '../modal/imagePreview.js';
import { onTapGesture } from '../../utils/detectDoubleClick.js';
import { escapeHtml } from '../../component-system/dom-utils.js';

// const MAX_MESSAGE_LENGTH = 3000; // Max characters allowed in a message

const supportsCssAnchors =
  CSS.supports?.('position-anchor: --msg-toggle') &&
  CSS.supports?.('right: anchor(right)') &&
  CSS.supports?.('bottom: anchor(top)');

function isOnScreen(el) {
  const r = el.getBoundingClientRect();
  return (
    r.top >= 0 &&
    r.left >= 0 &&
    r.bottom <= window.innerHeight &&
    r.right <= window.innerWidth
  );
}

function refreshRemoteAvatars(container, { name, photoURL }) {
  if (!container) return;
  const avatars = container.querySelectorAll(
    '.message-entry.remote .sender-avatar:not(.sender-avatar--me)',
  );
  avatars.forEach((avatar) => renderAvatar(avatar, { name, photoURL }));
}

/**
 * Creates the messages UI component with chat functionality
 * Designed to be a singleton - one instance that displays the active session
 * @returns {Object} API with methods to control messages UI
 */
export function initMessagesUI() {
  let repositionHandlersAttached = false;
  let currentConversationId = null; // Track the currently displayed conversation
  let conversationMetadata = {}; // Store conversation metadata locally: { contactId, contactName, contactProfile, contactPhotoURL }
  let fileTransferController = null; // FileTransferController instance set by setFileTransferController()
  let inActiveCall = false; // Track if we're currently in an active call
  let isReceivingFile = false; // Track if currently receiving a file
  let markAsReadTimeout = null; // Debounce markAsRead calls on incoming messages

  const MARK_AS_READ_DEBOUNCE_MS = 100;

  const reactionManager = new ReactionManager();
  const reactionUI = new ReactionUI(reactionManager);
  const ac = new AbortController();
  let watchFileHandler; // Initialized after DOM guards pass

  const shouldShowAttachButton = () =>
    !!fileTransferController || !!currentConversationId; // removed getIsLoggedIn()

  const refreshAttachButton = () => {
    if (shouldShowAttachButton()) {
      showElement(attachBtn);
    } else {
      hideElement(attachBtn);
    }
  };

  const topRightMenu =
    document.querySelector('.top-bar .top-right-menu') ||
    document.querySelector('.top-right-menu');

  const messageToggle = createMessageToggle({
    parent: topRightMenu,
    onToggle: () => toggleMessagesUIVisible(),
    icon: '💬',
    initialUnreadCount: 0,
    id: 'main-messages-toggle-btn', // ID needed for CSS anchor positioning
    startHidden: false,
  });

  if (!messageToggle) {
    console.error(
      'Messages UI: failed to initialize message toggle; aborting messages UI initialization.',
    );
    return null;
  }

  // Use the component element directly as the toggle button/container
  const messagesToggleEl = messageToggle.element;

  // Create the messages box
  const {
    messagesBoxContainer,
    messagesBox,
    messagesMessages,
    messagesForm,
    messagesInput,
    resetInputHeight,
  } = createMessageBox();

  const messageTopBar = createMessageTopBar();

  if (
    !messagesToggleEl ||
    !messagesBox ||
    !messagesMessages ||
    !messagesForm ||
    !messagesInput
  ) {
    console.error('Messages UI elements not found.');
    return null;
  }

  // Initialize watchFileHandler after DOM guards pass (messagesMessages is now safe to use)
  watchFileHandler = createWatchFileHandler();

  // Listen for incoming watch-together requests from remote peer (sender side)
  document.addEventListener('watch:file-request', onWatchFileRequest);

  if (messageTopBar?.element) {
    messagesBox.prepend(messageTopBar.element);

    messageTopBar.setBackHandler(() => closeMessagesUI());

    messageTopBar.setCallHandler(() => {
      messagesBox.dispatchEvent(
        new CustomEvent('contact:call', {
          bubbles: true,
          detail: {
            contactId: conversationMetadata.contactId || null,
            contactName: conversationMetadata.contactName || null,
          },
        }),
      );
    });
  }

  // Get file input elements after messageBox is created
  const attachBtn = document.getElementById('attach-file-btn');
  const fileInput = document.getElementById('file-input');
  const sendBtn = messagesForm.querySelector('button[type="submit"]');

  // Helpers to read/update the send button label without touching the icon
  const getSendLabelEl = () => sendBtn?.querySelector?.('.send-button__label');
  const getSendLabelText = () =>
    (getSendLabelEl() && getSendLabelEl().textContent) ||
    (sendBtn && sendBtn.textContent) ||
    '';
  const setSendLabelText = (txt) => {
    const el = getSendLabelEl();
    if (el) el.textContent = txt;
    else if (sendBtn) sendBtn.textContent = txt;
    // keep aria-label in sync for screen readers
    if (sendBtn) sendBtn.setAttribute('aria-label', txt || t('shared.send'));
  };
  // Note: label is empty by default (icon-only). aria-label kept in sync by setSendLabelText.

  // Attach button opens file picker
  attachBtn.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle file selection for sending
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const originalText = getSendLabelText();
    setSendLabelText(t('message.sending'));

    try {
      if (inActiveCall) {
        // In an active call — must use fileTransferController
        if (!fileTransferController) {
          // Data channel is still connecting, wait briefly for it
          console.warn(
            '[MessagesUI] FileTransferController not ready, waiting...',
          );
          for (let i = 0; i < 20; i++) {
            await new Promise((r) => setTimeout(r, 50));
            if (fileTransferController) break;
          }
        }

        if (!fileTransferController) {
          throw new Error(
            'File transfer not ready. Please wait for call to fully connect.',
          );
        }

        // WebRTC DataChannel transfer (active call, large files OK)
        await fileTransferController.sendFile(file, (progress) => {
          setSendLabelText(`${Math.round(progress * 100)}%`);
        });

        const sentVideo = watchFileHandler.trackSentFile(file);

        if (sentVideo) {
          appendEphemeralActionMessage({
            text: t('message.sent'),
            downloadUrl: sentVideo.downloadUrl,
            downloadName: sentVideo.name,
          });
        } else {
          appendEphemeralMessage({
            content: { text: `📎 ${t('message.sent')}` },
          });
        }
      } else if (currentConversationId) {
        // Persistent file message (no active call, small files only)
        const message = await messagingController.sendFile(
          currentConversationId,
          file,
        );
        renderMessage(message);
      } else {
        console.warn(
          '[MessagesUI] No file transport or conversation available',
        );
      }
    } catch (err) {
      console.error('[MessagesUI] File send failed:', err);

      const sizeHint = inActiveCall
        ? ''
        : '\n\n' + t('message.file_size_limited');

      appendEphemeralMessage({
        content: {
          text: '❌  ' + t('message.send_failed') + sizeHint,
        },
      });
    } finally {
      setSendLabelText(originalText);
      fileInput.value = '';
    }
  });

  // Position the messages box relative to toggle
  function positionMessagesBox() {
    if (
      !messagesToggleEl ||
      !messagesBox ||
      messagesBox.classList.contains('hidden')
    )
      return;

    const btnRect = messagesToggleEl.getBoundingClientRect();
    const boxRect = messagesBox.getBoundingClientRect();

    // Prefer above the button; flip below if not enough space
    const gap = 8;
    let top = btnRect.top - boxRect.height - gap;
    if (top < 8) top = btnRect.bottom + gap;

    // Center horizontally over the toggle; clamp to viewport
    let left = btnRect.left + btnRect.width / 2 - boxRect.width / 2;
    const maxLeft = window.innerWidth - boxRect.width - 8;
    if (left < 8) left = 8;
    if (left > maxLeft) left = maxLeft;

    messagesBox.style.top = `${Math.round(top)}px`;
    messagesBox.style.left = `${Math.round(left)}px`;
  }

  // Helpers to animate open/close while keeping `.hidden` in sync
  function openMessagesBox() {
    // Make element available for layout first
    if (messagesBox.classList.contains('hidden'))
      messagesBox.classList.remove('hidden');

    // Position before animating
    if (!supportsCssAnchors) {
      positionMessagesBox();
      attachRepositionHandlers();
    } else {
      requestAnimationFrame(() => {
        if (!isOnScreen(messagesBox)) {
          positionMessagesBox();
          attachRepositionHandlers();
        }
      });
    }

    // Trigger CSS transition
    requestAnimationFrame(() => {
      messagesBox.classList.add('messages-box--open');
    });
  }

  function closeMessagesBox() {
    // Start closing animation
    messagesBox.classList.remove('messages-box--open');

    // After transition completes, add hidden to keep legacy utilities working
    const onDone = (e) => {
      if (e && e.target !== messagesBox) return;
      messagesBox.classList.add('hidden');
      messagesBox.removeEventListener('transitionend', onDone);
    };

    // Listen for transitionend, but fallback to timeout in case it doesn't fire
    messagesBox.addEventListener('transitionend', onDone);
    // Fallback: ensure hidden after 350ms
    setTimeout(() => {
      if (!messagesBox.classList.contains('hidden')) {
        messagesBox.classList.add('hidden');
        messagesBox.removeEventListener('transitionend', onDone);
      }
    }, 350);
  }

  function attachRepositionHandlers() {
    if (repositionHandlersAttached) return;
    repositionHandlersAttached = true;
    window.addEventListener('resize', positionMessagesBox, { passive: true });
    window.addEventListener('scroll', positionMessagesBox, { passive: true });
    window.addEventListener('orientationchange', positionMessagesBox, {
      passive: true,
    });
  }

  function detachRepositionHandlers() {
    if (!repositionHandlersAttached) return;
    repositionHandlersAttached = false;
    window.removeEventListener('resize', positionMessagesBox);
    window.removeEventListener('scroll', positionMessagesBox);
    window.removeEventListener('orientationchange', positionMessagesBox);
  }

  // Will hold the cleanup function returned by onClickOutside()
  let removeMessagesBoxClickOutside = null;

  // Clear unread count when messages box is shown
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (!messagesBox.classList.contains('hidden')) {
          messageToggle.clearBadge();
        }
      }
    });
  });

  observer.observe(messagesBox, { attributes: true });

  function isMessagesUIOpen() {
    return !messagesBox.classList.contains('hidden');
  }

  function isMessageInputFocused() {
    return document.activeElement === messagesInput;
  }

  function focusMessageInput() {
    if (!isMessageInputFocused()) messagesInput.focus();
  }

  function unfocusMessageInput() {
    if (isMessageInputFocused()) messagesInput.blur();
  }

  /**
   * Close the messages UI panel.
   * No-op if already closed.
   * Cleans up event listeners and resets positioning.
   */
  function closeMessagesUI() {
    if (!isMessagesUIOpen()) return;

    // Only blur if actually focused (avoids mobile keyboard issues)
    if (document.activeElement === messagesInput) messagesInput.blur();
    detachRepositionHandlers();

    // Clear inline offsets
    messagesBox.style.top = '';
    messagesBox.style.left = '';
    messagesBox.style.bottom = '';
    messagesBox.style.right = '';

    // Clean up outside click handler
    if (removeMessagesBoxClickOutside) {
      removeMessagesBoxClickOutside();
      removeMessagesBoxClickOutside = null;
    }

    closeMessagesBox();
  }

  /**
   * Open the messages UI panel.
   * No-op if already open.
   * Marks conversation as read and sets up click-outside handler.
   */
  function openMessagesUI() {
    if (isMessagesUIOpen()) return;

    if (!currentConversationId) {
      console.warn('[MessagesUI] No active conversation to display');
      return;
    }

    openMessagesBox();
    scrollMessagesToEnd();

    // Only auto-focus on desktop; let mobile users tap to focus naturally
    if (!isMobileDevice()) messagesInput.focus();

    messagingController.markAsRead(currentConversationId).catch((err) => {
      console.warn('Failed to mark messages as read:', err);
    });

    // Set up outside click handler

    // ignore clicks that select conversations (class="contact-entry") + msg toggle + reactions picker
    removeMessagesBoxClickOutside = onClickOutside(
      messagesBox,
      () => closeMessagesUI(),
      {
        ignore: () => {
          const contactEntries = document.querySelectorAll('.contact-entry');
          const ignoreClickElementsArray = Array.from(contactEntries);
          ignoreClickElementsArray.push(messageToggle.element);
          if (reactionUI.activePicker) {
            ignoreClickElementsArray.push(reactionUI.activePicker);
          }
          return ignoreClickElementsArray;
        },
        esc: true,
        ignoreInputBlur: isMobileDevice(), // Prevent accidental closes when dismissing keyboard on mobile
      },
    );
  }

  /**
   * Toggle the messages UI panel open/closed.
   * Used by the message toggle button and keyboard shortcut.
   */
  function toggleMessagesUIVisible() {
    if (isMessagesUIOpen()) {
      closeMessagesUI();
    } else {
      openMessagesUI();
    }
  }

  function showMessagesToggle() {
    showElement(messageToggle.element);
  }

  function hideMessagesToggle() {
    hideElement(messageToggle.element);
  }

  // --- Helpers ---

  /**
   * Handle a reaction change (double-tap or picker) on a message
   */
  async function handleReactionChange(
    reactionType,
    messageElement,
    msgId,
    source,
  ) {
    if (!currentConversationId) {
      console.warn('[MessagesUI] No current conversation for reaction');
      return;
    }

    const userId = getUserId();
    if (!userId) {
      console.warn('[MessagesUI] No userId available for reaction');
      return;
    }

    try {
      const myReactionType = reactionManager.getUserReactionType(msgId, userId);
      let reactions;

      if (source === 'doubleTap') {
        if (myReactionType) {
          await messagingController.removeReaction(
            currentConversationId,
            msgId,
            myReactionType,
          );
          reactions = reactionManager.removeReaction(
            msgId,
            myReactionType,
            userId,
          );
        } else {
          await messagingController.addReaction(
            currentConversationId,
            msgId,
            reactionType,
          );
          reactions = reactionManager.addReaction(msgId, reactionType, userId);
          if (REACTION_CONFIG.enableAnimations) {
            reactionUI.showReactionAnimation(messageElement, reactionType);
          }
        }
      } else if (source === 'picker') {
        if (myReactionType === reactionType) {
          await messagingController.removeReaction(
            currentConversationId,
            msgId,
            reactionType,
          );
          reactions = reactionManager.removeReaction(
            msgId,
            reactionType,
            userId,
          );
        } else {
          if (myReactionType) {
            await messagingController.removeReaction(
              currentConversationId,
              msgId,
              myReactionType,
            );
            reactionManager.removeReaction(msgId, myReactionType, userId);
          }
          await messagingController.addReaction(
            currentConversationId,
            msgId,
            reactionType,
          );
          reactions = reactionManager.addReaction(msgId, reactionType, userId);
          if (REACTION_CONFIG.enableAnimations) {
            reactionUI.showReactionAnimation(messageElement, reactionType);
          }
        }
      }

      reactionUI.renderReactions(messageElement, msgId, reactions);
    } catch (err) {
      console.warn('[MessagesUI] Failed to handle reaction:', err);
    }
  }

  /**
   * Attach reaction support to a message bubble element. No-op if messageId is falsy.
   * @param {HTMLElement} p - The message bubble element (e.g. the `.message-bubble` container)   * @param {string} messageId - Firebase message ID
   * @param {Object} reactions - Initial reactions { type: [userIds] }
   * @param {Object} [opts]
   * @param {Function} [opts.onSingleTap] - Called on single tap (e.g. image preview)
   */
  function attachReactions(p, messageId, reactions, { onSingleTap } = {}) {
    if (!messageId) return;

    p.dataset.messageId = messageId;

    if (reactions && Object.keys(reactions).length > 0) {
      reactionManager.syncFromRemote(messageId, reactions);
      const reactionCounts = reactionManager.getReactions(messageId);
      reactionUI.renderReactions(p, messageId, reactionCounts);
    }

    const gesture = onTapGesture(
      p,
      {
        onSingleTap,
        onDoubleTap: () =>
          handleReactionChange(
            REACTION_CONFIG.defaultReaction,
            p,
            messageId,
            'doubleTap',
          ),
        onLongPress: () =>
          reactionUI.showPicker(p, messageId, handleReactionChange),
      },
      {
        doubleTapDelay: REACTION_CONFIG.doubleTapDelay,
        longPressDelay: REACTION_CONFIG.longPressDelay,
      },
    );

    p._reactionCleanup = () => gesture.destroy();
  }

  /**
   * Create an avatar span for a message.
   * @param {boolean} isLocal - true for local user, false for remote
   */
  function createAvatar(isLocal) {
    const avatarSpan = document.createElement('span');
    avatarSpan.className =
      'sender-avatar' + (isLocal ? ' sender-avatar--me' : '');
    avatarSpan.setAttribute('aria-hidden', 'true');

    if (isLocal) {
      renderAvatar(avatarSpan, { customFallbackText: t('shared.me') });
    } else {
      const contactName =
        conversationMetadata?.contactName ||
        conversationMetadata?.contactProfile?.displayName ||
        'U';
      const photoURL =
        conversationMetadata?.contactPhotoURL ||
        conversationMetadata?.contactProfile?.photoURL ||
        '';
      renderAvatar(avatarSpan, { name: contactName, photoURL });
    }

    return avatarSpan;
  }

  // --- Content builders ---

  function buildTextContent(text) {
    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';
    textSpan.appendChild(linkifyToFragment(text));
    return textSpan;
  }

  /**
   * Build file message content span (RTDB base64 file with thumbnail + download link).
   * @returns {{ element: HTMLElement, onSingleTap?: Function }}
   */
  function buildFileContent(message) {
    const { fileName, mimeType, fileSize, data: dataUrl } = message;

    const textSpan = document.createElement('span');
    textSpan.className = 'message-text file-message';

    const isImage = mimeType && mimeType.startsWith('image/');
    const sizeLabel =
      fileSize < 1024
        ? `${fileSize} B`
        : fileSize < 1024 * 1024
          ? `${(fileSize / 1024).toFixed(1)} KB`
          : `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;

    const isSafeUrl = dataUrl && dataUrl.startsWith('data:');
    let onSingleTap;

    if (isImage && isSafeUrl) {
      const img = document.createElement('img');
      img.src = dataUrl;
      img.alt = fileName;
      img.style.cssText =
        'max-width: 200px; max-height: 200px; border-radius: 8px; cursor: pointer; display: block; margin-bottom: 4px;';
      textSpan.appendChild(img);

      // Open preview on single tap (double-tap handled by reaction system)
      onSingleTap = (e) => {
        if (e.target === img || img.contains(e.target)) {
          showImagePreview(dataUrl, fileName);
        }
      };
    }

    const link = document.createElement('a');
    link.textContent = escapeHtml(fileName);
    if (isSafeUrl) {
      link.href = escapeHtml(dataUrl);
      link.download = fileName;
    }
    link.style.cssText = 'cursor: pointer; text-decoration: underline;';
    textSpan.appendChild(link);

    const sizeSpan = document.createElement('span');
    sizeSpan.textContent = ` (${sizeLabel})`;
    sizeSpan.style.cssText =
      'color: var(--text-secondary, #aaa); font-size: 12px;';
    textSpan.appendChild(sizeSpan);

    return { element: textSpan, onSingleTap };
  }

  /**
   * Build call event content span (missed/rejected call with callback button).
   */
  function buildCallEventContent(message, { onCallBack }) {
    const callEventBubble = document.createElement('span');
    callEventBubble.className = 'message-text call-event-content';

    const details = message.details || {};
    const currentUserId = getUserId();
    const wasInitiatedByMe = details.callerId === currentUserId;

    const callStatusText = document.createElement('span');
    callStatusText.className = 'call-event-text';
    callStatusText.textContent = wasInitiatedByMe
      ? t('call.no_answer')
      : t('call.missed');

    const callBackBtn = document.createElement('button');
    callBackBtn.className = 'call-back-btn';
    callBackBtn.type = 'button';

    const callBackIcon = document.createElement('i');
    callBackIcon.className = 'call-event-icon';
    callBackIcon.setAttribute('data-lucide', 'phone');
    callBackIcon.setAttribute('aria-hidden', 'true');
    callBackBtn.appendChild(callBackIcon);
    callBackBtn.appendChild(
      document.createTextNode(
        wasInitiatedByMe ? t('call.try_again') : t('call.callback'),
      ),
    );

    callBackBtn.addEventListener('click', async () => {
      if (onCallBack) {
        await onCallBack();
      } else {
        try {
          const { callContact } = await import('../../../main.js');
          const contactId = wasInitiatedByMe
            ? conversationMetadata.contactId
            : details.callerId;
          const contactName = wasInitiatedByMe
            ? conversationMetadata.contactName
            : details.callerName;
          if (contactId && contactName) {
            await callContact(contactId, contactName);
          }
        } catch (e) {
          console.warn('[MessagesUI] Failed to initiate call back:', e);
          showInfoToast(t('error.call_failed'));
        }
      }
    });

    callEventBubble.appendChild(callStatusText);
    callEventBubble.appendChild(callBackBtn);

    return callEventBubble;
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: false };
    const dateOptions = { month: 'short', day: 'numeric' };

    return isToday
      ? date.toLocaleTimeString(undefined, timeOptions)
      : `${date.toLocaleDateString(undefined, dateOptions)} - ${date.toLocaleTimeString(undefined, timeOptions)}`;
  }

  /**
   * Derive whether a message was sent by the local user.
   * Returns true (local), false (remote), or null (unknown/missing from).
   */
  function isLocalMessage(message) {
    if (!message.from) return null;
    return message.from === getUserId();
  }

  /**
   * Append a message of any type to the chat UI.
   * @param {Object} message - Message object (conforms to schema.js or minimal { from, text })
   * @param {Object} [uiOpts] - UI-only options not in the message schema
   * @param {Function} [uiOpts.onCallBack] - Callback for event "call back" button
   */
  function appendMessage(message, uiOpts = {}) {
    const { onCallBack } = uiOpts;
    const type = message.type || 'text';
    const isLocal = isLocalMessage(message);
    const reactions = message.reactions;

    // message-entry: container with type/sender classes
    const messageEntry = document.createElement('div');
    messageEntry.className = 'message-entry';
    if (message.sentAt) {
      messageEntry.setAttribute('data-timestamp', message.sentAt);
    }

    if (type === 'event') {
      messageEntry.classList.add('call-event');
    }

    if (isLocal === true) messageEntry.classList.add('local');
    else if (isLocal === false) messageEntry.classList.add('remote');

    // Avatar (sibling to message-bubble) - only for remote messages
    if (isLocal === false) {
      messageEntry.appendChild(createAvatar(false));
    }

    // message-bubble: container for content + reactions
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';

    // p element inside message-bubble
    const p = document.createElement('p');

    // Type-specific content
    let onSingleTap;
    switch (type) {
      case 'file': {
        const file = buildFileContent(message);
        p.appendChild(file.element);
        onSingleTap = file.onSingleTap;
        break;
      }
      case 'event':
        p.appendChild(buildCallEventContent(message, { onCallBack }));
        initIcons(p);
        break;
      default: // 'text'
        p.appendChild(buildTextContent(message.text));
        break;
    }

    // Build hierarchy: messageBubble → p, then messageEntry → (avatar + messageBubble)
    messageBubble.appendChild(p);
    messageEntry.appendChild(messageBubble);

    if (isLocal === true && message.read) {
      messageEntry.dataset.read = 'true';
      messageBubble.dataset.read = 'true';
    }

    // Reactions (attach to messageBubble)
    attachReactions(messageBubble, message.messageId, reactions, {
      onSingleTap,
    });

    messagesMessages.appendChild(messageEntry);
    scrollMessagesToEnd();

    // Increment unread if hidden and received from remote
    if (isLocal === false && !message.read && isHidden(messagesBox)) {
      const currentCount = messageToggle.element.unreadCount || 0;
      messageToggle.setUnreadCount(currentCount + 1);
    }
  }

  function appendEphemeralMessage({ content = {} } = {}) {
    const { text = '', downloadUrl = '', downloadName = '' } = content;

    if (!text && !downloadUrl) return null;

    const entry = document.createElement('div');
    entry.className = 'message-entry ephemeral';
    const p = document.createElement('p');
    p.className = 'message-text';

    if (text) {
      p.appendChild(document.createTextNode(text));
    }

    if (downloadUrl) {
      const link = document.createElement('a');
      link.textContent = escapeHtml(downloadName || downloadUrl);
      link.href = escapeHtml(downloadUrl);
      if (downloadName) {
        link.download = downloadName;
      }
      link.style.textDecoration = 'underline';
      link.style.cursor = 'pointer';
      p.appendChild(link);
    }

    entry.appendChild(p);
    messagesMessages.appendChild(entry);
    scrollMessagesToEnd();
    return entry;
  }

  /**
   * Append an ephemeral message with a download link and optional action buttons.
   * @param {Object} opts
   * @param {string} opts.text - Message text
   * @param {string} [opts.downloadUrl] - URL for the download link
   * @param {string} [opts.downloadName] - File name for the download link
   * @param {Array<{ label: string, icon?: string, primary?: boolean, onClick: Function }>} [opts.actions]
   * @returns {HTMLElement}
   */
  function appendEphemeralActionMessage({
    text,
    downloadUrl,
    downloadName,
    actions = [],
  }) {
    const entry = document.createElement('div');
    entry.className = 'message-entry ephemeral';

    const p = document.createElement('p');
    p.className = 'message-text';
    p.appendChild(document.createTextNode(text));

    if (downloadUrl) {
      p.appendChild(document.createTextNode(' '));
      const link = document.createElement('a');
      let nameToShow = downloadName || downloadUrl;
      if (nameToShow.length > 15) {
        const ext = nameToShow.includes('.')
          ? nameToShow.slice(nameToShow.lastIndexOf('.'))
          : '';
        nameToShow = escapeHtml(nameToShow.slice(0, 15) + '...' + ext);
      }
      link.textContent = nameToShow;
      link.href = escapeHtml(downloadUrl);
      if (downloadName) link.download = escapeHtml(downloadName);
      link.style.textDecoration = 'underline';
      link.style.cursor = 'pointer';
      p.appendChild(link);
    }

    entry.appendChild(p);

    if (actions.length > 0) {
      const bar = document.createElement('div');
      bar.className = 'ephemeral-actions';
      bar.style.cssText = 'display: flex; gap: 8px; margin-top: 6px;';

      for (const action of actions) {
        const btn = document.createElement('button');
        btn.className = action.primary ? 'action-btn primary' : 'action-btn';
        btn.textContent = action.label;
        btn.addEventListener('click', action.onClick, { once: true });
        if (action.icon) {
          const icon = document.createElement('i');
          icon.dataset.lucide = action.icon;
          icon.style.marginRight = '4px';
          btn.prepend(icon);
        }
        bar.appendChild(btn);
      }

      entry.appendChild(bar);
      initIcons(bar);
    }

    messagesMessages.appendChild(entry);
    scrollMessagesToEnd();
    return entry;
  }

  /**
   * Trigger download of a data URL
   */
  function downloadDataUrl(dataUrl, fileName) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    a.click();
  }

  let scrollRafId = null;
  function scrollMessagesToEnd() {
    if (!messagesMessages) return;
    if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
    scrollRafId = requestAnimationFrame(() => {
      messagesMessages.scrollTop = messagesMessages.scrollHeight;
      scrollRafId = null;
    });
  }

  // Helper to send the current message
  async function sendMessage() {
    const msg = messagesInput.value.trim();
    if (!msg) return;

    // Send via current conversation
    if (currentConversationId) {
      try {
        messagesInput.value = ''; // Optimistically clear input
        const parsed = await messagingController.send(
          currentConversationId,
          msg,
        );

        renderMessage(parsed); // Optimistically render sender's own message from return value
        if (resetInputHeight) resetInputHeight(); // Reset textarea height
      } catch (err) {
        if (messagesInput.value === '') messagesInput.value = msg; // Restore message on failure
        console.error('[MessagesUI] Failed to send message:', err);
      }
    } else {
      console.warn('[MessagesUI] No active conversation to send message');
    }
  }

  // Sending UI event (form submit)
  messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });

  // Enter to send, Shift+Enter for new line
  messagesInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  const isTextInputFocused = () => {
    const activeElement = document.activeElement;
    return (
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.isContentEditable)
    );
  };

  // 'M' key shortcut to open messages
  const openMessagesKeyhandler = (event) => {
    if (event.key === 'm' || event.key === 'M') {
      // Only open if not already open and input is not focused
      if (!isMessagesUIOpen() && !isTextInputFocused()) {
        event.preventDefault(); // Prevent 'M' from being typed into the input
        openMessagesUI();
      }
    }
  };
  document.addEventListener('keydown', openMessagesKeyhandler);

  /**
   * Clean up reaction listeners on all message elements.
   * Called when clearing messages or switching sessions to prevent leaks.
   */
  function cleanupReactionListeners() {
    const messageElements =
      messagesMessages.querySelectorAll('[data-message-id]');
    for (const el of messageElements) {
      if (typeof el._reactionCleanup === 'function') {
        try {
          el._reactionCleanup();
        } catch (err) {
          console.error('Failed to cleanup reaction listener:', err);
        }
      }
    }
  }

  /**
   * Clear all messages from the UI
   */
  function clearMessages() {
    if (scrollRafId !== null) {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = null;
    }

    cleanupReactionListeners();
    messagesMessages.innerHTML = '';
    messagesMessages.scrollTop = 0;
    // Reset timestamp separator state so new session histories insert
    // separators correctly after switching/clearing sessions.
    lastTimestamp = 0;
  }

  /**
   * Prepare UI for a conversation switch.
   * Clears old messages, resets metadata with profile, renders cached history.
   * No-op if already showing the same conversation.
   * @param {string} conversationId - Conversation ID
   * @param {string} contactId - Contact ID
   * @param {Object} [state] - Conversation state snapshot with { profile, history }
   */
  function prepareConversation(conversationId, contactId, conversationState) {
    if (!conversationId) return;
    if (currentConversationId === conversationId) return;

    if (markAsReadTimeout !== null) {
      clearTimeout(markAsReadTimeout);
      markAsReadTimeout = null;
    }

    if (currentConversationId !== null) {
      clearMessages();
    }

    currentConversationId = conversationId;
    lastTimestamp = 0;

    const profile = conversationState?.profile;
    const name = profile?.displayName || '';
    const photoURL = profile?.photoURL || '';

    conversationMetadata = {
      contactId,
      contactName: name,
      contactProfile: profile || null,
      contactPhotoURL: photoURL,
    };

    if (messageTopBar) {
      messageTopBar.setContact({ name, photoURL });
    }
    refreshAttachButton();

    // Render cached history
    const history = messagingController.getHistory(conversationId);
    if (history?.length > 0) {
      appendCachedHistory({ history });
    }
  }

  /**
   * Get the currently displayed conversation ID
   * @returns {string|null} Current conversation ID or null
   */
  function getCurrentConversationId() {
    return currentConversationId;
  }

  // ---------------------------------------------------------------------------
  // Watch-together coordination (UI side)
  // ---------------------------------------------------------------------------

  /**
   * Receiver clicked "Watch Together" on a received video message.
   * Calls the handler and shows status via ephemeral messages.
   */
  async function onRequestWatchTogether({ file, name, mimeType, opfsId }) {
    appendEphemeralMessage({
      content: { text: `🎬 ${t('message.watch.request_sent')}` },
    });

    const result = await watchFileHandler.requestWatchTogether({
      file,
      name,
      mimeType,
      opfsId,
    });

    if (result.ok) {
      showInfoToast(t('message.watch.request_sent', { name }));
    } else {
      appendEphemeralMessage({
        content: { text: `❌ ${t('message.watch.' + result.reason)}` },
      });
      showErrorToast(t('message.watch.' + result.reason));
    }
  }

  /**
   * Remote peer requested watch-together for a file we sent.
   * Shows accept/decline actions in chat.
   */
  async function onWatchFileRequest(e) {
    const { fileName } = e.detail;
    const file = watchFileHandler.getSentFile(fileName);

    if (!file) {
      appendEphemeralMessage({
        content: {
          text: `❌ ${t('message.watch.file_unavailable', { name: fileName })}`,
        },
      });
      showErrorToast(t('message.watch.file_unavailable', { name: fileName }));

      await watchFileHandler.declineWatch();
      return;
    }

    showInfoToast(t('message.watch.request_received', { name: fileName }));

    appendEphemeralActionMessage({
      text: t('message.watch.partner_wants', { name: fileName }),
      actions: [
        {
          label: t('shared.join'),
          icon: 'play',
          primary: true,
          onClick: async () => {
            appendEphemeralMessage({
              content: { text: `${t('message.watch.joining')}` },
            });
            const success = await watchFileHandler.acceptWatch(file);
            if (success) {
              appendEphemeralMessage({
                content: { text: `✅ ${t('message.watch.synced')}` },
              });
              showSuccessToast(t('message.watch.synced', { name: fileName }));
            } else {
              appendEphemeralMessage({
                content: { text: `❌ ${t('message.watch.failed_load')}` },
              });
              showErrorToast(
                t('message.watch.failed_load', { name: fileName }),
              );
            }
          },
        },
      ],
    });
  }

  /**
   * Set the FileTransferController for this UI
   * @param {FileTransferController|null} controller - Controller instance (or null to clear)
   */
  function setFileTransferController(controller) {
    if (!controller) {
      console.warn(
        '[MessagesUI] setFileTransferController(): Called with null (should NOT happen - investigate)',
      );
      return;
    }

    fileTransferController = controller;
    inActiveCall = !!controller; // TODO: Use canonical call state (see CallController)

    watchFileHandler.reset();

    refreshAttachButton(); // Show/hide attachment button based on file transfer availability

    if (fileTransferController) {
      // Setup file received handler
      // Receives { file, name, mimeType, opfsId } from FileTransferController
      fileTransferController.onFileReceived = async ({
        file,
        name,
        mimeType,
        opfsId,
      }) => {
        devDebug('[MessagesUI] Received file:', { file, name, mimeType });

        const result = watchFileHandler.checkReceivedFile({
          file,
          name,
          mimeType,
        });

        if (result.isVideo) {
          appendEphemeralActionMessage({
            text: t('message.received_video', { name }),
            downloadUrl: result.downloadUrl,
            downloadName: result.name,
            actions: [
              {
                label: t('message.watch_together'),
                icon: 'play',
                primary: true,
                onClick: () =>
                  onRequestWatchTogether({
                    file,
                    name,
                    mimeType: result.mimeType,
                    opfsId,
                  }),
              },
            ],
          });
        } else {
          // Non-video file — show download link
          const url = URL.createObjectURL(file);
          const entry = appendEphemeralMessage({
            content: {
              text: `📎 ${t('message.received', { name })} `,
              downloadUrl: url,
              downloadName: name,
            },
          });
          entry
            ?.querySelector('.message-text a')
            ?.addEventListener('click', () =>
              setTimeout(() => URL.revokeObjectURL(url), 100),
            );
        }

        // Update interaction timestamp for received files
        if (conversationMetadata.contactId) {
          contactsController
            .updateLastInteraction(conversationMetadata.contactId)
            .catch(() => {});
        }

        // Increment unread count if messages box is hidden
        if (isHidden(messagesBox)) {
          const currentCount = messageToggle.element.unreadCount || 0;
          messageToggle.setUnreadCount(currentCount + 1);
        }

        // Reset button text after receive completes
        if (isReceivingFile) {
          setSendLabelText('');
          isReceivingFile = false;
        }
      };

      // Setup file error handler
      fileTransferController.onFileError = ({ fileName, reason }) => {
        appendEphemeralMessage({
          content: {
            text: `❌ ${t('message.receive_failed', { name: fileName })} (${reason})`,
          },
        });
      };

      // Setup receive progress handler
      fileTransferController.onReceiveProgress = (progress) => {
        isReceivingFile = true;
        setSendLabelText(`${Math.round(progress * 100)}%`);
      };
    }
  }

  /**
   * Reset the messages UI for a new user session (e.g., on logout).
   * Clears messages, session, and hides the UI without destroying DOM elements.
   */
  function reset() {
    clearMessages();
    currentConversationId = null;
    conversationMetadata = {};
    clearTimeout(markAsReadTimeout);
    markAsReadTimeout = null;
    fileTransferController = null;
    inActiveCall = false;
    isReceivingFile = false;
    watchFileHandler.reset();

    hideElement(messagesBox);
    messageToggle.clearBadge();

    // Clear any unsent message text and reset textarea height
    messagesInput.value = '';
    if (resetInputHeight) resetInputHeight();

    // Reset send button text in case file transfer was in progress
    if (sendBtn) {
      setSendLabelText('');
    }

    // Clear inline positioning
    messagesBox.style.top = '';
    messagesBox.style.left = '';
    messagesBox.style.bottom = '';
    messagesBox.style.right = '';

    detachRepositionHandlers();

    // Clear reaction state
    reactionManager.clearAll();

    if (messageTopBar) {
      messageTopBar.setContact({ name: '', photoURL: '' });
    }
  }

  /**
   * Update reactions on an existing message (called when transport notifies of changes)
   * @param {string} messageId - Firebase message ID
   * @param {Object} reactions - Reactions { type: [userIds] }
   */
  function updateMessageReactions(messageId, reactions) {
    const element = messagesMessages.querySelector(
      `[data-message-id="${messageId}"]`,
    );
    if (!element) return;

    // Convert { heart: ['user1'] } to { heart: 1 } for ReactionUI
    const reactionCounts = {};
    for (const [type, users] of Object.entries(reactions || {})) {
      reactionCounts[type] = users.length;
    }

    // Check for conflicts: compare with current local state
    const currentLocal = reactionManager.getReactions(messageId);

    // Compare reaction states (order-independent)
    const isSameState = (a, b) => {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      return keysA.length === keysB.length && keysA.every((k) => a[k] === b[k]);
    };

    if (isSameState(reactionCounts, currentLocal)) {
      // Already in sync, no update needed
      return;
    }

    // Log discrepancies for debugging
    console.debug(`[MessagesUI] Syncing reaction state for ${messageId}:`, {
      local: currentLocal,
      remote: reactionCounts,
    });

    // Sync local manager state from remote (preserves user IDs)
    reactionManager.syncFromRemote(messageId, reactions);

    // Re-render
    reactionUI.renderReactions(element, messageId, reactionCounts);
  }

  function cleanup() {
    reset(); // Todo: clarify reset vs cleanup

    // Clear pending markAsRead timeout
    clearTimeout(markAsReadTimeout);
    markAsReadTimeout = null;

    // Abort grouped UI listeners
    try {
      ac.abort();
    } catch (err) {
      console.warn('[MessagesUI] Failed to abort listeners:', err);
    }
    // Cleanup message toggle
    if (messageToggle) {
      messageToggle.cleanup();
    }

    if (messageTopBar) {
      messageTopBar.cleanup();
    }

    detachRepositionHandlers();
    // Remove document click/escape listeners created by onClickOutside
    if (typeof removeMessagesBoxClickOutside === 'function') {
      try {
        removeMessagesBoxClickOutside();
      } catch (err) {
        console.error(
          'Error removing messages box outside click handler:',
          err,
        );
      }
    }
    observer.disconnect();

    // Remove keyboard shortcut handler
    document.removeEventListener('keydown', openMessagesKeyhandler);

    // Clean up watch-together file handler
    watchFileHandler.cleanup();

    // Remove messages box container
    if (messagesBoxContainer && messagesBoxContainer.parentNode) {
      messagesBoxContainer.parentNode.removeChild(messagesBoxContainer);
    }
  }

  /**
   * Helper: Render messages from a session's cached history.
   * This provides the "instant" feel when switching back to a recent chat.
   */
  function appendCachedHistory(session) {
    if (!session || !session.history) return;
    session.history.forEach((event) => renderMessage(event.message));
  }

  let lastTimestamp = 0;
  const TIMESTAMP_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  /**
   * Core logic to process and render a message or reaction update.
   */
  function renderMessage(message) {
    const timestamp = message.sentAt || Date.now();

    if (timestamp - lastTimestamp > TIMESTAMP_THRESHOLD) {
      const timestampEl = document.createElement('div');
      const formattedTimestamp = formatTimestamp(timestamp);
      timestampEl.textContent = formattedTimestamp;
      timestampEl.className = 'message-timestamp';
      messagesMessages.appendChild(timestampEl);
    }
    lastTimestamp = timestamp;

    appendMessage(message);
  }

  // --- Domain Event Listeners ---

  // Data ready — prepare conversation UI
  messagingController.on(
    'conversation:ready',
    ({ conversationId, remoteParticipantIds, displayUI, profile, history }) => {
      prepareConversation(conversationId, remoteParticipantIds[0], {
        profile,
        history,
      });
      if (displayUI) openMessagesUI();
    },
    { signal: ac.signal },
  );

  // Profile loaded — update name/photo
  messagingController.on(
    'conversation:profile-updated',
    ({ conversationId, profile }) => {
      if (conversationId !== currentConversationId || !profile) return;

      // TODO: Clean up and simplify this (avoid redundant or inconsistent updates)

      conversationMetadata.contactProfile = profile;
      if (profile.displayName)
        conversationMetadata.contactName = profile.displayName;
      if (profile.photoURL)
        conversationMetadata.contactPhotoURL = profile.photoURL;

      if (messageTopBar) {
        if (profile.displayName || profile.photoURL) {
          messageTopBar.setContact({
            name: profile.displayName || '',
            photoURL: profile.photoURL || '',
          });
        }
        refreshRemoteAvatars(messagesMessages, {
          name: profile.displayName || '',
          photoURL: conversationMetadata.contactPhotoURL,
        });
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'conversation:closed',
    ({ conversationId }) => {
      if (conversationId !== currentConversationId) return;
      currentConversationId = null;
      clearMessages();
      conversationMetadata = {};
      refreshAttachButton();
      if (messageTopBar) {
        messageTopBar.setContact({ name: '', photoURL: '' });
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'unread:changed',
    ({ conversationId, unreadCount, newlyReadMsgIds = [] }) => {
      if (conversationId === currentConversationId) {
        if (unreadCount === 0) {
          messageToggle.clearBadge();
        } else {
          messageToggle.setUnreadCount(unreadCount);
        }
        if (newlyReadMsgIds.length < 1) return;

        // Mark messages as read in the UI if they are now read
        newlyReadMsgIds.forEach((msgId) => {
          const bubble = messagesMessages.querySelector(
            `[data-message-id="${msgId}"]`,
          );
          if (bubble) bubble.dataset.read = 'true';
          const messageEntry = bubble?.closest('.message-entry');
          if (messageEntry) messageEntry.dataset.read = 'true';
        });
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'message:received',
    ({ message, conversationId }) => {
      // Only handle if this message belongs to our currently active conversation
      if (conversationId !== currentConversationId) return;

      if (conversationMetadata.contactId) {
        contactsController
          .updateLastInteraction(conversationMetadata.contactId)
          .catch(() => {});
      }

      renderMessage(message);

      // Mark as read if UI is open and message is not from me
      if (isMessagesUIOpen() && !isLocalMessage(message)) {
        const conversationIdAtReceive = currentConversationId ?? conversationId;

        clearTimeout(markAsReadTimeout);
        markAsReadTimeout = setTimeout(() => {
          markAsReadTimeout = null;
          if (
            !currentConversationId ||
            currentConversationId !== conversationIdAtReceive ||
            !isMessagesUIOpen()
          ) {
            return;
          }

          // TODO: optimize markAsRead (accept msgId?)
          messagingController.markAsRead(currentConversationId).catch((err) => {
            console.warn('Failed to mark messages as read:', err);
          });
        }, MARK_AS_READ_DEBOUNCE_MS);
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'message:sent',
    ({ message, conversationId }) => {
      if (conversationId !== currentConversationId) return;

      // NOTE: Message is already optimistically rendered on send,
      // so this event is primarily for updating last interaction status
      // or handling send failures in the future.

      if (conversationMetadata.contactId) {
        contactsController
          .updateLastInteraction(conversationMetadata.contactId)
          .catch(() => {});
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'reaction:updated',
    ({ conversationId, messageId, reactions }) => {
      if (conversationId !== currentConversationId) return;
      updateMessageReactions(messageId, reactions);

      if (conversationMetadata.contactId) {
        contactsController
          .updateLastInteraction(conversationMetadata.contactId)
          .catch(() => {});
      }
    },
    { signal: ac.signal },
  );

  return {
    appendMessage,
    updateMessageReactions,
    isMessagesUIOpen,
    toggleMessages: toggleMessagesUIVisible,
    openMessages: openMessagesUI,
    closeMessages: closeMessagesUI,
    showMessagesToggle,
    hideMessagesToggle,
    isMessageInputFocused,
    focusMessageInput,
    unfocusMessageInput,
    getCurrentConversationId,
    clearMessages,
    setFileTransferController,
    reset,
    cleanup,
  };
}

/**
 * Singleton MessagesUI instance
 * Initialized on first import
 */
export const messagesUI = initMessagesUI();
