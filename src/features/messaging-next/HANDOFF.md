# Messaging Next Handoff

This folder is the TS-first replacement path for the legacy messaging core. The
legacy messaging implementation is still live; this module is not wired into
runtime yet.

Current scope:

- `schema.ts` defines direct and group conversation IDs, conversation nodes,
  conversation drafts, delivery policy, and first-pass message envelopes.
- `types.ts` exports Zod-inferred TypeScript types.
- `schema.test.js` covers the agreed schema rules.
- `messaging-core-design.html` is the editable design artifact for core rules.

Important context:

- Direct conversation IDs use `dm:{sortedUserA}:{sortedUserB}`.
- Group conversation IDs use `grp:{generatedId}`.
- Drafts live on conversation nodes, not in the sent message stream.
- Every message envelope carries `conversationId` and `delivery`.
- First-pass payloads are `text`, `event`, and `system`; file payloads are not
  part of the contract yet.
- `evt:call:session:unanswered` represents an unanswered or missed call timeline
  event and may include `details.callId`.

Before committing changes in this folder, check whether
`messaging-core-design.html` needs to be updated to stay accurate.

Related docs:

- [NEXT.md](./NEXT.md) - suggested next slice.
- [QUESTIONS.md](./QUESTIONS.md) - unanswered design questions.
- [DECISIONS.md](./DECISIONS.md) - stable decisions and target public API.
