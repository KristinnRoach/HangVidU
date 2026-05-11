# Database Rules Migration TODO

These rules are shared by production and development. Do not remove legacy paths
until the Solid/p2p call-flow branch has been merged, deployed, and production
clients are no longer running the `main` branch call code.

## After the new call-flow is deployed

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
