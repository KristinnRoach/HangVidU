/**
 * Client-facing re-export of the signaling wire protocol. The canonical
 * definition lives in `shared/signaling/protocol.ts` (shared with the worker);
 * client code imports it from here so the cross-boundary path stays in one spot.
 */
export type {
  PeerId,
  RelayChannel,
  ClientMessage,
  ServerMessage,
} from '../../shared/signaling/protocol';
