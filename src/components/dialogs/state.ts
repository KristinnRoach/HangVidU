import { createSignal } from 'solid-js';
import type {
  CallInvite,
  CallResponse,
} from '../../shared/storage/user/call-schema';

const [outgoingCall, setOutgoingCall] = createSignal<{
  contactId: string;
  roomId: string;
} | null>(null);
const [incomingCall, setIncomingCall] = createSignal<CallInvite | null>(null);
export { outgoingCall, incomingCall, setOutgoingCall, setIncomingCall };
