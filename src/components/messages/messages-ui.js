import { onClickOutside } from '../../utils/ui/clickOutside.js';
import { hideElement, isHidden, showElement } from '../../utils/ui/ui-utils.js';
import { renderAvatar } from '../../utils/ui/avatar.js';
import { createMessageToggle } from './createMessageToggle.js';
import { isMobileDevice } from '../../utils/env/isMobileDevice.js';
import {
  handleVideoSelection,
  createWatchRequest,
  acceptWatchRequest,
  cancelWatchRequest,
} from '../../firebase/watch-sync.js';

import { linkifyToFragment } from '../../utils/linkify.js';
import {
  ReactionManager,
  ReactionUI,
} from '../../messaging/reactions/index.js';
import { REACTION_CONFIG } from '../../messaging/reactions/ReactionConfig.js';
import { getLoggedInUserId } from '../../firebase/auth.js';
import { messagingController } from '../../messaging/messaging-controller.js';
import { showInfoToast } from '../../utils/ui/toast.js';
import { getUserProfile } from '../../user/profile.js';
import { createMessageBox } from './createMessageBox.js';
import { createMessageTopBar } from './createMessageTopBar.js';

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
  let fileTransfer = null; // FileTransfer instance set by setFileTransfer()
  let isReceivingFile = false; // Track if currently receiving a file
  let sentFiles = new Map(); // Track sent files by name for watch-together requests
  let receivedFile = null; // Store the last received video file for watch-together

  // Initialize reaction management
  const reactionManager = new ReactionManager();
  const reactionUI = new ReactionUI(reactionManager);

  const topRightMenu =
    document.querySelector('.top-bar .top-right-menu') ||
    document.querySelector('.top-right-menu');

  const messageToggle = createMessageToggle({
    parent: topRightMenu,
    onToggle: () => toggleMessages(),
    icon: '💬',
    initialUnreadCount: 0,
    id: 'main-messages-toggle-btn', // ID needed for CSS anchor positioning
    startHidden: true,
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
        toggleMessages();
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

  // Hide attachment button by default (shown when FileTransfer is available)
  hideElement(attachBtn);

  // Attach button opens file picker
  attachBtn.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle file selection for sending
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file || !fileTransfer) {
      if (!fileTransfer) {
        console.warn('[MessagesUI] FileTransfer not initialized');
      }
      return;
    }

    // Show progress during transfer (don't disable - CSS hides disabled buttons)
    const originalText = sendBtn.textContent;
    sendBtn.textContent = 'Sending...';

    try {
      await fileTransfer.sendFile(file, (progress) => {
        sendBtn.textContent = `${Math.round(progress * 100)}%`;
      });

      // Track video files for potential watch-together requests
      if (file.type.startsWith('video/')) {
        sentFiles.set(file.name, file);
      }

      // Show in UI
      appendChatMessage(`📎 Sent: ${file.name}`, { isSentByMe: true });
    } catch (err) {
      console.error('[MessagesUI] File send failed:', err);
      appendChatMessage('❌ Failed to send file');
    } finally {
      sendBtn.textContent = originalText;
      fileInput.value = ''; // Reset input
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
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">Video Received</h3>
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
              <i class="fa fa-download" style="margin-right: 8px;"></i>Download
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
              <i class="fa fa-play" style="margin-right: 8px;"></i>Watch Together
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
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">Watch Together Request</h3>
          <p id="watch-request-filename" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <p style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 13px;">
            Partner wants to watch this video together
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
              Decline
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
              <i class="fa fa-play" style="margin-right: 8px;"></i>Join
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

      // Close on overlay click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          resolve(false);
        }
      });
    });
  }

  // Setup global handler for incoming watch requests
  window.onFileWatchRequestReceived = async (fileName) => {
    // Check if we have this file
    const file = sentFiles.get(fileName);

    if (!file) {
      appendChatMessage(`❌ File not available to watch together: ${fileName}`);
      await cancelWatchRequest();
      return;
    }

    // Show notification
    appendChatMessage(`🎬 Partner wants to watch: ${fileName}`);

    // Prompt user to join
    const accepted = await promptJoinWatchTogether(fileName);

    if (accepted) {
      appendChatMessage('✅ Joining watch together...');
      const success = await acceptWatchRequest(file);

      if (!success) {
        appendChatMessage('❌ Failed to load video');
      }
    } else {
      appendChatMessage('❌ Declined watch together request');
      await cancelWatchRequest();
    }
  };

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

  function toggleMessages() {
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

  /**
   * Display a message in the chat
   * @param {string} text - Message content
   * @param {Object} options
   * @param {boolean} [options.isSentByMe] - true = right-aligned (local), false = left-aligned (remote), undefined = centered (system)
   * @param {string} [options.messageId] - Firebase message ID for reactions
   * @param {Object} [options.reactions] - Initial reactions { type: [userIds] }
   * @param {Object} [options.fileDownload] - File download data { fileName, url }
   */
  function appendChatMessage(text, options = {}) {
    const { isSentByMe, senderDisplay, fileDownload, messageId, reactions } =
      options;
    // prefer explicit senderDisplay, otherwise 'Me' for local messages
    const effectiveSender = senderDisplay ?? (isSentByMe === true ? 'Me' : '');

    const p = document.createElement('p');
    // Apply alignment class based on sender
    if (isSentByMe === true) p.classList.add('message-local');
    else if (isSentByMe === false) p.classList.add('message-remote');

    // Always create avatar and text spans — fixed DOM shape
    const avatarSpan = document.createElement('span');
    avatarSpan.className =
      'sender-avatar' + (isSentByMe === true ? ' sender-avatar--me' : '');
    avatarSpan.setAttribute('aria-hidden', 'true');

    if (isSentByMe === true) {
      renderAvatar(avatarSpan, { customFallbackText: 'Me' });
    } else if (isSentByMe === false) {
      const contactName = currentSession?.contactName || effectiveSender;
      const photoURL =
        currentSession?.contactPhotoURL ||
        currentSession?.contactProfile?.photoURL ||
        null;
      renderAvatar(avatarSpan, { name: contactName, photoURL });
    } else {
      avatarSpan.textContent = effectiveSender;
    }

    const textSpan = document.createElement('span');
    textSpan.className = 'message-text';

    // If no senderDisplay and isSentByMe is undefined, treat as system message
    if (!senderDisplay && typeof isSentByMe === 'undefined') {
      p.classList.add('message-system');
    }

    // Handle clickable file downloads by populating textSpan
    if (fileDownload) {
      const { fileName, url } = fileDownload;
      const prefix = text.split(fileName)[0]; // e.g., "📎 Sent: "
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
      // Convert any detected URLs in the message text into clickable links.
      // Uses a small, focused utility so we can later extend to previews
      // by also using `extractLinks()` from the same module.
      const fragment = linkifyToFragment(text);
      textSpan.appendChild(fragment);
    }

    // Fixed order: avatar then text; CSS will reorder for local vs remote
    // Mark file-download messages as system-like so we can hide avatar
    if (fileDownload) p.classList.add('message-system');

    p.appendChild(avatarSpan);
    p.appendChild(textSpan);

    // Enable reactions for real messages (not system messages or file downloads)
    if (typeof isSentByMe !== 'undefined' && !fileDownload && messageId) {
      p.dataset.messageId = messageId;
      messageElements.set(messageId, p);

      // Render initial reactions if present
      if (reactions && Object.keys(reactions).length > 0) {
        // Sync local reaction manager with initial state (preserves user IDs)
        reactionManager.syncFromRemote(messageId, reactions);

        // Convert to counts for rendering
        const reactionCounts = reactionManager.getReactions(messageId);
        reactionUI.renderReactions(p, messageId, reactionCounts);
      }

      // Enable double-tap/long-press reactions
      reactionUI.enableDoubleTap(
        p,
        messageId,
        async (reactionType, messageElement, msgId, source) => {
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
            if (source === 'doubleTap') {
              // Double-tap: toggle my reaction
              const myReactionType = reactionManager.getUserReactionType(
                msgId,
                userId,
              );

              let reactions;

              if (myReactionType) {
                // I have a reaction - remove it (toggle off)
                await currentSession.removeReaction(msgId, myReactionType);
                reactions = reactionManager.removeReaction(
                  msgId,
                  myReactionType,
                  userId,
                );
              } else {
                // I don't have a reaction - add default (toggle on)
                await currentSession.addReaction(msgId, reactionType);
                reactions = reactionManager.addReaction(
                  msgId,
                  reactionType,
                  userId,
                );

                // Show animation only when adding
                if (REACTION_CONFIG.enableAnimations) {
                  reactionUI.showReactionAnimation(
                    messageElement,
                    reactionType,
                  );
                }
              }

              // Update UI immediately (optimistic update)
              reactionUI.renderReactions(messageElement, msgId, reactions);
            } else if (source === 'picker') {
              // Picker: toggle selected reaction for this user
              const myReactionType = reactionManager.getUserReactionType(
                msgId,
                userId,
              );

              let reactions;

              if (myReactionType === reactionType) {
                // Same reaction - toggle off
                await currentSession.removeReaction(msgId, reactionType);
                reactions = reactionManager.removeReaction(
                  msgId,
                  reactionType,
                  userId,
                );
              } else {
                // Different reaction - remove existing (if any), add new
                if (myReactionType) {
                  await currentSession.removeReaction(msgId, myReactionType);
                  reactionManager.removeReaction(msgId, myReactionType, userId);
                }

                await currentSession.addReaction(msgId, reactionType);
                reactions = reactionManager.addReaction(
                  msgId,
                  reactionType,
                  userId,
                );

                // Show animation
                if (REACTION_CONFIG.enableAnimations) {
                  reactionUI.showReactionAnimation(
                    messageElement,
                    reactionType,
                  );
                }
              }

              // Update UI immediately (optimistic update)
              reactionUI.renderReactions(messageElement, msgId, reactions);
            }
          } catch (err) {
            console.warn('[MessagesUI] Failed to handle reaction:', err);
          }
        },
      );
    }

    messagesMessages.appendChild(p);
    // Keep newest message visible
    scrollMessagesToEnd();
  }

  /**
   * Display a call event message in the chat (missed call, rejected call)
   * @param {Object} msgData - Message data from Firebase
   * @param {string} msgData.eventType - 'missed_call' or 'rejected_call'
   * @param {string} msgData.callerId - Who initiated the call
   * @param {string} msgData.callerName - Caller's display name
   * @param {string} msgData.from - Who wrote the message (could be caller or callee)
   * @param {Object} options
   * @param {boolean} [options.isUnread] - Whether message is unread
   * @param {Function} [options.onCallBack] - Callback when user clicks call back button
   */
  function appendCallEventMessage(msgData, options = {}) {
    const { isUnread = false, onCallBack } = options;
    const myUserId = getLoggedInUserId();
    const iAmTheCaller = msgData.callerId === myUserId;

    // Create call event message element
    const p = document.createElement('p');
    p.classList.add('message-call-event');
    // Apply local/remote styling classes for visual consistency
    if (iAmTheCaller) p.classList.add('message-local');
    else p.classList.add('message-remote');

    // Build content
    const avatarSpan = document.createElement('span');
    avatarSpan.className =
      'sender-avatar' + (iAmTheCaller ? ' sender-avatar--me' : '');
    avatarSpan.setAttribute('aria-hidden', 'true');

    if (iAmTheCaller) {
      renderAvatar(avatarSpan, { customFallbackText: 'Me' });
    } else {
      const contactName = currentSession?.contactName || msgData.callerName;
      const photoURL =
        currentSession?.contactPhotoURL ||
        currentSession?.contactProfile?.photoURL ||
        null;
      renderAvatar(avatarSpan, { name: contactName, photoURL });
    }

    const callEventBubble = document.createElement('span');
    callEventBubble.className = 'message-text call-event-content';

    const callStatusText = document.createElement('span');
    callStatusText.className = 'call-event-text';
    callStatusText.textContent = iAmTheCaller ? 'No Answer' : 'Missed Call';

    // Create call back action inside the same bubble
    const callBackBtn = document.createElement('button');
    callBackBtn.className = 'call-back-btn';
    callBackBtn.type = 'button';

    const callBackIcon = document.createElement('i');
    callBackIcon.className = 'fa fa-phone call-event-icon';
    callBackIcon.setAttribute('aria-hidden', 'true');
    callBackBtn.appendChild(callBackIcon);
    callBackBtn.appendChild(
      document.createTextNode(iAmTheCaller ? 'Try again' : 'Call back'),
    );

    callBackBtn.addEventListener('click', async () => {
      if (onCallBack) {
        await onCallBack();
      } else {
        // Fallback: try to call via contacts
        try {
          const { callContact } = await import('../../main.js');
          const contactId = iAmTheCaller
            ? currentSession?.contactId
            : msgData.callerId;
          const contactName = iAmTheCaller
            ? currentSession?.contactName
            : msgData.callerName;
          if (contactId && contactName) {
            await callContact(contactId, contactName);
          }
        } catch (e) {
          console.warn('[MessagesUI] Failed to initiate call back:', e);
          showInfoToast('Unable to call. Please try again.');
        }
      }
    });

    // Assemble the message
    callEventBubble.appendChild(callStatusText);
    callEventBubble.appendChild(callBackBtn);
    p.appendChild(avatarSpan);
    p.appendChild(callEventBubble);

    messagesMessages.appendChild(p);

    // Handle unread count for received call events
    if (isUnread && !iAmTheCaller && isHidden(messagesBox)) {
      const currentCount = messageToggle.element.unreadCount || 0;
      messageToggle.setUnreadCount(currentCount + 1);
    }

    scrollMessagesToEnd();
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

  function receiveMessage(
    text,
    { isUnread = true, senderDisplay = 'U', messageId, reactions } = {},
  ) {
    appendChatMessage(text, {
      isSentByMe: false,
      senderDisplay,
      messageId,
      reactions,
    });

    // Only increment unread count if:
    // 1. The messages box is hidden (user can't see the message)
    // 2. The message is actually unread (not a historical already-read message)
    if (isHidden(messagesBox) && isUnread) {
      const currentCount = messageToggle.element.unreadCount || 0;
      messageToggle.setUnreadCount(currentCount + 1);
      // Animation triggered automatically by component
    }
  }

  // Helper to send the current message
  function sendMessage() {
    const msg = messagesInput.value.trim();
    if (!msg) return;

    // Send via current session
    if (currentSession) {
      currentSession.send(msg);
      messagesInput.value = '';
      // Reset textarea height after clearing (JS fallback only)
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
        toggleMessages();
      }
    }
  };
  document.addEventListener('keydown', openMessagesKeyhandler);

  /**
   * Clear all messages from the UI
   */
  function clearMessages() {
    if (scrollRafId !== null) {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = null;
    }
    messagesMessages.innerHTML = '';
    messagesMessages.scrollTop = 0;
  }

  /**
   * Set the active session for this UI
   * Clears existing messages when switching to a new session
   * @param {Object} session - Session object from messagingController
   */
  function setSession(session) {
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
  }

  /**
   * Get the currently displayed session
   * @returns {Object|null} Current session or null
   */
  function getCurrentSession() {
    return currentSession;
  }

  /**
   * Set the FileTransfer instance for this UI
   * @param {FileTransfer} instance - FileTransfer instance from data-channel setup (or null to clear)
   */
  function setFileTransfer(instance) {
    fileTransfer = instance;

    // Show/hide attachment button based on FileTransport availability
    if (fileTransfer) {
      showElement(attachBtn);

      // Setup file received handler
      fileTransfer.onFileReceived = async (file) => {
        // Create download URL
        const url = URL.createObjectURL(file);

        // Check if it's a video file
        if (file.type.startsWith('video/')) {
          // Store the file for potential watch-together
          receivedFile = file;

          // Prompt user: Download or Watch Together
          const action = await promptFileAction(file.name);

          if (action === 'watch') {
            // Show notification in chat
            appendChatMessage(`📹 Received video: ${file.name}`, {
              isSentByMe: false,
            });
            appendChatMessage(
              '🎬 Requesting partner to join watch together...',
            );

            // Load video locally first
            const success = await handleVideoSelection(file);

            if (!success) {
              appendChatMessage('❌ Failed to load video');
              return;
            }

            // Create watch request to notify sender
            const requestCreated = await createWatchRequest(file.name, file);

            if (requestCreated) {
              appendChatMessage('⏳ Waiting for partner to join...');
            } else {
              appendChatMessage('❌ Failed to send watch request');
            }
          } else {
            // Download the file
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();

            // Revoke blob URL after a delay to allow download to start
            // Using 1 second to be safe for slow devices/large files
            setTimeout(() => URL.revokeObjectURL(url), 1000);

            appendChatMessage(`📎 Downloaded: ${file.name}`);
          }
        } else {
          // Non-video file - show download link as before
          appendChatMessage(`📎 Received: ${file.name}`, {
            isSentByMe: false,
            fileDownload: { fileName: file.name, url },
          });
        }

        // Increment unread count if messages box is hidden
        if (isHidden(messagesBox)) {
          const currentCount = messageToggle.element.unreadCount || 0;
          messageToggle.setUnreadCount(currentCount + 1);
        }

        // Reset button text after receive completes
        if (isReceivingFile) {
          sendBtn.textContent = 'Send';
          isReceivingFile = false;
        }
      };

      // Setup receive progress handler
      fileTransfer.onReceiveProgress = (progress) => {
        isReceivingFile = true;
        sendBtn.textContent = `${Math.round(progress * 100)}%`;
      };
    } else {
      hideElement(attachBtn);
    }
  }

  /**
   * Reset the messages UI for a new user session (e.g., on logout).
   * Clears messages, session, and hides the UI without destroying DOM elements.
   */
  function reset() {
    clearMessages();
    currentSession = null;
    fileTransfer = null;
    isReceivingFile = false;
    hideMessagesToggle();
    hideElement(messagesBox);
    messageToggle.clearBadge();

    // Clear any unsent message text and reset textarea height
    messagesInput.value = '';
    if (resetInputHeight) resetInputHeight();

    // Reset send button text in case file transfer was in progress
    if (sendBtn) {
      sendBtn.textContent = 'Send';
    }

    // Hide attachment button (will be shown again when FileTransfer is available)
    hideElement(attachBtn);

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

    // Remove messages box container
    if (messagesBoxContainer && messagesBoxContainer.parentNode) {
      messagesBoxContainer.parentNode.removeChild(messagesBoxContainer);
    }
  }

  /**
   * Open messaging UI for a specific contact.
   * Creates a message session with the messaging controller.
   * @param {string} contactId - Contact's user ID
   * @param {string} contactName - Display name for the contact
   * @param {boolean} [openMessageBox=false] - Whether to open the message box immediately
   */
  function openContactMessages(contactId, contactName, openMessageBox = false) {
    if (!getLoggedInUserId()) {
      showInfoToast('Please sign in to send messages');
      return;
    }

    // Check if already have an active session for this contact
    const existingSession = messagingController.getSession(contactId);
    if (existingSession) {
      setSession(existingSession);
      showMessagesToggle();

      if (openMessageBox && !isMessagesUIOpen()) {
        toggleMessages();
      }

      existingSession.markAsRead().catch((err) => {
        console.warn('Failed to mark messages as read:', err);
      });
      return;
    }

    // Close any existing contact message session (only one at a time)
    const allSessions = messagingController.getAllSessions();
    allSessions.forEach((session) => {
      session.close();
    });

    // Clear messages UI and reset session BEFORE opening new session
    // (otherwise onChildAdded fires synchronously and messages get cleared afterward)
    clearMessages();
    setSession(null); // Reset so setSession() below doesn't re-clear

    // Open messaging session
    const session = messagingController.openSession(contactId, {
      onMessage: (text, msgData, isSentByMe) => {
        // Handle reaction updates separately (don't re-append the message)
        if (msgData._reactionUpdate) {
          // Convert Firebase reactions format { heart: { odAg2: true } } to { heart: ['odAg2'] }
          const reactions = {};
          if (msgData.reactions) {
            for (const [type, users] of Object.entries(msgData.reactions)) {
              reactions[type] = Object.keys(users);
            }
          }
          updateMessageReactions(msgData.messageId, reactions);
          return;
        }

        // Handle call event messages (missed_call, rejected_call)
        if (msgData.type === 'call_event') {
          appendCallEventMessage(msgData, {
            isUnread: !msgData.read,
          });
          return;
        }

        // Convert Firebase reactions format for initial display
        const reactions = {};
        if (msgData.reactions) {
          for (const [type, users] of Object.entries(msgData.reactions)) {
            reactions[type] = Object.keys(users);
          }
        }

        // Display message in UI
        if (isSentByMe) {
          appendChatMessage(text, {
            isSentByMe: true,
            messageId: msgData.messageId,
            reactions,
          });
        } else {
          const isUnread = !msgData.read;
          receiveMessage(text, {
            isUnread,
            messageId: msgData.messageId,
            reactions,
          });
        }
      },
    });

    // Store metadata on session for reference
    session.contactId = contactId;
    session.contactName = contactName;

    if (messageTopBar) {
      messageTopBar.setContact({ name: contactName || '', photoURL: '' });
    }

    // Fetch contact profile (photo + display name) for avatars
    getUserProfile(contactId)
      .then((profile) => {
        if (!profile) return;
        session.contactProfile = profile;
        if (!session.contactName && profile.displayName) {
          session.contactName = profile.displayName;
        }
        if (profile.photoURL) {
          session.contactPhotoURL = profile.photoURL;
        }

        if (messageTopBar) {
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

    // Set this session as the active one in the UI (won't clear since we just did)
    setSession(session);

    // Show and open the messages UI
    showMessagesToggle();

    if (openMessageBox && !isMessagesUIOpen()) {
      toggleMessages();
    }

    // Mark all unread messages as read
    session.markAsRead().catch((err) => {
      console.warn('Failed to mark messages as read:', err);
    });
  }

  return {
    appendChatMessage,
    receiveMessage,
    updateMessageReactions,
    isMessagesUIOpen,
    toggleMessages,
    showMessagesToggle,
    hideMessagesToggle,
    isMessageInputFocused,
    focusMessageInput,
    unfocusMessageInput,
    setSession,
    getCurrentSession,
    clearMessages,
    setFileTransfer,
    openContactMessages,
    reset,
    cleanup,
  };
}

/**
 * Singleton MessagesUI instance
 * Initialized on first import
 */
export const messagesUI = initMessagesUI();
