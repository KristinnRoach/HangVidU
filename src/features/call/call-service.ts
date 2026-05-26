import type { Database } from 'firebase/database';
import {
  createCallRepository,
  type CallRepository,
} from './model/call-repository';
import { createCallRTDBAdapter } from './model/call-rtdb-adapter';
import {
  createRoomAccessRTDBAdapter,
  type RoomAccessRTDBAdapter,
} from './model/room-access-rtdb-adapter';
import type { CallInvite, CallResponse } from './model/call-schema';

interface CallServiceOptions {
  localUID: string;
  rtdb: Database;
}

const CALL_SIGNAL_TTL_MS = 60_000;

let callServiceInstance: CallService | null = null;

export function initCallService(options: CallServiceOptions): CallService {
  if (
    !callServiceInstance ||
    callServiceInstance.localUID !== options.localUID
  ) {
    callServiceInstance?.cleanup();
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
  private roomAccess: RoomAccessRTDBAdapter;
  readonly localUID: string;

  constructor({ localUID, rtdb }: CallServiceOptions) {
    if (!localUID || !rtdb) {
      throw new TypeError('[CallService] init(): localUID and rtdb required');
    }
    this.callRepo = createCallRepository(
      createCallRTDBAdapter({ database: rtdb }),
    );
    this.roomAccess = createRoomAccessRTDBAdapter({ database: rtdb });
    this.localUID = localUID;
  }

  onIncomingCall(callback: (call: CallInvite | null) => void): () => void {
    return this.callRepo.onInviteReceived(this.localUID, callback);
  }

  async sendOutgoingCallInvite({
    roomId,
    calleeId,
    callerName,
    audioOnly,
  }: {
    roomId: string;
    calleeId: string;
    callerName: string;
    audioOnly: boolean;
  }): Promise<void> {
    const startedAt = Date.now();
    await this.roomAccess.createRoomAccess({
      roomId,
      createdBy: this.localUID,
      participants: [calleeId],
      createdAt: startedAt,
    });
    try {
      await this.callRepo.sendInvite(calleeId, {
        roomId,
        callerId: this.localUID,
        calleeId,
        callerName,
        audioOnly,
        startedAt,
        expiresAt: startedAt + CALL_SIGNAL_TTL_MS,
      });
    } catch (err) {
      // Rollback orphaned room access; best-effort, TTL covers leftover state.
      this.roomAccess.clearRoomAccess(roomId).catch((cleanupErr) =>
        console.warn(
          '[CallService] Failed to rollback room access after invite failure:',
          cleanupErr,
        ),
      );
      throw err;
    }
  }

  async respondToIncomingCallInvite({
    roomId,
    responseType,
  }: {
    roomId: string;
    responseType: CallResponse['responseType'];
  }): Promise<void> {
    await this.callRepo.respondToInvite({
      roomId,
      by: this.localUID,
      responseType,
    });
    // Invite-clear is best-effort cleanup; the response is what unblocks the caller.
    this.callRepo.clearInvite(this.localUID).catch((err) =>
      console.warn(
        '[CallService] Failed to clear invite after responding:',
        err,
      ),
    );
  }

  cancelOutgoingCall({ recipientUID }: { recipientUID: string }): Promise<void> {
    return this.callRepo.clearInvite(recipientUID);
  }

  timeoutOutgoingCall({
    recipientUID,
  }: {
    recipientUID: string;
  }): Promise<void> {
    return this.callRepo.clearInvite(recipientUID);
  }

  onCalleeResponse(
    calleeId: string,
    callback: (response: CallResponse | null) => void,
  ): () => void {
    return this.callRepo.onResponseReceived(calleeId, callback);
  }

  clearIncomingCallInvite(): Promise<void> {
    return this.callRepo.clearInvite(this.localUID);
  }

  cleanup(): void {}
}
