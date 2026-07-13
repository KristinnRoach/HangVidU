// src/realtime/index.ts — barrel for the realtime layer (ephemeral coordination).
//
// Sibling of src/storage/ (persistence). Houses the Durable Object transport,
// the shared wire protocol, and the P2PRoomSignaling backend adapters. Cross-
// module consumers import from here, not from subpaths.

export { createRoomSignaling } from './signaling/index.js';
export { createConversationChannel } from './conversation-channel.js';
export { closeUserMailbox, subscribeToUserMailbox } from './user-mailbox.js';
export {
  isConversationServerEvent,
  type ConversationServerEvent,
  type WireMessage,
} from './conversation-protocol.js';

export type {
  PeerId,
  RelayChannel,
  ClientMessage,
  ServerMessage,
} from './protocol';
