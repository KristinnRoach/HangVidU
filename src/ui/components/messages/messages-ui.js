import { t } from '../../../i18n/index.js';
import { initIcons } from '../../icons.js';
import { onClickOutside } from '../../utils/clickOutside.js';
import { hideElement, isHidden, showElement } from '../../utils/ui-utils.js';
import { renderAvatar } from '../../utils/avatar.js';
import { createMessageToggle } from './createMessageToggle.js';
import { isMobileDevice } from '../../../utils/env/isMobileDevice.js';
import {
  handleVideoSelection,
  createWatchRequest,
  acceptWatchRequest,
  cancelWatchRequest,
} from '../../../firebase/watch-sync.js';
import {
  registerVideoForServing,
  isSwServingSupported,
} from '../../../file-transfer/video-serving.js';

import { linkifyToFragment } from '../../../utils/linkify.js';
import { isVideoMime } from '../../../utils/is-video-mime.js';
import {
  ReactionManager,
  ReactionUI,
} from '../../../messaging/reactions/index.js';
import { REACTION_CONFIG } from '../../../messaging/reactions/ReactionConfig.js';
import { getLoggedInUserId, getIsLoggedIn } from '../../../auth/auth-state.js';
import { messagingController } from '../../../messaging/messaging-controller.js';
import { contactsController } from '../../../contacts/contacts-controller.js';
import { showInfoToast } from '../../utils/toast.js';
import { getUserProfile } from '../../../user/profile.js';
import { createMessageBox } from './createMessageBox.js';
import { createMessageTopBar } from './createMessageTopBar.js';
import { devDebug } from '../../../utils/dev/dev-utils.js';
import { showImagePreview } from '../modal/imagePreview.js';
import { onTapGesture } from '../../utils/detectDoubleClick.js';

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
  let currentSession = null; // Track the currently displayed session
  let fileTransferController = null; // FileTransferController instance set by setFileTransferController()
  let inActiveCall = false; // Track if we're currently in an active call
  let isReceivingFile = false; // Track if currently receiving a file
  let sentFiles = new Map(); // Track sent files by name for watch-together requests
  let receivedFile = null; // Store the last received video file for watch-together
  let markAsReadTimeout = null; // Debounce markAsRead calls on incoming messages

  const MARK_AS_READ_DEBOUNCE_MS = 100;

  const reactionManager = new ReactionManager();
  const reactionUI = new ReactionUI(reactionManager);
  const ac = new AbortController();

  const shouldShowAttachButton = () =>
    getIsLoggedIn() && (!!fileTransferController || !!currentSession);

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

  if (messageTopBar?.element) {
    messagesBox.prepend(messageTopBar.element);

    messageTopBar.setBackHandler(() => {
      if (isMessagesUIOpen()) {
        toggleMessagesUIVisible();
      }
    });

    messageTopBar.setCallHandler(() => {
      messagesBox.dispatchEvent(
        new CustomEvent('contact:call', {
          bubbles: true,
          detail: {
            contactId: currentSession?.contactId || null,
            contactName: currentSession?.contactName || null,
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

        // Track video files for potential watch-together requests
        if (isVideoMime(file.type, file)) {
          sentFiles.set(file.name, file);
        }

        appendEphemeralMessage({
          text: `📎 ${t('message.sent', { name: file.name })}`,
        });
      } else if (currentSession) {
        // RTDB file message (no active call, small files only)
        await currentSession.sendFile(file);
        // File message will appear via the onMessage listener
      } else {
        console.warn('[MessagesUI] No file transport or session available');
      }
    } catch (err) {
      console.error('[MessagesUI] File send failed:', err);

      const sizeHint = inActiveCall
        ? ''
        : '\n\n' + t('message.file_size_limited');

      appendEphemeralMessage({
        text: '❌  ' + t('message.send_failed') + sizeHint,
      });
    } finally {
      setSendLabelText(originalText);
      fileInput.value = '';
    }
  });

  /**
   * Prompt user to choose action for received video file
   * @param {string} fileName - Name of the video file
   * @returns {Promise<'download'|'watch'>} User's choice
   */
  async function promptFileAction(fileName) {
    return new Promise((resolve) => {
      // Create modal overlay
      const overlay = document.createElement('div');
      overlay.className = 'file-action-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      // Create prompt dialog
      const dialog = document.createElement('div');
      dialog.className = 'file-action-prompt';
      dialog.style.cssText = `
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `;

      dialog.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">📹</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">${t('message.video_received')}</h3>
          <p id="file-name-display" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="download-file-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--bg-secondary, #2a2a2a);
              border: 1px solid var(--border-color, #444);
              border-radius: 8px;
              color: var(--text-primary, #fff);
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            ">
              <i data-lucide="download" style="margin-right: 8px;"></i>${t('message.download')}
            </button>
            <button id="watch-together-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--accent-color, #4a9eff);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">
              <i data-lucide="play" style="margin-right: 8px;"></i>${t('message.watch_together')}
            </button>
          </div>
        </div>
      `;

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      // Set filename safely using textContent to prevent XSS
      const fileNameDisplay = dialog.querySelector('#file-name-display');
      fileNameDisplay.textContent = fileName;

      // Add hover effects
      const downloadBtn = dialog.querySelector('#download-file-btn');
      const watchBtn = dialog.querySelector('#watch-together-btn');

      downloadBtn.addEventListener('mouseenter', () => {
        downloadBtn.style.background = 'var(--bg-hover, #333)';
      });
      downloadBtn.addEventListener('mouseleave', () => {
        downloadBtn.style.background = 'var(--bg-secondary, #2a2a2a)';
      });

      watchBtn.addEventListener('mouseenter', () => {
        watchBtn.style.opacity = '0.9';
      });
      watchBtn.addEventListener('mouseleave', () => {
        watchBtn.style.opacity = '1';
      });

      // Handle button clicks
      downloadBtn.addEventListener('click', () => {
        overlay.remove();
        resolve('download');
      });

      watchBtn.addEventListener('click', () => {
        overlay.remove();
        resolve('watch');
      });

      initIcons(dialog);

      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          resolve('download'); // Default to download
        }
      });
    });
  }

  /**
   * Prompt sender to join watch together when receiver requests
   * @param {string} fileName - Name of the video file
   * @returns {Promise<boolean>} True if user accepts, false otherwise
   */
  async function promptJoinWatchTogether(fileName) {
    return new Promise((resolve) => {
      // Create modal overlay
      const overlay = document.createElement('div');
      overlay.className = 'watch-request-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      // Create prompt dialog
      const dialog = document.createElement('div');
      dialog.className = 'watch-request-prompt';
      dialog.style.cssText = `
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `;

      dialog.innerHTML = `
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🎬</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">${t('message.watch_request.title')}</h3>
          <p id="watch-request-filename" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <p style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 13px;">
            ${t('message.watch_request.body')}
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="decline-watch-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--bg-secondary, #2a2a2a);
              border: 1px solid var(--border-color, #444);
              border-radius: 8px;
              color: var(--text-primary, #fff);
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            ">
              ${t('call.decline')}
            </button>
            <button id="accept-watch-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--accent-color, #4a9eff);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">
              <i data-lucide="play" style="margin-right: 8px;"></i>${t('shared.join')}
            </button>
          </div>
        </div>
      `;

      overlay.appendChild(dialog);
      document.body.appendChild(overlay);

      // Set filename safely
      const fileNameDisplay = dialog.querySelector('#watch-request-filename');
      fileNameDisplay.textContent = fileName;

      // Add hover effects
      const declineBtn = dialog.querySelector('#decline-watch-btn');
      const acceptBtn = dialog.querySelector('#accept-watch-btn');

      declineBtn.addEventListener('mouseenter', () => {
        declineBtn.style.background = 'var(--bg-hover, #333)';
      });
      declineBtn.addEventListener('mouseleave', () => {
        declineBtn.style.background = 'var(--bg-secondary, #2a2a2a)';
      });

      acceptBtn.addEventListener('mouseenter', () => {
        acceptBtn.style.opacity = '0.9';
      });
      acceptBtn.addEventListener('mouseleave', () => {
        acceptBtn.style.opacity = '1';
      });

      // Handle button clicks
      declineBtn.addEventListener('click', () => {
        overlay.remove();
        resolve(false);
      });

      acceptBtn.addEventListener('click', () => {
        overlay.remove();
        resolve(true);
      });

      initIcons(dialog);

      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          resolve(false);
        }
      });
    });
  }

  // Listen for incoming watch requests from watch-sync via CustomEvent
  async function onWatchFileRequest(e) {
    const { fileName } = e.detail;
    // Check if we have this file
    const file = sentFiles.get(fileName);

    if (!file) {
      appendEphemeralMessage({
        text: `❌ ${t('message.watch.file_unavailable', { name: fileName })}`,
      });
      await cancelWatchRequest();
      return;
    }

    // Show notification
    appendEphemeralMessage({
      text: `🎬 ${t('message.watch.partner_wants', { name: fileName })}`,
    });

    // Prompt user to join
    const accepted = await promptJoinWatchTogether(fileName);

    if (accepted) {
      appendEphemeralMessage({ text: `✅ ${t('message.watch.joining')}` });
      const success = await acceptWatchRequest(file);

      if (!success) {
        appendEphemeralMessage({
          text: `❌ ${t('message.watch.failed_load')}`,
        });
      }
    } else {
      appendEphemeralMessage({ text: `❌ ${t('message.watch.declined')}` });
      await cancelWatchRequest();
    }
  }
  document.addEventListener('watch:file-request', onWatchFileRequest);

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

  function toggleMessagesUIVisible() {
    if (!currentSession) {
      console.warn('[MessagesUI] No active session to display');
      return;
    }
    if (isMessagesUIOpen()) {
      // close
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
    } else {
      // open
      // Only auto-focus on desktop; let mobile users tap to focus naturally
      if (!isMobileDevice()) messagesInput.focus();

      openMessagesBox();
      scrollMessagesToEnd();

      // Set up outside click handler
      removeMessagesBoxClickOutside = onClickOutside(
        messagesBox,
        () => {
          // animate close when clicking outside
          closeMessagesBox();
          detachRepositionHandlers();

          // Clear inline offsets
          messagesBox.style.top = '';
          messagesBox.style.left = '';
          messagesBox.style.bottom = '';
          messagesBox.style.right = '';

          // Clean up the handler since we're closing
          if (removeMessagesBoxClickOutside) {
            removeMessagesBoxClickOutside();
            removeMessagesBoxClickOutside = null;
          }
        },
        {
          ignore: () =>
            [messageToggle.element, reactionUI.activePicker].filter(Boolean),
          esc: true,
          ignoreInputBlur: isMobileDevice(), // Prevent accidental closes when dismissing keyboard on mobile
        },
      );
    }
  }

  function showMessagesToggle() {
    showElement(messageToggle.element);
  }

  function hideMessagesToggle() {
    hideElement(messageToggle.element);
  }

  // Map of messageId -> DOM element for reaction updates
  const messageElements = new Map();

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
    if (!currentSession) {
      console.warn('[MessagesUI] No current session for reaction');
      return;
    }

    const userId = getLoggedInUserId();
    if (!userId) {
      console.warn('[MessagesUI] No userId available for reaction');
      return;
    }

    try {
      const myReactionType = reactionManager.getUserReactionType(msgId, userId);
      let reactions;

      if (source === 'doubleTap') {
        if (myReactionType) {
          await currentSession.removeReaction(msgId, myReactionType);
          reactions = reactionManager.removeReaction(
            msgId,
            myReactionType,
            userId,
          );
        } else {
          await currentSession.addReaction(msgId, reactionType);
          reactions = reactionManager.addReaction(msgId, reactionType, userId);
          if (REACTION_CONFIG.enableAnimations) {
            reactionUI.showReactionAnimation(messageElement, reactionType);
          }
        }
      } else if (source === 'picker') {
        if (myReactionType === reactionType) {
          await currentSession.removeReaction(msgId, reactionType);
          reactions = reactionManager.removeReaction(
            msgId,
            reactionType,
            userId,
          );
        } else {
          if (myReactionType) {
            await currentSession.removeReaction(msgId, myReactionType);
            reactionManager.removeReaction(msgId, myReactionType, userId);
          }
          await currentSession.addReaction(msgId, reactionType);
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
   * Attach reaction support to a message element. No-op if messageId is falsy.
   * @param {HTMLElement} p - The message <p> element
   * @param {string} messageId - Firebase message ID
   * @param {Object} reactions - Initial reactions { type: [userIds] }
   * @param {Object} [opts]
   * @param {Function} [opts.onSingleTap] - Called on single tap (e.g. image preview)
   */
  function attachReactions(p, messageId, reactions, { onSingleTap } = {}) {
    if (!messageId) return;

    p.dataset.messageId = messageId;
    messageElements.set(messageId, p);

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
      const contactName = currentSession?.contactName || '';
      const photoURL =
        currentSession?.contactPhotoURL ||
        currentSession?.contactProfile?.photoURL ||
        null;
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
  function buildFileContent(parsedMessage) {
    const { fileName, mimeType, fileSize, data: dataUrl } = parsedMessage;

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
    link.textContent = fileName;
    if (isSafeUrl) {
      link.href = dataUrl;
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
  function buildCallEventContent(parsedMessage, { onCallBack }) {
    const callEventBubble = document.createElement('span');
    callEventBubble.className = 'message-text call-event-content';

    const details = parsedMessage.details || {};
    const currentUserId = getLoggedInUserId();
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
            ? currentSession?.contactId
            : details.callerId;
          const contactName = wasInitiatedByMe
            ? currentSession?.contactName
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

    const timeOptions = { hour: 'numeric', minute: '2-digit' };
    const dateOptions = { month: 'short', day: 'numeric' };

    return isToday
      ? date.toLocaleTimeString(undefined, timeOptions)
      : `${date.toLocaleDateString(undefined, dateOptions)} - ${date.toLocaleTimeString(undefined, timeOptions)}`;
  }

  /**
   * Derive whether a message was sent by the local user.
   * Returns true (local), false (remote), or null (unknown/missing from).
   */
  function isLocalMessage(parsedMessage) {
    if (!parsedMessage.from) return null;
    return parsedMessage.from === getLoggedInUserId();
  }

  /**
   * Append a message of any type to the chat UI.
   * @param {Object} parsedMessage - Message object (conforms to schema.js or minimal { from, text })
   * @param {Object} [uiOpts] - UI-only options not in the message schema
   * @param {Function} [uiOpts.onCallBack] - Callback for event "call back" button
   */
  function appendMessage(parsedMessage, uiOpts = {}) {
    const { onCallBack } = uiOpts;
    const type = parsedMessage.type || 'text';
    const isLocal = isLocalMessage(parsedMessage);
    const reactions = parsedMessage.reactions;

    // message-entry: container with type/sender classes
    const messageEntry = document.createElement('div');
    messageEntry.className = 'message-entry';
    if (parsedMessage.sentAt) {
      messageEntry.setAttribute('data-timestamp', parsedMessage.sentAt);
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
        const file = buildFileContent(parsedMessage);
        p.appendChild(file.element);
        onSingleTap = file.onSingleTap;
        break;
      }
      case 'event':
        p.appendChild(buildCallEventContent(parsedMessage, { onCallBack }));
        initIcons(p);
        break;
      default: // 'text'
        p.appendChild(buildTextContent(parsedMessage.text));
        break;
    }

    // Build hierarchy: messageBubble → p, then messageEntry → (avatar + messageBubble)
    messageBubble.appendChild(p);
    messageEntry.appendChild(messageBubble);

    if (isLocal === true && parsedMessage.read) {
      messageEntry.dataset.read = 'true';
      messageBubble.dataset.read = 'true';
    }

    // Reactions (attach to messageBubble)
    attachReactions(messageBubble, parsedMessage.messageId, reactions, {
      onSingleTap,
    });

    messagesMessages.appendChild(messageEntry);
    scrollMessagesToEnd();

    // Increment unread if hidden and received from remote
    if (isLocal === false && !parsedMessage.read && isHidden(messagesBox)) {
      const currentCount = messageToggle.element.unreadCount || 0;
      messageToggle.setUnreadCount(currentCount + 1);
    }
  }

  function appendEphemeralMessage({ text }) {
    const entry = document.createElement('div');
    entry.className = 'message-entry status';
    const p = document.createElement('p');
    p.className = 'message-text';
    p.textContent = text;
    entry.appendChild(p);
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
  function sendMessage() {
    const msg = messagesInput.value.trim();
    if (!msg) return;

    // Send via current session
    if (currentSession) {
      currentSession.send(msg);
      messagesInput.value = '';
      // Reset textarea height after clearing
      if (resetInputHeight) resetInputHeight();
    } else {
      console.warn('[MessagesUI] No active session to send message');
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
        toggleMessagesUIVisible();
      }
    }
  };
  document.addEventListener('keydown', openMessagesKeyhandler);

  /**
   * Clean up reaction listeners on all message elements.
   * Called when clearing messages or switching sessions to prevent leaks.
   */
  function cleanupReactionListeners() {
    for (const el of messageElements.values()) {
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
    messageElements.clear();
    messagesMessages.innerHTML = '';
    messagesMessages.scrollTop = 0;
    // Reset timestamp separator state so new session histories insert
    // separators correctly after switching/clearing sessions.
    lastTimestamp = 0;
  }

  /**
   * Set the active session for this UI
   * Clears existing messages when switching to a new session
   * @param {Object} session - Session object from messagingController
   */
  function setCurrentMsgUISession(session) {
    if (markAsReadTimeout !== null) {
      clearTimeout(markAsReadTimeout);
      markAsReadTimeout = null;
    }

    if (currentSession !== null && currentSession !== session) {
      clearMessages();
    }
    currentSession = session;
    // Reset timestamp tracking when switching sessions so appended
    // cached history shows correct timestamp separators.
    lastTimestamp = 0;

    if (messageTopBar) {
      messageTopBar.setContact({
        name: session?.contactName || '',
        photoURL:
          session?.contactPhotoURL || session?.contactProfile?.photoURL || '',
      });
    }

    refreshAttachButton();
  }

  /**
   * Get the currently displayed session
   * @returns {Object|null} Current session or null
   */
  function getCurrentSession() {
    return currentSession;
  }

  /**
   * Set the FileTransferController for this UI
   * @param {FileTransferController|null} controller - Controller instance (or null to clear)
   */
  function setFileTransferController(controller) {
    fileTransferController = controller;
    inActiveCall = !!controller; // Track that we're in an active call when controller is set

    // Show/hide attachment button based on file transfer availability
    refreshAttachButton();

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

        // Check if it's a video file
        if (isVideoMime(mimeType, file)) {
          // Store the file for potential watch-together
          receivedFile = file;

          // Prompt user: Download or Watch Together
          const action = await promptFileAction(name);

          if (action === 'watch') {
            // Show notification in chat
            appendEphemeralMessage({
              text: `📹 ${t('message.received_video', { name })}`,
            });
            appendEphemeralMessage({
              text: `🎬 ${t('message.watch.requesting')}`,
            });

            // If OPFS-streamed and SW available, serve via SW URL
            let videoSource;
            if (opfsId && isSwServingSupported()) {
              try {
                videoSource = await registerVideoForServing(opfsId, mimeType);
                devDebug('[MessagesUI] Serving video via SW at:', videoSource);
              } catch (err) {
                console.warn(
                  '[MessagesUI] SW video registration failed, falling back to blob:',
                  err,
                );
                videoSource = file;
              }
            } else {
              videoSource = file;
              devDebug('[MessagesUI] Serving video via in memory blob URL');
              devDebug(
                'isSwServingSupported():',
                isSwServingSupported(),
                'opfsId:',
                opfsId,
              );
            }

            // Load video locally first
            const success = await handleVideoSelection(videoSource, mimeType);

            if (!success) {
              appendEphemeralMessage({
                text: `❌ ${t('message.watch.failed_load')}`,
              });
              return;
            }

            // Create watch request to notify sender
            const requestCreated = await createWatchRequest(name, file);

            if (requestCreated) {
              appendEphemeralMessage({
                text: `⏳ ${t('message.watch.waiting')}`,
              });
            } else {
              appendEphemeralMessage({
                text: `❌ ${t('message.watch.request_failed')}`,
              });
            }
          } else {
            // Download the file
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = name;
            a.click();

            // Revoke blob URL after a delay to allow download to start
            // Using 1 second to be safe for slow devices/large files
            setTimeout(() => URL.revokeObjectURL(url), 1000);

            appendEphemeralMessage({
              text: `📎 ${t('message.downloaded', { name })}`,
            });
          }
        } else {
          // Non-video file - show download link
          const url = URL.createObjectURL(file);
          const entry = appendEphemeralMessage({
            text: `📎 ${t('message.received', { name })} `,
          });
          const link = document.createElement('a');
          link.textContent = name;
          link.href = url;
          link.download = name;
          link.style.textDecoration = 'underline';
          link.style.cursor = 'pointer';
          link.addEventListener('click', () =>
            setTimeout(() => URL.revokeObjectURL(url), 100),
          );
          entry.querySelector('.message-text').appendChild(link);
        }

        // Update interaction timestamp for received files
        if (currentSession?.contactId) {
          contactsController
            .updateLastInteraction(currentSession.contactId)
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
          text: `❌ ${t('message.receive_failed', { name: fileName })} (${reason})`,
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
    currentSession = null;
    clearTimeout(markAsReadTimeout);
    markAsReadTimeout = null;
    fileTransferController = null;
    inActiveCall = false;
    sentFiles.clear();
    receivedFile = null;
    isReceivingFile = false;

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
    messageElements.clear();
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
    const element = messageElements.get(messageId);
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

    // Remove watch file request handler
    document.removeEventListener('watch:file-request', onWatchFileRequest);

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
    session.history.forEach((event) =>
      processReceivedMessage(event.parsedMessage),
    );
  }

  let lastTimestamp = 0;
  const TIMESTAMP_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  /**
   * Core logic to process and render a received message or reaction update.
   */
  function processReceivedMessage(parsedMessage) {
    // Handle reaction updates separately
    if (parsedMessage._reactionUpdate) {
      updateMessageReactions(parsedMessage.messageId, parsedMessage.reactions);
      return;
    }

    const timestamp = parsedMessage.sentAt || Date.now();
    const formattedTimestamp = formatTimestamp(timestamp);

    if (timestamp - lastTimestamp > TIMESTAMP_THRESHOLD) {
      const timestampEl = document.createElement('div');
      timestampEl.className = 'message-timestamp';
      timestampEl.textContent = formattedTimestamp;
      messagesMessages.appendChild(timestampEl);
    }
    lastTimestamp = timestamp;

    appendMessage(parsedMessage);
  }

  function displayCurrentSession() {
    if (!currentSession || !currentSession?.conversationId) {
      console.warn('No currentSession to display:', {
        currentSession,
      });
      return;
    }

    if (!isMessagesUIOpen()) {
      toggleMessagesUIVisible();
    }

    currentSession.markAsRead().catch((err) => {
      console.warn('Failed to mark messages as read:', err);
    });
  }

  function _prepUIForSession(session) {
    if (!session) return;

    const isCurrentSession =
      currentSession?.conversationId === session.conversationId;

    if (!isCurrentSession) {
      clearMessages();
      setCurrentMsgUISession(null); // Reset temporarily to avoid race conditions
    }

    if (messageTopBar) {
      messageTopBar.setContact({
        name: session.contactName || '',
        photoURL: session.contactPhotoURL || '',
      });
    }

    // Fetch contact profile (photo + display name) for avatars
    getUserProfile(session.contactId)
      .then((profile) => {
        if (!profile) return;
        session.contactProfile = profile;
        if (!session.contactName && profile.displayName) {
          session.contactName = profile.displayName;
        }
        if (profile.photoURL) {
          session.contactPhotoURL = profile.photoURL;
        }

        if (
          messageTopBar &&
          currentSession?.conversationId === session.conversationId
        ) {
          messageTopBar.setContact({
            name: session.contactName || '',
            photoURL: session.contactPhotoURL || '',
          });
        }

        refreshRemoteAvatars(messagesMessages, {
          name: session.contactName,
          photoURL: session.contactPhotoURL,
        });
      })
      .catch(() => {});

    !isCurrentSession && setCurrentMsgUISession(session);
    !isCurrentSession && appendCachedHistory(session); // Render existing history if available
  }

  // --- Domain Event Listeners ---
  messagingController.on(
    'session:opened',
    ({ session }) => {
      _prepUIForSession(session);
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'session:resumed',
    ({ session }) => {
      _prepUIForSession(session);
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'session:display',
    () => {
      displayCurrentSession();
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'unread:changed',
    ({ conversationId, unreadCount, newlyReadMsgIds = [] }) => {
      if (conversationId === currentSession?.conversationId) {
        if (unreadCount === 0) {
          messageToggle.clearBadge();
        } else {
          messageToggle.setUnreadCount(unreadCount);
        }
        if (newlyReadMsgIds.length < 1) return;

        // Mark messages as read in the UI if they are now read
        newlyReadMsgIds.forEach((msgId) => {
          const messageEntry = messageElements
            .get(msgId)
            ?.closest('.message-entry');
          if (!messageEntry) return;
          messageEntry.dataset.read = 'true';
          const bubble = messageEntry.querySelector('.message-bubble');
          if (bubble) bubble.dataset.read = 'true';
        });
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'message:received',
    ({ parsedMessage, conversationId }) => {
      // Only handle if this message belongs to our currently active session
      if (conversationId !== currentSession?.conversationId) return;

      if (currentSession.contactId) {
        contactsController
          .updateLastInteraction(currentSession.contactId)
          .catch(() => {});
      }

      processReceivedMessage(parsedMessage);

      // Mark as read if UI is open and message is not from me
      if (isMessagesUIOpen() && !isLocalMessage(parsedMessage)) {
        const conversationIdAtReceive =
          currentSession?.conversationId ?? conversationId;

        clearTimeout(markAsReadTimeout);
        markAsReadTimeout = setTimeout(() => {
          markAsReadTimeout = null;
          if (
            !currentSession ||
            currentSession.conversationId !== conversationIdAtReceive ||
            !isMessagesUIOpen()
          ) {
            return;
          }

          // TODO: optimize markAsRead (accept msgId?)
          Promise.resolve(currentSession.markAsRead?.()).catch((err) => {
            console.warn('Failed to mark messages as read:', err);
          });
        }, MARK_AS_READ_DEBOUNCE_MS);
      }
    },
    { signal: ac.signal },
  );

  messagingController.on(
    'reaction:updated',
    ({ conversationId, messageId, reactions }) => {
      if (conversationId !== currentSession?.conversationId) return;
      updateMessageReactions(messageId, reactions);

      // Update interaction timestamp for reactions as well
      if (currentSession.contactId) {
        contactsController
          .updateLastInteraction(currentSession.contactId)
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
    showMessagesToggle,
    hideMessagesToggle,
    isMessageInputFocused,
    focusMessageInput,
    unfocusMessageInput,
    setSession: setCurrentMsgUISession,
    getCurrentSession,
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
