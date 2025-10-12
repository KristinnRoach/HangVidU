// pip.js - Robust Picture-in-Picture implementation

let pipWindow = null;
let isNativePipActive = false;

/**
 * Main PiP toggle function with comprehensive error handling
 */
export async function togglePiP(remoteVideo, pipBtn, updateStatus) {
  console.log('[PiP] Toggle requested', {
    hasDocumentPiP: 'documentPictureInPicture' in window,
    hasStream: !!remoteVideo.srcObject,
    pipWindowOpen: !!pipWindow,
    nativePipActive: isNativePipActive,
  });

  try {
    // Validate stream exists
    if (!remoteVideo.srcObject) {
      console.warn('[PiP] No remote stream available');
      updateStatus('Connect to a partner first');
      return;
    }

    // Close existing Document PiP
    if (pipWindow) {
      console.log('[PiP] Closing existing Document PiP window');
      pipWindow.close();
      pipWindow = null;
      pipBtn.textContent = 'Float Partner Video';
      return;
    }

    // Try Document PiP first (Chrome/Edge only)
    if ('documentPictureInPicture' in window) {
      await openDocumentPiP(remoteVideo, pipBtn);
    } else {
      // Fallback to native video PiP
      await toggleNativePiP(remoteVideo, pipBtn);
    }
  } catch (error) {
    console.error('[PiP] Error:', error.name, error.message, error);
    
    // User-friendly error messages
    if (error.name === 'NotAllowedError') {
      updateStatus('Picture-in-Picture blocked. Check browser permissions.');
    } else if (error.name === 'InvalidStateError') {
      updateStatus('Cannot open PiP - video not ready');
    } else {
      updateStatus('Picture-in-Picture failed. See console for details.');
    }
  }
}

/**
 * Open Document Picture-in-Picture window (Chrome/Edge)
 */
async function openDocumentPiP(remoteVideo, pipBtn) {
  console.log('[PiP] Opening Document PiP window');
  
  try {
    pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 400,
      height: 300,
    });

    console.log('[PiP] Document PiP window created', {
      width: pipWindow.innerWidth,
      height: pipWindow.innerHeight,
      closed: pipWindow.closed,
    });

    // Check if window was immediately closed
    if (pipWindow.closed) {
      console.error('[PiP] Window was closed immediately after creation');
      pipWindow = null;
      throw new Error('PiP window closed immediately');
    }

  // Copy styles
  [...document.styleSheets].forEach((styleSheet) => {
    try {
      const cssRules = [...styleSheet.cssRules]
        .map((rule) => rule.cssText)
        .join('');
      const style = document.createElement('style');
      style.textContent = cssRules;
      pipWindow.document.head.appendChild(style);
    } catch (e) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = styleSheet.href;
      pipWindow.document.head.appendChild(link);
    }
  });

  // Create minimal UI
  pipWindow.document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;

  const pipVideo = pipWindow.document.getElementById('pipVideo');
  const pipMute = pipWindow.document.getElementById('pipMute');

  // Validate stream has active tracks
  const videoTracks = remoteVideo.srcObject.getVideoTracks();
  const audioTracks = remoteVideo.srcObject.getAudioTracks();
  console.log('[PiP] Stream tracks:', {
    video: videoTracks.length,
    audio: audioTracks.length,
    videoActive: videoTracks[0]?.enabled,
    audioActive: audioTracks[0]?.enabled,
  });

  // Move stream to PiP video
  pipVideo.srcObject = remoteVideo.srcObject;
  console.log('[PiP] Stream attached to PiP video');

  // Note: Video starts muted to allow autoplay (browser policy)
  // User can unmute with the button below
  console.log('[PiP] Video will autoplay (muted initially for browser policy)');

  // Mute/Unmute button
  let isPipMuted = true; // Starts muted due to autoplay policy
  pipMute.addEventListener('click', () => {
    if (!remoteVideo.srcObject) {
      console.warn('[PiP] Remote stream no longer available');
      return;
    }
    
    isPipMuted = !isPipMuted;
    pipVideo.muted = isPipMuted;
    
    pipMute.textContent = isPipMuted ? 'Unmute Partner' : 'Mute Partner';
    pipMute.style.background = isPipMuted ? '#ff9800' : '#4caf50';
    console.log('[PiP] Partner audio in PiP window:', isPipMuted ? 'MUTED' : 'UNMUTED');
  });

  // Handle window close
  pipWindow.addEventListener('pagehide', () => {
    console.log('[PiP] Document PiP window closed by user or browser');
    pipWindow = null;
    pipBtn.textContent = 'Float Partner Video';
  });

  // Debug: Check if window is actually visible
  pipWindow.addEventListener('load', () => {
    console.log('[PiP] Document PiP window loaded event fired');
  });

  // Add error handler for the PiP video element
  pipVideo.addEventListener('error', (e) => {
    console.error('[PiP] Video element error:', e);
  });

  pipVideo.addEventListener('loadedmetadata', () => {
    console.log('[PiP] Video metadata loaded in PiP window');
  });

  pipBtn.textContent = 'Close Float Window';
  console.log('[PiP] Document PiP setup complete');
  } catch (error) {
    console.error('[PiP] Error during Document PiP setup:', error);
    if (pipWindow) {
      pipWindow.close();
      pipWindow = null;
    }
    throw error; // Re-throw to be caught by main try-catch
  }
}

/**
 * Toggle native video Picture-in-Picture (fallback for Safari/Firefox)
 */
async function toggleNativePiP(remoteVideo, pipBtn) {
  if (document.pictureInPictureElement) {
    console.log('[PiP] Exiting native PiP');
    await document.exitPictureInPicture();
    isNativePipActive = false;
    pipBtn.textContent = 'Float Partner Video';
  } else {
    console.log('[PiP] Entering native PiP');
    await remoteVideo.requestPictureInPicture();
    isNativePipActive = true;
    pipBtn.textContent = 'Exit Float Mode';
  }
}

/**
 * Setup event listeners for native video PiP controls
 * This syncs state when user clicks browser's built-in PiP button
 */
export function setupNativePipListeners(remoteVideo, pipBtn) {
  console.log('[PiP] Setting up native PiP event listeners for remote video');

  remoteVideo.addEventListener('enterpictureinpicture', () => {
    console.log('[PiP] Remote video entered native PiP (via browser controls)');
    isNativePipActive = true;
    pipBtn.textContent = 'Exit Float Mode';
  });

  remoteVideo.addEventListener('leavepictureinpicture', () => {
    console.log('[PiP] Remote video exited native PiP (via browser controls)');
    isNativePipActive = false;
    pipBtn.textContent = 'Float Partner Video';
  });
}

/**
 * Setup event listeners for local video PiP
 * Currently disabled via disablePictureInPicture attribute,
 * but listeners are here for easy re-enabling if needed
 */
export function setupLocalVideoPipListeners(localVideo, pipBtn) {
  console.log('[PiP] Setting up native PiP event listeners for local video (currently disabled)');

  localVideo.addEventListener('enterpictureinpicture', () => {
    console.log('[PiP] Local video entered native PiP');
    // Note: When local enters PiP, remote automatically exits (browser limitation)
    isNativePipActive = false;
    pipBtn.textContent = 'Float Partner Video';
  });

  localVideo.addEventListener('leavepictureinpicture', () => {
    console.log('[PiP] Local video exited native PiP');
  });
}

/**
 * Cleanup function to close any open PiP windows
 */
export function closePiP(pipBtn) {
  console.log('[PiP] Cleanup requested');

  // Close Document PiP if open
  if (pipWindow) {
    console.log('[PiP] Closing Document PiP window during cleanup');
    pipWindow.close();
    pipWindow = null;
  }

  // Exit native PiP if active
  if (isNativePipActive && document.pictureInPictureElement) {
    console.log('[PiP] Exiting native PiP during cleanup');
    document.exitPictureInPicture().catch((err) => {
      console.warn('[PiP] Failed to exit native PiP:', err);
    });
    isNativePipActive = false;
  }

  if (pipBtn) {
    pipBtn.textContent = 'Float Partner Video';
    pipBtn.style.display = 'none';
  }

  console.log('[PiP] Cleanup complete');
}
