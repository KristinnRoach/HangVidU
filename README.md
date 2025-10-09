# HangVidU - Simple Video Chat

A minimal peer-to-peer video chat application that doesn't interfere with system audio - perfect for "hanging out" while working on separate tasks.

## Features
- Video-only streaming (no audio interference with your work)
- Simple peer-to-peer connection using WebRTC
- No server required for basic functionality
- Works directly in the browser
- Deployable to GitHub Pages

## How to Use

### Local Testing
1. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
2. Allow camera permissions when prompted

### Creating a Connection (Current Simple Method)
Since this is a minimal demo without a signaling server, connection requires manual sharing:

**Person 1 (Room Creator):**
1. Click "Create Room"
2. The offer data is automatically copied to your clipboard
3. Share this data with your partner (via any messaging app)
4. Wait for your partner to send back their answer
5. Paste the answer when prompted

**Person 2 (Room Joiner):**
1. Enter the room ID shared by Person 1
2. Click "Join Room"
3. Paste the offer data when prompted
4. The answer is automatically copied to your clipboard
5. Share this answer back to Person 1

## Deployment to GitHub Pages
1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Select source branch and folder
4. Your app will be available at `https://[username].github.io/[repository-name]/`

## Technical Notes
- Uses WebRTC for peer-to-peer video streaming
- Currently uses manual signaling (copy/paste) for simplicity
- Uses Google's public STUN server for NAT traversal
- Audio is disabled by default to prevent system audio suppression

## Future Improvements
When ready to expand:
- Add a proper signaling server (WebSocket or Firebase)
- Add audio toggle option
- Add screen sharing capability
- Add text chat
- Improve connection reliability with TURN servers
- Add recording capabilities

## Browser Requirements
- Modern browser with WebRTC support
- Camera permissions
- HTTPS connection (required for camera access when deployed)

## Privacy
- All video streams are peer-to-peer
- No video data passes through any server
- Connection data (offers/answers) must be manually shared