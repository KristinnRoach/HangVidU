# Roadmap

## Goal and scope

Keep HangVidU easy for a solo maintainer to understand, extend, and maintain.
Prioritise dependable user-facing features and consistent UI over broad rewrites.
This is the agreed direction, not a promise that every detail is already decided.
[AGENTS.md](../AGENTS.md) owns working conventions; the [code map](architecture/README.md)
describes the current implementation.

The baseline supports one-to-one calls, guest room links, screen sharing,
persistent messaging/attachments, and notifications. Group calling is not yet a
validated product capability. Synced playback and private session messaging are
planned. Existing participant collections or data channels do not prove these
features are complete.

## 1. Foundation and dependable existing behaviour — next

The roadmap/conventions cleanup establishes the entry point; it does not implement
the fixes below. Start with conversation operation ownership and failed-message
recovery, then prepare call ownership for group calls.

- **Conversation operations:** scope pending work to the login and conversation
  that started it. A delayed conversation-open can currently override a newer
  selection; an earlier send can clear the current sending flag. Failed text is
  only held in memory after its persisted draft is cleared, and navigation can
  discard it. Verify and fix these paths in `src/stores/conversation/conversation-store.ts`.
- **Call lifetime:** `ActiveCallRoom` currently creates the media controller, whose
  cleanup stops owned tracks. Make the active call own these resources independently
  of screen mounting. Separate experimental face-mask setup from core device handling;
  preserve existing recovery and browser workarounds.
- **Group readiness:** inspect assumptions about “the other person” in invitation,
  identity, departure, reconnect, and media-control flows before extending them.

Done when delayed results cannot affect a newer session, failed text has a recovery
path, and navigating between call/chat/settings cannot stop an ongoing call.
Use focused regression tests for navigation/logout during pending work and call
resource lifetime. Do not introduce a general state or transport framework.

## 2. Small group calls — first major feature

Choose a small initial participant limit and invitation/access model. Validate
that the current peer-to-peer topology works at that limit on representative
devices and networks before expanding scope or choosing new infrastructure.

Deliver participant identity and layout, joining/leaving, independent microphone
and camera controls, and per-participant connection feedback. Clarify whether
contact calls and guest rooms share the same group entry flow and who can invite.
One peer leaving or reconnecting must not terminate everyone else's call.

Done when at least three participants can call, one can leave/rejoin or reconnect
while the others continue, and the chosen limit is exercised on real devices.
Introduce the shared controls and visual tokens this feature actually needs.
Defer large rooms, moderation systems, and topology changes until evidence requires them.

## 3. Settings and UI consistency

Create a small settings screen with useful preferences. Distinguish device-local
preferences (such as a preferred microphone), account preferences that may need
syncing, and transient controls (such as muting this call). Start locally with
explicit defaults, logout behaviour, and unavailable-device fallback; add account
syncing only for a concrete setting.

Improve navigation around an ongoing call, loading/error recovery, and keyboard
accessibility. Establish a small semantic palette (surface, text, muted text,
border, accent, danger) and shared buttons, fields, and dialog behaviour. Migrate
whole components as touched; do not convert all CSS first. This work can begin
inside group calling where needed.

Done when a new screen can reuse tokens and accessible controls, preferences
survive according to their documented scope, and switching screens preserves the call.

## 4. Watch together

Start with one supported media source. Decide how every participant obtains the
media, who controls playback, and what happens when that person leaves. Keep
shared playback separate from camera/screen-share track management.

Deliver play/pause/seek, initial synchronisation for late joiners, buffering
feedback, and reconnection. Define acceptable sync behaviour and test it with
multiple participants. Defer playlists, multiple providers, and elaborate control
arbitration until this small flow works.

Done when participants can join and resume a shared timeline with understandable
loading and recovery states. An ordinary video player or screen share is not this feature.

## 5. Private session messaging

Recommended first scope: text-only messages between connected participants, held
in memory for the session. Decide whether messages address the whole group or a
selected peer, what “sent” means, and what happens on disconnect or membership change.
Make the mode and its retention limits clear to participants.

Keep this path separate from persistent drafts, server message storage, uploads,
and content-bearing push notifications. Audit logging/telemetry before making
privacy claims. Never silently fall back to persistent delivery. Reuse message
presentation where useful, without a speculative transport framework.

Done when the delivery/retention rules are explicit, failures are visible, and tests
verify that private content does not enter persistence or notification paths.
This scope does not promise recipient-side deletion or hide all connection metadata.

## Bounded follow-up and non-goals

Persistent chat needs older-message pagination: both server and client currently
expose a recent window of 40. Keep paged history separate from live-tail eviction,
deduplicate by message ID, and preserve scroll position. This does not block group calls.

Do not make backend consolidation, blanket TypeScript conversion, a complete CSS
migration, a generic plugin architecture, or a repository rewrite prerequisites.
Do not expand the face-mask experiment as foundation work. Resolve detailed design
questions when their feature starts, and update this document when priorities or
completion status change rather than accumulating parallel plans.
