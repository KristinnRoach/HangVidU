# Web Push Subscription Fallback Issue

## Why This Exists

The current push registration flow primarily uses the direct ownership index at `pushSubscriptionOwners/{subscriptionId}` to decide which user owns a browser push subscription.

That is the correct long-term model.

However, there is still a legacy fallback path that can scan older user-owned subscription records when the ownership index is missing for a given subscription.

This fallback exists only for compatibility with pre-indexed subscription data.

## Why The Fallback Is A Potential Issue

The fallback is useful for legacy cleanup, but it creates risk and complexity that the direct ownership index does not.

Main concerns:

- it reintroduces cross-user ambiguity in the exact area that was already known to be sensitive during debugging
- it increases the chance that stale or duplicated historical data can affect current registration behavior
- it keeps a second ownership resolution path alive, which makes reasoning, testing, and incident triage harder
- it makes the registration flow more expensive than necessary because it may scan broader user data
- it can mask incomplete migration state instead of forcing the system into one canonical ownership model

The most important point is not just performance. The real problem is trust in ownership resolution. Push subscription ownership should be deterministic and single-source-of-truth.

## Feasible Options

### Option 1: Keep the fallback indefinitely

This is the lowest-effort option in the short term, but it is the weakest long-term shape.

Pros:

- no migration work required right now
- least immediate engineering effort

Cons:

- keeps two ownership models alive
- preserves extra risk around stale legacy data
- makes future debugging less clean

This is only reasonable if the team explicitly accepts permanent legacy complexity.

### Option 2: Keep the fallback temporarily, then remove it after a cleanup window

This is the most practical option if there may still be real legacy subscriptions in the wild.

Pros:

- low migration risk
- gives a controlled path to eliminate legacy behavior
- keeps the direct ownership index as the clear destination

Cons:

- requires one follow-up cleanup task instead of leaving the system as-is

This is the safest default if there is any uncertainty about how many active subscriptions were created before the ownership index existed.

### Option 3: Remove the fallback now

This is the cleanest architecture if you are confident the legacy state is no longer needed.

Pros:

- immediate simplification
- one canonical ownership model only
- lowest long-term risk and maintenance cost

Cons:

- older unindexed subscriptions may silently stop being cleaned up correctly until those users re-register
- some users may need to re-enable notifications or refresh their subscription state

This is feasible if the active install base is small enough, or if a little re-registration churn is acceptable.

## Recommendation

The recommended path is:

1. keep the fallback only as a short-lived migration aid
2. measure whether any registrations still rely on it
3. remove it once real usage is confirmed to be negligible or zero

If there is already strong confidence that nearly all active clients have re-registered since the ownership index was introduced, then removing it now is also a reasonable choice.

## Temporary Log Now Added

A temporary structured production log has now been added on the legacy fallback path in [functions/push-notifications/subscription-ownership-store.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications/subscription-ownership-store.js).

It only fires when the direct ownership index lookup at `pushSubscriptionOwners/{subscriptionId}` is missing and the code falls back to scanning legacy user-owned subscription records.

The log message is:

- `[Push] Legacy subscription ownership fallback used`

The structured fields emitted are:

- `subscriptionKey`
- `claimedByUserId`
- `legacyOwnerCount`
- `legacyOwnerUserIds`

This is temporary instrumentation to answer one operational question after redeploy: is the legacy path still being exercised by real production registrations.

## Concise Task List To Resolve

1. Redeploy functions so the new fallback log is live in production.
2. Inspect production logs for `[Push] Legacy subscription ownership fallback used` over a short observation window.
3. Look at both frequency and shape of hits, not just whether any single hit exists.
4. If fallback usage is effectively zero, delete the fallback path and keep only direct ownership-index resolution.
5. If fallback usage is non-zero but small, allow a short cleanup window, then remove the fallback after that window.
6. After removal, verify that registration, re-registration, stale subscription cleanup, and cross-user protection still behave correctly.

## What To Look For In Prod Logs After Redeploy

After the updated functions are deployed, inspect logs specifically for:

- any occurrence of `[Push] Legacy subscription ownership fallback used`
- how many total hits occur per day
- whether the same `claimedByUserId` appears repeatedly
- whether the same `subscriptionKey` appears repeatedly
- whether `legacyOwnerCount` is usually `0`, `1`, or greater than `1`
- whether `legacyOwnerUserIds` shows repeated stale ownership or widespread active churn

Interpretation guidance:

- `legacyOwnerCount: 0` means the fallback path was entered, but no old user-owned record was found. This still proves the legacy branch is being exercised because the ownership index entry was missing.
- `legacyOwnerCount: 1` is the expected legacy-cleanup shape if an old owner record exists and is being cleaned up.
- `legacyOwnerCount > 1` is more concerning because it suggests duplicated or ambiguous historical ownership state across multiple users.
- repeated hits for brand-new traffic after several days suggest the system is still producing or depending on unindexed subscriptions, so removal should wait until that is explained.
- no hits, or only isolated one-off hits that disappear after active users naturally re-register, is the shape that makes fallback removal reasonable.

## Success Criteria For Safe Removal

It is relatively safe to remove the fallback when all of the following are true:

- after redeploy, the production log `[Push] Legacy subscription ownership fallback used` stays at zero for a full observation window, or is limited to a tiny one-off tail that then stops
- there is no continuing stream of new fallback hits from normal active usage
- no repeated `subscriptionKey` keeps appearing in fallback logs
- no repeated `claimedByUserId` keeps appearing in fallback logs
- there is no evidence of `legacyOwnerCount > 1` from active traffic
- normal push registration and re-registration still succeed in production

A practical default threshold is:

- safe enough to remove if there are zero fallback hits for at least 7 consecutive days after production redeploy
- also reasonable to remove if there are only a few isolated hits immediately after deploy, then zero hits for the following 7 consecutive days

It is not relatively safe to remove yet if:

- fallback hits continue appearing throughout the observation window
- the same users or subscription keys keep triggering fallback
- new hits keep appearing each day instead of decaying away
- multiple-owner cases appear in a non-trivial way

## Exact Code To Remove When Retiring The Fallback

When it is time to remove the fallback, the canonical code change should be made in [functions/push-notifications/subscription-ownership-store.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications/subscription-ownership-store.js).

Delete the legacy scan helper entirely:

- remove `findLegacySubscriptionOwners(...)`

Then remove the `else if (!indexedOwnerUid)` branch from `getExclusiveSubscriptionOwnershipUpdates(...)`, including:

- the call to `findLegacySubscriptionOwners(...)`
- the temporary log `[Push] Legacy subscription ownership fallback used`
- the loop that nulls `users/{uid}/pushSubscriptions/{subscriptionId}` for legacy owners discovered by the scan

After removal, that function should only do two ownership actions:

- write `pushSubscriptionOwners/{subscriptionId} = currentUid`
- if an indexed owner exists and differs from `currentUid`, clear `users/{indexedOwnerUid}/pushSubscriptions/{subscriptionId}`

In other words, `getExclusiveSubscriptionOwnershipUpdates(...)` should become direct-index-only logic with no full `users` tree scan.

The expected cleanup impact is:

- [functions/push-notifications/subscription-ownership-store.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications/subscription-ownership-store.js): remove helper and fallback branch
- keep [functions/push-notifications/register-push-subscription-handler.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications/register-push-subscription-handler.js) unchanged unless you also want to remove any temporary wording in adjacent logs or comments
- update this document afterward so it no longer describes the fallback as active behavior

## Recommended Success Criteria

This issue is resolved when all of the following are true:

- push subscription ownership is resolved through one canonical path only
- there is no user-scan fallback in normal registration flow
- stale subscription cleanup still works
- cross-user subscription contamination does not reappear
- the code and docs no longer describe two parallel ownership models
