# Messaging System Simplification Roadmap

**Entry point for new sessions**:
1. Read MEMORY.md § ACTIVE to understand Phase 1 scope
2. Jump to "Phase 1 Quick Start" section below
3. Start with Issue 1.1 (Session Ownership)

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
│ Phase 1: FOUNDATIONS (unblock everything)                   │
├─────────────────────────────────────────────────────────────┤
│ • [ ] Session Ownership: Single entry point                 │
│       └─> Blocks: all flows, state clarity, init sequence   │
│ • [ ] State Ownership Clarity: Map all 10+ state variables  │
│       └─> Blocks: flow fixes, dual caching, scattered state │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: FIX FLOWS (eliminate redundancy)                   │
├─────────────────────────────────────────────────────────────┤
│ • [ ] Eliminate Dual Caching: IndexedDB XOR messageElements │
│       └─> Unblocks: send path optimization, memory clarity  │
│ • [ ] Fix Send Path: Eliminate circular RTDB echo           │
│       └─> Unblocks: appendCachedHistory simplification      │
│ • [ ] Route appendCachedHistory: Through Controller, not UI  │
│       └─> Unblocks: validation consistency                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: DECOUPLE DOMAINS (separate concerns)               │
├─────────────────────────────────────────────────────────────┤
│ • [ ] Consolidate File State: Single owner, clear API       │
│       └─> Unblocks: file message rendering reusability      │
│ • [ ] Extract Watch-Together: From UI layer                 │
│       └─> Unblocks: independent file rendering              │
│ • [ ] Fix Reactions Deletion: Proper deletion event guard    │
│       └─> Unblocks: reaction UI accuracy                    │
│ • [ ] Move inActiveCall: To callController                  │
│       └─> Unblocks: cleaner UI layer                        │
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
1. [ ] Add `messagingController.setCurrentSession(sessionData)` method
   - Validates: `{ contactId, contactName }`
   - Manages: all initialization in one place
   - Returns: clean session object
2. [ ] Remove `messagesUI.setSession()` (consolidate into middleware)
3. [ ] Update call flow: `callController.setupCall()` → `messagingController.setCurrentSession()`
4. [ ] Ensure `currentSession` only readable by UI (emitted via events)

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
1. [ ] Create `STATE_OWNERSHIP.md` mapping all 10+ variables
   - Current location
   - Current owner
   - Who reads it
   - Who should own it (desired)
   - Duplication issues
2. [ ] Categorize by layer:
   - Model state (Controller owns)
   - UI state (messages-ui owns)
   - Side effect state (should be minimal)
3. [ ] Identify dual caching sources
4. [ ] Plan consolidation strategy

**Success criteria**:
- Clear ownership document
- No ambiguity on state location
- Duplication identified
- Consolidation strategy mapped

---

## Phase 2: Fix Flows

### Issue 2.1: Eliminate Dual Caching
**Problem**: Message cached in both IndexedDB (Controller) AND messageElements Map (UI)
- 2 sources of truth
- Sync issues
- Memory overhead

**Impact**: Enables send path fix, clarifies state.

**Depends on**: Phase 1.2 (state ownership clarity)

**Size**: Medium (100-150 LoC changes)

**Current flow**:
```
Receive: RTDB → Controller.cacheHistory(IndexedDB) + UI.messageElements.set()
         Both stores same data
```

**Steps**:
1. [ ] Decide: Single source of truth?
   - **Option A**: IndexedDB only, UI reads from it (slower, complex queries)
   - **Option B**: messageElements Map only, no IndexedDB (loses persistence)
   - **Option C**: IndexedDB for persistence, messageElements as display cache (must sync)
2. [ ] Implement chosen option
   - Likely Option C (persistence + performance)
   - messageElements = display cache, auto-sync with IndexedDB
3. [ ] Remove redundant writes
4. [ ] Update receive flow to single-path caching

**Success criteria**:
- Single authoritative message store
- No dual-write inconsistencies
- Clear cache hierarchy

---

### Issue 2.2: Fix Send Path — Eliminate Circular RTDB Echo
**Problem**: Message rendered twice
```
UI.appendMessage() → Controller.send() → RTDB
   → listen → emit → UI.appendMessage() AGAIN
```
Band-aid: `seenMessageIds` prevents visual dup, but inefficient.

**Impact**: Eliminates redundant processing, clarifies flow.

**Depends on**: Phase 2.1 (dual caching fixed), Phase 1.1 (session ownership)

**Size**: Large (200+ LoC changes across multiple files)

**Options**:

**Option A: Optimistic render only (no echo)**
```
UI.appendMessage(optimistic)
Controller.send()
  → RTDB write
  → validateAndCache (silent, no UI event)
  → skip emit for local send
```
Pros: Clean, single render
Cons: No validation echo, harder to sync errors

**Option B: Await RTDB ack (single authoritative render)**
```
UI.sendMessage()
  → Controller.send() [returns Promise]
    → RTDB push
    → Wait for listener confirmation
    → Emit only to remote clients (skip local)
  → UI.appendMessage(validated)
```
Pros: Single source of truth, validated render
Cons: Slower UX, needs ack mechanism

**Option C: Keep circular, optimize dedup (current+improve)**
```
Keep current flow, but:
  → Use messageId for dedup (not seenMessageIds)
  → Skip re-validation for local sends
  → Mark as "local until confirmed"
```
Pros: Minimal changes
Cons: Still inefficient

**Recommended**: Option A or B (eliminate redundancy)

**Steps** (for Option A):
1. [ ] Modify Transport.listen(): Skip emit for messages from currentUser
   - Only emit for remote messages
   - Local sends don't trigger event
2. [ ] Update Controller: No event for own messages
3. [ ] Validation: Silent, no UI impact
4. [ ] Remove `seenMessageIds` (no longer needed)

**Success criteria**:
- Message rendered once (optimistic)
- No RTDB echo for local sends
- Remote clients still receive events
- No visual duplication

---

### Issue 2.3: Route appendCachedHistory Through Controller
**Problem**: Direct UI call bypasses validation/caching
```
Controller._prepUIForSession()
  → appendCachedHistory()
    → for each: messagesUI.appendMessage() [direct!]
```
Inconsistent with receive path (which goes through Controller).

**Impact**: Consistency, validation clarity.

**Depends on**: Phase 2.1 (caching consolidated), Phase 2.2 (send path)

**Size**: Small (20-30 LoC changes)

**Steps**:
1. [ ] Create `Controller.emitCachedHistory(session)` method
   - Returns cached messages
   - Emits 'message:received' for each
   - Uses same event path as live messages
2. [ ] Update _prepUIForSession to use new method
3. [ ] Remove direct appendCachedHistory call

**Success criteria**:
- Cached messages route through Controller event path
- Same validation as live messages
- UI doesn't call appendMessage directly

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

**Depends on**: Phase 2 flows fixed

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

### Issue 3.2: Extract Watch-Together From UI Layer
**Problem**: Watch-together logic embedded in messages-ui.js
```
buildFileContent() → handleVideoSelection()
  → registerVideoForServing() [side effect during render!]
```
Tightly coupled. Can't render files without triggering watch-sync.

**Impact**: File rendering reusability, separation of concerns.

**Depends on**: Phase 3.1 (file state consolidated)

**Size**: Medium (100-150 LoC extraction)

**Current coupling**:
```
messagesUI imports: watch-sync module
buildFileContent() calls: registerVideoForServing()
buildFileContent() calls: handleVideoSelection()
```

**Steps**:
1. [ ] Extract pure render: `buildFileMessageUI(parsedMessage)` (no side effects)
2. [ ] Create `VideoMessageHandler.js`
   - Owns: video detection, watch-sync integration
   - Handles: click events, request creation
   - No rendering (uses renderer)
3. [ ] Update appendMessage: Render pure content, attach handler separately
4. [ ] Remove watch-sync import from messages-ui

**Success criteria**:
- File rendering has no side effects
- Watch-together in separate module
- Can render video files independently
- Clear separation: render vs behavior

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

| Phase | Effort | Complexity | Risk |
|-------|--------|-----------|------|
| **Phase 1** (Foundations) | 1-2 days | Medium | Low (blocking but foundational) |
| **Phase 2** (Fix flows) | 2-3 days | High | Medium (affects all clients) |
| **Phase 3** (Decouple) | 2-3 days | Medium | Low (mostly internal) |
| **Phase 4** (Refactor) | 3-4 days | Medium | Medium (large change, but safe) |
| **Testing** | 1-2 days | Medium | — |
| **Total** | ~9-14 days | — | Medium (staged) |

---

## Phase 1 Quick Start (if restarting with fresh context)

When you resume work on Phase 1, focus on these files:

### Issue 1.1: Session Ownership
**Current flow** (broken across 3 layers):
```
src/webrtc/call-controller.js
  → createSession() → { contactId, contactName }

src/ui/components/messages/messages-ui.js
  → messagesUI.setSession(session) → stores in currentSession

src/messaging/messaging-controller.js
  → openSession(contactId) → reads currentSession variable
```

**Goal**: Single entry point. Controller owns session, UI reads via events.

**Key files to modify**:
- `src/messaging/messaging-controller.js` — add setCurrentSession() method
- `src/webrtc/call-controller.js` — call new single entry point
- `src/ui/components/messages/messages-ui.js` — remove setSession(), listen to events

### Issue 1.2: State Ownership Clarity
**Variables to document** (in messages-ui.js initMessagesUI closure):
```javascript
currentSession              // Who should own this?
messageElements (Map)       // Duplicates IndexedDB?
cachedMessages (IndexedDB)  // Should be single source
sentFiles (Map)             // File-specific, should move
receivedFile               // File-specific, should move
isReceivingFile            // File-specific, should move
inActiveCall               // Should be in callController
fileTransferController     // Injected late, state scattered
reactionManager            // OK, owned cleanly
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
