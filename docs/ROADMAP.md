# Roadmap

Keep HangVidU straightforward to maintain as features are added.

[Working conventions](../AGENTS.md) · [Current code map](architecture/README.md)

## Current status

- **Current:** Step 2 complete. Keep Solid, Kobalte, and Tailwind. The add-contact flow is the reference for shared controls, theme tokens, selection, status feedback, and dialog-scoped async work.
- **Next UI slice:** Replace the imperative toast UI with a Solid/Kobalte toast using the existing theme ([#775](https://github.com/KristinnRoach/HangVidU/issues/775)); remove its replaced stylesheet. Continue component by component as features need them.
- **Group calls:** Four-person room admission is implemented. Validate calls at capacity on representative devices and networks, including when someone leaves or reconnects.
- **Separate follow-up:** [Failed-message recovery (#758)](https://github.com/KristinnRoach/HangVidU/issues/758).

Update this block in the same PR when progress or the next step changes. Keep it
concise and concrete, with no history. Link to a GitHub issue or PR when the
proposed next step needs more detail.

Resolve open decisions when each step starts and update its status as work lands.
Build ongoing UI improvements on the foundation from step 2.

## 1. Reliable session behaviour — done

- **Outcome:** Navigation and session changes do not disrupt ongoing work or apply stale results.
- **Scope:** Stale conversation requests and call media lifetime independent of screen mounting. Failed-message recovery is tracked separately in #758.
- **Decide:** Operation ownership and cancellation boundaries.
- **Done when:** Tests cover delayed results after navigation/logout and call continuity across screen changes.

`CallHandshakeProvider` owns call media for the active call. Conversation opens,
sends, and uploads belong to one activation of the selected conversation in
[`conversation-store.ts`](../src/stores/conversation/conversation-store.ts);
logout and every selection change start a new one.

## 2. Minimal UI foundation — done

- **Outcome:** UI improvements and new features follow a simple, consistent system.
- **Scope:** Shared visual tokens, core controls, and accessible dialog behaviour. Apply them to a small existing flow as the reference for future work.
- **Decision:** Solid + Kobalte + Tailwind; add-contact is the reference. Shared controls own appearance and states; screens own layout. Theme tokens live in `src/styles/theme.css`, with Tailwind defaults for spacing, typography, and rounding.
- **Done when:** The reference flow demonstrates styling, focus, keyboard, loading, and error states that new UI can reuse.

Use Tailwind as the default. Reconcile global CSS and CSS Modules component by
component, removing replaced rules. A complete redesign or CSS migration is not a prerequisite.

## 3. Group calls — first major feature

- **Outcome:** Multiple participants can join and remain in a call independently.
- **Scope:** Invitations, participant identity/layout, media controls, and per-participant connection feedback.
- **Decided:** Up to 4 participants on the P2P mesh. Knowing a room ID grants access, with one endpoint per account ([architecture](architecture/README.md#data-and-transport)).
- **Decided:** Any participant can add a contact by calling them from the contacts list during a call; the invite carries the live room ID. Room links remain the way to add guests.
- **Decide:** Who else may invite (host roles), and what measurements would justify an SFU or a higher limit.
- **Done when:** Calls work at the chosen limit on representative devices/networks, including a participant leaving or reconnecting while others continue.

## 4. User settings

- **Outcome:** Users can adjust app preferences and call settings.
- **Scope:** A settings UI using the shared foundation, with explicit defaults and persistence behaviour.
- **Decide:** Initial preferences; which belong to the device, account, or current session; whether any require cross-device sync.
- **Done when:** Selected preferences apply consistently, persist as intended, and handle logout and unavailable devices predictably.

## 5. Shared media playback

- **Outcome:** Participants can watch media together on a synchronised timeline.
- **Scope:** Play/pause/seek, late joining, buffering feedback, and reconnection.
- **Decide:** Initial media sources and access, playback control, acceptable synchronisation, and behaviour when participants leave.
- **Done when:** Participants can join and resume shared playback within the agreed sync target, with clear loading and recovery states.

## 6. Private data-channel messaging

- **Outcome:** Users can explicitly choose private messaging over a data channel.
- **Scope:** A clearly identified messaging mode with defined delivery, retention, and failure behaviour.
- **Decide:** Recipients, supported content, retention, delivery acknowledgement, and disconnect/membership-change behaviour.
- **Done when:** The privacy promise is documented and tested across storage, drafts, uploads, notifications, and telemetry; no silent fallback to persistent messaging occurs.

## Later / outside the critical path

- WhatsApp/Telegram invite buttons: removed from add-contact in favour of copy link and native share. `src/shared/utils/share-invite-presets.js` (tested, unwired) can be reconnected if users ask for one-tap provider sharing.
- Older-message pagination: persistent chat currently exposes the latest 40 messages. Keep historical pages separate from live-message eviction.
- Backend consolidation, broad JS-to-TS conversion, and full CSS migration are not prerequisites.
- Expand experiments or introduce general frameworks only for a demonstrated need.
