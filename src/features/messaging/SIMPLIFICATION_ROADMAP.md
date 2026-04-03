# Messaging System Simplification Roadmap

**Current status**: Phase 1 ✅ | Phase 2.1-2.2 ✅ | Phase 3.2 ✅ (PR #401)

**Entry point**:

1. Phase 3.2 ✅ COMPLETE (PR #401) — watch-together extracted to src/watch/watch-file-handler.js
2. Next: Phase 2.2b (optimistic render + error) or Phase 3.1 (file state consolidation)
3. Deferred: Phase 2.3 (route appendCachedHistory)

---

## Overview

High-level concerns and simplifications for the messaging system, ordered by dependencies.
The goal: reduce complexity, clarify ownership, improve testability and reusability.

**Current state**: 1,779 LoC monolith (messages-ui.js), 6 mixed concerns, circular flows, scattered state.
**Target state**: Composable layers, clear ownership, unidirectional flows.

---

## Dependency Map

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: FOUNDATIONS ✅ COMPLETE                             │
├─────────────────────────────────────────────────────────────┤
│ • [x] Session Ownership: Single entry point                 │
│ • [x] State Ownership Clarity: Map all 10+ state variables  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: FIX FLOWS (partially complete)                     │
├─────────────────────────────────────────────────────────────┤
│ • [x] 2.1 Eliminate Dual Caching                            │
│ • [x] 2.2 Fix Send Path: Eliminate circular RTDB echo       │
│ • [ ] 2.2b Optimistic Render with Error Handling (deferred) │
│ • [ ] 2.3 Route appendCachedHistory through Controller      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: DECOUPLE DOMAINS (separate concerns)               │
├─────────────────────────────────────────────────────────────┤
│ • [x] 3.2 Extract Watch-Together from UI ✅ (PR #401)       │
│       Moves ~370 LoC to src/watch/watch-file-handler.js     │
│ • [ ] 3.1 Consolidate File State (deferred)                 │
│ • [ ] 3.3 Fix Reactions Deletion (independent)              │
│ • [ ] 3.4 Move inActiveCall to callController (independent) │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: REFACTOR STRUCTURE (composition)                   │
├─────────────────────────────────────────────────────────────┤
│ • [ ] Extract MessageRenderer: Pure rendering logic         │
│ • [ ] Extract MessageInput: Input handling                  │
│ • [ ] Extract SessionState: Centralized state               │
│ • [ ] Extract ContainerManager: Box/toggle logic            │
│ • [ ] Extract ReactionHandler: Reaction attachment          │
│ • [ ] Thin Orchestrator: messages-ui.js becomes coordinator │
└─────────────────────────────────────────────────────────────┘
```

---

## Known Issues & Edge Cases

Deferred issues identified during implementation. Mapped to phases for resolution.

| Issue                   | Description                                                                             | Phase     | Notes                                                                        |
| ----------------------- | --------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------- |
| Reaction deletion guard | Last reaction removal not detected; RTDB deletes `reactions` key, stale chips rendered  | Phase 3.3 | Fix: track previous reaction state in `onReactionUpdate()` callback          |
| ~~Event ownership~~     | ~~`rejected_call` `from` is callerId, not writer.~~ Resolved: single `call:unanswered` event, `from` is always the writer (caller). | ✅ Done   |                                                                              |
| History event path      | Cached history not yet routed through `message:received` events                         | Phase 2.3 | Phase 2.3 will emit cached messages through same event path as live messages |

**Resolved**:

- ✅ **serverTimestamp() placeholder** (Phase 2.2): Local sends use `Date.now()` (negligible drift); remote messages resolve `serverTimestamp()` before `onMessage` fires

---

## Technical Reference

### Event message `from` field

Event messages (missed/rejected calls) use the caller's userId as `from`, not `'system'`. This keeps all unread/read logic consistent — `from` is always a userId across all message types.

### Zod 4 Patterns

- `z.record(valueSchema)` validates **keys** in Zod 4. Always use `z.record(z.string(), valueSchema)`.
- `.extend()` on unions doesn't work — extend each union member individually.
- `z.record(z.any())` is broken for `details` — use explicit object shape instead.

### Key Files & Roles

- `schema.js` — Zod schemas, `parseMessage()` validation
- `message-factory.js` — `createTextMessage()`, `createFileMessage()`, `createEventMessage()`
- `messaging-controller.js` — Session management (`selectConversation`), event emitter, history cache
- `storage/message-store.js` — Abstract MessageStore interface
- `storage/rtdb-message-store.js` — RTDB implementation: `write()`, `onMessage()`, `onReactionUpdate()`, `onUnreadChange()`
- `messages-ui.js` — Chat UI rendering and input

---

## Phase 1: Foundations (CRITICAL)

### Issue 1.1: Session Ownership — Single Entry Point

**Problem**: Session initialized in 3 places with implicit ordering

```
callController → messagesUI.setSession() → messagingController.openSession()
```

No enforced contract. `currentSession` state crosses layers.

**Impact**: Blocks all other fixes. Foundational ownership issue.

**Size**: Medium (50-100 LoC changes)

**Steps**:

1. [x] Add `messagingController.setCurrentSession(sessionData)` method
   - Validates: `{ contactId, contactName }`
   - Manages: all initialization in one place
   - Returns: clean session object
2. [x] Remove `messagesUI.setSession()` (consolidate into middleware)
3. [x] Update call flow: `callController.setupCall()` → `messagingController.setCurrentSession()`
4. [x] Ensure `currentSession` only readable by UI (emitted via events)

**Success criteria**:

- Single entry point for session init
- `currentSession` state owned by Controller, read-only to UI
- No silent failures from init order

---

### Issue 1.2: State Ownership Clarity — Map All State

**Problem**: 10+ state variables scattered across messagesUI closure

```
currentSession, messageElements, sentFiles, receivedFile, isReceivingFile,
inActiveCall, repositionHandlersAttached, markAsReadTimeout, ...
```

No clear owner. Duplication (IndexedDB + messageElements). Missing contracts.

**Impact**: Blocks flow fixes, caching consolidation, state clarity.

**Size**: Small (planning/mapping, 0 LoC changes yet)

**Steps**:

1. [x] Create `STATE_OWNERSHIP.md` mapping all 10+ variables
   - Current location
   - Current owner
   - Who reads it
   - Who should own it (desired)
   - Duplication issues
2. [x] Categorize by layer:
   - Model state (Controller owns)
   - UI state (messages-ui owns)
   - Side effect state (should be minimal)
3. [x] Identify dual caching sources
4. [x] Plan consolidation strategy

**Success criteria**:

- Clear ownership document
- No ambiguity on state location
- Duplication identified
- Consolidation strategy mapped

---

## Phase 2: Fix Flows

### Issue 2.1: Eliminate Dual Caching ✅ COMPLETE

**Problem**: Message cached in both IndexedDB (Controller) AND messageElements Map (UI)

- 2 sources of truth
- Sync issues
- Memory overhead

**Impact**: Enables send path fix, clarifies state.

**Solution implemented (commit 6c7f8a0)**:

- Removed messageElements Map entirely
- Kept Controller.history as single source of truth (50-msg in-memory cache)
- Changed reaction lookups from Map.get() to DOM querySelector by data-message-id
- Simplified cleanup to query DOM instead of iterating Map

**Success criteria**: ✅ ACHIEVED

- Single source of truth (Controller.history)
- No dual-write inconsistencies
- Clear message storage hierarchy (Controller owns, UI reads via events)

---

### Issue 2.2: Fix Send Path — Eliminate Circular RTDB Echo ✅ COMPLETE

**Core problem**: Sender writes to RTDB, then the RTDB listener echoes the sender's own message back, and the controller emits it as if it were a new incoming message. The sender's message only appears in the UI after this unnecessary round trip.

```
Before fix (both users identical):
  User sends → RTDB write → listener fires → Controller emits 'message:received' → UI renders
  Problem: Sender waits for round trip through Firebase before seeing message

After fix:
  Sender:  Controller.send() → RTDB write → returns ParsedMessage → UI renders immediately
  Remote:  RTDB listener → Controller emits 'message:received' → UI renders (unchanged)
```

**Depends on**: Phase 2.1 ✅ COMPLETE

**Size**: ~40 LoC across 3 files

**Decisions resolved**:

- **sentAt**: `serverTimestamp()` is a placeholder, not a number. Local sends use `Date.now()` instead. The schema accepts `z.number()`, which `Date.now()` satisfies. The tiny drift vs server time is negligible for display.
- **messageId**: `push()` returns a ref with `.key` before `set()` is called. We already have this — just return it.
- **seenMessageIds**: Fully removed. The `onReactionUpdate` callback doesn't need a guard — `child_changed` only fires on live changes (not initial load), so stale reactions aren't a risk.

**Implementation (commits b81387a, 7a9ddcb, 7c0bec7)**:

1. [x] **Store.write()**: Changed to `write(conversationId, message)` where message contains full object with nested messageId
2. [x] **Store.onMessage()**: Filter own messages via `if (msg.from === myUserId) return`
3. [x] **Store.onReactionUpdate(), onUnreadChange()**: Split into separate callbacks
4. [x] **Controller.send()**: Builds ParsedMessage, caches immediately, returns to caller
5. [x] **UI sendMessage()**: Renders returned message immediately via `processReceivedMessage()`
6. [x] **Cleanup**: `seenMessageIds` deleted, `_reactionUpdate` flag removed
7. [x] **Test**: Manual verification — sender sees message immediately, remote receives via emit, reactions work on both ✅

**Success criteria**: ✅ ACHIEVED

- Sender's message renders from Controller.send() return value, not from RTDB echo
- Remote messages still flow through listener → emit → UI (unchanged)
- Reactions work on both own and remote messages
- No duplicate messages in any scenario
- Controller.history is single source of truth

---

### Issue 2.2b: Optimistic Render with Error Handling

**Status**: Ready to implement. Phase 2.2 foundation complete.

**Core problem**: After 2.2, the sender `await`s the RTDB write before rendering. If the write is slow or fails, the user sees nothing. We want the message to appear instantly (optimistic) with visual feedback for pending/failed states.

```
Current (Phase 2.2):
  User sends → await RTDB write → return ParsedMessage → UI renders
  Problem: UI blocked until RTDB write completes

Target (Phase 2.2b):
  User sends → UI renders immediately (pending state) → RTDB write in background
    → success: mark sent (or remove pending indicator)
    → failure: mark failed + show retry
```

**Depends on**: Issue 2.2 ✅ COMPLETE

**Size**: Medium (~80-120 LoC across 3 files)

#### Decisions (finalized for 2.2b)

1. **Message status model**: Add `_status: 'pending' | 'sent' | 'failed'` to ParsedMessage
   - Status travels with message object (local-only, never persisted to RTDB)
   - Prefix with `_` signals local implementation detail

2. **Pending indicator style**: Dimmed/opacity CSS-only
   - `.message-entry[data-status='pending'] .message-bubble { opacity: 0.6; }`
   - No new DOM elements, minimal visual impact

3. **Failed state UI**: Error border + retry affordance
   - Red-tinted bubble border + small "Failed to send. Tap to retry" button
   - Clear signal with recovery path

4. **Retry mechanism**: New messageId via new `push()` call
   - Original failed ID is orphaned (never persisted)
   - Simplifies state management vs tracking partial writes

5. **Timeout behavior**: None — rely on Firebase SDK error handling
   - If `set()` rejects, that's the failure signal
   - Don't add separate timer layer

6. **Cache behavior**: Immediate with status tracking
   - Message enters Controller.history immediately (with `_status: 'pending'`)
   - Update status in-place on success/failure
   - Cached history reflects true state at all times

#### Implementation plan

**Key changes**:

- Store.write() must return writePromise for background resolution
- Controller.send() builds message, caches immediately, starts background write
- Message status tracked with `_status` field in ParsedMessage object

**Steps**:

1. [ ] Modify `RTDBMessageStore.write()` to return `{ writePromise }` instead of awaiting
2. [ ] Modify `Controller.send()` to:
   - Create message via factory
   - Add `_status: 'pending'` to message
   - Cache immediately in Controller.history (with pending status)
   - Start background write via `this.store.write()`
   - Emit `message:status` events on success/failure
   - Return message immediately (optimistic render)
3. [ ] Create `message:status` event emitter in MessagingController
4. [ ] UI messages-ui.js: Listen for `message:status` event, update `data-status` attribute
5. [ ] CSS: Add pending state (opacity: 0.6) and failed state (error border)
6. [ ] UI: Add retry button on failed messages, extract message text, re-send with new messageId
7. [ ] Remove or mark superseded failed message in Controller.history on retry
8. [ ] Test: successful send, offline failure, permissions failure, retry flow
9. [ ] Verify: no duplicates, correct ordering, reactions still work on all states

**Success criteria**:

- Message appears in UI instantly on send (no wait for RTDB)
- Pending state is visually subtle (dimmed bubble)
- Failed state is clear with retry affordance
- Retry works: removes failed message, re-sends with new ID
- No duplicate messages in any scenario
- Controller.history reflects current status of each message

---

### Issue 2.3: Route appendCachedHistory Through Controller

**Status**: Ready to implement. Phase 2.1-2.2 complete.

**Problem**: Direct UI call bypasses validation/caching

Currently: `selectConversation()` calls `fetchHistory()` → caches locally, but not through event path
Goal: All message flow (cached or live) routes through `'message:received'` event

**Impact**: Consistency, validation clarity, single source of truth for rendering.

**Depends on**: Phase 2.1 ✅ (caching consolidated), Phase 2.2 ✅ (circular fix)

**Size**: Small (20-30 LoC changes)

**Steps**:

1. [ ] Create `Controller._emitCachedHistory(conversationId)` helper method
   - Retrieves cached messages from internal conversationState.history
   - Emits `message:received` event for each cached message
   - Uses same event path as live messages
2. [ ] Update `selectConversation()` to call new helper after fetching/caching
3. [ ] Verify UI processReceivedMessage() handles both cached and live messages identically

**Success criteria**:

- Cached messages route through Controller `message:received` event path
- Same validation and rendering as live messages
- Single code path for all message rendering
- No direct appendCachedHistory calls from UI

---

## Phase 3: Decouple Domains

### Issue 3.1: Consolidate File State — Single Owner

**Problem**: File state scattered

```
fileTransferController (injected late)
sentFiles Map (messagesUI)
receivedFile (messagesUI)
isReceivingFile (messagesUI)
buildFileContent → side effects (watch-sync)
```

No clear owner. Side effects during render.

**Impact**: File reusability, testability, watch-together separation.

**Depends on**: Phase 2 flows fixed. Independent of 3.2.

**Size**: Large (150-200 LoC changes)

**Steps**:

1. [ ] Create `FileMessageHandler.js`
   - Single owner for file state
   - Methods: sendFile(), renderFile(), downloadFile()
   - Manages: file tracking, RTDB write, validation
2. [ ] Move sentFiles, receivedFile, isReceivingFile state here
3. [ ] Move buildFileContent logic (but extract pure render part)
4. [ ] Inject into messagesUI as single dependency
5. [ ] Remove side effects from rendering (defer to separate handler)

**Success criteria**:

- Single file state owner
- Clear API for file operations
- Rendering pure (no side effects)
- Can render file messages independently

---

### Issue 3.2: Extract Watch-Together From UI Layer ✅ COMPLETE (PR #401)

**Problem**: Watch-together logic embedded in messages-ui.js — ~250 LoC of modal dialogs,
file tracking state, event handlers, and OPFS/SW integration that has nothing to do with messaging.

**Depends on**: Nothing. Independent of 3.1 (file state consolidation).

**Size**: Medium (~370 LoC moved out, ~4 integration hooks remain)

**Solution Implemented (commit 1ea3706)**:

Created `src/watch/watch-file-handler.js` with:
- `createWatchFileHandler()` factory
- internal tracking for sent/received files, keeping watch-together logic out of messages-ui
- `checkReceivedFile()` — evaluates newly received files for potential watch-together flows
- `requestWatchTogether()` — starts a watch-together session for an already shared file
- `reset()` — clears internal state between sessions

messages-ui.js now calls handler via:
- `watchFileHandler.checkReceivedFile()` when a file is received
- `watchFileHandler.requestWatchTogether()` when the user initiates a watch-together session
- `watchFileHandler.reset()` in its overall reset flow

**Removed from messages-ui.js**:
- Imports: watch-sync, video-serving, isVideoMime
- ~370 LoC (2 modals, 1 event handler, inline video handling)
- sentFiles, receivedFile state variables

**Testing**: ✅ Manual verified
- Build passes
- 299 tests pass (1 skipped)
- Video send/receive with Download/Watch prompt works
- Watch request accept/decline flow verified
- Non-video files still show download link

**Previous coupling points in messages-ui.js** (now all in handler):

```
Imports:
  - handleVideoSelection, createWatchRequest, acceptWatchRequest, cancelWatchRequest (watch-sync)
  - registerVideoForServing, isSwServingSupported (video-serving)

State:
  - sentFiles Map — tracks sent video files by name for watch requests
  - receivedFile — stores last received video file

Functions (~250 LoC):
  - promptFileAction() — modal: "Download or Watch Together?"
  - promptJoinWatchTogether() — modal: "Partner wants to watch, join?"
  - onWatchFileRequest() — handler for 'watch:file-request' CustomEvent

Inline in setFileTransferController().onFileReceived:
  - Video detection (isVideoMime check)
  - OPFS/SW serving logic (registerVideoForServing, isSwServingSupported)
  - Watch request creation (handleVideoSelection + createWatchRequest)
  - receivedFile assignment

Inline in fileInput change handler:
  - sentFiles.set(file.name, file) — video file tracking after send

Cleanup:
  - sentFiles.clear(), receivedFile = null in reset()
  - removeEventListener('watch:file-request') in cleanup()
```


---

### Issue 3.3: Fix Reactions Deletion — Proper Event Guard

**Problem**: RTDB deletes 'reactions' key when last reaction removed

```
Guard: if (msg.reactions !== undefined) [skips deletion!]
Result: Stale reaction chips rendered
```

**Impact**: Reaction UI accuracy (minor but annoying).

**Depends on**: None (independent fix)

**Size**: Small (10-20 LoC changes)

**Steps**:

1. [ ] Change guard: Track previous reaction state
2. [ ] Detect deletion: `prev.reactions !== undefined && curr.reactions === undefined`
3. [ ] Emit 'reaction:deleted' or 'reaction:removed' event
4. [ ] Update UI handler: Clear reaction on deletion

**Success criteria**:

- Reaction deletion properly detected
- No stale chips in UI
- Clear event for deletion

---

### Issue 3.4: Move inActiveCall — To callController

**Problem**: UI state that should be in call layer

```
messagesUI: inActiveCall (used for attach button visibility)
```

Belongs in callController, not messaging.

**Impact**: Cleaner UI layer, better separation.

**Depends on**: Phase 1 (foundations)

**Size**: Small (5-10 LoC changes)

**Steps**:

1. [ ] Move `inActiveCall` to callController
2. [ ] Expose via getter: `callController.isInActiveCall()`
3. [ ] Update messagesUI: Query from callController
4. [ ] Remove from messagesUI state

**Success criteria**:

- inActiveCall lives in callController
- messagesUI queries it (doesn't own it)
- Cleaner separation

---

## Phase 4: Refactor Structure (Composition)

### Issue 4.1-4.5: Decompose messages-ui.js

**Problem**: Single 1,779 LoC closure with 44 nested functions, 6 mixed concerns

**Impact**: Testability, reusability, maintainability.

**Depends on**: All of Phase 2-3 (flows and ownership clarified)

**Size**: XLarge (700+ LoC changes, multiple new files)

**Strategy**:

1. [ ] Extract `MessageRenderer.js` (500 LoC)
   - `renderTextMessage(text)`
   - `renderFileMessage(parsedMessage)`
   - `renderEventMessage(parsedMessage)`
   - `formatTimestamp(timestamp)`
   - Pure functions, no side effects

2. [ ] Extract `MessageInput.js` (200 LoC)
   - `setupMessageInput(handlers)`
   - `sendMessage(text)`
   - File attachment
   - Keyboard shortcuts
   - Focus management

3. [ ] Extract `SessionState.js` (100 LoC)
   - Centralized state object
   - `{ currentSession, messageElements, reactions }`
   - Getter/setter methods
   - Event emission on state change

4. [ ] Extract `ContainerManager.js` (150 LoC)
   - `positionContainer()`
   - `showContainer()`, `hideContainer()`
   - Reposition handlers
   - Toggle integration

5. [ ] Extract `ReactionHandler.js` (100 LoC)
   - `attachReactions(messageId, reactions)`
   - `updateReactions(messageId, reactions)`
   - Emoji picker integration
   - ReactionUI lifecycle

6. [ ] Thin `messages-ui.js` Orchestrator (200 LoC)
   - Import all extracted modules
   - Coordinate between layers
   - Maintain public API
   - Event wiring

**Success criteria**:

- Each module <200 LoC
- Single responsibility per module
- Pure rendering separated from side effects
- Testable, reusable components
- messages-ui.js becomes coordinator, not monolith

---

## Success Criteria (Overall)

✅ **Clarity**

- Single entry point for session init
- Clear state ownership for each variable
- Unidirectional flows (mostly)

✅ **Simplification**

- No dual caching (single source of truth)
- No circular send path duplication
- No side effects in rendering

✅ **Testability**

- Can render messages independently
- Can test file handling independently
- Can test input handling independently
- Can mock single modules, not entire UI

✅ **Maintainability**

- messages-ui.js <300 LoC (currently 1,779)
- Clear module boundaries
- Reusable components
- Easy to trace flow

---

## Timeline Estimate

| Phase                     | Effort     | Complexity | Risk                            |
| ------------------------- | ---------- | ---------- | ------------------------------- |
| **Phase 1** (Foundations) | 1-2 days   | Medium     | Low (blocking but foundational) |
| **Phase 2** (Fix flows)   | 2-3 days   | High       | Medium (affects all clients)    |
| **Phase 3** (Decouple)    | 2-3 days   | Medium     | Low (mostly internal)           |
| **Phase 4** (Refactor)    | 3-4 days   | Medium     | Medium (large change, but safe) |
| **Testing**               | 1-2 days   | Medium     | —                               |
| **Total**                 | ~9-14 days | —          | Medium (staged)                 |

---

## Phase 1 Quick Start (if restarting with fresh context)

When you resume work on Phase 1, focus on these files:

### Issue 1.1: Session Ownership

**Current flow** (broken across 3 layers):

```
src/call/call-controller.js
  → createSession() → { contactId, contactName }

src/ui/components/messages/messages-ui.js
  → messagesUI.setSession(session) → stores in currentSession

src/messaging/messaging-controller.js
  → openSession(contactId) → reads currentSession variable
```

**Goal**: Single entry point. Controller owns session, UI reads via events.

**Key files to modify**:

- `src/messaging/messaging-controller.js` — add setCurrentSession() method
- `src/call/call-controller.js` — call new single entry point
- `src/ui/components/messages/messages-ui.js` — remove setSession(), listen to events

### Issue 1.2: State Ownership Clarity

**Variables to document** (in messages-ui.js initMessagesUI closure):

```javascript
currentSession; // Who should own this?
messageElements(Map); // Duplicates IndexedDB?
cachedMessages(IndexedDB); // Should be single source
sentFiles(Map); // File-specific, should move
receivedFile; // File-specific, should move
isReceivingFile; // File-specific, should move
inActiveCall; // Should be in callController
fileTransferController; // Injected late, state scattered
reactionManager; // OK, owned cleanly
```

**Create** `src/messaging/STATE_OWNERSHIP.md` documenting each variable.

---

## Recommended Execution

**Immediate (this session)**:

- [ ] Phase 1.2: Document state ownership (15 min planning)
- [ ] Phase 1.1: Plan single entry point (15 min design)

**Next session**:

- [ ] Phase 1: Implement foundations (1-2 days)
- [ ] Phase 2: Fix flows (2-3 days)
- [ ] Test end-to-end

**Future**:

- [ ] Phase 3: Decouple domains (2-3 days)
- [ ] Phase 4: Refactor structure (3-4 days)

This staged approach allows early wins (Phase 1-2) while keeping system stable for production.
