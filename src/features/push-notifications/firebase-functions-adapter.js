// src/features/push-notifications/firebase-functions-adapter.js
// Firebase onRequest Cloud Functions transport adapter.

const FUNCTION_REGION = 'europe-west1';

/**
 * Build a Firebase onRequest Cloud Function URL.
 *
 * @param {string} functionName - Exported Cloud Function name.
 * @param {object} [options]
 * @param {string} [options.region] - Firebase region (defaults to europe-west1).
 * @param {string} [options.projectId] - Firebase project id (defaults to env).
 * @returns {string} Fully-qualified Cloud Function URL.
 */
function getFirebaseFunctionUrl(
  functionName,
  {
    region = FUNCTION_REGION,
    projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID,
  } = {},
) {
  if (!projectId) {
    throw new Error(
      'Missing VITE_FIREBASE_PROJECT_ID: cannot build Firebase Function URL',
    );
  }
  return `https://${region}-${projectId}.cloudfunctions.net/${functionName}`;
}

/**
 * Invoke a Firebase onRequest Cloud Function over HTTP.
 *
 * @param {string} functionName - Exported Cloud Function name.
 * @param {object} [options]
 * @param {object} [options.body] - JSON body to send.
 * @param {string} options.idToken - Bearer token for Authorization header.
 * @returns {Promise<{status: number, payload: object}>} HTTP status and parsed JSON payload.
 * @throws {Error & {status?: number, payload?: object}} On non-2xx responses.
 */
export async function callFirebaseCloudFunction(
  functionName,
  { body, idToken } = {},
) {
  if (!idToken || typeof idToken !== 'string' || !idToken.trim()) {
    throw new Error(
      'Missing idToken in callFirebaseCloudFunction: cannot call Firebase Cloud Function',
    );
  }

  const response = await fetch(getFirebaseFunctionUrl(functionName), {
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
