# Codebase Concerns

**Analysis Date:** 2026-01-19

## Tech Debt

**Monolithic main.js (1517 lines):**
- Issue: `src/main.js` contains initialization, event handlers, call management, contacts, YouTube integration, and cleanup logic in a single file
- Files: `src/main.js`
- Impact: Hard to test, difficult to onboard new developers, high coupling between features
- Fix approach: Extract into feature modules (e.g., `src/init/`, `src/call-handlers/`, `src/contacts-ui/`), keep main.js as thin orchestrator

**Singleton vs Factory ambiguity in CallController:**
- Issue: TODO comment on line 712 indicates undecided architecture pattern; currently exports both class and default singleton
- Files: `src/webrtc/call-controller.js`
- Impact: Inconsistent usage patterns, testing difficulties, potential for state leakage
- Fix approach: Decide on pattern, use factory if multiple instances needed, or enforce singleton with explicit getInstance()

**Module-level mutable state scattered across files:**
- Issue: Multiple files use module-level `let` variables for state (e.g., `currentRoomId`, `currentUserId` in watch-sync.js, `guestUserId` in auth.js)
- Files: `src/firebase/watch-sync.js`, `src/firebase/auth.js`, `src/main.js`
- Impact: State can become stale, hard to reset between tests, race conditions possible
- Fix approach: Centralize state in stores or pass state through function parameters

**Unfinished style-system refactor:**
- Issue: CLAUDE.md notes the `style-system` branch is paused while JS components are finalized
- Files: `src/styles/` directory
- Impact: Mixed CSS patterns, some duplicated styles
- Fix approach: Resume and complete the style refactor after JS stabilizes

**Dead/draft code in temp directory:**
- Issue: 11 files in `src/temp/` directory containing examples, drafts, and failed experiments
- Files: `src/temp/drafts/`, `src/temp/examples/`, `src/temp/p2p/`
- Impact: Confusion about what is production code, bundle size if accidentally imported
- Fix approach: Move useful patterns to docs/examples, delete truly dead code

**Light mode disabled with TODO:**
- Issue: Line 95 in theme.css: "TODO: Light mode has issues that need fixing"
- Files: `src/styles/theme.css`
- Impact: Users cannot use light mode, accessibility concern
- Fix approach: Fix the light mode CSS issues, likely contrast/visibility problems

## Known Bugs

**PWA install button not displaying on iOS:**
- Symptoms: Install button hidden on iOS, TODO comment confirms issue
- Files: `src/pwa/PWA.js:75`
- Trigger: Running as iOS PWA or Safari
- Workaround: Currently hidden in prod, shown in dev only

**Mobile autoscroll issue with virtual keyboard:**
- Symptoms: When message input is focused on mobile, viewport may shift unexpectedly
- Files: `src/components/messages/messages-ui.js:71-84`
- Trigger: Opening keyboard on mobile devices in messages UI
- Workaround: Code is commented out, no current fix in place

**One Tap sign-in potentially annoying post-logout:**
- Symptoms: One Tap appears 1.5 seconds after logout
- Files: `src/firebase/auth.js:402`
- Trigger: User logs out
- Workaround: None; TODO to decide if this behavior is desired

## Security Considerations

**Room data is world-readable and writable:**
- Risk: Anyone can read/write to any room in Firebase RTDB without authentication
- Files: `database.rules.json:3-8`
- Current mitigation: Rooms use random IDs, no sensitive data stored beyond SDP
- Recommendations: Consider requiring auth for room creation, add rate limiting at Firebase level, implement room expiration

**Guest user IDs stored in localStorage with 48h TTL:**
- Risk: Guest ID can be extracted from localStorage, used to impersonate calls
- Files: `src/firebase/auth.js:220-258`
- Current mitigation: 48-hour expiration, random ID generation
- Recommendations: Consider shorter TTL for sensitive operations, add server-side validation

**No rate limiting on Firebase operations:**
- Risk: Malicious actor could flood rooms with data, exhaust Firebase quotas
- Files: All Firebase operations throughout codebase
- Current mitigation: App Check (when properly configured)
- Recommendations: Add Firebase Security Rules rate limiting, implement client-side debouncing

**SDP/ICE candidates exposed in RTDB:**
- Risk: WebRTC connection metadata visible to anyone with room ID
- Files: `src/storage/fb-rtdb/rtdb.js`, `database.rules.json`
- Current mitigation: Random room IDs, short-lived rooms
- Recommendations: Consider end-to-end encryption for signaling data

## Performance Bottlenecks

**Excessive console logging (421 occurrences):**
- Problem: 421 console.log/warn/error calls across 63 files
- Files: Throughout `src/` directory
- Cause: Development debugging left in production code
- Improvement path: Implement structured logging, conditionally disable in production, use log levels

**Diagnostic logger always instantiated:**
- Problem: DiagnosticLogger (696 lines) is always imported and used, even when disabled
- Files: `src/utils/dev/diagnostic-logger.js`, `src/main.js:146`
- Cause: Logger initialized then disabled on line 146 of main.js
- Improvement path: Lazy-load diagnostic logger, use tree-shaking friendly exports

**YouTube player loading strategy:**
- Problem: YouTube IFrame API loaded and player created on demand, causing delay
- Files: `src/media/youtube/youtube-player.js`, `src/firebase/watch-sync.js`
- Cause: Lazy loading happens at first use
- Improvement path: Preload YouTube API after initial page load, or add loading indicator

## Fragile Areas

**Listener tracking and cleanup system:**
- Files: `src/storage/fb-rtdb/rtdb.js`, `src/main.js:429-480`, `src/webrtc/call-controller.js:325-356`
- Why fragile: Three separate listener tracking mechanisms (RTDB module array, main.js Sets/Maps, CallController internal Map); easy to miss cleanup
- Safe modification: Always use the centralized `addRTDBListener` and `removeRTDBListenersForRoom` functions
- Test coverage: Tests exist but focus on specific scenarios; integration tests for listener lifecycle recommended

**Watch-together synchronization:**
- Files: `src/firebase/watch-sync.js`
- Why fragile: Complex state machine with debouncing, race condition handling, multiple video types (YouTube, URL, local file)
- Safe modification: Add comprehensive logging, test with network delay simulation
- Test coverage: No dedicated tests for watch-sync.js

**iOS PWA authentication flow:**
- Files: `src/firebase/auth.js:100-127`, `src/utils/env/redirectIOSPWA.js`
- Why fragile: Multiple fallback mechanisms (popup -> Safari external), relies on timing and browser detection
- Safe modification: Test on actual iOS devices across iOS versions
- Test coverage: No E2E tests for iOS-specific flows

**Call freshness validation:**
- Files: `src/main.js:596-627`, `src/components/calling/calling-ui.js`
- Why fragile: Multiple validation methods (joinedAt, outgoingState, roomCreatedAt) with fallback chain
- Safe modification: Extensive diagnostic logging already present; maintain logging during changes
- Test coverage: Some tests exist in `tests/unit/listener-timing.test.js`

## Scaling Limits

**Firebase RTDB listener accumulation:**
- Current capacity: Listeners tracked in module-level array, grows with contacts/rooms
- Limit: Memory pressure on devices with many contacts; Firebase quota limits
- Scaling path: Implement pagination for contacts, lazy listener attachment, TTL-based cleanup

**IndexedDB usage for contacts/messages:**
- Current capacity: Uses Dexie.js wrapper, no size limits enforced
- Limit: Browser-specific quotas (typically 50MB-unlimited)
- Scaling path: Implement data retention policy, pagination for message history

## Dependencies at Risk

**No critical dependencies identified with immediate risk.**

Notable observations:
- Firebase SDK is latest stable
- Vite and Vitest are modern and maintained
- No outdated packages with known security issues detected

## Missing Critical Features

**No retry/backoff strategy for Firebase operations:**
- Problem: TODO comment at `src/firebase/watch-sync.js:82` notes need for retry strategy
- Blocks: Graceful handling of transient network failures

**DataChannel reconnection handling:**
- Problem: If DataChannel closes unexpectedly, no automatic reconnection
- Blocks: Reliable file transfer during connection hiccups
- Files: `src/webrtc/call-controller.js:513-539`

**Error boundaries for UI components:**
- Problem: No global error handling for component crashes
- Blocks: Graceful degradation when component fails
- Files: All components in `src/components/`

## Test Coverage Gaps

**Watch-together synchronization (watch-sync.js):**
- What's not tested: 602 lines of sync logic with no dedicated unit tests
- Files: `src/firebase/watch-sync.js`
- Risk: Sync bugs between YouTube, URL, and file modes could break watch-together
- Priority: High

**Messages UI (messages-ui.js):**
- What's not tested: 986 lines of complex UI logic with file transfer integration
- Files: `src/components/messages/messages-ui.js`
- Risk: Message display, file sharing, and watch-together UI could silently break
- Priority: High

**Contacts component (contacts.js):**
- What's not tested: 669 lines handling contact management and presence
- Files: `src/components/contacts/contacts.js`
- Risk: Contact list, presence indicators, and call initiation could fail
- Priority: Medium

**Main.js orchestration:**
- What's not tested: Overall initialization flow and event wiring
- Files: `src/main.js`
- Risk: App may fail to start or wire up correctly after refactors
- Priority: Medium (some integration tests exist)

**PWA functionality:**
- What's not tested: Install prompts, update handling, iOS-specific flows
- Files: `src/pwa/PWA.js`, `src/pwa/update-handlers.js`
- Risk: PWA may not install or update correctly
- Priority: Low (manual testing typically catches these)

---

*Concerns audit: 2026-01-19*
