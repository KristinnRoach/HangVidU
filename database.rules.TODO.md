# Database Rules Migration TODO

These rules are shared by production and development. Do not remove legacy paths
until the Solid/p2p call-flow branch has been merged, deployed, and production
clients are no longer running the `main` branch call code.

## After the new call-flow is deployed

- Restore the scoped `rooms/{roomId}` access rules that were temporarily rolled
  back for production legacy call compatibility:

  ```json
  "rooms": {
    "$roomId": {
      ".read": "auth != null && data.child('participants').child(auth.uid).exists()",
      ".write": "auth != null && !newData.exists() && data.child('meta').child('createdBy').val() === auth.uid",
      "meta": {
        ".write": "auth != null && !data.exists() && newData.hasChildren(['createdBy', 'createdAt', 'expiresAt']) && newData.child('createdBy').val() === auth.uid && newData.child('createdAt').isNumber() && newData.child('expiresAt').isNumber()"
      },
      "participants": {
        "$uid": {
          ".write": "auth != null && root.child('rooms').child($roomId).child('meta').child('createdBy').val() === auth.uid && newData.val() === true"
        }
      },
      "p2pSignaling": {
        ".write": "auth != null && root.child('rooms').child($roomId).child('participants').child(auth.uid).exists()"
      },
      "watch": {
        ".write": "auth != null && root.child('rooms').child($roomId).child('participants').child(auth.uid).exists()"
      },
      "mediaSyncSignaling": {
        ".write": "auth != null && root.child('rooms').child($roomId).child('participants').child(auth.uid).exists()"
      }
    }
  }
  ```
- Review whether `users/{userId}/recentCalls` is still used. It is required by
  the current production `main` branch call listeners, so it must stay until the
  legacy call module is fully retired in production.
- Review whether `users/{userId}/outgoingCall` is still used. It belongs to the
  legacy outgoing-call UI state and may be removable after the new call-flow owns
  all outgoing call state.
- Review whether `users/{userId}/calls/*` can replace any legacy call lifecycle
  paths, and tighten validation for:
  - `calls/incoming`: require the invite writer to match `callerId`, validate
    required fields, and define whether only contacts may create call invites.
  - `calls/response`: require response payloads to match the expected room and
    sender, and define who can clear the response.
- Once all active clients are migrated, remove obsolete call rules and matching
  storage helpers in the same release.
