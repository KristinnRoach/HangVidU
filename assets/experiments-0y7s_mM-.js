import{c as k}from"./component-B-QhcPhh.js";function S(o){const t=k({initialProps:{count:0,label:"Click me"},template:`
      <div style="padding: 20px; text-align: center;">
        <h2>Counter POC</h2>
        <button onclick="increment" style="padding: 10px 20px; font-size: 18px;">
          \${label}: \${count}
        </button>
        <button onclick="reset" style="margin-left: 10px; padding: 10px;">
          Reset
        </button>
      </div>
    `,handlers:{increment:()=>t.count++,reset:()=>t.update({count:0})},parent:o,className:"counter-component"});return t}function D(o){const t=k({initialProps:{title:"User Form",submitCount:0},template:`
      <div style="padding: 20px;">
        <h2>\${title}</h2>
        <form>
          <input type="text" name="username" placeholder="Username" style="display: block; margin: 10px 0; padding: 8px;">
          <input type="email" name="email" placeholder="Email" style="display: block; margin: 10px 0; padding: 8px;">
          <textarea name="bio" placeholder="Bio" style="display: block; margin: 10px 0; padding: 8px; width: 200px; height: 60px;"></textarea>
          <button type="submit" style="padding: 10px 20px;">Submit</button>
        </form>
        <p>Submitted: \${submitCount} times</p>
        <button onclick="changeTitle" style="margin-top: 10px; padding: 8px;">
          Change Title (triggers re-render)
        </button>
      </div>
    `,handlers:{changeTitle:()=>{t.title=t.title==="User Form"?"Updated Form":"User Form"}},onMount:s=>{const p=s.querySelector("form");p.addEventListener("submit",d=>{d.preventDefault(),t.submitCount++,console.log("Form submitted!",{username:p.username.value,email:p.email.value,bio:p.bio.value})})},parent:o,className:"form-component"});return t}const y=o=>o.replace(/([A-Z])/g,"-$1").toLowerCase(),O=o=>o.replace(/-([a-z])/g,(t,s)=>s.toUpperCase()),v=o=>o==null||["string","number","boolean"].includes(typeof o);function m(o,{initialProps:t={},template:s,handlers:p={},shadow:d="open",reflect:l=!0,preserveInputState:b=!0,className:c="",containerTag:h="div",onMount:A,onCleanup:_,emitEvents:g=!0,batchRenders:P=!0}={}){if(customElements.get(o))return customElements.get(o);class C extends HTMLElement{static get observedAttributes(){return l?Object.keys(t).filter(e=>v(t[e])).map(y):[]}constructor(){super(),this._shadow=d?this.attachShadow({mode:d}):null,this._comp=null,this._propMap=Object.create(null),this._skipProxy=Object.create(null);for(const e of Object.keys(t))if(Object.prototype.hasOwnProperty.call(this,e)){try{this._propMap[e]=this[e]}catch{}const n=Object.getOwnPropertyDescriptor(this,e);if(n&&n.configurable===!1)this._skipProxy[e]=!0,console.info(`[${o}] Skipping proxy for non-configurable property "${e}" on host element; value preserved but future sets won't proxy to component.`);else try{delete this[e]}catch{this._skipProxy[e]=!0,console.warn(`[${o}] Skipping proxy for property "${e}" because it could not be deleted; value preserved on host element.`)}}for(const e of Object.keys(t))this._skipProxy&&this._skipProxy[e]||Object.defineProperty(this,e,{get:()=>this._comp?this._comp[e]:this._propMap[e],set:n=>{if(this._comp?this._comp[e]=n:this._propMap[e]=n,l&&v(n)){const a=y(e);typeof n=="boolean"?n?this.setAttribute(a,""):this.removeAttribute(a):this.setAttribute(a,String(n))}}})}connectedCallback(){if(this._comp)return;const e={...t};if(l)for(const i of Object.keys(t)){const r=y(i);this.hasAttribute(r)&&(e[i]=this._parseAttrValue(t[i],this.getAttribute(r)))}Object.assign(e,this._propMap);const n=this._shadow??this,a={};for(const[i,r]of Object.entries(p))a[i]=(...u)=>r.call(this._comp,...u);this._comp=k({initialProps:e,template:s,handlers:a,parent:n,containerTag:h,className:c,onMount:i=>{i.onAnyPropUpdated(({props:r,changedKeys:u})=>{if(g&&this.dispatchEvent(new CustomEvent("props-updated",{detail:{props:r,changedKeys:u},bubbles:!1,composed:!0})),l)for(const E of u){const f=r[E];if(v(f)){const x=y(E);typeof f=="boolean"?f?this.setAttribute(x,""):this.removeAttribute(x):this.setAttribute(x,String(f))}}}),i.onRender(r=>{g&&this.dispatchEvent(new CustomEvent("render",{detail:{props:r},bubbles:!1,composed:!0}))}),A?.(i)},onCleanup:_,autoAppend:!0,preserveInputState:b,emitEvents:g,batchRenders:P})}attributeChangedCallback(e,n,a){if(!this._comp)return;const i=O(e),r=t[i];if(r===void 0)return;const u=this._parseAttrValue(r,a);this._comp[i]=u}disconnectedCallback(){this._comp?.dispose(),this._comp=null}_parseAttrValue(e,n){return typeof e=="boolean"?n!==null:typeof e=="number"?Number(n):n}}return customElements.define(o,C),C}m("v-counter",{initialProps:{count:0,label:"Click me"},template:`
    <div style="padding: 20px; border: 2px solid #4CAF50; border-radius: 8px;">
      <h3>Web Component Counter</h3>
      <button onclick="increment" style="padding: 10px 20px; font-size: 16px;">
        \${label}: \${count}
      </button>
      <button onclick="reset" style="margin-left: 10px; padding: 10px;">
        Reset
      </button>
    </div>
  `,handlers:{increment:function(){this.count++},reset:function(){this.count=0}},shadow:"open",reflect:!0});m("v-form",{initialProps:{title:"Test Form"},template:`
    <div style="padding: 20px; border: 2px solid #2196F3; border-radius: 8px; margin-top: 20px;">
      <h3>\${title}</h3>
      <input type="text" placeholder="Type here..." style="display: block; margin: 10px 0; padding: 8px;">
      <button onclick="changeTitle" style="padding: 8px 16px;">
        Change Title (test input preservation)
      </button>
    </div>
  `,handlers:{changeTitle:function(){this.title=this.title==="Test Form"?"Updated Form":"Test Form"}},shadow:"open",reflect:!0,preserveInputState:!0});console.log("✅ Web Components defined: <v-counter> and <v-form>");const T=document.getElementById("app");S(T);D(T);setTimeout(()=>{const o=document.querySelector("v-counter");console.log("Web Component count:",o.count),o.count=100,console.log("Updated count to 100, attribute should reflect")},1e3);(function(){const t="x-nonconf-demo",s=document.createElement(t);Object.defineProperty(s,"foo",{value:"secret-demo",configurable:!1,writable:!0,enumerable:!0}),document.body.appendChild(s),m(t,{initialProps:{foo:""},template:"<div>${foo}</div>"}),console.info("x-nonconf-demo appended; check console for warning and the element content")})();(function(){const t="x-proxied-demo",s="x-skipped-demo",p=document.createElement("section");p.style.padding="12px",p.style.borderTop="1px solid #444",p.innerHTML=`
          <h3 style="margin:8px 0">Demo: proxied vs non-configurable property</h3>
          <div style="display:flex;gap:24px">
            <div id="proxied" style="flex:1">
              <strong>Proxied (configurable)</strong>
              <div id="proxied-host"></div>
              <button id="p-host-update">Set host property → HOST-UPDATED</button>
              <button id="p-attr-update">Set attribute → ATTR-UPDATED</button>
              <div>Rendered: <span id="p-render"></span></div>
            </div>
            <div id="skipped" style="flex:1">
              <strong>Skipped (non-configurable)</strong>
              <div id="skipped-host"></div>
              <button id="s-host-update">Set host property → HOST-UPDATED</button>
              <button id="s-attr-update">Set attribute → ATTR-UPDATED</button>
              <div>Rendered: <span id="s-render"></span></div>
            </div>
          </div>
        `,document.body.appendChild(p);const d=document.createElement(t);d.foo="proxied-initial",document.getElementById("proxied-host").appendChild(d);const l=document.createElement(s);Object.defineProperty(l,"foo",{value:"skipped-initial",configurable:!1,writable:!0,enumerable:!0}),document.getElementById("skipped-host").appendChild(l),m(t,{initialProps:{foo:""},template:"<div>${foo}</div>"}),m(s,{initialProps:{foo:""},template:"<div>${foo}</div>"});const b=h=>(h.shadowRoot??h).textContent.trim(),c=()=>{document.getElementById("p-render").textContent=b(d),document.getElementById("s-render").textContent=b(l)};document.getElementById("p-host-update").addEventListener("click",()=>{d.foo="HOST-UPDATED",c()}),document.getElementById("p-attr-update").addEventListener("click",()=>{d.setAttribute("foo","ATTR-UPDATED"),c()}),document.getElementById("s-host-update").addEventListener("click",()=>{l.foo="HOST-UPDATED",c()}),document.getElementById("s-attr-update").addEventListener("click",()=>{l.setAttribute("foo","ATTR-UPDATED"),c()}),setTimeout(c,50)})();
