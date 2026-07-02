import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import {
  buildHangViduWebSocketUrl,
  getHangViduApiBaseUrl,
} from './hangvidu-api-url';

describe('HangVidU API URL helper', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('normalizes the configured base URL', () => {
    vi.stubEnv('VITE_HANGVIDU_API_URL', ' https://api.example.test/// ');

    expect(getHangViduApiBaseUrl()).toBe('https://api.example.test');
  });

  it('joins paths and converts HTTP protocols to WebSocket protocols', () => {
    expect(buildHangViduWebSocketUrl('/ws', 'http://localhost:8788/')).toBe(
      'ws://localhost:8788/ws',
    );
    expect(buildHangViduWebSocketUrl('ws', 'https://api.example.test')).toBe(
      'wss://api.example.test/ws',
    );
  });

  it('uses the default URL for a whitespace-only configured value', () => {
    vi.stubEnv('VITE_HANGVIDU_API_URL', '   ');

    expect(getHangViduApiBaseUrl()).toBe('https://api.hangvidu.com');
  });
});
