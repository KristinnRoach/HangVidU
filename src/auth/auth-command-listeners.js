import { handleCommand } from '../events/index.js';
import {
  AUTH_COMMANDS,
  parseAuthCloudFunctionCall,
  parseAuthDeleteAccountRequested,
  parseAuthLoginRequested,
  parseAuthLogoutRequested,
} from './auth-events-schema.js';
import {
  deleteAccount,
  signInWithAccountSelection,
  signOutUser,
} from './auth-actions.js';
import { callCloudFunction } from './cloud-functions.js';

let cleanupAuthCommandListeners = null;

export function setupAuthCommandListeners() {
  if (cleanupAuthCommandListeners) {
    return cleanupAuthCommandListeners;
  }

  const ac = new AbortController();

  handleCommand(
    AUTH_COMMANDS.LOGIN_REQUESTED,
    async (payload) => {
      try {
        const request = parseAuthLoginRequested(payload);
        await signInWithAccountSelection(request);
      } catch (e) {
        console.warn('[auth] login command failed:', e);
      }
    },
    { signal: ac.signal },
  );

  handleCommand(
    AUTH_COMMANDS.LOGOUT_REQUESTED,
    async (payload) => {
      try {
        parseAuthLogoutRequested(payload);
        await signOutUser();
      } catch (e) {
        console.warn('[auth] logout command failed:', e);
      }
    },
    { signal: ac.signal },
  );

  handleCommand(
    AUTH_COMMANDS.DELETE_ACCOUNT_REQUESTED,
    async (payload) => {
      try {
        const request = parseAuthDeleteAccountRequested(payload);
        await deleteAccount({ scrubMessages: request.scrubMessages });
      } catch (e) {
        console.warn('[auth] delete-account command failed:', e);
      }
    },
    { signal: ac.signal },
  );

  handleCommand(
    AUTH_COMMANDS.CLOUD_FUNCTION_CALL,
    async (payload) => {
      try {
        const request = parseAuthCloudFunctionCall(payload);
        return await callCloudFunction(request.functionName, request.body);
      } catch (e) {
        console.warn('[auth] cloud-function command failed:', e);
        throw e;
      }
    },
    { signal: ac.signal },
  );

  const cleanup = () => {
    ac.abort();
    if (cleanupAuthCommandListeners === cleanup) {
      cleanupAuthCommandListeners = null;
    }
  };

  cleanupAuthCommandListeners = cleanup;
  return cleanup;
}
