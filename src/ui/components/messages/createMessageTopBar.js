import { renderAvatar } from '../../utils/avatar.js';
import { t } from '../../../i18n/index.js';
import { initIcons } from '../../icons.js';

export function createMessageTopBar() {
  const root = document.createElement('div');
  root.className = 'messages-top-bar';
  root.innerHTML = `
    <button type="button" class="messages-topbar-back" aria-label="${t('shared.back')}">
      <i data-lucide="chevron-left" aria-hidden="true"></i>
    </button>
    <div class="messages-topbar-contact">
      <span class="messages-topbar-avatar" aria-hidden="true"></span>
      <span class="messages-topbar-name"></span>
    </div>
    <button type="button" class="messages-topbar-call" aria-label="${t('message.call')}">
      <i data-lucide="phone" aria-hidden="true"></i>
    </button>
  `;

  const backBtn = root.querySelector('.messages-topbar-back');
  const callBtn = root.querySelector('.messages-topbar-call');
  const avatar = root.querySelector('.messages-topbar-avatar');
  const nameEl = root.querySelector('.messages-topbar-name');

  const setContact = ({ name = '', photoURL = '' } = {}) => {
    nameEl.textContent = name || t('shared.unknown');
    renderAvatar(avatar, { name, photoURL, imageClass: 'has-image' });
  };

  const setBackHandler = (fn) => {
    backBtn.onclick = fn || null;
  };

  const setCallHandler = (fn) => {
    callBtn.onclick = fn || null;
  };

  const cleanup = () => {
    backBtn.onclick = null;
    callBtn.onclick = null;
    root.remove();
  };

  initIcons(root);
  return { element: root, setContact, setBackHandler, setCallHandler, cleanup };
}
