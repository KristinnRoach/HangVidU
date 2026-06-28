import { z } from 'zod';

export const AUTH_COMMANDS = {
  LOGIN_REQUESTED: 'cmd:auth:session:login-requested',
  LOGOUT_REQUESTED: 'cmd:auth:session:logout-requested',
  CLOUD_FUNCTION_CALL: 'cmd:auth:cloud-function:call',
};

const AuthCommandSourceSchema = z.literal('auth-ui');

export const AuthLoginRequestedSchema = z.object({
  source: AuthCommandSourceSchema,
});

export const AuthLogoutRequestedSchema = z.object({
  source: AuthCommandSourceSchema,
});

export const AuthCloudFunctionCallSchema = z.object({
  functionName: z.string().min(1),
  body: z.unknown().optional(),
});

export function parseAuthLoginRequested(data) {
  return AuthLoginRequestedSchema.parse(data);
}

export function parseAuthLogoutRequested(data) {
  return AuthLogoutRequestedSchema.parse(data);
}

export function parseAuthCloudFunctionCall(data) {
  return AuthCloudFunctionCallSchema.parse(data);
}
