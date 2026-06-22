import { onTapGesture } from './onTapGesture.js';
import { DEFAULT_CONFIG } from './ReactionConfig.js';
import { ReactionManager } from './ReactionManager.js';
import { ReactionUI } from './ReactionUI.js';

/**
 * Create an independent reactions controller with its own state and config.
 * Use this when a host needs more than one emoji set or gesture config in
 * the same process (e.g. two chat panels, or isolated tests).
 * @param {Object} [config] - Overrides merged with DEFAULT_CONFIG
 */
export function createReactions(config = DEFAULT_CONFIG) {
  const manager = new ReactionManager(config);
  const ui = new ReactionUI(manager, config);
  const cleanups = new WeakMap();

  function attachReactions(element, messageId, userId, onChange) {
    cleanups.get(element)?.();
    if (!userId) return () => {};
    if (manager.hasReactions(messageId)) {
      ui.renderReactions(element, messageId, manager.getReactions(messageId));
    }

    const changeReaction = (reactionType, source) => {
      const current = manager.getUserReactionType(messageId);

      if (current === reactionType || (source === 'doubleTap' && current)) {
        ui.renderReactions(element, messageId, manager.removeReaction(messageId));
        onChange?.({ messageId, userId, reactionKey: null });
        return;
      }

      ui.renderReactions(
        element,
        messageId,
        manager.addReaction(messageId, reactionType),
      );
      onChange?.({ messageId, userId, reactionKey: reactionType });
      if (config.enableAnimations) {
        ui.showReactionAnimation(element, reactionType);
      }
    };

    const gesture = onTapGesture(
      element,
      {
        onDoubleTap: () => changeReaction(config.defaultReaction, 'doubleTap'),
        onLongPress: () =>
          ui.showPicker(element, messageId, (reactionType) =>
            changeReaction(reactionType, 'picker'),
          ),
      },
      config,
    );
    const cleanup = () => {
      gesture.destroy();
      if (ui.activePickerMessageElement === element) ui.hidePicker();
      if (cleanups.get(element) === cleanup) cleanups.delete(element);
    };
    cleanups.set(element, cleanup);
    return cleanup;
  }

  function syncReactionSummaries(element, messageId, summaries) {
    manager.syncFromSummaries(messageId, summaries);
    ui.renderReactions(element, messageId, manager.getReactions(messageId));
  }

  return { attachReactions, syncReactionSummaries };
}

const defaultReactions = createReactions();
export const attachReactions = defaultReactions.attachReactions;
export const syncReactionSummaries = defaultReactions.syncReactionSummaries;
