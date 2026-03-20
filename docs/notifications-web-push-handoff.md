# Notifications Web Push Handoff

## Status

This is **not** the intended final notifications architecture.

The current changes were made to **prove functionality quickly** on the deployed site, especially for iPhone Home Screen PWA behavior. That verification is now mostly complete.

Current branch:

- `codex/notifications-phase-1`

Current PR:

- [#409](https://github.com/KristinnRoach/HangVidU/pull/409)

## What Works

Verified manually on deployed site:

- real text message notifications while app/browser closed or phone locked
- real file message notifications while app/browser closed or phone locked
- real missed call notifications while app/browser closed or phone locked
- manual debug call notification to a target contact
- real incoming call notification at call start while app/browser closed or in background
- tapping the real incoming call notification now opens/focuses the app and answers the call

## What Does Not Work Yet

- temporary debugging logs and debug-oriented plumbing are still present and should be cleaned up after the click/answer issue is understood

## Important Context

The current code is a **functional verification slice**, not a clean end-state.

After notification click-to-answer is fixed, the plan should be:

1. avoid adding more complexity unless strictly necessary
2. identify dead, redundant, overlapping, or duplicate notification code
3. remove obsolete duplicate / fallback notification paths
4. settle on a simple, decoupled, localized notifications architecture
5. define clean usage patterns for calls vs messages vs service worker behavior

## Very Important Separation

Do **not** confuse these two systems:

1. In-app UI notifications:
   - [in-app-notification-manager.js](/src/ui/components/notifications/in-app-notification-manager.js)

2. Web Push notifications:
   - service worker
   - push subscription registration
   - backend send functions
   - [push-notification-controller.js](/src/notifications/push-notification-controller.js)

These should stay **separate concerns**.

If any future change accidentally mixes them, that should be called out explicitly.

## Latest Confirmed Findings

The Web Push pipeline itself is proven working, including real incoming call delivery.

The original “real incoming call notification does not display” problem is no longer likely to be:

- iPhone/PWA push support
- VAPID setup
- subscription storage
- the service worker display path in isolation
- payload shape or notification `type` mismatch

Latest verified findings:

- the real outgoing call flow in [main.js](src/main.js) does reach `sendCallNotification()` on call start
- sender-side logs now include local user identity, target user identity, payload shape, and backend delivery result
- receiver-side logs now include local service-worker identity and intended target user identity
- a stale cross-user subscription bug was confirmed: one of user A's browser subscriptions was stored under user B's `pushSubscriptions`
- backend registration has now been hardened so a subscription endpoint is removed from other users before being registered to the current authenticated user
- after removing stale subscriptions and re-registering cleanly, cross-user delivery stopped reproducing
- on the receiving device, the service worker logs `Web push received` for the real incoming call
- the debug button next to a contact reliably shows an incoming call notification on the target device
- missed call notifications still appear reliably
- the real incoming-call display failure was ultimately fixed by giving each call push a unique notification identity per attempt instead of reusing the stable room-based identity
- the first topic-based version of that fix failed because Web Push topics must be at most 32 URL-safe characters; hashing the notification identity down to a valid topic resolved that
- real incoming call pushes now succeed again with `successCount: 1` and `failureCount: 0` in the current clean test state

## What Was Actually Wrong

There were two real issues uncovered during debugging:

1. subscription ownership contamination:
   - a browser push subscription ended up stored under multiple users
   - this caused user A to receive pushes intended for user B during testing

2. real call notifications reused a stable room-based notification identity:
   - debug pushes used a fresh identity each time and displayed reliably
   - real call-start pushes reused the same room-based identity
   - moving to a unique per-attempt call notification identity fixed the display problem
   - the backend `topic` must remain within the Web Push length/character limit, so the unique notification ID is hashed before being used as a topic

## Recommended Next Step

Start next session with notification architecture cleanup and simplification, not new feature work.

Do not broaden the scope beyond clarifying API / ownership boundaries for notifications.

Latest debugging sequence already completed:

1. added temporary logs around the real call-start send point in [main.js](src/main.js)
2. confirmed `sendCallNotification()` is reached on real call start
3. logged `contactId`, `roomId`, identity, payload shape, and returned result/error
4. added temporary service worker logs showing the incoming push payload/type/tag right before `showNotification(...)`
5. confirmed and fixed cross-user subscription contamination
6. confirmed and fixed the stable room-based notification identity problem for real incoming calls
7. traced the notification click path end-to-end and confirmed the missing app-side handling for the service worker `NAVIGATE` message when an existing client was reused
8. added app-side handling for the service worker `NAVIGATE` message so an already-open app now focuses and joins the intended room on notification tap

Recommended next step now:

1. refine the notification architecture / API / ownership boundaries now that the proof-of-functionality slice is complete
2. keep temporary debugging logs until the next robustness / cleanup pass is complete
3. add regression tests after the structure is settled enough that tests will not churn with the refactor
4. once the architecture is clearer, remove temporary debugging logs and any debug-only plumbing that is no longer needed

Before testing next session:

- make sure both the latest app bundle and the latest service worker from this branch are active on the test devices, otherwise notification-click debugging can be misleading
- stale service worker / app bundle mismatches are still a high-likelihood source of false negatives while testing notification-click behavior
- the service worker currently focuses `clients[0]` when reusing an existing app window; if multiple app windows/tabs are open, notification clicks may focus the wrong client

## Current Implementation Notes

These changes were intentionally pragmatic:

- Web Push is the active client push path for the verified slice
- message notifications were switched to the working Web Push send path
- a temporary debug button was added next to contacts to test target-device call pushes
- temporary debugging logs were added in the call-start path, backend response path, and service worker
- a focused integration test was added to prove `callContact()` attempts the push immediately on successful call start
- push subscription registration now enforces exclusive ownership of a subscription endpoint across users
- call pushes now use a unique notification identity per attempt while preserving `roomId` for call routing/click handling
- notification clicks now work both for fresh app opens and when the service worker reuses an already-open app client by posting a `NAVIGATE` message that the app handles locally

This is acceptable for verification, but should be cleaned up before treating notifications as finalized architecture.
