# Coding Conventions

**Analysis Date:** 2026-01-08

## Naming Patterns

**Files:**
- kebab-case for all files: `call-controller.js`, `media-controls.js`, `watch-sync.js`
- Test files: `*.test.js` (Vitest), `*.spec.js` (Playwright E2E only)
- Draft files: `*.draft.js` or `OLD_*.js` prefix

**Functions:**
- camelCase for all functions: `getUserId()`, `setupConnectionStateHandlers()`, `updateWatchSyncState()`
- Factory functions: `createComponent()`, `createIconButton()`, `createCallController()`
- Async functions: `async createNewRoom()`, `async checkRoomStatus()` (no special prefix)
- Event handlers: `handleClick()`, `onCallAnswered()`

**Variables:**
- camelCase for local and module-level variables: `watchMode`, `currentRoomId`, `lastWatched`
- No underscore prefix for "private" variables
- Constants: UPPER_SNAKE_CASE - `YT_STATE`, `VITE_*` environment variables
- Boolean flags: Descriptive names - `watchMode`, `justSeeked`, `toggleReplacementInProgress`

**Types:**
- PascalCase for class names: `CallController`, `RoomService`, `SimpleEmitter`

## Code Style

**Formatting:**
- 2-space indentation throughout
- Double quotes for strings: `"value"` not `'value'`
- Semicolons required at end of statements
- No explicit formatter configured (no `.prettierrc`)

**Linting:**
- No linter configured (no `.eslintrc` or `eslint.config.js`)
- Conventions enforced manually via code review

**Module System:**
- ES6 modules exclusively (`import`/`export`)
- Named exports preferred: `export function name() {}`
- Default exports for singletons: `export default ClassName`
- Factory functions: `export function createX() { return new X(); }`

## Import Organization

**Order:**
1. Firebase database functions (from 'firebase/database')
2. Internal modules from same directory (`./file.js`)
3. Internal modules from parent/sibling directories (`../file.js`, `../../file.js`)
4. Utility imports (`../../utils/`)

**Grouping:**
- No blank lines between imports (inconsistent across files)
- No strict alphabetical sorting

**Path Aliases:**
- Not used - all imports are relative paths

**Examples from `src/components/contacts/contacts.js`:**
```javascript
import {
  ref,
  set,
  get,
  remove,
  onValue,
  off,
  onChildAdded,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import { rtdb } from '../../storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId } from '../../firebase/auth.js';
```

## Error Handling

**Patterns:**
- Throw errors from services, catch at boundaries
- Try/catch for async operations
- Log errors with context: `console.warn('Failed to...', e)`
- **Current Gap:** Many empty `catch (_) {}` blocks (23 instances)

**Error Types:**
- Standard `Error` with descriptive messages
- No custom error classes
- Sentry captures unhandled production errors

**Examples:**
```javascript
// Good - with context
try {
  await operation();
} catch (e) {
  console.warn('Failed to perform operation', e);
  throw e;
}

// Bad - silent failure (found in 23 places)
try {
  await operation();
} catch (_) {}
```

## Logging

**Framework:**
- Development: `devDebug()` from `src/utils/dev/dev-utils.js`
- Production: Sentry error tracking
- Diagnostic: `getDiagnosticLogger()` for complex debugging

**Patterns:**
- `console.log()` for general logging (354+ instances)
- `console.warn()` for warnings
- `console.error()` for errors
- Dev guard pattern: `if (import.meta.env.DEV) { console.log(...) }` (inconsistently applied)

**Examples:**
```javascript
devDebug('✓ Created new RTCPeerConnection');
console.warn('Failed to read contacts from RTDB', e);
console.error('Failed to update watch state:', err);
```

## Comments

**When to Comment:**
- File headers with brief description
- Complex algorithms or non-obvious logic
- TODOs for future work (23 found)
- Workarounds or platform-specific hacks

**JSDoc/TSDoc:**
- Used for complex functions: `@param`, `@returns`, `@throws` tags
- Example from `src/storage/fb-rtdb/rtdb.js`:
```javascript
/**
 * Attach and track a firebase listener for cleanup.
 * @param {DatabaseReference} fbRef - Firebase database reference
 * @param {string} type - Event type ('value', 'child_added', 'child_removed')
 * @param {Function} callback - Listener callback
 * @param {string} [roomId] - Optional room ID for room-scoped cleanup
 */
```

**TODO Comments:**
- Format: `// TODO: description` (no username)
- Link to issues when available: `// TODO: Fix race condition (issue #123)`
- **Concern:** 23 TODOs found across codebase

**Section Headers:**
- Separator lines with descriptive headings:
```javascript
// ============================================================================
// STATE
// ============================================================================

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
```

## Function Design

**Size:**
- Keep under ~50 lines when possible
- Large files exist: `src/main.js` (1,342 lines), `src/webrtc/call-controller.js` (653 lines)
- Extract helpers for complex logic

**Parameters:**
- Max 3-4 parameters preferred
- Use options object for more: `function create(options: CreateOptions)`
- Destructure in parameter list: `function process({ id, name })`

**Return Values:**
- Explicit return statements
- Return early for guard clauses
- Async functions return Promises
- No Result<T, E> pattern used

**Examples:**
```javascript
// Good - options object
export function createMessageToggle({
  parent,
  onToggle,
  icon,
  initialUnreadCount,
  id,
}) {
  // ...
}

// Good - early return
export async function getContacts() {
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    // RTDB path
    return await getRTDBContacts();
  }

  // LocalStorage fallback
  return getLocalStorageContacts();
}
```

## Module Design

**Exports:**
- Named exports preferred: `export function name() {}`
- Default exports for singletons: `export default CallController`
- Multiple exports common: `export { a, b, c }`

**Module-Level State:**
- Singletons use module-level variables:
```javascript
let watchMode = false;
let currentRoomId = null;

export const isWatchModeActive = () => watchMode;
export const setWatchMode = (active) => (watchMode = active);
```

**Barrel Files:**
- Not used - no `index.js` re-exports
- Direct imports from specific files

**Circular Dependencies:**
- Actively avoided (refactoring in progress to eliminate)
- History of circular dependency between `messages-ui.js` and `contacts.js` (fixed)

## State Management

**Pattern:** Module-level state with getter/setter functions

**Example from `src/firebase/watch-sync.js`:**
```javascript
let currentRoomId = null;
let currentUserId = null;
let watchMode = false;
let lastWatched = 'none';

export const isWatchModeActive = () => watchMode;
export const setWatchMode = (active) => (watchMode = active);
export const getLastWatched = () => lastWatched;
export const setLastWatched = (mode) => {
  if (['yt', 'url', 'none'].includes(mode)) {
    lastWatched = mode;
  }
};
```

**Registry Pattern:**
- Maps for tracking listeners, sessions, toggles:
```javascript
const presenceListeners = new Map();
const messageBadgeListeners = new Map();
const contactMessageToggles = new Map();
```

## Event Handling

**Pattern:** Custom event emitter (SimpleEmitter class)

**Example from `src/webrtc/call-controller.js`:**
```javascript
class SimpleEmitter {
  constructor() {
    this.listeners = new Map();
  }
  on(name, fn) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(fn);
  }
  emit(name, payload) {
    if (!this.listeners.has(name)) return;
    for (const fn of Array.from(this.listeners.get(name))) {
      try {
        fn(payload);
      } catch (e) {
        console.warn(`Error in event listener for ${name}:`, e);
      }
    }
  }
  off(name, fn) {
    if (!this.listeners.has(name)) return;
    this.listeners.get(name).delete(fn);
  }
}
```

## DOM Manipulation

**Element Access:**
- Centralized element registry: `src/elements.js`
- Query-on-demand with caching:
```javascript
const getElement = (id) => {
  const el = document.getElementById(id);
  if (!el) console.warn(`Element with id: ${id} not found.`);
  return el;
};

export const getElements = () => ({
  localVideoEl,
  remoteVideoEl,
  // ...
});
```

**Show/Hide Pattern:**
- Helper functions from `src/utils/ui/ui-utils.js`:
```javascript
export function showElement(el) {
  if (el) el.style.display = '';
}

export function hideElement(el) {
  if (el) el.style.display = 'none';
}
```

## Async/Await

**Preferred Pattern:** async/await over .then() chains

**Example:**
```javascript
// Good
export async function saveContactData(contactId, contactName, roomId) {
  const loggedInUid = getLoggedInUserId();

  if (loggedInUid) {
    const contactRef = ref(rtdb, `users/${loggedInUid}/contacts/${contactId}`);
    await set(contactRef, { contactId, contactName, roomId, savedAt: Date.now() });
    return;
  }

  // fallback
}

// Avoid .then() chains
```

---

*Convention analysis: 2026-01-08*
*Update when patterns change*
