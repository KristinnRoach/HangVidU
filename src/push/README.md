# Push notifications

Import through [index.js](index.js). It exports `PushNotifications`,
`getPushNotifications`, `initPushNotifications`, and the startup `setup` function.
The [client](push-notifications.js) owns permission and subscription operations.

`setup` subscribes to call and conversation events and invokes the client's
notification methods. Message push is initiated by the app after a persistent
send; it is not a database-only trigger. Backend Functions validate requests,
store subscriptions, and deliver web push. [sw/](sw/) owns native display and click
routing. Keep in-app notification UI separate from this delivery path.

Add notification kinds through the shared contracts, backend, and service worker
together. Do not add content-bearing push to private session messaging.

If notifications do not appear, check browser push permissions and OS notification/
Focus settings. Brave may also require “Use Google services for push messaging”.
