const webpush = require('web-push');

const REGION = 'europe-west1';
const pushPublicKey =
  process.env.WEB_PUSH_VAPID_PUBLIC_KEY || process.env.VITE_PUSH_VAPID_KEY;
const pushPrivateKey = process.env.WEB_PUSH_VAPID_PRIVATE_KEY;
const pushContactEmail =
  process.env.WEB_PUSH_CONTACT_EMAIL || 'mailto:no-reply@hangvidu.app';

if (pushPublicKey && pushPrivateKey) {
  webpush.setVapidDetails(pushContactEmail, pushPublicKey, pushPrivateKey);
}

function ensureWebPushConfigured() {
  if (!pushPublicKey || !pushPrivateKey) {
    throw new Error(
      'Web Push VAPID keys are not configured. Set WEB_PUSH_VAPID_PUBLIC_KEY and WEB_PUSH_VAPID_PRIVATE_KEY.',
    );
  }
}

module.exports = {
  REGION,
  webpush,
  ensureWebPushConfigured,
};
