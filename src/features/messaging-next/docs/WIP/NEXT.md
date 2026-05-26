# Suggested Next Slice

Recommended next slice: route `evt:call:session:unanswered` into
`messaging-next` when the feature flag is enabled.

Deliverables:

- Add a minimal event-message action path for the existing
  `evt:call:session:unanswered` payload.
- Keep the current `MessageEnvelope` event payload shape unchanged.
- When `__msgnext` is enabled, avoid routing this event through the legacy
  messaging controller.
- Render the event as a simple timeline/system row in `<ConversationPanel>`.
- Update `messaging-core-design.html`, `DECISIONS.md`, and `QUESTIONS.md` if the
  public API changes.

- When ready for me to manually test behaviour:
  - Update HANDOFF.md if needed
  - Commit
  - Suggest the next most valuable slice

Why this next:

- The event payload is already in the schema, but the runtime still writes it
  through the legacy messaging controller.
- This is a small visible behavior gap in the feature-flagged panel.
- It keeps scope narrower than unread-count propagation, group chat, or private
  mode.
