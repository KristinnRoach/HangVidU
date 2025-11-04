import {
  onClickOutside,
  onDoubleClickOutside,
} from '../../utils/ui/clickOutside';
import { hideElement, isHidden, showElement } from '../../utils/ui/ui-utils';

// messages-ui.js
export function initMessagesUI(sendFn) {
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="messages-toggle-btn" class="hidden">
      <button>
        💬
      </button>
    </div>
    <div id="messages-box" class="messages-box hidden">
      <div id="messages-messages" style="height:150px; overflow-y:auto; background:#111; color:#eee; padding:6px; font-family:sans-serif; font-size:14px;"></div>
      <form id="messages-form" style="display:flex; gap:4px; margin-top:6px;">
        <input id="messages-input" placeholder="Type a message..." style="flex:1; padding:6px; border-radius:4px; border:1px solid #555; background:#222; color:#fff;">
        <button style="padding:6px 12px;">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(container);

  const messagesToggleBtn = container.querySelector('#messages-toggle-btn');
  const messagesBox = container.querySelector('#messages-box');
  const messagesMessages = container.querySelector('#messages-messages');
  const messagesForm = container.querySelector('#messages-form');
  const messagesInput = container.querySelector('#messages-input');

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
    } else {
      messagesInput.blur();
    }
  }

  messagesToggleBtn.addEventListener('click', toggleMessages);

  onClickOutside(
    messagesBox,
    () => {
      hideElement(messagesBox);
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
