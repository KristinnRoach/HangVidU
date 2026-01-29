# Notification System Usage

## Overview

### NOTE: NotificationManager was renamed to InAppNotificationManager (./in-app-notification-manager.js). TODO: Rename references here.

The notification system consists of three main parts:

1. **NotificationManager** - Centralized manager for all notifications
2. **NotificationsToggle** - Bell icon with badge count
3. **Individual Notifications** - Specific notification components

## Setup (One-time)

```javascript
import { createNotificationsToggle } from './components/notifications/notifications-toggle.js';
import { notificationManager } from './components/notifications/notification-manager.js';

// Create toggle (usually in top-right menu)
const notificationsToggle = createNotificationsToggle({
  parent: document.querySelector('.top-right-menu'),
  hideWhenAllRead: true, // Hide toggle when no notifications
  onClick: () => {
    // Optional: handle toggle click (e.g., show notification panel)
  },
});

// Register toggle with manager
notificationManager.setToggle(notificationsToggle);
```

## Creating a New Notification Type

```javascript
import { createNotification } from './notification.js';
import { notificationManager } from './notification-manager.js';

const NOTIFICATION_ID = 'my-feature-notification';

export function showMyNotification(data) {
  // Prevent duplicates
  if (notificationManager.has(NOTIFICATION_ID)) {
    return notificationManager.notifications.get(NOTIFICATION_ID);
  }

  const notification = createNotification({
    template: `
      <div class="my-notification-content">
        <p>${'${'}message${'}'}</p>
        <button onclick="handleAction">Action</button>
        <button onclick="handleDismiss">Dismiss</button>
      </div>
    `,
    handlers: {
      handleAction: () => {
        // Do something
        notificationManager.remove(NOTIFICATION_ID);
      },
      handleDismiss: () => {
        notificationManager.remove(NOTIFICATION_ID);
      },
    },
    initialProps: { message: data.message },
    className: 'my-notification',
    parent: document.body,
  });

  // Register with manager (auto-updates badge count)
  notificationManager.add(NOTIFICATION_ID, notification);

  return notification;
}
```

## CSS Anchor Positioning

Notifications automatically anchor to the toggle using CSS:

```css
.my-notification {
  position: fixed;
  z-index: 300;
  /* ... other styles ... */
}

@supports (anchor-name: --notifications-toggle) {
  .my-notification {
    position-anchor: --notifications-toggle;
    top: anchor(bottom);
    right: anchor(right);
    margin-top: 8px;
  }
}
```

## API Reference

### NotificationManager

- `setToggle(toggleComponent)` - Register the toggle component
- `add(id, notificationElement)` - Add a notification
- `remove(id)` - Remove a notification
- `has(id)` - Check if notification exists
- `getCount()` - Get active notification count
- `clear()` - Remove all notifications

### NotificationsToggle

- `show()` - Show the toggle
- `hide()` - Hide the toggle
- `setUnread(count)` - Update badge count

## Benefits

✅ **Automatic badge updates** - Manager syncs count with toggle
✅ **No duplicate notifications** - Check with `has(id)` before creating
✅ **Auto-cleanup** - Disposing notification removes it from manager
✅ **Centralized state** - Single source of truth for all notifications
✅ **Simple API** - Just `add()` and `remove()`
