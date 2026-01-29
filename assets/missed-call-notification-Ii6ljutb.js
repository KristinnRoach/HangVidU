import{c as e}from"./main-CgmLinJe.js";function p({callerId:n,callerName:t,roomId:d,onCallBack:a,onDismiss:o}){return e({template:`
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">📞</span>
          <span class="notification-title">Missed Call</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${l(t||"Someone")}</strong> tried to call you
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleCallBack">
            Call Back
          </button>
        </div>
      </div>
    `,className:"notification missed-call-notification",handlers:{handleCallBack:async s=>{const i=s.target;i.disabled=!0,i.textContent="Calling...";try{a&&await a()}catch(c){console.error("[MISSED CALL NOTIFICATION] Call back failed:",c),i.disabled=!1,i.textContent="Call Back"}},handleDismiss:()=>{o&&o()}}})}function l(n){const t=document.createElement("div");return t.textContent=n,t.innerHTML}export{p as createMissedCallNotification};
