import { z } from 'zod';

export const AUTH_COMMANDS = {
  LOGIN_REQUESTED: 'auth:login-requested',
  LOGOUT_REQUESTED: 'auth:logout-requested',
  DELETE_ACCOUNT_REQUESTED: 'auth:delete-account-requested',
  CLOUD_FUNCTION_CALL: 'auth:cloud-function:call',
};

const AuthCommandSourceSchema = z.literal('auth-ui');

export const AuthLoginRequestedSchema = z.object({
  source: AuthCommandSourceSchema,
});

export const AuthLogoutRequestedSchema = z.object({
  source: AuthCommandSourceSchema,
});

export const AuthDeleteAccountRequestedSchema = z.object({
  source: AuthCommandSourceSchema,
  scrubMessages: z.boolean(),
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

export function parseAuthDeleteAccountRequested(data) {
  return AuthDeleteAccountRequestedSchema.parse(data);
}

export function parseAuthCloudFunctionCall(data) {
  return AuthCloudFunctionCallSchema.parse(data);
}
