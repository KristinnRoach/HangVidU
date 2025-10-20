(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
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
 */const zo=()=>{};var Ks={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw Qe(e)},Qe=function(n){return new Error("Firebase Database ("+Ki.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qi=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},jo=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},hs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),s.push(t[d],t[u],t[h],t[p])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Qi(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):jo(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new Ko;const h=r<<2|a>>4;if(s.push(h),c!==64){const p=a<<4&240|c>>2;if(s.push(p),u!==64){const _=c<<6&192|u;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Ko extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xi=function(n){const e=Qi(n);return hs.encodeByteArray(e,!0)},Ut=function(n){return Xi(n).replace(/\./g,"")},Mn=function(n){try{return hs.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qo(n){return Ji(void 0,n)}function Ji(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Xo(t)||(n[t]=Ji(n[t],e[t]));return n}function Xo(n){return n!=="__proto__"}/**
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
 */function Jo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Zo=()=>Jo().__FIREBASE_DEFAULTS__,ea=()=>{if(typeof process>"u"||typeof Ks>"u")return;const n=Ks.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ta=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mn(n[1]);return e&&JSON.parse(e)},Zi=()=>{try{return zo()||Zo()||ea()||ta()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},na=n=>Zi()?.emulatorHosts?.[n],sa=n=>{const e=na(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},er=()=>Zi()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function us(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ia(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function ra(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ut(JSON.stringify(t)),Ut(JSON.stringify(o)),""].join(".")}const ot={};function oa(){const n={prod:[],emulator:[]};for(const e of Object.keys(ot))ot[e]?n.emulator.push(e):n.prod.push(e);return n}function aa(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Qs=!1;function la(n,e){if(typeof window>"u"||typeof document>"u"||!us(window.location.host)||ot[n]===e||ot[n]||Qs)return;ot[n]=e;function t(h){return`__firebase__banner__${h}`}const s="__firebase__banner",r=oa().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,p){h.setAttribute("width","24"),h.setAttribute("id",p),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Qs=!0,o()},h}function d(h,p){h.setAttribute("id",p),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=aa(s),p=t("text"),_=document.getElementById(p)||document.createElement("span"),w=t("learnmore"),x=document.getElementById(w)||document.createElement("a"),ne=t("preprendIcon"),se=document.getElementById(ne)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const Ce=h.element;a(Ce),d(x,w);const bn=c();l(se,ne),Ce.append(se,_,x,bn),document.body.appendChild(Ce)}r?(_.innerText="Preview backend disconnected.",se.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function ca(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function tr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ca())}function ha(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ua(){return Ki.NODE_ADMIN===!0}function da(){try{return typeof indexedDB=="object"}catch{return!1}}function fa(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa="FirebaseError";class Nt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=pa,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,nr.prototype.create)}}class nr{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?_a(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Nt(i,a,s)}}function _a(n,e){return n.replace(ma,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const ma=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const sr=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=ft(Mn(r[0])||""),t=ft(Mn(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},ga=function(n){const e=sr(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ya=function(n){const e=sr(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function We(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Xs(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Wt(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function Vt(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Js(r)&&Js(o)){if(!Vt(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Js(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function cn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,f(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},hn=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Re(n){return n&&n._delegate?n._delegate:n}class pt{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class wa{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Tt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ia(e))try{this.getOrInitializeService({instanceIdentifier:Ee})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Ee){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ee){return this.instances.has(e)}getOptions(e=Ee){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:ba(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ee){return this.component?this.component.multipleInstances?e:Ee:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ba(n){return n===Ee?void 0:n}function Ia(n){return n.instantiationMode==="EAGER"}/**
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
 */class Sa{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new wa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const Ta={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},Na=S.INFO,Ra={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},ka=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Ra[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ir{constructor(e){this.name=e,this._logLevel=Na,this._logHandler=ka,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ta[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const Aa=(n,e)=>e.some(t=>n instanceof t);let Zs,ei;function Pa(){return Zs||(Zs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Da(){return ei||(ei=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rr=new WeakMap,Ln=new WeakMap,or=new WeakMap,In=new WeakMap,ds=new WeakMap;function xa(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(fe(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&rr.set(t,n)}).catch(()=>{}),ds.set(e,n),e}function Oa(n){if(Ln.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ln.set(n,e)}let Fn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ln.get(n);if(e==="objectStoreNames")return n.objectStoreNames||or.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return fe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ma(n){Fn=n(Fn)}function La(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Sn(this),e,...t);return or.set(s,e.sort?e.sort():[e]),fe(s)}:Da().includes(n)?function(...e){return n.apply(Sn(this),e),fe(rr.get(this))}:function(...e){return fe(n.apply(Sn(this),e))}}function Fa(n){return typeof n=="function"?La(n):(n instanceof IDBTransaction&&Oa(n),Aa(n,Pa())?new Proxy(n,Fn):n)}function fe(n){if(n instanceof IDBRequest)return xa(n);if(In.has(n))return In.get(n);const e=Fa(n);return e!==n&&(In.set(n,e),ds.set(e,n)),e}const Sn=n=>ds.get(n);function Ba(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=fe(o);return s&&o.addEventListener("upgradeneeded",l=>{s(fe(o.result),l.oldVersion,l.newVersion,fe(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ua=["get","getKey","getAll","getAllKeys","count"],Wa=["put","add","delete","clear"],Tn=new Map;function ti(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Tn.get(e))return Tn.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Wa.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Ua.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Tn.set(e,r),r}Ma(n=>({...n,get:(e,t,s)=>ti(e,t)||n.get(e,t,s),has:(e,t)=>!!ti(e,t)||n.has(e,t)}));/**
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
 */class Va{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ha(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Ha(n){return n.getComponent()?.type==="VERSION"}const Bn="@firebase/app",ni="0.14.4";/**
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
 */const ce=new ir("@firebase/app"),$a="@firebase/app-compat",Ya="@firebase/analytics-compat",Ga="@firebase/analytics",qa="@firebase/app-check-compat",za="@firebase/app-check",ja="@firebase/auth",Ka="@firebase/auth-compat",Qa="@firebase/database",Xa="@firebase/data-connect",Ja="@firebase/database-compat",Za="@firebase/functions",el="@firebase/functions-compat",tl="@firebase/installations",nl="@firebase/installations-compat",sl="@firebase/messaging",il="@firebase/messaging-compat",rl="@firebase/performance",ol="@firebase/performance-compat",al="@firebase/remote-config",ll="@firebase/remote-config-compat",cl="@firebase/storage",hl="@firebase/storage-compat",ul="@firebase/firestore",dl="@firebase/ai",fl="@firebase/firestore-compat",pl="firebase",_l="12.4.0";/**
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
 */const Un="[DEFAULT]",ml={[Bn]:"fire-core",[$a]:"fire-core-compat",[Ga]:"fire-analytics",[Ya]:"fire-analytics-compat",[za]:"fire-app-check",[qa]:"fire-app-check-compat",[ja]:"fire-auth",[Ka]:"fire-auth-compat",[Qa]:"fire-rtdb",[Xa]:"fire-data-connect",[Ja]:"fire-rtdb-compat",[Za]:"fire-fn",[el]:"fire-fn-compat",[tl]:"fire-iid",[nl]:"fire-iid-compat",[sl]:"fire-fcm",[il]:"fire-fcm-compat",[rl]:"fire-perf",[ol]:"fire-perf-compat",[al]:"fire-rc",[ll]:"fire-rc-compat",[cl]:"fire-gcs",[hl]:"fire-gcs-compat",[ul]:"fire-fst",[fl]:"fire-fst-compat",[dl]:"fire-vertex","fire-js":"fire-js",[pl]:"fire-js-all"};/**
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
 */const Ht=new Map,gl=new Map,Wn=new Map;function si(n,e){try{n.container.addComponent(e)}catch(t){ce.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function $t(n){const e=n.name;if(Wn.has(e))return ce.debug(`There were multiple attempts to register component ${e}.`),!1;Wn.set(e,n);for(const t of Ht.values())si(t,n);for(const t of gl.values())si(t,n);return!0}function yl(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function vl(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Cl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pe=new nr("app","Firebase",Cl);/**
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
 */class El{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new pt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pe.create("app-deleted",{appName:this._name})}}/**
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
 */const wl=_l;function ar(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Un,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw pe.create("bad-app-name",{appName:String(i)});if(t||(t=er()),!t)throw pe.create("no-options");const r=Ht.get(i);if(r){if(Vt(t,r.options)&&Vt(s,r.config))return r;throw pe.create("duplicate-app",{appName:i})}const o=new Sa(i);for(const l of Wn.values())o.addComponent(l);const a=new El(t,s,o);return Ht.set(i,a),a}function bl(n=Un){const e=Ht.get(n);if(!e&&n===Un&&er())return ar();if(!e)throw pe.create("no-app",{appName:n});return e}function Le(n,e,t){let s=ml[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ce.warn(o.join(" "));return}$t(new pt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Il="firebase-heartbeat-database",Sl=1,_t="firebase-heartbeat-store";let Nn=null;function lr(){return Nn||(Nn=Ba(Il,Sl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(_t)}catch(t){console.warn(t)}}}}).catch(n=>{throw pe.create("idb-open",{originalErrorMessage:n.message})})),Nn}async function Tl(n){try{const t=(await lr()).transaction(_t),s=await t.objectStore(_t).get(cr(n));return await t.done,s}catch(e){if(e instanceof Nt)ce.warn(e.message);else{const t=pe.create("idb-get",{originalErrorMessage:e?.message});ce.warn(t.message)}}}async function ii(n,e){try{const s=(await lr()).transaction(_t,"readwrite");await s.objectStore(_t).put(e,cr(n)),await s.done}catch(t){if(t instanceof Nt)ce.warn(t.message);else{const s=pe.create("idb-set",{originalErrorMessage:t?.message});ce.warn(s.message)}}}function cr(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Nl=1024,Rl=30;class kl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Pl(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ri();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:t}),this._heartbeatsCache.heartbeats.length>Rl){const i=Dl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ce.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ri(),{heartbeatsToSend:t,unsentEntries:s}=Al(this._heartbeatsCache.heartbeats),i=Ut(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return ce.warn(e),""}}}function ri(){return new Date().toISOString().substring(0,10)}function Al(n,e=Nl){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),oi(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),oi(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Pl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return da()?fa().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Tl(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ii(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ii(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function oi(n){return Ut(JSON.stringify({version:2,heartbeats:n})).length}function Dl(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function xl(n){$t(new pt("platform-logger",e=>new Va(e),"PRIVATE")),$t(new pt("heartbeat",e=>new kl(e),"PRIVATE")),Le(Bn,ni,n),Le(Bn,ni,"esm2020"),Le("fire-js","")}xl("");var Ol="firebase",Ml="12.4.0";/**
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
 */Le(Ol,Ml,"app");var ai={};const li="@firebase/database",ci="1.1.0";/**
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
 */let hr="";function Ll(n){hr=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),M(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ft(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bl{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ee(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Fl(e)}}catch{}return new Bl},Ie=ur("localStorage"),Ul=ur("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe=new ir("@firebase/database"),Wl=(function(){let n=1;return function(){return n++}})(),dr=function(n){const e=Ea(n),t=new Ca;t.update(e);const s=t.digest();return hs.encodeByteArray(s)},Rt=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Rt.apply(null,s):typeof s=="object"?e+=M(s):e+=s,e+=" "}return e};let at=null,hi=!0;const Vl=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Fe.logLevel=S.VERBOSE,at=Fe.log.bind(Fe)},W=function(...n){if(hi===!0&&(hi=!1,at===null&&Ul.get("logging_enabled")===!0&&Vl()),at){const e=Rt.apply(null,n);at(e)}},kt=function(n){return function(...e){W(n,...e)}},Vn=function(...n){const e="FIREBASE INTERNAL ERROR: "+Rt(...n);Fe.error(e)},he=function(...n){const e=`FIREBASE FATAL ERROR: ${Rt(...n)}`;throw Fe.error(e),new Error(e)},Y=function(...n){const e="FIREBASE WARNING: "+Rt(...n);Fe.warn(e)},Hl=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Y("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},fs=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},$l=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ve="[MIN_NAME]",Se="[MAX_NAME]",ke=function(n,e){if(n===e)return 0;if(n===Ve||e===Se)return-1;if(e===Ve||n===Se)return 1;{const t=ui(n),s=ui(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},Yl=function(n,e){return n===e?0:n<e?-1:1},et=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+M(e))},ps=function(n){if(typeof n!="object"||n===null)return M(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=M(e[s]),t+=":",t+=ps(n[e[s]]);return t+="}",t},fr=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function H(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const pr=function(n){f(!fs(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Gl=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},ql=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function zl(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const jl=new RegExp("^-?(0*)\\d{1,10}$"),Kl=-2147483648,Ql=2147483647,ui=function(n){if(jl.test(n)){const e=Number(n);if(e>=Kl&&e<=Ql)return e}return null},Xe=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Y("Exception was thrown by user callback.",t),e},Math.floor(0))}},Xl=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},lt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Jl{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,vl(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){Y(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(W("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Y(e)}}class Bt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Bt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="5",_r="v",mr="s",gr="r",yr="f",vr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Cr="ls",Er="p",Hn="ac",wr="websocket",br="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ie.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ie.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ec(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Sr(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let s;if(e===wr)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===br)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ec(n)&&(t.ns=n.namespace);const i=[];return H(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(){this.counters_={}}incrementCounter(e,t=1){ee(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Qo(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn={},kn={};function ms(n){const e=n.toString();return Rn[e]||(Rn[e]=new tc),Rn[e]}function nc(n,e){const t=n.toString();return kn[t]||(kn[t]=e()),kn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Xe(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di="start",ic="close",rc="pLPCommand",oc="pRTLPCB",Tr="id",Nr="pw",Rr="ser",ac="cb",lc="seg",cc="ts",hc="d",uc="dframe",kr=1870,Ar=30,dc=kr-Ar,fc=25e3,pc=3e4;class xe{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=kt(e),this.stats_=ms(t),this.urlFn=l=>(this.appCheckToken&&(l[Hn]=this.appCheckToken),Sr(t,br,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new sc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(pc)),$l(()=>{if(this.isClosed_)return;this.scriptTagHolder=new gs((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===di)this.id=a,this.password=l;else if(o===ic)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[di]="t",s[Rr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[ac]=this.scriptTagHolder.uniqueCallbackIdentifier),s[_r]=_s,this.transportSessionId&&(s[mr]=this.transportSessionId),this.lastSessionId&&(s[Cr]=this.lastSessionId),this.applicationId&&(s[Er]=this.applicationId),this.appCheckToken&&(s[Hn]=this.appCheckToken),typeof location<"u"&&location.hostname&&vr.test(location.hostname)&&(s[gr]=yr);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){xe.forceAllow_=!0}static forceDisallow(){xe.forceDisallow_=!0}static isAvailable(){return xe.forceAllow_?!0:!xe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Gl()&&!ql()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Xi(t),i=fr(s,dc);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[uc]="t",s[Tr]=e,s[Nr]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=M(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class gs{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Wl(),window[rc+this.uniqueCallbackIdentifier]=e,window[oc+this.uniqueCallbackIdentifier]=t,this.myIFrame=gs.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){W("frame writing exception"),a.stack&&W(a.stack),W(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||W("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Tr]=this.myID,e[Nr]=this.myPW,e[Rr]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ar+s.length<=kr;){const o=this.pendingSegs.shift();s=s+"&"+lc+i+"="+o.seg+"&"+cc+i+"="+o.ts+"&"+hc+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(fc)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{W("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=16384,mc=45e3;let Yt=null;typeof MozWebSocket<"u"?Yt=MozWebSocket:typeof WebSocket<"u"&&(Yt=WebSocket);class Q{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=kt(this.connId),this.stats_=ms(t),this.connURL=Q.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[_r]=_s,typeof location<"u"&&location.hostname&&vr.test(location.hostname)&&(o[gr]=yr),t&&(o[mr]=t),s&&(o[Cr]=s),i&&(o[Hn]=i),r&&(o[Er]=r),Sr(e,wr,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ie.set("previous_websocket_failure",!0);try{let s;ua(),this.mySock=new Yt(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Q.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Yt!==null&&!Q.forceDisallow_}static previouslyFailed(){return Ie.isInMemoryStorage||Ie.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ie.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=ft(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=fr(t,_c);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(mc))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Q.responsesRequiredToBeHealthy=2;Q.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{static get ALL_TRANSPORTS(){return[xe,Q]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Q&&Q.isAvailable();let s=t&&!Q.previouslyFailed();if(e.webSocketOnly&&(t||Y("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Q];else{const i=this.transports_=[];for(const r of mt.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);mt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}mt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc=6e4,yc=5e3,vc=10*1024,Cc=100*1024,An="t",fi="d",Ec="s",pi="r",wc="e",_i="o",mi="a",gi="n",yi="p",bc="h";class Ic{constructor(e,t,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=kt("c:"+this.id+":"),this.transportManager_=new mt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=lt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Cc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>vc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(An in e){const t=e[An];t===mi?this.upgradeIfSecondaryHealthy_():t===pi?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===_i&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=et("t",e),s=et("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:yi,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:mi,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:gi,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=et("t",e),s=et("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=et(An,e);if(fi in e){const s=e[fi];if(t===bc){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===gi){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Ec?this.onConnectionShutdown_(s):t===pi?this.onReset_(s):t===wc?Vn("Server Error: "+s):t===_i?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Vn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),_s!==s&&Y("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),lt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(gc))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):lt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(yc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:yi,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ie.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt extends Dr{static getInstance(){return new Gt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!tr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi=32,Ci=768;class b{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new b("")}function g(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function ge(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new b(n.pieces_,e)}function ys(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Sc(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function gt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function xr(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new b(e,0)}function A(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof b)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new b(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function $(n,e){const t=g(n),s=g(e);if(t===null)return e;if(t===s)return $(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Tc(n,e){const t=gt(n,0),s=gt(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=ke(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function vs(n,e){if(ge(n)!==ge(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function q(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(ge(n)>ge(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Nc{constructor(e,t){this.errorPrefix_=t,this.parts_=gt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=hn(this.parts_[s]);Or(this)}}function Rc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=hn(e),Or(n)}function kc(n){const e=n.parts_.pop();n.byteLength_-=hn(e),n.parts_.length>0&&(n.byteLength_-=1)}function Or(n){if(n.byteLength_>Ci)throw new Error(n.errorPrefix_+"has a key path longer than "+Ci+" bytes ("+n.byteLength_+").");if(n.parts_.length>vi)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+vi+") or object contains a cycle "+we(n))}function we(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs extends Dr{static getInstance(){return new Cs}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt=1e3,Ac=300*1e3,Ei=30*1e3,Pc=1.3,Dc=3e4,xc="server_kill",wi=3;class ae extends Pr{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ae.nextPersistentConnectionId_++,this.log_=kt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=tt,this.maxReconnectDelay_=Ac,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Cs.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Gt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(M(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Tt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ae.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ee(e,"w")){const s=We(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Y(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ya(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ei)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ga(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+M(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Vn("Unrecognized action received from server: "+M(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=tt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=tt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Dc&&(this.reconnectDelay_=tt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Pc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+ae.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?W("getToken() completed but was canceled"):(W("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new Ic(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,p=>{Y(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(xc)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&Y(u),l())}}}interrupt(e){W("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){W("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Xs(this.interruptReasons_)&&(this.reconnectDelay_=tt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>ps(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new b(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){W("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=wi&&(this.reconnectDelay_=Ei,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){W("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=wi&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+hr.replace(/\./g,"-")]=1,tr()?e["framework.cordova"]=1:ha()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Gt.getInstance().currentlyOnline();return Xs(this.interruptReasons_)&&e}}ae.nextPersistentConnectionId_=0;ae.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class un{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new y(Ve,e),i=new y(Ve,t);return this.compare(s,i)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Lt;class Mr extends un{static get __EMPTY_NODE(){return Lt}static set __EMPTY_NODE(e){Lt=e}compare(e,t){return ke(e.name,t.name)}isDefinedOn(e){throw Qe("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(Se,Lt)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Lt)}toString(){return".key"}}const Be=new Mr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class B{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??B.RED,this.left=i??G.EMPTY_NODE,this.right=r??G.EMPTY_NODE}copy(e,t,s,i,r){return new B(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return G.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return G.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,B.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,B.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}B.RED=!0;B.BLACK=!1;class Oc{copy(e,t,s,i,r){return this}insert(e,t,s){return new B(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class G{constructor(e,t=G.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new G(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,B.BLACK,null,null))}remove(e){return new G(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,B.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ft(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ft(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ft(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ft(this.root_,null,this.comparator_,!0,e)}}G.EMPTY_NODE=new Oc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(n,e){return ke(n.name,e.name)}function Es(n,e){return ke(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $n;function Lc(n){$n=n}const Lr=function(n){return typeof n=="number"?"number:"+pr(n):"string:"+n},Fr=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ee(e,".sv"),"Priority must be a string or number.")}else f(n===$n||n.isEmpty(),"priority of unexpected type.");f(n===$n||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bi;class F{static set __childrenNodeConstructor(e){bi=e}static get __childrenNodeConstructor(){return bi}constructor(e,t=F.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Fr(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new F(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:g(e)===".priority"?this.priorityNode_:F.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:F.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=g(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(f(s!==".priority"||ge(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,F.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Lr(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=pr(this.value_):e+=this.value_,this.lazyHash_=dr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===F.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof F.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=F.VALUE_TYPE_ORDER.indexOf(t),r=F.VALUE_TYPE_ORDER.indexOf(s);return f(i>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}F.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Br,Ur;function Fc(n){Br=n}function Bc(n){Ur=n}class Uc extends un{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?ke(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Se,new F("[PRIORITY-POST]",Ur))}makePost(e,t){const s=Br(e);return new y(t,new F("[PRIORITY-POST]",s))}toString(){return".priority"}}const P=new Uc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=Math.log(2);class Vc{constructor(e){const t=r=>parseInt(Math.log(r)/Wc,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const qt=function(n,e,t,s){n.sort(e);const i=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new B(h,u.node,B.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=i(l,p),w=i(p+1,c);return u=n[p],h=t?t(u):u,new B(h,u.node,B.BLACK,_,w)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,w){const x=u-_,ne=u;u-=_;const se=i(x+1,ne),Ce=n[x],bn=t?t(Ce):Ce;p(new B(bn,Ce.node,w,null,se))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const w=l.nextBitIsOne(),x=Math.pow(2,l.count-(_+1));w?h(x,B.BLACK):(h(x,B.BLACK),h(x,B.RED))}return d},o=new Vc(n.length),a=r(o);return new G(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pn;const De={};class re{static get Default(){return f(De&&P,"ChildrenNode.ts has not been loaded"),Pn=Pn||new re({".priority":De},{".priority":P}),Pn}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=We(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof G?t:null}hasIndex(e){return ee(this.indexSet_,e.toString())}addIndex(e,t){f(e!==Be,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=qt(s,e.getCompare()):a=De;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new re(d,c)}addToIndexes(e,t){const s=Wt(this.indexes_,(i,r)=>{const o=We(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),i===De)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(y.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),qt(a,o.getCompare())}else return De;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new y(e.name,a))),l.insert(e,e.node)}});return new re(s,this.indexSet_)}removeFromIndexes(e,t){const s=Wt(this.indexes_,i=>{if(i===De)return i;{const r=t.get(e.name);return r?i.remove(new y(e.name,r)):i}});return new re(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nt;class m{static get EMPTY_NODE(){return nt||(nt=new m(new G(Es),null,re.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Fr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||nt}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?nt:t}}getChild(e){const t=g(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new y(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?nt:this.priorityNode_;return new m(i,o,r)}}updateChild(e,t){const s=g(e);if(s===null)return t;{f(g(e)!==".priority"||ge(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(T(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(P,(o,a)=>{t[o]=a.val(e),s++,r&&m.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Lr(this.getPriority().val())+":"),this.forEachChild(P,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":dr(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,y.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===At?-1:0}withIndex(e){if(e===Be||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Be||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(P),i=t.getIterator(P);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Be?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Hc extends m{constructor(){super(new G(Es),m.EMPTY_NODE,re.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const At=new Hc;Object.defineProperties(y,{MIN:{value:new y(Ve,m.EMPTY_NODE)},MAX:{value:new y(Se,At)}});Mr.__EMPTY_NODE=m.EMPTY_NODE;F.__childrenNodeConstructor=m;Lc(At);Bc(At);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=!0;function O(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new F(t,O(e))}if(!(n instanceof Array)&&$c){const t=[];let s=!1;if(H(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=O(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new y(o,l)))}}),t.length===0)return m.EMPTY_NODE;const r=qt(t,Mc,o=>o.name,Es);if(s){const o=qt(t,P.getCompare());return new m(r,O(e),new re({".priority":o},{".priority":P}))}else return new m(r,O(e),re.Default)}else{let t=m.EMPTY_NODE;return H(n,(s,i)=>{if(ee(n,s)&&s.substring(0,1)!=="."){const r=O(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(O(e))}}Fc(O);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc extends un{constructor(e){super(),this.indexPath_=e,f(!v(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?ke(e.name,t.name):r}makePost(e,t){const s=O(e),i=m.EMPTY_NODE.updateChild(this.indexPath_,s);return new y(t,i)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,At);return new y(Se,e)}toString(){return gt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc extends un{compare(e,t){const s=e.node.compareTo(t.node);return s===0?ke(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const s=O(e);return new y(t,s)}toString(){return".value"}}const qc=new Gc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wr(n){return{type:"value",snapshotNode:n}}function He(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function yt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function vt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function zc(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(yt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(He(t,s)):o.trackChildChange(vt(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(P,(i,r)=>{t.hasChild(i)||s.trackChildChange(yt(i,r))}),t.isLeafNode()||t.forEachChild(P,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(vt(i,r,o))}else s.trackChildChange(He(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.indexedFilter_=new ws(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ct.getStartPost_(e),this.endPost_=Ct.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new y(t,s))||(s=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=m.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(P,(o,a)=>{r.matches(new y(o,a))||(i=i.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Ct(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new y(t,s))||(s=m.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new y(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=i.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!s.isEmpty()&&p>=0)return r?.trackChildChange(vt(t,s,u)),a.updateImmediateChild(t,s);{r?.trackChildChange(yt(t,u));const w=a.updateImmediateChild(t,m.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(He(h.name,h.node)),w.updateImmediateChild(h.name,h.node)):w}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(yt(c.name,c.node)),r.trackChildChange(He(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=P}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ve}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Se}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===P}copy(){const e=new bs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Kc(n){return n.loadsAllData()?new ws(n.getIndex()):n.hasLimit()?new jc(n):new Ct(n)}function Ii(n){const e={};if(n.isDefault())return e;let t;if(n.index_===P?t="$priority":n.index_===qc?t="$value":n.index_===Be?t="$key":(f(n.index_ instanceof Yc,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=M(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=M(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+M(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=M(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+M(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Si(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==P&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends Pr{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=kt("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=zt.getListenId_(e,s),a={};this.listens_[o]=a;const l=Ii(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),We(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",i(h,null)}})}unlisten(e,t){const s=zt.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Ii(e._queryParams),s=e._path.toString(),i=new Tt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+va(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=ft(a.responseText)}catch{Y("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&Y("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(){return{value:null,children:new Map}}function Vr(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=g(e);n.children.has(s)||n.children.set(s,jt());const i=n.children.get(s);e=T(e),Vr(i,e,t)}}function Yn(n,e,t){n.value!==null?t(e,n.value):Xc(n,(s,i)=>{const r=new b(e.toString()+"/"+s);Yn(i,r,t)})}function Xc(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&H(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=10*1e3,Zc=30*1e3,eh=300*1e3;class th{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Jc(e);const s=Ti+(Zc-Ti)*Math.random();lt(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;H(e,(i,r)=>{r>0&&ee(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),lt(this.reportStats_.bind(this),Math.floor(Math.random()*2*eh))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(J||(J={}));function Is(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ss(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ts(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=J.ACK_USER_WRITE,this.source=Is()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new b(e));return new Kt(E(),t,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Kt(T(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e,t){this.source=e,this.path=t,this.type=J.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new Et(this.source,E()):new Et(this.source,T(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=J.OVERWRITE}operationForChild(e){return v(this.path)?new Te(this.source,E(),this.snap.getImmediateChild(e)):new Te(this.source,T(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=J.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new b(e));return t.isEmpty()?null:t.value?new Te(this.source,E(),t.value):new $e(this.source,E(),t)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new $e(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=g(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function sh(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(zc(o.childName,o.snapshotNode))}),st(n,i,"child_removed",e,s,t),st(n,i,"child_added",e,s,t),st(n,i,"child_moved",r,s,t),st(n,i,"child_changed",e,s,t),st(n,i,"value",e,s,t),i}function st(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>rh(n,a,l)),o.forEach(a=>{const l=ih(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function ih(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function rh(n,e,t){if(e.childName==null||t.childName==null)throw Qe("Should only compare child_ events.");const s=new y(e.childName,e.snapshotNode),i=new y(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,e){return{eventCache:n,serverCache:e}}function ct(n,e,t,s){return dn(new ye(e,t,s),n.serverCache)}function Hr(n,e,t,s){return dn(n.eventCache,new ye(e,t,s))}function Qt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ne(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn;const oh=()=>(Dn||(Dn=new G(Yl)),Dn);class I{static fromObject(e){let t=new I(null);return H(e,(s,i)=>{t=t.set(new b(s),i)}),t}constructor(e,t=oh()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const s=g(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:A(new b(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=g(e),s=this.children.get(t);return s!==null?s.subtree(T(e)):new I(null)}}set(e,t){if(v(e))return new I(t,this.children);{const s=g(e),r=(this.children.get(s)||new I(null)).set(T(e),t),o=this.children.insert(s,r);return new I(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new I(null):new I(null,this.children);{const t=g(e),s=this.children.get(t);if(s){const i=s.remove(T(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new I(null):new I(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=g(e),s=this.children.get(t);return s?s.get(T(e)):null}}setTree(e,t){if(v(e))return t;{const s=g(e),r=(this.children.get(s)||new I(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new I(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(A(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(v(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(T(e),A(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,s){if(v(e))return this;{this.value&&s(t,this.value);const i=g(e),r=this.children.get(i);return r?r.foreachOnPath_(T(e),A(t,i),s):new I(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(A(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.writeTree_=e}static empty(){return new Z(new I(null))}}function ht(n,e,t){if(v(e))return new Z(new I(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=$(i,e);return r=r.updateChild(o,t),new Z(n.writeTree_.set(i,r))}else{const i=new I(t),r=n.writeTree_.setTree(e,i);return new Z(r)}}}function Gn(n,e,t){let s=n;return H(t,(i,r)=>{s=ht(s,A(e,i),r)}),s}function Ni(n,e){if(v(e))return Z.empty();{const t=n.writeTree_.setTree(e,new I(null));return new Z(t)}}function qn(n,e){return Ae(n,e)!=null}function Ae(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild($(t.path,e)):null}function Ri(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(P,(s,i)=>{e.push(new y(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new y(s,i.value))}),e}function _e(n,e){if(v(e))return n;{const t=Ae(n,e);return t!=null?new Z(new I(t)):new Z(n.writeTree_.subtree(e))}}function zn(n){return n.writeTree_.isEmpty()}function Ye(n,e){return $r(E(),n.writeTree_,e)}function $r(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=$r(A(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(A(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(n,e){return zr(e,n)}function ah(n,e,t,s,i){f(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=ht(n.visibleWrites,e,t)),n.lastWriteId=s}function lh(n,e,t,s){f(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=Gn(n.visibleWrites,e,t),n.lastWriteId=s}function ch(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function hh(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&uh(a,s.path)?i=!1:q(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return dh(n),!0;if(s.snap)n.visibleWrites=Ni(n.visibleWrites,s.path);else{const a=s.children;H(a,l=>{n.visibleWrites=Ni(n.visibleWrites,A(s.path,l))})}return!0}else return!1}function uh(n,e){if(n.snap)return q(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&q(A(n.path,t),e))return!0;return!1}function dh(n){n.visibleWrites=Yr(n.allWrites,fh,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function fh(n){return n.visible}function Yr(n,e,t){let s=Z.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)q(t,o)?(a=$(t,o),s=ht(s,a,r.snap)):q(o,t)&&(a=$(o,t),s=ht(s,E(),r.snap.getChild(a)));else if(r.children){if(q(t,o))a=$(t,o),s=Gn(s,a,r.children);else if(q(o,t))if(a=$(o,t),v(a))s=Gn(s,E(),r.children);else{const l=We(r.children,g(a));if(l){const c=l.getChild(T(a));s=ht(s,E(),c)}}}else throw Qe("WriteRecord should have .snap or .children")}}return s}function Gr(n,e,t,s,i){if(!s&&!i){const r=Ae(n.visibleWrites,e);if(r!=null)return r;{const o=_e(n.visibleWrites,e);if(zn(o))return t;if(t==null&&!qn(o,E()))return null;{const a=t||m.EMPTY_NODE;return Ye(o,a)}}}else{const r=_e(n.visibleWrites,e);if(!i&&zn(r))return t;if(!i&&t==null&&!qn(r,E()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(q(c.path,e)||q(e,c.path))},a=Yr(n.allWrites,o,e),l=t||m.EMPTY_NODE;return Ye(a,l)}}}function ph(n,e,t){let s=m.EMPTY_NODE;const i=Ae(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(P,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=_e(n.visibleWrites,e);return t.forEachChild(P,(o,a)=>{const l=Ye(_e(r,new b(o)),a);s=s.updateImmediateChild(o,l)}),Ri(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=_e(n.visibleWrites,e);return Ri(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function _h(n,e,t,s,i){f(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(qn(n.visibleWrites,r))return null;{const o=_e(n.visibleWrites,r);return zn(o)?i.getChild(t):Ye(o,i.getChild(t))}}function mh(n,e,t,s){const i=A(e,t),r=Ae(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=_e(n.visibleWrites,i);return Ye(o,s.getNode().getImmediateChild(t))}else return null}function gh(n,e){return Ae(n.visibleWrites,e)}function yh(n,e,t,s,i,r,o){let a;const l=_e(n.visibleWrites,e),c=Ae(l,E());if(c!=null)a=c;else if(t!=null)a=Ye(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let p=h.getNext();for(;p&&d.length<i;)u(p,s)!==0&&d.push(p),p=h.getNext();return d}else return[]}function vh(){return{visibleWrites:Z.empty(),allWrites:[],lastWriteId:-1}}function Xt(n,e,t,s){return Gr(n.writeTree,n.treePath,e,t,s)}function Ns(n,e){return ph(n.writeTree,n.treePath,e)}function ki(n,e,t,s){return _h(n.writeTree,n.treePath,e,t,s)}function Jt(n,e){return gh(n.writeTree,A(n.treePath,e))}function Ch(n,e,t,s,i,r){return yh(n.writeTree,n.treePath,e,t,s,i,r)}function Rs(n,e,t){return mh(n.writeTree,n.treePath,e,t)}function qr(n,e){return zr(A(n.treePath,e),n.writeTree)}function zr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,vt(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,yt(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,He(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,vt(s,e.snapshotNode,i.oldSnap));else throw Qe("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const jr=new wh;class ks{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ye(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Rs(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ne(this.viewCache_),r=Ch(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(n){return{filter:n}}function Ih(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Sh(n,e,t,s,i){const r=new Eh;let o,a;if(t.type===J.OVERWRITE){const c=t;c.source.fromUser?o=jn(n,e,c.path,c.snap,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=Zt(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===J.MERGE){const c=t;c.source.fromUser?o=Nh(n,e,c.path,c.children,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Kn(n,e,c.path,c.children,s,i,a,r))}else if(t.type===J.ACK_USER_WRITE){const c=t;c.revert?o=Ah(n,e,c.path,s,i,r):o=Rh(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===J.LISTEN_COMPLETE)o=kh(n,e,t.path,s,r);else throw Qe("Unknown operation type: "+t.type);const l=r.getChanges();return Th(e,o,l),{viewCache:o,changes:l}}function Th(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Qt(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Wr(Qt(e)))}}function Kr(n,e,t,s,i,r){const o=e.eventCache;if(Jt(s,t)!=null)return e;{let a,l;if(v(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ne(e),d=c instanceof m?c:m.EMPTY_NODE,u=Ns(s,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Xt(s,Ne(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(t);if(c===".priority"){f(ge(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=ki(s,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=T(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=ki(s,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Rs(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return ct(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function Zt(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,s);c=d.updateFullNode(l.getNode(),p,null)}else{const p=g(t);if(!l.isCompleteForPath(t)&&ge(t)>1)return e;const _=T(t),x=l.getNode().getImmediateChild(p).updateChild(_,s);p===".priority"?c=d.updatePriority(l.getNode(),x):c=d.updateChild(l.getNode(),p,x,_,jr,null)}const u=Hr(e,c,l.isFullyInitialized()||v(t),d.filtersNodes()),h=new ks(i,u,r);return Kr(n,u,t,i,h,a)}function jn(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const d=new ks(i,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=ct(e,c,!0,n.filter.filtersNodes());else{const u=g(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=ct(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=T(t),p=a.getNode().getImmediateChild(u);let _;if(v(h))_=s;else{const w=d.getCompleteChild(u);w!=null?ys(h)===".priority"&&w.getChild(xr(h)).isEmpty()?_=w:_=w.updateChild(h,s):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const w=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=ct(e,w,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Ai(n,e){return n.eventCache.isCompleteForChild(e)}function Nh(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=A(t,l);Ai(e,g(d))&&(a=jn(n,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=A(t,l);Ai(e,g(d))||(a=jn(n,a,d,c,i,r,o))}),a}function Pi(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function Kn(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=s:c=new I(null).setTree(t,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Pi(n,p,h);l=Zt(n,l,new b(u),_,i,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),w=Pi(n,_,h);l=Zt(n,l,new b(u),w,i,r,o,a)}}),l}function Rh(n,e,t,s,i,r,o){if(Jt(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Zt(n,e,t,l.getNode().getChild(t),i,r,a,o);if(v(t)){let c=new I(null);return l.getNode().forEachChild(Be,(d,u)=>{c=c.set(new b(d),u)}),Kn(n,e,t,c,i,r,a,o)}else return e}else{let c=new I(null);return s.foreach((d,u)=>{const h=A(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Kn(n,e,t,c,i,r,a,o)}}function kh(n,e,t,s,i){const r=e.serverCache,o=Hr(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return Kr(n,o,t,s,jr,i)}function Ah(n,e,t,s,i,r){let o;if(Jt(s,t)!=null)return e;{const a=new ks(s,e,i),l=e.eventCache.getNode();let c;if(v(t)||g(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Xt(s,Ne(e));else{const u=e.serverCache.getNode();f(u instanceof m,"serverChildren would be complete if leaf node"),d=Ns(s,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=g(t);let u=Rs(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,T(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,m.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Xt(s,Ne(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Jt(s,E())!=null,ct(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new ws(s.getIndex()),r=Kc(s);this.processor_=bh(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new ye(l,o.isFullyInitialized(),i.filtersNodes()),u=new ye(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=dn(u,d),this.eventGenerator_=new nh(this.query_)}get query(){return this.query_}}function Dh(n){return n.viewCache_.serverCache.getNode()}function xh(n){return Qt(n.viewCache_)}function Oh(n,e){const t=Ne(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(g(e)).isEmpty())?t.getChild(e):null}function Di(n){return n.eventRegistrations_.length===0}function Mh(n,e){n.eventRegistrations_.push(e)}function xi(n,e,t){const s=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Oi(n,e,t,s){e.type===J.MERGE&&e.source.queryId!==null&&(f(Ne(n.viewCache_),"We should always have a full cache before handling merges"),f(Qt(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=Sh(n.processor_,i,e,t,s);return Ih(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Qr(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Lh(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(P,(r,o)=>{s.push(He(r,o))}),t.isFullyInitialized()&&s.push(Wr(t.getNode())),Qr(n,s,t.getNode(),e)}function Qr(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return sh(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en;class Xr{constructor(){this.views=new Map}}function Fh(n){f(!en,"__referenceConstructor has already been defined"),en=n}function Bh(){return f(en,"Reference.ts has not been loaded"),en}function Uh(n){return n.views.size===0}function As(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return f(r!=null,"SyncTree gave us an op for an invalid query."),Oi(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Oi(o,e,t,s));return r}}function Jr(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Xt(t,i?s:null),l=!1;a?l=!0:s instanceof m?(a=Ns(t,s),l=!1):(a=m.EMPTY_NODE,l=!1);const c=dn(new ye(a,l,!1),new ye(s,i,!1));return new Ph(e,c)}return o}function Wh(n,e,t,s,i,r){const o=Jr(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Mh(o,t),Lh(o,t)}function Vh(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=ve(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(xi(c,t,s)),Di(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(xi(l,t,s)),Di(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ve(n)&&r.push(new(Bh())(e._repo,e._path)),{removed:r,events:o}}function Zr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function me(n,e){let t=null;for(const s of n.views.values())t=t||Oh(s,e);return t}function eo(n,e){if(e._queryParams.loadsAllData())return pn(n);{const s=e._queryIdentifier;return n.views.get(s)}}function to(n,e){return eo(n,e)!=null}function ve(n){return pn(n)!=null}function pn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tn;function Hh(n){f(!tn,"__referenceConstructor has already been defined"),tn=n}function $h(){return f(tn,"Reference.ts has not been loaded"),tn}let Yh=1;class Mi{constructor(e){this.listenProvider_=e,this.syncPointTree_=new I(null),this.pendingWriteTree_=vh(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function no(n,e,t,s,i){return ah(n.pendingWriteTree_,e,t,s,i),i?Je(n,new Te(Is(),e,t)):[]}function Gh(n,e,t,s){lh(n.pendingWriteTree_,e,t,s);const i=I.fromObject(t);return Je(n,new $e(Is(),e,i))}function ue(n,e,t=!1){const s=ch(n.pendingWriteTree_,e);if(hh(n.pendingWriteTree_,e)){let r=new I(null);return s.snap!=null?r=r.set(E(),!0):H(s.children,o=>{r=r.set(new b(o),!0)}),Je(n,new Kt(s.path,r,t))}else return[]}function Pt(n,e,t){return Je(n,new Te(Ss(),e,t))}function qh(n,e,t){const s=I.fromObject(t);return Je(n,new $e(Ss(),e,s))}function zh(n,e){return Je(n,new Et(Ss(),e))}function jh(n,e,t){const s=Ds(n,t);if(s){const i=xs(s),r=i.path,o=i.queryId,a=$(r,e),l=new Et(Ts(o),a);return Os(n,r,l)}else return[]}function nn(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||to(o,e))){const l=Vh(o,e,t,s);Uh(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>ve(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=Xh(h);for(let _=0;_<p.length;++_){const w=p[_],x=w.query,ne=oo(n,w);n.listenProvider_.startListening(ut(x),wt(n,x),ne.hashFn,ne.onComplete)}}}!u&&c.length>0&&!s&&(d?n.listenProvider_.stopListening(ut(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(_n(h));n.listenProvider_.stopListening(ut(h),p)}))}Jh(n,c)}return a}function so(n,e,t,s){const i=Ds(n,s);if(i!=null){const r=xs(i),o=r.path,a=r.queryId,l=$(o,e),c=new Te(Ts(a),l,t);return Os(n,o,c)}else return[]}function Kh(n,e,t,s){const i=Ds(n,s);if(i){const r=xs(i),o=r.path,a=r.queryId,l=$(o,e),c=I.fromObject(t),d=new $e(Ts(a),l,c);return Os(n,o,d)}else return[]}function Qn(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(h,p)=>{const _=$(h,i);r=r||me(p,_),o=o||ve(p)});let a=n.syncPointTree_.get(i);a?(o=o||ve(a),r=r||me(a,E())):(a=new Xr,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((p,_)=>{const w=me(_,E());w&&(r=r.updateImmediateChild(p,w))}));const c=to(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=_n(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=Zh();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=fn(n.pendingWriteTree_,i);let u=Wh(a,e,t,d,r,l);if(!c&&!o&&!s){const h=eo(a,e);u=u.concat(eu(n,e,h))}return u}function Ps(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=$(o,e),c=me(a,l);if(c)return c});return Gr(i,e,r,t,!0)}function Qh(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=$(c,t);s=s||me(d,u)});let i=n.syncPointTree_.get(t);i?s=s||me(i,E()):(i=new Xr,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new ye(s,!0,!1):null,a=fn(n.pendingWriteTree_,e._path),l=Jr(i,e,a,r?o.getNode():m.EMPTY_NODE,r);return xh(l)}function Je(n,e){return io(e,n.syncPointTree_,null,fn(n.pendingWriteTree_,E()))}function io(n,e,t,s){if(v(n.path))return ro(n,e,t,s);{const i=e.get(E());t==null&&i!=null&&(t=me(i,E()));let r=[];const o=g(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=qr(s,o);r=r.concat(io(a,l,c,d))}return i&&(r=r.concat(As(i,n,s,t))),r}}function ro(n,e,t,s){const i=e.get(E());t==null&&i!=null&&(t=me(i,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=qr(s,o),d=n.operationForChild(o);d&&(r=r.concat(ro(d,a,l,c)))}),i&&(r=r.concat(As(i,n,s,t))),r}function oo(n,e){const t=e.query,s=wt(n,t);return{hashFn:()=>(Dh(e)||m.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?jh(n,t._path,s):zh(n,t._path);{const r=zl(i,t);return nn(n,t,null,r)}}}}function wt(n,e){const t=_n(e);return n.queryToTagMap.get(t)}function _n(n){return n._path.toString()+"$"+n._queryIdentifier}function Ds(n,e){return n.tagToQueryMap.get(e)}function xs(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new b(n.substr(0,e))}}function Os(n,e,t){const s=n.syncPointTree_.get(e);f(s,"Missing sync point for query tag that we're tracking");const i=fn(n.pendingWriteTree_,e);return As(s,t,i,null)}function Xh(n){return n.fold((e,t,s)=>{if(t&&ve(t))return[pn(t)];{let i=[];return t&&(i=Zr(t)),H(s,(r,o)=>{i=i.concat(o)}),i}})}function ut(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new($h())(n._repo,n._path):n}function Jh(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=_n(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Zh(){return Yh++}function eu(n,e,t){const s=e._path,i=wt(n,e),r=oo(n,t),o=n.listenProvider_.startListening(ut(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)f(!ve(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!v(c)&&d&&ve(d))return[pn(d).query];{let h=[];return d&&(h=h.concat(Zr(d).map(p=>p.query))),H(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(ut(d),wt(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ms(t)}node(){return this.node_}}class Ls{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Ls(this.syncTree_,t)}node(){return Ps(this.syncTree_,this.path_)}}const tu=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Li=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return nu(n[".sv"],e,t);if(typeof n[".sv"]=="object")return su(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},nu=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},su=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&f(!1,"Unexpected increment value: "+s);const i=e.node();if(f(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},ao=function(n,e,t,s){return Fs(e,new Ls(t,n),s)},lo=function(n,e,t){return Fs(n,new Ms(e),t)};function Fs(n,e,t){const s=n.getPriority().val(),i=Li(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Li(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new F(a,O(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new F(i))),o.forEachChild(P,(a,l)=>{const c=Fs(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Us(n,e){let t=e instanceof b?e:new b(e),s=n,i=g(t);for(;i!==null;){const r=We(s.node.children,i)||{children:{},childCount:0};s=new Bs(i,s,r),t=T(t),i=g(t)}return s}function Ze(n){return n.node.value}function co(n,e){n.node.value=e,Xn(n)}function ho(n){return n.node.childCount>0}function iu(n){return Ze(n)===void 0&&!ho(n)}function mn(n,e){H(n.node.children,(t,s)=>{e(new Bs(t,n,s))})}function uo(n,e,t,s){t&&e(n),mn(n,i=>{uo(i,e,!0)})}function ru(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Dt(n){return new b(n.parent===null?n.name:Dt(n.parent)+"/"+n.name)}function Xn(n){n.parent!==null&&ou(n.parent,n.name,n)}function ou(n,e,t){const s=iu(t),i=ee(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Xn(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Xn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au=/[\[\].#$\/\u0000-\u001F\u007F]/,lu=/[\[\].#$\u0000-\u001F\u007F]/,xn=10*1024*1024,Ws=function(n){return typeof n=="string"&&n.length!==0&&!au.test(n)},fo=function(n){return typeof n=="string"&&n.length!==0&&!lu.test(n)},cu=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),fo(n)},hu=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!fs(n)||n&&typeof n=="object"&&ee(n,".sv")},po=function(n,e,t,s){s&&e===void 0||gn(cn(n,"value"),e,t)},gn=function(n,e,t){const s=t instanceof b?new Nc(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+we(s));if(typeof e=="function")throw new Error(n+"contains a function "+we(s)+" with contents = "+e.toString());if(fs(e))throw new Error(n+"contains "+e.toString()+" "+we(s));if(typeof e=="string"&&e.length>xn/3&&hn(e)>xn)throw new Error(n+"contains a string greater than "+xn+" utf8 bytes "+we(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(H(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ws(o)))throw new Error(n+" contains an invalid key ("+o+") "+we(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Rc(s,o),gn(n,a,s),kc(s)}),i&&r)throw new Error(n+' contains ".value" child '+we(s)+" in addition to actual children.")}},uu=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=gt(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ws(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Tc);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&q(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},du=function(n,e,t,s){const i=cn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];H(e,(o,a)=>{const l=new b(o);if(gn(i,a,A(t,l)),ys(l)===".priority"&&!hu(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),uu(i,r)},_o=function(n,e,t,s){if(!fo(t))throw new Error(cn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},fu=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),_o(n,e,t)},Vs=function(n,e){if(g(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},pu=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ws(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!cu(t))throw new Error(cn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function yn(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!vs(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function mo(n,e,t){yn(n,t),go(n,s=>vs(s,e))}function K(n,e,t){yn(n,t),go(n,s=>q(s,e)||q(e,s))}function go(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(mu(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function mu(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();at&&W("event: "+t.toString()),Xe(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gu="repo_interrupt",yu=25;class vu{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new _u,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=jt(),this.transactionQueueTree_=new Bs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Cu(n,e,t){if(n.stats_=ms(n.repoInfo_),n.forceRestClient_||Xl())n.server_=new zt(n.repoInfo_,(s,i,r,o)=>{Fi(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Bi(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new ae(n.repoInfo_,e,(s,i,r,o)=>{Fi(n,s,i,r,o)},s=>{Bi(n,s)},s=>{Eu(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=nc(n.repoInfo_,()=>new th(n.stats_,n.server_)),n.infoData_=new Qc,n.infoSyncTree_=new Mi({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=Pt(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Hs(n,"connected",!1),n.serverSyncTree_=new Mi({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);K(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function yo(n){const t=n.infoData_.getNode(new b(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function vn(n){return tu({timestamp:yo(n)})}function Fi(n,e,t,s,i){n.dataUpdateCount++;const r=new b(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Wt(t,c=>O(c));o=Kh(n.serverSyncTree_,r,l,i)}else{const l=O(t);o=so(n.serverSyncTree_,r,l,i)}else if(s){const l=Wt(t,c=>O(c));o=qh(n.serverSyncTree_,r,l)}else{const l=O(t);o=Pt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Ge(n,r)),K(n.eventQueue_,a,o)}function Bi(n,e){Hs(n,"connected",e),e===!1&&Su(n)}function Eu(n,e){H(e,(t,s)=>{Hs(n,t,s)})}function Hs(n,e,t){const s=new b("/.info/"+e),i=O(t);n.infoData_.updateSnapshot(s,i);const r=Pt(n.infoSyncTree_,s,i);K(n.eventQueue_,s,r)}function $s(n){return n.nextWriteId_++}function wu(n,e,t){const s=Qh(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=O(i).withIndex(e._queryParams.getIndex());Qn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Pt(n.serverSyncTree_,e._path,r);else{const a=wt(n.serverSyncTree_,e);o=so(n.serverSyncTree_,e._path,r,a)}return K(n.eventQueue_,e._path,o),nn(n.serverSyncTree_,e,t,null,!0),r},i=>(xt(n,"get for query "+M(e)+" failed: "+i),Promise.reject(new Error(i))))}function bu(n,e,t,s,i){xt(n,"set",{path:e.toString(),value:t,priority:s});const r=vn(n),o=O(t,s),a=Ps(n.serverSyncTree_,e),l=lo(o,a,r),c=$s(n),d=no(n.serverSyncTree_,e,l,c,!0);yn(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||Y("set at "+e+" failed: "+h);const w=ue(n.serverSyncTree_,c,!_);K(n.eventQueue_,e,w),Jn(n,i,h,p)});const u=Gs(n,e);Ge(n,u),K(n.eventQueue_,u,[])}function Iu(n,e,t,s){xt(n,"update",{path:e.toString(),value:t});let i=!0;const r=vn(n),o={};if(H(t,(a,l)=>{i=!1,o[a]=ao(A(e,a),O(l),n.serverSyncTree_,r)}),i)W("update() called with empty data.  Don't do anything."),Jn(n,s,"ok",void 0);else{const a=$s(n),l=Gh(n.serverSyncTree_,e,o,a);yn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||Y("update at "+e+" failed: "+c);const h=ue(n.serverSyncTree_,a,!u),p=h.length>0?Ge(n,e):e;K(n.eventQueue_,p,h),Jn(n,s,c,d)}),H(t,c=>{const d=Gs(n,A(e,c));Ge(n,d)}),K(n.eventQueue_,e,[])}}function Su(n){xt(n,"onDisconnectEvents");const e=vn(n),t=jt();Yn(n.onDisconnect_,E(),(i,r)=>{const o=ao(i,r,n.serverSyncTree_,e);Vr(t,i,o)});let s=[];Yn(t,E(),(i,r)=>{s=s.concat(Pt(n.serverSyncTree_,i,r));const o=Gs(n,i);Ge(n,o)}),n.onDisconnect_=jt(),K(n.eventQueue_,E(),s)}function Tu(n,e,t){let s;g(e._path)===".info"?s=Qn(n.infoSyncTree_,e,t):s=Qn(n.serverSyncTree_,e,t),mo(n.eventQueue_,e._path,s)}function vo(n,e,t){let s;g(e._path)===".info"?s=nn(n.infoSyncTree_,e,t):s=nn(n.serverSyncTree_,e,t),mo(n.eventQueue_,e._path,s)}function Nu(n){n.persistentConnection_&&n.persistentConnection_.interrupt(gu)}function xt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),W(t,...e)}function Jn(n,e,t,s){e&&Xe(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function Co(n,e,t){return Ps(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function Ys(n,e=n.transactionQueueTree_){if(e||Cn(n,e),Ze(e)){const t=wo(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&Ru(n,Dt(e),t)}else ho(e)&&mn(e,t=>{Ys(n,t)})}function Ru(n,e,t){const s=t.map(c=>c.currentWriteId),i=Co(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=$(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{xt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(ue(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Cn(n,Us(n.transactionQueueTree_,e)),Ys(n,n.transactionQueueTree_),K(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)Xe(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{Y("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Ge(n,e)}},o)}function Ge(n,e){const t=Eo(n,e),s=Dt(t),i=wo(n,t);return ku(n,i,s),s}function ku(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=$(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(ue(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=yu)d=!0,u="maxretry",i=i.concat(ue(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Co(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){gn("transaction failed: Data returned ",p,l.path);let _=O(p);typeof p=="object"&&p!=null&&ee(p,".priority")||(_=_.updatePriority(h.getPriority()));const x=l.currentWriteId,ne=vn(n),se=lo(_,h,ne);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=se,l.currentWriteId=$s(n),o.splice(o.indexOf(x),1),i=i.concat(no(n.serverSyncTree_,l.path,se,l.currentWriteId,l.applyLocally)),i=i.concat(ue(n.serverSyncTree_,x,!0))}else d=!0,u="nodata",i=i.concat(ue(n.serverSyncTree_,l.currentWriteId,!0))}K(n.eventQueue_,t,i),i=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}Cn(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Xe(s[a]);Ys(n,n.transactionQueueTree_)}function Eo(n,e){let t,s=n.transactionQueueTree_;for(t=g(e);t!==null&&Ze(s)===void 0;)s=Us(s,t),e=T(e),t=g(e);return s}function wo(n,e){const t=[];return bo(n,e,t),t.sort((s,i)=>s.order-i.order),t}function bo(n,e,t){const s=Ze(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);mn(e,i=>{bo(n,i,t)})}function Cn(n,e){const t=Ze(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,co(e,t.length>0?t:void 0)}mn(e,s=>{Cn(n,s)})}function Gs(n,e){const t=Dt(Eo(n,e)),s=Us(n.transactionQueueTree_,e);return ru(s,i=>{On(n,i)}),On(n,s),uo(s,i=>{On(n,i)}),t}function On(n,e){const t=Ze(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ue(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?co(e,void 0):t.length=r+1,K(n.eventQueue_,Dt(e),i);for(let o=0;o<s.length;o++)Xe(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Au(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function Pu(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Y(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ui=function(n,e){const t=Du(n),s=t.namespace;t.domain==="firebase.com"&&he(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&he("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Hl();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ir(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new b(t.pathString)}},Du=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(i=Au(n.substring(d,u)));const h=Pu(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");s=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=s}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wi="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",xu=(function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Wi.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Wi.charAt(e[i]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+M(this.snapshot.exportVal())}}class So{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class zs{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return v(this._path)?null:ys(this._path)}get ref(){return new te(this._repo,this._path)}get _queryIdentifier(){const e=Si(this._queryParams),t=ps(e);return t==="{}"?"default":t}get _queryObject(){return Si(this._queryParams)}isEqual(e){if(e=Re(e),!(e instanceof zs))return!1;const t=this._repo===e._repo,s=vs(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Sc(this._path)}}class te extends zs{constructor(e,t){super(e,t,new bs,!1)}get parent(){const e=xr(this._path);return e===null?null:new te(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class qe{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new b(e),s=ze(this.ref,e);return new qe(this._node.getChild(t),s,P)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new qe(i,ze(this.ref,s),P)))}hasChild(e){const t=new b(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function z(n,e){return n=Re(n),n._checkNotDeleted("ref"),e!==void 0?ze(n._root,e):n._root}function ze(n,e){return n=Re(n),g(n._path)===null?fu("child","path",e):_o("child","path",e),new te(n._repo,A(n._path,e))}function To(n,e){n=Re(n),Vs("push",n._path),po("push",e,n._path,!0);const t=yo(n._repo),s=xu(t),i=ze(n,s),r=ze(n,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function Ou(n){return Vs("remove",n._path),je(n,null)}function je(n,e){n=Re(n),Vs("set",n._path),po("set",e,n._path,!1);const t=new Tt;return bu(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function No(n,e){du("update",e,n._path);const t=new Tt;return Iu(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Mu(n){n=Re(n);const e=new qs(()=>{}),t=new Ot(e);return wu(n._repo,n,t).then(s=>new qe(s,new te(n._repo,n._path),n._queryParams.getIndex()))}class Ot{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new Io("value",this,new qe(e.snapshotNode,new te(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new So(this,e,t):null}matches(e){return e instanceof Ot?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class En{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new So(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const s=ze(new te(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new Io(e.type,this,new qe(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof En?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Ro(n,e,t,s,i){const r=new qs(t,void 0),o=e==="value"?new Ot(r):new En(e,r);return Tu(n._repo,n,o),()=>vo(n._repo,n,o)}function ko(n,e,t,s){return Ro(n,"value",e)}function Ao(n,e,t,s){return Ro(n,"child_added",e)}function Lu(n,e,t){let s=null;const i=t?new qs(t):null;e==="value"?s=new Ot(i):e&&(s=new En(e,i)),vo(n._repo,n,s)}Fh(te);Hh(te);/**
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
 */const Fu="FIREBASE_DATABASE_EMULATOR_HOST",Zn={};let Bu=!1;function Uu(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=us(r);n.repoInfo_=new Ir(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function Wu(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||he("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),W("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ui(r,i),a=o.repoInfo,l;typeof process<"u"&&ai&&(l=ai[Fu]),l?(r=`http://${l}?ns=${a.namespace}`,o=Ui(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Zl(n.name,n.options,e);pu("Invalid Firebase Database URL",o),v(o.path)||he("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Hu(a,n,c,new Jl(n,t));return new $u(d,n)}function Vu(n,e){const t=Zn[e];(!t||t[n.key]!==n)&&he(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Nu(n),delete t[n.key]}function Hu(n,e,t,s){let i=Zn[e.name];i||(i={},Zn[e.name]=i);let r=i[n.toURLString()];return r&&he("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new vu(n,Bu,t,s),i[n.toURLString()]=r,r}class $u{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Cu(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new te(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Vu(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&he("Cannot call "+e+" on a deleted database.")}}function Yu(n=bl(),e){const t=yl(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=sa("database");s&&Gu(t,...s)}return t}function Gu(n,e,t,s={}){n=Re(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&Vt(s,r.repoInfo_.emulatorOptions))return;he("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&he('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Bt(Bt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:ra(s.mockUserToken,n.app.options.projectId);o=new Bt(a)}us(e)&&(ia(e),la("Database",!0)),Uu(r,i,s,o)}/**
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
 */function qu(n){Ll(wl),$t(new pt("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Wu(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Le(li,ci,n),Le(li,ci,"esm2020")}ae.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ae.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};qu();const V=document.getElementById("localVideo"),D=document.getElementById("remoteVideo"),R=document.getElementById("sharedVideo"),bt=document.getElementById("startChat"),wn=document.getElementById("hangUp"),zu=document.getElementById("copyLink"),Ue=document.getElementById("pipBtn"),Vi=document.getElementById("switchCameraSelfBtn"),es=document.getElementById("toggleMode"),ju=document.getElementById("loadStream"),Ku=document.getElementById("status"),Po=document.getElementById("linkContainer"),ts=document.getElementById("watchContainer"),Ke=document.getElementById("yt-player-div"),ns=document.querySelector(".video-container"),X=document.getElementById("syncStatus"),sn=document.getElementById("shareLink"),It=document.getElementById("streamUrl"),Do=document.getElementById("mutePartnerBtn"),Qu=document.getElementById("fullscreenPartnerBtn"),xo=document.getElementById("muteSelfBtn"),Hi=document.getElementById("videoSelfBtn"),Xu=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");const rn=document.getElementById("titleLink");document.getElementById("titleText");let L=null,Pe=!1;function Ju(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function ss(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function Oo(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const s=n.match(t);if(s&&s[1])return s[1]}return null}async function Zu({url:n,containerId:e,onReady:t,onStateChange:s}){const i=Oo(n);if(!i)throw new Error("Invalid YouTube URL");if(await Ju(),!document.getElementById(e))throw new Error(`Container #${e} not found`);if(L){try{L.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}L=null}return new Promise((o,a)=>{try{L=new window.YT.Player(e,{videoId:i,playerVars:{autoplay:0,controls:1,rel:0,modestbranding:1},events:{onReady:l=>{Pe=!0,t&&t(l),o(L)},onStateChange:l=>{s&&s(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function $i(){return L}function Mo(){if(L){try{L.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}L=null,Pe=!1}}function Yi(){L&&Pe&&L.playVideo()}function Gi(){L&&Pe&&L.pauseVideo()}function ed(n){L&&Pe&&L.seekTo(n,!0)}function on(){return L&&Pe?L.getCurrentTime():0}function is(){return L&&Pe?L.getPlayerState():-1}const de={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let St=[],be=null,dt=!1,Lo=!1,rs="",ie=-1;const td="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",nd="https://www.googleapis.com/youtube/v3";function sd(n){be=n;const e=document.querySelector(".search-section"),t=document.getElementById("searchBtn"),s=document.getElementById("searchQuery"),i=document.getElementById("searchResults");if(!t||!s||!i){console.error("YouTube search elements not found in DOM");return}const r=a=>/^https?:\/\//i.test(a),o=a=>{i.querySelectorAll(".search-result-item").forEach((c,d)=>{d===a?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),ie=a};t.onclick=async()=>{const a=s.value.trim();if(!a){as("Please enter a search term");return}if(dt&&a===rs)os(St);else if(!r(a))await qi(a);else{be&&be({url:a,title:a,channel:"",thumbnail:"",id:a}),i.style.display="none",s.value="";return}},e.addEventListener("keydown",async a=>{const l=i.querySelectorAll(".search-result-item");if(l.length>0&&(a.key==="ArrowDown"||a.key==="ArrowUp")){if(a.preventDefault(),a.key==="ArrowDown"){let c=ie+1;c>=l.length&&(c=0),o(c)}else if(a.key==="ArrowUp"){let c=ie-1;c<0&&(c=l.length-1),o(c)}return}if(a.key==="Enter"){if(l.length>0&&ie>=0){l[ie].click();return}const c=s.value.trim();if(c)if(dt&&c===rs)os(St);else if(!r(c))await qi(c);else{be&&be({url:c,title:c,channel:"",thumbnail:"",id:c}),i.style.display="none",s.value="";return}}else a.key==="Escape"&&Lo&&(i.style.display="none")})}async function qi(n){rs=n;const e=document.getElementById("searchBtn"),t=document.getElementById("searchResults");e.disabled=!0,e.textContent="Searching...",t.innerHTML='<div class="search-loading">Searching YouTube...</div>',t.style.display="block",dt=!1;try{const s=await fetch(`${nd}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${td}`);if(!s.ok)throw s.status===403?new Error("YouTube API quota exceeded. Please try again later."):s.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${s.status}`);const i=await s.json();if(!i.items||i.items.length===0){as("No videos found"),dt=!1;return}St=i.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),os(St),dt=!0}catch(s){console.error("YouTube search failed:",s),as(s.message||"Search failed. Please try again.")}finally{e.disabled=!1,e.textContent="Search"}}function os(n){const e=document.getElementById("searchResults");if(!n||n.length===0){e.innerHTML='<div class="no-results">No results found</div>',ie=-1;return}e.innerHTML="",n.forEach(s=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
        <img src="${s.thumbnail}" alt="${s.title}" class="result-thumbnail">
        <div class="result-info">
          <div class="result-title">${s.title}</div>
          <div class="result-channel">${s.channel}</div>
        </div>
      `,i.onclick=()=>{if(be){be(s),e.style.display="none";const r=document.getElementById("searchQuery");r&&(r.value=""),ie=-1}},e.appendChild(i)}),e.style.display="block",Lo=!0,ie=0,e.querySelectorAll(".search-result-item").forEach((s,i)=>{i===ie?(s.classList.add("focused"),s.scrollIntoView({block:"nearest"})):s.classList.remove("focused")})}function as(n){const e=document.getElementById("searchResults");e.innerHTML=`<div class="search-error">${n}</div>`,e.style.display="block"}function id(){const n=document.getElementById("searchResults");n&&(n.innerHTML="",n.style.display="none"),St=[]}const rd={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},od=ar(rd),j=Yu(od),Fo={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};let C=null,U=null,N=null,Mt=null,an=null,it=!1,Oe=null,js=!1;const ls=[];let cs=null,rt=0;async function Bo(){Mt=Math.random().toString(36).substring(2,15);try{return U=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),V.srcObject=U,V.volume=0,ud(),!0}catch(n){return console.error("Failed to get user media:",n),k("Error: Please allow camera and microphone access."),!1}}async function ad(){if(!U){k("Error: Camera not initialized");return}N=Math.random().toString(36).substring(2,15),an="initiator",C=new RTCPeerConnection(Fo),U.getTracks().forEach(a=>{C.addTrack(a,U)}),C.ontrack=a=>{D.srcObject!==a.streams[0]&&(D.srcObject=a.streams[0],Ue.style.display="block",Yo(),k("Connected!"))},C.onicecandidate=a=>{if(a.candidate){const l=To(z(j,`rooms/${N}/callerCandidates`));je(l,a.candidate.toJSON())}},C.onconnectionstatechange=()=>{C.connectionState==="connected"?k("Connected!"):C.connectionState==="disconnected"?k("Partner disconnected"):C.connectionState==="failed"&&k("Connection failed")};const n=await C.createOffer();await C.setLocalDescription(n);const e=z(j,`rooms/${N}`);await je(e,{offer:{type:n.type,sdp:n.sdp}});const t=z(j,`rooms/${N}/answer`),s=async a=>{const l=a.val();if(l&&l.sdp!==cs){if(cs=l.sdp,C.signalingState!=="have-local-offer"&&C.signalingState!=="stable")return;try{await C.setRemoteDescription(new RTCSessionDescription(l))}catch(c){console.error("Failed to set remote description:",c)}}};ko(t,s),ln(t,"value",s);const i=z(j,`rooms/${N}/calleeCandidates`),r=a=>{const l=a.val();l&&C.remoteDescription&&C.addIceCandidate(new RTCIceCandidate(l)).catch(c=>{console.error("Error adding ICE candidate:",c)})};Ao(i,r),ln(i,"child_added",r),Uo();const o=`${window.location.origin}${window.location.pathname}?room=${N}`;sn.value=o,Po.style.display="block",bt.disabled=!0,wn.disabled=!1,k("Link ready! Share with your partner."),qo()}async function ld(){if(!U){k("Error: Camera not initialized");return}if(!N){k("Error: No room ID");return}an="joiner";const n=z(j,`rooms/${N}`),e=await Mu(n);if(!e.exists()){k("Error: Invalid room link");return}const s=e.val().offer;if(!s){k("Error: No offer found");return}C=new RTCPeerConnection(Fo),U.getTracks().forEach(a=>{C.addTrack(a,U)}),C.ontrack=a=>{D.srcObject!==a.streams[0]&&(D.srcObject=a.streams[0],Ue.style.display="block",Yo(),k("Connected!"))},C.onicecandidate=a=>{if(a.candidate){const l=To(z(j,`rooms/${N}/calleeCandidates`));je(l,a.candidate.toJSON())}},C.onconnectionstatechange=()=>{C.connectionState==="connected"?k("Connected!"):C.connectionState==="disconnected"?k("Partner disconnected"):C.connectionState==="failed"&&k("Connection failed")};const i=z(j,`rooms/${N}/callerCandidates`),r=a=>{const l=a.val();l&&C.remoteDescription&&C.addIceCandidate(new RTCIceCandidate(l)).catch(c=>{console.error("Error adding ICE candidate:",c)})};Ao(i,r),ln(i,"child_added",r),await C.setRemoteDescription(new RTCSessionDescription(s));const o=await C.createAnswer();await C.setLocalDescription(o),await No(n,{answer:{type:o.type,sdp:o.sdp}}),Uo(),wn.disabled=!1,k("Connecting..."),qo()}let oe=!1,le=null;function Me(n){if(!N)return;const e=z(j,`rooms/${N}/watch`);No(e,{...n,updatedBy:Mt})}function Uo(){if(!N)return;const n=z(j,`rooms/${N}/watch`),e=t=>{const s=t.val();if(s&&s.updatedBy!==Mt&&!(Date.now()-rt<500))if(s.url&&s.url!==It.value&&(It.value=s.url,ss(s.url)?Vo(s.url):(R.style.display="block",R.src=s.url,Ke.style.display="none"),X.textContent="Video loaded"),s.isYouTube&&Oe&&js){if(s.playing!==void 0){const i=is(),r=i===de.PLAYING;if(i===de.BUFFERING||i===de.UNSTARTED)oe=!0,le&&clearTimeout(le),le=setTimeout(()=>{oe=!1;const a=is()===de.PLAYING;Me({playing:a,currentTime:on()})},700);else{if(oe)return;s.playing&&!r?Yi():!s.playing&&r&&Gi()}}if(s.currentTime!==void 0){const i=on();Math.abs(i-s.currentTime)>.3&&!oe&&(ed(s.currentTime),setTimeout(()=>{s.playing?Yi():Gi()},500))}}else!s.isYouTube&&R.src&&(s.playing!==void 0&&(s.playing&&R.paused?R.play().catch(i=>console.warn("Play failed:",i)):!s.playing&&!R.paused&&R.pause()),s.currentTime!==void 0&&Math.abs(R.currentTime-s.currentTime)>1&&(R.currentTime=s.currentTime,s.playing?R.play().catch(r=>console.warn("Play failed:",r)):R.pause()))};ko(n,e),ln(n,"value",e),R.addEventListener("play",()=>{!Oe&&N&&(rt=Date.now(),Me({playing:!0,isYouTube:!1}))}),R.addEventListener("pause",()=>{!Oe&&N&&(rt=Date.now(),Me({playing:!1,isYouTube:!1}))}),R.addEventListener("seeked",()=>{!Oe&&N&&(rt=Date.now(),Me({currentTime:R.currentTime,playing:!R.paused,isYouTube:!1}))})}function Wo(){const n=It.value.trim();if(!n){X.textContent="Please enter a video URL";return}if(rt=Date.now(),ss(n)?Vo(n):(Ke.style.display="none",Mo(),R.style.display="block",R.src=n,X.textContent="Video loaded"),N){const e=z(j,`rooms/${N}/watch`);je(e,{url:n,playing:!1,currentTime:0,isYouTube:ss(n),updatedBy:Mt})}}function cd(n){It.value=n.url,Wo(),X.textContent=`Loading "${n.title}"...`}async function Vo(n){if(!Oo(n)){X.textContent="Invalid YouTube URL";return}X.textContent="Loading YouTube video...",R.style.display="none",Ke.style.display="block";try{await Zu({url:n,containerId:"yt-player-div",onReady:t=>{if(js=!0,X.textContent="YouTube video ready",N){const s=z(j,`rooms/${N}/watch`);je(s,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Mt})}},onStateChange:t=>{if(!$i())return;const i=t.data===de.PLAYING,r=t.data===de.PAUSED;if(t.data===de.BUFFERING){oe=!0,le&&clearTimeout(le),le=setTimeout(()=>{oe=!1;const l=is()===de.PLAYING;Me({playing:l,currentTime:on()})},700);return}r&&oe||!oe&&(i||r)&&Me({playing:i,currentTime:on()})}}),Oe=$i(),X.textContent="YouTube video loaded"}catch(t){console.error("Failed to load YouTube video:",t),X.textContent="Failed to load YouTube video",R.style.display="block",Ke.style.display="none"}}function hd(){it=!it,it?(ns.style.display="none",ts.style.display="block",es.textContent="Switch to Chat Mode",X.textContent=it&&N?"Watch mode ready":"Enter a video URL",sd(cd)):(ns.style.display="flex",ts.style.display="none",es.textContent="Switch to Watch Mode",id(),Ke.style.display="none",R.style.display="none")}let zi=V?.muted||!1,ji=D?.muted||!1;const Ho=()=>{if(V.muted!==zi){const n=xo.querySelector("i");n.className=V.muted?"fa fa-microphone-slash":"fa fa-microphone",zi=V.muted}};function ud(){V&&V.addEventListener("volumechange",Ho)}xo.onclick=()=>{if(!U)return;const n=U.getAudioTracks()[0];n&&(n.enabled=!n.enabled),V&&(V.muted=!n.enabled)};const $o=()=>{if(D.muted!==ji){const n=Do.querySelector("i");n.className=D.muted?"fa fa-volume-mute":"fa fa-volume-up",ji=D.muted}};function Yo(){D&&D.addEventListener("volumechange",$o)}Do.onclick=()=>{D&&(D.muted=!D.muted)};Hi.onclick=()=>{if(!U)return;const n=U.getVideoTracks()[0];if(n){n.enabled=!n.enabled;const e=Hi.querySelector("i");e.className=n.enabled?"fa fa-video":"fa fa-video-slash"}};Vi&&(Vi.onclick=async()=>{if(U)try{const n=U.getVideoTracks()[0],t=n.getSettings().facingMode==="user"?"environment":"user";n.stop();const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:t},audio:!0}),i=s.getVideoTracks()[0];if(C){const r=C.getSenders().find(o=>o.track?.kind==="video");r&&r.replaceTrack(i)}U=s,V.srcObject=s}catch(n){console.error("Failed to switch camera:",n)}});Xu.onclick=()=>{V.requestFullscreen?V.requestFullscreen():V.webkitRequestFullscreen&&V.webkitRequestFullscreen()};Qu.onclick=()=>{D.requestFullscreen?D.requestFullscreen():D.webkitRequestFullscreen&&D.webkitRequestFullscreen()};Ue.onclick=async()=>{try{document.pictureInPictureElement?(await document.exitPictureInPicture(),Ue.textContent="Float Partner Video"):(await D.requestPictureInPicture(),Ue.textContent="Exit Floating Video")}catch(n){console.error("PiP failed:",n),k("Picture-in-picture not supported")}};async function Go(){if(console.debug("Hanging up..."),U&&(U.getTracks().forEach(n=>n.stop()),V.srcObject=null,U=null,V.removeEventListener("volumechange",Ho)),D.srcObject&&(D.srcObject.getTracks().forEach(n=>n.stop()),D.srcObject=null,D.removeEventListener("volumechange",$o)),C&&(C.close(),C=null),ls.forEach(({ref:n,type:e,callback:t})=>{Lu(n,e,t)}),ls.length=0,Mo(),Oe=null,js=!1,Ke.style.display="none",le&&(clearTimeout(le),le=null),oe=!1,N&&an==="initiator"){const n=z(j,`rooms/${N}`);Ou(n).catch(e=>{console.warn("Failed to remove room:",e)})}bt.disabled=!1,bt.style.display="block",wn.disabled=!0,Po.style.display="none",ts.style.display="none",ns.style.display="flex",Ue.style.display="none",sn.value="",R.src="",R.style.display="none",It.value="",X.textContent="",document.pictureInPictureElement&&document.exitPictureInPicture().catch(n=>console.error(n)),N=null,an=null,it=!1,cs=null,window.history.replaceState({},document.title,window.location.pathname),k('Disconnected. Click "Start New Chat" to begin.'),dd()}bt.onclick=async()=>{await Bo()&&await ad()};wn.onclick=Go;es.onclick=hd;ju.onclick=Wo;zu.onclick=async()=>{try{await navigator.clipboard.writeText(sn.value),k("Link copied to clipboard!")}catch{sn.select(),document.execCommand("copy"),k("Link copied!")}};function k(n){Ku.textContent=n}function ln(n,e,t){ls.push({ref:n,type:e,callback:t})}function qo(){rn.href="",rn.style.cursor="default"}function dd(){rn.href="https://kristinnroach.github.io/HangVidU/",rn.style.cursor="pointer"}async function fd(){const e=new URLSearchParams(window.location.search).get("room");e?(N=e,k("Connecting to room..."),bt.style.display="none",await Bo()&&await ld()):k('Ready. Click "Start New Chat" to begin.')}window.addEventListener("beforeunload",n=>{if(C&&C.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;Go()});document.querySelectorAll(".video-wrapper").forEach(n=>{let e;const t=n.querySelector(".hover-controls");t&&n.addEventListener("touchstart",()=>{t.style.opacity="1",clearTimeout(e),e=setTimeout(()=>{t.style.opacity="0"},3e3)})});fd();
