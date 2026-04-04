import { z } from 'zod';

export const AUTH_COMMANDS = {
  LOGIN_REQUESTED: 'auth:login-requested',
  LOGOUT_REQUESTED: 'auth:logout-requested',
  DELETE_ACCOUNT_REQUESTED: 'auth:delete-account-requested',
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

export function parseAuthLoginRequested(data) {
  return AuthLoginRequestedSchema.parse(data);
}

export function parseAuthLogoutRequested(data) {
  return AuthLogoutRequestedSchema.parse(data);
}

export function parseAuthDeleteAccountRequested(data) {
  return AuthDeleteAccountRequestedSchema.parse(data);
}
