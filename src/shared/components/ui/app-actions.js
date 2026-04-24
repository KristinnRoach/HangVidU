const actionHandlers = new Map();

/**
 * Register a UI action handler invoked by Solid controls.
 *
 * @param {string} actionName
 * @param {(event?: Event) => unknown} handler
 * @returns {() => void}
 */
export function setAppUiAction(actionName, handler) {
  if (typeof handler !== 'function') {
    actionHandlers.delete(actionName);
    return () => {};
  }

  actionHandlers.set(actionName, handler);
  return () => {
    if (actionHandlers.get(actionName) === handler) {
      actionHandlers.delete(actionName);
    }
  };
}

/**
 * Run a registered UI action.
 *
 * @param {string} actionName
 * @param {Event} [event]
 * @returns {Promise<void>}
 */
export async function runAppUiAction(actionName, event) {
  const handler = actionHandlers.get(actionName);
  if (!handler) return;

  await handler(event);
}

