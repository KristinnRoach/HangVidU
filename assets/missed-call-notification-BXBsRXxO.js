import{c,e as l}from"./main-uWA7Pt3r.js";function p({callerId:e,callerName:n,roomId:d,onCallBack:t,onDismiss:a}){return c({template:`
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">📞</span>
          <span class="notification-title">Missed Call</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${l(n||"Someone")}</strong> tried to call you
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleCallBack">
            Call Back
          </button>
        </div>
      </div>
    `,className:"notification missed-call-notification",handlers:{handleCallBack:async o=>{const i=o.target;i.disabled=!0,i.textContent="Calling...";try{t&&await t()}catch(s){console.error("[MISSED CALL NOTIFICATION] Call back failed:",s),i.disabled=!1,i.textContent="Call Back"}},handleDismiss:()=>{a&&a()}}})}export{p as createMissedCallNotification};
