(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const pe=document.getElementById("localVideo"),F=document.getElementById("remoteVideo"),$t=document.getElementById("sharedVideo"),Tt=document.getElementById("startChat"),Tn=document.getElementById("hangUp"),hi=document.getElementById("copyLink"),Pt=document.getElementById("pipBtn"),Jn=document.getElementById("switchCameraBtn"),sn=document.getElementById("toggleMute"),rn=document.getElementById("toggleVideo"),Ht=document.getElementById("toggleMode"),Va=document.getElementById("loadStream"),$a=document.getElementById("status"),xr=document.getElementById("linkContainer"),Or=document.getElementById("watchContainer"),Mr=document.querySelector(".video-container"),zt=document.getElementById("syncStatus"),on=document.getElementById("shareLink"),Qe=document.getElementById("streamUrl"),xs=document.getElementById("mutePartnerBtn"),Ha=document.getElementById("fullscreenPartnerBtn"),Lr=document.getElementById("muteSelfBtn"),za=document.getElementById("fullscreenSelfBtn"),Ui="hangvidu_session",ja=1440*60*1e3;function Ga(n){const e={...n,timestamp:Date.now()};localStorage.setItem(Ui,JSON.stringify(e))}function qa(){const n=localStorage.getItem(Ui);if(!n)return null;try{const e=JSON.parse(n);return Date.now()-e.timestamp>ja?(di(),null):e}catch(e){return console.error("Failed to parse stored state:",e),di(),null}}function di(){localStorage.removeItem(Ui)}/**
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
 */const Ya=()=>{};var Os={};/**
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
 */const Fr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const f=function(n,e){if(!n)throw ut(e)},ut=function(n){return new Error("Firebase Database ("+Fr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Br=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Qa=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Vi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(t[d],t[u],t[h],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Br(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qa(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new Ka;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const _=c<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ka extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wr=function(n){const e=Br(n);return Vi.encodeByteArray(e,!0)},an=function(n){return Wr(n).replace(/\./g,"")},ln=function(n){try{return Vi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ja(n){return Nt(void 0,n)}function Nt(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Xa(t)||(n[t]=Nt(n[t],e[t]));return n}function Xa(n){return n!=="__proto__"}/**
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
 */function Ur(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Za=()=>Ur().__FIREBASE_DEFAULTS__,el=()=>{if(typeof process>"u"||typeof Os>"u")return;const n=Os.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},tl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ln(n[1]);return e&&JSON.parse(e)},nl=()=>{try{return Ya()||Za()||el()||tl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},$i=()=>nl()?.config;/**
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
 */class j{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function Hi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function il(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function sl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[an(JSON.stringify(t)),an(JSON.stringify(o)),""].join(".")}const Ct={};function rl(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ct))Ct[e]?n.emulator.push(e):n.prod.push(e);return n}function ol(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ms=!1;function al(n,e){if(typeof window>"u"||typeof document>"u"||!Hi(window.location.host)||Ct[n]===e||Ct[n]||Ms)return;Ct[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=rl().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,p){h.setAttribute("width","24"),h.setAttribute("id",p),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Ms=!0,o()},h}function d(h,p){h.setAttribute("id",p),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=ol(i),p=t("text"),_=document.getElementById(p)||document.createElement("span"),E=t("learnmore"),D=document.getElementById(E)||document.createElement("a"),ee=t("preprendIcon"),oe=document.getElementById(ee)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const we=h.element;a(we),d(D,E);const We=c();l(oe,ee),we.append(oe,_,D,We),document.body.appendChild(we)}r?(_.innerText="Preview backend disconnected.",oe.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(oe.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",p)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
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
 */function ll(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ll())}function cl(){return typeof window<"u"||$r()}function $r(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function ul(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function hl(){return Fr.NODE_ADMIN===!0}function dl(){try{return typeof indexedDB=="object"}catch{return!1}}function fl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const pl="FirebaseError";class ht extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=pl,Object.setPrototypeOf(this,ht.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Pn.prototype.create)}}class Pn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?_l(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new ht(s,a,i)}}function _l(n,e){return n.replace(ml,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const ml=/\{\$([^}]+)}/g;/**
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
 */function Rt(n){return JSON.parse(n)}function x(n){return JSON.stringify(n)}/**
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
 */const Hr=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Rt(ln(r[0])||""),t=Rt(ln(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},gl=function(n){const e=Hr(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},yl=function(n){const e=Hr(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function J(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function ze(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function fi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function cn(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function un(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Ls(r)&&Ls(o)){if(!un(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ls(n){return n!==null&&typeof n=="object"}/**
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
 */function vl(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class Cl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function wl(n,e){const t=new El(n,e);return t.subscribe.bind(t)}class El{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");bl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Xn),s.error===void 0&&(s.error=Xn),s.complete===void 0&&(s.complete=Xn);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Xn(){}/**
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
 */const y=function(n,e,t,i){let s;if(i<e?s="at least "+e:i>t&&(s=t===0?"none":"no more than "+t),s){const r=n+" failed: Was called with "+i+(i===1?" argument.":" arguments.")+" Expects "+s+".";throw new Error(r)}};function q(n,e){return`${n} failed: ${e} argument `}function M(n,e,t,i){if(!(i&&!t)&&typeof t!="function")throw new Error(q(n,e)+"must be a valid function.")}function Fs(n,e,t,i){if(t&&(typeof t!="object"||t===null))throw new Error(q(n,e)+"must be a valid context object.")}/**
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
 */const Il=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Nn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Z(n){return n&&n._delegate?n._delegate:n}class ye{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Ue="[DEFAULT]";/**
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
 */class pi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new j;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Tl(e))try{this.getOrInitializeService({instanceIdentifier:Ue})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ue){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ue){return this.instances.has(e)}getOptions(e=Ue){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Sl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ue){return this.component?this.component.multipleInstances?e:Ue:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Sl(n){return n===Ue?void 0:n}function Tl(n){return n.instantiationMode==="EAGER"}/**
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
 */class zi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new pi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */const ji=[];var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const zr={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},Pl=S.INFO,Nl={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Rl=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Nl[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rn{constructor(e){this.name=e,this._logLevel=Pl,this._logHandler=Rl,this._userLogHandler=null,ji.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}function Al(n){ji.forEach(e=>{e.setLogLevel(n)})}function kl(n,e){for(const t of ji){let i=null;e&&e.level&&(i=zr[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(s,r,...o)=>{const a=o.map(l=>{if(l==null)return null;if(typeof l=="string")return l;if(typeof l=="number"||typeof l=="boolean")return l.toString();if(l instanceof Error)return l.message;try{return JSON.stringify(l)}catch{return null}}).filter(l=>l).join(" ");r>=(i??s.logLevel)&&n({level:S[r].toLowerCase(),message:a,args:o,type:s.name})}}}const Dl=(n,e)=>e.some(t=>n instanceof t);let Bs,Ws;function xl(){return Bs||(Bs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ol(){return Ws||(Ws=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jr=new WeakMap,_i=new WeakMap,Gr=new WeakMap,Zn=new WeakMap,Gi=new WeakMap;function Ml(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Se(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&jr.set(t,n)}).catch(()=>{}),Gi.set(e,n),e}function Ll(n){if(_i.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});_i.set(n,e)}let mi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _i.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Gr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Se(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Fl(n){mi=n(mi)}function Bl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ei(this),e,...t);return Gr.set(i,e.sort?e.sort():[e]),Se(i)}:Ol().includes(n)?function(...e){return n.apply(ei(this),e),Se(jr.get(this))}:function(...e){return Se(n.apply(ei(this),e))}}function Wl(n){return typeof n=="function"?Bl(n):(n instanceof IDBTransaction&&Ll(n),Dl(n,xl())?new Proxy(n,mi):n)}function Se(n){if(n instanceof IDBRequest)return Ml(n);if(Zn.has(n))return Zn.get(n);const e=Wl(n);return e!==n&&(Zn.set(n,e),Gi.set(e,n)),e}const ei=n=>Gi.get(n);function Ul(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Se(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Se(o.result),l.oldVersion,l.newVersion,Se(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Vl=["get","getKey","getAll","getAllKeys","count"],$l=["put","add","delete","clear"],ti=new Map;function Us(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ti.get(e))return ti.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=$l.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Vl.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return ti.set(e,r),r}Fl(n=>({...n,get:(e,t,i)=>Us(e,t)||n.get(e,t,i),has:(e,t)=>!!Us(e,t)||n.has(e,t)}));/**
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
 */class Hl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(zl(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function zl(n){return n.getComponent()?.type==="VERSION"}const hn="@firebase/app",gi="0.14.4";/**
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
 */const ve=new Rn("@firebase/app"),jl="@firebase/app-compat",Gl="@firebase/analytics-compat",ql="@firebase/analytics",Yl="@firebase/app-check-compat",Ql="@firebase/app-check",Kl="@firebase/auth",Jl="@firebase/auth-compat",Xl="@firebase/database",Zl="@firebase/data-connect",ec="@firebase/database-compat",tc="@firebase/functions",nc="@firebase/functions-compat",ic="@firebase/installations",sc="@firebase/installations-compat",rc="@firebase/messaging",oc="@firebase/messaging-compat",ac="@firebase/performance",lc="@firebase/performance-compat",cc="@firebase/remote-config",uc="@firebase/remote-config-compat",hc="@firebase/storage",dc="@firebase/storage-compat",fc="@firebase/firestore",pc="@firebase/ai",_c="@firebase/firestore-compat",mc="firebase",gc="12.4.0";/**
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
 */const Ae="[DEFAULT]",yc={[hn]:"fire-core",[jl]:"fire-core-compat",[ql]:"fire-analytics",[Gl]:"fire-analytics-compat",[Ql]:"fire-app-check",[Yl]:"fire-app-check-compat",[Kl]:"fire-auth",[Jl]:"fire-auth-compat",[Xl]:"fire-rtdb",[Zl]:"fire-data-connect",[ec]:"fire-rtdb-compat",[tc]:"fire-fn",[nc]:"fire-fn-compat",[ic]:"fire-iid",[sc]:"fire-iid-compat",[rc]:"fire-fcm",[oc]:"fire-fcm-compat",[ac]:"fire-perf",[lc]:"fire-perf-compat",[cc]:"fire-rc",[uc]:"fire-rc-compat",[hc]:"fire-gcs",[dc]:"fire-gcs-compat",[fc]:"fire-fst",[_c]:"fire-fst-compat",[pc]:"fire-vertex","fire-js":"fire-js",[mc]:"fire-js-all"};/**
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
 */const ke=new Map,nt=new Map,it=new Map;function At(n,e){try{n.container.addComponent(e)}catch(t){ve.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function qr(n,e){n.container.addOrOverwriteComponent(e)}function st(n){const e=n.name;if(it.has(e))return ve.debug(`There were multiple attempts to register component ${e}.`),!1;it.set(e,n);for(const t of ke.values())At(t,n);for(const t of nt.values())At(t,n);return!0}function Yr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function vc(n,e,t=Ae){Yr(n,e).clearInstance(t)}function qi(n){return n.options!==void 0}function Qr(n){return qi(n)?!1:"authIdToken"in n||"appCheckToken"in n||"releaseOnDeref"in n||"automaticDataCollectionEnabled"in n}function Kr(n){return n==null?!1:n.settings!==void 0}function Cc(){it.clear()}/**
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
 */const wc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},K=new Pn("app","Firebase",wc);/**
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
 */let Jr=class{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ye("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw K.create("app-deleted",{appName:this._name})}};/**
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
 */function Vs(n,e){const t=ln(n.split(".")[1]);if(t===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(t).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const s=JSON.parse(t).exp*1e3,r=new Date().getTime();s-r<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class Ec extends Jr{constructor(e,t,i,s){const r=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!0,o={name:i,automaticDataCollectionEnabled:r};if(e.apiKey!==void 0)super(e,o,s);else{const a=e;super(a.options,o,s)}this._serverConfig={automaticDataCollectionEnabled:r,...t},this._serverConfig.authIdToken&&Vs(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&Vs(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,me(hn,gi,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){Ki(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw K.create("server-app-deleted")}}/**
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
 */const Yi=gc;function Qi(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Ae,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw K.create("bad-app-name",{appName:String(s)});if(t||(t=$i()),!t)throw K.create("no-options");const r=ke.get(s);if(r){if(un(t,r.options)&&un(i,r.config))return r;throw K.create("duplicate-app",{appName:s})}const o=new zi(s);for(const l of it.values())o.addComponent(l);const a=new Jr(t,i,o);return ke.set(s,a),a}function bc(n,e={}){if(cl()&&!$r())throw K.create("invalid-server-app-environment");let t,i=e||{};if(n&&(qi(n)?t=n.options:Qr(n)?i=n:t=n),i.automaticDataCollectionEnabled===void 0&&(i.automaticDataCollectionEnabled=!0),t||(t=$i()),!t)throw K.create("no-options");const s={...i,...t};s.releaseOnDeref!==void 0&&delete s.releaseOnDeref;const r=d=>[...d].reduce((u,h)=>Math.imul(31,u)+h.charCodeAt(0)|0,0);if(i.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw K.create("finalization-registry-not-supported",{});const o=""+r(JSON.stringify(s)),a=nt.get(o);if(a)return a.incRefCount(i.releaseOnDeref),a;const l=new zi(o);for(const d of it.values())l.addComponent(d);const c=new Ec(t,i,o,l);return nt.set(o,c),c}function Ic(n=Ae){const e=ke.get(n);if(!e&&n===Ae&&$i())return Qi();if(!e)throw K.create("no-app",{appName:n});return e}function Sc(){return Array.from(ke.values())}async function Ki(n){let e=!1;const t=n.name;ke.has(t)?(e=!0,ke.delete(t)):nt.has(t)&&n.decRefCount()<=0&&(nt.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(i=>i.delete())),n.isDeleted=!0)}function me(n,e,t){let i=yc[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ve.warn(o.join(" "));return}st(new ye(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function Xr(n,e){if(n!==null&&typeof n!="function")throw K.create("invalid-log-argument");kl(n,e)}function Zr(n){Al(n)}/**
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
 */const Tc="firebase-heartbeat-database",Pc=1,kt="firebase-heartbeat-store";let ni=null;function eo(){return ni||(ni=Ul(Tc,Pc,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(kt)}catch(t){console.warn(t)}}}}).catch(n=>{throw K.create("idb-open",{originalErrorMessage:n.message})})),ni}async function Nc(n){try{const t=(await eo()).transaction(kt),i=await t.objectStore(kt).get(to(n));return await t.done,i}catch(e){if(e instanceof ht)ve.warn(e.message);else{const t=K.create("idb-get",{originalErrorMessage:e?.message});ve.warn(t.message)}}}async function $s(n,e){try{const i=(await eo()).transaction(kt,"readwrite");await i.objectStore(kt).put(e,to(n)),await i.done}catch(t){if(t instanceof ht)ve.warn(t.message);else{const i=K.create("idb-set",{originalErrorMessage:t?.message});ve.warn(i.message)}}}function to(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Rc=1024,Ac=30;class kc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new xc(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Hs();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Ac){const s=Oc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ve.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Hs(),{heartbeatsToSend:t,unsentEntries:i}=Dc(this._heartbeatsCache.heartbeats),s=an(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ve.warn(e),""}}}function Hs(){return new Date().toISOString().substring(0,10)}function Dc(n,e=Rc){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),zs(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),zs(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class xc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return dl()?fl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Nc(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return $s(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return $s(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function zs(n){return an(JSON.stringify({version:2,heartbeats:n})).length}function Oc(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Mc(n){st(new ye("platform-logger",e=>new Hl(e),"PRIVATE")),st(new ye("heartbeat",e=>new kc(e),"PRIVATE")),me(hn,gi,n),me(hn,gi,"esm2020"),me("fire-js","")}Mc("");const Lc=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:ht,SDK_VERSION:Yi,_DEFAULT_ENTRY_NAME:Ae,_addComponent:At,_addOrOverwriteComponent:qr,_apps:ke,_clearComponents:Cc,_components:it,_getProvider:Yr,_isFirebaseApp:qi,_isFirebaseServerApp:Kr,_isFirebaseServerAppSettings:Qr,_registerComponent:st,_removeServiceInstance:vc,_serverApps:nt,deleteApp:Ki,getApp:Ic,getApps:Sc,initializeApp:Qi,initializeServerApp:bc,onLog:Xr,registerVersion:me,setLogLevel:Zr},Symbol.toStringTag,{value:"Module"}));/**
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
 */class Fc{constructor(e,t){this._delegate=e,this.firebase=t,At(e,new ye("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Ki(this._delegate)))}_getService(e,t=Ae){this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&i.getComponent()?.instantiationMode==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:t})}_removeServiceInstance(e,t=Ae){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){At(this._delegate,e)}_addOrOverwriteComponent(e){qr(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
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
 */const Bc={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},js=new Pn("app-compat","Firebase",Bc);/**
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
 */function Wc(n){const e={},t={__esModule:!0,initializeApp:r,app:s,registerVersion:me,setLogLevel:Zr,onLog:Xr,apps:null,SDK_VERSION:Yi,INTERNAL:{registerComponent:a,removeApp:i,useAsService:l,modularAPIs:Lc}};t.default=t,Object.defineProperty(t,"apps",{get:o});function i(c){delete e[c]}function s(c){if(c=c||Ae,!J(e,c))throw js.create("no-app",{appName:c});return e[c]}s.App=n;function r(c,d={}){const u=Qi(c,d);if(J(e,u.name))return e[u.name];const h=new n(u,t);return e[u.name]=h,h}function o(){return Object.keys(e).map(c=>e[c])}function a(c){const d=c.name,u=d.replace("-compat","");if(st(c)&&c.type==="PUBLIC"){const h=(p=s())=>{if(typeof p[u]!="function")throw js.create("invalid-app-argument",{appName:d});return p[u]()};c.serviceProps!==void 0&&Nt(h,c.serviceProps),t[u]=h,n.prototype[u]=function(...p){return this._getService.bind(this,d).apply(this,c.multipleInstances?p:[])}}return c.type==="PUBLIC"?t[u]:null}function l(c,d){return d==="serverAuth"?null:d}return t}/**
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
 */function no(){const n=Wc(Fc);n.INTERNAL={...n.INTERNAL,createFirebaseNamespace:no,extendNamespace:e,createSubscribe:wl,ErrorFactory:Pn,deepExtend:Nt};function e(t){Nt(n,t)}return n}const Uc=no();/**
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
 */const Gs=new Rn("@firebase/app-compat"),Vc="@firebase/app-compat",$c="0.5.4";/**
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
 */function Hc(n){me(Vc,$c,n)}/**
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
 */try{const n=Ur();if(n.firebase!==void 0){Gs.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=n.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&Gs.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const Dt=Uc;Hc();var zc="firebase",jc="12.4.0";/**
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
 */Dt.registerVersion(zc,jc,"app-compat");var qs={};const Ys="@firebase/database",Qs="1.1.0";/**
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
 */let io="";function so(n){io=n}/**
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
 */class Gc{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Rt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class qc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return J(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const ro=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Gc(e)}}catch{}return new qc},$e=ro("localStorage"),yi=ro("sessionStorage");/**
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
 */const et=new Rn("@firebase/database"),oo=(function(){let n=1;return function(){return n++}})(),ao=function(n){const e=Il(n),t=new Cl;t.update(e);const i=t.digest();return Vi.encodeByteArray(i)},jt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=jt.apply(null,i):typeof i=="object"?e+=x(i):e+=i,e+=" "}return e};let He=null,Ks=!0;const lo=function(n,e){f(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(et.logLevel=S.VERBOSE,He=et.log.bind(et),e&&yi.set("logging_enabled",!0)):typeof n=="function"?He=n:(He=null,yi.remove("logging_enabled"))},B=function(...n){if(Ks===!0&&(Ks=!1,He===null&&yi.get("logging_enabled")===!0&&lo(!0)),He){const e=jt.apply(null,n);He(e)}},Gt=function(n){return function(...e){B(n,...e)}},vi=function(...n){const e="FIREBASE INTERNAL ERROR: "+jt(...n);et.error(e)},de=function(...n){const e=`FIREBASE FATAL ERROR: ${jt(...n)}`;throw et.error(e),new Error(e)},H=function(...n){const e="FIREBASE WARNING: "+jt(...n);et.warn(e)},Yc=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&H("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},An=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Qc=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},De="[MIN_NAME]",Ce="[MAX_NAME]",Ke=function(n,e){if(n===e)return 0;if(n===De||e===Ce)return-1;if(e===De||n===Ce)return 1;{const t=Js(n),i=Js(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Kc=function(n,e){return n===e?0:n<e?-1:1},mt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+x(e))},Ji=function(n){if(typeof n!="object"||n===null)return x(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=x(e[i]),t+=":",t+=Ji(n[e[i]]);return t+="}",t},co=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function U(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const uo=function(n){f(!An(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Jc=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Xc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Zc(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const eu=new RegExp("^-?(0*)\\d{1,10}$"),tu=-2147483648,nu=2147483647,Js=function(n){if(eu.test(n)){const e=Number(n);if(e>=tu&&e<=nu)return e}return null},dt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw H("Exception was thrown by user callback.",t),e},Math.floor(0))}},iu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},wt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class su{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Kr(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){H(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class ru{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',H(e)}}class tt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}tt.OWNER="owner";/**
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
 */const Xi="5",ho="v",fo="s",po="r",_o="f",mo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,go="ls",yo="p",Ci="ac",vo="websocket",Co="long_polling";/**
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
 */class wo{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=$e.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&$e.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ou(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Eo(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===vo)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Co)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ou(n)&&(t.ns=n.namespace);const s=[];return U(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class au{constructor(){this.counters_={}}incrementCounter(e,t=1){J(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Ja(this.counters_)}}/**
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
 */const ii={},si={};function Zi(n){const e=n.toString();return ii[e]||(ii[e]=new au),ii[e]}function lu(n,e){const t=n.toString();return si[t]||(si[t]=e()),si[t]}/**
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
 */class cu{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&dt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Xs="start",uu="close",hu="pLPCommand",du="pRTLPCB",bo="id",Io="pw",So="ser",fu="cb",pu="seg",_u="ts",mu="d",gu="dframe",To=1870,Po=30,yu=To-Po,vu=25e3,Cu=3e4;class Ee{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gt(e),this.stats_=Zi(t),this.urlFn=l=>(this.appCheckToken&&(l[Ci]=this.appCheckToken),Eo(t,Co,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new cu(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Cu)),Qc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new es((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Xs)this.id=a,this.password=l;else if(o===uu)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Xs]="t",i[So]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[fu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[ho]=Xi,this.transportSessionId&&(i[fo]=this.transportSessionId),this.lastSessionId&&(i[go]=this.lastSessionId),this.applicationId&&(i[yo]=this.applicationId),this.appCheckToken&&(i[Ci]=this.appCheckToken),typeof location<"u"&&location.hostname&&mo.test(location.hostname)&&(i[po]=_o);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ee.forceAllow_=!0}static forceDisallow(){Ee.forceDisallow_=!0}static isAvailable(){return Ee.forceAllow_?!0:!Ee.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Jc()&&!Xc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Wr(t),s=co(i,yu);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[gu]="t",i[bo]=e,i[Io]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=x(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class es{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=oo(),window[hu+this.uniqueCallbackIdentifier]=e,window[du+this.uniqueCallbackIdentifier]=t,this.myIFrame=es.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[bo]=this.myID,e[Io]=this.myPW,e[So]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Po+i.length<=To;){const o=this.pendingSegs.shift();i=i+"&"+pu+s+"="+o.seg+"&"+_u+s+"="+o.ts+"&"+mu+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(vu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const wu=16384,Eu=45e3;let dn=null;typeof MozWebSocket<"u"?dn=MozWebSocket:typeof WebSocket<"u"&&(dn=WebSocket);class te{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gt(this.connId),this.stats_=Zi(t),this.connURL=te.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[ho]=Xi,typeof location<"u"&&location.hostname&&mo.test(location.hostname)&&(o[po]=_o),t&&(o[fo]=t),i&&(o[go]=i),s&&(o[Ci]=s),r&&(o[yo]=r),Eo(e,vo,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,$e.set("previous_websocket_failure",!0);try{let i;hl(),this.mySock=new dn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){te.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&dn!==null&&!te.forceDisallow_}static previouslyFailed(){return $e.isInMemoryStorage||$e.get("previous_websocket_failure")===!0}markConnectionHealthy(){$e.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Rt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=co(t,wu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Eu))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}te.responsesRequiredToBeHealthy=2;te.healthyTimeout=3e4;/**
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
 */class rt{static get ALL_TRANSPORTS(){return[Ee,te]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=te&&te.isAvailable();let i=t&&!te.previouslyFailed();if(e.webSocketOnly&&(t||H("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[te];else{const s=this.transports_=[];for(const r of rt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);rt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}rt.globalTransportInitialized_=!1;/**
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
 */const bu=6e4,Iu=5e3,Su=10*1024,Tu=100*1024,ri="t",Zs="d",Pu="s",er="r",Nu="e",tr="o",nr="a",ir="n",sr="p",Ru="h";class Au{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gt("c:"+this.id+":"),this.transportManager_=new rt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=wt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Tu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Su?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ri in e){const t=e[ri];t===nr?this.upgradeIfSecondaryHealthy_():t===er?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===tr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=mt("t",e),i=mt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:sr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:nr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ir,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=mt("t",e),i=mt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=mt(ri,e);if(Zs in e){const i=e[Zs];if(t===Ru){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===ir){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Pu?this.onConnectionShutdown_(i):t===er?this.onReset_(i):t===Nu?vi("Server Error: "+i):t===tr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):vi("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Xi!==i&&H("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),wt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(bu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):wt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Iu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:sr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&($e.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class No{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class Ro{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class fn extends Ro{static getInstance(){return new fn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Vr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const rr=32,or=768;class I{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function b(){return new I("")}function v(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function xe(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new I(n.pieces_,e)}function ts(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function ku(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function xt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Ao(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new I(e,0)}function A(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new I(t,0)}function C(n){return n.pieceNum_>=n.pieces_.length}function z(n,e){const t=v(n),i=v(e);if(t===null)return e;if(t===i)return z(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Du(n,e){const t=xt(n,0),i=xt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Ke(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function ns(n,e){if(xe(n)!==xe(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function ne(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(xe(n)>xe(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class xu{constructor(e,t){this.errorPrefix_=t,this.parts_=xt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Nn(this.parts_[i]);ko(this)}}function Ou(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Nn(e),ko(n)}function Mu(n){const e=n.parts_.pop();n.byteLength_-=Nn(e),n.parts_.length>0&&(n.byteLength_-=1)}function ko(n){if(n.byteLength_>or)throw new Error(n.errorPrefix_+"has a key path longer than "+or+" bytes ("+n.byteLength_+").");if(n.parts_.length>rr)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+rr+") or object contains a cycle "+Ve(n))}function Ve(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class is extends Ro{static getInstance(){return new is}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const gt=1e3,Lu=300*1e3,ar=30*1e3,Fu=1.3,Bu=3e4,Wu="server_kill",lr=3;class ge extends No{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ge.nextPersistentConnectionId_++,this.log_=Gt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=gt,this.maxReconnectDelay_=Lu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");is.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&fn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(x(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new j,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ge.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&J(e,"w")){const i=ze(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();H(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||yl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ar)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=gl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+x(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):vi("Unrecognized action received from server: "+x(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=gt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=gt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Bu&&(this.reconnectDelay_=gt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Fu)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ge.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new Au(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{H(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Wu)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&H(u),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],fi(this.interruptReasons_)&&(this.reconnectDelay_=gt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Ji(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){B("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=lr&&(this.reconnectDelay_=ar,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){B("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=lr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+io.replace(/\./g,"-")]=1,Vr()?e["framework.cordova"]=1:ul()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=fn.getInstance().currentlyOnline();return fi(this.interruptReasons_)&&e}}ge.nextPersistentConnectionId_=0;ge.nextConnectionId_=0;/**
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
 */class w{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new w(e,t)}}/**
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
 */class kn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new w(De,e),s=new w(De,t);return this.compare(i,s)!==0}minPost(){return w.MIN}}/**
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
 */let tn;class Do extends kn{static get __EMPTY_NODE(){return tn}static set __EMPTY_NODE(e){tn=e}compare(e,t){return Ke(e.name,t.name)}isDefinedOn(e){throw ut("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return w.MIN}maxPost(){return new w(Ce,tn)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new w(e,tn)}toString(){return".key"}}const he=new Do;/**
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
 */class nn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class L{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??L.RED,this.left=s??G.EMPTY_NODE,this.right=r??G.EMPTY_NODE}copy(e,t,i,s,r){return new L(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return G.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return G.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,L.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,L.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}L.RED=!0;L.BLACK=!1;class Uu{copy(e,t,i,s,r){return this}insert(e,t,i){return new L(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class G{constructor(e,t=G.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new G(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,L.BLACK,null,null))}remove(e){return new G(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,L.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new nn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new nn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new nn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new nn(this.root_,null,this.comparator_,!0,e)}}G.EMPTY_NODE=new Uu;/**
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
 */function Vu(n,e){return Ke(n.name,e.name)}function ss(n,e){return Ke(n,e)}/**
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
 */let wi;function $u(n){wi=n}const xo=function(n){return typeof n=="number"?"number:"+uo(n):"string:"+n},Oo=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&J(e,".sv"),"Priority must be a string or number.")}else f(n===wi||n.isEmpty(),"priority of unexpected type.");f(n===wi||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let cr;class O{static set __childrenNodeConstructor(e){cr=e}static get __childrenNodeConstructor(){return cr}constructor(e,t=O.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Oo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new O(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:v(e)===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:O.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=v(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||xe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,O.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+xo(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=uo(this.value_):e+=this.value_,this.lazyHash_=ao(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===O.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof O.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=O.VALUE_TYPE_ORDER.indexOf(t),r=O.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}O.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Mo,Lo;function Hu(n){Mo=n}function zu(n){Lo=n}class ju extends kn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Ke(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return w.MIN}maxPost(){return new w(Ce,new O("[PRIORITY-POST]",Lo))}makePost(e,t){const i=Mo(e);return new w(t,new O("[PRIORITY-POST]",i))}toString(){return".priority"}}const N=new ju;/**
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
 */const Gu=Math.log(2);class qu{constructor(e){const t=r=>parseInt(Math.log(r)/Gu,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const pn=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new L(h,u.node,L.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=s(l,p),E=s(p+1,c);return u=n[p],h=t?t(u):u,new L(h,u.node,L.BLACK,_,E)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,E){const D=u-_,ee=u;u-=_;const oe=s(D+1,ee),we=n[D],We=t?t(we):we;p(new L(We,we.node,E,null,oe))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const E=l.nextBitIsOne(),D=Math.pow(2,l.count-(_+1));E?h(D,L.BLACK):(h(D,L.BLACK),h(D,L.RED))}return d},o=new qu(n.length),a=r(o);return new G(i||e,a)};/**
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
 */let oi;const Ze={};class _e{static get Default(){return f(Ze&&N,"ChildrenNode.ts has not been loaded"),oi=oi||new _e({".priority":Ze},{".priority":N}),oi}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=ze(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof G?t:null}hasIndex(e){return J(this.indexSet_,e.toString())}addIndex(e,t){f(e!==he,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(w.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=pn(i,e.getCompare()):a=Ze;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new _e(d,c)}addToIndexes(e,t){const i=cn(this.indexes_,(s,r)=>{const o=ze(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===Ze)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(w.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),pn(a,o.getCompare())}else return Ze;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new w(e.name,a))),l.insert(e,e.node)}});return new _e(i,this.indexSet_)}removeFromIndexes(e,t){const i=cn(this.indexes_,s=>{if(s===Ze)return s;{const r=t.get(e.name);return r?s.remove(new w(e.name,r)):s}});return new _e(i,this.indexSet_)}}/**
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
 */let yt;class g{static get EMPTY_NODE(){return yt||(yt=new g(new G(ss),null,_e.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Oo(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||yt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?yt:t}}getChild(e){const t=v(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new w(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?yt:this.priorityNode_;return new g(s,o,r)}}updateChild(e,t){const i=v(e);if(i===null)return t;{f(v(e)!==".priority"||xe(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(T(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(N,(o,a)=>{t[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+xo(this.getPriority().val())+":"),this.forEachChild(N,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":ao(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new w(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new w(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new w(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===qt?-1:0}withIndex(e){if(e===he||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===he||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(N),s=t.getIterator(N);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===he?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Yu extends g{constructor(){super(new G(ss),g.EMPTY_NODE,_e.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const qt=new Yu;Object.defineProperties(w,{MIN:{value:new w(De,g.EMPTY_NODE)},MAX:{value:new w(Ce,qt)}});Do.__EMPTY_NODE=g.EMPTY_NODE;O.__childrenNodeConstructor=g;$u(qt);zu(qt);/**
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
 */const Qu=!0;function k(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new O(t,k(e))}if(!(n instanceof Array)&&Qu){const t=[];let i=!1;if(U(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=k(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new w(o,l)))}}),t.length===0)return g.EMPTY_NODE;const r=pn(t,Vu,o=>o.name,ss);if(i){const o=pn(t,N.getCompare());return new g(r,k(e),new _e({".priority":o},{".priority":N}))}else return new g(r,k(e),_e.Default)}else{let t=g.EMPTY_NODE;return U(n,(i,s)=>{if(J(n,i)&&i.substring(0,1)!=="."){const r=k(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(k(e))}}Hu(k);/**
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
 */class rs extends kn{constructor(e){super(),this.indexPath_=e,f(!C(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Ke(e.name,t.name):r}makePost(e,t){const i=k(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new w(t,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,qt);return new w(Ce,e)}toString(){return xt(this.indexPath_,0).join("/")}}/**
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
 */class Ku extends kn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ke(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return w.MIN}maxPost(){return w.MAX}makePost(e,t){const i=k(e);return new w(t,i)}toString(){return".value"}}const os=new Ku;/**
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
 */function Fo(n){return{type:"value",snapshotNode:n}}function ot(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ot(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Mt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Ju(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class as{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Ot(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ot(t,i)):o.trackChildChange(Mt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(N,(s,r)=>{t.hasChild(s)||i.trackChildChange(Ot(s,r))}),t.isLeafNode()||t.forEachChild(N,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Mt(s,r,o))}else i.trackChildChange(ot(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Lt{constructor(e){this.indexedFilter_=new as(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Lt.getStartPost_(e),this.endPost_=Lt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new w(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(N,(o,a)=>{r.matches(new w(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class Xu{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Lt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new w(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new w(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!i.isEmpty()&&p>=0)return r?.trackChildChange(Mt(t,i,u)),a.updateImmediateChild(t,i);{r?.trackChildChange(Ot(t,u));const E=a.updateImmediateChild(t,g.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(ot(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ot(c.name,c.node)),r.trackChildChange(ot(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
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
 */class Dn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=N}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:De}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ce}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===N}copy(){const e=new Dn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Zu(n){return n.loadsAllData()?new as(n.getIndex()):n.hasLimit()?new Xu(n):new Lt(n)}function eh(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function th(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Ei(n,e,t){const i=n.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,t!=null?(i.startNameSet_=!0,i.indexStartName_=t):(i.startNameSet_=!1,i.indexStartName_=""),i}function nh(n,e,t){let i;return n.index_===he||t?i=Ei(n,e,t):i=Ei(n,e,Ce),i.startAfterSet_=!0,i}function bi(n,e,t){const i=n.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,t!==void 0?(i.endNameSet_=!0,i.indexEndName_=t):(i.endNameSet_=!1,i.indexEndName_=""),i}function ih(n,e,t){let i;return n.index_===he||t?i=bi(n,e,t):i=bi(n,e,De),i.endBeforeSet_=!0,i}function xn(n,e){const t=n.copy();return t.index_=e,t}function ur(n){const e={};if(n.isDefault())return e;let t;if(n.index_===N?t="$priority":n.index_===os?t="$value":n.index_===he?t="$key":(f(n.index_ instanceof rs,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=x(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=x(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+x(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=x(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+x(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function hr(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==N&&(e.i=n.index_.toString()),e}/**
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
 */class _n extends No{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Gt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=_n.getListenId_(e,i),a={};this.listens_[o]=a;const l=ur(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),ze(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=_n.getListenId_(e,t);delete this.listens_[i]}get(e){const t=ur(e._queryParams),i=e._path.toString(),s=new j;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+vl(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Rt(a.responseText)}catch{H("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&H("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class sh{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function mn(){return{value:null,children:new Map}}function ft(n,e,t){if(C(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=v(e);n.children.has(i)||n.children.set(i,mn());const s=n.children.get(i);e=T(e),ft(s,e,t)}}function Ii(n,e){if(C(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(N,(i,s)=>{ft(n,new I(i),s)}),Ii(n,e)}}else if(n.children.size>0){const t=v(e);return e=T(e),n.children.has(t)&&Ii(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Si(n,e,t){n.value!==null?t(e,n.value):rh(n,(i,s)=>{const r=new I(e.toString()+"/"+i);Si(s,r,t)})}function rh(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class oh{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const dr=10*1e3,ah=30*1e3,lh=300*1e3;class ch{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new oh(e);const i=dr+(ah-dr)*Math.random();wt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;U(e,(s,r)=>{r>0&&J(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),wt(this.reportStats_.bind(this),Math.floor(Math.random()*2*lh))}}/**
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
 */var le;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(le||(le={}));function ls(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function cs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function us(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class gn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=le.ACK_USER_WRITE,this.source=ls()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new I(e));return new gn(b(),t,this.revert)}}else return f(v(this.path)===e,"operationForChild called for unrelated child."),new gn(T(this.path),this.affectedTree,this.revert)}}/**
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
 */class Ft{constructor(e,t){this.source=e,this.path=t,this.type=le.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new Ft(this.source,b()):new Ft(this.source,T(this.path))}}/**
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
 */class je{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=le.OVERWRITE}operationForChild(e){return C(this.path)?new je(this.source,b(),this.snap.getImmediateChild(e)):new je(this.source,T(this.path),this.snap)}}/**
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
 */class at{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=le.MERGE}operationForChild(e){if(C(this.path)){const t=this.children.subtree(new I(e));return t.isEmpty()?null:t.value?new je(this.source,b(),t.value):new at(this.source,b(),t)}else return f(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new at(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Oe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const t=v(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class uh{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function hh(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ju(o.childName,o.snapshotNode))}),vt(n,s,"child_removed",e,i,t),vt(n,s,"child_added",e,i,t),vt(n,s,"child_moved",r,i,t),vt(n,s,"child_changed",e,i,t),vt(n,s,"value",e,i,t),s}function vt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>fh(n,a,l)),o.forEach(a=>{const l=dh(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function dh(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function fh(n,e,t){if(e.childName==null||t.childName==null)throw ut("Should only compare child_ events.");const i=new w(e.childName,e.snapshotNode),s=new w(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function On(n,e){return{eventCache:n,serverCache:e}}function Et(n,e,t,i){return On(new Oe(e,t,i),n.serverCache)}function Bo(n,e,t,i){return On(n.eventCache,new Oe(e,t,i))}function yn(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ge(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let ai;const ph=()=>(ai||(ai=new G(Kc)),ai);class P{static fromObject(e){let t=new P(null);return U(e,(i,s)=>{t=t.set(new I(i),s)}),t}constructor(e,t=ph()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:b(),value:this.value};if(C(e))return null;{const i=v(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:A(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const t=v(e),i=this.children.get(t);return i!==null?i.subtree(T(e)):new P(null)}}set(e,t){if(C(e))return new P(t,this.children);{const i=v(e),r=(this.children.get(i)||new P(null)).set(T(e),t),o=this.children.insert(i,r);return new P(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new P(null):new P(null,this.children);{const t=v(e),i=this.children.get(t);if(i){const s=i.remove(T(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new P(null):new P(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const t=v(e),i=this.children.get(t);return i?i.get(T(e)):null}}setTree(e,t){if(C(e))return t;{const i=v(e),r=(this.children.get(i)||new P(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new P(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(A(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,b(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(C(e))return null;{const r=v(e),o=this.children.get(r);return o?o.findOnPath_(T(e),A(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,b(),t)}foreachOnPath_(e,t,i){if(C(e))return this;{this.value&&i(t,this.value);const s=v(e),r=this.children.get(s);return r?r.foreachOnPath_(T(e),A(t,s),i):new P(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(A(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class ce{constructor(e){this.writeTree_=e}static empty(){return new ce(new P(null))}}function bt(n,e,t){if(C(e))return new ce(new P(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=z(s,e);return r=r.updateChild(o,t),new ce(n.writeTree_.set(s,r))}else{const s=new P(t),r=n.writeTree_.setTree(e,s);return new ce(r)}}}function Ti(n,e,t){let i=n;return U(t,(s,r)=>{i=bt(i,A(e,s),r)}),i}function fr(n,e){if(C(e))return ce.empty();{const t=n.writeTree_.setTree(e,new P(null));return new ce(t)}}function Pi(n,e){return Je(n,e)!=null}function Je(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(z(t.path,e)):null}function pr(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(N,(i,s)=>{e.push(new w(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new w(i,s.value))}),e}function Te(n,e){if(C(e))return n;{const t=Je(n,e);return t!=null?new ce(new P(t)):new ce(n.writeTree_.subtree(e))}}function Ni(n){return n.writeTree_.isEmpty()}function lt(n,e){return Wo(b(),n.writeTree_,e)}function Wo(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Wo(A(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(A(n,".priority"),i)),t}}/**
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
 */function Mn(n,e){return Ho(e,n)}function _h(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=bt(n.visibleWrites,e,t)),n.lastWriteId=i}function mh(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Ti(n.visibleWrites,e,t),n.lastWriteId=i}function gh(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function yh(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&vh(a,i.path)?s=!1:ne(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Ch(n),!0;if(i.snap)n.visibleWrites=fr(n.visibleWrites,i.path);else{const a=i.children;U(a,l=>{n.visibleWrites=fr(n.visibleWrites,A(i.path,l))})}return!0}else return!1}function vh(n,e){if(n.snap)return ne(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ne(A(n.path,t),e))return!0;return!1}function Ch(n){n.visibleWrites=Uo(n.allWrites,wh,b()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function wh(n){return n.visible}function Uo(n,e,t){let i=ce.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)ne(t,o)?(a=z(t,o),i=bt(i,a,r.snap)):ne(o,t)&&(a=z(o,t),i=bt(i,b(),r.snap.getChild(a)));else if(r.children){if(ne(t,o))a=z(t,o),i=Ti(i,a,r.children);else if(ne(o,t))if(a=z(o,t),C(a))i=Ti(i,b(),r.children);else{const l=ze(r.children,v(a));if(l){const c=l.getChild(T(a));i=bt(i,b(),c)}}}else throw ut("WriteRecord should have .snap or .children")}}return i}function Vo(n,e,t,i,s){if(!i&&!s){const r=Je(n.visibleWrites,e);if(r!=null)return r;{const o=Te(n.visibleWrites,e);if(Ni(o))return t;if(t==null&&!Pi(o,b()))return null;{const a=t||g.EMPTY_NODE;return lt(o,a)}}}else{const r=Te(n.visibleWrites,e);if(!s&&Ni(r))return t;if(!s&&t==null&&!Pi(r,b()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ne(c.path,e)||ne(e,c.path))},a=Uo(n.allWrites,o,e),l=t||g.EMPTY_NODE;return lt(a,l)}}}function Eh(n,e,t){let i=g.EMPTY_NODE;const s=Je(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(N,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Te(n.visibleWrites,e);return t.forEachChild(N,(o,a)=>{const l=lt(Te(r,new I(o)),a);i=i.updateImmediateChild(o,l)}),pr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Te(n.visibleWrites,e);return pr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function bh(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(Pi(n.visibleWrites,r))return null;{const o=Te(n.visibleWrites,r);return Ni(o)?s.getChild(t):lt(o,s.getChild(t))}}function Ih(n,e,t,i){const s=A(e,t),r=Je(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Te(n.visibleWrites,s);return lt(o,i.getNode().getImmediateChild(t))}else return null}function Sh(n,e){return Je(n.visibleWrites,e)}function Th(n,e,t,i,s,r,o){let a;const l=Te(n.visibleWrites,e),c=Je(l,b());if(c!=null)a=c;else if(t!=null)a=lt(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&d.length<s;)u(p,i)!==0&&d.push(p),p=h.getNext();return d}else return[]}function Ph(){return{visibleWrites:ce.empty(),allWrites:[],lastWriteId:-1}}function vn(n,e,t,i){return Vo(n.writeTree,n.treePath,e,t,i)}function hs(n,e){return Eh(n.writeTree,n.treePath,e)}function _r(n,e,t,i){return bh(n.writeTree,n.treePath,e,t,i)}function Cn(n,e){return Sh(n.writeTree,A(n.treePath,e))}function Nh(n,e,t,i,s,r){return Th(n.writeTree,n.treePath,e,t,i,s,r)}function ds(n,e,t){return Ih(n.writeTree,n.treePath,e,t)}function $o(n,e){return Ho(A(n.treePath,e),n.writeTree)}function Ho(n,e){return{treePath:n,writeTree:e}}/**
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
 */class Rh{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Mt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ot(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,ot(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Mt(i,e.snapshotNode,s.oldSnap));else throw ut("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Ah{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const zo=new Ah;class fs{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Oe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ds(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ge(this.viewCache_),r=Nh(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function kh(n){return{filter:n}}function Dh(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function xh(n,e,t,i,s){const r=new Rh;let o,a;if(t.type===le.OVERWRITE){const c=t;c.source.fromUser?o=Ri(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=wn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===le.MERGE){const c=t;c.source.fromUser?o=Mh(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Ai(n,e,c.path,c.children,i,s,a,r))}else if(t.type===le.ACK_USER_WRITE){const c=t;c.revert?o=Bh(n,e,c.path,i,s,r):o=Lh(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===le.LISTEN_COMPLETE)o=Fh(n,e,t.path,i,r);else throw ut("Unknown operation type: "+t.type);const l=r.getChanges();return Oh(e,o,l),{viewCache:o,changes:l}}function Oh(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=yn(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Fo(yn(e)))}}function jo(n,e,t,i,s,r){const o=e.eventCache;if(Cn(i,t)!=null)return e;{let a,l;if(C(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ge(e),d=c instanceof g?c:g.EMPTY_NODE,u=hs(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=vn(i,Ge(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=v(t);if(c===".priority"){f(xe(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=_r(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=T(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=_r(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=ds(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return Et(e,a,o.isFullyInitialized()||C(t),n.filter.filtersNodes())}}function wn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(C(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=v(t);if(!l.isCompleteForPath(t)&&xe(t)>1)return e;const _=T(t),D=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=d.updatePriority(l.getNode(),D):c=d.updateChild(l.getNode(),p,D,_,zo,null)}const u=Bo(e,c,l.isFullyInitialized()||C(t),d.filtersNodes()),h=new fs(s,u,r);return jo(n,u,t,s,h,a)}function Ri(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new fs(s,e,r);if(C(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Et(e,c,!0,n.filter.filtersNodes());else{const u=v(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=Et(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=T(t),p=a.getNode().getImmediateChild(u);let _;if(C(h))_=i;else{const E=d.getCompleteChild(u);E!=null?ts(h)===".priority"&&E.getChild(Ao(h)).isEmpty()?_=E:_=E.updateChild(h,i):_=g.EMPTY_NODE}if(p.equals(_))l=e;else{const E=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=Et(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function mr(n,e){return n.eventCache.isCompleteForChild(e)}function Mh(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=A(t,l);mr(e,v(d))&&(a=Ri(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=A(t,l);mr(e,v(d))||(a=Ri(n,a,d,c,s,r,o))}),a}function gr(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ai(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(t)?c=i:c=new P(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=gr(n,p,h);l=wn(n,l,new I(u),_,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),E=gr(n,_,h);l=wn(n,l,new I(u),E,s,r,o,a)}}),l}function Lh(n,e,t,i,s,r,o){if(Cn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(C(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return wn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(C(t)){let c=new P(null);return l.getNode().forEachChild(he,(d,u)=>{c=c.set(new I(d),u)}),Ai(n,e,t,c,s,r,a,o)}else return e}else{let c=new P(null);return i.foreach((d,u)=>{const h=A(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Ai(n,e,t,c,s,r,a,o)}}function Fh(n,e,t,i,s){const r=e.serverCache,o=Bo(e,r.getNode(),r.isFullyInitialized()||C(t),r.isFiltered());return jo(n,o,t,i,zo,s)}function Bh(n,e,t,i,s,r){let o;if(Cn(i,t)!=null)return e;{const a=new fs(i,e,s),l=e.eventCache.getNode();let c;if(C(t)||v(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=vn(i,Ge(e));else{const u=e.serverCache.getNode();f(u instanceof g,"serverChildren would be complete if leaf node"),d=hs(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=v(t);let u=ds(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,T(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,g.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=vn(i,Ge(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Cn(i,b())!=null,Et(e,c,o,n.filter.filtersNodes())}}/**
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
 */class Wh{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new as(i.getIndex()),r=Zu(i);this.processor_=kh(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),d=new Oe(l,o.isFullyInitialized(),s.filtersNodes()),u=new Oe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=On(u,d),this.eventGenerator_=new uh(this.query_)}get query(){return this.query_}}function Uh(n){return n.viewCache_.serverCache.getNode()}function Vh(n){return yn(n.viewCache_)}function $h(n,e){const t=Ge(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!C(e)&&!t.getImmediateChild(v(e)).isEmpty())?t.getChild(e):null}function yr(n){return n.eventRegistrations_.length===0}function Hh(n,e){n.eventRegistrations_.push(e)}function vr(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Cr(n,e,t,i){e.type===le.MERGE&&e.source.queryId!==null&&(f(Ge(n.viewCache_),"We should always have a full cache before handling merges"),f(yn(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=xh(n.processor_,s,e,t,i);return Dh(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Go(n,r.changes,r.viewCache.eventCache.getNode(),null)}function zh(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(N,(r,o)=>{i.push(ot(r,o))}),t.isFullyInitialized()&&i.push(Fo(t.getNode())),Go(n,i,t.getNode(),e)}function Go(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return hh(n.eventGenerator_,e,t,s)}/**
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
 */let En;class qo{constructor(){this.views=new Map}}function jh(n){f(!En,"__referenceConstructor has already been defined"),En=n}function Gh(){return f(En,"Reference.ts has not been loaded"),En}function qh(n){return n.views.size===0}function ps(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Cr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Cr(o,e,t,i));return r}}function Yo(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=vn(t,s?i:null),l=!1;a?l=!0:i instanceof g?(a=hs(t,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=On(new Oe(a,l,!1),new Oe(i,s,!1));return new Wh(e,c)}return o}function Yh(n,e,t,i,s,r){const o=Yo(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Hh(o,t),zh(o,t)}function Qh(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Me(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(vr(c,t,i)),yr(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(vr(l,t,i)),yr(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Me(n)&&r.push(new(Gh())(e._repo,e._path)),{removed:r,events:o}}function Qo(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Pe(n,e){let t=null;for(const i of n.views.values())t=t||$h(i,e);return t}function Ko(n,e){if(e._queryParams.loadsAllData())return Ln(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Jo(n,e){return Ko(n,e)!=null}function Me(n){return Ln(n)!=null}function Ln(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let bn;function Kh(n){f(!bn,"__referenceConstructor has already been defined"),bn=n}function Jh(){return f(bn,"Reference.ts has not been loaded"),bn}let Xh=1;class wr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new P(null),this.pendingWriteTree_=Ph(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function _s(n,e,t,i,s){return _h(n.pendingWriteTree_,e,t,i,s),s?pt(n,new je(ls(),e,t)):[]}function Zh(n,e,t,i){mh(n.pendingWriteTree_,e,t,i);const s=P.fromObject(t);return pt(n,new at(ls(),e,s))}function be(n,e,t=!1){const i=gh(n.pendingWriteTree_,e);if(yh(n.pendingWriteTree_,e)){let r=new P(null);return i.snap!=null?r=r.set(b(),!0):U(i.children,o=>{r=r.set(new I(o),!0)}),pt(n,new gn(i.path,r,t))}else return[]}function Yt(n,e,t){return pt(n,new je(cs(),e,t))}function ed(n,e,t){const i=P.fromObject(t);return pt(n,new at(cs(),e,i))}function td(n,e){return pt(n,new Ft(cs(),e))}function nd(n,e,t){const i=ms(n,t);if(i){const s=gs(i),r=s.path,o=s.queryId,a=z(r,e),l=new Ft(us(o),a);return ys(n,r,l)}else return[]}function In(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Jo(o,e))){const l=Qh(o,e,t,i);qh(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>Me(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=rd(h);for(let _=0;_<p.length;++_){const E=p[_],D=E.query,ee=ta(n,E);n.listenProvider_.startListening(It(D),Bt(n,D),ee.hashFn,ee.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(It(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(Bn(h));n.listenProvider_.stopListening(It(h),p)}))}od(n,c)}return a}function Xo(n,e,t,i){const s=ms(n,i);if(s!=null){const r=gs(s),o=r.path,a=r.queryId,l=z(o,e),c=new je(us(a),l,t);return ys(n,o,c)}else return[]}function id(n,e,t,i){const s=ms(n,i);if(s){const r=gs(s),o=r.path,a=r.queryId,l=z(o,e),c=P.fromObject(t),d=new at(us(a),l,c);return ys(n,o,d)}else return[]}function ki(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,p)=>{const _=z(h,s);r=r||Pe(p,_),o=o||Me(p)});let a=n.syncPointTree_.get(s);a?(o=o||Me(a),r=r||Pe(a,b())):(a=new qo,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const E=Pe(_,b());E&&(r=r.updateImmediateChild(p,E))}));const c=Jo(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Bn(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=ad();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=Mn(n.pendingWriteTree_,s);let u=Yh(a,e,t,d,r,l);if(!c&&!o&&!i){const h=Ko(a,e);u=u.concat(ld(n,e,h))}return u}function Fn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=z(o,e),c=Pe(a,l);if(c)return c});return Vo(s,e,r,t,!0)}function sd(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=z(c,t);i=i||Pe(d,u)});let s=n.syncPointTree_.get(t);s?i=i||Pe(s,b()):(s=new qo,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Oe(i,!0,!1):null,a=Mn(n.pendingWriteTree_,e._path),l=Yo(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return Vh(l)}function pt(n,e){return Zo(e,n.syncPointTree_,null,Mn(n.pendingWriteTree_,b()))}function Zo(n,e,t,i){if(C(n.path))return ea(n,e,t,i);{const s=e.get(b());t==null&&s!=null&&(t=Pe(s,b()));let r=[];const o=v(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=$o(i,o);r=r.concat(Zo(a,l,c,d))}return s&&(r=r.concat(ps(s,n,i,t))),r}}function ea(n,e,t,i){const s=e.get(b());t==null&&s!=null&&(t=Pe(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=$o(i,o),d=n.operationForChild(o);d&&(r=r.concat(ea(d,a,l,c)))}),s&&(r=r.concat(ps(s,n,i,t))),r}function ta(n,e){const t=e.query,i=Bt(n,t);return{hashFn:()=>(Uh(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?nd(n,t._path,i):td(n,t._path);{const r=Zc(s,t);return In(n,t,null,r)}}}}function Bt(n,e){const t=Bn(e);return n.queryToTagMap.get(t)}function Bn(n){return n._path.toString()+"$"+n._queryIdentifier}function ms(n,e){return n.tagToQueryMap.get(e)}function gs(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new I(n.substr(0,e))}}function ys(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=Mn(n.pendingWriteTree_,e);return ps(i,t,s,null)}function rd(n){return n.fold((e,t,i)=>{if(t&&Me(t))return[Ln(t)];{let s=[];return t&&(s=Qo(t)),U(i,(r,o)=>{s=s.concat(o)}),s}})}function It(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Jh())(n._repo,n._path):n}function od(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Bn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function ad(){return Xh++}function ld(n,e,t){const i=e._path,s=Bt(n,e),r=ta(n,t),o=n.listenProvider_.startListening(It(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!Me(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!C(c)&&d&&Me(d))return[Ln(d).query];{let h=[];return d&&(h=h.concat(Qo(d).map(p=>p.query))),U(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(It(d),Bt(n,d))}}return o}/**
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
 */class vs{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new vs(t)}node(){return this.node_}}class Cs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Cs(this.syncTree_,t)}node(){return Fn(this.syncTree_,this.path_)}}const cd=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Er=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ud(n[".sv"],e,t);if(typeof n[".sv"]=="object")return hd(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ud=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},hd=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},na=function(n,e,t,i){return Es(e,new Cs(t,n),i)},ws=function(n,e,t){return Es(n,new vs(e),t)};function Es(n,e,t){const i=n.getPriority().val(),s=Er(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Er(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new O(a,k(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new O(s))),o.forEachChild(N,(a,l)=>{const c=Es(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class bs{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Wn(n,e){let t=e instanceof I?e:new I(e),i=n,s=v(t);for(;s!==null;){const r=ze(i.node.children,s)||{children:{},childCount:0};i=new bs(s,i,r),t=T(t),s=v(t)}return i}function Xe(n){return n.node.value}function Is(n,e){n.node.value=e,Di(n)}function ia(n){return n.node.childCount>0}function dd(n){return Xe(n)===void 0&&!ia(n)}function Un(n,e){U(n.node.children,(t,i)=>{e(new bs(t,n,i))})}function sa(n,e,t,i){t&&e(n),Un(n,s=>{sa(s,e,!0)})}function fd(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Qt(n){return new I(n.parent===null?n.name:Qt(n.parent)+"/"+n.name)}function Di(n){n.parent!==null&&pd(n.parent,n.name,n)}function pd(n,e,t){const i=dd(t),s=J(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Di(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Di(n))}/**
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
 */const _d=/[\[\].#$\/\u0000-\u001F\u007F]/,md=/[\[\].#$\u0000-\u001F\u007F]/,li=10*1024*1024,Vn=function(n){return typeof n=="string"&&n.length!==0&&!_d.test(n)},ra=function(n){return typeof n=="string"&&n.length!==0&&!md.test(n)},gd=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ra(n)},Wt=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!An(n)||n&&typeof n=="object"&&J(n,".sv")},fe=function(n,e,t,i){i&&e===void 0||Kt(q(n,"value"),e,t)},Kt=function(n,e,t){const i=t instanceof I?new xu(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ve(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ve(i)+" with contents = "+e.toString());if(An(e))throw new Error(n+"contains "+e.toString()+" "+Ve(i));if(typeof e=="string"&&e.length>li/3&&Nn(e)>li)throw new Error(n+"contains a string greater than "+li+" utf8 bytes "+Ve(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(U(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Vn(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ve(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Ou(i,o),Kt(n,a,i),Mu(i)}),s&&r)throw new Error(n+' contains ".value" child '+Ve(i)+" in addition to actual children.")}},yd=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=xt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Vn(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Du);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&ne(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},oa=function(n,e,t,i){const s=q(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];U(e,(o,a)=>{const l=new I(o);if(Kt(s,a,A(t,l)),ts(l)===".priority"&&!Wt(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),yd(s,r)},Ss=function(n,e,t){if(An(e))throw new Error(q(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Wt(e))throw new Error(q(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Jt=function(n,e,t,i){if(t!==void 0&&!Vn(t))throw new Error(q(n,e)+'was an invalid key = "'+t+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},Ut=function(n,e,t,i){if(!ra(t))throw new Error(q(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},vd=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Ut(n,e,t)},ie=function(n,e){if(v(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},aa=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Vn(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!gd(t))throw new Error(q(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Cd{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function $n(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!ns(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function la(n,e,t){$n(n,t),ca(n,i=>ns(i,e))}function X(n,e,t){$n(n,t),ca(n,i=>ne(i,e)||ne(e,i))}function ca(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(wd(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function wd(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();He&&B("event: "+t.toString()),dt(i)}}}/**
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
 */const ua="repo_interrupt",Ed=25;class bd{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Cd,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=mn(),this.transactionQueueTree_=new bs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Id(n,e,t){if(n.stats_=Zi(n.repoInfo_),n.forceRestClient_||iu())n.server_=new _n(n.repoInfo_,(i,s,r,o)=>{br(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ir(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{x(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ge(n.repoInfo_,e,(i,s,r,o)=>{br(n,i,s,r,o)},i=>{Ir(n,i)},i=>{Sd(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=lu(n.repoInfo_,()=>new ch(n.stats_,n.server_)),n.infoData_=new sh,n.infoSyncTree_=new wr({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Yt(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Ts(n,"connected",!1),n.serverSyncTree_=new wr({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);X(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function ha(n){const t=n.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Xt(n){return cd({timestamp:ha(n)})}function br(n,e,t,i,s){n.dataUpdateCount++;const r=new I(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=cn(t,c=>k(c));o=id(n.serverSyncTree_,r,l,s)}else{const l=k(t);o=Xo(n.serverSyncTree_,r,l,s)}else if(i){const l=cn(t,c=>k(c));o=ed(n.serverSyncTree_,r,l)}else{const l=k(t);o=Yt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=ct(n,r)),X(n.eventQueue_,a,o)}function Ir(n,e){Ts(n,"connected",e),e===!1&&Nd(n)}function Sd(n,e){U(e,(t,i)=>{Ts(n,t,i)})}function Ts(n,e,t){const i=new I("/.info/"+e),s=k(t);n.infoData_.updateSnapshot(i,s);const r=Yt(n.infoSyncTree_,i,s);X(n.eventQueue_,i,r)}function Hn(n){return n.nextWriteId_++}function Td(n,e,t){const i=sd(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=k(s).withIndex(e._queryParams.getIndex());ki(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Yt(n.serverSyncTree_,e._path,r);else{const a=Bt(n.serverSyncTree_,e);o=Xo(n.serverSyncTree_,e._path,r,a)}return X(n.eventQueue_,e._path,o),In(n.serverSyncTree_,e,t,null,!0),r},s=>(_t(n,"get for query "+x(e)+" failed: "+s),Promise.reject(new Error(s))))}function Ps(n,e,t,i,s){_t(n,"set",{path:e.toString(),value:t,priority:i});const r=Xt(n),o=k(t,i),a=Fn(n.serverSyncTree_,e),l=ws(o,a,r),c=Hn(n),d=_s(n.serverSyncTree_,e,l,c,!0);$n(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||H("set at "+e+" failed: "+h);const E=be(n.serverSyncTree_,c,!_);X(n.eventQueue_,e,E),Le(n,s,h,p)});const u=Rs(n,e);ct(n,u),X(n.eventQueue_,u,[])}function Pd(n,e,t,i){_t(n,"update",{path:e.toString(),value:t});let s=!0;const r=Xt(n),o={};if(U(t,(a,l)=>{s=!1,o[a]=na(A(e,a),k(l),n.serverSyncTree_,r)}),s)B("update() called with empty data.  Don't do anything."),Le(n,i,"ok",void 0);else{const a=Hn(n),l=Zh(n.serverSyncTree_,e,o,a);$n(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||H("update at "+e+" failed: "+c);const h=be(n.serverSyncTree_,a,!u),p=h.length>0?ct(n,e):e;X(n.eventQueue_,p,h),Le(n,i,c,d)}),U(t,c=>{const d=Rs(n,A(e,c));ct(n,d)}),X(n.eventQueue_,e,[])}}function Nd(n){_t(n,"onDisconnectEvents");const e=Xt(n),t=mn();Si(n.onDisconnect_,b(),(s,r)=>{const o=na(s,r,n.serverSyncTree_,e);ft(t,s,o)});let i=[];Si(t,b(),(s,r)=>{i=i.concat(Yt(n.serverSyncTree_,s,r));const o=Rs(n,s);ct(n,o)}),n.onDisconnect_=mn(),X(n.eventQueue_,b(),i)}function Rd(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Ii(n.onDisconnect_,e),Le(n,t,i,s)})}function Sr(n,e,t,i){const s=k(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&ft(n.onDisconnect_,e,s),Le(n,i,r,o)})}function Ad(n,e,t,i,s){const r=k(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&ft(n.onDisconnect_,e,r),Le(n,s,o,a)})}function kd(n,e,t,i){if(fi(t)){B("onDisconnect().update() called with empty data.  Don't do anything."),Le(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&U(t,(o,a)=>{const l=k(a);ft(n.onDisconnect_,A(e,o),l)}),Le(n,i,s,r)})}function Dd(n,e,t){let i;v(e._path)===".info"?i=ki(n.infoSyncTree_,e,t):i=ki(n.serverSyncTree_,e,t),la(n.eventQueue_,e._path,i)}function xi(n,e,t){let i;v(e._path)===".info"?i=In(n.infoSyncTree_,e,t):i=In(n.serverSyncTree_,e,t),la(n.eventQueue_,e._path,i)}function da(n){n.persistentConnection_&&n.persistentConnection_.interrupt(ua)}function xd(n){n.persistentConnection_&&n.persistentConnection_.resume(ua)}function _t(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),B(t,...e)}function Le(n,e,t,i){e&&dt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Od(n,e,t,i,s,r){_t(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:oo(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Ns(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Kt("transaction failed: Data returned ",l,o.path),o.status=0;const c=Wn(n.transactionQueueTree_,e),d=Xe(c)||[];d.push(o),Is(c,d);let u;typeof l=="object"&&l!==null&&J(l,".priority")?(u=ze(l,".priority"),f(Wt(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Fn(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const h=Xt(n),p=k(l,u),_=ws(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=_,o.currentWriteId=Hn(n);const E=_s(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);X(n.eventQueue_,e,E),zn(n,n.transactionQueueTree_)}}function Ns(n,e,t){return Fn(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function zn(n,e=n.transactionQueueTree_){if(e||jn(n,e),Xe(e)){const t=pa(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Md(n,Qt(e),t)}else ia(e)&&Un(e,t=>{zn(n,t)})}function Md(n,e,t){const i=t.map(c=>c.currentWriteId),s=Ns(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=z(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{_t(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(be(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();jn(n,Wn(n.transactionQueueTree_,e)),zn(n,n.transactionQueueTree_),X(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)dt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{H("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}ct(n,e)}},o)}function ct(n,e){const t=fa(n,e),i=Qt(t),s=pa(n,t);return Ld(n,s,i),i}function Ld(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=z(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(be(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Ed)d=!0,u="maxretry",s=s.concat(be(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Ns(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){Kt("transaction failed: Data returned ",p,l.path);let _=k(p);typeof p=="object"&&p!=null&&J(p,".priority")||(_=_.updatePriority(h.getPriority()));const D=l.currentWriteId,ee=Xt(n),oe=ws(_,h,ee);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=oe,l.currentWriteId=Hn(n),o.splice(o.indexOf(D),1),s=s.concat(_s(n.serverSyncTree_,l.path,oe,l.currentWriteId,l.applyLocally)),s=s.concat(be(n.serverSyncTree_,D,!0))}else d=!0,u="nodata",s=s.concat(be(n.serverSyncTree_,l.currentWriteId,!0))}X(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}jn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)dt(i[a]);zn(n,n.transactionQueueTree_)}function fa(n,e){let t,i=n.transactionQueueTree_;for(t=v(e);t!==null&&Xe(i)===void 0;)i=Wn(i,t),e=T(e),t=v(e);return i}function pa(n,e){const t=[];return _a(n,e,t),t.sort((i,s)=>i.order-s.order),t}function _a(n,e,t){const i=Xe(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Un(e,s=>{_a(n,s,t)})}function jn(n,e){const t=Xe(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Is(e,t.length>0?t:void 0)}Un(e,i=>{jn(n,i)})}function Rs(n,e){const t=Qt(fa(n,e)),i=Wn(n.transactionQueueTree_,e);return fd(i,s=>{ci(n,s)}),ci(n,i),sa(i,s=>{ci(n,s)}),t}function ci(n,e){const t=Xe(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(be(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Is(e,void 0):t.length=r+1,X(n.eventQueue_,Qt(e),s);for(let o=0;o<i.length;o++)dt(i[o])}}/**
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
 */function Fd(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Bd(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):H(`Invalid query segment '${t}' in query '${n}'`)}return e}const Oi=function(n,e){const t=Wd(n),i=t.namespace;t.domain==="firebase.com"&&de(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&de("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Yc();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new wo(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new I(t.pathString)}},Wd=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=Fd(n.substring(d,u)));const h=Bd(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const Tr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Ud=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Tr.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Tr.charAt(e[s]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
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
 */class ma{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+x(this.snapshot.exportVal())}}class ga{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class As{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */let Vd=class{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new j;return Rd(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){ie("OnDisconnect.remove",this._path);const e=new j;return Sr(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){ie("OnDisconnect.set",this._path),fe("OnDisconnect.set",e,this._path,!1);const t=new j;return Sr(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){ie("OnDisconnect.setWithPriority",this._path),fe("OnDisconnect.setWithPriority",e,this._path,!1),Ss("OnDisconnect.setWithPriority",t);const i=new j;return Ad(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){ie("OnDisconnect.update",this._path),oa("OnDisconnect.update",e,this._path);const t=new j;return kd(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}};/**
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
 */class Y{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:ts(this._path)}get ref(){return new re(this._repo,this._path)}get _queryIdentifier(){const e=hr(this._queryParams),t=Ji(e);return t==="{}"?"default":t}get _queryObject(){return hr(this._queryParams)}isEqual(e){if(e=Z(e),!(e instanceof Y))return!1;const t=this._repo===e._repo,i=ns(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+ku(this._path)}}function Gn(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Fe(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===he){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==De)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==Ce)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===N){if(e!=null&&!Wt(e)||t!=null&&!Wt(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(f(n.getIndex()instanceof rs||n.getIndex()===os,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function qn(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class re extends Y{constructor(e,t){super(e,t,new Dn,!1)}get parent(){const e=Ao(this._path);return e===null?null:new re(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}let Yn=class Mi{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new I(e),i=qe(this.ref,e);return new Mi(this._node.getChild(t),i,N)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Mi(s,qe(this.ref,i),N)))}hasChild(e){const t=new I(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function ya(n,e){return n=Z(n),n._checkNotDeleted("ref"),e!==void 0?qe(n._root,e):n._root}function Pr(n,e){n=Z(n),n._checkNotDeleted("refFromURL");const t=Oi(e,n._repo.repoInfo_.nodeAdmin);aa("refFromURL",t);const i=t.repoInfo;return!n._repo.repoInfo_.isCustomHost()&&i.host!==n._repo.repoInfo_.host&&de("refFromURL: Host name does not match the current database: (found "+i.host+" but expected "+n._repo.repoInfo_.host+")"),ya(n,t.path.toString())}function qe(n,e){return n=Z(n),v(n._path)===null?vd("child","path",e):Ut("child","path",e),new re(n._repo,A(n._path,e))}function $d(n,e){n=Z(n),ie("push",n._path),fe("push",e,n._path,!0);const t=ha(n._repo),i=Ud(t),s=qe(n,i),r=qe(n,i);let o;return e!=null?o=ks(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Hd(n){return ie("remove",n._path),ks(n,null)}function ks(n,e){n=Z(n),ie("set",n._path),fe("set",e,n._path,!1);const t=new j;return Ps(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function zd(n,e){n=Z(n),ie("setPriority",n._path),Ss("setPriority",e);const t=new j;return Ps(n._repo,A(n._path,".priority"),e,null,t.wrapCallback(()=>{})),t.promise}function jd(n,e,t){if(ie("setWithPriority",n._path),fe("setWithPriority",e,n._path,!1),Ss("setWithPriority",t),n.key===".length"||n.key===".keys")throw"setWithPriority failed: "+n.key+" is a read-only object.";const i=new j;return Ps(n._repo,n._path,e,t,i.wrapCallback(()=>{})),i.promise}function Gd(n,e){oa("update",e,n._path);const t=new j;return Pd(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function qd(n){n=Z(n);const e=new As(()=>{}),t=new Zt(e);return Td(n._repo,n,t).then(i=>new Yn(i,new re(n._repo,n._path),n._queryParams.getIndex()))}class Zt{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new ma("value",this,new Yn(e.snapshotNode,new re(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ga(this,e,t):null}matches(e){return e instanceof Zt?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Qn{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ga(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const i=qe(new re(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new ma(e.type,this,new Yn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Qn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function en(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(d,u)=>{xi(n._repo,n,a),l(d,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new As(t,r||void 0),a=e==="value"?new Zt(o):new Qn(e,o);return Dd(n._repo,n,a),()=>xi(n._repo,n,a)}function Li(n,e,t,i){return en(n,"value",e,t,i)}function Nr(n,e,t,i){return en(n,"child_added",e,t,i)}function Rr(n,e,t,i){return en(n,"child_changed",e,t,i)}function Ar(n,e,t,i){return en(n,"child_moved",e,t,i)}function kr(n,e,t,i){return en(n,"child_removed",e,t,i)}function Dr(n,e,t){let i=null;const s=t?new As(t):null;e==="value"?i=new Zt(s):e&&(i=new Qn(e,s)),xi(n._repo,n,i)}class ue{}class va extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){fe("endAt",this._value,e._path,!0);const t=bi(e._queryParams,this._value,this._key);if(qn(t),Fe(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function Yd(n,e){return Jt("endAt","key",e),new va(n,e)}class Qd extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){fe("endBefore",this._value,e._path,!1);const t=ih(e._queryParams,this._value,this._key);if(qn(t),Fe(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function Kd(n,e){return Jt("endBefore","key",e),new Qd(n,e)}class Ca extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){fe("startAt",this._value,e._path,!0);const t=Ei(e._queryParams,this._value,this._key);if(qn(t),Fe(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function Jd(n=null,e){return Jt("startAt","key",e),new Ca(n,e)}class Xd extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){fe("startAfter",this._value,e._path,!1);const t=nh(e._queryParams,this._value,this._key);if(qn(t),Fe(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function Zd(n,e){return Jt("startAfter","key",e),new Xd(n,e)}class ef extends ue{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Y(e._repo,e._path,eh(e._queryParams,this._limit),e._orderByCalled)}}function tf(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new ef(n)}class nf extends ue{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Y(e._repo,e._path,th(e._queryParams,this._limit),e._orderByCalled)}}function sf(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new nf(n)}class rf extends ue{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Gn(e,"orderByChild");const t=new I(this._path);if(C(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new rs(t),s=xn(e._queryParams,i);return Fe(s),new Y(e._repo,e._path,s,!0)}}function of(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Ut("orderByChild","path",n),new rf(n)}class af extends ue{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Gn(e,"orderByKey");const t=xn(e._queryParams,he);return Fe(t),new Y(e._repo,e._path,t,!0)}}function lf(){return new af}class cf extends ue{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){Gn(e,"orderByPriority");const t=xn(e._queryParams,N);return Fe(t),new Y(e._repo,e._path,t,!0)}}function uf(){return new cf}class hf extends ue{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){Gn(e,"orderByValue");const t=xn(e._queryParams,os);return Fe(t),new Y(e._repo,e._path,t,!0)}}function df(){return new hf}class ff extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(fe("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new va(this._value,this._key)._apply(new Ca(this._value,this._key)._apply(e))}}function pf(n,e){return Jt("equalTo","key",e),new ff(n,e)}function ae(n,...e){let t=Z(n);for(const i of e)t=i._apply(t);return t}jh(re);Kh(re);/**
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
 */const _f="FIREBASE_DATABASE_EMULATOR_HOST",Fi={};let mf=!1;function gf(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Hi(r);n.repoInfo_=new wo(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function wa(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||de("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Oi(r,s),a=o.repoInfo,l,c;typeof process<"u"&&qs&&(c=qs[_f]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=Oi(r,s),a=o.repoInfo):l=!o.repoInfo.secure;const d=s&&l?new tt(tt.OWNER):new ru(n.name,n.options,e);aa("Invalid Firebase Database URL",o),C(o.path)||de("Database URL must point to the root of a Firebase Database (not including a child path).");const u=vf(a,n,d,new su(n,t));return new Cf(u,n)}function yf(n,e){const t=Fi[e];(!t||t[n.key]!==n)&&de(`Database ${e}(${n.repoInfo_}) has already been deleted.`),da(n),delete t[n.key]}function vf(n,e,t,i){let s=Fi[e.name];s||(s={},Fi[e.name]=s);let r=s[n.toURLString()];return r&&de("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new bd(n,mf,t,i),s[n.toURLString()]=r,r}let Cf=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Id(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new re(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(yf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&de("Cannot call "+e+" on a deleted database.")}};function Ea(){rt.IS_TRANSPORT_INITIALIZED&&H("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function wf(){Ea(),Ee.forceDisallow()}function Ef(){Ea(),te.forceDisallow(),Ee.forceAllow()}function bf(n,e,t,i={}){n=Z(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&un(i,r.repoInfo_.emulatorOptions))return;de("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&de('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new tt(tt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:sl(i.mockUserToken,n.app.options.projectId);o=new tt(a)}Hi(e)&&(il(e),al("Database",!0)),gf(r,s,i,o)}function If(n){n=Z(n),n._checkNotDeleted("goOffline"),da(n._repo)}function Sf(n){n=Z(n),n._checkNotDeleted("goOnline"),xd(n._repo)}function Tf(n,e){lo(n,e)}/**
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
 */function Pf(n){so(Yi),st(new ye("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return wa(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),me(Ys,Qs,n),me(Ys,Qs,"esm2020")}/**
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
 */const Nf={".sv":"timestamp"};function Rf(){return Nf}function Af(n){return{".sv":{increment:n}}}/**
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
 */let kf=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function Df(n,e,t){if(n=Z(n),ie("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const i=t?.applyLocally??!0,s=new j,r=(a,l,c)=>{let d=null;a?s.reject(a):(d=new Yn(c,new re(n._repo,n._path),N),s.resolve(new kf(l,d)))},o=Li(n,()=>{});return Od(n._repo,n._path,e,r,o,i),s.promise}ge.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ge.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Pf();const xf="@firebase/database-compat",Of="2.1.0";/**
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
 */const Mf=new Rn("@firebase/database-compat"),ba=function(n){const e="FIREBASE WARNING: "+n;Mf.warn(e)};/**
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
 */const Lf=function(n,e,t,i){if(t!==void 0&&typeof t!="boolean")throw new Error(q(n,e)+"must be a boolean.")},Ff=function(n,e,t){if(e!==void 0)switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(q(n,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}};/**
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
 */class Bf{constructor(e){this._delegate=e}cancel(e){y("OnDisconnect.cancel",0,1,arguments.length),M("OnDisconnect.cancel","onComplete",e,!0);const t=this._delegate.cancel();return e&&t.then(()=>e(null),i=>e(i)),t}remove(e){y("OnDisconnect.remove",0,1,arguments.length),M("OnDisconnect.remove","onComplete",e,!0);const t=this._delegate.remove();return e&&t.then(()=>e(null),i=>e(i)),t}set(e,t){y("OnDisconnect.set",1,2,arguments.length),M("OnDisconnect.set","onComplete",t,!0);const i=this._delegate.set(e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){y("OnDisconnect.setWithPriority",2,3,arguments.length),M("OnDisconnect.setWithPriority","onComplete",i,!0);const s=this._delegate.setWithPriority(e,t);return i&&s.then(()=>i(null),r=>i(r)),s}update(e,t){if(y("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,ba("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}M("OnDisconnect.update","onComplete",t,!0);const i=this._delegate.update(e);return t&&i.then(()=>t(null),s=>t(s)),i}}/**
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
 */class Wf{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return y("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}}}/**
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
 */class Ne{constructor(e,t){this._database=e,this._delegate=t}val(){return y("DataSnapshot.val",0,0,arguments.length),this._delegate.val()}exportVal(){return y("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()}toJSON(){return y("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()}exists(){return y("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()}child(e){return y("DataSnapshot.child",0,1,arguments.length),e=String(e),Ut("DataSnapshot.child","path",e),new Ne(this._database,this._delegate.child(e))}hasChild(e){return y("DataSnapshot.hasChild",1,1,arguments.length),Ut("DataSnapshot.hasChild","path",e),this._delegate.hasChild(e)}getPriority(){return y("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority}forEach(e){return y("DataSnapshot.forEach",1,1,arguments.length),M("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(t=>e(new Ne(this._database,t)))}hasChildren(){return y("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()}get key(){return this._delegate.key}numChildren(){return y("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size}getRef(){return y("DataSnapshot.ref",0,0,arguments.length),new Q(this._database,this._delegate.ref)}get ref(){return this.getRef()}}class V{constructor(e,t){this.database=e,this._delegate=t}on(e,t,i,s){y("Query.on",2,4,arguments.length),M("Query.on","callback",t,!1);const r=V.getCancelAndContextArgs_("Query.on",i,s),o=(l,c)=>{t.call(r.context,new Ne(this.database,l),c)};o.userCallback=t,o.context=r.context;const a=r.cancel?.bind(r.context);switch(e){case"value":return Li(this._delegate,o,a),t;case"child_added":return Nr(this._delegate,o,a),t;case"child_removed":return kr(this._delegate,o,a),t;case"child_changed":return Rr(this._delegate,o,a),t;case"child_moved":return Ar(this._delegate,o,a),t;default:throw new Error(q("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}off(e,t,i){if(y("Query.off",0,3,arguments.length),Ff("Query.off",e),M("Query.off","callback",t,!0),Fs("Query.off","context",i),t){const s=()=>{};s.userCallback=t,s.context=i,Dr(this._delegate,e,s)}else Dr(this._delegate,e)}get(){return qd(this._delegate).then(e=>new Ne(this.database,e))}once(e,t,i,s){y("Query.once",1,4,arguments.length),M("Query.once","callback",t,!0);const r=V.getCancelAndContextArgs_("Query.once",i,s),o=new j,a=(c,d)=>{const u=new Ne(this.database,c);t&&t.call(r.context,u,d),o.resolve(u)};a.userCallback=t,a.context=r.context;const l=c=>{r.cancel&&r.cancel.call(r.context,c),o.reject(c)};switch(e){case"value":Li(this._delegate,a,l,{onlyOnce:!0});break;case"child_added":Nr(this._delegate,a,l,{onlyOnce:!0});break;case"child_removed":kr(this._delegate,a,l,{onlyOnce:!0});break;case"child_changed":Rr(this._delegate,a,l,{onlyOnce:!0});break;case"child_moved":Ar(this._delegate,a,l,{onlyOnce:!0});break;default:throw new Error(q("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return o.promise}limitToFirst(e){return y("Query.limitToFirst",1,1,arguments.length),new V(this.database,ae(this._delegate,tf(e)))}limitToLast(e){return y("Query.limitToLast",1,1,arguments.length),new V(this.database,ae(this._delegate,sf(e)))}orderByChild(e){return y("Query.orderByChild",1,1,arguments.length),new V(this.database,ae(this._delegate,of(e)))}orderByKey(){return y("Query.orderByKey",0,0,arguments.length),new V(this.database,ae(this._delegate,lf()))}orderByPriority(){return y("Query.orderByPriority",0,0,arguments.length),new V(this.database,ae(this._delegate,uf()))}orderByValue(){return y("Query.orderByValue",0,0,arguments.length),new V(this.database,ae(this._delegate,df()))}startAt(e=null,t){return y("Query.startAt",0,2,arguments.length),new V(this.database,ae(this._delegate,Jd(e,t)))}startAfter(e=null,t){return y("Query.startAfter",0,2,arguments.length),new V(this.database,ae(this._delegate,Zd(e,t)))}endAt(e=null,t){return y("Query.endAt",0,2,arguments.length),new V(this.database,ae(this._delegate,Yd(e,t)))}endBefore(e=null,t){return y("Query.endBefore",0,2,arguments.length),new V(this.database,ae(this._delegate,Kd(e,t)))}equalTo(e,t){return y("Query.equalTo",1,2,arguments.length),new V(this.database,ae(this._delegate,pf(e,t)))}toString(){return y("Query.toString",0,0,arguments.length),this._delegate.toString()}toJSON(){return y("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()}isEqual(e){if(y("Query.isEqual",1,1,arguments.length),!(e instanceof V)){const t="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(t)}return this._delegate.isEqual(e._delegate)}static getCancelAndContextArgs_(e,t,i){const s={cancel:void 0,context:void 0};if(t&&i)s.cancel=t,M(e,"cancel",s.cancel,!0),s.context=i,Fs(e,"context",s.context);else if(t)if(typeof t=="object"&&t!==null)s.context=t;else if(typeof t=="function")s.cancel=t;else throw new Error(q(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return s}get ref(){return new Q(this.database,new re(this._delegate._repo,this._delegate._path))}}class Q extends V{constructor(e,t){super(e,new Y(t._repo,t._path,new Dn,!1)),this.database=e,this._delegate=t}getKey(){return y("Reference.key",0,0,arguments.length),this._delegate.key}child(e){return y("Reference.child",1,1,arguments.length),typeof e=="number"&&(e=String(e)),new Q(this.database,qe(this._delegate,e))}getParent(){y("Reference.parent",0,0,arguments.length);const e=this._delegate.parent;return e?new Q(this.database,e):null}getRoot(){return y("Reference.root",0,0,arguments.length),new Q(this.database,this._delegate.root)}set(e,t){y("Reference.set",1,2,arguments.length),M("Reference.set","onComplete",t,!0);const i=ks(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}update(e,t){if(y("Reference.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,ba("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}ie("Reference.update",this._delegate._path),M("Reference.update","onComplete",t,!0);const i=Gd(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){y("Reference.setWithPriority",2,3,arguments.length),M("Reference.setWithPriority","onComplete",i,!0);const s=jd(this._delegate,e,t);return i&&s.then(()=>i(null),r=>i(r)),s}remove(e){y("Reference.remove",0,1,arguments.length),M("Reference.remove","onComplete",e,!0);const t=Hd(this._delegate);return e&&t.then(()=>e(null),i=>e(i)),t}transaction(e,t,i){y("Reference.transaction",1,3,arguments.length),M("Reference.transaction","transactionUpdate",e,!1),M("Reference.transaction","onComplete",t,!0),Lf("Reference.transaction","applyLocally",i);const s=Df(this._delegate,e,{applyLocally:i}).then(r=>new Wf(r.committed,new Ne(this.database,r.snapshot)));return t&&s.then(r=>t(null,r.committed,r.snapshot),r=>t(r,!1,null)),s}setPriority(e,t){y("Reference.setPriority",1,2,arguments.length),M("Reference.setPriority","onComplete",t,!0);const i=zd(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}push(e,t){y("Reference.push",0,2,arguments.length),M("Reference.push","onComplete",t,!0);const i=$d(this._delegate,e),s=i.then(o=>new Q(this.database,o));t&&s.then(()=>t(null),o=>t(o));const r=new Q(this.database,i);return r.then=s.then.bind(s),r.catch=s.catch.bind(s,void 0),r}onDisconnect(){return ie("Reference.onDisconnect",this._delegate._path),new Bf(new Vd(this._delegate._repo,this._delegate._path))}get key(){return this.getKey()}get parent(){return this.getParent()}get root(){return this.getRoot()}}/**
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
 */class Vt{constructor(e,t){this._delegate=e,this.app=t,this.INTERNAL={delete:()=>this._delegate._delete(),forceWebSockets:wf,forceLongPolling:Ef}}useEmulator(e,t,i={}){bf(this._delegate,e,t,i)}ref(e){if(y("database.ref",0,1,arguments.length),e instanceof Q){const t=Pr(this._delegate,e.toString());return new Q(this,t)}else{const t=ya(this._delegate,e);return new Q(this,t)}}refFromURL(e){y("database.refFromURL",1,1,arguments.length);const i=Pr(this._delegate,e);return new Q(this,i)}goOffline(){return y("database.goOffline",0,0,arguments.length),If(this._delegate)}goOnline(){return y("database.goOnline",0,0,arguments.length),Sf(this._delegate)}}Vt.ServerValue={TIMESTAMP:Rf(),increment:n=>Af(n)};function Uf({app:n,url:e,version:t,customAuthImpl:i,customAppCheckImpl:s,namespace:r,nodeAdmin:o=!1}){so(t);const a=new zi("database-standalone"),l=new pi("auth-internal",a);l.setComponent(new ye("auth-internal",()=>i,"PRIVATE"));let c;return s&&(c=new pi("app-check-internal",a),c.setComponent(new ye("app-check-internal",()=>s,"PRIVATE"))),{instance:new Vt(wa(n,l,c,e,o),n),namespace:r}}var Vf=Object.freeze({__proto__:null,initStandalone:Uf});/**
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
 */const $f=Vt.ServerValue;function Hf(n){n.INTERNAL.registerComponent(new ye("database-compat",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app-compat").getImmediate(),s=e.getProvider("database").getImmediate({identifier:t});return new Vt(s,i)},"PUBLIC").setServiceProps({Reference:Q,Query:V,Database:Vt,DataSnapshot:Ne,enableLogging:Tf,INTERNAL:Vf,ServerValue:$f}).setMultipleInstances(!0)),n.registerVersion(xf,Of)}Hf(Dt);const zf={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",projectId:"vidu-aae11",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"};Dt.apps.length||Dt.initializeApp(zf);const se=Dt.database();function Ia(n,e,t){if(!n||!e)return;const i=`rooms/${n}/connections/${e}`;return se.ref(i).set({status:t,timestamp:Date.now()})}const Sa={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},m={roomId:null,isInitiator:!1,wasConnected:!1,peerConnection:null,localStream:null};function Ta(){return m.roomId}function jf(){return m.isInitiator}function Gf(){return m.wasConnected}function Pa(n){m.localStream=n}function Kn(){return m.localStream}function qf(){return m.peerConnection}async function Yf({onRemoteStream:n,onStatusUpdate:e}){m.isInitiator=!0,m.roomId||(m.roomId=Zf()),m.peerConnection=new RTCPeerConnection(Sa);const t=[];if(!m.localStream)throw e?.("Error: No local media. Please allow mic/camera."),new Error("connect called without localStream set");m.localStream.getTracks().forEach(r=>{m.peerConnection.addTrack(r,m.localStream)});const i=await m.peerConnection.createOffer();await m.peerConnection.setLocalDescription(i);const s=await ep(m.roomId,i);return m.peerConnection.ontrack=r=>{Na(r,n)},m.peerConnection.onicecandidate=r=>{r.candidate&&s.child("callerCandidates").push(r.candidate.toJSON())},s.child("answer").on("value",async r=>{const o=r.val();if(o&&!m.peerConnection.currentRemoteDescription){await m.peerConnection.setRemoteDescription(new RTCSessionDescription(o));for(const a of t)try{await m.peerConnection.addIceCandidate(a)}catch(l){console.warn("Failed to add queued ICE candidate",l)}t.length=0}}),s.child("calleeCandidates").on("child_added",r=>{const o=new RTCIceCandidate(r.val());m.peerConnection.currentRemoteDescription?m.peerConnection.addIceCandidate(o).catch(a=>console.warn("addIceCandidate failed",a)):t.push(o)}),Ia(m.roomId,"initiator","connected"),e&&e("Link ready! Waiting for partner..."),{roomId:m.roomId,shareUrl:`${window.location.origin}${window.location.pathname}?room=${m.roomId}`}}async function Qf({roomId:n,onRemoteStream:e,onStatusUpdate:t}){m.roomId=n;const{roomRef:i,roomSnapshot:s}=await tp(n);if(!s.exists())return t&&t("Error: Invalid room link"),{success:!1};if(m.peerConnection=new RTCPeerConnection(Sa),!m.localStream)throw t?.("Error: No local media. Please allow mic/camera."),new Error("join called without localStream set");m.localStream.getTracks().forEach(a=>{m.peerConnection.addTrack(a,m.localStream)}),m.peerConnection.ontrack=a=>{Na(a,e)},m.peerConnection.onicecandidate=a=>{a.candidate&&i.child("calleeCandidates").push(a.candidate.toJSON())};const r=s.val().offer;await m.peerConnection.setRemoteDescription(new RTCSessionDescription(r));const o=await m.peerConnection.createAnswer();return await m.peerConnection.setLocalDescription(o),await i.child("answer").set({type:o.type,sdp:o.sdp}),i.child("callerCandidates").on("child_added",a=>{const l=a.val();m.peerConnection.addIceCandidate(new RTCIceCandidate(l))}),Ia(m.roomId,"joiner","connected"),{success:!0}}async function Kf({onStatusUpdate:n}){Xf(),m.peerConnection&&(m.peerConnection.ontrack=null,m.peerConnection.onicecandidate=null,m.peerConnection.close(),m.peerConnection=null),m.localStream&&(m.localStream.getTracks().forEach(e=>e.stop()),m.localStream=null),m.roomId&&m.isInitiator&&await np(m.roomId),m.roomId=null,m.isInitiator=!1,m.wasConnected=!1,n&&n("Disconnected. Ready for new chat.")}function Jf(n){n&&(n.roomId&&(m.roomId=n.roomId),n.isInitiator!==void 0&&(m.isInitiator=n.isInitiator),n.wasConnected!==void 0&&(m.wasConnected=n.wasConnected))}function Na(n,e){m.wasConnected=!0,e&&e(n.streams[0])}function Xf(){if(!m.roomId)return;const n=se.ref(`rooms/${m.roomId}`);n.child("answer").off(),n.child("offer").off(),n.child("callerCandidates").off(),n.child("calleeCandidates").off()}function Zf(){return Math.random().toString(36).substring(2,15)}async function ep(n,e){const t=se.ref(`rooms/${n}`);return await t.set({offer:{type:e.type,sdp:e.sdp}}),t}async function tp(n){const e=se.ref(`rooms/${n}`),t=await e.once("value");return{roomRef:e,roomSnapshot:t}}async function np(n){await se.ref(`rooms/${n}`).remove()}function ip(n,e){let t="Error: Could not access camera/mic.";n.name==="NotAllowedError"?t+=" Permission denied. Please allow access to your camera and microphone.":n.name==="NotFoundError"||n.name==="DevicesNotFoundError"?t+=" No camera or microphone found on this device.":n.name==="NotReadableError"||n.name==="TrackStartError"?t+=" Camera or microphone is already in use by another application.":n.name==="OverconstrainedError"||n.name==="ConstraintNotSatisfiedError"?t+=" The requested media device is not available or does not support the requested constraints.":n.name==="NotSupportedError"?t+=" Your browser or device does not support video/audio capture, or HTTPS is required.":t+=" "+n.message,console.error("Media error:",t,n)}function sp(n,e){n.textContent=e}function rp({startChatBtn:n,hangUpBtn:e,copyLinkBtn:t,switchCameraBtn:i,toggleMuteBtn:s,toggleVideoBtn:r,toggleModeBtn:o,loadStreamBtn:a,pipBtn:l,remoteVideo:c,handleStartChat:d,handleHangUp:u,handleCopyLink:h,handleToggleMute:p,handleToggleVideo:_,handleToggleMode:E,handleLoadStream:D,handlePipToggle:ee,handleSwitchCamera:oe,updateStatus:we}){document.addEventListener("keydown",We=>{We.altKey&&We.key==="p"&&c.srcObject&&(We.preventDefault(),ee())}),n.addEventListener("click",d),e.addEventListener("click",u),t.addEventListener("click",h),i.addEventListener("click",oe),s.addEventListener("click",p),r.addEventListener("click",_),o.addEventListener("click",E),a.addEventListener("click",D),l.addEventListener("click",ee)}let R=null,Ye=!1,op=()=>!!document.pictureInPictureElement;async function ap(n,e,t,i=!1){console.log("[PiP] Toggle requested",{hasDocumentPiP:"documentPictureInPicture"in window,hasStream:!!n.srcObject,hasFloatingWindow:!!document.pictureInPictureElement,documentPipWindowOpen:!!R,nativePipActive:op()});try{if(!n.srcObject){console.warn("[PiP] No remote stream available"),t("Connect to a partner first");return}if(document.pictureInPictureElement){console.log("[PiP] Exiting active native PiP (via custom button)"),await document.exitPictureInPicture(),Ye=!1,e.textContent="Float Partner Video";return}if(R){console.log("[PiP] Closing existing Document PiP window"),R.close(),R=null,e.textContent="Float Partner Video";return}if(n.offsetParent===null&&!("documentPictureInPicture"in window)){console.warn("[PiP] Video is hidden and Document PiP not available"),t("Switch to Video Chat mode to use floating window");return}if(i&&"documentPictureInPicture"in window){await lp(n,e);return}if("pictureInPictureEnabled"in document){await cp(n,e);return}}catch(s){console.error("[PiP] Error:",s.name,s.message,s),s.name==="NotAllowedError"?t("Picture-in-Picture blocked. Check browser permissions."):s.name==="InvalidStateError"?t("Cannot open PiP - video not ready"):t("Picture-in-Picture failed. See console for details.")}}async function lp(n,e){console.log("[PiP] Opening Document PiP window");try{if(R=await window.documentPictureInPicture.requestWindow({width:400,height:300}),console.log("[PiP] Document PiP window created",{width:R.innerWidth,height:R.innerHeight,closed:R.closed}),R.closed)throw console.error("[PiP] Window was closed immediately after creation"),R=null,new Error("PiP window closed immediately");[...document.styleSheets].forEach(a=>{try{const l=[...a.cssRules].map(d=>d.cssText).join(""),c=document.createElement("style");c.textContent=l,R.document.head.appendChild(c)}catch{const c=document.createElement("link");c.rel="stylesheet",c.href=a.href,R.document.head.appendChild(c)}}),R.document.body.innerHTML=`
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;const t=R.document.getElementById("pipVideo"),i=R.document.getElementById("pipMute"),s=n.srcObject.getVideoTracks(),r=n.srcObject.getAudioTracks();console.log("[PiP] Stream tracks:",{video:s.length,audio:r.length,videoActive:s[0]?.enabled,audioActive:r[0]?.enabled}),t.srcObject=n.srcObject,console.log("[PiP] Stream attached to PiP video"),console.log("[PiP] Video will autoplay (muted initially for browser policy)");let o=!0;i.addEventListener("click",()=>{if(!n.srcObject){console.warn("[PiP] Remote stream no longer available");return}o=!o,t.muted=o,o?n.muted=!1:n.muted=!0,i.textContent=o?"Unmute Partner":"Mute Partner",i.style.background=o?"#ff9800":"#4caf50",console.log("[PiP] Partner audio in PiP window:",o?"MUTED":"UNMUTED")}),R.addEventListener("pagehide",()=>{console.log("[PiP] Document PiP window closed by user or browser"),R=null,e.textContent="Float Partner Video"}),R.addEventListener("load",()=>{console.log("[PiP] Document PiP window loaded event fired")}),t.addEventListener("error",a=>{console.error("[PiP] Video element error:",a)}),t.addEventListener("loadedmetadata",()=>{console.log("[PiP] Video metadata loaded in PiP window")}),e.textContent="Close Float Window",console.log("[PiP] Document PiP setup complete")}catch(t){throw console.error("[PiP] Error during Document PiP setup:",t),R&&(R.close(),R=null),t}}async function cp(n,e){document.pictureInPictureElement?(console.log("[PiP] Exiting native PiP"),await document.exitPictureInPicture(),Ye=!1,e.textContent="Float Partner Video"):(console.log("[PiP] Entering native PiP"),await n.requestPictureInPicture(),Ye=!0,e.textContent="Exit Float Mode")}function up(n,e){n.addEventListener("enterpictureinpicture",()=>{console.log("[PiP] Remote video entered native PiP (via browser controls)"),Ye=!0,e.textContent="Exit Float Mode"}),n.addEventListener("leavepictureinpicture",()=>{console.log("[PiP] Remote video exited native PiP (via browser controls)"),Ye=!1,e.textContent="Float Partner Video"})}function hp(n){console.log("[PiP] Cleanup requested"),R&&(console.log("[PiP] Closing Document PiP window during cleanup"),R.close(),R=null),Ye&&document.pictureInPictureElement&&(console.log("[PiP] Exiting native PiP during cleanup"),document.exitPictureInPicture().catch(e=>{console.warn("[PiP] Failed to exit native PiP:",e)}),Ye=!1),n&&(n.textContent="Float Partner Video",n.style.display="none"),console.log("[PiP] Cleanup complete")}const Re={player:null,ready:!1,currentId:null};function Sn(n){return/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/.test(n)}function Ra(n){const e=n.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);return e?e[1]:null}function Aa(n,e,t){e.style.display="none";const i=document.getElementById("yt-iframe");i&&i.remove();let s=document.getElementById("yt-player-div");s||(s=document.createElement("div"),s.id="yt-player-div",e.parentNode.insertBefore(s,e)),s.innerHTML='<div id="yt-iframe"></div>',s.style.display="",Re.player=new YT.Player("yt-iframe",{height:"360",width:"640",videoId:n,events:{onReady:()=>{Re.ready=!0},onStateChange:t}}),Re.currentId=n}function ka(n){const e=document.getElementById("yt-player-div");e&&(e.style.display="none"),n.style.display="",Re.player=null,Re.ready=!1,Re.currentId=null}function Bi(){return Re.player}function Wi(){return Re.ready}const $={watchMode:!1,isSyncing:!1};function Da(){return $.watchMode}function dp({videoContainer:n,watchContainer:e,toggleModeBtn:t,sharedVideo:i,streamUrlInput:s,syncStatus:r}){return $.watchMode=!$.watchMode,$.watchMode?(n.style.display="none",e.style.display="block",t.textContent="Switch to Video Chat",r.textContent="Paste the same stream URL as your partner"):(n.style.display="flex",e.style.display="none",t.textContent="Switch to Watch Mode",i.src="",s.value=""),$.watchMode}function fp({roomId:n,url:e,sharedVideo:t,syncStatus:i}){if(!e){i.textContent="Please enter a stream URL";return}if(Sn(e)){const s=Ra(e);Aa(s,t,r=>Oa(r,n)),i.textContent="YouTube video sent to partner..."}else ka(t),t.src=e,i.textContent="Video sent to partner...";n&&se.ref(`rooms/${n}/stream`).set({url:e})}function xa({roomId:n,sharedVideo:e,streamUrlInput:t,syncStatus:i}){if(!n)return;const s=se.ref(`rooms/${n}`);s.child("stream/url").on("value",r=>{const o=r.val();o&&o!==t.value&&(t.value=o,i.innerHTML='Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>',document.getElementById("accept-shared-video").addEventListener("click",()=>pp({url:o,sharedVideo:e,syncStatus:i})),i.style.background="#2196f3")}),s.child("stream/playing").on("value",async r=>{if($.isSyncing)return;const o=r.val(),a=t.value,l=Bi(),c=Wi();if(Sn(a)&&l&&c)o===!0&&l.getPlayerState()!==YT.PlayerState.PLAYING?(l.playVideo(),i.textContent="Playing in sync"):o===!1&&l.getPlayerState()===YT.PlayerState.PLAYING&&(l.pauseVideo(),i.textContent="Partner pressed pause");else if(o===!0&&e.paused)try{await e.play(),i.textContent="Playing in sync"}catch{i.textContent="▶️ Tap the video to start playing",i.style.background="#FF5722",i.style.fontSize="16px";const u=()=>{i.style.background="#2a2a2a",i.style.fontSize="14px",e.removeEventListener("play",u)};e.addEventListener("play",u)}else o===!1&&!e.paused&&(e.pause(),i.textContent="Partner pressed pause")}),s.child("stream/time").on("value",r=>{if($.isSyncing)return;const o=r.val(),a=t.value,l=Bi(),c=Wi();Sn(a)&&l&&c?o!==null&&Math.abs(l.getCurrentTime()-o)>2&&(l.seekTo(o,!0),i.textContent=`Syncing to ${Math.floor(o)}s`):o!==null&&Math.abs(e.currentTime-o)>2&&(e.currentTime=o,i.textContent=`Syncing to ${Math.floor(o)}s`)}),_p({roomId:n,sharedVideo:e})}function Oa(n,e){const t=Bi(),i=Wi();!e||!i||!t||(n.data===YT.PlayerState.PLAYING?se.ref(`rooms/${e}/stream`).update({playing:!0,time:t.getCurrentTime()}):n.data===YT.PlayerState.PAUSED&&se.ref(`rooms/${e}/stream`).update({playing:!1,time:t.getCurrentTime()}))}function pp({url:n,sharedVideo:e,syncStatus:t}){if(Sn(n)){const i=Ra(n);Aa(i,e,Oa),t.textContent="Loading YouTube video..."}else ka(e),e.src=n,t.textContent="Loading shared video...";t.style.background="#2a2a2a"}function _p({roomId:n,sharedVideo:e}){e.addEventListener("play",()=>{n&&!$.isSyncing&&($.isSyncing=!0,se.ref(`rooms/${n}/stream`).update({playing:!0,time:e.currentTime}),setTimeout(()=>$.isSyncing=!1,1e3))}),e.addEventListener("pause",()=>{n&&!$.isSyncing&&($.isSyncing=!0,se.ref(`rooms/${n}/stream`).update({playing:!1,time:e.currentTime}),setTimeout(()=>$.isSyncing=!1,1e3))}),e.addEventListener("seeked",()=>{n&&!$.isSyncing&&($.isSyncing=!0,se.ref(`rooms/${n}/stream`).update({time:e.currentTime}),setTimeout(()=>$.isSyncing=!1,1e3))}),e.addEventListener("loadeddata",()=>{}),e.addEventListener("waiting",()=>{}),e.addEventListener("playing",()=>{})}const W={isAudioMuted:!1,isVideoOn:!0,currentFacingMode:"user"};function Ma(){return W.isAudioMuted}function La(){return W.isVideoOn}function mp(){return W.currentFacingMode}function gp({localStream:n,toggleMuteBtn:e,muteSelfBtn:t}){const i=n.getAudioTracks()[0];if(i&&(W.isAudioMuted=!W.isAudioMuted,i.enabled=!W.isAudioMuted,e&&(e.textContent=W.isAudioMuted?"Unmute Mic":"Mute Mic"),t)){const s=t.querySelector("i");s&&(s.className=W.isAudioMuted?"fa fa-microphone-slash":"fa fa-microphone")}}function yp({localStream:n,toggleVideoBtn:e}){const t=n.getVideoTracks()[0];t&&(W.isVideoOn=!W.isVideoOn,t.enabled=W.isVideoOn,e&&(e.textContent=W.isVideoOn?"Turn Video Off":"Turn Video On"))}async function vp({localStream:n,localVideo:e,peerConnection:t}){const i=W.currentFacingMode==="user"?"environment":"user",s=n.getVideoTracks()[0];try{await s.applyConstraints({facingMode:i}),W.currentFacingMode=i;return}catch(a){console.warn("applyConstraints failed, falling back to getUserMedia:",a)}const r=await navigator.mediaDevices.getUserMedia({video:{facingMode:i},audio:!1}),o=r.getVideoTracks()[0];if(t){const a=t.getSenders().find(l=>l.track&&l.track.kind==="video");a&&a.replaceTrack(o)}n.removeTrack(s),n.addTrack(o),e.srcObject=n,s.stop(),r.getTracks().forEach(a=>{a!==o&&a.stop()}),W.currentFacingMode=i}function Cp(n){n&&(n.isAudioMuted!==void 0&&(W.isAudioMuted=n.isAudioMuted),n.isVideoOn!==void 0&&(W.isVideoOn=n.isVideoOn),n.currentFacingMode&&(W.currentFacingMode=n.currentFacingMode))}function wp(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Ep(){return wp()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function bp(){const n=await Ep();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}let St=!1;function Be(){Ga({roomId:Ta(),isInitiator:jf(),isAudioMuted:Ma(),isVideoOn:La(),currentFacingMode:mp(),watchMode:Da(),wasConnected:Gf(),streamUrl:Qe.value})}async function Fa(){if(St)return console.debug("init() called when isInitialized is true."),!0;try{const n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});Pa(n),pe.srcObject=n,sn.style.display="block",rn.style.display="block",await bp()?Jn.style.display="block":Jn.style.display="none",rp({startChatBtn:Tt,hangUpBtn:Tn,copyLinkBtn:hi,switchCameraBtn:Jn,toggleMuteBtn:sn,toggleVideoBtn:rn,toggleModeBtn:Ht,loadStreamBtn:Va,pipBtn:Pt,remoteVideo:F,handleStartChat:Tp,handleHangUp:Np,handleCopyLink:Rp,handleSwitchCamera:async()=>{await vp({localStream:Kn(),localVideo:pe,peerConnection:qf()}),Be()},handleToggleMute:Ds,handleToggleVideo:Wa,handleToggleMode:Ua,handleLoadStream:Ap,handlePipToggle:()=>ap(F,Pt,Ie),updateStatus:Ie});const t=new URLSearchParams(window.location.search).get("room"),i=qa(),s=Ip({urlRoomId:t,savedState:i});return s.action==="join"?(Ie("Connecting..."),Tt.style.display="none",Sp(i),await Pp(s.roomId)):Ie("Ready. Click to generate video chat link."),St=!0,!0}catch(n){return ip(n),St=!1,!1}}function Ip({urlRoomId:n,savedState:e}){const t=n;return t?{action:"join",roomId:t}:{action:"idle"}}function Sp(n){n&&(Cp(n),Jf(n),La()||Wa(),Ma()&&Ds(),n.watchMode&&!Da()&&(Ua(),n.streamUrl&&(Qe.value=n.streamUrl)))}function Ba(n){F.srcObject!==n&&(F.srcObject=n,Pt.style.display="block",up(F,Pt),Be(),Ie("Connected!"),F.paused&&F.srcObject&&F.play().catch(e=>{}))}let ui=!1;async function Tp(){if(!ui){ui=!0;try{if(!St&&!await Fa()){console.error("Failed to initialize media devices.");return}const{roomId:n,shareUrl:e}=await Yf({onRemoteStream:Ba,onStatusUpdate:Ie});on.value=e,xr.style.display="block",Tt.disabled=!0,Tn.disabled=!1,xa({roomId:n,sharedVideo:$t,streamUrlInput:Qe,syncStatus:zt}),Ht.style.display="block",Be()}finally{ui=!1}}}async function Pp(n){(await Qf({roomId:n,onRemoteStream:Ba,onStatusUpdate:Ie})).success&&(xa({roomId:n,sharedVideo:$t,streamUrlInput:Qe,syncStatus:zt}),Ht.style.display="block",Tn.disabled=!1,Be())}async function Np(){hp(Pt),F.srcObject&&(F.srcObject.getTracks().forEach(e=>e.stop()),F.srcObject=null);const n=Kn();n&&(n.getTracks().forEach(e=>e.stop()),pe.srcObject=null,Pa(null)),await Kf({onStatusUpdate:Ie}),Tt.disabled=!1,Tt.style.display="block",Tn.disabled=!0,xr.style.display="none",sn.style.display="none",rn.style.display="none",Ht.style.display="none",Or.style.display="none",Mr.style.display="flex",on.value="",$t.src="",Qe.value="",zt.textContent="",window.history.replaceState({},document.title,window.location.pathname),di(),St=!1}async function Rp(){try{await navigator.clipboard.writeText(on.value),hi.textContent="Copied!",setTimeout(()=>hi.textContent="Copy Link",2e3)}catch{on.select(),document.execCommand("copy")}}function Ie(n){sp($a,n)}function Ds(){gp({localStream:Kn(),toggleMuteBtn:sn,muteSelfBtn:Lr}),Be()}function Wa(){yp({localStream:Kn(),toggleVideoBtn:rn}),Be()}function Ua(){dp({videoContainer:Mr,watchContainer:Or,toggleModeBtn:Ht,sharedVideo:$t,streamUrlInput:Qe,syncStatus:zt}),Be()}function Ap(){const n=Qe.value.trim();fp({roomId:Ta(),url:n,sharedVideo:$t,syncStatus:zt}),Be()}Ha?.addEventListener("click",()=>{F.requestFullscreen?F.requestFullscreen():F.webkitRequestFullscreen?F.webkitRequestFullscreen():F.msRequestFullscreen&&F.msRequestFullscreen()});za?.addEventListener("click",()=>{pe.requestFullscreen?pe.requestFullscreen():pe.webkitRequestFullscreen?pe.webkitRequestFullscreen():pe.msRequestFullscreen&&pe.msRequestFullscreen()});Lr?.addEventListener("click",()=>Ds());xs?.addEventListener("click",()=>{const n=F.srcObject?.getAudioTracks()[0];if(n){n.enabled=!n.enabled;const e=xs.querySelector("i");e&&(e.className=n.enabled?"fa fa-volume-mute":"fa fa-volume-up")}});function kp(n){let e;function t(){n.classList.add("show-controls"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("show-controls")},3e3)}n.addEventListener("touchstart",t),n.addEventListener("click",s=>{s.target.closest(".hover-controls")||t()});const i=n.querySelector(".hover-controls");i.addEventListener("mouseenter",()=>clearTimeout(e)),i.addEventListener("touchstart",()=>clearTimeout(e),{passive:!0}),i.addEventListener("click",()=>clearTimeout(e)),i.addEventListener("mouseleave",()=>{e=setTimeout(()=>{n.classList.remove("show-controls")},2e3)})}document.querySelectorAll(".video-wrapper").forEach(kp);Fa();
