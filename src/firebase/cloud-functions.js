// src/firebase/cloud-functions.js
// Shared helper for calling Firebase Cloud Functions (onRequest endpoints).

import { getLoggedInUserToken } from '../auth/index.js';

const FUNCTION_REGION = 'europe-west1';

function getFunctionUrl(functionName) {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return `https://${FUNCTION_REGION}-${projectId}.cloudfunctions.net/${functionName}`;
}

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
  const response = await fetch(getFunctionUrl(functionName), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      payload?.message ||
        payload?.error ||
        `Function ${functionName} failed with status ${response.status}`,
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return { status: response.status, payload };
}
