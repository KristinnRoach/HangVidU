// ===== FIREBASE CONFIG  =====
const firebaseConfig = {
  apiKey: 'AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA',
  authDomain: 'vidu-aae11.firebaseapp.com',
  projectId: 'vidu-aae11',
  storageBucket: 'vidu-aae11.firebasestorage.app',
  messagingSenderId: '765724787439',
  appId: '1:765724787439:web:61a3b5dd538149564c911a',
  measurementId: 'G-EGJ53HLGY4',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===== WEBRTC SETUP =====
let localStream;
let peerConnection;
let roomId = null;
let isInitiator = false;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startChatBtn = document.getElementById('startChat');
const hangUpBtn = document.getElementById('hangUp');
const statusDiv = document.getElementById('status');
const linkContainer = document.getElementById('linkContainer');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLink');

// ===== INITIALIZE =====
async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;

    // Check if joining existing room
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('room');

    if (roomId) {
      updateStatus('Connecting...');
      startChatBtn.style.display = 'none';
      await joinRoom(roomId);
    } else {
      updateStatus('Ready. Click to generate video chat link.');
    }
  } catch (error) {
    console.error('Media error:', error);
    updateStatus('Error: Could not access camera/mic. Check permissions.');
  }
}

// ===== CREATE ROOM (Person A) =====
async function createRoom() {
  isInitiator = true;
  roomId = generateRoomId();

  const roomRef = db.ref(`rooms/${roomId}`);

  // Create peer connection
  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    updateStatus('Connected!');
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('callerCandidates').push(event.candidate.toJSON());
    }
  };

  // Create offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  await roomRef.set({
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  });

  // Listen for answer
  roomRef.child('answer').on('value', async (snapshot) => {
    const answer = snapshot.val();
    if (answer && !peerConnection.currentRemoteDescription) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    }
  });

  // Listen for callee ICE candidates
  roomRef.child('calleeCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Show link
  const url = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
  shareLink.value = url;
  linkContainer.style.display = 'block';
  startChatBtn.disabled = true;
  hangUpBtn.disabled = false;

  updateStatus('Link ready! Waiting for partner...');
}

// ===== JOIN ROOM (Person B) =====
async function joinRoom(roomId) {
  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnapshot = await roomRef.once('value');

  if (!roomSnapshot.exists()) {
    updateStatus('Error: Invalid room link');
    return;
  }

  peerConnection = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
    updateStatus('Connected!');
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      roomRef.child('calleeCandidates').push(event.candidate.toJSON());
    }
  };

  // Get offer and set remote description
  const offer = roomSnapshot.val().offer;
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

  // Create answer
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  await roomRef.child('answer').set({
    type: answer.type,
    sdp: answer.sdp,
  });

  // Listen for caller ICE candidates
  roomRef.child('callerCandidates').on('child_added', (snapshot) => {
    const candidate = snapshot.val();
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  });

  hangUpBtn.disabled = false;
}

// ===== HANG UP =====
async function hangUp() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
  }

  // Clean up Firebase
  if (roomId && isInitiator) {
    await db.ref(`rooms/${roomId}`).remove();
  }

  // Reset UI
  roomId = null;
  isInitiator = false;
  startChatBtn.disabled = false;
  startChatBtn.style.display = 'block';
  hangUpBtn.disabled = true;
  linkContainer.style.display = 'none';
  shareLink.value = '';
  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Ready for new chat.');
}

// ===== HELPERS =====
function generateRoomId() {
  return Math.random().toString(36).substring(2, 15);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => (copyLinkBtn.textContent = 'Copy Link'), 2000);
  } catch (err) {
    shareLink.select();
    document.execCommand('copy');
  }
}

function updateStatus(message) {
  statusDiv.textContent = message;
}

// ===== EVENT LISTENERS =====
startChatBtn.addEventListener('click', createRoom);
hangUpBtn.addEventListener('click', hangUp);
copyLinkBtn.addEventListener('click', copyLink);

init();
