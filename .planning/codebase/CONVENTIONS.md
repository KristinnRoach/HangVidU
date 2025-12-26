# Coding Conventions

**Analysis Date:** 2025-12-26

## Naming Patterns

**Files:**
- kebab-case for all multi-word files: `call-controller.js`, `media-controls.js`, `watch-sync.js`, `youtube-search.js`
- PascalCase for class-like components: `AuthComponent.js`
- Test files: `*.test.js` (co-located or in tests/ directory)
- E2E test files: `*.spec.js` (Playwright E2E tests)

**Functions:**
- camelCase for all functions: `initializeMediaControls()`, `updateMuteMicIcon()`, `cleanupMediaControls()`
- Initialization functions: `initialize*()`, `setup*()`
- Cleanup functions: `cleanup*()`
- Getter functions: `get*()` - e.g., `getLocalStream()`, `getUserId()`
- Setter functions: `set*()` - e.g., `setLocalStream()`, `setWatchMode()`
- Boolean checks: `is*()`, `has*()` - e.g., `isWatchModeActive()`, `hasLocalStream()`
- Event handlers: `handle*()`, `on*()` - e.g., `handleMediaPermissionError()`, `onAuthChange()`
- PascalCase for constructors/classes: `CallController`, `RoomService`, `SimpleEmitter`

**Variables:**
- camelCase for local variables: `localStream`, `remoteVideoEl`, `roomId`, `partnerId`
- Element references suffix with `El` or `Btn`: `localVideoEl`, `callBtn`, `muteBtn`
- Boolean variables prefix with `is`, `has`, or `should`: `isHangingUp`, `hasMembers`, `shouldRetry`
- UPPERCASE_SNAKE_CASE for constants: `CALL_FRESH_MS`, `YT_STATE`, `MAX_RETRIES`

**Types:**
- No TypeScript used (vanilla JavaScript only)
- JSDoc type annotations for function parameters

## Code Style

**Formatting:**
- 2-space indentation (consistent across all files)
- Semicolons required at statement ends
- Single quotes for strings: `'hello'` not `"hello"`
- Trailing commas in multi-line arrays/objects
- No Prettier config detected (manual formatting)
- No ESLint config detected (manual linting)

**Line Length:**
- No strict limit enforced
- Visual section dividers for code organization

**Import Statements:**
- ES6 imports: `import { func } from './module.js'`
- File extension `.js` always included in relative imports
- No path aliases configured

## Import Organization

**Order (observed in `src/main.js`):**
1. Side effects/initialization: `import './initSentry.js'`
2. Third-party CSS: `import '@fortawesome/fontawesome-free/css/all.min.css'`
3. Firebase/external libraries: `import { set, get, remove } from 'firebase/database'`
4. Internal relative imports organized by domain
5. Component imports
6. Utility imports

**Grouping:**
- Blank lines between logical import groups
- Related imports grouped together
- No strict alphabetical sorting

**Path Aliases:**
- Not used (all imports are relative paths)

## Error Handling

**Patterns:**
- Try-catch blocks for async operations
- Optional chaining: `snapshot?.val?.()`, `error?.name`
- Nullish coalescing: `value ?? defaultValue`
- Error propagation with meaningful messages

**Async/Await:**
- Consistent use of async/await for promises
- Try-catch for async error handling
- Some `.catch()` chains for fire-and-forget operations

**Error Logging:**
- Development: console.log, console.error, diagnostic logger
- Production: Sentry error tracking
- Some silent catches: `.catch(() => {})` for non-critical failures

## Logging

**Framework:**
- console.log/warn/error for development
- Sentry (`src/initSentry.js`) for production errors
- Custom diagnostic logger: `src/utils/dev/diagnostic-logger.js` (696 lines)

**Patterns:**
- Descriptive error messages: `console.error('Failed to update watch sync state', error)`
- Structured logging in diagnostic logger
- Optional chaining for error properties: `error?.message`

**When:**
- Log state transitions
- Log external service calls (Firebase, WebRTC)
- Log errors with context
- Development-only debug logs removed before commit (mostly)

## Comments

**When to Comment:**
- Explain why, not what: `// Keep local copy of active room ID to avoid stale/null imports`
- Document complex logic: WebRTC signaling flows, watch sync state machines
- Mark TODOs with context: `// TODO: refactor`
- Section dividers for logical code blocks

**JSDoc/TSDoc:**
- Function-level JSDoc for public APIs:
  ```javascript
  /**
   * Create a new call as the initiator.
   *
   * Flow:
   * 1. Validate prerequisites
   * 2. Create peer connection
   * ...
   * @param {Object} options - Configuration options
   * @param {MediaStream} options.localStream - Required
   * @returns {Promise<{success: boolean, ...}>}
   */
  ```

**TODO Comments:**
- Format: `// TODO: description` (no username/issue tracking)
- Examples:
  - `// TODO: refactor`
  - `// TODO: consider retry/backoff strategy`
  - `// Todo: remove flag or finialize usage` (inconsistent casing)

**Section Dividers:**
- ASCII art dividers for major sections:
  ```javascript
  // ============================================================================
  // SECTION NAME
  // ============================================================================
  ```
- Subsection dividers:
  ```javascript
  // ─────────────────────────────────────────────────────────────────────────
  // Subsection
  // ─────────────────────────────────────────────────────────────────────────
  ```

## Function Design

**Size:**
- No strict limit enforced
- Large files: `src/main.js` (1,342 lines), `src/webrtc/call-controller.js` (653 lines)
- Functions generally under 50 lines
- Extract helpers for complex logic

**Parameters:**
- Destructured object parameters for multiple options:
  ```javascript
  function createCall({ localStream, roomId, onSuccess }) { ... }
  ```
- 1-3 positional parameters acceptable
- Prefer named parameters (object destructuring) for 4+ parameters

**Return Values:**
- Explicit return statements
- Return early for guard clauses
- Async functions return Promises
- Success/error objects: `{ success: true, ... }` or `{ success: false, error: ... }`

## Module Design

**Exports:**
- Named exports preferred: `export function createCall() { ... }`
- Default exports for singletons: `export default CallController;`
- Export getter/setter pairs for state: `export function getLocalStream() { ... }`

**Barrel Files:**
- Not commonly used (most imports are direct file imports)
- Elements registry: `src/elements.js` acts as centralized DOM element access

**Module Pattern:**
- Function-based modules (not class-based)
- Module-level state with exported getters/setters
- Cleanup functions returned from initialization

## Event Handling

**Patterns:**
- Event emitter pattern in CallController: `CallController.on('event', handler)`
- addEventListener for DOM events
- Cleanup: Remove event listeners on component teardown
- Store cleanup functions: Arrays or Maps of cleanup functions

**Naming:**
- Event names: kebab-case strings `'call-ringing'`, `'call-connected'`
- Handler functions: camelCase `handleClick`, `onAuthChange`

## State Management

**Patterns:**
- Module-level state: `let localStream = null;` in `src/media/state.js`
- Getter/setter pairs: `getLocalStream()`, `setLocalStream()`
- CallController state object: `this.state = { ... }`
- Firebase RTDB for synchronized state
- IndexedDB for persistent local state (contacts)

**Cleanup:**
- Cleanup functions track resources
- Scoped listener removal: `removeRTDBListenersForRoom(roomId)`
- Stream cleanup: `cleanupLocalStream()`, `cleanupRemoteStream()`

---

*Convention analysis: 2025-12-26*
*Update when patterns change*
