// elements.js - Centralized DOM element exports
import { devDebug } from './utils/dev/dev-utils.js';

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
let statusDiv = null;
let syncStatus = null;
let mutePartnerBtn = null;
let fullscreenPartnerBtn = null;
let micBtn = null;
let cameraBtn = null;
let appPipBtn = null;
let appTitleH1 = null;
let appTitleA = null;
let appTitleSpan = null;

function initializeElements() {
  lobbyDiv = getElement('lobby');
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

  statusDiv = getElement('status');
  syncStatus = getElement('sync-status');

  mutePartnerBtn = getElement('mute-btn');
  fullscreenPartnerBtn = getElement('fullscreen-partner-btn');
  micBtn = getElement('mic-btn');
  cameraBtn = getElement('camera-btn');

  appPipBtn = getElement('app-pip-btn');

  appTitleH1 = getElement('app-title-h1');
  appTitleA = getElement('app-title-a');
  appTitleSpan = getElement('app-title-span');
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
  statusDiv,
  syncStatus,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  micBtn,
  cameraBtn,
  appPipBtn,
  appTitleH1,
  appTitleA,
  appTitleSpan,
});

// Export individual elements (backward compatibility)
export {
  lobbyDiv,
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
  statusDiv,
  syncStatus,
  mutePartnerBtn,
  fullscreenPartnerBtn,
  micBtn,
  cameraBtn,
  appPipBtn,
  appTitleH1,
  appTitleA,
  appTitleSpan,
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
          `Element ${elementId} not found after ${maxRetries} attempts`
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
    200
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
  retry = false
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
