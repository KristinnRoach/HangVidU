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

- The original real call-start display failure has now been fixed, and notification tap-to-answer is also now working, but the area is still fragile and debugging showed how easy it is to misattribute notification issues when push delivery, service worker display, and RTDB-driven call UI all overlap.
- Two practical gotchas remain important during testing even if they are not architecture decisions:
  stale service worker / app bundle mismatches can make click-behavior debugging misleading, and the current service worker reuse path focuses `clients[0]`, which may be the wrong app client if multiple tabs/windows are open.
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
- They should be explicitly removed or dev-gated after there is a robust replacement for testing / debugging notification behavior outside production-like flows, otherwise they become accidental product surface area and long-term noise.

Current examples that are intentionally still present for now:

- debug call notification button in the contacts list
- `window.pushNotificationController`

These are deferred cleanup items, not signals that they should become part of the long-term production surface.

## 5. Subscription Ownership Enforcement Still Has One Major Scalability Risk

The current exclusive-ownership hardening for push subscriptions is correct for the current verification slice, but the implementation still has one major cost profile issue: registration can scan the entire `users` tree to remove a duplicated subscription from other users.

Why it matters:

- This is acceptable while validating the new Web Push path.
- It should not be treated as the durable end-state if the user base grows.
- This is the main still-valid major issue to carry into the next architecture/API pass.

Likely cleanup direction:

- replace full-tree scans with a more direct ownership/indexed model once the final notification structure is settled
- revisit TTL policy only after the final notification shape / types / schema are defined and validated

## Recommended Cleanup Order

1. Decide the final production notification architecture for background notification vs foreground incoming-call UX.
2. Remove temporary debug hooks and extra logging.
3. Keep the subscription ownership hardening and unique per-attempt call notification identity.
4. Replace the current full-tree subscription ownership scan with a more direct ownership/indexed approach.
5. Add regression tests once the notification structure is stable enough that the tests will not churn with the refactor.
6. Update docs so the repository has one clear notification story.
