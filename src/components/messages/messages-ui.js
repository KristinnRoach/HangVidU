import createComponent from '../../utils/dom/component.js';
import { onClickOutside } from '../../utils/ui/clickOutside.js';
import { hideElement, isHidden, showElement } from '../../utils/ui/ui-utils.js';

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
  let messagesToggleBtn = null;
  let messagesBox = null;
  let messagesMessages = null;
  let messagesForm = null;
  let messagesInput = null;
  let repositionHandlersAttached = false;

  // Create the toggle button component
  const toggleContainer = createComponent({
    initialProps: {
      unreadCount: 0,
    },
    template: `
      <div id="messages-toggle-btn">
        <button onclick="handleToggle">
          💬
          <span class="notification-badge">
            ${'${'}unreadCount${'}'}
          </span>
        </button>
      </div>
    `,
    handlers: {
      handleToggle: (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMessages();
      },
    },
    className: 'messages-toggle-container',
    autoAppend: false,
  });

  // Control badge visibility and animation based on unreadCount
  let initialBadge = toggleContainer.querySelector('.notification-badge');
  if (initialBadge) {
    initialBadge.style.display = 'none'; // Initially hidden
  }

  toggleContainer.onPropUpdated('unreadCount', (count) => {
    // Re-query badge each time since re-renders create new elements
    const badge = toggleContainer.querySelector('.notification-badge');
    if (badge) {
      badge.style.display = count > 0 ? 'flex' : 'none';
    }

    // Trigger animation when count increases
    if (count > 0) {
      const btn = toggleContainer.querySelector('#messages-toggle-btn');
      if (btn) {
        btn.classList.add('new-message');
        setTimeout(() => {
          btn.classList.remove('new-message');
        }, 4000);
      }
    }
  });

  // Create the messages box component (non-reactive, manual DOM for inputs)
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

  // Get references
  messagesToggleBtn = toggleContainer.querySelector('#messages-toggle-btn');
  messagesBox = messagesBoxContainer.querySelector('#messages-box');
  messagesMessages = messagesBoxContainer.querySelector('#messages');
  messagesForm = messagesBoxContainer.querySelector('#messages-form');
  messagesInput = messagesBoxContainer.querySelector('#messages-input');

  if (
    !messagesToggleBtn ||
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
      !messagesToggleBtn ||
      !messagesBox ||
      messagesBox.classList.contains('hidden')
    )
      return;

    // const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    // if (isMobile) {
    //   // Fixed bottom positioning on mobile to avoid keyboard issues
    //   messagesBox.style.bottom = '80px';
    //   messagesBox.style.right = '20px';
    //   messagesBox.style.top = 'auto';
    //   messagesBox.style.left = 'auto';
    //   return;
    // }

    const btnRect = messagesToggleBtn.getBoundingClientRect();
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

  // Place toggle in top-right-menu
  const topRightMenu =
    document.querySelector('.top-bar .top-right-menu') ||
    document.querySelector('.top-right-menu');

  if (toggleContainer && topRightMenu) {
    topRightMenu.appendChild(toggleContainer);
  }

  // Clear unread count when messages box is shown
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (!messagesBox.classList.contains('hidden')) {
          toggleContainer.unreadCount = 0;
        }
      }
    });
  });
  observer.observe(messagesBox, { attributes: true });

  function toggleMessages() {
    messagesBox.classList.toggle('hidden');
    if (!messagesBox.classList.contains('hidden')) {
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

      // Focus input after layout settles (skip auto-focus on mobile to avoid keyboard jump)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        messagesInput.focus();
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
    { ignore: [toggleContainer], esc: true }
  );

  function showMessagesToggle() {
    showElement(toggleContainer);
  }

  function hideMessagesToggle() {
    hideElement(toggleContainer);
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
      toggleContainer.unreadCount++;
      // Animation triggered automatically by onPropUpdated
    }
  }

  // Sending UI event
  messagesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messagesInput.value.trim();
    if (!msg) return;
    sendFn(msg);
    appendChatMessage(`You: ${msg}`);
    messagesInput.value = '';
  });

  function cleanup() {
    // Remove toggle from top-right menu
    if (toggleContainer && toggleContainer.parentNode) {
      toggleContainer.parentNode.removeChild(toggleContainer);
    }

    detachRepositionHandlers();
    observer.disconnect();

    // Dispose the component
    toggleContainer.dispose();

    // Remove messages box container
    if (messagesBoxContainer && messagesBoxContainer.parentNode) {
      messagesBoxContainer.parentNode.removeChild(messagesBoxContainer);
    }
  }

  return {
    appendChatMessage,
    receiveMessage,
    toggleMessages,
    showMessagesToggle,
    hideMessagesToggle,
    cleanup,
  };
}
