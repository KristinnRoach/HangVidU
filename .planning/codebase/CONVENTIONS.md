# Coding Conventions

**Analysis Date:** 2026-01-19

## Naming Patterns

**Files:**
- `kebab-case.js` for modules: `call-controller.js`, `call-flow.js`, `watch-sync.js`
- `PascalCase.js` for class/component files occasionally: `SelectMediaDevice.js`
- Co-located tests use `.test.js` suffix: `ice.test.js`, `messaging-controller.test.js`
- CSS uses `kebab-case.css`: `chat-controls.css`, `top-bar.css`

**Functions:**
- `camelCase` for all functions: `createCall()`, `answerCall()`, `hangUp()`
- Prefix with verb: `get`, `set`, `is`, `has`, `on`, `handle`, `setup`, `cleanup`
- Event handlers: `onMemberJoined()`, `onAuthChange()`, `handleSignInError()`
- Boolean getters: `isLoggedIn()`, `isWatchModeActive()`, `hasLocalStream()`

**Variables:**
- `camelCase` for variables: `roomId`, `partnerId`, `localStream`
- DOM elements suffixed with `El`, `Btn`, `Box`: `localVideoEl`, `hangUpBtn`, `remoteBoxEl`
- Refs suffixed with `Ref`: `cancellationRef`, `memberRef`, `roomRef`
- Constants use `UPPER_SNAKE_CASE`: `GUEST_STORAGE_KEY`, `DEFAULT_GUEST_TTL_MS`

**Types/Classes:**
- `PascalCase` for classes: `CallController`, `RoomService`, `MessagingController`
- Singleton instances exported as lowercase: `export default new RoomService()`
- Internal classes may be unexported: `class SimpleEmitter {}`

## Code Style

**Formatting:**
- No explicit formatter config file (Prettier or ESLint config) detected
- 2-space indentation observed throughout
- Single quotes for strings
- Trailing commas in arrays/objects
- Semicolons required

**Linting:**
- No ESLint or Biome config at project root
- Rely on editor defaults and Vite's built-in checks

## Import Organization

**Order:**
1. External packages (firebase, lit, dexie)
2. Internal absolute imports from `src/`
3. Relative imports from same module

**Example from `src/main.js`:**
```javascript
// External
import '@fortawesome/fontawesome-free/css/all.min.css';
import { set, get, remove } from 'firebase/database';

// Internal modules
import { removeAllRTDBListeners } from './storage/fb-rtdb/rtdb.js';
import { getLoggedInUserId, getUserId } from './firebase/auth.js';
import CallController from './webrtc/call-controller.js';

// Components
import { showElement, hideElement } from './utils/ui/ui-utils.js';
import { messagesUI } from './components/messages/messages-ui.js';
```

**Path Aliases:**
- None configured - use relative paths from current module
- Deep imports are common: `../../storage/fb-rtdb/rtdb.js`

## Error Handling

**Patterns:**
- Wrap async operations in try/catch
- Log errors with context: `console.error('[AUTH] Google sign-in:', error)`
- Swallow expected errors silently (e.g., popup cancelled)
- Return structured results: `{ success: false, error: 'message' }`

**Example pattern:**
```javascript
async function createCall({ localStream }) {
  try {
    // ... operation
    return { success: true, roomId, pc };
  } catch (error) {
    console.error('createCall failed:', error);
    return { success: false, error: error.message };
  }
}
```

**Firebase error handling:**
```javascript
try {
  await set(roomRef, data);
} catch (error) {
  getDiagnosticLogger().logFirebaseOperation('create_room', false, error, { roomId });
  throw error;
}
```

## Logging

**Framework:** Console + custom `devDebug` utility

**Patterns:**
- Use `devDebug()` for development-only logs (localStorage-gated)
- Use `console.warn()` for recoverable issues
- Use `console.error()` for failures
- Use `console.info()` for important state changes
- Prefix logs with context: `[AUTH]`, `[ROOM]`, `[UI]`

**devDebug usage:**
```javascript
import { devDebug } from './utils/dev/dev-utils.js';
devDebug('[AUTH] Starting popup sign-in flow...');
```

**Enable in dev:**
```javascript
localStorage.setItem('debug:console', '1');
```

## Comments

**When to Comment:**
- Module header comments explaining purpose
- Complex logic or non-obvious behavior
- TODO/FIXME for known issues
- JSDoc for public API functions

**JSDoc/TSDoc:**
- Used for exported functions with `@param` and `@returns`
- Type hints via JSDoc comments (no TypeScript)

**Example:**
```javascript
/**
 * Get the user ID to use for this session.
 * Returns the authenticated user's UID if logged in,
 * otherwise generates a guest ID.
 * @returns {string} The current user ID
 */
export function getUserId() { ... }
```

## Function Design

**Size:**
- Keep functions focused on single responsibility
- Extract helpers for complex operations
- Larger orchestration functions acceptable in `main.js`

**Parameters:**
- Destructure options object for multiple params: `{ localStream, roomId }`
- Provide defaults: `{ truncate = 7 } = {}`
- Validate required params early

**Return Values:**
- Return structured objects for complex results: `{ success, error, data }`
- Return cleanup functions from subscription setups
- Return `null` for not-found scenarios

## Module Design

**Exports:**
- Named exports for utilities and functions
- Default export for primary class/singleton
- Re-export from index files for related modules

**Singleton Pattern:**
```javascript
// room.js
class RoomService { ... }
export default new RoomService();
```

**Controller Pattern:**
```javascript
// call-controller.js
class CallController {
  constructor() { this.resetState(); }
  // ...methods
}
export default new CallController();
```

**Barrel Files:**
- Not heavily used - direct imports preferred
- Elements centralized in `src/elements.js`

## Component Patterns

**Vanilla JS Components:**
Use `createComponent()` from `src/utils/dom/component.js`:

```javascript
const component = createComponent({
  initialProps: { name: 'Ada', count: 0 },
  template: `<div>${name}: ${count}</div>`,
  handlers: { increment: () => { component.count++; } },
  parent: document.body,
  onMount: (el) => { /* setup */ },
  onCleanup: () => { /* teardown */ },
});
```

**Component lifecycle:**
- `onMount` - called after initial render
- `onCleanup` - called when `dispose()` is invoked
- `onPropUpdated(prop, callback)` - per-prop listeners
- `onRender(callback)` - after any render

**Lit Components:**
Used sparingly for complex web components (notification system).

## DOM Element Access

**Centralized in `src/elements.js`:**
```javascript
import { localVideoEl, remoteVideoEl, getElements } from './elements.js';
```

**Robust access for dynamic elements:**
```javascript
import { robustElementAccess } from './elements.js';
const el = await robustElementAccess('dynamic-id', 3, 100);
```

## Firebase Listener Cleanup

**Always track listeners for cleanup:**
```javascript
import { addRTDBListener, removeRTDBListenersForRoom } from './storage/fb-rtdb/rtdb.js';

// Attach with tracking
addRTDBListener(membersRef, 'child_added', callback, roomId);

// Cleanup when done
removeRTDBListenersForRoom(roomId);
```

## CSS Conventions

**Design Tokens in `src/styles/theme.css`:**
```css
:root {
  --bg-primary: #1a1a1a;
  --text-primary: #eee;
  --spacing-md: 10px;
  --radius-md: 5px;
  --transition-base: 200ms;
}
```

**Use CSS custom properties throughout:**
```css
.button {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}
```

**Modular CSS structure:**
- `init/` - resets and base typography
- `element/` - element-level styles (button, input)
- `layout/` - grid and wrapper utilities
- `components/` - component-specific styles

---

*Convention analysis: 2026-01-19*
