# Functions

Firebase Functions entrypoint: [index.js](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/index.js)

Push backend internals live under [push-notifications](/Users/kristinnroachgunnarsson/Desktop/Dev/HangVidU/functions/push-notifications):

- `config.js`: region and Web Push setup
- `auth.js`: request auth verification
- `notification-payload-builder.js`: normalized push payload builders
- `subscription-ownership-store.js`: subscription keying and ownership updates
- `web-push-delivery.js`: delivery fan-out and stale cleanup
- `*-handler.js`: Firebase HTTP / RTDB handler logic
