// src/webrtc/webrtc.js

import { devDebug } from '../utils/dev/dev-utils.js';
import { enterCallMode, exitCallMode, clearUrlParam } from '../main.js';
import { updateStatus } from '../utils/ui/status.js';
import { onCallAnswered } from '../components/calling/calling-ui.js';
import CallController from './call-controller.js';

let disconnectTimeoutId = null;
let activePC = null; // connection reference

export function setupConnectionStateHandlers(pc) {
  activePC = pc; // Mark as active

  pc.onconnectionstatechange = () => {
    devDebug('onconnectionstatechange:', pc.connectionState);

    if (pc.connectionState === 'connected') {
      updateStatus('Connected!');
      enterCallMode();
      // Ensure any calling overlay is dismissed once connected
      onCallAnswered().catch((e) =>
        console.warn('Failed to clear calling state on connect:', e)
      );
      // Clear any pending disconnect timeout if we reconnect
      if (disconnectTimeoutId) {
        clearTimeout(disconnectTimeoutId);
        disconnectTimeoutId = null;
      }
    } else if (pc.connectionState === 'disconnected') {
      updateStatus('Partner disconnected (reconnecting...)');

      // Wait 3 seconds before hanging up to allow transient disconnects to recover
      if (disconnectTimeoutId) clearTimeout(disconnectTimeoutId);
      disconnectTimeoutId = setTimeout(() => {
        // Only hang up if still disconnected after grace period and this is still the active connection
        if (pc === activePC && pc.connectionState === 'disconnected') {
          updateStatus('Partner disconnected');
          CallController.hangUp({
            emitCancel: true,
            reason: 'connection_lost',
          });
        }
        disconnectTimeoutId = null;
      }, 3000);
    } else if (pc.connectionState === 'failed') {
      updateStatus('Connection failed');
      clearUrlParam();
      // Clear any pending disconnect timeout
      if (disconnectTimeoutId) {
        clearTimeout(disconnectTimeoutId);
        disconnectTimeoutId = null;
      }
      // Immediately hang up on failed (no grace period needed)
      CallController.hangUp({ emitCancel: true, reason: 'connection_failed' });
    }
  };

  pc.addEventListener('iceconnectionstatechange', (e) => {
    devDebug('ICE iceconnectionstatechange:', pc.iceConnectionState);
    if (pc.iceConnectionState === 'failed') {
      /* possibly reconfigure the connection in some way here */
      /* then request ICE restart */
      console.warn('ICE connection failed, restarting ICE...');
      pc.restartIce();
    }
  });
}
