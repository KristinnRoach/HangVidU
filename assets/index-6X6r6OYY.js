(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const di=document.getElementById("localVideo"),Q=document.getElementById("remoteVideo"),zt=document.getElementById("sharedVideo"),ze=document.getElementById("startChat"),Tn=document.getElementById("hangUp"),Vs=document.getElementById("copyLink"),Pt=document.getElementById("pipBtn"),Xa=document.getElementById("switchCameraSelfBtn"),Hr=document.getElementById("toggleMode"),Za=document.getElementById("loadStream"),el=document.getElementById("status"),hi=document.getElementById("linkContainer"),zr=document.getElementById("watchContainer"),jr=document.querySelector(".video-container"),jt=document.getElementById("syncStatus"),$i=document.getElementById("shareLink"),dt=document.getElementById("streamUrl"),tl=document.getElementById("mutePartnerBtn"),nl=document.getElementById("fullscreenPartnerBtn"),il=document.getElementById("muteSelfBtn"),sl=document.getElementById("videoSelfBtn"),rl=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");const qr=document.getElementById("titleLink");document.getElementById("titleText");const Gr="hangvidu_session",ol=1440*60*1e3;function al(){const n=localStorage.getItem(Gr);if(!n)return null;try{const e=JSON.parse(n);return Date.now()-e.timestamp>ol?(fi(),null):e}catch(e){return console.error("Failed to parse stored state:",e),fi(),null}}function fi(){localStorage.removeItem(Gr)}/**
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
 */const ll=()=>{};var Ws={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw ht(e)},ht=function(n){return new Error("Firebase Database ("+Yr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},cl=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Hi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,m=c&63;l||(m=64,o||(h=64)),i.push(t[d],t[u],t[h],t[m])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Qr(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):cl(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new ul;const h=r<<2|a>>4;if(i.push(h),c!==64){const m=a<<4&240|c>>2;if(i.push(m),u!==64){const _=c<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ul extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Kr=function(n){const e=Qr(n);return Hi.encodeByteArray(e,!0)},ln=function(n){return Kr(n).replace(/\./g,"")},cn=function(n){try{return Hi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(n){return kt(void 0,n)}function kt(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!hl(t)||(n[t]=kt(n[t],e[t]));return n}function hl(n){return n!=="__proto__"}/**
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
 */function Jr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fl=()=>Jr().__FIREBASE_DEFAULTS__,pl=()=>{if(typeof process>"u"||typeof Ws>"u")return;const n=Ws.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ml=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&cn(n[1]);return e&&JSON.parse(e)},_l=()=>{try{return ll()||fl()||pl()||ml()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},zi=()=>_l()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function ji(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gl(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function yl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[ln(JSON.stringify(t)),ln(JSON.stringify(o)),""].join(".")}const Et={};function vl(){const n={prod:[],emulator:[]};for(const e of Object.keys(Et))Et[e]?n.emulator.push(e):n.prod.push(e);return n}function Cl(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Us=!1;function wl(n,e){if(typeof window>"u"||typeof document>"u"||!ji(window.location.host)||Et[n]===e||Et[n]||Us)return;Et[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=vl().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,m){h.setAttribute("width","24"),h.setAttribute("id",m),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Us=!0,o()},h}function d(h,m){h.setAttribute("id",m),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=Cl(i),m=t("text"),_=document.getElementById(m)||document.createElement("span"),E=t("learnmore"),L=document.getElementById(E)||document.createElement("a"),me=t("preprendIcon"),_e=document.getElementById(me)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const Ve=h.element;a(Ve),d(L,E);const Xn=c();l(_e,me),Ve.append(_e,_,L,Xn),document.body.appendChild(Ve)}r?(_.innerText="Preview backend disconnected.",_e.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(_e.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",u):u()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Xr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(bl())}function El(){return typeof window<"u"||Zr()}function Zr(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function Sl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Il(){return Yr.NODE_ADMIN===!0}function Tl(){try{return typeof indexedDB=="object"}catch{return!1}}function Rl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl="FirebaseError";class ft extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Pl,Object.setPrototypeOf(this,ft.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Rn.prototype.create)}}class Rn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?kl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new ft(s,a,i)}}function kl(n,e){return n.replace(Al,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Al=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(n){return JSON.parse(n)}function M(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=At(cn(r[0])||""),t=At(cn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Nl=function(n){const e=eo(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Dl=function(n){const e=eo(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function qe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function pi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function un(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function dn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if($s(r)&&$s(o)){if(!dn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function $s(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ll(n,e){const t=new Ml(n,e);return t.subscribe.bind(t)}class Ml{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Fl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Zn),s.error===void 0&&(s.error=Zn),s.complete===void 0&&(s.complete=Zn);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Zn(){}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v=function(n,e,t,i){let s;if(i<e?s="at least "+e:i>t&&(s=t===0?"none":"no more than "+t),s){const r=n+" failed: Was called with "+i+(i===1?" argument.":" arguments.")+" Expects "+s+".";throw new Error(r)}};function G(n,e){return`${n} failed: ${e} argument `}function B(n,e,t,i){if(!(i&&!t)&&typeof t!="function")throw new Error(G(n,e)+"must be a valid function.")}function Hs(n,e,t,i){if(t&&(typeof t!="object"||t===null))throw new Error(G(n,e)+"must be a valid context object.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Pn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ee(n){return n&&n._delegate?n._delegate:n}class we{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const We="[DEFAULT]";/**
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
 */class mi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new j;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wl(e))try{this.getOrInitializeService({instanceIdentifier:We})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=We){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=We){return this.instances.has(e)}getOptions(e=We){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Vl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=We){return this.component?this.component.multipleInstances?e:We:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Vl(n){return n===We?void 0:n}function Wl(n){return n.instantiationMode==="EAGER"}/**
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
 */class qi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new mi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=[];var T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));const to={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Ul=T.INFO,$l={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},Hl=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=$l[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class kn{constructor(e){this.name=e,this._logLevel=Ul,this._logHandler=Hl,this._userLogHandler=null,Gi.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in T))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?to[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...e),this._logHandler(this,T.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...e),this._logHandler(this,T.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,T.INFO,...e),this._logHandler(this,T.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,T.WARN,...e),this._logHandler(this,T.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...e),this._logHandler(this,T.ERROR,...e)}}function zl(n){Gi.forEach(e=>{e.setLogLevel(n)})}function jl(n,e){for(const t of Gi){let i=null;e&&e.level&&(i=to[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(s,r,...o)=>{const a=o.map(l=>{if(l==null)return null;if(typeof l=="string")return l;if(typeof l=="number"||typeof l=="boolean")return l.toString();if(l instanceof Error)return l.message;try{return JSON.stringify(l)}catch{return null}}).filter(l=>l).join(" ");r>=(i??s.logLevel)&&n({level:T[r].toLowerCase(),message:a,args:o,type:s.name})}}}const ql=(n,e)=>e.some(t=>n instanceof t);let zs,js;function Gl(){return zs||(zs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Yl(){return js||(js=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const no=new WeakMap,_i=new WeakMap,io=new WeakMap,ei=new WeakMap,Yi=new WeakMap;function Ql(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Te(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&no.set(t,n)}).catch(()=>{}),Yi.set(e,n),e}function Kl(n){if(_i.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});_i.set(n,e)}let gi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return _i.get(n);if(e==="objectStoreNames")return n.objectStoreNames||io.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Te(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Jl(n){gi=n(gi)}function Xl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ti(this),e,...t);return io.set(i,e.sort?e.sort():[e]),Te(i)}:Yl().includes(n)?function(...e){return n.apply(ti(this),e),Te(no.get(this))}:function(...e){return Te(n.apply(ti(this),e))}}function Zl(n){return typeof n=="function"?Xl(n):(n instanceof IDBTransaction&&Kl(n),ql(n,Gl())?new Proxy(n,gi):n)}function Te(n){if(n instanceof IDBRequest)return Ql(n);if(ei.has(n))return ei.get(n);const e=Zl(n);return e!==n&&(ei.set(n,e),Yi.set(e,n)),e}const ti=n=>Yi.get(n);function ec(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Te(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Te(o.result),l.oldVersion,l.newVersion,Te(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const tc=["get","getKey","getAll","getAllKeys","count"],nc=["put","add","delete","clear"],ni=new Map;function qs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ni.get(e))return ni.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=nc.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||tc.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return ni.set(e,r),r}Jl(n=>({...n,get:(e,t,i)=>qs(e,t)||n.get(e,t,i),has:(e,t)=>!!qs(e,t)||n.has(e,t)}));/**
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
 */class ic{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(sc(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function sc(n){return n.getComponent()?.type==="VERSION"}const hn="@firebase/app",yi="0.14.4";/**
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
 */const be=new kn("@firebase/app"),rc="@firebase/app-compat",oc="@firebase/analytics-compat",ac="@firebase/analytics",lc="@firebase/app-check-compat",cc="@firebase/app-check",uc="@firebase/auth",dc="@firebase/auth-compat",hc="@firebase/database",fc="@firebase/data-connect",pc="@firebase/database-compat",mc="@firebase/functions",_c="@firebase/functions-compat",gc="@firebase/installations",yc="@firebase/installations-compat",vc="@firebase/messaging",Cc="@firebase/messaging-compat",wc="@firebase/performance",bc="@firebase/performance-compat",Ec="@firebase/remote-config",Sc="@firebase/remote-config-compat",Ic="@firebase/storage",Tc="@firebase/storage-compat",Rc="@firebase/firestore",Pc="@firebase/ai",kc="@firebase/firestore-compat",Ac="firebase",Nc="12.4.0";/**
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
 */const Ne="[DEFAULT]",Dc={[hn]:"fire-core",[rc]:"fire-core-compat",[ac]:"fire-analytics",[oc]:"fire-analytics-compat",[cc]:"fire-app-check",[lc]:"fire-app-check-compat",[uc]:"fire-auth",[dc]:"fire-auth-compat",[hc]:"fire-rtdb",[fc]:"fire-data-connect",[pc]:"fire-rtdb-compat",[mc]:"fire-fn",[_c]:"fire-fn-compat",[gc]:"fire-iid",[yc]:"fire-iid-compat",[vc]:"fire-fcm",[Cc]:"fire-fcm-compat",[wc]:"fire-perf",[bc]:"fire-perf-compat",[Ec]:"fire-rc",[Sc]:"fire-rc-compat",[Ic]:"fire-gcs",[Tc]:"fire-gcs-compat",[Rc]:"fire-fst",[kc]:"fire-fst-compat",[Pc]:"fire-vertex","fire-js":"fire-js",[Ac]:"fire-js-all"};/**
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
 */const De=new Map,it=new Map,st=new Map;function Nt(n,e){try{n.container.addComponent(e)}catch(t){be.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function so(n,e){n.container.addOrOverwriteComponent(e)}function rt(n){const e=n.name;if(st.has(e))return be.debug(`There were multiple attempts to register component ${e}.`),!1;st.set(e,n);for(const t of De.values())Nt(t,n);for(const t of it.values())Nt(t,n);return!0}function ro(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function xc(n,e,t=Ne){ro(n,e).clearInstance(t)}function Qi(n){return n.options!==void 0}function oo(n){return Qi(n)?!1:"authIdToken"in n||"appCheckToken"in n||"releaseOnDeref"in n||"automaticDataCollectionEnabled"in n}function ao(n){return n==null?!1:n.settings!==void 0}function Oc(){st.clear()}/**
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
 */const Lc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},J=new Rn("app","Firebase",Lc);/**
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
 */let lo=class{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new we("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw J.create("app-deleted",{appName:this._name})}};/**
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
 */function Gs(n,e){const t=cn(n.split(".")[1]);if(t===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(t).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const s=JSON.parse(t).exp*1e3,r=new Date().getTime();s-r<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class Mc extends lo{constructor(e,t,i,s){const r=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!0,o={name:i,automaticDataCollectionEnabled:r};if(e.apiKey!==void 0)super(e,o,s);else{const a=e;super(a.options,o,s)}this._serverConfig={automaticDataCollectionEnabled:r,...t},this._serverConfig.authIdToken&&Gs(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&Gs(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,ve(hn,yi,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){Xi(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw J.create("server-app-deleted")}}/**
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
 */const Ki=Nc;function Ji(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Ne,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw J.create("bad-app-name",{appName:String(s)});if(t||(t=zi()),!t)throw J.create("no-options");const r=De.get(s);if(r){if(dn(t,r.options)&&dn(i,r.config))return r;throw J.create("duplicate-app",{appName:s})}const o=new qi(s);for(const l of st.values())o.addComponent(l);const a=new lo(t,i,o);return De.set(s,a),a}function Fc(n,e={}){if(El()&&!Zr())throw J.create("invalid-server-app-environment");let t,i=e||{};if(n&&(Qi(n)?t=n.options:oo(n)?i=n:t=n),i.automaticDataCollectionEnabled===void 0&&(i.automaticDataCollectionEnabled=!0),t||(t=zi()),!t)throw J.create("no-options");const s={...i,...t};s.releaseOnDeref!==void 0&&delete s.releaseOnDeref;const r=d=>[...d].reduce((u,h)=>Math.imul(31,u)+h.charCodeAt(0)|0,0);if(i.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw J.create("finalization-registry-not-supported",{});const o=""+r(JSON.stringify(s)),a=it.get(o);if(a)return a.incRefCount(i.releaseOnDeref),a;const l=new qi(o);for(const d of st.values())l.addComponent(d);const c=new Mc(t,i,o,l);return it.set(o,c),c}function Bc(n=Ne){const e=De.get(n);if(!e&&n===Ne&&zi())return Ji();if(!e)throw J.create("no-app",{appName:n});return e}function Vc(){return Array.from(De.values())}async function Xi(n){let e=!1;const t=n.name;De.has(t)?(e=!0,De.delete(t)):it.has(t)&&n.decRefCount()<=0&&(it.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(i=>i.delete())),n.isDeleted=!0)}function ve(n,e,t){let i=Dc[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),be.warn(o.join(" "));return}rt(new we(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function co(n,e){if(n!==null&&typeof n!="function")throw J.create("invalid-log-argument");jl(n,e)}function uo(n){zl(n)}/**
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
 */const Wc="firebase-heartbeat-database",Uc=1,Dt="firebase-heartbeat-store";let ii=null;function ho(){return ii||(ii=ec(Wc,Uc,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Dt)}catch(t){console.warn(t)}}}}).catch(n=>{throw J.create("idb-open",{originalErrorMessage:n.message})})),ii}async function $c(n){try{const t=(await ho()).transaction(Dt),i=await t.objectStore(Dt).get(fo(n));return await t.done,i}catch(e){if(e instanceof ft)be.warn(e.message);else{const t=J.create("idb-get",{originalErrorMessage:e?.message});be.warn(t.message)}}}async function Ys(n,e){try{const i=(await ho()).transaction(Dt,"readwrite");await i.objectStore(Dt).put(e,fo(n)),await i.done}catch(t){if(t instanceof ft)be.warn(t.message);else{const i=J.create("idb-set",{originalErrorMessage:t?.message});be.warn(i.message)}}}function fo(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Hc=1024,zc=30;class jc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Gc(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Qs();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>zc){const s=Yc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){be.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Qs(),{heartbeatsToSend:t,unsentEntries:i}=qc(this._heartbeatsCache.heartbeats),s=ln(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return be.warn(e),""}}}function Qs(){return new Date().toISOString().substring(0,10)}function qc(n,e=Hc){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Ks(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ks(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Gc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Tl()?Rl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $c(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ys(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Ys(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ks(n){return ln(JSON.stringify({version:2,heartbeats:n})).length}function Yc(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Qc(n){rt(new we("platform-logger",e=>new ic(e),"PRIVATE")),rt(new we("heartbeat",e=>new jc(e),"PRIVATE")),ve(hn,yi,n),ve(hn,yi,"esm2020"),ve("fire-js","")}Qc("");const Kc=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:ft,SDK_VERSION:Ki,_DEFAULT_ENTRY_NAME:Ne,_addComponent:Nt,_addOrOverwriteComponent:so,_apps:De,_clearComponents:Oc,_components:st,_getProvider:ro,_isFirebaseApp:Qi,_isFirebaseServerApp:ao,_isFirebaseServerAppSettings:oo,_registerComponent:rt,_removeServiceInstance:xc,_serverApps:it,deleteApp:Xi,getApp:Bc,getApps:Vc,initializeApp:Ji,initializeServerApp:Fc,onLog:co,registerVersion:ve,setLogLevel:uo},Symbol.toStringTag,{value:"Module"}));/**
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
 */class Jc{constructor(e,t){this._delegate=e,this.firebase=t,Nt(e,new we("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),Xi(this._delegate)))}_getService(e,t=Ne){this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&i.getComponent()?.instantiationMode==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:t})}_removeServiceInstance(e,t=Ne){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){Nt(this._delegate,e)}_addOrOverwriteComponent(e){so(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
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
 */const Xc={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},Js=new Rn("app-compat","Firebase",Xc);/**
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
 */function Zc(n){const e={},t={__esModule:!0,initializeApp:r,app:s,registerVersion:ve,setLogLevel:uo,onLog:co,apps:null,SDK_VERSION:Ki,INTERNAL:{registerComponent:a,removeApp:i,useAsService:l,modularAPIs:Kc}};t.default=t,Object.defineProperty(t,"apps",{get:o});function i(c){delete e[c]}function s(c){if(c=c||Ne,!X(e,c))throw Js.create("no-app",{appName:c});return e[c]}s.App=n;function r(c,d={}){const u=Ji(c,d);if(X(e,u.name))return e[u.name];const h=new n(u,t);return e[u.name]=h,h}function o(){return Object.keys(e).map(c=>e[c])}function a(c){const d=c.name,u=d.replace("-compat","");if(rt(c)&&c.type==="PUBLIC"){const h=(m=s())=>{if(typeof m[u]!="function")throw Js.create("invalid-app-argument",{appName:d});return m[u]()};c.serviceProps!==void 0&&kt(h,c.serviceProps),t[u]=h,n.prototype[u]=function(...m){return this._getService.bind(this,d).apply(this,c.multipleInstances?m:[])}}return c.type==="PUBLIC"?t[u]:null}function l(c,d){return d==="serverAuth"?null:d}return t}/**
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
 */function po(){const n=Zc(Jc);n.INTERNAL={...n.INTERNAL,createFirebaseNamespace:po,extendNamespace:e,createSubscribe:Ll,ErrorFactory:Rn,deepExtend:kt};function e(t){kt(n,t)}return n}const eu=po();/**
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
 */const Xs=new kn("@firebase/app-compat"),tu="@firebase/app-compat",nu="0.5.4";/**
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
 */function iu(n){ve(tu,nu,n)}/**
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
 */try{const n=Jr();if(n.firebase!==void 0){Xs.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=n.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&Xs.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const xt=eu;iu();var su="firebase",ru="12.4.0";/**
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
 */xt.registerVersion(su,ru,"app-compat");var Zs={};const er="@firebase/database",tr="1.1.0";/**
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
 */let mo="";function _o(n){mo=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),M(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:At(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return X(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const go=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ou(e)}}catch{}return new au},$e=go("localStorage"),vi=go("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt=new kn("@firebase/database"),yo=(function(){let n=1;return function(){return n++}})(),vo=function(n){const e=Bl(n),t=new Ol;t.update(e);const i=t.digest();return Hi.encodeByteArray(i)},qt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=qt.apply(null,i):typeof i=="object"?e+=M(i):e+=i,e+=" "}return e};let je=null,nr=!0;const Co=function(n,e){p(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(tt.logLevel=T.VERBOSE,je=tt.log.bind(tt),e&&vi.set("logging_enabled",!0)):typeof n=="function"?je=n:(je=null,vi.remove("logging_enabled"))},W=function(...n){if(nr===!0&&(nr=!1,je===null&&vi.get("logging_enabled")===!0&&Co(!0)),je){const e=qt.apply(null,n);je(e)}},Gt=function(n){return function(...e){W(n,...e)}},Ci=function(...n){const e="FIREBASE INTERNAL ERROR: "+qt(...n);tt.error(e)},fe=function(...n){const e=`FIREBASE FATAL ERROR: ${qt(...n)}`;throw tt.error(e),new Error(e)},H=function(...n){const e="FIREBASE WARNING: "+qt(...n);tt.warn(e)},lu=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&H("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},An=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},cu=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},xe="[MIN_NAME]",Ee="[MAX_NAME]",Je=function(n,e){if(n===e)return 0;if(n===xe||e===Ee)return-1;if(e===xe||n===Ee)return 1;{const t=ir(n),i=ir(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},uu=function(n,e){return n===e?0:n<e?-1:1},vt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+M(e))},Zi=function(n){if(typeof n!="object"||n===null)return M(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=M(e[i]),t+=":",t+=Zi(n[e[i]]);return t+="}",t},wo=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function U(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const bo=function(n){p(!An(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},du=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},hu=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fu(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const pu=new RegExp("^-?(0*)\\d{1,10}$"),mu=-2147483648,_u=2147483647,ir=function(n){if(pu.test(n)){const e=Number(n);if(e>=mu&&e<=_u)return e}return null},pt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw H("Exception was thrown by user callback.",t),e},Math.floor(0))}},gu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},St=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class yu{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ao(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){H(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(W("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',H(e)}}class nt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}nt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es="5",Eo="v",So="s",Io="r",To="f",Ro=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Po="ls",ko="p",wi="ac",Ao="websocket",No="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=$e.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&$e.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Cu(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function xo(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===Ao)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===No)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Cu(n)&&(t.ns=n.namespace);const s=[];return U(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(){this.counters_={}}incrementCounter(e,t=1){X(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return dl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const si={},ri={};function ts(n){const e=n.toString();return si[e]||(si[e]=new wu),si[e]}function bu(n,e){const t=n.toString();return ri[t]||(ri[t]=e()),ri[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&pt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sr="start",Su="close",Iu="pLPCommand",Tu="pRTLPCB",Oo="id",Lo="pw",Mo="ser",Ru="cb",Pu="seg",ku="ts",Au="d",Nu="dframe",Fo=1870,Bo=30,Du=Fo-Bo,xu=25e3,Ou=3e4;class Se{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Gt(e),this.stats_=ts(t),this.urlFn=l=>(this.appCheckToken&&(l[wi]=this.appCheckToken),xo(t,No,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Eu(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ou)),cu(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ns((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===sr)this.id=a,this.password=l;else if(o===Su)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[sr]="t",i[Mo]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Ru]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Eo]=es,this.transportSessionId&&(i[So]=this.transportSessionId),this.lastSessionId&&(i[Po]=this.lastSessionId),this.applicationId&&(i[ko]=this.applicationId),this.appCheckToken&&(i[wi]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ro.test(location.hostname)&&(i[Io]=To);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Se.forceAllow_=!0}static forceDisallow(){Se.forceDisallow_=!0}static isAvailable(){return Se.forceAllow_?!0:!Se.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!du()&&!hu()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Kr(t),s=wo(i,Du);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Nu]="t",i[Oo]=e,i[Lo]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=M(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ns{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=yo(),window[Iu+this.uniqueCallbackIdentifier]=e,window[Tu+this.uniqueCallbackIdentifier]=t,this.myIFrame=ns.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){W("frame writing exception"),a.stack&&W(a.stack),W(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||W("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Oo]=this.myID,e[Lo]=this.myPW,e[Mo]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Bo+i.length<=Fo;){const o=this.pendingSegs.shift();i=i+"&"+Pu+s+"="+o.seg+"&"+ku+s+"="+o.ts+"&"+Au+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(xu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{W("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=16384,Mu=45e3;let fn=null;typeof MozWebSocket<"u"?fn=MozWebSocket:typeof WebSocket<"u"&&(fn=WebSocket);class te{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Gt(this.connId),this.stats_=ts(t),this.connURL=te.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Eo]=es,typeof location<"u"&&location.hostname&&Ro.test(location.hostname)&&(o[Io]=To),t&&(o[So]=t),i&&(o[Po]=i),s&&(o[wi]=s),r&&(o[ko]=r),xo(e,Ao,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,$e.set("previous_websocket_failure",!0);try{let i;Il(),this.mySock=new fn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){te.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&fn!==null&&!te.forceDisallow_}static previouslyFailed(){return $e.isInMemoryStorage||$e.get("previous_websocket_failure")===!0}markConnectionHealthy(){$e.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=At(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=wo(t,Lu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Mu))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}te.responsesRequiredToBeHealthy=2;te.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{static get ALL_TRANSPORTS(){return[Se,te]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=te&&te.isAvailable();let i=t&&!te.previouslyFailed();if(e.webSocketOnly&&(t||H("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[te];else{const s=this.transports_=[];for(const r of ot.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ot.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ot.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=6e4,Bu=5e3,Vu=10*1024,Wu=100*1024,oi="t",rr="d",Uu="s",or="r",$u="e",ar="o",lr="a",cr="n",ur="p",Hu="h";class zu{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Gt("c:"+this.id+":"),this.transportManager_=new ot(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=St(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Wu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Vu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(oi in e){const t=e[oi];t===lr?this.upgradeIfSecondaryHealthy_():t===or?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ar&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=vt("t",e),i=vt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ur,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:lr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:cr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=vt("t",e),i=vt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=vt(oi,e);if(rr in e){const i=e[rr];if(t===Hu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===cr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Uu?this.onConnectionShutdown_(i):t===or?this.onReset_(i):t===$u?Ci("Server Error: "+i):t===ar?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ci("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),es!==i&&H("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),St(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Fu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):St(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Bu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ur,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&($e.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn extends Wo{static getInstance(){return new pn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Xr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr=32,hr=768;class I{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function S(){return new I("")}function C(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Oe(n){return n.pieces_.length-n.pieceNum_}function R(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new I(n.pieces_,e)}function is(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function ju(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ot(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Uo(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new I(e,0)}function N(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new I(t,0)}function w(n){return n.pieceNum_>=n.pieces_.length}function z(n,e){const t=C(n),i=C(e);if(t===null)return e;if(t===i)return z(R(n),R(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function qu(n,e){const t=Ot(n,0),i=Ot(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Je(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function ss(n,e){if(Oe(n)!==Oe(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function ie(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Oe(n)>Oe(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Gu{constructor(e,t){this.errorPrefix_=t,this.parts_=Ot(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Pn(this.parts_[i]);$o(this)}}function Yu(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Pn(e),$o(n)}function Qu(n){const e=n.parts_.pop();n.byteLength_-=Pn(e),n.parts_.length>0&&(n.byteLength_-=1)}function $o(n){if(n.byteLength_>hr)throw new Error(n.errorPrefix_+"has a key path longer than "+hr+" bytes ("+n.byteLength_+").");if(n.parts_.length>dr)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+dr+") or object contains a cycle "+Ue(n))}function Ue(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs extends Wo{static getInstance(){return new rs}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=1e3,Ku=300*1e3,fr=30*1e3,Ju=1.3,Xu=3e4,Zu="server_kill",pr=3;class Ce extends Vo{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ce.nextPersistentConnectionId_++,this.log_=Gt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ct,this.maxReconnectDelay_=Ku,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");rs.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&pn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(M(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new j,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ce.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&X(e,"w")){const i=qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();H(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Dl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=fr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Nl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+M(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ci("Unrecognized action received from server: "+M(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Xu&&(this.reconnectDelay_=Ct),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ju)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Ce.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?W("getToken() completed but was canceled"):(W("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new zu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,m=>{H(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(Zu)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&H(u),l())}}}interrupt(e){W("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){W("Resuming connection for reason: "+e),delete this.interruptReasons_[e],pi(this.interruptReasons_)&&(this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Zi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){W("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=pr&&(this.reconnectDelay_=fr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){W("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=pr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+mo.replace(/\./g,"-")]=1,Xr()?e["framework.cordova"]=1:Sl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=pn.getInstance().currentlyOnline();return pi(this.interruptReasons_)&&e}}Ce.nextPersistentConnectionId_=0;Ce.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new b(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new b(xe,e),s=new b(xe,t);return this.compare(i,s)!==0}minPost(){return b.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sn;class Ho extends Nn{static get __EMPTY_NODE(){return sn}static set __EMPTY_NODE(e){sn=e}compare(e,t){return Je(e.name,t.name)}isDefinedOn(e){throw ht("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return b.MIN}maxPost(){return new b(Ee,sn)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new b(e,sn)}toString(){return".key"}}const he=new Ho;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class V{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??V.RED,this.left=s??q.EMPTY_NODE,this.right=r??q.EMPTY_NODE}copy(e,t,i,s,r){return new V(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,V.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,V.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}V.RED=!0;V.BLACK=!1;class ed{copy(e,t,i,s,r){return this}insert(e,t,i){return new V(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class q{constructor(e,t=q.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new q(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,V.BLACK,null,null))}remove(e){return new q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,V.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new rn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new rn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new rn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new rn(this.root_,null,this.comparator_,!0,e)}}q.EMPTY_NODE=new ed;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function td(n,e){return Je(n.name,e.name)}function os(n,e){return Je(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bi;function nd(n){bi=n}const zo=function(n){return typeof n=="number"?"number:"+bo(n):"string:"+n},jo=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&X(e,".sv"),"Priority must be a string or number.")}else p(n===bi||n.isEmpty(),"priority of unexpected type.");p(n===bi||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mr;class F{static set __childrenNodeConstructor(e){mr=e}static get __childrenNodeConstructor(){return mr}constructor(e,t=F.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),jo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new F(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return w(e)?this:C(e)===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:F.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=C(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Oe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,F.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+zo(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=bo(this.value_):e+=this.value_,this.lazyHash_=vo(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===F.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof F.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=F.VALUE_TYPE_ORDER.indexOf(t),r=F.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}F.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qo,Go;function id(n){qo=n}function sd(n){Go=n}class rd extends Nn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Je(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return b.MIN}maxPost(){return new b(Ee,new F("[PRIORITY-POST]",Go))}makePost(e,t){const i=qo(e);return new b(t,new F("[PRIORITY-POST]",i))}toString(){return".priority"}}const k=new rd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=Math.log(2);class ad{constructor(e){const t=r=>parseInt(Math.log(r)/od,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mn=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new V(h,u.node,V.BLACK,null,null);{const m=parseInt(d/2,10)+l,_=s(l,m),E=s(m+1,c);return u=n[m],h=t?t(u):u,new V(h,u.node,V.BLACK,_,E)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,E){const L=u-_,me=u;u-=_;const _e=s(L+1,me),Ve=n[L],Xn=t?t(Ve):Ve;m(new V(Xn,Ve.node,E,null,_e))},m=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const E=l.nextBitIsOne(),L=Math.pow(2,l.count-(_+1));E?h(L,V.BLACK):(h(L,V.BLACK),h(L,V.RED))}return d},o=new ad(n.length),a=r(o);return new q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ai;const et={};class ge{static get Default(){return p(et&&k,"ChildrenNode.ts has not been loaded"),ai=ai||new ge({".priority":et},{".priority":k}),ai}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=qe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof q?t:null}hasIndex(e){return X(this.indexSet_,e.toString())}addIndex(e,t){p(e!==he,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(b.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=mn(i,e.getCompare()):a=et;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new ge(d,c)}addToIndexes(e,t){const i=un(this.indexes_,(s,r)=>{const o=qe(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===et)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(b.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),mn(a,o.getCompare())}else return et;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new b(e.name,a))),l.insert(e,e.node)}});return new ge(i,this.indexSet_)}removeFromIndexes(e,t){const i=un(this.indexes_,s=>{if(s===et)return s;{const r=t.get(e.name);return r?s.remove(new b(e.name,r)):s}});return new ge(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wt;class y{static get EMPTY_NODE(){return wt||(wt=new y(new q(os),null,ge.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&jo(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||wt}updatePriority(e){return this.children_.isEmpty()?this:new y(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?wt:t}}getChild(e){const t=C(e);return t===null?this:this.getImmediateChild(t).getChild(R(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new b(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?wt:this.priorityNode_;return new y(s,o,r)}}updateChild(e,t){const i=C(e);if(i===null)return t;{p(C(e)!==".priority"||Oe(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(R(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(k,(o,a)=>{t[o]=a.val(e),i++,r&&y.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+zo(this.getPriority().val())+":"),this.forEachChild(k,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":vo(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new b(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new b(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new b(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,b.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,b.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Yt?-1:0}withIndex(e){if(e===he||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new y(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===he||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(k),s=t.getIterator(k);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===he?null:this.indexMap_.get(e.toString())}}y.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ld extends y{constructor(){super(new q(os),y.EMPTY_NODE,ge.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return y.EMPTY_NODE}isEmpty(){return!1}}const Yt=new ld;Object.defineProperties(b,{MIN:{value:new b(xe,y.EMPTY_NODE)},MAX:{value:new b(Ee,Yt)}});Ho.__EMPTY_NODE=y.EMPTY_NODE;F.__childrenNodeConstructor=y;nd(Yt);sd(Yt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd=!0;function D(n,e=null){if(n===null)return y.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new F(t,D(e))}if(!(n instanceof Array)&&cd){const t=[];let i=!1;if(U(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=D(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new b(o,l)))}}),t.length===0)return y.EMPTY_NODE;const r=mn(t,td,o=>o.name,os);if(i){const o=mn(t,k.getCompare());return new y(r,D(e),new ge({".priority":o},{".priority":k}))}else return new y(r,D(e),ge.Default)}else{let t=y.EMPTY_NODE;return U(n,(i,s)=>{if(X(n,i)&&i.substring(0,1)!=="."){const r=D(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(D(e))}}id(D);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as extends Nn{constructor(e){super(),this.indexPath_=e,p(!w(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Je(e.name,t.name):r}makePost(e,t){const i=D(e),s=y.EMPTY_NODE.updateChild(this.indexPath_,i);return new b(t,s)}maxPost(){const e=y.EMPTY_NODE.updateChild(this.indexPath_,Yt);return new b(Ee,e)}toString(){return Ot(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud extends Nn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Je(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return b.MIN}maxPost(){return b.MAX}makePost(e,t){const i=D(e);return new b(t,i)}toString(){return".value"}}const ls=new ud;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yo(n){return{type:"value",snapshotNode:n}}function at(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Lt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Mt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function dd(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Lt(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(at(t,i)):o.trackChildChange(Mt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(k,(s,r)=>{t.hasChild(s)||i.trackChildChange(Lt(s,r))}),t.isLeafNode()||t.forEachChild(k,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Mt(s,r,o))}else i.trackChildChange(at(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?y.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e){this.indexedFilter_=new cs(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ft.getStartPost_(e),this.endPost_=Ft.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new b(t,i))||(i=y.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=y.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(y.EMPTY_NODE);const r=this;return t.forEachChild(k,(o,a)=>{r.matches(new b(o,a))||(s=s.updateImmediateChild(o,y.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ft(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new b(t,i))||(i=y.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=y.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=y.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(y.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,y.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,m)=>u(m,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new b(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const m=h==null?1:o(h,l);if(d&&!i.isEmpty()&&m>=0)return r?.trackChildChange(Mt(t,i,u)),a.updateImmediateChild(t,i);{r?.trackChildChange(Lt(t,u));const E=a.updateImmediateChild(t,y.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(at(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Lt(c.name,c.node)),r.trackChildChange(at(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,y.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=k}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:xe}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ee}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===k}copy(){const e=new Dn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function fd(n){return n.loadsAllData()?new cs(n.getIndex()):n.hasLimit()?new hd(n):new Ft(n)}function pd(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function md(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Ei(n,e,t){const i=n.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,t!=null?(i.startNameSet_=!0,i.indexStartName_=t):(i.startNameSet_=!1,i.indexStartName_=""),i}function _d(n,e,t){let i;return n.index_===he||t?i=Ei(n,e,t):i=Ei(n,e,Ee),i.startAfterSet_=!0,i}function Si(n,e,t){const i=n.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,t!==void 0?(i.endNameSet_=!0,i.indexEndName_=t):(i.endNameSet_=!1,i.indexEndName_=""),i}function gd(n,e,t){let i;return n.index_===he||t?i=Si(n,e,t):i=Si(n,e,xe),i.endBeforeSet_=!0,i}function xn(n,e){const t=n.copy();return t.index_=e,t}function _r(n){const e={};if(n.isDefault())return e;let t;if(n.index_===k?t="$priority":n.index_===ls?t="$value":n.index_===he?t="$key":(p(n.index_ instanceof as,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=M(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=M(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+M(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=M(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+M(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function gr(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==k&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends Vo{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Gt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=_n.getListenId_(e,i),a={};this.listens_[o]=a;const l=_r(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),qe(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=_n.getListenId_(e,t);delete this.listens_[i]}get(e){const t=_r(e._queryParams),i=e._path.toString(),s=new j;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+xl(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=At(a.responseText)}catch{H("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&H("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(){this.rootNode_=y.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return{value:null,children:new Map}}function mt(n,e,t){if(w(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=C(e);n.children.has(i)||n.children.set(i,gn());const s=n.children.get(i);e=R(e),mt(s,e,t)}}function Ii(n,e){if(w(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(k,(i,s)=>{mt(n,new I(i),s)}),Ii(n,e)}}else if(n.children.size>0){const t=C(e);return e=R(e),n.children.has(t)&&Ii(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Ti(n,e,t){n.value!==null?t(e,n.value):vd(n,(i,s)=>{const r=new I(e.toString()+"/"+i);Ti(s,r,t)})}function vd(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=10*1e3,wd=30*1e3,bd=300*1e3;class Ed{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Cd(e);const i=yr+(wd-yr)*Math.random();St(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;U(e,(s,r)=>{r>0&&X(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),St(this.reportStats_.bind(this),Math.floor(Math.random()*2*bd))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ce||(ce={}));function us(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ds(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function hs(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ce.ACK_USER_WRITE,this.source=us()}operationForChild(e){if(w(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new I(e));return new yn(S(),t,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new yn(R(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t){this.source=e,this.path=t,this.type=ce.LISTEN_COMPLETE}operationForChild(e){return w(this.path)?new Bt(this.source,S()):new Bt(this.source,R(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ce.OVERWRITE}operationForChild(e){return w(this.path)?new Ge(this.source,S(),this.snap.getImmediateChild(e)):new Ge(this.source,R(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ce.MERGE}operationForChild(e){if(w(this.path)){const t=this.children.subtree(new I(e));return t.isEmpty()?null:t.value?new Ge(this.source,S(),t.value):new lt(this.source,S(),t)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new lt(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(w(e))return this.isFullyInitialized()&&!this.filtered_;const t=C(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Id(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(dd(o.childName,o.snapshotNode))}),bt(n,s,"child_removed",e,i,t),bt(n,s,"child_added",e,i,t),bt(n,s,"child_moved",r,i,t),bt(n,s,"child_changed",e,i,t),bt(n,s,"value",e,i,t),s}function bt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Rd(n,a,l)),o.forEach(a=>{const l=Td(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Td(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Rd(n,e,t){if(e.childName==null||t.childName==null)throw ht("Should only compare child_ events.");const i=new b(e.childName,e.snapshotNode),s=new b(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(n,e){return{eventCache:n,serverCache:e}}function It(n,e,t,i){return On(new Le(e,t,i),n.serverCache)}function Qo(n,e,t,i){return On(n.eventCache,new Le(e,t,i))}function vn(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ye(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let li;const Pd=()=>(li||(li=new q(uu)),li);class P{static fromObject(e){let t=new P(null);return U(e,(i,s)=>{t=t.set(new I(i),s)}),t}constructor(e,t=Pd()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:S(),value:this.value};if(w(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(R(e),t);return r!=null?{path:N(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(w(e))return this;{const t=C(e),i=this.children.get(t);return i!==null?i.subtree(R(e)):new P(null)}}set(e,t){if(w(e))return new P(t,this.children);{const i=C(e),r=(this.children.get(i)||new P(null)).set(R(e),t),o=this.children.insert(i,r);return new P(this.value,o)}}remove(e){if(w(e))return this.children.isEmpty()?new P(null):new P(null,this.children);{const t=C(e),i=this.children.get(t);if(i){const s=i.remove(R(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new P(null):new P(this.value,r)}else return this}}get(e){if(w(e))return this.value;{const t=C(e),i=this.children.get(t);return i?i.get(R(e)):null}}setTree(e,t){if(w(e))return t;{const i=C(e),r=(this.children.get(i)||new P(null)).setTree(R(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new P(this.value,o)}}fold(e){return this.fold_(S(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(N(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,S(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(w(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(R(e),N(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,S(),t)}foreachOnPath_(e,t,i){if(w(e))return this;{this.value&&i(t,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(R(e),N(t,s),i):new P(null)}}foreach(e){this.foreach_(S(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(N(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.writeTree_=e}static empty(){return new ue(new P(null))}}function Tt(n,e,t){if(w(e))return new ue(new P(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=z(s,e);return r=r.updateChild(o,t),new ue(n.writeTree_.set(s,r))}else{const s=new P(t),r=n.writeTree_.setTree(e,s);return new ue(r)}}}function Ri(n,e,t){let i=n;return U(t,(s,r)=>{i=Tt(i,N(e,s),r)}),i}function vr(n,e){if(w(e))return ue.empty();{const t=n.writeTree_.setTree(e,new P(null));return new ue(t)}}function Pi(n,e){return Xe(n,e)!=null}function Xe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(z(t.path,e)):null}function Cr(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(k,(i,s)=>{e.push(new b(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new b(i,s.value))}),e}function Re(n,e){if(w(e))return n;{const t=Xe(n,e);return t!=null?new ue(new P(t)):new ue(n.writeTree_.subtree(e))}}function ki(n){return n.writeTree_.isEmpty()}function ct(n,e){return Ko(S(),n.writeTree_,e)}function Ko(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Ko(N(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(N(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n,e){return ea(e,n)}function kd(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Tt(n.visibleWrites,e,t)),n.lastWriteId=i}function Ad(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Ri(n.visibleWrites,e,t),n.lastWriteId=i}function Nd(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Dd(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&xd(a,i.path)?s=!1:ie(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Od(n),!0;if(i.snap)n.visibleWrites=vr(n.visibleWrites,i.path);else{const a=i.children;U(a,l=>{n.visibleWrites=vr(n.visibleWrites,N(i.path,l))})}return!0}else return!1}function xd(n,e){if(n.snap)return ie(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ie(N(n.path,t),e))return!0;return!1}function Od(n){n.visibleWrites=Jo(n.allWrites,Ld,S()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Ld(n){return n.visible}function Jo(n,e,t){let i=ue.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)ie(t,o)?(a=z(t,o),i=Tt(i,a,r.snap)):ie(o,t)&&(a=z(o,t),i=Tt(i,S(),r.snap.getChild(a)));else if(r.children){if(ie(t,o))a=z(t,o),i=Ri(i,a,r.children);else if(ie(o,t))if(a=z(o,t),w(a))i=Ri(i,S(),r.children);else{const l=qe(r.children,C(a));if(l){const c=l.getChild(R(a));i=Tt(i,S(),c)}}}else throw ht("WriteRecord should have .snap or .children")}}return i}function Xo(n,e,t,i,s){if(!i&&!s){const r=Xe(n.visibleWrites,e);if(r!=null)return r;{const o=Re(n.visibleWrites,e);if(ki(o))return t;if(t==null&&!Pi(o,S()))return null;{const a=t||y.EMPTY_NODE;return ct(o,a)}}}else{const r=Re(n.visibleWrites,e);if(!s&&ki(r))return t;if(!s&&t==null&&!Pi(r,S()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ie(c.path,e)||ie(e,c.path))},a=Jo(n.allWrites,o,e),l=t||y.EMPTY_NODE;return ct(a,l)}}}function Md(n,e,t){let i=y.EMPTY_NODE;const s=Xe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(k,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Re(n.visibleWrites,e);return t.forEachChild(k,(o,a)=>{const l=ct(Re(r,new I(o)),a);i=i.updateImmediateChild(o,l)}),Cr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Re(n.visibleWrites,e);return Cr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Fd(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=N(e,t);if(Pi(n.visibleWrites,r))return null;{const o=Re(n.visibleWrites,r);return ki(o)?s.getChild(t):ct(o,s.getChild(t))}}function Bd(n,e,t,i){const s=N(e,t),r=Xe(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Re(n.visibleWrites,s);return ct(o,i.getNode().getImmediateChild(t))}else return null}function Vd(n,e){return Xe(n.visibleWrites,e)}function Wd(n,e,t,i,s,r,o){let a;const l=Re(n.visibleWrites,e),c=Xe(l,S());if(c!=null)a=c;else if(t!=null)a=ct(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let m=h.getNext();for(;m&&d.length<s;)u(m,i)!==0&&d.push(m),m=h.getNext();return d}else return[]}function Ud(){return{visibleWrites:ue.empty(),allWrites:[],lastWriteId:-1}}function Cn(n,e,t,i){return Xo(n.writeTree,n.treePath,e,t,i)}function fs(n,e){return Md(n.writeTree,n.treePath,e)}function wr(n,e,t,i){return Fd(n.writeTree,n.treePath,e,t,i)}function wn(n,e){return Vd(n.writeTree,N(n.treePath,e))}function $d(n,e,t,i,s,r){return Wd(n.writeTree,n.treePath,e,t,i,s,r)}function ps(n,e,t){return Bd(n.writeTree,n.treePath,e,t)}function Zo(n,e){return ea(N(n.treePath,e),n.writeTree)}function ea(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Mt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Lt(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,at(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Mt(i,e.snapshotNode,s.oldSnap));else throw ht("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const ta=new zd;class ms{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Le(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ps(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ye(this.viewCache_),r=$d(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jd(n){return{filter:n}}function qd(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Gd(n,e,t,i,s){const r=new Hd;let o,a;if(t.type===ce.OVERWRITE){const c=t;c.source.fromUser?o=Ai(n,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!w(c.path),o=bn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===ce.MERGE){const c=t;c.source.fromUser?o=Qd(n,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Ni(n,e,c.path,c.children,i,s,a,r))}else if(t.type===ce.ACK_USER_WRITE){const c=t;c.revert?o=Xd(n,e,c.path,i,s,r):o=Kd(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===ce.LISTEN_COMPLETE)o=Jd(n,e,t.path,i,r);else throw ht("Unknown operation type: "+t.type);const l=r.getChanges();return Yd(e,o,l),{viewCache:o,changes:l}}function Yd(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=vn(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Yo(vn(e)))}}function na(n,e,t,i,s,r){const o=e.eventCache;if(wn(i,t)!=null)return e;{let a,l;if(w(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ye(e),d=c instanceof y?c:y.EMPTY_NODE,u=fs(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Cn(i,Ye(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(t);if(c===".priority"){p(Oe(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=wr(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=R(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=wr(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=ps(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return It(e,a,o.isFullyInitialized()||w(t),n.filter.filtersNodes())}}function bn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(w(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const m=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),m,null)}else{const m=C(t);if(!l.isCompleteForPath(t)&&Oe(t)>1)return e;const _=R(t),L=l.getNode().getImmediateChild(m).updateChild(_,i);m===".priority"?c=d.updatePriority(l.getNode(),L):c=d.updateChild(l.getNode(),m,L,_,ta,null)}const u=Qo(e,c,l.isFullyInitialized()||w(t),d.filtersNodes()),h=new ms(s,u,r);return na(n,u,t,s,h,a)}function Ai(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new ms(s,e,r);if(w(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=It(e,c,!0,n.filter.filtersNodes());else{const u=C(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=It(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=R(t),m=a.getNode().getImmediateChild(u);let _;if(w(h))_=i;else{const E=d.getCompleteChild(u);E!=null?is(h)===".priority"&&E.getChild(Uo(h)).isEmpty()?_=E:_=E.updateChild(h,i):_=y.EMPTY_NODE}if(m.equals(_))l=e;else{const E=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=It(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function br(n,e){return n.eventCache.isCompleteForChild(e)}function Qd(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=N(t,l);br(e,C(d))&&(a=Ai(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=N(t,l);br(e,C(d))||(a=Ai(n,a,d,c,s,r,o))}),a}function Er(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ni(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;w(t)?c=i:c=new P(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const m=e.serverCache.getNode().getImmediateChild(u),_=Er(n,m,h);l=bn(n,l,new I(u),_,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const m=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!m){const _=e.serverCache.getNode().getImmediateChild(u),E=Er(n,_,h);l=bn(n,l,new I(u),E,s,r,o,a)}}),l}function Kd(n,e,t,i,s,r,o){if(wn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(w(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return bn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(w(t)){let c=new P(null);return l.getNode().forEachChild(he,(d,u)=>{c=c.set(new I(d),u)}),Ni(n,e,t,c,s,r,a,o)}else return e}else{let c=new P(null);return i.foreach((d,u)=>{const h=N(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Ni(n,e,t,c,s,r,a,o)}}function Jd(n,e,t,i,s){const r=e.serverCache,o=Qo(e,r.getNode(),r.isFullyInitialized()||w(t),r.isFiltered());return na(n,o,t,i,ta,s)}function Xd(n,e,t,i,s,r){let o;if(wn(i,t)!=null)return e;{const a=new ms(i,e,s),l=e.eventCache.getNode();let c;if(w(t)||C(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Cn(i,Ye(e));else{const u=e.serverCache.getNode();p(u instanceof y,"serverChildren would be complete if leaf node"),d=fs(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=C(t);let u=ps(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,R(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,y.EMPTY_NODE,R(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Cn(i,Ye(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||wn(i,S())!=null,It(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new cs(i.getIndex()),r=fd(i);this.processor_=jd(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(y.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(y.EMPTY_NODE,a.getNode(),null),d=new Le(l,o.isFullyInitialized(),s.filtersNodes()),u=new Le(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=On(u,d),this.eventGenerator_=new Sd(this.query_)}get query(){return this.query_}}function eh(n){return n.viewCache_.serverCache.getNode()}function th(n){return vn(n.viewCache_)}function nh(n,e){const t=Ye(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!w(e)&&!t.getImmediateChild(C(e)).isEmpty())?t.getChild(e):null}function Sr(n){return n.eventRegistrations_.length===0}function ih(n,e){n.eventRegistrations_.push(e)}function Ir(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Tr(n,e,t,i){e.type===ce.MERGE&&e.source.queryId!==null&&(p(Ye(n.viewCache_),"We should always have a full cache before handling merges"),p(vn(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Gd(n.processor_,s,e,t,i);return qd(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,ia(n,r.changes,r.viewCache.eventCache.getNode(),null)}function sh(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(k,(r,o)=>{i.push(at(r,o))}),t.isFullyInitialized()&&i.push(Yo(t.getNode())),ia(n,i,t.getNode(),e)}function ia(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Id(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let En;class sa{constructor(){this.views=new Map}}function rh(n){p(!En,"__referenceConstructor has already been defined"),En=n}function oh(){return p(En,"Reference.ts has not been loaded"),En}function ah(n){return n.views.size===0}function _s(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Tr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Tr(o,e,t,i));return r}}function ra(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Cn(t,s?i:null),l=!1;a?l=!0:i instanceof y?(a=fs(t,i),l=!1):(a=y.EMPTY_NODE,l=!1);const c=On(new Le(a,l,!1),new Le(i,s,!1));return new Zd(e,c)}return o}function lh(n,e,t,i,s,r){const o=ra(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),ih(o,t),sh(o,t)}function ch(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Me(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Ir(c,t,i)),Sr(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Ir(l,t,i)),Sr(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Me(n)&&r.push(new(oh())(e._repo,e._path)),{removed:r,events:o}}function oa(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Pe(n,e){let t=null;for(const i of n.views.values())t=t||nh(i,e);return t}function aa(n,e){if(e._queryParams.loadsAllData())return Mn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function la(n,e){return aa(n,e)!=null}function Me(n){return Mn(n)!=null}function Mn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sn;function uh(n){p(!Sn,"__referenceConstructor has already been defined"),Sn=n}function dh(){return p(Sn,"Reference.ts has not been loaded"),Sn}let hh=1;class Rr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new P(null),this.pendingWriteTree_=Ud(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function gs(n,e,t,i,s){return kd(n.pendingWriteTree_,e,t,i,s),s?_t(n,new Ge(us(),e,t)):[]}function fh(n,e,t,i){Ad(n.pendingWriteTree_,e,t,i);const s=P.fromObject(t);return _t(n,new lt(us(),e,s))}function Ie(n,e,t=!1){const i=Nd(n.pendingWriteTree_,e);if(Dd(n.pendingWriteTree_,e)){let r=new P(null);return i.snap!=null?r=r.set(S(),!0):U(i.children,o=>{r=r.set(new I(o),!0)}),_t(n,new yn(i.path,r,t))}else return[]}function Qt(n,e,t){return _t(n,new Ge(ds(),e,t))}function ph(n,e,t){const i=P.fromObject(t);return _t(n,new lt(ds(),e,i))}function mh(n,e){return _t(n,new Bt(ds(),e))}function _h(n,e,t){const i=ys(n,t);if(i){const s=vs(i),r=s.path,o=s.queryId,a=z(r,e),l=new Bt(hs(o),a);return Cs(n,r,l)}else return[]}function In(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||la(o,e))){const l=ch(o,e,t,i);ah(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,m)=>Me(m));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const m=vh(h);for(let _=0;_<m.length;++_){const E=m[_],L=E.query,me=ha(n,E);n.listenProvider_.startListening(Rt(L),Vt(n,L),me.hashFn,me.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(Rt(e),null):c.forEach(h=>{const m=n.queryToTagMap.get(Bn(h));n.listenProvider_.stopListening(Rt(h),m)}))}Ch(n,c)}return a}function ca(n,e,t,i){const s=ys(n,i);if(s!=null){const r=vs(s),o=r.path,a=r.queryId,l=z(o,e),c=new Ge(hs(a),l,t);return Cs(n,o,c)}else return[]}function gh(n,e,t,i){const s=ys(n,i);if(s){const r=vs(s),o=r.path,a=r.queryId,l=z(o,e),c=P.fromObject(t),d=new lt(hs(a),l,c);return Cs(n,o,d)}else return[]}function Di(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,m)=>{const _=z(h,s);r=r||Pe(m,_),o=o||Me(m)});let a=n.syncPointTree_.get(s);a?(o=o||Me(a),r=r||Pe(a,S())):(a=new sa,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=y.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((m,_)=>{const E=Pe(_,S());E&&(r=r.updateImmediateChild(m,E))}));const c=la(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Bn(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const m=wh();n.queryToTagMap.set(h,m),n.tagToQueryMap.set(m,h)}const d=Ln(n.pendingWriteTree_,s);let u=lh(a,e,t,d,r,l);if(!c&&!o&&!i){const h=aa(a,e);u=u.concat(bh(n,e,h))}return u}function Fn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=z(o,e),c=Pe(a,l);if(c)return c});return Xo(s,e,r,t,!0)}function yh(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=z(c,t);i=i||Pe(d,u)});let s=n.syncPointTree_.get(t);s?i=i||Pe(s,S()):(s=new sa,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Le(i,!0,!1):null,a=Ln(n.pendingWriteTree_,e._path),l=ra(s,e,a,r?o.getNode():y.EMPTY_NODE,r);return th(l)}function _t(n,e){return ua(e,n.syncPointTree_,null,Ln(n.pendingWriteTree_,S()))}function ua(n,e,t,i){if(w(n.path))return da(n,e,t,i);{const s=e.get(S());t==null&&s!=null&&(t=Pe(s,S()));let r=[];const o=C(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=Zo(i,o);r=r.concat(ua(a,l,c,d))}return s&&(r=r.concat(_s(s,n,i,t))),r}}function da(n,e,t,i){const s=e.get(S());t==null&&s!=null&&(t=Pe(s,S()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Zo(i,o),d=n.operationForChild(o);d&&(r=r.concat(da(d,a,l,c)))}),s&&(r=r.concat(_s(s,n,i,t))),r}function ha(n,e){const t=e.query,i=Vt(n,t);return{hashFn:()=>(eh(e)||y.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?_h(n,t._path,i):mh(n,t._path);{const r=fu(s,t);return In(n,t,null,r)}}}}function Vt(n,e){const t=Bn(e);return n.queryToTagMap.get(t)}function Bn(n){return n._path.toString()+"$"+n._queryIdentifier}function ys(n,e){return n.tagToQueryMap.get(e)}function vs(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new I(n.substr(0,e))}}function Cs(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=Ln(n.pendingWriteTree_,e);return _s(i,t,s,null)}function vh(n){return n.fold((e,t,i)=>{if(t&&Me(t))return[Mn(t)];{let s=[];return t&&(s=oa(t)),U(i,(r,o)=>{s=s.concat(o)}),s}})}function Rt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(dh())(n._repo,n._path):n}function Ch(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Bn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function wh(){return hh++}function bh(n,e,t){const i=e._path,s=Vt(n,e),r=ha(n,t),o=n.listenProvider_.startListening(Rt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!Me(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!w(c)&&d&&Me(d))return[Mn(d).query];{let h=[];return d&&(h=h.concat(oa(d).map(m=>m.query))),U(u,(m,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(Rt(d),Vt(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new ws(t)}node(){return this.node_}}class bs{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=N(this.path_,e);return new bs(this.syncTree_,t)}node(){return Fn(this.syncTree_,this.path_)}}const Eh=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Pr=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Sh(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Ih(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Sh=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},Ih=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},fa=function(n,e,t,i){return Ss(e,new bs(t,n),i)},Es=function(n,e,t){return Ss(n,new ws(e),t)};function Ss(n,e,t){const i=n.getPriority().val(),s=Pr(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Pr(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new F(a,D(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new F(s))),o.forEachChild(k,(a,l)=>{const c=Ss(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Vn(n,e){let t=e instanceof I?e:new I(e),i=n,s=C(t);for(;s!==null;){const r=qe(i.node.children,s)||{children:{},childCount:0};i=new Is(s,i,r),t=R(t),s=C(t)}return i}function Ze(n){return n.node.value}function Ts(n,e){n.node.value=e,xi(n)}function pa(n){return n.node.childCount>0}function Th(n){return Ze(n)===void 0&&!pa(n)}function Wn(n,e){U(n.node.children,(t,i)=>{e(new Is(t,n,i))})}function ma(n,e,t,i){t&&e(n),Wn(n,s=>{ma(s,e,!0)})}function Rh(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Kt(n){return new I(n.parent===null?n.name:Kt(n.parent)+"/"+n.name)}function xi(n){n.parent!==null&&Ph(n.parent,n.name,n)}function Ph(n,e,t){const i=Th(t),s=X(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,xi(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,xi(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=/[\[\].#$\/\u0000-\u001F\u007F]/,Ah=/[\[\].#$\u0000-\u001F\u007F]/,ci=10*1024*1024,Un=function(n){return typeof n=="string"&&n.length!==0&&!kh.test(n)},_a=function(n){return typeof n=="string"&&n.length!==0&&!Ah.test(n)},Nh=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),_a(n)},Wt=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!An(n)||n&&typeof n=="object"&&X(n,".sv")},pe=function(n,e,t,i){i&&e===void 0||Jt(G(n,"value"),e,t)},Jt=function(n,e,t){const i=t instanceof I?new Gu(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ue(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ue(i)+" with contents = "+e.toString());if(An(e))throw new Error(n+"contains "+e.toString()+" "+Ue(i));if(typeof e=="string"&&e.length>ci/3&&Pn(e)>ci)throw new Error(n+"contains a string greater than "+ci+" utf8 bytes "+Ue(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(U(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Un(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ue(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Yu(i,o),Jt(n,a,i),Qu(i)}),s&&r)throw new Error(n+' contains ".value" child '+Ue(i)+" in addition to actual children.")}},Dh=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Ot(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Un(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(qu);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&ie(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},ga=function(n,e,t,i){const s=G(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];U(e,(o,a)=>{const l=new I(o);if(Jt(s,a,N(t,l)),is(l)===".priority"&&!Wt(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Dh(s,r)},Rs=function(n,e,t){if(An(e))throw new Error(G(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Wt(e))throw new Error(G(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Xt=function(n,e,t,i){if(t!==void 0&&!Un(t))throw new Error(G(n,e)+'was an invalid key = "'+t+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},Ut=function(n,e,t,i){if(!_a(t))throw new Error(G(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},xh=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Ut(n,e,t)},se=function(n,e){if(C(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},ya=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Un(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Nh(t))throw new Error(G(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function $n(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!ss(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function va(n,e,t){$n(n,t),Ca(n,i=>ss(i,e))}function Z(n,e,t){$n(n,t),Ca(n,i=>ie(i,e)||ie(e,i))}function Ca(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Lh(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Lh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();je&&W("event: "+t.toString()),pt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="repo_interrupt",Mh=25;class Fh{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Oh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=gn(),this.transactionQueueTree_=new Is,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Bh(n,e,t){if(n.stats_=ts(n.repoInfo_),n.forceRestClient_||gu())n.server_=new _n(n.repoInfo_,(i,s,r,o)=>{kr(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ar(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Ce(n.repoInfo_,e,(i,s,r,o)=>{kr(n,i,s,r,o)},i=>{Ar(n,i)},i=>{Vh(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=bu(n.repoInfo_,()=>new Ed(n.stats_,n.server_)),n.infoData_=new yd,n.infoSyncTree_=new Rr({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Qt(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Ps(n,"connected",!1),n.serverSyncTree_=new Rr({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);Z(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function ba(n){const t=n.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Zt(n){return Eh({timestamp:ba(n)})}function kr(n,e,t,i,s){n.dataUpdateCount++;const r=new I(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=un(t,c=>D(c));o=gh(n.serverSyncTree_,r,l,s)}else{const l=D(t);o=ca(n.serverSyncTree_,r,l,s)}else if(i){const l=un(t,c=>D(c));o=ph(n.serverSyncTree_,r,l)}else{const l=D(t);o=Qt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=ut(n,r)),Z(n.eventQueue_,a,o)}function Ar(n,e){Ps(n,"connected",e),e===!1&&$h(n)}function Vh(n,e){U(e,(t,i)=>{Ps(n,t,i)})}function Ps(n,e,t){const i=new I("/.info/"+e),s=D(t);n.infoData_.updateSnapshot(i,s);const r=Qt(n.infoSyncTree_,i,s);Z(n.eventQueue_,i,r)}function Hn(n){return n.nextWriteId_++}function Wh(n,e,t){const i=yh(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=D(s).withIndex(e._queryParams.getIndex());Di(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Qt(n.serverSyncTree_,e._path,r);else{const a=Vt(n.serverSyncTree_,e);o=ca(n.serverSyncTree_,e._path,r,a)}return Z(n.eventQueue_,e._path,o),In(n.serverSyncTree_,e,t,null,!0),r},s=>(gt(n,"get for query "+M(e)+" failed: "+s),Promise.reject(new Error(s))))}function ks(n,e,t,i,s){gt(n,"set",{path:e.toString(),value:t,priority:i});const r=Zt(n),o=D(t,i),a=Fn(n.serverSyncTree_,e),l=Es(o,a,r),c=Hn(n),d=gs(n.serverSyncTree_,e,l,c,!0);$n(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,m)=>{const _=h==="ok";_||H("set at "+e+" failed: "+h);const E=Ie(n.serverSyncTree_,c,!_);Z(n.eventQueue_,e,E),Fe(n,s,h,m)});const u=Ns(n,e);ut(n,u),Z(n.eventQueue_,u,[])}function Uh(n,e,t,i){gt(n,"update",{path:e.toString(),value:t});let s=!0;const r=Zt(n),o={};if(U(t,(a,l)=>{s=!1,o[a]=fa(N(e,a),D(l),n.serverSyncTree_,r)}),s)W("update() called with empty data.  Don't do anything."),Fe(n,i,"ok",void 0);else{const a=Hn(n),l=fh(n.serverSyncTree_,e,o,a);$n(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||H("update at "+e+" failed: "+c);const h=Ie(n.serverSyncTree_,a,!u),m=h.length>0?ut(n,e):e;Z(n.eventQueue_,m,h),Fe(n,i,c,d)}),U(t,c=>{const d=Ns(n,N(e,c));ut(n,d)}),Z(n.eventQueue_,e,[])}}function $h(n){gt(n,"onDisconnectEvents");const e=Zt(n),t=gn();Ti(n.onDisconnect_,S(),(s,r)=>{const o=fa(s,r,n.serverSyncTree_,e);mt(t,s,o)});let i=[];Ti(t,S(),(s,r)=>{i=i.concat(Qt(n.serverSyncTree_,s,r));const o=Ns(n,s);ut(n,o)}),n.onDisconnect_=gn(),Z(n.eventQueue_,S(),i)}function Hh(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Ii(n.onDisconnect_,e),Fe(n,t,i,s)})}function Nr(n,e,t,i){const s=D(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&mt(n.onDisconnect_,e,s),Fe(n,i,r,o)})}function zh(n,e,t,i,s){const r=D(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&mt(n.onDisconnect_,e,r),Fe(n,s,o,a)})}function jh(n,e,t,i){if(pi(t)){W("onDisconnect().update() called with empty data.  Don't do anything."),Fe(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&U(t,(o,a)=>{const l=D(a);mt(n.onDisconnect_,N(e,o),l)}),Fe(n,i,s,r)})}function qh(n,e,t){let i;C(e._path)===".info"?i=Di(n.infoSyncTree_,e,t):i=Di(n.serverSyncTree_,e,t),va(n.eventQueue_,e._path,i)}function Oi(n,e,t){let i;C(e._path)===".info"?i=In(n.infoSyncTree_,e,t):i=In(n.serverSyncTree_,e,t),va(n.eventQueue_,e._path,i)}function Ea(n){n.persistentConnection_&&n.persistentConnection_.interrupt(wa)}function Gh(n){n.persistentConnection_&&n.persistentConnection_.resume(wa)}function gt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),W(t,...e)}function Fe(n,e,t,i){e&&pt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Yh(n,e,t,i,s,r){gt(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:yo(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=As(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Jt("transaction failed: Data returned ",l,o.path),o.status=0;const c=Vn(n.transactionQueueTree_,e),d=Ze(c)||[];d.push(o),Ts(c,d);let u;typeof l=="object"&&l!==null&&X(l,".priority")?(u=qe(l,".priority"),p(Wt(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(Fn(n.serverSyncTree_,e)||y.EMPTY_NODE).getPriority().val();const h=Zt(n),m=D(l,u),_=Es(m,a,h);o.currentOutputSnapshotRaw=m,o.currentOutputSnapshotResolved=_,o.currentWriteId=Hn(n);const E=gs(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);Z(n.eventQueue_,e,E),zn(n,n.transactionQueueTree_)}}function As(n,e,t){return Fn(n.serverSyncTree_,e,t)||y.EMPTY_NODE}function zn(n,e=n.transactionQueueTree_){if(e||jn(n,e),Ze(e)){const t=Ia(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Qh(n,Kt(e),t)}else pa(e)&&Wn(e,t=>{zn(n,t)})}function Qh(n,e,t){const i=t.map(c=>c.currentWriteId),s=As(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];p(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=z(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{gt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(Ie(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();jn(n,Vn(n.transactionQueueTree_,e)),zn(n,n.transactionQueueTree_),Z(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)pt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{H("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}ut(n,e)}},o)}function ut(n,e){const t=Sa(n,e),i=Kt(t),s=Ia(n,t);return Kh(n,s,i),i}function Kh(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=z(t,l.path);let d=!1,u;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(Ie(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Mh)d=!0,u="maxretry",s=s.concat(Ie(n.serverSyncTree_,l.currentWriteId,!0));else{const h=As(n,l.path,o);l.currentInputSnapshot=h;const m=e[a].update(h.val());if(m!==void 0){Jt("transaction failed: Data returned ",m,l.path);let _=D(m);typeof m=="object"&&m!=null&&X(m,".priority")||(_=_.updatePriority(h.getPriority()));const L=l.currentWriteId,me=Zt(n),_e=Es(_,h,me);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=_e,l.currentWriteId=Hn(n),o.splice(o.indexOf(L),1),s=s.concat(gs(n.serverSyncTree_,l.path,_e,l.currentWriteId,l.applyLocally)),s=s.concat(Ie(n.serverSyncTree_,L,!0))}else d=!0,u="nodata",s=s.concat(Ie(n.serverSyncTree_,l.currentWriteId,!0))}Z(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}jn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)pt(i[a]);zn(n,n.transactionQueueTree_)}function Sa(n,e){let t,i=n.transactionQueueTree_;for(t=C(e);t!==null&&Ze(i)===void 0;)i=Vn(i,t),e=R(e),t=C(e);return i}function Ia(n,e){const t=[];return Ta(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Ta(n,e,t){const i=Ze(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Wn(e,s=>{Ta(n,s,t)})}function jn(n,e){const t=Ze(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ts(e,t.length>0?t:void 0)}Wn(e,i=>{jn(n,i)})}function Ns(n,e){const t=Kt(Sa(n,e)),i=Vn(n.transactionQueueTree_,e);return Rh(i,s=>{ui(n,s)}),ui(n,i),ma(i,s=>{ui(n,s)}),t}function ui(n,e){const t=Ze(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Ie(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ts(e,void 0):t.length=r+1,Z(n.eventQueue_,Kt(e),s);for(let o=0;o<i.length;o++)pt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Xh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):H(`Invalid query segment '${t}' in query '${n}'`)}return e}const Li=function(n,e){const t=Zh(n),i=t.namespace;t.domain==="firebase.com"&&fe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&fe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||lu();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Do(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new I(t.pathString)}},Zh=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=Jh(n.substring(d,u)));const h=Xh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const m=e.slice(0,c);if(m.toLowerCase()==="localhost")t="localhost";else if(m.split(".").length<=2)t=m;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ef=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Dr.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Dr.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+M(this.snapshot.exportVal())}}class Pa{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */let tf=class{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new j;return Hh(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){se("OnDisconnect.remove",this._path);const e=new j;return Nr(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){se("OnDisconnect.set",this._path),pe("OnDisconnect.set",e,this._path,!1);const t=new j;return Nr(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){se("OnDisconnect.setWithPriority",this._path),pe("OnDisconnect.setWithPriority",e,this._path,!1),Rs("OnDisconnect.setWithPriority",t);const i=new j;return zh(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){se("OnDisconnect.update",this._path),ga("OnDisconnect.update",e,this._path);const t=new j;return jh(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}};/**
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
 */class Y{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return w(this._path)?null:is(this._path)}get ref(){return new oe(this._repo,this._path)}get _queryIdentifier(){const e=gr(this._queryParams),t=Zi(e);return t==="{}"?"default":t}get _queryObject(){return gr(this._queryParams)}isEqual(e){if(e=ee(e),!(e instanceof Y))return!1;const t=this._repo===e._repo,i=ss(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+ju(this._path)}}function qn(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Be(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===he){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==xe)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==Ee)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===k){if(e!=null&&!Wt(e)||t!=null&&!Wt(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(p(n.getIndex()instanceof as||n.getIndex()===ls,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function Gn(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class oe extends Y{constructor(e,t){super(e,t,new Dn,!1)}get parent(){const e=Uo(this._path);return e===null?null:new oe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}let Yn=class Mi{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new I(e),i=Qe(this.ref,e);return new Mi(this._node.getChild(t),i,k)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Mi(s,Qe(this.ref,i),k)))}hasChild(e){const t=new I(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function ka(n,e){return n=ee(n),n._checkNotDeleted("ref"),e!==void 0?Qe(n._root,e):n._root}function xr(n,e){n=ee(n),n._checkNotDeleted("refFromURL");const t=Li(e,n._repo.repoInfo_.nodeAdmin);ya("refFromURL",t);const i=t.repoInfo;return!n._repo.repoInfo_.isCustomHost()&&i.host!==n._repo.repoInfo_.host&&fe("refFromURL: Host name does not match the current database: (found "+i.host+" but expected "+n._repo.repoInfo_.host+")"),ka(n,t.path.toString())}function Qe(n,e){return n=ee(n),C(n._path)===null?xh("child","path",e):Ut("child","path",e),new oe(n._repo,N(n._path,e))}function nf(n,e){n=ee(n),se("push",n._path),pe("push",e,n._path,!0);const t=ba(n._repo),i=ef(t),s=Qe(n,i),r=Qe(n,i);let o;return e!=null?o=xs(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function sf(n){return se("remove",n._path),xs(n,null)}function xs(n,e){n=ee(n),se("set",n._path),pe("set",e,n._path,!1);const t=new j;return ks(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function rf(n,e){n=ee(n),se("setPriority",n._path),Rs("setPriority",e);const t=new j;return ks(n._repo,N(n._path,".priority"),e,null,t.wrapCallback(()=>{})),t.promise}function of(n,e,t){if(se("setWithPriority",n._path),pe("setWithPriority",e,n._path,!1),Rs("setWithPriority",t),n.key===".length"||n.key===".keys")throw"setWithPriority failed: "+n.key+" is a read-only object.";const i=new j;return ks(n._repo,n._path,e,t,i.wrapCallback(()=>{})),i.promise}function af(n,e){ga("update",e,n._path);const t=new j;return Uh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function lf(n){n=ee(n);const e=new Ds(()=>{}),t=new en(e);return Wh(n._repo,n,t).then(i=>new Yn(i,new oe(n._repo,n._path),n._queryParams.getIndex()))}class en{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Ra("value",this,new Yn(e.snapshotNode,new oe(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Pa(this,e,t):null}matches(e){return e instanceof en?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Qn{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Pa(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=Qe(new oe(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Ra(e.type,this,new Yn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Qn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function tn(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(d,u)=>{Oi(n._repo,n,a),l(d,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Ds(t,r||void 0),a=e==="value"?new en(o):new Qn(e,o);return qh(n._repo,n,a),()=>Oi(n._repo,n,a)}function Fi(n,e,t,i){return tn(n,"value",e,t,i)}function Or(n,e,t,i){return tn(n,"child_added",e,t,i)}function Lr(n,e,t,i){return tn(n,"child_changed",e,t,i)}function Mr(n,e,t,i){return tn(n,"child_moved",e,t,i)}function Fr(n,e,t,i){return tn(n,"child_removed",e,t,i)}function Br(n,e,t){let i=null;const s=t?new Ds(t):null;e==="value"?i=new en(s):e&&(i=new Qn(e,s)),Oi(n._repo,n,i)}class de{}class Aa extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){pe("endAt",this._value,e._path,!0);const t=Si(e._queryParams,this._value,this._key);if(Gn(t),Be(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function cf(n,e){return Xt("endAt","key",e),new Aa(n,e)}class uf extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){pe("endBefore",this._value,e._path,!1);const t=gd(e._queryParams,this._value,this._key);if(Gn(t),Be(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function df(n,e){return Xt("endBefore","key",e),new uf(n,e)}class Na extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){pe("startAt",this._value,e._path,!0);const t=Ei(e._queryParams,this._value,this._key);if(Gn(t),Be(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function hf(n=null,e){return Xt("startAt","key",e),new Na(n,e)}class ff extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){pe("startAfter",this._value,e._path,!1);const t=_d(e._queryParams,this._value,this._key);if(Gn(t),Be(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Y(e._repo,e._path,t,e._orderByCalled)}}function pf(n,e){return Xt("startAfter","key",e),new ff(n,e)}class mf extends de{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Y(e._repo,e._path,pd(e._queryParams,this._limit),e._orderByCalled)}}function _f(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new mf(n)}class gf extends de{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Y(e._repo,e._path,md(e._queryParams,this._limit),e._orderByCalled)}}function yf(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new gf(n)}class vf extends de{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){qn(e,"orderByChild");const t=new I(this._path);if(w(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new as(t),s=xn(e._queryParams,i);return Be(s),new Y(e._repo,e._path,s,!0)}}function Cf(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Ut("orderByChild","path",n),new vf(n)}class wf extends de{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){qn(e,"orderByKey");const t=xn(e._queryParams,he);return Be(t),new Y(e._repo,e._path,t,!0)}}function bf(){return new wf}class Ef extends de{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){qn(e,"orderByPriority");const t=xn(e._queryParams,k);return Be(t),new Y(e._repo,e._path,t,!0)}}function Sf(){return new Ef}class If extends de{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){qn(e,"orderByValue");const t=xn(e._queryParams,ls);return Be(t),new Y(e._repo,e._path,t,!0)}}function Tf(){return new If}class Rf extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(pe("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new Aa(this._value,this._key)._apply(new Na(this._value,this._key)._apply(e))}}function Pf(n,e){return Xt("equalTo","key",e),new Rf(n,e)}function ae(n,...e){let t=ee(n);for(const i of e)t=i._apply(t);return t}rh(oe);uh(oe);/**
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
 */const kf="FIREBASE_DATABASE_EMULATOR_HOST",Bi={};let Af=!1;function Nf(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=ji(r);n.repoInfo_=new Do(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Da(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||fe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),W("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Li(r,s),a=o.repoInfo,l,c;typeof process<"u"&&Zs&&(c=Zs[kf]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=Li(r,s),a=o.repoInfo):l=!o.repoInfo.secure;const d=s&&l?new nt(nt.OWNER):new vu(n.name,n.options,e);ya("Invalid Firebase Database URL",o),w(o.path)||fe("Database URL must point to the root of a Firebase Database (not including a child path).");const u=xf(a,n,d,new yu(n,t));return new Of(u,n)}function Df(n,e){const t=Bi[e];(!t||t[n.key]!==n)&&fe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Ea(n),delete t[n.key]}function xf(n,e,t,i){let s=Bi[e.name];s||(s={},Bi[e.name]=s);let r=s[n.toURLString()];return r&&fe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Fh(n,Af,t,i),s[n.toURLString()]=r,r}let Of=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Bh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new oe(this._repo,S())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Df(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&fe("Cannot call "+e+" on a deleted database.")}};function xa(){ot.IS_TRANSPORT_INITIALIZED&&H("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function Lf(){xa(),Se.forceDisallow()}function Mf(){xa(),te.forceDisallow(),Se.forceAllow()}function Ff(n,e,t,i={}){n=ee(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&dn(i,r.repoInfo_.emulatorOptions))return;fe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&fe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new nt(nt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:yl(i.mockUserToken,n.app.options.projectId);o=new nt(a)}ji(e)&&(gl(e),wl("Database",!0)),Nf(r,s,i,o)}function Bf(n){n=ee(n),n._checkNotDeleted("goOffline"),Ea(n._repo)}function Vf(n){n=ee(n),n._checkNotDeleted("goOnline"),Gh(n._repo)}function Wf(n,e){Co(n,e)}/**
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
 */function Uf(n){_o(Ki),rt(new we("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Da(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ve(er,tr,n),ve(er,tr,"esm2020")}/**
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
 */const $f={".sv":"timestamp"};function Hf(){return $f}function zf(n){return{".sv":{increment:n}}}/**
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
 */let jf=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function qf(n,e,t){if(n=ee(n),se("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const i=t?.applyLocally??!0,s=new j,r=(a,l,c)=>{let d=null;a?s.reject(a):(d=new Yn(c,new oe(n._repo,n._path),k),s.resolve(new jf(l,d)))},o=Fi(n,()=>{});return Yh(n._repo,n._path,e,r,o,i),s.promise}Ce.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ce.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Uf();const Gf="@firebase/database-compat",Yf="2.1.0";/**
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
 */const Qf=new kn("@firebase/database-compat"),Oa=function(n){const e="FIREBASE WARNING: "+n;Qf.warn(e)};/**
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
 */const Kf=function(n,e,t,i){if(t!==void 0&&typeof t!="boolean")throw new Error(G(n,e)+"must be a boolean.")},Jf=function(n,e,t){if(e!==void 0)switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(G(n,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e){this._delegate=e}cancel(e){v("OnDisconnect.cancel",0,1,arguments.length),B("OnDisconnect.cancel","onComplete",e,!0);const t=this._delegate.cancel();return e&&t.then(()=>e(null),i=>e(i)),t}remove(e){v("OnDisconnect.remove",0,1,arguments.length),B("OnDisconnect.remove","onComplete",e,!0);const t=this._delegate.remove();return e&&t.then(()=>e(null),i=>e(i)),t}set(e,t){v("OnDisconnect.set",1,2,arguments.length),B("OnDisconnect.set","onComplete",t,!0);const i=this._delegate.set(e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){v("OnDisconnect.setWithPriority",2,3,arguments.length),B("OnDisconnect.setWithPriority","onComplete",i,!0);const s=this._delegate.setWithPriority(e,t);return i&&s.then(()=>i(null),r=>i(r)),s}update(e,t){if(v("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,Oa("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}B("OnDisconnect.update","onComplete",t,!0);const i=this._delegate.update(e);return t&&i.then(()=>t(null),s=>t(s)),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return v("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,t){this._database=e,this._delegate=t}val(){return v("DataSnapshot.val",0,0,arguments.length),this._delegate.val()}exportVal(){return v("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()}toJSON(){return v("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()}exists(){return v("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()}child(e){return v("DataSnapshot.child",0,1,arguments.length),e=String(e),Ut("DataSnapshot.child","path",e),new ke(this._database,this._delegate.child(e))}hasChild(e){return v("DataSnapshot.hasChild",1,1,arguments.length),Ut("DataSnapshot.hasChild","path",e),this._delegate.hasChild(e)}getPriority(){return v("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority}forEach(e){return v("DataSnapshot.forEach",1,1,arguments.length),B("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(t=>e(new ke(this._database,t)))}hasChildren(){return v("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()}get key(){return this._delegate.key}numChildren(){return v("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size}getRef(){return v("DataSnapshot.ref",0,0,arguments.length),new K(this._database,this._delegate.ref)}get ref(){return this.getRef()}}class ${constructor(e,t){this.database=e,this._delegate=t}on(e,t,i,s){v("Query.on",2,4,arguments.length),B("Query.on","callback",t,!1);const r=$.getCancelAndContextArgs_("Query.on",i,s),o=(l,c)=>{t.call(r.context,new ke(this.database,l),c)};o.userCallback=t,o.context=r.context;const a=r.cancel?.bind(r.context);switch(e){case"value":return Fi(this._delegate,o,a),t;case"child_added":return Or(this._delegate,o,a),t;case"child_removed":return Fr(this._delegate,o,a),t;case"child_changed":return Lr(this._delegate,o,a),t;case"child_moved":return Mr(this._delegate,o,a),t;default:throw new Error(G("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}off(e,t,i){if(v("Query.off",0,3,arguments.length),Jf("Query.off",e),B("Query.off","callback",t,!0),Hs("Query.off","context",i),t){const s=()=>{};s.userCallback=t,s.context=i,Br(this._delegate,e,s)}else Br(this._delegate,e)}get(){return lf(this._delegate).then(e=>new ke(this.database,e))}once(e,t,i,s){v("Query.once",1,4,arguments.length),B("Query.once","callback",t,!0);const r=$.getCancelAndContextArgs_("Query.once",i,s),o=new j,a=(c,d)=>{const u=new ke(this.database,c);t&&t.call(r.context,u,d),o.resolve(u)};a.userCallback=t,a.context=r.context;const l=c=>{r.cancel&&r.cancel.call(r.context,c),o.reject(c)};switch(e){case"value":Fi(this._delegate,a,l,{onlyOnce:!0});break;case"child_added":Or(this._delegate,a,l,{onlyOnce:!0});break;case"child_removed":Fr(this._delegate,a,l,{onlyOnce:!0});break;case"child_changed":Lr(this._delegate,a,l,{onlyOnce:!0});break;case"child_moved":Mr(this._delegate,a,l,{onlyOnce:!0});break;default:throw new Error(G("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return o.promise}limitToFirst(e){return v("Query.limitToFirst",1,1,arguments.length),new $(this.database,ae(this._delegate,_f(e)))}limitToLast(e){return v("Query.limitToLast",1,1,arguments.length),new $(this.database,ae(this._delegate,yf(e)))}orderByChild(e){return v("Query.orderByChild",1,1,arguments.length),new $(this.database,ae(this._delegate,Cf(e)))}orderByKey(){return v("Query.orderByKey",0,0,arguments.length),new $(this.database,ae(this._delegate,bf()))}orderByPriority(){return v("Query.orderByPriority",0,0,arguments.length),new $(this.database,ae(this._delegate,Sf()))}orderByValue(){return v("Query.orderByValue",0,0,arguments.length),new $(this.database,ae(this._delegate,Tf()))}startAt(e=null,t){return v("Query.startAt",0,2,arguments.length),new $(this.database,ae(this._delegate,hf(e,t)))}startAfter(e=null,t){return v("Query.startAfter",0,2,arguments.length),new $(this.database,ae(this._delegate,pf(e,t)))}endAt(e=null,t){return v("Query.endAt",0,2,arguments.length),new $(this.database,ae(this._delegate,cf(e,t)))}endBefore(e=null,t){return v("Query.endBefore",0,2,arguments.length),new $(this.database,ae(this._delegate,df(e,t)))}equalTo(e,t){return v("Query.equalTo",1,2,arguments.length),new $(this.database,ae(this._delegate,Pf(e,t)))}toString(){return v("Query.toString",0,0,arguments.length),this._delegate.toString()}toJSON(){return v("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()}isEqual(e){if(v("Query.isEqual",1,1,arguments.length),!(e instanceof $)){const t="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(t)}return this._delegate.isEqual(e._delegate)}static getCancelAndContextArgs_(e,t,i){const s={cancel:void 0,context:void 0};if(t&&i)s.cancel=t,B(e,"cancel",s.cancel,!0),s.context=i,Hs(e,"context",s.context);else if(t)if(typeof t=="object"&&t!==null)s.context=t;else if(typeof t=="function")s.cancel=t;else throw new Error(G(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return s}get ref(){return new K(this.database,new oe(this._delegate._repo,this._delegate._path))}}class K extends ${constructor(e,t){super(e,new Y(t._repo,t._path,new Dn,!1)),this.database=e,this._delegate=t}getKey(){return v("Reference.key",0,0,arguments.length),this._delegate.key}child(e){return v("Reference.child",1,1,arguments.length),typeof e=="number"&&(e=String(e)),new K(this.database,Qe(this._delegate,e))}getParent(){v("Reference.parent",0,0,arguments.length);const e=this._delegate.parent;return e?new K(this.database,e):null}getRoot(){return v("Reference.root",0,0,arguments.length),new K(this.database,this._delegate.root)}set(e,t){v("Reference.set",1,2,arguments.length),B("Reference.set","onComplete",t,!0);const i=xs(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}update(e,t){if(v("Reference.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,Oa("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}se("Reference.update",this._delegate._path),B("Reference.update","onComplete",t,!0);const i=af(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){v("Reference.setWithPriority",2,3,arguments.length),B("Reference.setWithPriority","onComplete",i,!0);const s=of(this._delegate,e,t);return i&&s.then(()=>i(null),r=>i(r)),s}remove(e){v("Reference.remove",0,1,arguments.length),B("Reference.remove","onComplete",e,!0);const t=sf(this._delegate);return e&&t.then(()=>e(null),i=>e(i)),t}transaction(e,t,i){v("Reference.transaction",1,3,arguments.length),B("Reference.transaction","transactionUpdate",e,!1),B("Reference.transaction","onComplete",t,!0),Kf("Reference.transaction","applyLocally",i);const s=qf(this._delegate,e,{applyLocally:i}).then(r=>new Zf(r.committed,new ke(this.database,r.snapshot)));return t&&s.then(r=>t(null,r.committed,r.snapshot),r=>t(r,!1,null)),s}setPriority(e,t){v("Reference.setPriority",1,2,arguments.length),B("Reference.setPriority","onComplete",t,!0);const i=rf(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}push(e,t){v("Reference.push",0,2,arguments.length),B("Reference.push","onComplete",t,!0);const i=nf(this._delegate,e),s=i.then(o=>new K(this.database,o));t&&s.then(()=>t(null),o=>t(o));const r=new K(this.database,i);return r.then=s.then.bind(s),r.catch=s.catch.bind(s,void 0),r}onDisconnect(){return se("Reference.onDisconnect",this._delegate._path),new Xf(new tf(this._delegate._repo,this._delegate._path))}get key(){return this.getKey()}get parent(){return this.getParent()}get root(){return this.getRoot()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this._delegate=e,this.app=t,this.INTERNAL={delete:()=>this._delegate._delete(),forceWebSockets:Lf,forceLongPolling:Mf}}useEmulator(e,t,i={}){Ff(this._delegate,e,t,i)}ref(e){if(v("database.ref",0,1,arguments.length),e instanceof K){const t=xr(this._delegate,e.toString());return new K(this,t)}else{const t=ka(this._delegate,e);return new K(this,t)}}refFromURL(e){v("database.refFromURL",1,1,arguments.length);const i=xr(this._delegate,e);return new K(this,i)}goOffline(){return v("database.goOffline",0,0,arguments.length),Bf(this._delegate)}goOnline(){return v("database.goOnline",0,0,arguments.length),Vf(this._delegate)}}$t.ServerValue={TIMESTAMP:Hf(),increment:n=>zf(n)};function ep({app:n,url:e,version:t,customAuthImpl:i,customAppCheckImpl:s,namespace:r,nodeAdmin:o=!1}){_o(t);const a=new qi("database-standalone"),l=new mi("auth-internal",a);l.setComponent(new we("auth-internal",()=>i,"PRIVATE"));let c;return s&&(c=new mi("app-check-internal",a),c.setComponent(new we("app-check-internal",()=>s,"PRIVATE"))),{instance:new $t(Da(n,l,c,e,o),n),namespace:r}}var tp=Object.freeze({__proto__:null,initStandalone:ep});/**
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
 */const np=$t.ServerValue;function ip(n){n.INTERNAL.registerComponent(new we("database-compat",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app-compat").getImmediate(),s=e.getProvider("database").getImmediate({identifier:t});return new $t(s,i)},"PUBLIC").setServiceProps({Reference:K,Query:$,Database:$t,DataSnapshot:ke,enableLogging:Wf,INTERNAL:tp,ServerValue:np}).setMultipleInstances(!0)),n.registerVersion(Gf,Yf)}ip(xt);const sp={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",projectId:"vidu-aae11",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"};xt.apps.length||xt.initializeApp(sp);const re=xt.database();function La(n,e,t){if(!n||!e)return;const i=`rooms/${n}/connections/${e}`;return re.ref(i).set({status:t,timestamp:Date.now()})}class Ma{constructor(e,t,i){this.peerConnection=e,this.roomRef=t,this.role=i,this.pendingCandidates=[],this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1},this.handleLocalCandidateWrapped=this.handleLocalCandidate.bind(this),this.handleICEGatheringStateChange=this.handleICEGatheringStateChange.bind(this),this.handleICEConnectionStateChange=this.handleICEConnectionStateChange.bind(this),this._onRemoteCandidateAdded=this._onRemoteCandidateAdded.bind(this),this.setupICEHandling()}setupICEHandling(){this.peerConnection.addEventListener("icecandidate",this.handleLocalCandidateWrapped),this.peerConnection.addEventListener("icegatheringstatechange",this.handleICEGatheringStateChange),this.peerConnection.addEventListener("iceconnectionstatechange",this.handleICEConnectionStateChange),this.listenForRemoteCandidates()}handleICEGatheringStateChange(){this.peerConnection.iceGatheringState==="complete"&&(this.state.iceGatheringComplete=!0,this.onICEGatheringComplete?.())}handleICEConnectionStateChange(){const e=this.peerConnection.iceConnectionState;this.onICEConnectionStateChange?.(e)}handleLocalCandidate(e){if(e.candidate){this.state.localCandidatesCount++;const t=this.role==="initiator"?"callerCandidates":"calleeCandidates";this.roomRef.child(t).push(e.candidate.toJSON()).catch(i=>{console.error("Failed to send ICE candidate to Firebase:",i)})}}listenForRemoteCandidates(){const e=this.role==="initiator"?"calleeCandidates":"callerCandidates";this._remoteCandidatesPath=e,this._remoteCandidatesRef=this.roomRef.child(e),this._remoteCandidatesRef.on("child_added",this._onRemoteCandidateAdded)}_onRemoteCandidateAdded(e){const t=e.val();if(t)try{const i=new RTCIceCandidate(t);this.handleRemoteCandidate(i)}catch(i){console.warn("Failed to create RTCIceCandidate:",i,t)}}async handleRemoteCandidate(e){if(this.state.remoteCandidatesCount++,this.state.remoteDescriptionSet)try{await this.peerConnection.addIceCandidate(e)}catch(t){console.warn("Failed to add ICE candidate:",t)}else this.pendingCandidates.push(e),this.state.pendingCandidatesCount=this.pendingCandidates.length}async processQueuedCandidates(){if(!this.state.remoteDescriptionSet){console.warn("Cannot process queued candidates: remote description not set");return}if(this.pendingCandidates.length===0)return;const e=[...this.pendingCandidates];this.pendingCandidates.length=0,this.state.pendingCandidatesCount=0;for(const t of e)try{await this.peerConnection.addIceCandidate(t)}catch(i){console.warn("Failed to add queued ICE candidate:",i)}}async onRemoteDescriptionSet(){this.state.remoteDescriptionSet=!0,await this.processQueuedCandidates()}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState}}cleanup(){this.peerConnection&&(this.peerConnection.removeEventListener("icecandidate",this.handleLocalCandidateWrapped),this.peerConnection.removeEventListener("icegatheringstatechange",this.handleICEGatheringStateChange),this.peerConnection.removeEventListener("iceconnectionstatechange",this.handleICEConnectionStateChange)),this._remoteCandidatesRef&&this._onRemoteCandidateAdded&&(this._remoteCandidatesRef.off("child_added",this._onRemoteCandidateAdded),this._remoteCandidatesRef=null,this._onRemoteCandidateAdded=null,this._remoteCandidatesPath=null),this.pendingCandidates.length=0,this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1}}}class Fa{constructor(e,t,i={}){this.peerConnection=e,this.role=t,this.options={connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3,...i},this.state={current:"new",previous:null,startTime:Date.now(),reconnectAttempt:0,lastError:null},this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null},this.timers={connectionTimeout:null,reconnectTimer:null},this.setupStateMonitoring()}setCallbacks(e){Object.assign(this.callbacks,e)}setupStateMonitoring(){this.peerConnection.onconnectionstatechange=()=>{this.handleConnectionStateChange(this.peerConnection.connectionState)},this.peerConnection.oniceconnectionstatechange=()=>{this.handleICEConnectionStateChange(this.peerConnection.iceConnectionState)},this.startConnectionTimeout()}handleConnectionStateChange(e){const t=this.state.current;switch(this.updateState(e),e){case"connecting":this.handleConnecting();break;case"connected":this.handleConnected();break;case"disconnected":this.handleDisconnected();break;case"failed":this.handleFailed();break;case"closed":this.handleClosed();break}this.callbacks.onStateChange?.(e,t)}handleICEConnectionStateChange(e){switch(e){case"checking":break;case"connected":this.clearConnectionTimeout();break;case"completed":break;case"failed":this.handleICEFailed();break;case"disconnected":this.handleICEDisconnected();break}}handleConnecting(){this.clearReconnectTimer(),this.startConnectionTimeout()}handleConnected(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.reconnectAttempt=0,this.state.lastError=null;const e=Date.now()-this.state.startTime;this.callbacks.onConnected?.(e)}handleDisconnected(){this.callbacks.onDisconnected?.(),this.state.reconnectAttempt<this.options.reconnectAttempts?this.scheduleReconnect():this.handleFailed("Max reconnection attempts reached")}handleFailed(e="Connection failed"){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.lastError=e,this.callbacks.onFailed?.(e)}handleClosed(){this.clearConnectionTimeout(),this.clearReconnectTimer()}handleICEFailed(){this.handleFailed("ICE connection failed")}handleICEDisconnected(){}scheduleReconnect(){this.state.reconnectAttempt++;const e=this.options.reconnectDelay*Math.pow(2,this.state.reconnectAttempt-1);this.callbacks.onReconnecting?.(this.state.reconnectAttempt,this.options.reconnectAttempts),this.timers.reconnectTimer=setTimeout(()=>{this.attemptReconnection()},e)}async attemptReconnection(){try{if(await this.peerConnection.restartIce(),this.role==="initiator"){const e=await this.peerConnection.createOffer({iceRestart:!0});if(await this.peerConnection.setLocalDescription(e),this.callbacks.onIceRestart)try{await this.callbacks.onIceRestart(e)}catch(t){throw console.error("ICE restart signaling failed:",t),t}else console.warn("No onIceRestart callback provided for signaling")}this.state.startTime=Date.now(),this.startConnectionTimeout()}catch(e){console.error("Reconnection attempt failed:",e),this.handleDisconnected()}}startConnectionTimeout(){this.clearConnectionTimeout(),this.timers.connectionTimeout=setTimeout(()=>{this.state.current!=="connected"&&this.handleFailed("Connection timeout")},this.options.connectionTimeout)}clearConnectionTimeout(){this.timers.connectionTimeout&&(clearTimeout(this.timers.connectionTimeout),this.timers.connectionTimeout=null)}clearReconnectTimer(){this.timers.reconnectTimer&&(clearTimeout(this.timers.reconnectTimer),this.timers.reconnectTimer=null)}updateState(e){this.state.previous=this.state.current,this.state.current=e}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState,connectionTime:Date.now()-this.state.startTime}}async forceReconnect(){this.state.reconnectAttempt=0,await this.attemptReconnection()}cleanup(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.peerConnection&&(this.peerConnection.onconnectionstatechange=null,this.peerConnection.oniceconnectionstatechange=null),this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null,onIceRestart:null},this.state={current:"closed",previous:this.state.current,startTime:Date.now(),reconnectAttempt:0,lastError:null}}}const Ba={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},f={roomId:null,role:null,wasConnected:!1,peerConnection:null,localStream:null,iceCandidateManager:null,connectionStateManager:null,roomRef:null};function Os(){return f.roomId}function Va(){return f.role}function Wa(n){f.localStream=n}function Ua(){return f.localStream}function Kn(){return f.peerConnection}async function rp({onRemoteStream:n,onStatusUpdate:e}){if(f.role="initiator",f.roomId||(f.roomId=cp()),f.peerConnection=new RTCPeerConnection(Ba),!f.localStream)throw e?.("Error: No local media. Please allow mic/camera."),new Error("connect called without localStream set");f.localStream.getTracks().forEach(s=>{f.peerConnection.addTrack(s,f.localStream)});const t=await f.peerConnection.createOffer();await f.peerConnection.setLocalDescription(t),f.roomRef=await up(f.roomId,t),f.peerConnection.ontrack=s=>{$a(s,n)},f.iceCandidateManager=new Ma(f.peerConnection,f.roomRef,"initiator"),f.connectionStateManager=new Fa(f.peerConnection,"initiator",{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),f.connectionStateManager.setCallbacks({onStateChange:(s,r)=>{},onConnected:s=>{},onDisconnected:()=>{e?.("Connection lost. Attempting to reconnect...")},onFailed:s=>{e?.(`Connection failed: ${s}`)},onReconnecting:(s,r)=>{e?.(`Reconnecting... (${s}/${r})`)},onIceRestart:async s=>{try{await f.roomRef.child("offer").set({type:s.type,sdp:s.sdp})}catch(r){throw console.error("Failed to send ICE restart offer:",r),r}}});let i=null;return f.roomRef.child("answer").on("value",async s=>{const r=s.val();if(r&&r.sdp!==i)try{const o=!!f.peerConnection.currentRemoteDescription,a=f.peerConnection.signalingState;if(a==="stable"&&!o||a==="closed")return;await f.peerConnection.setRemoteDescription(new RTCSessionDescription(r)),i=r.sdp,f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during answer processing")}catch(o){console.error("Failed to set remote description (caller):",o),e?.("Connection error: Failed to process answer")}}),La(f.roomId,"initiator","waiting"),e&&e("Link ready! Waiting for partner..."),{roomId:f.roomId,shareUrl:`${window.location.origin}${window.location.pathname}?room=${f.roomId}`}}async function op({roomId:n,onRemoteStream:e,onStatusUpdate:t}){f.roomId=n,f.role="joiner";const{roomRef:i,roomSnapshot:s}=await dp(n);if(!s.exists())return t&&t("Error: Invalid room link"),{success:!1};if(f.roomRef=i,f.peerConnection=new RTCPeerConnection(Ba),!f.localStream)throw t?.("Error: No local media. Please allow mic/camera."),new Error("join called without localStream set");f.localStream.getTracks().forEach(r=>{f.peerConnection.addTrack(r,f.localStream)}),f.peerConnection.ontrack=r=>{$a(r,e)},f.iceCandidateManager=new Ma(f.peerConnection,f.roomRef,"joiner"),f.connectionStateManager=new Fa(f.peerConnection,"joiner",{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),f.connectionStateManager.setCallbacks({onStateChange:(r,o)=>{},onConnected:r=>{},onDisconnected:()=>{t?.("Connection lost. Attempting to reconnect...")},onFailed:r=>{t?.(`Connection failed: ${r}`)},onReconnecting:(r,o)=>{t?.(`Reconnecting... (${r}/${o})`)}});try{const r=s.val().offer;await f.peerConnection.setRemoteDescription(new RTCSessionDescription(r)),f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during join");const o=await f.peerConnection.createAnswer();await f.peerConnection.setLocalDescription(o),await f.roomRef.child("answer").set({type:o.type,sdp:o.sdp}),La(f.roomId,"joiner","connecting");let a=f.peerConnection.currentRemoteDescription?.sdp;return f.roomRef.child("offer").on("value",async l=>{const c=l.val();if(c&&f.peerConnection.currentRemoteDescription&&c.sdp!==a)try{if(f.peerConnection.signalingState==="closed")return;await f.peerConnection.setRemoteDescription(c),a=c.sdp,f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during ICE restart");const u=await f.peerConnection.createAnswer();await f.peerConnection.setLocalDescription(u),await f.roomRef.child("answer").set({type:u.type,sdp:u.sdp})}catch(d){console.error("Failed to handle ICE restart offer:",d)}}),{success:!0}}catch(r){return console.error("Failed to join room:",r),t?.(`Failed to join: ${r.message}`),{success:!1}}}async function ap({onStatusUpdate:n}){f.iceCandidateManager&&(f.iceCandidateManager.cleanup(),f.iceCandidateManager=null),f.connectionStateManager&&(f.connectionStateManager.cleanup(),f.connectionStateManager=null),lp(),f.peerConnection&&(f.peerConnection.ontrack=null,f.peerConnection.onicecandidate=null,f.peerConnection.onconnectionstatechange=null,f.peerConnection.oniceconnectionstatechange=null,f.peerConnection.onicegatheringstatechange=null,f.peerConnection.close(),f.peerConnection=null),f.localStream&&(f.localStream.getTracks().forEach(e=>e.stop()),f.localStream=null),f.roomId&&f.role==="initiator"&&await hp(f.roomId),f.roomId=null,f.role=null,f.wasConnected=!1,f.roomRef=null,n&&n("Disconnected. Ready for new chat.")}function $a(n,e){f.wasConnected=!0,e&&e(n.streams[0])}function lp(){if(!f.roomId)return;const n=re.ref(`rooms/${f.roomId}`);n.child("answer").off(),n.child("offer").off(),n.child("callerCandidates").off(),n.child("calleeCandidates").off()}function cp(){return Math.random().toString(36).substring(2,15)}async function up(n,e){const t=re.ref(`rooms/${n}`);return await t.set({offer:{type:e.type,sdp:e.sdp}}),t}async function dp(n){const e=re.ref(`rooms/${n}`),t=await e.once("value");return{roomRef:e,roomSnapshot:t}}async function hp(n){await re.ref(`rooms/${n}`).remove()}async function Ha(n,e={}){const{timeout:t=5e3,checkInterval:i=500,minWidth:s=32,minHeight:r=32,blackThreshold:o=10}=e;return new Promise(a=>{const l=Date.now();let c=0;const d=()=>{if(c++,Date.now()-l>t){a({isValid:!1,reason:"timeout",message:"Video validation timed out",checks:c});return}if(!n.srcObject){setTimeout(d,i);return}if(n.readyState<2){setTimeout(d,i);return}if(n.videoWidth<s||n.videoHeight<r){setTimeout(d,i);return}const h=n.currentTime;setTimeout(()=>{if(n.currentTime===h&&!n.paused){a({isValid:!1,reason:"frozen",message:"Video appears to be frozen",checks:c});return}fp(n,o).then(m=>{a(m?{isValid:!1,reason:"black",message:"Video is showing black frames",checks:c}:{isValid:!0,reason:"valid",message:"Video stream is valid",checks:c,dimensions:{width:n.videoWidth,height:n.videoHeight}})}).catch(()=>{a({isValid:!0,reason:"valid_no_canvas",message:"Video stream appears valid (canvas check failed)",checks:c})})},100)};d()})}async function fp(n,e=10){return new Promise((t,i)=>{try{const s=document.createElement("canvas"),r=s.getContext("2d");s.width=Math.min(n.videoWidth,320),s.height=Math.min(n.videoHeight,240),r.drawImage(n,0,0,s.width,s.height);const a=r.getImageData(0,0,s.width,s.height).data;let l=0,c=0;for(let u=0;u<a.length;u+=16){const h=a[u],m=a[u+1],_=a[u+2],E=h*.299+m*.587+_*.114;l+=E,c++}const d=l/c;t(d<e)}catch(s){i(s)}})}function pp(n){if(!n)return{hasVideo:!1,hasAudio:!1,videoTracks:0,audioTracks:0,activeVideoTracks:0,activeAudioTracks:0};const e=n.getVideoTracks(),t=n.getAudioTracks(),i=e.filter(r=>r.enabled&&r.readyState==="live"),s=t.filter(r=>r.enabled&&r.readyState==="live");return{hasVideo:e.length>0,hasAudio:t.length>0,videoTracks:e.length,audioTracks:t.length,activeVideoTracks:i.length,activeAudioTracks:s.length,videoEnabled:i.length>0,audioEnabled:s.length>0}}function mp(n,e,t={}){const{checkInterval:i=2e3,maxFailures:s=3,autoRecover:r=!0}=t;let o=0,a=null,l=!0;const c=async()=>{if(l){try{const d=await Ha(n,{timeout:3e3,checkInterval:200});d.isValid?(o>0?(o=0,e?.({status:"recovered",message:"Video stream recovered",result:d})):a!=="valid"&&e?.({status:"valid",message:"Video stream is healthy",result:d}),a="valid"):(o++,o>=s?(e?.({status:"failed",message:`Video stream validation failed: ${d.message}`,result:d,failureCount:o}),a="failed"):(e?.({status:"warning",message:`Video stream issue detected: ${d.message} (${o}/${s})`,result:d,failureCount:o}),a="warning"))}catch(d){console.warn("Video stream monitoring error:",d)}l&&setTimeout(c,i)}};return setTimeout(c,1e3),()=>{l=!1}}class _p{constructor(e={}){this.options={videoValidationTimeout:8e3,maxRetries:3,retryDelay:2e3,monitorInterval:3e3,...e},this.state={connectionState:"idle",videoValidated:!1,audioValidated:!1,retryCount:0,lastError:null},this.callbacks={onStatusUpdate:null,onConnectionStateChange:null,onValidationComplete:null},this.monitors={video:null,connection:null}}setCallbacks({onStatusUpdate:e,onConnectionStateChange:t,onValidationComplete:i}){this.callbacks.onStatusUpdate=e,this.callbacks.onConnectionStateChange=t,this.callbacks.onValidationComplete=i}async startMonitoring(e,t){this.updateConnectionState("connecting"),this.updateStatus("Establishing connection..."),this.monitorPeerConnection(t);try{await new Promise(i=>setTimeout(i,2e3)),await this.validateRemoteVideo(e),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(e),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated})}catch(i){this.updateConnectionState("connected"),this.updateStatus("Connected! (Video validation skipped)"),this.callbacks.onValidationComplete?.({success:!0,videoValidated:!1,audioValidated:!1,warning:i.message})}}async validateRemoteVideo(e){this.updateConnectionState("validating"),this.updateStatus("Validating video stream...");const t=await Ha(e,{timeout:this.options.videoValidationTimeout,checkInterval:1e3,minWidth:16,minHeight:16,blackThreshold:5});if(t.isValid)this.state.videoValidated=!0;else if(t.reason==="frozen"||t.reason==="timeout")this.state.videoValidated=!1;else throw new Error(`Video validation failed: ${t.message}`);if(e.srcObject){const i=pp(e.srcObject);this.state.audioValidated=i.audioEnabled}return t}monitorPeerConnection(e){e&&(e.onconnectionstatechange=()=>{switch(e.connectionState){case"connected":break;case"disconnected":this.updateConnectionState("reconnecting"),this.updateStatus("Connection lost. Attempting to reconnect...");break;case"failed":this.updateConnectionState("failed"),this.updateStatus("Connection failed. Please try again.");break;case"closed":this.updateConnectionState("idle"),this.updateStatus("Connection closed."),this.cleanup();break}},e.oniceconnectionstatechange=()=>{e.iceConnectionState==="failed"&&this.handleConnectionFailure("ICE connection failed")})}startContinuousMonitoring(e){this.monitors.video=mp(e,t=>this.handleVideoMonitorUpdate(t),{checkInterval:this.options.monitorInterval*2,maxFailures:5,autoRecover:!0})}handleVideoMonitorUpdate(e){e.status}async handleValidationFailure(e,t,i){if(this.state.lastError=e,this.state.retryCount++,this.state.retryCount<=this.options.maxRetries){this.updateStatus(`Connection issue detected. Retrying... (${this.state.retryCount}/${this.options.maxRetries})`),await new Promise(s=>setTimeout(s,this.options.retryDelay));try{await this.validateRemoteVideo(t),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(t),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated,retriesUsed:this.state.retryCount})}catch(s){await this.handleValidationFailure(s,t,i)}}else this.updateConnectionState("failed"),this.updateStatus("Connection failed: Unable to establish video stream. Please try again."),this.callbacks.onValidationComplete?.({success:!1,error:e.message,retriesUsed:this.state.retryCount})}handleConnectionFailure(e){this.updateConnectionState("failed"),this.updateStatus(`Connection failed: ${e}`),this.cleanup()}updateConnectionState(e){const t=this.state.connectionState;this.state.connectionState=e,t!==e&&this.callbacks.onConnectionStateChange?.(e,t)}updateStatus(e){this.callbacks.onStatusUpdate?.(e)}getState(){return{...this.state}}cleanup(){this.monitors.video&&(this.monitors.video(),this.monitors.video=null),this.state.connectionState="idle",this.state.videoValidated=!1,this.state.audioValidated=!1,this.state.retryCount=0,this.state.lastError=null}}let A=null,Ke=!1,gp=()=>!!document.pictureInPictureElement;async function yp(n,e,t,i=!1){console.log("[PiP] Toggle requested",{hasDocumentPiP:"documentPictureInPicture"in window,hasStream:!!n.srcObject,hasFloatingWindow:!!document.pictureInPictureElement,documentPipWindowOpen:!!A,nativePipActive:gp()});try{if(!n.srcObject){console.warn("[PiP] No remote stream available"),t("Connect to a partner first");return}if(document.pictureInPictureElement){console.log("[PiP] Exiting active native PiP (via custom button)"),await document.exitPictureInPicture(),Ke=!1,e.textContent="Float Partner Video";return}if(A){console.log("[PiP] Closing existing Document PiP window"),A.close(),A=null,e.textContent="Float Partner Video";return}if(n.offsetParent===null&&!("documentPictureInPicture"in window)){console.warn("[PiP] Video is hidden and Document PiP not available"),t("Switch to Video Chat mode to use floating window");return}if(i&&"documentPictureInPicture"in window){await vp(n,e);return}if("pictureInPictureEnabled"in document){await Cp(n,e);return}}catch(s){console.error("[PiP] Error:",s.name,s.message,s),s.name==="NotAllowedError"?t("Picture-in-Picture blocked. Check browser permissions."):s.name==="InvalidStateError"?t("Cannot open PiP - video not ready"):t("Picture-in-Picture failed. See console for details.")}}async function vp(n,e){console.log("[PiP] Opening Document PiP window");try{if(A=await window.documentPictureInPicture.requestWindow({width:400,height:300}),console.log("[PiP] Document PiP window created",{width:A.innerWidth,height:A.innerHeight,closed:A.closed}),A.closed)throw console.error("[PiP] Window was closed immediately after creation"),A=null,new Error("PiP window closed immediately");[...document.styleSheets].forEach(a=>{try{const l=[...a.cssRules].map(d=>d.cssText).join(""),c=document.createElement("style");c.textContent=l,A.document.head.appendChild(c)}catch{const c=document.createElement("link");c.rel="stylesheet",c.href=a.href,A.document.head.appendChild(c)}}),A.document.body.innerHTML=`
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;const t=A.document.getElementById("pipVideo"),i=A.document.getElementById("pipMute"),s=n.srcObject.getVideoTracks(),r=n.srcObject.getAudioTracks();console.log("[PiP] Stream tracks:",{video:s.length,audio:r.length,videoActive:s[0]?.enabled,audioActive:r[0]?.enabled}),t.srcObject=n.srcObject,console.log("[PiP] Stream attached to PiP video"),console.log("[PiP] Video will autoplay (muted initially for browser policy)");let o=!0;i.addEventListener("click",()=>{if(!n.srcObject){console.warn("[PiP] Remote stream no longer available");return}o=!o,t.muted=o,o?n.muted=!1:n.muted=!0,i.textContent=o?"Unmute Partner":"Mute Partner",i.style.background=o?"#ff9800":"#4caf50",console.log("[PiP] Partner audio in PiP window:",o?"MUTED":"UNMUTED")}),A.addEventListener("pagehide",()=>{console.log("[PiP] Document PiP window closed by user or browser"),A=null,e.textContent="Float Partner Video"}),A.addEventListener("load",()=>{console.log("[PiP] Document PiP window loaded event fired")}),t.addEventListener("error",a=>{console.error("[PiP] Video element error:",a)}),t.addEventListener("loadedmetadata",()=>{console.log("[PiP] Video metadata loaded in PiP window")}),e.textContent="Close Float Window",console.log("[PiP] Document PiP setup complete")}catch(t){throw console.error("[PiP] Error during Document PiP setup:",t),A&&(A.close(),A=null),t}}async function Cp(n,e){document.pictureInPictureElement?(console.log("[PiP] Exiting native PiP"),await document.exitPictureInPicture(),Ke=!1,e.textContent="Float Partner Video"):(console.log("[PiP] Entering native PiP"),await n.requestPictureInPicture(),Ke=!0,e.textContent="Exit Float Mode")}function wp(n,e){n.addEventListener("enterpictureinpicture",()=>{console.log("[PiP] Remote video entered native PiP (via browser controls)"),Ke=!0,e.textContent="Exit Float Mode"}),n.addEventListener("leavepictureinpicture",()=>{console.log("[PiP] Remote video exited native PiP (via browser controls)"),Ke=!1,e.textContent="Float Partner Video"})}function bp(n){console.log("[PiP] Cleanup requested"),A&&(console.log("[PiP] Closing Document PiP window during cleanup"),A.close(),A=null),Ke&&document.pictureInPictureElement&&(console.log("[PiP] Exiting native PiP during cleanup"),document.exitPictureInPicture().catch(e=>{console.warn("[PiP] Failed to exit native PiP:",e)}),Ke=!1),n&&(n.textContent="Float Partner Video",n.style.display="none"),console.log("[PiP] Cleanup complete")}const ye={_initialized:!1,youtube:{apiKey:null,baseUrl:"https://www.googleapis.com/youtube/v3",quotaExceeded:!1}};function Ep(){ye._initialized||(ye._initialized=!0,ye.youtube.apiKey="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ")}function Jn(){return{apiKey:ye.youtube.apiKey,baseUrl:ye.youtube.baseUrl,isAvailable:!!ye.youtube.apiKey&&!ye.youtube.quotaExceeded}}function an(n=!0){ye.youtube.quotaExceeded=n}function Sp(){const n=[],e=[];return ye.youtube.apiKey||(n.push("VITE_YOUTUBE_API_KEY"),e.push("YouTube search functionality will not be available")),{isValid:n.length===0,missing:n,warnings:e}}const Ae={player:null,ready:!1,currentId:null};function Ht(n){return/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/.test(n)}function Ls(n){const e=n.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);return e?e[1]:null}function Ms(n,e,t){e.style.display="none";const i=document.getElementById("yt-iframe");i&&i.remove();let s=document.getElementById("yt-player-div");s||(s=document.createElement("div"),s.id="yt-player-div",e.parentNode.insertBefore(s,e)),s.innerHTML='<div id="yt-iframe"></div>',s.style.display="",Ae.player=new YT.Player("yt-iframe",{height:"360",width:"640",videoId:n,events:{onReady:()=>{Ae.ready=!0},onStateChange:t}}),Ae.currentId=n}function Fs(n){const e=document.getElementById("yt-player-div");e&&(e.style.display="none"),n.style.display="",Ae.player=null,Ae.ready=!1,Ae.currentId=null}function Vi(){return Ae.player}function Wi(){return Ae.ready}const x={searchCache:new Map,cacheTimeout:300*1e3,maxCacheSize:50,rateLimiter:{requests:[],maxRequests:100,windowMs:1440*60*1e3}};async function Ip(n,e={}){if(!n||typeof n!="string")throw new Error("Search query is required");if(!Jn().isAvailable)throw new Error("YouTube API not available");if(!ja())throw new Error("Rate limit exceeded");const i=kp(n,e),s=Ap(i);if(s)return s;try{const r=await Rp(n,e);return Np(i,r),Dp(),r}catch(r){throw Op(r),r}}function za(){return Jn().isAvailable&&ja()}function Tp(){const n=Jn();return{isAvailable:n.isAvailable,hasApiKey:!!n.apiKey,cacheSize:x.searchCache.size,rateLimitStatus:xp()}}async function Rp(n,e){const t=Jn(),i=new URL(`${t.baseUrl}/search`);i.searchParams.set("part","snippet"),i.searchParams.set("type","video"),i.searchParams.set("q",n),i.searchParams.set("maxResults",e.maxResults||10),i.searchParams.set("key",t.apiKey),e.order&&i.searchParams.set("order",e.order),e.videoDuration&&i.searchParams.set("videoDuration",e.videoDuration),e.videoDefinition&&i.searchParams.set("videoDefinition",e.videoDefinition);const s=await fetch(i.toString());if(!s.ok){if(s.status===403){const a=(await s.json().catch(()=>({}))).error?.errors?.[0]?.reason;throw a==="quotaExceeded"?(an(!0),new Error("YouTube API quota exceeded")):a==="keyInvalid"||a==="keyRestricted"?(an(!0),new Error("YouTube API key is invalid or restricted")):(an(!0),new Error("YouTube API access denied - quota exceeded or key restricted"))}throw new Error(`Search request failed: ${s.status}`)}const r=await s.json();return r.items?r.items.map(Pp):[]}function Pp(n){const e=n.snippet;return{videoId:n.id.videoId,title:e.title,description:e.description,thumbnail:e.thumbnails.medium?.url||e.thumbnails.default?.url,channelTitle:e.channelTitle,publishedAt:e.publishedAt,url:`https://www.youtube.com/watch?v=${n.id.videoId}`}}function kp(n,e){const t=JSON.stringify(e);return`search-${n}-${t}`}function Ap(n){const e=x.searchCache.get(n);return e?Date.now()-e.timestamp>x.cacheTimeout?(x.searchCache.delete(n),null):e.results:null}function Np(n,e){if(x.searchCache.size>=x.maxCacheSize){const t=x.searchCache.keys().next().value;x.searchCache.delete(t)}x.searchCache.set(n,{results:e,timestamp:Date.now()})}function ja(){const e=Date.now()-x.rateLimiter.windowMs;return x.rateLimiter.requests=x.rateLimiter.requests.filter(t=>t>e),x.rateLimiter.requests.length<x.rateLimiter.maxRequests}function Dp(){x.rateLimiter.requests.push(Date.now())}function xp(){const e=Date.now()-x.rateLimiter.windowMs;return x.rateLimiter.requests=x.rateLimiter.requests.filter(t=>t>e),{requestsUsed:x.rateLimiter.requests.length,requestsRemaining:x.rateLimiter.maxRequests-x.rateLimiter.requests.length,windowMs:x.rateLimiter.windowMs}}function Op(n){n.message.includes("quota exceeded")&&an(!0)}const g={searchInput:null,searchButton:null,searchResults:null,isSearching:!1,currentResults:[],onVideoSelect:null,availabilityCheckInterval:null};function Lp(n){if(g.onVideoSelect=n,g.searchInput=document.getElementById("searchQuery"),g.searchButton=document.getElementById("searchBtn"),g.searchResults=document.getElementById("searchResults"),!g.searchInput||!g.searchButton||!g.searchResults){console.warn("Search UI elements not found");return}Fp(),Bs(),Hp()}async function Mp(n){if(!n||n.trim().length===0){nn();return}if(!g.isSearching)try{g.isSearching=!0,Wr(!0),Bp();const e=await Ip(n.trim(),{maxResults:10,order:"relevance"});g.currentResults=e,Wp(e)}catch(e){console.error("Search failed:",e),Vp(e.message)}finally{g.isSearching=!1,Wr(!1)}}function nn(){g.searchResults&&(g.searchResults.style.display="none",g.searchResults.innerHTML=""),g.currentResults=[]}function Bs(){const n=za(),e=Tp();g.searchInput&&g.searchButton&&(g.searchInput.disabled=!n,g.searchButton.disabled=!n,n?(g.searchInput.placeholder="Search YouTube videos...",g.searchResults&&g.searchResults.innerHTML.includes("search-unavailable")&&nn()):e.hasApiKey?(g.searchInput.placeholder="YouTube search temporarily unavailable",Ur("quota-exceeded")):(g.searchInput.placeholder="YouTube search unavailable - no API key",Ur("no-api-key")))}function Fp(){g.searchButton.addEventListener("click",Vr),g.searchInput.addEventListener("keypress",n=>{n.key==="Enter"&&Vr()}),g.searchInput.addEventListener("input",n=>{n.target.value.trim().length===0&&nn()})}async function Vr(){const n=g.searchInput.value;await Mp(n)}function Wr(n){g.searchButton&&(g.searchButton.disabled=n||!za(),g.searchButton.textContent=n?"Searching...":"Search")}function Bp(){g.searchResults&&(g.searchResults.style.display="block",g.searchResults.innerHTML=`
      <div class="search-loading">
        Searching YouTube videos...
      </div>
    `)}function Vp(n){if(g.searchResults){g.searchResults.style.display="block";let e="Search failed. Please try again.";n.includes("quota exceeded")?e="YouTube search quota exceeded. Please try again later or use manual URL input.":n.includes("API not available")?e="YouTube search is currently unavailable. Please use manual URL input.":n.includes("key is invalid")||n.includes("key restricted")?e="YouTube API key configuration issue. Please check your API key or use manual URL input.":n.includes("access denied")&&(e="YouTube search is temporarily unavailable. Please use manual URL input."),g.searchResults.innerHTML=`
      <div class="search-error">
        ${e}
      </div>
    `}}function Ur(n){if(!g.searchResults)return;let e,t,i;n==="no-api-key"?(e="YouTube Search Unavailable",t="YouTube search requires an API key to function.",i="You can still watch videos by pasting YouTube URLs directly in the input field below."):n==="quota-exceeded"?(e="YouTube Search Temporarily Unavailable",t="The YouTube search quota has been exceeded for today.",i="You can still watch videos by pasting YouTube URLs directly in the input field below."):(e="YouTube Search Unavailable",t="YouTube search is currently not available.",i="You can still watch videos by pasting YouTube URLs directly in the input field below."),g.searchResults.style.display="block",g.searchResults.innerHTML=`
    <div class="search-unavailable">
      <div class="search-unavailable-title">${e}</div>
      <div class="search-unavailable-message">${t}</div>
      <div class="search-unavailable-suggestion">${i}</div>
      <div class="search-unavailable-examples">
        <strong>Supported formats:</strong>
        <ul>
          <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
          <li>https://youtu.be/VIDEO_ID</li>
          <li>Direct video file URLs</li>
        </ul>
      </div>
    </div>
  `}function Wp(n){if(!g.searchResults)return;if(n.length===0){g.searchResults.style.display="block",g.searchResults.innerHTML=`
      <div class="search-no-results">
        No videos found. Try a different search term.
      </div>
    `;return}const e=n.map(i=>Up(i)).join("");g.searchResults.style.display="block",g.searchResults.innerHTML=e,g.searchResults.querySelectorAll(".search-result-item").forEach((i,s)=>{i.addEventListener("click",()=>$p(n[s]))})}function Up(n){return`
    <div class="search-result-item" data-video-id="${n.videoId}">
      <img 
        src="${n.thumbnail}" 
        alt="${on(n.title)}"
        class="search-result-thumbnail"
        loading="lazy"
      />
      <div class="search-result-info">
        <div class="search-result-title">${on(n.title)}</div>
        <div class="search-result-channel">${on(n.channelTitle)}</div>
        <div class="search-result-description">${on(n.description)}</div>
      </div>
    </div>
  `}function $p(n){g.onVideoSelect&&g.onVideoSelect(n),nn(),g.searchInput&&(g.searchInput.value="")}function Hp(){g.availabilityCheckInterval=setInterval(()=>{Bs()},300*1e3)}function zp(){g.availabilityCheckInterval&&(clearInterval(g.availabilityCheckInterval),g.availabilityCheckInterval=null)}function jp(){zp(),nn()}function on(n){if(!n)return"";const e=document.createElement("div");return e.textContent=n,e.innerHTML}const O={watchMode:!1,isSyncing:!1,streamUrl:""};function qp(){return O.watchMode}function Gp(){return O.isSyncing}function Yp(){return O.streamUrl}function Qp(n){O.streamUrl=n}function Kp(){return{isConnected:!0,isSyncing:O.isSyncing,lastError:null,autoResyncEnabled:!1,manualResyncAvailable:!1,playerReady:!0,hasActiveVideo:!!O.streamUrl,syncHealth:{score:100,status:"excellent",issues:[]}}}function Jp(){return Promise.resolve(!1)}function Xp(n){}function Zp(){return{lastError:null,timestamp:null,syncHealth:{score:100,status:"excellent",issues:[]},componentStatus:{syncManager:!1,playerAdapter:!1,transport:!1,webrtcConnected:!1},troubleshootingSteps:[]}}function em(n){return Promise.resolve(!1)}function tm(){Lp(nm),Bs()}async function nm(n){const e=document.getElementById("sharedVideo"),t=document.getElementById("streamUrl"),i=document.getElementById("syncStatus");t&&(t.value=n.url),i&&(i.textContent=`Loading "${n.title}"...`);try{const s=Os();s?await qa({roomId:s,url:n.url,sharedVideo:e,syncStatus:i||{textContent:`Loading "${n.title}"...`}}):await im(n.url,e,i)}catch(s){console.error("Failed to load selected video:",s),i&&(i.textContent="Failed to load video. Please try again.")}}async function im(n,e,t){if(Ht(n)){const i=Ls(n);Ms(i,e,()=>{}),t&&(t.textContent="YouTube video loaded (local playback)")}else Fs(e),e.src=n,e.style.display="block",t&&(t.textContent="Video loaded (local playback)")}function sm({videoContainer:n,watchContainer:e,toggleModeBtn:t,sharedVideo:i,streamUrlInput:s,syncStatus:r}){return O.watchMode=!O.watchMode,O.watchMode?(n.style.display="none",e.style.display="block",t.textContent="Switch to Video Chat",r.textContent="Search for videos or paste the same stream URL as your partner",tm()):(n.style.display="flex",e.style.display="none",t.textContent="Switch to Watch Mode",i.src="",s.value="",jp()),O.watchMode}function qa({roomId:n,url:e,sharedVideo:t,syncStatus:i}){if(!e){i.textContent="Please enter a stream URL";return}if(Ht(e)){const s=Ls(e);Ms(s,t,r=>Ga(r,n)),i.textContent="YouTube video sent to partner..."}else Fs(t),t.src=e,i.textContent="Video sent to partner...";n&&re.ref(`rooms/${n}/stream`).set({url:e})}function rm({roomId:n,sharedVideo:e,streamUrlInput:t,syncStatus:i}){if(!n)return;const s=re.ref(`rooms/${n}`);s.child("stream/url").on("value",r=>{const o=r.val();o&&o!==t.value&&(t.value=o,i.innerHTML='Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>',document.getElementById("accept-shared-video").addEventListener("click",()=>om({url:o,sharedVideo:e,syncStatus:i})),i.style.background="#2196f3")}),s.child("stream/playing").on("value",async r=>{if(O.isSyncing)return;const o=r.val(),a=t.value,l=Vi(),c=Wi();if(Ht(a)&&l&&c)o===!0&&l.getPlayerState()!==YT.PlayerState.PLAYING?(l.playVideo(),i.textContent="Playing in sync"):o===!1&&l.getPlayerState()===YT.PlayerState.PLAYING&&(l.pauseVideo(),i.textContent="Partner pressed pause");else if(o===!0&&e.paused)try{await e.play(),i.textContent="Playing in sync"}catch{i.textContent="▶️ Tap the video to start playing",i.style.background="#FF5722",i.style.fontSize="16px";const u=()=>{i.style.background="#2a2a2a",i.style.fontSize="14px",e.removeEventListener("play",u)};e.addEventListener("play",u)}else o===!1&&!e.paused&&(e.pause(),i.textContent="Partner pressed pause")}),s.child("stream/time").on("value",r=>{if(O.isSyncing)return;const o=r.val(),a=t.value,l=Vi(),c=Wi();Ht(a)&&l&&c?o!==null&&Math.abs(l.getCurrentTime()-o)>2&&(l.seekTo(o,!0),i.textContent=`Syncing to ${Math.floor(o)}s`):o!==null&&Math.abs(e.currentTime-o)>2&&(e.currentTime=o,i.textContent=`Syncing to ${Math.floor(o)}s`)}),am({roomId:n,sharedVideo:e})}function Ga(n,e){const t=Vi(),i=Wi();!e||!i||!t||(n.data===YT.PlayerState.PLAYING?re.ref(`rooms/${e}/stream`).update({playing:!0,time:t.getCurrentTime()}):n.data===YT.PlayerState.PAUSED&&re.ref(`rooms/${e}/stream`).update({playing:!1,time:t.getCurrentTime()}))}function om({url:n,sharedVideo:e,syncStatus:t}){if(Ht(n)){const i=Ls(n);Ms(i,e,Ga),t.textContent="Loading YouTube video..."}else Fs(e),e.src=n,t.textContent="Loading shared video...";t.style.background="#2a2a2a"}function am({roomId:n,sharedVideo:e}){e.addEventListener("play",()=>{n&&!O.isSyncing&&(O.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({playing:!0,time:e.currentTime}),setTimeout(()=>O.isSyncing=!1,1e3))}),e.addEventListener("pause",()=>{n&&!O.isSyncing&&(O.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({playing:!1,time:e.currentTime}),setTimeout(()=>O.isSyncing=!1,1e3))}),e.addEventListener("seeked",()=>{n&&!O.isSyncing&&(O.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({time:e.currentTime}),setTimeout(()=>O.isSyncing=!1,1e3))}),e.addEventListener("loadeddata",()=>{}),e.addEventListener("waiting",()=>{}),e.addEventListener("playing",()=>{})}const lm=Object.freeze(Object.defineProperty({__proto__:null,executeTroubleshootingAction:em,getErrorDetails:Zp,getIsSyncing:Gp,getStreamUrl:Yp,getSyncStatusInfo:Kp,getWatchMode:qp,loadStream:qa,setAutoResyncEnabled:Xp,setStreamUrl:Qp,setupWatchSync:rm,toggleWatchMode:sm,triggerManualResync:Jp},Symbol.toStringTag,{value:"Module"})),ne={isAudioMuted:!1,isVideoOn:!0,currentFacingMode:"user"};function cm({localStream:n,muteSelfBtn:e}){const t=n.getAudioTracks()[0];if(t&&(ne.isAudioMuted=!ne.isAudioMuted,t.enabled=!ne.isAudioMuted,e)){const i=e.querySelector("i");i&&(i.className=ne.isAudioMuted?"fa fa-microphone":"fa fa-microphone-slash")}}function um({localStream:n,videoSelfBtn:e}){const t=n.getVideoTracks()[0];if(t&&(ne.isVideoOn=!ne.isVideoOn,t.enabled=ne.isVideoOn,e)){const i=e.querySelector("i");i&&(i.className=ne.isVideoOn?"fa fa-video":"fa fa-video-slash",e.setAttribute("aria-label",ne.isVideoOn?"Turn video off":"Turn video on"))}}async function dm({localStream:n,localVideo:e,peerConnection:t}){const i=ne.currentFacingMode==="user"?"environment":"user",s=n.getVideoTracks()[0];try{await s.applyConstraints({facingMode:i}),ne.currentFacingMode=i;return}catch(a){console.warn("applyConstraints failed, falling back to getUserMedia:",a)}const r=await navigator.mediaDevices.getUserMedia({video:{facingMode:i},audio:!1}),o=r.getVideoTracks()[0];if(t){const a=t.getSenders().find(l=>l.track&&l.track.kind==="video");a&&a.replaceTrack(o)}n.removeTrack(s),n.addTrack(o),e.srcObject=n,s.stop(),r.getTracks().forEach(a=>{a!==o&&a.stop()}),ne.currentFacingMode=i}function hm(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function fm(){return hm()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function pm(){const n=await fm();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}const mm=async n=>{try{n.requestFullscreen?await n.requestFullscreen():n.webkitRequestFullscreen?await n.webkitRequestFullscreen():n.msRequestFullscreen?await n.msRequestFullscreen():console.warn("Fullscreen API is not supported by this browser.")}catch(e){console.error("Failed to enter fullscreen mode:",e)}},$r=n=>{mm(n)},_m=(n,e)=>{const t=n.srcObject?.getAudioTracks()[0];if(t){t.enabled=!t.enabled;const i=e.querySelector("i");i&&(i.className=t.enabled?"fa fa-volume-mute":"fa fa-volume-up")}},gm=({localStream:n,muteSelfBtn:e,onStateChange:t})=>{cm({localStream:n,muteSelfBtn:e}),t&&t()},ym=({localStream:n,videoSelfBtn:e,onStateChange:t})=>{um({localStream:n,videoSelfBtn:e}),t&&t()},vm=async({localStream:n,localVideo:e,peerConnection:t,onStateChange:i})=>{await dm({localStream:n,localVideo:e,peerConnection:t}),i&&i()};async function Cm({localVideo:n,remoteVideo:e,muteSelfBtn:t,videoSelfBtn:i,switchCameraSelfBtn:s,fullscreenSelfBtn:r,mutePartnerBtn:o,fullscreenPartnerBtn:a,getLocalStream:l,getPeerConnection:c,onStateChange:d}){t&&t.addEventListener("click",()=>gm({localStream:l(),muteSelfBtn:t,onStateChange:d})),i&&i.addEventListener("click",()=>ym({localStream:l(),videoSelfBtn:i,onStateChange:d})),s&&(await pm()?(s.style.display="block",s.addEventListener("click",()=>vm({localStream:l(),localVideo:n,peerConnection:c(),onStateChange:d}))):s.style.display="none"),r&&r.addEventListener("click",()=>$r(n)),o&&o.addEventListener("click",()=>_m(e,o)),a&&a.addEventListener("click",()=>$r(e))}function wm({startChatBtn:n,hangUpBtn:e,copyLinkBtn:t,toggleModeBtn:i,loadStreamBtn:s,pipBtn:r,remoteVideo:o,handleStartChat:a,handleHangUp:l,handleCopyLink:c,handleToggleMode:d,handleLoadStream:u,handlePipToggle:h,updateStatus:m}){document.addEventListener("keydown",_=>{_.altKey&&_.key==="p"&&o.srcObject&&(_.preventDefault(),h())}),n.addEventListener("click",a),e.addEventListener("click",l),t.addEventListener("click",c),i.addEventListener("click",d),s.addEventListener("click",u),r.addEventListener("click",h)}function bm(n,e){let t="Error: Could not access camera/mic.";n.name==="NotAllowedError"?t+=" Permission denied. Please allow access to your camera and microphone.":n.name==="NotFoundError"||n.name==="DevicesNotFoundError"?t+=" No camera or microphone found on this device.":n.name==="NotReadableError"||n.name==="TrackStartError"?t+=" Camera or microphone is already in use by another application.":n.name==="OverconstrainedError"||n.name==="ConstraintNotSatisfiedError"?t+=" The requested media device is not available or does not support the requested constraints.":n.name==="NotSupportedError"?t+=" Your browser or device does not support video/audio capture, or HTTPS is required.":t+=" "+n.message,console.error("Media error:",t,n)}function Em(n){let e;function t(){n.classList.add("show-controls"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("show-controls")},3e3)}n.addEventListener("touchstart",t,{passive:!0}),n.addEventListener("click",s=>{s.target instanceof Element&&s.target.closest(".hover-controls")||t()});const i=n.querySelector(".hover-controls");i&&(i.addEventListener("mouseenter",()=>clearTimeout(e)),i.addEventListener("touchstart",()=>clearTimeout(e),{passive:!0}),i.addEventListener("click",()=>clearTimeout(e)),i.addEventListener("mouseleave",()=>{e=setTimeout(()=>{n.classList.remove("show-controls")},2e3)}))}async function Sm(n,e){try{return await navigator.clipboard.writeText(n.value),e.textContent="Copied!",setTimeout(()=>e.textContent="Copy Link",2e3),!0}catch(t){return console.error("Failed to copy: ",t),!1}}const Im=lm,{toggleWatchMode:Tm,loadStream:Rm,setupWatchSync:Ya,setStreamUrl:Pm}=Im;let He=null;function yt(){Pm(dt.value)}let Ui=!1;async function Qa(){if(Ui)return!0;Ui=!0;try{Ep(),Sp().isValid;const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});Wa(e),di.srcObject=e,await Cm({localVideo:di,remoteVideo:Q,muteSelfBtn:il,videoSelfBtn:sl,switchCameraSelfBtn:Xa,fullscreenSelfBtn:rl,mutePartnerBtn:tl,fullscreenPartnerBtn:nl,getLocalStream:Ua,getPeerConnection:Kn,onStateChange:yt}),wm({startChatBtn:ze,hangUpBtn:Tn,copyLinkBtn:Vs,toggleModeBtn:Hr,loadStreamBtn:Za,pipBtn:Pt,remoteVideo:Q,handleStartChat:Am,handleHangUp:Dm,handleCopyLink:async()=>{const o=await Sm($i,Vs);le(o?"Link copied!":"Please copy manually.")},handleToggleMode:xm,handleLoadStream:Om,handlePipToggle:()=>yp(Q,Pt,le),updateStatus:le});const i=new URLSearchParams(window.location.search).get("room"),s=al(),r=km({urlRoomId:i,savedState:s});return r.action==="join"?(le("Connecting..."),ze.style.display="none",await Nm(r.roomId)):le("Ready. Click to generate video chat link."),!0}catch(n){return bm(n),!1}}function km({urlRoomId:n,savedState:e}){const t=n;return t?{action:"join",roomId:t}:{action:"idle"}}function Ka(n){Q.srcObject!==n&&(Q.srcObject=n,Pt.style.display="block",wp(Q,Pt),yt(),le("Received video stream. Validating..."),Q.paused&&Q.srcObject&&Q.play().catch(e=>{}),He||(He=new _p({videoValidationTimeout:1e4,maxRetries:3,retryDelay:2e3}),He.setCallbacks({onStatusUpdate:le,onConnectionStateChange:(e,t)=>{},onValidationComplete:e=>{e.success||console.warn("Video stream validation failed:",e.error)}})),He.startMonitoring(Q,Kn()))}async function Am(){if(!(Os()||ze.disabled))try{if(!await Qa()){console.error("Failed to initialize media devices.");return}const{roomId:e,shareUrl:t}=await rp({onRemoteStream:Ka,onStatusUpdate:le});$i.value=t,hi.style.display="block",ze.disabled=!0,Tn.disabled=!1,Ya({roomId:e,sharedVideo:zt,streamUrlInput:dt,syncStatus:jt,peerConnection:Kn(),callerRole:Va()}),Ja(),yt()}catch(n){console.error("Failed to initiate chat room:",n),ze.disabled=!1,hi.style.display="none"}}async function Nm(n){(await op({roomId:n,onRemoteStream:Ka,onStatusUpdate:le})).success&&(Ya({roomId:n,sharedVideo:zt,streamUrlInput:dt,syncStatus:jt,peerConnection:Kn(),callerRole:Va()}),Tn.disabled=!1,Ja(),yt())}async function Dm(){if(Ui=!1,bp(Pt),He){try{He.cleanup()}catch{}He=null}Q.srcObject&&(Q.srcObject.getTracks().forEach(e=>e.stop()),Q.srcObject=null);const n=Ua();n&&(n.getTracks().forEach(e=>e.stop()),di.srcObject=null,Wa(null)),await ap({onStatusUpdate:le}),ze.disabled=!1,ze.style.display="block",Tn.disabled=!0,hi.style.display="none",zr.style.display="none",jr.style.display="flex",$i.value="",zt.src="",dt.value="",jt.textContent="",Lm(),window.history.replaceState({},document.title,window.location.pathname),fi()}function le(n,e=el){e.textContent=n}function xm(){Tm({videoContainer:jr,watchContainer:zr,toggleModeBtn:Hr,sharedVideo:zt,streamUrlInput:dt,syncStatus:jt}),yt()}function Om(){const n=dt.value.trim();Rm({roomId:Os(),url:n,sharedVideo:zt,syncStatus:jt}),yt()}function Ja(){qr.href=""}function Lm(){qr.href="https://kristinnroach.github.io/HangVidU/"}document.querySelectorAll(".video-wrapper").forEach(Em);Qa();
