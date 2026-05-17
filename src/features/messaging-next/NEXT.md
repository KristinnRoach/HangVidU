# Suggested Next Slice

Recommended next slice: wire the conversation repository into runtime draft
state for direct conversations.

Deliverables:

- Create a small runtime composition point that owns both `MessageRepository`
  and `ConversationRepository`.
- On conversation open, load the conversation node and hydrate `state.draft`
  from `conversation.draft`.
- On draft input, persist the draft to the conversation node with a tiny debounce.
- Preserve the current direct conversation behavior and keep RTDB message
  compatibility unchanged.
- Update `messaging-core-design.html`, `DECISIONS.md`, and `QUESTIONS.md` if the
  public API changes.

Why this next:

- The `ConversationRepository` boundary now exists with an in-memory adapter and
  tests.
- Drafts are the smallest user-visible behavior that validates the boundary
  without taking on group membership or private-mode signaling.
- This keeps message persistence unchanged while proving conversation-node state
  can be loaded and updated independently.
