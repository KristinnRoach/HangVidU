# TODO: Replace Firebase with WebRTC Data Channels

## Overview

Currently the app uses a hybrid architecture:

- **Video chat**: WebRTC peer-to-peer (good!)
- **Watch sync**: Firebase Realtime Database (inconsistent)

For true peer-to-peer architecture, we should replace Firebase with WebRTC data channels for all real-time communication.

## Benefits of WebRTC Data Channels

- **Consistent P2P architecture** - no server dependency
- **Lower latency** - direct peer communication
- **Better privacy** - no data goes through external servers
- **Reduced complexity** - one communication method instead of two
- **No external service costs/limits** - completely self-contained

## Current Firebase Usage to Replace

### Video Chat Signaling (`src/features/connect/`)

- Room creation and joining
- SDP offer/answer exchange
- ICE candidate exchange
- Connection status tracking

### Watch Sync (`src/features/watch2gether/`)

- ✅ **DONE** - Replaced with WebRTC data channels in YouTube improvements
- Play/pause state sync
- Seek position sync
- Video URL sharing

## Implementation Plan

### Phase 1: WebRTC Data Channel Infrastructure

- [ ] Create `src/features/webrtc-data/` module
- [ ] Implement reliable data channel messaging
- [ ] Add message queuing for offline scenarios
- [ ] Create event-based API similar to Firebase listeners

### Phase 2: Replace Video Chat Signaling

- [ ] Implement WebRTC signaling server (simple Node.js/WebSocket)
- [ ] Or use a serverless approach with QR codes/manual exchange
- [ ] Replace Firebase room management
- [ ] Update connection establishment flow

### Phase 3: Testing and Migration

- [ ] Comprehensive testing of P2P data channels
- [ ] Gradual migration with fallback support
- [ ] Remove Firebase dependencies
- [ ] Update documentation

## Technical Considerations

### Signaling Challenge

WebRTC still needs initial signaling to establish connections. Options:

1. **Simple WebSocket server** - minimal server for initial handshake only
2. **QR code exchange** - completely serverless, scan QR to join
3. **Manual copy/paste** - share connection info manually
4. **Hybrid approach** - Firebase for signaling only, data channels for everything else

### Reliability

- Implement message acknowledgment for critical data
- Add retry logic for failed data channel messages
- Handle connection drops and reconnection

### Backward Compatibility

- Maintain Firebase as fallback during transition
- Feature flags to switch between implementations
- Gradual rollout approach

## Priority

**Medium** - This is an architectural improvement that can be done after core features are stable. The current Firebase approach works, but WebRTC data channels would be more aligned with the P2P philosophy.

## Related Files

- `src/features/connect/connection.js` - Main connection logic
- `src/storage/firebaseRealTimeDB.js` - Firebase configuration
- `src/features/watch2gether/watch-sync.js` - ✅ Already refactored
- All files in `src/features/connect/` - Connection management
