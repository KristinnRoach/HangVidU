const isProd =
  typeof import.meta !== 'undefined' && Boolean(import.meta.env?.PROD);

export function logAuthError(context, error, extra = {}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'n/a';
  if (isProd) {
    console.error(`[AUTH] ${context}:`, {
      code: error?.code || 'unknown',
      message: error?.message || String(error),
      origin,
      ...extra,
    });
  } else {
    console.error(`[AUTH] ${context}:`, error, extra, { origin });
  }
}
