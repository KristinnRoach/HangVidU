# Roadmap

Keep HangVidU straightforward to maintain as features are added.

[Working conventions](../AGENTS.md) · [Current code map](architecture/README.md)

Resolve open decisions when each step starts and update its status as work lands.
Build ongoing UI improvements on the foundation from step 2.

## 1. Reliable session behaviour — next

- **Outcome:** Navigation and session changes do not disrupt ongoing work or apply stale results.
- **Scope:** Stale conversation requests and call media lifetime independent of screen mounting. Failed-message recovery is tracked separately in #758.
- **Decide:** Operation ownership and cancellation boundaries.
- **Done when:** Tests cover delayed results after navigation/logout and call continuity across screen changes.

Call media lifetime is done: `CallHandshakeProvider` owns it for the active call.
Next: login-scoped ownership of conversation operations in
[`conversation-store.ts`](../src/stores/conversation/conversation-store.ts).

## 2. Minimal UI foundation

- **Outcome:** UI improvements and new features follow a simple, consistent system.
- **Scope:** Shared visual tokens, core controls, and accessible dialog behaviour. Apply them to a small existing flow as the reference for future work.
- **Decide:** The minimum tokens and controls needed now; the first flow to migrate.
- **Done when:** The reference flow demonstrates styling, focus, keyboard, loading, and error states that new UI can reuse.

Use Tailwind as the default. Reconcile global CSS and CSS Modules component by
component, removing replaced rules. A complete redesign or CSS migration is not a prerequisite.

## 3. Group calls — first major feature

- **Outcome:** Multiple participants can join and remain in a call independently.
- **Scope:** Invitations, participant identity/layout, media controls, and per-participant connection feedback.
- **Decide:** Initial participant limit, access/invitation model, and whether the current P2P approach meets those needs.
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

- Older-message pagination: persistent chat currently exposes the latest 40 messages. Keep historical pages separate from live-message eviction.
- Backend consolidation, broad JS-to-TS conversion, and full CSS migration are not prerequisites.
- Expand experiments or introduce general frameworks only for a demonstrated need.
