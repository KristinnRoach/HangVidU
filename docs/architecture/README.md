# Code map

A guide to the current implementation. See [AGENTS.md](../../AGENTS.md) for
conventions and the [roadmap](../ROADMAP.md) for planned changes.

## Finding the owner

| Location                                  | Responsibility                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| `src/main.tsx`, `src/App.tsx`, `src/app/` | Startup, providers, navigation, and screens that compose features                    |
| `src/features/`                           | Calls, contacts, conversations, presence, notifications, and their UI                |
| `src/stores/`                             | Reactive application state and actions over persistence/realtime                     |
| `src/storage/`                            | Durable data access and validation                                                   |
| `src/realtime/`                           | Signaling, conversation channels, and user mailbox connections                       |
| `src/auth/`                               | Identity, login lifecycle, and token access                                          |
| `src/components/`                         | Shared UI; `base-legacy/` is existing imperative UI, not the pattern for new screens |
| `src/shared/`, `src/lib/`                 | App-aware cross-cutting helpers; reusable primitives respectively                    |
| `src/infra/`, `src/push/`, `src/pwa/`     | SDK wiring; push delivery/client lifecycle; service-worker updates                   |
| `shared/`, `backend/`                     | Wire contracts; server implementations                                               |

The import rules in [eslint.boundaries.config.js](../../eslint.boundaries.config.js)
and [vite.config.js](../../vite.config.js) enforce module boundaries. Use the public
module entry points they specify; keep the dependency rules in those configs.

## State and startup

Solid stores/signals serve reactive UI. Auth also exposes synchronous getters and
lifecycle events for non-Solid consumers. Keep raw state writers private and expose
named actions, such as sending a message or signing out. Avoid duplicate state.

`main.tsx` registers feature side effects before auth setup emits its initial
lifecycle events; teardown runs in reverse. Preserve that ordering until the
startup contract is deliberately changed. Call media is currently created by
`ActiveCallRoom`. Separating its lifetime from the screen is a
[planned change](../ROADMAP.md).

## Data and transport

Firebase provides identity, RTDB presence, Hosting, and push Functions. The
Cloudflare Worker uses D1 for durable app data, R2 for attachments, and Durable
Objects for signaling and live coordination. Contacts use D1 for signed-in users
and local storage for guests; old RTDB contacts are migration input, not an app
write path. `@kidlib/p2p` owns WebRTC mechanics; the call feature supplies signaling
and application behaviour.

Persistent messages combine HTTP writes/history with live conversation-channel
updates. The selected conversation store also owns drafts and optimistic send
state. Private messaging is not implemented by that persistence-oriented path.
Use the [events API reference](../../src/shared/events/README.md) only when working
with the bus; direct calls remain the default for actions.

## Styling transition

Tailwind v4 is the default for new UI. Existing global CSS and CSS Modules remain
until their components are migrated. Shared tokens live in
[src/styles/theme.css](../../src/styles/theme.css); use semantic tokens for recurring
visual roles and Tailwind defaults for ordinary spacing and sizing. Extend the
small palette when an actual UI change needs it, not by bulk-porting legacy variables.

[src/styles/main.css](../../src/styles/main.css) declares layers in order:
`theme < base < app < utilities`. Legacy global CSS is in `app`, so utilities can
override it. CSS Modules are unlayered and beat layered utilities: do not combine
them as competing styling systems on the same element. Migrate a component fully,
then remove its module/global rules and tokens that have no remaining consumers.
Keep necessary dynamic values local; do not recreate a parallel theme with literals.

Dialogs currently have both native-modal and custom-overlay implementations.
Consolidating accessible focus, keyboard, and dismissal behaviour is roadmap work;
new styling alone does not make those behaviours equivalent.
