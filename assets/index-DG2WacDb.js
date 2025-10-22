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
 */const Yo=()=>{};var Qi={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw je(e)},je=function(n){return new Error("Firebase Database ("+js.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},qo=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ui={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(t[d],t[u],t[h],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ks(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):qo(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new zo;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),u!==64){const _=c<<6&192|u;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qs=function(n){const e=Ks(n);return ui.encodeByteArray(e,!0)},Wt=function(n){return Qs(n).replace(/\./g,"")},Mn=function(n){try{return ui.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(n){return Xs(void 0,n)}function Xs(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Ko(t)||(n[t]=Xs(n[t],e[t]));return n}function Ko(n){return n!=="__proto__"}/**
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
 */function Qo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Xo=()=>Qo().__FIREBASE_DEFAULTS__,Jo=()=>{if(typeof process>"u"||typeof Qi>"u")return;const n=Qi.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Zo=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mn(n[1]);return e&&JSON.parse(e)},Js=()=>{try{return Yo()||Xo()||Jo()||Zo()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ea=n=>Js()?.emulatorHosts?.[n],ta=n=>{const e=ea(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Zs=()=>Js()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function hi(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function na(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function ia(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Wt(JSON.stringify(t)),Wt(JSON.stringify(o)),""].join(".")}const st={};function sa(){const n={prod:[],emulator:[]};for(const e of Object.keys(st))st[e]?n.emulator.push(e):n.prod.push(e);return n}function ra(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Xi=!1;function oa(n,e){if(typeof window>"u"||typeof document>"u"||!hi(window.location.host)||st[n]===e||st[n]||Xi)return;st[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=sa().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,p){h.setAttribute("width","24"),h.setAttribute("id",p),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Xi=!0,o()},h}function d(h,p){h.setAttribute("id",p),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=ra(i),p=t("text"),_=document.getElementById(p)||document.createElement("span"),C=t("learnmore"),P=document.getElementById(C)||document.createElement("a"),ne=t("preprendIcon"),ie=document.getElementById(ne)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ve=h.element;a(ve),d(P,C);const wn=c();l(ie,ne),ve.append(ie,_,P,wn),document.body.appendChild(ve)}r?(_.innerText="Preview backend disconnected.",ie.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ie.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function aa(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function er(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(aa())}function la(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ca(){return js.NODE_ADMIN===!0}function ua(){try{return typeof indexedDB=="object"}catch{return!1}}function ha(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da="FirebaseError";class Nt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=da,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tr.prototype.create)}}class tr{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?fa(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Nt(s,a,i)}}function fa(n,e){return n.replace(pa,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const pa=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ft(n){return JSON.parse(n)}function M(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=ft(Mn(r[0])||""),t=ft(Mn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},_a=function(n){const e=nr(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ma=function(n){const e=nr(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Be(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ji(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vt(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ht(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Zi(r)&&Zi(o)){if(!Ht(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Zi(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function ln(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},cn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Ne(n){return n&&n._delegate?n._delegate:n}class pt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Ce="[DEFAULT]";/**
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
 */class Ca{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new Tt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wa(e))try{this.getOrInitializeService({instanceIdentifier:Ce})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ce){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ce){return this.instances.has(e)}getOptions(e=Ce){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ea(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ce){return this.component?this.component.multipleInstances?e:Ce:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ea(n){return n===Ce?void 0:n}function wa(n){return n.instantiationMode==="EAGER"}/**
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
 */class ba{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ca(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const Ia={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},Sa=S.INFO,Ta={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Na=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ta[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ir{constructor(e){this.name=e,this._logLevel=Sa,this._logHandler=Na,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ia[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const Ra=(n,e)=>e.some(t=>n instanceof t);let es,ts;function ka(){return es||(es=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Aa(){return ts||(ts=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const sr=new WeakMap,On=new WeakMap,rr=new WeakMap,bn=new WeakMap,di=new WeakMap;function Pa(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(de(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&sr.set(t,n)}).catch(()=>{}),di.set(e,n),e}function Da(n){if(On.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});On.set(n,e)}let Ln={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return On.get(n);if(e==="objectStoreNames")return n.objectStoreNames||rr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return de(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function xa(n){Ln=n(Ln)}function Ma(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(In(this),e,...t);return rr.set(i,e.sort?e.sort():[e]),de(i)}:Aa().includes(n)?function(...e){return n.apply(In(this),e),de(sr.get(this))}:function(...e){return de(n.apply(In(this),e))}}function Oa(n){return typeof n=="function"?Ma(n):(n instanceof IDBTransaction&&Da(n),Ra(n,ka())?new Proxy(n,Ln):n)}function de(n){if(n instanceof IDBRequest)return Pa(n);if(bn.has(n))return bn.get(n);const e=Oa(n);return e!==n&&(bn.set(n,e),di.set(e,n)),e}const In=n=>di.get(n);function La(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=de(o);return i&&o.addEventListener("upgradeneeded",l=>{i(de(o.result),l.oldVersion,l.newVersion,de(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Fa=["get","getKey","getAll","getAllKeys","count"],Ba=["put","add","delete","clear"],Sn=new Map;function ns(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Sn.get(e))return Sn.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Ba.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Fa.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Sn.set(e,r),r}xa(n=>({...n,get:(e,t,i)=>ns(e,t)||n.get(e,t,i),has:(e,t)=>!!ns(e,t)||n.has(e,t)}));/**
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
 */class Ua{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Wa(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Wa(n){return n.getComponent()?.type==="VERSION"}const Fn="@firebase/app",is="0.14.4";/**
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
 */const le=new ir("@firebase/app"),Va="@firebase/app-compat",Ha="@firebase/analytics-compat",$a="@firebase/analytics",Ga="@firebase/app-check-compat",Ya="@firebase/app-check",qa="@firebase/auth",za="@firebase/auth-compat",ja="@firebase/database",Ka="@firebase/data-connect",Qa="@firebase/database-compat",Xa="@firebase/functions",Ja="@firebase/functions-compat",Za="@firebase/installations",el="@firebase/installations-compat",tl="@firebase/messaging",nl="@firebase/messaging-compat",il="@firebase/performance",sl="@firebase/performance-compat",rl="@firebase/remote-config",ol="@firebase/remote-config-compat",al="@firebase/storage",ll="@firebase/storage-compat",cl="@firebase/firestore",ul="@firebase/ai",hl="@firebase/firestore-compat",dl="firebase",fl="12.4.0";/**
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
 */const Bn="[DEFAULT]",pl={[Fn]:"fire-core",[Va]:"fire-core-compat",[$a]:"fire-analytics",[Ha]:"fire-analytics-compat",[Ya]:"fire-app-check",[Ga]:"fire-app-check-compat",[qa]:"fire-auth",[za]:"fire-auth-compat",[ja]:"fire-rtdb",[Ka]:"fire-data-connect",[Qa]:"fire-rtdb-compat",[Xa]:"fire-fn",[Ja]:"fire-fn-compat",[Za]:"fire-iid",[el]:"fire-iid-compat",[tl]:"fire-fcm",[nl]:"fire-fcm-compat",[il]:"fire-perf",[sl]:"fire-perf-compat",[rl]:"fire-rc",[ol]:"fire-rc-compat",[al]:"fire-gcs",[ll]:"fire-gcs-compat",[cl]:"fire-fst",[hl]:"fire-fst-compat",[ul]:"fire-vertex","fire-js":"fire-js",[dl]:"fire-js-all"};/**
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
 */const $t=new Map,_l=new Map,Un=new Map;function ss(n,e){try{n.container.addComponent(e)}catch(t){le.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Gt(n){const e=n.name;if(Un.has(e))return le.debug(`There were multiple attempts to register component ${e}.`),!1;Un.set(e,n);for(const t of $t.values())ss(t,n);for(const t of _l.values())ss(t,n);return!0}function ml(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function gl(n){return n==null?!1:n.settings!==void 0}/**
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
 */const yl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fe=new tr("app","Firebase",yl);/**
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
 */class vl{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fe.create("app-deleted",{appName:this._name})}}/**
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
 */const Cl=fl;function or(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Bn,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw fe.create("bad-app-name",{appName:String(s)});if(t||(t=Zs()),!t)throw fe.create("no-options");const r=$t.get(s);if(r){if(Ht(t,r.options)&&Ht(i,r.config))return r;throw fe.create("duplicate-app",{appName:s})}const o=new ba(s);for(const l of Un.values())o.addComponent(l);const a=new vl(t,i,o);return $t.set(s,a),a}function El(n=Bn){const e=$t.get(n);if(!e&&n===Bn&&Zs())return or();if(!e)throw fe.create("no-app",{appName:n});return e}function Oe(n,e,t){let i=pl[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),le.warn(o.join(" "));return}Gt(new pt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const wl="firebase-heartbeat-database",bl=1,_t="firebase-heartbeat-store";let Tn=null;function ar(){return Tn||(Tn=La(wl,bl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(_t)}catch(t){console.warn(t)}}}}).catch(n=>{throw fe.create("idb-open",{originalErrorMessage:n.message})})),Tn}async function Il(n){try{const t=(await ar()).transaction(_t),i=await t.objectStore(_t).get(lr(n));return await t.done,i}catch(e){if(e instanceof Nt)le.warn(e.message);else{const t=fe.create("idb-get",{originalErrorMessage:e?.message});le.warn(t.message)}}}async function rs(n,e){try{const i=(await ar()).transaction(_t,"readwrite");await i.objectStore(_t).put(e,lr(n)),await i.done}catch(t){if(t instanceof Nt)le.warn(t.message);else{const i=fe.create("idb-set",{originalErrorMessage:t?.message});le.warn(i.message)}}}function lr(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Sl=1024,Tl=30;class Nl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new kl(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=os();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Tl){const s=Al(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){le.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=os(),{heartbeatsToSend:t,unsentEntries:i}=Rl(this._heartbeatsCache.heartbeats),s=Wt(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return le.warn(e),""}}}function os(){return new Date().toISOString().substring(0,10)}function Rl(n,e=Sl){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),as(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),as(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class kl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ua()?ha().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Il(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return rs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return rs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function as(n){return Wt(JSON.stringify({version:2,heartbeats:n})).length}function Al(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Pl(n){Gt(new pt("platform-logger",e=>new Ua(e),"PRIVATE")),Gt(new pt("heartbeat",e=>new Nl(e),"PRIVATE")),Oe(Fn,is,n),Oe(Fn,is,"esm2020"),Oe("fire-js","")}Pl("");var Dl="firebase",xl="12.4.0";/**
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
 */Oe(Dl,xl,"app");var ls={};const cs="@firebase/database",us="1.1.0";/**
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
 */let cr="";function Ml(n){cr=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),M(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ft(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ee(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ol(e)}}catch{}return new Ll},be=ur("localStorage"),Fl=ur("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=new ir("@firebase/database"),Bl=(function(){let n=1;return function(){return n++}})(),hr=function(n){const e=va(n),t=new ya;t.update(e);const i=t.digest();return ui.encodeByteArray(i)},Rt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Rt.apply(null,i):typeof i=="object"?e+=M(i):e+=i,e+=" "}return e};let rt=null,hs=!0;const Ul=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Le.logLevel=S.VERBOSE,rt=Le.log.bind(Le)},B=function(...n){if(hs===!0&&(hs=!1,rt===null&&Fl.get("logging_enabled")===!0&&Ul()),rt){const e=Rt.apply(null,n);rt(e)}},kt=function(n){return function(...e){B(n,...e)}},Wn=function(...n){const e="FIREBASE INTERNAL ERROR: "+Rt(...n);Le.error(e)},ce=function(...n){const e=`FIREBASE FATAL ERROR: ${Rt(...n)}`;throw Le.error(e),new Error(e)},V=function(...n){const e="FIREBASE WARNING: "+Rt(...n);Le.warn(e)},Wl=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&V("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},fi=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Vl=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ue="[MIN_NAME]",Ie="[MAX_NAME]",Re=function(n,e){if(n===e)return 0;if(n===Ue||e===Ie)return-1;if(e===Ue||n===Ie)return 1;{const t=ds(n),i=ds(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Hl=function(n,e){return n===e?0:n<e?-1:1},Je=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+M(e))},pi=function(n){if(typeof n!="object"||n===null)return M(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=M(e[i]),t+=":",t+=pi(n[e[i]]);return t+="}",t},dr=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function U(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const fr=function(n){f(!fi(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},$l=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Gl=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Yl(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const ql=new RegExp("^-?(0*)\\d{1,10}$"),zl=-2147483648,jl=2147483647,ds=function(n){if(ql.test(n)){const e=Number(n);if(e>=zl&&e<=jl)return e}return null},Ke=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw V("Exception was thrown by user callback.",t),e},Math.floor(0))}},Kl=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ot=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Ql{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,gl(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){V(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',V(e)}}class Ut{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ut.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i="5",pr="v",_r="s",mr="r",gr="f",yr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,vr="ls",Cr="p",Vn="ac",Er="websocket",wr="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=be.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&be.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Jl(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ir(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===Er)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===wr)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Jl(n)&&(t.ns=n.namespace);const s=[];return U(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(){this.counters_={}}incrementCounter(e,t=1){ee(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return jo(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn={},Rn={};function mi(n){const e=n.toString();return Nn[e]||(Nn[e]=new Zl),Nn[e]}function ec(n,e){const t=n.toString();return Rn[t]||(Rn[t]=e()),Rn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ke(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs="start",nc="close",ic="pLPCommand",sc="pRTLPCB",Sr="id",Tr="pw",Nr="ser",rc="cb",oc="seg",ac="ts",lc="d",cc="dframe",Rr=1870,kr=30,uc=Rr-kr,hc=25e3,dc=3e4;class De{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=kt(e),this.stats_=mi(t),this.urlFn=l=>(this.appCheckToken&&(l[Vn]=this.appCheckToken),Ir(t,wr,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new tc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(dc)),Vl(()=>{if(this.isClosed_)return;this.scriptTagHolder=new gi((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===fs)this.id=a,this.password=l;else if(o===nc)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[fs]="t",i[Nr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[rc]=this.scriptTagHolder.uniqueCallbackIdentifier),i[pr]=_i,this.transportSessionId&&(i[_r]=this.transportSessionId),this.lastSessionId&&(i[vr]=this.lastSessionId),this.applicationId&&(i[Cr]=this.applicationId),this.appCheckToken&&(i[Vn]=this.appCheckToken),typeof location<"u"&&location.hostname&&yr.test(location.hostname)&&(i[mr]=gr);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){De.forceAllow_=!0}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){return De.forceAllow_?!0:!De.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!$l()&&!Gl()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Qs(t),s=dr(i,uc);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[cc]="t",i[Sr]=e,i[Tr]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=M(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class gi{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Bl(),window[ic+this.uniqueCallbackIdentifier]=e,window[sc+this.uniqueCallbackIdentifier]=t,this.myIFrame=gi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Sr]=this.myID,e[Tr]=this.myPW,e[Nr]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+kr+i.length<=Rr;){const o=this.pendingSegs.shift();i=i+"&"+oc+s+"="+o.seg+"&"+ac+s+"="+o.ts+"&"+lc+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(hc)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc=16384,pc=45e3;let Yt=null;typeof MozWebSocket<"u"?Yt=MozWebSocket:typeof WebSocket<"u"&&(Yt=WebSocket);class q{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=kt(this.connId),this.stats_=mi(t),this.connURL=q.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[pr]=_i,typeof location<"u"&&location.hostname&&yr.test(location.hostname)&&(o[mr]=gr),t&&(o[_r]=t),i&&(o[vr]=i),s&&(o[Vn]=s),r&&(o[Cr]=r),Ir(e,Er,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,be.set("previous_websocket_failure",!0);try{let i;ca(),this.mySock=new Yt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){q.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Yt!==null&&!q.forceDisallow_}static previouslyFailed(){return be.isInMemoryStorage||be.get("previous_websocket_failure")===!0}markConnectionHealthy(){be.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=ft(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=dr(t,fc);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(pc))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}q.responsesRequiredToBeHealthy=2;q.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{static get ALL_TRANSPORTS(){return[De,q]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=q&&q.isAvailable();let i=t&&!q.previouslyFailed();if(e.webSocketOnly&&(t||V("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[q];else{const s=this.transports_=[];for(const r of mt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);mt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}mt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=6e4,mc=5e3,gc=10*1024,yc=100*1024,kn="t",ps="d",vc="s",_s="r",Cc="e",ms="o",gs="a",ys="n",vs="p",Ec="h";class wc{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=kt("c:"+this.id+":"),this.transportManager_=new mt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ot(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>yc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>gc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(kn in e){const t=e[kn];t===gs?this.upgradeIfSecondaryHealthy_():t===_s?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ms&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Je("t",e),i=Je("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:vs,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:gs,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ys,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Je("t",e),i=Je("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Je(kn,e);if(ps in e){const i=e[ps];if(t===Ec){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===ys){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===vc?this.onConnectionShutdown_(i):t===_s?this.onReset_(i):t===Cc?Wn("Server Error: "+i):t===ms?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Wn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),_i!==i&&V("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),ot(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(_c))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ot(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(mc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:vs,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(be.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Pr{static getInstance(){return new qt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!er()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cs=32,Es=768;class w{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new w("")}function g(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function me(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new w(n.pieces_,e)}function yi(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function bc(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function gt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Dr(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new w(e,0)}function k(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof w)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new w(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function W(n,e){const t=g(n),i=g(e);if(t===null)return e;if(t===i)return W(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Ic(n,e){const t=gt(n,0),i=gt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Re(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function vi(n,e){if(me(n)!==me(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function G(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(me(n)>me(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Sc{constructor(e,t){this.errorPrefix_=t,this.parts_=gt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=cn(this.parts_[i]);xr(this)}}function Tc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=cn(e),xr(n)}function Nc(n){const e=n.parts_.pop();n.byteLength_-=cn(e),n.parts_.length>0&&(n.byteLength_-=1)}function xr(n){if(n.byteLength_>Es)throw new Error(n.errorPrefix_+"has a key path longer than "+Es+" bytes ("+n.byteLength_+").");if(n.parts_.length>Cs)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Cs+") or object contains a cycle "+Ee(n))}function Ee(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci extends Pr{static getInstance(){return new Ci}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze=1e3,Rc=300*1e3,ws=30*1e3,kc=1.3,Ac=3e4,Pc="server_kill",bs=3;class oe extends Ar{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=oe.nextPersistentConnectionId_++,this.log_=kt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ze,this.maxReconnectDelay_=Rc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ci.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&qt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(M(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Tt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;oe.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ee(e,"w")){const i=Be(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();V(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ma(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ws)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=_a(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+M(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Wn("Unrecognized action received from server: "+M(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ze,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ze,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ac&&(this.reconnectDelay_=Ze),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*kc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+oe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new wc(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{V(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Pc)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&V(u),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ji(this.interruptReasons_)&&(this.reconnectDelay_=Ze,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>pi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new w(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){B("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=bs&&(this.reconnectDelay_=ws,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){B("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=bs&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+cr.replace(/\./g,"-")]=1,er()?e["framework.cordova"]=1:la()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=qt.getInstance().currentlyOnline();return Ji(this.interruptReasons_)&&e}}oe.nextPersistentConnectionId_=0;oe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class un{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new y(Ue,e),s=new y(Ue,t);return this.compare(i,s)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ft;class Mr extends un{static get __EMPTY_NODE(){return Ft}static set __EMPTY_NODE(e){Ft=e}compare(e,t){return Re(e.name,t.name)}isDefinedOn(e){throw je("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(Ie,Ft)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Ft)}toString(){return".key"}}const Fe=new Mr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class F{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??F.RED,this.left=s??H.EMPTY_NODE,this.right=r??H.EMPTY_NODE}copy(e,t,i,s,r){return new F(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return H.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return H.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,F.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,F.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}F.RED=!0;F.BLACK=!1;class Dc{copy(e,t,i,s,r){return this}insert(e,t,i){return new F(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class H{constructor(e,t=H.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new H(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,F.BLACK,null,null))}remove(e){return new H(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,F.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Bt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Bt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Bt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Bt(this.root_,null,this.comparator_,!0,e)}}H.EMPTY_NODE=new Dc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(n,e){return Re(n.name,e.name)}function Ei(n,e){return Re(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn;function Mc(n){Hn=n}const Or=function(n){return typeof n=="number"?"number:"+fr(n):"string:"+n},Lr=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ee(e,".sv"),"Priority must be a string or number.")}else f(n===Hn||n.isEmpty(),"priority of unexpected type.");f(n===Hn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is;class L{static set __childrenNodeConstructor(e){Is=e}static get __childrenNodeConstructor(){return Is}constructor(e,t=L.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Lr(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new L(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:g(e)===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:L.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=g(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||me(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,L.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Or(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=fr(this.value_):e+=this.value_,this.lazyHash_=hr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===L.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof L.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=L.VALUE_TYPE_ORDER.indexOf(t),r=L.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}L.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fr,Br;function Oc(n){Fr=n}function Lc(n){Br=n}class Fc extends un{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Re(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Ie,new L("[PRIORITY-POST]",Br))}makePost(e,t){const i=Fr(e);return new y(t,new L("[PRIORITY-POST]",i))}toString(){return".priority"}}const A=new Fc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=Math.log(2);class Uc{constructor(e){const t=r=>parseInt(Math.log(r)/Bc,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const zt=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new F(h,u.node,F.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=s(l,p),C=s(p+1,c);return u=n[p],h=t?t(u):u,new F(h,u.node,F.BLACK,_,C)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,C){const P=u-_,ne=u;u-=_;const ie=s(P+1,ne),ve=n[P],wn=t?t(ve):ve;p(new F(wn,ve.node,C,null,ie))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const C=l.nextBitIsOne(),P=Math.pow(2,l.count-(_+1));C?h(P,F.BLACK):(h(P,F.BLACK),h(P,F.RED))}return d},o=new Uc(n.length),a=r(o);return new H(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let An;const Pe={};class se{static get Default(){return f(Pe&&A,"ChildrenNode.ts has not been loaded"),An=An||new se({".priority":Pe},{".priority":A}),An}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Be(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof H?t:null}hasIndex(e){return ee(this.indexSet_,e.toString())}addIndex(e,t){f(e!==Fe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=zt(i,e.getCompare()):a=Pe;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new se(d,c)}addToIndexes(e,t){const i=Vt(this.indexes_,(s,r)=>{const o=Be(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===Pe)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(y.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),zt(a,o.getCompare())}else return Pe;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new y(e.name,a))),l.insert(e,e.node)}});return new se(i,this.indexSet_)}removeFromIndexes(e,t){const i=Vt(this.indexes_,s=>{if(s===Pe)return s;{const r=t.get(e.name);return r?s.remove(new y(e.name,r)):s}});return new se(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let et;class m{static get EMPTY_NODE(){return et||(et=new m(new H(Ei),null,se.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Lr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||et}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?et:t}}getChild(e){const t=g(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new y(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?et:this.priorityNode_;return new m(s,o,r)}}updateChild(e,t){const i=g(e);if(i===null)return t;{f(g(e)!==".priority"||me(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(T(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(A,(o,a)=>{t[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Or(this.getPriority().val())+":"),this.forEachChild(A,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":hr(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===At?-1:0}withIndex(e){if(e===Fe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Fe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(A),s=t.getIterator(A);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Fe?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Wc extends m{constructor(){super(new H(Ei),m.EMPTY_NODE,se.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const At=new Wc;Object.defineProperties(y,{MIN:{value:new y(Ue,m.EMPTY_NODE)},MAX:{value:new y(Ie,At)}});Mr.__EMPTY_NODE=m.EMPTY_NODE;L.__childrenNodeConstructor=m;Mc(At);Lc(At);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vc=!0;function x(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new L(t,x(e))}if(!(n instanceof Array)&&Vc){const t=[];let i=!1;if(U(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=x(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new y(o,l)))}}),t.length===0)return m.EMPTY_NODE;const r=zt(t,xc,o=>o.name,Ei);if(i){const o=zt(t,A.getCompare());return new m(r,x(e),new se({".priority":o},{".priority":A}))}else return new m(r,x(e),se.Default)}else{let t=m.EMPTY_NODE;return U(n,(i,s)=>{if(ee(n,i)&&i.substring(0,1)!=="."){const r=x(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(x(e))}}Oc(x);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc extends un{constructor(e){super(),this.indexPath_=e,f(!v(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Re(e.name,t.name):r}makePost(e,t){const i=x(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new y(t,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,At);return new y(Ie,e)}toString(){return gt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c extends un{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Re(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const i=x(e);return new y(t,i)}toString(){return".value"}}const Gc=new $c;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return{type:"value",snapshotNode:n}}function We(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function yt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function vt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Yc(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(yt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(We(t,i)):o.trackChildChange(vt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(A,(s,r)=>{t.hasChild(s)||i.trackChildChange(yt(s,r))}),t.isLeafNode()||t.forEachChild(A,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(vt(s,r,o))}else i.trackChildChange(We(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.indexedFilter_=new wi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ct.getStartPost_(e),this.endPost_=Ct.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new y(t,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=m.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(A,(o,a)=>{r.matches(new y(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ct(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new y(t,i))||(i=m.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new y(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!i.isEmpty()&&p>=0)return r?.trackChildChange(vt(t,i,u)),a.updateImmediateChild(t,i);{r?.trackChildChange(yt(t,u));const C=a.updateImmediateChild(t,m.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(We(h.name,h.node)),C.updateImmediateChild(h.name,h.node)):C}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(yt(c.name,c.node)),r.trackChildChange(We(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=A}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ue}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ie}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===A}copy(){const e=new bi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function zc(n){return n.loadsAllData()?new wi(n.getIndex()):n.hasLimit()?new qc(n):new Ct(n)}function Ss(n){const e={};if(n.isDefault())return e;let t;if(n.index_===A?t="$priority":n.index_===Gc?t="$value":n.index_===Fe?t="$key":(f(n.index_ instanceof Hc,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=M(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=M(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+M(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=M(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+M(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ts(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==A&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt extends Ar{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=kt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=jt.getListenId_(e,i),a={};this.listens_[o]=a;const l=Ss(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),Be(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=jt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Ss(e._queryParams),i=e._path.toString(),s=new Tt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ga(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=ft(a.responseText)}catch{V("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&V("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return{value:null,children:new Map}}function Wr(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=g(e);n.children.has(i)||n.children.set(i,Kt());const s=n.children.get(i);e=T(e),Wr(s,e,t)}}function $n(n,e,t){n.value!==null?t(e,n.value):Kc(n,(i,s)=>{const r=new w(e.toString()+"/"+i);$n(s,r,t)})}function Kc(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns=10*1e3,Xc=30*1e3,Jc=300*1e3;class Zc{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Qc(e);const i=Ns+(Xc-Ns)*Math.random();ot(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;U(e,(s,r)=>{r>0&&ee(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),ot(this.reportStats_.bind(this),Math.floor(Math.random()*2*Jc))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(j||(j={}));function Ii(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Si(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ti(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=j.ACK_USER_WRITE,this.source=Ii()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new w(e));return new Qt(E(),t,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Qt(T(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,t){this.source=e,this.path=t,this.type=j.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new Et(this.source,E()):new Et(this.source,T(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=j.OVERWRITE}operationForChild(e){return v(this.path)?new Se(this.source,E(),this.snap.getImmediateChild(e)):new Se(this.source,T(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=j.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new w(e));return t.isEmpty()?null:t.value?new Se(this.source,E(),t.value):new Ve(this.source,E(),t)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ve(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=g(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function tu(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Yc(o.childName,o.snapshotNode))}),tt(n,s,"child_removed",e,i,t),tt(n,s,"child_added",e,i,t),tt(n,s,"child_moved",r,i,t),tt(n,s,"child_changed",e,i,t),tt(n,s,"value",e,i,t),s}function tt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>iu(n,a,l)),o.forEach(a=>{const l=nu(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function nu(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function iu(n,e,t){if(e.childName==null||t.childName==null)throw je("Should only compare child_ events.");const i=new y(e.childName,e.snapshotNode),s=new y(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n,e){return{eventCache:n,serverCache:e}}function at(n,e,t,i){return hn(new ge(e,t,i),n.serverCache)}function Vr(n,e,t,i){return hn(n.eventCache,new ge(e,t,i))}function Xt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Te(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pn;const su=()=>(Pn||(Pn=new H(Hl)),Pn);class I{static fromObject(e){let t=new I(null);return U(e,(i,s)=>{t=t.set(new w(i),s)}),t}constructor(e,t=su()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const i=g(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:k(new w(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=g(e),i=this.children.get(t);return i!==null?i.subtree(T(e)):new I(null)}}set(e,t){if(v(e))return new I(t,this.children);{const i=g(e),r=(this.children.get(i)||new I(null)).set(T(e),t),o=this.children.insert(i,r);return new I(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new I(null):new I(null,this.children);{const t=g(e),i=this.children.get(t);if(i){const s=i.remove(T(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new I(null):new I(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=g(e),i=this.children.get(t);return i?i.get(T(e)):null}}setTree(e,t){if(v(e))return t;{const i=g(e),r=(this.children.get(i)||new I(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new I(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(k(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(v(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(T(e),k(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,i){if(v(e))return this;{this.value&&i(t,this.value);const s=g(e),r=this.children.get(s);return r?r.foreachOnPath_(T(e),k(t,s),i):new I(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(k(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.writeTree_=e}static empty(){return new Q(new I(null))}}function lt(n,e,t){if(v(e))return new Q(new I(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=W(s,e);return r=r.updateChild(o,t),new Q(n.writeTree_.set(s,r))}else{const s=new I(t),r=n.writeTree_.setTree(e,s);return new Q(r)}}}function Gn(n,e,t){let i=n;return U(t,(s,r)=>{i=lt(i,k(e,s),r)}),i}function Rs(n,e){if(v(e))return Q.empty();{const t=n.writeTree_.setTree(e,new I(null));return new Q(t)}}function Yn(n,e){return ke(n,e)!=null}function ke(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(W(t.path,e)):null}function ks(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(A,(i,s)=>{e.push(new y(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new y(i,s.value))}),e}function pe(n,e){if(v(e))return n;{const t=ke(n,e);return t!=null?new Q(new I(t)):new Q(n.writeTree_.subtree(e))}}function qn(n){return n.writeTree_.isEmpty()}function He(n,e){return Hr(E(),n.writeTree_,e)}function Hr(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Hr(k(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(k(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,e){return qr(e,n)}function ru(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=lt(n.visibleWrites,e,t)),n.lastWriteId=i}function ou(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Gn(n.visibleWrites,e,t),n.lastWriteId=i}function au(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function lu(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&cu(a,i.path)?s=!1:G(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return uu(n),!0;if(i.snap)n.visibleWrites=Rs(n.visibleWrites,i.path);else{const a=i.children;U(a,l=>{n.visibleWrites=Rs(n.visibleWrites,k(i.path,l))})}return!0}else return!1}function cu(n,e){if(n.snap)return G(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&G(k(n.path,t),e))return!0;return!1}function uu(n){n.visibleWrites=$r(n.allWrites,hu,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function hu(n){return n.visible}function $r(n,e,t){let i=Q.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)G(t,o)?(a=W(t,o),i=lt(i,a,r.snap)):G(o,t)&&(a=W(o,t),i=lt(i,E(),r.snap.getChild(a)));else if(r.children){if(G(t,o))a=W(t,o),i=Gn(i,a,r.children);else if(G(o,t))if(a=W(o,t),v(a))i=Gn(i,E(),r.children);else{const l=Be(r.children,g(a));if(l){const c=l.getChild(T(a));i=lt(i,E(),c)}}}else throw je("WriteRecord should have .snap or .children")}}return i}function Gr(n,e,t,i,s){if(!i&&!s){const r=ke(n.visibleWrites,e);if(r!=null)return r;{const o=pe(n.visibleWrites,e);if(qn(o))return t;if(t==null&&!Yn(o,E()))return null;{const a=t||m.EMPTY_NODE;return He(o,a)}}}else{const r=pe(n.visibleWrites,e);if(!s&&qn(r))return t;if(!s&&t==null&&!Yn(r,E()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(G(c.path,e)||G(e,c.path))},a=$r(n.allWrites,o,e),l=t||m.EMPTY_NODE;return He(a,l)}}}function du(n,e,t){let i=m.EMPTY_NODE;const s=ke(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(A,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=pe(n.visibleWrites,e);return t.forEachChild(A,(o,a)=>{const l=He(pe(r,new w(o)),a);i=i.updateImmediateChild(o,l)}),ks(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=pe(n.visibleWrites,e);return ks(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function fu(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=k(e,t);if(Yn(n.visibleWrites,r))return null;{const o=pe(n.visibleWrites,r);return qn(o)?s.getChild(t):He(o,s.getChild(t))}}function pu(n,e,t,i){const s=k(e,t),r=ke(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=pe(n.visibleWrites,s);return He(o,i.getNode().getImmediateChild(t))}else return null}function _u(n,e){return ke(n.visibleWrites,e)}function mu(n,e,t,i,s,r,o){let a;const l=pe(n.visibleWrites,e),c=ke(l,E());if(c!=null)a=c;else if(t!=null)a=He(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&d.length<s;)u(p,i)!==0&&d.push(p),p=h.getNext();return d}else return[]}function gu(){return{visibleWrites:Q.empty(),allWrites:[],lastWriteId:-1}}function Jt(n,e,t,i){return Gr(n.writeTree,n.treePath,e,t,i)}function Ni(n,e){return du(n.writeTree,n.treePath,e)}function As(n,e,t,i){return fu(n.writeTree,n.treePath,e,t,i)}function Zt(n,e){return _u(n.writeTree,k(n.treePath,e))}function yu(n,e,t,i,s,r){return mu(n.writeTree,n.treePath,e,t,i,s,r)}function Ri(n,e,t){return pu(n.writeTree,n.treePath,e,t)}function Yr(n,e){return qr(k(n.treePath,e),n.writeTree)}function qr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,vt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,yt(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,We(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,vt(i,e.snapshotNode,s.oldSnap));else throw je("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const zr=new Cu;class ki{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ge(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ri(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Te(this.viewCache_),r=yu(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n){return{filter:n}}function wu(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function bu(n,e,t,i,s){const r=new vu;let o,a;if(t.type===j.OVERWRITE){const c=t;c.source.fromUser?o=zn(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=en(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===j.MERGE){const c=t;c.source.fromUser?o=Su(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=jn(n,e,c.path,c.children,i,s,a,r))}else if(t.type===j.ACK_USER_WRITE){const c=t;c.revert?o=Ru(n,e,c.path,i,s,r):o=Tu(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===j.LISTEN_COMPLETE)o=Nu(n,e,t.path,i,r);else throw je("Unknown operation type: "+t.type);const l=r.getChanges();return Iu(e,o,l),{viewCache:o,changes:l}}function Iu(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Xt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Ur(Xt(e)))}}function jr(n,e,t,i,s,r){const o=e.eventCache;if(Zt(i,t)!=null)return e;{let a,l;if(v(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Te(e),d=c instanceof m?c:m.EMPTY_NODE,u=Ni(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Jt(i,Te(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(t);if(c===".priority"){f(me(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=As(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=T(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=As(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Ri(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return at(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function en(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=g(t);if(!l.isCompleteForPath(t)&&me(t)>1)return e;const _=T(t),P=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=d.updatePriority(l.getNode(),P):c=d.updateChild(l.getNode(),p,P,_,zr,null)}const u=Vr(e,c,l.isFullyInitialized()||v(t),d.filtersNodes()),h=new ki(s,u,r);return jr(n,u,t,s,h,a)}function zn(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new ki(s,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=at(e,c,!0,n.filter.filtersNodes());else{const u=g(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=at(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=T(t),p=a.getNode().getImmediateChild(u);let _;if(v(h))_=i;else{const C=d.getCompleteChild(u);C!=null?yi(h)===".priority"&&C.getChild(Dr(h)).isEmpty()?_=C:_=C.updateChild(h,i):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const C=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=at(e,C,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Ps(n,e){return n.eventCache.isCompleteForChild(e)}function Su(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=k(t,l);Ps(e,g(d))&&(a=zn(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=k(t,l);Ps(e,g(d))||(a=zn(n,a,d,c,s,r,o))}),a}function Ds(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function jn(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=i:c=new I(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Ds(n,p,h);l=en(n,l,new w(u),_,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),C=Ds(n,_,h);l=en(n,l,new w(u),C,s,r,o,a)}}),l}function Tu(n,e,t,i,s,r,o){if(Zt(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return en(n,e,t,l.getNode().getChild(t),s,r,a,o);if(v(t)){let c=new I(null);return l.getNode().forEachChild(Fe,(d,u)=>{c=c.set(new w(d),u)}),jn(n,e,t,c,s,r,a,o)}else return e}else{let c=new I(null);return i.foreach((d,u)=>{const h=k(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),jn(n,e,t,c,s,r,a,o)}}function Nu(n,e,t,i,s){const r=e.serverCache,o=Vr(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return jr(n,o,t,i,zr,s)}function Ru(n,e,t,i,s,r){let o;if(Zt(i,t)!=null)return e;{const a=new ki(i,e,s),l=e.eventCache.getNode();let c;if(v(t)||g(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Jt(i,Te(e));else{const u=e.serverCache.getNode();f(u instanceof m,"serverChildren would be complete if leaf node"),d=Ni(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=g(t);let u=Ri(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,T(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,m.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Jt(i,Te(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Zt(i,E())!=null,at(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new wi(i.getIndex()),r=zc(i);this.processor_=Eu(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new ge(l,o.isFullyInitialized(),s.filtersNodes()),u=new ge(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=hn(u,d),this.eventGenerator_=new eu(this.query_)}get query(){return this.query_}}function Au(n){return n.viewCache_.serverCache.getNode()}function Pu(n){return Xt(n.viewCache_)}function Du(n,e){const t=Te(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(g(e)).isEmpty())?t.getChild(e):null}function xs(n){return n.eventRegistrations_.length===0}function xu(n,e){n.eventRegistrations_.push(e)}function Ms(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Os(n,e,t,i){e.type===j.MERGE&&e.source.queryId!==null&&(f(Te(n.viewCache_),"We should always have a full cache before handling merges"),f(Xt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=bu(n.processor_,s,e,t,i);return wu(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Kr(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Mu(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(A,(r,o)=>{i.push(We(r,o))}),t.isFullyInitialized()&&i.push(Ur(t.getNode())),Kr(n,i,t.getNode(),e)}function Kr(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return tu(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn;class Qr{constructor(){this.views=new Map}}function Ou(n){f(!tn,"__referenceConstructor has already been defined"),tn=n}function Lu(){return f(tn,"Reference.ts has not been loaded"),tn}function Fu(n){return n.views.size===0}function Ai(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Os(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Os(o,e,t,i));return r}}function Xr(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Jt(t,s?i:null),l=!1;a?l=!0:i instanceof m?(a=Ni(t,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=hn(new ge(a,l,!1),new ge(i,s,!1));return new ku(e,c)}return o}function Bu(n,e,t,i,s,r){const o=Xr(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),xu(o,t),Mu(o,t)}function Uu(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ye(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Ms(c,t,i)),xs(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Ms(l,t,i)),xs(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ye(n)&&r.push(new(Lu())(e._repo,e._path)),{removed:r,events:o}}function Jr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function _e(n,e){let t=null;for(const i of n.views.values())t=t||Du(i,e);return t}function Zr(n,e){if(e._queryParams.loadsAllData())return fn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function eo(n,e){return Zr(n,e)!=null}function ye(n){return fn(n)!=null}function fn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;function Wu(n){f(!nn,"__referenceConstructor has already been defined"),nn=n}function Vu(){return f(nn,"Reference.ts has not been loaded"),nn}let Hu=1;class Ls{constructor(e){this.listenProvider_=e,this.syncPointTree_=new I(null),this.pendingWriteTree_=gu(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function to(n,e,t,i,s){return ru(n.pendingWriteTree_,e,t,i,s),s?Qe(n,new Se(Ii(),e,t)):[]}function $u(n,e,t,i){ou(n.pendingWriteTree_,e,t,i);const s=I.fromObject(t);return Qe(n,new Ve(Ii(),e,s))}function ue(n,e,t=!1){const i=au(n.pendingWriteTree_,e);if(lu(n.pendingWriteTree_,e)){let r=new I(null);return i.snap!=null?r=r.set(E(),!0):U(i.children,o=>{r=r.set(new w(o),!0)}),Qe(n,new Qt(i.path,r,t))}else return[]}function Pt(n,e,t){return Qe(n,new Se(Si(),e,t))}function Gu(n,e,t){const i=I.fromObject(t);return Qe(n,new Ve(Si(),e,i))}function Yu(n,e){return Qe(n,new Et(Si(),e))}function qu(n,e,t){const i=Di(n,t);if(i){const s=xi(i),r=s.path,o=s.queryId,a=W(r,e),l=new Et(Ti(o),a);return Mi(n,r,l)}else return[]}function sn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||eo(o,e))){const l=Uu(o,e,t,i);Fu(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>ye(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=Ku(h);for(let _=0;_<p.length;++_){const C=p[_],P=C.query,ne=ro(n,C);n.listenProvider_.startListening(ct(P),wt(n,P),ne.hashFn,ne.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(ct(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(pn(h));n.listenProvider_.stopListening(ct(h),p)}))}Qu(n,c)}return a}function no(n,e,t,i){const s=Di(n,i);if(s!=null){const r=xi(s),o=r.path,a=r.queryId,l=W(o,e),c=new Se(Ti(a),l,t);return Mi(n,o,c)}else return[]}function zu(n,e,t,i){const s=Di(n,i);if(s){const r=xi(s),o=r.path,a=r.queryId,l=W(o,e),c=I.fromObject(t),d=new Ve(Ti(a),l,c);return Mi(n,o,d)}else return[]}function Kn(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,p)=>{const _=W(h,s);r=r||_e(p,_),o=o||ye(p)});let a=n.syncPointTree_.get(s);a?(o=o||ye(a),r=r||_e(a,E())):(a=new Qr,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const C=_e(_,E());C&&(r=r.updateImmediateChild(p,C))}));const c=eo(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=pn(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=Xu();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=dn(n.pendingWriteTree_,s);let u=Bu(a,e,t,d,r,l);if(!c&&!o&&!i){const h=Zr(a,e);u=u.concat(Ju(n,e,h))}return u}function Pi(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=W(o,e),c=_e(a,l);if(c)return c});return Gr(s,e,r,t,!0)}function ju(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=W(c,t);i=i||_e(d,u)});let s=n.syncPointTree_.get(t);s?i=i||_e(s,E()):(s=new Qr,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new ge(i,!0,!1):null,a=dn(n.pendingWriteTree_,e._path),l=Xr(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return Pu(l)}function Qe(n,e){return io(e,n.syncPointTree_,null,dn(n.pendingWriteTree_,E()))}function io(n,e,t,i){if(v(n.path))return so(n,e,t,i);{const s=e.get(E());t==null&&s!=null&&(t=_e(s,E()));let r=[];const o=g(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=Yr(i,o);r=r.concat(io(a,l,c,d))}return s&&(r=r.concat(Ai(s,n,i,t))),r}}function so(n,e,t,i){const s=e.get(E());t==null&&s!=null&&(t=_e(s,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Yr(i,o),d=n.operationForChild(o);d&&(r=r.concat(so(d,a,l,c)))}),s&&(r=r.concat(Ai(s,n,i,t))),r}function ro(n,e){const t=e.query,i=wt(n,t);return{hashFn:()=>(Au(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?qu(n,t._path,i):Yu(n,t._path);{const r=Yl(s,t);return sn(n,t,null,r)}}}}function wt(n,e){const t=pn(e);return n.queryToTagMap.get(t)}function pn(n){return n._path.toString()+"$"+n._queryIdentifier}function Di(n,e){return n.tagToQueryMap.get(e)}function xi(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new w(n.substr(0,e))}}function Mi(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=dn(n.pendingWriteTree_,e);return Ai(i,t,s,null)}function Ku(n){return n.fold((e,t,i)=>{if(t&&ye(t))return[fn(t)];{let s=[];return t&&(s=Jr(t)),U(i,(r,o)=>{s=s.concat(o)}),s}})}function ct(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Vu())(n._repo,n._path):n}function Qu(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=pn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Xu(){return Hu++}function Ju(n,e,t){const i=e._path,s=wt(n,e),r=ro(n,t),o=n.listenProvider_.startListening(ct(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!ye(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!v(c)&&d&&ye(d))return[fn(d).query];{let h=[];return d&&(h=h.concat(Jr(d).map(p=>p.query))),U(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(ct(d),wt(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Oi(t)}node(){return this.node_}}class Li{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=k(this.path_,e);return new Li(this.syncTree_,t)}node(){return Pi(this.syncTree_,this.path_)}}const Zu=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Fs=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return eh(n[".sv"],e,t);if(typeof n[".sv"]=="object")return th(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},eh=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},th=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},oo=function(n,e,t,i){return Fi(e,new Li(t,n),i)},ao=function(n,e,t){return Fi(n,new Oi(e),t)};function Fi(n,e,t){const i=n.getPriority().val(),s=Fs(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Fs(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new L(a,x(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new L(s))),o.forEachChild(A,(a,l)=>{const c=Fi(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Ui(n,e){let t=e instanceof w?e:new w(e),i=n,s=g(t);for(;s!==null;){const r=Be(i.node.children,s)||{children:{},childCount:0};i=new Bi(s,i,r),t=T(t),s=g(t)}return i}function Xe(n){return n.node.value}function lo(n,e){n.node.value=e,Qn(n)}function co(n){return n.node.childCount>0}function nh(n){return Xe(n)===void 0&&!co(n)}function _n(n,e){U(n.node.children,(t,i)=>{e(new Bi(t,n,i))})}function uo(n,e,t,i){t&&e(n),_n(n,s=>{uo(s,e,!0)})}function ih(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Dt(n){return new w(n.parent===null?n.name:Dt(n.parent)+"/"+n.name)}function Qn(n){n.parent!==null&&sh(n.parent,n.name,n)}function sh(n,e,t){const i=nh(t),s=ee(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Qn(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Qn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=/[\[\].#$\/\u0000-\u001F\u007F]/,oh=/[\[\].#$\u0000-\u001F\u007F]/,Dn=10*1024*1024,Wi=function(n){return typeof n=="string"&&n.length!==0&&!rh.test(n)},ho=function(n){return typeof n=="string"&&n.length!==0&&!oh.test(n)},ah=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ho(n)},lh=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!fi(n)||n&&typeof n=="object"&&ee(n,".sv")},fo=function(n,e,t,i){i&&e===void 0||mn(ln(n,"value"),e,t)},mn=function(n,e,t){const i=t instanceof w?new Sc(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ee(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ee(i)+" with contents = "+e.toString());if(fi(e))throw new Error(n+"contains "+e.toString()+" "+Ee(i));if(typeof e=="string"&&e.length>Dn/3&&cn(e)>Dn)throw new Error(n+"contains a string greater than "+Dn+" utf8 bytes "+Ee(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(U(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Wi(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ee(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Tc(i,o),mn(n,a,i),Nc(i)}),s&&r)throw new Error(n+' contains ".value" child '+Ee(i)+" in addition to actual children.")}},ch=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=gt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Wi(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ic);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&G(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},uh=function(n,e,t,i){const s=ln(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];U(e,(o,a)=>{const l=new w(o);if(mn(s,a,k(t,l)),yi(l)===".priority"&&!lh(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),ch(s,r)},po=function(n,e,t,i){if(!ho(t))throw new Error(ln(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},hh=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),po(n,e,t)},Vi=function(n,e){if(g(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},dh=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Wi(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!ah(t))throw new Error(ln(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function gn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!vi(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function _o(n,e,t){gn(n,t),mo(n,i=>vi(i,e))}function Y(n,e,t){gn(n,t),mo(n,i=>G(i,e)||G(e,i))}function mo(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(ph(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function ph(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();rt&&B("event: "+t.toString()),Ke(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="repo_interrupt",mh=25;class gh{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new fh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Kt(),this.transactionQueueTree_=new Bi,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function yh(n,e,t){if(n.stats_=mi(n.repoInfo_),n.forceRestClient_||Kl())n.server_=new jt(n.repoInfo_,(i,s,r,o)=>{Bs(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Us(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new oe(n.repoInfo_,e,(i,s,r,o)=>{Bs(n,i,s,r,o)},i=>{Us(n,i)},i=>{vh(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=ec(n.repoInfo_,()=>new Zc(n.stats_,n.server_)),n.infoData_=new jc,n.infoSyncTree_=new Ls({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=Pt(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Hi(n,"connected",!1),n.serverSyncTree_=new Ls({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);Y(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function go(n){const t=n.infoData_.getNode(new w(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function yn(n){return Zu({timestamp:go(n)})}function Bs(n,e,t,i,s){n.dataUpdateCount++;const r=new w(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=Vt(t,c=>x(c));o=zu(n.serverSyncTree_,r,l,s)}else{const l=x(t);o=no(n.serverSyncTree_,r,l,s)}else if(i){const l=Vt(t,c=>x(c));o=Gu(n.serverSyncTree_,r,l)}else{const l=x(t);o=Pt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=$e(n,r)),Y(n.eventQueue_,a,o)}function Us(n,e){Hi(n,"connected",e),e===!1&&bh(n)}function vh(n,e){U(e,(t,i)=>{Hi(n,t,i)})}function Hi(n,e,t){const i=new w("/.info/"+e),s=x(t);n.infoData_.updateSnapshot(i,s);const r=Pt(n.infoSyncTree_,i,s);Y(n.eventQueue_,i,r)}function $i(n){return n.nextWriteId_++}function Ch(n,e,t){const i=ju(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=x(s).withIndex(e._queryParams.getIndex());Kn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Pt(n.serverSyncTree_,e._path,r);else{const a=wt(n.serverSyncTree_,e);o=no(n.serverSyncTree_,e._path,r,a)}return Y(n.eventQueue_,e._path,o),sn(n.serverSyncTree_,e,t,null,!0),r},s=>(xt(n,"get for query "+M(e)+" failed: "+s),Promise.reject(new Error(s))))}function Eh(n,e,t,i,s){xt(n,"set",{path:e.toString(),value:t,priority:i});const r=yn(n),o=x(t,i),a=Pi(n.serverSyncTree_,e),l=ao(o,a,r),c=$i(n),d=to(n.serverSyncTree_,e,l,c,!0);gn(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||V("set at "+e+" failed: "+h);const C=ue(n.serverSyncTree_,c,!_);Y(n.eventQueue_,e,C),Xn(n,s,h,p)});const u=Yi(n,e);$e(n,u),Y(n.eventQueue_,u,[])}function wh(n,e,t,i){xt(n,"update",{path:e.toString(),value:t});let s=!0;const r=yn(n),o={};if(U(t,(a,l)=>{s=!1,o[a]=oo(k(e,a),x(l),n.serverSyncTree_,r)}),s)B("update() called with empty data.  Don't do anything."),Xn(n,i,"ok",void 0);else{const a=$i(n),l=$u(n.serverSyncTree_,e,o,a);gn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||V("update at "+e+" failed: "+c);const h=ue(n.serverSyncTree_,a,!u),p=h.length>0?$e(n,e):e;Y(n.eventQueue_,p,h),Xn(n,i,c,d)}),U(t,c=>{const d=Yi(n,k(e,c));$e(n,d)}),Y(n.eventQueue_,e,[])}}function bh(n){xt(n,"onDisconnectEvents");const e=yn(n),t=Kt();$n(n.onDisconnect_,E(),(s,r)=>{const o=oo(s,r,n.serverSyncTree_,e);Wr(t,s,o)});let i=[];$n(t,E(),(s,r)=>{i=i.concat(Pt(n.serverSyncTree_,s,r));const o=Yi(n,s);$e(n,o)}),n.onDisconnect_=Kt(),Y(n.eventQueue_,E(),i)}function Ih(n,e,t){let i;g(e._path)===".info"?i=Kn(n.infoSyncTree_,e,t):i=Kn(n.serverSyncTree_,e,t),_o(n.eventQueue_,e._path,i)}function yo(n,e,t){let i;g(e._path)===".info"?i=sn(n.infoSyncTree_,e,t):i=sn(n.serverSyncTree_,e,t),_o(n.eventQueue_,e._path,i)}function Sh(n){n.persistentConnection_&&n.persistentConnection_.interrupt(_h)}function xt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),B(t,...e)}function Xn(n,e,t,i){e&&Ke(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function vo(n,e,t){return Pi(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function Gi(n,e=n.transactionQueueTree_){if(e||vn(n,e),Xe(e)){const t=Eo(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Th(n,Dt(e),t)}else co(e)&&_n(e,t=>{Gi(n,t)})}function Th(n,e,t){const i=t.map(c=>c.currentWriteId),s=vo(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=W(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{xt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(ue(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();vn(n,Ui(n.transactionQueueTree_,e)),Gi(n,n.transactionQueueTree_),Y(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)Ke(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{V("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}$e(n,e)}},o)}function $e(n,e){const t=Co(n,e),i=Dt(t),s=Eo(n,t);return Nh(n,s,i),i}function Nh(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=W(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(ue(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=mh)d=!0,u="maxretry",s=s.concat(ue(n.serverSyncTree_,l.currentWriteId,!0));else{const h=vo(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){mn("transaction failed: Data returned ",p,l.path);let _=x(p);typeof p=="object"&&p!=null&&ee(p,".priority")||(_=_.updatePriority(h.getPriority()));const P=l.currentWriteId,ne=yn(n),ie=ao(_,h,ne);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=ie,l.currentWriteId=$i(n),o.splice(o.indexOf(P),1),s=s.concat(to(n.serverSyncTree_,l.path,ie,l.currentWriteId,l.applyLocally)),s=s.concat(ue(n.serverSyncTree_,P,!0))}else d=!0,u="nodata",s=s.concat(ue(n.serverSyncTree_,l.currentWriteId,!0))}Y(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}vn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Ke(i[a]);Gi(n,n.transactionQueueTree_)}function Co(n,e){let t,i=n.transactionQueueTree_;for(t=g(e);t!==null&&Xe(i)===void 0;)i=Ui(i,t),e=T(e),t=g(e);return i}function Eo(n,e){const t=[];return wo(n,e,t),t.sort((i,s)=>i.order-s.order),t}function wo(n,e,t){const i=Xe(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);_n(e,s=>{wo(n,s,t)})}function vn(n,e){const t=Xe(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,lo(e,t.length>0?t:void 0)}_n(e,i=>{vn(n,i)})}function Yi(n,e){const t=Dt(Co(n,e)),i=Ui(n.transactionQueueTree_,e);return ih(i,s=>{xn(n,s)}),xn(n,i),uo(i,s=>{xn(n,s)}),t}function xn(n,e){const t=Xe(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(ue(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?lo(e,void 0):t.length=r+1,Y(n.eventQueue_,Dt(e),s);for(let o=0;o<i.length;o++)Ke(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rh(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function kh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):V(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ws=function(n,e){const t=Ah(n),i=t.namespace;t.domain==="firebase.com"&&ce(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ce("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Wl();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new br(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new w(t.pathString)}},Ah=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=Rh(n.substring(d,u)));const h=kh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Ph=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Vs.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Vs.charAt(e[s]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+M(this.snapshot.exportVal())}}class Io{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class zi{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return v(this._path)?null:yi(this._path)}get ref(){return new te(this._repo,this._path)}get _queryIdentifier(){const e=Ts(this._queryParams),t=pi(e);return t==="{}"?"default":t}get _queryObject(){return Ts(this._queryParams)}isEqual(e){if(e=Ne(e),!(e instanceof zi))return!1;const t=this._repo===e._repo,i=vi(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+bc(this._path)}}class te extends zi{constructor(e,t){super(e,t,new bi,!1)}get parent(){const e=Dr(this._path);return e===null?null:new te(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ge{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new w(e),i=Ye(this.ref,e);return new Ge(this._node.getChild(t),i,A)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Ge(s,Ye(this.ref,i),A)))}hasChild(e){const t=new w(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function J(n,e){return n=Ne(n),n._checkNotDeleted("ref"),e!==void 0?Ye(n._root,e):n._root}function Ye(n,e){return n=Ne(n),g(n._path)===null?hh("child","path",e):po("child","path",e),new te(n._repo,k(n._path,e))}function Dh(n,e){n=Ne(n),Vi("push",n._path),fo("push",e,n._path,!0);const t=go(n._repo),i=Ph(t),s=Ye(n,i),r=Ye(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function xh(n){return Vi("remove",n._path),Mt(n,null)}function Mt(n,e){n=Ne(n),Vi("set",n._path),fo("set",e,n._path,!1);const t=new Tt;return Eh(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function So(n,e){uh("update",e,n._path);const t=new Tt;return wh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Mh(n){n=Ne(n);const e=new qi(()=>{}),t=new Ot(e);return Ch(n._repo,n,t).then(i=>new Ge(i,new te(n._repo,n._path),n._queryParams.getIndex()))}class Ot{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new bo("value",this,new Ge(e.snapshotNode,new te(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Io(this,e,t):null}matches(e){return e instanceof Ot?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Cn{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Io(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const i=Ye(new te(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new bo(e.type,this,new Ge(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Cn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function To(n,e,t,i,s){const r=new qi(t,void 0),o=e==="value"?new Ot(r):new Cn(e,r);return Ih(n._repo,n,o),()=>yo(n._repo,n,o)}function No(n,e,t,i){return To(n,"value",e)}function Oh(n,e,t,i){return To(n,"child_added",e)}function Lh(n,e,t){let i=null;const s=t?new qi(t):null;e==="value"?i=new Ot(s):e&&(i=new Cn(e,s)),yo(n._repo,n,i)}Ou(te);Wu(te);/**
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
 */const Fh="FIREBASE_DATABASE_EMULATOR_HOST",Jn={};let Bh=!1;function Uh(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=hi(r);n.repoInfo_=new br(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Wh(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ce("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ws(r,s),a=o.repoInfo,l;typeof process<"u"&&ls&&(l=ls[Fh]),l?(r=`http://${l}?ns=${a.namespace}`,o=Ws(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Xl(n.name,n.options,e);dh("Invalid Firebase Database URL",o),v(o.path)||ce("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Hh(a,n,c,new Ql(n,t));return new $h(d,n)}function Vh(n,e){const t=Jn[e];(!t||t[n.key]!==n)&&ce(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Sh(n),delete t[n.key]}function Hh(n,e,t,i){let s=Jn[e.name];s||(s={},Jn[e.name]=s);let r=s[n.toURLString()];return r&&ce("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new gh(n,Bh,t,i),s[n.toURLString()]=r,r}class $h{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(yh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new te(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Vh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ce("Cannot call "+e+" on a deleted database.")}}function Gh(n=El(),e){const t=ml(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=ta("database");i&&Yh(t,...i)}return t}function Yh(n,e,t,i={}){n=Ne(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Ht(i,r.repoInfo_.emulatorOptions))return;ce("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ce('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ut(Ut.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:ia(i.mockUserToken,n.app.options.projectId);o=new Ut(a)}hi(e)&&(na(e),oa("Database",!0)),Uh(r,s,i,o)}/**
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
 */function qh(n){Ml(Cl),Gt(new pt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Wh(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Oe(cs,us,n),Oe(cs,us,"esm2020")}oe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};oe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};qh();const rn=document.getElementById("localVideo"),K=document.getElementById("remoteVideo"),R=document.getElementById("sharedVideo"),Ro=document.querySelector('select-media-device[type="videoinput"]'),ko=document.querySelector('select-media-device[type="audioinput"]'),zh=document.querySelector('select-media-device[type="audiooutput"]'),bt=document.getElementById("startChat"),En=document.getElementById("hangUp"),jh=document.getElementById("copyLink"),ut=document.getElementById("pipBtn"),Hs=document.getElementById("switchCameraSelfBtn"),Zn=document.getElementById("toggleMode"),Kh=document.getElementById("loadStream"),Qh=document.getElementById("status"),Ao=document.getElementById("linkContainer"),ei=document.getElementById("watchContainer"),qe=document.getElementById("yt-player-div"),ti=document.querySelector(".video-container"),z=document.getElementById("syncStatus"),on=document.getElementById("shareLink"),It=document.getElementById("streamUrl"),Po=document.getElementById("mutePartnerBtn"),Xh=document.getElementById("fullscreenPartnerBtn"),Jh=document.getElementById("muteSelfBtn"),Zh=document.getElementById("videoSelfBtn"),ed=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");document.getElementById("titleLink");document.getElementById("titleText");function td(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function nd(){return td()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function id(){const n=await nd();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}async function sd({localStream:n,localVideo:e,peerConnection:t,currentFacingMode:i}){const s=i==="user"?"environment":"user",r=n.getVideoTracks()[0];try{return await r.applyConstraints({facingMode:s}),s}catch(l){console.warn("applyConstraints failed, falling back to getUserMedia:",l)}const o=await navigator.mediaDevices.getUserMedia({video:{facingMode:s},audio:!1}),a=o.getVideoTracks()[0];if(t){const l=t.getSenders().find(c=>c.track&&c.track.kind==="video");l&&l.replaceTrack(a)}return n.removeTrack(r),n.addTrack(a),e.srcObject=n,r.stop(),o.getTracks().forEach(l=>{l!==a&&l.stop()}),s}let ni=!1,ht=null;function rd(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function od(n,e,t){t&&(t.muted=!n,t.volume=e)}function ad(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function ld(n,e){n&&(ht=()=>{if(n.muted!==ni){const t=e.querySelector("i");t.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",ni=n.muted}},n.addEventListener("volumechange",ht))}function cd(n){!n||!ht||(n.removeEventListener("volumechange",ht),ht=null)}function ud({getLocalStream:n,getLocalVideo:e,getRemoteVideo:t,getPeerConnection:i=()=>null,muteSelfBtn:s,videoSelfBtn:r,switchCameraSelfBtn:o,fullscreenSelfBtn:a,mutePartnerBtn:l,fullscreenPartnerBtn:c,audioConstraints:d={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}){s&&(s.onclick=()=>{const u=n(),h=e();if(!h||!u)return;const p=!h.muted;rd(!p,u),od(!p,0,h),ad(p,s)}),r&&(r.onclick=()=>{const u=n();if(!u)return;const h=u.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const p=r.querySelector("i");p.className=h.enabled?"fa fa-video":"fa fa-video-slash"}}),o&&(o.onclick=async()=>{const u=n(),h=e();if(!u){console.warn("No local stream or no local video track available.");return}const p=u.getVideoTracks()[0];if(!p){console.warn("No local video track available.");return}const _=p.getSettings()?.facingMode||"user",C=i?.();if(!C){console.error("PeerConnection is required to switch camera.");return}const P=await sd({localStream:u,localVideo:h,peerConnection:C,currentFacingMode:_});console.log("Switched camera to facingMode:",P)}),a&&(a.onclick=()=>{const u=e();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()}),l&&(l.onclick=()=>{const u=t();u&&(u.muted=!u.muted)}),c&&(c.onclick=()=>{const u=t();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()})}function hd(n){cd(n),ni=!1}let O=null,Ae=!1;function dd(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function ii(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function Do(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const i=n.match(t);if(i&&i[1])return i[1]}return null}async function fd({url:n,containerId:e,onReady:t,onStateChange:i}){const s=Do(n);if(!s)throw new Error("Invalid YouTube URL");if(await dd(),!document.getElementById(e))throw new Error(`Container #${e} not found`);if(O){try{O.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}O=null}return new Promise((o,a)=>{try{O=new window.YT.Player(e,{videoId:s,playerVars:{autoplay:0,controls:1,rel:0,modestbranding:1},events:{onReady:l=>{Ae=!0,t&&t(l),o(O)},onStateChange:l=>{i&&i(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function $s(){return O}function xo(){if(O){try{O.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}O=null,Ae=!1}}function Gs(){O&&Ae&&O.playVideo()}function Ys(){O&&Ae&&O.pauseVideo()}function pd(n){O&&Ae&&O.seekTo(n,!0)}function an(){return O&&Ae?O.getCurrentTime():0}function si(){return O&&Ae?O.getPlayerState():-1}const he={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let St=[],we=null,dt=!1,Mo=!1,ri="",X=-1;const _d="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",md="https://www.googleapis.com/youtube/v3";function gd(n){we=n;const e=document.querySelector(".search-section"),t=document.getElementById("searchBtn"),i=document.getElementById("searchQuery"),s=document.getElementById("searchResults");if(!t||!i||!s){console.error("YouTube search elements not found in DOM");return}const r=a=>/^https?:\/\//i.test(a),o=a=>{s.querySelectorAll(".search-result-item").forEach((c,d)=>{d===a?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),X=a};t.onclick=async()=>{const a=i.value.trim();if(!a){ai("Please enter a search term");return}if(dt&&a===ri)oi(St);else if(!r(a))await qs(a);else{we&&we({url:a,title:a,channel:"",thumbnail:"",id:a}),s.style.display="none",i.value="";return}},e.addEventListener("keydown",async a=>{const l=s.querySelectorAll(".search-result-item");if(l.length>0&&(a.key==="ArrowDown"||a.key==="ArrowUp")){if(a.preventDefault(),a.key==="ArrowDown"){let c=X+1;c>=l.length&&(c=0),o(c)}else if(a.key==="ArrowUp"){let c=X-1;c<0&&(c=X===-1?0:l.length-1),o(c)}return}if(a.key==="Enter"){if(l.length>0&&X>=0){l[X].click();return}const c=i.value.trim();if(c)if(dt&&c===ri)oi(St);else if(!r(c))await qs(c);else{we&&we({url:c,title:c,channel:"",thumbnail:"",id:c}),s.style.display="none",i.value="";return}}else a.key==="Escape"&&Mo&&(s.style.display="none")})}async function qs(n){ri=n;const e=document.getElementById("searchBtn"),t=document.getElementById("searchResults");e.disabled=!0,e.textContent="Searching...",t.innerHTML='<div class="search-loading">Searching YouTube...</div>',t.style.display="block",dt=!1;try{const i=await fetch(`${md}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${_d}`);if(!i.ok)throw i.status===403?new Error("YouTube API quota exceeded. Please try again later."):i.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${i.status}`);const s=await i.json();if(!s.items||s.items.length===0){ai("No videos found"),dt=!1;return}St=s.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),oi(St),dt=!0}catch(i){console.error("YouTube search failed:",i),ai(i.message||"Search failed. Please try again.")}finally{e.disabled=!1,e.textContent="Search"}}function oi(n){const e=document.getElementById("searchResults");if(!n||n.length===0){e.innerHTML='<div class="no-results">No results found</div>',X=-1;return}e.innerHTML="",n.forEach(i=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
        <img src="${i.thumbnail}" alt="${i.title}" class="result-thumbnail">
        <div class="result-info">
          <div class="result-title">${i.title}</div>
          <div class="result-channel">${i.channel}</div>
        </div>
      `,s.onclick=()=>{if(we){we(i),e.style.display="none";const r=document.getElementById("searchQuery");r&&(r.value=""),X=-1}},e.appendChild(s)}),e.style.display="block",Mo=!0,X=0,e.querySelectorAll(".search-result-item").forEach((i,s)=>{s===X?(i.classList.add("focused"),i.scrollIntoView({block:"nearest"})):i.classList.remove("focused")})}function ai(n){const e=document.getElementById("searchResults");e.innerHTML=`<div class="search-error">${n}</div>`,e.style.display="block"}function yd(){const n=document.getElementById("searchResults");n&&(n.innerHTML="",n.style.display="none"),St=[]}class vd extends HTMLElement{static observedAttributes=["type"];constructor(){super(),this.attachShadow({mode:"open"}),this._onDeviceChange=this.updateDevices.bind(this)}connectedCallback(){this.render(),this.updateDevices(),navigator.mediaDevices.addEventListener("devicechange",this._onDeviceChange)}disconnectedCallback(){navigator.mediaDevices.removeEventListener("devicechange",this._onDeviceChange)}attributeChangedCallback(){this.updateDevices()}render(){this.shadowRoot.innerHTML=`
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
    `}async updateDevices(){const e=this.getAttribute("type")||"videoinput",i=(await navigator.mediaDevices.enumerateDevices()).filter(r=>r.kind===e),s=this.shadowRoot.querySelector("select");s.innerHTML=i.map((r,o)=>`<option value="${r.deviceId}">${r.label||`${e} ${o+1}`}</option>`).join(""),this.dispatchEvent(new CustomEvent("deviceschanged",{detail:{devices:i}}))}get value(){return this.shadowRoot.querySelector("select").value}set value(e){this.shadowRoot.querySelector("select").value=e}}customElements.define("select-media-device",vd);const Cd={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Ed=or(Cd),Z=Gh(Ed),Oo={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};let b=null,$=null,N=null,Lt=null,ze=null,nt=!1,xe=null,ji=!1;const li=[];let ci=null,it=0;const zs={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0};async function Lo(){Lt=Math.random().toString(36).substring(2,15);try{$=await navigator.mediaDevices.getUserMedia({video:!0,audio:zs});const n=new MediaStream($.getVideoTracks());return rn.srcObject=n,await id()&&(Hs.style.display="block"),ud({getLocalStream:()=>$,getLocalVideo:()=>rn,getRemoteVideo:()=>K,getPeerConnection:()=>b,muteSelfBtn:Jh,videoSelfBtn:Zh,switchCameraSelfBtn:Hs,fullscreenSelfBtn:ed,mutePartnerBtn:Po,fullscreenPartnerBtn:Xh,audioConstraints:zs}),!0}catch(n){return console.error("Failed to get user media:",n),D("Error: Please allow camera and microphone access."),!1}}function Fo(n){n.ontrack=e=>{if(!e.streams||!e.streams[0]||!(e.streams[0]instanceof MediaStream)){console.error("No valid remote MediaStream found in event.streams:",e.streams);return}K.srcObject!==e.streams[0]&&(K.srcObject=e.streams[0],ut.style.display="block",ld(K,Po),D("Connected!"))}}function Bo(n,e){n.onicecandidate=r=>{if(r.candidate){const a=Dh(J(Z,`rooms/${N}/${e==="initiator"?"callerCandidates":"calleeCandidates"}`));Mt(a,r.candidate.toJSON())}};const i=J(Z,`rooms/${N}/${e==="initiator"?"calleeCandidates":"callerCandidates"}`),s=r=>{const o=r.val();o&&n.remoteDescription&&n.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};Oh(i,s),Ki(i,"child_added",s)}function Uo(n){n.onconnectionstatechange=()=>{n.connectionState==="connected"?D("Connected!"):n.connectionState==="disconnected"?D("Partner disconnected"):n.connectionState==="failed"&&D("Connection failed")}}async function wd(){if(!$){D("Error: Camera not initialized");return}N=Math.random().toString(36).substring(2,15),ze="initiator",b=new RTCPeerConnection(Oo),$.getTracks().forEach(r=>{b.addTrack(r,$)}),Fo(b),Bo(b,ze),Uo(b);const n=await b.createOffer();await b.setLocalDescription(n);const e=J(Z,`rooms/${N}`);await Mt(e,{offer:{type:n.type,sdp:n.sdp}});const t=J(Z,`rooms/${N}/answer`),i=async r=>{const o=r.val();if(o&&o.sdp!==ci){if(ci=o.sdp,b.signalingState!=="have-local-offer"&&b.signalingState!=="stable")return;try{await b.setRemoteDescription(new RTCSessionDescription(o))}catch(a){console.error("Failed to set remote description:",a)}}};No(t,i),Ki(t,"value",i),Wo();const s=`${window.location.origin}${window.location.pathname}?room=${N}`;on.value=s,Ao.style.display="block",bt.disabled=!0,En.disabled=!1,D("Link ready! Share with your partner.")}async function bd(){if(!$){D("Error: Camera not initialized");return}if(!N){D("Error: No room ID");return}ze="joiner";const n=J(Z,`rooms/${N}`),e=await Mh(n);if(!e.exists()){D("Error: Invalid room link");return}const i=e.val().offer;if(!i){D("Error: No offer found");return}b=new RTCPeerConnection(Oo),$.getTracks().forEach(r=>{b.addTrack(r,$)}),Fo(b),Bo(b,ze),Uo(b),await b.setRemoteDescription(new RTCSessionDescription(i));const s=await b.createAnswer();await b.setLocalDescription(s);try{await So(n,{answer:{type:s.type,sdp:s.sdp}})}catch(r){console.error("Failed to update answer in Firebase:",r),D("Failed to send answer to partner.");return}Wo(),En.disabled=!1,D("Connecting...")}let re=!1,ae=null;async function Me(n){if(!N)return;const e=J(Z,`rooms/${N}/watch`);try{await So(e,{...n,updatedBy:Lt})}catch(t){console.error("Failed to update watch state:",t)}}function Wo(){if(!N)return;const n=J(Z,`rooms/${N}/watch`),e=t=>{const i=t.val();if(i&&i.updatedBy!==Lt&&!(Date.now()-it<500))if(i.url&&i.url!==It.value&&(It.value=i.url,ii(i.url)?Ho(i.url):(R.style.display="block",R.src=i.url,qe.style.display="none"),z.textContent="Video loaded"),i.isYouTube&&xe&&ji){if(i.playing!==void 0){const s=si(),r=s===he.PLAYING;if(s===he.BUFFERING||s===he.UNSTARTED)re=!0,ae&&clearTimeout(ae),ae=setTimeout(async()=>{re=!1;const a=si()===he.PLAYING;await Me({playing:a,currentTime:an()})},700);else{if(re)return;i.playing&&!r?Gs():!i.playing&&r&&Ys()}}if(i.currentTime!==void 0){const s=an();Math.abs(s-i.currentTime)>.3&&!re&&(pd(i.currentTime),setTimeout(()=>{i.playing?Gs():Ys()},500))}}else!i.isYouTube&&R.src&&(i.playing!==void 0&&(i.playing&&R.paused?R.play().catch(s=>console.warn("Play failed:",s)):!i.playing&&!R.paused&&R.pause()),i.currentTime!==void 0&&Math.abs(R.currentTime-i.currentTime)>1&&(R.currentTime=i.currentTime,i.playing?R.play().catch(r=>console.warn("Play failed:",r)):R.pause()))};No(n,e),Ki(n,"value",e),R.addEventListener("play",async()=>{!xe&&N&&(it=Date.now(),await Me({playing:!0,isYouTube:!1}))}),R.addEventListener("pause",async()=>{!xe&&N&&(it=Date.now(),await Me({playing:!1,isYouTube:!1}))}),R.addEventListener("seeked",async()=>{!xe&&N&&(it=Date.now(),await Me({currentTime:R.currentTime,playing:!R.paused,isYouTube:!1}))})}function Vo(){const n=It.value.trim();if(!n){z.textContent="Please enter a video URL";return}if(it=Date.now(),ii(n)?Ho(n):(qe.style.display="none",xo(),R.style.display="block",R.src=n,z.textContent="Video loaded"),N){const e=J(Z,`rooms/${N}/watch`);Mt(e,{url:n,playing:!1,currentTime:0,isYouTube:ii(n),updatedBy:Lt})}}function Id(n){It.value=n.url,Vo(),z.textContent=`Loading "${n.title}"...`}async function Ho(n){if(!Do(n)){z.textContent="Invalid YouTube URL";return}z.textContent="Loading YouTube video...",R.style.display="none",qe.style.display="block";try{await fd({url:n,containerId:"yt-player-div",onReady:t=>{if(ji=!0,z.textContent="YouTube video ready",N){const i=J(Z,`rooms/${N}/watch`);Mt(i,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Lt})}},onStateChange:async t=>{if(!$s())return;const s=t.data===he.PLAYING,r=t.data===he.PAUSED;if(t.data===he.BUFFERING){re=!0,ae&&clearTimeout(ae),ae=setTimeout(async()=>{re=!1;const l=si()===he.PLAYING;await Me({playing:l,currentTime:an()})},700);return}r&&re||!re&&(s||r)&&await Me({playing:s,currentTime:an()})}}),xe=$s(),z.textContent="YouTube video loaded"}catch(t){console.error("Failed to load YouTube video:",t),z.textContent="Failed to load YouTube video",R.style.display="block",qe.style.display="none"}}function Sd(){nt=!nt,nt?(ti.style.display="none",ei.style.display="block",Zn.textContent="Switch to Chat Mode",z.textContent=nt&&N?"Watch mode ready":"Enter a video URL",gd(Id)):(ti.style.display="flex",ei.style.display="none",Zn.textContent="Switch to Watch Mode",yd(),qe.style.display="none",R.style.display="none")}ut.onclick=async()=>{try{document.pictureInPictureElement?(await document.exitPictureInPicture(),ut.textContent="Float Partner Video"):(await K.requestPictureInPicture(),ut.textContent="Exit Floating Video")}catch(n){console.error("PiP failed:",n),D("Picture-in-picture not supported")}};async function $o(){if(console.debug("Hanging up..."),$&&($.getTracks().forEach(n=>n.stop()),rn.srcObject=null,$=null),K.srcObject&&(K.srcObject.getTracks().forEach(n=>n.stop()),K.srcObject=null),hd(K),b&&(b.close(),b=null),li.forEach(({ref:n,type:e,callback:t})=>Lh(n,e,t)),li.length=0,xo(),xe=null,ji=!1,qe.style.display="none",ae&&(clearTimeout(ae),ae=null),re=!1,N&&ze==="initiator"){const n=J(Z,`rooms/${N}`);xh(n).catch(e=>{console.warn("Failed to remove room:",e)})}bt.disabled=!1,bt.style.display="block",En.disabled=!0,Ao.style.display="none",ei.style.display="none",ti.style.display="flex",ut.style.display="none",on.value="",R.src="",R.style.display="none",It.value="",z.textContent="",document.pictureInPictureElement&&document.exitPictureInPicture().catch(n=>console.error(n)),N=null,ze=null,nt=!1,ci=null,window.history.replaceState({},document.title,window.location.pathname),D('Disconnected. Click "Start New Chat" to begin.')}bt.onclick=async()=>{await Lo()&&await wd()};En.onclick=$o;Zn.onclick=Sd;Kh.onclick=Vo;jh.onclick=async()=>{try{await navigator.clipboard.writeText(on.value),D("Link copied to clipboard!")}catch{on.select(),document.execCommand("copy"),D("Link copied!")}};function D(n){Qh.textContent=n}function Ki(n,e,t){li.push({ref:n,type:e,callback:t})}async function Td(){const e=new URLSearchParams(window.location.search).get("room");e?(N=e,D("Connecting to room..."),bt.style.display="none",await Lo()&&await bd()):D('Ready. Click "Start New Chat" to begin.')}window.addEventListener("beforeunload",n=>{if(b&&b.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;$o()});document.querySelectorAll(".video-wrapper").forEach(n=>{let e;const t=n.querySelector(".hover-controls");t&&n.addEventListener("touchstart",()=>{t.style.opacity="1",clearTimeout(e),e=setTimeout(()=>{t.style.opacity="0"},3e3)})});Td();async function Go(){const n=Ro?.value,e=ko?.value,t={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},i={video:n?{deviceId:{exact:n}}:!0,audio:e?{deviceId:{exact:e},...t}:{...t}};try{const s=await navigator.mediaDevices.getUserMedia(i);if(b){const o=s.getVideoTracks()[0],a=b.getSenders().find(d=>d.track?.kind==="video");o&&a&&a.replaceTrack(o);const l=s.getAudioTracks()[0],c=b.getSenders().find(d=>d.track?.kind==="audio");l&&c&&c.replaceTrack(l)}const r=$;$=s,rn.srcObject=new MediaStream(s.getVideoTracks()),r&&r.getTracks().forEach(o=>o.stop())}catch(s){D("Could not access selected devices."),console.error(s)}}Ro?.shadowRoot.querySelector("select")?.addEventListener("change",Go);ko?.shadowRoot.querySelector("select")?.addEventListener("change",Go);zh?.shadowRoot.querySelector("select")?.addEventListener("change",n=>{const e=n.target.value;typeof K?.setSinkId=="function"&&K.setSinkId(e).catch(t=>{D("Could not set audio output device."),console.error(t)})});
