## Event Emitter (Reusable Core)

Generic event primitives for JavaScript apps.

- `EventEmitter`: convenience facade (`on`, `once`, `off`, `emit`, `emitAsync`, `emitAsyncSequential`)
- `ListenerRegistry`: listener storage and subscription lifecycle
- `Emitter`: emission behavior and async/error policy

## Install In Project

```js
import { EventEmitter, ListenerRegistry, Emitter } from './index.js';
```

Use `EventEmitter` for most cases. Use `ListenerRegistry + Emitter` when you want stricter separation (for example separate subscriber/publisher interfaces).

## Quick Start

```js
import { EventEmitter } from './index.js';

const bus = new EventEmitter();

const unsubscribe = bus.on('user:created', (payload) => {
  console.log(payload.userId);
});

bus.emit('user:created', { userId: 'u_123' });
unsubscribe();
```

## API

- `on(event, callback, { signal? }) => unsubscribe`
- `once(event, callback, { signal? }) => unsubscribe`
- `off(event, callback)`
- `emit(event, payload)` fire-and-forget
- `emitAsync(event, payload, { throwOnError?, returnSettled? })`
- `emitAsyncSequential([[event, payload], ...], { throwOnError?, returnSettled? })`
- `removeAllListeners(event?)`
- `listenerCount(event) => number`

`event` can be `string` or `symbol`.

## Async/Error Behavior

- `emit` catches sync listener errors.
- `emit` also catches async listener rejections to avoid unhandled rejection leaks.
- `emitAsync` runs listeners concurrently (`Promise.allSettled`).
- `emitAsync({ throwOnError: true })` throws `AggregateError` if any listener fails.
- `emitAsync({ returnSettled: true })` returns `PromiseSettledResult[]`.

## AbortSignal Auto-Unsubscribe

```js
const controller = new AbortController();

bus.on('session:expired', handleExpired, { signal: controller.signal });

// Later
controller.abort(); // listener removed automatically
```

## Advanced: Split Subscriber/Publisher Facade

```js
import { ListenerRegistry, Emitter } from './index.js';

const registry = new ListenerRegistry();
const emitter = new Emitter(registry);

export const subscriber = {
  on: registry.on.bind(registry),
  once: registry.once.bind(registry),
  off: registry.off.bind(registry),
};

export const publisher = {
  emit: emitter.emit.bind(emitter),
  emitAsync: emitter.emitAsync.bind(emitter),
};
```

