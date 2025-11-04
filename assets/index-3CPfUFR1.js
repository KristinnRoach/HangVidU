(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const id="modulepreload",sd=function(n){return"/HangVidU/"+n},Ko={},vc=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var o=l;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(t.map(u=>{if(u=sd(u),u in Ko)return;Ko[u]=!0;const h=u.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":id,h||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((g,m)=>{f.addEventListener("load",g),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};/**
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
 */const rd=()=>{};var Jo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw sn(e)},sn=function(n){return new Error("Firebase Database ("+wc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ec=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},od=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Or={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(d=64)),i.push(t[u],t[h],t[d],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ec(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):od(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const h=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||h==null)throw new ad;const d=r<<2|a>>4;if(i.push(d),l!==64){const f=a<<4&240|l>>2;if(i.push(f),h!==64){const g=l<<6&192|h;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ad extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Cc=function(n){const e=Ec(n);return Or.encodeByteArray(e,!0)},wi=function(n){return Cc(n).replace(/\./g,"")},Ei=function(n){try{return Or.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cd(n){return Ic(void 0,n)}function Ic(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ld(t)||(n[t]=Ic(n[t],e[t]));return n}function ld(n){return n!=="__proto__"}/**
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
 */function ud(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const dd=()=>ud().__FIREBASE_DEFAULTS__,hd=()=>{if(typeof process>"u"||typeof Jo>"u")return;const n=Jo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Ei(n[1]);return e&&JSON.parse(e)},xr=()=>{try{return rd()||dd()||hd()||fd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},bc=n=>xr()?.emulatorHosts?.[n],pd=n=>{const e=bc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Tc=()=>xr()?.config,Sc=n=>xr()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function rn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function kc(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function gd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[wi(JSON.stringify(t)),wi(JSON.stringify(o)),""].join(".")}const wn={};function md(){const n={prod:[],emulator:[]};for(const e of Object.keys(wn))wn[e]?n.emulator.push(e):n.prod.push(e);return n}function _d(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Qo=!1;function Rc(n,e){if(typeof window>"u"||typeof document>"u"||!rn(window.location.host)||wn[n]===e||wn[n]||Qo)return;wn[n]=e;function t(d){return`__firebase__banner__${d}`}const i="__firebase__banner",r=md().prod.length>0;function o(){const d=document.getElementById(i);d&&d.remove()}function a(d){d.style.display="flex",d.style.background="#7faaf0",d.style.position="fixed",d.style.bottom="5px",d.style.left="5px",d.style.padding=".5em",d.style.borderRadius="5px",d.style.alignItems="center"}function c(d,f){d.setAttribute("width","24"),d.setAttribute("id",f),d.setAttribute("height","24"),d.setAttribute("viewBox","0 0 24 24"),d.setAttribute("fill","none"),d.style.marginLeft="-6px"}function l(){const d=document.createElement("span");return d.style.cursor="pointer",d.style.marginLeft="16px",d.style.fontSize="24px",d.innerHTML=" &times;",d.onclick=()=>{Qo=!0,o()},d}function u(d,f){d.setAttribute("id",f),d.innerText="Learn more",d.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",d.setAttribute("target","__blank"),d.style.paddingLeft="5px",d.style.textDecoration="underline"}function h(){const d=_d(i),f=t("text"),g=document.getElementById(f)||document.createElement("span"),m=t("learnmore"),_=document.getElementById(m)||document.createElement("a"),H=t("preprendIcon"),M=document.getElementById(H)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(d.created){const ee=d.element;a(ee),u(_,m);const Lt=l();c(M,H),ee.append(M,g,_,Lt),document.body.appendChild(ee)}r?(g.innerText="Preview backend disconnected.",M.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(M.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,g.innerText="Preview backend running in this workspace."),g.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",h):h()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Mr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(se())}function yd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function vd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Ac(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function wd(){const n=se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ed(){return wc.NODE_ADMIN===!0}function Cd(){try{return typeof indexedDB=="object"}catch{return!1}}function Id(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="FirebaseError";class lt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=bd,Object.setPrototypeOf(this,lt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yn.prototype.create)}}class Yn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Td(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new lt(s,a,i)}}function Td(n,e){return n.replace(Sd,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Sd=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function On(n){return JSON.parse(n)}function G(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=On(Ei(r[0])||""),t=On(Ei(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},kd=function(n){const e=Nc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Rd=function(n){const e=Nc(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Gt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Js(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ci(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Et(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Xo(r)&&Xo(o)){if(!Et(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Xo(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function on(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)i[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let h=0;h<80;h++){h<40?h<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):h<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const d=(s<<5|s>>>27)+l+c+u+i[h]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Nd(n,e){const t=new Pd(n,e);return t.subscribe.bind(t)}class Pd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Ld(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Ss),s.error===void 0&&(s.error=Ss),s.complete===void 0&&(s.complete=Ss);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ld(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ss(){}function es(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ts=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function oe(n){return n&&n._delegate?n._delegate:n}class Ct{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ht="[DEFAULT]";/**
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
 */class Od{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new qn;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Md(e))try{this.getOrInitializeService({instanceIdentifier:ht})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ht){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ht){return this.instances.has(e)}getOptions(e=ht){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:xd(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ht){return this.component?this.component.multipleInstances?e:ht:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xd(n){return n===ht?void 0:n}function Md(n){return n.instantiationMode==="EAGER"}/**
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
 */class Fd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Od(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var A;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(A||(A={}));const Ud={debug:A.DEBUG,verbose:A.VERBOSE,info:A.INFO,warn:A.WARN,error:A.ERROR,silent:A.SILENT},Bd=A.INFO,Wd={[A.DEBUG]:"log",[A.VERBOSE]:"log",[A.INFO]:"info",[A.WARN]:"warn",[A.ERROR]:"error"},Vd=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Wd[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fr{constructor(e){this.name=e,this._logLevel=Bd,this._logHandler=Vd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in A))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ud[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,A.DEBUG,...e),this._logHandler(this,A.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,A.VERBOSE,...e),this._logHandler(this,A.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,A.INFO,...e),this._logHandler(this,A.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,A.WARN,...e),this._logHandler(this,A.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,A.ERROR,...e),this._logHandler(this,A.ERROR,...e)}}const $d=(n,e)=>e.some(t=>n instanceof t);let Zo,ea;function Hd(){return Zo||(Zo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function jd(){return ea||(ea=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Pc=new WeakMap,Qs=new WeakMap,Lc=new WeakMap,ks=new WeakMap,Ur=new WeakMap;function zd(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ze(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Pc.set(t,n)}).catch(()=>{}),Ur.set(e,n),e}function Gd(n){if(Qs.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Qs.set(n,e)}let Xs={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Qs.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Lc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ze(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function qd(n){Xs=n(Xs)}function Yd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Rs(this),e,...t);return Lc.set(i,e.sort?e.sort():[e]),Ze(i)}:jd().includes(n)?function(...e){return n.apply(Rs(this),e),Ze(Pc.get(this))}:function(...e){return Ze(n.apply(Rs(this),e))}}function Kd(n){return typeof n=="function"?Yd(n):(n instanceof IDBTransaction&&Gd(n),$d(n,Hd())?new Proxy(n,Xs):n)}function Ze(n){if(n instanceof IDBRequest)return zd(n);if(ks.has(n))return ks.get(n);const e=Kd(n);return e!==n&&(ks.set(n,e),Ur.set(e,n)),e}const Rs=n=>Ur.get(n);function Jd(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Ze(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Ze(o.result),c.oldVersion,c.newVersion,Ze(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Qd=["get","getKey","getAll","getAllKeys","count"],Xd=["put","add","delete","clear"],As=new Map;function ta(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(As.get(e))return As.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Xd.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Qd.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return As.set(e,r),r}qd(n=>({...n,get:(e,t,i)=>ta(e,t)||n.get(e,t,i),has:(e,t)=>!!ta(e,t)||n.has(e,t)}));/**
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
 */class Zd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(eh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function eh(n){return n.getComponent()?.type==="VERSION"}const Zs="@firebase/app",na="0.14.5";/**
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
 */const xe=new Fr("@firebase/app"),th="@firebase/app-compat",nh="@firebase/analytics-compat",ih="@firebase/analytics",sh="@firebase/app-check-compat",rh="@firebase/app-check",oh="@firebase/auth",ah="@firebase/auth-compat",ch="@firebase/database",lh="@firebase/data-connect",uh="@firebase/database-compat",dh="@firebase/functions",hh="@firebase/functions-compat",fh="@firebase/installations",ph="@firebase/installations-compat",gh="@firebase/messaging",mh="@firebase/messaging-compat",_h="@firebase/performance",yh="@firebase/performance-compat",vh="@firebase/remote-config",wh="@firebase/remote-config-compat",Eh="@firebase/storage",Ch="@firebase/storage-compat",Ih="@firebase/firestore",bh="@firebase/ai",Th="@firebase/firestore-compat",Sh="firebase",kh="12.5.0";/**
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
 */const er="[DEFAULT]",Rh={[Zs]:"fire-core",[th]:"fire-core-compat",[ih]:"fire-analytics",[nh]:"fire-analytics-compat",[rh]:"fire-app-check",[sh]:"fire-app-check-compat",[oh]:"fire-auth",[ah]:"fire-auth-compat",[ch]:"fire-rtdb",[lh]:"fire-data-connect",[uh]:"fire-rtdb-compat",[dh]:"fire-fn",[hh]:"fire-fn-compat",[fh]:"fire-iid",[ph]:"fire-iid-compat",[gh]:"fire-fcm",[mh]:"fire-fcm-compat",[_h]:"fire-perf",[yh]:"fire-perf-compat",[vh]:"fire-rc",[wh]:"fire-rc-compat",[Eh]:"fire-gcs",[Ch]:"fire-gcs-compat",[Ih]:"fire-fst",[Th]:"fire-fst-compat",[bh]:"fire-vertex","fire-js":"fire-js",[Sh]:"fire-js-all"};/**
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
 */const Ii=new Map,Ah=new Map,tr=new Map;function ia(n,e){try{n.container.addComponent(e)}catch(t){xe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function qt(n){const e=n.name;if(tr.has(e))return xe.debug(`There were multiple attempts to register component ${e}.`),!1;tr.set(e,n);for(const t of Ii.values())ia(t,n);for(const t of Ah.values())ia(t,n);return!0}function Br(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function de(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Nh={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},et=new Yn("app","Firebase",Nh);/**
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
 */class Ph{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ct("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw et.create("app-deleted",{appName:this._name})}}/**
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
 */const an=kh;function Dc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:er,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw et.create("bad-app-name",{appName:String(s)});if(t||(t=Tc()),!t)throw et.create("no-options");const r=Ii.get(s);if(r){if(Et(t,r.options)&&Et(i,r.config))return r;throw et.create("duplicate-app",{appName:s})}const o=new Fd(s);for(const c of tr.values())o.addComponent(c);const a=new Ph(t,i,o);return Ii.set(s,a),a}function Oc(n=er){const e=Ii.get(n);if(!e&&n===er&&Tc())return Dc();if(!e)throw et.create("no-app",{appName:n});return e}function tt(n,e,t){let i=Rh[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),xe.warn(o.join(" "));return}qt(new Ct(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Lh="firebase-heartbeat-database",Dh=1,xn="firebase-heartbeat-store";let Ns=null;function xc(){return Ns||(Ns=Jd(Lh,Dh,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xn)}catch(t){console.warn(t)}}}}).catch(n=>{throw et.create("idb-open",{originalErrorMessage:n.message})})),Ns}async function Oh(n){try{const t=(await xc()).transaction(xn),i=await t.objectStore(xn).get(Mc(n));return await t.done,i}catch(e){if(e instanceof lt)xe.warn(e.message);else{const t=et.create("idb-get",{originalErrorMessage:e?.message});xe.warn(t.message)}}}async function sa(n,e){try{const i=(await xc()).transaction(xn,"readwrite");await i.objectStore(xn).put(e,Mc(n)),await i.done}catch(t){if(t instanceof lt)xe.warn(t.message);else{const i=et.create("idb-set",{originalErrorMessage:t?.message});xe.warn(i.message)}}}function Mc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const xh=1024,Mh=30;class Fh{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bh(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=ra();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Mh){const s=Wh(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){xe.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ra(),{heartbeatsToSend:t,unsentEntries:i}=Uh(this._heartbeatsCache.heartbeats),s=wi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return xe.warn(e),""}}}function ra(){return new Date().toISOString().substring(0,10)}function Uh(n,e=xh){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),oa(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),oa(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Bh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Cd()?Id().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Oh(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return sa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return sa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function oa(n){return wi(JSON.stringify({version:2,heartbeats:n})).length}function Wh(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Vh(n){qt(new Ct("platform-logger",e=>new Zd(e),"PRIVATE")),qt(new Ct("heartbeat",e=>new Fh(e),"PRIVATE")),tt(Zs,na,n),tt(Zs,na,"esm2020"),tt("fire-js","")}Vh("");var aa={};const ca="@firebase/database",la="1.1.0";/**
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
 */let Fc="";function $h(n){Fc=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),G(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:On(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Se(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Hh(e)}}catch{}return new jh},gt=Uc("localStorage"),zh=Uc("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=new Fr("@firebase/database"),Gh=(function(){let n=1;return function(){return n++}})(),Bc=function(n){const e=Dd(n),t=new Ad;t.update(e);const i=t.digest();return Or.encodeByteArray(i)},Kn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Kn.apply(null,i):typeof i=="object"?e+=G(i):e+=i,e+=" "}return e};let En=null,ua=!0;const qh=function(n,e){p(!0,"Can't turn on custom loggers persistently."),Mt.logLevel=A.VERBOSE,En=Mt.log.bind(Mt)},J=function(...n){if(ua===!0&&(ua=!1,En===null&&zh.get("logging_enabled")===!0&&qh()),En){const e=Kn.apply(null,n);En(e)}},Jn=function(n){return function(...e){J(n,...e)}},nr=function(...n){const e="FIREBASE INTERNAL ERROR: "+Kn(...n);Mt.error(e)},Me=function(...n){const e=`FIREBASE FATAL ERROR: ${Kn(...n)}`;throw Mt.error(e),new Error(e)},ie=function(...n){const e="FIREBASE WARNING: "+Kn(...n);Mt.warn(e)},Yh=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ie("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Wr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Kh=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Yt="[MIN_NAME]",It="[MAX_NAME]",Rt=function(n,e){if(n===e)return 0;if(n===Yt||e===It)return-1;if(e===Yt||n===It)return 1;{const t=da(n),i=da(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Jh=function(n,e){return n===e?0:n<e?-1:1},pn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+G(e))},Vr=function(n){if(typeof n!="object"||n===null)return G(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=G(e[i]),t+=":",t+=Vr(n[e[i]]);return t+="}",t},Wc=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Q(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Vc=function(n){p(!Wr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let h="";for(c=0;c<64;c+=8){let d=parseInt(u.substr(c,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},Qh=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Xh=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Zh(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const ef=new RegExp("^-?(0*)\\d{1,10}$"),tf=-2147483648,nf=2147483647,da=function(n){if(ef.test(n)){const e=Number(n);if(e>=tf&&e<=nf)return e}return null},cn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw ie("Exception was thrown by user callback.",t),e},Math.floor(0))}},sf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Cn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class rf{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,de(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){ie(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(J("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ie(e)}}class fi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}fi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $r="5",$c="v",Hc="s",jc="r",zc="f",Gc=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,qc="ls",Yc="p",ir="ac",Kc="websocket",Jc="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=gt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&gt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function af(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Xc(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===Kc)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Jc)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);af(n)&&(t.ns=n.namespace);const s=[];return Q(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cf{constructor(){this.counters_={}}incrementCounter(e,t=1){Se(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return cd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ps={},Ls={};function Hr(n){const e=n.toString();return Ps[e]||(Ps[e]=new cf),Ps[e]}function lf(n,e){const t=n.toString();return Ls[t]||(Ls[t]=e()),Ls[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&cn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="start",df="close",hf="pLPCommand",ff="pRTLPCB",Zc="id",el="pw",tl="ser",pf="cb",gf="seg",mf="ts",_f="d",yf="dframe",nl=1870,il=30,vf=nl-il,wf=25e3,Ef=3e4;class Ot{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Jn(e),this.stats_=Hr(t),this.urlFn=c=>(this.appCheckToken&&(c[ir]=this.appCheckToken),Xc(t,Jc,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new uf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ef)),Kh(()=>{if(this.isClosed_)return;this.scriptTagHolder=new jr((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ha)this.id=a,this.password=c;else if(o===df)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[ha]="t",i[tl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[pf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[$c]=$r,this.transportSessionId&&(i[Hc]=this.transportSessionId),this.lastSessionId&&(i[qc]=this.lastSessionId),this.applicationId&&(i[Yc]=this.applicationId),this.appCheckToken&&(i[ir]=this.appCheckToken),typeof location<"u"&&location.hostname&&Gc.test(location.hostname)&&(i[jc]=zc);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ot.forceAllow_=!0}static forceDisallow(){Ot.forceDisallow_=!0}static isAvailable(){return Ot.forceAllow_?!0:!Ot.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Qh()&&!Xh()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=G(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Cc(t),s=Wc(i,vf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[yf]="t",i[Zc]=e,i[el]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=G(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class jr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Gh(),window[hf+this.uniqueCallbackIdentifier]=e,window[ff+this.uniqueCallbackIdentifier]=t,this.myIFrame=jr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){J("frame writing exception"),a.stack&&J(a.stack),J(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||J("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Zc]=this.myID,e[el]=this.myPW,e[tl]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+il+i.length<=nl;){const o=this.pendingSegs.shift();i=i+"&"+gf+s+"="+o.seg+"&"+mf+s+"="+o.ts+"&"+_f+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(wf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{J("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf=16384,If=45e3;let bi=null;typeof MozWebSocket<"u"?bi=MozWebSocket:typeof WebSocket<"u"&&(bi=WebSocket);class he{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Jn(this.connId),this.stats_=Hr(t),this.connURL=he.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[$c]=$r,typeof location<"u"&&location.hostname&&Gc.test(location.hostname)&&(o[jc]=zc),t&&(o[Hc]=t),i&&(o[qc]=i),s&&(o[ir]=s),r&&(o[Yc]=r),Xc(e,Kc,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,gt.set("previous_websocket_failure",!0);try{let i;Ed(),this.mySock=new bi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){he.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&bi!==null&&!he.forceDisallow_}static previouslyFailed(){return gt.isInMemoryStorage||gt.get("previous_websocket_failure")===!0}markConnectionHealthy(){gt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=On(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=G(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Wc(t,Cf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(If))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}he.responsesRequiredToBeHealthy=2;he.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{static get ALL_TRANSPORTS(){return[Ot,he]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=he&&he.isAvailable();let i=t&&!he.previouslyFailed();if(e.webSocketOnly&&(t||ie("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[he];else{const s=this.transports_=[];for(const r of Mn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Mn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Mn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf=6e4,Tf=5e3,Sf=10*1024,kf=100*1024,Ds="t",fa="d",Rf="s",pa="r",Af="e",ga="o",ma="a",_a="n",ya="p",Nf="h";class Pf{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Jn("c:"+this.id+":"),this.transportManager_=new Mn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Cn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>kf?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Sf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ds in e){const t=e[Ds];t===ma?this.upgradeIfSecondaryHealthy_():t===pa?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ga&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=pn("t",e),i=pn("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ya,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ma,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:_a,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=pn("t",e),i=pn("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=pn(Ds,e);if(fa in e){const i=e[fa];if(t===Nf){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===_a){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Rf?this.onConnectionShutdown_(i):t===pa?this.onReset_(i):t===Af?nr("Server Error: "+i):t===ga?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):nr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),$r!==i&&ie("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Cn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(bf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Cn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Tf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ya,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(gt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti extends rl{static getInstance(){return new Ti}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Mr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=32,wa=768;class N{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function S(){return new N("")}function C(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function st(n){return n.pieces_.length-n.pieceNum_}function D(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new N(n.pieces_,e)}function zr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Lf(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Fn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function ol(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new N(e,0)}function V(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof N)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new N(t,0)}function b(n){return n.pieceNum_>=n.pieces_.length}function ne(n,e){const t=C(n),i=C(e);if(t===null)return e;if(t===i)return ne(D(n),D(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Df(n,e){const t=Fn(n,0),i=Fn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Rt(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Gr(n,e){if(st(n)!==st(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function ae(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(st(n)>st(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Of{constructor(e,t){this.errorPrefix_=t,this.parts_=Fn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ts(this.parts_[i]);al(this)}}function xf(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ts(e),al(n)}function Mf(n){const e=n.parts_.pop();n.byteLength_-=ts(e),n.parts_.length>0&&(n.byteLength_-=1)}function al(n){if(n.byteLength_>wa)throw new Error(n.errorPrefix_+"has a key path longer than "+wa+" bytes ("+n.byteLength_+").");if(n.parts_.length>va)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+va+") or object contains a cycle "+ft(n))}function ft(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr extends rl{static getInstance(){return new qr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=1e3,Ff=300*1e3,Ea=30*1e3,Uf=1.3,Bf=3e4,Wf="server_kill",Ca=3;class De extends sl{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=De.nextPersistentConnectionId_++,this.log_=Jn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=gn,this.maxReconnectDelay_=Ff,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");qr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ti.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(G(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new qn,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;De.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Se(e,"w")){const i=Gt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();ie(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Rd(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ea)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=kd(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+G(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):nr("Unrecognized action received from server: "+G(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=gn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=gn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Bf&&(this.reconnectDelay_=gn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Uf)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+De.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(h){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?J("getToken() completed but was canceled"):(J("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new Pf(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{ie(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Wf)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&ie(h),c())}}}interrupt(e){J("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){J("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Js(this.interruptReasons_)&&(this.reconnectDelay_=gn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Vr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new N(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){J("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ca&&(this.reconnectDelay_=Ea,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){J("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ca&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Fc.replace(/\./g,"-")]=1,Mr()?e["framework.cordova"]=1:Ac()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ti.getInstance().currentlyOnline();return Js(this.interruptReasons_)&&e}}De.nextPersistentConnectionId_=0;De.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new I(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new I(Yt,e),s=new I(Yt,t);return this.compare(i,s)!==0}minPost(){return I.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ai;class cl extends ns{static get __EMPTY_NODE(){return ai}static set __EMPTY_NODE(e){ai=e}compare(e,t){return Rt(e.name,t.name)}isDefinedOn(e){throw sn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return I.MIN}maxPost(){return new I(It,ai)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new I(e,ai)}toString(){return".key"}}const Ft=new cl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Y{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Y.RED,this.left=s??re.EMPTY_NODE,this.right=r??re.EMPTY_NODE}copy(e,t,i,s,r){return new Y(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return re.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return re.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Y.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Y.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Y.RED=!0;Y.BLACK=!1;class Vf{copy(e,t,i,s,r){return this}insert(e,t,i){return new Y(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class re{constructor(e,t=re.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new re(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Y.BLACK,null,null))}remove(e){return new re(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Y.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ci(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ci(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ci(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ci(this.root_,null,this.comparator_,!0,e)}}re.EMPTY_NODE=new Vf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(n,e){return Rt(n.name,e.name)}function Yr(n,e){return Rt(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sr;function Hf(n){sr=n}const ll=function(n){return typeof n=="number"?"number:"+Vc(n):"string:"+n},ul=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Se(e,".sv"),"Priority must be a string or number.")}else p(n===sr||n.isEmpty(),"priority of unexpected type.");p(n===sr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ia;class q{static set __childrenNodeConstructor(e){Ia=e}static get __childrenNodeConstructor(){return Ia}constructor(e,t=q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ul(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return b(e)?this:C(e)===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=C(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||st(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,q.__childrenNodeConstructor.EMPTY_NODE.updateChild(D(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ll(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Vc(this.value_):e+=this.value_,this.lazyHash_=Bc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof q.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=q.VALUE_TYPE_ORDER.indexOf(t),r=q.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dl,hl;function jf(n){dl=n}function zf(n){hl=n}class Gf extends ns{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Rt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return I.MIN}maxPost(){return new I(It,new q("[PRIORITY-POST]",hl))}makePost(e,t){const i=dl(e);return new I(t,new q("[PRIORITY-POST]",i))}toString(){return".priority"}}const $=new Gf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf=Math.log(2);class Yf{constructor(e){const t=r=>parseInt(Math.log(r)/qf,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Si=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let h,d;if(u===0)return null;if(u===1)return h=n[c],d=t?t(h):h,new Y(d,h.node,Y.BLACK,null,null);{const f=parseInt(u/2,10)+c,g=s(c,f),m=s(f+1,l);return h=n[f],d=t?t(h):h,new Y(d,h.node,Y.BLACK,g,m)}},r=function(c){let l=null,u=null,h=n.length;const d=function(g,m){const _=h-g,H=h;h-=g;const M=s(_+1,H),ee=n[_],Lt=t?t(ee):ee;f(new Y(Lt,ee.node,m,null,M))},f=function(g){l?(l.left=g,l=g):(u=g,l=g)};for(let g=0;g<c.count;++g){const m=c.nextBitIsOne(),_=Math.pow(2,c.count-(g+1));m?d(_,Y.BLACK):(d(_,Y.BLACK),d(_,Y.RED))}return u},o=new Yf(n.length),a=r(o);return new re(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Os;const Dt={};class Ne{static get Default(){return p(Dt&&$,"ChildrenNode.ts has not been loaded"),Os=Os||new Ne({".priority":Dt},{".priority":$}),Os}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Gt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof re?t:null}hasIndex(e){return Se(this.indexSet_,e.toString())}addIndex(e,t){p(e!==Ft,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(I.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Si(i,e.getCompare()):a=Dt;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Ne(u,l)}addToIndexes(e,t){const i=Ci(this.indexes_,(s,r)=>{const o=Gt(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Dt)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(I.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Si(a,o.getCompare())}else return Dt;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new I(e.name,a))),c.insert(e,e.node)}});return new Ne(i,this.indexSet_)}removeFromIndexes(e,t){const i=Ci(this.indexes_,s=>{if(s===Dt)return s;{const r=t.get(e.name);return r?s.remove(new I(e.name,r)):s}});return new Ne(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mn;class v{static get EMPTY_NODE(){return mn||(mn=new v(new re(Yr),null,Ne.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&ul(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||mn}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?mn:t}}getChild(e){const t=C(e);return t===null?this:this.getImmediateChild(t).getChild(D(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new I(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?mn:this.priorityNode_;return new v(s,o,r)}}updateChild(e,t){const i=C(e);if(i===null)return t;{p(C(e)!==".priority"||st(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(D(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild($,(o,a)=>{t[o]=a.val(e),i++,r&&v.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ll(this.getPriority().val())+":"),this.forEachChild($,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Bc(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new I(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new I(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new I(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,I.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,I.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Qn?-1:0}withIndex(e){if(e===Ft||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Ft||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator($),s=t.getIterator($);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Ft?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Kf extends v{constructor(){super(new re(Yr),v.EMPTY_NODE,Ne.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const Qn=new Kf;Object.defineProperties(I,{MIN:{value:new I(Yt,v.EMPTY_NODE)},MAX:{value:new I(It,Qn)}});cl.__EMPTY_NODE=v.EMPTY_NODE;q.__childrenNodeConstructor=v;Hf(Qn);zf(Qn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf=!0;function z(n,e=null){if(n===null)return v.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new q(t,z(e))}if(!(n instanceof Array)&&Jf){const t=[];let i=!1;if(Q(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=z(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new I(o,c)))}}),t.length===0)return v.EMPTY_NODE;const r=Si(t,$f,o=>o.name,Yr);if(i){const o=Si(t,$.getCompare());return new v(r,z(e),new Ne({".priority":o},{".priority":$}))}else return new v(r,z(e),Ne.Default)}else{let t=v.EMPTY_NODE;return Q(n,(i,s)=>{if(Se(n,i)&&i.substring(0,1)!=="."){const r=z(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(z(e))}}jf(z);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf extends ns{constructor(e){super(),this.indexPath_=e,p(!b(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Rt(e.name,t.name):r}makePost(e,t){const i=z(e),s=v.EMPTY_NODE.updateChild(this.indexPath_,i);return new I(t,s)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,Qn);return new I(It,e)}toString(){return Fn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xf extends ns{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Rt(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return I.MIN}maxPost(){return I.MAX}makePost(e,t){const i=z(e);return new I(t,i)}toString(){return".value"}}const Zf=new Xf;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fl(n){return{type:"value",snapshotNode:n}}function Kt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Un(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Bn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function ep(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kr{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Un(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Kt(t,i)):o.trackChildChange(Bn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild($,(s,r)=>{t.hasChild(s)||i.trackChildChange(Un(s,r))}),t.isLeafNode()||t.forEachChild($,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Bn(s,r,o))}else i.trackChildChange(Kt(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e){this.indexedFilter_=new Kr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Wn.getStartPost_(e),this.endPost_=Wn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new I(t,i))||(i=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=v.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(v.EMPTY_NODE);const r=this;return t.forEachChild($,(o,a)=>{r.matches(new I(o,a))||(s=s.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Wn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new I(t,i))||(i=v.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,f)=>h(f,d)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const c=new I(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=s.getChildAfterChild(this.index_,l,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Bn(t,i,h)),a.updateImmediateChild(t,i);{r?.trackChildChange(Un(t,h));const m=a.updateImmediateChild(t,v.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(Kt(d.name,d.node)),m.updateImmediateChild(d.name,d.node)):m}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Un(l.name,l.node)),r.trackChildChange(Kt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=$}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Yt}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:It}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===$}copy(){const e=new Jr;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function np(n){return n.loadsAllData()?new Kr(n.getIndex()):n.hasLimit()?new tp(n):new Wn(n)}function ba(n){const e={};if(n.isDefault())return e;let t;if(n.index_===$?t="$priority":n.index_===Zf?t="$value":n.index_===Ft?t="$key":(p(n.index_ instanceof Qf,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=G(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=G(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+G(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=G(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+G(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ta(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==$&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki extends sl{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Jn("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=ki.getListenId_(e,i),a={};this.listens_[o]=a;const c=ba(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let h=u;if(l===404&&(h=null,l=null),l===null&&this.onDataUpdate_(r,h,!1,i),Gt(this.listens_,o)===a){let d;l?l===401?d="permission_denied":d="rest_error:"+l:d="ok",s(d,null)}})}unlisten(e,t){const i=ki.getListenId_(e,t);delete this.listens_[i]}get(e){const t=ba(e._queryParams),i=e._path.toString(),s=new qn;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+on(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=On(a.responseText)}catch{ie("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&ie("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ri(){return{value:null,children:new Map}}function pl(n,e,t){if(b(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=C(e);n.children.has(i)||n.children.set(i,Ri());const s=n.children.get(i);e=D(e),pl(s,e,t)}}function rr(n,e,t){n.value!==null?t(e,n.value):sp(n,(i,s)=>{const r=new N(e.toString()+"/"+i);rr(s,r,t)})}function sp(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Q(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa=10*1e3,op=30*1e3,ap=300*1e3;class cp{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new rp(e);const i=Sa+(op-Sa)*Math.random();Cn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Q(e,(s,r)=>{r>0&&Se(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Cn(this.reportStats_.bind(this),Math.floor(Math.random()*2*ap))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ge;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ge||(ge={}));function Qr(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Xr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Zr(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ge.ACK_USER_WRITE,this.source=Qr()}operationForChild(e){if(b(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new N(e));return new Ai(S(),t,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new Ai(D(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,t){this.source=e,this.path=t,this.type=ge.LISTEN_COMPLETE}operationForChild(e){return b(this.path)?new Vn(this.source,S()):new Vn(this.source,D(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ge.OVERWRITE}operationForChild(e){return b(this.path)?new bt(this.source,S(),this.snap.getImmediateChild(e)):new bt(this.source,D(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ge.MERGE}operationForChild(e){if(b(this.path)){const t=this.children.subtree(new N(e));return t.isEmpty()?null:t.value?new bt(this.source,S(),t.value):new Jt(this.source,S(),t)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Jt(this.source,D(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(b(e))return this.isFullyInitialized()&&!this.filtered_;const t=C(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function up(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(ep(o.childName,o.snapshotNode))}),_n(n,s,"child_removed",e,i,t),_n(n,s,"child_added",e,i,t),_n(n,s,"child_moved",r,i,t),_n(n,s,"child_changed",e,i,t),_n(n,s,"value",e,i,t),s}function _n(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>hp(n,a,c)),o.forEach(a=>{const c=dp(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function dp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function hp(n,e,t){if(e.childName==null||t.childName==null)throw sn("Should only compare child_ events.");const i=new I(e.childName,e.snapshotNode),s=new I(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function is(n,e){return{eventCache:n,serverCache:e}}function In(n,e,t,i){return is(new rt(e,t,i),n.serverCache)}function gl(n,e,t,i){return is(n.eventCache,new rt(e,t,i))}function Ni(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Tt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xs;const fp=()=>(xs||(xs=new re(Jh)),xs);class P{static fromObject(e){let t=new P(null);return Q(e,(i,s)=>{t=t.set(new N(i),s)}),t}constructor(e,t=fp()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:S(),value:this.value};if(b(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(D(e),t);return r!=null?{path:V(new N(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(b(e))return this;{const t=C(e),i=this.children.get(t);return i!==null?i.subtree(D(e)):new P(null)}}set(e,t){if(b(e))return new P(t,this.children);{const i=C(e),r=(this.children.get(i)||new P(null)).set(D(e),t),o=this.children.insert(i,r);return new P(this.value,o)}}remove(e){if(b(e))return this.children.isEmpty()?new P(null):new P(null,this.children);{const t=C(e),i=this.children.get(t);if(i){const s=i.remove(D(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new P(null):new P(this.value,r)}else return this}}get(e){if(b(e))return this.value;{const t=C(e),i=this.children.get(t);return i?i.get(D(e)):null}}setTree(e,t){if(b(e))return t;{const i=C(e),r=(this.children.get(i)||new P(null)).setTree(D(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new P(this.value,o)}}fold(e){return this.fold_(S(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(V(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,S(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(b(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(D(e),V(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,S(),t)}foreachOnPath_(e,t,i){if(b(e))return this;{this.value&&i(t,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(D(e),V(t,s),i):new P(null)}}foreach(e){this.foreach_(S(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(V(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.writeTree_=e}static empty(){return new _e(new P(null))}}function bn(n,e,t){if(b(e))return new _e(new P(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ne(s,e);return r=r.updateChild(o,t),new _e(n.writeTree_.set(s,r))}else{const s=new P(t),r=n.writeTree_.setTree(e,s);return new _e(r)}}}function or(n,e,t){let i=n;return Q(t,(s,r)=>{i=bn(i,V(e,s),r)}),i}function ka(n,e){if(b(e))return _e.empty();{const t=n.writeTree_.setTree(e,new P(null));return new _e(t)}}function ar(n,e){return At(n,e)!=null}function At(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(ne(t.path,e)):null}function Ra(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild($,(i,s)=>{e.push(new I(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new I(i,s.value))}),e}function nt(n,e){if(b(e))return n;{const t=At(n,e);return t!=null?new _e(new P(t)):new _e(n.writeTree_.subtree(e))}}function cr(n){return n.writeTree_.isEmpty()}function Qt(n,e){return ml(S(),n.writeTree_,e)}function ml(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=ml(V(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(V(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ss(n,e){return wl(e,n)}function pp(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=bn(n.visibleWrites,e,t)),n.lastWriteId=i}function gp(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=or(n.visibleWrites,e,t),n.lastWriteId=i}function mp(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function _p(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&yp(a,i.path)?s=!1:ae(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return vp(n),!0;if(i.snap)n.visibleWrites=ka(n.visibleWrites,i.path);else{const a=i.children;Q(a,c=>{n.visibleWrites=ka(n.visibleWrites,V(i.path,c))})}return!0}else return!1}function yp(n,e){if(n.snap)return ae(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ae(V(n.path,t),e))return!0;return!1}function vp(n){n.visibleWrites=_l(n.allWrites,wp,S()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function wp(n){return n.visible}function _l(n,e,t){let i=_e.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)ae(t,o)?(a=ne(t,o),i=bn(i,a,r.snap)):ae(o,t)&&(a=ne(o,t),i=bn(i,S(),r.snap.getChild(a)));else if(r.children){if(ae(t,o))a=ne(t,o),i=or(i,a,r.children);else if(ae(o,t))if(a=ne(o,t),b(a))i=or(i,S(),r.children);else{const c=Gt(r.children,C(a));if(c){const l=c.getChild(D(a));i=bn(i,S(),l)}}}else throw sn("WriteRecord should have .snap or .children")}}return i}function yl(n,e,t,i,s){if(!i&&!s){const r=At(n.visibleWrites,e);if(r!=null)return r;{const o=nt(n.visibleWrites,e);if(cr(o))return t;if(t==null&&!ar(o,S()))return null;{const a=t||v.EMPTY_NODE;return Qt(o,a)}}}else{const r=nt(n.visibleWrites,e);if(!s&&cr(r))return t;if(!s&&t==null&&!ar(r,S()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(ae(l.path,e)||ae(e,l.path))},a=_l(n.allWrites,o,e),c=t||v.EMPTY_NODE;return Qt(a,c)}}}function Ep(n,e,t){let i=v.EMPTY_NODE;const s=At(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild($,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=nt(n.visibleWrites,e);return t.forEachChild($,(o,a)=>{const c=Qt(nt(r,new N(o)),a);i=i.updateImmediateChild(o,c)}),Ra(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=nt(n.visibleWrites,e);return Ra(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Cp(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=V(e,t);if(ar(n.visibleWrites,r))return null;{const o=nt(n.visibleWrites,r);return cr(o)?s.getChild(t):Qt(o,s.getChild(t))}}function Ip(n,e,t,i){const s=V(e,t),r=At(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=nt(n.visibleWrites,s);return Qt(o,i.getNode().getImmediateChild(t))}else return null}function bp(n,e){return At(n.visibleWrites,e)}function Tp(n,e,t,i,s,r,o){let a;const c=nt(n.visibleWrites,e),l=At(c,S());if(l!=null)a=l;else if(t!=null)a=Qt(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=d.getNext();for(;f&&u.length<s;)h(f,i)!==0&&u.push(f),f=d.getNext();return u}else return[]}function Sp(){return{visibleWrites:_e.empty(),allWrites:[],lastWriteId:-1}}function Pi(n,e,t,i){return yl(n.writeTree,n.treePath,e,t,i)}function eo(n,e){return Ep(n.writeTree,n.treePath,e)}function Aa(n,e,t,i){return Cp(n.writeTree,n.treePath,e,t,i)}function Li(n,e){return bp(n.writeTree,V(n.treePath,e))}function kp(n,e,t,i,s,r){return Tp(n.writeTree,n.treePath,e,t,i,s,r)}function to(n,e,t){return Ip(n.writeTree,n.treePath,e,t)}function vl(n,e){return wl(V(n.treePath,e),n.writeTree)}function wl(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Bn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Un(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Kt(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Bn(i,e.snapshotNode,s.oldSnap));else throw sn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const El=new Ap;class no{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new rt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return to(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Tt(this.viewCache_),r=kp(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Np(n){return{filter:n}}function Pp(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Lp(n,e,t,i,s){const r=new Rp;let o,a;if(t.type===ge.OVERWRITE){const l=t;l.source.fromUser?o=lr(n,e,l.path,l.snap,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!b(l.path),o=Di(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===ge.MERGE){const l=t;l.source.fromUser?o=Op(n,e,l.path,l.children,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ur(n,e,l.path,l.children,i,s,a,r))}else if(t.type===ge.ACK_USER_WRITE){const l=t;l.revert?o=Fp(n,e,l.path,i,s,r):o=xp(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===ge.LISTEN_COMPLETE)o=Mp(n,e,t.path,i,r);else throw sn("Unknown operation type: "+t.type);const c=r.getChanges();return Dp(e,o,c),{viewCache:o,changes:c}}function Dp(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Ni(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(fl(Ni(e)))}}function Cl(n,e,t,i,s,r){const o=e.eventCache;if(Li(i,t)!=null)return e;{let a,c;if(b(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Tt(e),u=l instanceof v?l:v.EMPTY_NODE,h=eo(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const l=Pi(i,Tt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=C(t);if(l===".priority"){p(st(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const h=Aa(i,t,u,c);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=D(t);let h;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const d=Aa(i,t,o.getNode(),c);d!=null?h=o.getNode().getImmediateChild(l).updateChild(u,d):h=o.getNode().getImmediateChild(l)}else h=to(i,l,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),l,h,u,s,r):a=o.getNode()}}return In(e,a,o.isFullyInitialized()||b(t),n.filter.filtersNodes())}}function Di(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(b(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=C(t);if(!c.isCompleteForPath(t)&&st(t)>1)return e;const g=D(t),_=c.getNode().getImmediateChild(f).updateChild(g,i);f===".priority"?l=u.updatePriority(c.getNode(),_):l=u.updateChild(c.getNode(),f,_,g,El,null)}const h=gl(e,l,c.isFullyInitialized()||b(t),u.filtersNodes()),d=new no(s,h,r);return Cl(n,h,t,s,d,a)}function lr(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new no(s,e,r);if(b(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=In(e,l,!0,n.filter.filtersNodes());else{const h=C(t);if(h===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=In(e,l,a.isFullyInitialized(),a.isFiltered());else{const d=D(t),f=a.getNode().getImmediateChild(h);let g;if(b(d))g=i;else{const m=u.getCompleteChild(h);m!=null?zr(d)===".priority"&&m.getChild(ol(d)).isEmpty()?g=m:g=m.updateChild(d,i):g=v.EMPTY_NODE}if(f.equals(g))c=e;else{const m=n.filter.updateChild(a.getNode(),h,g,d,u,o);c=In(e,m,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function Na(n,e){return n.eventCache.isCompleteForChild(e)}function Op(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=V(t,c);Na(e,C(u))&&(a=lr(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=V(t,c);Na(e,C(u))||(a=lr(n,a,u,l,s,r,o))}),a}function Pa(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function ur(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;b(t)?l=i:l=new P(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),g=Pa(n,f,d);c=Di(n,c,new N(h),g,s,r,o,a)}}),l.children.inorderTraversal((h,d)=>{const f=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!f){const g=e.serverCache.getNode().getImmediateChild(h),m=Pa(n,g,d);c=Di(n,c,new N(h),m,s,r,o,a)}}),c}function xp(n,e,t,i,s,r,o){if(Li(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(b(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Di(n,e,t,c.getNode().getChild(t),s,r,a,o);if(b(t)){let l=new P(null);return c.getNode().forEachChild(Ft,(u,h)=>{l=l.set(new N(u),h)}),ur(n,e,t,l,s,r,a,o)}else return e}else{let l=new P(null);return i.foreach((u,h)=>{const d=V(t,u);c.isCompleteForPath(d)&&(l=l.set(u,c.getNode().getChild(d)))}),ur(n,e,t,l,s,r,a,o)}}function Mp(n,e,t,i,s){const r=e.serverCache,o=gl(e,r.getNode(),r.isFullyInitialized()||b(t),r.isFiltered());return Cl(n,o,t,i,El,s)}function Fp(n,e,t,i,s,r){let o;if(Li(i,t)!=null)return e;{const a=new no(i,e,s),c=e.eventCache.getNode();let l;if(b(t)||C(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Pi(i,Tt(e));else{const h=e.serverCache.getNode();p(h instanceof v,"serverChildren would be complete if leaf node"),u=eo(i,h)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=C(t);let h=to(i,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=c.getImmediateChild(u)),h!=null?l=n.filter.updateChild(c,u,h,D(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,v.EMPTY_NODE,D(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Pi(i,Tt(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Li(i,S())!=null,In(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Kr(i.getIndex()),r=np(i);this.processor_=Np(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new rt(c,o.isFullyInitialized(),s.filtersNodes()),h=new rt(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=is(h,u),this.eventGenerator_=new lp(this.query_)}get query(){return this.query_}}function Bp(n){return n.viewCache_.serverCache.getNode()}function Wp(n){return Ni(n.viewCache_)}function Vp(n,e){const t=Tt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!b(e)&&!t.getImmediateChild(C(e)).isEmpty())?t.getChild(e):null}function La(n){return n.eventRegistrations_.length===0}function $p(n,e){n.eventRegistrations_.push(e)}function Da(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Oa(n,e,t,i){e.type===ge.MERGE&&e.source.queryId!==null&&(p(Tt(n.viewCache_),"We should always have a full cache before handling merges"),p(Ni(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Lp(n.processor_,s,e,t,i);return Pp(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Il(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Hp(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild($,(r,o)=>{i.push(Kt(r,o))}),t.isFullyInitialized()&&i.push(fl(t.getNode())),Il(n,i,t.getNode(),e)}function Il(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return up(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Oi;class bl{constructor(){this.views=new Map}}function jp(n){p(!Oi,"__referenceConstructor has already been defined"),Oi=n}function zp(){return p(Oi,"Reference.ts has not been loaded"),Oi}function Gp(n){return n.views.size===0}function io(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Oa(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Oa(o,e,t,i));return r}}function Tl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Pi(t,s?i:null),c=!1;a?c=!0:i instanceof v?(a=eo(t,i),c=!1):(a=v.EMPTY_NODE,c=!1);const l=is(new rt(a,c,!1),new rt(i,s,!1));return new Up(e,l)}return o}function qp(n,e,t,i,s,r){const o=Tl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),$p(o,t),Hp(o,t)}function Yp(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ot(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(Da(l,t,i)),La(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(Da(c,t,i)),La(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!ot(n)&&r.push(new(zp())(e._repo,e._path)),{removed:r,events:o}}function Sl(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function it(n,e){let t=null;for(const i of n.views.values())t=t||Vp(i,e);return t}function kl(n,e){if(e._queryParams.loadsAllData())return rs(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Rl(n,e){return kl(n,e)!=null}function ot(n){return rs(n)!=null}function rs(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi;function Kp(n){p(!xi,"__referenceConstructor has already been defined"),xi=n}function Jp(){return p(xi,"Reference.ts has not been loaded"),xi}let Qp=1;class xa{constructor(e){this.listenProvider_=e,this.syncPointTree_=new P(null),this.pendingWriteTree_=Sp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Al(n,e,t,i,s){return pp(n.pendingWriteTree_,e,t,i,s),s?ln(n,new bt(Qr(),e,t)):[]}function Xp(n,e,t,i){gp(n.pendingWriteTree_,e,t,i);const s=P.fromObject(t);return ln(n,new Jt(Qr(),e,s))}function Ye(n,e,t=!1){const i=mp(n.pendingWriteTree_,e);if(_p(n.pendingWriteTree_,e)){let r=new P(null);return i.snap!=null?r=r.set(S(),!0):Q(i.children,o=>{r=r.set(new N(o),!0)}),ln(n,new Ai(i.path,r,t))}else return[]}function Xn(n,e,t){return ln(n,new bt(Xr(),e,t))}function Zp(n,e,t){const i=P.fromObject(t);return ln(n,new Jt(Xr(),e,i))}function eg(n,e){return ln(n,new Vn(Xr(),e))}function tg(n,e,t){const i=ro(n,t);if(i){const s=oo(i),r=s.path,o=s.queryId,a=ne(r,e),c=new Vn(Zr(o),a);return ao(n,r,c)}else return[]}function Mi(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Rl(o,e))){const c=Yp(o,e,t,i);Gp(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,f)=>ot(f));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=sg(d);for(let g=0;g<f.length;++g){const m=f[g],_=m.query,H=Dl(n,m);n.listenProvider_.startListening(Tn(_),$n(n,_),H.hashFn,H.onComplete)}}}!h&&l.length>0&&!i&&(u?n.listenProvider_.stopListening(Tn(e),null):l.forEach(d=>{const f=n.queryToTagMap.get(os(d));n.listenProvider_.stopListening(Tn(d),f)}))}rg(n,l)}return a}function Nl(n,e,t,i){const s=ro(n,i);if(s!=null){const r=oo(s),o=r.path,a=r.queryId,c=ne(o,e),l=new bt(Zr(a),c,t);return ao(n,o,l)}else return[]}function ng(n,e,t,i){const s=ro(n,i);if(s){const r=oo(s),o=r.path,a=r.queryId,c=ne(o,e),l=P.fromObject(t),u=new Jt(Zr(a),c,l);return ao(n,o,u)}else return[]}function dr(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(d,f)=>{const g=ne(d,s);r=r||it(f,g),o=o||ot(f)});let a=n.syncPointTree_.get(s);a?(o=o||ot(a),r=r||it(a,S())):(a=new bl,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=v.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,g)=>{const m=it(g,S());m&&(r=r.updateImmediateChild(f,m))}));const l=Rl(a,e);if(!l&&!e._queryParams.loadsAllData()){const d=os(e);p(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=og();n.queryToTagMap.set(d,f),n.tagToQueryMap.set(f,d)}const u=ss(n.pendingWriteTree_,s);let h=qp(a,e,t,u,r,c);if(!l&&!o&&!i){const d=kl(a,e);h=h.concat(ag(n,e,d))}return h}function so(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=ne(o,e),l=it(a,c);if(l)return l});return yl(s,e,r,t,!0)}function ig(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const h=ne(l,t);i=i||it(u,h)});let s=n.syncPointTree_.get(t);s?i=i||it(s,S()):(s=new bl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new rt(i,!0,!1):null,a=ss(n.pendingWriteTree_,e._path),c=Tl(s,e,a,r?o.getNode():v.EMPTY_NODE,r);return Wp(c)}function ln(n,e){return Pl(e,n.syncPointTree_,null,ss(n.pendingWriteTree_,S()))}function Pl(n,e,t,i){if(b(n.path))return Ll(n,e,t,i);{const s=e.get(S());t==null&&s!=null&&(t=it(s,S()));let r=[];const o=C(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=vl(i,o);r=r.concat(Pl(a,c,l,u))}return s&&(r=r.concat(io(s,n,i,t))),r}}function Ll(n,e,t,i){const s=e.get(S());t==null&&s!=null&&(t=it(s,S()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=vl(i,o),u=n.operationForChild(o);u&&(r=r.concat(Ll(u,a,c,l)))}),s&&(r=r.concat(io(s,n,i,t))),r}function Dl(n,e){const t=e.query,i=$n(n,t);return{hashFn:()=>(Bp(e)||v.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?tg(n,t._path,i):eg(n,t._path);{const r=Zh(s,t);return Mi(n,t,null,r)}}}}function $n(n,e){const t=os(e);return n.queryToTagMap.get(t)}function os(n){return n._path.toString()+"$"+n._queryIdentifier}function ro(n,e){return n.tagToQueryMap.get(e)}function oo(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new N(n.substr(0,e))}}function ao(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=ss(n.pendingWriteTree_,e);return io(i,t,s,null)}function sg(n){return n.fold((e,t,i)=>{if(t&&ot(t))return[rs(t)];{let s=[];return t&&(s=Sl(t)),Q(i,(r,o)=>{s=s.concat(o)}),s}})}function Tn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Jp())(n._repo,n._path):n}function rg(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=os(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function og(){return Qp++}function ag(n,e,t){const i=e._path,s=$n(n,e),r=Dl(n,t),o=n.listenProvider_.startListening(Tn(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!ot(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,h)=>{if(!b(l)&&u&&ot(u))return[rs(u).query];{let d=[];return u&&(d=d.concat(Sl(u).map(f=>f.query))),Q(h,(f,g)=>{d=d.concat(g)}),d}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening(Tn(u),$n(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new co(t)}node(){return this.node_}}class lo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=V(this.path_,e);return new lo(this.syncTree_,t)}node(){return so(this.syncTree_,this.path_)}}const cg=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ma=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return lg(n[".sv"],e,t);if(typeof n[".sv"]=="object")return ug(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},lg=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},ug=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Ol=function(n,e,t,i){return uo(e,new lo(t,n),i)},xl=function(n,e,t){return uo(n,new co(e),t)};function uo(n,e,t){const i=n.getPriority().val(),s=Ma(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ma(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new q(a,z(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new q(s))),o.forEachChild($,(a,c)=>{const l=uo(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function fo(n,e){let t=e instanceof N?e:new N(e),i=n,s=C(t);for(;s!==null;){const r=Gt(i.node.children,s)||{children:{},childCount:0};i=new ho(s,i,r),t=D(t),s=C(t)}return i}function un(n){return n.node.value}function Ml(n,e){n.node.value=e,hr(n)}function Fl(n){return n.node.childCount>0}function dg(n){return un(n)===void 0&&!Fl(n)}function as(n,e){Q(n.node.children,(t,i)=>{e(new ho(t,n,i))})}function Ul(n,e,t,i){t&&e(n),as(n,s=>{Ul(s,e,!0)})}function hg(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Zn(n){return new N(n.parent===null?n.name:Zn(n.parent)+"/"+n.name)}function hr(n){n.parent!==null&&fg(n.parent,n.name,n)}function fg(n,e,t){const i=dg(t),s=Se(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,hr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,hr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg=/[\[\].#$\/\u0000-\u001F\u007F]/,gg=/[\[\].#$\u0000-\u001F\u007F]/,Ms=10*1024*1024,po=function(n){return typeof n=="string"&&n.length!==0&&!pg.test(n)},Bl=function(n){return typeof n=="string"&&n.length!==0&&!gg.test(n)},mg=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Bl(n)},_g=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Wr(n)||n&&typeof n=="object"&&Se(n,".sv")},Wl=function(n,e,t,i){i&&e===void 0||cs(es(n,"value"),e,t)},cs=function(n,e,t){const i=t instanceof N?new Of(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ft(i));if(typeof e=="function")throw new Error(n+"contains a function "+ft(i)+" with contents = "+e.toString());if(Wr(e))throw new Error(n+"contains "+e.toString()+" "+ft(i));if(typeof e=="string"&&e.length>Ms/3&&ts(e)>Ms)throw new Error(n+"contains a string greater than "+Ms+" utf8 bytes "+ft(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Q(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!po(o)))throw new Error(n+" contains an invalid key ("+o+") "+ft(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);xf(i,o),cs(n,a,i),Mf(i)}),s&&r)throw new Error(n+' contains ".value" child '+ft(i)+" in addition to actual children.")}},yg=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Fn(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!po(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Df);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&ae(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},vg=function(n,e,t,i){const s=es(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Q(e,(o,a)=>{const c=new N(o);if(cs(s,a,V(t,c)),zr(c)===".priority"&&!_g(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),yg(s,r)},Vl=function(n,e,t,i){if(!Bl(t))throw new Error(es(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},wg=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Vl(n,e,t)},go=function(n,e){if(C(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Eg=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!po(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!mg(t))throw new Error(es(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ls(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Gr(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function $l(n,e,t){ls(n,t),Hl(n,i=>Gr(i,e))}function ue(n,e,t){ls(n,t),Hl(n,i=>ae(i,e)||ae(e,i))}function Hl(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Ig(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Ig(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();En&&J("event: "+t.toString()),cn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg="repo_interrupt",Tg=25;class Sg{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Cg,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ri(),this.transactionQueueTree_=new ho,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function kg(n,e,t){if(n.stats_=Hr(n.repoInfo_),n.forceRestClient_||sf())n.server_=new ki(n.repoInfo_,(i,s,r,o)=>{Fa(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Ua(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{G(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new De(n.repoInfo_,e,(i,s,r,o)=>{Fa(n,i,s,r,o)},i=>{Ua(n,i)},i=>{Rg(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=lf(n.repoInfo_,()=>new cp(n.stats_,n.server_)),n.infoData_=new ip,n.infoSyncTree_=new xa({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=Xn(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),mo(n,"connected",!1),n.serverSyncTree_=new xa({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);ue(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function jl(n){const t=n.infoData_.getNode(new N(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function us(n){return cg({timestamp:jl(n)})}function Fa(n,e,t,i,s){n.dataUpdateCount++;const r=new N(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Ci(t,l=>z(l));o=ng(n.serverSyncTree_,r,c,s)}else{const c=z(t);o=Nl(n.serverSyncTree_,r,c,s)}else if(i){const c=Ci(t,l=>z(l));o=Zp(n.serverSyncTree_,r,c)}else{const c=z(t);o=Xn(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Xt(n,r)),ue(n.eventQueue_,a,o)}function Ua(n,e){mo(n,"connected",e),e===!1&&Lg(n)}function Rg(n,e){Q(e,(t,i)=>{mo(n,t,i)})}function mo(n,e,t){const i=new N("/.info/"+e),s=z(t);n.infoData_.updateSnapshot(i,s);const r=Xn(n.infoSyncTree_,i,s);ue(n.eventQueue_,i,r)}function _o(n){return n.nextWriteId_++}function Ag(n,e,t){const i=ig(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=z(s).withIndex(e._queryParams.getIndex());dr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Xn(n.serverSyncTree_,e._path,r);else{const a=$n(n.serverSyncTree_,e);o=Nl(n.serverSyncTree_,e._path,r,a)}return ue(n.eventQueue_,e._path,o),Mi(n.serverSyncTree_,e,t,null,!0),r},s=>(ei(n,"get for query "+G(e)+" failed: "+s),Promise.reject(new Error(s))))}function Ng(n,e,t,i,s){ei(n,"set",{path:e.toString(),value:t,priority:i});const r=us(n),o=z(t,i),a=so(n.serverSyncTree_,e),c=xl(o,a,r),l=_o(n),u=Al(n.serverSyncTree_,e,c,l,!0);ls(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,f)=>{const g=d==="ok";g||ie("set at "+e+" failed: "+d);const m=Ye(n.serverSyncTree_,l,!g);ue(n.eventQueue_,e,m),fr(n,s,d,f)});const h=vo(n,e);Xt(n,h),ue(n.eventQueue_,h,[])}function Pg(n,e,t,i){ei(n,"update",{path:e.toString(),value:t});let s=!0;const r=us(n),o={};if(Q(t,(a,c)=>{s=!1,o[a]=Ol(V(e,a),z(c),n.serverSyncTree_,r)}),s)J("update() called with empty data.  Don't do anything."),fr(n,i,"ok",void 0);else{const a=_o(n),c=Xp(n.serverSyncTree_,e,o,a);ls(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,u)=>{const h=l==="ok";h||ie("update at "+e+" failed: "+l);const d=Ye(n.serverSyncTree_,a,!h),f=d.length>0?Xt(n,e):e;ue(n.eventQueue_,f,d),fr(n,i,l,u)}),Q(t,l=>{const u=vo(n,V(e,l));Xt(n,u)}),ue(n.eventQueue_,e,[])}}function Lg(n){ei(n,"onDisconnectEvents");const e=us(n),t=Ri();rr(n.onDisconnect_,S(),(s,r)=>{const o=Ol(s,r,n.serverSyncTree_,e);pl(t,s,o)});let i=[];rr(t,S(),(s,r)=>{i=i.concat(Xn(n.serverSyncTree_,s,r));const o=vo(n,s);Xt(n,o)}),n.onDisconnect_=Ri(),ue(n.eventQueue_,S(),i)}function Dg(n,e,t){let i;C(e._path)===".info"?i=dr(n.infoSyncTree_,e,t):i=dr(n.serverSyncTree_,e,t),$l(n.eventQueue_,e._path,i)}function zl(n,e,t){let i;C(e._path)===".info"?i=Mi(n.infoSyncTree_,e,t):i=Mi(n.serverSyncTree_,e,t),$l(n.eventQueue_,e._path,i)}function Og(n){n.persistentConnection_&&n.persistentConnection_.interrupt(bg)}function ei(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),J(t,...e)}function fr(n,e,t,i){e&&cn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Gl(n,e,t){return so(n.serverSyncTree_,e,t)||v.EMPTY_NODE}function yo(n,e=n.transactionQueueTree_){if(e||ds(n,e),un(e)){const t=Yl(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&xg(n,Zn(e),t)}else Fl(e)&&as(e,t=>{yo(n,t)})}function xg(n,e,t){const i=t.map(l=>l.currentWriteId),s=Gl(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=ne(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{ei(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(Ye(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();ds(n,fo(n.transactionQueueTree_,e)),yo(n,n.transactionQueueTree_),ue(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)cn(h[d])}else{if(l==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{ie("transaction at "+c.toString()+" failed: "+l);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=l}Xt(n,e)}},o)}function Xt(n,e){const t=ql(n,e),i=Zn(t),s=Yl(n,t);return Mg(n,s,i),i}function Mg(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=ne(t,c.path);let u=!1,h;if(p(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,h=c.abortReason,s=s.concat(Ye(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Tg)u=!0,h="maxretry",s=s.concat(Ye(n.serverSyncTree_,c.currentWriteId,!0));else{const d=Gl(n,c.path,o);c.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){cs("transaction failed: Data returned ",f,c.path);let g=z(f);typeof f=="object"&&f!=null&&Se(f,".priority")||(g=g.updatePriority(d.getPriority()));const _=c.currentWriteId,H=us(n),M=xl(g,d,H);c.currentOutputSnapshotRaw=g,c.currentOutputSnapshotResolved=M,c.currentWriteId=_o(n),o.splice(o.indexOf(_),1),s=s.concat(Al(n.serverSyncTree_,c.path,M,c.currentWriteId,c.applyLocally)),s=s.concat(Ye(n.serverSyncTree_,_,!0))}else u=!0,h="nodata",s=s.concat(Ye(n.serverSyncTree_,c.currentWriteId,!0))}ue(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(d){setTimeout(d,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}ds(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)cn(i[a]);yo(n,n.transactionQueueTree_)}function ql(n,e){let t,i=n.transactionQueueTree_;for(t=C(e);t!==null&&un(i)===void 0;)i=fo(i,t),e=D(e),t=C(e);return i}function Yl(n,e){const t=[];return Kl(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Kl(n,e,t){const i=un(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);as(e,s=>{Kl(n,s,t)})}function ds(n,e){const t=un(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ml(e,t.length>0?t:void 0)}as(e,i=>{ds(n,i)})}function vo(n,e){const t=Zn(ql(n,e)),i=fo(n.transactionQueueTree_,e);return hg(i,s=>{Fs(n,s)}),Fs(n,i),Ul(i,s=>{Fs(n,s)}),t}function Fs(n,e){const t=un(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Ye(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ml(e,void 0):t.length=r+1,ue(n.eventQueue_,Zn(e),s);for(let o=0;o<i.length;o++)cn(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fg(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Ug(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):ie(`Invalid query segment '${t}' in query '${n}'`)}return e}const Ba=function(n,e){const t=Bg(n),i=t.namespace;t.domain==="firebase.com"&&Me(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Me("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Yh();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Qc(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new N(t.pathString)}},Bg=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(s=Fg(n.substring(u,h)));const d=Ug(n.substring(Math.min(n.length,h)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const g=e.indexOf(".");i=e.substring(0,g).toLowerCase(),t=e.substring(g+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Wg=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Wa.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Wa.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+G(this.snapshot.exportVal())}}class Ql{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Eo{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return b(this._path)?null:zr(this._path)}get ref(){return new ke(this._repo,this._path)}get _queryIdentifier(){const e=Ta(this._queryParams),t=Vr(e);return t==="{}"?"default":t}get _queryObject(){return Ta(this._queryParams)}isEqual(e){if(e=oe(e),!(e instanceof Eo))return!1;const t=this._repo===e._repo,i=Gr(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Lf(this._path)}}class ke extends Eo{constructor(e,t){super(e,t,new Jr,!1)}get parent(){const e=ol(this._path);return e===null?null:new ke(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Zt{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new N(e),i=en(this.ref,e);return new Zt(this._node.getChild(t),i,$)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Zt(s,en(this.ref,i),$)))}hasChild(e){const t=new N(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function O(n,e){return n=oe(n),n._checkNotDeleted("ref"),e!==void 0?en(n._root,e):n._root}function en(n,e){return n=oe(n),C(n._path)===null?wg("child","path",e):Vl("child","path",e),new ke(n._repo,V(n._path,e))}function Vg(n,e){n=oe(n),go("push",n._path),Wl("push",e,n._path,!0);const t=jl(n._repo),i=Wg(t),s=en(n,i),r=en(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function ti(n){return go("remove",n._path),at(n,null)}function at(n,e){n=oe(n),go("set",n._path),Wl("set",e,n._path,!1);const t=new qn;return Ng(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Xl(n,e){vg("update",e,n._path);const t=new qn;return Pg(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function tn(n){n=oe(n);const e=new wo(()=>{}),t=new ni(e);return Ag(n._repo,n,t).then(i=>new Zt(i,new ke(n._repo,n._path),n._queryParams.getIndex()))}class ni{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Jl("value",this,new Zt(e.snapshotNode,new ke(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ql(this,e,t):null}matches(e){return e instanceof ni?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class hs{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ql(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=en(new ke(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Jl(e.type,this,new Zt(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof hs?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Co(n,e,t,i,s){const r=new wo(t,void 0),o=e==="value"?new ni(r):new hs(e,r);return Dg(n._repo,n,o),()=>zl(n._repo,n,o)}function $g(n,e,t,i){return Co(n,"value",e)}function pr(n,e,t,i){return Co(n,"child_added",e)}function Va(n,e,t,i){return Co(n,"child_removed",e)}function Sn(n,e,t){let i=null;const s=t?new wo(t):null;e==="value"?i=new ni(s):e&&(i=new hs(e,s)),zl(n._repo,n,i)}jp(ke);Kp(ke);/**
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
 */const Hg="FIREBASE_DATABASE_EMULATOR_HOST",gr={};let jg=!1;function zg(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=rn(r);n.repoInfo_=new Qc(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Gg(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Me("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),J("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Ba(r,s),a=o.repoInfo,c;typeof process<"u"&&aa&&(c=aa[Hg]),c?(r=`http://${c}?ns=${a.namespace}`,o=Ba(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new of(n.name,n.options,e);Eg("Invalid Firebase Database URL",o),b(o.path)||Me("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Yg(a,n,l,new rf(n,t));return new Kg(u,n)}function qg(n,e){const t=gr[e];(!t||t[n.key]!==n)&&Me(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Og(n),delete t[n.key]}function Yg(n,e,t,i){let s=gr[e.name];s||(s={},gr[e.name]=s);let r=s[n.toURLString()];return r&&Me("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Sg(n,jg,t,i),s[n.toURLString()]=r,r}class Kg{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(kg(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ke(this._repo,S())),this._rootInternal}_delete(){return this._rootInternal!==null&&(qg(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Me("Cannot call "+e+" on a deleted database.")}}function Jg(n=Oc(),e){const t=Br(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=pd("database");i&&Qg(t,...i)}return t}function Qg(n,e,t,i={}){n=oe(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Et(i,r.repoInfo_.emulatorOptions))return;Me("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Me('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new fi(fi.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:gd(i.mockUserToken,n.app.options.projectId);o=new fi(a)}rn(e)&&(kc(e),Rc("Database",!0)),zg(r,s,i,o)}/**
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
 */function Xg(n){$h(an),qt(new Ct("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Gg(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),tt(ca,la,n),tt(ca,la,"esm2020")}De.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};De.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Xg();var Zg="firebase",em="12.5.0";/**
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
 */tt(Zg,em,"app");const tm={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Zl=Dc(tm),x=Jg(Zl),mr=[];function eu(n,e,t){return mr.push({ref:n,type:e,callback:t}),()=>Sn(n,e,t)}function nm(){mr.forEach(({ref:n,type:e,callback:t})=>{try{Sn(n,e,t)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),mr.length=0}function tu(n,e){$g(n,e),eu(n,"value",e)}const im=n=>O(x,`rooms/${n}`);function nu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const sm=nu,iu=new Yn("auth","Firebase",nu());/**
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
 */const Fi=new Fr("@firebase/auth");function rm(n,...e){Fi.logLevel<=A.WARN&&Fi.warn(`Auth (${an}): ${n}`,...e)}function pi(n,...e){Fi.logLevel<=A.ERROR&&Fi.error(`Auth (${an}): ${n}`,...e)}/**
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
 */function Te(n,...e){throw bo(n,...e)}function ye(n,...e){return bo(n,...e)}function Io(n,e,t){const i={...sm(),[e]:t};return new Yn("auth","Firebase",i).create(e,{appName:n.name})}function vt(n){return Io(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function om(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&Te(n,"argument-error"),Io(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function bo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return iu.create(n,...e)}function w(n,e,...t){if(!n)throw bo(e,...t)}function Pe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw pi(e),new Error(e)}function Fe(n,e){n||Pe(e)}/**
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
 */function _r(){return typeof self<"u"&&self.location?.href||""}function am(){return $a()==="http:"||$a()==="https:"}function $a(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function cm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(am()||vd()||"connection"in navigator)?navigator.onLine:!0}function lm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,Fe(t>e,"Short delay should be less than long delay!"),this.isMobile=Mr()||Ac()}get(){return cm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function To(n,e){Fe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class su{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const um={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const dm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],hm=new ii(3e4,6e4);function So(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function dn(n,e,t,i,s={}){return ru(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=on({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return yd()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&rn(n.emulatorConfig.host)&&(l.credentials="include"),su.fetch()(await ou(n,n.config.apiHost,t,a),l)})}async function ru(n,e,t){n._canInitEmulator=!1;const i={...um,...e};try{const s=new pm(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw li(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw li(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw li(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw li(n,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Io(n,u,l);Te(n,u)}}catch(s){if(s instanceof lt)throw s;Te(n,"network-request-failed",{message:String(s)})}}async function fm(n,e,t,i,s={}){const r=await dn(n,e,t,i,s);return"mfaPendingCredential"in r&&Te(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function ou(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?To(n.config,s):`${n.config.apiScheme}://${s}`;return dm.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class pm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ye(this.auth,"network-request-failed")),hm.get())})}}function li(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ye(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function gm(n,e){return dn(n,"POST","/v1/accounts:delete",e)}async function Ui(n,e){return dn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function kn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function mm(n,e=!1){const t=oe(n),i=await t.getIdToken(e),s=ko(i);w(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:kn(Us(s.auth_time)),issuedAtTime:kn(Us(s.iat)),expirationTime:kn(Us(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Us(n){return Number(n)*1e3}function ko(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return pi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ei(t);return s?JSON.parse(s):(pi("Failed to decode base64 JWT payload"),null)}catch(s){return pi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Ha(n){const e=ko(n);return w(e,"internal-error"),w(typeof e.exp<"u","internal-error"),w(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Hn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof lt&&_m(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function _m({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class ym{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class yr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=kn(this.lastLoginAt),this.creationTime=kn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Bi(n){const e=n.auth,t=await n.getIdToken(),i=await Hn(n,Ui(e,{idToken:t}));w(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?au(s.providerUserInfo):[],o=wm(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new yr(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function vm(n){const e=oe(n);await Bi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function wm(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function au(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Em(n,e){const t=await ru(n,{},async()=>{const i=on({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await ou(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&rn(n.emulatorConfig.host)&&(c.credentials="include"),su.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Cm(n,e){return dn(n,"POST","/v2/accounts:revokeToken",So(n,e))}/**
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
 */class Ut{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){w(e.idToken,"internal-error"),w(typeof e.idToken<"u","internal-error"),w(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ha(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){w(e.length!==0,"internal-error");const t=Ha(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(w(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Em(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Ut;return i&&(w(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(w(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(w(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ut,this.toJSON())}_performRefresh(){return Pe("not implemented")}}/**
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
 */function $e(n,e){w(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class me{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new ym(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new yr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Hn(this,this.stsTokenManager.getToken(this.auth,e));return w(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return mm(this,e)}reload(){return vm(this)}_assign(e){this!==e&&(w(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new me({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){w(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Bi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(de(this.auth.app))return Promise.reject(vt(this.auth));const e=await this.getIdToken();return await Hn(this,gm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:h,emailVerified:d,isAnonymous:f,providerData:g,stsTokenManager:m}=t;w(h&&m,e,"internal-error");const _=Ut.fromJSON(this.name,m);w(typeof h=="string",e,"internal-error"),$e(i,e.name),$e(s,e.name),w(typeof d=="boolean",e,"internal-error"),w(typeof f=="boolean",e,"internal-error"),$e(r,e.name),$e(o,e.name),$e(a,e.name),$e(c,e.name),$e(l,e.name),$e(u,e.name);const H=new me({uid:h,auth:e,email:s,emailVerified:d,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:_,createdAt:l,lastLoginAt:u});return g&&Array.isArray(g)&&(H.providerData=g.map(M=>({...M}))),c&&(H._redirectEventId=c),H}static async _fromIdTokenResponse(e,t,i=!1){const s=new Ut;s.updateFromServerResponse(t);const r=new me({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Bi(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];w(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?au(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new Ut;a.updateFromIdToken(i);const c=new me({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new yr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
 */const ja=new Map;function Le(n){Fe(n instanceof Function,"Expected a class definition");let e=ja.get(n);return e?(Fe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ja.set(n,e),e)}/**
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
 */class cu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}cu.type="NONE";const za=cu;/**
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
 */function gi(n,e,t){return`firebase:${n}:${e}:${t}`}class Bt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=gi(this.userKey,s.apiKey,r),this.fullPersistenceKey=gi("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ui(this.auth,{idToken:e}).catch(()=>{});return t?me._fromGetAccountInfoResponse(this.auth,t,e):null}return me._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Bt(Le(za),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||Le(za);const o=gi(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){let h;if(typeof u=="string"){const d=await Ui(e,{idToken:u}).catch(()=>{});if(!d)break;h=await me._fromGetAccountInfoResponse(e,d,u)}else h=me._fromJSON(e,u);l!==r&&(a=h),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Bt(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Bt(r,e,i))}}/**
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
 */function Ga(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(hu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(lu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(pu(e))return"Blackberry";if(gu(e))return"Webos";if(uu(e))return"Safari";if((e.includes("chrome/")||du(e))&&!e.includes("edge/"))return"Chrome";if(fu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function lu(n=se()){return/firefox\//i.test(n)}function uu(n=se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function du(n=se()){return/crios\//i.test(n)}function hu(n=se()){return/iemobile/i.test(n)}function fu(n=se()){return/android/i.test(n)}function pu(n=se()){return/blackberry/i.test(n)}function gu(n=se()){return/webos/i.test(n)}function Ro(n=se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Im(n=se()){return Ro(n)&&!!window.navigator?.standalone}function bm(){return wd()&&document.documentMode===10}function mu(n=se()){return Ro(n)||fu(n)||gu(n)||pu(n)||/windows phone/i.test(n)||hu(n)}/**
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
 */function _u(n,e=[]){let t;switch(n){case"Browser":t=Ga(se());break;case"Worker":t=`${Ga(se())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${an}/${i}`}/**
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
 */class Tm{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function Sm(n,e={}){return dn(n,"GET","/v2/passwordPolicy",So(n,e))}/**
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
 */const km=6;class Rm{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??km,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class Am{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new qa(this),this.idTokenSubscription=new qa(this),this.beforeStateQueue=new Tm(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=iu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Le(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Bt.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ui(this,{idToken:e}),i=await me._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(de(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return w(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Bi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=lm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(de(this.app))return Promise.reject(vt(this));const t=e?oe(e):null;return t&&w(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&w(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return de(this.app)?Promise.reject(vt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return de(this.app)?Promise.reject(vt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Le(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Sm(this),t=new Rm(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Yn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Cm(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Le(e)||this._popupRedirectResolver;w(t,this,"argument-error"),this.redirectPersistenceManager=await Bt.create(this,[Le(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(w(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return w(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=_u(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(de(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&rm(`Error while retrieving App Check token: ${e.error}`),e?.token}}function fs(n){return oe(n)}class qa{constructor(e){this.auth=e,this.observer=null,this.addObserver=Nd(t=>this.observer=t)}get next(){return w(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ao={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Nm(n){Ao=n}function Pm(n){return Ao.loadJS(n)}function Lm(){return Ao.gapiScript}function Dm(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function Om(n,e){const t=Br(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Et(r,e??{}))return s;Te(s,"already-initialized")}return t.initialize({options:e})}function xm(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Le);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Mm(n,e,t){const i=fs(n);w(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=yu(e),{host:o,port:a}=Fm(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){w(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),w(Et(l,i.config.emulator)&&Et(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,rn(o)?(kc(`${r}//${o}${c}`),Rc("Auth",!0)):Um()}function yu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Fm(n){const e=yu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Ya(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Ya(o)}}}function Ya(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Um(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class vu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Pe("not implemented")}_getIdTokenResponse(e){return Pe("not implemented")}_linkToIdToken(e,t){return Pe("not implemented")}_getReauthenticationResolver(e){return Pe("not implemented")}}/**
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
 */async function Wt(n,e){return fm(n,"POST","/v1/accounts:signInWithIdp",So(n,e))}/**
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
 */const Bm="http://localhost";class St extends vu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new St(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Te("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new St(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Wt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Wt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Wt(e,t)}buildRequest(){const e={requestUri:Bm,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=on(t)}return e}}/**
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
 */class No{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class si extends No{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class He extends si{constructor(){super("facebook.com")}static credential(e){return St._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return He.credential(e.oauthAccessToken)}catch{return null}}}He.FACEBOOK_SIGN_IN_METHOD="facebook.com";He.PROVIDER_ID="facebook.com";/**
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
 */class fe extends si{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return St._fromParams({providerId:fe.PROVIDER_ID,signInMethod:fe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return fe.credentialFromTaggedObject(e)}static credentialFromError(e){return fe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return fe.credential(t,i)}catch{return null}}}fe.GOOGLE_SIGN_IN_METHOD="google.com";fe.PROVIDER_ID="google.com";/**
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
 */class je extends si{constructor(){super("github.com")}static credential(e){return St._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return je.credential(e.oauthAccessToken)}catch{return null}}}je.GITHUB_SIGN_IN_METHOD="github.com";je.PROVIDER_ID="github.com";/**
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
 */class ze extends si{constructor(){super("twitter.com")}static credential(e,t){return St._fromParams({providerId:ze.PROVIDER_ID,signInMethod:ze.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ze.credentialFromTaggedObject(e)}static credentialFromError(e){return ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ze.credential(t,i)}catch{return null}}}ze.TWITTER_SIGN_IN_METHOD="twitter.com";ze.PROVIDER_ID="twitter.com";/**
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
 */class nn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await me._fromIdTokenResponse(e,i,s),o=Ka(i);return new nn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Ka(i);return new nn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Ka(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Wi extends lt{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Wi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Wi(e,t,i,s)}}function wu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Wi._fromErrorAndOperation(n,r,e,i):r})}async function Wm(n,e,t=!1){const i=await Hn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return nn._forOperation(n,"link",i)}/**
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
 */async function Vm(n,e,t=!1){const{auth:i}=n;if(de(i.app))return Promise.reject(vt(i));const s="reauthenticate";try{const r=await Hn(n,wu(i,s,e,n),t);w(r.idToken,i,"internal-error");const o=ko(r.idToken);w(o,i,"internal-error");const{sub:a}=o;return w(n.uid===a,i,"user-mismatch"),nn._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&Te(i,"user-mismatch"),r}}/**
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
 */async function $m(n,e,t=!1){if(de(n.app))return Promise.reject(vt(n));const i="signIn",s=await wu(n,i,e),r=await nn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Hm(n,e,t,i){return oe(n).onIdTokenChanged(e,t,i)}function jm(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}function Eu(n,e,t,i){return oe(n).onAuthStateChanged(e,t,i)}const Vi="__sak";/**
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
 */class Cu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Vi,"1"),this.storage.removeItem(Vi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const zm=1e3,Gm=10;class Iu extends Cu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=mu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);bm()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Gm):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},zm)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Iu.type="LOCAL";const qm=Iu;/**
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
 */class bu extends Cu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}bu.type="SESSION";const Tu=bu;/**
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
 */function Ym(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class ps{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ps(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await Ym(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ps.receivers=[];/**
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
 */function Po(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Km{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Po("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(h){const d=h;if(d.data.eventId===l)switch(d.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(d.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ce(){return window}function Jm(n){Ce().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Su(){return typeof Ce().WorkerGlobalScope<"u"&&typeof Ce().importScripts=="function"}async function Qm(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Xm(){return navigator?.serviceWorker?.controller||null}function Zm(){return Su()?self:null}/**
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
 */const ku="firebaseLocalStorageDb",e_=1,$i="firebaseLocalStorage",Ru="fbase_key";class ri{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function gs(n,e){return n.transaction([$i],e?"readwrite":"readonly").objectStore($i)}function t_(){const n=indexedDB.deleteDatabase(ku);return new ri(n).toPromise()}function vr(){const n=indexedDB.open(ku,e_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore($i,{keyPath:Ru})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains($i)?e(i):(i.close(),await t_(),e(await vr()))})})}async function Ja(n,e,t){const i=gs(n,!0).put({[Ru]:e,value:t});return new ri(i).toPromise()}async function n_(n,e){const t=gs(n,!1).get(e),i=await new ri(t).toPromise();return i===void 0?null:i.value}function Qa(n,e){const t=gs(n,!0).delete(e);return new ri(t).toPromise()}const i_=800,s_=3;class Au{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await vr(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>s_)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Su()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ps._getInstance(Zm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Qm(),!this.activeServiceWorker)return;this.sender=new Km(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Xm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await vr();return await Ja(e,Vi,"1"),await Qa(e,Vi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ja(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>n_(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Qa(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=gs(s,!1).getAll();return new ri(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),i_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Au.type="LOCAL";const r_=Au;new ii(3e4,6e4);/**
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
 */function Nu(n,e){return e?Le(e):(w(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Lo extends vu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Wt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Wt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function o_(n){return $m(n.auth,new Lo(n),n.bypassAuthState)}function a_(n){const{auth:e,user:t}=n;return w(t,e,"internal-error"),Vm(t,new Lo(n),n.bypassAuthState)}async function c_(n){const{auth:e,user:t}=n;return w(t,e,"internal-error"),Wm(t,new Lo(n),n.bypassAuthState)}/**
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
 */class Pu{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return o_;case"linkViaPopup":case"linkViaRedirect":return c_;case"reauthViaPopup":case"reauthViaRedirect":return a_;default:Te(this.auth,"internal-error")}}resolve(e){Fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const l_=new ii(2e3,1e4);async function u_(n,e,t){if(de(n.app))return Promise.reject(ye(n,"operation-not-supported-in-this-environment"));const i=fs(n);om(n,e,No);const s=Nu(i,t);return new mt(i,"signInViaPopup",e,s).executeNotNull()}class mt extends Pu{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,mt.currentPopupAction&&mt.currentPopupAction.cancel(),mt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return w(e,this.auth,"internal-error"),e}async onExecution(){Fe(this.filter.length===1,"Popup operations only handle one event");const e=Po();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ye(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ye(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ye(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,l_.get())};e()}}mt.currentPopupAction=null;/**
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
 */const d_="pendingRedirect",mi=new Map;class h_ extends Pu{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=mi.get(this.auth._key());if(!e){try{const i=await f_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}mi.set(this.auth._key(),e)}return this.bypassAuthState||mi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function f_(n,e){const t=m_(e),i=g_(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function p_(n,e){mi.set(n._key(),e)}function g_(n){return Le(n._redirectPersistence)}function m_(n){return gi(d_,n.config.apiKey,n.name)}async function __(n,e,t=!1){if(de(n.app))return Promise.reject(vt(n));const i=fs(n),s=Nu(i,e),o=await new h_(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const y_=600*1e3;class v_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!w_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Lu(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ye(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=y_&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xa(e))}saveEventToCache(e){this.cachedEventUids.add(Xa(e)),this.lastProcessedEventTime=Date.now()}}function Xa(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Lu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function w_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Lu(n);default:return!1}}/**
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
 */async function E_(n,e={}){return dn(n,"GET","/v1/projects",e)}/**
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
 */const C_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,I_=/^https?/;async function b_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await E_(n);for(const t of e)try{if(T_(t))return}catch{}Te(n,"unauthorized-domain")}function T_(n){const e=_r(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!I_.test(t))return!1;if(C_.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S_=new ii(3e4,6e4);function Za(){const n=Ce().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function k_(n){return new Promise((e,t)=>{function i(){Za(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Za(),t(ye(n,"network-request-failed"))},timeout:S_.get()})}if(Ce().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ce().gapi?.load)i();else{const s=Dm("iframefcb");return Ce()[s]=()=>{gapi.load?i():t(ye(n,"network-request-failed"))},Pm(`${Lm()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw _i=null,e})}let _i=null;function R_(n){return _i=_i||k_(n),_i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_=new ii(5e3,15e3),N_="__/auth/iframe",P_="emulator/auth/iframe",L_={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},D_=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function O_(n){const e=n.config;w(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?To(e,P_):`https://${n.config.authDomain}/${N_}`,i={apiKey:e.apiKey,appName:n.name,v:an},s=D_.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${on(i).slice(1)}`}async function x_(n){const e=await R_(n),t=Ce().gapi;return w(t,n,"internal-error"),e.open({where:document.body,url:O_(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:L_,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ye(n,"network-request-failed"),a=Ce().setTimeout(()=>{r(o)},A_.get());function c(){Ce().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},F_=500,U_=600,B_="_blank",W_="http://localhost";class ec{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function V_(n,e,t,i=F_,s=U_){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...M_,width:i.toString(),height:s.toString(),top:r,left:o},l=se().toLowerCase();t&&(a=du(l)?B_:t),lu(l)&&(e=e||W_,c.scrollbars="yes");const u=Object.entries(c).reduce((d,[f,g])=>`${d}${f}=${g},`,"");if(Im(l)&&a!=="_self")return $_(e||"",a),new ec(null);const h=window.open(e||"",a,u);w(h,n,"popup-blocked");try{h.focus()}catch{}return new ec(h)}function $_(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const H_="__/auth/handler",j_="emulator/auth/handler",z_=encodeURIComponent("fac");async function tc(n,e,t,i,s,r){w(n.config.authDomain,n,"auth-domain-config-required"),w(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:an,eventId:s};if(e instanceof No){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Js(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))o[u]=h}if(e instanceof si){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${z_}=${encodeURIComponent(c)}`:"";return`${G_(n)}?${on(a).slice(1)}${l}`}function G_({config:n}){return n.emulator?To(n,j_):`https://${n.authDomain}/${H_}`}/**
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
 */const Bs="webStorageSupport";class q_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Tu,this._completeRedirectFn=__,this._overrideRedirectResult=p_}async _openPopup(e,t,i,s){Fe(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await tc(e,t,i,_r(),s);return V_(e,r,Po())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await tc(e,t,i,_r(),s);return Jm(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Fe(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await x_(e),i=new v_(e);return t.register("authEvent",s=>(w(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Bs,{type:Bs},s=>{const r=s?.[0]?.[Bs];r!==void 0&&t(!!r),Te(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=b_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return mu()||uu()||Ro()}}const Y_=q_;var nc="@firebase/auth",ic="1.11.1";/**
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
 */class K_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){w(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function J_(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Q_(n){qt(new Ct("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;w(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:_u(n)},l=new Am(i,s,r,c);return xm(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),qt(new Ct("auth-internal",e=>{const t=fs(e.getProvider("auth").getImmediate());return(i=>new K_(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),tt(nc,ic,J_(n)),tt(nc,ic,"esm2020")}/**
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
 */const X_=300,Z_=Sc("authIdTokenMaxAge")||X_;let sc=null;const ey=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Z_)return;const s=t?.token;sc!==s&&(sc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function ty(n=Oc()){const e=Br(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Om(n,{popupRedirectResolver:Y_,persistence:[r_,qm,Tu]}),i=Sc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=ey(r.toString());jm(t,o,()=>o(t.currentUser)),Hm(t,a=>o(a))}}const s=bc("auth");return s&&Mm(t,`http://${s}`),t}function ny(){return document.getElementsByTagName("head")?.[0]??document}Nm({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ye("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",ny().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Q_("Browser");const Ue=(n,e)=>{},hn=ty(Zl);let Ws=null;const iy=()=>Math.random().toString(36).substring(2,15);function kt(){const n=Re();return n||(Ws||(Ws=iy()),Ws)}function Re(){return hn.currentUser?.uid??null}function sy(){return new Promise(n=>{const e=Eu(hn,t=>{e(),n(t)})})}async function Du(){const n=new fe;try{const e=await u_(hn,n),i=fe.credentialFromResult(e).accessToken,s=e.user;console.log("Signed in user:",s),Ue("Google Access Token exists:",!!i)}catch(e){const t=e?.code||"unknown",i=e?.message||String(e),s=e?.customData?.email,r=fe.credentialFromError(e);if(console.error("Error during Google sign-in:",{errorCode:t,errorMessage:i,email:s,credential:r,origin:typeof window<"u"?window.location.origin:"n/a"}),t==="auth/unauthorized-domain"){const o=typeof window<"u"?window.location.origin:"",a=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",o?`• ${o}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];o&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(o).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${a.join(`
`)}`);return}alert(`Sign-in failed: ${i}`)}}function Ou(){hn.signOut().then(()=>{console.log("User signed out successfully")}).catch(n=>{console.error("Error signing out:",n)})}const ry=Object.freeze(Object.defineProperty({__proto__:null,auth:hn,getCurrentUserAsync:sy,getLoggedInUserId:Re,getUserId:kt,signInWithGoogle:Du,signOutUser:Ou},Symbol.toStringTag,{value:"Module"})),Do=n=>n?!0:(console.warn("Element not found."),!1),Oo=n=>{if(Do(n))return n.classList.contains("hidden")},k=n=>{Do(n)&&n.classList.contains("hidden")&&n.classList.remove("hidden")},E=n=>{Do(n)&&!n.classList.contains("hidden")&&n.classList.add("hidden")},xu=n=>n.classList.contains("small-frame"),wt=n=>{if(n&&!xu(n)){n.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const t=document.createElement("span");t.classList.add("small-frame-toggle-icon"),t.textContent="❮",e.appendChild(t),n.appendChild(e),e.addEventListener("click",()=>{n.classList.contains("closed")?(n.classList.remove("closed"),e.classList.remove("closed"),t.classList.remove("closed")):(n.classList.add("closed"),e.classList.add("closed"),t.classList.add("closed"))})}},_t=n=>{if(xu(n)){n.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function wr(n){return document.pictureInPictureElement===n}const R=n=>{const e=document.getElementById(n);return e||(console.warn(`Element with id: ${n} not found.`),null)};let We=null,ms=null,ct=null,Be=null,xo=null,pe=null,Z=null,j=null,U=null,W=null,ce=null,ve=null,Nt=null,fn=null,_s=null,K=null,jn=null,ys=null,Pt=null,vs=null,ws=null,Es=null,Mo=null,Fo=null,Uo=null,Bo=null,Rn=null,Hi=null;function rc(){We=R("lobby"),ms=R("title-auth-bar"),ct=R("create-link-btn"),Be=R("copy-link-btn"),xo=R("videos"),pe=R("local-video-el"),Z=R("local-video-box"),j=R("remote-video-el"),U=R("remote-video-box"),W=R("shared-video-el"),ce=R("shared-video-box"),ve=R("chat-controls"),Nt=R("call-btn"),fn=R("hang-up-btn"),_s=R("switch-camera-btn"),K=R("install-btn"),jn=R("status"),ys=R("sync-status"),Pt=R("mute-btn"),vs=R("fullscreen-partner-btn"),ws=R("mic-btn"),Es=R("camera-btn"),Mo=R("app-pip-btn"),Fo=R("app-title-h1"),Uo=R("app-title-a"),Bo=R("app-title-span"),Rn=R("join-room-btn"),Hi=R("room-id-input")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",rc):rc();const Mu=()=>({lobbyDiv:We,titleAuthBar:ms,createLinkBtn:ct,copyLinkBtn:Be,videosWrapper:xo,localVideoEl:pe,localBoxEl:Z,remoteVideoEl:j,remoteBoxEl:U,sharedVideoEl:W,sharedBoxEl:ce,chatControls:ve,callBtn:Nt,hangUpBtn:fn,switchCameraBtn:_s,installBtn:K,statusDiv:jn,syncStatus:ys,mutePartnerBtn:Pt,fullscreenPartnerBtn:vs,micBtn:ws,cameraBtn:Es,appPipBtn:Mo,appTitleH1:Fo,appTitleA:Uo,appTitleSpan:Bo});function Fu(n,e=3,t=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(n);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${n} not found after ${e} attempts`),i(null);return}setTimeout(r,t)};r()})}async function Uu(n,e=3,t=100){const i={},s=n.map(async r=>{const o=await Fu(r,e,t);return i[r]=o,o});return await Promise.all(s),i}async function oy(){console.log("Initializing YouTube search elements...");const n=await Uu(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");n.searchContainer=e;const t=Object.entries(n).filter(([i,s])=>!s).map(([i])=>i);return t.length>0?console.warn("Some YouTube elements not found:",t):console.log("All YouTube elements initialized successfully"),n}const ay=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Mo},get appTitleA(){return Uo},get appTitleH1(){return Fo},get appTitleSpan(){return Bo},get callBtn(){return Nt},get cameraBtn(){return Es},get chatControls(){return ve},get copyLinkBtn(){return Be},get createLinkBtn(){return ct},get fullscreenPartnerBtn(){return vs},getElements:Mu,get hangUpBtn(){return fn},initializeYouTubeElements:oy,get installBtn(){return K},get joinRoomBtn(){return Rn},get lobbyDiv(){return We},get localBoxEl(){return Z},get localVideoEl(){return pe},get micBtn(){return ws},get mutePartnerBtn(){return Pt},get remoteBoxEl(){return U},get remoteVideoEl(){return j},robustElementAccess:Fu,get roomIdInput(){return Hi},get sharedBoxEl(){return ce},get sharedVideoEl(){return W},get statusDiv(){return jn},get switchCameraBtn(){return _s},get syncStatus(){return ys},get titleAuthBar(){return ms},get videosWrapper(){return xo},waitForElements:Uu},Symbol.toStringTag,{value:"Module"}));function T(n){jn?jn.textContent=n:console.warn("Status div not found in the DOM.")}function Bu(n,{inactivityMs:e=3e3,listenTarget:t=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!n)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(_=>!Array.isArray(o)||!o.includes(_));function u(){k(n);try{typeof i=="function"&&i()}catch(_){console.warn("showHideOnInactivity onShow callback error:",_)}a&&clearTimeout(a),a=setTimeout(()=>{E(n);try{typeof s=="function"&&s()}catch(_){console.warn("showHideOnInactivity onHide callback error:",_)}a=null},e)}l.forEach(_=>t.addEventListener(_,u,{passive:!0}));function h(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(n)}catch(_){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",_)}}else u()}document.addEventListener("visibilitychange",h);function d(_){if(!_.relatedTarget){a&&(clearTimeout(a),a=null),E(n);try{typeof s=="function"&&s()}catch(H){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",H)}}}t.addEventListener("mouseout",d);function f(_){if(r&&(_.key==="Escape"||_.key==="Esc")){a&&(clearTimeout(a),a=null),E(n);try{typeof s=="function"&&s()}catch(H){console.warn("showHideOnInactivity onHide (esc) callback error:",H)}}}document.addEventListener("keydown",f);function g(){a||u()}t.addEventListener("touchend",g,{passive:!0}),E(n);function m(){l.forEach(_=>t.removeEventListener(_,u)),document.removeEventListener("visibilitychange",h),t.removeEventListener("mouseout",d),t.removeEventListener("touchend",g),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return m}class Vt{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,t,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:t,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${t}`,i)}logListenerAttachment(e,t,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:t,currentCount:i,...s})}logListenerCleanup(e,t,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:t.length,removedRoomIds:e,preservedRoomIds:t,...i})}logDuplicateListener(e,t,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:t,...i})}logIncomingCallEvent(e,t,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:t,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,t,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:t,roomId:i,...s})}logCallingUILifecycle(e,t,i={}){this.log("CALLING_UI",e,{roomId:t,...i})}logFirebaseOperation(e,t,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:t,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,t={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...t})}logRoomCreation(e,t,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:t,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,t,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:t,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,t,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:t,...i})}logContactCall(e,t,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:t,forceInitiator:i,...s})}logFreshnessValidation(e,t,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:t,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,t,i,s={}){this.log("RACE_CONDITION",e,{roomId:t,events:i,...s})}getLogs(e={}){let t=[...this.logs];return e.category&&(t=t.filter(i=>i.category===e.category)),e.event&&(t=t.filter(i=>i.event===e.event)),e.roomId&&(t=t.filter(i=>i.data.roomId===e.roomId)),e.since&&(t=t.filter(i=>i.timestamp>=e.since)),e.until&&(t=t.filter(i=>i.timestamp<=e.until)),t}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((t,i)=>t.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const t=this.getLogs({category:"LISTENER"});return e?t.filter(i=>i.data.roomId===e):t}getFailureAnalysis(){const e=this.logs.filter(t=>t.category==="FIREBASE"&&t.data.success===!1||t.category==="INCOMING_CALL"&&t.data.decision==="REJECT"||t.category==="LISTENER"&&t.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(t=>t.category==="FIREBASE").length,rejectedCalls:e.filter(t=>t.category==="INCOMING_CALL"&&t.data.decision==="REJECT").length,duplicateListeners:e.filter(t=>t.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const t=this.exportLogsAsJSON(),i=new Blob([t],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,t){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=t)}getLogsSince(e){return this.logs.filter(t=>t.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const t=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=t)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const t=localStorage.getItem(e);if(t){const i=JSON.parse(t);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(t){return console.warn("Failed to load persisted logs:",t),0}}static getPersistedLogKeys(){const e=[];for(let t=0;t<localStorage.length;t++){const i=localStorage.key(t);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const t=Date.now()-e;Vt.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<t&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const t=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:t}),t}endTiming(e,t={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...t}),s}return null}}let Vs=null;function y(){return Vs||(Vs=new Vt),Vs}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:n=>{y().downloadLogs(n),console.log("Diagnostic logs downloaded")},getRoomLogs:n=>{const t=y().getCallFlowTrace(n);return console.log(`Logs for room ${n}:`,t),t},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:n=>{const t=y().getListenerDiagnostics(n);return console.log("Listener diagnostics:",t),t},getLogsSince:n=>{const t=y().getLogsSince(n);return console.log(`Logs since ${new Date(n).toISOString()}:`,t),t},getLogsInRange:(n,e)=>{const i=y().getLogsInTimeRange(n,e);return console.log(`Logs from ${new Date(n).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:n=>{const t=y().loadPersistedLogs(n);return console.log(`Loaded ${t} persisted logs`),t},getPersistedKeys:()=>{const n=Vt.getPersistedLogKeys();return console.log("Persisted log keys:",n),n},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const n=y(),e={sessionId:n.sessionId,logCount:n.logs.length,isEnabled:n.isEnabled,maxLogs:n.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
Diagnostic Logger Console Commands:
==================================

Basic Commands:
- diagnosticLogger.exportLogs()           - Export all logs as JSON
- diagnosticLogger.downloadLogs()         - Download logs as file
- diagnosticLogger.clearLogs()            - Clear current logs
- diagnosticLogger.getSessionInfo()       - Get session information

Filtering Commands:
- diagnosticLogger.getRoomLogs(roomId)    - Get logs for specific room
- diagnosticLogger.getLogsSince(timestamp) - Get logs since timestamp
- diagnosticLogger.getLogsInRange(start, end) - Get logs in time range

Analysis Commands:
- diagnosticLogger.getFailures()          - Get failure analysis
- diagnosticLogger.getListenerDiagnostics() - Get listener diagnostics

Persistence Commands:
- diagnosticLogger.persistLogs()          - Save logs to localStorage
- diagnosticLogger.loadPersistedLogs(key) - Load persisted logs
- diagnosticLogger.getPersistedKeys()     - List persisted log keys

Control Commands:
- diagnosticLogger.enable()               - Enable logging
- diagnosticLogger.disable()              - Disable logging
- diagnosticLogger.help()                 - Show this help

Example Usage:
- diagnosticLogger.exportLogs()
- diagnosticLogger.getRoomLogs('abc123')
- diagnosticLogger.getLogsSince(Date.now() - 60000) // Last minute
      `)}},window.addEventListener("beforeunload",()=>{try{const n=y();n.logs.length>0&&n.persistLogs(),Vt.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const n=Vt.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));const ji=3e4;let Ae=null,vn=null;async function cy(n,e=null){const t=kt(),i=Re();if(!i)return;const s=O(x,`users/${i}/outgoingCall`);await at(s,{roomId:n,targetContactName:e,initiatedAt:Date.now(),callerUserId:t})}async function Er(){const n=Re();if(!n)return;const e=O(x,`users/${n}/outgoingCall`);await ti(e).catch(()=>{})}async function ly(n,e){if(!n)return!1;try{const t=O(x,`users/${n}/outgoingCall`),i=await tn(t);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<ji}catch(t){return console.warn("Failed to check outgoing call freshness",t),!1}}async function uy(n){if(!n)return!1;try{const e=O(x,`rooms/${n}/createdAt`),t=await tn(e);if(!t.exists())return!1;const i=t.val();return typeof i!="number"?!1:Date.now()-i<ji}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function dy(n,e,t){const i=Date.now();y().logCallingUILifecycle("SHOW",n,{contactName:e,timestamp:i,hasExistingUI:!!Ae}),$t(),await cy(n,e);const s=document.createElement("div");s.id="calling-modal",s.style.cssText=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;const r=document.createElement("div");r.style.cssText=`
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;const o=document.createElement("h2");o.textContent=`Calling ${e||"contact"}...`,o.style.cssText=`
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #333;
  `;const a=document.createElement("p");a.textContent="Waiting for answer...",a.style.cssText=`
    margin: 0 0 20px 0;
    color: #666;
    font-size: 14px;
  `;const c=document.createElement("button");c.textContent="Cancel",c.style.cssText=`
    padding: 10px 24px;
    background: #f44336;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  `;const l=async()=>{y().logCallingUILifecycle("CANCEL",n,{contactName:e,reason:"user_cancelled",duration:Date.now()-i}),await Er(),$t(),T("Call cancelled")};c.onclick=l,r.appendChild(o),r.appendChild(a),r.appendChild(c),s.appendChild(r),document.body.appendChild(s),s.dataset.roomId=n,Ae=s,vn=setTimeout(async()=>{y().logCallingUILifecycle("TIMEOUT",n,{contactName:e,reason:"auto_timeout",duration:Date.now()-i,timeoutMs:ji}),await Er(),$t(),T("Call timed out - no answer after 30 seconds")},ji)}function $t(){if(Ae){const n=Ae.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",n,{reason:"hide_called",hadTimeout:!!vn,timestamp:Date.now()})}vn&&(clearTimeout(vn),vn=null),Ae&&(Ae.remove(),Ae=null)}async function Wu(){if(Ae){const n=Ae.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",n,{reason:"call_answered",timestamp:Date.now()})}await Er(),$t()}function Vu(n){return new Promise(e=>{const t=document.createElement("dialog");t.innerHTML=`
      <p>${n}</p>
      <div>
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `;const i=t.querySelector('[data-action="confirm"]'),s=t.querySelector('[data-action="cancel"]');if(!i||!s){console.error("dialog element not found!"),e(!1);return}i.addEventListener("click",()=>{t.close(),e(!0)}),s.addEventListener("click",()=>{t.close(),e(!1)}),t.addEventListener("cancel",()=>e(!1)),document.body.appendChild(t),t.showModal()})}async function oc(n,e,t){const i=Re();if(i){const s=O(x,`users/${i}/contacts/${n}`);await at(s,{contactId:n,contactName:e,roomId:t,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[n]={contactId:n,contactName:e,roomId:t,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function zi(){const n=Re();if(n)try{const e=O(x,`users/${n}/contacts`),t=await tn(e);return t.exists()?t.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function hy(n,e,t){if(!n||!e)return;const s=(await zi())?.[n];if(s){s.roomId!==e&&(await oc(n,s.contactName,e),await Gi(t));return}if(!await Vu("Would you like to save this contact for future calls?"))return;const o=window.prompt("Enter a name for this contact:",n)||n;await oc(n,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),Xi(e),await Gi(t)}async function Gi(n){if(!n)return;const e=await zi(),t=Object.keys(e);let i=n.querySelector(".contacts-list");if(i||(i=document.createElement("div"),i.className="contacts-list",i.style.cssText=`
      margin-top: 20px;
      padding: 10px;
      border-top: 1px solid #ccc;
    `,n.appendChild(i)),t.length===0){i.innerHTML='<p style="color: #666;">No saved contacts yet.</p>';return}i.innerHTML=`
    <h3 style="margin: 0 0 10px 0; font-size: 16px;">Saved Contacts</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${t.map(s=>{const r=e[s];return`
            <li style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <button 
                class="contact-call-btn" 
                data-room-id="${r.roomId}"
                data-contact-name="${r.contactName}"
                style="
                  padding: 6px 12px;
                  background: #4CAF50;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 14px;
                "
              >
                Call
              </button>
              <span style="flex: 1;">${r.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${s}"
                style="
                  padding: 4px 8px;
                  background: #f44336;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 12px;
                "
              >
                ✕
              </button>
            </li>
          `}).join("")}
    </ul>
  `,fy(i,n)}function fy(n,e){n.querySelectorAll(".contact-call-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-room-id"),s=t.getAttribute("data-contact-name");i&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${i}`),Xi(i),await dy(i,s),Ts(i,{forceInitiator:!0}).catch(r=>{console.warn("Failed to call contact:",r),$t()}))}}),n.querySelectorAll(".contact-delete-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await py(i),await Gi(e))}})}async function py(n){const e=Re();if(e){try{await ti(O(x,`users/${e}/contacts/${n}`))}catch(t){console.warn("Failed to delete contact from RTDB",t)}return}try{const t=localStorage.getItem("contacts")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("contacts",JSON.stringify(i)))}catch(t){console.warn("Failed to delete contact from localStorage",t)}}const $u={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}},Cr={desktop:{landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:16/9},resizeMode:"none"},portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},frameRate:{min:15,ideal:30,max:60},aspectRatio:{ideal:9/16},resizeMode:"none"}},mobile:{portrait:{width:{min:720,ideal:1080,max:1440},height:{min:1280,ideal:1920,max:2560},aspectRatio:{ideal:9/16},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"},landscape:{width:{min:1280,ideal:1920,max:2560},height:{min:720,ideal:1080,max:1440},aspectRatio:{ideal:16/9},frameRate:{min:15,ideal:30,max:60},resizeMode:"none"}},relyOnBrowserDefaults:!0};function gy(){return window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180}function Wo(n){const e=gy()?"portrait":"landscape";return/Mobi|Android/i.test(navigator.userAgent)?{facingMode:n,...Cr.mobile[e]}:{facingMode:n,...Cr.desktop[e]}}function my(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function _y(){return my()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function yy(){const n=await _y();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}async function vy({localStream:n,localVideo:e,currentFacingMode:t,peerConnection:i=null}){if(!n||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=t==="user"?"environment":"user",r=Wo(s);try{const o=await navigator.mediaDevices.getUserMedia({video:r,audio:$u.default}),a=o.getVideoTracks()[0],c=o.getAudioTracks()[0],l=n.getVideoTracks()[0],u=l?l.enabled:!0,h=n.getAudioTracks()[0],d=h?!h.enabled:!1;if(i){const f=i.getSenders().find(m=>m.track&&m.track.kind==="video");f&&f.replaceTrack(a);const g=i.getSenders().find(m=>m.track&&m.track.kind==="audio");g&&c&&g.replaceTrack(c)}return a&&(a.enabled=u),c&&(c.enabled=!d),n.getTracks().forEach(f=>f.stop()),e.srcObject=new MediaStream([a].filter(Boolean)),{newStream:o,facingMode:s}}catch(o){return console.error("Failed to switch camera:",o),null}}let $s=!1,ut=null,dt=null;function wy({getLocalStream:n,getFacingMode:e}){return ut&&dt&&ut.removeEventListener("change",dt),ut=window.matchMedia("(orientation: portrait)"),dt=()=>{try{const t=typeof n=="function"?n():null,i=typeof e=="function"?e():"user";Ey({localStream:t,currentFacingMode:i})}catch(t){console.error("Orientation handler failed:",t)}},ut.addEventListener("change",dt),()=>{ut&&dt&&ut.removeEventListener("change",dt),ut=null,dt=null}}async function Ey({localStream:n,currentFacingMode:e}){if(!($s||!n?.getVideoTracks()[0])){$s=!0;try{const t=n.getVideoTracks()[0],i=Wo(e);Ue("Applying constraints:",i),await t.applyConstraints(i),Ue("Video constraints updated successfully")}catch(t){console.error("Failed to apply orientation constraints:",t)}finally{$s=!1}}}let Ir=!1,qi=[];function Cy(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function Iy(n,e,t){t&&(t.muted=!n,t.volume=e)}function by(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function Ty(n,e){if(!n)return;const t=()=>{if(n.muted!==Ir){const i=e.querySelector("i");i.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",Ir=n.muted}};n.addEventListener("volumechange",t),qi.push(()=>{n&&n.removeEventListener("volumechange",t)})}function Sy({getLocalStream:n,getLocalVideo:e,getRemoteVideo:t,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){r&&(r.onclick=()=>{const d=n(),f=e();if(!f||!d)return;const g=!f.muted;Cy(!g,d),Iy(!g,0,f),by(g,r)}),o&&(o.onclick=()=>{const d=n();if(!d)return;const f=d.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const g=o.querySelector("i");g.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});let u="user";const h=wy({getLocalStream:n,getFacingMode:()=>u});qi.push(h),a&&(a.onclick=async()=>{const d=await vy({localStream:n(),localVideo:e(),currentFacingMode:u,peerConnection:i()||null});d?(u=d.facingMode,console.log("Switched camera to facingMode:",u),d.newStream&&typeof s=="function"&&s(d.newStream)):console.error("Camera switch failed.")},(async()=>await yy()?k(a):E(a))()),c&&(c.onclick=()=>{const d=t();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=t();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function ky(){qi.forEach(n=>n()),qi=[],Ir=!1}const ac="yt-video-box",br="yt-player-root";let B=null,Ve=!1;const An=()=>B,Ry=()=>Ve,Hu=n=>Ve=n,Ht=()=>{const n=document.getElementById(ac);if(!n)throw new Error(`Container #${ac} not found`);return n};function Ay(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function ju(){const n=Ht();if(!document.getElementById(br)){const e=document.createElement("div");e.id=br,n.appendChild(e)}k(n)}function Tr(){const n=Ht();E(n)}function Hs(){const n=Ht();return n&&!n.classList.contains("hidden")}function Sr(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function zu(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const i=n.match(t);if(i&&i[1])return i[1]}return null}async function Ny({url:n,onReady:e,onStateChange:t}){const i=zu(n);if(!i)throw new Error("Invalid YouTube URL");if(await Ay(),B){try{B.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}B=null}const s=(o=!0)=>{const a=Ht(),c=B.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const h=Ht(),d=B.getIframe();if(document.activeElement===d||document.activeElement===h)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),B.getPlayerState()!==window.YT.PlayerState.PLAYING?$o():Cs()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Ht(),a=B.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return ju(),new Promise((o,a)=>{try{B=new window.YT.Player(br,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Ve=!0,e&&e(c),o(B)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),t&&t(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Vo(){if(B){try{Tr(),B.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}B=null,Ve=!1}}function $o(){B&&Ve&&B.playVideo()}function Cs(){B&&Ve&&B.pauseVideo()}function Py(n){B&&Ve&&B.seekTo(n,!0)}function Yi(){return B&&Ve?B.getCurrentTime():0}function Ho(){return B&&Ve?B.getPlayerState():-1}const Ke={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Oe=null,Is=null,Gu=!1,le="none",jo=null;const oi=()=>Gu,qu=n=>Gu=n,yn=()=>le,Ly=n=>{["yt","url","none"].includes(n)?le=n:console.warn("Invalid lastWatched platform:",n)};let Je=!1,Nn=null,Pn=0;async function jt(n){if(!Oe)return;console.debug("Updating watch sync state, roomId:",Oe);const e=O(x,`rooms/${Oe}/watch`);try{await Xl(e,{...n,updatedBy:Is})}catch(t){console.error("Failed to update watch state:",t)}}function Dy(n,e,t){if(!n)return;Oe=n,Is=t;const i=O(x,`rooms/${n}/watch`);tu(i,Oy),Vy()}function Oy(n){const e=n.val();e&&e.updatedBy!==Is&&(Date.now()-Pn<500||(e.url&&e.url!==jo&&xy(e.url),e.isYouTube?My(e):Wy(e)))}function xy(n){jo=n,Sr(n)?(E(ce),Yu(n),le="yt"):(Vo(),k(ce),W.src=n,le="url")}function My(n){!An()||!Ry()||(Fy(n),Uy(n))}function Fy(n){const e=Ho(),t=e===Ke.PLAYING;if([Ke.BUFFERING,Ke.UNSTARTED].includes(e)){By();return}Je||(n.playing&&!t?($o(),le="yt"):!n.playing&&t&&(Cs(),le="yt"))}function Uy(n){if(n.currentTime===void 0)return;const e=Yi();Math.abs(e-n.currentTime)>.3&&!Je&&(Py(n.currentTime),setTimeout(()=>{n.playing?$o():Cs(),le="yt"},500))}function By(){Je=!0,clearTimeout(Nn),Nn=setTimeout(async()=>{Je=!1;const n=Ho()===Ke.PLAYING;await jt({playing:n,currentTime:Yi()})},700)}function Wy(n){n.playing!==void 0&&(n.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!n.playing&&!W.paused&&W.pause()),n.currentTime!==void 0&&Math.abs(W.currentTime-n.currentTime)>1&&(W.currentTime=n.currentTime,n.playing?W.play().catch(t=>console.warn("Play failed:",t)):W.pause())}function Vy(){W.addEventListener("play",async()=>{!An()&&Oe&&(Pn=Date.now(),await jt({playing:!0,isYouTube:!1})),le="url"}),W.addEventListener("pause",async()=>{!An()&&Oe&&(Pn=Date.now(),await jt({playing:!1,isYouTube:!1})),le="url"}),W.addEventListener("seeked",async()=>{!An()&&Oe&&(Pn=Date.now(),await jt({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),le="url"})}async function $y(n){if(!n)return!1;if(Pn=Date.now(),Sr(n)){if(E(ce),!await Yu(n))return!1;le="yt"}else Vo(),k(ce),W.src=n,le="url";if(Oe){const e=O(x,`rooms/${Oe}/watch`);at(e,{url:n,playing:!1,currentTime:0,isYouTube:Sr(n),updatedBy:Is})}return!0}async function xt(n){if(!n||!n.url)return console.warn("Non-existing or invalid video."),!1;jo=n.url;const e=await $y(n.url);return Dr(),e}async function Yu(n,e,t){if(!zu(n))return console.error("Invalid YouTube URL:",n),!1;try{return await Ny({url:n,onReady:s=>{Hu(!0)},onStateChange:async s=>{if(!An())return;const o=s.data===Ke.PLAYING,a=s.data===Ke.PAUSED;if(s.data===Ke.BUFFERING){Je=!0,Nn&&clearTimeout(Nn),Nn=setTimeout(async()=>{Je=!1;const u=Ho()===Ke.PLAYING;await jt({playing:u,currentTime:Yi()})},700);return}a&&Je||!Je&&(o||a)&&await jt({playing:o,currentTime:Yi()})}}),!0}catch(s){return console.error("Failed to load YouTube video:",s),!1}}function kr(n,e,t={}){if(!n||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=t,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(n.contains(u))return;for(const h of o)if(h&&h.contains&&h.contains(u)||h===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{s&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),s&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",c)}}let js=null,Ge=null,F=null,L=null,cc=!1,ui=!1,Ee=[],Rr="",X=-1,Ar=[];const Hy="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",jy="https://www.googleapis.com/youtube/v3";async function zy(){if(cc||ui)return!1;ui=!0;const{initializeYouTubeElements:n}=await vc(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>ay);return{initializeYouTubeElements:o}},void 0),e=await n();if(js=e.searchContainer,Ge=e.searchBtn,F=e.searchQuery,L=e.searchResults,!js||!Ge||!F||!L)return console.error("YouTube search elements not found in DOM"),ui=!1,!1;const t=o=>/^https?:\/\//i.test(o),i=o=>{(L?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),X=o??-1};Ge.onclick=async()=>{const o=F.value.trim();if(Oo(F)){k(F),F.focus();return}if(!o){yi(),E(F);return}if(dc()&&o===Rr)Nr(Ee);else if(!t(o))await lc(o);else{xt&&await xt({url:o}),E(L),F.value="",E(F),X=-1;return}},js.addEventListener("keydown",async o=>{const a=L.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=X+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=X-1;c<0&&(c=X===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&X>=0){a[X].click(),E(F),E(L),X=-1;return}const c=F.value.trim();if(c)if(dc()&&c===Rr)Nr(Ee);else if(!t(c))await lc(c);else{xt&&await xt({url:c}),E(L),X=-1,F.value="",E(F);return}}else o.key==="Escape"&&(qy()?yi():F.value?F.value="":E(F))}),F.addEventListener("input",()=>{F.value.trim()===""&&yi(),X=-1});const s=kr(F,()=>E(F),{ignore:[Ge],esc:!1});Ar.push(s);const r=kr(L,()=>E(L),{ignore:[Ge],esc:!1});return Ar.push(r),ui=!1,cc=!0,!0}async function lc(n){if(!Ge||!L){console.error("Search elements not initialized");return}Ee=[],Rr=n,Ge.disabled=!0,L.innerHTML='<div class="search-loading">Searching YouTube...</div>',k(L);try{const e=await fetch(`${jy}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${Hy}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const t=await e.json();if(!t.items||t.items.length===0){uc("No videos found"),Ee=[];return}Ee=t.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Nr(Ee)}catch(e){console.error("YouTube search failed:",e),uc(e.message||"Search failed. Please try again.")}finally{Ge.disabled=!1}}function Nr(n){if(!L){console.error("Search results element not initialized");return}if(!n||n.length===0){L.innerHTML='<div class="no-results">No results found</div>',Ee=[],X=-1;return}L.innerHTML="",n.forEach(t=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${t.thumbnail}" alt="${t.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${t.title}</div>
        <div class="result-channel">${t.channel}</div>
      </div>
    `,i.onclick=async()=>{if(xt){if(await xt(t),E(L),X=-1,!F){console.error("Search query element not initialized");return}F.value="",E(F)}},L.appendChild(i)}),k(L),X=0,L.querySelectorAll(".search-result-item").forEach((t,i)=>{i===X?(t.classList.add("focused"),t.scrollIntoView({block:"nearest"})):t.classList.remove("focused")})}function uc(n){if(Ee=[],X=-1,!L){console.error("Search results element not initialized");return}L.innerHTML=`<div class="search-error">${n}</div>`,k(L)}function yi(){Ee=[],X=-1,L&&(L.innerHTML="",E(L))}function Gy(){yi(),Ar.forEach(n=>n())}function qy(){return!Oo(L)}function dc(){return Ee.length>0}let pt=null,hc=!1;function Yy(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function Ky(){if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),E(K);return}if(!K){console.warn("[PWA]: Install button not found");return}if(Yy()){K.innerHTML='<i class="fa fa-info"></i>',K.title="Show Install Instructions",k(K),K.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}hc||(K.addEventListener("click",async()=>{if(!pt){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),"serviceWorker"in navigator||console.warn("[PWA]: Service Workers not supported"),window.location.protocol!=="https:"&&window.location.hostname!=="localhost"&&console.warn("[PWA]: Not served over HTTPS");return}try{await pt.prompt();const{outcome:n}=await pt.userChoice;Ue(`User choice outcome: ${n}`),console.info(n==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),E(K),pt=null}catch(n){E(K),console.error("Error showing install prompt:",n)}}),hc=!0),window.addEventListener("appinstalled",()=>{E(K),pt=null}),pt?k(K):E(K)}window.addEventListener("beforeinstallprompt",n=>{console.debug("[PWA]: beforeinstallprompt fired"),n.preventDefault(),pt=n,K&&k(K)});let Qe=null,Xe=null;function zo(n=!0){return!Qe||!(Qe instanceof MediaStream)?(n&&console.error("Invalid remote MediaStream accessed:",Qe),null):Qe}function Jy(n){Qe=n}function Qy(){Qe&&(Qe.getTracks().forEach(n=>n.stop()),Qe=null)}function zn(n=!0){return!Xe||!(Xe instanceof MediaStream)?(n&&(console.error("Invalid local MediaStream accessed:",Xe),console.error("Call createLocalStream() before accessing local stream.")),null):Xe}function Ku(n){Xe=n}function Xy(){Xe&&(Xe.getTracks().forEach(n=>n.stop()),Xe=null)}const Zy=async()=>{const n=zn(!1);if(n&&n instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),n;const e=Wo("user"),t=await navigator.mediaDevices.getUserMedia({video:e||Cr.relyOnBrowserDefaults,audio:$u.default});return Ku(t),t};async function ev(n){const e=await Zy(),t=new MediaStream(e.getVideoTracks());return n.srcObject=t,!0}function tv(n,e,t){return n.ontrack=i=>{if(Ue(`REMOTE TRACK RECEIVED: ${i.track.kind}`),!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;const s=i.streams[0];zo(!1)!==s&&(Jy(s),e.srcObject=s,Ty(e,t),T("Connected!"))},!0}const Gn=new WeakMap;function Ju(n,e,t){if(!n||!t)throw new Error("setupIceCandidates: pc and roomId are required");if(Gn.has(n)||Gn.set(n,[]),e==="initiator")fc(n,"offerCandidates",t),pc(n,"answerCandidates",t);else if(e==="joiner")fc(n,"answerCandidates",t),pc(n,"offerCandidates",t);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function fc(n,e,t){n.onicecandidate=i=>{if(i.candidate){const s=Vg(O(x,`rooms/${t}/${e}`));at(s,i.candidate.toJSON())}}}function pc(n,e,t){const i=O(x,`rooms/${t}/${e}`);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{n.remoteDescription&&(Go(n),n.removeEventListener("signalingstatechange",a))};n.addEventListener("signalingstatechange",a)},o=a=>{const c=a.val();if(!(!n||n.signalingState==="closed")&&c)if(n.remoteDescription)try{n.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Gn.get(n);l&&(l.push(c),l.length===1&&r())}};pr(i,o),eu(i,"child_added",o)}function Go(n){if(!n||!Gn.has(n))return;const e=Gn.get(n);if(e.length!==0){Ue(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const t of e)try{n.addIceCandidate(new RTCIceCandidate(t)).catch(i=>{Ue("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}let we=null,gc=null;function Qu(n){gc=n,n.onconnectionstatechange=()=>{Ue("onconnectionstatechange:",n.connectionState),n.connectionState==="connected"?(T("Connected!"),qo(),Wu().catch(e=>console.warn("Failed to clear calling state on connect:",e)),we&&(clearTimeout(we),we=null)):n.connectionState==="disconnected"?(T("Partner disconnected (reconnecting...)"),we&&clearTimeout(we),we=setTimeout(()=>{n===gc&&n.connectionState==="disconnected"&&(T("Partner disconnected"),Zi()),we=null},3e3)):n.connectionState==="failed"&&(T("Connection failed"),bs(),we&&(clearTimeout(we),we=null),Zi())},n.addEventListener("iceconnectionstatechange",e=>{Ue("ICE iceconnectionstatechange:",n.iceConnectionState),n.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),n.restartIce())})}function mc(n){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!t||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(m=>{m.forEach(_=>{_.type==="attributes"&&_.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function c(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}t.addEventListener("click",c),kr(i,()=>{E(i)},{ignore:[t],esc:!0});function l(){k(t)}function u(){E(t)}function h(m){const _=document.createElement("p");_.textContent=m,m.startsWith("You:")?_.style.textAlign="right":m.startsWith("Partner:")&&(_.style.textAlign="left"),s.appendChild(_),s.scrollTop=s.scrollHeight}function d(m){h(`Partner: ${m}`),Oo(i)&&f()}function f(){t.classList.add("new-message"),setTimeout(()=>{t.classList.remove("new-message")},4e3)}r.addEventListener("submit",m=>{m.preventDefault();const _=o.value.trim();_&&(n(_),h(`You: ${_}`),o.value="")});function g(){a.disconnect(),t&&u(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:h,receiveMessage:d,toggleMessages:c,showMessagesToggle:l,hideMessagesToggle:u,cleanup:g}}function Xu(n,e){let t,i;return e==="initiator"?(t=n.createDataChannel("chat"),i=mc(r=>{t.readyState==="open"&&t.send(r)}),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)):e==="joiner"&&(n.ondatachannel=s=>{t=s.channel,i=mc(r=>t.send(r)),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)}),{dataChannel:t,messagesUI:i}}const Zu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},zs=new WeakMap;function nv(n,e,t){zs.has(n)||zs.set(n,{});const i=zs.get(n),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===t?!0:(i[s]=t,!1)}function iv(n,e){return n?e==="offer"?n.signalingState==="stable":n.signalingState==="have-local-offer"||n.signalingState==="stable":!1}function ed(n,e){e.getTracks().forEach(t=>{n.addTrack(t,e)})}async function sv(n){const e=await n.createOffer();return await n.setLocalDescription(e),e}async function rv(n){const e=await n.createAnswer();return await n.setLocalDescription(e),e}async function td(n,e,t){if(nv(n,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!iv(n,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,n.signalingState),!1;try{return await n.setRemoteDescription(new RTCSessionDescription(e)),t(n),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function ov(){return Math.random().toString(36).substring(2,9)}class av{constructor(){this.currentRoomId=null,this.memberListeners=[]}async createNewRoom(e,t,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:t,hasOffer:!!e,timestamp:s});const r=im(i);try{return await at(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:t}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:t,duration:Date.now()-s}),await this.joinRoom(i,t),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:t,totalDuration:Date.now()-s}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:t,duration:Date.now()-s}),o}}async checkRoomStatus(e){const t=O(x,`rooms/${e}`),i=await tn(t);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const t=O(x,`rooms/${e}`),i=await tn(t);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,t){const i=O(x,`rooms/${e}`);await Xl(i,{answer:{type:t.type,sdp:t.sdp}})}async joinRoom(e,t){const i=Date.now(),s=O(x,`rooms/${e}/members/${t}`);y().log("ROOM","JOIN_START",{roomId:e,userId:t,timestamp:i});try{await at(s,{joinedAt:Date.now()}),this.currentRoomId=e,y().logMemberJoinEvent(e,t,{joinedAt:Date.now(),role:"self"},{operation:"join_room",duration:Date.now()-i}),y().logFirebaseOperation("join_room",!0,null,{roomId:e,userId:t,duration:Date.now()-i})}catch(r){throw y().logFirebaseOperation("join_room",!1,r,{roomId:e,userId:t,duration:Date.now()-i}),r}}async leaveRoom(e){if(!this.currentRoomId)return;const t=O(x,`rooms/${this.currentRoomId}/members/${e}`);await ti(t).catch(()=>{}),this.currentRoomId=null}onMemberJoined(e,t){const i=O(x,`rooms/${e}/members`);pr(i,t),this.memberListeners.push({ref:i,type:"child_added",callback:t}),y().logListenerAttachment(e,"member_join",this.memberListeners.length,{listenerType:"onMemberJoined",totalListeners:this.memberListeners.length})}onMemberLeft(e,t){const i=O(x,`rooms/${e}/members`);Va(i,t),this.memberListeners.push({ref:i,type:"child_removed",callback:t}),y().logListenerAttachment(e,"member_leave",this.memberListeners.length,{listenerType:"onMemberLeft",totalListeners:this.memberListeners.length})}onIncomingCall(e,t){const i=O(x,`rooms/${e}/members`),s=o=>{t("join",o.key,o.val())},r=o=>{t("leave",o.key,o.val())};return pr(i,s),Va(i,r),this.memberListeners.push({ref:i,type:"child_added",callback:s}),this.memberListeners.push({ref:i,type:"child_removed",callback:r}),()=>{Sn(i,"child_added",s),Sn(i,"child_removed",r),this.memberListeners=this.memberListeners.filter(o=>o.callback!==s&&o.callback!==r)}}cleanupListeners(){const e=this.memberListeners.length,t=[...new Set(this.memberListeners.map(i=>i.ref.toString().match(/rooms\/([^\/]+)\/members/)?.[1]).filter(Boolean))];y().log("LISTENER","CLEANUP_START",{listenerCount:e,roomIds:t,timestamp:Date.now()}),this.memberListeners.forEach(({ref:i,type:s,callback:r})=>{Sn(i,s,r)}),y().logListenerCleanup(t,[],{cleanupType:"room_service_cleanup",listenersRemoved:e}),this.memberListeners=[]}get roomId(){return this.currentRoomId}}const te=new av;async function Ki({localStream:n,remoteVideoEl:e,mutePartnerBtn:t,setupRemoteStream:i,setupWatchSync:s,onMemberJoined:r,onMemberLeft:o,targetRoomId:a=null}){if(!n)return T("Error: Camera not initialized"),{success:!1};const c=new RTCPeerConnection(Zu),l="initiator",u=a||ov(),h=kt();ed(c,n);const{dataChannel:d,messagesUI:f}=Xu(c,l);if(!i(c,e,t))return T("Error setting up remote stream"),console.error("Error setting up remote stream"),c.close(),{success:!1};Ju(c,l,u),Qu(c);const m=await sv(c);await te.createNewRoom(m,h,u);const _=O(x,`rooms/${u}/answer`);tu(_,async ee=>{const Lt=ee.val();Lt&&await td(c,Lt,Go)}),s(u,l,h),te.onMemberJoined(u,ee=>{ee.key!==h&&r(ee.key,u)}),te.onMemberLeft(u,ee=>{ee.key!==h&&c?.connectionState==="connected"&&o(ee.key)});const M=`${window.location.origin}${window.location.pathname}?room=${u}`;return T("Waiting for partner to join..."),{success:!0,pc:c,roomId:u,roomLink:M,dataChannel:d,messagesUI:f,role:l}}async function cv({roomId:n,localStream:e,remoteVideoEl:t,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMemberJoined:o,onMemberLeft:a}){if(!e)return T("Error: Camera not initialized"),{success:!1};if(!n)return T("Error: No room ID"),{success:!1};const c=await te.checkRoomStatus(n);if(!c.exists)return T("Error: Invalid room link"),{success:!1};if(!c.hasMembers)return T("Error: Room is empty - no one to connect with"),{success:!1};let l;try{l=await te.getRoomData(n)}catch(M){return T("Error: "+M.message),{success:!1}}const u=l.offer;if(!u)return T("Error: No offer found"),{success:!1};const h=new RTCPeerConnection(Zu),d="joiner",f=kt();ed(h,e);const{dataChannel:g,messagesUI:m}=Xu(h,d);if(!s(h,t,i))return T("Error setting up remote stream"),console.error("Error setting up remote stream for joiner"),h.close(),{success:!1};Ju(h,d,n),Qu(h),await td(h,u,Go);const H=await rv(h);try{await te.saveAnswer(n,H)}catch(M){return console.error("Failed to save answer to Firebase:",M),T("Failed to send answer to partner."),h.close(),{success:!1}}return r(n,d,f),await te.joinRoom(n,f),te.onMemberJoined(n,M=>{M.key!==f&&o(M.key,n)}),te.onMemberLeft(n,M=>{M.key!==f&&h?.connectionState==="connected"&&a(M.key)}),T("Connecting..."),{success:!0,pc:h,roomId:n,dataChannel:g,messagesUI:m,role:d}}let _c=!1;function lv(n,e){const t=document.createElement("dialog");t.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=n,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),t.appendChild(i),{dialog:t,input:o,copyButton:c,cancelButton:l,feedback:u}}function uv(n,e={}){const t={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};dv();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=lv(n,t);hv(i);let c=!1;const l=async()=>{await nd(n,s)?(c=!0,a.textContent=t.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),t.onCopy&&t.onCopy(n),t.autoClose&&setTimeout(()=>{i.close()},t.autoCloseDelay)):(a.textContent=t.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),t.onError&&t.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{t.onCancel&&t.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&t.onCancel&&t.onCancel(),t.onClose&&t.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function dv(){if(_c)return;const n=document.createElement("style");n.textContent=`
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
  `,document.head.appendChild(n),_c=!0}function hv(n){n.showModal||(n.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},n.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function nd(n,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(n),!0}catch(t){return console.warn("Clipboard API failed, using fallback:",t),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(t){return console.error("Fallback copy failed:",t),!1}}let di=!1;const fv=n=>{if(di)return;if(!n){console.error("Auth UI: Parent element is required");return}di=!0;let e=[];const t=()=>{e.forEach(l=>l()),e=[]},i=document.createElement("div");i.className="auth flex-row",i.innerHTML=`
    <button id="goog-login-btn">Login</button>
    <button id="goog-logout-btn" disabled>Logout</button>
    <div class="user-info" id="user-info"></div>
  `,n&&n.appendChild(i);const s=i.querySelector("#goog-login-btn"),r=i.querySelector("#goog-logout-btn"),o=i.querySelector("#user-info");if(!s||!r||!o){console.error("Auth UI: Elements not found"),di=!1;return}s.addEventListener("click",Du),r.addEventListener("click",Ou);const a=Eu(hn,l=>{if(l){r.disabled=!1,r.style.display="inline-block";const u=l.displayName||"Guest User",h=u.length>7?u.slice(0,7)+"...":u;o.textContent=`Logged in: ${h}`}else s.style.display="inline-block",r.disabled=!0,o.textContent="Logged out"});return e.push(a),{cleanupAuthUI:()=>{t(),di=!1,n&&n.removeChild(i)}}};let Ie=null,Pr=null,yt,zt=null,Lr=null,Ji=[];const Qi=()=>{const n=zo(!1);return n&&n.getVideoTracks().some(e=>e.enabled)};async function pv(){const n=Mu(),t=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!n[i]);if(t.length>0)return console.error("Critical elements missing:",t),T("Error: Required UI elements not found."),!1;try{Ky(),zy(),vv();const{cleanupAuthUI:i}=fv(ms);return Ji.push(i),await ev(pe),Sy({getLocalStream:zn,getLocalVideo:()=>pe,getRemoteVideo:()=>j,getPeerConnection:()=>Ie,setLocalStream:Ku,micBtn:ws,cameraBtn:Es,switchCameraBtn:_s,mutePartnerBtn:Pt,fullscreenPartnerBtn:vs}),pe&&(pe.addEventListener("enterpictureinpicture",()=>Z&&E(Z)),pe.addEventListener("leavepictureinpicture",()=>{Z&&!(oi()&&Qi())&&k(Z)})),Yo(),!0}catch(i){return console.error("Failed to get user media:",i),T("Error: Please allow camera and microphone access."),!1}}function bs(){window.history.replaceState({},document.title,window.location.pathname)}function Ln(n=null){return{localStream:zn(),remoteVideoEl:j,mutePartnerBtn:Pt,setupRemoteStream:tv,setupWatchSync:Dy,onMemberJoined:(e,t)=>{Pr=e,qo(),Wu().catch(i=>console.warn("Failed to clear calling state:",i)),gv(t).catch(i=>console.warn("Failed to save recent call:",i))},onMemberLeft:e=>{console.info("Partner has left the call")},targetRoomId:n}}function Dn(n,e=!1){return n.success?(Ie=n.pc,n.role,n.dataChannel,yt=n.messagesUI,Lr=n.roomId,zt=n.roomLink||null,e&&zt&&uv(zt,{onCopy:()=>T("Link ready! Share with your partner."),onCancel:()=>T("Link ready! Use the copy button to use it, or create a new one.")}),Be.disabled=!1,!0):!1}async function Ts(n,{forceInitiator:e=!1}={}){const t=Date.now();if(e){y().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await Ki(Ln(n));return Dn(r,!1)}let i=await te.checkRoomStatus(n);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await te.checkRoomStatus(n),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await Ki(Ln(n));return Dn(r,!1)}T("Joining room..."),y().log("ROOM","JOINING_EXISTING",{roomId:n,memberCount:i.memberCount,roomExists:i.exists});const s=await cv({roomId:n,...Ln()});return Dn(s,!1)}const qe=new Set;async function gv(n){const e=Date.now(),t=e+1440*60*1e3,i=Re();if(i){const s=O(x,`users/${i}/recentCalls/${n}`);await at(s,{roomId:n,savedAt:e,expiresAt:t});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[n]={roomId:n,savedAt:e,expiresAt:t},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function mv(n){const e=Re();if(e){try{await ti(O(x,`users/${e}/recentCalls/${n}`))}catch(t){console.warn("Failed to remove recent call from RTDB",t)}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(t){console.warn("Failed to remove recent call from localStorage",t)}}function Xi(n){if(n){if(console.log(`[LISTENER] Attempting to attach listener for room: ${n}`),qe.has(n)){console.log(`[LISTENER] Duplicate listener prevented for room: ${n}`),y().logDuplicateListener(n,"member_join",{currentListenerCount:qe.size});return}console.log(`[LISTENER] Attaching new listener for room: ${n} (total: ${qe.size+1})`),qe.add(n),y().logListenerAttachment(n,"member_join",qe.size,{action:"incoming_call_listener_attached"}),te.onMemberJoined(n,async e=>{const t=e.key,i=e.val?e.val():null,s=kt();if(t&&t!==s){console.log(`incoming call from ${t} for room ${n}`),y().logMemberJoinEvent(n,t,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const f=await ly(t,n),g=await uy(n);a=f||g,c=f?"outgoingState":g?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(t,n,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){console.log(`Ignoring stale incoming call from ${t} for room ${n}`),y().logNotificationDecision("REJECT","stale_call",n,{age:l,validationMethod:c,joiningUserId:t});return}if(!!Ie&&Ie.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",n,{joiningUserId:t,currentCallState:Ie?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",n,{joiningUserId:t,freshnessResult:u}),await Vu(`Incoming call from ${t} for room ${n}.

Accept?`)?(y().logNotificationDecision("ACCEPT","user_accepted",n,{joiningUserId:t}),Ts(n).catch(f=>{console.warn("Failed to answer incoming call:",f),T("Failed to answer incoming call."),y().logFirebaseOperation("join_room_on_accept",!1,f,{roomId:n,joiningUserId:t})})):(console.log("Incoming call rejected by user"),y().logNotificationDecision("REJECT","user_rejected",n,{joiningUserId:t}))}}),te.onMemberLeft(n,async e=>{const t=e.key,i=kt();if(!(!t||t===i))try{(await te.checkRoomStatus(n)).hasMembers||(await mv(n),console.log(`Removed saved recent call for room ${n} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}})}}async function _v(){const n=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:n,currentListenerCount:qe.size});try{if(typeof window<"u"){const{getCurrentUserAsync:t}=await vc(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>ry);return{getCurrentUserAsync:i}},void 0);await t()}}catch{}const e=Re();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const t=O(x,`users/${e}/recentCalls`);try{const i=await tn(t),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await ti(O(x,`users/${e}/recentCalls/${o}`)).catch(()=>{});continue}r.add(o)}try{const o=await zi();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>Xi(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:qe.size,duration:Date.now()-n})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await zi();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>Xi(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:qe.size,duration:Date.now()-n,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(t){console.warn("Failed to read recent calls from localStorage",t),y().logFirebaseOperation("read_recent_calls",!1,t,{storage:"localStorage"})}}let be=null,Gs=null,qs=null;function yv(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Dr(){if(!oi()){if(qu(!0),E(We),ve.classList.remove("bottom"),ve.classList.add("watch-mode"),k(ve),be&&(be(),be=null),!Qi()){E(U),_t(U),wr(pe)||(k(Z),wt(Z));return}E(Z),_t(Z),wr(j)?(E(U),_t(U)):yv()?j.requestPictureInPicture().then(()=>{E(U),_t(U)}).catch(n=>{console.warn("Failed to enter Picture-in-Picture:",n),wt(U),k(U)}):(wt(U),k(U))}}function vi(){oi()&&(ve.classList.remove("watch-mode"),ve.classList.add("bottom"),be||(be=Bu(ve,{inactivityMs:3e3,hideOnEsc:!0})),Qi()&&(wr(U)&&document.exitPictureInPicture().catch(n=>{console.error("Failed to exit Picture-in-Picture:",n)}),_t(U),k(U)),wt(Z),k(Z),Qi()||(k(We),k(ct),k(Be)),qu(!1))}let hi=!1,qo=()=>{const n=zo(!1);if(!j||!n||j.paused||j.readyState<2){hi||(hi=!0,j.addEventListener("playing",()=>{hi=!1,qo()},{once:!0}));return}if(hi=!1,k(U),wt(Z),E(We),E(ct),E(Be),Nt.disabled=!0,Pt.disabled=!1,fn.disabled=!1,be||(be=Bu(ve,{inactivityMs:2500,hideOnEsc:!0})),!Gs){const e=()=>{oi()?wt(U):_t(U),k(U)};j.addEventListener("leavepictureinpicture",e),Gs=()=>j.removeEventListener("leavepictureinpicture",e),Ji.push(Gs)}if(!qs){const e=()=>E(U);j.addEventListener("enterpictureinpicture",e),qs=()=>j.removeEventListener("enterpictureinpicture",e),Ji.push(qs)}},Yo=()=>{_t(U),E(U),wt(Z),k(Z),Nt.disabled=!1,fn.disabled=!0,Pt.disabled=!0,be&&(be(),be=null),k(ve),ct.disabled=!1,Be.disabled=!0,k(We),k(ct),k(Be)};function Ys(){return W&&ce&&!ce.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let yc=!1;function vv(){if(yc)return;const n=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{n()||((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",yn()),console.log("isYTVisible():",Hs()),console.log("isSharedVideoVisible():",Ys()),console.log("isWatchModeActive():",oi()),yn()==="yt"?Hs()?(Tr(),vi()):(ju(),Dr()):yn()==="url"&&(Ys()?(E(ce),vi()):(k(ce),Dr()))),(e.key==="m"||e.key==="M")&&yt&&yt.toggleMessages()),e.key==="Escape"&&(yn()==="yt"&&Hs()?(Cs(),Tr()):yn()==="url"&&Ys()&&(W.pause(),E(ce)),vi())}),yc=!0}async function wv(){zt&&(await nd(zt)?(T("Link copied to clipboard!"),alert("Link copied!")):T("Failed to copy link to clipboard."))}Nt.onclick=async()=>{const n=await Ki(Ln());Dn(n,!0)};ct.onclick=async()=>{const n=await Ki(Ln());Dn(n,!0)};Be.onclick=async()=>await wv();fn.onclick=async()=>await Zi();function Ev(n){let e=n.trim();if(!e)return"";try{const t=new URL(e,window.location.origin),i=t.searchParams.get("room");if(i)return i;const s=t.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):t.pathname.replace(/^\//,"")||e}catch{return e}}async function Cv(n=5e3){if(zn())return!0;const e=Date.now();return new Promise(t=>{const i=()=>{if(zn())return t(!0);if(Date.now()-e>n)return t(!1);setTimeout(i,150)};i()})}async function Iv(){return!Rn||!Hi?!1:(Rn.disabled=!1,Rn.onclick=async()=>{const n=Hi.value||"",e=Ev(n);return e?await Cv(5e3)?await Ts(e):(T("Camera not ready. Please allow permissions and try again."),!1):(T("Please enter a room ID"),!1)},!0)}async function bv(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const t=await Ts(e);return t||(bs(),Yo()),T("Auto-joined room from URL"),t}window.onload=async()=>{if(!await pv()){Nt.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await Iv(),await _v().catch(t=>console.warn("Failed to start saved-room listeners",t)),Gi(We).catch(t=>{console.warn("Failed to render contacts list:",t)}),!await bv()&&T('Ready. Click "Start New Chat" to begin.')};window.addEventListener("beforeunload",async n=>{if(Ie&&Ie.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;await Tv()});let Ks=!1;async function Zi(){if(Ks)return;Ks=!0,console.debug("Hanging up..."),$t();const n=Pr,e=Lr;try{await te.leaveRoom(kt())}catch(t){console.warn("leaveRoom failed during hangUp:",t)}Qy(),j&&(j.srcObject=null),Ie&&(Ie.close(),Ie=null),Yo(),T('Disconnected. Click "Start New Chat" to begin.'),n&&e&&setTimeout(()=>{hy(n,e,We).catch(t=>{console.warn("Failed to save contact:",t)})},500),Pr=null,Lr=null,bs(),Ks=!1}async function Tv(){await Zi(),ky(),nm(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(n=>console.error(n)),yt&&yt.cleanup&&(yt.cleanup(),yt=null),window.history.replaceState({},document.title,window.location.pathname),zt=null,W.src="",ys.textContent="",Xy(),pe&&(pe.srcObject=null),j&&(j.srcObject=null),vi(),bs(),Ly("none"),Vo(),Hu(!1),Gy(),Ji.forEach(n=>n())}
