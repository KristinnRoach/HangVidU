# Notifications Web Push Handoff

## Status

This is **not** the intended final notifications architecture.

The current changes were made to **prove functionality quickly** on the deployed site, especially for iPhone Home Screen PWA behavior. That verification is now mostly complete.

Current branch:

- `codex/notifications-phase-1`

Current PR:

- [#408](https://github.com/KristinnRoach/HangVidU/pull/408)

## What Works

Verified manually on deployed site:

- real text message notifications while app/browser closed or phone locked
- real file message notifications while app/browser closed or phone locked
- real missed call notifications while app/browser closed or phone locked
- manual debug call notification to a target contact

## What Does Not Work Yet

- real incoming call notification at call start

The user should ideally receive a push **when the call starts**, before it degrades into a missed call.

## Important Context

The current code is a **functional verification slice**, not a clean end-state.

After incoming call notifications are fixed, the plan should be:

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

## Current Likely Root Cause For Incoming Call Failure

The Web Push pipeline itself is proven working.

That means the remaining issue is no longer likely to be:

- iPhone/PWA push support
- VAPID setup
- subscription storage
- the backend Web Push send path in isolation

Latest verified findings:

- the real outgoing call flow in [main.js](src/main.js) does reach `sendCallNotification()` on call start
- the call-start send path now logs `contactId`, `roomId`, and the returned push result
- on the receiving device, the service worker logs `Web push received` for the real incoming call
- the debug button next to a contact reliably shows an incoming call notification on the target device
- missed call notifications still appear reliably
- commenting out `dismissCallNotifications(...)` in `main.js` did **not** fix the issue
- an attempted change to skip RTDB incoming-call UI in background did **not** fix the issue and should not be treated as a validated solution

Most likely suspect now:

- the real incoming-call failure is specific to displaying the incoming-call push while the full RTDB incoming-call flow is active on the receiving device
- in other words, this appears to be a **real-call-path display conflict**, not a simple send failure

## Recommended Next Step

Only fix incoming call notifications next, and only if it can be done **without adding more complexity or tech debt**.

Latest debugging sequence already completed:

1. added temporary logs around the real call-start send point in [main.js](src/main.js)
2. confirmed `sendCallNotification()` is reached on real call start
3. logged `contactId`, `roomId`, and the returned result/error
4. added temporary service worker logs showing the incoming push payload/type/tag right before `showNotification(...)`

Recommended next step later:

1. compare the service worker log for the first push during a real call against the later missed-call push
2. compare that against the debug-button push that reliably displays
3. isolate the exact difference in payload/tag/timing between:
   - debug push
   - real incoming-call push
   - missed-call push
4. avoid broad architectural changes until the specific browser/runtime behavior is proven

## Current Implementation Notes

These changes were intentionally pragmatic:

- Web Push is the active client push path for the verified slice
- message notifications were switched to the working Web Push send path
- a temporary debug button was added next to contacts to test target-device call pushes
- temporary debugging logs were added in the call-start path and service worker
- a focused integration test was added to prove `callContact()` attempts the push immediately on successful call start

This is acceptable for verification, but should be cleaned up before treating notifications as finalized architecture.
