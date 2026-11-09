import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { createWorkerRequest } from './worker-request.js';
import {
  reportApiAuthFailure,
  reportApiOutage,
} from '../infra/api-auth-failure.js';

vi.mock('../infra/api-auth-failure.js', () => ({
  reportApiAuthFailure: vi.fn(),
  reportApiOutage: vi.fn(),
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('Worker request diagnostics', () => {
  it.each([401, 403, 503])(
    'keeps private query values and response bodies out of %i errors and reports',
    async (status) => {
      const email = 'contact@example.com';
      const encoded = btoa(email);
      const fetchMock = vi.fn(
        async () =>
          new Response(`lookup failed for ${email} (${encoded})`, { status }),
      );
      vi.stubGlobal('fetch', fetchMock);
      const request = createWorkerRequest({
        baseUrl: 'https://worker.test',
        getToken: async () => 'token',
      });
      const path = `/users/lookup?emailHash=${encoded}`;
      const error = await request('GET', path).catch((err) => err);
      expect(fetchMock).toHaveBeenCalledWith(
        `https://worker.test${path}`,
        expect.any(Object),
      );
      expect(error.message).toBe(`data worker GET /users/lookup -> ${status}`);
      expect(error.status).toBe(status);
      if (status === 401) {
        expect(reportApiAuthFailure).toHaveBeenCalledExactlyOnceWith(
          'data:GET /users/lookup',
          status,
        );
        expect(reportApiOutage).not.toHaveBeenCalled();
      } else if (status === 503) {
        expect(reportApiOutage).toHaveBeenCalledExactlyOnceWith(
          'data:GET /users/lookup',
          status,
        );
        expect(reportApiAuthFailure).not.toHaveBeenCalled();
      } else {
        expect(reportApiAuthFailure).not.toHaveBeenCalled();
        expect(reportApiOutage).not.toHaveBeenCalled();
      }
    },
  );
});
