import { EventEmitter } from '../../lib/event-emitter/event-emitter.js';
import { isCanonicalEventName, resolveEventName } from './naming.js';

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
const COMMAND_PREFIX = 'cmd:';
const EVENT_PREFIX = 'evt:';

// TODO(events): Isolate command listeners from event subscribers (e.g. namespaced topic or dedicated bus).

function warnIfUnexpectedPrefix(kind, rawName, canonicalName) {
  if (!isCanonicalEventName(canonicalName)) {
    return;
  }

  const expectedPrefix = kind === 'command' ? COMMAND_PREFIX : EVENT_PREFIX;
  if (!canonicalName.startsWith(expectedPrefix)) {
    console.warn(
      `[events] ${kind} "${rawName}" resolved to "${canonicalName}" with unexpected prefix (expected "${expectedPrefix}")`,
    );
  }
}

function normalizeCommandName(commandName) {
  const canonicalName = resolveEventName(commandName);
  warnIfUnexpectedPrefix('command', commandName, canonicalName);
  return canonicalName;
}

function normalizeEventName(eventName) {
  const canonicalName = resolveEventName(eventName);
  warnIfUnexpectedPrefix('event', eventName, canonicalName);
  return canonicalName;
}

function getCommandHandlerCount(commandName) {
  return appBus.listenerCount(commandName);
}

function assertExactlyOneCommandHandler(commandName) {
  const handlerCount = getCommandHandlerCount(commandName);

  if (handlerCount === 1) {
    return;
  }

  if (handlerCount === 0) {
    throw new Error(
      `[events] Command "${commandName}" has no registered handler`,
    );
  }

  throw new Error(
    `[events] Command "${commandName}" has ${handlerCount} handlers (expected exactly 1)`,
  );
}

/**
 * Send a command to the responsible handler
 *
 * @param {string} commandName - Command name
 * @param {Object} [payload={}] - Command data
 */
const dispatchCommand = (commandName, payload = {}) => {
  const canonicalCommandName = normalizeCommandName(commandName);
  assertExactlyOneCommandHandler(canonicalCommandName);
  appBus.emit(canonicalCommandName, payload);
};

/**
 * Send a command and wait for the handler to complete.
 * Use when the caller must know the command finished before proceeding.
 *
 * @param {string} commandName - Command name
 * @param {Object} [payload={}] - Command data
 * Enforced semantics:
 * - exactly one handler must be registered for this command
 * - rejects if handler throws/rejects
 * - resolves with the single handler's return value
 *
 * @returns {Promise<unknown>}
 */
const dispatchCommandAndAwait = async (commandName, payload = {}) => {
  const canonicalCommandName = normalizeCommandName(commandName);
  assertExactlyOneCommandHandler(canonicalCommandName);

  const settled = await appBus.emitAsync(canonicalCommandName, payload, {
    returnSettled: true,
  });

  const first = settled?.[0];
  if (!first) {
    throw new Error(
      `[events] Command "${commandName}" did not produce a handler result`,
    );
  }
  if (first.status === 'rejected') {
    throw first.reason;
  }

  return first.value;
};

/**
 * Send multiple commands in strict order, awaiting each handler to complete
 * before moving to the next.
 *
 * @param {Array<[string, any]>} commands - Array of [commandName, payload] tuples
 * @returns {Promise<unknown[]>}
 */
const dispatchCommandAndAwaitSequential = async (commands) => {
  const results = [];

  for (const [commandName, payload] of commands) {
    results.push(await dispatchCommandAndAwait(commandName, payload));
  }

  return results;
};

/**
 * Register the handler for a command
 *
 * @param {string} commandName - Command name
 * @param {Function} handler - (payload) => void
 * @param {Object} [options]
 */
const handleCommand = (commandName, handler, options = {}) => {
  return appBus.on(normalizeCommandName(commandName), handler, options);
};

/**
 * Publish/broadcast/announce an event that already happened,
 * for anyone who cares to listen to that 'eventName'
 *
 * @param {string} eventName - Message name, e.g. "draftSaved".
 * @param {Object} [payload={}] - Message data.
 */
const publish = (eventName, payload = {}) => {
  appBus.emit(normalizeEventName(eventName), payload);
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
  await appBus.emitAsync(normalizeEventName(eventName), payload);
};

/**
 * Publish/broadcast multiple events in strict order, awaiting all listeners
 * for each event before moving to the next.
 *
 * @param {Array<[string, any]>} events - Array of [eventName, payload] tuples
 * @returns {Promise<void>}
 */
const publishAndAwaitSequential = async (events) => {
  const normalizedEvents = events.map(([eventName, payload]) => [
    normalizeEventName(eventName),
    payload,
  ]);
  await appBus.emitAsyncSequential(normalizedEvents);
};

/**
 * Get notified when an event with 'eventName' is published (by anyone)
 *
 * @param {string} eventName - Message name to listen to.
 * @param {Function} handler - (payload) => void.
 * @param {Object} [options]
 */
const subscribe = (eventName, handler, options = {}) => {
  return appBus.on(normalizeEventName(eventName), handler, options);
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
