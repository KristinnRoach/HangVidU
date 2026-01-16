import { onClickOutside } from '../../utils/ui/clickOutside.js';
import { hideElement, isHidden, showElement } from '../../utils/ui/ui-utils.js';
import { createMessageToggle } from './message-toggle.js';
import { isMobileDevice } from '../../utils/env/isMobileDevice.js';
import { handleVideoSelection } from '../../firebase/watch-sync.js';

// Helper: create the messages box DOM and return container + element refs
function createMessageBox() {
  const messagesBoxContainer = document.createElement('div');
  messagesBoxContainer.innerHTML = `
    <div id="messages-box" class="messages-box hidden">
      
      <div id="messages"></div>
      
      <div class="message-attachments">
        <input type="file" id="file-input" style="display: none" />
        <button type="button" id="attach-file-btn" title="Attach file">
          <i class="fa fa-paperclip"></i>
        </button>
      </div>

      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>

    </div>
  `;
  document.body.appendChild(messagesBoxContainer);

  const messagesBox = messagesBoxContainer.querySelector('#messages-box');
  const messagesMessages = messagesBoxContainer.querySelector('#messages');
  const messagesForm = messagesBoxContainer.querySelector('#messages-form');
  const messagesInput = messagesBoxContainer.querySelector('#messages-input');

  // Prevent viewport resize/shift when virtual keyboard appears on mobile
  if ('virtualKeyboard' in navigator) {
    navigator.virtualKeyboard.overlaysContent = true;
  }

  // TODO: Proper fix for autoscroll on mobile when THIS specific text input is focused (keyboard open)
  // if (isMobileDevice()) {
  //   messagesInput.addEventListener('focus', () => {
  //     document.body.style.overflow = 'hidden';
  //     document.body.style.position = 'fixed';
  //     document.body.style.width = '100%';
  //   });

  //   messagesInput.addEventListener('blur', () => {
  //     document.body.style.overflow = '';
  //     document.body.style.position = '';
  //     document.body.style.width = '';
  //   });
  // }

  return {
    messagesBoxContainer,
    messagesBox,
    messagesMessages,
    messagesForm,
    messagesInput,
  };
}

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
      'Messages UI: failed to initialize message toggle; aborting messages UI initialization.'
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
  } = createMessageBox();

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

      // Show in UI
      appendChatMessage(`📎 You sent: ${file.name}`);
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
          <p style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
            ${fileName}
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
          // Clear per-contact badge if there's an active session
          if (currentSession?.toggle) {
            currentSession.toggle.clearBadge();
          }
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
    }
  }

  // onClickOutside removed for mobile, test again when auto scrolling issue is resolved
  if (!isMobileDevice()) {
    // Close messages box when clicking outside (desktop only)
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
      },
      { ignore: [messageToggle.element], esc: true }
    );
  }

  function showMessagesToggle() {
    showElement(messageToggle.element);
  }

  function hideMessagesToggle() {
    hideElement(messageToggle.element);
  }

  // Display message line
  function appendChatMessage(text, options = {}) {
    const p = document.createElement('p');

    // Handle clickable file downloads
    if (options.fileDownload) {
      const { fileName, url } = options.fileDownload;
      const prefix = text.split(fileName)[0]; // e.g., "📎 Partner sent: "

      p.textContent = prefix;
      const link = document.createElement('a');
      link.textContent = fileName;
      link.href = url;
      link.download = fileName;
      link.style.cursor = 'pointer';
      link.style.textDecoration = 'underline';

      // Revoke the object URL after click to prevent memory leaks
      link.addEventListener('click', () => {
        setTimeout(() => URL.revokeObjectURL(url), 100);
      });

      p.appendChild(link);
    } else {
      p.textContent = text;
    }

    if (text.startsWith('You:')) {
      p.style.textAlign = 'right';
    } else if (text.startsWith('Partner:')) {
      p.style.textAlign = 'left';
    }
    messagesMessages.appendChild(p);
    // Keep newest message visible
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

  function receiveMessage(text, { isUnread = true } = {}) {
    appendChatMessage(`Partner: ${text}`);

    // Only increment unread count if:
    // 1. The messages box is hidden (user can't see the message)
    // 2. The message is actually unread (not a historical already-read message)
    if (isHidden(messagesBox) && isUnread) {
      const currentCount = messageToggle.element.unreadCount || 0;
      messageToggle.setUnreadCount(currentCount + 1);
      // Animation triggered automatically by component
    }
  }

  // Sending UI event
  messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messagesInput.value.trim();
    if (!msg) return;

    // Send via current session
    if (currentSession) {
      currentSession.send(msg);
      messagesInput.value = '';
    } else {
      console.warn('[MessagesUI] No active session to send message');
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
          // Prompt user: Download or Watch Together
          const action = await promptFileAction(file.name);
          
          if (action === 'watch') {
            // Show notification in chat
            appendChatMessage(`📹 Partner sent video: ${file.name}`);
            appendChatMessage('🎬 Starting watch together mode...');
            
            // Load video in shared player
            const success = await handleVideoSelection(file);
            
            if (!success) {
              appendChatMessage('❌ Failed to load video');
            }
          } else {
            // Download the file
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
            
            appendChatMessage(`📎 Downloaded: ${file.name}`);
          }
        } else {
          // Non-video file - show download link as before
          appendChatMessage(`📎 Partner sent: ${file.name}`, {
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

    // Clear any unsent message text
    messagesInput.value = '';

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
  }

  function cleanup() {
    // Cleanup message toggle
    if (messageToggle) {
      messageToggle.cleanup();
    }

    detachRepositionHandlers();
    // Remove document click/escape listeners created by onClickOutside
    if (typeof removeMessagesBoxClickOutside === 'function') {
      try {
        removeMessagesBoxClickOutside();
      } catch (err) {
        console.error(
          'Error removing messages box outside click handler:',
          err
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

  return {
    appendChatMessage,
    receiveMessage,
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
    reset,
    cleanup,
  };
}

/**
 * Singleton MessagesUI instance
 * Initialized on first import
 */
export const messagesUI = initMessagesUI();
