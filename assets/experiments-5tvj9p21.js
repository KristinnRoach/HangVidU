import{c as g}from"./component-Syt-EVGP.js";function U(t){const e=g({initialProps:{count:0,label:"Click me"},template:`
      <div style="padding: 20px; text-align: center;">
        <h2>Counter POC</h2>
        <button onclick="increment" style="padding: 10px 20px; font-size: 18px;">
          \${label}: \${count}
        </button>
        <button onclick="reset" style="margin-left: 10px; padding: 10px;">
          Reset
        </button>
      </div>
    `,handlers:{increment:()=>e.count++,reset:()=>e.update({count:0})},parent:t,className:"counter-component"});return e}function O(t){const e=g({initialProps:{title:"User Form",submitCount:0},template:`
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
    `,handlers:{changeTitle:()=>{e.title=e.title==="User Form"?"Updated Form":"User Form"}},onMount:a=>{const p=a.querySelector("form");p.addEventListener("submit",u=>{u.preventDefault(),e.submitCount++,console.log("Form submitted!",{username:p.username.value,email:p.email.value,bio:p.bio.value})})},parent:t,className:"form-component"});return e}const m=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase(),S=t=>t.replace(/-([a-z])/g,(e,a)=>a.toUpperCase()),f=t=>t==null||["string","number","boolean"].includes(typeof t);function C(t,{initialProps:e={},template:a,handlers:p={},shadow:u="open",reflect:c=!0,preserveInputState:k=!0,className:v="",containerTag:A="div",onMount:F,onCleanup:T,emitEvents:b=!0,batchRenders:E=!0}={}){if(customElements.get(t))return customElements.get(t);class x extends HTMLElement{static get observedAttributes(){return c?Object.keys(e).filter(n=>f(e[n])).map(m):[]}constructor(){super(),this._shadow=u?this.attachShadow({mode:u}):null,this._comp=null,this._propMap=Object.create(null);for(const n of Object.keys(e))Object.defineProperty(this,n,{get:()=>this._comp?this._comp[n]:this._propMap[n],set:o=>{if(this._comp?this._comp[n]=o:this._propMap[n]=o,c&&f(o)){const s=m(n);typeof o=="boolean"?o?this.setAttribute(s,""):this.removeAttribute(s):this.setAttribute(s,String(o))}}})}connectedCallback(){if(this._comp)return;const n={...e};if(c)for(const i of Object.keys(e)){const r=m(i);this.hasAttribute(r)&&(n[i]=this._parseAttrValue(e[i],this.getAttribute(r)))}Object.assign(n,this._propMap);const o=this._shadow??this,s={};for(const[i,r]of Object.entries(p))s[i]=(...l)=>r.call(this._comp,...l);this._comp=g({initialProps:n,template:a,handlers:s,parent:o,containerTag:A,className:v,onMount:i=>{i.onAnyPropUpdated(({props:r,changedKeys:l})=>{if(b&&this.dispatchEvent(new CustomEvent("props-updated",{detail:{props:r,changedKeys:l},bubbles:!1,composed:!0})),c)for(const y of l){const d=r[y];if(f(d)){const h=m(y);typeof d=="boolean"?d?this.setAttribute(h,""):this.removeAttribute(h):this.setAttribute(h,String(d))}}}),i.onRender(r=>{b&&this.dispatchEvent(new CustomEvent("render",{detail:{props:r},bubbles:!1,composed:!0}))}),F?.(i)},onCleanup:T,autoAppend:!0,preserveInputState:k,emitEvents:b,batchRenders:E})}attributeChangedCallback(n,o,s){if(!this._comp)return;const i=S(n),r=e[i];if(r===void 0)return;const l=this._parseAttrValue(r,s);this._comp[i]=l}disconnectedCallback(){this._comp?.dispose(),this._comp=null}_parseAttrValue(n,o){return typeof n=="boolean"?o!==null:typeof n=="number"?Number(o):o}}return customElements.define(t,x),x}C("v-counter",{initialProps:{count:0,label:"Click me"},template:`
    <div style="padding: 20px; border: 2px solid #4CAF50; border-radius: 8px;">
      <h3>Web Component Counter</h3>
      <button onclick="increment" style="padding: 10px 20px; font-size: 16px;">
        \${label}: \${count}
      </button>
      <button onclick="reset" style="margin-left: 10px; padding: 10px;">
        Reset
      </button>
    </div>
  `,handlers:{increment:function(){this.count++},reset:function(){this.count=0}},shadow:"open",reflect:!0});C("v-form",{initialProps:{title:"Test Form"},template:`
    <div style="padding: 20px; border: 2px solid #2196F3; border-radius: 8px; margin-top: 20px;">
      <h3>\${title}</h3>
      <input type="text" placeholder="Type here..." style="display: block; margin: 10px 0; padding: 8px;">
      <button onclick="changeTitle" style="padding: 8px 16px;">
        Change Title (test input preservation)
      </button>
    </div>
  `,handlers:{changeTitle:function(){this.title=this.title==="Test Form"?"Updated Form":"Test Form"}},shadow:"open",reflect:!0,preserveInputState:!0});console.log("✅ Web Components defined: <v-counter> and <v-form>");const _=document.getElementById("app");U(_);O(_);setTimeout(()=>{const t=document.querySelector("v-counter");console.log("Web Component count:",t.count),t.count=100,console.log("Updated count to 100, attribute should reflect")},1e3);
