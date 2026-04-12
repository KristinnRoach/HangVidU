// DEV convenience utils

export const isDev = () => import.meta.env.DEV;
export const isProd = () => import.meta.env.PROD;

export const setDevDebugEnabled = (enabled) => {
  try {
    if (enabled) {
      localStorage.setItem('debug:console', '1');
    } else {
      localStorage.removeItem('debug:console');
    }
  } catch {
    // localStorage unavailable
  }
};

export const setTempLogsEnabled = (enabled) => {
  try {
    if (enabled) {
      localStorage.setItem('debug:temp', '1');
    } else {
      localStorage.removeItem('debug:temp');
    }
  } catch {
    // localStorage unavailable
  }
};

export const devDebug = (...args) => {
  // Only log in dev when explicitly enabled via localStorage flag
  // Enable with: localStorage.setItem('debug:console', '1')
  // Disable with: localStorage.removeItem('debug:console')
  if (!isDev()) return;
  try {
    const enabled = localStorage.getItem('debug:console') === '1';
    if (enabled) console.debug(...args);
  } catch {
    // Fallback if localStorage unavailable
    // Remain silent by default to avoid noisy consoles
  }
};

export const tempWarn = (...args) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.warn(...args);
};

export const tempLog = (...args) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.log(...args);
};

export const tempInfo = (...args) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.info(...args);
};

export const tempTable = (data, columns) => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;
  console.table(data, columns);
};

/**
 * Debug utility to log element visibility and CSS properties
 * @param {HTMLElement} el - The element to debug
 * @param {string} [context] - Optional context label (e.g., 'showElement', 'hideElement')
 */
export const debugVisibility = (el, context = 'visibility') => {
  const enabled = localStorage.getItem('debug:console') === '1';
  if (!isDev() || !enabled) return;

  try {
    const cs = getComputedStyle(el);
    const stack = new Error().stack
      ?.split('\n')
      .slice(2, 6) // trim internal frames
      .map((s) => s.trim());
    const id = el.id || '(no-id)';
    const classes = el.className || '';
    const inRemoteBox =
      id === 'remote-video-el' ||
      id === 'remote-video-box' ||
      el.closest?.('#remote-video-box');

    console.debug(`[UI] ${context}`, {
      id,
      classes,
      visibility: cs.visibility,
      display: cs.display,
      opacity: cs.opacity,
      zIndex: cs.zIndex,
      position: cs.position,
      trace: stack,
      highlight: !!inRemoteBox,
    });
  } catch (error) {
    console.warn('[debugVisibility] Error:', error);
  }
};
