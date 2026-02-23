DOM Events Audit

Format per entry:
- Event: `name`
- Emitted: file path + line
- Listeners: file path + line
- Direction: one-line (UI→Controller, Controller→UI, UI-local)
- Note: short recommendation

---

- Event: `contact:call`
- Emitted:
  - [src/ui/components/contacts/contacts.js](src/ui/components/contacts/contacts.js#L343)
  - [src/ui/components/messages/messages-ui.js](src/ui/components/messages/messages-ui.js#L163)
- Listeners:
  - [src/main.js](src/main.js#L1724)
- Direction: UI → App (call command)
- Note: Keep handled in `main.js` or move to a `ContactsController`/bridge if consolidating UI logic.

---

- Event: `contact:saved`
- Emitted:
  - [src/ui/components/contacts/contacts.js](src/ui/components/contacts/contacts.js#L200)
  - [src/ui/components/contacts/contacts.js](src/ui/components/contacts/contacts.js#L218)
- Listeners:
  - [src/main.js](src/main.js#L1728)
- Direction: UI → App (contact lifecycle)
- Note: Consider routing to a `ContactsController` instead of direct document listeners.

---

- Event: `messages:toggle`
- Emitted:
  - [src/ui/components/contacts/contacts.js](src/ui/components/contacts/contacts.js#L359)
- Listeners:
  - [src/bootstrap/ui-to-controller-bridges.js](src/bootstrap/ui-to-controller-bridges.js#L16)
- Direction: UI → Controller (open/focus conversation)
- Note: Already bridged to `messagingController.openSession` — continue using the bridge for dumb UI components.

---

- Event: `watch:file-request`
- Emitted:
  - [src/firebase/watch-sync.js](src/firebase/watch-sync.js#L259)
- Listeners:
  - [src/ui/components/messages/messages-ui.js](src/ui/components/messages/messages-ui.js#L525)
  - removes listener at [src/ui/components/messages/messages-ui.js](src/ui/components/messages/messages-ui.js#L1486)
- Direction: Controller/Service → UI (incoming watch request)
- Note: Fine as a CustomEvent for UI notification; ensure listeners are removed on teardown (messages UI already does).

---

- Event: `deviceschanged`
- Emitted:
  - [src/ui/components/trash/select/SelectMediaDevice.js](src/ui/components/trash/select/SelectMediaDevice.js#L66)
- Listeners:
  - [src/ui/components/trash/select/testSelect.html](src/ui/components/trash/select/testSelect.html#L33)
- Direction: Component-internal / test harness
- Note: Internal, leave as-is or refactor to `MediaController` if needed.

---

- Event: `props-updated` / `render` (component-system)
- Emitted:
  - [src/ui/component-system/wip-interop/native-web/vanElla.js](src/ui/component-system/wip-interop/native-web/vanElla.js#L154)
  - [src/ui/component-system/Brainstorm.reff.md](src/ui/component-system/Brainstorm.reff.md#L129)
- Listeners:
  - Various internal component-system handlers (framework-local)
- Direction: Framework-internal
- Note: Keep internal to component system; not an app-level bus signal.

---

Other global DOM listeners (native events)
- `document.addEventListener('keydown', ...)` used in multiple places for keyboard shortcuts (e.g., [src/main.js](src/main.js#L1354), [src/ui/components/messages/messages-ui.js](src/ui/components/messages/messages-ui.js#L1148)).
- `document.addEventListener('visibilitychange', ...)` used for UI inactivity and call indicators ([src/ui/utils/showHideOnInactivity.js](src/ui/utils/showHideOnInactivity.js#L158), [src/ui/utils/call-indicators.js](src/ui/utils/call-indicators.js#L40)).

Summary recommendations
- Keep domain events owned by controllers (Messaging, Call, Contacts). Prefer direct imports for heavy UI components; use the centralized bridge (`src/bootstrap/ui-to-controller-bridges.js`) for lightweight/dumb UI modules that must remain DOM-only.
- Use `AbortController` or store unsubscribes for all document-level listeners (messages UI and bridge already use `AbortController`).
- Migrate `contact:call`/`contact:saved` handling into `ContactsController` (or extend the bridge) to reduce ad-hoc document listeners in `main.js`.
- Reserve `appBus` for cross-cutting concerns (telemetry, global feature flags, non-domain signals).

If you want, I can:
- (A) Scaffold `src/controllers/contacts-controller.js` and wire the bridge/main handlers to it, or
- (B) Produce a complete list of all `document.addEventListener` occurrences and native event handlers for a broader audit.
