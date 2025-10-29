// Example: How to use the improved elements.js pattern

import { localVideoEl, micBtn, statusDiv, getElements } from '../elements.js';

// ============================================================================
// PATTERN 1: Direct import with null checks (recommended for most cases)
// ============================================================================

async function setupLocalVideo() {
  // Always check if element exists before using
  if (!localVideoEl) {
    console.error('Local video element not found');
    return false;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    localVideoEl.srcObject = stream;
    return true;
  } catch (error) {
    console.error('Failed to get user media:', error);
    return false;
  }
}

function setupMicButton() {
  // Safe to use - will be null if element doesn't exist
  if (micBtn) {
    micBtn.onclick = () => {
      console.log('Mic button clicked');
      // Your mic toggle logic here
    };
  } else {
    console.warn('Mic button not available');
  }
}

function updateStatus(message) {
  // Defensive programming - always check before using
  if (statusDiv) {
    statusDiv.textContent = message;
  } else {
    // Fallback to console if status div not available
    console.log('Status:', message);
  }
}

// ============================================================================
// PATTERN 2: Batch element access (useful for initialization)
// ============================================================================

function initializeUI() {
  const elements = getElements();

  // Check multiple elements at once
  const requiredElements = [
    'localVideoEl',
    'remoteVideoEl',
    'callBtn',
    'hangUpBtn',
  ];

  const missingElements = requiredElements.filter((name) => !elements[name]);

  if (missingElements.length > 0) {
    console.error('Missing required elements:', missingElements);
    return false;
  }

  // All required elements exist, safe to proceed
  elements.callBtn.onclick = startCall;
  elements.hangUpBtn.onclick = endCall;

  return true;
}

// ============================================================================
// PATTERN 3: Graceful degradation
// ============================================================================

function setupOptionalFeatures() {
  const elements = getElements();

  // Optional feature: Picture-in-Picture
  if (elements.appPipBtn && 'pictureInPictureEnabled' in document) {
    elements.appPipBtn.onclick = togglePictureInPicture;
    elements.appPipBtn.style.display = 'block';
  }

  // Optional feature: Camera switching
  if (elements.switchCameraBtn) {
    checkCameraSupport().then((hasMultipleCameras) => {
      if (hasMultipleCameras) {
        elements.switchCameraBtn.style.display = 'block';
        elements.switchCameraBtn.onclick = switchCamera;
      }
    });
  }

  // Optional feature: Install prompt
  if (elements.installBtn) {
    window.addEventListener('beforeinstallprompt', (e) => {
      elements.installBtn.style.display = 'block';
      elements.installBtn.onclick = () => e.prompt();
    });
  }
}

// ============================================================================
// PATTERN 4: Error recovery and retry
// ============================================================================

function robustElementAccess(elementName, maxRetries = 3, delay = 100) {
  return new Promise((resolve) => {
    let attempts = 0;

    const tryAccess = () => {
      const elements = getElements();
      const element = elements[elementName];

      if (element) {
        resolve(element);
        return;
      }

      attempts++;
      if (attempts >= maxRetries) {
        console.warn(
          `Element ${elementName} not found after ${maxRetries} attempts`
        );
        resolve(null);
        return;
      }

      // Wait and retry (useful for dynamically loaded content)
      setTimeout(tryAccess, delay);
    };

    tryAccess();
  });
}

// Usage of robust access
async function setupVideoWithRetry() {
  const videoEl = await robustElementAccess('localVideoEl');

  if (videoEl) {
    // Element found, proceed normally
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoEl.srcObject = stream;
  } else {
    // Fallback behavior
    console.error('Could not access video element, using fallback');
    // Maybe show an error message or use alternative approach
  }
}

// ============================================================================
// HELPER FUNCTIONS (examples)
// ============================================================================

async function startCall() {
  updateStatus('Starting call...');
  // Call logic here
}

async function endCall() {
  updateStatus('Call ended');
  // Cleanup logic here
}

async function togglePictureInPicture() {
  if (localVideoEl && document.pictureInPictureElement !== localVideoEl) {
    await localVideoEl.requestPictureInPicture();
  } else if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  }
}

async function switchCamera() {
  // Camera switching logic
  console.log('Switching camera...');
}

async function checkCameraSupport() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    );
    return videoDevices.length > 1;
  } catch {
    return false;
  }
}

// ============================================================================
// INITIALIZATION EXAMPLE
// ============================================================================

async function initializeApp() {
  // Wait a bit for DOM to be fully ready (if needed)
  await new Promise((resolve) => setTimeout(resolve, 10));

  // Initialize core UI
  const uiReady = initializeUI();
  if (!uiReady) {
    console.error('Failed to initialize core UI');
    return false;
  }

  // Setup video
  const videoReady = await setupLocalVideo();
  if (!videoReady) {
    updateStatus('Camera access failed');
  }

  // Setup controls
  setupMicButton();

  // Setup optional features
  setupOptionalFeatures();

  updateStatus('App ready');
  return true;
}

// Start the app
initializeApp().catch(console.error);

export {
  setupLocalVideo,
  setupMicButton,
  updateStatus,
  initializeUI,
  setupOptionalFeatures,
  robustElementAccess,
  initializeApp,
};
