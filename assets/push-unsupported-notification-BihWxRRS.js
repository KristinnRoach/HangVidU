import{i as t,c as o,b as s,o as a,t as e}from"./main-C_6mysGv.js";const i="push-unsupported";function p(){if(t.has(i))return t.notifications.get(i);const n=o({template:s({header:`
        <span class="notification-title">[[t:notification.push.unsupported.title]]</span>
        <button class="notification-dismiss" onclick="handleDismiss" title="[[t:shared.dismiss]]">×</button>
      `,body:`
        <p class="notification-message">
          [[t:notification.push.unsupported.body]]
        </p>
      `,actions:`
        <button class="notification-btn notification-btn-secondary" onclick="handleDismiss">
          [[t:notification.push.got_it]]
        </button>
      `}),className:"notification push-unsupported-notification",templateFns:{t:{resolve:e,onChange:a}},handlers:{handleDismiss:()=>{t.remove(i)}}});return t.add(i,n),n}export{p as showPushUnsupportedNotification};
