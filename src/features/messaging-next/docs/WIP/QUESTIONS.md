# Messaging Next Questions

- Decide how `evt:call:session:unanswered` should enter `messaging-next`; it is
  in the schema but is still written through the legacy messaging controller.
- Decide the canonical persistent storage shape for `MessageEnvelope`. The
  current RTDB adapter intentionally writes the existing legacy row shape for
  feature-flag testing.

- Confirm whether P2PRoom supports data-channel-only rooms with member capacity
  greater than two before designing group private mode around it.
- Decide whether private messaging room invites should reuse call invite
  infrastructure or get a separate lightweight conversation-session invite
  model.
- Decide the lifetime of private-message ephemeral history.
- Decide how private read/delivery acknowledgements should work, if at all.
- Decide the file-message contract before adding `file` or `attachment` payloads.
- Decide whether private data-channel messages should stay as JSON strings or
  move to a typed/binary framing later. The current envelope has protocol
  `hangvidu.messaging.v1`.
