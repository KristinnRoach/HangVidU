const DEFAULT_HANGVIDU_API_URL = 'https://api.hangvidu.com';

function normalizeHangViduApiBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export function getHangViduApiBaseUrl(): string {
  const configured = normalizeHangViduApiBaseUrl(
    import.meta.env.VITE_HANGVIDU_API_URL ?? '',
  );
  return configured || DEFAULT_HANGVIDU_API_URL;
}

export function buildHangViduWebSocketUrl(
  path: string,
  baseUrl = getHangViduApiBaseUrl(),
): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const httpUrl = `${normalizeHangViduApiBaseUrl(baseUrl)}${normalizedPath}`;
  return httpUrl.replace(/^http:/, 'ws:').replace(/^https:/, 'wss:');
}
