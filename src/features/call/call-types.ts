import type { MailboxInvite } from '../../../shared/user-mailbox/protocol';

export type PendingOutgoingCall = {
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

export type CallHandshakeState =
  | null
  | {
      direction: 'incoming';
      call: MailboxInvite;
    }
  | {
      direction: 'outgoing';
      call: PendingOutgoingCall;
    };
