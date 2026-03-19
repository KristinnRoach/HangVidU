# Notifications Potential Cleanup: Redundant Code Blocks And Files

This note is intentionally high-level. It only lists the most significant cleanup candidates that currently make the notifications area harder to reason about. It has NOT been properly reviewed by a human.

## 1. Legacy Transport Layer Was The Highest-Impact Redundancy

The highest-impact redundancy was the old transport-oriented notification stack that existed alongside the active Web Push slice.

This cleanup has now been done. The repository should treat `pushSubscriptions` plus Web Push as the only supported delivery model.

Why it matters:

- The active implementation now uses `pushSubscriptions`, backend Web Push functions, the service worker, and [src/notifications/push-notification-controller.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/notifications/push-notification-controller.js).
- Parallel transport layers make the notification area harder to reason about.
- Stale transport language in cleanup paths and docs increases the chance of future fixes touching the wrong system.

Likely cleanup direction:

- Keep one supported transport architecture for production.
- Keep account cleanup and token-removal code aligned with `pushSubscriptions` only.

## 2. Diagnostics Were Built Around The Old Model

A second major redundancy was the diagnostics surface. Much of it targeted the older notification-controller shape rather than the current Web Push controller.

This cleanup has also now been done. Any future diagnostics should be rebuilt around the active Web Push flow only.

Why it matters:

- A diagnostic tool that points at the wrong controller or wrong token model is worse than no diagnostic tool because it creates false confidence.
- The current debugging work has relied more on targeted logs in `main.js` and `sw.js` than on the dashboard.

Likely cleanup direction:

- Avoid maintaining two developer-debugging stories at once.

## 3. Two Incoming-Call Notification Mechanisms Compete

Incoming calls currently have two conceptually separate notification paths:

- Web Push via the service worker
- RTDB-driven in-app incoming-call UX in `main.js`

Primary files:

- [src/main.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/main.js)
- [src/sw.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/sw.js)
- [src/ui/components/calling/incoming-call.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/ui/components/calling/incoming-call.js)
- [src/ui/utils/call-indicators.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/ui/utils/call-indicators.js)
- [src/media/audio/ringtone-manager.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/media/audio/ringtone-manager.js)

Why it matters:

- The original real call-start display failure has now been fixed, but the area is still fragile and debugging showed how easy it is to misattribute notification issues when push delivery, service worker display, and RTDB-driven call UI all overlap.
- The next real issue to isolate is click behavior: the real incoming call notification can now display, but clicking it does not yet successfully answer the call.
- Even if both paths are individually valid, the ownership boundary is not clear enough yet: which path owns background notification, which path owns foreground UI, and when they are allowed to overlap.

Likely cleanup direction:

- Define a single source of truth for each state:
  - signaling/call state
  - foreground incoming-call UI
  - background/system notifications
- After that, remove any duplicated responsibilities rather than layering more guards on top.

## 4. Temporary Verification Hooks Should Not Become Permanent

Some current code exists only to speed up verification, not as a final product decision.

Primary files:

- [src/ui/components/contacts/contacts.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/ui/components/contacts/contacts.js)
- [src/main.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/main.js)
- [docs/notifications-web-push-handoff.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/docs/notifications-web-push-handoff.md)

Examples:

- debug call notification button in the contacts list
- temporary call-start logging
- temporary service worker payload logging
- temporary sender/receiver identity logging
- temporary backend delivery failure detail logging

Why it matters:

- These are useful while isolating the failure.
- They should be explicitly removed or dev-gated after the incoming-call issue is understood, otherwise they become accidental product surface area and long-term noise.

## Recommended Cleanup Order

1. Fix notification click-to-answer for real incoming calls.
2. Decide the final production notification architecture for background notification vs foreground incoming-call UX.
3. Remove temporary debug hooks and extra logging.
4. Keep the subscription ownership hardening and unique per-attempt call notification identity.
5. Update docs so the repository has one clear notification story.
