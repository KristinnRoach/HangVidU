import { onValue, ref, remove, set, type Database } from 'firebase/database';
import {
  parseCallInvite,
  parseCallResponse,
  type ActiveCall,
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

  private _activePath(userId: string): string {
    return `users/${userId}/calls/active`;
  }

  private _responsePath(userId: string): string {
    return `users/${userId}/calls/response`;
  }

  async sendInvite(userId: string, call: CallInvite): Promise<void> {
    await set(ref(this.database, this._incomingPath(userId)), {
      roomId: call.roomId,
      callerId: call.callerId,
      callerName: call.callerName || 'Unknown',
      audioOnly: call.audioOnly || false,
      startedAt: call.startedAt,
    });
  }

  async saveActive(userId: string, call: ActiveCall): Promise<void> {
    await set(ref(this.database, this._activePath(userId)), {
      roomId: call.roomId,
      with: call.with,
      startedAt: call.startedAt,
    });
  }

  onInviteReceived(
    userId: string,
    callback: (call: CallInvite | null) => void,
  ): () => void {
    return onValue(
      ref(this.database, this._incomingPath(userId)),
      (snapshot) => {
        if (!snapshot.exists()) {
          callback(null);
          return;
        }
        try {
          callback(parseCallInvite(snapshot.val()));
        } catch (error) {
          console.error('Invalid incoming call data:', error);
          callback(null);
        }
      },
    );
  }

  async clearInvite(userId: string): Promise<void> {
    await remove(ref(this.database, this._incomingPath(userId)));
  }

  async clearActive(userId: string): Promise<void> {
    await remove(ref(this.database, this._activePath(userId)));
  }

  async sendResponse(userId: string, response: CallResponse): Promise<void> {
    await set(ref(this.database, this._responsePath(userId)), {
      roomId: response.roomId,
      responseType: response.responseType,
      by: response.by,
      respondedAt: response.respondedAt,
    });
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
          callback(parseCallResponse(snapshot.val()));
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
