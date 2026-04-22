// room.js - Room management module
import { set, get, update, remove, runTransaction } from 'firebase/database';
import {
  getRoomRef,
  getRoomMembersRef,
  getRoomMemberRef,
  addRTDBListener,
  getRoomCancellationRef,
  getRoomAnswerRef,
  removeRTDBListenersForRoom,
} from '../../shared/storage/fb-rtdb/rtdb.js';
import { getDiagnosticLogger } from '../../shared/utils/dev/diagnostic-logger.js';

class RoomService {
  constructor() {
    this.currentRoomId = null;
  }

  /**
   * Create an empty room with metadata but no offer SDP. Used when the
   * offer will be written separately by the signaling adapter (Peer flow).
   */
  async createRoomMetadata(userId, roomId, { audioOnly = false } = {}) {
    const startTime = Date.now();

    getDiagnosticLogger().log('ROOM', 'CREATE_METADATA_START', {
      roomId,
      userId,
      audioOnly,
      timestamp: startTime,
    });

    const roomRef = getRoomRef(roomId);

    try {
      await this.createRoomAtomically(
        roomRef,
        {
          createdAt: Date.now(),
          createdBy: userId,
          audioOnly,
        },
        userId,
      );

      getDiagnosticLogger().logFirebaseOperation(
        'create_room_metadata',
        true,
        null,
        { roomId, userId, duration: Date.now() - startTime },
      );

      return roomId;
    } catch (error) {
      getDiagnosticLogger().logFirebaseOperation(
        'create_room_metadata',
        false,
        error,
        { roomId, userId, duration: Date.now() - startTime },
      );
      throw error;
    }
  }

  async createRoomAtomically(
    roomRef,
    roomData,
    userId,
    userName = 'Guest User',
  ) {
    const joinedAt = Date.now();
    const result = await runTransaction(roomRef, (currentRoom) => {
      const existingMembers = currentRoom?.members || {};
      const hasExistingMembers = Object.keys(existingMembers).length > 0;
      // BANDAID: saved-contact calls reuse stable room IDs, so reclaim stale empty room nodes left with cancellation/signaling data.
      if (currentRoom !== null && hasExistingMembers) return;

      return {
        ...roomData,
        members: {
          [userId]: {
            userName,
            joinedAt,
          },
        },
      };
    });

    if (!result.committed) {
      throw new Error('Room already exists');
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
   * Join a room as a member (typically a peer joining an existing room)
   */
  async joinRoom(roomId, userId, userName = 'Guest User') {
    const memberRef = getRoomMemberRef(roomId, userId);
    await set(memberRef, {
      userName,
      joinedAt: Date.now(),
    });
    getDiagnosticLogger().logFirebaseOperation(
      'set',
      'joinRoom',
      `rooms/${roomId}/members/${userId}`,
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
        { roomId: targetRoomId, userId },
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
              { roomId: targetRoomId },
            );
          });
        }
      } catch (e) {
        getDiagnosticLogger().logFirebaseOperation(
          'check_members_after_leave',
          false,
          e,
          { roomId: targetRoomId },
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
      { event: 'value' },
    );
  }

  /**
   * Listen for answer being added (call answered by callee)
   */
  onAnswerAdded(roomId, callback) {
    const answerRef = getRoomAnswerRef(roomId);
    addRTDBListener(
      answerRef,
      'value',
      (snapshot) => {
        if (snapshot.exists()) {
          callback(snapshot);
        }
      },
      roomId,
    );
    getDiagnosticLogger().logFirebaseOperation(
      'on',
      'onAnswerAdded',
      `rooms/${roomId}/answer`,
      { event: 'value' },
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
      { event: 'child_added' },
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
      { event: 'child_removed' },
    );
  }

  /**
   * Get current room ID
   */
  get roomId() {
    return this.currentRoomId;
  }
}

export default new RoomService();
