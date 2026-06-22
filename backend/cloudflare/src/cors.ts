import origins from '../../../config/origins.json';
import type { WorkerEnv } from './types';

type CorsEnv = Pick<WorkerEnv, 'APP_ENV'>;

function allowedOrigins(env: CorsEnv): readonly string[] {
  return env.APP_ENV === 'development'
    ? [...origins.production, ...origins.development]
    : origins.production;
}

export function isAllowedOrigin(origin: string | null, env: CorsEnv): boolean {
  return origin !== null && allowedOrigins(env).includes(origin);
}

export function allowedOrigin(request: Request, env: CorsEnv): string | null {
  const origin = request.headers.get('Origin');
  return isAllowedOrigin(origin, env) ? origin : null;
}

export function corsHeaders(
  origin: string | null,
  env: CorsEnv,
): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (origin && isAllowedOrigin(origin, env)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}
