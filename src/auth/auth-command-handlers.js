import { handleCommand } from '../shared/events/index.js';
import {
  AUTH_COMMANDS,
  parseAuthCloudFunctionCall,
  parseAuthLoginRequested,
  parseAuthLogoutRequested,
} from './auth-events-schema.js';
import {
  signInWithAccountSelection,
  signOutUser,
} from './auth-commands.js';
import { callCloudFunction } from './cloud-functions.js';

/**
 * TODO(auth command handlers)
 *
 * Findings from architecture/boundary review:
 * 1) Failure handling consistency:
 *    - LOGIN/LOGOUT/DELETE_ACCOUNT handlers currently catch and only warn.
 *    - CLOUD_FUNCTION_CALL handler rethrows.
 *    - Improvement direction: pick one command failure contract and apply it consistently.
 *
 * 2) Command schema reusability:
 *    - auth command schemas currently enforce source: 'auth-ui'.
 *    - This is narrow for non-UI callers.
 *    - Improvement direction: either widen source semantics for reusable module commands
 *      or explicitly document these as UI-only commands.
 */
let cleanupAuthCommandHandlers = null;

export function setupAuthCommandHandlers() {
  if (cleanupAuthCommandHandlers) {
    return cleanupAuthCommandHandlers;
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
    if (cleanupAuthCommandHandlers === cleanup) {
      cleanupAuthCommandHandlers = null;
    }
  };

  cleanupAuthCommandHandlers = cleanup;
  return cleanup;
}
