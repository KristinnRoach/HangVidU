// pip.js
let pipWindow = null;
// let pipVideo = null;
// let pipMute = null;

export async function togglePiP2(remoteVideo, pipBtn, updateStatus) {
  try {
    // Close existing PiP
    if (pipWindow) {
      pipWindow.close();
      pipWindow = null;
      pipBtn.textContent = 'Float Partner Video';
      return;
    }

    // Try Document PiP first (Chrome/Edge only)
    if ('documentPictureInPicture' in window) {
      pipWindow = await window.documentPictureInPicture.requestWindow({
        width: 400,
        height: 300,
      });

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
          <video id="pipVideo" autoplay playsinline style="flex: 1; width: 100%; background: #000;"></video>
          <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
            Mute Partner
          </button>
        </div>
      `;

      const pipVideo = pipWindow.document.getElementById('pipVideo');
      const pipMute = pipWindow.document.getElementById('pipMute');

      // Move stream to PiP video
      pipVideo.srcObject = remoteVideo.srcObject;

      // Mute button
      pipMute.addEventListener('click', () => {
        const audioTrack = remoteVideo.srcObject.getAudioTracks()[0];
        if (audioTrack) {
          audioTrack.enabled = !audioTrack.enabled;
          pipMute.textContent = audioTrack.enabled
            ? 'Mute Partner'
            : 'Unmute Partner';
          pipMute.style.background = audioTrack.enabled ? '#ff9800' : '#4caf50';
        }
      });

      // Restore on close
      pipWindow.addEventListener('pagehide', () => {
        pipWindow = null;
        pipBtn.textContent = 'Float Partner Video';
      });

      pipBtn.textContent = 'Close Float Window';
    } else {
      // Fallback to regular video PiP
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        pipBtn.textContent = 'Float Partner Video';
      } else {
        await remoteVideo.requestPictureInPicture();
        pipBtn.textContent = 'Exit Float Mode';
      }
    }
  } catch (error) {
    console.error('PiP error:', error);
    updateStatus('Picture-in-Picture not supported');
  }
}
