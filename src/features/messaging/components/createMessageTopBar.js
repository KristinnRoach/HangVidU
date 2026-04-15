import { renderAvatar } from '../../../shared/components/ui/utils/avatar.js';
import { t } from '../../../shared/i18n/index.js';
import { initIcons } from '../../../shared/components/ui/icons.js';

// TEMP BLOCK AUDIO ONLY CALL FEATURE:
const AUDIO_ONLY_CALL_ENABLED = false;
const AUDIO_CALL_DISPLAY = AUDIO_ONLY_CALL_ENABLED ? 'block' : 'none';

export function createMessageTopBar() {
  const root = document.createElement('div');
  root.className = 'messages-top-bar';
  root.innerHTML = `
    <button type="button" class="messages-topbar-back" aria-label="${t('shared.back')}">
      <i data-lucide="chevron-left" aria-hidden="true"></i>
    </button>
    <div class="messages-topbar-contact">
      <span class="avatar" aria-hidden="true"></span>
      <span class="messages-topbar-name"></span>
    </div>
    <button type="button" style="display: ${AUDIO_CALL_DISPLAY}" class="messages-topbar-audio-call" aria-label="${t('message.audioCall')}">
      <i data-lucide="phone" aria-hidden="true"></i>
    </button>
    <button type="button" class="messages-topbar-call" aria-label="${t('message.videoCall')}">
      <i data-lucide="video" aria-hidden="true"></i>
    </button>
  `;

  const backBtn = root.querySelector('.messages-topbar-back');
  const callBtn = root.querySelector('.messages-topbar-call');
  const audioCallBtn = root.querySelector('.messages-topbar-audio-call');
  const avatarSpan = root.querySelector('.avatar');
  const nameEl = root.querySelector('.messages-topbar-name');

  const setContact = ({ name = '', photoURL = '', pending = false } = {}) => {
    nameEl.textContent = name || t('shared.unknown');
    renderAvatar(avatarSpan, { name, photoURL, pending });
  };

  const setBackHandler = (fn) => {
    backBtn.onclick = fn || null;
  };

  const setCallHandler = (fn) => {
    callBtn.onclick = fn || null;
  };

  const setAudioCallHandler = (fn) => {
    if (audioCallBtn) audioCallBtn.onclick = fn || null;
  };

  const cleanup = () => {
    backBtn.onclick = null;
    callBtn.onclick = null;
    audioCallBtn.onclick = null;
    root.remove();
  };

  initIcons(root);
  return {
    element: root,
    setContact,
    setBackHandler,
    setCallHandler,
    setAudioCallHandler,
    cleanup,
  };
}
