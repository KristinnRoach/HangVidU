// src/call-controls.js
// Extracted call control and URL utility functions to break circular dependency
// DRAFT

import { updateStatus } from './utils/status.js';

// These will be filled in by moving from main.js
// Placeholders for now; will be replaced with real code

export function clearUrlParam() {
  window.history.replaceState({}, document.title, window.location.pathname);
}

// The following will be replaced with the actual logic from main.js
export let enterCallMode = () => {};
export let exitCallMode = () => {};
export async function hangUp() {}
export async function onCallAnswered() {}
