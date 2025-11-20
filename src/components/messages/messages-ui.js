import { onClickOutside } from '../../utils/ui/clickOutside';
import { hideElement, isHidden, showElement } from '../../utils/ui/ui-utils';

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

// messages-ui.js
export function initMessagesUI(sendFn) {
  const container = document.createElement('div');
  container.innerHTML = `
  <div id="messages-ui-container" >
    <div id="messages-toggle-btn" class="hidden">
      <button>
        💬
      </button>
    </div>
    <div id="messages-box" class="messages-box hidden">
      <div id="messages"></div>
      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button>Send</button>
      </form>
    </div>
  </div>
  `;
  document.body.appendChild(container);

  const messagesToggleBtn = container.querySelector('#messages-toggle-btn');
  const messagesBox = container.querySelector('#messages-box');
  const messagesMessages = container.querySelector('#messages');
  const messagesForm = container.querySelector('#messages-form');
  const messagesInput = container.querySelector('#messages-input');
  const originalParent = messagesToggleBtn?.parentNode || null;
  const originalNextSibling = messagesToggleBtn?.nextSibling || null;

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

  let unreadMessagesCount = 0;

  // Minimal anchor-to-toggle positioning (no new APIs, robust)
  let repositionHandlersAttached = false;
  function positionMessagesBox() {
    if (
      !messagesToggleBtn ||
      !messagesBox ||
      messagesBox.classList.contains('hidden')
    )
      return;

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

  // Responsive: move the toggle into top bar on small screens for containment
  const topRightMenu =
    document.querySelector('.top-bar .top-right-menu') ||
    document.querySelector('.top-right-menu');

  function moveToggleToTopBar() {
    if (!messagesToggleBtn || !topRightMenu) return;
    if (messagesToggleBtn.parentNode !== topRightMenu) {
      topRightMenu.appendChild(messagesToggleBtn);
    }
  }

  function moveToggleBack() {
    if (!messagesToggleBtn || !originalParent) return;
    if (messagesToggleBtn.parentNode !== originalParent) {
      if (
        originalNextSibling &&
        originalNextSibling.parentNode === originalParent
      ) {
        originalParent.insertBefore(messagesToggleBtn, originalNextSibling);
      } else {
        originalParent.appendChild(messagesToggleBtn);
      }
    }
  }

  const mq = window.matchMedia('(max-width: 800px)');
  const applyPlacement = (e) => {
    if (e.matches) moveToggleToTopBar();
    else moveToggleBack();
  };
  // Apply immediately and on changes
  applyPlacement(mq);
  mq.addEventListener('change', applyPlacement);

  // Observe changes to messagesBox's class to clear unread count when shown
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (!messagesBox.classList.contains('hidden')) {
          unreadMessagesCount = 0;
        }
      }
    });
  });
  observer.observe(messagesBox, { attributes: true });

  function toggleMessages() {
    messagesBox.classList.toggle('hidden');
    if (!messagesBox.classList.contains('hidden')) {
      messagesInput.focus();

      // Fallback if needed
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
      detachRepositionHandlers(); // idempotent (no-op if not attached)
      // Clear inline offsets so CSS anchoring can fully take over next open
      messagesBox.style.top = '';
      messagesBox.style.left = '';
      messagesBox.style.bottom = '';
      messagesBox.style.right = '';
    }
  }

  messagesToggleBtn.addEventListener('click', toggleMessages);

  onClickOutside(
    messagesBox,
    () => {
      hideElement(messagesBox);
      detachRepositionHandlers();

      // TODO: Check if clearing the offsets below is redundant:
      // Clear inline offsets so CSS anchoring can fully take over next open
      messagesBox.style.top = '';
      messagesBox.style.left = '';
      messagesBox.style.bottom = '';
      messagesBox.style.right = '';
    },
    { ignore: [messagesToggleBtn], esc: true }
  );

  function showMessagesToggle() {
    showElement(messagesToggleBtn);
  }

  function hideMessagesToggle() {
    hideElement(messagesToggleBtn);
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
      unreadMessagesCount++;
      notifyNewMessage();
    }
  }

  function notifyNewMessage() {
    // Visual indication for new message
    messagesToggleBtn.classList.add('new-message');
    setTimeout(() => {
      messagesToggleBtn.classList.remove('new-message');
    }, 4000);
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
    try {
      mq.removeEventListener('change', applyPlacement);
    } catch {}
    // Ensure toggle restored to original parent on cleanup
    moveToggleBack();
    detachRepositionHandlers();
    observer.disconnect();
    if (messagesToggleBtn) hideMessagesToggle();
    // Remove the container from the DOM
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
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

// Saving for possible future use:
// // Auto-focus behavior when clicking inside the open (not hidden) messages box
// const focusConfig = {
//   autoFocusTextInput: true,
//   ignoreSelectors: ['a'],
//   ignoreElList: [],
// };

// const onClickMessagesBox = (evt) => {
//   if (!focusConfig.autoFocusTextInput) return;
//   if (isHidden(messagesBox)) return;

//   const target = evt.target;
//   if (
//     focusConfig.ignoreSelectors?.some(
//       (sel) => target instanceof Element && target.closest(sel)
//     )
//   ) {
//     return;
//   }

//   // If we populate ignoreElList (e.g., buttons), ignore those as well
//   if (
//     focusConfig.ignoreElList?.some(
//       (el) => el && (el === target || (el.contains && el.contains(target)))
//     )
//   ) {
//     return;
//   }

//   // Focus the input when clicking anywhere inside the open messages box
//   messagesInput.focus();
// };

// messagesBox.addEventListener('click', onClickMessagesBox);
