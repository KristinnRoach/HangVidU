(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Ad="modulepreload",Nd=function(n){return"/HangVidU/"+n},da={},jt=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var o=l;document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(t.map(u=>{if(u=Nd(u),u in da)return;da[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":Ad,d||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),d)return new Promise((g,_)=>{f.addEventListener("load",g),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return s.then(a=>{for(const c of a||[])c.status==="rejected"&&r(c.reason);return e().catch(r)})};/**
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
 */const Pd=()=>{};var ha={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw hn(e)},hn=function(n){return new Error("Firebase Database ("+Wc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ld=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Wr={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(t[u],t[d],t[h],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ld(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new Od;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const g=l<<6&192|d;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Od extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const $c=function(n){const e=Vc(n);return Wr.encodeByteArray(e,!0)},xi=function(n){return $c(n).replace(/\./g,"")},Fi=function(n){try{return Wr.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dd(n){return Hc(void 0,n)}function Hc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Md(t)||(n[t]=Hc(n[t],e[t]));return n}function Md(n){return n!=="__proto__"}/**
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
 */function xd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Fd=()=>xd().__FIREBASE_DEFAULTS__,Ud=()=>{if(typeof process>"u"||typeof ha>"u")return;const n=ha.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Bd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Fi(n[1]);return e&&JSON.parse(e)},Vr=()=>{try{return Pd()||Fd()||Ud()||Bd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},jc=n=>Vr()?.emulatorHosts?.[n],Wd=n=>{const e=jc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Gc=()=>Vr()?.config,zc=n=>Vr()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function fn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function qc(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function Vd(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[xi(JSON.stringify(t)),xi(JSON.stringify(o)),""].join(".")}const Ln={};function $d(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ln))Ln[e]?n.emulator.push(e):n.prod.push(e);return n}function Hd(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let fa=!1;function Yc(n,e){if(typeof window>"u"||typeof document>"u"||!fn(window.location.host)||Ln[n]===e||Ln[n]||fa)return;Ln[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=$d().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{fa=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=Hd(i),f=t("text"),g=document.getElementById(f)||document.createElement("span"),_=t("learnmore"),m=document.getElementById(_)||document.createElement("a"),P=t("preprendIcon"),L=document.getElementById(P)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const de=h.element;a(de),u(m,_);const E=l();c(L,P),de.append(L,g,m,E),document.body.appendChild(de)}r?(g.innerText="Preview backend disconnected.",L.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(L.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function oe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function $r(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(oe())}function jd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Kc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function zd(){const n=oe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function qd(){return Wc.NODE_ADMIN===!0}function Yd(){try{return typeof indexedDB=="object"}catch{return!1}}function Kd(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jd="FirebaseError";class yt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Jd,Object.setPrototypeOf(this,yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ri.prototype.create)}}class ri{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Qd(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new yt(s,a,i)}}function Qd(n,e){return n.replace(Xd,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Xd=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(n){return JSON.parse(n)}function G(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=$n(Fi(r[0])||""),t=$n(Fi(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Zd=function(n){const e=Jc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},eh=function(n){const e=Jc(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function en(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function rr(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ui(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ot(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(pa(r)&&pa(o)){if(!Ot(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function pa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function nh(n,e){const t=new ih(n,e);return t.subscribe.bind(t)}class ih{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");sh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=xs),s.error===void 0&&(s.error=xs),s.complete===void 0&&(s.complete=xs);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function sh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function xs(){}function hs(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},fs=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function ue(n){return n&&n._delegate?n._delegate:n}class Dt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const bt="[DEFAULT]";/**
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
 */class oh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new si;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ch(e))try{this.getOrInitializeService({instanceIdentifier:bt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=bt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=bt){return this.instances.has(e)}getOptions(e=bt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ah(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=bt){return this.component?this.component.multipleInstances?e:bt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ah(n){return n===bt?void 0:n}function ch(n){return n.instantiationMode==="EAGER"}/**
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
 */class lh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new oh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var A;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(A||(A={}));const uh={debug:A.DEBUG,verbose:A.VERBOSE,info:A.INFO,warn:A.WARN,error:A.ERROR,silent:A.SILENT},dh=A.INFO,hh={[A.DEBUG]:"log",[A.VERBOSE]:"log",[A.INFO]:"info",[A.WARN]:"warn",[A.ERROR]:"error"},fh=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=hh[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Hr{constructor(e){this.name=e,this._logLevel=dh,this._logHandler=fh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in A))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?uh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,A.DEBUG,...e),this._logHandler(this,A.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,A.VERBOSE,...e),this._logHandler(this,A.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,A.INFO,...e),this._logHandler(this,A.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,A.WARN,...e),this._logHandler(this,A.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,A.ERROR,...e),this._logHandler(this,A.ERROR,...e)}}const ph=(n,e)=>e.some(t=>n instanceof t);let ga,ma;function gh(){return ga||(ga=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function mh(){return ma||(ma=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Qc=new WeakMap,or=new WeakMap,Xc=new WeakMap,Fs=new WeakMap,jr=new WeakMap;function _h(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(lt(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Qc.set(t,n)}).catch(()=>{}),jr.set(e,n),e}function yh(n){if(or.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});or.set(n,e)}let ar={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return or.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Xc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return lt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function vh(n){ar=n(ar)}function wh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Us(this),e,...t);return Xc.set(i,e.sort?e.sort():[e]),lt(i)}:mh().includes(n)?function(...e){return n.apply(Us(this),e),lt(Qc.get(this))}:function(...e){return lt(n.apply(Us(this),e))}}function Ch(n){return typeof n=="function"?wh(n):(n instanceof IDBTransaction&&yh(n),ph(n,gh())?new Proxy(n,ar):n)}function lt(n){if(n instanceof IDBRequest)return _h(n);if(Fs.has(n))return Fs.get(n);const e=Ch(n);return e!==n&&(Fs.set(n,e),jr.set(e,n)),e}const Us=n=>jr.get(n);function Eh(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=lt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(lt(o.result),c.oldVersion,c.newVersion,lt(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const bh=["get","getKey","getAll","getAllKeys","count"],Ih=["put","add","delete","clear"],Bs=new Map;function _a(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Bs.get(e))return Bs.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Ih.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||bh.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return Bs.set(e,r),r}vh(n=>({...n,get:(e,t,i)=>_a(e,t)||n.get(e,t,i),has:(e,t)=>!!_a(e,t)||n.has(e,t)}));/**
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
 */class Sh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Th(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Th(n){return n.getComponent()?.type==="VERSION"}const cr="@firebase/app",ya="0.14.4";/**
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
 */const ze=new Hr("@firebase/app"),kh="@firebase/app-compat",Rh="@firebase/analytics-compat",Ah="@firebase/analytics",Nh="@firebase/app-check-compat",Ph="@firebase/app-check",Lh="@firebase/auth",Oh="@firebase/auth-compat",Dh="@firebase/database",Mh="@firebase/data-connect",xh="@firebase/database-compat",Fh="@firebase/functions",Uh="@firebase/functions-compat",Bh="@firebase/installations",Wh="@firebase/installations-compat",Vh="@firebase/messaging",$h="@firebase/messaging-compat",Hh="@firebase/performance",jh="@firebase/performance-compat",Gh="@firebase/remote-config",zh="@firebase/remote-config-compat",qh="@firebase/storage",Yh="@firebase/storage-compat",Kh="@firebase/firestore",Jh="@firebase/ai",Qh="@firebase/firestore-compat",Xh="firebase",Zh="12.4.0";/**
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
 */const lr="[DEFAULT]",ef={[cr]:"fire-core",[kh]:"fire-core-compat",[Ah]:"fire-analytics",[Rh]:"fire-analytics-compat",[Ph]:"fire-app-check",[Nh]:"fire-app-check-compat",[Lh]:"fire-auth",[Oh]:"fire-auth-compat",[Dh]:"fire-rtdb",[Mh]:"fire-data-connect",[xh]:"fire-rtdb-compat",[Fh]:"fire-fn",[Uh]:"fire-fn-compat",[Bh]:"fire-iid",[Wh]:"fire-iid-compat",[Vh]:"fire-fcm",[$h]:"fire-fcm-compat",[Hh]:"fire-perf",[jh]:"fire-perf-compat",[Gh]:"fire-rc",[zh]:"fire-rc-compat",[qh]:"fire-gcs",[Yh]:"fire-gcs-compat",[Kh]:"fire-fst",[Qh]:"fire-fst-compat",[Jh]:"fire-vertex","fire-js":"fire-js",[Xh]:"fire-js-all"};/**
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
 */const Bi=new Map,tf=new Map,ur=new Map;function va(n,e){try{n.container.addComponent(e)}catch(t){ze.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function tn(n){const e=n.name;if(ur.has(e))return ze.debug(`There were multiple attempts to register component ${e}.`),!1;ur.set(e,n);for(const t of Bi.values())va(t,n);for(const t of tf.values())va(t,n);return!0}function Gr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function we(n){return n==null?!1:n.settings!==void 0}/**
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
 */const nf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ut=new ri("app","Firebase",nf);/**
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
 */class sf{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ut.create("app-deleted",{appName:this._name})}}/**
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
 */const gn=Zh;function Zc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:lr,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ut.create("bad-app-name",{appName:String(s)});if(t||(t=Gc()),!t)throw ut.create("no-options");const r=Bi.get(s);if(r){if(Ot(t,r.options)&&Ot(i,r.config))return r;throw ut.create("duplicate-app",{appName:s})}const o=new lh(s);for(const c of ur.values())o.addComponent(c);const a=new sf(t,i,o);return Bi.set(s,a),a}function el(n=lr){const e=Bi.get(n);if(!e&&n===lr&&Gc())return Zc();if(!e)throw ut.create("no-app",{appName:n});return e}function dt(n,e,t){let i=ef[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ze.warn(o.join(" "));return}tn(new Dt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const rf="firebase-heartbeat-database",of=1,Hn="firebase-heartbeat-store";let Ws=null;function tl(){return Ws||(Ws=Eh(rf,of,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Hn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ut.create("idb-open",{originalErrorMessage:n.message})})),Ws}async function af(n){try{const t=(await tl()).transaction(Hn),i=await t.objectStore(Hn).get(nl(n));return await t.done,i}catch(e){if(e instanceof yt)ze.warn(e.message);else{const t=ut.create("idb-get",{originalErrorMessage:e?.message});ze.warn(t.message)}}}async function wa(n,e){try{const i=(await tl()).transaction(Hn,"readwrite");await i.objectStore(Hn).put(e,nl(n)),await i.done}catch(t){if(t instanceof yt)ze.warn(t.message);else{const i=ut.create("idb-set",{originalErrorMessage:t?.message});ze.warn(i.message)}}}function nl(n){return`${n.name}!${n.options.appId}`}/**
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
 */const cf=1024,lf=30;class uf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new hf(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ca();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>lf){const s=ff(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ze.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ca(),{heartbeatsToSend:t,unsentEntries:i}=df(this._heartbeatsCache.heartbeats),s=xi(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ze.warn(e),""}}}function Ca(){return new Date().toISOString().substring(0,10)}function df(n,e=cf){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Ea(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ea(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class hf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Yd()?Kd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await af(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return wa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return wa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Ea(n){return xi(JSON.stringify({version:2,heartbeats:n})).length}function ff(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function pf(n){tn(new Dt("platform-logger",e=>new Sh(e),"PRIVATE")),tn(new Dt("heartbeat",e=>new uf(e),"PRIVATE")),dt(cr,ya,n),dt(cr,ya,"esm2020"),dt("fire-js","")}pf("");var ba={};const Ia="@firebase/database",Sa="1.1.0";/**
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
 */let il="";function gf(n){il=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mf{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),G(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:$n(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _f{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Ue(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new mf(e)}}catch{}return new _f},kt=sl("localStorage"),yf=sl("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gt=new Hr("@firebase/database"),vf=(function(){let n=1;return function(){return n++}})(),rl=function(n){const e=rh(n),t=new th;t.update(e);const i=t.digest();return Wr.encodeByteArray(i)},oi=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=oi.apply(null,i):typeof i=="object"?e+=G(i):e+=i,e+=" "}return e};let On=null,Ta=!0;const wf=function(n,e){p(!0,"Can't turn on custom loggers persistently."),Gt.logLevel=A.VERBOSE,On=Gt.log.bind(Gt)},Q=function(...n){if(Ta===!0&&(Ta=!1,On===null&&yf.get("logging_enabled")===!0&&wf()),On){const e=oi.apply(null,n);On(e)}},ai=function(n){return function(...e){Q(n,...e)}},dr=function(...n){const e="FIREBASE INTERNAL ERROR: "+oi(...n);Gt.error(e)},qe=function(...n){const e=`FIREBASE FATAL ERROR: ${oi(...n)}`;throw Gt.error(e),new Error(e)},re=function(...n){const e="FIREBASE WARNING: "+oi(...n);Gt.warn(e)},Cf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&re("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},zr=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Ef=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},nn="[MIN_NAME]",Mt="[MAX_NAME]",Bt=function(n,e){if(n===e)return 0;if(n===nn||e===Mt)return-1;if(e===nn||n===Mt)return 1;{const t=ka(n),i=ka(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},bf=function(n,e){return n===e?0:n<e?-1:1},In=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+G(e))},qr=function(n){if(typeof n!="object"||n===null)return G(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=G(e[i]),t+=":",t+=qr(n[e[i]]);return t+="}",t},ol=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function ee(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const al=function(n){p(!zr(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},If=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Sf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Tf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const kf=new RegExp("^-?(0*)\\d{1,10}$"),Rf=-2147483648,Af=2147483647,ka=function(n){if(kf.test(n)){const e=Number(n);if(e>=Rf&&e<=Af)return e}return null},mn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw re("Exception was thrown by user callback.",t),e},Math.floor(0))}},Nf=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Dn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class Pf{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,we(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){re(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Q("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',re(e)}}class Si{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Si.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr="5",cl="v",ll="s",ul="r",dl="f",hl=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,fl="ls",pl="p",hr="ac",gl="websocket",ml="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=kt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&kt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Of(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function yl(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===gl)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===ml)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Of(n)&&(t.ns=n.namespace);const s=[];return ee(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(){this.counters_={}}incrementCounter(e,t=1){Ue(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Dd(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs={},$s={};function Kr(n){const e=n.toString();return Vs[e]||(Vs[e]=new Df),Vs[e]}function Mf(n,e){const t=n.toString();return $s[t]||($s[t]=e()),$s[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xf{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&mn(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra="start",Ff="close",Uf="pLPCommand",Bf="pRTLPCB",vl="id",wl="pw",Cl="ser",Wf="cb",Vf="seg",$f="ts",Hf="d",jf="dframe",El=1870,bl=30,Gf=El-bl,zf=25e3,qf=3e4;class $t{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ai(e),this.stats_=Kr(t),this.urlFn=c=>(this.appCheckToken&&(c[hr]=this.appCheckToken),yl(t,ml,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new xf(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(qf)),Ef(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Jr((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ra)this.id=a,this.password=c;else if(o===Ff)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ra]="t",i[Cl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Wf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[cl]=Yr,this.transportSessionId&&(i[ll]=this.transportSessionId),this.lastSessionId&&(i[fl]=this.lastSessionId),this.applicationId&&(i[pl]=this.applicationId),this.appCheckToken&&(i[hr]=this.appCheckToken),typeof location<"u"&&location.hostname&&hl.test(location.hostname)&&(i[ul]=dl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){$t.forceAllow_=!0}static forceDisallow(){$t.forceDisallow_=!0}static isAvailable(){return $t.forceAllow_?!0:!$t.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!If()&&!Sf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=G(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=$c(t),s=ol(i,Gf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[jf]="t",i[vl]=e,i[wl]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=G(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Jr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=vf(),window[Uf+this.uniqueCallbackIdentifier]=e,window[Bf+this.uniqueCallbackIdentifier]=t,this.myIFrame=Jr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Q("frame writing exception"),a.stack&&Q(a.stack),Q(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Q("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[vl]=this.myID,e[wl]=this.myPW,e[Cl]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+bl+i.length<=El;){const o=this.pendingSegs.shift();i=i+"&"+Vf+s+"="+o.seg+"&"+$f+s+"="+o.ts+"&"+Hf+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(zf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Q("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yf=16384,Kf=45e3;let Wi=null;typeof MozWebSocket<"u"?Wi=MozWebSocket:typeof WebSocket<"u"&&(Wi=WebSocket);class Ce{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ai(this.connId),this.stats_=Kr(t),this.connURL=Ce.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[cl]=Yr,typeof location<"u"&&location.hostname&&hl.test(location.hostname)&&(o[ul]=dl),t&&(o[ll]=t),i&&(o[fl]=i),s&&(o[hr]=s),r&&(o[pl]=r),yl(e,gl,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,kt.set("previous_websocket_failure",!0);try{let i;qd(),this.mySock=new Wi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Ce.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Wi!==null&&!Ce.forceDisallow_}static previouslyFailed(){return kt.isInMemoryStorage||kt.get("previous_websocket_failure")===!0}markConnectionHealthy(){kt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=$n(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=G(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=ol(t,Yf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Kf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ce.responsesRequiredToBeHealthy=2;Ce.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{static get ALL_TRANSPORTS(){return[$t,Ce]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Ce&&Ce.isAvailable();let i=t&&!Ce.previouslyFailed();if(e.webSocketOnly&&(t||re("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Ce];else{const s=this.transports_=[];for(const r of jn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);jn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}jn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf=6e4,Qf=5e3,Xf=10*1024,Zf=100*1024,Hs="t",Aa="d",ep="s",Na="r",tp="e",Pa="o",La="a",Oa="n",Da="p",np="h";class ip{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ai("c:"+this.id+":"),this.transportManager_=new jn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Dn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Zf?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Xf?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Hs in e){const t=e[Hs];t===La?this.upgradeIfSecondaryHealthy_():t===Na?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Pa&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=In("t",e),i=In("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Da,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:La,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Oa,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=In("t",e),i=In("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=In(Hs,e);if(Aa in e){const i=e[Aa];if(t===np){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Oa){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===ep?this.onConnectionShutdown_(i):t===Na?this.onReset_(i):t===tp?dr("Server Error: "+i):t===Pa?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):dr("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Yr!==i&&re("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Dn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Jf))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Dn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Qf))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Da,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(kt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi extends Sl{static getInstance(){return new Vi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!$r()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=32,xa=768;class N{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function k(){return new N("")}function I(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function gt(n){return n.pieces_.length-n.pieceNum_}function M(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new N(n.pieces_,e)}function Qr(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function sp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Gn(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Tl(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new N(e,0)}function $(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof N)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new N(t,0)}function T(n){return n.pieceNum_>=n.pieces_.length}function se(n,e){const t=I(n),i=I(e);if(t===null)return e;if(t===i)return se(M(n),M(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function rp(n,e){const t=Gn(n,0),i=Gn(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Bt(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Xr(n,e){if(gt(n)!==gt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function me(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(gt(n)>gt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class op{constructor(e,t){this.errorPrefix_=t,this.parts_=Gn(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=fs(this.parts_[i]);kl(this)}}function ap(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=fs(e),kl(n)}function cp(n){const e=n.parts_.pop();n.byteLength_-=fs(e),n.parts_.length>0&&(n.byteLength_-=1)}function kl(n){if(n.byteLength_>xa)throw new Error(n.errorPrefix_+"has a key path longer than "+xa+" bytes ("+n.byteLength_+").");if(n.parts_.length>Ma)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Ma+") or object contains a cycle "+It(n))}function It(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr extends Sl{static getInstance(){return new Zr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=1e3,lp=300*1e3,Fa=30*1e3,up=1.3,dp=3e4,hp="server_kill",Ua=3;class Ge extends Il{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Ge.nextPersistentConnectionId_++,this.log_=ai("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Sn,this.maxReconnectDelay_=lp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Zr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Vi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(G(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new si,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Ge.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Ue(e,"w")){const i=en(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();re(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||eh(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Fa)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Zd(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+G(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):dr("Unrecognized action received from server: "+G(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Sn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Sn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>dp&&(this.reconnectDelay_=Sn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*up)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Ge.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Q("getToken() completed but was canceled"):(Q("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new ip(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{re(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(hp)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&re(d),c())}}}interrupt(e){Q("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Q("Resuming connection for reason: "+e),delete this.interruptReasons_[e],rr(this.interruptReasons_)&&(this.reconnectDelay_=Sn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>qr(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new N(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Q("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ua&&(this.reconnectDelay_=Fa,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Q("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ua&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+il.replace(/\./g,"-")]=1,$r()?e["framework.cordova"]=1:Kc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Vi.getInstance().currentlyOnline();return rr(this.interruptReasons_)&&e}}Ge.nextPersistentConnectionId_=0;Ge.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ps{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new S(nn,e),s=new S(nn,t);return this.compare(i,s)!==0}minPost(){return S.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi;class Rl extends ps{static get __EMPTY_NODE(){return vi}static set __EMPTY_NODE(e){vi=e}compare(e,t){return Bt(e.name,t.name)}isDefinedOn(e){throw hn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return S.MIN}maxPost(){return new S(Mt,vi)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new S(e,vi)}toString(){return".key"}}const zt=new Rl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class q{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??q.RED,this.left=s??ce.EMPTY_NODE,this.right=r??ce.EMPTY_NODE}copy(e,t,i,s,r){return new q(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ce.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return ce.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,q.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,q.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}q.RED=!0;q.BLACK=!1;class fp{copy(e,t,i,s,r){return this}insert(e,t,i){return new q(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ce{constructor(e,t=ce.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new ce(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,q.BLACK,null,null))}remove(e){return new ce(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,q.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new wi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new wi(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new wi(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new wi(this.root_,null,this.comparator_,!0,e)}}ce.EMPTY_NODE=new fp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pp(n,e){return Bt(n.name,e.name)}function eo(n,e){return Bt(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fr;function gp(n){fr=n}const Al=function(n){return typeof n=="number"?"number:"+al(n):"string:"+n},Nl=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ue(e,".sv"),"Priority must be a string or number.")}else p(n===fr||n.isEmpty(),"priority of unexpected type.");p(n===fr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ba;class z{static set __childrenNodeConstructor(e){Ba=e}static get __childrenNodeConstructor(){return Ba}constructor(e,t=z.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Nl(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new z(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:z.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return T(e)?this:I(e)===".priority"?this.priorityNode_:z.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:z.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=I(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||gt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,z.__childrenNodeConstructor.EMPTY_NODE.updateChild(M(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Al(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=al(this.value_):e+=this.value_,this.lazyHash_=rl(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===z.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof z.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=z.VALUE_TYPE_ORDER.indexOf(t),r=z.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}z.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pl,Ll;function mp(n){Pl=n}function _p(n){Ll=n}class yp extends ps{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Bt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return S.MIN}maxPost(){return new S(Mt,new z("[PRIORITY-POST]",Ll))}makePost(e,t){const i=Pl(e);return new S(t,new z("[PRIORITY-POST]",i))}toString(){return".priority"}}const H=new yp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp=Math.log(2);class wp{constructor(e){const t=r=>parseInt(Math.log(r)/vp,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const $i=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=n[c],h=t?t(d):d,new q(h,d.node,q.BLACK,null,null);{const f=parseInt(u/2,10)+c,g=s(c,f),_=s(f+1,l);return d=n[f],h=t?t(d):d,new q(h,d.node,q.BLACK,g,_)}},r=function(c){let l=null,u=null,d=n.length;const h=function(g,_){const m=d-g,P=d;d-=g;const L=s(m+1,P),de=n[m],E=t?t(de):de;f(new q(E,de.node,_,null,L))},f=function(g){l?(l.left=g,l=g):(u=g,l=g)};for(let g=0;g<c.count;++g){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(g+1));_?h(m,q.BLACK):(h(m,q.BLACK),h(m,q.RED))}return u},o=new wp(n.length),a=r(o);return new ce(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let js;const Vt={};class $e{static get Default(){return p(Vt&&H,"ChildrenNode.ts has not been loaded"),js=js||new $e({".priority":Vt},{".priority":H}),js}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=en(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof ce?t:null}hasIndex(e){return Ue(this.indexSet_,e.toString())}addIndex(e,t){p(e!==zt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(S.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=$i(i,e.getCompare()):a=Vt;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new $e(u,l)}addToIndexes(e,t){const i=Ui(this.indexes_,(s,r)=>{const o=en(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Vt)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(S.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),$i(a,o.getCompare())}else return Vt;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new S(e.name,a))),c.insert(e,e.node)}});return new $e(i,this.indexSet_)}removeFromIndexes(e,t){const i=Ui(this.indexes_,s=>{if(s===Vt)return s;{const r=t.get(e.name);return r?s.remove(new S(e.name,r)):s}});return new $e(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tn;class w{static get EMPTY_NODE(){return Tn||(Tn=new w(new ce(eo),null,$e.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Nl(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Tn}updatePriority(e){return this.children_.isEmpty()?this:new w(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Tn:t}}getChild(e){const t=I(e);return t===null?this:this.getImmediateChild(t).getChild(M(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new S(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Tn:this.priorityNode_;return new w(s,o,r)}}updateChild(e,t){const i=I(e);if(i===null)return t;{p(I(e)!==".priority"||gt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(M(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(H,(o,a)=>{t[o]=a.val(e),i++,r&&w.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Al(this.getPriority().val())+":"),this.forEachChild(H,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":rl(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new S(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new S(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new S(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,S.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,S.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ci?-1:0}withIndex(e){if(e===zt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new w(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===zt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(H),s=t.getIterator(H);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===zt?null:this.indexMap_.get(e.toString())}}w.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Cp extends w{constructor(){super(new ce(eo),w.EMPTY_NODE,$e.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return w.EMPTY_NODE}isEmpty(){return!1}}const ci=new Cp;Object.defineProperties(S,{MIN:{value:new S(nn,w.EMPTY_NODE)},MAX:{value:new S(Mt,ci)}});Rl.__EMPTY_NODE=w.EMPTY_NODE;z.__childrenNodeConstructor=w;gp(ci);_p(ci);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=!0;function j(n,e=null){if(n===null)return w.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new z(t,j(e))}if(!(n instanceof Array)&&Ep){const t=[];let i=!1;if(ee(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=j(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new S(o,c)))}}),t.length===0)return w.EMPTY_NODE;const r=$i(t,pp,o=>o.name,eo);if(i){const o=$i(t,H.getCompare());return new w(r,j(e),new $e({".priority":o},{".priority":H}))}else return new w(r,j(e),$e.Default)}else{let t=w.EMPTY_NODE;return ee(n,(i,s)=>{if(Ue(n,i)&&i.substring(0,1)!=="."){const r=j(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(j(e))}}mp(j);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp extends ps{constructor(e){super(),this.indexPath_=e,p(!T(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Bt(e.name,t.name):r}makePost(e,t){const i=j(e),s=w.EMPTY_NODE.updateChild(this.indexPath_,i);return new S(t,s)}maxPost(){const e=w.EMPTY_NODE.updateChild(this.indexPath_,ci);return new S(Mt,e)}toString(){return Gn(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ip extends ps{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Bt(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return S.MIN}maxPost(){return S.MAX}makePost(e,t){const i=j(e);return new S(t,i)}toString(){return".value"}}const Sp=new Ip;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ol(n){return{type:"value",snapshotNode:n}}function sn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function zn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function qn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Tp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(zn(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(sn(t,i)):o.trackChildChange(qn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(H,(s,r)=>{t.hasChild(s)||i.trackChildChange(zn(s,r))}),t.isLeafNode()||t.forEachChild(H,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(qn(s,r,o))}else i.trackChildChange(sn(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?w.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e){this.indexedFilter_=new to(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Yn.getStartPost_(e),this.endPost_=Yn.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new S(t,i))||(i=w.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=w.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(w.EMPTY_NODE);const r=this;return t.forEachChild(H,(o,a)=>{r.matches(new S(o,a))||(s=s.updateImmediateChild(o,w.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Yn(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new S(t,i))||(i=w.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=w.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=w.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(w.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,w.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const c=new S(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(qn(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(zn(t,d));const _=a.updateImmediateChild(t,w.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(sn(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(zn(l.name,l.node)),r.trackChildChange(sn(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,w.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=H}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:nn}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Mt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===H}copy(){const e=new no;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Rp(n){return n.loadsAllData()?new to(n.getIndex()):n.hasLimit()?new kp(n):new Yn(n)}function Wa(n){const e={};if(n.isDefault())return e;let t;if(n.index_===H?t="$priority":n.index_===Sp?t="$value":n.index_===zt?t="$key":(p(n.index_ instanceof bp,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=G(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=G(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+G(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=G(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+G(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Va(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==H&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends Il{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=ai("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Hi.getListenId_(e,i),a={};this.listens_[o]=a;const c=Wa(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),en(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,t){const i=Hi.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Wa(e._queryParams),i=e._path.toString(),s=new si;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+pn(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=$n(a.responseText)}catch{re("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&re("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ap{constructor(){this.rootNode_=w.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(){return{value:null,children:new Map}}function Dl(n,e,t){if(T(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=I(e);n.children.has(i)||n.children.set(i,ji());const s=n.children.get(i);e=M(e),Dl(s,e,t)}}function pr(n,e,t){n.value!==null?t(e,n.value):Np(n,(i,s)=>{const r=new N(e.toString()+"/"+i);pr(s,r,t)})}function Np(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&ee(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=10*1e3,Lp=30*1e3,Op=300*1e3;class Dp{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Pp(e);const i=$a+(Lp-$a)*Math.random();Dn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;ee(e,(s,r)=>{r>0&&Ue(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Dn(this.reportStats_.bind(this),Math.floor(Math.random()*2*Op))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Ie||(Ie={}));function io(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function so(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ro(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Ie.ACK_USER_WRITE,this.source=io()}operationForChild(e){if(T(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new N(e));return new Gi(k(),t,this.revert)}}else return p(I(this.path)===e,"operationForChild called for unrelated child."),new Gi(M(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,t){this.source=e,this.path=t,this.type=Ie.LISTEN_COMPLETE}operationForChild(e){return T(this.path)?new Kn(this.source,k()):new Kn(this.source,M(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Ie.OVERWRITE}operationForChild(e){return T(this.path)?new xt(this.source,k(),this.snap.getImmediateChild(e)):new xt(this.source,M(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Ie.MERGE}operationForChild(e){if(T(this.path)){const t=this.children.subtree(new N(e));return t.isEmpty()?null:t.value?new xt(this.source,k(),t.value):new rn(this.source,k(),t)}else return p(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new rn(this.source,M(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(T(e))return this.isFullyInitialized()&&!this.filtered_;const t=I(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function xp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Tp(o.childName,o.snapshotNode))}),kn(n,s,"child_removed",e,i,t),kn(n,s,"child_added",e,i,t),kn(n,s,"child_moved",r,i,t),kn(n,s,"child_changed",e,i,t),kn(n,s,"value",e,i,t),s}function kn(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>Up(n,a,c)),o.forEach(a=>{const c=Fp(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function Fp(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Up(n,e,t){if(e.childName==null||t.childName==null)throw hn("Should only compare child_ events.");const i=new S(e.childName,e.snapshotNode),s=new S(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(n,e){return{eventCache:n,serverCache:e}}function Mn(n,e,t,i){return gs(new mt(e,t,i),n.serverCache)}function Ml(n,e,t,i){return gs(n.eventCache,new mt(e,t,i))}function zi(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ft(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gs;const Bp=()=>(Gs||(Gs=new ce(bf)),Gs);class O{static fromObject(e){let t=new O(null);return ee(e,(i,s)=>{t=t.set(new N(i),s)}),t}constructor(e,t=Bp()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:k(),value:this.value};if(T(e))return null;{const i=I(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(M(e),t);return r!=null?{path:$(new N(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(T(e))return this;{const t=I(e),i=this.children.get(t);return i!==null?i.subtree(M(e)):new O(null)}}set(e,t){if(T(e))return new O(t,this.children);{const i=I(e),r=(this.children.get(i)||new O(null)).set(M(e),t),o=this.children.insert(i,r);return new O(this.value,o)}}remove(e){if(T(e))return this.children.isEmpty()?new O(null):new O(null,this.children);{const t=I(e),i=this.children.get(t);if(i){const s=i.remove(M(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new O(null):new O(this.value,r)}else return this}}get(e){if(T(e))return this.value;{const t=I(e),i=this.children.get(t);return i?i.get(M(e)):null}}setTree(e,t){if(T(e))return t;{const i=I(e),r=(this.children.get(i)||new O(null)).setTree(M(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new O(this.value,o)}}fold(e){return this.fold_(k(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_($(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,k(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(T(e))return null;{const r=I(e),o=this.children.get(r);return o?o.findOnPath_(M(e),$(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,k(),t)}foreachOnPath_(e,t,i){if(T(e))return this;{this.value&&i(t,this.value);const s=I(e),r=this.children.get(s);return r?r.foreachOnPath_(M(e),$(t,s),i):new O(null)}}foreach(e){this.foreach_(k(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_($(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(e){this.writeTree_=e}static empty(){return new ke(new O(null))}}function xn(n,e,t){if(T(e))return new ke(new O(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=se(s,e);return r=r.updateChild(o,t),new ke(n.writeTree_.set(s,r))}else{const s=new O(t),r=n.writeTree_.setTree(e,s);return new ke(r)}}}function gr(n,e,t){let i=n;return ee(t,(s,r)=>{i=xn(i,$(e,s),r)}),i}function Ha(n,e){if(T(e))return ke.empty();{const t=n.writeTree_.setTree(e,new O(null));return new ke(t)}}function mr(n,e){return Wt(n,e)!=null}function Wt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(se(t.path,e)):null}function ja(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(H,(i,s)=>{e.push(new S(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new S(i,s.value))}),e}function ht(n,e){if(T(e))return n;{const t=Wt(n,e);return t!=null?new ke(new O(t)):new ke(n.writeTree_.subtree(e))}}function _r(n){return n.writeTree_.isEmpty()}function on(n,e){return xl(k(),n.writeTree_,e)}function xl(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=xl($(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild($(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(n,e){return Wl(e,n)}function Wp(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=xn(n.visibleWrites,e,t)),n.lastWriteId=i}function Vp(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=gr(n.visibleWrites,e,t),n.lastWriteId=i}function $p(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Hp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&jp(a,i.path)?s=!1:me(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Gp(n),!0;if(i.snap)n.visibleWrites=Ha(n.visibleWrites,i.path);else{const a=i.children;ee(a,c=>{n.visibleWrites=Ha(n.visibleWrites,$(i.path,c))})}return!0}else return!1}function jp(n,e){if(n.snap)return me(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&me($(n.path,t),e))return!0;return!1}function Gp(n){n.visibleWrites=Fl(n.allWrites,zp,k()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function zp(n){return n.visible}function Fl(n,e,t){let i=ke.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)me(t,o)?(a=se(t,o),i=xn(i,a,r.snap)):me(o,t)&&(a=se(o,t),i=xn(i,k(),r.snap.getChild(a)));else if(r.children){if(me(t,o))a=se(t,o),i=gr(i,a,r.children);else if(me(o,t))if(a=se(o,t),T(a))i=gr(i,k(),r.children);else{const c=en(r.children,I(a));if(c){const l=c.getChild(M(a));i=xn(i,k(),l)}}}else throw hn("WriteRecord should have .snap or .children")}}return i}function Ul(n,e,t,i,s){if(!i&&!s){const r=Wt(n.visibleWrites,e);if(r!=null)return r;{const o=ht(n.visibleWrites,e);if(_r(o))return t;if(t==null&&!mr(o,k()))return null;{const a=t||w.EMPTY_NODE;return on(o,a)}}}else{const r=ht(n.visibleWrites,e);if(!s&&_r(r))return t;if(!s&&t==null&&!mr(r,k()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(me(l.path,e)||me(e,l.path))},a=Fl(n.allWrites,o,e),c=t||w.EMPTY_NODE;return on(a,c)}}}function qp(n,e,t){let i=w.EMPTY_NODE;const s=Wt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(H,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=ht(n.visibleWrites,e);return t.forEachChild(H,(o,a)=>{const c=on(ht(r,new N(o)),a);i=i.updateImmediateChild(o,c)}),ja(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ht(n.visibleWrites,e);return ja(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Yp(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=$(e,t);if(mr(n.visibleWrites,r))return null;{const o=ht(n.visibleWrites,r);return _r(o)?s.getChild(t):on(o,s.getChild(t))}}function Kp(n,e,t,i){const s=$(e,t),r=Wt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=ht(n.visibleWrites,s);return on(o,i.getNode().getImmediateChild(t))}else return null}function Jp(n,e){return Wt(n.visibleWrites,e)}function Qp(n,e,t,i,s,r,o){let a;const c=ht(n.visibleWrites,e),l=Wt(c,k());if(l!=null)a=l;else if(t!=null)a=on(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function Xp(){return{visibleWrites:ke.empty(),allWrites:[],lastWriteId:-1}}function qi(n,e,t,i){return Ul(n.writeTree,n.treePath,e,t,i)}function oo(n,e){return qp(n.writeTree,n.treePath,e)}function Ga(n,e,t,i){return Yp(n.writeTree,n.treePath,e,t,i)}function Yi(n,e){return Jp(n.writeTree,$(n.treePath,e))}function Zp(n,e,t,i,s,r){return Qp(n.writeTree,n.treePath,e,t,i,s,r)}function ao(n,e,t){return Kp(n.writeTree,n.treePath,e,t)}function Bl(n,e){return Wl($(n.treePath,e),n.writeTree)}function Wl(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,qn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,zn(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,sn(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,qn(i,e.snapshotNode,s.oldSnap));else throw hn("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Vl=new tg;class co{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new mt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ao(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ft(this.viewCache_),r=Zp(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(n){return{filter:n}}function ig(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function sg(n,e,t,i,s){const r=new eg;let o,a;if(t.type===Ie.OVERWRITE){const l=t;l.source.fromUser?o=yr(n,e,l.path,l.snap,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!T(l.path),o=Ki(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===Ie.MERGE){const l=t;l.source.fromUser?o=og(n,e,l.path,l.children,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=vr(n,e,l.path,l.children,i,s,a,r))}else if(t.type===Ie.ACK_USER_WRITE){const l=t;l.revert?o=lg(n,e,l.path,i,s,r):o=ag(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===Ie.LISTEN_COMPLETE)o=cg(n,e,t.path,i,r);else throw hn("Unknown operation type: "+t.type);const c=r.getChanges();return rg(e,o,c),{viewCache:o,changes:c}}function rg(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=zi(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Ol(zi(e)))}}function $l(n,e,t,i,s,r){const o=e.eventCache;if(Yi(i,t)!=null)return e;{let a,c;if(T(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Ft(e),u=l instanceof w?l:w.EMPTY_NODE,d=oo(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=qi(i,Ft(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=I(t);if(l===".priority"){p(gt(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Ga(i,t,u,c);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=M(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Ga(i,t,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=ao(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return Mn(e,a,o.isFullyInitialized()||T(t),n.filter.filtersNodes())}}function Ki(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(T(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(t);if(!c.isCompleteForPath(t)&&gt(t)>1)return e;const g=M(t),m=c.getNode().getImmediateChild(f).updateChild(g,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,g,Vl,null)}const d=Ml(e,l,c.isFullyInitialized()||T(t),u.filtersNodes()),h=new co(s,d,r);return $l(n,d,t,s,h,a)}function yr(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new co(s,e,r);if(T(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Mn(e,l,!0,n.filter.filtersNodes());else{const d=I(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=Mn(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=M(t),f=a.getNode().getImmediateChild(d);let g;if(T(h))g=i;else{const _=u.getCompleteChild(d);_!=null?Qr(h)===".priority"&&_.getChild(Tl(h)).isEmpty()?g=_:g=_.updateChild(h,i):g=w.EMPTY_NODE}if(f.equals(g))c=e;else{const _=n.filter.updateChild(a.getNode(),d,g,h,u,o);c=Mn(e,_,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function za(n,e){return n.eventCache.isCompleteForChild(e)}function og(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=$(t,c);za(e,I(u))&&(a=yr(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=$(t,c);za(e,I(u))||(a=yr(n,a,u,l,s,r,o))}),a}function qa(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function vr(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;T(t)?l=i:l=new O(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),g=qa(n,f,h);c=Ki(n,c,new N(d),g,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const g=e.serverCache.getNode().getImmediateChild(d),_=qa(n,g,h);c=Ki(n,c,new N(d),_,s,r,o,a)}}),c}function ag(n,e,t,i,s,r,o){if(Yi(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(T(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Ki(n,e,t,c.getNode().getChild(t),s,r,a,o);if(T(t)){let l=new O(null);return c.getNode().forEachChild(zt,(u,d)=>{l=l.set(new N(u),d)}),vr(n,e,t,l,s,r,a,o)}else return e}else{let l=new O(null);return i.foreach((u,d)=>{const h=$(t,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),vr(n,e,t,l,s,r,a,o)}}function cg(n,e,t,i,s){const r=e.serverCache,o=Ml(e,r.getNode(),r.isFullyInitialized()||T(t),r.isFiltered());return $l(n,o,t,i,Vl,s)}function lg(n,e,t,i,s,r){let o;if(Yi(i,t)!=null)return e;{const a=new co(i,e,s),c=e.eventCache.getNode();let l;if(T(t)||I(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=qi(i,Ft(e));else{const d=e.serverCache.getNode();p(d instanceof w,"serverChildren would be complete if leaf node"),u=oo(i,d)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=I(t);let d=ao(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=n.filter.updateChild(c,u,d,M(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,w.EMPTY_NODE,M(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=qi(i,Ft(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Yi(i,k())!=null,Mn(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new to(i.getIndex()),r=Rp(i);this.processor_=ng(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(w.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(w.EMPTY_NODE,a.getNode(),null),u=new mt(c,o.isFullyInitialized(),s.filtersNodes()),d=new mt(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=gs(d,u),this.eventGenerator_=new Mp(this.query_)}get query(){return this.query_}}function dg(n){return n.viewCache_.serverCache.getNode()}function hg(n){return zi(n.viewCache_)}function fg(n,e){const t=Ft(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!T(e)&&!t.getImmediateChild(I(e)).isEmpty())?t.getChild(e):null}function Ya(n){return n.eventRegistrations_.length===0}function pg(n,e){n.eventRegistrations_.push(e)}function Ka(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Ja(n,e,t,i){e.type===Ie.MERGE&&e.source.queryId!==null&&(p(Ft(n.viewCache_),"We should always have a full cache before handling merges"),p(zi(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=sg(n.processor_,s,e,t,i);return ig(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Hl(n,r.changes,r.viewCache.eventCache.getNode(),null)}function gg(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(H,(r,o)=>{i.push(sn(r,o))}),t.isFullyInitialized()&&i.push(Ol(t.getNode())),Hl(n,i,t.getNode(),e)}function Hl(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return xp(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ji;class jl{constructor(){this.views=new Map}}function mg(n){p(!Ji,"__referenceConstructor has already been defined"),Ji=n}function _g(){return p(Ji,"Reference.ts has not been loaded"),Ji}function yg(n){return n.views.size===0}function lo(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Ja(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Ja(o,e,t,i));return r}}function Gl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=qi(t,s?i:null),c=!1;a?c=!0:i instanceof w?(a=oo(t,i),c=!1):(a=w.EMPTY_NODE,c=!1);const l=gs(new mt(a,c,!1),new mt(i,s,!1));return new ug(e,l)}return o}function vg(n,e,t,i,s,r){const o=Gl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),pg(o,t),gg(o,t)}function wg(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=_t(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(Ka(l,t,i)),Ya(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(Ka(c,t,i)),Ya(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!_t(n)&&r.push(new(_g())(e._repo,e._path)),{removed:r,events:o}}function zl(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ft(n,e){let t=null;for(const i of n.views.values())t=t||fg(i,e);return t}function ql(n,e){if(e._queryParams.loadsAllData())return _s(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Yl(n,e){return ql(n,e)!=null}function _t(n){return _s(n)!=null}function _s(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qi;function Cg(n){p(!Qi,"__referenceConstructor has already been defined"),Qi=n}function Eg(){return p(Qi,"Reference.ts has not been loaded"),Qi}let bg=1;class Qa{constructor(e){this.listenProvider_=e,this.syncPointTree_=new O(null),this.pendingWriteTree_=Xp(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Kl(n,e,t,i,s){return Wp(n.pendingWriteTree_,e,t,i,s),s?_n(n,new xt(io(),e,t)):[]}function Ig(n,e,t,i){Vp(n.pendingWriteTree_,e,t,i);const s=O.fromObject(t);return _n(n,new rn(io(),e,s))}function st(n,e,t=!1){const i=$p(n.pendingWriteTree_,e);if(Hp(n.pendingWriteTree_,e)){let r=new O(null);return i.snap!=null?r=r.set(k(),!0):ee(i.children,o=>{r=r.set(new N(o),!0)}),_n(n,new Gi(i.path,r,t))}else return[]}function li(n,e,t){return _n(n,new xt(so(),e,t))}function Sg(n,e,t){const i=O.fromObject(t);return _n(n,new rn(so(),e,i))}function Tg(n,e){return _n(n,new Kn(so(),e))}function kg(n,e,t){const i=ho(n,t);if(i){const s=fo(i),r=s.path,o=s.queryId,a=se(r,e),c=new Kn(ro(o),a);return po(n,r,c)}else return[]}function Xi(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Yl(o,e))){const c=wg(o,e,t,i);yg(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,f)=>_t(f));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=Ng(h);for(let g=0;g<f.length;++g){const _=f[g],m=_.query,P=Zl(n,_);n.listenProvider_.startListening(Fn(m),Jn(n,m),P.hashFn,P.onComplete)}}}!d&&l.length>0&&!i&&(u?n.listenProvider_.stopListening(Fn(e),null):l.forEach(h=>{const f=n.queryToTagMap.get(ys(h));n.listenProvider_.stopListening(Fn(h),f)}))}Pg(n,l)}return a}function Jl(n,e,t,i){const s=ho(n,i);if(s!=null){const r=fo(s),o=r.path,a=r.queryId,c=se(o,e),l=new xt(ro(a),c,t);return po(n,o,l)}else return[]}function Rg(n,e,t,i){const s=ho(n,i);if(s){const r=fo(s),o=r.path,a=r.queryId,c=se(o,e),l=O.fromObject(t),u=new rn(ro(a),c,l);return po(n,o,u)}else return[]}function wr(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,f)=>{const g=se(h,s);r=r||ft(f,g),o=o||_t(f)});let a=n.syncPointTree_.get(s);a?(o=o||_t(a),r=r||ft(a,k())):(a=new jl,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=w.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,g)=>{const _=ft(g,k());_&&(r=r.updateImmediateChild(f,_))}));const l=Yl(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=ys(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=Lg();n.queryToTagMap.set(h,f),n.tagToQueryMap.set(f,h)}const u=ms(n.pendingWriteTree_,s);let d=vg(a,e,t,u,r,c);if(!l&&!o&&!i){const h=ql(a,e);d=d.concat(Og(n,e,h))}return d}function uo(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=se(o,e),l=ft(a,c);if(l)return l});return Ul(s,e,r,t,!0)}function Ag(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const d=se(l,t);i=i||ft(u,d)});let s=n.syncPointTree_.get(t);s?i=i||ft(s,k()):(s=new jl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new mt(i,!0,!1):null,a=ms(n.pendingWriteTree_,e._path),c=Gl(s,e,a,r?o.getNode():w.EMPTY_NODE,r);return hg(c)}function _n(n,e){return Ql(e,n.syncPointTree_,null,ms(n.pendingWriteTree_,k()))}function Ql(n,e,t,i){if(T(n.path))return Xl(n,e,t,i);{const s=e.get(k());t==null&&s!=null&&(t=ft(s,k()));let r=[];const o=I(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=Bl(i,o);r=r.concat(Ql(a,c,l,u))}return s&&(r=r.concat(lo(s,n,i,t))),r}}function Xl(n,e,t,i){const s=e.get(k());t==null&&s!=null&&(t=ft(s,k()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=Bl(i,o),u=n.operationForChild(o);u&&(r=r.concat(Xl(u,a,c,l)))}),s&&(r=r.concat(lo(s,n,i,t))),r}function Zl(n,e){const t=e.query,i=Jn(n,t);return{hashFn:()=>(dg(e)||w.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?kg(n,t._path,i):Tg(n,t._path);{const r=Tf(s,t);return Xi(n,t,null,r)}}}}function Jn(n,e){const t=ys(e);return n.queryToTagMap.get(t)}function ys(n){return n._path.toString()+"$"+n._queryIdentifier}function ho(n,e){return n.tagToQueryMap.get(e)}function fo(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new N(n.substr(0,e))}}function po(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=ms(n.pendingWriteTree_,e);return lo(i,t,s,null)}function Ng(n){return n.fold((e,t,i)=>{if(t&&_t(t))return[_s(t)];{let s=[];return t&&(s=zl(t)),ee(i,(r,o)=>{s=s.concat(o)}),s}})}function Fn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Eg())(n._repo,n._path):n}function Pg(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=ys(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Lg(){return bg++}function Og(n,e,t){const i=e._path,s=Jn(n,e),r=Zl(n,t),o=n.listenProvider_.startListening(Fn(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!_t(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!T(l)&&u&&_t(u))return[_s(u).query];{let h=[];return u&&(h=h.concat(zl(u).map(f=>f.query))),ee(d,(f,g)=>{h=h.concat(g)}),h}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening(Fn(u),Jn(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new go(t)}node(){return this.node_}}class mo{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=$(this.path_,e);return new mo(this.syncTree_,t)}node(){return uo(this.syncTree_,this.path_)}}const Dg=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Xa=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Mg(n[".sv"],e,t);if(typeof n[".sv"]=="object")return xg(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Mg=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},xg=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},eu=function(n,e,t,i){return _o(e,new mo(t,n),i)},tu=function(n,e,t){return _o(n,new go(e),t)};function _o(n,e,t){const i=n.getPriority().val(),s=Xa(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Xa(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new z(a,j(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new z(s))),o.forEachChild(H,(a,c)=>{const l=_o(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function vo(n,e){let t=e instanceof N?e:new N(e),i=n,s=I(t);for(;s!==null;){const r=en(i.node.children,s)||{children:{},childCount:0};i=new yo(s,i,r),t=M(t),s=I(t)}return i}function yn(n){return n.node.value}function nu(n,e){n.node.value=e,Cr(n)}function iu(n){return n.node.childCount>0}function Fg(n){return yn(n)===void 0&&!iu(n)}function vs(n,e){ee(n.node.children,(t,i)=>{e(new yo(t,n,i))})}function su(n,e,t,i){t&&e(n),vs(n,s=>{su(s,e,!0)})}function Ug(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ui(n){return new N(n.parent===null?n.name:ui(n.parent)+"/"+n.name)}function Cr(n){n.parent!==null&&Bg(n.parent,n.name,n)}function Bg(n,e,t){const i=Fg(t),s=Ue(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Cr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Cr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wg=/[\[\].#$\/\u0000-\u001F\u007F]/,Vg=/[\[\].#$\u0000-\u001F\u007F]/,zs=10*1024*1024,wo=function(n){return typeof n=="string"&&n.length!==0&&!Wg.test(n)},ru=function(n){return typeof n=="string"&&n.length!==0&&!Vg.test(n)},$g=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ru(n)},Hg=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!zr(n)||n&&typeof n=="object"&&Ue(n,".sv")},ou=function(n,e,t,i){i&&e===void 0||ws(hs(n,"value"),e,t)},ws=function(n,e,t){const i=t instanceof N?new op(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+It(i));if(typeof e=="function")throw new Error(n+"contains a function "+It(i)+" with contents = "+e.toString());if(zr(e))throw new Error(n+"contains "+e.toString()+" "+It(i));if(typeof e=="string"&&e.length>zs/3&&fs(e)>zs)throw new Error(n+"contains a string greater than "+zs+" utf8 bytes "+It(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ee(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!wo(o)))throw new Error(n+" contains an invalid key ("+o+") "+It(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ap(i,o),ws(n,a,i),cp(i)}),s&&r)throw new Error(n+' contains ".value" child '+It(i)+" in addition to actual children.")}},jg=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Gn(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!wo(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(rp);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&me(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Gg=function(n,e,t,i){const s=hs(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ee(e,(o,a)=>{const c=new N(o);if(ws(s,a,$(t,c)),Qr(c)===".priority"&&!Hg(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),jg(s,r)},au=function(n,e,t,i){if(!ru(t))throw new Error(hs(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},zg=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),au(n,e,t)},Co=function(n,e){if(I(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},qg=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!wo(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!$g(t))throw new Error(hs(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yg{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Cs(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Xr(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function cu(n,e,t){Cs(n,t),lu(n,i=>Xr(i,e))}function ye(n,e,t){Cs(n,t),lu(n,i=>me(i,e)||me(e,i))}function lu(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Kg(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Kg(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();On&&Q("event: "+t.toString()),mn(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg="repo_interrupt",Qg=25;class Xg{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Yg,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=ji(),this.transactionQueueTree_=new yo,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Zg(n,e,t){if(n.stats_=Kr(n.repoInfo_),n.forceRestClient_||Nf())n.server_=new Hi(n.repoInfo_,(i,s,r,o)=>{Za(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ec(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{G(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Ge(n.repoInfo_,e,(i,s,r,o)=>{Za(n,i,s,r,o)},i=>{ec(n,i)},i=>{em(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Mf(n.repoInfo_,()=>new Dp(n.stats_,n.server_)),n.infoData_=new Ap,n.infoSyncTree_=new Qa({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=li(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Eo(n,"connected",!1),n.serverSyncTree_=new Qa({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);ye(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function uu(n){const t=n.infoData_.getNode(new N(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Es(n){return Dg({timestamp:uu(n)})}function Za(n,e,t,i,s){n.dataUpdateCount++;const r=new N(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Ui(t,l=>j(l));o=Rg(n.serverSyncTree_,r,c,s)}else{const c=j(t);o=Jl(n.serverSyncTree_,r,c,s)}else if(i){const c=Ui(t,l=>j(l));o=Sg(n.serverSyncTree_,r,c)}else{const c=j(t);o=li(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=an(n,r)),ye(n.eventQueue_,a,o)}function ec(n,e){Eo(n,"connected",e),e===!1&&sm(n)}function em(n,e){ee(e,(t,i)=>{Eo(n,t,i)})}function Eo(n,e,t){const i=new N("/.info/"+e),s=j(t);n.infoData_.updateSnapshot(i,s);const r=li(n.infoSyncTree_,i,s);ye(n.eventQueue_,i,r)}function bo(n){return n.nextWriteId_++}function tm(n,e,t){const i=Ag(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=j(s).withIndex(e._queryParams.getIndex());wr(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=li(n.serverSyncTree_,e._path,r);else{const a=Jn(n.serverSyncTree_,e);o=Jl(n.serverSyncTree_,e._path,r,a)}return ye(n.eventQueue_,e._path,o),Xi(n.serverSyncTree_,e,t,null,!0),r},s=>(di(n,"get for query "+G(e)+" failed: "+s),Promise.reject(new Error(s))))}function nm(n,e,t,i,s){di(n,"set",{path:e.toString(),value:t,priority:i});const r=Es(n),o=j(t,i),a=uo(n.serverSyncTree_,e),c=tu(o,a,r),l=bo(n),u=Kl(n.serverSyncTree_,e,c,l,!0);Cs(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,f)=>{const g=h==="ok";g||re("set at "+e+" failed: "+h);const _=st(n.serverSyncTree_,l,!g);ye(n.eventQueue_,e,_),Er(n,s,h,f)});const d=So(n,e);an(n,d),ye(n.eventQueue_,d,[])}function im(n,e,t,i){di(n,"update",{path:e.toString(),value:t});let s=!0;const r=Es(n),o={};if(ee(t,(a,c)=>{s=!1,o[a]=eu($(e,a),j(c),n.serverSyncTree_,r)}),s)Q("update() called with empty data.  Don't do anything."),Er(n,i,"ok",void 0);else{const a=bo(n),c=Ig(n.serverSyncTree_,e,o,a);Cs(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,u)=>{const d=l==="ok";d||re("update at "+e+" failed: "+l);const h=st(n.serverSyncTree_,a,!d),f=h.length>0?an(n,e):e;ye(n.eventQueue_,f,h),Er(n,i,l,u)}),ee(t,l=>{const u=So(n,$(e,l));an(n,u)}),ye(n.eventQueue_,e,[])}}function sm(n){di(n,"onDisconnectEvents");const e=Es(n),t=ji();pr(n.onDisconnect_,k(),(s,r)=>{const o=eu(s,r,n.serverSyncTree_,e);Dl(t,s,o)});let i=[];pr(t,k(),(s,r)=>{i=i.concat(li(n.serverSyncTree_,s,r));const o=So(n,s);an(n,o)}),n.onDisconnect_=ji(),ye(n.eventQueue_,k(),i)}function rm(n,e,t){let i;I(e._path)===".info"?i=wr(n.infoSyncTree_,e,t):i=wr(n.serverSyncTree_,e,t),cu(n.eventQueue_,e._path,i)}function du(n,e,t){let i;I(e._path)===".info"?i=Xi(n.infoSyncTree_,e,t):i=Xi(n.serverSyncTree_,e,t),cu(n.eventQueue_,e._path,i)}function om(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Jg)}function di(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Q(t,...e)}function Er(n,e,t,i){e&&mn(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function hu(n,e,t){return uo(n.serverSyncTree_,e,t)||w.EMPTY_NODE}function Io(n,e=n.transactionQueueTree_){if(e||bs(n,e),yn(e)){const t=pu(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&am(n,ui(e),t)}else iu(e)&&vs(e,t=>{Io(n,t)})}function am(n,e,t){const i=t.map(l=>l.currentWriteId),s=hu(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=se(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{di(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(st(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();bs(n,vo(n.transactionQueueTree_,e)),Io(n,n.transactionQueueTree_),ye(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)mn(d[h])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{re("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}an(n,e)}},o)}function an(n,e){const t=fu(n,e),i=ui(t),s=pu(n,t);return cm(n,s,i),i}function cm(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=se(t,c.path);let u=!1,d;if(p(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(st(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Qg)u=!0,d="maxretry",s=s.concat(st(n.serverSyncTree_,c.currentWriteId,!0));else{const h=hu(n,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){ws("transaction failed: Data returned ",f,c.path);let g=j(f);typeof f=="object"&&f!=null&&Ue(f,".priority")||(g=g.updatePriority(h.getPriority()));const m=c.currentWriteId,P=Es(n),L=tu(g,h,P);c.currentOutputSnapshotRaw=g,c.currentOutputSnapshotResolved=L,c.currentWriteId=bo(n),o.splice(o.indexOf(m),1),s=s.concat(Kl(n.serverSyncTree_,c.path,L,c.currentWriteId,c.applyLocally)),s=s.concat(st(n.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(st(n.serverSyncTree_,c.currentWriteId,!0))}ye(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}bs(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)mn(i[a]);Io(n,n.transactionQueueTree_)}function fu(n,e){let t,i=n.transactionQueueTree_;for(t=I(e);t!==null&&yn(i)===void 0;)i=vo(i,t),e=M(e),t=I(e);return i}function pu(n,e){const t=[];return gu(n,e,t),t.sort((i,s)=>i.order-s.order),t}function gu(n,e,t){const i=yn(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);vs(e,s=>{gu(n,s,t)})}function bs(n,e){const t=yn(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,nu(e,t.length>0?t:void 0)}vs(e,i=>{bs(n,i)})}function So(n,e){const t=ui(fu(n,e)),i=vo(n.transactionQueueTree_,e);return Ug(i,s=>{qs(n,s)}),qs(n,i),su(i,s=>{qs(n,s)}),t}function qs(n,e){const t=yn(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(st(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?nu(e,void 0):t.length=r+1,ye(n.eventQueue_,ui(e),s);for(let o=0;o<i.length;o++)mn(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lm(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function um(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):re(`Invalid query segment '${t}' in query '${n}'`)}return e}const tc=function(n,e){const t=dm(n),i=t.namespace;t.domain==="firebase.com"&&qe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&qe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Cf();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new _l(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new N(t.pathString)}},dm=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=lm(n.substring(u,d)));const h=um(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const g=e.indexOf(".");i=e.substring(0,g).toLowerCase(),t=e.substring(g+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",hm=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=nc.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=nc.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+G(this.snapshot.exportVal())}}class _u{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ko{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return T(this._path)?null:Qr(this._path)}get ref(){return new Be(this._repo,this._path)}get _queryIdentifier(){const e=Va(this._queryParams),t=qr(e);return t==="{}"?"default":t}get _queryObject(){return Va(this._queryParams)}isEqual(e){if(e=ue(e),!(e instanceof ko))return!1;const t=this._repo===e._repo,i=Xr(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+sp(this._path)}}class Be extends ko{constructor(e,t){super(e,t,new no,!1)}get parent(){const e=Tl(this._path);return e===null?null:new Be(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class cn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new N(e),i=ln(this.ref,e);return new cn(this._node.getChild(t),i,H)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new cn(s,ln(this.ref,i),H)))}hasChild(e){const t=new N(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function X(n,e){return n=ue(n),n._checkNotDeleted("ref"),e!==void 0?ln(n._root,e):n._root}function ln(n,e){return n=ue(n),I(n._path)===null?zg("child","path",e):au("child","path",e),new Be(n._repo,$(n._path,e))}function ic(n,e){n=ue(n),Co("push",n._path),ou("push",e,n._path,!0);const t=uu(n._repo),i=hm(t),s=ln(n,i),r=ln(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function un(n){return Co("remove",n._path),Ye(n,null)}function Ye(n,e){n=ue(n),Co("set",n._path),ou("set",e,n._path,!1);const t=new si;return nm(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Ti(n,e){Gg("update",e,n._path);const t=new si;return im(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Nt(n){n=ue(n);const e=new To(()=>{}),t=new hi(e);return tm(n._repo,n,t).then(i=>new cn(i,new Be(n._repo,n._path),n._queryParams.getIndex()))}class hi{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new mu("value",this,new cn(e.snapshotNode,new Be(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new _u(this,e,t):null}matches(e){return e instanceof hi?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Is{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new _u(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=ln(new Be(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new mu(e.type,this,new cn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Is?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Ro(n,e,t,i,s){const r=new To(t,void 0),o=e==="value"?new hi(r):new Is(e,r);return rm(n._repo,n,o),()=>du(n._repo,n,o)}function fm(n,e,t,i){return Ro(n,"value",e)}function pm(n,e,t,i){return Ro(n,"child_added",e)}function gm(n,e,t,i){return Ro(n,"child_removed",e)}function Ss(n,e,t){let i=null;const s=t?new To(t):null;e==="value"?i=new hi(s):e&&(i=new Is(e,s)),du(n._repo,n,i)}mg(Be);Cg(Be);/**
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
 */const mm="FIREBASE_DATABASE_EMULATOR_HOST",br={};let _m=!1;function ym(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=fn(r);n.repoInfo_=new _l(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function vm(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||qe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Q("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=tc(r,s),a=o.repoInfo,c;typeof process<"u"&&ba&&(c=ba[mm]),c?(r=`http://${c}?ns=${a.namespace}`,o=tc(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new Lf(n.name,n.options,e);qg("Invalid Firebase Database URL",o),T(o.path)||qe("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Cm(a,n,l,new Pf(n,t));return new Em(u,n)}function wm(n,e){const t=br[e];(!t||t[n.key]!==n)&&qe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),om(n),delete t[n.key]}function Cm(n,e,t,i){let s=br[e.name];s||(s={},br[e.name]=s);let r=s[n.toURLString()];return r&&qe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Xg(n,_m,t,i),s[n.toURLString()]=r,r}class Em{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Zg(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Be(this._repo,k())),this._rootInternal}_delete(){return this._rootInternal!==null&&(wm(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&qe("Cannot call "+e+" on a deleted database.")}}function bm(n=el(),e){const t=Gr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Wd("database");i&&Im(t,...i)}return t}function Im(n,e,t,i={}){n=ue(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Ot(i,r.repoInfo_.emulatorOptions))return;qe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&qe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Si(Si.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Vd(i.mockUserToken,n.app.options.projectId);o=new Si(a)}fn(e)&&(qc(e),Yc("Database",!0)),ym(r,s,i,o)}/**
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
 */function Sm(n){gf(gn),tn(new Dt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return vm(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),dt(Ia,Sa,n),dt(Ia,Sa,"esm2020")}Ge.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ge.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Sm();var Tm="firebase",km="12.4.0";/**
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
 */dt(Tm,km,"app");const Rm={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},yu=Zc(Rm),Z=bm(yu),Se=[];function Tt(n,e,t,i=null,s=null,r=null){e==="value"?fm(n,t):e==="child_added"?pm(n,t):e==="child_removed"?gm(n,t):console.warn(`Unknown listener type: ${e}`),Se.push({ref:n,type:e,callback:t,roomId:i,userId:s,category:r})}function Am(){Se.forEach(({ref:n,type:e,callback:t})=>{try{Ss(n,e,t)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),Se.length=0}function Ts(n){if(!n)return;Se.filter(i=>i.roomId===n).forEach(({ref:i,type:s,callback:r})=>{try{Ss(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${n}`,o)}});const t=Se.filter(i=>i.roomId!==n);Se.length=0,Se.push(...t)}function Nm(n,e){if(!n||!e)return;const t=r=>r.userId===n&&r.roomId===e;Se.filter(t).forEach(({ref:r,type:o,callback:a})=>{try{Ss(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${n} in room ${e}`,c)}});const s=Se.filter(r=>!t(r));Se.length=0,Se.push(...s)}function ki(n,e,t=null){Tt(n,"value",e,t)}const wt=n=>X(Z,`rooms/${n}`),Ci=n=>X(Z,`rooms/${n}/members`),sc=(n,e)=>X(Z,`rooms/${n}/members/${e}`),Pm=n=>X(Z,`rooms/${n}/cancellation`),ks=n=>X(Z,`rooms/${n}/watch`),Lm=n=>X(Z,`users/${n}/recentCalls`),Ao=(n,e)=>X(Z,`users/${n}/recentCalls/${e}`),No=n=>X(Z,`users/${n}/outgoingCall`),vu=n=>X(Z,`rooms/${n}/offerCandidates`),wu=n=>X(Z,`rooms/${n}/answerCandidates`);function Cu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Om=Cu,Eu=new ri("auth","Firebase",Cu());/**
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
 */const Zi=new Hr("@firebase/auth");function Dm(n,...e){Zi.logLevel<=A.WARN&&Zi.warn(`Auth (${gn}): ${n}`,...e)}function Ri(n,...e){Zi.logLevel<=A.ERROR&&Zi.error(`Auth (${gn}): ${n}`,...e)}/**
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
 */function xe(n,...e){throw Lo(n,...e)}function Re(n,...e){return Lo(n,...e)}function Po(n,e,t){const i={...Om(),[e]:t};return new ri("auth","Firebase",i).create(e,{appName:n.name})}function Pt(n){return Po(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Mm(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&xe(n,"argument-error"),Po(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Lo(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Eu.create(n,...e)}function C(n,e,...t){if(!n)throw Lo(e,...t)}function He(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ri(e),new Error(e)}function Ke(n,e){n||He(e)}/**
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
 */function Ir(){return typeof self<"u"&&self.location?.href||""}function xm(){return rc()==="http:"||rc()==="https:"}function rc(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function Fm(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(xm()||Gd()||"connection"in navigator)?navigator.onLine:!0}function Um(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class fi{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ke(t>e,"Short delay should be less than long delay!"),this.isMobile=$r()||Kc()}get(){return Fm()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Oo(n,e){Ke(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class bu{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Bm={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Wm=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Vm=new fi(3e4,6e4);function Do(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function vn(n,e,t,i,s={}){return Iu(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=pn({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return jd()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&fn(n.emulatorConfig.host)&&(l.credentials="include"),bu.fetch()(await Su(n,n.config.apiHost,t,a),l)})}async function Iu(n,e,t){n._canInitEmulator=!1;const i={...Bm,...e};try{const s=new Hm(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Ei(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ei(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Ei(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Ei(n,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Po(n,u,l);xe(n,u)}}catch(s){if(s instanceof yt)throw s;xe(n,"network-request-failed",{message:String(s)})}}async function $m(n,e,t,i,s={}){const r=await vn(n,e,t,i,s);return"mfaPendingCredential"in r&&xe(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Su(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Oo(n.config,s):`${n.config.apiScheme}://${s}`;return Wm.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class Hm{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Re(this.auth,"network-request-failed")),Vm.get())})}}function Ei(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Re(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function jm(n,e){return vn(n,"POST","/v1/accounts:delete",e)}async function es(n,e){return vn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Un(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Gm(n,e=!1){const t=ue(n),i=await t.getIdToken(e),s=Mo(i);C(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Un(Ys(s.auth_time)),issuedAtTime:Un(Ys(s.iat)),expirationTime:Un(Ys(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Ys(n){return Number(n)*1e3}function Mo(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Ri("JWT malformed, contained fewer than 3 sections"),null;try{const s=Fi(t);return s?JSON.parse(s):(Ri("Failed to decode base64 JWT payload"),null)}catch(s){return Ri("Caught error parsing JWT payload as JSON",s?.toString()),null}}function oc(n){const e=Mo(n);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Qn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof yt&&zm(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function zm({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class qm{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Sr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Un(this.lastLoginAt),this.creationTime=Un(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ts(n){const e=n.auth,t=await n.getIdToken(),i=await Qn(n,es(e,{idToken:t}));C(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?Tu(s.providerUserInfo):[],o=Km(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Sr(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function Ym(n){const e=ue(n);await ts(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Km(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Tu(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Jm(n,e){const t=await Iu(n,{},async()=>{const i=pn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Su(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&fn(n.emulatorConfig.host)&&(c.credentials="include"),bu.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Qm(n,e){return vn(n,"POST","/v2/accounts:revokeToken",Do(n,e))}/**
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
 */class qt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):oc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){C(e.length!==0,"internal-error");const t=oc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Jm(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new qt;return i&&(C(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(C(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(C(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qt,this.toJSON())}_performRefresh(){return He("not implemented")}}/**
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
 */function Ze(n,e){C(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Te{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new qm(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Sr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Qn(this,this.stsTokenManager.getToken(this.auth,e));return C(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Gm(this,e)}reload(){return Ym(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Te({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await ts(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(we(this.auth.app))return Promise.reject(Pt(this.auth));const e=await this.getIdToken();return await Qn(this,jm(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:g,stsTokenManager:_}=t;C(d&&_,e,"internal-error");const m=qt.fromJSON(this.name,_);C(typeof d=="string",e,"internal-error"),Ze(i,e.name),Ze(s,e.name),C(typeof h=="boolean",e,"internal-error"),C(typeof f=="boolean",e,"internal-error"),Ze(r,e.name),Ze(o,e.name),Ze(a,e.name),Ze(c,e.name),Ze(l,e.name),Ze(u,e.name);const P=new Te({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return g&&Array.isArray(g)&&(P.providerData=g.map(L=>({...L}))),c&&(P._redirectEventId=c),P}static async _fromIdTokenResponse(e,t,i=!1){const s=new qt;s.updateFromServerResponse(t);const r=new Te({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await ts(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];C(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Tu(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new qt;a.updateFromIdToken(i);const c=new Te({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Sr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
 */const ac=new Map;function je(n){Ke(n instanceof Function,"Expected a class definition");let e=ac.get(n);return e?(Ke(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,ac.set(n,e),e)}/**
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
 */class ku{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}ku.type="NONE";const cc=ku;/**
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
 */function Ai(n,e,t){return`firebase:${n}:${e}:${t}`}class Yt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Ai(this.userKey,s.apiKey,r),this.fullPersistenceKey=Ai("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await es(this.auth,{idToken:e}).catch(()=>{});return t?Te._fromGetAccountInfoResponse(this.auth,t,e):null}return Te._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Yt(je(cc),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||je(cc);const o=Ai(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await es(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Te._fromGetAccountInfoResponse(e,h,u)}else d=Te._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Yt(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Yt(r,e,i))}}/**
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
 */function lc(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Pu(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ru(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ou(e))return"Blackberry";if(Du(e))return"Webos";if(Au(e))return"Safari";if((e.includes("chrome/")||Nu(e))&&!e.includes("edge/"))return"Chrome";if(Lu(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function Ru(n=oe()){return/firefox\//i.test(n)}function Au(n=oe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Nu(n=oe()){return/crios\//i.test(n)}function Pu(n=oe()){return/iemobile/i.test(n)}function Lu(n=oe()){return/android/i.test(n)}function Ou(n=oe()){return/blackberry/i.test(n)}function Du(n=oe()){return/webos/i.test(n)}function xo(n=oe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Xm(n=oe()){return xo(n)&&!!window.navigator?.standalone}function Zm(){return zd()&&document.documentMode===10}function Mu(n=oe()){return xo(n)||Lu(n)||Du(n)||Ou(n)||/windows phone/i.test(n)||Pu(n)}/**
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
 */function xu(n,e=[]){let t;switch(n){case"Browser":t=lc(oe());break;case"Worker":t=`${lc(oe())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${gn}/${i}`}/**
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
 */class e_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function t_(n,e={}){return vn(n,"GET","/v2/passwordPolicy",Do(n,e))}/**
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
 */const n_=6;class i_{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??n_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class s_{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new uc(this),this.idTokenSubscription=new uc(this),this.beforeStateQueue=new e_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Eu,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=je(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Yt.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await es(this,{idToken:e}),i=await Te._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(we(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ts(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Um()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(we(this.app))return Promise.reject(Pt(this));const t=e?ue(e):null;return t&&C(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return we(this.app)?Promise.reject(Pt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return we(this.app)?Promise.reject(Pt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(je(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await t_(this),t=new i_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ri("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Qm(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&je(e)||this._popupRedirectResolver;C(t,this,"argument-error"),this.redirectPersistenceManager=await Yt.create(this,[je(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xu(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(we(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Dm(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Rs(n){return ue(n)}class uc{constructor(e){this.auth=e,this.observer=null,this.addObserver=nh(t=>this.observer=t)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Fo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function r_(n){Fo=n}function o_(n){return Fo.loadJS(n)}function a_(){return Fo.gapiScript}function c_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function l_(n,e){const t=Gr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Ot(r,e??{}))return s;xe(s,"already-initialized")}return t.initialize({options:e})}function u_(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(je);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function d_(n,e,t){const i=Rs(n);C(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Fu(e),{host:o,port:a}=h_(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){C(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),C(Ot(l,i.config.emulator)&&Ot(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,fn(o)?(qc(`${r}//${o}${c}`),Yc("Auth",!0)):f_()}function Fu(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function h_(n){const e=Fu(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:dc(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:dc(o)}}}function dc(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function f_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Uu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return He("not implemented")}_getIdTokenResponse(e){return He("not implemented")}_linkToIdToken(e,t){return He("not implemented")}_getReauthenticationResolver(e){return He("not implemented")}}/**
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
 */async function Kt(n,e){return $m(n,"POST","/v1/accounts:signInWithIdp",Do(n,e))}/**
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
 */const p_="http://localhost";class Ut extends Uu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Ut(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):xe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new Ut(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Kt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Kt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Kt(e,t)}buildRequest(){const e={requestUri:p_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=pn(t)}return e}}/**
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
 */class Uo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class pi extends Uo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class et extends pi{constructor(){super("facebook.com")}static credential(e){return Ut._fromParams({providerId:et.PROVIDER_ID,signInMethod:et.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return et.credentialFromTaggedObject(e)}static credentialFromError(e){return et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return et.credential(e.oauthAccessToken)}catch{return null}}}et.FACEBOOK_SIGN_IN_METHOD="facebook.com";et.PROVIDER_ID="facebook.com";/**
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
 */class Ee extends pi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Ut._fromParams({providerId:Ee.PROVIDER_ID,signInMethod:Ee.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ee.credentialFromTaggedObject(e)}static credentialFromError(e){return Ee.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Ee.credential(t,i)}catch{return null}}}Ee.GOOGLE_SIGN_IN_METHOD="google.com";Ee.PROVIDER_ID="google.com";/**
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
 */class tt extends pi{constructor(){super("github.com")}static credential(e){return Ut._fromParams({providerId:tt.PROVIDER_ID,signInMethod:tt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return tt.credentialFromTaggedObject(e)}static credentialFromError(e){return tt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return tt.credential(e.oauthAccessToken)}catch{return null}}}tt.GITHUB_SIGN_IN_METHOD="github.com";tt.PROVIDER_ID="github.com";/**
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
 */class nt extends pi{constructor(){super("twitter.com")}static credential(e,t){return Ut._fromParams({providerId:nt.PROVIDER_ID,signInMethod:nt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return nt.credentialFromTaggedObject(e)}static credentialFromError(e){return nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return nt.credential(t,i)}catch{return null}}}nt.TWITTER_SIGN_IN_METHOD="twitter.com";nt.PROVIDER_ID="twitter.com";/**
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
 */class dn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Te._fromIdTokenResponse(e,i,s),o=hc(i);return new dn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=hc(i);return new dn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function hc(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class ns extends yt{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,ns.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new ns(e,t,i,s)}}function Bu(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?ns._fromErrorAndOperation(n,r,e,i):r})}async function g_(n,e,t=!1){const i=await Qn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return dn._forOperation(n,"link",i)}/**
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
 */async function m_(n,e,t=!1){const{auth:i}=n;if(we(i.app))return Promise.reject(Pt(i));const s="reauthenticate";try{const r=await Qn(n,Bu(i,s,e,n),t);C(r.idToken,i,"internal-error");const o=Mo(r.idToken);C(o,i,"internal-error");const{sub:a}=o;return C(n.uid===a,i,"user-mismatch"),dn._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&xe(i,"user-mismatch"),r}}/**
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
 */async function __(n,e,t=!1){if(we(n.app))return Promise.reject(Pt(n));const i="signIn",s=await Bu(n,i,e),r=await dn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function y_(n,e,t,i){return ue(n).onIdTokenChanged(e,t,i)}function v_(n,e,t){return ue(n).beforeAuthStateChanged(e,t)}function Wu(n,e,t,i){return ue(n).onAuthStateChanged(e,t,i)}const is="__sak";/**
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
 */class Vu{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(is,"1"),this.storage.removeItem(is),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const w_=1e3,C_=10;class $u extends Vu{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Mu(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Zm()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,C_):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},w_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}$u.type="LOCAL";const E_=$u;/**
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
 */class Hu extends Vu{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Hu.type="SESSION";const ju=Hu;/**
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
 */function b_(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class As{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new As(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await b_(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}As.receivers=[];/**
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
 */function Bo(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class I_{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=Bo("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function De(){return window}function S_(n){De().location.href=n}/**
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
 */function Gu(){return typeof De().WorkerGlobalScope<"u"&&typeof De().importScripts=="function"}async function T_(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function k_(){return navigator?.serviceWorker?.controller||null}function R_(){return Gu()?self:null}/**
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
 */const zu="firebaseLocalStorageDb",A_=1,ss="firebaseLocalStorage",qu="fbase_key";class gi{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ns(n,e){return n.transaction([ss],e?"readwrite":"readonly").objectStore(ss)}function N_(){const n=indexedDB.deleteDatabase(zu);return new gi(n).toPromise()}function Tr(){const n=indexedDB.open(zu,A_);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(ss,{keyPath:qu})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(ss)?e(i):(i.close(),await N_(),e(await Tr()))})})}async function fc(n,e,t){const i=Ns(n,!0).put({[qu]:e,value:t});return new gi(i).toPromise()}async function P_(n,e){const t=Ns(n,!1).get(e),i=await new gi(t).toPromise();return i===void 0?null:i.value}function pc(n,e){const t=Ns(n,!0).delete(e);return new gi(t).toPromise()}const L_=800,O_=3;class Yu{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Tr(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>O_)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gu()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=As._getInstance(R_()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await T_(),!this.activeServiceWorker)return;this.sender=new I_(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||k_()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Tr();return await fc(e,is,"1"),await pc(e,is),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>fc(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>P_(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>pc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=Ns(s,!1).getAll();return new gi(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),L_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Yu.type="LOCAL";const D_=Yu;new fi(3e4,6e4);/**
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
 */function Ku(n,e){return e?je(e):(C(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Wo extends Uu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Kt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Kt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Kt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function M_(n){return __(n.auth,new Wo(n),n.bypassAuthState)}function x_(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),m_(t,new Wo(n),n.bypassAuthState)}async function F_(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),g_(t,new Wo(n),n.bypassAuthState)}/**
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
 */class Ju{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return M_;case"linkViaPopup":case"linkViaRedirect":return F_;case"reauthViaPopup":case"reauthViaRedirect":return x_;default:xe(this.auth,"internal-error")}}resolve(e){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ke(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const U_=new fi(2e3,1e4);async function B_(n,e,t){if(we(n.app))return Promise.reject(Re(n,"operation-not-supported-in-this-environment"));const i=Rs(n);Mm(n,e,Uo);const s=Ku(i,t);return new Rt(i,"signInViaPopup",e,s).executeNotNull()}class Rt extends Ju{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Rt.currentPopupAction&&Rt.currentPopupAction.cancel(),Rt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Ke(this.filter.length===1,"Popup operations only handle one event");const e=Bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Re(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(Re(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Re(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,U_.get())};e()}}Rt.currentPopupAction=null;/**
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
 */const W_="pendingRedirect",Ni=new Map;class V_ extends Ju{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Ni.get(this.auth._key());if(!e){try{const i=await $_(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Ni.set(this.auth._key(),e)}return this.bypassAuthState||Ni.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function $_(n,e){const t=G_(e),i=j_(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function H_(n,e){Ni.set(n._key(),e)}function j_(n){return je(n._redirectPersistence)}function G_(n){return Ai(W_,n.config.apiKey,n.name)}async function z_(n,e,t=!1){if(we(n.app))return Promise.reject(Pt(n));const i=Rs(n),s=Ku(i,e),o=await new V_(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const q_=600*1e3;class Y_{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!K_(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Qu(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(Re(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=q_&&this.cachedEventUids.clear(),this.cachedEventUids.has(gc(e))}saveEventToCache(e){this.cachedEventUids.add(gc(e)),this.lastProcessedEventTime=Date.now()}}function gc(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Qu({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function K_(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Qu(n);default:return!1}}/**
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
 */async function J_(n,e={}){return vn(n,"GET","/v1/projects",e)}/**
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
 */const Q_=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,X_=/^https?/;async function Z_(n){if(n.config.emulator)return;const{authorizedDomains:e}=await J_(n);for(const t of e)try{if(ey(t))return}catch{}xe(n,"unauthorized-domain")}function ey(n){const e=Ir(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!X_.test(t))return!1;if(Q_.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const ty=new fi(3e4,6e4);function mc(){const n=De().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function ny(n){return new Promise((e,t)=>{function i(){mc(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{mc(),t(Re(n,"network-request-failed"))},timeout:ty.get()})}if(De().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(De().gapi?.load)i();else{const s=c_("iframefcb");return De()[s]=()=>{gapi.load?i():t(Re(n,"network-request-failed"))},o_(`${a_()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw Pi=null,e})}let Pi=null;function iy(n){return Pi=Pi||ny(n),Pi}/**
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
 */const sy=new fi(5e3,15e3),ry="__/auth/iframe",oy="emulator/auth/iframe",ay={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},cy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ly(n){const e=n.config;C(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Oo(e,oy):`https://${n.config.authDomain}/${ry}`,i={apiKey:e.apiKey,appName:n.name,v:gn},s=cy.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${pn(i).slice(1)}`}async function uy(n){const e=await iy(n),t=De().gapi;return C(t,n,"internal-error"),e.open({where:document.body,url:ly(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ay,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=Re(n,"network-request-failed"),a=De().setTimeout(()=>{r(o)},sy.get());function c(){De().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const dy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},hy=500,fy=600,py="_blank",gy="http://localhost";class _c{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function my(n,e,t,i=hy,s=fy){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...dy,width:i.toString(),height:s.toString(),top:r,left:o},l=oe().toLowerCase();t&&(a=Nu(l)?py:t),Ru(l)&&(e=e||gy,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,g])=>`${h}${f}=${g},`,"");if(Xm(l)&&a!=="_self")return _y(e||"",a),new _c(null);const d=window.open(e||"",a,u);C(d,n,"popup-blocked");try{d.focus()}catch{}return new _c(d)}function _y(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const yy="__/auth/handler",vy="emulator/auth/handler",wy=encodeURIComponent("fac");async function yc(n,e,t,i,s,r){C(n.config.authDomain,n,"auth-domain-config-required"),C(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:gn,eventId:s};if(e instanceof Uo){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",rr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof pi){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${wy}=${encodeURIComponent(c)}`:"";return`${Cy(n)}?${pn(a).slice(1)}${l}`}function Cy({config:n}){return n.emulator?Oo(n,vy):`https://${n.authDomain}/${yy}`}/**
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
 */const Ks="webStorageSupport";class Ey{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ju,this._completeRedirectFn=z_,this._overrideRedirectResult=H_}async _openPopup(e,t,i,s){Ke(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await yc(e,t,i,Ir(),s);return my(e,r,Bo())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await yc(e,t,i,Ir(),s);return S_(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Ke(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await uy(e),i=new Y_(e);return t.register("authEvent",s=>(C(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ks,{type:Ks},s=>{const r=s?.[0]?.[Ks];r!==void 0&&t(!!r),xe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Z_(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Mu()||Au()||xo()}}const by=Ey;var vc="@firebase/auth",wc="1.11.0";/**
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
 */class Iy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Sy(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Ty(n){tn(new Dt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xu(n)},l=new s_(i,s,r,c);return u_(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),tn(new Dt("auth-internal",e=>{const t=Rs(e.getProvider("auth").getImmediate());return(i=>new Iy(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),dt(vc,wc,Sy(n)),dt(vc,wc,"esm2020")}/**
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
 */const ky=300,Ry=zc("authIdTokenMaxAge")||ky;let Cc=null;const Ay=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Ry)return;const s=t?.token;Cc!==s&&(Cc=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Ny(n=el()){const e=Gr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=l_(n,{popupRedirectResolver:by,persistence:[D_,E_,ju]}),i=zc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=Ay(r.toString());v_(t,o,()=>o(t.currentUser)),y_(t,a=>o(a))}}const s=jc("auth");return s&&d_(t,`http://${s}`),t}function Py(){return document.getElementsByTagName("head")?.[0]??document}r_({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=Re("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",Py().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Ty("Browser");const Ly=()=>!1,Oy=n=>{try{n&&localStorage.setItem("debug:console","1")}catch{}},le=(...n)=>{},Dy=(...n)=>{localStorage.getItem("debug:console")},My=({shouldShowInProd:n=!1}={})=>{if(localStorage.getItem("debug:console"),!n)return;const e=[];"serviceWorker"in navigator?e.push("✓ Service Workers supported"):e.push("❌ Service Workers not supported"),window.location.protocol==="https:"||window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?e.push("✓ Secure context (HTTPS/localhost)"):e.push("❌ Not served over HTTPS or localhost"),window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0?e.push("⚠️  App is already installed"):e.push("✓ App not yet installed"),console.group("[PWA] Install Prompt Debug"),console.log("Installability checks:"),e.forEach(i=>console.log(i)),console.log(`
Possible reasons beforeinstallprompt did not fire:`),console.log("1. Chrome throttled the prompt (recently dismissed/uninstalled)"),console.log("2. Manifest or Service Worker issues"),console.log("3. App already installed"),console.log(`
Workarounds:`),console.log("• Try in Incognito mode (bypasses throttling)"),console.log('• Use Chrome menu: ⋮ → "Install HangVidU..."'),console.groupEnd()},wn=Ny(yu);let Rn=null;const xy=()=>Math.random().toString(36).substring(2,15),kr="guestUser",Fy=2880*60*1e3;function Uy(){try{const n=typeof localStorage<"u"?localStorage.getItem(kr):null;if(!n)return null;const e=JSON.parse(n);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(kr)}catch{}return null}return e}catch{return null}}function By(n,e=Fy){const t=Date.now(),i={id:n,createdAt:t,expiresAt:t+e};try{typeof localStorage<"u"&&localStorage.setItem(kr,JSON.stringify(i))}catch{}return i}function ne(){const n=We();if(n)return n;if(!Rn){const e=Uy();e&&e.id?Rn=e.id:(Rn=xy(),By(Rn))}return Rn}function We(){return wn.currentUser?.uid??null}function Wy(){return new Promise(n=>{const e=Wu(wn,t=>{e(),n(t)})})}function Vo(n,{truncate:e=7}={}){return Wu(wn,t=>{const i=!!t,s=t?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;try{n({user:t,isLoggedIn:i,userName:r})}catch{}})}async function Xu(){const n=new Ee;try{const e=await B_(wn,n),i=Ee.credentialFromResult(e).accessToken,s=e.user;console.log("Signed in user:",s),le("Google Access Token exists:",!!i)}catch(e){const t=e?.code||"unknown",i=e?.message||String(e),s=e?.customData?.email,r=Ee.credentialFromError(e);if(console.error("Error during Google sign-in:",{errorCode:t,errorMessage:i,email:s,credential:r,origin:typeof window<"u"?window.location.origin:"n/a"}),t==="auth/unauthorized-domain"){const o=typeof window<"u"?window.location.origin:"",a=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",o?`• ${o}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];o&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(o).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${a.join(`
`)}`);return}alert(`Sign-in failed: ${i}`)}}function Zu(){wn.signOut().then(()=>{console.log("User signed out successfully")}).catch(n=>{console.error("Error signing out:",n)})}const Vy=Object.freeze(Object.defineProperty({__proto__:null,auth:wn,getCurrentUserAsync:Wy,getLoggedInUserId:We,getUserId:ne,onAuthChange:Vo,signInWithGoogle:Xu,signOutUser:Zu},Symbol.toStringTag,{value:"Module"})),$o=n=>n?!0:(console.warn("Element not found. el.id: =>",n?.id??"(no id)","el: =>",n),console.trace(),!1),Ho=n=>{if($o(n))return n.classList.contains("hidden")},b=n=>{$o(n)&&n.classList.contains("hidden")&&n.classList.remove("hidden")},v=n=>{$o(n)&&!n.classList.contains("hidden")&&n.classList.add("hidden")},ed=n=>n.classList.contains("small-frame"),Lt=n=>{if(n&&!ed(n)){n.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const t=document.createElement("span");t.classList.add("small-frame-toggle-icon"),t.textContent="❮",e.appendChild(t),n.appendChild(e),e.addEventListener("click",()=>{n.classList.contains("closed")?(n.classList.remove("closed"),e.classList.remove("closed"),t.classList.remove("closed")):(n.classList.add("closed"),e.classList.add("closed"),t.classList.add("closed"))})}},At=n=>{if(ed(n)){n.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function Rr(n){return document.pictureInPictureElement===n}const x=n=>{const e=document.getElementById(n);return e||(console.warn(`Element with id: ${n} not found.`),null)};let Fe=null,vt=null,Ps=null,jo=null,be=null,K=null,Y=null,U=null,W=null,pe=null,fe=null,ge=null,Ne=null,Cn=null,td=null,Xn=null,Ls=null,Pe=null,Os=null,En=null,bn=null,Go=null,zo=null,qo=null,Yo=null;function Ec(){Fe=x("lobby"),vt=x("lobby-call-btn"),Ps=x("title-auth-bar"),jo=x("videos"),be=x("local-video-el"),K=x("local-video-box"),Y=x("remote-video-el"),U=x("remote-video-box"),W=x("shared-video-el"),pe=x("shared-video-box"),fe=x("chat-controls"),ge=x("call-btn"),Ne=x("hang-up-btn"),Cn=x("switch-camera-btn"),Xn=x("status"),Ls=x("sync-status"),Pe=x("mute-btn"),Os=x("fullscreen-partner-btn"),En=x("mic-btn"),bn=x("camera-btn"),Go=x("app-pip-btn"),zo=x("app-title-h1"),qo=x("app-title-a"),Yo=x("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Ec):Ec();const nd=()=>({lobbyDiv:Fe,lobbyCallBtn:vt,titleAuthBar:Ps,videosWrapper:jo,localVideoEl:be,localBoxEl:K,remoteVideoEl:Y,remoteBoxEl:U,sharedVideoEl:W,sharedBoxEl:pe,chatControls:fe,callBtn:ge,hangUpBtn:Ne,switchCameraBtn:Cn,installBtn:td,statusDiv:Xn,syncStatus:Ls,mutePartnerBtn:Pe,fullscreenPartnerBtn:Os,micBtn:En,cameraBtn:bn,appPipBtn:Go,appTitleH1:zo,appTitleA:qo,appTitleSpan:Yo});function id(n,e=3,t=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(n);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${n} not found after ${e} attempts`),i(null);return}setTimeout(r,t)};r()})}async function sd(n,e=3,t=100){const i={},s=n.map(async r=>{const o=await id(r,e,t);return i[r]=o,o});return await Promise.all(s),i}async function $y(){const n=await sd(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");n.searchContainer=e;const t=Object.entries(n).filter(([i,s])=>!s).map(([i])=>i);return t.length>0&&console.warn("Some YouTube elements not found:",t),n}const Hy=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Go},get appTitleA(){return qo},get appTitleH1(){return zo},get appTitleSpan(){return Yo},get callBtn(){return ge},get cameraBtn(){return bn},get chatControls(){return fe},get fullscreenPartnerBtn(){return Os},getElements:nd,get hangUpBtn(){return Ne},initializeYouTubeElements:$y,installBtn:td,get lobbyCallBtn(){return vt},get lobbyDiv(){return Fe},get localBoxEl(){return K},get localVideoEl(){return be},get micBtn(){return En},get mutePartnerBtn(){return Pe},get remoteBoxEl(){return U},get remoteVideoEl(){return Y},robustElementAccess:id,get sharedBoxEl(){return pe},get sharedVideoEl(){return W},get statusDiv(){return Xn},get switchCameraBtn(){return Cn},get syncStatus(){return Ls},get titleAuthBar(){return Ps},get videosWrapper(){return jo},waitForElements:sd},Symbol.toStringTag,{value:"Module"}));function R(n){Xn?Xn.textContent=n:console.warn("Status div not found in the DOM.")}function rd(n,{inactivityMs:e=3e3,listenTarget:t=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!n)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){b(n);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{v(n);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>t.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(n)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),v(n);try{typeof s=="function"&&s()}catch(P){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",P)}}}t.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),v(n);try{typeof s=="function"&&s()}catch(P){console.warn("showHideOnInactivity onHide (esc) callback error:",P)}}}document.addEventListener("keydown",f);function g(){a||u()}t.addEventListener("touchend",g,{passive:!0}),v(n);function _(){l.forEach(m=>t.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),t.removeEventListener("mouseout",h),t.removeEventListener("touchend",g),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}class Jt{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,t,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:t,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${t}`,i)}logListenerAttachment(e,t,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:t,currentCount:i,...s})}logListenerCleanup(e,t,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:t.length,removedRoomIds:e,preservedRoomIds:t,...i})}logDuplicateListener(e,t,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:t,...i})}logIncomingCallEvent(e,t,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:t,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,t,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:t,roomId:i,...s})}logCallingUILifecycle(e,t,i={}){this.log("CALLING_UI",e,{roomId:t,...i})}logFirebaseOperation(e,t,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:t,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,t={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...t})}logRoomCreation(e,t,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:t,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,t,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:t,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,t,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:t,...i})}logContactCall(e,t,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:t,forceInitiator:i,...s})}logFreshnessValidation(e,t,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:t,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,t,i,s={}){this.log("RACE_CONDITION",e,{roomId:t,events:i,...s})}getLogs(e={}){let t=[...this.logs];return e.category&&(t=t.filter(i=>i.category===e.category)),e.event&&(t=t.filter(i=>i.event===e.event)),e.roomId&&(t=t.filter(i=>i.data.roomId===e.roomId)),e.since&&(t=t.filter(i=>i.timestamp>=e.since)),e.until&&(t=t.filter(i=>i.timestamp<=e.until)),t}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((t,i)=>t.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const t=this.getLogs({category:"LISTENER"});return e?t.filter(i=>i.data.roomId===e):t}getFailureAnalysis(){const e=this.logs.filter(t=>t.category==="FIREBASE"&&t.data.success===!1||t.category==="INCOMING_CALL"&&t.data.decision==="REJECT"||t.category==="LISTENER"&&t.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(t=>t.category==="FIREBASE").length,rejectedCalls:e.filter(t=>t.category==="INCOMING_CALL"&&t.data.decision==="REJECT").length,duplicateListeners:e.filter(t=>t.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const t=this.exportLogsAsJSON(),i=new Blob([t],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,t){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=t)}getLogsSince(e){return this.logs.filter(t=>t.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const t=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=t)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const t=localStorage.getItem(e);if(t){const i=JSON.parse(t);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(t){return console.warn("Failed to load persisted logs:",t),0}}static getPersistedLogKeys(){const e=[];for(let t=0;t<localStorage.length;t++){const i=localStorage.key(t);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const t=Date.now()-e;Jt.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<t&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const t=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:t}),t}endTiming(e,t={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...t}),s}return null}}let Js=null;function y(){return Js||(Js=new Jt),Js}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:n=>{y().downloadLogs(n),console.log("Diagnostic logs downloaded")},getRoomLogs:n=>{const t=y().getCallFlowTrace(n);return console.log(`Logs for room ${n}:`,t),t},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:n=>{const t=y().getListenerDiagnostics(n);return console.log("Listener diagnostics:",t),t},getLogsSince:n=>{const t=y().getLogsSince(n);return console.log(`Logs since ${new Date(n).toISOString()}:`,t),t},getLogsInRange:(n,e)=>{const i=y().getLogsInTimeRange(n,e);return console.log(`Logs from ${new Date(n).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:n=>{const t=y().loadPersistedLogs(n);return console.log(`Loaded ${t} persisted logs`),t},getPersistedKeys:()=>{const n=Jt.getPersistedLogKeys();return console.log("Persisted log keys:",n),n},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const n=y(),e={sessionId:n.sessionId,logCount:n.logs.length,isEnabled:n.isEnabled,maxLogs:n.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const n=y();n.logs.length>0&&n.persistLogs(),Jt.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const n=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!n.isEnabled||!e)return;const t=Jt.getPersistedLogKeys();t.length>0&&(console.log(`Found ${t.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",t))}catch{}},1e3));class jy{constructor(){this.currentRoomId=null}async createNewRoom(e,t,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:t,hasOffer:!!e,timestamp:s});const r=wt(i);try{return await Ye(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:t}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:t,duration:Date.now()-s}),await this.joinRoom(i,t),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:t,totalDuration:Date.now()-s}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:t,duration:Date.now()-s}),o}}async checkRoomStatus(e){const t=wt(e),i=await Nt(t);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const t=wt(e),i=await Nt(t);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,t){const i=wt(e);await Ti(i,{answer:t})}async joinRoom(e,t,i="Guest User"){const s=sc(e,t);await Ye(s,{displayName:i,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${t}`)}async leaveRoom(e,t=null,{deleteRoomIfEmpty:i=!0}={}){const s=t||this.currentRoomId;if(!s||!e)return;const r=sc(s,e),o=Ci(s),a=wt(s);try{await un(r)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await Nt(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await un(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!t||t===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,t,i="user_rejected"){if(!e||!t)return;const s=wt(e),r={rejection:{by:t,reason:i,at:Date.now()}};try{await Ti(s,r),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:t,reason:i})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:t,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,t,i="caller_cancelled"){if(!e||!t)return;const s=wt(e),r={cancellation:{by:t,reason:i,at:Date.now()}};try{await Ti(s,r),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:t,reason:i})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:t,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,t){const i=Pm(e);Tt(i,"value",t,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,t){const i=Ci(e);Tt(i,"child_added",t,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,t){const i=Ci(e);Tt(i,"child_removed",t,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,t,i){const s=Ci(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return Tt(s,"child_added",r,e,t),Tt(s,"child_removed",o,e,t),()=>Nm(t,e)}get roomId(){return this.currentRoomId}}const V=new jy,rs=3e4;let Ve=null,Pn=null;async function Gy(n,e=null){const t=ne(),i=We();if(!i)return;const s=No(i);await Ye(s,{roomId:n,targetContactName:e,initiatedAt:Date.now(),callerUserId:t})}async function os(){const n=We();if(!n)return;const e=No(n);await un(e).catch(()=>{})}async function od(n,e){if(!n)return!1;try{const t=No(n),i=await Nt(t);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<rs}catch(t){return console.warn("Failed to check outgoing call freshness",t),!1}}async function ad(n){if(!n)return!1;try{const e=X(Z,`rooms/${n}/createdAt`),t=await Nt(e);if(!t.exists())return!1;const i=t.val();return typeof i!="number"?!1:Date.now()-i<rs}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function cd(n,e,t){const i=y(),s=Date.now();pt(),await Gy(n,e);const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",n,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([os(),V.cancelCall(n,ne(),"caller_cancelled"),V.leaveRoom(ne(),n)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:n,error:String(d)})}pt(),R("Call cancelled")};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=n,Ve=r,Pn=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",n,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:rs});try{await Promise.all([os(),V.cancelCall(n,ne(),"auto_timeout"),V.leaveRoom(ne(),n)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:n,error:String(d)})}pt(),R("Call timed out - no answer after 30 seconds")},rs)}function pt(){if(Ve){const n=Ve.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",n,{reason:"hide_called",hadTimeout:!!Pn,timestamp:Date.now()})}Pn&&(clearTimeout(Pn),Pn=null),Ve&&(Ve.remove(),Ve=null)}async function Ko(){if(Ve){const n=Ve.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",n,{reason:"call_answered",timestamp:Date.now()})}await os(),pt()}async function zy(n="user_rejected"){const e=y(),t=Ve?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",t,{reason:n,timestamp:Date.now()}),await os(),pt(),R("Call declined")}const qy=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:pt,isOutgoingCallFresh:od,isRoomCallFresh:ad,onCallAnswered:Ko,onCallRejected:zy,showCallingUI:cd},Symbol.toStringTag,{value:"Module"}));let Qt=null;function Jo(n,e={}){return new Promise(t=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${n}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),t(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),Qt===a&&(Qt=null),t(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),Qt=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function Yy(){if(typeof Qt=="function"){try{Qt(!1)}catch{}return Qt=null,!0}return!1}const Ky=Object.freeze(Object.defineProperty({__proto__:null,default:Jo,dismissActiveConfirmDialog:Yy},Symbol.toStringTag,{value:"Module"}));async function bc(n,e,t){const i=We();if(i){const s=X(Z,`users/${i}/contacts/${n}`);await Ye(s,{contactId:n,contactName:e,roomId:t,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[n]={contactId:n,contactName:e,roomId:t,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function as(){const n=We();if(n)try{const e=X(Z,`users/${n}/contacts`),t=await Nt(e);return t.exists()?t.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function Jy(n,e,t){if(!n||!e)return;const s=(await as())?.[n];if(s){s.roomId!==e&&(await bc(n,s.contactName,e),await Zn(t)),console.log(`[CONTACT SAVE] Re-attaching listener for existing contact room: ${e}`),ni(e);return}if(!await Jo("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",n)||n;await bc(n,o,e),console.log(`[CONTACT SAVE] Attaching listener for saved contact room: ${e}`),ni(e),await Zn(t)}async function Zn(n){if(!n)return;const e=await as(),t=Object.keys(e);let i=n.querySelector(".contacts-list");if(i||(i=document.createElement("div"),i.className="contacts-list",n.appendChild(i)),t.length===0){i.innerHTML='<p style="color: #666;">No saved contacts yet.</p>',i.style.display="none";return}i.innerHTML=`
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
              <span class="contact-name" style="flex: 1;">${r.contactName}</span>
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
  `,Qy(i,n)}function Qy(n,e){n.querySelectorAll(".contact-call-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-room-id"),s=t.getAttribute("data-contact-name");i&&(console.log(`[CONTACT CALL] Ensuring listener is active for room: ${i}`),ni(i),await cd(i,s),ca(i,{forceInitiator:!0}).catch(r=>{console.warn("Failed to call contact:",r),pt()}))}}),n.querySelectorAll(".contact-delete-btn").forEach(t=>{t.onclick=async()=>{const i=t.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await Xy(i),await Zn(e))}})}async function Xy(n){const e=We();if(e){try{await un(X(Z,`users/${e}/contacts/${n}`))}catch(t){console.warn("Failed to delete contact from RTDB",t)}return}try{const t=localStorage.getItem("contacts")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("contacts",JSON.stringify(i)))}catch(t){console.warn("Failed to delete contact from localStorage",t)}}const ei=new WeakMap;function Qo(n,e,t){if(!n||!t)throw new Error("setupIceCandidates: pc and roomId are required");if(ei.has(n)||ei.set(n,[]),e==="initiator")Ic(n,"offerCandidates",t),Sc(n,"answerCandidates",t);else if(e==="joiner")Ic(n,"answerCandidates",t),Sc(n,"offerCandidates",t);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Ic(n,e,t){n.onicecandidate=i=>{if(i.candidate){const s=ic(e==="offerCandidates"?vu(t):wu(t));Ye(s,i.candidate.toJSON())}}}function Sc(n,e,t){const i=e==="offerCandidates"?vu(t):wu(t);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{n.remoteDescription&&(Xo(n),n.removeEventListener("signalingstatechange",a))};n.addEventListener("signalingstatechange",a)};Tt(i,"child_added",a=>{const c=a.val();if(!(!n||n.signalingState==="closed")&&c)if(n.remoteDescription)try{n.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=ei.get(n);l&&(l.push(c),l.length===1&&r())}},t)}function Xo(n){if(!n||!ei.has(n))return;const e=ei.get(n);if(e.length!==0){le(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const t of e)try{n.addIceCandidate(new RTCIceCandidate(t)).catch(i=>{le("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const Zy=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Xo,setupIceCandidates:Qo},Symbol.toStringTag,{value:"Module"}));let Le=null,Tc=null;function ld(n){Tc=n,n.onconnectionstatechange=()=>{le("onconnectionstatechange:",n.connectionState),n.connectionState==="connected"?(R("Connected!"),la(),Ko().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Le&&(clearTimeout(Le),Le=null)):n.connectionState==="disconnected"?(R("Partner disconnected (reconnecting...)"),Le&&clearTimeout(Le),Le=setTimeout(()=>{n===Tc&&n.connectionState==="disconnected"&&(R("Partner disconnected"),J.cleanupCall({reason:"connection_lost"})),Le=null},3e3)):n.connectionState==="failed"&&(R("Connection failed"),Ms(),Le&&(clearTimeout(Le),Le=null),J.cleanupCall({reason:"connection_failed"}))},n.addEventListener("iceconnectionstatechange",e=>{le("ICE iceconnectionstatechange:",n.iceConnectionState),n.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),n.restartIce())})}function Ar(n,e,t={}){if(!n||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=t,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(n.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{s&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),s&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",c)}}function kc(n){const e=document.createElement("div");e.innerHTML=`
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
  `,document.body.appendChild(e);const t=e.querySelector("#messages-toggle-btn"),i=e.querySelector("#messages-box"),s=e.querySelector("#messages-messages"),r=e.querySelector("#messages-form"),o=e.querySelector("#messages-input");if(!t||!i||!s||!r||!o)return console.error("Messages UI elements not found."),null;const a=new MutationObserver(_=>{_.forEach(m=>{m.type==="attributes"&&m.attributeName==="class"&&i.classList.contains("hidden")})});a.observe(i,{attributes:!0});function c(){i.classList.toggle("hidden"),i.classList.contains("hidden")?o.blur():o.focus()}t.addEventListener("click",c),Ar(i,()=>{v(i)},{ignore:[t],esc:!0});function l(){b(t)}function u(){v(t)}function d(_){const m=document.createElement("p");m.textContent=_,_.startsWith("You:")?m.style.textAlign="right":_.startsWith("Partner:")&&(m.style.textAlign="left"),s.appendChild(m),s.scrollTop=s.scrollHeight}function h(_){d(`Partner: ${_}`),Ho(i)&&f()}function f(){t.classList.add("new-message"),setTimeout(()=>{t.classList.remove("new-message")},4e3)}r.addEventListener("submit",_=>{_.preventDefault();const m=o.value.trim();m&&(n(m),d(`You: ${m}`),o.value="")});function g(){a.disconnect(),i&&i.removeEventListener("click",onClickMessagesBox),t&&u(),e&&e.parentNode&&e.parentNode.removeChild(e)}return{appendChatMessage:d,receiveMessage:h,toggleMessages:c,showMessagesToggle:l,hideMessagesToggle:u,cleanup:g}}function ud(n,e){let t,i;return e==="initiator"?(t=n.createDataChannel("chat"),i=kc(r=>{t.readyState==="open"&&t.send(r)}),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)):e==="joiner"&&(n.ondatachannel=s=>{t=s.channel,i=kc(r=>t.send(r)),t.onopen=()=>{i.showMessagesToggle(),i.appendChatMessage("💬 Chat connected")},t.onmessage=r=>i.receiveMessage(r.data)}),{dataChannel:t,messagesUI:i}}const Zo={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Qs=new WeakMap;function dd(n,e,t){Qs.has(n)||Qs.set(n,{});const i=Qs.get(n),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===t?!0:(i[s]=t,!1)}function hd(n,e){return n?e==="offer"?n.signalingState==="stable":n.signalingState==="have-local-offer"||n.signalingState==="stable":!1}function ea(n,e){e.getTracks().forEach(t=>{n.addTrack(t,e)})}async function fd(n){const e=await n.createOffer();return await n.setLocalDescription(e),e}async function pd(n){const e=await n.createAnswer();return await n.setLocalDescription(e),e}async function gd(n,e,t){if(dd(n,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!hd(n,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,n.signalingState),!1;try{return await n.setRemoteDescription(new RTCSessionDescription(e)),t(n),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function md(){return Math.random().toString(36).substring(2,9)}const ev=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:ea,createAnswer:pd,createOffer:fd,generateRoomId:md,isDuplicateSdp:dd,isValidSignalingState:hd,rtcConfig:Zo,setRemoteDescription:gd},Symbol.toStringTag,{value:"Module"}));async function tv({localStream:n,remoteVideoEl:e,mutePartnerBtn:t,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!n)return R("Error: Camera not initialized"),{success:!1};const o=new RTCPeerConnection(Zo),a="initiator",c=r||md(),l=ne();ea(o,n);const{dataChannel:u,messagesUI:d}=ud(o,a);if(!i(o,e,t))return R("Error setting up remote stream"),console.error("Error setting up remote stream"),o.close(),{success:!1};Qo(o,a,c),ld(o);const f=await fd(o);await V.createNewRoom(f,l,c),s(c,a,l);const g=`${window.location.origin}${window.location.pathname}?room=${c}`;return R("Waiting for partner to join..."),{success:!0,pc:o,roomId:c,roomLink:g,dataChannel:u,messagesUI:d,role:a}}async function nv({roomId:n,localStream:e,remoteVideoEl:t,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r}){if(!e)return R("Error: Camera not initialized"),{success:!1};if(!n)return R("Error: No room ID"),{success:!1};const o=await V.checkRoomStatus(n);if(!o.exists)return R("Error: Invalid room link"),{success:!1};if(!o.hasMembers)return R("Error: Room is empty - no one to connect with"),{success:!1};let a;try{a=await V.getRoomData(n)}catch(m){return R("Error: "+m.message),{success:!1}}const c=a.offer;if(!c)return R("Error: No offer found"),{success:!1};const l=new RTCPeerConnection(Zo),u="joiner",d=ne();ea(l,e);const{dataChannel:h,messagesUI:f}=ud(l,u);if(!s(l,t,i))return R("Error setting up remote stream"),console.error("Error setting up remote stream for joiner"),l.close(),{success:!1};Qo(l,u,n),ld(l),await gd(l,c,Xo);const _=await pd(l);try{await V.saveAnswer(n,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),R("Failed to send answer to partner."),l.close(),{success:!1}}return r(n,u,d),await V.joinRoom(n,d),R("Connecting..."),{success:!0,pc:l,roomId:n,dataChannel:h,messagesUI:f,role:u}}class iv{constructor(){this.listeners=new Map}on(e,t){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(t)}off(e,t){this.listeners.has(e)&&this.listeners.get(e).delete(t)}emit(e,t){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(t)}catch(s){console.warn("CallController listener error",s)}}}class sv{constructor(){this.emitter=new iv,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,t){this.emitter.on(e,t)}off(e,t){this.emitter.off(e,t)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const t=X(Z,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i){i=!0;try{R("Partner disconnected")}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};ki(t,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:t,callback:s,roomId:e})}setupAnswerListener(e,t,i){if(!e||!t)return;const s=X(Z,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await jt(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>ev);return{setRemoteDescription:l}},void 0);await c(t,a,i)}};ki(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const t=X(Z,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await jt(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>qy);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{R("Call declined")}try{await V.leaveRoom(ne(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};ki(t,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:t,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const t=ne(),i=s=>{s.key!==t&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};V.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const t=ne(),i=s=>{s.key!==t&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};V.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,t]of this.listeners.entries())for(const i of t)try{i.ref&&Ss(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{Ts(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const t=await tv(e);if(!t||!t.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:t}),this.emitCallFailed("createCall",t),t;this.pc=t.pc,this.roomId=t.roomId,this.roomLink=t.roomLink||null,this.role=t.role||"initiator",this.dataChannel=t.dataChannel||null,this.messagesUI=t.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:i}=await jt(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>Zy);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),t}catch(t){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:t}),this.emitCallFailed("createCall",t),t}}async answerCall(e={}){this.state="joining";try{e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const t=await nv(e);return!t||!t.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:t}),this.emitCallFailed("answerCall",t),t):(this.pc=t.pc,this.roomId=t.roomId,this.role=t.role||"joiner",this.dataChannel=t.dataChannel||null,this.messagesUI=t.messagesUI||null,this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),t)}catch(t){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:t}),this.emitCallFailed("answerCall",t),t}}async hangUp({emitCancel:e=!0,reason:t="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await V.cancelCall(this.roomId,ne(),t)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:t}),this.emitter.emit("hangup",{roomId:this.roomId,reason:t})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,t){this.emitter.emit("callFailed",{phase:e,error:t?.message||t?.error||t||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const t=this.roomId,i=this.partnerId;this.removeTrackedListeners();try{await V.leaveRoom(ne(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(s){console.warn("CallController: failed to clear remote video",s)}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:t,partnerId:i,reason:e}),this.resetState(),this.emitter.emit("cleanup",{roomId:t,partnerId:i,reason:e})}catch(t){throw this.emitter.emit("error",{phase:"cleanupCall",error:t}),t}finally{this.isCleaningUp=!1}}}}const J=new sv,Nr={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function _d(){const n=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>n[i])?Nr.withVoiceIsolationIfSupported:Nr.default}const rv=()=>Nr.default,ov={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},av=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function ta(n){const e=av()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",s=ov[i][e];return{facingMode:n,...s}}function cv(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function lv(){return cv()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function uv(){const n=await lv();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}async function dv({localStream:n,localVideo:e,currentFacingMode:t,peerConnection:i=null}){if(!n||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=t==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:ta(s),audio:_d()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=n.getVideoTracks()[0],l=c?c.enabled:!0,u=n.getAudioTracks()[0],d=u?!u.enabled:!1;if(i){const h=i.getSenders().find(g=>g.track&&g.track.kind==="video");h&&h.replaceTrack(o);const f=i.getSenders().find(g=>g.track&&g.track.kind==="audio");f&&a&&f.replaceTrack(a)}return o&&(o.enabled=l),a&&(a.enabled=!d),n.getTracks().forEach(h=>h.stop()),e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let Xs=!1,Ct=null,Et=null;function hv({getLocalStream:n,getFacingMode:e}){return Ct&&Et&&Ct.removeEventListener("change",Et),Ct=window.matchMedia("(orientation: portrait)"),Et=()=>{try{const t=typeof n=="function"?n():null,i=typeof e=="function"?e():"user";fv({localStream:t,currentFacingMode:i})}catch(t){console.error("Orientation handler failed:",t)}},Ct.addEventListener("change",Et),()=>{Ct&&Et&&Ct.removeEventListener("change",Et),Ct=null,Et=null}}async function fv({localStream:n,currentFacingMode:e}){if(!(Xs||!n?.getVideoTracks()[0])){Xs=!0;try{const t=n.getVideoTracks()[0],i=ta(e);le("Applying constraints:",i),await t.applyConstraints(i),le("Video constraints updated successfully")}catch(t){console.error("Failed to apply orientation constraints:",t)}finally{Xs=!1}}}let rt=null,ot=null,yd="user";function Rc(){return yd}function pv(n){yd=n}function na(n=!0){return!rt||!(rt instanceof MediaStream)?(n&&console.error("Invalid remote MediaStream accessed:",rt),null):rt}function gv(n){rt=n}function mv(){rt&&(rt.getTracks().forEach(n=>n.stop()),rt=null)}function ia(n=!0){return!ot||!(ot instanceof MediaStream)?(n&&(console.error("Invalid local MediaStream accessed:",ot),console.error("Call createLocalStream() before accessing local stream.")),null):ot}function Pr(n){ot=n}function _v(){ot&&(ot.getTracks().forEach(n=>n.stop()),ot=null)}let Lr=!1,cs=[];function yv(n,e){if(!e)return;const t=e.getAudioTracks()[0];t&&(t.enabled=n)}function vv(n,e,t){t&&(t.muted=!n,t.volume=e)}function wv(n,e){const t=e.querySelector("i");t.className=n?"fa fa-microphone-slash":"fa fa-microphone"}function Cv(n,e){if(!n)return;const t=()=>{if(n.muted!==Lr){const i=e.querySelector("i");i.className=n.muted?"fa fa-volume-mute":"fa fa-volume-up",Lr=n.muted}};n.addEventListener("volumechange",t),cs.push(()=>{n&&n.removeEventListener("volumechange",t)})}function Ev({getLocalStream:n,getLocalVideo:e,getRemoteVideo:t,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l}){r&&(r.onclick=()=>{const d=n(),h=e();if(!h||!d)return;const f=!h.muted;yv(!f,d),vv(!f,0,h),wv(f,r)}),o&&(o.onclick=()=>{const d=n();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}});const u=hv({getLocalStream:n,getFacingMode:Rc});cs.push(u),a&&(a.onclick=async()=>{const d=await dv({localStream:n(),localVideo:e(),currentFacingMode:Rc(),peerConnection:i()||null});d?(pv(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof s=="function"&&s(d.newStream)):console.error("Camera switch failed.")},(async()=>await uv()?b(a):v(a))()),c&&(c.onclick=()=>{const d=t();d&&(d.muted=!d.muted)}),l&&(l.onclick=()=>{const d=t();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()})}function bv(){cs.forEach(n=>n()),cs=[],Lr=!1}const Ac="yt-video-box",Or="yt-player-root";let B=null,Je=!1;const Bn=()=>B,Iv=()=>Je,vd=n=>Je=n,Xt=()=>{const n=document.getElementById(Ac);if(!n)throw new Error(`Container #${Ac} not found`);return n};function Sv(){return new Promise(n=>{window.YT&&window.YT.Player?n():window.onYouTubeIframeAPIReady=()=>{n()}})}function wd(){const n=Xt();if(!document.getElementById(Or)){const e=document.createElement("div");e.id=Or,n.appendChild(e)}b(n)}function Dr(){const n=Xt();v(n)}function Zs(){const n=Xt();return n&&!n.classList.contains("hidden")}function Mr(n){return n?n.includes("youtube.com")||n.includes("youtu.be"):!1}function Cd(n){if(!n)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const t of e){const i=n.match(t);if(i&&i[1])return i[1]}return null}async function Tv({url:n,onReady:e,onStateChange:t}){const i=Cd(n);if(!i)throw new Error("Invalid YouTube URL");if(await Sv(),B){try{B.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}B=null}const s=(o=!0)=>{const a=Xt(),c=B.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Xt(),h=B.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),B.getPlayerState()!==window.YT.PlayerState.PLAYING?ra():Ds()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Xt(),a=B.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return wd(),new Promise((o,a)=>{try{B=new window.YT.Player(Or,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Je=!0,e&&e(c),o(B)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),t&&t(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function sa(){if(B){try{Dr(),B.destroy()}catch(n){console.warn("Error destroying YouTube player:",n)}B=null,Je=!1}}function ra(){B&&Je&&B.playVideo()}function Ds(){B&&Je&&B.pauseVideo()}function kv(n){B&&Je&&B.seekTo(n,!0)}function ls(){return B&&Je?B.getCurrentTime():0}function oa(){return B&&Je?B.getPlayerState():-1}const at={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Ae=null,mi=null,Ed=!1,_e="none",aa=null;const _i=()=>Ed,bd=n=>Ed=n,An=()=>_e,Rv=n=>{["yt","url","none"].includes(n)?_e=n:console.warn("Invalid lastWatched platform:",n)};let ct=!1,Wn=null,Vn=0;async function Zt(n){if(!Ae)return;console.debug("Updating watch sync state, roomId:",Ae);const e=ks(Ae);try{await Ti(e,{...n,updatedBy:mi})}catch(t){console.error("Failed to update watch state:",t)}}function Av(n,e,t){if(!n)return;Ae=n,mi=t;const i=ks(n);ki(i,Nv,n),Fv()}function Nv(n){const e=n.val();e&&e.updatedBy!==mi&&(Date.now()-Vn<500||(e.url&&e.url!==aa&&Pv(e.url),e.isYouTube?Lv(e):xv(e)))}function Pv(n){aa=n,Mr(n)?(v(pe),Id(n),_e="yt"):(sa(),b(pe),W.src=n,_e="url")}function Lv(n){!Bn()||!Iv()||(Ov(n),Dv(n))}function Ov(n){const e=oa(),t=e===at.PLAYING;if([at.BUFFERING,at.UNSTARTED].includes(e)){Mv();return}ct||(n.playing&&!t?(ra(),_e="yt"):!n.playing&&t&&(Ds(),_e="yt"))}function Dv(n){if(n.currentTime===void 0)return;const e=ls();Math.abs(e-n.currentTime)>.3&&!ct&&(kv(n.currentTime),setTimeout(()=>{n.playing?ra():Ds(),_e="yt"},500))}function Mv(){ct=!0,clearTimeout(Wn),Wn=setTimeout(async()=>{ct=!1;const n=oa()===at.PLAYING;await Zt({playing:n,currentTime:ls()})},700)}function xv(n){n.playing!==void 0&&(n.playing&&W.paused?W.play().catch(e=>console.warn("Play failed:",e)):!n.playing&&!W.paused&&W.pause()),n.currentTime!==void 0&&Math.abs(W.currentTime-n.currentTime)>1&&(W.currentTime=n.currentTime,n.playing?W.play().catch(t=>console.warn("Play failed:",t)):W.pause())}function Fv(){W.addEventListener("play",async()=>{!Bn()&&Ae&&(Vn=Date.now(),await Zt({playing:!0,isYouTube:!1})),_e="url"}),W.addEventListener("pause",async()=>{!Bn()&&Ae&&(Vn=Date.now(),await Zt({playing:!1,isYouTube:!1})),_e="url"}),W.addEventListener("seeked",async()=>{!Bn()&&Ae&&(Vn=Date.now(),await Zt({currentTime:W.currentTime,playing:!W.paused,isYouTube:!1})),_e="url"})}async function Uv(n){if(!n)return!1;if(Vn=Date.now(),Mr(n)){if(v(pe),!await Id(n))return!1;_e="yt"}else sa(),b(pe),W.src=n,_e="url";if(Ae){const e=ks(Ae);Ye(e,{url:n,playing:!1,currentTime:0,isYouTube:Mr(n),updatedBy:mi})}return!0}async function Ht(n){if(!n||!n.url)return console.warn("Non-existing or invalid video."),!1;aa=n.url;const e=await Uv(n.url);return Br(),e}async function Id(n){if(!Cd(n))return console.error("Invalid YouTube URL:",n),!1;try{return await Tv({url:n,onReady:t=>{if(vd(!0),Ae){const i=ks(Ae);Ye(i,{url:n,playing:!1,currentTime:0,isYouTube:!0,updatedBy:mi})}},onStateChange:async t=>{if(!Bn())return;const s=t.data===at.PLAYING,r=t.data===at.PAUSED;if(t.data===at.BUFFERING){ct=!0,Wn&&clearTimeout(Wn),Wn=setTimeout(async()=>{ct=!1;const c=oa()===at.PLAYING;await Zt({playing:c,currentTime:ls()})},700);return}r&&ct||!ct&&(s||r)&&await Zt({playing:s,currentTime:ls()})}}),!0}catch(t){return console.error("Failed to load YouTube video:",t),!1}}let er=null,it=null,F=null,D=null,Nc=!1,bi=!1,Oe=[],xr="",te=-1,Fr=[];const Bv="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ",Wv="https://www.googleapis.com/youtube/v3";async function Vv(){if(Nc||bi)return!1;bi=!0;const{initializeYouTubeElements:n}=await jt(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>Hy);return{initializeYouTubeElements:o}},void 0),e=await n();if(er=e.searchContainer,it=e.searchBtn,F=e.searchQuery,D=e.searchResults,!er||!it||!F||!D)return console.error("YouTube search elements not found in DOM"),bi=!1,!1;const t=o=>/^https?:\/\//i.test(o),i=o=>{(D?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),te=o??-1};it.onclick=async()=>{const o=F.value.trim();if(Ho(F)){b(F),F.focus();return}if(!o){Li(),v(F);return}if(Oc()&&o===xr)Ur(Oe);else if(!t(o))await Pc(o);else{Ht&&await Ht({url:o}),v(D),F.value="",v(F),te=-1;return}},er.addEventListener("keydown",async o=>{const a=D.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=te+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=te-1;c<0&&(c=te===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&te>=0){a[te].click(),v(F),v(D),te=-1;return}const c=F.value.trim();if(c)if(Oc()&&c===xr)Ur(Oe);else if(!t(c))await Pc(c);else{Ht&&await Ht({url:c}),v(D),te=-1,F.value="",v(F);return}}else o.key==="Escape"&&(Hv()?Li():F.value?F.value="":v(F))}),F.addEventListener("input",()=>{F.value.trim()===""&&Li(),te=-1});const s=Ar(F,()=>v(F),{ignore:[it],esc:!1});Fr.push(s);const r=Ar(D,()=>v(D),{ignore:[it],esc:!1});return Fr.push(r),bi=!1,Nc=!0,!0}async function Pc(n){if(!it||!D){console.error("Search elements not initialized");return}Oe=[],xr=n,it.disabled=!0,D.innerHTML='<div class="search-loading">Searching YouTube...</div>',b(D);try{const e=await fetch(`${Wv}/search?part=snippet&maxResults=10&q=${encodeURIComponent(n)}&type=video&key=${Bv}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const t=await e.json();if(!t.items||t.items.length===0){Lc("No videos found"),Oe=[];return}Oe=t.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Ur(Oe)}catch(e){console.error("YouTube search failed:",e),Lc(e.message||"Search failed. Please try again.")}finally{it.disabled=!1}}function Ur(n){if(!D){console.error("Search results element not initialized");return}if(!n||n.length===0){D.innerHTML='<div class="no-results">No results found</div>',Oe=[],te=-1;return}D.innerHTML="",n.forEach(t=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${t.thumbnail}" alt="${t.title}" class="result-thumbnail">
      <div class="result-info">
        <div class="result-title">${t.title}</div>
        <div class="result-channel">${t.channel}</div>
      </div>
    `,i.onclick=async()=>{if(Ht){if(await Ht(t),v(D),te=-1,!F){console.error("Search query element not initialized");return}F.value="",v(F)}},D.appendChild(i)}),b(D),te=0,D.querySelectorAll(".search-result-item").forEach((t,i)=>{i===te?(t.classList.add("focused"),t.scrollIntoView({block:"nearest"})):t.classList.remove("focused")})}function Lc(n){if(Oe=[],te=-1,!D){console.error("Search results element not initialized");return}D.innerHTML=`<div class="search-error">${n}</div>`,b(D)}function Li(){Oe=[],te=-1,D&&(D.innerHTML="",v(D))}function $v(){Li(),Fr.forEach(n=>n())}function Hv(){return!Ho(D)}function Oc(){return Oe.length>0}const jv=n=>String(n).replace(/[&<>"'`=\/]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[t]),Gv=(n,e)=>n.replace(/\$\{([^}]+)\}/g,(t,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):jv(String(r))}),zv=(n,e={})=>{const t=document.createElement("template");return t.innerHTML=Gv(n,e),t.content.cloneNode(!0)},qv=(n,e)=>{const t=[];let i=e;for(;i&&i!==n;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);t.push(r),i=s}return t.reverse()},Yv=(n,e)=>e.reduce((t,i)=>t&&t.children?t.children[i]:null,n),Kv=n=>Array.from(n.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:qv(n,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),Jv=n=>n.replace(/["'\\]/g,"\\$&"),Qv=(n,e)=>{e.forEach(t=>{let i=null;if(t.name){const s=Jv(t.name);i=n.querySelector(`input[name="${s}"], textarea[name="${s}"], select[name="${s}"]`)}else t.id?i=n.querySelector(`#${t.id}`):t.path&&(i=Yv(n,t.path));if(i){if(i.value=t.value,t.checked!==void 0&&(i.checked=t.checked),t.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(t.selectionStart,t.selectionEnd)}catch{}if(t.wasFocused)try{i.focus()}catch{}}})},Xv=n=>Array.from(n.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),Zv=(n,e)=>{const t=n.querySelectorAll("video, audio");for(const i of t)if(i.currentSrc===e||i.src===e)return i;return null},ew=(n,e)=>{e.forEach(t=>{if(!t.src)return;const i=Zv(n,t.src);i&&(i.currentTime=t.currentTime,i.volume=t.volume,i.playbackRate=t.playbackRate,i.muted=t.muted,t.paused||i.play().catch(()=>{}))})},tw=()=>document.readyState!=="loading",Sd=({initialProps:n={},template:e="",handlers:t={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!tw())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...n};const h=new Set,f=/\$\{([^}]+)\}/g;let g;for(;(g=f.exec(e))!==null;){const E=g[1].trim().split(".")[0];h.add(E)}const _=[],m=[],P={},L=()=>{let E=[],ae=[];l&&(E=Kv(u),ae=Xv(u)),u.textContent="";const Qe=zv(e,d);u.appendChild(Qe),Object.keys(t).forEach(Xe=>{const ve=u.querySelectorAll(`[onclick="${Xe}"]`),yi=t[Xe];ve.forEach(ua=>{ua.removeAttribute("onclick"),typeof yi=="function"&&ua.addEventListener("click",yi)})}),l&&(Qv(u,E),ew(u,ae)),_.forEach(Xe=>Xe({...d}))},de=E=>{if(!Array.isArray(E)||E.length===0)return;const ae={props:{...d},changedKeys:E};m.forEach(Qe=>Qe(ae))};for(const E of Object.keys(n))P[E]=[],Object.defineProperty(u,E,{get(){return d[E]},set(ae){d[E]!==ae&&(d[E]=ae,h.has(E)&&L(),P[E].forEach(Qe=>Qe(ae)),de([E]))},configurable:!0,enumerable:!0});if(u.update=E=>{let ae=!1,Qe=!1;const Xe=[];for(const ve in E)E[ve]!==d[ve]&&(d[ve]=E[ve],h.has(ve)&&(Qe=!0),P[ve]&&P[ve].forEach(yi=>yi(E[ve])),ae=!0,Xe.push(ve));ae&&Qe&&L(),Xe.length>0&&de(Xe)},u.onRender=E=>{typeof E=="function"&&_.push(E)},u.onAnyPropUpdated=E=>{typeof E=="function"&&m.push(E)},u.onPropUpdated=(E,ae)=>{typeof ae=="function"&&P[E]&&P[E].push(ae)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(E=>{typeof E=="function"&&E()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const E in P)P[E].length=0;u.remove()},L(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(E){Dy("[createComponent]: Error in onMount handler of component",E)}return u};function nw({title:n="",iconHtml:e="",disabledAttr:t="",id:i="",className:s="",onClick:r=null,onMount:o=null,parent:a=null}={}){return Sd({initialProps:{title:n,iconHtml:e,disabledAttr:t,id:i},template:'\n      <button id="${id}" title="${title}" ${disabledAttr} onclick="handleClick">\n        ${iconHtml}\n      </button>\n    ',className:s,handlers:{handleClick:r},onMount:o,parent:a})}let St=null,Dc=!1,ie=null;function iw(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)&&!window.MSStream}function sw(){if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){console.info("[PWA]: App is already installed"),ie&&v(ie);return}if(!ie){const e=document.querySelector(".top-right-menu");if(!e){console.warn("[PWA]: .top-right-menu container not found");return}ie=nw({id:"install-btn",title:"Install App",iconHtml:'<i class="fa fa-plus"></i>',className:"hidden",onMount:t=>{},parent:e})}const n=ie.querySelector?.("button")??ie;if(!(n instanceof HTMLElement)){console.warn("[PWA]: Install button element not found in component");return}if(iw()){ie.update({iconHtml:'<i class="fa fa-info"></i>',title:"Show Install Instructions"}),b(ie),n.onclick=()=>{alert("Tap the Share icon and choose 'Add to Home Screen' to install this app.")};return}Dc||(n.addEventListener("click",async()=>{if(!St){console.warn("[PWA]: beforeInstallEvent is null - beforeinstallprompt may not have fired"),My({shouldShowInProd:!0});return}try{await St.prompt();const{outcome:e}=await St.userChoice;le(`User choice outcome: ${e}`),console.info(e==="accepted"?"[PWA]: User accepted the install prompt":"[PWA]: User dismissed the install prompt"),!Ly()&&v(ie),St=null}catch(e){v(ie),console.error("Error showing install prompt:",e)}}),Dc=!0),window.addEventListener("appinstalled",()=>{v(ie),St=null}),St?b(ie):v(ie)}window.addEventListener("beforeinstallprompt",n=>{console.debug("[PWA]: beforeinstallprompt fired"),n.preventDefault(),St=n,ie&&b(ie)});const rw=async()=>{const n=ia(!1);if(n&&n instanceof MediaStream)return console.debug("Reusing existing local MediaStream."),n;const e=ta("user"),t=_d();try{const i=await navigator.mediaDevices.getUserMedia({video:e,audio:t});return Pr(i),i}catch(i){if(i.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${i.constraint}, falling back to basic constraints`);const s=rv(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return Pr(r),r}throw i}};async function ow(n){const e=await rw(),t=new MediaStream(e.getVideoTracks());return n.srcObject=t,!0}function aw(n,e,t){return n.ontrack=i=>{if(le(`REMOTE TRACK RECEIVED: ${i.track.kind}`),!i.streams||!i.streams[0]||!(i.streams[0]instanceof MediaStream))return console.error("No valid remote MediaStream found in event.streams:",i.streams),!1;const s=i.streams[0];if(na(!1)!==s){gv(s),e.srcObject=s,Cv(e,t),R("Connected!");try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}}},!0}let Mc=!1;function cw(n,e){const t=document.createElement("dialog");t.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=n,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),t.appendChild(i),{dialog:t,input:o,copyButton:c,cancelButton:l,feedback:u}}function lw(n,e={}){const t={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};uw();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=cw(n,t);dw(i);let c=!1;const l=async()=>{await hw(n,s)?(c=!0,a.textContent=t.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),t.onCopy&&t.onCopy(n),t.autoClose&&setTimeout(()=>{i.close()},t.autoCloseDelay)):(a.textContent=t.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),t.onError&&t.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{t.onCancel&&t.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&t.onCancel&&t.onCancel(),t.onClose&&t.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function uw(){if(Mc)return;const n=document.createElement("style");n.textContent=`
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
  `,document.head.appendChild(n),Mc=!0}function dw(n){n.showModal||(n.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},n.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function hw(n,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(n),!0}catch(t){return console.warn("Clipboard API failed, using fallback:",t),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(t){return console.error("Fallback copy failed:",t),!1}}let Nn=null;const fw=n=>{if(Nn)return Nn;if(!n)return console.error("Auth UI: Parent element is required"),null;let e=null;return Nn=Sd({initialProps:{isLoggedIn:!1,userName:"Guest User",loginDisabledAttr:"",logoutDisabledAttr:"disabled"},template:`
      <button id="goog-login-btn" onclick="handleLogin" \${loginDisabledAttr}>Login</button>
      <button id="goog-logout-btn" onclick="handleLogout" \${logoutDisabledAttr}>Logout</button>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:Xu,handleLogout:Zu},onMount:t=>{e=Vo(({isLoggedIn:i,userName:s})=>{t.update({isLoggedIn:i,userName:s,loginDisabledAttr:i?"disabled":"",logoutDisabledAttr:i?"":"disabled"})})},onCleanup:()=>{e&&(e(),e=null),Nn=null},className:"auth flex-row",parent:n}),Nn};Oy(!0);y().disable();let ti=[];const us=()=>{const n=na(!1);return n&&n.getVideoTracks().some(e=>e.enabled)};async function pw(){gw();const n=nd(),t=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!n[i]);if(t.length>0)return console.error("Critical elements missing:",t),R("Error: Required UI elements not found."),!1;try{sw(),Vv(),vw();const i=fw(Ps);return i&&ti.push(i.dispose),await ds(),!0}catch(i){return console.error("Failed to get user media:",i),R("Error: Please allow camera and microphone access."),!1}}function Ms(){window.history.replaceState({},document.title,window.location.pathname)}let xc=!1;async function ds(){xc||(xc=!0,await ow(be),Ev({getLocalStream:ia,getLocalVideo:()=>be,getRemoteVideo:()=>Y,getPeerConnection:()=>J.getState().pc,setLocalStream:Pr,micBtn:En,cameraBtn:bn,switchCameraBtn:Cn,mutePartnerBtn:Pe,fullscreenPartnerBtn:Os}),be&&(be.addEventListener("enterpictureinpicture",()=>K&&v(K)),be.addEventListener("leavepictureinpicture",()=>{K&&!(_i()&&us())&&b(K)})))}function gw(){v(U),v(K),v(pe),v(fe)}function Oi(n=null){return{localStream:ia(),remoteVideoEl:Y,mutePartnerBtn:Pe,setupRemoteStream:aw,setupWatchSync:Av,targetRoomId:n}}function Di(n,e=!1){return n.success?(e&&n.roomLink&&lw(n.roomLink,{onCopy:()=>R("Link ready! Share with your partner."),onCancel:()=>R("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function ca(n,{forceInitiator:e=!1}={}){const t=Date.now();if(e){y().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await ds();const r=await J.createCall(Oi(n));return Di(r,!1)}let i=await V.checkRoomStatus(n);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await V.checkRoomStatus(n),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(n,!0,{creationTime:t,listenerAttachTime:t,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0}),await ds();const r=await J.createCall(Oi(n));return Di(r,!0)}R("Joining room..."),y().log("ROOM","JOINING_EXISTING",{roomId:n,memberCount:i.memberCount,roomExists:i.exists});const s=await J.answerCall({roomId:n,...Oi()});return Di(s,!1)}const he=new Set,Td=new Map;function Fc(n){n&&(Ts(n),he.delete(n),Td.delete(n),y().log("LISTENER","INCOMING_CLEANUP",{roomId:n,remainingListeners:he.size}))}function mw(){le(`[LISTENER] Removing all incoming listeners (${he.size} rooms)`);const n=Array.from(he);n.forEach(e=>{Ts(e)}),he.clear(),Td.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:n.length})}async function _w(n){const e=Date.now(),t=e+1440*60*1e3,i=We();if(i){const s=Ao(i,n);await Ye(s,{roomId:n,savedAt:e,expiresAt:t});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[n]={roomId:n,savedAt:e,expiresAt:t},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function tr(n){const e=We();if(e){try{await un(Ao(e,n))}catch(t){console.warn("Failed to remove recent call from RTDB",t)}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t);i[n]&&(delete i[n],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(t){console.warn("Failed to remove recent call from localStorage",t)}}function ni(n){n&&(he.has(n)&&(he.delete(n),Ts(n)),le(`[LISTENER] Attaching listener for room: ${n} (total: ${he.size+1})`),he.add(n),y().logListenerAttachment(n,"member_join",he.size,{action:"incoming_call_listener_attached"}),V.onMemberJoined(n,async e=>{const t=e.key,i=e.val?e.val():null,s=ne();if(t&&t!==s){y().logMemberJoinEvent(n,t,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const L=await od(t,n),de=await ad(n);a=L||de,c=L?"outgoingState":de?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(t,n,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",n,{age:l,validationMethod:c,joiningUserId:t});return}let d;try{d=await V.getRoomData(n)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,g=d.createdBy;if(!h||f||g===s)return;const _=J.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",n,{joiningUserId:t,currentCallState:_.pc?.connectionState});return}if(y().logNotificationDecision("SHOW","fresh_call_detected",n,{joiningUserId:t,freshnessResult:u}),await Jo(`Incoming call from ${t} for room ${n}.

Accept?`))Fc(n),y().logNotificationDecision("ACCEPT","user_accepted",n,{joiningUserId:t}),ca(n).catch(L=>{console.warn("Failed to answer incoming call:",L),R("Failed to answer incoming call."),y().logFirebaseOperation("join_room_on_accept",!1,L,{roomId:n,joiningUserId:t})});else{y().logNotificationDecision("REJECT","user_rejected",n,{joiningUserId:t});try{await V.rejectCall(n,ne(),"user_rejected")}catch(L){console.warn("Failed to signal rejection via RTDB:",L)}await tr(n).catch(L=>{console.warn("Failed to remove recent call on rejection:",L)})}}}),V.onCallCancelled(n,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await jt(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>Ky);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await tr(n).catch(()=>{})}}),V.onMemberLeft(n,async e=>{const t=e.key,i=ne();if(!(!t||t===i))try{(await V.checkRoomStatus(n)).hasMembers||(await tr(n),Fc(n),le(`Removed saved recent call and listeners for room ${n} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function Uc(){const n=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:n,currentListenerCount:he.size});try{if(typeof window<"u"){const{getCurrentUserAsync:t}=await jt(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>Vy);return{getCurrentUserAsync:i}},void 0);await t()}}catch{}const e=We();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const t=Lm(e);try{const i=await Nt(t),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await un(Ao(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await as();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>ni(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:he.size,duration:Date.now()-n})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const t=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(t),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await as();Object.values(o||{}).forEach(a=>{a?.roomId&&r.add(a.roomId)})}catch{}r.forEach(o=>ni(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:he.size,duration:Date.now()-n,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(t){console.warn("Failed to read recent calls from localStorage",t),y().logFirebaseOperation("read_recent_calls",!1,t,{storage:"localStorage"})}}let ii=!1,Me=null,nr=null,ir=null;function yw(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}let Ii=!1,la=()=>{if(ii)return;const n=na(!1);if(!Y||!n||Y.paused||Y.readyState<2){Ii||(Ii=!0,Y.addEventListener("playing",()=>{Ii=!1,la()},{once:!0}));return}if(Ii=!1,ii=!0,b(U),b(K),Lt(K),v(Fe),v(vt),ge.disabled=!0,ge.classList.add("disabled"),Ne.disabled=!1,Ne.classList.remove("disabled"),Pe.disabled=!1,Pe.classList.remove("disabled"),Me||(Me=rd(fe,{inactivityMs:2500,hideOnEsc:!0})),!nr){const e=()=>{_i()?Lt(U):At(U),b(U)};Y.addEventListener("leavepictureinpicture",e),nr=()=>Y.removeEventListener("leavepictureinpicture",e),ti.push(nr)}if(!ir){const e=()=>v(U);Y.addEventListener("enterpictureinpicture",e),ir=()=>Y.removeEventListener("enterpictureinpicture",e),ti.push(ir)}},kd=(n=!1)=>{!ii&&!n||(ii=!1,At(U),v(U),Lt(K),b(K),ge.disabled=!1,ge.classList.remove("disabled"),b(vt),Ne.disabled=!0,Ne.classList.add("disabled"),Pe.disabled=!0,Pe.classList.add("disabled"),Me&&(Me(),Me=null),b(fe),b(Fe))};function Br(){if(!_i()){if(bd(!0),v(Fe),fe.classList.remove("bottom"),fe.classList.add("watch-mode"),ii?(v(ge),b(Ne)):(v(Ne),v(En),v(Pe),b(ge)),v(vt),v(bn),v(Cn),b(fe),Me&&(Me(),Me=null),!us()){v(U),At(U),Rr(be)||(b(K),Lt(K));return}v(K),At(K),Rr(Y)?(v(U),At(U)):yw()?Y.requestPictureInPicture().then(()=>{v(U),At(U)}).catch(n=>{console.warn("Failed to enter Picture-in-Picture:",n),Lt(U),b(U)}):(Lt(U),b(U))}}function Mi(){_i()&&(b(ge),b(Ne),b(En),b(Pe),b(ge),b(bn),b(Cn),fe.classList.remove("watch-mode"),fe.classList.add("bottom"),b(fe),Me||(Me=rd(fe,{inactivityMs:3e3,hideOnEsc:!0})),us()&&(Rr(Y)&&document.exitPictureInPicture().catch(n=>{console.error("Failed to exit Picture-in-Picture:",n)}),At(U),b(U)),Lt(K),b(K),us()||(b(Fe),b(vt)),bd(!1))}function sr(){return W&&pe&&!pe.classList.contains("hidden")&&W.src&&W.src.trim()!==""}let Bc=!1;function vw(){if(Bc)return;const n=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{if(!n()&&((e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",An()),console.log("isYTVisible():",Zs()),console.log("isSharedVideoVisible():",sr()),console.log("isWatchModeActive():",_i()),An()==="yt"?Zs()?(Dr(),Mi()):(wd(),Br()):An()==="url"&&(sr()?(v(pe),Mi()):(b(pe),Br()))),e.key==="m"||e.key==="M")){const t=J.getState();t.messagesUI&&t.messagesUI.toggleMessages()}e.key==="Escape"&&(An()==="yt"&&Zs()?(Ds(),Dr()):An()==="url"&&sr()&&(W.pause(),v(pe)),Mi())}),Bc=!0}const Rd=async()=>{await ds();const n=await J.createCall(Oi());Di(n,!0)};ge.onclick=Rd;vt.onclick=Rd;Ne.onclick=async()=>{console.debug("Hanging up..."),await J.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function ww(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const t=await ca(e);return t||(Ms(),kd()),R("Auto-joined room from URL"),t}window.onload=async()=>{if(!await pw()){ge.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await Uc().catch(i=>console.warn("Failed to start saved-room listeners",i)),Zn(Fe).catch(i=>{console.warn("Failed to render contacts list:",i)});const e=Vo(async({isLoggedIn:i})=>{try{await Zn(Fe),i?(le("[AUTH] User logged in - re-attaching incoming listeners"),await Uc().catch(s=>console.warn("Failed to re-attach saved-room listeners on login",s))):(le("[AUTH] User logged out - cleaning up incoming listeners"),mw())}catch(s){console.warn("Failed to handle auth change:",s)}});ti.push(()=>{try{typeof e=="function"&&e()}catch{}}),!await ww()&&R('Ready. Click "Start New Chat" to begin.')};window.addEventListener("beforeunload",async n=>{const e=J.getState();if(e.pc&&e.pc.connectionState==="connected")return n.preventDefault(),n.returnValue="You are in an active call. Are you sure you want to leave?",n.returnValue;await Cw()});J.on("memberJoined",({memberId:n,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:n,roomId:e}),J.setPartnerId(n),la(),Ko().catch(t=>console.warn("Failed to clear calling state:",t)),_w(e).catch(t=>console.warn("Failed to save recent call:",t))});J.on("memberLeft",({memberId:n})=>{console.debug("CallController memberLeft event",{memberId:n}),console.info("Partner has left the call")});J.on("cleanup",({roomId:n,reason:e})=>{console.debug("CallController cleanup event",{roomId:n,reason:e}),pt(),mv(),kd(),R('Disconnected. Click "Start New Chat" to begin.'),Ms()});J.on("cleanup",({roomId:n,partnerId:e,reason:t})=>{console.debug("CallController cleanup event",{roomId:n,partnerId:e,reason:t}),e&&n&&setTimeout(()=>{Jy(e,n,Fe).catch(i=>{console.warn("Failed to save contact after cleanup:",i)})},500)});async function Cw(){await J.hangUp({emitCancel:!0,reason:"page_unload"}),bv(),Am(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const n=J.getState();n.messagesUI&&n.messagesUI.cleanup&&n.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),W.src="",Ls.textContent="",_v(),be&&(be.srcObject=null),Y&&(Y.srcObject=null),Mi(),Ms(),Rv("none"),sa(),vd(!1),$v(),ti.forEach(e=>e())}
