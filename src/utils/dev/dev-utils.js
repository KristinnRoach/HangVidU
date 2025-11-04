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
