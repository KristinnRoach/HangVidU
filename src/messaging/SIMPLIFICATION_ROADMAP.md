# Messaging System Simplification Roadmap

**Current status**: Phase 1 ✅ COMPLETE (PR #395). Phase 1.5 (cleanup) available.

**Entry point**:

1. Read MEMORY.md § NEXT for Phase 2 context
2. Jump to **"Phase 2: Fix Flows"** section (line ~140)
3. Start with Issue 2.2 (Fix Send Path)

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
Current flow (both users identical):
  User sends → RTDB write → listener fires → Controller emits 'message:received' → UI renders

Problem: Sender takes the same path as remote receiver. The message goes up to
Firebase and comes back down before the sender sees it in the UI.

Band-aid: seenMessageIds Set in rtdb-transport.js:180 deduplicates, but doesn't
fix the fundamental issue — the sender still waits for the echo.
```

**After fix**:

```
Sender:  Controller.send() → RTDB write → returns ParsedMessage → UI renders immediately
Remote:  RTDB listener → Controller emits 'message:received' → UI renders (unchanged)
```

**Depends on**: Phase 2.1 ✅ COMPLETE

**Size**: ~40 LoC across 3 files

**Decisions resolved**:

- **sentAt**: `serverTimestamp()` is a placeholder, not a number. Local sends use `Date.now()` instead. The schema accepts `z.number()`, which `Date.now()` satisfies. The tiny drift vs server time is negligible for display.
- **messageId**: `push()` returns a ref with `.key` before `set()` is called. We already have this — just return it.
- **seenMessageIds**: Fully removed. The `reactionCallback` used it as a guard, but `child_changed` only fires on live changes (not initial load), so stale reactions aren't a risk. Guard removed for simplicity.

**Steps**:

1. [x] **Transport.sendToConversation()**: Return `{ messageId, messageData }` after RTDB push
2. [x] **Transport.listen()**: Skip emitting own messages, remove `seenMessageIds` entirely
3. [x] **Controller.send()**: Build and return ParsedMessage, cache it
4. [x] **UI sendMessage()**: Render the returned message via `processReceivedMessage(parsed)`
5. [x] **Cleanup**: `seenMessageIds` deleted entirely
6. [ ] **Test**: Manual verification — sender sees message immediately, remote receives via emit, reactions work on both

**Success criteria**:

- Sender's message renders from Controller.send() return value, not from RTDB echo
- Remote messages still flow through listener → emit → UI (unchanged)
- Reactions work on both own and remote messages
- `seenMessageIds` dedup band-aid removed or renamed to reflect actual purpose
- Backtick-quote double-display bug resolved (was caused by echo path)

---

### Issue 2.2b: Optimistic Render with Error Handling

**Core problem**: After 2.2, the sender `await`s the RTDB write before rendering. If the write is slow or fails, the user sees nothing. We want the message to appear instantly (optimistic) with visual feedback for pending/failed states.

```
After 2.2 (good but blocking):
  User sends → await RTDB write → return ParsedMessage → UI renders
  Problem: UI blocked until RTDB write completes

After 2.2b (optimistic):
  User sends → UI renders immediately (pending state) → RTDB write in background
    → success: update to sent state (or just remove pending indicator)
    → failure: update to failed state + show retry
```

**Depends on**: Issue 2.2 (send path returns ParsedMessage)

**Size**: Medium (~80-120 LoC across 3 files)

#### Decisions needed

1. **Message status model**: Add a `_status` field to local messages?
   - Options: (a) Add `_status: 'pending' | 'sent' | 'failed'` to the ParsedMessage object, (b) track status separately in a Map keyed by messageId
   - Recommendation: (a) — simpler, status travels with the message. Prefix with `_` to signal it's local-only (not persisted to RTDB), same pattern as `_reactionUpdate`.

2. **Pending indicator style**: What does "pending" look like?
   - Options: (a) Dimmed/opacity on the message bubble, (b) small spinner/clock icon, (c) subtle "sending..." text
   - Recommendation: (a) — CSS-only, no new DOM elements. `.message-bubble[data-status="pending"] { opacity: 0.6; }`

3. **Failed state UI**: What does "failed" look like?
   - Recommendation: Red-tinted bubble + small "Failed to send. Tap to retry" text below the message. Keep it minimal.

4. **Retry mechanism**: Re-send same content with new messageId, or reuse the original?
   - Recommendation: New messageId (new `push()` call). The original was never written, so the ID is orphaned. Simpler than tracking partial writes.

5. **Timeout**: Should we have a timeout for "pending" → "failed"?
   - Recommendation: No. Firebase SDK already has built-in timeout/error handling. If `set()` rejects, that's the signal. Don't add a separate timer.

6. **Cache behavior**: When does the message enter Controller.history?
   - Recommendation: Immediately on send (with `_status: 'pending'`). Update status in-place on success/failure. This way cached history reflects the true state.

#### Implementation plan

**Step 1: Transport returns early, writes in background**

```javascript
// rtdb-transport.js — sendToConversation()
async sendToConversation(conversationId, text) {
  const fromUserId = getLoggedInUserId();
  const fromName = getUser()?.displayName || 'Guest User';
  const messageRef = push(ref(rtdb, `conversations/${conversationId}/messages`));
  const messageId = messageRef.key;
  const messageData = {
    type: 'text', text, from: fromUserId, fromName,
    sentAt: Date.now(), read: false,
  };

  // Return immediately for optimistic render
  // Caller is responsible for awaiting writePromise if needed
  const writePromise = set(messageRef, {
    ...messageData,
    sentAt: serverTimestamp(), // RTDB gets server time; local copy has Date.now()
  });

  return { messageId, messageData, writePromise };
}
```

**Step 2: Controller.send() renders optimistically, resolves in background**

```javascript
// messaging-controller.js — send()
async send(conversationId, text) {
  const { messageId, messageData, writePromise } =
    this.transport.sendToConversation(conversationId, text);

  const parsed = parseMessage(messageData, messageId);
  parsed._status = 'pending';

  // Cache immediately
  const conversationState = this.conversations.get(conversationId);
  this.cacheHistory(conversationState, { conversationId, parsedMessage: parsed });

  // Resolve RTDB write in background
  writePromise
    .then(() => {
      parsed._status = 'sent';
      this.emit('message:status', { conversationId, messageId, status: 'sent' });
    })
    .catch((err) => {
      parsed._status = 'failed';
      this.emit('message:status', { conversationId, messageId, status: 'failed', error: err });
    });

  return parsed; // UI renders immediately
}
```

**Step 3: UI handles status updates**

```javascript
// messages-ui.js — listen for status changes
messagingController.on('message:status', ({ messageId, status }) => {
  const bubble = messagesMessages.querySelector(
    `[data-message-id="${messageId}"]`,
  );
  if (!bubble) return;

  const entry = bubble.closest('.message-entry');
  entry.dataset.status = status;

  if (status === 'failed') {
    // Add retry affordance if not already present
    if (!entry.querySelector('.retry-send')) {
      const retry = document.createElement('button');
      retry.className = 'retry-send';
      retry.textContent = 'Failed to send. Tap to retry';
      retry.onclick = () => retrySend(messageId);
      entry.appendChild(retry);
    }
  }
});
```

**Step 4: CSS for status states**

```css
.message-entry[data-status='pending'] .message-bubble {
  opacity: 0.6;
}
.message-entry[data-status='failed'] .message-bubble {
  border-color: var(--color-error);
}
.retry-send {
  font-size: 0.75rem;
  color: var(--color-error);
  cursor: pointer;
}
```

**Step 5: Retry mechanism**

```javascript
// messages-ui.js
function retrySend(failedMessageId) {
  // Find original message text from DOM
  const bubble = messagesMessages.querySelector(
    `[data-message-id="${failedMessageId}"]`,
  );
  const text = bubble?.querySelector('p')?.textContent;
  if (!text || !currentConversationId) return;

  // Remove failed message from DOM
  bubble.closest('.message-entry')?.remove();

  // Re-send (creates new messageId)
  messagingController
    .send(currentConversationId, text)
    .then((parsed) => processReceivedMessage(parsed));
}
```

**Steps**:

1. [ ] Change Transport.sendToConversation() to return `{ messageId, messageData, writePromise }`
2. [ ] Change Controller.send() to return ParsedMessage immediately, resolve write in background
3. [ ] Add `_status` field to local ParsedMessage (`pending` → `sent` | `failed`)
4. [ ] Add `message:status` event to Controller
5. [ ] UI: listen for `message:status`, update `data-status` attribute on message entry
6. [ ] UI: add retry button on failed messages
7. [ ] CSS: pending (dimmed), failed (error border + retry text)
8. [ ] Remove failed message from Controller.history on retry (or mark as superseded)
9. [ ] Test: send success, send failure (offline/permissions), retry flow

**Success criteria**:

- Message appears in UI instantly on send (no wait for RTDB)
- Pending state is visually subtle (dimmed bubble)
- Failed state is clear with retry affordance
- Retry works: removes failed message, re-sends with new ID
- No duplicate messages in any scenario
- Controller.history reflects current status of each message

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

**Depends on**: Phase 2.1 (caching consolidated) ✅, Phase 2.2 (circular fix)

**Size**: Small (20-30 LoC changes)

**Steps**:

1. [ ] Create `Controller.emitCachedHistory(session)` method
   - Returns cached messages
   - Emits 'message:received' for each
   - Uses same event path as live messages
2. [ ] Update \_prepUIForSession to use new method
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
