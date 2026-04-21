// src/lib/webrtc/logger.js
//
// Tiny pluggable logger so the lib can stay dependency-free. Default is
// no-op. Consumers wire their own sink via setLogger() — e.g. the app
// points it at devDebug so library logs respect the existing debug flag.

let sink = () => {};

export function setLogger(fn) {
  sink = typeof fn === 'function' ? fn : () => {};
}

export function log(...args) {
  sink(...args);
}
