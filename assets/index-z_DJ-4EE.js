(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
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
 */const Ra=()=>{};var vs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(t,e){if(!t)throw st(e)},st=function(t){return new Error("Firebase Database ("+Tr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ka=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ii={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let u=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(u=64)),i.push(n[d],n[h],n[u],n[p])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Nr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):ka(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new Aa;const u=r<<2|a>>4;if(i.push(u),c!==64){const p=a<<4&240|c>>2;if(i.push(p),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Aa extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Rr=function(t){const e=Nr(t);return Ii.encodeByteArray(e,!0)},Qt=function(t){return Rr(t).replace(/\./g,"")},Qn=function(t){try{return Ii.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(t){return kr(void 0,t)}function kr(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Da(n)||(t[n]=kr(t[n],e[n]));return t}function Da(t){return t!=="__proto__"}/**
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
 */function xa(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ma=()=>xa().__FIREBASE_DEFAULTS__,Oa=()=>{if(typeof process>"u"||typeof vs>"u")return;const t=vs.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},La=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Qn(t[1]);return e&&JSON.parse(e)},Ar=()=>{try{return Ra()||Ma()||Oa()||La()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Fa=t=>Ar()?.emulatorHosts?.[t],Ba=t=>{const e=Fa(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Pr=()=>Ar()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function Si(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ua(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Wa(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Qt(JSON.stringify(n)),Qt(JSON.stringify(o)),""].join(".")}const ft={};function Ha(){const t={prod:[],emulator:[]};for(const e of Object.keys(ft))ft[e]?t.emulator.push(e):t.prod.push(e);return t}function Va(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Cs=!1;function $a(t,e){if(typeof window>"u"||typeof document>"u"||!Si(window.location.host)||ft[t]===e||ft[t]||Cs)return;ft[t]=e;function n(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=Ha().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,p){u.setAttribute("width","24"),u.setAttribute("id",p),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function c(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{Cs=!0,o()},u}function d(u,p){u.setAttribute("id",p),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=Va(i),p=n("text"),_=document.getElementById(p)||document.createElement("span"),E=n("learnmore"),g=document.getElementById(E)||document.createElement("a"),L=n("preprendIcon"),ce=document.getElementById(L)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const Pe=u.element;a(Pe),d(g,E);const Mn=c();l(ce,L),Pe.append(ce,_,g,Mn),document.body.appendChild(Pe)}r?(_.innerText="Preview backend disconnected.",ce.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ce.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function Ya(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Dr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ya())}function Ga(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function za(){return Tr.NODE_ADMIN===!0}function qa(){try{return typeof indexedDB=="object"}catch{return!1}}function ja(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="FirebaseError";class Ot extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Ka,Object.setPrototypeOf(this,Ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xr.prototype.create)}}class xr{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Qa(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ot(s,a,i)}}function Qa(t,e){return t.replace(Xa,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Xa=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(t){return JSON.parse(t)}function B(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=bt(Qn(r[0])||""),n=bt(Qn(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Ja=function(t){const e=Mr(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Za=function(t){const e=Mr(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Qe(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Es(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Xt(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function Jt(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(ws(r)&&ws(o)){if(!Jt(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function ws(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const u=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const u=(s<<5|s>>>27)+c+l+d+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function yn(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},vn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function He(t){return t&&t._delegate?t._delegate:t}class It{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const De="[DEFAULT]";/**
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
 */class il{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Mt;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rl(e))try{this.getOrInitializeService({instanceIdentifier:De})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=De){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=De){return this.instances.has(e)}getOptions(e=De){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:sl(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=De){return this.component?this.component.multipleInstances?e:De:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sl(t){return t===De?void 0:t}function rl(t){return t.instantiationMode==="EAGER"}/**
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
 */class ol{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new il(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var R;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(R||(R={}));const al={debug:R.DEBUG,verbose:R.VERBOSE,info:R.INFO,warn:R.WARN,error:R.ERROR,silent:R.SILENT},ll=R.INFO,cl={[R.DEBUG]:"log",[R.VERBOSE]:"log",[R.INFO]:"info",[R.WARN]:"warn",[R.ERROR]:"error"},ul=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=cl[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Or{constructor(e){this.name=e,this._logLevel=ll,this._logHandler=ul,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in R))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?al[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,R.DEBUG,...e),this._logHandler(this,R.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,R.VERBOSE,...e),this._logHandler(this,R.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,R.INFO,...e),this._logHandler(this,R.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,R.WARN,...e),this._logHandler(this,R.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,R.ERROR,...e),this._logHandler(this,R.ERROR,...e)}}const hl=(t,e)=>e.some(n=>t instanceof n);let bs,Is;function dl(){return bs||(bs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fl(){return Is||(Is=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Lr=new WeakMap,Xn=new WeakMap,Fr=new WeakMap,On=new WeakMap,Ti=new WeakMap;function pl(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(be(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Lr.set(n,t)}).catch(()=>{}),Ti.set(e,t),e}function _l(t){if(Xn.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Xn.set(t,e)}let Jn={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Xn.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Fr.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return be(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ml(t){Jn=t(Jn)}function gl(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Ln(this),e,...n);return Fr.set(i,e.sort?e.sort():[e]),be(i)}:fl().includes(t)?function(...e){return t.apply(Ln(this),e),be(Lr.get(this))}:function(...e){return be(t.apply(Ln(this),e))}}function yl(t){return typeof t=="function"?gl(t):(t instanceof IDBTransaction&&_l(t),hl(t,dl())?new Proxy(t,Jn):t)}function be(t){if(t instanceof IDBRequest)return pl(t);if(On.has(t))return On.get(t);const e=yl(t);return e!==t&&(On.set(t,e),Ti.set(e,t)),e}const Ln=t=>Ti.get(t);function vl(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=be(o);return i&&o.addEventListener("upgradeneeded",l=>{i(be(o.result),l.oldVersion,l.newVersion,be(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Cl=["get","getKey","getAll","getAllKeys","count"],El=["put","add","delete","clear"],Fn=new Map;function Ss(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Fn.get(e))return Fn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=El.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Cl.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return Fn.set(e,r),r}ml(t=>({...t,get:(e,n,i)=>Ss(e,n)||t.get(e,n,i),has:(e,n)=>!!Ss(e,n)||t.has(e,n)}));/**
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
 */class wl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(bl(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function bl(t){return t.getComponent()?.type==="VERSION"}const Zn="@firebase/app",Ts="0.14.4";/**
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
 */const _e=new Or("@firebase/app"),Il="@firebase/app-compat",Sl="@firebase/analytics-compat",Tl="@firebase/analytics",Nl="@firebase/app-check-compat",Rl="@firebase/app-check",kl="@firebase/auth",Al="@firebase/auth-compat",Pl="@firebase/database",Dl="@firebase/data-connect",xl="@firebase/database-compat",Ml="@firebase/functions",Ol="@firebase/functions-compat",Ll="@firebase/installations",Fl="@firebase/installations-compat",Bl="@firebase/messaging",Ul="@firebase/messaging-compat",Wl="@firebase/performance",Hl="@firebase/performance-compat",Vl="@firebase/remote-config",$l="@firebase/remote-config-compat",Yl="@firebase/storage",Gl="@firebase/storage-compat",zl="@firebase/firestore",ql="@firebase/ai",jl="@firebase/firestore-compat",Kl="firebase",Ql="12.4.0";/**
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
 */const ei="[DEFAULT]",Xl={[Zn]:"fire-core",[Il]:"fire-core-compat",[Tl]:"fire-analytics",[Sl]:"fire-analytics-compat",[Rl]:"fire-app-check",[Nl]:"fire-app-check-compat",[kl]:"fire-auth",[Al]:"fire-auth-compat",[Pl]:"fire-rtdb",[Dl]:"fire-data-connect",[xl]:"fire-rtdb-compat",[Ml]:"fire-fn",[Ol]:"fire-fn-compat",[Ll]:"fire-iid",[Fl]:"fire-iid-compat",[Bl]:"fire-fcm",[Ul]:"fire-fcm-compat",[Wl]:"fire-perf",[Hl]:"fire-perf-compat",[Vl]:"fire-rc",[$l]:"fire-rc-compat",[Yl]:"fire-gcs",[Gl]:"fire-gcs-compat",[zl]:"fire-fst",[jl]:"fire-fst-compat",[ql]:"fire-vertex","fire-js":"fire-js",[Kl]:"fire-js-all"};/**
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
 */const Zt=new Map,Jl=new Map,ti=new Map;function Ns(t,e){try{t.container.addComponent(e)}catch(n){_e.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function en(t){const e=t.name;if(ti.has(e))return _e.debug(`There were multiple attempts to register component ${e}.`),!1;ti.set(e,t);for(const n of Zt.values())Ns(n,t);for(const n of Jl.values())Ns(n,t);return!0}function Zl(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ec(t){return t==null?!1:t.settings!==void 0}/**
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
 */const tc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ie=new xr("app","Firebase",tc);/**
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
 */class nc{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new It("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ie.create("app-deleted",{appName:this._name})}}/**
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
 */const ic=Ql;function Br(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:ei,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Ie.create("bad-app-name",{appName:String(s)});if(n||(n=Pr()),!n)throw Ie.create("no-options");const r=Zt.get(s);if(r){if(Jt(n,r.options)&&Jt(i,r.config))return r;throw Ie.create("duplicate-app",{appName:s})}const o=new ol(s);for(const l of ti.values())o.addComponent(l);const a=new nc(n,i,o);return Zt.set(s,a),a}function sc(t=ei){const e=Zt.get(t);if(!e&&t===ei&&Pr())return Br();if(!e)throw Ie.create("no-app",{appName:t});return e}function ze(t,e,n){let i=Xl[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_e.warn(o.join(" "));return}en(new It(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const rc="firebase-heartbeat-database",oc=1,St="firebase-heartbeat-store";let Bn=null;function Ur(){return Bn||(Bn=vl(rc,oc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(St)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ie.create("idb-open",{originalErrorMessage:t.message})})),Bn}async function ac(t){try{const n=(await Ur()).transaction(St),i=await n.objectStore(St).get(Wr(t));return await n.done,i}catch(e){if(e instanceof Ot)_e.warn(e.message);else{const n=Ie.create("idb-get",{originalErrorMessage:e?.message});_e.warn(n.message)}}}async function Rs(t,e){try{const i=(await Ur()).transaction(St,"readwrite");await i.objectStore(St).put(e,Wr(t)),await i.done}catch(n){if(n instanceof Ot)_e.warn(n.message);else{const i=Ie.create("idb-set",{originalErrorMessage:n?.message});_e.warn(i.message)}}}function Wr(t){return`${t.name}!${t.options.appId}`}/**
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
 */const lc=1024,cc=30;class uc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new dc(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ks();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>cc){const s=fc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){_e.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ks(),{heartbeatsToSend:n,unsentEntries:i}=hc(this._heartbeatsCache.heartbeats),s=Qt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return _e.warn(e),""}}}function ks(){return new Date().toISOString().substring(0,10)}function hc(t,e=lc){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),As(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),As(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class dc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return qa()?ja().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await ac(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Rs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Rs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function As(t){return Qt(JSON.stringify({version:2,heartbeats:t})).length}function fc(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function pc(t){en(new It("platform-logger",e=>new wl(e),"PRIVATE")),en(new It("heartbeat",e=>new uc(e),"PRIVATE")),ze(Zn,Ts,t),ze(Zn,Ts,"esm2020"),ze("fire-js","")}pc("");var Ps={};const Ds="@firebase/database",xs="1.1.0";/**
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
 */let Hr="";function _c(t){Hr=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),B(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:bt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ae(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vr=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new mc(e)}}catch{}return new gc},Oe=Vr("localStorage"),yc=Vr("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new Or("@firebase/database"),vc=(function(){let t=1;return function(){return t++}})(),$r=function(t){const e=nl(t),n=new tl;n.update(e);const i=n.digest();return Ii.encodeByteArray(i)},Lt=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Lt.apply(null,i):typeof i=="object"?e+=B(i):e+=i,e+=" "}return e};let pt=null,Ms=!0;const Cc=function(t,e){f(!0,"Can't turn on custom loggers persistently."),qe.logLevel=R.VERBOSE,pt=qe.log.bind(qe)},H=function(...t){if(Ms===!0&&(Ms=!1,pt===null&&yc.get("logging_enabled")===!0&&Cc()),pt){const e=Lt.apply(null,t);pt(e)}},Ft=function(t){return function(...e){H(t,...e)}},ni=function(...t){const e="FIREBASE INTERNAL ERROR: "+Lt(...t);qe.error(e)},me=function(...t){const e=`FIREBASE FATAL ERROR: ${Lt(...t)}`;throw qe.error(e),new Error(e)},z=function(...t){const e="FIREBASE WARNING: "+Lt(...t);qe.warn(e)},Ec=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ni=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},wc=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Xe="[MIN_NAME]",Fe="[MAX_NAME]",Ve=function(t,e){if(t===e)return 0;if(t===Xe||e===Fe)return-1;if(e===Xe||t===Fe)return 1;{const n=Os(t),i=Os(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},bc=function(t,e){return t===e?0:t<e?-1:1},lt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+B(e))},Ri=function(t){if(typeof t!="object"||t===null)return B(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=B(e[i]),n+=":",n+=Ri(t[e[i]]);return n+="}",n},Yr=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function $(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Gr=function(t){f(!Ni(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let u=parseInt(d.substr(l,8),2).toString(16);u.length===1&&(u="0"+u),h=h+u}return h.toLowerCase()},Ic=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Sc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Tc(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Nc=new RegExp("^-?(0*)\\d{1,10}$"),Rc=-2147483648,kc=2147483647,Os=function(t){if(Nc.test(t)){const e=Number(t);if(e>=Rc&&e<=kc)return e}return null},rt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw z("Exception was thrown by user callback.",n),e},Math.floor(0))}},Ac=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},_t=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Pc{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,ec(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){z(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(H("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',z(e)}}class qt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}qt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki="5",zr="v",qr="s",jr="r",Kr="f",Qr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Xr="ls",Jr="p",ii="ac",Zr="websocket",eo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Oe.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Oe.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function xc(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function no(t,e,n){f(typeof e=="string","typeof type must == string"),f(typeof n=="object","typeof params must == object");let i;if(e===Zr)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===eo)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);xc(t)&&(n.ns=t.namespace);const s=[];return $(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(){this.counters_={}}incrementCounter(e,n=1){ae(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Pa(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un={},Wn={};function Ai(t){const e=t.toString();return Un[e]||(Un[e]=new Mc),Un[e]}function Oc(t,e){const n=t.toString();return Wn[n]||(Wn[n]=e()),Wn[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&rt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls="start",Fc="close",Bc="pLPCommand",Uc="pRTLPCB",io="id",so="pw",ro="ser",Wc="cb",Hc="seg",Vc="ts",$c="d",Yc="dframe",oo=1870,ao=30,Gc=oo-ao,zc=25e3,qc=3e4;class Ge{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ft(e),this.stats_=Ai(n),this.urlFn=l=>(this.appCheckToken&&(l[ii]=this.appCheckToken),no(n,eo,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Lc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(qc)),wc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Pi((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ls)this.id=a,this.password=l;else if(o===Fc)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ls]="t",i[ro]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Wc]=this.scriptTagHolder.uniqueCallbackIdentifier),i[zr]=ki,this.transportSessionId&&(i[qr]=this.transportSessionId),this.lastSessionId&&(i[Xr]=this.lastSessionId),this.applicationId&&(i[Jr]=this.applicationId),this.appCheckToken&&(i[ii]=this.appCheckToken),typeof location<"u"&&location.hostname&&Qr.test(location.hostname)&&(i[jr]=Kr);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ge.forceAllow_=!0}static forceDisallow(){Ge.forceDisallow_=!0}static isAvailable(){return Ge.forceAllow_?!0:!Ge.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ic()&&!Sc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=B(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Rr(n),s=Yr(i,Gc);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[Yc]="t",i[io]=e,i[so]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=B(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Pi{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=vc(),window[Bc+this.uniqueCallbackIdentifier]=e,window[Uc+this.uniqueCallbackIdentifier]=n,this.myIFrame=Pi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){H("frame writing exception"),a.stack&&H(a.stack),H(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||H("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[io]=this.myID,e[so]=this.myPW,e[ro]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ao+i.length<=oo;){const o=this.pendingSegs.shift();i=i+"&"+Hc+s+"="+o.seg+"&"+Vc+s+"="+o.ts+"&"+$c+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(zc)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{H("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jc=16384,Kc=45e3;let tn=null;typeof MozWebSocket<"u"?tn=MozWebSocket:typeof WebSocket<"u"&&(tn=WebSocket);class ne{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ft(this.connId),this.stats_=Ai(n),this.connURL=ne.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[zr]=ki,typeof location<"u"&&location.hostname&&Qr.test(location.hostname)&&(o[jr]=Kr),n&&(o[qr]=n),i&&(o[Xr]=i),s&&(o[ii]=s),r&&(o[Jr]=r),no(e,Zr,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Oe.set("previous_websocket_failure",!0);try{let i;za(),this.mySock=new tn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ne.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&tn!==null&&!ne.forceDisallow_}static previouslyFailed(){return Oe.isInMemoryStorage||Oe.get("previous_websocket_failure")===!0}markConnectionHealthy(){Oe.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=bt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=B(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Yr(n,jc);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Kc))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ne.responsesRequiredToBeHealthy=2;ne.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{static get ALL_TRANSPORTS(){return[Ge,ne]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ne&&ne.isAvailable();let i=n&&!ne.previouslyFailed();if(e.webSocketOnly&&(n||z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ne];else{const s=this.transports_=[];for(const r of Tt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Tt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Tt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc=6e4,Xc=5e3,Jc=10*1024,Zc=100*1024,Hn="t",Fs="d",eu="s",Bs="r",tu="e",Us="o",Ws="a",Hs="n",Vs="p",nu="h";class iu{constructor(e,n,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ft("c:"+this.id+":"),this.transportManager_=new Tt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=_t(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Zc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Jc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Hn in e){const n=e[Hn];n===Ws?this.upgradeIfSecondaryHealthy_():n===Bs?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Us&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=lt("t",e),i=lt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Vs,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ws,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Hs,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=lt("t",e),i=lt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=lt(Hn,e);if(Fs in e){const i=e[Fs];if(n===nu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Hs){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===eu?this.onConnectionShutdown_(i):n===Bs?this.onReset_(i):n===tu?ni("Server Error: "+i):n===Us?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ni("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),ki!==i&&z("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),_t(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Qc))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):_t(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Xc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Vs,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Oe.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends co{static getInstance(){return new nn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Dr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $s=32,Ys=768;class I{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function w(){return new I("")}function y(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Re(t){return t.pieces_.length-t.pieceNum_}function k(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new I(t.pieces_,e)}function Di(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function su(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Nt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function uo(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new I(e,0)}function x(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new I(n,0)}function C(t){return t.pieceNum_>=t.pieces_.length}function G(t,e){const n=y(t),i=y(e);if(n===null)return e;if(n===i)return G(k(t),k(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ru(t,e){const n=Nt(t,0),i=Nt(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Ve(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function xi(t,e){if(Re(t)!==Re(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function X(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Re(t)>Re(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class ou{constructor(e,n){this.errorPrefix_=n,this.parts_=Nt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=vn(this.parts_[i]);ho(this)}}function au(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=vn(e),ho(t)}function lu(t){const e=t.parts_.pop();t.byteLength_-=vn(e),t.parts_.length>0&&(t.byteLength_-=1)}function ho(t){if(t.byteLength_>Ys)throw new Error(t.errorPrefix_+"has a key path longer than "+Ys+" bytes ("+t.byteLength_+").");if(t.parts_.length>$s)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+$s+") or object contains a cycle "+xe(t))}function xe(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi extends co{static getInstance(){return new Mi}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=1e3,cu=300*1e3,Gs=30*1e3,uu=1.3,hu=3e4,du="server_kill",zs=3;class fe extends lo{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=fe.nextPersistentConnectionId_++,this.log_=Ft("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ct,this.maxReconnectDelay_=cu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Mi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&nn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(B(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Mt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;fe.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ae(e,"w")){const i=Qe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();z(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Za(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Gs)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Ja(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+B(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ni("Unrecognized action received from server: "+B(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ct,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ct,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>hu&&(this.reconnectDelay_=ct),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*uu)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+fe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,u]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?H("getToken() completed but was canceled"):(H("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=u&&u.token,a=new iu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,p=>{z(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(du)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&z(h),l())}}}interrupt(e){H("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){H("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Es(this.interruptReasons_)&&(this.reconnectDelay_=ct,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Ri(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){H("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=zs&&(this.reconnectDelay_=Gs,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){H("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=zs&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Hr.replace(/\./g,"-")]=1,Dr()?e["framework.cordova"]=1:Ga()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=nn.getInstance().currentlyOnline();return Es(this.interruptReasons_)&&e}}fe.nextPersistentConnectionId_=0;fe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new v(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new v(Xe,e),s=new v(Xe,n);return this.compare(i,s)!==0}minPost(){return v.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yt;class fo extends Cn{static get __EMPTY_NODE(){return Yt}static set __EMPTY_NODE(e){Yt=e}compare(e,n){return Ve(e.name,n.name)}isDefinedOn(e){throw st("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return v.MIN}maxPost(){return new v(Fe,Yt)}makePost(e,n){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new v(e,Yt)}toString(){return".key"}}const je=new fo;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class W{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??W.RED,this.left=s??Q.EMPTY_NODE,this.right=r??Q.EMPTY_NODE}copy(e,n,i,s,r){return new W(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return Q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,W.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,W.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}W.RED=!0;W.BLACK=!1;class fu{copy(e,n,i,s,r){return this}insert(e,n,i){return new W(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Q{constructor(e,n=Q.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Q(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,W.BLACK,null,null))}remove(e){return new Q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,W.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Gt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Gt(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Gt(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Gt(this.root_,null,this.comparator_,!0,e)}}Q.EMPTY_NODE=new fu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(t,e){return Ve(t.name,e.name)}function Oi(t,e){return Ve(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let si;function _u(t){si=t}const po=function(t){return typeof t=="number"?"number:"+Gr(t):"string:"+t},_o=function(t){if(t.isLeafNode()){const e=t.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ae(e,".sv"),"Priority must be a string or number.")}else f(t===si||t.isEmpty(),"priority of unexpected type.");f(t===si||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qs;class U{static set __childrenNodeConstructor(e){qs=e}static get __childrenNodeConstructor(){return qs}constructor(e,n=U.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),_o(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new U(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:U.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:y(e)===".priority"?this.priorityNode_:U.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:U.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=y(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||Re(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,U.__childrenNodeConstructor.EMPTY_NODE.updateChild(k(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+po(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Gr(this.value_):e+=this.value_,this.lazyHash_=$r(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===U.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof U.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=U.VALUE_TYPE_ORDER.indexOf(n),r=U.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+n),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}U.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mo,go;function mu(t){mo=t}function gu(t){go=t}class yu extends Cn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Ve(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return v.MIN}maxPost(){return new v(Fe,new U("[PRIORITY-POST]",go))}makePost(e,n){const i=mo(e);return new v(n,new U("[PRIORITY-POST]",i))}toString(){return".priority"}}const M=new yu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=Math.log(2);class Cu{constructor(e){const n=r=>parseInt(Math.log(r)/vu,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const sn=function(t,e,n,i){t.sort(e);const s=function(l,c){const d=c-l;let h,u;if(d===0)return null;if(d===1)return h=t[l],u=n?n(h):h,new W(u,h.node,W.BLACK,null,null);{const p=parseInt(d/2,10)+l,_=s(l,p),E=s(p+1,c);return h=t[p],u=n?n(h):h,new W(u,h.node,W.BLACK,_,E)}},r=function(l){let c=null,d=null,h=t.length;const u=function(_,E){const g=h-_,L=h;h-=_;const ce=s(g+1,L),Pe=t[g],Mn=n?n(Pe):Pe;p(new W(Mn,Pe.node,E,null,ce))},p=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const E=l.nextBitIsOne(),g=Math.pow(2,l.count-(_+1));E?u(g,W.BLACK):(u(g,W.BLACK),u(g,W.RED))}return d},o=new Cu(t.length),a=r(o);return new Q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vn;const Ye={};class he{static get Default(){return f(Ye&&M,"ChildrenNode.ts has not been loaded"),Vn=Vn||new he({".priority":Ye},{".priority":M}),Vn}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Qe(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Q?n:null}hasIndex(e){return ae(this.indexSet_,e.toString())}addIndex(e,n){f(e!==je,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(v.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=sn(i,e.getCompare()):a=Ye;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new he(d,c)}addToIndexes(e,n){const i=Xt(this.indexes_,(s,r)=>{const o=Qe(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===Ye)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(v.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),sn(a,o.getCompare())}else return Ye;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new v(e.name,a))),l.insert(e,e.node)}});return new he(i,this.indexSet_)}removeFromIndexes(e,n){const i=Xt(this.indexes_,s=>{if(s===Ye)return s;{const r=n.get(e.name);return r?s.remove(new v(e.name,r)):s}});return new he(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ut;class m{static get EMPTY_NODE(){return ut||(ut=new m(new Q(Oi),null,he.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&_o(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ut}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?ut:n}}getChild(e){const n=y(e);return n===null?this:this.getImmediateChild(n).getChild(k(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(f(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new v(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?ut:this.priorityNode_;return new m(s,o,r)}}updateChild(e,n){const i=y(e);if(i===null)return n;{f(y(e)!==".priority"||Re(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(k(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(M,(o,a)=>{n[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+po(this.getPriority().val())+":"),this.forEachChild(M,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":$r(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new v(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new v(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new v(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,v.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,v.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Bt?-1:0}withIndex(e){if(e===je||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===je||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(M),s=n.getIterator(M);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===je?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Eu extends m{constructor(){super(new Q(Oi),m.EMPTY_NODE,he.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const Bt=new Eu;Object.defineProperties(v,{MIN:{value:new v(Xe,m.EMPTY_NODE)},MAX:{value:new v(Fe,Bt)}});fo.__EMPTY_NODE=m.EMPTY_NODE;U.__childrenNodeConstructor=m;_u(Bt);gu(Bt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wu=!0;function F(t,e=null){if(t===null)return m.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new U(n,F(e))}if(!(t instanceof Array)&&wu){const n=[];let i=!1;if($(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=F(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new v(o,l)))}}),n.length===0)return m.EMPTY_NODE;const r=sn(n,pu,o=>o.name,Oi);if(i){const o=sn(n,M.getCompare());return new m(r,F(e),new he({".priority":o},{".priority":M}))}else return new m(r,F(e),he.Default)}else{let n=m.EMPTY_NODE;return $(t,(i,s)=>{if(ae(t,i)&&i.substring(0,1)!=="."){const r=F(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(F(e))}}mu(F);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bu extends Cn{constructor(e){super(),this.indexPath_=e,f(!C(e)&&y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Ve(e.name,n.name):r}makePost(e,n){const i=F(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new v(n,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,Bt);return new v(Fe,e)}toString(){return Nt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu extends Cn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Ve(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return v.MIN}maxPost(){return v.MAX}makePost(e,n){const i=F(e);return new v(n,i)}toString(){return".value"}}const Su=new Iu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yo(t){return{type:"value",snapshotNode:t}}function Je(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Rt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function kt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Tu(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Rt(n,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Je(n,i)):o.trackChildChange(kt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(M,(s,r)=>{n.hasChild(s)||i.trackChildChange(Rt(s,r))}),n.isLeafNode()||n.forEachChild(M,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(kt(s,r,o))}else i.trackChildChange(Je(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e){this.indexedFilter_=new Li(e.getIndex()),this.index_=e.getIndex(),this.startPost_=At.getStartPost_(e),this.endPost_=At.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new v(n,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=m.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return n.forEachChild(M,(o,a)=>{r.matches(new v(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new At(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new v(n,i))||(i=m.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(u,p)=>h(p,u)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new v(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let u=s.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===n||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const p=u==null?1:o(u,l);if(d&&!i.isEmpty()&&p>=0)return r?.trackChildChange(kt(n,i,h)),a.updateImmediateChild(n,i);{r?.trackChildChange(Rt(n,h));const E=a.updateImmediateChild(n,m.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(Je(u.name,u.node)),E.updateImmediateChild(u.name,u.node)):E}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Rt(c.name,c.node)),r.trackChildChange(Je(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=M}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Xe}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Fe}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===M}copy(){const e=new Fi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ru(t){return t.loadsAllData()?new Li(t.getIndex()):t.hasLimit()?new Nu(t):new At(t)}function js(t){const e={};if(t.isDefault())return e;let n;if(t.index_===M?n="$priority":t.index_===Su?n="$value":t.index_===je?n="$key":(f(t.index_ instanceof bu,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=B(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=B(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+B(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=B(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+B(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Ks(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==M&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends lo{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Ft("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=rn.getListenId_(e,i),a={};this.listens_[o]=a;const l=js(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),Qe(this.listens_,o)===a){let u;c?c===401?u="permission_denied":u="rest_error:"+c:u="ok",s(u,null)}})}unlisten(e,n){const i=rn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=js(e._queryParams),i=e._path.toString(),s=new Mt;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+el(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=bt(a.responseText)}catch{z("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&z("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ku{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(){return{value:null,children:new Map}}function vo(t,e,n){if(C(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=y(e);t.children.has(i)||t.children.set(i,on());const s=t.children.get(i);e=k(e),vo(s,e,n)}}function ri(t,e,n){t.value!==null?n(e,t.value):Au(t,(i,s)=>{const r=new I(e.toString()+"/"+i);ri(s,r,n)})}function Au(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&$(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qs=10*1e3,Du=30*1e3,xu=300*1e3;class Mu{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Pu(e);const i=Qs+(Du-Qs)*Math.random();_t(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;$(e,(s,r)=>{r>0&&ae(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),_t(this.reportStats_.bind(this),Math.floor(Math.random()*2*xu))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ie;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ie||(ie={}));function Bi(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ui(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Wi(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=ie.ACK_USER_WRITE,this.source=Bi()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new I(e));return new an(w(),n,this.revert)}}else return f(y(this.path)===e,"operationForChild called for unrelated child."),new an(k(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,n){this.source=e,this.path=n,this.type=ie.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new Pt(this.source,w()):new Pt(this.source,k(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=ie.OVERWRITE}operationForChild(e){return C(this.path)?new Be(this.source,w(),this.snap.getImmediateChild(e)):new Be(this.source,k(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=ie.MERGE}operationForChild(e){if(C(this.path)){const n=this.children.subtree(new I(e));return n.isEmpty()?null:n.value?new Be(this.source,w(),n.value):new Ze(this.source,w(),n)}else return f(y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ze(this.source,k(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const n=y(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Lu(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Tu(o.childName,o.snapshotNode))}),ht(t,s,"child_removed",e,i,n),ht(t,s,"child_added",e,i,n),ht(t,s,"child_moved",r,i,n),ht(t,s,"child_changed",e,i,n),ht(t,s,"value",e,i,n),s}function ht(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>Bu(t,a,l)),o.forEach(a=>{const l=Fu(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Fu(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Bu(t,e,n){if(e.childName==null||n.childName==null)throw st("Should only compare child_ events.");const i=new v(e.childName,e.snapshotNode),s=new v(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function En(t,e){return{eventCache:t,serverCache:e}}function mt(t,e,n,i){return En(new ke(e,n,i),t.serverCache)}function Co(t,e,n,i){return En(t.eventCache,new ke(e,n,i))}function ln(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Ue(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $n;const Uu=()=>($n||($n=new Q(bc)),$n);class N{static fromObject(e){let n=new N(null);return $(e,(i,s)=>{n=n.set(new I(i),s)}),n}constructor(e,n=Uu()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:w(),value:this.value};if(C(e))return null;{const i=y(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(k(e),n);return r!=null?{path:x(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const n=y(e),i=this.children.get(n);return i!==null?i.subtree(k(e)):new N(null)}}set(e,n){if(C(e))return new N(n,this.children);{const i=y(e),r=(this.children.get(i)||new N(null)).set(k(e),n),o=this.children.insert(i,r);return new N(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new N(null):new N(null,this.children);{const n=y(e),i=this.children.get(n);if(i){const s=i.remove(k(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new N(null):new N(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const n=y(e),i=this.children.get(n);return i?i.get(k(e)):null}}setTree(e,n){if(C(e))return n;{const i=y(e),r=(this.children.get(i)||new N(null)).setTree(k(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new N(this.value,o)}}fold(e){return this.fold_(w(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(x(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,w(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(C(e))return null;{const r=y(e),o=this.children.get(r);return o?o.findOnPath_(k(e),x(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,w(),n)}foreachOnPath_(e,n,i){if(C(e))return this;{this.value&&i(n,this.value);const s=y(e),r=this.children.get(s);return r?r.foreachOnPath_(k(e),x(n,s),i):new N(null)}}foreach(e){this.foreach_(w(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(x(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.writeTree_=e}static empty(){return new se(new N(null))}}function gt(t,e,n){if(C(e))return new se(new N(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=G(s,e);return r=r.updateChild(o,n),new se(t.writeTree_.set(s,r))}else{const s=new N(n),r=t.writeTree_.setTree(e,s);return new se(r)}}}function oi(t,e,n){let i=t;return $(n,(s,r)=>{i=gt(i,x(e,s),r)}),i}function Xs(t,e){if(C(e))return se.empty();{const n=t.writeTree_.setTree(e,new N(null));return new se(n)}}function ai(t,e){return $e(t,e)!=null}function $e(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(G(n.path,e)):null}function Js(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(M,(i,s)=>{e.push(new v(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new v(i,s.value))}),e}function Se(t,e){if(C(e))return t;{const n=$e(t,e);return n!=null?new se(new N(n)):new se(t.writeTree_.subtree(e))}}function li(t){return t.writeTree_.isEmpty()}function et(t,e){return Eo(w(),t.writeTree_,e)}function Eo(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Eo(x(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(x(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(t,e){return So(e,t)}function Wu(t,e,n,i,s){f(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=gt(t.visibleWrites,e,n)),t.lastWriteId=i}function Hu(t,e,n,i){f(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=oi(t.visibleWrites,e,n),t.lastWriteId=i}function Vu(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function $u(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);f(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Yu(a,i.path)?s=!1:X(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Gu(t),!0;if(i.snap)t.visibleWrites=Xs(t.visibleWrites,i.path);else{const a=i.children;$(a,l=>{t.visibleWrites=Xs(t.visibleWrites,x(i.path,l))})}return!0}else return!1}function Yu(t,e){if(t.snap)return X(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&X(x(t.path,n),e))return!0;return!1}function Gu(t){t.visibleWrites=wo(t.allWrites,zu,w()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function zu(t){return t.visible}function wo(t,e,n){let i=se.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)X(n,o)?(a=G(n,o),i=gt(i,a,r.snap)):X(o,n)&&(a=G(o,n),i=gt(i,w(),r.snap.getChild(a)));else if(r.children){if(X(n,o))a=G(n,o),i=oi(i,a,r.children);else if(X(o,n))if(a=G(o,n),C(a))i=oi(i,w(),r.children);else{const l=Qe(r.children,y(a));if(l){const c=l.getChild(k(a));i=gt(i,w(),c)}}}else throw st("WriteRecord should have .snap or .children")}}return i}function bo(t,e,n,i,s){if(!i&&!s){const r=$e(t.visibleWrites,e);if(r!=null)return r;{const o=Se(t.visibleWrites,e);if(li(o))return n;if(n==null&&!ai(o,w()))return null;{const a=n||m.EMPTY_NODE;return et(o,a)}}}else{const r=Se(t.visibleWrites,e);if(!s&&li(r))return n;if(!s&&n==null&&!ai(r,w()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(X(c.path,e)||X(e,c.path))},a=wo(t.allWrites,o,e),l=n||m.EMPTY_NODE;return et(a,l)}}}function qu(t,e,n){let i=m.EMPTY_NODE;const s=$e(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(M,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Se(t.visibleWrites,e);return n.forEachChild(M,(o,a)=>{const l=et(Se(r,new I(o)),a);i=i.updateImmediateChild(o,l)}),Js(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Se(t.visibleWrites,e);return Js(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function ju(t,e,n,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=x(e,n);if(ai(t.visibleWrites,r))return null;{const o=Se(t.visibleWrites,r);return li(o)?s.getChild(n):et(o,s.getChild(n))}}function Ku(t,e,n,i){const s=x(e,n),r=$e(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Se(t.visibleWrites,s);return et(o,i.getNode().getImmediateChild(n))}else return null}function Qu(t,e){return $e(t.visibleWrites,e)}function Xu(t,e,n,i,s,r,o){let a;const l=Se(t.visibleWrites,e),c=$e(l,w());if(c!=null)a=c;else if(n!=null)a=et(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=u.getNext();for(;p&&d.length<s;)h(p,i)!==0&&d.push(p),p=u.getNext();return d}else return[]}function Ju(){return{visibleWrites:se.empty(),allWrites:[],lastWriteId:-1}}function cn(t,e,n,i){return bo(t.writeTree,t.treePath,e,n,i)}function Hi(t,e){return qu(t.writeTree,t.treePath,e)}function Zs(t,e,n,i){return ju(t.writeTree,t.treePath,e,n,i)}function un(t,e){return Qu(t.writeTree,x(t.treePath,e))}function Zu(t,e,n,i,s,r){return Xu(t.writeTree,t.treePath,e,n,i,s,r)}function Vi(t,e,n){return Ku(t.writeTree,t.treePath,e,n)}function Io(t,e){return So(x(t.treePath,e),t.writeTree)}function So(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;f(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,kt(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Rt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Je(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,kt(i,e.snapshotNode,s.oldSnap));else throw st("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const To=new th;class $i{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new ke(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Vi(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ue(this.viewCache_),r=Zu(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(t){return{filter:t}}function ih(t,e){f(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function sh(t,e,n,i,s){const r=new eh;let o,a;if(n.type===ie.OVERWRITE){const c=n;c.source.fromUser?o=ci(t,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=hn(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===ie.MERGE){const c=n;c.source.fromUser?o=oh(t,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=ui(t,e,c.path,c.children,i,s,a,r))}else if(n.type===ie.ACK_USER_WRITE){const c=n;c.revert?o=ch(t,e,c.path,i,s,r):o=ah(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===ie.LISTEN_COMPLETE)o=lh(t,e,n.path,i,r);else throw st("Unknown operation type: "+n.type);const l=r.getChanges();return rh(e,o,l),{viewCache:o,changes:l}}function rh(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=ln(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(yo(ln(e)))}}function No(t,e,n,i,s,r){const o=e.eventCache;if(un(i,n)!=null)return e;{let a,l;if(C(n))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ue(e),d=c instanceof m?c:m.EMPTY_NODE,h=Hi(i,d);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=cn(i,Ue(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=y(n);if(c===".priority"){f(Re(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=Zs(i,n,d,l);h!=null?a=t.filter.updatePriority(d,h):a=o.getNode()}else{const d=k(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const u=Zs(i,n,o.getNode(),l);u!=null?h=o.getNode().getImmediateChild(c).updateChild(d,u):h=o.getNode().getImmediateChild(c)}else h=Vi(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,d,s,r):a=o.getNode()}}return mt(e,a,o.isFullyInitialized()||C(n),t.filter.filtersNodes())}}function hn(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(C(n))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(n,i);c=d.updateFullNode(l.getNode(),p,null)}else{const p=y(n);if(!l.isCompleteForPath(n)&&Re(n)>1)return e;const _=k(n),g=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=d.updatePriority(l.getNode(),g):c=d.updateChild(l.getNode(),p,g,_,To,null)}const h=Co(e,c,l.isFullyInitialized()||C(n),d.filtersNodes()),u=new $i(s,h,r);return No(t,h,n,s,u,a)}function ci(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const d=new $i(s,e,r);if(C(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=mt(e,c,!0,t.filter.filtersNodes());else{const h=y(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=mt(e,c,a.isFullyInitialized(),a.isFiltered());else{const u=k(n),p=a.getNode().getImmediateChild(h);let _;if(C(u))_=i;else{const E=d.getCompleteChild(h);E!=null?Di(u)===".priority"&&E.getChild(uo(u)).isEmpty()?_=E:_=E.updateChild(u,i):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const E=t.filter.updateChild(a.getNode(),h,_,u,d,o);l=mt(e,E,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function er(t,e){return t.eventCache.isCompleteForChild(e)}function oh(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=x(n,l);er(e,y(d))&&(a=ci(t,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=x(n,l);er(e,y(d))||(a=ci(t,a,d,c,s,r,o))}),a}function tr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function ui(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(n)?c=i:c=new N(null).setTree(n,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,u)=>{if(d.hasChild(h)){const p=e.serverCache.getNode().getImmediateChild(h),_=tr(t,p,u);l=hn(t,l,new I(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,u)=>{const p=!e.serverCache.isCompleteForChild(h)&&u.value===null;if(!d.hasChild(h)&&!p){const _=e.serverCache.getNode().getImmediateChild(h),E=tr(t,_,u);l=hn(t,l,new I(h),E,s,r,o,a)}}),l}function ah(t,e,n,i,s,r,o){if(un(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(C(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return hn(t,e,n,l.getNode().getChild(n),s,r,a,o);if(C(n)){let c=new N(null);return l.getNode().forEachChild(je,(d,h)=>{c=c.set(new I(d),h)}),ui(t,e,n,c,s,r,a,o)}else return e}else{let c=new N(null);return i.foreach((d,h)=>{const u=x(n,d);l.isCompleteForPath(u)&&(c=c.set(d,l.getNode().getChild(u)))}),ui(t,e,n,c,s,r,a,o)}}function lh(t,e,n,i,s){const r=e.serverCache,o=Co(e,r.getNode(),r.isFullyInitialized()||C(n),r.isFiltered());return No(t,o,n,i,To,s)}function ch(t,e,n,i,s,r){let o;if(un(i,n)!=null)return e;{const a=new $i(i,e,s),l=e.eventCache.getNode();let c;if(C(n)||y(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=cn(i,Ue(e));else{const h=e.serverCache.getNode();f(h instanceof m,"serverChildren would be complete if leaf node"),d=Hi(i,h)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=y(n);let h=Vi(i,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=t.filter.updateChild(l,d,h,k(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,m.EMPTY_NODE,k(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=cn(i,Ue(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||un(i,w())!=null,mt(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Li(i.getIndex()),r=Ru(i);this.processor_=nh(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new ke(l,o.isFullyInitialized(),s.filtersNodes()),h=new ke(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=En(h,d),this.eventGenerator_=new Ou(this.query_)}get query(){return this.query_}}function hh(t){return t.viewCache_.serverCache.getNode()}function dh(t){return ln(t.viewCache_)}function fh(t,e){const n=Ue(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!C(e)&&!n.getImmediateChild(y(e)).isEmpty())?n.getChild(e):null}function nr(t){return t.eventRegistrations_.length===0}function ph(t,e){t.eventRegistrations_.push(e)}function ir(t,e,n){const i=[];if(n){f(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function sr(t,e,n,i){e.type===ie.MERGE&&e.source.queryId!==null&&(f(Ue(t.viewCache_),"We should always have a full cache before handling merges"),f(ln(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=sh(t.processor_,s,e,n,i);return ih(t.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Ro(t,r.changes,r.viewCache.eventCache.getNode(),null)}function _h(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(M,(r,o)=>{i.push(Je(r,o))}),n.isFullyInitialized()&&i.push(yo(n.getNode())),Ro(t,i,n.getNode(),e)}function Ro(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Lu(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dn;class ko{constructor(){this.views=new Map}}function mh(t){f(!dn,"__referenceConstructor has already been defined"),dn=t}function gh(){return f(dn,"Reference.ts has not been loaded"),dn}function yh(t){return t.views.size===0}function Yi(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),sr(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(sr(o,e,n,i));return r}}function Ao(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=cn(n,s?i:null),l=!1;a?l=!0:i instanceof m?(a=Hi(n,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=En(new ke(a,l,!1),new ke(i,s,!1));return new uh(e,c)}return o}function vh(t,e,n,i,s,r){const o=Ao(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),ph(o,n),_h(o,n)}function Ch(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=Ae(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(ir(c,n,i)),nr(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(ir(l,n,i)),nr(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Ae(t)&&r.push(new(gh())(e._repo,e._path)),{removed:r,events:o}}function Po(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Te(t,e){let n=null;for(const i of t.views.values())n=n||fh(i,e);return n}function Do(t,e){if(e._queryParams.loadsAllData())return bn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function xo(t,e){return Do(t,e)!=null}function Ae(t){return bn(t)!=null}function bn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fn;function Eh(t){f(!fn,"__referenceConstructor has already been defined"),fn=t}function wh(){return f(fn,"Reference.ts has not been loaded"),fn}let bh=1;class rr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new N(null),this.pendingWriteTree_=Ju(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Mo(t,e,n,i,s){return Wu(t.pendingWriteTree_,e,n,i,s),s?ot(t,new Be(Bi(),e,n)):[]}function Ih(t,e,n,i){Hu(t.pendingWriteTree_,e,n,i);const s=N.fromObject(n);return ot(t,new Ze(Bi(),e,s))}function ve(t,e,n=!1){const i=Vu(t.pendingWriteTree_,e);if($u(t.pendingWriteTree_,e)){let r=new N(null);return i.snap!=null?r=r.set(w(),!0):$(i.children,o=>{r=r.set(new I(o),!0)}),ot(t,new an(i.path,r,n))}else return[]}function Ut(t,e,n){return ot(t,new Be(Ui(),e,n))}function Sh(t,e,n){const i=N.fromObject(n);return ot(t,new Ze(Ui(),e,i))}function Th(t,e){return ot(t,new Pt(Ui(),e))}function Nh(t,e,n){const i=zi(t,n);if(i){const s=qi(i),r=s.path,o=s.queryId,a=G(r,e),l=new Pt(Wi(o),a);return ji(t,r,l)}else return[]}function pn(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||xo(o,e))){const l=Ch(o,e,n,i);yh(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(u=>u._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(u,p)=>Ae(p));if(d&&!h){const u=t.syncPointTree_.subtree(r);if(!u.isEmpty()){const p=Ah(u);for(let _=0;_<p.length;++_){const E=p[_],g=E.query,L=Bo(t,E);t.listenProvider_.startListening(yt(g),Dt(t,g),L.hashFn,L.onComplete)}}}!h&&c.length>0&&!i&&(d?t.listenProvider_.stopListening(yt(e),null):c.forEach(u=>{const p=t.queryToTagMap.get(In(u));t.listenProvider_.stopListening(yt(u),p)}))}Ph(t,c)}return a}function Oo(t,e,n,i){const s=zi(t,i);if(s!=null){const r=qi(s),o=r.path,a=r.queryId,l=G(o,e),c=new Be(Wi(a),l,n);return ji(t,o,c)}else return[]}function Rh(t,e,n,i){const s=zi(t,i);if(s){const r=qi(s),o=r.path,a=r.queryId,l=G(o,e),c=N.fromObject(n),d=new Ze(Wi(a),l,c);return ji(t,o,d)}else return[]}function hi(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(u,p)=>{const _=G(u,s);r=r||Te(p,_),o=o||Ae(p)});let a=t.syncPointTree_.get(s);a?(o=o||Ae(a),r=r||Te(a,w())):(a=new ko,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((p,_)=>{const E=Te(_,w());E&&(r=r.updateImmediateChild(p,E))}));const c=xo(a,e);if(!c&&!e._queryParams.loadsAllData()){const u=In(e);f(!t.queryToTagMap.has(u),"View does not exist, but we have a tag");const p=Dh();t.queryToTagMap.set(u,p),t.tagToQueryMap.set(p,u)}const d=wn(t.pendingWriteTree_,s);let h=vh(a,e,n,d,r,l);if(!c&&!o&&!i){const u=Do(a,e);h=h.concat(xh(t,e,u))}return h}function Gi(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=G(o,e),c=Te(a,l);if(c)return c});return bo(s,e,r,n,!0)}function kh(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const h=G(c,n);i=i||Te(d,h)});let s=t.syncPointTree_.get(n);s?i=i||Te(s,w()):(s=new ko,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new ke(i,!0,!1):null,a=wn(t.pendingWriteTree_,e._path),l=Ao(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return dh(l)}function ot(t,e){return Lo(e,t.syncPointTree_,null,wn(t.pendingWriteTree_,w()))}function Lo(t,e,n,i){if(C(t.path))return Fo(t,e,n,i);{const s=e.get(w());n==null&&s!=null&&(n=Te(s,w()));let r=[];const o=y(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=Io(i,o);r=r.concat(Lo(a,l,c,d))}return s&&(r=r.concat(Yi(s,t,i,n))),r}}function Fo(t,e,n,i){const s=e.get(w());n==null&&s!=null&&(n=Te(s,w()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Io(i,o),d=t.operationForChild(o);d&&(r=r.concat(Fo(d,a,l,c)))}),s&&(r=r.concat(Yi(s,t,i,n))),r}function Bo(t,e){const n=e.query,i=Dt(t,n);return{hashFn:()=>(hh(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Nh(t,n._path,i):Th(t,n._path);{const r=Tc(s,n);return pn(t,n,null,r)}}}}function Dt(t,e){const n=In(e);return t.queryToTagMap.get(n)}function In(t){return t._path.toString()+"$"+t._queryIdentifier}function zi(t,e){return t.tagToQueryMap.get(e)}function qi(t){const e=t.indexOf("$");return f(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new I(t.substr(0,e))}}function ji(t,e,n){const i=t.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=wn(t.pendingWriteTree_,e);return Yi(i,n,s,null)}function Ah(t){return t.fold((e,n,i)=>{if(n&&Ae(n))return[bn(n)];{let s=[];return n&&(s=Po(n)),$(i,(r,o)=>{s=s.concat(o)}),s}})}function yt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(wh())(t._repo,t._path):t}function Ph(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=In(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Dh(){return bh++}function xh(t,e,n){const i=e._path,s=Dt(t,e),r=Bo(t,n),o=t.listenProvider_.startListening(yt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)f(!Ae(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!C(c)&&d&&Ae(d))return[bn(d).query];{let u=[];return d&&(u=u.concat(Po(d).map(p=>p.query))),$(h,(p,_)=>{u=u.concat(_)}),u}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(yt(d),Dt(t,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Ki(n)}node(){return this.node_}}class Qi{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=x(this.path_,e);return new Qi(this.syncTree_,n)}node(){return Gi(this.syncTree_,this.path_)}}const Mh=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},or=function(t,e,n){if(!t||typeof t!="object")return t;if(f(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Oh(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Lh(t[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Oh=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:f(!1,"Unexpected server value: "+t)}},Lh=function(t,e,n){t.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Uo=function(t,e,n,i){return Xi(e,new Qi(n,t),i)},Wo=function(t,e,n){return Xi(t,new Ki(e),n)};function Xi(t,e,n){const i=t.getPriority().val(),s=or(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=or(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new U(a,F(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new U(s))),o.forEachChild(M,(a,l)=>{const c=Xi(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Zi(t,e){let n=e instanceof I?e:new I(e),i=t,s=y(n);for(;s!==null;){const r=Qe(i.node.children,s)||{children:{},childCount:0};i=new Ji(s,i,r),n=k(n),s=y(n)}return i}function at(t){return t.node.value}function Ho(t,e){t.node.value=e,di(t)}function Vo(t){return t.node.childCount>0}function Fh(t){return at(t)===void 0&&!Vo(t)}function Sn(t,e){$(t.node.children,(n,i)=>{e(new Ji(n,t,i))})}function $o(t,e,n,i){n&&e(t),Sn(t,s=>{$o(s,e,!0)})}function Bh(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Wt(t){return new I(t.parent===null?t.name:Wt(t.parent)+"/"+t.name)}function di(t){t.parent!==null&&Uh(t.parent,t.name,t)}function Uh(t,e,n){const i=Fh(n),s=ae(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,di(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,di(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh=/[\[\].#$\/\u0000-\u001F\u007F]/,Hh=/[\[\].#$\u0000-\u001F\u007F]/,Yn=10*1024*1024,es=function(t){return typeof t=="string"&&t.length!==0&&!Wh.test(t)},Yo=function(t){return typeof t=="string"&&t.length!==0&&!Hh.test(t)},Vh=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Yo(t)},$h=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ni(t)||t&&typeof t=="object"&&ae(t,".sv")},Go=function(t,e,n,i){i&&e===void 0||Tn(yn(t,"value"),e,n)},Tn=function(t,e,n){const i=n instanceof I?new ou(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+xe(i));if(typeof e=="function")throw new Error(t+"contains a function "+xe(i)+" with contents = "+e.toString());if(Ni(e))throw new Error(t+"contains "+e.toString()+" "+xe(i));if(typeof e=="string"&&e.length>Yn/3&&vn(e)>Yn)throw new Error(t+"contains a string greater than "+Yn+" utf8 bytes "+xe(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if($(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!es(o)))throw new Error(t+" contains an invalid key ("+o+") "+xe(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);au(i,o),Tn(t,a,i),lu(i)}),s&&r)throw new Error(t+' contains ".value" child '+xe(i)+" in addition to actual children.")}},Yh=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Nt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!es(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ru);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&X(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Gh=function(t,e,n,i){const s=yn(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];$(e,(o,a)=>{const l=new I(o);if(Tn(s,a,x(n,l)),Di(l)===".priority"&&!$h(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Yh(s,r)},zo=function(t,e,n,i){if(!Yo(n))throw new Error(yn(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},zh=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),zo(t,e,n)},ts=function(t,e){if(y(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},qh=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!es(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Vh(n))throw new Error(yn(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Nn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!xi(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function qo(t,e,n){Nn(t,n),jo(t,i=>xi(i,e))}function Z(t,e,n){Nn(t,n),jo(t,i=>X(i,e)||X(e,i))}function jo(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Kh(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Kh(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();pt&&H("event: "+n.toString()),rt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh="repo_interrupt",Xh=25;class Jh{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new jh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=on(),this.transactionQueueTree_=new Ji,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Zh(t,e,n){if(t.stats_=Ai(t.repoInfo_),t.forceRestClient_||Ac())t.server_=new rn(t.repoInfo_,(i,s,r,o)=>{ar(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>lr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{B(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new fe(t.repoInfo_,e,(i,s,r,o)=>{ar(t,i,s,r,o)},i=>{lr(t,i)},i=>{ed(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=Oc(t.repoInfo_,()=>new Mu(t.stats_,t.server_)),t.infoData_=new ku,t.infoSyncTree_=new rr({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=Ut(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ns(t,"connected",!1),t.serverSyncTree_=new rr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);Z(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Ko(t){const n=t.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Rn(t){return Mh({timestamp:Ko(t)})}function ar(t,e,n,i,s){t.dataUpdateCount++;const r=new I(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=Xt(n,c=>F(c));o=Rh(t.serverSyncTree_,r,l,s)}else{const l=F(n);o=Oo(t.serverSyncTree_,r,l,s)}else if(i){const l=Xt(n,c=>F(c));o=Sh(t.serverSyncTree_,r,l)}else{const l=F(n);o=Ut(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=tt(t,r)),Z(t.eventQueue_,a,o)}function lr(t,e){ns(t,"connected",e),e===!1&&sd(t)}function ed(t,e){$(e,(n,i)=>{ns(t,n,i)})}function ns(t,e,n){const i=new I("/.info/"+e),s=F(n);t.infoData_.updateSnapshot(i,s);const r=Ut(t.infoSyncTree_,i,s);Z(t.eventQueue_,i,r)}function is(t){return t.nextWriteId_++}function td(t,e,n){const i=kh(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=F(s).withIndex(e._queryParams.getIndex());hi(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Ut(t.serverSyncTree_,e._path,r);else{const a=Dt(t.serverSyncTree_,e);o=Oo(t.serverSyncTree_,e._path,r,a)}return Z(t.eventQueue_,e._path,o),pn(t.serverSyncTree_,e,n,null,!0),r},s=>(Ht(t,"get for query "+B(e)+" failed: "+s),Promise.reject(new Error(s))))}function nd(t,e,n,i,s){Ht(t,"set",{path:e.toString(),value:n,priority:i});const r=Rn(t),o=F(n,i),a=Gi(t.serverSyncTree_,e),l=Wo(o,a,r),c=is(t),d=Mo(t.serverSyncTree_,e,l,c,!0);Nn(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(u,p)=>{const _=u==="ok";_||z("set at "+e+" failed: "+u);const E=ve(t.serverSyncTree_,c,!_);Z(t.eventQueue_,e,E),fi(t,s,u,p)});const h=rs(t,e);tt(t,h),Z(t.eventQueue_,h,[])}function id(t,e,n,i){Ht(t,"update",{path:e.toString(),value:n});let s=!0;const r=Rn(t),o={};if($(n,(a,l)=>{s=!1,o[a]=Uo(x(e,a),F(l),t.serverSyncTree_,r)}),s)H("update() called with empty data.  Don't do anything."),fi(t,i,"ok",void 0);else{const a=is(t),l=Ih(t.serverSyncTree_,e,o,a);Nn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const h=c==="ok";h||z("update at "+e+" failed: "+c);const u=ve(t.serverSyncTree_,a,!h),p=u.length>0?tt(t,e):e;Z(t.eventQueue_,p,u),fi(t,i,c,d)}),$(n,c=>{const d=rs(t,x(e,c));tt(t,d)}),Z(t.eventQueue_,e,[])}}function sd(t){Ht(t,"onDisconnectEvents");const e=Rn(t),n=on();ri(t.onDisconnect_,w(),(s,r)=>{const o=Uo(s,r,t.serverSyncTree_,e);vo(n,s,o)});let i=[];ri(n,w(),(s,r)=>{i=i.concat(Ut(t.serverSyncTree_,s,r));const o=rs(t,s);tt(t,o)}),t.onDisconnect_=on(),Z(t.eventQueue_,w(),i)}function rd(t,e,n){let i;y(e._path)===".info"?i=hi(t.infoSyncTree_,e,n):i=hi(t.serverSyncTree_,e,n),qo(t.eventQueue_,e._path,i)}function Qo(t,e,n){let i;y(e._path)===".info"?i=pn(t.infoSyncTree_,e,n):i=pn(t.serverSyncTree_,e,n),qo(t.eventQueue_,e._path,i)}function od(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Qh)}function Ht(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),H(n,...e)}function fi(t,e,n,i){e&&rt(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Xo(t,e,n){return Gi(t.serverSyncTree_,e,n)||m.EMPTY_NODE}function ss(t,e=t.transactionQueueTree_){if(e||kn(t,e),at(e)){const n=Zo(t,e);f(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&ad(t,Wt(e),n)}else Vo(e)&&Sn(e,n=>{ss(t,n)})}function ad(t,e,n){const i=n.map(c=>c.currentWriteId),s=Xo(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const d=n[c];f(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=G(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Ht(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let u=0;u<n.length;u++)n[u].status=2,d=d.concat(ve(t.serverSyncTree_,n[u].currentWriteId)),n[u].onComplete&&h.push(()=>n[u].onComplete(null,!0,n[u].currentOutputSnapshotResolved)),n[u].unwatcher();kn(t,Zi(t.transactionQueueTree_,e)),ss(t,t.transactionQueueTree_),Z(t.eventQueue_,e,d);for(let u=0;u<h.length;u++)rt(h[u])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{z("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}tt(t,e)}},o)}function tt(t,e){const n=Jo(t,e),i=Wt(n),s=Zo(t,n);return ld(t,s,i),i}function ld(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=G(n,l.path);let d=!1,h;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,s=s.concat(ve(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Xh)d=!0,h="maxretry",s=s.concat(ve(t.serverSyncTree_,l.currentWriteId,!0));else{const u=Xo(t,l.path,o);l.currentInputSnapshot=u;const p=e[a].update(u.val());if(p!==void 0){Tn("transaction failed: Data returned ",p,l.path);let _=F(p);typeof p=="object"&&p!=null&&ae(p,".priority")||(_=_.updatePriority(u.getPriority()));const g=l.currentWriteId,L=Rn(t),ce=Wo(_,u,L);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=ce,l.currentWriteId=is(t),o.splice(o.indexOf(g),1),s=s.concat(Mo(t.serverSyncTree_,l.path,ce,l.currentWriteId,l.applyLocally)),s=s.concat(ve(t.serverSyncTree_,g,!0))}else d=!0,h="nodata",s=s.concat(ve(t.serverSyncTree_,l.currentWriteId,!0))}Z(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,(function(u){setTimeout(u,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}kn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)rt(i[a]);ss(t,t.transactionQueueTree_)}function Jo(t,e){let n,i=t.transactionQueueTree_;for(n=y(e);n!==null&&at(i)===void 0;)i=Zi(i,n),e=k(e),n=y(e);return i}function Zo(t,e){const n=[];return ea(t,e,n),n.sort((i,s)=>i.order-s.order),n}function ea(t,e,n){const i=at(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Sn(e,s=>{ea(t,s,n)})}function kn(t,e){const n=at(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Ho(e,n.length>0?n:void 0)}Sn(e,i=>{kn(t,i)})}function rs(t,e){const n=Wt(Jo(t,e)),i=Zi(t.transactionQueueTree_,e);return Bh(i,s=>{Gn(t,s)}),Gn(t,i),$o(i,s=>{Gn(t,s)}),n}function Gn(t,e){const n=at(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(f(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(ve(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ho(e,void 0):n.length=r+1,Z(t.eventQueue_,Wt(e),s);for(let o=0;o<i.length;o++)rt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function ud(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):z(`Invalid query segment '${n}' in query '${t}'`)}return e}const cr=function(t,e){const n=hd(t),i=n.namespace;n.domain==="firebase.com"&&me(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&me("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Ec();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new to(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new I(n.pathString)}},hd=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(d,h)),d<h&&(s=cd(t.substring(d,h)));const u=ud(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")n="localhost";else if(p.split(".").length<=2)n=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",dd=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=ur.charAt(n%64),n=Math.floor(n/64);f(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=ur.charAt(e[s]);return f(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+B(this.snapshot.exportVal())}}class na{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class as{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:Di(this._path)}get ref(){return new le(this._repo,this._path)}get _queryIdentifier(){const e=Ks(this._queryParams),n=Ri(e);return n==="{}"?"default":n}get _queryObject(){return Ks(this._queryParams)}isEqual(e){if(e=He(e),!(e instanceof as))return!1;const n=this._repo===e._repo,i=xi(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+su(this._path)}}class le extends as{constructor(e,n){super(e,n,new Fi,!1)}get parent(){const e=uo(this._path);return e===null?null:new le(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class nt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new I(e),i=it(this.ref,e);return new nt(this._node.getChild(n),i,M)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new nt(s,it(this.ref,i),M)))}hasChild(e){const n=new I(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ee(t,e){return t=He(t),t._checkNotDeleted("ref"),e!==void 0?it(t._root,e):t._root}function it(t,e){return t=He(t),y(t._path)===null?zh("child","path",e):zo("child","path",e),new le(t._repo,x(t._path,e))}function fd(t,e){t=He(t),ts("push",t._path),Go("push",e,t._path,!0);const n=Ko(t._repo),i=dd(n),s=it(t,i),r=it(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function hr(t){return ts("remove",t._path),Vt(t,null)}function Vt(t,e){t=He(t),ts("set",t._path),Go("set",e,t._path,!1);const n=new Mt;return nd(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function ia(t,e){Gh("update",e,t._path);const n=new Mt;return id(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function pd(t){t=He(t);const e=new os(()=>{}),n=new $t(e);return td(t._repo,t,n).then(i=>new nt(i,new le(t._repo,t._path),t._queryParams.getIndex()))}class $t{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new ta("value",this,new nt(e.snapshotNode,new le(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new na(this,e,n):null}matches(e){return e instanceof $t?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class An{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new na(this,e,n):null}createEvent(e,n){f(e.childName!=null,"Child events should have a childName.");const i=it(new le(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new ta(e.type,this,new nt(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof An?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function ls(t,e,n,i,s){const r=new os(n,void 0),o=e==="value"?new $t(r):new An(e,r);return rd(t._repo,t,o),()=>Qo(t._repo,t,o)}function sa(t,e,n,i){return ls(t,"value",e)}function ra(t,e,n,i){return ls(t,"child_added",e)}function _d(t,e,n,i){return ls(t,"child_removed",e)}function oa(t,e,n){let i=null;const s=n?new os(n):null;e==="value"?i=new $t(s):e&&(i=new An(e,s)),Qo(t._repo,t,i)}mh(le);Eh(le);/**
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
 */const md="FIREBASE_DATABASE_EMULATOR_HOST",pi={};let gd=!1;function yd(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Si(r);t.repoInfo_=new to(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function vd(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||me("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),H("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=cr(r,s),a=o.repoInfo,l;typeof process<"u"&&Ps&&(l=Ps[md]),l?(r=`http://${l}?ns=${a.namespace}`,o=cr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Dc(t.name,t.options,e);qh("Invalid Firebase Database URL",o),C(o.path)||me("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Ed(a,t,c,new Pc(t,n));return new wd(d,t)}function Cd(t,e){const n=pi[e];(!n||n[t.key]!==t)&&me(`Database ${e}(${t.repoInfo_}) has already been deleted.`),od(t),delete n[t.key]}function Ed(t,e,n,i){let s=pi[e.name];s||(s={},pi[e.name]=s);let r=s[t.toURLString()];return r&&me("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Jh(t,gd,n,i),s[t.toURLString()]=r,r}class wd{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Zh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new le(this._repo,w())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Cd(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&me("Cannot call "+e+" on a deleted database.")}}function bd(t=sc(),e){const n=Zl(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=Ba("database");i&&Id(n,...i)}return n}function Id(t,e,n,i={}){t=He(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&Jt(i,r.repoInfo_.emulatorOptions))return;me("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&me('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new qt(qt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Wa(i.mockUserToken,t.app.options.projectId);o=new qt(a)}Si(e)&&(Ua(e),$a("Database",!0)),yd(r,s,i,o)}/**
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
 */function Sd(t){_c(ic),en(new It("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return vd(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),ze(Ds,xs,t),ze(Ds,xs,"esm2020")}fe.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};fe.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Sd();var Td="firebase",Nd="12.4.0";/**
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
 */ze(Td,Nd,"app");const Rd={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},kd=Br(Rd),te=bd(kd),_i=[];function cs(t,e,n){_i.push({ref:t,type:e,callback:n})}function Ad(){_i.forEach(({ref:t,type:e,callback:n})=>{oa(t,e,n)}),_i.length=0}function dr(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=c=>{try{const d=c.target;if(t.contains(d))return;for(const h of o)if(h&&h.contains&&h.contains(d)||h===d)return;e(c)}catch(d){console.error("closeOnClickOutside handler error:",d)}},l=c=>{s&&c.key==="Escape"&&e(c)};return r.forEach(c=>document.addEventListener(c,a,{passive:!0})),s&&document.addEventListener("keydown",l),function(){r.forEach(d=>document.removeEventListener(d,a,{passive:!0})),s&&document.removeEventListener("keydown",l)}}const us=t=>t?!0:(console.warn("Element not found."),!1),aa=t=>{if(us(t))return t.classList.contains("hidden")},q=t=>{us(t)&&t.classList.remove("hidden")},T=t=>{us(t)&&t.classList.add("hidden")};function Pd(t){return document.pictureInPictureElement===t}const Dd=document.getElementById("installBtn"),re=document.getElementById("localVideo"),V=document.getElementById("remoteVideo"),b=document.getElementById("sharedVideo"),xt=document.getElementById("chat-controls"),We=document.getElementById("call-btn"),Pn=document.getElementById("hang-up-btn");document.getElementById("copyLink");document.getElementById("pipBtn");const fr=document.getElementById("switchCameraSelfBtn"),pr=document.getElementById("status"),xd=document.getElementById("linkContainer");document.getElementById("watchContainer");document.getElementById("videos");const Md=document.getElementById("syncStatus"),la=document.getElementById("shareLink");document.getElementById("streamUrl");const hs=document.getElementById("mute-btn"),Od=document.getElementById("fullscreenPartnerBtn"),Ld=document.getElementById("mic-btn"),Fd=document.getElementById("camera-btn"),Bd=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");document.getElementById("titleLink");document.getElementById("titleText");function Y(t){pr?pr.textContent=t:console.warn("Status div not found in the DOM.")}function Ud(t,{inactivityMs:e=2500,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const c=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(g=>!Array.isArray(o)||!o.includes(g));function d(){q(t);try{typeof i=="function"&&i()}catch(g){console.warn("showHideOnInactivity onShow callback error:",g)}a&&clearTimeout(a),a=setTimeout(()=>{T(t);try{typeof s=="function"&&s()}catch(g){console.warn("showHideOnInactivity onHide callback error:",g)}a=null},e)}c.forEach(g=>n.addEventListener(g,d,{passive:!0}));function h(){if(document.hidden){a&&(clearTimeout(a),a=null);try{T(t)}catch(g){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",g)}}else d()}document.addEventListener("visibilitychange",h);function u(g){if(!g.relatedTarget){a&&(clearTimeout(a),a=null),T(t);try{typeof s=="function"&&s()}catch(L){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",L)}}}n.addEventListener("mouseout",u);function p(g){if(r&&(g.key==="Escape"||g.key==="Esc")){a&&(clearTimeout(a),a=null),T(t);try{typeof s=="function"&&s()}catch(L){console.warn("showHideOnInactivity onHide (esc) callback error:",L)}}}document.addEventListener("keydown",p);function _(){a||d()}n.addEventListener("touchend",_,{passive:!0}),T(t);function E(){c.forEach(g=>n.removeEventListener(g,d)),document.removeEventListener("visibilitychange",h),n.removeEventListener("mouseout",u),n.removeEventListener("touchend",_),document.removeEventListener("keydown",p),a&&(clearTimeout(a),a=null)}return E}function Wd(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Hd(){return Wd()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Vd(){const t=await Hd();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function $d({localStream:t,localVideo:e,peerConnection:n,currentFacingMode:i}){const s=i==="user"?"environment":"user",r=t.getVideoTracks()[0];try{return await r.applyConstraints({facingMode:s}),s}catch(l){console.warn("applyConstraints failed, falling back to getUserMedia:",l)}const o=await navigator.mediaDevices.getUserMedia({video:{facingMode:s},audio:!1}),a=o.getVideoTracks()[0];if(n){const l=n.getSenders().find(c=>c.track&&c.track.kind==="video");l&&l.replaceTrack(a)}return t.removeTrack(r),t.addTrack(a),e.srcObject=t,r.stop(),o.getTracks().forEach(l=>{l!==a&&l.stop()}),s}let mi=!1,vt=null;function Yd(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function Gd(t,e,n){n&&(n.muted=!t,n.volume=e)}function zd(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function qd(t,e){t&&(vt=()=>{if(t.muted!==mi){const n=e.querySelector("i");n.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",mi=t.muted}},t.addEventListener("volumechange",vt))}function jd(t){!t||!vt||(t.removeEventListener("volumechange",vt),vt=null)}function Kd({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,muteSelfBtn:s,videoSelfBtn:r,switchCameraSelfBtn:o,fullscreenSelfBtn:a,mutePartnerBtn:l,fullscreenPartnerBtn:c,audioConstraints:d={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0}}){s&&(s.onclick=()=>{const u=t(),p=e();if(!p||!u)return;const _=!p.muted;Yd(!_,u),Gd(!_,0,p),zd(_,s)}),r&&(r.onclick=()=>{const u=t();if(!u)return;const p=u.getVideoTracks()[0];if(p){p.enabled=!p.enabled;const _=r.querySelector("i");_.className=p.enabled?"fa fa-video":"fa fa-video-slash"}});let h="user";o&&(o.onclick=async()=>{const u=t(),p=e();if(!u){console.warn("No local stream or no local video track available.");return}if(!u.getVideoTracks()[0]){console.warn("No local video track available.");return}const E=h,g=i?.();if(!g){console.error("PeerConnection is required to switch camera.");return}const L=await $d({localStream:u,localVideo:p,peerConnection:g,currentFacingMode:E});L==="user"||L==="environment"?(h=L,console.log("Switched camera to facingMode:",L)):console.error("switchCamera returned invalid facingMode:",L)}),a&&(a.onclick=()=>{const u=e();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()}),l&&(l.onclick=()=>{const u=n();u&&(u.muted=!u.muted)}),c&&(c.onclick=()=>{const u=n();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()})}function ca(t){jd(t),mi=!1}let K=null,_r=null;function ds(){return!K||!(K instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",K),console.error("Call createLocalStream() before accessing local stream."),null):K}const ua={echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0},Qd={width:{min:640,ideal:1920,max:1920},height:{min:480,ideal:1080,max:1080},resizeMode:"crop-and-scale"},Xd=async()=>K&&K instanceof MediaStream?(console.debug("Reusing existing local MediaStream."),K):(K=await navigator.mediaDevices.getUserMedia({video:Qd,audio:ua}),K);async function Jd(t){return K=await Xd(),_r=new MediaStream(K.getVideoTracks()),t.srcObject=_r,!0}function ha(t,e,n){return t.ontrack=i=>{if(!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;e.srcObject!==i.streams[0]&&(e.srcObject=i.streams[0],qd(e,n),Y("Connected!"))},!0}const Zd=()=>{K&&(K.getTracks().forEach(t=>t.stop()),K=null)},mr="yt-player-div",gi="yt-player-root";let P=null,ge=!1;const Ct=()=>P,ef=()=>ge,da=t=>ge=t,Le=()=>{const t=document.getElementById(mr);if(!t)throw new Error(`Container #${mr} not found`);return t};function tf(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function fa(){const t=Le();if(!document.getElementById(gi)){const e=document.createElement("div");e.id=gi,t.appendChild(e)}q(t)}function yi(){const t=Le();T(t)}function zn(){const t=Le();return t&&!t.classList.contains("hidden")}function vi(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function pa(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function nf({url:t,onReady:e,onStateChange:n}){const i=pa(t);if(!i)throw new Error("Invalid YouTube URL");if(await tf(),P){try{P.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}P=null}const s=(o=!0)=>{const a=Le(),l=P.getIframe();if(l&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===l)try{l.blur()}catch{}}if(o){const c=d=>{if(d.code==="Space"){const h=Le(),u=P.getIframe();if(document.activeElement===u||document.activeElement===h)return;d.preventDefault(),console.debug("Space pressed, refocusing iframe"),P.getPlayerState()!==window.YT.PlayerState.PLAYING?ps():Dn()}};document.addEventListener("keydown",c,{once:!0})}}},r=()=>{const o=Le(),a=P.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return fa(),new Promise((o,a)=>{try{P=new window.YT.Player(gi,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:l=>{ge=!0,e&&e(l),o(P)},onStateChange:l=>{l.data===window.YT.PlayerState.ENDED&&s(!1),l.data===window.YT.PlayerState.PAUSED&&s(),l.data===window.YT.PlayerState.PLAYING&&r(),n&&n(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function fs(){if(P){try{yi(),P.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}P=null,ge=!1}}function ps(){P&&ge&&P.playVideo()}function Dn(){P&&ge&&P.pauseVideo()}function sf(t){P&&ge&&P.seekTo(t,!0)}function _n(){return P&&ge?P.getCurrentTime():0}function _s(){return P&&ge?P.getPlayerState():-1}const Ce={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let pe=null,xn=null,_a=!1,J="none",ms=null;const gs=()=>_a,ma=t=>_a=t,dt=()=>J,rf=t=>{["yt","url","none"].includes(t)?J=t:console.warn("Invalid lastWatched platform:",t)};let Ee=!1,Et=null,wt=0;async function Ke(t){if(!pe)return;console.debug("Updating watch sync state, roomId:",pe);const e=ee(te,`rooms/${pe}/watch`);try{await ia(e,{...t,updatedBy:xn})}catch(n){console.error("Failed to update watch state:",n)}}function ga(t,e,n){if(!t)return;pe=t,xn=n;const i=ee(te,`rooms/${t}/watch`);sa(i,gr),cs(i,"value",gr),df()}function gr(t){const e=t.val();e&&e.updatedBy!==xn&&(Date.now()-wt<500||(e.url&&e.url!==ms&&of(e.url),e.isYouTube?af(e):hf(e)))}function of(t){ms=t,vi(t)?(T(b),ya(t),J="yt"):(fs(),q(b),b.src=t,J="url")}function af(t){!Ct()||!ef()||(lf(t),cf(t))}function lf(t){const e=_s(),n=e===Ce.PLAYING;if([Ce.BUFFERING,Ce.UNSTARTED].includes(e)){uf();return}Ee||(t.playing&&!n?(ps(),J="yt"):!t.playing&&n&&(Dn(),J="yt"))}function cf(t){if(t.currentTime===void 0)return;const e=_n();Math.abs(e-t.currentTime)>.3&&!Ee&&(sf(t.currentTime),setTimeout(()=>{t.playing?ps():Dn(),J="yt"},500))}function uf(){Ee=!0,clearTimeout(Et),Et=setTimeout(async()=>{Ee=!1;const t=_s()===Ce.PLAYING;await Ke({playing:t,currentTime:_n()})},700)}function hf(t){t.playing!==void 0&&(t.playing&&b.paused?b.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!b.paused&&b.pause()),t.currentTime!==void 0&&Math.abs(b.currentTime-t.currentTime)>1&&(b.currentTime=t.currentTime,t.playing?b.play().catch(n=>console.warn("Play failed:",n)):b.pause())}function df(){b.addEventListener("play",async()=>{!Ct()&&pe&&(wt=Date.now(),await Ke({playing:!0,isYouTube:!1})),J="url"}),b.addEventListener("pause",async()=>{!Ct()&&pe&&(wt=Date.now(),await Ke({playing:!1,isYouTube:!1})),J="url"}),b.addEventListener("seeked",async()=>{!Ct()&&pe&&(wt=Date.now(),await Ke({currentTime:b.currentTime,playing:!b.paused,isYouTube:!1})),J="url"})}async function ff(t){if(!t)return!1;if(wt=Date.now(),vi(t)){if(T(b),!await ya(t))return!1;gn(),J="yt"}else fs(),q(b),b.src=t,gn(),J="url";if(pe){const e=ee(te,`rooms/${pe}/watch`);Vt(e,{url:t,playing:!1,currentTime:0,isYouTube:vi(t),updatedBy:xn})}return!0}async function pf(t){return!t||!t.url?(console.warn("Non-existing or invalid video."),!1):(ms=t.url,await ff(t.url))}async function ya(t,e,n){if(!pa(t))return console.error("Invalid YouTube URL:",t),!1;try{return await nf({url:t,onReady:s=>{da(!0)},onStateChange:async s=>{if(!Ct())return;const o=s.data===Ce.PLAYING,a=s.data===Ce.PAUSED;if(s.data===Ce.BUFFERING){Ee=!0,Et&&clearTimeout(Et),Et=setTimeout(async()=>{Ee=!1;const d=_s()===Ce.PLAYING;await Ke({playing:d,currentTime:_n()})},700);return}a&&Ee||!Ee&&(o||a)&&await Ke({playing:o,currentTime:_n()})}}),!0}catch(s){return console.error("Failed to load YouTube video:",s),!1}}let qn=null,ye=null,O=null,A=null,yr=!1,zt=!1,oe=[],Me=null,Ci="",j=-1,Ei=[];const _f="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",mf="https://www.googleapis.com/youtube/v3";function gf(){if(yr||zt)return!1;if(zt=!0,Me=pf,qn=document.querySelector(".search-section"),ye=document.getElementById("searchBtn"),O=document.getElementById("searchQuery"),A=document.getElementById("searchResults"),!qn||!ye||!O||!A)return console.error("YouTube search elements not found in DOM"),zt=!1,!1;const t=s=>/^https?:\/\//i.test(s),e=s=>{A.querySelectorAll(".search-result-item").forEach((o,a)=>{a===s?(o.classList.add("focused"),o.scrollIntoView({block:"nearest"})):o.classList.remove("focused")}),j=s};ye.onclick=async()=>{const s=O.value.trim();if(aa(O)){q(O),O.focus();return}if(!s){jt(),T(O);return}Er()&&s===Ci?wi(oe):t(s)?(Me&&await Me({url:s,title:s,channel:"",thumbnail:"",id:s}),T(A),O.value=""):await vr(s)},qn.addEventListener("keydown",async s=>{const r=A.querySelectorAll(".search-result-item");if(r.length>0&&(s.key==="ArrowDown"||s.key==="ArrowUp")){if(s.key==="ArrowDown"){let o=j+1;o>=r.length&&(o=0),e(o)}else if(s.key==="ArrowUp"){let o=j-1;o<0&&(o=j===-1?0:r.length-1),e(o)}return}if(s.key==="Enter"){if(r.length>0&&j>=0){r[j].click(),T(O);return}const o=O.value.trim();if(o)if(Er()&&o===Ci)wi(oe);else if(!t(o))await vr(o);else{Me&&await Me({url:o,title:o,channel:"",thumbnail:"",id:o}),T(A),j=-1,O.value="",T(O);return}}else s.key==="Escape"&&(vf()?jt():O.value?O.value="":T(O))}),O.addEventListener("input",()=>{O.value.trim()===""&&jt(),j=-1});const n=dr(O,()=>T(O),{ignore:[ye],esc:!1});Ei.push(n);const i=dr(A,()=>T(A),{ignore:[ye],esc:!1});return Ei.push(i),zt=!1,yr=!0,!0}async function vr(t){if(!ye||!A){console.error("Search elements not initialized");return}oe=[],Ci=t,ye.disabled=!0,A.innerHTML='<div class="search-loading">Searching YouTube...</div>',q(A);try{const e=await fetch(`${mf}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${_f}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Cr("No videos found"),oe=[];return}oe=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),wi(oe)}catch(e){console.error("YouTube search failed:",e),Cr(e.message||"Search failed. Please try again.")}finally{ye.disabled=!1}}function wi(t){if(!A){console.error("Search results element not initialized");return}if(!t||t.length===0){A.innerHTML='<div class="no-results">No results found</div>',oe=[],j=-1;return}A.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${n.title}</div>
        <div class="result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(Me){if(await Me(n),T(A),j=-1,!O){console.error("Search query element not initialized");return}O.value=""}},A.appendChild(i)}),q(A),j=0,A.querySelectorAll(".search-result-item").forEach((n,i)=>{i===j?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Cr(t){if(oe=[],j=-1,!A){console.error("Search results element not initialized");return}A.innerHTML=`<div class="search-error">${t}</div>`,q(A)}function jt(){oe=[],j=-1,A&&(A.innerHTML="",T(A))}function yf(){jt(),Ei.forEach(t=>t())}function vf(){return!aa(A)}function Er(){return oe.length>0}function Cf(t){if(!t){console.warn("setupPWA: install button not found");return}let e;window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),e=n,q(t)}),t.addEventListener("click",async()=>{if(e){e.prompt();const{outcome:n}=await e.userChoice;n==="accepted"?T(t):console.log("User dismissed the install prompt"),e=null}}),window.addEventListener("appinstalled",()=>{T(t)})}function va(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(e==="initiator")wr(t,"offerCandidates",n),br(t,"answerCandidates",n);else if(e==="joiner")wr(t,"answerCandidates",n),br(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function wr(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=fd(ee(te,`rooms/${n}/${e}`));Vt(s,i.candidate.toJSON())}}}function br(t,e,n){const i=ee(te,`rooms/${n}/${e}`),s=r=>{const o=r.val();o&&t.remoteDescription&&t.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};ra(i,s),cs(i,"child_added",s)}function Ca(t){const e=document.createElement("div");e.innerHTML=`
    <div id="chat-toggle-btn" class="hidden" style="position:fixed; bottom:20px; right:20px; z-index:1000;">
      <button style="padding:10px 15px; border-radius:50%; background:#007bff; color:#fff; border:none; cursor:pointer; font-size:16px;">
        💬
      </button>
    </div>
    <div id="chat-container" class="chat-box hidden">
      <div id="chat-messages" style="height:150px; overflow-y:auto; background:#111; color:#eee; padding:6px; font-family:sans-serif; font-size:14px;"></div>
      <form id="chat-form" style="display:flex; gap:4px; margin-top:6px;">
        <input id="chat-input" placeholder="Type a message..." style="flex:1; padding:6px; border-radius:4px; border:1px solid #555; background:#222; color:#fff;">
        <button style="padding:6px 12px;">Send</button>
      </form>
    </div>
  `,document.body.appendChild(e);const n=e.querySelector("#chat-toggle-btn"),i=e.querySelector("#chat-container"),s=e.querySelector("#chat-messages"),r=e.querySelector("#chat-form"),o=e.querySelector("#chat-input");function a(){i.classList.toggle("hidden")}n.addEventListener("click",a);function l(){q(n)}function c(){T(n)}function d(h){const u=document.createElement("p");u.textContent=h,s.appendChild(u),s.scrollTop=s.scrollHeight}return r.addEventListener("submit",h=>{h.preventDefault();const u=o.value.trim();u&&(t(u),d(`You: ${u}`),o.value="")}),{showChatToggle:l,hideChatToggle:c,addMessage:d}}let S=null,ue=null,D=null,de=null,Ne=null,we,Ea=[],bi=null;const wa=()=>V.srcObject&&V.srcObject.getVideoTracks().some(t=>t.enabled);async function ba(){de=Math.random().toString(36).substring(2,15);try{const t=Le();T(t)}catch{}try{return await Jd(re),await Vd()&&(fr.style.display="block"),Kd({getLocalStream:ds,getLocalVideo:()=>re,getRemoteVideo:()=>V,getPeerConnection:()=>S,muteSelfBtn:Ld,videoSelfBtn:Fd,switchCameraSelfBtn:fr,fullscreenSelfBtn:Bd,mutePartnerBtn:hs,fullscreenPartnerBtn:Od,audioConstraints:ua}),Cf(Dd),gf(),If(),!0}catch(t){return console.error("Failed to get user media:",t),Y("Error: Please allow camera and microphone access."),!1}}function Ef(){ue=S.createDataChannel("chat"),we=Ca(t=>{ue.readyState==="open"&&ue.send(t)}),ue.onopen=()=>{we.showChatToggle(),we.addMessage("💬 Chat connected")},ue.onmessage=t=>we.addMessage(`Partner: ${t.data}`)}let mn=[];function Ia(){if(!D||!de)return;const t=ee(te,`rooms/${D}/members`),e=ee(te,`rooms/${D}/members/${de}`);Vt(e,{joinedAt:Date.now()});const n=s=>{s.key!==de&&Na()};ra(t,n),mn.push({ref:t,type:"child_added",callback:n});const i=s=>{s.key!==de&&console.info("Partner has left the call"),ys()};_d(t,i),mn.push({ref:t,type:"child_removed",callback:i})}const Sa={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};function Ta(t){t.onconnectionstatechange=()=>{t.connectionState==="connected"?Y("Connected!"):t.connectionState==="disconnected"?Y("Partner disconnected"):t.connectionState==="failed"&&Y("Connection failed")}}async function wf(){const t=ds();if(!t)return Y("Error: Camera not initialized"),!1;D=Math.random().toString(36).substring(2,15),Ne="initiator",S=new RTCPeerConnection(Sa),Ef(),t.getTracks().forEach(o=>{S.addTrack(o,t)}),ha(S,V,hs)&&(va(S,Ne,D),Ta(S),console.debug("Peer connection created as initiator with room ID:",D));const e=await S.createOffer();await S.setLocalDescription(e);const n=ee(te,`rooms/${D}`);await Vt(n,{offer:{type:e.type,sdp:e.sdp}});const i=ee(te,`rooms/${D}/answer`),s=async o=>{const a=o.val();if(a&&a.sdp!==bi){if(bi=a.sdp,S.signalingState!=="have-local-offer"&&S.signalingState!=="stable")return!0;try{return await S.setRemoteDescription(new RTCSessionDescription(a)),!0}catch(l){return console.error("Failed to set remote description:",l),!1}}};sa(i,s),cs(i,"value",s),ga(D,Ne,de),Ia();const r=`${window.location.origin}${window.location.pathname}?room=${D}`;la.value=r,We.disabled=!0,Pn.disabled=!1;try{return await navigator.clipboard.writeText(r),alert(`Link copied! Share it with someone to start a call.

( link: ${r} )`),Y("Link ready! Share with your partner."),!0}catch{alert(`Share this link with your partner:
${r}`)}return!1}async function bf(){const t=ds();if(!t)return Y("Error: Camera not initialized"),!1;if(!D)return Y("Error: No room ID"),!1;Ne="joiner";const e=ee(te,`rooms/${D}`),n=await pd(e);if(!n.exists())return Y("Error: Invalid room link"),!1;const s=n.val().offer;if(!s)return Y("Error: No offer found"),!1;S=new RTCPeerConnection(Sa),S.ondatachannel=o=>{ue=o.channel,we=Ca(a=>ue.send(a)),ue.onopen=()=>{we.show(),we.addMessage("💬 Chat connected")},ue.onmessage=a=>we.addMessage(`Partner: ${a.data}`)},t.getTracks().forEach(o=>{S.addTrack(o,t)}),ha(S,V,hs)&&(va(S,Ne,D),Ta(S),console.debug("Peer connection created as joiner for room ID:",D)),await S.setRemoteDescription(new RTCSessionDescription(s));const r=await S.createAnswer();await S.setLocalDescription(r);try{await ia(e,{answer:{type:r.type,sdp:r.sdp}})}catch(o){return console.error("Failed to update answer in Firebase:",o),Y("Failed to send answer to partner."),!1}return ga(D,Ne,de),Ia(),Pn.disabled=!1,Na(),Y("Connecting..."),!0}function gn(){gs()||(wa()?(V.classList.add("smallFrame"),T(re),V.requestPictureInPicture().then(()=>{T(V)}).catch(t=>{console.error("Failed to enter Picture-in-Picture:",t)})):(q(re),re.classList.add("smallFrame")),xt.classList.remove("bottom"),xt.classList.add("watch-mode"),ma(!0))}function Kt(){gs()&&(q(re),wa()?(V.classList.remove("smallFrame"),q(V),Pd(V)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)})):re.classList.remove("smallFrame"),xt.classList.remove("watch-mode"),xt.classList.add("bottom"),ma(!1))}let Na=()=>{q(V),re.classList.add("smallFrame")},Ir=()=>{T(V),re.classList.remove("smallFrame")};function jn(){return b&&!b.classList.contains("hidden")&&b.src&&b.src.trim()!==""}let Sr=!1;function If(){Sr||(document.addEventListener("keydown",t=>{(t.key==="w"||t.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",dt()),console.log("isYTVisible():",zn()),console.log("isSharedVideoVisible():",jn()),console.log("isWatchModeActive():",gs()),dt()==="yt"?(console.log("Processing YouTube case"),zn()?(console.log("Hiding YouTube player"),yi(),Kt()):(console.log("Showing YouTube player"),fa(),gn())):dt()==="url"&&(console.log("Processing URL case"),jn()?(console.log("Hiding shared video"),T(b),Kt()):(console.log("Showing shared video"),q(b),gn()))),t.key==="Escape"&&(dt()==="yt"&&zn()?(Dn(),yi(),Kt()):dt()==="url"&&jn()&&(b.pause(),T(b)))}),Sr=!0)}We.onclick=async()=>{await wf()};Pn.onclick=ys;const Sf=Ud(xt,{inactivityMs:2500,hideOnEsc:!0});Ea.push(Sf);async function Tf(){const e=new URLSearchParams(window.location.search).get("room");if(e){D=e,Y("Connecting to room..."),We.style.display="none";const n=await ba();let i=!1;return n&&(i=await bf()),!n||!i?(We.style.display="block",!1):!0}else return Y('Ready. Click "Start New Chat" to begin.'),!1}window.onload=async()=>{if(await Tf())return;if(!await ba()){We.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}};window.addEventListener("beforeunload",t=>{if(S&&S.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;Nf()});let Kn=!1;async function ys(){if(!Kn){if(Kn=!0,console.debug("Hanging up..."),Ir(),V.srcObject&&(V.srcObject.getTracks().forEach(t=>t.stop()),V.srcObject=null),ca(V),S&&(S.close(),S=null),Ad(),D&&Ne==="initiator"){const t=ee(te,`rooms/${D}`);hr(t).catch(e=>{console.warn("Failed to remove room:",e)})}if(Ir(),We.disabled=!1,We.style.display="block",Pn.disabled=!0,xd.style.display="none",mn.forEach(({ref:t,type:e,callback:n})=>oa(t,e,n)),mn.length=0,D&&de){const t=ee(te,`rooms/${D}/members/${de}`);hr(t).catch(()=>{})}document.pictureInPictureElement&&document.exitPictureInPicture().catch(t=>console.error(t)),D=null,Ne=null,bi=null,window.history.replaceState({},document.title,window.location.pathname),Y('Disconnected. Click "Start New Chat" to begin.'),Kn=!1}}function Nf(){(S||D)&&ys(),la.value="",b.src="",Md.textContent="",Zd(),re.srcObject=null,ca(re),Kt(),rf("none"),fs(),da(!1),yf(),Ea.forEach(t=>t())}
