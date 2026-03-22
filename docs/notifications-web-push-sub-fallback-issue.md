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

## Concise Task List To Resolve

1. Add one temporary failure-only metric or counter for fallback usage so it is clear whether the legacy path still matters.
2. Manually inspect production data or logs for recent fallback hits over a short observation window.
3. If fallback usage is effectively zero, delete the fallback path and keep only direct ownership-index resolution.
4. If fallback usage is non-zero but small, schedule a short cleanup window, then remove the fallback after that window.
5. After removal, verify that registration, re-registration, stale subscription cleanup, and cross-user protection still behave correctly.

## Recommended Success Criteria

This issue is resolved when all of the following are true:

- push subscription ownership is resolved through one canonical path only
- there is no user-scan fallback in normal registration flow
- stale subscription cleanup still works
- cross-user subscription contamination does not reappear
- the code and docs no longer describe two parallel ownership models
