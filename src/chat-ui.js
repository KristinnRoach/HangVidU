import { hideElement, showElement } from './utils/ui-utils';

// chat-ui.js
export function initChatUI(sendFn) {
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="chat-toggle-btn" class="hidden" style="position:fixed; bottom:20px; right:20px; z-index:1000;">
      <button style="padding:10px 15px; border-radius:50%; background:#007bff; color:#fff; border:none; cursor:pointer; font-size:16px;">
        💬
      </button>
    </div>
    <div id="chat-container" class="chat-box hidden">
      <div id="chat-messages" style="height:150px; overflow-y:auto; background:#111; color:#eee; padding:6px; font-family:sans-serif; font-size:14px;"></div>
      <form id="chat-form" style="display:flex; gap:4px; margin-top:6px;">
        <input id="chat-input" placeholder="Type a message..." style="flex:1; padding:6px; border-radius:4px; border:1px solid #555; background:#222; color:#fff;">
        <button style="padding:6px 12px;">Send</button>
      </form>
    </div>
  `;
  document.body.appendChild(container);

  const chatToggleBtn = container.querySelector('#chat-toggle-btn');
  const chatContainer = container.querySelector('#chat-container');
  const chatMessages = container.querySelector('#chat-messages');
  const chatForm = container.querySelector('#chat-form');
  const chatInput = container.querySelector('#chat-input');

  function toggleChat() {
    chatContainer.classList.toggle('hidden');
  }

  chatToggleBtn.addEventListener('click', toggleChat);

  // Show chat box
  function showChatToggle() {
    showElement(chatToggleBtn);
  }

  function hideChatToggle() {
    hideElement(chatToggleBtn);
  }

  // Display message line
  function addMessage(text) {
    const p = document.createElement('p');
    p.textContent = text;
    chatMessages.appendChild(p);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Sending UI event
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = chatInput.value.trim();
    if (!msg) return;
    sendFn(msg);
    addMessage(`You: ${msg}`);
    chatInput.value = '';
  });

  return {
    showChatToggle,
    hideChatToggle,
    addMessage,
  };
}
