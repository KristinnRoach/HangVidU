// Face Mask Trigger - Right-click or Long-press detection
import {
  initFaceMask,
  destroyFaceMask,
  isFaceMaskActive,
  capturePhoto,
  toggleMask,
  clearMask,
  preloadFaceMaskLibraries,
} from './face-mask-simple.js';

// Re-export preload function for convenience
export { preloadFaceMaskLibraries };

const LONG_PRESS_DURATION = 800; // ms

let longPressTimer = null;
let isLongPressTriggered = false;

/**
 * Setup face mask triggers on video elements
 * @param {HTMLVideoElement} localVideo - Local video element
 * @param {HTMLVideoElement} remoteVideo - Remote video element
 */
export function setupFaceMaskTriggers(localVideo, remoteVideo) {
  if (!localVideo) {
    console.warn('[FaceMask] Local video element not found');
    return;
  }

  // Setup for local video ONLY (simpler for now)
  setupVideoTriggers(localVideo, 'local');

  console.log('[FaceMask] Triggers setup complete (local video only)');
}

/**
 * Setup triggers for a single video element
 */
function setupVideoTriggers(videoElement, label) {
  // Desktop: Right-click
  videoElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleFaceMaskTrigger(videoElement, label);
  });

  // Mobile: Long-press (touch)
  videoElement.addEventListener('touchstart', (e) => {
    isLongPressTriggered = false;

    longPressTimer = setTimeout(() => {
      isLongPressTriggered = true;
      // Haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
      handleFaceMaskTrigger(videoElement, label);
    }, LONG_PRESS_DURATION);
  });

  videoElement.addEventListener('touchend', () => {
    clearTimeout(longPressTimer);
  });

  videoElement.addEventListener('touchmove', () => {
    clearTimeout(longPressTimer);
  });
}

/**
 * Handle face mask activation
 */
async function handleFaceMaskTrigger(videoElement, label) {
  console.log(`[FaceMask] Triggered on ${label} video`);

  if (isFaceMaskActive()) {
    // Show menu to control existing mask
    showFaceMaskMenu(videoElement);
  } else {
    // Initialize face mask
    const container = videoElement.parentElement;
    if (!container) {
      console.error('[FaceMask] No parent container found');
      return;
    }

    try {
      await initFaceMask(videoElement, container);
      showFaceMaskMenu(videoElement);
    } catch (error) {
      console.error('[FaceMask] Failed to initialize:', error);
    }
  }
}

/**
 * Show a simple menu for face mask controls
 * Uses native confirm/prompt for MVP - can be replaced with custom UI later
 */
function showFaceMaskMenu(videoElement) {
  const options = [
    'Capture Photo',
    'Toggle Mask',
    'Clear Mask',
    'Close Face Mask',
    'Cancel',
  ];

  // Simple alert-based menu (can be replaced with custom modal)
  const choice = prompt(
    'Face Mask Controls:\n' +
      '1. Capture Photo\n' +
      '2. Toggle Mask\n' +
      '3. Clear Mask\n' +
      '4. Close Face Mask\n' +
      '5. Cancel\n\n' +
      'Enter number (1-5):',
    '1'
  );

  switch (choice) {
    case '1':
      capturePhoto();
      break;
    case '2':
      toggleMask();
      break;
    case '3':
      clearMask();
      break;
    case '4':
      destroyFaceMask();
      break;
    case '5':
    default:
      // Cancel - do nothing
      break;
  }
}

/**
 * Cleanup - remove all event listeners
 */
export function cleanupFaceMaskTriggers() {
  // Note: In production, you'd want to store the listener references
  // and remove them properly. For now, destroying the face mask is sufficient.
  destroyFaceMask();
}
