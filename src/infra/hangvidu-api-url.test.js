import { describe, expect, it } from 'vitest';
import {
  buildHangViduApiUrl,
  buildHangViduWebSocketUrl,
  normalizeHangViduApiBaseUrl,
} from './hangvidu-api-url';

describe('HangVidU API URL helper', () => {
  it('trims whitespace and trailing slashes', () => {
    expect(normalizeHangViduApiBaseUrl(' https://api.example.test/// ')).toBe(
      'https://api.example.test',
    );
  });

  it('constructs API paths with exactly one separator', () => {
    expect(
      buildHangViduApiUrl('/health', 'https://api.example.test/'),
    ).toBe('https://api.example.test/health');
    expect(buildHangViduApiUrl('health', 'https://api.example.test')).toBe(
      'https://api.example.test/health',
    );
  });

  it('converts HTTP protocols to WebSocket protocols', () => {
    expect(buildHangViduWebSocketUrl('/ws', 'http://localhost:8788')).toBe(
      'ws://localhost:8788/ws',
    );
    expect(
      buildHangViduWebSocketUrl('/ws', 'https://api.example.test'),
    ).toBe('wss://api.example.test/ws');
  });
});
