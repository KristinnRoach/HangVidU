# invitations.js — pending repository extraction

`invitations.js` writes to RTDB directly (`set(ref(rtdb, ...))`, `remove(...)`, `onChildAdded(...)`) instead of going through a repository. Per the flat-shape rule ("stores are the only layer allowed to talk to repositories, repositories are the only layer that talks to the DB"), this file currently violates the boundary.

Defer:
- Extract an `invite-repository` (or extend `contact-repository`) covering the `users/{uid}/incomingInvites/{fromUid}` and `users/{uid}/acceptedInvites/{fromUid}` paths.
- Replace direct `firebase/database` calls in this file with repo calls.
- `listenForInvites` / `listenForAcceptedInvites` need a repo-level `onChildAdded` equivalent or stay as a thin listener that resolves through the repo.

Leave for a follow-up pass.
