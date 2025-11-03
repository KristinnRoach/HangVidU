// FAQ: COMMON QUESTIONS ABOUT THE REFACTOR
// ============================================================================

/**
 * Q: Will I lose any functionality?
 * 
 * A: No! All existing features continue working:
 *    ✓ Watch-together mode
 *    ✓ Media controls (mute, camera switch)
 *    ✓ Chat/messaging
 *    ✓ Picture-in-Picture
 *    ✓ Mobile orientation handling
 *    ✓ Contact saving
 *    ✓ Room rejoining
 * 
 * The new utilities only replace WebRTC boilerplate, not your features.
 */

/**
 * Q: Do I need to change my Firebase database structure?
 * 
 * A: No! The utilities expect the same structure you already use:
 * 
 *    rooms/
 *      {roomId}/
 *        {userId}/
 *          offer: { type, sdp }
 *          answer: { type, sdp }
 *          candidates: [ ... ]
 * 
 * This is backwards compatible with your current code.
 */

/**
 * Q: Can I migrate gradually, not all at once?
 * 
 * A: Yes! Here's a safe approach:
 * 
 *    1. Create new files (webrtc.js, room.js, firebase-signaling.js)
 *    2. Refactor createCall() first
 *    3. Test thoroughly
 *    4. Then refactor answerCall()
 *    5. Then refactor hangUp()
 *    6. Finally remove old code
 * 
 *    Each step is independent, so you can commit and test separately.
 */

/**
 * Q: What about data channels for chat?
 * 
 * A: Option 1 (recommended for now):
 *    Keep your current dataChannel setup - Room doesn't interfere.
 *    Your existing code works unchanged.
 * 
 *    Option 2 (future enhancement):
 *    Access the PC via room.getPeerConnection() for dataChannel:
 *    
 *      const pc = room.getPeerConnection();
 *      if (role === 'initiator') {
 *        const dc = pc.createDataChannel('chat');
 *      } else {
 *        pc.ondatachannel = (e) => setupDataChannel(e.channel);
 *      }
 * 
 *    Option 3 (best - extend utilities):
 *    Modify WebRTCPeer to manage dataChannel internally.
 *    This is a good enhancement task for later.
 */

/**
 * Q: Do I need to know about "perfect negotiation"?
 * 
 * A: Not really - it's handled automatically! But here's what changed:
 * 
 *    BEFORE (error-prone):
 *      - You tracked offer/answer SDP with lastAnswerSdp, lastOfferSdp
 *      - You assigned roles: 'initiator' or 'joiner'
 *      - Offer collisions could cause bugs
 * 
 *    AFTER (automatic):
 *      - Room determines peer "politeness" from userId comparison
 *      - Polite peer (lower ID) yields during collisions
 *      - Impolite peer (higher ID) wins during collisions
 *      - Both use identical code
 * 
 *    Why it's better:
 *      - No more duplicate SDP bugs
 *      - Handles simultaneous connection attempts gracefully
 *      - Both peers run the same code
 *      - Built on MDN recommendations
 */

/**
 * Q: What if two peers have the same userId?
 * 
 * A: This shouldn't happen in production since each user is unique.
 *    But if it does, Room uses roomId as tiebreaker:
 * 
 *      isPolite = userId < roomId
 * 
 *    So politeness is always deterministic.
 */

/**
 * Q: Can I use this with multiple peers (group chat)?
 * 
 * A: Current utilities are designed for P2P only.
 *    For group chat, you'd need:
 * 
 *    1. Multiple Room instances (one per peer)
 *    2. Mesh topology management (N² connections)
 *    3. Or use SFU/MCU (server-based routing)
 * 
 *    The utilities can be extended for group chat,
 *    but that's a future enhancement.
 */

/**
 * Q: What about TURN servers for NAT traversal?
 * 
 * A: Pass them in config:
 * 
 *      new Room({
 *        roomId,
 *        userId: peerId,
 *        iceServers: [
 *          { urls: 'stun:stun.l.google.com:19302' },
 *          { 
 *            urls: 'turn:your-turn-server.com:3478',
 *            username: 'user',
 *            credential: 'pass'
 *          }
 *        ]
 *      }, signaling, callbacks)
 * 
 *    The utilities pass these to RTCPeerConnection automatically.
 */

/**
 * Q: How do I debug connection issues?
 * 
 * A: Room provides connection state callbacks:
 * 
 *      onConnectionStateChange: (state) => {
 *        console.log('Connection:', state);
 *        // 'new', 'connecting', 'connected', 'disconnected', 'failed', 'closed'
 *      },
 *      onIceConnectionStateChange: (state) => {
 *        console.log('ICE:', state);
 *        // 'new', 'checking', 'connected', 'completed', 'failed', 'disconnected', 'closed'
 *      },
 *      onError: (error) => {
 *        console.error('WebRTC Error:', error);
 *      }
 * 
 *    Add devDebug calls to see signal flow:
 *      onSignal: (msg) => devDebug('Signal:', msg.type)
 */

/**
 * Q: What if I need to access the raw RTCPeerConnection?
 * 
 * A: Use getPeerConnection():
 * 
 *      const pc = room.getPeerConnection();
 *      
 *      // Now you can use raw WebRTC APIs:
 *      const stats = await pc.getStats();
 *      pc.addTransceiver();
 *      // etc.
 * 
 *    This is for advanced use cases. Most of the time,
 *    you don't need it.
 */

/**
 * Q: How do I handle network disconnection/reconnection?
 * 
 * A: Listen to connection state and call hangUp() on failure:
 * 
 *      onConnectionStateChange: (state) => {
 *        if (state === 'disconnected') {
 *          // Wait a bit - might reconnect automatically
 *          setTimeout(() => {
 *            if (room.getConnectionState() === 'disconnected') {
 *              hangUp();  // Give up after delay
 *            }
 *          }, 5000);
 *        }
 *        if (state === 'failed') {
 *          hangUp();  // Failed - give up immediately
 *        }
 *      }
 * 
 *    For automatic reconnection, implement a retry loop in hangUp().
 */

/**
 * Q: Can I use this with non-Firebase signaling?
 * 
 * A: Yes! Implement your own SignalingChannel:
 * 
 *      class WebSocketSignaling {
 *        constructor(roomId, userId, peerId) {
 *          this.ws = new WebSocket('wss://signaling-server.com');
 *        }
 *      
 *        async send(message) {
 *          this.ws.send(JSON.stringify(message));
 *        }
 *      
 *        onMessage(callback) {
 *          this.ws.onmessage = (event) => {
 *            callback(JSON.parse(event.data));
 *          };
 *        }
 *      
 *        close() {
 *          this.ws.close();
 *        }
 *      }
 *      
 *      const signaling = new WebSocketSignaling(roomId, peerId, remotePeerId);
 *      const room = new Room(config, signaling, callbacks);
 * 
 *    The utilities don't care how signals get to the remote peer.
 */

/**
 * Q: What about encryption/security?
 * 
 * A: WebRTC data is encrypted by default (DTLS-SRTP).
 *    Signaling (offers/answers/ICE) is NOT encrypted.
 * 
 *    For security:
 *    1. Use HTTPS/WSS for signaling (Firebase does this)
 *    2. Add your own encryption for sensitive data
 *    3. Validate peer identity before connecting
 * 
 *    The utilities don't add encryption - that's your responsibility.
 */

/**
 * Q: How much code did I actually reduce?
 * 
 * A: Here's a rough breakdown:
 * 
 *    Old code:
 *      - createCall(): ~80 lines
 *      - answerCall(): ~60 lines
 *      - hangUp(): ~50 lines
 *      - setupIceCandidates(): ~30 lines
 *      - setupRemoteStream(): ~20 lines
 *      - setupConnectionStateHandlers(): ~20 lines
 *      - Total: ~260 lines of boilerplate
 * 
 *    New code:
 *      - createCall(): ~30 lines
 *      - answerCall(): ~30 lines
 *      - hangUp(): ~15 lines
 *      - WebRTCPeer: ~150 lines (one-time utility)
 *      - Room: ~80 lines (one-time utility)
 *      - FirebaseSignaling: ~60 lines (one-time utility)
 *      - Your code: ~75 lines (same features)
 *      - Total: ~290 lines (but reusable)
 * 
 *    Benefit: 50% less boilerplate in main.js, easier to maintain.
 */

/**
 * Q: Is this production-ready?
 * 
 * A: Mostly, with caveats:
 * 
 *    What's solid:
 *      ✓ Perfect negotiation pattern (MDN recommended)
 *      ✓ Error handling (all callbacks provided)
 *      ✓ Memory cleanup (proper resource disposal)
 *      ✓ Standard WebRTC APIs (no hacks)
 * 
 *    What you need to add:
 *      ✗ Reconnection logic (on failed state)
 *      ✗ Statistics monitoring (optional)
 *      ✗ Advanced ICE tuning (for poor networks)
 *      ✗ Security/authentication (your responsibility)
 *      ✗ Rate limiting/anti-abuse (your responsibility)
 * 
 *    Recommendation: Test in production with monitoring,
 *    add features as needed.
 */

/**
 * Q: What if my peers are behind symmetric NAT?
 * 
 * A: You'll need TURN servers. Pass them to Room:
 * 
 *      const iceServers = [
 *        { urls: 'stun:stun.l.google.com:19302' },  // STUN for NAT traversal
 *        { 
 *          urls: 'turn:your-turn-server.com:3478',
 *          username: 'user',
 *          credential: 'password'
 *        }
 *      ];
 *      
 *      new Room({
 *        roomId, userId: peerId,
 *        iceServers  // ← Pass here
 *      }, signaling, callbacks)
 * 
 *    Services like Twilio, Xirsys, or open TURN servers help here.
 */

/**
 * Q: Can I add new features easily?
 * 
 * A: Yes! The modular design makes extensions clean:
 * 
 *    Example 1: Add screen sharing
 *      room.startScreenShare = async () => {
 *        const stream = await navigator.mediaDevices.getDisplayMedia();
 *        // Replace video track
 *      };
 * 
 *    Example 2: Add stats monitoring
 *      room.getStats = async () => {
 *        const pc = room.getPeerConnection();
 *        return await pc.getStats();
 *      };
 * 
 *    Example 3: Add dataChannel support
 *      // Extend WebRTCPeer with createDataChannel() method
 *      // Update Room to expose it
 * 
 *    The separation makes features easy to add without breaking existing code.
 */

/**
 * Q: What about browser compatibility?
 * 
 * A: Same as your current code (WebRTC is universal):
 * 
 *      ✓ Chrome/Chromium: Full support
 *      ✓ Firefox: Full support
 *      ✓ Safari 14+: Full support
 *      ✓ Edge: Full support (Chromium-based)
 *      ✗ IE11 and older: Not supported
 * 
 *    The utilities use standard WebRTC APIs with no polyfills,
 *    so browser support is identical to your current setup.
 */

/**
 * Q: Do I need TypeScript?
 * 
 * A: No! These utilities are written in plain JavaScript.
 *    No build-time compilation needed, no type checking required.
 * 
 *    If you want TypeScript in the future:
 *      - JSDoc comments are already there
 *      - Easy to convert to TypeScript (.ts files)
 *      - Or add TypeScript incrementally
 */

/**
 * Q: What about testing?
 * 
 * A: Unit testing WebRTC is challenging because it needs network.
 *    Better approach: E2E tests with Playwright (you already use it!)
 * 
 *    Example test:
 *      test('Two peers can connect', async ({ browser }) => {
 *        const context1 = await browser.newContext();
 *        const page1 = await context1.newPage();
 *        
 *        const context2 = await browser.newContext();
 *        const page2 = await context2.newPage();
 *        
 *        // Open initiator
 *        await page1.goto('http://localhost:5173');
 *        await page1.click('text=Start New Chat');
 *        const link = await page1.textContent('.room-link');
 *        
 *        // Open joiner
 *        await page2.goto(link);
 *        
 *        // Wait for connection
 *        await page1.waitForSelector('video[srcObject]');
 *        await page2.waitForSelector('video[srcObject]');
 *        
 *        expect(page1.isVisible('text=Connected')).toBeTruthy();
 *      });
 */

/**
 * Q: Should I remove the old code immediately?
 * 
 * A: No! Safe approach:
 * 
 *    1. Keep old code in git history (git has it)
 *    2. Remove old ice.js file (no longer needed)
 *    3. Comment out old functions (for reference during testing)
 *    4. After successful testing, delete comments
 *    5. Commit with message: "Cleanup: remove deprecated WebRTC code"
 * 
 *    This way, if you need to reference old code, git log has it.
 */

/**
 * Q: What's the rollback plan if something breaks?
 * 
 * A: Three safety nets:
 * 
 *    1. Git history (always have it)
 *       git checkout <old-commit> -- src/main.js
 * 
 *    2. Feature branch
 *       Do refactor on branch, test thoroughly, then merge
 * 
 *    3. Gradual rollout
 *       Refactor createCall() first
 *       Test and commit
 *       Refactor answerCall()
 *       Test and commit
 *       etc.
 * 
 *    If anything breaks, just git revert to previous commit.
 */

/**
 * Q: How long will it take?
 * 
 * A: Breakdown:
 *    - Copy files: 5 min
 *    - Add imports: 2 min
 *    - Refactor createCall(): 15 min
 *    - Refactor answerCall(): 15 min
 *    - Refactor hangUp(): 10 min
 *    - Testing: 30-60 min
 *    - Debugging issues: 15-30 min (usually minimal)
 * 
 *    Total: 2-3 hours for a careful refactor
 *    Total: 1 hour if you know what you're doing and get lucky
 */

/**
 * Q: Can the utilities work with your existing media-controls.js?
 * 
 * A: Yes! No changes needed to media-controls.js.
 *    
 *    Your code accesses:
 *      - getLocalStream() ✓ Unchanged
 *      - getPeerConnection() ✓ Can use room.getPeerConnection()
 *      - remoteVideoEl ✓ Unchanged
 *    
 *    So media controls work identically with the new utilities.
 */

/**
 * Q: Final question: Is this worth doing?
 * 
 * A: Yes, for these reasons:
 * 
 *    1. Reduced complexity (50% less boilerplate)
 *    2. Better reliability (perfect negotiation pattern)
 *    3. Easier debugging (everything in Room object)
 *    4. Easier to extend (add features cleanly)
 *    5. Better code quality (follows WebRTC best practices)
 *    6. Same functionality (nothing breaks)
 *    7. Firebase compatible (no database migration)
 *    8. Low risk (can revert easily)
 * 
 *    The refactor pays for itself in reduced maintenance burden.
 */
