(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const $d="modulepreload",Vd=function(n){return"/HangVidU/"+n},va={},Yt=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var o=l;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(t.map(u=>{if(u=Vd(u),u in va)return;va[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":$d,d||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),d)return new Promise((g,v)=>{f.addEventListener("load",g),f.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};/**
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
 */const jd=()=>{};var wa={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw mn(e)},mn=function(n){return new Error("Firebase Database ("+Yc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Gd=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},qr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(t[u],t[d],t[h],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Kc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new zd;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const g=l<<6&192|d;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class zd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Jc=function(n){const e=Kc(n);return qr.encodeByteArray(e,!0)},Hi=function(n){return Jc(n).replace(/\./g,"")},$i=function(n){try{return qr.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(n){return Qc(void 0,n)}function Qc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Yd(t)||(n[t]=Qc(n[t],e[t]));return n}function Yd(n){return n!=="__proto__"}/**
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
 */function Kd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Jd=()=>Kd().__FIREBASE_DEFAULTS__,Qd=()=>{if(typeof process>"u"||typeof wa>"u")return;const n=wa.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Xd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&$i(n[1]);return e&&JSON.parse(e)},Yr=()=>{try{return jd()||Jd()||Qd()||Xd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Xc=n=>Yr()?.emulatorHosts?.[n],Zd=n=>{const e=Xc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Zc=()=>Yr()?.config,el=n=>Yr()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function _n(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function tl(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function eh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Hi(JSON.stringify(t)),Hi(JSON.stringify(o)),""].join(".")}const Fn={};function th(){const n={prod:[],emulator:[]};for(const e of Object.keys(Fn))Fn[e]?n.emulator.push(e):n.prod.push(e);return n}function nh(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Ca=!1;function nl(n,e){if(typeof window>"u"||typeof document>"u"||!_n(window.location.host)||Fn[n]===e||Fn[n]||Ca)return;Fn[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=th().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Ca=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=nh(i),f=t("text"),g=document.getElementById(f)||document.createElement("span"),v=t("learnmore"),y=document.getElementById(v)||document.createElement("a"),k=t("preprendIcon"),P=document.getElementById(k)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ie=h.element;a(ie),u(y,v);const E=l();c(P,k),ie.append(P,g,y,E),document.body.appendChild(ie)}r?(g.innerText="Preview backend disconnected.",P.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(P.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,g.innerText="Preview backend running in this workspace."),g.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Kr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(de())}function ih(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function sh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function il(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rh(){const n=de();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function oh(){return Yc.NODE_ADMIN===!0}function ah(){try{return typeof indexedDB=="object"}catch{return!1}}function ch(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh="FirebaseError";class Ct extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=lh,Object.setPrototypeOf(this,Ct.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ui.prototype.create)}}class ui{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?uh(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ct(s,a,i)}}function uh(n,e){return n.replace(dh,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const dh=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(n){return JSON.parse(n)}function z(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=qn($i(r[0])||""),t=qn($i(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},hh=function(n){const e=sl(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},fh=function(n){const e=sl(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function rn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function dr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vi(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function xt(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Ea(r)&&Ea(o)){if(!xt(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ea(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function gh(n,e){const t=new mh(n,e);return t.subscribe.bind(t)}class mh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");_h(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Hs),s.error===void 0&&(s.error=Hs),s.complete===void 0&&(s.complete=Hs);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function _h(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Hs(){}function _s(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ys=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function he(n){return n&&n._delegate?n._delegate:n}class Ft{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Tt="[DEFAULT]";/**
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
 */class vh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new li;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ch(e))try{this.getOrInitializeService({instanceIdentifier:Tt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Tt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tt){return this.instances.has(e)}getOptions(e=Tt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:wh(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Tt){return this.component?this.component.multipleInstances?e:Tt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function wh(n){return n===Tt?void 0:n}function Ch(n){return n.instantiationMode==="EAGER"}/**
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
 */class Eh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(N||(N={}));const bh={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Ih=N.INFO,Sh={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},Th=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Sh[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Jr{constructor(e){this.name=e,this._logLevel=Ih,this._logHandler=Th,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?bh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const Rh=(n,e)=>e.some(t=>n instanceof t);let ba,Ia;function kh(){return ba||(ba=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ah(){return Ia||(Ia=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const rl=new WeakMap,hr=new WeakMap,ol=new WeakMap,$s=new WeakMap,Qr=new WeakMap;function Ph(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ht(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&rl.set(t,n)}).catch(()=>{}),Qr.set(e,n),e}function Nh(n){if(hr.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});hr.set(n,e)}let fr={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return hr.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ol.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ht(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Lh(n){fr=n(fr)}function Oh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Vs(this),e,...t);return ol.set(i,e.sort?e.sort():[e]),ht(i)}:Ah().includes(n)?function(...e){return n.apply(Vs(this),e),ht(rl.get(this))}:function(...e){return ht(n.apply(Vs(this),e))}}function Dh(n){return typeof n=="function"?Oh(n):(n instanceof IDBTransaction&&Nh(n),Rh(n,kh())?new Proxy(n,fr):n)}function ht(n){if(n instanceof IDBRequest)return Ph(n);if($s.has(n))return $s.get(n);const e=Dh(n);return e!==n&&($s.set(n,e),Qr.set(e,n)),e}const Vs=n=>Qr.get(n);function Mh(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=ht(o);return i&&o.addEventListener("upgradeneeded",c=>{i(ht(o.result),c.oldVersion,c.newVersion,ht(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const xh=["get","getKey","getAll","getAllKeys","count"],Fh=["put","add","delete","clear"],js=new Map;function Sa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(js.get(e))return js.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Fh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||xh.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return js.set(e,r),r}Lh(n=>({...n,get:(e,t,i)=>Sa(e,t)||n.get(e,t,i),has:(e,t)=>!!Sa(e,t)||n.has(e,t)}));/**
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
 */class Uh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Bh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Bh(n){return n.getComponent()?.type==="VERSION"}const pr="@firebase/app",Ta="0.14.4";/**
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
 */const Qe=new Jr("@firebase/app"),Wh="@firebase/app-compat",Hh="@firebase/analytics-compat",$h="@firebase/analytics",Vh="@firebase/app-check-compat",jh="@firebase/app-check",Gh="@firebase/auth",zh="@firebase/auth-compat",qh="@firebase/database",Yh="@firebase/data-connect",Kh="@firebase/database-compat",Jh="@firebase/functions",Qh="@firebase/functions-compat",Xh="@firebase/installations",Zh="@firebase/installations-compat",ef="@firebase/messaging",tf="@firebase/messaging-compat",nf="@firebase/performance",sf="@firebase/performance-compat",rf="@firebase/remote-config",of="@firebase/remote-config-compat",af="@firebase/storage",cf="@firebase/storage-compat",lf="@firebase/firestore",uf="@firebase/ai",df="@firebase/firestore-compat",hf="firebase",ff="12.4.0";/**
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
 */const gr="[DEFAULT]",pf={[pr]:"fire-core",[Wh]:"fire-core-compat",[$h]:"fire-analytics",[Hh]:"fire-analytics-compat",[jh]:"fire-app-check",[Vh]:"fire-app-check-compat",[Gh]:"fire-auth",[zh]:"fire-auth-compat",[qh]:"fire-rtdb",[Yh]:"fire-data-connect",[Kh]:"fire-rtdb-compat",[Jh]:"fire-fn",[Qh]:"fire-fn-compat",[Xh]:"fire-iid",[Zh]:"fire-iid-compat",[ef]:"fire-fcm",[tf]:"fire-fcm-compat",[nf]:"fire-perf",[sf]:"fire-perf-compat",[rf]:"fire-rc",[of]:"fire-rc-compat",[af]:"fire-gcs",[cf]:"fire-gcs-compat",[lf]:"fire-fst",[df]:"fire-fst-compat",[uf]:"fire-vertex","fire-js":"fire-js",[hf]:"fire-js-all"};/**
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
 */const ji=new Map,gf=new Map,mr=new Map;function Ra(n,e){try{n.container.addComponent(e)}catch(t){Qe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function on(n){const e=n.name;if(mr.has(e))return Qe.debug(`There were multiple attempts to register component ${e}.`),!1;mr.set(e,n);for(const t of ji.values())Ra(t,n);for(const t of gf.values())Ra(t,n);return!0}function Xr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ie(n){return n==null?!1:n.settings!==void 0}/**
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
 */const mf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ft=new ui("app","Firebase",mf);/**
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
 */class _f{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ft("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ft.create("app-deleted",{appName:this._name})}}/**
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
 */const vn=ff;function al(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:gr,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ft.create("bad-app-name",{appName:String(s)});if(t||(t=Zc()),!t)throw ft.create("no-options");const r=ji.get(s);if(r){if(xt(t,r.options)&&xt(i,r.config))return r;throw ft.create("duplicate-app",{appName:s})}const o=new Eh(s);for(const c of mr.values())o.addComponent(c);const a=new _f(t,i,o);return ji.set(s,a),a}function cl(n=gr){const e=ji.get(n);if(!e&&n===gr&&Zc())return al();if(!e)throw ft.create("no-app",{appName:n});return e}function pt(n,e,t){let i=pf[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qe.warn(o.join(" "));return}on(new Ft(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const yf="firebase-heartbeat-database",vf=1,Yn="firebase-heartbeat-store";let Gs=null;function ll(){return Gs||(Gs=Mh(yf,vf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Yn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ft.create("idb-open",{originalErrorMessage:n.message})})),Gs}async function wf(n){try{const t=(await ll()).transaction(Yn),i=await t.objectStore(Yn).get(ul(n));return await t.done,i}catch(e){if(e instanceof Ct)Qe.warn(e.message);else{const t=ft.create("idb-get",{originalErrorMessage:e?.message});Qe.warn(t.message)}}}async function ka(n,e){try{const i=(await ll()).transaction(Yn,"readwrite");await i.objectStore(Yn).put(e,ul(n)),await i.done}catch(t){if(t instanceof Ct)Qe.warn(t.message);else{const i=ft.create("idb-set",{originalErrorMessage:t?.message});Qe.warn(i.message)}}}function ul(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Cf=1024,Ef=30;class bf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Sf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Aa();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Ef){const s=Tf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Qe.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Aa(),{heartbeatsToSend:t,unsentEntries:i}=If(this._heartbeatsCache.heartbeats),s=Hi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Qe.warn(e),""}}}function Aa(){return new Date().toISOString().substring(0,10)}function If(n,e=Cf){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Pa(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Pa(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Sf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ah()?ch().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await wf(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ka(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ka(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Pa(n){return Hi(JSON.stringify({version:2,heartbeats:n})).length}function Tf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Rf(n){on(new Ft("platform-logger",e=>new Uh(e),"PRIVATE")),on(new Ft("heartbeat",e=>new bf(e),"PRIVATE")),pt(pr,Ta,n),pt(pr,Ta,"esm2020"),pt("fire-js","")}Rf("");var Na={};const La="@firebase/database",Oa="1.1.0";/**
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
 */let dl="";function kf(n){dl=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),z(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:qn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pf{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Ve(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Af(e)}}catch{}return new Pf},Pt=hl("localStorage"),Nf=hl("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kt=new Jr("@firebase/database"),Lf=(function(){let n=1;return function(){return n++}})(),fl=function(n){const e=yh(n),t=new ph;t.update(e);const i=t.digest();return qr.encodeByteArray(i)},di=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=di.apply(null,i):typeof i=="object"?e+=z(i):e+=i,e+=" "}return e};let Un=null,Da=!0;const Of=function(n,e){p(!0,"Can't turn on custom loggers persistently."),Kt.logLevel=N.VERBOSE,Un=Kt.log.bind(Kt)},Z=function(...n){if(Da===!0&&(Da=!1,Un===null&&Nf.get("logging_enabled")===!0&&Of()),Un){const e=di.apply(null,n);Un(e)}},hi=function(n){return function(...e){Z(n,...e)}},_r=function(...n){const e="FIREBASE INTERNAL ERROR: "+di(...n);Kt.error(e)},Xe=function(...n){const e=`FIREBASE FATAL ERROR: ${di(...n)}`;throw Kt.error(e),new Error(e)},ue=function(...n){const e="FIREBASE WARNING: "+di(...n);Kt.warn(e)},Df=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&ue("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Zr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Mf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},an="[MIN_NAME]",Ut="[MAX_NAME]",$t=function(n,e){if(n===e)return 0;if(n===an||e===Ut)return-1;if(e===an||n===Ut)return 1;{const t=Ma(n),i=Ma(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},xf=function(n,e){return n===e?0:n<e?-1:1},An=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+z(e))},eo=function(n){if(typeof n!="object"||n===null)return z(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=z(e[i]),t+=":",t+=eo(n[e[i]]);return t+="}",t},pl=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function ne(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const gl=function(n){p(!Zr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Ff=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Uf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Bf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Wf=new RegExp("^-?(0*)\\d{1,10}$"),Hf=-2147483648,$f=2147483647,Ma=function(n){if(Wf.test(n)){const e=Number(n);if(e>=Hf&&e<=$f)return e}return null},wn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw ue("Exception was thrown by user callback.",t),e},Math.floor(0))}},Vf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Bn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class jf{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ie(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){ue(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Z("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',ue(e)}}class Pi{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Pi.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="5",ml="v",_l="s",yl="r",vl="f",wl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Cl="ls",El="p",yr="ac",bl="websocket",Il="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Pt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Pt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function zf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Tl(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===bl)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Il)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);zf(n)&&(t.ns=n.namespace);const s=[];return ne(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(){this.counters_={}}incrementCounter(e,t=1){Ve(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return qd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs={},qs={};function no(n){const e=n.toString();return zs[e]||(zs[e]=new qf),zs[e]}function Yf(n,e){const t=n.toString();return qs[t]||(qs[t]=e()),qs[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&wn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa="start",Jf="close",Qf="pLPCommand",Xf="pRTLPCB",Rl="id",kl="pw",Al="ser",Zf="cb",ep="seg",tp="ts",np="d",ip="dframe",Pl=1870,Nl=30,sp=Pl-Nl,rp=25e3,op=3e4;class zt{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=hi(e),this.stats_=no(t),this.urlFn=c=>(this.appCheckToken&&(c[yr]=this.appCheckToken),Tl(t,Il,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Kf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(op)),Mf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new io((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===xa)this.id=a,this.password=c;else if(o===Jf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[xa]="t",i[Al]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Zf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[ml]=to,this.transportSessionId&&(i[_l]=this.transportSessionId),this.lastSessionId&&(i[Cl]=this.lastSessionId),this.applicationId&&(i[El]=this.applicationId),this.appCheckToken&&(i[yr]=this.appCheckToken),typeof location<"u"&&location.hostname&&wl.test(location.hostname)&&(i[yl]=vl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){zt.forceAllow_=!0}static forceDisallow(){zt.forceDisallow_=!0}static isAvailable(){return zt.forceAllow_?!0:!zt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ff()&&!Uf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Jc(t),s=pl(i,sp);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[ip]="t",i[Rl]=e,i[kl]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=z(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class io{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Lf(),window[Qf+this.uniqueCallbackIdentifier]=e,window[Xf+this.uniqueCallbackIdentifier]=t,this.myIFrame=io.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Z("frame writing exception"),a.stack&&Z(a.stack),Z(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Z("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Rl]=this.myID,e[kl]=this.myPW,e[Al]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Nl+i.length<=Pl;){const o=this.pendingSegs.shift();i=i+"&"+ep+s+"="+o.seg+"&"+tp+s+"="+o.ts+"&"+np+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(rp)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Z("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ap=16384,cp=45e3;let Gi=null;typeof MozWebSocket<"u"?Gi=MozWebSocket:typeof WebSocket<"u"&&(Gi=WebSocket);class Se{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=hi(this.connId),this.stats_=no(t),this.connURL=Se.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[ml]=to,typeof location<"u"&&location.hostname&&wl.test(location.hostname)&&(o[yl]=vl),t&&(o[_l]=t),i&&(o[Cl]=i),s&&(o[yr]=s),r&&(o[El]=r),Tl(e,bl,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Pt.set("previous_websocket_failure",!0);try{let i;oh(),this.mySock=new Gi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Se.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Gi!==null&&!Se.forceDisallow_}static previouslyFailed(){return Pt.isInMemoryStorage||Pt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Pt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=qn(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=pl(t,ap);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(cp))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Se.responsesRequiredToBeHealthy=2;Se.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{static get ALL_TRANSPORTS(){return[zt,Se]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Se&&Se.isAvailable();let i=t&&!Se.previouslyFailed();if(e.webSocketOnly&&(t||ue("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Se];else{const s=this.transports_=[];for(const r of Kn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Kn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Kn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lp=6e4,up=5e3,dp=10*1024,hp=100*1024,Ys="t",Fa="d",fp="s",Ua="r",pp="e",Ba="o",Wa="a",Ha="n",$a="p",gp="h";class mp{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=hi("c:"+this.id+":"),this.transportManager_=new Kn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Bn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>hp?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>dp?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ys in e){const t=e[Ys];t===Wa?this.upgradeIfSecondaryHealthy_():t===Ua?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ba&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=An("t",e),i=An("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:$a,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Wa,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ha,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=An("t",e),i=An("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=An(Ys,e);if(Fa in e){const i=e[Fa];if(t===gp){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Ha){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===fp?this.onConnectionShutdown_(i):t===Ua?this.onReset_(i):t===pp?_r("Server Error: "+i):t===Ba?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):_r("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),to!==i&&ue("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Bn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(lp))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Bn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(up))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:$a,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Pt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ol{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi extends Ol{static getInstance(){return new zi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Kr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va=32,ja=768;class L{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function R(){return new L("")}function I(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function yt(n){return n.pieces_.length-n.pieceNum_}function M(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new L(n.pieces_,e)}function so(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function _p(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Jn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Dl(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new L(e,0)}function $(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof L)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new L(t,0)}function T(n){return n.pieceNum_>=n.pieces_.length}function le(n,e){const t=I(n),i=I(e);if(t===null)return e;if(t===i)return le(M(n),M(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function yp(n,e){const t=Jn(n,0),i=Jn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=$t(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function ro(n,e){if(yt(n)!==yt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Ce(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(yt(n)>yt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class vp{constructor(e,t){this.errorPrefix_=t,this.parts_=Jn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ys(this.parts_[i]);Ml(this)}}function wp(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ys(e),Ml(n)}function Cp(n){const e=n.parts_.pop();n.byteLength_-=ys(e),n.parts_.length>0&&(n.byteLength_-=1)}function Ml(n){if(n.byteLength_>ja)throw new Error(n.errorPrefix_+"has a key path longer than "+ja+" bytes ("+n.byteLength_+").");if(n.parts_.length>Va)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Va+") or object contains a cycle "+Rt(n))}function Rt(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo extends Ol{static getInstance(){return new oo}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=1e3,Ep=300*1e3,Ga=30*1e3,bp=1.3,Ip=3e4,Sp="server_kill",za=3;class Je extends Ll{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Je.nextPersistentConnectionId_++,this.log_=hi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Pn,this.maxReconnectDelay_=Ep,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");oo.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&zi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(z(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new li,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Je.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Ve(e,"w")){const i=rn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();ue(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||fh(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ga)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=hh(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+z(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):_r("Unrecognized action received from server: "+z(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Pn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Pn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ip&&(this.reconnectDelay_=Pn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*bp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Je.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Z("getToken() completed but was canceled"):(Z("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new mp(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{ue(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Sp)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&ue(d),c())}}}interrupt(e){Z("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Z("Resuming connection for reason: "+e),delete this.interruptReasons_[e],dr(this.interruptReasons_)&&(this.reconnectDelay_=Pn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>eo(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new L(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Z("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=za&&(this.reconnectDelay_=Ga,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Z("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=za&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+dl.replace(/\./g,"-")]=1,Kr()?e["framework.cordova"]=1:il()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=zi.getInstance().currentlyOnline();return dr(this.interruptReasons_)&&e}}Je.nextPersistentConnectionId_=0;Je.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new S(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new S(an,e),s=new S(an,t);return this.compare(i,s)!==0}minPost(){return S.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bi;class xl extends vs{static get __EMPTY_NODE(){return bi}static set __EMPTY_NODE(e){bi=e}compare(e,t){return $t(e.name,t.name)}isDefinedOn(e){throw mn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return S.MIN}maxPost(){return new S(Ut,bi)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new S(e,bi)}toString(){return".key"}}const Jt=new xl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Y{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Y.RED,this.left=s??fe.EMPTY_NODE,this.right=r??fe.EMPTY_NODE}copy(e,t,i,s,r){return new Y(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return fe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return fe.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Y.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Y.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Y.RED=!0;Y.BLACK=!1;class Tp{copy(e,t,i,s,r){return this}insert(e,t,i){return new Y(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class fe{constructor(e,t=fe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new fe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Y.BLACK,null,null))}remove(e){return new fe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Y.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ii(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ii(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ii(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ii(this.root_,null,this.comparator_,!0,e)}}fe.EMPTY_NODE=new Tp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(n,e){return $t(n.name,e.name)}function ao(n,e){return $t(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vr;function kp(n){vr=n}const Fl=function(n){return typeof n=="number"?"number:"+gl(n):"string:"+n},Ul=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ve(e,".sv"),"Priority must be a string or number.")}else p(n===vr||n.isEmpty(),"priority of unexpected type.");p(n===vr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qa;class q{static set __childrenNodeConstructor(e){qa=e}static get __childrenNodeConstructor(){return qa}constructor(e,t=q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Ul(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return T(e)?this:I(e)===".priority"?this.priorityNode_:q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=I(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||yt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,q.__childrenNodeConstructor.EMPTY_NODE.updateChild(M(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Fl(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=gl(this.value_):e+=this.value_,this.lazyHash_=fl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof q.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=q.VALUE_TYPE_ORDER.indexOf(t),r=q.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bl,Wl;function Ap(n){Bl=n}function Pp(n){Wl=n}class Np extends vs{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?$t(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return S.MIN}maxPost(){return new S(Ut,new q("[PRIORITY-POST]",Wl))}makePost(e,t){const i=Bl(e);return new S(t,new q("[PRIORITY-POST]",i))}toString(){return".priority"}}const V=new Np;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lp=Math.log(2);class Op{constructor(e){const t=r=>parseInt(Math.log(r)/Lp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const qi=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=n[c],h=t?t(d):d,new Y(h,d.node,Y.BLACK,null,null);{const f=parseInt(u/2,10)+c,g=s(c,f),v=s(f+1,l);return d=n[f],h=t?t(d):d,new Y(h,d.node,Y.BLACK,g,v)}},r=function(c){let l=null,u=null,d=n.length;const h=function(g,v){const y=d-g,k=d;d-=g;const P=s(y+1,k),ie=n[y],E=t?t(ie):ie;f(new Y(E,ie.node,v,null,P))},f=function(g){l?(l.left=g,l=g):(u=g,l=g)};for(let g=0;g<c.count;++g){const v=c.nextBitIsOne(),y=Math.pow(2,c.count-(g+1));v?h(y,Y.BLACK):(h(y,Y.BLACK),h(y,Y.RED))}return u},o=new Op(n.length),a=r(o);return new fe(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ks;const Gt={};class qe{static get Default(){return p(Gt&&V,"ChildrenNode.ts has not been loaded"),Ks=Ks||new qe({".priority":Gt},{".priority":V}),Ks}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=rn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof fe?t:null}hasIndex(e){return Ve(this.indexSet_,e.toString())}addIndex(e,t){p(e!==Jt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(S.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=qi(i,e.getCompare()):a=Gt;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new qe(u,l)}addToIndexes(e,t){const i=Vi(this.indexes_,(s,r)=>{const o=rn(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Gt)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(S.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),qi(a,o.getCompare())}else return Gt;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new S(e.name,a))),c.insert(e,e.node)}});return new qe(i,this.indexSet_)}removeFromIndexes(e,t){const i=Vi(this.indexes_,s=>{if(s===Gt)return s;{const r=t.get(e.name);return r?s.remove(new S(e.name,r)):s}});return new qe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nn;class w{static get EMPTY_NODE(){return Nn||(Nn=new w(new fe(ao),null,qe.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Ul(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Nn}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Nn:t}}getChild(e){const t=I(e);return t===null?this:this.getImmediateChild(t).getChild(M(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new S(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Nn:this.priorityNode_;return new w(s,o,r)}}updateChild(e,t){const i=I(e);if(i===null)return t;{p(I(e)!==".priority"||yt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(M(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(V,(o,a)=>{t[o]=a.val(e),i++,r&&w.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Fl(this.getPriority().val())+":"),this.forEachChild(V,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":fl(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new S(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new S(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new S(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,S.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,S.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===fi?-1:0}withIndex(e){if(e===Jt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Jt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(V),s=t.getIterator(V);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Jt?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Dp extends w{constructor(){super(new fe(ao),w.EMPTY_NODE,qe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const fi=new Dp;Object.defineProperties(S,{MIN:{value:new S(an,w.EMPTY_NODE)},MAX:{value:new S(Ut,fi)}});xl.__EMPTY_NODE=w.EMPTY_NODE;q.__childrenNodeConstructor=w;kp(fi);Pp(fi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp=!0;function G(n,e=null){if(n===null)return w.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new q(t,G(e))}if(!(n instanceof Array)&&Mp){const t=[];let i=!1;if(ne(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=G(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new S(o,c)))}}),t.length===0)return w.EMPTY_NODE;const r=qi(t,Rp,o=>o.name,ao);if(i){const o=qi(t,V.getCompare());return new w(r,G(e),new qe({".priority":o},{".priority":V}))}else return new w(r,G(e),qe.Default)}else{let t=w.EMPTY_NODE;return ne(n,(i,s)=>{if(Ve(n,i)&&i.substring(0,1)!=="."){const r=G(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(G(e))}}Ap(G);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp extends vs{constructor(e){super(),this.indexPath_=e,p(!T(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?$t(e.name,t.name):r}makePost(e,t){const i=G(e),s=w.EMPTY_NODE.updateChild(this.indexPath_,i);return new S(t,s)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,fi);return new S(Ut,e)}toString(){return Jn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp extends vs{compare(e,t){const i=e.node.compareTo(t.node);return i===0?$t(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return S.MIN}maxPost(){return S.MAX}makePost(e,t){const i=G(e);return new S(t,i)}toString(){return".value"}}const Up=new Fp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(n){return{type:"value",snapshotNode:n}}function cn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Qn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Xn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Bp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Qn(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(cn(t,i)):o.trackChildChange(Xn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(V,(s,r)=>{t.hasChild(s)||i.trackChildChange(Qn(s,r))}),t.isLeafNode()||t.forEachChild(V,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Xn(s,r,o))}else i.trackChildChange(cn(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e){this.indexedFilter_=new co(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Zn.getStartPost_(e),this.endPost_=Zn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new S(t,i))||(i=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=w.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(w.EMPTY_NODE);const r=this;return t.forEachChild(V,(o,a)=>{r.matches(new S(o,a))||(s=s.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Zn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new S(t,i))||(i=w.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=w.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(w.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const c=new S(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Xn(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(Qn(t,d));const v=a.updateImmediateChild(t,w.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(cn(h.name,h.node)),v.updateImmediateChild(h.name,h.node)):v}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Qn(l.name,l.node)),r.trackChildChange(cn(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,w.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=V}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:an}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ut}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===V}copy(){const e=new lo;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Hp(n){return n.loadsAllData()?new co(n.getIndex()):n.hasLimit()?new Wp(n):new Zn(n)}function Ya(n){const e={};if(n.isDefault())return e;let t;if(n.index_===V?t="$priority":n.index_===Up?t="$value":n.index_===Jt?t="$key":(p(n.index_ instanceof xp,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=z(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=z(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+z(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=z(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+z(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ka(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==V&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yi extends Ll{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=hi("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Yi.getListenId_(e,i),a={};this.listens_[o]=a;const c=Ya(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),rn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,t){const i=Yi.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Ya(e._queryParams),i=e._path.toString(),s=new li;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+yn(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=qn(a.responseText)}catch{ue("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&ue("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(){return{value:null,children:new Map}}function $l(n,e,t){if(T(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=I(e);n.children.has(i)||n.children.set(i,Ki());const s=n.children.get(i);e=M(e),$l(s,e,t)}}function wr(n,e,t){n.value!==null?t(e,n.value):Vp(n,(i,s)=>{const r=new L(e.toString()+"/"+i);wr(s,r,t)})}function Vp(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&ne(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja=10*1e3,Gp=30*1e3,zp=300*1e3;class qp{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new jp(e);const i=Ja+(Gp-Ja)*Math.random();Bn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;ne(e,(s,r)=>{r>0&&Ve(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Bn(this.reportStats_.bind(this),Math.floor(Math.random()*2*zp))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Re;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Re||(Re={}));function uo(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ho(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function fo(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Re.ACK_USER_WRITE,this.source=uo()}operationForChild(e){if(T(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new L(e));return new Ji(R(),t,this.revert)}}else return p(I(this.path)===e,"operationForChild called for unrelated child."),new Ji(M(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,t){this.source=e,this.path=t,this.type=Re.LISTEN_COMPLETE}operationForChild(e){return T(this.path)?new ei(this.source,R()):new ei(this.source,M(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Re.OVERWRITE}operationForChild(e){return T(this.path)?new Bt(this.source,R(),this.snap.getImmediateChild(e)):new Bt(this.source,M(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Re.MERGE}operationForChild(e){if(T(this.path)){const t=this.children.subtree(new L(e));return t.isEmpty()?null:t.value?new Bt(this.source,R(),t.value):new ln(this.source,R(),t)}else return p(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ln(this.source,M(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(T(e))return this.isFullyInitialized()&&!this.filtered_;const t=I(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Kp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Bp(o.childName,o.snapshotNode))}),Ln(n,s,"child_removed",e,i,t),Ln(n,s,"child_added",e,i,t),Ln(n,s,"child_moved",r,i,t),Ln(n,s,"child_changed",e,i,t),Ln(n,s,"value",e,i,t),s}function Ln(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>Qp(n,a,c)),o.forEach(a=>{const c=Jp(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function Jp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Qp(n,e,t){if(e.childName==null||t.childName==null)throw mn("Should only compare child_ events.");const i=new S(e.childName,e.snapshotNode),s=new S(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(n,e){return{eventCache:n,serverCache:e}}function Wn(n,e,t,i){return ws(new vt(e,t,i),n.serverCache)}function Vl(n,e,t,i){return ws(n.eventCache,new vt(e,t,i))}function Qi(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Wt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Js;const Xp=()=>(Js||(Js=new fe(xf)),Js);class O{static fromObject(e){let t=new O(null);return ne(e,(i,s)=>{t=t.set(new L(i),s)}),t}constructor(e,t=Xp()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:R(),value:this.value};if(T(e))return null;{const i=I(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(M(e),t);return r!=null?{path:$(new L(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(T(e))return this;{const t=I(e),i=this.children.get(t);return i!==null?i.subtree(M(e)):new O(null)}}set(e,t){if(T(e))return new O(t,this.children);{const i=I(e),r=(this.children.get(i)||new O(null)).set(M(e),t),o=this.children.insert(i,r);return new O(this.value,o)}}remove(e){if(T(e))return this.children.isEmpty()?new O(null):new O(null,this.children);{const t=I(e),i=this.children.get(t);if(i){const s=i.remove(M(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new O(null):new O(this.value,r)}else return this}}get(e){if(T(e))return this.value;{const t=I(e),i=this.children.get(t);return i?i.get(M(e)):null}}setTree(e,t){if(T(e))return t;{const i=I(e),r=(this.children.get(i)||new O(null)).setTree(M(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new O(this.value,o)}}fold(e){return this.fold_(R(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_($(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,R(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(T(e))return null;{const r=I(e),o=this.children.get(r);return o?o.findOnPath_(M(e),$(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,R(),t)}foreachOnPath_(e,t,i){if(T(e))return this;{this.value&&i(t,this.value);const s=I(e),r=this.children.get(s);return r?r.foreachOnPath_(M(e),$(t,s),i):new O(null)}}foreach(e){this.foreach_(R(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_($(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.writeTree_=e}static empty(){return new Pe(new O(null))}}function Hn(n,e,t){if(T(e))return new Pe(new O(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=le(s,e);return r=r.updateChild(o,t),new Pe(n.writeTree_.set(s,r))}else{const s=new O(t),r=n.writeTree_.setTree(e,s);return new Pe(r)}}}function Cr(n,e,t){let i=n;return ne(t,(s,r)=>{i=Hn(i,$(e,s),r)}),i}function Qa(n,e){if(T(e))return Pe.empty();{const t=n.writeTree_.setTree(e,new O(null));return new Pe(t)}}function Er(n,e){return Vt(n,e)!=null}function Vt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(le(t.path,e)):null}function Xa(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(V,(i,s)=>{e.push(new S(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new S(i,s.value))}),e}function gt(n,e){if(T(e))return n;{const t=Vt(n,e);return t!=null?new Pe(new O(t)):new Pe(n.writeTree_.subtree(e))}}function br(n){return n.writeTree_.isEmpty()}function un(n,e){return jl(R(),n.writeTree_,e)}function jl(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=jl($(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild($(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(n,e){return Yl(e,n)}function Zp(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Hn(n.visibleWrites,e,t)),n.lastWriteId=i}function eg(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Cr(n.visibleWrites,e,t),n.lastWriteId=i}function tg(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function ng(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&ig(a,i.path)?s=!1:Ce(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return sg(n),!0;if(i.snap)n.visibleWrites=Qa(n.visibleWrites,i.path);else{const a=i.children;ne(a,c=>{n.visibleWrites=Qa(n.visibleWrites,$(i.path,c))})}return!0}else return!1}function ig(n,e){if(n.snap)return Ce(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ce($(n.path,t),e))return!0;return!1}function sg(n){n.visibleWrites=Gl(n.allWrites,rg,R()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function rg(n){return n.visible}function Gl(n,e,t){let i=Pe.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)Ce(t,o)?(a=le(t,o),i=Hn(i,a,r.snap)):Ce(o,t)&&(a=le(o,t),i=Hn(i,R(),r.snap.getChild(a)));else if(r.children){if(Ce(t,o))a=le(t,o),i=Cr(i,a,r.children);else if(Ce(o,t))if(a=le(o,t),T(a))i=Cr(i,R(),r.children);else{const c=rn(r.children,I(a));if(c){const l=c.getChild(M(a));i=Hn(i,R(),l)}}}else throw mn("WriteRecord should have .snap or .children")}}return i}function zl(n,e,t,i,s){if(!i&&!s){const r=Vt(n.visibleWrites,e);if(r!=null)return r;{const o=gt(n.visibleWrites,e);if(br(o))return t;if(t==null&&!Er(o,R()))return null;{const a=t||w.EMPTY_NODE;return un(o,a)}}}else{const r=gt(n.visibleWrites,e);if(!s&&br(r))return t;if(!s&&t==null&&!Er(r,R()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(Ce(l.path,e)||Ce(e,l.path))},a=Gl(n.allWrites,o,e),c=t||w.EMPTY_NODE;return un(a,c)}}}function og(n,e,t){let i=w.EMPTY_NODE;const s=Vt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(V,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=gt(n.visibleWrites,e);return t.forEachChild(V,(o,a)=>{const c=un(gt(r,new L(o)),a);i=i.updateImmediateChild(o,c)}),Xa(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=gt(n.visibleWrites,e);return Xa(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function ag(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=$(e,t);if(Er(n.visibleWrites,r))return null;{const o=gt(n.visibleWrites,r);return br(o)?s.getChild(t):un(o,s.getChild(t))}}function cg(n,e,t,i){const s=$(e,t),r=Vt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=gt(n.visibleWrites,s);return un(o,i.getNode().getImmediateChild(t))}else return null}function lg(n,e){return Vt(n.visibleWrites,e)}function ug(n,e,t,i,s,r,o){let a;const c=gt(n.visibleWrites,e),l=Vt(c,R());if(l!=null)a=l;else if(t!=null)a=un(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function dg(){return{visibleWrites:Pe.empty(),allWrites:[],lastWriteId:-1}}function Xi(n,e,t,i){return zl(n.writeTree,n.treePath,e,t,i)}function po(n,e){return og(n.writeTree,n.treePath,e)}function Za(n,e,t,i){return ag(n.writeTree,n.treePath,e,t,i)}function Zi(n,e){return lg(n.writeTree,$(n.treePath,e))}function hg(n,e,t,i,s,r){return ug(n.writeTree,n.treePath,e,t,i,s,r)}function go(n,e,t){return cg(n.writeTree,n.treePath,e,t)}function ql(n,e){return Yl($(n.treePath,e),n.writeTree)}function Yl(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Xn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Qn(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,cn(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Xn(i,e.snapshotNode,s.oldSnap));else throw mn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Kl=new pg;class mo{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new vt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return go(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Wt(this.viewCache_),r=hg(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(n){return{filter:n}}function mg(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function _g(n,e,t,i,s){const r=new fg;let o,a;if(t.type===Re.OVERWRITE){const l=t;l.source.fromUser?o=Ir(n,e,l.path,l.snap,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!T(l.path),o=es(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===Re.MERGE){const l=t;l.source.fromUser?o=vg(n,e,l.path,l.children,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Sr(n,e,l.path,l.children,i,s,a,r))}else if(t.type===Re.ACK_USER_WRITE){const l=t;l.revert?o=Eg(n,e,l.path,i,s,r):o=wg(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===Re.LISTEN_COMPLETE)o=Cg(n,e,t.path,i,r);else throw mn("Unknown operation type: "+t.type);const c=r.getChanges();return yg(e,o,c),{viewCache:o,changes:c}}function yg(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Qi(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Hl(Qi(e)))}}function Jl(n,e,t,i,s,r){const o=e.eventCache;if(Zi(i,t)!=null)return e;{let a,c;if(T(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Wt(e),u=l instanceof w?l:w.EMPTY_NODE,d=po(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Xi(i,Wt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=I(t);if(l===".priority"){p(yt(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Za(i,t,u,c);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=M(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Za(i,t,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=go(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return Wn(e,a,o.isFullyInitialized()||T(t),n.filter.filtersNodes())}}function es(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(T(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(t);if(!c.isCompleteForPath(t)&&yt(t)>1)return e;const g=M(t),y=c.getNode().getImmediateChild(f).updateChild(g,i);f===".priority"?l=u.updatePriority(c.getNode(),y):l=u.updateChild(c.getNode(),f,y,g,Kl,null)}const d=Vl(e,l,c.isFullyInitialized()||T(t),u.filtersNodes()),h=new mo(s,d,r);return Jl(n,d,t,s,h,a)}function Ir(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new mo(s,e,r);if(T(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Wn(e,l,!0,n.filter.filtersNodes());else{const d=I(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=Wn(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=M(t),f=a.getNode().getImmediateChild(d);let g;if(T(h))g=i;else{const v=u.getCompleteChild(d);v!=null?so(h)===".priority"&&v.getChild(Dl(h)).isEmpty()?g=v:g=v.updateChild(h,i):g=w.EMPTY_NODE}if(f.equals(g))c=e;else{const v=n.filter.updateChild(a.getNode(),d,g,h,u,o);c=Wn(e,v,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function ec(n,e){return n.eventCache.isCompleteForChild(e)}function vg(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=$(t,c);ec(e,I(u))&&(a=Ir(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=$(t,c);ec(e,I(u))||(a=Ir(n,a,u,l,s,r,o))}),a}function tc(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Sr(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;T(t)?l=i:l=new O(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),g=tc(n,f,h);c=es(n,c,new L(d),g,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const g=e.serverCache.getNode().getImmediateChild(d),v=tc(n,g,h);c=es(n,c,new L(d),v,s,r,o,a)}}),c}function wg(n,e,t,i,s,r,o){if(Zi(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(T(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return es(n,e,t,c.getNode().getChild(t),s,r,a,o);if(T(t)){let l=new O(null);return c.getNode().forEachChild(Jt,(u,d)=>{l=l.set(new L(u),d)}),Sr(n,e,t,l,s,r,a,o)}else return e}else{let l=new O(null);return i.foreach((u,d)=>{const h=$(t,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Sr(n,e,t,l,s,r,a,o)}}function Cg(n,e,t,i,s){const r=e.serverCache,o=Vl(e,r.getNode(),r.isFullyInitialized()||T(t),r.isFiltered());return Jl(n,o,t,i,Kl,s)}function Eg(n,e,t,i,s,r){let o;if(Zi(i,t)!=null)return e;{const a=new mo(i,e,s),c=e.eventCache.getNode();let l;if(T(t)||I(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Xi(i,Wt(e));else{const d=e.serverCache.getNode();p(d instanceof w,"serverChildren would be complete if leaf node"),u=po(i,d)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=I(t);let d=go(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=n.filter.updateChild(c,u,d,M(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,w.EMPTY_NODE,M(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Xi(i,Wt(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Zi(i,R())!=null,Wn(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bg{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new co(i.getIndex()),r=Hp(i);this.processor_=gg(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(w.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(w.EMPTY_NODE,a.getNode(),null),u=new vt(c,o.isFullyInitialized(),s.filtersNodes()),d=new vt(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=ws(d,u),this.eventGenerator_=new Yp(this.query_)}get query(){return this.query_}}function Ig(n){return n.viewCache_.serverCache.getNode()}function Sg(n){return Qi(n.viewCache_)}function Tg(n,e){const t=Wt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!T(e)&&!t.getImmediateChild(I(e)).isEmpty())?t.getChild(e):null}function nc(n){return n.eventRegistrations_.length===0}function Rg(n,e){n.eventRegistrations_.push(e)}function ic(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function sc(n,e,t,i){e.type===Re.MERGE&&e.source.queryId!==null&&(p(Wt(n.viewCache_),"We should always have a full cache before handling merges"),p(Qi(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=_g(n.processor_,s,e,t,i);return mg(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Ql(n,r.changes,r.viewCache.eventCache.getNode(),null)}function kg(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(V,(r,o)=>{i.push(cn(r,o))}),t.isFullyInitialized()&&i.push(Hl(t.getNode())),Ql(n,i,t.getNode(),e)}function Ql(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Kp(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ts;class Xl{constructor(){this.views=new Map}}function Ag(n){p(!ts,"__referenceConstructor has already been defined"),ts=n}function Pg(){return p(ts,"Reference.ts has not been loaded"),ts}function Ng(n){return n.views.size===0}function _o(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),sc(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(sc(o,e,t,i));return r}}function Zl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Xi(t,s?i:null),c=!1;a?c=!0:i instanceof w?(a=po(t,i),c=!1):(a=w.EMPTY_NODE,c=!1);const l=ws(new vt(a,c,!1),new vt(i,s,!1));return new bg(e,l)}return o}function Lg(n,e,t,i,s,r){const o=Zl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Rg(o,t),kg(o,t)}function Og(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=wt(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(ic(l,t,i)),nc(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(ic(c,t,i)),nc(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!wt(n)&&r.push(new(Pg())(e._repo,e._path)),{removed:r,events:o}}function eu(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function mt(n,e){let t=null;for(const i of n.views.values())t=t||Tg(i,e);return t}function tu(n,e){if(e._queryParams.loadsAllData())return Es(n);{const i=e._queryIdentifier;return n.views.get(i)}}function nu(n,e){return tu(n,e)!=null}function wt(n){return Es(n)!=null}function Es(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ns;function Dg(n){p(!ns,"__referenceConstructor has already been defined"),ns=n}function Mg(){return p(ns,"Reference.ts has not been loaded"),ns}let xg=1;class rc{constructor(e){this.listenProvider_=e,this.syncPointTree_=new O(null),this.pendingWriteTree_=dg(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function iu(n,e,t,i,s){return Zp(n.pendingWriteTree_,e,t,i,s),s?Cn(n,new Bt(uo(),e,t)):[]}function Fg(n,e,t,i){eg(n.pendingWriteTree_,e,t,i);const s=O.fromObject(t);return Cn(n,new ln(uo(),e,s))}function at(n,e,t=!1){const i=tg(n.pendingWriteTree_,e);if(ng(n.pendingWriteTree_,e)){let r=new O(null);return i.snap!=null?r=r.set(R(),!0):ne(i.children,o=>{r=r.set(new L(o),!0)}),Cn(n,new Ji(i.path,r,t))}else return[]}function pi(n,e,t){return Cn(n,new Bt(ho(),e,t))}function Ug(n,e,t){const i=O.fromObject(t);return Cn(n,new ln(ho(),e,i))}function Bg(n,e){return Cn(n,new ei(ho(),e))}function Wg(n,e,t){const i=vo(n,t);if(i){const s=wo(i),r=s.path,o=s.queryId,a=le(r,e),c=new ei(fo(o),a);return Co(n,r,c)}else return[]}function is(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||nu(o,e))){const c=Og(o,e,t,i);Ng(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,f)=>wt(f));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=Vg(h);for(let g=0;g<f.length;++g){const v=f[g],y=v.query,k=au(n,v);n.listenProvider_.startListening($n(y),ti(n,y),k.hashFn,k.onComplete)}}}!d&&l.length>0&&!i&&(u?n.listenProvider_.stopListening($n(e),null):l.forEach(h=>{const f=n.queryToTagMap.get(bs(h));n.listenProvider_.stopListening($n(h),f)}))}jg(n,l)}return a}function su(n,e,t,i){const s=vo(n,i);if(s!=null){const r=wo(s),o=r.path,a=r.queryId,c=le(o,e),l=new Bt(fo(a),c,t);return Co(n,o,l)}else return[]}function Hg(n,e,t,i){const s=vo(n,i);if(s){const r=wo(s),o=r.path,a=r.queryId,c=le(o,e),l=O.fromObject(t),u=new ln(fo(a),c,l);return Co(n,o,u)}else return[]}function Tr(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,f)=>{const g=le(h,s);r=r||mt(f,g),o=o||wt(f)});let a=n.syncPointTree_.get(s);a?(o=o||wt(a),r=r||mt(a,R())):(a=new Xl,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=w.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,g)=>{const v=mt(g,R());v&&(r=r.updateImmediateChild(f,v))}));const l=nu(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=bs(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=Gg();n.queryToTagMap.set(h,f),n.tagToQueryMap.set(f,h)}const u=Cs(n.pendingWriteTree_,s);let d=Lg(a,e,t,u,r,c);if(!l&&!o&&!i){const h=tu(a,e);d=d.concat(zg(n,e,h))}return d}function yo(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=le(o,e),l=mt(a,c);if(l)return l});return zl(s,e,r,t,!0)}function $g(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const d=le(l,t);i=i||mt(u,d)});let s=n.syncPointTree_.get(t);s?i=i||mt(s,R()):(s=new Xl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new vt(i,!0,!1):null,a=Cs(n.pendingWriteTree_,e._path),c=Zl(s,e,a,r?o.getNode():w.EMPTY_NODE,r);return Sg(c)}function Cn(n,e){return ru(e,n.syncPointTree_,null,Cs(n.pendingWriteTree_,R()))}function ru(n,e,t,i){if(T(n.path))return ou(n,e,t,i);{const s=e.get(R());t==null&&s!=null&&(t=mt(s,R()));let r=[];const o=I(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=ql(i,o);r=r.concat(ru(a,c,l,u))}return s&&(r=r.concat(_o(s,n,i,t))),r}}function ou(n,e,t,i){const s=e.get(R());t==null&&s!=null&&(t=mt(s,R()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=ql(i,o),u=n.operationForChild(o);u&&(r=r.concat(ou(u,a,c,l)))}),s&&(r=r.concat(_o(s,n,i,t))),r}function au(n,e){const t=e.query,i=ti(n,t);return{hashFn:()=>(Ig(e)||w.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Wg(n,t._path,i):Bg(n,t._path);{const r=Bf(s,t);return is(n,t,null,r)}}}}function ti(n,e){const t=bs(e);return n.queryToTagMap.get(t)}function bs(n){return n._path.toString()+"$"+n._queryIdentifier}function vo(n,e){return n.tagToQueryMap.get(e)}function wo(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new L(n.substr(0,e))}}function Co(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=Cs(n.pendingWriteTree_,e);return _o(i,t,s,null)}function Vg(n){return n.fold((e,t,i)=>{if(t&&wt(t))return[Es(t)];{let s=[];return t&&(s=eu(t)),ne(i,(r,o)=>{s=s.concat(o)}),s}})}function $n(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Mg())(n._repo,n._path):n}function jg(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=bs(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Gg(){return xg++}function zg(n,e,t){const i=e._path,s=ti(n,e),r=au(n,t),o=n.listenProvider_.startListening($n(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!wt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!T(l)&&u&&wt(u))return[Es(u).query];{let h=[];return u&&(h=h.concat(eu(u).map(f=>f.query))),ne(d,(f,g)=>{h=h.concat(g)}),h}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening($n(u),ti(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Eo(t)}node(){return this.node_}}class bo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=$(this.path_,e);return new bo(this.syncTree_,t)}node(){return yo(this.syncTree_,this.path_)}}const qg=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},oc=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Yg(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Kg(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Yg=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},Kg=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},cu=function(n,e,t,i){return Io(e,new bo(t,n),i)},lu=function(n,e,t){return Io(n,new Eo(e),t)};function Io(n,e,t){const i=n.getPriority().val(),s=oc(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=oc(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new q(a,G(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new q(s))),o.forEachChild(V,(a,c)=>{const l=Io(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function To(n,e){let t=e instanceof L?e:new L(e),i=n,s=I(t);for(;s!==null;){const r=rn(i.node.children,s)||{children:{},childCount:0};i=new So(s,i,r),t=M(t),s=I(t)}return i}function En(n){return n.node.value}function uu(n,e){n.node.value=e,Rr(n)}function du(n){return n.node.childCount>0}function Jg(n){return En(n)===void 0&&!du(n)}function Is(n,e){ne(n.node.children,(t,i)=>{e(new So(t,n,i))})}function hu(n,e,t,i){t&&e(n),Is(n,s=>{hu(s,e,!0)})}function Qg(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function gi(n){return new L(n.parent===null?n.name:gi(n.parent)+"/"+n.name)}function Rr(n){n.parent!==null&&Xg(n.parent,n.name,n)}function Xg(n,e,t){const i=Jg(t),s=Ve(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Rr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Rr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zg=/[\[\].#$\/\u0000-\u001F\u007F]/,em=/[\[\].#$\u0000-\u001F\u007F]/,Qs=10*1024*1024,Ro=function(n){return typeof n=="string"&&n.length!==0&&!Zg.test(n)},fu=function(n){return typeof n=="string"&&n.length!==0&&!em.test(n)},tm=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),fu(n)},nm=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!Zr(n)||n&&typeof n=="object"&&Ve(n,".sv")},pu=function(n,e,t,i){i&&e===void 0||Ss(_s(n,"value"),e,t)},Ss=function(n,e,t){const i=t instanceof L?new vp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Rt(i));if(typeof e=="function")throw new Error(n+"contains a function "+Rt(i)+" with contents = "+e.toString());if(Zr(e))throw new Error(n+"contains "+e.toString()+" "+Rt(i));if(typeof e=="string"&&e.length>Qs/3&&ys(e)>Qs)throw new Error(n+"contains a string greater than "+Qs+" utf8 bytes "+Rt(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ne(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ro(o)))throw new Error(n+" contains an invalid key ("+o+") "+Rt(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);wp(i,o),Ss(n,a,i),Cp(i)}),s&&r)throw new Error(n+' contains ".value" child '+Rt(i)+" in addition to actual children.")}},im=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Jn(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ro(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(yp);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Ce(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},sm=function(n,e,t,i){const s=_s(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ne(e,(o,a)=>{const c=new L(o);if(Ss(s,a,$(t,c)),so(c)===".priority"&&!nm(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),im(s,r)},gu=function(n,e,t,i){if(!fu(t))throw new Error(_s(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},rm=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),gu(n,e,t)},ko=function(n,e){if(I(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},om=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ro(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!tm(t))throw new Error(_s(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ts(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!ro(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function mu(n,e,t){Ts(n,t),_u(n,i=>ro(i,e))}function be(n,e,t){Ts(n,t),_u(n,i=>Ce(i,e)||Ce(e,i))}function _u(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(cm(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function cm(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Un&&Z("event: "+t.toString()),wn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lm="repo_interrupt",um=25;class dm{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new am,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ki(),this.transactionQueueTree_=new So,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function hm(n,e,t){if(n.stats_=no(n.repoInfo_),n.forceRestClient_||Vf())n.server_=new Yi(n.repoInfo_,(i,s,r,o)=>{ac(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>cc(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{z(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Je(n.repoInfo_,e,(i,s,r,o)=>{ac(n,i,s,r,o)},i=>{cc(n,i)},i=>{fm(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Yf(n.repoInfo_,()=>new qp(n.stats_,n.server_)),n.infoData_=new $p,n.infoSyncTree_=new rc({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=pi(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Ao(n,"connected",!1),n.serverSyncTree_=new rc({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);be(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function yu(n){const t=n.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Rs(n){return qg({timestamp:yu(n)})}function ac(n,e,t,i,s){n.dataUpdateCount++;const r=new L(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Vi(t,l=>G(l));o=Hg(n.serverSyncTree_,r,c,s)}else{const c=G(t);o=su(n.serverSyncTree_,r,c,s)}else if(i){const c=Vi(t,l=>G(l));o=Ug(n.serverSyncTree_,r,c)}else{const c=G(t);o=pi(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=dn(n,r)),be(n.eventQueue_,a,o)}function cc(n,e){Ao(n,"connected",e),e===!1&&_m(n)}function fm(n,e){ne(e,(t,i)=>{Ao(n,t,i)})}function Ao(n,e,t){const i=new L("/.info/"+e),s=G(t);n.infoData_.updateSnapshot(i,s);const r=pi(n.infoSyncTree_,i,s);be(n.eventQueue_,i,r)}function Po(n){return n.nextWriteId_++}function pm(n,e,t){const i=$g(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=G(s).withIndex(e._queryParams.getIndex());Tr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=pi(n.serverSyncTree_,e._path,r);else{const a=ti(n.serverSyncTree_,e);o=su(n.serverSyncTree_,e._path,r,a)}return be(n.eventQueue_,e._path,o),is(n.serverSyncTree_,e,t,null,!0),r},s=>(mi(n,"get for query "+z(e)+" failed: "+s),Promise.reject(new Error(s))))}function gm(n,e,t,i,s){mi(n,"set",{path:e.toString(),value:t,priority:i});const r=Rs(n),o=G(t,i),a=yo(n.serverSyncTree_,e),c=lu(o,a,r),l=Po(n),u=iu(n.serverSyncTree_,e,c,l,!0);Ts(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,f)=>{const g=h==="ok";g||ue("set at "+e+" failed: "+h);const v=at(n.serverSyncTree_,l,!g);be(n.eventQueue_,e,v),kr(n,s,h,f)});const d=Lo(n,e);dn(n,d),be(n.eventQueue_,d,[])}function mm(n,e,t,i){mi(n,"update",{path:e.toString(),value:t});let s=!0;const r=Rs(n),o={};if(ne(t,(a,c)=>{s=!1,o[a]=cu($(e,a),G(c),n.serverSyncTree_,r)}),s)Z("update() called with empty data.  Don't do anything."),kr(n,i,"ok",void 0);else{const a=Po(n),c=Fg(n.serverSyncTree_,e,o,a);Ts(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,u)=>{const d=l==="ok";d||ue("update at "+e+" failed: "+l);const h=at(n.serverSyncTree_,a,!d),f=h.length>0?dn(n,e):e;be(n.eventQueue_,f,h),kr(n,i,l,u)}),ne(t,l=>{const u=Lo(n,$(e,l));dn(n,u)}),be(n.eventQueue_,e,[])}}function _m(n){mi(n,"onDisconnectEvents");const e=Rs(n),t=Ki();wr(n.onDisconnect_,R(),(s,r)=>{const o=cu(s,r,n.serverSyncTree_,e);$l(t,s,o)});let i=[];wr(t,R(),(s,r)=>{i=i.concat(pi(n.serverSyncTree_,s,r));const o=Lo(n,s);dn(n,o)}),n.onDisconnect_=Ki(),be(n.eventQueue_,R(),i)}function ym(n,e,t){let i;I(e._path)===".info"?i=Tr(n.infoSyncTree_,e,t):i=Tr(n.serverSyncTree_,e,t),mu(n.eventQueue_,e._path,i)}function vu(n,e,t){let i;I(e._path)===".info"?i=is(n.infoSyncTree_,e,t):i=is(n.serverSyncTree_,e,t),mu(n.eventQueue_,e._path,i)}function vm(n){n.persistentConnection_&&n.persistentConnection_.interrupt(lm)}function mi(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Z(t,...e)}function kr(n,e,t,i){e&&wn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function wu(n,e,t){return yo(n.serverSyncTree_,e,t)||w.EMPTY_NODE}function No(n,e=n.transactionQueueTree_){if(e||ks(n,e),En(e)){const t=Eu(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&wm(n,gi(e),t)}else du(e)&&Is(e,t=>{No(n,t)})}function wm(n,e,t){const i=t.map(l=>l.currentWriteId),s=wu(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=le(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{mi(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(at(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();ks(n,To(n.transactionQueueTree_,e)),No(n,n.transactionQueueTree_),be(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)wn(d[h])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{ue("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}dn(n,e)}},o)}function dn(n,e){const t=Cu(n,e),i=gi(t),s=Eu(n,t);return Cm(n,s,i),i}function Cm(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=le(t,c.path);let u=!1,d;if(p(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(at(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=um)u=!0,d="maxretry",s=s.concat(at(n.serverSyncTree_,c.currentWriteId,!0));else{const h=wu(n,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Ss("transaction failed: Data returned ",f,c.path);let g=G(f);typeof f=="object"&&f!=null&&Ve(f,".priority")||(g=g.updatePriority(h.getPriority()));const y=c.currentWriteId,k=Rs(n),P=lu(g,h,k);c.currentOutputSnapshotRaw=g,c.currentOutputSnapshotResolved=P,c.currentWriteId=Po(n),o.splice(o.indexOf(y),1),s=s.concat(iu(n.serverSyncTree_,c.path,P,c.currentWriteId,c.applyLocally)),s=s.concat(at(n.serverSyncTree_,y,!0))}else u=!0,d="nodata",s=s.concat(at(n.serverSyncTree_,c.currentWriteId,!0))}be(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ks(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)wn(i[a]);No(n,n.transactionQueueTree_)}function Cu(n,e){let t,i=n.transactionQueueTree_;for(t=I(e);t!==null&&En(i)===void 0;)i=To(i,t),e=M(e),t=I(e);return i}function Eu(n,e){const t=[];return bu(n,e,t),t.sort((i,s)=>i.order-s.order),t}function bu(n,e,t){const i=En(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Is(e,s=>{bu(n,s,t)})}function ks(n,e){const t=En(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,uu(e,t.length>0?t:void 0)}Is(e,i=>{ks(n,i)})}function Lo(n,e){const t=gi(Cu(n,e)),i=To(n.transactionQueueTree_,e);return Qg(i,s=>{Xs(n,s)}),Xs(n,i),hu(i,s=>{Xs(n,s)}),t}function Xs(n,e){const t=En(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(at(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?uu(e,void 0):t.length=r+1,be(n.eventQueue_,gi(e),s);for(let o=0;o<i.length;o++)wn(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Em(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function bm(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):ue(`Invalid query segment '${t}' in query '${n}'`)}return e}const lc=function(n,e){const t=Im(n),i=t.namespace;t.domain==="firebase.com"&&Xe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Xe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Df();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Sl(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new L(t.pathString)}},Im=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=Em(n.substring(u,d)));const h=bm(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const g=e.indexOf(".");i=e.substring(0,g).toLowerCase(),t=e.substring(g+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Sm=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=uc.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=uc.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+z(this.snapshot.exportVal())}}class Su{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Do{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return T(this._path)?null:so(this._path)}get ref(){return new je(this._repo,this._path)}get _queryIdentifier(){const e=Ka(this._queryParams),t=eo(e);return t==="{}"?"default":t}get _queryObject(){return Ka(this._queryParams)}isEqual(e){if(e=he(e),!(e instanceof Do))return!1;const t=this._repo===e._repo,i=ro(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+_p(this._path)}}class je extends Do{constructor(e,t){super(e,t,new lo,!1)}get parent(){const e=Dl(this._path);return e===null?null:new je(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class hn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new L(e),i=fn(this.ref,e);return new hn(this._node.getChild(t),i,V)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new hn(s,fn(this.ref,i),V)))}hasChild(e){const t=new L(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ee(n,e){return n=he(n),n._checkNotDeleted("ref"),e!==void 0?fn(n._root,e):n._root}function fn(n,e){return n=he(n),I(n._path)===null?rm("child","path",e):gu("child","path",e),new je(n._repo,$(n._path,e))}function dc(n,e){n=he(n),ko("push",n._path),pu("push",e,n._path,!0);const t=yu(n._repo),i=Sm(t),s=fn(n,i),r=fn(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function pn(n){return ko("remove",n._path),Ze(n,null)}function Ze(n,e){n=he(n),ko("set",n._path),pu("set",e,n._path,!1);const t=new li;return gm(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ni(n,e){sm("update",e,n._path);const t=new li;return mm(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Ot(n){n=he(n);const e=new Oo(()=>{}),t=new _i(e);return pm(n._repo,n,t).then(i=>new hn(i,new je(n._repo,n._path),n._queryParams.getIndex()))}class _i{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Iu("value",this,new hn(e.snapshotNode,new je(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Su(this,e,t):null}matches(e){return e instanceof _i?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class As{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Su(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=fn(new je(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new Iu(e.type,this,new hn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof As?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Mo(n,e,t,i,s){const r=new Oo(t,void 0),o=e==="value"?new _i(r):new As(e,r);return ym(n._repo,n,o),()=>vu(n._repo,n,o)}function Tm(n,e,t,i){return Mo(n,"value",e)}function Rm(n,e,t,i){return Mo(n,"child_added",e)}function km(n,e,t,i){return Mo(n,"child_removed",e)}function Ps(n,e,t){let i=null;const s=t?new Oo(t):null;e==="value"?i=new _i(s):e&&(i=new As(e,s)),vu(n._repo,n,i)}Ag(je);Dg(je);/**
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
 */const Am="FIREBASE_DATABASE_EMULATOR_HOST",Ar={};let Pm=!1;function Nm(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=_n(r);n.repoInfo_=new Sl(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function Lm(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Xe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Z("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=lc(r,s),a=o.repoInfo,c;typeof process<"u"&&Na&&(c=Na[Am]),c?(r=`http://${c}?ns=${a.namespace}`,o=lc(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new Gf(n.name,n.options,e);om("Invalid Firebase Database URL",o),T(o.path)||Xe("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Dm(a,n,l,new jf(n,t));return new Mm(u,n)}function Om(n,e){const t=Ar[e];(!t||t[n.key]!==n)&&Xe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),vm(n),delete t[n.key]}function Dm(n,e,t,i){let s=Ar[e.name];s||(s={},Ar[e.name]=s);let r=s[n.toURLString()];return r&&Xe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new dm(n,Pm,t,i),s[n.toURLString()]=r,r}class Mm{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(hm(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new je(this._repo,R())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Om(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Xe("Cannot call "+e+" on a deleted database.")}}function xm(n=cl(),e){const t=Xr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Zd("database");i&&Fm(t,...i)}return t}function Fm(n,e,t,i={}){n=he(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&xt(i,r.repoInfo_.emulatorOptions))return;Xe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Xe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Pi(Pi.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:eh(i.mockUserToken,n.app.options.projectId);o=new Pi(a)}_n(e)&&(tl(e),nl("Database",!0)),Nm(r,s,i,o)}/**
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
 */function Um(n){kf(vn),on(new Ft("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Lm(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),pt(La,Oa,n),pt(La,Oa,"esm2020")}Je.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Je.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Um();var Bm="firebase",Wm="12.4.0";/**
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
 */pt(Bm,Wm,"app");const Hm="vidu-aae11.firebaseapp.com",$m={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:Hm,projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Tu=al($m),te=xm(Tu),ke=[];function At(n,e,t,i=null,s=null,r=null){e==="value"?Tm(n,t):e==="child_added"?Rm(n,t):e==="child_removed"?km(n,t):console.warn(`Unknown listener type: ${e}`),ke.push({ref:n,type:e,callback:t,roomId:i,userId:s,category:r})}function Vm(){ke.forEach(({ref:n,type:e,callback:t})=>{try{Ps(n,e,t)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),ke.length=0}function Ns(n){if(!n)return;ke.filter(i=>i.roomId===n).forEach(({ref:i,type:s,callback:r})=>{try{Ps(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${n}`,o)}});const t=ke.filter(i=>i.roomId!==n);ke.length=0,ke.push(...t)}function jm(n,e){if(!n||!e)return;const t=r=>r.userId===n&&r.roomId===e;ke.filter(t).forEach(({ref:r,type:o,callback:a})=>{try{Ps(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${n} in room ${e}`,c)}});const s=ke.filter(r=>!t(r));ke.length=0,ke.push(...s)}function Li(n,e,t=null){At(n,"value",e,t)}const bt=n=>ee(te,`rooms/${n}`),Si=n=>ee(te,`rooms/${n}/members`),hc=(n,e)=>ee(te,`rooms/${n}/members/${e}`),Gm=n=>ee(te,`rooms/${n}/cancellation`),Ls=n=>ee(te,`rooms/${n}/watch`),zm=n=>ee(te,`users/${n}/recentCalls`),xo=(n,e)=>ee(te,`users/${n}/recentCalls/${e}`),Fo=n=>ee(te,`users/${n}/outgoingCall`),Ru=n=>ee(te,`rooms/${n}/offerCandidates`),ku=n=>ee(te,`rooms/${n}/answerCandidates`);function Au(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const qm=Au,Pu=new ui("auth","Firebase",Au());/**
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
 */const ss=new Jr("@firebase/auth");function Ym(n,...e){ss.logLevel<=N.WARN&&ss.warn(`Auth (${vn}): ${n}`,...e)}function Oi(n,...e){ss.logLevel<=N.ERROR&&ss.error(`Auth (${vn}): ${n}`,...e)}/**
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
 */function He(n,...e){throw Bo(n,...e)}function Ne(n,...e){return Bo(n,...e)}function Uo(n,e,t){const i={...qm(),[e]:t};return new ui("auth","Firebase",i).create(e,{appName:n.name})}function Dt(n){return Uo(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Km(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&He(n,"argument-error"),Uo(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Bo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Pu.create(n,...e)}function C(n,e,...t){if(!n)throw Bo(e,...t)}function Ye(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Oi(e),new Error(e)}function et(n,e){n||Ye(e)}/**
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
 */function Pr(){return typeof self<"u"&&self.location?.href||""}function Jm(){return fc()==="http:"||fc()==="https:"}function fc(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function Qm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Jm()||sh()||"connection"in navigator)?navigator.onLine:!0}function Xm(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class yi{constructor(e,t){this.shortDelay=e,this.longDelay=t,et(t>e,"Short delay should be less than long delay!"),this.isMobile=Kr()||il()}get(){return Qm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Wo(n,e){et(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Nu{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Zm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const e_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],t_=new yi(3e4,6e4);function Ho(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function bn(n,e,t,i,s={}){return Lu(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=yn({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return ih()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&_n(n.emulatorConfig.host)&&(l.credentials="include"),Nu.fetch()(await Ou(n,n.config.apiHost,t,a),l)})}async function Lu(n,e,t){n._canInitEmulator=!1;const i={...Zm,...e};try{const s=new i_(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Ti(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ti(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ti(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ti(n,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Uo(n,u,l);He(n,u)}}catch(s){if(s instanceof Ct)throw s;He(n,"network-request-failed",{message:String(s)})}}async function n_(n,e,t,i,s={}){const r=await bn(n,e,t,i,s);return"mfaPendingCredential"in r&&He(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Ou(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Wo(n.config,s):`${n.config.apiScheme}://${s}`;return e_.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class i_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ne(this.auth,"network-request-failed")),t_.get())})}}function Ti(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Ne(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function s_(n,e){return bn(n,"POST","/v1/accounts:delete",e)}async function rs(n,e){return bn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Vn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function r_(n,e=!1){const t=he(n),i=await t.getIdToken(e),s=$o(i);C(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Vn(Zs(s.auth_time)),issuedAtTime:Vn(Zs(s.iat)),expirationTime:Vn(Zs(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Zs(n){return Number(n)*1e3}function $o(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Oi("JWT malformed, contained fewer than 3 sections"),null;try{const s=$i(t);return s?JSON.parse(s):(Oi("Failed to decode base64 JWT payload"),null)}catch(s){return Oi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function pc(n){const e=$o(n);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ni(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Ct&&o_(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function o_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class a_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Nr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vn(this.lastLoginAt),this.creationTime=Vn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function os(n){const e=n.auth,t=await n.getIdToken(),i=await ni(n,rs(e,{idToken:t}));C(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?Du(s.providerUserInfo):[],o=l_(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Nr(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function c_(n){const e=he(n);await os(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function l_(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Du(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function u_(n,e){const t=await Lu(n,{},async()=>{const i=yn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Ou(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&_n(n.emulatorConfig.host)&&(c.credentials="include"),Nu.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function d_(n,e){return bn(n,"POST","/v2/accounts:revokeToken",Ho(n,e))}/**
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
 */class Qt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):pc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){C(e.length!==0,"internal-error");const t=pc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await u_(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Qt;return i&&(C(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(C(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(C(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Qt,this.toJSON())}_performRefresh(){return Ye("not implemented")}}/**
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
 */function nt(n,e){C(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ae{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new a_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Nr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await ni(this,this.stsTokenManager.getToken(this.auth,e));return C(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return r_(this,e)}reload(){return c_(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ae({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await os(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ie(this.auth.app))return Promise.reject(Dt(this.auth));const e=await this.getIdToken();return await ni(this,s_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:g,stsTokenManager:v}=t;C(d&&v,e,"internal-error");const y=Qt.fromJSON(this.name,v);C(typeof d=="string",e,"internal-error"),nt(i,e.name),nt(s,e.name),C(typeof h=="boolean",e,"internal-error"),C(typeof f=="boolean",e,"internal-error"),nt(r,e.name),nt(o,e.name),nt(a,e.name),nt(c,e.name),nt(l,e.name),nt(u,e.name);const k=new Ae({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:y,createdAt:l,lastLoginAt:u});return g&&Array.isArray(g)&&(k.providerData=g.map(P=>({...P}))),c&&(k._redirectEventId=c),k}static async _fromIdTokenResponse(e,t,i=!1){const s=new Qt;s.updateFromServerResponse(t);const r=new Ae({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await os(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];C(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Du(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new Qt;a.updateFromIdToken(i);const c=new Ae({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Nr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
 */const gc=new Map;function Ke(n){et(n instanceof Function,"Expected a class definition");let e=gc.get(n);return e?(et(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,gc.set(n,e),e)}/**
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
 */class Mu{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Mu.type="NONE";const Lr=Mu;/**
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
 */function Di(n,e,t){return`firebase:${n}:${e}:${t}`}class Xt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Di(this.userKey,s.apiKey,r),this.fullPersistenceKey=Di("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await rs(this.auth,{idToken:e}).catch(()=>{});return t?Ae._fromGetAccountInfoResponse(this.auth,t,e):null}return Ae._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Xt(Ke(Lr),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||Ke(Lr);const o=Di(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await rs(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Ae._fromGetAccountInfoResponse(e,h,u)}else d=Ae._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Xt(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Xt(r,e,i))}}/**
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
 */function mc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Bu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(xu(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Hu(e))return"Blackberry";if($u(e))return"Webos";if(Fu(e))return"Safari";if((e.includes("chrome/")||Uu(e))&&!e.includes("edge/"))return"Chrome";if(Wu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function xu(n=de()){return/firefox\//i.test(n)}function Fu(n=de()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Uu(n=de()){return/crios\//i.test(n)}function Bu(n=de()){return/iemobile/i.test(n)}function Wu(n=de()){return/android/i.test(n)}function Hu(n=de()){return/blackberry/i.test(n)}function $u(n=de()){return/webos/i.test(n)}function Vo(n=de()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function h_(n=de()){return Vo(n)&&!!window.navigator?.standalone}function f_(){return rh()&&document.documentMode===10}function Vu(n=de()){return Vo(n)||Wu(n)||$u(n)||Hu(n)||/windows phone/i.test(n)||Bu(n)}/**
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
 */function ju(n,e=[]){let t;switch(n){case"Browser":t=mc(de());break;case"Worker":t=`${mc(de())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${vn}/${i}`}/**
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
 */class p_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function g_(n,e={}){return bn(n,"GET","/v2/passwordPolicy",Ho(n,e))}/**
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
 */const m_=6;class __{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??m_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class y_{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new _c(this),this.idTokenSubscription=new _c(this),this.beforeStateQueue=new p_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Pu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ke(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Xt.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await rs(this,{idToken:e}),i=await Ae._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ie(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await os(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Xm()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ie(this.app))return Promise.reject(Dt(this));const t=e?he(e):null;return t&&C(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ie(this.app)?Promise.reject(Dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ie(this.app)?Promise.reject(Dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ke(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await g_(this),t=new __(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ui("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await d_(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ke(e)||this._popupRedirectResolver;C(t,this,"argument-error"),this.redirectPersistenceManager=await Xt.create(this,[Ke(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ju(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(Ie(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Ym(`Error while retrieving App Check token: ${e.error}`),e?.token}}function vi(n){return he(n)}class _c{constructor(e){this.auth=e,this.observer=null,this.addObserver=gh(t=>this.observer=t)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let jo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function v_(n){jo=n}function w_(n){return jo.loadJS(n)}function C_(){return jo.gapiScript}function E_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function b_(n,e){const t=Xr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(xt(r,e??{}))return s;He(s,"already-initialized")}return t.initialize({options:e})}function I_(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Ke);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function S_(n,e,t){const i=vi(n);C(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Gu(e),{host:o,port:a}=T_(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){C(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),C(xt(l,i.config.emulator)&&xt(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,_n(o)?(tl(`${r}//${o}${c}`),nl("Auth",!0)):R_()}function Gu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function T_(n){const e=Gu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:yc(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:yc(o)}}}function yc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function R_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class zu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,t){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}}/**
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
 */async function Zt(n,e){return n_(n,"POST","/v1/accounts:signInWithIdp",Ho(n,e))}/**
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
 */const k_="http://localhost";class Ht extends zu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):He("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new Ht(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Zt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Zt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Zt(e,t)}buildRequest(){const e={requestUri:k_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=yn(t)}return e}}/**
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
 */class Go{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class wi extends Go{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class it extends wi{constructor(){super("facebook.com")}static credential(e){return Ht._fromParams({providerId:it.PROVIDER_ID,signInMethod:it.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return it.credentialFromTaggedObject(e)}static credentialFromError(e){return it.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return it.credential(e.oauthAccessToken)}catch{return null}}}it.FACEBOOK_SIGN_IN_METHOD="facebook.com";it.PROVIDER_ID="facebook.com";/**
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
 */class ge extends wi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ht._fromParams({providerId:ge.PROVIDER_ID,signInMethod:ge.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ge.credentialFromTaggedObject(e)}static credentialFromError(e){return ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return ge.credential(t,i)}catch{return null}}}ge.GOOGLE_SIGN_IN_METHOD="google.com";ge.PROVIDER_ID="google.com";/**
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
 */class st extends wi{constructor(){super("github.com")}static credential(e){return Ht._fromParams({providerId:st.PROVIDER_ID,signInMethod:st.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return st.credentialFromTaggedObject(e)}static credentialFromError(e){return st.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return st.credential(e.oauthAccessToken)}catch{return null}}}st.GITHUB_SIGN_IN_METHOD="github.com";st.PROVIDER_ID="github.com";/**
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
 */class rt extends wi{constructor(){super("twitter.com")}static credential(e,t){return Ht._fromParams({providerId:rt.PROVIDER_ID,signInMethod:rt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return rt.credentialFromTaggedObject(e)}static credentialFromError(e){return rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return rt.credential(t,i)}catch{return null}}}rt.TWITTER_SIGN_IN_METHOD="twitter.com";rt.PROVIDER_ID="twitter.com";/**
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
 */class gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Ae._fromIdTokenResponse(e,i,s),o=vc(i);return new gn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=vc(i);return new gn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function vc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class as extends Ct{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,as.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new as(e,t,i,s)}}function qu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?as._fromErrorAndOperation(n,r,e,i):r})}async function A_(n,e,t=!1){const i=await ni(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return gn._forOperation(n,"link",i)}/**
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
 */async function P_(n,e,t=!1){const{auth:i}=n;if(Ie(i.app))return Promise.reject(Dt(i));const s="reauthenticate";try{const r=await ni(n,qu(i,s,e,n),t);C(r.idToken,i,"internal-error");const o=$o(r.idToken);C(o,i,"internal-error");const{sub:a}=o;return C(n.uid===a,i,"user-mismatch"),gn._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&He(i,"user-mismatch"),r}}/**
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
 */async function N_(n,e,t=!1){if(Ie(n.app))return Promise.reject(Dt(n));const i="signIn",s=await qu(n,i,e),r=await gn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}/**
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
 */function er(n,e){return he(n).setPersistence(e)}function L_(n,e,t,i){return he(n).onIdTokenChanged(e,t,i)}function O_(n,e,t){return he(n).beforeAuthStateChanged(e,t)}function Yu(n,e,t,i){return he(n).onAuthStateChanged(e,t,i)}const cs="__sak";/**
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
 */class Ku{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(cs,"1"),this.storage.removeItem(cs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const D_=1e3,M_=10;class Ju extends Ku{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);f_()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,M_):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},D_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ju.type="LOCAL";const Qu=Ju;/**
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
 */class Xu extends Ku{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Xu.type="SESSION";const Zu=Xu;/**
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
 */function x_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Os{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Os(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await x_(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Os.receivers=[];/**
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
 */function zo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class F_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=zo("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Ue(){return window}function U_(n){Ue().location.href=n}/**
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
 */function ed(){return typeof Ue().WorkerGlobalScope<"u"&&typeof Ue().importScripts=="function"}async function B_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function W_(){return navigator?.serviceWorker?.controller||null}function H_(){return ed()?self:null}/**
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
 */const td="firebaseLocalStorageDb",$_=1,ls="firebaseLocalStorage",nd="fbase_key";class Ci{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ds(n,e){return n.transaction([ls],e?"readwrite":"readonly").objectStore(ls)}function V_(){const n=indexedDB.deleteDatabase(td);return new Ci(n).toPromise()}function Or(){const n=indexedDB.open(td,$_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(ls,{keyPath:nd})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(ls)?e(i):(i.close(),await V_(),e(await Or()))})})}async function wc(n,e,t){const i=Ds(n,!0).put({[nd]:e,value:t});return new Ci(i).toPromise()}async function j_(n,e){const t=Ds(n,!1).get(e),i=await new Ci(t).toPromise();return i===void 0?null:i.value}function Cc(n,e){const t=Ds(n,!0).delete(e);return new Ci(t).toPromise()}const G_=800,z_=3;class id{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Or(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>z_)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ed()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Os._getInstance(H_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await B_(),!this.activeServiceWorker)return;this.sender=new F_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||W_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Or();return await wc(e,cs,"1"),await Cc(e,cs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>wc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>j_(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Cc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Ds(s,!1).getAll();return new Ci(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),G_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}id.type="LOCAL";const sd=id;new yi(3e4,6e4);/**
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
 */function rd(n,e){return e?Ke(e):(C(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class qo extends zu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Zt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Zt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Zt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function q_(n){return N_(n.auth,new qo(n),n.bypassAuthState)}function Y_(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),P_(t,new qo(n),n.bypassAuthState)}async function K_(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),A_(t,new qo(n),n.bypassAuthState)}/**
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
 */class od{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return q_;case"linkViaPopup":case"linkViaRedirect":return K_;case"reauthViaPopup":case"reauthViaRedirect":return Y_;default:He(this.auth,"internal-error")}}resolve(e){et(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){et(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const J_=new yi(2e3,1e4);async function Q_(n,e,t){if(Ie(n.app))return Promise.reject(Ne(n,"operation-not-supported-in-this-environment"));const i=vi(n);Km(n,e,Go);const s=rd(i,t);return new Nt(i,"signInViaPopup",e,s).executeNotNull()}class Nt extends od{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Nt.currentPopupAction&&Nt.currentPopupAction.cancel(),Nt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){et(this.filter.length===1,"Popup operations only handle one event");const e=zo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ne(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Ne(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Nt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ne(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,J_.get())};e()}}Nt.currentPopupAction=null;/**
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
 */const X_="pendingRedirect",Mi=new Map;class Z_ extends od{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Mi.get(this.auth._key());if(!e){try{const i=await ey(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Mi.set(this.auth._key(),e)}return this.bypassAuthState||Mi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ey(n,e){const t=iy(e),i=ny(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function ty(n,e){Mi.set(n._key(),e)}function ny(n){return Ke(n._redirectPersistence)}function iy(n){return Di(X_,n.config.apiKey,n.name)}/**
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
 */async function sy(n,e){return await vi(n)._initializationPromise,ad(n,e,!1)}async function ad(n,e,t=!1){if(Ie(n.app))return Promise.reject(Dt(n));const i=vi(n),s=rd(i,e),o=await new Z_(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const ry=600*1e3;class oy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ay(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!cd(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Ne(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ry&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ec(e))}saveEventToCache(e){this.cachedEventUids.add(Ec(e)),this.lastProcessedEventTime=Date.now()}}function Ec(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function cd({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function ay(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return cd(n);default:return!1}}/**
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
 */async function cy(n,e={}){return bn(n,"GET","/v1/projects",e)}/**
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
 */const ly=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,uy=/^https?/;async function dy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await cy(n);for(const t of e)try{if(hy(t))return}catch{}He(n,"unauthorized-domain")}function hy(n){const e=Pr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!uy.test(t))return!1;if(ly.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const fy=new yi(3e4,6e4);function bc(){const n=Ue().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function py(n){return new Promise((e,t)=>{function i(){bc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{bc(),t(Ne(n,"network-request-failed"))},timeout:fy.get()})}if(Ue().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ue().gapi?.load)i();else{const s=E_("iframefcb");return Ue()[s]=()=>{gapi.load?i():t(Ne(n,"network-request-failed"))},w_(`${C_()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw xi=null,e})}let xi=null;function gy(n){return xi=xi||py(n),xi}/**
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
 */const my=new yi(5e3,15e3),_y="__/auth/iframe",yy="emulator/auth/iframe",vy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},wy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Cy(n){const e=n.config;C(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Wo(e,yy):`https://${n.config.authDomain}/${_y}`,i={apiKey:e.apiKey,appName:n.name,v:vn},s=wy.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${yn(i).slice(1)}`}async function Ey(n){const e=await gy(n),t=Ue().gapi;return C(t,n,"internal-error"),e.open({where:document.body,url:Cy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:vy,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Ne(n,"network-request-failed"),a=Ue().setTimeout(()=>{r(o)},my.get());function c(){Ue().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const by={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Iy=500,Sy=600,Ty="_blank",Ry="http://localhost";class Ic{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ky(n,e,t,i=Iy,s=Sy){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...by,width:i.toString(),height:s.toString(),top:r,left:o},l=de().toLowerCase();t&&(a=Uu(l)?Ty:t),xu(l)&&(e=e||Ry,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,g])=>`${h}${f}=${g},`,"");if(h_(l)&&a!=="_self")return Ay(e||"",a),new Ic(null);const d=window.open(e||"",a,u);C(d,n,"popup-blocked");try{d.focus()}catch{}return new Ic(d)}function Ay(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const Py="__/auth/handler",Ny="emulator/auth/handler",Ly=encodeURIComponent("fac");async function Sc(n,e,t,i,s,r){C(n.config.authDomain,n,"auth-domain-config-required"),C(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:vn,eventId:s};if(e instanceof Go){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",dr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof wi){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${Ly}=${encodeURIComponent(c)}`:"";return`${Oy(n)}?${yn(a).slice(1)}${l}`}function Oy({config:n}){return n.emulator?Wo(n,Ny):`https://${n.authDomain}/${Py}`}/**
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
 */const tr="webStorageSupport";class Dy{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Zu,this._completeRedirectFn=ad,this._overrideRedirectResult=ty}async _openPopup(e,t,i,s){et(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Sc(e,t,i,Pr(),s);return ky(e,r,zo())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Sc(e,t,i,Pr(),s);return U_(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(et(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Ey(e),i=new oy(e);return t.register("authEvent",s=>(C(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(tr,{type:tr},s=>{const r=s?.[0]?.[tr];r!==void 0&&t(!!r),He(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=dy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Vu()||Fu()||Vo()}}const My=Dy;var Tc="@firebase/auth",Rc="1.11.0";/**
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
 */class xy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Fy(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Uy(n){on(new Ft("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ju(n)},l=new y_(i,s,r,c);return I_(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),on(new Ft("auth-internal",e=>{const t=vi(e.getProvider("auth").getImmediate());return(i=>new xy(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),pt(Tc,Rc,Fy(n)),pt(Tc,Rc,"esm2020")}/**
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
 */const By=300,Wy=el("authIdTokenMaxAge")||By;let kc=null;const Hy=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Wy)return;const s=t?.token;kc!==s&&(kc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function $y(n=cl()){const e=Xr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=b_(n,{popupRedirectResolver:My,persistence:[sd,Qu,Zu]}),i=el("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Hy(r.toString());O_(t,o,()=>o(t.currentUser)),L_(t,a=>o(a))}}const s=Xc("auth");return s&&S_(t,`http://${s}`),t}function Vy(){return document.getElementsByTagName("head")?.[0]??document}v_({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Ne("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",Vy().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Uy("Browser");const jy=()=>!1,Gy=n=>{try{n&&localStorage.setItem("debug:console","1")}catch{}},oe=(...n)=>{},zy=(...n)=>{localStorage.getItem("debug:console")};function qy(){if(typeof window>"u"||typeof navigator>"u")return!1;const n=navigator.userAgent||navigator.vendor||"",e=/iPad|iPhone|iPod/.test(n),t=/Macintosh/.test(n)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,i=(e||t)&&!window.MSStream,s=/Android/i.test(n),r=i||s;return console.table({"User Agent":n,isAndroid:s,isiOSUA:e,isiPadOSDesktopUA:t,isMobileDevice:r}),r}const Be=$y(Tu);let Ri=!1;function Yy(){try{const n=document.createElement("a");n.href=window.location.href,n.target="_blank",n.rel="noopener noreferrer external",document.body.appendChild(n),n.click(),document.body.removeChild(n)}catch{}}const ld=(async()=>{try{await er(Be,sd)}catch{try{await er(Be,Qu)}catch{await er(Be,Lr)}}try{const n=await dd();n.success?console.log("[AUTH] ✅ Redirect sign-in completed, user:",n.user?.email||n.user?.uid):n.error?console.error("[AUTH] ❌ Redirect sign-in failed:",n.error):console.debug("[AUTH] No pending redirect result found.")}catch(n){console.error("[AUTH] Error during handleRedirectResult execution:",n)}})();let On=null;const Ky=()=>Math.random().toString(36).substring(2,15),Dr="guestUser",Jy=2880*60*1e3;function Qy(){try{const n=typeof localStorage<"u"?localStorage.getItem(Dr):null;if(!n)return null;const e=JSON.parse(n);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(Dr)}catch{}return null}return e}catch{return null}}function Xy(n,e=Jy){const t=Date.now(),i={id:n,createdAt:t,expiresAt:t+e};try{typeof localStorage<"u"&&localStorage.setItem(Dr,JSON.stringify(i))}catch{}return i}function re(){const n=Ge();if(n)return n;if(!On){const e=Qy();e&&e.id?On=e.id:(On=Ky(),Xy(On))}return On}function Ge(){return Be.currentUser?.uid??null}function Zy(){return new Promise(n=>{const e=Yu(Be,t=>{e(),n(t)})})}function Yo(n,{truncate:e=7}={}){return Yu(Be,t=>{const i=!!t,s=t?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;try{n({user:t,isLoggedIn:i,userName:r})}catch{}})}async function ud(){const n=new ge,e=qy(),t=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})(),i=t&&/iphone|ipad|ipod/i.test(navigator.userAgent||""),s=!0;try{if(i&&Ri){Ri=!1,Yy();return}const r=await Q_(Be,n),a=ge.credentialFromResult(r).accessToken,c=r.user;console.log("Signed in user:",c),oe("Google Access Token exists:",!!a),Ri=!1}catch(r){const o=r?.code||"unknown",a=r?.message||String(r);if(o==="auth/popup-closed-by-user"||o==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((o==="auth/network-request-failed"||o==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${o} inside iOS standalone PWA. Arming Safari fallback.`),Ri=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(o==="auth/popup-blocked"&&e){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const c=r?.customData?.email,l=ge.credentialFromError(r);if(console.error("Error during Google sign-in:",{errorCode:o,errorMessage:a,email:c,credential:l,origin:typeof window<"u"?window.location.origin:"n/a"}),o==="auth/unauthorized-domain"){const u=typeof window<"u"?window.location.origin:"",d=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",u?`• ${u}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];u&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(u).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${d.join(`
`)}`);return}alert(`Sign-in failed: ${a}`)}}async function dd(){try{const n=await sy(Be);if(n){const t=ge.credentialFromResult(n)?.accessToken,i=n.user;return console.log("[AUTH] Redirect result found - signed in user:",i?.email||i?.uid),oe("Google Access Token exists:",!!t),{success:!0,user:i}}return console.log("[AUTH] No redirect result (normal page load)"),{success:!1,user:null}}catch(n){const e=n?.code||"unknown",t=n?.message||String(n),i=n?.customData?.email,s=ge.credentialFromError(n);if(console.error("Error handling redirect result:",{errorCode:e,errorMessage:t,email:i,credential:s,origin:typeof window<"u"?window.location.origin:"n/a"}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`)}else alert(`Sign-in failed: ${t}`);return{success:!1,user:null,error:n}}}function hd(){Be.signOut().then(()=>{console.log("User signed out successfully")}).catch(n=>{console.error("Error signing out:",n)})}const ev=Object.freeze(Object.defineProperty({__proto__:null,auth:Be,authReady:ld,getCurrentUserAsync:Zy,getLoggedInUserId:Ge,getUserId:re,handleRedirectResult:dd,onAuthChange:Yo,signInWithGoogle:ud,signOutUser:hd},Symbol.toStringTag,{value:"Module"})),Ko=n=>n?!0:(console.warn("Element not found. el.id: =>",n?.id??"(no id)","el: =>",n),console.trace(),!1),Jo=n=>{if(Ko(n))return n.classList.contains("hidden")},b=n=>{Ko(n)&&n.classList.contains("hidden")&&n.classList.remove("hidden")},_=n=>{Ko(n)&&!n.classList.contains("hidden")&&n.classList.add("hidden")},fd=n=>n.classList.contains("small-frame"),Mt=n=>{if(n&&!fd(n)){n.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const t=document.createElement("span");t.classList.add("small-frame-toggle-icon"),t.textContent="❮",e.appendChild(t),n.appendChild(e),e.addEventListener("click",()=>{n.classList.contains("closed")?(n.classList.remove("closed"),e.classList.remove("closed"),t.classList.remove("closed")):(n.classList.add("closed"),e.classList.add("closed"),t.classList.add("closed"))})}},Lt=n=>{if(fd(n)){n.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function Mr(n){return document.pictureInPictureElement===n}const x=n=>{const e=document.getElementById(n);return e||(console.warn(`Element with id: ${n} not found.`),null)};let $e=null,Et=null,Ms=null,Qo=null,Te=null,J=null,K=null,U=null,W=null,ye=null,_e=null,ve=null,Oe=null,In=null,pd=null,ii=null,xs=null,De=null,Fs=null,Sn=null,Tn=null,Xo=null,Zo=null,ea=null,ta=null;function Ac(){$e=x("lobby"),Et=x("lobby-call-btn"),Ms=x("title-auth-bar"),Qo=x("videos"),Te=x("local-video-el"),J=x("local-video-box"),K=x("remote-video-el"),U=x("remote-video-box"),W=x("shared-video-el"),ye=x("shared-video-box"),_e=x("chat-controls"),ve=x("call-btn"),Oe=x("hang-up-btn"),In=x("switch-camera-btn"),ii=x("status"),xs=x("sync-status"),De=x("mute-btn"),Fs=x("fullscreen-partner-btn"),Sn=x("mic-btn"),Tn=x("camera-btn"),Xo=x("app-pip-btn"),Zo=x("app-title-h1"),ea=x("app-title-a"),ta=x("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ac):Ac();const gd=()=>({lobbyDiv:$e,lobbyCallBtn:Et,titleAuthBar:Ms,videosWrapper:Qo,localVideoEl:Te,localBoxEl:J,remoteVideoEl:K,remoteBoxEl:U,sharedVideoEl:W,sharedBoxEl:ye,chatControls:_e,callBtn:ve,hangUpBtn:Oe,switchCameraBtn:In,installBtn:pd,statusDiv:ii,syncStatus:xs,mutePartnerBtn:De,fullscreenPartnerBtn:Fs,micBtn:Sn,cameraBtn:Tn,appPipBtn:Xo,appTitleH1:Zo,appTitleA:ea,appTitleSpan:ta});function md(n,e=3,t=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(n);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${n} not found after ${e} attempts`),i(null);return}setTimeout(r,t)};r()})}async function _d(n,e=3,t=100){const i={},s=n.map(async r=>{const o=await md(r,e,t);return i[r]=o,o});return await Promise.all(s),i}async function tv(){const n=await _d(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");n.searchContainer=e;const t=Object.entries(n).filter(([i,s])=>!s).map(([i])=>i);return t.length>0&&console.warn("Some YouTube elements not found:",t),n}const nv=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Xo},get appTitleA(){return ea},get appTitleH1(){return Zo},get appTitleSpan(){return ta},get callBtn(){return ve},get cameraBtn(){return Tn},get chatControls(){return _e},get fullscreenPartnerBtn(){return Fs},getElements:gd,get hangUpBtn(){return Oe},initializeYouTubeElements:tv,installBtn:pd,get lobbyCallBtn(){return Et},get lobbyDiv(){return $e},get localBoxEl(){return J},get localVideoEl(){return Te},get micBtn(){return Sn},get mutePartnerBtn(){return De},get remoteBoxEl(){return U},get remoteVideoEl(){return K},robustElementAccess:md,get sharedBoxEl(){return ye},get sharedVideoEl(){return W},get statusDiv(){return ii},get switchCameraBtn(){return In},get syncStatus(){return xs},get titleAuthBar(){return Ms},get videosWrapper(){return Qo},waitForElements:_d},Symbol.toStringTag,{value:"Module"}));function A(n){ii?ii.textContent=n:console.warn("Status div not found in the DOM.")}function yd(n,{inactivityMs:e=3e3,listenTarget:t=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!n)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(y=>!Array.isArray(o)||!o.includes(y));function u(){b(n);try{typeof i=="function"&&i()}catch(y){console.warn("showHideOnInactivity onShow callback error:",y)}a&&clearTimeout(a),a=setTimeout(()=>{_(n);try{typeof s=="function"&&s()}catch(y){console.warn("showHideOnInactivity onHide callback error:",y)}a=null},e)}l.forEach(y=>t.addEventListener(y,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{_(n)}catch(y){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",y)}}else u()}document.addEventListener("visibilitychange",d);function h(y){if(!y.relatedTarget){a&&(clearTimeout(a),a=null),_(n);try{typeof s=="function"&&s()}catch(k){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",k)}}}t.addEventListener("mouseout",h);function f(y){if(r&&(y.key==="Escape"||y.key==="Esc")){a&&(clearTimeout(a),a=null),_(n);try{typeof s=="function"&&s()}catch(k){console.warn("showHideOnInactivity onHide (esc) callback error:",k)}}}document.addEventListener("keydown",f);function g(){a||u()}t.addEventListener("touchend",g,{passive:!0}),_(n);function v(){l.forEach(y=>t.removeEventListener(y,u)),document.removeEventListener("visibilitychange",d),t.removeEventListener("mouseout",h),t.removeEventListener("touchend",g),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return v}class en{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,t,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:t,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${t}`,i)}logListenerAttachment(e,t,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:t,currentCount:i,...s})}logListenerCleanup(e,t,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:t.length,removedRoomIds:e,preservedRoomIds:t,...i})}logDuplicateListener(e,t,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:t,...i})}logIncomingCallEvent(e,t,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:t,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,t,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:t,roomId:i,...s})}logCallingUILifecycle(e,t,i={}){this.log("CALLING_UI",e,{roomId:t,...i})}logFirebaseOperation(e,t,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:t,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,t={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...t})}logRoomCreation(e,t,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:t,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,t,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:t,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,t,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:t,...i})}logContactCall(e,t,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:t,forceInitiator:i,...s})}logFreshnessValidation(e,t,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:t,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,t,i,s={}){this.log("RACE_CONDITION",e,{roomId:t,events:i,...s})}getLogs(e={}){let t=[...this.logs];return e.category&&(t=t.filter(i=>i.category===e.category)),e.event&&(t=t.filter(i=>i.event===e.event)),e.roomId&&(t=t.filter(i=>i.data.roomId===e.roomId)),e.since&&(t=t.filter(i=>i.timestamp>=e.since)),e.until&&(t=t.filter(i=>i.timestamp<=e.until)),t}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((t,i)=>t.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const t=this.getLogs({category:"LISTENER"});return e?t.filter(i=>i.data.roomId===e):t}getFailureAnalysis(){const e=this.logs.filter(t=>t.category==="FIREBASE"&&t.data.success===!1||t.category==="INCOMING_CALL"&&t.data.decision==="REJECT"||t.category==="LISTENER"&&t.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(t=>t.category==="FIREBASE").length,rejectedCalls:e.filter(t=>t.category==="INCOMING_CALL"&&t.data.decision==="REJECT").length,duplicateListeners:e.filter(t=>t.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const t=this.exportLogsAsJSON(),i=new Blob([t],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,t){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=t)}getLogsSince(e){return this.logs.filter(t=>t.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const t=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=t)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const t=localStorage.getItem(e);if(t){const i=JSON.parse(t);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(t){return console.warn("Failed to load persisted logs:",t),0}}static getPersistedLogKeys(){const e=[];for(let t=0;t<localStorage.length;t++){const i=localStorage.key(t);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const t=Date.now()-e;en.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<t&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const t=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:t}),t}endTiming(e,t={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...t}),s}return null}}let nr=null;function m(){return nr||(nr=new en),nr}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>m(),exportLogs:()=>{const e=m().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:n=>{m().downloadLogs(n),console.log("Diagnostic logs downloaded")},getRoomLogs:n=>{const t=m().getCallFlowTrace(n);return console.log(`Logs for room ${n}:`,t),t},getFailures:()=>{const e=m().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:n=>{const t=m().getListenerDiagnostics(n);return console.log("Listener diagnostics:",t),t},getLogsSince:n=>{const t=m().getLogsSince(n);return console.log(`Logs since ${new Date(n).toISOString()}:`,t),t},getLogsInRange:(n,e)=>{const i=m().getLogsInTimeRange(n,e);return console.log(`Logs from ${new Date(n).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=m().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:n=>{const t=m().loadPersistedLogs(n);return console.log(`Loaded ${t} persisted logs`),t},getPersistedKeys:()=>{const n=en.getPersistedLogKeys();return console.log("Persisted log keys:",n),n},clearLogs:()=>{m().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{m().enable(),console.log("Diagnostic logging enabled")},disable:()=>{m().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const n=m(),e={sessionId:n.sessionId,logCount:n.logs.length,isEnabled:n.isEnabled,maxLogs:n.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const n=m();n.logs.length>0&&n.persistLogs(),en.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const n=m(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!n.isEnabled||!e)return;const t=en.getPersistedLogKeys();t.length>0&&(console.log(`Found ${t.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",t))}catch{}},1e3));class iv{constructor(){this.currentRoomId=null}async createNewRoom(e,t,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),m().log("ROOM","CREATE_START",{roomId:i,userId:t,hasOffer:!!e,timestamp:s});const r=bt(i);try{return await Ze(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:t}),m().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:t,duration:Date.now()-s}),await this.joinRoom(i,t),m().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:t,totalDuration:Date.now()-s}),i}catch(o){throw m().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:t,duration:Date.now()-s}),o}}async checkRoomStatus(e){const t=bt(e),i=await Ot(t);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const t=bt(e),i=await Ot(t);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,t){const i=bt(e);await Ni(i,{answer:t})}async joinRoom(e,t,i="Guest User"){const s=hc(e,t);await Ze(s,{displayName:i,joinedAt:Date.now()}),m().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${t}`)}async leaveRoom(e,t=null,{deleteRoomIfEmpty:i=!0}={}){const s=t||this.currentRoomId;if(!s||!e)return;const r=hc(s,e),o=Si(s),a=bt(s);try{await pn(r)}catch(c){m().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await Ot(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await pn(a).catch(d=>{m().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){m().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!t||t===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,t,i="user_rejected"){if(!e||!t)return;const s=bt(e),r={rejection:{by:t,reason:i,at:Date.now()}};try{await Ni(s,r),m().log("ROOM","REJECT_SET",{roomId:e,byUserId:t,reason:i})}catch(o){throw m().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:t,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,t,i="caller_cancelled"){if(!e||!t)return;const s=bt(e),r={cancellation:{by:t,reason:i,at:Date.now()}};try{await Ni(s,r),m().log("ROOM","CANCEL_SET",{roomId:e,byUserId:t,reason:i})}catch(o){throw m().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:t,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,t){const i=Gm(e);At(i,"value",t,e),m().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,t){const i=Si(e);At(i,"child_added",t,e),m().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,t){const i=Si(e);At(i,"child_removed",t,e),m().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,t,i){const s=Si(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return At(s,"child_added",r,e,t),At(s,"child_removed",o,e,t),()=>jm(t,e)}get roomId(){return this.currentRoomId}}const H=new iv,us=3e4;let ze=null,xn=null;async function sv(n,e=null){const t=re(),i=Ge();if(!i)return;const s=Fo(i);await Ze(s,{roomId:n,targetContactName:e,initiatedAt:Date.now(),callerUserId:t})}async function ds(){const n=Ge();if(!n)return;const e=Fo(n);await pn(e).catch(()=>{})}async function vd(n,e){if(!n)return!1;try{const t=Fo(n),i=await Ot(t);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<us}catch(t){return console.warn("Failed to check outgoing call freshness",t),!1}}async function wd(n){if(!n)return!1;try{const e=ee(te,`rooms/${n}/createdAt`),t=await Ot(e);if(!t.exists())return!1;const i=t.val();return typeof i!="number"?!1:Date.now()-i<us}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Cd(n,e,t){const i=m(),s=Date.now();_t(),await sv(n,e);const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const o=document.createElement("div");o.style.cssText=`
    background: #4d4e54ff;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    min-width: 300px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `;const a=document.createElement("h2");a.textContent=`Calling ${e||"contact"}...`,a.style.cssText=`
    margin: 0 0 10px 0;
    font-size: 20px;
    color: #d0d7dbff;
  `;const c=document.createElement("p");c.textContent="Waiting for answer...",c.style.cssText=`
    margin: 0 0 20px 0;
    color: #bbb;
    font-size: 14px;
  `;const l=document.createElement("button");l.textContent="Cancel",l.style.cssText=`
    padding: 10px 24px;
    background: #c34949ff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",n,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([ds(),H.cancelCall(n,re(),"caller_cancelled"),H.leaveRoom(re(),n)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:n,error:String(d)})}_t(),A("Call cancelled")};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=n,ze=r,xn=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",n,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:us});try{await Promise.all([ds(),H.cancelCall(n,re(),"auto_timeout"),H.leaveRoom(re(),n)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:n,error:String(d)})}_t(),A("Call timed out - no answer after 30 seconds")},us)}function _t(){if(ze){const n=ze.dataset?.roomId||"unknown";m().logCallingUILifecycle("HIDE",n,{reason:"hide_called",hadTimeout:!!xn,timestamp:Date.now()})}xn&&(clearTimeout(xn),xn=null),ze&&(ze.remove(),ze=null)}async function na(){if(ze){const n=ze.dataset?.roomId||"unknown";m().logCallingUILifecycle("ANSWERED",n,{reason:"call_answered",timestamp:Date.now()})}await ds(),_t()}async function rv(n="user_rejected"){const e=m(),t=ze?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",t,{reason:n,timestamp:Date.now()}),await ds(),_t(),A("Call declined")}const ov=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:_t,isOutgoingCallFresh:vd,isRoomCallFresh:wd,onCallAnswered:na,onCallRejected:rv,showCallingUI:Cd},Symbol.toStringTag,{value:"Module"}));let tn=null;function ia(n,e={}){return new Promise(t=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${n}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),t(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),tn===a&&(tn=null),t(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),tn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function av(){if(typeof tn=="function"){try{tn(!1)}catch{}return tn=null,!0}return!1}const cv=Object.freeze(Object.defineProperty({__proto__:null,default:ia,dismissActiveConfirmDialog:av},Symbol.toStringTag,{value:"Module"}));async function Pc(n,e,t){const i=Ge();if(i){const s=ee(te,`users/${i}/contacts/${n}`);await Ze(s,{contactId:n,contactName:e,roomId:t,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[n]={contactId:n,contactName:e,roomId:t,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function hs(){const n=Ge();if(n)try{const e=ee(te,`users/${n}/contacts`),t=await Ot(e);return t.exists()?t.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function lv(n,e,t){if(!n||!e)return;const s=(await hs())?.[n];if(s){s.roomId!==e&&(await Pc(n,s.contactName,e),await si(t)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),ai(e);return}if(!await ia("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",n)||n;await Pc(n,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),ai(e),await si(t)}async function si(n){if(!n)return;const e=await hs(),t=Object.keys(e);let i=n.querySelector(".contacts-list");if(i||(i=document.createElement("div"),i.className="contacts-list",n.appendChild(i)),t.length===0){i.innerHTML='<p style="color: #666;">No saved contacts yet.</p>',i.style.display="none";return}i.style.display="",i.innerHTML=`
    <h3 style="margin: 0 0 10px 0; font-size: 16px;">Saved Contacts</h3>
    <ul style="list-style: none; padding: 0; margin: 0;">
      ${t.map(s=>{const r=e[s];return`
            <li style="margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <button 
                class="contact-call-btn" 
                data-room-id="${r.roomId}"
                data-contact-name="${r.contactName}"
              >
                Call
              </button>
              <span class="contact-name" style="flex: 1;">${r.contactName}</span>
              <button 
                class="contact-delete-btn" 
                data-contact-id="${s}"
              >
                ✕
              </button>
            </li>
          `}).join("")}
    </ul>
  `,uv(i,n)}function uv(n,e){n.querySelectorAll(".contact-call-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-room-id"),s=t.getAttribute("data-contact-name");i&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${i}`),ai(i),await Cd(i,s),ga(i,{forceInitiator:!0}).catch(r=>{console.warn("Failed to call contact:",r),_t()}))}}),n.querySelectorAll(".contact-delete-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await dv(i),await si(e))}})}async function dv(n){const e=Ge();if(e){try{await pn(ee(te,`users/${e}/contacts/${n}`))}catch(t){console.warn("Failed to delete contact from RTDB",t)}return}try{const t=localStorage.getItem("contacts")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("contacts",JSON.stringify(i)))}catch(t){console.warn("Failed to delete contact from localStorage",t)}}const ri=new WeakMap;function sa(n,e,t){if(!n||!t)throw new Error("setupIceCandidates: pc and roomId are required");if(ri.has(n)||ri.set(n,[]),e==="initiator")Nc(n,"offerCandidates",t),Lc(n,"answerCandidates",t);else if(e==="joiner")Nc(n,"answerCandidates",t),Lc(n,"offerCandidates",t);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Nc(n,e,t){n.onicecandidate=i=>{if(i.candidate){const s=dc(e==="offerCandidates"?Ru(t):ku(t));Ze(s,i.candidate.toJSON())}}}function Lc(n,e,t){const i=e==="offerCandidates"?Ru(t):ku(t);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{n.remoteDescription&&(ra(n),n.removeEventListener("signalingstatechange",a))};n.addEventListener("signalingstatechange",a)};At(i,"child_added",a=>{const c=a.val();if(!(!n||n.signalingState==="closed")&&c)if(n.remoteDescription)try{n.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=ri.get(n);l&&(l.push(c),l.length===1&&r())}},t)}function ra(n){if(!n||!ri.has(n))return;const e=ri.get(n);if(e.length!==0){oe(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const t of e)try{n.addIceCandidate(new RTCIceCandidate(t)).catch(i=>{oe("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const hv=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:ra,setupIceCandidates:sa},Symbol.toStringTag,{value:"Module"}));let xe=null,Oc=null;function Ed(n){Oc=n,n.onconnectionstatechange=()=>{oe("onconnectionstatechange:",n.connectionState),n.connectionState==="connected"?(A("Connected!"),ma(),na().catch(e=>console.warn("Failed to clear calling state on connect:",e)),xe&&(clearTimeout(xe),xe=null)):n.connectionState==="disconnected"?(A("Partner disconnected (reconnecting...)"),xe&&clearTimeout(xe),xe=setTimeout(()=>{n===Oc&&n.connectionState==="disconnected"&&(A("Partner disconnected"),Q.cleanupCall({reason:"connection_lost"})),xe=null},3e3)):n.connectionState==="failed"&&(A("Connection failed"),Bs(),xe&&(clearTimeout(xe),xe=null),Q.cleanupCall({reason:"connection_failed"}))},n.addEventListener("iceconnectionstatechange",e=>{oe("ICE iceconnectionstatechange:",n.iceConnectionState),n.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),n.restartIce())})}function xr(n,e,t={}){if(!n||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=t,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(n.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{s&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),s&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",c)}}const fv=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function pv(n){const e=n.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function Dc(n){const e=document.createElement("div");e.innerHTML=`
  <div id="messages-ui-container" >
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
  </div>
  `,document.body.appendChild(e);const t=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input"),a=t?.parentNode||null,c=t?.nextSibling||null;if(!t||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;let l=!1;function u(){if(!t||!i||i.classList.contains("hidden"))return;const j=t.getBoundingClientRect(),ae=i.getBoundingClientRect(),_a=8;let Ws=j.top-ae.height-_a;Ws<8&&(Ws=j.bottom+_a);let kn=j.left+j.width/2-ae.width/2;const ya=window.innerWidth-ae.width-8;kn<8&&(kn=8),kn>ya&&(kn=ya),i.style.top=`${Math.round(Ws)}px`,i.style.left=`${Math.round(kn)}px`}function d(){l||(l=!0,window.addEventListener("resize",u,{passive:!0}),window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("orientationchange",u,{passive:!0}))}function h(){l&&(l=!1,window.removeEventListener("resize",u),window.removeEventListener("scroll",u),window.removeEventListener("orientationchange",u))}const f=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu");function g(){!t||!f||t.parentNode!==f&&f.appendChild(t)}function v(){!t||!a||t.parentNode!==a&&(c&&c.parentNode===a?a.insertBefore(t,c):a.appendChild(t))}const y=window.matchMedia("(max-width: 800px)"),k=j=>{j.matches?g():v()};k(y),y.addEventListener("change",k);const P=new MutationObserver(j=>{j.forEach(ae=>{ae.type==="attributes"&&ae.attributeName==="class"&&i.classList.contains("hidden")})});P.observe(i,{attributes:!0});function ie(){i.classList.toggle("hidden"),i.classList.contains("hidden")?(o.blur(),h(),i.style.top="",i.style.left="",i.style.bottom="",i.style.right=""):(o.focus(),fv?requestAnimationFrame(()=>{pv(i)||(u(),d())}):(u(),d()))}t.addEventListener("click",ie),xr(i,()=>{_(i),h(),i.style.top="",i.style.left="",i.style.bottom="",i.style.right=""},{ignore:[t],esc:!0});function E(){b(t)}function X(){_(t)}function we(j){const ae=document.createElement("p");ae.textContent=j,j.startsWith("You:")?ae.style.textAlign="right":j.startsWith("Partner:")&&(ae.style.textAlign="left"),s.appendChild(ae),s.scrollTop=s.scrollHeight}function Me(j){we(`Partner: ${j}`),Jo(i)&&pe()}function pe(){t.classList.add("new-message"),setTimeout(()=>{t.classList.remove("new-message")},4e3)}r.addEventListener("submit",j=>{j.preventDefault();const ae=o.value.trim();ae&&(n(ae),we(`You: ${ae}`),o.value="")});function jt(){try{y.removeEventListener("change",k)}catch{}v(),h(),P.disconnect(),t&&X(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:we,receiveMessage:Me,toggleMessages:ie,showMessagesToggle:E,hideMessagesToggle:X,cleanup:jt}}function bd(n,e){let t,i;return e==="initiator"?(t=n.createDataChannel("chat"),i=Dc(r=>{t.readyState==="open"&&t.send(r)}),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)):e==="joiner"&&(n.ondatachannel=s=>{t=s.channel,i=Dc(r=>t.send(r)),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)}),{dataChannel:t,messagesUI:i}}const oa={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},ir=new WeakMap;function Id(n,e,t){ir.has(n)||ir.set(n,{});const i=ir.get(n),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===t?!0:(i[s]=t,!1)}function Sd(n,e){return n?e==="offer"?n.signalingState==="stable":n.signalingState==="have-local-offer"||n.signalingState==="stable":!1}function aa(n,e){e.getTracks().forEach(t=>{n.addTrack(t,e)})}async function Td(n){const e=await n.createOffer();return await n.setLocalDescription(e),e}async function Rd(n){const e=await n.createAnswer();return await n.setLocalDescription(e),e}async function kd(n,e,t){if(Id(n,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Sd(n,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,n.signalingState),!1;try{return await n.setRemoteDescription(new RTCSessionDescription(e)),t(n),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function Ad(){return Math.random().toString(36).substring(2,9)}const gv=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:aa,createAnswer:Rd,createOffer:Td,generateRoomId:Ad,isDuplicateSdp:Id,isValidSignalingState:Sd,rtcConfig:oa,setRemoteDescription:kd},Symbol.toStringTag,{value:"Module"}));async function mv({localStream:n,remoteVideoEl:e,mutePartnerBtn:t,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!n)return A("Error: Camera not initialized"),{success:!1};const o=new RTCPeerConnection(oa),a="initiator",c=r||Ad(),l=re();aa(o,n);const{dataChannel:u,messagesUI:d}=bd(o,a);if(!i(o,e,t))return A("Error setting up remote stream"),console.error("Error setting up remote stream"),o.close(),{success:!1};sa(o,a,c),Ed(o);const f=await Td(o);await H.createNewRoom(f,l,c),s(c,a,l);const g=`${window.location.origin}${window.location.pathname}?room=${c}`;return A("Waiting for partner to join..."),{success:!0,pc:o,roomId:c,roomLink:g,dataChannel:u,messagesUI:d,role:a}}async function _v({roomId:n,localStream:e,remoteVideoEl:t,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r}){if(!e)return A("Error: Camera not initialized"),{success:!1};if(!n)return A("Error: No room ID"),{success:!1};const o=await H.checkRoomStatus(n);if(!o.exists)return A("Error: Invalid room link"),{success:!1};if(!o.hasMembers)return A("Error: Room is empty - no one to connect with"),{success:!1};let a;try{a=await H.getRoomData(n)}catch(y){return A("Error: "+y.message),{success:!1}}const c=a.offer;if(!c)return A("Error: No offer found"),{success:!1};const l=new RTCPeerConnection(oa),u="joiner",d=re();aa(l,e);const{dataChannel:h,messagesUI:f}=bd(l,u);if(!s(l,t,i))return A("Error setting up remote stream"),console.error("Error setting up remote stream for joiner"),l.close(),{success:!1};sa(l,u,n),Ed(l),await kd(l,c,ra);const v=await Rd(l);try{await H.saveAnswer(n,v)}catch(y){return console.error("Failed to save answer to Firebase:",y),A("Failed to send answer to partner."),l.close(),{success:!1}}return r(n,u,d),await H.joinRoom(n,d),A("Connecting..."),{success:!0,pc:l,roomId:n,dataChannel:h,messagesUI:f,role:u}}class yv{constructor(){this.listeners=new Map}on(e,t){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t)}off(e,t){this.listeners.has(e)&&this.listeners.get(e).delete(t)}emit(e,t){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(t)}catch(s){console.warn("CallController listener error",s)}}}class vv{constructor(){this.emitter=new yv,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,t){this.emitter.on(e,t)}off(e,t){this.emitter.off(e,t)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const t=ee(te,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i){i=!0;try{A("Partner disconnected")}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Li(t,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:t,callback:s,roomId:e})}setupAnswerListener(e,t,i){if(!e||!t)return;const s=ee(te,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Yt(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>gv);return{setRemoteDescription:l}},void 0);await c(t,a,i)}};Li(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const t=ee(te,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Yt(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>ov);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{A("Call declined")}try{await H.leaveRoom(re(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Li(t,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:t,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const t=re(),i=s=>{s.key!==t&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};H.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const t=re(),i=s=>{s.key!==t&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};H.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,t]of this.listeners.entries())for(const i of t)try{i.ref&&Ps(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{Ns(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const t=await mv(e);if(!t||!t.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:t}),this.emitCallFailed("createCall",t),t;this.pc=t.pc,this.roomId=t.roomId,this.roomLink=t.roomLink||null,this.role=t.role||"initiator",this.dataChannel=t.dataChannel||null,this.messagesUI=t.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:i}=await Yt(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>hv);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),t}catch(t){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:t}),this.emitCallFailed("createCall",t),t}}async answerCall(e={}){this.state="joining";try{e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const t=await _v(e);return!t||!t.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:t}),this.emitCallFailed("answerCall",t),t):(this.pc=t.pc,this.roomId=t.roomId,this.role=t.role||"joiner",this.dataChannel=t.dataChannel||null,this.messagesUI=t.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),t)}catch(t){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:t}),this.emitCallFailed("answerCall",t),t}}async hangUp({emitCancel:e=!0,reason:t="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await H.cancelCall(this.roomId,re(),t)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:t}),this.emitter.emit("hangup",{roomId:this.roomId,reason:t})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,t){this.emitter.emit("callFailed",{phase:e,error:t?.message||t?.error||t||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const t=this.roomId,i=this.partnerId;this.removeTrackedListeners();try{await H.leaveRoom(re(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(s){console.warn("CallController: failed to clear remote video",s)}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:t,partnerId:i,reason:e}),this.resetState(),this.emitter.emit("cleanup",{roomId:t,partnerId:i,reason:e})}catch(t){throw this.emitter.emit("error",{phase:"cleanupCall",error:t}),t}finally{this.isCleaningUp=!1}}}}const Q=new vv,Fr={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Pd(){const n=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>n[i])?Fr.withVoiceIsolationIfSupported:Fr.default}const wv=()=>Fr.default,Cv={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},Ev=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function ca(n){const e=Ev()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",s=Cv[i][e];return{facingMode:n,...s}}function bv(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function Iv(){return bv()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function Sv(){const n=await Iv();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}async function Tv({localStream:n,localVideo:e,currentFacingMode:t,peerConnection:i=null}){if(!n||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=t==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:ca(s),audio:Pd()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=n.getVideoTracks()[0],l=c?c.enabled:!0,u=n.getAudioTracks()[0],d=u?!u.enabled:!1;if(i){const h=i.getSenders().find(g=>g.track&&g.track.kind==="video");h&&h.replaceTrack(o);const f=i.getSenders().find(g=>g.track&&g.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),n.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let sr=!1,It=null,St=null;function Rv({getLocalStream:n,getFacingMode:e}){return It&&St&&It.removeEventListener("change",St),It=window.matchMedia("(orientation: portrait)"),St=()=>{try{const t=typeof n=="function"?n():null,i=typeof e=="function"?e():"user";kv({localStream:t,currentFacingMode:i})}catch(t){console.error("Orientation handler failed:",t)}},It.addEventListener("change",St),()=>{It&&St&&It.removeEventListener("change",St),It=null,St=null}}async function kv({localStream:n,currentFacingMode:e}){if(!(sr||!n?.getVideoTracks()[0])){sr=!0;try{const t=n.getVideoTracks()[0],i=ca(e);oe("Applying constraints:",i),await t.applyConstraints(i),oe("Video constraints updated successfully")}catch(t){console.error("Failed to apply orientation constraints:",t)}finally{sr=!1}}}let ct=null,lt=null,Nd="user";function Mc(){return Nd}function Av(n){Nd=n}function la(n=!0){return!ct||!(ct instanceof MediaStream)?(n&&console.error("Invalid remote MediaStream accessed:",ct),null):ct}function Pv(n){ct=n}function Nv(){ct&&(ct.getTracks().forEach(n=>n.stop()),ct=null)}function ua(n=!0){return!lt||!(lt instanceof MediaStream)?(n&&(console.error("Invalid local MediaStream accessed:",lt),console.error("Call createLocalStream() before accessing local stream.")),null):lt}function Ur(n){lt=n}function Lv(){lt&&(lt.getTracks().forEach(n=>n.stop()),lt=null)}let Br=!1,fs=[];function Ov(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function Dv(n,e,t){t&&(t.muted=!n,t.volume=e)}function Mv(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function xv(n,e){if(!n)return;const t=()=>{if(n.muted!==Br){const i=e.querySelector("i");i.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",Br=n.muted}};n.addEventListener("volumechange",t),fs.push(()=>{n&&n.removeEventListener("volumechange",t)})}function Fv({getLocalStream:n,getLocalVideo:e,getRemoteVideo:t,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){r&&(r.onclick=()=>{const d=n(),h=e();if(!h||!d)return;const f=!h.muted;Ov(!f,d),Dv(!f,0,h),Mv(f,r)}),o&&(o.onclick=()=>{const d=n();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=Rv({getLocalStream:n,getFacingMode:Mc});fs.push(u),a&&(a.onclick=async()=>{const d=await Tv({localStream:n(),localVideo:e(),currentFacingMode:Mc(),peerConnection:i()||null});d?(Av(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof s=="function"&&s(d.newStream)):console.error("Camera switch failed.")},(async()=>await Sv()?b(a):_(a))()),c&&(c.onclick=()=>{const d=t();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=t();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function Uv(){fs.forEach(n=>n()),fs=[],Br=!1}const xc="yt-video-box",Wr="yt-player-root";let B=null,tt=!1;const jn=()=>B,Bv=()=>tt,Ld=n=>tt=n,nn=()=>{const n=document.getElementById(xc);if(!n)throw new Error(`Container #${xc} not found`);return n};function Wv(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function Od(){const n=nn();if(!document.getElementById(Wr)){const e=document.createElement("div");e.id=Wr,n.appendChild(e)}b(n)}function Hr(){const n=nn();_(n)}function rr(){const n=nn();return n&&!n.classList.contains("hidden")}function $r(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function Dd(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const i=n.match(t);if(i&&i[1])return i[1]}return null}async function Hv({url:n,onReady:e,onStateChange:t}){const i=Dd(n);if(!i)throw new Error("Invalid YouTube URL");if(await Wv(),B){try{B.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}B=null}const s=(o=!0)=>{const a=nn(),c=B.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=nn(),h=B.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),B.getPlayerState()!==window.YT.PlayerState.PLAYING?ha():Us()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=nn(),a=B.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Od(),new Promise((o,a)=>{try{B=new window.YT.Player(Wr,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{tt=!0,e&&e(c),o(B)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),t&&t(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function da(){if(B){try{Hr(),B.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}B=null,tt=!1}}function ha(){B&&tt&&B.playVideo()}function Us(){B&&tt&&B.pauseVideo()}function $v(n){B&&tt&&B.seekTo(n,!0)}function ps(){return B&&tt?B.getCurrentTime():0}function fa(){return B&&tt?B.getPlayerState():-1}const ut={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Le=null,Ei=null,Md=!1,Ee="none",pa=null;const Rn=()=>Md,xd=n=>Md=n,Dn=()=>Ee,Vv=n=>{["yt","url","none"].includes(n)?Ee=n:console.warn("Invalid lastWatched platform:",n)};let dt=!1,Gn=null,zn=0;async function sn(n){if(!Le)return;console.debug("Updating watch sync state, roomId:",Le);const e=Ls(Le);try{await Ni(e,{...n,updatedBy:Ei})}catch(t){console.error("Failed to update watch state:",t)}}function jv(n,e,t){if(!n)return;Le=n,Ei=t;const i=Ls(n);Li(i,Gv,n),Xv()}function Gv(n){const e=n.val();e&&e.updatedBy!==Ei&&(Date.now()-zn<500||(e.url&&e.url!==pa&&zv(e.url),e.isYouTube?qv(e):Qv(e)))}function zv(n){pa=n,$r(n)?(_(ye),Fd(n),Ee="yt"):(da(),b(ye),W.src=n,Ee="url")}function qv(n){!jn()||!Bv()||(Yv(n),Kv(n))}function Yv(n){const e=fa(),t=e===ut.PLAYING;if([ut.BUFFERING,ut.UNSTARTED].includes(e)){Jv();return}dt||(n.playing&&!t?(ha(),Ee="yt"):!n.playing&&t&&(Us(),Ee="yt"))}function Kv(n){if(n.currentTime===void 0)return;const e=ps();Math.abs(e-n.currentTime)>.3&&!dt&&($v(n.currentTime),setTimeout(()=>{n.playing?ha():Us(),Ee="yt"},500))}function Jv(){dt=!0,clearTimeout(Gn),Gn=setTimeout(async()=>{dt=!1;const n=fa()===ut.PLAYING;await sn({playing:n,currentTime:ps()})},700)}function Qv(n){n.playing!==void 0&&(n.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!n.playing&&!W.paused&&W.pause()),n.currentTime!==void 0&&Math.abs(W.currentTime-n.currentTime)>1&&(W.currentTime=n.currentTime,n.playing?W.play().catch(t=>console.warn("Play failed:",t)):W.pause())}function Xv(){W.addEventListener("play",async()=>{!jn()&&Le&&(zn=Date.now(),await sn({playing:!0,isYouTube:!1})),Ee="url"}),W.addEventListener("pause",async()=>{!jn()&&Le&&(zn=Date.now(),await sn({playing:!1,isYouTube:!1})),Ee="url"}),W.addEventListener("seeked",async()=>{!jn()&&Le&&(zn=Date.now(),await sn({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),Ee="url"})}async function Zv(n){if(!n)return!1;if(zn=Date.now(),$r(n)){if(_(ye),!await Fd(n))return!1;Ee="yt"}else da(),b(ye),W.src=n,Ee="url";if(Le){const e=Ls(Le);Ze(e,{url:n,playing:!1,currentTime:0,isYouTube:$r(n),updatedBy:Ei})}return!0}async function qt(n){if(!n||!n.url)return console.warn("Non-existing or invalid video."),!1;pa=n.url;const e=await Zv(n.url);return zr(),e}async function Fd(n){if(!Dd(n))return console.error("Invalid YouTube URL:",n),!1;try{return await Hv({url:n,onReady:t=>{if(Ld(!0),Le){const i=Ls(Le);Ze(i,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Ei})}},onStateChange:async t=>{if(!jn())return;const s=t.data===ut.PLAYING,r=t.data===ut.PAUSED;if(t.data===ut.BUFFERING){dt=!0,Gn&&clearTimeout(Gn),Gn=setTimeout(async()=>{dt=!1;const c=fa()===ut.PLAYING;await sn({playing:c,currentTime:ps()})},700);return}r&&dt||!dt&&(s||r)&&await sn({playing:s,currentTime:ps()})}}),!0}catch(t){return console.error("Failed to load YouTube video:",t),!1}}let or=null,ot=null,F=null,D=null,Fc=!1,ki=!1,Fe=[],Vr="",se=-1,jr=[];const ew="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",tw="https://www.googleapis.com/youtube/v3";async function nw(){if(Fc||ki)return!1;ki=!0;const{initializeYouTubeElements:n}=await Yt(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>nv);return{initializeYouTubeElements:o}},void 0),e=await n();if(or=e.searchContainer,ot=e.searchBtn,F=e.searchQuery,D=e.searchResults,!or||!ot||!F||!D)return console.error("YouTube search elements not found in DOM"),ki=!1,!1;const t=o=>/^https?:\/\//i.test(o),i=o=>{(D?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),se=o??-1};ot.onclick=async()=>{const o=F.value.trim();if(Jo(F)){b(F),F.focus();return}if(!o){Fi(),_(F);return}if(Wc()&&o===Vr)Gr(Fe);else if(!t(o))await Uc(o);else{qt&&await qt({url:o}),_(D),F.value="",_(F),se=-1;return}},or.addEventListener("keydown",async o=>{const a=D.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=se+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=se-1;c<0&&(c=se===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&se>=0){a[se].click(),_(F),_(D),se=-1;return}const c=F.value.trim();if(c)if(Wc()&&c===Vr)Gr(Fe);else if(!t(c))await Uc(c);else{qt&&await qt({url:c}),_(D),se=-1,F.value="",_(F);return}}else o.key==="Escape"&&(sw()?Fi():F.value?F.value="":_(F))}),F.addEventListener("input",()=>{F.value.trim()===""&&Fi(),se=-1});const s=xr(F,()=>_(F),{ignore:[ot],esc:!1});jr.push(s);const r=xr(D,()=>_(D),{ignore:[ot],esc:!1});return jr.push(r),ki=!1,Fc=!0,!0}async function Uc(n){if(!ot||!D){console.error("Search elements not initialized");return}Fe=[],Vr=n,ot.disabled=!0,D.innerHTML='<div class="search-loading">Searching YouTube...</div>',b(D);try{const e=await fetch(`${tw}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${ew}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const t=await e.json();if(!t.items||t.items.length===0){Bc("No videos found"),Fe=[];return}Fe=t.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Gr(Fe)}catch(e){console.error("YouTube search failed:",e),Bc(e.message||"Search failed. Please try again.")}finally{ot.disabled=!1}}function Gr(n){if(!D){console.error("Search results element not initialized");return}if(!n||n.length===0){D.innerHTML='<div class="no-results">No results found</div>',Fe=[],se=-1;return}D.innerHTML="",n.forEach(t=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${t.thumbnail}" alt="${t.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${t.title}</div>
        <div class="result-channel">${t.channel}</div>
      </div>
    `,i.onclick=async()=>{if(qt){if(await qt(t),_(D),se=-1,!F){console.error("Search query element not initialized");return}F.value="",_(F)}},D.appendChild(i)}),b(D),se=0,D.querySelectorAll(".search-result-item").forEach((t,i)=>{i===se?(t.classList.add("focused"),t.scrollIntoView({block:"nearest"})):t.classList.remove("focused")})}function Bc(n){if(Fe=[],se=-1,!D){console.error("Search results element not initialized");return}D.innerHTML=`<div class="search-error">${n}</div>`,b(D)}function Fi(){Fe=[],se=-1,D&&(D.innerHTML="",_(D))}function iw(){Fi(),jr.forEach(n=>n())}function sw(){return!Jo(D)}function Wc(){return Fe.length>0}const rw=n=>String(n).replace(/[&<>"'`=\/]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[t]),ow=(n,e)=>n.replace(/\$\{([^}]+)\}/g,(t,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):rw(String(r))}),aw=(n,e={})=>{const t=document.createElement("template");return t.innerHTML=ow(n,e),t.content.cloneNode(!0)},cw=(n,e)=>{const t=[];let i=e;for(;i&&i!==n;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);t.push(r),i=s}return t.reverse()},lw=(n,e)=>e.reduce((t,i)=>t&&t.children?t.children[i]:null,n),uw=n=>Array.from(n.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:cw(n,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),dw=n=>n.replace(/["'\\]/g,"\\$&"),hw=(n,e)=>{e.forEach(t=>{let i=null;if(t.name){const s=dw(t.name);i=n.querySelector(`input[name="${s}"], textarea[name="${s}"], select[name="${s}"]`)}else t.id?i=n.querySelector(`#${t.id}`):t.path&&(i=lw(n,t.path));if(i){if(i.value=t.value,t.checked!==void 0&&(i.checked=t.checked),t.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(t.selectionStart,t.selectionEnd)}catch{}if(t.wasFocused)try{i.focus()}catch{}}})},fw=n=>Array.from(n.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),pw=(n,e)=>{const t=n.querySelectorAll("video, audio");for(const i of t)if(i.currentSrc===e||i.src===e)return i;return null},gw=(n,e)=>{e.forEach(t=>{if(!t.src)return;const i=pw(n,t.src);i&&(i.currentTime=t.currentTime,i.volume=t.volume,i.playbackRate=t.playbackRate,i.muted=t.muted,t.paused||i.play().catch(()=>{}))})},mw=()=>document.readyState!=="loading",Ud=({initialProps:n={},template:e="",handlers:t={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!mw())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...n};const h=new Set,f=/\$\{([^}]+)\}/g;let g;for(;(g=f.exec(e))!==null;){const E=g[1].trim().split(".")[0];h.add(E)}const v=[],y=[],k={},P=()=>{let E=[],X=[];l&&(E=uw(u),X=fw(u)),u.textContent="";const we=aw(e,d);u.appendChild(we),Object.keys(t).forEach(Me=>{const pe=u.querySelectorAll(`[onclick="${Me}"]`),jt=t[Me];pe.forEach(j=>{j.removeAttribute("onclick"),typeof jt=="function"&&j.addEventListener("click",jt)})}),l&&(hw(u,E),gw(u,X)),v.forEach(Me=>Me({...d}))},ie=E=>{if(!Array.isArray(E)||E.length===0)return;const X={props:{...d},changedKeys:E};y.forEach(we=>we(X))};for(const E of Object.keys(n))k[E]=[],Object.defineProperty(u,E,{get(){return d[E]},set(X){d[E]!==X&&(d[E]=X,h.has(E)&&P(),k[E].forEach(we=>we(X)),ie([E]))},configurable:!0,enumerable:!0});if(u.update=E=>{let X=!1,we=!1;const Me=[];for(const pe in E)E[pe]!==d[pe]&&(d[pe]=E[pe],h.has(pe)&&(we=!0),k[pe]&&k[pe].forEach(jt=>jt(E[pe])),X=!0,Me.push(pe));X&&we&&P(),Me.length>0&&ie(Me)},u.onRender=E=>{typeof E=="function"&&v.push(E)},u.onAnyPropUpdated=E=>{typeof E=="function"&&y.push(E)},u.onPropUpdated=(E,X)=>{typeof X=="function"&&k[E]&&k[E].push(X)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(E=>{typeof E=="function"&&E()}):typeof a=="function"&&a()),v.length=0,y.length=0;for(const E in k)k[E].length=0;u.remove()},P(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(E){zy("[createComponent]: Error in onMount handler of component",E)}return u};function _w({title:n="",iconHtml:e="",disabledAttr:t="",id:i="",className:s="",onClick:r=null,onMount:o=null,parent:a=null}={}){return Ud({initialProps:{title:n,iconHtml:e,disabledAttr:t,id:i},template:'\n      <button id="${id}" title="${title}" ${disabledAttr} onclick="handleClick">\n        ${iconHtml}\n      </button>\n    ',className:s,handlers:{handleClick:r},onMount:o,parent:a})}const yw=({shouldShowInProd:n=!1}={})=>{const e=localStorage.getItem("debug:console")==="1";if(isDev()){if(!e)return}else if(!n)return;const t=[];"serviceWorker"in navigator?t.push("✓ Service Workers supported"):t.push("❌ Service Workers not supported"),window.location.protocol==="https:"||window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?t.push("✓ Secure context (HTTPS/localhost)"):t.push("❌ Not served over HTTPS or localhost"),window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0?t.push("⚠️  App is already installed"):t.push("✓ App not yet installed"),console.group("[PWA] Install Prompt Debug"),console.log("Installability checks:"),t.forEach(s=>console.log(s)),console.log(`
Possible reasons beforeinstallprompt did not fire:`),console.log("1. Chrome throttled the prompt (recently dismissed/uninstalled)"),console.log("2. Manifest or Service Worker issues"),console.log("3. App already installed"),console.log(`
Workarounds:`),console.log("• Try in Incognito mode (bypasses throttling)"),console.log('• Use Chrome menu: ⋮ → "Install HangVidU..."'),console.groupEnd(),isDev()&&alert(`⚠️ Install prompt blocked (Chrome throttling)

✅ Workarounds:
1. Open in Incognito mode
2. Use Chrome menu: ⋮ → "Install HangVidU..."
3. Wait 1-2 days for Chrome to reset

Your PWA setup is correct! This is just Chrome's anti-spam protection.`)};let kt=null,Hc=!1,ce=null;function vw(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function ww(){if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),ce&&_(ce);return}if(!ce){const e=document.querySelector(".top-right-menu");if(!e){console.warn("[PWA]: .top-right-menu container not found");return}ce=_w({id:"install-btn",title:"Install App",iconHtml:'<i class="fa fa-plus"></i>',className:"hidden",onMount:t=>{},parent:e})}const n=ce.querySelector?.("button")??ce;if(!(n instanceof HTMLElement)){console.warn("[PWA]: Install button element not found in component");return}if(vw()){ce.update({iconHtml:'<i class="fa fa-info"></i>',title:"Show Install Instructions"}),_(ce),n.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}Hc||(n.addEventListener("click",async()=>{if(!kt){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),yw({shouldShowInProd:!0});return}try{await kt.prompt();const{outcome:e}=await kt.userChoice;oe(`User choice outcome: ${e}`),console.info(e==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),!jy()&&_(ce),kt=null}catch(e){_(ce),console.error("Error showing install prompt:",e)}}),Hc=!0),window.addEventListener("appinstalled",()=>{_(ce),kt=null}),kt?b(ce):_(ce)}window.addEventListener("beforeinstallprompt",n=>{console.debug("[PWA]: beforeinstallprompt fired"),n.preventDefault(),kt=n,ce&&b(ce)});const Cw=async()=>{const n=ua(!1);if(n&&n instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),n;const e=ca("user"),t=Pd();try{const i=await navigator.mediaDevices.getUserMedia({video:e,audio:t});return Ur(i),i}catch(i){if(i.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${i.constraint}, falling back to basic constraints`);const s=wv(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return Ur(r),r}throw i}};async function Ew(n){const e=await Cw(),t=new MediaStream(e.getVideoTracks());return n.srcObject=t,!0}function bw(n,e,t){return n.ontrack=i=>{if(oe(`REMOTE TRACK RECEIVED: ${i.track.kind}`),!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;const s=i.streams[0];if(la(!1)!==s){Pv(s),e.srcObject=s,xv(e,t),A("Connected!");try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let $c=!1;function Iw(n,e){const t=document.createElement("dialog");t.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=n,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),t.appendChild(i),{dialog:t,input:o,copyButton:c,cancelButton:l,feedback:u}}function Sw(n,e={}){const t={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};Tw();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=Iw(n,t);Rw(i);let c=!1;const l=async()=>{await kw(n,s)?(c=!0,a.textContent=t.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),t.onCopy&&t.onCopy(n),t.autoClose&&setTimeout(()=>{i.close()},t.autoCloseDelay)):(a.textContent=t.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),t.onError&&t.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{t.onCancel&&t.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&t.onCancel&&t.onCancel(),t.onClose&&t.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function Tw(){if($c)return;const n=document.createElement("style");n.textContent=`
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
  `,document.head.appendChild(n),$c=!0}function Rw(n){n.showModal||(n.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},n.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function kw(n,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(n),!0}catch(t){return console.warn("Clipboard API failed, using fallback:",t),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(t){return console.error("Fallback copy failed:",t),!1}}let Mn=null;const Aw=(n,e=null)=>{if(Mn)return Mn;if(!n)return console.error("Auth UI: Parent element is required"),null;let t=null,i=10;return typeof e=="number"&&(i=e),Mn=Ud({initialProps:{isLoggedIn:!1,userName:"Guest User",loginDisabledAttr:"",logoutDisabledAttr:"disabled",loginBtnMarginRightPx:i},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:ud,handleLogout:hd},onMount:s=>{t=Yo(({isLoggedIn:r,userName:o})=>{console.debug("[AuthComponent] Auth state changed:",{isLoggedIn:r,userName:o}),s.update({isLoggedIn:r,userName:o,loginDisabledAttr:r?"disabled":"",logoutDisabledAttr:r?"":"disabled"})})},onCleanup:()=>{t&&(t(),t=null),Mn=null},className:"auth-component",parent:n}),Mn},Vc="pwa_redirected_to_hosting";function Pw(){if(!(window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0)||!window.location.hostname.includes("github.io")||sessionStorage.getItem(Vc))return;const i="https://vidu-aae11.web.app";sessionStorage.setItem(Vc,"true");const s=i+window.location.pathname+window.location.search;console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",s),window.location.replace(s)}Gy(!0);m().disable();let oi=[];const gs=()=>{const n=la(!1);return n&&n.getVideoTracks().some(e=>e.enabled)};async function Nw(){Lw();const n=gd(),t=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!n[i]);if(t.length>0)return console.error("Critical elements missing:",t),A("Error: Required UI elements not found."),!1;try{ww(),nw(),xw(),await ld;const i=Aw(Ms);return i&&oi.push(i.dispose),await ms(),!0}catch(i){return console.error("Failed to get user media:",i),A("Error: Please allow camera and microphone access."),!1}}function Bs(){window.history.replaceState({},document.title,window.location.pathname)}let jc=!1;async function ms(){jc||(jc=!0,await Ew(Te),Fv({getLocalStream:ua,getLocalVideo:()=>Te,getRemoteVideo:()=>K,getPeerConnection:()=>Q.getState().pc,setLocalStream:Ur,micBtn:Sn,cameraBtn:Tn,switchCameraBtn:In,mutePartnerBtn:De,fullscreenPartnerBtn:Fs}),Te&&(Te.addEventListener("enterpictureinpicture",()=>J&&_(J)),Te.addEventListener("leavepictureinpicture",()=>{J&&!(Rn()&&gs())&&b(J)})))}function Lw(){_(U),_(J),_(ye),_(_e)}function Ui(n=null){return{localStream:ua(),remoteVideoEl:K,mutePartnerBtn:De,setupRemoteStream:bw,setupWatchSync:jv,targetRoomId:n}}function Bi(n,e=!1){return n.success?(e&&n.roomLink&&Sw(n.roomLink,{onCopy:()=>A("Link ready! Share with your partner."),onCancel:()=>A("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function ga(n,{forceInitiator:e=!1}={}){const t=Date.now();if(e){m().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await ms();const r=await Q.createCall(Ui(n));return Bi(r,!1)}let i=await H.checkRoomStatus(n);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await H.checkRoomStatus(n),o++}if(!i.exists||!i.hasMembers){m().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0}),await ms();const r=await Q.createCall(Ui(n));return Bi(r,!0)}A("Joining room..."),m().log("ROOM","JOINING_EXISTING",{roomId:n,memberCount:i.memberCount,roomExists:i.exists});const s=await Q.answerCall({roomId:n,...Ui()});return Bi(s,!1)}const me=new Set,Bd=new Map;function Gc(n){n&&(Ns(n),me.delete(n),Bd.delete(n),m().log("LISTENER","INCOMING_CLEANUP",{roomId:n,remainingListeners:me.size}))}function Ow(){oe(`[LISTENER] Removing all incoming listeners (${me.size} rooms)`);const n=Array.from(me);n.forEach(e=>{Ns(e)}),me.clear(),Bd.clear(),m().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:n.length})}async function Dw(n){const e=Date.now(),t=e+1440*60*1e3,i=Ge();if(i){const s=xo(i,n);await Ze(s,{roomId:n,savedAt:e,expiresAt:t});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[n]={roomId:n,savedAt:e,expiresAt:t},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function ar(n){const e=Ge();if(e){try{await pn(xo(e,n))}catch(t){console.warn("Failed to remove recent call from RTDB",t)}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(t){console.warn("Failed to remove recent call from localStorage",t)}}function ai(n){n&&(me.has(n)&&(me.delete(n),Ns(n)),oe(`[LISTENER] Attaching listener for room: ${n} (total: ${me.size+1})`),me.add(n),m().logListenerAttachment(n,"member_join",me.size,{action:"incoming_call_listener_attached"}),H.onMemberJoined(n,async e=>{const t=e.key,i=e.val?e.val():null,s=re();if(t&&t!==s){m().logMemberJoinEvent(n,t,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const P=await vd(t,n),ie=await wd(n);a=P||ie,c=P?"outgoingState":ie?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(m().logIncomingCallEvent(t,n,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){m().logNotificationDecision("REJECT","stale_call",n,{age:l,validationMethod:c,joiningUserId:t});return}let d;try{d=await H.getRoomData(n)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,g=d.createdBy;if(!h||f||g===s)return;const v=Q.getState();if(!!v.pc&&v.pc.connectionState==="connected"){m().logNotificationDecision("REJECT","already_in_call",n,{joiningUserId:t,currentCallState:v.pc?.connectionState});return}if(m().logNotificationDecision("SHOW","fresh_call_detected",n,{joiningUserId:t,freshnessResult:u}),await ia(`Incoming call from ${t} for room ${n}.

Accept?`))Gc(n),m().logNotificationDecision("ACCEPT","user_accepted",n,{joiningUserId:t}),ga(n).catch(P=>{console.warn("Failed to answer incoming call:",P),A("Failed to answer incoming call."),m().logFirebaseOperation("join_room_on_accept",!1,P,{roomId:n,joiningUserId:t})});else{m().logNotificationDecision("REJECT","user_rejected",n,{joiningUserId:t});try{await H.rejectCall(n,re(),"user_rejected")}catch(P){console.warn("Failed to signal rejection via RTDB:",P)}await ar(n).catch(P=>{console.warn("Failed to remove recent call on rejection:",P)})}}}),H.onCallCancelled(n,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await Yt(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>cv);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await ar(n).catch(()=>{})}}),H.onMemberLeft(n,async e=>{const t=e.key,i=re();if(!(!t||t===i))try{(await H.checkRoomStatus(n)).hasMembers||(await ar(n),Gc(n),oe(`Removed saved recent call and listeners for room ${n} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function zc(){const n=Date.now();m().log("LISTENER","STARTUP_BEGIN",{timestamp:n,currentListenerCount:me.size});try{if(typeof window<"u"){const{getCurrentUserAsync:t}=await Yt(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>ev);return{getCurrentUserAsync:i}},void 0);await t()}}catch{}const e=Ge();if(m().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const t=zm(e);try{const i=await Ot(t),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await pn(xo(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await hs();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>ai(o)),m().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:me.size,duration:Date.now()-n})}catch(i){console.warn("Failed to read recent calls from RTDB",i),m().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await hs();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>ai(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),m().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:me.size,duration:Date.now()-n,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(t){console.warn("Failed to read recent calls from localStorage",t),m().logFirebaseOperation("read_recent_calls",!1,t,{storage:"localStorage"})}}let ci=!1,We=null,cr=null,lr=null;function Mw(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}let Ai=!1,ma=()=>{if(ci)return;const n=la(!1);if(!K||!n||K.paused||K.readyState<2){Ai||(Ai=!0,K.addEventListener("playing",()=>{Ai=!1,ma()},{once:!0}));return}if(Ai=!1,ci=!0,b(U),b(J),Mt(J),_($e),_(Et),ve.disabled=!0,ve.classList.add("disabled"),Oe.disabled=!1,Oe.classList.remove("disabled"),De.disabled=!1,De.classList.remove("disabled"),We||(We=yd(_e,{inactivityMs:2500,hideOnEsc:!0})),!cr){const e=()=>{Rn()?Mt(U):Lt(U),b(U)};K.addEventListener("leavepictureinpicture",e),cr=()=>K.removeEventListener("leavepictureinpicture",e),oi.push(cr)}if(!lr){const e=()=>_(U);K.addEventListener("enterpictureinpicture",e),lr=()=>K.removeEventListener("enterpictureinpicture",e),oi.push(lr)}},Wd=(n=!1)=>{!ci&&!n||(ci=!1,Lt(U),_(U),ve.disabled=!1,ve.classList.remove("disabled"),b(Et),Oe.disabled=!0,Oe.classList.add("disabled"),De.disabled=!0,De.classList.add("disabled"),We&&(We(),We=null),b($e),Rn()||(Mt(J),b(J),b(_e)))};function zr(){if(!Rn()){if(xd(!0),_($e),_e.classList.remove("bottom"),_e.classList.add("watch-mode"),ci?(_(ve),b(Oe)):(_(Oe),_(Sn),_(De),b(ve)),_(Et),_(Tn),_(In),b(_e),We&&(We(),We=null),!gs()){_(U),Lt(U),Mr(Te)||(b(J),Mt(J));return}_(J),Lt(J),Mr(K)?(_(U),Lt(U)):Mw()?K.requestPictureInPicture().then(()=>{_(U),Lt(U)}).catch(n=>{console.warn("Failed to enter Picture-in-Picture:",n),Mt(U),b(U)}):(Mt(U),b(U))}}function Wi(){Rn()&&(b(ve),b(Oe),b(Sn),b(De),b(ve),b(Tn),b(In),_e.classList.remove("watch-mode"),_e.classList.add("bottom"),b(_e),We||(We=yd(_e,{inactivityMs:3e3,hideOnEsc:!0})),gs()&&(Mr(K)&&document.exitPictureInPicture().catch(n=>{console.error("Failed to exit Picture-in-Picture:",n)}),Lt(U),b(U)),Mt(J),b(J),gs()||(b($e),b(Et)),xd(!1))}function ur(){return W&&ye&&!ye.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let qc=!1;function xw(){if(qc)return;const n=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!n()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",Dn()),console.log("isYTVisible():",rr()),console.log("isSharedVideoVisible():",ur()),console.log("isWatchModeActive():",Rn()),Dn()==="yt"?rr()?(Hr(),Wi()):(Od(),zr()):Dn()==="url"&&(ur()?(_(ye),Wi()):(b(ye),zr()))),e.key==="m"||e.key==="M")){const t=Q.getState();t.messagesUI&&t.messagesUI.toggleMessages()}e.key==="Escape"&&(Dn()==="yt"&&rr()?(Us(),Hr()):Dn()==="url"&&ur()&&(W.pause(),_(ye)),Wi())}),qc=!0}const Hd=async()=>{await ms();const n=await Q.createCall(Ui());Bi(n,!0)};ve.onclick=Hd;Et.onclick=Hd;Oe.onclick=async()=>{console.debug("Hanging up..."),await Q.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function Fw(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const t=await ga(e);return t||(Bs(),Wd()),A("Auto-joined room from URL"),t}Pw();window.onload=async()=>{if(!await Nw()){ve.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await zc().catch(s=>console.warn("Failed to start saved-room listeners",s)),si($e).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const t=Yo(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;e=s,await si($e),a?(oe("[AUTH] User logged out - cleaning up incoming listeners"),Ow()):c?(oe("[AUTH] User logged in - re-attaching incoming listeners"),await zc().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&s&&oe("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});oi.push(()=>{try{typeof t=="function"&&t()}catch{}}),!await Fw()&&A('Ready. Click "Start New Chat" to begin.')};window.addEventListener("beforeunload",async n=>{const e=Q.getState();if(e.pc&&e.pc.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;await Uw()});Q.on("memberJoined",({memberId:n,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:n,roomId:e}),Q.setPartnerId(n),ma(),na().catch(t=>console.warn("Failed to clear calling state:",t)),Dw(e).catch(t=>console.warn("Failed to save recent call:",t))});Q.on("memberLeft",({memberId:n})=>{console.debug("CallController memberLeft event",{memberId:n}),console.info("Partner has left the call")});Q.on("cleanup",({roomId:n,reason:e})=>{console.debug("CallController cleanup event",{roomId:n,reason:e}),_t(),Nv(),Wd(),A('Disconnected. Click "Start New Chat" to begin.'),Bs()});Q.on("cleanup",({roomId:n,partnerId:e,reason:t})=>{console.debug("CallController cleanup event",{roomId:n,partnerId:e,reason:t}),e&&n&&setTimeout(()=>{lv(e,n,$e).catch(i=>{console.warn("Failed to save contact after cleanup:",i)})},500)});async function Uw(){await Q.hangUp({emitCancel:!0,reason:"page_unload"}),Uv(),Vm(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const n=Q.getState();n.messagesUI&&n.messagesUI.cleanup&&n.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),W.src="",xs.textContent="",Lv(),Te&&(Te.srcObject=null),K&&(K.srcObject=null),Wi(),Bs(),Vv("none"),da(),Ld(!1),iw(),oi.forEach(e=>e())}
