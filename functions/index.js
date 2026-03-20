const { onRequest } = require('firebase-functions/v2/https');
const { onValueCreated } = require('firebase-functions/v2/database');
const { initializeApp } = require('firebase-admin/app');

const { REGION } = require('./push-notifications/config');
const {
  handleHealthCheck,
} = require('./push-notifications/health-check-handler');
const {
  handleRegisterPushSubscription,
} = require('./push-notifications/register-push-subscription-handler');
const {
  handleRemovePushSubscription,
} = require('./push-notifications/remove-push-subscription-handler');
const {
  handleSendCallNotification,
  handleSendDebugCallNotification,
} = require('./push-notifications/send-call-notification-handler');
const {
  handleSendMessageNotification,
} = require('./push-notifications/send-message-notification-handler');

initializeApp();

exports.registerPushSubscription = onRequest(
  {
    cors: true,
    region: REGION,
  },
  handleRegisterPushSubscription,
);

exports.removePushSubscription = onRequest(
  {
    cors: true,
    region: REGION,
  },
  handleRemovePushSubscription,
);

exports.sendCallNotification = onRequest(
  {
    cors: true,
    region: REGION,
  },
  handleSendCallNotification,
);

exports.sendDebugCallNotification = onRequest(
  {
    cors: true,
    region: REGION,
  },
  handleSendDebugCallNotification,
);

exports.healthCheck = onRequest(handleHealthCheck);

exports.sendMessageNotification = onValueCreated(
  {
    ref: '/conversations/{conversationId}/messages/{messageId}',
    region: REGION,
  },
  handleSendMessageNotification,
);
