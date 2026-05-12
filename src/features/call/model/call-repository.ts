import {
  CallResponseType,
  type CallInvite,
  type CallResponse,
} from './call-schema';

const CALL_RESPONSE_TTL_MS = 60_000;

interface ICallAdapter {
  sendInvite(userId: string, call: CallInvite): Promise<void>;
  clearInvite(userId: string): Promise<void>;
  onInviteReceived(
    userId: string,
    callback: (call: CallInvite | null) => void,
  ): () => void;
  sendResponse(userId: string, response: CallResponse): Promise<void>;
  clearResponse(userId: string): Promise<void>;
  onResponseReceived(
    userId: string,
    callback: (response: CallResponse | null) => void,
  ): () => void;
}

function assertAdapter(adapter: unknown): ICallAdapter {
  if (!adapter || typeof adapter !== 'object') {
    throw new TypeError('call storage adapter is required');
  }

  const requiredMethods: (keyof ICallAdapter)[] = [
    'onInviteReceived',
    'sendInvite',
    'clearInvite',
    'sendResponse',
    'clearResponse',
    'onResponseReceived',
  ];
  for (const methodName of requiredMethods) {
    if (
      typeof (adapter as Record<string, unknown>)[methodName] !== 'function'
    ) {
      throw new TypeError(
        `call storage adapter must implement ${methodName}()`,
      );
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
      throw error;
    }
  }

  async clearInvite(userId: string): Promise<void> {
    if (!userId) return;
    try {
      await this.adapter.clearInvite(userId);
    } catch (error) {
      console.error('Failed to clear incoming call:', error);
      throw error;
    }
  }

  onInviteReceived(
    userId: string,
    callback: (call: CallInvite | null) => void,
  ): () => void {
    if (!userId) return () => {};
    return this.adapter.onInviteReceived(userId, callback);
  }

  async acceptInvite({
    roomId,
    by,
  }: {
    roomId: string;
    by: string;
  }): Promise<void> {
    if (!roomId || !by) return;
    const respondedAt = Date.now();
    try {
      await this.adapter.sendResponse(by, {
        roomId,
        responseType: CallResponseType.ACCEPTED,
        by,
        respondedAt,
        expiresAt: respondedAt + CALL_RESPONSE_TTL_MS,
      });
    } catch (error) {
      console.error('Failed to send accept response:', error);
      throw error;
    }
  }

  async rejectInvite({
    roomId,
    by,
  }: {
    roomId: string;
    by: string;
  }): Promise<void> {
    if (!roomId || !by) return;
    const respondedAt = Date.now();
    try {
      await this.adapter.sendResponse(by, {
        roomId,
        responseType: CallResponseType.REJECTED,
        by,
        respondedAt,
        expiresAt: respondedAt + CALL_RESPONSE_TTL_MS,
      });
    } catch (error) {
      console.error('Failed to send reject response:', error);
      throw error;
    }
  }

  onResponseReceived(
    userId: string,
    callback: (response: CallResponse | null) => void,
  ): () => void {
    if (!userId) return () => {};
    return this.adapter.onResponseReceived(userId, callback);
  }

  async clearResponse(userId: string): Promise<void> {
    if (!userId) return;
    try {
      await this.adapter.clearResponse(userId);
    } catch (error) {
      console.error('Failed to clear call response:', error);
      throw error;
    }
  }
}

export function createCallRepository(adapter: unknown): CallRepository {
  return new CallRepository(adapter);
}
