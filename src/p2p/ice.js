// src/p2p/ice.js

import { ref, push, set, onChildAdded } from 'firebase/database';
import { rtdb, trackFirebaseListener } from './firebase.js';
import { devDebug } from '../utils/dev-utils.js';

export function setupIceCandidates(pc, role, roomId) {
  if (!pc || !roomId) {
    throw new Error('setupIceCandidates: pc and roomId are required');
  }
  if (role === 'initiator') {
    setupLocalCandidateSender(pc, 'offerCandidates', roomId);
    setupRemoteCandidateListener(pc, 'answerCandidates', roomId);
  } else if (role === 'joiner') {
    setupLocalCandidateSender(pc, 'answerCandidates', roomId);
    setupRemoteCandidateListener(pc, 'offerCandidates', roomId);
  } else {
    throw new Error(`Invalid role: ${role} specified for ICE candidate setup.`);
  }
}

function setupLocalCandidateSender(pc, path, roomId) {
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      devDebug(`❄ Local ICE candidate: ${path}`);
      const candidateRef = push(ref(rtdb, `rooms/${roomId}/${path}`));
      set(candidateRef, event.candidate.toJSON());
    } else {
      devDebug(`❄ ICE gathering complete for ${path}`);
    }
  };
}

function setupRemoteCandidateListener(pc, path, roomId) {
  const remoteCandidatesRef = ref(rtdb, `rooms/${roomId}/${path}`);
  const callback = (snapshot) => {
    devDebug(`❄ Remote ICE candidate added: ${path}`);

    const candidate = snapshot.val();
    if (candidate && pc.remoteDescription) {
      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
        console.error('Error adding ICE candidate:', error);
      });
    }
  };

  onChildAdded(remoteCandidatesRef, callback);
  trackFirebaseListener(remoteCandidatesRef, 'child_added', callback);
}
