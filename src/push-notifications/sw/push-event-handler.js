import { buildNotificationPresentation } from './notification-presentation.js';
import { readPushDebugIdentity } from './push-debug-identity-store.js';

function parsePushPayload(event) {
  try {
    return event.data?.json() || {};
  } catch {
    return { title: 'Notification', body: event.data?.text() || '' };
  }
}

export async function handlePushEvent(event) {
  const payload = parsePushPayload(event);
  const localIdentity = await readPushDebugIdentity();
  const data = payload?.data || {};
  const presentation = buildNotificationPresentation(
    payload,
    import.meta.env.BASE_URL,
  );

  console.log('[SW] Web push received', {
    hasEventData: Boolean(event.data),
    localIdentity,
    intendedTargetUserId: data.targetUserId || null,
  });

  console.log('[SW] Parsed push payload', {
    localIdentity,
    rawPayload: payload,
    payloadKeys: Object.keys(payload || {}),
    data,
    dataKeys: Object.keys(data || {}),
    title: presentation.title,
    body: payload?.body || null,
    type: data.type || 'unknown',
    roomId: data.roomId || null,
    callerId: data.callerId || null,
    callerName: data.callerName || null,
    senderId: data.senderId || null,
    targetUserId: data.targetUserId || null,
    hasTopLevelType: Object.prototype.hasOwnProperty.call(
      payload || {},
      'type',
    ),
    topLevelType: payload?.type || null,
    hasNestedData: Object.prototype.hasOwnProperty.call(payload || {}, 'data'),
    expectedCallShape: {
      hasRoomId: Boolean(data.roomId),
      hasCallerId: Boolean(data.callerId),
      hasCallerName: Boolean(data.callerName),
      typeIsCall: data.type === 'incoming_call',
    },
  });

  console.log('[SW] Derived notification options', {
    localIdentity,
    title: presentation.title,
    tag: presentation.tag,
    requireInteraction: presentation.options.requireInteraction,
    actionCount: presentation.actions.length,
    actions: presentation.actions,
    vibrate: presentation.options.vibrate,
  });

  try {
    await self.registration.showNotification(
      presentation.title,
      presentation.options,
    );
    const notifications = await self.registration.getNotifications({
      tag: presentation.tag,
    });
    console.log('[SW] showNotification resolved', {
      localIdentity,
      title: presentation.title,
      tag: presentation.tag,
      displayedCountForTag: notifications.length,
      type: data.type || 'unknown',
      roomId: data.roomId || null,
      targetUserId: data.targetUserId || null,
    });
  } catch (error) {
    console.error('[SW] showNotification failed', {
      localIdentity,
      error,
      title: presentation.title,
      tag: presentation.tag,
      rawPayload: payload,
      data,
    });
    throw error;
  }
}
