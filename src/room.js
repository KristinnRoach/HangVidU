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
import { getRoomRef, rtdb } from './storage/fb-rtdb/rtdb';

class RoomService {
  constructor() {
    this.currentRoomId = null;
    this.memberListeners = [];
  }

  /**
   * Create a new room with an offer
   */
  async createNewRoom(offer, userId, roomId = null) {
    if (!roomId) roomId = Math.random().toString(36).substring(2, 15);

    const roomRef = getRoomRef(roomId);

    await set(roomRef, {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
      createdAt: Date.now(),
      createdBy: userId,
    });

    await this.joinRoom(roomId, userId);

    return roomId;
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
    const memberRef = ref(rtdb, `rooms/${roomId}/members/${userId}`);
    await set(memberRef, {
      joinedAt: Date.now(),
    });

    this.currentRoomId = roomId;
  }

  /**
   * Leave current room
   */
  async leaveRoom(userId) {
    if (!this.currentRoomId) return;

    const memberRef = ref(
      rtdb,
      `rooms/${this.currentRoomId}/members/${userId}`
    );

    await remove(memberRef).catch(() => {});

    // NOTE: Do not blindly cleanup all listeners here.
    // Some listeners (e.g., background incoming-call listeners for saved rooms)
    // must persist across calls. Callers should explicitly cleanup per-call listeners
    // at the start of a new call or when tearing down the app.
    this.currentRoomId = null;
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
  }

  onMemberLeft(roomId, callback) {
    const membersRef = ref(rtdb, `rooms/${roomId}/members`);
    onChildRemoved(membersRef, callback);

    this.memberListeners.push({
      ref: membersRef,
      type: 'child_removed',
      callback,
    });
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
    };
  }

  /**
   * Clean up all listeners
   */
  cleanupListeners() {
    this.memberListeners.forEach(({ ref: fbRef, type, callback }) => {
      off(fbRef, type, callback);
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
