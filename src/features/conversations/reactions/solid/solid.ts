import { createEffect, onCleanup, type Accessor } from 'solid-js';
import { attachReactions, syncReactionSummaries } from '../attachReactions.js';

export type ReactionSummary = {
  key: string;
  count: number;
  reactedByMe: boolean;
};

export type ReactionChange = {
  messageId: string;
  userId: string;
  reactionKey: string | null;
};

export type ReactionsDirectiveOptions = {
  messageId: string;
  userId: string | null;
  reactions?: ReactionSummary[];
  onChange?: (change: ReactionChange) => void;
};

export function reactions(
  element: HTMLElement,
  value: Accessor<ReactionsDirectiveOptions>,
) {
  createEffect(() => {
    const { messageId, userId, reactions = [] } = value();
    const cleanup = attachReactions(
      element,
      messageId,
      userId,
      (change: ReactionChange) => value().onChange?.(change),
    );
    syncReactionSummaries(element, messageId, reactions);
    onCleanup(cleanup);
  });
}

declare module 'solid-js' {
  namespace JSX {
    interface DirectiveFunctions {
      // Element (not HTMLElement) to stay assignable to the DirectiveFunctions
      // index signature under strict function types.
      reactions: (
        element: Element,
        value: Accessor<ReactionsDirectiveOptions>,
      ) => void;
    }
  }
}
