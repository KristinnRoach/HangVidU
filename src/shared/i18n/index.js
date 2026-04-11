const STORAGE_KEY = 'locale';

const messages = {
  en: () => import('./en.json'),
  is: () => import('./is.json'),
};

let currentLocale = 'en';
let dict = {};
const listeners = new Set();

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
      cb(currentLocale);
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
  currentLocale = saved || 'en';
  await setLocale(currentLocale);
}

export function getLocale() {
  return currentLocale;
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
    dict = newDict;
    currentLocale = locale;
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
  const str = dict[key] || key;
  if (!params) return str;
  return str.replace(/{(\w+)}/g, (_, k) => params[k] ?? `{${k}}`);
}
