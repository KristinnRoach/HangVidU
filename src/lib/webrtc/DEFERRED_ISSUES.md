# Deferred Issues — `src/lib/webrtc/`

Known issues flagged during review but intentionally deferred. Revisit before publishing externally.

---

## `sdp.js` — dedup cache mutated before apply

**Flagged:** 2026-04-20 (CodeRabbit, PR [#491](https://github.com/KristinnRoach/HangVidU/pull/491))
**Deferred:** 2026-04-21 (PR [#492](https://github.com/KristinnRoach/HangVidU/pull/492))
**File:** `src/lib/webrtc/sdp.js`
**Severity:** Latent bug (bites on retry-after-failure, not happy-path)

### Symptom
`isDuplicateSdp(pc, sdp)` writes the SDP into its cache at check time, *before* the subsequent `setRemoteDescription` is attempted. If that apply fails (thrown error) or is short-circuited (signaling-state check returns false), the SDP is still marked "seen" — so a legitimate retry with the same SDP will be silently dropped as a duplicate.

### Correct shape
Split check from mark:

```js
// Check-only; no mutation
export function isDuplicateSdp(pc, sdp) { ... }

// Call only after a successful setLocalDescription / setRemoteDescription
export function markSdpApplied(pc, sdp) { ... }
```

Update both callsites so they call `markSdpApplied` *after* the native WebRTC call succeeds, not before.

### Why deferred
1. Pre-existing — identical shape existed in the pre-extraction `webrtc-utils.js`. Not a regression from PR #491.
2. Non-trivial blast radius — the dedup guards the RTDB "own write echoes via onValue listener" path; splitting check/mark needs careful review of every SDP entry point to make sure nothing re-enters between the two calls.
3. Not currently breaking — happy path never retries, so the pre-emptive write ends up semantically correct.

### When to fix
Before publishing `lib/webrtc/` as an external package, or the first time we see a retry-after-failure bug in the field. Needs a targeted regression test for the retry path.
