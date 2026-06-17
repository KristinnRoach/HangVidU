import {
  createMailboxChannel,
  type MailboxChannel,
} from '../../realtime/mailbox-channel';
import type { CallInvite, CallResponse } from './model/call-schema';
import { CALLING_TTL_MS } from '../../../shared/constants';

export type IncomingCallEvent =
  | { type: 'invite'; invite: CallInvite }
  | { type: 'cancel'; roomId: string; by: string };

interface CallServiceOptions {
  localUID: string;
  /** Data worker base URL (VITE_DATA_URL). */
  baseUrl: string;
  /** Fresh Firebase ID token provider, or null when logged out. */
  getToken: () => Promise<string | null>;
}

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

function notExpired(expiresAt: number | undefined): boolean {
  return expiresAt == null || expiresAt > Date.now();
}

/**
 * Call-invite transport over the per-user DO mailbox in the data worker.
 * Receiving (invites + responses) rides one WebSocket to the user's own mailbox;
 * sending (invite/response/cancel) is REST with the worker enforcing D1
 * membership. roomId is the opaque conversationId. Replaces the former RTDB
 * `users/{uid}/calls/*` mailbox; the dead room-access write went with it.
 */
export class CallService {
  private channel: MailboxChannel;
  readonly localUID: string;
  private readonly baseUrl: string;
  private readonly getToken: () => Promise<string | null>;

  constructor({ localUID, baseUrl, getToken }: CallServiceOptions) {
    if (!localUID || !baseUrl || !getToken) {
      throw new TypeError(
        '[CallService] init(): localUID, baseUrl and getToken required',
      );
    }
    this.localUID = localUID;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.getToken = getToken;
    this.channel = createMailboxChannel({ baseUrl: this.baseUrl, getToken });
  }

  private async post(path: string, body: unknown): Promise<void> {
    const token = await this.getToken();
    if (!token) throw new Error('[CallService] not authenticated');
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`[CallService] ${path} failed: ${res.status}`);
    }
  }

  /** Incoming invites and cancel events for this user. */
  onIncomingCall(callback: (event: IncomingCallEvent) => void): () => void {
    return this.channel.onEnvelope((envelope) => {
      if (envelope.t === 'invite') {
        if (!notExpired(envelope.invite.expiresAt)) return;
        callback({ type: 'invite', invite: envelope.invite as CallInvite });
      } else if (envelope.t === 'cancel') {
        callback({
          type: 'cancel',
          roomId: envelope.roomId,
          by: envelope.by,
        });
      }
    });
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
    await this.post('/calls/invite', {
      conversationId: roomId,
      calleeId,
      callerName,
      audioOnly,
      expiresAt: Date.now() + CALLING_TTL_MS,
    });
  }

  async respondToIncomingCallInvite({
    roomId,
    callerId,
    responseType,
  }: {
    roomId: string;
    callerId: string;
    responseType: CallResponse['responseType'];
  }): Promise<void> {
    await this.post('/calls/response', {
      conversationId: roomId,
      callerId,
      responseType,
      expiresAt: Date.now() + CALLING_TTL_MS,
    });
  }

  cancelOutgoingCall({
    recipientUID,
    roomId,
  }: {
    recipientUID: string;
    roomId: string;
  }): Promise<void> {
    return this.post('/calls/cancel', {
      conversationId: roomId,
      calleeId: recipientUID,
    });
  }

  timeoutOutgoingCall(args: {
    recipientUID: string;
    roomId: string;
  }): Promise<void> {
    return this.cancelOutgoingCall(args);
  }

  /** Responses addressed to this user (the caller); filters expired/stale. */
  onCalleeResponse(
    _calleeId: string,
    callback: (response: CallResponse | null) => void,
  ): () => void {
    return this.channel.onEnvelope((envelope) => {
      if (envelope.t !== 'response') return;
      if (!notExpired(envelope.response.expiresAt)) return;
      callback(envelope.response as CallResponse);
    });
  }

  /** No stored invite to clear in the mailbox model; cancel is explicit. */
  clearIncomingCallInvite(): Promise<void> {
    return Promise.resolve();
  }

  cleanup(): void {
    this.channel.close();
  }
}
