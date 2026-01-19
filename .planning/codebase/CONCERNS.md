# Codebase Concerns

**Analysis Date:** 2026-01-08

## Tech Debt

**Large Monolithic Files:**
- Issue: Multiple files exceed 300 lines, mixing concerns
- Files:
  - `src/main.js` (1,342 lines) - Mixing app initialization, call flow, media management, watch sync
  - `src/components/contacts/contacts.js` (662 lines) - Contact management + message toggles + badge listeners
  - `src/webrtc/call-controller.js` (653 lines) - Call state + event handling + cleanup
  - `src/firebase/auth.js` (407 lines) - Auth + persistence fallbacks + One Tap
  - `src/components/modal/copyLinkModal.js` (408 lines) - Modal logic + UI rendering
  - `src/firebase/watch-sync.js` (398 lines) - Watch sync + local state + Firebase listeners
  - `src/media/youtube/youtube-search.js` (391 lines) - Search UI + API integration
- Impact: Difficult to maintain, test, and refactor; high cognitive load
- Fix approach: Split into smaller, focused modules (see REFACTORING-STATUS.md for ongoing work)

**Empty Catch Blocks (Swallowing Errors):**
- Issue: 23 instances of `catch (_) {}` or empty catch blocks silently hiding failures
- Files:
  - `src/webrtc/call-controller.js` (lines 132, 235, 577)
  - `src/firebase/auth.js` (lines 94, 117, 137)
  - `src/main.js` (line 1215)
  - `src/components/base/confirm-dialog.js` (line 68)
- Why: Quick error suppression during development
- Impact: Masks failures, makes debugging extremely difficult
- Fix approach: Add `console.warn()` with context at minimum, or handle errors properly

**Incomplete Refactoring Work:**
- Issue: Contact messaging refactoring paused mid-way (Step 2 pending)
- Files: `src/components/contacts/contacts.js` owns messaging UI (should be in `src/components/messages/`)
- Per `.claude/REFACTORING-STATUS.md`: Need to extract ~190 lines to new `contact-messaging.js` module
- Why: Circular dependency fix completed (Step 1), architectural cleanup incomplete (Step 2)
- Impact: contacts.js remains bloated (662 lines), unclear ownership of message toggles
- Fix approach: Complete Step 2 extraction as documented in REFACTORING-STATUS.md

**Temporary/Draft Files in Source Tree:**
- Issue: 10+ draft/temp files committed to main source directory
- Files:
  - `src/temp/` directory (multiple files)
    - `p2p/integration-example.js` (701 lines)
    - `drafts/webrtc.js` (330 lines)
    - `examples/failed-rejoin-attempt.js` (320 lines)
  - `src/components/messages/OLD_messages-ui.js` (deprecated DataChannel implementation)
  - `src/components/self-contained-drafts/` directory
  - `src/components/base/button/lit-icon-button.draft.js`
  - `src/utils/dom/wip-interop/` (React experiments)
  - `src/utils/dom/wip-van-components/` (VanJS experiments)
- Why: Rapid prototyping without cleanup
- Impact: Bloats source tree, confuses developers about active vs. experimental code
- Fix approach: Archive to separate branch, delete unused drafts, move useful experiments to docs

**Disabled Code Left in Source:**
- Issue: Code commented out or feature-flagged but not removed
- Files:
  - `src/webrtc/call-flow.js` (lines 86-89) - DataChannel setup disabled with comment "Using RTDB contact messaging instead"
  - `src/components/messages/messages-ui.js` (lines 34-85) - Old toggle implementation commented out
- Why: Fear of breaking existing functionality
- Impact: Code clutter, confusing for new developers
- Fix approach: Remove entirely (git history preserves old code) or use proper feature flags

## Known Bugs

**Camera Switch Freezes Remote Stream:**
- Symptoms: When local user switches cameras, partner's remote video freezes consistently
- Trigger: Click "Switch Camera" button (currently hidden via `display: none`)
- Files: `index.html:104` (button hidden), `src/media/media-devices.js` (switch logic)
- Workaround: Feature completely disabled to prevent user frustration
- Root cause: `track.stop()` called before `replaceTrack()` creates freeze window (identified in `.planning/STATE.md`)
- Fix: Move `track.stop()` to AFTER `replaceTrack()` (planned in Phase 2 of GSD roadmap)

**Race Condition in Subscription Updates:**
- Symptoms: (Hypothetical - from refactoring notes) `toggleReplacementInProgress` flag may get stuck
- Trigger: Rapid contact toggle replacements
- Files: `src/components/contacts/contacts.js` (line 412)
- Workaround: Safety timeout resets flag after 5 seconds (lines 433-436)
- Root cause: Async handling without proper state management
- Fix: Implement proper async/await patterns or use locks

## Security Considerations

**Environment Variables in .env Files:**
- Risk: `.env` and `.env.production` contain sensitive Firebase configuration, API keys
- Files: `.env`, `.env.development`, `.env.production`
- Current mitigation: Files in `.gitignore` (verify!)
- Recommendations:
  - Ensure `.env*` files never committed to git
  - Use separate non-committed local files for development
  - Document in `.env.example` that all keys must be kept secret
  - Rotate keys if accidentally committed

**XSS Risk in Contact Names:**
- Risk: Contact names from `window.prompt()` rendered via `innerHTML` without sanitization
- Files: `src/components/contacts/contacts.js` (lines 140-156)
- Current mitigation: None
- Recommendations: Use `textContent` instead of `innerHTML`, or sanitize with DOMPurify

**localStorage Usage for Sensitive Data:**
- Risk: Auth tokens, guest IDs, contact data in localStorage vulnerable to XSS
- Files:
  - `src/firebase/auth.js` (line 32) - Auth persistence fallback
  - `src/components/contacts/contacts.js` (line 59) - Contact data
- Current mitigation: None (relying on HTTPS only)
- Recommendations:
  - Add Content Security Policy headers
  - Validate/sanitize data read from localStorage
  - Prefer secure cookies with httpOnly flag where possible

**No Input Validation on YouTube Search:**
- Risk: User input sent to YouTube API without validation
- Files: `src/media/youtube/youtube-search.js`
- Current mitigation: YouTube API handles malformed input
- Recommendations: Add basic input validation (length limits, character whitelist)

**Admin/Auth Checks Client-Side Only:**
- Risk: (Potential) If admin features exist, checks might be client-side only
- Current mitigation: Firebase Database Rules enforce server-side validation
- Recommendations: Verify all auth checks have corresponding Firebase Rules

## Performance Concerns

**Console Logging in Production Code:**
- Issue: 354+ `console.log()` calls across 52 files, many without dev guards
- Files:
  - `src/main.js` (18 instances)
  - `src/utils/dev/diagnostic-logger.js` (16 instances)
  - `src/firebase/watch-sync.js` (lines 46, 63, 72, 93)
  - `src/webrtc/call-controller.js` (71 instances)
- Impact: Performance overhead in production, noise in browser console
- Measurement: Not profiled
- Improvement path: Wrap with `if (import.meta.env.DEV) { ... }` or use logging library with levels

**Memory Leak Potential in Event Listeners:**
- Issue: Multiple Maps tracking listeners without guaranteed cleanup
- Files:
  - `src/components/contacts/contacts.js` - `contactMessageToggles`, `messageBadgeListeners`, `presenceListeners`
  - `src/utils/dom/component.js` (lines 88, 106) - TODOs note event handlers re-added on every render
- Why: Rapid development without lifecycle management
- Common failures: Orphaned listeners if cleanup not called in all exit paths
- Safe modification: Always call cleanup functions in hangup/unmount paths
- Test coverage: No tests for listener cleanup

**Firebase RTDB Listener Accumulation:**
- Issue: Listener registry tracks listeners but cleanup is manual
- Files: `src/storage/fb-rtdb/rtdb.js` - Array-based tracking
- Problem: Risk of orphaned listeners if `removeRTDBListenersForRoom()` not called
- Cause: No automatic cleanup on component unmount (vanilla JS, no React useEffect)
- Improvement path: Implement automatic cleanup via WeakMap or lifecycle hooks

**YouTube Search Results Caching:**
- Issue: In-memory cache without expiration or size limit
- Files: `src/media/youtube/youtube-search.js`
- Cause: No cache invalidation strategy
- Symptoms at limit: Memory growth in long sessions
- Improvement path: Add LRU cache with max size or TTL expiration

## Fragile Areas

**Authentication Middleware Chain:**
- Why fragile: Multiple auth fallbacks (IndexedDB → LocalStorage → in-memory) with complex branching
- Files: `src/firebase/auth.js` (lines 30-60)
- Common failures: Persistence method mismatch between sessions, iOS Safari OAuth redirect
- Safe modification: Test all three persistence paths, verify iOS PWA handling
- Test coverage: No integration tests for auth persistence fallback chain

**WebRTC Connection State Handling:**
- Why fragile: Connection state transitions (connecting → connected → disconnected) with timeouts
- Files: `src/webrtc/webrtc.js` (lines 15-40), `src/webrtc/call-flow.js`
- Common failures: Timeout fired after connection established, multiple simultaneous state transitions
- Safe modification: Use state machine pattern, add comprehensive logging
- Test coverage: Unit tests exist but not exhaustive for all state transitions

**Watch-Sync Bidirectional Updates:**
- Why fragile: Both peers can update watch state, debouncing prevents feedback loops
- Files: `src/firebase/watch-sync.js` (lines 54-55, debounce timeout)
- Common failures: Race conditions on simultaneous play/pause, seek position drift
- Safe modification: Test with simulated network delays, add conflict resolution
- Test coverage: No integration tests for watch sync

## Scaling Limits

**Firebase RTDB Free Tier:**
- Current capacity: 100 concurrent connections, 1GB storage, 10GB/month bandwidth
- Limit: ~1000 active users/day estimated (depends on usage patterns)
- Symptoms at limit: Connection refused errors, rate limiting
- Scaling path: Upgrade to Spark plan ($25/mo) or move to Firestore

**Client-Side State Management:**
- Current capacity: Works for 1-to-1 calls, single watch session
- Limit: Not designed for group calls (>2 users)
- Symptoms at limit: N/A (app explicitly limited to 1-to-1)
- Scaling path: Requires architectural redesign (mesh vs. SFU vs. MCU)

## Dependencies at Risk

**No Obvious Deprecated Dependencies:**
- Firebase 12.4.0 - Latest
- Vite 7.1.12 - Recent
- Vitest 4.0.13 - Recent
- Playwright 1.56.1 - Recent
- Lit 3.3.1 - Recent

**Underutilized Dependencies:**
- @sentry/browser 10.26.0 - Imported but minimal usage
- Dexie 4.2.1 - Imported but unclear if actively used for contacts
- Lit 3.3.1 - Only used for draft components, not production

## Missing Critical Features

**No Retry/Backoff Strategy:**
- Problem: Firebase RTDB updates lack retry logic on failure
- Files: `src/firebase/watch-sync.js` (line 73) - TODO notes "consider retry/backoff strategy"
- Current workaround: None (silently fails)
- Blocks: Reliable synchronization in poor network conditions
- Implementation complexity: Low (exponential backoff library)

**No Error Handling for WebRTC Connection Failures:**
- Problem: If WebRTC connection fails, no user-facing error message or retry
- Files: `src/webrtc/call-flow.js`, `src/webrtc/call-controller.js`
- Current workaround: User must refresh page and try again
- Blocks: Reliable call establishment
- Implementation complexity: Medium (need UI for retry flow)

**No Test Coverage for Critical Paths:**
- Problem: WebRTC connection flow edge cases untested
- Files: `src/webrtc/call-flow.js` - No comprehensive E2E tests
- Risk: Regressions in connection establishment
- Priority: High (critical user path)
- Difficulty to test: Need multi-browser coordination, fake media devices

## Test Coverage Gaps

**Messaging Refactoring:**
- What's not tested: Per-contact messaging flow (NEW feature)
- Files: `src/firebase/messaging.js`, `src/components/messages/message-toggle.js`
- Risk: Message sending/receiving could break unnoticed
- Priority: High (new critical feature)
- Difficulty to test: Need Firebase RTDB mocking or emulator

**Watch-Sync Edge Cases:**
- What's not tested: Simultaneous play/pause, seek conflicts
- Files: `src/firebase/watch-sync.js`
- Risk: Race conditions in bidirectional sync
- Priority: Medium
- Difficulty to test: Need two-peer simulation

**Auth Persistence Fallback:**
- What's not tested: IndexedDB → LocalStorage → in-memory fallback chain
- Files: `src/firebase/auth.js`
- Risk: Auth breaks in specific browser configurations
- Priority: Medium
- Difficulty to test: Need to simulate quota exceeded, browser API unavailability

## TODOs Summary

23 TODO comments found across codebase:

| File | Line | TODO | Priority |
|------|------|------|----------|
| `src/main.js` | 298 | Migrate remaining code to use CallController.getState() | Medium |
| `src/pwa/PWA.js` | 75 | Fix UI message not displaying (iOS) | Low |
| `src/firebase/watch-sync.js` | 19, 27, 73 | Multiple TODOs for refactoring and retry logic | Medium |
| `src/firebase/auth.js` | 401 | Decide if 1.5s One Tap delay is annoying | Low |
| `src/components/ui/watch-mode.js` | 37 | Check if setupShowHideOnInactivity needs integrating | Low |
| `src/utils/dom/component.js` | 88, 106 | Optimize event handler re-adding on every render | High |
| `src/utils/env/redirectIOSPWA.js` | 4 | Check applicability to Android PWAs | Low |
| `src/webrtc/call-controller.js` | 651 | Decide on singleton vs factory pattern | Medium |

## Summary

**Overall Assessment:** Codebase is functional with good separation of concerns in most areas, but shows signs of rapid iteration without refactoring.

**Strengths:**
- Clear WebRTC/Firebase separation
- Good test infrastructure (Vitest + Playwright)
- PWA support with update handling
- Event-driven architecture for call state

**Weaknesses:**
- Large monolithic files (main.js, call-controller.js, contacts.js)
- Scattered module-level state
- Incomplete refactoring (contact messaging)
- Many empty catch blocks (23 instances)
- Draft/temp files bloating source tree
- Missing error handling for critical paths
- Console logging without dev guards (354+ instances)

**Priority Fixes:**
1. Complete Step 2 refactoring (contact messaging extraction from contacts.js)
2. Add error context to empty catch blocks (23 instances)
3. Clean up src/temp/ and draft files
4. Split main.js into smaller modules
5. Wrap console.log with dev guards
6. Add retry logic for Firebase RTDB updates
7. Document architecture decisions (ADRs)

---

*Concerns audit: 2026-01-08*
*Update as issues are fixed or new ones discovered*
