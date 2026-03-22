# Push Notifications

Current production notification kinds:

- `incoming_call`
- `missed_call`
- `message`

Current ownership:

- app code imports push functionality from [src/push-notifications/index.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/push-notifications/index.js)
- backend delivery logic lives under [functions/push-notifications](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications)
- service worker push handling lives under [src/push-notifications/sw](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/push-notifications/sw)
- in-app UI notifications remain separate under [src/ui/components/notifications](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/src/ui/components/notifications)

Current behavior:

- outgoing calls send push through the authenticated `sendCallNotification` function
- missed calls reuse the same call notification identity so the missed-call notification can replace the ringing notification for the same call attempt
- message notifications are backend-driven from the RTDB trigger
- when the app already has a visible focused window, native notification display is suppressed
- notification clicks reopen or focus the app and translate into app navigation
- click routing now prefers a focused visible app window, then any visible app window, before falling back to the first matched window client
- subscription ownership is resolved through `pushSubscriptionOwners/{subscriptionId}` only
- subscription registration validates the push endpoint shape and sanitizes stored `deviceInfo`
- Web Push delivery TTL is explicit by type: `incoming_call` `30s`, `missed_call` `300s`, `message` `3600s`, fallback `60s`

Known follow-up:

- the foreground-focused behavior is intentionally minimal for V1: no separate in-app foreground notification UX is shown
