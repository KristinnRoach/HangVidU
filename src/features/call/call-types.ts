import type { CallInvite } from './model/call-schema.js';

export type OutgoingCall = {
  calleeId: string;
  calleeName: string;
  callerId: string;
  callerName: string;
  audioOnly: boolean;
  roomId: string;
};

export type CallHandshakeState =
  | null
  | {
      direction: 'incoming';
      call: CallInvite;
    }
  | {
      direction: 'outgoing';
      call: OutgoingCall;
    };

export type OutgoingCallOutcome = 'busy' | 'rejected' | 'timeout' | null;
