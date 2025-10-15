// connection.js - WebRTC connection management with Firebase signaling

import { db } from '../storage/firebaseRealTimeDB.js';
import { setConnectionStatus } from './connectionStatus.js';

// ===== CONFIG =====
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

// ===== STATE =====
const state = {
  roomId: null,
  isInitiator: false,
  wasConnected: false,
  peerConnection: null,
  localStream: null,
};

// ===== PUBLIC API =====

export function getRoomId() {
  return state.roomId;
}

export function getIsInitiator() {
  return state.isInitiator;
}

export function getWasConnected() {
  return state.wasConnected;
}

export function setLocalStream(stream) {
  state.localStream = stream;
}

export function getLocalStream() {
  return state.localStream;
}

export function getPeerConnection() {
  return state.peerConnection;
}

export async function connect({ onRemoteStream, onStatusUpdate }) {
  state.isInitiator = true;
  if (!state.roomId) {
    state.roomId = generateRoomId();
  }

  // Create peer connection
  state.peerConnection = new RTCPeerConnection(configuration);
  // Queue remote ICE until remoteDescription is set
  const pendingCalleeCandidates = [];

  // Add local tracks
  if (!state.localStream) {
    onStatusUpdate?.('Error: No local media. Please allow mic/camera.');
    throw new Error('connect called without localStream set');
  }
  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });

  // Create offer
  const offer = await state.peerConnection.createOffer();
  await state.peerConnection.setLocalDescription(offer);

  // Create room in Firebase
  const roomRef = await createRoomInFirebase(state.roomId, offer);

  // Setup remote stream handler
  if (import.meta.env.DEV) {
    console.log('[DEBUG] Assigning peerConnection.ontrack in connect');
  }
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // Handle ICE candidates
  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('callerCandidates').push(event.candidate.toJSON());
    }
  };

  // Listen for answer
  roomRef.child('answer').on('value', async (snapshot) => {
    const answer = snapshot.val();
    if (answer && !state.peerConnection.currentRemoteDescription) {
      await state.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      // Drain queued ICE
      for (const c of pendingCalleeCandidates) {
        try {
          await state.peerConnection.addIceCandidate(c);
        } catch (e) {
          console.warn('Failed to add queued ICE candidate', e);
        }
      }
      pendingCalleeCandidates.length = 0;
    }
  });

  // Listen for callee ICE candidates
  roomRef.child('calleeCandidates').on('child_added', (snapshot) => {
    const candidate = new RTCIceCandidate(snapshot.val());
    if (state.peerConnection.currentRemoteDescription) {
      state.peerConnection
        .addIceCandidate(candidate)
        .catch((e) => console.warn('addIceCandidate failed', e));
    } else {
      pendingCalleeCandidates.push(candidate);
    }
  });

  setConnectionStatus(state.roomId, 'initiator', 'connected');

  if (onStatusUpdate) {
    onStatusUpdate('Link ready! Waiting for partner...');
  }

  return {
    roomId: state.roomId,
    shareUrl: `${window.location.origin}${window.location.pathname}?room=${state.roomId}`,
  };
}

export async function join({ roomId, onRemoteStream, onStatusUpdate }) {
  state.roomId = roomId;

  // Join room in Firebase
  const { roomRef, roomSnapshot } = await joinRoomInFirebase(roomId);

  if (!roomSnapshot.exists()) {
    if (onStatusUpdate) {
      onStatusUpdate('Error: Invalid room link');
    }
    return { success: false };
  }

  // Create peer connection
  state.peerConnection = new RTCPeerConnection(configuration);

  // Add local tracks
  if (!state.localStream) {
    onStatusUpdate?.('Error: No local media. Please allow mic/camera.');
    throw new Error('join called without localStream set');
  }
  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });

  // Setup remote stream handler
  if (import.meta.env.DEV) {
    console.log('[DEBUG] Assigning peerConnection.ontrack in join');
  }
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // Handle ICE candidates
  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('calleeCandidates').push(event.candidate.toJSON());
    }
  };

  // Get offer and set remote description
  const offer = roomSnapshot.val().offer;
  await state.peerConnection.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  // Create answer
  const answer = await state.peerConnection.createAnswer();
  await state.peerConnection.setLocalDescription(answer);

  await roomRef.child('answer').set({
    type: answer.type,
    sdp: answer.sdp,
  });

  // Listen for caller ICE candidates
  roomRef.child('callerCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  setConnectionStatus(state.roomId, 'joiner', 'connected');

  return { success: true };
}

export async function disconnect({ onStatusUpdate }) {
  cleanupFirebaseListeners();

  if (state.peerConnection) {
    state.peerConnection.ontrack = null;
    state.peerConnection.onicecandidate = null;
    state.peerConnection.close();
    state.peerConnection = null;
  }

  // Stop local media
  if (state.localStream) {
    state.localStream.getTracks().forEach((t) => t.stop());
    state.localStream = null;
  }

  // Clean up Firebase room
  if (state.roomId && state.isInitiator) {
    await removeRoomFromFirebase(state.roomId);
  }

  // Reset state
  state.roomId = null;
  state.isInitiator = false;
  state.wasConnected = false;

  if (onStatusUpdate) {
    onStatusUpdate('Disconnected. Ready for new chat.');
  }
}

export function restoreConnectionState(savedState) {
  if (!savedState) return;

  if (savedState.roomId) state.roomId = savedState.roomId;
  if (savedState.isInitiator !== undefined)
    state.isInitiator = savedState.isInitiator;
  if (savedState.wasConnected !== undefined)
    state.wasConnected = savedState.wasConnected;
}

// ===== PRIVATE HELPERS =====

function handleRemoteStream(event, onRemoteStream) {
  state.wasConnected = true;
  if (import.meta.env.DEV) {
    console.log(
      '✅ Connection established, wasConnected =',
      state.wasConnected
    );
  }

  if (onRemoteStream) {
    onRemoteStream(event.streams[0]);
  }
}

function cleanupFirebaseListeners() {
  if (!state.roomId) return;

  const roomRef = db.ref(`rooms/${state.roomId}`);
  roomRef.child('answer').off();
  roomRef.child('offer').off();
  roomRef.child('callerCandidates').off();
  roomRef.child('calleeCandidates').off();
}

function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}

// ===== FIREBASE SIGNALING =====

async function createRoomInFirebase(roomId, offer) {
  const roomRef = db.ref(`rooms/${roomId}`);
  await roomRef.set({
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });
  return roomRef;
}

async function joinRoomInFirebase(roomId) {
  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnapshot = await roomRef.once('value');
  return { roomRef, roomSnapshot };
}

async function removeRoomFromFirebase(roomId) {
  if (import.meta.env.DEV) {
    console.log(
      '[ROOM-DEBUG] removeRoom called for roomId:',
      roomId,
      'at',
      new Date().toISOString()
    );
  }
  await db.ref(`rooms/${roomId}`).remove();
}
