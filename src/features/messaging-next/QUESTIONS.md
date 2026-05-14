# Messaging Next Questions

- Clarify the minimal needed dependencies and decide whether this module should
  be reusable outside HangVidU. That would be great, but should not have to make
  the code too convoluted or add more than minimal noise.
- Decide whether private messaging room invites should reuse call invite
  infrastructure or get a separate lightweight conversation-session invite
  model.
- Decide the lifetime of private-message ephemeral history.
- Decide how private read/delivery acknowledgements should work, if at all.
- Decide the file-message contract before adding `file` or `attachment` payloads.
- Confirm whether P2PRoom supports data-channel-only rooms with member capacity
  greater than two before designing group private mode around it.
