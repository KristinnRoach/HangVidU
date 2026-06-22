import { onTapGesture } from './onTapGesture.js';
import { REACTION_CONFIG } from './ReactionConfig.js';
import { ReactionManager } from './ReactionManager.js';
import { ReactionUI } from './ReactionUI.js';

const manager = new ReactionManager();
const ui = new ReactionUI(manager);
const cleanups = new WeakMap();

export function attachReactions(element, messageId, userId, onChange) {
  if (!userId) return () => {};
  if (manager.hasReactions(messageId)) {
    ui.renderReactions(element, messageId, manager.getReactions(messageId));
  }

  const changeReaction = (reactionType, source) => {
    const current = manager.getUserReactionType(messageId, userId);

    if (current === reactionType || (source === 'doubleTap' && current)) {
      ui.renderReactions(
        element,
        messageId,
        manager.removeReaction(messageId, current, userId),
      );
      onChange?.({ messageId, userId, reactionKey: null });
      return;
    }

    if (current) {
      manager.removeReaction(messageId, current, userId);
    }
    ui.renderReactions(
      element,
      messageId,
      manager.addReaction(messageId, reactionType, userId),
    );
    onChange?.({ messageId, userId, reactionKey: reactionType });
    if (REACTION_CONFIG.enableAnimations) {
      ui.showReactionAnimation(element, reactionType);
    }
  };

  cleanups.get(element)?.();
  const gesture = onTapGesture(
    element,
    {
      onDoubleTap: () =>
        changeReaction(REACTION_CONFIG.defaultReaction, 'doubleTap'),
      onLongPress: () =>
        ui.showPicker(element, messageId, (reactionType) =>
          changeReaction(reactionType, 'picker'),
        ),
    },
    REACTION_CONFIG,
  );
  const cleanup = () => {
    gesture.destroy();
    if (ui.activePickerMessageElement === element) ui.hidePicker();
    if (cleanups.get(element) === cleanup) cleanups.delete(element);
  };
  cleanups.set(element, cleanup);
  return cleanup;
}

export function syncReactionSummaries(
  element,
  messageId,
  userId,
  summaries,
) {
  manager.syncFromSummaries(messageId, summaries, userId);
  ui.renderReactions(element, messageId, manager.getReactions(messageId));
}
