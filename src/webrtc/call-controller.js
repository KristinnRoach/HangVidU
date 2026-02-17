// src/webrtc/call-controller.js
// Thin CallController wrapper: small public API that delegates to existing
// `webrtc/call-flow.js` functions. Keeps a small in-memory call state and
// exposes an event API for the UI.

import {
  createCall as createCallFlow,
  answerCall as answerCallFlow,
} from './call-flow.js';
import {
  createDataConnection,
  joinDataConnection,
  closeDataConnection,
} from './data-connection.js';
import RoomService from '../room.js';
import { getUserId } from '../auth/auth-state.js';
import { ref, off } from 'firebase/database';
import {
  onDataChange,
  rtdb,
  removeRTDBListenersForRoom,
} from '../storage/fb-rtdb/rtdb.js';
import { devDebug } from '../utils/dev/dev-utils.js';
import { FileTransferController } from '../file-transfer/file-transfer-controller.js';
import { StreamingFileWriter } from '../file-transfer/streaming-file-writer.js';
import { messagesUI } from '../components/messages/messages-ui.js';
import { cleanupWatchSync } from '../firebase/watch-sync.js';

export function createCallController() {
  return new CallController();
}

class SimpleEmitter {
  constructor() {
    this.listeners = new Map();
  }
  on(name, fn) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(fn);
  }
  off(name, fn) {
    if (!this.listeners.has(name)) return;
    this.listeners.get(name).delete(fn);
  }
  emit(name, payload) {
    if (!this.listeners.has(name)) return;
    for (const fn of Array.from(this.listeners.get(name))) {
      try {
        fn(payload);
      } catch (e) {
        console.warn('CallController listener error', e);
      }
    }
  }
}

class CallController {
  constructor() {
    this.emitter = new SimpleEmitter();
    this.resetState();
  }

  resetState() {
    this.state = 'idle';
    this.roomId = null;
    this.roomLink = null;
    this.role = null; // initiator | joiner
    this.partnerId = null;
    this.pc = null;
    this.dataPC = null;

    this.fileTransferController = null;
    this.dataChannel = null;
    this.messagesUI = null;
    this.localVideoEl = null;
    this.remoteVideoEl = null;
    this.isHangingUp = false;
    this.isCleaningUp = false;
    this.listeners = new Map(); // Track RTDB listeners for cleanup
    this.wasConnected = false;
  }

  getState() {
    return {
      state: this.state,
      roomId: this.roomId,
      roomLink: this.roomLink,
      role: this.role,
      partnerId: this.partnerId,
      hasPc: !!this.pc,
      isHangingUp: this.isHangingUp,
      isCleaningUp: this.isCleaningUp,
    };
  }

  /**
   * Return the current RTCPeerConnection with diagnostic logging.
   * Logs warnings for missing or unhealthy connections.
   */
  getPeerConnection() {
    if (!this.pc) {
      console.warn('CallController.getPeerConnection: pc is null', {
        state: this.state,
        roomId: this.roomId,
        role: this.role,
        isHangingUp: this.isHangingUp,
        isCleaningUp: this.isCleaningUp,
      });
      return null;
    }

    const { connectionState, iceConnectionState, signalingState } = this.pc;
    if (connectionState === 'closed' || iceConnectionState === 'closed') {
      console.warn('CallController.getPeerConnection: pc is closed', {
        connectionState,
        iceConnectionState,
        signalingState,
      });
    }

    return this.pc;
  }

  on(name, fn) {
    this.emitter.on(name, fn);
  }
  off(name, fn) {
    this.emitter.off(name, fn);
  }

  /**
   * Set the partner user ID. Called when a partner joins the call.
   * @param {string} partnerId - The partner's user ID
   */
  setPartnerId(partnerId) {
    this.partnerId = partnerId;
  }

  /**
   * Setup cancellation listener for active call.
   * Tracks listener for cleanup and triggers cleanupCall when remote party hangs up.
   * @param {string} roomId - Room ID to listen for cancellation
   */
  setupCancellationListener(roomId) {
    if (!roomId) return;

    const cancellationRef = ref(rtdb, `rooms/${roomId}/cancellation`);
    let cancellationHandled = false;

    const onCancellation = async (snapshot) => {
      const cancel = snapshot.val();
      if (!cancel) return;
      if (cancellationHandled) return;

      // Ignore cancellations written by the current user (self-triggered)
      // This prevents duplicate cleanup when user hangs up (hangUp writes cancellation, then listener fires)
      const currentUserId = getUserId();
      if (cancel.by === currentUserId) {
        devDebug('Ignoring self-triggered cancellation', {
          roomId,
          userId: currentUserId,
        });
        return;
      }

      cancellationHandled = true;

      devDebug('Call cancelled by partner', { roomId, cancel });
      devDebug('Partner disconnected');

      // Clear remote video to prevent frozen frame
      try {
        if (this.remoteVideoEl) {
          this.remoteVideoEl.srcObject = null;
        }
      } catch (e) {
        console.warn('Failed to clear remote video after cancellation', e);
      }

      // Close peer connections
      closeDataConnection(this.dataPC);
      try {
        if (this.pc) {
          this.pc.close();
        }
      } catch (_) {}

      // Trigger cleanup (will emit events for UI updates)
      try {
        await this.cleanupCall({
          reason: cancel.reason || 'remote_cancelled',
        });
      } catch (e) {
        console.warn('Failed to trigger CallController cleanup', e);
      }
    };

    // Attach listener
    onDataChange(cancellationRef, onCancellation, roomId);

    // Track listener for cleanup
    if (!this.listeners.has('cancellation')) {
      this.listeners.set('cancellation', []);
    }
    this.listeners.get('cancellation').push({
      ref: cancellationRef,
      callback: onCancellation,
      roomId,
    });
  }

  /**
   * Setup answer listener for call initiation.
   * Tracks listener for cleanup and handles SDP answer from joiner.
   * @param {string} roomId - Room ID to listen for answer
   * @param {RTCPeerConnection} pc - Peer connection to set remote description on
   * @param {Function} drainIceCandidateQueue - Function to drain queued ICE candidates
   */
  setupAnswerListener(roomId, pc, drainIceCandidateQueue) {
    if (!roomId || !pc) return;

    const answerRef = ref(rtdb, `rooms/${roomId}/answer`);
    const answerCallback = async (snapshot) => {
      const answer = snapshot.val();
      if (answer) {
        const { setRemoteDescription } = await import('./webrtc-utils.js');
        await setRemoteDescription(pc, answer, drainIceCandidateQueue);
      }
    };

    // Attach listener
    onDataChange(answerRef, answerCallback, roomId);

    // Track listener for cleanup
    if (!this.listeners.has('answer')) {
      this.listeners.set('answer', []);
    }
    this.listeners.get('answer').push({
      ref: answerRef,
      callback: answerCallback,
      roomId,
    });
  }

  /**
   * Setup rejection listener for call initiation.
   * Tracks listener for cleanup and handles instant rejection feedback.
   * @param {string} roomId - Room ID to listen for rejection
   */
  setupRejectionListener(roomId) {
    if (!roomId) return;

    const rejectionRef = ref(rtdb, `rooms/${roomId}/rejection`);
    let rejectionHandled = false;

    const onRejection = async (snapshot) => {
      const rej = snapshot.val();
      if (!rej) return;

      if (rejectionHandled) return;
      rejectionHandled = true;

      // If already connected, ignore late rejection
      if (this.pc?.connectionState === 'connected') return;

      devDebug('Call rejected by partner', { roomId, rej });

      // Import onCallRejected dynamically to avoid circular dependencies
      try {
        const { onCallRejected } =
          await import('../components/calling/calling-ui.js');
        await onCallRejected(rej.reason || 'user_rejected');
      } catch (_) {
        devDebug('Call declined');
      }

      // Cleanup
      try {
        await RoomService.leaveRoom(getUserId(), roomId);
      } catch (e) {
        // non-fatal
      }

      try {
        if (this.pc) {
          this.pc.close();
        }
      } catch (_) {}
    };

    // Attach listener
    onDataChange(rejectionRef, onRejection, roomId);

    // Track listener for cleanup
    if (!this.listeners.has('rejection')) {
      this.listeners.set('rejection', []);
    }
    this.listeners.get('rejection').push({
      ref: rejectionRef,
      callback: onRejection,
      roomId,
    });
  }

  /**
   * Setup member-joined listener for the call.
   * Tracks listener for cleanup and emits memberJoined event.
   * @param {string} roomId - Room ID to listen for member joins
   */
  setupMemberJoinedListener(roomId) {
    if (!roomId) return;

    const userId = getUserId();
    const onMemberJoinedCallback = (snapshot) => {
      if (snapshot.key !== userId) {
        // Store partner ID when they join
        this.setPartnerId(snapshot.key);

        // Emit memberJoined event
        this.emitter.emit('memberJoined', {
          memberId: snapshot.key,
          roomId,
        });
      }
    };

    // Attach listener via RoomService
    RoomService.onMemberJoined(roomId, onMemberJoinedCallback);

    // Track listener for cleanup
    if (!this.listeners.has('member-joined')) {
      this.listeners.set('member-joined', []);
    }
    this.listeners.get('member-joined').push({
      callback: onMemberJoinedCallback,
      roomId,
    });
  }

  /**
   * Setup member-left listener for the call.
   * Tracks listener for cleanup and emits memberLeft event.
   * @param {string} roomId - Room ID to listen for member departures
   */
  setupMemberLeftListener(roomId) {
    if (!roomId) return;

    const userId = getUserId();
    const onMemberLeftCallback = (snapshot) => {
      if (snapshot.key !== userId && this.pc?.connectionState === 'connected') {
        // Emit memberLeft event
        this.emitter.emit('memberLeft', {
          memberId: snapshot.key,
          roomId,
        });
      }
    };

    // Attach listener via RoomService
    RoomService.onMemberLeft(roomId, onMemberLeftCallback);

    // Track listener for cleanup
    if (!this.listeners.has('member-left')) {
      this.listeners.set('member-left', []);
    }
    this.listeners.get('member-left').push({
      callback: onMemberLeftCallback,
      roomId,
    });
  }

  /**
   * Remove all tracked listeners during cleanup
   */
  removeTrackedListeners() {
    // Remove firebase listeners synchronously using the imported `off`.
    try {
      for (const [type, listenerArray] of this.listeners.entries()) {
        for (const listener of listenerArray) {
          try {
            // Only use off() for listeners that have a ref (cancellation, rejection)
            // Member listeners are managed by RoomService and cleaned up via removeRTDBListenersForRoom
            if (listener.ref) {
              off(listener.ref, 'value', listener.callback);
            }
          } catch (e) {
            console.warn(`Failed to remove ${type} listener`, e);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to remove tracked listeners', e);
    } finally {
      // Clear tracking synchronously so callers can rely on immediate state.
      this.listeners.clear();
    }

    // Clean up room-scoped RTDB listeners (member-joined, member-left)
    if (this.roomId) {
      try {
        removeRTDBListenersForRoom(this.roomId);
      } catch (e) {
        console.warn('Failed to remove RTDB listeners for room', e);
      }
    }
  }

  /**
   * Create a new call as the initiator
   * @param {Object} options - Call options (localStream, remoteVideoEl, etc.)
   * @returns {Promise<Object>} Result with success flag and call artifacts
   */
  async createCall(options = {}) {
    this.state = 'creating';
    try {
      // Store video element references if provided
      if (options.localVideoEl) {
        this.localVideoEl = options.localVideoEl;
      }
      if (options.remoteVideoEl) {
        this.remoteVideoEl = options.remoteVideoEl;
      }

      const result = await createCallFlow(options);
      if (!result || !result.success) {
        this.state = 'idle';
        this.emitter.emit('error', { phase: 'createCall', detail: result });
        this.emitCallFailed('createCall', result);
        return result;
      }

      // Store artifacts
      this.pc = result.pc;
      this.roomId = result.roomId;
      this.roomLink = result.roomLink || null;
      this.role = result.role || 'initiator';
      this.messagesUI = result.messagesUI || null;
      this.state = 'waiting';

      // Track connection state
      if (this.pc && typeof this.pc.addEventListener === 'function') {
        this.pc.addEventListener('connectionstatechange', () => {
          if (this.pc.connectionState === 'connected') {
            this.wasConnected = true;
            if (this.state !== 'connected') this.state = 'connected';
          }
        });
      }

      // Create dedicated data connection for file transfer
      try {
        const dataResult = await createDataConnection(this.roomId);
        this.dataPC = dataResult.pc;
        this.dataChannel = dataResult.dataChannel;
        this.setupFileTransport(this.dataChannel);
      } catch (err) {
        console.warn('[CallController] Failed to create data connection:', err);
      }

      // Setup answer listener (only for initiator) - must be set up before other listeners
      // Import drainIceCandidateQueue dynamically
      const { drainIceCandidateQueue } = await import('./ice.js');
      this.setupAnswerListener(this.roomId, this.pc, drainIceCandidateQueue);

      // Setup cancellation listener (centralized in CallController)
      this.setupCancellationListener(this.roomId);

      // Setup rejection listener (only for initiator)
      this.setupRejectionListener(this.roomId);

      // Setup member listeners
      this.setupMemberJoinedListener(this.roomId);
      this.setupMemberLeftListener(this.roomId);

      // // Debug: show tracked listener keys after setup (helps diagnose test timing/race)
      // try {
      //   // Use console.debug to avoid noise in normal runs; tests will capture stdout/stderr
      //   console.debug(
      //     'listeners after createCall',
      //     Array.from(this.listeners.keys())
      //   );
      // } catch (_) {}

      this.emitter.emit('created', {
        roomId: this.roomId,
        roomLink: this.roomLink,
        role: this.role,
      });
      return result;
    } catch (err) {
      this.state = 'idle';
      this.emitter.emit('error', { phase: 'createCall', error: err });
      this.emitCallFailed('createCall', err);
      throw err;
    }
  }

  /**
   * Answer an existing call as the joiner
   * @param {Object} options - Call options (roomId, localStream, remoteVideoEl, etc.)
   * @returns {Promise<Object>} Result with success flag and call artifacts
   */
  async answerCall(options = {}) {
    this.state = 'joining';
    try {
      // Store video element references if provided
      if (options.localVideoEl) {
        this.localVideoEl = options.localVideoEl;
      }
      if (options.remoteVideoEl) {
        this.remoteVideoEl = options.remoteVideoEl;
      }

      // Add callback to capture messagesUI when it's ready (for joiner's async data channel)
      const onMessagesUIReady = (messagesUI) => {
        this.messagesUI = messagesUI;
      };

      const result = await answerCallFlow({
        ...options,
        onMessagesUIReady,
      });
      if (!result || !result.success) {
        this.state = 'idle';
        this.emitter.emit('error', { phase: 'answerCall', detail: result });
        this.emitCallFailed('answerCall', result);
        return result;
      }

      // Store artifacts
      this.pc = result.pc;
      this.roomId = result.roomId;
      this.role = result.role || 'joiner';
      // Only set messagesUI from result if we don't have one and result has one
      // For initiator: result.messagesUI is defined, sets it here
      // For joiner: messagesUI set via onMessagesUIReady callback, don't overwrite
      if (!this.messagesUI && result.messagesUI) {
        this.messagesUI = result.messagesUI;
      }
      this.state = 'connected';
      this.wasConnected = true;

      // Join dedicated data connection for file transfer
      try {
        const dataResult = await joinDataConnection(this.roomId);
        this.dataPC = dataResult.pc;
        this.dataChannel = dataResult.dataChannel;
        if (this.dataChannel) {
          this.setupFileTransport(this.dataChannel);
        } else {
          // DataChannel not yet received via ondatachannel — wait for it
          this.dataPC.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupFileTransport(this.dataChannel);
          };
        }
      } catch (err) {
        console.warn('[CallController] Failed to join data connection:', err);
      }

      // Setup cancellation listener (centralized in CallController)
      this.setupCancellationListener(this.roomId);

      // Setup member listeners
      this.setupMemberJoinedListener(this.roomId);
      this.setupMemberLeftListener(this.roomId);

      this.emitter.emit('answered', { roomId: this.roomId, role: this.role });
      return result;
    } catch (err) {
      this.state = 'idle';
      this.emitter.emit('error', { phase: 'answerCall', error: err });
      this.emitCallFailed('answerCall', err);
      throw err;
    }
  }

  /**
   * Setup file transfer when DataChannel is ready
   * Creates FileTransferController and connects it to messagesUI
   * @param {RTCDataChannel} dataChannel - The WebRTC DataChannel
   * @private
   */
  setupFileTransport(dataChannel) {
    if (!dataChannel || !messagesUI) {
      console.warn(
        'Cannot setup file transport, missing dataChannel or messagesUI',
        {
          hasDataChannel: !!dataChannel,
          hasMessagesUI: !!messagesUI,
        },
      );
      return;
    }

    const initTransport = () => {
      try {
        this.fileTransferController = new FileTransferController(dataChannel);
        messagesUI.setFileTransferController(this.fileTransferController);
        devDebug('[CallController] File transfer initialized');
      } catch (err) {
        console.error('[CallController] Failed to setup file transfer:', err);
      }
    };

    if (dataChannel.readyState === 'open') {
      initTransport();
    } else {
      dataChannel.addEventListener('open', initTransport, { once: true });
    }
  }

  /**
   * User-initiated hang up. By default emits RTDB cancellation so the remote
   * peer gets an explicit signal. After signaling, performs local cleanup.
   */
  async hangUp({ emitCancel = true, reason = 'user_hung_up' } = {}) {
    // Idempotency guard: prevent duplicate hangup calls
    if (this.isHangingUp) return;
    this.isHangingUp = true;

    try {
      if (emitCancel && this.roomId) {
        try {
          await RoomService.cancelCall(this.roomId, getUserId(), reason);
        } catch (e) {
          console.warn('CallController: cancelCall failed (non-fatal)', e);
        }
      }

      // leave and cleanup locally
      await this.cleanupCall({ reason });

      this.emitter.emit('hangup', { roomId: this.roomId, reason });
    } catch (e) {
      this.emitter.emit('error', { phase: 'hangUp', error: e });
      throw e;
    } finally {
      this.isHangingUp = false;
    }
  }

  /**
   * Check if cleanup reason indicates remote-initiated hangup
   * @param {string} reason - Cleanup reason
   * @returns {boolean} True if remote-initiated
   */
  isRemoteHangup(reason) {
    if (!reason) return false;
    const remoteReasons = [
      'remote',
      'cancelled',
      'partner_disconnected',
      'connection_failed',
    ];
    return remoteReasons.some((r) => reason.includes(r));
  }

  /**
   * Emit callFailed event with standardized payload
   * @param {string} phase - Phase where failure occurred ('createCall' or 'answerCall')
   * @param {*} error - Error object or message
   */
  emitCallFailed(phase, error) {
    this.emitter.emit('callFailed', {
      phase,
      error: error?.message || error?.error || error || 'Unknown error',
    });
  }

  /**
   * Local cleanup when the remote peer hung up or we detect disconnect.
   * Does NOT emit a cancellation signal.
   * @param {Object} options - Cleanup options
   * @param {string} options.reason - Reason for cleanup
   */
  async cleanupCall({ reason } = {}) {
    // Idempotency guard: prevent duplicate cleanup calls
    if (this.isCleaningUp) return;
    this.isCleaningUp = true;

    try {
      // Capture state before reset for event emission
      const prevRoom = this.roomId;
      const prevPartnerId = this.partnerId;
      const prevRole = this.role;
      const prevWasConnected = this.wasConnected;

      // Remove tracked listeners
      this.removeTrackedListeners();

      // leave room (best-effort)
      try {
        await RoomService.leaveRoom(getUserId(), this.roomId);
      } catch (e) {
        // non-fatal
      }

      // Close peer connections
      closeDataConnection(this.dataPC);
      this.dataPC = null;

      try {
        if (this.pc) {
          try {
            this.pc.close();
          } catch (e) {}
          this.pc = null;
        }
      } catch (e) {
        // ignore
      }

      // Clear video elements to prevent frozen frames
      try {
        if (this.remoteVideoEl) {
          this.remoteVideoEl.srcObject = null;
        }
      } catch (e) {
        console.warn('CallController: failed to clear remote video', e);
      }

      try {
        if (this.localVideoEl) {
          this.localVideoEl.srcObject = null;
        }
      } catch (e) {
        console.warn('CallController: failed to clear local video', e);
      }

      // Stop local stream tracks
      try {
        const { cleanupLocalStream } = await import('../media/state.js');
        cleanupLocalStream();
      } catch (e) {
        console.warn('CallController: failed to cleanup local stream', e);
      }

      // Reset initialization flag to allow stream recreation on next call
      try {
        const { resetLocalStreamInitFlag } = await import('../main.js');
        resetLocalStreamInitFlag();
      } catch (e) {
        // Non-fatal if main.js not available (e.g., in tests)
      }

      // Emit remoteHangup event if cleanup was triggered by remote party
      if (this.isRemoteHangup(reason)) {
        this.emitter.emit('remoteHangup', {
          roomId: prevRoom,
          partnerId: prevPartnerId,
          reason,
        });
      }

      // Cleanup file transport
      try {
        this.fileTransferController?.cleanup();
        this.fileTransferController = null;
        messagesUI.setFileTransferController(null);
      } catch (e) {
        console.warn('CallController: failed to cleanup file transport', e);
      }

      // Cleanup watch-sync listeners to prevent duplicates on next call
      cleanupWatchSync();

      // Clear OPFS temp files
      StreamingFileWriter.cleanup();

      // Cleanup messages UI before resetting state
      if (this.messagesUI && this.messagesUI.cleanup) {
        try {
          this.messagesUI.cleanup();
        } catch (e) {
          console.warn('CallController: failed to cleanup messages UI', e);
        }
      }

      // Reset state
      this.resetState();
      this.emitter.emit('cleanup', {
        roomId: prevRoom,
        role: prevRole,
        wasConnected: prevWasConnected,
        partnerId: prevPartnerId, // Include partnerId for contact save logic
        reason,
      });
    } catch (e) {
      this.emitter.emit('error', { phase: 'cleanupCall', error: e });
      throw e;
    } finally {
      this.isCleaningUp = false;
    }
  }
}

// TODO: Decide on singleton vs factory. For now keeping the existing default singleton for backward compatibility:
const defaultController = new CallController();
export default defaultController;
