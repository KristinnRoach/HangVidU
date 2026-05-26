# PRE MIGRATION - Before deleting the old messaging/ module

## Most significant remaining gaps for replacing old messaging module:

Event/system payloads: evt:call:session:unanswered still routes through the legacy controller and does not appear in messaging-next.

Unread/read model: messaging-next has local unread state, but contacts badges are still effectively legacy-driven and read receipts/mark-read behavior are not migrated.

Reactions UI: reaction storage/subscription exists, but reactions are not rendered or interactive.

Persistence contract: RTDB adapter still translates through the legacy message row shape, not a final canonical MessageEnvelope store.

Conversation lifecycle: direct metadata exists, but creation/selection/participant metadata are not yet a complete messaging-next runtime boundary.

Message surface: only text is effectively supported in the panel; event/system/file payload rendering needs a stable extensible renderer model.

NOTE: Consider optimal way to allow file-transfers without active call via the Private/ephemeral mode. Could be deferred to post migration if needs it's own dedicated session.

# POST MIGRATION - After deleting the old messaging/ module

## New features to add after replacing legacy messaging:

Private/ephemeral mode: interfaces exist, but signaling, datachannel bridge, ephemeral history lifetime, delivery/read semantics, and UI are not implemented.

Group chat runtime: schemas allow group: IDs, but there is no group creation, member management, UI, or subscription behavior.
