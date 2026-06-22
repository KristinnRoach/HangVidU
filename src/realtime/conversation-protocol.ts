/**
 * Client-facing re-export of the conversation-channel wire protocol. The
 * canonical definition lives in `shared/conversation-channel/protocol.ts`
 * (shared with the data worker); client code imports it from here so the
 * cross-boundary path stays in one spot.
 */
export type {
  WireAttachment,
  WireMessage,
  WireReactionCount,
  WireReactionSummary,
  ConversationServerEvent,
} from '../../shared/conversation-channel/protocol';
export { isConversationServerEvent } from '../../shared/conversation-channel/protocol';
