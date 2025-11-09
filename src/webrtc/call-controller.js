// src/webrtc/call-controller.js
// Thin CallController wrapper: small public API that delegates to existing
// `webrtc/call-flow.js` functions. Keeps a small in-memory call state and
// exposes an event API for the UI.

import {
  createCall as createCallFlow,
  answerCall as answerCallFlow,
} from './call-flow.js';
import RoomService from '../room.js';
import { getUserId } from '../firebase/auth.js';

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
    this.dataChannel = null;
    this.messagesUI = null;
    this.remoteVideoEl = null;
    this.isHangingUp = false;
    this.isCleaningUp = false;
    this.listeners = new Map(); // Track RTDB listeners for cleanup
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
   * Create a new call as the initiator
   * @param {Object} options - Call options (localStream, remoteVideoEl, etc.)
   * @returns {Promise<Object>} Result with success flag and call artifacts
   */
  async createCall(options = {}) {
    this.state = 'creating';
    try {
      // Store remoteVideoEl reference if provided
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
      this.dataChannel = result.dataChannel || null;
      this.messagesUI = result.messagesUI || null;
      this.state = 'waiting';

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
      // Store remoteVideoEl reference if provided
      if (options.remoteVideoEl) {
        this.remoteVideoEl = options.remoteVideoEl;
      }

      const result = await answerCallFlow(options);
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
      this.dataChannel = result.dataChannel || null;
      this.messagesUI = result.messagesUI || null;
      this.state = 'connected';

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

      // leave room (best-effort)
      try {
        await RoomService.leaveRoom(getUserId(), this.roomId);
      } catch (e) {
        // non-fatal
      }

      // Close peer connection
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

      // Clear remote video element to prevent frozen frame
      try {
        if (this.remoteVideoEl) {
          this.remoteVideoEl.srcObject = null;
        }
      } catch (e) {
        console.warn('CallController: failed to clear remote video', e);
      }

      // Emit remoteHangup event if cleanup was triggered by remote party
      if (this.isRemoteHangup(reason)) {
        this.emitter.emit('remoteHangup', {
          roomId: prevRoom,
          partnerId: prevPartnerId,
          reason,
        });
      }

      // Reset state
      this.resetState();
      this.emitter.emit('cleanup', { roomId: prevRoom, reason });
    } catch (e) {
      this.emitter.emit('error', { phase: 'cleanupCall', error: e });
      throw e;
    } finally {
      this.isCleaningUp = false;
    }
  }
}

export default new CallController();
