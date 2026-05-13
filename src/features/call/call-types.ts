import type { CallInvite } from './model/call-schema.js';

export type OutgoingCall = {
  calleeId: string;
  calleeName: string;
  callerId: string;
  callerName: string;
  audioOnly: boolean;
  roomId: string;
};

export type CallingState =
  | false
  | {
      direction: 'incoming';
      call: CallInvite;
    }
  | {
      direction: 'outgoing';
      call: OutgoingCall;
    };

export type OutgoingCallResult = 'busy' | 'rejected' | 'timeout' | null;
