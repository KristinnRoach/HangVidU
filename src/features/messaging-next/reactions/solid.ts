import { createEffect, onCleanup, type Accessor } from 'solid-js';
import { attachReactions } from './attachReactions.js';

export type ReactionChange = {
  messageId: string;
  userId: string;
  reactionType: string;
  active: boolean;
};

export type ReactionsDirectiveOptions = {
  messageId: string;
  userId: string | null;
  onChange?: (change: ReactionChange) => void;
};

export function reactions(
  element: HTMLElement,
  value: Accessor<ReactionsDirectiveOptions>,
) {
  createEffect(() => {
    const { messageId, userId } = value();
    const cleanup = attachReactions(
      element,
      messageId,
      userId,
      (change: ReactionChange) => value().onChange?.(change),
    );
    onCleanup(cleanup);
  });
}

declare module 'solid-js' {
  namespace JSX {
    interface DirectiveFunctions {
      reactions: typeof reactions;
    }
  }
}
