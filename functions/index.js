// functions/index.js - Firebase Functions entry point
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const { getDatabase } = require('firebase-admin/database');
const { getAuth } = require('firebase-admin/auth');

// Initialize Firebase Admin
initializeApp();

/**
 * Send FCM call notification to target user
 * Called when someone receives an incoming call
 */
exports.sendCallNotification = onRequest(
  {
    cors: true,
    region: 'europe-west1', // Match your RTDB region
  },
  async (req, res) => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Verify Authentication
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
      }

      const idToken = authHeader.split('Bearer ')[1];
      try {
        await getAuth().verifyIdToken(idToken);
      } catch (authError) {
        console.warn('[FCM] Invalid auth token:', authError.message);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }

      const { targetUserId, callData } = req.body;

      if (!targetUserId || !callData) {
        return res
          .status(400)
          .json({ error: 'Missing targetUserId or callData' });
      }

      console.log(
        `[FCM] Sending call notification to ${targetUserId}:`,
        callData,
      );

      // Get user's FCM tokens from RTDB
      const db = getDatabase();
      const tokensRef = db.ref(`users/${targetUserId}/fcmTokens`);
      const tokensSnapshot = await tokensRef.once('value');
      const tokensData = tokensSnapshot.val();

      if (!tokensData) {
        console.warn(`[FCM] No FCM tokens found for user ${targetUserId}`);
        return res.status(404).json({ error: 'No FCM tokens found for user' });
      }

      // Extract token strings from token objects
      const tokens = Object.values(tokensData)
        .map((tokenData) => tokenData.token)
        .filter((token) => token); // Remove any null/undefined tokens

      if (tokens.length === 0) {
        console.warn(`[FCM] No valid tokens found for user ${targetUserId}`);
        return res.status(404).json({ error: 'No valid FCM tokens found' });
      }

      console.log(
        `[FCM] Found ${tokens.length} tokens for user ${targetUserId}`,
      );

      // Determine notification type and content
      const type = callData.type || 'call';
      let title, body;

      if (type === 'missed_call') {
        title = `Missed call from ${callData.callerName || 'Someone'}`;
        body = 'Tap to call back';
      } else {
        title = `Incoming call from ${callData.callerName || 'Someone'}`;
        body = 'Tap to answer or decline';
      }

      // Prepare FCM message
      const message = {
        notification: {
          title,
          body,
          icon: '/icons/play-arrows-v1/icon-192.png',
          badge: '/icons/play-arrows-v1/icon-192.png',
        },
        data: {
          type,
          roomId: callData.roomId || '',
          callerId: callData.callerId || '',
          callerName: callData.callerName || 'Unknown caller',
          timestamp: Date.now().toString(),
        },
        tokens: tokens,
        // Configure for background delivery
        android: {
          priority: 'high',
          notification: {
            channelId: 'calls',
            priority: 'high',
            defaultSound: true,
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
              contentAvailable: true,
            },
          },
        },
        webpush: {
          headers: {
            Urgency: 'high',
          },
          notification: {
            requireInteraction: true,
            tag: `call_${callData.roomId}`,
            actions: [
              {
                action: 'accept',
                title: 'Accept',
              },
              {
                action: 'decline',
                title: 'Decline',
              },
            ],
          },
        },
      };

      // Send FCM message
      const messaging = getMessaging();
      const response = await messaging.sendEachForMulticast(message);

      console.log(
        `[FCM] Notification sent - Success: ${response.successCount}, Failed: ${response.failureCount}`,
      );

      // Log any failures for debugging
      if (response.failureCount > 0) {
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            console.error(`[FCM] Failed to send to token ${idx}:`, resp.error);
          }
        });
      }

      res.json({
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
        totalTokens: tokens.length,
      });
    } catch (error) {
      console.error('[FCM] Error sending notification:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  },
);

/**
 * Health check endpoint
 */
exports.healthCheck = onRequest((req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'hangvidu-fcm-functions',
  });
});
