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
 */const La=()=>{};var As={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(t,e){if(!t)throw ot(e)},ot=function(t){return new Error("Firebase Database ("+Fr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Fa=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Di={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(d=64)),i.push(n[u],n[h],n[d],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Br(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Fa(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new Ba;const d=r<<2|a>>4;if(i.push(d),c!==64){const f=a<<4&240|c>>2;if(i.push(f),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ba extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ur=function(t){const e=Br(t);return Di.encodeByteArray(e,!0)},en=function(t){return Ur(t).replace(/\./g,"")},ii=function(t){try{return Di.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(t){return Wr(void 0,t)}function Wr(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Wa(n)||(t[n]=Wr(t[n],e[n]));return t}function Wa(t){return t!=="__proto__"}/**
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
 */function Va(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Ha=()=>Va().__FIREBASE_DEFAULTS__,$a=()=>{if(typeof process>"u"||typeof As>"u")return;const t=As.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ya=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ii(t[1]);return e&&JSON.parse(e)},Vr=()=>{try{return La()||Ha()||$a()||Ya()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ga=t=>Vr()?.emulatorHosts?.[t],za=t=>{const e=Ga(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Hr=()=>Vr()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function Mi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function qa(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function ja(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[en(JSON.stringify(n)),en(JSON.stringify(o)),""].join(".")}const mt={};function Ka(){const t={prod:[],emulator:[]};for(const e of Object.keys(mt))mt[e]?t.emulator.push(e):t.prod.push(e);return t}function Qa(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ps=!1;function Xa(t,e){if(typeof window>"u"||typeof document>"u"||!Mi(window.location.host)||mt[t]===e||mt[t]||Ps)return;mt[t]=e;function n(d){return`__firebase__banner__${d}`}const i="__firebase__banner",r=Ka().prod.length>0;function o(){const d=document.getElementById(i);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function l(d,f){d.setAttribute("width","24"),d.setAttribute("id",f),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function c(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{Ps=!0,o()},d}function u(d,f){d.setAttribute("id",f),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=Qa(i),f=n("text"),_=document.getElementById(f)||document.createElement("span"),m=n("learnmore"),y=document.getElementById(m)||document.createElement("a"),X=n("preprendIcon"),ce=document.getElementById(X)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const xe=d.element;a(xe),u(y,m);const Wn=c();l(ce,X),xe.append(ce,_,y,Wn),document.body.appendChild(xe)}r?(_.innerText="Preview backend disconnected.",ce.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function Ja(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $r(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ja())}function Za(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function el(){return Fr.NODE_ADMIN===!0}function tl(){try{return typeof indexedDB=="object"}catch{return!1}}function nl(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const il="FirebaseError";class Bt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=il,Object.setPrototypeOf(this,Bt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yr.prototype.create)}}class Yr{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?sl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Bt(s,a,i)}}function sl(t,e){return t.replace(rl,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const rl=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(t){return JSON.parse(t)}function F(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Tt(ii(r[0])||""),n=Tt(ii(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},ol=function(t){const e=Gr(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},al=function(t){const e=Gr(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ae(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Je(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function xs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function tn(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function nn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Ds(r)&&Ds(o)){if(!nn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Ds(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ll(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const d=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(s<<5|s>>>27)+c+l+u+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function In(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ul=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Sn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function $e(t){return t&&t._delegate?t._delegate:t}class kt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Oe="[DEFAULT]";/**
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
 */class hl{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Ft;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(fl(e))try{this.getOrInitializeService({instanceIdentifier:Oe})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Oe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Oe){return this.instances.has(e)}getOptions(e=Oe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:dl(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Oe){return this.component?this.component.multipleInstances?e:Oe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function dl(t){return t===Oe?void 0:t}function fl(t){return t.instantiationMode==="EAGER"}/**
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
 */class pl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new hl(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(N||(N={}));const _l={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},ml=N.INFO,gl={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},yl=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=gl[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class zr{constructor(e){this.name=e,this._logLevel=ml,this._logHandler=yl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_l[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const vl=(t,e)=>e.some(n=>t instanceof n);let Ms,Os;function Cl(){return Ms||(Ms=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function El(){return Os||(Os=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qr=new WeakMap,si=new WeakMap,jr=new WeakMap,Vn=new WeakMap,Oi=new WeakMap;function wl(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(be(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&qr.set(n,t)}).catch(()=>{}),Oi.set(e,t),e}function bl(t){if(si.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});si.set(t,e)}let ri={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return si.get(t);if(e==="objectStoreNames")return t.objectStoreNames||jr.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return be(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Il(t){ri=t(ri)}function Sl(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Hn(this),e,...n);return jr.set(i,e.sort?e.sort():[e]),be(i)}:El().includes(t)?function(...e){return t.apply(Hn(this),e),be(qr.get(this))}:function(...e){return be(t.apply(Hn(this),e))}}function Tl(t){return typeof t=="function"?Sl(t):(t instanceof IDBTransaction&&bl(t),vl(t,Cl())?new Proxy(t,ri):t)}function be(t){if(t instanceof IDBRequest)return wl(t);if(Vn.has(t))return Vn.get(t);const e=Tl(t);return e!==t&&(Vn.set(t,e),Oi.set(e,t)),e}const Hn=t=>Oi.get(t);function kl(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=be(o);return i&&o.addEventListener("upgradeneeded",l=>{i(be(o.result),l.oldVersion,l.newVersion,be(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Nl=["get","getKey","getAll","getAllKeys","count"],Rl=["put","add","delete","clear"],$n=new Map;function Ls(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if($n.get(e))return $n.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=Rl.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Nl.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return $n.set(e,r),r}Il(t=>({...t,get:(e,n,i)=>Ls(e,n)||t.get(e,n,i),has:(e,n)=>!!Ls(e,n)||t.has(e,n)}));/**
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
 */class Al{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Pl(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Pl(t){return t.getComponent()?.type==="VERSION"}const oi="@firebase/app",Fs="0.14.4";/**
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
 */const _e=new zr("@firebase/app"),xl="@firebase/app-compat",Dl="@firebase/analytics-compat",Ml="@firebase/analytics",Ol="@firebase/app-check-compat",Ll="@firebase/app-check",Fl="@firebase/auth",Bl="@firebase/auth-compat",Ul="@firebase/database",Wl="@firebase/data-connect",Vl="@firebase/database-compat",Hl="@firebase/functions",$l="@firebase/functions-compat",Yl="@firebase/installations",Gl="@firebase/installations-compat",zl="@firebase/messaging",ql="@firebase/messaging-compat",jl="@firebase/performance",Kl="@firebase/performance-compat",Ql="@firebase/remote-config",Xl="@firebase/remote-config-compat",Jl="@firebase/storage",Zl="@firebase/storage-compat",ec="@firebase/firestore",tc="@firebase/ai",nc="@firebase/firestore-compat",ic="firebase",sc="12.4.0";/**
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
 */const ai="[DEFAULT]",rc={[oi]:"fire-core",[xl]:"fire-core-compat",[Ml]:"fire-analytics",[Dl]:"fire-analytics-compat",[Ll]:"fire-app-check",[Ol]:"fire-app-check-compat",[Fl]:"fire-auth",[Bl]:"fire-auth-compat",[Ul]:"fire-rtdb",[Wl]:"fire-data-connect",[Vl]:"fire-rtdb-compat",[Hl]:"fire-fn",[$l]:"fire-fn-compat",[Yl]:"fire-iid",[Gl]:"fire-iid-compat",[zl]:"fire-fcm",[ql]:"fire-fcm-compat",[jl]:"fire-perf",[Kl]:"fire-perf-compat",[Ql]:"fire-rc",[Xl]:"fire-rc-compat",[Jl]:"fire-gcs",[Zl]:"fire-gcs-compat",[ec]:"fire-fst",[nc]:"fire-fst-compat",[tc]:"fire-vertex","fire-js":"fire-js",[ic]:"fire-js-all"};/**
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
 */const sn=new Map,oc=new Map,li=new Map;function Bs(t,e){try{t.container.addComponent(e)}catch(n){_e.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function rn(t){const e=t.name;if(li.has(e))return _e.debug(`There were multiple attempts to register component ${e}.`),!1;li.set(e,t);for(const n of sn.values())Bs(n,t);for(const n of oc.values())Bs(n,t);return!0}function ac(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function lc(t){return t==null?!1:t.settings!==void 0}/**
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
 */const cc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ie=new Yr("app","Firebase",cc);/**
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
 */class uc{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new kt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ie.create("app-deleted",{appName:this._name})}}/**
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
 */const hc=sc;function Kr(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:ai,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Ie.create("bad-app-name",{appName:String(s)});if(n||(n=Hr()),!n)throw Ie.create("no-options");const r=sn.get(s);if(r){if(nn(n,r.options)&&nn(i,r.config))return r;throw Ie.create("duplicate-app",{appName:s})}const o=new pl(s);for(const l of li.values())o.addComponent(l);const a=new uc(n,i,o);return sn.set(s,a),a}function dc(t=ai){const e=sn.get(t);if(!e&&t===ai&&Hr())return Kr();if(!e)throw Ie.create("no-app",{appName:t});return e}function je(t,e,n){let i=rc[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),_e.warn(o.join(" "));return}rn(new kt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const fc="firebase-heartbeat-database",pc=1,Nt="firebase-heartbeat-store";let Yn=null;function Qr(){return Yn||(Yn=kl(fc,pc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Nt)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ie.create("idb-open",{originalErrorMessage:t.message})})),Yn}async function _c(t){try{const n=(await Qr()).transaction(Nt),i=await n.objectStore(Nt).get(Xr(t));return await n.done,i}catch(e){if(e instanceof Bt)_e.warn(e.message);else{const n=Ie.create("idb-get",{originalErrorMessage:e?.message});_e.warn(n.message)}}}async function Us(t,e){try{const i=(await Qr()).transaction(Nt,"readwrite");await i.objectStore(Nt).put(e,Xr(t)),await i.done}catch(n){if(n instanceof Bt)_e.warn(n.message);else{const i=Ie.create("idb-set",{originalErrorMessage:n?.message});_e.warn(i.message)}}}function Xr(t){return`${t.name}!${t.options.appId}`}/**
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
 */const mc=1024,gc=30;class yc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Cc(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ws();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>gc){const s=Ec(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){_e.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ws(),{heartbeatsToSend:n,unsentEntries:i}=vc(this._heartbeatsCache.heartbeats),s=en(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return _e.warn(e),""}}}function Ws(){return new Date().toISOString().substring(0,10)}function vc(t,e=mc){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Vs(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Vs(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Cc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return tl()?nl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await _c(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Us(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Us(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Vs(t){return en(JSON.stringify({version:2,heartbeats:t})).length}function Ec(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function wc(t){rn(new kt("platform-logger",e=>new Al(e),"PRIVATE")),rn(new kt("heartbeat",e=>new yc(e),"PRIVATE")),je(oi,Fs,t),je(oi,Fs,"esm2020"),je("fire-js","")}wc("");var Hs={};const $s="@firebase/database",Ys="1.1.0";/**
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
 */let Jr="";function bc(t){Jr=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),F(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Tt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ae(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zr=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Ic(e)}}catch{}return new Sc},Be=Zr("localStorage"),Tc=Zr("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke=new zr("@firebase/database"),kc=(function(){let t=1;return function(){return t++}})(),eo=function(t){const e=ul(t),n=new cl;n.update(e);const i=n.digest();return Di.encodeByteArray(i)},Ut=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Ut.apply(null,i):typeof i=="object"?e+=F(i):e+=i,e+=" "}return e};let gt=null,Gs=!0;const Nc=function(t,e){p(!0,"Can't turn on custom loggers persistently."),Ke.logLevel=N.VERBOSE,gt=Ke.log.bind(Ke)},H=function(...t){if(Gs===!0&&(Gs=!1,gt===null&&Tc.get("logging_enabled")===!0&&Nc()),gt){const e=Ut.apply(null,t);gt(e)}},Wt=function(t){return function(...e){H(t,...e)}},ci=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ut(...t);Ke.error(e)},me=function(...t){const e=`FIREBASE FATAL ERROR: ${Ut(...t)}`;throw Ke.error(e),new Error(e)},j=function(...t){const e="FIREBASE WARNING: "+Ut(...t);Ke.warn(e)},Rc=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&j("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Li=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Ac=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Ze="[MIN_NAME]",We="[MAX_NAME]",Ye=function(t,e){if(t===e)return 0;if(t===Ze||e===We)return-1;if(e===Ze||t===We)return 1;{const n=zs(t),i=zs(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Pc=function(t,e){return t===e?0:t<e?-1:1},ht=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+F(e))},Fi=function(t){if(typeof t!="object"||t===null)return F(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=F(e[i]),n+=":",n+=Fi(t[e[i]]);return n+="}",n},to=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function $(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const no=function(t){p(!Li(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},xc=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Dc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Mc(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Oc=new RegExp("^-?(0*)\\d{1,10}$"),Lc=-2147483648,Fc=2147483647,zs=function(t){if(Oc.test(t)){const e=Number(t);if(e>=Lc&&e<=Fc)return e}return null},at=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw j("Exception was thrown by user callback.",n),e},Math.floor(0))}},Bc=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},yt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Uc{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,lc(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){j(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(H("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',j(e)}}class Xt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Xt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bi="5",io="v",so="s",ro="r",oo="f",ao=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,lo="ls",co="p",ui="ac",uo="websocket",ho="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Be.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Be.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Vc(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function po(t,e,n){p(typeof e=="string","typeof type must == string"),p(typeof n=="object","typeof params must == object");let i;if(e===uo)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===ho)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Vc(t)&&(n.ns=t.namespace);const s=[];return $(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(){this.counters_={}}incrementCounter(e,n=1){ae(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Ua(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn={},zn={};function Ui(t){const e=t.toString();return Gn[e]||(Gn[e]=new Hc),Gn[e]}function $c(t,e){const n=t.toString();return zn[n]||(zn[n]=e()),zn[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&at(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs="start",Gc="close",zc="pLPCommand",qc="pRTLPCB",_o="id",mo="pw",go="ser",jc="cb",Kc="seg",Qc="ts",Xc="d",Jc="dframe",yo=1870,vo=30,Zc=yo-vo,eu=25e3,tu=3e4;class qe{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Wt(e),this.stats_=Ui(n),this.urlFn=l=>(this.appCheckToken&&(l[ui]=this.appCheckToken),po(n,ho,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Yc(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(tu)),Ac(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Wi((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===qs)this.id=a,this.password=l;else if(o===Gc)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[qs]="t",i[go]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[jc]=this.scriptTagHolder.uniqueCallbackIdentifier),i[io]=Bi,this.transportSessionId&&(i[so]=this.transportSessionId),this.lastSessionId&&(i[lo]=this.lastSessionId),this.applicationId&&(i[co]=this.applicationId),this.appCheckToken&&(i[ui]=this.appCheckToken),typeof location<"u"&&location.hostname&&ao.test(location.hostname)&&(i[ro]=oo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){qe.forceAllow_=!0}static forceDisallow(){qe.forceDisallow_=!0}static isAvailable(){return qe.forceAllow_?!0:!qe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!xc()&&!Dc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=F(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Ur(n),s=to(i,Zc);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[Jc]="t",i[_o]=e,i[mo]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=F(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Wi{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=kc(),window[zc+this.uniqueCallbackIdentifier]=e,window[qc+this.uniqueCallbackIdentifier]=n,this.myIFrame=Wi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){H("frame writing exception"),a.stack&&H(a.stack),H(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||H("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[_o]=this.myID,e[mo]=this.myPW,e[go]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+vo+i.length<=yo;){const o=this.pendingSegs.shift();i=i+"&"+Kc+s+"="+o.seg+"&"+Qc+s+"="+o.ts+"&"+Xc+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(eu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{H("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu=16384,iu=45e3;let on=null;typeof MozWebSocket<"u"?on=MozWebSocket:typeof WebSocket<"u"&&(on=WebSocket);class ie{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Wt(this.connId),this.stats_=Ui(n),this.connURL=ie.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[io]=Bi,typeof location<"u"&&location.hostname&&ao.test(location.hostname)&&(o[ro]=oo),n&&(o[so]=n),i&&(o[lo]=i),s&&(o[ui]=s),r&&(o[co]=r),po(e,uo,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Be.set("previous_websocket_failure",!0);try{let i;el(),this.mySock=new on(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){ie.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&on!==null&&!ie.forceDisallow_}static previouslyFailed(){return Be.isInMemoryStorage||Be.get("previous_websocket_failure")===!0}markConnectionHealthy(){Be.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Tt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=F(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=to(n,nu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(iu))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ie.responsesRequiredToBeHealthy=2;ie.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{static get ALL_TRANSPORTS(){return[qe,ie]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=ie&&ie.isAvailable();let i=n&&!ie.previouslyFailed();if(e.webSocketOnly&&(n||j("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[ie];else{const s=this.transports_=[];for(const r of Rt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Rt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Rt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su=6e4,ru=5e3,ou=10*1024,au=100*1024,qn="t",js="d",lu="s",Ks="r",cu="e",Qs="o",Xs="a",Js="n",Zs="p",uu="h";class hu{constructor(e,n,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Wt("c:"+this.id+":"),this.transportManager_=new Rt(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=yt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>au?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ou?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(qn in e){const n=e[qn];n===Xs?this.upgradeIfSecondaryHealthy_():n===Ks?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Qs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ht("t",e),i=ht("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zs,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Xs,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Js,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ht("t",e),i=ht("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ht(qn,e);if(js in e){const i=e[js];if(n===uu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Js){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===lu?this.onConnectionShutdown_(i):n===Ks?this.onReset_(i):n===cu?ci("Server Error: "+i):n===Qs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ci("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Bi!==i&&j("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),yt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(su))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):yt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ru))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zs,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Be.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an extends Eo{static getInstance(){return new an}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$r()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const er=32,tr=768;class S{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function w(){return new S("")}function v(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Ne(t){return t.pieces_.length-t.pieceNum_}function A(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new S(t.pieces_,e)}function Vi(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function du(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function At(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function wo(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new S(e,0)}function M(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof S)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new S(n,0)}function E(t){return t.pieceNum_>=t.pieces_.length}function q(t,e){const n=v(t),i=v(e);if(n===null)return e;if(n===i)return q(A(t),A(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function fu(t,e){const n=At(t,0),i=At(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Ye(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Hi(t,e){if(Ne(t)!==Ne(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function J(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(Ne(t)>Ne(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class pu{constructor(e,n){this.errorPrefix_=n,this.parts_=At(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Sn(this.parts_[i]);bo(this)}}function _u(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Sn(e),bo(t)}function mu(t){const e=t.parts_.pop();t.byteLength_-=Sn(e),t.parts_.length>0&&(t.byteLength_-=1)}function bo(t){if(t.byteLength_>tr)throw new Error(t.errorPrefix_+"has a key path longer than "+tr+" bytes ("+t.byteLength_+").");if(t.parts_.length>er)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+er+") or object contains a cycle "+Le(t))}function Le(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i extends Eo{static getInstance(){return new $i}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt=1e3,gu=300*1e3,nr=30*1e3,yu=1.3,vu=3e4,Cu="server_kill",ir=3;class fe extends Co{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=fe.nextPersistentConnectionId_++,this.log_=Wt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=dt,this.maxReconnectDelay_=gu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");$i.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&an.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(F(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Ft,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;fe.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ae(e,"w")){const i=Je(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();j(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||al(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=nr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=ol(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+F(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):ci("Unrecognized action received from server: "+F(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=dt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=dt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>vu&&(this.reconnectDelay_=dt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*yu)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+fe.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?H("getToken() completed but was canceled"):(H("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new hu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{j(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Cu)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&j(h),l())}}}interrupt(e){H("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){H("Resuming connection for reason: "+e),delete this.interruptReasons_[e],xs(this.interruptReasons_)&&(this.reconnectDelay_=dt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Fi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new S(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){H("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ir&&(this.reconnectDelay_=nr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){H("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ir&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Jr.replace(/\./g,"-")]=1,$r()?e["framework.cordova"]=1:Za()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=an.getInstance().currentlyOnline();return xs(this.interruptReasons_)&&e}}fe.nextPersistentConnectionId_=0;fe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Tn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new C(Ze,e),s=new C(Ze,n);return this.compare(i,s)!==0}minPost(){return C.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jt;class Io extends Tn{static get __EMPTY_NODE(){return jt}static set __EMPTY_NODE(e){jt=e}compare(e,n){return Ye(e.name,n.name)}isDefinedOn(e){throw ot("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return C.MIN}maxPost(){return new C(We,jt)}makePost(e,n){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new C(e,jt)}toString(){return".key"}}const Qe=new Io;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class U{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??U.RED,this.left=s??K.EMPTY_NODE,this.right=r??K.EMPTY_NODE}copy(e,n,i,s,r){return new U(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return K.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return K.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,U.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,U.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}U.RED=!0;U.BLACK=!1;class Eu{copy(e,n,i,s,r){return this}insert(e,n,i){return new U(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class K{constructor(e,n=K.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new K(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,U.BLACK,null,null))}remove(e){return new K(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,U.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Kt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Kt(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Kt(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Kt(this.root_,null,this.comparator_,!0,e)}}K.EMPTY_NODE=new Eu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(t,e){return Ye(t.name,e.name)}function Yi(t,e){return Ye(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hi;function bu(t){hi=t}const So=function(t){return typeof t=="number"?"number:"+no(t):"string:"+t},To=function(t){if(t.isLeafNode()){const e=t.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ae(e,".sv"),"Priority must be a string or number.")}else p(t===hi||t.isEmpty(),"priority of unexpected type.");p(t===hi||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sr;class B{static set __childrenNodeConstructor(e){sr=e}static get __childrenNodeConstructor(){return sr}constructor(e,n=B.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),To(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new B(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return E(e)?this:v(e)===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:B.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=v(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Ne(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,B.__childrenNodeConstructor.EMPTY_NODE.updateChild(A(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+So(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=no(this.value_):e+=this.value_,this.lazyHash_=eo(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===B.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof B.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=B.VALUE_TYPE_ORDER.indexOf(n),r=B.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+n),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}B.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ko,No;function Iu(t){ko=t}function Su(t){No=t}class Tu extends Tn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Ye(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return C.MIN}maxPost(){return new C(We,new B("[PRIORITY-POST]",No))}makePost(e,n){const i=ko(e);return new C(n,new B("[PRIORITY-POST]",i))}toString(){return".priority"}}const O=new Tu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku=Math.log(2);class Nu{constructor(e){const n=r=>parseInt(Math.log(r)/ku,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const ln=function(t,e,n,i){t.sort(e);const s=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=t[l],d=n?n(h):h,new U(d,h.node,U.BLACK,null,null);{const f=parseInt(u/2,10)+l,_=s(l,f),m=s(f+1,c);return h=t[f],d=n?n(h):h,new U(d,h.node,U.BLACK,_,m)}},r=function(l){let c=null,u=null,h=t.length;const d=function(_,m){const y=h-_,X=h;h-=_;const ce=s(y+1,X),xe=t[y],Wn=n?n(xe):xe;f(new U(Wn,xe.node,m,null,ce))},f=function(_){c?(c.left=_,c=_):(u=_,c=_)};for(let _=0;_<l.count;++_){const m=l.nextBitIsOne(),y=Math.pow(2,l.count-(_+1));m?d(y,U.BLACK):(d(y,U.BLACK),d(y,U.RED))}return u},o=new Nu(t.length),a=r(o);return new K(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn;const ze={};class he{static get Default(){return p(ze&&O,"ChildrenNode.ts has not been loaded"),jn=jn||new he({".priority":ze},{".priority":O}),jn}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Je(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof K?n:null}hasIndex(e){return ae(this.indexSet_,e.toString())}addIndex(e,n){p(e!==Qe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(C.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=ln(i,e.getCompare()):a=ze;const l=e.toString(),c={...this.indexSet_};c[l]=e;const u={...this.indexes_};return u[l]=a,new he(u,c)}addToIndexes(e,n){const i=tn(this.indexes_,(s,r)=>{const o=Je(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===ze)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(C.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),ln(a,o.getCompare())}else return ze;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new C(e.name,a))),l.insert(e,e.node)}});return new he(i,this.indexSet_)}removeFromIndexes(e,n){const i=tn(this.indexes_,s=>{if(s===ze)return s;{const r=n.get(e.name);return r?s.remove(new C(e.name,r)):s}});return new he(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ft;class g{static get EMPTY_NODE(){return ft||(ft=new g(new K(Yi),null,he.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&To(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ft}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?ft:n}}getChild(e){const n=v(e);return n===null?this:this.getImmediateChild(n).getChild(A(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(p(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new C(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?ft:this.priorityNode_;return new g(s,o,r)}}updateChild(e,n){const i=v(e);if(i===null)return n;{p(v(e)!==".priority"||Ne(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(A(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(O,(o,a)=>{n[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+So(this.getPriority().val())+":"),this.forEachChild(O,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":eo(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new C(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new C(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new C(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,C.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,C.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Vt?-1:0}withIndex(e){if(e===Qe||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Qe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(O),s=n.getIterator(O);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Qe?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Ru extends g{constructor(){super(new K(Yi),g.EMPTY_NODE,he.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const Vt=new Ru;Object.defineProperties(C,{MIN:{value:new C(Ze,g.EMPTY_NODE)},MAX:{value:new C(We,Vt)}});Io.__EMPTY_NODE=g.EMPTY_NODE;B.__childrenNodeConstructor=g;bu(Vt);Su(Vt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Au=!0;function L(t,e=null){if(t===null)return g.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new B(n,L(e))}if(!(t instanceof Array)&&Au){const n=[];let i=!1;if($(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=L(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new C(o,l)))}}),n.length===0)return g.EMPTY_NODE;const r=ln(n,wu,o=>o.name,Yi);if(i){const o=ln(n,O.getCompare());return new g(r,L(e),new he({".priority":o},{".priority":O}))}else return new g(r,L(e),he.Default)}else{let n=g.EMPTY_NODE;return $(t,(i,s)=>{if(ae(t,i)&&i.substring(0,1)!=="."){const r=L(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(L(e))}}Iu(L);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu extends Tn{constructor(e){super(),this.indexPath_=e,p(!E(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Ye(e.name,n.name):r}makePost(e,n){const i=L(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new C(n,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,Vt);return new C(We,e)}toString(){return At(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu extends Tn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Ye(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return C.MIN}maxPost(){return C.MAX}makePost(e,n){const i=L(e);return new C(n,i)}toString(){return".value"}}const Du=new xu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(t){return{type:"value",snapshotNode:t}}function et(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Pt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function xt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Mu(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Pt(n,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(et(n,i)):o.trackChildChange(xt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(O,(s,r)=>{n.hasChild(s)||i.trackChildChange(Pt(s,r))}),n.isLeafNode()||n.forEachChild(O,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(xt(s,r,o))}else i.trackChildChange(et(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.indexedFilter_=new Gi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Dt.getStartPost_(e),this.endPost_=Dt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new C(n,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=g.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return n.forEachChild(O,(o,a)=>{r.matches(new C(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Dt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new C(n,i))||(i=g.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,f)=>h(f,d)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new C(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===n||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,l);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(xt(n,i,h)),a.updateImmediateChild(n,i);{r?.trackChildChange(Pt(n,h));const m=a.updateImmediateChild(n,g.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(et(d.name,d.node)),m.updateImmediateChild(d.name,d.node)):m}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Pt(c.name,c.node)),r.trackChildChange(et(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=O}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ze}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:We}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===O}copy(){const e=new zi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Lu(t){return t.loadsAllData()?new Gi(t.getIndex()):t.hasLimit()?new Ou(t):new Dt(t)}function rr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===O?n="$priority":t.index_===Du?n="$value":t.index_===Qe?n="$key":(p(t.index_ instanceof Pu,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=F(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=F(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+F(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=F(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+F(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function or(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==O&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends Co{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Wt("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=cn.getListenId_(e,i),a={};this.listens_[o]=a;const l=rr(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),Je(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,n){const i=cn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=rr(e._queryParams),i=e._path.toString(),s=new Ft;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ll(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Tt(a.responseText)}catch{j("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&j("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(){return{value:null,children:new Map}}function Ao(t,e,n){if(E(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=v(e);t.children.has(i)||t.children.set(i,un());const s=t.children.get(i);e=A(e),Ao(s,e,n)}}function di(t,e,n){t.value!==null?n(e,t.value):Bu(t,(i,s)=>{const r=new S(e.toString()+"/"+i);di(s,r,n)})}function Bu(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&$(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ar=10*1e3,Wu=30*1e3,Vu=300*1e3;class Hu{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Uu(e);const i=ar+(Wu-ar)*Math.random();yt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;$(e,(s,r)=>{r>0&&ae(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),yt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Vu))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var se;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(se||(se={}));function qi(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ji(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ki(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=se.ACK_USER_WRITE,this.source=qi()}operationForChild(e){if(E(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new S(e));return new hn(w(),n,this.revert)}}else return p(v(this.path)===e,"operationForChild called for unrelated child."),new hn(A(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,n){this.source=e,this.path=n,this.type=se.LISTEN_COMPLETE}operationForChild(e){return E(this.path)?new Mt(this.source,w()):new Mt(this.source,A(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=se.OVERWRITE}operationForChild(e){return E(this.path)?new Ve(this.source,w(),this.snap.getImmediateChild(e)):new Ve(this.source,A(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=se.MERGE}operationForChild(e){if(E(this.path)){const n=this.children.subtree(new S(e));return n.isEmpty()?null:n.value?new Ve(this.source,w(),n.value):new tt(this.source,w(),n)}else return p(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new tt(this.source,A(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(E(e))return this.isFullyInitialized()&&!this.filtered_;const n=v(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Yu(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Mu(o.childName,o.snapshotNode))}),pt(t,s,"child_removed",e,i,n),pt(t,s,"child_added",e,i,n),pt(t,s,"child_moved",r,i,n),pt(t,s,"child_changed",e,i,n),pt(t,s,"value",e,i,n),s}function pt(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>zu(t,a,l)),o.forEach(a=>{const l=Gu(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Gu(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function zu(t,e,n){if(e.childName==null||n.childName==null)throw ot("Should only compare child_ events.");const i=new C(e.childName,e.snapshotNode),s=new C(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(t,e){return{eventCache:t,serverCache:e}}function vt(t,e,n,i){return kn(new Re(e,n,i),t.serverCache)}function Po(t,e,n,i){return kn(t.eventCache,new Re(e,n,i))}function dn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function He(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Kn;const qu=()=>(Kn||(Kn=new K(Pc)),Kn);class k{static fromObject(e){let n=new k(null);return $(e,(i,s)=>{n=n.set(new S(i),s)}),n}constructor(e,n=qu()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:w(),value:this.value};if(E(e))return null;{const i=v(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(A(e),n);return r!=null?{path:M(new S(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(E(e))return this;{const n=v(e),i=this.children.get(n);return i!==null?i.subtree(A(e)):new k(null)}}set(e,n){if(E(e))return new k(n,this.children);{const i=v(e),r=(this.children.get(i)||new k(null)).set(A(e),n),o=this.children.insert(i,r);return new k(this.value,o)}}remove(e){if(E(e))return this.children.isEmpty()?new k(null):new k(null,this.children);{const n=v(e),i=this.children.get(n);if(i){const s=i.remove(A(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new k(null):new k(this.value,r)}else return this}}get(e){if(E(e))return this.value;{const n=v(e),i=this.children.get(n);return i?i.get(A(e)):null}}setTree(e,n){if(E(e))return n;{const i=v(e),r=(this.children.get(i)||new k(null)).setTree(A(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new k(this.value,o)}}fold(e){return this.fold_(w(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(M(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,w(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(E(e))return null;{const r=v(e),o=this.children.get(r);return o?o.findOnPath_(A(e),M(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,w(),n)}foreachOnPath_(e,n,i){if(E(e))return this;{this.value&&i(n,this.value);const s=v(e),r=this.children.get(s);return r?r.foreachOnPath_(A(e),M(n,s),i):new k(null)}}foreach(e){this.foreach_(w(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(M(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.writeTree_=e}static empty(){return new re(new k(null))}}function Ct(t,e,n){if(E(e))return new re(new k(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=q(s,e);return r=r.updateChild(o,n),new re(t.writeTree_.set(s,r))}else{const s=new k(n),r=t.writeTree_.setTree(e,s);return new re(r)}}}function fi(t,e,n){let i=t;return $(n,(s,r)=>{i=Ct(i,M(e,s),r)}),i}function lr(t,e){if(E(e))return re.empty();{const n=t.writeTree_.setTree(e,new k(null));return new re(n)}}function pi(t,e){return Ge(t,e)!=null}function Ge(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(q(n.path,e)):null}function cr(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(O,(i,s)=>{e.push(new C(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new C(i,s.value))}),e}function Se(t,e){if(E(e))return t;{const n=Ge(t,e);return n!=null?new re(new k(n)):new re(t.writeTree_.subtree(e))}}function _i(t){return t.writeTree_.isEmpty()}function nt(t,e){return xo(w(),t.writeTree_,e)}function xo(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=xo(M(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(M(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(t,e){return Lo(e,t)}function ju(t,e,n,i,s){p(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Ct(t.visibleWrites,e,n)),t.lastWriteId=i}function Ku(t,e,n,i){p(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=fi(t.visibleWrites,e,n),t.lastWriteId=i}function Qu(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Xu(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);p(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Ju(a,i.path)?s=!1:J(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Zu(t),!0;if(i.snap)t.visibleWrites=lr(t.visibleWrites,i.path);else{const a=i.children;$(a,l=>{t.visibleWrites=lr(t.visibleWrites,M(i.path,l))})}return!0}else return!1}function Ju(t,e){if(t.snap)return J(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&J(M(t.path,n),e))return!0;return!1}function Zu(t){t.visibleWrites=Do(t.allWrites,eh,w()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function eh(t){return t.visible}function Do(t,e,n){let i=re.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)J(n,o)?(a=q(n,o),i=Ct(i,a,r.snap)):J(o,n)&&(a=q(o,n),i=Ct(i,w(),r.snap.getChild(a)));else if(r.children){if(J(n,o))a=q(n,o),i=fi(i,a,r.children);else if(J(o,n))if(a=q(o,n),E(a))i=fi(i,w(),r.children);else{const l=Je(r.children,v(a));if(l){const c=l.getChild(A(a));i=Ct(i,w(),c)}}}else throw ot("WriteRecord should have .snap or .children")}}return i}function Mo(t,e,n,i,s){if(!i&&!s){const r=Ge(t.visibleWrites,e);if(r!=null)return r;{const o=Se(t.visibleWrites,e);if(_i(o))return n;if(n==null&&!pi(o,w()))return null;{const a=n||g.EMPTY_NODE;return nt(o,a)}}}else{const r=Se(t.visibleWrites,e);if(!s&&_i(r))return n;if(!s&&n==null&&!pi(r,w()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(J(c.path,e)||J(e,c.path))},a=Do(t.allWrites,o,e),l=n||g.EMPTY_NODE;return nt(a,l)}}}function th(t,e,n){let i=g.EMPTY_NODE;const s=Ge(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(O,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Se(t.visibleWrites,e);return n.forEachChild(O,(o,a)=>{const l=nt(Se(r,new S(o)),a);i=i.updateImmediateChild(o,l)}),cr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Se(t.visibleWrites,e);return cr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function nh(t,e,n,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,n);if(pi(t.visibleWrites,r))return null;{const o=Se(t.visibleWrites,r);return _i(o)?s.getChild(n):nt(o,s.getChild(n))}}function ih(t,e,n,i){const s=M(e,n),r=Ge(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Se(t.visibleWrites,s);return nt(o,i.getNode().getImmediateChild(n))}else return null}function sh(t,e){return Ge(t.visibleWrites,e)}function rh(t,e,n,i,s,r,o){let a;const l=Se(t.visibleWrites,e),c=Ge(l,w());if(c!=null)a=c;else if(n!=null)a=nt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=d.getNext();for(;f&&u.length<s;)h(f,i)!==0&&u.push(f),f=d.getNext();return u}else return[]}function oh(){return{visibleWrites:re.empty(),allWrites:[],lastWriteId:-1}}function fn(t,e,n,i){return Mo(t.writeTree,t.treePath,e,n,i)}function Qi(t,e){return th(t.writeTree,t.treePath,e)}function ur(t,e,n,i){return nh(t.writeTree,t.treePath,e,n,i)}function pn(t,e){return sh(t.writeTree,M(t.treePath,e))}function ah(t,e,n,i,s,r){return rh(t.writeTree,t.treePath,e,n,i,s,r)}function Xi(t,e,n){return ih(t.writeTree,t.treePath,e,n)}function Oo(t,e){return Lo(M(t.treePath,e),t.writeTree)}function Lo(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;p(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,xt(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Pt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,et(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,xt(i,e.snapshotNode,s.oldSnap));else throw ot("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Fo=new ch;class Ji{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Re(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Xi(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:He(this.viewCache_),r=ah(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(t){return{filter:t}}function hh(t,e){p(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function dh(t,e,n,i,s){const r=new lh;let o,a;if(n.type===se.OVERWRITE){const c=n;c.source.fromUser?o=mi(t,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!E(c.path),o=_n(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===se.MERGE){const c=n;c.source.fromUser?o=ph(t,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=gi(t,e,c.path,c.children,i,s,a,r))}else if(n.type===se.ACK_USER_WRITE){const c=n;c.revert?o=gh(t,e,c.path,i,s,r):o=_h(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===se.LISTEN_COMPLETE)o=mh(t,e,n.path,i,r);else throw ot("Unknown operation type: "+n.type);const l=r.getChanges();return fh(e,o,l),{viewCache:o,changes:l}}function fh(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=dn(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Ro(dn(e)))}}function Bo(t,e,n,i,s,r){const o=e.eventCache;if(pn(i,n)!=null)return e;{let a,l;if(E(n))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=He(e),u=c instanceof g?c:g.EMPTY_NODE,h=Qi(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=fn(i,He(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=v(n);if(c===".priority"){p(Ne(n)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=ur(i,n,u,l);h!=null?a=t.filter.updatePriority(u,h):a=o.getNode()}else{const u=A(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=ur(i,n,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=Xi(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,u,s,r):a=o.getNode()}}return vt(e,a,o.isFullyInitialized()||E(n),t.filter.filtersNodes())}}function _n(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(E(n))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(n,i);c=u.updateFullNode(l.getNode(),f,null)}else{const f=v(n);if(!l.isCompleteForPath(n)&&Ne(n)>1)return e;const _=A(n),y=l.getNode().getImmediateChild(f).updateChild(_,i);f===".priority"?c=u.updatePriority(l.getNode(),y):c=u.updateChild(l.getNode(),f,y,_,Fo,null)}const h=Po(e,c,l.isFullyInitialized()||E(n),u.filtersNodes()),d=new Ji(s,h,r);return Bo(t,h,n,s,d,a)}function mi(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const u=new Ji(s,e,r);if(E(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=vt(e,c,!0,t.filter.filtersNodes());else{const h=v(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=vt(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=A(n),f=a.getNode().getImmediateChild(h);let _;if(E(d))_=i;else{const m=u.getCompleteChild(h);m!=null?Vi(d)===".priority"&&m.getChild(wo(d)).isEmpty()?_=m:_=m.updateChild(d,i):_=g.EMPTY_NODE}if(f.equals(_))l=e;else{const m=t.filter.updateChild(a.getNode(),h,_,d,u,o);l=vt(e,m,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function hr(t,e){return t.eventCache.isCompleteForChild(e)}function ph(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=M(n,l);hr(e,v(u))&&(a=mi(t,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=M(n,l);hr(e,v(u))||(a=mi(t,a,u,c,s,r,o))}),a}function dr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function gi(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;E(n)?c=i:c=new k(null).setTree(n,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),_=dr(t,f,d);l=_n(t,l,new S(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const f=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!f){const _=e.serverCache.getNode().getImmediateChild(h),m=dr(t,_,d);l=_n(t,l,new S(h),m,s,r,o,a)}}),l}function _h(t,e,n,i,s,r,o){if(pn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(E(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return _n(t,e,n,l.getNode().getChild(n),s,r,a,o);if(E(n)){let c=new k(null);return l.getNode().forEachChild(Qe,(u,h)=>{c=c.set(new S(u),h)}),gi(t,e,n,c,s,r,a,o)}else return e}else{let c=new k(null);return i.foreach((u,h)=>{const d=M(n,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),gi(t,e,n,c,s,r,a,o)}}function mh(t,e,n,i,s){const r=e.serverCache,o=Po(e,r.getNode(),r.isFullyInitialized()||E(n),r.isFiltered());return Bo(t,o,n,i,Fo,s)}function gh(t,e,n,i,s,r){let o;if(pn(i,n)!=null)return e;{const a=new Ji(i,e,s),l=e.eventCache.getNode();let c;if(E(n)||v(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=fn(i,He(e));else{const h=e.serverCache.getNode();p(h instanceof g,"serverChildren would be complete if leaf node"),u=Qi(i,h)}u=u,c=t.filter.updateFullNode(l,u,r)}else{const u=v(n);let h=Xi(i,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=t.filter.updateChild(l,u,h,A(n),a,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(l,u,g.EMPTY_NODE,A(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=fn(i,He(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||pn(i,w())!=null,vt(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yh{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Gi(i.getIndex()),r=Lu(i);this.processor_=uh(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),u=new Re(l,o.isFullyInitialized(),s.filtersNodes()),h=new Re(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=kn(h,u),this.eventGenerator_=new $u(this.query_)}get query(){return this.query_}}function vh(t){return t.viewCache_.serverCache.getNode()}function Ch(t){return dn(t.viewCache_)}function Eh(t,e){const n=He(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!E(e)&&!n.getImmediateChild(v(e)).isEmpty())?n.getChild(e):null}function fr(t){return t.eventRegistrations_.length===0}function wh(t,e){t.eventRegistrations_.push(e)}function pr(t,e,n){const i=[];if(n){p(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function _r(t,e,n,i){e.type===se.MERGE&&e.source.queryId!==null&&(p(He(t.viewCache_),"We should always have a full cache before handling merges"),p(dn(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=dh(t.processor_,s,e,n,i);return hh(t.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Uo(t,r.changes,r.viewCache.eventCache.getNode(),null)}function bh(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(O,(r,o)=>{i.push(et(r,o))}),n.isFullyInitialized()&&i.push(Ro(n.getNode())),Uo(t,i,n.getNode(),e)}function Uo(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Yu(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mn;class Wo{constructor(){this.views=new Map}}function Ih(t){p(!mn,"__referenceConstructor has already been defined"),mn=t}function Sh(){return p(mn,"Reference.ts has not been loaded"),mn}function Th(t){return t.views.size===0}function Zi(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),_r(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(_r(o,e,n,i));return r}}function Vo(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=fn(n,s?i:null),l=!1;a?l=!0:i instanceof g?(a=Qi(n,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=kn(new Re(a,l,!1),new Re(i,s,!1));return new yh(e,c)}return o}function kh(t,e,n,i,s,r){const o=Vo(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),wh(o,n),bh(o,n)}function Nh(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=Ae(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(pr(c,n,i)),fr(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(pr(l,n,i)),fr(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Ae(t)&&r.push(new(Sh())(e._repo,e._path)),{removed:r,events:o}}function Ho(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Te(t,e){let n=null;for(const i of t.views.values())n=n||Eh(i,e);return n}function $o(t,e){if(e._queryParams.loadsAllData())return Rn(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Yo(t,e){return $o(t,e)!=null}function Ae(t){return Rn(t)!=null}function Rn(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gn;function Rh(t){p(!gn,"__referenceConstructor has already been defined"),gn=t}function Ah(){return p(gn,"Reference.ts has not been loaded"),gn}let Ph=1;class mr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new k(null),this.pendingWriteTree_=oh(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Go(t,e,n,i,s){return ju(t.pendingWriteTree_,e,n,i,s),s?lt(t,new Ve(qi(),e,n)):[]}function xh(t,e,n,i){Ku(t.pendingWriteTree_,e,n,i);const s=k.fromObject(n);return lt(t,new tt(qi(),e,s))}function Ce(t,e,n=!1){const i=Qu(t.pendingWriteTree_,e);if(Xu(t.pendingWriteTree_,e)){let r=new k(null);return i.snap!=null?r=r.set(w(),!0):$(i.children,o=>{r=r.set(new S(o),!0)}),lt(t,new hn(i.path,r,n))}else return[]}function Ht(t,e,n){return lt(t,new Ve(ji(),e,n))}function Dh(t,e,n){const i=k.fromObject(n);return lt(t,new tt(ji(),e,i))}function Mh(t,e){return lt(t,new Mt(ji(),e))}function Oh(t,e,n){const i=ts(t,n);if(i){const s=ns(i),r=s.path,o=s.queryId,a=q(r,e),l=new Mt(Ki(o),a);return is(t,r,l)}else return[]}function yn(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Yo(o,e))){const l=Nh(o,e,n,i);Th(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(d,f)=>Ae(f));if(u&&!h){const d=t.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=Bh(d);for(let _=0;_<f.length;++_){const m=f[_],y=m.query,X=Ko(t,m);t.listenProvider_.startListening(Et(y),Ot(t,y),X.hashFn,X.onComplete)}}}!h&&c.length>0&&!i&&(u?t.listenProvider_.stopListening(Et(e),null):c.forEach(d=>{const f=t.queryToTagMap.get(An(d));t.listenProvider_.stopListening(Et(d),f)}))}Uh(t,c)}return a}function zo(t,e,n,i){const s=ts(t,i);if(s!=null){const r=ns(s),o=r.path,a=r.queryId,l=q(o,e),c=new Ve(Ki(a),l,n);return is(t,o,c)}else return[]}function Lh(t,e,n,i){const s=ts(t,i);if(s){const r=ns(s),o=r.path,a=r.queryId,l=q(o,e),c=k.fromObject(n),u=new tt(Ki(a),l,c);return is(t,o,u)}else return[]}function yi(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(d,f)=>{const _=q(d,s);r=r||Te(f,_),o=o||Ae(f)});let a=t.syncPointTree_.get(s);a?(o=o||Ae(a),r=r||Te(a,w())):(a=new Wo,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,_)=>{const m=Te(_,w());m&&(r=r.updateImmediateChild(f,m))}));const c=Yo(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=An(e);p(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=Wh();t.queryToTagMap.set(d,f),t.tagToQueryMap.set(f,d)}const u=Nn(t.pendingWriteTree_,s);let h=kh(a,e,n,u,r,l);if(!c&&!o&&!i){const d=$o(a,e);h=h.concat(Vh(t,e,d))}return h}function es(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=q(o,e),c=Te(a,l);if(c)return c});return Mo(s,e,r,n,!0)}function Fh(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=q(c,n);i=i||Te(u,h)});let s=t.syncPointTree_.get(n);s?i=i||Te(s,w()):(s=new Wo,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new Re(i,!0,!1):null,a=Nn(t.pendingWriteTree_,e._path),l=Vo(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return Ch(l)}function lt(t,e){return qo(e,t.syncPointTree_,null,Nn(t.pendingWriteTree_,w()))}function qo(t,e,n,i){if(E(t.path))return jo(t,e,n,i);{const s=e.get(w());n==null&&s!=null&&(n=Te(s,w()));let r=[];const o=v(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,u=Oo(i,o);r=r.concat(qo(a,l,c,u))}return s&&(r=r.concat(Zi(s,t,i,n))),r}}function jo(t,e,n,i){const s=e.get(w());n==null&&s!=null&&(n=Te(s,w()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Oo(i,o),u=t.operationForChild(o);u&&(r=r.concat(jo(u,a,l,c)))}),s&&(r=r.concat(Zi(s,t,i,n))),r}function Ko(t,e){const n=e.query,i=Ot(t,n);return{hashFn:()=>(vh(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Oh(t,n._path,i):Mh(t,n._path);{const r=Mc(s,n);return yn(t,n,null,r)}}}}function Ot(t,e){const n=An(e);return t.queryToTagMap.get(n)}function An(t){return t._path.toString()+"$"+t._queryIdentifier}function ts(t,e){return t.tagToQueryMap.get(e)}function ns(t){const e=t.indexOf("$");return p(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new S(t.substr(0,e))}}function is(t,e,n){const i=t.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=Nn(t.pendingWriteTree_,e);return Zi(i,n,s,null)}function Bh(t){return t.fold((e,n,i)=>{if(n&&Ae(n))return[Rn(n)];{let s=[];return n&&(s=Ho(n)),$(i,(r,o)=>{s=s.concat(o)}),s}})}function Et(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Ah())(t._repo,t._path):t}function Uh(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=An(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Wh(){return Ph++}function Vh(t,e,n){const i=e._path,s=Ot(t,e),r=Ko(t,n),o=t.listenProvider_.startListening(Et(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)p(!Ae(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!E(c)&&u&&Ae(u))return[Rn(u).query];{let d=[];return u&&(d=d.concat(Ho(u).map(f=>f.query))),$(h,(f,_)=>{d=d.concat(_)}),d}});for(let c=0;c<l.length;++c){const u=l[c];t.listenProvider_.stopListening(Et(u),Ot(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new ss(n)}node(){return this.node_}}class rs{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=M(this.path_,e);return new rs(this.syncTree_,n)}node(){return es(this.syncTree_,this.path_)}}const Hh=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},gr=function(t,e,n){if(!t||typeof t!="object")return t;if(p(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return $h(t[".sv"],e,n);if(typeof t[".sv"]=="object")return Yh(t[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},$h=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:p(!1,"Unexpected server value: "+t)}},Yh=function(t,e,n){t.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Qo=function(t,e,n,i){return os(e,new rs(n,t),i)},Xo=function(t,e,n){return os(t,new ss(e),n)};function os(t,e,n){const i=t.getPriority().val(),s=gr(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=gr(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new B(a,L(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new B(s))),o.forEachChild(O,(a,l)=>{const c=os(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function ls(t,e){let n=e instanceof S?e:new S(e),i=t,s=v(n);for(;s!==null;){const r=Je(i.node.children,s)||{children:{},childCount:0};i=new as(s,i,r),n=A(n),s=v(n)}return i}function ct(t){return t.node.value}function Jo(t,e){t.node.value=e,vi(t)}function Zo(t){return t.node.childCount>0}function Gh(t){return ct(t)===void 0&&!Zo(t)}function Pn(t,e){$(t.node.children,(n,i)=>{e(new as(n,t,i))})}function ea(t,e,n,i){n&&e(t),Pn(t,s=>{ea(s,e,!0)})}function zh(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function $t(t){return new S(t.parent===null?t.name:$t(t.parent)+"/"+t.name)}function vi(t){t.parent!==null&&qh(t.parent,t.name,t)}function qh(t,e,n){const i=Gh(n),s=ae(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,vi(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,vi(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh=/[\[\].#$\/\u0000-\u001F\u007F]/,Kh=/[\[\].#$\u0000-\u001F\u007F]/,Qn=10*1024*1024,cs=function(t){return typeof t=="string"&&t.length!==0&&!jh.test(t)},ta=function(t){return typeof t=="string"&&t.length!==0&&!Kh.test(t)},Qh=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),ta(t)},Xh=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Li(t)||t&&typeof t=="object"&&ae(t,".sv")},na=function(t,e,n,i){i&&e===void 0||xn(In(t,"value"),e,n)},xn=function(t,e,n){const i=n instanceof S?new pu(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Le(i));if(typeof e=="function")throw new Error(t+"contains a function "+Le(i)+" with contents = "+e.toString());if(Li(e))throw new Error(t+"contains "+e.toString()+" "+Le(i));if(typeof e=="string"&&e.length>Qn/3&&Sn(e)>Qn)throw new Error(t+"contains a string greater than "+Qn+" utf8 bytes "+Le(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if($(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!cs(o)))throw new Error(t+" contains an invalid key ("+o+") "+Le(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);_u(i,o),xn(t,a,i),mu(i)}),s&&r)throw new Error(t+' contains ".value" child '+Le(i)+" in addition to actual children.")}},Jh=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=At(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!cs(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(fu);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&J(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Zh=function(t,e,n,i){const s=In(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];$(e,(o,a)=>{const l=new S(o);if(xn(s,a,M(n,l)),Vi(l)===".priority"&&!Xh(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Jh(s,r)},ia=function(t,e,n,i){if(!ta(n))throw new Error(In(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},ed=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ia(t,e,n)},us=function(t,e){if(v(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},td=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!cs(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Qh(n))throw new Error(In(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Dn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Hi(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function sa(t,e,n){Dn(t,n),ra(t,i=>Hi(i,e))}function ee(t,e,n){Dn(t,n),ra(t,i=>J(i,e)||J(e,i))}function ra(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(id(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function id(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();gt&&H("event: "+n.toString()),at(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="repo_interrupt",rd=25;class od{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new nd,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=un(),this.transactionQueueTree_=new as,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ad(t,e,n){if(t.stats_=Ui(t.repoInfo_),t.forceRestClient_||Bc())t.server_=new cn(t.repoInfo_,(i,s,r,o)=>{yr(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>vr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{F(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new fe(t.repoInfo_,e,(i,s,r,o)=>{yr(t,i,s,r,o)},i=>{vr(t,i)},i=>{ld(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=$c(t.repoInfo_,()=>new Hu(t.stats_,t.server_)),t.infoData_=new Fu,t.infoSyncTree_=new mr({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=Ht(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),hs(t,"connected",!1),t.serverSyncTree_=new mr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ee(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function oa(t){const n=t.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Mn(t){return Hh({timestamp:oa(t)})}function yr(t,e,n,i,s){t.dataUpdateCount++;const r=new S(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=tn(n,c=>L(c));o=Lh(t.serverSyncTree_,r,l,s)}else{const l=L(n);o=zo(t.serverSyncTree_,r,l,s)}else if(i){const l=tn(n,c=>L(c));o=Dh(t.serverSyncTree_,r,l)}else{const l=L(n);o=Ht(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=it(t,r)),ee(t.eventQueue_,a,o)}function vr(t,e){hs(t,"connected",e),e===!1&&dd(t)}function ld(t,e){$(e,(n,i)=>{hs(t,n,i)})}function hs(t,e,n){const i=new S("/.info/"+e),s=L(n);t.infoData_.updateSnapshot(i,s);const r=Ht(t.infoSyncTree_,i,s);ee(t.eventQueue_,i,r)}function ds(t){return t.nextWriteId_++}function cd(t,e,n){const i=Fh(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=L(s).withIndex(e._queryParams.getIndex());yi(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Ht(t.serverSyncTree_,e._path,r);else{const a=Ot(t.serverSyncTree_,e);o=zo(t.serverSyncTree_,e._path,r,a)}return ee(t.eventQueue_,e._path,o),yn(t.serverSyncTree_,e,n,null,!0),r},s=>(Yt(t,"get for query "+F(e)+" failed: "+s),Promise.reject(new Error(s))))}function ud(t,e,n,i,s){Yt(t,"set",{path:e.toString(),value:n,priority:i});const r=Mn(t),o=L(n,i),a=es(t.serverSyncTree_,e),l=Xo(o,a,r),c=ds(t),u=Go(t.serverSyncTree_,e,l,c,!0);Dn(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(d,f)=>{const _=d==="ok";_||j("set at "+e+" failed: "+d);const m=Ce(t.serverSyncTree_,c,!_);ee(t.eventQueue_,e,m),Ci(t,s,d,f)});const h=ps(t,e);it(t,h),ee(t.eventQueue_,h,[])}function hd(t,e,n,i){Yt(t,"update",{path:e.toString(),value:n});let s=!0;const r=Mn(t),o={};if($(n,(a,l)=>{s=!1,o[a]=Qo(M(e,a),L(l),t.serverSyncTree_,r)}),s)H("update() called with empty data.  Don't do anything."),Ci(t,i,"ok",void 0);else{const a=ds(t),l=xh(t.serverSyncTree_,e,o,a);Dn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||j("update at "+e+" failed: "+c);const d=Ce(t.serverSyncTree_,a,!h),f=d.length>0?it(t,e):e;ee(t.eventQueue_,f,d),Ci(t,i,c,u)}),$(n,c=>{const u=ps(t,M(e,c));it(t,u)}),ee(t.eventQueue_,e,[])}}function dd(t){Yt(t,"onDisconnectEvents");const e=Mn(t),n=un();di(t.onDisconnect_,w(),(s,r)=>{const o=Qo(s,r,t.serverSyncTree_,e);Ao(n,s,o)});let i=[];di(n,w(),(s,r)=>{i=i.concat(Ht(t.serverSyncTree_,s,r));const o=ps(t,s);it(t,o)}),t.onDisconnect_=un(),ee(t.eventQueue_,w(),i)}function fd(t,e,n){let i;v(e._path)===".info"?i=yi(t.infoSyncTree_,e,n):i=yi(t.serverSyncTree_,e,n),sa(t.eventQueue_,e._path,i)}function aa(t,e,n){let i;v(e._path)===".info"?i=yn(t.infoSyncTree_,e,n):i=yn(t.serverSyncTree_,e,n),sa(t.eventQueue_,e._path,i)}function pd(t){t.persistentConnection_&&t.persistentConnection_.interrupt(sd)}function Yt(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),H(n,...e)}function Ci(t,e,n,i){e&&at(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function la(t,e,n){return es(t.serverSyncTree_,e,n)||g.EMPTY_NODE}function fs(t,e=t.transactionQueueTree_){if(e||On(t,e),ct(e)){const n=ua(t,e);p(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&_d(t,$t(e),n)}else Zo(e)&&Pn(e,n=>{fs(t,n)})}function _d(t,e,n){const i=n.map(c=>c.currentWriteId),s=la(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const u=n[c];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=q(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Yt(t,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<n.length;d++)n[d].status=2,u=u.concat(Ce(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&h.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();On(t,ls(t.transactionQueueTree_,e)),fs(t,t.transactionQueueTree_),ee(t.eventQueue_,e,u);for(let d=0;d<h.length;d++)at(h[d])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{j("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}it(t,e)}},o)}function it(t,e){const n=ca(t,e),i=$t(n),s=ua(t,n);return md(t,s,i),i}function md(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=q(n,l.path);let u=!1,h;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,s=s.concat(Ce(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=rd)u=!0,h="maxretry",s=s.concat(Ce(t.serverSyncTree_,l.currentWriteId,!0));else{const d=la(t,l.path,o);l.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){xn("transaction failed: Data returned ",f,l.path);let _=L(f);typeof f=="object"&&f!=null&&ae(f,".priority")||(_=_.updatePriority(d.getPriority()));const y=l.currentWriteId,X=Mn(t),ce=Xo(_,d,X);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=ce,l.currentWriteId=ds(t),o.splice(o.indexOf(y),1),s=s.concat(Go(t.serverSyncTree_,l.path,ce,l.currentWriteId,l.applyLocally)),s=s.concat(Ce(t.serverSyncTree_,y,!0))}else u=!0,h="nodata",s=s.concat(Ce(t.serverSyncTree_,l.currentWriteId,!0))}ee(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(d){setTimeout(d,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}On(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)at(i[a]);fs(t,t.transactionQueueTree_)}function ca(t,e){let n,i=t.transactionQueueTree_;for(n=v(e);n!==null&&ct(i)===void 0;)i=ls(i,n),e=A(e),n=v(e);return i}function ua(t,e){const n=[];return ha(t,e,n),n.sort((i,s)=>i.order-s.order),n}function ha(t,e,n){const i=ct(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Pn(e,s=>{ha(t,s,n)})}function On(t,e){const n=ct(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Jo(e,n.length>0?n:void 0)}Pn(e,i=>{On(t,i)})}function ps(t,e){const n=$t(ca(t,e)),i=ls(t.transactionQueueTree_,e);return zh(i,s=>{Xn(t,s)}),Xn(t,i),ea(i,s=>{Xn(t,s)}),n}function Xn(t,e){const n=ct(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(p(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Ce(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Jo(e,void 0):n.length=r+1,ee(t.eventQueue_,$t(e),s);for(let o=0;o<i.length;o++)at(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function yd(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):j(`Invalid query segment '${n}' in query '${t}'`)}return e}const Cr=function(t,e){const n=vd(t),i=n.namespace;n.domain==="firebase.com"&&me(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&me("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||Rc();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new fo(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new S(n.pathString)}},vd=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(s=gd(t.substring(u,h)));const d=yd(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Cd=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Er.charAt(n%64),n=Math.floor(n/64);p(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Er.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+F(this.snapshot.exportVal())}}class fa{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ms{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return E(this._path)?null:Vi(this._path)}get ref(){return new le(this._repo,this._path)}get _queryIdentifier(){const e=or(this._queryParams),n=Fi(e);return n==="{}"?"default":n}get _queryObject(){return or(this._queryParams)}isEqual(e){if(e=$e(e),!(e instanceof ms))return!1;const n=this._repo===e._repo,i=Hi(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+du(this._path)}}class le extends ms{constructor(e,n){super(e,n,new zi,!1)}get parent(){const e=wo(this._path);return e===null?null:new le(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class st{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new S(e),i=rt(this.ref,e);return new st(this._node.getChild(n),i,O)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new st(s,rt(this.ref,i),O)))}hasChild(e){const n=new S(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function te(t,e){return t=$e(t),t._checkNotDeleted("ref"),e!==void 0?rt(t._root,e):t._root}function rt(t,e){return t=$e(t),v(t._path)===null?ed("child","path",e):ia("child","path",e),new le(t._repo,M(t._path,e))}function Ed(t,e){t=$e(t),us("push",t._path),na("push",e,t._path,!0);const n=oa(t._repo),i=Cd(n),s=rt(t,i),r=rt(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function wr(t){return us("remove",t._path),Gt(t,null)}function Gt(t,e){t=$e(t),us("set",t._path),na("set",e,t._path,!1);const n=new Ft;return ud(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function pa(t,e){Zh("update",e,t._path);const n=new Ft;return hd(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function wd(t){t=$e(t);const e=new _s(()=>{}),n=new zt(e);return cd(t._repo,t,n).then(i=>new st(i,new le(t._repo,t._path),t._queryParams.getIndex()))}class zt{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new da("value",this,new st(e.snapshotNode,new le(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new fa(this,e,n):null}matches(e){return e instanceof zt?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Ln{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new fa(this,e,n):null}createEvent(e,n){p(e.childName!=null,"Child events should have a childName.");const i=rt(new le(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new da(e.type,this,new st(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Ln?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function gs(t,e,n,i,s){const r=new _s(n,void 0),o=e==="value"?new zt(r):new Ln(e,r);return fd(t._repo,t,o),()=>aa(t._repo,t,o)}function _a(t,e,n,i){return gs(t,"value",e)}function ma(t,e,n,i){return gs(t,"child_added",e)}function bd(t,e,n,i){return gs(t,"child_removed",e)}function ga(t,e,n){let i=null;const s=n?new _s(n):null;e==="value"?i=new zt(s):e&&(i=new Ln(e,s)),aa(t._repo,t,i)}Ih(le);Rh(le);/**
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
 */const Id="FIREBASE_DATABASE_EMULATOR_HOST",Ei={};let Sd=!1;function Td(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Mi(r);t.repoInfo_=new fo(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function kd(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||me("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),H("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Cr(r,s),a=o.repoInfo,l;typeof process<"u"&&Hs&&(l=Hs[Id]),l?(r=`http://${l}?ns=${a.namespace}`,o=Cr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new Wc(t.name,t.options,e);td("Invalid Firebase Database URL",o),E(o.path)||me("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Rd(a,t,c,new Uc(t,n));return new Ad(u,t)}function Nd(t,e){const n=Ei[e];(!n||n[t.key]!==t)&&me(`Database ${e}(${t.repoInfo_}) has already been deleted.`),pd(t),delete n[t.key]}function Rd(t,e,n,i){let s=Ei[e.name];s||(s={},Ei[e.name]=s);let r=s[t.toURLString()];return r&&me("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new od(t,Sd,n,i),s[t.toURLString()]=r,r}class Ad{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ad(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new le(this._repo,w())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Nd(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&me("Cannot call "+e+" on a deleted database.")}}function Pd(t=dc(),e){const n=ac(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=za("database");i&&xd(n,...i)}return n}function xd(t,e,n,i={}){t=$e(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&nn(i,r.repoInfo_.emulatorOptions))return;me("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&me('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Xt(Xt.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:ja(i.mockUserToken,t.app.options.projectId);o=new Xt(a)}Mi(e)&&(qa(e),Xa("Database",!0)),Td(r,s,i,o)}/**
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
 */function Dd(t){bc(hc),rn(new kt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return kd(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),je($s,Ys,t),je($s,Ys,"esm2020")}fe.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};fe.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Dd();var Md="firebase",Od="12.4.0";/**
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
 */je(Md,Od,"app");const Ld={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Fd=Kr(Ld),ne=Pd(Fd),wi=[];function ys(t,e,n){wi.push({ref:t,type:e,callback:n})}function Bd(){wi.forEach(({ref:t,type:e,callback:n})=>{ga(t,e,n)}),wi.length=0}function bi(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=c=>{try{const u=c.target;if(t.contains(u))return;for(const h of o)if(h&&h.contains&&h.contains(u)||h===u)return;e(c)}catch(u){console.error("closeOnClickOutside handler error:",u)}},l=c=>{s&&c.key==="Escape"&&e(c)};return r.forEach(c=>document.addEventListener(c,a,{passive:!0})),s&&document.addEventListener("keydown",l),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",l)}}function Ud(t,e,n={}){return bi(t,e,{...n,events:["dblclick"]})}const vs=t=>t?!0:(console.warn("Element not found."),!1),Cs=t=>{if(vs(t))return t.classList.contains("hidden")},V=t=>{vs(t)&&t.classList.remove("hidden")},b=t=>{vs(t)&&t.classList.add("hidden")},ya=t=>t.classList.contains("smallFrame"),Es=t=>{if(!ya(t)){t.classList.add("smallFrame");const e=document.createElement("button");e.classList.add("smallFrame-toggle-btn"),e.textContent="❮",document.body.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"))})}},Wd=t=>{if(ya(t)){t.classList.remove("smallFrame");const e=document.querySelector(".smallFrame-close");e&&e.remove()}};function Vd(t){return document.pictureInPictureElement===t}const Hd=document.getElementById("installBtn"),Pe=document.getElementById("localVideo"),G=document.getElementById("remoteVideo"),I=document.getElementById("sharedVideo"),Lt=document.getElementById("chat-controls"),ge=document.getElementById("call-btn"),ut=document.getElementById("hang-up-btn");document.getElementById("copyLink");document.getElementById("pipBtn");const br=document.getElementById("switchCameraSelfBtn"),Ir=document.getElementById("status"),$d=document.getElementById("linkContainer");document.getElementById("watchContainer");document.getElementById("videos");const Yd=document.getElementById("syncStatus"),va=document.getElementById("shareLink");document.getElementById("streamUrl");const qt=document.getElementById("mute-btn"),Gd=document.getElementById("fullscreenPartnerBtn"),zd=document.getElementById("mic-btn"),qd=document.getElementById("camera-btn"),jd=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");document.getElementById("titleLink");document.getElementById("titleText");function W(t){Ir?Ir.textContent=t:console.warn("Status div not found in the DOM.")}function Kd(t,{inactivityMs:e=2500,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const c=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(y=>!Array.isArray(o)||!o.includes(y));function u(){V(t);try{typeof i=="function"&&i()}catch(y){console.warn("showHideOnInactivity onShow callback error:",y)}a&&clearTimeout(a),a=setTimeout(()=>{b(t);try{typeof s=="function"&&s()}catch(y){console.warn("showHideOnInactivity onHide callback error:",y)}a=null},e)}c.forEach(y=>n.addEventListener(y,u,{passive:!0}));function h(){if(document.hidden){a&&(clearTimeout(a),a=null);try{b(t)}catch(y){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",y)}}else u()}document.addEventListener("visibilitychange",h);function d(y){if(!y.relatedTarget){a&&(clearTimeout(a),a=null),b(t);try{typeof s=="function"&&s()}catch(X){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",X)}}}n.addEventListener("mouseout",d);function f(y){if(r&&(y.key==="Escape"||y.key==="Esc")){a&&(clearTimeout(a),a=null),b(t);try{typeof s=="function"&&s()}catch(X){console.warn("showHideOnInactivity onHide (esc) callback error:",X)}}}document.addEventListener("keydown",f);function _(){a||u()}n.addEventListener("touchend",_,{passive:!0}),b(t);function m(){c.forEach(y=>n.removeEventListener(y,u)),document.removeEventListener("visibilitychange",h),n.removeEventListener("mouseout",d),n.removeEventListener("touchend",_),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return m}const Ca={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,highpassFilter:!0,typingNoiseDetection:!0}},Qd={default:!0};function Xd(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Jd(){return Xd()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Zd(){const t=await Jd();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function ef({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user",r=ws(s);try{const o=await navigator.mediaDevices.getUserMedia({video:r,audio:Ca.default}),a=o.getVideoTracks()[0],l=o.getAudioTracks()[0],c=t.getVideoTracks()[0],u=c?c.enabled:!0,h=t.getAudioTracks()[0],d=h?!h.enabled:!1;if(i){const f=i.getSenders().find(m=>m.track&&m.track.kind==="video");f&&f.replaceTrack(a);const _=i.getSenders().find(m=>m.track&&m.track.kind==="audio");_&&l&&_.replaceTrack(l)}return a&&(a.enabled=u),l&&(l.enabled=!d),t.getTracks().forEach(f=>f.stop()),e.srcObject=new MediaStream([a].filter(Boolean)),{newStream:o,facingMode:s}}catch(o){return console.error("Failed to switch camera:",o),null}}const Sr=(t,e)=>{};let Jn=!1,De=null,Me=null;function tf({getLocalStream:t,getFacingMode:e}){return De&&Me&&De.removeEventListener("change",Me),De=window.matchMedia("(orientation: portrait)"),Me=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";nf({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},De.addEventListener("change",Me),()=>{De&&Me&&De.removeEventListener("change",Me),De=null,Me=null}}async function nf({localStream:t,currentFacingMode:e}){if(!(Jn||!t?.getVideoTracks()[0])){Jn=!0;try{const n=t.getVideoTracks()[0],i=ws(e);Sr("Applying constraints:",i),await n.applyConstraints(i),Sr("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Jn=!1}}}function sf(){return window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180}function ws(t){const e=sf();return{facingMode:t,aspectRatio:{ideal:e?9/16:16/9},width:{ideal:e?1080:1920},height:{ideal:e?1920:1080}}}let Ii=!1,vn=[];function rf(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function of(t,e,n){n&&(n.muted=!t,n.volume=e)}function af(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function lf(t,e){if(!t)return;const n=()=>{if(t.muted!==Ii){const i=e.querySelector("i");i.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Ii=t.muted}};t.addEventListener("volumechange",n),vn.push(()=>{t&&t.removeEventListener("volumechange",n)})}function cf({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,muteSelfBtn:r,videoSelfBtn:o,switchCameraSelfBtn:a,fullscreenSelfBtn:l,mutePartnerBtn:c,fullscreenPartnerBtn:u}){r&&(r.onclick=()=>{const f=t(),_=e();if(!_||!f)return;const m=!_.muted;rf(!m,f),of(!m,0,_),af(m,r)}),o&&(o.onclick=()=>{const f=t();if(!f)return;const _=f.getVideoTracks()[0];if(_){_.enabled=!_.enabled;const m=o.querySelector("i");m.className=_.enabled?"fa fa-video":"fa fa-video-slash"}});let h="user";const d=tf({getLocalStream:t,getFacingMode:()=>h});vn.push(d),a&&(a.onclick=async()=>{const f=await ef({localStream:t(),localVideo:e(),currentFacingMode:h,peerConnection:i()||null});f?(h=f.facingMode,console.log("Switched camera to facingMode:",h),f.newStream&&typeof s=="function"&&s(f.newStream)):console.error("Camera switch failed.")}),l&&(l.onclick=()=>{const f=e();f.requestFullscreen?f.requestFullscreen():f.webkitRequestFullscreen&&f.webkitRequestFullscreen()}),c&&(c.onclick=()=>{const f=n();f&&(f.muted=!f.muted)}),u&&(u.onclick=()=>{const f=n();f.requestFullscreen?f.requestFullscreen():f.webkitRequestFullscreen&&f.webkitRequestFullscreen()})}function uf(){vn.forEach(t=>t()),vn=[],Ii=!1}const Tr="yt-player-div",Si="yt-player-root";let x=null,ye=!1;const wt=()=>x,hf=()=>ye,Ea=t=>ye=t,Ue=()=>{const t=document.getElementById(Tr);if(!t)throw new Error(`Container #${Tr} not found`);return t};function df(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function wa(){const t=Ue();if(!document.getElementById(Si)){const e=document.createElement("div");e.id=Si,t.appendChild(e)}V(t)}function Ti(){const t=Ue();b(t)}function Zn(){const t=Ue();return t&&!t.classList.contains("hidden")}function ki(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function ba(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function ff({url:t,onReady:e,onStateChange:n}){const i=ba(t);if(!i)throw new Error("Invalid YouTube URL");if(await df(),x){try{x.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}x=null}const s=(o=!0)=>{const a=Ue(),l=x.getIframe();if(l&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===l)try{l.blur()}catch{}}if(o){const c=u=>{if(u.code==="Space"){const h=Ue(),d=x.getIframe();if(document.activeElement===d||document.activeElement===h)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),x.getPlayerState()!==window.YT.PlayerState.PLAYING?Is():Fn()}};document.addEventListener("keydown",c,{once:!0})}}},r=()=>{const o=Ue(),a=x.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return wa(),new Promise((o,a)=>{try{x=new window.YT.Player(Si,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:l=>{ye=!0,e&&e(l),o(x)},onStateChange:l=>{l.data===window.YT.PlayerState.ENDED&&s(!1),l.data===window.YT.PlayerState.PAUSED&&s(),l.data===window.YT.PlayerState.PLAYING&&r(),n&&n(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function bs(){if(x){try{Ti(),x.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}x=null,ye=!1}}function Is(){x&&ye&&x.playVideo()}function Fn(){x&&ye&&x.pauseVideo()}function pf(t){x&&ye&&x.seekTo(t,!0)}function Cn(){return x&&ye?x.getCurrentTime():0}function Ss(){return x&&ye?x.getPlayerState():-1}const Ee={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let pe=null,Bn=null,Ia=!1,Z="none",Ts=null;const ks=()=>Ia,Sa=t=>Ia=t,_t=()=>Z,_f=t=>{["yt","url","none"].includes(t)?Z=t:console.warn("Invalid lastWatched platform:",t)};let we=!1,bt=null,It=0;async function Xe(t){if(!pe)return;console.debug("Updating watch sync state, roomId:",pe);const e=te(ne,`rooms/${pe}/watch`);try{await pa(e,{...t,updatedBy:Bn})}catch(n){console.error("Failed to update watch state:",n)}}function Ta(t,e,n){if(!t)return;pe=t,Bn=n;const i=te(ne,`rooms/${t}/watch`);_a(i,kr),ys(i,"value",kr),wf()}function kr(t){const e=t.val();e&&e.updatedBy!==Bn&&(Date.now()-It<500||(e.url&&e.url!==Ts&&mf(e.url),e.isYouTube?gf(e):Ef(e)))}function mf(t){Ts=t,ki(t)?(b(I),ka(t),Z="yt"):(bs(),V(I),I.src=t,Z="url")}function gf(t){!wt()||!hf()||(yf(t),vf(t))}function yf(t){const e=Ss(),n=e===Ee.PLAYING;if([Ee.BUFFERING,Ee.UNSTARTED].includes(e)){Cf();return}we||(t.playing&&!n?(Is(),Z="yt"):!t.playing&&n&&(Fn(),Z="yt"))}function vf(t){if(t.currentTime===void 0)return;const e=Cn();Math.abs(e-t.currentTime)>.3&&!we&&(pf(t.currentTime),setTimeout(()=>{t.playing?Is():Fn(),Z="yt"},500))}function Cf(){we=!0,clearTimeout(bt),bt=setTimeout(async()=>{we=!1;const t=Ss()===Ee.PLAYING;await Xe({playing:t,currentTime:Cn()})},700)}function Ef(t){t.playing!==void 0&&(t.playing&&I.paused?I.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!I.paused&&I.pause()),t.currentTime!==void 0&&Math.abs(I.currentTime-t.currentTime)>1&&(I.currentTime=t.currentTime,t.playing?I.play().catch(n=>console.warn("Play failed:",n)):I.pause())}function wf(){I.addEventListener("play",async()=>{!wt()&&pe&&(It=Date.now(),await Xe({playing:!0,isYouTube:!1})),Z="url"}),I.addEventListener("pause",async()=>{!wt()&&pe&&(It=Date.now(),await Xe({playing:!1,isYouTube:!1})),Z="url"}),I.addEventListener("seeked",async()=>{!wt()&&pe&&(It=Date.now(),await Xe({currentTime:I.currentTime,playing:!I.paused,isYouTube:!1})),Z="url"})}async function bf(t){if(!t)return!1;if(It=Date.now(),ki(t)){if(b(I),!await ka(t))return!1;wn(),Z="yt"}else bs(),V(I),I.src=t,wn(),Z="url";if(pe){const e=te(ne,`rooms/${pe}/watch`);Gt(e,{url:t,playing:!1,currentTime:0,isYouTube:ki(t),updatedBy:Bn})}return!0}async function If(t){return!t||!t.url?(console.warn("Non-existing or invalid video."),!1):(Ts=t.url,await bf(t.url))}async function ka(t,e,n){if(!ba(t))return console.error("Invalid YouTube URL:",t),!1;try{return await ff({url:t,onReady:s=>{Ea(!0)},onStateChange:async s=>{if(!wt())return;const o=s.data===Ee.PLAYING,a=s.data===Ee.PAUSED;if(s.data===Ee.BUFFERING){we=!0,bt&&clearTimeout(bt),bt=setTimeout(async()=>{we=!1;const u=Ss()===Ee.PLAYING;await Xe({playing:u,currentTime:Cn()})},700);return}a&&we||!we&&(o||a)&&await Xe({playing:o,currentTime:Cn()})}}),!0}catch(s){return console.error("Failed to load YouTube video:",s),!1}}let ei=null,ve=null,P=null,R=null,Nr=!1,Qt=!1,oe=[],Fe=null,Ni="",Y=-1,Ri=[];const Sf="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",Tf="https://www.googleapis.com/youtube/v3";function kf(){if(Nr||Qt)return!1;if(Qt=!0,Fe=If,ei=document.querySelector(".search-section"),ve=document.getElementById("searchBtn"),P=document.getElementById("searchQuery"),R=document.getElementById("searchResults"),!ei||!ve||!P||!R)return console.error("YouTube search elements not found in DOM"),Qt=!1,!1;const t=s=>/^https?:\/\//i.test(s),e=s=>{R.querySelectorAll(".search-result-item").forEach((o,a)=>{a===s?(o.classList.add("focused"),o.scrollIntoView({block:"nearest"})):o.classList.remove("focused")}),Y=s};ve.onclick=async()=>{const s=P.value.trim();if(Cs(P)){V(P),P.focus();return}if(!s){Jt(),b(P);return}if(Pr()&&s===Ni)Ai(oe);else if(!t(s))await Rr(s);else{Fe&&await Fe({url:s,title:s,channel:"",thumbnail:"",id:s}),b(R),P.value="",b(P),Y=-1;return}},ei.addEventListener("keydown",async s=>{const r=R.querySelectorAll(".search-result-item");if(r.length>0&&(s.key==="ArrowDown"||s.key==="ArrowUp")){if(s.key==="ArrowDown"){let o=Y+1;o>=r.length&&(o=0),e(o)}else if(s.key==="ArrowUp"){let o=Y-1;o<0&&(o=Y===-1?0:r.length-1),e(o)}return}if(s.key==="Enter"){if(r.length>0&&Y>=0){r[Y].click(),b(P),b(R),Y=-1;return}const o=P.value.trim();if(o)if(Pr()&&o===Ni)Ai(oe);else if(!t(o))await Rr(o);else{Fe&&await Fe({url:o,title:o,channel:"",thumbnail:"",id:o}),b(R),Y=-1,P.value="",b(P);return}}else s.key==="Escape"&&(Rf()?Jt():P.value?P.value="":b(P))}),P.addEventListener("input",()=>{P.value.trim()===""&&Jt(),Y=-1});const n=bi(P,()=>b(P),{ignore:[ve],esc:!1});Ri.push(n);const i=bi(R,()=>b(R),{ignore:[ve],esc:!1});return Ri.push(i),Qt=!1,Nr=!0,!0}async function Rr(t){if(!ve||!R){console.error("Search elements not initialized");return}oe=[],Ni=t,ve.disabled=!0,R.innerHTML='<div class="search-loading">Searching YouTube...</div>',V(R);try{const e=await fetch(`${Tf}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${Sf}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Ar("No videos found"),oe=[];return}oe=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Ai(oe)}catch(e){console.error("YouTube search failed:",e),Ar(e.message||"Search failed. Please try again.")}finally{ve.disabled=!1}}function Ai(t){if(!R){console.error("Search results element not initialized");return}if(!t||t.length===0){R.innerHTML='<div class="no-results">No results found</div>',oe=[],Y=-1;return}R.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${n.title}</div>
        <div class="result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(Fe){if(await Fe(n),b(R),Y=-1,!P){console.error("Search query element not initialized");return}P.value="",b(P)}},R.appendChild(i)}),V(R),Y=0,R.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Y?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Ar(t){if(oe=[],Y=-1,!R){console.error("Search results element not initialized");return}R.innerHTML=`<div class="search-error">${t}</div>`,V(R)}function Jt(){oe=[],Y=-1,R&&(R.innerHTML="",b(R))}function Nf(){Jt(),Ri.forEach(t=>t())}function Rf(){return!Cs(R)}function Pr(){return oe.length>0}function Af(t){if(!t){console.warn("setupPWA: install button not found");return}let e;window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),e=n,V(t)}),t.addEventListener("click",async()=>{if(e){e.prompt();const{outcome:n}=await e.userChoice;n==="accepted"?b(t):console.log("User dismissed the install prompt"),e=null}}),window.addEventListener("appinstalled",()=>{b(t)})}function Na(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(e==="initiator")xr(t,"offerCandidates",n),Dr(t,"answerCandidates",n);else if(e==="joiner")xr(t,"answerCandidates",n),Dr(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function xr(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=Ed(te(ne,`rooms/${n}/${e}`));Gt(s,i.candidate.toJSON())}}}function Dr(t,e,n){const i=te(ne,`rooms/${n}/${e}`),s=r=>{const o=r.val();o&&t.remoteDescription&&t.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};ma(i,s),ys(i,"child_added",s)}let z=null,Mr=null;function Ns(){return!z||!(z instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",z),console.error("Call createLocalStream() before accessing local stream."),null):z}function Pf(t){z=t}const xf=async()=>{if(z&&z instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),z;const t=ws("user");return z=await navigator.mediaDevices.getUserMedia({video:t||Qd.default,audio:Ca.default}),z};async function Df(t){return z=await xf(),Mr=new MediaStream(z.getVideoTracks()),t.srcObject=Mr,!0}function Ra(t,e,n){return t.ontrack=i=>{if(!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;e.srcObject!==i.streams[0]&&(e.srcObject=i.streams[0],lf(e,n),W("Connected!"))},!0}const Mf=()=>{z&&(z.getTracks().forEach(t=>t.stop()),z=null)};function Aa(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!n||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(m=>{m.forEach(y=>{y.type==="attributes"&&y.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function l(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}n.addEventListener("click",l),Ud(i,()=>{b(i)},{ignore:[n],esc:!0});function c(){V(n)}function u(){b(n)}function h(m){const y=document.createElement("p");y.textContent=m,m.startsWith("You:")?y.style.textAlign="right":m.startsWith("Partner:")&&(y.style.textAlign="left"),s.appendChild(y),s.scrollTop=s.scrollHeight}function d(m){h(`Partner: ${m}`),Cs(i)&&f()}function f(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}r.addEventListener("submit",m=>{m.preventDefault();const y=o.value.trim();y&&(t(y),h(`You: ${y}`),o.value="")});function _(){a.disconnect(),n&&u(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:h,receiveMessage:d,toggleMessages:l,showMessagesToggle:c,hideMessagesToggle:u,cleanup:_}}let Or=!1;function Of(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--primary",l.textContent=e.buttonText,l.autofocus=!0;const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--secondary",c.textContent=e.cancelText,a.appendChild(l),a.appendChild(c),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:l,cancelButton:c,feedback:u}}function Lf(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};Ff();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=Of(t,n);Bf(i);let l=!1;const c=async()=>{await Uf(t,s)?(l=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",c),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),c())}),i.addEventListener("close",()=>{!l&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function Ff(){if(Or)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Or=!0}function Bf(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)",this.style.zIndex="1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function Uf(t,e){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){console.warn("Clipboard API failed, using fallback:",n)}try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}let T=null,ue=null,D=null,de=null,ke=null,Q,Wf=[],Pi=null;const Pa=()=>G.srcObject&&G.srcObject.getVideoTracks().some(t=>t.enabled);async function xa(){de=Math.random().toString(36).substring(2,15);try{const t=Ue();b(t)}catch{}try{return await Df(Pe),await Zd()&&V(br),cf({getLocalStream:Ns,getLocalVideo:()=>Pe,getRemoteVideo:()=>G,getPeerConnection:()=>T,setLocalStream:Pf,muteSelfBtn:zd,videoSelfBtn:qd,switchCameraSelfBtn:br,fullscreenSelfBtn:jd,mutePartnerBtn:qt,fullscreenPartnerBtn:Gd}),Af(Hd),kf(),Yf(),bn(),!0}catch(t){return console.error("Failed to get user media:",t),W("Error: Please allow camera and microphone access."),!1}}function Vf(){ue=T.createDataChannel("chat"),Q=Aa(e=>{ue.readyState==="open"&&ue.send(e)}),ue.onopen=()=>{Q.showMessagesToggle(),Q.appendChatMessage("💬 Chat connected")},ue.onmessage=e=>Q.receiveMessage(e.data)}function xi(){window.history.replaceState({},document.title,window.location.pathname)}let En=[];function Da(){if(!D||!de)return;const t=te(ne,`rooms/${D}/members`),e=te(ne,`rooms/${D}/members/${de}`);Gt(e,{joinedAt:Date.now()});const n=s=>{s.key!==de&&Rs()};ma(t,n),En.push({ref:t,type:"child_added",callback:n});const i=s=>{s.key!==de&&console.info("Partner has left the call"),Un()};bd(t,i),En.push({ref:t,type:"child_removed",callback:i})}const Ma={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};function Oa(t){t.onconnectionstatechange=()=>{t.connectionState==="connected"?(W("Connected!"),Rs()):t.connectionState==="disconnected"?(W("Partner disconnected"),bn(),xi()):t.connectionState==="failed"&&(W("Connection failed"),xi())}}async function Hf(){const t=Ns();if(!t)return W("Error: Camera not initialized"),!1;D=Math.random().toString(36).substring(2,15),ke="initiator",T=new RTCPeerConnection(Ma),Vf(),t.getTracks().forEach(o=>{T.addTrack(o,t)}),Ra(T,G,qt)&&(Na(T,ke,D),Oa(T),console.debug("Peer connection created as initiator with room ID:",D));const e=await T.createOffer();await T.setLocalDescription(e);const n=te(ne,`rooms/${D}`);await Gt(n,{offer:{type:e.type,sdp:e.sdp}});const i=te(ne,`rooms/${D}/answer`),s=async o=>{const a=o.val();if(a&&a.sdp!==Pi){if(Pi=a.sdp,T.signalingState!=="have-local-offer"&&T.signalingState!=="stable")return!0;try{return await T.setRemoteDescription(new RTCSessionDescription(a)),!0}catch(l){return console.error("Failed to set remote description:",l),!1}}};_a(i,s),ys(i,"value",s),Ta(D,ke,de),Da();const r=`${window.location.origin}${window.location.pathname}?room=${D}`;return va.value=r,ge.disabled=!0,ut.disabled=!1,Lf(r,{onCopy:()=>W("Link ready! Share with your partner."),onCancel:()=>{W('Call cancelled. Click "Start New Chat" to try again.'),Un()}}),W("Waiting for partner to join..."),!0}async function $f(){const t=Ns();if(!t)return W("Error: Camera not initialized"),!1;if(!D)return W("Error: No room ID"),!1;ke="joiner";const e=te(ne,`rooms/${D}`),n=await wd(e);if(!n.exists())return W("Error: Invalid room link"),!1;const s=n.val().offer;if(!s)return W("Error: No offer found"),!1;T=new RTCPeerConnection(Ma),T.ondatachannel=o=>{ue=o.channel,Q=Aa(a=>ue.send(a)),ue.onopen=()=>{Q.showMessagesToggle(),Q.appendChatMessage("💬 Chat connected")},ue.onmessage=a=>Q.receiveMessage(a.data)},t.getTracks().forEach(o=>{T.addTrack(o,t)}),Ra(T,G,qt)&&(Na(T,ke,D),Oa(T),console.debug("Peer connection created as joiner for room ID:",D)),await T.setRemoteDescription(new RTCSessionDescription(s));const r=await T.createAnswer();await T.setLocalDescription(r);try{await pa(e,{answer:{type:r.type,sdp:r.sdp}})}catch(o){return console.error("Failed to update answer in Firebase:",o),W("Failed to send answer to partner."),!1}return Ta(D,ke,de),Da(),Rs(),W("Connecting..."),!0}let St=null;function wn(){ks()||(Pa()?(Es(G),b(Pe),G.requestPictureInPicture().then(()=>{b(G)}).catch(t=>{console.error("Failed to enter Picture-in-Picture:",t)})):V(Pe),Lt.classList.remove("bottom"),Lt.classList.add("watch-mode"),Sa(!0))}function Zt(){ks()&&(V(Pe),Pa()&&(Wd(G),V(G),Vd(G)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)})),Lt.classList.remove("watch-mode"),Lt.classList.add("bottom"),Sa(!1))}let Rs=()=>{V(G),Es(Pe),ge.disabled=!0,qt.disabled=!1,ut.disabled=!1,St||(St=Kd(Lt,{inactivityMs:2500,hideOnEsc:!0}))},bn=()=>{b(G),Es(Pe),ge.disabled=!1,ut.disabled=!0,qt.disabled=!0,St&&(St(),St=null)};function ti(){return I&&!I.classList.contains("hidden")&&I.src&&I.src.trim()!==""}let Lr=!1;function Yf(){if(Lr)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",_t()),console.log("isYTVisible():",Zn()),console.log("isSharedVideoVisible():",ti()),console.log("isWatchModeActive():",ks()),_t()==="yt"?(console.log("Processing YouTube case"),Zn()?(console.log("Hiding YouTube player"),Ti(),Zt()):(console.log("Showing YouTube player"),wa(),wn())):_t()==="url"&&(console.log("Processing URL case"),ti()?(console.log("Hiding shared video"),b(I),Zt()):(console.log("Showing shared video"),V(I),wn()))),(e.key==="m"||e.key==="M")&&Q&&Q.toggleMessages()),e.key==="Escape"&&(_t()==="yt"&&Zn()?(Fn(),Ti(),Zt()):_t()==="url"&&ti()&&(I.pause(),b(I)))}),Lr=!0}ge.onclick=async()=>{await Hf()};ut.onclick=Un;async function Gf(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return W('Ready. Click "Start New Chat" to begin.'),!1;D=e,W("Connecting to room...");const n=await xa();let i=!1;return n&&(i=await $f()),i?!0:(V(ge),ut.disabled=!0,ge.disabled=!1,xi(),!1)}window.onload=async()=>{if(await Gf())return;if(!await xa()){ge.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}};window.addEventListener("beforeunload",t=>{if(T&&T.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;zf()});let ni=!1;async function Un(){if(!ni){if(ni=!0,console.debug("Hanging up..."),bn(),G.srcObject&&(G.srcObject.getTracks().forEach(t=>t.stop()),G.srcObject=null),uf(),T&&(T.close(),T=null),Bd(),D&&ke==="initiator"){const t=te(ne,`rooms/${D}`);wr(t).catch(e=>{console.warn("Failed to remove room:",e)})}if(bn(),V(ge),ut.disabled=!0,ge.disabled=!1,$d.style.display="none",En.forEach(({ref:t,type:e,callback:n})=>ga(t,e,n)),En.length=0,D&&de){const t=te(ne,`rooms/${D}/members/${de}`);wr(t).catch(()=>{})}document.pictureInPictureElement&&document.exitPictureInPicture().catch(t=>console.error(t)),Q&&Q.cleanup&&(Q.cleanup(),Q=null),D=null,ke=null,Pi=null,window.history.replaceState({},document.title,window.location.pathname),W('Disconnected. Click "Start New Chat" to begin.'),ni=!1}}function zf(){(T||D)&&Un(),va.value="",I.src="",Yd.textContent="",Mf(),Pe.srcObject=null,Zt(),_f("none"),bs(),Ea(!1),Nf(),Wf.forEach(t=>t())}
