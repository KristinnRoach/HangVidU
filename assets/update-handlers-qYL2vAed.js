const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/virtual_pwa-register-CYKrnXua.js","assets/main-mUhMAjsj.js","assets/main-C2GLXxDJ.css"])))=>i.map(i=>d[i]);
import{c as d,n as a,_ as c}from"./main-mUhMAjsj.js";function l({template:e,handlers:t={},className:i="notification",parent:o=document.body,initialProps:r={},...s}){return d({template:e,handlers:t,className:i,parent:o,initialProps:r,containerTag:"div",autoAppend:!1,...s})}const n="pwa-update";function u(e){if(a.has(n))return a.notifications.get(n);const t=l({template:`
      <div class="update-content">
        <p>Update available</p>
        <div class="update-actions">
          <button onclick="handleUpdate">Update</button>
          <button onclick="handleLater">Later</button>
        </div>
      </div>
    `,handlers:{handleUpdate:()=>{e(!0),a.remove(n)},handleLater:()=>{a.isListVisible()&&a.hideList()}},className:"pwa-update-notification"});return a.add(n,t),t}async function p(){const{registerSW:e}=await c(async()=>{const{registerSW:t}=await import("./virtual_pwa-register-CYKrnXua.js");return{registerSW:t}},__vite__mapDeps([0,1,2]));return e}async function v(){try{const e=await p();if(!e){console.warn("[PWA] registerSW is not available");return}const t=e({onNeedRefresh(){console.info("[PWA] New version available"),u(t)},onOfflineReady(){console.info("[PWA] App ready to work offline")}});return t}catch(e){if(e.message?.includes("Failed to resolve")||e.message?.includes("virtual:pwa-register")){console.debug("[PWA] Update handler not available (PWA may be disabled)");return}console.error("[PWA] Failed to setup update handler:",e)}}export{v as setupUpdateHandler};
