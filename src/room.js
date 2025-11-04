// room.js - Room management module
import {
  ref,
  set,
  get,
  update,
  remove,
  onChildAdded,
  onChildRemoved,
  off,
} from 'firebase/database';
import {
  getRoomRef,
  getRoomMembersRef,
  getRoomMemberRef,
  rtdb,
} from './storage/fb-rtdb/rtdb';
import { getDiagnosticLogger } from './utils/dev/diagnostic-logger.js';

class RoomService {
  constructor() {
    this.currentRoomId = null;
    this.memberListeners = [];
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
    const roomRef = ref(rtdb, `rooms/${roomId}`);
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
    const roomRef = ref(rtdb, `rooms/${roomId}`);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      throw new Error('Room does not exist');
    }

    return snapshot.val();
  }

  /**
   * Save answer to room
   */
  async saveAnswer(roomId, answer) {
    const roomRef = ref(rtdb, `rooms/${roomId}`);
    await update(roomRef, {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    });
  }

  /**
   * Join room as a member
   */
  async joinRoom(roomId, userId) {
    const startTime = Date.now();
    const memberRef = ref(rtdb, `rooms/${roomId}/members/${userId}`);

    getDiagnosticLogger().log('ROOM', 'JOIN_START', {
      roomId,
      userId,
      timestamp: startTime,
    });

    try {
      await set(memberRef, {
        joinedAt: Date.now(),
      });

      this.currentRoomId = roomId;

      getDiagnosticLogger().logMemberJoinEvent(
        roomId,
        userId,
        {
          joinedAt: Date.now(),
          role: 'self',
        },
        {
          operation: 'join_room',
          duration: Date.now() - startTime,
        }
      );

      getDiagnosticLogger().logFirebaseOperation('join_room', true, null, {
        roomId,
        userId,
        duration: Date.now() - startTime,
      });
    } catch (error) {
      getDiagnosticLogger().logFirebaseOperation('join_room', false, error, {
        roomId,
        userId,
        duration: Date.now() - startTime,
      });
      throw error;
    }
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
        {
          roomId: targetRoomId,
          userId,
        }
      );
      // Continue to attempt emptiness cleanup even if removal errored
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
   * Listen for member changes in room
   */
  onMemberJoined(roomId, callback) {
    const membersRef = ref(rtdb, `rooms/${roomId}/members`);
    onChildAdded(membersRef, callback);

    this.memberListeners.push({
      ref: membersRef,
      type: 'child_added',
      callback,
    });

    getDiagnosticLogger().logListenerAttachment(
      roomId,
      'member_join',
      this.memberListeners.length,
      {
        listenerType: 'onMemberJoined',
        totalListeners: this.memberListeners.length,
      }
    );
  }

  onMemberLeft(roomId, callback) {
    const membersRef = ref(rtdb, `rooms/${roomId}/members`);
    onChildRemoved(membersRef, callback);

    this.memberListeners.push({
      ref: membersRef,
      type: 'child_removed',
      callback,
    });

    getDiagnosticLogger().logListenerAttachment(
      roomId,
      'member_leave',
      this.memberListeners.length,
      {
        listenerType: 'onMemberLeft',
        totalListeners: this.memberListeners.length,
      }
    );
  }

  /**
   * High-level incoming-call listener: callback(eventType, userId, memberData)
   * eventType: 'join' | 'leave'
   * Returns an unsubscribe function.
   */
  onIncomingCall(roomId, callback) {
    const membersRef = ref(rtdb, `rooms/${roomId}/members`);

    const joinCb = (snap) => {
      callback('join', snap.key, snap.val());
    };
    const leaveCb = (snap) => {
      callback('leave', snap.key, snap.val());
    };

    onChildAdded(membersRef, joinCb);
    onChildRemoved(membersRef, leaveCb);

    this.memberListeners.push({
      ref: membersRef,
      type: 'child_added',
      callback: joinCb,
    });
    this.memberListeners.push({
      ref: membersRef,
      type: 'child_removed',
      callback: leaveCb,
    });

    // return unsubscribe for convenience
    return () => {
      off(membersRef, 'child_added', joinCb);
      off(membersRef, 'child_removed', leaveCb);

      // ? remove from the internal tracking array to prevent memory leaks
      this.memberListeners = this.memberListeners.filter(
        (l) => l.callback !== joinCb && l.callback !== leaveCb
      );
    };
  }

  /**
   * Clean up all listeners
   */
  cleanupListeners() {
    const listenerCount = this.memberListeners.length;
    const roomIds = [
      ...new Set(
        this.memberListeners
          .map((l) => l.ref.toString().match(/rooms\/([^\/]+)\/members/)?.[1])
          .filter(Boolean)
      ),
    ];

    getDiagnosticLogger().log('LISTENER', 'CLEANUP_START', {
      listenerCount,
      roomIds,
      timestamp: Date.now(),
    });

    this.memberListeners.forEach(({ ref: fbRef, type, callback }) => {
      off(fbRef, type, callback);
    });

    getDiagnosticLogger().logListenerCleanup(roomIds, [], {
      cleanupType: 'room_service_cleanup',
      listenersRemoved: listenerCount,
    });

    this.memberListeners = [];
  }

  /**
   * Get current room ID
   */
  get roomId() {
    return this.currentRoomId;
  }
}

export default new RoomService();
