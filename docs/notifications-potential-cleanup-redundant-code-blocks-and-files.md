# Notifications Potential Cleanup: Redundant Code Blocks And Files

This note is intentionally high-level. It only lists the most significant cleanup candidates that currently make the notifications area harder to reason about. It has NOT been properly reviewed by a human.

## 1. Legacy Transport Layer Still In Tree

The highest-impact redundancy is the old transport-oriented notification stack that still exists alongside the active Web Push slice.

Primary files:

- [src/notifications/transports/fcm-transport.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/notifications/transports/fcm-transport.js)
- [src/notifications/transports/native-transport.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/notifications/transports/native-transport.js)
- [src/auth/auth-actions.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/auth/auth-actions.js)

Why it matters:

- The active implementation now uses `pushSubscriptions`, backend Web Push functions, the service worker, and [src/notifications/push-notification-controller.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/notifications/push-notification-controller.js).
- The FCM and Native transport files still describe a parallel architecture, data model, and failure mode.
- Some cleanup paths and docs still speak in FCM terms, which increases the chance of future fixes touching the wrong system.

Likely cleanup direction:

- Choose one supported transport architecture for production.
- Remove or quarantine the inactive transport files once the real incoming-call issue is resolved.
- Update any remaining account cleanup or token-removal code to use the chosen data model only.

## 2. Diagnostics Are Built Around The Old Model

A second major redundancy is the diagnostics surface. Much of it appears to target the older FCM/controller shape rather than the current Web Push controller.

Primary files:

- [src/diagnostics/dashboard.html](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/diagnostics/dashboard.html)
- [src/diagnostics/diagnostic-service.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/diagnostics/diagnostic-service.js)
- [src/diagnostics/README.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/diagnostics/README.md)
- [src/diagnostics/MANUAL-TESTING-STEPS.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/diagnostics/MANUAL-TESTING-STEPS.md)
- [src/diagnostics/QUICK-WIN-SUMMARY.md](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/diagnostics/QUICK-WIN-SUMMARY.md)

Why it matters:

- A diagnostic tool that points at the wrong controller or wrong token model is worse than no diagnostic tool because it creates false confidence.
- The current debugging work has relied more on targeted logs in `main.js` and `sw.js` than on the dashboard.

Likely cleanup direction:

- Either rewrite diagnostics around the active Web Push controller and `pushSubscriptions`, or remove the stale dashboard/docs entirely.
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

- The debug-button push works, while the real call-start case does not. That strongly suggests the conflict appears only when the full RTDB incoming-call path is active at the same time.
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

Why it matters:

- These are useful while isolating the failure.
- They should be explicitly removed or dev-gated after the incoming-call issue is understood, otherwise they become accidental product surface area and long-term noise.

## Recommended Cleanup Order

1. Finish isolating the real incoming-call failure.
2. Decide the final production notification architecture.
3. Remove stale transport and diagnostic layers.
4. Remove temporary debug hooks and extra logging.
5. Update docs so the repository has one clear notification story.
