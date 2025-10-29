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
 */const ml=()=>{};var rr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(t,e){if(!t)throw bt(e)},bt=function(t){return new Error("Firebase Database ("+fo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},gl=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ss={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let u=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(u=64)),i.push(n[d],n[h],n[u],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(po(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):gl(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new yl;const u=r<<2|a>>4;if(i.push(u),c!==64){const f=a<<4&240|c>>2;if(i.push(f),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class yl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _o=function(t){const e=po(t);return ss.encodeByteArray(e,!0)},gn=function(t){return _o(t).replace(/\./g,"")},Ii=function(t){try{return ss.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vl(t){return mo(void 0,t)}function mo(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Cl(n)||(t[n]=mo(t[n],e[n]));return t}function Cl(t){return t!=="__proto__"}/**
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
 */function El(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const wl=()=>El().__FIREBASE_DEFAULTS__,bl=()=>{if(typeof process>"u"||typeof rr>"u")return;const t=rr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Il=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ii(t[1]);return e&&JSON.parse(e)},go=()=>{try{return ml()||wl()||bl()||Il()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Sl=t=>go()?.emulatorHosts?.[t],Tl=t=>{const e=Sl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},yo=()=>go()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function rs(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function kl(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Nl(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[gn(JSON.stringify(n)),gn(JSON.stringify(o)),""].join(".")}const xt={};function Rl(){const t={prod:[],emulator:[]};for(const e of Object.keys(xt))xt[e]?t.emulator.push(e):t.prod.push(e);return t}function Al(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let or=!1;function Pl(t,e){if(typeof window>"u"||typeof document>"u"||!rs(window.location.host)||xt[t]===e||xt[t]||or)return;xt[t]=e;function n(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=Rl().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,f){u.setAttribute("width","24"),u.setAttribute("id",f),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function c(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{or=!0,o()},u}function d(u,f){u.setAttribute("id",f),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=Al(i),f=n("text"),_=document.getElementById(f)||document.createElement("span"),m=n("learnmore"),y=document.getElementById(m)||document.createElement("a"),ee=n("preprendIcon"),ge=document.getElementById(ee)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const Ve=u.element;a(Ve),d(y,m);const ri=c();l(ge,ee),Ve.append(ge,_,y,ri),document.body.appendChild(Ve)}r?(_.innerText="Preview backend disconnected.",ge.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(ge.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xl())}function Dl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ml(){return fo.NODE_ADMIN===!0}function Ll(){try{return typeof indexedDB=="object"}catch{return!1}}function Ol(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="FirebaseError";class en extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Fl,Object.setPrototypeOf(this,en.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Co.prototype.create)}}class Co{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Bl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new en(s,a,i)}}function Bl(t,e){return t.replace(Ul,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Ul=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(t){return JSON.parse(t)}function H(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Ht(Ii(r[0])||""),n=Ht(Ii(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Wl=function(t){const e=Eo(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Hl=function(t){const e=Eo(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function pt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function ar(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function yn(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function vn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(lr(r)&&lr(o)){if(!vn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function lr(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vl(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $l{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const u=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const u=(s<<5|s>>>27)+c+l+d+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Un(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Wn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function tt(t){return t&&t._delegate?t._delegate:t}class Vt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ze="[DEFAULT]";/**
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
 */class zl{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Zt;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ql(e))try{this.getOrInitializeService({instanceIdentifier:ze})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ze){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ze){return this.instances.has(e)}getOptions(e=ze){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Gl(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ze){return this.component?this.component.multipleInstances?e:ze:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Gl(t){return t===ze?void 0:t}function ql(t){return t.instantiationMode==="EAGER"}/**
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
 */class jl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new zl(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(N||(N={}));const Kl={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Ql=N.INFO,Xl={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Jl=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Xl[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class wo{constructor(e){this.name=e,this._logLevel=Ql,this._logHandler=Jl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Kl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Zl=(t,e)=>e.some(n=>t instanceof n);let cr,ur;function ec(){return cr||(cr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function tc(){return ur||(ur=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bo=new WeakMap,Si=new WeakMap,Io=new WeakMap,oi=new WeakMap,os=new WeakMap;function nc(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(De(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&bo.set(n,t)}).catch(()=>{}),os.set(e,t),e}function ic(t){if(Si.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Si.set(t,e)}let Ti={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Si.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Io.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return De(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function sc(t){Ti=t(Ti)}function rc(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(ai(this),e,...n);return Io.set(i,e.sort?e.sort():[e]),De(i)}:tc().includes(t)?function(...e){return t.apply(ai(this),e),De(bo.get(this))}:function(...e){return De(t.apply(ai(this),e))}}function oc(t){return typeof t=="function"?rc(t):(t instanceof IDBTransaction&&ic(t),Zl(t,ec())?new Proxy(t,Ti):t)}function De(t){if(t instanceof IDBRequest)return nc(t);if(oi.has(t))return oi.get(t);const e=oc(t);return e!==t&&(oi.set(t,e),os.set(e,t)),e}const ai=t=>os.get(t);function ac(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=De(o);return i&&o.addEventListener("upgradeneeded",l=>{i(De(o.result),l.oldVersion,l.newVersion,De(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const lc=["get","getKey","getAll","getAllKeys","count"],cc=["put","add","delete","clear"],li=new Map;function dr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(li.get(e))return li.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=cc.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||lc.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return li.set(e,r),r}sc(t=>({...t,get:(e,n,i)=>dr(e,n)||t.get(e,n,i),has:(e,n)=>!!dr(e,n)||t.has(e,n)}));/**
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
 */class uc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(dc(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function dc(t){return t.getComponent()?.type==="VERSION"}const ki="@firebase/app",hr="0.14.4";/**
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
 */const be=new wo("@firebase/app"),hc="@firebase/app-compat",fc="@firebase/analytics-compat",pc="@firebase/analytics",_c="@firebase/app-check-compat",mc="@firebase/app-check",gc="@firebase/auth",yc="@firebase/auth-compat",vc="@firebase/database",Cc="@firebase/data-connect",Ec="@firebase/database-compat",wc="@firebase/functions",bc="@firebase/functions-compat",Ic="@firebase/installations",Sc="@firebase/installations-compat",Tc="@firebase/messaging",kc="@firebase/messaging-compat",Nc="@firebase/performance",Rc="@firebase/performance-compat",Ac="@firebase/remote-config",Pc="@firebase/remote-config-compat",xc="@firebase/storage",Dc="@firebase/storage-compat",Mc="@firebase/firestore",Lc="@firebase/ai",Oc="@firebase/firestore-compat",Fc="firebase",Bc="12.4.0";/**
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
 */const Ni="[DEFAULT]",Uc={[ki]:"fire-core",[hc]:"fire-core-compat",[pc]:"fire-analytics",[fc]:"fire-analytics-compat",[mc]:"fire-app-check",[_c]:"fire-app-check-compat",[gc]:"fire-auth",[yc]:"fire-auth-compat",[vc]:"fire-rtdb",[Cc]:"fire-data-connect",[Ec]:"fire-rtdb-compat",[wc]:"fire-fn",[bc]:"fire-fn-compat",[Ic]:"fire-iid",[Sc]:"fire-iid-compat",[Tc]:"fire-fcm",[kc]:"fire-fcm-compat",[Nc]:"fire-perf",[Rc]:"fire-perf-compat",[Ac]:"fire-rc",[Pc]:"fire-rc-compat",[xc]:"fire-gcs",[Dc]:"fire-gcs-compat",[Mc]:"fire-fst",[Oc]:"fire-fst-compat",[Lc]:"fire-vertex","fire-js":"fire-js",[Fc]:"fire-js-all"};/**
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
 */const Cn=new Map,Wc=new Map,Ri=new Map;function fr(t,e){try{t.container.addComponent(e)}catch(n){be.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function En(t){const e=t.name;if(Ri.has(e))return be.debug(`There were multiple attempts to register component ${e}.`),!1;Ri.set(e,t);for(const n of Cn.values())fr(n,t);for(const n of Wc.values())fr(n,t);return!0}function Hc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Vc(t){return t==null?!1:t.settings!==void 0}/**
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
 */const $c={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Me=new Co("app","Firebase",$c);/**
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
 */class Yc{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Vt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Me.create("app-deleted",{appName:this._name})}}/**
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
 */const zc=Bc;function So(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Ni,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Me.create("bad-app-name",{appName:String(s)});if(n||(n=yo()),!n)throw Me.create("no-options");const r=Cn.get(s);if(r){if(vn(n,r.options)&&vn(i,r.config))return r;throw Me.create("duplicate-app",{appName:s})}const o=new jl(s);for(const l of Ri.values())o.addComponent(l);const a=new Yc(n,i,o);return Cn.set(s,a),a}function Gc(t=Ni){const e=Cn.get(t);if(!e&&t===Ni&&yo())return So();if(!e)throw Me.create("no-app",{appName:t});return e}function ct(t,e,n){let i=Uc[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),be.warn(o.join(" "));return}En(new Vt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const qc="firebase-heartbeat-database",jc=1,$t="firebase-heartbeat-store";let ci=null;function To(){return ci||(ci=ac(qc,jc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore($t)}catch(n){console.warn(n)}}}}).catch(t=>{throw Me.create("idb-open",{originalErrorMessage:t.message})})),ci}async function Kc(t){try{const n=(await To()).transaction($t),i=await n.objectStore($t).get(ko(t));return await n.done,i}catch(e){if(e instanceof en)be.warn(e.message);else{const n=Me.create("idb-get",{originalErrorMessage:e?.message});be.warn(n.message)}}}async function pr(t,e){try{const i=(await To()).transaction($t,"readwrite");await i.objectStore($t).put(e,ko(t)),await i.done}catch(n){if(n instanceof en)be.warn(n.message);else{const i=Me.create("idb-set",{originalErrorMessage:n?.message});be.warn(i.message)}}}function ko(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Qc=1024,Xc=30;class Jc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new eu(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=_r();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>Xc){const s=tu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){be.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=_r(),{heartbeatsToSend:n,unsentEntries:i}=Zc(this._heartbeatsCache.heartbeats),s=gn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return be.warn(e),""}}}function _r(){return new Date().toISOString().substring(0,10)}function Zc(t,e=Qc){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),mr(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),mr(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class eu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ll()?Ol().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Kc(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return pr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return pr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function mr(t){return gn(JSON.stringify({version:2,heartbeats:t})).length}function tu(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function nu(t){En(new Vt("platform-logger",e=>new uc(e),"PRIVATE")),En(new Vt("heartbeat",e=>new Jc(e),"PRIVATE")),ct(ki,hr,t),ct(ki,hr,"esm2020"),ct("fire-js","")}nu("");var gr={};const yr="@firebase/database",vr="1.1.0";/**
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
 */let No="";function iu(t){No=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),H(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ht(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return _e(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new su(e)}}catch{}return new ru},je=Ro("localStorage"),ou=Ro("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut=new wo("@firebase/database"),au=(function(){let t=1;return function(){return t++}})(),Ao=function(t){const e=Yl(t),n=new $l;n.update(e);const i=n.digest();return ss.encodeByteArray(i)},tn=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=tn.apply(null,i):typeof i=="object"?e+=H(i):e+=i,e+=" "}return e};let Dt=null,Cr=!0;const lu=function(t,e){p(!0,"Can't turn on custom loggers persistently."),ut.logLevel=N.VERBOSE,Dt=ut.log.bind(ut)},z=function(...t){if(Cr===!0&&(Cr=!1,Dt===null&&ou.get("logging_enabled")===!0&&lu()),Dt){const e=tn.apply(null,t);Dt(e)}},nn=function(t){return function(...e){z(t,...e)}},Ai=function(...t){const e="FIREBASE INTERNAL ERROR: "+tn(...t);ut.error(e)},Ie=function(...t){const e=`FIREBASE FATAL ERROR: ${tn(...t)}`;throw ut.error(e),new Error(e)},X=function(...t){const e="FIREBASE WARNING: "+tn(...t);ut.warn(e)},cu=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&X("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},as=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},uu=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},_t="[MIN_NAME]",Je="[MAX_NAME]",nt=function(t,e){if(t===e)return 0;if(t===_t||e===Je)return-1;if(e===_t||t===Je)return 1;{const n=Er(t),i=Er(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},du=function(t,e){return t===e?0:t<e?-1:1},kt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+H(e))},ls=function(t){if(typeof t!="object"||t===null)return H(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=H(e[i]),n+=":",n+=ls(t[e[i]]);return n+="}",n},Po=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function q(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const xo=function(t){p(!as(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let u=parseInt(d.substr(l,8),2).toString(16);u.length===1&&(u="0"+u),h=h+u}return h.toLowerCase()},hu=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},fu=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function pu(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const _u=new RegExp("^-?(0*)\\d{1,10}$"),mu=-2147483648,gu=2147483647,Er=function(t){if(_u.test(t)){const e=Number(t);if(e>=mu&&e<=gu)return e}return null},It=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw X("Exception was thrown by user callback.",n),e},Math.floor(0))}},yu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Mt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class vu{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Vc(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){X(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(z("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',X(e)}}class pn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}pn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs="5",Do="v",Mo="s",Lo="r",Oo="f",Fo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Bo="ls",Uo="p",Pi="ac",Wo="websocket",Ho="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=je.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&je.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Eu(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function $o(t,e,n){p(typeof e=="string","typeof type must == string"),p(typeof n=="object","typeof params must == object");let i;if(e===Wo)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Ho)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Eu(t)&&(n.ns=t.namespace);const s=[];return q(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(){this.counters_={}}incrementCounter(e,n=1){_e(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return vl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui={},di={};function us(t){const e=t.toString();return ui[e]||(ui[e]=new wu),ui[e]}function bu(t,e){const n=t.toString();return di[n]||(di[n]=e()),di[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&It(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wr="start",Su="close",Tu="pLPCommand",ku="pRTLPCB",Yo="id",zo="pw",Go="ser",Nu="cb",Ru="seg",Au="ts",Pu="d",xu="dframe",qo=1870,jo=30,Du=qo-jo,Mu=25e3,Lu=3e4;class at{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=nn(e),this.stats_=us(n),this.urlFn=l=>(this.appCheckToken&&(l[Pi]=this.appCheckToken),$o(n,Ho,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Iu(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Lu)),uu(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ds((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===wr)this.id=a,this.password=l;else if(o===Su)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[wr]="t",i[Go]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Nu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Do]=cs,this.transportSessionId&&(i[Mo]=this.transportSessionId),this.lastSessionId&&(i[Bo]=this.lastSessionId),this.applicationId&&(i[Uo]=this.applicationId),this.appCheckToken&&(i[Pi]=this.appCheckToken),typeof location<"u"&&location.hostname&&Fo.test(location.hostname)&&(i[Lo]=Oo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){at.forceAllow_=!0}static forceDisallow(){at.forceDisallow_=!0}static isAvailable(){return at.forceAllow_?!0:!at.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!hu()&&!fu()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=H(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=_o(n),s=Po(i,Du);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[xu]="t",i[Yo]=e,i[zo]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=H(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class ds{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=au(),window[Tu+this.uniqueCallbackIdentifier]=e,window[ku+this.uniqueCallbackIdentifier]=n,this.myIFrame=ds.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){z("frame writing exception"),a.stack&&z(a.stack),z(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||z("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Yo]=this.myID,e[zo]=this.myPW,e[Go]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+jo+i.length<=qo;){const o=this.pendingSegs.shift();i=i+"&"+Ru+s+"="+o.seg+"&"+Au+s+"="+o.ts+"&"+Pu+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(Mu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{z("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ou=16384,Fu=45e3;let wn=null;typeof MozWebSocket<"u"?wn=MozWebSocket:typeof WebSocket<"u"&&(wn=WebSocket);class ae{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=nn(this.connId),this.stats_=us(n),this.connURL=ae.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Do]=cs,typeof location<"u"&&location.hostname&&Fo.test(location.hostname)&&(o[Lo]=Oo),n&&(o[Mo]=n),i&&(o[Bo]=i),s&&(o[Pi]=s),r&&(o[Uo]=r),$o(e,Wo,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,je.set("previous_websocket_failure",!0);try{let i;Ml(),this.mySock=new wn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ae.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&wn!==null&&!ae.forceDisallow_}static previouslyFailed(){return je.isInMemoryStorage||je.get("previous_websocket_failure")===!0}markConnectionHealthy(){je.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Ht(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=H(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Po(n,Ou);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Fu))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ae.responsesRequiredToBeHealthy=2;ae.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{static get ALL_TRANSPORTS(){return[at,ae]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ae&&ae.isAvailable();let i=n&&!ae.previouslyFailed();if(e.webSocketOnly&&(n||X("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ae];else{const s=this.transports_=[];for(const r of Yt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Yt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Yt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu=6e4,Uu=5e3,Wu=10*1024,Hu=100*1024,hi="t",br="d",Vu="s",Ir="r",$u="e",Sr="o",Tr="a",kr="n",Nr="p",Yu="h";class zu{constructor(e,n,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=nn("c:"+this.id+":"),this.transportManager_=new Yt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Mt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Hu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Wu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(hi in e){const n=e[hi];n===Tr?this.upgradeIfSecondaryHealthy_():n===Ir?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Sr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=kt("t",e),i=kt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Nr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Tr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:kr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=kt("t",e),i=kt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=kt(hi,e);if(br in e){const i=e[br];if(n===Yu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===kr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Vu?this.onConnectionShutdown_(i):n===Ir?this.onReset_(i):n===$u?Ai("Server Error: "+i):n===Sr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ai("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),cs!==i&&X("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),Mt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Bu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Mt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Uu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Nr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(je.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends Qo{static getInstance(){return new bn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!vo()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr=32,Ar=768;class T{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function b(){return new T("")}function C(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Be(t){return t.pieces_.length-t.pieceNum_}function A(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new T(t.pieces_,e)}function hs(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Gu(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function zt(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Xo(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new T(e,0)}function F(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof T)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new T(n,0)}function w(t){return t.pieceNum_>=t.pieces_.length}function Q(t,e){const n=C(t),i=C(e);if(n===null)return e;if(n===i)return Q(A(t),A(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function qu(t,e){const n=zt(t,0),i=zt(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=nt(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function fs(t,e){if(Be(t)!==Be(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function te(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Be(t)>Be(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class ju{constructor(e,n){this.errorPrefix_=n,this.parts_=zt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Wn(this.parts_[i]);Jo(this)}}function Ku(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Wn(e),Jo(t)}function Qu(t){const e=t.parts_.pop();t.byteLength_-=Wn(e),t.parts_.length>0&&(t.byteLength_-=1)}function Jo(t){if(t.byteLength_>Ar)throw new Error(t.errorPrefix_+"has a key path longer than "+Ar+" bytes ("+t.byteLength_+").");if(t.parts_.length>Rr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Rr+") or object contains a cycle "+Ge(t))}function Ge(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps extends Qo{static getInstance(){return new ps}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt=1e3,Xu=300*1e3,Pr=30*1e3,Ju=1.3,Zu=3e4,ed="server_kill",xr=3;class Ee extends Ko{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Ee.nextPersistentConnectionId_++,this.log_=nn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Nt,this.maxReconnectDelay_=Xu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ps.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&bn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(H(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Zt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Ee.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&_e(e,"w")){const i=pt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();X(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Hl(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Pr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Wl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+H(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ai("Unrecognized action received from server: "+H(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Nt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Nt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Zu&&(this.reconnectDelay_=Nt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ju)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Ee.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,u]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?z("getToken() completed but was canceled"):(z("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=u&&u.token,a=new zu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{X(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(ed)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&X(h),l())}}}interrupt(e){z("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){z("Resuming connection for reason: "+e),delete this.interruptReasons_[e],ar(this.interruptReasons_)&&(this.reconnectDelay_=Nt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>ls(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new T(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){z("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=xr&&(this.reconnectDelay_=Pr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){z("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=xr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+No.replace(/\./g,"-")]=1,vo()?e["framework.cordova"]=1:Dl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=bn.getInstance().currentlyOnline();return ar(this.interruptReasons_)&&e}}Ee.nextPersistentConnectionId_=0;Ee.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new E(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new E(_t,e),s=new E(_t,n);return this.compare(i,s)!==0}minPost(){return E.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dn;class Zo extends Hn{static get __EMPTY_NODE(){return dn}static set __EMPTY_NODE(e){dn=e}compare(e,n){return nt(e.name,n.name)}isDefinedOn(e){throw bt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return E.MIN}maxPost(){return new E(Je,dn)}makePost(e,n){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,dn)}toString(){return".key"}}const dt=new Zo;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ${constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??$.RED,this.left=s??J.EMPTY_NODE,this.right=r??J.EMPTY_NODE}copy(e,n,i,s,r){return new $(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return J.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return J.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,$.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,$.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}$.RED=!0;$.BLACK=!1;class td{copy(e,n,i,s,r){return this}insert(e,n,i){return new $(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class J{constructor(e,n=J.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new J(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,$.BLACK,null,null))}remove(e){return new J(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,$.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new hn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new hn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new hn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new hn(this.root_,null,this.comparator_,!0,e)}}J.EMPTY_NODE=new td;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nd(t,e){return nt(t.name,e.name)}function _s(t,e){return nt(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi;function id(t){xi=t}const ea=function(t){return typeof t=="number"?"number:"+xo(t):"string:"+t},ta=function(t){if(t.isLeafNode()){const e=t.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&_e(e,".sv"),"Priority must be a string or number.")}else p(t===xi||t.isEmpty(),"priority of unexpected type.");p(t===xi||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dr;class V{static set __childrenNodeConstructor(e){Dr=e}static get __childrenNodeConstructor(){return Dr}constructor(e,n=V.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ta(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new V(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:V.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return w(e)?this:C(e)===".priority"?this.priorityNode_:V.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:V.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=C(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Be(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,V.__childrenNodeConstructor.EMPTY_NODE.updateChild(A(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ea(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=xo(this.value_):e+=this.value_,this.lazyHash_=Ao(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===V.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof V.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=V.VALUE_TYPE_ORDER.indexOf(n),r=V.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+n),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}V.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let na,ia;function sd(t){na=t}function rd(t){ia=t}class od extends Hn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?nt(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return E.MIN}maxPost(){return new E(Je,new V("[PRIORITY-POST]",ia))}makePost(e,n){const i=na(e);return new E(n,new V("[PRIORITY-POST]",i))}toString(){return".priority"}}const B=new od;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad=Math.log(2);class ld{constructor(e){const n=r=>parseInt(Math.log(r)/ad,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const In=function(t,e,n,i){t.sort(e);const s=function(l,c){const d=c-l;let h,u;if(d===0)return null;if(d===1)return h=t[l],u=n?n(h):h,new $(u,h.node,$.BLACK,null,null);{const f=parseInt(d/2,10)+l,_=s(l,f),m=s(f+1,c);return h=t[f],u=n?n(h):h,new $(u,h.node,$.BLACK,_,m)}},r=function(l){let c=null,d=null,h=t.length;const u=function(_,m){const y=h-_,ee=h;h-=_;const ge=s(y+1,ee),Ve=t[y],ri=n?n(Ve):Ve;f(new $(ri,Ve.node,m,null,ge))},f=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const m=l.nextBitIsOne(),y=Math.pow(2,l.count-(_+1));m?u(y,$.BLACK):(u(y,$.BLACK),u(y,$.RED))}return d},o=new ld(t.length),a=r(o);return new J(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fi;const ot={};class ve{static get Default(){return p(ot&&B,"ChildrenNode.ts has not been loaded"),fi=fi||new ve({".priority":ot},{".priority":B}),fi}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=pt(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof J?n:null}hasIndex(e){return _e(this.indexSet_,e.toString())}addIndex(e,n){p(e!==dt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(E.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=In(i,e.getCompare()):a=ot;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new ve(d,c)}addToIndexes(e,n){const i=yn(this.indexes_,(s,r)=>{const o=pt(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===ot)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),In(a,o.getCompare())}else return ot;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new ve(i,this.indexSet_)}removeFromIndexes(e,n){const i=yn(this.indexes_,s=>{if(s===ot)return s;{const r=n.get(e.name);return r?s.remove(new E(e.name,r)):s}});return new ve(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rt;class g{static get EMPTY_NODE(){return Rt||(Rt=new g(new J(_s),null,ve.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&ta(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Rt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Rt:n}}getChild(e){const n=C(e);return n===null?this:this.getImmediateChild(n).getChild(A(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(p(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new E(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Rt:this.priorityNode_;return new g(s,o,r)}}updateChild(e,n){const i=C(e);if(i===null)return n;{p(C(e)!==".priority"||Be(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(A(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(B,(o,a)=>{n[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ea(this.getPriority().val())+":"),this.forEachChild(B,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Ao(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new E(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new E(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new E(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===sn?-1:0}withIndex(e){if(e===dt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===dt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(B),s=n.getIterator(B);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===dt?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class cd extends g{constructor(){super(new J(_s),g.EMPTY_NODE,ve.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const sn=new cd;Object.defineProperties(E,{MIN:{value:new E(_t,g.EMPTY_NODE)},MAX:{value:new E(Je,sn)}});Zo.__EMPTY_NODE=g.EMPTY_NODE;V.__childrenNodeConstructor=g;id(sn);rd(sn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud=!0;function W(t,e=null){if(t===null)return g.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new V(n,W(e))}if(!(t instanceof Array)&&ud){const n=[];let i=!1;if(q(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=W(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new E(o,l)))}}),n.length===0)return g.EMPTY_NODE;const r=In(n,nd,o=>o.name,_s);if(i){const o=In(n,B.getCompare());return new g(r,W(e),new ve({".priority":o},{".priority":B}))}else return new g(r,W(e),ve.Default)}else{let n=g.EMPTY_NODE;return q(t,(i,s)=>{if(_e(t,i)&&i.substring(0,1)!=="."){const r=W(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(W(e))}}sd(W);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd extends Hn{constructor(e){super(),this.indexPath_=e,p(!w(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?nt(e.name,n.name):r}makePost(e,n){const i=W(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new E(n,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,sn);return new E(Je,e)}toString(){return zt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd extends Hn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?nt(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,n){const i=W(e);return new E(n,i)}toString(){return".value"}}const fd=new hd;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sa(t){return{type:"value",snapshotNode:t}}function mt(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Gt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function qt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function pd(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Gt(n,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(mt(n,i)):o.trackChildChange(qt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(B,(s,r)=>{n.hasChild(s)||i.trackChildChange(Gt(s,r))}),n.isLeafNode()||n.forEachChild(B,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(qt(s,r,o))}else i.trackChildChange(mt(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e){this.indexedFilter_=new ms(e.getIndex()),this.index_=e.getIndex(),this.startPost_=jt.getStartPost_(e),this.endPost_=jt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new E(n,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=g.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return n.forEachChild(B,(o,a)=>{r.matches(new E(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new jt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new E(n,i))||(i=g.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(u,f)=>h(f,u)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new E(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let u=s.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===n||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,l);if(d&&!i.isEmpty()&&f>=0)return r?.trackChildChange(qt(n,i,h)),a.updateImmediateChild(n,i);{r?.trackChildChange(Gt(n,h));const m=a.updateImmediateChild(n,g.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(mt(u.name,u.node)),m.updateImmediateChild(u.name,u.node)):m}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Gt(c.name,c.node)),r.trackChildChange(mt(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=B}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:_t}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Je}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===B}copy(){const e=new gs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function md(t){return t.loadsAllData()?new ms(t.getIndex()):t.hasLimit()?new _d(t):new jt(t)}function Mr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===B?n="$priority":t.index_===fd?n="$value":t.index_===dt?n="$key":(p(t.index_ instanceof dd,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=H(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=H(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+H(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=H(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+H(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Lr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==B&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn extends Ko{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=nn("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Sn.getListenId_(e,i),a={};this.listens_[o]=a;const l=Mr(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),pt(this.listens_,o)===a){let u;c?c===401?u="permission_denied":u="rest_error:"+c:u="ok",s(u,null)}})}unlisten(e,n){const i=Sn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Mr(e._queryParams),i=e._path.toString(),s=new Zt;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Vl(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Ht(a.responseText)}catch{X("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&X("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(){return{value:null,children:new Map}}function ra(t,e,n){if(w(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=C(e);t.children.has(i)||t.children.set(i,Tn());const s=t.children.get(i);e=A(e),ra(s,e,n)}}function Di(t,e,n){t.value!==null?n(e,t.value):yd(t,(i,s)=>{const r=new T(e.toString()+"/"+i);Di(s,r,n)})}function yd(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&q(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or=10*1e3,Cd=30*1e3,Ed=300*1e3;class wd{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new vd(e);const i=Or+(Cd-Or)*Math.random();Mt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;q(e,(s,r)=>{r>0&&_e(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),Mt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Ed))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var le;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(le||(le={}));function ys(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function vs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Cs(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=le.ACK_USER_WRITE,this.source=ys()}operationForChild(e){if(w(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new T(e));return new kn(b(),n,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new kn(A(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,n){this.source=e,this.path=n,this.type=le.LISTEN_COMPLETE}operationForChild(e){return w(this.path)?new Kt(this.source,b()):new Kt(this.source,A(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ze{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=le.OVERWRITE}operationForChild(e){return w(this.path)?new Ze(this.source,b(),this.snap.getImmediateChild(e)):new Ze(this.source,A(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=le.MERGE}operationForChild(e){if(w(this.path)){const n=this.children.subtree(new T(e));return n.isEmpty()?null:n.value?new Ze(this.source,b(),n.value):new gt(this.source,b(),n)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new gt(this.source,A(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(w(e))return this.isFullyInitialized()&&!this.filtered_;const n=C(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Id(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(pd(o.childName,o.snapshotNode))}),At(t,s,"child_removed",e,i,n),At(t,s,"child_added",e,i,n),At(t,s,"child_moved",r,i,n),At(t,s,"child_changed",e,i,n),At(t,s,"value",e,i,n),s}function At(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>Td(t,a,l)),o.forEach(a=>{const l=Sd(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Sd(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Td(t,e,n){if(e.childName==null||n.childName==null)throw bt("Should only compare child_ events.");const i=new E(e.childName,e.snapshotNode),s=new E(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(t,e){return{eventCache:t,serverCache:e}}function Lt(t,e,n,i){return Vn(new Ue(e,n,i),t.serverCache)}function oa(t,e,n,i){return Vn(t.eventCache,new Ue(e,n,i))}function Nn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function et(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pi;const kd=()=>(pi||(pi=new J(du)),pi);class k{static fromObject(e){let n=new k(null);return q(e,(i,s)=>{n=n.set(new T(i),s)}),n}constructor(e,n=kd()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:b(),value:this.value};if(w(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(A(e),n);return r!=null?{path:F(new T(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(w(e))return this;{const n=C(e),i=this.children.get(n);return i!==null?i.subtree(A(e)):new k(null)}}set(e,n){if(w(e))return new k(n,this.children);{const i=C(e),r=(this.children.get(i)||new k(null)).set(A(e),n),o=this.children.insert(i,r);return new k(this.value,o)}}remove(e){if(w(e))return this.children.isEmpty()?new k(null):new k(null,this.children);{const n=C(e),i=this.children.get(n);if(i){const s=i.remove(A(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new k(null):new k(this.value,r)}else return this}}get(e){if(w(e))return this.value;{const n=C(e),i=this.children.get(n);return i?i.get(A(e)):null}}setTree(e,n){if(w(e))return n;{const i=C(e),r=(this.children.get(i)||new k(null)).setTree(A(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new k(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(F(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,b(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(w(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(A(e),F(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,b(),n)}foreachOnPath_(e,n,i){if(w(e))return this;{this.value&&i(n,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(A(e),F(n,s),i):new k(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(F(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.writeTree_=e}static empty(){return new ce(new k(null))}}function Ot(t,e,n){if(w(e))return new ce(new k(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=Q(s,e);return r=r.updateChild(o,n),new ce(t.writeTree_.set(s,r))}else{const s=new k(n),r=t.writeTree_.setTree(e,s);return new ce(r)}}}function Mi(t,e,n){let i=t;return q(n,(s,r)=>{i=Ot(i,F(e,s),r)}),i}function Fr(t,e){if(w(e))return ce.empty();{const n=t.writeTree_.setTree(e,new k(null));return new ce(n)}}function Li(t,e){return it(t,e)!=null}function it(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Q(n.path,e)):null}function Br(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(B,(i,s)=>{e.push(new E(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new E(i,s.value))}),e}function Le(t,e){if(w(e))return t;{const n=it(t,e);return n!=null?new ce(new k(n)):new ce(t.writeTree_.subtree(e))}}function Oi(t){return t.writeTree_.isEmpty()}function yt(t,e){return aa(b(),t.writeTree_,e)}function aa(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=aa(F(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(F(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(t,e){return da(e,t)}function Nd(t,e,n,i,s){p(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Ot(t.visibleWrites,e,n)),t.lastWriteId=i}function Rd(t,e,n,i){p(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=Mi(t.visibleWrites,e,n),t.lastWriteId=i}function Ad(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Pd(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);p(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&xd(a,i.path)?s=!1:te(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Dd(t),!0;if(i.snap)t.visibleWrites=Fr(t.visibleWrites,i.path);else{const a=i.children;q(a,l=>{t.visibleWrites=Fr(t.visibleWrites,F(i.path,l))})}return!0}else return!1}function xd(t,e){if(t.snap)return te(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&te(F(t.path,n),e))return!0;return!1}function Dd(t){t.visibleWrites=la(t.allWrites,Md,b()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Md(t){return t.visible}function la(t,e,n){let i=ce.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)te(n,o)?(a=Q(n,o),i=Ot(i,a,r.snap)):te(o,n)&&(a=Q(o,n),i=Ot(i,b(),r.snap.getChild(a)));else if(r.children){if(te(n,o))a=Q(n,o),i=Mi(i,a,r.children);else if(te(o,n))if(a=Q(o,n),w(a))i=Mi(i,b(),r.children);else{const l=pt(r.children,C(a));if(l){const c=l.getChild(A(a));i=Ot(i,b(),c)}}}else throw bt("WriteRecord should have .snap or .children")}}return i}function ca(t,e,n,i,s){if(!i&&!s){const r=it(t.visibleWrites,e);if(r!=null)return r;{const o=Le(t.visibleWrites,e);if(Oi(o))return n;if(n==null&&!Li(o,b()))return null;{const a=n||g.EMPTY_NODE;return yt(o,a)}}}else{const r=Le(t.visibleWrites,e);if(!s&&Oi(r))return n;if(!s&&n==null&&!Li(r,b()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(te(c.path,e)||te(e,c.path))},a=la(t.allWrites,o,e),l=n||g.EMPTY_NODE;return yt(a,l)}}}function Ld(t,e,n){let i=g.EMPTY_NODE;const s=it(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(B,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Le(t.visibleWrites,e);return n.forEachChild(B,(o,a)=>{const l=yt(Le(r,new T(o)),a);i=i.updateImmediateChild(o,l)}),Br(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Le(t.visibleWrites,e);return Br(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Od(t,e,n,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=F(e,n);if(Li(t.visibleWrites,r))return null;{const o=Le(t.visibleWrites,r);return Oi(o)?s.getChild(n):yt(o,s.getChild(n))}}function Fd(t,e,n,i){const s=F(e,n),r=it(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Le(t.visibleWrites,s);return yt(o,i.getNode().getImmediateChild(n))}else return null}function Bd(t,e){return it(t.visibleWrites,e)}function Ud(t,e,n,i,s,r,o){let a;const l=Le(t.visibleWrites,e),c=it(l,b());if(c!=null)a=c;else if(n!=null)a=yt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=u.getNext();for(;f&&d.length<s;)h(f,i)!==0&&d.push(f),f=u.getNext();return d}else return[]}function Wd(){return{visibleWrites:ce.empty(),allWrites:[],lastWriteId:-1}}function Rn(t,e,n,i){return ca(t.writeTree,t.treePath,e,n,i)}function Es(t,e){return Ld(t.writeTree,t.treePath,e)}function Ur(t,e,n,i){return Od(t.writeTree,t.treePath,e,n,i)}function An(t,e){return Bd(t.writeTree,F(t.treePath,e))}function Hd(t,e,n,i,s,r){return Ud(t.writeTree,t.treePath,e,n,i,s,r)}function ws(t,e,n){return Fd(t.writeTree,t.treePath,e,n)}function ua(t,e){return da(F(t.treePath,e),t.writeTree)}function da(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;p(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,qt(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Gt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,mt(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,qt(i,e.snapshotNode,s.oldSnap));else throw bt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const ha=new $d;class bs{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Ue(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ws(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:et(this.viewCache_),r=Hd(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(t){return{filter:t}}function zd(t,e){p(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Gd(t,e,n,i,s){const r=new Vd;let o,a;if(n.type===le.OVERWRITE){const c=n;c.source.fromUser?o=Fi(t,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!w(c.path),o=Pn(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===le.MERGE){const c=n;c.source.fromUser?o=jd(t,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Bi(t,e,c.path,c.children,i,s,a,r))}else if(n.type===le.ACK_USER_WRITE){const c=n;c.revert?o=Xd(t,e,c.path,i,s,r):o=Kd(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===le.LISTEN_COMPLETE)o=Qd(t,e,n.path,i,r);else throw bt("Unknown operation type: "+n.type);const l=r.getChanges();return qd(e,o,l),{viewCache:o,changes:l}}function qd(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Nn(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(sa(Nn(e)))}}function fa(t,e,n,i,s,r){const o=e.eventCache;if(An(i,n)!=null)return e;{let a,l;if(w(n))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=et(e),d=c instanceof g?c:g.EMPTY_NODE,h=Es(i,d);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Rn(i,et(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(n);if(c===".priority"){p(Be(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=Ur(i,n,d,l);h!=null?a=t.filter.updatePriority(d,h):a=o.getNode()}else{const d=A(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const u=Ur(i,n,o.getNode(),l);u!=null?h=o.getNode().getImmediateChild(c).updateChild(d,u):h=o.getNode().getImmediateChild(c)}else h=ws(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,d,s,r):a=o.getNode()}}return Lt(e,a,o.isFullyInitialized()||w(n),t.filter.filtersNodes())}}function Pn(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(w(n))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(n,i);c=d.updateFullNode(l.getNode(),f,null)}else{const f=C(n);if(!l.isCompleteForPath(n)&&Be(n)>1)return e;const _=A(n),y=l.getNode().getImmediateChild(f).updateChild(_,i);f===".priority"?c=d.updatePriority(l.getNode(),y):c=d.updateChild(l.getNode(),f,y,_,ha,null)}const h=oa(e,c,l.isFullyInitialized()||w(n),d.filtersNodes()),u=new bs(s,h,r);return fa(t,h,n,s,u,a)}function Fi(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const d=new bs(s,e,r);if(w(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=Lt(e,c,!0,t.filter.filtersNodes());else{const h=C(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=Lt(e,c,a.isFullyInitialized(),a.isFiltered());else{const u=A(n),f=a.getNode().getImmediateChild(h);let _;if(w(u))_=i;else{const m=d.getCompleteChild(h);m!=null?hs(u)===".priority"&&m.getChild(Xo(u)).isEmpty()?_=m:_=m.updateChild(u,i):_=g.EMPTY_NODE}if(f.equals(_))l=e;else{const m=t.filter.updateChild(a.getNode(),h,_,u,d,o);l=Lt(e,m,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function Wr(t,e){return t.eventCache.isCompleteForChild(e)}function jd(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=F(n,l);Wr(e,C(d))&&(a=Fi(t,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=F(n,l);Wr(e,C(d))||(a=Fi(t,a,d,c,s,r,o))}),a}function Hr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Bi(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;w(n)?c=i:c=new k(null).setTree(n,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,u)=>{if(d.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),_=Hr(t,f,u);l=Pn(t,l,new T(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,u)=>{const f=!e.serverCache.isCompleteForChild(h)&&u.value===null;if(!d.hasChild(h)&&!f){const _=e.serverCache.getNode().getImmediateChild(h),m=Hr(t,_,u);l=Pn(t,l,new T(h),m,s,r,o,a)}}),l}function Kd(t,e,n,i,s,r,o){if(An(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(w(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Pn(t,e,n,l.getNode().getChild(n),s,r,a,o);if(w(n)){let c=new k(null);return l.getNode().forEachChild(dt,(d,h)=>{c=c.set(new T(d),h)}),Bi(t,e,n,c,s,r,a,o)}else return e}else{let c=new k(null);return i.foreach((d,h)=>{const u=F(n,d);l.isCompleteForPath(u)&&(c=c.set(d,l.getNode().getChild(u)))}),Bi(t,e,n,c,s,r,a,o)}}function Qd(t,e,n,i,s){const r=e.serverCache,o=oa(e,r.getNode(),r.isFullyInitialized()||w(n),r.isFiltered());return fa(t,o,n,i,ha,s)}function Xd(t,e,n,i,s,r){let o;if(An(i,n)!=null)return e;{const a=new bs(i,e,s),l=e.eventCache.getNode();let c;if(w(n)||C(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=Rn(i,et(e));else{const h=e.serverCache.getNode();p(h instanceof g,"serverChildren would be complete if leaf node"),d=Es(i,h)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=C(n);let h=ws(i,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=t.filter.updateChild(l,d,h,A(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,g.EMPTY_NODE,A(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Rn(i,et(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||An(i,b())!=null,Lt(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jd{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new ms(i.getIndex()),r=md(i);this.processor_=Yd(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),d=new Ue(l,o.isFullyInitialized(),s.filtersNodes()),h=new Ue(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Vn(h,d),this.eventGenerator_=new bd(this.query_)}get query(){return this.query_}}function Zd(t){return t.viewCache_.serverCache.getNode()}function eh(t){return Nn(t.viewCache_)}function th(t,e){const n=et(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!w(e)&&!n.getImmediateChild(C(e)).isEmpty())?n.getChild(e):null}function Vr(t){return t.eventRegistrations_.length===0}function nh(t,e){t.eventRegistrations_.push(e)}function $r(t,e,n){const i=[];if(n){p(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Yr(t,e,n,i){e.type===le.MERGE&&e.source.queryId!==null&&(p(et(t.viewCache_),"We should always have a full cache before handling merges"),p(Nn(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Gd(t.processor_,s,e,n,i);return zd(t.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,pa(t,r.changes,r.viewCache.eventCache.getNode(),null)}function ih(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(B,(r,o)=>{i.push(mt(r,o))}),n.isFullyInitialized()&&i.push(sa(n.getNode())),pa(t,i,n.getNode(),e)}function pa(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Id(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xn;class _a{constructor(){this.views=new Map}}function sh(t){p(!xn,"__referenceConstructor has already been defined"),xn=t}function rh(){return p(xn,"Reference.ts has not been loaded"),xn}function oh(t){return t.views.size===0}function Is(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Yr(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Yr(o,e,n,i));return r}}function ma(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Rn(n,s?i:null),l=!1;a?l=!0:i instanceof g?(a=Es(n,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=Vn(new Ue(a,l,!1),new Ue(i,s,!1));return new Jd(e,c)}return o}function ah(t,e,n,i,s,r){const o=ma(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),nh(o,n),ih(o,n)}function lh(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=We(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat($r(c,n,i)),Vr(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat($r(l,n,i)),Vr(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!We(t)&&r.push(new(rh())(e._repo,e._path)),{removed:r,events:o}}function ga(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Oe(t,e){let n=null;for(const i of t.views.values())n=n||th(i,e);return n}function ya(t,e){if(e._queryParams.loadsAllData())return Yn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function va(t,e){return ya(t,e)!=null}function We(t){return Yn(t)!=null}function Yn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Dn;function ch(t){p(!Dn,"__referenceConstructor has already been defined"),Dn=t}function uh(){return p(Dn,"Reference.ts has not been loaded"),Dn}let dh=1;class zr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new k(null),this.pendingWriteTree_=Wd(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ca(t,e,n,i,s){return Nd(t.pendingWriteTree_,e,n,i,s),s?St(t,new Ze(ys(),e,n)):[]}function hh(t,e,n,i){Rd(t.pendingWriteTree_,e,n,i);const s=k.fromObject(n);return St(t,new gt(ys(),e,s))}function Re(t,e,n=!1){const i=Ad(t.pendingWriteTree_,e);if(Pd(t.pendingWriteTree_,e)){let r=new k(null);return i.snap!=null?r=r.set(b(),!0):q(i.children,o=>{r=r.set(new T(o),!0)}),St(t,new kn(i.path,r,n))}else return[]}function rn(t,e,n){return St(t,new Ze(vs(),e,n))}function fh(t,e,n){const i=k.fromObject(n);return St(t,new gt(vs(),e,i))}function ph(t,e){return St(t,new Kt(vs(),e))}function _h(t,e,n){const i=Ts(t,n);if(i){const s=ks(i),r=s.path,o=s.queryId,a=Q(r,e),l=new Kt(Cs(o),a);return Ns(t,r,l)}else return[]}function Mn(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||va(o,e))){const l=lh(o,e,n,i);oh(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(u=>u._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(u,f)=>We(f));if(d&&!h){const u=t.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=yh(u);for(let _=0;_<f.length;++_){const m=f[_],y=m.query,ee=Ia(t,m);t.listenProvider_.startListening(Ft(y),Qt(t,y),ee.hashFn,ee.onComplete)}}}!h&&c.length>0&&!i&&(d?t.listenProvider_.stopListening(Ft(e),null):c.forEach(u=>{const f=t.queryToTagMap.get(zn(u));t.listenProvider_.stopListening(Ft(u),f)}))}vh(t,c)}return a}function Ea(t,e,n,i){const s=Ts(t,i);if(s!=null){const r=ks(s),o=r.path,a=r.queryId,l=Q(o,e),c=new Ze(Cs(a),l,n);return Ns(t,o,c)}else return[]}function mh(t,e,n,i){const s=Ts(t,i);if(s){const r=ks(s),o=r.path,a=r.queryId,l=Q(o,e),c=k.fromObject(n),d=new gt(Cs(a),l,c);return Ns(t,o,d)}else return[]}function Ui(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(u,f)=>{const _=Q(u,s);r=r||Oe(f,_),o=o||We(f)});let a=t.syncPointTree_.get(s);a?(o=o||We(a),r=r||Oe(a,b())):(a=new _a,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,_)=>{const m=Oe(_,b());m&&(r=r.updateImmediateChild(f,m))}));const c=va(a,e);if(!c&&!e._queryParams.loadsAllData()){const u=zn(e);p(!t.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=Ch();t.queryToTagMap.set(u,f),t.tagToQueryMap.set(f,u)}const d=$n(t.pendingWriteTree_,s);let h=ah(a,e,n,d,r,l);if(!c&&!o&&!i){const u=ya(a,e);h=h.concat(Eh(t,e,u))}return h}function Ss(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=Q(o,e),c=Oe(a,l);if(c)return c});return ca(s,e,r,n,!0)}function gh(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const h=Q(c,n);i=i||Oe(d,h)});let s=t.syncPointTree_.get(n);s?i=i||Oe(s,b()):(s=new _a,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new Ue(i,!0,!1):null,a=$n(t.pendingWriteTree_,e._path),l=ma(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return eh(l)}function St(t,e){return wa(e,t.syncPointTree_,null,$n(t.pendingWriteTree_,b()))}function wa(t,e,n,i){if(w(t.path))return ba(t,e,n,i);{const s=e.get(b());n==null&&s!=null&&(n=Oe(s,b()));let r=[];const o=C(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=ua(i,o);r=r.concat(wa(a,l,c,d))}return s&&(r=r.concat(Is(s,t,i,n))),r}}function ba(t,e,n,i){const s=e.get(b());n==null&&s!=null&&(n=Oe(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=ua(i,o),d=t.operationForChild(o);d&&(r=r.concat(ba(d,a,l,c)))}),s&&(r=r.concat(Is(s,t,i,n))),r}function Ia(t,e){const n=e.query,i=Qt(t,n);return{hashFn:()=>(Zd(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?_h(t,n._path,i):ph(t,n._path);{const r=pu(s,n);return Mn(t,n,null,r)}}}}function Qt(t,e){const n=zn(e);return t.queryToTagMap.get(n)}function zn(t){return t._path.toString()+"$"+t._queryIdentifier}function Ts(t,e){return t.tagToQueryMap.get(e)}function ks(t){const e=t.indexOf("$");return p(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new T(t.substr(0,e))}}function Ns(t,e,n){const i=t.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=$n(t.pendingWriteTree_,e);return Is(i,n,s,null)}function yh(t){return t.fold((e,n,i)=>{if(n&&We(n))return[Yn(n)];{let s=[];return n&&(s=ga(n)),q(i,(r,o)=>{s=s.concat(o)}),s}})}function Ft(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(uh())(t._repo,t._path):t}function vh(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=zn(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Ch(){return dh++}function Eh(t,e,n){const i=e._path,s=Qt(t,e),r=Ia(t,n),o=t.listenProvider_.startListening(Ft(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)p(!We(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!w(c)&&d&&We(d))return[Yn(d).query];{let u=[];return d&&(u=u.concat(ga(d).map(f=>f.query))),q(h,(f,_)=>{u=u.concat(_)}),u}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(Ft(d),Qt(t,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Rs(n)}node(){return this.node_}}class As{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=F(this.path_,e);return new As(this.syncTree_,n)}node(){return Ss(this.syncTree_,this.path_)}}const wh=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Gr=function(t,e,n){if(!t||typeof t!="object")return t;if(p(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return bh(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Ih(t[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},bh=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:p(!1,"Unexpected server value: "+t)}},Ih=function(t,e,n){t.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Sa=function(t,e,n,i){return Ps(e,new As(n,t),i)},Ta=function(t,e,n){return Ps(t,new Rs(e),n)};function Ps(t,e,n){const i=t.getPriority().val(),s=Gr(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Gr(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new V(a,W(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new V(s))),o.forEachChild(B,(a,l)=>{const c=Ps(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Ds(t,e){let n=e instanceof T?e:new T(e),i=t,s=C(n);for(;s!==null;){const r=pt(i.node.children,s)||{children:{},childCount:0};i=new xs(s,i,r),n=A(n),s=C(n)}return i}function Tt(t){return t.node.value}function ka(t,e){t.node.value=e,Wi(t)}function Na(t){return t.node.childCount>0}function Sh(t){return Tt(t)===void 0&&!Na(t)}function Gn(t,e){q(t.node.children,(n,i)=>{e(new xs(n,t,i))})}function Ra(t,e,n,i){n&&e(t),Gn(t,s=>{Ra(s,e,!0)})}function Th(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function on(t){return new T(t.parent===null?t.name:on(t.parent)+"/"+t.name)}function Wi(t){t.parent!==null&&kh(t.parent,t.name,t)}function kh(t,e,n){const i=Sh(n),s=_e(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Wi(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Wi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=/[\[\].#$\/\u0000-\u001F\u007F]/,Rh=/[\[\].#$\u0000-\u001F\u007F]/,_i=10*1024*1024,Ms=function(t){return typeof t=="string"&&t.length!==0&&!Nh.test(t)},Aa=function(t){return typeof t=="string"&&t.length!==0&&!Rh.test(t)},Ah=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Aa(t)},Ph=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!as(t)||t&&typeof t=="object"&&_e(t,".sv")},Pa=function(t,e,n,i){i&&e===void 0||qn(Un(t,"value"),e,n)},qn=function(t,e,n){const i=n instanceof T?new ju(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Ge(i));if(typeof e=="function")throw new Error(t+"contains a function "+Ge(i)+" with contents = "+e.toString());if(as(e))throw new Error(t+"contains "+e.toString()+" "+Ge(i));if(typeof e=="string"&&e.length>_i/3&&Wn(e)>_i)throw new Error(t+"contains a string greater than "+_i+" utf8 bytes "+Ge(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(q(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ms(o)))throw new Error(t+" contains an invalid key ("+o+") "+Ge(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Ku(i,o),qn(t,a,i),Qu(i)}),s&&r)throw new Error(t+' contains ".value" child '+Ge(i)+" in addition to actual children.")}},xh=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=zt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ms(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(qu);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&te(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Dh=function(t,e,n,i){const s=Un(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];q(e,(o,a)=>{const l=new T(o);if(qn(s,a,F(n,l)),hs(l)===".priority"&&!Ph(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),xh(s,r)},xa=function(t,e,n,i){if(!Aa(n))throw new Error(Un(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Mh=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),xa(t,e,n)},Ls=function(t,e){if(C(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Lh=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ms(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Ah(n))throw new Error(Un(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function jn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!fs(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function Da(t,e,n){jn(t,n),Ma(t,i=>fs(i,e))}function se(t,e,n){jn(t,n),Ma(t,i=>te(i,e)||te(e,i))}function Ma(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Fh(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Fh(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();Dt&&z("event: "+n.toString()),It(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh="repo_interrupt",Uh=25;class Wh{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Oh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Tn(),this.transactionQueueTree_=new xs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Hh(t,e,n){if(t.stats_=us(t.repoInfo_),t.forceRestClient_||yu())t.server_=new Sn(t.repoInfo_,(i,s,r,o)=>{qr(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>jr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{H(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new Ee(t.repoInfo_,e,(i,s,r,o)=>{qr(t,i,s,r,o)},i=>{jr(t,i)},i=>{Vh(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=bu(t.repoInfo_,()=>new wd(t.stats_,t.server_)),t.infoData_=new gd,t.infoSyncTree_=new zr({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=rn(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Os(t,"connected",!1),t.serverSyncTree_=new zr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);se(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function La(t){const n=t.infoData_.getNode(new T(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Kn(t){return wh({timestamp:La(t)})}function qr(t,e,n,i,s){t.dataUpdateCount++;const r=new T(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=yn(n,c=>W(c));o=mh(t.serverSyncTree_,r,l,s)}else{const l=W(n);o=Ea(t.serverSyncTree_,r,l,s)}else if(i){const l=yn(n,c=>W(c));o=fh(t.serverSyncTree_,r,l)}else{const l=W(n);o=rn(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=vt(t,r)),se(t.eventQueue_,a,o)}function jr(t,e){Os(t,"connected",e),e===!1&&Gh(t)}function Vh(t,e){q(e,(n,i)=>{Os(t,n,i)})}function Os(t,e,n){const i=new T("/.info/"+e),s=W(n);t.infoData_.updateSnapshot(i,s);const r=rn(t.infoSyncTree_,i,s);se(t.eventQueue_,i,r)}function Fs(t){return t.nextWriteId_++}function $h(t,e,n){const i=gh(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=W(s).withIndex(e._queryParams.getIndex());Ui(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=rn(t.serverSyncTree_,e._path,r);else{const a=Qt(t.serverSyncTree_,e);o=Ea(t.serverSyncTree_,e._path,r,a)}return se(t.eventQueue_,e._path,o),Mn(t.serverSyncTree_,e,n,null,!0),r},s=>(an(t,"get for query "+H(e)+" failed: "+s),Promise.reject(new Error(s))))}function Yh(t,e,n,i,s){an(t,"set",{path:e.toString(),value:n,priority:i});const r=Kn(t),o=W(n,i),a=Ss(t.serverSyncTree_,e),l=Ta(o,a,r),c=Fs(t),d=Ca(t.serverSyncTree_,e,l,c,!0);jn(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(u,f)=>{const _=u==="ok";_||X("set at "+e+" failed: "+u);const m=Re(t.serverSyncTree_,c,!_);se(t.eventQueue_,e,m),Hi(t,s,u,f)});const h=Us(t,e);vt(t,h),se(t.eventQueue_,h,[])}function zh(t,e,n,i){an(t,"update",{path:e.toString(),value:n});let s=!0;const r=Kn(t),o={};if(q(n,(a,l)=>{s=!1,o[a]=Sa(F(e,a),W(l),t.serverSyncTree_,r)}),s)z("update() called with empty data.  Don't do anything."),Hi(t,i,"ok",void 0);else{const a=Fs(t),l=hh(t.serverSyncTree_,e,o,a);jn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const h=c==="ok";h||X("update at "+e+" failed: "+c);const u=Re(t.serverSyncTree_,a,!h),f=u.length>0?vt(t,e):e;se(t.eventQueue_,f,u),Hi(t,i,c,d)}),q(n,c=>{const d=Us(t,F(e,c));vt(t,d)}),se(t.eventQueue_,e,[])}}function Gh(t){an(t,"onDisconnectEvents");const e=Kn(t),n=Tn();Di(t.onDisconnect_,b(),(s,r)=>{const o=Sa(s,r,t.serverSyncTree_,e);ra(n,s,o)});let i=[];Di(n,b(),(s,r)=>{i=i.concat(rn(t.serverSyncTree_,s,r));const o=Us(t,s);vt(t,o)}),t.onDisconnect_=Tn(),se(t.eventQueue_,b(),i)}function qh(t,e,n){let i;C(e._path)===".info"?i=Ui(t.infoSyncTree_,e,n):i=Ui(t.serverSyncTree_,e,n),Da(t.eventQueue_,e._path,i)}function Oa(t,e,n){let i;C(e._path)===".info"?i=Mn(t.infoSyncTree_,e,n):i=Mn(t.serverSyncTree_,e,n),Da(t.eventQueue_,e._path,i)}function jh(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Bh)}function an(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),z(n,...e)}function Hi(t,e,n,i){e&&It(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Fa(t,e,n){return Ss(t.serverSyncTree_,e,n)||g.EMPTY_NODE}function Bs(t,e=t.transactionQueueTree_){if(e||Qn(t,e),Tt(e)){const n=Ua(t,e);p(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Kh(t,on(e),n)}else Na(e)&&Gn(e,n=>{Bs(t,n)})}function Kh(t,e,n){const i=n.map(c=>c.currentWriteId),s=Fa(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const d=n[c];p(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=Q(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{an(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let u=0;u<n.length;u++)n[u].status=2,d=d.concat(Re(t.serverSyncTree_,n[u].currentWriteId)),n[u].onComplete&&h.push(()=>n[u].onComplete(null,!0,n[u].currentOutputSnapshotResolved)),n[u].unwatcher();Qn(t,Ds(t.transactionQueueTree_,e)),Bs(t,t.transactionQueueTree_),se(t.eventQueue_,e,d);for(let u=0;u<h.length;u++)It(h[u])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{X("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}vt(t,e)}},o)}function vt(t,e){const n=Ba(t,e),i=on(n),s=Ua(t,n);return Qh(t,s,i),i}function Qh(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=Q(n,l.path);let d=!1,h;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,s=s.concat(Re(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Uh)d=!0,h="maxretry",s=s.concat(Re(t.serverSyncTree_,l.currentWriteId,!0));else{const u=Fa(t,l.path,o);l.currentInputSnapshot=u;const f=e[a].update(u.val());if(f!==void 0){qn("transaction failed: Data returned ",f,l.path);let _=W(f);typeof f=="object"&&f!=null&&_e(f,".priority")||(_=_.updatePriority(u.getPriority()));const y=l.currentWriteId,ee=Kn(t),ge=Ta(_,u,ee);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=ge,l.currentWriteId=Fs(t),o.splice(o.indexOf(y),1),s=s.concat(Ca(t.serverSyncTree_,l.path,ge,l.currentWriteId,l.applyLocally)),s=s.concat(Re(t.serverSyncTree_,y,!0))}else d=!0,h="nodata",s=s.concat(Re(t.serverSyncTree_,l.currentWriteId,!0))}se(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,(function(u){setTimeout(u,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}Qn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)It(i[a]);Bs(t,t.transactionQueueTree_)}function Ba(t,e){let n,i=t.transactionQueueTree_;for(n=C(e);n!==null&&Tt(i)===void 0;)i=Ds(i,n),e=A(e),n=C(e);return i}function Ua(t,e){const n=[];return Wa(t,e,n),n.sort((i,s)=>i.order-s.order),n}function Wa(t,e,n){const i=Tt(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Gn(e,s=>{Wa(t,s,n)})}function Qn(t,e){const n=Tt(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,ka(e,n.length>0?n:void 0)}Gn(e,i=>{Qn(t,i)})}function Us(t,e){const n=on(Ba(t,e)),i=Ds(t.transactionQueueTree_,e);return Th(i,s=>{mi(t,s)}),mi(t,i),Ra(i,s=>{mi(t,s)}),n}function mi(t,e){const n=Tt(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(p(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Re(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ka(e,void 0):n.length=r+1,se(t.eventQueue_,on(e),s);for(let o=0;o<i.length;o++)It(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xh(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Jh(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):X(`Invalid query segment '${n}' in query '${t}'`)}return e}const Kr=function(t,e){const n=Zh(t),i=n.namespace;n.domain==="firebase.com"&&Ie(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Ie("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||cu();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Vo(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new T(n.pathString)}},Zh=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(d,h)),d<h&&(s=Xh(t.substring(d,h)));const u=Jh(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ef=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Qr.charAt(n%64),n=Math.floor(n/64);p(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Qr.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+H(this.snapshot.exportVal())}}class Va{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Hs{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return w(this._path)?null:hs(this._path)}get ref(){return new me(this._repo,this._path)}get _queryIdentifier(){const e=Lr(this._queryParams),n=ls(e);return n==="{}"?"default":n}get _queryObject(){return Lr(this._queryParams)}isEqual(e){if(e=tt(e),!(e instanceof Hs))return!1;const n=this._repo===e._repo,i=fs(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Gu(this._path)}}class me extends Hs{constructor(e,n){super(e,n,new gs,!1)}get parent(){const e=Xo(this._path);return e===null?null:new me(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ct{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new T(e),i=Et(this.ref,e);return new Ct(this._node.getChild(n),i,B)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Ct(s,Et(this.ref,i),B)))}hasChild(e){const n=new T(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function re(t,e){return t=tt(t),t._checkNotDeleted("ref"),e!==void 0?Et(t._root,e):t._root}function Et(t,e){return t=tt(t),C(t._path)===null?Mh("child","path",e):xa("child","path",e),new me(t._repo,F(t._path,e))}function tf(t,e){t=tt(t),Ls("push",t._path),Pa("push",e,t._path,!0);const n=La(t._repo),i=ef(n),s=Et(t,i),r=Et(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Xr(t){return Ls("remove",t._path),ln(t,null)}function ln(t,e){t=tt(t),Ls("set",t._path),Pa("set",e,t._path,!1);const n=new Zt;return Yh(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function $a(t,e){Dh("update",e,t._path);const n=new Zt;return zh(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function nf(t){t=tt(t);const e=new Ws(()=>{}),n=new cn(e);return $h(t._repo,t,n).then(i=>new Ct(i,new me(t._repo,t._path),t._queryParams.getIndex()))}class cn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Ha("value",this,new Ct(e.snapshotNode,new me(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Va(this,e,n):null}matches(e){return e instanceof cn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Xn{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Va(this,e,n):null}createEvent(e,n){p(e.childName!=null,"Child events should have a childName.");const i=Et(new me(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Ha(e.type,this,new Ct(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Xn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Vs(t,e,n,i,s){const r=new Ws(n,void 0),o=e==="value"?new cn(r):new Xn(e,r);return qh(t._repo,t,o),()=>Oa(t._repo,t,o)}function Ya(t,e,n,i){return Vs(t,"value",e)}function za(t,e,n,i){return Vs(t,"child_added",e)}function sf(t,e,n,i){return Vs(t,"child_removed",e)}function Ga(t,e,n){let i=null;const s=n?new Ws(n):null;e==="value"?i=new cn(s):e&&(i=new Xn(e,s)),Oa(t._repo,t,i)}sh(me);ch(me);/**
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
 */const rf="FIREBASE_DATABASE_EMULATOR_HOST",Vi={};let of=!1;function af(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=rs(r);t.repoInfo_=new Vo(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function lf(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Ie("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),z("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Kr(r,s),a=o.repoInfo,l;typeof process<"u"&&gr&&(l=gr[rf]),l?(r=`http://${l}?ns=${a.namespace}`,o=Kr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Cu(t.name,t.options,e);Lh("Invalid Firebase Database URL",o),w(o.path)||Ie("Database URL must point to the root of a Firebase Database (not including a child path).");const d=uf(a,t,c,new vu(t,n));return new df(d,t)}function cf(t,e){const n=Vi[e];(!n||n[t.key]!==t)&&Ie(`Database ${e}(${t.repoInfo_}) has already been deleted.`),jh(t),delete n[t.key]}function uf(t,e,n,i){let s=Vi[e.name];s||(s={},Vi[e.name]=s);let r=s[t.toURLString()];return r&&Ie("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Wh(t,of,n,i),s[t.toURLString()]=r,r}class df{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Hh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new me(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(cf(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ie("Cannot call "+e+" on a deleted database.")}}function hf(t=Gc(),e){const n=Hc(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=Tl("database");i&&ff(n,...i)}return n}function ff(t,e,n,i={}){t=tt(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&vn(i,r.repoInfo_.emulatorOptions))return;Ie("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Ie('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new pn(pn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Nl(i.mockUserToken,t.app.options.projectId);o=new pn(a)}rs(e)&&(kl(e),Pl("Database",!0)),af(r,s,i,o)}/**
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
 */function pf(t){iu(zc),En(new Vt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return lf(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),ct(yr,vr,t),ct(yr,vr,"esm2020")}Ee.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Ee.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};pf();var _f="firebase",mf="12.4.0";/**
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
 */ct(_f,mf,"app");const gf={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},yf=So(gf),oe=hf(yf),$i=[];function $s(t,e,n){$i.push({ref:t,type:e,callback:n})}function vf(){$i.forEach(({ref:t,type:e,callback:n})=>{Ga(t,e,n)}),$i.length=0}function Yi(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=c=>{try{const d=c.target;if(t.contains(d))return;for(const h of o)if(h&&h.contains&&h.contains(d)||h===d)return;e(c)}catch(d){console.error("closeOnClickOutside handler error:",d)}},l=c=>{s&&c.key==="Escape"&&e(c)};return r.forEach(c=>document.addEventListener(c,a,{passive:!0})),s&&document.addEventListener("keydown",l),function(){r.forEach(d=>document.removeEventListener(d,a,{passive:!0})),s&&document.removeEventListener("keydown",l)}}function Cf(t,e,n={}){return Yi(t,e,{...n,events:["dblclick"]})}const Ys=t=>t?!0:(console.warn("Element not found."),!1),zs=t=>{if(Ys(t))return t.classList.contains("hidden")},I=t=>{Ys(t)&&t.classList.remove("hidden")},v=t=>{Ys(t)&&t.classList.add("hidden")},qa=t=>t.classList.contains("small-frame"),Qe=t=>{if(t&&!qa(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Ke=t=>{if(qa(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function zi(t){return document.pictureInPictureElement===t}const P=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let st=null,Se=null,pe=null,Gs=null,de=null,K=null,G=null,D=null,L=null,ne=null,ue=null,Te=null,rt=null,ht=null,Y=null,Xt=null,Jn=null,He=null,Zn=null,ei=null,ti=null,qs=null,js=null,Ks=null,Qs=null;function Jr(){st=P("lobby"),Se=P("create-link-btn"),pe=P("copy-link-btn"),Gs=P("videos"),de=P("local-video-el"),K=P("local-video-box"),G=P("remote-video-el"),D=P("remote-video-box"),L=P("shared-video-el"),ne=P("shared-video-box"),ue=P("chat-controls"),Te=P("call-btn"),rt=P("hang-up-btn"),ht=P("switch-camera-btn"),Y=P("install-btn"),Xt=P("status"),Jn=P("sync-status"),He=P("mute-btn"),Zn=P("fullscreen-partner-btn"),ei=P("mic-btn"),ti=P("camera-btn"),qs=P("app-pip-btn"),js=P("app-title-h1"),Ks=P("app-title-a"),Qs=P("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Jr):Jr();const ja=()=>({lobbyDiv:st,createLinkBtn:Se,copyLinkBtn:pe,videosWrapper:Gs,localVideoEl:de,localBoxEl:K,remoteVideoEl:G,remoteBoxEl:D,sharedVideoEl:L,sharedBoxEl:ne,chatControls:ue,callBtn:Te,hangUpBtn:rt,switchCameraBtn:ht,installBtn:Y,statusDiv:Xt,syncStatus:Jn,mutePartnerBtn:He,fullscreenPartnerBtn:Zn,micBtn:ei,cameraBtn:ti,appPipBtn:qs,appTitleH1:js,appTitleA:Ks,appTitleSpan:Qs});function Ka(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function Qa(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await Ka(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function Ef(){console.log("Initializing YouTube search elements...");const t=await Qa(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0?console.warn("Some YouTube elements not found:",n):console.log("All YouTube elements initialized successfully"),t}const wf=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return qs},get appTitleA(){return Ks},get appTitleH1(){return js},get appTitleSpan(){return Qs},get callBtn(){return Te},get cameraBtn(){return ti},get chatControls(){return ue},get copyLinkBtn(){return pe},get createLinkBtn(){return Se},get fullscreenPartnerBtn(){return Zn},getElements:ja,get hangUpBtn(){return rt},initializeYouTubeElements:Ef,get installBtn(){return Y},get lobbyDiv(){return st},get localBoxEl(){return K},get localVideoEl(){return de},get micBtn(){return ei},get mutePartnerBtn(){return He},get remoteBoxEl(){return D},get remoteVideoEl(){return G},robustElementAccess:Ka,get sharedBoxEl(){return ne},get sharedVideoEl(){return L},get statusDiv(){return Xt},get switchCameraBtn(){return ht},get syncStatus(){return Jn},get videosWrapper(){return Gs},waitForElements:Qa},Symbol.toStringTag,{value:"Module"}));function U(t){Xt?Xt.textContent=t:console.warn("Status div not found in the DOM.")}function Xa(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const c=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(y=>!Array.isArray(o)||!o.includes(y));function d(){I(t);try{typeof i=="function"&&i()}catch(y){console.warn("showHideOnInactivity onShow callback error:",y)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof s=="function"&&s()}catch(y){console.warn("showHideOnInactivity onHide callback error:",y)}a=null},e)}c.forEach(y=>n.addEventListener(y,d,{passive:!0}));function h(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(y){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",y)}}else d()}document.addEventListener("visibilitychange",h);function u(y){if(!y.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof s=="function"&&s()}catch(ee){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",ee)}}}n.addEventListener("mouseout",u);function f(y){if(r&&(y.key==="Escape"||y.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof s=="function"&&s()}catch(ee){console.warn("showHideOnInactivity onHide (esc) callback error:",ee)}}}document.addEventListener("keydown",f);function _(){a||d()}n.addEventListener("touchend",_,{passive:!0}),v(t);function m(){c.forEach(y=>n.removeEventListener(y,d)),document.removeEventListener("visibilitychange",h),n.removeEventListener("mouseout",u),n.removeEventListener("touchend",_),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return m}const wt=(t,e)=>{},Ja={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}},Gi={desktop:{landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"},portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:9/16},resizeMode:"none"}},mobile:{portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},aspectRatio:{ideal:9/16},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"},landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},aspectRatio:{ideal:16/9},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"}},relyOnBrowserDefaults:!0};function bf(){return window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180}function Xs(t){const e=bf()?"portrait":"landscape";return/Mobi|Android/i.test(navigator.userAgent)?{facingMode:t,...Gi.mobile[e]}:{facingMode:t,...Gi.desktop[e]}}function If(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Sf(){return If()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Tf(){const t=await Sf();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function kf({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user",r=Xs(s);try{const o=await navigator.mediaDevices.getUserMedia({video:r,audio:Ja.default}),a=o.getVideoTracks()[0],l=o.getAudioTracks()[0],c=t.getVideoTracks()[0],d=c?c.enabled:!0,h=t.getAudioTracks()[0],u=h?!h.enabled:!1;if(i){const f=i.getSenders().find(m=>m.track&&m.track.kind==="video");f&&f.replaceTrack(a);const _=i.getSenders().find(m=>m.track&&m.track.kind==="audio");_&&l&&_.replaceTrack(l)}return a&&(a.enabled=d),l&&(l.enabled=!u),t.getTracks().forEach(f=>f.stop()),e.srcObject=new MediaStream([a].filter(Boolean)),{newStream:o,facingMode:s}}catch(o){return console.error("Failed to switch camera:",o),null}}let gi=!1,$e=null,Ye=null;function Nf({getLocalStream:t,getFacingMode:e}){return $e&&Ye&&$e.removeEventListener("change",Ye),$e=window.matchMedia("(orientation: portrait)"),Ye=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";Rf({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},$e.addEventListener("change",Ye),()=>{$e&&Ye&&$e.removeEventListener("change",Ye),$e=null,Ye=null}}async function Rf({localStream:t,currentFacingMode:e}){if(!(gi||!t?.getVideoTracks()[0])){gi=!0;try{const n=t.getVideoTracks()[0],i=Xs(e);wt("Applying constraints:",i),await n.applyConstraints(i),wt("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{gi=!1}}}let qi=!1,Ln=[];function Af(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function Pf(t,e,n){n&&(n.muted=!t,n.volume=e)}function xf(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function Df(t,e){if(!t)return;const n=()=>{if(t.muted!==qi){const i=e.querySelector("i");i.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",qi=t.muted}};t.addEventListener("volumechange",n),Ln.push(()=>{t&&t.removeEventListener("volumechange",n)})}function Mf({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:l,fullscreenPartnerBtn:c}){r&&(r.onclick=()=>{const u=t(),f=e();if(!f||!u)return;const _=!f.muted;Af(!_,u),Pf(!_,0,f),xf(_,r)}),o&&(o.onclick=()=>{const u=t();if(!u)return;const f=u.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const _=o.querySelector("i");_.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});let d="user";const h=Nf({getLocalStream:t,getFacingMode:()=>d});Ln.push(h),a&&(a.onclick=async()=>{const u=await kf({localStream:t(),localVideo:e(),currentFacingMode:d,peerConnection:i()||null});u?(d=u.facingMode,console.log("Switched camera to facingMode:",d),u.newStream&&typeof s=="function"&&s(u.newStream)):console.error("Camera switch failed.")}),l&&(l.onclick=()=>{const u=n();u&&(u.muted=!u.muted)}),c&&(c.onclick=()=>{const u=n();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()})}function Lf(){Ln.forEach(t=>t()),Ln=[],qi=!1}const Zr="yt-video-box",ji="yt-player-root";let M=null,ke=!1;const Bt=()=>M,Of=()=>ke,Za=t=>ke=t,Xe=()=>{const t=document.getElementById(Zr);if(!t)throw new Error(`Container #${Zr} not found`);return t};function Ff(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function el(){const t=Xe();if(!document.getElementById(ji)){const e=document.createElement("div");e.id=ji,t.appendChild(e)}I(t)}function Ki(){const t=Xe();v(t)}function yi(){const t=Xe();return t&&!t.classList.contains("hidden")}function Qi(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function tl(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function Bf({url:t,onReady:e,onStateChange:n}){const i=tl(t);if(!i)throw new Error("Invalid YouTube URL");if(await Ff(),M){try{M.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}M=null}const s=(o=!0)=>{const a=Xe(),l=M.getIframe();if(l&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===l)try{l.blur()}catch{}}if(o){const c=d=>{if(d.code==="Space"){const h=Xe(),u=M.getIframe();if(document.activeElement===u||document.activeElement===h)return;d.preventDefault(),console.debug("Space pressed, refocusing iframe"),M.getPlayerState()!==window.YT.PlayerState.PLAYING?Zs():ni()}};document.addEventListener("keydown",c,{once:!0})}}},r=()=>{const o=Xe(),a=M.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return el(),new Promise((o,a)=>{try{M=new window.YT.Player(ji,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:l=>{ke=!0,e&&e(l),o(M)},onStateChange:l=>{l.data===window.YT.PlayerState.ENDED&&s(!1),l.data===window.YT.PlayerState.PAUSED&&s(),l.data===window.YT.PlayerState.PLAYING&&r(),n&&n(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function Js(){if(M){try{Ki(),M.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}M=null,ke=!1}}function Zs(){M&&ke&&M.playVideo()}function ni(){M&&ke&&M.pauseVideo()}function Uf(t){M&&ke&&M.seekTo(t,!0)}function On(){return M&&ke?M.getCurrentTime():0}function er(){return M&&ke?M.getPlayerState():-1}const Ae={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let we=null,ii=null,nl=!1,ie="none",tr=null;const un=()=>nl,il=t=>nl=t,Pt=()=>ie,Wf=t=>{["yt","url","none"].includes(t)?ie=t:console.warn("Invalid lastWatched platform:",t)};let Pe=!1,Ut=null,Wt=0;async function ft(t){if(!we)return;console.debug("Updating watch sync state, roomId:",we);const e=re(oe,`rooms/${we}/watch`);try{await $a(e,{...t,updatedBy:ii})}catch(n){console.error("Failed to update watch state:",n)}}function sl(t,e,n){if(!t)return;we=t,ii=n;const i=re(oe,`rooms/${t}/watch`);Ya(i,eo),$s(i,"value",eo),qf()}function eo(t){const e=t.val();e&&e.updatedBy!==ii&&(Date.now()-Wt<500||(e.url&&e.url!==tr&&Hf(e.url),e.isYouTube?Vf(e):Gf(e)))}function Hf(t){tr=t,Qi(t)?(v(ne),rl(t),ie="yt"):(Js(),I(ne),L.src=t,ie="url")}function Vf(t){!Bt()||!Of()||($f(t),Yf(t))}function $f(t){const e=er(),n=e===Ae.PLAYING;if([Ae.BUFFERING,Ae.UNSTARTED].includes(e)){zf();return}Pe||(t.playing&&!n?(Zs(),ie="yt"):!t.playing&&n&&(ni(),ie="yt"))}function Yf(t){if(t.currentTime===void 0)return;const e=On();Math.abs(e-t.currentTime)>.3&&!Pe&&(Uf(t.currentTime),setTimeout(()=>{t.playing?Zs():ni(),ie="yt"},500))}function zf(){Pe=!0,clearTimeout(Ut),Ut=setTimeout(async()=>{Pe=!1;const t=er()===Ae.PLAYING;await ft({playing:t,currentTime:On()})},700)}function Gf(t){t.playing!==void 0&&(t.playing&&L.paused?L.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!L.paused&&L.pause()),t.currentTime!==void 0&&Math.abs(L.currentTime-t.currentTime)>1&&(L.currentTime=t.currentTime,t.playing?L.play().catch(n=>console.warn("Play failed:",n)):L.pause())}function qf(){L.addEventListener("play",async()=>{!Bt()&&we&&(Wt=Date.now(),await ft({playing:!0,isYouTube:!1})),ie="url"}),L.addEventListener("pause",async()=>{!Bt()&&we&&(Wt=Date.now(),await ft({playing:!1,isYouTube:!1})),ie="url"}),L.addEventListener("seeked",async()=>{!Bt()&&we&&(Wt=Date.now(),await ft({currentTime:L.currentTime,playing:!L.paused,isYouTube:!1})),ie="url"})}async function jf(t){if(!t)return!1;if(Wt=Date.now(),Qi(t)){if(v(ne),!await rl(t))return!1;ie="yt"}else Js(),I(ne),L.src=t,ie="url";if(we){const e=re(oe,`rooms/${we}/watch`);ln(e,{url:t,playing:!1,currentTime:0,isYouTube:Qi(t),updatedBy:ii})}return!0}async function lt(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;tr=t.url;const e=await jf(t.url);return is(),e}async function rl(t,e,n){if(!tl(t))return console.error("Invalid YouTube URL:",t),!1;try{return await Bf({url:t,onReady:s=>{Za(!0)},onStateChange:async s=>{if(!Bt())return;const o=s.data===Ae.PLAYING,a=s.data===Ae.PAUSED;if(s.data===Ae.BUFFERING){Pe=!0,Ut&&clearTimeout(Ut),Ut=setTimeout(async()=>{Pe=!1;const d=er()===Ae.PLAYING;await ft({playing:d,currentTime:On()})},700);return}a&&Pe||!Pe&&(o||a)&&await ft({playing:o,currentTime:On()})}}),!0}catch(s){return console.error("Failed to load YouTube video:",s),!1}}const Kf="modulepreload",Qf=function(t){return"/HangVidU/"+t},to={},Xf=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};var o=c;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=c(n.map(d=>{if(d=Qf(d),d in to)return;to[d]=!0;const h=d.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":Kf,h||(f.as="script"),f.crossOrigin="",f.href=d,l&&f.setAttribute("nonce",l),document.head.appendChild(f),h)return new Promise((_,m)=>{f.addEventListener("load",_),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return s.then(a=>{for(const l of a||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};let vi=null,Ne=null,x=null,R=null,no=!1,fn=!1,he=[],Xi="",j=-1,Ji=[];const Jf="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",Zf="https://www.googleapis.com/youtube/v3";async function ep(){if(no||fn)return!1;fn=!0;const{initializeYouTubeElements:t}=await Xf(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>wf);return{initializeYouTubeElements:o}},void 0),e=await t();if(vi=e.searchContainer,Ne=e.searchBtn,x=e.searchQuery,R=e.searchResults,!vi||!Ne||!x||!R)return console.error("YouTube search elements not found in DOM"),fn=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(R?.querySelectorAll(".search-result-item")||[]).forEach((l,c)=>{c===o?(l.classList.add("focused"),l.scrollIntoView({block:"nearest"})):l.classList.remove("focused")}),j=o??-1};Ne.onclick=async()=>{const o=x.value.trim();if(zs(x)){I(x),x.focus();return}if(!o){_n(),v(x);return}if(ro()&&o===Xi)Zi(he);else if(!n(o))await io(o);else{lt&&await lt({url:o}),v(R),x.value="",v(x),j=-1;return}},vi.addEventListener("keydown",async o=>{const a=R.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let l=j+1;l>=a.length&&(l=0),i(l)}else if(o.key==="ArrowUp"){let l=j-1;l<0&&(l=j===-1?0:a.length-1),i(l)}return}if(o.key==="Enter"){if(a.length>0&&j>=0){a[j].click(),v(x),v(R),j=-1;return}const l=x.value.trim();if(l)if(ro()&&l===Xi)Zi(he);else if(!n(l))await io(l);else{lt&&await lt({url:l}),v(R),j=-1,x.value="",v(x);return}}else o.key==="Escape"&&(np()?_n():x.value?x.value="":v(x))}),x.addEventListener("input",()=>{x.value.trim()===""&&_n(),j=-1});const s=Yi(x,()=>v(x),{ignore:[Ne],esc:!1});Ji.push(s);const r=Yi(R,()=>v(R),{ignore:[Ne],esc:!1});return Ji.push(r),fn=!1,no=!0,!0}async function io(t){if(!Ne||!R){console.error("Search elements not initialized");return}he=[],Xi=t,Ne.disabled=!0,R.innerHTML='<div class="search-loading">Searching YouTube...</div>',I(R);try{const e=await fetch(`${Zf}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${Jf}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){so("No videos found"),he=[];return}he=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Zi(he)}catch(e){console.error("YouTube search failed:",e),so(e.message||"Search failed. Please try again.")}finally{Ne.disabled=!1}}function Zi(t){if(!R){console.error("Search results element not initialized");return}if(!t||t.length===0){R.innerHTML='<div class="no-results">No results found</div>',he=[],j=-1;return}R.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${n.title}</div>
        <div class="result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(lt){if(await lt(n),v(R),j=-1,!x){console.error("Search query element not initialized");return}x.value="",v(x)}},R.appendChild(i)}),I(R),j=0,R.querySelectorAll(".search-result-item").forEach((n,i)=>{i===j?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function so(t){if(he=[],j=-1,!R){console.error("Search results element not initialized");return}R.innerHTML=`<div class="search-error">${t}</div>`,I(R)}function _n(){he=[],j=-1,R&&(R.innerHTML="",v(R))}function tp(){_n(),Ji.forEach(t=>t())}function np(){return!zs(R)}function ro(){return he.length>0}let qe=null,oo=!1;function ip(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function sp(){if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),v(Y);return}if(!Y){console.warn("[PWA]: Install button not found");return}if(ip()){Y.innerHTML='<i class="fa fa-info"></i>',Y.title="Show Install Instructions",I(Y),Y.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}oo||(Y.addEventListener("click",async()=>{if(!qe){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),"serviceWorker"in navigator||console.warn("[PWA]: Service Workers not supported"),window.location.protocol!=="https:"&&window.location.hostname!=="localhost"&&console.warn("[PWA]: Not served over HTTPS");return}try{await qe.prompt();const{outcome:t}=await qe.userChoice;wt(`User choice outcome: ${t}`),console.info(t==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),v(Y),qe=null}catch(t){v(Y),console.error("Error showing install prompt:",t)}}),oo=!0),window.addEventListener("appinstalled",()=>{v(Y),qe=null}),qe?I(Y):v(Y)}window.addEventListener("beforeinstallprompt",t=>{console.debug("[PWA]: beforeinstallprompt fired"),t.preventDefault(),qe=t,Y&&I(Y)});function ol(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(e==="initiator")ao(t,"offerCandidates",n),lo(t,"answerCandidates",n);else if(e==="joiner")ao(t,"answerCandidates",n),lo(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function ao(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=tf(re(oe,`rooms/${n}/${e}`));ln(s,i.candidate.toJSON())}}}function lo(t,e,n){const i=re(oe,`rooms/${n}/${e}`),s=r=>{const o=r.val();o&&t.remoteDescription&&t.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};za(i,s),$s(i,"child_added",s)}let xe=null;function si(){return!xe||!(xe instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",xe),console.error("Call createLocalStream() before accessing local stream."),null):xe}function al(t){xe=t}function rp(){xe&&(xe.getTracks().forEach(t=>t.stop()),xe=null)}let co=null;const op=async()=>{const t=si();if(t&&t instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),t;const e=Xs("user"),n=await navigator.mediaDevices.getUserMedia({video:e||Gi.relyOnBrowserDefaults,audio:Ja.default});return al(n),n};async function ap(t){const e=await op();return co=new MediaStream(e.getVideoTracks()),t.srcObject=co,!0}function ll(t,e,n){return t.ontrack=i=>{if(!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;e.srcObject!==i.streams[0]&&(e.srcObject=i.streams[0],Df(e,n),U("Connected!"))},!0}function cl(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!n||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(m=>{m.forEach(y=>{y.type==="attributes"&&y.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function l(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}n.addEventListener("click",l),Cf(i,()=>{v(i)},{ignore:[n],esc:!0});function c(){I(n)}function d(){v(n)}function h(m){const y=document.createElement("p");y.textContent=m,m.startsWith("You:")?y.style.textAlign="right":m.startsWith("Partner:")&&(y.style.textAlign="left"),s.appendChild(y),s.scrollTop=s.scrollHeight}function u(m){h(`Partner: ${m}`),zs(i)&&f()}function f(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}r.addEventListener("submit",m=>{m.preventDefault();const y=o.value.trim();y&&(t(y),h(`You: ${y}`),o.value="")});function _(){a.disconnect(),n&&d(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:h,receiveMessage:u,toggleMessages:l,showMessagesToggle:c,hideMessagesToggle:d,cleanup:_}}let uo=!1;function lp(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--primary",l.textContent=e.buttonText,l.autofocus=!0;const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--secondary",c.textContent=e.cancelText,a.appendChild(l),a.appendChild(c),i.appendChild(a);const d=document.createElement("p");return d.className="copy-link-dialog__feedback",d.setAttribute("aria-live","polite"),i.appendChild(d),n.appendChild(i),{dialog:n,input:o,copyButton:l,cancelButton:c,feedback:d}}function cp(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};up();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=lp(t,n);dp(i);let l=!1;const c=async()=>{await ul(t,s)?(l=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",c),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&!d.ctrlKey&&!d.altKey&&!d.metaKey&&(d.preventDefault(),c())}),i.addEventListener("close",()=>{!l&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function up(){if(uo)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),uo=!0}function dp(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)",this.style.zIndex="1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function ul(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}let S=null,ye=null,O=null,Ce=null,Fe=null,Z,Jt=null,es=[],ts=null;const Fn=()=>G.srcObject&&G.srcObject.getVideoTracks().some(t=>t.enabled);async function dl(){Ce=Math.random().toString(36).substring(2,15);const t=ja(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),U("Error: Required UI elements not found."),!1;try{const i=Xe();i&&v(i)}catch{}try{return await ap(de),ht&&await Tf()&&I(ht),Mf({getLocalStream:si,getLocalVideo:()=>de,getRemoteVideo:()=>G,getPeerConnection:()=>S,setLocalStream:al,micBtn:ei,cameraBtn:ti,switchCameraBtn:ht,mutePartnerBtn:He,fullscreenPartnerBtn:Zn}),de&&(de.addEventListener("enterpictureinpicture",()=>K&&v(K)),de.addEventListener("leavepictureinpicture",()=>{K&&!(un()&&Fn())&&I(K)})),sp(),ep(),_p(),ir(),!0}catch(i){return console.error("Failed to get user media:",i),U("Error: Please allow camera and microphone access."),!1}}function hp(){ye=S.createDataChannel("chat"),Z=cl(e=>{ye.readyState==="open"&&ye.send(e)}),ye.onopen=()=>{Z.showMessagesToggle(),Z.appendChatMessage("💬 Chat connected")},ye.onmessage=e=>Z.receiveMessage(e.data)}function ns(){window.history.replaceState({},document.title,window.location.pathname)}let Bn=[];function hl(){if(!O||!Ce)return;const t=re(oe,`rooms/${O}/members`),e=re(oe,`rooms/${O}/members/${Ce}`);ln(e,{joinedAt:Date.now()});const n=s=>{s.key!==Ce&&nr()};za(t,n),Bn.push({ref:t,type:"child_added",callback:n});const i=s=>{s.key!==Ce&&console.info("Partner has left the call"),sr()};sf(t,i),Bn.push({ref:t,type:"child_removed",callback:i})}const fl={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};function pl(t){t.onconnectionstatechange=()=>{wt("Connection state:",t.connectionState),t.connectionState==="connected"?(U("Connected!"),nr()):t.connectionState==="disconnected"?(U("Partner disconnected"),ir(),ns()):t.connectionState==="failed"&&(U("Connection failed"),ns())}}async function _l(){const t=si();if(!t)return U("Error: Camera not initialized"),!1;O=Math.random().toString(36).substring(2,15),Fe="initiator",S=new RTCPeerConnection(fl),hp(),t.getTracks().forEach(r=>{S.addTrack(r,t)}),ll(S,G,He)&&(ol(S,Fe,O),pl(S),console.debug("Peer connection created as initiator with room ID:",O));const e=await S.createOffer();await S.setLocalDescription(e);const n=re(oe,`rooms/${O}`);await ln(n,{offer:{type:e.type,sdp:e.sdp}});const i=re(oe,`rooms/${O}/answer`),s=async r=>{const o=r.val();if(o&&o.sdp!==ts){if(ts=o.sdp,S.signalingState!=="have-local-offer"&&S.signalingState!=="stable")return wt("Ignoring answer - unexpected signaling state:",S.signalingState),!0;try{return await S.setRemoteDescription(new RTCSessionDescription(o)),wt("Remote description set (answer)"),!0}catch(a){return console.error("Failed to set remote description:",a),!1}}};return Ya(i,s),$s(i,"value",s),sl(O,Fe,Ce),hl(),Jt=`${window.location.origin}${window.location.pathname}?room=${O}`,cp(Jt,{onCopy:()=>U("Link ready! Share with your partner."),onCancel:()=>{U('Call cancelled. Click "Start New Chat" to try again.')}}),U("Waiting for partner to join..."),pe.disabled=!1,!0}async function fp(){const t=si();if(!t)return U("Error: Camera not initialized"),!1;if(!O)return U("Error: No room ID"),!1;Fe="joiner";const e=re(oe,`rooms/${O}`),n=await nf(e);if(!n.exists())return U("Error: Invalid room link"),!1;const s=n.val().offer;if(!s)return U("Error: No offer found"),!1;S=new RTCPeerConnection(fl),S.ondatachannel=o=>{ye=o.channel,Z=cl(a=>ye.send(a)),ye.onopen=()=>{Z.showMessagesToggle(),Z.appendChatMessage("💬 Chat connected")},ye.onmessage=a=>Z.receiveMessage(a.data)},t.getTracks().forEach(o=>{S.addTrack(o,t)}),ll(S,G,He)&&(ol(S,Fe,O),pl(S),console.debug("Peer connection created as joiner for room ID:",O)),await S.setRemoteDescription(new RTCSessionDescription(s));const r=await S.createAnswer();await S.setLocalDescription(r);try{await $a(e,{answer:{type:r.type,sdp:r.sdp}})}catch(o){return console.error("Failed to update answer in Firebase:",o),U("Failed to send answer to partner."),!1}return sl(O,Fe,Ce),hl(),nr(),U("Connecting..."),!0}let fe=null,Ci=null,Ei=null;function pp(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function is(){if(!un()){if(il(!0),v(st),v(Se),v(pe),ue.classList.remove("bottom"),ue.classList.add("watch-mode"),I(ue),fe&&(fe(),fe=null),!Fn()){v(D),Ke(D),zi(de)||(I(K),Qe(K));return}v(K),Ke(K),zi(G)?(v(D),Ke(D)):pp()?G.requestPictureInPicture().then(()=>{v(D),Ke(D)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Qe(D),I(D)}):(Qe(D),I(D))}}function mn(){un()&&(ue.classList.remove("watch-mode"),ue.classList.add("bottom"),fe||(fe=Xa(ue,{inactivityMs:3e3,hideOnEsc:!0})),Fn()&&(zi(D)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Ke(D),I(D)),Qe(K),I(K),Fn()||(I(st),I(Se),I(pe)),il(!1))}let nr=()=>{if(I(D),Qe(K),v(st),v(Se),v(pe),Te.disabled=!0,He.disabled=!1,rt.disabled=!1,fe||(fe=Xa(ue,{inactivityMs:2500,hideOnEsc:!0})),!Ci){const t=()=>{un()?Qe(D):Ke(D),I(D)};G.addEventListener("leavepictureinpicture",t),Ci=()=>G.removeEventListener("leavepictureinpicture",t),es.push(Ci)}if(!Ei){const t=()=>v(D);G.addEventListener("enterpictureinpicture",t),Ei=()=>G.removeEventListener("enterpictureinpicture",t),es.push(Ei)}},ir=()=>{Ke(D),v(D),Qe(K),I(K),Te.disabled=!1,rt.disabled=!0,He.disabled=!0,fe&&(fe(),fe=null),I(ue),Se.disabled=!1,pe.disabled=!0,I(st),I(Se),I(pe)};function wi(){return L&&ne&&!ne.classList.contains("hidden")&&L.src&&L.src.trim()!==""}let ho=!1;function _p(){if(ho)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",Pt()),console.log("isYTVisible():",yi()),console.log("isSharedVideoVisible():",wi()),console.log("isWatchModeActive():",un()),Pt()==="yt"?yi()?(Ki(),mn()):(el(),is()):Pt()==="url"&&(wi()?(v(ne),mn()):(I(ne),is()))),(e.key==="m"||e.key==="M")&&Z&&Z.toggleMessages()),e.key==="Escape"&&(Pt()==="yt"&&yi()?(ni(),Ki()):Pt()==="url"&&wi()&&(L.pause(),v(ne)),mn())}),ho=!0}async function mp(){Jt&&(await ul(Jt)?(U("Link copied to clipboard!"),alert("Link copied!")):U("Failed to copy link to clipboard."))}Te.onclick=async()=>await _l();Se.onclick=async()=>await _l();pe.onclick=async()=>await mp();rt.onclick=async()=>await sr();async function gp(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return U('Ready. Click "Start New Chat" to begin.'),!1;O=e,U("Connecting to room...");const n=await dl();let i=!1;return n&&(i=await fp()),i?!0:(I(Te),rt.disabled=!0,Te.disabled=!1,ns(),!1)}window.onload=async()=>{if(await gp())return;if(!await dl()){Te.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}};window.addEventListener("beforeunload",t=>{if(S&&S.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;yp()});let bi=!1;async function sr(){if(!bi){if(bi=!0,console.debug("Hanging up..."),G.srcObject&&(G.srcObject.getTracks().forEach(t=>t.stop()),G.srcObject=null),Lf(),S&&(S.close(),S=null),vf(),O&&Fe==="initiator"){const t=re(oe,`rooms/${O}`);Xr(t).catch(e=>{console.warn("Failed to remove room:",e)})}if(Bn.forEach(({ref:t,type:e,callback:n})=>Ga(t,e,n)),Bn.length=0,O&&Ce){const t=re(oe,`rooms/${O}/members/${Ce}`);Xr(t).catch(()=>{})}document.pictureInPictureElement&&document.exitPictureInPicture().catch(t=>console.error(t)),ir(),Z&&Z.cleanup&&(Z.cleanup(),Z=null),O=null,Fe=null,ts=null,window.history.replaceState({},document.title,window.location.pathname),U('Disconnected. Click "Start New Chat" to begin.'),bi=!1}}function yp(){(S||O)&&sr(),Jt=null,L.src="",Jn.textContent="",rp(),de.srcObject=null,mn(),Wf("none"),Js(),Za(!1),tp(),es.forEach(t=>t())}
