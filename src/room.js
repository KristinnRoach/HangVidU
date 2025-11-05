// room.js - Room management module
import { set, get, update, remove } from 'firebase/database';
import {
  getRoomRef,
  getRoomMembersRef,
  getRoomMemberRef,
  addRTDBListener,
  getRoomCancellationRef,
  removeRTDBListenersForRoom,
  removeRTDBListenersForUser,
} from './storage/fb-rtdb/rtdb';
import { getDiagnosticLogger } from './utils/dev/diagnostic-logger.js';

class RoomService {
  constructor() {
    this.currentRoomId = null;
  }

  /**
   * Create a new room with an offer
   */
  async createNewRoom(offer, userId, roomId = null) {
    const startTime = Date.now();
    if (!roomId) roomId = Math.random().toString(36).substring(2, 15);

    getDiagnosticLogger().log('ROOM', 'CREATE_START', {
      roomId,
      userId,
      hasOffer: !!offer,
      timestamp: startTime,
    });

    const roomRef = getRoomRef(roomId);

    try {
      await set(roomRef, {
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
        createdAt: Date.now(),
        createdBy: userId,
      });

      getDiagnosticLogger().logFirebaseOperation('create_room', true, null, {
        roomId,
        userId,
        duration: Date.now() - startTime,
      });

      await this.joinRoom(roomId, userId);

      getDiagnosticLogger().log('ROOM', 'CREATE_COMPLETE', {
        roomId,
        userId,
        totalDuration: Date.now() - startTime,
      });

      return roomId;
    } catch (error) {
      getDiagnosticLogger().logFirebaseOperation('create_room', false, error, {
        roomId,
        userId,
        duration: Date.now() - startTime,
      });
      throw error;
    }
  }

  /**
   * Check if room exists and has active members
   */
  async checkRoomStatus(roomId) {
    const roomRef = getRoomRef(roomId);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      return { exists: false, hasMembers: false, memberCount: 0 };
    }

    const roomData = snapshot.val();
    const members = roomData.members || {};
    const memberCount = Object.keys(members).length;

    return {
      exists: true,
      hasMembers: memberCount > 0,
      memberCount,
      roomData,
    };
  }

  /**
   * Get room data (mainly the offer for joining)
   */
  async getRoomData(roomId) {
    const roomRef = getRoomRef(roomId);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      throw new Error('Room does not exist');
    }

    return snapshot.val();
  }

  /**
   * Save the WebRTC answer to the room
   */
  async saveAnswer(roomId, answer) {
    const roomRef = getRoomRef(roomId);
    await update(roomRef, { answer });
  }

  /**
   * Join a room as a member (typically a peer joining an existing room)
   */
  async joinRoom(roomId, userId, displayName = 'Guest User') {
    const memberRef = getRoomMemberRef(roomId, userId);
    await set(memberRef, {
      displayName,
      joinedAt: Date.now(),
    });
    getDiagnosticLogger().logFirebaseOperation(
      'set',
      'joinRoom',
      `rooms/${roomId}/members/${userId}`
    );
  }

  /**
   * Leave current room
   */
  async leaveRoom(userId, roomId = null, { deleteRoomIfEmpty = true } = {}) {
    const targetRoomId = roomId || this.currentRoomId;
    if (!targetRoomId || !userId) return;

    const startTime = Date.now();

    const memberRef = getRoomMemberRef(targetRoomId, userId);
    const membersRef = getRoomMembersRef(targetRoomId);
    const roomRef = getRoomRef(targetRoomId);

    try {
      await remove(memberRef);
    } catch (e) {
      getDiagnosticLogger().logFirebaseOperation(
        'leave_room_remove_member',
        false,
        e,
        { roomId: targetRoomId, userId }
      );
    }

    // Optionally delete the entire room if no members remain
    if (deleteRoomIfEmpty) {
      try {
        const snap = await get(membersRef);
        const members = snap.exists() ? snap.val() : {};
        const memberCount = members ? Object.keys(members).length : 0;

        if (memberCount === 0) {
          await remove(roomRef).catch((err) => {
            getDiagnosticLogger().logFirebaseOperation(
              'delete_empty_room',
              false,
              err,
              { roomId: targetRoomId }
            );
          });
        }
      } catch (e) {
        getDiagnosticLogger().logFirebaseOperation(
          'check_members_after_leave',
          false,
          e,
          { roomId: targetRoomId }
        );
      }
    }

    // Reset currentRoomId if we're leaving the active room
    if (!roomId || roomId === this.currentRoomId) {
      this.currentRoomId = null;
    }

    // NOTE: Do not blindly cleanup all listeners here.
    // Some listeners (e.g., background incoming-call listeners for saved rooms)
    // must persist across calls. Callers should explicitly cleanup per-call listeners
    // at the start of a new call or when tearing down the app.
  }

  /**
   * Record a direct rejection signal in the room so the caller gets instant feedback.
   * Keeps schema simple: rooms/{roomId}/rejection = { by, reason, at }
   * @param {string} roomId
   * @param {string} byUserId
   * @param {('user_rejected'|'busy'|'stale_call'|'already_in_call'|string)} [reason]
   */
  async rejectCall(roomId, byUserId, reason = 'user_rejected') {
    if (!roomId || !byUserId) return;

    const roomRef = getRoomRef(roomId);
    const payload = {
      rejection: {
        by: byUserId,
        reason,
        at: Date.now(),
      },
    };

    try {
      await update(roomRef, payload);
      getDiagnosticLogger().log('ROOM', 'REJECT_SET', {
        roomId,
        byUserId,
        reason,
      });
    } catch (e) {
      getDiagnosticLogger().log('ROOM', 'REJECT_SET_FAILED', {
        roomId,
        byUserId,
        reason,
        error: String(e?.message || e),
      });
      throw e;
    }
  }

  /**
   * Record a direct cancellation signal in the room so the callee can hide incoming UI.
   * rooms/{roomId}/cancellation = { by, reason, at }
   */
  async cancelCall(roomId, byUserId, reason = 'caller_cancelled') {
    if (!roomId || !byUserId) return;

    const roomRef = getRoomRef(roomId);
    const payload = {
      cancellation: {
        by: byUserId,
        reason,
        at: Date.now(),
      },
    };

    try {
      await update(roomRef, payload);
      getDiagnosticLogger().log('ROOM', 'CANCEL_SET', {
        roomId,
        byUserId,
        reason,
      });
    } catch (e) {
      getDiagnosticLogger().log('ROOM', 'CANCEL_SET_FAILED', {
        roomId,
        byUserId,
        reason,
        error: String(e?.message || e),
      });
      throw e;
    }
  }

  /**
   * Listen for caller cancellation so callee can react (hide incoming UI).
   */
  onCallCancelled(roomId, callback) {
    const cancelRef = getRoomCancellationRef(roomId);
    addRTDBListener(cancelRef, 'value', callback, roomId);
    getDiagnosticLogger().logFirebaseOperation(
      'on',
      'onCallCancelled',
      `rooms/${roomId}/cancellation`,
      { event: 'value' }
    );
  }

  /**
   * Listen for new members joining the room
   */
  onMemberJoined(roomId, callback) {
    const membersRef = getRoomMembersRef(roomId);
    addRTDBListener(membersRef, 'child_added', callback, roomId);
    getDiagnosticLogger().logFirebaseOperation(
      'on',
      'onMemberJoined',
      `rooms/${roomId}/members`,
      { event: 'child_added' }
    );
  }

  /**
   * Listen for members leaving the room
   */
  onMemberLeft(roomId, callback) {
    const membersRef = getRoomMembersRef(roomId);
    addRTDBListener(membersRef, 'child_removed', callback, roomId);
    getDiagnosticLogger().logFirebaseOperation(
      'on',
      'onMemberLeft',
      `rooms/${roomId}/members`,
      { event: 'child_removed' }
    );
  }

  /**
   * High-level incoming-call listener: callback(eventType, userId, memberData)
   * eventType: 'join' | 'leave'
   * Returns an unsubscribe function.
   * @param {string} roomId - Room ID to listen to
   * @param {string} userId - User ID of the local user attaching this listener
   * @param {Function} callback - Callback function (eventType, memberId, memberData)
   */
  onIncomingCall(roomId, userId, callback) {
    const membersRef = getRoomMembersRef(roomId);

    const joinCb = (snap) => {
      callback('join', snap.key, snap.val());
    };
    const leaveCb = (snap) => {
      callback('leave', snap.key, snap.val());
    };

    addRTDBListener(membersRef, 'child_added', joinCb, roomId, userId);
    addRTDBListener(membersRef, 'child_removed', leaveCb, roomId, userId);

    // Unsubscribe only this user's listeners in this room
    return () => removeRTDBListenersForUser(userId, roomId);
  }

  /**
   * Get current room ID
   */
  get roomId() {
    return this.currentRoomId;
  }
}

export default new RoomService();
