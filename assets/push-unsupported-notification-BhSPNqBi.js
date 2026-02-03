import{i,c as o}from"./main-BDCQXr-a.js";const t="push-unsupported";function a(){if(i.has(t))return i.notifications.get(t);const n=o({template:`
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-title">Push notifications unavailable</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            Your browser doesn't support push notifications.
            To receive call alerts when the app isn't focused, install via
            <strong>Chrome</strong>, <strong>Edge</strong>, or <strong>Firefox</strong>.
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-secondary" onclick="handleDismiss">
            Got it
          </button>
        </div>
      </div>
    `,className:"notification push-unsupported-notification",handlers:{handleDismiss:()=>{i.remove(t)}}});return i.add(t,n),n}export{a as showPushUnsupportedNotification};
