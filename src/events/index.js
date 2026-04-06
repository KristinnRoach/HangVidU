import { appBus } from './app-bus.js';

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
 * Send a command and wait for the handler to complete.
 * Use when the caller must know the command finished before proceeding.
 *
 * @param {string} commandName - Command name
 * @param {Object} [payload={}] - Command data
 * @returns {Promise<void>}
 */
const dispatchCommandAndAwait = async (commandName, payload = {}) => {
  await appBus.emitAsync(commandName, payload);
};

/**
 * Register the handler for a command
 *
 * @param {string} commandName - Command name
 * @param {Function} handler - (payload) => void
 * @param {Object} [options]
 */
const handleCommand = (commandName, handler, options = {}) => {
  return appBus.on(commandName, handler, options);
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
 * Publish/broadcast/announce an event that already happened,
 * and wait for current subscribers to finish.
 *
 * @param {string} eventName - Message name, e.g. "draftSaved".
 * @param {Object} [payload={}] - Message data.
 * @returns {Promise<void>}
 */
const publishAndAwait = async (eventName, payload = {}) => {
  await appBus.emitAsync(eventName, payload);
};

/**
 * Get notified when an event with 'eventName' is published (by anyone)
 *
 * @param {string} eventName - Message name to listen to.
 * @param {Function} handler - (payload) => void.
 * @param {Object} [options]
 */
const subscribe = (eventName, handler, options = {}) => {
  return appBus.on(eventName, handler, options);
};

export {
  dispatchCommand,
  dispatchCommandAndAwait,
  handleCommand,
  publish,
  publishAndAwait,
  subscribe,
};
