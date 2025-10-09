// URL-based WebRTC video chat - no server needed!
let localStream;
let remoteStream;
let peerConnection;
let isInitiator = false;
let iceCandidates = [];

// Configuration for STUN server
const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

// Get DOM elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startChatBtn = document.getElementById('startChat');
const hangUpBtn = document.getElementById('hangUp');
const statusDiv = document.getElementById('status');
const linkContainer = document.getElementById('linkContainer');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLink');

// Initialize - get user media
async function init() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false, // Start with audio off for your use case
    });
    localVideo.srcObject = localStream;

    // Check if we're joining from a link
    const urlParams = new URLSearchParams(window.location.search);
    const offerData = urlParams.get('offer');

    if (offerData) {
      // We're joining someone's room
      updateStatus('Connecting to video chat...');
      startChatBtn.style.display = 'none';
      await joinFromLink(offerData);
    } else {
      // We're ready to create a room
      updateStatus('Camera ready. Click to generate a video chat link.');
    }
  } catch (error) {
    console.error('Error accessing media devices:', error);
    updateStatus('Error: Could not access camera. Please check permissions.');
  }
}

// Create a peer connection
function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);
  iceCandidates = [];

  // Add local stream tracks to the connection
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  // Handle remote stream
  peerConnection.ontrack = (event) => {
    remoteStream = event.streams[0];
    remoteVideo.srcObject = remoteStream;
    updateStatus('Connected! You can now see each other.');
  };

  // Collect ICE candidates
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      iceCandidates.push(event.candidate);
    }
  };

  // Handle connection state changes
  peerConnection.onconnectionstatechange = () => {
    const state = peerConnection.connectionState;
    if (state === 'connected') {
      updateStatus('Connected! Video chat is active.');
    } else if (state === 'failed' || state === 'disconnected') {
      updateStatus('Connection lost. Please refresh and try again.');
    }
  };
}

// Generate video chat link (initiator)
async function generateChatLink() {
  isInitiator = true;
  createPeerConnection();

  // Create offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // Wait a bit for ICE candidates to gather
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Create compressed offer data
  const offerData = {
    sdp: offer.sdp,
    ice: iceCandidates,
  };

  // Compress and encode for URL
  const compressed = btoa(JSON.stringify(offerData));
  const shareUrl = `${window.location.origin}${
    window.location.pathname
  }?offer=${encodeURIComponent(compressed)}`;

  // Show the link
  shareLink.value = shareUrl;
  linkContainer.style.display = 'block';
  startChatBtn.disabled = true;
  hangUpBtn.disabled = false;

  updateStatus(
    'Link generated! Share it with your partner. Waiting for them to connect...'
  );

  // Start polling for answer in URL hash
  pollForAnswer();
}

// Join from link (receiver)
async function joinFromLink(offerDataEncoded) {
  try {
    // Decode offer
    const offerData = JSON.parse(atob(decodeURIComponent(offerDataEncoded)));

    createPeerConnection();

    // Set remote description
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription({
        type: 'offer',
        sdp: offerData.sdp,
      })
    );

    // Add remote ICE candidates
    for (const candidate of offerData.ice) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }

    // Create answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    // Wait for ICE candidates
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create answer data
    const answerData = {
      sdp: answer.sdp,
      ice: iceCandidates,
    };

    // Send answer back via URL hash
    const compressed = btoa(JSON.stringify(answerData));
    window.location.hash = `answer=${compressed}`;

    hangUpBtn.disabled = false;
    updateStatus('Connecting...');
  } catch (error) {
    console.error('Error joining from link:', error);
    updateStatus('Error: Invalid or expired link');
  }
}

// Poll for answer (when initiator)
function pollForAnswer() {
  const checkInterval = setInterval(async () => {
    if (window.location.hash.includes('answer=')) {
      clearInterval(checkInterval);

      const hash = window.location.hash.substring(1);
      const answerData = hash.split('answer=')[1];

      try {
        const answer = JSON.parse(atob(answerData));

        // Set remote description
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription({
            type: 'answer',
            sdp: answer.sdp,
          })
        );

        // Add remote ICE candidates
        for (const candidate of answer.ice) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }

        updateStatus('Connected! You can now see each other.');
        linkContainer.style.display = 'none';
      } catch (error) {
        console.error('Error processing answer:', error);
        updateStatus('Error connecting. Please try again.');
      }
    }
  }, 1000);
}

// Hang up
function hangUp() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }

  if (remoteVideo.srcObject) {
    remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
    remoteVideo.srcObject = null;
  }

  // Reset UI
  startChatBtn.disabled = false;
  startChatBtn.style.display = 'block';
  hangUpBtn.disabled = true;
  linkContainer.style.display = 'none';
  shareLink.value = '';

  // Clear URL parameters and hash
  window.history.replaceState({}, document.title, window.location.pathname);

  updateStatus('Disconnected. Ready to generate a new video chat link.');
}

// Copy link to clipboard
async function copyLink() {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyLinkBtn.textContent = 'Copy Link';
    }, 2000);
  } catch (err) {
    shareLink.select();
    document.execCommand('copy');
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyLinkBtn.textContent = 'Copy Link';
    }, 2000);
  }
}

// Helper function
function updateStatus(message) {
  statusDiv.textContent = message;
}

// Event listeners
startChatBtn.addEventListener('click', generateChatLink);
hangUpBtn.addEventListener('click', hangUp);
copyLinkBtn.addEventListener('click', copyLink);

// Initialize on page load
init();
