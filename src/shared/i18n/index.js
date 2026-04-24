import { batch, createSignal } from 'solid-js';

const STORAGE_KEY = 'locale';

const messages = {
  en: () => import('./en.json'),
  is: () => import('./is.json'),
};

const [currentLocale, setCurrentLocale] = createSignal('en');
const [dict, setDict] = createSignal({});
const listeners = new Set();

function formatMessage(str, params) {
  if (!params) return str;
  return str.replace(/{(\w+)}/g, (_, k) => params[k] ?? `{${k}}`);
}

/**
 * Subscribe to locale changes.
 */
export function onLocaleChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function notify() {
  for (const cb of listeners) {
    try {
      cb(currentLocale());
    } catch (e) {
      console.error('[i18n]: Error in locale change listener:', e);
    }
  }
}

export async function initI18n() {
  let saved;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to read saved locale from localStorage:', e);
  }
  // Default to 'en' until Icelandic translations are complete
  await setLocale(saved || 'en');
}

export function getLocale() {
  return currentLocale();
}

export async function setLocale(locale) {
  // Validate locale is a safe, valid key with a loader function
  if (
    !Object.hasOwn(messages, locale) ||
    typeof messages[locale] !== 'function'
  ) {
    locale = 'en';
  }

  try {
    // Load first, update state only if successful
    const newDict = await messages[locale]().then((m) => m.default || m);
    batch(() => {
      setDict(newDict);
      setCurrentLocale(locale);
    });
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {
      console.warn('Failed to persist locale:', e);
    }
    notify();
  } catch (error) {
    console.error(`Failed to load locale "${locale}":`, error);
    if (locale !== 'en') {
      return setLocale('en'); // Fallback
    }
    // If 'en' fails, keep current state, no notify
  }
}

export function t(key, params) {
  const str = dict()[key] || key;
  return formatMessage(str, params);
}

/**
 * Solid-facing i18n helpers.
 * These are simple wrappers over the shared module state so migrated
 * components can use a stable API while imperative code keeps using `t()`.
 */
export function useI18n() {
  return {
    locale: currentLocale,
    setLocale,
    t,
  };
}
