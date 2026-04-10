// Helper for calling Firebase Cloud Functions (onRequest endpoints).

import { getLoggedInUserToken } from './auth-setup.js';
import { callFirebaseCloudFunction } from './adapters/firebase-functions-adapter.js';

/**
 * Calls a Firebase Cloud Function with Bearer token auth.
 *
 * @param {string} functionName - The exported function name (e.g. 'deleteAccount')
 * @param {object} [body] - JSON body to send
 * @returns {Promise<{status: number, payload: object}>}
 * @throws {Error} with .status and .payload on non-2xx responses
 */
export async function callCloudFunction(functionName, body) {
  const idToken = await getLoggedInUserToken();
  if (!idToken) {
    const error = new Error('User must be signed in');
    error.status = 401;
    throw error;
  }
  return callFirebaseCloudFunction(functionName, { body, idToken });
}
