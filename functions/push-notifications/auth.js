const { getAuth } = require('firebase-admin/auth');

/**
 * Verifies the Firebase ID token from an HTTP Authorization header.
 */
async function verifyAuthHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Unauthorized: Missing token');
    error.statusCode = 401;
    throw error;
  }

  const idToken = authHeader.split('Bearer ')[1];
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    return decoded.uid;
  } catch (authError) {
    console.warn('[Push] Invalid auth token:', authError.message);
    const error = new Error('Unauthorized: Invalid token');
    error.statusCode = 401;
    throw error;
  }
}

module.exports = {
  verifyAuthHeader,
};
