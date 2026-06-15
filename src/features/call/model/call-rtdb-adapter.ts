import { onValue, ref, remove, set, type Database } from 'firebase/database';
import {
  parseCallInvite,
  parseCallResponse,
  type CallInvite,
  type CallResponse,
} from './call-schema';

export class CallRTDBAdapter {
  private database: Database;

  constructor({ database }: { database: Database }) {
    if (!database) {
      throw new TypeError('database is required');
    }
    this.database = database;
  }

  private _incomingPath(userId: string): string {
    return `users/${userId}/calls/incoming`;
  }

  private _responsePath(userId: string): string {
    return `users/${userId}/calls/response`;
  }

  async sendInvite(userId: string, call: CallInvite): Promise<void> {
    const payload: Record<string, unknown> = {
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName || 'Unknown',
      audioOnly: call.audioOnly || false,
      startedAt: call.startedAt,
    };
    if (call.calleeId) payload.calleeId = call.calleeId;
    if (call.expiresAt != null) payload.expiresAt = call.expiresAt;

    await set(ref(this.database, this._incomingPath(userId)), payload);
  }

  onInviteReceived(
    userId: string,
    callback: (call: CallInvite | null) => void,
  ): () => void {
    const incomingRef = ref(this.database, this._incomingPath(userId));
    return onValue(incomingRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      try {
        const call = parseCallInvite(snapshot.val());
        if (call.expiresAt != null && call.expiresAt <= Date.now()) {
          void remove(incomingRef).catch((removeError) => {
            console.error(
              'Failed to remove expired incoming call data:',
              removeError,
            );
          });
          callback(null);
          return;
        }
        callback(call);
      } catch {
        console.warn(
          `Removing stale incoming call data at ${this._incomingPath(userId)}`,
        );
        void remove(incomingRef).catch((removeError) => {
          console.error(
            'Failed to remove stale incoming call data:',
            removeError,
          );
        });
        callback(null);
      }
    });
  }

  async clearInvite(userId: string): Promise<void> {
    await remove(ref(this.database, this._incomingPath(userId)));
  }

  async sendResponse(userId: string, response: CallResponse): Promise<void> {
    const payload: Record<string, unknown> = {
      roomId: response.roomId,
      responseType: response.responseType,
      by: response.by,
      respondedAt: response.respondedAt,
    };
    if (response.expiresAt != null) payload.expiresAt = response.expiresAt;

    await set(ref(this.database, this._responsePath(userId)), payload);
  }

  async clearResponse(userId: string): Promise<void> {
    await remove(ref(this.database, this._responsePath(userId)));
  }

  onResponseReceived(
    userId: string,
    callback: (response: CallResponse | null) => void,
  ): () => void {
    return onValue(
      ref(this.database, this._responsePath(userId)),
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }
        try {
          const response = parseCallResponse(snapshot.val());
          // roomId is now the stable conversationId, so it no longer
          // disambiguates call attempts — a leftover response carries the same
          // roomId as a fresh call. Reject expired ones so a stale accept/busy
          // can't trigger a room join. We only read here (the caller listens to
          // the callee's node and can't clear it), so no remove().
          if (response.expiresAt != null && response.expiresAt <= Date.now()) {
            callback(null);
            return;
          }
          callback(response);
        } catch (error) {
          console.error('Invalid call response data:', error);
          callback(null);
        }
      },
    );
  }
}

export function createCallRTDBAdapter(options: {
  database: Database;
}): CallRTDBAdapter {
  return new CallRTDBAdapter(options);
}
