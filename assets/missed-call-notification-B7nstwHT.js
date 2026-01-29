import{c as s}from"./main-CLyCkdI5.js";function f({callerId:c,callerName:l,roomId:e,onCallBack:t,onDismiss:a}){return s({template:`
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">📞</span>
          <span class="notification-title">Missed Call</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>[[displayName]]</strong> tried to call you
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleCallBack">
            Call Back
          </button>
        </div>
      </div>
    `,className:"notification missed-call-notification",handlers:{handleCallBack:async n=>{const i=n.target;i.disabled=!0,i.textContent="Calling...";try{t&&await t()}catch(o){console.error("[MISSED CALL NOTIFICATION] Call back failed:",o),i.disabled=!1,i.textContent="Call Back"}},handleDismiss:()=>{a&&a()}}})}export{f as createMissedCallNotification};
