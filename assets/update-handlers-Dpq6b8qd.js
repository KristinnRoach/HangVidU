const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/virtual_pwa-register-OaGLo-RI.js","assets/main-CJ4xTteS.js","assets/main-DkomGABS.css"])))=>i.map(i=>d[i]);
import{c as d,n as a,_ as c}from"./main-CJ4xTteS.js";function l({template:e,handlers:t={},className:i="notification",parent:o=document.body,initialProps:r={},...s}){return d({template:e,handlers:t,className:i,parent:o,initialProps:r,containerTag:"div",autoAppend:!1,...s})}const n="pwa-update";function u(e){if(a.has(n))return a.notifications.get(n);const t=l({template:`
      <div class="update-content">
        <p>Update available</p>
        <div class="update-actions">
          <button onclick="handleUpdate">Update</button>
          <button onclick="handleLater">Later</button>
        </div>
      </div>
    `,handlers:{handleUpdate:()=>{e(!0),a.remove(n)},handleLater:()=>{a.isListVisible()&&a.hideList()}},className:"pwa-update-notification"});return a.add(n,t),t}async function f(){try{const{registerSW:e}=await c(async()=>{const{registerSW:i}=await import("./virtual_pwa-register-OaGLo-RI.js");return{registerSW:i}},__vite__mapDeps([0,1,2]));if(!e){console.warn("[PWA] registerSW is not available");return}const t=e({onNeedRefresh(){console.info("[PWA] New version available"),u(t)},onOfflineReady(){console.info("[PWA] App ready to work offline")}});return t}catch(e){if(e.message?.includes("Failed to resolve")||e.message?.includes("virtual:pwa-register")){console.debug("[PWA] Update handler not available (PWA may be disabled)");return}console.error("[PWA] Failed to setup update handler:",e)}}export{f as setupUpdateHandler};
