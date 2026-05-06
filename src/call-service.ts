import type { Database } from 'firebase/database';
import {
  createCallRepository,
  type CallRepository,
} from './shared/storage/user/call-repository';
import { createCallRTDBAdapter } from './shared/storage/user/call-rtdb-adapter';
import type {
  CallInvite,
  CallResponse,
} from './shared/storage/user/call-schema';

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

  sendOutgoingCallInvite({ recipientUID }: { recipientUID: string }): string {
    const roomId = crypto.randomUUID();
    this.callRepo.sendInvite(recipientUID, {
      roomId,
      from: this.localUID,
      startedAt: Date.now(),
    });
    return roomId;
  }

  acceptIncomingCall({
    fromUID,
    roomId,
  }: {
    fromUID: string;
    roomId: string;
  }): Promise<unknown[]> {
    return Promise.all([
      this.callRepo.saveActive(this.localUID, {
        roomId,
        with: fromUID,
        startedAt: Date.now(),
      }),
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
      this.callRepo.clearInvite(recipientUID),
      this.callRepo.cancelInvite(recipientUID, { roomId, by: this.localUID }),
    ]);
  }

  onOutgoingCallResponse(
    callback: (response: CallResponse | null) => void,
  ): () => void {
    return this.callRepo.onResponseReceived(this.localUID, callback);
  }

  clearOutgoingCallResponse(): Promise<void> {
    return this.callRepo.clearResponse(this.localUID);
  }

  endActiveCall(): Promise<void> {
    return this.callRepo.clearActive(this.localUID);
  }

  cleanup(): void {}
}
