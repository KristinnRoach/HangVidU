import { onClickOutside } from '../../utils/ui/clickOutside.js';
import { hideElement, isHidden, showElement } from '../../utils/ui/ui-utils.js';
import { getActiveMessageSession } from '../../firebase/messaging.js';
import { createMessageToggle } from './message-toggle.js';

// Helper: create the messages box DOM and return container + element refs
function createMessageBox() {
  const messagesBoxContainer = document.createElement('div');
  messagesBoxContainer.innerHTML = `
    <div id="messages-box" class="messages-box hidden">
      <div id="messages"></div>
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
 * @param {Function} sendFn - Function to call when sending a message
 * @returns {Object} API with methods to control messages UI
 */
export function initMessagesUI(sendFn) {
  let repositionHandlersAttached = false;

  const topRightMenu =
    document.querySelector('.top-bar .top-right-menu') ||
    document.querySelector('.top-right-menu');

  const messageToggle = createMessageToggle({
    parent: topRightMenu,
    onToggle: () => toggleMessages(),
    icon: '💬',
    initialUnreadCount: 0,
    id: 'main-messages-toggle-btn', // ID needed for CSS anchor positioning
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
          const activeSession = getActiveMessageSession();
          if (activeSession?.toggle) {
            activeSession.toggle.clearBadge();
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
      messagesInput.focus();

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
    } else {
      messagesInput.blur();
      detachRepositionHandlers();
      // Clear inline offsets
      messagesBox.style.top = '';
      messagesBox.style.left = '';
      messagesBox.style.bottom = '';
      messagesBox.style.right = '';
    }
  }

  onClickOutside(
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

  function showMessagesToggle() {
    showElement(messageToggle.element);
  }

  function hideMessagesToggle() {
    hideElement(messageToggle.element);
  }

  // Display message line
  function appendChatMessage(text) {
    const p = document.createElement('p');
    p.textContent = text;
    if (text.startsWith('You:')) {
      p.style.textAlign = 'right';
    } else if (text.startsWith('Partner:')) {
      p.style.textAlign = 'left';
    }
    messagesMessages.appendChild(p);
    messagesMessages.scrollTop = messagesMessages.scrollHeight;
  }

  function receiveMessage(text) {
    appendChatMessage(`Partner: ${text}`);

    if (isHidden(messagesBox)) {
      // Get current count and increment
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
    sendFn(msg);
    // Don't append message here - let the listener handle it to avoid duplicates
    messagesInput.value = '';
  });

  // 'M' key shortcut to open messages
  const openMessagesKeyhandler = (event) => {
    if (event.key === 'm' || event.key === 'M') {
      // Only open if not already open and input is not focused
      if (!isMessagesUIOpen() && !isMessageInputFocused()) {
        event.preventDefault(); // Prevent 'M' from being typed into the input
        toggleMessages();
      }
    }
  };
  document.addEventListener('keydown', openMessagesKeyhandler);

  function cleanup() {
    // Cleanup message toggle
    if (messageToggle) {
      messageToggle.cleanup();
    }

    detachRepositionHandlers();
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
    cleanup,
  };
}
