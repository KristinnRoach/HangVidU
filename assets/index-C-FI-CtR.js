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
 */const Qa=()=>{};var $s={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qr={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(t,e){if(!t)throw _t(e)},_t=function(t){return new Error("Firebase Database ("+Qr.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xr=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Xa=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},zi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,d=r>>2,h=(r&3)<<4|a>>4;let u=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(u=64)),i.push(n[d],n[h],n[u],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Xr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Xa(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new Ja;const u=r<<2|a>>4;if(i.push(u),c!==64){const f=a<<4&240|c>>2;if(i.push(f),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Ja extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Jr=function(t){const e=Xr(t);return zi.encodeByteArray(e,!0)},cn=function(t){return Jr(t).replace(/\./g,"")},di=function(t){try{return zi.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(t){return Zr(void 0,t)}function Zr(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!el(n)||(t[n]=Zr(t[n],e[n]));return t}function el(t){return t!=="__proto__"}/**
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
 */function tl(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const nl=()=>tl().__FIREBASE_DEFAULTS__,il=()=>{if(typeof process>"u"||typeof $s>"u")return;const t=$s.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},sl=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&di(t[1]);return e&&JSON.parse(e)},eo=()=>{try{return Qa()||nl()||il()||sl()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},rl=t=>eo()?.emulatorHosts?.[t],ol=t=>{const e=rl(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},to=()=>eo()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function qi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function al(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function ll(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[cn(JSON.stringify(n)),cn(JSON.stringify(o)),""].join(".")}const It={};function cl(){const t={prod:[],emulator:[]};for(const e of Object.keys(It))It[e]?t.emulator.push(e):t.prod.push(e);return t}function ul(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ys=!1;function dl(t,e){if(typeof window>"u"||typeof document>"u"||!qi(window.location.host)||It[t]===e||It[t]||Ys)return;It[t]=e;function n(u){return`__firebase__banner__${u}`}const i="__firebase__banner",r=cl().prod.length>0;function o(){const u=document.getElementById(i);u&&u.remove()}function a(u){u.style.display="flex",u.style.background="#7faaf0",u.style.position="fixed",u.style.bottom="5px",u.style.left="5px",u.style.padding=".5em",u.style.borderRadius="5px",u.style.alignItems="center"}function l(u,f){u.setAttribute("width","24"),u.setAttribute("id",f),u.setAttribute("height","24"),u.setAttribute("viewBox","0 0 24 24"),u.setAttribute("fill","none"),u.style.marginLeft="-6px"}function c(){const u=document.createElement("span");return u.style.cursor="pointer",u.style.marginLeft="16px",u.style.fontSize="24px",u.innerHTML=" &times;",u.onclick=()=>{Ys=!0,o()},u}function d(u,f){u.setAttribute("id",f),u.innerText="Learn more",u.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",u.setAttribute("target","__blank"),u.style.paddingLeft="5px",u.style.textDecoration="underline"}function h(){const u=ul(i),f=n("text"),_=document.getElementById(f)||document.createElement("span"),g=n("learnmore"),y=document.getElementById(g)||document.createElement("a"),Z=n("preprendIcon"),fe=document.getElementById(Z)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(u.created){const Le=u.element;a(Le),d(y,g);const zn=c();l(fe,Z),Le.append(fe,_,y,zn),document.body.appendChild(Le)}r?(_.innerText="Preview backend disconnected.",fe.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(fe.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function hl(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function no(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(hl())}function fl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function pl(){return Qr.NODE_ADMIN===!0}function _l(){try{return typeof indexedDB=="object"}catch{return!1}}function ml(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl="FirebaseError";class Yt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=gl,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,io.prototype.create)}}class io{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?yl(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Yt(s,a,i)}}function yl(t,e){return t.replace(vl,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const vl=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(t){return JSON.parse(t)}function W(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Dt(di(r[0])||""),n=Dt(di(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Cl=function(t){const e=so(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},El=function(t){const e=so(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function at(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Gs(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function un(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function dn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(zs(r)&&zs(o)){if(!dn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function zs(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wl(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const u=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(u<<1|u>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):h<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const u=(s<<5|s>>>27)+c+l+d+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=u}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function An(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Pn=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function Qe(t){return t&&t._delegate?t._delegate:t}class Mt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Be="[DEFAULT]";/**
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
 */class Sl{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new $t;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(kl(e))try{this.getOrInitializeService({instanceIdentifier:Be})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Be){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Be){return this.instances.has(e)}getOptions(e=Be){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Tl(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Be){return this.component?this.component.multipleInstances?e:Be:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tl(t){return t===Be?void 0:t}function kl(t){return t.instantiationMode==="EAGER"}/**
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
 */class Nl{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Sl(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(k||(k={}));const Rl={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Al=k.INFO,Pl={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},xl=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Pl[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ro{constructor(e){this.name=e,this._logLevel=Al,this._logHandler=xl,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Rl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}}const Dl=(t,e)=>e.some(n=>t instanceof n);let qs,js;function Ml(){return qs||(qs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ll(){return js||(js=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const oo=new WeakMap,hi=new WeakMap,ao=new WeakMap,qn=new WeakMap,ji=new WeakMap;function Ol(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(ke(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&oo.set(n,t)}).catch(()=>{}),ji.set(e,t),e}function Fl(t){if(hi.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});hi.set(t,e)}let fi={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return hi.get(t);if(e==="objectStoreNames")return t.objectStoreNames||ao.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return ke(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bl(t){fi=t(fi)}function Wl(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(jn(this),e,...n);return ao.set(i,e.sort?e.sort():[e]),ke(i)}:Ll().includes(t)?function(...e){return t.apply(jn(this),e),ke(oo.get(this))}:function(...e){return ke(t.apply(jn(this),e))}}function Ul(t){return typeof t=="function"?Wl(t):(t instanceof IDBTransaction&&Fl(t),Dl(t,Ml())?new Proxy(t,fi):t)}function ke(t){if(t instanceof IDBRequest)return Ol(t);if(qn.has(t))return qn.get(t);const e=Ul(t);return e!==t&&(qn.set(t,e),ji.set(e,t)),e}const jn=t=>ji.get(t);function Hl(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=ke(o);return i&&o.addEventListener("upgradeneeded",l=>{i(ke(o.result),l.oldVersion,l.newVersion,ke(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Vl=["get","getKey","getAll","getAllKeys","count"],$l=["put","add","delete","clear"],Kn=new Map;function Ks(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Kn.get(e))return Kn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=$l.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Vl.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return Kn.set(e,r),r}Bl(t=>({...t,get:(e,n,i)=>Ks(e,n)||t.get(e,n,i),has:(e,n)=>!!Ks(e,n)||t.has(e,n)}));/**
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
 */class Yl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Gl(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function Gl(t){return t.getComponent()?.type==="VERSION"}const pi="@firebase/app",Qs="0.14.4";/**
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
 */const Ce=new ro("@firebase/app"),zl="@firebase/app-compat",ql="@firebase/analytics-compat",jl="@firebase/analytics",Kl="@firebase/app-check-compat",Ql="@firebase/app-check",Xl="@firebase/auth",Jl="@firebase/auth-compat",Zl="@firebase/database",ec="@firebase/data-connect",tc="@firebase/database-compat",nc="@firebase/functions",ic="@firebase/functions-compat",sc="@firebase/installations",rc="@firebase/installations-compat",oc="@firebase/messaging",ac="@firebase/messaging-compat",lc="@firebase/performance",cc="@firebase/performance-compat",uc="@firebase/remote-config",dc="@firebase/remote-config-compat",hc="@firebase/storage",fc="@firebase/storage-compat",pc="@firebase/firestore",_c="@firebase/ai",mc="@firebase/firestore-compat",gc="firebase",yc="12.4.0";/**
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
 */const _i="[DEFAULT]",vc={[pi]:"fire-core",[zl]:"fire-core-compat",[jl]:"fire-analytics",[ql]:"fire-analytics-compat",[Ql]:"fire-app-check",[Kl]:"fire-app-check-compat",[Xl]:"fire-auth",[Jl]:"fire-auth-compat",[Zl]:"fire-rtdb",[ec]:"fire-data-connect",[tc]:"fire-rtdb-compat",[nc]:"fire-fn",[ic]:"fire-fn-compat",[sc]:"fire-iid",[rc]:"fire-iid-compat",[oc]:"fire-fcm",[ac]:"fire-fcm-compat",[lc]:"fire-perf",[cc]:"fire-perf-compat",[uc]:"fire-rc",[dc]:"fire-rc-compat",[hc]:"fire-gcs",[fc]:"fire-gcs-compat",[pc]:"fire-fst",[mc]:"fire-fst-compat",[_c]:"fire-vertex","fire-js":"fire-js",[gc]:"fire-js-all"};/**
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
 */const hn=new Map,Cc=new Map,mi=new Map;function Xs(t,e){try{t.container.addComponent(e)}catch(n){Ce.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function fn(t){const e=t.name;if(mi.has(e))return Ce.debug(`There were multiple attempts to register component ${e}.`),!1;mi.set(e,t);for(const n of hn.values())Xs(n,t);for(const n of Cc.values())Xs(n,t);return!0}function Ec(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function wc(t){return t==null?!1:t.settings!==void 0}/**
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
 */const bc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ne=new io("app","Firebase",bc);/**
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
 */class Ic{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Mt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ne.create("app-deleted",{appName:this._name})}}/**
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
 */const Sc=yc;function lo(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:_i,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Ne.create("bad-app-name",{appName:String(s)});if(n||(n=to()),!n)throw Ne.create("no-options");const r=hn.get(s);if(r){if(dn(n,r.options)&&dn(i,r.config))return r;throw Ne.create("duplicate-app",{appName:s})}const o=new Nl(s);for(const l of mi.values())o.addComponent(l);const a=new Ic(n,i,o);return hn.set(s,a),a}function Tc(t=_i){const e=hn.get(t);if(!e&&t===_i&&to())return lo();if(!e)throw Ne.create("no-app",{appName:t});return e}function it(t,e,n){let i=vc[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ce.warn(o.join(" "));return}fn(new Mt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const kc="firebase-heartbeat-database",Nc=1,Lt="firebase-heartbeat-store";let Qn=null;function co(){return Qn||(Qn=Hl(kc,Nc,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Lt)}catch(n){console.warn(n)}}}}).catch(t=>{throw Ne.create("idb-open",{originalErrorMessage:t.message})})),Qn}async function Rc(t){try{const n=(await co()).transaction(Lt),i=await n.objectStore(Lt).get(uo(t));return await n.done,i}catch(e){if(e instanceof Yt)Ce.warn(e.message);else{const n=Ne.create("idb-get",{originalErrorMessage:e?.message});Ce.warn(n.message)}}}async function Js(t,e){try{const i=(await co()).transaction(Lt,"readwrite");await i.objectStore(Lt).put(e,uo(t)),await i.done}catch(n){if(n instanceof Yt)Ce.warn(n.message);else{const i=Ne.create("idb-set",{originalErrorMessage:n?.message});Ce.warn(i.message)}}}function uo(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Ac=1024,Pc=30;class xc{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Mc(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Zs();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>Pc){const s=Lc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ce.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Zs(),{heartbeatsToSend:n,unsentEntries:i}=Dc(this._heartbeatsCache.heartbeats),s=cn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ce.warn(e),""}}}function Zs(){return new Date().toISOString().substring(0,10)}function Dc(t,e=Ac){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),er(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),er(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Mc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _l()?ml().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Rc(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Js(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Js(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function er(t){return cn(JSON.stringify({version:2,heartbeats:t})).length}function Lc(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function Oc(t){fn(new Mt("platform-logger",e=>new Yl(e),"PRIVATE")),fn(new Mt("heartbeat",e=>new xc(e),"PRIVATE")),it(pi,Qs,t),it(pi,Qs,"esm2020"),it("fire-js","")}Oc("");var tr={};const nr="@firebase/database",ir="1.1.0";/**
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
 */let ho="";function Fc(t){ho=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bc{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),W(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Dt(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return de(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Bc(e)}}catch{}return new Wc},He=fo("localStorage"),Uc=fo("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=new ro("@firebase/database"),Hc=(function(){let t=1;return function(){return t++}})(),po=function(t){const e=Il(t),n=new bl;n.update(e);const i=n.digest();return zi.encodeByteArray(i)},Gt=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Gt.apply(null,i):typeof i=="object"?e+=W(i):e+=i,e+=" "}return e};let St=null,sr=!0;const Vc=function(t,e){p(!0,"Can't turn on custom loggers persistently."),st.logLevel=k.VERBOSE,St=st.log.bind(st)},$=function(...t){if(sr===!0&&(sr=!1,St===null&&Uc.get("logging_enabled")===!0&&Vc()),St){const e=Gt.apply(null,t);St(e)}},zt=function(t){return function(...e){$(t,...e)}},gi=function(...t){const e="FIREBASE INTERNAL ERROR: "+Gt(...t);st.error(e)},Ee=function(...t){const e=`FIREBASE FATAL ERROR: ${Gt(...t)}`;throw st.error(e),new Error(e)},j=function(...t){const e="FIREBASE WARNING: "+Gt(...t);st.warn(e)},$c=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&j("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ki=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},Yc=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},lt="[MIN_NAME]",ze="[MAX_NAME]",Xe=function(t,e){if(t===e)return 0;if(t===lt||e===ze)return-1;if(e===lt||t===ze)return 1;{const n=rr(t),i=rr(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},Gc=function(t,e){return t===e?0:t<e?-1:1},vt=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+W(e))},Qi=function(t){if(typeof t!="object"||t===null)return W(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=W(e[i]),n+=":",n+=Qi(t[e[i]]);return n+="}",n},_o=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function Y(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const mo=function(t){p(!Ki(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let h="";for(l=0;l<64;l+=8){let u=parseInt(d.substr(l,8),2).toString(16);u.length===1&&(u="0"+u),h=h+u}return h.toLowerCase()},zc=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},qc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function jc(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const Kc=new RegExp("^-?(0*)\\d{1,10}$"),Qc=-2147483648,Xc=2147483647,rr=function(t){if(Kc.test(t)){const e=Number(t);if(e>=Qc&&e<=Xc)return e}return null},mt=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw j("Exception was thrown by user callback.",n),e},Math.floor(0))}},Jc=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Tt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class Zc{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,wc(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){j(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?($("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',j(e)}}class on{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}on.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi="5",go="v",yo="s",vo="r",Co="f",Eo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wo="ls",bo="p",yi="ac",Io="websocket",So="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=He.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&He.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function tu(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function ko(t,e,n){p(typeof e=="string","typeof type must == string"),p(typeof n=="object","typeof params must == object");let i;if(e===Io)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===So)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);tu(t)&&(n.ns=t.namespace);const s=[];return Y(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(){this.counters_={}}incrementCounter(e,n=1){de(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return Za(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn={},Jn={};function Ji(t){const e=t.toString();return Xn[e]||(Xn[e]=new nu),Xn[e]}function iu(t,e){const n=t.toString();return Jn[n]||(Jn[n]=e()),Jn[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&mt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or="start",ru="close",ou="pLPCommand",au="pRTLPCB",No="id",Ro="pw",Ao="ser",lu="cb",cu="seg",uu="ts",du="d",hu="dframe",Po=1870,xo=30,fu=Po-xo,pu=25e3,_u=3e4;class et{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=zt(e),this.stats_=Ji(n),this.urlFn=l=>(this.appCheckToken&&(l[yi]=this.appCheckToken),ko(n,So,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new su(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(_u)),Yc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Zi((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===or)this.id=a,this.password=l;else if(o===ru)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[or]="t",i[Ao]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[lu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[go]=Xi,this.transportSessionId&&(i[yo]=this.transportSessionId),this.lastSessionId&&(i[wo]=this.lastSessionId),this.applicationId&&(i[bo]=this.applicationId),this.appCheckToken&&(i[yi]=this.appCheckToken),typeof location<"u"&&location.hostname&&Eo.test(location.hostname)&&(i[vo]=Co);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){et.forceAllow_=!0}static forceDisallow(){et.forceDisallow_=!0}static isAvailable(){return et.forceAllow_?!0:!et.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!zc()&&!qc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=W(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Jr(n),s=_o(i,fu);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[hu]="t",i[No]=e,i[Ro]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=W(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Zi{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Hc(),window[ou+this.uniqueCallbackIdentifier]=e,window[au+this.uniqueCallbackIdentifier]=n,this.myIFrame=Zi.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){$("frame writing exception"),a.stack&&$(a.stack),$(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||$("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[No]=this.myID,e[Ro]=this.myPW,e[Ao]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+xo+i.length<=Po;){const o=this.pendingSegs.shift();i=i+"&"+cu+s+"="+o.seg+"&"+uu+s+"="+o.ts+"&"+du+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(pu)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{$("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu=16384,gu=45e3;let pn=null;typeof MozWebSocket<"u"?pn=MozWebSocket:typeof WebSocket<"u"&&(pn=WebSocket);class re{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=zt(this.connId),this.stats_=Ji(n),this.connURL=re.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[go]=Xi,typeof location<"u"&&location.hostname&&Eo.test(location.hostname)&&(o[vo]=Co),n&&(o[yo]=n),i&&(o[wo]=i),s&&(o[yi]=s),r&&(o[bo]=r),ko(e,Io,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,He.set("previous_websocket_failure",!0);try{let i;pl(),this.mySock=new pn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){re.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&pn!==null&&!re.forceDisallow_}static previouslyFailed(){return He.isInMemoryStorage||He.get("previous_websocket_failure")===!0}markConnectionHealthy(){He.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Dt(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=W(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=_o(n,mu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(gu))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}re.responsesRequiredToBeHealthy=2;re.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot{static get ALL_TRANSPORTS(){return[et,re]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=re&&re.isAvailable();let i=n&&!re.previouslyFailed();if(e.webSocketOnly&&(n||j("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[re];else{const s=this.transports_=[];for(const r of Ot.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Ot.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ot.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu=6e4,vu=5e3,Cu=10*1024,Eu=100*1024,Zn="t",ar="d",wu="s",lr="r",bu="e",cr="o",ur="a",dr="n",hr="p",Iu="h";class Su{constructor(e,n,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=zt("c:"+this.id+":"),this.transportManager_=new Ot(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Tt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Eu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Cu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Zn in e){const n=e[Zn];n===ur?this.upgradeIfSecondaryHealthy_():n===lr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===cr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=vt("t",e),i=vt("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:hr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ur,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:dr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=vt("t",e),i=vt("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=vt(Zn,e);if(ar in e){const i=e[ar];if(n===Iu){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===dr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===wu?this.onConnectionShutdown_(i):n===lr?this.onReset_(i):n===bu?gi("Server Error: "+i):n===cr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):gi("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Xi!==i&&j("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),Tt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(yu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Tt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(vu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:hr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(He.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Do{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n extends Mo{static getInstance(){return new _n}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!no()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=32,pr=768;class I{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function b(){return new I("")}function C(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function xe(t){return t.pieces_.length-t.pieceNum_}function R(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new I(t.pieces_,e)}function es(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Tu(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ft(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Lo(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new I(e,0)}function M(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new I(n,0)}function w(t){return t.pieceNum_>=t.pieces_.length}function q(t,e){const n=C(t),i=C(e);if(n===null)return e;if(n===i)return q(R(t),R(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ku(t,e){const n=Ft(t,0),i=Ft(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Xe(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function ts(t,e){if(xe(t)!==xe(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function ee(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(xe(t)>xe(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class Nu{constructor(e,n){this.errorPrefix_=n,this.parts_=Ft(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Pn(this.parts_[i]);Oo(this)}}function Ru(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Pn(e),Oo(t)}function Au(t){const e=t.parts_.pop();t.byteLength_-=Pn(e),t.parts_.length>0&&(t.byteLength_-=1)}function Oo(t){if(t.byteLength_>pr)throw new Error(t.errorPrefix_+"has a key path longer than "+pr+" bytes ("+t.byteLength_+").");if(t.parts_.length>fr)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+fr+") or object contains a cycle "+We(t))}function We(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns extends Mo{static getInstance(){return new ns}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=1e3,Pu=300*1e3,_r=30*1e3,xu=1.3,Du=3e4,Mu="server_kill",mr=3;class ge extends Do{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ge.nextPersistentConnectionId_++,this.log_=zt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ct,this.maxReconnectDelay_=Pu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ns.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&_n.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(W(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new $t,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ge.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&de(e,"w")){const i=at(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();j(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||El(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=_r)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Cl(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+W(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):gi("Unrecognized action received from server: "+W(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Du&&(this.reconnectDelay_=Ct),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*xu)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ge.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,u]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?$("getToken() completed but was canceled"):($("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=u&&u.token,a=new Su(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{j(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Mu)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&j(h),l())}}}interrupt(e){$("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){$("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Gs(this.interruptReasons_)&&(this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Qi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){$("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=mr&&(this.reconnectDelay_=_r,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){$("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=mr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+ho.replace(/\./g,"-")]=1,no()?e["framework.cordova"]=1:fl()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=_n.getInstance().currentlyOnline();return Gs(this.interruptReasons_)&&e}}ge.nextPersistentConnectionId_=0;ge.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class xn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new E(lt,e),s=new E(lt,n);return this.compare(i,s)!==0}minPost(){return E.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;class Fo extends xn{static get __EMPTY_NODE(){return nn}static set __EMPTY_NODE(e){nn=e}compare(e,n){return Xe(e.name,n.name)}isDefinedOn(e){throw _t("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return E.MIN}maxPost(){return new E(ze,nn)}makePost(e,n){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new E(e,nn)}toString(){return".key"}}const rt=new Fo;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class H{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??H.RED,this.left=s??Q.EMPTY_NODE,this.right=r??Q.EMPTY_NODE}copy(e,n,i,s,r){return new H(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return Q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,H.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,H.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}H.RED=!0;H.BLACK=!1;class Lu{copy(e,n,i,s,r){return this}insert(e,n,i){return new H(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Q{constructor(e,n=Q.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Q(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,H.BLACK,null,null))}remove(e){return new Q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,H.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new sn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new sn(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new sn(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new sn(this.root_,null,this.comparator_,!0,e)}}Q.EMPTY_NODE=new Lu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(t,e){return Xe(t.name,e.name)}function is(t,e){return Xe(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi;function Fu(t){vi=t}const Bo=function(t){return typeof t=="number"?"number:"+mo(t):"string:"+t},Wo=function(t){if(t.isLeafNode()){const e=t.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&de(e,".sv"),"Priority must be a string or number.")}else p(t===vi||t.isEmpty(),"priority of unexpected type.");p(t===vi||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gr;class U{static set __childrenNodeConstructor(e){gr=e}static get __childrenNodeConstructor(){return gr}constructor(e,n=U.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Wo(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new U(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:U.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return w(e)?this:C(e)===".priority"?this.priorityNode_:U.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:U.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=C(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||xe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,U.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Bo(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=mo(this.value_):e+=this.value_,this.lazyHash_=po(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===U.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof U.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=U.VALUE_TYPE_ORDER.indexOf(n),r=U.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+n),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}U.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uo,Ho;function Bu(t){Uo=t}function Wu(t){Ho=t}class Uu extends xn{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Xe(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return E.MIN}maxPost(){return new E(ze,new U("[PRIORITY-POST]",Ho))}makePost(e,n){const i=Uo(e);return new E(n,new U("[PRIORITY-POST]",i))}toString(){return".priority"}}const L=new Uu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu=Math.log(2);class Vu{constructor(e){const n=r=>parseInt(Math.log(r)/Hu,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const mn=function(t,e,n,i){t.sort(e);const s=function(l,c){const d=c-l;let h,u;if(d===0)return null;if(d===1)return h=t[l],u=n?n(h):h,new H(u,h.node,H.BLACK,null,null);{const f=parseInt(d/2,10)+l,_=s(l,f),g=s(f+1,c);return h=t[f],u=n?n(h):h,new H(u,h.node,H.BLACK,_,g)}},r=function(l){let c=null,d=null,h=t.length;const u=function(_,g){const y=h-_,Z=h;h-=_;const fe=s(y+1,Z),Le=t[y],zn=n?n(Le):Le;f(new H(zn,Le.node,g,null,fe))},f=function(_){c?(c.left=_,c=_):(d=_,c=_)};for(let _=0;_<l.count;++_){const g=l.nextBitIsOne(),y=Math.pow(2,l.count-(_+1));g?u(y,H.BLACK):(u(y,H.BLACK),u(y,H.RED))}return d},o=new Vu(t.length),a=r(o);return new Q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei;const Ze={};class _e{static get Default(){return p(Ze&&L,"ChildrenNode.ts has not been loaded"),ei=ei||new _e({".priority":Ze},{".priority":L}),ei}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=at(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Q?n:null}hasIndex(e){return de(this.indexSet_,e.toString())}addIndex(e,n){p(e!==rt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(E.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=mn(i,e.getCompare()):a=Ze;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new _e(d,c)}addToIndexes(e,n){const i=un(this.indexes_,(s,r)=>{const o=at(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Ze)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(E.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),mn(a,o.getCompare())}else return Ze;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new E(e.name,a))),l.insert(e,e.node)}});return new _e(i,this.indexSet_)}removeFromIndexes(e,n){const i=un(this.indexes_,s=>{if(s===Ze)return s;{const r=n.get(e.name);return r?s.remove(new E(e.name,r)):s}});return new _e(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Et;class m{static get EMPTY_NODE(){return Et||(Et=new m(new Q(is),null,_e.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Wo(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Et}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Et:n}}getChild(e){const n=C(e);return n===null?this:this.getImmediateChild(n).getChild(R(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(p(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new E(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Et:this.priorityNode_;return new m(s,o,r)}}updateChild(e,n){const i=C(e);if(i===null)return n;{p(C(e)!==".priority"||xe(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(R(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(L,(o,a)=>{n[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Bo(this.getPriority().val())+":"),this.forEachChild(L,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":po(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new E(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new E(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new E(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,E.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===qt?-1:0}withIndex(e){if(e===rt||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===rt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(L),s=n.getIterator(L);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===rt?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class $u extends m{constructor(){super(new Q(is),m.EMPTY_NODE,_e.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const qt=new $u;Object.defineProperties(E,{MIN:{value:new E(lt,m.EMPTY_NODE)},MAX:{value:new E(ze,qt)}});Fo.__EMPTY_NODE=m.EMPTY_NODE;U.__childrenNodeConstructor=m;Fu(qt);Wu(qt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu=!0;function B(t,e=null){if(t===null)return m.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new U(n,B(e))}if(!(t instanceof Array)&&Yu){const n=[];let i=!1;if(Y(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=B(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new E(o,l)))}}),n.length===0)return m.EMPTY_NODE;const r=mn(n,Ou,o=>o.name,is);if(i){const o=mn(n,L.getCompare());return new m(r,B(e),new _e({".priority":o},{".priority":L}))}else return new m(r,B(e),_e.Default)}else{let n=m.EMPTY_NODE;return Y(t,(i,s)=>{if(de(t,i)&&i.substring(0,1)!=="."){const r=B(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(B(e))}}Bu(B);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu extends xn{constructor(e){super(),this.indexPath_=e,p(!w(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Xe(e.name,n.name):r}makePost(e,n){const i=B(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new E(n,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,qt);return new E(ze,e)}toString(){return Ft(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu extends xn{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Xe(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return E.MIN}maxPost(){return E.MAX}makePost(e,n){const i=B(e);return new E(n,i)}toString(){return".value"}}const qu=new zu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(t){return{type:"value",snapshotNode:t}}function ct(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Bt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Wt(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function ju(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Bt(n,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ct(n,i)):o.trackChildChange(Wt(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(L,(s,r)=>{n.hasChild(s)||i.trackChildChange(Bt(s,r))}),n.isLeafNode()||n.forEachChild(L,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Wt(s,r,o))}else i.trackChildChange(ct(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this.indexedFilter_=new ss(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ut.getStartPost_(e),this.endPost_=Ut.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new E(n,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=m.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return n.forEachChild(L,(o,a)=>{r.matches(new E(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ut(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new E(n,i))||(i=m.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(u,f)=>h(f,u)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new E(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let u=s.getChildAfterChild(this.index_,c,this.reverse_);for(;u!=null&&(u.name===n||a.hasChild(u.name));)u=s.getChildAfterChild(this.index_,u,this.reverse_);const f=u==null?1:o(u,l);if(d&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Wt(n,i,h)),a.updateImmediateChild(n,i);{r?.trackChildChange(Bt(n,h));const g=a.updateImmediateChild(n,m.EMPTY_NODE);return u!=null&&this.rangedFilter_.matches(u)?(r?.trackChildChange(ct(u.name,u.node)),g.updateImmediateChild(u.name,u.node)):g}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Bt(c.name,c.node)),r.trackChildChange(ct(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=L}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:lt}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ze}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===L}copy(){const e=new rs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Qu(t){return t.loadsAllData()?new ss(t.getIndex()):t.hasLimit()?new Ku(t):new Ut(t)}function yr(t){const e={};if(t.isDefault())return e;let n;if(t.index_===L?n="$priority":t.index_===qu?n="$value":t.index_===rt?n="$key":(p(t.index_ instanceof Gu,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=W(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=W(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+W(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=W(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+W(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function vr(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==L&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn extends Do{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=zt("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=gn.getListenId_(e,i),a={};this.listens_[o]=a;const l=yr(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let h=d;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),at(this.listens_,o)===a){let u;c?c===401?u="permission_denied":u="rest_error:"+c:u="ok",s(u,null)}})}unlisten(e,n){const i=gn.getListenId_(e,n);delete this.listens_[i]}get(e){const n=yr(e._queryParams),i=e._path.toString(),s=new $t;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+wl(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Dt(a.responseText)}catch{j("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&j("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(){return{value:null,children:new Map}}function $o(t,e,n){if(w(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=C(e);t.children.has(i)||t.children.set(i,yn());const s=t.children.get(i);e=R(e),$o(s,e,n)}}function Ci(t,e,n){t.value!==null?n(e,t.value):Ju(t,(i,s)=>{const r=new I(e.toString()+"/"+i);Ci(s,r,n)})}function Ju(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Y(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cr=10*1e3,ed=30*1e3,td=300*1e3;class nd{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Zu(e);const i=Cr+(ed-Cr)*Math.random();Tt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;Y(e,(s,r)=>{r>0&&de(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),Tt(this.reportStats_.bind(this),Math.floor(Math.random()*2*td))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var oe;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(oe||(oe={}));function os(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function as(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ls(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=oe.ACK_USER_WRITE,this.source=os()}operationForChild(e){if(w(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new I(e));return new vn(b(),n,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new vn(R(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,n){this.source=e,this.path=n,this.type=oe.LISTEN_COMPLETE}operationForChild(e){return w(this.path)?new Ht(this.source,b()):new Ht(this.source,R(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=oe.OVERWRITE}operationForChild(e){return w(this.path)?new qe(this.source,b(),this.snap.getImmediateChild(e)):new qe(this.source,R(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=oe.MERGE}operationForChild(e){if(w(this.path)){const n=this.children.subtree(new I(e));return n.isEmpty()?null:n.value?new qe(this.source,b(),n.value):new ut(this.source,b(),n)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ut(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(w(e))return this.isFullyInitialized()&&!this.filtered_;const n=C(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class id{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function sd(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(ju(o.childName,o.snapshotNode))}),wt(t,s,"child_removed",e,i,n),wt(t,s,"child_added",e,i,n),wt(t,s,"child_moved",r,i,n),wt(t,s,"child_changed",e,i,n),wt(t,s,"value",e,i,n),s}function wt(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>od(t,a,l)),o.forEach(a=>{const l=rd(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function rd(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function od(t,e,n){if(e.childName==null||n.childName==null)throw _t("Should only compare child_ events.");const i=new E(e.childName,e.snapshotNode),s=new E(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(t,e){return{eventCache:t,serverCache:e}}function kt(t,e,n,i){return Dn(new De(e,n,i),t.serverCache)}function Yo(t,e,n,i){return Dn(t.eventCache,new De(e,n,i))}function Cn(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function je(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ti;const ad=()=>(ti||(ti=new Q(Gc)),ti);class T{static fromObject(e){let n=new T(null);return Y(e,(i,s)=>{n=n.set(new I(i),s)}),n}constructor(e,n=ad()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:b(),value:this.value};if(w(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(R(e),n);return r!=null?{path:M(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(w(e))return this;{const n=C(e),i=this.children.get(n);return i!==null?i.subtree(R(e)):new T(null)}}set(e,n){if(w(e))return new T(n,this.children);{const i=C(e),r=(this.children.get(i)||new T(null)).set(R(e),n),o=this.children.insert(i,r);return new T(this.value,o)}}remove(e){if(w(e))return this.children.isEmpty()?new T(null):new T(null,this.children);{const n=C(e),i=this.children.get(n);if(i){const s=i.remove(R(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new T(null):new T(this.value,r)}else return this}}get(e){if(w(e))return this.value;{const n=C(e),i=this.children.get(n);return i?i.get(R(e)):null}}setTree(e,n){if(w(e))return n;{const i=C(e),r=(this.children.get(i)||new T(null)).setTree(R(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new T(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(M(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,b(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(w(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(R(e),M(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,b(),n)}foreachOnPath_(e,n,i){if(w(e))return this;{this.value&&i(n,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(R(e),M(n,s),i):new T(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(M(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(e){this.writeTree_=e}static empty(){return new le(new T(null))}}function Nt(t,e,n){if(w(e))return new le(new T(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=q(s,e);return r=r.updateChild(o,n),new le(t.writeTree_.set(s,r))}else{const s=new T(n),r=t.writeTree_.setTree(e,s);return new le(r)}}}function Ei(t,e,n){let i=t;return Y(n,(s,r)=>{i=Nt(i,M(e,s),r)}),i}function Er(t,e){if(w(e))return le.empty();{const n=t.writeTree_.setTree(e,new T(null));return new le(n)}}function wi(t,e){return Je(t,e)!=null}function Je(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(q(n.path,e)):null}function wr(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(L,(i,s)=>{e.push(new E(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new E(i,s.value))}),e}function Re(t,e){if(w(e))return t;{const n=Je(t,e);return n!=null?new le(new T(n)):new le(t.writeTree_.subtree(e))}}function bi(t){return t.writeTree_.isEmpty()}function dt(t,e){return Go(b(),t.writeTree_,e)}function Go(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Go(M(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(M(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mn(t,e){return Ko(e,t)}function ld(t,e,n,i,s){p(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Nt(t.visibleWrites,e,n)),t.lastWriteId=i}function cd(t,e,n,i){p(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=Ei(t.visibleWrites,e,n),t.lastWriteId=i}function ud(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function dd(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);p(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&hd(a,i.path)?s=!1:ee(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return fd(t),!0;if(i.snap)t.visibleWrites=Er(t.visibleWrites,i.path);else{const a=i.children;Y(a,l=>{t.visibleWrites=Er(t.visibleWrites,M(i.path,l))})}return!0}else return!1}function hd(t,e){if(t.snap)return ee(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&ee(M(t.path,n),e))return!0;return!1}function fd(t){t.visibleWrites=zo(t.allWrites,pd,b()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function pd(t){return t.visible}function zo(t,e,n){let i=le.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)ee(n,o)?(a=q(n,o),i=Nt(i,a,r.snap)):ee(o,n)&&(a=q(o,n),i=Nt(i,b(),r.snap.getChild(a)));else if(r.children){if(ee(n,o))a=q(n,o),i=Ei(i,a,r.children);else if(ee(o,n))if(a=q(o,n),w(a))i=Ei(i,b(),r.children);else{const l=at(r.children,C(a));if(l){const c=l.getChild(R(a));i=Nt(i,b(),c)}}}else throw _t("WriteRecord should have .snap or .children")}}return i}function qo(t,e,n,i,s){if(!i&&!s){const r=Je(t.visibleWrites,e);if(r!=null)return r;{const o=Re(t.visibleWrites,e);if(bi(o))return n;if(n==null&&!wi(o,b()))return null;{const a=n||m.EMPTY_NODE;return dt(o,a)}}}else{const r=Re(t.visibleWrites,e);if(!s&&bi(r))return n;if(!s&&n==null&&!wi(r,b()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(ee(c.path,e)||ee(e,c.path))},a=zo(t.allWrites,o,e),l=n||m.EMPTY_NODE;return dt(a,l)}}}function _d(t,e,n){let i=m.EMPTY_NODE;const s=Je(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(L,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=Re(t.visibleWrites,e);return n.forEachChild(L,(o,a)=>{const l=dt(Re(r,new I(o)),a);i=i.updateImmediateChild(o,l)}),wr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Re(t.visibleWrites,e);return wr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function md(t,e,n,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,n);if(wi(t.visibleWrites,r))return null;{const o=Re(t.visibleWrites,r);return bi(o)?s.getChild(n):dt(o,s.getChild(n))}}function gd(t,e,n,i){const s=M(e,n),r=Je(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=Re(t.visibleWrites,s);return dt(o,i.getNode().getImmediateChild(n))}else return null}function yd(t,e){return Je(t.visibleWrites,e)}function vd(t,e,n,i,s,r,o){let a;const l=Re(t.visibleWrites,e),c=Je(l,b());if(c!=null)a=c;else if(n!=null)a=dt(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],h=o.getCompare(),u=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=u.getNext();for(;f&&d.length<s;)h(f,i)!==0&&d.push(f),f=u.getNext();return d}else return[]}function Cd(){return{visibleWrites:le.empty(),allWrites:[],lastWriteId:-1}}function En(t,e,n,i){return qo(t.writeTree,t.treePath,e,n,i)}function cs(t,e){return _d(t.writeTree,t.treePath,e)}function br(t,e,n,i){return md(t.writeTree,t.treePath,e,n,i)}function wn(t,e){return yd(t.writeTree,M(t.treePath,e))}function Ed(t,e,n,i,s,r){return vd(t.writeTree,t.treePath,e,n,i,s,r)}function us(t,e,n){return gd(t.writeTree,t.treePath,e,n)}function jo(t,e){return Ko(M(t.treePath,e),t.writeTree)}function Ko(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wd{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;p(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Wt(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Bt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,ct(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Wt(i,e.snapshotNode,s.oldSnap));else throw _t("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Qo=new bd;class ds{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new De(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return us(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:je(this.viewCache_),r=Ed(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(t){return{filter:t}}function Sd(t,e){p(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Td(t,e,n,i,s){const r=new wd;let o,a;if(n.type===oe.OVERWRITE){const c=n;c.source.fromUser?o=Ii(t,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!w(c.path),o=bn(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===oe.MERGE){const c=n;c.source.fromUser?o=Nd(t,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Si(t,e,c.path,c.children,i,s,a,r))}else if(n.type===oe.ACK_USER_WRITE){const c=n;c.revert?o=Pd(t,e,c.path,i,s,r):o=Rd(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===oe.LISTEN_COMPLETE)o=Ad(t,e,n.path,i,r);else throw _t("Unknown operation type: "+n.type);const l=r.getChanges();return kd(e,o,l),{viewCache:o,changes:l}}function kd(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Cn(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Vo(Cn(e)))}}function Xo(t,e,n,i,s,r){const o=e.eventCache;if(wn(i,n)!=null)return e;{let a,l;if(w(n))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=je(e),d=c instanceof m?c:m.EMPTY_NODE,h=cs(i,d);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=En(i,je(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=C(n);if(c===".priority"){p(xe(n)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const h=br(i,n,d,l);h!=null?a=t.filter.updatePriority(d,h):a=o.getNode()}else{const d=R(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const u=br(i,n,o.getNode(),l);u!=null?h=o.getNode().getImmediateChild(c).updateChild(d,u):h=o.getNode().getImmediateChild(c)}else h=us(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,d,s,r):a=o.getNode()}}return kt(e,a,o.isFullyInitialized()||w(n),t.filter.filtersNodes())}}function bn(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const d=o?t.filter:t.filter.getIndexedFilter();if(w(n))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(n,i);c=d.updateFullNode(l.getNode(),f,null)}else{const f=C(n);if(!l.isCompleteForPath(n)&&xe(n)>1)return e;const _=R(n),y=l.getNode().getImmediateChild(f).updateChild(_,i);f===".priority"?c=d.updatePriority(l.getNode(),y):c=d.updateChild(l.getNode(),f,y,_,Qo,null)}const h=Yo(e,c,l.isFullyInitialized()||w(n),d.filtersNodes()),u=new ds(s,h,r);return Xo(t,h,n,s,u,a)}function Ii(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const d=new ds(s,e,r);if(w(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=kt(e,c,!0,t.filter.filtersNodes());else{const h=C(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=kt(e,c,a.isFullyInitialized(),a.isFiltered());else{const u=R(n),f=a.getNode().getImmediateChild(h);let _;if(w(u))_=i;else{const g=d.getCompleteChild(h);g!=null?es(u)===".priority"&&g.getChild(Lo(u)).isEmpty()?_=g:_=g.updateChild(u,i):_=m.EMPTY_NODE}if(f.equals(_))l=e;else{const g=t.filter.updateChild(a.getNode(),h,_,u,d,o);l=kt(e,g,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function Ir(t,e){return t.eventCache.isCompleteForChild(e)}function Nd(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=M(n,l);Ir(e,C(d))&&(a=Ii(t,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=M(n,l);Ir(e,C(d))||(a=Ii(t,a,d,c,s,r,o))}),a}function Sr(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Si(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;w(n)?c=i:c=new T(null).setTree(n,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((h,u)=>{if(d.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),_=Sr(t,f,u);l=bn(t,l,new I(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,u)=>{const f=!e.serverCache.isCompleteForChild(h)&&u.value===null;if(!d.hasChild(h)&&!f){const _=e.serverCache.getNode().getImmediateChild(h),g=Sr(t,_,u);l=bn(t,l,new I(h),g,s,r,o,a)}}),l}function Rd(t,e,n,i,s,r,o){if(wn(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(w(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return bn(t,e,n,l.getNode().getChild(n),s,r,a,o);if(w(n)){let c=new T(null);return l.getNode().forEachChild(rt,(d,h)=>{c=c.set(new I(d),h)}),Si(t,e,n,c,s,r,a,o)}else return e}else{let c=new T(null);return i.foreach((d,h)=>{const u=M(n,d);l.isCompleteForPath(u)&&(c=c.set(d,l.getNode().getChild(u)))}),Si(t,e,n,c,s,r,a,o)}}function Ad(t,e,n,i,s){const r=e.serverCache,o=Yo(e,r.getNode(),r.isFullyInitialized()||w(n),r.isFiltered());return Xo(t,o,n,i,Qo,s)}function Pd(t,e,n,i,s,r){let o;if(wn(i,n)!=null)return e;{const a=new ds(i,e,s),l=e.eventCache.getNode();let c;if(w(n)||C(n)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=En(i,je(e));else{const h=e.serverCache.getNode();p(h instanceof m,"serverChildren would be complete if leaf node"),d=cs(i,h)}d=d,c=t.filter.updateFullNode(l,d,r)}else{const d=C(n);let h=us(i,d,e.serverCache);h==null&&e.serverCache.isCompleteForChild(d)&&(h=l.getImmediateChild(d)),h!=null?c=t.filter.updateChild(l,d,h,R(n),a,r):e.eventCache.getNode().hasChild(d)?c=t.filter.updateChild(l,d,m.EMPTY_NODE,R(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=En(i,je(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||wn(i,b())!=null,kt(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new ss(i.getIndex()),r=Qu(i);this.processor_=Id(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),d=new De(l,o.isFullyInitialized(),s.filtersNodes()),h=new De(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Dn(h,d),this.eventGenerator_=new id(this.query_)}get query(){return this.query_}}function Dd(t){return t.viewCache_.serverCache.getNode()}function Md(t){return Cn(t.viewCache_)}function Ld(t,e){const n=je(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!w(e)&&!n.getImmediateChild(C(e)).isEmpty())?n.getChild(e):null}function Tr(t){return t.eventRegistrations_.length===0}function Od(t,e){t.eventRegistrations_.push(e)}function kr(t,e,n){const i=[];if(n){p(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Nr(t,e,n,i){e.type===oe.MERGE&&e.source.queryId!==null&&(p(je(t.viewCache_),"We should always have a full cache before handling merges"),p(Cn(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Td(t.processor_,s,e,n,i);return Sd(t.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Jo(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Fd(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(L,(r,o)=>{i.push(ct(r,o))}),n.isFullyInitialized()&&i.push(Vo(n.getNode())),Jo(t,i,n.getNode(),e)}function Jo(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return sd(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let In;class Zo{constructor(){this.views=new Map}}function Bd(t){p(!In,"__referenceConstructor has already been defined"),In=t}function Wd(){return p(In,"Reference.ts has not been loaded"),In}function Ud(t){return t.views.size===0}function hs(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Nr(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Nr(o,e,n,i));return r}}function ea(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=En(n,s?i:null),l=!1;a?l=!0:i instanceof m?(a=cs(n,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=Dn(new De(a,l,!1),new De(i,s,!1));return new xd(e,c)}return o}function Hd(t,e,n,i,s,r){const o=ea(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Od(o,n),Fd(o,n)}function Vd(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=Me(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(kr(c,n,i)),Tr(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(kr(l,n,i)),Tr(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Me(t)&&r.push(new(Wd())(e._repo,e._path)),{removed:r,events:o}}function ta(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ae(t,e){let n=null;for(const i of t.views.values())n=n||Ld(i,e);return n}function na(t,e){if(e._queryParams.loadsAllData())return Ln(t);{const i=e._queryIdentifier;return t.views.get(i)}}function ia(t,e){return na(t,e)!=null}function Me(t){return Ln(t)!=null}function Ln(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sn;function $d(t){p(!Sn,"__referenceConstructor has already been defined"),Sn=t}function Yd(){return p(Sn,"Reference.ts has not been loaded"),Sn}let Gd=1;class Rr{constructor(e){this.listenProvider_=e,this.syncPointTree_=new T(null),this.pendingWriteTree_=Cd(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function sa(t,e,n,i,s){return ld(t.pendingWriteTree_,e,n,i,s),s?gt(t,new qe(os(),e,n)):[]}function zd(t,e,n,i){cd(t.pendingWriteTree_,e,n,i);const s=T.fromObject(n);return gt(t,new ut(os(),e,s))}function Ie(t,e,n=!1){const i=ud(t.pendingWriteTree_,e);if(dd(t.pendingWriteTree_,e)){let r=new T(null);return i.snap!=null?r=r.set(b(),!0):Y(i.children,o=>{r=r.set(new I(o),!0)}),gt(t,new vn(i.path,r,n))}else return[]}function jt(t,e,n){return gt(t,new qe(as(),e,n))}function qd(t,e,n){const i=T.fromObject(n);return gt(t,new ut(as(),e,i))}function jd(t,e){return gt(t,new Ht(as(),e))}function Kd(t,e,n){const i=ps(t,n);if(i){const s=_s(i),r=s.path,o=s.queryId,a=q(r,e),l=new Ht(ls(o),a);return ms(t,r,l)}else return[]}function Tn(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||ia(o,e))){const l=Vd(o,e,n,i);Ud(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(u=>u._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(u,f)=>Me(f));if(d&&!h){const u=t.syncPointTree_.subtree(r);if(!u.isEmpty()){const f=Jd(u);for(let _=0;_<f.length;++_){const g=f[_],y=g.query,Z=la(t,g);t.listenProvider_.startListening(Rt(y),Vt(t,y),Z.hashFn,Z.onComplete)}}}!h&&c.length>0&&!i&&(d?t.listenProvider_.stopListening(Rt(e),null):c.forEach(u=>{const f=t.queryToTagMap.get(On(u));t.listenProvider_.stopListening(Rt(u),f)}))}Zd(t,c)}return a}function ra(t,e,n,i){const s=ps(t,i);if(s!=null){const r=_s(s),o=r.path,a=r.queryId,l=q(o,e),c=new qe(ls(a),l,n);return ms(t,o,c)}else return[]}function Qd(t,e,n,i){const s=ps(t,i);if(s){const r=_s(s),o=r.path,a=r.queryId,l=q(o,e),c=T.fromObject(n),d=new ut(ls(a),l,c);return ms(t,o,d)}else return[]}function Ti(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(u,f)=>{const _=q(u,s);r=r||Ae(f,_),o=o||Me(f)});let a=t.syncPointTree_.get(s);a?(o=o||Me(a),r=r||Ae(a,b())):(a=new Zo,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,_)=>{const g=Ae(_,b());g&&(r=r.updateImmediateChild(f,g))}));const c=ia(a,e);if(!c&&!e._queryParams.loadsAllData()){const u=On(e);p(!t.queryToTagMap.has(u),"View does not exist, but we have a tag");const f=eh();t.queryToTagMap.set(u,f),t.tagToQueryMap.set(f,u)}const d=Mn(t.pendingWriteTree_,s);let h=Hd(a,e,n,d,r,l);if(!c&&!o&&!i){const u=na(a,e);h=h.concat(th(t,e,u))}return h}function fs(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=q(o,e),c=Ae(a,l);if(c)return c});return qo(s,e,r,n,!0)}function Xd(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,d)=>{const h=q(c,n);i=i||Ae(d,h)});let s=t.syncPointTree_.get(n);s?i=i||Ae(s,b()):(s=new Zo,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new De(i,!0,!1):null,a=Mn(t.pendingWriteTree_,e._path),l=ea(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return Md(l)}function gt(t,e){return oa(e,t.syncPointTree_,null,Mn(t.pendingWriteTree_,b()))}function oa(t,e,n,i){if(w(t.path))return aa(t,e,n,i);{const s=e.get(b());n==null&&s!=null&&(n=Ae(s,b()));let r=[];const o=C(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,d=jo(i,o);r=r.concat(oa(a,l,c,d))}return s&&(r=r.concat(hs(s,t,i,n))),r}}function aa(t,e,n,i){const s=e.get(b());n==null&&s!=null&&(n=Ae(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=jo(i,o),d=t.operationForChild(o);d&&(r=r.concat(aa(d,a,l,c)))}),s&&(r=r.concat(hs(s,t,i,n))),r}function la(t,e){const n=e.query,i=Vt(t,n);return{hashFn:()=>(Dd(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Kd(t,n._path,i):jd(t,n._path);{const r=jc(s,n);return Tn(t,n,null,r)}}}}function Vt(t,e){const n=On(e);return t.queryToTagMap.get(n)}function On(t){return t._path.toString()+"$"+t._queryIdentifier}function ps(t,e){return t.tagToQueryMap.get(e)}function _s(t){const e=t.indexOf("$");return p(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new I(t.substr(0,e))}}function ms(t,e,n){const i=t.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=Mn(t.pendingWriteTree_,e);return hs(i,n,s,null)}function Jd(t){return t.fold((e,n,i)=>{if(n&&Me(n))return[Ln(n)];{let s=[];return n&&(s=ta(n)),Y(i,(r,o)=>{s=s.concat(o)}),s}})}function Rt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Yd())(t._repo,t._path):t}function Zd(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=On(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function eh(){return Gd++}function th(t,e,n){const i=e._path,s=Vt(t,e),r=la(t,n),o=t.listenProvider_.startListening(Rt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)p(!Me(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,h)=>{if(!w(c)&&d&&Me(d))return[Ln(d).query];{let u=[];return d&&(u=u.concat(ta(d).map(f=>f.query))),Y(h,(f,_)=>{u=u.concat(_)}),u}});for(let c=0;c<l.length;++c){const d=l[c];t.listenProvider_.stopListening(Rt(d),Vt(t,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new gs(n)}node(){return this.node_}}class ys{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=M(this.path_,e);return new ys(this.syncTree_,n)}node(){return fs(this.syncTree_,this.path_)}}const nh=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ar=function(t,e,n){if(!t||typeof t!="object")return t;if(p(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return ih(t[".sv"],e,n);if(typeof t[".sv"]=="object")return sh(t[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},ih=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:p(!1,"Unexpected server value: "+t)}},sh=function(t,e,n){t.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},ca=function(t,e,n,i){return vs(e,new ys(n,t),i)},ua=function(t,e,n){return vs(t,new gs(e),n)};function vs(t,e,n){const i=t.getPriority().val(),s=Ar(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=Ar(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new U(a,B(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new U(s))),o.forEachChild(L,(a,l)=>{const c=vs(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Es(t,e){let n=e instanceof I?e:new I(e),i=t,s=C(n);for(;s!==null;){const r=at(i.node.children,s)||{children:{},childCount:0};i=new Cs(s,i,r),n=R(n),s=C(n)}return i}function yt(t){return t.node.value}function da(t,e){t.node.value=e,ki(t)}function ha(t){return t.node.childCount>0}function rh(t){return yt(t)===void 0&&!ha(t)}function Fn(t,e){Y(t.node.children,(n,i)=>{e(new Cs(n,t,i))})}function fa(t,e,n,i){n&&e(t),Fn(t,s=>{fa(s,e,!0)})}function oh(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Kt(t){return new I(t.parent===null?t.name:Kt(t.parent)+"/"+t.name)}function ki(t){t.parent!==null&&ah(t.parent,t.name,t)}function ah(t,e,n){const i=rh(n),s=de(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,ki(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,ki(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh=/[\[\].#$\/\u0000-\u001F\u007F]/,ch=/[\[\].#$\u0000-\u001F\u007F]/,ni=10*1024*1024,ws=function(t){return typeof t=="string"&&t.length!==0&&!lh.test(t)},pa=function(t){return typeof t=="string"&&t.length!==0&&!ch.test(t)},uh=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),pa(t)},dh=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ki(t)||t&&typeof t=="object"&&de(t,".sv")},_a=function(t,e,n,i){i&&e===void 0||Bn(An(t,"value"),e,n)},Bn=function(t,e,n){const i=n instanceof I?new Nu(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+We(i));if(typeof e=="function")throw new Error(t+"contains a function "+We(i)+" with contents = "+e.toString());if(Ki(e))throw new Error(t+"contains "+e.toString()+" "+We(i));if(typeof e=="string"&&e.length>ni/3&&Pn(e)>ni)throw new Error(t+"contains a string greater than "+ni+" utf8 bytes "+We(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Y(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ws(o)))throw new Error(t+" contains an invalid key ("+o+") "+We(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Ru(i,o),Bn(t,a,i),Au(i)}),s&&r)throw new Error(t+' contains ".value" child '+We(i)+" in addition to actual children.")}},hh=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Ft(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ws(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ku);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&ee(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},fh=function(t,e,n,i){const s=An(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Y(e,(o,a)=>{const l=new I(o);if(Bn(s,a,M(n,l)),es(l)===".priority"&&!dh(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),hh(s,r)},ma=function(t,e,n,i){if(!pa(n))throw new Error(An(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},ph=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ma(t,e,n)},bs=function(t,e){if(C(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},_h=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ws(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!uh(n))throw new Error(An(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Wn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!ts(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function ga(t,e,n){Wn(t,n),ya(t,i=>ts(i,e))}function ne(t,e,n){Wn(t,n),ya(t,i=>ee(i,e)||ee(e,i))}function ya(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(gh(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function gh(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();St&&$("event: "+n.toString()),mt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yh="repo_interrupt",vh=25;class Ch{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new mh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=yn(),this.transactionQueueTree_=new Cs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Eh(t,e,n){if(t.stats_=Ji(t.repoInfo_),t.forceRestClient_||Jc())t.server_=new gn(t.repoInfo_,(i,s,r,o)=>{Pr(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>xr(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{W(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new ge(t.repoInfo_,e,(i,s,r,o)=>{Pr(t,i,s,r,o)},i=>{xr(t,i)},i=>{wh(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=iu(t.repoInfo_,()=>new nd(t.stats_,t.server_)),t.infoData_=new Xu,t.infoSyncTree_=new Rr({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=jt(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Is(t,"connected",!1),t.serverSyncTree_=new Rr({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);ne(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function va(t){const n=t.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Un(t){return nh({timestamp:va(t)})}function Pr(t,e,n,i,s){t.dataUpdateCount++;const r=new I(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=un(n,c=>B(c));o=Qd(t.serverSyncTree_,r,l,s)}else{const l=B(n);o=ra(t.serverSyncTree_,r,l,s)}else if(i){const l=un(n,c=>B(c));o=qd(t.serverSyncTree_,r,l)}else{const l=B(n);o=jt(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=ht(t,r)),ne(t.eventQueue_,a,o)}function xr(t,e){Is(t,"connected",e),e===!1&&Th(t)}function wh(t,e){Y(e,(n,i)=>{Is(t,n,i)})}function Is(t,e,n){const i=new I("/.info/"+e),s=B(n);t.infoData_.updateSnapshot(i,s);const r=jt(t.infoSyncTree_,i,s);ne(t.eventQueue_,i,r)}function Ss(t){return t.nextWriteId_++}function bh(t,e,n){const i=Xd(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=B(s).withIndex(e._queryParams.getIndex());Ti(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=jt(t.serverSyncTree_,e._path,r);else{const a=Vt(t.serverSyncTree_,e);o=ra(t.serverSyncTree_,e._path,r,a)}return ne(t.eventQueue_,e._path,o),Tn(t.serverSyncTree_,e,n,null,!0),r},s=>(Qt(t,"get for query "+W(e)+" failed: "+s),Promise.reject(new Error(s))))}function Ih(t,e,n,i,s){Qt(t,"set",{path:e.toString(),value:n,priority:i});const r=Un(t),o=B(n,i),a=fs(t.serverSyncTree_,e),l=ua(o,a,r),c=Ss(t),d=sa(t.serverSyncTree_,e,l,c,!0);Wn(t.eventQueue_,d),t.server_.put(e.toString(),o.val(!0),(u,f)=>{const _=u==="ok";_||j("set at "+e+" failed: "+u);const g=Ie(t.serverSyncTree_,c,!_);ne(t.eventQueue_,e,g),Ni(t,s,u,f)});const h=ks(t,e);ht(t,h),ne(t.eventQueue_,h,[])}function Sh(t,e,n,i){Qt(t,"update",{path:e.toString(),value:n});let s=!0;const r=Un(t),o={};if(Y(n,(a,l)=>{s=!1,o[a]=ca(M(e,a),B(l),t.serverSyncTree_,r)}),s)$("update() called with empty data.  Don't do anything."),Ni(t,i,"ok",void 0);else{const a=Ss(t),l=zd(t.serverSyncTree_,e,o,a);Wn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,d)=>{const h=c==="ok";h||j("update at "+e+" failed: "+c);const u=Ie(t.serverSyncTree_,a,!h),f=u.length>0?ht(t,e):e;ne(t.eventQueue_,f,u),Ni(t,i,c,d)}),Y(n,c=>{const d=ks(t,M(e,c));ht(t,d)}),ne(t.eventQueue_,e,[])}}function Th(t){Qt(t,"onDisconnectEvents");const e=Un(t),n=yn();Ci(t.onDisconnect_,b(),(s,r)=>{const o=ca(s,r,t.serverSyncTree_,e);$o(n,s,o)});let i=[];Ci(n,b(),(s,r)=>{i=i.concat(jt(t.serverSyncTree_,s,r));const o=ks(t,s);ht(t,o)}),t.onDisconnect_=yn(),ne(t.eventQueue_,b(),i)}function kh(t,e,n){let i;C(e._path)===".info"?i=Ti(t.infoSyncTree_,e,n):i=Ti(t.serverSyncTree_,e,n),ga(t.eventQueue_,e._path,i)}function Ca(t,e,n){let i;C(e._path)===".info"?i=Tn(t.infoSyncTree_,e,n):i=Tn(t.serverSyncTree_,e,n),ga(t.eventQueue_,e._path,i)}function Nh(t){t.persistentConnection_&&t.persistentConnection_.interrupt(yh)}function Qt(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),$(n,...e)}function Ni(t,e,n,i){e&&mt(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Ea(t,e,n){return fs(t.serverSyncTree_,e,n)||m.EMPTY_NODE}function Ts(t,e=t.transactionQueueTree_){if(e||Hn(t,e),yt(e)){const n=ba(t,e);p(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Rh(t,Kt(e),n)}else ha(e)&&Fn(e,n=>{Ts(t,n)})}function Rh(t,e,n){const i=n.map(c=>c.currentWriteId),s=Ea(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const d=n[c];p(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const h=q(e,d.path);r=r.updateChild(h,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{Qt(t,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const h=[];for(let u=0;u<n.length;u++)n[u].status=2,d=d.concat(Ie(t.serverSyncTree_,n[u].currentWriteId)),n[u].onComplete&&h.push(()=>n[u].onComplete(null,!0,n[u].currentOutputSnapshotResolved)),n[u].unwatcher();Hn(t,Es(t.transactionQueueTree_,e)),Ts(t,t.transactionQueueTree_),ne(t.eventQueue_,e,d);for(let u=0;u<h.length;u++)mt(h[u])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{j("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}ht(t,e)}},o)}function ht(t,e){const n=wa(t,e),i=Kt(n),s=ba(t,n);return Ah(t,s,i),i}function Ah(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=q(n,l.path);let d=!1,h;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,h=l.abortReason,s=s.concat(Ie(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=vh)d=!0,h="maxretry",s=s.concat(Ie(t.serverSyncTree_,l.currentWriteId,!0));else{const u=Ea(t,l.path,o);l.currentInputSnapshot=u;const f=e[a].update(u.val());if(f!==void 0){Bn("transaction failed: Data returned ",f,l.path);let _=B(f);typeof f=="object"&&f!=null&&de(f,".priority")||(_=_.updatePriority(u.getPriority()));const y=l.currentWriteId,Z=Un(t),fe=ua(_,u,Z);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=fe,l.currentWriteId=Ss(t),o.splice(o.indexOf(y),1),s=s.concat(sa(t.serverSyncTree_,l.path,fe,l.currentWriteId,l.applyLocally)),s=s.concat(Ie(t.serverSyncTree_,y,!0))}else d=!0,h="nodata",s=s.concat(Ie(t.serverSyncTree_,l.currentWriteId,!0))}ne(t.eventQueue_,n,s),s=[],d&&(e[a].status=2,(function(u){setTimeout(u,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}Hn(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)mt(i[a]);Ts(t,t.transactionQueueTree_)}function wa(t,e){let n,i=t.transactionQueueTree_;for(n=C(e);n!==null&&yt(i)===void 0;)i=Es(i,n),e=R(e),n=C(e);return i}function ba(t,e){const n=[];return Ia(t,e,n),n.sort((i,s)=>i.order-s.order),n}function Ia(t,e,n){const i=yt(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);Fn(e,s=>{Ia(t,s,n)})}function Hn(t,e){const n=yt(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,da(e,n.length>0?n:void 0)}Fn(e,i=>{Hn(t,i)})}function ks(t,e){const n=Kt(wa(t,e)),i=Es(t.transactionQueueTree_,e);return oh(i,s=>{ii(t,s)}),ii(t,i),fa(i,s=>{ii(t,s)}),n}function ii(t,e){const n=yt(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(p(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Ie(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?da(e,void 0):n.length=r+1,ne(t.eventQueue_,Kt(e),s);for(let o=0;o<i.length;o++)mt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function xh(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):j(`Invalid query segment '${n}' in query '${t}'`)}return e}const Dr=function(t,e){const n=Dh(t),i=n.namespace;n.domain==="firebase.com"&&Ee(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Ee("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||$c();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new To(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new I(n.pathString)}},Dh=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let d=t.indexOf("/");d===-1&&(d=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(d,h)),d<h&&(s=Ph(t.substring(d,h)));const u=xh(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in u&&(r=u.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Mh=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Mr.charAt(n%64),n=Math.floor(n/64);p(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Mr.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sa{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+W(this.snapshot.exportVal())}}class Ta{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Rs{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return w(this._path)?null:es(this._path)}get ref(){return new he(this._repo,this._path)}get _queryIdentifier(){const e=vr(this._queryParams),n=Qi(e);return n==="{}"?"default":n}get _queryObject(){return vr(this._queryParams)}isEqual(e){if(e=Qe(e),!(e instanceof Rs))return!1;const n=this._repo===e._repo,i=ts(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Tu(this._path)}}class he extends Rs{constructor(e,n){super(e,n,new rs,!1)}get parent(){const e=Lo(this._path);return e===null?null:new he(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ft{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new I(e),i=pt(this.ref,e);return new ft(this._node.getChild(n),i,L)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new ft(s,pt(this.ref,i),L)))}hasChild(e){const n=new I(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ie(t,e){return t=Qe(t),t._checkNotDeleted("ref"),e!==void 0?pt(t._root,e):t._root}function pt(t,e){return t=Qe(t),C(t._path)===null?ph("child","path",e):ma("child","path",e),new he(t._repo,M(t._path,e))}function Lh(t,e){t=Qe(t),bs("push",t._path),_a("push",e,t._path,!0);const n=va(t._repo),i=Mh(n),s=pt(t,i),r=pt(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Lr(t){return bs("remove",t._path),Xt(t,null)}function Xt(t,e){t=Qe(t),bs("set",t._path),_a("set",e,t._path,!1);const n=new $t;return Ih(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function ka(t,e){fh("update",e,t._path);const n=new $t;return Sh(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Oh(t){t=Qe(t);const e=new Ns(()=>{}),n=new Jt(e);return bh(t._repo,t,n).then(i=>new ft(i,new he(t._repo,t._path),t._queryParams.getIndex()))}class Jt{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Sa("value",this,new ft(e.snapshotNode,new he(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ta(this,e,n):null}matches(e){return e instanceof Jt?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Vn{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ta(this,e,n):null}createEvent(e,n){p(e.childName!=null,"Child events should have a childName.");const i=pt(new he(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Sa(e.type,this,new ft(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Vn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function As(t,e,n,i,s){const r=new Ns(n,void 0),o=e==="value"?new Jt(r):new Vn(e,r);return kh(t._repo,t,o),()=>Ca(t._repo,t,o)}function Na(t,e,n,i){return As(t,"value",e)}function Ra(t,e,n,i){return As(t,"child_added",e)}function Fh(t,e,n,i){return As(t,"child_removed",e)}function Aa(t,e,n){let i=null;const s=n?new Ns(n):null;e==="value"?i=new Jt(s):e&&(i=new Vn(e,s)),Ca(t._repo,t,i)}Bd(he);$d(he);/**
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
 */const Bh="FIREBASE_DATABASE_EMULATOR_HOST",Ri={};let Wh=!1;function Uh(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=qi(r);t.repoInfo_=new To(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Hh(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Ee("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),$("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Dr(r,s),a=o.repoInfo,l;typeof process<"u"&&tr&&(l=tr[Bh]),l?(r=`http://${l}?ns=${a.namespace}`,o=Dr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new eu(t.name,t.options,e);_h("Invalid Firebase Database URL",o),w(o.path)||Ee("Database URL must point to the root of a Firebase Database (not including a child path).");const d=$h(a,t,c,new Zc(t,n));return new Yh(d,t)}function Vh(t,e){const n=Ri[e];(!n||n[t.key]!==t)&&Ee(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Nh(t),delete n[t.key]}function $h(t,e,n,i){let s=Ri[e.name];s||(s={},Ri[e.name]=s);let r=s[t.toURLString()];return r&&Ee("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ch(t,Wh,n,i),s[t.toURLString()]=r,r}class Yh{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Eh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new he(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Vh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ee("Cannot call "+e+" on a deleted database.")}}function Gh(t=Tc(),e){const n=Ec(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=ol("database");i&&zh(n,...i)}return n}function zh(t,e,n,i={}){t=Qe(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&dn(i,r.repoInfo_.emulatorOptions))return;Ee("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Ee('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new on(on.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:ll(i.mockUserToken,t.app.options.projectId);o=new on(a)}qi(e)&&(al(e),dl("Database",!0)),Uh(r,s,i,o)}/**
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
 */function qh(t){Fc(Sc),fn(new Mt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Hh(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),it(nr,ir,t),it(nr,ir,"esm2020")}ge.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ge.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};qh();var jh="firebase",Kh="12.4.0";/**
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
 */it(jh,Kh,"app");const Qh={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Xh=lo(Qh),se=Gh(Xh),Ai=[];function Ps(t,e,n){Ai.push({ref:t,type:e,callback:n})}function Jh(){Ai.forEach(({ref:t,type:e,callback:n})=>{Aa(t,e,n)}),Ai.length=0}function Pi(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=c=>{try{const d=c.target;if(t.contains(d))return;for(const h of o)if(h&&h.contains&&h.contains(d)||h===d)return;e(c)}catch(d){console.error("closeOnClickOutside handler error:",d)}},l=c=>{s&&c.key==="Escape"&&e(c)};return r.forEach(c=>document.addEventListener(c,a,{passive:!0})),s&&document.addEventListener("keydown",l),function(){r.forEach(d=>document.removeEventListener(d,a,{passive:!0})),s&&document.removeEventListener("keydown",l)}}function Zh(t,e,n={}){return Pi(t,e,{...n,events:["dblclick"]})}const xs=t=>t?!0:(console.warn("Element not found."),!1),Ds=t=>{if(xs(t))return t.classList.contains("hidden")},A=t=>{xs(t)&&t.classList.remove("hidden")},v=t=>{xs(t)&&t.classList.add("hidden")},Pa=t=>t.classList.contains("smallFrame"),$e=t=>{if(t&&!Pa(t)){t.classList.add("smallFrame");const e=document.createElement("div");e.classList.add("smallFrame-toggle-div");const n=document.createElement("span");n.classList.add("smallFrame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Ve=t=>{if(Pa(t)){t.classList.remove("smallFrame");const e=document.querySelector(".smallFrame-close");e&&e.remove()}};function xi(t){return document.pictureInPictureElement===t}const xa=document.getElementById("lobby"),tt=document.getElementById("local-video-el"),ae=document.getElementById("local-video-box"),X=document.getElementById("remote-video-el"),O=document.getElementById("remote-video-box"),F=document.getElementById("shared-video-el"),ye=document.getElementById("shared-video-box"),Ye=document.getElementById("chat-controls"),Ke=document.getElementById("call-btn"),Zt=document.getElementById("hang-up-btn"),Or=document.getElementById("switch-camera-btn"),K=document.getElementById("install-btn"),Fr=document.getElementById("status");document.getElementById("link-container");document.getElementById("videos");const ef=document.getElementById("sync-status"),Da=document.getElementById("share-link");document.getElementById("stream-url-input");const en=document.getElementById("mute-btn"),tf=document.getElementById("fullscreenPartnerBtn"),nf=document.getElementById("mic-btn"),sf=document.getElementById("camera-btn");document.getElementById("fullscreen-app-btn");document.getElementById("app-title-h1");document.getElementById("app-title-a");document.getElementById("app-title-span");function V(t){Fr?Fr.textContent=t:console.warn("Status div not found in the DOM.")}function Ma(t,{inactivityMs:e=2500,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const c=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(y=>!Array.isArray(o)||!o.includes(y));function d(){A(t);try{typeof i=="function"&&i()}catch(y){console.warn("showHideOnInactivity onShow callback error:",y)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof s=="function"&&s()}catch(y){console.warn("showHideOnInactivity onHide callback error:",y)}a=null},e)}c.forEach(y=>n.addEventListener(y,d,{passive:!0}));function h(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(y){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",y)}}else d()}document.addEventListener("visibilitychange",h);function u(y){if(!y.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof s=="function"&&s()}catch(Z){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",Z)}}}n.addEventListener("mouseout",u);function f(y){if(r&&(y.key==="Escape"||y.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof s=="function"&&s()}catch(Z){console.warn("showHideOnInactivity onHide (esc) callback error:",Z)}}}document.addEventListener("keydown",f);function _(){a||d()}n.addEventListener("touchend",_,{passive:!0}),v(t);function g(){c.forEach(y=>n.removeEventListener(y,d)),document.removeEventListener("visibilitychange",h),n.removeEventListener("mouseout",u),n.removeEventListener("touchend",_),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return g}const Di=(t,e)=>{},La={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,highpassFilter:!0,typingNoiseDetection:!0}},Mi={desktop:{landscape:{width:{min:1280,ideal:window.innerWidth,max:2560},height:{min:720,ideal:window.innerHeight,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"},portrait:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"}},mobile:{portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},aspectRatio:{ideal:9/16},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"},landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},aspectRatio:{ideal:16/9},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"}},relyOnBrowserDefaults:!0};function rf(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function of(){return rf()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function af(){const t=await of();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function lf({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user",r=Ms(s);try{const o=await navigator.mediaDevices.getUserMedia({video:r,audio:La.default}),a=o.getVideoTracks()[0],l=o.getAudioTracks()[0],c=t.getVideoTracks()[0],d=c?c.enabled:!0,h=t.getAudioTracks()[0],u=h?!h.enabled:!1;if(i){const f=i.getSenders().find(g=>g.track&&g.track.kind==="video");f&&f.replaceTrack(a);const _=i.getSenders().find(g=>g.track&&g.track.kind==="audio");_&&l&&_.replaceTrack(l)}return a&&(a.enabled=d),l&&(l.enabled=!u),t.getTracks().forEach(f=>f.stop()),e.srcObject=new MediaStream([a].filter(Boolean)),{newStream:o,facingMode:s}}catch(o){return console.error("Failed to switch camera:",o),null}}let si=!1,Oe=null,Fe=null;function cf({getLocalStream:t,getFacingMode:e}){return Oe&&Fe&&Oe.removeEventListener("change",Fe),Oe=window.matchMedia("(orientation: portrait)"),Fe=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";uf({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},Oe.addEventListener("change",Fe),()=>{Oe&&Fe&&Oe.removeEventListener("change",Fe),Oe=null,Fe=null}}async function uf({localStream:t,currentFacingMode:e}){if(!(si||!t?.getVideoTracks()[0])){si=!0;try{const n=t.getVideoTracks()[0],i=Ms(e);Di("Applying constraints:",i),await n.applyConstraints(i),Di("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{si=!1}}}function df(){return window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180}function Ms(t){const e=df()?"portrait":"landscape";return/Mobi|Android/i.test(navigator.userAgent)?{facingMode:t,...Mi.mobile[e]}:{facingMode:t,...Mi.desktop}}let Li=!1,kn=[];function hf(t,e){if(!e)return;const n=e.getAudioTracks()[0];n&&(n.enabled=t)}function ff(t,e,n){n&&(n.muted=!t,n.volume=e)}function pf(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function _f(t,e){if(!t)return;const n=()=>{if(t.muted!==Li){const i=e.querySelector("i");i.className=t.muted?"fa fa-volume-mute":"fa fa-volume-up",Li=t.muted}};t.addEventListener("volumechange",n),kn.push(()=>{t&&t.removeEventListener("volumechange",n)})}function mf({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:l,fullscreenPartnerBtn:c}){r&&(r.onclick=()=>{const u=t(),f=e();if(!f||!u)return;const _=!f.muted;hf(!_,u),ff(!_,0,f),pf(_,r)}),o&&(o.onclick=()=>{const u=t();if(!u)return;const f=u.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const _=o.querySelector("i");_.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});let d="user";const h=cf({getLocalStream:t,getFacingMode:()=>d});kn.push(h),a&&(a.onclick=async()=>{const u=await lf({localStream:t(),localVideo:e(),currentFacingMode:d,peerConnection:i()||null});u?(d=u.facingMode,console.log("Switched camera to facingMode:",d),u.newStream&&typeof s=="function"&&s(u.newStream)):console.error("Camera switch failed.")}),l&&(l.onclick=()=>{const u=n();u&&(u.muted=!u.muted)}),c&&(c.onclick=()=>{const u=n();u.requestFullscreen?u.requestFullscreen():u.webkitRequestFullscreen&&u.webkitRequestFullscreen()})}function gf(){kn.forEach(t=>t()),kn=[],Li=!1}const Br="yt-video-box",Oi="yt-player-root";let x=null,we=!1;const At=()=>x,yf=()=>we,Oa=t=>we=t,Ge=()=>{const t=document.getElementById(Br);if(!t)throw new Error(`Container #${Br} not found`);return t};function vf(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Fa(){const t=Ge();if(!document.getElementById(Oi)){const e=document.createElement("div");e.id=Oi,t.appendChild(e)}A(t)}function Fi(){const t=Ge();v(t)}function ri(){const t=Ge();return t&&!t.classList.contains("hidden")}function Bi(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Ba(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function Cf({url:t,onReady:e,onStateChange:n}){const i=Ba(t);if(!i)throw new Error("Invalid YouTube URL");if(await vf(),x){try{x.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}x=null}const s=(o=!0)=>{const a=Ge(),l=x.getIframe();if(l&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===l)try{l.blur()}catch{}}if(o){const c=d=>{if(d.code==="Space"){const h=Ge(),u=x.getIframe();if(document.activeElement===u||document.activeElement===h)return;d.preventDefault(),console.debug("Space pressed, refocusing iframe"),x.getPlayerState()!==window.YT.PlayerState.PLAYING?Os():$n()}};document.addEventListener("keydown",c,{once:!0})}}},r=()=>{const o=Ge(),a=x.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Fa(),new Promise((o,a)=>{try{x=new window.YT.Player(Oi,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:l=>{we=!0,e&&e(l),o(x)},onStateChange:l=>{l.data===window.YT.PlayerState.ENDED&&s(!1),l.data===window.YT.PlayerState.PAUSED&&s(),l.data===window.YT.PlayerState.PLAYING&&r(),n&&n(l)},onError:l=>{console.error("YouTube player error:",l.data),a(new Error(`YouTube error: ${l.data}`))}}})}catch(l){a(l)}})}function Ls(){if(x){try{Fi(),x.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}x=null,we=!1}}function Os(){x&&we&&x.playVideo()}function $n(){x&&we&&x.pauseVideo()}function Ef(t){x&&we&&x.seekTo(t,!0)}function Nn(){return x&&we?x.getCurrentTime():0}function Fs(){return x&&we?x.getPlayerState():-1}const Se={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let ve=null,Yn=null,Wa=!1,te="none",Bs=null;const tn=()=>Wa,Ua=t=>Wa=t,bt=()=>te,wf=t=>{["yt","url","none"].includes(t)?te=t:console.warn("Invalid lastWatched platform:",t)};let Te=!1,Pt=null,xt=0;async function ot(t){if(!ve)return;console.debug("Updating watch sync state, roomId:",ve);const e=ie(se,`rooms/${ve}/watch`);try{await ka(e,{...t,updatedBy:Yn})}catch(n){console.error("Failed to update watch state:",n)}}function Ha(t,e,n){if(!t)return;ve=t,Yn=n;const i=ie(se,`rooms/${t}/watch`);Na(i,Wr),Ps(i,"value",Wr),Rf()}function Wr(t){const e=t.val();e&&e.updatedBy!==Yn&&(Date.now()-xt<500||(e.url&&e.url!==Bs&&bf(e.url),e.isYouTube?If(e):Nf(e)))}function bf(t){Bs=t,Bi(t)?(v(ye),Va(t),te="yt"):(Ls(),A(ye),F.src=t,te="url")}function If(t){!At()||!yf()||(Sf(t),Tf(t))}function Sf(t){const e=Fs(),n=e===Se.PLAYING;if([Se.BUFFERING,Se.UNSTARTED].includes(e)){kf();return}Te||(t.playing&&!n?(Os(),te="yt"):!t.playing&&n&&($n(),te="yt"))}function Tf(t){if(t.currentTime===void 0)return;const e=Nn();Math.abs(e-t.currentTime)>.3&&!Te&&(Ef(t.currentTime),setTimeout(()=>{t.playing?Os():$n(),te="yt"},500))}function kf(){Te=!0,clearTimeout(Pt),Pt=setTimeout(async()=>{Te=!1;const t=Fs()===Se.PLAYING;await ot({playing:t,currentTime:Nn()})},700)}function Nf(t){t.playing!==void 0&&(t.playing&&F.paused?F.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!F.paused&&F.pause()),t.currentTime!==void 0&&Math.abs(F.currentTime-t.currentTime)>1&&(F.currentTime=t.currentTime,t.playing?F.play().catch(n=>console.warn("Play failed:",n)):F.pause())}function Rf(){F.addEventListener("play",async()=>{!At()&&ve&&(xt=Date.now(),await ot({playing:!0,isYouTube:!1})),te="url"}),F.addEventListener("pause",async()=>{!At()&&ve&&(xt=Date.now(),await ot({playing:!1,isYouTube:!1})),te="url"}),F.addEventListener("seeked",async()=>{!At()&&ve&&(xt=Date.now(),await ot({currentTime:F.currentTime,playing:!F.paused,isYouTube:!1})),te="url"})}async function Af(t){if(!t)return!1;if(xt=Date.now(),Bi(t)){if(v(ye),!await Va(t))return!1;te="yt"}else Ls(),A(ye),F.src=t,te="url";if(ve){const e=ie(se,`rooms/${ve}/watch`);Xt(e,{url:t,playing:!1,currentTime:0,isYouTube:Bi(t),updatedBy:Yn})}return!0}async function nt(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;Bs=t.url;const e=await Af(t.url);return Gi(),e}async function Va(t,e,n){if(!Ba(t))return console.error("Invalid YouTube URL:",t),!1;try{return await Cf({url:t,onReady:s=>{Oa(!0)},onStateChange:async s=>{if(!At())return;const o=s.data===Se.PLAYING,a=s.data===Se.PAUSED;if(s.data===Se.BUFFERING){Te=!0,Pt&&clearTimeout(Pt),Pt=setTimeout(async()=>{Te=!1;const d=Fs()===Se.PLAYING;await ot({playing:d,currentTime:Nn()})},700);return}a&&Te||!Te&&(o||a)&&await ot({playing:o,currentTime:Nn()})}}),!0}catch(s){return console.error("Failed to load YouTube video:",s),!1}}let oi=null,be=null,P=null,N=null,Ur=!1,rn=!1,ce=[],Wi="",G=-1,Ui=[];const Pf="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",xf="https://www.googleapis.com/youtube/v3";function Df(){if(Ur||rn)return!1;if(rn=!0,oi=document.querySelector(".search-section"),be=document.getElementById("searchBtn"),P=document.getElementById("searchQuery"),N=document.getElementById("searchResults"),!oi||!be||!P||!N)return console.error("YouTube search elements not found in DOM"),rn=!1,!1;const t=s=>/^https?:\/\//i.test(s),e=s=>{N.querySelectorAll(".search-result-item").forEach((o,a)=>{a===s?(o.classList.add("focused"),o.scrollIntoView({block:"nearest"})):o.classList.remove("focused")}),G=s};be.onclick=async()=>{const s=P.value.trim();if(Ds(P)){A(P),P.focus();return}if(!s){an(),v(P);return}if($r()&&s===Wi)Hi(ce);else if(!t(s))await Hr(s);else{nt&&await nt({url:s}),v(N),P.value="",v(P),G=-1;return}},oi.addEventListener("keydown",async s=>{const r=N.querySelectorAll(".search-result-item");if(r.length>0&&(s.key==="ArrowDown"||s.key==="ArrowUp")){if(s.key==="ArrowDown"){let o=G+1;o>=r.length&&(o=0),e(o)}else if(s.key==="ArrowUp"){let o=G-1;o<0&&(o=G===-1?0:r.length-1),e(o)}return}if(s.key==="Enter"){if(r.length>0&&G>=0){r[G].click(),v(P),v(N),G=-1;return}const o=P.value.trim();if(o)if($r()&&o===Wi)Hi(ce);else if(!t(o))await Hr(o);else{nt&&await nt({url:o}),v(N),G=-1,P.value="",v(P);return}}else s.key==="Escape"&&(Lf()?an():P.value?P.value="":v(P))}),P.addEventListener("input",()=>{P.value.trim()===""&&an(),G=-1});const n=Pi(P,()=>v(P),{ignore:[be],esc:!1});Ui.push(n);const i=Pi(N,()=>v(N),{ignore:[be],esc:!1});return Ui.push(i),rn=!1,Ur=!0,!0}async function Hr(t){if(!be||!N){console.error("Search elements not initialized");return}ce=[],Wi=t,be.disabled=!0,N.innerHTML='<div class="search-loading">Searching YouTube...</div>',A(N);try{const e=await fetch(`${xf}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${Pf}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Vr("No videos found"),ce=[];return}ce=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Hi(ce)}catch(e){console.error("YouTube search failed:",e),Vr(e.message||"Search failed. Please try again.")}finally{be.disabled=!1}}function Hi(t){if(!N){console.error("Search results element not initialized");return}if(!t||t.length===0){N.innerHTML='<div class="no-results">No results found</div>',ce=[],G=-1;return}N.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${n.title}</div>
        <div class="result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(nt){if(await nt(n),v(N),G=-1,!P){console.error("Search query element not initialized");return}P.value="",v(P)}},N.appendChild(i)}),A(N),G=0,N.querySelectorAll(".search-result-item").forEach((n,i)=>{i===G?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Vr(t){if(ce=[],G=-1,!N){console.error("Search results element not initialized");return}N.innerHTML=`<div class="search-error">${t}</div>`,A(N)}function an(){ce=[],G=-1,N&&(N.innerHTML="",v(N))}function Mf(){an(),Ui.forEach(t=>t())}function Lf(){return!Ds(N)}function $r(){return ce.length>0}let Ue=null,Yr=!1;function Of(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function Ff(){if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),v(K);return}if(!K){console.warn("[PWA]: Install button not found");return}if(Of()){K.innerHTML='<i class="fa fa-info"></i>',K.title="Show Install Instructions",A(K),K.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}Yr||(K.addEventListener("click",async()=>{if(!Ue){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),"serviceWorker"in navigator||console.warn("[PWA]: Service Workers not supported"),window.location.protocol!=="https:"&&window.location.hostname!=="localhost"&&console.warn("[PWA]: Not served over HTTPS");return}try{await Ue.prompt();const{outcome:t}=await Ue.userChoice;Di(`User choice outcome: ${t}`),console.info(t==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),v(K),Ue=null}catch(t){v(K),console.error("Error showing install prompt:",t)}}),Yr=!0),window.addEventListener("appinstalled",()=>{v(K),Ue=null}),Ue?A(K):v(K)}window.addEventListener("beforeinstallprompt",t=>{console.debug("[PWA]: beforeinstallprompt fired"),t.preventDefault(),Ue=t,K&&A(K)});function $a(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(e==="initiator")Gr(t,"offerCandidates",n),zr(t,"answerCandidates",n);else if(e==="joiner")Gr(t,"answerCandidates",n),zr(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Gr(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=Lh(ie(se,`rooms/${n}/${e}`));Xt(s,i.candidate.toJSON())}}}function zr(t,e,n){const i=ie(se,`rooms/${n}/${e}`),s=r=>{const o=r.val();o&&t.remoteDescription&&t.addIceCandidate(new RTCIceCandidate(o)).catch(a=>{console.error("Error adding ICE candidate:",a)})};Ra(i,s),Ps(i,"child_added",s)}let z=null,qr=null;function Ws(){return!z||!(z instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",z),console.error("Call createLocalStream() before accessing local stream."),null):z}function Bf(t){z=t}const Wf=async()=>{if(z&&z instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),z;const t=Ms("user");return z=await navigator.mediaDevices.getUserMedia({video:t||Mi.relyOnBrowserDefaults,audio:La.default}),z};async function Uf(t){return z=await Wf(),qr=new MediaStream(z.getVideoTracks()),t.srcObject=qr,!0}function Ya(t,e,n){return t.ontrack=i=>{if(!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;e.srcObject!==i.streams[0]&&(e.srcObject=i.streams[0],_f(e,n),V("Connected!"))},!0}const Hf=()=>{z&&(z.getTracks().forEach(t=>t.stop()),z=null)};function Ga(t){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const n=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!n||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(g=>{g.forEach(y=>{y.type==="attributes"&&y.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function l(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}n.addEventListener("click",l),Zh(i,()=>{v(i)},{ignore:[n],esc:!0});function c(){A(n)}function d(){v(n)}function h(g){const y=document.createElement("p");y.textContent=g,g.startsWith("You:")?y.style.textAlign="right":g.startsWith("Partner:")&&(y.style.textAlign="left"),s.appendChild(y),s.scrollTop=s.scrollHeight}function u(g){h(`Partner: ${g}`),Ds(i)&&f()}function f(){n.classList.add("new-message"),setTimeout(()=>{n.classList.remove("new-message")},4e3)}r.addEventListener("submit",g=>{g.preventDefault();const y=o.value.trim();y&&(t(y),h(`You: ${y}`),o.value="")});function _(){a.disconnect(),n&&d(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:h,receiveMessage:u,toggleMessages:l,showMessagesToggle:c,hideMessagesToggle:d,cleanup:_}}let jr=!1;function Vf(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--primary",l.textContent=e.buttonText,l.autofocus=!0;const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--secondary",c.textContent=e.cancelText,a.appendChild(l),a.appendChild(c),i.appendChild(a);const d=document.createElement("p");return d.className="copy-link-dialog__feedback",d.setAttribute("aria-live","polite"),i.appendChild(d),n.appendChild(i),{dialog:n,input:o,copyButton:l,cancelButton:c,feedback:d}}function $f(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};Yf();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=Vf(t,n);Gf(i);let l=!1;const c=async()=>{await zf(t,s)?(l=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",c),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&!d.ctrlKey&&!d.altKey&&!d.metaKey&&(d.preventDefault(),c())}),i.addEventListener("close",()=>{!l&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function Yf(){if(jr)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),jr=!0}function Gf(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)",this.style.zIndex="1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function zf(t,e){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){console.warn("Clipboard API failed, using fallback:",n)}try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}let S=null,pe=null,D=null,me=null,Pe=null,J,Vi=[],$i=null;const Us=()=>X.srcObject&&X.srcObject.getVideoTracks().some(t=>t.enabled);async function za(){me=Math.random().toString(36).substring(2,15);const t=Ge();t&&v(t);try{return await Uf(tt),await af()&&A(Or),mf({getLocalStream:Ws,getLocalVideo:()=>tt,getRemoteVideo:()=>X,getPeerConnection:()=>S,setLocalStream:Bf,micBtn:nf,cameraBtn:sf,switchCameraBtn:Or,mutePartnerBtn:en,fullscreenPartnerBtn:tf}),tt.addEventListener("enterpictureinpicture",()=>v(ae)),tt.addEventListener("leavepictureinpicture",()=>{tn()&&Us()||A(ae)}),Ff(),Df(),Xf(),Vs(),!0}catch(e){return console.error("Failed to get user media:",e),V("Error: Please allow camera and microphone access."),!1}}function qf(){pe=S.createDataChannel("chat"),J=Ga(e=>{pe.readyState==="open"&&pe.send(e)}),pe.onopen=()=>{J.showMessagesToggle(),J.appendChatMessage("💬 Chat connected")},pe.onmessage=e=>J.receiveMessage(e.data)}function Yi(){window.history.replaceState({},document.title,window.location.pathname)}let Rn=[];function qa(){if(!D||!me)return;const t=ie(se,`rooms/${D}/members`),e=ie(se,`rooms/${D}/members/${me}`);Xt(e,{joinedAt:Date.now()});const n=s=>{s.key!==me&&Hs()};Ra(t,n),Rn.push({ref:t,type:"child_added",callback:n});const i=s=>{s.key!==me&&console.info("Partner has left the call"),Gn()};Fh(t,i),Rn.push({ref:t,type:"child_removed",callback:i})}const ja={iceServers:[{urls:"stun:stun.l.google.com:19302"}]};function Ka(t){t.onconnectionstatechange=()=>{t.connectionState==="connected"?(V("Connected!"),Hs()):t.connectionState==="disconnected"?(V("Partner disconnected"),Vs(),Yi()):t.connectionState==="failed"&&(V("Connection failed"),Yi())}}async function jf(){const t=Ws();if(!t)return V("Error: Camera not initialized"),!1;D=Math.random().toString(36).substring(2,15),Pe="initiator",S=new RTCPeerConnection(ja),qf(),t.getTracks().forEach(o=>{S.addTrack(o,t)}),Ya(S,X,en)&&($a(S,Pe,D),Ka(S),console.debug("Peer connection created as initiator with room ID:",D));const e=await S.createOffer();await S.setLocalDescription(e);const n=ie(se,`rooms/${D}`);await Xt(n,{offer:{type:e.type,sdp:e.sdp}});const i=ie(se,`rooms/${D}/answer`),s=async o=>{const a=o.val();if(a&&a.sdp!==$i){if($i=a.sdp,S.signalingState!=="have-local-offer"&&S.signalingState!=="stable")return!0;try{return await S.setRemoteDescription(new RTCSessionDescription(a)),!0}catch(l){return console.error("Failed to set remote description:",l),!1}}};Na(i,s),Ps(i,"value",s),Ha(D,Pe,me),qa();const r=`${window.location.origin}${window.location.pathname}?room=${D}`;return Da.value=r,Ke.disabled=!0,Zt.disabled=!1,$f(r,{onCopy:()=>V("Link ready! Share with your partner."),onCancel:()=>{V('Call cancelled. Click "Start New Chat" to try again.'),Gn()}}),V("Waiting for partner to join..."),!0}async function Kf(){const t=Ws();if(!t)return V("Error: Camera not initialized"),!1;if(!D)return V("Error: No room ID"),!1;Pe="joiner";const e=ie(se,`rooms/${D}`),n=await Oh(e);if(!n.exists())return V("Error: Invalid room link"),!1;const s=n.val().offer;if(!s)return V("Error: No offer found"),!1;S=new RTCPeerConnection(ja),S.ondatachannel=o=>{pe=o.channel,J=Ga(a=>pe.send(a)),pe.onopen=()=>{J.showMessagesToggle(),J.appendChatMessage("💬 Chat connected")},pe.onmessage=a=>J.receiveMessage(a.data)},t.getTracks().forEach(o=>{S.addTrack(o,t)}),Ya(S,X,en)&&($a(S,Pe,D),Ka(S),console.debug("Peer connection created as joiner for room ID:",D)),await S.setRemoteDescription(new RTCSessionDescription(s));const r=await S.createAnswer();await S.setLocalDescription(r);try{await ka(e,{answer:{type:r.type,sdp:r.sdp}})}catch(o){return console.error("Failed to update answer in Firebase:",o),V("Failed to send answer to partner."),!1}return Ha(D,Pe,me),qa(),Hs(),V("Connecting..."),!0}let ue=null,ai=null,li=null;function Qf(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Gi(){if(!tn()){if(Ua(!0),Ye.classList.remove("bottom"),Ye.classList.add("watch-mode"),A(Ye),ue&&(ue(),ue=null),!Us()){v(O),Ve(O),xi(tt)||(A(ae),$e(ae));return}v(ae),Ve(ae),xi(X)?(v(O),Ve(O)):Qf()?X.requestPictureInPicture().then(()=>{v(O),Ve(O)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),$e(O),A(O)}):($e(O),A(O))}}function ln(){tn()&&(Ye.classList.remove("watch-mode"),Ye.classList.add("bottom"),ue||(ue=Ma(Ye,{inactivityMs:2500,hideOnEsc:!0})),Us()&&(xi(O)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),Ve(O),A(O)),$e(ae),A(ae),Ua(!1))}let Hs=()=>{if(A(O),$e(ae),v(xa),Ke.disabled=!0,en.disabled=!1,Zt.disabled=!1,ue||(ue=Ma(Ye,{inactivityMs:2500,hideOnEsc:!0})),!ai){const t=()=>{tn()?$e(O):Ve(O),A(O)};X.addEventListener("leavepictureinpicture",t),ai=()=>X.removeEventListener("leavepictureinpicture",t),Vi.push(ai)}if(!li){const t=()=>v(O);X.addEventListener("enterpictureinpicture",t),li=()=>X.removeEventListener("enterpictureinpicture",t),Vi.push(li)}},Vs=()=>{Ve(O),v(O),$e(ae),A(ae),A(xa),Ke.disabled=!1,Zt.disabled=!0,en.disabled=!0,ue&&(ue(),ue=null)};function ci(){return F&&ye&&!ye.classList.contains("hidden")&&F.src&&F.src.trim()!==""}let Kr=!1;function Xf(){if(Kr)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",bt()),console.log("isYTVisible():",ri()),console.log("isSharedVideoVisible():",ci()),console.log("isWatchModeActive():",tn()),bt()==="yt"?ri()?(Fi(),ln()):(Fa(),Gi()):bt()==="url"&&(ci()?(v(ye),ln()):(A(ye),Gi()))),(e.key==="m"||e.key==="M")&&J&&J.toggleMessages()),e.key==="Escape"&&(bt()==="yt"&&ri()?($n(),Fi()):bt()==="url"&&ci()&&(F.pause(),v(ye)),ln())}),Kr=!0}Ke.onclick=async()=>{await jf()};Zt.onclick=Gn;async function Jf(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return V('Ready. Click "Start New Chat" to begin.'),!1;D=e,V("Connecting to room...");const n=await za();let i=!1;return n&&(i=await Kf()),i?!0:(A(Ke),Zt.disabled=!0,Ke.disabled=!1,Yi(),!1)}window.onload=async()=>{if(await Jf())return;if(!await za()){Ke.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}};window.addEventListener("beforeunload",t=>{if(S&&S.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;Zf()});let ui=!1;async function Gn(){if(!ui){if(ui=!0,console.debug("Hanging up..."),X.srcObject&&(X.srcObject.getTracks().forEach(t=>t.stop()),X.srcObject=null),gf(),S&&(S.close(),S=null),Jh(),D&&Pe==="initiator"){const t=ie(se,`rooms/${D}`);Lr(t).catch(e=>{console.warn("Failed to remove room:",e)})}if(Vs(),Rn.forEach(({ref:t,type:e,callback:n})=>Aa(t,e,n)),Rn.length=0,D&&me){const t=ie(se,`rooms/${D}/members/${me}`);Lr(t).catch(()=>{})}document.pictureInPictureElement&&document.exitPictureInPicture().catch(t=>console.error(t)),J&&J.cleanup&&(J.cleanup(),J=null),D=null,Pe=null,$i=null,window.history.replaceState({},document.title,window.location.pathname),V('Disconnected. Click "Start New Chat" to begin.'),ui=!1}}function Zf(){(S||D)&&Gn(),Da.value="",F.src="",ef.textContent="",Hf(),tt.srcObject=null,ln(),wf("none"),Ls(),Oa(!1),Mf(),Vi.forEach(t=>t())}
