import { CallResponseType, type ActiveCall, type CallInvite, type CallResponse } from './call-schema';

interface ICallAdapter {
  sendInvite(userId: string, call: CallInvite): Promise<void>;
  saveActive(userId: string, call: ActiveCall): Promise<void>;
  clearInvite(userId: string): Promise<void>;
  clearActive(userId: string): Promise<void>;
  onInviteReceived(userId: string, callback: (call: CallInvite | null) => void): () => void;
  sendResponse(userId: string, response: CallResponse): Promise<void>;
  clearResponse(userId: string): Promise<void>;
  onResponseReceived(userId: string, callback: (response: CallResponse | null) => void): () => void;
}

function assertAdapter(adapter: unknown): ICallAdapter {
  if (!adapter || typeof adapter !== 'object') {
    throw new TypeError('call storage adapter is required');
  }

  const requiredMethods: (keyof ICallAdapter)[] = [
    'onInviteReceived',
    'sendInvite',
    'clearInvite',
    'saveActive',
    'clearActive',
    'sendResponse',
    'clearResponse',
    'onResponseReceived',
  ];
  for (const methodName of requiredMethods) {
    if (typeof (adapter as Record<string, unknown>)[methodName] !== 'function') {
      throw new TypeError(`call storage adapter must implement ${methodName}()`);
    }
  }

  return adapter as ICallAdapter;
}

export class CallRepository {
  private adapter: ICallAdapter;

  constructor(adapter: unknown) {
    this.adapter = assertAdapter(adapter);
  }

  async sendInvite(userId: string, call: CallInvite): Promise<void> {
    if (!userId || !call) return;
    try {
      await this.adapter.sendInvite(userId, call);
    } catch (error) {
      console.error('Failed to save incoming call:', error);
    }
  }

  async saveActive(userId: string, call: ActiveCall): Promise<void> {
    if (!userId || !call) return;
    try {
      await this.adapter.saveActive(userId, call);
    } catch (error) {
      console.error('Failed to save active call:', error);
    }
  }

  async clearInvite(userId: string): Promise<void> {
    if (!userId) return;
    try {
      await this.adapter.clearInvite(userId);
    } catch (error) {
      console.error('Failed to clear incoming call:', error);
    }
  }

  async clearActive(userId: string): Promise<void> {
    if (!userId) return;
    try {
      await this.adapter.clearActive(userId);
    } catch (error) {
      console.error('Failed to clear active call:', error);
    }
  }

  onInviteReceived(userId: string, callback: (call: CallInvite | null) => void): () => void {
    if (!userId) return () => {};
    return this.adapter.onInviteReceived(userId, callback);
  }

  async acceptInvite(callerUID: string, { roomId, by }: { roomId: string; by: string }): Promise<void> {
    if (!callerUID || !roomId || !by) return;
    try {
      await this.adapter.sendResponse(callerUID, {
        roomId,
        responseType: CallResponseType.ACCEPTED,
        by,
        respondedAt: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send accept response:', error);
    }
  }

  async rejectInvite(callerUID: string, { roomId, by }: { roomId: string; by: string }): Promise<void> {
    if (!callerUID || !roomId || !by) return;
    try {
      await this.adapter.sendResponse(callerUID, {
        roomId,
        responseType: CallResponseType.REJECTED,
        by,
        respondedAt: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send reject response:', error);
    }
  }

  async cancelInvite(recipientUID: string, { roomId, by }: { roomId: string; by: string }): Promise<void> {
    if (!recipientUID || !roomId || !by) return;
    try {
      await this.adapter.sendResponse(recipientUID, {
        roomId,
        responseType: CallResponseType.CANCELED,
        by,
        respondedAt: Date.now(),
      });
    } catch (error) {
      console.error('Failed to send cancel response:', error);
    }
  }

  onResponseReceived(userId: string, callback: (response: CallResponse | null) => void): () => void {
    if (!userId) return () => {};
    return this.adapter.onResponseReceived(userId, callback);
  }

  async clearResponse(userId: string): Promise<void> {
    if (!userId) return;
    try {
      await this.adapter.clearResponse(userId);
    } catch (error) {
      console.error('Failed to clear call response:', error);
    }
  }
}

export function createCallRepository(adapter: unknown): CallRepository {
  return new CallRepository(adapter);
}
