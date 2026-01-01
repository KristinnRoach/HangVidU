# Codebase Concerns

**Analysis Date:** 2025-12-26

## Tech Debt

**CallController Refactoring In Progress:**
- Issue: Singleton vs factory pattern decision pending
- Files: `src/webrtc/call-controller.js:651`
- Why: Backward compatibility during refactoring
- Impact: Architecture uncertainty, potential future breaking changes
- Fix approach: Document in `refactor-draft/task-list.md` - decide on pattern, complete refactor

**Main.js State Migration:**
- Issue: Still using global state instead of CallController.getState()
- Files: `src/main.js:294`
- Why: Incremental migration in progress
- Impact: Mixed state management patterns, potential stale state bugs
- Fix approach: Complete migration to CallController state, remove global variables

**Watch-Together Code Duplication:**
- Issue: Video loading/sync logic duplicated across 3 files
- Files: `src/firebase/watch-sync.js:315`, `src/media/youtube/youtube-player.js`, `src/main.js`
- Why: Evolved organically without refactoring
- Impact: Maintenance burden, potential sync bugs from inconsistent updates
- Fix approach: Extract shared logic into single module, create clear ownership

**Event Handler Re-attachment on Render:**
- Issue: Event handlers re-added on every component render
- Files: `src/utils/dom/component.js:88`, `src/utils/dom/component.js:106`
- Why: Simple implementation, optimization deferred
- Impact: Performance overhead on frequent re-renders
- Fix approach: Track attached listeners, skip if already attached

**Temporary Code Not Archived:**
- Issue: 11 files in `src/temp/` directory cluttering codebase
- Files: `src/temp/drafts/`, `src/temp/examples/`, `src/temp/p2p/`
- Why: Development artifacts not cleaned up
- Impact: Cognitive load, unclear what's production vs draft
- Fix approach: Move to separate branch or delete entirely

## Known Bugs

**Switch Camera Freezing Remote Stream:**
- Symptoms: Partner's video stream freezes when local user switches camera
- Trigger: Click switch camera button (currently disabled)
- Files: `index.html:104` (button hidden with `display: none`)
- Workaround: Switch camera feature completely disabled
- Root cause: Stream replacement not properly handled on remote peer
- Fix: Debug stream renegotiation, ensure tracks properly replaced

**Watch Sync Pre-Call State Loss:**
- Symptoms: Video loaded before call established doesn't sync when partner joins
- Trigger: Load YouTube video, then initiate call
- Files: `src/firebase/watch-sync.js:27`
- Workaround: Reload video after call connects
- Root cause: Watch sync state not persisted if set before room exists
- Fix: Store pending watch state, apply when room created

**iOS PWA Install Message Not Rendering:**
- Symptoms: PWA install button message doesn't display on iOS
- Trigger: PWA install flow on iOS Safari
- Files: `src/pwa/PWA.js:75`
- Workaround: None (install still works, just no message)
- Root cause: Unknown iOS-specific rendering issue
- Fix: Debug iOS-specific DOM rendering, test on actual iOS device

## Security Considerations

**XSS Risk in Contact Names:**
- Risk: User-provided contact names rendered unsanitized via innerHTML
- Files: `src/components/contacts/contacts.js:140-156` (contact name from `window.prompt()`)
- Current mitigation: None
- Recommendations: Sanitize contact names before innerHTML, or use textContent

**XSS Risk in YouTube Search Results:**
- Risk: Video titles/thumbnails from YouTube API rendered via innerHTML
- Files: `src/media/youtube/youtube-search.js:301-307`, `src/media/youtube/youtube-search.js:356`
- Current mitigation: Trust YouTube API data (relatively safe)
- Recommendations: Use DOMPurify or switch to createElement for safety

**Weak Random ID Generation:**
- Risk: Math.random() used for security-sensitive IDs (room, user)
- Files: `src/room.js:24` (room IDs), `src/webrtc/webrtc-utils.js:140` (room IDs), `src/firebase/auth.js:96` (guest user IDs)
- Current mitigation: None
- Recommendations: Replace Math.random() with crypto.getRandomValues() for cryptographically secure IDs

**Hardcoded Configuration in Source:**
- Risk: Firebase proxy targets and ngrok domains hardcoded in vite.config.js
- Files: `vite.config.js:117-120` (ngrok domains), `vite.config.js:125,130` (Firebase auth proxy)
- Current mitigation: Values work for current deployment
- Recommendations: Move to environment variables for flexibility and security

## Performance Bottlenecks

**Large Main Orchestrator File:**
- Problem: main.js is 1,342 lines handling multiple concerns
- Files: `src/main.js`
- Measurement: Not measured, but high cognitive complexity
- Cause: Central orchestration without extraction
- Improvement path: Extract feature initialization to separate modules, reduce main.js to <500 lines

**YouTube Search Cache Never Invalidated:**
- Problem: Search results cached indefinitely across searches
- Files: `src/media/youtube/youtube-search.js:20`
- Measurement: Not measured
- Cause: Simple caching with no expiration strategy
- Improvement path: Add cache size limit, TTL, or invalidation on new search

**Event Listener Memory Potential:**
- Problem: Dynamic element listeners may not be removed on re-render
- Files: `src/pwa/PWA.js:90`, `src/media/youtube/youtube-search.js:110`, `src/components/contacts/contacts.js`
- Measurement: Not measured
- Cause: Cleanup not visible in analyzed code
- Improvement path: Audit all addEventListener calls, ensure removeEventListener on cleanup

## Fragile Areas

**Firebase Listener Cleanup Chain:**
- Why fragile: Listeners tracked in Maps, scoped cleanup must match registration scope
- Files: `src/storage/fb-rtdb/rtdb.js`
- Common failures: Listeners not removed if cleanup called with wrong scope
- Safe modification: Always use `addRTDBListener()`, always call scoped cleanup
- Test coverage: Has unit tests (`tests/unit/listener-persistence.test.js`)

**Auth Persistence Fallback Chain:**
- Why fragile: Three-tier fallback (IDB → localStorage → in-memory) with silent failures
- Files: `src/firebase/auth.js:39-50` (getRedirectResult catches silently), auth.js persistence setup
- Common failures: Subtle auth state loss if fallback layers fail
- Safe modification: Test all three fallback scenarios, ensure error propagation
- Test coverage: Unclear for all failure scenarios

**Watch Sync Bidirectional State:**
- Why fragile: Debouncing and "lastLocalAction" prevent feedback loops
- Files: `src/firebase/watch-sync.js` (complex state machine)
- Common failures: Race conditions if debounce logic broken, infinite update loops
- Safe modification: Understand debounce/feedback prevention before modifying sync logic
- Test coverage: Integration tests needed for bidirectional sync

## Scaling Limits

**No TURN Server:**
- Current capacity: Works behind most NATs with STUN only
- Limit: Symmetric NAT or restrictive firewalls will fail connection
- Symptoms at limit: Call fails to connect, ICE gathering timeout
- Scaling path: Add commercial TURN server (Twilio, Xirsys) for reliability

**Firebase Realtime Database Free Tier:**
- Current capacity: Depends on Firebase project plan
- Limit: Concurrent connections, bandwidth limits
- Symptoms at limit: Connection failures, slow signaling
- Scaling path: Upgrade Firebase plan or add connection pooling

## Dependencies at Risk

**No Critical Dependency Issues Detected:**
- All dependencies appear current as of late 2024
- Firebase 12.4.0 (latest)
- Vite 7.1.12 (latest)
- Vitest 4.0.13 (latest)
- Playwright 1.56.1 (latest)

## Missing Critical Features

**Retry Logic for Firebase Writes:**
- Problem: Firebase write failures only logged, no retry
- Files: `src/firebase/watch-sync.js:60-75`
- Current workaround: Hope writes succeed (usually do)
- Blocks: Reliable watch sync in poor network conditions
- Implementation complexity: Low (add exponential backoff with max retries)

**Error User Feedback for WebRTC Failures:**
- Problem: WebRTC connection failures show generic error, no diagnostics
- Files: Call flow error handling throughout `src/webrtc/`
- Current workaround: Console logging for debugging
- Blocks: Users don't know why calls fail (firewall, NAT, media permissions)
- Implementation complexity: Medium (classify errors, show user-friendly messages)

**Contact Synchronization Across Devices:**
- Problem: Contacts stored locally (IndexedDB), not synced via Firebase
- Files: `src/storage/idb.js`, `src/components/contacts/contacts.js`
- Current workaround: Manual re-entry on each device
- Blocks: Seamless multi-device experience
- Implementation complexity: Medium (migrate to Firebase RTDB with auth gating)

## Test Coverage Gaps

**Watch Sync Retry Scenarios:**
- What's not tested: Failed Firebase writes with retry logic
- Files: `src/firebase/watch-sync.js`
- Risk: Retry logic doesn't exist, can't test what's missing
- Priority: Medium
- Difficulty to test: Low once retry implemented

**Auth Fallback Chain Edge Cases:**
- What's not tested: All three fallback tiers (IDB fail → localStorage fail → in-memory)
- Files: `src/firebase/auth.js`
- Risk: Silent auth state loss in production
- Priority: High
- Difficulty to test: Medium (need to mock storage failures)

**WebRTC Connection Failure Scenarios:**
- What's not tested: NAT traversal failures, TURN fallback (no TURN configured)
- Files: `src/webrtc/call-flow.js`, `src/webrtc/ice.js`
- Risk: Connection failures in restrictive network environments go untested
- Priority: Medium
- Difficulty to test: High (requires network simulation)

**Media Device Switching:**
- What's not tested: Camera switching flow (feature disabled due to bug)
- Files: Camera switching code exists but disabled
- Risk: Can't test disabled feature
- Priority: High (blocks re-enabling feature)
- Difficulty to test: Medium (requires debugging stream renegotiation)

## Documentation Gaps

**Watch Sync State Machine:**
- Problem: Complex bidirectional sync with debounce logic lacks detailed inline docs
- Files: `src/firebase/watch-sync.js`
- Risk: Future maintainers won't understand feedback loop prevention
- Priority: Medium
- Fix: Add state machine diagram or detailed comments

**WebRTC Call Flow:**
- Problem: 353 lines of call setup logic with minimal inline comments
- Files: `src/webrtc/call-flow.js`
- Risk: ICE/SDP flow not obvious to new developers
- Priority: Low
- Fix: Add flow diagrams or more detailed JSDoc

**Dual Persistence Strategy:**
- Problem: Firebase vs localStorage decision for contacts not documented
- Files: `src/components/contacts/contacts.js`
- Risk: Unclear when each persistence layer is used
- Priority: Low
- Fix: Document strategy in CLAUDE.md or inline comments

---

*Concerns audit: 2025-12-26*
*Update as issues are fixed or new ones discovered*
