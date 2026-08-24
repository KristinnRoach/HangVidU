# Structure

## Layers

`eslint.boundaries.config.js` is the source of truth for which layer may import
which — run `pnpm lint` to check. The layers it enforces:

| Layer (dir)         | Role                                                                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/`          | Framework-agnostic primitives, **zero app knowledge** (`event-emitter/`, `media/`, `reactions/`, `utils/`). "Could be published to npm."           |
| `src/shared/`       | App-aware cross-cutting code that knows HangVidU concepts (`events/`, `i18n/`, `app-reload/`, `p2p-context`, `utils/`).                            |
| `src/infra/`        | External-SDK wiring: Firebase init, App Check, RTDB client, Sentry.                                                                                |
| `src/storage/`      | Durable persistence ports (`contacts/`, `conversations/`, `files/`, `user/`). D1 + R2 spine; RTDB remains for user presence and legacy cleanup.    |
| `src/realtime/`     | Ephemeral coordination (WebRTC signaling, conversation channel, user mailbox). Backed by Cloudflare Durable Objects in `backend/cloudflare/`.      |
| `src/push/`         | Web-push subscription and delivery. Event-driven: features publish a fact, push subscribes. `push/sw` is a separate runtime entry.                 |
| `src/pwa/`          | Service-worker update handling and app reload.                                                                                                     |
| `src/stores/`       | Solid reactive mirrors over storage/realtime (`contacts-store`, `files-store`, `conversation/`, ...).                                              |
| `src/auth/`         | Session/auth state and helpers.                                                                                                                    |
| `src/features/<x>/` | Feature modules (`call`, `contacts`, `conversations`, `notifications`, `presence`). Each has a barrel, optional `components/`, optional `setup()`. |
| `src/components/`   | App-level + shared/primitive UI (`base-legacy/`, `dialogs/`, `media/`). **Not** feature UI.                                                        |
| `src/app/`          | Composition root (`MainContent`, `TopBar`, cross-feature screens).                                                                                 |

Rule of thumb for placing a util: if it has no app/domain knowledge and no
imports outside `lib`, it belongs in `src/lib/utils/`; otherwise `src/shared/utils/`.

`storage` and `realtime` are siblings split by data lifetime: persistence
(durable) vs ephemeral coordination. Both are backend-agnostic behind their ports;
features consume realtime directly and persistence via `stores`.

## Bootstrap

There is **no `setup/` layer**. App startup lives in:

- `src/main.tsx` — mounts `App.tsx` and runs each module's `setup()` export,
  auth last among the auth-touching ones so `initAuth()` fires after every
  subscriber has registered. Cleanups run in reverse on teardown.
- `src/App.tsx` — the SolidJS root component (providers + `MainContent`).
- `src/app/` — composition root that wires domain state into UI.
- `src/features/<x>/index` — each feature exposes an optional `setup()` that
  subscribes to the auth lifecycle events it owns.

## Module layout

- Every module has one public index: `src/<module>/index.{js,ts}`.
- Imports from outside a module go through that index.
- Enforced for `features/*`, `auth`, `push`, `pwa`, `realtime`, and the
  `storage/*` modules.
- Tests live next to the file under test, or in `src/<module>/tests/` for
  module-root domain tests.

## UI layer layout

- Feature UI lives in **`src/features/<feature>/components/`**, but only
  **self-contained widgets** — components that need no other feature's state
  (e.g. `presence/components/PresenceIndicator.jsx`,
  `contacts/components/AddContactModal.tsx`).
- **Cross-feature composition** (screens assembling widgets from multiple
  features) lives in **`src/app/`** — the top layer that may import everything
  (e.g. `app/ConversationsList.tsx`, `app/MainContent.tsx`).
- `src/components/` holds **shared/primitive** UI only. It must **not** import
  `features/*`, and it is not a domain layer — domain logic stays in the owning
  module.

### Naming conventions

- **PascalCase `.tsx`/`.jsx`** for files that render JSX components
  (`ConversationsList.tsx`, `PresenceIndicator.jsx`).
- **kebab-case** for bridges, command handlers, and stores-only files
  (`edit-contact-modal.jsx`, `invite-listener.js`).
- **Dialog vs modal**: `XyzDialog.jsx` is the component; `xyz-modal.jsx` is the
  imperative `openSolidDialog(...)` bridge that returns a Promise.
- Prefer `.ts`/`.tsx` for new files; existing `.js`/`.jsx` migrate opportunistically.

## State files

See [`STATE_RULES.md`](./STATE_RULES.md). One `<module>-state.js` per module, at
module root — no `state/` subfolder, no split state files within a module (split
the module first).

## Barrel exports

- Re-export read-only getters and legacy subscribe APIs.
- **Do not** re-export writers (`setState`, `set*`, mutation helpers).
- **Do not** re-export persistence internals.

## Imports

- `<module>-state.js` is importable only from files inside its own module directory.
- `<module>-state.js` must not import Firebase, RTDB, or storage layers. State
  mirrors what the persistence layer feeds it.
