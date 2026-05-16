# Suggested Next Slice

Recommended next slice: add the canonical conversation repository boundary.

Deliverables:

- Define a small `ConversationRepository` interface for conversation metadata:
  kind, participants, title, draft, delivery policy, created/updated timestamps.
- Add an in-memory adapter and focused tests.
- Do not wire runtime yet unless the repository shape is clear and tiny.
- Update `messaging-core-design.html`, `DECISIONS.md`, and `QUESTIONS.md` if the
  public API changes.

Why this next:

- Drafts and group membership are conversation-node state, but current runtime
  only has message storage plus local UI state.
- This keeps group-chat and draft fundamentals out of the message repository.
- It is the next real core boundary before private sessions or file messages.
