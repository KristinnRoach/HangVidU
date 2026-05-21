import { batch, createSignal } from 'solid-js';

import en from './en.json';

export type MessageKey = keyof typeof en;
export type Locale = 'en' | 'is';
export type MessageParams = Record<string, string | number>;

const STORAGE_KEY = 'locale';

const loaders: Record<Locale, () => Promise<{ default: Record<string, string> }>> = {
  en: () => import('./en.json'),
  is: () => import('./is.json'),
};

const [currentLocale, setCurrentLocale] = createSignal<Locale>('en');
const [dict, setDict] = createSignal<Record<string, string>>({});
const listeners = new Set<(locale: Locale) => void>();
let initPromise: Promise<void> | null = null;
let initialized = false;

function formatMessage(str: string, params?: MessageParams) {
  if (!params) return str;
  return str.replace(/{(\w+)}/g, (_, k) =>
    Object.hasOwn(params, k) ? String(params[k]) : `{${k}}`,
  );
}

export function onLocaleChange(cb: (locale: Locale) => void) {
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
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to read saved locale from localStorage:', e);
    }
    // Default to 'en' until Icelandic translations are complete
    await setLocale((saved as Locale) || 'en');
    initialized = true;
  })().finally(() => {
    initPromise = null;
  });

  return initPromise;
}

export function getLocale(): Locale {
  return currentLocale();
}

export async function setLocale(locale: Locale | string) {
  const next: Locale =
    locale === 'en' || locale === 'is' ? locale : 'en';

  try {
    const mod = await loaders[next]();
    const newDict = (mod.default || mod) as Record<string, string>;
    batch(() => {
      setDict(newDict);
      setCurrentLocale(next);
    });
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      console.warn('Failed to persist locale:', e);
    }
    notify();
  } catch (error) {
    console.error(`Failed to load locale "${next}":`, error);
    if (next !== 'en') {
      return setLocale('en');
    }
  }
}

export function t<K extends MessageKey>(key: K, params?: MessageParams): string;
export function t(key: string, params?: MessageParams): string;
export function t(key: string, params?: MessageParams): string {
  const str = dict()[key] || key;
  return formatMessage(str, params);
}

/**
 * Solid-facing i18n helpers.
 * The shared `t()` is reactive (reads the `dict` signal) — calling it
 * inside JSX or a Solid memo will re-run when the locale changes.
 */
export function useI18n() {
  return {
    locale: currentLocale,
    setLocale,
    t,
  };
}
