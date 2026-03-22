# Web Push Subscription Fallback Issue

## Status

Resolved on March 22, 2026.

The legacy subscription-ownership fallback has been removed from runtime code.
Push subscription ownership now resolves through the direct ownership index at
`pushSubscriptionOwners/{subscriptionId}` only.

## What Was Happening

The old registration flow had two ownership-resolution paths:

- the canonical ownership index at `pushSubscriptionOwners/{subscriptionId}`
- a legacy fallback that scanned `users/*/pushSubscriptions/{subscriptionId}`
  when the index entry was missing

That fallback existed only for compatibility with pre-indexed subscription data.

## Why The Fallback Was Removed

Keeping the fallback alive meant the registration path still had a second
ownership model with broader RTDB reads and more room for stale or ambiguous
state.

The direct ownership index is the correct long-term model because it keeps
ownership resolution deterministic and single-source-of-truth.

## Verification And Migration Outcome

Temporary production logging was added to detect actual fallback usage.

The first log pass showed the ownership index was sometimes missing, but the
legacy scan was finding `legacyOwnerCount: 0`. That meant the runtime log was
detecting missing index entries, not proving that legacy owner cleanup was still
needed.

A one-off RTDB repair script was then added and run:

- [repair-push-subscription-ownership.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/scripts/repair-push-subscription-ownership.js)

That repair did the following:

- backfilled missing `pushSubscriptionOwners` entries from active
  `users/{uid}/pushSubscriptions/{subscriptionId}` data
- removed orphaned ownership-index entries with no backing subscription
- checked for duplicate ownership records across users

Observed dry-run/apply result before fallback removal:

- `14` subscription records scanned
- `1` missing ownership index backfilled
- `11` orphaned ownership indexes removed
- `0` duplicate subscription IDs
- `0` duplicate copies to remove
- `0` malformed entries

Post-apply verification result:

- `0` missing indexes
- `0` wrong indexes
- `0` orphaned indexes
- `0` duplicates
- `0` required RTDB updates

That was the basis for removing the fallback.

## Exact Runtime Change

The fallback was removed from
[subscription-ownership-store.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications/subscription-ownership-store.js).

Removed:

- `findLegacySubscriptionOwners(...)`
- the `else if (!indexedOwnerUid)` branch inside
  `getExclusiveSubscriptionOwnershipUpdates(...)`
- the temporary log `[Push] Legacy subscription ownership fallback used`

Current ownership behavior:

- always write `pushSubscriptionOwners/{subscriptionId} = currentUid`
- if an indexed owner exists and differs from `currentUid`, clear
  `users/{indexedOwnerUid}/pushSubscriptions/{subscriptionId}`
- do not scan the full `users` tree during registration

## Remaining Operational Assumption

This change assumes the ownership index remains the canonical source and future
subscription writes continue creating or updating
`pushSubscriptionOwners/{subscriptionId}` correctly.

If ownership drift reappears later, the repair script should be used to inspect
and repair RTDB state rather than reintroducing the runtime fallback.

## Success Criteria

This issue is resolved when all of the following remain true:

- push subscription ownership is resolved through one canonical path only
- there is no user-scan fallback in normal registration flow
- stale subscription cleanup still works
- cross-user subscription contamination does not reappear
- the code and docs no longer describe two parallel ownership models
