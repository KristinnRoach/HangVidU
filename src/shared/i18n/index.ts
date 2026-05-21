import { createSignal } from 'solid-js';

import en from './en.json';
import is from './is.json';

export type MessageKey = keyof typeof en;
export type Locale = 'en' | 'is';
export type MessageParams = Record<string, string | number>;

const STORAGE_KEY = 'locale';
const DICTS = { en, is } as const satisfies Record<Locale, Record<string, string>>;

function readSavedLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'is' ? saved : 'en';
  } catch (e) {
    console.warn('[i18n] Failed to read saved locale:', e);
    return 'en';
  }
}

const [locale, setLocaleSignal] = createSignal<Locale>(readSavedLocale());
const listeners = new Set<(locale: Locale) => void>();

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
      cb(locale());
    } catch (e) {
      console.error('[i18n] Error in locale change listener:', e);
    }
  }
}

export function getLocale(): Locale {
  return locale();
}

export function setLocale(next: Locale | string) {
  const n: Locale = next === 'en' || next === 'is' ? next : 'en';
  if (n === locale()) return;
  setLocaleSignal(n);
  try {
    localStorage.setItem(STORAGE_KEY, n);
  } catch (e) {
    console.warn('[i18n] Failed to persist locale:', e);
  }
  notify();
}

export function t<K extends MessageKey>(key: K, params?: MessageParams): string;
export function t(key: string, params?: MessageParams): string;
export function t(key: string, params?: MessageParams): string {
  const dict = DICTS[locale()] as Record<string, string>;
  return formatMessage(dict[key] ?? key, params);
}

/**
 * Solid-facing i18n helpers.
 * `t()` reads the `locale` signal, so calling it inside JSX or a memo
 * will re-run when the locale changes.
 */
export function useI18n() {
  return {
    locale,
    setLocale,
    t,
  };
}
