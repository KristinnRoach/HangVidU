(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ot=document.getElementById("localVideo"),z=document.getElementById("remoteVideo"),Kt=document.getElementById("sharedVideo"),at=document.getElementById("startChat"),lt=document.getElementById("hangUp"),zs=document.getElementById("copyLink"),Mt=document.getElementById("pipBtn"),dn=document.getElementById("switchCameraBtn"),ct=document.getElementById("toggleMute"),ut=document.getElementById("toggleVideo"),Ge=document.getElementById("toggleMode"),nl=document.getElementById("loadStream"),il=document.getElementById("status"),Gi=document.getElementById("linkContainer"),Yr=document.getElementById("watchContainer"),Qr=document.querySelector(".video-container"),Jt=document.getElementById("syncStatus"),xn=document.getElementById("shareLink"),Fe=document.getElementById("streamUrl"),Gs=document.getElementById("mutePartnerBtn"),sl=document.getElementById("fullscreenPartnerBtn"),Kr=document.getElementById("muteSelfBtn"),rl=document.getElementById("fullscreenSelfBtn"),qi="hangvidu_session",ol=1440*60*1e3;function al(n){const e={...n,timestamp:Date.now()};localStorage.setItem(qi,JSON.stringify(e))}function hn(){const n=localStorage.getItem(qi);if(!n)return null;try{const e=JSON.parse(n);return Date.now()-e.timestamp>ol?(it(),null):e}catch(e){return console.error("Failed to parse stored state:",e),it(),null}}function it(){localStorage.removeItem(qi)}/**
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
 */const ll=()=>{};var qs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw vt(e)},vt=function(n){return new Error("Firebase Database ("+Jr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},cl=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Yi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(t[d],t[u],t[h],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Xr(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):cl(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new ul;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const _=c<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ul extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Zr=function(n){const e=Xr(n);return Yi.encodeByteArray(e,!0)},pn=function(n){return Zr(n).replace(/\./g,"")},mn=function(n){try{return Yi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(n){return Lt(void 0,n)}function Lt(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!hl(t)||(n[t]=Lt(n[t],e[t]));return n}function hl(n){return n!=="__proto__"}/**
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
 */function eo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fl=()=>eo().__FIREBASE_DEFAULTS__,pl=()=>{if(typeof process>"u"||typeof qs>"u")return;const n=qs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ml=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&mn(n[1]);return e&&JSON.parse(e)},_l=()=>{try{return ll()||fl()||pl()||ml()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Qi=()=>_l()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function Ki(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function gl(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function yl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[pn(JSON.stringify(t)),pn(JSON.stringify(o)),""].join(".")}const kt={};function vl(){const n={prod:[],emulator:[]};for(const e of Object.keys(kt))kt[e]?n.emulator.push(e):n.prod.push(e);return n}function Cl(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ys=!1;function wl(n,e){if(typeof window>"u"||typeof document>"u"||!Ki(window.location.host)||kt[n]===e||kt[n]||Ys)return;kt[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=vl().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,p){h.setAttribute("width","24"),h.setAttribute("id",p),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Ys=!0,o()},h}function d(h,p){h.setAttribute("id",p),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=Cl(i),p=t("text"),_=document.getElementById(p)||document.createElement("span"),E=t("learnmore"),D=document.getElementById(E)||document.createElement("a"),te=t("preprendIcon"),ae=document.getElementById(te)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const Ee=h.element;a(Ee),d(D,E);const We=c();l(ae,te),Ee.append(ae,_,D,We),document.body.appendChild(Ee)}r?(_.innerText="Preview backend disconnected.",ae.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ae.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function El(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function to(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(El())}function bl(){return typeof window<"u"||no()}function no(){return typeof WorkerGlobalScope<"u"&&typeof self<"u"&&self instanceof WorkerGlobalScope}function Sl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Il(){return Jr.NODE_ADMIN===!0}function Tl(){try{return typeof indexedDB=="object"}catch{return!1}}function Pl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="FirebaseError";class Ct extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Rl,Object.setPrototypeOf(this,Ct.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,On.prototype.create)}}class On{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?kl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ct(s,a,i)}}function kl(n,e){return n.replace(Al,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Al=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(n){return JSON.parse(n)}function x(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Ft(mn(r[0])||""),t=Ft(mn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Nl=function(n){const e=io(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Dl=function(n){const e=io(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function qe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function yi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function _n(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function gn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Qs(r)&&Qs(o)){if(!gn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Qs(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ol{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ml(n,e){const t=new Ll(n,e);return t.subscribe.bind(t)}class Ll{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Fl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=ri),s.error===void 0&&(s.error=ri),s.complete===void 0&&(s.complete=ri);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Fl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ri(){}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y=function(n,e,t,i){let s;if(i<e?s="at least "+e:i>t&&(s=t===0?"none":"no more than "+t),s){const r=n+" failed: Was called with "+i+(i===1?" argument.":" arguments.")+" Expects "+s+".";throw new Error(r)}};function Y(n,e){return`${n} failed: ${e} argument `}function L(n,e,t,i){if(!(i&&!t)&&typeof t!="function")throw new Error(Y(n,e)+"must be a valid function.")}function Ks(n,e,t,i){if(t&&(typeof t!="object"||t===null))throw new Error(Y(n,e)+"must be a valid context object.")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Mn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ee(n){return n&&n._delegate?n._delegate:n}class ve{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class vi{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new G;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Wl(e))try{this.getOrInitializeService({instanceIdentifier:Ue})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ue){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ue){return this.instances.has(e)}getOptions(e=Ue){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Vl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ue){return this.component?this.component.multipleInstances?e:Ue:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Vl(n){return n===Ue?void 0:n}function Wl(n){return n.instantiationMode==="EAGER"}/**
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
 */class Ji{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vi(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi=[];var I;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(I||(I={}));const so={debug:I.DEBUG,verbose:I.VERBOSE,info:I.INFO,warn:I.WARN,error:I.ERROR,silent:I.SILENT},Ul=I.INFO,$l={[I.DEBUG]:"log",[I.VERBOSE]:"log",[I.INFO]:"info",[I.WARN]:"warn",[I.ERROR]:"error"},Hl=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=$l[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ln{constructor(e){this.name=e,this._logLevel=Ul,this._logHandler=Hl,this._userLogHandler=null,Xi.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in I))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?so[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,I.DEBUG,...e),this._logHandler(this,I.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,I.VERBOSE,...e),this._logHandler(this,I.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,I.INFO,...e),this._logHandler(this,I.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,I.WARN,...e),this._logHandler(this,I.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,I.ERROR,...e),this._logHandler(this,I.ERROR,...e)}}function jl(n){Xi.forEach(e=>{e.setLogLevel(n)})}function zl(n,e){for(const t of Xi){let i=null;e&&e.level&&(i=so[e.level]),n===null?t.userLogHandler=null:t.userLogHandler=(s,r,...o)=>{const a=o.map(l=>{if(l==null)return null;if(typeof l=="string")return l;if(typeof l=="number"||typeof l=="boolean")return l.toString();if(l instanceof Error)return l.message;try{return JSON.stringify(l)}catch{return null}}).filter(l=>l).join(" ");r>=(i??s.logLevel)&&n({level:I[r].toLowerCase(),message:a,args:o,type:s.name})}}}const Gl=(n,e)=>e.some(t=>n instanceof t);let Js,Xs;function ql(){return Js||(Js=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Yl(){return Xs||(Xs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ro=new WeakMap,Ci=new WeakMap,oo=new WeakMap,oi=new WeakMap,Zi=new WeakMap;function Ql(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ie(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ro.set(t,n)}).catch(()=>{}),Zi.set(e,n),e}function Kl(n){if(Ci.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ci.set(n,e)}let wi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ci.get(n);if(e==="objectStoreNames")return n.objectStoreNames||oo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ie(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Jl(n){wi=n(wi)}function Xl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ai(this),e,...t);return oo.set(i,e.sort?e.sort():[e]),Ie(i)}:Yl().includes(n)?function(...e){return n.apply(ai(this),e),Ie(ro.get(this))}:function(...e){return Ie(n.apply(ai(this),e))}}function Zl(n){return typeof n=="function"?Xl(n):(n instanceof IDBTransaction&&Kl(n),Gl(n,ql())?new Proxy(n,wi):n)}function Ie(n){if(n instanceof IDBRequest)return Ql(n);if(oi.has(n))return oi.get(n);const e=Zl(n);return e!==n&&(oi.set(n,e),Zi.set(e,n)),e}const ai=n=>Zi.get(n);function ec(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Ie(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Ie(o.result),l.oldVersion,l.newVersion,Ie(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const tc=["get","getKey","getAll","getAllKeys","count"],nc=["put","add","delete","clear"],li=new Map;function Zs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(li.get(e))return li.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=nc.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||tc.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return li.set(e,r),r}Jl(n=>({...n,get:(e,t,i)=>Zs(e,t)||n.get(e,t,i),has:(e,t)=>!!Zs(e,t)||n.has(e,t)}));/**
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
 */class ic{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(sc(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function sc(n){return n.getComponent()?.type==="VERSION"}const yn="@firebase/app",Ei="0.14.4";/**
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
 */const Ce=new Ln("@firebase/app"),rc="@firebase/app-compat",oc="@firebase/analytics-compat",ac="@firebase/analytics",lc="@firebase/app-check-compat",cc="@firebase/app-check",uc="@firebase/auth",dc="@firebase/auth-compat",hc="@firebase/database",fc="@firebase/data-connect",pc="@firebase/database-compat",mc="@firebase/functions",_c="@firebase/functions-compat",gc="@firebase/installations",yc="@firebase/installations-compat",vc="@firebase/messaging",Cc="@firebase/messaging-compat",wc="@firebase/performance",Ec="@firebase/performance-compat",bc="@firebase/remote-config",Sc="@firebase/remote-config-compat",Ic="@firebase/storage",Tc="@firebase/storage-compat",Pc="@firebase/firestore",Rc="@firebase/ai",kc="@firebase/firestore-compat",Ac="firebase",Nc="12.4.0";/**
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
 */const Ae="[DEFAULT]",Dc={[yn]:"fire-core",[rc]:"fire-core-compat",[ac]:"fire-analytics",[oc]:"fire-analytics-compat",[cc]:"fire-app-check",[lc]:"fire-app-check-compat",[uc]:"fire-auth",[dc]:"fire-auth-compat",[hc]:"fire-rtdb",[fc]:"fire-data-connect",[pc]:"fire-rtdb-compat",[mc]:"fire-fn",[_c]:"fire-fn-compat",[gc]:"fire-iid",[yc]:"fire-iid-compat",[vc]:"fire-fcm",[Cc]:"fire-fcm-compat",[wc]:"fire-perf",[Ec]:"fire-perf-compat",[bc]:"fire-rc",[Sc]:"fire-rc-compat",[Ic]:"fire-gcs",[Tc]:"fire-gcs-compat",[Pc]:"fire-fst",[kc]:"fire-fst-compat",[Rc]:"fire-vertex","fire-js":"fire-js",[Ac]:"fire-js-all"};/**
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
 */const Ne=new Map,dt=new Map,ht=new Map;function Bt(n,e){try{n.container.addComponent(e)}catch(t){Ce.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ao(n,e){n.container.addOrOverwriteComponent(e)}function ft(n){const e=n.name;if(ht.has(e))return Ce.debug(`There were multiple attempts to register component ${e}.`),!1;ht.set(e,n);for(const t of Ne.values())Bt(t,n);for(const t of dt.values())Bt(t,n);return!0}function lo(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function xc(n,e,t=Ae){lo(n,e).clearInstance(t)}function es(n){return n.options!==void 0}function co(n){return es(n)?!1:"authIdToken"in n||"appCheckToken"in n||"releaseOnDeref"in n||"automaticDataCollectionEnabled"in n}function uo(n){return n==null?!1:n.settings!==void 0}function Oc(){ht.clear()}/**
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
 */const Mc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},J=new On("app","Firebase",Mc);/**
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
 */let ho=class{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ve("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw J.create("app-deleted",{appName:this._name})}};/**
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
 */function er(n,e){const t=mn(n.split(".")[1]);if(t===null){console.error(`FirebaseServerApp ${e} is invalid: second part could not be parsed.`);return}if(JSON.parse(t).exp===void 0){console.error(`FirebaseServerApp ${e} is invalid: expiration claim could not be parsed`);return}const s=JSON.parse(t).exp*1e3,r=new Date().getTime();s-r<=0&&console.error(`FirebaseServerApp ${e} is invalid: the token has expired.`)}class Lc extends ho{constructor(e,t,i,s){const r=t.automaticDataCollectionEnabled!==void 0?t.automaticDataCollectionEnabled:!0,o={name:i,automaticDataCollectionEnabled:r};if(e.apiKey!==void 0)super(e,o,s);else{const a=e;super(a.options,o,s)}this._serverConfig={automaticDataCollectionEnabled:r,...t},this._serverConfig.authIdToken&&er(this._serverConfig.authIdToken,"authIdToken"),this._serverConfig.appCheckToken&&er(this._serverConfig.appCheckToken,"appCheckToken"),this._finalizationRegistry=null,typeof FinalizationRegistry<"u"&&(this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()})),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,t.releaseOnDeref=void 0,ge(yn,Ei,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry!==null&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){is(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw J.create("server-app-deleted")}}/**
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
 */const ts=Nc;function ns(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Ae,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw J.create("bad-app-name",{appName:String(s)});if(t||(t=Qi()),!t)throw J.create("no-options");const r=Ne.get(s);if(r){if(gn(t,r.options)&&gn(i,r.config))return r;throw J.create("duplicate-app",{appName:s})}const o=new Ji(s);for(const l of ht.values())o.addComponent(l);const a=new ho(t,i,o);return Ne.set(s,a),a}function Fc(n,e={}){if(bl()&&!no())throw J.create("invalid-server-app-environment");let t,i=e||{};if(n&&(es(n)?t=n.options:co(n)?i=n:t=n),i.automaticDataCollectionEnabled===void 0&&(i.automaticDataCollectionEnabled=!0),t||(t=Qi()),!t)throw J.create("no-options");const s={...i,...t};s.releaseOnDeref!==void 0&&delete s.releaseOnDeref;const r=d=>[...d].reduce((u,h)=>Math.imul(31,u)+h.charCodeAt(0)|0,0);if(i.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw J.create("finalization-registry-not-supported",{});const o=""+r(JSON.stringify(s)),a=dt.get(o);if(a)return a.incRefCount(i.releaseOnDeref),a;const l=new Ji(o);for(const d of ht.values())l.addComponent(d);const c=new Lc(t,i,o,l);return dt.set(o,c),c}function Bc(n=Ae){const e=Ne.get(n);if(!e&&n===Ae&&Qi())return ns();if(!e)throw J.create("no-app",{appName:n});return e}function Vc(){return Array.from(Ne.values())}async function is(n){let e=!1;const t=n.name;Ne.has(t)?(e=!0,Ne.delete(t)):dt.has(t)&&n.decRefCount()<=0&&(dt.delete(t),e=!0),e&&(await Promise.all(n.container.getProviders().map(i=>i.delete())),n.isDeleted=!0)}function ge(n,e,t){let i=Dc[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ce.warn(o.join(" "));return}ft(new ve(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}function fo(n,e){if(n!==null&&typeof n!="function")throw J.create("invalid-log-argument");zl(n,e)}function po(n){jl(n)}/**
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
 */const Wc="firebase-heartbeat-database",Uc=1,Vt="firebase-heartbeat-store";let ci=null;function mo(){return ci||(ci=ec(Wc,Uc,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vt)}catch(t){console.warn(t)}}}}).catch(n=>{throw J.create("idb-open",{originalErrorMessage:n.message})})),ci}async function $c(n){try{const t=(await mo()).transaction(Vt),i=await t.objectStore(Vt).get(_o(n));return await t.done,i}catch(e){if(e instanceof Ct)Ce.warn(e.message);else{const t=J.create("idb-get",{originalErrorMessage:e?.message});Ce.warn(t.message)}}}async function tr(n,e){try{const i=(await mo()).transaction(Vt,"readwrite");await i.objectStore(Vt).put(e,_o(n)),await i.done}catch(t){if(t instanceof Ct)Ce.warn(t.message);else{const i=J.create("idb-set",{originalErrorMessage:t?.message});Ce.warn(i.message)}}}function _o(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Hc=1024,jc=30;class zc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new qc(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=nr();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>jc){const s=Yc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ce.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=nr(),{heartbeatsToSend:t,unsentEntries:i}=Gc(this._heartbeatsCache.heartbeats),s=pn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ce.warn(e),""}}}function nr(){return new Date().toISOString().substring(0,10)}function Gc(n,e=Hc){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),ir(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ir(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class qc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Tl()?Pl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await $c(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return tr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return tr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ir(n){return pn(JSON.stringify({version:2,heartbeats:n})).length}function Yc(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Qc(n){ft(new ve("platform-logger",e=>new ic(e),"PRIVATE")),ft(new ve("heartbeat",e=>new zc(e),"PRIVATE")),ge(yn,Ei,n),ge(yn,Ei,"esm2020"),ge("fire-js","")}Qc("");const Kc=Object.freeze(Object.defineProperty({__proto__:null,FirebaseError:Ct,SDK_VERSION:ts,_DEFAULT_ENTRY_NAME:Ae,_addComponent:Bt,_addOrOverwriteComponent:ao,_apps:Ne,_clearComponents:Oc,_components:ht,_getProvider:lo,_isFirebaseApp:es,_isFirebaseServerApp:uo,_isFirebaseServerAppSettings:co,_registerComponent:ft,_removeServiceInstance:xc,_serverApps:dt,deleteApp:is,getApp:Bc,getApps:Vc,initializeApp:ns,initializeServerApp:Fc,onLog:fo,registerVersion:ge,setLogLevel:po},Symbol.toStringTag,{value:"Module"}));/**
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
 */class Jc{constructor(e,t){this._delegate=e,this.firebase=t,Bt(e,new ve("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),is(this._delegate)))}_getService(e,t=Ae){this._delegate.checkDestroyed();const i=this._delegate.container.getProvider(e);return!i.isInitialized()&&i.getComponent()?.instantiationMode==="EXPLICIT"&&i.initialize(),i.getImmediate({identifier:t})}_removeServiceInstance(e,t=Ae){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(e){Bt(this._delegate,e)}_addOrOverwriteComponent(e){ao(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}/**
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
 */const Xc={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},sr=new On("app-compat","Firebase",Xc);/**
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
 */function Zc(n){const e={},t={__esModule:!0,initializeApp:r,app:s,registerVersion:ge,setLogLevel:po,onLog:fo,apps:null,SDK_VERSION:ts,INTERNAL:{registerComponent:a,removeApp:i,useAsService:l,modularAPIs:Kc}};t.default=t,Object.defineProperty(t,"apps",{get:o});function i(c){delete e[c]}function s(c){if(c=c||Ae,!X(e,c))throw sr.create("no-app",{appName:c});return e[c]}s.App=n;function r(c,d={}){const u=ns(c,d);if(X(e,u.name))return e[u.name];const h=new n(u,t);return e[u.name]=h,h}function o(){return Object.keys(e).map(c=>e[c])}function a(c){const d=c.name,u=d.replace("-compat","");if(ft(c)&&c.type==="PUBLIC"){const h=(p=s())=>{if(typeof p[u]!="function")throw sr.create("invalid-app-argument",{appName:d});return p[u]()};c.serviceProps!==void 0&&Lt(h,c.serviceProps),t[u]=h,n.prototype[u]=function(...p){return this._getService.bind(this,d).apply(this,c.multipleInstances?p:[])}}return c.type==="PUBLIC"?t[u]:null}function l(c,d){return d==="serverAuth"?null:d}return t}/**
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
 */function go(){const n=Zc(Jc);n.INTERNAL={...n.INTERNAL,createFirebaseNamespace:go,extendNamespace:e,createSubscribe:Ml,ErrorFactory:On,deepExtend:Lt};function e(t){Lt(n,t)}return n}const eu=go();/**
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
 */const rr=new Ln("@firebase/app-compat"),tu="@firebase/app-compat",nu="0.5.4";/**
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
 */function iu(n){ge(tu,nu,n)}/**
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
 */try{const n=eo();if(n.firebase!==void 0){rr.warn(`
      Warning: Firebase is already defined in the global scope. Please make sure
      Firebase library is only loaded once.
    `);const e=n.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&rr.warn(`
        Warning: You are trying to load Firebase while using Firebase Performance standalone script.
        You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
        `)}}catch{}const Wt=eu;iu();var su="firebase",ru="12.4.0";/**
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
 */Wt.registerVersion(su,ru,"app-compat");var or={};const ar="@firebase/database",lr="1.1.0";/**
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
 */let yo="";function vo(n){yo=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ft(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Co=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ou(e)}}catch{}return new au},He=Co("localStorage"),bi=Co("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=new Ln("@firebase/database"),wo=(function(){let n=1;return function(){return n++}})(),Eo=function(n){const e=Bl(n),t=new Ol;t.update(e);const i=t.digest();return Yi.encodeByteArray(i)},Xt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Xt.apply(null,i):typeof i=="object"?e+=x(i):e+=i,e+=" "}return e};let ze=null,cr=!0;const bo=function(n,e){f(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(st.logLevel=I.VERBOSE,ze=st.log.bind(st),e&&bi.set("logging_enabled",!0)):typeof n=="function"?ze=n:(ze=null,bi.remove("logging_enabled"))},B=function(...n){if(cr===!0&&(cr=!1,ze===null&&bi.get("logging_enabled")===!0&&bo(!0)),ze){const e=Xt.apply(null,n);ze(e)}},Zt=function(n){return function(...e){B(n,...e)}},Si=function(...n){const e="FIREBASE INTERNAL ERROR: "+Xt(...n);st.error(e)},pe=function(...n){const e=`FIREBASE FATAL ERROR: ${Xt(...n)}`;throw st.error(e),new Error(e)},H=function(...n){const e="FIREBASE WARNING: "+Xt(...n);st.warn(e)},lu=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&H("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Fn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},cu=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},De="[MIN_NAME]",we="[MAX_NAME]",Xe=function(n,e){if(n===e)return 0;if(n===De||e===we)return-1;if(e===De||n===we)return 1;{const t=ur(n),i=ur(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},uu=function(n,e){return n===e?0:n<e?-1:1},It=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+x(e))},ss=function(n){if(typeof n!="object"||n===null)return x(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=x(e[i]),t+=":",t+=ss(n[e[i]]);return t+="}",t},So=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function W(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Io=function(n){f(!Fn(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},du=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},hu=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fu(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const pu=new RegExp("^-?(0*)\\d{1,10}$"),mu=-2147483648,_u=2147483647,ur=function(n){if(pu.test(n)){const e=Number(n);if(e>=mu&&e<=_u)return e}return null},wt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw H("Exception was thrown by user callback.",t),e},Math.floor(0))}},gu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},At=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class yu{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,uo(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){H(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',H(e)}}class rt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}rt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rs="5",To="v",Po="s",Ro="r",ko="f",Ao=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,No="ls",Do="p",Ii="ac",xo="websocket",Oo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=He.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&He.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Cu(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Lo(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===xo)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Oo)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Cu(n)&&(t.ns=n.namespace);const s=[];return W(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const ui={},di={};function os(n){const e=n.toString();return ui[e]||(ui[e]=new wu),ui[e]}function Eu(n,e){const t=n.toString();return di[t]||(di[t]=e()),di[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&wt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dr="start",Su="close",Iu="pLPCommand",Tu="pRTLPCB",Fo="id",Bo="pw",Vo="ser",Pu="cb",Ru="seg",ku="ts",Au="d",Nu="dframe",Wo=1870,Uo=30,Du=Wo-Uo,xu=25e3,Ou=3e4;class be{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Zt(e),this.stats_=os(t),this.urlFn=l=>(this.appCheckToken&&(l[Ii]=this.appCheckToken),Lo(t,Oo,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new bu(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ou)),cu(()=>{if(this.isClosed_)return;this.scriptTagHolder=new as((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===dr)this.id=a,this.password=l;else if(o===Su)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[dr]="t",i[Vo]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Pu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[To]=rs,this.transportSessionId&&(i[Po]=this.transportSessionId),this.lastSessionId&&(i[No]=this.lastSessionId),this.applicationId&&(i[Do]=this.applicationId),this.appCheckToken&&(i[Ii]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ao.test(location.hostname)&&(i[Ro]=ko);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){be.forceAllow_=!0}static forceDisallow(){be.forceDisallow_=!0}static isAvailable(){return be.forceAllow_?!0:!be.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!du()&&!hu()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Zr(t),s=So(i,Du);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Nu]="t",i[Fo]=e,i[Bo]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=x(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class as{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=wo(),window[Iu+this.uniqueCallbackIdentifier]=e,window[Tu+this.uniqueCallbackIdentifier]=t,this.myIFrame=as.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Fo]=this.myID,e[Bo]=this.myPW,e[Vo]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Uo+i.length<=Wo;){const o=this.pendingSegs.shift();i=i+"&"+Ru+s+"="+o.seg+"&"+ku+s+"="+o.ts+"&"+Au+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(xu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mu=16384,Lu=45e3;let vn=null;typeof MozWebSocket<"u"?vn=MozWebSocket:typeof WebSocket<"u"&&(vn=WebSocket);class ne{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Zt(this.connId),this.stats_=os(t),this.connURL=ne.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[To]=rs,typeof location<"u"&&location.hostname&&Ao.test(location.hostname)&&(o[Ro]=ko),t&&(o[Po]=t),i&&(o[No]=i),s&&(o[Ii]=s),r&&(o[Do]=r),Lo(e,xo,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,He.set("previous_websocket_failure",!0);try{let i;Il(),this.mySock=new vn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ne.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&vn!==null&&!ne.forceDisallow_}static previouslyFailed(){return He.isInMemoryStorage||He.get("previous_websocket_failure")===!0}markConnectionHealthy(){He.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Ft(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=So(t,Mu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Lu))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ne.responsesRequiredToBeHealthy=2;ne.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{static get ALL_TRANSPORTS(){return[be,ne]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ne&&ne.isAvailable();let i=t&&!ne.previouslyFailed();if(e.webSocketOnly&&(t||H("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ne];else{const s=this.transports_=[];for(const r of pt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);pt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}pt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=6e4,Bu=5e3,Vu=10*1024,Wu=100*1024,hi="t",hr="d",Uu="s",fr="r",$u="e",pr="o",mr="a",_r="n",gr="p",Hu="h";class ju{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Zt("c:"+this.id+":"),this.transportManager_=new pt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=At(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Wu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Vu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(hi in e){const t=e[hi];t===mr?this.upgradeIfSecondaryHealthy_():t===fr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===pr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=It("t",e),i=It("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:gr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:mr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:_r,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=It("t",e),i=It("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=It(hi,e);if(hr in e){const i=e[hr];if(t===Hu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===_r){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Uu?this.onConnectionShutdown_(i):t===fr?this.onReset_(i):t===$u?Si("Server Error: "+i):t===pr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Si("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),rs!==i&&H("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),At(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Fu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):At(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Bu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:gr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(He.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends Ho{static getInstance(){return new Cn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!to()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yr=32,vr=768;class S{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function b(){return new S("")}function v(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function xe(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new S(n.pieces_,e)}function ls(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function zu(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ut(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function jo(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new S(e,0)}function A(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof S)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new S(t,0)}function C(n){return n.pieceNum_>=n.pieces_.length}function j(n,e){const t=v(n),i=v(e);if(t===null)return e;if(t===i)return j(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Gu(n,e){const t=Ut(n,0),i=Ut(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Xe(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function cs(n,e){if(xe(n)!==xe(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function ie(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(xe(n)>xe(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class qu{constructor(e,t){this.errorPrefix_=t,this.parts_=Ut(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Mn(this.parts_[i]);zo(this)}}function Yu(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Mn(e),zo(n)}function Qu(n){const e=n.parts_.pop();n.byteLength_-=Mn(e),n.parts_.length>0&&(n.byteLength_-=1)}function zo(n){if(n.byteLength_>vr)throw new Error(n.errorPrefix_+"has a key path longer than "+vr+" bytes ("+n.byteLength_+").");if(n.parts_.length>yr)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+yr+") or object contains a cycle "+$e(n))}function $e(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us extends Ho{static getInstance(){return new us}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=1e3,Ku=300*1e3,Cr=30*1e3,Ju=1.3,Xu=3e4,Zu="server_kill",wr=3;class ye extends $o{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ye.nextPersistentConnectionId_++,this.log_=Zt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Tt,this.maxReconnectDelay_=Ku,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");us.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Cn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(x(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new G,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ye.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&X(e,"w")){const i=qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();H(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Dl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Cr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Nl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+x(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Si("Unrecognized action received from server: "+x(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Xu&&(this.reconnectDelay_=Tt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ju)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ye.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new ju(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{H(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Zu)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&H(u),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],yi(this.interruptReasons_)&&(this.reconnectDelay_=Tt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>ss(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new S(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){B("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=wr&&(this.reconnectDelay_=Cr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){B("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=wr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+yo.replace(/\./g,"-")]=1,to()?e["framework.cordova"]=1:Sl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Cn.getInstance().currentlyOnline();return yi(this.interruptReasons_)&&e}}ye.nextPersistentConnectionId_=0;ye.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Bn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new w(De,e),s=new w(De,t);return this.compare(i,s)!==0}minPost(){return w.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cn;class Go extends Bn{static get __EMPTY_NODE(){return cn}static set __EMPTY_NODE(e){cn=e}compare(e,t){return Xe(e.name,t.name)}isDefinedOn(e){throw vt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return w.MIN}maxPost(){return new w(we,cn)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new w(e,cn)}toString(){return".key"}}const fe=new Go;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class F{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??F.RED,this.left=s??q.EMPTY_NODE,this.right=r??q.EMPTY_NODE}copy(e,t,i,s,r){return new F(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,F.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,F.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}F.RED=!0;F.BLACK=!1;class ed{copy(e,t,i,s,r){return this}insert(e,t,i){return new F(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class q{constructor(e,t=q.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new q(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,F.BLACK,null,null))}remove(e){return new q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,F.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new un(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new un(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new un(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new un(this.root_,null,this.comparator_,!0,e)}}q.EMPTY_NODE=new ed;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function td(n,e){return Xe(n.name,e.name)}function ds(n,e){return Xe(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ti;function nd(n){Ti=n}const qo=function(n){return typeof n=="number"?"number:"+Io(n):"string:"+n},Yo=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&X(e,".sv"),"Priority must be a string or number.")}else f(n===Ti||n.isEmpty(),"priority of unexpected type.");f(n===Ti||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Er;class O{static set __childrenNodeConstructor(e){Er=e}static get __childrenNodeConstructor(){return Er}constructor(e,t=O.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Yo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new O(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:v(e)===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:O.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=v(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||xe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,O.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+qo(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Io(this.value_):e+=this.value_,this.lazyHash_=Eo(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===O.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof O.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=O.VALUE_TYPE_ORDER.indexOf(t),r=O.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}O.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qo,Ko;function id(n){Qo=n}function sd(n){Ko=n}class rd extends Bn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Xe(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return w.MIN}maxPost(){return new w(we,new O("[PRIORITY-POST]",Ko))}makePost(e,t){const i=Qo(e);return new w(t,new O("[PRIORITY-POST]",i))}toString(){return".priority"}}const R=new rd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const od=Math.log(2);class ad{constructor(e){const t=r=>parseInt(Math.log(r)/od,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const wn=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new F(h,u.node,F.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=s(l,p),E=s(p+1,c);return u=n[p],h=t?t(u):u,new F(h,u.node,F.BLACK,_,E)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,E){const D=u-_,te=u;u-=_;const ae=s(D+1,te),Ee=n[D],We=t?t(Ee):Ee;p(new F(We,Ee.node,E,null,ae))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const E=l.nextBitIsOne(),D=Math.pow(2,l.count-(_+1));E?h(D,F.BLACK):(h(D,F.BLACK),h(D,F.RED))}return d},o=new ad(n.length),a=r(o);return new q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fi;const tt={};class _e{static get Default(){return f(tt&&R,"ChildrenNode.ts has not been loaded"),fi=fi||new _e({".priority":tt},{".priority":R}),fi}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=qe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof q?t:null}hasIndex(e){return X(this.indexSet_,e.toString())}addIndex(e,t){f(e!==fe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(w.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=wn(i,e.getCompare()):a=tt;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new _e(d,c)}addToIndexes(e,t){const i=_n(this.indexes_,(s,r)=>{const o=qe(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===tt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(w.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),wn(a,o.getCompare())}else return tt;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new w(e.name,a))),l.insert(e,e.node)}});return new _e(i,this.indexSet_)}removeFromIndexes(e,t){const i=_n(this.indexes_,s=>{if(s===tt)return s;{const r=t.get(e.name);return r?s.remove(new w(e.name,r)):s}});return new _e(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pt;class g{static get EMPTY_NODE(){return Pt||(Pt=new g(new q(ds),null,_e.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Yo(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Pt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Pt:t}}getChild(e){const t=v(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new w(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Pt:this.priorityNode_;return new g(s,o,r)}}updateChild(e,t){const i=v(e);if(i===null)return t;{f(v(e)!==".priority"||xe(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(T(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(R,(o,a)=>{t[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+qo(this.getPriority().val())+":"),this.forEachChild(R,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Eo(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new w(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new w(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new w(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===en?-1:0}withIndex(e){if(e===fe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===fe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(R),s=t.getIterator(R);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===fe?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class ld extends g{constructor(){super(new q(ds),g.EMPTY_NODE,_e.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const en=new ld;Object.defineProperties(w,{MIN:{value:new w(De,g.EMPTY_NODE)},MAX:{value:new w(we,en)}});Go.__EMPTY_NODE=g.EMPTY_NODE;O.__childrenNodeConstructor=g;nd(en);sd(en);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd=!0;function N(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new O(t,N(e))}if(!(n instanceof Array)&&cd){const t=[];let i=!1;if(W(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=N(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new w(o,l)))}}),t.length===0)return g.EMPTY_NODE;const r=wn(t,td,o=>o.name,ds);if(i){const o=wn(t,R.getCompare());return new g(r,N(e),new _e({".priority":o},{".priority":R}))}else return new g(r,N(e),_e.Default)}else{let t=g.EMPTY_NODE;return W(n,(i,s)=>{if(X(n,i)&&i.substring(0,1)!=="."){const r=N(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(N(e))}}id(N);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs extends Bn{constructor(e){super(),this.indexPath_=e,f(!C(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Xe(e.name,t.name):r}makePost(e,t){const i=N(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new w(t,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,en);return new w(we,e)}toString(){return Ut(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ud extends Bn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Xe(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return w.MIN}maxPost(){return w.MAX}makePost(e,t){const i=N(e);return new w(t,i)}toString(){return".value"}}const fs=new ud;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(n){return{type:"value",snapshotNode:n}}function mt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function $t(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Ht(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function dd(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange($t(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(mt(t,i)):o.trackChildChange(Ht(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(R,(s,r)=>{t.hasChild(s)||i.trackChildChange($t(s,r))}),t.isLeafNode()||t.forEachChild(R,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Ht(s,r,o))}else i.trackChildChange(mt(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e){this.indexedFilter_=new ps(e.getIndex()),this.index_=e.getIndex(),this.startPost_=jt.getStartPost_(e),this.endPost_=jt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new w(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(R,(o,a)=>{r.matches(new w(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new jt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new w(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new w(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!i.isEmpty()&&p>=0)return r?.trackChildChange(Ht(t,i,u)),a.updateImmediateChild(t,i);{r?.trackChildChange($t(t,u));const E=a.updateImmediateChild(t,g.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(mt(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange($t(c.name,c.node)),r.trackChildChange(mt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=R}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:De}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:we}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===R}copy(){const e=new Vn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function fd(n){return n.loadsAllData()?new ps(n.getIndex()):n.hasLimit()?new hd(n):new jt(n)}function pd(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function md(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function Pi(n,e,t){const i=n.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,t!=null?(i.startNameSet_=!0,i.indexStartName_=t):(i.startNameSet_=!1,i.indexStartName_=""),i}function _d(n,e,t){let i;return n.index_===fe||t?i=Pi(n,e,t):i=Pi(n,e,we),i.startAfterSet_=!0,i}function Ri(n,e,t){const i=n.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,t!==void 0?(i.endNameSet_=!0,i.indexEndName_=t):(i.endNameSet_=!1,i.indexEndName_=""),i}function gd(n,e,t){let i;return n.index_===fe||t?i=Ri(n,e,t):i=Ri(n,e,De),i.endBeforeSet_=!0,i}function Wn(n,e){const t=n.copy();return t.index_=e,t}function br(n){const e={};if(n.isDefault())return e;let t;if(n.index_===R?t="$priority":n.index_===fs?t="$value":n.index_===fe?t="$key":(f(n.index_ instanceof hs,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=x(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=x(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+x(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=x(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+x(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Sr(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==R&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends $o{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Zt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=En.getListenId_(e,i),a={};this.listens_[o]=a;const l=br(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),qe(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=En.getListenId_(e,t);delete this.listens_[i]}get(e){const t=br(e._queryParams),i=e._path.toString(),s=new G;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+xl(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Ft(a.responseText)}catch{H("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&H("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(){return{value:null,children:new Map}}function Et(n,e,t){if(C(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=v(e);n.children.has(i)||n.children.set(i,bn());const s=n.children.get(i);e=T(e),Et(s,e,t)}}function ki(n,e){if(C(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(R,(i,s)=>{Et(n,new S(i),s)}),ki(n,e)}}else if(n.children.size>0){const t=v(e);return e=T(e),n.children.has(t)&&ki(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Ai(n,e,t){n.value!==null?t(e,n.value):vd(n,(i,s)=>{const r=new S(e.toString()+"/"+i);Ai(s,r,t)})}function vd(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&W(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=10*1e3,wd=30*1e3,Ed=300*1e3;class bd{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Cd(e);const i=Ir+(wd-Ir)*Math.random();At(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;W(e,(s,r)=>{r>0&&X(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),At(this.reportStats_.bind(this),Math.floor(Math.random()*2*Ed))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ce||(ce={}));function ms(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function _s(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function gs(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ce.ACK_USER_WRITE,this.source=ms()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new S(e));return new Sn(b(),t,this.revert)}}else return f(v(this.path)===e,"operationForChild called for unrelated child."),new Sn(T(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,t){this.source=e,this.path=t,this.type=ce.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new zt(this.source,b()):new zt(this.source,T(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ce.OVERWRITE}operationForChild(e){return C(this.path)?new Ye(this.source,b(),this.snap.getImmediateChild(e)):new Ye(this.source,T(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ce.MERGE}operationForChild(e){if(C(this.path)){const t=this.children.subtree(new S(e));return t.isEmpty()?null:t.value?new Ye(this.source,b(),t.value):new _t(this.source,b(),t)}else return f(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new _t(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Sd{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Id(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(dd(o.childName,o.snapshotNode))}),Rt(n,s,"child_removed",e,i,t),Rt(n,s,"child_added",e,i,t),Rt(n,s,"child_moved",r,i,t),Rt(n,s,"child_changed",e,i,t),Rt(n,s,"value",e,i,t),s}function Rt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Pd(n,a,l)),o.forEach(a=>{const l=Td(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Td(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Pd(n,e,t){if(e.childName==null||t.childName==null)throw vt("Should only compare child_ events.");const i=new w(e.childName,e.snapshotNode),s=new w(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(n,e){return{eventCache:n,serverCache:e}}function Nt(n,e,t,i){return Un(new Oe(e,t,i),n.serverCache)}function Xo(n,e,t,i){return Un(n.eventCache,new Oe(e,t,i))}function In(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Qe(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pi;const Rd=()=>(pi||(pi=new q(uu)),pi);class P{static fromObject(e){let t=new P(null);return W(e,(i,s)=>{t=t.set(new S(i),s)}),t}constructor(e,t=Rd()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:b(),value:this.value};if(C(e))return null;{const i=v(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:A(new S(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const t=v(e),i=this.children.get(t);return i!==null?i.subtree(T(e)):new P(null)}}set(e,t){if(C(e))return new P(t,this.children);{const i=v(e),r=(this.children.get(i)||new P(null)).set(T(e),t),o=this.children.insert(i,r);return new P(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new P(null):new P(null,this.children);{const t=v(e),i=this.children.get(t);if(i){const s=i.remove(T(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new P(null):new P(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const t=v(e),i=this.children.get(t);return i?i.get(T(e)):null}}setTree(e,t){if(C(e))return t;{const i=v(e),r=(this.children.get(i)||new P(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new P(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(A(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,b(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(C(e))return null;{const r=v(e),o=this.children.get(r);return o?o.findOnPath_(T(e),A(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,b(),t)}foreachOnPath_(e,t,i){if(C(e))return this;{this.value&&i(t,this.value);const s=v(e),r=this.children.get(s);return r?r.foreachOnPath_(T(e),A(t,s),i):new P(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(A(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e){this.writeTree_=e}static empty(){return new ue(new P(null))}}function Dt(n,e,t){if(C(e))return new ue(new P(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=j(s,e);return r=r.updateChild(o,t),new ue(n.writeTree_.set(s,r))}else{const s=new P(t),r=n.writeTree_.setTree(e,s);return new ue(r)}}}function Ni(n,e,t){let i=n;return W(t,(s,r)=>{i=Dt(i,A(e,s),r)}),i}function Tr(n,e){if(C(e))return ue.empty();{const t=n.writeTree_.setTree(e,new P(null));return new ue(t)}}function Di(n,e){return Ze(n,e)!=null}function Ze(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(j(t.path,e)):null}function Pr(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(R,(i,s)=>{e.push(new w(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new w(i,s.value))}),e}function Te(n,e){if(C(e))return n;{const t=Ze(n,e);return t!=null?new ue(new P(t)):new ue(n.writeTree_.subtree(e))}}function xi(n){return n.writeTree_.isEmpty()}function gt(n,e){return Zo(b(),n.writeTree_,e)}function Zo(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Zo(A(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(A(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(n,e){return ia(e,n)}function kd(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Dt(n.visibleWrites,e,t)),n.lastWriteId=i}function Ad(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Ni(n.visibleWrites,e,t),n.lastWriteId=i}function Nd(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Dd(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&xd(a,i.path)?s=!1:ie(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Od(n),!0;if(i.snap)n.visibleWrites=Tr(n.visibleWrites,i.path);else{const a=i.children;W(a,l=>{n.visibleWrites=Tr(n.visibleWrites,A(i.path,l))})}return!0}else return!1}function xd(n,e){if(n.snap)return ie(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ie(A(n.path,t),e))return!0;return!1}function Od(n){n.visibleWrites=ea(n.allWrites,Md,b()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Md(n){return n.visible}function ea(n,e,t){let i=ue.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)ie(t,o)?(a=j(t,o),i=Dt(i,a,r.snap)):ie(o,t)&&(a=j(o,t),i=Dt(i,b(),r.snap.getChild(a)));else if(r.children){if(ie(t,o))a=j(t,o),i=Ni(i,a,r.children);else if(ie(o,t))if(a=j(o,t),C(a))i=Ni(i,b(),r.children);else{const l=qe(r.children,v(a));if(l){const c=l.getChild(T(a));i=Dt(i,b(),c)}}}else throw vt("WriteRecord should have .snap or .children")}}return i}function ta(n,e,t,i,s){if(!i&&!s){const r=Ze(n.visibleWrites,e);if(r!=null)return r;{const o=Te(n.visibleWrites,e);if(xi(o))return t;if(t==null&&!Di(o,b()))return null;{const a=t||g.EMPTY_NODE;return gt(o,a)}}}else{const r=Te(n.visibleWrites,e);if(!s&&xi(r))return t;if(!s&&t==null&&!Di(r,b()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ie(c.path,e)||ie(e,c.path))},a=ea(n.allWrites,o,e),l=t||g.EMPTY_NODE;return gt(a,l)}}}function Ld(n,e,t){let i=g.EMPTY_NODE;const s=Ze(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(R,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Te(n.visibleWrites,e);return t.forEachChild(R,(o,a)=>{const l=gt(Te(r,new S(o)),a);i=i.updateImmediateChild(o,l)}),Pr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Te(n.visibleWrites,e);return Pr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Fd(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(Di(n.visibleWrites,r))return null;{const o=Te(n.visibleWrites,r);return xi(o)?s.getChild(t):gt(o,s.getChild(t))}}function Bd(n,e,t,i){const s=A(e,t),r=Ze(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Te(n.visibleWrites,s);return gt(o,i.getNode().getImmediateChild(t))}else return null}function Vd(n,e){return Ze(n.visibleWrites,e)}function Wd(n,e,t,i,s,r,o){let a;const l=Te(n.visibleWrites,e),c=Ze(l,b());if(c!=null)a=c;else if(t!=null)a=gt(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&d.length<s;)u(p,i)!==0&&d.push(p),p=h.getNext();return d}else return[]}function Ud(){return{visibleWrites:ue.empty(),allWrites:[],lastWriteId:-1}}function Tn(n,e,t,i){return ta(n.writeTree,n.treePath,e,t,i)}function ys(n,e){return Ld(n.writeTree,n.treePath,e)}function Rr(n,e,t,i){return Fd(n.writeTree,n.treePath,e,t,i)}function Pn(n,e){return Vd(n.writeTree,A(n.treePath,e))}function $d(n,e,t,i,s,r){return Wd(n.writeTree,n.treePath,e,t,i,s,r)}function vs(n,e,t){return Bd(n.writeTree,n.treePath,e,t)}function na(n,e){return ia(A(n.treePath,e),n.writeTree)}function ia(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Ht(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,$t(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,mt(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ht(i,e.snapshotNode,s.oldSnap));else throw vt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const sa=new jd;class Cs{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Oe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return vs(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Qe(this.viewCache_),r=$d(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(n){return{filter:n}}function Gd(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function qd(n,e,t,i,s){const r=new Hd;let o,a;if(t.type===ce.OVERWRITE){const c=t;c.source.fromUser?o=Oi(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=Rn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===ce.MERGE){const c=t;c.source.fromUser?o=Qd(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Mi(n,e,c.path,c.children,i,s,a,r))}else if(t.type===ce.ACK_USER_WRITE){const c=t;c.revert?o=Xd(n,e,c.path,i,s,r):o=Kd(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===ce.LISTEN_COMPLETE)o=Jd(n,e,t.path,i,r);else throw vt("Unknown operation type: "+t.type);const l=r.getChanges();return Yd(e,o,l),{viewCache:o,changes:l}}function Yd(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=In(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Jo(In(e)))}}function ra(n,e,t,i,s,r){const o=e.eventCache;if(Pn(i,t)!=null)return e;{let a,l;if(C(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Qe(e),d=c instanceof g?c:g.EMPTY_NODE,u=ys(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Tn(i,Qe(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=v(t);if(c===".priority"){f(xe(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Rr(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=T(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Rr(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=vs(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return Nt(e,a,o.isFullyInitialized()||C(t),n.filter.filtersNodes())}}function Rn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(C(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=v(t);if(!l.isCompleteForPath(t)&&xe(t)>1)return e;const _=T(t),D=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=d.updatePriority(l.getNode(),D):c=d.updateChild(l.getNode(),p,D,_,sa,null)}const u=Xo(e,c,l.isFullyInitialized()||C(t),d.filtersNodes()),h=new Cs(s,u,r);return ra(n,u,t,s,h,a)}function Oi(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new Cs(s,e,r);if(C(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Nt(e,c,!0,n.filter.filtersNodes());else{const u=v(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=Nt(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=T(t),p=a.getNode().getImmediateChild(u);let _;if(C(h))_=i;else{const E=d.getCompleteChild(u);E!=null?ls(h)===".priority"&&E.getChild(jo(h)).isEmpty()?_=E:_=E.updateChild(h,i):_=g.EMPTY_NODE}if(p.equals(_))l=e;else{const E=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=Nt(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function kr(n,e){return n.eventCache.isCompleteForChild(e)}function Qd(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=A(t,l);kr(e,v(d))&&(a=Oi(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=A(t,l);kr(e,v(d))||(a=Oi(n,a,d,c,s,r,o))}),a}function Ar(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Mi(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(t)?c=i:c=new P(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Ar(n,p,h);l=Rn(n,l,new S(u),_,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),E=Ar(n,_,h);l=Rn(n,l,new S(u),E,s,r,o,a)}}),l}function Kd(n,e,t,i,s,r,o){if(Pn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(C(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Rn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(C(t)){let c=new P(null);return l.getNode().forEachChild(fe,(d,u)=>{c=c.set(new S(d),u)}),Mi(n,e,t,c,s,r,a,o)}else return e}else{let c=new P(null);return i.foreach((d,u)=>{const h=A(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Mi(n,e,t,c,s,r,a,o)}}function Jd(n,e,t,i,s){const r=e.serverCache,o=Xo(e,r.getNode(),r.isFullyInitialized()||C(t),r.isFiltered());return ra(n,o,t,i,sa,s)}function Xd(n,e,t,i,s,r){let o;if(Pn(i,t)!=null)return e;{const a=new Cs(i,e,s),l=e.eventCache.getNode();let c;if(C(t)||v(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Tn(i,Qe(e));else{const u=e.serverCache.getNode();f(u instanceof g,"serverChildren would be complete if leaf node"),d=ys(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=v(t);let u=vs(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,T(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,g.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Tn(i,Qe(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Pn(i,b())!=null,Nt(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zd{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new ps(i.getIndex()),r=fd(i);this.processor_=zd(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),d=new Oe(l,o.isFullyInitialized(),s.filtersNodes()),u=new Oe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Un(u,d),this.eventGenerator_=new Sd(this.query_)}get query(){return this.query_}}function eh(n){return n.viewCache_.serverCache.getNode()}function th(n){return In(n.viewCache_)}function nh(n,e){const t=Qe(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!C(e)&&!t.getImmediateChild(v(e)).isEmpty())?t.getChild(e):null}function Nr(n){return n.eventRegistrations_.length===0}function ih(n,e){n.eventRegistrations_.push(e)}function Dr(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function xr(n,e,t,i){e.type===ce.MERGE&&e.source.queryId!==null&&(f(Qe(n.viewCache_),"We should always have a full cache before handling merges"),f(In(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=qd(n.processor_,s,e,t,i);return Gd(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,oa(n,r.changes,r.viewCache.eventCache.getNode(),null)}function sh(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(R,(r,o)=>{i.push(mt(r,o))}),t.isFullyInitialized()&&i.push(Jo(t.getNode())),oa(n,i,t.getNode(),e)}function oa(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Id(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn;class aa{constructor(){this.views=new Map}}function rh(n){f(!kn,"__referenceConstructor has already been defined"),kn=n}function oh(){return f(kn,"Reference.ts has not been loaded"),kn}function ah(n){return n.views.size===0}function ws(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),xr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(xr(o,e,t,i));return r}}function la(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Tn(t,s?i:null),l=!1;a?l=!0:i instanceof g?(a=ys(t,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=Un(new Oe(a,l,!1),new Oe(i,s,!1));return new Zd(e,c)}return o}function lh(n,e,t,i,s,r){const o=la(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),ih(o,t),sh(o,t)}function ch(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Me(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Dr(c,t,i)),Nr(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Dr(l,t,i)),Nr(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Me(n)&&r.push(new(oh())(e._repo,e._path)),{removed:r,events:o}}function ca(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Pe(n,e){let t=null;for(const i of n.views.values())t=t||nh(i,e);return t}function ua(n,e){if(e._queryParams.loadsAllData())return Hn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function da(n,e){return ua(n,e)!=null}function Me(n){return Hn(n)!=null}function Hn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let An;function uh(n){f(!An,"__referenceConstructor has already been defined"),An=n}function dh(){return f(An,"Reference.ts has not been loaded"),An}let hh=1;class Or{constructor(e){this.listenProvider_=e,this.syncPointTree_=new P(null),this.pendingWriteTree_=Ud(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Es(n,e,t,i,s){return kd(n.pendingWriteTree_,e,t,i,s),s?bt(n,new Ye(ms(),e,t)):[]}function fh(n,e,t,i){Ad(n.pendingWriteTree_,e,t,i);const s=P.fromObject(t);return bt(n,new _t(ms(),e,s))}function Se(n,e,t=!1){const i=Nd(n.pendingWriteTree_,e);if(Dd(n.pendingWriteTree_,e)){let r=new P(null);return i.snap!=null?r=r.set(b(),!0):W(i.children,o=>{r=r.set(new S(o),!0)}),bt(n,new Sn(i.path,r,t))}else return[]}function tn(n,e,t){return bt(n,new Ye(_s(),e,t))}function ph(n,e,t){const i=P.fromObject(t);return bt(n,new _t(_s(),e,i))}function mh(n,e){return bt(n,new zt(_s(),e))}function _h(n,e,t){const i=bs(n,t);if(i){const s=Ss(i),r=s.path,o=s.queryId,a=j(r,e),l=new zt(gs(o),a);return Is(n,r,l)}else return[]}function Nn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||da(o,e))){const l=ch(o,e,t,i);ah(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>Me(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=vh(h);for(let _=0;_<p.length;++_){const E=p[_],D=E.query,te=ma(n,E);n.listenProvider_.startListening(xt(D),Gt(n,D),te.hashFn,te.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(xt(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(zn(h));n.listenProvider_.stopListening(xt(h),p)}))}Ch(n,c)}return a}function ha(n,e,t,i){const s=bs(n,i);if(s!=null){const r=Ss(s),o=r.path,a=r.queryId,l=j(o,e),c=new Ye(gs(a),l,t);return Is(n,o,c)}else return[]}function gh(n,e,t,i){const s=bs(n,i);if(s){const r=Ss(s),o=r.path,a=r.queryId,l=j(o,e),c=P.fromObject(t),d=new _t(gs(a),l,c);return Is(n,o,d)}else return[]}function Li(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,p)=>{const _=j(h,s);r=r||Pe(p,_),o=o||Me(p)});let a=n.syncPointTree_.get(s);a?(o=o||Me(a),r=r||Pe(a,b())):(a=new aa,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const E=Pe(_,b());E&&(r=r.updateImmediateChild(p,E))}));const c=da(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=zn(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=wh();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=$n(n.pendingWriteTree_,s);let u=lh(a,e,t,d,r,l);if(!c&&!o&&!i){const h=ua(a,e);u=u.concat(Eh(n,e,h))}return u}function jn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=j(o,e),c=Pe(a,l);if(c)return c});return ta(s,e,r,t,!0)}function yh(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=j(c,t);i=i||Pe(d,u)});let s=n.syncPointTree_.get(t);s?i=i||Pe(s,b()):(s=new aa,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Oe(i,!0,!1):null,a=$n(n.pendingWriteTree_,e._path),l=la(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return th(l)}function bt(n,e){return fa(e,n.syncPointTree_,null,$n(n.pendingWriteTree_,b()))}function fa(n,e,t,i){if(C(n.path))return pa(n,e,t,i);{const s=e.get(b());t==null&&s!=null&&(t=Pe(s,b()));let r=[];const o=v(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=na(i,o);r=r.concat(fa(a,l,c,d))}return s&&(r=r.concat(ws(s,n,i,t))),r}}function pa(n,e,t,i){const s=e.get(b());t==null&&s!=null&&(t=Pe(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=na(i,o),d=n.operationForChild(o);d&&(r=r.concat(pa(d,a,l,c)))}),s&&(r=r.concat(ws(s,n,i,t))),r}function ma(n,e){const t=e.query,i=Gt(n,t);return{hashFn:()=>(eh(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?_h(n,t._path,i):mh(n,t._path);{const r=fu(s,t);return Nn(n,t,null,r)}}}}function Gt(n,e){const t=zn(e);return n.queryToTagMap.get(t)}function zn(n){return n._path.toString()+"$"+n._queryIdentifier}function bs(n,e){return n.tagToQueryMap.get(e)}function Ss(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new S(n.substr(0,e))}}function Is(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=$n(n.pendingWriteTree_,e);return ws(i,t,s,null)}function vh(n){return n.fold((e,t,i)=>{if(t&&Me(t))return[Hn(t)];{let s=[];return t&&(s=ca(t)),W(i,(r,o)=>{s=s.concat(o)}),s}})}function xt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(dh())(n._repo,n._path):n}function Ch(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=zn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function wh(){return hh++}function Eh(n,e,t){const i=e._path,s=Gt(n,e),r=ma(n,t),o=n.listenProvider_.startListening(xt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!Me(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!C(c)&&d&&Me(d))return[Hn(d).query];{let h=[];return d&&(h=h.concat(ca(d).map(p=>p.query))),W(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(xt(d),Gt(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ts(t)}node(){return this.node_}}class Ps{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Ps(this.syncTree_,t)}node(){return jn(this.syncTree_,this.path_)}}const bh=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Mr=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Sh(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Ih(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Sh=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Ih=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},_a=function(n,e,t,i){return ks(e,new Ps(t,n),i)},Rs=function(n,e,t){return ks(n,new Ts(e),t)};function ks(n,e,t){const i=n.getPriority().val(),s=Mr(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Mr(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new O(a,N(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new O(s))),o.forEachChild(R,(a,l)=>{const c=ks(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Gn(n,e){let t=e instanceof S?e:new S(e),i=n,s=v(t);for(;s!==null;){const r=qe(i.node.children,s)||{children:{},childCount:0};i=new As(s,i,r),t=T(t),s=v(t)}return i}function et(n){return n.node.value}function Ns(n,e){n.node.value=e,Fi(n)}function ga(n){return n.node.childCount>0}function Th(n){return et(n)===void 0&&!ga(n)}function qn(n,e){W(n.node.children,(t,i)=>{e(new As(t,n,i))})}function ya(n,e,t,i){t&&e(n),qn(n,s=>{ya(s,e,!0)})}function Ph(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function nn(n){return new S(n.parent===null?n.name:nn(n.parent)+"/"+n.name)}function Fi(n){n.parent!==null&&Rh(n.parent,n.name,n)}function Rh(n,e,t){const i=Th(t),s=X(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Fi(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Fi(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=/[\[\].#$\/\u0000-\u001F\u007F]/,Ah=/[\[\].#$\u0000-\u001F\u007F]/,mi=10*1024*1024,Yn=function(n){return typeof n=="string"&&n.length!==0&&!kh.test(n)},va=function(n){return typeof n=="string"&&n.length!==0&&!Ah.test(n)},Nh=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),va(n)},qt=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Fn(n)||n&&typeof n=="object"&&X(n,".sv")},me=function(n,e,t,i){i&&e===void 0||sn(Y(n,"value"),e,t)},sn=function(n,e,t){const i=t instanceof S?new qu(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+$e(i));if(typeof e=="function")throw new Error(n+"contains a function "+$e(i)+" with contents = "+e.toString());if(Fn(e))throw new Error(n+"contains "+e.toString()+" "+$e(i));if(typeof e=="string"&&e.length>mi/3&&Mn(e)>mi)throw new Error(n+"contains a string greater than "+mi+" utf8 bytes "+$e(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(W(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Yn(o)))throw new Error(n+" contains an invalid key ("+o+") "+$e(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Yu(i,o),sn(n,a,i),Qu(i)}),s&&r)throw new Error(n+' contains ".value" child '+$e(i)+" in addition to actual children.")}},Dh=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Ut(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Yn(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Gu);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&ie(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Ca=function(n,e,t,i){const s=Y(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];W(e,(o,a)=>{const l=new S(o);if(sn(s,a,A(t,l)),ls(l)===".priority"&&!qt(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Dh(s,r)},Ds=function(n,e,t){if(Fn(e))throw new Error(Y(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!qt(e))throw new Error(Y(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},rn=function(n,e,t,i){if(t!==void 0&&!Yn(t))throw new Error(Y(n,e)+'was an invalid key = "'+t+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},Yt=function(n,e,t,i){if(!va(t))throw new Error(Y(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},xh=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Yt(n,e,t)},se=function(n,e){if(v(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},wa=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Yn(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Nh(t))throw new Error(Y(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Qn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!cs(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Ea(n,e,t){Qn(n,t),ba(n,i=>cs(i,e))}function Z(n,e,t){Qn(n,t),ba(n,i=>ie(i,e)||ie(e,i))}function ba(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Mh(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Mh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();ze&&B("event: "+t.toString()),wt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa="repo_interrupt",Lh=25;class Fh{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Oh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=bn(),this.transactionQueueTree_=new As,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Bh(n,e,t){if(n.stats_=os(n.repoInfo_),n.forceRestClient_||gu())n.server_=new En(n.repoInfo_,(i,s,r,o)=>{Lr(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Fr(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{x(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ye(n.repoInfo_,e,(i,s,r,o)=>{Lr(n,i,s,r,o)},i=>{Fr(n,i)},i=>{Vh(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Eu(n.repoInfo_,()=>new bd(n.stats_,n.server_)),n.infoData_=new yd,n.infoSyncTree_=new Or({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=tn(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),xs(n,"connected",!1),n.serverSyncTree_=new Or({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);Z(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Ia(n){const t=n.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function on(n){return bh({timestamp:Ia(n)})}function Lr(n,e,t,i,s){n.dataUpdateCount++;const r=new S(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=_n(t,c=>N(c));o=gh(n.serverSyncTree_,r,l,s)}else{const l=N(t);o=ha(n.serverSyncTree_,r,l,s)}else if(i){const l=_n(t,c=>N(c));o=ph(n.serverSyncTree_,r,l)}else{const l=N(t);o=tn(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=yt(n,r)),Z(n.eventQueue_,a,o)}function Fr(n,e){xs(n,"connected",e),e===!1&&$h(n)}function Vh(n,e){W(e,(t,i)=>{xs(n,t,i)})}function xs(n,e,t){const i=new S("/.info/"+e),s=N(t);n.infoData_.updateSnapshot(i,s);const r=tn(n.infoSyncTree_,i,s);Z(n.eventQueue_,i,r)}function Kn(n){return n.nextWriteId_++}function Wh(n,e,t){const i=yh(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=N(s).withIndex(e._queryParams.getIndex());Li(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=tn(n.serverSyncTree_,e._path,r);else{const a=Gt(n.serverSyncTree_,e);o=ha(n.serverSyncTree_,e._path,r,a)}return Z(n.eventQueue_,e._path,o),Nn(n.serverSyncTree_,e,t,null,!0),r},s=>(St(n,"get for query "+x(e)+" failed: "+s),Promise.reject(new Error(s))))}function Os(n,e,t,i,s){St(n,"set",{path:e.toString(),value:t,priority:i});const r=on(n),o=N(t,i),a=jn(n.serverSyncTree_,e),l=Rs(o,a,r),c=Kn(n),d=Es(n.serverSyncTree_,e,l,c,!0);Qn(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||H("set at "+e+" failed: "+h);const E=Se(n.serverSyncTree_,c,!_);Z(n.eventQueue_,e,E),Le(n,s,h,p)});const u=Ls(n,e);yt(n,u),Z(n.eventQueue_,u,[])}function Uh(n,e,t,i){St(n,"update",{path:e.toString(),value:t});let s=!0;const r=on(n),o={};if(W(t,(a,l)=>{s=!1,o[a]=_a(A(e,a),N(l),n.serverSyncTree_,r)}),s)B("update() called with empty data.  Don't do anything."),Le(n,i,"ok",void 0);else{const a=Kn(n),l=fh(n.serverSyncTree_,e,o,a);Qn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||H("update at "+e+" failed: "+c);const h=Se(n.serverSyncTree_,a,!u),p=h.length>0?yt(n,e):e;Z(n.eventQueue_,p,h),Le(n,i,c,d)}),W(t,c=>{const d=Ls(n,A(e,c));yt(n,d)}),Z(n.eventQueue_,e,[])}}function $h(n){St(n,"onDisconnectEvents");const e=on(n),t=bn();Ai(n.onDisconnect_,b(),(s,r)=>{const o=_a(s,r,n.serverSyncTree_,e);Et(t,s,o)});let i=[];Ai(t,b(),(s,r)=>{i=i.concat(tn(n.serverSyncTree_,s,r));const o=Ls(n,s);yt(n,o)}),n.onDisconnect_=bn(),Z(n.eventQueue_,b(),i)}function Hh(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&ki(n.onDisconnect_,e),Le(n,t,i,s)})}function Br(n,e,t,i){const s=N(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&Et(n.onDisconnect_,e,s),Le(n,i,r,o)})}function jh(n,e,t,i,s){const r=N(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&Et(n.onDisconnect_,e,r),Le(n,s,o,a)})}function zh(n,e,t,i){if(yi(t)){B("onDisconnect().update() called with empty data.  Don't do anything."),Le(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&W(t,(o,a)=>{const l=N(a);Et(n.onDisconnect_,A(e,o),l)}),Le(n,i,s,r)})}function Gh(n,e,t){let i;v(e._path)===".info"?i=Li(n.infoSyncTree_,e,t):i=Li(n.serverSyncTree_,e,t),Ea(n.eventQueue_,e._path,i)}function Bi(n,e,t){let i;v(e._path)===".info"?i=Nn(n.infoSyncTree_,e,t):i=Nn(n.serverSyncTree_,e,t),Ea(n.eventQueue_,e._path,i)}function Ta(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Sa)}function qh(n){n.persistentConnection_&&n.persistentConnection_.resume(Sa)}function St(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),B(t,...e)}function Le(n,e,t,i){e&&wt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Yh(n,e,t,i,s,r){St(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:wo(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Ms(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{sn("transaction failed: Data returned ",l,o.path),o.status=0;const c=Gn(n.transactionQueueTree_,e),d=et(c)||[];d.push(o),Ns(c,d);let u;typeof l=="object"&&l!==null&&X(l,".priority")?(u=qe(l,".priority"),f(qt(u),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):u=(jn(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const h=on(n),p=N(l,u),_=Rs(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=_,o.currentWriteId=Kn(n);const E=Es(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);Z(n.eventQueue_,e,E),Jn(n,n.transactionQueueTree_)}}function Ms(n,e,t){return jn(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Jn(n,e=n.transactionQueueTree_){if(e||Xn(n,e),et(e)){const t=Ra(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Qh(n,nn(e),t)}else ga(e)&&qn(e,t=>{Jn(n,t)})}function Qh(n,e,t){const i=t.map(c=>c.currentWriteId),s=Ms(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=j(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{St(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(Se(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Xn(n,Gn(n.transactionQueueTree_,e)),Jn(n,n.transactionQueueTree_),Z(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)wt(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{H("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}yt(n,e)}},o)}function yt(n,e){const t=Pa(n,e),i=nn(t),s=Ra(n,t);return Kh(n,s,i),i}function Kh(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=j(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(Se(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Lh)d=!0,u="maxretry",s=s.concat(Se(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Ms(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){sn("transaction failed: Data returned ",p,l.path);let _=N(p);typeof p=="object"&&p!=null&&X(p,".priority")||(_=_.updatePriority(h.getPriority()));const D=l.currentWriteId,te=on(n),ae=Rs(_,h,te);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=ae,l.currentWriteId=Kn(n),o.splice(o.indexOf(D),1),s=s.concat(Es(n.serverSyncTree_,l.path,ae,l.currentWriteId,l.applyLocally)),s=s.concat(Se(n.serverSyncTree_,D,!0))}else d=!0,u="nodata",s=s.concat(Se(n.serverSyncTree_,l.currentWriteId,!0))}Z(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Xn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)wt(i[a]);Jn(n,n.transactionQueueTree_)}function Pa(n,e){let t,i=n.transactionQueueTree_;for(t=v(e);t!==null&&et(i)===void 0;)i=Gn(i,t),e=T(e),t=v(e);return i}function Ra(n,e){const t=[];return ka(n,e,t),t.sort((i,s)=>i.order-s.order),t}function ka(n,e,t){const i=et(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);qn(e,s=>{ka(n,s,t)})}function Xn(n,e){const t=et(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ns(e,t.length>0?t:void 0)}qn(e,i=>{Xn(n,i)})}function Ls(n,e){const t=nn(Pa(n,e)),i=Gn(n.transactionQueueTree_,e);return Ph(i,s=>{_i(n,s)}),_i(n,i),ya(i,s=>{_i(n,s)}),t}function _i(n,e){const t=et(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Se(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ns(e,void 0):t.length=r+1,Z(n.eventQueue_,nn(e),s);for(let o=0;o<i.length;o++)wt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jh(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Xh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):H(`Invalid query segment '${t}' in query '${n}'`)}return e}const Vi=function(n,e){const t=Zh(n),i=t.namespace;t.domain==="firebase.com"&&pe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&pe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||lu();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Mo(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new S(t.pathString)}},Zh=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=Jh(n.substring(d,u)));const h=Xh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ef=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Vr.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Vr.charAt(e[s]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Aa{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+x(this.snapshot.exportVal())}}class Na{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */let tf=class{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new G;return Hh(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){se("OnDisconnect.remove",this._path);const e=new G;return Br(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){se("OnDisconnect.set",this._path),me("OnDisconnect.set",e,this._path,!1);const t=new G;return Br(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){se("OnDisconnect.setWithPriority",this._path),me("OnDisconnect.setWithPriority",e,this._path,!1),Ds("OnDisconnect.setWithPriority",t);const i=new G;return jh(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){se("OnDisconnect.update",this._path),Ca("OnDisconnect.update",e,this._path);const t=new G;return zh(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}};/**
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
 */class Q{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:ls(this._path)}get ref(){return new oe(this._repo,this._path)}get _queryIdentifier(){const e=Sr(this._queryParams),t=ss(e);return t==="{}"?"default":t}get _queryObject(){return Sr(this._queryParams)}isEqual(e){if(e=ee(e),!(e instanceof Q))return!1;const t=this._repo===e._repo,i=cs(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+zu(this._path)}}function Zn(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Be(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===fe){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==De)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==we)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===R){if(e!=null&&!qt(e)||t!=null&&!qt(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(f(n.getIndex()instanceof hs||n.getIndex()===fs,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function ei(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class oe extends Q{constructor(e,t){super(e,t,new Vn,!1)}get parent(){const e=jo(this._path);return e===null?null:new oe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}let ti=class Wi{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new S(e),i=Ke(this.ref,e);return new Wi(this._node.getChild(t),i,R)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Wi(s,Ke(this.ref,i),R)))}hasChild(e){const t=new S(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function Da(n,e){return n=ee(n),n._checkNotDeleted("ref"),e!==void 0?Ke(n._root,e):n._root}function Wr(n,e){n=ee(n),n._checkNotDeleted("refFromURL");const t=Vi(e,n._repo.repoInfo_.nodeAdmin);wa("refFromURL",t);const i=t.repoInfo;return!n._repo.repoInfo_.isCustomHost()&&i.host!==n._repo.repoInfo_.host&&pe("refFromURL: Host name does not match the current database: (found "+i.host+" but expected "+n._repo.repoInfo_.host+")"),Da(n,t.path.toString())}function Ke(n,e){return n=ee(n),v(n._path)===null?xh("child","path",e):Yt("child","path",e),new oe(n._repo,A(n._path,e))}function nf(n,e){n=ee(n),se("push",n._path),me("push",e,n._path,!0);const t=Ia(n._repo),i=ef(t),s=Ke(n,i),r=Ke(n,i);let o;return e!=null?o=Bs(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function sf(n){return se("remove",n._path),Bs(n,null)}function Bs(n,e){n=ee(n),se("set",n._path),me("set",e,n._path,!1);const t=new G;return Os(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function rf(n,e){n=ee(n),se("setPriority",n._path),Ds("setPriority",e);const t=new G;return Os(n._repo,A(n._path,".priority"),e,null,t.wrapCallback(()=>{})),t.promise}function of(n,e,t){if(se("setWithPriority",n._path),me("setWithPriority",e,n._path,!1),Ds("setWithPriority",t),n.key===".length"||n.key===".keys")throw"setWithPriority failed: "+n.key+" is a read-only object.";const i=new G;return Os(n._repo,n._path,e,t,i.wrapCallback(()=>{})),i.promise}function af(n,e){Ca("update",e,n._path);const t=new G;return Uh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function lf(n){n=ee(n);const e=new Fs(()=>{}),t=new an(e);return Wh(n._repo,n,t).then(i=>new ti(i,new oe(n._repo,n._path),n._queryParams.getIndex()))}class an{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Aa("value",this,new ti(e.snapshotNode,new oe(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Na(this,e,t):null}matches(e){return e instanceof an?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ni{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Na(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const i=Ke(new oe(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Aa(e.type,this,new ti(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ni?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function ln(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(d,u)=>{Bi(n._repo,n,a),l(d,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Fs(t,r||void 0),a=e==="value"?new an(o):new ni(e,o);return Gh(n._repo,n,a),()=>Bi(n._repo,n,a)}function Ui(n,e,t,i){return ln(n,"value",e,t,i)}function Ur(n,e,t,i){return ln(n,"child_added",e,t,i)}function $r(n,e,t,i){return ln(n,"child_changed",e,t,i)}function Hr(n,e,t,i){return ln(n,"child_moved",e,t,i)}function jr(n,e,t,i){return ln(n,"child_removed",e,t,i)}function zr(n,e,t){let i=null;const s=t?new Fs(t):null;e==="value"?i=new an(s):e&&(i=new ni(e,s)),Bi(n._repo,n,i)}class de{}class xa extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){me("endAt",this._value,e._path,!0);const t=Ri(e._queryParams,this._value,this._key);if(ei(t),Be(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Q(e._repo,e._path,t,e._orderByCalled)}}function cf(n,e){return rn("endAt","key",e),new xa(n,e)}class uf extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){me("endBefore",this._value,e._path,!1);const t=gd(e._queryParams,this._value,this._key);if(ei(t),Be(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new Q(e._repo,e._path,t,e._orderByCalled)}}function df(n,e){return rn("endBefore","key",e),new uf(n,e)}class Oa extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){me("startAt",this._value,e._path,!0);const t=Pi(e._queryParams,this._value,this._key);if(ei(t),Be(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new Q(e._repo,e._path,t,e._orderByCalled)}}function hf(n=null,e){return rn("startAt","key",e),new Oa(n,e)}class ff extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){me("startAfter",this._value,e._path,!1);const t=_d(e._queryParams,this._value,this._key);if(ei(t),Be(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new Q(e._repo,e._path,t,e._orderByCalled)}}function pf(n,e){return rn("startAfter","key",e),new ff(n,e)}class mf extends de{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new Q(e._repo,e._path,pd(e._queryParams,this._limit),e._orderByCalled)}}function _f(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new mf(n)}class gf extends de{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Q(e._repo,e._path,md(e._queryParams,this._limit),e._orderByCalled)}}function yf(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new gf(n)}class vf extends de{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Zn(e,"orderByChild");const t=new S(this._path);if(C(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new hs(t),s=Wn(e._queryParams,i);return Be(s),new Q(e._repo,e._path,s,!0)}}function Cf(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return Yt("orderByChild","path",n),new vf(n)}class wf extends de{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Zn(e,"orderByKey");const t=Wn(e._queryParams,fe);return Be(t),new Q(e._repo,e._path,t,!0)}}function Ef(){return new wf}class bf extends de{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){Zn(e,"orderByPriority");const t=Wn(e._queryParams,R);return Be(t),new Q(e._repo,e._path,t,!0)}}function Sf(){return new bf}class If extends de{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){Zn(e,"orderByValue");const t=Wn(e._queryParams,fs);return Be(t),new Q(e._repo,e._path,t,!0)}}function Tf(){return new If}class Pf extends de{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(me("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new xa(this._value,this._key)._apply(new Oa(this._value,this._key)._apply(e))}}function Rf(n,e){return rn("equalTo","key",e),new Pf(n,e)}function le(n,...e){let t=ee(n);for(const i of e)t=i._apply(t);return t}rh(oe);uh(oe);/**
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
 */const kf="FIREBASE_DATABASE_EMULATOR_HOST",$i={};let Af=!1;function Nf(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Ki(r);n.repoInfo_=new Mo(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Ma(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||pe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Vi(r,s),a=o.repoInfo,l,c;typeof process<"u"&&or&&(c=or[kf]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=Vi(r,s),a=o.repoInfo):l=!o.repoInfo.secure;const d=s&&l?new rt(rt.OWNER):new vu(n.name,n.options,e);wa("Invalid Firebase Database URL",o),C(o.path)||pe("Database URL must point to the root of a Firebase Database (not including a child path).");const u=xf(a,n,d,new yu(n,t));return new Of(u,n)}function Df(n,e){const t=$i[e];(!t||t[n.key]!==n)&&pe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Ta(n),delete t[n.key]}function xf(n,e,t,i){let s=$i[e.name];s||(s={},$i[e.name]=s);let r=s[n.toURLString()];return r&&pe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Fh(n,Af,t,i),s[n.toURLString()]=r,r}let Of=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Bh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new oe(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Df(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&pe("Cannot call "+e+" on a deleted database.")}};function La(){pt.IS_TRANSPORT_INITIALIZED&&H("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function Mf(){La(),be.forceDisallow()}function Lf(){La(),ne.forceDisallow(),be.forceAllow()}function Ff(n,e,t,i={}){n=ee(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&gn(i,r.repoInfo_.emulatorOptions))return;pe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&pe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new rt(rt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:yl(i.mockUserToken,n.app.options.projectId);o=new rt(a)}Ki(e)&&(gl(e),wl("Database",!0)),Nf(r,s,i,o)}function Bf(n){n=ee(n),n._checkNotDeleted("goOffline"),Ta(n._repo)}function Vf(n){n=ee(n),n._checkNotDeleted("goOnline"),qh(n._repo)}function Wf(n,e){bo(n,e)}/**
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
 */function Uf(n){vo(ts),ft(new ve("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Ma(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ge(ar,lr,n),ge(ar,lr,"esm2020")}/**
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
 */const $f={".sv":"timestamp"};function Hf(){return $f}function jf(n){return{".sv":{increment:n}}}/**
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
 */let zf=class{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}};function Gf(n,e,t){if(n=ee(n),se("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const i=t?.applyLocally??!0,s=new G,r=(a,l,c)=>{let d=null;a?s.reject(a):(d=new ti(c,new oe(n._repo,n._path),R),s.resolve(new zf(l,d)))},o=Ui(n,()=>{});return Yh(n._repo,n._path,e,r,o,i),s.promise}ye.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ye.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Uf();const qf="@firebase/database-compat",Yf="2.1.0";/**
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
 */const Qf=new Ln("@firebase/database-compat"),Fa=function(n){const e="FIREBASE WARNING: "+n;Qf.warn(e)};/**
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
 */const Kf=function(n,e,t,i){if(t!==void 0&&typeof t!="boolean")throw new Error(Y(n,e)+"must be a boolean.")},Jf=function(n,e,t){if(e!==void 0)switch(e){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(Y(n,"eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf{constructor(e){this._delegate=e}cancel(e){y("OnDisconnect.cancel",0,1,arguments.length),L("OnDisconnect.cancel","onComplete",e,!0);const t=this._delegate.cancel();return e&&t.then(()=>e(null),i=>e(i)),t}remove(e){y("OnDisconnect.remove",0,1,arguments.length),L("OnDisconnect.remove","onComplete",e,!0);const t=this._delegate.remove();return e&&t.then(()=>e(null),i=>e(i)),t}set(e,t){y("OnDisconnect.set",1,2,arguments.length),L("OnDisconnect.set","onComplete",t,!0);const i=this._delegate.set(e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){y("OnDisconnect.setWithPriority",2,3,arguments.length),L("OnDisconnect.setWithPriority","onComplete",i,!0);const s=this._delegate.setWithPriority(e,t);return i&&s.then(()=>i(null),r=>i(r)),s}update(e,t){if(y("OnDisconnect.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,Fa("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}L("OnDisconnect.update","onComplete",t,!0);const i=this._delegate.update(e);return t&&i.then(()=>t(null),s=>t(s)),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zf{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return y("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,t){this._database=e,this._delegate=t}val(){return y("DataSnapshot.val",0,0,arguments.length),this._delegate.val()}exportVal(){return y("DataSnapshot.exportVal",0,0,arguments.length),this._delegate.exportVal()}toJSON(){return y("DataSnapshot.toJSON",0,1,arguments.length),this._delegate.toJSON()}exists(){return y("DataSnapshot.exists",0,0,arguments.length),this._delegate.exists()}child(e){return y("DataSnapshot.child",0,1,arguments.length),e=String(e),Yt("DataSnapshot.child","path",e),new Re(this._database,this._delegate.child(e))}hasChild(e){return y("DataSnapshot.hasChild",1,1,arguments.length),Yt("DataSnapshot.hasChild","path",e),this._delegate.hasChild(e)}getPriority(){return y("DataSnapshot.getPriority",0,0,arguments.length),this._delegate.priority}forEach(e){return y("DataSnapshot.forEach",1,1,arguments.length),L("DataSnapshot.forEach","action",e,!1),this._delegate.forEach(t=>e(new Re(this._database,t)))}hasChildren(){return y("DataSnapshot.hasChildren",0,0,arguments.length),this._delegate.hasChildren()}get key(){return this._delegate.key}numChildren(){return y("DataSnapshot.numChildren",0,0,arguments.length),this._delegate.size}getRef(){return y("DataSnapshot.ref",0,0,arguments.length),new K(this._database,this._delegate.ref)}get ref(){return this.getRef()}}class U{constructor(e,t){this.database=e,this._delegate=t}on(e,t,i,s){y("Query.on",2,4,arguments.length),L("Query.on","callback",t,!1);const r=U.getCancelAndContextArgs_("Query.on",i,s),o=(l,c)=>{t.call(r.context,new Re(this.database,l),c)};o.userCallback=t,o.context=r.context;const a=r.cancel?.bind(r.context);switch(e){case"value":return Ui(this._delegate,o,a),t;case"child_added":return Ur(this._delegate,o,a),t;case"child_removed":return jr(this._delegate,o,a),t;case"child_changed":return $r(this._delegate,o,a),t;case"child_moved":return Hr(this._delegate,o,a),t;default:throw new Error(Y("Query.on","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}off(e,t,i){if(y("Query.off",0,3,arguments.length),Jf("Query.off",e),L("Query.off","callback",t,!0),Ks("Query.off","context",i),t){const s=()=>{};s.userCallback=t,s.context=i,zr(this._delegate,e,s)}else zr(this._delegate,e)}get(){return lf(this._delegate).then(e=>new Re(this.database,e))}once(e,t,i,s){y("Query.once",1,4,arguments.length),L("Query.once","callback",t,!0);const r=U.getCancelAndContextArgs_("Query.once",i,s),o=new G,a=(c,d)=>{const u=new Re(this.database,c);t&&t.call(r.context,u,d),o.resolve(u)};a.userCallback=t,a.context=r.context;const l=c=>{r.cancel&&r.cancel.call(r.context,c),o.reject(c)};switch(e){case"value":Ui(this._delegate,a,l,{onlyOnce:!0});break;case"child_added":Ur(this._delegate,a,l,{onlyOnce:!0});break;case"child_removed":jr(this._delegate,a,l,{onlyOnce:!0});break;case"child_changed":$r(this._delegate,a,l,{onlyOnce:!0});break;case"child_moved":Hr(this._delegate,a,l,{onlyOnce:!0});break;default:throw new Error(Y("Query.once","eventType")+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}return o.promise}limitToFirst(e){return y("Query.limitToFirst",1,1,arguments.length),new U(this.database,le(this._delegate,_f(e)))}limitToLast(e){return y("Query.limitToLast",1,1,arguments.length),new U(this.database,le(this._delegate,yf(e)))}orderByChild(e){return y("Query.orderByChild",1,1,arguments.length),new U(this.database,le(this._delegate,Cf(e)))}orderByKey(){return y("Query.orderByKey",0,0,arguments.length),new U(this.database,le(this._delegate,Ef()))}orderByPriority(){return y("Query.orderByPriority",0,0,arguments.length),new U(this.database,le(this._delegate,Sf()))}orderByValue(){return y("Query.orderByValue",0,0,arguments.length),new U(this.database,le(this._delegate,Tf()))}startAt(e=null,t){return y("Query.startAt",0,2,arguments.length),new U(this.database,le(this._delegate,hf(e,t)))}startAfter(e=null,t){return y("Query.startAfter",0,2,arguments.length),new U(this.database,le(this._delegate,pf(e,t)))}endAt(e=null,t){return y("Query.endAt",0,2,arguments.length),new U(this.database,le(this._delegate,cf(e,t)))}endBefore(e=null,t){return y("Query.endBefore",0,2,arguments.length),new U(this.database,le(this._delegate,df(e,t)))}equalTo(e,t){return y("Query.equalTo",1,2,arguments.length),new U(this.database,le(this._delegate,Rf(e,t)))}toString(){return y("Query.toString",0,0,arguments.length),this._delegate.toString()}toJSON(){return y("Query.toJSON",0,1,arguments.length),this._delegate.toJSON()}isEqual(e){if(y("Query.isEqual",1,1,arguments.length),!(e instanceof U)){const t="Query.isEqual failed: First argument must be an instance of firebase.database.Query.";throw new Error(t)}return this._delegate.isEqual(e._delegate)}static getCancelAndContextArgs_(e,t,i){const s={cancel:void 0,context:void 0};if(t&&i)s.cancel=t,L(e,"cancel",s.cancel,!0),s.context=i,Ks(e,"context",s.context);else if(t)if(typeof t=="object"&&t!==null)s.context=t;else if(typeof t=="function")s.cancel=t;else throw new Error(Y(e,"cancelOrContext")+" must either be a cancel callback or a context object.");return s}get ref(){return new K(this.database,new oe(this._delegate._repo,this._delegate._path))}}class K extends U{constructor(e,t){super(e,new Q(t._repo,t._path,new Vn,!1)),this.database=e,this._delegate=t}getKey(){return y("Reference.key",0,0,arguments.length),this._delegate.key}child(e){return y("Reference.child",1,1,arguments.length),typeof e=="number"&&(e=String(e)),new K(this.database,Ke(this._delegate,e))}getParent(){y("Reference.parent",0,0,arguments.length);const e=this._delegate.parent;return e?new K(this.database,e):null}getRoot(){return y("Reference.root",0,0,arguments.length),new K(this.database,this._delegate.root)}set(e,t){y("Reference.set",1,2,arguments.length),L("Reference.set","onComplete",t,!0);const i=Bs(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}update(e,t){if(y("Reference.update",1,2,arguments.length),Array.isArray(e)){const s={};for(let r=0;r<e.length;++r)s[""+r]=e[r];e=s,Fa("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}se("Reference.update",this._delegate._path),L("Reference.update","onComplete",t,!0);const i=af(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}setWithPriority(e,t,i){y("Reference.setWithPriority",2,3,arguments.length),L("Reference.setWithPriority","onComplete",i,!0);const s=of(this._delegate,e,t);return i&&s.then(()=>i(null),r=>i(r)),s}remove(e){y("Reference.remove",0,1,arguments.length),L("Reference.remove","onComplete",e,!0);const t=sf(this._delegate);return e&&t.then(()=>e(null),i=>e(i)),t}transaction(e,t,i){y("Reference.transaction",1,3,arguments.length),L("Reference.transaction","transactionUpdate",e,!1),L("Reference.transaction","onComplete",t,!0),Kf("Reference.transaction","applyLocally",i);const s=Gf(this._delegate,e,{applyLocally:i}).then(r=>new Zf(r.committed,new Re(this.database,r.snapshot)));return t&&s.then(r=>t(null,r.committed,r.snapshot),r=>t(r,!1,null)),s}setPriority(e,t){y("Reference.setPriority",1,2,arguments.length),L("Reference.setPriority","onComplete",t,!0);const i=rf(this._delegate,e);return t&&i.then(()=>t(null),s=>t(s)),i}push(e,t){y("Reference.push",0,2,arguments.length),L("Reference.push","onComplete",t,!0);const i=nf(this._delegate,e),s=i.then(o=>new K(this.database,o));t&&s.then(()=>t(null),o=>t(o));const r=new K(this.database,i);return r.then=s.then.bind(s),r.catch=s.catch.bind(s,void 0),r}onDisconnect(){return se("Reference.onDisconnect",this._delegate._path),new Xf(new tf(this._delegate._repo,this._delegate._path))}get key(){return this.getKey()}get parent(){return this.getParent()}get root(){return this.getRoot()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,t){this._delegate=e,this.app=t,this.INTERNAL={delete:()=>this._delegate._delete(),forceWebSockets:Mf,forceLongPolling:Lf}}useEmulator(e,t,i={}){Ff(this._delegate,e,t,i)}ref(e){if(y("database.ref",0,1,arguments.length),e instanceof K){const t=Wr(this._delegate,e.toString());return new K(this,t)}else{const t=Da(this._delegate,e);return new K(this,t)}}refFromURL(e){y("database.refFromURL",1,1,arguments.length);const i=Wr(this._delegate,e);return new K(this,i)}goOffline(){return y("database.goOffline",0,0,arguments.length),Bf(this._delegate)}goOnline(){return y("database.goOnline",0,0,arguments.length),Vf(this._delegate)}}Qt.ServerValue={TIMESTAMP:Hf(),increment:n=>jf(n)};function ep({app:n,url:e,version:t,customAuthImpl:i,customAppCheckImpl:s,namespace:r,nodeAdmin:o=!1}){vo(t);const a=new Ji("database-standalone"),l=new vi("auth-internal",a);l.setComponent(new ve("auth-internal",()=>i,"PRIVATE"));let c;return s&&(c=new vi("app-check-internal",a),c.setComponent(new ve("app-check-internal",()=>s,"PRIVATE"))),{instance:new Qt(Ma(n,l,c,e,o),n),namespace:r}}var tp=Object.freeze({__proto__:null,initStandalone:ep});/**
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
 */const np=Qt.ServerValue;function ip(n){n.INTERNAL.registerComponent(new ve("database-compat",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app-compat").getImmediate(),s=e.getProvider("database").getImmediate({identifier:t});return new Qt(s,i)},"PUBLIC").setServiceProps({Reference:K,Query:U,Database:Qt,DataSnapshot:Re,enableLogging:Wf,INTERNAL:tp,ServerValue:np}).setMultipleInstances(!0)),n.registerVersion(qf,Yf)}ip(Wt);const sp={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",projectId:"vidu-aae11",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"};Wt.apps.length||Wt.initializeApp(sp);const re=Wt.database();function Ba(n,e,t){if(!n||!e)return;const i=`rooms/${n}/connections/${e}`;return re.ref(i).set({status:t,timestamp:Date.now()})}class Va{constructor(e,t,i){this.peerConnection=e,this.roomRef=t,this.role=i,this.pendingCandidates=[],this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1},this.setupICEHandling()}setupICEHandling(){this.peerConnection.onicecandidate=e=>{this.handleLocalCandidate(e)},this.peerConnection.onicegatheringstatechange=()=>{this.peerConnection.iceGatheringState==="complete"&&(this.state.iceGatheringComplete=!0,this.onICEGatheringComplete?.())},this.peerConnection.oniceconnectionstatechange=()=>{const e=this.peerConnection.iceConnectionState;this.onICEConnectionStateChange?.(e)},this.listenForRemoteCandidates()}handleLocalCandidate(e){if(e.candidate){this.state.localCandidatesCount++;const t=this.role==="caller"?"callerCandidates":"calleeCandidates";this.roomRef.child(t).push(e.candidate.toJSON()).catch(i=>{console.error("Failed to send ICE candidate to Firebase:",i)})}}listenForRemoteCandidates(){const e=this.role==="caller"?"calleeCandidates":"callerCandidates";this.roomRef.child(e).on("child_added",t=>{const i=t.val();if(i)try{const s=new RTCIceCandidate(i);this.handleRemoteCandidate(s)}catch(s){console.warn("Failed to create RTCIceCandidate:",s,i)}})}async handleRemoteCandidate(e){if(this.state.remoteCandidatesCount++,this.state.remoteDescriptionSet)try{await this.peerConnection.addIceCandidate(e)}catch(t){console.warn("Failed to add ICE candidate:",t)}else this.pendingCandidates.push(e),this.state.pendingCandidatesCount=this.pendingCandidates.length}async processQueuedCandidates(){if(!this.state.remoteDescriptionSet){console.warn("Cannot process queued candidates: remote description not set");return}if(this.pendingCandidates.length===0)return;const e=[...this.pendingCandidates];this.pendingCandidates.length=0,this.state.pendingCandidatesCount=0;for(const t of e)try{await this.peerConnection.addIceCandidate(t)}catch(i){console.warn("Failed to add queued ICE candidate:",i)}}async onRemoteDescriptionSet(){this.state.remoteDescriptionSet=!0,await this.processQueuedCandidates()}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState}}cleanup(){const e=this.role==="caller"?"calleeCandidates":"callerCandidates";this.roomRef.child(e).off(),this.pendingCandidates.length=0,this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1}}}class Wa{constructor(e,t={}){this.peerConnection=e,this.options={connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3,...t},this.state={current:"new",previous:null,startTime:Date.now(),reconnectAttempt:0,lastError:null},this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null},this.timers={connectionTimeout:null,reconnectTimer:null},this.setupStateMonitoring()}setCallbacks(e){Object.assign(this.callbacks,e)}setupStateMonitoring(){this.peerConnection.onconnectionstatechange=()=>{this.handleConnectionStateChange(this.peerConnection.connectionState)},this.peerConnection.oniceconnectionstatechange=()=>{this.handleICEConnectionStateChange(this.peerConnection.iceConnectionState)},this.startConnectionTimeout()}handleConnectionStateChange(e){const t=this.state.current;switch(this.updateState(e),e){case"connecting":this.handleConnecting();break;case"connected":this.handleConnected();break;case"disconnected":this.handleDisconnected();break;case"failed":this.handleFailed();break;case"closed":this.handleClosed();break}this.callbacks.onStateChange?.(e,t)}handleICEConnectionStateChange(e){switch(e){case"checking":break;case"connected":this.clearConnectionTimeout();break;case"completed":break;case"failed":this.handleICEFailed();break;case"disconnected":this.handleICEDisconnected();break}}handleConnecting(){this.clearReconnectTimer(),this.startConnectionTimeout()}handleConnected(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.reconnectAttempt=0,this.state.lastError=null;const e=Date.now()-this.state.startTime;this.callbacks.onConnected?.(e)}handleDisconnected(){this.callbacks.onDisconnected?.(),this.state.reconnectAttempt<this.options.reconnectAttempts?this.scheduleReconnect():this.handleFailed("Max reconnection attempts reached")}handleFailed(e="Connection failed"){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.lastError=e,this.callbacks.onFailed?.(e)}handleClosed(){this.clearConnectionTimeout(),this.clearReconnectTimer()}handleICEFailed(){this.handleFailed("ICE connection failed")}handleICEDisconnected(){}scheduleReconnect(){this.state.reconnectAttempt++;const e=this.options.reconnectDelay*Math.pow(2,this.state.reconnectAttempt-1);this.callbacks.onReconnecting?.(this.state.reconnectAttempt,this.options.reconnectAttempts),this.timers.reconnectTimer=setTimeout(()=>{this.attemptReconnection()},e)}async attemptReconnection(){try{await this.peerConnection.restartIce(),this.state.startTime=Date.now(),this.startConnectionTimeout()}catch(e){console.error("Reconnection attempt failed:",e),this.handleDisconnected()}}startConnectionTimeout(){this.clearConnectionTimeout(),this.timers.connectionTimeout=setTimeout(()=>{this.state.current!=="connected"&&this.handleFailed("Connection timeout")},this.options.connectionTimeout)}clearConnectionTimeout(){this.timers.connectionTimeout&&(clearTimeout(this.timers.connectionTimeout),this.timers.connectionTimeout=null)}clearReconnectTimer(){this.timers.reconnectTimer&&(clearTimeout(this.timers.reconnectTimer),this.timers.reconnectTimer=null)}updateState(e){this.state.previous=this.state.current,this.state.current=e}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState,connectionTime:Date.now()-this.state.startTime}}async forceReconnect(){this.state.reconnectAttempt=0,await this.attemptReconnection()}cleanup(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state={current:"closed",previous:this.state.current,startTime:Date.now(),reconnectAttempt:0,lastError:null}}}const Ua={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},m={roomId:null,isInitiator:!1,wasConnected:!1,peerConnection:null,localStream:null,iceCandidateManager:null,connectionStateManager:null,roomRef:null};function $a(){return m.roomId}function rp(){return m.isInitiator}function op(){return m.wasConnected}function Vs(n){m.localStream=n}function ii(){return m.localStream}function Ha(){return m.peerConnection}async function ap({onRemoteStream:n,onStatusUpdate:e}){if(m.isInitiator=!0,m.roomId||(m.roomId=dp()),m.peerConnection=new RTCPeerConnection(Ua),!m.localStream)throw e?.("Error: No local media. Please allow mic/camera."),new Error("connect called without localStream set");m.localStream.getTracks().forEach(i=>{m.peerConnection.addTrack(i,m.localStream)});const t=await m.peerConnection.createOffer();return await m.peerConnection.setLocalDescription(t),m.roomRef=await hp(m.roomId,t),m.peerConnection.ontrack=i=>{za(i,n)},m.iceCandidateManager=new Va(m.peerConnection,m.roomRef,"caller"),m.connectionStateManager=new Wa(m.peerConnection,{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),m.connectionStateManager.setCallbacks({onStateChange:(i,s)=>{},onConnected:i=>{},onDisconnected:()=>{e?.("Connection lost. Attempting to reconnect...")},onFailed:i=>{e?.(`Connection failed: ${i}`)},onReconnecting:(i,s)=>{e?.(`Reconnecting... (${i}/${s})`)}}),m.roomRef.child("answer").on("value",async i=>{const s=i.val();if(s&&!m.peerConnection.currentRemoteDescription)try{await m.peerConnection.setRemoteDescription(new RTCSessionDescription(s)),await m.iceCandidateManager.onRemoteDescriptionSet()}catch(r){console.error("Failed to set remote description (caller):",r),e?.("Connection error: Failed to process answer")}}),Ba(m.roomId,"initiator","waiting"),e&&e("Link ready! Waiting for partner..."),{roomId:m.roomId,shareUrl:`${window.location.origin}${window.location.pathname}?room=${m.roomId}`}}async function ja({roomId:n,onRemoteStream:e,onStatusUpdate:t}){m.roomId=n;const{roomRef:i,roomSnapshot:s}=await fp(n);if(!s.exists())return t&&t("Error: Invalid room link"),{success:!1};if(m.roomRef=i,m.peerConnection=new RTCPeerConnection(Ua),!m.localStream)throw t?.("Error: No local media. Please allow mic/camera."),new Error("join called without localStream set");m.localStream.getTracks().forEach(r=>{m.peerConnection.addTrack(r,m.localStream)}),m.peerConnection.ontrack=r=>{za(r,e)},m.iceCandidateManager=new Va(m.peerConnection,m.roomRef,"callee"),m.connectionStateManager=new Wa(m.peerConnection,{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),m.connectionStateManager.setCallbacks({onStateChange:(r,o)=>{},onConnected:r=>{},onDisconnected:()=>{t?.("Connection lost. Attempting to reconnect...")},onFailed:r=>{t?.(`Connection failed: ${r}`)},onReconnecting:(r,o)=>{t?.(`Reconnecting... (${r}/${o})`)}});try{const r=s.val().offer;await m.peerConnection.setRemoteDescription(new RTCSessionDescription(r)),await m.iceCandidateManager.onRemoteDescriptionSet();const o=await m.peerConnection.createAnswer();return await m.peerConnection.setLocalDescription(o),await m.roomRef.child("answer").set({type:o.type,sdp:o.sdp}),Ba(m.roomId,"joiner","connecting"),{success:!0}}catch(r){return console.error("Failed to join room:",r),t?.(`Failed to join: ${r.message}`),{success:!1}}}async function lp({onStatusUpdate:n}){m.iceCandidateManager&&(m.iceCandidateManager.cleanup(),m.iceCandidateManager=null),m.connectionStateManager&&(m.connectionStateManager.cleanup(),m.connectionStateManager=null),up(),m.peerConnection&&(m.peerConnection.ontrack=null,m.peerConnection.onicecandidate=null,m.peerConnection.onconnectionstatechange=null,m.peerConnection.oniceconnectionstatechange=null,m.peerConnection.onicegatheringstatechange=null,m.peerConnection.close(),m.peerConnection=null),m.localStream&&(m.localStream.getTracks().forEach(e=>e.stop()),m.localStream=null),m.roomId&&m.isInitiator&&await pp(m.roomId),m.roomId=null,m.isInitiator=!1,m.wasConnected=!1,m.roomRef=null,n&&n("Disconnected. Ready for new chat.")}function cp(n){n&&(n.roomId&&(m.roomId=n.roomId),n.isInitiator!==void 0&&(m.isInitiator=n.isInitiator),n.wasConnected!==void 0&&(m.wasConnected=n.wasConnected))}function za(n,e){m.wasConnected=!0,e&&e(n.streams[0])}function up(){if(!m.roomId)return;const n=re.ref(`rooms/${m.roomId}`);n.child("answer").off(),n.child("offer").off(),n.child("callerCandidates").off(),n.child("calleeCandidates").off()}function dp(){return Math.random().toString(36).substring(2,15)}async function hp(n,e){const t=re.ref(`rooms/${n}`);return await t.set({offer:{type:e.type,sdp:e.sdp}}),t}async function fp(n){const e=re.ref(`rooms/${n}`),t=await e.once("value");return{roomRef:e,roomSnapshot:t}}async function pp(n){await re.ref(`rooms/${n}`).remove()}async function Ga(n,e={}){const{timeout:t=5e3,checkInterval:i=500,minWidth:s=32,minHeight:r=32,blackThreshold:o=10}=e;return new Promise(a=>{const l=Date.now();let c=0;const d=()=>{if(c++,Date.now()-l>t){a({isValid:!1,reason:"timeout",message:"Video validation timed out",checks:c});return}if(!n.srcObject){setTimeout(d,i);return}if(n.readyState<2){setTimeout(d,i);return}if(n.videoWidth<s||n.videoHeight<r){setTimeout(d,i);return}const h=n.currentTime;setTimeout(()=>{if(n.currentTime===h&&!n.paused){a({isValid:!1,reason:"frozen",message:"Video appears to be frozen",checks:c});return}mp(n,o).then(p=>{a(p?{isValid:!1,reason:"black",message:"Video is showing black frames",checks:c}:{isValid:!0,reason:"valid",message:"Video stream is valid",checks:c,dimensions:{width:n.videoWidth,height:n.videoHeight}})}).catch(()=>{a({isValid:!0,reason:"valid_no_canvas",message:"Video stream appears valid (canvas check failed)",checks:c})})},100)};d()})}async function mp(n,e=10){return new Promise((t,i)=>{try{const s=document.createElement("canvas"),r=s.getContext("2d");s.width=Math.min(n.videoWidth,320),s.height=Math.min(n.videoHeight,240),r.drawImage(n,0,0,s.width,s.height);const a=r.getImageData(0,0,s.width,s.height).data;let l=0,c=0;for(let u=0;u<a.length;u+=16){const h=a[u],p=a[u+1],_=a[u+2],E=h*.299+p*.587+_*.114;l+=E,c++}const d=l/c;t(d<e)}catch(s){i(s)}})}function _p(n){if(!n)return{hasVideo:!1,hasAudio:!1,videoTracks:0,audioTracks:0,activeVideoTracks:0,activeAudioTracks:0};const e=n.getVideoTracks(),t=n.getAudioTracks(),i=e.filter(r=>r.enabled&&r.readyState==="live"),s=t.filter(r=>r.enabled&&r.readyState==="live");return{hasVideo:e.length>0,hasAudio:t.length>0,videoTracks:e.length,audioTracks:t.length,activeVideoTracks:i.length,activeAudioTracks:s.length,videoEnabled:i.length>0,audioEnabled:s.length>0}}function gp(n,e,t={}){const{checkInterval:i=2e3,maxFailures:s=3,autoRecover:r=!0}=t;let o=0,a=null,l=!0;const c=async()=>{if(l){try{const d=await Ga(n,{timeout:3e3,checkInterval:200});d.isValid?(o>0?(o=0,e?.({status:"recovered",message:"Video stream recovered",result:d})):a!=="valid"&&e?.({status:"valid",message:"Video stream is healthy",result:d}),a="valid"):(o++,o>=s?(e?.({status:"failed",message:`Video stream validation failed: ${d.message}`,result:d,failureCount:o}),a="failed"):(e?.({status:"warning",message:`Video stream issue detected: ${d.message} (${o}/${s})`,result:d,failureCount:o}),a="warning"))}catch(d){console.warn("Video stream monitoring error:",d)}l&&setTimeout(c,i)}};return setTimeout(c,1e3),()=>{l=!1}}class yp{constructor(e={}){this.options={videoValidationTimeout:8e3,maxRetries:3,retryDelay:2e3,monitorInterval:3e3,...e},this.state={connectionState:"idle",videoValidated:!1,audioValidated:!1,retryCount:0,lastError:null},this.callbacks={onStatusUpdate:null,onConnectionStateChange:null,onValidationComplete:null},this.monitors={video:null,connection:null}}setCallbacks({onStatusUpdate:e,onConnectionStateChange:t,onValidationComplete:i}){this.callbacks.onStatusUpdate=e,this.callbacks.onConnectionStateChange=t,this.callbacks.onValidationComplete=i}async startMonitoring(e,t){this.updateConnectionState("connecting"),this.updateStatus("Establishing connection..."),this.monitorPeerConnection(t);try{await this.validateRemoteVideo(e),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(e),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated})}catch(i){this.handleValidationFailure(i,e,t)}}async validateRemoteVideo(e){this.updateConnectionState("validating"),this.updateStatus("Validating video stream...");const t=await Ga(e,{timeout:this.options.videoValidationTimeout,checkInterval:500,minWidth:32,minHeight:32});if(!t.isValid)throw new Error(`Video validation failed: ${t.message}`);if(this.state.videoValidated=!0,e.srcObject){const i=_p(e.srcObject);this.state.audioValidated=i.audioEnabled}return t}monitorPeerConnection(e){e&&(e.onconnectionstatechange=()=>{switch(e.connectionState){case"connected":break;case"disconnected":this.updateConnectionState("reconnecting"),this.updateStatus("Connection lost. Attempting to reconnect...");break;case"failed":this.updateConnectionState("failed"),this.updateStatus("Connection failed. Please try again.");break;case"closed":this.updateConnectionState("idle"),this.updateStatus("Connection closed."),this.cleanup();break}},e.oniceconnectionstatechange=()=>{e.iceConnectionState==="failed"&&this.handleConnectionFailure("ICE connection failed")})}startContinuousMonitoring(e){this.monitors.video=gp(e,t=>this.handleVideoMonitorUpdate(t),{checkInterval:this.options.monitorInterval,maxFailures:2,autoRecover:!0})}handleVideoMonitorUpdate(e){switch(e.status){case"valid":break;case"warning":this.updateStatus(`Connection issue: ${e.message}`);break;case"failed":this.updateConnectionState("failed"),this.updateStatus(`Video stream failed: ${e.message}`);break;case"recovered":this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully.");break}}async handleValidationFailure(e,t,i){if(this.state.lastError=e,this.state.retryCount++,this.state.retryCount<=this.options.maxRetries){this.updateStatus(`Connection issue detected. Retrying... (${this.state.retryCount}/${this.options.maxRetries})`),await new Promise(s=>setTimeout(s,this.options.retryDelay));try{await this.validateRemoteVideo(t),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(t),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated,retriesUsed:this.state.retryCount})}catch(s){await this.handleValidationFailure(s,t,i)}}else this.updateConnectionState("failed"),this.updateStatus("Connection failed: Unable to establish video stream. Please try again."),this.callbacks.onValidationComplete?.({success:!1,error:e.message,retriesUsed:this.state.retryCount})}handleConnectionFailure(e){this.updateConnectionState("failed"),this.updateStatus(`Connection failed: ${e}`),this.cleanup()}updateConnectionState(e){const t=this.state.connectionState;this.state.connectionState=e,t!==e&&this.callbacks.onConnectionStateChange?.(e,t)}updateStatus(e){this.callbacks.onStatusUpdate?.(e)}getState(){return{...this.state}}cleanup(){this.monitors.video&&(this.monitors.video(),this.monitors.video=null),this.state.connectionState="idle",this.state.videoValidated=!1,this.state.audioValidated=!1,this.state.retryCount=0,this.state.lastError=null}}const Hi={connection:"idle",room:{id:null,isInitiator:!1,partnerOnline:!1},media:{localStream:null,peerConnection:null},ui:{isAudioMuted:!1,isVideoOn:!0,currentFacingMode:"user",watchMode:!1},sync:{streamUrl:"",isSyncing:!1}},vp=[];function fn(n){Object.assign(Hi,n),vp.forEach(e=>e(Hi))}function Gr(){return Hi}class Cp{constructor(){this.isRestoring=!1,this.restorationCallbacks={onMediaRestore:null,onConnectionRestore:null,onUIRestore:null,onStatusUpdate:null}}setCallbacks(e){Object.assign(this.restorationCallbacks,e)}saveCurrentSession(){const e=Gr();if(!e.room.id)return;const t={roomId:e.room.id,isInitiator:e.room.isInitiator,partnerOnline:e.room.partnerOnline,connectionState:e.connection,wasConnected:e.connection==="connected",isAudioMuted:e.ui.isAudioMuted,isVideoOn:e.ui.isVideoOn,currentFacingMode:e.ui.currentFacingMode,watchMode:e.ui.watchMode,streamUrl:e.sync.streamUrl,sessionStartTime:Date.now(),lastActivity:Date.now()};al(t)}shouldRestoreSession(){const e=hn();if(!e||!e.roomId)return!1;const t=Date.now()-e.lastActivity,i=300*1e3;return t>i?(it(),!1):!!e.wasConnected}async restoreSession(){const e=hn();if(!e)return{success:!1,reason:"No saved state"};this.isRestoring=!0;try{if(this.restorationCallbacks.onStatusUpdate?.("Restoring session..."),fn({room:{id:e.roomId,isInitiator:e.isInitiator,partnerOnline:e.partnerOnline},connection:"reconnecting",ui:{isAudioMuted:e.isAudioMuted,isVideoOn:e.isVideoOn,currentFacingMode:e.currentFacingMode,watchMode:e.watchMode},sync:{streamUrl:e.streamUrl||"",isSyncing:!1}}),!await this.restoreMedia(e))throw new Error("Failed to restore media");if(this.restoreUI(e),!await this.restoreConnection(e))throw new Error("Failed to restore connection");return this.restorationCallbacks.onStatusUpdate?.("Session restored successfully!"),{success:!0}}catch(t){return console.error("Session restoration failed:",t),this.restorationCallbacks.onStatusUpdate?.(`Restoration failed: ${t.message}`),it(),fn({connection:"idle",room:{id:null,isInitiator:!1,partnerOnline:!1}}),{success:!1,reason:t.message}}finally{this.isRestoring=!1}}async restoreMedia(e){try{this.restorationCallbacks.onStatusUpdate?.("Restoring camera and microphone...");const t=await this.restorationCallbacks.onMediaRestore?.({isAudioMuted:e.isAudioMuted,isVideoOn:e.isVideoOn,currentFacingMode:e.currentFacingMode});if(!t||!t.success)throw new Error("Media restoration failed");return!0}catch(t){return console.error("Failed to restore media:",t),!1}}async restoreConnection(e){try{this.restorationCallbacks.onStatusUpdate?.("Reconnecting to room...");const t=await this.restorationCallbacks.onConnectionRestore?.({roomId:e.roomId,isInitiator:e.isInitiator,wasConnected:e.wasConnected});if(!t||!t.success)throw new Error("Connection restoration failed");return!0}catch(t){return console.error("Failed to restore connection:",t),!1}}restoreUI(e){try{this.restorationCallbacks.onUIRestore?.({isAudioMuted:e.isAudioMuted,isVideoOn:e.isVideoOn,watchMode:e.watchMode,streamUrl:e.streamUrl})}catch(t){console.error("Failed to restore UI:",t)}}setupAutoSave(){const e=setInterval(()=>{const s=Gr();s.room.id&&s.connection!=="idle"&&this.saveCurrentSession()},1e4),t=()=>{this.saveCurrentSession()};window.addEventListener("beforeunload",t);const i=()=>{document.hidden&&this.saveCurrentSession()};return document.addEventListener("visibilitychange",i),()=>{clearInterval(e),window.removeEventListener("beforeunload",t),document.removeEventListener("visibilitychange",i)}}isCurrentlyRestoring(){return this.isRestoring}clearSession(){it(),fn({connection:"idle",room:{id:null,isInitiator:!1,partnerOnline:!1},ui:{watchMode:!1},sync:{streamUrl:"",isSyncing:!1}})}getRestorationInfo(){const e=hn();return{hasSavedState:!!e,shouldRestore:this.shouldRestoreSession(),isRestoring:this.isRestoring,savedState:e?{roomId:e.roomId,isInitiator:e.isInitiator,sessionAge:e.lastActivity?Date.now()-e.lastActivity:null,wasConnected:e.wasConnected}:null}}}let k=null,Je=!1,wp=()=>!!document.pictureInPictureElement;async function Ep(n,e,t,i=!1){console.log("[PiP] Toggle requested",{hasDocumentPiP:"documentPictureInPicture"in window,hasStream:!!n.srcObject,hasFloatingWindow:!!document.pictureInPictureElement,documentPipWindowOpen:!!k,nativePipActive:wp()});try{if(!n.srcObject){console.warn("[PiP] No remote stream available"),t("Connect to a partner first");return}if(document.pictureInPictureElement){console.log("[PiP] Exiting active native PiP (via custom button)"),await document.exitPictureInPicture(),Je=!1,e.textContent="Float Partner Video";return}if(k){console.log("[PiP] Closing existing Document PiP window"),k.close(),k=null,e.textContent="Float Partner Video";return}if(n.offsetParent===null&&!("documentPictureInPicture"in window)){console.warn("[PiP] Video is hidden and Document PiP not available"),t("Switch to Video Chat mode to use floating window");return}if(i&&"documentPictureInPicture"in window){await bp(n,e);return}if("pictureInPictureEnabled"in document){await Sp(n,e);return}}catch(s){console.error("[PiP] Error:",s.name,s.message,s),s.name==="NotAllowedError"?t("Picture-in-Picture blocked. Check browser permissions."):s.name==="InvalidStateError"?t("Cannot open PiP - video not ready"):t("Picture-in-Picture failed. See console for details.")}}async function bp(n,e){console.log("[PiP] Opening Document PiP window");try{if(k=await window.documentPictureInPicture.requestWindow({width:400,height:300}),console.log("[PiP] Document PiP window created",{width:k.innerWidth,height:k.innerHeight,closed:k.closed}),k.closed)throw console.error("[PiP] Window was closed immediately after creation"),k=null,new Error("PiP window closed immediately");[...document.styleSheets].forEach(a=>{try{const l=[...a.cssRules].map(d=>d.cssText).join(""),c=document.createElement("style");c.textContent=l,k.document.head.appendChild(c)}catch{const c=document.createElement("link");c.rel="stylesheet",c.href=a.href,k.document.head.appendChild(c)}}),k.document.body.innerHTML=`
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;const t=k.document.getElementById("pipVideo"),i=k.document.getElementById("pipMute"),s=n.srcObject.getVideoTracks(),r=n.srcObject.getAudioTracks();console.log("[PiP] Stream tracks:",{video:s.length,audio:r.length,videoActive:s[0]?.enabled,audioActive:r[0]?.enabled}),t.srcObject=n.srcObject,console.log("[PiP] Stream attached to PiP video"),console.log("[PiP] Video will autoplay (muted initially for browser policy)");let o=!0;i.addEventListener("click",()=>{if(!n.srcObject){console.warn("[PiP] Remote stream no longer available");return}o=!o,t.muted=o,o?n.muted=!1:n.muted=!0,i.textContent=o?"Unmute Partner":"Mute Partner",i.style.background=o?"#ff9800":"#4caf50",console.log("[PiP] Partner audio in PiP window:",o?"MUTED":"UNMUTED")}),k.addEventListener("pagehide",()=>{console.log("[PiP] Document PiP window closed by user or browser"),k=null,e.textContent="Float Partner Video"}),k.addEventListener("load",()=>{console.log("[PiP] Document PiP window loaded event fired")}),t.addEventListener("error",a=>{console.error("[PiP] Video element error:",a)}),t.addEventListener("loadedmetadata",()=>{console.log("[PiP] Video metadata loaded in PiP window")}),e.textContent="Close Float Window",console.log("[PiP] Document PiP setup complete")}catch(t){throw console.error("[PiP] Error during Document PiP setup:",t),k&&(k.close(),k=null),t}}async function Sp(n,e){document.pictureInPictureElement?(console.log("[PiP] Exiting native PiP"),await document.exitPictureInPicture(),Je=!1,e.textContent="Float Partner Video"):(console.log("[PiP] Entering native PiP"),await n.requestPictureInPicture(),Je=!0,e.textContent="Exit Float Mode")}function Ip(n,e){n.addEventListener("enterpictureinpicture",()=>{console.log("[PiP] Remote video entered native PiP (via browser controls)"),Je=!0,e.textContent="Exit Float Mode"}),n.addEventListener("leavepictureinpicture",()=>{console.log("[PiP] Remote video exited native PiP (via browser controls)"),Je=!1,e.textContent="Float Partner Video"})}function Tp(n){console.log("[PiP] Cleanup requested"),k&&(console.log("[PiP] Closing Document PiP window during cleanup"),k.close(),k=null),Je&&document.pictureInPictureElement&&(console.log("[PiP] Exiting native PiP during cleanup"),document.exitPictureInPicture().catch(e=>{console.warn("[PiP] Failed to exit native PiP:",e)}),Je=!1),n&&(n.textContent="Float Partner Video",n.style.display="none"),console.log("[PiP] Cleanup complete")}const ke={player:null,ready:!1,currentId:null};function Dn(n){return/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/.test(n)}function qa(n){const e=n.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);return e?e[1]:null}function Ya(n,e,t){e.style.display="none";const i=document.getElementById("yt-iframe");i&&i.remove();let s=document.getElementById("yt-player-div");s||(s=document.createElement("div"),s.id="yt-player-div",e.parentNode.insertBefore(s,e)),s.innerHTML='<div id="yt-iframe"></div>',s.style.display="",ke.player=new YT.Player("yt-iframe",{height:"360",width:"640",videoId:n,events:{onReady:()=>{ke.ready=!0},onStateChange:t}}),ke.currentId=n}function Qa(n){const e=document.getElementById("yt-player-div");e&&(e.style.display="none"),n.style.display="",ke.player=null,ke.ready=!1,ke.currentId=null}function ji(){return ke.player}function zi(){return ke.ready}const $={watchMode:!1,isSyncing:!1};function Ws(){return $.watchMode}function Pp({videoContainer:n,watchContainer:e,toggleModeBtn:t,sharedVideo:i,streamUrlInput:s,syncStatus:r}){return $.watchMode=!$.watchMode,$.watchMode?(n.style.display="none",e.style.display="block",t.textContent="Switch to Video Chat",r.textContent="Paste the same stream URL as your partner"):(n.style.display="flex",e.style.display="none",t.textContent="Switch to Watch Mode",i.src="",s.value=""),$.watchMode}function Rp({roomId:n,url:e,sharedVideo:t,syncStatus:i}){if(!e){i.textContent="Please enter a stream URL";return}if(Dn(e)){const s=qa(e);Ya(s,t,r=>Ja(r,n)),i.textContent="YouTube video sent to partner..."}else Qa(t),t.src=e,i.textContent="Video sent to partner...";n&&re.ref(`rooms/${n}/stream`).set({url:e})}function Ka({roomId:n,sharedVideo:e,streamUrlInput:t,syncStatus:i}){if(!n)return;const s=re.ref(`rooms/${n}`);s.child("stream/url").on("value",r=>{const o=r.val();o&&o!==t.value&&(t.value=o,i.innerHTML='Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>',document.getElementById("accept-shared-video").addEventListener("click",()=>kp({url:o,sharedVideo:e,syncStatus:i})),i.style.background="#2196f3")}),s.child("stream/playing").on("value",async r=>{if($.isSyncing)return;const o=r.val(),a=t.value,l=ji(),c=zi();if(Dn(a)&&l&&c)o===!0&&l.getPlayerState()!==YT.PlayerState.PLAYING?(l.playVideo(),i.textContent="Playing in sync"):o===!1&&l.getPlayerState()===YT.PlayerState.PLAYING&&(l.pauseVideo(),i.textContent="Partner pressed pause");else if(o===!0&&e.paused)try{await e.play(),i.textContent="Playing in sync"}catch{i.textContent="▶️ Tap the video to start playing",i.style.background="#FF5722",i.style.fontSize="16px";const u=()=>{i.style.background="#2a2a2a",i.style.fontSize="14px",e.removeEventListener("play",u)};e.addEventListener("play",u)}else o===!1&&!e.paused&&(e.pause(),i.textContent="Partner pressed pause")}),s.child("stream/time").on("value",r=>{if($.isSyncing)return;const o=r.val(),a=t.value,l=ji(),c=zi();Dn(a)&&l&&c?o!==null&&Math.abs(l.getCurrentTime()-o)>2&&(l.seekTo(o,!0),i.textContent=`Syncing to ${Math.floor(o)}s`):o!==null&&Math.abs(e.currentTime-o)>2&&(e.currentTime=o,i.textContent=`Syncing to ${Math.floor(o)}s`)}),Ap({roomId:n,sharedVideo:e})}function Ja(n,e){const t=ji(),i=zi();!e||!i||!t||(n.data===YT.PlayerState.PLAYING?re.ref(`rooms/${e}/stream`).update({playing:!0,time:t.getCurrentTime()}):n.data===YT.PlayerState.PAUSED&&re.ref(`rooms/${e}/stream`).update({playing:!1,time:t.getCurrentTime()}))}function kp({url:n,sharedVideo:e,syncStatus:t}){if(Dn(n)){const i=qa(n);Ya(i,e,Ja),t.textContent="Loading YouTube video..."}else Qa(e),e.src=n,t.textContent="Loading shared video...";t.style.background="#2a2a2a"}function Ap({roomId:n,sharedVideo:e}){e.addEventListener("play",()=>{n&&!$.isSyncing&&($.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({playing:!0,time:e.currentTime}),setTimeout(()=>$.isSyncing=!1,1e3))}),e.addEventListener("pause",()=>{n&&!$.isSyncing&&($.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({playing:!1,time:e.currentTime}),setTimeout(()=>$.isSyncing=!1,1e3))}),e.addEventListener("seeked",()=>{n&&!$.isSyncing&&($.isSyncing=!0,re.ref(`rooms/${n}/stream`).update({time:e.currentTime}),setTimeout(()=>$.isSyncing=!1,1e3))}),e.addEventListener("loadeddata",()=>{}),e.addEventListener("waiting",()=>{}),e.addEventListener("playing",()=>{})}const V={isAudioMuted:!1,isVideoOn:!0,currentFacingMode:"user"};function Xa(){return V.isAudioMuted}function Za(){return V.isVideoOn}function Np(){return V.currentFacingMode}function Dp({localStream:n,toggleMuteBtn:e,muteSelfBtn:t}){const i=n.getAudioTracks()[0];if(i&&(V.isAudioMuted=!V.isAudioMuted,i.enabled=!V.isAudioMuted,e&&(e.textContent=V.isAudioMuted?"Unmute Mic":"Mute Mic"),t)){const s=t.querySelector("i");s&&(s.className=V.isAudioMuted?"fa fa-microphone-slash":"fa fa-microphone")}}function xp({localStream:n,toggleVideoBtn:e}){const t=n.getVideoTracks()[0];t&&(V.isVideoOn=!V.isVideoOn,t.enabled=V.isVideoOn,e&&(e.textContent=V.isVideoOn?"Turn Video Off":"Turn Video On"))}async function Op({localStream:n,localVideo:e,peerConnection:t}){const i=V.currentFacingMode==="user"?"environment":"user",s=n.getVideoTracks()[0];try{await s.applyConstraints({facingMode:i}),V.currentFacingMode=i;return}catch(a){console.warn("applyConstraints failed, falling back to getUserMedia:",a)}const r=await navigator.mediaDevices.getUserMedia({video:{facingMode:i},audio:!1}),o=r.getVideoTracks()[0];if(t){const a=t.getSenders().find(l=>l.track&&l.track.kind==="video");a&&a.replaceTrack(o)}n.removeTrack(s),n.addTrack(o),e.srcObject=n,s.stop(),r.getTracks().forEach(a=>{a!==o&&a.stop()}),V.currentFacingMode=i}function Mp(n){n&&(n.isAudioMuted!==void 0&&(V.isAudioMuted=n.isAudioMuted),n.isVideoOn!==void 0&&(V.isVideoOn=n.isVideoOn),n.currentFacingMode&&(V.currentFacingMode=n.currentFacingMode))}function Lp(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Fp(){return Lp()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function el(){const n=await Fp();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}function Bp({startChatBtn:n,hangUpBtn:e,copyLinkBtn:t,switchCameraBtn:i,toggleMuteBtn:s,toggleVideoBtn:r,toggleModeBtn:o,loadStreamBtn:a,pipBtn:l,remoteVideo:c,handleStartChat:d,handleHangUp:u,handleCopyLink:h,handleToggleMute:p,handleToggleVideo:_,handleToggleMode:E,handleLoadStream:D,handlePipToggle:te,handleSwitchCamera:ae,updateStatus:Ee}){document.addEventListener("keydown",We=>{We.altKey&&We.key==="p"&&c.srcObject&&(We.preventDefault(),te())}),n.addEventListener("click",d),e.addEventListener("click",u),t.addEventListener("click",h),i.addEventListener("click",ae),s.addEventListener("click",p),r.addEventListener("click",_),o.addEventListener("click",E),a.addEventListener("click",D),l.addEventListener("click",te)}function Vp(n,e){let t="Error: Could not access camera/mic.";n.name==="NotAllowedError"?t+=" Permission denied. Please allow access to your camera and microphone.":n.name==="NotFoundError"||n.name==="DevicesNotFoundError"?t+=" No camera or microphone found on this device.":n.name==="NotReadableError"||n.name==="TrackStartError"?t+=" Camera or microphone is already in use by another application.":n.name==="OverconstrainedError"||n.name==="ConstraintNotSatisfiedError"?t+=" The requested media device is not available or does not support the requested constraints.":n.name==="NotSupportedError"?t+=" Your browser or device does not support video/audio capture, or HTTPS is required.":t+=" "+n.message,console.error("Media error:",t,n)}function Wp(n){let e;function t(){n.classList.add("show-controls"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("show-controls")},3e3)}n.addEventListener("touchstart",t,{passive:!0}),n.addEventListener("click",s=>{s.target instanceof Element&&s.target.closest(".hover-controls")||t()});const i=n.querySelector(".hover-controls");i&&(i.addEventListener("mouseenter",()=>clearTimeout(e)),i.addEventListener("touchstart",()=>clearTimeout(e),{passive:!0}),i.addEventListener("click",()=>clearTimeout(e)),i.addEventListener("mouseleave",()=>{e=setTimeout(()=>{n.classList.remove("show-controls")},2e3)}))}async function Up(n,e){try{return await navigator.clipboard.writeText(n.value),e.textContent="Copied!",setTimeout(()=>e.textContent="Copy Link",2e3),!0}catch(t){return console.error("Failed to copy: ",t),!1}}const $p=async n=>{try{n.requestFullscreen?await n.requestFullscreen():n.webkitRequestFullscreen?await n.webkitRequestFullscreen():n.msRequestFullscreen?await n.msRequestFullscreen():console.warn("Fullscreen API is not supported by this browser.")}catch(e){console.error("Failed to enter fullscreen mode:",e)}},Hp=n=>{$p(n)},jp=(n,e)=>{const t=n.srcObject?.getAudioTracks()[0];if(t){t.enabled=!t.enabled;const i=e.querySelector("i");i&&(i.className=t.enabled?"fa fa-volume-up":"fa fa-volume-mute")}},Us={onMutePartnerClick:jp,onFullscreenClick:Hp};let nt=!1,je=null,he=null,ot=null;function Ve(){fn({room:{id:$a(),isInitiator:rp(),partnerOnline:op()},ui:{isAudioMuted:Xa(),isVideoOn:Za(),currentFacingMode:Np(),watchMode:Ws()},sync:{streamUrl:Fe.value,isSyncing:!1}}),he&&he.saveCurrentSession()}async function tl(){if(nt)return console.debug("init() called when isInitialized is true."),!0;try{if(he=new Cp,he.setCallbacks({onMediaRestore:Kp,onConnectionRestore:Jp,onUIRestore:Xp,onStatusUpdate:M}),he.shouldRestoreSession()){M("Detected previous session. Restoring...");try{if((await he.restoreSession()).success)return nt=!0,qr(),!0;M("Session restoration failed. Starting fresh...")}catch(r){console.error("Session restoration error:",r),M("Starting fresh...")}}const n=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});Vs(n),Ot.srcObject=n,ct.style.display="block",ut.style.display="block",await el()?dn.style.display="block":dn.style.display="none",Bp({startChatBtn:at,hangUpBtn:lt,copyLinkBtn:zs,switchCameraBtn:dn,toggleMuteBtn:ct,toggleVideoBtn:ut,toggleModeBtn:Ge,loadStreamBtn:nl,pipBtn:Mt,remoteVideo:z,handleStartChat:qp,handleHangUp:Qp,handleCopyLink:async()=>{const r=await Up(xn,zs);M(r?"Link copied!":"Please copy manually.")},handleSwitchCamera:async()=>{await Op({localStream:ii(),localVideo:Ot,peerConnection:Ha()}),Ve()},handleToggleMute:si,handleToggleVideo:Hs,handleToggleMode:js,handleLoadStream:Zp,handlePipToggle:()=>Ep(z,Mt,M),updateStatus:M});const t=new URLSearchParams(window.location.search).get("room"),i=hn(),s=zp({urlRoomId:t,savedState:i});return s.action==="join"?(M("Connecting..."),at.style.display="none",Gp(i),await Yp(s.roomId)):M("Ready. Click to generate video chat link."),nt=!0,qr(),!0}catch(n){return Vp(n),nt=!1,!1}}function zp({urlRoomId:n,savedState:e}){const t=n;return t?{action:"join",roomId:t}:{action:"idle"}}function Gp(n){n&&(Mp(n),cp(n),Za()||Hs(),Xa()&&si(),n.watchMode&&!Ws()&&(js(),n.streamUrl&&(Fe.value=n.streamUrl)))}function $s(n){z.srcObject!==n&&(z.srcObject=n,Mt.style.display="block",Ip(z,Mt),Ve(),M("Received video stream. Validating..."),z.paused&&z.srcObject&&z.play().catch(e=>{}),je||(je=new yp({videoValidationTimeout:1e4,maxRetries:3,retryDelay:2e3}),je.setCallbacks({onStatusUpdate:M,onConnectionStateChange:(e,t)=>{},onValidationComplete:e=>{e.success||console.warn("Video stream validation failed:",e.error)}})),je.startMonitoring(z,Ha()))}let gi=!1;async function qp(){if(!gi){gi=!0;try{if(!nt&&!await tl()){console.error("Failed to initialize media devices.");return}const{roomId:n,shareUrl:e}=await ap({onRemoteStream:$s,onStatusUpdate:M});xn.value=e,Gi.style.display="block",at.disabled=!0,lt.disabled=!1,Ka({roomId:n,sharedVideo:Kt,streamUrlInput:Fe,syncStatus:Jt}),Ge.style.display="block",Ve()}finally{gi=!1}}}async function Yp(n){(await ja({roomId:n,onRemoteStream:$s,onStatusUpdate:M})).success&&(Ka({roomId:n,sharedVideo:Kt,streamUrlInput:Fe,syncStatus:Jt}),Ge.style.display="block",lt.disabled=!1,Ve())}async function Qp(){Tp(Mt),je&&(je.cleanup(),je=null),he&&he.clearSession(),ot&&(ot(),ot=null),z.srcObject&&(z.srcObject.getTracks().forEach(e=>e.stop()),z.srcObject=null);const n=ii();n&&(n.getTracks().forEach(e=>e.stop()),Ot.srcObject=null,Vs(null)),await lp({onStatusUpdate:M}),at.disabled=!1,at.style.display="block",lt.disabled=!0,Gi.style.display="none",ct.style.display="none",ut.style.display="none",Ge.style.display="none",Yr.style.display="none",Qr.style.display="flex",xn.value="",Kt.src="",Fe.value="",Jt.textContent="",window.history.replaceState({},document.title,window.location.pathname),it(),nt=!1}function M(n,e=il){e.textContent=n}function qr(){ot&&ot(),he&&(ot=he.setupAutoSave())}async function Kp({isAudioMuted:n,isVideoOn:e,currentFacingMode:t}){try{const i={video:e?{facingMode:t}:!1,audio:!0},s=await navigator.mediaDevices.getUserMedia(i);return Vs(s),Ot.srcObject=s,n&&si(),e||Hs(),ct.style.display="block",ut.style.display="block",await el()&&(dn.style.display="block"),{success:!0}}catch(i){return console.error("Failed to restore media devices:",i),{success:!1,error:i.message}}}async function Jp({roomId:n,isInitiator:e,wasConnected:t}){try{if(e)return M("Session restored. Share the link to reconnect with your partner."),xn.value=`${window.location.origin}${window.location.pathname}?room=${n}`,Gi.style.display="block",at.disabled=!0,lt.disabled=!1,Ge.style.display="block",{success:!0};if(M("Reconnecting to room..."),(await ja({roomId:n,onRemoteStream:$s,onStatusUpdate:M})).success)return lt.disabled=!1,Ge.style.display="block",{success:!0};throw new Error("Failed to rejoin room")}catch(i){return console.error("Failed to restore connection:",i),{success:!1,error:i.message}}}function Xp({isAudioMuted:n,isVideoOn:e,watchMode:t,streamUrl:i}){try{t&&!Ws()&&(js(),i&&(Fe.value=i)),n&&(ct.textContent="Unmute Mic"),e||(ut.textContent="Turn Video On")}catch(s){console.error("Failed to restore UI state:",s)}}function si(){Dp({localStream:ii(),toggleMuteBtn:ct,muteSelfBtn:Kr}),Ve()}function Hs(){xp({localStream:ii(),toggleVideoBtn:ut}),Ve()}function js(){Pp({videoContainer:Qr,watchContainer:Yr,toggleModeBtn:Ge,sharedVideo:Kt,streamUrlInput:Fe,syncStatus:Jt}),Ve()}function Zp(){const n=Fe.value.trim();Rp({roomId:$a(),url:n,sharedVideo:Kt,syncStatus:Jt}),Ve()}sl?.addEventListener("click",()=>Us.onFullscreenClick(z));rl?.addEventListener("click",()=>Us.onFullscreenClick(Ot));Kr?.addEventListener("click",()=>si());Gs?.addEventListener("click",()=>Us.onMutePartnerClick(z,Gs));document.querySelectorAll(".video-wrapper").forEach(Wp);tl();
