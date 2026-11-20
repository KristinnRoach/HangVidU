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
startup contract is deliberately changed. Call media belongs to the active
call: `CallHandshakeProvider` creates it once connecting finishes and disposes it
when the call ends, so call views can unmount and remount without stopping
local tracks. `MainContent` shows the call room only while
`useCallHandshake().media()` exists and passes it in.
For both room-link and contact calls, `MemberStreams` switches to equal-sized
remote tiles above two members. Tiles meet edge to edge in a stack in tall
rooms and in two columns in wider rooms. With three remote streams in a wider
room, the self-preview fills the top-left tile. Group cameras center-crop to fill
their tiles. A floating camera preview sizes to the source aspect and fills its
box while dimensions update. Screen shares and mask capture fit the full frame.
Direct remote video uses `ParticipantMedia`'s capped zoom.

## Data and transport

Firebase provides identity, RTDB presence, Hosting, and push Functions. The
Cloudflare Worker uses D1 for durable app data, R2 for attachments, and Durable
Objects for signaling and live coordination. Contacts use D1 for signed-in users
and local storage for guests; old RTDB contacts are migration input, not an app
write path. `@kidlib/p2p` owns WebRTC mechanics; the call feature supplies signaling
and application behaviour.

A call is a signaling room, and knowing its random ID is what grants access.
The room's Durable Object is the only admission authority: at most
`ROOM_MEMBER_LIMIT` accounts, each with one joined endpoint. Clients set no
`memberCapacity`, because the client check would count an endpoint that is
about to be replaced as another member. Peer IDs identify endpoints (`uid:uuid`), so a
newer window or device replaces the account's previous endpoint, ending its call, instead of
taking another slot. An endpoint that reconnects after such a takeover yields to it.
A contact invite is keyed and authorized by the caller–callee conversation
(`roomId`). A call started with contact-call links enabled reserves a fresh signaling room and
carries it in `joinRoomId`. Invites sent from inside a call use the same field
to carry the existing signaling room. The conversation ID still drives call
history and mailbox responses. Clients display the copy action for these
per-call rooms and for guest rooms opened from an invite URL. A copied link
can be reused for its original room, including after it empties. Later contact
calls get a different room ID.

Calls are a P2P mesh, so each sender splits a fixed camera upload budget across
its peers and samples outbound video and connection stats to Sentry.
At four participants, outgoing camera video is capped at 20 fps to reduce encoder load.
Screen sharing keeps the same upload budget and uses the browser's frame-rate control.

Persistent messages combine HTTP writes/history with live conversation-channel
updates. The selected conversation store also owns drafts and optimistic send
state. Private messaging is not implemented by that persistence-oriented path.
Message notification clicks send a navigation message to a running app or put
the conversation target in the launch URL. `SWNavigation` handles both once the
user is signed in and contacts have loaded.
Use the [events API reference](../../src/shared/events/README.md) only when working
with the bus; direct calls remain the default for actions.

## Styling transition

Tailwind v4 is the default for new UI. Existing global CSS and CSS Modules remain
until their components are migrated. All shared tokens live in
[src/styles/theme.css](../../src/styles/theme.css): colours, shadows, text shadows,
and the font family are Tailwind theme variables, which legacy CSS and CSS Modules
read through `var()`. Use Tailwind's default spacing, font-size, and radius scales
in migrated UI:
`gap-2`/`p-3`, `text-sm`/`text-xs`, and `rounded-md` for controls or `rounded-lg`
for dialogs. Legacy spacing/font-size variables and `--legacy-radius-*` remain
in `:root` for unmigrated components; they must not override Tailwind's scales.
Keep recurring colours and effects in this theme file, not feature CSS.

[src/styles/main.css](../../src/styles/main.css) declares layers in order:
`theme < base < app < utilities`. Legacy global CSS is in `app`, so utilities can
override it. CSS Modules are unlayered and beat layered utilities: do not combine
them as competing styling systems on the same element. Migrate a component fully,
then remove its module/global rules and tokens that have no remaining consumers.
Keep necessary dynamic values local; do not recreate a parallel theme with literals.

`components/dialogs/Dialog.tsx` and `components/TextField.tsx` wrap
[Kobalte](https://kobalte.dev) primitives for focus, keyboard, dismissal, and aria
wiring. `components/Button.tsx` and `components/Checkbox.tsx` style native controls.
These shared controls own appearance, focus, disabled, invalid, and loading
states. Screens supply layout (`flex`, widths, gaps), labels, and actions; avoid
restyling control colours, padding, or typography at call sites. Add a variant
only when a real use needs it. Button's `loading` disables repeat activation and
sets `aria-busy`; pair it with a useful pending label or status message.

Every dialog is a `Dialog`: pass `open`, `title`, the body as children, and
optional `description`/`footer`. `onOpenChange` makes it dismissible; omit it for
a prompt that must be answered through its own actions (call dialogs). Content
mounts only while open. Keep transient form state inside a child component so
closing resets it; keep state outside only when it must survive dismissal.
Add-contact contents are also keyed by the signed-in user ID, so switching
accounts disposes pending work and starts with a fresh form. There
are no native `<dialog>` or `popover` elements left; do not add one.

**Toasts**

- Call `showToast(message, { tone })` from `@components/toast` in Solid or JS. Tone defaults to `info`. Use `success` or `error` to match the feedback.
- Use toasts for brief feedback. Keep form results and retry guidance available inline, including browser permission guidance in the notification panel. For an optional action, pass `action: { label, run }` with a localized button label.
- The app mounts one `ToastHost` above dialogs. Kobalte owns announcements, dismissal, and the six-second default. Alt+T focuses the list. Use `duration` in milliseconds when a message needs more time.
- Toasts rise in from below, fade out on close, and dismiss with an upward swipe. Motion uses the `toast-*` animation tokens in `theme.css` and is skipped under reduced motion. During a call, `ActiveCallControls` publishes `--call-controls-height` so the host sits above the controls.
- Style the host and tones in [the toast module](../../src/components/toast/index.tsx). Use Tailwind utilities and shared theme tokens. Keep placement and appearance out of call sites.

The add-contact flow (`features/contacts/components/AddContactDialog.tsx` and
`ImportContactsSection.tsx`) is the reference: shared controls, layout utilities,
and a persistent `role="status"` for pending/results/errors. Import selection is
keyed by email and survives filtering; select-all affects visible eligible rows.
Successful/duplicate app invites and server-confirmed saved contacts become
unavailable, while failures stay selected
for retry. Email sends deselect only successful recipients. One search box takes a
username (partial match) or an email (exact match, only verified and discoverable
accounts); a match gets an explicit Invite button, and no match offers the invite
link. Search never opens email compose. It retains previous results with disabled
actions while refreshing to avoid collapsing the dialog. Feedback remains until the next action rather than
disappearing on a timer.

Dialog content owns pending UI work. Cleanup invalidates late results and stops
remaining batch operations; already-issued requests may finish. Check the
lifetime after authorization and between requests before starting more work or
opening an email fallback. Side-effect helpers (contact invites, bulk Gmail, share-to-clipboard fallback) take
an optional `isCurrent` guard; read-only fetches do not, and the component
discards their late results. UI state and selection stay in the Solid component.
