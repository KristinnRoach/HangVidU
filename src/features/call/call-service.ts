import type { Database } from 'firebase/database';
import {
  createCallRepository,
  type CallRepository,
} from './model/call-repository';
import { createCallRTDBAdapter } from './model/call-rtdb-adapter';
import type { CallInvite, CallResponse } from './model/call-schema';

interface CallServiceOptions {
  localUID: string;
  rtdb: Database;
}

let callServiceInstance: CallService | null = null;

export function initCallService(options: CallServiceOptions): CallService {
  if (!callServiceInstance) {
    callServiceInstance = new CallService(options);
  }
  return callServiceInstance;
}

export function getCallService(): CallService | null {
  return callServiceInstance;
}

export function cleanupCallService(): void {
  if (callServiceInstance) {
    callServiceInstance.cleanup();
    callServiceInstance = null;
  }
}

export class CallService {
  private callRepo: CallRepository;
  private localUID: string;

  constructor({ localUID, rtdb }: CallServiceOptions) {
    if (!localUID || !rtdb) {
      throw new TypeError('[CallService] init(): localUID and rtdb required');
    }
    this.callRepo = createCallRepository(
      createCallRTDBAdapter({ database: rtdb }),
    );
    this.localUID = localUID;
  }

  onIncomingCall(callback: (call: CallInvite | null) => void): () => void {
    return this.callRepo.onInviteReceived(this.localUID, callback);
  }

  sendOutgoingCallInvite({
    roomId,
    calleeId,
    callerName,
    audioOnly,
  }: {
    roomId: string;
    calleeId: string;
    callerName: string;
    audioOnly: boolean;
  }) {
    return this.callRepo.sendInvite(calleeId, {
      roomId,
      callerId: this.localUID,
      callerName,
      audioOnly,
      startedAt: Date.now(),
    });
  }

  acceptIncomingCall({
    fromUID,
    roomId,
  }: {
    fromUID: string;
    roomId: string;
  }): Promise<unknown[]> {
    return Promise.all([
      this.callRepo.clearInvite(this.localUID),
      this.callRepo.acceptInvite(fromUID, { roomId, by: this.localUID }),
    ]);
  }

  rejectIncomingCall({
    fromUID,
    roomId,
  }: {
    fromUID: string;
    roomId: string;
  }): Promise<unknown[]> {
    return Promise.all([
      this.callRepo.clearInvite(this.localUID),
      this.callRepo.rejectInvite(fromUID, { roomId, by: this.localUID }),
    ]);
  }

  cancelOutgoingCall({
    recipientUID,
    roomId,
  }: {
    recipientUID: string;
    roomId: string;
  }): Promise<unknown[]> {
    return Promise.all([
      this.callRepo.cancelInvite(recipientUID, { roomId, by: this.localUID }),
    ]);
  }

  timeoutOutgoingCall({
    recipientUID,
    roomId,
  }: {
    recipientUID: string;
    roomId: string;
  }): Promise<unknown[]> {
    return Promise.all([
      this.callRepo.timeoutInvite(recipientUID, { roomId, by: this.localUID }),
    ]);
  }

  onCallSignal(callback: (response: CallResponse | null) => void): () => void {
    return this.callRepo.onResponseReceived(this.localUID, callback);
  }

  clearCallSignal(): Promise<void> {
    return this.callRepo.clearResponse(this.localUID);
  }

  clearIncomingCallInvite(): Promise<void> {
    return this.callRepo.clearInvite(this.localUID);
  }

  cleanup(): void {}
}
