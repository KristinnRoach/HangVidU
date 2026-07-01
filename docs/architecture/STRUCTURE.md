# Structure

## Layers

Import rules between layers are enforced by `eslint.boundaries.config.js` — that
config is the source of truth for the allow-table. The enforced element types and
their direction of allowed imports:

| Layer (dir)        | Role                                                                                   | May import                                                        |
| ------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `src/lib/`         | Framework-agnostic primitives, **zero app knowledge** (`event-emitter/`, `media/`, `utils/`). "Could be published to npm." | `lib` only                                                       |
| `src/shared/`      | App-aware cross-cutting code that knows HangVidU concepts (`events/`, `i18n/`, `p2p-context`, `utils/`). | `shared`, `lib`                                                 |
| `src/infra/`       | External-SDK wiring: Firebase init, App Check, RTDB client, Sentry.                    | `infra`, `lib`                                                   |
| `src/storage/`     | Durable persistence ports (`contacts/`, `conversations/`, `files/`, `user/`). D1 + R2 spine; RTDB remains for user presence and legacy cleanup. | `storage`, `shared`, `lib`, `infra`                             |
| `src/realtime/`    | Ephemeral coordination (WebRTC signaling, conversation channel, user mailbox). Backed by Cloudflare Durable Objects in `backend/cloudflare/`. | `realtime`, `shared`, `lib`, `infra`, `auth`                   |
| `src/stores/`      | Solid reactive mirrors over storage/realtime (`contactsStore`, `filesStore`, `selectedConversationStore`, …). | `stores`, `auth`, `shared`, `lib`, `storage`, `realtime`, `infra`, `feature` |
| `src/auth/`        | Session/auth state and helpers.                                                        | `auth`, `shared`, `lib`, `infra`, `components`                  |
| `src/features/<x>/`| Feature modules. Each has a barrel, optional `components/`, and optional `setup()`.    | `auth`, `shared`, `lib`, `feature`, `components`, `infra`, `stores`, `realtime` |
| `src/components/`  | App-level + shared/primitive UI (`app/`, `base-legacy/`, `dialogs/`, `media/`). **Not** feature UI. | `components`, `auth`, `shared`, `lib`                          |
| `src/app/`         | Composition/orchestration root (`MainContent`, `auth-orchestration`).                  | `app`, `auth`, `stores`, `feature`, `components`, `shared`, `lib` |

Rule of thumb for placing a util: if it has no app/domain knowledge and no
imports outside `lib`, it belongs in `src/lib/utils/`; otherwise `src/shared/utils/`.

`storage` and `realtime` are siblings split by data lifetime: persistence
(durable) vs ephemeral coordination. Both are backend-agnostic behind their ports;
features consume realtime directly and persistence via `stores`.

## Bootstrap

There is **no `setup/` layer**. App startup lives in:

- `src/main.tsx` — entry point: mounts `App.tsx`, runs each feature's `setup()`
  export, and `wireAuthReactions()`; tears them down on cleanup.
- `src/App.tsx` — the SolidJS root component (providers + `MainContent`).
- `src/app/` — composition/orchestration that wires domain events into UI
  (`auth-orchestration.js`, `MainContent.tsx`).
- `src/features/<x>/index` — each feature exposes an optional `setup()` for its
  own cross-feature wiring (e.g. `contacts`, `presence`, `notifications`, `pwa`).

## Module layout

- Every module has one barrel: `src/<module>/index.{js,ts}`.
- **Cross-feature** imports go through the barrel. Same-feature subpath imports
  (helpers/components reaching into siblings inside `src/features/<x>/`) are allowed.
- Tests live next to the file under test, or in `src/<module>/tests/` for
  module-root domain tests.

## UI layer layout

- Feature UI lives in **`src/features/<feature>/components/`** (e.g.
  `contacts/components/ContactsList.tsx`, `presence/components/PresenceIndicator.jsx`).
- `src/components/` holds **app-level and shared/primitive** UI only
  (`components/app/`, `components/dialogs/`, `components/media/`,
  `components/base-legacy/`). It must **not** import `features/*`.
- `src/components/` is **not** a domain layer. Domain logic stays in the owning module.

### Naming conventions

- **PascalCase `.tsx`/`.jsx`** for files that render JSX components
  (`ContactsList.tsx`, `PresenceIndicator.jsx`).
- **kebab-case** for bridges, command handlers, and stores-only files
  (`auth-orchestration.js`, `edit-contact-modal.jsx`).
- **Dialog vs modal**: `XyzDialog.jsx` is the component; `xyz-modal.jsx` is the
  imperative `openSolidDialog(...)` bridge that returns a Promise.
- Prefer `.ts`/`.tsx` for new files; existing `.js`/`.jsx` migrate opportunistically.

## State files

- One `<module>-state.js` per module, at module root.
- No `state/` subfolder; no split state files within a module (split the module first).
- These rules apply to domain/module state, not Solid reactive stores in `src/stores/`.

## Barrel exports

- Re-export read-only getters and legacy subscribe APIs.
- **Do not** re-export writers (`setState`, `set*`, mutation helpers).
- **Do not** re-export persistence internals.

## Imports

- `<module>-state.js` is importable only from files inside its own module directory.
- `<module>-state.js` must not import Firebase, RTDB, or storage layers. State
  mirrors what the persistence layer feeds it.

---

## Under Consideration

- Whether service-level writers exported from barrels (e.g.,
  `contactsService.saveContact`) should eventually migrate to `cmd:*` commands,
  reserving barrel exports for read-only APIs only.
