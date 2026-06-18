const DEFAULT_HANGVIDU_API_URL =
  'https://hangvidu-data.kristinnroach.workers.dev';

export function normalizeHangViduApiBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export function getHangViduApiBaseUrl(): string {
  return normalizeHangViduApiBaseUrl(
    import.meta.env.VITE_HANGVIDU_API_URL || DEFAULT_HANGVIDU_API_URL,
  );
}

export function buildHangViduApiUrl(
  path: string,
  baseUrl = getHangViduApiBaseUrl(),
): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizeHangViduApiBaseUrl(baseUrl)}${normalizedPath}`;
}

export function buildHangViduWebSocketUrl(
  path: string,
  baseUrl = getHangViduApiBaseUrl(),
): string {
  const httpUrl = buildHangViduApiUrl(path, baseUrl);
  return httpUrl.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');
}
