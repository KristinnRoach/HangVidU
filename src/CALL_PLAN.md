# Incoming-call via Firebase — Implementation Plan

Date: 2025-10-30

This document summarizes the minimal, reviewable plan to allow a running client to immediately listen for incoming calls (from saved contacts) via Firebase Realtime Database and accept by clicking an "Incoming call" button. It reproduces the plan I provided earlier and adds concrete code snippets and exact insertion points for `src/main.js`.

The goal

- When the app runs (in `init()`), immediately attach a Firebase listener for `users/{peerId}/incomingCalls`.
- When a caller creates a call (`rooms/{roomId}` and `rooms/{roomId}/offer`) and wants to ring a saved contact, they also write a small pointer to `users/{targetPeerId}/incomingCalls/{roomId}`.
- The callee receives a real-time `onChildAdded` notification, shows a small incoming-call UI with an Accept button, and if the user accepts the app runs the existing `answerCall()` flow using the `roomId` from the pointer.

Short feasibility check

- Feasible with the current project. The repo already uses Firebase Realtime Database and exposes `rtdb`, `trackFirebaseListener`, and `removeAllFirebaseListeners` from `src/p2p/firebase.js`, so adding read/write listeners is straightforward.
- Important assumption: the caller must know a routable identifier for the callee (e.g., the callee's ephemeral `peerId` or a stable `auth.uid` mapped to their current `peerId`). If saved contacts do not contain any routable ID, a small additional user-registry mapping is required.

Minimal required database shape (suggested)

```
users/{peerId}:
  lastSeen: number
  online: boolean
  incomingCalls/{roomId}:
    from: string   // caller peerId
    roomId: string
    ts: number

rooms/{roomId}:
  offer: { type, sdp }
  answer: { type, sdp }
  offerCandidates/
  answerCandidates/
```

Notes:

- `rooms/{roomId}/offer` remains the canonical place for the offer SDP.
- `users/{peerId}/incomingCalls/{roomId}` is just a pointer; it doesn't duplicate the offer.

Exact minimal code changes (for review)

- Files touched: `src/main.js` (edits inside `init()` and `createCall()`), optionally a tiny helper `showIncomingCallUI()` inside `src/main.js`.
- No change required in `src/p2p/firebase.js` for now — it already exports `rtdb` and `trackFirebaseListener`.

1. Imports
   Add (or re-use) these imports in `src/main.js` near other Firebase/database imports:

```js
import { ref, onChildAdded, set, remove } from 'firebase/database';
import { rtdb, trackFirebaseListener } from './p2p/firebase.js';
```

(If `set` or `remove` are already used elsewhere, simply add the missing ones.)

2. Register presence & attach incoming-call listener — add inside `init()`
   Add the following (best placed after `peerId = generatePeerId();` or after media setup completes). This registers a simple presence node and attaches `onChildAdded` to incomingCalls.

```js
// --- Presence: register this peer in users/{peerId}
const myUserRef = ref(rtdb, `users/${peerId}`);
set(myUserRef, { lastSeen: Date.now(), online: true }).catch((e) =>
  console.warn('presence set failed', e)
);
// (Optional) use onDisconnect().remove() if you want to clear presence when client disconnects

// --- Listen for incoming calls targeted at this peerId
const incomingCallsRef = ref(rtdb, `users/${peerId}/incomingCalls`);

function onIncomingCallAdded(snapshot) {
  const callData = snapshot.val();
  const incomingRoomId = snapshot.key; // the child key is the roomId
  if (!callData) return;

  // Show UI, pass an accept callback
  showIncomingCallUI(
    { from: callData.from, roomId: incomingRoomId, ts: callData.ts },
    async () => {
      // Accept handler: remove pointer, set roomId and answer
      try {
        await remove(
          ref(rtdb, `users/${peerId}/incomingCalls/${incomingRoomId}`)
        );
      } catch (err) {
        console.warn('Failed to remove incoming pointer:', err);
      }
      roomId = incomingRoomId;
      await answerCall();
    },
    async () => {
      // Optional reject handler: remove pointer
      try {
        await remove(
          ref(rtdb, `users/${peerId}/incomingCalls/${incomingRoomId}`)
        );
      } catch (err) {
        console.warn('Failed to remove incoming pointer on reject:', err);
      }
    }
  );
}

onChildAdded(incomingCallsRef, onIncomingCallAdded);
trackFirebaseListener(incomingCallsRef, 'child_added', onIncomingCallAdded);
```

3. Notify callee in `createCall()`
   Modify `createCall()` to accept an optional `targetPeerId` parameter and, after writing the `rooms/${roomId}/offer`, create a pointer at `users/${targetPeerId}/incomingCalls/${roomId}`:

```js
// updated signature (optional):
async function createCall(targetPeerId = null) {
  // ... existing code ...

  // after set(roomRef, { offer: ... })
  if (targetPeerId) {
    const incomingRef = ref(
      rtdb,
      `users/${targetPeerId}/incomingCalls/${roomId}`
    );
    await set(incomingRef, { from: peerId, roomId, ts: Date.now() });
  }

  // ... rest of existing code ...
}
```

Callers in the UI that "call a saved contact" should pass the saved contact's peerId (or mapped id) to this function.

4. UI helper: `showIncomingCallUI`
   A minimal DOM helper inside `src/main.js` that shows a transient notification with Accept/Decline. Replace with existing modal code if available; this is intentionally minimal.

```js
function showIncomingCallUI(call, onAccept, onReject) {
  // Minimal: transient DOM node appended to body; style with CSS in your app
  const id = `incoming-call-${call.roomId}`;
  if (document.getElementById(id)) return; // avoid duplicates

  const container = document.createElement('div');
  container.id = id;
  container.className = 'incoming-call-notification';

  const msg = document.createElement('div');
  msg.textContent = `${call.from} is calling...`;

  const acceptBtn = document.createElement('button');
  acceptBtn.textContent = 'Accept';
  acceptBtn.onclick = async () => {
    acceptBtn.disabled = true;
    if (onAccept) await onAccept();
    container.remove();
  };

  const rejectBtn = document.createElement('button');
  rejectBtn.textContent = 'Decline';
  rejectBtn.onclick = async () => {
    if (onReject) await onReject();
    container.remove();
  };

  container.appendChild(msg);
  container.appendChild(acceptBtn);
  container.appendChild(rejectBtn);
  document.body.appendChild(container);
}
```

5. Cleanup lifecycle

- Use `trackFirebaseListener` for all listeners attached so `removeAllFirebaseListeners()` will clear them in `hangUp()` / `cleanup()`.
- When accepting or rejecting, remove the `users/{peerId}/incomingCalls/{roomId}` pointer so it doesn't persist.
- Optionally on `hangUp()`, remove any leftover incoming pointers for this peer.

Contract (concise)

- Input: Caller writes `users/{targetPeerId}/incomingCalls/{roomId}` pointing to a room that also has `rooms/{roomId}/offer`.
- Output: Callee sees a notification. On Accept, callee calls the existing `answerCall()` flow with `roomId` set.
- Failure modes: If `rooms/{roomId}/offer` doesn't exist by the time callee accepts, `answerCall()` will detect missing offer and fail gracefully (it already checks `roomSnapshot.exists()` in the existing code).

Edge cases and mitigations

- Ephemeral `peerId` / stale targets: currently `peerId` is ephemeral per client session. If your saved contacts list stores peerIds, they may be stale. Mitigation: maintain a mapping `usersByUid/{uid}/peerId` (update on login) and use `auth.uid` as the stable user id.
- Spam: anyone knowing a peerId can write incoming pointers. Use Firebase Rules + require auth to reduce abuse. Consider allowing only contacts or requiring an authenticated write.
- Race: caller writes incoming pointer before offer is fully set. `answerCall()` already checks for offer existence; if missing, show error to the user and clean up.
- Multiple devices: A user may be logged in on multiple devices with different peerIds; you can write incoming pointers to all active peerIds or use a stable uid mapping.

Database rules (example skeleton)

```
{
  "rules": {
    "users": {
      "$peerId": {
        "incomingCalls": {
          "$roomId": {
            ".write": "auth != null", // adjust to app's auth model
            ".validate": "newData.hasChildren(['from','roomId','ts'])"
          }
        }
      }
    }
  }
}
```

Adjust to your actual security model.

How this will feel to users

1. Caller clicks "Call contact" (UI must pass the contact's routable id to `createCall(targetPeerId)`).
2. Callee's client (already open) receives DB change and shows an incoming-call notification.
3. Callee clicks Accept → pointer is removed, `roomId` set, `answerCall()` invoked, call proceeds normally.

Minimal API change summary

- `createCall(targetPeerId = null)` — optional new parameter. If not provided, current behavior is unchanged.
- Add helper `showIncomingCallUI()` inside `src/main.js`.
- Add listeners (imports + `onChildAdded`) in `init()`.

Optional improvements (post-merge)

- Use `onDisconnect()` to clear presence (and optionally `incomingCalls` stale entries).
- Use auth `uid` as stable identity; maintain a `usersByUid/{uid}/peerIds` list.
- Show OS-level notifications or push notifications if app is in background.
- Add TTL cleanup via Cloud Functions for stale incoming pointers.

Next steps for me (if you give the go-ahead)

- Apply the exact code edits to `src/main.js` and run a quick local smoke check.
- If you prefer, I can instead produce a small patch now for review (a git-style diff). Please tell me whether saved contacts already store a `peerId` or if we should route by `auth.uid` (and I will adapt the plan accordingly).

If anything in this plan needs to be different for your app's saved-contacts model, tell me how contacts are addressed (peerId, email, uid, phone) and I'll update the plan and code snippets to match.

---

Revision history

- 2025-10-30 — initial plan created from previous conversation.
