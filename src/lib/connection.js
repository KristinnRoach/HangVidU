// connection.js - WebRTC connection management with Firebase signaling

import { db } from './firebase.js';
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

  // Robust ICE candidate storage before roomRef exists
  let roomRef = null;
  let iceCandidatesQueue = [];
  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      if (roomRef) {
        roomRef.child('callerCandidates').push(event.candidate.toJSON());
        if (import.meta.env.DEV) {
          console.log('[ICE DEBUG] Pushed caller candidate:', event.candidate);
        }
      } else {
        iceCandidatesQueue.push(event.candidate);
        if (import.meta.env.DEV) {
          console.log('[ICE DEBUG] Queued candidate:', event.candidate);
        }
      }
    } else {
      if (import.meta.env.DEV) {
        console.log('[ICE DEBUG] End of caller ICE candidates');
      }
    }
  };

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
  roomRef = await createRoomInFirebase(state.roomId, offer);

  // After we get roomRef, flush queued ICE candidates
  for (const candidate of iceCandidatesQueue) {
    roomRef.child('callerCandidates').push(candidate.toJSON());
    if (import.meta.env.DEV) {
      console.log('[ICE DEBUG] Flushed queued candidate:', candidate);
    }
  }
  iceCandidatesQueue = [];

  // Setup remote stream handler
  if (import.meta.env.DEV) {
    console.log('[DEBUG] Assigning peerConnection.ontrack in connect');
  }
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // Listen for answer
  let processingAnswer = false; // Prevent duplicate answer processing
  const pendingCalleeCandidates = [];
  roomRef.child('answer').on('value', async (snapshot) => {
    const answer = snapshot.val();
    if (
      answer &&
      !processingAnswer &&
      !state.peerConnection.currentRemoteDescription
    ) {
      processingAnswer = true;
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
      processingAnswer = false;
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

export async function join({
  roomId,
  onRemoteStream,
  onStatusUpdate,
  remoteVideo,
}) {
  // ---- FULL CLEANUP of old state ----
  if (remoteVideo?.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((t) => t.stop());
    remoteVideo.srcObject = null;
  }
  if (state.peerConnection) {
    state.peerConnection.ontrack = null;
    state.peerConnection.onicecandidate = null;
    state.peerConnection.close();
    state.peerConnection = null;
  }
  cleanupFirebaseListeners();

  state.roomId = roomId;

  // ---- Firebase join ----
  const { roomRef, roomSnapshot } = await joinRoomInFirebase(roomId);

  if (!roomSnapshot.exists()) {
    onStatusUpdate?.('Error: Invalid room link');
    return { success: false };
  }

  // ---- Create peer connection, setup ICE queuing ----
  state.peerConnection = new RTCPeerConnection(configuration);

  let iceCandidatesQueue = [];
  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      if (roomRef) {
        roomRef.child('calleeCandidates').push(event.candidate.toJSON());
        if (import.meta.env.DEV) {
          console.log('[ICE DEBUG] Pushed callee candidate:', event.candidate);
        }
      } else {
        iceCandidatesQueue.push(event.candidate);
        if (import.meta.env.DEV) {
          console.log('[ICE DEBUG] Queued callee candidate:', event.candidate);
        }
      }
    } else if (import.meta.env.DEV) {
      console.log('[ICE DEBUG] End of callee ICE candidates');
    }
  };

  // ---- Add local tracks ----
  if (!state.localStream) {
    onStatusUpdate?.('Error: No local media. Please allow mic/camera.');
    throw new Error('join called without localStream set');
  }
  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });

  // ---- Setup remote stream handler ----
  if (import.meta.env.DEV) {
    console.log('[DEBUG] Assigning peerConnection.ontrack in join');
  }
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // ---- Get offer/set remote description ----
  const offer = roomSnapshot.val().offer;
  await state.peerConnection.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  // ---- Create/set answer ----
  const answer = await state.peerConnection.createAnswer();
  await state.peerConnection.setLocalDescription(answer);

  await roomRef.child('answer').set({
    type: answer.type,
    sdp: answer.sdp,
  });

  // ---- Flush queued ICE ----
  for (const candidate of iceCandidatesQueue) {
    roomRef.child('calleeCandidates').push(candidate.toJSON());
    if (import.meta.env.DEV) {
      console.log('[ICE DEBUG] Flushed queued callee candidate:', candidate);
    }
  }
  iceCandidatesQueue = [];

  // ---- Listen for caller ICE ----
  roomRef.child('callerCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // ---- Listen for initiator reconnection ----
  roomRef.child('reconnecting').on('value', async (snapshot) => {
    const isReconnecting = snapshot.val();
    if (isReconnecting) {
      if (import.meta.env.DEV) {
        console.log('[JOIN] Initiator is reconnecting, handling new offer...');
      }
      await performJoinReconnection({
        roomRef,
        onRemoteStream,
        onStatusUpdate,
        remoteVideo,
      });
      await roomRef.child('reconnecting').set(false);
    }
  });

  setConnectionStatus(state.roomId, 'joiner', 'connected');

  return { success: true };
}

async function performJoinReconnection({
  roomRef,
  onRemoteStream,
  onStatusUpdate,
  remoteVideo,
}) {
  // --- Full teardown ---
  if (remoteVideo?.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
    if (import.meta.env.DEV) {
      console.log('[JOIN] Cleared old remote video before reconnection');
    }
  }
  cleanupFirebaseListeners();
  if (state.peerConnection) {
    state.peerConnection.close();
    state.peerConnection = null;
  }

  // --- Start new connection ---
  state.peerConnection = new RTCPeerConnection(configuration);

  let iceCandidatesQueue = [];
  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      if (roomRef) {
        roomRef.child('calleeCandidates').push(event.candidate.toJSON());
        if (import.meta.env.DEV) {
          console.log(
            '[ICE DEBUG] Pushed callee candidate (reconnect):',
            event.candidate
          );
        }
      } else {
        iceCandidatesQueue.push(event.candidate);
        if (import.meta.env.DEV) {
          console.log(
            '[ICE DEBUG] Queued callee candidate (reconnect):',
            event.candidate
          );
        }
      }
    } else if (import.meta.env.DEV) {
      console.log('[ICE DEBUG] End of callee ICE candidates (reconnect)');
    }
  };

  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // --- New offer/description ---
  const newSnapshot = await roomRef.once('value');
  const newOffer = newSnapshot.val().offer;
  await state.peerConnection.setRemoteDescription(
    new RTCSessionDescription(newOffer)
  );
  const newAnswer = await state.peerConnection.createAnswer();
  await state.peerConnection.setLocalDescription(newAnswer);

  await roomRef.child('answer').set({
    type: newAnswer.type,
    sdp: newAnswer.sdp,
  });

  // --- Flush any queued ICE ---
  for (const candidate of iceCandidatesQueue) {
    roomRef.child('calleeCandidates').push(candidate.toJSON());
    if (import.meta.env.DEV) {
      console.log(
        '[ICE DEBUG] Flushed callee candidate (reconnect):',
        candidate
      );
    }
  }
  iceCandidatesQueue = [];

  // --- Listen for new caller ICE ---
  roomRef.child('callerCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  if (import.meta.env.DEV) {
    console.log('[JOIN] Reconnection complete, new answer sent');
  }
  onStatusUpdate?.('Partner reconnected!');
}

export async function reconnect({
  onRemoteStream,
  onStatusUpdate,
  remoteVideo,
}) {
  if (!state.roomId) throw new Error('Cannot reconnect: no roomId');
  if (import.meta.env.DEV)
    console.log('[RECONNECT] Attempting to reconnect to room:', state.roomId);

  const roomRef = db.ref(`rooms/${state.roomId}`);

  // --- Clean up old ICE ---
  await roomRef.child('callerCandidates').remove();
  await roomRef.child('calleeCandidates').remove();

  // --- Teardown remote video and peerConnection ---
  if (remoteVideo?.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
    if (import.meta.env.DEV)
      console.log('[RECONNECT] Cleared old remote video');
  }
  if (state.peerConnection) {
    state.peerConnection.ontrack = null;
    state.peerConnection.onicecandidate = null;
    state.peerConnection.close();
    state.peerConnection = null;
  }
  cleanupFirebaseListeners();

  // --- New peer connection and ICE queuing ---
  state.peerConnection = new RTCPeerConnection(configuration);
  let iceCandidatesQueue = [];
  state.peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      if (roomRef) {
        roomRef.child('callerCandidates').push(event.candidate.toJSON());
        if (import.meta.env.DEV) {
          console.log(
            '[ICE DEBUG] Pushed caller candidate (reconnect):',
            event.candidate
          );
        }
      } else {
        iceCandidatesQueue.push(event.candidate);
        if (import.meta.env.DEV) {
          console.log(
            '[ICE DEBUG] Queued caller candidate (reconnect):',
            event.candidate
          );
        }
      }
    } else if (import.meta.env.DEV) {
      console.log('[ICE DEBUG] End of caller ICE candidates (reconnect)');
    }
  };
  state.localStream.getTracks().forEach((track) => {
    state.peerConnection.addTrack(track, state.localStream);
  });
  state.peerConnection.ontrack = (event) => {
    handleRemoteStream(event, onRemoteStream);
  };

  // --- New offer/localDescription ---
  const offer = await state.peerConnection.createOffer();
  await state.peerConnection.setLocalDescription(offer);

  await roomRef.update({
    offer: { type: offer.type, sdp: offer.sdp },
    reconnecting: true,
  });
  if (import.meta.env.DEV) console.log('[RECONNECT] New offer sent');

  // --- Flush any queued ICE ---
  for (const candidate of iceCandidatesQueue) {
    roomRef.child('callerCandidates').push(candidate.toJSON());
    if (import.meta.env.DEV) {
      console.log(
        '[ICE DEBUG] Flushed caller candidate (reconnect):',
        candidate
      );
    }
  }
  iceCandidatesQueue = [];

  // --- Answer & ICE handlers ---
  let processingAnswer = false;
  roomRef.child('answer').on('value', async (snapshot) => {
    const answer = snapshot.val();
    if (
      answer &&
      !processingAnswer &&
      !state.peerConnection.currentRemoteDescription
    ) {
      processingAnswer = true;
      await state.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      if (import.meta.env.DEV) console.log('[RECONNECT] Answer received');
      processingAnswer = false;
    }
  });
  roomRef.child('calleeCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  onStatusUpdate?.('Reconnecting... waiting for partner');
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

async function handleRemoteStream(event, onRemoteStream) {
  state.wasConnected = true;
  if (import.meta.env.DEV) {
    console.log(
      '✅ Connection established, wasConnected =',
      state.wasConnected
    );
  }

  if (onRemoteStream) {
    await onRemoteStream(event.streams[0]);
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

// export async function connect({ onRemoteStream, onStatusUpdate }) {
//   state.isInitiator = true;
//   if (!state.roomId) {
//     state.roomId = generateRoomId();
//   }

//   // Create peer connection
//   state.peerConnection = new RTCPeerConnection(configuration);
//   // Queue remote ICE until remoteDescription is set
//   const pendingCalleeCandidates = [];
//   let processingAnswer = false; // Prevent duplicate answer processing

//   // Add local tracks
//   if (!state.localStream) {
//     onStatusUpdate?.('Error: No local media. Please allow mic/camera.');
//     throw new Error('connect called without localStream set');
//   }
//   state.localStream.getTracks().forEach((track) => {
//     state.peerConnection.addTrack(track, state.localStream);
//   });

//   // Create offer
//   const offer = await state.peerConnection.createOffer();
//   await state.peerConnection.setLocalDescription(offer);

//   // Create room in Firebase
//   const roomRef = await createRoomInFirebase(state.roomId, offer);

//   // Setup remote stream handler
//   if (import.meta.env.DEV) {
//     console.log('[DEBUG] Assigning peerConnection.ontrack in connect');
//   }
//   state.peerConnection.ontrack = (event) => {
//     handleRemoteStream(event, onRemoteStream);
//   };

//   // Handle ICE candidates
//   state.peerConnection.onicecandidate = (event) => {
//     if (event.candidate) {
//       roomRef.child('callerCandidates').push(event.candidate.toJSON());
//     }
//   };

//   // Listen for answer
//   roomRef.child('answer').on('value', async (snapshot) => {
//     const answer = snapshot.val();
//     if (
//       answer &&
//       !processingAnswer &&
//       !state.peerConnection.currentRemoteDescription
//     ) {
//       processingAnswer = true;
//       await state.peerConnection.setRemoteDescription(
//         new RTCSessionDescription(answer)
//       );
//       // Drain queued ICE
//       for (const c of pendingCalleeCandidates) {
//         try {
//           await state.peerConnection.addIceCandidate(c);
//         } catch (e) {
//           console.warn('Failed to add queued ICE candidate', e);
//         }
//       }
//       pendingCalleeCandidates.length = 0;
//       processingAnswer = false;
//     }
//   });

//   // Listen for callee ICE candidates
//   roomRef.child('calleeCandidates').on('child_added', (snapshot) => {
//     const candidate = new RTCIceCandidate(snapshot.val());
//     if (state.peerConnection.currentRemoteDescription) {
//       state.peerConnection
//         .addIceCandidate(candidate)
//         .catch((e) => console.warn('addIceCandidate failed', e));
//     } else {
//       pendingCalleeCandidates.push(candidate);
//     }
//   });

//   setConnectionStatus(state.roomId, 'initiator', 'connected');

//   if (onStatusUpdate) {
//     onStatusUpdate('Link ready! Waiting for partner...');
//   }

//   return {
//     roomId: state.roomId,
//     shareUrl: `${window.location.origin}${window.location.pathname}?room=${state.roomId}`,
//   };
// }

// export async function join({
//   roomId,
//   onRemoteStream,
//   onStatusUpdate,
//   remoteVideo,
// }) {
//   state.roomId = roomId;

//   // Join room in Firebase
//   const { roomRef, roomSnapshot } = await joinRoomInFirebase(roomId);

//   if (!roomSnapshot.exists()) {
//     if (onStatusUpdate) {
//       onStatusUpdate('Error: Invalid room link');
//     }
//     return { success: false };
//   }

//   // Create peer connection
//   state.peerConnection = new RTCPeerConnection(configuration);

//   // Add local tracks
//   if (!state.localStream) {
//     onStatusUpdate?.('Error: No local media. Please allow mic/camera.');
//     throw new Error('join called without localStream set');
//   }
//   state.localStream.getTracks().forEach((track) => {
//     state.peerConnection.addTrack(track, state.localStream);
//   });

//   // Setup remote stream handler
//   if (import.meta.env.DEV) {
//     console.log('[DEBUG] Assigning peerConnection.ontrack in join');
//   }
//   state.peerConnection.ontrack = (event) => {
//     handleRemoteStream(event, onRemoteStream);
//   };

//   // Handle ICE candidates
//   state.peerConnection.onicecandidate = (event) => {
//     if (event.candidate) {
//       roomRef.child('calleeCandidates').push(event.candidate.toJSON());
//     }
//   };

//   // Get offer and set remote description
//   const offer = roomSnapshot.val().offer;
//   await state.peerConnection.setRemoteDescription(
//     new RTCSessionDescription(offer)
//   );

//   // Create answer
//   const answer = await state.peerConnection.createAnswer();
//   await state.peerConnection.setLocalDescription(answer);

//   await roomRef.child('answer').set({
//     type: answer.type,
//     sdp: answer.sdp,
//   });

//   // Listen for caller ICE candidates
//   roomRef.child('callerCandidates').on('child_added', (snapshot) => {
//     const candidate = snapshot.val();
//     state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//   });

//   // Listen for reconnection signal from initiator
//   roomRef.child('reconnecting').on('value', async (snapshot) => {
//     const isReconnecting = snapshot.val();
//     if (isReconnecting && state.peerConnection) {
//       if (import.meta.env.DEV) {
//         console.log('[JOIN] Initiator is reconnecting, handling new offer...');
//       }

//       // Clear old remote video if present
//       if (remoteVideo?.srcObject) {
//         remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
//         remoteVideo.srcObject = null;
//         if (import.meta.env.DEV) {
//           console.log('[JOIN] Cleared old remote video before reconnection');
//         }
//       }

//       // CRITICAL: Clean up old Firebase listeners before creating new peer connection
//       cleanupFirebaseListeners();
//       if (import.meta.env.DEV) {
//         console.log('[JOIN] Cleaned up old Firebase listeners');
//       }

//       // Close old connection
//       state.peerConnection.close();

//       // Create new peer connection
//       state.peerConnection = new RTCPeerConnection(configuration);

//       // Add local tracks
//       state.localStream.getTracks().forEach((track) => {
//         state.peerConnection.addTrack(track, state.localStream);
//       });

//       // Setup handlers
//       state.peerConnection.ontrack = (event) => {
//         handleRemoteStream(event, onRemoteStream);
//       };

//       state.peerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//           roomRef.child('calleeCandidates').push(event.candidate.toJSON());
//         }
//       };

//       // Get new offer
//       const newSnapshot = await roomRef.once('value');
//       const newOffer = newSnapshot.val().offer;
//       await state.peerConnection.setRemoteDescription(
//         new RTCSessionDescription(newOffer)
//       );

//       // Create new answer
//       const newAnswer = await state.peerConnection.createAnswer();
//       await state.peerConnection.setLocalDescription(newAnswer);

//       // Send new answer
//       await roomRef.child('answer').set({
//         type: newAnswer.type,
//         sdp: newAnswer.sdp,
//       });

//       // Listen for new ICE candidates
//       roomRef.child('callerCandidates').on('child_added', (snapshot) => {
//         const candidate = snapshot.val();
//         state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//       });

//       if (import.meta.env.DEV) {
//         console.log('[JOIN] Reconnection complete, new answer sent');
//       }

//       if (onStatusUpdate) {
//         onStatusUpdate('Partner reconnected!');
//       }

//       // Clear reconnecting flag
//       await roomRef.child('reconnecting').set(false);
//     }
//   });

//   setConnectionStatus(state.roomId, 'joiner', 'connected');

//   return { success: true };
// }

// export async function reconnect({
//   onRemoteStream,
//   onStatusUpdate,
//   remoteVideo,
// }) {
//   if (!state.roomId) {
//     throw new Error('Cannot reconnect: no roomId');
//   }

//   if (import.meta.env.DEV) {
//     console.log('[RECONNECT] Attempting to reconnect to room:', state.roomId);
//   }

//   const roomRef = db.ref(`rooms/${state.roomId}`);

//   // CRITICAL: Clear old ICE candidates before reconnection
//   if (import.meta.env.DEV) {
//     console.log('[RECONNECT] Clearing old ICE candidates...');
//   }
//   await roomRef.child('callerCandidates').remove();
//   await roomRef.child('calleeCandidates').remove();

//   // Clear old remote video if present
//   if (remoteVideo && remoteVideo.srcObject) {
//     remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
//     remoteVideo.srcObject = null;
//     if (import.meta.env.DEV) {
//       console.log('[RECONNECT] Cleared old remote video');
//     }
//   }

//   // Create new peer connection
//   state.peerConnection = new RTCPeerConnection(configuration);

//   // Add local tracks
//   state.localStream.getTracks().forEach((track) => {
//     state.peerConnection.addTrack(track, state.localStream);
//   });

//   if (state.isInitiator) {
//     // Initiator: Create new offer and update Firebase
//     const offer = await state.peerConnection.createOffer();
//     await state.peerConnection.setLocalDescription(offer);

//     // Replace old offer with new one
//     await roomRef.update({
//       offer: {
//         type: offer.type,
//         sdp: offer.sdp,
//       },
//       reconnecting: true,
//     });

//     if (import.meta.env.DEV) {
//       console.log('[RECONNECT] New offer sent');
//     }

//     // Setup handlers
//     state.peerConnection.ontrack = (event) => {
//       handleRemoteStream(event, onRemoteStream);
//     };

//     state.peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         roomRef.child('callerCandidates').push(event.candidate.toJSON());
//       }
//     };

//     let processingAnswer = false; // Prevent duplicate answer processing

//     // Listen for new answer
//     roomRef.child('answer').on('value', async (snapshot) => {
//       const answer = snapshot.val();
//       if (
//         answer &&
//         !processingAnswer &&
//         !state.peerConnection.currentRemoteDescription
//       ) {
//         processingAnswer = true;
//         await state.peerConnection.setRemoteDescription(
//           new RTCSessionDescription(answer)
//         );
//         if (import.meta.env.DEV) {
//           console.log('[RECONNECT] Answer received');
//         }
//         processingAnswer = false;
//       }
//     });

//     // Listen for callee ICE candidates
//     roomRef.child('calleeCandidates').on('child_added', (snapshot) => {
//       const candidate = snapshot.val();
//       state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     if (onStatusUpdate) {
//       onStatusUpdate('Reconnecting... waiting for partner');
//     }
//   } else {
//     // Joiner: Wait for new offer, create new answer
//     const roomSnapshot = await roomRef.once('value');

//     if (!roomSnapshot.exists()) {
//       if (onStatusUpdate) {
//         onStatusUpdate('Error: Room no longer exists');
//       }
//       return { success: false };
//     }

//     // Setup handlers
//     state.peerConnection.ontrack = (event) => {
//       handleRemoteStream(event, onRemoteStream);
//     };

//     state.peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         roomRef.child('calleeCandidates').push(event.candidate.toJSON());
//       }
//     };

//     // Get new offer
//     const offer = roomSnapshot.val().offer;
//     await state.peerConnection.setRemoteDescription(
//       new RTCSessionDescription(offer)
//     );

//     // Create new answer
//     const answer = await state.peerConnection.createAnswer();
//     await state.peerConnection.setLocalDescription(answer);

//     // Update answer in Firebase
//     await roomRef.child('answer').set({
//       type: answer.type,
//       sdp: answer.sdp,
//     });

//     if (import.meta.env.DEV) {
//       console.log('[RECONNECT] New answer sent');
//     }

//     // Listen for caller ICE candidates
//     roomRef.child('callerCandidates').on('child_added', (snapshot) => {
//       const candidate = snapshot.val();
//       state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//     });

//     if (onStatusUpdate) {
//       onStatusUpdate('Reconnected!');
//     }
//   }

//   return { success: true };
// }
