# Notifications Web Push Handoff

## Status

This is **not** the intended final notifications architecture.

The current changes were made to **prove functionality quickly** on the deployed site, especially for iPhone Home Screen PWA behavior. That verification is now mostly complete.

Current branch:
- `codex/notifications-phase-1`

Current commit:
- `6b1d1cd`

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
3. remove obsolete FCM-oriented / fallback / duplicate paths
4. settle on a simple, decoupled, localized notifications architecture
5. define clean usage patterns for calls vs messages vs service worker behavior

## Very Important Separation

Do **not** confuse these two systems:

1. In-app UI notifications:
   - [in-app-notification-manager.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/ui/components/notifications/in-app-notification-manager.js)

2. Web Push notifications:
   - service worker
   - push subscription registration
   - backend send functions
   - [push-notification-controller.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/notifications/push-notification-controller.js)

These should stay **separate concerns**.

If any future change accidentally mixes them, that should be called out explicitly.

## Current Likely Root Cause For Incoming Call Failure

The Web Push pipeline itself is proven working.

That means the remaining issue is likely in the **real call-start path**, not in:
- iPhone/PWA push support
- VAPID setup
- service worker delivery
- subscription storage

Most likely suspect:
- the real outgoing call flow in [main.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/main.js) is still not reaching or completing the real incoming-call push send reliably at call start

Missed calls work because they go through a different cleanup path after call lifecycle resolution.

## Recommended Next Step

Only fix incoming call notifications next, and only if it can be done **without adding more complexity or tech debt**.

Suggested debugging sequence:
1. add temporary logs around the real call-start send point in [main.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/main.js)
2. confirm whether `sendCallNotification()` is actually reached on real call start
3. if reached, log `contactId`, `roomId`, and the exact result/error
4. if not reached reliably, move the send even earlier in the successful call-start path
5. add temporary backend log in `sendCallNotification` only if needed to verify the request arrives

## Current Implementation Notes

These changes were intentionally pragmatic:
- Web Push replaced the client FCM-oriented path for the verified slice
- message notifications were switched to the working Web Push send path
- a temporary debug button was added next to contacts to test target-device call pushes

This is acceptable for verification, but should be cleaned up before treating notifications as finalized architecture.
