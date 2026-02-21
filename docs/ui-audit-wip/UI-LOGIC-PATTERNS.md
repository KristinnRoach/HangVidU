# UI ↔ Logic Communication Patterns

Reference doc for the ongoing JS architecture audit. Covers how UI and business logic currently communicate, where the patterns are inconsistent, and what the standardized target looks like.

---

## Established Patterns

### 1. CallController event emitter

The most principled pattern. `CallController` (`src/webrtc/call-controller.js`) uses a hand-rolled `SimpleEmitter`. All call lifecycle events are emitted as named events and consumed in two separate places by design:

- `src/ui/bind-call-ui.js` — UI-only handlers (`memberJoined` → `onCallConnected`, `cleanup` → `hideCallingUI` + `onCallDisconnected`)
- `src/main.js` — business logic handlers for the same events (session setup, missed call notifications, contact save prompt)

Events: `created`, `answered`, `memberJoined`, `memberLeft`, `cleanup`, `hangup`, `remoteHangup`, `error`, `callFailed`

### 2. Callback injection

Components receive callbacks as parameters and stay ignorant of the modules calling them:

- `showCallingUI(onCancel)` — cancel button calls the injected callback; component doesn't know about call cleanup
- `initializeMediaControls(getPeerConnection, ...)` — button handlers wired entirely inside the function; media-controls.js has no import of call state

### 3. Auth state pub/sub (`auth-state.js`)

A pure module with no Firebase imports. Firebase auth events call `setState()`; consumers call `subscribe()`.

- `AuthComponent.js` subscribes for UI re-renders
- `main.js` subscribes for contact re-rendering, messaging reset, push notification setup

The module has no awareness of its consumers. This is the cleanest layered pattern in the codebase — the model to extend.

### 4. CSS data-attribute view machine

`uiState.setView(state)` in `src/ui/ui-state.js` writes `document.body.dataset.view` and `document.body.dataset.mainContent`. CSS rules drive layout visibility from those attributes. No component should directly read or write these outside of the lifecycle UI layer.

### 5. Custom DOM events for cross-component signals

`contacts.js` dispatches `contact:call` and `messages:toggle` on `document`; `main.js` listens and calls the appropriate handler. Decouples the contacts component from main.js logic without a direct import dependency.

---

## Where UI triggers logic

| Trigger                                   | Registered in                           | Target                                                  |
| ----------------------------------------- | --------------------------------------- | ------------------------------------------------------- |
| `callBtn.onclick`, `lobbyCallBtn.onclick` | `main.js` module scope                  | `handleCall()`                                          |
| `hangUpBtn.onclick`                       | `main.js` module scope                  | `CallController.hangUp()`                               |
| `pasteJoinBtn.onclick`                    | `main.js` module scope                  | `joinOrCreateRoomWithId()`                              |
| `addContactBtn.onclick`                   | `main.js` module scope                  | `showAddContactModal()`                                 |
| `exitWatchModeBtn.onclick`                | `main.js` module scope                  | `onWatchModeExited()` + cleanup                         |
| `.contact-call-btn` click                 | `contacts.js::attachContactListeners()` | fires `contact:call` custom event                       |
| `.contact-name` click                     | `contacts.js::attachContactListeners()` | fires `messages:toggle` custom event                    |
| Message form submit                       | `messages-ui.js::initMessagesUI()`      | `sendMessage()` via `currentSession.send()`             |
| File input change                         | `messages-ui.js::initMessagesUI()`      | `fileTransferController.sendFile()`                     |
| Login/logout buttons                      | `AuthComponent.js` template `onclick=`  | `signInWithAccountSelection()` / `signOutUser()`        |
| Incoming call accept/reject               | `incoming-call.js` button handler       | `onAccept`/`onReject` callbacks injected from `main.js` |
| Calling UI cancel                         | `calling-ui.js` button handler          | `onCancel` callback injected from `main.js`             |

---

## How logic updates UI

| Mechanism                                                           | Where used                                                            |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `uiState.setView()` → CSS `data-view`                               | Call/lobby view switching                                             |
| `CallController.emit(event)` → subscribed callbacks                 | All call lifecycle UI updates                                         |
| `auth-state.subscribe()` callback                                   | Auth component re-renders, contact list, messaging reset              |
| Injected callbacks (`onCancel`, `onAccept`, `onReject`)             | Calling UI, incoming call UI                                          |
| `messagesUI.setFileTransferController(controller)` setter           | Called from `CallController.setupFileTransport()`                     |
| `window.onFileWatchRequestReceived = fn`                            | `messages-ui.js` sets it; `watch-sync.js` calls it                    |
| Direct DOM manipulation (`classList`, `showElement`, `hideElement`) | `call-mode.js`, `watch-mode.js`, `calling-ui.js`, `media-controls.js` |

---

## Inconsistencies

### 1. `window.onFileWatchRequestReceived` global

`messages-ui.js` assigns a function to `window.onFileWatchRequestReceived`. `watch-sync.js` calls it by checking the window property. This uses `window` as a one-off event bus — bypassing every other pattern in the codebase.

### 2. `CallController` imports `messagesUI` directly

`call-controller.js` calls `messagesUI.setFileTransferController()` and `messagesUI.reset()`. This is a controller layer importing directly from the UI layer — breaks the layering that the event-emitter pattern was designed to maintain.

### 3. `calling-ui.js` writes to `uiState` directly

`calling-ui.js` imports and calls `uiState.setView('calling')`. A UI component is writing application state. It should fire a callback and let the lifecycle layer manage state, consistent with how `onCancel` is handled.

### 4. Legacy DOM manipulation alongside CSS data-attribute view machine

`call-mode.js` and `watch-mode.js` directly toggle element visibility (`showElement`, `hideElement`, `el.disabled`). `call-lifecycle-ui.js` calls both `uiState.setView()` and `enterCallMode()`/`exitCallMode()`, which means two systems govern visibility simultaneously. The legacy system is known tech debt (comments in `ui-refactor.md`).

### 5. No consistent rule for button handler registration

Five different approaches are used:

| Approach                                    | Example                                                          |
| ------------------------------------------- | ---------------------------------------------------------------- |
| Module-scope assignment in `main.js`        | `callBtn.onclick = ...`, `hangUpBtn.onclick = ...`               |
| Inside dedicated init function in component | `initMessagesUI()`, `initializeMediaControls()`                  |
| After-render wiring in component            | `attachContactListeners()` called after each contact list render |
| Template-based (Lit)                        | `AuthComponent.js` inline `onclick=` attributes                  |
| Inside `bind-call-ui.js` init               | `bindCallUI()`                                                   |

None of these are individually wrong, but there's no rule for which to use.

---

## Target: what standardized looks like

The migration direction is already clear from `ui-refactor.md` and the code comments. The remaining gaps:

1. ~~**Replace `window.onFileWatchRequestReceived`**~~ ✅ **Done** — `watch-sync.js` now dispatches `watch:file-request` CustomEvent on `document`; `messages-ui.js` listens with `document.addEventListener`.

2. ~~**Remove `CallController` → `messagesUI` imports**~~ ✅ **Done** — `call-controller.js` no longer imports from the UI layer. It emits `fileTransportReady` event; `bind-call-ui.js` subscribes and calls `messagesUI.setFileTransferController()`. Cleanup (`setFileTransferController(null)` + `reset()`) also moved to `bind-call-ui.js` `cleanup` handler.

3. ~~**Remove `calling-ui.js` → `uiState` write**~~ ✅ **Done** — `calling-ui.js` no longer imports `uiState`. `showCallingUI` now accepts `{ onCancel, onHide }`. The call site in `main.js` passes `onHide: onCallingEnded` from `call-lifecycle-ui.js`, which owns the state write. `onCallingStarted`/`onCallingEnded` added to `call-lifecycle-ui.js`.

4. **Complete the CSS-driven view migration** — remove `enterCallMode()`/`exitCallMode()` direct DOM manipulation once `view-state.css` covers the calling state fully (tracked in `ui-refactor.md`). Large scope — deferred.

5. **Pick one button wiring rule** — recommendation: primary call controls wired in `main.js` (they depend on call state); all others wired inside their own component's init function. Document the rule. Convention decision — deferred.
