import { appBus } from '../app/app-bus.js';

export function dispatchUIEvent(eventName, data = {}) {
  try {
    appBus.emit(eventName, data);
  } catch (e) {
    console.warn(`Failed to dispatch UI event "${eventName}"`, e);
  }
}
