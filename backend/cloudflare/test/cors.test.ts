import { describe, expect, it } from 'vitest';
import { isAllowedOrigin } from '../src/cors';
import type { WorkerEnv } from '../src/types';

function envFor(appEnv: WorkerEnv['APP_ENV']): Pick<WorkerEnv, 'APP_ENV'> {
  return { APP_ENV: appEnv };
}

describe('origin policy', () => {
  it('permits production origins and rejects development origins in production', () => {
    const env = envFor('production');
    expect(isAllowedOrigin('https://hangvidu.com', env)).toBe(true);
    expect(isAllowedOrigin('https://localhost:5173', env)).toBe(false);
  });

  it('permits production and development origins locally', () => {
    const env = envFor('development');
    expect(isAllowedOrigin('https://hangvidu.com', env)).toBe(true);
    expect(isAllowedOrigin('https://localhost:5173', env)).toBe(true);
  });

  it('rejects missing and unknown origins', () => {
    const env = envFor('development');
    expect(isAllowedOrigin(null, env)).toBe(false);
    expect(isAllowedOrigin('https://evil.example', env)).toBe(false);
  });
});
