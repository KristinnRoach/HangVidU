// Simple WebRTC video chat implementation
let localStream;
let remoteStream;
let peerConnection;
let roomId;

// Configuration for STUN server (Google's public STUN server)
const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

// Get DOM elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const roomIdInput = document.getElementById('roomId');
const createRoomBtn = document.getElementById('createRoom');
const joinRoomBtn = document.getElementById('joinRoom');
const hangUpBtn = document.getElementById('hangUp');
const statusDiv = document.getElementById('status');

// Initialize - get user media
async function init() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false  // Start with audio off for your use case
        });
        localVideo.srcObject = localStream;
        updateStatus('Camera ready. Create or join a room to start.');
    } catch (error) {
        console.error('Error accessing media devices:', error);
        updateStatus('Error: Could not access camera. Please check permissions.');
    }
}

// Create a peer connection
function createPeerConnection() {
    peerConnection = new RTCPeerConnection(configuration);
    
    // Add local stream tracks to the connection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });
    
    // Handle remote stream
    peerConnection.ontrack = (event) => {
        remoteStream = event.streams[0];
        remoteVideo.srcObject = remoteStream;
        updateStatus('Connected!');
    };
    
    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            // In a real app, you'd send this to the other peer via signaling server
            console.log('New ICE candidate:', event.candidate);
        }
    };
    
    // Handle connection state changes
    peerConnection.onconnectionstatechange = () => {
        updateStatus(`Connection state: ${peerConnection.connectionState}`);
    };
}

// Create room (caller)
async function createRoom() {
    roomId = generateRoomId();
    roomIdInput.value = roomId;
    
    createPeerConnection();
    
    // Create offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    // In a real app, you'd send this offer to a signaling server
    // For demo purposes, we'll copy it to clipboard
    const offerData = {
        type: 'offer',
        sdp: offer.sdp
    };
    
    await navigator.clipboard.writeText(JSON.stringify(offerData));
    updateStatus(`Room created! ID: ${roomId}. Offer copied to clipboard. Share with your partner.`);
    
    // Enable/disable buttons
    createRoomBtn.disabled = true;
    joinRoomBtn.disabled = true;
    hangUpBtn.disabled = false;
    
    // For demo: prompt for answer
    promptForAnswer();
}

// Join room (callee)
async function joinRoom() {
    roomId = roomIdInput.value;
    if (!roomId) {
        updateStatus('Please enter a room ID');
        return;
    }
    
    createPeerConnection();
    
    // For demo: get offer from clipboard or prompt
    const offerText = await promptForOffer();
    if (!offerText) return;
    
    try {
        const offerData = JSON.parse(offerText);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offerData));
        
        // Create answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        
        // Copy answer to clipboard
        const answerData = {
            type: 'answer',
            sdp: answer.sdp
        };
        
        await navigator.clipboard.writeText(JSON.stringify(answerData));
        updateStatus('Answer created and copied to clipboard. Share with room creator.');
        
        // Enable/disable buttons
        createRoomBtn.disabled = true;
        joinRoomBtn.disabled = true;
        hangUpBtn.disabled = false;
    } catch (error) {
        console.error('Error joining room:', error);
        updateStatus('Error: Invalid offer data');
    }
}

// Hang up
function hangUp() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    
    if (remoteVideo.srcObject) {
        remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
    }
    
    // Reset UI
    createRoomBtn.disabled = false;
    joinRoomBtn.disabled = false;
    hangUpBtn.disabled = true;
    roomIdInput.value = '';
    updateStatus('Disconnected. Ready to create or join a room.');
}

// Helper functions
function generateRoomId() {
    return Math.random().toString(36).substr(2, 9);
}

function updateStatus(message) {
    statusDiv.textContent = message;
}

async function promptForOffer() {
    const offer = prompt('Paste the offer from the room creator:');
    return offer;
}

async function promptForAnswer() {
    setTimeout(async () => {
        const answer = prompt('Once your partner joins, paste their answer here:');
        if (answer) {
            try {
                const answerData = JSON.parse(answer);
                await peerConnection.setRemoteDescription(new RTCSessionDescription(answerData));
                updateStatus('Connected!');
            } catch (error) {
                console.error('Error setting answer:', error);
                updateStatus('Error: Invalid answer data');
            }
        }
    }, 2000);
}

// Event listeners
createRoomBtn.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoom);
hangUpBtn.addEventListener('click', hangUp);

// Initialize on page load
init();