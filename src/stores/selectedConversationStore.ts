import { createSignal } from 'solid-js';
import type { ConversationSelection } from '../features/messaging-next/interfaces.js';

const [selection, setSelection] = createSignal<ConversationSelection | null>(
  null,
);

export { selection };

export function open(next: ConversationSelection): void {
  setSelection(next);
}

export function clear(): void {
  setSelection(null);
}
