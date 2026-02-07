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
  for (const cb of listeners) cb(currentLocale);
}

export async function initI18n() {
  const saved = localStorage.getItem(STORAGE_KEY);
  currentLocale = saved || (navigator.language.startsWith('is') ? 'is' : 'en');
  await setLocale(currentLocale);
}

export function getLocale() {
  return currentLocale;
}

export async function setLocale(locale) {
  if (!messages[locale]) locale = 'en';
  currentLocale = locale;
  localStorage.setItem(STORAGE_KEY, locale);
  dict = await messages[locale]().then((m) => m.default || m);
  notify();
}

export function t(key, params) {
  const str = dict[key] || key;
  if (!params) return str;
  return str.replace(/{(\w+)}/g, (_, k) => params[k] ?? `{${k}}`);
}
