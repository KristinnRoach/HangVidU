# File Transfer App Layer

HangVidU/browser-specific file-transfer helpers layered on top of `../core`.

## Exports

Import app-layer helpers from `./index.js`.

- `createDefaultReceiveStore(metadata)` chooses OPFS for large files when available, otherwise memory.
- `probeDefaultReceiveStore()` probes OPFS before receiving files.
- `cleanupDefaultReceiveStore()` removes temporary OPFS transfer files.
- `createOpfsReceiveStore()` streams incoming chunks to OPFS.
- `registerVideoForServing()` and related helpers connect OPFS video files to service-worker range serving.

The app layer may depend on browser storage, service workers, and HangVidU playback behavior. Keep reusable protocol changes in `../core`.
