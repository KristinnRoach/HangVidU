const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/virtual_pwa-register-DBxt4ju3.js","assets/main-dpk9RDbl.js","assets/main-DSoswIDm.css"])))=>i.map(i=>d[i]);
import{n as a,c as n,_ as o}from"./main-dpk9RDbl.js";const i="pwa-update";function r(e){if(a.has(i))return a.notifications.get(i);const t=n({template:`
      <div class="update-content">
        <p>Update available</p>
        <div class="update-actions">
          <button onclick="handleUpdate">Update</button>
          <button onclick="handleLater">Later</button>
        </div>
      </div>
    `,handlers:{handleUpdate:()=>{e(!0),a.remove(i)},handleLater:()=>{a.isListVisible()&&a.hideList()}},className:"pwa-update-notification"});return a.add(i,t),t}async function s(){const{registerSW:e}=await o(async()=>{const{registerSW:t}=await import("./virtual_pwa-register-DBxt4ju3.js");return{registerSW:t}},__vite__mapDeps([0,1,2]));return e}async function c(){try{const e=await s();if(!e){console.warn("[PWA] registerSW is not available");return}const t=e({onNeedRefresh(){console.info("[PWA] New version available"),r(t)},onOfflineReady(){console.info("[PWA] App ready to work offline")}});return t}catch(e){if(e.message?.includes("Failed to resolve")||e.message?.includes("virtual:pwa-register")){console.debug("[PWA] Update handler not available (PWA may be disabled)");return}console.error("[PWA] Failed to setup update handler:",e)}}export{c as setupUpdateHandler};
