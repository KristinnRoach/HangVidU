// connection.js - WebRTC connection management with Firebase signaling

import { db } from '../../storage/firebaseRealTimeDB.js';
import { setConnectionStatus } from './connectionStatus.js';
import { IceCandidateManager } from './ice-candidate-manager.js';
import { ConnectionStateManager } from './connection-state-manager.js';

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
  iceCandidateManager: null,
  connectionStateManager: null,
  roomRef: null,
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
  state.roomRef = await createRoomInFirebase(state.roomId, offer);

  // Setup remote stream handler
  if (import.meta.env.DEV) {
    console.log('[DEBUG] Assigning peerConnection.ontrack in connect');
  }
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // Initialize ICE candidate manager
  state.iceCandidateManager = new IceCandidateManager(
    state.peerConnection,
    state.roomRef,
    'caller'
  );

  // Initialize connection state manager
  state.connectionStateManager = new ConnectionStateManager(
    state.peerConnection,
    {
      connectionTimeout: 30000,
      reconnectAttempts: 3,
      reconnectDelay: 2000,
    }
  );

  state.connectionStateManager.setCallbacks({
    onStateChange: (newState, oldState) => {
      if (import.meta.env.DEV) {
        console.log(`Connection state (caller): ${oldState} → ${newState}`);
      }
    },
    onConnected: (connectionTime) => {
      if (import.meta.env.DEV) {
        console.log(`Caller connected in ${connectionTime}ms`);
      }
    },
    onDisconnected: () => {
      onStatusUpdate?.('Connection lost. Attempting to reconnect...');
    },
    onFailed: (reason) => {
      onStatusUpdate?.(`Connection failed: ${reason}`);
    },
    onReconnecting: (attempt, maxAttempts) => {
      onStatusUpdate?.(`Reconnecting... (${attempt}/${maxAttempts})`);
    },
  });

  // Listen for answer
  state.roomRef.child('answer').on('value', async (snapshot) => {
    const answer = snapshot.val();
    if (answer && !state.peerConnection.currentRemoteDescription) {
      try {
        await state.peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );

        // Notify ICE candidate manager that remote description is set
        await state.iceCandidateManager.onRemoteDescriptionSet();

        if (import.meta.env.DEV) {
          console.log(
            'Remote description set (caller), processing queued candidates'
          );
        }
      } catch (error) {
        console.error('Failed to set remote description (caller):', error);
        onStatusUpdate?.('Connection error: Failed to process answer');
      }
    }
  });

  setConnectionStatus(state.roomId, 'initiator', 'waiting');

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

  state.roomRef = roomRef;

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

  // Initialize ICE candidate manager
  state.iceCandidateManager = new IceCandidateManager(
    state.peerConnection,
    state.roomRef,
    'callee'
  );

  // Initialize connection state manager
  state.connectionStateManager = new ConnectionStateManager(
    state.peerConnection,
    {
      connectionTimeout: 30000,
      reconnectAttempts: 3,
      reconnectDelay: 2000,
    }
  );

  state.connectionStateManager.setCallbacks({
    onStateChange: (newState, oldState) => {
      if (import.meta.env.DEV) {
        console.log(`Connection state (callee): ${oldState} → ${newState}`);
      }
    },
    onConnected: (connectionTime) => {
      if (import.meta.env.DEV) {
        console.log(`Callee connected in ${connectionTime}ms`);
      }
    },
    onDisconnected: () => {
      onStatusUpdate?.('Connection lost. Attempting to reconnect...');
    },
    onFailed: (reason) => {
      onStatusUpdate?.(`Connection failed: ${reason}`);
    },
    onReconnecting: (attempt, maxAttempts) => {
      onStatusUpdate?.(`Reconnecting... (${attempt}/${maxAttempts})`);
    },
  });

  try {
    // Get offer and set remote description
    const offer = roomSnapshot.val().offer;
    await state.peerConnection.setRemoteDescription(
      new RTCSessionDescription(offer)
    );

    // Notify ICE candidate manager that remote description is set
    await state.iceCandidateManager.onRemoteDescriptionSet();

    // Create answer
    const answer = await state.peerConnection.createAnswer();
    await state.peerConnection.setLocalDescription(answer);

    await state.roomRef.child('answer').set({
      type: answer.type,
      sdp: answer.sdp,
    });

    setConnectionStatus(state.roomId, 'joiner', 'connecting');

    if (import.meta.env.DEV) {
      console.log('Join process completed (callee)');
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to join room:', error);
    onStatusUpdate?.(`Failed to join: ${error.message}`);
    return { success: false };
  }
}

export async function disconnect({ onStatusUpdate }) {
  // Clean up managers first
  if (state.iceCandidateManager) {
    state.iceCandidateManager.cleanup();
    state.iceCandidateManager = null;
  }

  if (state.connectionStateManager) {
    state.connectionStateManager.cleanup();
    state.connectionStateManager = null;
  }

  cleanupFirebaseListeners();

  if (state.peerConnection) {
    state.peerConnection.ontrack = null;
    state.peerConnection.onicecandidate = null;
    state.peerConnection.onconnectionstatechange = null;
    state.peerConnection.oniceconnectionstatechange = null;
    state.peerConnection.onicegatheringstatechange = null;
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
  state.roomRef = null;

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

export function getConnectionDiagnostics() {
  const diagnostics = {
    roomId: state.roomId,
    isInitiator: state.isInitiator,
    wasConnected: state.wasConnected,
    peerConnection: null,
    iceCandidateManager: null,
    connectionStateManager: null,
  };

  if (state.peerConnection) {
    diagnostics.peerConnection = {
      connectionState: state.peerConnection.connectionState,
      iceConnectionState: state.peerConnection.iceConnectionState,
      iceGatheringState: state.peerConnection.iceGatheringState,
      signalingState: state.peerConnection.signalingState,
      localDescription: !!state.peerConnection.localDescription,
      remoteDescription: !!state.peerConnection.currentRemoteDescription,
    };
  }

  if (state.iceCandidateManager) {
    diagnostics.iceCandidateManager = state.iceCandidateManager.getState();
  }

  if (state.connectionStateManager) {
    diagnostics.connectionStateManager =
      state.connectionStateManager.getState();
  }

  return diagnostics;
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
