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
import { updateLastInteraction } from '../contacts/contacts.js';
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
    'p.message-remote .sender-avatar:not(.sender-avatar--me)',
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
  let isReceivingFile = false; // Track if currently receiving a file
  let sentFiles = new Map(); // Track sent files by name for watch-together requests
  let receivedFile = null; // Store the last received video file for watch-together

  // Initialize reaction management
  const reactionManager = new ReactionManager();
  const reactionUI = new ReactionUI(reactionManager);

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

  // ! === [TEMP FIX] ===
  // TODO: Remove this temp fix after ensuring a session is always available or better solution found
  // Initialize toggle disabled state when no session is active.
  try {
    const _btn =
      messagesToggleEl &&
      messagesToggleEl.querySelector &&
      messagesToggleEl.querySelector('button');
    if (_btn) _btn.disabled = !currentSession;
  } catch (e) {
    /* ignore */
  }
  // ! === [TEMP FIX] End ===

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

  // Hide attachment button by default (shown when file transfer is available)
  // (Initial call is not needed, setSession and setFileTransferController will call it)

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
      if (fileTransferController) {
        // WebRTC DataChannel transfer (active call, large files OK)
        await fileTransferController.sendFile(file, (progress) => {
          setSendLabelText(`${Math.round(progress * 100)}%`);
        });

        // Track video files for potential watch-together requests
        if (isVideoMime(file.type, file)) {
          sentFiles.set(file.name, file);
        }

        appendMessage(`📎 ${t('message.sent', { name: file.name })}`, {
          isSentByMe: true,
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

      const sizeHint = !fileTransferController
        ? '\n\n' + t('message.file_size_limited')
        : '';

      appendMessage('❌  ' + t('message.send_failed') + sizeHint);
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
      appendMessage(
        `❌ ${t('message.watch.file_unavailable', { name: fileName })}`,
      );
      await cancelWatchRequest();
      return;
    }

    // Show notification
    appendMessage(`🎬 ${t('message.watch.partner_wants', { name: fileName })}`);

    // Prompt user to join
    const accepted = await promptJoinWatchTogether(fileName);

    if (accepted) {
      appendMessage(`✅ ${t('message.watch.joining')}`);
      const success = await acceptWatchRequest(file);

      if (!success) {
        appendMessage(`❌ ${t('message.watch.failed_load')}`);
      }
    } else {
      appendMessage(`❌ ${t('message.watch.declined')}`);
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
    messagesBox.classList.toggle('hidden');

    if (isMessagesUIOpen()) {
      // If we just opened:
      // Only auto-focus on desktop; let mobile users tap to focus naturally
      if (!isMobileDevice()) {
        messagesInput.focus();
      }
      // Fallback positioning if needed
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
      scrollMessagesToEnd();

      // Set up outside click handler
      removeMessagesBoxClickOutside = onClickOutside(
        messagesBox,
        () => {
          hideElement(messagesBox);
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
    } else {
      // If we just closed:
      // Only blur if actually focused (avoids mobile keyboard issues)
      if (document.activeElement === messagesInput) {
        messagesInput.blur();
      }
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
   * Convert Firebase reactions format { heart: { odAg2: true } } to { heart: ['odAg2'] }
   */
  function convertFirebaseReactions(fbReactions) {
    const reactions = {};
    if (fbReactions) {
      for (const [type, users] of Object.entries(fbReactions)) {
        reactions[type] = Object.keys(users);
      }
    }
    return reactions;
  }

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
   * @param {boolean|undefined} isSentByMe - true (local), false (remote), undefined (system)
   */
  function createAvatar(isSentByMe) {
    const avatarSpan = document.createElement('span');
    avatarSpan.className =
      'sender-avatar' + (isSentByMe === true ? ' sender-avatar--me' : '');
    avatarSpan.setAttribute('aria-hidden', 'true');

    if (isSentByMe === true) {
      renderAvatar(avatarSpan, { customFallbackText: t('shared.me') });
    } else if (isSentByMe === false) {
      const contactName = currentSession?.contactName || '';
      const photoURL =
        currentSession?.contactPhotoURL ||
        currentSession?.contactProfile?.photoURL ||
        null;
      renderAvatar(avatarSpan, { name: contactName, photoURL });
    }
    // system messages: avatar stays empty (hidden via CSS)

    return avatarSpan;
  }

  // --- Content builders ---

  /**
   * Build text content span. Handles plain text (linkified) and file-download links.
   */
  function buildTextContent(text, { fileDownload } = {}) {
    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';

    if (fileDownload) {
      const { fileName, url } = fileDownload;
      const prefix = text.split(fileName)[0];
      if (prefix) textSpan.appendChild(document.createTextNode(prefix));
      const link = document.createElement('a');
      link.textContent = fileName;
      link.href = url;
      link.download = fileName;
      link.style.cursor = 'pointer';
      link.style.textDecoration = 'underline';
      link.addEventListener('click', () => {
        setTimeout(() => URL.revokeObjectURL(url), 100);
      });
      textSpan.appendChild(link);
    } else {
      const fragment = linkifyToFragment(text);
      textSpan.appendChild(fragment);
    }

    return textSpan;
  }

  /**
   * Build file message content span (RTDB base64 file with thumbnail + download link).
   * @returns {{ element: HTMLElement, onSingleTap?: Function }}
   */
  function buildFileContent(msgData) {
    const { fileName, fileType, fileSize, data: dataUrl } = msgData;

    const textSpan = document.createElement('span');
    textSpan.className = 'message-text file-message';

    const isImage = fileType && fileType.startsWith('image/');
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
  function buildCallEventContent(msgData, { onCallBack, isSentByMe }) {
    const callEventBubble = document.createElement('span');
    callEventBubble.className = 'message-text call-event-content';

    const callStatusText = document.createElement('span');
    callStatusText.className = 'call-event-text';
    callStatusText.textContent = isSentByMe
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
        isSentByMe ? t('call.try_again') : t('call.callback'),
      ),
    );

    callBackBtn.addEventListener('click', async () => {
      if (onCallBack) {
        await onCallBack();
      } else {
        try {
          const { callContact } = await import('../../../main.js');
          const contactId = isSentByMe
            ? currentSession?.contactId
            : msgData.callerId;
          const contactName = isSentByMe
            ? currentSession?.contactName
            : msgData.callerName;
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

  // --- Unified message entry point ---

  /**
   * Append a message of any type to the chat UI.
   * @param {string} text - Message content (used for text/system types)
   * @param {Object} options
   * @param {'text'|'file'|'call_event'} [options.type='text'] - Message type
   * @param {boolean|undefined} [options.isSentByMe] - true (local), false (remote), undefined (system)
   * @param {string} [options.messageId] - Firebase message ID for reactions
   * @param {Object} [options.reactions] - Initial reactions { type: [userIds] }
   * @param {boolean} [options.isRead=false] - Whether this message is read
   * @param {Object} [options.fileDownload] - { fileName, url } for DataChannel file links
   * @param {Object} [options.msgData] - Raw Firebase msg data (for file/call_event types)
   * @param {Function} [options.onCallBack] - Callback for call_event "call back" button
   */
  function appendMessage(text, options = {}) {
    const {
      type = 'text',
      isSentByMe,
      messageId,
      reactions,
      isRead = false,
      fileDownload,
      msgData,
      onCallBack,
    } = options;

    // Infer system type: no sender and no fileDownload → system notice
    const effectiveType =
      type !== 'text'
        ? type
        : typeof isSentByMe === 'undefined' && !fileDownload
          ? 'system'
          : type;

    // message-entry: container with type/sender classes
    const messageEntry = document.createElement('div');
    messageEntry.className = 'message-entry';
    if (effectiveType === 'system') messageEntry.classList.add('system');
    if (effectiveType === 'call_event')
      messageEntry.classList.add('call-event');
    if (isSentByMe === true) messageEntry.classList.add('local');
    else if (isSentByMe === false) messageEntry.classList.add('remote');
    if (fileDownload) messageEntry.classList.add('system');

    // Avatar (sibling to message-bubble) - only for remote messages
    if (isSentByMe === false) {
      messageEntry.appendChild(createAvatar(isSentByMe));
    }

    // message-bubble: container for content + reactions
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';

    // p element inside message-bubble
    const p = document.createElement('p');

    // Type-specific content
    let onSingleTap;
    switch (effectiveType) {
      case 'file': {
        const file = buildFileContent(msgData);
        p.appendChild(file.element);
        onSingleTap = file.onSingleTap;
        break;
      }
      case 'call_event':
        p.appendChild(
          buildCallEventContent(msgData, {
            onCallBack,
            isSentByMe,
          }),
        );
        initIcons(p);
        break;
      default: // 'text', 'system'
        p.appendChild(buildTextContent(text, { fileDownload }));
        break;
    }

    // Build hierarchy: messageBubble → p, then messageEntry → (avatar + messageBubble)
    messageBubble.appendChild(p);
    messageEntry.appendChild(messageBubble);

    // Reactions for all non-system types (attach to messageBubble)
    if (effectiveType !== 'system') {
      attachReactions(messageBubble, messageId, reactions, { onSingleTap });
    }

    messagesMessages.appendChild(messageEntry);
    scrollMessagesToEnd();

    // Increment unread if hidden and received
    if (!isSentByMe && !isRead && isHidden(messagesBox)) {
      const currentCount = messageToggle.element.unreadCount || 0;
      messageToggle.setUnreadCount(currentCount + 1);
    }
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
  }

  /**
   * Set the active session for this UI
   * Clears existing messages when switching to a new session
   * @param {Object} session - Session object from messagingController
   */
  function setCurrentMsgUISession(session) {
    if (currentSession !== null && currentSession !== session) {
      clearMessages();
    }
    currentSession = session;

    if (messageTopBar) {
      messageTopBar.setContact({
        name: session?.contactName || '',
        photoURL:
          session?.contactPhotoURL || session?.contactProfile?.photoURL || '',
      });
    }

    refreshAttachButton();

    // ! === [TEMP FIX] ===
    // TODO: Remove this temp fix after ensuring a session is always available or better solution found
    try {
      const btn =
        messagesToggleEl &&
        messagesToggleEl.querySelector &&
        messagesToggleEl.querySelector('button');
      if (btn) btn.disabled = !session;
    } catch (e) {
      /* ignore */
    }
  }
  // ! === [TEMP FIX] End ===

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
            appendMessage(`📹 ${t('message.received_video', { name })}`, {
              isSentByMe: false,
            });
            appendMessage(`🎬 ${t('message.watch.requesting')}`);

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
              appendMessage(`❌ ${t('message.watch.failed_load')}`);
              return;
            }

            // Create watch request to notify sender
            const requestCreated = await createWatchRequest(name, file);

            if (requestCreated) {
              appendMessage(`⏳ ${t('message.watch.waiting')}`);
            } else {
              appendMessage(`❌ ${t('message.watch.request_failed')}`);
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

            appendMessage(`📎 ${t('message.downloaded', { name })}`);
          }
        } else {
          // Non-video file - show download link
          const url = URL.createObjectURL(file);
          appendMessage(`📎 ${t('message.received', { name })}`, {
            isSentByMe: false,
            fileDownload: { fileName: name, url },
          });
        }

        // Update interaction timestamp for received files
        if (currentSession?.contactId) {
          updateLastInteraction(currentSession.contactId).catch(() => {});
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
        appendMessage(
          `❌ ${t('message.receive_failed', { name: fileName })} (${reason})`,
        );
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

    fileTransferController = null;
    sentFiles.clear();
    receivedFile = null;
    isReceivingFile = false;

    hideElement(messagesBox);
    messageToggle.clearBadge();

    // Ensure toggle button is disabled when no session exists (reset state)
    try {
      const btn =
        messagesToggleEl &&
        messagesToggleEl.querySelector &&
        messagesToggleEl.querySelector('button');
      if (btn) btn.disabled = true;
    } catch (e) {
      /* ignore */
    }

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
    session.history.forEach((event) => processReceivedMessage(event));
  }

  /**
   * Core logic to process and render a received message or reaction update.
   */
  function processReceivedMessage({ text, msgData, isSentByMe }) {
    // Handle reaction updates separately
    if (msgData._reactionUpdate) {
      updateMessageReactions(
        msgData.messageId,
        convertFirebaseReactions(msgData.reactions),
      );
      return;
    }

    const reactions = convertFirebaseReactions(msgData.reactions);
    const type = msgData.type;
    const isText = !type;

    appendMessage(isText ? text : '', {
      ...(type && { type }),
      isSentByMe: isText ? false : isSentByMe,
      messageId: msgData.messageId,
      reactions,
      isRead: msgData.read,
      ...(type && { msgData }),
    });
  }

  async function openMessagesFromSession(session) {
    // If it's already the active session, just ensure UI is visible
    if (currentSession?.conversationId === session.conversationId) {
      showMessagesToggle();
      if (!isMessagesUIOpen()) {
        toggleMessagesUIVisible();
      }
      return;
    }

    clearMessages();
    setCurrentMsgUISession(null); // Reset temporarily to avoid race conditions

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

    setCurrentMsgUISession(session);

    // Render existing history if available
    appendCachedHistory(session);

    showMessagesToggle();

    if (!isMessagesUIOpen()) {
      toggleMessagesUIVisible();
    }

    session.markAsRead().catch((err) => {
      console.warn('Failed to mark messages as read:', err);
    });
  }

  // --- Domain Event Listeners ---
  messagingController.on(
    'session:opened',
    ({ session }) => {
      openMessagesFromSession(session);
    },
  );

  messagingController.on(
    'message:received',
    (messageEvent) => {
      // Only handle if this message belongs to our currently active session
      if (messageEvent.conversationId !== currentSession?.conversationId) return;

      // Update interaction timestamp on any message activity
      if (currentSession.contactId) {
        updateLastInteraction(currentSession.contactId).catch(() => {});
      }

      processReceivedMessage(messageEvent);
    },
  );

  messagingController.on(
    'reaction:updated',
    ({ conversationId, messageId, reactions }) => {
      if (conversationId !== currentSession?.conversationId) return;
      updateMessageReactions(messageId, convertFirebaseReactions(reactions));
    },
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
