import { EventEmitter } from '../lib/event-emitter/event-emitter.js';

/**
 * AppBus — shared cross-module EventEmitter instance.
 *
 * Subscribe: on(), once()
 * Dispatch:  emit() (fire-and-forget, logs sync throws and async rejections),
 *            emitAsync() (await all listeners, logs async errors),
 *            emitAsyncSequential() (strict order, awaits each event)
 * Cleanup:   off(), removeAllListeners()
 */
const appBus = new EventEmitter();

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
 * Send multiple commands in strict order, awaiting each handler to complete
 * before moving to the next.
 *
 * @param {Array<[string, any]>} commands - Array of [commandName, payload] tuples
 * @returns {Promise<void>}
 */
const dispatchCommandAndAwaitSequential = async (commands) => {
  await appBus.emitAsyncSequential(commands);
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
 * Publish/broadcast multiple events in strict order, awaiting all listeners
 * for each event before moving to the next.
 *
 * @param {Array<[string, any]>} events - Array of [eventName, payload] tuples
 * @returns {Promise<void>}
 */
const publishAndAwaitSequential = async (events) => {
  await appBus.emitAsyncSequential(events);
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
  // Events / Facts
  publish,
  publishAndAwait,
  publishAndAwaitSequential,
  subscribe,
  // Commands / Actions
  dispatchCommand,
  dispatchCommandAndAwait,
  dispatchCommandAndAwaitSequential,
  handleCommand,
};
