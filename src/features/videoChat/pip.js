// pip.js - Picture-in-Picture

let documentPipWindow = null;
let isPartnerNativePipActive = false;

let isNativePipActive = () => !!document.pictureInPictureElement;

/**
 * Toggle Picture-in-Picture via custom button
 */
export async function handlePipToggleBtn(
  remoteVideo,
  pipBtn,
  updateStatus,
  preferDocumentOverNativePiP = false
) {
  console.log('[PiP] Toggle requested', {
    hasDocumentPiP: 'documentPictureInPicture' in window,
    hasStream: !!remoteVideo.srcObject,
    hasFloatingWindow: !!document.pictureInPictureElement,
    documentPipWindowOpen: !!documentPipWindow,
    nativePipActive: isNativePipActive(),
  });

  try {
    // Validate stream exists
    if (!remoteVideo.srcObject) {
      console.warn('[PiP] No remote stream available');
      updateStatus('Connect to a partner first');
      return;
    }

    // If native PiP is active, exit it
    if (document.pictureInPictureElement) {
      console.log('[PiP] Exiting active native PiP (via custom button)');
      await document.exitPictureInPicture();
      isPartnerNativePipActive = false;
      pipBtn.textContent = 'Float Partner Video';
      return;
    }

    // Close existing Document PiP
    if (documentPipWindow) {
      console.log('[PiP] Closing existing Document PiP window');
      documentPipWindow.close();
      documentPipWindow = null;
      pipBtn.textContent = 'Float Partner Video';
      return;
    }

    const isVideoHidden = remoteVideo.offsetParent === null;
    if (isVideoHidden && !('documentPictureInPicture' in window)) {
      console.warn('[PiP] Video is hidden and Document PiP not available');
      updateStatus('Switch to Video Chat mode to use floating window');
      return;
    }

    if (preferDocumentOverNativePiP && 'documentPictureInPicture' in window) {
      await openDocumentPiP(remoteVideo, pipBtn);
      return;
    }

    //if ('requestPictureInPicture' in window)
    if ('pictureInPictureEnabled' in document) {
      await toggleNativePiP(remoteVideo, pipBtn);
      return;
    }
  } catch (error) {
    console.error('[PiP] Error:', error.name, error.message, error);

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
    documentPipWindow = await window.documentPictureInPicture.requestWindow({
      width: 400,
      height: 300,
    });

    console.log('[PiP] Document PiP window created', {
      width: documentPipWindow.innerWidth,
      height: documentPipWindow.innerHeight,
      closed: documentPipWindow.closed,
    });

    // Check if window was immediately closed
    if (documentPipWindow.closed) {
      console.error('[PiP] Window was closed immediately after creation');
      documentPipWindow = null;
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
        documentPipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleSheet.href;
        documentPipWindow.document.head.appendChild(link);
      }
    });

    // Create minimal UI
    documentPipWindow.document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;

    const pipVideo = documentPipWindow.document.getElementById('pipVideo');
    const pipMute = documentPipWindow.document.getElementById('pipMute');

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
    console.log(
      '[PiP] Video will autoplay (muted initially for browser policy)'
    );

    // Mute/Unmute button
    let isPipMuted = true; // Starts muted due to autoplay policy
    pipMute.addEventListener('click', () => {
      if (!remoteVideo.srcObject) {
        console.warn('[PiP] Remote stream no longer available');
        return;
      }
      isPipMuted = !isPipMuted;
      pipVideo.muted = isPipMuted;
      // Synchronize main window remoteVideo audio
      if (!isPipMuted) {
        remoteVideo.muted = true;
      } else {
        remoteVideo.muted = false;
      }
      pipMute.textContent = isPipMuted ? 'Unmute Partner' : 'Mute Partner';
      pipMute.style.background = isPipMuted ? '#ff9800' : '#4caf50';
      console.log(
        '[PiP] Partner audio in PiP window:',
        isPipMuted ? 'MUTED' : 'UNMUTED'
      );
    });

    // Handle window close
    documentPipWindow.addEventListener('pagehide', () => {
      console.log('[PiP] Document PiP window closed by user or browser');
      documentPipWindow = null;
      pipBtn.textContent = 'Float Partner Video';
    });

    // Debug: Check if window is actually visible
    documentPipWindow.addEventListener('load', () => {
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
    if (documentPipWindow) {
      documentPipWindow.close();
      documentPipWindow = null;
    }
    throw error; // Re-throw to be caught by main try-catch
  }
}

/**
 * Toggle native video Picture-in-Picture (fallback for Safari/Firefox)
 */
export async function toggleNativePiP(remoteVideo, pipBtn) {
  if (document.pictureInPictureElement) {
    console.log('[PiP] Exiting native PiP');
    await document.exitPictureInPicture();
    isPartnerNativePipActive = false;
    pipBtn.textContent = 'Float Partner Video';
  } else {
    console.log('[PiP] Entering native PiP');
    await remoteVideo.requestPictureInPicture();
    isPartnerNativePipActive = true;
    pipBtn.textContent = 'Exit Float Mode';
  }
}

/**
 * Setup event listeners for native video element PiP controls
 * This syncs state when user clicks browser's built-in PiP button
 */
export function addRemoteVideoPipListeners(remoteVideo, pipBtn) {
  remoteVideo.addEventListener('enterpictureinpicture', () => {
    console.log('[PiP] Remote video entered native PiP (via browser controls)');
    isPartnerNativePipActive = true;
    pipBtn.textContent = 'Exit Float Mode';
  });

  remoteVideo.addEventListener('leavepictureinpicture', () => {
    console.log('[PiP] Remote video exited native PiP (via browser controls)');
    isPartnerNativePipActive = false;
    pipBtn.textContent = 'Float Partner Video';
  });
}

/**
 * Setup event listeners for local video element native PiP
 */
export function addLocalVideoPipListeners(localVideo, pipBtn) {
  localVideo.addEventListener('enterpictureinpicture', () => {
    console.log('[PiP] Local video entered native PiP');
    // Note: When local enters PiP, remote (partner) automatically exits (browser limitation)
    isPartnerNativePipActive = false;
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
  if (documentPipWindow) {
    console.log('[PiP] Closing Document PiP window during cleanup');
    documentPipWindow.close();
    documentPipWindow = null;
  }

  // Exit native PiP if active
  if (isPartnerNativePipActive && document.pictureInPictureElement) {
    console.log('[PiP] Exiting native PiP during cleanup');
    document.exitPictureInPicture().catch((err) => {
      console.warn('[PiP] Failed to exit native PiP:', err);
    });
    isPartnerNativePipActive = false;
  }

  if (pipBtn) {
    pipBtn.textContent = 'Float Partner Video';
    pipBtn.style.display = 'none';
  }

  console.log('[PiP] Cleanup complete');
}

export function disablePictureInPictureOnVidEl(videoElement) {
  videoElement.setAttribute('disablePictureInPicture', 'true');
  videoElement.setAttribute('controlsList', 'nopictureinpicture');
}

export function enablePictureInPictureOnVidEl(videoElement) {
  videoElement.removeAttribute('disablePictureInPicture');
  videoElement.removeAttribute('controlsList');
}
