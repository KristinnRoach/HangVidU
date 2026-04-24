// elements.js - Centralized DOM element exports
import { t } from './shared/i18n/index.js';

const getElement = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Element with id: ${id} not found.`);
    return null;
  }
  return el;
};

// Element references - initialized after DOM is ready
let lobbyDiv = null;
let videosWrapper = null;
let localVideoEl = null;
let localBoxEl = null;
let remoteVideoEl = null;
let remoteBoxEl = null;
let sharedVideoEl = null;
let sharedBoxEl = null;
let chatControls = null;
let callBtn = null;
let hangUpBtn = null;
let installBtn = null;
let switchCameraBtn = null;

let mutePartnerBtn = null;
let fullscreenPartnerBtn = null;
let remotePipBtn = null;
let micBtn = null;
let cameraBtn = null;
let exitWatchModeBtn = null;
let appPipBtn = null;

// i18n attributes configuration: { elementId: { attrs: ['attr1', 'attr2'], key: 'translation.key' } }
const i18nElements = {
  'lobby-call-btn': { attrs: ['title'], key: 'call.start' },
  'paste-join-btn': { attrs: ['title'], key: 'a11y.paste_join' },
  'exit-watch-mode-btn': { attrs: ['title'], key: 'media.exit_watch' },
  'camera-btn': { attrs: ['aria-label'], key: 'a11y.camera_toggle' },
  'switch-camera-btn': { attrs: ['aria-label'], key: 'a11y.camera_switch' },
  'mic-btn': { attrs: ['aria-label'], key: 'a11y.mic_toggle' },
  'mute-btn': { attrs: ['aria-label'], key: 'a11y.partner_mute' },
  'fullscreen-partner-btn': { attrs: ['aria-label'], key: 'a11y.fullscreen' },
  'remote-pip-btn': { attrs: ['aria-label'], key: 'a11y.pip' },
  'app-pip-btn': { attrs: ['aria-label'], key: 'a11y.popup' },
};

/**
 * Update all i18n element attributes based on current locale
 */
export function updateI18nElements() {
  Object.entries(i18nElements).forEach(([elementId, { attrs, key }]) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const translation = t(key);
    attrs.forEach((attr) => {
      el.setAttribute(attr, translation);
    });
  });
}

function initializeElements() {
  lobbyDiv = getElement('lobby');

  videosWrapper = getElement('videos');
  localVideoEl = getElement('local-video-el');
  localBoxEl = getElement('local-video-box');
  remoteVideoEl = getElement('remote-video-el');
  remoteBoxEl = getElement('remote-video-box');
  sharedVideoEl = getElement('shared-video-el');
  sharedBoxEl = getElement('shared-video-box');

  chatControls = getElement('chat-controls');
  callBtn = getElement('call-btn');
  hangUpBtn = getElement('hang-up-btn');
  switchCameraBtn = getElement('switch-camera-btn');

  mutePartnerBtn = getElement('mute-btn');
  fullscreenPartnerBtn = getElement('fullscreen-partner-btn');
  remotePipBtn = getElement('remote-pip-btn');
  micBtn = getElement('mic-btn');
  cameraBtn = getElement('camera-btn');
  exitWatchModeBtn = getElement('exit-watch-mode-btn');

  appPipBtn = getElement('app-pip-btn');
}

// Initialize elements when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeElements);
} else {
  initializeElements();
}

// Export getters to ensure we always return current references
export const getElements = () => ({
  lobbyDiv,
  videosWrapper,
  localVideoEl,
  localBoxEl,
  remoteVideoEl,
  remoteBoxEl,
  sharedVideoEl,
  sharedBoxEl,
  chatControls,
  callBtn,
  hangUpBtn,
  installBtn,
  switchCameraBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  remotePipBtn,
  micBtn,
  cameraBtn,
  exitWatchModeBtn,
  appPipBtn,
});

// Export individual elements
export {
  lobbyDiv,
  videosWrapper,
  localVideoEl,
  localBoxEl,
  remoteVideoEl,
  remoteBoxEl,
  sharedVideoEl,
  sharedBoxEl,
  chatControls,
  callBtn,
  hangUpBtn,
  installBtn,
  switchCameraBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  remotePipBtn,
  micBtn,
  cameraBtn,
  exitWatchModeBtn,
  appPipBtn,
};
