(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Dw="modulepreload",Mw=function(t){return"/HangVidU/"+t},Nd={},he=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");s=c(n.map(l=>{if(l=Mw(l),l in Nd)return;Nd[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Dw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},P=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,j=globalThis,jn="10.36.0";function Fo(){return Uo(j),j}function Uo(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||jn,e[jn]=e[jn]||{}}function Ji(t,e,n=j){const i=n.__SENTRY__=n.__SENTRY__||{},s=i[jn]=i[jn]||{};return s[t]||(s[t]=e())}const xw=["debug","info","warn","error","log","assert","trace"],Fw="Sentry Logger ",Qr={};function Xi(t){if(!("console"in j))return t();const e=j.console,n={},i=Object.keys(Qr);i.forEach(s=>{const r=Qr[s];n[s]=e[s],e[s]=r});try{return t()}finally{i.forEach(s=>{e[s]=n[s]})}}function Uw(){Ol().enabled=!0}function $w(){Ol().enabled=!1}function Ep(){return Ol().enabled}function Bw(...t){Pl("log",...t)}function Hw(...t){Pl("warn",...t)}function Vw(...t){Pl("error",...t)}function Pl(t,...e){P&&Ep()&&Xi(()=>{j.console[t](`${Fw}[${t}]:`,...e)})}function Ol(){return P?Ji("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const I={enable:Uw,disable:$w,isEnabled:Ep,log:Bw,warn:Hw,error:Vw},Cp=50,Jn="?",Pd=/\(error: (.*)\)/,Od=/captureMessage|captureException/;function Tp(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,s=0)=>{const r=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Pd.test(c)?c.replace(Pd,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=Cp+s)break}}return Ww(r.slice(s))}}function jw(t){return Array.isArray(t)?Tp(...t):t}function Ww(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(kr(e).function||"")&&e.pop(),e.reverse(),Od.test(kr(e).function||"")&&(e.pop(),Od.test(kr(e).function||"")&&e.pop()),e.slice(0,Cp).map(n=>({...n,filename:n.filename||kr(e).filename,function:n.function||Jn}))}function kr(t){return t[t.length-1]||{}}const Ma="<anonymous>";function yn(t){try{return!t||typeof t!="function"?Ma:t.name||Ma}catch{return Ma}}function Ld(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function Sp(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Ur={},Dd={};function di(t,e){Ur[t]=Ur[t]||[],Ur[t].push(e)}function hi(t,e){if(!Dd[t]){Dd[t]=!0;try{e()}catch(n){P&&I.error(`Error while instrumenting ${t}`,n)}}}function ct(t,e){const n=t&&Ur[t];if(n)for(const i of n)try{i(e)}catch(s){P&&I.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${yn(i)}
Error:`,s)}}let xa=null;function qw(t){const e="error";di(e,t),hi(e,zw)}function zw(){xa=j.onerror,j.onerror=function(t,e,n,i,s){return ct("error",{column:i,error:s,line:n,msg:t,url:e}),xa?xa.apply(this,arguments):!1},j.onerror.__SENTRY_INSTRUMENTED__=!0}let Fa=null;function Gw(t){const e="unhandledrejection";di(e,t),hi(e,Kw)}function Kw(){Fa=j.onunhandledrejection,j.onunhandledrejection=function(t){return ct("unhandledrejection",t),Fa?Fa.apply(this,arguments):!0},j.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Ip=Object.prototype.toString;function $o(t){switch(Ip.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return wn(t,Error)}}function Qi(t,e){return Ip.call(t)===`[object ${e}]`}function kp(t){return Qi(t,"ErrorEvent")}function Md(t){return Qi(t,"DOMError")}function Yw(t){return Qi(t,"DOMException")}function xt(t){return Qi(t,"String")}function Ll(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Bo(t){return t===null||Ll(t)||typeof t!="object"&&typeof t!="function"}function Us(t){return Qi(t,"Object")}function Ho(t){return typeof Event<"u"&&wn(t,Event)}function Jw(t){return typeof Element<"u"&&wn(t,Element)}function Xw(t){return Qi(t,"RegExp")}function ar(t){return!!(t?.then&&typeof t.then=="function")}function Qw(t){return Us(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function wn(t,e){try{return t instanceof e}catch{return!1}}function Ap(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function Rp(t){return typeof Request<"u"&&wn(t,Request)}const Dl=j,Zw=80;function Np(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,s=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Zw;for(;n&&r++<i&&(l=ev(n,u),!(l==="html"||r>1&&o+s.length*c+l.length>=d));)s.push(l),o+=l.length,n=n.parentNode;return s.reverse().join(a)}catch{return"<unknown>"}}function ev(t,e){const n=t,i=[];if(!n?.tagName)return"";if(Dl.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const s=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(s?.length)s.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&xt(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function Ml(){try{return Dl.document.location.href}catch{return""}}function tv(t){if(!Dl.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function qe(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const s=n(i);typeof s=="function"&&Pp(s,i);try{t[e]=s}catch{P&&I.log(`Failed to replace method "${e}" in object`,t)}}function vn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{P&&I.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function Pp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,vn(t,"__sentry_original__",e)}catch{}}function xl(t){return t.__sentry_original__}function Op(t){if($o(t))return{message:t.message,name:t.name,stack:t.stack,...Fd(t)};if(Ho(t)){const e={type:t.type,target:xd(t.target),currentTarget:xd(t.currentTarget),...Fd(t)};return typeof CustomEvent<"u"&&wn(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function xd(t){try{return Jw(t)?Np(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Fd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function nv(t){const e=Object.keys(Op(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let _i;function Vo(t){if(_i!==void 0)return _i?_i(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=j;return e in n&&typeof n[e]=="function"?(_i=n[e],_i(t)):(_i=null,t())}function Zr(){return Vo(()=>Math.random())}function jo(){return Vo(()=>Date.now())}function Sc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Ud(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const s=t[i];try{Ap(s)?n.push(Sp(s)):n.push(String(s))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function $r(t,e,n=!1){return xt(t)?Xw(e)?e.test(t):xt(e)?n?t===e:t.includes(e):!1:!1}function Wo(t,e=[],n=!1){return e.some(i=>$r(t,i,n))}function iv(){const t=j;return t.crypto||t.msCrypto}let Ua;function sv(){return Zr()*16}function Xe(t=iv()){try{if(t?.randomUUID)return Vo(()=>t.randomUUID()).replace(/-/g,"")}catch{}return Ua||(Ua="10000000100040008000"+1e11),Ua.replace(/[018]/g,e=>(e^(sv()&15)>>e/4).toString(16))}function Lp(t){return t.exception?.values?.[0]}function $n(t){const{message:e,event_id:n}=t;if(e)return e;const i=Lp(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function Ic(t,e,n){const i=t.exception=t.exception||{},s=i.values=i.values||[],r=s[0]=s[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Fi(t,e){const n=Lp(t);if(!n)return;const i={type:"generic",handled:!0},s=n.mechanism;if(n.mechanism={...i,...s,...e},e&&"data"in e){const r={...s?.data,...e.data};n.mechanism.data=r}}function $d(t){if(rv(t))return!0;try{vn(t,"__sentry_captured__",!0)}catch{}return!1}function rv(t){try{return t.__sentry_captured__}catch{}}const Dp=1e3;function cr(){return jo()/Dp}function ov(){const{performance:t}=j;if(!t?.now||!t.timeOrigin)return cr;const e=t.timeOrigin;return()=>(e+Vo(()=>t.now()))/Dp}let Bd;function Ft(){return(Bd??(Bd=ov()))()}function av(t){const e=Ft(),n={sid:Xe(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>lv(n)};return t&&Ui(n,t),n}function Ui(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Ft(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Xe()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function cv(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Ui(t,n)}function lv(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function lr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=lr(i[s],e[s],n-1));return i}function Hd(){return Xe()}function Mp(){return Xe().substring(16)}const kc="_sentrySpan";function Vd(t,e){e?vn(t,kc,e):delete t[kc]}function jd(t){return t[kc]}const uv=100;class Bt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Hd(),sampleRand:Zr()}}clone(){const e=new Bt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,Vd(e,jd(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Ui(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof Bt?n.getScopeData():Us(n)?e:void 0,{tags:s,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=i||{};return this._tags={...this._tags,...s},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,Vd(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Hd(),sampleRand:Zr()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:uv;if(i<=0)return this;const s={timestamp:cr(),...e,message:e.message?Sc(e.message,2048):e.message};return this._breadcrumbs.push(s),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:jd(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=lr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||Xe();if(!this._client)return P&&I.warn("No client configured on scope - will not capture exception!"),i;const s=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:s,...n,event_id:i},this),i}captureMessage(e,n,i){const s=i?.event_id||Xe();if(!this._client)return P&&I.warn("No client configured on scope - will not capture message!"),s;const r=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...i,event_id:s},this),s}captureEvent(e,n){const i=n?.event_id||Xe();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(P&&I.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function dv(){return Ji("defaultCurrentScope",()=>new Bt)}function hv(){return Ji("defaultIsolationScope",()=>new Bt)}class fv{constructor(e,n){let i;e?i=e:i=new Bt;let s;n?s=n:s=new Bt,this._stack=[{scope:i}],this._isolationScope=s}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(s){throw this._popScope(),s}return ar(i)?i.then(s=>(this._popScope(),s),s=>{throw this._popScope(),s}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function $i(){const t=Fo(),e=Uo(t);return e.stack=e.stack||new fv(dv(),hv())}function pv(t){return $i().withScope(t)}function gv(t,e){const n=$i();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function Wd(t){return $i().withScope(()=>t($i().getIsolationScope()))}function mv(){return{withIsolationScope:Wd,withScope:pv,withSetScope:gv,withSetIsolationScope:(t,e)=>Wd(e),getCurrentScope:()=>$i().getScope(),getIsolationScope:()=>$i().getIsolationScope()}}function Fl(t){const e=Uo(t);return e.acs?e.acs:mv()}function In(){const t=Fo();return Fl(t).getCurrentScope()}function ur(){const t=Fo();return Fl(t).getIsolationScope()}function _v(){return Ji("globalScope",()=>new Bt)}function yv(...t){const e=Fo(),n=Fl(e);if(t.length===2){const[i,s]=t;return i?n.withSetScope(i,s):n.withScope(s)}return n.withScope(t[0])}function Oe(){return In().getClient()}function wv(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:s}=e,r={trace_id:n,span_id:s||Mp()};return i&&(r.parent_span_id=i),r}const vv="sentry.source",bv="sentry.sample_rate",Ev="sentry.previous_trace_sample_rate",Cv="sentry.op",Tv="sentry.origin",xp="sentry.profile_id",Fp="sentry.exclusive_time",Sv=0,Iv=1,kv="_sentryScope",Av="_sentryIsolationScope";function Rv(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Up(t){const e=t;return{scope:e[kv],isolationScope:Rv(e[Av])}}const Nv="sentry-",Pv=/^sentry-/;function Ov(t){const e=Lv(t);if(!e)return;const n=Object.entries(e).reduce((i,[s,r])=>{if(s.match(Pv)){const o=s.slice(Nv.length);i[o]=r}return i},{});if(Object.keys(n).length>0)return n}function Lv(t){if(!(!t||!xt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=qd(n);return Object.entries(i).forEach(([s,r])=>{e[s]=r}),e},{}):qd(t)}function qd(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),s=e.slice(n+1);return[i,s].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const Dv=/^o(\d+)\./,Mv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function xv(t){return t==="http"||t==="https"}function dr(t,e=!1){const{host:n,path:i,pass:s,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&s?`:${s}`:""}@${n}${r?`:${r}`:""}/${i&&`${i}/`}${o}`}function Fv(t){const e=Mv.exec(t);if(!e){Xi(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,s="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return $p({host:r,pass:s,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function $p(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function Uv(t){if(!P)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(I.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?xv(i)?e&&isNaN(parseInt(e,10))?(I.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(I.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(I.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function $v(t){return t.match(Dv)?.[1]}function Bv(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=$v(n)),i}function Hv(t){const e=typeof t=="string"?Fv(t):$p(t);if(!(!e||!Uv(e)))return e}function Vv(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const Bp=1;let zd=!1;function jv(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),s=i?e:Ul(t).parent_span_id,r=Up(t).scope,o=i?r?.getPropagationContext().propagationSpanId||Mp():e;return{parent_span_id:s,span_id:o,trace_id:n}}function Wv(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...s},attributes:r})=>({span_id:e,trace_id:n,sampled:i===Bp,attributes:r,...s}))}function Gd(t){return typeof t=="number"?Kd(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Kd(t.getTime()):Ft()}function Kd(t){return t>9999999999?t/1e3:t}function Ul(t){if(zv(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(qv(t)){const{attributes:i,startTime:s,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:r,parent_span_id:l,start_timestamp:Gd(s),timestamp:Gd(o)||void 0,status:Kv(a),op:i[Cv],origin:i[Tv],links:Wv(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function qv(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function zv(t){return typeof t.getSpanJSON=="function"}function Gv(t){const{traceFlags:e}=t.spanContext();return e===Bp}function Kv(t){if(!(!t||t.code===Sv))return t.code===Iv?"ok":t.message||"internal_error"}const Yv="_sentryRootSpan";function Hp(t){return t[Yv]||t}function Yd(){zd||(Xi(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),zd=!0)}function Jv(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Oe()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function Jd(t){I.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Xd(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(Qv(n)){if($r(t.description,n))return P&&Jd(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?$r(t.description,n.name):!0,s=n.op?t.op&&$r(t.op,n.op):!0;if(i&&s)return P&&Jd(t),!0}return!1}function Xv(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const s of t)s.parent_span_id===i&&(s.parent_span_id=n)}function Qv(t){return typeof t=="string"||t instanceof RegExp}const $l="production",Zv="_frozenDsc";function Vp(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},s={environment:n.environment||$l,release:n.release,public_key:i,trace_id:t,org_id:Bv(e)};return e.emit("createDsc",s),s}function eb(t,e){const n=e.getPropagationContext();return n.dsc||Vp(n.traceId,t)}function tb(t){const e=Oe();if(!e)return{};const n=Hp(t),i=Ul(n),s=i.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??s[bv]??s[Ev];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Zv];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&Ov(l);if(u)return a(u);const d=Vp(t.spanContext().traceId,e),h=s[vv],f=i.description;return h!=="url"&&f&&(d.transaction=f),Jv()&&(d.sampled=String(Gv(n)),d.sample_rand=r?.get("sentry.sample_rand")??Up(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function At(t,e=100,n=1/0){try{return Ac("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function jp(t,e=3,n=100*1024){const i=At(t,e);return rb(i)>n?jp(t,e-1,n):i}function Ac(t,e,n=1/0,i=1/0,s=ob()){const[r,o]=s;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=nb(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Ac("",f,c-1,i,s)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Op(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Ac(f,p,c-1,i,s),d++}return o(e),u}function nb(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Ap(e))return Sp(e);if(Qw(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${yn(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=ib(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function ib(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function sb(t){return~-encodeURI(t).split(/%..|./).length}function rb(t){return sb(JSON.stringify(t))}function ob(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function Zi(t,e=[]){return[t,e]}function ab(t,e){const[n,i]=t;return[n,[...i,e]]}function Rc(t,e){const n=t[1];for(const i of n){const s=i[0].type;if(e(i,s))return!0}return!1}function cb(t,e){return Rc(t,(n,i)=>e.includes(i))}function Nc(t){const e=Uo(j);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function lb(t){const[e,n]=t;let i=JSON.stringify(e);function s(r){typeof i=="string"?i=typeof r=="string"?i+r:[Nc(i),r]:i.push(typeof r=="string"?Nc(r):r)}for(const r of n){const[o,a]=r;if(s(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)s(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(At(a))}s(c)}}return typeof i=="string"?i:ub(i)}function ub(t){const e=t.reduce((s,r)=>s+r.length,0),n=new Uint8Array(e);let i=0;for(const s of t)n.set(s,i),i+=s.length;return n}function db(t){const e=typeof t.data=="string"?Nc(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const hb={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Qd(t){return hb[t]}function Wp(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function fb(t,e,n,i){const s=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:dr(i)},...s&&{trace:s}}}function pb(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function gb(t,e,n,i){const s=Wp(n),r={sent_at:new Date().toISOString(),...s&&{sdk:s},...!!i&&e&&{dsn:dr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Zi(r,[o])}function mb(t,e,n,i){const s=Wp(n),r=t.type&&t.type!=="replay_event"?t.type:"event";pb(t,n?.sdk);const o=fb(t,s,i,e);return delete t.sdkProcessingMetadata,Zi(o,[[{type:r},t]])}const $a=0,Zd=1,eh=2;function qo(t){return new $s(e=>{e(t)})}function Bl(t){return new $s((e,n)=>{n(t)})}class $s{constructor(e){this._state=$a,this._handlers=[],this._runExecutor(e)}then(e,n){return new $s((i,s)=>{this._handlers.push([!1,r=>{if(!e)i(r);else try{i(e(r))}catch(o){s(o)}},r=>{if(!n)s(r);else try{i(n(r))}catch(o){s(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new $s((n,i)=>{let s,r;return this.then(o=>{r=!1,s=o,e&&e()},o=>{r=!0,s=o,e&&e()}).then(()=>{if(r){i(s);return}n(s)})})}_executeHandlers(){if(this._state===$a)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Zd&&n[1](this._value),this._state===eh&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===$a){if(ar(o)){o.then(i,s);return}this._state=r,this._value=o,this._executeHandlers()}},i=r=>{n(Zd,r)},s=r=>{n(eh,r)};try{e(i,s)}catch(r){s(r)}}}function _b(t,e,n,i=0){try{const s=Pc(e,n,t,i);return ar(s)?s:qo(s)}catch(s){return Bl(s)}}function Pc(t,e,n,i){const s=n[i];if(!t||!s)return t;const r=s({...t},e);return P&&r===null&&I.log(`Event processor "${s.id||"?"}" dropped event`),ar(r)?r.then(o=>Pc(o,e,n,i+1)):Pc(r,e,n,i+1)}let Ln,th,nh,Zt;function yb(t){const e=j._sentryDebugIds,n=j._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],s=n?Object.keys(n):[];if(Zt&&i.length===th&&s.length===nh)return Zt;th=i.length,nh=s.length,Zt={},Ln||(Ln={});const r=(o,a)=>{for(const c of o){const l=a[c],u=Ln?.[c];if(u&&Zt&&l)Zt[u[0]]=l,Ln&&(Ln[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&Zt&&Ln){Zt[p]=l,Ln[c]=[p,l];break}}}}};return e&&r(i,e),n&&r(s,n),Zt}function wb(t,e){const{fingerprint:n,span:i,breadcrumbs:s,sdkProcessingMetadata:r}=e;bb(t,e),i&&Tb(t,i),Sb(t,n),Eb(t,s),Cb(t,r)}function ih(t,e){const{extra:n,tags:i,attributes:s,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:g}=e;fs(t,"extra",n),fs(t,"tags",i),fs(t,"attributes",s),fs(t,"user",r),fs(t,"contexts",o),t.sdkProcessingMetadata=lr(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),g&&(t.span=g),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function fs(t,e,n){t[e]=lr(t[e],n,1)}function vb(t,e){const n=_v().getScopeData();return t&&ih(n,t.getScopeData()),e&&ih(n,e.getScopeData()),n}function bb(t,e){const{extra:n,tags:i,user:s,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(s).length&&(t.user={...s,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Eb(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Cb(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Tb(t,e){t.contexts={trace:jv(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:tb(e),...t.sdkProcessingMetadata};const n=Hp(e),i=Ul(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function Sb(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function Ib(t,e,n,i,s,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Xe(),timestamp:e.timestamp||cr()},l=n.integrations||t.integrations.map(_=>_.name);kb(c,t),Nb(c,l),s&&s.emit("applyFrameMetadata",e),e.type===void 0&&Ab(c,t.stackParser);const u=Ob(i,n.captureContext);n.mechanism&&Fi(c,n.mechanism);const d=s?s.getEventProcessors():[],h=vb(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),wb(c,h);const p=[...d,...h.eventProcessors];return _b(p,c,n).then(_=>(_&&Rb(_),typeof o=="number"&&o>0?Pb(_,o,a):_))}function kb(t,e){const{environment:n,release:i,dist:s,maxValueLength:r}=e;t.environment=t.environment||n||$l,!t.release&&i&&(t.release=i),!t.dist&&s&&(t.dist=s);const o=t.request;o?.url&&r&&(o.url=Sc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=Sc(a.value,r))})}function Ab(t,e){const n=yb(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.filename&&(s.debug_id=n[s.filename])})})}function Rb(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.debug_id&&(s.abs_path?e[s.abs_path]=s.debug_id:s.filename&&(e[s.filename]=s.debug_id),delete s.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,s])=>{n.push({type:"sourcemap",code_file:i,debug_id:s})})}function Nb(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Pb(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(s=>({...s,...s.data&&{data:At(s.data,e,n)}}))},...t.user&&{user:At(t.user,e,n)},...t.contexts&&{contexts:At(t.contexts,e,n)},...t.extra&&{extra:At(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=At(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(s=>({...s,...s.data&&{data:At(s.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=At(t.contexts.flags,3,n)),i}function Ob(t,e){if(!e)return t;const n=t?t.clone():new Bt;return n.update(e),n}function Lb(t,e){return In().captureException(t,void 0)}function qp(t,e){return In().captureEvent(t,e)}function sh(t){const e=ur(),n=In(),{userAgent:i}=j.navigator||{},s=av({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),r=e.getSession();return r?.status==="ok"&&Ui(r,{status:"exited"}),zp(),e.setSession(s),s}function zp(){const t=ur(),n=In().getSession()||t.getSession();n&&cv(n),Gp(),t.setSession()}function Gp(){const t=ur(),e=Oe(),n=t.getSession();n&&e&&e.captureSession(n)}function rh(t=!1){if(t){zp();return}Gp()}const Db="7";function Mb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function xb(t){return`${Mb(t)}${t.projectId}/envelope/`}function Fb(t,e){const n={sentry_version:Db};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function Ub(t,e,n){return e||`${xb(t)}?${Fb(t,n)}`}const oh=[];function $b(t){const e={};return t.forEach(n=>{const{name:i}=n,s=e[i];s&&!s.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function Bb(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const s=n(e);i=Array.isArray(s)?s:[s]}else i=e;return $b(i)}function Hb(t,e){const n={};return e.forEach(i=>{i&&Kp(t,i,n)}),n}function ah(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Kp(t,e,n){if(n[e.name]){P&&I.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!oh.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),oh.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(s,r)=>i(s,r,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),s=Object.assign((r,o)=>i(r,o,t),{id:e.name});t.addEventProcessor(s)}P&&I.log(`Integration installed: ${e.name}`)}function Vb(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function jb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=dr(i)),Zi(s,[Vb(t)])}function Yp(t,e){const n=e??Wb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=jb(n,i._metadata,i.tunnel,t.getDsn());Jp().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(s)}function Wb(t){return Jp().get(t)}function Jp(){return Ji("clientToLogBufferMap",()=>new WeakMap)}function qb(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function zb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=dr(i)),Zi(s,[qb(t)])}function Xp(t,e){const n=e??Gb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=zb(n,i._metadata,i.tunnel,t.getDsn());Qp().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(s)}function Gb(t){return Qp().get(t)}function Qp(){return Ji("clientToMetricBufferMap",()=>new WeakMap)}const Hl=Symbol.for("SentryBufferFullError");function Vl(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function s(o){if(!n())return Bl(Hl);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function r(o){if(!e.size)return qo(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:s,drain:r}}const Kb=60*1e3;function Yb(t,e=jo()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?Kb:i-e}function Jb(t,e){return t[e]||t.all||0}function Xb(t,e,n=jo()){return Jb(t,e)>n}function Qb(t,{statusCode:e,headers:n},i=jo()){const s={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)s.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(s[f]=i+h):s[f]=i+h}else o?s.all=i+Yb(o,i):e===429&&(s.all=i+60*1e3);return s}const Zp=64;function Zb(t,e,n=Vl(t.bufferSize||Zp)){let i={};const s=o=>n.drain(o);function r(o){const a=[];if(Rc(o,(d,h)=>{const f=Qd(h);Xb(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Zi(o[0],a),l=d=>{if(cb(c,["client_report"])){P&&I.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}Rc(c,(h,f)=>{t.recordDroppedEvent(d,Qd(f))})},u=()=>e({body:lb(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&P&&I.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=Qb(i,d),d),d=>{throw l("network_error"),P&&I.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Hl)return P&&I.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:s}}function eE(t,e,n){const i=[{type:"client_report"},{timestamp:cr(),discarded_events:t}];return Zi(e?{dsn:e}:{},[i])}function eg(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function tE(t){const{trace_id:e,parent_span_id:n,span_id:i,status:s,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:s,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[xp],exclusive_time:o?.[Fp],measurements:t.measurements,is_segment:!0}}function nE(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[xp]:t.profile_id},...t.exclusive_time&&{[Fp]:t.exclusive_time}}}},measurements:t.measurements}}const ch="Not capturing exception because it's already been captured.",lh="Discarded session because of missing or non-string release",tg=Symbol.for("SentryInternalError"),ng=Symbol.for("SentryDoNotSendEventError"),iE=5e3;function Br(t){return{message:t,[tg]:!0}}function Ba(t){return{message:t,[ng]:!0}}function uh(t){return!!t&&typeof t=="object"&&tg in t}function dh(t){return!!t&&typeof t=="object"&&ng in t}function hh(t,e,n,i,s){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=i(c),r>=8e5?s(t):a||(a=!0,o=setTimeout(()=>{s(t)},iE))}),t.on("flush",()=>{s(t)})}class sE{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Vl(e.transportOptions?.bufferSize??Zp),e.dsn?this._dsn=Hv(e.dsn):P&&I.warn("No DSN provided, client will not send events."),this._dsn){const i=Ub(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&hh(this,"afterCaptureLog","flushLogs",cE,Yp),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&hh(this,"afterCaptureMetric","flushMetrics",aE,Xp)}captureException(e,n,i){const s=Xe();if($d(e))return P&&I.log(ch),s;const r={event_id:s,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,i)).then(o=>o),"error"),r.event_id}captureMessage(e,n,i,s){const r={event_id:Xe(),...i},o=Ll(e)?e:String(e),a=Bo(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,s)),a?"unknown":"error"),r.event_id}captureEvent(e,n,i){const s=Xe();if(n?.originalException&&$d(n.originalException))return P&&I.log(ch),s;const r={event_id:s,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=fh(e.type);return this._process(()=>this._captureEvent(e,r,a||i,c),l),r.event_id}captureSession(e){this.sendSession(e),Ui(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),s=await n.flush(e);return i&&s}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Kp(this,e,this._integrations),n||ah(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=mb(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of n.attachments||[])i=ab(i,db(s));this.sendEnvelope(i).then(s=>this.emit("afterSendEvent",e,s))}sendSession(e){const{release:n,environment:i=$l}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){P&&I.warn(lh);return}r.release=r.release||n,r.environment=r.environment||i,e.attrs=r}else{if(!e.release&&!n){P&&I.warn(lh);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const s=gb(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(s)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const s=`${e}:${n}`;P&&I.log(`Recording outcome: "${s}"${i>1?` (${i} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,s=(...r)=>n(...r);return i.add(s),()=>{i.delete(s)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(s=>s(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return P&&I.error("Error while sending envelope:",n),{}}return P&&I.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Hb(this,e),ah(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",s=!1;const r=n.exception?.values;if(r){s=!0,i=!1;for(const c of r)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(Ui(e,{...i&&{status:"crashed"},errors:e.errors||Number(s||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,s){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||s.setLastEventId(e.event_id||n.event_id),Ib(r,e,n,i,this,s).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:wv(i),...a.contexts};const c=eb(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=In(),s=ur()){return P&&Oc(e)&&I.log(`Captured error event \`${eg(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,s).then(r=>r.event_id,r=>{P&&(dh(r)?I.log(r.message):uh(r)?I.warn(r.message):I.warn(r))})}_processEvent(e,n,i,s){const r=this.getOptions(),{sampleRate:o}=r,a=ig(e),c=Oc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:Vv(o);if(c&&typeof d=="number"&&Zr()>d)return this.recordDroppedEvent("sample_rate","error"),Bl(Ba(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=fh(e.type);return this._prepareEvent(e,n,i,s).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ba("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const g=oE(this,r,f,n);return rE(g,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw Ba(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||s.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const _=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,N=_-T;N>0&&this.recordDroppedEvent("before_send","span",N)}const g=f.transaction_info;if(a&&g&&f.transaction!==e.transaction){const _="custom";f.transaction_info={...g,source:_}}return this.sendEvent(f,n),f}).then(null,f=>{throw dh(f)||uh(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Br(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(i=>(this._numProcessing--,i),i=>(this._numProcessing--,i===Hl&&this.recordDroppedEvent("queue_overflow",n),i))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[s,r]=n.split(":");return{reason:s,category:r,quantity:i}})}_flushOutcomes(){P&&I.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){P&&I.log("No outcomes to send");return}if(!this._dsn){P&&I.log("No dsn provided, will not send outcomes");return}P&&I.log("Sending outcomes:",e);const n=eE(e,this._options.tunnel&&dr(this._dsn));this.sendEnvelope(n)}}function fh(t){return t==="replay_event"?"replay":t||"error"}function rE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(ar(t))return t.then(i=>{if(!Us(i)&&i!==null)throw Br(n);return i},i=>{throw Br(`${e} rejected with ${i}`)});if(!Us(t)&&t!==null)throw Br(n);return t}function oE(t,e,n,i){const{beforeSend:s,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Oc(c)&&s)return s(c,i);if(ig(c)){if(o||a){const l=tE(c);if(a?.length&&Xd(l,a))return null;if(o){const u=o(l);u?c=lr(n,nE(u)):Yd()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Xd(f,a)){Xv(d,f);continue}if(o){const p=o(f);p?u.push(p):(Yd(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,i)}}return c}function Oc(t){return t.type===void 0}function ig(t){return t.type==="transaction"}function aE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+sg(t.attributes)}function cE(t){let e=0;return t.message&&(e+=t.message.length*2),e+sg(t.attributes)}function sg(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*ph(n[0]):Bo(n)?e+=ph(n):e+=100}),e}function ph(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function lE(t){return $o(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function gh(t){return lE(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function uE(t,e){e.debug===!0&&(P?I.enable():Xi(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),In().update(e.initialScope);const i=new t(e);return dE(i),i.init(),i}function dE(t){In().setClient(t)}function Ha(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function hE(t,e=!0){if(t.startsWith("data:")){const n=t.match(/^data:([^;,]+)/),i=n?n[1]:"text/plain",s=t.includes(";base64,"),r=t.indexOf(",");let o="";if(e&&r!==-1){const a=t.slice(r+1);o=a.length>10?`${a.slice(0,10)}... [truncated]`:a}return`data:${i}${s?",base64":""}${o?`,${o}`:""}`}return t}function fE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function pE(t,e,n=[e],i="npm"){const s=t._metadata||{};s.sdk||(s.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${i}:@sentry/${r}`,version:jn})),version:jn}),t._metadata=s}const gE=100;function Xn(t,e){const n=Oe(),i=ur();if(!n)return;const{beforeBreadcrumb:s=null,maxBreadcrumbs:r=gE}=n.getOptions();if(r<=0)return;const a={timestamp:cr(),...t},c=s?Xi(()=>s(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,r))}let mh;const mE="FunctionToString",_h=new WeakMap,_E=(()=>({name:mE,setupOnce(){mh=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=xl(this),n=_h.has(Oe())&&e!==void 0?e:this;return mh.apply(n,t)}}catch{}},setup(t){_h.set(t,!0)}})),yE=_E,wE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],vE="EventFilters",bE=(t={})=>{let e;return{name:vE,setup(n){const i=n.getOptions();e=yh(t,i)},processEvent(n,i,s){if(!e){const r=s.getOptions();e=yh(t,r)}return CE(n,e)?null:n}}},EE=((t={})=>({...bE(t),name:"InboundFilters"}));function yh(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:wE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function CE(t,e){if(t.type){if(t.type==="transaction"&&SE(t,e.ignoreTransactions))return P&&I.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${$n(t)}`),!0}else{if(TE(t,e.ignoreErrors))return P&&I.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${$n(t)}`),!0;if(RE(t))return P&&I.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${$n(t)}`),!0;if(IE(t,e.denyUrls))return P&&I.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${$n(t)}.
Url: ${eo(t)}`),!0;if(!kE(t,e.allowUrls))return P&&I.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${$n(t)}.
Url: ${eo(t)}`),!0}return!1}function TE(t,e){return e?.length?eg(t).some(n=>Wo(n,e)):!1}function SE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Wo(n,e):!1}function IE(t,e){if(!e?.length)return!1;const n=eo(t);return n?Wo(n,e):!1}function kE(t,e){if(!e?.length)return!0;const n=eo(t);return n?Wo(n,e):!0}function AE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function eo(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?AE(n):null}catch{return P&&I.error(`Cannot extract url for event ${$n(t)}`),null}}function RE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function NE(t,e,n,i,s,r){if(!s.exception?.values||!r||!wn(r.originalException,Error))return;const o=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;o&&(s.exception.values=Lc(t,e,i,r.originalException,n,s.exception.values,o,0))}function Lc(t,e,n,i,s,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(wn(i[s],Error)){wh(o,a);const l=t(e,i[s]),u=c.length;vh(l,s,u,a),c=Lc(t,e,n,i[s],s,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(wn(l,Error)){wh(o,a);const d=t(e,l),h=c.length;vh(d,`errors[${u}]`,h,a),c=Lc(t,e,n,l,s,[d,...c],d,h)}}),c}function wh(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function vh(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function PE(t){const e="console";di(e,t),hi(e,OE)}function OE(){"console"in j&&xw.forEach(function(t){t in j.console&&qe(j.console,t,function(e){return Qr[t]=e,function(...n){ct("console",{args:n,level:t}),Qr[t]?.apply(j.console,n)}})})}function LE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const DE="Dedupe",ME=(()=>{let t;return{name:DE,processEvent(e){if(e.type)return e;try{if(FE(e,t))return P&&I.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),xE=ME;function FE(t,e){return e?!!(UE(t,e)||$E(t,e)):!1}function UE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!og(t,e)||!rg(t,e))}function $E(t,e){const n=bh(e),i=bh(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!og(t,e)||!rg(t,e))}function rg(t,e){let n=Ld(t),i=Ld(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let s=0;s<i.length;s++){const r=i[s],o=n[s];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function og(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function bh(t){return t.exception?.values?.[0]}function ag(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Bs=j;function BE(){return"history"in Bs&&!!Bs.history}function HE(){if(!("fetch"in Bs))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Dc(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function VE(){if(typeof EdgeRuntime=="string")return!0;if(!HE())return!1;if(Dc(Bs.fetch))return!0;let t=!1;const e=Bs.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Dc(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){P&&I.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function jE(t,e){const n="fetch";di(n,t),hi(n,()=>WE(void 0,e))}function WE(t,e=!1){e&&!VE()||qe(j,"fetch",function(n){return function(...i){const s=new Error,{method:r,url:o}=qE(i),a={args:i,fetchData:{method:r,url:o},startTimestamp:Ft()*1e3,virtualError:s,headers:zE(i)};return ct("fetch",{...a}),n.apply(j,i).then(async c=>(ct("fetch",{...a,endTimestamp:Ft()*1e3,response:c}),c),c=>{ct("fetch",{...a,endTimestamp:Ft()*1e3,error:c}),$o(c)&&c.stack===void 0&&(c.stack=s.stack,vn(c,"framesToPop",1));const u=Oe()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:vn(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function Hr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Eh(t){return typeof t=="string"?t:t?Hr(t,"url")?t.url:t.toString?t.toString():"":""}function qE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:Eh(n),method:Hr(i,"method")?String(i.method).toUpperCase():Rp(n)&&Hr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:Eh(e),method:Hr(e,"method")?String(e.method).toUpperCase():"GET"}}function zE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Rp(e))return new Headers(e.headers)}catch{}}function GE(){return"npm"}const ae=j;let Mc=0;function cg(){return Mc>0}function KE(){Mc++,setTimeout(()=>{Mc--})}function Bi(t,e={}){function n(s){return typeof s=="function"}if(!n(t))return t;try{const s=t.__sentry_wrapped__;if(s)return typeof s=="function"?s:t;if(xl(t))return t}catch{return t}const i=function(...s){try{const r=s.map(o=>Bi(o,e));return t.apply(this,r)}catch(r){throw KE(),yv(o=>{o.addEventProcessor(a=>(e.mechanism&&(Ic(a,void 0),Fi(a,e.mechanism)),a.extra={...a.extra,arguments:s},a)),Lb(r)}),r}};try{for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s])}catch{}Pp(i,t),vn(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function YE(){const t=Ml(),{referrer:e}=ae.document||{},{userAgent:n}=ae.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function jl(t,e){const n=Wl(t,e),i={type:eC(e),value:tC(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function JE(t,e,n,i){const r=Oe()?.getOptions().normalizeDepth,o=oC(e),a={__serialized__:jp(e,r)};if(o)return{exception:{values:[jl(t,o)]},extra:a};const c={exception:{values:[{type:Ho(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:sC(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=Wl(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Va(t,e){return{exception:{values:[jl(t,e)]}}}function Wl(t,e){const n=e.stacktrace||e.stack||"",i=QE(e),s=ZE(e);try{return t(n,i,s)}catch{}return[]}const XE=/Minified React error #\d+;/i;function QE(t){return t&&XE.test(t.message)?1:0}function ZE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function lg(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function eC(t){const e=t?.name;return!e&&lg(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function tC(t){const e=t?.message;return lg(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?gh(e.error):gh(t):"No error message"}function nC(t,e,n,i){const s=n?.syntheticException||void 0,r=ql(t,e,s,i);return Fi(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),qo(r)}function iC(t,e,n="info",i,s){const r=i?.syntheticException||void 0,o=xc(t,e,r,s);return o.level=n,i?.event_id&&(o.event_id=i.event_id),qo(o)}function ql(t,e,n,i,s){let r;if(kp(e)&&e.error)return Va(t,e.error);if(Md(e)||Yw(e)){const o=e;if("stack"in e)r=Va(t,e);else{const a=o.name||(Md(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=xc(t,c,n,i),Ic(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return $o(e)?Va(t,e):Us(e)||Ho(e)?(r=JE(t,e,n,s),Fi(r,{synthetic:!0}),r):(r=xc(t,e,n,i),Ic(r,`${e}`),Fi(r,{synthetic:!0}),r)}function xc(t,e,n,i){const s={};if(i&&n){const r=Wl(t,n);r.length&&(s.exception={values:[{value:e,stacktrace:{frames:r}}]}),Fi(s,{synthetic:!0})}if(Ll(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return s.logentry={message:r,params:o},s}return s.message=e,s}function sC(t,{isUnhandledRejection:e}){const n=nv(t),i=e?"promise rejection":"exception";return kp(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:Ho(t)?`Event \`${rC(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function rC(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function oC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class aC extends sE{constructor(e){const n=cC(e),i=ae.SENTRY_SDK_SOURCE||GE();pE(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:s,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;ae.document&&(r||o||l)&&ae.document.addEventListener("visibilitychange",()=>{ae.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&Yp(this),l&&Xp(this))}),s&&this.on("beforeSendSession",fE)}eventFromException(e,n){return nC(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return iC(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,s){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,s)}}function cC(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:ae.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const lC=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Le=j,uC=1e3;let Ch,Fc,Uc;function dC(t){di("dom",t),hi("dom",hC)}function hC(){if(!Le.document)return;const t=ct.bind(null,"dom"),e=Th(t,!0);Le.document.addEventListener("click",e,!1),Le.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const s=Le[n]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(qe(s,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=Th(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),qe(s,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function fC(t){if(t.type!==Fc)return!1;try{if(!t.target||t.target._sentryId!==Uc)return!1}catch{}return!0}function pC(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function Th(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=gC(n);if(pC(n.type,i))return;vn(n,"_sentryCaptured",!0),i&&!i._sentryId&&vn(i,"_sentryId",Xe());const s=n.type==="keypress"?"input":n.type;fC(n)||(t({event:n,name:s,global:e}),Fc=n.type,Uc=i?i._sentryId:void 0),clearTimeout(Ch),Ch=Le.setTimeout(()=>{Uc=void 0,Fc=void 0},uC)}}function gC(t){try{return t.target}catch{return null}}let Ar;function ug(t){const e="history";di(e,t),hi(e,mC)}function mC(){if(Le.addEventListener("popstate",()=>{const e=Le.location.href,n=Ar;if(Ar=e,n===e)return;ct("history",{from:n,to:e})}),!BE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const s=Ar,r=_C(String(i));if(Ar=r,s===r)return e.apply(this,n);ct("history",{from:s,to:r})}return e.apply(this,n)}}qe(Le.history,"pushState",t),qe(Le.history,"replaceState",t)}function _C(t){try{return new URL(t,Le.location.origin).toString()}catch{return t}}const Vr={};function yC(t){const e=Vr[t];if(e)return e;let n=Le[t];if(Dc(n))return Vr[t]=n.bind(Le);const i=Le.document;if(i&&typeof i.createElement=="function")try{const s=i.createElement("iframe");s.hidden=!0,i.head.appendChild(s);const r=s.contentWindow;r?.[t]&&(n=r[t]),i.head.removeChild(s)}catch(s){lC&&I.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,s)}return n&&(Vr[t]=n.bind(Le))}function wC(t){Vr[t]=void 0}const Es="__sentry_xhr_v3__";function vC(t){di("xhr",t),hi("xhr",bC)}function bC(){if(!Le.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const s=new Error,r=Ft()*1e3,o=xt(i[0])?i[0].toUpperCase():void 0,a=EC(i[1]);if(!o||!a)return e.apply(n,i);n[Es]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Es];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Ft()*1e3,startTimestamp:r,xhr:n,virtualError:s};ct("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Es];return p&&xt(h)&&xt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const s=n[Es];if(!s)return e.apply(n,i);i[0]!==void 0&&(s.body=i[0]);const r={startTimestamp:Ft()*1e3,xhr:n};return ct("xhr",r),e.apply(n,i)}})}function EC(t){if(xt(t))return t;try{return t.toString()}catch{}}const CC=40;function TC(t,e=yC("fetch")){let n=0,i=0;async function s(r){const o=r.body.length;n+=o,i++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw wC("fetch"),c}finally{n-=o,i--}}return Zb(t,s,Vl(t.bufferSize||CC))}const zo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,SC=30,IC=50;function $c(t,e,n,i){const s={filename:t,function:e==="<anonymous>"?Jn:e,in_app:!0};return n!==void 0&&(s.lineno=n),i!==void 0&&(s.colno=i),s}const kC=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,AC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,RC=/\((\S*)(?::(\d+))(?::(\d+))\)/,NC=/at (.+?) ?\(data:(.+?),/,PC=t=>{const e=t.match(NC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=kC.exec(t);if(n){const[,s,r,o]=n;return $c(s,Jn,+r,+o)}const i=AC.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=RC.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[r,o]=dg(i[1]||Jn,i[2]);return $c(o,r,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},OC=[SC,PC],LC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,DC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,MC=t=>{const e=LC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=DC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let i=e[3],s=e[1]||Jn;return[s,i]=dg(s,i),$c(i,s,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},xC=[IC,MC],FC=[OC,xC],UC=Tp(...FC),dg=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:Jn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Rr=1024,$C="Breadcrumbs",BC=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:$C,setup(n){e.console&&PE(WC(n)),e.dom&&dC(jC(n,e.dom)),e.xhr&&vC(qC(n)),e.fetch&&jE(zC(n)),e.history&&ug(GC(n)),e.sentry&&n.on("beforeSendEvent",VC(n))}}}),HC=BC;function VC(t){return function(n){Oe()===t&&Xn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:$n(n)},{event:n})}}function jC(t,e){return function(i){if(Oe()!==t)return;let s,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Rr&&(zo&&I.warn(`\`dom.maxStringLength\` cannot exceed ${Rr}, but a value of ${a} was configured. Sentry will use ${Rr} instead.`),a=Rr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=KC(l)?l.target:l;s=Np(u,{keyAttrs:o,maxStringLength:a}),r=tv(u)}catch{s="<unknown>"}if(s.length===0)return;const c={category:`ui.${i.name}`,message:s};r&&(c.data={"ui.component_name":r}),Xn(c,{event:i.event,name:i.name,global:i.global})}}function WC(t){return function(n){if(Oe()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:LE(n.level),message:Ud(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${Ud(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;Xn(i,{input:n.args,level:n.level})}}function qC(t){return function(n){if(Oe()!==t)return;const{startTimestamp:i,endTimestamp:s}=n,r=n.xhr[Es];if(!i||!s||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:s},h={category:"xhr",data:u,type:"http",level:ag(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Xn(h,d)}}function zC(t){return function(n){if(Oe()!==t)return;const{startTimestamp:i,endTimestamp:s}=n;if(s&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:s},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Xn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:i,endTimestamp:s},c={category:"fetch",data:o,type:"http",level:ag(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Xn(c,a)}}}function GC(t){return function(n){if(Oe()!==t)return;let i=n.from,s=n.to;const r=Ha(ae.location.href);let o=i?Ha(i):void 0;const a=Ha(s);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(s=a.relative),r.protocol===o.protocol&&r.host===o.host&&(i=o.relative),Xn({category:"navigation",data:{from:i,to:s}})}}function KC(t){return!!t&&!!t.target}const YC=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],JC="BrowserApiErrors",XC=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:JC,setupOnce(){e.setTimeout&&qe(ae,"setTimeout",Sh),e.setInterval&&qe(ae,"setInterval",Sh),e.requestAnimationFrame&&qe(ae,"requestAnimationFrame",ZC),e.XMLHttpRequest&&"XMLHttpRequest"in ae&&qe(XMLHttpRequest.prototype,"send",eT);const n=e.eventTarget;n&&(Array.isArray(n)?n:YC).forEach(s=>tT(s,e))}}}),QC=XC;function Sh(t){return function(...e){const n=e[0];return e[0]=Bi(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${yn(t)}`}}),t.apply(this,e)}}function ZC(t){return function(e){return t.apply(this,[Bi(e,{mechanism:{data:{handler:yn(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function eT(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(s=>{s in n&&typeof n[s]=="function"&&qe(n,s,function(r){const o={mechanism:{data:{handler:yn(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${s}`}},a=xl(r);return a&&(o.mechanism.data.handler=yn(a)),Bi(r,o)})}),t.apply(this,e)}}function tT(t,e){const i=ae[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(qe(i,"addEventListener",function(s){return function(r,o,a){try{nT(o)&&(o.handleEvent=Bi(o.handleEvent,{mechanism:{data:{handler:yn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&iT(this,r,o),s.apply(this,[r,Bi(o,{mechanism:{data:{handler:yn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),qe(i,"removeEventListener",function(s){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&s.call(this,r,c,a)}catch{}return s.call(this,r,o,a)}}))}function nT(t){return typeof t.handleEvent=="function"}function iT(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const sT=()=>({name:"BrowserSession",setupOnce(){if(typeof ae.document>"u"){zo&&I.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}sh({ignoreDuration:!0}),rh(),ug(({from:t,to:e})=>{t!==void 0&&t!==e&&(sh({ignoreDuration:!0}),rh())})}}),rT="GlobalHandlers",oT=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:rT,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(cT(n),Ih("onerror")),e.onunhandledrejection&&(lT(n),Ih("onunhandledrejection"))}}}),aT=oT;function cT(t){qw(e=>{const{stackParser:n,attachStacktrace:i}=hg();if(Oe()!==t||cg())return;const{msg:s,url:r,line:o,column:a,error:c}=e,l=hT(ql(n,c||s,void 0,i,!1),r,o,a);l.level="error",qp(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function lT(t){Gw(e=>{const{stackParser:n,attachStacktrace:i}=hg();if(Oe()!==t||cg())return;const s=uT(e),r=Bo(s)?dT(s):ql(n,s,void 0,i,!0);r.level="error",qp(r,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function uT(t){if(Bo(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function dT(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function hT(t,e,n,i){const s=t.exception=t.exception||{},r=s.values=s.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=fT(e)??Ml();return c.length===0&&c.push({colno:l,filename:d,function:Jn,in_app:!0,lineno:u}),t}function Ih(t){zo&&I.log(`Global Handler attached: ${t}`)}function hg(){return Oe()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function fT(t){if(!(!xt(t)||t.length===0))return t.startsWith("data:")?`<${hE(t,!1)}>`:t}const pT=()=>({name:"HttpContext",preprocessEvent(t){if(!ae.navigator&&!ae.location&&!ae.document)return;const e=YE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),gT="cause",mT=5,_T="LinkedErrors",yT=((t={})=>{const e=t.limit||mT,n=t.key||gT;return{name:_T,preprocessEvent(i,s,r){const o=r.getOptions();NE(jl,o.stackParser,n,e,i,s)}}}),wT=yT;function vT(){return bT()?(zo&&Xi(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function bT(){if(typeof ae.window>"u")return!1;const t=ae;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=Ml(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(ae===ae.top&&i.some(r=>n.startsWith(`${r}://`)))}function ET(t){return[EE(),yE(),QC(),HC(),aT(),wT(),xE(),pT(),sT()]}function CT(t={}){const e=!t.skipBrowserExtensionCheck&&vT();let n=t.defaultIntegrations==null?ET():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:jw(t.stackParser||UC),integrations:Bb({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||TC};return uE(aC,i)}const TT="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";CT({dsn:TT,sendDefaultPii:!0});/**
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
 */const ST=()=>{};var kh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m=function(t,e){if(!t)throw es(e)},es=function(t){return new Error("Firebase Database ("+fg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pg=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},IT=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Go={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(pg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):IT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new kT;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class kT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gg=function(t){const e=pg(t);return Go.encodeByteArray(e,!0)},to=function(t){return gg(t).replace(/\./g,"")},no=function(t){try{return Go.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AT(t){return mg(void 0,t)}function mg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!RT(n)||(t[n]=mg(t[n],e[n]));return t}function RT(t){return t!=="__proto__"}/**
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
 */function _g(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const NT=()=>_g().__FIREBASE_DEFAULTS__,PT=()=>{if(typeof process>"u"||typeof kh>"u")return;const t=kh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},OT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&no(t[1]);return e&&JSON.parse(e)},zl=()=>{try{return ST()||NT()||PT()||OT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},yg=t=>zl()?.emulatorHosts?.[t],LT=t=>{const e=yg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},wg=()=>zl()?.config,vg=t=>zl()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function ts(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bg(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function DT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[to(JSON.stringify(n)),to(JSON.stringify(o)),""].join(".")}const Ss={};function MT(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ss))Ss[e]?t.emulator.push(e):t.prod.push(e);return t}function xT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Ah=!1;function Eg(t,e){if(typeof window>"u"||typeof document>"u"||!ts(window.location.host)||Ss[t]===e||Ss[t]||Ah)return;Ss[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=MT().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Ah=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=xT(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),g=n("learnmore"),_=document.getElementById(g)||document.createElement("a"),T=n("preprendIcon"),N=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const $=h.element;a($),u(_,g);const y=l();c(N,T),$.append(N,p,_,y),document.body.appendChild($)}r?(p.innerText="Preview backend disconnected.",N.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(N.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,p.innerText="Preview backend running in this workspace."),p.setAttribute("id",f)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",d):d()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ue())}function FT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function UT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Cg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $T(){const t=Ue();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function BT(){return fg.NODE_ADMIN===!0}function Ko(){try{return typeof indexedDB=="object"}catch{return!1}}function Tg(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function HT(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT="FirebaseError";class Yt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=VT,Object.setPrototypeOf(this,Yt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,kn.prototype.create)}}class kn{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?jT(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Yt(s,a,i)}}function jT(t,e){return t.replace(WT,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const WT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hs(t){return JSON.parse(t)}function fe(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sg=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Hs(no(r[0])||""),n=Hs(no(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},qT=function(t){const e=Sg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},zT=function(t){const e=Sg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Hi(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function io(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function so(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function Qn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(Rh(r)&&Rh(o)){if(!Qn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function Rh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function KT(t,e){const n=new YT(t,e);return n.subscribe.bind(n)}class YT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");JT(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=ja),s.error===void 0&&(s.error=ja),s.complete===void 0&&(s.complete=ja);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function JT(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function ja(){}function Vi(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XT=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,m(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Yo=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const QT=1e3,ZT=2,eS=14400*1e3,tS=.5;function nS(t,e=QT,n=ZT){const i=e*Math.pow(n,t),s=Math.round(tS*i*(Math.random()-.5)*2);return Math.min(eS,i+s)}/**
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
 */function se(t){return t&&t._delegate?t._delegate:t}class Ge{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const xn="[DEFAULT]";/**
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
 */class iS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Be;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(rS(e))try{this.getOrInitializeService({instanceIdentifier:xn})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=xn){return this.instances.has(e)}getOptions(e=xn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:sS(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=xn){return this.component?this.component.multipleInstances?e:xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function sS(t){return t===xn?void 0:t}function rS(t){return t.instantiationMode==="EAGER"}/**
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
 */class oS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new iS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var q;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(q||(q={}));const aS={debug:q.DEBUG,verbose:q.VERBOSE,info:q.INFO,warn:q.WARN,error:q.ERROR,silent:q.SILENT},cS=q.INFO,lS={[q.DEBUG]:"log",[q.VERBOSE]:"log",[q.INFO]:"info",[q.WARN]:"warn",[q.ERROR]:"error"},uS=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=lS[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Jo{constructor(e){this.name=e,this._logLevel=cS,this._logHandler=uS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?aS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,q.DEBUG,...e),this._logHandler(this,q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,q.VERBOSE,...e),this._logHandler(this,q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,q.INFO,...e),this._logHandler(this,q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,q.WARN,...e),this._logHandler(this,q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,q.ERROR,...e),this._logHandler(this,q.ERROR,...e)}}const dS=(t,e)=>e.some(n=>t instanceof n);let Nh,Ph;function hS(){return Nh||(Nh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function fS(){return Ph||(Ph=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ig=new WeakMap,Bc=new WeakMap,kg=new WeakMap,Wa=new WeakMap,Kl=new WeakMap;function pS(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Ut(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ig.set(n,t)}).catch(()=>{}),Kl.set(e,t),e}function gS(t){if(Bc.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Bc.set(t,e)}let Hc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Bc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||kg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ut(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function mS(t){Hc=t(Hc)}function _S(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(qa(this),e,...n);return kg.set(i,e.sort?e.sort():[e]),Ut(i)}:fS().includes(t)?function(...e){return t.apply(qa(this),e),Ut(Ig.get(this))}:function(...e){return Ut(t.apply(qa(this),e))}}function yS(t){return typeof t=="function"?_S(t):(t instanceof IDBTransaction&&gS(t),dS(t,hS())?new Proxy(t,Hc):t)}function Ut(t){if(t instanceof IDBRequest)return pS(t);if(Wa.has(t))return Wa.get(t);const e=yS(t);return e!==t&&(Wa.set(t,e),Kl.set(e,t)),e}const qa=t=>Kl.get(t);function Xo(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Ut(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Ut(o.result),c.oldVersion,c.newVersion,Ut(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function za(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Ut(n).then(()=>{})}const wS=["get","getKey","getAll","getAllKeys","count"],vS=["put","add","delete","clear"],Ga=new Map;function Oh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ga.get(e))return Ga.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=vS.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||wS.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Ga.set(e,r),r}mS(t=>({...t,get:(e,n,i)=>Oh(e,n)||t.get(e,n,i),has:(e,n)=>!!Oh(e,n)||t.has(e,n)}));/**
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
 */class bS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ES(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function ES(t){return t.getComponent()?.type==="VERSION"}const Vc="@firebase/app",Lh="0.14.7";/**
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
 */const Ht=new Jo("@firebase/app"),CS="@firebase/app-compat",TS="@firebase/analytics-compat",SS="@firebase/analytics",IS="@firebase/app-check-compat",kS="@firebase/app-check",AS="@firebase/auth",RS="@firebase/auth-compat",NS="@firebase/database",PS="@firebase/data-connect",OS="@firebase/database-compat",LS="@firebase/functions",DS="@firebase/functions-compat",MS="@firebase/installations",xS="@firebase/installations-compat",FS="@firebase/messaging",US="@firebase/messaging-compat",$S="@firebase/performance",BS="@firebase/performance-compat",HS="@firebase/remote-config",VS="@firebase/remote-config-compat",jS="@firebase/storage",WS="@firebase/storage-compat",qS="@firebase/firestore",zS="@firebase/ai",GS="@firebase/firestore-compat",KS="firebase",YS="12.8.0";/**
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
 */const jc="[DEFAULT]",JS={[Vc]:"fire-core",[CS]:"fire-core-compat",[SS]:"fire-analytics",[TS]:"fire-analytics-compat",[kS]:"fire-app-check",[IS]:"fire-app-check-compat",[AS]:"fire-auth",[RS]:"fire-auth-compat",[NS]:"fire-rtdb",[PS]:"fire-data-connect",[OS]:"fire-rtdb-compat",[LS]:"fire-fn",[DS]:"fire-fn-compat",[MS]:"fire-iid",[xS]:"fire-iid-compat",[FS]:"fire-fcm",[US]:"fire-fcm-compat",[$S]:"fire-perf",[BS]:"fire-perf-compat",[HS]:"fire-rc",[VS]:"fire-rc-compat",[jS]:"fire-gcs",[WS]:"fire-gcs-compat",[qS]:"fire-fst",[GS]:"fire-fst-compat",[zS]:"fire-vertex","fire-js":"fire-js",[KS]:"fire-js-all"};/**
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
 */const ro=new Map,XS=new Map,Wc=new Map;function Dh(t,e){try{t.container.addComponent(e)}catch(n){Ht.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function et(t){const e=t.name;if(Wc.has(e))return Ht.debug(`There were multiple attempts to register component ${e}.`),!1;Wc.set(e,t);for(const n of ro.values())Dh(n,t);for(const n of XS.values())Dh(n,t);return!0}function An(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function it(t){return t==null?!1:t.settings!==void 0}/**
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
 */const QS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fn=new kn("app","Firebase",QS);/**
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
 */class ZS{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ge("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fn.create("app-deleted",{appName:this._name})}}/**
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
 */const is=YS;function Ag(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:jc,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw fn.create("bad-app-name",{appName:String(s)});if(n||(n=wg()),!n)throw fn.create("no-options");const r=ro.get(s);if(r){if(Qn(n,r.options)&&Qn(i,r.config))return r;throw fn.create("duplicate-app",{appName:s})}const o=new oS(s);for(const c of Wc.values())o.addComponent(c);const a=new ZS(n,i,o);return ro.set(s,a),a}function Qo(t=jc){const e=ro.get(t);if(!e&&t===jc&&wg())return Ag();if(!e)throw fn.create("no-app",{appName:t});return e}function ze(t,e,n){let i=JS[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ht.warn(o.join(" "));return}et(new Ge(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const eI="firebase-heartbeat-database",tI=1,Vs="firebase-heartbeat-store";let Ka=null;function Rg(){return Ka||(Ka=Xo(eI,tI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Vs)}catch(n){console.warn(n)}}}}).catch(t=>{throw fn.create("idb-open",{originalErrorMessage:t.message})})),Ka}async function nI(t){try{const n=(await Rg()).transaction(Vs),i=await n.objectStore(Vs).get(Ng(t));return await n.done,i}catch(e){if(e instanceof Yt)Ht.warn(e.message);else{const n=fn.create("idb-get",{originalErrorMessage:e?.message});Ht.warn(n.message)}}}async function Mh(t,e){try{const i=(await Rg()).transaction(Vs,"readwrite");await i.objectStore(Vs).put(e,Ng(t)),await i.done}catch(n){if(n instanceof Yt)Ht.warn(n.message);else{const i=fn.create("idb-set",{originalErrorMessage:n?.message});Ht.warn(i.message)}}}function Ng(t){return`${t.name}!${t.options.appId}`}/**
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
 */const iI=1024,sI=30;class rI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new aI(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=xh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>sI){const s=cI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Ht.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=xh(),{heartbeatsToSend:n,unsentEntries:i}=oI(this._heartbeatsCache.heartbeats),s=to(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Ht.warn(e),""}}}function xh(){return new Date().toISOString().substring(0,10)}function oI(t,e=iI){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Fh(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Fh(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class aI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ko()?Tg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await nI(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Mh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return Mh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Fh(t){return to(JSON.stringify({version:2,heartbeats:t})).length}function cI(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function lI(t){et(new Ge("platform-logger",e=>new bS(e),"PRIVATE")),et(new Ge("heartbeat",e=>new rI(e),"PRIVATE")),ze(Vc,Lh,t),ze(Vc,Lh,"esm2020"),ze("fire-js","")}lI("");var Uh={};const $h="@firebase/database",Bh="1.1.0";/**
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
 */let Pg="";function Og(t){Pg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),fe(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Hs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return kt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lg=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new uI(e)}}catch{}return new dI},Bn=Lg("localStorage"),hI=Lg("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=new Jo("@firebase/database"),fI=(function(){let t=1;return function(){return t++}})(),Dg=function(t){const e=XT(t),n=new GT;n.update(e);const i=n.digest();return Go.encodeByteArray(i)},hr=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=hr.apply(null,i):typeof i=="object"?e+=fe(i):e+=i,e+=" "}return e};let Is=null,Hh=!0;const pI=function(t,e){m(!0,"Can't turn on custom loggers persistently."),Ti.logLevel=q.VERBOSE,Is=Ti.log.bind(Ti)},we=function(...t){if(Hh===!0&&(Hh=!1,Is===null&&hI.get("logging_enabled")===!0&&pI()),Is){const e=hr.apply(null,t);Is(e)}},fr=function(t){return function(...e){we(t,...e)}},qc=function(...t){const e="FIREBASE INTERNAL ERROR: "+hr(...t);Ti.error(e)},Vt=function(...t){const e=`FIREBASE FATAL ERROR: ${hr(...t)}`;throw Ti.error(e),new Error(e)},Fe=function(...t){const e="FIREBASE WARNING: "+hr(...t);Ti.warn(e)},gI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Fe("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Zo=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},mI=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ji="[MIN_NAME]",Zn="[MAX_NAME]",fi=function(t,e){if(t===e)return 0;if(t===ji||e===Zn)return-1;if(e===ji||t===Zn)return 1;{const n=Vh(t),i=Vh(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},_I=function(t,e){return t===e?0:t<e?-1:1},ps=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+fe(e))},Yl=function(t){if(typeof t!="object"||t===null)return fe(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=fe(e[i]),n+=":",n+=Yl(t[e[i]]);return n+="}",n},Mg=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function Ee(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const xg=function(t){m(!Zo(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},yI=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},wI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function vI(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const bI=new RegExp("^-?(0*)\\d{1,10}$"),EI=-2147483648,CI=2147483647,Vh=function(t){if(bI.test(t)){const e=Number(t);if(e>=EI&&e<=CI)return e}return null},ss=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Fe("Exception was thrown by user callback.",n),e},Math.floor(0))}},TI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ks=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class SI{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,it(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Fe(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class II{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(we("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Fe(e)}}class jr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}jr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl="5",Fg="v",Ug="s",$g="r",Bg="f",Hg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Vg="ls",jg="p",zc="ac",Wg="websocket",qg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zg{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Bn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Bn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function kI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Gg(t,e,n){m(typeof e=="string","typeof type must == string"),m(typeof n=="object","typeof params must == object");let i;if(e===Wg)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===qg)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);kI(t)&&(n.ns=t.namespace);const s=[];return Ee(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(){this.counters_={}}incrementCounter(e,n=1){kt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return AT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya={},Ja={};function Xl(t){const e=t.toString();return Ya[e]||(Ya[e]=new AI),Ya[e]}function RI(t,e){const n=t.toString();return Ja[n]||(Ja[n]=e()),Ja[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&ss(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jh="start",PI="close",OI="pLPCommand",LI="pRTLPCB",Kg="id",Yg="pw",Jg="ser",DI="cb",MI="seg",xI="ts",FI="d",UI="dframe",Xg=1870,Qg=30,$I=Xg-Qg,BI=25e3,HI=3e4;class bi{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=fr(e),this.stats_=Xl(n),this.urlFn=c=>(this.appCheckToken&&(c[zc]=this.appCheckToken),Gg(n,qg,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new NI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(HI)),mI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ql((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===jh)this.id=a,this.password=c;else if(o===PI)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[jh]="t",i[Jg]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[DI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Fg]=Jl,this.transportSessionId&&(i[Ug]=this.transportSessionId),this.lastSessionId&&(i[Vg]=this.lastSessionId),this.applicationId&&(i[jg]=this.applicationId),this.appCheckToken&&(i[zc]=this.appCheckToken),typeof location<"u"&&location.hostname&&Hg.test(location.hostname)&&(i[$g]=Bg);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){bi.forceAllow_=!0}static forceDisallow(){bi.forceDisallow_=!0}static isAvailable(){return bi.forceAllow_?!0:!bi.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!yI()&&!wI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=fe(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=gg(n),s=Mg(i,$I);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[UI]="t",i[Kg]=e,i[Yg]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=fe(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Ql{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=fI(),window[OI+this.uniqueCallbackIdentifier]=e,window[LI+this.uniqueCallbackIdentifier]=n,this.myIFrame=Ql.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){we("frame writing exception"),a.stack&&we(a.stack),we(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||we("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Kg]=this.myID,e[Yg]=this.myPW,e[Jg]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Qg+i.length<=Xg;){const o=this.pendingSegs.shift();i=i+"&"+MI+s+"="+o.seg+"&"+xI+s+"="+o.ts+"&"+FI+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(BI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{we("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI=16384,jI=45e3;let oo=null;typeof MozWebSocket<"u"?oo=MozWebSocket:typeof WebSocket<"u"&&(oo=WebSocket);class st{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=fr(this.connId),this.stats_=Xl(n),this.connURL=st.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Fg]=Jl,typeof location<"u"&&location.hostname&&Hg.test(location.hostname)&&(o[$g]=Bg),n&&(o[Ug]=n),i&&(o[Vg]=i),s&&(o[zc]=s),r&&(o[jg]=r),Gg(e,Wg,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Bn.set("previous_websocket_failure",!0);try{let i;BT(),this.mySock=new oo(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){st.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&oo!==null&&!st.forceDisallow_}static previouslyFailed(){return Bn.isInMemoryStorage||Bn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Bn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Hs(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(m(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=fe(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Mg(n,VI);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(jI))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}st.responsesRequiredToBeHealthy=2;st.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{static get ALL_TRANSPORTS(){return[bi,st]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=st&&st.isAvailable();let i=n&&!st.previouslyFailed();if(e.webSocketOnly&&(n||Fe("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[st];else{const s=this.transports_=[];for(const r of js.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);js.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}js.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=6e4,qI=5e3,zI=10*1024,GI=100*1024,Xa="t",Wh="d",KI="s",qh="r",YI="e",zh="o",Gh="a",Kh="n",Yh="p",JI="h";class XI{constructor(e,n,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=fr("c:"+this.id+":"),this.transportManager_=new js(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ks(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>GI?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>zI?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Xa in e){const n=e[Xa];n===Gh?this.upgradeIfSecondaryHealthy_():n===qh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===zh&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ps("t",e),i=ps("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Yh,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Gh,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Kh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ps("t",e),i=ps("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ps(Xa,e);if(Wh in e){const i=e[Wh];if(n===JI){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Kh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===KI?this.onConnectionShutdown_(i):n===qh?this.onReset_(i):n===YI?qc("Server Error: "+i):n===zh?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):qc("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Jl!==i&&Fe("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),ks(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(WI))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ks(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(qI))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Yh,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Bn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e){this.allowedEvents_=e,this.listeners_={},m(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){m(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao extends em{static getInstance(){return new ao}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Gl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return m(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh=32,Xh=768;class W{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function H(){return new W("")}function D(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function bn(t){return t.pieces_.length-t.pieceNum_}function K(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new W(t.pieces_,e)}function Zl(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function QI(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Ws(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function tm(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new W(e,0)}function ne(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof W)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new W(n,0)}function M(t){return t.pieceNum_>=t.pieces_.length}function De(t,e){const n=D(t),i=D(e);if(n===null)return e;if(n===i)return De(K(t),K(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function ZI(t,e){const n=Ws(t,0),i=Ws(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=fi(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function eu(t,e){if(bn(t)!==bn(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function Je(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(bn(t)>bn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class ek{constructor(e,n){this.errorPrefix_=n,this.parts_=Ws(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Yo(this.parts_[i]);nm(this)}}function tk(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Yo(e),nm(t)}function nk(t){const e=t.parts_.pop();t.byteLength_-=Yo(e),t.parts_.length>0&&(t.byteLength_-=1)}function nm(t){if(t.byteLength_>Xh)throw new Error(t.errorPrefix_+"has a key path longer than "+Xh+" bytes ("+t.byteLength_+").");if(t.parts_.length>Jh)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Jh+") or object contains a cycle "+Fn(t))}function Fn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu extends em{static getInstance(){return new tu}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return m(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=1e3,ik=300*1e3,Qh=30*1e3,sk=1.3,rk=3e4,ok="server_kill",Zh=3;class $t extends Zg{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=$t.nextPersistentConnectionId_++,this.log_=fr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=gs,this.maxReconnectDelay_=ik,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");tu.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ao.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(fe(r)),m(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Be,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),m(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;$t.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&kt(e,"w")){const i=Hi(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Fe(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||zT(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Qh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=qT(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),m(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+fe(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):qc("Unrecognized action received from server: "+fe(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){m(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=gs,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=gs,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>rk&&(this.reconnectDelay_=gs),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*sk)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+$t.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){m(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?we("getToken() completed but was canceled"):(we("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new XI(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{Fe(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(ok)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Fe(d),c())}}}interrupt(e){we("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){we("Resuming connection for reason: "+e),delete this.interruptReasons_[e],io(this.interruptReasons_)&&(this.reconnectDelay_=gs,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Yl(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new W(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){we("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Zh&&(this.reconnectDelay_=Qh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){we("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Zh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Pg.replace(/\./g,"-")]=1,Gl()?e["framework.cordova"]=1:Cg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ao.getInstance().currentlyOnline();return io(this.interruptReasons_)&&e}}$t.nextPersistentConnectionId_=0;$t.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new x(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new x(ji,e),s=new x(ji,n);return this.compare(i,s)!==0}minPost(){return x.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nr;class im extends ea{static get __EMPTY_NODE(){return Nr}static set __EMPTY_NODE(e){Nr=e}compare(e,n){return fi(e.name,n.name)}isDefinedOn(e){throw es("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return x.MIN}maxPost(){return new x(Zn,Nr)}makePost(e,n){return m(typeof e=="string","KeyIndex indexValue must always be a string."),new x(e,Nr)}toString(){return".key"}}const Si=new im;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ye{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??ye.RED,this.left=s??He.EMPTY_NODE,this.right=r??He.EMPTY_NODE}copy(e,n,i,s,r){return new ye(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return He.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return He.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ye.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ye.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ye.RED=!0;ye.BLACK=!1;class ak{copy(e,n,i,s,r){return this}insert(e,n,i){return new ye(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class He{constructor(e,n=He.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new He(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ye.BLACK,null,null))}remove(e){return new He(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ye.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Pr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Pr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Pr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Pr(this.root_,null,this.comparator_,!0,e)}}He.EMPTY_NODE=new ak;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ck(t,e){return fi(t.name,e.name)}function nu(t,e){return fi(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gc;function lk(t){Gc=t}const sm=function(t){return typeof t=="number"?"number:"+xg(t):"string:"+t},rm=function(t){if(t.isLeafNode()){const e=t.val();m(typeof e=="string"||typeof e=="number"||typeof e=="object"&&kt(e,".sv"),"Priority must be a string or number.")}else m(t===Gc||t.isEmpty(),"priority of unexpected type.");m(t===Gc||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ef;class _e{static set __childrenNodeConstructor(e){ef=e}static get __childrenNodeConstructor(){return ef}constructor(e,n=_e.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,m(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),rm(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new _e(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:_e.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return M(e)?this:D(e)===".priority"?this.priorityNode_:_e.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:_e.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=D(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(m(i!==".priority"||bn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,_e.__childrenNodeConstructor.EMPTY_NODE.updateChild(K(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+sm(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=xg(this.value_):e+=this.value_,this.lazyHash_=Dg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===_e.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof _e.__childrenNodeConstructor?-1:(m(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=_e.VALUE_TYPE_ORDER.indexOf(n),r=_e.VALUE_TYPE_ORDER.indexOf(i);return m(s>=0,"Unknown leaf type: "+n),m(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}_e.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let om,am;function uk(t){om=t}function dk(t){am=t}class hk extends ea{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?fi(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return x.MIN}maxPost(){return new x(Zn,new _e("[PRIORITY-POST]",am))}makePost(e,n){const i=om(e);return new x(n,new _e("[PRIORITY-POST]",i))}toString(){return".priority"}}const ie=new hk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fk=Math.log(2);class pk{constructor(e){const n=r=>parseInt(Math.log(r)/fk,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const co=function(t,e,n,i){t.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ye(h,d.node,ye.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=s(c,f),g=s(f+1,l);return d=t[f],h=n?n(d):d,new ye(h,d.node,ye.BLACK,p,g)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,g){const _=d-p,T=d;d-=p;const N=s(_+1,T),$=t[_],y=n?n($):$;f(new ye(y,$.node,g,null,N))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const g=c.nextBitIsOne(),_=Math.pow(2,c.count-(p+1));g?h(_,ye.BLACK):(h(_,ye.BLACK),h(_,ye.RED))}return u},o=new pk(t.length),a=r(o);return new He(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qa;const yi={};class Pt{static get Default(){return m(yi&&ie,"ChildrenNode.ts has not been loaded"),Qa=Qa||new Pt({".priority":yi},{".priority":ie}),Qa}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Hi(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof He?n:null}hasIndex(e){return kt(this.indexSet_,e.toString())}addIndex(e,n){m(e!==Si,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(x.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=co(i,e.getCompare()):a=yi;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Pt(u,l)}addToIndexes(e,n){const i=so(this.indexes_,(s,r)=>{const o=Hi(this.indexSet_,r);if(m(o,"Missing index implementation for "+r),s===yi)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(x.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),co(a,o.getCompare())}else return yi;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new x(e.name,a))),c.insert(e,e.node)}});return new Pt(i,this.indexSet_)}removeFromIndexes(e,n){const i=so(this.indexes_,s=>{if(s===yi)return s;{const r=n.get(e.name);return r?s.remove(new x(e.name,r)):s}});return new Pt(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ms;class S{static get EMPTY_NODE(){return ms||(ms=new S(new He(nu),null,Pt.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&rm(this.priorityNode_),this.children_.isEmpty()&&m(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ms}updatePriority(e){return this.children_.isEmpty()?this:new S(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?ms:n}}getChild(e){const n=D(e);return n===null?this:this.getImmediateChild(n).getChild(K(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(m(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new x(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?ms:this.priorityNode_;return new S(s,o,r)}}updateChild(e,n){const i=D(e);if(i===null)return n;{m(D(e)!==".priority"||bn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(K(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(ie,(o,a)=>{n[o]=a.val(e),i++,r&&S.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+sm(this.getPriority().val())+":"),this.forEachChild(ie,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":Dg(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new x(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new x(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new x(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,x.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,x.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===pr?-1:0}withIndex(e){if(e===Si||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new S(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Si||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(ie),s=n.getIterator(ie);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Si?null:this.indexMap_.get(e.toString())}}S.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class gk extends S{constructor(){super(new He(nu),S.EMPTY_NODE,Pt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return S.EMPTY_NODE}isEmpty(){return!1}}const pr=new gk;Object.defineProperties(x,{MIN:{value:new x(ji,S.EMPTY_NODE)},MAX:{value:new x(Zn,pr)}});im.__EMPTY_NODE=S.EMPTY_NODE;_e.__childrenNodeConstructor=S;lk(pr);dk(pr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mk=!0;function re(t,e=null){if(t===null)return S.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),m(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new _e(n,re(e))}if(!(t instanceof Array)&&mk){const n=[];let i=!1;if(Ee(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=re(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new x(o,c)))}}),n.length===0)return S.EMPTY_NODE;const r=co(n,ck,o=>o.name,nu);if(i){const o=co(n,ie.getCompare());return new S(r,re(e),new Pt({".priority":o},{".priority":ie}))}else return new S(r,re(e),Pt.Default)}else{let n=S.EMPTY_NODE;return Ee(t,(i,s)=>{if(kt(t,i)&&i.substring(0,1)!=="."){const r=re(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(re(e))}}uk(re);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _k extends ea{constructor(e){super(),this.indexPath_=e,m(!M(e)&&D(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?fi(e.name,n.name):r}makePost(e,n){const i=re(e),s=S.EMPTY_NODE.updateChild(this.indexPath_,i);return new x(n,s)}maxPost(){const e=S.EMPTY_NODE.updateChild(this.indexPath_,pr);return new x(Zn,e)}toString(){return Ws(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yk extends ea{compare(e,n){const i=e.node.compareTo(n.node);return i===0?fi(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return x.MIN}maxPost(){return x.MAX}makePost(e,n){const i=re(e);return new x(n,i)}toString(){return".value"}}const wk=new yk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(t){return{type:"value",snapshotNode:t}}function Wi(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function qs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function zs(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function vk(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){m(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(qs(n,a)):m(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Wi(n,i)):o.trackChildChange(zs(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(ie,(s,r)=>{n.hasChild(s)||i.trackChildChange(qs(s,r))}),n.isLeafNode()||n.forEachChild(ie,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(zs(s,r,o))}else i.trackChildChange(Wi(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?S.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{constructor(e){this.indexedFilter_=new iu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Gs.getStartPost_(e),this.endPost_=Gs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new x(n,i))||(i=S.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=S.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(S.EMPTY_NODE);const r=this;return n.forEachChild(ie,(o,a)=>{r.matches(new x(o,a))||(s=s.updateImmediateChild(o,S.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Gs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new x(n,i))||(i=S.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=S.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=S.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(S.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,S.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;m(a.numChildren()===this.limit_,"");const c=new x(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(zs(n,i,d)),a.updateImmediateChild(n,i);{r?.trackChildChange(qs(n,d));const g=a.updateImmediateChild(n,S.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Wi(h.name,h.node)),g.updateImmediateChild(h.name,h.node)):g}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(qs(l.name,l.node)),r.trackChildChange(Wi(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,S.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ie}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return m(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return m(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ji}hasEnd(){return this.endSet_}getIndexEndValue(){return m(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return m(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Zn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return m(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ie}copy(){const e=new ta;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ek(t){return t.loadsAllData()?new iu(t.getIndex()):t.hasLimit()?new bk(t):new Gs(t)}function tf(t){const e={};if(t.isDefault())return e;let n;if(t.index_===ie?n="$priority":t.index_===wk?n="$value":t.index_===Si?n="$key":(m(t.index_ instanceof _k,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=fe(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=fe(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+fe(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=fe(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+fe(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function nf(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==ie&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo extends Zg{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(m(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=fr("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=lo.getListenId_(e,i),a={};this.listens_[o]=a;const c=tf(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Hi(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,n){const i=lo.getListenId_(e,n);delete this.listens_[i]}get(e){const n=tf(e._queryParams),i=e._path.toString(),s=new Be;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ns(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Hs(a.responseText)}catch{Fe("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&Fe("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ck{constructor(){this.rootNode_=S.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uo(){return{value:null,children:new Map}}function rs(t,e,n){if(M(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=D(e);t.children.has(i)||t.children.set(i,uo());const s=t.children.get(i);e=K(e),rs(s,e,n)}}function Kc(t,e){if(M(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(ie,(i,s)=>{rs(t,new W(i),s)}),Kc(t,e)}}else if(t.children.size>0){const n=D(e);return e=K(e),t.children.has(n)&&Kc(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Yc(t,e,n){t.value!==null?n(e,t.value):Tk(t,(i,s)=>{const r=new W(e.toString()+"/"+i);Yc(s,r,n)})}function Tk(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sk{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Ee(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sf=10*1e3,Ik=30*1e3,kk=300*1e3;class Ak{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new Sk(e);const i=sf+(Ik-sf)*Math.random();ks(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;Ee(e,(s,r)=>{r>0&&kt(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),ks(this.reportStats_.bind(this),Math.floor(Math.random()*2*kk))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var rt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(rt||(rt={}));function su(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ru(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ou(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=rt.ACK_USER_WRITE,this.source=su()}operationForChild(e){if(M(this.path)){if(this.affectedTree.value!=null)return m(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new W(e));return new ho(H(),n,this.revert)}}else return m(D(this.path)===e,"operationForChild called for unrelated child."),new ho(K(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,n){this.source=e,this.path=n,this.type=rt.LISTEN_COMPLETE}operationForChild(e){return M(this.path)?new Ks(this.source,H()):new Ks(this.source,K(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=rt.OVERWRITE}operationForChild(e){return M(this.path)?new ei(this.source,H(),this.snap.getImmediateChild(e)):new ei(this.source,K(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=rt.MERGE}operationForChild(e){if(M(this.path)){const n=this.children.subtree(new W(e));return n.isEmpty()?null:n.value?new ei(this.source,H(),n.value):new qi(this.source,H(),n)}else return m(D(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new qi(this.source,K(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(M(e))return this.isFullyInitialized()&&!this.filtered_;const n=D(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rk{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Nk(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(vk(o.childName,o.snapshotNode))}),_s(t,s,"child_removed",e,i,n),_s(t,s,"child_added",e,i,n),_s(t,s,"child_moved",r,i,n),_s(t,s,"child_changed",e,i,n),_s(t,s,"value",e,i,n),s}function _s(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>Ok(t,a,c)),o.forEach(a=>{const c=Pk(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function Pk(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Ok(t,e,n){if(e.childName==null||n.childName==null)throw es("Should only compare child_ events.");const i=new x(e.childName,e.snapshotNode),s=new x(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function na(t,e){return{eventCache:t,serverCache:e}}function As(t,e,n,i){return na(new En(e,n,i),t.serverCache)}function lm(t,e,n,i){return na(t.eventCache,new En(e,n,i))}function fo(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ti(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Za;const Lk=()=>(Za||(Za=new He(_I)),Za);class Y{static fromObject(e){let n=new Y(null);return Ee(e,(i,s)=>{n=n.set(new W(i),s)}),n}constructor(e,n=Lk()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:H(),value:this.value};if(M(e))return null;{const i=D(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(K(e),n);return r!=null?{path:ne(new W(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(M(e))return this;{const n=D(e),i=this.children.get(n);return i!==null?i.subtree(K(e)):new Y(null)}}set(e,n){if(M(e))return new Y(n,this.children);{const i=D(e),r=(this.children.get(i)||new Y(null)).set(K(e),n),o=this.children.insert(i,r);return new Y(this.value,o)}}remove(e){if(M(e))return this.children.isEmpty()?new Y(null):new Y(null,this.children);{const n=D(e),i=this.children.get(n);if(i){const s=i.remove(K(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new Y(null):new Y(this.value,r)}else return this}}get(e){if(M(e))return this.value;{const n=D(e),i=this.children.get(n);return i?i.get(K(e)):null}}setTree(e,n){if(M(e))return n;{const i=D(e),r=(this.children.get(i)||new Y(null)).setTree(K(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new Y(this.value,o)}}fold(e){return this.fold_(H(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ne(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,H(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(M(e))return null;{const r=D(e),o=this.children.get(r);return o?o.findOnPath_(K(e),ne(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,H(),n)}foreachOnPath_(e,n,i){if(M(e))return this;{this.value&&i(n,this.value);const s=D(e),r=this.children.get(s);return r?r.foreachOnPath_(K(e),ne(n,s),i):new Y(null)}}foreach(e){this.foreach_(H(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(ne(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.writeTree_=e}static empty(){return new lt(new Y(null))}}function Rs(t,e,n){if(M(e))return new lt(new Y(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=De(s,e);return r=r.updateChild(o,n),new lt(t.writeTree_.set(s,r))}else{const s=new Y(n),r=t.writeTree_.setTree(e,s);return new lt(r)}}}function Jc(t,e,n){let i=t;return Ee(n,(s,r)=>{i=Rs(i,ne(e,s),r)}),i}function rf(t,e){if(M(e))return lt.empty();{const n=t.writeTree_.setTree(e,new Y(null));return new lt(n)}}function Xc(t,e){return pi(t,e)!=null}function pi(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(De(n.path,e)):null}function of(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(ie,(i,s)=>{e.push(new x(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new x(i,s.value))}),e}function pn(t,e){if(M(e))return t;{const n=pi(t,e);return n!=null?new lt(new Y(n)):new lt(t.writeTree_.subtree(e))}}function Qc(t){return t.writeTree_.isEmpty()}function zi(t,e){return um(H(),t.writeTree_,e)}function um(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(m(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=um(ne(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(ne(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ia(t,e){return pm(e,t)}function Dk(t,e,n,i,s){m(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=Rs(t.visibleWrites,e,n)),t.lastWriteId=i}function Mk(t,e,n,i){m(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=Jc(t.visibleWrites,e,n),t.lastWriteId=i}function xk(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Fk(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);m(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&Uk(a,i.path)?s=!1:Je(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return $k(t),!0;if(i.snap)t.visibleWrites=rf(t.visibleWrites,i.path);else{const a=i.children;Ee(a,c=>{t.visibleWrites=rf(t.visibleWrites,ne(i.path,c))})}return!0}else return!1}function Uk(t,e){if(t.snap)return Je(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Je(ne(t.path,n),e))return!0;return!1}function $k(t){t.visibleWrites=dm(t.allWrites,Bk,H()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function Bk(t){return t.visible}function dm(t,e,n){let i=lt.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)Je(n,o)?(a=De(n,o),i=Rs(i,a,r.snap)):Je(o,n)&&(a=De(o,n),i=Rs(i,H(),r.snap.getChild(a)));else if(r.children){if(Je(n,o))a=De(n,o),i=Jc(i,a,r.children);else if(Je(o,n))if(a=De(o,n),M(a))i=Jc(i,H(),r.children);else{const c=Hi(r.children,D(a));if(c){const l=c.getChild(K(a));i=Rs(i,H(),l)}}}else throw es("WriteRecord should have .snap or .children")}}return i}function hm(t,e,n,i,s){if(!i&&!s){const r=pi(t.visibleWrites,e);if(r!=null)return r;{const o=pn(t.visibleWrites,e);if(Qc(o))return n;if(n==null&&!Xc(o,H()))return null;{const a=n||S.EMPTY_NODE;return zi(o,a)}}}else{const r=pn(t.visibleWrites,e);if(!s&&Qc(r))return n;if(!s&&n==null&&!Xc(r,H()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(Je(l.path,e)||Je(e,l.path))},a=dm(t.allWrites,o,e),c=n||S.EMPTY_NODE;return zi(a,c)}}}function Hk(t,e,n){let i=S.EMPTY_NODE;const s=pi(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(ie,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=pn(t.visibleWrites,e);return n.forEachChild(ie,(o,a)=>{const c=zi(pn(r,new W(o)),a);i=i.updateImmediateChild(o,c)}),of(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=pn(t.visibleWrites,e);return of(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Vk(t,e,n,i,s){m(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ne(e,n);if(Xc(t.visibleWrites,r))return null;{const o=pn(t.visibleWrites,r);return Qc(o)?s.getChild(n):zi(o,s.getChild(n))}}function jk(t,e,n,i){const s=ne(e,n),r=pi(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=pn(t.visibleWrites,s);return zi(o,i.getNode().getImmediateChild(n))}else return null}function Wk(t,e){return pi(t.visibleWrites,e)}function qk(t,e,n,i,s,r,o){let a;const c=pn(t.visibleWrites,e),l=pi(c,H());if(l!=null)a=l;else if(n!=null)a=zi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function zk(){return{visibleWrites:lt.empty(),allWrites:[],lastWriteId:-1}}function po(t,e,n,i){return hm(t.writeTree,t.treePath,e,n,i)}function au(t,e){return Hk(t.writeTree,t.treePath,e)}function af(t,e,n,i){return Vk(t.writeTree,t.treePath,e,n,i)}function go(t,e){return Wk(t.writeTree,ne(t.treePath,e))}function Gk(t,e,n,i,s,r){return qk(t.writeTree,t.treePath,e,n,i,s,r)}function cu(t,e,n){return jk(t.writeTree,t.treePath,e,n)}function fm(t,e){return pm(ne(t.treePath,e),t.writeTree)}function pm(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kk{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;m(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),m(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,zs(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,qs(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Wi(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,zs(i,e.snapshotNode,s.oldSnap));else throw es("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yk{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const gm=new Yk;class lu{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new En(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return cu(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ti(this.viewCache_),r=Gk(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jk(t){return{filter:t}}function Xk(t,e){m(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),m(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Qk(t,e,n,i,s){const r=new Kk;let o,a;if(n.type===rt.OVERWRITE){const l=n;l.source.fromUser?o=Zc(t,e,l.path,l.snap,i,s,r):(m(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!M(l.path),o=mo(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===rt.MERGE){const l=n;l.source.fromUser?o=eA(t,e,l.path,l.children,i,s,r):(m(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=el(t,e,l.path,l.children,i,s,a,r))}else if(n.type===rt.ACK_USER_WRITE){const l=n;l.revert?o=iA(t,e,l.path,i,s,r):o=tA(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===rt.LISTEN_COMPLETE)o=nA(t,e,n.path,i,r);else throw es("Unknown operation type: "+n.type);const c=r.getChanges();return Zk(e,o,c),{viewCache:o,changes:c}}function Zk(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=fo(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(cm(fo(e)))}}function mm(t,e,n,i,s,r){const o=e.eventCache;if(go(i,n)!=null)return e;{let a,c;if(M(n))if(m(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=ti(e),u=l instanceof S?l:S.EMPTY_NODE,d=au(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=po(i,ti(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=D(n);if(l===".priority"){m(bn(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=af(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=K(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=af(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=cu(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return As(e,a,o.isFullyInitialized()||M(n),t.filter.filtersNodes())}}function mo(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(M(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=D(n);if(!c.isCompleteForPath(n)&&bn(n)>1)return e;const p=K(n),_=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),_):l=u.updateChild(c.getNode(),f,_,p,gm,null)}const d=lm(e,l,c.isFullyInitialized()||M(n),u.filtersNodes()),h=new lu(s,d,r);return mm(t,d,n,s,h,a)}function Zc(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const u=new lu(s,e,r);if(M(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=As(e,l,!0,t.filter.filtersNodes());else{const d=D(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=As(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=K(n),f=a.getNode().getImmediateChild(d);let p;if(M(h))p=i;else{const g=u.getCompleteChild(d);g!=null?Zl(h)===".priority"&&g.getChild(tm(h)).isEmpty()?p=g:p=g.updateChild(h,i):p=S.EMPTY_NODE}if(f.equals(p))c=e;else{const g=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=As(e,g,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function cf(t,e){return t.eventCache.isCompleteForChild(e)}function eA(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=ne(n,c);cf(e,D(u))&&(a=Zc(t,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=ne(n,c);cf(e,D(u))||(a=Zc(t,a,u,l,s,r,o))}),a}function lf(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function el(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;M(n)?l=i:l=new Y(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=lf(t,f,h);c=mo(t,c,new W(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),g=lf(t,p,h);c=mo(t,c,new W(d),g,s,r,o,a)}}),c}function tA(t,e,n,i,s,r,o){if(go(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(M(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return mo(t,e,n,c.getNode().getChild(n),s,r,a,o);if(M(n)){let l=new Y(null);return c.getNode().forEachChild(Si,(u,d)=>{l=l.set(new W(u),d)}),el(t,e,n,l,s,r,a,o)}else return e}else{let l=new Y(null);return i.foreach((u,d)=>{const h=ne(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),el(t,e,n,l,s,r,a,o)}}function nA(t,e,n,i,s){const r=e.serverCache,o=lm(e,r.getNode(),r.isFullyInitialized()||M(n),r.isFiltered());return mm(t,o,n,i,gm,s)}function iA(t,e,n,i,s,r){let o;if(go(i,n)!=null)return e;{const a=new lu(i,e,s),c=e.eventCache.getNode();let l;if(M(n)||D(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=po(i,ti(e));else{const d=e.serverCache.getNode();m(d instanceof S,"serverChildren would be complete if leaf node"),u=au(i,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=D(n);let d=cu(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,K(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,S.EMPTY_NODE,K(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=po(i,ti(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||go(i,H())!=null,As(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sA{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new iu(i.getIndex()),r=Ek(i);this.processor_=Jk(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(S.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(S.EMPTY_NODE,a.getNode(),null),u=new En(c,o.isFullyInitialized(),s.filtersNodes()),d=new En(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=na(d,u),this.eventGenerator_=new Rk(this.query_)}get query(){return this.query_}}function rA(t){return t.viewCache_.serverCache.getNode()}function oA(t){return fo(t.viewCache_)}function aA(t,e){const n=ti(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!M(e)&&!n.getImmediateChild(D(e)).isEmpty())?n.getChild(e):null}function uf(t){return t.eventRegistrations_.length===0}function cA(t,e){t.eventRegistrations_.push(e)}function df(t,e,n){const i=[];if(n){m(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function hf(t,e,n,i){e.type===rt.MERGE&&e.source.queryId!==null&&(m(ti(t.viewCache_),"We should always have a full cache before handling merges"),m(fo(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Qk(t.processor_,s,e,n,i);return Xk(t.processor_,r.viewCache),m(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,_m(t,r.changes,r.viewCache.eventCache.getNode(),null)}function lA(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(ie,(r,o)=>{i.push(Wi(r,o))}),n.isFullyInitialized()&&i.push(cm(n.getNode())),_m(t,i,n.getNode(),e)}function _m(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return Nk(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _o;class ym{constructor(){this.views=new Map}}function uA(t){m(!_o,"__referenceConstructor has already been defined"),_o=t}function dA(){return m(_o,"Reference.ts has not been loaded"),_o}function hA(t){return t.views.size===0}function uu(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return m(r!=null,"SyncTree gave us an op for an invalid query."),hf(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(hf(o,e,n,i));return r}}function wm(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=po(n,s?i:null),c=!1;a?c=!0:i instanceof S?(a=au(n,i),c=!1):(a=S.EMPTY_NODE,c=!1);const l=na(new En(a,c,!1),new En(i,s,!1));return new sA(e,l)}return o}function fA(t,e,n,i,s,r){const o=wm(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),cA(o,n),lA(o,n)}function pA(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=Cn(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(df(l,n,i)),uf(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(df(c,n,i)),uf(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Cn(t)&&r.push(new(dA())(e._repo,e._path)),{removed:r,events:o}}function vm(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function gn(t,e){let n=null;for(const i of t.views.values())n=n||aA(i,e);return n}function bm(t,e){if(e._queryParams.loadsAllData())return sa(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Em(t,e){return bm(t,e)!=null}function Cn(t){return sa(t)!=null}function sa(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yo;function gA(t){m(!yo,"__referenceConstructor has already been defined"),yo=t}function mA(){return m(yo,"Reference.ts has not been loaded"),yo}let _A=1;class ff{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Y(null),this.pendingWriteTree_=zk(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Cm(t,e,n,i,s){return Dk(t.pendingWriteTree_,e,n,i,s),s?os(t,new ei(su(),e,n)):[]}function yA(t,e,n,i){Mk(t.pendingWriteTree_,e,n,i);const s=Y.fromObject(n);return os(t,new qi(su(),e,s))}function cn(t,e,n=!1){const i=xk(t.pendingWriteTree_,e);if(Fk(t.pendingWriteTree_,e)){let r=new Y(null);return i.snap!=null?r=r.set(H(),!0):Ee(i.children,o=>{r=r.set(new W(o),!0)}),os(t,new ho(i.path,r,n))}else return[]}function gr(t,e,n){return os(t,new ei(ru(),e,n))}function wA(t,e,n){const i=Y.fromObject(n);return os(t,new qi(ru(),e,i))}function vA(t,e){return os(t,new Ks(ru(),e))}function bA(t,e,n){const i=hu(t,n);if(i){const s=fu(i),r=s.path,o=s.queryId,a=De(r,e),c=new Ks(ou(o),a);return pu(t,r,c)}else return[]}function wo(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Em(o,e))){const c=pA(o,e,n,i);hA(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>Cn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=TA(h);for(let p=0;p<f.length;++p){const g=f[p],_=g.query,T=km(t,g);t.listenProvider_.startListening(Ns(_),Ys(t,_),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(Ns(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(ra(h));t.listenProvider_.stopListening(Ns(h),f)}))}SA(t,l)}return a}function Tm(t,e,n,i){const s=hu(t,i);if(s!=null){const r=fu(s),o=r.path,a=r.queryId,c=De(o,e),l=new ei(ou(a),c,n);return pu(t,o,l)}else return[]}function EA(t,e,n,i){const s=hu(t,i);if(s){const r=fu(s),o=r.path,a=r.queryId,c=De(o,e),l=Y.fromObject(n),u=new qi(ou(a),c,l);return pu(t,o,u)}else return[]}function tl(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=De(h,s);r=r||gn(f,p),o=o||Cn(f)});let a=t.syncPointTree_.get(s);a?(o=o||Cn(a),r=r||gn(a,H())):(a=new ym,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=S.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const g=gn(p,H());g&&(r=r.updateImmediateChild(f,g))}));const l=Em(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=ra(e);m(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=IA();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=ia(t.pendingWriteTree_,s);let d=fA(a,e,n,u,r,c);if(!l&&!o&&!i){const h=bm(a,e);d=d.concat(kA(t,e,h))}return d}function du(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=De(o,e),l=gn(a,c);if(l)return l});return hm(s,e,r,n,!0)}function CA(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=De(l,n);i=i||gn(u,d)});let s=t.syncPointTree_.get(n);s?i=i||gn(s,H()):(s=new ym,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new En(i,!0,!1):null,a=ia(t.pendingWriteTree_,e._path),c=wm(s,e,a,r?o.getNode():S.EMPTY_NODE,r);return oA(c)}function os(t,e){return Sm(e,t.syncPointTree_,null,ia(t.pendingWriteTree_,H()))}function Sm(t,e,n,i){if(M(t.path))return Im(t,e,n,i);{const s=e.get(H());n==null&&s!=null&&(n=gn(s,H()));let r=[];const o=D(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=fm(i,o);r=r.concat(Sm(a,c,l,u))}return s&&(r=r.concat(uu(s,t,i,n))),r}}function Im(t,e,n,i){const s=e.get(H());n==null&&s!=null&&(n=gn(s,H()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=fm(i,o),u=t.operationForChild(o);u&&(r=r.concat(Im(u,a,c,l)))}),s&&(r=r.concat(uu(s,t,i,n))),r}function km(t,e){const n=e.query,i=Ys(t,n);return{hashFn:()=>(rA(e)||S.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?bA(t,n._path,i):vA(t,n._path);{const r=vI(s,n);return wo(t,n,null,r)}}}}function Ys(t,e){const n=ra(e);return t.queryToTagMap.get(n)}function ra(t){return t._path.toString()+"$"+t._queryIdentifier}function hu(t,e){return t.tagToQueryMap.get(e)}function fu(t){const e=t.indexOf("$");return m(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new W(t.substr(0,e))}}function pu(t,e,n){const i=t.syncPointTree_.get(e);m(i,"Missing sync point for query tag that we're tracking");const s=ia(t.pendingWriteTree_,e);return uu(i,n,s,null)}function TA(t){return t.fold((e,n,i)=>{if(n&&Cn(n))return[sa(n)];{let s=[];return n&&(s=vm(n)),Ee(i,(r,o)=>{s=s.concat(o)}),s}})}function Ns(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(mA())(t._repo,t._path):t}function SA(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=ra(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function IA(){return _A++}function kA(t,e,n){const i=e._path,s=Ys(t,e),r=km(t,n),o=t.listenProvider_.startListening(Ns(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)m(!Cn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!M(l)&&u&&Cn(u))return[sa(u).query];{let h=[];return u&&(h=h.concat(vm(u).map(f=>f.query))),Ee(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Ns(u),Ys(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new gu(n)}node(){return this.node_}}class mu{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ne(this.path_,e);return new mu(this.syncTree_,n)}node(){return du(this.syncTree_,this.path_)}}const AA=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},pf=function(t,e,n){if(!t||typeof t!="object")return t;if(m(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return RA(t[".sv"],e,n);if(typeof t[".sv"]=="object")return NA(t[".sv"],e);m(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},RA=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:m(!1,"Unexpected server value: "+t)}},NA=function(t,e,n){t.hasOwnProperty("increment")||m(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&m(!1,"Unexpected increment value: "+i);const s=e.node();if(m(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Am=function(t,e,n,i){return _u(e,new mu(n,t),i)},Rm=function(t,e,n){return _u(t,new gu(e),n)};function _u(t,e,n){const i=t.getPriority().val(),s=pf(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=pf(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new _e(a,re(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new _e(s))),o.forEachChild(ie,(a,c)=>{const l=_u(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function wu(t,e){let n=e instanceof W?e:new W(e),i=t,s=D(n);for(;s!==null;){const r=Hi(i.node.children,s)||{children:{},childCount:0};i=new yu(s,i,r),n=K(n),s=D(n)}return i}function as(t){return t.node.value}function Nm(t,e){t.node.value=e,nl(t)}function Pm(t){return t.node.childCount>0}function PA(t){return as(t)===void 0&&!Pm(t)}function oa(t,e){Ee(t.node.children,(n,i)=>{e(new yu(n,t,i))})}function Om(t,e,n,i){n&&e(t),oa(t,s=>{Om(s,e,!0)})}function OA(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function mr(t){return new W(t.parent===null?t.name:mr(t.parent)+"/"+t.name)}function nl(t){t.parent!==null&&LA(t.parent,t.name,t)}function LA(t,e,n){const i=PA(n),s=kt(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,nl(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,nl(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DA=/[\[\].#$\/\u0000-\u001F\u007F]/,MA=/[\[\].#$\u0000-\u001F\u007F]/,ec=10*1024*1024,vu=function(t){return typeof t=="string"&&t.length!==0&&!DA.test(t)},Lm=function(t){return typeof t=="string"&&t.length!==0&&!MA.test(t)},xA=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Lm(t)},Dm=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Zo(t)||t&&typeof t=="object"&&kt(t,".sv")},vo=function(t,e,n,i){i&&e===void 0||aa(Vi(t,"value"),e,n)},aa=function(t,e,n){const i=n instanceof W?new ek(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Fn(i));if(typeof e=="function")throw new Error(t+"contains a function "+Fn(i)+" with contents = "+e.toString());if(Zo(e))throw new Error(t+"contains "+e.toString()+" "+Fn(i));if(typeof e=="string"&&e.length>ec/3&&Yo(e)>ec)throw new Error(t+"contains a string greater than "+ec+" utf8 bytes "+Fn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(Ee(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!vu(o)))throw new Error(t+" contains an invalid key ("+o+") "+Fn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);tk(i,o),aa(t,a,i),nk(i)}),s&&r)throw new Error(t+' contains ".value" child '+Fn(i)+" in addition to actual children.")}},FA=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Ws(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!vu(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(ZI);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&Je(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},Mm=function(t,e,n,i){const s=Vi(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];Ee(e,(o,a)=>{const c=new W(o);if(aa(s,a,ne(n,c)),Zl(c)===".priority"&&!Dm(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),FA(s,r)},UA=function(t,e,n){if(Zo(e))throw new Error(Vi(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Dm(e))throw new Error(Vi(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},bu=function(t,e,n,i){if(!Lm(n))throw new Error(Vi(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},$A=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),bu(t,e,n)},ln=function(t,e){if(D(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},BA=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!vu(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!xA(n))throw new Error(Vi(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ca(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!eu(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function xm(t,e,n){ca(t,n),Fm(t,i=>eu(i,e))}function tt(t,e,n){ca(t,n),Fm(t,i=>Je(i,e)||Je(e,i))}function Fm(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(VA(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function VA(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();Is&&we("event: "+n.toString()),ss(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA="repo_interrupt",WA=25;class qA{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new HA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=uo(),this.transactionQueueTree_=new yu,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function zA(t,e,n){if(t.stats_=Xl(t.repoInfo_),t.forceRestClient_||TI())t.server_=new lo(t.repoInfo_,(i,s,r,o)=>{gf(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>mf(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{fe(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new $t(t.repoInfo_,e,(i,s,r,o)=>{gf(t,i,s,r,o)},i=>{mf(t,i)},i=>{GA(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=RI(t.repoInfo_,()=>new Ak(t.stats_,t.server_)),t.infoData_=new Ck,t.infoSyncTree_=new ff({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=gr(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Eu(t,"connected",!1),t.serverSyncTree_=new ff({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);tt(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function Um(t){const n=t.infoData_.getNode(new W(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function la(t){return AA({timestamp:Um(t)})}function gf(t,e,n,i,s){t.dataUpdateCount++;const r=new W(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=so(n,l=>re(l));o=EA(t.serverSyncTree_,r,c,s)}else{const c=re(n);o=Tm(t.serverSyncTree_,r,c,s)}else if(i){const c=so(n,l=>re(l));o=wA(t.serverSyncTree_,r,c)}else{const c=re(n);o=gr(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Gi(t,r)),tt(t.eventQueue_,a,o)}function mf(t,e){Eu(t,"connected",e),e===!1&&XA(t)}function GA(t,e){Ee(e,(n,i)=>{Eu(t,n,i)})}function Eu(t,e,n){const i=new W("/.info/"+e),s=re(n);t.infoData_.updateSnapshot(i,s);const r=gr(t.infoSyncTree_,i,s);tt(t.eventQueue_,i,r)}function Cu(t){return t.nextWriteId_++}function KA(t,e,n){const i=CA(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=re(s).withIndex(e._queryParams.getIndex());tl(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=gr(t.serverSyncTree_,e._path,r);else{const a=Ys(t.serverSyncTree_,e);o=Tm(t.serverSyncTree_,e._path,r,a)}return tt(t.eventQueue_,e._path,o),wo(t.serverSyncTree_,e,n,null,!0),r},s=>(_r(t,"get for query "+fe(e)+" failed: "+s),Promise.reject(new Error(s))))}function YA(t,e,n,i,s){_r(t,"set",{path:e.toString(),value:n,priority:i});const r=la(t),o=re(n,i),a=du(t.serverSyncTree_,e),c=Rm(o,a,r),l=Cu(t),u=Cm(t.serverSyncTree_,e,c,l,!0);ca(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||Fe("set at "+e+" failed: "+h);const g=cn(t.serverSyncTree_,l,!p);tt(t.eventQueue_,e,g),Tn(t,s,h,f)});const d=Su(t,e);Gi(t,d),tt(t.eventQueue_,d,[])}function JA(t,e,n,i){_r(t,"update",{path:e.toString(),value:n});let s=!0;const r=la(t),o={};if(Ee(n,(a,c)=>{s=!1,o[a]=Am(ne(e,a),re(c),t.serverSyncTree_,r)}),s)we("update() called with empty data.  Don't do anything."),Tn(t,i,"ok",void 0);else{const a=Cu(t),c=yA(t.serverSyncTree_,e,o,a);ca(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||Fe("update at "+e+" failed: "+l);const h=cn(t.serverSyncTree_,a,!d),f=h.length>0?Gi(t,e):e;tt(t.eventQueue_,f,h),Tn(t,i,l,u)}),Ee(n,l=>{const u=Su(t,ne(e,l));Gi(t,u)}),tt(t.eventQueue_,e,[])}}function XA(t){_r(t,"onDisconnectEvents");const e=la(t),n=uo();Yc(t.onDisconnect_,H(),(s,r)=>{const o=Am(s,r,t.serverSyncTree_,e);rs(n,s,o)});let i=[];Yc(n,H(),(s,r)=>{i=i.concat(gr(t.serverSyncTree_,s,r));const o=Su(t,s);Gi(t,o)}),t.onDisconnect_=uo(),tt(t.eventQueue_,H(),i)}function QA(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Kc(t.onDisconnect_,e),Tn(t,n,i,s)})}function _f(t,e,n,i){const s=re(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&rs(t.onDisconnect_,e,s),Tn(t,i,r,o)})}function ZA(t,e,n,i,s){const r=re(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&rs(t.onDisconnect_,e,r),Tn(t,s,o,a)})}function eR(t,e,n,i){if(io(n)){we("onDisconnect().update() called with empty data.  Don't do anything."),Tn(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&Ee(n,(o,a)=>{const c=re(a);rs(t.onDisconnect_,ne(e,o),c)}),Tn(t,i,s,r)})}function tR(t,e,n){let i;D(e._path)===".info"?i=tl(t.infoSyncTree_,e,n):i=tl(t.serverSyncTree_,e,n),xm(t.eventQueue_,e._path,i)}function $m(t,e,n){let i;D(e._path)===".info"?i=wo(t.infoSyncTree_,e,n):i=wo(t.serverSyncTree_,e,n),xm(t.eventQueue_,e._path,i)}function nR(t){t.persistentConnection_&&t.persistentConnection_.interrupt(jA)}function _r(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),we(n,...e)}function Tn(t,e,n,i){e&&ss(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Bm(t,e,n){return du(t.serverSyncTree_,e,n)||S.EMPTY_NODE}function Tu(t,e=t.transactionQueueTree_){if(e||ua(t,e),as(e)){const n=Vm(t,e);m(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&iR(t,mr(e),n)}else Pm(e)&&oa(e,n=>{Tu(t,n)})}function iR(t,e,n){const i=n.map(l=>l.currentWriteId),s=Bm(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const u=n[l];m(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=De(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{_r(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(cn(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();ua(t,wu(t.transactionQueueTree_,e)),Tu(t,t.transactionQueueTree_),tt(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)ss(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Fe("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Gi(t,e)}},o)}function Gi(t,e){const n=Hm(t,e),i=mr(n),s=Vm(t,n);return sR(t,s,i),i}function sR(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=De(n,c.path);let u=!1,d;if(m(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(cn(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=WA)u=!0,d="maxretry",s=s.concat(cn(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Bm(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){aa("transaction failed: Data returned ",f,c.path);let p=re(f);typeof f=="object"&&f!=null&&kt(f,".priority")||(p=p.updatePriority(h.getPriority()));const _=c.currentWriteId,T=la(t),N=Rm(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=N,c.currentWriteId=Cu(t),o.splice(o.indexOf(_),1),s=s.concat(Cm(t.serverSyncTree_,c.path,N,c.currentWriteId,c.applyLocally)),s=s.concat(cn(t.serverSyncTree_,_,!0))}else u=!0,d="nodata",s=s.concat(cn(t.serverSyncTree_,c.currentWriteId,!0))}tt(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ua(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)ss(i[a]);Tu(t,t.transactionQueueTree_)}function Hm(t,e){let n,i=t.transactionQueueTree_;for(n=D(e);n!==null&&as(i)===void 0;)i=wu(i,n),e=K(e),n=D(e);return i}function Vm(t,e){const n=[];return jm(t,e,n),n.sort((i,s)=>i.order-s.order),n}function jm(t,e,n){const i=as(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);oa(e,s=>{jm(t,s,n)})}function ua(t,e){const n=as(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Nm(e,n.length>0?n:void 0)}oa(e,i=>{ua(t,i)})}function Su(t,e){const n=mr(Hm(t,e)),i=wu(t.transactionQueueTree_,e);return OA(i,s=>{tc(t,s)}),tc(t,i),Om(i,s=>{tc(t,s)}),n}function tc(t,e){const n=as(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(m(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(m(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(cn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Nm(e,void 0):n.length=r+1,tt(t.eventQueue_,mr(e),s);for(let o=0;o<i.length;o++)ss(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rR(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function oR(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Fe(`Invalid query segment '${n}' in query '${t}'`)}return e}const yf=function(t,e){const n=aR(t),i=n.namespace;n.domain==="firebase.com"&&Vt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Vt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||gI();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new zg(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new W(n.pathString)}},aR=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=rR(t.substring(u,d)));const h=oR(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",cR=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=wf.charAt(n%64),n=Math.floor(n/64);m(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=wf.charAt(e[s]);return m(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+fe(this.snapshot.exportVal())}}class qm{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return m(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class zm{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Be;return QA(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){ln("OnDisconnect.remove",this._path);const e=new Be;return _f(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){ln("OnDisconnect.set",this._path),vo("OnDisconnect.set",e,this._path,!1);const n=new Be;return _f(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){ln("OnDisconnect.setWithPriority",this._path),vo("OnDisconnect.setWithPriority",e,this._path,!1),UA("OnDisconnect.setWithPriority",n);const i=new Be;return ZA(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){ln("OnDisconnect.update",this._path),Mm("OnDisconnect.update",e,this._path);const n=new Be;return eR(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
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
 */class da{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return M(this._path)?null:Zl(this._path)}get ref(){return new pt(this._repo,this._path)}get _queryIdentifier(){const e=nf(this._queryParams),n=Yl(e);return n==="{}"?"default":n}get _queryObject(){return nf(this._queryParams)}isEqual(e){if(e=se(e),!(e instanceof da))return!1;const n=this._repo===e._repo,i=eu(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+QI(this._path)}}class pt extends da{constructor(e,n){super(e,n,new ta,!1)}get parent(){const e=tm(this._path);return e===null?null:new pt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ni{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new W(e),i=ii(this.ref,e);return new ni(this._node.getChild(n),i,ie)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new ni(s,ii(this.ref,i),ie)))}hasChild(e){const n=new W(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function E(t,e){return t=se(t),t._checkNotDeleted("ref"),e!==void 0?ii(t._root,e):t._root}function ii(t,e){return t=se(t),D(t._path)===null?$A("child","path",e):bu("child","path",e),new pt(t._repo,ne(t._path,e))}function Gm(t){return t=se(t),new zm(t._repo,t._path)}function Js(t,e){t=se(t),ln("push",t._path),vo("push",e,t._path,!0);const n=Um(t._repo),i=cR(n),s=ii(t,i),r=ii(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Ke(t){return ln("remove",t._path),Z(t,null)}function Z(t,e){t=se(t),ln("set",t._path),vo("set",e,t._path,!1);const n=new Be;return YA(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Wn(t,e){Mm("update",e,t._path);const n=new Be;return JA(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Pe(t){t=se(t);const e=new Iu(()=>{}),n=new yr(e);return KA(t._repo,t,n).then(i=>new ni(i,new pt(t._repo,t._path),t._queryParams.getIndex()))}class yr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new Wm("value",this,new ni(e.snapshotNode,new pt(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new qm(this,e,n):null}matches(e){return e instanceof yr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ha{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new qm(this,e,n):null}createEvent(e,n){m(e.childName!=null,"Child events should have a childName.");const i=ii(new pt(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new Wm(e.type,this,new ni(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ha?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function fa(t,e,n,i,s){const r=new Iu(n,void 0),o=e==="value"?new yr(r):new ha(e,r);return tR(t._repo,t,o),()=>$m(t._repo,t,o)}function ku(t,e,n,i){return fa(t,"value",e)}function Ki(t,e,n,i){return fa(t,"child_added",e)}function il(t,e,n,i){return fa(t,"child_changed",e)}function Km(t,e,n,i){return fa(t,"child_removed",e)}function Ct(t,e,n){let i=null;const s=n?new Iu(n):null;e==="value"?i=new yr(s):e&&(i=new ha(e,s)),$m(t._repo,t,i)}uA(pt);gA(pt);/**
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
 */const lR="FIREBASE_DATABASE_EMULATOR_HOST",sl={};let uR=!1;function dR(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=ts(r);t.repoInfo_=new zg(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function Ym(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Vt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),we("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=yf(r,s),a=o.repoInfo,c;typeof process<"u"&&Uh&&(c=Uh[lR]),c?(r=`http://${c}?ns=${a.namespace}`,o=yf(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new II(t.name,t.options,e);BA("Invalid Firebase Database URL",o),M(o.path)||Vt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=fR(a,t,l,new SI(t,n));return new Jm(u,t)}function hR(t,e){const n=sl[e];(!n||n[t.key]!==t)&&Vt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),nR(t),delete n[t.key]}function fR(t,e,n,i){let s=sl[e.name];s||(s={},sl[e.name]=s);let r=s[t.toURLString()];return r&&Vt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new qA(t,uR,n,i),s[t.toURLString()]=r,r}class Jm{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(zA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new pt(this._repo,H())),this._rootInternal}_delete(){return this._rootInternal!==null&&(hR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Vt("Cannot call "+e+" on a deleted database.")}}function Xm(t=Qo(),e){const n=An(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=LT("database");i&&Qm(n,...i)}return n}function Qm(t,e,n,i={}){t=se(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&Qn(i,r.repoInfo_.emulatorOptions))return;Vt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Vt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new jr(jr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:DT(i.mockUserToken,t.app.options.projectId);o=new jr(a)}ts(e)&&(bg(e),Eg("Database",!0)),dR(r,s,i,o)}/**
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
 */function pR(t){Og(is),et(new Ge("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Ym(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),ze($h,Bh,t),ze($h,Bh,"esm2020")}/**
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
 */const gR={".sv":"timestamp"};function qn(){return gR}$t.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};$t.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};pR();const Zm=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:ni,Database:Jm,OnDisconnect:zm,_QueryImpl:da,_QueryParams:ta,_ReferenceImpl:pt,_repoManagerDatabaseFromApp:Ym,_setSDKVersion:Og,_validatePathString:bu,_validateWritablePath:ln,child:ii,connectDatabaseEmulator:Qm,get:Pe,getDatabase:Xm,off:Ct,onChildAdded:Ki,onChildChanged:il,onChildRemoved:Km,onDisconnect:Gm,onValue:ku,push:Js,ref:E,remove:Ke,serverTimestamp:qn,set:Z,update:Wn},Symbol.toStringTag,{value:"Module"}));var mR="firebase",_R="12.8.0";/**
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
 */ze(mR,_R,"app");/**
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
 */const rl=new Map,e_={activated:!1,tokenObservers:[]},yR={initialized:!1,enabled:!1};function pe(t){return rl.get(t)||{...e_}}function wR(t,e){return rl.set(t,e),rl.get(t)}function pa(){return yR}/**
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
 */const t_="https://content-firebaseappcheck.googleapis.com/v1",vR="exchangeRecaptchaEnterpriseToken",bR="exchangeDebugToken",vf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},ER=1440*60*1e3;/**
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
 */class CR{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Be,this.pending.promise.catch(n=>{}),await TR(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Be,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function TR(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */const SR={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Ve=new kn("appCheck","AppCheck",SR);/**
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
 */function bf(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Au(t){if(!pe(t).activated)throw Ve.create("use-before-activation",{appName:t.name})}function n_(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=Or(n)+"d:"),i&&(o+=Or(i)+"h:"),o+=Or(s)+"m:"+Or(r)+"s",o}function Or(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
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
 */async function Ru({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(d){throw Ve.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Ve.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Ve.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Ve.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function IR(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${t_}/projects/${n}/apps/${i}:${vR}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function i_(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${t_}/projects/${n}/apps/${i}:${bR}?key=${s}`,body:{debug_token:e}}}/**
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
 */const kR="firebase-app-check-database",AR=1,Xs="firebase-app-check-store",s_="debug-token";let Lr=null;function r_(){return Lr||(Lr=new Promise((t,e)=>{try{const n=indexedDB.open(kR,AR);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(Ve.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore(Xs,{keyPath:"compositeKey"})}}}catch(n){e(Ve.create("storage-open",{originalErrorMessage:n?.message}))}}),Lr)}function RR(t){return a_(c_(t))}function NR(t,e){return o_(c_(t),e)}function PR(t){return o_(s_,t)}function OR(){return a_(s_)}async function o_(t,e){const i=(await r_()).transaction(Xs,"readwrite"),r=i.objectStore(Xs).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{a(Ve.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function a_(t){const n=(await r_()).transaction(Xs,"readonly"),s=n.objectStore(Xs).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(Ve.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function c_(t){return`${t.options.appId}-${t.name}`}/**
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
 */const un=new Jo("@firebase/app-check");/**
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
 */async function LR(t){if(Ko()){let e;try{e=await RR(t)}catch(n){un.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function nc(t,e){return Ko()?NR(t,e).catch(n=>{un.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function DR(){let t;try{t=await OR()}catch{}if(t)return t;{const e=crypto.randomUUID();return PR(e).catch(n=>un.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
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
 */function Nu(){return pa().enabled}async function Pu(){const t=pa();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function MR(){const t=_g(),e=pa();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Be;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(DR())}/**
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
 */const xR={error:"UNKNOWN_ERROR"};function FR(t){return Go.encodeString(JSON.stringify(t),!1)}async function ol(t,e=!1,n=!1){const i=t.app;Au(i);const s=pe(i);let r=s.token,o;if(r&&!Ei(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(Ei(l)?r=l:await nc(i,void 0))}if(!e&&r&&Ei(r))return{token:r.token};let a=!1;if(Nu())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=Ru(i_(i,await Pu()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await nc(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?un.warn(l.message):n&&un.error(l),ic(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await pe(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?un.warn(l.message):n&&un.error(l),o=l}let c;return r?o?Ei(r)?c={token:r.token,internalError:o}:c=ic(o):(c={token:r.token},s.token=r,await nc(i,r)):c=ic(o),a&&d_(i,c),c}async function UR(t){const e=t.app;Au(e);const{provider:n}=pe(e);if(Nu()){const i=await Pu(),{token:s}=await Ru(i_(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function l_(t,e,n,i){const{app:s}=t,r=pe(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&Ei(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),Ef(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>Ef(t))}function u_(t,e){const n=pe(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function Ef(t){const{app:e}=t,n=pe(e);let i=n.tokenRefresher;i||(i=$R(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function $R(t){const{app:e}=t;return new CR(async()=>{const n=pe(e);let i;if(n.token?i=await ol(t,!0):i=await ol(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=pe(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},vf.RETRIAL_MIN_WAIT,vf.RETRIAL_MAX_WAIT)}function d_(t,e){const n=pe(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function Ei(t){return t.expireTimeMillis-Date.now()>0}function ic(t){return{token:FR(xR),error:t}}/**
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
 */class BR{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=pe(this.app);for(const n of e)u_(this.app,n.next);return Promise.resolve()}}function HR(t,e){return new BR(t,e)}function VR(t){return{getToken:e=>ol(t,e),getLimitedUseToken:()=>UR(t),addTokenListener:e=>l_(t,"INTERNAL",e),removeTokenListener:e=>u_(t.app,e)}}const jR="@firebase/app-check",WR="0.11.0",qR="https://www.google.com/recaptcha/enterprise.js";function zR(t,e){const n=new Be,i=pe(t);i.reCAPTCHAState={initialized:n};const s=GR(t),r=bf(!0);return r?Cf(t,e,r,s,n):JR(()=>{const o=bf(!0);if(!o)throw new Error("no recaptcha");Cf(t,e,o,s,n)}),n.promise}function Cf(t,e,n,i,s){n.ready(()=>{YR(t,e,n,i),s.resolve(n)})}function GR(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function KR(t){Au(t);const n=await pe(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=pe(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function YR(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{pe(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{pe(t).reCAPTCHAState.succeeded=!1}}),r=pe(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function JR(t){const e=document.createElement("script");e.src=qR,e.onload=t,document.head.appendChild(e)}class Ou{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){QR(this._throttleData);const e=await KR(this._app).catch(i=>{throw Ve.create("recaptcha-error")});if(!pe(this._app).reCAPTCHAState?.succeeded)throw Ve.create("recaptcha-error");let n;try{n=await Ru(IR(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=XR(Number(i.customData?.httpStatus),this._throttleData),Ve.create("initial-throttle",{time:n_(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=An(e,"heartbeat"),zR(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof Ou?this._siteKey===e._siteKey:!1}}function XR(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+ER,httpStatus:t};{const n=e?e.backoffCount:0,i=nS(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function QR(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Ve.create("throttled",{time:n_(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
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
 */function ZR(t=Qo(),e){t=se(t);const n=An(t,"app-check");if(pa().initialized||MR(),Nu()&&Pu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw Ve.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return eN(t,e.provider,e.isTokenAutoRefreshEnabled),pe(t).isTokenAutoRefreshEnabled&&l_(i,"INTERNAL",()=>{}),i}function eN(t,e,n=!1){const i=wR(t,{...e_});i.activated=!0,i.provider=e,i.cachedTokenPromise=LR(t).then(s=>(s&&Ei(s)&&(i.token=s,d_(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&un.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const tN="app-check",Tf="app-check-internal";function nN(){et(new Ge(tN,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return HR(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(Tf).initialize()})),et(new Ge(Tf,t=>{const e=t.getProvider("app-check").getImmediate();return VR(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),ze(jR,WR)}nN();const iN={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},ga=Ag(iN),sN="BIk-HpbCt3Vn7GtQtnFfv0h-hvj_2moy04xGYbmXoqH-AsfQVtiTyxl-QZG1plpYHUysu3yaK7jm1wE0OC6Byys",Sf="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let al;if(Sf.trim()!=="")al=new Ou(Sf),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(al)try{ZR(ga,{provider:al,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const C=Xm(ga),ot=[];function nn(t,e,n,i=null,s=null,r=null){e==="value"?ku(t,n):e==="child_added"?Ki(t,n):e==="child_removed"?Km(t,n):console.warn(`Unknown listener type: ${e}`),ot.push({ref:t,type:e,callback:n,roomId:i,userId:s,category:r})}function h_(){ot.forEach(({ref:t,type:e,callback:n})=>{try{Ct(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),ot.length=0}function wr(t){if(!t)return;ot.filter(i=>i.roomId===t).forEach(({ref:i,type:s,callback:r})=>{try{Ct(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=ot.filter(i=>i.roomId!==t);ot.length=0,ot.push(...n)}function f_(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;ot.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{Ct(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const s=ot.filter(r=>!n(r));ot.length=0,ot.push(...s)}function Ii(t,e,n=null){nn(t,"value",e,n)}const tn=t=>E(C,`rooms/${t}`),Cs=t=>E(C,`rooms/${t}/members`),cl=(t,e)=>E(C,`rooms/${t}/members/${e}`),p_=t=>E(C,`rooms/${t}/cancellation`),vr=t=>E(C,`rooms/${t}/watch`),br=t=>E(C,`rooms/${t}/watch/fileRequest`),g_=t=>E(C,`users/${t}/recentCalls`),ma=(t,e)=>E(C,`users/${t}/recentCalls/${e}`),_a=t=>E(C,`users/${t}/outgoingCall`),Lu=t=>E(C,`rooms/${t}/offerCandidates`),Du=t=>E(C,`rooms/${t}/answerCandidates`),rN=Object.freeze(Object.defineProperty({__proto__:null,addRTDBListener:nn,getAnswerCandidatesRef:Du,getOfferCandidatesRef:Lu,getRoomCancellationRef:p_,getRoomMemberRef:cl,getRoomMembersRef:Cs,getRoomRef:tn,getUserOutgoingCallRef:_a,getUserRecentCallRef:ma,getUserRecentCallsRef:g_,getWatchRef:vr,getWatchRequestRef:br,onDataChange:Ii,removeAllRTDBListeners:h_,removeRTDBListenersForRoom:wr,removeRTDBListenersForUser:f_,rtdb:C},Symbol.toStringTag,{value:"Module"}));function m_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const oN=m_,__=new kn("auth","Firebase",m_());/**
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
 */const bo=new Jo("@firebase/auth");function aN(t,...e){bo.logLevel<=q.WARN&&bo.warn(`Auth (${is}): ${t}`,...e)}function Wr(t,...e){bo.logLevel<=q.ERROR&&bo.error(`Auth (${is}): ${t}`,...e)}/**
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
 */function It(t,...e){throw xu(t,...e)}function ut(t,...e){return xu(t,...e)}function Mu(t,e,n){const i={...oN(),[e]:n};return new kn("auth","Firebase",i).create(e,{appName:t.name})}function zn(t){return Mu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function cN(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&It(t,"argument-error"),Mu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function xu(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return __.create(t,...e)}function k(t,e,...n){if(!t)throw xu(e,...n)}function Ot(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Wr(e),new Error(e)}function jt(t,e){t||Ot(e)}/**
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
 */function ll(){return typeof self<"u"&&self.location?.href||""}function lN(){return If()==="http:"||If()==="https:"}function If(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function uN(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(lN()||UT()||"connection"in navigator)?navigator.onLine:!0}function dN(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Er{constructor(e,n){this.shortDelay=e,this.longDelay=n,jt(n>e,"Short delay should be less than long delay!"),this.isMobile=Gl()||Cg()}get(){return uN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Fu(t,e){jt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class y_{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ot("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ot("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ot("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const hN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const fN=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],pN=new Er(3e4,6e4);function Uu(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function cs(t,e,n,i,s={}){return w_(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=ns({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return FT()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&ts(t.emulatorConfig.host)&&(l.credentials="include"),y_.fetch()(await v_(t,t.config.apiHost,n,a),l)})}async function w_(t,e,n){t._canInitEmulator=!1;const i={...hN,...e};try{const s=new mN(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Dr(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Dr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Dr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Dr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw Mu(t,u,l);It(t,u)}}catch(s){if(s instanceof Yt)throw s;It(t,"network-request-failed",{message:String(s)})}}async function gN(t,e,n,i,s={}){const r=await cs(t,e,n,i,s);return"mfaPendingCredential"in r&&It(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function v_(t,e,n,i){const s=`${e}${n}?${i}`,r=t,o=r.config.emulator?Fu(t.config,s):`${t.config.apiScheme}://${s}`;return fN.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class mN{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(ut(this.auth,"network-request-failed")),pN.get())})}}function Dr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=ut(t,e,i);return s.customData._tokenResponse=n,s}/**
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
 */async function _N(t,e){return cs(t,"POST","/v1/accounts:delete",e)}async function Eo(t,e){return cs(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ps(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function yN(t,e=!1){const n=se(t),i=await n.getIdToken(e),s=$u(i);k(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:Ps(sc(s.auth_time)),issuedAtTime:Ps(sc(s.iat)),expirationTime:Ps(sc(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function sc(t){return Number(t)*1e3}function $u(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Wr("JWT malformed, contained fewer than 3 sections"),null;try{const s=no(n);return s?JSON.parse(s):(Wr("Failed to decode base64 JWT payload"),null)}catch(s){return Wr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function kf(t){const e=$u(t);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Qs(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof Yt&&wN(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function wN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class vN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ul{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ps(this.lastLoginAt),this.creationTime=Ps(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Co(t){const e=t.auth,n=await t.getIdToken(),i=await Qs(t,Eo(e,{idToken:n}));k(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?b_(s.providerUserInfo):[],o=EN(t.providerData,r),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new ul(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function bN(t){const e=se(t);await Co(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function EN(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function b_(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function CN(t,e){const n=await w_(t,{},async()=>{const i=ns({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=await v_(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&ts(t.emulatorConfig.host)&&(c.credentials="include"),y_.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function TN(t,e){return cs(t,"POST","/v2/accounts:revokeToken",Uu(t,e))}/**
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
 */class ki{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):kf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){k(e.length!==0,"internal-error");const n=kf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await CN(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new ki;return i&&(k(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(k(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(k(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ki,this.toJSON())}_performRefresh(){return Ot("not implemented")}}/**
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
 */function en(t,e){k(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class at{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new vN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ul(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Qs(this,this.stsTokenManager.getToken(this.auth,e));return k(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return yN(this,e)}reload(){return bN(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new at({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await Co(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(it(this.auth.app))return Promise.reject(zn(this.auth));const e=await this.getIdToken();return await Qs(this,_N(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:g}=n;k(d&&g,e,"internal-error");const _=ki.fromJSON(this.name,g);k(typeof d=="string",e,"internal-error"),en(i,e.name),en(s,e.name),k(typeof h=="boolean",e,"internal-error"),k(typeof f=="boolean",e,"internal-error"),en(r,e.name),en(o,e.name),en(a,e.name),en(c,e.name),en(l,e.name),en(u,e.name);const T=new at({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:_,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(N=>({...N}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,i=!1){const s=new ki;s.updateFromServerResponse(n);const r=new at({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Co(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];k(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?b_(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new ki;a.updateFromIdToken(i);const c=new at({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new ul(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
 */const Af=new Map;function Lt(t){jt(t instanceof Function,"Expected a class definition");let e=Af.get(t);return e?(jt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Af.set(t,e),e)}/**
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
 */class E_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}E_.type="NONE";const dl=E_;/**
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
 */function qr(t,e,n){return`firebase:${t}:${e}:${n}`}class Ai{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=qr(this.userKey,s.apiKey,r),this.fullPersistenceKey=qr("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Eo(this.auth,{idToken:e}).catch(()=>{});return n?at._fromGetAccountInfoResponse(this.auth,n,e):null}return at._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new Ai(Lt(dl),e,i);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||Lt(dl);const o=qr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Eo(e,{idToken:u}).catch(()=>{});if(!h)break;d=await at._fromGetAccountInfoResponse(e,h,u)}else d=at._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Ai(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Ai(r,e,i))}}/**
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
 */function Rf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(I_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(C_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(A_(e))return"Blackberry";if(R_(e))return"Webos";if(T_(e))return"Safari";if((e.includes("chrome/")||S_(e))&&!e.includes("edge/"))return"Chrome";if(k_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function C_(t=Ue()){return/firefox\//i.test(t)}function T_(t=Ue()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function S_(t=Ue()){return/crios\//i.test(t)}function I_(t=Ue()){return/iemobile/i.test(t)}function k_(t=Ue()){return/android/i.test(t)}function A_(t=Ue()){return/blackberry/i.test(t)}function R_(t=Ue()){return/webos/i.test(t)}function Bu(t=Ue()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function SN(t=Ue()){return Bu(t)&&!!window.navigator?.standalone}function IN(){return $T()&&document.documentMode===10}function N_(t=Ue()){return Bu(t)||k_(t)||R_(t)||A_(t)||/windows phone/i.test(t)||I_(t)}/**
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
 */function P_(t,e=[]){let n;switch(t){case"Browser":n=Rf(Ue());break;case"Worker":n=`${Rf(Ue())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${is}/${i}`}/**
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
 */class kN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function AN(t,e={}){return cs(t,"GET","/v2/passwordPolicy",Uu(t,e))}/**
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
 */const RN=6;class NN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??RN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class PN{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nf(this),this.idTokenSubscription=new Nf(this),this.beforeStateQueue=new kN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=__,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Lt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ai.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Eo(this,{idToken:e}),i=await at._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(it(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Co(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=dN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(it(this.app))return Promise.reject(zn(this));const n=e?se(e):null;return n&&k(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return it(this.app)?Promise.reject(zn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return it(this.app)?Promise.reject(zn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await AN(this),n=new NN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new kn("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await TN(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Lt(e)||this._popupRedirectResolver;k(n,this,"argument-error"),this.redirectPersistenceManager=await Ai.create(this,[Lt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=P_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(it(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&aN(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ls(t){return se(t)}class Nf{constructor(e){this.auth=e,this.observer=null,this.addObserver=KT(n=>this.observer=n)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Hu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ON(t){Hu=t}function LN(t){return Hu.loadJS(t)}function DN(){return Hu.gapiScript}function MN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function xN(t,e){const n=An(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(Qn(r,e??{}))return s;It(s,"already-initialized")}return n.initialize({options:e})}function FN(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(Lt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function UN(t,e,n){const i=ls(t);k(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=O_(e),{host:o,port:a}=$N(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){k(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),k(Qn(l,i.config.emulator)&&Qn(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,ts(o)?(bg(`${r}//${o}${c}`),Eg("Auth",!0)):BN()}function O_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function $N(t){const e=O_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Pf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Pf(o)}}}function Pf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function BN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class L_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ot("not implemented")}_getIdTokenResponse(e){return Ot("not implemented")}_linkToIdToken(e,n){return Ot("not implemented")}_getReauthenticationResolver(e){return Ot("not implemented")}}/**
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
 */async function Ri(t,e){return gN(t,"POST","/v1/accounts:signInWithIdp",Uu(t,e))}/**
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
 */const HN="http://localhost";class si extends L_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new si(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):It("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const o=new si(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ri(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,Ri(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ri(e,n)}buildRequest(){const e={requestUri:HN,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ns(n)}return e}}/**
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
 */class Vu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Cr extends Vu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class sn extends Cr{constructor(){super("facebook.com")}static credential(e){return si._fromParams({providerId:sn.PROVIDER_ID,signInMethod:sn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sn.credentialFromTaggedObject(e)}static credentialFromError(e){return sn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sn.credential(e.oauthAccessToken)}catch{return null}}}sn.FACEBOOK_SIGN_IN_METHOD="facebook.com";sn.PROVIDER_ID="facebook.com";/**
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
 */class Et extends Cr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return si._fromParams({providerId:Et.PROVIDER_ID,signInMethod:Et.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Et.credentialFromTaggedObject(e)}static credentialFromError(e){return Et.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return Et.credential(n,i)}catch{return null}}}Et.GOOGLE_SIGN_IN_METHOD="google.com";Et.PROVIDER_ID="google.com";/**
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
 */class rn extends Cr{constructor(){super("github.com")}static credential(e){return si._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return rn.credential(e.oauthAccessToken)}catch{return null}}}rn.GITHUB_SIGN_IN_METHOD="github.com";rn.PROVIDER_ID="github.com";/**
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
 */class on extends Cr{constructor(){super("twitter.com")}static credential(e,n){return si._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return on.credentialFromTaggedObject(e)}static credentialFromError(e){return on.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return on.credential(n,i)}catch{return null}}}on.TWITTER_SIGN_IN_METHOD="twitter.com";on.PROVIDER_ID="twitter.com";/**
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
 */class Yi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await at._fromIdTokenResponse(e,i,s),o=Of(i);return new Yi({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=Of(i);return new Yi({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function Of(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class To extends Yt{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,To.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new To(e,n,i,s)}}function D_(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?To._fromErrorAndOperation(t,r,e,i):r})}async function VN(t,e,n=!1){const i=await Qs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Yi._forOperation(t,"link",i)}/**
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
 */async function jN(t,e,n=!1){const{auth:i}=t;if(it(i.app))return Promise.reject(zn(i));const s="reauthenticate";try{const r=await Qs(t,D_(i,s,e,t),n);k(r.idToken,i,"internal-error");const o=$u(r.idToken);k(o,i,"internal-error");const{sub:a}=o;return k(t.uid===a,i,"user-mismatch"),Yi._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&It(i,"user-mismatch"),r}}/**
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
 */async function M_(t,e,n=!1){if(it(t.app))return Promise.reject(zn(t));const i="signIn",s=await D_(t,i,e),r=await Yi._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function WN(t,e){return M_(ls(t),e)}/**
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
 */function rc(t,e){return se(t).setPersistence(e)}function qN(t,e,n,i){return se(t).onIdTokenChanged(e,n,i)}function zN(t,e,n){return se(t).beforeAuthStateChanged(e,n)}function x_(t,e,n,i){return se(t).onAuthStateChanged(e,n,i)}function GN(t){return se(t).signOut()}async function KN(t){return se(t).delete()}const So="__sak";/**
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
 */class F_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(So,"1"),this.storage.removeItem(So),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const YN=1e3,JN=10;class U_ extends F_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=N_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);IN()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,JN):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},YN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}U_.type="LOCAL";const $_=U_;/**
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
 */class B_ extends F_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}B_.type="SESSION";const H_=B_;/**
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
 */function XN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class ya{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new ya(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await XN(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ya.receivers=[];/**
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
 */function ju(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class QN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=ju("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function St(){return window}function ZN(t){St().location.href=t}/**
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
 */function V_(){return typeof St().WorkerGlobalScope<"u"&&typeof St().importScripts=="function"}async function eP(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tP(){return navigator?.serviceWorker?.controller||null}function nP(){return V_()?self:null}/**
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
 */const j_="firebaseLocalStorageDb",iP=1,Io="firebaseLocalStorage",W_="fbase_key";class Tr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function wa(t,e){return t.transaction([Io],e?"readwrite":"readonly").objectStore(Io)}function sP(){const t=indexedDB.deleteDatabase(j_);return new Tr(t).toPromise()}function hl(){const t=indexedDB.open(j_,iP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(Io,{keyPath:W_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(Io)?e(i):(i.close(),await sP(),e(await hl()))})})}async function Lf(t,e,n){const i=wa(t,!0).put({[W_]:e,value:n});return new Tr(i).toPromise()}async function rP(t,e){const n=wa(t,!1).get(e),i=await new Tr(n).toPromise();return i===void 0?null:i.value}function Df(t,e){const n=wa(t,!0).delete(e);return new Tr(n).toPromise()}const oP=800,aP=3;class q_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await hl(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>aP)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return V_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ya._getInstance(nP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await eP(),!this.activeServiceWorker)return;this.sender=new QN(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await hl();return await Lf(e,So,"1"),await Df(e,So),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>Lf(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>rP(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Df(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=wa(s,!1).getAll();return new Tr(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),oP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}q_.type="LOCAL";const z_=q_;new Er(3e4,6e4);/**
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
 */function G_(t,e){return e?Lt(e):(k(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Wu extends L_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ri(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ri(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ri(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function cP(t){return M_(t.auth,new Wu(t),t.bypassAuthState)}function lP(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),jN(n,new Wu(t),t.bypassAuthState)}async function uP(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),VN(n,new Wu(t),t.bypassAuthState)}/**
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
 */class K_{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return cP;case"linkViaPopup":case"linkViaRedirect":return uP;case"reauthViaPopup":case"reauthViaRedirect":return lP;default:It(this.auth,"internal-error")}}resolve(e){jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const dP=new Er(2e3,1e4);async function hP(t,e,n){if(it(t.app))return Promise.reject(ut(t,"operation-not-supported-in-this-environment"));const i=ls(t);cN(t,e,Vu);const s=G_(i,n);return new Hn(i,"signInViaPopup",e,s).executeNotNull()}class Hn extends K_{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Hn.currentPopupAction&&Hn.currentPopupAction.cancel(),Hn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){jt(this.filter.length===1,"Popup operations only handle one event");const e=ju();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ut(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ut(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Hn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ut(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,dP.get())};e()}}Hn.currentPopupAction=null;/**
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
 */const fP="pendingRedirect",zr=new Map;class pP extends K_{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=zr.get(this.auth._key());if(!e){try{const i=await gP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}zr.set(this.auth._key(),e)}return this.bypassAuthState||zr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gP(t,e){const n=yP(e),i=_P(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function mP(t,e){zr.set(t._key(),e)}function _P(t){return Lt(t._redirectPersistence)}function yP(t){return qr(fP,t.config.apiKey,t.name)}async function wP(t,e){return await ls(t)._initializationPromise,Y_(t,e,!1)}async function Y_(t,e,n=!1){if(it(t.app))return Promise.reject(zn(t));const i=ls(t),s=G_(i,e),o=await new pP(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const vP=600*1e3;class bP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!EP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!J_(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(ut(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=vP&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mf(e))}saveEventToCache(e){this.cachedEventUids.add(Mf(e)),this.lastProcessedEventTime=Date.now()}}function Mf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function J_({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function EP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return J_(t);default:return!1}}/**
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
 */async function CP(t,e={}){return cs(t,"GET","/v1/projects",e)}/**
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
 */const TP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,SP=/^https?/;async function IP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await CP(t);for(const n of e)try{if(kP(n))return}catch{}It(t,"unauthorized-domain")}function kP(t){const e=ll(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!SP.test(n))return!1;if(TP.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const AP=new Er(3e4,6e4);function xf(){const t=St().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function RP(t){return new Promise((e,n)=>{function i(){xf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{xf(),n(ut(t,"network-request-failed"))},timeout:AP.get()})}if(St().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(St().gapi?.load)i();else{const s=MN("iframefcb");return St()[s]=()=>{gapi.load?i():n(ut(t,"network-request-failed"))},LN(`${DN()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw Gr=null,e})}let Gr=null;function NP(t){return Gr=Gr||RP(t),Gr}/**
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
 */const PP=new Er(5e3,15e3),OP="__/auth/iframe",LP="emulator/auth/iframe",DP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},MP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xP(t){const e=t.config;k(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Fu(e,LP):`https://${t.config.authDomain}/${OP}`,i={apiKey:e.apiKey,appName:t.name,v:is},s=MP.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${ns(i).slice(1)}`}async function FP(t){const e=await NP(t),n=St().gapi;return k(n,t,"internal-error"),e.open({where:document.body,url:xP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:DP,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ut(t,"network-request-failed"),a=St().setTimeout(()=>{r(o)},PP.get());function c(){St().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const UP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},$P=500,BP=600,HP="_blank",VP="http://localhost";class Ff{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function jP(t,e,n,i=$P,s=BP){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...UP,width:i.toString(),height:s.toString(),top:r,left:o},l=Ue().toLowerCase();n&&(a=S_(l)?HP:n),C_(l)&&(e=e||VP,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(SN(l)&&a!=="_self")return WP(e||"",a),new Ff(null);const d=window.open(e||"",a,u);k(d,t,"popup-blocked");try{d.focus()}catch{}return new Ff(d)}function WP(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const qP="__/auth/handler",zP="emulator/auth/handler",GP=encodeURIComponent("fac");async function Uf(t,e,n,i,s,r){k(t.config.authDomain,t,"auth-domain-config-required"),k(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:is,eventId:s};if(e instanceof Vu){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",io(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Cr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${GP}=${encodeURIComponent(c)}`:"";return`${KP(t)}?${ns(a).slice(1)}${l}`}function KP({config:t}){return t.emulator?Fu(t,zP):`https://${t.authDomain}/${qP}`}/**
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
 */const oc="webStorageSupport";class YP{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=H_,this._completeRedirectFn=Y_,this._overrideRedirectResult=mP}async _openPopup(e,n,i,s){jt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Uf(e,n,i,ll(),s);return jP(e,r,ju())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await Uf(e,n,i,ll(),s);return ZN(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(jt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await FP(e),i=new bP(e);return n.register("authEvent",s=>(k(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(oc,{type:oc},s=>{const r=s?.[0]?.[oc];r!==void 0&&n(!!r),It(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=IP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return N_()||T_()||Bu()}}const JP=YP;var $f="@firebase/auth",Bf="1.12.0";/**
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
 */class XP{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function QP(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ZP(t){et(new Ge("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;k(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:P_(t)},l=new PN(i,s,r,c);return FN(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),et(new Ge("auth-internal",e=>{const n=ls(e.getProvider("auth").getImmediate());return(i=>new XP(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ze($f,Bf,QP(t)),ze($f,Bf,"esm2020")}/**
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
 */const e0=300,t0=vg("authIdTokenMaxAge")||e0;let Hf=null;const n0=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>t0)return;const s=n?.token;Hf!==s&&(Hf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function i0(t=Qo()){const e=An(t,"auth");if(e.isInitialized())return e.getImmediate();const n=xN(t,{popupRedirectResolver:JP,persistence:[z_,$_,H_]}),i=vg("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=n0(r.toString());zN(n,o,()=>o(n.currentUser)),qN(n,a=>o(a))}}const s=yg("auth");return s&&UN(n,`http://${s}`),n}function s0(){return document.getElementsByTagName("head")?.[0]??document}ON({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=ut("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",s0().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ZP("Browser");const TM=()=>!1,r0=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},V=(...t)=>{},o0=(...t)=>{localStorage.getItem("debug:console")},a0="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Os=new Set;function c0(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function l0(t){return V("[ONE TAP] Callback registered, total callbacks:",Os.size+1),Os.add(t),()=>Os.delete(t)}function vi(t){V("[ONE TAP] Notifying status:",t,"to",Os.size,"callbacks"),Os.forEach(e=>{try{e(t)}catch{}})}function Un(){if(Un.retryCount||(Un.retryCount=0),typeof google>"u"||!google.accounts?.id){if(Un.retryCount++,Un.retryCount>50)return;setTimeout(()=>Un(),100);return}Un.retryCount=0,c0(),google.accounts.id.initialize({client_id:a0,callback:u0,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function qu(){if(Gu()){vi("not_needed");return}window.google?.accounts?.id&&(vi("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?vi("skipped"):e==="dismissed"?vi("dismissed"):e==="display"&&vi("displayed")}))}async function u0(t){try{V("[ONE TAP] Received credential, signing in with Firebase..."),vi("signing_in");const e=Et.credential(t.credential),n=await WN(Me,e);V("[ONE TAP] ✅ Successfully signed in:",n.user.email),Zs(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}let fl=!1;async function d0(){const t=L();if(!t||fl)return;const e=E(C,`users/${t}/presence`);try{await Z(e,{state:"online",lastChanged:qn()}),await Gm(e).set({state:"offline",lastSeen:qn(),lastChanged:qn()}),fl=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function X_(){const t=L();if(!t)return;const e=E(C,`users/${t}/presence`);try{await Z(e,{state:"offline",lastSeen:qn(),lastChanged:qn()}),fl=!1}catch(n){console.error("Failed to set offline:",n)}}function va(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(unescape(encodeURIComponent(e))).replace(/\//g,"-")}async function Q_(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=va(t.email),n=E(C,`usersByEmail/${e}`),i={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await Z(n,i),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(s){throw console.error("[USER DISCOVERY] Failed to register user:",s),s}}async function Z_(t){if(!t||typeof t!="string")return null;try{const e=va(t),n=E(C,`usersByEmail/${e}`),i=await Pe(n);return i.exists()?i.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function ey(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async i=>{const s=await Z_(i);e[i]=s});return await Promise.all(n),e}async function h0(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");try{const e=va(t),n=E(C,`usersByEmail/${e}`),{remove:i}=await he(async()=>{const{remove:s}=await Promise.resolve().then(()=>Zm);return{remove:s}},void 0);await i(n),console.log("[USER DISCOVERY] Removed user from directory:",t)}catch(e){throw console.error("[USER DISCOVERY] Failed to remove user from directory:",e),e}}const f0=Object.freeze(Object.defineProperty({__proto__:null,findUserByEmail:Z_,findUsersByEmails:ey,hashEmail:va,registerUserInDirectory:Q_,removeUserFromDirectory:h0},Symbol.toStringTag,{value:"Module"})),Me=i0(ga);async function p0(){const t=Me.currentUser;return t?t.getIdToken(!1):null}const g0=typeof import.meta<"u"&&!0;function zu(t,e,n={}){const i=typeof window<"u"?window.location.origin:"n/a";g0?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:i,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:i})}const ty=(async()=>{try{await rc(Me,z_)}catch{try{await rc(Me,$_)}catch{await rc(Me,dl)}}try{(await wP(Me))?.user&&V("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){V("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Un(),qu()},500)})();let ny=!1;function Zs(t){ny=t}function m0(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function iy(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,i=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:i,isIOSStandalone:n&&i}}function _0(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:i}=iy();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),Zs(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const s=t?.customData?.email;if(zu("Google sign-in",t,{email:s?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let ys=null;const y0=()=>Math.random().toString(36).substring(2,15),pl="guestUser",w0=2880*60*1e3;function v0(){try{const t=typeof localStorage<"u"?localStorage.getItem(pl):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(pl)}catch{}return null}return e}catch{return null}}function b0(t,e=w0){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(pl,JSON.stringify(i))}catch{}return i}function de(){const t=L();if(t)return t;if(!ys){const e=v0();e&&e.id?ys=e.id:(ys=y0(),b0(ys))}return ys}function Wt(){return Me.currentUser}function Gu(){return Me.currentUser!==null}function L(){return Me.currentUser?.uid??null}function E0(){return new Promise(t=>{const e=x_(Me,n=>{e(),t(n)})})}function Ku(t,{truncate:e=7}={}){return x_(Me,n=>{const i=!!n,s=n?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;i?(d0().catch(o=>{console.warn("Failed to initialize presence:",o)}),Q_(n).catch(o=>{console.warn("Failed to register user in directory:",o)})):ba();try{t({user:n,isLoggedIn:i,userName:r})}catch{}})}const sy=async()=>{const t=new Et;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=iy();try{if(e&&ny){V("[AUTH] Using Safari external fallback"),Zs(!1),m0();return}V("[AUTH] Starting popup sign-in flow...");const n=await hP(Me,t);return V("[AUTH] Popup sign-in successful:",n.user.email),Zs(!1),n}catch(n){_0(n)}};async function ry(){try{await X_(),ba(),await GN(Me),console.info("User signed out"),setTimeout(()=>qu(),1500)}catch(t){throw zu("Sign out",t),t}}async function oy(){const t=Me.currentUser;if(!t)throw new Error("No user logged in");const e=t.uid;try{console.info("[AUTH] Starting account deletion for user:",e);const{ref:n,remove:i}=await he(async()=>{const{ref:r,remove:o}=await Promise.resolve().then(()=>Zm);return{ref:r,remove:o}},void 0),{rtdb:s}=await he(async()=>{const{rtdb:r}=await Promise.resolve().then(()=>rN);return{rtdb:r}},void 0);await X_(),ba(),console.info("[AUTH] Deleting Firebase Auth account..."),await KN(t),console.info("[AUTH] Cleaning up user data from RTDB...");try{await i(n(s,`users/${e}`))}catch(r){console.warn("[AUTH] Failed to remove user node from RTDB:",r)}try{const{FCMTransport:r}=await he(async()=>{const{FCMTransport:a}=await Promise.resolve().then(()=>$D);return{FCMTransport:a}},void 0);await new r().deleteToken()}catch(r){console.warn("[AUTH] Failed to delete FCM token:",r)}if(t.email)try{const{removeUserFromDirectory:r}=await he(async()=>{const{removeUserFromDirectory:o}=await Promise.resolve().then(()=>f0);return{removeUserFromDirectory:o}},void 0);await r(t.email)}catch(r){console.warn("[AUTH] Failed to remove user from discovery directory:",r)}console.info("[AUTH] Account deleted successfully"),setTimeout(()=>qu(),1500)}catch(n){throw zu("Delete account",n),n.code==="auth/requires-recent-login"?new Error("For security, please sign out and sign in again before deleting your account."):n}}const Vf="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",C0=6e4,er={};function T0(t){const e=er[t];return e&&Date.now()<e.expiresAt?e.token:(delete er[t],null)}function S0(t,e,n){er[t]={token:e,expiresAt:Date.now()+n*1e3-C0}}function ba(){for(const t in er)delete er[t]}function ay(t,e){const n=T0(t);return n?(console.log(`[AUTH] Using cached ${t} token`),Promise.resolve(n)):new Promise((i,s)=>{if(typeof google>"u"||!google.accounts?.oauth2){s(new Error("Google Identity Services not loaded"));return}const o=Wt()?.email||void 0;function a(u,d){if(u.error){if(d){console.log(`[AUTH] Silent ${t} token failed (${u.error}), trying interactive...`),d();return}console.error(`[AUTH] ${t} token request error:`,u.error),u.error==="access_denied"?s(new Error("Authorization cancelled")):s(new Error(u.error_description||u.error));return}if(!u.access_token){s(new Error("No access token received"));return}console.log(`[AUTH] ${t} access granted`),S0(t,u.access_token,u.expires_in||3600),i(u.access_token)}function c(){console.log(`[AUTH] Requesting ${t} access via interactive popup...`),google.accounts.oauth2.initTokenClient({client_id:Vf,scope:e,hint:o,callback:d=>a(d,null),error_callback:d=>{console.error(`[AUTH] ${t} interactive error:`,d),d.type==="popup_closed"?s(new Error("Authorization cancelled")):s(new Error(d.message||"Authorization failed"))}}).requestAccessToken()}console.log(`[AUTH] Attempting silent ${t} token acquisition...`),google.accounts.oauth2.initTokenClient({client_id:Vf,scope:e,hint:o,callback:u=>a(u,c),error_callback:()=>{console.log(`[AUTH] Silent ${t} error_callback, trying interactive...`),c()}}).requestAccessToken({prompt:"none"})})}function cy(){return ay("contacts","https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly")}function ly(){return ay("gmail-send","https://www.googleapis.com/auth/gmail.send")}const Yu=Object.freeze(Object.defineProperty({__proto__:null,auth:Me,authReady:ty,clearGISTokenCache:ba,deleteAccount:oy,getCurrentUser:Wt,getCurrentUserAsync:E0,getLoggedInUserId:L,getLoggedInUserToken:p0,getUserId:de,isLoggedIn:Gu,onAuthChange:Ku,requestContactsAccess:cy,requestGmailSendAccess:ly,setSafariExternalOpenArmed:Zs,signInWithAccountSelection:sy,signOutUser:ry},Symbol.toStringTag,{value:"Module"}));function Ea(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class I0{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}async addReaction(e,n,i){throw new Error("MessagingTransport.addReaction() must be implemented by subclass")}async removeReaction(e,n,i){throw new Error("MessagingTransport.removeReaction() must be implemented by subclass")}async getReactions(e,n){throw new Error("MessagingTransport.getReactions() must be implemented by subclass")}}const jf=100;class k0 extends I0{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const i=L();if(!i)throw new Error("Cannot send message: not logged in");const r=Wt()?.displayName||"Guest User",o=this._getConversationId(i,e),a=Js(E(C,`conversations/${o}/messages`));await Z(a,{text:n,from:i,fromName:r,sentAt:qn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const i=L();if(!i)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const s=this._getConversationId(i,e),r=E(C,`conversations/${s}/messages`),o=new Set,a=l=>{const u=l.key,d=l.val();if(!d||o.has(u))return;o.add(u);const h=d.from===i,f={...d,messageId:u};n(d.text,f,h)},c=l=>{const u=l.key,d=l.val();if(!(!d||!o.has(u))&&d.reactions!==void 0){const h=d.from===i,f={...d,messageId:u,_reactionUpdate:!0};n(d.text,f,h)}};return Ki(r,a),il(r,c),()=>{Ct(r,"child_added",a),Ct(r,"child_changed",c)}}async getUnreadCount(e){const n=L();if(!n)return 0;const i=this._getConversationId(n,e),s=E(C,`conversations/${i}/messages`);try{const r=await Pe(s);if(!r.exists())return 0;const o=r.val();return Object.values(o).filter(a=>!a.read&&a.from===e).length}catch(r){return console.warn("[RTDBTransport] Failed to get unread count:",r),0}}async markAsRead(e){const n=L();if(!n)return;const i=this._getConversationId(n,e),s=E(C,`conversations/${i}/messages`);try{const r=await Pe(s);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${i}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await Wn(E(C),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const i=L();if(!i)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const s=this._getConversationId(i,e),r=E(C,`conversations/${s}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Ki(r,a),il(r,c),()=>{Ct(r,"child_added",a),Ct(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=E(C,`conversations/${e}/messages`),i=await Pe(n);if(!i.exists())return;const s=i.val(),r=Object.keys(s).length;if(r<=jf)return;const o=r-jf,a=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await Wn(E(C),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}async addReaction(e,n,i){const s=L();if(!s)throw new Error("Cannot add reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await Z(E(C,o),!0)}async removeReaction(e,n,i){const s=L();if(!s)throw new Error("Cannot remove reaction: not logged in");const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;await Z(E(C,o),null)}async getReactions(e,n){const i=L();if(!i)return{};const s=this._getConversationId(i,e),r=E(C,`conversations/${s}/messages/${n}/reactions`);try{const o=await Pe(r);if(!o.exists())return{};const a=o.val(),c={};for(const[l,u]of Object.entries(a))c[l]=Object.keys(u);return c}catch(o){return console.warn("[RTDBTransport] Failed to get reactions:",o),{}}}async hasMyReaction(e,n,i){const s=L();if(!s)return!1;const o=`conversations/${this._getConversationId(s,e)}/messages/${n}/reactions/${i}/${s}`;try{return(await Pe(E(C,o))).exists()}catch{return!1}}}class A0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:i}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const s=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&i&&typeof i=="function"&&this.transport.getUnreadCount(e).then(l=>i(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},addReaction:(o,a)=>this.transport.addReaction(e,o,a),removeReaction:(o,a)=>this.transport.removeReaction(e,o,a),hasMyReaction:(o,a)=>this.transport.hasMyReaction(e,o,a),getReactions:o=>this.transport.getReactions(e,o),_unsubscribe:s};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const mn=new A0(new k0);function ko(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,i]=[t,e].sort(),s=`${n}_${i}`;let r=0;for(let u=0;u<s.length;u++){const d=s.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<s.length;u++)o=(o<<5)+o+s.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class R0{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=s=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,s),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class N0{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){const s="/HangVidU/";this.incomingSrc=e??`${s}sounds/incoming.mp3`,this.outgoingSrc=n??`${s}sounds/outgoing.mp3`,this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new R0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const Gn=new N0,tr=new WeakMap;function Ju(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(tr.has(t)||tr.set(t,[]),e==="initiator")Wf(t,"offerCandidates",n),qf(t,"answerCandidates",n);else if(e==="joiner")Wf(t,"answerCandidates",n),qf(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function Wf(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=Js(e==="offerCandidates"?Lu(n):Du(n));Z(s,i.candidate.toJSON())}}}function qf(t,e,n){const i=e==="offerCandidates"?Lu(n):Du(n);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{t.remoteDescription&&(Xu(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};nn(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=tr.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function Xu(t){if(!t||!tr.has(t))return;const e=tr.get(t);if(e.length!==0){V(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{V("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const P0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Xu,setupIceCandidates:Ju},Symbol.toStringTag,{value:"Module"}));class Ni{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...s})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,n,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...s})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,n,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...s})}logFreshnessValidation(e,n,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,n,i,s={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...s})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Ni.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...n}),s}return null}}let ac=null;function w(){return ac||(ac=new Ni),ac}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>w(),exportLogs:()=>{const e=w().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{w().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=w().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=w().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=w().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=w().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=w().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=w().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=w().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Ni.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{w().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{w().enable(),console.log("Diagnostic logging enabled")},disable:()=>{w().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=w(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=w();t.logs.length>0&&t.persistLogs(),Ni.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=w(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Ni.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class O0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),w().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:s});const r=tn(i);try{return await Z(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),w().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-s}),await this.joinRoom(i,n),w().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-s}),i}catch(o){throw w().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-s}),o}}async checkRoomStatus(e){const n=tn(e),i=await Pe(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const n=tn(e),i=await Pe(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=tn(e);await Wn(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const s=cl(e,n);await Z(s,{displayName:i,joinedAt:Date.now()}),w().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const s=n||this.currentRoomId;if(!s||!e)return;const r=cl(s,e),o=Cs(s),a=tn(s);try{await Ke(r)}catch(c){w().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await Pe(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await Ke(a).catch(d=>{w().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){w().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const s=tn(e),r={rejection:{by:n,reason:i,at:Date.now()}};try{await Wn(s,r),w().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw w().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const s=tn(e),r={cancellation:{by:n,reason:i,at:Date.now()}};try{await Wn(s,r),w().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw w().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=p_(e);nn(i,"value",n,e),w().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=Cs(e);nn(i,"child_added",n,e),w().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=Cs(e);nn(i,"child_removed",n,e),w().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const s=Cs(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return nn(s,"child_added",r,e,n),nn(s,"child_removed",o,e,n),()=>f_(n,e)}get roomId(){return this.currentRoomId}}const oe=new O0,qt={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=qt.view;document.body.dataset.mainContent=qt.currentMedia;const Ao=3e4;let Nt=null,Ts=null;async function L0(t,e=null){const n=de(),i=L();if(!i)return;const s=_a(i);await Z(s,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function Ro(){const t=L();if(!t)return;const e=_a(t);await Ke(e).catch(()=>{})}async function uy(t,e){if(!t)return!1;try{const n=_a(t),i=await Pe(n);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<Ao}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function dy(t){if(!t)return!1;try{const e=E(C,`rooms/${t}/createdAt`),n=await Pe(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<Ao}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function hy(t,e,n){const i=w(),s=Date.now();Kn(),await L0(t,e),qt.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([Ro(),oe.cancelCall(t,de(),"caller_cancelled"),oe.leaveRoom(de(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Gn.stop(),Kn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,Nt=r,Gn.playOutgoing(),Ts=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:Ao});try{await Promise.all([Ro(),oe.cancelCall(t,de(),"auto_timeout"),oe.leaveRoom(de(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Gn.stop(),Kn()},Ao)}function Kn(){if(Gn.stop(),qt.view==="calling"&&qt.setView("lobby"),Nt){const t=Nt.dataset?.roomId||"unknown";w().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Ts,timestamp:Date.now()})}Ts&&(clearTimeout(Ts),Ts=null),Nt&&(Nt.remove(),Nt=null)}async function Qu(){if(Nt){const t=Nt.dataset?.roomId||"unknown";w().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await Ro(),Kn()}async function D0(t="user_rejected"){const e=w(),n=Nt?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await Ro(),Kn()}const M0=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Kn,isOutgoingCallFresh:uy,isRoomCallFresh:dy,onCallAnswered:Qu,onCallRejected:D0,showCallingUI:hy},Symbol.toStringTag,{value:"Module"})),G=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let nt=null,Rn=null,Ca=null,Zu=null,Ye=null,ve=null,le=null,ue=null,B=null,xe=null,Qe=null,je=null,dt=null,us=null,fy=null,ht=null,Ta=null,Sn=null,ds=null,hs=null,ri=null,ed=null,td=null,nd=null,id=null,Pi=null,nr=null,sd=null;function zf(){nt=G("lobby"),Rn=G("lobby-call-btn"),Ca=G("title-auth-bar"),Zu=G("videos"),Ye=G("local-video-el"),ve=G("local-video-box"),le=G("remote-video-el"),ue=G("remote-video-box"),B=G("shared-video-el"),xe=G("shared-video-box"),Qe=G("chat-controls"),je=G("call-btn"),dt=G("hang-up-btn"),us=G("switch-camera-btn"),ht=G("mute-btn"),Ta=G("fullscreen-partner-btn"),Sn=G("remote-pip-btn"),ds=G("mic-btn"),hs=G("camera-btn"),ri=G("exit-watch-mode-btn"),ed=G("app-pip-btn"),td=G("app-title-h1"),nd=G("app-title-a"),id=G("app-title-span"),Pi=G("paste-join-btn"),nr=G("add-contact-btn"),sd=G("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",zf):zf();const py=()=>({lobbyDiv:nt,lobbyCallBtn:Rn,titleAuthBar:Ca,videosWrapper:Zu,localVideoEl:Ye,localBoxEl:ve,remoteVideoEl:le,remoteBoxEl:ue,sharedVideoEl:B,sharedBoxEl:xe,chatControls:Qe,callBtn:je,hangUpBtn:dt,switchCameraBtn:us,installBtn:fy,mutePartnerBtn:ht,fullscreenPartnerBtn:Ta,remotePipBtn:Sn,micBtn:ds,cameraBtn:hs,exitWatchModeBtn:ri,appPipBtn:ed,appTitleH1:td,appTitleA:nd,appTitleSpan:id,pasteJoinBtn:Pi,addContactBtn:nr,testNotificationsBtn:sd});function gy(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function my(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await gy(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function x0(){const t=await my(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const F0=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return nr},get appPipBtn(){return ed},get appTitleA(){return nd},get appTitleH1(){return td},get appTitleSpan(){return id},get callBtn(){return je},get cameraBtn(){return hs},get chatControls(){return Qe},get exitWatchModeBtn(){return ri},get fullscreenPartnerBtn(){return Ta},getElements:py,get hangUpBtn(){return dt},initializeYouTubeElements:x0,installBtn:fy,get lobbyCallBtn(){return Rn},get lobbyDiv(){return nt},get localBoxEl(){return ve},get localVideoEl(){return Ye},get micBtn(){return ds},get mutePartnerBtn(){return ht},get pasteJoinBtn(){return Pi},get remoteBoxEl(){return ue},get remotePipBtn(){return Sn},get remoteVideoEl(){return le},robustElementAccess:gy,get sharedBoxEl(){return xe},get sharedVideoEl(){return B},get switchCameraBtn(){return us},get testNotificationsBtn(){return sd},get titleAuthBar(){return Ca},get videosWrapper(){return Zu},waitForElements:my},Symbol.toStringTag,{value:"Module"})),rd=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),No=t=>{if(rd(t))return t.classList.contains("hidden")},U=t=>{rd(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},v=t=>{rd(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},_y=t=>t.classList.contains("small-frame"),ir=t=>{if(t&&!_y(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},_n=t=>{if(_y(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function od(t){return document.pictureInPictureElement===t}function U0(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(_=>!Array.isArray(o)||!o.includes(_));function u(){U(t);try{typeof i=="function"&&i()}catch(_){console.warn("showHideOnInactivity onShow callback error:",_)}a&&clearTimeout(a),a=setTimeout(()=>{v(t);try{typeof s=="function"&&s()}catch(_){console.warn("showHideOnInactivity onHide callback error:",_)}a=null},e)}l.forEach(_=>n.addEventListener(_,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{v(t)}catch(_){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",_)}}else u()}document.addEventListener("visibilitychange",d);function h(_){if(!_.relatedTarget){a&&(clearTimeout(a),a=null),v(t);try{typeof s=="function"&&s()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(_){if(r&&(_.key==="Escape"||_.key==="Esc")){a&&(clearTimeout(a),a=null),v(t);try{typeof s=="function"&&s()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),v(t);function g(){l.forEach(_=>n.removeEventListener(_,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return g}let Dt=null,Mt=null,yy="user";function gl(){return yy}function wy(t){yy=t}function Sa(){return Dt instanceof MediaStream}function ad(){return!Dt||!(Dt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Dt),null):Dt}function vy(t){Dt=t}function by(){Dt&&(Dt.getTracks().forEach(t=>t.stop()),Dt=null)}function Ey(){return Mt instanceof MediaStream}function Ia(){return!Mt||!(Mt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",Mt),console.error("Call createLocalStream() before accessing local stream."),null):Mt}function Po(t){Mt=t}function Cy(){Mt&&(Mt.getTracks().forEach(t=>t.stop()),Mt=null)}const $0=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:Cy,cleanupRemoteStream:by,getFacingMode:gl,getLocalStream:Ia,getRemoteStream:ad,hasLocalStream:Ey,hasRemoteStream:Sa,setFacingMode:wy,setLocalStream:Po,setRemoteStream:vy},Symbol.toStringTag,{value:"Module"})),Gf="yt-video-box",ml="yt-player-root";let te=null,Jt=!1;const Ls=()=>te,B0=()=>Jt,Ty=t=>Jt=t,Oi=()=>{const t=document.getElementById(Gf);if(!t)throw new Error(`Container #${Gf} not found`);return t};function H0(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Sy(){const t=Oi();if(!document.getElementById(ml)){const e=document.createElement("div");e.id=ml,t.appendChild(e)}U(t)}function Oo(){const t=Oi();v(t)}function cc(){const t=Oi();return t&&!t.classList.contains("hidden")}function _l(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function Iy(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function V0({url:t,onReady:e,onStateChange:n}){const i=Iy(t);if(!i)throw new Error("Invalid YouTube URL");if(await H0(),te){try{te.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}te=null}const s=(o=!0)=>{const a=Oi(),c=te.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Oi(),h=te.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),te.getPlayerState()!==window.YT.PlayerState.PLAYING?ld():Sr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Oi(),a=te.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Sy(),new Promise((o,a)=>{try{te=new window.YT.Player(ml,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Jt=!0,e&&e(c),o(te)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function cd(){if(te){try{Oo(),te.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}te=null,Jt=!1}}function ld(){te&&Jt&&te.playVideo()}function Sr(){te&&Jt&&te.pauseVideo()}function j0(t){te&&Jt&&te.seekTo(t,!0)}function Lo(){return te&&Jt?te.getCurrentTime():0}function ud(){return te&&Jt?te.getPlayerState():-1}const dn={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},ky=()=>{if(!Sa())return!1;const t=ad();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function W0(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function q0(){oi()||(Ry(!0),v(nt),v(Rn),Qe.classList.remove("bottom"),Qe.classList.add("watch-mode"),wl()?(v(je),U(dt)):(v(dt),v(ds),v(ht),U(je)),v(hs),v(us),U(ri),U(Qe),wl()&&(v(ve),_n(ve),v(ue),od(le)?_n(ue):W0()?le.requestPictureInPicture().then(()=>{_n(ue)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),ir(ue),U(ue)}):(ir(ue),U(ue))))}function z0(){oi()&&(v(ri),U(je),U(dt),U(ds),U(ht),U(hs),U(us),Qe.classList.remove("watch-mode"),Qe.classList.add("bottom"),U(Qe),ky()&&(od(le)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),_n(ue),U(ue)),wl()?(ir(ve),U(ve)):(U(nt),U(Rn),_n(ve),v(ve)),Ry(!1))}function Do(){qt.setMainContent("ytVideo"),q0()}function Ds(){qt.setMainContent("remoteStream"),z0()}let Se=null,zt=null,Ay=!1,ft="none",Ms=null,Ze=null;const oi=()=>Ay,Ry=t=>Ay=t,vt=()=>ft,G0=t=>{["yt","url","file","none"].includes(t)?ft=t:console.warn("Invalid lastWatched platform:",t)};let hn=!1,xs=null,Li=0,lc=!1;async function Di(t){if(!Se)return;console.debug("Updating watch sync state, roomId:",Se);const e=vr(Se);try{await Wn(e,{...t,updatedBy:zt})}catch(n){console.error("Failed to update watch state:",n)}}function K0(t,e,n){if(!t)return;Se=t,zt=n;const i=vr(t),s=br(t);Ii(i,Q0,t),Ii(s,X0,t),rO()}function dd(t){return typeof t=="string"&&t.startsWith("blob:")}async function Y0(t,e){if(!Se||!zt)return!1;const n=br(Se);try{return await Z(n,{fileName:t,requestedBy:zt,timestamp:Date.now()}),Ze&&clearTimeout(Ze),Ze=setTimeout(()=>{yl()},300*1e3),!0}catch(i){return console.error("Failed to create watch request:",i),!1}}async function J0(t){if(!Se)return!1;const e=br(Se);try{await Ke(e)}catch(n){console.warn("Failed to remove watch request:",n)}return Ze&&(clearTimeout(Ze),Ze=null),await sr(t)}async function yl(){if(!Se)return;Ze&&(clearTimeout(Ze),Ze=null);const t=br(Se);try{await Ke(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function X0(t){const e=t.val();if(!e){Ze&&(clearTimeout(Ze),Ze=null);return}e.requestedBy!==zt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function Q0(t){const e=t.val();e&&e.updatedBy!==zt&&(Date.now()-Li<500||(e.url&&e.url!==Ms&&!dd(e.url)&&Z0(e.url),e.isYouTube?eO(e):sO(e)))}function Z0(t){Ms=t,_l(t)?(v(xe),Ny(t),ft="yt"):(cd(),U(xe),B.src=t,ft="url"),Do()}function eO(t){!Ls()||!B0()||(tO(t),nO(t))}function tO(t){const e=ud(),n=e===dn.PLAYING;if([dn.BUFFERING,dn.UNSTARTED].includes(e)){iO();return}hn||(t.playing&&!n?(ld(),ft="yt"):!t.playing&&n&&(Sr(),ft="yt"))}function nO(t){if(t.currentTime===void 0)return;const e=Lo();Math.abs(e-t.currentTime)>.3&&!hn&&(j0(t.currentTime),setTimeout(()=>{t.playing?ld():Sr(),ft="yt"},500))}function iO(){hn=!0,clearTimeout(xs),xs=setTimeout(async()=>{hn=!1;const t=ud()===dn.PLAYING;await Di({playing:t,currentTime:Lo()})},700)}function sO(t){Li=Date.now(),t.playing!==void 0&&(t.playing&&B.paused?B.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!B.paused&&B.pause()),t.currentTime!==void 0&&Math.abs(B.currentTime-t.currentTime)>1&&(B.currentTime=t.currentTime,t.playing?B.play().catch(n=>console.warn("Play failed:",n)):B.pause())}function rO(){const t=()=>{ft!=="file"&&(ft="url")};B.addEventListener("play",async()=>{!Ls()&&Se&&(Li=Date.now(),await Di({playing:!0,currentTime:B.currentTime,isYouTube:!1})),t()}),B.addEventListener("pause",async()=>{B.seeking||(!Ls()&&Se&&(Li=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:B.currentTime}),await Di({playing:!1,currentTime:B.currentTime,isYouTube:!1})),t())}),B.addEventListener("playing",()=>{lc=!0}),B.addEventListener("pause",()=>{B.seeking||(lc=!1)},!0),B.addEventListener("seeked",async()=>{!Ls()&&Se&&(Li=Date.now(),await Di({currentTime:B.currentTime,playing:lc,isYouTube:!1})),t()})}async function oO(t){if(!t)return!1;Li=Date.now();const e=dd(t);if(_l(t)){if(v(xe),!await Ny(t))return!1;ft="yt"}else cd(),U(xe),B.src=t,ft=e?"file":"url";if(Se){const n=vr(Se);e?await Z(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:zt}):Z(n,{url:t,playing:!1,currentTime:0,isYouTube:_l(t),updatedBy:zt})}return Do(),!0}async function sr(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;Ms=e;const n=await oO(e);return n||dd(Ms)&&t instanceof File&&(URL.revokeObjectURL(e),Ms=null),n}async function Ny(t){if(!Iy(t))return console.error("Invalid YouTube URL:",t),!1;try{return await V0({url:t,onReady:n=>{if(Ty(!0),Se){const i=vr(Se);Z(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:zt})}},onStateChange:async n=>{if(!Ls())return;const s=n.data===dn.PLAYING,r=n.data===dn.PAUSED;if(n.data===dn.BUFFERING){hn=!0,xs&&clearTimeout(xs),xs=setTimeout(async()=>{hn=!1;const c=ud()===dn.PLAYING;await Di({playing:c,currentTime:Lo()})},700);return}r&&hn||!hn&&(s||r)&&await Di({playing:s,currentTime:Lo()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let Mi=!1,Mr=!1,Kf=null,Yf=null,Fs=null;const wl=()=>Mi,Py=()=>{if(!Mi){if(!le||!Sa()||le.paused||le.readyState<2){Mr||(Mr=!0,le.addEventListener("playing",()=>{Mr=!1,Py()},{once:!0}));return}if(Mr=!1,Mi=!0,U(ue),U(ve),ir(ve),v(nt),v(Rn),je.disabled=!0,je.classList.add("disabled"),dt.disabled=!1,dt.classList.remove("disabled"),ht.disabled=!1,ht.classList.remove("disabled"),Sn.disabled=!1,Sn.classList.remove("disabled"),Fs||(Fs=U0(Qe,{inactivityMs:2500,hideOnEsc:!0})),!Kf){const t=()=>{Mi&&(oi()?ir(ue):_n(ue),U(ue))};le.addEventListener("leavepictureinpicture",t),Kf=()=>le.removeEventListener("leavepictureinpicture",t)}if(!Yf){const t=()=>v(ue);le.addEventListener("enterpictureinpicture",t),Yf=()=>le.removeEventListener("enterpictureinpicture",t)}}},aO=()=>{Mi&&(Mi=!1,od(le)&&document.exitPictureInPicture().catch(()=>{}),_n(ve),v(ve),_n(ue),v(ue),je.disabled=!1,je.classList.remove("disabled"),dt.disabled=!0,dt.classList.add("disabled"),ht.disabled=!0,ht.classList.add("disabled"),Sn.disabled=!0,Sn.classList.add("disabled"),Fs&&(Fs(),Fs=null),oi()||(U(Rn),U(nt),U(Qe)))};function Oy(){qt.setView("connected"),Py()}function Ly(){qt.setView("lobby"),aO()}let wt=null,Jf=null;function Dy(t){Jf=t,t.onconnectionstatechange=()=>{V("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Oy(),Qu().catch(e=>console.warn("Failed to clear calling state on connect:",e)),wt&&(clearTimeout(wt),wt=null)):t.connectionState==="disconnected"?(wt&&clearTimeout(wt),wt=setTimeout(()=>{t===Jf&&t.connectionState==="disconnected"&&be.cleanupCall({reason:"connection_lost"}),wt=null},3e3)):t.connectionState==="failed"&&(Ea(),wt&&(clearTimeout(wt),wt=null),be.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{V("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const hd={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},uc=new WeakMap;function My(t,e,n){uc.has(t)||uc.set(t,{});const i=uc.get(t),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===n?!0:(i[s]=n,!1)}function xy(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function fd(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Fy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Uy(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function $y(t,e,n){if(My(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!xy(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function By(){return Math.random().toString(36).substring(2,9)}const cO=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:fd,createAnswer:Uy,createOffer:Fy,generateRoomId:By,isDuplicateSdp:My,isValidSignalingState:xy,rtcConfig:hd,setRemoteDescription:$y},Symbol.toStringTag,{value:"Module"}));async function lO({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(hd),a="initiator",c=r||By(),l=de();fd(o,t);const u=o.createDataChannel("files");if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Ju(o,a,c),Dy(o);const h=await Fy(o);await oe.createNewRoom(h,l,c),s(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function uO({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await oe.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await oe.getRoomData(t)}catch(_){return V("Error: "+_.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(hd),d="joiner",h=de();fd(u,e);let f=null;if(u.ondatachannel=_=>{f=_.channel,V("[Call Flow] DataChannel received by joiner",{label:f.label})},!s(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Ju(u,d,t),Dy(u),await $y(u,l,Xu);const g=await Uy(u);try{await oe.saveAnswer(t,g)}catch(_){return console.error("Failed to save answer to Firebase:",_),u.close(),{success:!1}}return r(t,d,h),await oe.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class dO{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const hO={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function fO(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function pO(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const i=new DataView(t).getUint32(0,!0),s=4+i;if(t.byteLength<s)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",s,"got:",t.byteLength),null;const r=new Uint8Array(t,4,i),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+i,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const gO=1024;function mO(t,e,n){let i=0,s=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(s++,i+=c.byteLength):r.push(l)});const o=e-i;return{isComplete:s===n&&Math.abs(o)<=gO,validChunks:s,totalSize:i,missingChunks:r,sizeDifference:o}}const dc=hO.FILE_CONFIG.NETWORK_CHUNK_SIZE,Xf=9e3*1024*1024;class _O{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Xf)throw new Error(`File too large (max ${Xf/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const i=`${e.name}-${e.size}-${Date.now()}`,s=Math.ceil(e.size/dc);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:i,name:e.name,size:e.size,mimeType:e.type,totalChunks:s}));for(let r=0;r<s;r++){const o=r*dc,a=Math.min(o+dc,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:i,chunkIndex:r,totalChunks:s},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/s);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await fO(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const i=pO(n);if(!i){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:s,chunkData:r}=i,o=this.receivedChunks.get(s.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",s.fileId);return}if(o[s.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/s.totalChunks)}o.filter(a=>a).length===s.totalChunks&&this.assembleFile(s.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),i=this.receivedChunks.get(e),s=mO(i,n.size,n.totalChunks);if(!s.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...s}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:s});return}const r=new Blob(i,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class yO extends dO{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new _O(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function rr(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"],ignoreInputBlur:o=!1}=n,a=()=>{let f=n.ignore||[];return typeof f=="function"&&(f=f()),Array.isArray(f)?f.filter(Boolean):[]};let c=!1;const l=f=>{try{const p=f.target;if(t.contains(p))return;const g=a();for(const _ of g)if(_&&_.contains&&_.contains(p)||_===p)return;if(o&&c&&!(p.tagName==="INPUT"||p.tagName==="TEXTAREA"||p.isContentEditable)){c=!1;return}e(f)}catch(p){console.error("closeOnClickOutside handler error:",p)}},u=f=>{s&&f.key==="Escape"&&e(f)},d=()=>{c=!0},h=()=>{setTimeout(()=>{c=!1},0)};return r.forEach(f=>document.addEventListener(f,l,{passive:!0})),s&&document.addEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(p=>{p.addEventListener("focus",d),p.addEventListener("blur",h)}),function(){r.forEach(p=>document.removeEventListener(p,l,{passive:!0})),s&&document.removeEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(g=>{g.removeEventListener("focus",d),g.removeEventListener("blur",h)})}}const wO=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),vO=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):wO(String(r))}),bO=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=vO(t,e),n.content.cloneNode(!0)},EO=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);n.push(r),i=s}return n.reverse()},CO=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),TO=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:EO(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),SO=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),IO=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const s=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of s)if(r.getAttribute("name")===n.name){i=r;break}}else if(n.id)try{i=t.querySelector("#"+SO(n.id))}catch{i=t.querySelector(`#${n.id}`)}else n.path&&(i=CO(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},kO=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),AO=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},RO=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=AO(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},NO=()=>document.readyState!=="loading",pd=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!NO())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const y=p[1].trim().split(".")[0];h.add(y)}const g=[],_=[],T={},N=()=>{let y=[],A=[];l&&(y=TO(u),A=kO(u)),u.textContent="";const ge=bO(e,d);u.appendChild(ge),Object.keys(n).forEach(me=>{const X=u.querySelectorAll(`[onclick="${me}"]`),gt=n[me];X.forEach(gi=>{gi.removeAttribute("onclick"),typeof gt=="function"&&gi.addEventListener("click",gt)})}),l&&(IO(u,y),RO(u,A)),g.forEach(me=>me({...d}))},$=y=>{if(!Array.isArray(y)||y.length===0)return;const A={props:{...d},changedKeys:y};_.forEach(ge=>ge(A))};for(const y of Object.keys(t))T[y]=[],Object.defineProperty(u,y,{get(){return d[y]},set(A){d[y]!==A&&(d[y]=A,h.has(y)&&N(),T[y].forEach(ge=>ge(A)),$([y]))},configurable:!0,enumerable:!0});if(u.update=y=>{let A=!1,ge=!1;const me=[];for(const X in y)y[X]!==d[X]&&(d[X]=y[X],h.has(X)&&(ge=!0),T[X]&&T[X].forEach(gt=>gt(y[X])),A=!0,me.push(X));A&&ge&&N(),me.length>0&&$(me)},u.onRender=y=>{typeof y=="function"&&g.push(y)},u.onAnyPropUpdated=y=>{typeof y=="function"&&_.push(y)},u.onPropUpdated=(y,A)=>{typeof A=="function"&&T[y]&&T[y].push(A)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(y=>{typeof y=="function"&&y()}):typeof a=="function"&&a()),g.length=0,_.length=0;for(const y in T)T[y].length=0;u.remove()},N(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(y){o0("[createComponent]: Error in onMount handler of component",y)}return u};function Hy({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:i=0,id:s=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=pd({initialProps:{unreadCount:i},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(s&&o&&typeof s=="string")try{o.id=s}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=i>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function Qf(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),i=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(n||i)&&!window.MSStream,r=/Android/i.test(e),o=s||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:i,isMobileDevice:o}),o}function PO(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",i=null;try{i=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=i.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(i&&!i.hostname)return null;const s=n.toLowerCase();return s!=="http:"&&s!=="https:"?null:e}function OO(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let i=0,s;for(;(s=n.exec(t))!==null;){const r=s[0],o=s.index;o>i&&e.appendChild(document.createTextNode(t.slice(i,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=PO(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}i=o+r.length}return i<t.length&&e.appendChild(document.createTextNode(t.slice(i))),e}const vl={heart:"❤️",thumbsUp:"👍",laugh:"😂"},Yn={doubleTapDelay:300,longPressDelay:500,defaultReaction:"heart",maxReactionsPerMessage:0,enableAnimations:!0};function Zf(t){return vl[t]||vl.heart}function LO(){return{...vl}}class DO{constructor(){this.reactions=new Map}addReaction(e,n=Yn.defaultReaction,i){if(!e)throw new Error("messageId is required");this.reactions.has(e)||this.reactions.set(e,{});const s=this.reactions.get(e);return s[n]||(s[n]=new Set),i?s[n].add(i):s[n].add(`_anon_${Date.now()}_${Math.random()}`),this.getReactions(e)}removeReaction(e,n=Yn.defaultReaction,i){if(!e)throw new Error("messageId is required");const s=this.reactions.get(e);if(!s)return{};const r=s[n];if(!r||r.size===0)return this.getReactions(e);if(i)r.delete(i);else{console.debug("[ReactionManager] removeReaction called without userId - using legacy fallback");const o=r.values().next().value;o&&r.delete(o)}return r.size===0&&delete s[n],Object.keys(s).length===0&&this.reactions.delete(e),this.getReactions(e)}hasUserReaction(e,n,i){const s=this.reactions.get(e);return!s||!s[n]?!1:s[n].has(i)}getUserReactionType(e,n){const i=this.reactions.get(e);if(!i)return null;for(const[s,r]of Object.entries(i))if(r.has(n))return s;return null}getReactions(e){const n=this.reactions.get(e);if(!n)return{};const i={};for(const[s,r]of Object.entries(n))i[s]=r.size;return i}syncFromRemote(e,n){if(!e)throw new Error("messageId is required");if(this.reactions.delete(e),!n||Object.keys(n).length===0)return;const i={};for(const[s,r]of Object.entries(n))Array.isArray(r)&&r.length>0&&(i[s]=new Set(r));Object.keys(i).length>0&&this.reactions.set(e,i)}hasReactions(e){const n=this.reactions.get(e);return!!(n&&Object.keys(n).length>0)}getReactionCount(e,n){const i=this.reactions.get(e);return!i||!i[n]?0:i[n].size}clearReactions(e){this.reactions.delete(e)}clearAll(){this.reactions.clear()}}class MO{constructor(e){this.reactionManager=e,this.doubleTapTimers=new Map,this.longPressTimers=new Map,this.activePicker=null,this.activePickerMessageElement=null,this.pickerJustShown=!1}enableDoubleTap(e,n,i){if(!e||!n){console.warn("[ReactionUI] Invalid parameters for enableDoubleTap");return}const s="ontouchstart"in window,r=s?"touchend":"click",o=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=Date.now(),d=this.doubleTapTimers.get(e);d&&u-d<Yn.doubleTapDelay?(l.preventDefault(),this.handleDoubleTap(e,n,i),this.doubleTapTimers.delete(e)):this.doubleTapTimers.set(e,u)},a=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=setTimeout(()=>{this.showPicker(e,n,i)},Yn.longPressDelay);this.longPressTimers.set(e,u)},c=()=>{const l=this.longPressTimers.get(e);l&&(clearTimeout(l),this.longPressTimers.delete(e),this.activePicker||(e.style.userSelect="",e.style.webkitUserSelect=""))};e.addEventListener(r,o,{passive:!1}),s?(e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",c,{passive:!0}),e.addEventListener("touchmove",c,{passive:!0}),e.addEventListener("touchcancel",c,{passive:!0})):(e.addEventListener("mousedown",a),e.addEventListener("mouseup",c),e.addEventListener("mouseleave",c)),e._reactionCleanup=()=>{e.removeEventListener(r,o),s?(e.removeEventListener("touchstart",a),e.removeEventListener("touchend",c),e.removeEventListener("touchmove",c),e.removeEventListener("touchcancel",c)):(e.removeEventListener("mousedown",a),e.removeEventListener("mouseup",c),e.removeEventListener("mouseleave",c)),this.doubleTapTimers.delete(e),c()}}async handleDoubleTap(e,n,i){const s=Yn.defaultReaction;i&&await i(s,e,n,"doubleTap")}renderReactions(e,n,i){let s=e.querySelector(".message-reactions");if(!s){s=document.createElement("div"),s.className="message-reactions";const o=e.querySelector(".message-text");o?o.appendChild(s):e.appendChild(s)}if(s.innerHTML="",!Object.values(i).some(o=>o>0)){s.style.display="none";return}s.style.display="";for(const[o,a]of Object.entries(i))if(a>0){const c=this.createReactionBadge(o);s.appendChild(c)}}createReactionBadge(e){const n=document.createElement("span");return n.className="reaction-badge",n.dataset.reactionType=e,n.textContent=Zf(e),n}showReactionAnimation(e,n){const i=Zf(n),s=document.createElement("div");s.className="reaction-animation",s.textContent=i;const r=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${r.left+r.width/2}px`,s.style.top=`${r.top+r.height/2}px`,document.body.appendChild(s),setTimeout(()=>{s.remove()},1e3)}showPicker(e,n,i){this.hidePicker();const s=document.createElement("div");s.className="reaction-picker";const r=LO();for(const[a,c]of Object.entries(r)){const l=document.createElement("button");l.type="button",l.className="reaction-picker-btn",l.textContent=c,l.dataset.reactionType=a,l.addEventListener("click",async u=>{u.stopPropagation(),i&&await i(a,e,n,"picker"),this.hidePicker()}),s.appendChild(l)}const o=e.getBoundingClientRect();s.style.position="fixed",s.style.left=`${o.left+o.width/2}px`,s.style.top=`${o.top-8}px`,document.body.appendChild(s),this.activePicker=s,this.activePickerMessageElement=e,this.pickerJustShown=!0,setTimeout(()=>{this.pickerCleanup=rr(s,()=>{if(this.pickerJustShown){this.pickerJustShown=!1;return}this.hidePicker()})},0)}hidePicker(){this.activePicker&&(this.activePicker.remove(),this.activePicker=null,this.activePickerMessageElement&&(this.activePickerMessageElement.style.userSelect="",this.activePickerMessageElement.style.webkitUserSelect="",this.activePickerMessageElement=null)),this.pickerCleanup&&(this.pickerCleanup(),this.pickerCleanup=null),this.pickerJustShown=!1}cleanup(e){e._reactionCleanup&&e._reactionCleanup()}}function xO(){const t=document.createElement("div");t.innerHTML=`
    <div id="messages-box" class="messages-box hidden">
      
      <div id="messages"></div>
      
      <div class="message-attachments">
        <input type="file" id="file-input" style="display: none" />
        <button type="button" id="attach-file-btn" title="Attach file">
          <i class="fa fa-paperclip"></i>
        </button>
      </div>

      <form id="messages-form">
        <textarea id="messages-input" placeholder="Type a message..." rows="1"></textarea>
        <button type="submit">Send</button>
      </form>

    </div>
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),i=t.querySelector("#messages-form"),s=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(s&&s.tagName==="TEXTAREA"&&!r){const a=()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`};s.addEventListener("input",a,{passive:!0}),o=()=>{s.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:i,messagesInput:s,resetInputHeight:o}}const FO=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function UO(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function $O(){let t=!1,e=null,n=null,i=!1,s=new Map;const r=new DO,o=new MO(r),a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=Hy({parent:a,onToggle:()=>Oa(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!c)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const l=c.element,{messagesBoxContainer:u,messagesBox:d,messagesMessages:h,messagesForm:f,messagesInput:p,resetInputHeight:g}=xO();if(!l||!d||!h||!f||!p)return console.error("Messages UI elements not found."),null;const _=document.getElementById("attach-file-btn"),T=document.getElementById("file-input"),N=f.querySelector('button[type="submit"]');v(_),_.addEventListener("click",()=>{T.click()}),T.addEventListener("change",async b=>{const R=b.target.files[0];if(!R||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const O=N.textContent;N.textContent="Sending...";try{await n.sendFile(R,F=>{N.textContent=`${Math.round(F*100)}%`}),R.type.startsWith("video/")&&s.set(R.name,R),ke(`📎 Sent: ${R.name}`,{isSentByMe:!0})}catch(F){console.error("[MessagesUI] File send failed:",F),ke("❌ Failed to send file")}finally{N.textContent=O,T.value=""}});async function $(b){return new Promise(R=>{const O=document.createElement("div");O.className="file-action-overlay",O.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;const F=document.createElement("div");F.className="file-action-prompt",F.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,F.innerHTML=`
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">📹</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">Video Received</h3>
          <p id="file-name-display" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="download-file-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--bg-secondary, #2a2a2a);
              border: 1px solid var(--border-color, #444);
              border-radius: 8px;
              color: var(--text-primary, #fff);
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            ">
              <i class="fa fa-download" style="margin-right: 8px;"></i>Download
            </button>
            <button id="watch-together-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--accent-color, #4a9eff);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">
              <i class="fa fa-play" style="margin-right: 8px;"></i>Watch Together
            </button>
          </div>
        </div>
      `,O.appendChild(F),document.body.appendChild(O);const Q=F.querySelector("#file-name-display");Q.textContent=b;const z=F.querySelector("#download-file-btn"),ce=F.querySelector("#watch-together-btn");z.addEventListener("mouseenter",()=>{z.style.background="var(--bg-hover, #333)"}),z.addEventListener("mouseleave",()=>{z.style.background="var(--bg-secondary, #2a2a2a)"}),ce.addEventListener("mouseenter",()=>{ce.style.opacity="0.9"}),ce.addEventListener("mouseleave",()=>{ce.style.opacity="1"}),z.addEventListener("click",()=>{O.remove(),R("download")}),ce.addEventListener("click",()=>{O.remove(),R("watch")}),O.addEventListener("click",mt=>{mt.target===O&&(O.remove(),R("download"))})})}async function y(b){return new Promise(R=>{const O=document.createElement("div");O.className="watch-request-overlay",O.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;const F=document.createElement("div");F.className="watch-request-prompt",F.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,F.innerHTML=`
        <div style="text-align: center;">
          <div style="font-size: 48px; margin-bottom: 16px;">🎬</div>
          <h3 style="margin: 0 0 8px 0; color: var(--text-primary, #fff);">Watch Together Request</h3>
          <p id="watch-request-filename" style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 14px;">
          </p>
          <p style="margin: 0 0 24px 0; color: var(--text-secondary, #aaa); font-size: 13px;">
            Partner wants to watch this video together
          </p>
          <div style="display: flex; gap: 12px; justify-content: center;">
            <button id="decline-watch-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--bg-secondary, #2a2a2a);
              border: 1px solid var(--border-color, #444);
              border-radius: 8px;
              color: var(--text-primary, #fff);
              cursor: pointer;
              font-size: 14px;
              transition: all 0.2s;
            ">
              Decline
            </button>
            <button id="accept-watch-btn" style="
              flex: 1;
              padding: 12px 24px;
              background: var(--accent-color, #4a9eff);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
              font-size: 14px;
              font-weight: 600;
              transition: all 0.2s;
            ">
              <i class="fa fa-play" style="margin-right: 8px;"></i>Join
            </button>
          </div>
        </div>
      `,O.appendChild(F),document.body.appendChild(O);const Q=F.querySelector("#watch-request-filename");Q.textContent=b;const z=F.querySelector("#decline-watch-btn"),ce=F.querySelector("#accept-watch-btn");z.addEventListener("mouseenter",()=>{z.style.background="var(--bg-hover, #333)"}),z.addEventListener("mouseleave",()=>{z.style.background="var(--bg-secondary, #2a2a2a)"}),ce.addEventListener("mouseenter",()=>{ce.style.opacity="0.9"}),ce.addEventListener("mouseleave",()=>{ce.style.opacity="1"}),z.addEventListener("click",()=>{O.remove(),R(!1)}),ce.addEventListener("click",()=>{O.remove(),R(!0)}),O.addEventListener("click",mt=>{mt.target===O&&(O.remove(),R(!1))})})}window.onFileWatchRequestReceived=async b=>{const R=s.get(b);if(!R){ke(`❌ File not available to watch together: ${b}`),await yl();return}ke(`🎬 Partner wants to watch: ${b}`),await y(b)?(ke("✅ Joining watch together..."),await J0(R)||ke("❌ Failed to load video")):(ke("❌ Declined watch together request"),await yl())};function A(){if(!l||!d||d.classList.contains("hidden"))return;const b=l.getBoundingClientRect(),R=d.getBoundingClientRect(),O=8;let F=b.top-R.height-O;F<8&&(F=b.bottom+O);let Q=b.left+b.width/2-R.width/2;const z=window.innerWidth-R.width-8;Q<8&&(Q=8),Q>z&&(Q=z),d.style.top=`${Math.round(F)}px`,d.style.left=`${Math.round(Q)}px`}function ge(){t||(t=!0,window.addEventListener("resize",A,{passive:!0}),window.addEventListener("scroll",A,{passive:!0}),window.addEventListener("orientationchange",A,{passive:!0}))}function me(){t&&(t=!1,window.removeEventListener("resize",A),window.removeEventListener("scroll",A),window.removeEventListener("orientationchange",A))}let X=null;const gt=new MutationObserver(b=>{b.forEach(R=>{R.type==="attributes"&&R.attributeName==="class"&&(d.classList.contains("hidden")||(c.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});gt.observe(d,{attributes:!0});function gi(){return!d.classList.contains("hidden")}function Pa(){return document.activeElement===p}function Cw(){Pa()||p.focus()}function Tw(){Pa()&&p.blur()}function Oa(){d.classList.toggle("hidden"),gi()?(Qf()||p.focus(),FO?requestAnimationFrame(()=>{UO(d)||(A(),ge())}):(A(),ge()),kd(),X=rr(d,()=>{v(d),me(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",X&&(X(),X=null)},{ignore:()=>[c.element,o.activePicker].filter(Boolean),esc:!0,ignoreInputBlur:Qf()})):(document.activeElement===p&&p.blur(),me(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",X&&(X(),X=null))}function Sw(){U(c.element)}function Id(){v(c.element)}const La=new Map;function ke(b,R={}){const{isSentByMe:O,senderDisplay:F,fileDownload:Q,messageId:z,reactions:ce}=R,mt=F??(O===!0?"Me":""),$e=document.createElement("p");O===!0?$e.classList.add("message-local"):O===!1&&$e.classList.add("message-remote");const mi=document.createElement("span");mi.className="sender-avatar"+(O===!0?" sender-avatar--me":""),mi.textContent=mt,mi.setAttribute("aria-hidden","true");const Xt=document.createElement("span");if(Xt.className="message-text",!F&&typeof O>"u"&&$e.classList.add("message-system"),Q){const{fileName:Ce,url:Pn}=Q,Te=b.split(Ce)[0];Te&&Xt.appendChild(document.createTextNode(Te));const _t=document.createElement("a");_t.textContent=Ce,_t.href=Pn,_t.download=Ce,_t.style.cursor="pointer",_t.style.textDecoration="underline",_t.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(Pn),100)}),Xt.appendChild(_t)}else{const Ce=OO(b);Xt.appendChild(Ce)}if(Q&&$e.classList.add("message-system"),$e.appendChild(mi),$e.appendChild(Xt),typeof O<"u"&&!Q&&z){if($e.dataset.messageId=z,La.set(z,$e),ce&&Object.keys(ce).length>0){r.syncFromRemote(z,ce);const Ce=r.getReactions(z);o.renderReactions($e,z,Ce)}o.enableDoubleTap($e,z,async(Ce,Pn,Te,_t)=>{if(!e){console.warn("[MessagesUI] No current session for reaction");return}const Qt=L();if(!Qt){console.warn("[MessagesUI] No userId available for reaction");return}try{if(_t==="doubleTap"){const yt=r.getUserReactionType(Te,Qt);let On;yt?(await e.removeReaction(Te,yt),On=r.removeReaction(Te,yt,Qt)):(await e.addReaction(Te,Ce),On=r.addReaction(Te,Ce,Qt),Yn.enableAnimations&&o.showReactionAnimation(Pn,Ce)),o.renderReactions(Pn,Te,On)}else if(_t==="picker"){const yt=r.getUserReactionType(Te,Qt);let On;yt===Ce?(await e.removeReaction(Te,Ce),On=r.removeReaction(Te,Ce,Qt)):(yt&&(await e.removeReaction(Te,yt),r.removeReaction(Te,yt,Qt)),await e.addReaction(Te,Ce),On=r.addReaction(Te,Ce,Qt),Yn.enableAnimations&&o.showReactionAnimation(Pn,Ce)),o.renderReactions(Pn,Te,On)}}catch(yt){console.warn("[MessagesUI] Failed to handle reaction:",yt)}})}h.appendChild($e),kd()}let Nn=null;function kd(){h&&(Nn!==null&&cancelAnimationFrame(Nn),Nn=requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight,Nn=null}))}function Iw(b,{isUnread:R=!0,senderDisplay:O="U",messageId:F,reactions:Q}={}){if(ke(b,{isSentByMe:!1,senderDisplay:O,messageId:F,reactions:Q}),No(d)&&R){const z=c.element.unreadCount||0;c.setUnreadCount(z+1)}}function Ad(){const b=p.value.trim();b&&(e?(e.send(b),p.value="",g&&g()):console.warn("[MessagesUI] No active session to send message"))}f.addEventListener("submit",b=>{b.preventDefault(),Ad()}),p.addEventListener("keydown",b=>{b.key==="Enter"&&!b.shiftKey&&(b.preventDefault(),Ad())});const kw=()=>{const b=document.activeElement;return b&&(b.tagName==="INPUT"||b.tagName==="TEXTAREA"||b.isContentEditable)},Rd=b=>{(b.key==="m"||b.key==="M")&&!gi()&&!kw()&&(b.preventDefault(),Oa())};document.addEventListener("keydown",Rd);function Da(){Nn!==null&&(cancelAnimationFrame(Nn),Nn=null),h.innerHTML="",h.scrollTop=0}function Aw(b){e!==null&&e!==b&&Da(),e=b}function Rw(){return e}function Nw(b){n=b,n?(U(_),n.onFileReceived=async R=>{const O=URL.createObjectURL(R);if(R.type.startsWith("video/"))if(await $(R.name)==="watch"){if(ke(`📹 Received video: ${R.name}`,{isSentByMe:!1}),ke("🎬 Requesting partner to join watch together..."),!await sr(R)){ke("❌ Failed to load video");return}const z=await Y0(R.name);ke(z?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const Q=document.createElement("a");Q.href=O,Q.download=R.name,Q.click(),setTimeout(()=>URL.revokeObjectURL(O),1e3),ke(`📎 Downloaded: ${R.name}`)}else ke(`📎 Received: ${R.name}`,{isSentByMe:!1,fileDownload:{fileName:R.name,url:O}});if(No(d)){const F=c.element.unreadCount||0;c.setUnreadCount(F+1)}i&&(N.textContent="Send",i=!1)},n.onReceiveProgress=R=>{i=!0,N.textContent=`${Math.round(R*100)}%`}):v(_)}function Pw(){Da(),e=null,n=null,i=!1,Id(),v(d),c.clearBadge(),p.value="",g&&g(),N&&(N.textContent="Send"),v(_),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",me(),La.clear(),r.clearAll()}function Ow(b,R){const O=La.get(b);if(!O)return;const F={};for(const[ce,mt]of Object.entries(R||{}))F[ce]=mt.length;const Q=r.getReactions(b);((ce,mt)=>{const $e=Object.keys(ce),mi=Object.keys(mt);return $e.length===mi.length&&$e.every(Xt=>ce[Xt]===mt[Xt])})(F,Q)||(console.debug(`[MessagesUI] Syncing reaction state for ${b}:`,{local:Q,remote:F}),r.syncFromRemote(b,R),o.renderReactions(O,b,F))}function Lw(){if(c&&c.cleanup(),me(),typeof X=="function")try{X()}catch(b){console.error("Error removing messages box outside click handler:",b)}gt.disconnect(),document.removeEventListener("keydown",Rd),u&&u.parentNode&&u.parentNode.removeChild(u)}return{appendChatMessage:ke,receiveMessage:Iw,updateMessageReactions:Ow,isMessagesUIOpen:gi,toggleMessages:Oa,showMessagesToggle:Sw,hideMessagesToggle:Id,isMessageInputFocused:Pa,focusMessageInput:Cw,unfocusMessageInput:Tw,setSession:Aw,getCurrentSession:Rw,clearMessages:Da,setFileTransfer:Nw,reset:Pw,cleanup:Lw}}const Ae=$O();class BO{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(s){console.warn("CallController listener error",s)}}}class HO{constructor(){this.emitter=new BO,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=E(C,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(!o||i)return;const a=de();if(o.by!==a){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(c){console.warn("Failed to clear remote video after cancellation",c)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(c){console.warn("Failed to trigger CallController cleanup",c)}}};Ii(n,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:s,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const s=E(C,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await he(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>cO);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};Ii(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=E(C,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await he(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>M0);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await oe.leaveRoom(de(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Ii(n,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=de(),i=s=>{s.key!==n&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};oe.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=de(),i=s=>{s.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};oe.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&Ct(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{wr(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await lO(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:i}=await he(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>P0);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await uO({...e,onMessagesUIReady:s=>{this.messagesUI=s}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=s=>{this.dataChannel=s.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const i=new yO(e);mn.setFileTransport(i),Ae.setFileTransfer(i.fileTransfer),V("[CallController] File transport initialized")}catch(i){console.error("[CallController] Failed to setup file transport:",i)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await oe.cancelCall(this.roomId,de(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId,s=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await oe.leaveRoom(de(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await he(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>$0);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await he(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>CM);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e});try{mn.clearFileTransport(),Ae.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:s,wasConnected:r,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const be=new HO,bl={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function Vy(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?bl.withVoiceIsolationIfSupported:bl.default}const VO=()=>bl.default,jO={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},WO=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function gd(t){const e=WO()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",s=jO[i][e];return{facingMode:t,...s}}function qO(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function zO(){return qO()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function GO(){const t=await zO();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function KO({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:gd(s),audio:Vy()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let hc=!1,Dn=null,Mn=null;function YO({getLocalStream:t,getFacingMode:e}){return Dn&&Mn&&Dn.removeEventListener("change",Mn),Dn=window.matchMedia("(orientation: portrait)"),Mn=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";JO({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},Dn.addEventListener("change",Mn),()=>{Dn&&Mn&&Dn.removeEventListener("change",Mn),Dn=null,Mn=null}}async function JO({localStream:t,currentFacingMode:e}){if(!(hc||!t?.getVideoTracks()[0])){hc=!0;try{const n=t.getVideoTracks()[0],i=gd(e);V("Applying constraints:",i),await n.applyConstraints(i),V("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{hc=!1}}}let El=[];function XO(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function QO({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,XO(!f.enabled,r))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=YO({getLocalStream:t,getFacingMode:gl});El.push(d),a&&(a.onclick=async()=>{const h=await KO({localStream:t(),localVideo:e(),currentFacingMode:gl(),peerConnection:i()||null});h?(wy(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof s=="function"&&s(h.newStream)):console.error("Camera switch failed.")},(async()=>await GO()?U(a):v(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function ZO(){El.forEach(t=>t()),El=[]}const eL=async()=>{if(Ey())return console.debug("Reusing existing local MediaStream."),Ia();const t=gd("user"),e=Vy();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Po(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=VO(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return Po(s),s}throw n}};async function tL(t){const e=await eL(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function nL(t,e,n){return t.ontrack=i=>{V(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const s=Sa()?ad():null;let r;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?r=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),s?(s.addTrack(i.track),r=s):r=new MediaStream([i.track])),vy(r),e.srcObject=r,s!==r||V(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let Kr=null,bt=null;async function ep(t,e="User"){const n=L(),i=Wt();if(!n||!i)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const s=ko(n,t),r=E(C,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:i.displayName||"Anonymous",fromEmail:i.email||"",fromPhotoURL:i.photoURL||null,roomId:s,timestamp:Date.now(),status:"pending"};await Z(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function iL(t){const e=L();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};Cl();const n=E(C,`users/${e}/incomingInvites`);return Kr=Ki(n,i=>{const s=i.key,r=i.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(s,r))}),console.log("[INVITATIONS] Listening for incoming invites"),Cl}async function sL(t,e){const n=L(),i=Wt();if(!n||!i)throw new Error("Must be logged in to accept invites");const s=E(C,`users/${n}/contacts/${t}`);await Z(s,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=E(C,`users/${t}/acceptedInvites/${n}`);await Z(r,{acceptedByUserId:n,acceptedByName:i.displayName||"User",acceptedByEmail:i.email||"",acceptedByPhotoURL:i.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=E(C,`users/${n}/incomingInvites/${t}`);await Ke(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function rL(t){const e=L();if(!e)throw new Error("Must be logged in to decline invites");const n=E(C,`users/${e}/incomingInvites/${t}`);await Ke(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function oL(t){const e=L();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};bt&&(bt(),bt=null);const n=E(C,`users/${e}/acceptedInvites`);return bt=Ki(n,async i=>{const s=i.key,r=i.val();if(r)try{const o=E(C,`users/${e}/contacts/${s}`);await Z(o,{contactId:s,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=E(C,`users/${e}/acceptedInvites/${s}`);await Ke(a),t&&t(s,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{bt&&(bt(),bt=null)}}function Cl(){Kr&&(Kr(),Kr=null),bt&&(bt(),bt=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}function aL(){v(ue),v(ve),v(xe),v(Qe)}function cL(t){t.on("memberJoined",Oy),t.on("cleanup",()=>{Kn(),Ly()})}let xi=null;function ka(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),xi===a&&(xi=null),n(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),xi=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function lL(){if(typeof xi=="function"){try{xi(!1)}catch{}return xi=null,!0}return!1}const uL=Object.freeze(Object.defineProperty({__proto__:null,default:ka,dismissActiveConfirmDialog:lL},Symbol.toStringTag,{value:"Module"})),jy="@firebase/installations",md="0.6.19";/**
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
 */const Wy=1e4,qy=`w:${md}`,zy="FIS_v2",dL="https://firebaseinstallations.googleapis.com/v1",hL=3600*1e3,fL="installations",pL="Installations";/**
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
 */const gL={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ai=new kn(fL,pL,gL);function Gy(t){return t instanceof Yt&&t.code.includes("request-failed")}/**
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
 */function Ky({projectId:t}){return`${dL}/projects/${t}/installations`}function Yy(t){return{token:t.token,requestStatus:2,expiresIn:_L(t.expiresIn),creationTime:Date.now()}}async function Jy(t,e){const i=(await e.json()).error;return ai.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Xy({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function mL(t,{refreshToken:e}){const n=Xy(t);return n.append("Authorization",yL(e)),n}async function Qy(t){const e=await t();return e.status>=500&&e.status<600?t():e}function _L(t){return Number(t.replace("s","000"))}function yL(t){return`${zy} ${t}`}/**
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
 */async function wL({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=Ky(t),s=Xy(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:zy,appId:t.appId,sdkVersion:qy},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Qy(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Yy(l.authToken)}}else throw await Jy("Create Installation",c)}/**
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
 */function Zy(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function vL(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const bL=/^[cdef][\w-]{21}$/,Tl="";function EL(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=CL(t);return bL.test(n)?n:Tl}catch{return Tl}}function CL(t){return vL(t).substr(0,22)}/**
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
 */function Aa(t){return`${t.appName}!${t.appId}`}/**
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
 */const ew=new Map;function tw(t,e){const n=Aa(t);nw(n,e),TL(n,e)}function nw(t,e){const n=ew.get(t);if(n)for(const i of n)i(e)}function TL(t,e){const n=SL();n&&n.postMessage({key:t,fid:e}),IL()}let Vn=null;function SL(){return!Vn&&"BroadcastChannel"in self&&(Vn=new BroadcastChannel("[Firebase] FID Change"),Vn.onmessage=t=>{nw(t.data.key,t.data.fid)}),Vn}function IL(){ew.size===0&&Vn&&(Vn.close(),Vn=null)}/**
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
 */const kL="firebase-installations-database",AL=1,ci="firebase-installations-store";let fc=null;function _d(){return fc||(fc=Xo(kL,AL,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ci)}}})),fc}async function Mo(t,e){const n=Aa(t),s=(await _d()).transaction(ci,"readwrite"),r=s.objectStore(ci),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&tw(t,e.fid),e}async function iw(t){const e=Aa(t),i=(await _d()).transaction(ci,"readwrite");await i.objectStore(ci).delete(e),await i.done}async function Ra(t,e){const n=Aa(t),s=(await _d()).transaction(ci,"readwrite"),r=s.objectStore(ci),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&tw(t,a.fid),a}/**
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
 */async function yd(t){let e;const n=await Ra(t.appConfig,i=>{const s=RL(i),r=NL(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===Tl?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function RL(t){const e=t||{fid:EL(),registrationStatus:0};return sw(e)}function NL(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ai.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=PL(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:OL(t)}:{installationEntry:e}}async function PL(t,e){try{const n=await wL(t,e);return Mo(t.appConfig,n)}catch(n){throw Gy(n)&&n.customData.serverCode===409?await iw(t.appConfig):await Mo(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function OL(t){let e=await tp(t.appConfig);for(;e.registrationStatus===1;)await Zy(100),e=await tp(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await yd(t);return i||n}return e}function tp(t){return Ra(t,e=>{if(!e)throw ai.create("installation-not-found");return sw(e)})}function sw(t){return LL(t)?{fid:t.fid,registrationStatus:0}:t}function LL(t){return t.registrationStatus===1&&t.registrationTime+Wy<Date.now()}/**
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
 */async function DL({appConfig:t,heartbeatServiceProvider:e},n){const i=ML(t,n),s=mL(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:qy,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Qy(()=>fetch(i,a));if(c.ok){const l=await c.json();return Yy(l)}else throw await Jy("Generate Auth Token",c)}function ML(t,{fid:e}){return`${Ky(t)}/${e}/authTokens:generate`}/**
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
 */async function wd(t,e=!1){let n;const i=await Ra(t.appConfig,r=>{if(!rw(r))throw ai.create("not-registered");const o=r.authToken;if(!e&&UL(o))return r;if(o.requestStatus===1)return n=xL(t,e),r;{if(!navigator.onLine)throw ai.create("app-offline");const a=BL(r);return n=FL(t,a),a}});return n?await n:i.authToken}async function xL(t,e){let n=await np(t.appConfig);for(;n.authToken.requestStatus===1;)await Zy(100),n=await np(t.appConfig);const i=n.authToken;return i.requestStatus===0?wd(t,e):i}function np(t){return Ra(t,e=>{if(!rw(e))throw ai.create("not-registered");const n=e.authToken;return HL(n)?{...e,authToken:{requestStatus:0}}:e})}async function FL(t,e){try{const n=await DL(t,e),i={...e,authToken:n};return await Mo(t.appConfig,i),n}catch(n){if(Gy(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await iw(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await Mo(t.appConfig,i)}throw n}}function rw(t){return t!==void 0&&t.registrationStatus===2}function UL(t){return t.requestStatus===2&&!$L(t)}function $L(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+hL}function BL(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function HL(t){return t.requestStatus===1&&t.requestTime+Wy<Date.now()}/**
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
 */async function VL(t){const e=t,{installationEntry:n,registrationPromise:i}=await yd(e);return i?i.catch(console.error):wd(e).catch(console.error),n.fid}/**
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
 */async function jL(t,e=!1){const n=t;return await WL(n),(await wd(n,e)).token}async function WL(t){const{registrationPromise:e}=await yd(t);e&&await e}/**
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
 */function qL(t){if(!t||!t.options)throw pc("App Configuration");if(!t.name)throw pc("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw pc(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function pc(t){return ai.create("missing-app-config-values",{valueName:t})}/**
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
 */const ow="installations",zL="installations-internal",GL=t=>{const e=t.getProvider("app").getImmediate(),n=qL(e),i=An(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},KL=t=>{const e=t.getProvider("app").getImmediate(),n=An(e,ow).getImmediate();return{getId:()=>VL(n),getToken:s=>jL(n,s)}};function YL(){et(new Ge(ow,GL,"PUBLIC")),et(new Ge(zL,KL,"PRIVATE"))}YL();ze(jy,md);ze(jy,md,"esm2020");/**
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
 */const JL="/firebase-messaging-sw.js",XL="/firebase-cloud-messaging-push-scope",aw="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",QL="https://fcmregistrations.googleapis.com/v1",cw="google.c.a.c_id",ZL="google.c.a.c_l",eD="google.c.a.ts",tD="google.c.a.e",ip=1e4;var sp;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(sp||(sp={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var or;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(or||(or={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function nD(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
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
 */const gc="fcm_token_details_db",iD=5,rp="fcm_token_object_Store";async function sD(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(gc))return null;let e=null;return(await Xo(gc,iD,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(rp))return;const a=o.objectStore(rp),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:Rt(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Rt(l.auth),p256dh:Rt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Rt(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:Rt(l.auth),p256dh:Rt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:Rt(l.vapidKey)}}}}}})).close(),await za(gc),await za("fcm_vapid_details_db"),await za("undefined"),rD(e)?e:null}function rD(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const oD="firebase-messaging-database",aD=1,li="firebase-messaging-store";let mc=null;function vd(){return mc||(mc=Xo(oD,aD,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(li)}}})),mc}async function lw(t){const e=Ed(t),i=await(await vd()).transaction(li).objectStore(li).get(e);if(i)return i;{const s=await sD(t.appConfig.senderId);if(s)return await bd(t,s),s}}async function bd(t,e){const n=Ed(t),s=(await vd()).transaction(li,"readwrite");return await s.objectStore(li).put(e,n),await s.done,e}async function cD(t){const e=Ed(t),i=(await vd()).transaction(li,"readwrite");await i.objectStore(li).delete(e),await i.done}function Ed({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Ie=new kn("messaging","Messaging",lD);/**
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
 */async function uD(t,e){const n=await Td(t),i=dw(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(Cd(t.appConfig),s)).json()}catch(o){throw Ie.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Ie.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw Ie.create("token-subscribe-no-token");return r.token}async function dD(t,e){const n=await Td(t),i=dw(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${Cd(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw Ie.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Ie.create("token-update-failed",{errorInfo:o})}if(!r.token)throw Ie.create("token-update-no-token");return r.token}async function uw(t,e){const i={method:"DELETE",headers:await Td(t)};try{const r=await(await fetch(`${Cd(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw Ie.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw Ie.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function Cd({projectId:t}){return`${QL}/projects/${t}/registrations`}async function Td({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function dw({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==aw&&(s.web.applicationPubKey=i),s}/**
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
 */const hD=10080*60*1e3;async function fD(t){const e=await mD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:Rt(e.getKey("auth")),p256dh:Rt(e.getKey("p256dh"))},i=await lw(t.firebaseDependencies);if(i){if(_D(i.subscriptionOptions,n))return Date.now()>=i.createTime+hD?gD(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await uw(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return op(t.firebaseDependencies,n)}else return op(t.firebaseDependencies,n)}async function pD(t){const e=await lw(t.firebaseDependencies);e&&(await uw(t.firebaseDependencies,e.token),await cD(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function gD(t,e){try{const n=await dD(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await bd(t.firebaseDependencies,i),n}catch(n){throw n}}async function op(t,e){const i={token:await uD(t,e),createTime:Date.now(),subscriptionOptions:e};return await bd(t,i),i.token}async function mD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:nD(e)})}function _D(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
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
 */function ap(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return yD(e,t),wD(e,t),vD(e,t),e}function yD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function wD(t,e){e.data&&(t.data=e.data)}function vD(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
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
 */function bD(t){return typeof t=="object"&&!!t&&cw in t}/**
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
 */function ED(t){if(!t||!t.options)throw _c("App Configuration Object");if(!t.name)throw _c("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw _c(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function _c(t){return Ie.create("missing-app-config-values",{valueName:t})}/**
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
 */class CD{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=ED(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
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
 */async function hw(t){try{t.swRegistration=await navigator.serviceWorker.register(JL,{scope:XL}),t.swRegistration.update().catch(()=>{}),await TD(t.swRegistration)}catch(e){throw Ie.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function TD(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${ip} ms`)),ip),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
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
 */async function SD(t,e){if(!e&&!t.swRegistration&&await hw(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Ie.create("invalid-sw-registration");t.swRegistration=e}}/**
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
 */async function ID(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=aw)}/**
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
 */async function fw(t,e){if(!navigator)throw Ie.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Ie.create("permission-blocked");return await ID(t,e?.vapidKey),await SD(t,e?.serviceWorkerRegistration),fD(t)}/**
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
 */async function kD(t,e,n){const i=AD(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[cw],message_name:n[ZL],message_time:n[eD],message_device_time:Math.floor(Date.now()/1e3)})}function AD(t){switch(t){case or.NOTIFICATION_CLICKED:return"notification_open";case or.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function RD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===or.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(ap(n)):t.onMessageHandler.next(ap(n)));const i=n.data;bD(i)&&i[tD]==="1"&&await kD(t,n.messageType,i)}const cp="@firebase/messaging",lp="0.12.23";/**
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
 */const ND=t=>{const e=new CD(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>RD(e,n)),e},PD=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>fw(e,i)}};function OD(){et(new Ge("messaging",ND,"PUBLIC")),et(new Ge("messaging-internal",PD,"PRIVATE")),ze(cp,lp),ze(cp,lp,"esm2020")}/**
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
 */async function LD(){try{await Tg()}catch{return!1}return typeof window<"u"&&Ko()&&HT()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */async function DD(t){if(!navigator)throw Ie.create("only-available-in-window");return t.swRegistration||await hw(t),pD(t)}/**
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
 */function MD(t,e){if(!navigator)throw Ie.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xD(t=Qo()){return LD().then(e=>{if(!e)throw Ie.create("unsupported-browser")},e=>{throw Ie.create("indexed-db-unsupported")}),An(se(t),"messaging").getImmediate()}async function FD(t,e){return t=se(t),fw(t,e)}function up(t){return t=se(t),DD(t)}function UD(t,e){return t=se(t),MD(t,e)}OD();class pw{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=sN,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return!("serviceWorker"in navigator)||!("Notification"in window)?(console.warn("[FCMTransport] FCM not supported in this environment"),!1):this.vapidKey?(this.messaging=xD(ga),UD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in message callback:",i)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&(console.log("[FCMTransport] Not initialized, initializing now..."),!await this.initialize()))return console.error("[FCMTransport] Initialization failed, cannot get token"),null;try{console.log("[FCMTransport] Requesting FCM token..."),console.log("[FCMTransport] VAPID key present:",!!this.vapidKey),console.log("[FCMTransport] Messaging instance:",!!this.messaging);const e=await FD(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained successfully"),console.log("[FCMTransport] Token (truncated):",e.substring(0,20)+"..."),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),console.warn("[FCMTransport] This usually means:"),console.warn("[FCMTransport]   1. Service worker is not registered"),console.warn("[FCMTransport]   2. Notification permission not granted"),console.warn("[FCMTransport]   3. VAPID key is incorrect"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),console.error("[FCMTransport] Error name:",e.name),console.error("[FCMTransport] Error code:",e.code),console.error("[FCMTransport] Error message:",e.message),e.code==="messaging/unsupported-browser"?console.error("[FCMTransport] Browser does not support FCM"):e.code==="messaging/permission-blocked"?console.error("[FCMTransport] Notification permission is blocked"):e.code==="messaging/failed-service-worker-registration"&&(console.error("[FCMTransport] Service worker registration failed"),console.error("[FCMTransport] Make sure service worker is registered before calling getToken()")),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await up(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in token refresh callback:",i)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await up(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=L();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const i=E(C,`users/${n}/fcmTokens/${this.getTokenId(e)}`),s={token:e,deviceInfo:{platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await Z(i,s),console.log("[FCMTransport] Token stored in RTDB")}catch(i){console.error("[FCMTransport] Failed to store token in RTDB:",i)}}async removeUserToken(e){const n=L();if(n)try{const i=E(C,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await Ke(i),console.log("[FCMTransport] Token removed from RTDB")}catch(i){console.error("[FCMTransport] Failed to remove token from RTDB:",i)}}async getUserTokens(e){try{const n=E(C,`users/${e}/fcmTokens`),i=await Pe(n);if(i.exists()){const s=i.val();return Object.values(s)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMissedCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"missed_call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMessageNotification(e,n){const{senderId:i,senderName:s,messageText:r}=n,o=typeof r=="string"?r:String(r||""),a=o.length>50?o.substring(0,47)+"...":o,c={type:"message",senderId:i,senderName:s,messagePreview:a,timestamp:Date.now().toString()},l="/HangVidU/",u={notification:{title:`New message from ${s}`,body:a,icon:`${l}icons/play-arrows-v1/icon-192.png`,badge:`${l}icons/play-arrows-v1/icon-192.png`},data:c};return this.sendNotification(e,u)}async sendNotification(e,n){try{{let o=null;try{const{getLoggedInUserToken:l}=await he(async()=>{const{getLoggedInUserToken:u}=await Promise.resolve().then(()=>Yu);return{getLoggedInUserToken:u}},void 0);o=await l()}catch(l){console.warn("[FCMTransport] Failed to get auth token:",l)}const a={"Content-Type":"application/json"};o&&(a.Authorization=`Bearer ${o}`);const c=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:a,body:JSON.stringify({targetUserId:e,callData:n.data})});if(c.ok){const l=await c.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,l),!0}else return console.error("[FCMTransport] FCM function failed:",c.status),!1}const i=E(C,`notifications/${e}`),s=Js(i).key,r={id:s,payload:n,createdAt:Date.now(),delivered:!1};return await Z(E(C,`notifications/${e}/${s}`),r),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(i){return console.error("[FCMTransport] Failed to send notification:",i),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window}}const $D=Object.freeze(Object.defineProperty({__proto__:null,FCMTransport:pw},Symbol.toStringTag,{value:"Module"}));class BD{constructor(e=null,n={}){this.transport=e||new pw,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[NotificationController] Initialized successfully"),!0):(console.warn("[NotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[NotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:i="Get notified of incoming calls and messages even when the app is closed.",onGranted:s=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[NotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(this.permissionState=a,a==="granted")return await this.enable(),s?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[NotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),s?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enable(){if(this.permissionState!=="granted")return console.warn("[NotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[NotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(i){console.error("[NotificationController] Error in permission callback:",i)}}),!0):(console.warn("[NotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[NotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[NotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[NotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[NotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled"),!1;try{const i=await this.transport.sendCallNotification(e,n);if(i){const s=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(s,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Call notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send call notification:",i),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled (missed call masked)"),!1;try{const i=await this.transport.sendMissedCallNotification(e,n);return i&&console.log(`[NotificationController] Missed call notification sent to ${e}`),i}catch(i){return console.error("[NotificationController] Failed to send missed call notification:",i),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[NotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending message notification (app in foreground)"),!1;try{const i=await this.transport.sendMessageNotification(e,n);if(i){const s=`message_${e}_${Date.now()}`;this.activeNotifications.set(s,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Message notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send message notification:",i),!1}}async dismissCallNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="call"&&s.roomId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="message"&&s.senderId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,i=[];for(const[s,r]of this.activeNotifications)e-r.timestamp>n&&i.push(s);i.forEach(s=>this.activeNotifications.delete(s)),i.length>0&&console.log(`[NotificationController] Cleaned up ${i.length} old notifications`)}handleForegroundMessage(e){console.log("[NotificationController] Foreground message received:",e),this.notificationCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[NotificationController] Error in notification callback:",i)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){return"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[NotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData&&navigator.userAgentData.brands){const n=navigator.userAgentData.brands.map(i=>i.brand);if(n.some(i=>i.includes("Microsoft Edge")))return"Edge";if(n.some(i=>i.includes("Google Chrome")))return"Chrome";if(n.some(i=>i.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:i,callerName:s}=e;let r=s||i||"Unknown caller";if(!s)try{const{resolveCallerName:o}=await he(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>Sl);return{resolveCallerName:a}},void 0);r=await o(n,i)}catch(o){console.warn("[NotificationController] Failed to resolve caller name:",o)}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:i,messageText:s}=e;let r=i,o=s;try{const{getContacts:a}=await he(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>Sl);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||i)}catch(a){console.warn("[NotificationController] Failed to resolve sender name:",a),r=i||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const Ne=new BD,yc=new Map,wc=new Map,Ci=new Map,dp=14;async function xo(t,e,n){const i=L();if(i){const s=E(C,`users/${i}/contacts/${t}`);await Z(s,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function Gt(){const t=L();if(t)try{const e=E(C,`users/${t}/contacts`),n=await Pe(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function HD(t){if(!t)return null;try{const e=await Gt();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function gw(t,e){if(!t)return e||"Unknown";try{const n=await Gt();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function mw(t,e,n){if(!t||!e)return;const s=(await Gt())?.[t];if(s){s.roomId!==e&&(await xo(t,s.contactName,e),await Kt(n)),ui(e);return}if(!await ka("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await xo(t,o,e),ui(e),await Kt(n)}async function Kt(t){if(!t)return;const e=await Gt();let n=Object.keys(e);if(L()){const s=await Promise.all(n.map(async r=>(await Pe(E(C,`users/${r}/presence`))).exists()));n=n.filter((r,o)=>s[o])}let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",v(i);return}U(i),i.innerHTML=`
    <h3>Contacts</h3>
    <div class="contacts-list">
      ${n.map(s=>{const r=e[s];return`
            <div class="contact-entry">
              <div class="contact-msg-toggle-container" data-contact-id="${s}"></div>
              <span
                class="contact-name"
                data-room-id="${r.roomId||""}"
                data-contact-name="${r.contactName}"
                data-contact-id="${s}"
                title="Call ${r.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${s}"></span>
                <i class="fa fa-phone"></i>
                ${r.contactName&&r.contactName.length>dp?r.contactName.slice(0,dp-2)+"..":r.contactName}
              </span>
              <button
                class="contact-delete-btn"
                data-contact-id="${s}"
                title="Delete contact"
              >
                ✕
              </button>
              <button
                class="contact-edit-btn"
                data-contact-id="${s}"
                title="Edit contact name"
              >
                ✏️
              </button>
            </div>
          `}).join("")}
    </div>
  `,VD(i,t),jD(n),await WD(i,n,e)}function VD(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const s=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");s&&Na(s,r)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let i=n.getAttribute("data-room-id");const s=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");if(!i&&r){const o=L();if(o)try{i=ko(o,r),console.log("[CONTACTS] Generated deterministic room ID:",i),await xo(r,s,i),n.setAttribute("data-room-id",i)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}if(i&&(ui(i),await Ir(i,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1)))){await hy(i,s);try{const a=Wt(),c=a?.displayName||a?.email||L();await Ne.sendCallNotification(r,{roomId:i,callerId:L(),callerName:c}),console.log("[CONTACTS] Call notification sent to:",s)}catch(a){console.warn("[CONTACTS] Failed to send call notification:",a)}}}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await qD(i),await Kt(e))}}),t.querySelectorAll(".contact-edit-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");if(!i)return;const r=(await Gt())[i];if(!r)return;const o=prompt("Enter new name for this contact:",r.contactName);o&&o.trim()&&o.trim()!==r.contactName&&(await xo(i,o.trim(),r.roomId),await Kt(e))}})}function Na(t,e,n=!1){if(!L()){alert("Please sign in to send messages");return}if(mn.getSession(t)){Ae.showMessagesToggle(),n&&!Ae.isMessagesUIOpen()&&Ae.toggleMessages();return}mn.getAllSessions().forEach(a=>{a.close()}),Ae.clearMessages(),Ae.setSession(null);const r=mn.openSession(t,{onMessage:(a,c,l)=>{if(c._reactionUpdate){const d={};if(c.reactions)for(const[h,f]of Object.entries(c.reactions))d[h]=Object.keys(f);Ae.updateMessageReactions(c.messageId,d);return}const u={};if(c.reactions)for(const[d,h]of Object.entries(c.reactions))u[d]=Object.keys(h);if(l)Ae.appendChatMessage(a,{isSentByMe:!0,messageId:c.messageId,reactions:u});else{const d=!c.read;Ae.receiveMessage(a,{isUnread:d,messageId:c.messageId,reactions:u})}}});r.contactName=e,r.toggle=Ci.get(t),Ae.setSession(r),Ae.showMessagesToggle(),n&&!Ae.isMessagesUIOpen()&&Ae.toggleMessages(),r.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=Ci.get(t);o&&o.clearBadge()}function jD(t){yc.forEach(({ref:e,callback:n})=>{Ct(e,"value",n)}),yc.clear(),L()&&t.forEach(e=>{const n=E(C,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const s=r=>{const a=r.val()?.state==="online";i.style.backgroundColor=a?"#00d26a":"#444",i.title=a?"Online":"Offline"};ku(n,s),yc.set(e,{ref:n,callback:s})})}let ws=!1,wi=null;async function WD(t,e,n){if(!L())return;const i=10;let s=0;for(;ws&&s<i;)await new Promise(r=>setTimeout(r,100)),s++;if(ws){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}ws=!0,wi&&clearTimeout(wi),wi=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),ws=!1},5e3);try{Ci.forEach(o=>{o.cleanup()}),Ci.clear(),wc.forEach(o=>{o()}),wc.clear();const r=L();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=Hy({parent:c,onToggle:()=>Na(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}Ci.set(o,l);const u=mn.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});wc.set(o,u)}Promise.all(e.map(o=>mn.getUnreadCount(o).then(a=>{const c=Ci.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{wi&&(clearTimeout(wi),wi=null),ws=!1}}async function qD(t){const e=L();if(e){try{await Ke(E(C,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const Sl=Object.freeze(Object.defineProperty({__proto__:null,getContactByRoomId:HD,getContacts:Gt,openContactMessages:Na,renderContactsList:Kt,resolveCallerName:gw,saveContact:mw},Symbol.toStringTag,{value:"Module"}));let vc=null,an=null,ee=null,J=null,hp=!1,xr=!1,Tt=[],Il="",Re=-1,kl=[];const zD="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",GD="https://www.googleapis.com/youtube/v3";async function KD(){if(hp||xr)return!1;xr=!0;const{initializeYouTubeElements:t}=await he(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>F0);return{initializeYouTubeElements:o}},void 0),e=await t();if(vc=e.searchContainer,an=e.searchBtn,ee=e.searchQuery,J=e.searchResults,!vc||!an||!ee||!J)return console.error("YouTube search elements not found in DOM"),xr=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(J?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Re=o??-1};an.onclick=async()=>{const o=ee.value.trim();if(No(ee)){U(ee),ee.focus();return}if(!o){Yr(),v(ee);return}if(gp()&&o===Il)Al(Tt);else if(!n(o))await fp(o);else{await sr({url:o,title:o,channel:"",thumbnail:"",id:o}),v(J),ee.value="",v(ee),Re=-1;return}},vc.addEventListener("keydown",async o=>{const a=J.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Re+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=Re-1;c<0&&(c=Re===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&Re>=0){a[Re].click(),v(ee),v(J),Re=-1;return}const c=ee.value.trim();if(c)if(gp()&&c===Il)Al(Tt);else if(!n(c))await fp(c);else{await sr({url:c,title:c,channel:"",thumbnail:"",id:c}),v(J),Re=-1,ee.value="",v(ee);return}}else o.key==="Escape"&&(JD()?Yr():ee.value?ee.value="":v(ee))}),ee.addEventListener("input",()=>{ee.value.trim()===""&&Yr(),Re=-1});const s=rr(ee,()=>v(ee),{ignore:[an],esc:!1});kl.push(s);const r=rr(J,()=>v(J),{ignore:[an],esc:!1});return kl.push(r),xr=!1,hp=!0,!0}async function fp(t){if(!an||!J){console.error("Search elements not initialized");return}Tt=[],Il=t,an.disabled=!0,J.innerHTML='<div class="search-loading">Searching YouTube...</div>',U(J);try{const e=await fetch(`${GD}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${zD}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){pp("No videos found"),Tt=[];return}Tt=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),Al(Tt)}catch(e){console.error("YouTube search failed:",e),pp(e.message||"Search failed. Please try again.")}finally{an.disabled=!1}}function Al(t){if(!J){console.error("Search results element not initialized");return}if(!t||t.length===0){J.innerHTML='<div class="search-no-results">No results found</div>',Tt=[],Re=-1;return}J.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await sr(n),v(J),Re=-1,!ee){console.error("Search query element not initialized");return}ee.value="",v(ee)},J.appendChild(i)}),U(J),Re=0,J.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Re?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function pp(t){if(Tt=[],Re=-1,!J){console.error("Search results element not initialized");return}J.innerHTML=`<div class="search-error">${t}</div>`,U(J)}function Yr(){Tt=[],Re=-1,J&&(J.innerHTML="",v(J))}function YD(){Yr(),kl.forEach(t=>t())}function JD(){return!No(J)}function gp(){return Tt.length>0}function XD({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let s=e;const r=pd({initialProps:{unreadCount:0,isHidden:!0},template:`
      <button
        class="notifications-toggle-btn"
        title="Notifications"
        onclick="handleClick"
      >
        <i class="fa fa-bell"></i>
        <span class="notification-badge">
          \${unreadCount}
        </span>
      </button>
    `,handlers:{handleClick:()=>{n?n():s&&s.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():i&&r.hide()},r.setManager=a=>{s=a},r.hide(),r}class QD{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=rr(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const ZD=new QD;let vs=null;const eM=(t,e=null)=>{if(vs)return vs;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,s=10;typeof e=="number"&&(s=e);const r=Gu();return vs=pd({initialProps:{isLoggedIn:r,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:s},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:async a=>{try{await sy(a)}catch(c){console.error("[AuthComponent] Handle login error:",c),alert("Login failed. Please refresh the page, check your connection and try again.")}},handleLogout:ry,handleDeleteAccount:async()=>{if(confirm(`Are you sure you want to delete your account?

This will permanently delete:
• Your account
• All contacts
• Call history
• All associated data

This action cannot be undone.`))try{await oy(),alert("Your account has been deleted successfully.")}catch(c){console.error("[AuthComponent] Delete account error:",c),alert(c.message||"Failed to delete account. Please try again.")}}},onMount:a=>{const c=l=>{const u=a.querySelector("#goog-login-btn"),d=a.querySelector("#goog-logout-btn");u&&d&&(u.disabled=l,d.disabled=!l);const h=a.querySelector("#delete-account-btn");h&&(h.disabled=!l)};c(r),n=Ku(({isLoggedIn:l,userName:u})=>{V("[AuthComponent] Auth state changed:",{isLoggedIn:l,userName:u}),c(l),a.update({isLoggedIn:l,userName:u,signingInDisplay:"none"})}),i=l0(l=>{V("[AuthComponent] One Tap status:",l),l==="signing_in"?a.update({signingInDisplay:"inline-block"}):a.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),vs=null},className:"auth-component",parent:t}),vs},tM="https://people.googleapis.com/v1/people/me/connections",nM="https://people.googleapis.com/v1/otherContacts";async function iM(t){if(!t)throw new Error("Access token is required");const e=[],n=await mp(t,tM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const i=await mp(t,nM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${i.length}`),e.push(...i),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const s=new Set;return e.filter(o=>s.has(o.email)?!1:(s.add(o.email),!0))}async function mp(t,e,n){const i=[];let s=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),s&&r.searchParams.set("pageToken",s);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),i;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&i.push({email:f.value.toLowerCase().trim(),name:h})}s=a.nextPageToken}while(s);return i}function sM(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function rM(t,e,n,i){const r=[`To: ${(Array.isArray(e)?e:[e]).join(", ")}`,`Subject: ${n}`,"Content-Type: text/plain; charset=utf-8","",i].join(`\r
`),o=sM(new TextEncoder().encode(r)),a=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({raw:o})});if(!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.error?.message||`Gmail API error: ${a.status}`)}const c=await a.json();return console.log("[GMAIL] Email sent successfully:",c.id),c}async function oM(t,e,n,i){const s={sent:0,failed:0,errors:[]};for(const r of e)try{await rM(t,r.email,n,i),s.sent++,console.log(`[GMAIL] Sent to ${r.name} (${r.email})`)}catch(o){s.failed++;const a=o&&o.message||String(o);s.errors.push({email:r.email,name:r.name,error:a}),console.error(`[GMAIL] Failed to send to ${r.name}:`,a)}return console.log(`[GMAIL] Bulk send complete: ${s.sent} sent, ${s.failed} failed`),s}async function aM(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
      <h2>Add Contacts</h2>

      <div class="platform-selector">
        <button type="button" class="platform-btn active" data-platform="google" title="Import from Google Contacts">
          <i class="fa fa-google"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="facebook" title="Import from Facebook (Coming soon)" disabled>
          <i class="fa fa-facebook"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="instagram" title="Import from Instagram (Coming soon)" disabled>
          <i class="fa fa-instagram"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="tiktok" title="Import from TikTok (Coming soon)" disabled>
          <i class="fa fa-tiktok"></i>
        </button>
      </div>

      <div class="search-section">
        <input
          type="text"
          id="contact-search-input"
          class="contact-search-input"
          placeholder="Search contacts or enter email..."
        />
      </div>

      <div id="contacts-container" class="contacts-container-modal">
        <p class="empty-state">Select a platform above to import contacts</p>
      </div>

      <div id="import-status" class="import-status"></div>

      <div class="modal-footer">
        <button type="button" data-action="cancel" class="cancel-btn">Close</button>
      </div>
    `;const n=e.querySelector('[data-action="cancel"]'),i=e.querySelector("#contact-search-input"),s=e.querySelector("#import-status"),r=e.querySelector("#contacts-container"),o=e.querySelectorAll(".platform-btn");let a="google",c=[],l=[];const u=new Set;function d(){e.close(),e.remove(),t()}n.addEventListener("click",d),e.addEventListener("cancel",d),o.forEach(f=>{f.addEventListener("click",async()=>{if(f.disabled)return;const p=f.getAttribute("data-platform");o.forEach(g=>g.classList.remove("active")),f.classList.add("active"),a=p,p==="google"&&await h()})}),i.addEventListener("input",()=>{const f=i.value.trim().toLowerCase();f?l=c.filter(p=>{const g=(p.name||"").toLowerCase().includes(f),_=(p.email||"").toLowerCase().includes(f);return g||_}):l=c,_p(r,l,u)});async function h(){s.textContent="Requesting access...",s.className="import-status loading",r.innerHTML="",c=[],l=[];try{const f=await cy();s.textContent="Fetching contacts...";const p=await iM(f);if(p.length===0){s.textContent="No contacts with email addresses found.",s.className="import-status not-found",r.innerHTML='<p class="empty-state">No contacts found.</p>';return}s.textContent=`Found ${p.length} contacts. Checking HangVidU...`;const g=await Gt(),_=new Set(Object.keys(g||{})),T=p.map(y=>y.email),N=await ey(T),$=Wt();c=[];for(const y of p){const A=N[y.email],ge=A&&A.uid===$?.uid,me=A&&_.has(A.uid);ge||c.push({...y,user:A,isAlreadySaved:me})}c.sort((y,A)=>{const ge=gt=>gt.user&&!gt.isAlreadySaved?1:2,me=ge(y),X=ge(A);return me!==X?me-X:(y.name||"").localeCompare(A.name||"",void 0,{sensitivity:"base"})}),l=c,s.textContent=`Found ${c.length} contacts`,s.className="import-status success",_p(r,l,u)}catch(f){console.error("[ADD CONTACT] Import error:",f),f.message==="Authorization cancelled"?(s.textContent="Import cancelled.",s.className="import-status cancelled"):(s.textContent=`Error: ${f.message}`,s.className="import-status error"),r.innerHTML='<p class="empty-state">Failed to load contacts.</p>'}}document.body.appendChild(e),e.showModal(),a==="google"&&h()})}function _p(t,e,n){if(t.innerHTML="",e.length===0){t.innerHTML='<p class="empty-state">No contacts found.</p>';return}const i=document.createElement("div");i.className="results-header",i.innerHTML=`
    <label class="select-all-label">
      <input type="checkbox" id="select-all-checkbox" />
      <span>Select All (${e.length})</span>
    </label>
  `,t.appendChild(i);const s=document.createElement("div");s.className="contacts-scroll-list";const r=document.createElement("ul");r.className="contact-list";for(const h of e){const{name:f,email:p,user:g,isAlreadySaved:_}=h,T=document.createElement("li");T.className="contact-item";let N="",$="";if(_?(N='<span class="status-badge saved">✓ Saved</span>',$=""):g?(N='<span class="status-badge on-app">On HangVidU</span>',$=`
        <button type="button" class="invite-btn" data-uid="${bs(g.uid)}" data-name="${bs(g.displayName)}">
          Invite
        </button>
      `):(N='<span class="status-badge not-on-app">Not on app</span>',$=""),T.innerHTML=`
      <label class="contact-item-label">
        <input type="checkbox" class="contact-checkbox" data-email="${bs(p)}" ${_?"disabled":""} />
        <span class="contact-info">
          <strong>${bs(f)}</strong>
          <small>${bs(p)}</small>
          ${N}
        </span>
      </label>
      ${$}
    `,g&&!_){const A=T.querySelector(".invite-btn");A.addEventListener("click",async()=>{A.disabled=!0,A.textContent="Sending...";try{await ep(g.uid,g.displayName),A.textContent="✓ Sent",A.classList.add("sent")}catch(ge){console.error("[ADD CONTACT] Invite error:",ge),A.textContent="Error",A.disabled=!1}})}const y=T.querySelector(".contact-checkbox");y&&!_&&y.addEventListener("change",()=>{y.checked?n.add(h):n.delete(h),u()}),r.appendChild(T)}s.appendChild(r),t.appendChild(s);const o=i.querySelector("#select-all-checkbox");o.addEventListener("change",()=>{r.querySelectorAll(".contact-checkbox:not([disabled])").forEach(f=>{f.checked=o.checked;const p=f.getAttribute("data-email"),g=e.find(_=>_.email===p);g&&(o.checked?n.add(g):n.delete(g))}),u()});const a=document.createElement("div");a.className="bulk-actions",a.innerHTML=`
    <button type="button" id="invite-selected-btn" class="action-btn" disabled>
      Invite Selected (0)
    </button>
    <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
      Email Invite (0)
    </button>
  `,t.appendChild(a);const c=a.querySelector("#invite-selected-btn"),l=a.querySelector("#share-link-btn");function u(){const h=Array.from(n),f=h.filter(g=>g.user&&!g.isAlreadySaved).length,p=h.filter(g=>!g.user).length;c.disabled=f===0,c.textContent=`Invite Selected (${f})`,l.disabled=p===0,l.textContent=`Email Invite (${p})`}c.addEventListener("click",async()=>{const h=Array.from(n).filter(p=>p.user&&!p.isAlreadySaved);if(h.length===0)return;c.disabled=!0,c.textContent="Sending invites...";let f=0;for(const p of h)try{await ep(p.user.uid,p.user.displayName),f++}catch(g){console.error("[ADD CONTACT] Failed to invite:",p.name,g)}c.textContent=`✓ Sent ${f} invite${f!==1?"s":""}`,setTimeout(()=>{n.clear(),u(),r.querySelectorAll(".contact-checkbox").forEach(p=>p.checked=!1),o.checked=!1},2e3)}),l.addEventListener("click",async()=>{const h=Array.from(n).filter(f=>!f.user);if(h.length!==0){l.disabled=!0,l.textContent="Requesting permission...";try{const f=await ly();l.textContent="Sending emails...";const p=L(),g=p?`${window.location.origin}/?ref=${p}`:window.location.origin,T=Wt()?.displayName||"A friend",N="Join me on HangVidU!",$=`Hi!

${T} invited you to join HangVidU - a simple video chat app.

Click here to get started:
${g}

See you there!`,y=await oM(f,h,N,$);y.sent>0?(l.textContent=`✓ Sent ${y.sent} email${y.sent!==1?"s":""}!`,l.classList.add("success"),setTimeout(()=>{n.clear(),u(),r.querySelectorAll(".contact-checkbox").forEach(A=>A.checked=!1),o.checked=!1,l.classList.remove("success")},3e3)):(l.textContent="Failed to send emails",l.disabled=!1),y.failed>0&&console.warn(`[ADD CONTACT] ${y.failed} emails failed:`,y.errors)}catch(f){console.error("[ADD CONTACT] Gmail send error:",f),f.message==="Authorization cancelled"?(l.textContent="Permission denied - using email client...",setTimeout(()=>{d(h),l.textContent=`Email Invite (${h.length})`,l.disabled=!1},1500)):(l.textContent="Error - try again",l.disabled=!1,alert(`Failed to send emails: ${f.message}

Please try again or use your email client.`))}}});function d(h){const f=L(),p=f?`${window.location.origin}/?ref=${f}`:window.location.origin,_=Wt()?.displayName||"A friend",T=encodeURIComponent("Join me on HangVidU!"),N=encodeURIComponent(`Hi!

${_} invited you to join HangVidU - a simple video chat app.

Click here to get started:
${p}

See you there!
`);let $;h.length===1?$=`mailto:${h[0].email}?subject=${T}&body=${N}`:$=`mailto:?bcc=${h.map(A=>A.email).join(",")}&subject=${T}&body=${N}`,window.location.href=$}}function bs(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function cM(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class lM{constructor(){this.originalTitle=document.title,this.originalFavicon=cM(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/HangVidU/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const bc=new lM;let yp=!1;function uM(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function dM(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};hM();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=uM(t,n);fM(i);let c=!1;const l=async()=>{await pM(t,s)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function hM(){if(yp)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),yp=!0}function fM(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function pM(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function gM(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",s=i.replace(/\/$/,"");let r;try{r=new URL(s).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,s).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}gM();r0(!0);w().disable();let Sd=[];async function mM(){aL();const t=py(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:r}=await he(async()=>{const{setupPWA:o}=await import("./PWA-DgfAFAoi.js");return{setupPWA:o}},[]);await r()}KD(),wM(),await ty;const i=eM(Ca);i&&Sd.push(i.dispose);const s=document.querySelector(".top-right-menu");if(s){const r=XD({parent:s,hideWhenAllRead:!0});ZD.setToggle(r)}try{await Ne.initialize()?console.log("[MAIN] FCM notifications initialized successfully"):console.warn("[MAIN] FCM notifications failed to initialize")}catch(r){console.error("[MAIN] FCM initialization error:",r)}return window.notificationController=Ne,window.getLoggedInUserId=L,!0}catch(i){return console.error("Initialization error:",i),!1}}let Rl=!1;function _w(){Rl=!1}async function yw(){Rl||(Rl=!0,await tL(Ye),QO({getLocalStream:Ia,getLocalVideo:()=>Ye,getRemoteVideo:()=>le,getPeerConnection:()=>be.getState().pc,setLocalStream:Po,micBtn:ds,cameraBtn:hs,switchCameraBtn:us,mutePartnerBtn:ht,fullscreenPartnerBtn:Ta,remotePipBtn:Sn}),Ye&&(Ye.addEventListener("enterpictureinpicture",()=>ve&&v(ve)),Ye.addEventListener("leavepictureinpicture",()=>{ve&&!(oi()&&ky())&&U(ve)})))}function ww(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),_w()}function Jr(t=null){return{localStream:Ia(),localVideoEl:Ye,remoteVideoEl:le,mutePartnerBtn:ht,setupRemoteStream:nL,setupWatchSync:K0,targetRoomId:t}}function Xr(t,e=!1){return t.success?(e&&t.roomLink&&dM(t.roomLink,{onCopy:()=>V("Link ready! Share with your partner."),onCancel:()=>V("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function Ir(t,{forceInitiator:e=!1}={}){try{await yw()}catch(r){return console.error("Failed to initialize local media stream:",r),ww(r),!1}const n=Date.now();if(e){w().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await be.createCall(Jr(t));return Xr(r,!1)}let i=await oe.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await oe.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){w().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await be.createCall(Jr(t));return Xr(r,!0)}w().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const s=await be.answerCall({roomId:t,...Jr()});return Xr(s,!1)}const We=new Set,vw=new Map;function Ec(t){t&&(wr(t),We.delete(t),vw.delete(t),w().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:We.size}))}function _M(){V(`[LISTENER] Removing all incoming listeners (${We.size} rooms)`);const t=Array.from(We);t.forEach(e=>{wr(e)}),We.clear(),vw.clear(),w().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function yM(t){const e=Date.now(),n=e+1440*60*1e3,i=L();if(i){const s=ma(i,t);await Z(s,{roomId:t,savedAt:e,expiresAt:n});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function Cc(t){const e=L();if(e){try{await Ke(ma(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function ui(t){t&&(We.has(t)&&(We.delete(t),wr(t)),V(`[LISTENER] Attaching listener for room: ${t} (total: ${We.size+1})`),We.add(t),w().logListenerAttachment(t,"member_join",We.size,{action:"incoming_call_listener_attached"}),oe.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,s=de();if(n&&n!==s){w().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const $=await uy(n,t),y=await dy(t);a=$||y,c=$?"outgoingState":y?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(w().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){w().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await oe.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===s)return;const g=be.getState();if(!!g.pc&&g.pc.connectionState==="connected"){w().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:g.pc?.connectionState});return}w().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await gw(t,n);Gn.playIncoming(),bc.startCallIndicators(T);let N=!1;try{N=await ka(`Incoming call from ${T}.

Accept?`)}finally{Gn.stop(),bc.stopCallIndicators()}if(N)Ec(t),Ne.isNotificationEnabled()&&await Ne.dismissCallNotifications(t),w().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),Ir(t).catch($=>{console.warn("Failed to answer incoming call:",$),w().logFirebaseOperation("join_room_on_accept",!1,$,{roomId:t,joiningUserId:n})});else{Ne.isNotificationEnabled()&&await Ne.dismissCallNotifications(t),w().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await oe.rejectCall(t,de(),"user_rejected")}catch($){console.warn("Failed to signal rejection via RTDB:",$)}await Cc(t).catch($=>{console.warn("Failed to remove recent call on rejection:",$)})}}}),oe.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){Gn.stop(),bc.stopCallIndicators(),Ne.isNotificationEnabled()&&await Ne.dismissCallNotifications(t).catch(()=>{});try{const{dismissActiveConfirmDialog:i}=await he(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>uL);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await Cc(t).catch(()=>{}),Ec(t)}}),oe.onMemberLeft(t,async e=>{const n=e.key,i=de();if(!(!n||n===i))try{(await oe.checkRoomStatus(t)).hasMembers||(await Cc(t),Ec(t),V(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function wp(){const t=Date.now();w().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:We.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await he(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>Yu);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=L();if(w().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=g_(e);try{const i=await Pe(n),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await Ke(ma(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await Gt();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=ko(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>ui(o)),w().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:We.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),w().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await Gt(),a=de();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=ko(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>ui(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),w().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:We.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),w().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Fr(){return B&&xe&&!xe.classList.contains("hidden")&&B.src&&B.src.trim()!==""}let vp=!1;function wM(){if(vp)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",vt()),console.log("isYTVisible():",cc()),console.log("isSharedVideoVisible():",Fr()),console.log("isWatchModeActive():",oi()),vt()==="yt"?cc()?(Oo(),Ds()):(Sy(),Do()):(vt()==="url"||vt()==="file")&&(Fr()?(v(xe),Ds()):(U(xe),Do()))),e.key==="Escape"&&oi()&&(vt()==="yt"&&cc()?(Sr(),Oo()):(vt()==="url"&&Fr()||vt()==="file"&&Fr())&&(B.pause(),v(xe)),Ds())}),vp=!0}const bw=async()=>{try{await yw();const t=await be.createCall(Jr());Xr(t,!0)}catch(t){console.error("Failed to start call:",t),ww(t)}};je.onclick=bw;Rn.onclick=bw;Pi&&(navigator.clipboard&&navigator.clipboard.readText?Pi.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=vM(t);if(!e){alert("No valid room link found in clipboard.");return}await Ir(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(Pi.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));nr&&(nr.onclick=async()=>{await aM()});ri&&(ri.onclick=()=>{vt()==="yt"?(Sr(),Oo()):(vt()==="url"||vt()==="file")&&(B.pause(),B.src.startsWith("blob:")&&URL.revokeObjectURL(B.src),v(xe)),Ds()});dt.onclick=async()=>{console.debug("Hanging up..."),await be.hangUp({emitCancel:!0,reason:"user_hung_up"})};function vM(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),i=n.searchParams.get("room");if(i)return i;const s=n.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function bM(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await Ir(e);return n||(Ea(),Ly()),n}const Nl=[];let Tc=!1;async function Ew(){if(Tc||Nl.length===0)return;Tc=!0;const{fromUserId:t,inviteData:e}=Nl.shift();try{if(await ka(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await sL(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Kt(nt).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(i){console.error("[INVITATIONS] Failed to accept invite:",i),alert("Failed to add contact. Please try again.")}else try{await rL(t),console.log("[INVITATIONS] Invite declined")}catch(i){console.error("[INVITATIONS] Failed to decline invite:",i)}}finally{Tc=!1,Ew()}}function bp(){iL((t,e)=>{Nl.push({fromUserId:t,inviteData:e}),Ew()}),oL(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Kt(nt).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}window.onload=async()=>{if(!await mM()){je&&(je.disabled=!0,je.title="Initialization failed. Please reload the page or check your camera/microphone permissions."),console.error("Initialization failed. Call functionality disabled. Please reload the page."),alert(`Hangvidu could not initialize properly.

Please check your camera/microphone permissions and reload the page.`);return}cL(be),await wp().catch(s=>console.warn("Failed to start saved-room listeners",s)),Kt(nt).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const n=Ku(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;if(e=s,await Kt(nt),a)V("[AUTH] User logged out - cleaning up messaging and listeners"),Ae.reset(),mn.closeAllSessions(),Ne.isNotificationEnabled()&&await Ne.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),_M(),Cl();else if(c)if(V("[AUTH] User logged in - re-attaching incoming listeners"),await wp().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),bp(),!L())console.log("[AUTH] Skipping notification setup: no user logged in");else{const u=Ne.getPermissionState();if(u==="granted"){console.log("[AUTH] Enabling notifications for logged-in user");try{await Ne.enable(),console.log("[AUTH] Notifications enabled successfully")}catch(d){console.error("[AUTH] Failed to enable notifications on login:",d)}}else u==="default"?(console.log("[AUTH] Notification permission in default state - consider showing opt-in UI"),console.log("[AUTH] User can enable notifications via the notifications toggle")):console.log("[AUTH] Notification permission denied or unsupported")}else o&&s&&(V("[AUTH] Initial load with logged-in user"),bp())}catch(o){console.warn("Failed to handle auth change:",o)}});Sd.push(()=>{try{typeof n=="function"&&n()}catch{}}),await bM()};window.addEventListener("beforeunload",async t=>{const e=be.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await EM()});be.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),be.setPartnerId(t),Ae.showMessagesToggle(),Na(t,t),Qu().catch(n=>console.warn("Failed to clear calling state:",n)),yM(e).catch(n=>console.warn("Failed to save recent call:",n))});be.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});be.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:i,wasConnected:s})=>{if(i==="initiator"&&!e&&!s&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const{getContactByRoomId:a}=await he(async()=>{const{getContactByRoomId:l}=await Promise.resolve().then(()=>Sl);return{getContactByRoomId:l}},void 0),c=await a(t);if(c&&c.contactId){const{getCurrentUser:l}=await he(async()=>{const{getCurrentUser:h}=await Promise.resolve().then(()=>Yu);return{getCurrentUser:h}},void 0),d=l()?.displayName||"Friend";console.log(`[MAIN] Sending missed call notification to ${c.contactName} (${c.contactId})`),await Ne.sendMissedCallNotification(c.contactId,{roomId:t,callerId:de(),callerName:d})}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&Ne.isNotificationEnabled()&&Ne.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=be.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),by(),Ea(),t&&ui(t),e&&t&&setTimeout(()=>{mw(e,t,nt).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function EM(){await be.hangUp({emitCancel:!0,reason:"page_unload"}),ZO(),h_(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=be.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),B.src="",Cy(),Ye&&Ye.srcObject&&(Ye.srcObject=null),le&&le.srcObject&&(le.srcObject=null),Ds(),G0("none"),cd(),YD(),Ea(),Ty(!1),Sd.forEach(e=>e())}const CM=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:Ir,listenForIncomingOnRoom:ui,resetLocalStreamInitFlag:_w},Symbol.toStringTag,{value:"Module"}));export{he as _,pd as c,V as d,v as h,TM as i,ZD as n,U as s};
