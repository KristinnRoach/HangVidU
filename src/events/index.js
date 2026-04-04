import { appBus } from './app-bus';

/**
 * Send a command to the responsible handler
 *
 * @param {string} commandName - Command name
 * @param {Object} [payload={}] - Command data
 */
const dispatchCommand = (commandName, payload = {}) => {
  appBus.emit(commandName, payload);
};

/**
 * Register the handler for a command
 *
 * @param {string} commandName - Command name
 * @param {Function} handler - (payload) => void
 */
const handleCommand = (commandName, handler) => {
  appBus.on(commandName, handler);
};

/**
 * Publish/broadcast/announce an event that already happened,
 * for anyone who cares to listen to that 'eventName'
 *
 * @param {string} eventName - Message name, e.g. "draftSaved".
 * @param {Object} [payload={}] - Message data.
 */
const publish = (eventName, payload = {}) => {
  appBus.emit(eventName, payload);
};

/**
 * Get notified when an event with 'eventName' is published (by anyone)
 *
 * @param {string} eventName - Message name to listen to.
 * @param {Function} handler - (payload) => void.
 */
const subscribe = (eventName, handler) => {
  appBus.on(eventName, handler);
};

export { dispatchCommand, handleCommand, publish, subscribe };
