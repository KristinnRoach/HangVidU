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
 */const Yo=()=>{};var Qs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ji={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw Ke(e)},Ke=function(n){return new Error("Firebase Database ("+ji.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},qo=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},us={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),s.push(t[d],t[u],t[h],t[p])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ki(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):qo(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const u=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||u==null)throw new zo;const h=r<<2|a>>4;if(s.push(h),c!==64){const p=a<<4&240|c>>2;if(s.push(p),u!==64){const _=c<<6&192|u;s.push(_)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qi=function(n){const e=Ki(n);return us.encodeByteArray(e,!0)},Ht=function(n){return Qi(n).replace(/\./g,"")},Mn=function(n){try{return us.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jo(n){return Xi(void 0,n)}function Xi(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Ko(t)||(n[t]=Xi(n[t],e[t]));return n}function Ko(n){return n!=="__proto__"}/**
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
 */const Xo=()=>Qo().__FIREBASE_DEFAULTS__,Jo=()=>{if(typeof process>"u"||typeof Qs>"u")return;const n=Qs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Zo=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mn(n[1]);return e&&JSON.parse(e)},Ji=()=>{try{return Yo()||Xo()||Jo()||Zo()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ea=n=>Ji()?.emulatorHosts?.[n],ta=n=>{const e=ea(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Zi=()=>Ji()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function hs(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function na(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function sa(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ht(JSON.stringify(t)),Ht(JSON.stringify(o)),""].join(".")}const rt={};function ia(){const n={prod:[],emulator:[]};for(const e of Object.keys(rt))rt[e]?n.emulator.push(e):n.prod.push(e);return n}function ra(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Xs=!1;function oa(n,e){if(typeof window>"u"||typeof document>"u"||!hs(window.location.host)||rt[n]===e||rt[n]||Xs)return;rt[n]=e;function t(h){return`__firebase__banner__${h}`}const s="__firebase__banner",r=ia().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function l(h,p){h.setAttribute("width","24"),h.setAttribute("id",p),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function c(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Xs=!0,o()},h}function d(h,p){h.setAttribute("id",p),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function u(){const h=ra(s),p=t("text"),_=document.getElementById(p)||document.createElement("span"),C=t("learnmore"),k=document.getElementById(C)||document.createElement("a"),q=t("preprendIcon"),ne=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ve=h.element;a(ve),d(k,C);const wn=c();l(ne,q),ve.append(ne,_,k,wn),document.body.appendChild(ve)}r?(_.innerText="Preview backend disconnected.",ne.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ne.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function aa(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function er(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(aa())}function la(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ca(){return ji.NODE_ADMIN===!0}function ua(){try{return typeof indexedDB=="object"}catch{return!1}}function ha(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da="FirebaseError";class Nt extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=da,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tr.prototype.create)}}class tr{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?fa(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Nt(i,a,s)}}function fa(n,e){return n.replace(pa,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const pa=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n){return JSON.parse(n)}function M(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=pt(Mn(r[0])||""),t=pt(Mn(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},_a=function(n){const e=nr(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ma=function(n){const e=nr(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Be(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Js(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vt(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function $t(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Zs(r)&&Zs(o)){if(!$t(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Zs(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)s[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)s[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=s[u-3]^s[u-8]^s[u-14]^s[u-16];s[u]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(i<<5|i>>>27)+c+l+d+s[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function ln(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,f(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},cn=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Re(n){return n&&n._delegate?n._delegate:n}class _t{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Ca{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Rt;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wa(e))try{this.getOrInitializeService({instanceIdentifier:Ce})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Ce){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ce){return this.instances.has(e)}getOptions(e=Ce){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ea(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ce){return this.component?this.component.multipleInstances?e:Ce:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ea(n){return n===Ce?void 0:n}function wa(n){return n.instantiationMode==="EAGER"}/**
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
 */var S;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(S||(S={}));const Ia={debug:S.DEBUG,verbose:S.VERBOSE,info:S.INFO,warn:S.WARN,error:S.ERROR,silent:S.SILENT},Sa=S.INFO,Ta={[S.DEBUG]:"log",[S.VERBOSE]:"log",[S.INFO]:"info",[S.WARN]:"warn",[S.ERROR]:"error"},Ra=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Ta[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class sr{constructor(e){this.name=e,this._logLevel=Sa,this._logHandler=Ra,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in S))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ia[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,S.DEBUG,...e),this._logHandler(this,S.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,S.VERBOSE,...e),this._logHandler(this,S.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,S.INFO,...e),this._logHandler(this,S.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,S.WARN,...e),this._logHandler(this,S.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,S.ERROR,...e),this._logHandler(this,S.ERROR,...e)}}const Na=(n,e)=>e.some(t=>n instanceof t);let ei,ti;function ka(){return ei||(ei=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Aa(){return ti||(ti=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ir=new WeakMap,On=new WeakMap,rr=new WeakMap,bn=new WeakMap,ds=new WeakMap;function Pa(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(de(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&ir.set(t,n)}).catch(()=>{}),ds.set(e,n),e}function Da(n){if(On.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});On.set(n,e)}let Ln={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return On.get(n);if(e==="objectStoreNames")return n.objectStoreNames||rr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return de(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function xa(n){Ln=n(Ln)}function Ma(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(In(this),e,...t);return rr.set(s,e.sort?e.sort():[e]),de(s)}:Aa().includes(n)?function(...e){return n.apply(In(this),e),de(ir.get(this))}:function(...e){return de(n.apply(In(this),e))}}function Oa(n){return typeof n=="function"?Ma(n):(n instanceof IDBTransaction&&Da(n),Na(n,ka())?new Proxy(n,Ln):n)}function de(n){if(n instanceof IDBRequest)return Pa(n);if(bn.has(n))return bn.get(n);const e=Oa(n);return e!==n&&(bn.set(n,e),ds.set(e,n)),e}const In=n=>ds.get(n);function La(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=de(o);return s&&o.addEventListener("upgradeneeded",l=>{s(de(o.result),l.oldVersion,l.newVersion,de(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Fa=["get","getKey","getAll","getAllKeys","count"],Ba=["put","add","delete","clear"],Sn=new Map;function ni(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Sn.get(e))return Sn.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=Ba.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Fa.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Sn.set(e,r),r}xa(n=>({...n,get:(e,t,s)=>ni(e,t)||n.get(e,t,s),has:(e,t)=>!!ni(e,t)||n.has(e,t)}));/**
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
 */class Ua{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Wa(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function Wa(n){return n.getComponent()?.type==="VERSION"}const Fn="@firebase/app",si="0.14.4";/**
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
 */const le=new sr("@firebase/app"),Ha="@firebase/app-compat",Va="@firebase/analytics-compat",$a="@firebase/analytics",Ga="@firebase/app-check-compat",Ya="@firebase/app-check",qa="@firebase/auth",za="@firebase/auth-compat",ja="@firebase/database",Ka="@firebase/data-connect",Qa="@firebase/database-compat",Xa="@firebase/functions",Ja="@firebase/functions-compat",Za="@firebase/installations",el="@firebase/installations-compat",tl="@firebase/messaging",nl="@firebase/messaging-compat",sl="@firebase/performance",il="@firebase/performance-compat",rl="@firebase/remote-config",ol="@firebase/remote-config-compat",al="@firebase/storage",ll="@firebase/storage-compat",cl="@firebase/firestore",ul="@firebase/ai",hl="@firebase/firestore-compat",dl="firebase",fl="12.4.0";/**
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
 */const Bn="[DEFAULT]",pl={[Fn]:"fire-core",[Ha]:"fire-core-compat",[$a]:"fire-analytics",[Va]:"fire-analytics-compat",[Ya]:"fire-app-check",[Ga]:"fire-app-check-compat",[qa]:"fire-auth",[za]:"fire-auth-compat",[ja]:"fire-rtdb",[Ka]:"fire-data-connect",[Qa]:"fire-rtdb-compat",[Xa]:"fire-fn",[Ja]:"fire-fn-compat",[Za]:"fire-iid",[el]:"fire-iid-compat",[tl]:"fire-fcm",[nl]:"fire-fcm-compat",[sl]:"fire-perf",[il]:"fire-perf-compat",[rl]:"fire-rc",[ol]:"fire-rc-compat",[al]:"fire-gcs",[ll]:"fire-gcs-compat",[cl]:"fire-fst",[hl]:"fire-fst-compat",[ul]:"fire-vertex","fire-js":"fire-js",[dl]:"fire-js-all"};/**
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
 */const Gt=new Map,_l=new Map,Un=new Map;function ii(n,e){try{n.container.addComponent(e)}catch(t){le.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Yt(n){const e=n.name;if(Un.has(e))return le.debug(`There were multiple attempts to register component ${e}.`),!1;Un.set(e,n);for(const t of Gt.values())ii(t,n);for(const t of _l.values())ii(t,n);return!0}function ml(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function gl(n){return n==null?!1:n.settings!==void 0}/**
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
 */class vl{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new _t("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fe.create("app-deleted",{appName:this._name})}}/**
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
 */const Cl=fl;function or(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:Bn,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw fe.create("bad-app-name",{appName:String(i)});if(t||(t=Zi()),!t)throw fe.create("no-options");const r=Gt.get(i);if(r){if($t(t,r.options)&&$t(s,r.config))return r;throw fe.create("duplicate-app",{appName:i})}const o=new ba(i);for(const l of Un.values())o.addComponent(l);const a=new vl(t,s,o);return Gt.set(i,a),a}function El(n=Bn){const e=Gt.get(n);if(!e&&n===Bn&&Zi())return or();if(!e)throw fe.create("no-app",{appName:n});return e}function Oe(n,e,t){let s=pl[n]??n;t&&(s+=`-${t}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),le.warn(o.join(" "));return}Yt(new _t(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const wl="firebase-heartbeat-database",bl=1,mt="firebase-heartbeat-store";let Tn=null;function ar(){return Tn||(Tn=La(wl,bl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(mt)}catch(t){console.warn(t)}}}}).catch(n=>{throw fe.create("idb-open",{originalErrorMessage:n.message})})),Tn}async function Il(n){try{const t=(await ar()).transaction(mt),s=await t.objectStore(mt).get(lr(n));return await t.done,s}catch(e){if(e instanceof Nt)le.warn(e.message);else{const t=fe.create("idb-get",{originalErrorMessage:e?.message});le.warn(t.message)}}}async function ri(n,e){try{const s=(await ar()).transaction(mt,"readwrite");await s.objectStore(mt).put(e,lr(n)),await s.done}catch(t){if(t instanceof Nt)le.warn(t.message);else{const s=fe.create("idb-set",{originalErrorMessage:t?.message});le.warn(s.message)}}}function lr(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Sl=1024,Tl=30;class Rl{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new kl(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=oi();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:t}),this._heartbeatsCache.heartbeats.length>Tl){const i=Al(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){le.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=oi(),{heartbeatsToSend:t,unsentEntries:s}=Nl(this._heartbeatsCache.heartbeats),i=Ht(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return le.warn(e),""}}}function oi(){return new Date().toISOString().substring(0,10)}function Nl(n,e=Sl){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),ai(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ai(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class kl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ua()?ha().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Il(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ri(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return ri(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ai(n){return Ht(JSON.stringify({version:2,heartbeats:n})).length}function Al(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function Pl(n){Yt(new _t("platform-logger",e=>new Ua(e),"PRIVATE")),Yt(new _t("heartbeat",e=>new Rl(e),"PRIVATE")),Oe(Fn,si,n),Oe(Fn,si,"esm2020"),Oe("fire-js","")}Pl("");var Dl="firebase",xl="12.4.0";/**
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
 */Oe(Dl,xl,"app");var li={};const ci="@firebase/database",ui="1.1.0";/**
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
 */class Ol{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),M(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:pt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Le=new sr("@firebase/database"),Bl=(function(){let n=1;return function(){return n++}})(),hr=function(n){const e=va(n),t=new ya;t.update(e);const s=t.digest();return us.encodeByteArray(s)},kt=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=kt.apply(null,s):typeof s=="object"?e+=M(s):e+=s,e+=" "}return e};let ot=null,hi=!0;const Ul=function(n,e){f(!0,"Can't turn on custom loggers persistently."),Le.logLevel=S.VERBOSE,ot=Le.log.bind(Le)},B=function(...n){if(hi===!0&&(hi=!1,ot===null&&Fl.get("logging_enabled")===!0&&Ul()),ot){const e=kt.apply(null,n);ot(e)}},At=function(n){return function(...e){B(n,...e)}},Wn=function(...n){const e="FIREBASE INTERNAL ERROR: "+kt(...n);Le.error(e)},ce=function(...n){const e=`FIREBASE FATAL ERROR: ${kt(...n)}`;throw Le.error(e),new Error(e)},H=function(...n){const e="FIREBASE WARNING: "+kt(...n);Le.warn(e)},Wl=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&H("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},fs=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Hl=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ue="[MIN_NAME]",Ie="[MAX_NAME]",Ne=function(n,e){if(n===e)return 0;if(n===Ue||e===Ie)return-1;if(e===Ue||n===Ie)return 1;{const t=di(n),s=di(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},Vl=function(n,e){return n===e?0:n<e?-1:1},Ze=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+M(e))},ps=function(n){if(typeof n!="object"||n===null)return M(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=M(e[s]),t+=":",t+=ps(n[e[s]]);return t+="}",t},dr=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function U(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const fr=function(n){f(!fs(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},$l=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Gl=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Yl(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const ql=new RegExp("^-?(0*)\\d{1,10}$"),zl=-2147483648,jl=2147483647,di=function(n){if(ql.test(n)){const e=Number(n);if(e>=zl&&e<=jl)return e}return null},Qe=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw H("Exception was thrown by user callback.",t),e},Math.floor(0))}},Kl=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},at=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Ql{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,gl(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){H(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',H(e)}}class Wt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Wt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _s="5",pr="v",_r="s",mr="r",gr="f",yr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,vr="ls",Cr="p",Hn="ac",Er="websocket",wr="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=be.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&be.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Jl(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ir(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let s;if(e===Er)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===wr)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Jl(n)&&(t.ns=n.namespace);const i=[];return U(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const Rn={},Nn={};function ms(n){const e=n.toString();return Rn[e]||(Rn[e]=new Zl),Rn[e]}function ec(n,e){const t=n.toString();return Nn[t]||(Nn[t]=e()),Nn[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Qe(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi="start",nc="close",sc="pLPCommand",ic="pRTLPCB",Sr="id",Tr="pw",Rr="ser",rc="cb",oc="seg",ac="ts",lc="d",cc="dframe",Nr=1870,kr=30,uc=Nr-kr,hc=25e3,dc=3e4;class De{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=At(e),this.stats_=ms(t),this.urlFn=l=>(this.appCheckToken&&(l[Hn]=this.appCheckToken),Ir(t,wr,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new tc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(dc)),Hl(()=>{if(this.isClosed_)return;this.scriptTagHolder=new gs((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===fi)this.id=a,this.password=l;else if(o===nc)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[fi]="t",s[Rr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[rc]=this.scriptTagHolder.uniqueCallbackIdentifier),s[pr]=_s,this.transportSessionId&&(s[_r]=this.transportSessionId),this.lastSessionId&&(s[vr]=this.lastSessionId),this.applicationId&&(s[Cr]=this.applicationId),this.appCheckToken&&(s[Hn]=this.appCheckToken),typeof location<"u"&&location.hostname&&yr.test(location.hostname)&&(s[mr]=gr);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){De.forceAllow_=!0}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){return De.forceAllow_?!0:!De.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!$l()&&!Gl()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Qi(t),i=dr(s,uc);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[cc]="t",s[Sr]=e,s[Tr]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=M(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class gs{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Bl(),window[sc+this.uniqueCallbackIdentifier]=e,window[ic+this.uniqueCallbackIdentifier]=t,this.myIFrame=gs.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Sr]=this.myID,e[Tr]=this.myPW,e[Rr]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+kr+s.length<=Nr;){const o=this.pendingSegs.shift();s=s+"&"+oc+i+"="+o.seg+"&"+ac+i+"="+o.ts+"&"+lc+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(hc)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc=16384,pc=45e3;let qt=null;typeof MozWebSocket<"u"?qt=MozWebSocket:typeof WebSocket<"u"&&(qt=WebSocket);class z{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=At(this.connId),this.stats_=ms(t),this.connURL=z.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[pr]=_s,typeof location<"u"&&location.hostname&&yr.test(location.hostname)&&(o[mr]=gr),t&&(o[_r]=t),s&&(o[vr]=s),i&&(o[Hn]=i),r&&(o[Cr]=r),Ir(e,Er,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,be.set("previous_websocket_failure",!0);try{let s;ca(),this.mySock=new qt(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){z.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&qt!==null&&!z.forceDisallow_}static previouslyFailed(){return be.isInMemoryStorage||be.get("previous_websocket_failure")===!0}markConnectionHealthy(){be.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=pt(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=M(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=dr(t,fc);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(pc))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}z.responsesRequiredToBeHealthy=2;z.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{static get ALL_TRANSPORTS(){return[De,z]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=z&&z.isAvailable();let s=t&&!z.previouslyFailed();if(e.webSocketOnly&&(t||H("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[z];else{const i=this.transports_=[];for(const r of gt.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);gt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}gt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=6e4,mc=5e3,gc=10*1024,yc=100*1024,kn="t",pi="d",vc="s",_i="r",Cc="e",mi="o",gi="a",yi="n",vi="p",Ec="h";class wc{constructor(e,t,s,i,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=At("c:"+this.id+":"),this.transportManager_=new gt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=at(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>yc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>gc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(kn in e){const t=e[kn];t===gi?this.upgradeIfSecondaryHealthy_():t===_i?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===mi&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Ze("t",e),s=Ze("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:vi,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:gi,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:yi,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Ze("t",e),s=Ze("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Ze(kn,e);if(pi in e){const s=e[pi];if(t===Ec){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===yi){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===vc?this.onConnectionShutdown_(s):t===_i?this.onReset_(s):t===Cc?Wn("Server Error: "+s):t===mi?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Wn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),_s!==s&&H("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),at(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(_c))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):at(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(mc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:vi,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(be.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt extends Pr{static getInstance(){return new zt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!er()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=32,Ei=768;class w{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new w("")}function g(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function me(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new w(n.pieces_,e)}function ys(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function bc(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function yt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Dr(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new w(e,0)}function A(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof w)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new w(t,0)}function v(n){return n.pieceNum_>=n.pieces_.length}function W(n,e){const t=g(n),s=g(e);if(t===null)return e;if(t===s)return W(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Ic(n,e){const t=yt(n,0),s=yt(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=Ne(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function vs(n,e){if(me(n)!==me(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function G(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(me(n)>me(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class Sc{constructor(e,t){this.errorPrefix_=t,this.parts_=yt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=cn(this.parts_[s]);xr(this)}}function Tc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=cn(e),xr(n)}function Rc(n){const e=n.parts_.pop();n.byteLength_-=cn(e),n.parts_.length>0&&(n.byteLength_-=1)}function xr(n){if(n.byteLength_>Ei)throw new Error(n.errorPrefix_+"has a key path longer than "+Ei+" bytes ("+n.byteLength_+").");if(n.parts_.length>Ci)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ci+") or object contains a cycle "+Ee(n))}function Ee(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs extends Pr{static getInstance(){return new Cs}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et=1e3,Nc=300*1e3,wi=30*1e3,kc=1.3,Ac=3e4,Pc="server_kill",bi=3;class oe extends Ar{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=oe.nextPersistentConnectionId_++,this.log_=At("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=et,this.maxReconnectDelay_=Nc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Cs.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&zt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(M(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Rt,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;oe.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ee(e,"w")){const s=Be(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();H(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ma(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=wi)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=_a(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+M(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Wn("Unrecognized action received from server: "+M(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=et,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=et,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ac&&(this.reconnectDelay_=et),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*kc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+oe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(u){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new wc(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,p=>{H(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Pc)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&H(u),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Js(this.interruptReasons_)&&(this.reconnectDelay_=et,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>ps(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new w(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){B("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=bi&&(this.reconnectDelay_=wi,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){B("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=bi&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+cr.replace(/\./g,"-")]=1,er()?e["framework.cordova"]=1:la()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=zt.getInstance().currentlyOnline();return Js(this.interruptReasons_)&&e}}oe.nextPersistentConnectionId_=0;oe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class un{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new y(Ue,e),i=new y(Ue,t);return this.compare(s,i)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bt;class Mr extends un{static get __EMPTY_NODE(){return Bt}static set __EMPTY_NODE(e){Bt=e}compare(e,t){return Ne(e.name,t.name)}isDefinedOn(e){throw Ke("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(Ie,Bt)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Bt)}toString(){return".key"}}const Fe=new Mr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class F{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??F.RED,this.left=i??V.EMPTY_NODE,this.right=r??V.EMPTY_NODE}copy(e,t,s,i,r){return new F(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return V.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return V.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,F.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,F.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}F.RED=!0;F.BLACK=!1;class Dc{copy(e,t,s,i,r){return this}insert(e,t,s){return new F(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class V{constructor(e,t=V.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new V(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,F.BLACK,null,null))}remove(e){return new V(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,F.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ut(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ut(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ut(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ut(this.root_,null,this.comparator_,!0,e)}}V.EMPTY_NODE=new Dc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xc(n,e){return Ne(n.name,e.name)}function Es(n,e){return Ne(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vn;function Mc(n){Vn=n}const Or=function(n){return typeof n=="number"?"number:"+fr(n):"string:"+n},Lr=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ee(e,".sv"),"Priority must be a string or number.")}else f(n===Vn||n.isEmpty(),"priority of unexpected type.");f(n===Vn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ii;class L{static set __childrenNodeConstructor(e){Ii=e}static get __childrenNodeConstructor(){return Ii}constructor(e,t=L.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Lr(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new L(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return v(e)?this:g(e)===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:L.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=g(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(f(s!==".priority"||me(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,L.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Or(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=fr(this.value_):e+=this.value_,this.lazyHash_=hr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===L.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof L.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=L.VALUE_TYPE_ORDER.indexOf(t),r=L.VALUE_TYPE_ORDER.indexOf(s);return f(i>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}L.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fr,Br;function Oc(n){Fr=n}function Lc(n){Br=n}class Fc extends un{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Ne(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Ie,new L("[PRIORITY-POST]",Br))}makePost(e,t){const s=Fr(e);return new y(t,new L("[PRIORITY-POST]",s))}toString(){return".priority"}}const P=new Fc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bc=Math.log(2);class Uc{constructor(e){const t=r=>parseInt(Math.log(r)/Bc,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const jt=function(n,e,t,s){n.sort(e);const i=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new F(h,u.node,F.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=i(l,p),C=i(p+1,c);return u=n[p],h=t?t(u):u,new F(h,u.node,F.BLACK,_,C)}},r=function(l){let c=null,d=null,u=n.length;const h=function(_,C){const k=u-_,q=u;u-=_;const ne=i(k+1,q),ve=n[k],wn=t?t(ve):ve;p(new F(wn,ve.node,C,null,ne))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const C=l.nextBitIsOne(),k=Math.pow(2,l.count-(_+1));C?h(k,F.BLACK):(h(k,F.BLACK),h(k,F.RED))}return d},o=new Uc(n.length),a=r(o);return new V(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let An;const Pe={};class se{static get Default(){return f(Pe&&P,"ChildrenNode.ts has not been loaded"),An=An||new se({".priority":Pe},{".priority":P}),An}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Be(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof V?t:null}hasIndex(e){return ee(this.indexSet_,e.toString())}addIndex(e,t){f(e!==Fe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=jt(s,e.getCompare()):a=Pe;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new se(d,c)}addToIndexes(e,t){const s=Vt(this.indexes_,(i,r)=>{const o=Be(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),i===Pe)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(y.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),jt(a,o.getCompare())}else return Pe;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new y(e.name,a))),l.insert(e,e.node)}});return new se(s,this.indexSet_)}removeFromIndexes(e,t){const s=Vt(this.indexes_,i=>{if(i===Pe)return i;{const r=t.get(e.name);return r?i.remove(new y(e.name,r)):i}});return new se(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tt;class m{static get EMPTY_NODE(){return tt||(tt=new m(new V(Es),null,se.Default))}constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Lr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||tt}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?tt:t}}getChild(e){const t=g(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new y(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?tt:this.priorityNode_;return new m(i,o,r)}}updateChild(e,t){const s=g(e);if(s===null)return t;{f(g(e)!==".priority"||me(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(T(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(P,(o,a)=>{t[o]=a.val(e),s++,r&&m.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Or(this.getPriority().val())+":"),this.forEachChild(P,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":hr(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,y.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Pt?-1:0}withIndex(e){if(e===Fe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Fe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(P),i=t.getIterator(P);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Fe?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Wc extends m{constructor(){super(new V(Es),m.EMPTY_NODE,se.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const Pt=new Wc;Object.defineProperties(y,{MIN:{value:new y(Ue,m.EMPTY_NODE)},MAX:{value:new y(Ie,Pt)}});Mr.__EMPTY_NODE=m.EMPTY_NODE;L.__childrenNodeConstructor=m;Mc(Pt);Lc(Pt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hc=!0;function x(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new L(t,x(e))}if(!(n instanceof Array)&&Hc){const t=[];let s=!1;if(U(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=x(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new y(o,l)))}}),t.length===0)return m.EMPTY_NODE;const r=jt(t,xc,o=>o.name,Es);if(s){const o=jt(t,P.getCompare());return new m(r,x(e),new se({".priority":o},{".priority":P}))}else return new m(r,x(e),se.Default)}else{let t=m.EMPTY_NODE;return U(n,(s,i)=>{if(ee(n,s)&&s.substring(0,1)!=="."){const r=x(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(x(e))}}Oc(x);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc extends un{constructor(e){super(),this.indexPath_=e,f(!v(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Ne(e.name,t.name):r}makePost(e,t){const s=x(e),i=m.EMPTY_NODE.updateChild(this.indexPath_,s);return new y(t,i)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,Pt);return new y(Ie,e)}toString(){return yt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c extends un{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Ne(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const s=x(e);return new y(t,s)}toString(){return".value"}}const Gc=new $c;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ur(n){return{type:"value",snapshotNode:n}}function We(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function vt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Ct(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Yc(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(vt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(We(t,s)):o.trackChildChange(Ct(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(P,(i,r)=>{t.hasChild(i)||s.trackChildChange(vt(i,r))}),t.isLeafNode()||t.forEachChild(P,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Ct(i,r,o))}else s.trackChildChange(We(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.indexedFilter_=new ws(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Et.getStartPost_(e),this.endPost_=Et.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new y(t,s))||(s=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=m.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(P,(o,a)=>{r.matches(new y(o,a))||(i=i.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new Et(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new y(t,s))||(s=m.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,p)=>u(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new y(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=i.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(d&&!s.isEmpty()&&p>=0)return r?.trackChildChange(Ct(t,s,u)),a.updateImmediateChild(t,s);{r?.trackChildChange(vt(t,u));const C=a.updateImmediateChild(t,m.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(We(h.name,h.node)),C.updateImmediateChild(h.name,h.node)):C}}else return s.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(vt(c.name,c.node)),r.trackChildChange(We(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=P}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ue}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ie}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===P}copy(){const e=new bs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function zc(n){return n.loadsAllData()?new ws(n.getIndex()):n.hasLimit()?new qc(n):new Et(n)}function Si(n){const e={};if(n.isDefault())return e;let t;if(n.index_===P?t="$priority":n.index_===Gc?t="$value":n.index_===Fe?t="$key":(f(n.index_ instanceof Vc,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=M(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=M(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+M(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=M(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+M(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ti(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==P&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Ar{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=At("p:rest:"),this.listens_={}}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Kt.getListenId_(e,s),a={};this.listens_[o]=a;const l=Si(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,s),Be(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",i(h,null)}})}unlisten(e,t){const s=Kt.getListenId_(e,t);delete this.listens_[s]}get(e){const t=Si(e._queryParams),s=e._path.toString(),i=new Rt;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ga(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=pt(a.responseText)}catch{H("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&H("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */function Qt(){return{value:null,children:new Map}}function Wr(n,e,t){if(v(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=g(e);n.children.has(s)||n.children.set(s,Qt());const i=n.children.get(s);e=T(e),Wr(i,e,t)}}function $n(n,e,t){n.value!==null?t(e,n.value):Kc(n,(s,i)=>{const r=new w(e.toString()+"/"+s);$n(i,r,t)})}function Kc(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&U(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=10*1e3,Xc=30*1e3,Jc=300*1e3;class Zc{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Qc(e);const s=Ri+(Xc-Ri)*Math.random();at(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;U(e,(i,r)=>{r>0&&ee(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),at(this.reportStats_.bind(this),Math.floor(Math.random()*2*Jc))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(K||(K={}));function Is(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ss(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ts(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=K.ACK_USER_WRITE,this.source=Is()}operationForChild(e){if(v(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new w(e));return new Xt(E(),t,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Xt(T(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t){this.source=e,this.path=t,this.type=K.LISTEN_COMPLETE}operationForChild(e){return v(this.path)?new wt(this.source,E()):new wt(this.source,T(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=K.OVERWRITE}operationForChild(e){return v(this.path)?new Se(this.source,E(),this.snap.getImmediateChild(e)):new Se(this.source,T(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=K.MERGE}operationForChild(e){if(v(this.path)){const t=this.children.subtree(new w(e));return t.isEmpty()?null:t.value?new Se(this.source,E(),t.value):new He(this.source,E(),t)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new He(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(v(e))return this.isFullyInitialized()&&!this.filtered_;const t=g(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function tu(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Yc(o.childName,o.snapshotNode))}),nt(n,i,"child_removed",e,s,t),nt(n,i,"child_added",e,s,t),nt(n,i,"child_moved",r,s,t),nt(n,i,"child_changed",e,s,t),nt(n,i,"value",e,s,t),i}function nt(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>su(n,a,l)),o.forEach(a=>{const l=nu(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function nu(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function su(n,e,t){if(e.childName==null||t.childName==null)throw Ke("Should only compare child_ events.");const s=new y(e.childName,e.snapshotNode),i=new y(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n,e){return{eventCache:n,serverCache:e}}function lt(n,e,t,s){return hn(new ge(e,t,s),n.serverCache)}function Hr(n,e,t,s){return hn(n.eventCache,new ge(e,t,s))}function Jt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Te(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pn;const iu=()=>(Pn||(Pn=new V(Vl)),Pn);class I{static fromObject(e){let t=new I(null);return U(e,(s,i)=>{t=t.set(new w(s),i)}),t}constructor(e,t=iu()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(v(e))return null;{const s=g(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:A(new w(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(v(e))return this;{const t=g(e),s=this.children.get(t);return s!==null?s.subtree(T(e)):new I(null)}}set(e,t){if(v(e))return new I(t,this.children);{const s=g(e),r=(this.children.get(s)||new I(null)).set(T(e),t),o=this.children.insert(s,r);return new I(this.value,o)}}remove(e){if(v(e))return this.children.isEmpty()?new I(null):new I(null,this.children);{const t=g(e),s=this.children.get(t);if(s){const i=s.remove(T(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new I(null):new I(this.value,r)}else return this}}get(e){if(v(e))return this.value;{const t=g(e),s=this.children.get(t);return s?s.get(T(e)):null}}setTree(e,t){if(v(e))return t;{const s=g(e),r=(this.children.get(s)||new I(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new I(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(A(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(v(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(T(e),A(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,s){if(v(e))return this;{this.value&&s(t,this.value);const i=g(e),r=this.children.get(i);return r?r.foreachOnPath_(T(e),A(t,i),s):new I(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(A(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.writeTree_=e}static empty(){return new Q(new I(null))}}function ct(n,e,t){if(v(e))return new Q(new I(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=W(i,e);return r=r.updateChild(o,t),new Q(n.writeTree_.set(i,r))}else{const i=new I(t),r=n.writeTree_.setTree(e,i);return new Q(r)}}}function Gn(n,e,t){let s=n;return U(t,(i,r)=>{s=ct(s,A(e,i),r)}),s}function Ni(n,e){if(v(e))return Q.empty();{const t=n.writeTree_.setTree(e,new I(null));return new Q(t)}}function Yn(n,e){return ke(n,e)!=null}function ke(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(W(t.path,e)):null}function ki(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(P,(s,i)=>{e.push(new y(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new y(s,i.value))}),e}function pe(n,e){if(v(e))return n;{const t=ke(n,e);return t!=null?new Q(new I(t)):new Q(n.writeTree_.subtree(e))}}function qn(n){return n.writeTree_.isEmpty()}function Ve(n,e){return Vr(E(),n.writeTree_,e)}function Vr(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Vr(A(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(A(n,".priority"),s)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n,e){return qr(e,n)}function ru(n,e,t,s,i){f(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=ct(n.visibleWrites,e,t)),n.lastWriteId=s}function ou(n,e,t,s){f(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=Gn(n.visibleWrites,e,t),n.lastWriteId=s}function au(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function lu(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&cu(a,s.path)?i=!1:G(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return uu(n),!0;if(s.snap)n.visibleWrites=Ni(n.visibleWrites,s.path);else{const a=s.children;U(a,l=>{n.visibleWrites=Ni(n.visibleWrites,A(s.path,l))})}return!0}else return!1}function cu(n,e){if(n.snap)return G(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&G(A(n.path,t),e))return!0;return!1}function uu(n){n.visibleWrites=$r(n.allWrites,hu,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function hu(n){return n.visible}function $r(n,e,t){let s=Q.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)G(t,o)?(a=W(t,o),s=ct(s,a,r.snap)):G(o,t)&&(a=W(o,t),s=ct(s,E(),r.snap.getChild(a)));else if(r.children){if(G(t,o))a=W(t,o),s=Gn(s,a,r.children);else if(G(o,t))if(a=W(o,t),v(a))s=Gn(s,E(),r.children);else{const l=Be(r.children,g(a));if(l){const c=l.getChild(T(a));s=ct(s,E(),c)}}}else throw Ke("WriteRecord should have .snap or .children")}}return s}function Gr(n,e,t,s,i){if(!s&&!i){const r=ke(n.visibleWrites,e);if(r!=null)return r;{const o=pe(n.visibleWrites,e);if(qn(o))return t;if(t==null&&!Yn(o,E()))return null;{const a=t||m.EMPTY_NODE;return Ve(o,a)}}}else{const r=pe(n.visibleWrites,e);if(!i&&qn(r))return t;if(!i&&t==null&&!Yn(r,E()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(G(c.path,e)||G(e,c.path))},a=$r(n.allWrites,o,e),l=t||m.EMPTY_NODE;return Ve(a,l)}}}function du(n,e,t){let s=m.EMPTY_NODE;const i=ke(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(P,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=pe(n.visibleWrites,e);return t.forEachChild(P,(o,a)=>{const l=Ve(pe(r,new w(o)),a);s=s.updateImmediateChild(o,l)}),ki(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=pe(n.visibleWrites,e);return ki(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function fu(n,e,t,s,i){f(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=A(e,t);if(Yn(n.visibleWrites,r))return null;{const o=pe(n.visibleWrites,r);return qn(o)?i.getChild(t):Ve(o,i.getChild(t))}}function pu(n,e,t,s){const i=A(e,t),r=ke(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=pe(n.visibleWrites,i);return Ve(o,s.getNode().getImmediateChild(t))}else return null}function _u(n,e){return ke(n.visibleWrites,e)}function mu(n,e,t,s,i,r,o){let a;const l=pe(n.visibleWrites,e),c=ke(l,E());if(c!=null)a=c;else if(t!=null)a=Ve(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let p=h.getNext();for(;p&&d.length<i;)u(p,s)!==0&&d.push(p),p=h.getNext();return d}else return[]}function gu(){return{visibleWrites:Q.empty(),allWrites:[],lastWriteId:-1}}function Zt(n,e,t,s){return Gr(n.writeTree,n.treePath,e,t,s)}function Rs(n,e){return du(n.writeTree,n.treePath,e)}function Ai(n,e,t,s){return fu(n.writeTree,n.treePath,e,t,s)}function en(n,e){return _u(n.writeTree,A(n.treePath,e))}function yu(n,e,t,s,i,r){return mu(n.writeTree,n.treePath,e,t,s,i,r)}function Ns(n,e,t){return pu(n.writeTree,n.treePath,e,t)}function Yr(n,e){return qr(A(n.treePath,e),n.writeTree)}function qr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Ct(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,vt(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,We(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Ct(s,e.snapshotNode,i.oldSnap));else throw Ke("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const zr=new Cu;class ks{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new ge(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ns(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Te(this.viewCache_),r=yu(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eu(n){return{filter:n}}function wu(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function bu(n,e,t,s,i){const r=new vu;let o,a;if(t.type===K.OVERWRITE){const c=t;c.source.fromUser?o=zn(n,e,c.path,c.snap,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!v(c.path),o=tn(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===K.MERGE){const c=t;c.source.fromUser?o=Su(n,e,c.path,c.children,s,i,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=jn(n,e,c.path,c.children,s,i,a,r))}else if(t.type===K.ACK_USER_WRITE){const c=t;c.revert?o=Nu(n,e,c.path,s,i,r):o=Tu(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===K.LISTEN_COMPLETE)o=Ru(n,e,t.path,s,r);else throw Ke("Unknown operation type: "+t.type);const l=r.getChanges();return Iu(e,o,l),{viewCache:o,changes:l}}function Iu(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Jt(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Ur(Jt(e)))}}function jr(n,e,t,s,i,r){const o=e.eventCache;if(en(s,t)!=null)return e;{let a,l;if(v(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Te(e),d=c instanceof m?c:m.EMPTY_NODE,u=Rs(s,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=Zt(s,Te(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(t);if(c===".priority"){f(me(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=Ai(s,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=T(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=Ai(s,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=Ns(s,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,i,r):a=o.getNode()}}return lt(e,a,o.isFullyInitialized()||v(t),n.filter.filtersNodes())}}function tn(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(v(t))c=d.updateFullNode(l.getNode(),s,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,s);c=d.updateFullNode(l.getNode(),p,null)}else{const p=g(t);if(!l.isCompleteForPath(t)&&me(t)>1)return e;const _=T(t),k=l.getNode().getImmediateChild(p).updateChild(_,s);p===".priority"?c=d.updatePriority(l.getNode(),k):c=d.updateChild(l.getNode(),p,k,_,zr,null)}const u=Hr(e,c,l.isFullyInitialized()||v(t),d.filtersNodes()),h=new ks(i,u,r);return jr(n,u,t,i,h,a)}function zn(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const d=new ks(i,e,r);if(v(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=lt(e,c,!0,n.filter.filtersNodes());else{const u=g(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=lt(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=T(t),p=a.getNode().getImmediateChild(u);let _;if(v(h))_=s;else{const C=d.getCompleteChild(u);C!=null?ys(h)===".priority"&&C.getChild(Dr(h)).isEmpty()?_=C:_=C.updateChild(h,s):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const C=n.filter.updateChild(a.getNode(),u,_,h,d,o);l=lt(e,C,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Pi(n,e){return n.eventCache.isCompleteForChild(e)}function Su(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const d=A(t,l);Pi(e,g(d))&&(a=zn(n,a,d,c,i,r,o))}),s.foreach((l,c)=>{const d=A(t,l);Pi(e,g(d))||(a=zn(n,a,d,c,i,r,o))}),a}function Di(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function jn(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;v(t)?c=s:c=new I(null).setTree(t,s);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const p=e.serverCache.getNode().getImmediateChild(u),_=Di(n,p,h);l=tn(n,l,new w(u),_,i,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const p=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!p){const _=e.serverCache.getNode().getImmediateChild(u),C=Di(n,_,h);l=tn(n,l,new w(u),C,i,r,o,a)}}),l}function Tu(n,e,t,s,i,r,o){if(en(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(v(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return tn(n,e,t,l.getNode().getChild(t),i,r,a,o);if(v(t)){let c=new I(null);return l.getNode().forEachChild(Fe,(d,u)=>{c=c.set(new w(d),u)}),jn(n,e,t,c,i,r,a,o)}else return e}else{let c=new I(null);return s.foreach((d,u)=>{const h=A(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),jn(n,e,t,c,i,r,a,o)}}function Ru(n,e,t,s,i){const r=e.serverCache,o=Hr(e,r.getNode(),r.isFullyInitialized()||v(t),r.isFiltered());return jr(n,o,t,s,zr,i)}function Nu(n,e,t,s,i,r){let o;if(en(s,t)!=null)return e;{const a=new ks(s,e,i),l=e.eventCache.getNode();let c;if(v(t)||g(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Zt(s,Te(e));else{const u=e.serverCache.getNode();f(u instanceof m,"serverChildren would be complete if leaf node"),d=Rs(s,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=g(t);let u=Ns(s,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,T(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,m.EMPTY_NODE,T(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Zt(s,Te(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||en(s,E())!=null,lt(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new ws(s.getIndex()),r=zc(s);this.processor_=Eu(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new ge(l,o.isFullyInitialized(),i.filtersNodes()),u=new ge(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=hn(u,d),this.eventGenerator_=new eu(this.query_)}get query(){return this.query_}}function Au(n){return n.viewCache_.serverCache.getNode()}function Pu(n){return Jt(n.viewCache_)}function Du(n,e){const t=Te(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!v(e)&&!t.getImmediateChild(g(e)).isEmpty())?t.getChild(e):null}function xi(n){return n.eventRegistrations_.length===0}function xu(n,e){n.eventRegistrations_.push(e)}function Mi(n,e,t){const s=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function Oi(n,e,t,s){e.type===K.MERGE&&e.source.queryId!==null&&(f(Te(n.viewCache_),"We should always have a full cache before handling merges"),f(Jt(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=bu(n.processor_,i,e,t,s);return wu(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Kr(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Mu(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(P,(r,o)=>{s.push(We(r,o))}),t.isFullyInitialized()&&s.push(Ur(t.getNode())),Kr(n,s,t.getNode(),e)}function Kr(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return tu(n.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;class Qr{constructor(){this.views=new Map}}function Ou(n){f(!nn,"__referenceConstructor has already been defined"),nn=n}function Lu(){return f(nn,"Reference.ts has not been loaded"),nn}function Fu(n){return n.views.size===0}function As(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return f(r!=null,"SyncTree gave us an op for an invalid query."),Oi(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(Oi(o,e,t,s));return r}}function Xr(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Zt(t,i?s:null),l=!1;a?l=!0:s instanceof m?(a=Rs(t,s),l=!1):(a=m.EMPTY_NODE,l=!1);const c=hn(new ge(a,l,!1),new ge(s,i,!1));return new ku(e,c)}return o}function Bu(n,e,t,s,i,r){const o=Xr(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),xu(o,t),Mu(o,t)}function Uu(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=ye(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(Mi(c,t,s)),xi(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(Mi(l,t,s)),xi(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ye(n)&&r.push(new(Lu())(e._repo,e._path)),{removed:r,events:o}}function Jr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function _e(n,e){let t=null;for(const s of n.views.values())t=t||Du(s,e);return t}function Zr(n,e){if(e._queryParams.loadsAllData())return fn(n);{const s=e._queryIdentifier;return n.views.get(s)}}function eo(n,e){return Zr(n,e)!=null}function ye(n){return fn(n)!=null}function fn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sn;function Wu(n){f(!sn,"__referenceConstructor has already been defined"),sn=n}function Hu(){return f(sn,"Reference.ts has not been loaded"),sn}let Vu=1;class Li{constructor(e){this.listenProvider_=e,this.syncPointTree_=new I(null),this.pendingWriteTree_=gu(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function to(n,e,t,s,i){return ru(n.pendingWriteTree_,e,t,s,i),i?Xe(n,new Se(Is(),e,t)):[]}function $u(n,e,t,s){ou(n.pendingWriteTree_,e,t,s);const i=I.fromObject(t);return Xe(n,new He(Is(),e,i))}function ue(n,e,t=!1){const s=au(n.pendingWriteTree_,e);if(lu(n.pendingWriteTree_,e)){let r=new I(null);return s.snap!=null?r=r.set(E(),!0):U(s.children,o=>{r=r.set(new w(o),!0)}),Xe(n,new Xt(s.path,r,t))}else return[]}function Dt(n,e,t){return Xe(n,new Se(Ss(),e,t))}function Gu(n,e,t){const s=I.fromObject(t);return Xe(n,new He(Ss(),e,s))}function Yu(n,e){return Xe(n,new wt(Ss(),e))}function qu(n,e,t){const s=Ds(n,t);if(s){const i=xs(s),r=i.path,o=i.queryId,a=W(r,e),l=new wt(Ts(o),a);return Ms(n,r,l)}else return[]}function rn(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||eo(o,e))){const l=Uu(o,e,t,s);Fu(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,p)=>ye(p));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=Ku(h);for(let _=0;_<p.length;++_){const C=p[_],k=C.query,q=ro(n,C);n.listenProvider_.startListening(ut(k),bt(n,k),q.hashFn,q.onComplete)}}}!u&&c.length>0&&!s&&(d?n.listenProvider_.stopListening(ut(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(pn(h));n.listenProvider_.stopListening(ut(h),p)}))}Qu(n,c)}return a}function no(n,e,t,s){const i=Ds(n,s);if(i!=null){const r=xs(i),o=r.path,a=r.queryId,l=W(o,e),c=new Se(Ts(a),l,t);return Ms(n,o,c)}else return[]}function zu(n,e,t,s){const i=Ds(n,s);if(i){const r=xs(i),o=r.path,a=r.queryId,l=W(o,e),c=I.fromObject(t),d=new He(Ts(a),l,c);return Ms(n,o,d)}else return[]}function Kn(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(h,p)=>{const _=W(h,i);r=r||_e(p,_),o=o||ye(p)});let a=n.syncPointTree_.get(i);a?(o=o||ye(a),r=r||_e(a,E())):(a=new Qr,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((p,_)=>{const C=_e(_,E());C&&(r=r.updateImmediateChild(p,C))}));const c=eo(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=pn(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=Xu();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const d=dn(n.pendingWriteTree_,i);let u=Bu(a,e,t,d,r,l);if(!c&&!o&&!s){const h=Zr(a,e);u=u.concat(Ju(n,e,h))}return u}function Ps(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=W(o,e),c=_e(a,l);if(c)return c});return Gr(i,e,r,t,!0)}function ju(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,d)=>{const u=W(c,t);s=s||_e(d,u)});let i=n.syncPointTree_.get(t);i?s=s||_e(i,E()):(i=new Qr,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new ge(s,!0,!1):null,a=dn(n.pendingWriteTree_,e._path),l=Xr(i,e,a,r?o.getNode():m.EMPTY_NODE,r);return Pu(l)}function Xe(n,e){return so(e,n.syncPointTree_,null,dn(n.pendingWriteTree_,E()))}function so(n,e,t,s){if(v(n.path))return io(n,e,t,s);{const i=e.get(E());t==null&&i!=null&&(t=_e(i,E()));let r=[];const o=g(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=Yr(s,o);r=r.concat(so(a,l,c,d))}return i&&(r=r.concat(As(i,n,s,t))),r}}function io(n,e,t,s){const i=e.get(E());t==null&&i!=null&&(t=_e(i,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Yr(s,o),d=n.operationForChild(o);d&&(r=r.concat(io(d,a,l,c)))}),i&&(r=r.concat(As(i,n,s,t))),r}function ro(n,e){const t=e.query,s=bt(n,t);return{hashFn:()=>(Au(e)||m.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?qu(n,t._path,s):Yu(n,t._path);{const r=Yl(i,t);return rn(n,t,null,r)}}}}function bt(n,e){const t=pn(e);return n.queryToTagMap.get(t)}function pn(n){return n._path.toString()+"$"+n._queryIdentifier}function Ds(n,e){return n.tagToQueryMap.get(e)}function xs(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new w(n.substr(0,e))}}function Ms(n,e,t){const s=n.syncPointTree_.get(e);f(s,"Missing sync point for query tag that we're tracking");const i=dn(n.pendingWriteTree_,e);return As(s,t,i,null)}function Ku(n){return n.fold((e,t,s)=>{if(t&&ye(t))return[fn(t)];{let i=[];return t&&(i=Jr(t)),U(s,(r,o)=>{i=i.concat(o)}),i}})}function ut(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Hu())(n._repo,n._path):n}function Qu(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=pn(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function Xu(){return Vu++}function Ju(n,e,t){const s=e._path,i=bt(n,e),r=ro(n,t),o=n.listenProvider_.startListening(ut(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)f(!ye(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!v(c)&&d&&ye(d))return[fn(d).query];{let h=[];return d&&(h=h.concat(Jr(d).map(p=>p.query))),U(u,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(ut(d),bt(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Os(t)}node(){return this.node_}}class Ls{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=A(this.path_,e);return new Ls(this.syncTree_,t)}node(){return Ps(this.syncTree_,this.path_)}}const Zu=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Fi=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return eh(n[".sv"],e,t);if(typeof n[".sv"]=="object")return th(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},eh=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},th=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&f(!1,"Unexpected increment value: "+s);const i=e.node();if(f(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},oo=function(n,e,t,s){return Fs(e,new Ls(t,n),s)},ao=function(n,e,t){return Fs(n,new Os(e),t)};function Fs(n,e,t){const s=n.getPriority().val(),i=Fi(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Fi(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new L(a,x(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new L(i))),o.forEachChild(P,(a,l)=>{const c=Fs(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Us(n,e){let t=e instanceof w?e:new w(e),s=n,i=g(t);for(;i!==null;){const r=Be(s.node.children,i)||{children:{},childCount:0};s=new Bs(i,s,r),t=T(t),i=g(t)}return s}function Je(n){return n.node.value}function lo(n,e){n.node.value=e,Qn(n)}function co(n){return n.node.childCount>0}function nh(n){return Je(n)===void 0&&!co(n)}function _n(n,e){U(n.node.children,(t,s)=>{e(new Bs(t,n,s))})}function uo(n,e,t,s){t&&e(n),_n(n,i=>{uo(i,e,!0)})}function sh(n,e,t){let s=n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function xt(n){return new w(n.parent===null?n.name:xt(n.parent)+"/"+n.name)}function Qn(n){n.parent!==null&&ih(n.parent,n.name,n)}function ih(n,e,t){const s=nh(t),i=ee(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Qn(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Qn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=/[\[\].#$\/\u0000-\u001F\u007F]/,oh=/[\[\].#$\u0000-\u001F\u007F]/,Dn=10*1024*1024,Ws=function(n){return typeof n=="string"&&n.length!==0&&!rh.test(n)},ho=function(n){return typeof n=="string"&&n.length!==0&&!oh.test(n)},ah=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ho(n)},lh=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!fs(n)||n&&typeof n=="object"&&ee(n,".sv")},fo=function(n,e,t,s){s&&e===void 0||mn(ln(n,"value"),e,t)},mn=function(n,e,t){const s=t instanceof w?new Sc(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ee(s));if(typeof e=="function")throw new Error(n+"contains a function "+Ee(s)+" with contents = "+e.toString());if(fs(e))throw new Error(n+"contains "+e.toString()+" "+Ee(s));if(typeof e=="string"&&e.length>Dn/3&&cn(e)>Dn)throw new Error(n+"contains a string greater than "+Dn+" utf8 bytes "+Ee(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(U(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ws(o)))throw new Error(n+" contains an invalid key ("+o+") "+Ee(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Tc(s,o),mn(n,a,s),Rc(s)}),i&&r)throw new Error(n+' contains ".value" child '+Ee(s)+" in addition to actual children.")}},ch=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=yt(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ws(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ic);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&G(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},uh=function(n,e,t,s){const i=ln(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];U(e,(o,a)=>{const l=new w(o);if(mn(i,a,A(t,l)),ys(l)===".priority"&&!lh(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),ch(i,r)},po=function(n,e,t,s){if(!ho(t))throw new Error(ln(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},hh=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),po(n,e,t)},Hs=function(n,e){if(g(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},dh=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ws(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!ah(t))throw new Error(ln(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function gn(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!vs(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function _o(n,e,t){gn(n,t),mo(n,s=>vs(s,e))}function Y(n,e,t){gn(n,t),mo(n,s=>G(s,e)||G(e,s))}function mo(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(ph(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function ph(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();ot&&B("event: "+t.toString()),Qe(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="repo_interrupt",mh=25;class gh{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new fh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Qt(),this.transactionQueueTree_=new Bs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function yh(n,e,t){if(n.stats_=ms(n.repoInfo_),n.forceRestClient_||Kl())n.server_=new Kt(n.repoInfo_,(s,i,r,o)=>{Bi(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ui(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new oe(n.repoInfo_,e,(s,i,r,o)=>{Bi(n,s,i,r,o)},s=>{Ui(n,s)},s=>{vh(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=ec(n.repoInfo_,()=>new Zc(n.stats_,n.server_)),n.infoData_=new jc,n.infoSyncTree_=new Li({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=Dt(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Vs(n,"connected",!1),n.serverSyncTree_=new Li({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);Y(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function go(n){const t=n.infoData_.getNode(new w(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function yn(n){return Zu({timestamp:go(n)})}function Bi(n,e,t,s,i){n.dataUpdateCount++;const r=new w(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=Vt(t,c=>x(c));o=zu(n.serverSyncTree_,r,l,i)}else{const l=x(t);o=no(n.serverSyncTree_,r,l,i)}else if(s){const l=Vt(t,c=>x(c));o=Gu(n.serverSyncTree_,r,l)}else{const l=x(t);o=Dt(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=$e(n,r)),Y(n.eventQueue_,a,o)}function Ui(n,e){Vs(n,"connected",e),e===!1&&bh(n)}function vh(n,e){U(e,(t,s)=>{Vs(n,t,s)})}function Vs(n,e,t){const s=new w("/.info/"+e),i=x(t);n.infoData_.updateSnapshot(s,i);const r=Dt(n.infoSyncTree_,s,i);Y(n.eventQueue_,s,r)}function $s(n){return n.nextWriteId_++}function Ch(n,e,t){const s=ju(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=x(i).withIndex(e._queryParams.getIndex());Kn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Dt(n.serverSyncTree_,e._path,r);else{const a=bt(n.serverSyncTree_,e);o=no(n.serverSyncTree_,e._path,r,a)}return Y(n.eventQueue_,e._path,o),rn(n.serverSyncTree_,e,t,null,!0),r},i=>(Mt(n,"get for query "+M(e)+" failed: "+i),Promise.reject(new Error(i))))}function Eh(n,e,t,s,i){Mt(n,"set",{path:e.toString(),value:t,priority:s});const r=yn(n),o=x(t,s),a=Ps(n.serverSyncTree_,e),l=ao(o,a,r),c=$s(n),d=to(n.serverSyncTree_,e,l,c,!0);gn(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||H("set at "+e+" failed: "+h);const C=ue(n.serverSyncTree_,c,!_);Y(n.eventQueue_,e,C),Xn(n,i,h,p)});const u=Ys(n,e);$e(n,u),Y(n.eventQueue_,u,[])}function wh(n,e,t,s){Mt(n,"update",{path:e.toString(),value:t});let i=!0;const r=yn(n),o={};if(U(t,(a,l)=>{i=!1,o[a]=oo(A(e,a),x(l),n.serverSyncTree_,r)}),i)B("update() called with empty data.  Don't do anything."),Xn(n,s,"ok",void 0);else{const a=$s(n),l=$u(n.serverSyncTree_,e,o,a);gn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,d)=>{const u=c==="ok";u||H("update at "+e+" failed: "+c);const h=ue(n.serverSyncTree_,a,!u),p=h.length>0?$e(n,e):e;Y(n.eventQueue_,p,h),Xn(n,s,c,d)}),U(t,c=>{const d=Ys(n,A(e,c));$e(n,d)}),Y(n.eventQueue_,e,[])}}function bh(n){Mt(n,"onDisconnectEvents");const e=yn(n),t=Qt();$n(n.onDisconnect_,E(),(i,r)=>{const o=oo(i,r,n.serverSyncTree_,e);Wr(t,i,o)});let s=[];$n(t,E(),(i,r)=>{s=s.concat(Dt(n.serverSyncTree_,i,r));const o=Ys(n,i);$e(n,o)}),n.onDisconnect_=Qt(),Y(n.eventQueue_,E(),s)}function Ih(n,e,t){let s;g(e._path)===".info"?s=Kn(n.infoSyncTree_,e,t):s=Kn(n.serverSyncTree_,e,t),_o(n.eventQueue_,e._path,s)}function yo(n,e,t){let s;g(e._path)===".info"?s=rn(n.infoSyncTree_,e,t):s=rn(n.serverSyncTree_,e,t),_o(n.eventQueue_,e._path,s)}function Sh(n){n.persistentConnection_&&n.persistentConnection_.interrupt(_h)}function Mt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),B(t,...e)}function Xn(n,e,t,s){e&&Qe(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function vo(n,e,t){return Ps(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function Gs(n,e=n.transactionQueueTree_){if(e||vn(n,e),Je(e)){const t=Eo(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&Th(n,xt(e),t)}else co(e)&&_n(e,t=>{Gs(n,t)})}function Th(n,e,t){const s=t.map(c=>c.currentWriteId),i=vo(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const d=t[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=W(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Mt(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(ue(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();vn(n,Us(n.transactionQueueTree_,e)),Gs(n,n.transactionQueueTree_),Y(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)Qe(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{H("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}$e(n,e)}},o)}function $e(n,e){const t=Co(n,e),s=xt(t),i=Eo(n,t);return Rh(n,i,s),s}function Rh(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=W(t,l.path);let d=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,i=i.concat(ue(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=mh)d=!0,u="maxretry",i=i.concat(ue(n.serverSyncTree_,l.currentWriteId,!0));else{const h=vo(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){mn("transaction failed: Data returned ",p,l.path);let _=x(p);typeof p=="object"&&p!=null&&ee(p,".priority")||(_=_.updatePriority(h.getPriority()));const k=l.currentWriteId,q=yn(n),ne=ao(_,h,q);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=ne,l.currentWriteId=$s(n),o.splice(o.indexOf(k),1),i=i.concat(to(n.serverSyncTree_,l.path,ne,l.currentWriteId,l.applyLocally)),i=i.concat(ue(n.serverSyncTree_,k,!0))}else d=!0,u="nodata",i=i.concat(ue(n.serverSyncTree_,l.currentWriteId,!0))}Y(n.eventQueue_,t,i),i=[],d&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(u),!1,null))))}vn(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Qe(s[a]);Gs(n,n.transactionQueueTree_)}function Co(n,e){let t,s=n.transactionQueueTree_;for(t=g(e);t!==null&&Je(s)===void 0;)s=Us(s,t),e=T(e),t=g(e);return s}function Eo(n,e){const t=[];return wo(n,e,t),t.sort((s,i)=>s.order-i.order),t}function wo(n,e,t){const s=Je(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);_n(e,i=>{wo(n,i,t)})}function vn(n,e){const t=Je(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,lo(e,t.length>0?t:void 0)}_n(e,s=>{vn(n,s)})}function Ys(n,e){const t=xt(Co(n,e)),s=Us(n.transactionQueueTree_,e);return sh(s,i=>{xn(n,i)}),xn(n,s),uo(s,i=>{xn(n,i)}),t}function xn(n,e){const t=Je(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ue(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?lo(e,void 0):t.length=r+1,Y(n.eventQueue_,xt(e),i);for(let o=0;o<s.length;o++)Qe(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nh(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function kh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):H(`Invalid query segment '${t}' in query '${n}'`)}return e}const Wi=function(n,e){const t=Ah(n),s=t.namespace;t.domain==="firebase.com"&&ce(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&ce("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Wl();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new br(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new w(t.pathString)}},Ah=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(i=Nh(n.substring(d,u)));const h=kh(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");s=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=s}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hi="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Ph=(function(){let n=0;const e=[];return function(t){const s=t===n;n=t;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Hi.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Hi.charAt(e[i]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+M(this.snapshot.exportVal())}}class Io{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class zs{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return v(this._path)?null:ys(this._path)}get ref(){return new te(this._repo,this._path)}get _queryIdentifier(){const e=Ti(this._queryParams),t=ps(e);return t==="{}"?"default":t}get _queryObject(){return Ti(this._queryParams)}isEqual(e){if(e=Re(e),!(e instanceof zs))return!1;const t=this._repo===e._repo,s=vs(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+bc(this._path)}}class te extends zs{constructor(e,t){super(e,t,new bs,!1)}get parent(){const e=Dr(this._path);return e===null?null:new te(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ge{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new w(e),s=Ye(this.ref,e);return new Ge(this._node.getChild(t),s,P)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new Ge(i,Ye(this.ref,s),P)))}hasChild(e){const t=new w(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function J(n,e){return n=Re(n),n._checkNotDeleted("ref"),e!==void 0?Ye(n._root,e):n._root}function Ye(n,e){return n=Re(n),g(n._path)===null?hh("child","path",e):po("child","path",e),new te(n._repo,A(n._path,e))}function Dh(n,e){n=Re(n),Hs("push",n._path),fo("push",e,n._path,!0);const t=go(n._repo),s=Ph(t),i=Ye(n,s),r=Ye(n,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function xh(n){return Hs("remove",n._path),Ot(n,null)}function Ot(n,e){n=Re(n),Hs("set",n._path),fo("set",e,n._path,!1);const t=new Rt;return Eh(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function So(n,e){uh("update",e,n._path);const t=new Rt;return wh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Mh(n){n=Re(n);const e=new qs(()=>{}),t=new Lt(e);return Ch(n._repo,n,t).then(s=>new Ge(s,new te(n._repo,n._path),n._queryParams.getIndex()))}class Lt{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new bo("value",this,new Ge(e.snapshotNode,new te(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Io(this,e,t):null}matches(e){return e instanceof Lt?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Cn{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Io(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const s=Ye(new te(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new bo(e.type,this,new Ge(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Cn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function To(n,e,t,s,i){const r=new qs(t,void 0),o=e==="value"?new Lt(r):new Cn(e,r);return Ih(n._repo,n,o),()=>yo(n._repo,n,o)}function Ro(n,e,t,s){return To(n,"value",e)}function Oh(n,e,t,s){return To(n,"child_added",e)}function Lh(n,e,t){let s=null;const i=t?new qs(t):null;e==="value"?s=new Lt(i):e&&(s=new Cn(e,i)),yo(n._repo,n,s)}Ou(te);Wu(te);/**
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
 */const Fh="FIREBASE_DATABASE_EMULATOR_HOST",Jn={};let Bh=!1;function Uh(n,e,t,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=hs(r);n.repoInfo_=new br(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),s&&(n.authTokenProvider_=s)}function Wh(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||ce("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Wi(r,i),a=o.repoInfo,l;typeof process<"u"&&li&&(l=li[Fh]),l?(r=`http://${l}?ns=${a.namespace}`,o=Wi(r,i),a=o.repoInfo):o.repoInfo.secure;const c=new Xl(n.name,n.options,e);dh("Invalid Firebase Database URL",o),v(o.path)||ce("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Vh(a,n,c,new Ql(n,t));return new $h(d,n)}function Hh(n,e){const t=Jn[e];(!t||t[n.key]!==n)&&ce(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Sh(n),delete t[n.key]}function Vh(n,e,t,s){let i=Jn[e.name];i||(i={},Jn[e.name]=i);let r=i[n.toURLString()];return r&&ce("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new gh(n,Bh,t,s),i[n.toURLString()]=r,r}class $h{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(yh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new te(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Hh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ce("Cannot call "+e+" on a deleted database.")}}function Gh(n=El(),e){const t=ml(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=ta("database");s&&Yh(t,...s)}return t}function Yh(n,e,t,s={}){n=Re(n),n._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&$t(s,r.repoInfo_.emulatorOptions))return;ce("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&ce('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Wt(Wt.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:sa(s.mockUserToken,n.app.options.projectId);o=new Wt(a)}hs(e)&&(na(e),oa("Database",!0)),Uh(r,i,s,o)}/**
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
 */function qh(n){Ml(Cl),Yt(new _t("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Wh(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Oe(ci,ui,n),Oe(ci,ui,"esm2020")}oe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};oe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};qh();const qe=document.getElementById("localVideo"),ie=document.getElementById("remoteVideo"),N=document.getElementById("sharedVideo"),No=document.querySelector('select-media-device[type="videoinput"]'),ko=document.querySelector('select-media-device[type="audioinput"]'),zh=document.querySelector('select-media-device[type="audiooutput"]'),It=document.getElementById("startChat"),En=document.getElementById("hangUp"),jh=document.getElementById("copyLink"),ht=document.getElementById("pipBtn"),Vi=document.getElementById("switchCameraSelfBtn"),Zn=document.getElementById("toggleMode"),Kh=document.getElementById("loadStream"),Qh=document.getElementById("status"),Ao=document.getElementById("linkContainer"),es=document.getElementById("watchContainer"),ze=document.getElementById("yt-player-div"),ts=document.querySelector(".video-container"),j=document.getElementById("syncStatus"),on=document.getElementById("shareLink"),St=document.getElementById("streamUrl"),Po=document.getElementById("mutePartnerBtn"),Xh=document.getElementById("fullscreenPartnerBtn"),Jh=document.getElementById("muteSelfBtn"),Zh=document.getElementById("videoSelfBtn"),ed=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");document.getElementById("titleLink");document.getElementById("titleText");let ns=!1,dt=null;function td(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function nd(n,e,t){t&&(t.muted=!n,t.volume=e)}function sd(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function id(n,e){n&&(dt=()=>{if(n.muted!==ns){const t=e.querySelector("i");t.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",ns=n.muted}},n.addEventListener("volumechange",dt))}function rd(n){!n||!dt||(n.removeEventListener("volumechange",dt),dt=null)}function od({localStream:n,localVideo:e,remoteVideo:t,muteSelfBtn:s,videoSelfBtn:i,switchCameraSelfBtn:r,fullscreenSelfBtn:o,mutePartnerBtn:a,fullscreenPartnerBtn:l,pc:c=null,audioConstraints:d={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}){s&&(s.onclick=()=>{if(!e||!n)return;const u=!e.muted;td(!u,n),nd(!u,0,e),sd(u,s)}),i&&(i.onclick=()=>{if(!n)return;const u=n.getVideoTracks()[0];if(u){u.enabled=!u.enabled;const h=i.querySelector("i");h.className=u.enabled?"fa fa-video":"fa fa-video-slash"}}),r&&(r.onclick=async()=>{if(n)try{const u=n.getVideoTracks()[0],p=u.getSettings().facingMode==="user"?"environment":"user";u.stop();const _=await navigator.mediaDevices.getUserMedia({video:{facingMode:p},audio:d}),C=_.getVideoTracks()[0];if(c){const k=c.getSenders().find(q=>q.track?.kind==="video");k&&k.replaceTrack(C)}return _}catch(u){return console.error("Failed to switch camera:",u),null}}),o&&e&&(o.onclick=()=>{e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullscreen()}),a&&t&&(a.onclick=()=>{t&&(t.muted=!t.muted)}),l&&t&&(l.onclick=()=>{t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen&&t.webkitRequestFullscreen()})}function ad(n){rd(n),ns=!1}let O=null,Ae=!1;function ld(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function ss(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function Do(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const s=n.match(t);if(s&&s[1])return s[1]}return null}async function cd({url:n,containerId:e,onReady:t,onStateChange:s}){const i=Do(n);if(!i)throw new Error("Invalid YouTube URL");if(await ld(),!document.getElementById(e))throw new Error(`Container #${e} not found`);if(O){try{O.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}O=null}return new Promise((o,a)=>{try{O=new window.YT.Player(e,{videoId:i,playerVars:{autoplay:0,controls:1,rel:0,modestbranding:1},events:{onReady:l=>{Ae=!0,t&&t(l),o(O)},onStateChange:l=>{s&&s(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function $i(){return O}function xo(){if(O){try{O.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}O=null,Ae=!1}}function Gi(){O&&Ae&&O.playVideo()}function Yi(){O&&Ae&&O.pauseVideo()}function ud(n){O&&Ae&&O.seekTo(n,!0)}function an(){return O&&Ae?O.getCurrentTime():0}function is(){return O&&Ae?O.getPlayerState():-1}const he={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Tt=[],we=null,ft=!1,Mo=!1,rs="",X=-1;const hd="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",dd="https://www.googleapis.com/youtube/v3";function fd(n){we=n;const e=document.querySelector(".search-section"),t=document.getElementById("searchBtn"),s=document.getElementById("searchQuery"),i=document.getElementById("searchResults");if(!t||!s||!i){console.error("YouTube search elements not found in DOM");return}const r=a=>/^https?:\/\//i.test(a),o=a=>{i.querySelectorAll(".search-result-item").forEach((c,d)=>{d===a?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),X=a};t.onclick=async()=>{const a=s.value.trim();if(!a){as("Please enter a search term");return}if(ft&&a===rs)os(Tt);else if(!r(a))await qi(a);else{we&&we({url:a,title:a,channel:"",thumbnail:"",id:a}),i.style.display="none",s.value="";return}},e.addEventListener("keydown",async a=>{const l=i.querySelectorAll(".search-result-item");if(l.length>0&&(a.key==="ArrowDown"||a.key==="ArrowUp")){if(a.preventDefault(),a.key==="ArrowDown"){let c=X+1;c>=l.length&&(c=0),o(c)}else if(a.key==="ArrowUp"){let c=X-1;c<0&&(c=X===-1?0:l.length-1),o(c)}return}if(a.key==="Enter"){if(l.length>0&&X>=0){l[X].click();return}const c=s.value.trim();if(c)if(ft&&c===rs)os(Tt);else if(!r(c))await qi(c);else{we&&we({url:c,title:c,channel:"",thumbnail:"",id:c}),i.style.display="none",s.value="";return}}else a.key==="Escape"&&Mo&&(i.style.display="none")})}async function qi(n){rs=n;const e=document.getElementById("searchBtn"),t=document.getElementById("searchResults");e.disabled=!0,e.textContent="Searching...",t.innerHTML='<div class="search-loading">Searching YouTube...</div>',t.style.display="block",ft=!1;try{const s=await fetch(`${dd}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${hd}`);if(!s.ok)throw s.status===403?new Error("YouTube API quota exceeded. Please try again later."):s.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${s.status}`);const i=await s.json();if(!i.items||i.items.length===0){as("No videos found"),ft=!1;return}Tt=i.items.map(r=>({id:r.id.videoId,title:r.snippet.title,thumbnail:r.snippet.thumbnails.medium.url,channel:r.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${r.id.videoId}`})),os(Tt),ft=!0}catch(s){console.error("YouTube search failed:",s),as(s.message||"Search failed. Please try again.")}finally{e.disabled=!1,e.textContent="Search"}}function os(n){const e=document.getElementById("searchResults");if(!n||n.length===0){e.innerHTML='<div class="no-results">No results found</div>',X=-1;return}e.innerHTML="",n.forEach(s=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
        <img src="${s.thumbnail}" alt="${s.title}" class="result-thumbnail">
        <div class="result-info">
          <div class="result-title">${s.title}</div>
          <div class="result-channel">${s.channel}</div>
        </div>
      `,i.onclick=()=>{if(we){we(s),e.style.display="none";const r=document.getElementById("searchQuery");r&&(r.value=""),X=-1}},e.appendChild(i)}),e.style.display="block",Mo=!0,X=0,e.querySelectorAll(".search-result-item").forEach((s,i)=>{i===X?(s.classList.add("focused"),s.scrollIntoView({block:"nearest"})):s.classList.remove("focused")})}function as(n){const e=document.getElementById("searchResults");e.innerHTML=`<div class="search-error">${n}</div>`,e.style.display="block"}function pd(){const n=document.getElementById("searchResults");n&&(n.innerHTML="",n.style.display="none"),Tt=[]}class _d extends HTMLElement{static observedAttributes=["type"];constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.updateDevices(),navigator.mediaDevices.addEventListener("devicechange",()=>this.updateDevices())}disconnectedCallback(){navigator.mediaDevices.removeEventListener("devicechange",()=>this.updateDevices())}attributeChangedCallback(){this.updateDevices()}render(){this.shadowRoot.innerHTML=`
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
    `}async updateDevices(){const e=this.getAttribute("type")||"videoinput",s=(await navigator.mediaDevices.enumerateDevices()).filter(r=>r.kind===e),i=this.shadowRoot.querySelector("select");i.innerHTML=s.map((r,o)=>`<option value="${r.deviceId}">${r.label||`${e} ${o+1}`}</option>`).join(""),this.dispatchEvent(new CustomEvent("deviceschanged",{detail:{devices:s}}))}get value(){return this.shadowRoot.querySelector("select").value}set value(e){this.shadowRoot.querySelector("select").value=e}}customElements.define("select-media-device",_d);function md(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function gd(){return md()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function yd(){const n=await gd();let e=!1,t=!1;return n.forEach(s=>{const i=s.label.toLowerCase();i.includes("front")&&(e=!0),(i.includes("back")||i.includes("rear")||i.includes("environment"))&&(t=!0)}),e&&t}const vd={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Cd=or(vd),Z=Gh(Cd),Oo={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};let b=null,$=null,R=null,Ft=null,je=null,st=!1,xe=null,js=!1;const ls=[];let cs=null,it=0;const zi={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0};async function Lo(){Ft=Math.random().toString(36).substring(2,15);try{$=await navigator.mediaDevices.getUserMedia({video:!0,audio:zi});const n=new MediaStream($.getVideoTracks());return qe.srcObject=n,await yd()&&(Vi.style.display="block"),od({localStream:$,localVideo:qe,remoteVideo:ie,muteSelfBtn:Jh,videoSelfBtn:Zh,switchCameraSelfBtn:Vi,fullscreenSelfBtn:ed,mutePartnerBtn:Po,fullscreenPartnerBtn:Xh,pc:b,audioConstraints:zi}),!0}catch(n){return console.error("Failed to get user media:",n),D("Error: Please allow camera and microphone access."),!1}}function Fo(n){n.ontrack=e=>{if(!e.streams||!e.streams[0]instanceof MediaStream){console.error("No valid remote MediaStream found in event.streams:",e.streams);return}ie.srcObject!==e.streams[0]&&(ie.srcObject=e.streams[0],ht.style.display="block",id(ie,Po),D("Connected!"))}}function Bo(n,e){n.onicecandidate=r=>{if(r.candidate){const a=Dh(J(Z,`rooms/${R}/${e==="initiator"?"callerCandidates":"calleeCandidates"}`));Ot(a,r.candidate.toJSON())}};const s=J(Z,`rooms/${R}/${e==="initiator"?"calleeCandidates":"callerCandidates"}`),i=r=>{const o=r.val();o&&n.remoteDescription&&n.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};Oh(s,i),Ks(s,"child_added",i)}function Uo(n){n.onconnectionstatechange=()=>{n.connectionState==="connected"?D("Connected!"):n.connectionState==="disconnected"?D("Partner disconnected"):n.connectionState==="failed"&&D("Connection failed")}}async function Ed(){if(!$){D("Error: Camera not initialized");return}R=Math.random().toString(36).substring(2,15),je="initiator",b=new RTCPeerConnection(Oo),$.getTracks().forEach(r=>{b.addTrack(r,$)}),Fo(b),Bo(b,je),Uo(b);const n=await b.createOffer();await b.setLocalDescription(n);const e=J(Z,`rooms/${R}`);await Ot(e,{offer:{type:n.type,sdp:n.sdp}});const t=J(Z,`rooms/${R}/answer`),s=async r=>{const o=r.val();if(o&&o.sdp!==cs){if(cs=o.sdp,b.signalingState!=="have-local-offer"&&b.signalingState!=="stable")return;try{await b.setRemoteDescription(new RTCSessionDescription(o))}catch(a){console.error("Failed to set remote description:",a)}}};Ro(t,s),Ks(t,"value",s),Wo();const i=`${window.location.origin}${window.location.pathname}?room=${R}`;on.value=i,Ao.style.display="block",It.disabled=!0,En.disabled=!1,D("Link ready! Share with your partner.")}async function wd(){if(!$){D("Error: Camera not initialized");return}if(!R){D("Error: No room ID");return}je="joiner";const n=J(Z,`rooms/${R}`),e=await Mh(n);if(!e.exists()){D("Error: Invalid room link");return}const s=e.val().offer;if(!s){D("Error: No offer found");return}b=new RTCPeerConnection(Oo),$.getTracks().forEach(r=>{b.addTrack(r,$)}),Fo(b),Bo(b,je),Uo(b),await b.setRemoteDescription(new RTCSessionDescription(s));const i=await b.createAnswer();await b.setLocalDescription(i);try{await So(n,{answer:{type:i.type,sdp:i.sdp}})}catch(r){console.error("Failed to update answer in Firebase:",r),D("Failed to send answer to partner.");return}Wo(),En.disabled=!1,D("Connecting...")}let re=!1,ae=null;async function Me(n){if(!R)return;const e=J(Z,`rooms/${R}/watch`);try{await So(e,{...n,updatedBy:Ft})}catch(t){console.error("Failed to update watch state:",t)}}function Wo(){if(!R)return;const n=J(Z,`rooms/${R}/watch`),e=t=>{const s=t.val();if(s&&s.updatedBy!==Ft&&!(Date.now()-it<500))if(s.url&&s.url!==St.value&&(St.value=s.url,ss(s.url)?Vo(s.url):(N.style.display="block",N.src=s.url,ze.style.display="none"),j.textContent="Video loaded"),s.isYouTube&&xe&&js){if(s.playing!==void 0){const i=is(),r=i===he.PLAYING;if(i===he.BUFFERING||i===he.UNSTARTED)re=!0,ae&&clearTimeout(ae),ae=setTimeout(async()=>{re=!1;const a=is()===he.PLAYING;await Me({playing:a,currentTime:an()})},700);else{if(re)return;s.playing&&!r?Gi():!s.playing&&r&&Yi()}}if(s.currentTime!==void 0){const i=an();Math.abs(i-s.currentTime)>.3&&!re&&(ud(s.currentTime),setTimeout(()=>{s.playing?Gi():Yi()},500))}}else!s.isYouTube&&N.src&&(s.playing!==void 0&&(s.playing&&N.paused?N.play().catch(i=>console.warn("Play failed:",i)):!s.playing&&!N.paused&&N.pause()),s.currentTime!==void 0&&Math.abs(N.currentTime-s.currentTime)>1&&(N.currentTime=s.currentTime,s.playing?N.play().catch(r=>console.warn("Play failed:",r)):N.pause()))};Ro(n,e),Ks(n,"value",e),N.addEventListener("play",async()=>{!xe&&R&&(it=Date.now(),await Me({playing:!0,isYouTube:!1}))}),N.addEventListener("pause",async()=>{!xe&&R&&(it=Date.now(),await Me({playing:!1,isYouTube:!1}))}),N.addEventListener("seeked",async()=>{!xe&&R&&(it=Date.now(),await Me({currentTime:N.currentTime,playing:!N.paused,isYouTube:!1}))})}function Ho(){const n=St.value.trim();if(!n){j.textContent="Please enter a video URL";return}if(it=Date.now(),ss(n)?Vo(n):(ze.style.display="none",xo(),N.style.display="block",N.src=n,j.textContent="Video loaded"),R){const e=J(Z,`rooms/${R}/watch`);Ot(e,{url:n,playing:!1,currentTime:0,isYouTube:ss(n),updatedBy:Ft})}}function bd(n){St.value=n.url,Ho(),j.textContent=`Loading "${n.title}"...`}async function Vo(n){if(!Do(n)){j.textContent="Invalid YouTube URL";return}j.textContent="Loading YouTube video...",N.style.display="none",ze.style.display="block";try{await cd({url:n,containerId:"yt-player-div",onReady:t=>{if(js=!0,j.textContent="YouTube video ready",R){const s=J(Z,`rooms/${R}/watch`);Ot(s,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Ft})}},onStateChange:async t=>{if(!$i())return;const i=t.data===he.PLAYING,r=t.data===he.PAUSED;if(t.data===he.BUFFERING){re=!0,ae&&clearTimeout(ae),ae=setTimeout(async()=>{re=!1;const l=is()===he.PLAYING;await Me({playing:l,currentTime:an()})},700);return}r&&re||!re&&(i||r)&&await Me({playing:i,currentTime:an()})}}),xe=$i(),j.textContent="YouTube video loaded"}catch(t){console.error("Failed to load YouTube video:",t),j.textContent="Failed to load YouTube video",N.style.display="block",ze.style.display="none"}}function Id(){st=!st,st?(ts.style.display="none",es.style.display="block",Zn.textContent="Switch to Chat Mode",j.textContent=st&&R?"Watch mode ready":"Enter a video URL",fd(bd)):(ts.style.display="flex",es.style.display="none",Zn.textContent="Switch to Watch Mode",pd(),ze.style.display="none",N.style.display="none")}ht.onclick=async()=>{try{document.pictureInPictureElement?(await document.exitPictureInPicture(),ht.textContent="Float Partner Video"):(await ie.requestPictureInPicture(),ht.textContent="Exit Floating Video")}catch(n){console.error("PiP failed:",n),D("Picture-in-picture not supported")}};async function $o(){if(console.debug("Hanging up..."),$&&($.getTracks().forEach(n=>n.stop()),qe.srcObject=null,$=null),ie.srcObject&&(ie.srcObject.getTracks().forEach(n=>n.stop()),ie.srcObject=null),ad(ie),b&&(b.close(),b=null),ls.forEach(({ref:n,type:e,callback:t})=>Lh(n,e,t)),ls.length=0,xo(),xe=null,js=!1,ze.style.display="none",ae&&(clearTimeout(ae),ae=null),re=!1,R&&je==="initiator"){const n=J(Z,`rooms/${R}`);xh(n).catch(e=>{console.warn("Failed to remove room:",e)})}It.disabled=!1,It.style.display="block",En.disabled=!0,Ao.style.display="none",es.style.display="none",ts.style.display="flex",ht.style.display="none",on.value="",N.src="",N.style.display="none",St.value="",j.textContent="",document.pictureInPictureElement&&document.exitPictureInPicture().catch(n=>console.error(n)),R=null,je=null,st=!1,cs=null,window.history.replaceState({},document.title,window.location.pathname),D('Disconnected. Click "Start New Chat" to begin.')}It.onclick=async()=>{await Lo()&&await Ed()};En.onclick=$o;Zn.onclick=Id;Kh.onclick=Ho;jh.onclick=async()=>{try{await navigator.clipboard.writeText(on.value),D("Link copied to clipboard!")}catch{on.select(),document.execCommand("copy"),D("Link copied!")}};function D(n){Qh.textContent=n}function Ks(n,e,t){ls.push({ref:n,type:e,callback:t})}async function Sd(){const e=new URLSearchParams(window.location.search).get("room");e?(R=e,D("Connecting to room..."),It.style.display="none",await Lo()&&await wd()):D('Ready. Click "Start New Chat" to begin.')}window.addEventListener("beforeunload",n=>{if(b&&b.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;$o()});document.querySelectorAll(".video-wrapper").forEach(n=>{let e;const t=n.querySelector(".hover-controls");t&&n.addEventListener("touchstart",()=>{t.style.opacity="1",clearTimeout(e),e=setTimeout(()=>{t.style.opacity="0"},3e3)})});Sd();async function Go(){const n=No?.value,e=ko?.value,t={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},s={video:n?{deviceId:{exact:n}}:!0,audio:e?{deviceId:{exact:e},...t}:{...t}};try{const i=await navigator.mediaDevices.getUserMedia(s);if(b){const o=i.getVideoTracks()[0],a=b.getSenders().find(d=>d.track?.kind==="video");o&&a&&a.replaceTrack(o);const l=i.getAudioTracks()[0],c=b.getSenders().find(d=>d.track?.kind==="audio");l&&c&&c.replaceTrack(l)}$=i;const r=new MediaStream(i.getVideoTracks());qe.srcObject=r}catch(i){D("Could not access selected devices."),console.error(i)}}No?.shadowRoot.querySelector("select")?.addEventListener("change",Go);ko?.shadowRoot.querySelector("select")?.addEventListener("change",Go);zh?.shadowRoot.querySelector("select")?.addEventListener("change",n=>{const e=n.target.value;typeof qe.sinkId<"u"&&qe.setSinkId(e).catch(t=>{D("Could not set audio output device."),console.error(t)})});
