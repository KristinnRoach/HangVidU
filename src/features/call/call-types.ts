import type { CallInvite } from './model/call-schema.js';

export type pendingOutgoingCall = {
  calleeId: string;
  calleeName: string;
  callerId: string;
  callerName: string;
  audioOnly: boolean;
  roomId: string;
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
      call: CallInvite;
    }
  | {
      direction: 'outgoing';
      call: pendingOutgoingCall;
    };
