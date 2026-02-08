// elements.js - Centralized DOM element exports
import { devDebug } from './utils/dev/dev-utils.js';
import { t, onLocaleChange } from './i18n/index.js';

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
let lobbyCallBtn = null;
let titleAuthBar = null;
// let createLinkBtn = null;
// let copyLinkBtn = null;
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
let switchCameraBtn = null;
let installBtn = null;

let mutePartnerBtn = null;
let fullscreenPartnerBtn = null;
let remotePipBtn = null;
let micBtn = null;
let cameraBtn = null;
let exitWatchModeBtn = null;
let appPipBtn = null;
let appTitleH1 = null;
let appTitleA = null;
let appTitleSpan = null;
let pasteJoinBtn = null;
let addContactBtn = null;
let testNotificationsBtn = null;

// i18n attributes configuration: { elementId: { attrs: ['attr1', 'attr2'], key: 'translation.key' } }
const i18nElements = {
  'app-title-a': { attrs: ['title'], key: 'nav.app_title' },
  'lobby-call-btn': { attrs: ['title'], key: 'call.start' },
  'paste-join-btn': { attrs: ['title'], key: 'a11y.paste_join' },
  'add-contact-btn': { attrs: ['title'], key: 'a11y.add_contact' },
  'test-notifications-btn': { attrs: ['title'], key: 'a11y.test_notifications' },
  'exit-watch-mode-btn': { attrs: ['title'], key: 'media.exit_watch' },
  'searchBtn': { attrs: ['title'], key: 'media.youtube.search' },
  'searchQuery': { attrs: ['placeholder'], key: 'media.youtube.placeholder' },
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
    attrs.forEach(attr => {
      el.setAttribute(attr, translation);
    });
  });
}

function initializeElements() {
  lobbyDiv = getElement('lobby');
  lobbyCallBtn = getElement('lobby-call-btn');

  titleAuthBar = getElement('title-auth-bar');
  // createLinkBtn = getElement('create-link-btn');
  // copyLinkBtn = getElement('copy-link-btn');

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

  appTitleH1 = getElement('app-title-h1');
  appTitleA = getElement('app-title-a');
  appTitleSpan = getElement('app-title-span');
  pasteJoinBtn = getElement('paste-join-btn');
  addContactBtn = getElement('add-contact-btn');
  testNotificationsBtn = getElement('test-notifications-btn');
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
  lobbyCallBtn,
  titleAuthBar,
  // createLinkBtn,
  // copyLinkBtn,
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
  switchCameraBtn,
  installBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  remotePipBtn,
  micBtn,
  cameraBtn,
  exitWatchModeBtn,
  appPipBtn,
  appTitleH1,
  appTitleA,
  appTitleSpan,
  pasteJoinBtn,
  addContactBtn,
  testNotificationsBtn,
});

// Export individual elements
export {
  lobbyDiv,
  lobbyCallBtn,
  titleAuthBar,
  // createLinkBtn,
  // copyLinkBtn,
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
  switchCameraBtn,
  installBtn,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  remotePipBtn,
  micBtn,
  cameraBtn,
  exitWatchModeBtn,
  appPipBtn,
  appTitleH1,
  appTitleA,
  appTitleSpan,
  pasteJoinBtn,
  addContactBtn,
  testNotificationsBtn,
};

/**
 * Robust element access for elements that might be loaded dynamically
 * @param {string} elementId - The element ID to find
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<HTMLElement|null>}
 */
export function robustElementAccess(elementId, maxRetries = 3, delay = 100) {
  return new Promise((resolve) => {
    let attempts = 0;

    const tryAccess = () => {
      const element = document.getElementById(elementId);

      if (element) {
        resolve(element);
        return;
      }

      attempts++;
      if (attempts >= maxRetries) {
        console.warn(
          `Element ${elementId} not found after ${maxRetries} attempts`,
        );
        resolve(null);
        return;
      }

      setTimeout(tryAccess, delay);
    };

    tryAccess();
  });
}

/**
 * Wait for multiple dynamic elements to be available
 * @param {string[]} elementIds - Array of element IDs to wait for
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise<{[key: string]: HTMLElement|null}>}
 */
export async function waitForElements(elementIds, maxRetries = 3, delay = 100) {
  const results = {};

  const promises = elementIds.map(async (id) => {
    const element = await robustElementAccess(id, maxRetries, delay);
    results[id] = element;
    return element;
  });

  await Promise.all(promises);
  return results;
}

/**
 * Initialize YouTube search elements (these are dynamically loaded)
 * @returns {Promise<{searchBtn: HTMLElement|null, searchQuery: HTMLElement|null, searchResults: HTMLElement|null, searchContainer: HTMLElement|null}>}
 */
export async function initializeYouTubeElements() {
  devDebug('Initializing YouTube search elements...');

  // These elements are loaded dynamically by the search UI
  const elements = await waitForElements(
    ['searchBtn', 'searchQuery', 'searchResults'],
    5,
    200,
  ); // More retries and longer delay for dynamic content

  // Search container uses class selector
  const searchContainer = document.querySelector('.search-section');
  elements.searchContainer = searchContainer;

  const missing = Object.entries(elements)
    .filter(([name, element]) => !element)
    .map(([name]) => name);

  if (missing.length > 0) {
    console.warn('Some YouTube elements not found:', missing);
  } else {
    devDebug('All YouTube elements initialized successfully');
  }

  return elements;
}

/**
 * Initialize YouTube player container (dynamically created)
 * @returns {Promise<HTMLElement|null>}
 */
export async function initializeYouTubePlayer() {
  // The YT container might be created dynamically
  const ytContainer = await robustElementAccess('yt-video-box', 3, 150);

  if (!ytContainer) {
    console.warn('YouTube container not found - video features may be limited');
  }

  return ytContainer;
}

/**
 * Check if element exists with optional retry
 * @param {string} elementId - Element ID to check
 * @param {boolean} retry - Whether to retry if not found initially
 * @returns {Promise<boolean>}
 */
export async function elementExists(elementId, retry = false) {
  if (retry) {
    const element = await robustElementAccess(elementId, 2, 50);
    return !!element;
  }

  return !!document.getElementById(elementId);
}

/**
 * Safe element operation - only execute if element exists
 * @param {string} elementId - Element ID
 * @param {function} operation - Function to execute with element
 * @param {boolean} retry - Whether to retry finding element
 * @returns {Promise<any>}
 */
export async function safeElementOperation(
  elementId,
  operation,
  retry = false,
) {
  const element = retry
    ? await robustElementAccess(elementId)
    : document.getElementById(elementId);

  if (element && typeof operation === 'function') {
    return operation(element);
  }

  console.warn(`Cannot perform operation on ${elementId} - element not found`);
  return null;
}
