(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Nt=document.getElementById("localVideo"),G=document.getElementById("remoteVideo"),Qt=document.getElementById("sharedVideo"),Te=document.getElementById("startChat"),ot=document.getElementById("hangUp"),Gs=document.getElementById("copyLink"),Dt=document.getElementById("pipBtn"),Yr=document.getElementById("switchCameraSelfBtn"),De=document.getElementById("toggleMode"),rl=document.getElementById("loadStream"),ol=document.getElementById("status"),hn=document.getElementById("linkContainer"),Qr=document.getElementById("watchContainer"),Kr=document.querySelector(".video-container"),Kt=document.getElementById("syncStatus"),Mn=document.getElementById("shareLink"),ve=document.getElementById("streamUrl"),Jr=document.getElementById("mutePartnerBtn"),Xr=document.getElementById("fullscreenPartnerBtn"),xt=document.getElementById("muteSelfBtn"),Ot=document.getElementById("videoSelfBtn"),Zr=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");const fn=document.getElementById("titleLink"),eo=document.getElementById("titleText"),Yi="hangvidu_session",al=1440*60*1e3;function ll(n){const e={...n,timestamp:Date.now()};localStorage.setItem(Yi,JSON.stringify(e))}function un(){const n=localStorage.getItem(Yi);if(!n)return null;try{const e=JSON.parse(n);return Date.now()-e.timestamp>al?(it(),null):e}catch(e){return console.error("Failed to parse stored state:",e),it(),null}}function it(){localStorage.removeItem(Yi)}/**
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
 */const cl=()=>{};var zs={};/**
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
 */const to={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const p=function(n,e){if(!n)throw mt(e)},mt=function(n){return new Error("Firebase Database ("+to.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const no=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ul=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Qi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,m=c&63;l||(m=64,o||(h=64)),i.push(t[u],t[d],t[h],t[m])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(no(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ul(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||d==null)throw new dl;const h=r<<2|a>>4;if(i.push(h),c!==64){const m=a<<4&240|c>>2;if(i.push(m),d!==64){const _=c<<6&192|d;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class dl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const io=function(n){const e=no(n);return Qi.encodeByteArray(e,!0)},pn=function(n){return io(n).replace(/\./g,"")},mn=function(n){try{return Qi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function hl(n){return Mt(void 0,n)}function Mt(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!fl(t)||(n[t]=Mt(n[t],e[t]));return n}function fl(n){return n!=="__proto__"}/**
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
 */function so(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const pl=()=>so().__FIREBASE_DEFAULTS__,ml=()=>{if(typeof process>"u"||typeof zs>"u")return;const n=zs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},_l=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&mn(n[1]);return e&&JSON.parse(e)},gl=()=>{try{return cl()||pl()||ml()||_l()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ki=()=>gl()?.config;/**
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
 */class q{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function Ji(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function yl(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Cl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[pn(JSON.stringify(t)),pn(JSON.stringify(o)),""].join(".")}const Tt={};function vl(){const n={prod:[],emulator:[]};for(const e of Object.keys(Tt))Tt[e]?n.emulator.push(e):n.prod.push(e);return n}function wl(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let qs=!1;function El(n,e){if(typeof window>"u"||typeof document>"u"||!Ji(window.location.host)||Tt[n]===e||Tt[n]||qs)return;Tt[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=vl().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,m){h.setAttribute("width","24"),h.setAttribute("id",m),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{qs=!0,o()},h}function u(h,m){h.setAttribute("id",m),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=wl(i),m=t("text"),_=document.getElementById(m)||document.createElement("span"),E=t("learnmore"),D=document.getElementById(E)||document.createElement("a"),pe=t("preprendIcon"),me=document.getElementById(pe)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const Ue=h.element;a(Ue),u(D,E);const ai=c();l(me,pe),Ue.append(me,_,D,ai),document.body.appendChild(Ue)}r?(_.innerText="Preview backend disconnected.",me.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(me.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
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
 */function bl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ro(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(bl())}function Sl(){return typeof window<"u"||oo()}function oo(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function Il(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Tl(){return to.NODE_ADMIN===!0}function Rl(){try{return typeof indexedDB=="object"}catch{return!1}}function Pl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const kl="FirebaseError";class _t extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=kl,Object.setPrototypeOf(this,_t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ln.prototype.create)}}class Ln{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Al(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new _t(s,a,i)}}function Al(n,e){return n.replace(Nl,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Nl=/\{\$([^}]+)}/g;/**
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
 */function Lt(n){return JSON.parse(n)}function x(n){return JSON.stringify(n)}/**
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
 */const ao=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Lt(mn(r[0])||""),t=Lt(mn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Dl=function(n){const e=ao(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},xl=function(n){const e=ao(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Z(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function qe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function vi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _n(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function gn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Ys(r)&&Ys(o)){if(!gn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ys(n){return n!==null&&typeof n=="object"}/**
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
 */function Ol(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class Ml{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let d=0;d<80;d++){d<40?d<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):d<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+c+l+u+i[d]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ll(n,e){const t=new Fl(n,e);return t.subscribe.bind(t)}class Fl{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Bl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=li),s.error===void 0&&(s.error=li),s.complete===void 0&&(s.complete=li);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Bl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function li(){}/**
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
 */const y=function(n,e,t,i){let s;if(i<e?s="at least "+e:i>t&&(s=t===0?"none":"no more than "+t),s){const r=n+" failed: Was called with "+i+(i===1?" argument.":" arguments.")+" Expects "+s+".";throw new Error(r)}};function Q(n,e){return`${n} failed: ${e} argument `}function F(n,e,t,i){if(!(i&&!t)&&typeof t!="function")throw new Error(Q(n,e)+"must be a valid function.")}function Qs(n,e,t,i){if(t&&(typeof t!="object"||t===null))throw new Error(Q(n,e)+"must be a valid context object.")}/**
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
 */const Vl=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Fn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function te(n){return n&&n._delegate?n._delegate:n}class we{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const $e="[DEFAULT]";/**
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
 */class wi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new q;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ul(e))try{this.getOrInitializeService({instanceIdentifier:$e})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=$e){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$e){return this.instances.has(e)}getOptions(e=$e){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Wl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=$e){return this.component?this.component.multipleInstances?e:$e:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Wl(n){return n===$e?void 0:n}function Ul(n){return n.instantiationMode==="EAGER"}/**
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
 */class Xi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new wi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */const Zi=[];var I;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(I||(I={}));const lo={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},$l=I.INFO,Hl={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},jl=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Hl[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bn{constructor(e){this.name=e,this._logLevel=$l,this._logHandler=jl,this._userLogHandler=null,Zi.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?lo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}function Gl(n){Zi.forEach(e=>{e.setLogLevel(n)})}function zl(n,e){for(const t of Zi){let i=null;e&&e.level&&(i=lo[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(s,r,...o)=>{const a=o.map(l=>{if(l==null)return null;if(typeof l=="string")return l;if(typeof l=="number"||typeof l=="boolean")return l.toString();if(l instanceof Error)return l.message;try{return JSON.stringify(l)}catch{return null}}).filter(l=>l).join(" ");r>=(i??s.logLevel)&&n({level:I[r].toLowerCase(),message:a,args:o,type:s.name})}}}const ql=(n,e)=>e.some(t=>n instanceof t);let Ks,Js;function Yl(){return Ks||(Ks=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ql(){return Js||(Js=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const co=new WeakMap,Ei=new WeakMap,uo=new WeakMap,ci=new WeakMap,es=new WeakMap;function Kl(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Re(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&co.set(t,n)}).catch(()=>{}),es.set(e,n),e}function Jl(n){if(Ei.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ei.set(n,e)}let bi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ei.get(n);if(e==="objectStoreNames")return n.objectStoreNames||uo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Re(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Xl(n){bi=n(bi)}function Zl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ui(this),e,...t);return uo.set(i,e.sort?e.sort():[e]),Re(i)}:Ql().includes(n)?function(...e){return n.apply(ui(this),e),Re(co.get(this))}:function(...e){return Re(n.apply(ui(this),e))}}function ec(n){return typeof n=="function"?Zl(n):(n instanceof IDBTransaction&&Jl(n),ql(n,Yl())?new Proxy(n,bi):n)}function Re(n){if(n instanceof IDBRequest)return Kl(n);if(ci.has(n))return ci.get(n);const e=ec(n);return e!==n&&(ci.set(n,e),es.set(e,n)),e}const ui=n=>es.get(n);function tc(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Re(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Re(o.result),l.oldVersion,l.newVersion,Re(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const nc=["get","getKey","getAll","getAllKeys","count"],ic=["put","add","delete","clear"],di=new Map;function Xs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(di.get(e))return di.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=ic.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||nc.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return di.set(e,r),r}Xl(n=>({...n,get:(e,t,i)=>Xs(e,t)||n.get(e,t,i),has:(e,t)=>!!Xs(e,t)||n.has(e,t)}));/**
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
 */class sc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(rc(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function rc(n){return n.getComponent()?.type==="VERSION"}const yn="@firebase/app",Si="0.14.4";/**
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
 */const Ee=new Bn("@firebase/app"),oc="@firebase/app-compat",ac="@firebase/analytics-compat",lc="@firebase/analytics",cc="@firebase/app-check-compat",uc="@firebase/app-check",dc="@firebase/auth",hc="@firebase/auth-compat",fc="@firebase/database",pc="@firebase/data-connect",mc="@firebase/database-compat",_c="@firebase/functions",gc="@firebase/functions-compat",yc="@firebase/installations",Cc="@firebase/installations-compat",vc="@firebase/messaging",wc="@firebase/messaging-compat",Ec="@firebase/performance",bc="@firebase/performance-compat",Sc="@firebase/remote-config",Ic="@firebase/remote-config-compat",Tc="@firebase/storage",Rc="@firebase/storage-compat",Pc="@firebase/firestore",kc="@firebase/ai",Ac="@firebase/firestore-compat",Nc="firebase",Dc="12.4.0";/**
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
 */const xe="[DEFAULT]",xc={[yn]:"fire-core",[oc]:"fire-core-compat",[lc]:"fire-analytics",[ac]:"fire-analytics-compat",[uc]:"fire-app-check",[cc]:"fire-app-check-compat",[dc]:"fire-auth",[hc]:"fire-auth-compat",[fc]:"fire-rtdb",[pc]:"fire-data-connect",[mc]:"fire-rtdb-compat",[_c]:"fire-fn",[gc]:"fire-fn-compat",[yc]:"fire-iid",[Cc]:"fire-iid-compat",[vc]:"fire-fcm",[wc]:"fire-fcm-compat",[Ec]:"fire-perf",[bc]:"fire-perf-compat",[Sc]:"fire-rc",[Ic]:"fire-rc-compat",[Tc]:"fire-gcs",[Rc]:"fire-gcs-compat",[Pc]:"fire-fst",[Ac]:"fire-fst-compat",[kc]:"fire-vertex","fire-js":"fire-js",[Nc]:"fire-js-all"};/**
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
 */const Oe=new Map,at=new Map,lt=new Map;function Ft(n,e){try{n.container.addComponent(e)}catch(t){Ee.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ho(n,e){n.container.addOrOverwriteComponent(e)}function ct(n){const e=n.name;if(lt.has(e))return Ee.debug(`There were multiple attempts to register component ${e}.`),!1;lt.set(e,n);for(const t of Oe.values())Ft(t,n);for(const t of at.values())Ft(t,n);return!0}function fo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Oc(n,e,t=xe){fo(n,e).clearInstance(t)}function ts(n){return n.options!==void 0}function po(n){return ts(n)?!1:"authIdToken"in n||"appCheckToken"in n||"releaseOnDeref"in n||"automaticDataCollectionEnabled"in n}function mo(n){return n==null?!1:n.settings!==void 0}function Mc(){lt.clear()}/**
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
 */const Lc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},X=new Ln("app","Firebase",Lc);/**
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
 */let _o=class{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new we("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw X.create("app-deleted",{appName:this._name})}};/**
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
 */function Zs(n,e){const t=mn(n.split(".")[1]);if(t===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(t).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const s=JSON.parse(t).exp*1e3,r=new Date().getTime();s-r<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class Fc extends _o{constructor(e,t,i,s){const r=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!0,o={name:i,automaticDataCollectionEnabled:r};if(e.apiKey!==void 0)super(e,o,s);else{const a=e;super(a.options,o,s)}this._serverConfig={automaticDataCollectionEnabled:r,...t},this._serverConfig.authIdToken&&Zs(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&Zs(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,ye(yn,Si,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){ss(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw X.create("server-app-deleted")}}/**
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
 */const ns=Dc;function is(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:xe,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw X.create("bad-app-name",{appName:String(s)});if(t||(t=Ki()),!t)throw X.create("no-options");const r=Oe.get(s);if(r){if(gn(t,r.options)&&gn(i,r.config))return r;throw X.create("duplicate-app",{appName:s})}const o=new Xi(s);for(const l of lt.values())o.addComponent(l);const a=new _o(t,i,o);return Oe.set(s,a),a}function Bc(n,e={}){if(Sl()&&!oo())throw X.create("invalid-server-app-environment");let t,i=e||{};if(n&&(ts(n)?t=n.options:po(n)?i=n:t=n),i.automaticDataCollectionEnabled===void 0&&(i.automaticDataCollectionEnabled=!0),t||(t=Ki()),!t)throw X.create("no-options");const s={...i,...t};s.releaseOnDeref!==void 0&&delete s.releaseOnDeref;const r=u=>[...u].reduce((d,h)=>Math.imul(31,d)+h.charCodeAt(0)|0,0);if(i.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw X.create("finalization-registry-not-supported",{});const o=""+r(JSON.stringify(s)),a=at.get(o);if(a)return a.incRefCount(i.releaseOnDeref),a;const l=new Xi(o);for(const u of lt.values())l.addComponent(u);const c=new Fc(t,i,o,l);return at.set(o,c),c}function Vc(n=xe){const e=Oe.get(n);if(!e&&n===xe&&Ki())return is();if(!e)throw X.create("no-app",{appName:n});return e}function Wc(){return Array.from(Oe.values())}async function ss(n){let e=!1;const t=n.name;Oe.has(t)?(e=!0,Oe.delete(t)):at.has(t)&&n.decRefCount()<=0&&(at.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(i=>i.delete())),n.isDeleted=!0)}function ye(n,e,t){let i=xc[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ee.warn(o.join(" "));return}ct(new we(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function go(n,e){if(n!==null&&typeof n!="function")throw X.create("invalid-log-argument");zl(n,e)}function yo(n){Gl(n)}/**
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
 */const Uc="firebase-heartbeat-database",$c=1,Bt="firebase-heartbeat-store";let hi=null;function Co(){return hi||(hi=tc(Uc,$c,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Bt)}catch(t){console.warn(t)}}}}).catch(n=>{throw X.create("idb-open",{originalErrorMessage:n.message})})),hi}async function Hc(n){try{const t=(await Co()).transaction(Bt),i=await t.objectStore(Bt).get(vo(n));return await t.done,i}catch(e){if(e instanceof _t)Ee.warn(e.message);else{const t=X.create("idb-get",{originalErrorMessage:e?.message});Ee.warn(t.message)}}}async function er(n,e){try{const i=(await Co()).transaction(Bt,"readwrite");await i.objectStore(Bt).put(e,vo(n)),await i.done}catch(t){if(t instanceof _t)Ee.warn(t.message);else{const i=X.create("idb-set",{originalErrorMessage:t?.message});Ee.warn(i.message)}}}function vo(n){return`${n.name}!${n.options.appId}`}/**
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
 */const jc=1024,Gc=30;class zc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Yc(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=tr();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Gc){const s=Qc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ee.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=tr(),{heartbeatsToSend:t,unsentEntries:i}=qc(this._heartbeatsCache.heartbeats),s=pn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ee.warn(e),""}}}function tr(){return new Date().toISOString().substring(0,10)}function qc(n,e=jc){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),nr(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),nr(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Yc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Rl()?Pl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Hc(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return er(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return er(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function nr(n){return pn(JSON.stringify({version:2,heartbeats:n})).length}function Qc(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Kc(n){ct(new we("platform-logger",e=>new sc(e),"PRIVATE")),ct(new we("heartbeat",e=>new zc(e),"PRIVATE")),ye(yn,Si,n),ye(yn,Si,"esm2020"),ye("fire-js","")}Kc("");const Jc=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:_t,SDK_VERSION:ns,_DEFAULT_ENTRY_NAME:xe,_addComponent:Ft,_addOrOverwriteComponent:ho,_apps:Oe,_clearComponents:Mc,_components:lt,_getProvider:fo,_isFirebaseApp:ts,_isFirebaseServerApp:mo,_isFirebaseServerAppSettings:po,_registerComponent:ct,_removeServiceInstance:Oc,_serverApps:at,deleteApp:ss,getApp:Vc,getApps:Wc,initializeApp:is,initializeServerApp:Bc,onLog:go,registerVersion:ye,setLogLevel:yo},Symbol.toStringTag,{value:"Module"}));/**
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
 */class Xc{constructor(e,t){this._delegate=e,this.firebase=t,Ft(e,new we("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),ss(this._delegate)))}_getService(e,t=xe){this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&i.getComponent()?.instantiationMode==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:t})}_removeServiceInstance(e,t=xe){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){Ft(this._delegate,e)}_addOrOverwriteComponent(e){ho(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
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
 */const Zc={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},ir=new Ln("app-compat","Firebase",Zc);/**
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
 */function eu(n){const e={},t={__esModule:!0,initializeApp:r,app:s,registerVersion:ye,setLogLevel:yo,onLog:go,apps:null,SDK_VERSION:ns,INTERNAL:{registerComponent:a,removeApp:i,useAsService:l,modularAPIs:Jc}};t.default=t,Object.defineProperty(t,"apps",{get:o});function i(c){delete e[c]}function s(c){if(c=c||xe,!Z(e,c))throw ir.create("no-app",{appName:c});return e[c]}s.App=n;function r(c,u={}){const d=is(c,u);if(Z(e,d.name))return e[d.name];const h=new n(d,t);return e[d.name]=h,h}function o(){return Object.keys(e).map(c=>e[c])}function a(c){const u=c.name,d=u.replace("-compat","");if(ct(c)&&c.type==="PUBLIC"){const h=(m=s())=>{if(typeof m[d]!="function")throw ir.create("invalid-app-argument",{appName:u});return m[d]()};c.serviceProps!==void 0&&Mt(h,c.serviceProps),t[d]=h,n.prototype[d]=function(...m){return this._getService.bind(this,u).apply(this,c.multipleInstances?m:[])}}return c.type==="PUBLIC"?t[d]:null}function l(c,u){return u==="serverAuth"?null:u}return t}/**
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
 */function wo(){const n=eu(Xc);n.INTERNAL={...n.INTERNAL,createFirebaseNamespace:wo,extendNamespace:e,createSubscribe:Ll,ErrorFactory:Ln,deepExtend:Mt};function e(t){Mt(n,t)}return n}const tu=wo();/**
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
 */const sr=new Bn("@firebase/app-compat"),nu="@firebase/app-compat",iu="0.5.4";/**
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
 */function su(n){ye(nu,iu,n)}/**
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
 */try{const n=so();if(n.firebase!==void 0){sr.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=n.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&sr.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const Vt=tu;su();var ru="firebase",ou="12.4.0";/**
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
 */Vt.registerVersion(ru,ou,"app-compat");var rr={};const or="@firebase/database",ar="1.1.0";/**
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
 */let Eo="";function bo(n){Eo=n}/**
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
 */class au{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Lt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class lu{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Z(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const So=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new au(e)}}catch{}return new lu},je=So("localStorage"),Ii=So("sessionStorage");/**
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
 */const st=new Bn("@firebase/database"),Io=(function(){let n=1;return function(){return n++}})(),To=function(n){const e=Vl(n),t=new Ml;t.update(e);const i=t.digest();return Qi.encodeByteArray(i)},Jt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Jt.apply(null,i):typeof i=="object"?e+=x(i):e+=i,e+=" "}return e};let ze=null,lr=!0;const Ro=function(n,e){p(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(st.logLevel=I.VERBOSE,ze=st.log.bind(st),e&&Ii.set("logging_enabled",!0)):typeof n=="function"?ze=n:(ze=null,Ii.remove("logging_enabled"))},V=function(...n){if(lr===!0&&(lr=!1,ze===null&&Ii.get("logging_enabled")===!0&&Ro(!0)),ze){const e=Jt.apply(null,n);ze(e)}},Xt=function(n){return function(...e){V(n,...e)}},Ti=function(...n){const e="FIREBASE INTERNAL ERROR: "+Jt(...n);st.error(e)},he=function(...n){const e=`FIREBASE FATAL ERROR: ${Jt(...n)}`;throw st.error(e),new Error(e)},H=function(...n){const e="FIREBASE WARNING: "+Jt(...n);st.warn(e)},cu=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&H("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Vn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},uu=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Me="[MIN_NAME]",be="[MAX_NAME]",Xe=function(n,e){if(n===e)return 0;if(n===Me||e===be)return-1;if(e===Me||n===be)return 1;{const t=cr(n),i=cr(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},du=function(n,e){return n===e?0:n<e?-1:1},wt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+x(e))},rs=function(n){if(typeof n!="object"||n===null)return x(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=x(e[i]),t+=":",t+=rs(n[e[i]]);return t+="}",t},Po=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function U(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const ko=function(n){p(!Vn(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let d="";for(l=0;l<64;l+=8){let h=parseInt(u.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},hu=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},fu=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function pu(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const mu=new RegExp("^-?(0*)\\d{1,10}$"),_u=-2147483648,gu=2147483647,cr=function(n){if(mu.test(n)){const e=Number(n);if(e>=_u&&e<=gu)return e}return null},gt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw H("Exception was thrown by user callback.",t),e},Math.floor(0))}},yu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Rt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Cu{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,mo(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){H(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class vu{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(V("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',H(e)}}class rt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}rt.OWNER="owner";/**
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
 */const os="5",Ao="v",No="s",Do="r",xo="f",Oo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Mo="ls",Lo="p",Ri="ac",Fo="websocket",Bo="long_polling";/**
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
 */class Vo{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=je.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&je.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function wu(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Wo(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===Fo)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Bo)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);wu(n)&&(t.ns=n.namespace);const s=[];return U(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class Eu{constructor(){this.counters_={}}incrementCounter(e,t=1){Z(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return hl(this.counters_)}}/**
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
 */const fi={},pi={};function as(n){const e=n.toString();return fi[e]||(fi[e]=new Eu),fi[e]}function bu(n,e){const t=n.toString();return pi[t]||(pi[t]=e()),pi[t]}/**
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
 */class Su{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&gt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const ur="start",Iu="close",Tu="pLPCommand",Ru="pRTLPCB",Uo="id",$o="pw",Ho="ser",Pu="cb",ku="seg",Au="ts",Nu="d",Du="dframe",jo=1870,Go=30,xu=jo-Go,Ou=25e3,Mu=3e4;class Se{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Xt(e),this.stats_=as(t),this.urlFn=l=>(this.appCheckToken&&(l[Ri]=this.appCheckToken),Wo(t,Bo,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Su(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Mu)),uu(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ls((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ur)this.id=a,this.password=l;else if(o===Iu)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[ur]="t",i[Ho]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Pu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Ao]=os,this.transportSessionId&&(i[No]=this.transportSessionId),this.lastSessionId&&(i[Mo]=this.lastSessionId),this.applicationId&&(i[Lo]=this.applicationId),this.appCheckToken&&(i[Ri]=this.appCheckToken),typeof location<"u"&&location.hostname&&Oo.test(location.hostname)&&(i[Do]=xo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Se.forceAllow_=!0}static forceDisallow(){Se.forceDisallow_=!0}static isAvailable(){return Se.forceAllow_?!0:!Se.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!hu()&&!fu()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=io(t),s=Po(i,xu);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Du]="t",i[Uo]=e,i[$o]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=x(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ls{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Io(),window[Tu+this.uniqueCallbackIdentifier]=e,window[Ru+this.uniqueCallbackIdentifier]=t,this.myIFrame=ls.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){V("frame writing exception"),a.stack&&V(a.stack),V(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||V("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Uo]=this.myID,e[$o]=this.myPW,e[Ho]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Go+i.length<=jo;){const o=this.pendingSegs.shift();i=i+"&"+ku+s+"="+o.seg+"&"+Au+s+"="+o.ts+"&"+Nu+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Ou)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{V("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Lu=16384,Fu=45e3;let Cn=null;typeof MozWebSocket<"u"?Cn=MozWebSocket:typeof WebSocket<"u"&&(Cn=WebSocket);class ne{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Xt(this.connId),this.stats_=as(t),this.connURL=ne.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Ao]=os,typeof location<"u"&&location.hostname&&Oo.test(location.hostname)&&(o[Do]=xo),t&&(o[No]=t),i&&(o[Mo]=i),s&&(o[Ri]=s),r&&(o[Lo]=r),Wo(e,Fo,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,je.set("previous_websocket_failure",!0);try{let i;Tl(),this.mySock=new Cn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ne.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Cn!==null&&!ne.forceDisallow_}static previouslyFailed(){return je.isInMemoryStorage||je.get("previous_websocket_failure")===!0}markConnectionHealthy(){je.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Lt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Po(t,Lu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Fu))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ne.responsesRequiredToBeHealthy=2;ne.healthyTimeout=3e4;/**
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
 */class ut{static get ALL_TRANSPORTS(){return[Se,ne]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ne&&ne.isAvailable();let i=t&&!ne.previouslyFailed();if(e.webSocketOnly&&(t||H("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ne];else{const s=this.transports_=[];for(const r of ut.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ut.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ut.globalTransportInitialized_=!1;/**
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
 */const Bu=6e4,Vu=5e3,Wu=10*1024,Uu=100*1024,mi="t",dr="d",$u="s",hr="r",Hu="e",fr="o",pr="a",mr="n",_r="p",ju="h";class Gu{constructor(e,t,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Xt("c:"+this.id+":"),this.transportManager_=new ut(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Rt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Uu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Wu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(mi in e){const t=e[mi];t===pr?this.upgradeIfSecondaryHealthy_():t===hr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===fr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=wt("t",e),i=wt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:_r,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:pr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:mr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=wt("t",e),i=wt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=wt(mi,e);if(dr in e){const i=e[dr];if(t===ju){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===mr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===$u?this.onConnectionShutdown_(i):t===hr?this.onReset_(i):t===Hu?Ti("Server Error: "+i):t===fr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ti("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),os!==i&&H("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Rt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Bu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Rt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Vu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:_r,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(je.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class zo{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class qo{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class vn extends qo{static getInstance(){return new vn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!ro()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const gr=32,yr=768;class S{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function b(){return new S("")}function C(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Le(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new S(n.pieces_,e)}function cs(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function zu(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Wt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Yo(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new S(e,0)}function A(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof S)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new S(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function j(n,e){const t=C(n),i=C(e);if(t===null)return e;if(t===i)return j(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function qu(n,e){const t=Wt(n,0),i=Wt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Xe(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function us(n,e){if(Le(n)!==Le(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function ie(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Le(n)>Le(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Yu{constructor(e,t){this.errorPrefix_=t,this.parts_=Wt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Fn(this.parts_[i]);Qo(this)}}function Qu(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Fn(e),Qo(n)}function Ku(n){const e=n.parts_.pop();n.byteLength_-=Fn(e),n.parts_.length>0&&(n.byteLength_-=1)}function Qo(n){if(n.byteLength_>yr)throw new Error(n.errorPrefix_+"has a key path longer than "+yr+" bytes ("+n.byteLength_+").");if(n.parts_.length>gr)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+gr+") or object contains a cycle "+He(n))}function He(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class ds extends qo{static getInstance(){return new ds}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Et=1e3,Ju=300*1e3,Cr=30*1e3,Xu=1.3,Zu=3e4,ed="server_kill",vr=3;class Ce extends zo{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ce.nextPersistentConnectionId_++,this.log_=Xt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Et,this.maxReconnectDelay_=Ju,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ds.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&vn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(x(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new q,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ce.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Z(e,"w")){const i=qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();H(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||xl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Cr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Dl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+x(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ti("Unrecognized action received from server: "+x(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Zu&&(this.reconnectDelay_=Et),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Xu)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Ce.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(d){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?V("getToken() completed but was canceled"):(V("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new Gu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,m=>{H(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(ed)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&H(d),l())}}}interrupt(e){V("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){V("Resuming connection for reason: "+e),delete this.interruptReasons_[e],vi(this.interruptReasons_)&&(this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>rs(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new S(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){V("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=vr&&(this.reconnectDelay_=Cr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){V("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=vr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Eo.replace(/\./g,"-")]=1,ro()?e["framework.cordova"]=1:Il()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=vn.getInstance().currentlyOnline();return vi(this.interruptReasons_)&&e}}Ce.nextPersistentConnectionId_=0;Ce.nextConnectionId_=0;/**
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
 */class Wn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new w(Me,e),s=new w(Me,t);return this.compare(i,s)!==0}minPost(){return w.MIN}}/**
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
 */let ln;class Ko extends Wn{static get __EMPTY_NODE(){return ln}static set __EMPTY_NODE(e){ln=e}compare(e,t){return Xe(e.name,t.name)}isDefinedOn(e){throw mt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return w.MIN}maxPost(){return new w(be,ln)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new w(e,ln)}toString(){return".key"}}const de=new Ko;/**
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
 */class cn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class B{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??B.RED,this.left=s??Y.EMPTY_NODE,this.right=r??Y.EMPTY_NODE}copy(e,t,i,s,r){return new B(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Y.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return Y.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,B.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,B.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}B.RED=!0;B.BLACK=!1;class td{copy(e,t,i,s,r){return this}insert(e,t,i){return new B(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Y{constructor(e,t=Y.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Y(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,B.BLACK,null,null))}remove(e){return new Y(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,B.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new cn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new cn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new cn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new cn(this.root_,null,this.comparator_,!0,e)}}Y.EMPTY_NODE=new td;/**
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
 */function nd(n,e){return Xe(n.name,e.name)}function hs(n,e){return Xe(n,e)}/**
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
 */let Pi;function id(n){Pi=n}const Jo=function(n){return typeof n=="number"?"number:"+ko(n):"string:"+n},Xo=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Z(e,".sv"),"Priority must be a string or number.")}else p(n===Pi||n.isEmpty(),"priority of unexpected type.");p(n===Pi||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let wr;class O{static set __childrenNodeConstructor(e){wr=e}static get __childrenNodeConstructor(){return wr}constructor(e,t=O.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Xo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new O(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:C(e)===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:O.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=C(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Le(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,O.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Jo(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=ko(this.value_):e+=this.value_,this.lazyHash_=To(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===O.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof O.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=O.VALUE_TYPE_ORDER.indexOf(t),r=O.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}O.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Zo,ea;function sd(n){Zo=n}function rd(n){ea=n}class od extends Wn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Xe(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return w.MIN}maxPost(){return new w(be,new O("[PRIORITY-POST]",ea))}makePost(e,t){const i=Zo(e);return new w(t,new O("[PRIORITY-POST]",i))}toString(){return".priority"}}const P=new od;/**
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
 */const ad=Math.log(2);class ld{constructor(e){const t=r=>parseInt(Math.log(r)/ad,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const wn=function(n,e,t,i){n.sort(e);const s=function(l,c){const u=c-l;let d,h;if(u===0)return null;if(u===1)return d=n[l],h=t?t(d):d,new B(h,d.node,B.BLACK,null,null);{const m=parseInt(u/2,10)+l,_=s(l,m),E=s(m+1,c);return d=n[m],h=t?t(d):d,new B(h,d.node,B.BLACK,_,E)}},r=function(l){let c=null,u=null,d=n.length;const h=function(_,E){const D=d-_,pe=d;d-=_;const me=s(D+1,pe),Ue=n[D],ai=t?t(Ue):Ue;m(new B(ai,Ue.node,E,null,me))},m=function(_){c?(c.left=_,c=_):(u=_,c=_)};for(let _=0;_<l.count;++_){const E=l.nextBitIsOne(),D=Math.pow(2,l.count-(_+1));E?h(D,B.BLACK):(h(D,B.BLACK),h(D,B.RED))}return u},o=new ld(n.length),a=r(o);return new Y(i||e,a)};/**
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
 */let _i;const nt={};class _e{static get Default(){return p(nt&&P,"ChildrenNode.ts has not been loaded"),_i=_i||new _e({".priority":nt},{".priority":P}),_i}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=qe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Y?t:null}hasIndex(e){return Z(this.indexSet_,e.toString())}addIndex(e,t){p(e!==de,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(w.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=wn(i,e.getCompare()):a=nt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new _e(u,c)}addToIndexes(e,t){const i=_n(this.indexes_,(s,r)=>{const o=qe(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===nt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(w.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),wn(a,o.getCompare())}else return nt;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new w(e.name,a))),l.insert(e,e.node)}});return new _e(i,this.indexSet_)}removeFromIndexes(e,t){const i=_n(this.indexes_,s=>{if(s===nt)return s;{const r=t.get(e.name);return r?s.remove(new w(e.name,r)):s}});return new _e(i,this.indexSet_)}}/**
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
 */let bt;class g{static get EMPTY_NODE(){return bt||(bt=new g(new Y(hs),null,_e.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Xo(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||bt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?bt:t}}getChild(e){const t=C(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new w(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?bt:this.priorityNode_;return new g(s,o,r)}}updateChild(e,t){const i=C(e);if(i===null)return t;{p(C(e)!==".priority"||Le(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(T(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(P,(o,a)=>{t[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Jo(this.getPriority().val())+":"),this.forEachChild(P,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":To(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new w(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new w(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new w(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Zt?-1:0}withIndex(e){if(e===de||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===de||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(P),s=t.getIterator(P);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===de?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class cd extends g{constructor(){super(new Y(hs),g.EMPTY_NODE,_e.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const Zt=new cd;Object.defineProperties(w,{MIN:{value:new w(Me,g.EMPTY_NODE)},MAX:{value:new w(be,Zt)}});Ko.__EMPTY_NODE=g.EMPTY_NODE;O.__childrenNodeConstructor=g;id(Zt);rd(Zt);/**
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
 */const ud=!0;function N(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new O(t,N(e))}if(!(n instanceof Array)&&ud){const t=[];let i=!1;if(U(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=N(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new w(o,l)))}}),t.length===0)return g.EMPTY_NODE;const r=wn(t,nd,o=>o.name,hs);if(i){const o=wn(t,P.getCompare());return new g(r,N(e),new _e({".priority":o},{".priority":P}))}else return new g(r,N(e),_e.Default)}else{let t=g.EMPTY_NODE;return U(n,(i,s)=>{if(Z(n,i)&&i.substring(0,1)!=="."){const r=N(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(N(e))}}sd(N);/**
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
 */class fs extends Wn{constructor(e){super(),this.indexPath_=e,p(!v(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Xe(e.name,t.name):r}makePost(e,t){const i=N(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new w(t,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,Zt);return new w(be,e)}toString(){return Wt(this.indexPath_,0).join("/")}}/**
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
 */class dd extends Wn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Xe(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return w.MIN}maxPost(){return w.MAX}makePost(e,t){const i=N(e);return new w(t,i)}toString(){return".value"}}const ps=new dd;/**
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
 */function ta(n){return{type:"value",snapshotNode:n}}function dt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ut(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function $t(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function hd(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class ms{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Ut(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(dt(t,i)):o.trackChildChange($t(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(P,(s,r)=>{t.hasChild(s)||i.trackChildChange(Ut(s,r))}),t.isLeafNode()||t.forEachChild(P,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange($t(s,r,o))}else i.trackChildChange(dt(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class Ht{constructor(e){this.indexedFilter_=new ms(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ht.getStartPost_(e),this.endPost_=Ht.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new w(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(P,(o,a)=>{r.matches(new w(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class fd{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ht(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new w(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,m)=>d(m,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new w(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const m=h==null?1:o(h,l);if(u&&!i.isEmpty()&&m>=0)return r?.trackChildChange($t(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(Ut(t,d));const E=a.updateImmediateChild(t,g.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(dt(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ut(c.name,c.node)),r.trackChildChange(dt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
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
 */class Un{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=P}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Me}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:be}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===P}copy(){const e=new Un;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function pd(n){return n.loadsAllData()?new ms(n.getIndex()):n.hasLimit()?new fd(n):new Ht(n)}function md(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function _d(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function ki(n,e,t){const i=n.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,t!=null?(i.startNameSet_=!0,i.indexStartName_=t):(i.startNameSet_=!1,i.indexStartName_=""),i}function gd(n,e,t){let i;return n.index_===de||t?i=ki(n,e,t):i=ki(n,e,be),i.startAfterSet_=!0,i}function Ai(n,e,t){const i=n.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,t!==void 0?(i.endNameSet_=!0,i.indexEndName_=t):(i.endNameSet_=!1,i.indexEndName_=""),i}function yd(n,e,t){let i;return n.index_===de||t?i=Ai(n,e,t):i=Ai(n,e,Me),i.endBeforeSet_=!0,i}function $n(n,e){const t=n.copy();return t.index_=e,t}function Er(n){const e={};if(n.isDefault())return e;let t;if(n.index_===P?t="$priority":n.index_===ps?t="$value":n.index_===de?t="$key":(p(n.index_ instanceof fs,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=x(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=x(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+x(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=x(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+x(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function br(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==P&&(e.i=n.index_.toString()),e}/**
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
 */class En extends zo{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Xt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=En.getListenId_(e,i),a={};this.listens_[o]=a;const l=Er(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let d=u;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(r,d,!1,i),qe(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=En.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Er(e._queryParams),i=e._path.toString(),s=new q;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ol(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Lt(a.responseText)}catch{H("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&H("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class Cd{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function bn(){return{value:null,children:new Map}}function yt(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=C(e);n.children.has(i)||n.children.set(i,bn());const s=n.children.get(i);e=T(e),yt(s,e,t)}}function Ni(n,e){if(v(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(P,(i,s)=>{yt(n,new S(i),s)}),Ni(n,e)}}else if(n.children.size>0){const t=C(e);return e=T(e),n.children.has(t)&&Ni(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Di(n,e,t){n.value!==null?t(e,n.value):vd(n,(i,s)=>{const r=new S(e.toString()+"/"+i);Di(s,r,t)})}function vd(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class wd{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const Sr=10*1e3,Ed=30*1e3,bd=300*1e3;class Sd{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new wd(e);const i=Sr+(Ed-Sr)*Math.random();Rt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;U(e,(s,r)=>{r>0&&Z(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Rt(this.reportStats_.bind(this),Math.floor(Math.random()*2*bd))}}/**
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
 */var le;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(le||(le={}));function _s(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function gs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ys(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class Sn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=le.ACK_USER_WRITE,this.source=_s()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new S(e));return new Sn(b(),t,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new Sn(T(this.path),this.affectedTree,this.revert)}}/**
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
 */class jt{constructor(e,t){this.source=e,this.path=t,this.type=le.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new jt(this.source,b()):new jt(this.source,T(this.path))}}/**
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
 */class Ye{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=le.OVERWRITE}operationForChild(e){return v(this.path)?new Ye(this.source,b(),this.snap.getImmediateChild(e)):new Ye(this.source,T(this.path),this.snap)}}/**
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
 */class ht{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=le.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new S(e));return t.isEmpty()?null:t.value?new Ye(this.source,b(),t.value):new ht(this.source,b(),t)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ht(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Fe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=C(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class Id{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Td(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(hd(o.childName,o.snapshotNode))}),St(n,s,"child_removed",e,i,t),St(n,s,"child_added",e,i,t),St(n,s,"child_moved",r,i,t),St(n,s,"child_changed",e,i,t),St(n,s,"value",e,i,t),s}function St(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Pd(n,a,l)),o.forEach(a=>{const l=Rd(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Rd(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Pd(n,e,t){if(e.childName==null||t.childName==null)throw mt("Should only compare child_ events.");const i=new w(e.childName,e.snapshotNode),s=new w(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function Hn(n,e){return{eventCache:n,serverCache:e}}function Pt(n,e,t,i){return Hn(new Fe(e,t,i),n.serverCache)}function na(n,e,t,i){return Hn(n.eventCache,new Fe(e,t,i))}function In(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Qe(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let gi;const kd=()=>(gi||(gi=new Y(du)),gi);class R{static fromObject(e){let t=new R(null);return U(e,(i,s)=>{t=t.set(new S(i),s)}),t}constructor(e,t=kd()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:b(),value:this.value};if(v(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:A(new S(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=C(e),i=this.children.get(t);return i!==null?i.subtree(T(e)):new R(null)}}set(e,t){if(v(e))return new R(t,this.children);{const i=C(e),r=(this.children.get(i)||new R(null)).set(T(e),t),o=this.children.insert(i,r);return new R(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new R(null):new R(null,this.children);{const t=C(e),i=this.children.get(t);if(i){const s=i.remove(T(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new R(null):new R(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=C(e),i=this.children.get(t);return i?i.get(T(e)):null}}setTree(e,t){if(v(e))return t;{const i=C(e),r=(this.children.get(i)||new R(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new R(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(A(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,b(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(v(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(T(e),A(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,b(),t)}foreachOnPath_(e,t,i){if(v(e))return this;{this.value&&i(t,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(T(e),A(t,s),i):new R(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(A(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class ce{constructor(e){this.writeTree_=e}static empty(){return new ce(new R(null))}}function kt(n,e,t){if(v(e))return new ce(new R(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=j(s,e);return r=r.updateChild(o,t),new ce(n.writeTree_.set(s,r))}else{const s=new R(t),r=n.writeTree_.setTree(e,s);return new ce(r)}}}function xi(n,e,t){let i=n;return U(t,(s,r)=>{i=kt(i,A(e,s),r)}),i}function Ir(n,e){if(v(e))return ce.empty();{const t=n.writeTree_.setTree(e,new R(null));return new ce(t)}}function Oi(n,e){return Ze(n,e)!=null}function Ze(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(j(t.path,e)):null}function Tr(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(P,(i,s)=>{e.push(new w(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new w(i,s.value))}),e}function Pe(n,e){if(v(e))return n;{const t=Ze(n,e);return t!=null?new ce(new R(t)):new ce(n.writeTree_.subtree(e))}}function Mi(n){return n.writeTree_.isEmpty()}function ft(n,e){return ia(b(),n.writeTree_,e)}function ia(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=ia(A(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(A(n,".priority"),i)),t}}/**
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
 */function jn(n,e){return aa(e,n)}function Ad(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=kt(n.visibleWrites,e,t)),n.lastWriteId=i}function Nd(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=xi(n.visibleWrites,e,t),n.lastWriteId=i}function Dd(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function xd(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Od(a,i.path)?s=!1:ie(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Md(n),!0;if(i.snap)n.visibleWrites=Ir(n.visibleWrites,i.path);else{const a=i.children;U(a,l=>{n.visibleWrites=Ir(n.visibleWrites,A(i.path,l))})}return!0}else return!1}function Od(n,e){if(n.snap)return ie(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ie(A(n.path,t),e))return!0;return!1}function Md(n){n.visibleWrites=sa(n.allWrites,Ld,b()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Ld(n){return n.visible}function sa(n,e,t){let i=ce.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)ie(t,o)?(a=j(t,o),i=kt(i,a,r.snap)):ie(o,t)&&(a=j(o,t),i=kt(i,b(),r.snap.getChild(a)));else if(r.children){if(ie(t,o))a=j(t,o),i=xi(i,a,r.children);else if(ie(o,t))if(a=j(o,t),v(a))i=xi(i,b(),r.children);else{const l=qe(r.children,C(a));if(l){const c=l.getChild(T(a));i=kt(i,b(),c)}}}else throw mt("WriteRecord should have .snap or .children")}}return i}function ra(n,e,t,i,s){if(!i&&!s){const r=Ze(n.visibleWrites,e);if(r!=null)return r;{const o=Pe(n.visibleWrites,e);if(Mi(o))return t;if(t==null&&!Oi(o,b()))return null;{const a=t||g.EMPTY_NODE;return ft(o,a)}}}else{const r=Pe(n.visibleWrites,e);if(!s&&Mi(r))return t;if(!s&&t==null&&!Oi(r,b()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ie(c.path,e)||ie(e,c.path))},a=sa(n.allWrites,o,e),l=t||g.EMPTY_NODE;return ft(a,l)}}}function Fd(n,e,t){let i=g.EMPTY_NODE;const s=Ze(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(P,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Pe(n.visibleWrites,e);return t.forEachChild(P,(o,a)=>{const l=ft(Pe(r,new S(o)),a);i=i.updateImmediateChild(o,l)}),Tr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Pe(n.visibleWrites,e);return Tr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Bd(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(Oi(n.visibleWrites,r))return null;{const o=Pe(n.visibleWrites,r);return Mi(o)?s.getChild(t):ft(o,s.getChild(t))}}function Vd(n,e,t,i){const s=A(e,t),r=Ze(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Pe(n.visibleWrites,s);return ft(o,i.getNode().getImmediateChild(t))}else return null}function Wd(n,e){return Ze(n.visibleWrites,e)}function Ud(n,e,t,i,s,r,o){let a;const l=Pe(n.visibleWrites,e),c=Ze(l,b());if(c!=null)a=c;else if(t!=null)a=ft(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let m=h.getNext();for(;m&&u.length<s;)d(m,i)!==0&&u.push(m),m=h.getNext();return u}else return[]}function $d(){return{visibleWrites:ce.empty(),allWrites:[],lastWriteId:-1}}function Tn(n,e,t,i){return ra(n.writeTree,n.treePath,e,t,i)}function Cs(n,e){return Fd(n.writeTree,n.treePath,e)}function Rr(n,e,t,i){return Bd(n.writeTree,n.treePath,e,t,i)}function Rn(n,e){return Wd(n.writeTree,A(n.treePath,e))}function Hd(n,e,t,i,s,r){return Ud(n.writeTree,n.treePath,e,t,i,s,r)}function vs(n,e,t){return Vd(n.writeTree,n.treePath,e,t)}function oa(n,e){return aa(A(n.treePath,e),n.writeTree)}function aa(n,e){return{treePath:n,writeTree:e}}/**
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
 */class jd{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,$t(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ut(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,dt(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,$t(i,e.snapshotNode,s.oldSnap));else throw mt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class Gd{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const la=new Gd;class ws{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Fe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return vs(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Qe(this.viewCache_),r=Hd(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function zd(n){return{filter:n}}function qd(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Yd(n,e,t,i,s){const r=new jd;let o,a;if(t.type===le.OVERWRITE){const c=t;c.source.fromUser?o=Li(n,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=Pn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===le.MERGE){const c=t;c.source.fromUser?o=Kd(n,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Fi(n,e,c.path,c.children,i,s,a,r))}else if(t.type===le.ACK_USER_WRITE){const c=t;c.revert?o=Zd(n,e,c.path,i,s,r):o=Jd(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===le.LISTEN_COMPLETE)o=Xd(n,e,t.path,i,r);else throw mt("Unknown operation type: "+t.type);const l=r.getChanges();return Qd(e,o,l),{viewCache:o,changes:l}}function Qd(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=In(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(ta(In(e)))}}function ca(n,e,t,i,s,r){const o=e.eventCache;if(Rn(i,t)!=null)return e;{let a,l;if(v(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Qe(e),u=c instanceof g?c:g.EMPTY_NODE,d=Cs(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const c=Tn(i,Qe(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(t);if(c===".priority"){p(Le(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const d=Rr(i,t,u,l);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=T(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Rr(i,t,o.getNode(),l);h!=null?d=o.getNode().getImmediateChild(c).updateChild(u,h):d=o.getNode().getImmediateChild(c)}else d=vs(i,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,u,s,r):a=o.getNode()}}return Pt(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function Pn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const m=l.getNode().updateChild(t,i);c=u.updateFullNode(l.getNode(),m,null)}else{const m=C(t);if(!l.isCompleteForPath(t)&&Le(t)>1)return e;const _=T(t),D=l.getNode().getImmediateChild(m).updateChild(_,i);m===".priority"?c=u.updatePriority(l.getNode(),D):c=u.updateChild(l.getNode(),m,D,_,la,null)}const d=na(e,c,l.isFullyInitialized()||v(t),u.filtersNodes()),h=new ws(s,d,r);return ca(n,d,t,s,h,a)}function Li(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const u=new ws(s,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Pt(e,c,!0,n.filter.filtersNodes());else{const d=C(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=Pt(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=T(t),m=a.getNode().getImmediateChild(d);let _;if(v(h))_=i;else{const E=u.getCompleteChild(d);E!=null?cs(h)===".priority"&&E.getChild(Yo(h)).isEmpty()?_=E:_=E.updateChild(h,i):_=g.EMPTY_NODE}if(m.equals(_))l=e;else{const E=n.filter.updateChild(a.getNode(),d,_,h,u,o);l=Pt(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Pr(n,e){return n.eventCache.isCompleteForChild(e)}function Kd(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=A(t,l);Pr(e,C(u))&&(a=Li(n,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=A(t,l);Pr(e,C(u))||(a=Li(n,a,u,c,s,r,o))}),a}function kr(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Fi(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=i:c=new R(null).setTree(t,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const m=e.serverCache.getNode().getImmediateChild(d),_=kr(n,m,h);l=Pn(n,l,new S(d),_,s,r,o,a)}}),c.children.inorderTraversal((d,h)=>{const m=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!m){const _=e.serverCache.getNode().getImmediateChild(d),E=kr(n,_,h);l=Pn(n,l,new S(d),E,s,r,o,a)}}),l}function Jd(n,e,t,i,s,r,o){if(Rn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Pn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(v(t)){let c=new R(null);return l.getNode().forEachChild(de,(u,d)=>{c=c.set(new S(u),d)}),Fi(n,e,t,c,s,r,a,o)}else return e}else{let c=new R(null);return i.foreach((u,d)=>{const h=A(t,u);l.isCompleteForPath(h)&&(c=c.set(u,l.getNode().getChild(h)))}),Fi(n,e,t,c,s,r,a,o)}}function Xd(n,e,t,i,s){const r=e.serverCache,o=na(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return ca(n,o,t,i,la,s)}function Zd(n,e,t,i,s,r){let o;if(Rn(i,t)!=null)return e;{const a=new ws(i,e,s),l=e.eventCache.getNode();let c;if(v(t)||C(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Tn(i,Qe(e));else{const d=e.serverCache.getNode();p(d instanceof g,"serverChildren would be complete if leaf node"),u=Cs(i,d)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=C(t);let d=vs(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=l.getImmediateChild(u)),d!=null?c=n.filter.updateChild(l,u,d,T(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,g.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Tn(i,Qe(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Rn(i,b())!=null,Pt(e,c,o,n.filter.filtersNodes())}}/**
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
 */class eh{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new ms(i.getIndex()),r=pd(i);this.processor_=zd(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),u=new Fe(l,o.isFullyInitialized(),s.filtersNodes()),d=new Fe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Hn(d,u),this.eventGenerator_=new Id(this.query_)}get query(){return this.query_}}function th(n){return n.viewCache_.serverCache.getNode()}function nh(n){return In(n.viewCache_)}function ih(n,e){const t=Qe(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(C(e)).isEmpty())?t.getChild(e):null}function Ar(n){return n.eventRegistrations_.length===0}function sh(n,e){n.eventRegistrations_.push(e)}function Nr(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Dr(n,e,t,i){e.type===le.MERGE&&e.source.queryId!==null&&(p(Qe(n.viewCache_),"We should always have a full cache before handling merges"),p(In(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Yd(n.processor_,s,e,t,i);return qd(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,ua(n,r.changes,r.viewCache.eventCache.getNode(),null)}function rh(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(P,(r,o)=>{i.push(dt(r,o))}),t.isFullyInitialized()&&i.push(ta(t.getNode())),ua(n,i,t.getNode(),e)}function ua(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Td(n.eventGenerator_,e,t,s)}/**
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
 */let kn;class da{constructor(){this.views=new Map}}function oh(n){p(!kn,"__referenceConstructor has already been defined"),kn=n}function ah(){return p(kn,"Reference.ts has not been loaded"),kn}function lh(n){return n.views.size===0}function Es(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Dr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Dr(o,e,t,i));return r}}function ha(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Tn(t,s?i:null),l=!1;a?l=!0:i instanceof g?(a=Cs(t,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=Hn(new Fe(a,l,!1),new Fe(i,s,!1));return new eh(e,c)}return o}function ch(n,e,t,i,s,r){const o=ha(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),sh(o,t),rh(o,t)}function uh(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Be(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Nr(c,t,i)),Ar(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Nr(l,t,i)),Ar(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Be(n)&&r.push(new(ah())(e._repo,e._path)),{removed:r,events:o}}function fa(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ke(n,e){let t=null;for(const i of n.views.values())t=t||ih(i,e);return t}function pa(n,e){if(e._queryParams.loadsAllData())return Gn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function ma(n,e){return pa(n,e)!=null}function Be(n){return Gn(n)!=null}function Gn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let An;function dh(n){p(!An,"__referenceConstructor has already been defined"),An=n}function hh(){return p(An,"Reference.ts has not been loaded"),An}let fh=1;class xr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new R(null),this.pendingWriteTree_=$d(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function bs(n,e,t,i,s){return Ad(n.pendingWriteTree_,e,t,i,s),s?Ct(n,new Ye(_s(),e,t)):[]}function ph(n,e,t,i){Nd(n.pendingWriteTree_,e,t,i);const s=R.fromObject(t);return Ct(n,new ht(_s(),e,s))}function Ie(n,e,t=!1){const i=Dd(n.pendingWriteTree_,e);if(xd(n.pendingWriteTree_,e)){let r=new R(null);return i.snap!=null?r=r.set(b(),!0):U(i.children,o=>{r=r.set(new S(o),!0)}),Ct(n,new Sn(i.path,r,t))}else return[]}function en(n,e,t){return Ct(n,new Ye(gs(),e,t))}function mh(n,e,t){const i=R.fromObject(t);return Ct(n,new ht(gs(),e,i))}function _h(n,e){return Ct(n,new jt(gs(),e))}function gh(n,e,t){const i=Ss(n,t);if(i){const s=Is(i),r=s.path,o=s.queryId,a=j(r,e),l=new jt(ys(o),a);return Ts(n,r,l)}else return[]}function Nn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ma(o,e))){const l=uh(o,e,t,i);lh(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,m)=>Be(m));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const m=vh(h);for(let _=0;_<m.length;++_){const E=m[_],D=E.query,pe=Ca(n,E);n.listenProvider_.startListening(At(D),Gt(n,D),pe.hashFn,pe.onComplete)}}}!d&&c.length>0&&!i&&(u?n.listenProvider_.stopListening(At(e),null):c.forEach(h=>{const m=n.queryToTagMap.get(qn(h));n.listenProvider_.stopListening(At(h),m)}))}wh(n,c)}return a}function _a(n,e,t,i){const s=Ss(n,i);if(s!=null){const r=Is(s),o=r.path,a=r.queryId,l=j(o,e),c=new Ye(ys(a),l,t);return Ts(n,o,c)}else return[]}function yh(n,e,t,i){const s=Ss(n,i);if(s){const r=Is(s),o=r.path,a=r.queryId,l=j(o,e),c=R.fromObject(t),u=new ht(ys(a),l,c);return Ts(n,o,u)}else return[]}function Bi(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,m)=>{const _=j(h,s);r=r||ke(m,_),o=o||Be(m)});let a=n.syncPointTree_.get(s);a?(o=o||Be(a),r=r||ke(a,b())):(a=new da,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((m,_)=>{const E=ke(_,b());E&&(r=r.updateImmediateChild(m,E))}));const c=ma(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=qn(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const m=Eh();n.queryToTagMap.set(h,m),n.tagToQueryMap.set(m,h)}const u=jn(n.pendingWriteTree_,s);let d=ch(a,e,t,u,r,l);if(!c&&!o&&!i){const h=pa(a,e);d=d.concat(bh(n,e,h))}return d}function zn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=j(o,e),c=ke(a,l);if(c)return c});return ra(s,e,r,t,!0)}function Ch(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const d=j(c,t);i=i||ke(u,d)});let s=n.syncPointTree_.get(t);s?i=i||ke(s,b()):(s=new da,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Fe(i,!0,!1):null,a=jn(n.pendingWriteTree_,e._path),l=ha(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return nh(l)}function Ct(n,e){return ga(e,n.syncPointTree_,null,jn(n.pendingWriteTree_,b()))}function ga(n,e,t,i){if(v(n.path))return ya(n,e,t,i);{const s=e.get(b());t==null&&s!=null&&(t=ke(s,b()));let r=[];const o=C(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=oa(i,o);r=r.concat(ga(a,l,c,u))}return s&&(r=r.concat(Es(s,n,i,t))),r}}function ya(n,e,t,i){const s=e.get(b());t==null&&s!=null&&(t=ke(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=oa(i,o),u=n.operationForChild(o);u&&(r=r.concat(ya(u,a,l,c)))}),s&&(r=r.concat(Es(s,n,i,t))),r}function Ca(n,e){const t=e.query,i=Gt(n,t);return{hashFn:()=>(th(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?gh(n,t._path,i):_h(n,t._path);{const r=pu(s,t);return Nn(n,t,null,r)}}}}function Gt(n,e){const t=qn(e);return n.queryToTagMap.get(t)}function qn(n){return n._path.toString()+"$"+n._queryIdentifier}function Ss(n,e){return n.tagToQueryMap.get(e)}function Is(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new S(n.substr(0,e))}}function Ts(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=jn(n.pendingWriteTree_,e);return Es(i,t,s,null)}function vh(n){return n.fold((e,t,i)=>{if(t&&Be(t))return[Gn(t)];{let s=[];return t&&(s=fa(t)),U(i,(r,o)=>{s=s.concat(o)}),s}})}function At(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(hh())(n._repo,n._path):n}function wh(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=qn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Eh(){return fh++}function bh(n,e,t){const i=e._path,s=Gt(n,e),r=Ca(n,t),o=n.listenProvider_.startListening(At(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!Be(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,d)=>{if(!v(c)&&u&&Be(u))return[Gn(u).query];{let h=[];return u&&(h=h.concat(fa(u).map(m=>m.query))),U(d,(m,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(At(u),Gt(n,u))}}return o}/**
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
 */class Rs{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Rs(t)}node(){return this.node_}}class Ps{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Ps(this.syncTree_,t)}node(){return zn(this.syncTree_,this.path_)}}const Sh=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Or=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Ih(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Th(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Ih=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},Th=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},va=function(n,e,t,i){return As(e,new Ps(t,n),i)},ks=function(n,e,t){return As(n,new Rs(e),t)};function As(n,e,t){const i=n.getPriority().val(),s=Or(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Or(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new O(a,N(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new O(s))),o.forEachChild(P,(a,l)=>{const c=As(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Ns{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Yn(n,e){let t=e instanceof S?e:new S(e),i=n,s=C(t);for(;s!==null;){const r=qe(i.node.children,s)||{children:{},childCount:0};i=new Ns(s,i,r),t=T(t),s=C(t)}return i}function et(n){return n.node.value}function Ds(n,e){n.node.value=e,Vi(n)}function wa(n){return n.node.childCount>0}function Rh(n){return et(n)===void 0&&!wa(n)}function Qn(n,e){U(n.node.children,(t,i)=>{e(new Ns(t,n,i))})}function Ea(n,e,t,i){t&&e(n),Qn(n,s=>{Ea(s,e,!0)})}function Ph(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function tn(n){return new S(n.parent===null?n.name:tn(n.parent)+"/"+n.name)}function Vi(n){n.parent!==null&&kh(n.parent,n.name,n)}function kh(n,e,t){const i=Rh(t),s=Z(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Vi(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Vi(n))}/**
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
 */const Ah=/[\[\].#$\/\u0000-\u001F\u007F]/,Nh=/[\[\].#$\u0000-\u001F\u007F]/,yi=10*1024*1024,Kn=function(n){return typeof n=="string"&&n.length!==0&&!Ah.test(n)},ba=function(n){return typeof n=="string"&&n.length!==0&&!Nh.test(n)},Dh=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ba(n)},zt=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Vn(n)||n&&typeof n=="object"&&Z(n,".sv")},fe=function(n,e,t,i){i&&e===void 0||nn(Q(n,"value"),e,t)},nn=function(n,e,t){const i=t instanceof S?new Yu(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+He(i));if(typeof e=="function")throw new Error(n+"contains a function "+He(i)+" with contents = "+e.toString());if(Vn(e))throw new Error(n+"contains "+e.toString()+" "+He(i));if(typeof e=="string"&&e.length>yi/3&&Fn(e)>yi)throw new Error(n+"contains a string greater than "+yi+" utf8 bytes "+He(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(U(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Kn(o)))throw new Error(n+" contains an invalid key ("+o+") "+He(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Qu(i,o),nn(n,a,i),Ku(i)}),s&&r)throw new Error(n+' contains ".value" child '+He(i)+" in addition to actual children.")}},xh=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Wt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Kn(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(qu);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&ie(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Sa=function(n,e,t,i){const s=Q(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];U(e,(o,a)=>{const l=new S(o);if(nn(s,a,A(t,l)),cs(l)===".priority"&&!zt(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),xh(s,r)},xs=function(n,e,t){if(Vn(e))throw new Error(Q(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!zt(e))throw new Error(Q(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},sn=function(n,e,t,i){if(t!==void 0&&!Kn(t))throw new Error(Q(n,e)+'was an invalid key = "'+t+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},qt=function(n,e,t,i){if(!ba(t))throw new Error(Q(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Oh=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),qt(n,e,t)},se=function(n,e){if(C(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Ia=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Kn(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Dh(t))throw new Error(Q(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class Mh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Jn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!us(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Ta(n,e,t){Jn(n,t),Ra(n,i=>us(i,e))}function ee(n,e,t){Jn(n,t),Ra(n,i=>ie(i,e)||ie(e,i))}function Ra(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Lh(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Lh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();ze&&V("event: "+t.toString()),gt(i)}}}/**
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
 */const Pa="repo_interrupt",Fh=25;class Bh{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Mh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=bn(),this.transactionQueueTree_=new Ns,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Vh(n,e,t){if(n.stats_=as(n.repoInfo_),n.forceRestClient_||yu())n.server_=new En(n.repoInfo_,(i,s,r,o)=>{Mr(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Lr(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{x(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Ce(n.repoInfo_,e,(i,s,r,o)=>{Mr(n,i,s,r,o)},i=>{Lr(n,i)},i=>{Wh(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=bu(n.repoInfo_,()=>new Sd(n.stats_,n.server_)),n.infoData_=new Cd,n.infoSyncTree_=new xr({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=en(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Os(n,"connected",!1),n.serverSyncTree_=new xr({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ee(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function ka(n){const t=n.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function rn(n){return Sh({timestamp:ka(n)})}function Mr(n,e,t,i,s){n.dataUpdateCount++;const r=new S(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=_n(t,c=>N(c));o=yh(n.serverSyncTree_,r,l,s)}else{const l=N(t);o=_a(n.serverSyncTree_,r,l,s)}else if(i){const l=_n(t,c=>N(c));o=mh(n.serverSyncTree_,r,l)}else{const l=N(t);o=en(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=pt(n,r)),ee(n.eventQueue_,a,o)}function Lr(n,e){Os(n,"connected",e),e===!1&&Hh(n)}function Wh(n,e){U(e,(t,i)=>{Os(n,t,i)})}function Os(n,e,t){const i=new S("/.info/"+e),s=N(t);n.infoData_.updateSnapshot(i,s);const r=en(n.infoSyncTree_,i,s);ee(n.eventQueue_,i,r)}function Xn(n){return n.nextWriteId_++}function Uh(n,e,t){const i=Ch(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=N(s).withIndex(e._queryParams.getIndex());Bi(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=en(n.serverSyncTree_,e._path,r);else{const a=Gt(n.serverSyncTree_,e);o=_a(n.serverSyncTree_,e._path,r,a)}return ee(n.eventQueue_,e._path,o),Nn(n.serverSyncTree_,e,t,null,!0),r},s=>(vt(n,"get for query "+x(e)+" failed: "+s),Promise.reject(new Error(s))))}function Ms(n,e,t,i,s){vt(n,"set",{path:e.toString(),value:t,priority:i});const r=rn(n),o=N(t,i),a=zn(n.serverSyncTree_,e),l=ks(o,a,r),c=Xn(n),u=bs(n.serverSyncTree_,e,l,c,!0);Jn(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,m)=>{const _=h==="ok";_||H("set at "+e+" failed: "+h);const E=Ie(n.serverSyncTree_,c,!_);ee(n.eventQueue_,e,E),Ve(n,s,h,m)});const d=Fs(n,e);pt(n,d),ee(n.eventQueue_,d,[])}function $h(n,e,t,i){vt(n,"update",{path:e.toString(),value:t});let s=!0;const r=rn(n),o={};if(U(t,(a,l)=>{s=!1,o[a]=va(A(e,a),N(l),n.serverSyncTree_,r)}),s)V("update() called with empty data.  Don't do anything."),Ve(n,i,"ok",void 0);else{const a=Xn(n),l=ph(n.serverSyncTree_,e,o,a);Jn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const d=c==="ok";d||H("update at "+e+" failed: "+c);const h=Ie(n.serverSyncTree_,a,!d),m=h.length>0?pt(n,e):e;ee(n.eventQueue_,m,h),Ve(n,i,c,u)}),U(t,c=>{const u=Fs(n,A(e,c));pt(n,u)}),ee(n.eventQueue_,e,[])}}function Hh(n){vt(n,"onDisconnectEvents");const e=rn(n),t=bn();Di(n.onDisconnect_,b(),(s,r)=>{const o=va(s,r,n.serverSyncTree_,e);yt(t,s,o)});let i=[];Di(t,b(),(s,r)=>{i=i.concat(en(n.serverSyncTree_,s,r));const o=Fs(n,s);pt(n,o)}),n.onDisconnect_=bn(),ee(n.eventQueue_,b(),i)}function jh(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Ni(n.onDisconnect_,e),Ve(n,t,i,s)})}function Fr(n,e,t,i){const s=N(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&yt(n.onDisconnect_,e,s),Ve(n,i,r,o)})}function Gh(n,e,t,i,s){const r=N(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&yt(n.onDisconnect_,e,r),Ve(n,s,o,a)})}function zh(n,e,t,i){if(vi(t)){V("onDisconnect().update() called with empty data.  Don't do anything."),Ve(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&U(t,(o,a)=>{const l=N(a);yt(n.onDisconnect_,A(e,o),l)}),Ve(n,i,s,r)})}function qh(n,e,t){let i;C(e._path)===".info"?i=Bi(n.infoSyncTree_,e,t):i=Bi(n.serverSyncTree_,e,t),Ta(n.eventQueue_,e._path,i)}function Wi(n,e,t){let i;C(e._path)===".info"?i=Nn(n.infoSyncTree_,e,t):i=Nn(n.serverSyncTree_,e,t),Ta(n.eventQueue_,e._path,i)}function Aa(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Pa)}function Yh(n){n.persistentConnection_&&n.persistentConnection_.resume(Pa)}function vt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),V(t,...e)}function Ve(n,e,t,i){e&&gt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Qh(n,e,t,i,s,r){vt(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:Io(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Ls(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{nn("transaction failed: Data returned ",l,o.path),o.status=0;const c=Yn(n.transactionQueueTree_,e),u=et(c)||[];u.push(o),Ds(c,u);let d;typeof l=="object"&&l!==null&&Z(l,".priority")?(d=qe(l,".priority"),p(zt(d),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):d=(zn(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const h=rn(n),m=N(l,d),_=ks(m,a,h);o.currentOutputSnapshotRaw=m,o.currentOutputSnapshotResolved=_,o.currentWriteId=Xn(n);const E=bs(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);ee(n.eventQueue_,e,E),Zn(n,n.transactionQueueTree_)}}function Ls(n,e,t){return zn(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Zn(n,e=n.transactionQueueTree_){if(e||ei(n,e),et(e)){const t=Da(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Kh(n,tn(e),t)}else wa(e)&&Qn(e,t=>{Zn(n,t)})}function Kh(n,e,t){const i=t.map(c=>c.currentWriteId),s=Ls(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const u=t[c];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=j(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{vt(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(Ie(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();ei(n,Yn(n.transactionQueueTree_,e)),Zn(n,n.transactionQueueTree_),ee(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)gt(d[h])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{H("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}pt(n,e)}},o)}function pt(n,e){const t=Na(n,e),i=tn(t),s=Da(n,t);return Jh(n,s,i),i}function Jh(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=j(t,l.path);let u=!1,d;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,d=l.abortReason,s=s.concat(Ie(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Fh)u=!0,d="maxretry",s=s.concat(Ie(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Ls(n,l.path,o);l.currentInputSnapshot=h;const m=e[a].update(h.val());if(m!==void 0){nn("transaction failed: Data returned ",m,l.path);let _=N(m);typeof m=="object"&&m!=null&&Z(m,".priority")||(_=_.updatePriority(h.getPriority()));const D=l.currentWriteId,pe=rn(n),me=ks(_,h,pe);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=me,l.currentWriteId=Xn(n),o.splice(o.indexOf(D),1),s=s.concat(bs(n.serverSyncTree_,l.path,me,l.currentWriteId,l.applyLocally)),s=s.concat(Ie(n.serverSyncTree_,D,!0))}else u=!0,d="nodata",s=s.concat(Ie(n.serverSyncTree_,l.currentWriteId,!0))}ee(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ei(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)gt(i[a]);Zn(n,n.transactionQueueTree_)}function Na(n,e){let t,i=n.transactionQueueTree_;for(t=C(e);t!==null&&et(i)===void 0;)i=Yn(i,t),e=T(e),t=C(e);return i}function Da(n,e){const t=[];return xa(n,e,t),t.sort((i,s)=>i.order-s.order),t}function xa(n,e,t){const i=et(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Qn(e,s=>{xa(n,s,t)})}function ei(n,e){const t=et(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ds(e,t.length>0?t:void 0)}Qn(e,i=>{ei(n,i)})}function Fs(n,e){const t=tn(Na(n,e)),i=Yn(n.transactionQueueTree_,e);return Ph(i,s=>{Ci(n,s)}),Ci(n,i),Ea(i,s=>{Ci(n,s)}),t}function Ci(n,e){const t=et(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Ie(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ds(e,void 0):t.length=r+1,ee(n.eventQueue_,tn(e),s);for(let o=0;o<i.length;o++)gt(i[o])}}/**
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
 */function Xh(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Zh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):H(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ui=function(n,e){const t=ef(n),i=t.namespace;t.domain==="firebase.com"&&he(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&he("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||cu();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Vo(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new S(t.pathString)}},ef=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=Xh(n.substring(u,d)));const h=Zh(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const m=e.slice(0,c);if(m.toLowerCase()==="localhost")t="localhost";else if(m.split(".").length<=2)t=m;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */const Br="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",tf=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Br.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Br.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
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
 */class Oa{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+x(this.snapshot.exportVal())}}class Ma{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Bs{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */let nf=class{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new q;return jh(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){se("OnDisconnect.remove",this._path);const e=new q;return Fr(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){se("OnDisconnect.set",this._path),fe("OnDisconnect.set",e,this._path,!1);const t=new q;return Fr(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){se("OnDisconnect.setWithPriority",this._path),fe("OnDisconnect.setWithPriority",e,this._path,!1),xs("OnDisconnect.setWithPriority",t);const i=new q;return Gh(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){se("OnDisconnect.update",this._path),Sa("OnDisconnect.update",e,this._path);const t=new q;return zh(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}};/**
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
 */class K{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return v(this._path)?null:cs(this._path)}get ref(){return new oe(this._repo,this._path)}get _queryIdentifier(){const e=br(this._queryParams),t=rs(e);return t==="{}"?"default":t}get _queryObject(){return br(this._queryParams)}isEqual(e){if(e=te(e),!(e instanceof K))return!1;const t=this._repo===e._repo,i=us(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+zu(this._path)}}function ti(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function We(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===de){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==Me)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==be)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===P){if(e!=null&&!zt(e)||t!=null&&!zt(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(p(n.getIndex()instanceof fs||n.getIndex()===ps,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function ni(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class oe extends K{constructor(e,t){super(e,t,new Un,!1)}get parent(){const e=Yo(this._path);return e===null?null:new oe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}let ii=class $i{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new S(e),i=Ke(this.ref,e);return new $i(this._node.getChild(t),i,P)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new $i(s,Ke(this.ref,i),P)))}hasChild(e){const t=new S(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function La(n,e){return n=te(n),n._checkNotDeleted("ref"),e!==void 0?Ke(n._root,e):n._root}function Vr(n,e){n=te(n),n._checkNotDeleted("refFromURL");const t=Ui(e,n._repo.repoInfo_.nodeAdmin);Ia("refFromURL",t);const i=t.repoInfo;return!n._repo.repoInfo_.isCustomHost()&&i.host!==n._repo.repoInfo_.host&&he("refFromURL: Host name does not match the current database: (found "+i.host+" but expected "+n._repo.repoInfo_.host+")"),La(n,t.path.toString())}function Ke(n,e){return n=te(n),C(n._path)===null?Oh("child","path",e):qt("child","path",e),new oe(n._repo,A(n._path,e))}function sf(n,e){n=te(n),se("push",n._path),fe("push",e,n._path,!0);const t=ka(n._repo),i=tf(t),s=Ke(n,i),r=Ke(n,i);let o;return e!=null?o=Vs(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function rf(n){return se("remove",n._path),Vs(n,null)}function Vs(n,e){n=te(n),se("set",n._path),fe("set",e,n._path,!1);const t=new q;return Ms(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function of(n,e){n=te(n),se("setPriority",n._path),xs("setPriority",e);const t=new q;return Ms(n._repo,A(n._path,".priority"),e,null,t.wrapCallback(()=>{})),t.promise}function af(n,e,t){if(se("setWithPriority",n._path),fe("setWithPriority",e,n._path,!1),xs("setWithPriority",t),n.key===".length"||n.key===".keys")throw"setWithPriority failed: "+n.key+" is a read-only object.";const i=new q;return Ms(n._repo,n._path,e,t,i.wrapCallback(()=>{})),i.promise}function lf(n,e){Sa("update",e,n._path);const t=new q;return $h(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function cf(n){n=te(n);const e=new Bs(()=>{}),t=new on(e);return Uh(n._repo,n,t).then(i=>new ii(i,new oe(n._repo,n._path),n._queryParams.getIndex()))}class on{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Oa("value",this,new ii(e.snapshotNode,new oe(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ma(this,e,t):null}matches(e){return e instanceof on?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class si{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ma(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=Ke(new oe(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Oa(e.type,this,new ii(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof si?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function an(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(u,d)=>{Wi(n._repo,n,a),l(u,d)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Bs(t,r||void 0),a=e==="value"?new on(o):new si(e,o);return qh(n._repo,n,a),()=>Wi(n._repo,n,a)}function Hi(n,e,t,i){return an(n,"value",e,t,i)}function Wr(n,e,t,i){return an(n,"child_added",e,t,i)}function Ur(n,e,t,i){return an(n,"child_changed",e,t,i)}function $r(n,e,t,i){return an(n,"child_moved",e,t,i)}function Hr(n,e,t,i){return an(n,"child_removed",e,t,i)}function jr(n,e,t){let i=null;const s=t?new Bs(t):null;e==="value"?i=new on(s):e&&(i=new si(e,s)),Wi(n._repo,n,i)}class ue{}class Fa extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){fe("endAt",this._value,e._path,!0);const t=Ai(e._queryParams,this._value,this._key);if(ni(t),We(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new K(e._repo,e._path,t,e._orderByCalled)}}function uf(n,e){return sn("endAt","key",e),new Fa(n,e)}class df extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){fe("endBefore",this._value,e._path,!1);const t=yd(e._queryParams,this._value,this._key);if(ni(t),We(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new K(e._repo,e._path,t,e._orderByCalled)}}function hf(n,e){return sn("endBefore","key",e),new df(n,e)}class Ba extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){fe("startAt",this._value,e._path,!0);const t=ki(e._queryParams,this._value,this._key);if(ni(t),We(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new K(e._repo,e._path,t,e._orderByCalled)}}function ff(n=null,e){return sn("startAt","key",e),new Ba(n,e)}class pf extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){fe("startAfter",this._value,e._path,!1);const t=gd(e._queryParams,this._value,this._key);if(ni(t),We(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new K(e._repo,e._path,t,e._orderByCalled)}}function mf(n,e){return sn("startAfter","key",e),new pf(n,e)}class _f extends ue{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new K(e._repo,e._path,md(e._queryParams,this._limit),e._orderByCalled)}}function gf(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new _f(n)}class yf extends ue{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new K(e._repo,e._path,_d(e._queryParams,this._limit),e._orderByCalled)}}function Cf(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new yf(n)}class vf extends ue{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){ti(e,"orderByChild");const t=new S(this._path);if(v(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new fs(t),s=$n(e._queryParams,i);return We(s),new K(e._repo,e._path,s,!0)}}function wf(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return qt("orderByChild","path",n),new vf(n)}class Ef extends ue{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){ti(e,"orderByKey");const t=$n(e._queryParams,de);return We(t),new K(e._repo,e._path,t,!0)}}function bf(){return new Ef}class Sf extends ue{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){ti(e,"orderByPriority");const t=$n(e._queryParams,P);return We(t),new K(e._repo,e._path,t,!0)}}function If(){return new Sf}class Tf extends ue{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){ti(e,"orderByValue");const t=$n(e._queryParams,ps);return We(t),new K(e._repo,e._path,t,!0)}}function Rf(){return new Tf}class Pf extends ue{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(fe("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new Fa(this._value,this._key)._apply(new Ba(this._value,this._key)._apply(e))}}function kf(n,e){return sn("equalTo","key",e),new Pf(n,e)}function ae(n,...e){let t=te(n);for(const i of e)t=i._apply(t);return t}oh(oe);dh(oe);/**
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
 */const Af="FIREBASE_DATABASE_EMULATOR_HOST",ji={};let Nf=!1;function Df(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Ji(r);n.repoInfo_=new Vo(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Va(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||he("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),V("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ui(r,s),a=o.repoInfo,l,c;typeof process<"u"&&rr&&(c=rr[Af]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=Ui(r,s),a=o.repoInfo):l=!o.repoInfo.secure;const u=s&&l?new rt(rt.OWNER):new vu(n.name,n.options,e);Ia("Invalid Firebase Database URL",o),v(o.path)||he("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Of(a,n,u,new Cu(n,t));return new Mf(d,n)}function xf(n,e){const t=ji[e];(!t||t[n.key]!==n)&&he(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Aa(n),delete t[n.key]}function Of(n,e,t,i){let s=ji[e.name];s||(s={},ji[e.name]=s);let r=s[n.toURLString()];return r&&he("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Bh(n,Nf,t,i),s[n.toURLString()]=r,r}let Mf=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Vh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new oe(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(xf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&he("Cannot call "+e+" on a deleted database.")}};function Wa(){ut.IS_TRANSPORT_INITIALIZED&&H("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function Lf(){Wa(),Se.forceDisallow()}function Ff(){Wa(),ne.forceDisallow(),Se.forceAllow()}function Bf(n,e,t,i={}){n=te(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&gn(i,r.repoInfo_.emulatorOptions))return;he("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&he('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new rt(rt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Cl(i.mockUserToken,n.app.options.projectId);o=new rt(a)}Ji(e)&&(yl(e),El("Database",!0)),Df(r,s,i,o)}function Vf(n){n=te(n),n._checkNotDeleted("goOffline"),Aa(n._repo)}function Wf(n){n=te(n),n._checkNotDeleted("goOnline"),Yh(n._repo)}function Uf(n,e){Ro(n,e)}/**
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
 */function $f(n){bo(ns),ct(new we("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Va(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ye(or,ar,n),ye(or,ar,"esm2020")}/**
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
 */const Hf={".sv":"timestamp"};function jf(){return Hf}function Gf(n){return{".sv":{increment:n}}}/**
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
 */let zf=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function qf(n,e,t){if(n=te(n),se("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const i=t?.applyLocally??!0,s=new q,r=(a,l,c)=>{let u=null;a?s.reject(a):(u=new ii(c,new oe(n._repo,n._path),P),s.resolve(new zf(l,u)))},o=Hi(n,()=>{});return Qh(n._repo,n._path,e,r,o,i),s.promise}Ce.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ce.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};$f();const Yf="@firebase/database-compat",Qf="2.1.0";/**
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
 */const Kf=new Bn("@firebase/database-compat"),Ua=function(n){const e="FIREBASE WARNING: "+n;Kf.warn(e)};/**
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
 */const Jf=function(n,e,t,i){if(t!==void 0&&typeof t!="boolean")throw new Error(Q(n,e)+"must be a boolean.")},Xf=function(n,e,t){if(e!==void 0)switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(Q(n,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}};/**
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
 */class Zf{constructor(e){this._delegate=e}cancel(e){y("OnDisconnect.cancel",0,1,arguments.length),F("OnDisconnect.cancel","onComplete",e,!0);const t=this._delegate.cancel();return e&&t.then(()=>e(null),i=>e(i)),t}remove(e){y("OnDisconnect.remove",0,1,arguments.length),F("OnDisconnect.remove","onComplete",e,!0);const t=this._delegate.remove();return e&&t.then(()=>e(null),i=>e(i)),t}set(e,t){y("OnDisconnect.set",1,2,arguments.length),F("OnDisconnect.set","onComplete",t,!0);const i=this._delegate.set(e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){y("OnDisconnect.setWithPriority",2,3,arguments.length),F("OnDisconnect.setWithPriority","onComplete",i,!0);const s=this._delegate.setWithPriority(e,t);return i&&s.then(()=>i(null),r=>i(r)),s}update(e,t){if(y("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,Ua("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}F("OnDisconnect.update","onComplete",t,!0);const i=this._delegate.update(e);return t&&i.then(()=>t(null),s=>t(s)),i}}/**
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
 */class ep{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return y("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}}}/**
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
 */class Ae{constructor(e,t){this._database=e,this._delegate=t}val(){return y("DataSnapshot.val",0,0,arguments.length),this._delegate.val()}exportVal(){return y("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()}toJSON(){return y("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()}exists(){return y("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()}child(e){return y("DataSnapshot.child",0,1,arguments.length),e=String(e),qt("DataSnapshot.child","path",e),new Ae(this._database,this._delegate.child(e))}hasChild(e){return y("DataSnapshot.hasChild",1,1,arguments.length),qt("DataSnapshot.hasChild","path",e),this._delegate.hasChild(e)}getPriority(){return y("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority}forEach(e){return y("DataSnapshot.forEach",1,1,arguments.length),F("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(t=>e(new Ae(this._database,t)))}hasChildren(){return y("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()}get key(){return this._delegate.key}numChildren(){return y("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size}getRef(){return y("DataSnapshot.ref",0,0,arguments.length),new J(this._database,this._delegate.ref)}get ref(){return this.getRef()}}class ${constructor(e,t){this.database=e,this._delegate=t}on(e,t,i,s){y("Query.on",2,4,arguments.length),F("Query.on","callback",t,!1);const r=$.getCancelAndContextArgs_("Query.on",i,s),o=(l,c)=>{t.call(r.context,new Ae(this.database,l),c)};o.userCallback=t,o.context=r.context;const a=r.cancel?.bind(r.context);switch(e){case"value":return Hi(this._delegate,o,a),t;case"child_added":return Wr(this._delegate,o,a),t;case"child_removed":return Hr(this._delegate,o,a),t;case"child_changed":return Ur(this._delegate,o,a),t;case"child_moved":return $r(this._delegate,o,a),t;default:throw new Error(Q("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}off(e,t,i){if(y("Query.off",0,3,arguments.length),Xf("Query.off",e),F("Query.off","callback",t,!0),Qs("Query.off","context",i),t){const s=()=>{};s.userCallback=t,s.context=i,jr(this._delegate,e,s)}else jr(this._delegate,e)}get(){return cf(this._delegate).then(e=>new Ae(this.database,e))}once(e,t,i,s){y("Query.once",1,4,arguments.length),F("Query.once","callback",t,!0);const r=$.getCancelAndContextArgs_("Query.once",i,s),o=new q,a=(c,u)=>{const d=new Ae(this.database,c);t&&t.call(r.context,d,u),o.resolve(d)};a.userCallback=t,a.context=r.context;const l=c=>{r.cancel&&r.cancel.call(r.context,c),o.reject(c)};switch(e){case"value":Hi(this._delegate,a,l,{onlyOnce:!0});break;case"child_added":Wr(this._delegate,a,l,{onlyOnce:!0});break;case"child_removed":Hr(this._delegate,a,l,{onlyOnce:!0});break;case"child_changed":Ur(this._delegate,a,l,{onlyOnce:!0});break;case"child_moved":$r(this._delegate,a,l,{onlyOnce:!0});break;default:throw new Error(Q("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return o.promise}limitToFirst(e){return y("Query.limitToFirst",1,1,arguments.length),new $(this.database,ae(this._delegate,gf(e)))}limitToLast(e){return y("Query.limitToLast",1,1,arguments.length),new $(this.database,ae(this._delegate,Cf(e)))}orderByChild(e){return y("Query.orderByChild",1,1,arguments.length),new $(this.database,ae(this._delegate,wf(e)))}orderByKey(){return y("Query.orderByKey",0,0,arguments.length),new $(this.database,ae(this._delegate,bf()))}orderByPriority(){return y("Query.orderByPriority",0,0,arguments.length),new $(this.database,ae(this._delegate,If()))}orderByValue(){return y("Query.orderByValue",0,0,arguments.length),new $(this.database,ae(this._delegate,Rf()))}startAt(e=null,t){return y("Query.startAt",0,2,arguments.length),new $(this.database,ae(this._delegate,ff(e,t)))}startAfter(e=null,t){return y("Query.startAfter",0,2,arguments.length),new $(this.database,ae(this._delegate,mf(e,t)))}endAt(e=null,t){return y("Query.endAt",0,2,arguments.length),new $(this.database,ae(this._delegate,uf(e,t)))}endBefore(e=null,t){return y("Query.endBefore",0,2,arguments.length),new $(this.database,ae(this._delegate,hf(e,t)))}equalTo(e,t){return y("Query.equalTo",1,2,arguments.length),new $(this.database,ae(this._delegate,kf(e,t)))}toString(){return y("Query.toString",0,0,arguments.length),this._delegate.toString()}toJSON(){return y("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()}isEqual(e){if(y("Query.isEqual",1,1,arguments.length),!(e instanceof $)){const t="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(t)}return this._delegate.isEqual(e._delegate)}static getCancelAndContextArgs_(e,t,i){const s={cancel:void 0,context:void 0};if(t&&i)s.cancel=t,F(e,"cancel",s.cancel,!0),s.context=i,Qs(e,"context",s.context);else if(t)if(typeof t=="object"&&t!==null)s.context=t;else if(typeof t=="function")s.cancel=t;else throw new Error(Q(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return s}get ref(){return new J(this.database,new oe(this._delegate._repo,this._delegate._path))}}class J extends ${constructor(e,t){super(e,new K(t._repo,t._path,new Un,!1)),this.database=e,this._delegate=t}getKey(){return y("Reference.key",0,0,arguments.length),this._delegate.key}child(e){return y("Reference.child",1,1,arguments.length),typeof e=="number"&&(e=String(e)),new J(this.database,Ke(this._delegate,e))}getParent(){y("Reference.parent",0,0,arguments.length);const e=this._delegate.parent;return e?new J(this.database,e):null}getRoot(){return y("Reference.root",0,0,arguments.length),new J(this.database,this._delegate.root)}set(e,t){y("Reference.set",1,2,arguments.length),F("Reference.set","onComplete",t,!0);const i=Vs(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}update(e,t){if(y("Reference.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,Ua("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}se("Reference.update",this._delegate._path),F("Reference.update","onComplete",t,!0);const i=lf(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){y("Reference.setWithPriority",2,3,arguments.length),F("Reference.setWithPriority","onComplete",i,!0);const s=af(this._delegate,e,t);return i&&s.then(()=>i(null),r=>i(r)),s}remove(e){y("Reference.remove",0,1,arguments.length),F("Reference.remove","onComplete",e,!0);const t=rf(this._delegate);return e&&t.then(()=>e(null),i=>e(i)),t}transaction(e,t,i){y("Reference.transaction",1,3,arguments.length),F("Reference.transaction","transactionUpdate",e,!1),F("Reference.transaction","onComplete",t,!0),Jf("Reference.transaction","applyLocally",i);const s=qf(this._delegate,e,{applyLocally:i}).then(r=>new ep(r.committed,new Ae(this.database,r.snapshot)));return t&&s.then(r=>t(null,r.committed,r.snapshot),r=>t(r,!1,null)),s}setPriority(e,t){y("Reference.setPriority",1,2,arguments.length),F("Reference.setPriority","onComplete",t,!0);const i=of(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}push(e,t){y("Reference.push",0,2,arguments.length),F("Reference.push","onComplete",t,!0);const i=sf(this._delegate,e),s=i.then(o=>new J(this.database,o));t&&s.then(()=>t(null),o=>t(o));const r=new J(this.database,i);return r.then=s.then.bind(s),r.catch=s.catch.bind(s,void 0),r}onDisconnect(){return se("Reference.onDisconnect",this._delegate._path),new Zf(new nf(this._delegate._repo,this._delegate._path))}get key(){return this.getKey()}get parent(){return this.getParent()}get root(){return this.getRoot()}}/**
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
 */class Yt{constructor(e,t){this._delegate=e,this.app=t,this.INTERNAL={delete:()=>this._delegate._delete(),forceWebSockets:Lf,forceLongPolling:Ff}}useEmulator(e,t,i={}){Bf(this._delegate,e,t,i)}ref(e){if(y("database.ref",0,1,arguments.length),e instanceof J){const t=Vr(this._delegate,e.toString());return new J(this,t)}else{const t=La(this._delegate,e);return new J(this,t)}}refFromURL(e){y("database.refFromURL",1,1,arguments.length);const i=Vr(this._delegate,e);return new J(this,i)}goOffline(){return y("database.goOffline",0,0,arguments.length),Vf(this._delegate)}goOnline(){return y("database.goOnline",0,0,arguments.length),Wf(this._delegate)}}Yt.ServerValue={TIMESTAMP:jf(),increment:n=>Gf(n)};function tp({app:n,url:e,version:t,customAuthImpl:i,customAppCheckImpl:s,namespace:r,nodeAdmin:o=!1}){bo(t);const a=new Xi("database-standalone"),l=new wi("auth-internal",a);l.setComponent(new we("auth-internal",()=>i,"PRIVATE"));let c;return s&&(c=new wi("app-check-internal",a),c.setComponent(new we("app-check-internal",()=>s,"PRIVATE"))),{instance:new Yt(Va(n,l,c,e,o),n),namespace:r}}var np=Object.freeze({__proto__:null,initStandalone:tp});/**
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
 */const ip=Yt.ServerValue;function sp(n){n.INTERNAL.registerComponent(new we("database-compat",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app-compat").getImmediate(),s=e.getProvider("database").getImmediate({identifier:t});return new Yt(s,i)},"PUBLIC").setServiceProps({Reference:J,Query:$,Database:Yt,DataSnapshot:Ae,enableLogging:Uf,INTERNAL:np,ServerValue:ip}).setMultipleInstances(!0)),n.registerVersion(Yf,Qf)}sp(Vt);const rp={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",projectId:"vidu-aae11",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"};Vt.apps.length||Vt.initializeApp(rp);const re=Vt.database();function $a(n,e,t){if(!n||!e)return;const i=`rooms/${n}/connections/${e}`;return re.ref(i).set({status:t,timestamp:Date.now()})}class Ha{constructor(e,t,i){this.peerConnection=e,this.roomRef=t,this.role=i,this.pendingCandidates=[],this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1},this.handleLocalCandidateWrapped=this.handleLocalCandidate.bind(this),this.handleICEGatheringStateChange=this.handleICEGatheringStateChange.bind(this),this.handleICEConnectionStateChange=this.handleICEConnectionStateChange.bind(this),this._onRemoteCandidateAdded=this._onRemoteCandidateAdded.bind(this),this.setupICEHandling()}setupICEHandling(){this.peerConnection.addEventListener("icecandidate",this.handleLocalCandidateWrapped),this.peerConnection.addEventListener("icegatheringstatechange",this.handleICEGatheringStateChange),this.peerConnection.addEventListener("iceconnectionstatechange",this.handleICEConnectionStateChange),this.listenForRemoteCandidates()}handleICEGatheringStateChange(){this.peerConnection.iceGatheringState==="complete"&&(this.state.iceGatheringComplete=!0,this.onICEGatheringComplete?.())}handleICEConnectionStateChange(){const e=this.peerConnection.iceConnectionState;this.onICEConnectionStateChange?.(e)}handleLocalCandidate(e){if(e.candidate){this.state.localCandidatesCount++;const t=this.role==="initiator"?"callerCandidates":"calleeCandidates";this.roomRef.child(t).push(e.candidate.toJSON()).catch(i=>{console.error("Failed to send ICE candidate to Firebase:",i)})}}listenForRemoteCandidates(){const e=this.role==="initiator"?"calleeCandidates":"callerCandidates";this._remoteCandidatesPath=e,this._remoteCandidatesRef=this.roomRef.child(e),this._remoteCandidatesRef.on("child_added",this._onRemoteCandidateAdded)}_onRemoteCandidateAdded(e){const t=e.val();if(t)try{const i=new RTCIceCandidate(t);this.handleRemoteCandidate(i)}catch(i){console.warn("Failed to create RTCIceCandidate:",i,t)}}async handleRemoteCandidate(e){if(this.state.remoteCandidatesCount++,this.state.remoteDescriptionSet)try{await this.peerConnection.addIceCandidate(e)}catch(t){console.warn("Failed to add ICE candidate:",t)}else this.pendingCandidates.push(e),this.state.pendingCandidatesCount=this.pendingCandidates.length}async processQueuedCandidates(){if(!this.state.remoteDescriptionSet){console.warn("Cannot process queued candidates: remote description not set");return}if(this.pendingCandidates.length===0)return;const e=[...this.pendingCandidates];this.pendingCandidates.length=0,this.state.pendingCandidatesCount=0;for(const t of e)try{await this.peerConnection.addIceCandidate(t)}catch(i){console.warn("Failed to add queued ICE candidate:",i)}}async onRemoteDescriptionSet(){this.state.remoteDescriptionSet=!0,await this.processQueuedCandidates()}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState}}cleanup(){this.peerConnection&&(this.peerConnection.removeEventListener("icecandidate",this.handleLocalCandidateWrapped),this.peerConnection.removeEventListener("icegatheringstatechange",this.handleICEGatheringStateChange),this.peerConnection.removeEventListener("iceconnectionstatechange",this.handleICEConnectionStateChange)),this._remoteCandidatesRef&&this._onRemoteCandidateAdded&&(this._remoteCandidatesRef.off("child_added",this._onRemoteCandidateAdded),this._remoteCandidatesRef=null,this._onRemoteCandidateAdded=null,this._remoteCandidatesPath=null),this.pendingCandidates.length=0,this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1}}}class ja{constructor(e,t,i={}){this.peerConnection=e,this.role=t,this.options={connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3,...i},this.state={current:"new",previous:null,startTime:Date.now(),reconnectAttempt:0,lastError:null},this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null},this.timers={connectionTimeout:null,reconnectTimer:null},this.setupStateMonitoring()}setCallbacks(e){Object.assign(this.callbacks,e)}setupStateMonitoring(){this.peerConnection.onconnectionstatechange=()=>{this.handleConnectionStateChange(this.peerConnection.connectionState)},this.peerConnection.oniceconnectionstatechange=()=>{this.handleICEConnectionStateChange(this.peerConnection.iceConnectionState)},this.startConnectionTimeout()}handleConnectionStateChange(e){const t=this.state.current;switch(this.updateState(e),e){case"connecting":this.handleConnecting();break;case"connected":this.handleConnected();break;case"disconnected":this.handleDisconnected();break;case"failed":this.handleFailed();break;case"closed":this.handleClosed();break}this.callbacks.onStateChange?.(e,t)}handleICEConnectionStateChange(e){switch(e){case"checking":break;case"connected":this.clearConnectionTimeout();break;case"completed":break;case"failed":this.handleICEFailed();break;case"disconnected":this.handleICEDisconnected();break}}handleConnecting(){this.clearReconnectTimer(),this.startConnectionTimeout()}handleConnected(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.reconnectAttempt=0,this.state.lastError=null;const e=Date.now()-this.state.startTime;this.callbacks.onConnected?.(e)}handleDisconnected(){this.callbacks.onDisconnected?.(),this.state.reconnectAttempt<this.options.reconnectAttempts?this.scheduleReconnect():this.handleFailed("Max reconnection attempts reached")}handleFailed(e="Connection failed"){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.lastError=e,this.callbacks.onFailed?.(e)}handleClosed(){this.clearConnectionTimeout(),this.clearReconnectTimer()}handleICEFailed(){this.handleFailed("ICE connection failed")}handleICEDisconnected(){}scheduleReconnect(){this.state.reconnectAttempt++;const e=this.options.reconnectDelay*Math.pow(2,this.state.reconnectAttempt-1);this.callbacks.onReconnecting?.(this.state.reconnectAttempt,this.options.reconnectAttempts),this.timers.reconnectTimer=setTimeout(()=>{this.attemptReconnection()},e)}async attemptReconnection(){try{if(await this.peerConnection.restartIce(),this.role==="initiator"){const e=await this.peerConnection.createOffer({iceRestart:!0});if(await this.peerConnection.setLocalDescription(e),this.callbacks.onIceRestart)try{await this.callbacks.onIceRestart(e)}catch(t){throw console.error("ICE restart signaling failed:",t),t}else console.warn("No onIceRestart callback provided for signaling")}this.state.startTime=Date.now(),this.startConnectionTimeout()}catch(e){console.error("Reconnection attempt failed:",e),this.handleDisconnected()}}startConnectionTimeout(){this.clearConnectionTimeout(),this.timers.connectionTimeout=setTimeout(()=>{this.state.current!=="connected"&&this.handleFailed("Connection timeout")},this.options.connectionTimeout)}clearConnectionTimeout(){this.timers.connectionTimeout&&(clearTimeout(this.timers.connectionTimeout),this.timers.connectionTimeout=null)}clearReconnectTimer(){this.timers.reconnectTimer&&(clearTimeout(this.timers.reconnectTimer),this.timers.reconnectTimer=null)}updateState(e){this.state.previous=this.state.current,this.state.current=e}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState,connectionTime:Date.now()-this.state.startTime}}async forceReconnect(){this.state.reconnectAttempt=0,await this.attemptReconnection()}cleanup(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.peerConnection&&(this.peerConnection.onconnectionstatechange=null,this.peerConnection.oniceconnectionstatechange=null),this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null,onIceRestart:null},this.state={current:"closed",previous:this.state.current,startTime:Date.now(),reconnectAttempt:0,lastError:null}}}const Ga={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},f={roomId:null,role:null,wasConnected:!1,peerConnection:null,localStream:null,iceCandidateManager:null,connectionStateManager:null,roomRef:null};function Ws(){return f.roomId}function op(){return f.role}function ap(){return f.wasConnected}function Us(n){f.localStream=n}function Dn(){return f.localStream}function $s(){return f.peerConnection}async function lp({onRemoteStream:n,onStatusUpdate:e}){if(f.role="initiator",f.roomId||(f.roomId=hp()),f.peerConnection=new RTCPeerConnection(Ga),!f.localStream)throw e?.("Error: No local media. Please allow mic/camera."),new Error("connect called without localStream set");f.localStream.getTracks().forEach(s=>{f.peerConnection.addTrack(s,f.localStream)});const t=await f.peerConnection.createOffer();await f.peerConnection.setLocalDescription(t),f.roomRef=await fp(f.roomId,t),f.peerConnection.ontrack=s=>{qa(s,n)},f.iceCandidateManager=new Ha(f.peerConnection,f.roomRef,"initiator"),f.connectionStateManager=new ja(f.peerConnection,"initiator",{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),f.connectionStateManager.setCallbacks({onStateChange:(s,r)=>{},onConnected:s=>{},onDisconnected:()=>{e?.("Connection lost. Attempting to reconnect...")},onFailed:s=>{e?.(`Connection failed: ${s}`)},onReconnecting:(s,r)=>{e?.(`Reconnecting... (${s}/${r})`)},onIceRestart:async s=>{try{await f.roomRef.child("offer").set({type:s.type,sdp:s.sdp})}catch(r){throw console.error("Failed to send ICE restart offer:",r),r}}});let i=null;return f.roomRef.child("answer").on("value",async s=>{const r=s.val();if(r&&r.sdp!==i)try{const o=!!f.peerConnection.currentRemoteDescription;await f.peerConnection.setRemoteDescription(new RTCSessionDescription(r)),i=r.sdp,f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during answer processing")}catch(o){console.error("Failed to set remote description (caller):",o),e?.("Connection error: Failed to process answer")}}),$a(f.roomId,"initiator","waiting"),e&&e("Link ready! Waiting for partner..."),{roomId:f.roomId,shareUrl:`${window.location.origin}${window.location.pathname}?room=${f.roomId}`}}async function za({roomId:n,onRemoteStream:e,onStatusUpdate:t}){f.roomId=n,f.role="joiner";const{roomRef:i,roomSnapshot:s}=await pp(n);if(!s.exists())return t&&t("Error: Invalid room link"),{success:!1};if(f.roomRef=i,f.peerConnection=new RTCPeerConnection(Ga),!f.localStream)throw t?.("Error: No local media. Please allow mic/camera."),new Error("join called without localStream set");f.localStream.getTracks().forEach(r=>{f.peerConnection.addTrack(r,f.localStream)}),f.peerConnection.ontrack=r=>{qa(r,e)},f.iceCandidateManager=new Ha(f.peerConnection,f.roomRef,"joiner"),f.connectionStateManager=new ja(f.peerConnection,"joiner",{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),f.connectionStateManager.setCallbacks({onStateChange:(r,o)=>{},onConnected:r=>{},onDisconnected:()=>{t?.("Connection lost. Attempting to reconnect...")},onFailed:r=>{t?.(`Connection failed: ${r}`)},onReconnecting:(r,o)=>{t?.(`Reconnecting... (${r}/${o})`)}});try{const r=s.val().offer;await f.peerConnection.setRemoteDescription(new RTCSessionDescription(r)),f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during join");const o=await f.peerConnection.createAnswer();await f.peerConnection.setLocalDescription(o),await f.roomRef.child("answer").set({type:o.type,sdp:o.sdp}),$a(f.roomId,"joiner","connecting");let a=f.peerConnection.currentRemoteDescription?.sdp;return f.roomRef.child("offer").on("value",async l=>{const c=l.val();if(c&&f.peerConnection.currentRemoteDescription&&c.sdp!==a)try{await f.peerConnection.setRemoteDescription(c),a=c.sdp,f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during ICE restart");const u=await f.peerConnection.createAnswer();await f.peerConnection.setLocalDescription(u),await f.roomRef.child("answer").set({type:u.type,sdp:u.sdp})}catch(u){console.error("Failed to handle ICE restart offer:",u)}}),{success:!0}}catch(r){return console.error("Failed to join room:",r),t?.(`Failed to join: ${r.message}`),{success:!1}}}async function cp({onStatusUpdate:n}){f.iceCandidateManager&&(f.iceCandidateManager.cleanup(),f.iceCandidateManager=null),f.connectionStateManager&&(f.connectionStateManager.cleanup(),f.connectionStateManager=null),dp(),f.peerConnection&&(f.peerConnection.ontrack=null,f.peerConnection.onicecandidate=null,f.peerConnection.onconnectionstatechange=null,f.peerConnection.oniceconnectionstatechange=null,f.peerConnection.onicegatheringstatechange=null,f.peerConnection.close(),f.peerConnection=null),f.localStream&&(f.localStream.getTracks().forEach(e=>e.stop()),f.localStream=null),f.roomId&&f.role==="initiator"&&await mp(f.roomId),f.roomId=null,f.role=null,f.wasConnected=!1,f.roomRef=null,n&&n("Disconnected. Ready for new chat.")}function up(n){n&&(n.roomId&&(f.roomId=n.roomId),n.role?f.role=n.role:n.isInitiator!==void 0&&(f.role=n.isInitiator?"initiator":"joiner"),n.wasConnected!==void 0&&(f.wasConnected=n.wasConnected))}function qa(n,e){f.wasConnected=!0,e&&e(n.streams[0])}function dp(){if(!f.roomId)return;const n=re.ref(`rooms/${f.roomId}`);n.child("answer").off(),n.child("offer").off(),n.child("callerCandidates").off(),n.child("calleeCandidates").off()}function hp(){return Math.random().toString(36).substring(2,15)}async function fp(n,e){const t=re.ref(`rooms/${n}`);return await t.set({offer:{type:e.type,sdp:e.sdp}}),t}async function pp(n){const e=re.ref(`rooms/${n}`),t=await e.once("value");return{roomRef:e,roomSnapshot:t}}async function mp(n){await re.ref(`rooms/${n}`).remove()}async function Ya(n,e={}){const{timeout:t=5e3,checkInterval:i=500,minWidth:s=32,minHeight:r=32,blackThreshold:o=10}=e;return new Promise(a=>{const l=Date.now();let c=0;const u=()=>{if(c++,Date.now()-l>t){a({isValid:!1,reason:"timeout",message:"Video validation timed out",checks:c});return}if(!n.srcObject){setTimeout(u,i);return}if(n.readyState<2){setTimeout(u,i);return}if(n.videoWidth<s||n.videoHeight<r){setTimeout(u,i);return}const h=n.currentTime;setTimeout(()=>{if(n.currentTime===h&&!n.paused){a({isValid:!1,reason:"frozen",message:"Video appears to be frozen",checks:c});return}_p(n,o).then(m=>{a(m?{isValid:!1,reason:"black",message:"Video is showing black frames",checks:c}:{isValid:!0,reason:"valid",message:"Video stream is valid",checks:c,dimensions:{width:n.videoWidth,height:n.videoHeight}})}).catch(()=>{a({isValid:!0,reason:"valid_no_canvas",message:"Video stream appears valid (canvas check failed)",checks:c})})},100)};u()})}async function _p(n,e=10){return new Promise((t,i)=>{try{const s=document.createElement("canvas"),r=s.getContext("2d");s.width=Math.min(n.videoWidth,320),s.height=Math.min(n.videoHeight,240),r.drawImage(n,0,0,s.width,s.height);const a=r.getImageData(0,0,s.width,s.height).data;let l=0,c=0;for(let d=0;d<a.length;d+=16){const h=a[d],m=a[d+1],_=a[d+2],E=h*.299+m*.587+_*.114;l+=E,c++}const u=l/c;t(u<e)}catch(s){i(s)}})}function gp(n){if(!n)return{hasVideo:!1,hasAudio:!1,videoTracks:0,audioTracks:0,activeVideoTracks:0,activeAudioTracks:0};const e=n.getVideoTracks(),t=n.getAudioTracks(),i=e.filter(r=>r.enabled&&r.readyState==="live"),s=t.filter(r=>r.enabled&&r.readyState==="live");return{hasVideo:e.length>0,hasAudio:t.length>0,videoTracks:e.length,audioTracks:t.length,activeVideoTracks:i.length,activeAudioTracks:s.length,videoEnabled:i.length>0,audioEnabled:s.length>0}}function yp(n,e,t={}){const{checkInterval:i=2e3,maxFailures:s=3,autoRecover:r=!0}=t;let o=0,a=null,l=!0;const c=async()=>{if(l){try{const u=await Ya(n,{timeout:3e3,checkInterval:200});u.isValid?(o>0?(o=0,e?.({status:"recovered",message:"Video stream recovered",result:u})):a!=="valid"&&e?.({status:"valid",message:"Video stream is healthy",result:u}),a="valid"):(o++,o>=s?(e?.({status:"failed",message:`Video stream validation failed: ${u.message}`,result:u,failureCount:o}),a="failed"):(e?.({status:"warning",message:`Video stream issue detected: ${u.message} (${o}/${s})`,result:u,failureCount:o}),a="warning"))}catch(u){console.warn("Video stream monitoring error:",u)}l&&setTimeout(c,i)}};return setTimeout(c,1e3),()=>{l=!1}}class Cp{constructor(e={}){this.options={videoValidationTimeout:8e3,maxRetries:3,retryDelay:2e3,monitorInterval:3e3,...e},this.state={connectionState:"idle",videoValidated:!1,audioValidated:!1,retryCount:0,lastError:null},this.callbacks={onStatusUpdate:null,onConnectionStateChange:null,onValidationComplete:null},this.monitors={video:null,connection:null}}setCallbacks({onStatusUpdate:e,onConnectionStateChange:t,onValidationComplete:i}){this.callbacks.onStatusUpdate=e,this.callbacks.onConnectionStateChange=t,this.callbacks.onValidationComplete=i}async startMonitoring(e,t){this.updateConnectionState("connecting"),this.updateStatus("Establishing connection..."),this.monitorPeerConnection(t);try{await this.validateRemoteVideo(e),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(e),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated})}catch(i){this.handleValidationFailure(i,e,t)}}async validateRemoteVideo(e){this.updateConnectionState("validating"),this.updateStatus("Validating video stream...");const t=await Ya(e,{timeout:this.options.videoValidationTimeout,checkInterval:500,minWidth:32,minHeight:32});if(!t.isValid)throw new Error(`Video validation failed: ${t.message}`);if(this.state.videoValidated=!0,e.srcObject){const i=gp(e.srcObject);this.state.audioValidated=i.audioEnabled}return t}monitorPeerConnection(e){e&&(e.onconnectionstatechange=()=>{switch(e.connectionState){case"connected":break;case"disconnected":this.updateConnectionState("reconnecting"),this.updateStatus("Connection lost. Attempting to reconnect...");break;case"failed":this.updateConnectionState("failed"),this.updateStatus("Connection failed. Please try again.");break;case"closed":this.updateConnectionState("idle"),this.updateStatus("Connection closed."),this.cleanup();break}},e.oniceconnectionstatechange=()=>{e.iceConnectionState==="failed"&&this.handleConnectionFailure("ICE connection failed")})}startContinuousMonitoring(e){this.monitors.video=yp(e,t=>this.handleVideoMonitorUpdate(t),{checkInterval:this.options.monitorInterval,maxFailures:2,autoRecover:!0})}handleVideoMonitorUpdate(e){switch(e.status){case"valid":break;case"warning":this.updateStatus(`Connection issue: ${e.message}`);break;case"failed":this.updateConnectionState("failed"),this.updateStatus(`Video stream failed: ${e.message}`);break;case"recovered":this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully.");break}}async handleValidationFailure(e,t,i){if(this.state.lastError=e,this.state.retryCount++,this.state.retryCount<=this.options.maxRetries){this.updateStatus(`Connection issue detected. Retrying... (${this.state.retryCount}/${this.options.maxRetries})`),await new Promise(s=>setTimeout(s,this.options.retryDelay));try{await this.validateRemoteVideo(t),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(t),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated,retriesUsed:this.state.retryCount})}catch(s){await this.handleValidationFailure(s,t,i)}}else this.updateConnectionState("failed"),this.updateStatus("Connection failed: Unable to establish video stream. Please try again."),this.callbacks.onValidationComplete?.({success:!1,error:e.message,retriesUsed:this.state.retryCount})}handleConnectionFailure(e){this.updateConnectionState("failed"),this.updateStatus(`Connection failed: ${e}`),this.cleanup()}updateConnectionState(e){const t=this.state.connectionState;this.state.connectionState=e,t!==e&&this.callbacks.onConnectionStateChange?.(e,t)}updateStatus(e){this.callbacks.onStatusUpdate?.(e)}getState(){return{...this.state}}cleanup(){this.monitors.video&&(this.monitors.video(),this.monitors.video=null),this.state.connectionState="idle",this.state.videoValidated=!1,this.state.audioValidated=!1,this.state.retryCount=0,this.state.lastError=null}}const It={room:{id:null,role:null,partnerOnline:!1}},vp=[];function dn(n){Object.keys(n).forEach(e=>{typeof n[e]=="object"&&n[e]!==null&&!Array.isArray(n[e])?It[e]={...It[e],...n[e]}:It[e]=n[e]}),vp.forEach(e=>e(It))}function Gr(){return It}class wp{constructor(){this.isRestoring=!1,this.autoSaveCleanup=null,this.restorationCallbacks={onMediaRestore:null,onConnectionRestore:null,onUIRestore:null,onStatusUpdate:null}}setCallbacks(e){Object.assign(this.restorationCallbacks,e)}saveCurrentSession(e=null,t={}){const i=Gr();if(!i.room.id)return;const s={roomId:i.room.id,role:i.room.role,isInitiator:i.room.role==="initiator",partnerOnline:i.room.partnerOnline,connectionState:this.getConnectionState(e),wasConnected:this.getWasConnected(e),isAudioMuted:t.getIsAudioMuted?.()||!1,isVideoOn:t.getIsVideoOn?.()||!0,currentFacingMode:t.getCurrentFacingMode?.()||"user",watchMode:t.getWatchMode?.()||!1,streamUrl:t.getStreamUrl?.()||"",sessionStartTime:Date.now(),lastActivity:Date.now()};ll(s)}shouldRestoreSession(){const e=un();if(!e||!e.roomId)return!1;const t=Date.now()-e.lastActivity,i=300*1e3;return t>i?(it(),!1):!(!e.connectionState||e.connectionState==="idle")}async restoreSession(){const e=un();if(!e)return{success:!1,reason:"No saved state"};this.isRestoring=!0,this.pauseAutoSave();try{if(this.restorationCallbacks.onStatusUpdate?.("Restoring session..."),dn({room:{id:e.roomId,role:e.role||(e.isInitiator?"initiator":"joiner"),partnerOnline:e.partnerOnline}}),!await this.restoreMedia(e))throw new Error("Failed to restore media");if(this.restoreUI(e),!await this.restoreConnection(e))throw new Error("Failed to restore connection");return this.restorationCallbacks.onStatusUpdate?.("Session restored successfully!"),{success:!0}}catch(t){return console.error("Session restoration failed:",t),this.restorationCallbacks.onStatusUpdate?.(`Restoration failed: ${t.message}`),it(),dn({room:{id:null,role:null,partnerOnline:!1}}),{success:!1,reason:t.message}}finally{this.isRestoring=!1,this.resumeAutoSave()}}async restoreMedia(e){try{this.restorationCallbacks.onStatusUpdate?.("Restoring camera and microphone...");const t=await this.restorationCallbacks.onMediaRestore?.({isAudioMuted:e.isAudioMuted,isVideoOn:e.isVideoOn,currentFacingMode:e.currentFacingMode});if(!t||!t.success)throw new Error("Media restoration failed");return!0}catch(t){return console.error("Failed to restore media:",t),!1}}async restoreConnection(e){try{this.restorationCallbacks.onStatusUpdate?.("Reconnecting to room...");const t=await this.restorationCallbacks.onConnectionRestore?.({roomId:e.roomId,role:e.role||(e.isInitiator?"initiator":"joiner"),isInitiator:e.isInitiator,wasConnected:e.wasConnected});if(!t||!t.success)throw new Error("Connection restoration failed");return!0}catch(t){return console.error("Failed to restore connection:",t),!1}}restoreUI(e){try{this.restorationCallbacks.onUIRestore?.({isAudioMuted:e.isAudioMuted,isVideoOn:e.isVideoOn,watchMode:e.watchMode,streamUrl:e.streamUrl})}catch(t){console.error("Failed to restore UI:",t)}}setupAutoSave(e=()=>null){if(this.isRestoring)return()=>{};let t=null;const i=()=>{t||(t=setInterval(()=>{if(this.isRestoring||this._autoSavePaused)return;const a=Gr(),l=e();a.room.id&&this.getConnectionState(l)!=="idle"&&this.saveCurrentSession(l)},1e4))},s=()=>{t&&(clearInterval(t),t=null)};i();const r=()=>{this.isRestoring||this.saveCurrentSession()};window.addEventListener("beforeunload",r);const o=()=>{document.hidden&&!this.isRestoring&&this.saveCurrentSession()};return document.addEventListener("visibilitychange",o),()=>{s(),window.removeEventListener("beforeunload",r),document.removeEventListener("visibilitychange",o)}}pauseAutoSave(){this._autoSavePaused=!0}resumeAutoSave(){this._autoSavePaused=!1}isCurrentlyRestoring(){return this.isRestoring}clearSession(){it(),dn({room:{id:null,role:null,partnerOnline:!1}})}getConnectionState(e){return e&&e.getState().connectionState||"idle"}getWasConnected(e){if(e){const t=e.getState();return t.connectionState==="connected"||t.videoValidated}return!1}getRestorationInfo(){const e=un();return{hasSavedState:!!e,shouldRestore:this.shouldRestoreSession(),isRestoring:this.isRestoring,savedState:e?{roomId:e.roomId,role:e.role||(e.isInitiator?"initiator":"joiner"),isInitiator:e.isInitiator,sessionAge:e.lastActivity?Date.now()-e.lastActivity:null,wasConnected:e.wasConnected}:null}}}let k=null,Je=!1,Ep=()=>!!document.pictureInPictureElement;async function bp(n,e,t,i=!1){console.log("[PiP] Toggle requested",{hasDocumentPiP:"documentPictureInPicture"in window,hasStream:!!n.srcObject,hasFloatingWindow:!!document.pictureInPictureElement,documentPipWindowOpen:!!k,nativePipActive:Ep()});try{if(!n.srcObject){console.warn("[PiP] No remote stream available"),t("Connect to a partner first");return}if(document.pictureInPictureElement){console.log("[PiP] Exiting active native PiP (via custom button)"),await document.exitPictureInPicture(),Je=!1,e.textContent="Float Partner Video";return}if(k){console.log("[PiP] Closing existing Document PiP window"),k.close(),k=null,e.textContent="Float Partner Video";return}if(n.offsetParent===null&&!("documentPictureInPicture"in window)){console.warn("[PiP] Video is hidden and Document PiP not available"),t("Switch to Video Chat mode to use floating window");return}if(i&&"documentPictureInPicture"in window){await Sp(n,e);return}if("pictureInPictureEnabled"in document){await Ip(n,e);return}}catch(s){console.error("[PiP] Error:",s.name,s.message,s),s.name==="NotAllowedError"?t("Picture-in-Picture blocked. Check browser permissions."):s.name==="InvalidStateError"?t("Cannot open PiP - video not ready"):t("Picture-in-Picture failed. See console for details.")}}async function Sp(n,e){console.log("[PiP] Opening Document PiP window");try{if(k=await window.documentPictureInPicture.requestWindow({width:400,height:300}),console.log("[PiP] Document PiP window created",{width:k.innerWidth,height:k.innerHeight,closed:k.closed}),k.closed)throw console.error("[PiP] Window was closed immediately after creation"),k=null,new Error("PiP window closed immediately");[...document.styleSheets].forEach(a=>{try{const l=[...a.cssRules].map(u=>u.cssText).join(""),c=document.createElement("style");c.textContent=l,k.document.head.appendChild(c)}catch{const c=document.createElement("link");c.rel="stylesheet",c.href=a.href,k.document.head.appendChild(c)}}),k.document.body.innerHTML=`
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;const t=k.document.getElementById("pipVideo"),i=k.document.getElementById("pipMute"),s=n.srcObject.getVideoTracks(),r=n.srcObject.getAudioTracks();console.log("[PiP] Stream tracks:",{video:s.length,audio:r.length,videoActive:s[0]?.enabled,audioActive:r[0]?.enabled}),t.srcObject=n.srcObject,console.log("[PiP] Stream attached to PiP video"),console.log("[PiP] Video will autoplay (muted initially for browser policy)");let o=!0;i.addEventListener("click",()=>{if(!n.srcObject){console.warn("[PiP] Remote stream no longer available");return}o=!o,t.muted=o,o?n.muted=!1:n.muted=!0,i.textContent=o?"Unmute Partner":"Mute Partner",i.style.background=o?"#ff9800":"#4caf50",console.log("[PiP] Partner audio in PiP window:",o?"MUTED":"UNMUTED")}),k.addEventListener("pagehide",()=>{console.log("[PiP] Document PiP window closed by user or browser"),k=null,e.textContent="Float Partner Video"}),k.addEventListener("load",()=>{console.log("[PiP] Document PiP window loaded event fired")}),t.addEventListener("error",a=>{console.error("[PiP] Video element error:",a)}),t.addEventListener("loadedmetadata",()=>{console.log("[PiP] Video metadata loaded in PiP window")}),e.textContent="Close Float Window",console.log("[PiP] Document PiP setup complete")}catch(t){throw console.error("[PiP] Error during Document PiP setup:",t),k&&(k.close(),k=null),t}}async function Ip(n,e){document.pictureInPictureElement?(console.log("[PiP] Exiting native PiP"),await document.exitPictureInPicture(),Je=!1,e.textContent="Float Partner Video"):(console.log("[PiP] Entering native PiP"),await n.requestPictureInPicture(),Je=!0,e.textContent="Exit Float Mode")}function Tp(n,e){n.addEventListener("enterpictureinpicture",()=>{console.log("[PiP] Remote video entered native PiP (via browser controls)"),Je=!0,e.textContent="Exit Float Mode"}),n.addEventListener("leavepictureinpicture",()=>{console.log("[PiP] Remote video exited native PiP (via browser controls)"),Je=!1,e.textContent="Float Partner Video"})}function Rp(n){console.log("[PiP] Cleanup requested"),k&&(console.log("[PiP] Closing Document PiP window during cleanup"),k.close(),k=null),Je&&document.pictureInPictureElement&&(console.log("[PiP] Exiting native PiP during cleanup"),document.exitPictureInPicture().catch(e=>{console.warn("[PiP] Failed to exit native PiP:",e)}),Je=!1),n&&(n.textContent="Float Partner Video",n.style.display="none"),console.log("[PiP] Cleanup complete")}const Ne={player:null,ready:!1,currentId:null};function xn(n){return/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/.test(n)}function Qa(n){const e=n.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);return e?e[1]:null}function Ka(n,e,t){e.style.display="none";const i=document.getElementById("yt-iframe");i&&i.remove();let s=document.getElementById("yt-player-div");s||(s=document.createElement("div"),s.id="yt-player-div",e.parentNode.insertBefore(s,e)),s.innerHTML='<div id="yt-iframe"></div>',s.style.display="",Ne.player=new YT.Player("yt-iframe",{height:"360",width:"640",videoId:n,events:{onReady:()=>{Ne.ready=!0},onStateChange:t}}),Ne.currentId=n}function Ja(n){const e=document.getElementById("yt-player-div");e&&(e.style.display="none"),n.style.display="",Ne.player=null,Ne.ready=!1,Ne.currentId=null}function Gi(){return Ne.player}function zi(){return Ne.ready}const L={watchMode:!1,isSyncing:!1,streamUrl:""};function ri(){return L.watchMode}function Pp(){return L.streamUrl}function Xa(n){L.streamUrl=n}function kp({videoContainer:n,watchContainer:e,toggleModeBtn:t,sharedVideo:i,streamUrlInput:s,syncStatus:r}){return L.watchMode=!L.watchMode,L.watchMode?(n.style.display="none",e.style.display="block",t.textContent="Switch to Video Chat",r.textContent="Paste the same stream URL as your partner"):(n.style.display="flex",e.style.display="none",t.textContent="Switch to Watch Mode",i.src="",s.value=""),L.watchMode}function Ap({roomId:n,url:e,sharedVideo:t,syncStatus:i}){if(!e){i.textContent="Please enter a stream URL";return}if(xn(e)){const s=Qa(e);Ka(s,t,r=>el(r,n)),i.textContent="YouTube video sent to partner..."}else Ja(t),t.src=e,i.textContent="Video sent to partner...";n&&re.ref(`rooms/${n}/stream`).set({url:e})}function Za({roomId:n,sharedVideo:e,streamUrlInput:t,syncStatus:i}){if(!n)return;const s=re.ref(`rooms/${n}`);s.child("stream/url").on("value",r=>{const o=r.val();o&&o!==t.value&&(t.value=o,i.innerHTML='Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>',document.getElementById("accept-shared-video").addEventListener("click",()=>Np({url:o,sharedVideo:e,syncStatus:i})),i.style.background="#2196f3")}),s.child("stream/playing").on("value",async r=>{if(L.isSyncing)return;const o=r.val(),a=t.value,l=Gi(),c=zi();if(xn(a)&&l&&c)o===!0&&l.getPlayerState()!==YT.PlayerState.PLAYING?(l.playVideo(),i.textContent="Playing in sync"):o===!1&&l.getPlayerState()===YT.PlayerState.PLAYING&&(l.pauseVideo(),i.textContent="Partner pressed pause");else if(o===!0&&e.paused)try{await e.play(),i.textContent="Playing in sync"}catch{i.textContent="▶️ Tap the video to start playing",i.style.background="#FF5722",i.style.fontSize="16px";const d=()=>{i.style.background="#2a2a2a",i.style.fontSize="14px",e.removeEventListener("play",d)};e.addEventListener("play",d)}else o===!1&&!e.paused&&(e.pause(),i.textContent="Partner pressed pause")}),s.child("stream/time").on("value",r=>{if(L.isSyncing)return;const o=r.val(),a=t.value,l=Gi(),c=zi();xn(a)&&l&&c?o!==null&&Math.abs(l.getCurrentTime()-o)>2&&(l.seekTo(o,!0),i.textContent=`Syncing to ${Math.floor(o)}s`):o!==null&&Math.abs(e.currentTime-o)>2&&(e.currentTime=o,i.textContent=`Syncing to ${Math.floor(o)}s`)}),Dp({roomId:n,sharedVideo:e})}function el(n,e){const t=Gi(),i=zi();!e||!i||!t||(n.data===YT.PlayerState.PLAYING?re.ref(`rooms/${e}/stream`).update({playing:!0,time:t.getCurrentTime()}):n.data===YT.PlayerState.PAUSED&&re.ref(`rooms/${e}/stream`).update({playing:!1,time:t.getCurrentTime()}))}function Np({url:n,sharedVideo:e,syncStatus:t}){if(xn(n)){const i=Qa(n);Ka(i,e,el),t.textContent="Loading YouTube video..."}else Ja(e),e.src=n,t.textContent="Loading shared video...";t.style.background="#2a2a2a"}function Dp({roomId:n,sharedVideo:e}){e.addEventListener("play",()=>{n&&!L.isSyncing&&(L.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({playing:!0,time:e.currentTime}),setTimeout(()=>L.isSyncing=!1,1e3))}),e.addEventListener("pause",()=>{n&&!L.isSyncing&&(L.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({playing:!1,time:e.currentTime}),setTimeout(()=>L.isSyncing=!1,1e3))}),e.addEventListener("seeked",()=>{n&&!L.isSyncing&&(L.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({time:e.currentTime}),setTimeout(()=>L.isSyncing=!1,1e3))}),e.addEventListener("loadeddata",()=>{}),e.addEventListener("waiting",()=>{}),e.addEventListener("playing",()=>{})}const W={isAudioMuted:!1,isVideoOn:!0,currentFacingMode:"user"};function tl(){return W.isAudioMuted}function qi(){return W.isVideoOn}function xp(){return W.currentFacingMode}function Op({localStream:n,muteSelfBtn:e}){const t=n.getAudioTracks()[0];if(t&&(W.isAudioMuted=!W.isAudioMuted,t.enabled=!W.isAudioMuted,e)){const i=e.querySelector("i");i&&(i.className=W.isAudioMuted?"fa fa-microphone":"fa fa-microphone-slash")}}function Mp({localStream:n,videoSelfBtn:e}){const t=n.getVideoTracks()[0];if(t&&(W.isVideoOn=!W.isVideoOn,t.enabled=W.isVideoOn,e)){const i=e.querySelector("i");i&&(i.className=W.isVideoOn?"fa fa-video":"fa fa-video-slash",e.setAttribute("aria-label",W.isVideoOn?"Turn video off":"Turn video on"))}}async function Lp({localStream:n,localVideo:e,peerConnection:t}){const i=W.currentFacingMode==="user"?"environment":"user",s=n.getVideoTracks()[0];try{await s.applyConstraints({facingMode:i}),W.currentFacingMode=i;return}catch(a){console.warn("applyConstraints failed, falling back to getUserMedia:",a)}const r=await navigator.mediaDevices.getUserMedia({video:{facingMode:i},audio:!1}),o=r.getVideoTracks()[0];if(t){const a=t.getSenders().find(l=>l.track&&l.track.kind==="video");a&&a.replaceTrack(o)}n.removeTrack(s),n.addTrack(o),e.srcObject=n,s.stop(),r.getTracks().forEach(a=>{a!==o&&a.stop()}),W.currentFacingMode=i}function Fp(n){n&&(n.isAudioMuted!==void 0&&(W.isAudioMuted=n.isAudioMuted),n.isVideoOn!==void 0&&(W.isVideoOn=n.isVideoOn),n.currentFacingMode&&(W.currentFacingMode=n.currentFacingMode))}function Bp(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Vp(){return Bp()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Wp(){const n=await Vp();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}const Up=async n=>{try{n.requestFullscreen?await n.requestFullscreen():n.webkitRequestFullscreen?await n.webkitRequestFullscreen():n.msRequestFullscreen?await n.msRequestFullscreen():console.warn("Fullscreen API is not supported by this browser.")}catch(e){console.error("Failed to enter fullscreen mode:",e)}},zr=n=>{Up(n)},$p=(n,e)=>{const t=n.srcObject?.getAudioTracks()[0];if(t){t.enabled=!t.enabled;const i=e.querySelector("i");i&&(i.className=t.enabled?"fa fa-volume-mute":"fa fa-volume-up")}},Hp=({localStream:n,muteSelfBtn:e,onStateChange:t})=>{Op({localStream:n,muteSelfBtn:e}),t&&t()},jp=({localStream:n,videoSelfBtn:e,onStateChange:t})=>{Mp({localStream:n,videoSelfBtn:e}),t&&t()},Gp=async({localStream:n,localVideo:e,peerConnection:t,onStateChange:i})=>{await Lp({localStream:n,localVideo:e,peerConnection:t}),i&&i()};async function nl({localVideo:n,remoteVideo:e,muteSelfBtn:t,videoSelfBtn:i,switchCameraSelfBtn:s,fullscreenSelfBtn:r,mutePartnerBtn:o,fullscreenPartnerBtn:a,getLocalStream:l,getPeerConnection:c,onStateChange:u}){t&&t.addEventListener("click",()=>Hp({localStream:l(),muteSelfBtn:t,onStateChange:u})),i&&i.addEventListener("click",()=>jp({localStream:l(),videoSelfBtn:i,onStateChange:u})),s&&(await Wp()?(s.style.display="block",s.addEventListener("click",()=>Gp({localStream:l(),localVideo:n,peerConnection:c(),onStateChange:u}))):s.style.display="none"),r&&r.addEventListener("click",()=>zr(n)),o&&o.addEventListener("click",()=>$p(e,o)),a&&a.addEventListener("click",()=>zr(e))}function Hs({muteSelfBtn:n,videoSelfBtn:e}){if(n){const t=n.querySelector("i");t&&(t.className=tl()?"fa fa-microphone":"fa fa-microphone-slash")}if(e){const t=e.querySelector("i");t&&(t.className=qi()?"fa fa-video":"fa fa-video-slash",e.setAttribute("aria-label",qi()?"Turn video off":"Turn video on"))}}function zp({startChatBtn:n,hangUpBtn:e,copyLinkBtn:t,toggleModeBtn:i,loadStreamBtn:s,pipBtn:r,remoteVideo:o,handleStartChat:a,handleHangUp:l,handleCopyLink:c,handleToggleMode:u,handleLoadStream:d,handlePipToggle:h,updateStatus:m}){document.addEventListener("keydown",_=>{_.altKey&&_.key==="p"&&o.srcObject&&(_.preventDefault(),h())}),n.addEventListener("click",a),e.addEventListener("click",l),t.addEventListener("click",c),i.addEventListener("click",u),s.addEventListener("click",d),r.addEventListener("click",h)}function qp(n,e){let t="Error: Could not access camera/mic.";n.name==="NotAllowedError"?t+=" Permission denied. Please allow access to your camera and microphone.":n.name==="NotFoundError"||n.name==="DevicesNotFoundError"?t+=" No camera or microphone found on this device.":n.name==="NotReadableError"||n.name==="TrackStartError"?t+=" Camera or microphone is already in use by another application.":n.name==="OverconstrainedError"||n.name==="ConstraintNotSatisfiedError"?t+=" The requested media device is not available or does not support the requested constraints.":n.name==="NotSupportedError"?t+=" Your browser or device does not support video/audio capture, or HTTPS is required.":t+=" "+n.message,console.error("Media error:",t,n)}function Yp(n){let e;function t(){n.classList.add("show-controls"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("show-controls")},3e3)}n.addEventListener("touchstart",t,{passive:!0}),n.addEventListener("click",s=>{s.target instanceof Element&&s.target.closest(".hover-controls")||t()});const i=n.querySelector(".hover-controls");i&&(i.addEventListener("mouseenter",()=>clearTimeout(e)),i.addEventListener("touchstart",()=>clearTimeout(e),{passive:!0}),i.addEventListener("click",()=>clearTimeout(e)),i.addEventListener("mouseleave",()=>{e=setTimeout(()=>{n.classList.remove("show-controls")},2e3)}))}async function Qp(n,e){try{return await navigator.clipboard.writeText(n.value),e.textContent="Copied!",setTimeout(()=>e.textContent="Copy Link",2e3),!0}catch(t){return console.error("Failed to copy: ",t),!1}}let ge=null,z=null,Ge=null;function tt(){dn({room:{id:Ws(),role:op(),partnerOnline:ap()}}),Xa(ve.value),z&&z.saveCurrentSession(ge,{getIsAudioMuted:tl,getIsVideoOn:qi,getCurrentFacingMode:xp,getWatchMode:ri,getStreamUrl:Pp})}async function il(){if(z&&Dn())return!0;try{if(z=new wp,z.setCallbacks({onMediaRestore:tm,onConnectionRestore:nm,onUIRestore:im,onStatusUpdate:M}),z.shouldRestoreSession()){M("Detected previous session. Restoring...");try{if((await z.restoreSession()).success)return qr(),!0;try{z.clearSession()}catch(o){console.error("Failed to clear session state:",o)}M("Session restoration failed. Starting fresh...")}catch(r){console.error("Session restoration error:",r);try{await z.clearSession()}catch(o){console.error("Failed to clear session state:",o)}M("Starting fresh...")}}const n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});Us(n),Nt.srcObject=n,await nl({localVideo:Nt,remoteVideo:G,muteSelfBtn:xt,videoSelfBtn:Ot,switchCameraSelfBtn:Yr,fullscreenSelfBtn:Zr,mutePartnerBtn:Jr,fullscreenPartnerBtn:Xr,getLocalStream:Dn,getPeerConnection:$s,onStateChange:tt}),zp({startChatBtn:Te,hangUpBtn:ot,copyLinkBtn:Gs,toggleModeBtn:De,loadStreamBtn:rl,pipBtn:Dt,remoteVideo:G,handleStartChat:Xp,handleHangUp:em,handleCopyLink:async()=>{const r=await Qp(Mn,Gs);M(r?"Link copied!":"Please copy manually.")},handleToggleMode:oi,handleLoadStream:sm,handlePipToggle:()=>bp(G,Dt,M),updateStatus:M});const t=new URLSearchParams(window.location.search).get("room"),i=un(),s=Kp({urlRoomId:t,savedState:i});return s.action==="join"?(M("Connecting..."),Te.style.display="none",Jp(i),await Zp(s.roomId)):M("Ready. Click to generate video chat link."),qr(),!0}catch(n){return qp(n),!1}}function Kp({urlRoomId:n,savedState:e}){const t=n;return t?{action:"join",roomId:t}:{action:"idle"}}function Jp(n){n&&(Fp(n),up(n),Hs({muteSelfBtn:xt,videoSelfBtn:Ot}),n.watchMode&&!ri()&&(oi(),n.streamUrl&&(ve.value=n.streamUrl)))}function js(n){G.srcObject!==n&&(G.srcObject=n,Dt.style.display="block",Tp(G,Dt),tt(),M("Received video stream. Validating..."),G.paused&&G.srcObject&&G.play().catch(e=>{}),ge||(ge=new Cp({videoValidationTimeout:1e4,maxRetries:3,retryDelay:2e3}),ge.setCallbacks({onStatusUpdate:M,onConnectionStateChange:(e,t)=>{},onValidationComplete:e=>{e.success||console.warn("Video stream validation failed:",e.error)}})),ge.startMonitoring(G,$s()))}async function Xp(){if(!(Ws()||Te.disabled))try{if(!await il()){console.error("Failed to initialize media devices.");return}const{roomId:e,shareUrl:t}=await lp({onRemoteStream:js,onStatusUpdate:M});Mn.value=t,hn.style.display="block",Te.disabled=!0,ot.disabled=!1,Za({roomId:e,sharedVideo:Qt,streamUrlInput:ve,syncStatus:Kt}),De.style.display="block",On(),tt()}catch(n){console.error("Failed to initiate chat room:",n),Te.disabled=!1,hn.style.display="none"}}async function Zp(n){(await za({roomId:n,onRemoteStream:js,onStatusUpdate:M})).success&&(Za({roomId:n,sharedVideo:Qt,streamUrlInput:ve,syncStatus:Kt}),De.style.display="block",ot.disabled=!1,On(),tt())}async function em(){if(Rp(Dt),ge){try{ge.cleanup()}catch{}ge=null}if(z){try{z.clearSession()}catch{}z=null}if(Ge){try{Ge()}catch{}Ge=null}G.srcObject&&(G.srcObject.getTracks().forEach(e=>e.stop()),G.srcObject=null);const n=Dn();n&&(n.getTracks().forEach(e=>e.stop()),Nt.srcObject=null,Us(null)),await cp({onStatusUpdate:M}),Te.disabled=!1,Te.style.display="block",ot.disabled=!0,hn.style.display="none",De.style.display="none",Qr.style.display="none",Kr.style.display="flex",Mn.value="",Qt.src="",ve.value="",Kt.textContent="",rm(),window.history.replaceState({},document.title,window.location.pathname),it()}function M(n,e=ol){e.textContent=n}function qr(){Ge&&(Ge(),Ge=null),z&&(Ge=z.setupAutoSave(()=>ge))}async function tm({isAudioMuted:n,isVideoOn:e,currentFacingMode:t}){try{const i={video:e?{facingMode:t}:!1,audio:!0},s=await navigator.mediaDevices.getUserMedia(i);return Us(s),Nt.srcObject=s,await nl({localVideo:Nt,remoteVideo:G,muteSelfBtn:xt,videoSelfBtn:Ot,switchCameraSelfBtn:Yr,fullscreenSelfBtn:Zr,mutePartnerBtn:Jr,fullscreenPartnerBtn:Xr,getLocalStream:Dn,getPeerConnection:$s,onStateChange:tt}),Hs({muteSelfBtn:xt,videoSelfBtn:Ot}),{success:!0}}catch(i){return console.error("Failed to restore media devices:",i),{success:!1,error:i.message}}}async function nm({roomId:n,role:e,isInitiator:t,wasConnected:i}){try{if(e==="initiator"||e===void 0&&t)return M("Session restored. Share the link to reconnect with your partner."),Mn.value=`${window.location.origin}${window.location.pathname}?room=${n}`,hn.style.display="block",Te.disabled=!0,ot.disabled=!1,De.style.display="block",On(),{success:!0};if(M("Reconnecting to room..."),(await za({roomId:n,onRemoteStream:js,onStatusUpdate:M})).success)return ot.disabled=!1,De.style.display="block",On(),{success:!0};throw new Error("Failed to rejoin room")}catch(s){return console.error("Failed to restore connection:",s),{success:!1,error:s.message}}}function im({isAudioMuted:n,isVideoOn:e,watchMode:t,streamUrl:i}){try{t&&!ri()&&De&&oi(),i&&(Xa(i),ve&&(ve.value=i)),Hs({muteSelfBtn:xt,videoSelfBtn:Ot})}catch(s){console.error("Failed to restore UI state:",s)}}function oi(){kp({videoContainer:Kr,watchContainer:Qr,toggleModeBtn:De,sharedVideo:Qt,streamUrlInput:ve,syncStatus:Kt}),sl(),tt()}function sm(){const n=ve.value.trim();Ap({roomId:Ws(),url:n,sharedVideo:Qt,syncStatus:Kt}),tt()}function On(){fn.href="#",fn.onclick=n=>{n.preventDefault(),oi()},sl()}function rm(){fn.href="https://kristinnroach.github.io/HangVidU/",fn.onclick=null,eo.textContent="HangVidU"}function sl(){eo.textContent=ri()?"Switch to Video Chat":"Switch to Watch Mode"}document.querySelectorAll(".video-wrapper").forEach(Yp);il();
