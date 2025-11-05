(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const yd="modulepreload",vd=function(n){return"/HangVidU/"+n},na={},Rc=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var o=l;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(t.map(u=>{if(u=vd(u),u in na)return;na[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":yd,d||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),d)return new Promise((g,m)=>{f.addEventListener("load",g),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};function wd(n,e){if(!n)return;const t=document.createElement("form");t.id="join-room-form";const i=document.createElement("p");i.id="join-room-label",i.textContent="Join existing room:";const s=document.createElement("div");s.style.display="flex",s.style.gap="10px";const r=document.createElement("input");r.type="text",r.id="room-id-input",r.placeholder="Enter Room ID";const o=document.createElement("button");o.type="submit",o.id="join-room-btn",o.title="Join existing room",o.textContent="Join",s.append(r,o),t.append(i,s),t.addEventListener("submit",async a=>{if(a.preventDefault(),typeof e=="function")try{await e(r.value||"")}catch(c){console.warn("joinRoomForm submit handler error",c)}}),n.innerHTML="",n.appendChild(t)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed=()=>{};var ia={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw dn(e)},dn=function(n){return new Error("Firebase Database ("+Ac.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Cd=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Br={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(t[u],t[d],t[h],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Nc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Cd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new bd;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const g=l<<6&192|d;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class bd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Pc=function(n){const e=Nc(n);return Br.encodeByteArray(e,!0)},Ri=function(n){return Pc(n).replace(/\./g,"")},Ai=function(n){try{return Br.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(n){return Lc(void 0,n)}function Lc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Td(t)||(n[t]=Lc(n[t],e[t]));return n}function Td(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kd=()=>Sd().__FIREBASE_DEFAULTS__,Rd=()=>{if(typeof process>"u"||typeof ia>"u")return;const n=ia.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ad=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ai(n[1]);return e&&JSON.parse(e)},Wr=()=>{try{return Ed()||kd()||Rd()||Ad()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Dc=n=>Wr()?.emulatorHosts?.[n],Nd=n=>{const e=Dc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Oc=()=>Wr()?.config,xc=n=>Wr()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Mc(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ri(JSON.stringify(t)),Ri(JSON.stringify(o)),""].join(".")}const An={};function Ld(){const n={prod:[],emulator:[]};for(const e of Object.keys(An))An[e]?n.emulator.push(e):n.prod.push(e);return n}function Dd(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let sa=!1;function Fc(n,e){if(typeof window>"u"||typeof document>"u"||!hn(window.location.host)||An[n]===e||An[n]||sa)return;An[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=Ld().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{sa=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=Dd(i),f=t("text"),g=document.getElementById(f)||document.createElement("span"),m=t("learnmore"),_=document.getElementById(m)||document.createElement("a"),b=t("preprendIcon"),A=document.getElementById(b)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const G=h.element;a(G),u(_,m);const E=l();c(A,b),G.append(A,g,_,E),document.body.appendChild(G)}r?(g.innerText="Preview backend disconnected.",A.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(A.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,g.innerText="Preview backend running in this workspace."),g.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $r(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ne())}function Od(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function xd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Uc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Md(){const n=ne();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Fd(){return Ac.NODE_ADMIN===!0}function Ud(){try{return typeof indexedDB=="object"}catch{return!1}}function Bd(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wd="FirebaseError";class gt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Wd,Object.setPrototypeOf(this,gt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ti.prototype.create)}}class ti{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?$d(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new gt(s,a,i)}}function $d(n,e){return n.replace(Vd,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Vd=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(n){return JSON.parse(n)}function z(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=$n(Ai(r[0])||""),t=$n(Ai(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Hd=function(n){const e=Bc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},jd=function(n){const e=Bc(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Zt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function ir(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ni(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function At(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(ra(r)&&ra(o)){if(!At(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function ra(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Gd(n,e){const t=new qd(n,e);return t.subscribe.bind(t)}class qd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Yd(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Ds),s.error===void 0&&(s.error=Ds),s.complete===void 0&&(s.complete=Ds);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Yd(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ds(){}function as(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kd=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},cs=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oe(n){return n&&n._delegate?n._delegate:n}class Nt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ei;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xd(e))try{this.getOrInitializeService({instanceIdentifier:yt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=yt){return this.instances.has(e)}getOptions(e=yt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Qd(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=yt){return this.component?this.component.multipleInstances?e:yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Qd(n){return n===yt?void 0:n}function Xd(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Jd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(P||(P={}));const eh={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},th=P.INFO,nh={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},ih=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=nh[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Vr{constructor(e){this.name=e,this._logLevel=th,this._logHandler=ih,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?eh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}const sh=(n,e)=>e.some(t=>n instanceof t);let oa,aa;function rh(){return oa||(oa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function oh(){return aa||(aa=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Wc=new WeakMap,sr=new WeakMap,$c=new WeakMap,Os=new WeakMap,Hr=new WeakMap;function ah(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ot(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Wc.set(t,n)}).catch(()=>{}),Hr.set(e,n),e}function ch(n){if(sr.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});sr.set(n,e)}let rr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return sr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||$c.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function lh(n){rr=n(rr)}function uh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(xs(this),e,...t);return $c.set(i,e.sort?e.sort():[e]),ot(i)}:oh().includes(n)?function(...e){return n.apply(xs(this),e),ot(Wc.get(this))}:function(...e){return ot(n.apply(xs(this),e))}}function dh(n){return typeof n=="function"?uh(n):(n instanceof IDBTransaction&&ch(n),sh(n,rh())?new Proxy(n,rr):n)}function ot(n){if(n instanceof IDBRequest)return ah(n);if(Os.has(n))return Os.get(n);const e=dh(n);return e!==n&&(Os.set(n,e),Hr.set(e,n)),e}const xs=n=>Hr.get(n);function hh(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=ot(o);return i&&o.addEventListener("upgradeneeded",c=>{i(ot(o.result),c.oldVersion,c.newVersion,ot(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const fh=["get","getKey","getAll","getAllKeys","count"],ph=["put","add","delete","clear"],Ms=new Map;function ca(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ms.get(e))return Ms.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=ph.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||fh.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return Ms.set(e,r),r}lh(n=>({...n,get:(e,t,i)=>ca(e,t)||n.get(e,t,i),has:(e,t)=>!!ca(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(mh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function mh(n){return n.getComponent()?.type==="VERSION"}const or="@firebase/app",la="0.14.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ue=new Vr("@firebase/app"),_h="@firebase/app-compat",yh="@firebase/analytics-compat",vh="@firebase/analytics",wh="@firebase/app-check-compat",Eh="@firebase/app-check",Ch="@firebase/auth",bh="@firebase/auth-compat",Ih="@firebase/database",Th="@firebase/data-connect",Sh="@firebase/database-compat",kh="@firebase/functions",Rh="@firebase/functions-compat",Ah="@firebase/installations",Nh="@firebase/installations-compat",Ph="@firebase/messaging",Lh="@firebase/messaging-compat",Dh="@firebase/performance",Oh="@firebase/performance-compat",xh="@firebase/remote-config",Mh="@firebase/remote-config-compat",Fh="@firebase/storage",Uh="@firebase/storage-compat",Bh="@firebase/firestore",Wh="@firebase/ai",$h="@firebase/firestore-compat",Vh="firebase",Hh="12.5.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar="[DEFAULT]",jh={[or]:"fire-core",[_h]:"fire-core-compat",[vh]:"fire-analytics",[yh]:"fire-analytics-compat",[Eh]:"fire-app-check",[wh]:"fire-app-check-compat",[Ch]:"fire-auth",[bh]:"fire-auth-compat",[Ih]:"fire-rtdb",[Th]:"fire-data-connect",[Sh]:"fire-rtdb-compat",[kh]:"fire-fn",[Rh]:"fire-fn-compat",[Ah]:"fire-iid",[Nh]:"fire-iid-compat",[Ph]:"fire-fcm",[Lh]:"fire-fcm-compat",[Dh]:"fire-perf",[Oh]:"fire-perf-compat",[xh]:"fire-rc",[Mh]:"fire-rc-compat",[Fh]:"fire-gcs",[Uh]:"fire-gcs-compat",[Bh]:"fire-fst",[$h]:"fire-fst-compat",[Wh]:"fire-vertex","fire-js":"fire-js",[Vh]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=new Map,zh=new Map,cr=new Map;function ua(n,e){try{n.container.addComponent(e)}catch(t){Ue.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function en(n){const e=n.name;if(cr.has(e))return Ue.debug(`There were multiple attempts to register component ${e}.`),!1;cr.set(e,n);for(const t of Pi.values())ua(t,n);for(const t of zh.values())ua(t,n);return!0}function jr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function pe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},at=new ti("app","Firebase",Gh);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Nt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw at.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=Hh;function Vc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:ar,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw at.create("bad-app-name",{appName:String(s)});if(t||(t=Oc()),!t)throw at.create("no-options");const r=Pi.get(s);if(r){if(At(t,r.options)&&At(i,r.config))return r;throw at.create("duplicate-app",{appName:s})}const o=new Zd(s);for(const c of cr.values())o.addComponent(c);const a=new qh(t,i,o);return Pi.set(s,a),a}function Hc(n=ar){const e=Pi.get(n);if(!e&&n===ar&&Oc())return Vc();if(!e)throw at.create("no-app",{appName:n});return e}function ct(n,e,t){let i=jh[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ue.warn(o.join(" "));return}en(new Nt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh="firebase-heartbeat-database",Kh=1,Vn="firebase-heartbeat-store";let Fs=null;function jc(){return Fs||(Fs=hh(Yh,Kh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vn)}catch(t){console.warn(t)}}}}).catch(n=>{throw at.create("idb-open",{originalErrorMessage:n.message})})),Fs}async function Jh(n){try{const t=(await jc()).transaction(Vn),i=await t.objectStore(Vn).get(zc(n));return await t.done,i}catch(e){if(e instanceof gt)Ue.warn(e.message);else{const t=at.create("idb-get",{originalErrorMessage:e?.message});Ue.warn(t.message)}}}async function da(n,e){try{const i=(await jc()).transaction(Vn,"readwrite");await i.objectStore(Vn).put(e,zc(n)),await i.done}catch(t){if(t instanceof gt)Ue.warn(t.message);else{const i=at.create("idb-set",{originalErrorMessage:t?.message});Ue.warn(i.message)}}}function zc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=1024,Xh=30;class Zh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new tf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ha();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Xh){const s=nf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ue.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ha(),{heartbeatsToSend:t,unsentEntries:i}=ef(this._heartbeatsCache.heartbeats),s=Ri(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ue.warn(e),""}}}function ha(){return new Date().toISOString().substring(0,10)}function ef(n,e=Qh){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),fa(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),fa(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class tf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ud()?Bd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Jh(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return da(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return da(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function fa(n){return Ri(JSON.stringify({version:2,heartbeats:n})).length}function nf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(n){en(new Nt("platform-logger",e=>new gh(e),"PRIVATE")),en(new Nt("heartbeat",e=>new Zh(e),"PRIVATE")),ct(or,la,n),ct(or,la,"esm2020"),ct("fire-js","")}sf("");var pa={};const ga="@firebase/database",ma="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gc="";function rf(n){Gc=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),z(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:$n(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class af{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Pe(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new of(e)}}catch{}return new af},Et=qc("localStorage"),cf=qc("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht=new Vr("@firebase/database"),lf=(function(){let n=1;return function(){return n++}})(),Yc=function(n){const e=Kd(n),t=new zd;t.update(e);const i=t.digest();return Br.encodeByteArray(i)},ni=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=ni.apply(null,i):typeof i=="object"?e+=z(i):e+=i,e+=" "}return e};let Nn=null,_a=!0;const uf=function(n,e){p(!0,"Can't turn on custom loggers persistently."),Ht.logLevel=P.VERBOSE,Nn=Ht.log.bind(Ht)},J=function(...n){if(_a===!0&&(_a=!1,Nn===null&&cf.get("logging_enabled")===!0&&uf()),Nn){const e=ni.apply(null,n);Nn(e)}},ii=function(n){return function(...e){J(n,...e)}},lr=function(...n){const e="FIREBASE INTERNAL ERROR: "+ni(...n);Ht.error(e)},Be=function(...n){const e=`FIREBASE FATAL ERROR: ${ni(...n)}`;throw Ht.error(e),new Error(e)},te=function(...n){const e="FIREBASE WARNING: "+ni(...n);Ht.warn(e)},df=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&te("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},zr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},hf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},tn="[MIN_NAME]",Pt="[MAX_NAME]",xt=function(n,e){if(n===e)return 0;if(n===tn||e===Pt)return-1;if(e===tn||n===Pt)return 1;{const t=ya(n),i=ya(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},ff=function(n,e){return n===e?0:n<e?-1:1},En=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+z(e))},Gr=function(n){if(typeof n!="object"||n===null)return z(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=z(e[i]),t+=":",t+=Gr(n[e[i]]);return t+="}",t},Kc=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Q(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Jc=function(n){p(!zr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},pf=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},gf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function mf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const _f=new RegExp("^-?(0*)\\d{1,10}$"),yf=-2147483648,vf=2147483647,ya=function(n){if(_f.test(n)){const e=Number(n);if(e>=yf&&e<=vf)return e}return null},gn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw te("Exception was thrown by user callback.",t),e},Math.floor(0))}},wf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Pn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,pe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){te(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(J("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',te(e)}}class Ei{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ei.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr="5",Qc="v",Xc="s",Zc="r",el="f",tl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,nl="ls",il="p",ur="ac",sl="websocket",rl="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Et.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Et.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function bf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function al(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===sl)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===rl)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);bf(n)&&(t.ns=n.namespace);const s=[];return Q(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(){this.counters_={}}incrementCounter(e,t=1){Pe(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Id(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us={},Bs={};function Yr(n){const e=n.toString();return Us[e]||(Us[e]=new If),Us[e]}function Tf(n,e){const t=n.toString();return Bs[t]||(Bs[t]=e()),Bs[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&gn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="start",kf="close",Rf="pLPCommand",Af="pRTLPCB",cl="id",ll="pw",ul="ser",Nf="cb",Pf="seg",Lf="ts",Df="d",Of="dframe",dl=1870,hl=30,xf=dl-hl,Mf=25e3,Ff=3e4;class Wt{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ii(e),this.stats_=Yr(t),this.urlFn=c=>(this.appCheckToken&&(c[ur]=this.appCheckToken),al(t,rl,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Sf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ff)),hf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Kr((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===va)this.id=a,this.password=c;else if(o===kf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[va]="t",i[ul]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Nf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Qc]=qr,this.transportSessionId&&(i[Xc]=this.transportSessionId),this.lastSessionId&&(i[nl]=this.lastSessionId),this.applicationId&&(i[il]=this.applicationId),this.appCheckToken&&(i[ur]=this.appCheckToken),typeof location<"u"&&location.hostname&&tl.test(location.hostname)&&(i[Zc]=el);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Wt.forceAllow_=!0}static forceDisallow(){Wt.forceDisallow_=!0}static isAvailable(){return Wt.forceAllow_?!0:!Wt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!pf()&&!gf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Pc(t),s=Kc(i,xf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Of]="t",i[cl]=e,i[ll]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=z(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Kr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=lf(),window[Rf+this.uniqueCallbackIdentifier]=e,window[Af+this.uniqueCallbackIdentifier]=t,this.myIFrame=Kr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){J("frame writing exception"),a.stack&&J(a.stack),J(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||J("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[cl]=this.myID,e[ll]=this.myPW,e[ul]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+hl+i.length<=dl;){const o=this.pendingSegs.shift();i=i+"&"+Pf+s+"="+o.seg+"&"+Lf+s+"="+o.ts+"&"+Df+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Mf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{J("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uf=16384,Bf=45e3;let Li=null;typeof MozWebSocket<"u"?Li=MozWebSocket:typeof WebSocket<"u"&&(Li=WebSocket);class ge{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ii(this.connId),this.stats_=Yr(t),this.connURL=ge.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Qc]=qr,typeof location<"u"&&location.hostname&&tl.test(location.hostname)&&(o[Zc]=el),t&&(o[Xc]=t),i&&(o[nl]=i),s&&(o[ur]=s),r&&(o[il]=r),al(e,sl,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Et.set("previous_websocket_failure",!0);try{let i;Fd(),this.mySock=new Li(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ge.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Li!==null&&!ge.forceDisallow_}static previouslyFailed(){return Et.isInMemoryStorage||Et.get("previous_websocket_failure")===!0}markConnectionHealthy(){Et.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=$n(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Kc(t,Uf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Bf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ge.responsesRequiredToBeHealthy=2;ge.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{static get ALL_TRANSPORTS(){return[Wt,ge]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ge&&ge.isAvailable();let i=t&&!ge.previouslyFailed();if(e.webSocketOnly&&(t||te("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ge];else{const s=this.transports_=[];for(const r of Hn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Hn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Hn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=6e4,$f=5e3,Vf=10*1024,Hf=100*1024,Ws="t",wa="d",jf="s",Ea="r",zf="e",Ca="o",ba="a",Ia="n",Ta="p",Gf="h";class qf{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ii("c:"+this.id+":"),this.transportManager_=new Hn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Pn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Hf?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Vf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ws in e){const t=e[Ws];t===ba?this.upgradeIfSecondaryHealthy_():t===Ea?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ca&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=En("t",e),i=En("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ta,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ba,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ia,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=En("t",e),i=En("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=En(Ws,e);if(wa in e){const i=e[wa];if(t===Gf){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Ia){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===jf?this.onConnectionShutdown_(i):t===Ea?this.onReset_(i):t===zf?lr("Server Error: "+i):t===Ca?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):lr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),qr!==i&&te("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Pn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Wf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Pn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor($f))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ta,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Et.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di extends pl{static getInstance(){return new Di}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$r()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa=32,ka=768;class L{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function R(){return new L("")}function I(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function dt(n){return n.pieces_.length-n.pieceNum_}function x(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new L(n.pieces_,e)}function Jr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Yf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function jn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function gl(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new L(e,0)}function $(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof L)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new L(t,0)}function S(n){return n.pieceNum_>=n.pieces_.length}function ee(n,e){const t=I(n),i=I(e);if(t===null)return e;if(t===i)return ee(x(n),x(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Kf(n,e){const t=jn(n,0),i=jn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=xt(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Qr(n,e){if(dt(n)!==dt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function le(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(dt(n)>dt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Jf{constructor(e,t){this.errorPrefix_=t,this.parts_=jn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=cs(this.parts_[i]);ml(this)}}function Qf(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=cs(e),ml(n)}function Xf(n){const e=n.parts_.pop();n.byteLength_-=cs(e),n.parts_.length>0&&(n.byteLength_-=1)}function ml(n){if(n.byteLength_>ka)throw new Error(n.errorPrefix_+"has a key path longer than "+ka+" bytes ("+n.byteLength_+").");if(n.parts_.length>Sa)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Sa+") or object contains a cycle "+vt(n))}function vt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr extends pl{static getInstance(){return new Xr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn=1e3,Zf=300*1e3,Ra=30*1e3,ep=1.3,tp=3e4,np="server_kill",Aa=3;class Fe extends fl{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Fe.nextPersistentConnectionId_++,this.log_=ii("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Cn,this.maxReconnectDelay_=Zf,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Xr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Di.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(z(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ei,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Fe.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Pe(e,"w")){const i=Zt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();te(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||jd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ra)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Hd(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+z(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):lr("Unrecognized action received from server: "+z(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Cn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Cn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>tp&&(this.reconnectDelay_=Cn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*ep)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Fe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?J("getToken() completed but was canceled"):(J("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new qf(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{te(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(np)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&te(d),c())}}}interrupt(e){J("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){J("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ir(this.interruptReasons_)&&(this.reconnectDelay_=Cn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Gr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new L(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){J("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Aa&&(this.reconnectDelay_=Ra,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){J("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Aa&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Gc.replace(/\./g,"-")]=1,$r()?e["framework.cordova"]=1:Uc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Di.getInstance().currentlyOnline();return ir(this.interruptReasons_)&&e}}Fe.nextPersistentConnectionId_=0;Fe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new T(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ls{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new T(tn,e),s=new T(tn,t);return this.compare(i,s)!==0}minPost(){return T.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gi;class _l extends ls{static get __EMPTY_NODE(){return gi}static set __EMPTY_NODE(e){gi=e}compare(e,t){return xt(e.name,t.name)}isDefinedOn(e){throw dn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return T.MIN}maxPost(){return new T(Pt,gi)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new T(e,gi)}toString(){return".key"}}const jt=new _l;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Y{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Y.RED,this.left=s??re.EMPTY_NODE,this.right=r??re.EMPTY_NODE}copy(e,t,i,s,r){return new Y(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return re.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return re.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Y.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Y.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Y.RED=!0;Y.BLACK=!1;class ip{copy(e,t,i,s,r){return this}insert(e,t,i){return new Y(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class re{constructor(e,t=re.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new re(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Y.BLACK,null,null))}remove(e){return new re(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Y.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new mi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new mi(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new mi(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new mi(this.root_,null,this.comparator_,!0,e)}}re.EMPTY_NODE=new ip;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sp(n,e){return xt(n.name,e.name)}function Zr(n,e){return xt(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dr;function rp(n){dr=n}const yl=function(n){return typeof n=="number"?"number:"+Jc(n):"string:"+n},vl=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Pe(e,".sv"),"Priority must be a string or number.")}else p(n===dr||n.isEmpty(),"priority of unexpected type.");p(n===dr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Na;class q{static set __childrenNodeConstructor(e){Na=e}static get __childrenNodeConstructor(){return Na}constructor(e,t=q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),vl(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return S(e)?this:I(e)===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=I(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||dt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,q.__childrenNodeConstructor.EMPTY_NODE.updateChild(x(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+yl(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Jc(this.value_):e+=this.value_,this.lazyHash_=Yc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof q.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=q.VALUE_TYPE_ORDER.indexOf(t),r=q.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wl,El;function op(n){wl=n}function ap(n){El=n}class cp extends ls{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?xt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return T.MIN}maxPost(){return new T(Pt,new q("[PRIORITY-POST]",El))}makePost(e,t){const i=wl(e);return new T(t,new q("[PRIORITY-POST]",i))}toString(){return".priority"}}const V=new cp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp=Math.log(2);class up{constructor(e){const t=r=>parseInt(Math.log(r)/lp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Oi=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=n[c],h=t?t(d):d,new Y(h,d.node,Y.BLACK,null,null);{const f=parseInt(u/2,10)+c,g=s(c,f),m=s(f+1,l);return d=n[f],h=t?t(d):d,new Y(h,d.node,Y.BLACK,g,m)}},r=function(c){let l=null,u=null,d=n.length;const h=function(g,m){const _=d-g,b=d;d-=g;const A=s(_+1,b),G=n[_],E=t?t(G):G;f(new Y(E,G.node,m,null,A))},f=function(g){l?(l.left=g,l=g):(u=g,l=g)};for(let g=0;g<c.count;++g){const m=c.nextBitIsOne(),_=Math.pow(2,c.count-(g+1));m?h(_,Y.BLACK):(h(_,Y.BLACK),h(_,Y.RED))}return u},o=new up(n.length),a=r(o);return new re(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $s;const Bt={};class Oe{static get Default(){return p(Bt&&V,"ChildrenNode.ts has not been loaded"),$s=$s||new Oe({".priority":Bt},{".priority":V}),$s}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Zt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof re?t:null}hasIndex(e){return Pe(this.indexSet_,e.toString())}addIndex(e,t){p(e!==jt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(T.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Oi(i,e.getCompare()):a=Bt;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Oe(u,l)}addToIndexes(e,t){const i=Ni(this.indexes_,(s,r)=>{const o=Zt(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Bt)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(T.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Oi(a,o.getCompare())}else return Bt;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new T(e.name,a))),c.insert(e,e.node)}});return new Oe(i,this.indexSet_)}removeFromIndexes(e,t){const i=Ni(this.indexes_,s=>{if(s===Bt)return s;{const r=t.get(e.name);return r?s.remove(new T(e.name,r)):s}});return new Oe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bn;class v{static get EMPTY_NODE(){return bn||(bn=new v(new re(Zr),null,Oe.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&vl(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||bn}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?bn:t}}getChild(e){const t=I(e);return t===null?this:this.getImmediateChild(t).getChild(x(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new T(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?bn:this.priorityNode_;return new v(s,o,r)}}updateChild(e,t){const i=I(e);if(i===null)return t;{p(I(e)!==".priority"||dt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(x(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(V,(o,a)=>{t[o]=a.val(e),i++,r&&v.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+yl(this.getPriority().val())+":"),this.forEachChild(V,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Yc(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new T(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new T(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new T(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,T.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,T.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===si?-1:0}withIndex(e){if(e===jt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===jt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(V),s=t.getIterator(V);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===jt?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class dp extends v{constructor(){super(new re(Zr),v.EMPTY_NODE,Oe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const si=new dp;Object.defineProperties(T,{MIN:{value:new T(tn,v.EMPTY_NODE)},MAX:{value:new T(Pt,si)}});_l.__EMPTY_NODE=v.EMPTY_NODE;q.__childrenNodeConstructor=v;rp(si);ap(si);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=!0;function j(n,e=null){if(n===null)return v.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new q(t,j(e))}if(!(n instanceof Array)&&hp){const t=[];let i=!1;if(Q(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=j(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new T(o,c)))}}),t.length===0)return v.EMPTY_NODE;const r=Oi(t,sp,o=>o.name,Zr);if(i){const o=Oi(t,V.getCompare());return new v(r,j(e),new Oe({".priority":o},{".priority":V}))}else return new v(r,j(e),Oe.Default)}else{let t=v.EMPTY_NODE;return Q(n,(i,s)=>{if(Pe(n,i)&&i.substring(0,1)!=="."){const r=j(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(j(e))}}op(j);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp extends ls{constructor(e){super(),this.indexPath_=e,p(!S(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?xt(e.name,t.name):r}makePost(e,t){const i=j(e),s=v.EMPTY_NODE.updateChild(this.indexPath_,i);return new T(t,s)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,si);return new T(Pt,e)}toString(){return jn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp extends ls{compare(e,t){const i=e.node.compareTo(t.node);return i===0?xt(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return T.MIN}maxPost(){return T.MAX}makePost(e,t){const i=j(e);return new T(t,i)}toString(){return".value"}}const gp=new pp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(n){return{type:"value",snapshotNode:n}}function nn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function zn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Gn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function mp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(zn(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(nn(t,i)):o.trackChildChange(Gn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(V,(s,r)=>{t.hasChild(s)||i.trackChildChange(zn(s,r))}),t.isLeafNode()||t.forEachChild(V,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Gn(s,r,o))}else i.trackChildChange(nn(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e){this.indexedFilter_=new eo(e.getIndex()),this.index_=e.getIndex(),this.startPost_=qn.getStartPost_(e),this.endPost_=qn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new T(t,i))||(i=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=v.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(v.EMPTY_NODE);const r=this;return t.forEachChild(V,(o,a)=>{r.matches(new T(o,a))||(s=s.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new qn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new T(t,i))||(i=v.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const c=new T(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Gn(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(zn(t,d));const m=a.updateImmediateChild(t,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(nn(h.name,h.node)),m.updateImmediateChild(h.name,h.node)):m}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(zn(l.name,l.node)),r.trackChildChange(nn(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=V}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:tn}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Pt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===V}copy(){const e=new to;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function yp(n){return n.loadsAllData()?new eo(n.getIndex()):n.hasLimit()?new _p(n):new qn(n)}function Pa(n){const e={};if(n.isDefault())return e;let t;if(n.index_===V?t="$priority":n.index_===gp?t="$value":n.index_===jt?t="$key":(p(n.index_ instanceof fp,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=z(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=z(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+z(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=z(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+z(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function La(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==V&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi extends fl{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=ii("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=xi.getListenId_(e,i),a={};this.listens_[o]=a;const c=Pa(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Zt(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,t){const i=xi.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Pa(e._queryParams),i=e._path.toString(),s=new ei;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+fn(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=$n(a.responseText)}catch{te("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&te("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mi(){return{value:null,children:new Map}}function bl(n,e,t){if(S(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=I(e);n.children.has(i)||n.children.set(i,Mi());const s=n.children.get(i);e=x(e),bl(s,e,t)}}function hr(n,e,t){n.value!==null?t(e,n.value):wp(n,(i,s)=>{const r=new L(e.toString()+"/"+i);hr(s,r,t)})}function wp(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Q(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da=10*1e3,Cp=30*1e3,bp=300*1e3;class Ip{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Ep(e);const i=Da+(Cp-Da)*Math.random();Pn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Q(e,(s,r)=>{r>0&&Pe(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Pn(this.reportStats_.bind(this),Math.floor(Math.random()*2*bp))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ye||(ye={}));function no(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function io(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function so(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ye.ACK_USER_WRITE,this.source=no()}operationForChild(e){if(S(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new L(e));return new Fi(R(),t,this.revert)}}else return p(I(this.path)===e,"operationForChild called for unrelated child."),new Fi(x(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,t){this.source=e,this.path=t,this.type=ye.LISTEN_COMPLETE}operationForChild(e){return S(this.path)?new Yn(this.source,R()):new Yn(this.source,x(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ye.OVERWRITE}operationForChild(e){return S(this.path)?new Lt(this.source,R(),this.snap.getImmediateChild(e)):new Lt(this.source,x(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ye.MERGE}operationForChild(e){if(S(this.path)){const t=this.children.subtree(new L(e));return t.isEmpty()?null:t.value?new Lt(this.source,R(),t.value):new sn(this.source,R(),t)}else return p(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new sn(this.source,x(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(S(e))return this.isFullyInitialized()&&!this.filtered_;const t=I(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Sp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(mp(o.childName,o.snapshotNode))}),In(n,s,"child_removed",e,i,t),In(n,s,"child_added",e,i,t),In(n,s,"child_moved",r,i,t),In(n,s,"child_changed",e,i,t),In(n,s,"value",e,i,t),s}function In(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>Rp(n,a,c)),o.forEach(a=>{const c=kp(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function kp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Rp(n,e,t){if(e.childName==null||t.childName==null)throw dn("Should only compare child_ events.");const i=new T(e.childName,e.snapshotNode),s=new T(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function us(n,e){return{eventCache:n,serverCache:e}}function Ln(n,e,t,i){return us(new ht(e,t,i),n.serverCache)}function Il(n,e,t,i){return us(n.eventCache,new ht(e,t,i))}function Ui(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Dt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vs;const Ap=()=>(Vs||(Vs=new re(ff)),Vs);class D{static fromObject(e){let t=new D(null);return Q(e,(i,s)=>{t=t.set(new L(i),s)}),t}constructor(e,t=Ap()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:R(),value:this.value};if(S(e))return null;{const i=I(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(x(e),t);return r!=null?{path:$(new L(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(S(e))return this;{const t=I(e),i=this.children.get(t);return i!==null?i.subtree(x(e)):new D(null)}}set(e,t){if(S(e))return new D(t,this.children);{const i=I(e),r=(this.children.get(i)||new D(null)).set(x(e),t),o=this.children.insert(i,r);return new D(this.value,o)}}remove(e){if(S(e))return this.children.isEmpty()?new D(null):new D(null,this.children);{const t=I(e),i=this.children.get(t);if(i){const s=i.remove(x(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new D(null):new D(this.value,r)}else return this}}get(e){if(S(e))return this.value;{const t=I(e),i=this.children.get(t);return i?i.get(x(e)):null}}setTree(e,t){if(S(e))return t;{const i=I(e),r=(this.children.get(i)||new D(null)).setTree(x(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new D(this.value,o)}}fold(e){return this.fold_(R(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_($(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,R(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(S(e))return null;{const r=I(e),o=this.children.get(r);return o?o.findOnPath_(x(e),$(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,R(),t)}foreachOnPath_(e,t,i){if(S(e))return this;{this.value&&i(t,this.value);const s=I(e),r=this.children.get(s);return r?r.foreachOnPath_(x(e),$(t,s),i):new D(null)}}foreach(e){this.foreach_(R(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_($(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e){this.writeTree_=e}static empty(){return new we(new D(null))}}function Dn(n,e,t){if(S(e))return new we(new D(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ee(s,e);return r=r.updateChild(o,t),new we(n.writeTree_.set(s,r))}else{const s=new D(t),r=n.writeTree_.setTree(e,s);return new we(r)}}}function fr(n,e,t){let i=n;return Q(t,(s,r)=>{i=Dn(i,$(e,s),r)}),i}function Oa(n,e){if(S(e))return we.empty();{const t=n.writeTree_.setTree(e,new D(null));return new we(t)}}function pr(n,e){return Mt(n,e)!=null}function Mt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(ee(t.path,e)):null}function xa(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(V,(i,s)=>{e.push(new T(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new T(i,s.value))}),e}function lt(n,e){if(S(e))return n;{const t=Mt(n,e);return t!=null?new we(new D(t)):new we(n.writeTree_.subtree(e))}}function gr(n){return n.writeTree_.isEmpty()}function rn(n,e){return Tl(R(),n.writeTree_,e)}function Tl(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Tl($(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild($(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(n,e){return Al(e,n)}function Np(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Dn(n.visibleWrites,e,t)),n.lastWriteId=i}function Pp(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=fr(n.visibleWrites,e,t),n.lastWriteId=i}function Lp(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Dp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Op(a,i.path)?s=!1:le(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return xp(n),!0;if(i.snap)n.visibleWrites=Oa(n.visibleWrites,i.path);else{const a=i.children;Q(a,c=>{n.visibleWrites=Oa(n.visibleWrites,$(i.path,c))})}return!0}else return!1}function Op(n,e){if(n.snap)return le(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&le($(n.path,t),e))return!0;return!1}function xp(n){n.visibleWrites=Sl(n.allWrites,Mp,R()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Mp(n){return n.visible}function Sl(n,e,t){let i=we.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)le(t,o)?(a=ee(t,o),i=Dn(i,a,r.snap)):le(o,t)&&(a=ee(o,t),i=Dn(i,R(),r.snap.getChild(a)));else if(r.children){if(le(t,o))a=ee(t,o),i=fr(i,a,r.children);else if(le(o,t))if(a=ee(o,t),S(a))i=fr(i,R(),r.children);else{const c=Zt(r.children,I(a));if(c){const l=c.getChild(x(a));i=Dn(i,R(),l)}}}else throw dn("WriteRecord should have .snap or .children")}}return i}function kl(n,e,t,i,s){if(!i&&!s){const r=Mt(n.visibleWrites,e);if(r!=null)return r;{const o=lt(n.visibleWrites,e);if(gr(o))return t;if(t==null&&!pr(o,R()))return null;{const a=t||v.EMPTY_NODE;return rn(o,a)}}}else{const r=lt(n.visibleWrites,e);if(!s&&gr(r))return t;if(!s&&t==null&&!pr(r,R()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(le(l.path,e)||le(e,l.path))},a=Sl(n.allWrites,o,e),c=t||v.EMPTY_NODE;return rn(a,c)}}}function Fp(n,e,t){let i=v.EMPTY_NODE;const s=Mt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(V,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=lt(n.visibleWrites,e);return t.forEachChild(V,(o,a)=>{const c=rn(lt(r,new L(o)),a);i=i.updateImmediateChild(o,c)}),xa(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=lt(n.visibleWrites,e);return xa(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Up(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=$(e,t);if(pr(n.visibleWrites,r))return null;{const o=lt(n.visibleWrites,r);return gr(o)?s.getChild(t):rn(o,s.getChild(t))}}function Bp(n,e,t,i){const s=$(e,t),r=Mt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=lt(n.visibleWrites,s);return rn(o,i.getNode().getImmediateChild(t))}else return null}function Wp(n,e){return Mt(n.visibleWrites,e)}function $p(n,e,t,i,s,r,o){let a;const c=lt(n.visibleWrites,e),l=Mt(c,R());if(l!=null)a=l;else if(t!=null)a=rn(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function Vp(){return{visibleWrites:we.empty(),allWrites:[],lastWriteId:-1}}function Bi(n,e,t,i){return kl(n.writeTree,n.treePath,e,t,i)}function ro(n,e){return Fp(n.writeTree,n.treePath,e)}function Ma(n,e,t,i){return Up(n.writeTree,n.treePath,e,t,i)}function Wi(n,e){return Wp(n.writeTree,$(n.treePath,e))}function Hp(n,e,t,i,s,r){return $p(n.writeTree,n.treePath,e,t,i,s,r)}function oo(n,e,t){return Bp(n.writeTree,n.treePath,e,t)}function Rl(n,e){return Al($(n.treePath,e),n.writeTree)}function Al(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Gn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,zn(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,nn(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Gn(i,e.snapshotNode,s.oldSnap));else throw dn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Nl=new zp;class ao{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ht(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return oo(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Dt(this.viewCache_),r=Hp(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gp(n){return{filter:n}}function qp(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Yp(n,e,t,i,s){const r=new jp;let o,a;if(t.type===ye.OVERWRITE){const l=t;l.source.fromUser?o=mr(n,e,l.path,l.snap,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!S(l.path),o=$i(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===ye.MERGE){const l=t;l.source.fromUser?o=Jp(n,e,l.path,l.children,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=_r(n,e,l.path,l.children,i,s,a,r))}else if(t.type===ye.ACK_USER_WRITE){const l=t;l.revert?o=Zp(n,e,l.path,i,s,r):o=Qp(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===ye.LISTEN_COMPLETE)o=Xp(n,e,t.path,i,r);else throw dn("Unknown operation type: "+t.type);const c=r.getChanges();return Kp(e,o,c),{viewCache:o,changes:c}}function Kp(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Ui(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Cl(Ui(e)))}}function Pl(n,e,t,i,s,r){const o=e.eventCache;if(Wi(i,t)!=null)return e;{let a,c;if(S(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Dt(e),u=l instanceof v?l:v.EMPTY_NODE,d=ro(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Bi(i,Dt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=I(t);if(l===".priority"){p(dt(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Ma(i,t,u,c);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=x(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Ma(i,t,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=oo(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return Ln(e,a,o.isFullyInitialized()||S(t),n.filter.filtersNodes())}}function $i(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(S(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(t);if(!c.isCompleteForPath(t)&&dt(t)>1)return e;const g=x(t),_=c.getNode().getImmediateChild(f).updateChild(g,i);f===".priority"?l=u.updatePriority(c.getNode(),_):l=u.updateChild(c.getNode(),f,_,g,Nl,null)}const d=Il(e,l,c.isFullyInitialized()||S(t),u.filtersNodes()),h=new ao(s,d,r);return Pl(n,d,t,s,h,a)}function mr(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new ao(s,e,r);if(S(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Ln(e,l,!0,n.filter.filtersNodes());else{const d=I(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=Ln(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=x(t),f=a.getNode().getImmediateChild(d);let g;if(S(h))g=i;else{const m=u.getCompleteChild(d);m!=null?Jr(h)===".priority"&&m.getChild(gl(h)).isEmpty()?g=m:g=m.updateChild(h,i):g=v.EMPTY_NODE}if(f.equals(g))c=e;else{const m=n.filter.updateChild(a.getNode(),d,g,h,u,o);c=Ln(e,m,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function Fa(n,e){return n.eventCache.isCompleteForChild(e)}function Jp(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=$(t,c);Fa(e,I(u))&&(a=mr(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=$(t,c);Fa(e,I(u))||(a=mr(n,a,u,l,s,r,o))}),a}function Ua(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function _r(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;S(t)?l=i:l=new D(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),g=Ua(n,f,h);c=$i(n,c,new L(d),g,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const g=e.serverCache.getNode().getImmediateChild(d),m=Ua(n,g,h);c=$i(n,c,new L(d),m,s,r,o,a)}}),c}function Qp(n,e,t,i,s,r,o){if(Wi(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(S(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return $i(n,e,t,c.getNode().getChild(t),s,r,a,o);if(S(t)){let l=new D(null);return c.getNode().forEachChild(jt,(u,d)=>{l=l.set(new L(u),d)}),_r(n,e,t,l,s,r,a,o)}else return e}else{let l=new D(null);return i.foreach((u,d)=>{const h=$(t,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),_r(n,e,t,l,s,r,a,o)}}function Xp(n,e,t,i,s){const r=e.serverCache,o=Il(e,r.getNode(),r.isFullyInitialized()||S(t),r.isFiltered());return Pl(n,o,t,i,Nl,s)}function Zp(n,e,t,i,s,r){let o;if(Wi(i,t)!=null)return e;{const a=new ao(i,e,s),c=e.eventCache.getNode();let l;if(S(t)||I(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Bi(i,Dt(e));else{const d=e.serverCache.getNode();p(d instanceof v,"serverChildren would be complete if leaf node"),u=ro(i,d)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=I(t);let d=oo(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=n.filter.updateChild(c,u,d,x(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,v.EMPTY_NODE,x(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Bi(i,Dt(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Wi(i,R())!=null,Ln(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new eo(i.getIndex()),r=yp(i);this.processor_=Gp(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new ht(c,o.isFullyInitialized(),s.filtersNodes()),d=new ht(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=us(d,u),this.eventGenerator_=new Tp(this.query_)}get query(){return this.query_}}function tg(n){return n.viewCache_.serverCache.getNode()}function ng(n){return Ui(n.viewCache_)}function ig(n,e){const t=Dt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!S(e)&&!t.getImmediateChild(I(e)).isEmpty())?t.getChild(e):null}function Ba(n){return n.eventRegistrations_.length===0}function sg(n,e){n.eventRegistrations_.push(e)}function Wa(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function $a(n,e,t,i){e.type===ye.MERGE&&e.source.queryId!==null&&(p(Dt(n.viewCache_),"We should always have a full cache before handling merges"),p(Ui(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Yp(n.processor_,s,e,t,i);return qp(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Ll(n,r.changes,r.viewCache.eventCache.getNode(),null)}function rg(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(V,(r,o)=>{i.push(nn(r,o))}),t.isFullyInitialized()&&i.push(Cl(t.getNode())),Ll(n,i,t.getNode(),e)}function Ll(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Sp(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vi;class Dl{constructor(){this.views=new Map}}function og(n){p(!Vi,"__referenceConstructor has already been defined"),Vi=n}function ag(){return p(Vi,"Reference.ts has not been loaded"),Vi}function cg(n){return n.views.size===0}function co(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),$a(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat($a(o,e,t,i));return r}}function Ol(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Bi(t,s?i:null),c=!1;a?c=!0:i instanceof v?(a=ro(t,i),c=!1):(a=v.EMPTY_NODE,c=!1);const l=us(new ht(a,c,!1),new ht(i,s,!1));return new eg(e,l)}return o}function lg(n,e,t,i,s,r){const o=Ol(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),sg(o,t),rg(o,t)}function ug(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ft(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(Wa(l,t,i)),Ba(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(Wa(c,t,i)),Ba(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!ft(n)&&r.push(new(ag())(e._repo,e._path)),{removed:r,events:o}}function xl(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ut(n,e){let t=null;for(const i of n.views.values())t=t||ig(i,e);return t}function Ml(n,e){if(e._queryParams.loadsAllData())return hs(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Fl(n,e){return Ml(n,e)!=null}function ft(n){return hs(n)!=null}function hs(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hi;function dg(n){p(!Hi,"__referenceConstructor has already been defined"),Hi=n}function hg(){return p(Hi,"Reference.ts has not been loaded"),Hi}let fg=1;class Va{constructor(e){this.listenProvider_=e,this.syncPointTree_=new D(null),this.pendingWriteTree_=Vp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ul(n,e,t,i,s){return Np(n.pendingWriteTree_,e,t,i,s),s?mn(n,new Lt(no(),e,t)):[]}function pg(n,e,t,i){Pp(n.pendingWriteTree_,e,t,i);const s=D.fromObject(t);return mn(n,new sn(no(),e,s))}function tt(n,e,t=!1){const i=Lp(n.pendingWriteTree_,e);if(Dp(n.pendingWriteTree_,e)){let r=new D(null);return i.snap!=null?r=r.set(R(),!0):Q(i.children,o=>{r=r.set(new L(o),!0)}),mn(n,new Fi(i.path,r,t))}else return[]}function ri(n,e,t){return mn(n,new Lt(io(),e,t))}function gg(n,e,t){const i=D.fromObject(t);return mn(n,new sn(io(),e,i))}function mg(n,e){return mn(n,new Yn(io(),e))}function _g(n,e,t){const i=uo(n,t);if(i){const s=ho(i),r=s.path,o=s.queryId,a=ee(r,e),c=new Yn(so(o),a);return fo(n,r,c)}else return[]}function ji(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Fl(o,e))){const c=ug(o,e,t,i);cg(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,f)=>ft(f));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=wg(h);for(let g=0;g<f.length;++g){const m=f[g],_=m.query,b=Vl(n,m);n.listenProvider_.startListening(On(_),Kn(n,_),b.hashFn,b.onComplete)}}}!d&&l.length>0&&!i&&(u?n.listenProvider_.stopListening(On(e),null):l.forEach(h=>{const f=n.queryToTagMap.get(fs(h));n.listenProvider_.stopListening(On(h),f)}))}Eg(n,l)}return a}function Bl(n,e,t,i){const s=uo(n,i);if(s!=null){const r=ho(s),o=r.path,a=r.queryId,c=ee(o,e),l=new Lt(so(a),c,t);return fo(n,o,l)}else return[]}function yg(n,e,t,i){const s=uo(n,i);if(s){const r=ho(s),o=r.path,a=r.queryId,c=ee(o,e),l=D.fromObject(t),u=new sn(so(a),c,l);return fo(n,o,u)}else return[]}function yr(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,f)=>{const g=ee(h,s);r=r||ut(f,g),o=o||ft(f)});let a=n.syncPointTree_.get(s);a?(o=o||ft(a),r=r||ut(a,R())):(a=new Dl,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=v.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,g)=>{const m=ut(g,R());m&&(r=r.updateImmediateChild(f,m))}));const l=Fl(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=fs(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=Cg();n.queryToTagMap.set(h,f),n.tagToQueryMap.set(f,h)}const u=ds(n.pendingWriteTree_,s);let d=lg(a,e,t,u,r,c);if(!l&&!o&&!i){const h=Ml(a,e);d=d.concat(bg(n,e,h))}return d}function lo(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=ee(o,e),l=ut(a,c);if(l)return l});return kl(s,e,r,t,!0)}function vg(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const d=ee(l,t);i=i||ut(u,d)});let s=n.syncPointTree_.get(t);s?i=i||ut(s,R()):(s=new Dl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new ht(i,!0,!1):null,a=ds(n.pendingWriteTree_,e._path),c=Ol(s,e,a,r?o.getNode():v.EMPTY_NODE,r);return ng(c)}function mn(n,e){return Wl(e,n.syncPointTree_,null,ds(n.pendingWriteTree_,R()))}function Wl(n,e,t,i){if(S(n.path))return $l(n,e,t,i);{const s=e.get(R());t==null&&s!=null&&(t=ut(s,R()));let r=[];const o=I(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=Rl(i,o);r=r.concat(Wl(a,c,l,u))}return s&&(r=r.concat(co(s,n,i,t))),r}}function $l(n,e,t,i){const s=e.get(R());t==null&&s!=null&&(t=ut(s,R()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=Rl(i,o),u=n.operationForChild(o);u&&(r=r.concat($l(u,a,c,l)))}),s&&(r=r.concat(co(s,n,i,t))),r}function Vl(n,e){const t=e.query,i=Kn(n,t);return{hashFn:()=>(tg(e)||v.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?_g(n,t._path,i):mg(n,t._path);{const r=mf(s,t);return ji(n,t,null,r)}}}}function Kn(n,e){const t=fs(e);return n.queryToTagMap.get(t)}function fs(n){return n._path.toString()+"$"+n._queryIdentifier}function uo(n,e){return n.tagToQueryMap.get(e)}function ho(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new L(n.substr(0,e))}}function fo(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=ds(n.pendingWriteTree_,e);return co(i,t,s,null)}function wg(n){return n.fold((e,t,i)=>{if(t&&ft(t))return[hs(t)];{let s=[];return t&&(s=xl(t)),Q(i,(r,o)=>{s=s.concat(o)}),s}})}function On(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(hg())(n._repo,n._path):n}function Eg(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=fs(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Cg(){return fg++}function bg(n,e,t){const i=e._path,s=Kn(n,e),r=Vl(n,t),o=n.listenProvider_.startListening(On(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!ft(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!S(l)&&u&&ft(u))return[hs(u).query];{let h=[];return u&&(h=h.concat(xl(u).map(f=>f.query))),Q(d,(f,g)=>{h=h.concat(g)}),h}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening(On(u),Kn(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new po(t)}node(){return this.node_}}class go{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=$(this.path_,e);return new go(this.syncTree_,t)}node(){return lo(this.syncTree_,this.path_)}}const Ig=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ha=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Tg(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Sg(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Tg=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},Sg=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Hl=function(n,e,t,i){return mo(e,new go(t,n),i)},jl=function(n,e,t){return mo(n,new po(e),t)};function mo(n,e,t){const i=n.getPriority().val(),s=Ha(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ha(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new q(a,j(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new q(s))),o.forEachChild(V,(a,c)=>{const l=mo(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function yo(n,e){let t=e instanceof L?e:new L(e),i=n,s=I(t);for(;s!==null;){const r=Zt(i.node.children,s)||{children:{},childCount:0};i=new _o(s,i,r),t=x(t),s=I(t)}return i}function _n(n){return n.node.value}function zl(n,e){n.node.value=e,vr(n)}function Gl(n){return n.node.childCount>0}function kg(n){return _n(n)===void 0&&!Gl(n)}function ps(n,e){Q(n.node.children,(t,i)=>{e(new _o(t,n,i))})}function ql(n,e,t,i){t&&e(n),ps(n,s=>{ql(s,e,!0)})}function Rg(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function oi(n){return new L(n.parent===null?n.name:oi(n.parent)+"/"+n.name)}function vr(n){n.parent!==null&&Ag(n.parent,n.name,n)}function Ag(n,e,t){const i=kg(t),s=Pe(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,vr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,vr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ng=/[\[\].#$\/\u0000-\u001F\u007F]/,Pg=/[\[\].#$\u0000-\u001F\u007F]/,Hs=10*1024*1024,vo=function(n){return typeof n=="string"&&n.length!==0&&!Ng.test(n)},Yl=function(n){return typeof n=="string"&&n.length!==0&&!Pg.test(n)},Lg=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Yl(n)},Dg=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!zr(n)||n&&typeof n=="object"&&Pe(n,".sv")},Kl=function(n,e,t,i){i&&e===void 0||gs(as(n,"value"),e,t)},gs=function(n,e,t){const i=t instanceof L?new Jf(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+vt(i));if(typeof e=="function")throw new Error(n+"contains a function "+vt(i)+" with contents = "+e.toString());if(zr(e))throw new Error(n+"contains "+e.toString()+" "+vt(i));if(typeof e=="string"&&e.length>Hs/3&&cs(e)>Hs)throw new Error(n+"contains a string greater than "+Hs+" utf8 bytes "+vt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Q(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!vo(o)))throw new Error(n+" contains an invalid key ("+o+") "+vt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Qf(i,o),gs(n,a,i),Xf(i)}),s&&r)throw new Error(n+' contains ".value" child '+vt(i)+" in addition to actual children.")}},Og=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=jn(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!vo(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Kf);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&le(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},xg=function(n,e,t,i){const s=as(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Q(e,(o,a)=>{const c=new L(o);if(gs(s,a,$(t,c)),Jr(c)===".priority"&&!Dg(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),Og(s,r)},Jl=function(n,e,t,i){if(!Yl(t))throw new Error(as(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Mg=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Jl(n,e,t)},wo=function(n,e){if(I(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Fg=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!vo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Lg(t))throw new Error(as(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ms(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Qr(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Ql(n,e,t){ms(n,t),Xl(n,i=>Qr(i,e))}function he(n,e,t){ms(n,t),Xl(n,i=>le(i,e)||le(e,i))}function Xl(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Bg(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Bg(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Nn&&J("event: "+t.toString()),gn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg="repo_interrupt",$g=25;class Vg{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ug,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Mi(),this.transactionQueueTree_=new _o,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Hg(n,e,t){if(n.stats_=Yr(n.repoInfo_),n.forceRestClient_||wf())n.server_=new xi(n.repoInfo_,(i,s,r,o)=>{ja(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>za(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{z(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Fe(n.repoInfo_,e,(i,s,r,o)=>{ja(n,i,s,r,o)},i=>{za(n,i)},i=>{jg(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Tf(n.repoInfo_,()=>new Ip(n.stats_,n.server_)),n.infoData_=new vp,n.infoSyncTree_=new Va({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=ri(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Eo(n,"connected",!1),n.serverSyncTree_=new Va({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);he(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Zl(n){const t=n.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function _s(n){return Ig({timestamp:Zl(n)})}function ja(n,e,t,i,s){n.dataUpdateCount++;const r=new L(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Ni(t,l=>j(l));o=yg(n.serverSyncTree_,r,c,s)}else{const c=j(t);o=Bl(n.serverSyncTree_,r,c,s)}else if(i){const c=Ni(t,l=>j(l));o=gg(n.serverSyncTree_,r,c)}else{const c=j(t);o=ri(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=on(n,r)),he(n.eventQueue_,a,o)}function za(n,e){Eo(n,"connected",e),e===!1&&Yg(n)}function jg(n,e){Q(e,(t,i)=>{Eo(n,t,i)})}function Eo(n,e,t){const i=new L("/.info/"+e),s=j(t);n.infoData_.updateSnapshot(i,s);const r=ri(n.infoSyncTree_,i,s);he(n.eventQueue_,i,r)}function Co(n){return n.nextWriteId_++}function zg(n,e,t){const i=vg(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=j(s).withIndex(e._queryParams.getIndex());yr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=ri(n.serverSyncTree_,e._path,r);else{const a=Kn(n.serverSyncTree_,e);o=Bl(n.serverSyncTree_,e._path,r,a)}return he(n.eventQueue_,e._path,o),ji(n.serverSyncTree_,e,t,null,!0),r},s=>(ai(n,"get for query "+z(e)+" failed: "+s),Promise.reject(new Error(s))))}function Gg(n,e,t,i,s){ai(n,"set",{path:e.toString(),value:t,priority:i});const r=_s(n),o=j(t,i),a=lo(n.serverSyncTree_,e),c=jl(o,a,r),l=Co(n),u=Ul(n.serverSyncTree_,e,c,l,!0);ms(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,f)=>{const g=h==="ok";g||te("set at "+e+" failed: "+h);const m=tt(n.serverSyncTree_,l,!g);he(n.eventQueue_,e,m),wr(n,s,h,f)});const d=Io(n,e);on(n,d),he(n.eventQueue_,d,[])}function qg(n,e,t,i){ai(n,"update",{path:e.toString(),value:t});let s=!0;const r=_s(n),o={};if(Q(t,(a,c)=>{s=!1,o[a]=Hl($(e,a),j(c),n.serverSyncTree_,r)}),s)J("update() called with empty data.  Don't do anything."),wr(n,i,"ok",void 0);else{const a=Co(n),c=pg(n.serverSyncTree_,e,o,a);ms(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,u)=>{const d=l==="ok";d||te("update at "+e+" failed: "+l);const h=tt(n.serverSyncTree_,a,!d),f=h.length>0?on(n,e):e;he(n.eventQueue_,f,h),wr(n,i,l,u)}),Q(t,l=>{const u=Io(n,$(e,l));on(n,u)}),he(n.eventQueue_,e,[])}}function Yg(n){ai(n,"onDisconnectEvents");const e=_s(n),t=Mi();hr(n.onDisconnect_,R(),(s,r)=>{const o=Hl(s,r,n.serverSyncTree_,e);bl(t,s,o)});let i=[];hr(t,R(),(s,r)=>{i=i.concat(ri(n.serverSyncTree_,s,r));const o=Io(n,s);on(n,o)}),n.onDisconnect_=Mi(),he(n.eventQueue_,R(),i)}function Kg(n,e,t){let i;I(e._path)===".info"?i=yr(n.infoSyncTree_,e,t):i=yr(n.serverSyncTree_,e,t),Ql(n.eventQueue_,e._path,i)}function eu(n,e,t){let i;I(e._path)===".info"?i=ji(n.infoSyncTree_,e,t):i=ji(n.serverSyncTree_,e,t),Ql(n.eventQueue_,e._path,i)}function Jg(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Wg)}function ai(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),J(t,...e)}function wr(n,e,t,i){e&&gn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function tu(n,e,t){return lo(n.serverSyncTree_,e,t)||v.EMPTY_NODE}function bo(n,e=n.transactionQueueTree_){if(e||ys(n,e),_n(e)){const t=iu(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Qg(n,oi(e),t)}else Gl(e)&&ps(e,t=>{bo(n,t)})}function Qg(n,e,t){const i=t.map(l=>l.currentWriteId),s=tu(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=ee(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{ai(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(tt(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();ys(n,yo(n.transactionQueueTree_,e)),bo(n,n.transactionQueueTree_),he(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)gn(d[h])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{te("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}on(n,e)}},o)}function on(n,e){const t=nu(n,e),i=oi(t),s=iu(n,t);return Xg(n,s,i),i}function Xg(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=ee(t,c.path);let u=!1,d;if(p(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(tt(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=$g)u=!0,d="maxretry",s=s.concat(tt(n.serverSyncTree_,c.currentWriteId,!0));else{const h=tu(n,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){gs("transaction failed: Data returned ",f,c.path);let g=j(f);typeof f=="object"&&f!=null&&Pe(f,".priority")||(g=g.updatePriority(h.getPriority()));const _=c.currentWriteId,b=_s(n),A=jl(g,h,b);c.currentOutputSnapshotRaw=g,c.currentOutputSnapshotResolved=A,c.currentWriteId=Co(n),o.splice(o.indexOf(_),1),s=s.concat(Ul(n.serverSyncTree_,c.path,A,c.currentWriteId,c.applyLocally)),s=s.concat(tt(n.serverSyncTree_,_,!0))}else u=!0,d="nodata",s=s.concat(tt(n.serverSyncTree_,c.currentWriteId,!0))}he(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ys(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)gn(i[a]);bo(n,n.transactionQueueTree_)}function nu(n,e){let t,i=n.transactionQueueTree_;for(t=I(e);t!==null&&_n(i)===void 0;)i=yo(i,t),e=x(e),t=I(e);return i}function iu(n,e){const t=[];return su(n,e,t),t.sort((i,s)=>i.order-s.order),t}function su(n,e,t){const i=_n(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);ps(e,s=>{su(n,s,t)})}function ys(n,e){const t=_n(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,zl(e,t.length>0?t:void 0)}ps(e,i=>{ys(n,i)})}function Io(n,e){const t=oi(nu(n,e)),i=yo(n.transactionQueueTree_,e);return Rg(i,s=>{js(n,s)}),js(n,i),ql(i,s=>{js(n,s)}),t}function js(n,e){const t=_n(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(tt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?zl(e,void 0):t.length=r+1,he(n.eventQueue_,oi(e),s);for(let o=0;o<i.length;o++)gn(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zg(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function em(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):te(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ga=function(n,e){const t=tm(n),i=t.namespace;t.domain==="firebase.com"&&Be(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Be("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||df();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new ol(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new L(t.pathString)}},tm=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=Zg(n.substring(u,d)));const h=em(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const g=e.indexOf(".");i=e.substring(0,g).toLowerCase(),t=e.substring(g+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",nm=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=qa.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=qa.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+z(this.snapshot.exportVal())}}class ou{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return S(this._path)?null:Jr(this._path)}get ref(){return new Le(this._repo,this._path)}get _queryIdentifier(){const e=La(this._queryParams),t=Gr(e);return t==="{}"?"default":t}get _queryObject(){return La(this._queryParams)}isEqual(e){if(e=oe(e),!(e instanceof So))return!1;const t=this._repo===e._repo,i=Qr(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Yf(this._path)}}class Le extends So{constructor(e,t){super(e,t,new to,!1)}get parent(){const e=gl(this._path);return e===null?null:new Le(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class an{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new L(e),i=cn(this.ref,e);return new an(this._node.getChild(t),i,V)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new an(s,cn(this.ref,i),V)))}hasChild(e){const t=new L(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ae(n,e){return n=oe(n),n._checkNotDeleted("ref"),e!==void 0?cn(n._root,e):n._root}function cn(n,e){return n=oe(n),I(n._path)===null?Mg("child","path",e):Jl("child","path",e),new Le(n._repo,$(n._path,e))}function Ya(n,e){n=oe(n),wo("push",n._path),Kl("push",e,n._path,!0);const t=Zl(n._repo),i=nm(t),s=cn(n,i),r=cn(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function ln(n){return wo("remove",n._path),We(n,null)}function We(n,e){n=oe(n),wo("set",n._path),Kl("set",e,n._path,!1);const t=new ei;return Gg(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function au(n,e){xg("update",e,n._path);const t=new ei;return qg(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function St(n){n=oe(n);const e=new To(()=>{}),t=new ci(e);return zg(n._repo,n,t).then(i=>new an(i,new Le(n._repo,n._path),n._queryParams.getIndex()))}class ci{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new ru("value",this,new an(e.snapshotNode,new Le(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ou(this,e,t):null}matches(e){return e instanceof ci?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class vs{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ou(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=cn(new Le(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new ru(e.type,this,new an(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof vs?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function ko(n,e,t,i,s){const r=new To(t,void 0),o=e==="value"?new ci(r):new vs(e,r);return Kg(n._repo,n,o),()=>eu(n._repo,n,o)}function im(n,e,t,i){return ko(n,"value",e)}function sm(n,e,t,i){return ko(n,"child_added",e)}function rm(n,e,t,i){return ko(n,"child_removed",e)}function cu(n,e,t){let i=null;const s=t?new To(t):null;e==="value"?i=new ci(s):e&&(i=new vs(e,s)),eu(n._repo,n,i)}og(Le);dg(Le);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const om="FIREBASE_DATABASE_EMULATOR_HOST",Er={};let am=!1;function cm(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=hn(r);n.repoInfo_=new ol(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function lm(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Be("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),J("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ga(r,s),a=o.repoInfo,c;typeof process<"u"&&pa&&(c=pa[om]),c?(r=`http://${c}?ns=${a.namespace}`,o=Ga(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new Cf(n.name,n.options,e);Fg("Invalid Firebase Database URL",o),S(o.path)||Be("Database URL must point to the root of a Firebase Database (not including a child path).");const u=dm(a,n,l,new Ef(n,t));return new hm(u,n)}function um(n,e){const t=Er[e];(!t||t[n.key]!==n)&&Be(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Jg(n),delete t[n.key]}function dm(n,e,t,i){let s=Er[e.name];s||(s={},Er[e.name]=s);let r=s[n.toURLString()];return r&&Be("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Vg(n,am,t,i),s[n.toURLString()]=r,r}class hm{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Hg(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Le(this._repo,R())),this._rootInternal}_delete(){return this._rootInternal!==null&&(um(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Be("Cannot call "+e+" on a deleted database.")}}function fm(n=Hc(),e){const t=jr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Nd("database");i&&pm(t,...i)}return t}function pm(n,e,t,i={}){n=oe(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&At(i,r.repoInfo_.emulatorOptions))return;Be("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Be('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ei(Ei.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Pd(i.mockUserToken,n.app.options.projectId);o=new Ei(a)}hn(e)&&(Mc(e),Fc("Database",!0)),cm(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gm(n){rf(pn),en(new Nt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return lm(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ct(ga,ma,n),ct(ga,ma,"esm2020")}Fe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Fe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};gm();var mm="firebase",_m="12.5.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ct(mm,_m,"app");const ym={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},lu=Vc(ym),ie=fm(lu),Ct=[];function $t(n,e,t,i=null,s=null,r=null){e==="value"?im(n,t):e==="child_added"?sm(n,t):e==="child_removed"?rm(n,t):console.warn(`Unknown listener type: ${e}`),Ct.push({ref:n,type:e,callback:t,roomId:i,userId:s,category:r})}function vm(){Ct.forEach(({ref:n,type:e,callback:t})=>{try{cu(n,e,t)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),Ct.length=0}function wm(n,e){if(!n||!e)return;const t=r=>r.userId===n&&r.roomId===e;Ct.filter(t).forEach(({ref:r,type:o,callback:a})=>{try{cu(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${n} in room ${e}`,c)}});const s=Ct.filter(r=>!t(r));Ct.length=0,Ct.push(...s)}function uu(n,e,t=null){$t(n,"value",e,t)}const Tn=n=>ae(ie,`rooms/${n}`),_i=n=>ae(ie,`rooms/${n}/members`),Ka=(n,e)=>ae(ie,`rooms/${n}/members/${e}`),ws=n=>ae(ie,`rooms/${n}/watch`),Em=n=>ae(ie,`users/${n}/recentCalls`),du=(n,e)=>ae(ie,`users/${n}/recentCalls/${e}`),Ro=n=>ae(ie,`users/${n}/outgoingCall`),hu=n=>ae(ie,`rooms/${n}/offerCandidates`),fu=n=>ae(ie,`rooms/${n}/answerCandidates`);function pu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Cm=pu,gu=new ti("auth","Firebase",pu());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi=new Vr("@firebase/auth");function bm(n,...e){zi.logLevel<=P.WARN&&zi.warn(`Auth (${pn}): ${n}`,...e)}function Ci(n,...e){zi.logLevel<=P.ERROR&&zi.error(`Auth (${pn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n,...e){throw No(n,...e)}function Ee(n,...e){return No(n,...e)}function Ao(n,e,t){const i={...Cm(),[e]:t};return new ti("auth","Firebase",i).create(e,{appName:n.name})}function kt(n){return Ao(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Im(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&Ne(n,"argument-error"),Ao(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function No(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return gu.create(n,...e)}function w(n,e,...t){if(!n)throw No(e,...t)}function xe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ci(e),new Error(e)}function $e(n,e){n||xe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cr(){return typeof self<"u"&&self.location?.href||""}function Tm(){return Ja()==="http:"||Ja()==="https:"}function Ja(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Tm()||xd()||"connection"in navigator)?navigator.onLine:!0}function km(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,t){this.shortDelay=e,this.longDelay=t,$e(t>e,"Short delay should be less than long delay!"),this.isMobile=$r()||Uc()}get(){return Sm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Po(n,e){$e(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;xe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;xe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;xe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Nm=new li(3e4,6e4);function Lo(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yn(n,e,t,i,s={}){return _u(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=fn({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return Od()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&hn(n.emulatorConfig.host)&&(l.credentials="include"),mu.fetch()(await yu(n,n.config.apiHost,t,a),l)})}async function _u(n,e,t){n._canInitEmulator=!1;const i={...Rm,...e};try{const s=new Lm(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw yi(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw yi(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw yi(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw yi(n,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Ao(n,u,l);Ne(n,u)}}catch(s){if(s instanceof gt)throw s;Ne(n,"network-request-failed",{message:String(s)})}}async function Pm(n,e,t,i,s={}){const r=await yn(n,e,t,i,s);return"mfaPendingCredential"in r&&Ne(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function yu(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Po(n.config,s):`${n.config.apiScheme}://${s}`;return Am.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class Lm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ee(this.auth,"network-request-failed")),Nm.get())})}}function yi(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Ee(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dm(n,e){return yn(n,"POST","/v1/accounts:delete",e)}async function Gi(n,e){return yn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Om(n,e=!1){const t=oe(n),i=await t.getIdToken(e),s=Do(i);w(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:xn(zs(s.auth_time)),issuedAtTime:xn(zs(s.iat)),expirationTime:xn(zs(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function zs(n){return Number(n)*1e3}function Do(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Ci("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ai(t);return s?JSON.parse(s):(Ci("Failed to decode base64 JWT payload"),null)}catch(s){return Ci("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Qa(n){const e=Do(n);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof gt&&xm(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function xm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=xn(this.lastLoginAt),this.creationTime=xn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qi(n){const e=n.auth,t=await n.getIdToken(),i=await Jn(n,Gi(e,{idToken:t}));w(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?vu(s.providerUserInfo):[],o=Um(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new br(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function Fm(n){const e=oe(n);await qi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Um(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function vu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bm(n,e){const t=await _u(n,{},async()=>{const i=fn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await yu(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&hn(n.emulatorConfig.host)&&(c.credentials="include"),mu.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Wm(n,e){return yn(n,"POST","/v2/accounts:revokeToken",Lo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Qa(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){w(e.length!==0,"internal-error");const t=Qa(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(w(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Bm(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new zt;return i&&(w(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(w(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(w(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new zt,this.toJSON())}_performRefresh(){return xe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ye(n,e){w(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ve{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new Mm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new br(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Jn(this,this.stsTokenManager.getToken(this.auth,e));return w(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Om(this,e)}reload(){return Fm(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ve({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await qi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(pe(this.auth.app))return Promise.reject(kt(this.auth));const e=await this.getIdToken();return await Jn(this,Dm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:g,stsTokenManager:m}=t;w(d&&m,e,"internal-error");const _=zt.fromJSON(this.name,m);w(typeof d=="string",e,"internal-error"),Ye(i,e.name),Ye(s,e.name),w(typeof h=="boolean",e,"internal-error"),w(typeof f=="boolean",e,"internal-error"),Ye(r,e.name),Ye(o,e.name),Ye(a,e.name),Ye(c,e.name),Ye(l,e.name),Ye(u,e.name);const b=new ve({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:_,createdAt:l,lastLoginAt:u});return g&&Array.isArray(g)&&(b.providerData=g.map(A=>({...A}))),c&&(b._redirectEventId=c),b}static async _fromIdTokenResponse(e,t,i=!1){const s=new zt;s.updateFromServerResponse(t);const r=new ve({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await qi(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];w(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?vu(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new zt;a.updateFromIdToken(i);const c=new ve({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new br(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=new Map;function Me(n){$e(n instanceof Function,"Expected a class definition");let e=Xa.get(n);return e?($e(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Xa.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}wu.type="NONE";const Za=wu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bi(n,e,t){return`firebase:${n}:${e}:${t}`}class Gt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=bi(this.userKey,s.apiKey,r),this.fullPersistenceKey=bi("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Gi(this.auth,{idToken:e}).catch(()=>{});return t?ve._fromGetAccountInfoResponse(this.auth,t,e):null}return ve._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Gt(Me(Za),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||Me(Za);const o=bi(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Gi(e,{idToken:u}).catch(()=>{});if(!h)break;d=await ve._fromGetAccountInfoResponse(e,h,u)}else d=ve._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Gt(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Gt(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Iu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Eu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Su(e))return"Blackberry";if(ku(e))return"Webos";if(Cu(e))return"Safari";if((e.includes("chrome/")||bu(e))&&!e.includes("edge/"))return"Chrome";if(Tu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function Eu(n=ne()){return/firefox\//i.test(n)}function Cu(n=ne()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bu(n=ne()){return/crios\//i.test(n)}function Iu(n=ne()){return/iemobile/i.test(n)}function Tu(n=ne()){return/android/i.test(n)}function Su(n=ne()){return/blackberry/i.test(n)}function ku(n=ne()){return/webos/i.test(n)}function Oo(n=ne()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function $m(n=ne()){return Oo(n)&&!!window.navigator?.standalone}function Vm(){return Md()&&document.documentMode===10}function Ru(n=ne()){return Oo(n)||Tu(n)||ku(n)||Su(n)||/windows phone/i.test(n)||Iu(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(n,e=[]){let t;switch(n){case"Browser":t=ec(ne());break;case"Worker":t=`${ec(ne())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${pn}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jm(n,e={}){return yn(n,"GET","/v2/passwordPolicy",Lo(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zm=6;class Gm{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??zm,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tc(this),this.idTokenSubscription=new tc(this),this.beforeStateQueue=new Hm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Me(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Gt.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Gi(this,{idToken:e}),i=await ve._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(pe(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await qi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=km()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(pe(this.app))return Promise.reject(kt(this));const t=e?oe(e):null;return t&&w(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return pe(this.app)?Promise.reject(kt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return pe(this.app)?Promise.reject(kt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Me(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await jm(this),t=new Gm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ti("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Wm(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Me(e)||this._popupRedirectResolver;w(t,this,"argument-error"),this.redirectPersistenceManager=await Gt.create(this,[Me(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(w(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Au(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(pe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&bm(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Es(n){return oe(n)}class tc{constructor(e){this.auth=e,this.observer=null,this.addObserver=Gd(t=>this.observer=t)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ym(n){xo=n}function Km(n){return xo.loadJS(n)}function Jm(){return xo.gapiScript}function Qm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xm(n,e){const t=jr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(At(r,e??{}))return s;Ne(s,"already-initialized")}return t.initialize({options:e})}function Zm(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Me);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function e_(n,e,t){const i=Es(n);w(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Nu(e),{host:o,port:a}=t_(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){w(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),w(At(l,i.config.emulator)&&At(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,hn(o)?(Mc(`${r}//${o}${c}`),Fc("Auth",!0)):n_()}function Nu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function t_(n){const e=Nu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:nc(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:nc(o)}}}function nc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function n_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return xe("not implemented")}_getIdTokenResponse(e){return xe("not implemented")}_linkToIdToken(e,t){return xe("not implemented")}_getReauthenticationResolver(e){return xe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qt(n,e){return Pm(n,"POST","/v1/accounts:signInWithIdp",Lo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_="http://localhost";class Ot extends Pu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ot(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Ne("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new Ot(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return qt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,qt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,qt(e,t)}buildRequest(){const e={requestUri:i_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui extends Mo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke extends ui{constructor(){super("facebook.com")}static credential(e){return Ot._fromParams({providerId:Ke.PROVIDER_ID,signInMethod:Ke.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ke.credentialFromTaggedObject(e)}static credentialFromError(e){return Ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ke.credential(e.oauthAccessToken)}catch{return null}}}Ke.FACEBOOK_SIGN_IN_METHOD="facebook.com";Ke.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me extends ui{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ot._fromParams({providerId:me.PROVIDER_ID,signInMethod:me.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return me.credentialFromTaggedObject(e)}static credentialFromError(e){return me.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return me.credential(t,i)}catch{return null}}}me.GOOGLE_SIGN_IN_METHOD="google.com";me.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je extends ui{constructor(){super("github.com")}static credential(e){return Ot._fromParams({providerId:Je.PROVIDER_ID,signInMethod:Je.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Je.credentialFromTaggedObject(e)}static credentialFromError(e){return Je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Je.credential(e.oauthAccessToken)}catch{return null}}}Je.GITHUB_SIGN_IN_METHOD="github.com";Je.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe extends ui{constructor(){super("twitter.com")}static credential(e,t){return Ot._fromParams({providerId:Qe.PROVIDER_ID,signInMethod:Qe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qe.credentialFromTaggedObject(e)}static credentialFromError(e){return Qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Qe.credential(t,i)}catch{return null}}}Qe.TWITTER_SIGN_IN_METHOD="twitter.com";Qe.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await ve._fromIdTokenResponse(e,i,s),o=ic(i);return new un({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=ic(i);return new un({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function ic(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi extends gt{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Yi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Yi(e,t,i,s)}}function Lu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Yi._fromErrorAndOperation(n,r,e,i):r})}async function s_(n,e,t=!1){const i=await Jn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return un._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function r_(n,e,t=!1){const{auth:i}=n;if(pe(i.app))return Promise.reject(kt(i));const s="reauthenticate";try{const r=await Jn(n,Lu(i,s,e,n),t);w(r.idToken,i,"internal-error");const o=Do(r.idToken);w(o,i,"internal-error");const{sub:a}=o;return w(n.uid===a,i,"user-mismatch"),un._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&Ne(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function o_(n,e,t=!1){if(pe(n.app))return Promise.reject(kt(n));const i="signIn",s=await Lu(n,i,e),r=await un._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function a_(n,e,t,i){return oe(n).onIdTokenChanged(e,t,i)}function c_(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function Du(n,e,t,i){return oe(n).onAuthStateChanged(e,t,i)}const Ki="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ki,"1"),this.storage.removeItem(Ki),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_=1e3,u_=10;class xu extends Ou{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ru(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Vm()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,u_):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},l_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}xu.type="LOCAL";const d_=xu;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu extends Ou{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Mu.type="SESSION";const Fu=Mu;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Cs(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await h_(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Cs.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Fo("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ke(){return window}function p_(n){ke().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uu(){return typeof ke().WorkerGlobalScope<"u"&&typeof ke().importScripts=="function"}async function g_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function m_(){return navigator?.serviceWorker?.controller||null}function __(){return Uu()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu="firebaseLocalStorageDb",y_=1,Ji="firebaseLocalStorage",Wu="fbase_key";class di{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function bs(n,e){return n.transaction([Ji],e?"readwrite":"readonly").objectStore(Ji)}function v_(){const n=indexedDB.deleteDatabase(Bu);return new di(n).toPromise()}function Ir(){const n=indexedDB.open(Bu,y_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ji,{keyPath:Wu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ji)?e(i):(i.close(),await v_(),e(await Ir()))})})}async function sc(n,e,t){const i=bs(n,!0).put({[Wu]:e,value:t});return new di(i).toPromise()}async function w_(n,e){const t=bs(n,!1).get(e),i=await new di(t).toPromise();return i===void 0?null:i.value}function rc(n,e){const t=bs(n,!0).delete(e);return new di(t).toPromise()}const E_=800,C_=3;class $u{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ir(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>C_)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Uu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cs._getInstance(__()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await g_(),!this.activeServiceWorker)return;this.sender=new f_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||m_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ir();return await sc(e,Ki,"1"),await rc(e,Ki),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>sc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>w_(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>rc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=bs(s,!1).getAll();return new di(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),E_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}$u.type="LOCAL";const b_=$u;new li(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(n,e){return e?Me(e):(w(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo extends Pu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return qt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return qt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return qt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function I_(n){return o_(n.auth,new Uo(n),n.bypassAuthState)}function T_(n){const{auth:e,user:t}=n;return w(t,e,"internal-error"),r_(t,new Uo(n),n.bypassAuthState)}async function S_(n){const{auth:e,user:t}=n;return w(t,e,"internal-error"),s_(t,new Uo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return I_;case"linkViaPopup":case"linkViaRedirect":return S_;case"reauthViaPopup":case"reauthViaRedirect":return T_;default:Ne(this.auth,"internal-error")}}resolve(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){$e(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_=new li(2e3,1e4);async function R_(n,e,t){if(pe(n.app))return Promise.reject(Ee(n,"operation-not-supported-in-this-environment"));const i=Es(n);Im(n,e,Mo);const s=Vu(i,t);return new bt(i,"signInViaPopup",e,s).executeNotNull()}class bt extends Hu{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,bt.currentPopupAction&&bt.currentPopupAction.cancel(),bt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){$e(this.filter.length===1,"Popup operations only handle one event");const e=Fo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ee(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ee(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,bt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ee(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,k_.get())};e()}}bt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_="pendingRedirect",Ii=new Map;class N_ extends Hu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Ii.get(this.auth._key());if(!e){try{const i=await P_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Ii.set(this.auth._key(),e)}return this.bypassAuthState||Ii.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function P_(n,e){const t=O_(e),i=D_(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function L_(n,e){Ii.set(n._key(),e)}function D_(n){return Me(n._redirectPersistence)}function O_(n){return bi(A_,n.config.apiKey,n.name)}async function x_(n,e,t=!1){if(pe(n.app))return Promise.reject(kt(n));const i=Es(n),s=Vu(i,e),o=await new N_(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_=600*1e3;class F_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!U_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!ju(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ee(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=M_&&this.cachedEventUids.clear(),this.cachedEventUids.has(oc(e))}saveEventToCache(e){this.cachedEventUids.add(oc(e)),this.lastProcessedEventTime=Date.now()}}function oc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function ju({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function U_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ju(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function B_(n,e={}){return yn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,$_=/^https?/;async function V_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await B_(n);for(const t of e)try{if(H_(t))return}catch{}Ne(n,"unauthorized-domain")}function H_(n){const e=Cr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!$_.test(t))return!1;if(W_.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j_=new li(3e4,6e4);function ac(){const n=ke().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function z_(n){return new Promise((e,t)=>{function i(){ac(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ac(),t(Ee(n,"network-request-failed"))},timeout:j_.get()})}if(ke().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ke().gapi?.load)i();else{const s=Qm("iframefcb");return ke()[s]=()=>{gapi.load?i():t(Ee(n,"network-request-failed"))},Km(`${Jm()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw Ti=null,e})}let Ti=null;function G_(n){return Ti=Ti||z_(n),Ti}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q_=new li(5e3,15e3),Y_="__/auth/iframe",K_="emulator/auth/iframe",J_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Q_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function X_(n){const e=n.config;w(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Po(e,K_):`https://${n.config.authDomain}/${Y_}`,i={apiKey:e.apiKey,appName:n.name,v:pn},s=Q_.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${fn(i).slice(1)}`}async function Z_(n){const e=await G_(n),t=ke().gapi;return w(t,n,"internal-error"),e.open({where:document.body,url:X_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:J_,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Ee(n,"network-request-failed"),a=ke().setTimeout(()=>{r(o)},q_.get());function c(){ke().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ey={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},ty=500,ny=600,iy="_blank",sy="http://localhost";class cc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ry(n,e,t,i=ty,s=ny){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...ey,width:i.toString(),height:s.toString(),top:r,left:o},l=ne().toLowerCase();t&&(a=bu(l)?iy:t),Eu(l)&&(e=e||sy,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,g])=>`${h}${f}=${g},`,"");if($m(l)&&a!=="_self")return oy(e||"",a),new cc(null);const d=window.open(e||"",a,u);w(d,n,"popup-blocked");try{d.focus()}catch{}return new cc(d)}function oy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay="__/auth/handler",cy="emulator/auth/handler",ly=encodeURIComponent("fac");async function lc(n,e,t,i,s,r){w(n.config.authDomain,n,"auth-domain-config-required"),w(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:pn,eventId:s};if(e instanceof Mo){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",ir(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof ui){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${ly}=${encodeURIComponent(c)}`:"";return`${uy(n)}?${fn(a).slice(1)}${l}`}function uy({config:n}){return n.emulator?Po(n,cy):`https://${n.authDomain}/${ay}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs="webStorageSupport";class dy{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Fu,this._completeRedirectFn=x_,this._overrideRedirectResult=L_}async _openPopup(e,t,i,s){$e(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await lc(e,t,i,Cr(),s);return ry(e,r,Fo())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await lc(e,t,i,Cr(),s);return p_(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):($e(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Z_(e),i=new F_(e);return t.register("authEvent",s=>(w(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Gs,{type:Gs},s=>{const r=s?.[0]?.[Gs];r!==void 0&&t(!!r),Ne(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=V_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ru()||Cu()||Oo()}}const hy=dy;var uc="@firebase/auth",dc="1.11.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function py(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function gy(n){en(new Nt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Au(n)},l=new qm(i,s,r,c);return Zm(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),en(new Nt("auth-internal",e=>{const t=Es(e.getProvider("auth").getImmediate());return(i=>new fy(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ct(uc,dc,py(n)),ct(uc,dc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my=300,_y=xc("authIdTokenMaxAge")||my;let hc=null;const yy=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>_y)return;const s=t?.token;hc!==s&&(hc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function vy(n=Hc()){const e=jr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Xm(n,{popupRedirectResolver:hy,persistence:[b_,d_,Fu]}),i=xc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=yy(r.toString());c_(t,o,()=>o(t.currentUser)),a_(t,a=>o(a))}}const s=Dc("auth");return s&&e_(t,`http://${s}`),t}function wy(){return document.getElementsByTagName("head")?.[0]??document}Ym({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Ee("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",wy().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});gy("Browser");const Ey=()=>!1,Cy=n=>{try{n&&localStorage.setItem("debug:console","1")}catch{}},Ie=(...n)=>{},vn=vy(lu);let qs=null;const by=()=>Math.random().toString(36).substring(2,15);function Ve(){const n=De();return n||(qs||(qs=by()),qs)}function De(){return vn.currentUser?.uid??null}function Iy(){return new Promise(n=>{const e=Du(vn,t=>{e(),n(t)})})}function zu(n,{truncate:e=7}={}){return Du(vn,t=>{const i=!!t,s=t?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;try{n({user:t,isLoggedIn:i,userName:r})}catch{}})}async function Gu(){const n=new me;try{const e=await R_(vn,n),i=me.credentialFromResult(e).accessToken,s=e.user;console.log("Signed in user:",s),Ie("Google Access Token exists:",!!i)}catch(e){const t=e?.code||"unknown",i=e?.message||String(e),s=e?.customData?.email,r=me.credentialFromError(e);if(console.error("Error during Google sign-in:",{errorCode:t,errorMessage:i,email:s,credential:r,origin:typeof window<"u"?window.location.origin:"n/a"}),t==="auth/unauthorized-domain"){const o=typeof window<"u"?window.location.origin:"",a=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",o?`• ${o}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];o&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(o).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${a.join(`
`)}`);return}alert(`Sign-in failed: ${i}`)}}function qu(){vn.signOut().then(()=>{console.log("User signed out successfully")}).catch(n=>{console.error("Error signing out:",n)})}const Ty=Object.freeze(Object.defineProperty({__proto__:null,auth:vn,getCurrentUserAsync:Iy,getLoggedInUserId:De,getUserId:Ve,onAuthChange:zu,signInWithGoogle:Gu,signOutUser:qu},Symbol.toStringTag,{value:"Module"})),Bo=n=>n?!0:(console.warn("Element not found."),!1),Wo=n=>{if(Bo(n))return n.classList.contains("hidden")},N=n=>{Bo(n)&&n.classList.contains("hidden")&&n.classList.remove("hidden")},C=n=>{Bo(n)&&!n.classList.contains("hidden")&&n.classList.add("hidden")},Yu=n=>n.classList.contains("small-frame"),Rt=n=>{if(n&&!Yu(n)){n.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const t=document.createElement("span");t.classList.add("small-frame-toggle-icon"),t.textContent="❮",e.appendChild(t),n.appendChild(e),e.addEventListener("click",()=>{n.classList.contains("closed")?(n.classList.remove("closed"),e.classList.remove("closed"),t.classList.remove("closed")):(n.classList.add("closed"),e.classList.add("closed"),t.classList.add("closed"))})}},It=n=>{if(Yu(n)){n.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function Tr(n){return document.pictureInPictureElement===n}const M=n=>{const e=document.getElementById(n);return e||(console.warn(`Element with id: ${n} not found.`),null)};let je=null,Is=null,pt=null,He=null,$o=null,_e=null,Z=null,H=null,U=null,W=null,ue=null,Ce=null,Ft=null,wn=null,Ts=null,Ku=null,Qn=null,Ss=null,Ut=null,ks=null,Rs=null,As=null,Vo=null,Ho=null,jo=null,zo=null;function fc(){je=M("lobby"),Is=M("title-auth-bar"),pt=M("create-link-btn"),He=M("copy-link-btn"),$o=M("videos"),_e=M("local-video-el"),Z=M("local-video-box"),H=M("remote-video-el"),U=M("remote-video-box"),W=M("shared-video-el"),ue=M("shared-video-box"),Ce=M("chat-controls"),Ft=M("call-btn"),wn=M("hang-up-btn"),Ts=M("switch-camera-btn"),Qn=M("status"),Ss=M("sync-status"),Ut=M("mute-btn"),ks=M("fullscreen-partner-btn"),Rs=M("mic-btn"),As=M("camera-btn"),Vo=M("app-pip-btn"),Ho=M("app-title-h1"),jo=M("app-title-a"),zo=M("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",fc):fc();const Ju=()=>({lobbyDiv:je,titleAuthBar:Is,createLinkBtn:pt,copyLinkBtn:He,videosWrapper:$o,localVideoEl:_e,localBoxEl:Z,remoteVideoEl:H,remoteBoxEl:U,sharedVideoEl:W,sharedBoxEl:ue,chatControls:Ce,callBtn:Ft,hangUpBtn:wn,switchCameraBtn:Ts,installBtn:Ku,statusDiv:Qn,syncStatus:Ss,mutePartnerBtn:Ut,fullscreenPartnerBtn:ks,micBtn:Rs,cameraBtn:As,appPipBtn:Vo,appTitleH1:Ho,appTitleA:jo,appTitleSpan:zo});function Qu(n,e=3,t=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(n);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${n} not found after ${e} attempts`),i(null);return}setTimeout(r,t)};r()})}async function Xu(n,e=3,t=100){const i={},s=n.map(async r=>{const o=await Qu(r,e,t);return i[r]=o,o});return await Promise.all(s),i}async function Sy(){const n=await Xu(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");n.searchContainer=e;const t=Object.entries(n).filter(([i,s])=>!s).map(([i])=>i);return t.length>0&&console.warn("Some YouTube elements not found:",t),n}const ky=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Vo},get appTitleA(){return jo},get appTitleH1(){return Ho},get appTitleSpan(){return zo},get callBtn(){return Ft},get cameraBtn(){return As},get chatControls(){return Ce},get copyLinkBtn(){return He},get createLinkBtn(){return pt},get fullscreenPartnerBtn(){return ks},getElements:Ju,get hangUpBtn(){return wn},initializeYouTubeElements:Sy,installBtn:Ku,get lobbyDiv(){return je},get localBoxEl(){return Z},get localVideoEl(){return _e},get micBtn(){return Rs},get mutePartnerBtn(){return Ut},get remoteBoxEl(){return U},get remoteVideoEl(){return H},robustElementAccess:Qu,get sharedBoxEl(){return ue},get sharedVideoEl(){return W},get statusDiv(){return Qn},get switchCameraBtn(){return Ts},get syncStatus(){return Ss},get titleAuthBar(){return Is},get videosWrapper(){return $o},waitForElements:Xu},Symbol.toStringTag,{value:"Module"}));function k(n){Qn?Qn.textContent=n:console.warn("Status div not found in the DOM.")}function Zu(n,{inactivityMs:e=3e3,listenTarget:t=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!n)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(_=>!Array.isArray(o)||!o.includes(_));function u(){N(n);try{typeof i=="function"&&i()}catch(_){console.warn("showHideOnInactivity onShow callback error:",_)}a&&clearTimeout(a),a=setTimeout(()=>{C(n);try{typeof s=="function"&&s()}catch(_){console.warn("showHideOnInactivity onHide callback error:",_)}a=null},e)}l.forEach(_=>t.addEventListener(_,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{C(n)}catch(_){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",_)}}else u()}document.addEventListener("visibilitychange",d);function h(_){if(!_.relatedTarget){a&&(clearTimeout(a),a=null),C(n);try{typeof s=="function"&&s()}catch(b){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",b)}}}t.addEventListener("mouseout",h);function f(_){if(r&&(_.key==="Escape"||_.key==="Esc")){a&&(clearTimeout(a),a=null),C(n);try{typeof s=="function"&&s()}catch(b){console.warn("showHideOnInactivity onHide (esc) callback error:",b)}}}document.addEventListener("keydown",f);function g(){a||u()}t.addEventListener("touchend",g,{passive:!0}),C(n);function m(){l.forEach(_=>t.removeEventListener(_,u)),document.removeEventListener("visibilitychange",d),t.removeEventListener("mouseout",h),t.removeEventListener("touchend",g),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return m}class Yt{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,t,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:t,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${t}`,i)}logListenerAttachment(e,t,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:t,currentCount:i,...s})}logListenerCleanup(e,t,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:t.length,removedRoomIds:e,preservedRoomIds:t,...i})}logDuplicateListener(e,t,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:t,...i})}logIncomingCallEvent(e,t,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:t,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,t,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:t,roomId:i,...s})}logCallingUILifecycle(e,t,i={}){this.log("CALLING_UI",e,{roomId:t,...i})}logFirebaseOperation(e,t,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:t,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,t={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...t})}logRoomCreation(e,t,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:t,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,t,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:t,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,t,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:t,...i})}logContactCall(e,t,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:t,forceInitiator:i,...s})}logFreshnessValidation(e,t,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:t,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,t,i,s={}){this.log("RACE_CONDITION",e,{roomId:t,events:i,...s})}getLogs(e={}){let t=[...this.logs];return e.category&&(t=t.filter(i=>i.category===e.category)),e.event&&(t=t.filter(i=>i.event===e.event)),e.roomId&&(t=t.filter(i=>i.data.roomId===e.roomId)),e.since&&(t=t.filter(i=>i.timestamp>=e.since)),e.until&&(t=t.filter(i=>i.timestamp<=e.until)),t}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((t,i)=>t.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const t=this.getLogs({category:"LISTENER"});return e?t.filter(i=>i.data.roomId===e):t}getFailureAnalysis(){const e=this.logs.filter(t=>t.category==="FIREBASE"&&t.data.success===!1||t.category==="INCOMING_CALL"&&t.data.decision==="REJECT"||t.category==="LISTENER"&&t.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(t=>t.category==="FIREBASE").length,rejectedCalls:e.filter(t=>t.category==="INCOMING_CALL"&&t.data.decision==="REJECT").length,duplicateListeners:e.filter(t=>t.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const t=this.exportLogsAsJSON(),i=new Blob([t],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,t){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=t)}getLogsSince(e){return this.logs.filter(t=>t.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const t=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=t)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const t=localStorage.getItem(e);if(t){const i=JSON.parse(t);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(t){return console.warn("Failed to load persisted logs:",t),0}}static getPersistedLogKeys(){const e=[];for(let t=0;t<localStorage.length;t++){const i=localStorage.key(t);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const t=Date.now()-e;Yt.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<t&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const t=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:t}),t}endTiming(e,t={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...t}),s}return null}}let Ys=null;function y(){return Ys||(Ys=new Yt),Ys}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:n=>{y().downloadLogs(n),console.log("Diagnostic logs downloaded")},getRoomLogs:n=>{const t=y().getCallFlowTrace(n);return console.log(`Logs for room ${n}:`,t),t},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:n=>{const t=y().getListenerDiagnostics(n);return console.log("Listener diagnostics:",t),t},getLogsSince:n=>{const t=y().getLogsSince(n);return console.log(`Logs since ${new Date(n).toISOString()}:`,t),t},getLogsInRange:(n,e)=>{const i=y().getLogsInTimeRange(n,e);return console.log(`Logs from ${new Date(n).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:n=>{const t=y().loadPersistedLogs(n);return console.log(`Loaded ${t} persisted logs`),t},getPersistedKeys:()=>{const n=Yt.getPersistedLogKeys();return console.log("Persisted log keys:",n),n},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const n=y(),e={sessionId:n.sessionId,logCount:n.logs.length,isEnabled:n.isEnabled,maxLogs:n.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
Diagnostic Logger Console Commands:
==================================

Basic Commands:
- diagnosticLogger.exportLogs()           - Export all logs as JSON
- diagnosticLogger.downloadLogs()         - Download logs as file
- diagnosticLogger.clearLogs()            - Clear current logs
- diagnosticLogger.getSessionInfo()       - Get session information

Filtering Commands:
- diagnosticLogger.getRoomLogs(roomId)    - Get logs for specific room
- diagnosticLogger.getLogsSince(timestamp) - Get logs since timestamp
- diagnosticLogger.getLogsInRange(start, end) - Get logs in time range

Analysis Commands:
- diagnosticLogger.getFailures()          - Get failure analysis
- diagnosticLogger.getListenerDiagnostics() - Get listener diagnostics

Persistence Commands:
- diagnosticLogger.persistLogs()          - Save logs to localStorage
- diagnosticLogger.loadPersistedLogs(key) - Load persisted logs
- diagnosticLogger.getPersistedKeys()     - List persisted log keys

Control Commands:
- diagnosticLogger.enable()               - Enable logging
- diagnosticLogger.disable()              - Disable logging
- diagnosticLogger.help()                 - Show this help

Example Usage:
- diagnosticLogger.exportLogs()
- diagnosticLogger.getRoomLogs('abc123')
- diagnosticLogger.getLogsSince(Date.now() - 60000) // Last minute
      `)}},window.addEventListener("beforeunload",()=>{try{const n=y();n.logs.length>0&&n.persistLogs(),Yt.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const n=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!n.isEnabled||!e)return;const t=Yt.getPersistedLogKeys();t.length>0&&(console.log(`Found ${t.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",t))}catch{}},1e3));class Ry{constructor(){this.currentRoomId=null}async createNewRoom(e,t,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:t,hasOffer:!!e,timestamp:s});const r=Tn(i);try{return await We(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:t}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:t,duration:Date.now()-s}),await this.joinRoom(i,t),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:t,totalDuration:Date.now()-s}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:t,duration:Date.now()-s}),o}}async checkRoomStatus(e){const t=Tn(e),i=await St(t);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const t=Tn(e),i=await St(t);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,t){const i=Tn(e);await au(i,{answer:t})}async joinRoom(e,t,i="Guest User"){const s=Ka(e,t);await We(s,{displayName:i,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${t}`)}async leaveRoom(e,t=null,{deleteRoomIfEmpty:i=!0}={}){const s=t||this.currentRoomId;if(!s||!e)return;const r=Ka(s,e),o=_i(s),a=Tn(s);try{await ln(r)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await St(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await ln(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!t||t===this.currentRoomId)&&(this.currentRoomId=null)}onMemberJoined(e,t){const i=_i(e);$t(i,"child_added",t,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,t){const i=_i(e);$t(i,"child_removed",t,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,t,i){const s=_i(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return $t(s,"child_added",r,e,t),$t(s,"child_removed",o,e,t),()=>wm(t,e)}get roomId(){return this.currentRoomId}}const K=new Ry,Qi=3e4;let Xe=null,Rn=null;async function Ay(n,e=null){const t=Ve(),i=De();if(!i)return;const s=Ro(i);await We(s,{roomId:n,targetContactName:e,initiatedAt:Date.now(),callerUserId:t})}async function Sr(){const n=De();if(!n)return;const e=Ro(n);await ln(e).catch(()=>{})}async function Ny(n,e){if(!n)return!1;try{const t=Ro(n),i=await St(t);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<Qi}catch(t){return console.warn("Failed to check outgoing call freshness",t),!1}}async function Py(n){if(!n)return!1;try{const e=ae(ie,`rooms/${n}/createdAt`),t=await St(e);if(!t.exists())return!1;const i=t.val();return typeof i!="number"?!1:Date.now()-i<Qi}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Ly(n,e,t){const i=y(),s=Date.now();Kt(),await Ay(n,e);const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;const o=document.createElement("div");o.style.cssText=`
    background: #4d4e54ff;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;const a=document.createElement("h2");a.textContent=`Calling ${e||"contact"}...`,a.style.cssText=`
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #d0d7dbff;
  `;const c=document.createElement("p");c.textContent="Waiting for answer...",c.style.cssText=`
    margin: 0 0 20px 0;
    color: #bbb;
    font-size: 14px;
  `;const l=document.createElement("button");l.textContent="Cancel",l.style.cssText=`
    padding: 10px 24px;
    background: #c34949ff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",n,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([Sr(),K.leaveRoom(Ve(),n)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:n,error:String(d)})}Kt(),k("Call cancelled")};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=n,Xe=r,Rn=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",n,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:Qi});try{await Promise.all([Sr(),K.leaveRoom(Ve(),n)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:n,error:String(d)})}Kt(),k("Call timed out - no answer after 30 seconds")},Qi)}function Kt(){if(Xe){const n=Xe.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",n,{reason:"hide_called",hadTimeout:!!Rn,timestamp:Date.now()})}Rn&&(clearTimeout(Rn),Rn=null),Xe&&(Xe.remove(),Xe=null)}async function ed(){if(Xe){const n=Xe.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",n,{reason:"call_answered",timestamp:Date.now()})}await Sr(),Kt()}function td(n,e={}){return new Promise(t=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${n}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),t(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),t(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}async function pc(n,e,t){const i=De();if(i){const s=ae(ie,`users/${i}/contacts/${n}`);await We(s,{contactId:n,contactName:e,roomId:t,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[n]={contactId:n,contactName:e,roomId:t,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function Xi(){const n=De();if(n)try{const e=ae(ie,`users/${n}/contacts`),t=await St(e);return t.exists()?t.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function Dy(n,e,t){if(!n||!e)return;const s=(await Xi())?.[n];if(s){s.roomId!==e&&(await pc(n,s.contactName,e),await Zi(t));return}if(!await td("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",n)||n;await pc(n,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),rs(e),await Zi(t)}async function Zi(n){if(!n)return;const e=await Xi(),t=Object.keys(e);let i=n.querySelector(".contacts-list");if(i||(i=document.createElement("div"),i.className="contacts-list",i.style.cssText=`
      margin-top: 20px;
      padding: 10px;
      border-top: 1px solid #ccc;
    `,n.appendChild(i)),t.length===0){i.innerHTML='<p style="color: #666;">No saved contacts yet.</p>';return}i.innerHTML=`
    <h3 style="margin: 0 0 10px 0; font-size: 16px;">Saved Contacts</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${t.map(s=>{const r=e[s];return`
            <li style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <button 
                class="contact-call-btn" 
                data-room-id="${r.roomId}"
                data-contact-name="${r.contactName}"
                style="
                  padding: 6px 12px;
                  background: #4CAF50;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                "
              >
                Call
              </button>
              <span style="flex: 1;">${r.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${s}"
                style="
                  padding: 4px 8px;
                  background: #f44336;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                "
              >
                ✕
              </button>
            </li>
          `}).join("")}
    </ul>
  `,Oy(i,n)}function Oy(n,e){n.querySelectorAll(".contact-call-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-room-id"),s=t.getAttribute("data-contact-name");i&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${i}`),rs(i),await Ly(i,s),Ls(i,{forceInitiator:!0}).catch(r=>{console.warn("Failed to call contact:",r),Kt()}))}}),n.querySelectorAll(".contact-delete-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await xy(i),await Zi(e))}})}async function xy(n){const e=De();if(e){try{await ln(ae(ie,`users/${e}/contacts/${n}`))}catch(t){console.warn("Failed to delete contact from RTDB",t)}return}try{const t=localStorage.getItem("contacts")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("contacts",JSON.stringify(i)))}catch(t){console.warn("Failed to delete contact from localStorage",t)}}const nd={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}},kr={desktop:{landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"},portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:9/16},resizeMode:"none"}},mobile:{portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},aspectRatio:{ideal:9/16},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"},landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},aspectRatio:{ideal:16/9},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"}},relyOnBrowserDefaults:!0};function My(){return window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180}function Go(n){const e=My()?"portrait":"landscape";return/Mobi|Android/i.test(navigator.userAgent)?{facingMode:n,...kr.mobile[e]}:{facingMode:n,...kr.desktop[e]}}function Fy(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Uy(){return Fy()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function By(){const n=await Uy();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}async function Wy({localStream:n,localVideo:e,currentFacingMode:t,peerConnection:i=null}){if(!n||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=t==="user"?"environment":"user",r=Go(s);try{const o=await navigator.mediaDevices.getUserMedia({video:r,audio:nd.default}),a=o.getVideoTracks()[0],c=o.getAudioTracks()[0],l=n.getVideoTracks()[0],u=l?l.enabled:!0,d=n.getAudioTracks()[0],h=d?!d.enabled:!1;if(i){const f=i.getSenders().find(m=>m.track&&m.track.kind==="video");f&&f.replaceTrack(a);const g=i.getSenders().find(m=>m.track&&m.track.kind==="audio");g&&c&&g.replaceTrack(c)}return a&&(a.enabled=u),c&&(c.enabled=!h),n.getTracks().forEach(f=>f.stop()),e.srcObject=new MediaStream([a].filter(Boolean)),{newStream:o,facingMode:s}}catch(o){return console.error("Failed to switch camera:",o),null}}let Ks=!1,mt=null,_t=null;function $y({getLocalStream:n,getFacingMode:e}){return mt&&_t&&mt.removeEventListener("change",_t),mt=window.matchMedia("(orientation: portrait)"),_t=()=>{try{const t=typeof n=="function"?n():null,i=typeof e=="function"?e():"user";Vy({localStream:t,currentFacingMode:i})}catch(t){console.error("Orientation handler failed:",t)}},mt.addEventListener("change",_t),()=>{mt&&_t&&mt.removeEventListener("change",_t),mt=null,_t=null}}async function Vy({localStream:n,currentFacingMode:e}){if(!(Ks||!n?.getVideoTracks()[0])){Ks=!0;try{const t=n.getVideoTracks()[0],i=Go(e);Ie("Applying constraints:",i),await t.applyConstraints(i),Ie("Video constraints updated successfully")}catch(t){console.error("Failed to apply orientation constraints:",t)}finally{Ks=!1}}}let Rr=!1,es=[];function Hy(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function jy(n,e,t){t&&(t.muted=!n,t.volume=e)}function zy(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function Gy(n,e){if(!n)return;const t=()=>{if(n.muted!==Rr){const i=e.querySelector("i");i.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",Rr=n.muted}};n.addEventListener("volumechange",t),es.push(()=>{n&&n.removeEventListener("volumechange",t)})}function qy({getLocalStream:n,getLocalVideo:e,getRemoteVideo:t,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){r&&(r.onclick=()=>{const h=n(),f=e();if(!f||!h)return;const g=!f.muted;Hy(!g,h),jy(!g,0,f),zy(g,r)}),o&&(o.onclick=()=>{const h=n();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const g=o.querySelector("i");g.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});let u="user";const d=$y({getLocalStream:n,getFacingMode:()=>u});es.push(d),a&&(a.onclick=async()=>{const h=await Wy({localStream:n(),localVideo:e(),currentFacingMode:u,peerConnection:i()||null});h?(u=h.facingMode,console.log("Switched camera to facingMode:",u),h.newStream&&typeof s=="function"&&s(h.newStream)):console.error("Camera switch failed.")},(async()=>await By()?N(a):C(a))()),c&&(c.onclick=()=>{const h=t();h&&(h.muted=!h.muted)}),l&&(l.onclick=()=>{const h=t();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()})}function Yy(){es.forEach(n=>n()),es=[],Rr=!1}const gc="yt-video-box",Ar="yt-player-root";let B=null,ze=!1;const Mn=()=>B,Ky=()=>ze,id=n=>ze=n,Jt=()=>{const n=document.getElementById(gc);if(!n)throw new Error(`Container #${gc} not found`);return n};function Jy(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function sd(){const n=Jt();if(!document.getElementById(Ar)){const e=document.createElement("div");e.id=Ar,n.appendChild(e)}N(n)}function Nr(){const n=Jt();C(n)}function Js(){const n=Jt();return n&&!n.classList.contains("hidden")}function Pr(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function rd(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const i=n.match(t);if(i&&i[1])return i[1]}return null}async function Qy({url:n,onReady:e,onStateChange:t}){const i=rd(n);if(!i)throw new Error("Invalid YouTube URL");if(await Jy(),B){try{B.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}B=null}const s=(o=!0)=>{const a=Jt(),c=B.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Jt(),h=B.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),B.getPlayerState()!==window.YT.PlayerState.PLAYING?Yo():Ns()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Jt(),a=B.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return sd(),new Promise((o,a)=>{try{B=new window.YT.Player(Ar,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{ze=!0,e&&e(c),o(B)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),t&&t(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function qo(){if(B){try{Nr(),B.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}B=null,ze=!1}}function Yo(){B&&ze&&B.playVideo()}function Ns(){B&&ze&&B.pauseVideo()}function Xy(n){B&&ze&&B.seekTo(n,!0)}function ts(){return B&&ze?B.getCurrentTime():0}function Ko(){return B&&ze?B.getPlayerState():-1}const nt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let be=null,hi=null,od=!1,de="none",Jo=null;const fi=()=>od,ad=n=>od=n,Sn=()=>de,Zy=n=>{["yt","url","none"].includes(n)?de=n:console.warn("Invalid lastWatched platform:",n)};let it=!1,Fn=null,Un=0;async function Qt(n){if(!be)return;console.debug("Updating watch sync state, roomId:",be);const e=ws(be);try{await au(e,{...n,updatedBy:hi})}catch(t){console.error("Failed to update watch state:",t)}}function ev(n,e,t){if(!n)return;be=n,hi=t;const i=ws(n);uu(i,tv,n),cv()}function tv(n){const e=n.val();e&&e.updatedBy!==hi&&(Date.now()-Un<500||(e.url&&e.url!==Jo&&nv(e.url),e.isYouTube?iv(e):av(e)))}function nv(n){Jo=n,Pr(n)?(C(ue),cd(n),de="yt"):(qo(),N(ue),W.src=n,de="url")}function iv(n){!Mn()||!Ky()||(sv(n),rv(n))}function sv(n){const e=Ko(),t=e===nt.PLAYING;if([nt.BUFFERING,nt.UNSTARTED].includes(e)){ov();return}it||(n.playing&&!t?(Yo(),de="yt"):!n.playing&&t&&(Ns(),de="yt"))}function rv(n){if(n.currentTime===void 0)return;const e=ts();Math.abs(e-n.currentTime)>.3&&!it&&(Xy(n.currentTime),setTimeout(()=>{n.playing?Yo():Ns(),de="yt"},500))}function ov(){it=!0,clearTimeout(Fn),Fn=setTimeout(async()=>{it=!1;const n=Ko()===nt.PLAYING;await Qt({playing:n,currentTime:ts()})},700)}function av(n){n.playing!==void 0&&(n.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!n.playing&&!W.paused&&W.pause()),n.currentTime!==void 0&&Math.abs(W.currentTime-n.currentTime)>1&&(W.currentTime=n.currentTime,n.playing?W.play().catch(t=>console.warn("Play failed:",t)):W.pause())}function cv(){W.addEventListener("play",async()=>{!Mn()&&be&&(Un=Date.now(),await Qt({playing:!0,isYouTube:!1})),de="url"}),W.addEventListener("pause",async()=>{!Mn()&&be&&(Un=Date.now(),await Qt({playing:!1,isYouTube:!1})),de="url"}),W.addEventListener("seeked",async()=>{!Mn()&&be&&(Un=Date.now(),await Qt({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),de="url"})}async function lv(n){if(!n)return!1;if(Un=Date.now(),Pr(n)){if(C(ue),!await cd(n))return!1;de="yt"}else qo(),N(ue),W.src=n,de="url";if(be){const e=ws(be);We(e,{url:n,playing:!1,currentTime:0,isYouTube:Pr(n),updatedBy:hi})}return!0}async function Vt(n){if(!n||!n.url)return console.warn("Non-existing or invalid video."),!1;Jo=n.url;const e=await lv(n.url);return Ur(),e}async function cd(n){if(!rd(n))return console.error("Invalid YouTube URL:",n),!1;try{return await Qy({url:n,onReady:t=>{if(id(!0),be){const i=ws(be);We(i,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:hi})}},onStateChange:async t=>{if(!Mn())return;const s=t.data===nt.PLAYING,r=t.data===nt.PAUSED;if(t.data===nt.BUFFERING){it=!0,Fn&&clearTimeout(Fn),Fn=setTimeout(async()=>{it=!1;const c=Ko()===nt.PLAYING;await Qt({playing:c,currentTime:ts()})},700);return}r&&it||!it&&(s||r)&&await Qt({playing:s,currentTime:ts()})}}),!0}catch(t){return console.error("Failed to load YouTube video:",t),!1}}function Lr(n,e,t={}){if(!n||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=t,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(n.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{s&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),s&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",c)}}let Qs=null,Ze=null,F=null,O=null,mc=!1,vi=!1,Se=[],Dr="",X=-1,Or=[];const uv="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",dv="https://www.googleapis.com/youtube/v3";async function hv(){if(mc||vi)return!1;vi=!0;const{initializeYouTubeElements:n}=await Rc(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>ky);return{initializeYouTubeElements:o}},void 0),e=await n();if(Qs=e.searchContainer,Ze=e.searchBtn,F=e.searchQuery,O=e.searchResults,!Qs||!Ze||!F||!O)return console.error("YouTube search elements not found in DOM"),vi=!1,!1;const t=o=>/^https?:\/\//i.test(o),i=o=>{(O?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),X=o??-1};Ze.onclick=async()=>{const o=F.value.trim();if(Wo(F)){N(F),F.focus();return}if(!o){Si(),C(F);return}if(vc()&&o===Dr)xr(Se);else if(!t(o))await _c(o);else{Vt&&await Vt({url:o}),C(O),F.value="",C(F),X=-1;return}},Qs.addEventListener("keydown",async o=>{const a=O.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=X+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=X-1;c<0&&(c=X===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&X>=0){a[X].click(),C(F),C(O),X=-1;return}const c=F.value.trim();if(c)if(vc()&&c===Dr)xr(Se);else if(!t(c))await _c(c);else{Vt&&await Vt({url:c}),C(O),X=-1,F.value="",C(F);return}}else o.key==="Escape"&&(pv()?Si():F.value?F.value="":C(F))}),F.addEventListener("input",()=>{F.value.trim()===""&&Si(),X=-1});const s=Lr(F,()=>C(F),{ignore:[Ze],esc:!1});Or.push(s);const r=Lr(O,()=>C(O),{ignore:[Ze],esc:!1});return Or.push(r),vi=!1,mc=!0,!0}async function _c(n){if(!Ze||!O){console.error("Search elements not initialized");return}Se=[],Dr=n,Ze.disabled=!0,O.innerHTML='<div class="search-loading">Searching YouTube...</div>',N(O);try{const e=await fetch(`${dv}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${uv}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const t=await e.json();if(!t.items||t.items.length===0){yc("No videos found"),Se=[];return}Se=t.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),xr(Se)}catch(e){console.error("YouTube search failed:",e),yc(e.message||"Search failed. Please try again.")}finally{Ze.disabled=!1}}function xr(n){if(!O){console.error("Search results element not initialized");return}if(!n||n.length===0){O.innerHTML='<div class="no-results">No results found</div>',Se=[],X=-1;return}O.innerHTML="",n.forEach(t=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${t.thumbnail}" alt="${t.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${t.title}</div>
        <div class="result-channel">${t.channel}</div>
      </div>
    `,i.onclick=async()=>{if(Vt){if(await Vt(t),C(O),X=-1,!F){console.error("Search query element not initialized");return}F.value="",C(F)}},O.appendChild(i)}),N(O),X=0,O.querySelectorAll(".search-result-item").forEach((t,i)=>{i===X?(t.classList.add("focused"),t.scrollIntoView({block:"nearest"})):t.classList.remove("focused")})}function yc(n){if(Se=[],X=-1,!O){console.error("Search results element not initialized");return}O.innerHTML=`<div class="search-error">${n}</div>`,N(O)}function Si(){Se=[],X=-1,O&&(O.innerHTML="",C(O))}function fv(){Si(),Or.forEach(n=>n())}function pv(){return!Wo(O)}function vc(){return Se.length>0}const gv=n=>String(n).replace(/[&<>"'`=\/]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[t]),mv=(n,e)=>n.replace(/\$\{([^}]+)\}/g,(t,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):gv(String(r))}),_v=(n,e={})=>{const t=document.createElement("template");return t.innerHTML=mv(n,e),t.content.cloneNode(!0)},yv=(n,e)=>{const t=[];let i=e;for(;i&&i!==n;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);t.push(r),i=s}return t.reverse()},vv=(n,e)=>e.reduce((t,i)=>t&&t.children?t.children[i]:null,n),wv=n=>Array.from(n.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:yv(n,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),Ev=n=>n.replace(/["'\\]/g,"\\$&"),Cv=(n,e)=>{e.forEach(t=>{let i=null;if(t.name){const s=Ev(t.name);i=n.querySelector(`input[name="${s}"], textarea[name="${s}"], select[name="${s}"]`)}else t.id?i=n.querySelector(`#${t.id}`):t.path&&(i=vv(n,t.path));if(i){if(i.value=t.value,t.checked!==void 0&&(i.checked=t.checked),t.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(t.selectionStart,t.selectionEnd)}catch{}if(t.wasFocused)try{i.focus()}catch{}}})},bv=n=>Array.from(n.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),Iv=(n,e)=>{const t=n.querySelectorAll("video, audio");for(const i of t)if(i.currentSrc===e||i.src===e)return i;return null},Tv=(n,e)=>{e.forEach(t=>{if(!t.src)return;const i=Iv(n,t.src);i&&(i.currentTime=t.currentTime,i.volume=t.volume,i.playbackRate=t.playbackRate,i.muted=t.muted,t.paused||i.play().catch(()=>{}))})},ld=({initialProps:n,template:e,handlers:t={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0})=>{const u=document.createElement(s);r&&(u.className=r);let d={...n};const h=new Set,f=/\$\{([^}]+)\}/g;let g;for(;(g=f.exec(e))!==null;){const E=g[1].trim().split(".")[0];h.add(E)}const m=[],_=[],b={},A=()=>{let E=[],se=[];l&&(E=wv(u),se=bv(u)),u.textContent="";const Ge=_v(e,d);u.appendChild(Ge),Object.keys(t).forEach(qe=>{const fe=u.querySelectorAll(`[onclick="${qe}"]`),pi=t[qe];fe.forEach(ta=>{ta.removeAttribute("onclick"),typeof pi=="function"&&ta.addEventListener("click",pi)})}),l&&(Cv(u,E),Tv(u,se)),m.forEach(qe=>qe({...d}))},G=E=>{if(!Array.isArray(E)||E.length===0)return;const se={props:{...d},changedKeys:E};_.forEach(Ge=>Ge(se))};for(const E of Object.keys(n))b[E]=[],Object.defineProperty(u,E,{get(){return d[E]},set(se){d[E]!==se&&(d[E]=se,h.has(E)&&A(),b[E].forEach(Ge=>Ge(se)),G([E]))},configurable:!0,enumerable:!0});if(u.update=E=>{let se=!1,Ge=!1;const qe=[];for(const fe in E)E[fe]!==d[fe]&&(d[fe]=E[fe],h.has(fe)&&(Ge=!0),b[fe]&&b[fe].forEach(pi=>pi(E[fe])),se=!0,qe.push(fe));se&&Ge&&A(),qe.length>0&&G(qe)},u.onRender=E=>{typeof E=="function"&&m.push(E)},u.onAnyPropUpdated=E=>{typeof E=="function"&&_.push(E)},u.onPropUpdated=(E,se)=>{typeof se=="function"&&b[E]&&b[E].push(se)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(E=>{typeof E=="function"&&E()}):typeof a=="function"&&a()),m.length=0,_.length=0;for(const E in b)b[E].length=0;u.remove()},A(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch{}return u};function Sv({title:n="",iconHtml:e="",disabledAttr:t="",id:i="",btnClass:s="chat-btn",onClick:r=null,parent:o=null}={}){return ld({initialProps:{title:n,iconHtml:e,disabledAttr:t,id:i,btnClass:s},template:'\n      <button id="${id}" class="${btnClass}" title="${title}" ${disabledAttr} onclick="handleClick">\n        ${iconHtml}\n      </button>\n    ',handlers:{handleClick:r},parent:o})}let wt=null,wc=!1,ce=null;function kv(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function Rv(){if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),ce&&C(ce);return}if(!ce){const e=document.querySelector(".top-right-menu");if(!e){console.warn("[PWA]: .top-right-menu container not found");return}ce=Sv({id:"install-btn",title:"Install App",iconHtml:'<i class="fa fa-plus"></i>',btnClass:"hidden",parent:e})}const n=ce.querySelector("button");if(!n){console.warn("[PWA]: Install button element not found in component");return}if(kv()){ce.update({iconHtml:'<i class="fa fa-info"></i>',title:"Show Install Instructions",btnClass:""}),n.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}wc||(n.addEventListener("click",async()=>{if(!wt){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),"serviceWorker"in navigator||console.warn("[PWA]: Service Workers not supported"),window.location.protocol!=="https:"&&window.location.hostname!=="localhost"&&console.warn("[PWA]: Not served over HTTPS");return}try{await wt.prompt();const{outcome:e}=await wt.userChoice;Ie(`User choice outcome: ${e}`),console.info(e==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),!Ey()&&C(ce),wt=null}catch(e){C(ce),console.error("Error showing install prompt:",e)}}),wc=!0),window.addEventListener("appinstalled",()=>{C(ce),wt=null}),wt?N(ce):C(ce)}window.addEventListener("beforeinstallprompt",n=>{console.debug("[PWA]: beforeinstallprompt fired"),n.preventDefault(),wt=n,ce&&N(ce)});let st=null,rt=null;function Qo(n=!0){return!st||!(st instanceof MediaStream)?(n&&console.error("Invalid remote MediaStream accessed:",st),null):st}function Av(n){st=n}function Nv(){st&&(st.getTracks().forEach(n=>n.stop()),st=null)}function Xn(n=!0){return!rt||!(rt instanceof MediaStream)?(n&&(console.error("Invalid local MediaStream accessed:",rt),console.error("Call createLocalStream() before accessing local stream.")),null):rt}function ud(n){rt=n}function Pv(){rt&&(rt.getTracks().forEach(n=>n.stop()),rt=null)}const Lv=async()=>{const n=Xn(!1);if(n&&n instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),n;const e=Go("user"),t=await navigator.mediaDevices.getUserMedia({video:e||kr.relyOnBrowserDefaults,audio:nd.default});return ud(t),t};async function Dv(n){const e=await Lv(),t=new MediaStream(e.getVideoTracks());return n.srcObject=t,!0}function Ov(n,e,t){return n.ontrack=i=>{if(Ie(`REMOTE TRACK RECEIVED: ${i.track.kind}`),!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;const s=i.streams[0];Qo(!1)!==s&&(Av(s),e.srcObject=s,Gy(e,t),k("Connected!"))},!0}const Zn=new WeakMap;function dd(n,e,t){if(!n||!t)throw new Error("setupIceCandidates: pc and roomId are required");if(Zn.has(n)||Zn.set(n,[]),e==="initiator")Ec(n,"offerCandidates",t),Cc(n,"answerCandidates",t);else if(e==="joiner")Ec(n,"answerCandidates",t),Cc(n,"offerCandidates",t);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Ec(n,e,t){n.onicecandidate=i=>{if(i.candidate){const s=Ya(e==="offerCandidates"?hu(t):fu(t));We(s,i.candidate.toJSON())}}}function Cc(n,e,t){const i=e==="offerCandidates"?hu(t):fu(t);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{n.remoteDescription&&(Xo(n),n.removeEventListener("signalingstatechange",a))};n.addEventListener("signalingstatechange",a)};$t(i,"child_added",a=>{const c=a.val();if(!(!n||n.signalingState==="closed")&&c)if(n.remoteDescription)try{n.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Zn.get(n);l&&(l.push(c),l.length===1&&r())}},t)}function Xo(n){if(!n||!Zn.has(n))return;const e=Zn.get(n);if(e.length!==0){Ie(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const t of e)try{n.addIceCandidate(new RTCIceCandidate(t)).catch(i=>{Ie("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}let Te=null,bc=null;function hd(n){bc=n,n.onconnectionstatechange=()=>{Ie("onconnectionstatechange:",n.connectionState),n.connectionState==="connected"?(k("Connected!"),Zo(),ed().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Te&&(clearTimeout(Te),Te=null)):n.connectionState==="disconnected"?(k("Partner disconnected (reconnecting...)"),Te&&clearTimeout(Te),Te=setTimeout(()=>{n===bc&&n.connectionState==="disconnected"&&(k("Partner disconnected"),os()),Te=null},3e3)):n.connectionState==="failed"&&(k("Connection failed"),Ps(),Te&&(clearTimeout(Te),Te=null),os())},n.addEventListener("iceconnectionstatechange",e=>{Ie("ICE iceconnectionstatechange:",n.iceConnectionState),n.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),n.restartIce())})}function Ic(n){const e=document.createElement("div");e.innerHTML=`
    <div id="messages-toggle-btn" class="hidden">
      <button>
        💬
      </button>
    </div>
    <div id="messages-box" class="messages-box hidden">
      <div id="messages-messages" style="height:150px; overflow-y:auto; background:#111; color:#eee; padding:6px; font-family:sans-serif; font-size:14px;"></div>
      <form id="messages-form" style="display:flex; gap:4px; margin-top:6px;">
        <input id="messages-input" placeholder="Type a message..." style="flex:1; padding:6px; border-radius:4px; border:1px solid #555; background:#222; color:#fff;">
        <button style="padding:6px 12px;">Send</button>
      </form>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!t||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(m=>{m.forEach(_=>{_.type==="attributes"&&_.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function c(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}t.addEventListener("click",c),Lr(i,()=>{C(i)},{ignore:[t],esc:!0});function l(){N(t)}function u(){C(t)}function d(m){const _=document.createElement("p");_.textContent=m,m.startsWith("You:")?_.style.textAlign="right":m.startsWith("Partner:")&&(_.style.textAlign="left"),s.appendChild(_),s.scrollTop=s.scrollHeight}function h(m){d(`Partner: ${m}`),Wo(i)&&f()}function f(){t.classList.add("new-message"),setTimeout(()=>{t.classList.remove("new-message")},4e3)}r.addEventListener("submit",m=>{m.preventDefault();const _=o.value.trim();_&&(n(_),d(`You: ${_}`),o.value="")});function g(){a.disconnect(),t&&u(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:d,receiveMessage:h,toggleMessages:c,showMessagesToggle:l,hideMessagesToggle:u,cleanup:g}}function fd(n,e){let t,i;return e==="initiator"?(t=n.createDataChannel("chat"),i=Ic(r=>{t.readyState==="open"&&t.send(r)}),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)):e==="joiner"&&(n.ondatachannel=s=>{t=s.channel,i=Ic(r=>t.send(r)),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)}),{dataChannel:t,messagesUI:i}}const pd={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Xs=new WeakMap;function xv(n,e,t){Xs.has(n)||Xs.set(n,{});const i=Xs.get(n),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===t?!0:(i[s]=t,!1)}function Mv(n,e){return n?e==="offer"?n.signalingState==="stable":n.signalingState==="have-local-offer"||n.signalingState==="stable":!1}function gd(n,e){e.getTracks().forEach(t=>{n.addTrack(t,e)})}async function Fv(n){const e=await n.createOffer();return await n.setLocalDescription(e),e}async function Uv(n){const e=await n.createAnswer();return await n.setLocalDescription(e),e}async function md(n,e,t){if(xv(n,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Mv(n,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,n.signalingState),!1;try{return await n.setRemoteDescription(new RTCSessionDescription(e)),t(n),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function Bv(){return Math.random().toString(36).substring(2,9)}async function ns({localStream:n,remoteVideoEl:e,mutePartnerBtn:t,setupRemoteStream:i,setupWatchSync:s,onMemberJoined:r,onMemberLeft:o,targetRoomId:a=null}){if(!n)return k("Error: Camera not initialized"),{success:!1};const c=new RTCPeerConnection(pd),l="initiator",u=a||Bv(),d=Ve();gd(c,n);const{dataChannel:h,messagesUI:f}=fd(c,l);if(!i(c,e,t))return k("Error setting up remote stream"),console.error("Error setting up remote stream"),c.close(),{success:!1};dd(c,l,u),hd(c);const m=await Fv(c);await K.createNewRoom(m,d,u);const _=ae(ie,`rooms/${u}/answer`);uu(_,async G=>{const E=G.val();E&&await md(c,E,Xo)},u),s(u,l,d),K.onMemberJoined(u,G=>{G.key!==d&&r(G.key,u)}),K.onMemberLeft(u,G=>{G.key!==d&&c?.connectionState==="connected"&&o(G.key)});const A=`${window.location.origin}${window.location.pathname}?room=${u}`;return k("Waiting for partner to join..."),{success:!0,pc:c,roomId:u,roomLink:A,dataChannel:h,messagesUI:f,role:l}}async function Wv({roomId:n,localStream:e,remoteVideoEl:t,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMemberJoined:o,onMemberLeft:a}){if(!e)return k("Error: Camera not initialized"),{success:!1};if(!n)return k("Error: No room ID"),{success:!1};const c=await K.checkRoomStatus(n);if(!c.exists)return k("Error: Invalid room link"),{success:!1};if(!c.hasMembers)return k("Error: Room is empty - no one to connect with"),{success:!1};let l;try{l=await K.getRoomData(n)}catch(A){return k("Error: "+A.message),{success:!1}}const u=l.offer;if(!u)return k("Error: No offer found"),{success:!1};const d=new RTCPeerConnection(pd),h="joiner",f=Ve();gd(d,e);const{dataChannel:g,messagesUI:m}=fd(d,h);if(!s(d,t,i))return k("Error setting up remote stream"),console.error("Error setting up remote stream for joiner"),d.close(),{success:!1};dd(d,h,n),hd(d),await md(d,u,Xo);const b=await Uv(d);try{await K.saveAnswer(n,b)}catch(A){return console.error("Failed to save answer to Firebase:",A),k("Failed to send answer to partner."),d.close(),{success:!1}}return r(n,h,f),await K.joinRoom(n,f),K.onMemberJoined(n,A=>{A.key!==f&&o(A.key,n)}),K.onMemberLeft(n,A=>{A.key!==f&&d?.connectionState==="connected"&&a(A.key)}),k("Connecting..."),{success:!0,pc:d,roomId:n,dataChannel:g,messagesUI:m,role:h}}let Tc=!1;function $v(n,e){const t=document.createElement("dialog");t.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=n,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),t.appendChild(i),{dialog:t,input:o,copyButton:c,cancelButton:l,feedback:u}}function Vv(n,e={}){const t={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};Hv();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=$v(n,t);jv(i);let c=!1;const l=async()=>{await _d(n,s)?(c=!0,a.textContent=t.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),t.onCopy&&t.onCopy(n),t.autoClose&&setTimeout(()=>{i.close()},t.autoCloseDelay)):(a.textContent=t.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),t.onError&&t.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{t.onCancel&&t.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&t.onCancel&&t.onCancel(),t.onClose&&t.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function Hv(){if(Tc)return;const n=document.createElement("style");n.textContent=`
    .copy-link-dialog {
      border: none;
      border-radius: 12px;
      padding: 0;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      max-width: 90vw;
      width: 480px;

      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      background: #1a1a1a;
      color: #ccc;
    }

    .copy-link-dialog::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
    }

    .copy-link-dialog__content {
      padding: 24px;
    }

    .copy-link-dialog__title {
      margin: 0 0 20px 0;
      font-size: 1.5rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .copy-link-dialog__input-container {
      margin-bottom: 20px;
    }

    .copy-link-dialog__input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      font-family: monospace;
      background-color: #f8f8f8;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }

    .copy-link-dialog__input:focus {
      outline: none;
      border-color: #4a90e2;
    }

    .copy-link-dialog__buttons {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .copy-link-dialog__button {
      padding: 10px 24px;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .copy-link-dialog__button--primary {
      background-color: #4a90e2;
      color: white;
    }

    .copy-link-dialog__button--primary:hover {
      background-color: #357abd;
    }

    .copy-link-dialog__button--primary:active {
      transform: scale(0.98);
    }

    .copy-link-dialog__button--secondary {
      background-color: #e0e0e0;
      color: #333;
    }

    .copy-link-dialog__button--secondary:hover {
      background-color: #d0d0d0;
    }

    .copy-link-dialog__feedback {
      margin: 12px 0 0 0;
      font-size: 0.875rem;
      min-height: 1.2em;
      color: #4a90e2;
      font-weight: 500;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .copy-link-dialog__feedback:empty {
      display: none;
    }

    .copy-link-dialog__feedback--error {
      color: #e74c3c;
    }
  `,document.head.appendChild(n),Tc=!0}function jv(n){n.showModal||(n.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},n.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function _d(n,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(n),!0}catch(t){return console.warn("Clipboard API failed, using fallback:",t),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(t){return console.error("Fallback copy failed:",t),!1}}let kn=null;const zv=n=>{if(kn)return kn;if(!n)return console.error("Auth UI: Parent element is required"),null;let e=null;return kn=ld({initialProps:{isLoggedIn:!1,userName:"Guest User",loginDisabledAttr:"",logoutDisabledAttr:"disabled"},template:`
      <button id="goog-login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Gu,handleLogout:qu},onMount:t=>{e=zu(({isLoggedIn:i,userName:s})=>{t.update({isLoggedIn:i,userName:s,loginDisabledAttr:i?"disabled":"",logoutDisabledAttr:i?"":"disabled"})})},onCleanup:()=>{e&&(e(),e=null),kn=null},className:"auth flex-row",parent:n}),kn};Cy(!0);y().disable();let Re=null,Mr=null,Tt,Xt=null,Fr=null,is=[];const ss=()=>{const n=Qo(!1);return n&&n.getVideoTracks().some(e=>e.enabled)};async function Gv(){const n=Ju(),t=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!n[i]);if(t.length>0)return console.error("Critical elements missing:",t),k("Error: Required UI elements not found."),!1;try{Rv(),hv(),Jv();const i=zv(Is);return i&&is.push(i.dispose),await Dv(_e),qy({getLocalStream:Xn,getLocalVideo:()=>_e,getRemoteVideo:()=>H,getPeerConnection:()=>Re,setLocalStream:ud,micBtn:Rs,cameraBtn:As,switchCameraBtn:Ts,mutePartnerBtn:Ut,fullscreenPartnerBtn:ks}),_e&&(_e.addEventListener("enterpictureinpicture",()=>Z&&C(Z)),_e.addEventListener("leavepictureinpicture",()=>{Z&&!(fi()&&ss())&&N(Z)})),ea(),!0}catch(i){return console.error("Failed to get user media:",i),k("Error: Please allow camera and microphone access."),!1}}function Ps(){window.history.replaceState({},document.title,window.location.pathname)}function Bn(n=null){return{localStream:Xn(),remoteVideoEl:H,mutePartnerBtn:Ut,setupRemoteStream:Ov,setupWatchSync:ev,onMemberJoined:(e,t)=>{Mr=e,Zo(),ed().catch(i=>console.warn("Failed to clear calling state:",i)),qv(t).catch(i=>console.warn("Failed to save recent call:",i))},onMemberLeft:e=>{console.info("Partner has left the call")},targetRoomId:n}}function Wn(n,e=!1){return n.success?(Re=n.pc,n.role,n.dataChannel,Tt=n.messagesUI,Fr=n.roomId,Xt=n.roomLink||null,e&&Xt&&Vv(Xt,{onCopy:()=>k("Link ready! Share with your partner."),onCancel:()=>k("Link ready! Use the copy button to use it, or create a new one.")}),He.disabled=!1,!0):!1}async function Ls(n,{forceInitiator:e=!1}={}){const t=Date.now();if(e){y().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await ns(Bn(n));return Wn(r,!1)}let i=await K.checkRoomStatus(n);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await K.checkRoomStatus(n),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await ns(Bn(n));return Wn(r,!0)}k("Joining room..."),y().log("ROOM","JOINING_EXISTING",{roomId:n,memberCount:i.memberCount,roomExists:i.exists});const s=await Wv({roomId:n,...Bn()});return Wn(s,!1)}const et=new Set;async function qv(n){const e=Date.now(),t=e+1440*60*1e3,i=De();if(i){const s=du(i,n);await We(s,{roomId:n,savedAt:e,expiresAt:t});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[n]={roomId:n,savedAt:e,expiresAt:t},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function Sc(n){const e=De();if(e){try{await ln(du(e,n))}catch(t){console.warn("Failed to remove recent call from RTDB",t)}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(t){console.warn("Failed to remove recent call from localStorage",t)}}function rs(n){if(n){if(et.has(n)){y().logDuplicateListener(n,"member_join",{currentListenerCount:et.size});return}Ie(`[LISTENER] Attaching new listener for room: ${n} (total: ${et.size+1})`),et.add(n),y().logListenerAttachment(n,"member_join",et.size,{action:"incoming_call_listener_attached"}),K.onMemberJoined(n,async e=>{const t=e.key,i=e.val?e.val():null,s=Ve();if(t&&t!==s){y().logMemberJoinEvent(n,t,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const b=await Ny(t,n),A=await Py(n);a=b||A,c=b?"outgoingState":A?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(t,n,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",n,{age:l,validationMethod:c,joiningUserId:t});return}let d;try{d=await K.getRoomData(n)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,g=d.createdBy;if(!h||f||g===s)return;if(!!Re&&Re.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",n,{joiningUserId:t,currentCallState:Re?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",n,{joiningUserId:t,freshnessResult:u}),await td(`Incoming call from ${t} for room ${n}.

Accept?`)?(y().logNotificationDecision("ACCEPT","user_accepted",n,{joiningUserId:t}),Ls(n).catch(b=>{console.warn("Failed to answer incoming call:",b),k("Failed to answer incoming call."),y().logFirebaseOperation("join_room_on_accept",!1,b,{roomId:n,joiningUserId:t})})):(y().logNotificationDecision("REJECT","user_rejected",n,{joiningUserId:t}),await Sc(n).catch(b=>{console.warn("Failed to remove recent call on rejection:",b)}))}}),K.onMemberLeft(n,async e=>{const t=e.key,i=Ve();if(!(!t||t===i))try{(await K.checkRoomStatus(n)).hasMembers||(await Sc(n),Ie(`Removed saved recent call for room ${n} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}})}}async function Yv(){const n=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:n,currentListenerCount:et.size});try{if(typeof window<"u"){const{getCurrentUserAsync:t}=await Rc(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>Ty);return{getCurrentUserAsync:i}},void 0);await t()}}catch{}const e=De();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const t=Em(e);try{const i=await St(t),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await ln(ref(ie,`users/${e}/recentCalls/${o}`)).catch(()=>{});continue}r.add(o)}try{const o=await Xi();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>rs(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:et.size,duration:Date.now()-n})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await Xi();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>rs(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:et.size,duration:Date.now()-n,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(t){console.warn("Failed to read recent calls from localStorage",t),y().logFirebaseOperation("read_recent_calls",!1,t,{storage:"localStorage"})}}let Ae=null,Zs=null,er=null;function Kv(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ur(){if(!fi()){if(ad(!0),C(je),Ce.classList.remove("bottom"),Ce.classList.add("watch-mode"),N(Ce),Ae&&(Ae(),Ae=null),!ss()){C(U),It(U),Tr(_e)||(N(Z),Rt(Z));return}C(Z),It(Z),Tr(H)?(C(U),It(U)):Kv()?H.requestPictureInPicture().then(()=>{C(U),It(U)}).catch(n=>{console.warn("Failed to enter Picture-in-Picture:",n),Rt(U),N(U)}):(Rt(U),N(U))}}function ki(){fi()&&(Ce.classList.remove("watch-mode"),Ce.classList.add("bottom"),Ae||(Ae=Zu(Ce,{inactivityMs:3e3,hideOnEsc:!0})),ss()&&(Tr(U)&&document.exitPictureInPicture().catch(n=>{console.error("Failed to exit Picture-in-Picture:",n)}),It(U),N(U)),Rt(Z),N(Z),ss()||(N(je),N(pt),N(He)),ad(!1))}let wi=!1,Zo=()=>{const n=Qo(!1);if(!H||!n||H.paused||H.readyState<2){wi||(wi=!0,H.addEventListener("playing",()=>{wi=!1,Zo()},{once:!0}));return}if(wi=!1,N(U),Rt(Z),C(je),C(pt),C(He),Ft.disabled=!0,Ut.disabled=!1,wn.disabled=!1,Ae||(Ae=Zu(Ce,{inactivityMs:2500,hideOnEsc:!0})),!Zs){const e=()=>{fi()?Rt(U):It(U),N(U)};H.addEventListener("leavepictureinpicture",e),Zs=()=>H.removeEventListener("leavepictureinpicture",e),is.push(Zs)}if(!er){const e=()=>C(U);H.addEventListener("enterpictureinpicture",e),er=()=>H.removeEventListener("enterpictureinpicture",e),is.push(er)}},ea=()=>{It(U),C(U),Rt(Z),N(Z),Ft.disabled=!1,wn.disabled=!0,Ut.disabled=!0,Ae&&(Ae(),Ae=null),N(Ce),pt.disabled=!1,He.disabled=!0,N(je),N(pt),N(He)};function tr(){return W&&ue&&!ue.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let kc=!1;function Jv(){if(kc)return;const n=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{n()||((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",Sn()),console.log("isYTVisible():",Js()),console.log("isSharedVideoVisible():",tr()),console.log("isWatchModeActive():",fi()),Sn()==="yt"?Js()?(Nr(),ki()):(sd(),Ur()):Sn()==="url"&&(tr()?(C(ue),ki()):(N(ue),Ur()))),(e.key==="m"||e.key==="M")&&Tt&&Tt.toggleMessages()),e.key==="Escape"&&(Sn()==="yt"&&Js()?(Ns(),Nr()):Sn()==="url"&&tr()&&(W.pause(),C(ue)),ki())}),kc=!0}async function Qv(){Xt&&(await _d(Xt)?(k("Link copied to clipboard!"),alert("Link copied!")):k("Failed to copy link to clipboard."))}Ft.onclick=async()=>{const n=await ns(Bn());Wn(n,!0)};pt.onclick=async()=>{const n=await ns(Bn());Wn(n,!0)};He.onclick=async()=>await Qv();wn.onclick=async()=>await os();function Xv(n){let e=n.trim();if(!e)return"";try{const t=new URL(e,window.location.origin),i=t.searchParams.get("room");if(i)return i;const s=t.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):t.pathname.replace(/^\//,"")||e}catch{return e}}async function Zv(n=5e3){if(Xn())return!0;const e=Date.now();return new Promise(t=>{const i=()=>{if(Xn())return t(!0);if(Date.now()-e>n)return t(!1);setTimeout(i,150)};i()})}async function ew(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const t=await Ls(e);return t||(Ps(),ea()),k("Auto-joined room from URL"),t}window.onload=async()=>{if(!await Gv()){Ft.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}const e=async s=>{const r=Xv(s||"");if(!r)return k("Please enter a valid Room ID"),!1;if(!await Zv(5e3))return k("Waiting for camera/mic to be ready..."),!1;try{return await Ls(r)}catch(a){return console.error("Failed to join or create room:",a),k("Error joining room. Please try again."),!1}},t=document.getElementById("join-room-container");t&&wd(t,e),await Yv().catch(s=>console.warn("Failed to start saved-room listeners",s)),Zi(je).catch(s=>{console.warn("Failed to render contacts list:",s)}),!await ew()&&k('Ready. Click "Start New Chat" to begin.')};window.addEventListener("beforeunload",async n=>{if(Re&&Re.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;await tw()});let nr=!1;async function os(){if(nr)return;nr=!0,console.debug("Hanging up..."),Kt();const n=Mr,e=Fr;try{await K.leaveRoom(Ve())}catch(t){console.warn("leaveRoom failed during hangUp:",t)}Nv(),H&&(H.srcObject=null),Re&&(Re.close(),Re=null),ea(),k('Disconnected. Click "Start New Chat" to begin.'),n&&e&&setTimeout(()=>{Dy(n,e,je).catch(t=>{console.warn("Failed to save contact:",t)})},500),Mr=null,Fr=null,Ps(),nr=!1}async function tw(){await os(),Yy(),vm(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(n=>console.error(n)),Tt&&Tt.cleanup&&(Tt.cleanup(),Tt=null),window.history.replaceState({},document.title,window.location.pathname),Xt=null,W.src="",Ss.textContent="",Pv(),_e&&(_e.srcObject=null),H&&(H.srcObject=null),ki(),Ps(),Zy("none"),qo(),id(!1),fv(),is.forEach(n=>n())}
