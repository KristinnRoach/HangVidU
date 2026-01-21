// functions/sendNotification.js - Firebase Function to send FCM notifications
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const { getDatabase } = require('firebase-admin/database');

initializeApp();

exports.sendCallNotification = onRequest(async (req, res) => {
  try {
    const { targetUserId, callData } = req.body;

    // Get user's FCM tokens from RTDB
    const db = getDatabase();
    const tokensRef = db.ref(`users/${targetUserId}/fcmTokens`);
    const tokensSnapshot = await tokensRef.once('value');
    const tokensData = tokensSnapshot.val();

    if (!tokensData) {
      return res.status(404).json({ error: 'No FCM tokens found for user' });
    }

    const tokens = Object.values(tokensData).map(
      (tokenData) => tokenData.token,
    );

    // Send FCM message
    const message = {
      notification: {
        title: `Incoming call from ${callData.callerName}`,
        body: 'Tap to answer or decline',
        icon: '/icons/play-arrows-v1/icon-192.png',
      },
      data: {
        type: 'call',
        roomId: callData.roomId,
        callerId: callData.callerId,
        callerName: callData.callerName,
        timestamp: Date.now().toString(),
      },
      tokens: tokens,
    };

    const response = await getMessaging().sendEachForMulticast(message);

    res.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: error.message });
  }
});
