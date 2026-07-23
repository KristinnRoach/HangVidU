import type { MailboxInvite } from '../../../shared/user-mailbox/protocol';

export type OutgoingCall = {
  calleeId: string;
  calleeName: string;
  callerId: string;
  callerName: string;
  audioOnly: boolean;
  roomId: string;
  startedAt: number;
};

export type StartCallDetails = {
  calleeId: string;
  calleeName: string;
  audioOnly: boolean;
};

/**
 * In-call connection status.
 * - `connected`: normal, remote peer present (or call not yet joined).
 * - `reconnecting`: remote dropped without a `bye`; inside the grace window.
 * - `failed`: grace window elapsed; shown briefly before teardown.
 */
export type CallReconnectStatus = 'connected' | 'reconnecting' | 'failed';

export type CallHandshakeState =
  | null
  | {
      direction: 'incoming';
      call: MailboxInvite;
    }
  | {
      direction: 'outgoing';
      call: OutgoingCall;
    };
