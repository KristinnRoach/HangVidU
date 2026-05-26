# Deferred: lift `selectedConversation` into a store + remove two bus commands

## Context

`src/app/MainContent.tsx` owns the `selectedConversation` Solid signal locally
and exposes mutation only via an `onOpenConversation` callback threaded down
through `ContactsList`/`ContactEntry`. There is no way to set the selection
from outside the component tree.

This was tolerable while the only caller was `ContactEntry`, but it forces
awkward wiring for any external trigger that needs to open a conversation
(push-notification deep links today; URL deep links, in-app notifications,
keyboard shortcuts tomorrow).

The minimum-viable SW-navigation rewire
(`src/features/push-notifications/SWNavigation.tsx`) works around this by
sitting inside `MainContent` and receiving `setSelectedConversation` via
a prop. That keeps the regression fixed but doesn't address the underlying
shape problem.

## Latent issues this defers

1. **Bus handler gap.** On `main`, `setupMainAppBusListeners.js` registered
   `cmd:messaging:conversation:select` (called `messagingController.selectConversation`).
   On `migrate/p2p-solid` no handler exists. SW-nav was the only known caller and now bypasses the bus, so the command is effectively dead. Needs a cleanup pass (still referenced in contacts list test at least)

2. **Cross-cutting command in `src/setup/`.**
   `cmd:contacts:contact:get-by-room-id` is dispatched by
   `src/features/push-notifications/push-notifications.js` and handled in
   `setupMainAppBusListeners.js`. The handler is a one-line delegate to
   `contactsStore.getContactByRoomId` — pure indirection. The store function
   is already exported; the command + handler add no value.

3. **`src/setup/` still exists.** Once SW-nav is feature-owned and these two
   commands are gone, `setupMainAppBusListeners.js` shrinks to a single
   presence/push handler pair that belong in their owning features.

## Proposed follow-up

1. Add `src/stores/selectedConversationStore.ts` exposing
   `selection()` accessor, `open(selection)`, `clear()`.
2. `MainContent` reads from the store; `ContactsList`/`ContactEntry` call
   `store.open(...)` directly. Drop the `onOpenConversation` prop chain.
3. `<SWNavigation>` calls `selectedConversationStore.open(...)` directly —
   stop accepting `onNavigate`, stop being mounted inside `MainContent`.
   Mount it from `App.tsx` or `main.tsx` instead.
4. Delete `cmd:messaging:conversation:select` and
   `cmd:contacts:contact:get-by-room-id` and their handlers. Migrate the
   two remaining commands in `setupMainAppBusListeners.js`
   (`cmd:user:presence:set-offline`, `cmd:push:subscription:disable`) into
   their owning features.
5. Delete `setupMainAppBusListeners.js`.

## Why not now

The above touches state ownership across MainContent + contacts list +
push-notifications, and adds a new store. Wanted to keep pass 1 mechanical
(restore the SW-nav regression, delete clearly dead files) and decide store
shape separately.
