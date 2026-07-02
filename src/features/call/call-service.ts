import { subscribeToUserMailbox } from '../../realtime/user-mailbox';
import type { MailboxEnvelope } from '../../../shared/user-mailbox/protocol';
import type { CallInvite, CallResponse } from './model/call-schema';
import { CALLING_TTL_MS } from '../../../shared/constants';
import { reportApiAuthFailure } from '../../infra/api-auth-failure.js';

export type IncomingCallEvent =
  | { type: 'invite'; invite: CallInvite }
  | { type: 'cancel'; roomId: string; by: string }
  | { type: 'handled'; roomId: string; by: string };

interface CallServiceOptions {
  localUID: string;
  /** Consolidated HangVidU API base URL. */
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
  readonly localUID: string;
  private readonly baseUrl: string;
  private readonly getToken: () => Promise<string | null>;
  private readonly unsubscribers = new Set<() => void>();

  constructor({ localUID, baseUrl, getToken }: CallServiceOptions) {
    if (!localUID || !baseUrl || !getToken) {
      throw new TypeError(
        '[CallService] init(): localUID, baseUrl and getToken required',
      );
    }
    this.localUID = localUID;
    this.baseUrl = baseUrl.replace(/\/+$/, '');
    this.getToken = getToken;
  }

  private subscribe(handler: (e: MailboxEnvelope) => void): () => void {
    const unsubscribe = subscribeToUserMailbox(
      {
        localUID: this.localUID,
        baseUrl: this.baseUrl,
        getToken: this.getToken,
      },
      handler,
    );
    this.unsubscribers.add(unsubscribe);
    return () => {
      unsubscribe();
      this.unsubscribers.delete(unsubscribe);
    };
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
      if (res.status === 401) {
        const detail = await res.text().catch(() => '');
        reportApiAuthFailure(`call ${path}`, res.status, detail);
        throw new Error(
          `[CallService] ${path} failed: ${res.status} ${detail}`,
        );
      }
      throw new Error(`[CallService] ${path} failed: ${res.status}`);
    }
  }

  /** Incoming invites and dismiss events for this user. */
  onIncomingCall(callback: (event: IncomingCallEvent) => void): () => void {
    return this.subscribe((envelope) => {
      if (envelope.t === 'invite') {
        if (!notExpired(envelope.invite.expiresAt)) return;
        callback({ type: 'invite', invite: envelope.invite as CallInvite });
      } else if (envelope.t === 'cancel' || envelope.t === 'handled') {
        callback({
          type: envelope.t,
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

  /** Responses addressed to this user (the caller); filters expired/stale. */
  onCalleeResponse(
    callback: (response: CallResponse | null) => void,
  ): () => void {
    return this.subscribe((envelope) => {
      if (envelope.t !== 'response') return;
      if (!notExpired(envelope.response.expiresAt)) return;
      callback(envelope.response as CallResponse);
    });
  }

  ackCallResponse(roomId: string): Promise<void> {
    return this.post('/calls/response/ack', { conversationId: roomId });
  }

  cleanup(): void {
    for (const unsubscribe of this.unsubscribers) unsubscribe();
    this.unsubscribers.clear();
  }
}
