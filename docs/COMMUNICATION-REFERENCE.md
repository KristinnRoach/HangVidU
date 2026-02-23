# Communication Reference (Quick)

Purpose

- Single-page quick reference for event & command patterns used across the app.
- Keep short and editable; use as the canonical short-form for reviewers and contributors.

Principles

- Directionality: UI -> Controller for commands; Controller -> UI for domain events/updates.
- Controllers own domain events and public APIs; UI components call controller methods and subscribe to controller events.
- Prefer AbortSignal-based subscriptions for grouped cleanup, or return unsub functions and store them for teardown.

Naming (convention)

- Commands (callable methods): verbNoun, camelCase e.g. `openSession(contactId)`, `sendMessage(text)`.
- Events (emitted by controllers): `noun:verb` lowercase with colon, e.g. `session:opened`, `message:received`, `reaction:updated`, `unread:changed`.

Subscription lifecycle

- Preferred: `EventEmitter.on(event, cb, { signal })` where `signal` is from an `AbortController` the UI owns.
- Alternative: collect unsubscribe functions in an array and call them in `cleanup()`.
- Always ensure subscriptions are removed on component teardown to avoid leaks and duplicate handlers.

DOM → Controller bridging

- UI that cannot import controllers ("dumb" UI) should use the centralized bridge `src/bootstrap/ui-to-controller-bridges.js`.
- Bridge maps DOM CustomEvents to controller API calls and handles its own lifecycle via an `AbortController`.
- When adding new DOM CustomEvents, prefer extending the bridge rather than adding document listeners inside controllers.

When to use an app-wide bus

- Use `appBus` only when you need cross-controller, app-level pub/sub; avoid adding it for purely local interactions.
- If many controllers begin emitting events consumed by unrelated parts of the app, plan an `appBus` migration.

Quick mappings (current messaging PoC)

- UI → Controller commands:
  - `messagingController.openSession(contactId, contactName)` — open or focus a conversation
  - `messagingController.sendMessage(text)` — send outgoing message
  - `messagingController.addReaction(messageId, reaction)` — local reaction action
- Controller → UI events:
  - `session:opened` — session context and history available
  - `message:received` — new or synced message arrived
  - `reaction:updated` — reactions changed for a message
  - `unread:changed` — unread count changed for a conversation

Examples

- Subscribe (preferred):
  - `const ac = new AbortController();`
  - `messagingController.on('message:received', handle, { signal: ac.signal });`
  - `cleanup() { ac.abort(); }`

- Bridge example:
  - DOM `messages:toggle` -> `messagingController.openSession(contactId)`

Notes

- Keep this page minimal; expand to `docs/` full guidelines when conventions stabilize.
- If you want, I can (a) add preferred ESLint rules for event names, or (b) scaffold an `appBus` prototype and migrate one event as a demo.
