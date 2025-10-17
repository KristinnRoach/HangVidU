(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const An=document.getElementById("localVideo"),G=document.getElementById("remoteVideo"),wt=document.getElementById("sharedVideo"),be=document.getElementById("startChat"),nn=document.getElementById("hangUp"),Yi=document.getElementById("copyLink"),lt=document.getElementById("pipBtn"),$o=document.getElementById("switchCameraSelfBtn"),$s=document.getElementById("toggleMode"),qo=document.getElementById("loadStream"),Go=document.getElementById("status"),Dn=document.getElementById("linkContainer"),qs=document.getElementById("watchContainer"),Gs=document.querySelector(".video-container"),Et=document.getElementById("syncStatus"),ni=document.getElementById("shareLink"),qe=document.getElementById("streamUrl"),Yo=document.getElementById("mutePartnerBtn"),jo=document.getElementById("fullscreenPartnerBtn"),zo=document.getElementById("muteSelfBtn"),Ko=document.getElementById("videoSelfBtn"),Qo=document.getElementById("fullscreenSelfBtn");document.getElementById("titleHeader");const Ys=document.getElementById("titleLink");document.getElementById("titleText");const js="hangvidu_session",Xo=1440*60*1e3;function Jo(){const n=localStorage.getItem(js);if(!n)return null;try{const e=JSON.parse(n);return Date.now()-e.timestamp>Xo?(xn(),null):e}catch(e){return console.error("Failed to parse stored state:",e),xn(),null}}function xn(){localStorage.removeItem(js)}/**
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
 */const Zo=()=>{};var ji={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw Ge(e)},Ge=function(n){return new Error("Firebase Database ("+zs.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ea=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ii={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(h=64)),i.push(t[u],t[d],t[h],t[m])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Ks(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ea(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new ta;const h=r<<2|a>>4;if(i.push(h),l!==64){const m=a<<4&240|l>>2;if(i.push(m),d!==64){const _=l<<6&192|d;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ta extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Qs=function(n){const e=Ks(n);return ii.encodeByteArray(e,!0)},Bt=function(n){return Qs(n).replace(/\./g,"")},Mn=function(n){try{return ii.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function na(n){return Xs(void 0,n)}function Xs(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ia(t)||(n[t]=Xs(n[t],e[t]));return n}function ia(n){return n!=="__proto__"}/**
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
 */function sa(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ra=()=>sa().__FIREBASE_DEFAULTS__,oa=()=>{if(typeof process>"u"||typeof ji>"u")return;const n=ji.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},aa=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Mn(n[1]);return e&&JSON.parse(e)},Js=()=>{try{return Zo()||ra()||oa()||aa()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ca=n=>Js()?.emulatorHosts?.[n],la=n=>{const e=ca(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Zs=()=>Js()?.config;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function si(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ua(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function ha(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Bt(JSON.stringify(t)),Bt(JSON.stringify(o)),""].join(".")}const tt={};function da(){const n={prod:[],emulator:[]};for(const e of Object.keys(tt))tt[e]?n.emulator.push(e):n.prod.push(e);return n}function fa(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let zi=!1;function pa(n,e){if(typeof window>"u"||typeof document>"u"||!si(window.location.host)||tt[n]===e||tt[n]||zi)return;tt[n]=e;function t(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=da().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,m){h.setAttribute("width","24"),h.setAttribute("id",m),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{zi=!0,o()},h}function u(h,m){h.setAttribute("id",m),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=fa(i),m=t("text"),_=document.getElementById(m)||document.createElement("span"),E=t("learnmore"),L=document.getElementById(E)||document.createElement("a"),te=t("preprendIcon"),ne=document.getElementById(te)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const ye=h.element;a(ye),u(L,E);const Cn=l();c(ne,te),ye.append(ne,_,L,Cn),document.body.appendChild(ye)}r?(_.innerText="Preview backend disconnected.",ne.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
</defs>`,_.innerText="Preview backend running in this workspace."),_.setAttribute("id",m)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ma(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function er(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ma())}function _a(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ga(){return zs.NODE_ADMIN===!0}function ya(){try{return typeof indexedDB=="object"}catch{return!1}}function Ca(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va="FirebaseError";class St extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=va,Object.setPrototypeOf(this,St.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,tr.prototype.create)}}class tr{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?wa(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new St(s,a,i)}}function wa(n,e){return n.replace(Ea,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Ea=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(n){return JSON.parse(n)}function F(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=ut(Mn(r[0])||""),t=ut(Mn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},ba=function(n){const e=nr(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Sa=function(n){const e=nr(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Oe(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ki(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vt(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ut(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Qi(r)&&Qi(o)){if(!Ut(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Qi(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function sn(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ra=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},rn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function Pe(n){return n&&n._delegate?n._delegate:n}class ht{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */class Pa{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new bt;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Na(e))try{this.getOrInitializeService({instanceIdentifier:Ce})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ce){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ce){return this.instances.has(e)}getOptions(e=Ce){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ka(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ce){return this.component?this.component.multipleInstances?e:Ce:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ka(n){return n===Ce?void 0:n}function Na(n){return n.instantiationMode==="EAGER"}/**
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
 */class Aa{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Pa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var T;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(T||(T={}));const Da={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},xa=T.INFO,Ma={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},La=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ma[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ir{constructor(e){this.name=e,this._logLevel=xa,this._logHandler=La,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in T))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Da[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...e),this._logHandler(this,T.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...e),this._logHandler(this,T.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,T.INFO,...e),this._logHandler(this,T.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,T.WARN,...e),this._logHandler(this,T.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...e),this._logHandler(this,T.ERROR,...e)}}const Oa=(n,e)=>e.some(t=>n instanceof t);let Xi,Ji;function Fa(){return Xi||(Xi=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ba(){return Ji||(Ji=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const sr=new WeakMap,Ln=new WeakMap,rr=new WeakMap,vn=new WeakMap,ri=new WeakMap;function Va(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(le(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&sr.set(t,n)}).catch(()=>{}),ri.set(e,n),e}function Ua(n){if(Ln.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ln.set(n,e)}let On={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ln.get(n);if(e==="objectStoreNames")return n.objectStoreNames||rr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return le(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Wa(n){On=n(On)}function Ha(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(wn(this),e,...t);return rr.set(i,e.sort?e.sort():[e]),le(i)}:Ba().includes(n)?function(...e){return n.apply(wn(this),e),le(sr.get(this))}:function(...e){return le(n.apply(wn(this),e))}}function $a(n){return typeof n=="function"?Ha(n):(n instanceof IDBTransaction&&Ua(n),Oa(n,Fa())?new Proxy(n,On):n)}function le(n){if(n instanceof IDBRequest)return Va(n);if(vn.has(n))return vn.get(n);const e=$a(n);return e!==n&&(vn.set(n,e),ri.set(e,n)),e}const wn=n=>ri.get(n);function qa(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=le(o);return i&&o.addEventListener("upgradeneeded",c=>{i(le(o.result),c.oldVersion,c.newVersion,le(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Ga=["get","getKey","getAll","getAllKeys","count"],Ya=["put","add","delete","clear"],En=new Map;function Zi(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(En.get(e))return En.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Ya.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ga.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return En.set(e,r),r}Wa(n=>({...n,get:(e,t,i)=>Zi(e,t)||n.get(e,t,i),has:(e,t)=>!!Zi(e,t)||n.has(e,t)}));/**
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
 */class ja{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(za(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function za(n){return n.getComponent()?.type==="VERSION"}const Fn="@firebase/app",es="0.14.4";/**
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
 */const oe=new ir("@firebase/app"),Ka="@firebase/app-compat",Qa="@firebase/analytics-compat",Xa="@firebase/analytics",Ja="@firebase/app-check-compat",Za="@firebase/app-check",ec="@firebase/auth",tc="@firebase/auth-compat",nc="@firebase/database",ic="@firebase/data-connect",sc="@firebase/database-compat",rc="@firebase/functions",oc="@firebase/functions-compat",ac="@firebase/installations",cc="@firebase/installations-compat",lc="@firebase/messaging",uc="@firebase/messaging-compat",hc="@firebase/performance",dc="@firebase/performance-compat",fc="@firebase/remote-config",pc="@firebase/remote-config-compat",mc="@firebase/storage",_c="@firebase/storage-compat",gc="@firebase/firestore",yc="@firebase/ai",Cc="@firebase/firestore-compat",vc="firebase",wc="12.4.0";/**
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
 */const Bn="[DEFAULT]",Ec={[Fn]:"fire-core",[Ka]:"fire-core-compat",[Xa]:"fire-analytics",[Qa]:"fire-analytics-compat",[Za]:"fire-app-check",[Ja]:"fire-app-check-compat",[ec]:"fire-auth",[tc]:"fire-auth-compat",[nc]:"fire-rtdb",[ic]:"fire-data-connect",[sc]:"fire-rtdb-compat",[rc]:"fire-fn",[oc]:"fire-fn-compat",[ac]:"fire-iid",[cc]:"fire-iid-compat",[lc]:"fire-fcm",[uc]:"fire-fcm-compat",[hc]:"fire-perf",[dc]:"fire-perf-compat",[fc]:"fire-rc",[pc]:"fire-rc-compat",[mc]:"fire-gcs",[_c]:"fire-gcs-compat",[gc]:"fire-fst",[Cc]:"fire-fst-compat",[yc]:"fire-vertex","fire-js":"fire-js",[vc]:"fire-js-all"};/**
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
 */const Wt=new Map,bc=new Map,Vn=new Map;function ts(n,e){try{n.container.addComponent(e)}catch(t){oe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ht(n){const e=n.name;if(Vn.has(e))return oe.debug(`There were multiple attempts to register component ${e}.`),!1;Vn.set(e,n);for(const t of Wt.values())ts(t,n);for(const t of bc.values())ts(t,n);return!0}function Sc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ic(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Tc={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ue=new tr("app","Firebase",Tc);/**
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
 */class Rc{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new ht("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ue.create("app-deleted",{appName:this._name})}}/**
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
 */const Pc=wc;function or(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Bn,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ue.create("bad-app-name",{appName:String(s)});if(t||(t=Zs()),!t)throw ue.create("no-options");const r=Wt.get(s);if(r){if(Ut(t,r.options)&&Ut(i,r.config))return r;throw ue.create("duplicate-app",{appName:s})}const o=new Aa(s);for(const c of Vn.values())o.addComponent(c);const a=new Rc(t,i,o);return Wt.set(s,a),a}function kc(n=Bn){const e=Wt.get(n);if(!e&&n===Bn&&Zs())return or();if(!e)throw ue.create("no-app",{appName:n});return e}function xe(n,e,t){let i=Ec[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),oe.warn(o.join(" "));return}Ht(new ht(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Nc="firebase-heartbeat-database",Ac=1,dt="firebase-heartbeat-store";let bn=null;function ar(){return bn||(bn=qa(Nc,Ac,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(dt)}catch(t){console.warn(t)}}}}).catch(n=>{throw ue.create("idb-open",{originalErrorMessage:n.message})})),bn}async function Dc(n){try{const t=(await ar()).transaction(dt),i=await t.objectStore(dt).get(cr(n));return await t.done,i}catch(e){if(e instanceof St)oe.warn(e.message);else{const t=ue.create("idb-get",{originalErrorMessage:e?.message});oe.warn(t.message)}}}async function ns(n,e){try{const i=(await ar()).transaction(dt,"readwrite");await i.objectStore(dt).put(e,cr(n)),await i.done}catch(t){if(t instanceof St)oe.warn(t.message);else{const i=ue.create("idb-set",{originalErrorMessage:t?.message});oe.warn(i.message)}}}function cr(n){return`${n.name}!${n.options.appId}`}/**
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
 */const xc=1024,Mc=30;class Lc{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Fc(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=is();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Mc){const s=Bc(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){oe.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=is(),{heartbeatsToSend:t,unsentEntries:i}=Oc(this._heartbeatsCache.heartbeats),s=Bt(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return oe.warn(e),""}}}function is(){return new Date().toISOString().substring(0,10)}function Oc(n,e=xc){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),ss(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ss(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Fc{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ya()?Ca().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Dc(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ns(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ns(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ss(n){return Bt(JSON.stringify({version:2,heartbeats:n})).length}function Bc(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Vc(n){Ht(new ht("platform-logger",e=>new ja(e),"PRIVATE")),Ht(new ht("heartbeat",e=>new Lc(e),"PRIVATE")),xe(Fn,es,n),xe(Fn,es,"esm2020"),xe("fire-js","")}Vc("");var Uc="firebase",Wc="12.4.0";/**
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
 */xe(Uc,Wc,"app");var rs={};const os="@firebase/database",as="1.1.0";/**
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
 */let lr="";function Hc(n){lr=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),F(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ut(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Z(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new $c(e)}}catch{}return new qc},we=ur("localStorage"),Gc=ur("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me=new ir("@firebase/database"),Yc=(function(){let n=1;return function(){return n++}})(),hr=function(n){const e=Ra(n),t=new Ta;t.update(e);const i=t.digest();return ii.encodeByteArray(i)},It=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=It.apply(null,i):typeof i=="object"?e+=F(i):e+=i,e+=" "}return e};let nt=null,cs=!0;const jc=function(n,e){p(!0,"Can't turn on custom loggers persistently."),Me.logLevel=T.VERBOSE,nt=Me.log.bind(Me)},U=function(...n){if(cs===!0&&(cs=!1,nt===null&&Gc.get("logging_enabled")===!0&&jc()),nt){const e=It.apply(null,n);nt(e)}},Tt=function(n){return function(...e){U(n,...e)}},Un=function(...n){const e="FIREBASE INTERNAL ERROR: "+It(...n);Me.error(e)},ae=function(...n){const e=`FIREBASE FATAL ERROR: ${It(...n)}`;throw Me.error(e),new Error(e)},$=function(...n){const e="FIREBASE WARNING: "+It(...n);Me.warn(e)},zc=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&$("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},oi=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Kc=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Fe="[MIN_NAME]",Se="[MAX_NAME]",ke=function(n,e){if(n===e)return 0;if(n===Fe||e===Se)return-1;if(e===Fe||n===Se)return 1;{const t=ls(n),i=ls(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Qc=function(n,e){return n===e?0:n<e?-1:1},Qe=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+F(e))},ai=function(n){if(typeof n!="object"||n===null)return F(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=F(e[i]),t+=":",t+=ai(n[e[i]]);return t+="}",t},dr=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function W(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const fr=function(n){p(!oi(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Xc=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Jc=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Zc(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const el=new RegExp("^-?(0*)\\d{1,10}$"),tl=-2147483648,nl=2147483647,ls=function(n){if(el.test(n)){const e=Number(n);if(e>=tl&&e<=nl)return e}return null},Ye=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw $("Exception was thrown by user callback.",t),e},Math.floor(0))}},il=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},it=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class sl{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ic(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){$(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(U("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',$(e)}}class Ot{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ot.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci="5",pr="v",mr="s",_r="r",gr="f",yr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Cr="ls",vr="p",Wn="ac",wr="websocket",Er="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=we.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&we.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ol(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Sr(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===wr)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Er)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ol(n)&&(t.ns=n.namespace);const s=[];return W(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(){this.counters_={}}incrementCounter(e,t=1){Z(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return na(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn={},In={};function li(n){const e=n.toString();return Sn[e]||(Sn[e]=new al),Sn[e]}function cl(n,e){const t=n.toString();return In[t]||(In[t]=e()),In[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ye(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us="start",ul="close",hl="pLPCommand",dl="pRTLPCB",Ir="id",Tr="pw",Rr="ser",fl="cb",pl="seg",ml="ts",_l="d",gl="dframe",Pr=1870,kr=30,yl=Pr-kr,Cl=25e3,vl=3e4;class De{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Tt(e),this.stats_=li(t),this.urlFn=c=>(this.appCheckToken&&(c[Wn]=this.appCheckToken),Sr(t,Er,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ll(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(vl)),Kc(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ui((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===us)this.id=a,this.password=c;else if(o===ul)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[us]="t",i[Rr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[fl]=this.scriptTagHolder.uniqueCallbackIdentifier),i[pr]=ci,this.transportSessionId&&(i[mr]=this.transportSessionId),this.lastSessionId&&(i[Cr]=this.lastSessionId),this.applicationId&&(i[vr]=this.applicationId),this.appCheckToken&&(i[Wn]=this.appCheckToken),typeof location<"u"&&location.hostname&&yr.test(location.hostname)&&(i[_r]=gr);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){De.forceAllow_=!0}static forceDisallow(){De.forceDisallow_=!0}static isAvailable(){return De.forceAllow_?!0:!De.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Xc()&&!Jc()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=F(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Qs(t),s=dr(i,yl);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[gl]="t",i[Ir]=e,i[Tr]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=F(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ui{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Yc(),window[hl+this.uniqueCallbackIdentifier]=e,window[dl+this.uniqueCallbackIdentifier]=t,this.myIFrame=ui.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){U("frame writing exception"),a.stack&&U(a.stack),U(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||U("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ir]=this.myID,e[Tr]=this.myPW,e[Rr]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+kr+i.length<=Pr;){const o=this.pendingSegs.shift();i=i+"&"+pl+s+"="+o.seg+"&"+ml+s+"="+o.ts+"&"+_l+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Cl)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{U("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl=16384,El=45e3;let $t=null;typeof MozWebSocket<"u"?$t=MozWebSocket:typeof WebSocket<"u"&&($t=WebSocket);class Q{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Tt(this.connId),this.stats_=li(t),this.connURL=Q.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[pr]=ci,typeof location<"u"&&location.hostname&&yr.test(location.hostname)&&(o[_r]=gr),t&&(o[mr]=t),i&&(o[Cr]=i),s&&(o[Wn]=s),r&&(o[vr]=r),Sr(e,wr,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,we.set("previous_websocket_failure",!0);try{let i;ga(),this.mySock=new $t(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Q.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&$t!==null&&!Q.forceDisallow_}static previouslyFailed(){return we.isInMemoryStorage||we.get("previous_websocket_failure")===!0}markConnectionHealthy(){we.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=ut(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=F(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=dr(t,wl);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(El))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Q.responsesRequiredToBeHealthy=2;Q.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{static get ALL_TRANSPORTS(){return[De,Q]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Q&&Q.isAvailable();let i=t&&!Q.previouslyFailed();if(e.webSocketOnly&&(t||$("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Q];else{const s=this.transports_=[];for(const r of ft.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ft.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ft.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bl=6e4,Sl=5e3,Il=10*1024,Tl=100*1024,Tn="t",hs="d",Rl="s",ds="r",Pl="e",fs="o",ps="a",ms="n",_s="p",kl="h";class Nl{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Tt("c:"+this.id+":"),this.transportManager_=new ft(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=it(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Tl?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Il?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Tn in e){const t=e[Tn];t===ps?this.upgradeIfSecondaryHealthy_():t===ds?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===fs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Qe("t",e),i=Qe("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:_s,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ps,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ms,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Qe("t",e),i=Qe("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Qe(Tn,e);if(hs in e){const i=e[hs];if(t===kl){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===ms){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Rl?this.onConnectionShutdown_(i):t===ds?this.onReset_(i):t===Pl?Un("Server Error: "+i):t===fs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Un("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),ci!==i&&$("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),it(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(bl))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):it(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Sl))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:_s,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(we.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends Ar{static getInstance(){return new qt}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!er()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=32,ys=768;class S{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function b(){return new S("")}function C(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function pe(n){return n.pieces_.length-n.pieceNum_}function R(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new S(n.pieces_,e)}function hi(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Al(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function pt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Dr(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new S(e,0)}function D(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof S)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new S(t,0)}function w(n){return n.pieceNum_>=n.pieces_.length}function H(n,e){const t=C(n),i=C(e);if(t===null)return e;if(t===i)return H(R(n),R(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Dl(n,e){const t=pt(n,0),i=pt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=ke(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function di(n,e){if(pe(n)!==pe(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function j(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(pe(n)>pe(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class xl{constructor(e,t){this.errorPrefix_=t,this.parts_=pt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=rn(this.parts_[i]);xr(this)}}function Ml(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=rn(e),xr(n)}function Ll(n){const e=n.parts_.pop();n.byteLength_-=rn(e),n.parts_.length>0&&(n.byteLength_-=1)}function xr(n){if(n.byteLength_>ys)throw new Error(n.errorPrefix_+"has a key path longer than "+ys+" bytes ("+n.byteLength_+").");if(n.parts_.length>gs)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+gs+") or object contains a cycle "+ve(n))}function ve(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi extends Ar{static getInstance(){return new fi}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=1e3,Ol=300*1e3,Cs=30*1e3,Fl=1.3,Bl=3e4,Vl="server_kill",vs=3;class re extends Nr{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=re.nextPersistentConnectionId_++,this.log_=Tt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Xe,this.maxReconnectDelay_=Ol,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");fi.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&qt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(F(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new bt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;re.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Z(e,"w")){const i=Oe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();$(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Sa(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Cs)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ba(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+F(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Un("Unrecognized action received from server: "+F(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Xe,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Xe,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Bl&&(this.reconnectDelay_=Xe),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Fl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+re.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?U("getToken() completed but was canceled"):(U("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new Nl(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,m=>{$(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(Vl)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&$(d),c())}}}interrupt(e){U("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){U("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ki(this.interruptReasons_)&&(this.reconnectDelay_=Xe,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>ai(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new S(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){U("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=vs&&(this.reconnectDelay_=Cs,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){U("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=vs&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+lr.replace(/\./g,"-")]=1,er()?e["framework.cordova"]=1:_a()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=qt.getInstance().currentlyOnline();return Ki(this.interruptReasons_)&&e}}re.nextPersistentConnectionId_=0;re.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new v(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new v(Fe,e),s=new v(Fe,t);return this.compare(i,s)!==0}minPost(){return v.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xt;class Mr extends on{static get __EMPTY_NODE(){return xt}static set __EMPTY_NODE(e){xt=e}compare(e,t){return ke(e.name,t.name)}isDefinedOn(e){throw Ge("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return v.MIN}maxPost(){return new v(Se,xt)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new v(e,xt)}toString(){return".key"}}const Le=new Mr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class V{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??V.RED,this.left=s??q.EMPTY_NODE,this.right=r??q.EMPTY_NODE}copy(e,t,i,s,r){return new V(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,V.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,V.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}V.RED=!0;V.BLACK=!1;class Ul{copy(e,t,i,s,r){return this}insert(e,t,i){return new V(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class q{constructor(e,t=q.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new q(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,V.BLACK,null,null))}remove(e){return new q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,V.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Mt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Mt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Mt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Mt(this.root_,null,this.comparator_,!0,e)}}q.EMPTY_NODE=new Ul;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n,e){return ke(n.name,e.name)}function pi(n,e){return ke(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hn;function Hl(n){Hn=n}const Lr=function(n){return typeof n=="number"?"number:"+fr(n):"string:"+n},Or=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Z(e,".sv"),"Priority must be a string or number.")}else p(n===Hn||n.isEmpty(),"priority of unexpected type.");p(n===Hn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ws;class B{static set __childrenNodeConstructor(e){ws=e}static get __childrenNodeConstructor(){return ws}constructor(e,t=B.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Or(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new B(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return w(e)?this:C(e)===".priority"?this.priorityNode_:B.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:B.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=C(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||pe(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,B.__childrenNodeConstructor.EMPTY_NODE.updateChild(R(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Lr(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=fr(this.value_):e+=this.value_,this.lazyHash_=hr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===B.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof B.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=B.VALUE_TYPE_ORDER.indexOf(t),r=B.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}B.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fr,Br;function $l(n){Fr=n}function ql(n){Br=n}class Gl extends on{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?ke(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return v.MIN}maxPost(){return new v(Se,new B("[PRIORITY-POST]",Br))}makePost(e,t){const i=Fr(e);return new v(t,new B("[PRIORITY-POST]",i))}toString(){return".priority"}}const x=new Gl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yl=Math.log(2);class jl{constructor(e){const t=r=>parseInt(Math.log(r)/Yl,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Gt=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=n[c],h=t?t(d):d,new V(h,d.node,V.BLACK,null,null);{const m=parseInt(u/2,10)+c,_=s(c,m),E=s(m+1,l);return d=n[m],h=t?t(d):d,new V(h,d.node,V.BLACK,_,E)}},r=function(c){let l=null,u=null,d=n.length;const h=function(_,E){const L=d-_,te=d;d-=_;const ne=s(L+1,te),ye=n[L],Cn=t?t(ye):ye;m(new V(Cn,ye.node,E,null,ne))},m=function(_){l?(l.left=_,l=_):(u=_,l=_)};for(let _=0;_<c.count;++_){const E=c.nextBitIsOne(),L=Math.pow(2,c.count-(_+1));E?h(L,V.BLACK):(h(L,V.BLACK),h(L,V.RED))}return u},o=new jl(n.length),a=r(o);return new q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rn;const Ae={};class ie{static get Default(){return p(Ae&&x,"ChildrenNode.ts has not been loaded"),Rn=Rn||new ie({".priority":Ae},{".priority":x}),Rn}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Oe(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof q?t:null}hasIndex(e){return Z(this.indexSet_,e.toString())}addIndex(e,t){p(e!==Le,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(v.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Gt(i,e.getCompare()):a=Ae;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new ie(u,l)}addToIndexes(e,t){const i=Vt(this.indexes_,(s,r)=>{const o=Oe(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===Ae)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(v.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Gt(a,o.getCompare())}else return Ae;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new v(e.name,a))),c.insert(e,e.node)}});return new ie(i,this.indexSet_)}removeFromIndexes(e,t){const i=Vt(this.indexes_,s=>{if(s===Ae)return s;{const r=t.get(e.name);return r?s.remove(new v(e.name,r)):s}});return new ie(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Je;class y{static get EMPTY_NODE(){return Je||(Je=new y(new q(pi),null,ie.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Or(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Je}updatePriority(e){return this.children_.isEmpty()?this:new y(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Je:t}}getChild(e){const t=C(e);return t===null?this:this.getImmediateChild(t).getChild(R(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new v(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Je:this.priorityNode_;return new y(s,o,r)}}updateChild(e,t){const i=C(e);if(i===null)return t;{p(C(e)!==".priority"||pe(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(R(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(x,(o,a)=>{t[o]=a.val(e),i++,r&&y.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Lr(this.getPriority().val())+":"),this.forEachChild(x,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":hr(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new v(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new v(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new v(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,v.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,v.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Rt?-1:0}withIndex(e){if(e===Le||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new y(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Le||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(x),s=t.getIterator(x);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Le?null:this.indexMap_.get(e.toString())}}y.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class zl extends y{constructor(){super(new q(pi),y.EMPTY_NODE,ie.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return y.EMPTY_NODE}isEmpty(){return!1}}const Rt=new zl;Object.defineProperties(v,{MIN:{value:new v(Fe,y.EMPTY_NODE)},MAX:{value:new v(Se,Rt)}});Mr.__EMPTY_NODE=y.EMPTY_NODE;B.__childrenNodeConstructor=y;Hl(Rt);ql(Rt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kl=!0;function O(n,e=null){if(n===null)return y.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new B(t,O(e))}if(!(n instanceof Array)&&Kl){const t=[];let i=!1;if(W(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=O(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new v(o,c)))}}),t.length===0)return y.EMPTY_NODE;const r=Gt(t,Wl,o=>o.name,pi);if(i){const o=Gt(t,x.getCompare());return new y(r,O(e),new ie({".priority":o},{".priority":x}))}else return new y(r,O(e),ie.Default)}else{let t=y.EMPTY_NODE;return W(n,(i,s)=>{if(Z(n,i)&&i.substring(0,1)!=="."){const r=O(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(O(e))}}$l(O);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql extends on{constructor(e){super(),this.indexPath_=e,p(!w(e)&&C(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?ke(e.name,t.name):r}makePost(e,t){const i=O(e),s=y.EMPTY_NODE.updateChild(this.indexPath_,i);return new v(t,s)}maxPost(){const e=y.EMPTY_NODE.updateChild(this.indexPath_,Rt);return new v(Se,e)}toString(){return pt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl extends on{compare(e,t){const i=e.node.compareTo(t.node);return i===0?ke(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return v.MIN}maxPost(){return v.MAX}makePost(e,t){const i=O(e);return new v(t,i)}toString(){return".value"}}const Jl=new Xl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){return{type:"value",snapshotNode:n}}function Be(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function mt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function _t(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Zl(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(mt(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Be(t,i)):o.trackChildChange(_t(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(x,(s,r)=>{t.hasChild(s)||i.trackChildChange(mt(s,r))}),t.isLeafNode()||t.forEachChild(x,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(_t(s,r,o))}else i.trackChildChange(Be(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?y.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.indexedFilter_=new mi(e.getIndex()),this.index_=e.getIndex(),this.startPost_=gt.getStartPost_(e),this.endPost_=gt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new v(t,i))||(i=y.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=y.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(y.EMPTY_NODE);const r=this;return t.forEachChild(x,(o,a)=>{r.matches(new v(o,a))||(s=s.updateImmediateChild(o,y.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new gt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new v(t,i))||(i=y.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=y.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=y.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(y.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,y.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,m)=>d(m,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const c=new v(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const m=h==null?1:o(h,c);if(u&&!i.isEmpty()&&m>=0)return r?.trackChildChange(_t(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(mt(t,d));const E=a.updateImmediateChild(t,y.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Be(h.name,h.node)),E.updateImmediateChild(h.name,h.node)):E}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(mt(l.name,l.node)),r.trackChildChange(Be(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,y.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=x}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Fe}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Se}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===x}copy(){const e=new _i;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function tu(n){return n.loadsAllData()?new mi(n.getIndex()):n.hasLimit()?new eu(n):new gt(n)}function Es(n){const e={};if(n.isDefault())return e;let t;if(n.index_===x?t="$priority":n.index_===Jl?t="$value":n.index_===Le?t="$key":(p(n.index_ instanceof Ql,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=F(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=F(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+F(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=F(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+F(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function bs(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==x&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt extends Nr{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Tt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Yt.getListenId_(e,i),a={};this.listens_[o]=a;const c=Es(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Oe(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,t){const i=Yt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Es(e._queryParams),i=e._path.toString(),s=new bt;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ia(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=ut(a.responseText)}catch{$("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&$("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(){this.rootNode_=y.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jt(){return{value:null,children:new Map}}function Ur(n,e,t){if(w(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=C(e);n.children.has(i)||n.children.set(i,jt());const s=n.children.get(i);e=R(e),Ur(s,e,t)}}function $n(n,e,t){n.value!==null?t(e,n.value):iu(n,(i,s)=>{const r=new S(e.toString()+"/"+i);$n(s,r,t)})}function iu(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&W(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=10*1e3,ru=30*1e3,ou=300*1e3;class au{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new su(e);const i=Ss+(ru-Ss)*Math.random();it(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;W(e,(s,r)=>{r>0&&Z(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),it(this.reportStats_.bind(this),Math.floor(Math.random()*2*ou))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(X||(X={}));function gi(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function yi(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ci(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=X.ACK_USER_WRITE,this.source=gi()}operationForChild(e){if(w(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new S(e));return new zt(b(),t,this.revert)}}else return p(C(this.path)===e,"operationForChild called for unrelated child."),new zt(R(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){this.source=e,this.path=t,this.type=X.LISTEN_COMPLETE}operationForChild(e){return w(this.path)?new yt(this.source,b()):new yt(this.source,R(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=X.OVERWRITE}operationForChild(e){return w(this.path)?new Ie(this.source,b(),this.snap.getImmediateChild(e)):new Ie(this.source,R(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=X.MERGE}operationForChild(e){if(w(this.path)){const t=this.children.subtree(new S(e));return t.isEmpty()?null:t.value?new Ie(this.source,b(),t.value):new Ve(this.source,b(),t)}else return p(C(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ve(this.source,R(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(w(e))return this.isFullyInitialized()&&!this.filtered_;const t=C(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function lu(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Zl(o.childName,o.snapshotNode))}),Ze(n,s,"child_removed",e,i,t),Ze(n,s,"child_added",e,i,t),Ze(n,s,"child_moved",r,i,t),Ze(n,s,"child_changed",e,i,t),Ze(n,s,"value",e,i,t),s}function Ze(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>hu(n,a,c)),o.forEach(a=>{const c=uu(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function uu(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function hu(n,e,t){if(e.childName==null||t.childName==null)throw Ge("Should only compare child_ events.");const i=new v(e.childName,e.snapshotNode),s=new v(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function an(n,e){return{eventCache:n,serverCache:e}}function st(n,e,t,i){return an(new me(e,t,i),n.serverCache)}function Wr(n,e,t,i){return an(n.eventCache,new me(e,t,i))}function Kt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Te(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pn;const du=()=>(Pn||(Pn=new q(Qc)),Pn);class I{static fromObject(e){let t=new I(null);return W(e,(i,s)=>{t=t.set(new S(i),s)}),t}constructor(e,t=du()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:b(),value:this.value};if(w(e))return null;{const i=C(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(R(e),t);return r!=null?{path:D(new S(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(w(e))return this;{const t=C(e),i=this.children.get(t);return i!==null?i.subtree(R(e)):new I(null)}}set(e,t){if(w(e))return new I(t,this.children);{const i=C(e),r=(this.children.get(i)||new I(null)).set(R(e),t),o=this.children.insert(i,r);return new I(this.value,o)}}remove(e){if(w(e))return this.children.isEmpty()?new I(null):new I(null,this.children);{const t=C(e),i=this.children.get(t);if(i){const s=i.remove(R(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new I(null):new I(this.value,r)}else return this}}get(e){if(w(e))return this.value;{const t=C(e),i=this.children.get(t);return i?i.get(R(e)):null}}setTree(e,t){if(w(e))return t;{const i=C(e),r=(this.children.get(i)||new I(null)).setTree(R(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new I(this.value,o)}}fold(e){return this.fold_(b(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(D(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,b(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(w(e))return null;{const r=C(e),o=this.children.get(r);return o?o.findOnPath_(R(e),D(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,b(),t)}foreachOnPath_(e,t,i){if(w(e))return this;{this.value&&i(t,this.value);const s=C(e),r=this.children.get(s);return r?r.foreachOnPath_(R(e),D(t,s),i):new I(null)}}foreach(e){this.foreach_(b(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(D(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.writeTree_=e}static empty(){return new J(new I(null))}}function rt(n,e,t){if(w(e))return new J(new I(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=H(s,e);return r=r.updateChild(o,t),new J(n.writeTree_.set(s,r))}else{const s=new I(t),r=n.writeTree_.setTree(e,s);return new J(r)}}}function qn(n,e,t){let i=n;return W(t,(s,r)=>{i=rt(i,D(e,s),r)}),i}function Is(n,e){if(w(e))return J.empty();{const t=n.writeTree_.setTree(e,new I(null));return new J(t)}}function Gn(n,e){return Ne(n,e)!=null}function Ne(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(H(t.path,e)):null}function Ts(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(x,(i,s)=>{e.push(new v(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new v(i,s.value))}),e}function he(n,e){if(w(e))return n;{const t=Ne(n,e);return t!=null?new J(new I(t)):new J(n.writeTree_.subtree(e))}}function Yn(n){return n.writeTree_.isEmpty()}function Ue(n,e){return Hr(b(),n.writeTree_,e)}function Hr(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Hr(D(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(D(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(n,e){return Yr(e,n)}function fu(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=rt(n.visibleWrites,e,t)),n.lastWriteId=i}function pu(n,e,t,i){p(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=qn(n.visibleWrites,e,t),n.lastWriteId=i}function mu(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function _u(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&gu(a,i.path)?s=!1:j(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return yu(n),!0;if(i.snap)n.visibleWrites=Is(n.visibleWrites,i.path);else{const a=i.children;W(a,c=>{n.visibleWrites=Is(n.visibleWrites,D(i.path,c))})}return!0}else return!1}function gu(n,e){if(n.snap)return j(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&j(D(n.path,t),e))return!0;return!1}function yu(n){n.visibleWrites=$r(n.allWrites,Cu,b()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Cu(n){return n.visible}function $r(n,e,t){let i=J.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)j(t,o)?(a=H(t,o),i=rt(i,a,r.snap)):j(o,t)&&(a=H(o,t),i=rt(i,b(),r.snap.getChild(a)));else if(r.children){if(j(t,o))a=H(t,o),i=qn(i,a,r.children);else if(j(o,t))if(a=H(o,t),w(a))i=qn(i,b(),r.children);else{const c=Oe(r.children,C(a));if(c){const l=c.getChild(R(a));i=rt(i,b(),l)}}}else throw Ge("WriteRecord should have .snap or .children")}}return i}function qr(n,e,t,i,s){if(!i&&!s){const r=Ne(n.visibleWrites,e);if(r!=null)return r;{const o=he(n.visibleWrites,e);if(Yn(o))return t;if(t==null&&!Gn(o,b()))return null;{const a=t||y.EMPTY_NODE;return Ue(o,a)}}}else{const r=he(n.visibleWrites,e);if(!s&&Yn(r))return t;if(!s&&t==null&&!Gn(r,b()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(j(l.path,e)||j(e,l.path))},a=$r(n.allWrites,o,e),c=t||y.EMPTY_NODE;return Ue(a,c)}}}function vu(n,e,t){let i=y.EMPTY_NODE;const s=Ne(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(x,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=he(n.visibleWrites,e);return t.forEachChild(x,(o,a)=>{const c=Ue(he(r,new S(o)),a);i=i.updateImmediateChild(o,c)}),Ts(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=he(n.visibleWrites,e);return Ts(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function wu(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=D(e,t);if(Gn(n.visibleWrites,r))return null;{const o=he(n.visibleWrites,r);return Yn(o)?s.getChild(t):Ue(o,s.getChild(t))}}function Eu(n,e,t,i){const s=D(e,t),r=Ne(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=he(n.visibleWrites,s);return Ue(o,i.getNode().getImmediateChild(t))}else return null}function bu(n,e){return Ne(n.visibleWrites,e)}function Su(n,e,t,i,s,r,o){let a;const c=he(n.visibleWrites,e),l=Ne(c,b());if(l!=null)a=l;else if(t!=null)a=Ue(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let m=h.getNext();for(;m&&u.length<s;)d(m,i)!==0&&u.push(m),m=h.getNext();return u}else return[]}function Iu(){return{visibleWrites:J.empty(),allWrites:[],lastWriteId:-1}}function Qt(n,e,t,i){return qr(n.writeTree,n.treePath,e,t,i)}function vi(n,e){return vu(n.writeTree,n.treePath,e)}function Rs(n,e,t,i){return wu(n.writeTree,n.treePath,e,t,i)}function Xt(n,e){return bu(n.writeTree,D(n.treePath,e))}function Tu(n,e,t,i,s,r){return Su(n.writeTree,n.treePath,e,t,i,s,r)}function wi(n,e,t){return Eu(n.writeTree,n.treePath,e,t)}function Gr(n,e){return Yr(D(n.treePath,e),n.writeTree)}function Yr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,_t(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,mt(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Be(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,_t(i,e.snapshotNode,s.oldSnap));else throw Ge("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pu{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const jr=new Pu;class Ei{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new me(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return wi(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Te(this.viewCache_),r=Tu(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ku(n){return{filter:n}}function Nu(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Au(n,e,t,i,s){const r=new Ru;let o,a;if(t.type===X.OVERWRITE){const l=t;l.source.fromUser?o=jn(n,e,l.path,l.snap,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!w(l.path),o=Jt(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===X.MERGE){const l=t;l.source.fromUser?o=xu(n,e,l.path,l.children,i,s,r):(p(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=zn(n,e,l.path,l.children,i,s,a,r))}else if(t.type===X.ACK_USER_WRITE){const l=t;l.revert?o=Ou(n,e,l.path,i,s,r):o=Mu(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===X.LISTEN_COMPLETE)o=Lu(n,e,t.path,i,r);else throw Ge("Unknown operation type: "+t.type);const c=r.getChanges();return Du(e,o,c),{viewCache:o,changes:c}}function Du(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Kt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Vr(Kt(e)))}}function zr(n,e,t,i,s,r){const o=e.eventCache;if(Xt(i,t)!=null)return e;{let a,c;if(w(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Te(e),u=l instanceof y?l:y.EMPTY_NODE,d=vi(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Qt(i,Te(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=C(t);if(l===".priority"){p(pe(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Rs(i,t,u,c);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=R(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Rs(i,t,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=wi(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return st(e,a,o.isFullyInitialized()||w(t),n.filter.filtersNodes())}}function Jt(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(w(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const m=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),m,null)}else{const m=C(t);if(!c.isCompleteForPath(t)&&pe(t)>1)return e;const _=R(t),L=c.getNode().getImmediateChild(m).updateChild(_,i);m===".priority"?l=u.updatePriority(c.getNode(),L):l=u.updateChild(c.getNode(),m,L,_,jr,null)}const d=Wr(e,l,c.isFullyInitialized()||w(t),u.filtersNodes()),h=new Ei(s,d,r);return zr(n,d,t,s,h,a)}function jn(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new Ei(s,e,r);if(w(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=st(e,l,!0,n.filter.filtersNodes());else{const d=C(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=st(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=R(t),m=a.getNode().getImmediateChild(d);let _;if(w(h))_=i;else{const E=u.getCompleteChild(d);E!=null?hi(h)===".priority"&&E.getChild(Dr(h)).isEmpty()?_=E:_=E.updateChild(h,i):_=y.EMPTY_NODE}if(m.equals(_))c=e;else{const E=n.filter.updateChild(a.getNode(),d,_,h,u,o);c=st(e,E,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function Ps(n,e){return n.eventCache.isCompleteForChild(e)}function xu(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=D(t,c);Ps(e,C(u))&&(a=jn(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=D(t,c);Ps(e,C(u))||(a=jn(n,a,u,l,s,r,o))}),a}function ks(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function zn(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;w(t)?l=i:l=new I(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const m=e.serverCache.getNode().getImmediateChild(d),_=ks(n,m,h);c=Jt(n,c,new S(d),_,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const m=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!m){const _=e.serverCache.getNode().getImmediateChild(d),E=ks(n,_,h);c=Jt(n,c,new S(d),E,s,r,o,a)}}),c}function Mu(n,e,t,i,s,r,o){if(Xt(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(w(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return Jt(n,e,t,c.getNode().getChild(t),s,r,a,o);if(w(t)){let l=new I(null);return c.getNode().forEachChild(Le,(u,d)=>{l=l.set(new S(u),d)}),zn(n,e,t,l,s,r,a,o)}else return e}else{let l=new I(null);return i.foreach((u,d)=>{const h=D(t,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),zn(n,e,t,l,s,r,a,o)}}function Lu(n,e,t,i,s){const r=e.serverCache,o=Wr(e,r.getNode(),r.isFullyInitialized()||w(t),r.isFiltered());return zr(n,o,t,i,jr,s)}function Ou(n,e,t,i,s,r){let o;if(Xt(i,t)!=null)return e;{const a=new Ei(i,e,s),c=e.eventCache.getNode();let l;if(w(t)||C(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Qt(i,Te(e));else{const d=e.serverCache.getNode();p(d instanceof y,"serverChildren would be complete if leaf node"),u=vi(i,d)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=C(t);let d=wi(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=n.filter.updateChild(c,u,d,R(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,y.EMPTY_NODE,R(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Qt(i,Te(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Xt(i,b())!=null,st(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fu{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new mi(i.getIndex()),r=tu(i);this.processor_=ku(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(y.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(y.EMPTY_NODE,a.getNode(),null),u=new me(c,o.isFullyInitialized(),s.filtersNodes()),d=new me(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=an(d,u),this.eventGenerator_=new cu(this.query_)}get query(){return this.query_}}function Bu(n){return n.viewCache_.serverCache.getNode()}function Vu(n){return Kt(n.viewCache_)}function Uu(n,e){const t=Te(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!w(e)&&!t.getImmediateChild(C(e)).isEmpty())?t.getChild(e):null}function Ns(n){return n.eventRegistrations_.length===0}function Wu(n,e){n.eventRegistrations_.push(e)}function As(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Ds(n,e,t,i){e.type===X.MERGE&&e.source.queryId!==null&&(p(Te(n.viewCache_),"We should always have a full cache before handling merges"),p(Kt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Au(n.processor_,s,e,t,i);return Nu(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Kr(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Hu(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(x,(r,o)=>{i.push(Be(r,o))}),t.isFullyInitialized()&&i.push(Vr(t.getNode())),Kr(n,i,t.getNode(),e)}function Kr(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return lu(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zt;class Qr{constructor(){this.views=new Map}}function $u(n){p(!Zt,"__referenceConstructor has already been defined"),Zt=n}function qu(){return p(Zt,"Reference.ts has not been loaded"),Zt}function Gu(n){return n.views.size===0}function bi(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Ds(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Ds(o,e,t,i));return r}}function Xr(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Qt(t,s?i:null),c=!1;a?c=!0:i instanceof y?(a=vi(t,i),c=!1):(a=y.EMPTY_NODE,c=!1);const l=an(new me(a,c,!1),new me(i,s,!1));return new Fu(e,l)}return o}function Yu(n,e,t,i,s,r){const o=Xr(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Wu(o,t),Hu(o,t)}function ju(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=_e(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(As(l,t,i)),Ns(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(As(c,t,i)),Ns(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!_e(n)&&r.push(new(qu())(e._repo,e._path)),{removed:r,events:o}}function Jr(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function de(n,e){let t=null;for(const i of n.views.values())t=t||Uu(i,e);return t}function Zr(n,e){if(e._queryParams.loadsAllData())return ln(n);{const i=e._queryIdentifier;return n.views.get(i)}}function eo(n,e){return Zr(n,e)!=null}function _e(n){return ln(n)!=null}function ln(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en;function zu(n){p(!en,"__referenceConstructor has already been defined"),en=n}function Ku(){return p(en,"Reference.ts has not been loaded"),en}let Qu=1;class xs{constructor(e){this.listenProvider_=e,this.syncPointTree_=new I(null),this.pendingWriteTree_=Iu(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function to(n,e,t,i,s){return fu(n.pendingWriteTree_,e,t,i,s),s?je(n,new Ie(gi(),e,t)):[]}function Xu(n,e,t,i){pu(n.pendingWriteTree_,e,t,i);const s=I.fromObject(t);return je(n,new Ve(gi(),e,s))}function ce(n,e,t=!1){const i=mu(n.pendingWriteTree_,e);if(_u(n.pendingWriteTree_,e)){let r=new I(null);return i.snap!=null?r=r.set(b(),!0):W(i.children,o=>{r=r.set(new S(o),!0)}),je(n,new zt(i.path,r,t))}else return[]}function Pt(n,e,t){return je(n,new Ie(yi(),e,t))}function Ju(n,e,t){const i=I.fromObject(t);return je(n,new Ve(yi(),e,i))}function Zu(n,e){return je(n,new yt(yi(),e))}function eh(n,e,t){const i=Ii(n,t);if(i){const s=Ti(i),r=s.path,o=s.queryId,a=H(r,e),c=new yt(Ci(o),a);return Ri(n,r,c)}else return[]}function tn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||eo(o,e))){const c=ju(o,e,t,i);Gu(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,m)=>_e(m));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const m=ih(h);for(let _=0;_<m.length;++_){const E=m[_],L=E.query,te=ro(n,E);n.listenProvider_.startListening(ot(L),Ct(n,L),te.hashFn,te.onComplete)}}}!d&&l.length>0&&!i&&(u?n.listenProvider_.stopListening(ot(e),null):l.forEach(h=>{const m=n.queryToTagMap.get(un(h));n.listenProvider_.stopListening(ot(h),m)}))}sh(n,l)}return a}function no(n,e,t,i){const s=Ii(n,i);if(s!=null){const r=Ti(s),o=r.path,a=r.queryId,c=H(o,e),l=new Ie(Ci(a),c,t);return Ri(n,o,l)}else return[]}function th(n,e,t,i){const s=Ii(n,i);if(s){const r=Ti(s),o=r.path,a=r.queryId,c=H(o,e),l=I.fromObject(t),u=new Ve(Ci(a),c,l);return Ri(n,o,u)}else return[]}function Kn(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,m)=>{const _=H(h,s);r=r||de(m,_),o=o||_e(m)});let a=n.syncPointTree_.get(s);a?(o=o||_e(a),r=r||de(a,b())):(a=new Qr,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=y.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((m,_)=>{const E=de(_,b());E&&(r=r.updateImmediateChild(m,E))}));const l=eo(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=un(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const m=rh();n.queryToTagMap.set(h,m),n.tagToQueryMap.set(m,h)}const u=cn(n.pendingWriteTree_,s);let d=Yu(a,e,t,u,r,c);if(!l&&!o&&!i){const h=Zr(a,e);d=d.concat(oh(n,e,h))}return d}function Si(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=H(o,e),l=de(a,c);if(l)return l});return qr(s,e,r,t,!0)}function nh(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const d=H(l,t);i=i||de(u,d)});let s=n.syncPointTree_.get(t);s?i=i||de(s,b()):(s=new Qr,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new me(i,!0,!1):null,a=cn(n.pendingWriteTree_,e._path),c=Xr(s,e,a,r?o.getNode():y.EMPTY_NODE,r);return Vu(c)}function je(n,e){return io(e,n.syncPointTree_,null,cn(n.pendingWriteTree_,b()))}function io(n,e,t,i){if(w(n.path))return so(n,e,t,i);{const s=e.get(b());t==null&&s!=null&&(t=de(s,b()));let r=[];const o=C(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=Gr(i,o);r=r.concat(io(a,c,l,u))}return s&&(r=r.concat(bi(s,n,i,t))),r}}function so(n,e,t,i){const s=e.get(b());t==null&&s!=null&&(t=de(s,b()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=Gr(i,o),u=n.operationForChild(o);u&&(r=r.concat(so(u,a,c,l)))}),s&&(r=r.concat(bi(s,n,i,t))),r}function ro(n,e){const t=e.query,i=Ct(n,t);return{hashFn:()=>(Bu(e)||y.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?eh(n,t._path,i):Zu(n,t._path);{const r=Zc(s,t);return tn(n,t,null,r)}}}}function Ct(n,e){const t=un(e);return n.queryToTagMap.get(t)}function un(n){return n._path.toString()+"$"+n._queryIdentifier}function Ii(n,e){return n.tagToQueryMap.get(e)}function Ti(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new S(n.substr(0,e))}}function Ri(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=cn(n.pendingWriteTree_,e);return bi(i,t,s,null)}function ih(n){return n.fold((e,t,i)=>{if(t&&_e(t))return[ln(t)];{let s=[];return t&&(s=Jr(t)),W(i,(r,o)=>{s=s.concat(o)}),s}})}function ot(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Ku())(n._repo,n._path):n}function sh(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=un(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function rh(){return Qu++}function oh(n,e,t){const i=e._path,s=Ct(n,e),r=ro(n,t),o=n.listenProvider_.startListening(ot(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!_e(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!w(l)&&u&&_e(u))return[ln(u).query];{let h=[];return u&&(h=h.concat(Jr(u).map(m=>m.query))),W(d,(m,_)=>{h=h.concat(_)}),h}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening(ot(u),Ct(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Pi(t)}node(){return this.node_}}class ki{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=D(this.path_,e);return new ki(this.syncTree_,t)}node(){return Si(this.syncTree_,this.path_)}}const ah=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ms=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ch(n[".sv"],e,t);if(typeof n[".sv"]=="object")return lh(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ch=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},lh=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},oo=function(n,e,t,i){return Ni(e,new ki(t,n),i)},ao=function(n,e,t){return Ni(n,new Pi(e),t)};function Ni(n,e,t){const i=n.getPriority().val(),s=Ms(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ms(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new B(a,O(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new B(s))),o.forEachChild(x,(a,c)=>{const l=Ni(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Di(n,e){let t=e instanceof S?e:new S(e),i=n,s=C(t);for(;s!==null;){const r=Oe(i.node.children,s)||{children:{},childCount:0};i=new Ai(s,i,r),t=R(t),s=C(t)}return i}function ze(n){return n.node.value}function co(n,e){n.node.value=e,Qn(n)}function lo(n){return n.node.childCount>0}function uh(n){return ze(n)===void 0&&!lo(n)}function hn(n,e){W(n.node.children,(t,i)=>{e(new Ai(t,n,i))})}function uo(n,e,t,i){t&&e(n),hn(n,s=>{uo(s,e,!0)})}function hh(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function kt(n){return new S(n.parent===null?n.name:kt(n.parent)+"/"+n.name)}function Qn(n){n.parent!==null&&dh(n.parent,n.name,n)}function dh(n,e,t){const i=uh(t),s=Z(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Qn(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Qn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh=/[\[\].#$\/\u0000-\u001F\u007F]/,ph=/[\[\].#$\u0000-\u001F\u007F]/,kn=10*1024*1024,xi=function(n){return typeof n=="string"&&n.length!==0&&!fh.test(n)},ho=function(n){return typeof n=="string"&&n.length!==0&&!ph.test(n)},mh=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ho(n)},_h=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!oi(n)||n&&typeof n=="object"&&Z(n,".sv")},fo=function(n,e,t,i){i&&e===void 0||dn(sn(n,"value"),e,t)},dn=function(n,e,t){const i=t instanceof S?new xl(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ve(i));if(typeof e=="function")throw new Error(n+"contains a function "+ve(i)+" with contents = "+e.toString());if(oi(e))throw new Error(n+"contains "+e.toString()+" "+ve(i));if(typeof e=="string"&&e.length>kn/3&&rn(e)>kn)throw new Error(n+"contains a string greater than "+kn+" utf8 bytes "+ve(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(W(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!xi(o)))throw new Error(n+" contains an invalid key ("+o+") "+ve(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Ml(i,o),dn(n,a,i),Ll(i)}),s&&r)throw new Error(n+' contains ".value" child '+ve(i)+" in addition to actual children.")}},gh=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=pt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!xi(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Dl);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&j(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},yh=function(n,e,t,i){const s=sn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];W(e,(o,a)=>{const c=new S(o);if(dn(s,a,D(t,c)),hi(c)===".priority"&&!_h(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),gh(s,r)},po=function(n,e,t,i){if(!ho(t))throw new Error(sn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Ch=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),po(n,e,t)},Mi=function(n,e){if(C(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},vh=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!xi(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!mh(t))throw new Error(sn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function fn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!di(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function mo(n,e,t){fn(n,t),_o(n,i=>di(i,e))}function z(n,e,t){fn(n,t),_o(n,i=>j(i,e)||j(e,i))}function _o(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Eh(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Eh(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();nt&&U("event: "+t.toString()),Ye(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh="repo_interrupt",Sh=25;class Ih{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new wh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=jt(),this.transactionQueueTree_=new Ai,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Th(n,e,t){if(n.stats_=li(n.repoInfo_),n.forceRestClient_||il())n.server_=new Yt(n.repoInfo_,(i,s,r,o)=>{Ls(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Os(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{F(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new re(n.repoInfo_,e,(i,s,r,o)=>{Ls(n,i,s,r,o)},i=>{Os(n,i)},i=>{Rh(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=cl(n.repoInfo_,()=>new au(n.stats_,n.server_)),n.infoData_=new nu,n.infoSyncTree_=new xs({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=Pt(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Li(n,"connected",!1),n.serverSyncTree_=new xs({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);z(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function go(n){const t=n.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function pn(n){return ah({timestamp:go(n)})}function Ls(n,e,t,i,s){n.dataUpdateCount++;const r=new S(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=Vt(t,l=>O(l));o=th(n.serverSyncTree_,r,c,s)}else{const c=O(t);o=no(n.serverSyncTree_,r,c,s)}else if(i){const c=Vt(t,l=>O(l));o=Ju(n.serverSyncTree_,r,c)}else{const c=O(t);o=Pt(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=We(n,r)),z(n.eventQueue_,a,o)}function Os(n,e){Li(n,"connected",e),e===!1&&Ah(n)}function Rh(n,e){W(e,(t,i)=>{Li(n,t,i)})}function Li(n,e,t){const i=new S("/.info/"+e),s=O(t);n.infoData_.updateSnapshot(i,s);const r=Pt(n.infoSyncTree_,i,s);z(n.eventQueue_,i,r)}function Oi(n){return n.nextWriteId_++}function Ph(n,e,t){const i=nh(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=O(s).withIndex(e._queryParams.getIndex());Kn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Pt(n.serverSyncTree_,e._path,r);else{const a=Ct(n.serverSyncTree_,e);o=no(n.serverSyncTree_,e._path,r,a)}return z(n.eventQueue_,e._path,o),tn(n.serverSyncTree_,e,t,null,!0),r},s=>(Nt(n,"get for query "+F(e)+" failed: "+s),Promise.reject(new Error(s))))}function kh(n,e,t,i,s){Nt(n,"set",{path:e.toString(),value:t,priority:i});const r=pn(n),o=O(t,i),a=Si(n.serverSyncTree_,e),c=ao(o,a,r),l=Oi(n),u=to(n.serverSyncTree_,e,c,l,!0);fn(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,m)=>{const _=h==="ok";_||$("set at "+e+" failed: "+h);const E=ce(n.serverSyncTree_,l,!_);z(n.eventQueue_,e,E),Xn(n,s,h,m)});const d=Bi(n,e);We(n,d),z(n.eventQueue_,d,[])}function Nh(n,e,t,i){Nt(n,"update",{path:e.toString(),value:t});let s=!0;const r=pn(n),o={};if(W(t,(a,c)=>{s=!1,o[a]=oo(D(e,a),O(c),n.serverSyncTree_,r)}),s)U("update() called with empty data.  Don't do anything."),Xn(n,i,"ok",void 0);else{const a=Oi(n),c=Xu(n.serverSyncTree_,e,o,a);fn(n.eventQueue_,c),n.server_.merge(e.toString(),t,(l,u)=>{const d=l==="ok";d||$("update at "+e+" failed: "+l);const h=ce(n.serverSyncTree_,a,!d),m=h.length>0?We(n,e):e;z(n.eventQueue_,m,h),Xn(n,i,l,u)}),W(t,l=>{const u=Bi(n,D(e,l));We(n,u)}),z(n.eventQueue_,e,[])}}function Ah(n){Nt(n,"onDisconnectEvents");const e=pn(n),t=jt();$n(n.onDisconnect_,b(),(s,r)=>{const o=oo(s,r,n.serverSyncTree_,e);Ur(t,s,o)});let i=[];$n(t,b(),(s,r)=>{i=i.concat(Pt(n.serverSyncTree_,s,r));const o=Bi(n,s);We(n,o)}),n.onDisconnect_=jt(),z(n.eventQueue_,b(),i)}function Dh(n,e,t){let i;C(e._path)===".info"?i=Kn(n.infoSyncTree_,e,t):i=Kn(n.serverSyncTree_,e,t),mo(n.eventQueue_,e._path,i)}function yo(n,e,t){let i;C(e._path)===".info"?i=tn(n.infoSyncTree_,e,t):i=tn(n.serverSyncTree_,e,t),mo(n.eventQueue_,e._path,i)}function xh(n){n.persistentConnection_&&n.persistentConnection_.interrupt(bh)}function Nt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),U(t,...e)}function Xn(n,e,t,i){e&&Ye(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Co(n,e,t){return Si(n.serverSyncTree_,e,t)||y.EMPTY_NODE}function Fi(n,e=n.transactionQueueTree_){if(e||mn(n,e),ze(e)){const t=wo(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Mh(n,kt(e),t)}else lo(e)&&hn(e,t=>{Fi(n,t)})}function Mh(n,e,t){const i=t.map(l=>l.currentWriteId),s=Co(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];p(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=H(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{Nt(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(ce(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();mn(n,Di(n.transactionQueueTree_,e)),Fi(n,n.transactionQueueTree_),z(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)Ye(d[h])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{$("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}We(n,e)}},o)}function We(n,e){const t=vo(n,e),i=kt(t),s=wo(n,t);return Lh(n,s,i),i}function Lh(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=H(t,c.path);let u=!1,d;if(p(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(ce(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Sh)u=!0,d="maxretry",s=s.concat(ce(n.serverSyncTree_,c.currentWriteId,!0));else{const h=Co(n,c.path,o);c.currentInputSnapshot=h;const m=e[a].update(h.val());if(m!==void 0){dn("transaction failed: Data returned ",m,c.path);let _=O(m);typeof m=="object"&&m!=null&&Z(m,".priority")||(_=_.updatePriority(h.getPriority()));const L=c.currentWriteId,te=pn(n),ne=ao(_,h,te);c.currentOutputSnapshotRaw=_,c.currentOutputSnapshotResolved=ne,c.currentWriteId=Oi(n),o.splice(o.indexOf(L),1),s=s.concat(to(n.serverSyncTree_,c.path,ne,c.currentWriteId,c.applyLocally)),s=s.concat(ce(n.serverSyncTree_,L,!0))}else u=!0,d="nodata",s=s.concat(ce(n.serverSyncTree_,c.currentWriteId,!0))}z(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}mn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Ye(i[a]);Fi(n,n.transactionQueueTree_)}function vo(n,e){let t,i=n.transactionQueueTree_;for(t=C(e);t!==null&&ze(i)===void 0;)i=Di(i,t),e=R(e),t=C(e);return i}function wo(n,e){const t=[];return Eo(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Eo(n,e,t){const i=ze(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);hn(e,s=>{Eo(n,s,t)})}function mn(n,e){const t=ze(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,co(e,t.length>0?t:void 0)}hn(e,i=>{mn(n,i)})}function Bi(n,e){const t=kt(vo(n,e)),i=Di(n.transactionQueueTree_,e);return hh(i,s=>{Nn(n,s)}),Nn(n,i),uo(i,s=>{Nn(n,s)}),t}function Nn(n,e){const t=ze(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(ce(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?co(e,void 0):t.length=r+1,z(n.eventQueue_,kt(e),s);for(let o=0;o<i.length;o++)Ye(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Fh(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):$(`Invalid query segment '${t}' in query '${n}'`)}return e}const Fs=function(n,e){const t=Bh(n),i=t.namespace;t.domain==="firebase.com"&&ae(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ae("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||zc();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new br(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new S(t.pathString)}},Bh=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=Oh(n.substring(u,d)));const h=Fh(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const m=e.slice(0,l);if(m.toLowerCase()==="localhost")t="localhost";else if(m.split(".").length<=2)t=m;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Vh=(function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Bs.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Bs.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+F(this.snapshot.exportVal())}}class So{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Ui{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return w(this._path)?null:hi(this._path)}get ref(){return new ee(this._repo,this._path)}get _queryIdentifier(){const e=bs(this._queryParams),t=ai(e);return t==="{}"?"default":t}get _queryObject(){return bs(this._queryParams)}isEqual(e){if(e=Pe(e),!(e instanceof Ui))return!1;const t=this._repo===e._repo,i=di(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Al(this._path)}}class ee extends Ui{constructor(e,t){super(e,t,new _i,!1)}get parent(){const e=Dr(this._path);return e===null?null:new ee(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class He{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new S(e),i=$e(this.ref,e);return new He(this._node.getChild(t),i,x)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new He(s,$e(this.ref,i),x)))}hasChild(e){const t=new S(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function k(n,e){return n=Pe(n),n._checkNotDeleted("ref"),e!==void 0?$e(n._root,e):n._root}function $e(n,e){return n=Pe(n),C(n._path)===null?Ch("child","path",e):po("child","path",e),new ee(n._repo,D(n._path,e))}function Uh(n,e){n=Pe(n),Mi("push",n._path),fo("push",e,n._path,!0);const t=go(n._repo),i=Vh(t),s=$e(n,i),r=$e(n,i);let o;return e!=null?o=ge(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Wh(n){return Mi("remove",n._path),ge(n,null)}function ge(n,e){n=Pe(n),Mi("set",n._path),fo("set",e,n._path,!1);const t=new bt;return kh(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function at(n,e){yh("update",e,n._path);const t=new bt;return Nh(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Hh(n){n=Pe(n);const e=new Vi(()=>{}),t=new At(e);return Ph(n._repo,n,t).then(i=>new He(i,new ee(n._repo,n._path),n._queryParams.getIndex()))}class At{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new bo("value",this,new He(e.snapshotNode,new ee(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new So(this,e,t):null}matches(e){return e instanceof At?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class _n{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new So(this,e,t):null}createEvent(e,t){p(e.childName!=null,"Child events should have a childName.");const i=$e(new ee(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new bo(e.type,this,new He(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof _n?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Io(n,e,t,i,s){const r=new Vi(t,void 0),o=e==="value"?new At(r):new _n(e,r);return Dh(n._repo,n,o),()=>yo(n._repo,n,o)}function ct(n,e,t,i){return Io(n,"value",e)}function $h(n,e,t,i){return Io(n,"child_added",e)}function et(n,e,t){let i=null;const s=t?new Vi(t):null;e==="value"?i=new At(s):e&&(i=new _n(e,s)),yo(n._repo,n,i)}$u(ee);zu(ee);/**
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
 */const qh="FIREBASE_DATABASE_EMULATOR_HOST",Jn={};let Gh=!1;function Yh(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=si(r);n.repoInfo_=new br(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function jh(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ae("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),U("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Fs(r,s),a=o.repoInfo,c;typeof process<"u"&&rs&&(c=rs[qh]),c?(r=`http://${c}?ns=${a.namespace}`,o=Fs(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new rl(n.name,n.options,e);vh("Invalid Firebase Database URL",o),w(o.path)||ae("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Kh(a,n,l,new sl(n,t));return new Qh(u,n)}function zh(n,e){const t=Jn[e];(!t||t[n.key]!==n)&&ae(`Database ${e}(${n.repoInfo_}) has already been deleted.`),xh(n),delete t[n.key]}function Kh(n,e,t,i){let s=Jn[e.name];s||(s={},Jn[e.name]=s);let r=s[n.toURLString()];return r&&ae("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ih(n,Gh,t,i),s[n.toURLString()]=r,r}class Qh{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Th(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ee(this._repo,b())),this._rootInternal}_delete(){return this._rootInternal!==null&&(zh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ae("Cannot call "+e+" on a deleted database.")}}function Xh(n=kc(),e){const t=Sc(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=la("database");i&&Jh(t,...i)}return t}function Jh(n,e,t,i={}){n=Pe(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Ut(i,r.repoInfo_.emulatorOptions))return;ae("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ae('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Ot(Ot.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:ha(i.mockUserToken,n.app.options.projectId);o=new Ot(a)}si(e)&&(ua(e),pa("Database",!0)),Yh(r,s,i,o)}/**
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
 */function Zh(n){Hc(Pc),Ht(new ht("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return jh(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),xe(os,as,n),xe(os,as,"esm2020")}re.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};re.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Zh();const ed={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",appId:"1:765724787439:web:61a3b5dd538149564c911a",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",measurementId:"G-EGJ53HLGY4"},td=or(ed),N=Xh(td);function To(n,e,t){if(!n||!e)return;const i=`rooms/${n}/connections/${e}`,s=k(N,i);return ge(s,{status:t,timestamp:Date.now()})}class Ro{constructor(e,t,i,s){this.peerConnection=e,this.roomRef=t,this.db=s,this.role=i,this.pendingCandidates=[],this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1},this.handleLocalCandidateWrapped=this.handleLocalCandidate.bind(this),this.handleICEGatheringStateChange=this.handleICEGatheringStateChange.bind(this),this.handleICEConnectionStateChange=this.handleICEConnectionStateChange.bind(this),this._onRemoteCandidateAdded=this._onRemoteCandidateAdded.bind(this),this.setupICEHandling()}getRoomId(){const t=this.roomRef.toString().match(/rooms\/([^\/]+)/);return t?t[1]:null}setupICEHandling(){this.peerConnection.addEventListener("icecandidate",this.handleLocalCandidateWrapped),this.peerConnection.addEventListener("icegatheringstatechange",this.handleICEGatheringStateChange),this.peerConnection.addEventListener("iceconnectionstatechange",this.handleICEConnectionStateChange),this.listenForRemoteCandidates()}handleICEGatheringStateChange(){this.peerConnection.iceGatheringState==="complete"&&(this.state.iceGatheringComplete=!0,this.onICEGatheringComplete?.())}handleICEConnectionStateChange(){const e=this.peerConnection.iceConnectionState;this.onICEConnectionStateChange?.(e)}handleLocalCandidate(e){if(e.candidate){this.state.localCandidatesCount++;const t=this.role==="initiator"?"callerCandidates":"calleeCandidates",i=this.getRoomId();if(!i){console.error("Cannot send ICE candidate: room ID not found");return}const s=k(this.db,`rooms/${i}/${t}`);Uh(s,e.candidate.toJSON()).catch(r=>{console.error("Failed to send ICE candidate to Firebase:",r)})}}listenForRemoteCandidates(){const e=this.role==="initiator"?"calleeCandidates":"callerCandidates",t=this.getRoomId();if(!t){console.error("Cannot listen for remote candidates: room ID not found");return}this._remoteCandidatesPath=e,this._remoteCandidatesRef=k(this.db,`rooms/${t}/${e}`),$h(this._remoteCandidatesRef,this._onRemoteCandidateAdded)}_onRemoteCandidateAdded(e){const t=e.val();if(t)try{const i=new RTCIceCandidate(t);this.handleRemoteCandidate(i)}catch(i){console.warn("Failed to create RTCIceCandidate:",i,t)}}async handleRemoteCandidate(e){if(this.state.remoteCandidatesCount++,this.state.remoteDescriptionSet)try{await this.peerConnection.addIceCandidate(e)}catch(t){console.warn("Failed to add ICE candidate:",t)}else this.pendingCandidates.push(e),this.state.pendingCandidatesCount=this.pendingCandidates.length}async processQueuedCandidates(){if(!this.state.remoteDescriptionSet){console.warn("Cannot process queued candidates: remote description not set");return}if(this.pendingCandidates.length===0)return;const e=[...this.pendingCandidates];this.pendingCandidates.length=0,this.state.pendingCandidatesCount=0;for(const t of e)try{await this.peerConnection.addIceCandidate(t)}catch(i){console.warn("Failed to add queued ICE candidate:",i)}}async onRemoteDescriptionSet(){this.state.remoteDescriptionSet=!0,await this.processQueuedCandidates()}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState}}cleanup(){this.peerConnection&&(this.peerConnection.removeEventListener("icecandidate",this.handleLocalCandidateWrapped),this.peerConnection.removeEventListener("icegatheringstatechange",this.handleICEGatheringStateChange),this.peerConnection.removeEventListener("iceconnectionstatechange",this.handleICEConnectionStateChange)),this._remoteCandidatesRef&&(et(this._remoteCandidatesRef,"child_added",this._onRemoteCandidateAdded),this._remoteCandidatesRef=null,this._onRemoteCandidateAdded=null,this._remoteCandidatesPath=null),this.pendingCandidates.length=0,this.state={remoteDescriptionSet:!1,localCandidatesCount:0,remoteCandidatesCount:0,pendingCandidatesCount:0,iceGatheringComplete:!1}}}class Po{constructor(e,t,i={}){this.peerConnection=e,this.role=t,this.options={connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3,...i},this.state={current:"new",previous:null,startTime:Date.now(),reconnectAttempt:0,lastError:null},this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null},this.timers={connectionTimeout:null,reconnectTimer:null},this.setupStateMonitoring()}setCallbacks(e){Object.assign(this.callbacks,e)}setupStateMonitoring(){this.peerConnection.onconnectionstatechange=()=>{this.handleConnectionStateChange(this.peerConnection.connectionState)},this.peerConnection.oniceconnectionstatechange=()=>{this.handleICEConnectionStateChange(this.peerConnection.iceConnectionState)},this.startConnectionTimeout()}handleConnectionStateChange(e){const t=this.state.current;switch(this.updateState(e),e){case"connecting":this.handleConnecting();break;case"connected":this.handleConnected();break;case"disconnected":this.handleDisconnected();break;case"failed":this.handleFailed();break;case"closed":this.handleClosed();break}this.callbacks.onStateChange?.(e,t)}handleICEConnectionStateChange(e){switch(e){case"checking":break;case"connected":this.clearConnectionTimeout();break;case"completed":break;case"failed":this.handleICEFailed();break;case"disconnected":this.handleICEDisconnected();break}}handleConnecting(){this.clearReconnectTimer(),this.startConnectionTimeout()}handleConnected(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.reconnectAttempt=0,this.state.lastError=null;const e=Date.now()-this.state.startTime;this.callbacks.onConnected?.(e)}handleDisconnected(){this.callbacks.onDisconnected?.(),this.state.reconnectAttempt<this.options.reconnectAttempts?this.scheduleReconnect():this.handleFailed("Max reconnection attempts reached")}handleFailed(e="Connection failed"){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.state.lastError=e,this.callbacks.onFailed?.(e)}handleClosed(){this.clearConnectionTimeout(),this.clearReconnectTimer()}handleICEFailed(){this.handleFailed("ICE connection failed")}handleICEDisconnected(){}scheduleReconnect(){this.state.reconnectAttempt++;const e=this.options.reconnectDelay*Math.pow(2,this.state.reconnectAttempt-1);this.callbacks.onReconnecting?.(this.state.reconnectAttempt,this.options.reconnectAttempts),this.timers.reconnectTimer=setTimeout(()=>{this.attemptReconnection()},e)}async attemptReconnection(){try{if(await this.peerConnection.restartIce(),this.role==="initiator"){const e=await this.peerConnection.createOffer({iceRestart:!0});if(await this.peerConnection.setLocalDescription(e),this.callbacks.onIceRestart)try{await this.callbacks.onIceRestart(e)}catch(t){throw console.error("ICE restart signaling failed:",t),t}else console.warn("No onIceRestart callback provided for signaling")}this.state.startTime=Date.now(),this.startConnectionTimeout()}catch(e){console.error("Reconnection attempt failed:",e),this.handleDisconnected()}}startConnectionTimeout(){this.clearConnectionTimeout(),this.timers.connectionTimeout=setTimeout(()=>{this.state.current!=="connected"&&this.handleFailed("Connection timeout")},this.options.connectionTimeout)}clearConnectionTimeout(){this.timers.connectionTimeout&&(clearTimeout(this.timers.connectionTimeout),this.timers.connectionTimeout=null)}clearReconnectTimer(){this.timers.reconnectTimer&&(clearTimeout(this.timers.reconnectTimer),this.timers.reconnectTimer=null)}updateState(e){this.state.previous=this.state.current,this.state.current=e}getState(){return{...this.state,peerConnectionState:this.peerConnection.connectionState,iceConnectionState:this.peerConnection.iceConnectionState,iceGatheringState:this.peerConnection.iceGatheringState,connectionTime:Date.now()-this.state.startTime}}async forceReconnect(){this.state.reconnectAttempt=0,await this.attemptReconnection()}cleanup(){this.clearConnectionTimeout(),this.clearReconnectTimer(),this.peerConnection&&(this.peerConnection.onconnectionstatechange=null,this.peerConnection.oniceconnectionstatechange=null),this.callbacks={onStateChange:null,onConnected:null,onDisconnected:null,onFailed:null,onReconnecting:null,onIceRestart:null},this.state={current:"closed",previous:this.state.current,startTime:Date.now(),reconnectAttempt:0,lastError:null}}}const ko={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},f={roomId:null,role:null,wasConnected:!1,peerConnection:null,localStream:null,iceCandidateManager:null,connectionStateManager:null,roomRef:null};function Wi(){return f.roomId}function No(){return f.role}function Ao(n){f.localStream=n}function Do(){return f.localStream}function gn(){return f.peerConnection}async function nd({onRemoteStream:n,onStatusUpdate:e}){if(f.role="initiator",f.roomId||(f.roomId=od()),f.peerConnection=new RTCPeerConnection(ko),!f.localStream)throw e?.("Error: No local media. Please allow mic/camera."),new Error("connect called without localStream set");f.localStream.getTracks().forEach(r=>{f.peerConnection.addTrack(r,f.localStream)});const t=await f.peerConnection.createOffer();await f.peerConnection.setLocalDescription(t),f.roomRef=await ad(f.roomId,t),f.peerConnection.ontrack=r=>{xo(r,n)},f.iceCandidateManager=new Ro(f.peerConnection,f.roomRef,"initiator",N),f.connectionStateManager=new Po(f.peerConnection,"initiator",{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),f.connectionStateManager.setCallbacks({onStateChange:(r,o)=>{},onConnected:r=>{},onDisconnected:()=>{e?.("Connection lost. Attempting to reconnect...")},onFailed:r=>{e?.(`Connection failed: ${r}`)},onReconnecting:(r,o)=>{e?.(`Reconnecting... (${r}/${o})`)},onIceRestart:async r=>{try{const o=k(N,`rooms/${f.roomId}/offer`);await ge(o,{type:r.type,sdp:r.sdp})}catch(o){throw console.error("Failed to send ICE restart offer:",o),o}}});let i=null;const s=k(N,`rooms/${f.roomId}/answer`);return ct(s,async r=>{const o=r.val();if(o&&o.sdp!==i)try{const a=!!f.peerConnection.currentRemoteDescription,c=f.peerConnection.signalingState;if(c==="stable"&&!a||c==="closed")return;await f.peerConnection.setRemoteDescription(new RTCSessionDescription(o)),i=o.sdp,f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during answer processing")}catch(a){console.error("Failed to set remote description (caller):",a),e?.("Connection error: Failed to process answer")}}),To(f.roomId,"initiator","waiting"),e&&e("Link ready! Waiting for partner..."),{roomId:f.roomId,shareUrl:`${window.location.origin}${window.location.pathname}?room=${f.roomId}`}}async function id({roomId:n,onRemoteStream:e,onStatusUpdate:t}){f.roomId=n,f.role="joiner";const{roomRef:i,roomSnapshot:s}=await cd(n);if(!s.exists())return t&&t("Error: Invalid room link"),{success:!1};if(f.roomRef=i,f.peerConnection=new RTCPeerConnection(ko),!f.localStream)throw t?.("Error: No local media. Please allow mic/camera."),new Error("join called without localStream set");f.localStream.getTracks().forEach(r=>{f.peerConnection.addTrack(r,f.localStream)}),f.peerConnection.ontrack=r=>{xo(r,e)},f.iceCandidateManager=new Ro(f.peerConnection,f.roomRef,"joiner",N),f.connectionStateManager=new Po(f.peerConnection,"joiner",{connectionTimeout:3e4,reconnectAttempts:3,reconnectDelay:2e3}),f.connectionStateManager.setCallbacks({onStateChange:(r,o)=>{},onConnected:r=>{},onDisconnected:()=>{t?.("Connection lost. Attempting to reconnect...")},onFailed:r=>{t?.(`Connection failed: ${r}`)},onReconnecting:(r,o)=>{t?.(`Reconnecting... (${r}/${o})`)}});try{const r=s.val().offer;await f.peerConnection.setRemoteDescription(new RTCSessionDescription(r)),f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during join");const o=await f.peerConnection.createAnswer();await f.peerConnection.setLocalDescription(o);const a=k(N,`rooms/${f.roomId}/answer`);await ge(a,{type:o.type,sdp:o.sdp}),To(f.roomId,"joiner","connecting");let c=f.peerConnection.currentRemoteDescription?.sdp;const l=k(N,`rooms/${f.roomId}/offer`);return ct(l,async u=>{const d=u.val();if(d&&f.peerConnection.currentRemoteDescription&&d.sdp!==c)try{if(f.peerConnection.signalingState==="closed")return;await f.peerConnection.setRemoteDescription(d),c=d.sdp,f.iceCandidateManager?await f.iceCandidateManager.onRemoteDescriptionSet():console.warn("ICE candidate manager not available during ICE restart");const m=await f.peerConnection.createAnswer();await f.peerConnection.setLocalDescription(m);const _=k(N,`rooms/${f.roomId}/answer`);await ge(_,{type:m.type,sdp:m.sdp})}catch(h){console.error("Failed to handle ICE restart offer:",h)}}),{success:!0}}catch(r){return console.error("Failed to join room:",r),t?.(`Failed to join: ${r.message}`),{success:!1}}}async function sd({onStatusUpdate:n}){f.iceCandidateManager&&(f.iceCandidateManager.cleanup(),f.iceCandidateManager=null),f.connectionStateManager&&(f.connectionStateManager.cleanup(),f.connectionStateManager=null),rd(),f.peerConnection&&(f.peerConnection.ontrack=null,f.peerConnection.onicecandidate=null,f.peerConnection.onconnectionstatechange=null,f.peerConnection.oniceconnectionstatechange=null,f.peerConnection.onicegatheringstatechange=null,f.peerConnection.close(),f.peerConnection=null),f.localStream&&(f.localStream.getTracks().forEach(e=>e.stop()),f.localStream=null),f.roomId&&f.role==="initiator"&&await ld(f.roomId),f.roomId=null,f.role=null,f.wasConnected=!1,f.roomRef=null,n&&n("Disconnected. Ready for new chat.")}function xo(n,e){f.wasConnected=!0,e&&e(n.streams[0])}function rd(){if(!f.roomId)return;const n=k(N,`rooms/${f.roomId}/answer`),e=k(N,`rooms/${f.roomId}/offer`),t=k(N,`rooms/${f.roomId}/callerCandidates`),i=k(N,`rooms/${f.roomId}/calleeCandidates`);et(n),et(e),et(t),et(i)}function od(){return Math.random().toString(36).substring(2,15)}async function ad(n,e){const t=k(N,`rooms/${n}`);return await ge(t,{offer:{type:e.type,sdp:e.sdp}}),t}async function cd(n){const e=k(N,`rooms/${n}`),t=await Hh(e);return{roomRef:e,roomSnapshot:t}}async function ld(n){const e=k(N,`rooms/${n}`);await Wh(e)}async function Mo(n,e={}){const{timeout:t=5e3,checkInterval:i=500,minWidth:s=32,minHeight:r=32,blackThreshold:o=10}=e;return new Promise(a=>{const c=Date.now();let l=0;const u=()=>{if(l++,Date.now()-c>t){a({isValid:!1,reason:"timeout",message:"Video validation timed out",checks:l});return}if(!n.srcObject){setTimeout(u,i);return}if(n.readyState<2){setTimeout(u,i);return}if(n.videoWidth<s||n.videoHeight<r){setTimeout(u,i);return}const h=n.currentTime;setTimeout(()=>{if(n.currentTime===h&&!n.paused){a({isValid:!1,reason:"frozen",message:"Video appears to be frozen",checks:l});return}ud(n,o).then(m=>{a(m?{isValid:!1,reason:"black",message:"Video is showing black frames",checks:l}:{isValid:!0,reason:"valid",message:"Video stream is valid",checks:l,dimensions:{width:n.videoWidth,height:n.videoHeight}})}).catch(()=>{a({isValid:!0,reason:"valid_no_canvas",message:"Video stream appears valid (canvas check failed)",checks:l})})},100)};u()})}async function ud(n,e=10){return new Promise((t,i)=>{try{const s=document.createElement("canvas"),r=s.getContext("2d");s.width=Math.min(n.videoWidth,320),s.height=Math.min(n.videoHeight,240),r.drawImage(n,0,0,s.width,s.height);const a=r.getImageData(0,0,s.width,s.height).data;let c=0,l=0;for(let d=0;d<a.length;d+=16){const h=a[d],m=a[d+1],_=a[d+2],E=h*.299+m*.587+_*.114;c+=E,l++}const u=c/l;t(u<e)}catch(s){i(s)}})}function hd(n){if(!n)return{hasVideo:!1,hasAudio:!1,videoTracks:0,audioTracks:0,activeVideoTracks:0,activeAudioTracks:0};const e=n.getVideoTracks(),t=n.getAudioTracks(),i=e.filter(r=>r.enabled&&r.readyState==="live"),s=t.filter(r=>r.enabled&&r.readyState==="live");return{hasVideo:e.length>0,hasAudio:t.length>0,videoTracks:e.length,audioTracks:t.length,activeVideoTracks:i.length,activeAudioTracks:s.length,videoEnabled:i.length>0,audioEnabled:s.length>0}}function dd(n,e,t={}){const{checkInterval:i=2e3,maxFailures:s=3,autoRecover:r=!0}=t;let o=0,a=null,c=!0;const l=async()=>{if(c){try{const u=await Mo(n,{timeout:3e3,checkInterval:200});u.isValid?(o>0?(o=0,e?.({status:"recovered",message:"Video stream recovered",result:u})):a!=="valid"&&e?.({status:"valid",message:"Video stream is healthy",result:u}),a="valid"):(o++,o>=s?(e?.({status:"failed",message:`Video stream validation failed: ${u.message}`,result:u,failureCount:o}),a="failed"):(e?.({status:"warning",message:`Video stream issue detected: ${u.message} (${o}/${s})`,result:u,failureCount:o}),a="warning"))}catch(u){console.warn("Video stream monitoring error:",u)}c&&setTimeout(l,i)}};return setTimeout(l,1e3),()=>{c=!1}}class fd{constructor(e={}){this.options={videoValidationTimeout:8e3,maxRetries:3,retryDelay:2e3,monitorInterval:3e3,...e},this.state={connectionState:"idle",videoValidated:!1,audioValidated:!1,retryCount:0,lastError:null},this.callbacks={onStatusUpdate:null,onConnectionStateChange:null,onValidationComplete:null},this.monitors={video:null,connection:null}}setCallbacks({onStatusUpdate:e,onConnectionStateChange:t,onValidationComplete:i}){this.callbacks.onStatusUpdate=e,this.callbacks.onConnectionStateChange=t,this.callbacks.onValidationComplete=i}async startMonitoring(e,t){this.updateConnectionState("connecting"),this.updateStatus("Establishing connection..."),this.monitorPeerConnection(t);try{await new Promise(i=>setTimeout(i,2e3)),await this.validateRemoteVideo(e),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(e),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated})}catch(i){this.updateConnectionState("connected"),this.updateStatus("Connected! (Video validation skipped)"),this.callbacks.onValidationComplete?.({success:!0,videoValidated:!1,audioValidated:!1,warning:i.message})}}async validateRemoteVideo(e){this.updateConnectionState("validating"),this.updateStatus("Validating video stream...");const t=await Mo(e,{timeout:this.options.videoValidationTimeout,checkInterval:1e3,minWidth:16,minHeight:16,blackThreshold:5});if(t.isValid)this.state.videoValidated=!0;else if(t.reason==="frozen"||t.reason==="timeout")this.state.videoValidated=!1;else throw new Error(`Video validation failed: ${t.message}`);if(e.srcObject){const i=hd(e.srcObject);this.state.audioValidated=i.audioEnabled}return t}monitorPeerConnection(e){e&&(e.onconnectionstatechange=()=>{switch(e.connectionState){case"connected":break;case"disconnected":this.updateConnectionState("reconnecting"),this.updateStatus("Connection lost. Attempting to reconnect...");break;case"failed":this.updateConnectionState("failed"),this.updateStatus("Connection failed. Please try again.");break;case"closed":this.updateConnectionState("idle"),this.updateStatus("Connection closed."),this.cleanup();break}},e.oniceconnectionstatechange=()=>{e.iceConnectionState==="failed"&&this.handleConnectionFailure("ICE connection failed")})}startContinuousMonitoring(e){this.monitors.video=dd(e,t=>this.handleVideoMonitorUpdate(t),{checkInterval:this.options.monitorInterval*2,maxFailures:5,autoRecover:!0})}handleVideoMonitorUpdate(e){e.status}async handleValidationFailure(e,t,i){if(this.state.lastError=e,this.state.retryCount++,this.state.retryCount<=this.options.maxRetries){this.updateStatus(`Connection issue detected. Retrying... (${this.state.retryCount}/${this.options.maxRetries})`),await new Promise(s=>setTimeout(s,this.options.retryDelay));try{await this.validateRemoteVideo(t),this.updateConnectionState("connected"),this.updateStatus("Connected! Video streaming successfully."),this.startContinuousMonitoring(t),this.callbacks.onValidationComplete?.({success:!0,videoValidated:this.state.videoValidated,audioValidated:this.state.audioValidated,retriesUsed:this.state.retryCount})}catch(s){await this.handleValidationFailure(s,t,i)}}else this.updateConnectionState("failed"),this.updateStatus("Connection failed: Unable to establish video stream. Please try again."),this.callbacks.onValidationComplete?.({success:!1,error:e.message,retriesUsed:this.state.retryCount})}handleConnectionFailure(e){this.updateConnectionState("failed"),this.updateStatus(`Connection failed: ${e}`),this.cleanup()}updateConnectionState(e){const t=this.state.connectionState;this.state.connectionState=e,t!==e&&this.callbacks.onConnectionStateChange?.(e,t)}updateStatus(e){this.callbacks.onStatusUpdate?.(e)}getState(){return{...this.state}}cleanup(){this.monitors.video&&(this.monitors.video(),this.monitors.video=null),this.state.connectionState="idle",this.state.videoValidated=!1,this.state.audioValidated=!1,this.state.retryCount=0,this.state.lastError=null}}let P=null,Re=!1,pd=()=>!!document.pictureInPictureElement;async function md(n,e,t,i=!1){console.log("[PiP] Toggle requested",{hasDocumentPiP:"documentPictureInPicture"in window,hasStream:!!n.srcObject,hasFloatingWindow:!!document.pictureInPictureElement,documentPipWindowOpen:!!P,nativePipActive:pd()});try{if(!n.srcObject){console.warn("[PiP] No remote stream available"),t("Connect to a partner first");return}if(document.pictureInPictureElement){console.log("[PiP] Exiting active native PiP (via custom button)"),await document.exitPictureInPicture(),Re=!1,e.textContent="Float Partner Video";return}if(P){console.log("[PiP] Closing existing Document PiP window"),P.close(),P=null,e.textContent="Float Partner Video";return}if(n.offsetParent===null&&!("documentPictureInPicture"in window)){console.warn("[PiP] Video is hidden and Document PiP not available"),t("Switch to Video Chat mode to use floating window");return}if(i&&"documentPictureInPicture"in window){await _d(n,e);return}if("pictureInPictureEnabled"in document){await gd(n,e);return}}catch(s){console.error("[PiP] Error:",s.name,s.message,s),s.name==="NotAllowedError"?t("Picture-in-Picture blocked. Check browser permissions."):s.name==="InvalidStateError"?t("Cannot open PiP - video not ready"):t("Picture-in-Picture failed. See console for details.")}}async function _d(n,e){console.log("[PiP] Opening Document PiP window");try{if(P=await window.documentPictureInPicture.requestWindow({width:400,height:300}),console.log("[PiP] Document PiP window created",{width:P.innerWidth,height:P.innerHeight,closed:P.closed}),P.closed)throw console.error("[PiP] Window was closed immediately after creation"),P=null,new Error("PiP window closed immediately");[...document.styleSheets].forEach(a=>{try{const c=[...a.cssRules].map(u=>u.cssText).join(""),l=document.createElement("style");l.textContent=c,P.document.head.appendChild(l)}catch{const l=document.createElement("link");l.rel="stylesheet",l.href=a.href,P.document.head.appendChild(l)}}),P.document.body.innerHTML=`
    <div style="display: flex; flex-direction: column; height: 100vh; background: #1a1a1a;">
      <video id="pipVideo" autoplay muted playsinline style="flex: 1; width: 100%; background: #000;"></video>
      <button id="pipMute" style="padding: 10px; background: #ff9800; color: white; border: none; cursor: pointer; font-size: 14px;">
        Unmute Partner
      </button>
    </div>
  `;const t=P.document.getElementById("pipVideo"),i=P.document.getElementById("pipMute"),s=n.srcObject.getVideoTracks(),r=n.srcObject.getAudioTracks();console.log("[PiP] Stream tracks:",{video:s.length,audio:r.length,videoActive:s[0]?.enabled,audioActive:r[0]?.enabled}),t.srcObject=n.srcObject,console.log("[PiP] Stream attached to PiP video"),console.log("[PiP] Video will autoplay (muted initially for browser policy)");let o=!0;i.addEventListener("click",()=>{if(!n.srcObject){console.warn("[PiP] Remote stream no longer available");return}o=!o,t.muted=o,o?n.muted=!1:n.muted=!0,i.textContent=o?"Unmute Partner":"Mute Partner",i.style.background=o?"#ff9800":"#4caf50",console.log("[PiP] Partner audio in PiP window:",o?"MUTED":"UNMUTED")}),P.addEventListener("pagehide",()=>{console.log("[PiP] Document PiP window closed by user or browser"),P=null,e.textContent="Float Partner Video"}),P.addEventListener("load",()=>{console.log("[PiP] Document PiP window loaded event fired")}),t.addEventListener("error",a=>{console.error("[PiP] Video element error:",a)}),t.addEventListener("loadedmetadata",()=>{console.log("[PiP] Video metadata loaded in PiP window")}),e.textContent="Close Float Window",console.log("[PiP] Document PiP setup complete")}catch(t){throw console.error("[PiP] Error during Document PiP setup:",t),P&&(P.close(),P=null),t}}async function gd(n,e){document.pictureInPictureElement?(console.log("[PiP] Exiting native PiP"),await document.exitPictureInPicture(),Re=!1,e.textContent="Float Partner Video"):(console.log("[PiP] Entering native PiP"),await n.requestPictureInPicture(),Re=!0,e.textContent="Exit Float Mode")}function yd(n,e){n.addEventListener("enterpictureinpicture",()=>{console.log("[PiP] Remote video entered native PiP (via browser controls)"),Re=!0,e.textContent="Exit Float Mode"}),n.addEventListener("leavepictureinpicture",()=>{console.log("[PiP] Remote video exited native PiP (via browser controls)"),Re=!1,e.textContent="Float Partner Video"})}function Cd(n){console.log("[PiP] Cleanup requested"),P&&(console.log("[PiP] Closing Document PiP window during cleanup"),P.close(),P=null),Re&&document.pictureInPictureElement&&(console.log("[PiP] Exiting native PiP during cleanup"),document.exitPictureInPicture().catch(e=>{console.warn("[PiP] Failed to exit native PiP:",e)}),Re=!1),n&&(n.textContent="Float Partner Video",n.style.display="none"),console.log("[PiP] Cleanup complete")}const se={_initialized:!1,youtube:{apiKey:null,baseUrl:"https://www.googleapis.com/youtube/v3",quotaExceeded:!1}};function vd(){se._initialized||(se._initialized=!0,se.youtube.apiKey="AIzaSyBq18HUW_U9E3AhSKVP58LZFK_GfzNHIGQ")}function yn(){return{apiKey:se.youtube.apiKey,baseUrl:se.youtube.baseUrl,isAvailable:!!se.youtube.apiKey&&!se.youtube.quotaExceeded}}function Ft(n=!0){se.youtube.quotaExceeded=n}function wd(){const n=[],e=[];return se.youtube.apiKey||(n.push("VITE_YOUTUBE_API_KEY"),e.push("YouTube search functionality will not be available")),{isValid:n.length===0,missing:n,warnings:e}}const fe={player:null,ready:!1,currentId:null};function vt(n){return/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/.test(n)}function Hi(n){const e=n.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);return e?e[1]:null}function $i(n,e,t){e.style.display="none";const i=document.getElementById("yt-iframe");i&&i.remove();let s=document.getElementById("yt-player-div");s||(s=document.createElement("div"),s.id="yt-player-div",e.parentNode.insertBefore(s,e)),s.innerHTML='<div id="yt-iframe"></div>',s.style.display="",fe.player=new YT.Player("yt-iframe",{height:"360",width:"640",videoId:n,events:{onReady:()=>{fe.ready=!0},onStateChange:t}}),fe.currentId=n}function qi(n){const e=document.getElementById("yt-player-div");e&&(e.style.display="none"),n.style.display="",fe.player=null,fe.ready=!1,fe.currentId=null}function Zn(){return fe.player}function ei(){return fe.ready}const A={searchCache:new Map,cacheTimeout:300*1e3,maxCacheSize:50,rateLimiter:{requests:[],maxRequests:100,windowMs:1440*60*1e3}};async function Ed(n,e={}){if(!n||typeof n!="string")throw new Error("Search query is required");if(!yn().isAvailable)throw new Error("YouTube API not available");if(!Oo())throw new Error("Rate limit exceeded");const i=Td(n,e),s=Rd(i);if(s)return s;try{const r=await Sd(n,e);return Pd(i,r),kd(),r}catch(r){throw Ad(r),r}}function Lo(){return yn().isAvailable&&Oo()}function bd(){const n=yn();return{isAvailable:n.isAvailable,hasApiKey:!!n.apiKey,cacheSize:A.searchCache.size,rateLimitStatus:Nd()}}async function Sd(n,e){const t=yn(),i=new URL(`${t.baseUrl}/search`);i.searchParams.set("part","snippet"),i.searchParams.set("type","video"),i.searchParams.set("q",n),i.searchParams.set("maxResults",e.maxResults||10),i.searchParams.set("key",t.apiKey),e.order&&i.searchParams.set("order",e.order),e.videoDuration&&i.searchParams.set("videoDuration",e.videoDuration),e.videoDefinition&&i.searchParams.set("videoDefinition",e.videoDefinition);const s=await fetch(i.toString());if(!s.ok){if(s.status===403){const a=(await s.json().catch(()=>({}))).error?.errors?.[0]?.reason;throw a==="quotaExceeded"?(Ft(!0),new Error("YouTube API quota exceeded")):a==="keyInvalid"||a==="keyRestricted"?(Ft(!0),new Error("YouTube API key is invalid or restricted")):(Ft(!0),new Error("YouTube API access denied - quota exceeded or key restricted"))}throw new Error(`Search request failed: ${s.status}`)}const r=await s.json();return r.items?r.items.map(Id):[]}function Id(n){const e=n.snippet;return{videoId:n.id.videoId,title:e.title,description:e.description,thumbnail:e.thumbnails.medium?.url||e.thumbnails.default?.url,channelTitle:e.channelTitle,publishedAt:e.publishedAt,url:`https://www.youtube.com/watch?v=${n.id.videoId}`}}function Td(n,e){const t=JSON.stringify(e);return`search-${n}-${t}`}function Rd(n){const e=A.searchCache.get(n);return e?Date.now()-e.timestamp>A.cacheTimeout?(A.searchCache.delete(n),null):e.results:null}function Pd(n,e){if(A.searchCache.size>=A.maxCacheSize){const t=A.searchCache.keys().next().value;A.searchCache.delete(t)}A.searchCache.set(n,{results:e,timestamp:Date.now()})}function Oo(){const e=Date.now()-A.rateLimiter.windowMs;return A.rateLimiter.requests=A.rateLimiter.requests.filter(t=>t>e),A.rateLimiter.requests.length<A.rateLimiter.maxRequests}function kd(){A.rateLimiter.requests.push(Date.now())}function Nd(){const e=Date.now()-A.rateLimiter.windowMs;return A.rateLimiter.requests=A.rateLimiter.requests.filter(t=>t>e),{requestsUsed:A.rateLimiter.requests.length,requestsRemaining:A.rateLimiter.maxRequests-A.rateLimiter.requests.length,windowMs:A.rateLimiter.windowMs}}function Ad(n){n.message.includes("quota exceeded")&&Ft(!0)}const g={searchInput:null,searchButton:null,searchResults:null,isSearching:!1,currentResults:[],onVideoSelect:null,availabilityCheckInterval:null};function Dd(n){if(g.onVideoSelect=n,g.searchInput=document.getElementById("searchQuery"),g.searchButton=document.getElementById("searchBtn"),g.searchResults=document.getElementById("searchResults"),!g.searchInput||!g.searchButton||!g.searchResults){console.warn("Search UI elements not found");return}Md(),Gi(),Ud()}async function xd(n){if(!n||n.trim().length===0){Dt();return}if(!g.isSearching)try{g.isSearching=!0,Us(!0),Ld();const e=await Ed(n.trim(),{maxResults:10,order:"relevance"});g.currentResults=e,Fd(e)}catch(e){console.error("Search failed:",e),Od(e.message)}finally{g.isSearching=!1,Us(!1)}}function Dt(){g.searchResults&&(g.searchResults.style.display="none",g.searchResults.innerHTML=""),g.currentResults=[]}function Gi(){const n=Lo(),e=bd();g.searchInput&&g.searchButton&&(g.searchInput.disabled=!n,g.searchButton.disabled=!n,n?(g.searchInput.placeholder="Search YouTube videos...",g.searchResults&&g.searchResults.innerHTML.includes("search-unavailable")&&Dt()):e.hasApiKey?(g.searchInput.placeholder="YouTube search temporarily unavailable",Ws("quota-exceeded")):(g.searchInput.placeholder="YouTube search unavailable - no API key",Ws("no-api-key")))}function Md(){g.searchButton.addEventListener("click",Vs),g.searchInput.addEventListener("keypress",n=>{n.key==="Enter"&&Vs()}),g.searchInput.addEventListener("input",n=>{n.target.value.trim().length===0&&Dt()})}async function Vs(){const n=g.searchInput.value;await xd(n)}function Us(n){g.searchButton&&(g.searchButton.disabled=n||!Lo(),g.searchButton.textContent=n?"Searching...":"Search")}function Ld(){g.searchResults&&(g.searchResults.style.display="block",g.searchResults.innerHTML=`
      <div class="search-loading">
        Searching YouTube videos...
      </div>
    `)}function Od(n){if(g.searchResults){g.searchResults.style.display="block";let e="Search failed. Please try again.";n.includes("quota exceeded")?e="YouTube search quota exceeded. Please try again later or use manual URL input.":n.includes("API not available")?e="YouTube search is currently unavailable. Please use manual URL input.":n.includes("key is invalid")||n.includes("key restricted")?e="YouTube API key configuration issue. Please check your API key or use manual URL input.":n.includes("access denied")&&(e="YouTube search is temporarily unavailable. Please use manual URL input."),g.searchResults.innerHTML=`
      <div class="search-error">
        ${e}
      </div>
    `}}function Ws(n){if(!g.searchResults)return;let e,t,i;n==="no-api-key"?(e="YouTube Search Unavailable",t="YouTube search requires an API key to function.",i="You can still watch videos by pasting YouTube URLs directly in the input field below."):n==="quota-exceeded"?(e="YouTube Search Temporarily Unavailable",t="The YouTube search quota has been exceeded for today.",i="You can still watch videos by pasting YouTube URLs directly in the input field below."):(e="YouTube Search Unavailable",t="YouTube search is currently not available.",i="You can still watch videos by pasting YouTube URLs directly in the input field below."),g.searchResults.style.display="block",g.searchResults.innerHTML=`
    <div class="search-unavailable">
      <div class="search-unavailable-title">${e}</div>
      <div class="search-unavailable-message">${t}</div>
      <div class="search-unavailable-suggestion">${i}</div>
      <div class="search-unavailable-examples">
        <strong>Supported formats:</strong>
        <ul>
          <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
          <li>https://youtu.be/VIDEO_ID</li>
          <li>Direct video file URLs</li>
        </ul>
      </div>
    </div>
  `}function Fd(n){if(!g.searchResults)return;if(n.length===0){g.searchResults.style.display="block",g.searchResults.innerHTML=`
      <div class="search-no-results">
        No videos found. Try a different search term.
      </div>
    `;return}const e=n.map(i=>Bd(i)).join("");g.searchResults.style.display="block",g.searchResults.innerHTML=e,g.searchResults.querySelectorAll(".search-result-item").forEach((i,s)=>{i.addEventListener("click",()=>Vd(n[s]))})}function Bd(n){return`
    <div class="search-result-item" data-video-id="${n.videoId}">
      <img 
        src="${n.thumbnail}" 
        alt="${Lt(n.title)}"
        class="search-result-thumbnail"
        loading="lazy"
      />
      <div class="search-result-info">
        <div class="search-result-title">${Lt(n.title)}</div>
        <div class="search-result-channel">${Lt(n.channelTitle)}</div>
        <div class="search-result-description">${Lt(n.description)}</div>
      </div>
    </div>
  `}function Vd(n){g.onVideoSelect&&g.onVideoSelect(n),Dt(),g.searchInput&&(g.searchInput.value="")}function Ud(){g.availabilityCheckInterval=setInterval(()=>{Gi()},300*1e3)}function Wd(){g.availabilityCheckInterval&&(clearInterval(g.availabilityCheckInterval),g.availabilityCheckInterval=null)}function Hd(){Wd(),Dt()}function Lt(n){if(!n)return"";const e=document.createElement("div");return e.textContent=n,e.innerHTML}const M={watchMode:!1,isSyncing:!1,streamUrl:""};function $d(){return M.watchMode}function qd(){return M.isSyncing}function Gd(){return M.streamUrl}function Yd(n){M.streamUrl=n}function jd(){return{isConnected:!0,isSyncing:M.isSyncing,lastError:null,autoResyncEnabled:!1,manualResyncAvailable:!1,playerReady:!0,hasActiveVideo:!!M.streamUrl,syncHealth:{score:100,status:"excellent",issues:[]}}}function zd(){return Promise.resolve(!1)}function Kd(n){}function Qd(){return{lastError:null,timestamp:null,syncHealth:{score:100,status:"excellent",issues:[]},componentStatus:{syncManager:!1,playerAdapter:!1,transport:!1,webrtcConnected:!1},troubleshootingSteps:[]}}function Xd(n){return Promise.resolve(!1)}function Jd(){Dd(Zd),Gi()}async function Zd(n){const e=document.getElementById("sharedVideo"),t=document.getElementById("streamUrl"),i=document.getElementById("syncStatus");t&&(t.value=n.url),i&&(i.textContent=`Loading "${n.title}"...`);try{const s=Wi();s?await Fo({roomId:s,url:n.url,sharedVideo:e,syncStatus:i||{textContent:`Loading "${n.title}"...`}}):await ef(n.url,e,i)}catch(s){console.error("Failed to load selected video:",s),i&&(i.textContent="Failed to load video. Please try again.")}}async function ef(n,e,t){if(vt(n)){const i=Hi(n);$i(i,e,()=>{}),t&&(t.textContent="YouTube video loaded (local playback)")}else qi(e),e.src=n,e.style.display="block",t&&(t.textContent="Video loaded (local playback)")}function tf({videoContainer:n,watchContainer:e,toggleModeBtn:t,sharedVideo:i,streamUrlInput:s,syncStatus:r}){return M.watchMode=!M.watchMode,M.watchMode?(n.style.display="none",e.style.display="block",t.textContent="Switch to Video Chat",r.textContent="Search for videos or paste the same stream URL as your partner",Jd()):(n.style.display="flex",e.style.display="none",t.textContent="Switch to Watch Mode",i.src="",s.value="",Hd()),M.watchMode}function Fo({roomId:n,url:e,sharedVideo:t,syncStatus:i}){if(!e){i.textContent="Please enter a stream URL";return}if(vt(e)){const s=Hi(e);$i(s,t,r=>Bo(r,n)),i.textContent="YouTube video sent to partner..."}else qi(t),t.src=e,i.textContent="Video sent to partner...";if(n){const s=k(N,`rooms/${n}/stream`);ge(s,{url:e})}}function nf({roomId:n,sharedVideo:e,streamUrlInput:t,syncStatus:i}){if(!n)return;k(N,`rooms/${n}`);const s=k(N,`rooms/${n}/stream/url`);ct(s,a=>{const c=a.val();c&&c!==t.value&&(t.value=c,i.innerHTML='Partner shared a video: <button id="accept-shared-video" style="margin-left: 10px; padding: 5px 15px;">✓ Accept & Load</button>',document.getElementById("accept-shared-video").addEventListener("click",()=>sf({url:c,sharedVideo:e,syncStatus:i})),i.style.background="#2196f3")});const r=k(N,`rooms/${n}/stream/playing`);ct(r,async a=>{if(M.isSyncing)return;const c=a.val(),l=t.value,u=Zn(),d=ei();if(vt(l)&&u&&d)c===!0&&u.getPlayerState()!==YT.PlayerState.PLAYING?(u.playVideo(),i.textContent="Playing in sync"):c===!1&&u.getPlayerState()===YT.PlayerState.PLAYING&&(u.pauseVideo(),i.textContent="Partner pressed pause");else if(c===!0&&e.paused)try{await e.play(),i.textContent="Playing in sync"}catch{i.textContent="▶️ Tap the video to start playing",i.style.background="#FF5722",i.style.fontSize="16px";const m=()=>{i.style.background="#2a2a2a",i.style.fontSize="14px",e.removeEventListener("play",m)};e.addEventListener("play",m)}else c===!1&&!e.paused&&(e.pause(),i.textContent="Partner pressed pause")});const o=k(N,`rooms/${n}/stream/time`);ct(o,a=>{if(M.isSyncing)return;const c=a.val(),l=t.value,u=Zn(),d=ei();vt(l)&&u&&d?c!==null&&Math.abs(u.getCurrentTime()-c)>2&&(u.seekTo(c,!0),i.textContent=`Syncing to ${Math.floor(c)}s`):c!==null&&Math.abs(e.currentTime-c)>2&&(e.currentTime=c,i.textContent=`Syncing to ${Math.floor(c)}s`)}),rf({roomId:n,sharedVideo:e})}function Bo(n,e){const t=Zn(),i=ei();if(!e||!i||!t)return;const s=k(N,`rooms/${e}/stream`);n.data===YT.PlayerState.PLAYING?at(s,{playing:!0,time:t.getCurrentTime()}):n.data===YT.PlayerState.PAUSED&&at(s,{playing:!1,time:t.getCurrentTime()})}function sf({url:n,sharedVideo:e,syncStatus:t}){if(vt(n)){const i=Hi(n);$i(i,e,Bo),t.textContent="Loading YouTube video..."}else qi(e),e.src=n,t.textContent="Loading shared video...";t.style.background="#2a2a2a"}function rf({roomId:n,sharedVideo:e}){e.addEventListener("play",()=>{if(n&&!M.isSyncing){M.isSyncing=!0;const t=k(N,`rooms/${n}/stream`);at(t,{playing:!0,time:e.currentTime}),setTimeout(()=>M.isSyncing=!1,1e3)}}),e.addEventListener("pause",()=>{if(n&&!M.isSyncing){M.isSyncing=!0;const t=k(N,`rooms/${n}/stream`);at(t,{playing:!1,time:e.currentTime}),setTimeout(()=>M.isSyncing=!1,1e3)}}),e.addEventListener("seeked",()=>{if(n&&!M.isSyncing){M.isSyncing=!0;const t=k(N,`rooms/${n}/stream`);at(t,{time:e.currentTime}),setTimeout(()=>M.isSyncing=!1,1e3)}}),e.addEventListener("loadeddata",()=>{}),e.addEventListener("waiting",()=>{}),e.addEventListener("playing",()=>{})}const of=Object.freeze(Object.defineProperty({__proto__:null,executeTroubleshootingAction:Xd,getErrorDetails:Qd,getIsSyncing:qd,getStreamUrl:Gd,getSyncStatusInfo:jd,getWatchMode:$d,loadStream:Fo,setAutoResyncEnabled:Kd,setStreamUrl:Yd,setupWatchSync:nf,toggleWatchMode:tf,triggerManualResync:zd},Symbol.toStringTag,{value:"Module"})),Y={isAudioMuted:!1,isVideoOn:!0,currentFacingMode:"user"};function af({localStream:n,muteSelfBtn:e}){const t=n.getAudioTracks()[0];if(t&&(Y.isAudioMuted=!Y.isAudioMuted,t.enabled=!Y.isAudioMuted,e)){const i=e.querySelector("i");i&&(i.className=Y.isAudioMuted?"fa fa-microphone":"fa fa-microphone-slash")}}function cf({localStream:n,videoSelfBtn:e}){const t=n.getVideoTracks()[0];if(t&&(Y.isVideoOn=!Y.isVideoOn,t.enabled=Y.isVideoOn,e)){const i=e.querySelector("i");i&&(i.className=Y.isVideoOn?"fa fa-video":"fa fa-video-slash",e.setAttribute("aria-label",Y.isVideoOn?"Turn video off":"Turn video on"))}}async function lf({localStream:n,localVideo:e,peerConnection:t}){const i=Y.currentFacingMode==="user"?"environment":"user",s=n.getVideoTracks()[0];try{await s.applyConstraints({facingMode:i}),Y.currentFacingMode=i;return}catch(a){console.warn("applyConstraints failed, falling back to getUserMedia:",a)}const r=await navigator.mediaDevices.getUserMedia({video:{facingMode:i},audio:!1}),o=r.getVideoTracks()[0];if(t){const a=t.getSenders().find(c=>c.track&&c.track.kind==="video");a&&a.replaceTrack(o)}n.removeTrack(s),n.addTrack(o),e.srcObject=n,s.stop(),r.getTracks().forEach(a=>{a!==o&&a.stop()}),Y.currentFacingMode=i}function uf(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function hf(){return uf()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function df(){const n=await hf();let e=!1,t=!1;return n.forEach(i=>{const s=i.label.toLowerCase();s.includes("front")&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(t=!0)}),e&&t}const ff=async n=>{try{n.requestFullscreen?await n.requestFullscreen():n.webkitRequestFullscreen?await n.webkitRequestFullscreen():n.msRequestFullscreen?await n.msRequestFullscreen():console.warn("Fullscreen API is not supported by this browser.")}catch(e){console.error("Failed to enter fullscreen mode:",e)}},Hs=n=>{ff(n)},pf=(n,e)=>{const t=n.srcObject?.getAudioTracks()[0];if(t){t.enabled=!t.enabled;const i=e.querySelector("i");i&&(i.className=t.enabled?"fa fa-volume-mute":"fa fa-volume-up")}},mf=({localStream:n,muteSelfBtn:e,onStateChange:t})=>{af({localStream:n,muteSelfBtn:e}),t&&t()},_f=({localStream:n,videoSelfBtn:e,onStateChange:t})=>{cf({localStream:n,videoSelfBtn:e}),t&&t()},gf=async({localStream:n,localVideo:e,peerConnection:t,onStateChange:i})=>{await lf({localStream:n,localVideo:e,peerConnection:t}),i&&i()};async function yf({localVideo:n,remoteVideo:e,muteSelfBtn:t,videoSelfBtn:i,switchCameraSelfBtn:s,fullscreenSelfBtn:r,mutePartnerBtn:o,fullscreenPartnerBtn:a,getLocalStream:c,getPeerConnection:l,onStateChange:u}){t&&t.addEventListener("click",()=>mf({localStream:c(),muteSelfBtn:t,onStateChange:u})),i&&i.addEventListener("click",()=>_f({localStream:c(),videoSelfBtn:i,onStateChange:u})),s&&(await df()?(s.style.display="block",s.addEventListener("click",()=>gf({localStream:c(),localVideo:n,peerConnection:l(),onStateChange:u}))):s.style.display="none"),r&&r.addEventListener("click",()=>Hs(n)),o&&o.addEventListener("click",()=>pf(e,o)),a&&a.addEventListener("click",()=>Hs(e))}function Cf({startChatBtn:n,hangUpBtn:e,copyLinkBtn:t,toggleModeBtn:i,loadStreamBtn:s,pipBtn:r,remoteVideo:o,handleStartChat:a,handleHangUp:c,handleCopyLink:l,handleToggleMode:u,handleLoadStream:d,handlePipToggle:h,updateStatus:m}){document.addEventListener("keydown",_=>{_.altKey&&_.key==="p"&&o.srcObject&&(_.preventDefault(),h())}),n.addEventListener("click",a),e.addEventListener("click",c),t.addEventListener("click",l),i.addEventListener("click",u),s.addEventListener("click",d),r.addEventListener("click",h)}function vf(n,e){let t="Error: Could not access camera/mic.";n.name==="NotAllowedError"?t+=" Permission denied. Please allow access to your camera and microphone.":n.name==="NotFoundError"||n.name==="DevicesNotFoundError"?t+=" No camera or microphone found on this device.":n.name==="NotReadableError"||n.name==="TrackStartError"?t+=" Camera or microphone is already in use by another application.":n.name==="OverconstrainedError"||n.name==="ConstraintNotSatisfiedError"?t+=" The requested media device is not available or does not support the requested constraints.":n.name==="NotSupportedError"?t+=" Your browser or device does not support video/audio capture, or HTTPS is required.":t+=" "+n.message,console.error("Media error:",t,n)}function wf(n){let e;function t(){n.classList.add("show-controls"),clearTimeout(e),e=setTimeout(()=>{n.classList.remove("show-controls")},3e3)}n.addEventListener("touchstart",t,{passive:!0}),n.addEventListener("click",s=>{s.target instanceof Element&&s.target.closest(".hover-controls")||t()});const i=n.querySelector(".hover-controls");i&&(i.addEventListener("mouseenter",()=>clearTimeout(e)),i.addEventListener("touchstart",()=>clearTimeout(e),{passive:!0}),i.addEventListener("click",()=>clearTimeout(e)),i.addEventListener("mouseleave",()=>{e=setTimeout(()=>{n.classList.remove("show-controls")},2e3)}))}async function Ef(n,e){try{return await navigator.clipboard.writeText(n.value),e.textContent="Copied!",setTimeout(()=>e.textContent="Copy Link",2e3),!0}catch(t){return console.error("Failed to copy: ",t),!1}}const bf=of,{toggleWatchMode:Sf,loadStream:If,setupWatchSync:Vo,setStreamUrl:Tf}=bf;let Ee=null;function Ke(){Tf(qe.value)}let ti=!1;async function Uo(){if(ti)return!0;ti=!0;try{vd(),wd().isValid;const e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});Ao(e),An.srcObject=e,await yf({localVideo:An,remoteVideo:G,muteSelfBtn:zo,videoSelfBtn:Ko,switchCameraSelfBtn:$o,fullscreenSelfBtn:Qo,mutePartnerBtn:Yo,fullscreenPartnerBtn:jo,getLocalStream:Do,getPeerConnection:gn,onStateChange:Ke}),Cf({startChatBtn:be,hangUpBtn:nn,copyLinkBtn:Yi,toggleModeBtn:$s,loadStreamBtn:qo,pipBtn:lt,remoteVideo:G,handleStartChat:Pf,handleHangUp:Nf,handleCopyLink:async()=>{const o=await Ef(ni,Yi);K(o?"Link copied!":"Please copy manually.")},handleToggleMode:Af,handleLoadStream:Df,handlePipToggle:()=>md(G,lt,K),updateStatus:K});const i=new URLSearchParams(window.location.search).get("room"),s=Jo(),r=Rf({urlRoomId:i,savedState:s});return r.action==="join"?(K("Connecting..."),be.style.display="none",await kf(r.roomId)):K("Ready. Click to generate video chat link."),!0}catch(n){return vf(n),!1}}function Rf({urlRoomId:n,savedState:e}){const t=n;return t?{action:"join",roomId:t}:{action:"idle"}}function Wo(n){G.srcObject!==n&&(G.srcObject=n,lt.style.display="block",yd(G,lt),Ke(),K("Received video stream. Validating..."),G.paused&&G.srcObject&&G.play().catch(e=>{}),Ee||(Ee=new fd({videoValidationTimeout:1e4,maxRetries:3,retryDelay:2e3}),Ee.setCallbacks({onStatusUpdate:K,onConnectionStateChange:(e,t)=>{},onValidationComplete:e=>{e.success||console.warn("Video stream validation failed:",e.error)}})),Ee.startMonitoring(G,gn()))}async function Pf(){if(!(Wi()||be.disabled))try{if(!await Uo()){console.error("Failed to initialize media devices.");return}const{roomId:e,shareUrl:t}=await nd({onRemoteStream:Wo,onStatusUpdate:K});ni.value=t,Dn.style.display="block",be.disabled=!0,nn.disabled=!1,Vo({roomId:e,sharedVideo:wt,streamUrlInput:qe,syncStatus:Et,peerConnection:gn(),callerRole:No()}),Ho(),Ke()}catch(n){console.error("Failed to initiate chat room:",n),be.disabled=!1,Dn.style.display="none"}}async function kf(n){(await id({roomId:n,onRemoteStream:Wo,onStatusUpdate:K})).success&&(Vo({roomId:n,sharedVideo:wt,streamUrlInput:qe,syncStatus:Et,peerConnection:gn(),callerRole:No()}),nn.disabled=!1,Ho(),Ke())}async function Nf(){if(ti=!1,Cd(lt),Ee){try{Ee.cleanup()}catch{}Ee=null}G.srcObject&&(G.srcObject.getTracks().forEach(e=>e.stop()),G.srcObject=null);const n=Do();n&&(n.getTracks().forEach(e=>e.stop()),An.srcObject=null,Ao(null)),await sd({onStatusUpdate:K}),be.disabled=!1,be.style.display="block",nn.disabled=!0,Dn.style.display="none",qs.style.display="none",Gs.style.display="flex",ni.value="",wt.src="",qe.value="",Et.textContent="",xf(),window.history.replaceState({},document.title,window.location.pathname),xn()}function K(n,e=Go){e.textContent=n}function Af(){Sf({videoContainer:Gs,watchContainer:qs,toggleModeBtn:$s,sharedVideo:wt,streamUrlInput:qe,syncStatus:Et}),Ke()}function Df(){const n=qe.value.trim();If({roomId:Wi(),url:n,sharedVideo:wt,syncStatus:Et}),Ke()}function Ho(){Ys.href=""}function xf(){Ys.href="https://kristinnroach.github.io/HangVidU/"}document.querySelectorAll(".video-wrapper").forEach(wf);Uo();
