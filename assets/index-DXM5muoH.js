(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
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
 */const Qo=()=>{};var Zi={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw Qe(e)},Qe=function(n){return new Error("Firebase Database ("+Zs.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Xo=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},di={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let u=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(u=64)),i.push(t[d],t[h],t[u],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(er(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Xo(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const h=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new Jo;const u=r<<2|a>>4;if(i.push(u),c!==64){const p=a<<4&240|c>>2;if(i.push(p),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const tr=function(n){const e=er(n);return di.encodeByteArray(e,!0)},Vt=function(n){return tr(n).replace(/\./g,"")},On=function(n){try{return di.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(n){return nr(void 0,n)}function nr(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ea(t)||(n[t]=nr(n[t],e[t]));return n}function ea(n){return n!=="__proto__"}/**
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
 */function ta(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const na=()=>ta().__FIREBASE_DEFAULTS__,ia=()=>{if(typeof process>"u"||typeof Zi>"u")return;const n=Zi.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},sa=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&On(n[1]);return e&&JSON.parse(e)},ir=()=>{try{return Qo()||na()||ia()||sa()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ra=n=>ir()?.emulatorHosts?.[n],oa=n=>{const e=ra(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},sr=()=>ir()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function fi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function aa(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function la(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Vt(JSON.stringify(t)),Vt(JSON.stringify(o)),""].join(".")}const at={};function ca(){const n={prod:[],emulator:[]};for(const e of Object.keys(at))at[e]?n.emulator.push(e):n.prod.push(e);return n}function ua(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let es=!1;function ha(n,e){if(typeof window>"u"||typeof document>"u"||!fi(window.location.host)||at[n]===e||at[n]||es)return;at[n]=e;function t(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=ca().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,p){u.setAttribute("width","24"),u.setAttribute("id",p),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function c(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{es=!0,o()},u}function d(u,p){u.setAttribute("id",p),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=ua(i),p=t("text"),_=document.getElementById(p)||document.createElement("span"),C=t("learnmore"),N=document.getElementById(C)||document.createElement("a"),z=t("preprendIcon"),se=document.getElementById(z)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const Ce=u.element;a(Ce),d(N,C);const bn=c();l(se,z),Ce.append(se,_,N,bn),document.body.appendChild(Ce)}r?(_.innerText="Preview backend disconnected.",se.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(se.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",p)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function rr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(da())}function fa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function pa(){return Zs.NODE_ADMIN===!0}function _a(){try{return typeof indexedDB=="object"}catch{return!1}}function ma(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ga="FirebaseError";class At extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=ga,Object.setPrototypeOf(this,At.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,or.prototype.create)}}class or{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?ya(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new At(s,a,i)}}function ya(n,e){return n.replace(va,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const va=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(n){return JSON.parse(n)}function M(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=mt(On(r[0])||""),t=mt(On(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Ca=function(n){const e=ar(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Ea=function(n){const e=ar(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Ue(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function ts(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ht(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function $t(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(ns(r)&&ns(o)){if(!$t(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function ns(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wa(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)i[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const u=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const u=(s<<5|s>>>27)+c+l+d+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function cn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ia=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},un=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ke(n){return n&&n._delegate?n._delegate:n}class gt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Ee="[DEFAULT]";/**
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
 */class Sa{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Nt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ra(e))try{this.getOrInitializeService({instanceIdentifier:Ee})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ee){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ee){return this.instances.has(e)}getOptions(e=Ee){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ta(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ee){return this.component?this.component.multipleInstances?e:Ee:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ta(n){return n===Ee?void 0:n}function Ra(n){return n.instantiationMode==="EAGER"}/**
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
 */class ka{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Sa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));const Na={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Aa=T.INFO,Da={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},Pa=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Da[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class lr{constructor(e){this.name=e,this._logLevel=Aa,this._logHandler=Pa,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in T))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Na[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...e),this._logHandler(this,T.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...e),this._logHandler(this,T.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,T.INFO,...e),this._logHandler(this,T.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,T.WARN,...e),this._logHandler(this,T.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...e),this._logHandler(this,T.ERROR,...e)}}const xa=(n,e)=>e.some(t=>n instanceof t);let is,ss;function Ma(){return is||(is=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Oa(){return ss||(ss=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cr=new WeakMap,Ln=new WeakMap,ur=new WeakMap,In=new WeakMap,pi=new WeakMap;function La(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(fe(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&cr.set(t,n)}).catch(()=>{}),pi.set(e,n),e}function Fa(n){if(Ln.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ln.set(n,e)}let Fn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ln.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ur.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return fe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ba(n){Fn=n(Fn)}function Ua(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Sn(this),e,...t);return ur.set(i,e.sort?e.sort():[e]),fe(i)}:Oa().includes(n)?function(...e){return n.apply(Sn(this),e),fe(cr.get(this))}:function(...e){return fe(n.apply(Sn(this),e))}}function Wa(n){return typeof n=="function"?Ua(n):(n instanceof IDBTransaction&&Fa(n),xa(n,Ma())?new Proxy(n,Fn):n)}function fe(n){if(n instanceof IDBRequest)return La(n);if(In.has(n))return In.get(n);const e=Wa(n);return e!==n&&(In.set(n,e),pi.set(e,n)),e}const Sn=n=>pi.get(n);function Va(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=fe(o);return i&&o.addEventListener("upgradeneeded",l=>{i(fe(o.result),l.oldVersion,l.newVersion,fe(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ha=["get","getKey","getAll","getAllKeys","count"],$a=["put","add","delete","clear"],Tn=new Map;function rs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Tn.get(e))return Tn.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=$a.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ha.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Tn.set(e,r),r}Ba(n=>({...n,get:(e,t,i)=>rs(e,t)||n.get(e,t,i),has:(e,t)=>!!rs(e,t)||n.has(e,t)}));/**
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
 */class Ga{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ya(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Ya(n){return n.getComponent()?.type==="VERSION"}const Bn="@firebase/app",os="0.14.4";/**
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
 */const ce=new lr("@firebase/app"),qa="@firebase/app-compat",za="@firebase/analytics-compat",ja="@firebase/analytics",Ka="@firebase/app-check-compat",Qa="@firebase/app-check",Xa="@firebase/auth",Ja="@firebase/auth-compat",Za="@firebase/database",el="@firebase/data-connect",tl="@firebase/database-compat",nl="@firebase/functions",il="@firebase/functions-compat",sl="@firebase/installations",rl="@firebase/installations-compat",ol="@firebase/messaging",al="@firebase/messaging-compat",ll="@firebase/performance",cl="@firebase/performance-compat",ul="@firebase/remote-config",hl="@firebase/remote-config-compat",dl="@firebase/storage",fl="@firebase/storage-compat",pl="@firebase/firestore",_l="@firebase/ai",ml="@firebase/firestore-compat",gl="firebase",yl="12.4.0";/**
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
 */const Un="[DEFAULT]",vl={[Bn]:"fire-core",[qa]:"fire-core-compat",[ja]:"fire-analytics",[za]:"fire-analytics-compat",[Qa]:"fire-app-check",[Ka]:"fire-app-check-compat",[Xa]:"fire-auth",[Ja]:"fire-auth-compat",[Za]:"fire-rtdb",[el]:"fire-data-connect",[tl]:"fire-rtdb-compat",[nl]:"fire-fn",[il]:"fire-fn-compat",[sl]:"fire-iid",[rl]:"fire-iid-compat",[ol]:"fire-fcm",[al]:"fire-fcm-compat",[ll]:"fire-perf",[cl]:"fire-perf-compat",[ul]:"fire-rc",[hl]:"fire-rc-compat",[dl]:"fire-gcs",[fl]:"fire-gcs-compat",[pl]:"fire-fst",[ml]:"fire-fst-compat",[_l]:"fire-vertex","fire-js":"fire-js",[gl]:"fire-js-all"};/**
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
 */const Gt=new Map,Cl=new Map,Wn=new Map;function as(n,e){try{n.container.addComponent(e)}catch(t){ce.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Yt(n){const e=n.name;if(Wn.has(e))return ce.debug(`There were multiple attempts to register component ${e}.`),!1;Wn.set(e,n);for(const t of Gt.values())as(t,n);for(const t of Cl.values())as(t,n);return!0}function El(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function wl(n){return n==null?!1:n.settings!==void 0}/**
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
 */const bl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pe=new or("app","Firebase",bl);/**
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
 */class Il{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pe.create("app-deleted",{appName:this._name})}}/**
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
 */const Sl=yl;function hr(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Un,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw pe.create("bad-app-name",{appName:String(s)});if(t||(t=sr()),!t)throw pe.create("no-options");const r=Gt.get(s);if(r){if($t(t,r.options)&&$t(i,r.config))return r;throw pe.create("duplicate-app",{appName:s})}const o=new ka(s);for(const l of Wn.values())o.addComponent(l);const a=new Il(t,i,o);return Gt.set(s,a),a}function Tl(n=Un){const e=Gt.get(n);if(!e&&n===Un&&sr())return hr();if(!e)throw pe.create("no-app",{appName:n});return e}function Le(n,e,t){let i=vl[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ce.warn(o.join(" "));return}Yt(new gt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Rl="firebase-heartbeat-database",kl=1,yt="firebase-heartbeat-store";let Rn=null;function dr(){return Rn||(Rn=Va(Rl,kl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(yt)}catch(t){console.warn(t)}}}}).catch(n=>{throw pe.create("idb-open",{originalErrorMessage:n.message})})),Rn}async function Nl(n){try{const t=(await dr()).transaction(yt),i=await t.objectStore(yt).get(fr(n));return await t.done,i}catch(e){if(e instanceof At)ce.warn(e.message);else{const t=pe.create("idb-get",{originalErrorMessage:e?.message});ce.warn(t.message)}}}async function ls(n,e){try{const i=(await dr()).transaction(yt,"readwrite");await i.objectStore(yt).put(e,fr(n)),await i.done}catch(t){if(t instanceof At)ce.warn(t.message);else{const i=pe.create("idb-set",{originalErrorMessage:t?.message});ce.warn(i.message)}}}function fr(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Al=1024,Dl=30;class Pl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ml(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=cs();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Dl){const s=Ol(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ce.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=cs(),{heartbeatsToSend:t,unsentEntries:i}=xl(this._heartbeatsCache.heartbeats),s=Vt(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ce.warn(e),""}}}function cs(){return new Date().toISOString().substring(0,10)}function xl(n,e=Al){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),us(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),us(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Ml{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _a()?ma().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Nl(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ls(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ls(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function us(n){return Vt(JSON.stringify({version:2,heartbeats:n})).length}function Ol(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Ll(n){Yt(new gt("platform-logger",e=>new Ga(e),"PRIVATE")),Yt(new gt("heartbeat",e=>new Pl(e),"PRIVATE")),Le(Bn,os,n),Le(Bn,os,"esm2020"),Le("fire-js","")}Ll("");var Fl="firebase",Bl="12.4.0";/**
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
 */Le(Fl,Bl,"app");var hs={};const ds="@firebase/database",fs="1.1.0";/**
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
 */let pr="";function Ul(n){pr=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),M(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:mt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vl{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ne(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _r=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Wl(e)}}catch{}return new Vl},Ie=_r("localStorage"),Hl=_r("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe=new lr("@firebase/database"),$l=(function(){let n=1;return function(){return n++}})(),mr=function(n){const e=Ia(n),t=new ba;t.update(e);const i=t.digest();return di.encodeByteArray(i)},Dt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Dt.apply(null,i):typeof i=="object"?e+=M(i):e+=i,e+=" "}return e};let lt=null,ps=!0;const Gl=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Fe.logLevel=T.VERBOSE,lt=Fe.log.bind(Fe)},B=function(...n){if(ps===!0&&(ps=!1,lt===null&&Hl.get("logging_enabled")===!0&&Gl()),lt){const e=Dt.apply(null,n);lt(e)}},Pt=function(n){return function(...e){B(n,...e)}},Vn=function(...n){const e="FIREBASE INTERNAL ERROR: "+Dt(...n);Fe.error(e)},ue=function(...n){const e=`FIREBASE FATAL ERROR: ${Dt(...n)}`;throw Fe.error(e),new Error(e)},V=function(...n){const e="FIREBASE WARNING: "+Dt(...n);Fe.warn(e)},Yl=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&V("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},_i=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},ql=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},We="[MIN_NAME]",Se="[MAX_NAME]",Ne=function(n,e){if(n===e)return 0;if(n===We||e===Se)return-1;if(e===We||n===Se)return 1;{const t=_s(n),i=_s(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},zl=function(n,e){return n===e?0:n<e?-1:1},tt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+M(e))},mi=function(n){if(typeof n!="object"||n===null)return M(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=M(e[i]),t+=":",t+=mi(n[e[i]]);return t+="}",t},gr=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function U(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const yr=function(n){f(!_i(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let u=parseInt(d.substr(l,8),2).toString(16);u.length===1&&(u="0"+u),h=h+u}return h.toLowerCase()},jl=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Kl=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Ql(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Xl=new RegExp("^-?(0*)\\d{1,10}$"),Jl=-2147483648,Zl=2147483647,_s=function(n){if(Xl.test(n)){const e=Number(n);if(e>=Jl&&e<=Zl)return e}return null},Xe=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw V("Exception was thrown by user callback.",t),e},Math.floor(0))}},ec=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ct=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class tc{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,wl(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){V(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',V(e)}}class Wt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Wt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gi="5",vr="v",Cr="s",Er="r",wr="f",br=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Ir="ls",Sr="p",Hn="ac",Tr="websocket",Rr="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ie.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ie.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ic(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Nr(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===Tr)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Rr)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ic(n)&&(t.ns=n.namespace);const s=[];return U(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(){this.counters_={}}incrementCounter(e,t=1){ne(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Zo(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kn={},Nn={};function yi(n){const e=n.toString();return kn[e]||(kn[e]=new sc),kn[e]}function rc(n,e){const t=n.toString();return Nn[t]||(Nn[t]=e()),Nn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Xe(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms="start",ac="close",lc="pLPCommand",cc="pRTLPCB",Ar="id",Dr="pw",Pr="ser",uc="cb",hc="seg",dc="ts",fc="d",pc="dframe",xr=1870,Mr=30,_c=xr-Mr,mc=25e3,gc=3e4;class xe{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Pt(e),this.stats_=yi(t),this.urlFn=l=>(this.appCheckToken&&(l[Hn]=this.appCheckToken),Nr(t,Rr,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new oc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(gc)),ql(()=>{if(this.isClosed_)return;this.scriptTagHolder=new vi((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ms)this.id=a,this.password=l;else if(o===ac)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[ms]="t",i[Pr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[uc]=this.scriptTagHolder.uniqueCallbackIdentifier),i[vr]=gi,this.transportSessionId&&(i[Cr]=this.transportSessionId),this.lastSessionId&&(i[Ir]=this.lastSessionId),this.applicationId&&(i[Sr]=this.applicationId),this.appCheckToken&&(i[Hn]=this.appCheckToken),typeof location<"u"&&location.hostname&&br.test(location.hostname)&&(i[Er]=wr);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){xe.forceAllow_=!0}static forceDisallow(){xe.forceDisallow_=!0}static isAvailable(){return xe.forceAllow_?!0:!xe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!jl()&&!Kl()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=tr(t),s=gr(i,_c);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[pc]="t",i[Ar]=e,i[Dr]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=M(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class vi{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=$l(),window[lc+this.uniqueCallbackIdentifier]=e,window[cc+this.uniqueCallbackIdentifier]=t,this.myIFrame=vi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ar]=this.myID,e[Dr]=this.myPW,e[Pr]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Mr+i.length<=xr;){const o=this.pendingSegs.shift();i=i+"&"+hc+s+"="+o.seg+"&"+dc+s+"="+o.ts+"&"+fc+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(mc)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc=16384,vc=45e3;let qt=null;typeof MozWebSocket<"u"?qt=MozWebSocket:typeof WebSocket<"u"&&(qt=WebSocket);class Q{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Pt(this.connId),this.stats_=yi(t),this.connURL=Q.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[vr]=gi,typeof location<"u"&&location.hostname&&br.test(location.hostname)&&(o[Er]=wr),t&&(o[Cr]=t),i&&(o[Ir]=i),s&&(o[Hn]=s),r&&(o[Sr]=r),Nr(e,Tr,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ie.set("previous_websocket_failure",!0);try{let i;pa(),this.mySock=new qt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Q.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&qt!==null&&!Q.forceDisallow_}static previouslyFailed(){return Ie.isInMemoryStorage||Ie.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ie.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=mt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=gr(t,yc);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(vc))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Q.responsesRequiredToBeHealthy=2;Q.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{static get ALL_TRANSPORTS(){return[xe,Q]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Q&&Q.isAvailable();let i=t&&!Q.previouslyFailed();if(e.webSocketOnly&&(t||V("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Q];else{const s=this.transports_=[];for(const r of vt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);vt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}vt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc=6e4,Ec=5e3,wc=10*1024,bc=100*1024,An="t",gs="d",Ic="s",ys="r",Sc="e",vs="o",Cs="a",Es="n",ws="p",Tc="h";class Rc{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Pt("c:"+this.id+":"),this.transportManager_=new vt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ct(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>bc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>wc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(An in e){const t=e[An];t===Cs?this.upgradeIfSecondaryHealthy_():t===ys?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===vs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=tt("t",e),i=tt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ws,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Cs,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Es,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=tt("t",e),i=tt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=tt(An,e);if(gs in e){const i=e[gs];if(t===Tc){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Es){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ic?this.onConnectionShutdown_(i):t===ys?this.onReset_(i):t===Sc?Vn("Server Error: "+i):t===vs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Vn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),gi!==i&&V("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),ct(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Cc))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ct(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Ec))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ws,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ie.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends Lr{static getInstance(){return new zt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!rr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs=32,Is=768;class b{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new b("")}function g(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function ge(n){return n.pieces_.length-n.pieceNum_}function R(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new b(n.pieces_,e)}function Ci(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function kc(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ct(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Fr(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new b(e,0)}function A(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof b)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new b(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function W(n,e){const t=g(n),i=g(e);if(t===null)return e;if(t===i)return W(R(n),R(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Nc(n,e){const t=Ct(n,0),i=Ct(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Ne(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Ei(n,e){if(ge(n)!==ge(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function j(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(ge(n)>ge(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Ac{constructor(e,t){this.errorPrefix_=t,this.parts_=Ct(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=un(this.parts_[i]);Br(this)}}function Dc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=un(e),Br(n)}function Pc(n){const e=n.parts_.pop();n.byteLength_-=un(e),n.parts_.length>0&&(n.byteLength_-=1)}function Br(n){if(n.byteLength_>Is)throw new Error(n.errorPrefix_+"has a key path longer than "+Is+" bytes ("+n.byteLength_+").");if(n.parts_.length>bs)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+bs+") or object contains a cycle "+we(n))}function we(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi extends Lr{static getInstance(){return new wi}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt=1e3,xc=300*1e3,Ss=30*1e3,Mc=1.3,Oc=3e4,Lc="server_kill",Ts=3;class ae extends Or{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ae.nextPersistentConnectionId_++,this.log_=Pt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=nt,this.maxReconnectDelay_=xc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");wi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&zt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(M(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Nt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ae.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ne(e,"w")){const i=Ue(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();V(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ea(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ss)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Ca(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+M(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Vn("Unrecognized action received from server: "+M(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=nt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=nt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Oc&&(this.reconnectDelay_=nt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Mc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ae.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,u]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=u&&u.token,a=new Rc(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{V(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Lc)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&V(h),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ts(this.interruptReasons_)&&(this.reconnectDelay_=nt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>mi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new b(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){B("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ts&&(this.reconnectDelay_=Ss,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){B("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ts&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+pr.replace(/\./g,"-")]=1,rr()?e["framework.cordova"]=1:fa()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=zt.getInstance().currentlyOnline();return ts(this.interruptReasons_)&&e}}ae.nextPersistentConnectionId_=0;ae.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new y(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new y(We,e),s=new y(We,t);return this.compare(i,s)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bt;class Ur extends hn{static get __EMPTY_NODE(){return Bt}static set __EMPTY_NODE(e){Bt=e}compare(e,t){return Ne(e.name,t.name)}isDefinedOn(e){throw Qe("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(Se,Bt)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Bt)}toString(){return".key"}}const Be=new Ur;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class F{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??F.RED,this.left=s??H.EMPTY_NODE,this.right=r??H.EMPTY_NODE}copy(e,t,i,s,r){return new F(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return H.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return H.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,F.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,F.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}F.RED=!0;F.BLACK=!1;class Fc{copy(e,t,i,s,r){return this}insert(e,t,i){return new F(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class H{constructor(e,t=H.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new H(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,F.BLACK,null,null))}remove(e){return new H(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,F.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ut(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ut(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ut(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ut(this.root_,null,this.comparator_,!0,e)}}H.EMPTY_NODE=new Fc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(n,e){return Ne(n.name,e.name)}function bi(n,e){return Ne(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $n;function Uc(n){$n=n}const Wr=function(n){return typeof n=="number"?"number:"+yr(n):"string:"+n},Vr=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ne(e,".sv"),"Priority must be a string or number.")}else f(n===$n||n.isEmpty(),"priority of unexpected type.");f(n===$n||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rs;class L{static set __childrenNodeConstructor(e){Rs=e}static get __childrenNodeConstructor(){return Rs}constructor(e,t=L.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Vr(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new L(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:g(e)===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:L.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=g(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||ge(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,L.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Wr(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=yr(this.value_):e+=this.value_,this.lazyHash_=mr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===L.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof L.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=L.VALUE_TYPE_ORDER.indexOf(t),r=L.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}L.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hr,$r;function Wc(n){Hr=n}function Vc(n){$r=n}class Hc extends hn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Ne(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Se,new L("[PRIORITY-POST]",$r))}makePost(e,t){const i=Hr(e);return new y(t,new L("[PRIORITY-POST]",i))}toString(){return".priority"}}const D=new Hc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=Math.log(2);class Gc{constructor(e){const t=r=>parseInt(Math.log(r)/$c,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const jt=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let h,u;if(d===0)return null;if(d===1)return h=n[l],u=t?t(h):h,new F(u,h.node,F.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=s(l,p),C=s(p+1,c);return h=n[p],u=t?t(h):h,new F(u,h.node,F.BLACK,_,C)}},r=function(l){let c=null,d=null,h=n.length;const u=function(_,C){const N=h-_,z=h;h-=_;const se=s(N+1,z),Ce=n[N],bn=t?t(Ce):Ce;p(new F(bn,Ce.node,C,null,se))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const C=l.nextBitIsOne(),N=Math.pow(2,l.count-(_+1));C?u(N,F.BLACK):(u(N,F.BLACK),u(N,F.RED))}return d},o=new Gc(n.length),a=r(o);return new H(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn;const Pe={};class re{static get Default(){return f(Pe&&D,"ChildrenNode.ts has not been loaded"),Dn=Dn||new re({".priority":Pe},{".priority":D}),Dn}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Ue(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof H?t:null}hasIndex(e){return ne(this.indexSet_,e.toString())}addIndex(e,t){f(e!==Be,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=jt(i,e.getCompare()):a=Pe;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new re(d,c)}addToIndexes(e,t){const i=Ht(this.indexes_,(s,r)=>{const o=Ue(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===Pe)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(y.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),jt(a,o.getCompare())}else return Pe;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new y(e.name,a))),l.insert(e,e.node)}});return new re(i,this.indexSet_)}removeFromIndexes(e,t){const i=Ht(this.indexes_,s=>{if(s===Pe)return s;{const r=t.get(e.name);return r?s.remove(new y(e.name,r)):s}});return new re(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let it;class m{static get EMPTY_NODE(){return it||(it=new m(new H(bi),null,re.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Vr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||it}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?it:t}}getChild(e){const t=g(e);return t===null?this:this.getImmediateChild(t).getChild(R(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new y(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?it:this.priorityNode_;return new m(s,o,r)}}updateChild(e,t){const i=g(e);if(i===null)return t;{f(g(e)!==".priority"||ge(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(R(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(D,(o,a)=>{t[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Wr(this.getPriority().val())+":"),this.forEachChild(D,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":mr(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===xt?-1:0}withIndex(e){if(e===Be||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Be||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(D),s=t.getIterator(D);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Be?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Yc extends m{constructor(){super(new H(bi),m.EMPTY_NODE,re.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const xt=new Yc;Object.defineProperties(y,{MIN:{value:new y(We,m.EMPTY_NODE)},MAX:{value:new y(Se,xt)}});Ur.__EMPTY_NODE=m.EMPTY_NODE;L.__childrenNodeConstructor=m;Uc(xt);Vc(xt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc=!0;function x(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new L(t,x(e))}if(!(n instanceof Array)&&qc){const t=[];let i=!1;if(U(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=x(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new y(o,l)))}}),t.length===0)return m.EMPTY_NODE;const r=jt(t,Bc,o=>o.name,bi);if(i){const o=jt(t,D.getCompare());return new m(r,x(e),new re({".priority":o},{".priority":D}))}else return new m(r,x(e),re.Default)}else{let t=m.EMPTY_NODE;return U(n,(i,s)=>{if(ne(n,i)&&i.substring(0,1)!=="."){const r=x(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(x(e))}}Wc(x);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc extends hn{constructor(e){super(),this.indexPath_=e,f(!v(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Ne(e.name,t.name):r}makePost(e,t){const i=x(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new y(t,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,xt);return new y(Se,e)}toString(){return Ct(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc extends hn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ne(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const i=x(e);return new y(t,i)}toString(){return".value"}}const Kc=new jc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(n){return{type:"value",snapshotNode:n}}function Ve(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Et(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function wt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Qc(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Et(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ve(t,i)):o.trackChildChange(wt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(D,(s,r)=>{t.hasChild(s)||i.trackChildChange(Et(s,r))}),t.isLeafNode()||t.forEachChild(D,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(wt(s,r,o))}else i.trackChildChange(Ve(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this.indexedFilter_=new Ii(e.getIndex()),this.index_=e.getIndex(),this.startPost_=bt.getStartPost_(e),this.endPost_=bt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new y(t,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=m.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(D,(o,a)=>{r.matches(new y(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new bt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new y(t,i))||(i=m.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(u,p)=>h(p,u)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new y(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let u=s.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===t||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const p=u==null?1:o(u,l);if(d&&!i.isEmpty()&&p>=0)return r?.trackChildChange(wt(t,i,h)),a.updateImmediateChild(t,i);{r?.trackChildChange(Et(t,h));const C=a.updateImmediateChild(t,m.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(Ve(u.name,u.node)),C.updateImmediateChild(u.name,u.node)):C}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Et(c.name,c.node)),r.trackChildChange(Ve(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=D}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:We}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Se}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===D}copy(){const e=new Si;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Jc(n){return n.loadsAllData()?new Ii(n.getIndex()):n.hasLimit()?new Xc(n):new bt(n)}function ks(n){const e={};if(n.isDefault())return e;let t;if(n.index_===D?t="$priority":n.index_===Kc?t="$value":n.index_===Be?t="$key":(f(n.index_ instanceof zc,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=M(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=M(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+M(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=M(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+M(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ns(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==D&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Or{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Pt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Kt.getListenId_(e,i),a={};this.listens_[o]=a;const l=ks(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),Ue(this.listens_,o)===a){let u;c?c===401?u="permission_denied":u="rest_error:"+c:u="ok",s(u,null)}})}unlisten(e,t){const i=Kt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=ks(e._queryParams),i=e._path.toString(),s=new Nt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+wa(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=mt(a.responseText)}catch{V("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&V("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(){return{value:null,children:new Map}}function Yr(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=g(e);n.children.has(i)||n.children.set(i,Qt());const s=n.children.get(i);e=R(e),Yr(s,e,t)}}function Gn(n,e,t){n.value!==null?t(e,n.value):eu(n,(i,s)=>{const r=new b(e.toString()+"/"+i);Gn(s,r,t)})}function eu(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const As=10*1e3,nu=30*1e3,iu=300*1e3;class su{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new tu(e);const i=As+(nu-As)*Math.random();ct(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;U(e,(s,r)=>{r>0&&ne(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),ct(this.reportStats_.bind(this),Math.floor(Math.random()*2*iu))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(J||(J={}));function Ti(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ri(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ki(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=J.ACK_USER_WRITE,this.source=Ti()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new b(e));return new Xt(E(),t,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Xt(R(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t){this.source=e,this.path=t,this.type=J.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new It(this.source,E()):new It(this.source,R(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=J.OVERWRITE}operationForChild(e){return v(this.path)?new Te(this.source,E(),this.snap.getImmediateChild(e)):new Te(this.source,R(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=J.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new b(e));return t.isEmpty()?null:t.value?new Te(this.source,E(),t.value):new He(this.source,E(),t)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new He(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=g(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function ou(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Qc(o.childName,o.snapshotNode))}),st(n,s,"child_removed",e,i,t),st(n,s,"child_added",e,i,t),st(n,s,"child_moved",r,i,t),st(n,s,"child_changed",e,i,t),st(n,s,"value",e,i,t),s}function st(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>lu(n,a,l)),o.forEach(a=>{const l=au(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function au(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function lu(n,e,t){if(e.childName==null||t.childName==null)throw Qe("Should only compare child_ events.");const i=new y(e.childName,e.snapshotNode),s=new y(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,e){return{eventCache:n,serverCache:e}}function ut(n,e,t,i){return dn(new ye(e,t,i),n.serverCache)}function qr(n,e,t,i){return dn(n.eventCache,new ye(e,t,i))}function Jt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Re(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pn;const cu=()=>(Pn||(Pn=new H(zl)),Pn);class S{static fromObject(e){let t=new S(null);return U(e,(i,s)=>{t=t.set(new b(i),s)}),t}constructor(e,t=cu()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const i=g(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(R(e),t);return r!=null?{path:A(new b(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=g(e),i=this.children.get(t);return i!==null?i.subtree(R(e)):new S(null)}}set(e,t){if(v(e))return new S(t,this.children);{const i=g(e),r=(this.children.get(i)||new S(null)).set(R(e),t),o=this.children.insert(i,r);return new S(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new S(null):new S(null,this.children);{const t=g(e),i=this.children.get(t);if(i){const s=i.remove(R(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new S(null):new S(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=g(e),i=this.children.get(t);return i?i.get(R(e)):null}}setTree(e,t){if(v(e))return t;{const i=g(e),r=(this.children.get(i)||new S(null)).setTree(R(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new S(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(A(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(v(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(R(e),A(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,i){if(v(e))return this;{this.value&&i(t,this.value);const s=g(e),r=this.children.get(s);return r?r.foreachOnPath_(R(e),A(t,s),i):new S(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(A(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.writeTree_=e}static empty(){return new ee(new S(null))}}function ht(n,e,t){if(v(e))return new ee(new S(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=W(s,e);return r=r.updateChild(o,t),new ee(n.writeTree_.set(s,r))}else{const s=new S(t),r=n.writeTree_.setTree(e,s);return new ee(r)}}}function Yn(n,e,t){let i=n;return U(t,(s,r)=>{i=ht(i,A(e,s),r)}),i}function Ds(n,e){if(v(e))return ee.empty();{const t=n.writeTree_.setTree(e,new S(null));return new ee(t)}}function qn(n,e){return Ae(n,e)!=null}function Ae(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(W(t.path,e)):null}function Ps(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(D,(i,s)=>{e.push(new y(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new y(i,s.value))}),e}function _e(n,e){if(v(e))return n;{const t=Ae(n,e);return t!=null?new ee(new S(t)):new ee(n.writeTree_.subtree(e))}}function zn(n){return n.writeTree_.isEmpty()}function $e(n,e){return zr(E(),n.writeTree_,e)}function zr(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=zr(A(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(A(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(n,e){return Xr(e,n)}function uu(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=ht(n.visibleWrites,e,t)),n.lastWriteId=i}function hu(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Yn(n.visibleWrites,e,t),n.lastWriteId=i}function du(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function fu(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&pu(a,i.path)?s=!1:j(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return _u(n),!0;if(i.snap)n.visibleWrites=Ds(n.visibleWrites,i.path);else{const a=i.children;U(a,l=>{n.visibleWrites=Ds(n.visibleWrites,A(i.path,l))})}return!0}else return!1}function pu(n,e){if(n.snap)return j(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&j(A(n.path,t),e))return!0;return!1}function _u(n){n.visibleWrites=jr(n.allWrites,mu,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function mu(n){return n.visible}function jr(n,e,t){let i=ee.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)j(t,o)?(a=W(t,o),i=ht(i,a,r.snap)):j(o,t)&&(a=W(o,t),i=ht(i,E(),r.snap.getChild(a)));else if(r.children){if(j(t,o))a=W(t,o),i=Yn(i,a,r.children);else if(j(o,t))if(a=W(o,t),v(a))i=Yn(i,E(),r.children);else{const l=Ue(r.children,g(a));if(l){const c=l.getChild(R(a));i=ht(i,E(),c)}}}else throw Qe("WriteRecord should have .snap or .children")}}return i}function Kr(n,e,t,i,s){if(!i&&!s){const r=Ae(n.visibleWrites,e);if(r!=null)return r;{const o=_e(n.visibleWrites,e);if(zn(o))return t;if(t==null&&!qn(o,E()))return null;{const a=t||m.EMPTY_NODE;return $e(o,a)}}}else{const r=_e(n.visibleWrites,e);if(!s&&zn(r))return t;if(!s&&t==null&&!qn(r,E()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(j(c.path,e)||j(e,c.path))},a=jr(n.allWrites,o,e),l=t||m.EMPTY_NODE;return $e(a,l)}}}function gu(n,e,t){let i=m.EMPTY_NODE;const s=Ae(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(D,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=_e(n.visibleWrites,e);return t.forEachChild(D,(o,a)=>{const l=$e(_e(r,new b(o)),a);i=i.updateImmediateChild(o,l)}),Ps(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=_e(n.visibleWrites,e);return Ps(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function yu(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(qn(n.visibleWrites,r))return null;{const o=_e(n.visibleWrites,r);return zn(o)?s.getChild(t):$e(o,s.getChild(t))}}function vu(n,e,t,i){const s=A(e,t),r=Ae(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=_e(n.visibleWrites,s);return $e(o,i.getNode().getImmediateChild(t))}else return null}function Cu(n,e){return Ae(n.visibleWrites,e)}function Eu(n,e,t,i,s,r,o){let a;const l=_e(n.visibleWrites,e),c=Ae(l,E());if(c!=null)a=c;else if(t!=null)a=$e(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=u.getNext();for(;p&&d.length<s;)h(p,i)!==0&&d.push(p),p=u.getNext();return d}else return[]}function wu(){return{visibleWrites:ee.empty(),allWrites:[],lastWriteId:-1}}function Zt(n,e,t,i){return Kr(n.writeTree,n.treePath,e,t,i)}function Ni(n,e){return gu(n.writeTree,n.treePath,e)}function xs(n,e,t,i){return yu(n.writeTree,n.treePath,e,t,i)}function en(n,e){return Cu(n.writeTree,A(n.treePath,e))}function bu(n,e,t,i,s,r){return Eu(n.writeTree,n.treePath,e,t,i,s,r)}function Ai(n,e,t){return vu(n.writeTree,n.treePath,e,t)}function Qr(n,e){return Xr(A(n.treePath,e),n.writeTree)}function Xr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,wt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Et(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Ve(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,wt(i,e.snapshotNode,s.oldSnap));else throw Qe("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Jr=new Su;class Di{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ye(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ai(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Re(this.viewCache_),r=bu(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tu(n){return{filter:n}}function Ru(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function ku(n,e,t,i,s){const r=new Iu;let o,a;if(t.type===J.OVERWRITE){const c=t;c.source.fromUser?o=jn(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=tn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===J.MERGE){const c=t;c.source.fromUser?o=Au(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Kn(n,e,c.path,c.children,i,s,a,r))}else if(t.type===J.ACK_USER_WRITE){const c=t;c.revert?o=xu(n,e,c.path,i,s,r):o=Du(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===J.LISTEN_COMPLETE)o=Pu(n,e,t.path,i,r);else throw Qe("Unknown operation type: "+t.type);const l=r.getChanges();return Nu(e,o,l),{viewCache:o,changes:l}}function Nu(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Jt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Gr(Jt(e)))}}function Zr(n,e,t,i,s,r){const o=e.eventCache;if(en(i,t)!=null)return e;{let a,l;if(v(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Re(e),d=c instanceof m?c:m.EMPTY_NODE,h=Ni(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Zt(i,Re(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(t);if(c===".priority"){f(ge(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=xs(i,t,d,l);h!=null?a=n.filter.updatePriority(d,h):a=o.getNode()}else{const d=R(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const u=xs(i,t,o.getNode(),l);u!=null?h=o.getNode().getImmediateChild(c).updateChild(d,u):h=o.getNode().getImmediateChild(c)}else h=Ai(i,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,d,s,r):a=o.getNode()}}return ut(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function tn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=g(t);if(!l.isCompleteForPath(t)&&ge(t)>1)return e;const _=R(t),N=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=d.updatePriority(l.getNode(),N):c=d.updateChild(l.getNode(),p,N,_,Jr,null)}const h=qr(e,c,l.isFullyInitialized()||v(t),d.filtersNodes()),u=new Di(s,h,r);return Zr(n,h,t,s,u,a)}function jn(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new Di(s,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=ut(e,c,!0,n.filter.filtersNodes());else{const h=g(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=ut(e,c,a.isFullyInitialized(),a.isFiltered());else{const u=R(t),p=a.getNode().getImmediateChild(h);let _;if(v(u))_=i;else{const C=d.getCompleteChild(h);C!=null?Ci(u)===".priority"&&C.getChild(Fr(u)).isEmpty()?_=C:_=C.updateChild(u,i):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const C=n.filter.updateChild(a.getNode(),h,_,u,d,o);l=ut(e,C,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Ms(n,e){return n.eventCache.isCompleteForChild(e)}function Au(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=A(t,l);Ms(e,g(d))&&(a=jn(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=A(t,l);Ms(e,g(d))||(a=jn(n,a,d,c,s,r,o))}),a}function Os(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Kn(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=i:c=new S(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,u)=>{if(d.hasChild(h)){const p=e.serverCache.getNode().getImmediateChild(h),_=Os(n,p,u);l=tn(n,l,new b(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,u)=>{const p=!e.serverCache.isCompleteForChild(h)&&u.value===null;if(!d.hasChild(h)&&!p){const _=e.serverCache.getNode().getImmediateChild(h),C=Os(n,_,u);l=tn(n,l,new b(h),C,s,r,o,a)}}),l}function Du(n,e,t,i,s,r,o){if(en(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return tn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(v(t)){let c=new S(null);return l.getNode().forEachChild(Be,(d,h)=>{c=c.set(new b(d),h)}),Kn(n,e,t,c,s,r,a,o)}else return e}else{let c=new S(null);return i.foreach((d,h)=>{const u=A(t,d);l.isCompleteForPath(u)&&(c=c.set(d,l.getNode().getChild(u)))}),Kn(n,e,t,c,s,r,a,o)}}function Pu(n,e,t,i,s){const r=e.serverCache,o=qr(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return Zr(n,o,t,i,Jr,s)}function xu(n,e,t,i,s,r){let o;if(en(i,t)!=null)return e;{const a=new Di(i,e,s),l=e.eventCache.getNode();let c;if(v(t)||g(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Zt(i,Re(e));else{const h=e.serverCache.getNode();f(h instanceof m,"serverChildren would be complete if leaf node"),d=Ni(i,h)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=g(t);let h=Ai(i,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=n.filter.updateChild(l,d,h,R(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,m.EMPTY_NODE,R(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Zt(i,Re(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||en(i,E())!=null,ut(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ii(i.getIndex()),r=Jc(i);this.processor_=Tu(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new ye(l,o.isFullyInitialized(),s.filtersNodes()),h=new ye(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=dn(h,d),this.eventGenerator_=new ru(this.query_)}get query(){return this.query_}}function Ou(n){return n.viewCache_.serverCache.getNode()}function Lu(n){return Jt(n.viewCache_)}function Fu(n,e){const t=Re(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(g(e)).isEmpty())?t.getChild(e):null}function Ls(n){return n.eventRegistrations_.length===0}function Bu(n,e){n.eventRegistrations_.push(e)}function Fs(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Bs(n,e,t,i){e.type===J.MERGE&&e.source.queryId!==null&&(f(Re(n.viewCache_),"We should always have a full cache before handling merges"),f(Jt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=ku(n.processor_,s,e,t,i);return Ru(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,eo(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Uu(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(D,(r,o)=>{i.push(Ve(r,o))}),t.isFullyInitialized()&&i.push(Gr(t.getNode())),eo(n,i,t.getNode(),e)}function eo(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return ou(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;class to{constructor(){this.views=new Map}}function Wu(n){f(!nn,"__referenceConstructor has already been defined"),nn=n}function Vu(){return f(nn,"Reference.ts has not been loaded"),nn}function Hu(n){return n.views.size===0}function Pi(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Bs(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Bs(o,e,t,i));return r}}function no(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Zt(t,s?i:null),l=!1;a?l=!0:i instanceof m?(a=Ni(t,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=dn(new ye(a,l,!1),new ye(i,s,!1));return new Mu(e,c)}return o}function $u(n,e,t,i,s,r){const o=no(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Bu(o,t),Uu(o,t)}function Gu(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ve(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Fs(c,t,i)),Ls(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Fs(l,t,i)),Ls(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ve(n)&&r.push(new(Vu())(e._repo,e._path)),{removed:r,events:o}}function io(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function me(n,e){let t=null;for(const i of n.views.values())t=t||Fu(i,e);return t}function so(n,e){if(e._queryParams.loadsAllData())return pn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function ro(n,e){return so(n,e)!=null}function ve(n){return pn(n)!=null}function pn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sn;function Yu(n){f(!sn,"__referenceConstructor has already been defined"),sn=n}function qu(){return f(sn,"Reference.ts has not been loaded"),sn}let zu=1;class Us{constructor(e){this.listenProvider_=e,this.syncPointTree_=new S(null),this.pendingWriteTree_=wu(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function oo(n,e,t,i,s){return uu(n.pendingWriteTree_,e,t,i,s),s?Je(n,new Te(Ti(),e,t)):[]}function ju(n,e,t,i){hu(n.pendingWriteTree_,e,t,i);const s=S.fromObject(t);return Je(n,new He(Ti(),e,s))}function he(n,e,t=!1){const i=du(n.pendingWriteTree_,e);if(fu(n.pendingWriteTree_,e)){let r=new S(null);return i.snap!=null?r=r.set(E(),!0):U(i.children,o=>{r=r.set(new b(o),!0)}),Je(n,new Xt(i.path,r,t))}else return[]}function Mt(n,e,t){return Je(n,new Te(Ri(),e,t))}function Ku(n,e,t){const i=S.fromObject(t);return Je(n,new He(Ri(),e,i))}function Qu(n,e){return Je(n,new It(Ri(),e))}function Xu(n,e,t){const i=Mi(n,t);if(i){const s=Oi(i),r=s.path,o=s.queryId,a=W(r,e),l=new It(ki(o),a);return Li(n,r,l)}else return[]}function rn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ro(o,e))){const l=Gu(o,e,t,i);Hu(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(u=>u._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(u,p)=>ve(p));if(d&&!h){const u=n.syncPointTree_.subtree(r);if(!u.isEmpty()){const p=eh(u);for(let _=0;_<p.length;++_){const C=p[_],N=C.query,z=uo(n,C);n.listenProvider_.startListening(dt(N),St(n,N),z.hashFn,z.onComplete)}}}!h&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(dt(e),null):c.forEach(u=>{const p=n.queryToTagMap.get(_n(u));n.listenProvider_.stopListening(dt(u),p)}))}th(n,c)}return a}function ao(n,e,t,i){const s=Mi(n,i);if(s!=null){const r=Oi(s),o=r.path,a=r.queryId,l=W(o,e),c=new Te(ki(a),l,t);return Li(n,o,c)}else return[]}function Ju(n,e,t,i){const s=Mi(n,i);if(s){const r=Oi(s),o=r.path,a=r.queryId,l=W(o,e),c=S.fromObject(t),d=new He(ki(a),l,c);return Li(n,o,d)}else return[]}function Qn(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(u,p)=>{const _=W(u,s);r=r||me(p,_),o=o||ve(p)});let a=n.syncPointTree_.get(s);a?(o=o||ve(a),r=r||me(a,E())):(a=new to,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const C=me(_,E());C&&(r=r.updateImmediateChild(p,C))}));const c=ro(a,e);if(!c&&!e._queryParams.loadsAllData()){const u=_n(e);f(!n.queryToTagMap.has(u),"View does not exist, but we have a tag");const p=nh();n.queryToTagMap.set(u,p),n.tagToQueryMap.set(p,u)}const d=fn(n.pendingWriteTree_,s);let h=$u(a,e,t,d,r,l);if(!c&&!o&&!i){const u=so(a,e);h=h.concat(ih(n,e,u))}return h}function xi(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=W(o,e),c=me(a,l);if(c)return c});return Kr(s,e,r,t,!0)}function Zu(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const h=W(c,t);i=i||me(d,h)});let s=n.syncPointTree_.get(t);s?i=i||me(s,E()):(s=new to,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new ye(i,!0,!1):null,a=fn(n.pendingWriteTree_,e._path),l=no(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return Lu(l)}function Je(n,e){return lo(e,n.syncPointTree_,null,fn(n.pendingWriteTree_,E()))}function lo(n,e,t,i){if(v(n.path))return co(n,e,t,i);{const s=e.get(E());t==null&&s!=null&&(t=me(s,E()));let r=[];const o=g(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=Qr(i,o);r=r.concat(lo(a,l,c,d))}return s&&(r=r.concat(Pi(s,n,i,t))),r}}function co(n,e,t,i){const s=e.get(E());t==null&&s!=null&&(t=me(s,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Qr(i,o),d=n.operationForChild(o);d&&(r=r.concat(co(d,a,l,c)))}),s&&(r=r.concat(Pi(s,n,i,t))),r}function uo(n,e){const t=e.query,i=St(n,t);return{hashFn:()=>(Ou(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Xu(n,t._path,i):Qu(n,t._path);{const r=Ql(s,t);return rn(n,t,null,r)}}}}function St(n,e){const t=_n(e);return n.queryToTagMap.get(t)}function _n(n){return n._path.toString()+"$"+n._queryIdentifier}function Mi(n,e){return n.tagToQueryMap.get(e)}function Oi(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new b(n.substr(0,e))}}function Li(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=fn(n.pendingWriteTree_,e);return Pi(i,t,s,null)}function eh(n){return n.fold((e,t,i)=>{if(t&&ve(t))return[pn(t)];{let s=[];return t&&(s=io(t)),U(i,(r,o)=>{s=s.concat(o)}),s}})}function dt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(qu())(n._repo,n._path):n}function th(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=_n(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function nh(){return zu++}function ih(n,e,t){const i=e._path,s=St(n,e),r=uo(n,t),o=n.listenProvider_.startListening(dt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!ve(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!v(c)&&d&&ve(d))return[pn(d).query];{let u=[];return d&&(u=u.concat(io(d).map(p=>p.query))),U(h,(p,_)=>{u=u.concat(_)}),u}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(dt(d),St(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Fi(t)}node(){return this.node_}}class Bi{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Bi(this.syncTree_,t)}node(){return xi(this.syncTree_,this.path_)}}const sh=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ws=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return rh(n[".sv"],e,t);if(typeof n[".sv"]=="object")return oh(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},rh=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},oh=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},ho=function(n,e,t,i){return Ui(e,new Bi(t,n),i)},fo=function(n,e,t){return Ui(n,new Fi(e),t)};function Ui(n,e,t){const i=n.getPriority().val(),s=Ws(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ws(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new L(a,x(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new L(s))),o.forEachChild(D,(a,l)=>{const c=Ui(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Vi(n,e){let t=e instanceof b?e:new b(e),i=n,s=g(t);for(;s!==null;){const r=Ue(i.node.children,s)||{children:{},childCount:0};i=new Wi(s,i,r),t=R(t),s=g(t)}return i}function Ze(n){return n.node.value}function po(n,e){n.node.value=e,Xn(n)}function _o(n){return n.node.childCount>0}function ah(n){return Ze(n)===void 0&&!_o(n)}function mn(n,e){U(n.node.children,(t,i)=>{e(new Wi(t,n,i))})}function mo(n,e,t,i){t&&e(n),mn(n,s=>{mo(s,e,!0)})}function lh(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Ot(n){return new b(n.parent===null?n.name:Ot(n.parent)+"/"+n.name)}function Xn(n){n.parent!==null&&ch(n.parent,n.name,n)}function ch(n,e,t){const i=ah(t),s=ne(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Xn(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Xn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh=/[\[\].#$\/\u0000-\u001F\u007F]/,hh=/[\[\].#$\u0000-\u001F\u007F]/,xn=10*1024*1024,Hi=function(n){return typeof n=="string"&&n.length!==0&&!uh.test(n)},go=function(n){return typeof n=="string"&&n.length!==0&&!hh.test(n)},dh=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),go(n)},fh=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!_i(n)||n&&typeof n=="object"&&ne(n,".sv")},yo=function(n,e,t,i){i&&e===void 0||gn(cn(n,"value"),e,t)},gn=function(n,e,t){const i=t instanceof b?new Ac(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+we(i));if(typeof e=="function")throw new Error(n+"contains a function "+we(i)+" with contents = "+e.toString());if(_i(e))throw new Error(n+"contains "+e.toString()+" "+we(i));if(typeof e=="string"&&e.length>xn/3&&un(e)>xn)throw new Error(n+"contains a string greater than "+xn+" utf8 bytes "+we(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(U(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Hi(o)))throw new Error(n+" contains an invalid key ("+o+") "+we(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Dc(i,o),gn(n,a,i),Pc(i)}),s&&r)throw new Error(n+' contains ".value" child '+we(i)+" in addition to actual children.")}},ph=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Ct(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Hi(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Nc);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&j(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},_h=function(n,e,t,i){const s=cn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];U(e,(o,a)=>{const l=new b(o);if(gn(s,a,A(t,l)),Ci(l)===".priority"&&!fh(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),ph(s,r)},vo=function(n,e,t,i){if(!go(t))throw new Error(cn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},mh=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),vo(n,e,t)},$i=function(n,e){if(g(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},gh=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Hi(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!dh(t))throw new Error(cn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function yn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Ei(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function Co(n,e,t){yn(n,t),Eo(n,i=>Ei(i,e))}function K(n,e,t){yn(n,t),Eo(n,i=>j(i,e)||j(e,i))}function Eo(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(vh(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function vh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();lt&&B("event: "+t.toString()),Xe(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch="repo_interrupt",Eh=25;class wh{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new yh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Qt(),this.transactionQueueTree_=new Wi,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function bh(n,e,t){if(n.stats_=yi(n.repoInfo_),n.forceRestClient_||ec())n.server_=new Kt(n.repoInfo_,(i,s,r,o)=>{Vs(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Hs(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ae(n.repoInfo_,e,(i,s,r,o)=>{Vs(n,i,s,r,o)},i=>{Hs(n,i)},i=>{Ih(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=rc(n.repoInfo_,()=>new su(n.stats_,n.server_)),n.infoData_=new Zc,n.infoSyncTree_=new Us({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Mt(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Gi(n,"connected",!1),n.serverSyncTree_=new Us({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);K(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function wo(n){const t=n.infoData_.getNode(new b(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function vn(n){return sh({timestamp:wo(n)})}function Vs(n,e,t,i,s){n.dataUpdateCount++;const r=new b(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Ht(t,c=>x(c));o=Ju(n.serverSyncTree_,r,l,s)}else{const l=x(t);o=ao(n.serverSyncTree_,r,l,s)}else if(i){const l=Ht(t,c=>x(c));o=Ku(n.serverSyncTree_,r,l)}else{const l=x(t);o=Mt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Ge(n,r)),K(n.eventQueue_,a,o)}function Hs(n,e){Gi(n,"connected",e),e===!1&&kh(n)}function Ih(n,e){U(e,(t,i)=>{Gi(n,t,i)})}function Gi(n,e,t){const i=new b("/.info/"+e),s=x(t);n.infoData_.updateSnapshot(i,s);const r=Mt(n.infoSyncTree_,i,s);K(n.eventQueue_,i,r)}function Yi(n){return n.nextWriteId_++}function Sh(n,e,t){const i=Zu(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=x(s).withIndex(e._queryParams.getIndex());Qn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Mt(n.serverSyncTree_,e._path,r);else{const a=St(n.serverSyncTree_,e);o=ao(n.serverSyncTree_,e._path,r,a)}return K(n.eventQueue_,e._path,o),rn(n.serverSyncTree_,e,t,null,!0),r},s=>(Lt(n,"get for query "+M(e)+" failed: "+s),Promise.reject(new Error(s))))}function Th(n,e,t,i,s){Lt(n,"set",{path:e.toString(),value:t,priority:i});const r=vn(n),o=x(t,i),a=xi(n.serverSyncTree_,e),l=fo(o,a,r),c=Yi(n),d=oo(n.serverSyncTree_,e,l,c,!0);yn(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(u,p)=>{const _=u==="ok";_||V("set at "+e+" failed: "+u);const C=he(n.serverSyncTree_,c,!_);K(n.eventQueue_,e,C),Jn(n,s,u,p)});const h=zi(n,e);Ge(n,h),K(n.eventQueue_,h,[])}function Rh(n,e,t,i){Lt(n,"update",{path:e.toString(),value:t});let s=!0;const r=vn(n),o={};if(U(t,(a,l)=>{s=!1,o[a]=ho(A(e,a),x(l),n.serverSyncTree_,r)}),s)B("update() called with empty data.  Don't do anything."),Jn(n,i,"ok",void 0);else{const a=Yi(n),l=ju(n.serverSyncTree_,e,o,a);yn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const h=c==="ok";h||V("update at "+e+" failed: "+c);const u=he(n.serverSyncTree_,a,!h),p=u.length>0?Ge(n,e):e;K(n.eventQueue_,p,u),Jn(n,i,c,d)}),U(t,c=>{const d=zi(n,A(e,c));Ge(n,d)}),K(n.eventQueue_,e,[])}}function kh(n){Lt(n,"onDisconnectEvents");const e=vn(n),t=Qt();Gn(n.onDisconnect_,E(),(s,r)=>{const o=ho(s,r,n.serverSyncTree_,e);Yr(t,s,o)});let i=[];Gn(t,E(),(s,r)=>{i=i.concat(Mt(n.serverSyncTree_,s,r));const o=zi(n,s);Ge(n,o)}),n.onDisconnect_=Qt(),K(n.eventQueue_,E(),i)}function Nh(n,e,t){let i;g(e._path)===".info"?i=Qn(n.infoSyncTree_,e,t):i=Qn(n.serverSyncTree_,e,t),Co(n.eventQueue_,e._path,i)}function bo(n,e,t){let i;g(e._path)===".info"?i=rn(n.infoSyncTree_,e,t):i=rn(n.serverSyncTree_,e,t),Co(n.eventQueue_,e._path,i)}function Ah(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Ch)}function Lt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),B(t,...e)}function Jn(n,e,t,i){e&&Xe(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Io(n,e,t){return xi(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function qi(n,e=n.transactionQueueTree_){if(e||Cn(n,e),Ze(e)){const t=To(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Dh(n,Ot(e),t)}else _o(e)&&mn(e,t=>{qi(n,t)})}function Dh(n,e,t){const i=t.map(c=>c.currentWriteId),s=Io(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=W(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Lt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let u=0;u<t.length;u++)t[u].status=2,d=d.concat(he(n.serverSyncTree_,t[u].currentWriteId)),t[u].onComplete&&h.push(()=>t[u].onComplete(null,!0,t[u].currentOutputSnapshotResolved)),t[u].unwatcher();Cn(n,Vi(n.transactionQueueTree_,e)),qi(n,n.transactionQueueTree_),K(n.eventQueue_,e,d);for(let u=0;u<h.length;u++)Xe(h[u])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{V("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}Ge(n,e)}},o)}function Ge(n,e){const t=So(n,e),i=Ot(t),s=To(n,t);return Ph(n,s,i),i}function Ph(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=W(t,l.path);let d=!1,h;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,s=s.concat(he(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Eh)d=!0,h="maxretry",s=s.concat(he(n.serverSyncTree_,l.currentWriteId,!0));else{const u=Io(n,l.path,o);l.currentInputSnapshot=u;const p=e[a].update(u.val());if(p!==void 0){gn("transaction failed: Data returned ",p,l.path);let _=x(p);typeof p=="object"&&p!=null&&ne(p,".priority")||(_=_.updatePriority(u.getPriority()));const N=l.currentWriteId,z=vn(n),se=fo(_,u,z);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=se,l.currentWriteId=Yi(n),o.splice(o.indexOf(N),1),s=s.concat(oo(n.serverSyncTree_,l.path,se,l.currentWriteId,l.applyLocally)),s=s.concat(he(n.serverSyncTree_,N,!0))}else d=!0,h="nodata",s=s.concat(he(n.serverSyncTree_,l.currentWriteId,!0))}K(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,(function(u){setTimeout(u,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}Cn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Xe(i[a]);qi(n,n.transactionQueueTree_)}function So(n,e){let t,i=n.transactionQueueTree_;for(t=g(e);t!==null&&Ze(i)===void 0;)i=Vi(i,t),e=R(e),t=g(e);return i}function To(n,e){const t=[];return Ro(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Ro(n,e,t){const i=Ze(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);mn(e,s=>{Ro(n,s,t)})}function Cn(n,e){const t=Ze(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,po(e,t.length>0?t:void 0)}mn(e,i=>{Cn(n,i)})}function zi(n,e){const t=Ot(So(n,e)),i=Vi(n.transactionQueueTree_,e);return lh(i,s=>{Mn(n,s)}),Mn(n,i),mo(i,s=>{Mn(n,s)}),t}function Mn(n,e){const t=Ze(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(he(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?po(e,void 0):t.length=r+1,K(n.eventQueue_,Ot(e),s);for(let o=0;o<i.length;o++)Xe(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xh(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Mh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):V(`Invalid query segment '${t}' in query '${n}'`)}return e}const $s=function(n,e){const t=Oh(n),i=t.namespace;t.domain==="firebase.com"&&ue(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ue("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Yl();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new kr(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new b(t.pathString)}},Oh=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(d,h)),d<h&&(s=xh(n.substring(d,h)));const u=Mh(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Lh=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Gs.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Gs.charAt(e[s]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+M(this.snapshot.exportVal())}}class No{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Ki{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return v(this._path)?null:Ci(this._path)}get ref(){return new ie(this._repo,this._path)}get _queryIdentifier(){const e=Ns(this._queryParams),t=mi(e);return t==="{}"?"default":t}get _queryObject(){return Ns(this._queryParams)}isEqual(e){if(e=ke(e),!(e instanceof Ki))return!1;const t=this._repo===e._repo,i=Ei(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+kc(this._path)}}class ie extends Ki{constructor(e,t){super(e,t,new Si,!1)}get parent(){const e=Fr(this._path);return e===null?null:new ie(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ye{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new b(e),i=qe(this.ref,e);return new Ye(this._node.getChild(t),i,D)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Ye(s,qe(this.ref,i),D)))}hasChild(e){const t=new b(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Y(n,e){return n=ke(n),n._checkNotDeleted("ref"),e!==void 0?qe(n._root,e):n._root}function qe(n,e){return n=ke(n),g(n._path)===null?mh("child","path",e):vo("child","path",e),new ie(n._repo,A(n._path,e))}function Fh(n,e){n=ke(n),$i("push",n._path),yo("push",e,n._path,!0);const t=wo(n._repo),i=Lh(t),s=qe(n,i),r=qe(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Ys(n){return $i("remove",n._path),et(n,null)}function et(n,e){n=ke(n),$i("set",n._path),yo("set",e,n._path,!1);const t=new Nt;return Th(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ao(n,e){_h("update",e,n._path);const t=new Nt;return Rh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Bh(n){n=ke(n);const e=new ji(()=>{}),t=new Ft(e);return Sh(n._repo,n,t).then(i=>new Ye(i,new ie(n._repo,n._path),n._queryParams.getIndex()))}class Ft{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new ko("value",this,new Ye(e.snapshotNode,new ie(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new No(this,e,t):null}matches(e){return e instanceof Ft?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class En{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new No(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const i=qe(new ie(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new ko(e.type,this,new Ye(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof En?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Qi(n,e,t,i,s){const r=new ji(t,void 0),o=e==="value"?new Ft(r):new En(e,r);return Nh(n._repo,n,o),()=>bo(n._repo,n,o)}function Do(n,e,t,i){return Qi(n,"value",e)}function Po(n,e,t,i){return Qi(n,"child_added",e)}function Uh(n,e,t,i){return Qi(n,"child_removed",e)}function qs(n,e,t){let i=null;const s=t?new ji(t):null;e==="value"?i=new Ft(s):e&&(i=new En(e,s)),bo(n._repo,n,i)}Wu(ie);Yu(ie);/**
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
 */const Wh="FIREBASE_DATABASE_EMULATOR_HOST",Zn={};let Vh=!1;function Hh(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=fi(r);n.repoInfo_=new kr(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function $h(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ue("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=$s(r,s),a=o.repoInfo,l;typeof process<"u"&&hs&&(l=hs[Wh]),l?(r=`http://${l}?ns=${a.namespace}`,o=$s(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new nc(n.name,n.options,e);gh("Invalid Firebase Database URL",o),v(o.path)||ue("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Yh(a,n,c,new tc(n,t));return new qh(d,n)}function Gh(n,e){const t=Zn[e];(!t||t[n.key]!==n)&&ue(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Ah(n),delete t[n.key]}function Yh(n,e,t,i){let s=Zn[e.name];s||(s={},Zn[e.name]=s);let r=s[n.toURLString()];return r&&ue("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new wh(n,Vh,t,i),s[n.toURLString()]=r,r}class qh{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(bh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ie(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Gh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ue("Cannot call "+e+" on a deleted database.")}}function zh(n=Tl(),e){const t=El(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=oa("database");i&&jh(t,...i)}return t}function jh(n,e,t,i={}){n=ke(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&$t(i,r.repoInfo_.emulatorOptions))return;ue("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ue('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Wt(Wt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:la(i.mockUserToken,n.app.options.projectId);o=new Wt(a)}fi(e)&&(aa(e),ha("Database",!0)),Hh(r,s,i,o)}/**
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
 */function Kh(n){Ul(Sl),Yt(new gt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return $h(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Le(ds,fs,n),Le(ds,fs,"esm2020")}ae.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ae.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Kh();const ze=document.getElementById("localVideo"),G=document.getElementById("remoteVideo"),k=document.getElementById("sharedVideo"),xo=document.querySelector('select-media-device[type="videoinput"]'),Mo=document.querySelector('select-media-device[type="audioinput"]'),Qh=document.querySelector('select-media-device[type="audiooutput"]'),Tt=document.getElementById("startChat"),wn=document.getElementById("hangUp"),Xh=document.getElementById("copyLink"),ft=document.getElementById("pipBtn"),zs=document.getElementById("switchCameraSelfBtn"),ei=document.getElementById("toggleMode"),Jh=document.getElementById("loadStream"),Zh=document.getElementById("status"),ed=document.getElementById("linkContainer"),ti=document.getElementById("watchContainer"),je=document.getElementById("yt-player-div"),ni=document.getElementById("videos"),X=document.getElementById("syncStatus"),on=document.getElementById("shareLink"),Rt=document.getElementById("streamUrl"),Oo=document.getElementById("mutePartnerBtn"),td=document.getElementById("fullscreenPartnerBtn"),nd=document.getElementById("muteSelfBtn"),id=document.getElementById("videoSelfBtn"),sd=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");document.getElementById("titleLink");document.getElementById("titleText");function rd(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function od(){return rd()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function ad(){const n=await od();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}async function ld({localStream:n,localVideo:e,peerConnection:t,currentFacingMode:i}){const s=i==="user"?"environment":"user",r=n.getVideoTracks()[0];try{return await r.applyConstraints({facingMode:s}),s}catch(l){console.warn("applyConstraints failed, falling back to getUserMedia:",l)}const o=await navigator.mediaDevices.getUserMedia({video:{facingMode:s},audio:!1}),a=o.getVideoTracks()[0];if(t){const l=t.getSenders().find(c=>c.track&&c.track.kind==="video");l&&l.replaceTrack(a)}return n.removeTrack(r),n.addTrack(a),e.srcObject=n,r.stop(),o.getTracks().forEach(l=>{l!==a&&l.stop()}),s}let ii=!1,pt=null;function cd(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function ud(n,e,t){t&&(t.muted=!n,t.volume=e)}function hd(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function dd(n,e){n&&(pt=()=>{if(n.muted!==ii){const t=e.querySelector("i");t.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",ii=n.muted}},n.addEventListener("volumechange",pt))}function fd(n){!n||!pt||(n.removeEventListener("volumechange",pt),pt=null)}function pd({getLocalStream:n,getLocalVideo:e,getRemoteVideo:t,getPeerConnection:i=()=>null,muteSelfBtn:s,videoSelfBtn:r,switchCameraSelfBtn:o,fullscreenSelfBtn:a,mutePartnerBtn:l,fullscreenPartnerBtn:c,audioConstraints:d={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}){s&&(s.onclick=()=>{const u=n(),p=e();if(!p||!u)return;const _=!p.muted;cd(!_,u),ud(!_,0,p),hd(_,s)}),r&&(r.onclick=()=>{const u=n();if(!u)return;const p=u.getVideoTracks()[0];if(p){p.enabled=!p.enabled;const _=r.querySelector("i");_.className=p.enabled?"fa fa-video":"fa fa-video-slash"}});let h="user";o&&(o.onclick=async()=>{const u=n(),p=e();if(!u){console.warn("No local stream or no local video track available.");return}if(!u.getVideoTracks()[0]){console.warn("No local video track available.");return}const C=h,N=i?.();if(!N){console.error("PeerConnection is required to switch camera.");return}const z=await ld({localStream:u,localVideo:p,peerConnection:N,currentFacingMode:C});h=z,console.log("Switched camera to facingMode:",z)}),a&&(a.onclick=()=>{const u=e();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()}),l&&(l.onclick=()=>{const u=t();u&&(u.muted=!u.muted)}),c&&(c.onclick=()=>{const u=t();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()})}function _d(n){fd(n),ii=!1}let O=null,De=!1;function md(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function si(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function Lo(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const i=n.match(t);if(i&&i[1])return i[1]}return null}async function gd({url:n,containerId:e,onReady:t,onStateChange:i}){const s=Lo(n);if(!s)throw new Error("Invalid YouTube URL");if(await md(),!document.getElementById(e))throw new Error(`Container #${e} not found`);if(O){try{O.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}O=null}return new Promise((o,a)=>{try{O=new window.YT.Player(e,{videoId:s,playerVars:{autoplay:0,controls:1,rel:0,modestbranding:1},events:{onReady:l=>{De=!0,t&&t(l),o(O)},onStateChange:l=>{i&&i(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function js(){return O}function Fo(){if(O){try{O.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}O=null,De=!1}}function Ks(){O&&De&&O.playVideo()}function Qs(){O&&De&&O.pauseVideo()}function yd(n){O&&De&&O.seekTo(n,!0)}function an(){return O&&De?O.getCurrentTime():0}function ri(){return O&&De?O.getPlayerState():-1}const de={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let kt=[],be=null,_t=!1,Bo=!1,oi="",te=-1;const vd="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",Cd="https://www.googleapis.com/youtube/v3";function Ed(n){be=n;const e=document.querySelector(".search-section"),t=document.getElementById("searchBtn"),i=document.getElementById("searchQuery"),s=document.getElementById("searchResults");if(!t||!i||!s){console.error("YouTube search elements not found in DOM");return}const r=a=>/^https?:\/\//i.test(a),o=a=>{s.querySelectorAll(".search-result-item").forEach((c,d)=>{d===a?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),te=a};t.onclick=async()=>{const a=i.value.trim();if(!a){li("Please enter a search term");return}if(_t&&a===oi)ai(kt);else if(!r(a))await Xs(a);else{be&&be({url:a,title:a,channel:"",thumbnail:"",id:a}),s.style.display="none",i.value="";return}},e.addEventListener("keydown",async a=>{const l=s.querySelectorAll(".search-result-item");if(l.length>0&&(a.key==="ArrowDown"||a.key==="ArrowUp")){if(a.preventDefault(),a.key==="ArrowDown"){let c=te+1;c>=l.length&&(c=0),o(c)}else if(a.key==="ArrowUp"){let c=te-1;c<0&&(c=te===-1?0:l.length-1),o(c)}return}if(a.key==="Enter"){if(l.length>0&&te>=0){l[te].click();return}const c=i.value.trim();if(c)if(_t&&c===oi)ai(kt);else if(!r(c))await Xs(c);else{be&&be({url:c,title:c,channel:"",thumbnail:"",id:c}),s.style.display="none",i.value="";return}}else a.key==="Escape"&&Bo&&(s.style.display="none")})}async function Xs(n){oi=n;const e=document.getElementById("searchBtn"),t=document.getElementById("searchResults");e.disabled=!0,e.textContent="Searching...",t.innerHTML='<div class="search-loading">Searching YouTube...</div>',t.style.display="block",_t=!1;try{const i=await fetch(`${Cd}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${vd}`);if(!i.ok)throw i.status===403?new Error("YouTube API quota exceeded. Please try again later."):i.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${i.status}`);const s=await i.json();if(!s.items||s.items.length===0){li("No videos found"),_t=!1;return}kt=s.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),ai(kt),_t=!0}catch(i){console.error("YouTube search failed:",i),li(i.message||"Search failed. Please try again.")}finally{e.disabled=!1,e.textContent="Search"}}function ai(n){const e=document.getElementById("searchResults");if(!n||n.length===0){e.innerHTML='<div class="no-results">No results found</div>',te=-1;return}e.innerHTML="",n.forEach(i=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
        <img src="${i.thumbnail}" alt="${i.title}" class="result-thumbnail">
        <div class="result-info">
          <div class="result-title">${i.title}</div>
          <div class="result-channel">${i.channel}</div>
        </div>
      `,s.onclick=()=>{if(be){be(i),e.style.display="none";const r=document.getElementById("searchQuery");r&&(r.value=""),te=-1}},e.appendChild(s)}),e.style.display="block",Bo=!0,te=0,e.querySelectorAll(".search-result-item").forEach((i,s)=>{s===te?(i.classList.add("focused"),i.scrollIntoView({block:"nearest"})):i.classList.remove("focused")})}function li(n){const e=document.getElementById("searchResults");e.innerHTML=`<div class="search-error">${n}</div>`,e.style.display="block"}function wd(){const n=document.getElementById("searchResults");n&&(n.innerHTML="",n.style.display="none"),kt=[]}class bd extends HTMLElement{static observedAttributes=["type"];constructor(){super(),this.attachShadow({mode:"open"}),this._onDeviceChange=this.updateDevices.bind(this)}connectedCallback(){this.render(),this.updateDevices(),navigator.mediaDevices.addEventListener("devicechange",this._onDeviceChange)}disconnectedCallback(){navigator.mediaDevices.removeEventListener("devicechange",this._onDeviceChange)}attributeChangedCallback(){this.updateDevices()}render(){this.shadowRoot.innerHTML=`
      <style>
        select {
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          background: white;
          cursor: pointer;
        }
        select:focus {
          outline: 2px solid #0066ff;
          outline-offset: 2px;
        }
      </style>
      <select></select>
    `}async updateDevices(){const e=this.getAttribute("type")||"videoinput",i=(await navigator.mediaDevices.enumerateDevices()).filter(r=>r.kind===e),s=this.shadowRoot.querySelector("select");s.innerHTML=i.map((r,o)=>`<option value="${r.deviceId}">${r.label||`${e} ${o+1}`}</option>`).join(""),this.dispatchEvent(new CustomEvent("deviceschanged",{detail:{devices:i}}))}get value(){return this.shadowRoot.querySelector("select").value}set value(e){this.shadowRoot.querySelector("select").value=e}}customElements.define("select-media-device",bd);const Id={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Sd=hr(Id),q=zh(Sd),Uo={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};let I=null,$=null,w=null,Z=null,Ke=null,rt=!1,Me=null,Xi=!1;const ci=[];let ui=null,ot=0;const Js={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},hi={width:{min:640,ideal:1920,max:1920},height:{min:480,ideal:1080,max:1080}};async function Wo(){Z=Math.random().toString(36).substring(2,15);try{$=await navigator.mediaDevices.getUserMedia({video:hi,audio:Js});const n=new MediaStream($.getVideoTracks());return ze.srcObject=n,await ad()&&(zs.style.display="block"),pd({getLocalStream:()=>$,getLocalVideo:()=>ze,getRemoteVideo:()=>G,getPeerConnection:()=>I,muteSelfBtn:nd,videoSelfBtn:id,switchCameraSelfBtn:zs,fullscreenSelfBtn:sd,mutePartnerBtn:Oo,fullscreenPartnerBtn:td,audioConstraints:Js}),!0}catch(n){return console.error("Failed to get user media:",n),P("Error: Please allow camera and microphone access."),!1}}let Td=()=>{G.style.display="block",ze.classList.add("smallFrame")},Rd=()=>{G.style.display="none",ze.classList.remove("smallFrame")},ln=[];function Vo(){if(!w||!Z)return;const n=Y(q,`rooms/${w}/members`),e=Y(q,`rooms/${w}/members/${Z}`);et(e,{joinedAt:Date.now()});const t=s=>{s.key!==Z&&Td()};Po(n,t),ln.push({ref:n,type:"child_added",callback:t});const i=s=>{s.key!==Z&&Rd()};Uh(n,i),ln.push({ref:n,type:"child_removed",callback:i})}function Ho(n){n.ontrack=e=>{if(!e.streams||!e.streams[0]||!(e.streams[0]instanceof MediaStream)){console.error("No valid remote MediaStream found in event.streams:",e.streams);return}G.srcObject!==e.streams[0]&&(G.srcObject=e.streams[0],ft.style.display="block",dd(G,Oo),P("Connected!"))}}function $o(n,e){n.onicecandidate=r=>{if(r.candidate){const a=Fh(Y(q,`rooms/${w}/${e==="initiator"?"callerCandidates":"calleeCandidates"}`));et(a,r.candidate.toJSON())}};const i=Y(q,`rooms/${w}/${e==="initiator"?"calleeCandidates":"callerCandidates"}`),s=r=>{const o=r.val();o&&n.remoteDescription&&n.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};Po(i,s),Ji(i,"child_added",s)}function Go(n){n.onconnectionstatechange=()=>{n.connectionState==="connected"?P("Connected!"):n.connectionState==="disconnected"?P("Partner disconnected"):n.connectionState==="failed"&&P("Connection failed")}}async function kd(){if(!$){P("Error: Camera not initialized");return}w=Math.random().toString(36).substring(2,15),Ke="initiator",I=new RTCPeerConnection(Uo),$.getTracks().forEach(r=>{I.addTrack(r,$)}),Ho(I),$o(I,Ke),Go(I);const n=await I.createOffer();await I.setLocalDescription(n);const e=Y(q,`rooms/${w}`);await et(e,{offer:{type:n.type,sdp:n.sdp}});const t=Y(q,`rooms/${w}/answer`),i=async r=>{const o=r.val();if(o&&o.sdp!==ui){if(ui=o.sdp,I.signalingState!=="have-local-offer"&&I.signalingState!=="stable")return;try{await I.setRemoteDescription(new RTCSessionDescription(o))}catch(a){console.error("Failed to set remote description:",a)}}};Do(t,i),Ji(t,"value",i),Yo(),Vo();const s=`${window.location.origin}${window.location.pathname}?room=${w}`;on.value=s,Tt.disabled=!0,wn.disabled=!1;try{await navigator.clipboard.writeText(s),alert(`Link copied! Share it with someone to start a call.

( link: ${s} )`)}catch{alert(`Share this link with your partner:
${s}`)}P("Link ready! Share with your partner.")}async function Nd(){if(!$){P("Error: Camera not initialized");return}if(!w){P("Error: No room ID");return}Ke="joiner";const n=Y(q,`rooms/${w}`),e=await Bh(n);if(!e.exists()){P("Error: Invalid room link");return}const i=e.val().offer;if(!i){P("Error: No offer found");return}I=new RTCPeerConnection(Uo),$.getTracks().forEach(r=>{I.addTrack(r,$)}),Ho(I),$o(I,Ke),Go(I),await I.setRemoteDescription(new RTCSessionDescription(i));const s=await I.createAnswer();await I.setLocalDescription(s);try{await Ao(n,{answer:{type:s.type,sdp:s.sdp}})}catch(r){console.error("Failed to update answer in Firebase:",r),P("Failed to send answer to partner.");return}Yo(),Vo(),wn.disabled=!1,P("Connecting...")}let oe=!1,le=null;async function Oe(n){if(!w)return;const e=Y(q,`rooms/${w}/watch`);try{await Ao(e,{...n,updatedBy:Z})}catch(t){console.error("Failed to update watch state:",t)}}function Yo(){if(!w)return;const n=Y(q,`rooms/${w}/watch`),e=t=>{const i=t.val();if(i&&i.updatedBy!==Z&&!(Date.now()-ot<500))if(i.url&&i.url!==Rt.value&&(Rt.value=i.url,si(i.url)?zo(i.url):(k.style.display="block",k.src=i.url,je.style.display="none"),X.textContent="Video loaded"),i.isYouTube&&Me&&Xi){if(i.playing!==void 0){const s=ri(),r=s===de.PLAYING;if(s===de.BUFFERING||s===de.UNSTARTED)oe=!0,le&&clearTimeout(le),le=setTimeout(async()=>{oe=!1;const a=ri()===de.PLAYING;await Oe({playing:a,currentTime:an()})},700);else{if(oe)return;i.playing&&!r?Ks():!i.playing&&r&&Qs()}}if(i.currentTime!==void 0){const s=an();Math.abs(s-i.currentTime)>.3&&!oe&&(yd(i.currentTime),setTimeout(()=>{i.playing?Ks():Qs()},500))}}else!i.isYouTube&&k.src&&(i.playing!==void 0&&(i.playing&&k.paused?k.play().catch(s=>console.warn("Play failed:",s)):!i.playing&&!k.paused&&k.pause()),i.currentTime!==void 0&&Math.abs(k.currentTime-i.currentTime)>1&&(k.currentTime=i.currentTime,i.playing?k.play().catch(r=>console.warn("Play failed:",r)):k.pause()))};Do(n,e),Ji(n,"value",e),k.addEventListener("play",async()=>{!Me&&w&&(ot=Date.now(),await Oe({playing:!0,isYouTube:!1}))}),k.addEventListener("pause",async()=>{!Me&&w&&(ot=Date.now(),await Oe({playing:!1,isYouTube:!1}))}),k.addEventListener("seeked",async()=>{!Me&&w&&(ot=Date.now(),await Oe({currentTime:k.currentTime,playing:!k.paused,isYouTube:!1}))})}function qo(){const n=Rt.value.trim();if(!n){X.textContent="Please enter a video URL";return}if(ot=Date.now(),si(n)?zo(n):(je.style.display="none",Fo(),k.style.display="block",k.src=n,X.textContent="Video loaded"),w){const e=Y(q,`rooms/${w}/watch`);et(e,{url:n,playing:!1,currentTime:0,isYouTube:si(n),updatedBy:Z})}}function Ad(n){Rt.value=n.url,qo(),X.textContent=`Loading "${n.title}"...`}async function zo(n){if(!Lo(n)){X.textContent="Invalid YouTube URL";return}X.textContent="Loading YouTube video...",k.style.display="none",je.style.display="block";try{await gd({url:n,containerId:"yt-player-div",onReady:t=>{if(Xi=!0,X.textContent="YouTube video ready",w){const i=Y(q,`rooms/${w}/watch`);et(i,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Z})}},onStateChange:async t=>{if(!js())return;const s=t.data===de.PLAYING,r=t.data===de.PAUSED;if(t.data===de.BUFFERING){oe=!0,le&&clearTimeout(le),le=setTimeout(async()=>{oe=!1;const l=ri()===de.PLAYING;await Oe({playing:l,currentTime:an()})},700);return}r&&oe||!oe&&(s||r)&&await Oe({playing:s,currentTime:an()})}}),Me=js(),X.textContent="YouTube video loaded"}catch(t){console.error("Failed to load YouTube video:",t),X.textContent="Failed to load YouTube video",k.style.display="block",je.style.display="none"}}function Dd(){rt=!rt,rt?(ni.style.display="none",ti.style.display="block",ei.textContent="Switch to Chat Mode",X.textContent=rt&&w?"Watch mode ready":"Enter a video URL",Ed(Ad)):(ni.style.display="flex",ti.style.display="none",ei.textContent="Switch to Watch Mode",wd(),je.style.display="none",k.style.display="none")}ft.onclick=async()=>{try{document.pictureInPictureElement?(await document.exitPictureInPicture(),ft.textContent="Float Partner Video"):(await G.requestPictureInPicture(),ft.textContent="Exit Floating Video")}catch(n){console.error("PiP failed:",n),P("Picture-in-picture not supported")}};async function jo(){if(console.debug("Hanging up..."),$&&($.getTracks().forEach(n=>n.stop()),ze.srcObject=null,$=null),G.srcObject&&(G.srcObject.getTracks().forEach(n=>n.stop()),G.srcObject=null),_d(G),I&&(I.close(),I=null),ci.forEach(({ref:n,type:e,callback:t})=>qs(n,e,t)),ci.length=0,Fo(),Me=null,Xi=!1,je.style.display="none",le&&(clearTimeout(le),le=null),oe=!1,w&&Ke==="initiator"){const n=Y(q,`rooms/${w}`);Ys(n).catch(e=>{console.warn("Failed to remove room:",e)})}if(Tt.disabled=!1,Tt.style.display="block",wn.disabled=!0,ed.style.display="none",ln.forEach(({ref:n,type:e,callback:t})=>qs(n,e,t)),ln.length=0,w&&Z){const n=Y(q,`rooms/${w}/members/${Z}`);Ys(n).catch(()=>{})}ti.style.display="none",ni.style.display="flex",ft.style.display="none",on.value="",k.src="",k.style.display="none",Rt.value="",X.textContent="",document.pictureInPictureElement&&document.exitPictureInPicture().catch(n=>console.error(n)),w=null,Ke=null,rt=!1,ui=null,window.history.replaceState({},document.title,window.location.pathname),P('Disconnected. Click "Start New Chat" to begin.')}Tt.onclick=async()=>{await Wo()&&await kd()};wn.onclick=jo;ei.onclick=Dd;Jh.onclick=qo;Xh.onclick=async()=>{try{await navigator.clipboard.writeText(on.value),P("Link copied to clipboard!")}catch{on.select(),document.execCommand("copy"),P("Link copied!")}};function P(n){Zh.textContent=n}function Ji(n,e,t){ci.push({ref:n,type:e,callback:t})}async function Pd(){const e=new URLSearchParams(window.location.search).get("room");e?(w=e,P("Connecting to room..."),Tt.style.display="none",await Wo()&&await Nd()):P('Ready. Click "Start New Chat" to begin.')}window.addEventListener("beforeunload",n=>{if(I&&I.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;jo()});Pd();async function Ko(){const n=xo?.value,e=Mo?.value,t={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},i={video:n?{deviceId:{exact:n},...hi}:{...hi},audio:e?{deviceId:{exact:e},...t}:{...t}};try{const s=await navigator.mediaDevices.getUserMedia(i);if(I){const o=s.getVideoTracks()[0],a=I.getSenders().find(d=>d.track?.kind==="video");o&&a&&a.replaceTrack(o);const l=s.getAudioTracks()[0],c=I.getSenders().find(d=>d.track?.kind==="audio");l&&c&&c.replaceTrack(l)}const r=$;$=s,ze.srcObject=new MediaStream(s.getVideoTracks()),r&&r.getTracks().forEach(o=>o.stop())}catch(s){P("Could not access selected devices."),console.error(s)}}xo?.shadowRoot.querySelector("select")?.addEventListener("change",Ko);Mo?.shadowRoot.querySelector("select")?.addEventListener("change",Ko);Qh?.shadowRoot.querySelector("select")?.addEventListener("change",n=>{const e=n.target.value;typeof G?.setSinkId=="function"&&G.setSinkId(e).catch(t=>{P("Could not set audio output device."),console.error(t)})});
