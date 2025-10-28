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
 */const Ga=()=>{};var Fs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const p=function(t,e){if(!t)throw ft(e)},ft=function(t){return new Error("Firebase Database ("+Yr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},za=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ui={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let u=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(u=64)),i.push(n[d],n[h],n[u],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Gr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):za(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new qa;const u=r<<2|a>>4;if(i.push(u),c!==64){const f=a<<4&240|c>>2;if(i.push(f),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class qa extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zr=function(t){const e=Gr(t);return Ui.encodeByteArray(e,!0)},on=function(t){return zr(t).replace(/\./g,"")},ai=function(t){try{return Ui.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(t){return qr(void 0,t)}function qr(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Ka(n)||(t[n]=qr(t[n],e[n]));return t}function Ka(t){return t!=="__proto__"}/**
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
 */function Qa(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Xa=()=>Qa().__FIREBASE_DEFAULTS__,Ja=()=>{if(typeof process>"u"||typeof Fs>"u")return;const t=Fs.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Za=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ai(t[1]);return e&&JSON.parse(e)},jr=()=>{try{return Ga()||Xa()||Ja()||Za()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},el=t=>jr()?.emulatorHosts?.[t],tl=t=>{const e=el(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Kr=()=>jr()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function Hi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function nl(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function il(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[on(JSON.stringify(n)),on(JSON.stringify(o)),""].join(".")}const wt={};function sl(){const t={prod:[],emulator:[]};for(const e of Object.keys(wt))wt[e]?t.emulator.push(e):t.prod.push(e);return t}function rl(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Bs=!1;function ol(t,e){if(typeof window>"u"||typeof document>"u"||!Hi(window.location.host)||wt[t]===e||wt[t]||Bs)return;wt[t]=e;function n(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=sl().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,f){u.setAttribute("width","24"),u.setAttribute("id",f),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function c(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{Bs=!0,o()},u}function d(u,f){u.setAttribute("id",f),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=rl(i),f=n("text"),_=document.getElementById(f)||document.createElement("span"),g=n("learnmore"),y=document.getElementById(g)||document.createElement("a"),X=n("preprendIcon"),de=document.getElementById(X)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const Me=u.element;a(Me),d(y,g);const Yn=c();l(de,X),Me.append(de,_,y,Yn),document.body.appendChild(Me)}r?(_.innerText="Preview backend disconnected.",de.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(de.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function al(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Qr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(al())}function ll(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function cl(){return Yr.NODE_ADMIN===!0}function ul(){try{return typeof indexedDB=="object"}catch{return!1}}function dl(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl="FirebaseError";class Vt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=hl,Object.setPrototypeOf(this,Vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Xr.prototype.create)}}class Xr{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?fl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Vt(s,a,i)}}function fl(t,e){return t.replace(pl,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const pl=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(t){return JSON.parse(t)}function B(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Pt(ai(r[0])||""),n=Pt(ai(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},_l=function(t){const e=Jr(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},ml=function(t){const e=Jr(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function rt(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Ws(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function an(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function ln(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Us(r)&&Us(o)){if(!ln(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Us(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gl(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const u=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const u=(s<<5|s>>>27)+c+l+d+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Nn(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Rn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function qe(t){return t&&t._delegate?t._delegate:t}class xt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Fe="[DEFAULT]";/**
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
 */class Cl{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Ht;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wl(e))try{this.getOrInitializeService({instanceIdentifier:Fe})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Fe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Fe){return this.instances.has(e)}getOptions(e=Fe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:El(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Fe){return this.component?this.component.multipleInstances?e:Fe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function El(t){return t===Fe?void 0:t}function wl(t){return t.instantiationMode==="EAGER"}/**
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
 */class bl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Cl(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(N||(N={}));const Il={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Sl=N.INFO,Tl={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},kl=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Tl[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Zr{constructor(e){this.name=e,this._logLevel=Sl,this._logHandler=kl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Il[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Nl=(t,e)=>e.some(n=>t instanceof n);let Hs,Vs;function Rl(){return Hs||(Hs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Al(){return Vs||(Vs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const eo=new WeakMap,li=new WeakMap,to=new WeakMap,Gn=new WeakMap,Vi=new WeakMap;function Pl(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Te(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&eo.set(n,t)}).catch(()=>{}),Vi.set(e,t),e}function xl(t){if(li.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});li.set(t,e)}let ci={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return li.get(t);if(e==="objectStoreNames")return t.objectStoreNames||to.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Te(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Dl(t){ci=t(ci)}function Ml(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(zn(this),e,...n);return to.set(i,e.sort?e.sort():[e]),Te(i)}:Al().includes(t)?function(...e){return t.apply(zn(this),e),Te(eo.get(this))}:function(...e){return Te(t.apply(zn(this),e))}}function Ol(t){return typeof t=="function"?Ml(t):(t instanceof IDBTransaction&&xl(t),Nl(t,Rl())?new Proxy(t,ci):t)}function Te(t){if(t instanceof IDBRequest)return Pl(t);if(Gn.has(t))return Gn.get(t);const e=Ol(t);return e!==t&&(Gn.set(t,e),Vi.set(e,t)),e}const zn=t=>Vi.get(t);function Ll(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Te(o);return i&&o.addEventListener("upgradeneeded",l=>{i(Te(o.result),l.oldVersion,l.newVersion,Te(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Fl=["get","getKey","getAll","getAllKeys","count"],Bl=["put","add","delete","clear"],qn=new Map;function $s(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(qn.get(e))return qn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Bl.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Fl.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return qn.set(e,r),r}Dl(t=>({...t,get:(e,n,i)=>$s(e,n)||t.get(e,n,i),has:(e,n)=>!!$s(e,n)||t.has(e,n)}));/**
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
 */class Wl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ul(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Ul(t){return t.getComponent()?.type==="VERSION"}const ui="@firebase/app",Ys="0.14.4";/**
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
 */const ve=new Zr("@firebase/app"),Hl="@firebase/app-compat",Vl="@firebase/analytics-compat",$l="@firebase/analytics",Yl="@firebase/app-check-compat",Gl="@firebase/app-check",zl="@firebase/auth",ql="@firebase/auth-compat",jl="@firebase/database",Kl="@firebase/data-connect",Ql="@firebase/database-compat",Xl="@firebase/functions",Jl="@firebase/functions-compat",Zl="@firebase/installations",ec="@firebase/installations-compat",tc="@firebase/messaging",nc="@firebase/messaging-compat",ic="@firebase/performance",sc="@firebase/performance-compat",rc="@firebase/remote-config",oc="@firebase/remote-config-compat",ac="@firebase/storage",lc="@firebase/storage-compat",cc="@firebase/firestore",uc="@firebase/ai",dc="@firebase/firestore-compat",hc="firebase",fc="12.4.0";/**
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
 */const di="[DEFAULT]",pc={[ui]:"fire-core",[Hl]:"fire-core-compat",[$l]:"fire-analytics",[Vl]:"fire-analytics-compat",[Gl]:"fire-app-check",[Yl]:"fire-app-check-compat",[zl]:"fire-auth",[ql]:"fire-auth-compat",[jl]:"fire-rtdb",[Kl]:"fire-data-connect",[Ql]:"fire-rtdb-compat",[Xl]:"fire-fn",[Jl]:"fire-fn-compat",[Zl]:"fire-iid",[ec]:"fire-iid-compat",[tc]:"fire-fcm",[nc]:"fire-fcm-compat",[ic]:"fire-perf",[sc]:"fire-perf-compat",[rc]:"fire-rc",[oc]:"fire-rc-compat",[ac]:"fire-gcs",[lc]:"fire-gcs-compat",[cc]:"fire-fst",[dc]:"fire-fst-compat",[uc]:"fire-vertex","fire-js":"fire-js",[hc]:"fire-js-all"};/**
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
 */const cn=new Map,_c=new Map,hi=new Map;function Gs(t,e){try{t.container.addComponent(e)}catch(n){ve.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function un(t){const e=t.name;if(hi.has(e))return ve.debug(`There were multiple attempts to register component ${e}.`),!1;hi.set(e,t);for(const n of cn.values())Gs(n,t);for(const n of _c.values())Gs(n,t);return!0}function mc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function gc(t){return t==null?!1:t.settings!==void 0}/**
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
 */const yc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ke=new Xr("app","Firebase",yc);/**
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
 */class vc{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new xt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ke.create("app-deleted",{appName:this._name})}}/**
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
 */const Cc=fc;function no(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:di,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ke.create("bad-app-name",{appName:String(s)});if(n||(n=Kr()),!n)throw ke.create("no-options");const r=cn.get(s);if(r){if(ln(n,r.options)&&ln(i,r.config))return r;throw ke.create("duplicate-app",{appName:s})}const o=new bl(s);for(const l of hi.values())o.addComponent(l);const a=new vc(n,i,o);return cn.set(s,a),a}function Ec(t=di){const e=cn.get(t);if(!e&&t===di&&Kr())return no();if(!e)throw ke.create("no-app",{appName:t});return e}function Ze(t,e,n){let i=pc[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ve.warn(o.join(" "));return}un(new xt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const wc="firebase-heartbeat-database",bc=1,Dt="firebase-heartbeat-store";let jn=null;function io(){return jn||(jn=Ll(wc,bc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Dt)}catch(n){console.warn(n)}}}}).catch(t=>{throw ke.create("idb-open",{originalErrorMessage:t.message})})),jn}async function Ic(t){try{const n=(await io()).transaction(Dt),i=await n.objectStore(Dt).get(so(t));return await n.done,i}catch(e){if(e instanceof Vt)ve.warn(e.message);else{const n=ke.create("idb-get",{originalErrorMessage:e?.message});ve.warn(n.message)}}}async function zs(t,e){try{const i=(await io()).transaction(Dt,"readwrite");await i.objectStore(Dt).put(e,so(t)),await i.done}catch(n){if(n instanceof Vt)ve.warn(n.message);else{const i=ke.create("idb-set",{originalErrorMessage:n?.message});ve.warn(i.message)}}}function so(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Sc=1024,Tc=30;class kc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Rc(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=qs();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>Tc){const s=Ac(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ve.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=qs(),{heartbeatsToSend:n,unsentEntries:i}=Nc(this._heartbeatsCache.heartbeats),s=on(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ve.warn(e),""}}}function qs(){return new Date().toISOString().substring(0,10)}function Nc(t,e=Sc){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),js(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),js(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Rc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ul()?dl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ic(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return zs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return zs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function js(t){return on(JSON.stringify({version:2,heartbeats:t})).length}function Ac(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function Pc(t){un(new xt("platform-logger",e=>new Wl(e),"PRIVATE")),un(new xt("heartbeat",e=>new kc(e),"PRIVATE")),Ze(ui,Ys,t),Ze(ui,Ys,"esm2020"),Ze("fire-js","")}Pc("");var Ks={};const Qs="@firebase/database",Xs="1.1.0";/**
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
 */let ro="";function xc(t){ro=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),B(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Pt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ce(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Dc(e)}}catch{}return new Mc},He=oo("localStorage"),Oc=oo("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et=new Zr("@firebase/database"),Lc=(function(){let t=1;return function(){return t++}})(),ao=function(t){const e=vl(t),n=new yl;n.update(e);const i=n.digest();return Ui.encodeByteArray(i)},$t=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=$t.apply(null,i):typeof i=="object"?e+=B(i):e+=i,e+=" "}return e};let bt=null,Js=!0;const Fc=function(t,e){p(!0,"Can't turn on custom loggers persistently."),et.logLevel=N.VERBOSE,bt=et.log.bind(et)},V=function(...t){if(Js===!0&&(Js=!1,bt===null&&Oc.get("logging_enabled")===!0&&Fc()),bt){const e=$t.apply(null,t);bt(e)}},Yt=function(t){return function(...e){V(t,...e)}},fi=function(...t){const e="FIREBASE INTERNAL ERROR: "+$t(...t);et.error(e)},Ce=function(...t){const e=`FIREBASE FATAL ERROR: ${$t(...t)}`;throw et.error(e),new Error(e)},j=function(...t){const e="FIREBASE WARNING: "+$t(...t);et.warn(e)},Bc=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&j("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},$i=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Wc=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ot="[MIN_NAME]",$e="[MAX_NAME]",je=function(t,e){if(t===e)return 0;if(t===ot||e===$e)return-1;if(e===ot||t===$e)return 1;{const n=Zs(t),i=Zs(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Uc=function(t,e){return t===e?0:t<e?-1:1},gt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+B(e))},Yi=function(t){if(typeof t!="object"||t===null)return B(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=B(e[i]),n+=":",n+=Yi(t[e[i]]);return n+="}",n},lo=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function $(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const co=function(t){p(!$i(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let u=parseInt(d.substr(l,8),2).toString(16);u.length===1&&(u="0"+u),h=h+u}return h.toLowerCase()},Hc=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Vc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function $c(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Yc=new RegExp("^-?(0*)\\d{1,10}$"),Gc=-2147483648,zc=2147483647,Zs=function(t){if(Yc.test(t)){const e=Number(t);if(e>=Gc&&e<=zc)return e}return null},pt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw j("Exception was thrown by user callback.",n),e},Math.floor(0))}},qc=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},It=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class jc{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,gc(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){j(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(V("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',j(e)}}class nn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}nn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi="5",uo="v",ho="s",fo="r",po="f",_o=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,mo="ls",go="p",pi="ac",yo="websocket",vo="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=He.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&He.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Qc(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Eo(t,e,n){p(typeof e=="string","typeof type must == string"),p(typeof n=="object","typeof params must == object");let i;if(e===yo)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===vo)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Qc(t)&&(n.ns=t.namespace);const s=[];return $(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(){this.counters_={}}incrementCounter(e,n=1){ce(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return ja(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn={},Qn={};function zi(t){const e=t.toString();return Kn[e]||(Kn[e]=new Xc),Kn[e]}function Jc(t,e){const n=t.toString();return Qn[n]||(Qn[n]=e()),Qn[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&pt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er="start",eu="close",tu="pLPCommand",nu="pRTLPCB",wo="id",bo="pw",Io="ser",iu="cb",su="seg",ru="ts",ou="d",au="dframe",So=1870,To=30,lu=So-To,cu=25e3,uu=3e4;class Xe{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Yt(e),this.stats_=zi(n),this.urlFn=l=>(this.appCheckToken&&(l[pi]=this.appCheckToken),Eo(n,vo,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Zc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(uu)),Wc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new qi((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===er)this.id=a,this.password=l;else if(o===eu)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[er]="t",i[Io]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[iu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[uo]=Gi,this.transportSessionId&&(i[ho]=this.transportSessionId),this.lastSessionId&&(i[mo]=this.lastSessionId),this.applicationId&&(i[go]=this.applicationId),this.appCheckToken&&(i[pi]=this.appCheckToken),typeof location<"u"&&location.hostname&&_o.test(location.hostname)&&(i[fo]=po);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Xe.forceAllow_=!0}static forceDisallow(){Xe.forceDisallow_=!0}static isAvailable(){return Xe.forceAllow_?!0:!Xe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Hc()&&!Vc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=B(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=zr(n),s=lo(i,lu);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[au]="t",i[wo]=e,i[bo]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=B(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class qi{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Lc(),window[tu+this.uniqueCallbackIdentifier]=e,window[nu+this.uniqueCallbackIdentifier]=n,this.myIFrame=qi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){V("frame writing exception"),a.stack&&V(a.stack),V(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||V("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[wo]=this.myID,e[bo]=this.myPW,e[Io]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+To+i.length<=So;){const o=this.pendingSegs.shift();i=i+"&"+su+s+"="+o.seg+"&"+ru+s+"="+o.ts+"&"+ou+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(cu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{V("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const du=16384,hu=45e3;let dn=null;typeof MozWebSocket<"u"?dn=MozWebSocket:typeof WebSocket<"u"&&(dn=WebSocket);class ie{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Yt(this.connId),this.stats_=zi(n),this.connURL=ie.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[uo]=Gi,typeof location<"u"&&location.hostname&&_o.test(location.hostname)&&(o[fo]=po),n&&(o[ho]=n),i&&(o[mo]=i),s&&(o[pi]=s),r&&(o[go]=r),Eo(e,yo,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,He.set("previous_websocket_failure",!0);try{let i;cl(),this.mySock=new dn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ie.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&dn!==null&&!ie.forceDisallow_}static previouslyFailed(){return He.isInMemoryStorage||He.get("previous_websocket_failure")===!0}markConnectionHealthy(){He.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Pt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=B(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=lo(n,du);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(hu))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ie.responsesRequiredToBeHealthy=2;ie.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{static get ALL_TRANSPORTS(){return[Xe,ie]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ie&&ie.isAvailable();let i=n&&!ie.previouslyFailed();if(e.webSocketOnly&&(n||j("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ie];else{const s=this.transports_=[];for(const r of Mt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Mt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Mt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fu=6e4,pu=5e3,_u=10*1024,mu=100*1024,Xn="t",tr="d",gu="s",nr="r",yu="e",ir="o",sr="a",rr="n",or="p",vu="h";class Cu{constructor(e,n,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Yt("c:"+this.id+":"),this.transportManager_=new Mt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=It(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>mu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>_u?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Xn in e){const n=e[Xn];n===sr?this.upgradeIfSecondaryHealthy_():n===nr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===ir&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=gt("t",e),i=gt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:or,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:sr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:rr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=gt("t",e),i=gt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=gt(Xn,e);if(tr in e){const i=e[tr];if(n===vu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===rr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===gu?this.onConnectionShutdown_(i):n===nr?this.onReset_(i):n===yu?fi("Server Error: "+i):n===ir?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):fi("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Gi!==i&&j("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),It(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(fu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):It(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(pu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:or,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(He.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ko{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends No{static getInstance(){return new hn}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Qr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=32,lr=768;class I{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function b(){return new I("")}function v(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Pe(t){return t.pieces_.length-t.pieceNum_}function A(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new I(t.pieces_,e)}function ji(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Eu(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ot(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ro(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new I(e,0)}function M(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new I(n,0)}function E(t){return t.pieceNum_>=t.pieces_.length}function q(t,e){const n=v(t),i=v(e);if(n===null)return e;if(n===i)return q(A(t),A(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function wu(t,e){const n=Ot(t,0),i=Ot(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=je(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Ki(t,e){if(Pe(t)!==Pe(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function J(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Pe(t)>Pe(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class bu{constructor(e,n){this.errorPrefix_=n,this.parts_=Ot(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Rn(this.parts_[i]);Ao(this)}}function Iu(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Rn(e),Ao(t)}function Su(t){const e=t.parts_.pop();t.byteLength_-=Rn(e),t.parts_.length>0&&(t.byteLength_-=1)}function Ao(t){if(t.byteLength_>lr)throw new Error(t.errorPrefix_+"has a key path longer than "+lr+" bytes ("+t.byteLength_+").");if(t.parts_.length>ar)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ar+") or object contains a cycle "+Be(t))}function Be(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi extends No{static getInstance(){return new Qi}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=1e3,Tu=300*1e3,cr=30*1e3,ku=1.3,Nu=3e4,Ru="server_kill",ur=3;class ge extends ko{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ge.nextPersistentConnectionId_++,this.log_=Yt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=yt,this.maxReconnectDelay_=Tu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Qi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&hn.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(B(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Ht,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ge.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ce(e,"w")){const i=rt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();j(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ml(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=cr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=_l(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+B(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):fi("Unrecognized action received from server: "+B(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=yt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=yt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Nu&&(this.reconnectDelay_=yt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*ku)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ge.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,u]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?V("getToken() completed but was canceled"):(V("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=u&&u.token,a=new Cu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{j(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Ru)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&j(h),l())}}}interrupt(e){V("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){V("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ws(this.interruptReasons_)&&(this.reconnectDelay_=yt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Yi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){V("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ur&&(this.reconnectDelay_=cr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){V("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ur&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ro.replace(/\./g,"-")]=1,Qr()?e["framework.cordova"]=1:ll()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=hn.getInstance().currentlyOnline();return Ws(this.interruptReasons_)&&e}}ge.nextPersistentConnectionId_=0;ge.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new C(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new C(ot,e),s=new C(ot,n);return this.compare(i,s)!==0}minPost(){return C.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zt;class Po extends An{static get __EMPTY_NODE(){return Zt}static set __EMPTY_NODE(e){Zt=e}compare(e,n){return je(e.name,n.name)}isDefinedOn(e){throw ft("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return C.MIN}maxPost(){return new C($e,Zt)}makePost(e,n){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new C(e,Zt)}toString(){return".key"}}const tt=new Po;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class U{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??U.RED,this.left=s??K.EMPTY_NODE,this.right=r??K.EMPTY_NODE}copy(e,n,i,s,r){return new U(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return K.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return K.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,U.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,U.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}U.RED=!0;U.BLACK=!1;class Au{copy(e,n,i,s,r){return this}insert(e,n,i){return new U(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class K{constructor(e,n=K.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new K(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,U.BLACK,null,null))}remove(e){return new K(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,U.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new en(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new en(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new en(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new en(this.root_,null,this.comparator_,!0,e)}}K.EMPTY_NODE=new Au;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pu(t,e){return je(t.name,e.name)}function Xi(t,e){return je(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _i;function xu(t){_i=t}const xo=function(t){return typeof t=="number"?"number:"+co(t):"string:"+t},Do=function(t){if(t.isLeafNode()){const e=t.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ce(e,".sv"),"Priority must be a string or number.")}else p(t===_i||t.isEmpty(),"priority of unexpected type.");p(t===_i||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dr;class W{static set __childrenNodeConstructor(e){dr=e}static get __childrenNodeConstructor(){return dr}constructor(e,n=W.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Do(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new W(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:W.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return E(e)?this:v(e)===".priority"?this.priorityNode_:W.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:W.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=v(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Pe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,W.__childrenNodeConstructor.EMPTY_NODE.updateChild(A(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+xo(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=co(this.value_):e+=this.value_,this.lazyHash_=ao(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===W.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof W.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=W.VALUE_TYPE_ORDER.indexOf(n),r=W.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+n),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}W.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mo,Oo;function Du(t){Mo=t}function Mu(t){Oo=t}class Ou extends An{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?je(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return C.MIN}maxPost(){return new C($e,new W("[PRIORITY-POST]",Oo))}makePost(e,n){const i=Mo(e);return new C(n,new W("[PRIORITY-POST]",i))}toString(){return".priority"}}const O=new Ou;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lu=Math.log(2);class Fu{constructor(e){const n=r=>parseInt(Math.log(r)/Lu,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const fn=function(t,e,n,i){t.sort(e);const s=function(l,c){const d=c-l;let h,u;if(d===0)return null;if(d===1)return h=t[l],u=n?n(h):h,new U(u,h.node,U.BLACK,null,null);{const f=parseInt(d/2,10)+l,_=s(l,f),g=s(f+1,c);return h=t[f],u=n?n(h):h,new U(u,h.node,U.BLACK,_,g)}},r=function(l){let c=null,d=null,h=t.length;const u=function(_,g){const y=h-_,X=h;h-=_;const de=s(y+1,X),Me=t[y],Yn=n?n(Me):Me;f(new U(Yn,Me.node,g,null,de))},f=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const g=l.nextBitIsOne(),y=Math.pow(2,l.count-(_+1));g?u(y,U.BLACK):(u(y,U.BLACK),u(y,U.RED))}return d},o=new Fu(t.length),a=r(o);return new K(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jn;const Qe={};class pe{static get Default(){return p(Qe&&O,"ChildrenNode.ts has not been loaded"),Jn=Jn||new pe({".priority":Qe},{".priority":O}),Jn}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=rt(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof K?n:null}hasIndex(e){return ce(this.indexSet_,e.toString())}addIndex(e,n){p(e!==tt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(C.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=fn(i,e.getCompare()):a=Qe;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new pe(d,c)}addToIndexes(e,n){const i=an(this.indexes_,(s,r)=>{const o=rt(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Qe)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(C.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),fn(a,o.getCompare())}else return Qe;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new C(e.name,a))),l.insert(e,e.node)}});return new pe(i,this.indexSet_)}removeFromIndexes(e,n){const i=an(this.indexes_,s=>{if(s===Qe)return s;{const r=n.get(e.name);return r?s.remove(new C(e.name,r)):s}});return new pe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vt;class m{static get EMPTY_NODE(){return vt||(vt=new m(new K(Xi),null,pe.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Do(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||vt}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?vt:n}}getChild(e){const n=v(e);return n===null?this:this.getImmediateChild(n).getChild(A(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(p(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new C(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?vt:this.priorityNode_;return new m(s,o,r)}}updateChild(e,n){const i=v(e);if(i===null)return n;{p(v(e)!==".priority"||Pe(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(A(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(O,(o,a)=>{n[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+xo(this.getPriority().val())+":"),this.forEachChild(O,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":ao(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new C(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new C(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new C(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,C.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,C.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Gt?-1:0}withIndex(e){if(e===tt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===tt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(O),s=n.getIterator(O);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===tt?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Bu extends m{constructor(){super(new K(Xi),m.EMPTY_NODE,pe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const Gt=new Bu;Object.defineProperties(C,{MIN:{value:new C(ot,m.EMPTY_NODE)},MAX:{value:new C($e,Gt)}});Po.__EMPTY_NODE=m.EMPTY_NODE;W.__childrenNodeConstructor=m;xu(Gt);Mu(Gt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu=!0;function F(t,e=null){if(t===null)return m.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new W(n,F(e))}if(!(t instanceof Array)&&Wu){const n=[];let i=!1;if($(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=F(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new C(o,l)))}}),n.length===0)return m.EMPTY_NODE;const r=fn(n,Pu,o=>o.name,Xi);if(i){const o=fn(n,O.getCompare());return new m(r,F(e),new pe({".priority":o},{".priority":O}))}else return new m(r,F(e),pe.Default)}else{let n=m.EMPTY_NODE;return $(t,(i,s)=>{if(ce(t,i)&&i.substring(0,1)!=="."){const r=F(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(F(e))}}Du(F);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu extends An{constructor(e){super(),this.indexPath_=e,p(!E(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?je(e.name,n.name):r}makePost(e,n){const i=F(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new C(n,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,Gt);return new C($e,e)}toString(){return Ot(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hu extends An{compare(e,n){const i=e.node.compareTo(n.node);return i===0?je(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return C.MIN}maxPost(){return C.MAX}makePost(e,n){const i=F(e);return new C(n,i)}toString(){return".value"}}const Vu=new Hu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(t){return{type:"value",snapshotNode:t}}function at(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Lt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ft(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function $u(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Lt(n,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(at(n,i)):o.trackChildChange(Ft(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(O,(s,r)=>{n.hasChild(s)||i.trackChildChange(Lt(s,r))}),n.isLeafNode()||n.forEachChild(O,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Ft(s,r,o))}else i.trackChildChange(at(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.indexedFilter_=new Ji(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Bt.getStartPost_(e),this.endPost_=Bt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new C(n,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=m.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return n.forEachChild(O,(o,a)=>{r.matches(new C(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Bt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new C(n,i))||(i=m.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(u,f)=>h(f,u)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new C(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let u=s.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===n||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,l);if(d&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Ft(n,i,h)),a.updateImmediateChild(n,i);{r?.trackChildChange(Lt(n,h));const g=a.updateImmediateChild(n,m.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(at(u.name,u.node)),g.updateImmediateChild(u.name,u.node)):g}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Lt(c.name,c.node)),r.trackChildChange(at(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=O}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ot}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:$e}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===O}copy(){const e=new Zi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Gu(t){return t.loadsAllData()?new Ji(t.getIndex()):t.hasLimit()?new Yu(t):new Bt(t)}function hr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===O?n="$priority":t.index_===Vu?n="$value":t.index_===tt?n="$key":(p(t.index_ instanceof Uu,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=B(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=B(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+B(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=B(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+B(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function fr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==O&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn extends ko{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Yt("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=pn.getListenId_(e,i),a={};this.listens_[o]=a;const l=hr(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),rt(this.listens_,o)===a){let u;c?c===401?u="permission_denied":u="rest_error:"+c:u="ok",s(u,null)}})}unlisten(e,n){const i=pn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=hr(e._queryParams),i=e._path.toString(),s=new Ht;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+gl(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Pt(a.responseText)}catch{j("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&j("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _n(){return{value:null,children:new Map}}function Fo(t,e,n){if(E(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=v(e);t.children.has(i)||t.children.set(i,_n());const s=t.children.get(i);e=A(e),Fo(s,e,n)}}function mi(t,e,n){t.value!==null?n(e,t.value):qu(t,(i,s)=>{const r=new I(e.toString()+"/"+i);mi(s,r,n)})}function qu(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&$(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr=10*1e3,Ku=30*1e3,Qu=300*1e3;class Xu{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new ju(e);const i=pr+(Ku-pr)*Math.random();It(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;$(e,(s,r)=>{r>0&&ce(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),It(this.reportStats_.bind(this),Math.floor(Math.random()*2*Qu))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(se||(se={}));function es(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ts(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ns(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=se.ACK_USER_WRITE,this.source=es()}operationForChild(e){if(E(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new I(e));return new mn(b(),n,this.revert)}}else return p(v(this.path)===e,"operationForChild called for unrelated child."),new mn(A(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,n){this.source=e,this.path=n,this.type=se.LISTEN_COMPLETE}operationForChild(e){return E(this.path)?new Wt(this.source,b()):new Wt(this.source,A(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=se.OVERWRITE}operationForChild(e){return E(this.path)?new Ye(this.source,b(),this.snap.getImmediateChild(e)):new Ye(this.source,A(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=se.MERGE}operationForChild(e){if(E(this.path)){const n=this.children.subtree(new I(e));return n.isEmpty()?null:n.value?new Ye(this.source,b(),n.value):new lt(this.source,b(),n)}else return p(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new lt(this.source,A(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(E(e))return this.isFullyInitialized()&&!this.filtered_;const n=v(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Zu(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push($u(o.childName,o.snapshotNode))}),Ct(t,s,"child_removed",e,i,n),Ct(t,s,"child_added",e,i,n),Ct(t,s,"child_moved",r,i,n),Ct(t,s,"child_changed",e,i,n),Ct(t,s,"value",e,i,n),s}function Ct(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>td(t,a,l)),o.forEach(a=>{const l=ed(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function ed(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function td(t,e,n){if(e.childName==null||n.childName==null)throw ft("Should only compare child_ events.");const i=new C(e.childName,e.snapshotNode),s=new C(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(t,e){return{eventCache:t,serverCache:e}}function St(t,e,n,i){return Pn(new xe(e,n,i),t.serverCache)}function Bo(t,e,n,i){return Pn(t.eventCache,new xe(e,n,i))}function gn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Ge(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zn;const nd=()=>(Zn||(Zn=new K(Uc)),Zn);class k{static fromObject(e){let n=new k(null);return $(e,(i,s)=>{n=n.set(new I(i),s)}),n}constructor(e,n=nd()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:b(),value:this.value};if(E(e))return null;{const i=v(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(A(e),n);return r!=null?{path:M(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(E(e))return this;{const n=v(e),i=this.children.get(n);return i!==null?i.subtree(A(e)):new k(null)}}set(e,n){if(E(e))return new k(n,this.children);{const i=v(e),r=(this.children.get(i)||new k(null)).set(A(e),n),o=this.children.insert(i,r);return new k(this.value,o)}}remove(e){if(E(e))return this.children.isEmpty()?new k(null):new k(null,this.children);{const n=v(e),i=this.children.get(n);if(i){const s=i.remove(A(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new k(null):new k(this.value,r)}else return this}}get(e){if(E(e))return this.value;{const n=v(e),i=this.children.get(n);return i?i.get(A(e)):null}}setTree(e,n){if(E(e))return n;{const i=v(e),r=(this.children.get(i)||new k(null)).setTree(A(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new k(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(M(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,b(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(E(e))return null;{const r=v(e),o=this.children.get(r);return o?o.findOnPath_(A(e),M(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,b(),n)}foreachOnPath_(e,n,i){if(E(e))return this;{this.value&&i(n,this.value);const s=v(e),r=this.children.get(s);return r?r.foreachOnPath_(A(e),M(n,s),i):new k(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(M(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.writeTree_=e}static empty(){return new re(new k(null))}}function Tt(t,e,n){if(E(e))return new re(new k(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=q(s,e);return r=r.updateChild(o,n),new re(t.writeTree_.set(s,r))}else{const s=new k(n),r=t.writeTree_.setTree(e,s);return new re(r)}}}function gi(t,e,n){let i=t;return $(n,(s,r)=>{i=Tt(i,M(e,s),r)}),i}function _r(t,e){if(E(e))return re.empty();{const n=t.writeTree_.setTree(e,new k(null));return new re(n)}}function yi(t,e){return Ke(t,e)!=null}function Ke(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(q(n.path,e)):null}function mr(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(O,(i,s)=>{e.push(new C(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new C(i,s.value))}),e}function Ne(t,e){if(E(e))return t;{const n=Ke(t,e);return n!=null?new re(new k(n)):new re(t.writeTree_.subtree(e))}}function vi(t){return t.writeTree_.isEmpty()}function ct(t,e){return Wo(b(),t.writeTree_,e)}function Wo(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Wo(M(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(M(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(t,e){return $o(e,t)}function id(t,e,n,i,s){p(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Tt(t.visibleWrites,e,n)),t.lastWriteId=i}function sd(t,e,n,i){p(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=gi(t.visibleWrites,e,n),t.lastWriteId=i}function rd(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function od(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);p(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&ad(a,i.path)?s=!1:J(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return ld(t),!0;if(i.snap)t.visibleWrites=_r(t.visibleWrites,i.path);else{const a=i.children;$(a,l=>{t.visibleWrites=_r(t.visibleWrites,M(i.path,l))})}return!0}else return!1}function ad(t,e){if(t.snap)return J(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&J(M(t.path,n),e))return!0;return!1}function ld(t){t.visibleWrites=Uo(t.allWrites,cd,b()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function cd(t){return t.visible}function Uo(t,e,n){let i=re.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)J(n,o)?(a=q(n,o),i=Tt(i,a,r.snap)):J(o,n)&&(a=q(o,n),i=Tt(i,b(),r.snap.getChild(a)));else if(r.children){if(J(n,o))a=q(n,o),i=gi(i,a,r.children);else if(J(o,n))if(a=q(o,n),E(a))i=gi(i,b(),r.children);else{const l=rt(r.children,v(a));if(l){const c=l.getChild(A(a));i=Tt(i,b(),c)}}}else throw ft("WriteRecord should have .snap or .children")}}return i}function Ho(t,e,n,i,s){if(!i&&!s){const r=Ke(t.visibleWrites,e);if(r!=null)return r;{const o=Ne(t.visibleWrites,e);if(vi(o))return n;if(n==null&&!yi(o,b()))return null;{const a=n||m.EMPTY_NODE;return ct(o,a)}}}else{const r=Ne(t.visibleWrites,e);if(!s&&vi(r))return n;if(!s&&n==null&&!yi(r,b()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(J(c.path,e)||J(e,c.path))},a=Uo(t.allWrites,o,e),l=n||m.EMPTY_NODE;return ct(a,l)}}}function ud(t,e,n){let i=m.EMPTY_NODE;const s=Ke(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(O,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Ne(t.visibleWrites,e);return n.forEachChild(O,(o,a)=>{const l=ct(Ne(r,new I(o)),a);i=i.updateImmediateChild(o,l)}),mr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Ne(t.visibleWrites,e);return mr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function dd(t,e,n,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,n);if(yi(t.visibleWrites,r))return null;{const o=Ne(t.visibleWrites,r);return vi(o)?s.getChild(n):ct(o,s.getChild(n))}}function hd(t,e,n,i){const s=M(e,n),r=Ke(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Ne(t.visibleWrites,s);return ct(o,i.getNode().getImmediateChild(n))}else return null}function fd(t,e){return Ke(t.visibleWrites,e)}function pd(t,e,n,i,s,r,o){let a;const l=Ne(t.visibleWrites,e),c=Ke(l,b());if(c!=null)a=c;else if(n!=null)a=ct(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=u.getNext();for(;f&&d.length<s;)h(f,i)!==0&&d.push(f),f=u.getNext();return d}else return[]}function _d(){return{visibleWrites:re.empty(),allWrites:[],lastWriteId:-1}}function yn(t,e,n,i){return Ho(t.writeTree,t.treePath,e,n,i)}function is(t,e){return ud(t.writeTree,t.treePath,e)}function gr(t,e,n,i){return dd(t.writeTree,t.treePath,e,n,i)}function vn(t,e){return fd(t.writeTree,M(t.treePath,e))}function md(t,e,n,i,s,r){return pd(t.writeTree,t.treePath,e,n,i,s,r)}function ss(t,e,n){return hd(t.writeTree,t.treePath,e,n)}function Vo(t,e){return $o(M(t.treePath,e),t.writeTree)}function $o(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gd{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;p(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Ft(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Lt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,at(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ft(i,e.snapshotNode,s.oldSnap));else throw ft("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yd{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Yo=new yd;class rs{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new xe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ss(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ge(this.viewCache_),r=md(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vd(t){return{filter:t}}function Cd(t,e){p(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Ed(t,e,n,i,s){const r=new gd;let o,a;if(n.type===se.OVERWRITE){const c=n;c.source.fromUser?o=Ci(t,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!E(c.path),o=Cn(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===se.MERGE){const c=n;c.source.fromUser?o=bd(t,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Ei(t,e,c.path,c.children,i,s,a,r))}else if(n.type===se.ACK_USER_WRITE){const c=n;c.revert?o=Td(t,e,c.path,i,s,r):o=Id(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===se.LISTEN_COMPLETE)o=Sd(t,e,n.path,i,r);else throw ft("Unknown operation type: "+n.type);const l=r.getChanges();return wd(e,o,l),{viewCache:o,changes:l}}function wd(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=gn(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Lo(gn(e)))}}function Go(t,e,n,i,s,r){const o=e.eventCache;if(vn(i,n)!=null)return e;{let a,l;if(E(n))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ge(e),d=c instanceof m?c:m.EMPTY_NODE,h=is(i,d);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=yn(i,Ge(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=v(n);if(c===".priority"){p(Pe(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=gr(i,n,d,l);h!=null?a=t.filter.updatePriority(d,h):a=o.getNode()}else{const d=A(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const u=gr(i,n,o.getNode(),l);u!=null?h=o.getNode().getImmediateChild(c).updateChild(d,u):h=o.getNode().getImmediateChild(c)}else h=ss(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,d,s,r):a=o.getNode()}}return St(e,a,o.isFullyInitialized()||E(n),t.filter.filtersNodes())}}function Cn(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(E(n))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(n,i);c=d.updateFullNode(l.getNode(),f,null)}else{const f=v(n);if(!l.isCompleteForPath(n)&&Pe(n)>1)return e;const _=A(n),y=l.getNode().getImmediateChild(f).updateChild(_,i);f===".priority"?c=d.updatePriority(l.getNode(),y):c=d.updateChild(l.getNode(),f,y,_,Yo,null)}const h=Bo(e,c,l.isFullyInitialized()||E(n),d.filtersNodes()),u=new rs(s,h,r);return Go(t,h,n,s,u,a)}function Ci(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const d=new rs(s,e,r);if(E(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=St(e,c,!0,t.filter.filtersNodes());else{const h=v(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=St(e,c,a.isFullyInitialized(),a.isFiltered());else{const u=A(n),f=a.getNode().getImmediateChild(h);let _;if(E(u))_=i;else{const g=d.getCompleteChild(h);g!=null?ji(u)===".priority"&&g.getChild(Ro(u)).isEmpty()?_=g:_=g.updateChild(u,i):_=m.EMPTY_NODE}if(f.equals(_))l=e;else{const g=t.filter.updateChild(a.getNode(),h,_,u,d,o);l=St(e,g,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function yr(t,e){return t.eventCache.isCompleteForChild(e)}function bd(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=M(n,l);yr(e,v(d))&&(a=Ci(t,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=M(n,l);yr(e,v(d))||(a=Ci(t,a,d,c,s,r,o))}),a}function vr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ei(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;E(n)?c=i:c=new k(null).setTree(n,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,u)=>{if(d.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),_=vr(t,f,u);l=Cn(t,l,new I(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,u)=>{const f=!e.serverCache.isCompleteForChild(h)&&u.value===null;if(!d.hasChild(h)&&!f){const _=e.serverCache.getNode().getImmediateChild(h),g=vr(t,_,u);l=Cn(t,l,new I(h),g,s,r,o,a)}}),l}function Id(t,e,n,i,s,r,o){if(vn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(E(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Cn(t,e,n,l.getNode().getChild(n),s,r,a,o);if(E(n)){let c=new k(null);return l.getNode().forEachChild(tt,(d,h)=>{c=c.set(new I(d),h)}),Ei(t,e,n,c,s,r,a,o)}else return e}else{let c=new k(null);return i.foreach((d,h)=>{const u=M(n,d);l.isCompleteForPath(u)&&(c=c.set(d,l.getNode().getChild(u)))}),Ei(t,e,n,c,s,r,a,o)}}function Sd(t,e,n,i,s){const r=e.serverCache,o=Bo(e,r.getNode(),r.isFullyInitialized()||E(n),r.isFiltered());return Go(t,o,n,i,Yo,s)}function Td(t,e,n,i,s,r){let o;if(vn(i,n)!=null)return e;{const a=new rs(i,e,s),l=e.eventCache.getNode();let c;if(E(n)||v(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=yn(i,Ge(e));else{const h=e.serverCache.getNode();p(h instanceof m,"serverChildren would be complete if leaf node"),d=is(i,h)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=v(n);let h=ss(i,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=t.filter.updateChild(l,d,h,A(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,m.EMPTY_NODE,A(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=yn(i,Ge(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||vn(i,b())!=null,St(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ji(i.getIndex()),r=Gu(i);this.processor_=vd(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new xe(l,o.isFullyInitialized(),s.filtersNodes()),h=new xe(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Pn(h,d),this.eventGenerator_=new Ju(this.query_)}get query(){return this.query_}}function Nd(t){return t.viewCache_.serverCache.getNode()}function Rd(t){return gn(t.viewCache_)}function Ad(t,e){const n=Ge(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!E(e)&&!n.getImmediateChild(v(e)).isEmpty())?n.getChild(e):null}function Cr(t){return t.eventRegistrations_.length===0}function Pd(t,e){t.eventRegistrations_.push(e)}function Er(t,e,n){const i=[];if(n){p(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function wr(t,e,n,i){e.type===se.MERGE&&e.source.queryId!==null&&(p(Ge(t.viewCache_),"We should always have a full cache before handling merges"),p(gn(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Ed(t.processor_,s,e,n,i);return Cd(t.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,zo(t,r.changes,r.viewCache.eventCache.getNode(),null)}function xd(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(O,(r,o)=>{i.push(at(r,o))}),n.isFullyInitialized()&&i.push(Lo(n.getNode())),zo(t,i,n.getNode(),e)}function zo(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Zu(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let En;class qo{constructor(){this.views=new Map}}function Dd(t){p(!En,"__referenceConstructor has already been defined"),En=t}function Md(){return p(En,"Reference.ts has not been loaded"),En}function Od(t){return t.views.size===0}function os(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),wr(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(wr(o,e,n,i));return r}}function jo(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=yn(n,s?i:null),l=!1;a?l=!0:i instanceof m?(a=is(n,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=Pn(new xe(a,l,!1),new xe(i,s,!1));return new kd(e,c)}return o}function Ld(t,e,n,i,s,r){const o=jo(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Pd(o,n),xd(o,n)}function Fd(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=De(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(Er(c,n,i)),Cr(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(Er(l,n,i)),Cr(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!De(t)&&r.push(new(Md())(e._repo,e._path)),{removed:r,events:o}}function Ko(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Re(t,e){let n=null;for(const i of t.views.values())n=n||Ad(i,e);return n}function Qo(t,e){if(e._queryParams.loadsAllData())return Dn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Xo(t,e){return Qo(t,e)!=null}function De(t){return Dn(t)!=null}function Dn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wn;function Bd(t){p(!wn,"__referenceConstructor has already been defined"),wn=t}function Wd(){return p(wn,"Reference.ts has not been loaded"),wn}let Ud=1;class br{constructor(e){this.listenProvider_=e,this.syncPointTree_=new k(null),this.pendingWriteTree_=_d(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Jo(t,e,n,i,s){return id(t.pendingWriteTree_,e,n,i,s),s?_t(t,new Ye(es(),e,n)):[]}function Hd(t,e,n,i){sd(t.pendingWriteTree_,e,n,i);const s=k.fromObject(n);return _t(t,new lt(es(),e,s))}function be(t,e,n=!1){const i=rd(t.pendingWriteTree_,e);if(od(t.pendingWriteTree_,e)){let r=new k(null);return i.snap!=null?r=r.set(b(),!0):$(i.children,o=>{r=r.set(new I(o),!0)}),_t(t,new mn(i.path,r,n))}else return[]}function zt(t,e,n){return _t(t,new Ye(ts(),e,n))}function Vd(t,e,n){const i=k.fromObject(n);return _t(t,new lt(ts(),e,i))}function $d(t,e){return _t(t,new Wt(ts(),e))}function Yd(t,e,n){const i=ls(t,n);if(i){const s=cs(i),r=s.path,o=s.queryId,a=q(r,e),l=new Wt(ns(o),a);return us(t,r,l)}else return[]}function bn(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Xo(o,e))){const l=Fd(o,e,n,i);Od(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(u=>u._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(u,f)=>De(f));if(d&&!h){const u=t.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=qd(u);for(let _=0;_<f.length;++_){const g=f[_],y=g.query,X=na(t,g);t.listenProvider_.startListening(kt(y),Ut(t,y),X.hashFn,X.onComplete)}}}!h&&c.length>0&&!i&&(d?t.listenProvider_.stopListening(kt(e),null):c.forEach(u=>{const f=t.queryToTagMap.get(Mn(u));t.listenProvider_.stopListening(kt(u),f)}))}jd(t,c)}return a}function Zo(t,e,n,i){const s=ls(t,i);if(s!=null){const r=cs(s),o=r.path,a=r.queryId,l=q(o,e),c=new Ye(ns(a),l,n);return us(t,o,c)}else return[]}function Gd(t,e,n,i){const s=ls(t,i);if(s){const r=cs(s),o=r.path,a=r.queryId,l=q(o,e),c=k.fromObject(n),d=new lt(ns(a),l,c);return us(t,o,d)}else return[]}function wi(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(u,f)=>{const _=q(u,s);r=r||Re(f,_),o=o||De(f)});let a=t.syncPointTree_.get(s);a?(o=o||De(a),r=r||Re(a,b())):(a=new qo,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,_)=>{const g=Re(_,b());g&&(r=r.updateImmediateChild(f,g))}));const c=Xo(a,e);if(!c&&!e._queryParams.loadsAllData()){const u=Mn(e);p(!t.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=Kd();t.queryToTagMap.set(u,f),t.tagToQueryMap.set(f,u)}const d=xn(t.pendingWriteTree_,s);let h=Ld(a,e,n,d,r,l);if(!c&&!o&&!i){const u=Qo(a,e);h=h.concat(Qd(t,e,u))}return h}function as(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=q(o,e),c=Re(a,l);if(c)return c});return Ho(s,e,r,n,!0)}function zd(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const h=q(c,n);i=i||Re(d,h)});let s=t.syncPointTree_.get(n);s?i=i||Re(s,b()):(s=new qo,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new xe(i,!0,!1):null,a=xn(t.pendingWriteTree_,e._path),l=jo(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return Rd(l)}function _t(t,e){return ea(e,t.syncPointTree_,null,xn(t.pendingWriteTree_,b()))}function ea(t,e,n,i){if(E(t.path))return ta(t,e,n,i);{const s=e.get(b());n==null&&s!=null&&(n=Re(s,b()));let r=[];const o=v(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=Vo(i,o);r=r.concat(ea(a,l,c,d))}return s&&(r=r.concat(os(s,t,i,n))),r}}function ta(t,e,n,i){const s=e.get(b());n==null&&s!=null&&(n=Re(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Vo(i,o),d=t.operationForChild(o);d&&(r=r.concat(ta(d,a,l,c)))}),s&&(r=r.concat(os(s,t,i,n))),r}function na(t,e){const n=e.query,i=Ut(t,n);return{hashFn:()=>(Nd(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Yd(t,n._path,i):$d(t,n._path);{const r=$c(s,n);return bn(t,n,null,r)}}}}function Ut(t,e){const n=Mn(e);return t.queryToTagMap.get(n)}function Mn(t){return t._path.toString()+"$"+t._queryIdentifier}function ls(t,e){return t.tagToQueryMap.get(e)}function cs(t){const e=t.indexOf("$");return p(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new I(t.substr(0,e))}}function us(t,e,n){const i=t.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=xn(t.pendingWriteTree_,e);return os(i,n,s,null)}function qd(t){return t.fold((e,n,i)=>{if(n&&De(n))return[Dn(n)];{let s=[];return n&&(s=Ko(n)),$(i,(r,o)=>{s=s.concat(o)}),s}})}function kt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Wd())(t._repo,t._path):t}function jd(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=Mn(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Kd(){return Ud++}function Qd(t,e,n){const i=e._path,s=Ut(t,e),r=na(t,n),o=t.listenProvider_.startListening(kt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)p(!De(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!E(c)&&d&&De(d))return[Dn(d).query];{let u=[];return d&&(u=u.concat(Ko(d).map(f=>f.query))),$(h,(f,_)=>{u=u.concat(_)}),u}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(kt(d),Ut(t,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new ds(n)}node(){return this.node_}}class hs{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=M(this.path_,e);return new hs(this.syncTree_,n)}node(){return as(this.syncTree_,this.path_)}}const Xd=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ir=function(t,e,n){if(!t||typeof t!="object")return t;if(p(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return Jd(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Zd(t[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},Jd=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:p(!1,"Unexpected server value: "+t)}},Zd=function(t,e,n){t.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},ia=function(t,e,n,i){return fs(e,new hs(n,t),i)},sa=function(t,e,n){return fs(t,new ds(e),n)};function fs(t,e,n){const i=t.getPriority().val(),s=Ir(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Ir(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new W(a,F(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new W(s))),o.forEachChild(O,(a,l)=>{const c=fs(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function _s(t,e){let n=e instanceof I?e:new I(e),i=t,s=v(n);for(;s!==null;){const r=rt(i.node.children,s)||{children:{},childCount:0};i=new ps(s,i,r),n=A(n),s=v(n)}return i}function mt(t){return t.node.value}function ra(t,e){t.node.value=e,bi(t)}function oa(t){return t.node.childCount>0}function eh(t){return mt(t)===void 0&&!oa(t)}function On(t,e){$(t.node.children,(n,i)=>{e(new ps(n,t,i))})}function aa(t,e,n,i){n&&e(t),On(t,s=>{aa(s,e,!0)})}function th(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function qt(t){return new I(t.parent===null?t.name:qt(t.parent)+"/"+t.name)}function bi(t){t.parent!==null&&nh(t.parent,t.name,t)}function nh(t,e,n){const i=eh(n),s=ce(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,bi(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,bi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih=/[\[\].#$\/\u0000-\u001F\u007F]/,sh=/[\[\].#$\u0000-\u001F\u007F]/,ei=10*1024*1024,ms=function(t){return typeof t=="string"&&t.length!==0&&!ih.test(t)},la=function(t){return typeof t=="string"&&t.length!==0&&!sh.test(t)},rh=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),la(t)},oh=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!$i(t)||t&&typeof t=="object"&&ce(t,".sv")},ca=function(t,e,n,i){i&&e===void 0||Ln(Nn(t,"value"),e,n)},Ln=function(t,e,n){const i=n instanceof I?new bu(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Be(i));if(typeof e=="function")throw new Error(t+"contains a function "+Be(i)+" with contents = "+e.toString());if($i(e))throw new Error(t+"contains "+e.toString()+" "+Be(i));if(typeof e=="string"&&e.length>ei/3&&Rn(e)>ei)throw new Error(t+"contains a string greater than "+ei+" utf8 bytes "+Be(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if($(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ms(o)))throw new Error(t+" contains an invalid key ("+o+") "+Be(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Iu(i,o),Ln(t,a,i),Su(i)}),s&&r)throw new Error(t+' contains ".value" child '+Be(i)+" in addition to actual children.")}},ah=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Ot(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ms(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(wu);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&J(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},lh=function(t,e,n,i){const s=Nn(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];$(e,(o,a)=>{const l=new I(o);if(Ln(s,a,M(n,l)),ji(l)===".priority"&&!oh(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),ah(s,r)},ua=function(t,e,n,i){if(!la(n))throw new Error(Nn(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},ch=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ua(t,e,n)},gs=function(t,e){if(v(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},uh=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ms(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!rh(n))throw new Error(Nn(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Fn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Ki(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function da(t,e,n){Fn(t,n),ha(t,i=>Ki(i,e))}function ee(t,e,n){Fn(t,n),ha(t,i=>J(i,e)||J(e,i))}function ha(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(hh(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function hh(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();bt&&V("event: "+n.toString()),pt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh="repo_interrupt",ph=25;class _h{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new dh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=_n(),this.transactionQueueTree_=new ps,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function mh(t,e,n){if(t.stats_=zi(t.repoInfo_),t.forceRestClient_||qc())t.server_=new pn(t.repoInfo_,(i,s,r,o)=>{Sr(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Tr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{B(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new ge(t.repoInfo_,e,(i,s,r,o)=>{Sr(t,i,s,r,o)},i=>{Tr(t,i)},i=>{gh(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=Jc(t.repoInfo_,()=>new Xu(t.stats_,t.server_)),t.infoData_=new zu,t.infoSyncTree_=new br({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=zt(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),ys(t,"connected",!1),t.serverSyncTree_=new br({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ee(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function fa(t){const n=t.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Bn(t){return Xd({timestamp:fa(t)})}function Sr(t,e,n,i,s){t.dataUpdateCount++;const r=new I(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=an(n,c=>F(c));o=Gd(t.serverSyncTree_,r,l,s)}else{const l=F(n);o=Zo(t.serverSyncTree_,r,l,s)}else if(i){const l=an(n,c=>F(c));o=Vd(t.serverSyncTree_,r,l)}else{const l=F(n);o=zt(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=ut(t,r)),ee(t.eventQueue_,a,o)}function Tr(t,e){ys(t,"connected",e),e===!1&&Eh(t)}function gh(t,e){$(e,(n,i)=>{ys(t,n,i)})}function ys(t,e,n){const i=new I("/.info/"+e),s=F(n);t.infoData_.updateSnapshot(i,s);const r=zt(t.infoSyncTree_,i,s);ee(t.eventQueue_,i,r)}function vs(t){return t.nextWriteId_++}function yh(t,e,n){const i=zd(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=F(s).withIndex(e._queryParams.getIndex());wi(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=zt(t.serverSyncTree_,e._path,r);else{const a=Ut(t.serverSyncTree_,e);o=Zo(t.serverSyncTree_,e._path,r,a)}return ee(t.eventQueue_,e._path,o),bn(t.serverSyncTree_,e,n,null,!0),r},s=>(jt(t,"get for query "+B(e)+" failed: "+s),Promise.reject(new Error(s))))}function vh(t,e,n,i,s){jt(t,"set",{path:e.toString(),value:n,priority:i});const r=Bn(t),o=F(n,i),a=as(t.serverSyncTree_,e),l=sa(o,a,r),c=vs(t),d=Jo(t.serverSyncTree_,e,l,c,!0);Fn(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(u,f)=>{const _=u==="ok";_||j("set at "+e+" failed: "+u);const g=be(t.serverSyncTree_,c,!_);ee(t.eventQueue_,e,g),Ii(t,s,u,f)});const h=Es(t,e);ut(t,h),ee(t.eventQueue_,h,[])}function Ch(t,e,n,i){jt(t,"update",{path:e.toString(),value:n});let s=!0;const r=Bn(t),o={};if($(n,(a,l)=>{s=!1,o[a]=ia(M(e,a),F(l),t.serverSyncTree_,r)}),s)V("update() called with empty data.  Don't do anything."),Ii(t,i,"ok",void 0);else{const a=vs(t),l=Hd(t.serverSyncTree_,e,o,a);Fn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const h=c==="ok";h||j("update at "+e+" failed: "+c);const u=be(t.serverSyncTree_,a,!h),f=u.length>0?ut(t,e):e;ee(t.eventQueue_,f,u),Ii(t,i,c,d)}),$(n,c=>{const d=Es(t,M(e,c));ut(t,d)}),ee(t.eventQueue_,e,[])}}function Eh(t){jt(t,"onDisconnectEvents");const e=Bn(t),n=_n();mi(t.onDisconnect_,b(),(s,r)=>{const o=ia(s,r,t.serverSyncTree_,e);Fo(n,s,o)});let i=[];mi(n,b(),(s,r)=>{i=i.concat(zt(t.serverSyncTree_,s,r));const o=Es(t,s);ut(t,o)}),t.onDisconnect_=_n(),ee(t.eventQueue_,b(),i)}function wh(t,e,n){let i;v(e._path)===".info"?i=wi(t.infoSyncTree_,e,n):i=wi(t.serverSyncTree_,e,n),da(t.eventQueue_,e._path,i)}function pa(t,e,n){let i;v(e._path)===".info"?i=bn(t.infoSyncTree_,e,n):i=bn(t.serverSyncTree_,e,n),da(t.eventQueue_,e._path,i)}function bh(t){t.persistentConnection_&&t.persistentConnection_.interrupt(fh)}function jt(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),V(n,...e)}function Ii(t,e,n,i){e&&pt(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function _a(t,e,n){return as(t.serverSyncTree_,e,n)||m.EMPTY_NODE}function Cs(t,e=t.transactionQueueTree_){if(e||Wn(t,e),mt(e)){const n=ga(t,e);p(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Ih(t,qt(e),n)}else oa(e)&&On(e,n=>{Cs(t,n)})}function Ih(t,e,n){const i=n.map(c=>c.currentWriteId),s=_a(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const d=n[c];p(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=q(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{jt(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let u=0;u<n.length;u++)n[u].status=2,d=d.concat(be(t.serverSyncTree_,n[u].currentWriteId)),n[u].onComplete&&h.push(()=>n[u].onComplete(null,!0,n[u].currentOutputSnapshotResolved)),n[u].unwatcher();Wn(t,_s(t.transactionQueueTree_,e)),Cs(t,t.transactionQueueTree_),ee(t.eventQueue_,e,d);for(let u=0;u<h.length;u++)pt(h[u])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{j("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}ut(t,e)}},o)}function ut(t,e){const n=ma(t,e),i=qt(n),s=ga(t,n);return Sh(t,s,i),i}function Sh(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=q(n,l.path);let d=!1,h;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,s=s.concat(be(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=ph)d=!0,h="maxretry",s=s.concat(be(t.serverSyncTree_,l.currentWriteId,!0));else{const u=_a(t,l.path,o);l.currentInputSnapshot=u;const f=e[a].update(u.val());if(f!==void 0){Ln("transaction failed: Data returned ",f,l.path);let _=F(f);typeof f=="object"&&f!=null&&ce(f,".priority")||(_=_.updatePriority(u.getPriority()));const y=l.currentWriteId,X=Bn(t),de=sa(_,u,X);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=de,l.currentWriteId=vs(t),o.splice(o.indexOf(y),1),s=s.concat(Jo(t.serverSyncTree_,l.path,de,l.currentWriteId,l.applyLocally)),s=s.concat(be(t.serverSyncTree_,y,!0))}else d=!0,h="nodata",s=s.concat(be(t.serverSyncTree_,l.currentWriteId,!0))}ee(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,(function(u){setTimeout(u,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}Wn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)pt(i[a]);Cs(t,t.transactionQueueTree_)}function ma(t,e){let n,i=t.transactionQueueTree_;for(n=v(e);n!==null&&mt(i)===void 0;)i=_s(i,n),e=A(e),n=v(e);return i}function ga(t,e){const n=[];return ya(t,e,n),n.sort((i,s)=>i.order-s.order),n}function ya(t,e,n){const i=mt(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);On(e,s=>{ya(t,s,n)})}function Wn(t,e){const n=mt(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,ra(e,n.length>0?n:void 0)}On(e,i=>{Wn(t,i)})}function Es(t,e){const n=qt(ma(t,e)),i=_s(t.transactionQueueTree_,e);return th(i,s=>{ti(t,s)}),ti(t,i),aa(i,s=>{ti(t,s)}),n}function ti(t,e){const n=mt(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(p(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(be(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?ra(e,void 0):n.length=r+1,ee(t.eventQueue_,qt(e),s);for(let o=0;o<i.length;o++)pt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Th(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function kh(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):j(`Invalid query segment '${n}' in query '${t}'`)}return e}const kr=function(t,e){const n=Nh(t),i=n.namespace;n.domain==="firebase.com"&&Ce(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Ce("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Bc();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Co(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new I(n.pathString)}},Nh=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(d,h)),d<h&&(s=Th(t.substring(d,h)));const u=kh(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Rh=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Nr.charAt(n%64),n=Math.floor(n/64);p(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Nr.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+B(this.snapshot.exportVal())}}class Ca{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class bs{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return E(this._path)?null:ji(this._path)}get ref(){return new ue(this._repo,this._path)}get _queryIdentifier(){const e=fr(this._queryParams),n=Yi(e);return n==="{}"?"default":n}get _queryObject(){return fr(this._queryParams)}isEqual(e){if(e=qe(e),!(e instanceof bs))return!1;const n=this._repo===e._repo,i=Ki(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Eu(this._path)}}class ue extends bs{constructor(e,n){super(e,n,new Zi,!1)}get parent(){const e=Ro(this._path);return e===null?null:new ue(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class dt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new I(e),i=ht(this.ref,e);return new dt(this._node.getChild(n),i,O)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new dt(s,ht(this.ref,i),O)))}hasChild(e){const n=new I(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function te(t,e){return t=qe(t),t._checkNotDeleted("ref"),e!==void 0?ht(t._root,e):t._root}function ht(t,e){return t=qe(t),v(t._path)===null?ch("child","path",e):ua("child","path",e),new ue(t._repo,M(t._path,e))}function Ah(t,e){t=qe(t),gs("push",t._path),ca("push",e,t._path,!0);const n=fa(t._repo),i=Rh(n),s=ht(t,i),r=ht(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Rr(t){return gs("remove",t._path),Kt(t,null)}function Kt(t,e){t=qe(t),gs("set",t._path),ca("set",e,t._path,!1);const n=new Ht;return vh(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Ea(t,e){lh("update",e,t._path);const n=new Ht;return Ch(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Ph(t){t=qe(t);const e=new ws(()=>{}),n=new Qt(e);return yh(t._repo,t,n).then(i=>new dt(i,new ue(t._repo,t._path),t._queryParams.getIndex()))}class Qt{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new va("value",this,new dt(e.snapshotNode,new ue(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ca(this,e,n):null}matches(e){return e instanceof Qt?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Un{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ca(this,e,n):null}createEvent(e,n){p(e.childName!=null,"Child events should have a childName.");const i=ht(new ue(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new va(e.type,this,new dt(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Un?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Is(t,e,n,i,s){const r=new ws(n,void 0),o=e==="value"?new Qt(r):new Un(e,r);return wh(t._repo,t,o),()=>pa(t._repo,t,o)}function wa(t,e,n,i){return Is(t,"value",e)}function ba(t,e,n,i){return Is(t,"child_added",e)}function xh(t,e,n,i){return Is(t,"child_removed",e)}function Ia(t,e,n){let i=null;const s=n?new ws(n):null;e==="value"?i=new Qt(s):e&&(i=new Un(e,s)),pa(t._repo,t,i)}Dd(ue);Bd(ue);/**
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
 */const Dh="FIREBASE_DATABASE_EMULATOR_HOST",Si={};let Mh=!1;function Oh(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Hi(r);t.repoInfo_=new Co(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Lh(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Ce("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),V("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=kr(r,s),a=o.repoInfo,l;typeof process<"u"&&Ks&&(l=Ks[Dh]),l?(r=`http://${l}?ns=${a.namespace}`,o=kr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Kc(t.name,t.options,e);uh("Invalid Firebase Database URL",o),E(o.path)||Ce("Database URL must point to the root of a Firebase Database (not including a child path).");const d=Bh(a,t,c,new jc(t,n));return new Wh(d,t)}function Fh(t,e){const n=Si[e];(!n||n[t.key]!==t)&&Ce(`Database ${e}(${t.repoInfo_}) has already been deleted.`),bh(t),delete n[t.key]}function Bh(t,e,n,i){let s=Si[e.name];s||(s={},Si[e.name]=s);let r=s[t.toURLString()];return r&&Ce("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new _h(t,Mh,n,i),s[t.toURLString()]=r,r}class Wh{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(mh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ue(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Fh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ce("Cannot call "+e+" on a deleted database.")}}function Uh(t=Ec(),e){const n=mc(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=tl("database");i&&Hh(n,...i)}return n}function Hh(t,e,n,i={}){t=qe(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&ln(i,r.repoInfo_.emulatorOptions))return;Ce("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Ce('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new nn(nn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:il(i.mockUserToken,t.app.options.projectId);o=new nn(a)}Hi(e)&&(nl(e),ol("Database",!0)),Oh(r,s,i,o)}/**
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
 */function Vh(t){xc(Cc),un(new xt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Lh(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),Ze(Qs,Xs,t),Ze(Qs,Xs,"esm2020")}ge.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ge.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Vh();var $h="firebase",Yh="12.4.0";/**
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
 */Ze($h,Yh,"app");const Gh={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},zh=no(Gh),ne=Uh(zh),Ti=[];function Ss(t,e,n){Ti.push({ref:t,type:e,callback:n})}function qh(){Ti.forEach(({ref:t,type:e,callback:n})=>{Ia(t,e,n)}),Ti.length=0}function ki(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=c=>{try{const d=c.target;if(t.contains(d))return;for(const h of o)if(h&&h.contains&&h.contains(d)||h===d)return;e(c)}catch(d){console.error("closeOnClickOutside handler error:",d)}},l=c=>{s&&c.key==="Escape"&&e(c)};return r.forEach(c=>document.addEventListener(c,a,{passive:!0})),s&&document.addEventListener("keydown",l),function(){r.forEach(d=>document.removeEventListener(d,a,{passive:!0})),s&&document.removeEventListener("keydown",l)}}function jh(t,e,n={}){return ki(t,e,{...n,events:["dblclick"]})}const Ts=t=>t?!0:(console.warn("Element not found."),!1),ks=t=>{if(Ts(t))return t.classList.contains("hidden")},L=t=>{Ts(t)&&t.classList.remove("hidden")},w=t=>{Ts(t)&&t.classList.add("hidden")},Sa=t=>t.classList.contains("smallFrame"),nt=t=>{if(t&&!Sa(t)){t.classList.add("smallFrame");const e=document.createElement("div");e.classList.add("smallFrame-toggle-div");const n=document.createElement("span");n.classList.add("smallFrame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Je=t=>{if(Sa(t)){t.classList.remove("smallFrame");const e=document.querySelector(".smallFrame-close");e&&e.remove()}};function Ta(t){return document.pictureInPictureElement===t}const he=document.getElementById("install-btn"),Ni=document.getElementById("local-video-el"),_e=document.getElementById("local-video-box"),ae=document.getElementById("remote-video-el"),Y=document.getElementById("remote-video-box"),T=document.getElementById("shared-video-el"),Ar=document.getElementById("shared-video-box"),it=document.getElementById("chat-controls"),ze=document.getElementById("call-btn"),Xt=document.getElementById("hang-up-btn"),Pr=document.getElementById("switch-camera-btn"),xr=document.getElementById("status");document.getElementById("link-container");document.getElementById("videos");const Kh=document.getElementById("sync-status"),ka=document.getElementById("share-link");document.getElementById("stream-url-input");const Jt=document.getElementById("mute-btn"),Qh=document.getElementById("fullscreenPartnerBtn"),Xh=document.getElementById("mic-btn"),Jh=document.getElementById("camera-btn");document.getElementById("fullscreen-app-btn");document.getElementById("titleHeader");document.getElementById("titleLink");document.getElementById("titleText");function H(t){xr?xr.textContent=t:console.warn("Status div not found in the DOM.")}function Na(t,{inactivityMs:e=2500,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const c=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(y=>!Array.isArray(o)||!o.includes(y));function d(){L(t);try{typeof i=="function"&&i()}catch(y){console.warn("showHideOnInactivity onShow callback error:",y)}a&&clearTimeout(a),a=setTimeout(()=>{w(t);try{typeof s=="function"&&s()}catch(y){console.warn("showHideOnInactivity onHide callback error:",y)}a=null},e)}c.forEach(y=>n.addEventListener(y,d,{passive:!0}));function h(){if(document.hidden){a&&(clearTimeout(a),a=null);try{w(t)}catch(y){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",y)}}else d()}document.addEventListener("visibilitychange",h);function u(y){if(!y.relatedTarget){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(X){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",X)}}}n.addEventListener("mouseout",u);function f(y){if(r&&(y.key==="Escape"||y.key==="Esc")){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(X){console.warn("showHideOnInactivity onHide (esc) callback error:",X)}}}document.addEventListener("keydown",f);function _(){a||d()}n.addEventListener("touchend",_,{passive:!0}),w(t);function g(){c.forEach(y=>n.removeEventListener(y,d)),document.removeEventListener("visibilitychange",h),n.removeEventListener("mouseout",u),n.removeEventListener("touchend",_),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return g}const Ri=(t,e)=>{},Ra={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,highpassFilter:!0,typingNoiseDetection:!0}},Ai={desktop:{landscape:{width:{min:1280,ideal:window.innerWidth,max:2560},height:{min:720,ideal:window.innerHeight,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"},portrait:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"}},mobile:{portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},aspectRatio:{ideal:9/16},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"},landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},aspectRatio:{ideal:16/9},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"}},relyOnBrowserDefaults:!0};function Zh(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function ef(){return Zh()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function tf(){const t=await ef();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function nf({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user",r=Ns(s);try{const o=await navigator.mediaDevices.getUserMedia({video:r,audio:Ra.default}),a=o.getVideoTracks()[0],l=o.getAudioTracks()[0],c=t.getVideoTracks()[0],d=c?c.enabled:!0,h=t.getAudioTracks()[0],u=h?!h.enabled:!1;if(i){const f=i.getSenders().find(g=>g.track&&g.track.kind==="video");f&&f.replaceTrack(a);const _=i.getSenders().find(g=>g.track&&g.track.kind==="audio");_&&l&&_.replaceTrack(l)}return a&&(a.enabled=d),l&&(l.enabled=!u),t.getTracks().forEach(f=>f.stop()),e.srcObject=new MediaStream([a].filter(Boolean)),{newStream:o,facingMode:s}}catch(o){return console.error("Failed to switch camera:",o),null}}let ni=!1,Oe=null,Le=null;function sf({getLocalStream:t,getFacingMode:e}){return Oe&&Le&&Oe.removeEventListener("change",Le),Oe=window.matchMedia("(orientation: portrait)"),Le=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";rf({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},Oe.addEventListener("change",Le),()=>{Oe&&Le&&Oe.removeEventListener("change",Le),Oe=null,Le=null}}async function rf({localStream:t,currentFacingMode:e}){if(!(ni||!t?.getVideoTracks()[0])){ni=!0;try{const n=t.getVideoTracks()[0],i=Ns(e);Ri("Applying constraints:",i),await n.applyConstraints(i),Ri("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ni=!1}}}function of(){return window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180}function Ns(t){const e=of()?"portrait":"landscape";return/Mobi|Android/i.test(navigator.userAgent)?{facingMode:t,...Ai.mobile[e]}:{facingMode:t,...Ai.desktop}}let Pi=!1,In=[];function af(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function lf(t,e,n){n&&(n.muted=!t,n.volume=e)}function cf(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function uf(t,e){if(!t)return;const n=()=>{if(t.muted!==Pi){const i=e.querySelector("i");i.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Pi=t.muted}};t.addEventListener("volumechange",n),In.push(()=>{t&&t.removeEventListener("volumechange",n)})}function df({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:l,fullscreenPartnerBtn:c}){r&&(r.onclick=()=>{const u=t(),f=e();if(!f||!u)return;const _=!f.muted;af(!_,u),lf(!_,0,f),cf(_,r)}),o&&(o.onclick=()=>{const u=t();if(!u)return;const f=u.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const _=o.querySelector("i");_.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});let d="user";const h=sf({getLocalStream:t,getFacingMode:()=>d});In.push(h),a&&(a.onclick=async()=>{const u=await nf({localStream:t(),localVideo:e(),currentFacingMode:d,peerConnection:i()||null});u?(d=u.facingMode,console.log("Switched camera to facingMode:",d),u.newStream&&typeof s=="function"&&s(u.newStream)):console.error("Camera switch failed.")}),l&&(l.onclick=()=>{const u=n();u&&(u.muted=!u.muted)}),c&&(c.onclick=()=>{const u=n();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()})}function hf(){In.forEach(t=>t()),In=[],Pi=!1}const Dr="yt-video-box",xi="yt-player-root";let x=null,Ee=!1;const Nt=()=>x,ff=()=>Ee,Aa=t=>Ee=t,Ve=()=>{const t=document.getElementById(Dr);if(!t)throw new Error(`Container #${Dr} not found`);return t};function pf(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Pa(){const t=Ve();if(!document.getElementById(xi)){const e=document.createElement("div");e.id=xi,t.appendChild(e)}L(t)}function Di(){const t=Ve();w(t)}function ii(){const t=Ve();return t&&!t.classList.contains("hidden")}function Mi(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function xa(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function _f({url:t,onReady:e,onStateChange:n}){const i=xa(t);if(!i)throw new Error("Invalid YouTube URL");if(await pf(),x){try{x.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}x=null}const s=(o=!0)=>{const a=Ve(),l=x.getIframe();if(l&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===l)try{l.blur()}catch{}}if(o){const c=d=>{if(d.code==="Space"){const h=Ve(),u=x.getIframe();if(document.activeElement===u||document.activeElement===h)return;d.preventDefault(),console.debug("Space pressed, refocusing iframe"),x.getPlayerState()!==window.YT.PlayerState.PLAYING?As():Hn()}};document.addEventListener("keydown",c,{once:!0})}}},r=()=>{const o=Ve(),a=x.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Pa(),new Promise((o,a)=>{try{x=new window.YT.Player(xi,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:l=>{Ee=!0,e&&e(l),o(x)},onStateChange:l=>{l.data===window.YT.PlayerState.ENDED&&s(!1),l.data===window.YT.PlayerState.PAUSED&&s(),l.data===window.YT.PlayerState.PLAYING&&r(),n&&n(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function Rs(){if(x){try{Di(),x.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}x=null,Ee=!1}}function As(){x&&Ee&&x.playVideo()}function Hn(){x&&Ee&&x.pauseVideo()}function mf(t){x&&Ee&&x.seekTo(t,!0)}function Sn(){return x&&Ee?x.getCurrentTime():0}function Ps(){return x&&Ee?x.getPlayerState():-1}const Ie={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let ye=null,Vn=null,Da=!1,Z="none",xs=null;const Ds=()=>Da,Ma=t=>Da=t,Et=()=>Z,gf=t=>{["yt","url","none"].includes(t)?Z=t:console.warn("Invalid lastWatched platform:",t)};let Se=!1,Rt=null,At=0;async function st(t){if(!ye)return;console.debug("Updating watch sync state, roomId:",ye);const e=te(ne,`rooms/${ye}/watch`);try{await Ea(e,{...t,updatedBy:Vn})}catch(n){console.error("Failed to update watch state:",n)}}function Oa(t,e,n){if(!t)return;ye=t,Vn=n;const i=te(ne,`rooms/${t}/watch`);wa(i,Mr),Ss(i,"value",Mr),If()}function Mr(t){const e=t.val();e&&e.updatedBy!==Vn&&(Date.now()-At<500||(e.url&&e.url!==xs&&yf(e.url),e.isYouTube?vf(e):bf(e)))}function yf(t){xs=t,Mi(t)?(w(T),La(t),Z="yt"):(Rs(),L(T),T.src=t,Z="url")}function vf(t){!Nt()||!ff()||(Cf(t),Ef(t))}function Cf(t){const e=Ps(),n=e===Ie.PLAYING;if([Ie.BUFFERING,Ie.UNSTARTED].includes(e)){wf();return}Se||(t.playing&&!n?(As(),Z="yt"):!t.playing&&n&&(Hn(),Z="yt"))}function Ef(t){if(t.currentTime===void 0)return;const e=Sn();Math.abs(e-t.currentTime)>.3&&!Se&&(mf(t.currentTime),setTimeout(()=>{t.playing?As():Hn(),Z="yt"},500))}function wf(){Se=!0,clearTimeout(Rt),Rt=setTimeout(async()=>{Se=!1;const t=Ps()===Ie.PLAYING;await st({playing:t,currentTime:Sn()})},700)}function bf(t){t.playing!==void 0&&(t.playing&&T.paused?T.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!T.paused&&T.pause()),t.currentTime!==void 0&&Math.abs(T.currentTime-t.currentTime)>1&&(T.currentTime=t.currentTime,t.playing?T.play().catch(n=>console.warn("Play failed:",n)):T.pause())}function If(){T.addEventListener("play",async()=>{!Nt()&&ye&&(At=Date.now(),await st({playing:!0,isYouTube:!1})),Z="url"}),T.addEventListener("pause",async()=>{!Nt()&&ye&&(At=Date.now(),await st({playing:!1,isYouTube:!1})),Z="url"}),T.addEventListener("seeked",async()=>{!Nt()&&ye&&(At=Date.now(),await st({currentTime:T.currentTime,playing:!T.paused,isYouTube:!1})),Z="url"})}async function Sf(t){if(!t)return!1;if(At=Date.now(),Mi(t)){if(w(T),!await La(t))return!1;kn(),Z="yt"}else Rs(),L(T),T.src=t,kn(),Z="url";if(ye){const e=te(ne,`rooms/${ye}/watch`);Kt(e,{url:t,playing:!1,currentTime:0,isYouTube:Mi(t),updatedBy:Vn})}return!0}async function Tf(t){return!t||!t.url?(console.warn("Non-existing or invalid video."),!1):(xs=t.url,await Sf(t.url))}async function La(t,e,n){if(!xa(t))return console.error("Invalid YouTube URL:",t),!1;try{return await _f({url:t,onReady:s=>{Aa(!0)},onStateChange:async s=>{if(!Nt())return;const o=s.data===Ie.PLAYING,a=s.data===Ie.PAUSED;if(s.data===Ie.BUFFERING){Se=!0,Rt&&clearTimeout(Rt),Rt=setTimeout(async()=>{Se=!1;const d=Ps()===Ie.PLAYING;await st({playing:d,currentTime:Sn()})},700);return}a&&Se||!Se&&(o||a)&&await st({playing:o,currentTime:Sn()})}}),!0}catch(s){return console.error("Failed to load YouTube video:",s),!1}}let si=null,we=null,P=null,R=null,Or=!1,tn=!1,oe=[],Ue=null,Oi="",G=-1,Li=[];const kf="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",Nf="https://www.googleapis.com/youtube/v3";function Rf(){if(Or||tn)return!1;if(tn=!0,Ue=Tf,si=document.querySelector(".search-section"),we=document.getElementById("searchBtn"),P=document.getElementById("searchQuery"),R=document.getElementById("searchResults"),!si||!we||!P||!R)return console.error("YouTube search elements not found in DOM"),tn=!1,!1;const t=s=>/^https?:\/\//i.test(s),e=s=>{R.querySelectorAll(".search-result-item").forEach((o,a)=>{a===s?(o.classList.add("focused"),o.scrollIntoView({block:"nearest"})):o.classList.remove("focused")}),G=s};we.onclick=async()=>{const s=P.value.trim();if(ks(P)){L(P),P.focus();return}if(!s){sn(),w(P);return}if(Br()&&s===Oi)Fi(oe);else if(!t(s))await Lr(s);else{Ue&&await Ue({url:s,title:s,channel:"",thumbnail:"",id:s}),w(R),P.value="",w(P),G=-1;return}},si.addEventListener("keydown",async s=>{const r=R.querySelectorAll(".search-result-item");if(r.length>0&&(s.key==="ArrowDown"||s.key==="ArrowUp")){if(s.key==="ArrowDown"){let o=G+1;o>=r.length&&(o=0),e(o)}else if(s.key==="ArrowUp"){let o=G-1;o<0&&(o=G===-1?0:r.length-1),e(o)}return}if(s.key==="Enter"){if(r.length>0&&G>=0){r[G].click(),w(P),w(R),G=-1;return}const o=P.value.trim();if(o)if(Br()&&o===Oi)Fi(oe);else if(!t(o))await Lr(o);else{Ue&&await Ue({url:o,title:o,channel:"",thumbnail:"",id:o}),w(R),G=-1,P.value="",w(P);return}}else s.key==="Escape"&&(Pf()?sn():P.value?P.value="":w(P))}),P.addEventListener("input",()=>{P.value.trim()===""&&sn(),G=-1});const n=ki(P,()=>w(P),{ignore:[we],esc:!1});Li.push(n);const i=ki(R,()=>w(R),{ignore:[we],esc:!1});return Li.push(i),tn=!1,Or=!0,!0}async function Lr(t){if(!we||!R){console.error("Search elements not initialized");return}oe=[],Oi=t,we.disabled=!0,R.innerHTML='<div class="search-loading">Searching YouTube...</div>',L(R);try{const e=await fetch(`${Nf}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${kf}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Fr("No videos found"),oe=[];return}oe=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Fi(oe)}catch(e){console.error("YouTube search failed:",e),Fr(e.message||"Search failed. Please try again.")}finally{we.disabled=!1}}function Fi(t){if(!R){console.error("Search results element not initialized");return}if(!t||t.length===0){R.innerHTML='<div class="no-results">No results found</div>',oe=[],G=-1;return}R.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${n.title}</div>
        <div class="result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(Ue){if(await Ue(n),w(R),G=-1,!P){console.error("Search query element not initialized");return}P.value="",w(P)}},R.appendChild(i)}),L(R),G=0,R.querySelectorAll(".search-result-item").forEach((n,i)=>{i===G?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Fr(t){if(oe=[],G=-1,!R){console.error("Search results element not initialized");return}R.innerHTML=`<div class="search-error">${t}</div>`,L(R)}function sn(){oe=[],G=-1,R&&(R.innerHTML="",w(R))}function Af(){sn(),Li.forEach(t=>t())}function Pf(){return!ks(R)}function Br(){return oe.length>0}let We=null;function xf(){if(window.matchMedia("(display-mode: standalone)").matches){console.info("[PWA]: App is already installed"),w(he);return}if(!he){console.warn("[PWA]: Install button not found");return}if(!We){console.debug("[PWA]: beforeInstallEvent not assigned yet"),w(he);return}L(he),he.addEventListener("click",async()=>{if(!We){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),"serviceWorker"in navigator||console.warn("[PWA]: Service Workers not supported"),window.location.protocol!=="https:"&&window.location.hostname!=="localhost"&&console.warn("[PWA]: Not served over HTTPS");return}try{await We.prompt();const{outcome:t}=await We.userChoice;Ri(`User choice: ${t}`),t==="accepted"&&w(he),We=null}catch(t){console.error("Error showing install prompt:",t)}}),window.addEventListener("appinstalled",()=>{w(he),We=null})}window.addEventListener("beforeinstallprompt",t=>{console.debug("[PWA]: beforeinstallprompt fired"),t.preventDefault(),We=t,he&&L(he)});function Fa(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(e==="initiator")Wr(t,"offerCandidates",n),Ur(t,"answerCandidates",n);else if(e==="joiner")Wr(t,"answerCandidates",n),Ur(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Wr(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=Ah(te(ne,`rooms/${n}/${e}`));Kt(s,i.candidate.toJSON())}}}function Ur(t,e,n){const i=te(ne,`rooms/${n}/${e}`),s=r=>{const o=r.val();o&&t.remoteDescription&&t.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};ba(i,s),Ss(i,"child_added",s)}let z=null,Hr=null;function Ms(){return!z||!(z instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",z),console.error("Call createLocalStream() before accessing local stream."),null):z}function Df(t){z=t}const Mf=async()=>{if(z&&z instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),z;const t=Ns("user");return z=await navigator.mediaDevices.getUserMedia({video:t||Ai.relyOnBrowserDefaults,audio:Ra.default}),z};async function Of(t){return z=await Mf(),Hr=new MediaStream(z.getVideoTracks()),t.srcObject=Hr,!0}function Ba(t,e,n){return t.ontrack=i=>{if(!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;e.srcObject!==i.streams[0]&&(e.srcObject=i.streams[0],uf(e,n),H("Connected!"))},!0}const Lf=()=>{z&&(z.getTracks().forEach(t=>t.stop()),z=null)};function Wa(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!n||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(g=>{g.forEach(y=>{y.type==="attributes"&&y.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function l(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}n.addEventListener("click",l),jh(i,()=>{w(i)},{ignore:[n],esc:!0});function c(){L(n)}function d(){w(n)}function h(g){const y=document.createElement("p");y.textContent=g,g.startsWith("You:")?y.style.textAlign="right":g.startsWith("Partner:")&&(y.style.textAlign="left"),s.appendChild(y),s.scrollTop=s.scrollHeight}function u(g){h(`Partner: ${g}`),ks(i)&&f()}function f(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}r.addEventListener("submit",g=>{g.preventDefault();const y=o.value.trim();y&&(t(y),h(`You: ${y}`),o.value="")});function _(){a.disconnect(),n&&d(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:h,receiveMessage:u,toggleMessages:l,showMessagesToggle:c,hideMessagesToggle:d,cleanup:_}}let Vr=!1;function Ff(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--primary",l.textContent=e.buttonText,l.autofocus=!0;const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--secondary",c.textContent=e.cancelText,a.appendChild(l),a.appendChild(c),i.appendChild(a);const d=document.createElement("p");return d.className="copy-link-dialog__feedback",d.setAttribute("aria-live","polite"),i.appendChild(d),n.appendChild(i),{dialog:n,input:o,copyButton:l,cancelButton:c,feedback:d}}function Bf(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};Wf();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=Ff(t,n);Uf(i);let l=!1;const c=async()=>{await Hf(t,s)?(l=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",c),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&!d.ctrlKey&&!d.altKey&&!d.metaKey&&(d.preventDefault(),c())}),i.addEventListener("close",()=>{!l&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function Wf(){if(Vr)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Vr=!0}function Uf(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)",this.style.zIndex="1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function Hf(t,e){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){console.warn("Clipboard API failed, using fallback:",n)}try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}let S=null,fe=null,D=null,me=null,Ae=null,Q,Vf=[],Bi=null;const Ua=()=>ae.srcObject&&ae.srcObject.getVideoTracks().some(t=>t.enabled);async function Ha(){me=Math.random().toString(36).substring(2,15);try{const t=Ve();w(t)}catch{}try{return await Of(Ni),await tf()&&L(Pr),df({getLocalStream:Ms,getLocalVideo:()=>Ni,getRemoteVideo:()=>ae,getPeerConnection:()=>S,setLocalStream:Df,micBtn:Xh,cameraBtn:Jh,switchCameraBtn:Pr,mutePartnerBtn:Jt,fullscreenPartnerBtn:Qh}),xf(),Rf(),qf(),Ls(),!0}catch(t){return console.error("Failed to get user media:",t),H("Error: Please allow camera and microphone access."),!1}}function $f(){fe=S.createDataChannel("chat"),Q=Wa(e=>{fe.readyState==="open"&&fe.send(e)}),fe.onopen=()=>{Q.showMessagesToggle(),Q.appendChatMessage("💬 Chat connected")},fe.onmessage=e=>Q.receiveMessage(e.data)}function Wi(){window.history.replaceState({},document.title,window.location.pathname)}let Tn=[];function Va(){if(!D||!me)return;const t=te(ne,`rooms/${D}/members`),e=te(ne,`rooms/${D}/members/${me}`);Kt(e,{joinedAt:Date.now()});const n=s=>{s.key!==me&&Os()};ba(t,n),Tn.push({ref:t,type:"child_added",callback:n});const i=s=>{s.key!==me&&console.info("Partner has left the call"),$n()};xh(t,i),Tn.push({ref:t,type:"child_removed",callback:i})}const $a={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};function Ya(t){t.onconnectionstatechange=()=>{t.connectionState==="connected"?(H("Connected!"),Os()):t.connectionState==="disconnected"?(H("Partner disconnected"),Ls(),Wi()):t.connectionState==="failed"&&(H("Connection failed"),Wi())}}async function Yf(){const t=Ms();if(!t)return H("Error: Camera not initialized"),!1;D=Math.random().toString(36).substring(2,15),Ae="initiator",S=new RTCPeerConnection($a),$f(),t.getTracks().forEach(o=>{S.addTrack(o,t)}),Ba(S,ae,Jt)&&(Fa(S,Ae,D),Ya(S),console.debug("Peer connection created as initiator with room ID:",D));const e=await S.createOffer();await S.setLocalDescription(e);const n=te(ne,`rooms/${D}`);await Kt(n,{offer:{type:e.type,sdp:e.sdp}});const i=te(ne,`rooms/${D}/answer`),s=async o=>{const a=o.val();if(a&&a.sdp!==Bi){if(Bi=a.sdp,S.signalingState!=="have-local-offer"&&S.signalingState!=="stable")return!0;try{return await S.setRemoteDescription(new RTCSessionDescription(a)),!0}catch(l){return console.error("Failed to set remote description:",l),!1}}};wa(i,s),Ss(i,"value",s),Oa(D,Ae,me),Va();const r=`${window.location.origin}${window.location.pathname}?room=${D}`;return ka.value=r,ze.disabled=!0,Xt.disabled=!1,Bf(r,{onCopy:()=>H("Link ready! Share with your partner."),onCancel:()=>{H('Call cancelled. Click "Start New Chat" to try again.'),$n()}}),H("Waiting for partner to join..."),!0}async function Gf(){const t=Ms();if(!t)return H("Error: Camera not initialized"),!1;if(!D)return H("Error: No room ID"),!1;Ae="joiner";const e=te(ne,`rooms/${D}`),n=await Ph(e);if(!n.exists())return H("Error: Invalid room link"),!1;const s=n.val().offer;if(!s)return H("Error: No offer found"),!1;S=new RTCPeerConnection($a),S.ondatachannel=o=>{fe=o.channel,Q=Wa(a=>fe.send(a)),fe.onopen=()=>{Q.showMessagesToggle(),Q.appendChatMessage("💬 Chat connected")},fe.onmessage=a=>Q.receiveMessage(a.data)},t.getTracks().forEach(o=>{S.addTrack(o,t)}),Ba(S,ae,Jt)&&(Fa(S,Ae,D),Ya(S),console.debug("Peer connection created as joiner for room ID:",D)),await S.setRemoteDescription(new RTCSessionDescription(s));const r=await S.createAnswer();await S.setLocalDescription(r);try{await Ea(e,{answer:{type:r.type,sdp:r.sdp}})}catch(o){return console.error("Failed to update answer in Firebase:",o),H("Failed to send answer to partner."),!1}return Oa(D,Ae,me),Va(),Os(),H("Connecting..."),!0}let le=null;function zf(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function kn(){if(!Ds()){if(Ma(!0),it.classList.remove("bottom"),it.classList.add("watch-mode"),le&&(le(),le=null),!Ua()){L(_e),nt(_e),w(Y),Je(Y);return}w(_e),Je(_e),Ta(ae)?(w(Y),Je(Y)):zf()?ae.requestPictureInPicture().then(()=>{w(Y),Je(Y)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),nt(Y),L(Y)}):(nt(Y),L(Y))}}function rn(){Ds()&&(it.classList.remove("watch-mode"),it.classList.add("bottom"),le||(le=Na(it,{inactivityMs:2500,hideOnEsc:!0})),Ua()&&(Ta(Y)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Je(Y),L(Y)),nt(_e),L(_e),Ma(!1))}let Os=()=>{L(Y),nt(_e),ze.disabled=!0,Jt.disabled=!1,Xt.disabled=!1,le||(le=Na(it,{inactivityMs:2500,hideOnEsc:!0}))},Ls=()=>{Je(Y),w(Y),nt(_e),L(_e),ze.disabled=!1,Xt.disabled=!0,Jt.disabled=!0,le&&(le(),le=null)};function ri(){return T&&Ar&&!Ar.classList.contains("hidden")&&T.src&&T.src.trim()!==""}let $r=!1;function qf(){if($r)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",Et()),console.log("isYTVisible():",ii()),console.log("isSharedVideoVisible():",ri()),console.log("isWatchModeActive():",Ds()),Et()==="yt"?(console.log("Processing YouTube case"),ii()?(console.log("Hiding YouTube player"),Di(),rn()):(console.log("Showing YouTube player"),Pa(),kn())):Et()==="url"&&(console.log("Processing URL case"),ri()?(console.log("Hiding shared video"),w(T),rn()):(console.log("Showing shared video"),L(T),kn()))),(e.key==="m"||e.key==="M")&&Q&&Q.toggleMessages()),e.key==="Escape"&&(Et()==="yt"&&ii()?(Hn(),Di(),rn()):Et()==="url"&&ri()&&(T.pause(),w(T)))}),$r=!0}ze.onclick=async()=>{await Yf()};Xt.onclick=$n;async function jf(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return H('Ready. Click "Start New Chat" to begin.'),!1;D=e,H("Connecting to room...");const n=await Ha();let i=!1;return n&&(i=await Gf()),i?!0:(L(ze),Xt.disabled=!0,ze.disabled=!1,Wi(),!1)}window.onload=async()=>{if(await jf())return;if(!await Ha()){ze.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}};window.addEventListener("beforeunload",t=>{if(S&&S.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;Kf()});let oi=!1;async function $n(){if(!oi){if(oi=!0,console.debug("Hanging up..."),ae.srcObject&&(ae.srcObject.getTracks().forEach(t=>t.stop()),ae.srcObject=null),hf(),S&&(S.close(),S=null),qh(),D&&Ae==="initiator"){const t=te(ne,`rooms/${D}`);Rr(t).catch(e=>{console.warn("Failed to remove room:",e)})}if(Ls(),Tn.forEach(({ref:t,type:e,callback:n})=>Ia(t,e,n)),Tn.length=0,D&&me){const t=te(ne,`rooms/${D}/members/${me}`);Rr(t).catch(()=>{})}document.pictureInPictureElement&&document.exitPictureInPicture().catch(t=>console.error(t)),Q&&Q.cleanup&&(Q.cleanup(),Q=null),D=null,Ae=null,Bi=null,window.history.replaceState({},document.title,window.location.pathname),H('Disconnected. Click "Start New Chat" to begin.'),oi=!1}}function Kf(){(S||D)&&$n(),ka.value="",T.src="",Kh.textContent="",Lf(),Ni.srcObject=null,rn(),gf("none"),Rs(),Aa(!1),Af(),Vf.forEach(t=>t())}
