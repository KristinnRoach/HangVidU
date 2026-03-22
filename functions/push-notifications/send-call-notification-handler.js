const { verifyAuthHeader } = require('./auth');
const { buildCallPayload } = require('./notification-payload-builder');
const { sendWebPushToUser } = require('./web-push-delivery');

/**
 * Authenticated HTTP handler for direct call-related push sends.
 */
async function handleSendCallNotification(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await verifyAuthHeader(req);

    const { targetUserId, callData } = req.body || {};
    if (!targetUserId || !callData) {
      return res.status(400).json({ error: 'Missing targetUserId or callData' });
    }

    const result = await sendWebPushToUser(
      targetUserId,
      buildCallPayload({
        ...callData,
        targetUserId,
      }),
    );

    if (!result.sent) {
      if (
        result.reason === 'no-subscriptions' ||
        result.reason === 'no-valid-subscriptions'
      ) {
        console.warn(
          '[Push] No push subscriptions found for user when sending call notification:',
          targetUserId,
        );
        return res.status(404).json({
          error: 'No push subscriptions found',
          reason: result.reason,
          totalSubscriptions: result.totalSubscriptions,
          successCount: result.successCount,
          failureCount: result.failureCount,
          failures: result.failures,
        });
      }

      console.warn('[Push] All push delivery attempts failed', {
        targetUserId,
        totalSubscriptions: result.totalSubscriptions,
        failureCount: result.failureCount,
        failures: result.failures,
      });
      return res.status(502).json({
        error: 'All push delivery attempts failed',
        reason: result.reason,
        totalSubscriptions: result.totalSubscriptions,
        successCount: result.successCount,
        failureCount: result.failureCount,
        failures: result.failures,
      });
    }

    return res.json({
      success: true,
      successCount: result.successCount,
      failureCount: result.failureCount,
      failures: result.failures,
    });
  } catch (error) {
    console.error('[Push] Error sending call notification:', error);
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal server error' });
  }
}

module.exports = {
  handleSendCallNotification,
};
