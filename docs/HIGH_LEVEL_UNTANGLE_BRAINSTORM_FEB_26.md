# Architecture Untangling: App State Extraction Plan

**Date**: 2026-02-26
**Status**: Deferred (future work)
**Scope**: Extract centralized app state from scattered modules
**Priority**: High (enables future refactoring and testing)

---

## Overview

HangVidU currently has state scattered across 6+ locations with multiple sources of truth. This document outlines a plan to centralize app state, unblock circular dependencies, and establish clear state ownership before major refactoring.

### Why This Matters

- **main.js is 2000+ lines**: Acts as a monolithic orchestrator
- **Circular imports**: call-controller imports from main.js (blocks modularity)
- **Duplicate state**: roomId tracked in call-controller, watch-sync, and main.js
- **Hard to test**: Can't test features independently without main.js side effects
- **Hard to understand**: State changes are implicit; no single source of truth

---

## Current State Landscape

State is currently scattered across multiple locations:

| Location | State | Issue |
|----------|-------|-------|
| **main.js** | cleanupFunctions[], hasInitLocalStreamAndMedia, listeningRoomIds, pendingInvites, isProcessingInvite | Orchestration-level state mixed with lifecycle flags |
| **watch-sync.js** | currentRoomId, watchMode, lastWatched, currentVideoUrl, currentFileRequest, justSeeked, seekDebounceTimeout, lastSyncAction, wasPlayingBeforeSeek | Watch-together isolated but re-implements room tracking |
| **call-controller.js** | roomId, role, partnerId, state, pc, dataChannel, fileTransferController | Call state encapsulated (good) but duplicates roomId |
| **ui-state.js** | view, currentMedia | UI-only, too minimal |
| **media/state.js** | localStream, remoteStream | Separate but hard to coordinate |
| **Controllers** (messaging, contacts, notifications) | Each manages internal state | Inconsistent patterns |
| **elements.js** | 20+ global DOM element refs | Tight coupling to HTML structure |

---

## 🔴 Blocking Issues (MUST RESOLVE BEFORE EXTRACTING)

### Issue 1: Circular Dependency
**Problem**: `call-controller.js` (line 741) dynamically imports from main.js:
```javascript
const { resetLocalStreamInitFlag } = await import('../main.js');
```

**Impact**: If we extract state from main.js, this import breaks.

**Decision needed**:
- **Option A (Recommended)**: Move `resetLocalStreamInitFlag()` to a utility module (e.g., `media/local-stream-state.js`)
- **Option B**: Pass this as a callback to call-controller during initialization

**Estimate**: 1-2 hours

---

### Issue 2: watch-sync.js Tracks Its Own roomId
**Problem**: Room ID duplicated in multiple places:
```javascript
// watch-sync.js
let currentRoomId = null;

// call-controller.js
this.roomId = null;

// main.js (implicitly via setupWatchSync)
```

**Impact**: Can't establish single source of truth without resolving ownership.

**Decision needed**:
- **Option A (Recommended)**: Call-controller is the single source of truth for roomId. Watch-sync reads from it:
  ```javascript
  setupWatchSync(callController.roomId, userId)  // pass in, don't self-track
  ```
- **Option B**: Centralized app state owns roomId; both modules subscribe to changes via events

**Impact**:
- Option A: watch-sync becomes read-only dependent on call-controller (simpler)
- Option B: Adds pub/sub layer (more flexible, more complex)

**Estimate**: 2-4 hours

---

### Issue 3: cleanup Functions Are Opaque
**Problem**: main.js uses fire-and-forget cleanup pattern:
```javascript
let cleanupFunctions = [];
// ... scattered throughout:
cleanupFunctions.push(() => { ... });
```

**Impact**: When extracting state, unclear what cleanup is needed and when.

**Decision needed**:
- **Recommended**: Create explicit cleanup orchestrator:
  ```javascript
  // app-cleanup.js
  export const appCleanup = {
    onHangup: [],      // cleanup when call ends
    onUnmount: [],     // cleanup on page unload
    onLogout: [],      // cleanup on auth logout

    registerHangup(fn) { this.onHangup.push(fn); },
    registerUnmount(fn) { this.onUnmount.push(fn); },
  };
  ```
  Then modules register: `appCleanup.registerHangup(() => { ... })`

- Alternative: Keep as-is but document what each cleanup does

**Estimate**: 2-3 hours

---

### Issue 4: elements.js Globals
**Problem**: 20+ global DOM element refs create tight coupling:
```javascript
export const localVideoEl, remoteVideoEl, sharedVideoEl, ...
```

**Impact**: UI components rely on globals; hard to isolate/test.

**Decision needed**:
- **Option A (Recommended)**: Keep as-is for now; document that they're scoped to app container
- **Option B**: Move to a UI context service (injected into components)
- **Option C**: Query elements locally (scoped selectors within components)

**Recommend**: Option A (doesn't block state extraction; can defer)

**Estimate**: 0 hours (not blocking)

---

### Issue 5: Invite Processing Has Tangled State
**Problem**: main.js has multiple related states that aren't clearly connected:
```javascript
let pendingInvites = [];
let isProcessingInvite = false;
// + incomingCallPromiseCleanups, incomingListenerCleanups Maps
```

**Impact**: State machine is implicit; hard to reason about flow.

**Decision needed**:
- **Recommended**: Model invite state explicitly:
  ```javascript
  // invite-state.js
  export const inviteState = {
    pending: [],          // invites waiting for user response
    activeCallId: null,   // current call being processed
    isProcessing: false,  // debounce flag
  };
  ```
- Move invite handling logic into dedicated module (e.g., `invite-processor.js`)

**Estimate**: 3-4 hours

---

## 🟡 Key Decisions

| Decision | Options | Recommendation |
|----------|---------|-----------------|
| **State API style** | 1. Plain object (like uiState) 2. Class with getters/setters 3. EventEmitter (pub/sub) 4. Store with actions (Redux-like) | **Start with #2** (simple, testable, avoids globals) |
| **State location** | 1. Single `app-state.js` 2. Multiple domain-specific files (call-state.js, watch-state.js, etc.) | **#2** (scales better, clearer boundaries) |
| **How to notify UI** | 1. Direct function calls (callbacks) 2. EventEmitter 3. Keep using dom data-attributes | **Keep #3** for now (minimal refactor) |
| **Centralize cleanup** | 1. Single app-cleanup registry 2. Each controller self-registers | **#1** (easier to reason about, explicit) |
| **Backward compatibility** | Support old patterns during transition, or clean cutover? | **Clean cutover** (simpler, less technical debt) |

---

## Proposed Implementation Sequence

### Phase 0: Unblock (2-3 days)
These issues must be resolved first; they will break any state extraction attempt.

1. **Extract `resetLocalStreamInitFlag()` from main.js**
   - Create `src/media/local-stream-state.js`
   - Move the flag and function there
   - Update call-controller import
   - Eliminates circular dependency ✓

2. **Resolve watch-sync roomId duplication**
   - Decide: Option A (pass roomId to watch-sync) or Option B (pub/sub)
   - Implement chosen approach
   - Ensure watch-sync doesn't self-track roomId
   - Single source of truth for roomId ✓

3. **Create explicit cleanup orchestrator**
   - Create `src/app-cleanup.js`
   - Replace `cleanupFunctions` array with structured registry
   - Update all call sites in main.js to register with app-cleanup
   - Clear ownership of cleanup responsibilities ✓

4. **Model invite state explicitly**
   - Create `src/contacts/invite-state.js`
   - Extract state machine from main.js
   - Tests for invite flow without main.js ✓

---

### Phase 1: Create App State Structure (1-2 days)
Once Phase 0 is done, begin organizing state.

1. **Create domain-specific state modules**:
   - `src/state/call-state.js` — roomId, role, partnerId, callState, etc.
   - `src/state/watch-state.js` — watchMode, lastWatched, currentVideoUrl, etc.
   - `src/state/ui-state.js` — view, currentMedia (move from ui/core/ui-state.js)
   - `src/state/media-state.js` — localStream, remoteStream (move from media/state.js)
   - `src/state/invite-state.js` — pending invites, activeCallId (move from main.js)

2. **Create getter/setter functions**:
   ```javascript
   // Each state module exports read-only getters + update functions
   export function getCallState() { return { ...callState }; }
   export function setRoomId(id) { callState.roomId = id; }
   export function setCallState(state) { callState.state = state; }
   ```

3. **Create index file** (`src/state/index.js`) that re-exports all state modules

4. **Do NOT connect to UI yet** — just organize state; no side effects

---

### Phase 2: Update Modules to Use New State (2-3 days)
Wire up modules to read/write from new state structure.

1. **Update call-controller.js**:
   - Replace instance properties with calls to state getters/setters
   - Emit events when state changes (already does this)
   - Tests pass; call flow unchanged

2. **Update watch-sync.js**:
   - Remove `currentRoomId`, `currentUserId` instance variables
   - Import from call-state and auth-state instead
   - Maintain watch-specific state (justSeeked, lastSyncAction, etc.)

3. **Update main.js**:
   - Replace module-level state variables with state module imports
   - Use explicit cleanup orchestrator instead of cleanupFunctions array
   - Remove duplicate state tracking

4. **Update media/state.js**:
   - Integrate with centralized state if appropriate, or keep isolated
   - Document its relationship to app state

5. **Full test suite passes** — call, watch, invite flows unchanged ✓

---

### Phase 3: Wire Up UI (1-2 days)
Connect state changes to UI updates.

1. **Keep data-attribute approach** (don't break CSS)
   - UI continues to read `data-view`, `data-mainContent`, etc.
   - State modules emit events when values change
   - UI listeners update attributes

2. **Add event emissions**:
   ```javascript
   // In each state module:
   export function setView(newView) {
     uiState.view = newView;
     document.body.dataset.view = newView;
     window.dispatchEvent(new CustomEvent('app:view-changed', { detail: newView }));
   }
   ```

3. **Remove direct elements.js calls** where practical
   - Components query elements locally rather than importing from elements.js
   - Or inject elements via callback during initialization

4. **Manual testing**:
   - Call creation, joining, hangup ✓
   - Watch mode entry/exit ✓
   - Invite handling ✓
   - Media controls ✓

---

### Phase 4: Cleanup & Verify (1 day)
Final polish and validation.

1. **Remove duplicate state** from individual modules
2. **Run full test suite** (unit + integration + E2E)
3. **Check for unintended side effects**:
   - Memory leaks in listeners
   - State not updating in edge cases
   - UI out of sync with state
4. **Document state ownership** in README or architecture guide

---

## Success Criteria

- [ ] No circular imports (call-controller doesn't import from main.js)
- [ ] Single source of truth for roomId (not duplicated)
- [ ] Cleanup functions tracked in explicit registry (not fire-and-forget)
- [ ] Call, watch, and invite flows work end-to-end
- [ ] App state testable in isolation (without main.js)
- [ ] Modules can be unit tested with mocked state
- [ ] State changes emit events/signals
- [ ] No module imports from main.js (except main.js → modules)

---

## Risks & Mitigation

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| Break call/watch flow during refactoring | High | Execute Phase 0 + Phase 1 in feature branch; continuous testing |
| State becomes God Object | Medium | Use domain-specific state files (#2), not monolithic file |
| Miss hidden dependencies | Medium | Automated grep scan for all state references before moving |
| UI breaks during transition | Medium | Keep data-attributes intact; only change internal representation |
| Cleanup functions not called at right time | Medium | Test cleanup explicitly; add logging for debugging |
| State mutations in unexpected places | Medium | Use Object.freeze() on exported state; only expose setters |

---

## Implementation Notes

### Recommended Execution Style
1. **Create feature branch** (`phase0-unblock-state`)
2. **Work through Phase 0 issues sequentially** (one blocker at a time)
3. **After Phase 0**, merge to main
4. **Then start Phase 1** in new feature branch

### Testing Strategy
- Unit test each state module in isolation
- Integration test modules that depend on state
- E2E test call/watch/invite flows end-to-end
- Add logging to debug state changes during transition

### Backward Compatibility
- No need to support old patterns — this is an internal refactoring
- UI/API don't change; only internal state representation
- Clean cutover is simpler than gradual migration

### Code Review Checklist
- [ ] No circular imports
- [ ] State is read-only (via getters)
- [ ] All mutations go through explicit setters
- [ ] Cleanup functions registered with app-cleanup
- [ ] Tests pass without mocking state
- [ ] No globals (except state modules themselves)
- [ ] Documentation updated for new patterns

---

## Related Documents

- `CLAUDE.md` — Project architecture overview
- `src/main.js` — Current monolithic orchestrator (target for refactoring)
- Phase 2.2b plan — Optimistic render (depends on state extraction)

---

## Future Opportunities

Once state is centralized:

1. **Time-travel debugging** — Can replay state changes for debugging
2. **State persistence** — Save state to localStorage/IndexedDB for recovery
3. **Undo/redo** — Track state changes, allow undoing actions
4. **Performance monitoring** — See where state changes are expensive
5. **Redux DevTools** — Can add Redux DevTools for real-time state inspection
6. **Server sync** — Can easily sync state to server for analytics

---

**Next Steps**: When ready to start, begin with Phase 0. Estimate 2-3 days to unblock, then 5-7 days for full extraction.
