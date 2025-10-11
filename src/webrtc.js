// webrtc.js - WebRTC connection utilities
import { ref, set, get, push, onValue, onChildAdded } from 'firebase/database';

export function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}

export function createPeerConnection(config, localStream) {
  const peerConnection = new RTCPeerConnection(config);
  
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
  
  return peerConnection;
}

export async function createOffer(peerConnection, db, roomId) {
  const roomRef = ref(db, `rooms/${roomId}`);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  
  await set(roomRef, {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });
  
  return offer;
}

export async function createAnswer(peerConnection, db, roomId, offer) {
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  
  const answerRef = ref(db, `rooms/${roomId}/answer`);
  await set(answerRef, {
    type: answer.type,
    sdp: answer.sdp,
  });
  
  return answer;
}

export function setupIceCandidateHandler(peerConnection, db, roomId, isInitiator) {
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const candidateType = isInitiator ? 'callerCandidates' : 'calleeCandidates';
      const candidatesRef = ref(db, `rooms/${roomId}/${candidateType}`);
      push(candidatesRef, event.candidate.toJSON());
    }
  };
}

export function listenForAnswer(db, roomId, peerConnection) {
  const answerRef = ref(db, `rooms/${roomId}/answer`);
  onValue(answerRef, async (snapshot) => {
    const answer = snapshot.val();
    if (answer && !peerConnection.currentRemoteDescription) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    }
  });
}

export function listenForIceCandidates(db, roomId, peerConnection, isInitiator) {
  const candidateType = isInitiator ? 'calleeCandidates' : 'callerCandidates';
  const candidatesRef = ref(db, `rooms/${roomId}/${candidateType}`);
  
  onChildAdded(candidatesRef, (snapshot) => {
    const candidate = snapshot.val();
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });
}

export async function checkRoomExists(db, roomId) {
  const roomRef = ref(db, `rooms/${roomId}`);
  const roomSnapshot = await get(roomRef);
  return roomSnapshot.exists() ? roomSnapshot.val() : null;
}