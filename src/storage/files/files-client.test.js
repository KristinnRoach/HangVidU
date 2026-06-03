import { describe, expect, it } from 'vitest';
import { createFilesClient } from './files-client.js';

describe('files client', () => {
  const options = {
    getToken: async () => 'token',
  };

  it('rejects an empty base URL', () => {
    expect(() =>
      createFilesClient({
        ...options,
        baseUrl: '   ',
      }),
    ).toThrow('files client requires a non-empty base URL');
  });

  it('rejects a relative base URL', () => {
    expect(() =>
      createFilesClient({
        ...options,
        baseUrl: '/files',
      }),
    ).toThrow('files client base URL must be absolute');
  });
});
