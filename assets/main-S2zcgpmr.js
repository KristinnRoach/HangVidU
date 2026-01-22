(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const aw="modulepreload",cw=function(t){return"/HangVidU/"+t},ad={},Me=function(e,n,i){let s=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");s=c(n.map(l=>{if(l=cw(l),l in ad)return;ad[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":aw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},k=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,W=globalThis,On="10.34.0";function Co(){return To(W),W}function To(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||On,e[On]=e[On]||{}}function Fi(t,e,n=W){const i=n.__SENTRY__=n.__SENTRY__||{},s=i[On]=i[On]||{};return s[t]||(s[t]=e())}const lw=["debug","info","warn","error","log","assert","trace"],uw="Sentry Logger ",Ur={};function Ui(t){if(!("console"in W))return t();const e=W.console,n={},i=Object.keys(Ur);i.forEach(s=>{const r=Ur[s];n[s]=e[s],e[s]=r});try{return t()}finally{i.forEach(s=>{e[s]=n[s]})}}function dw(){ul().enabled=!0}function hw(){ul().enabled=!1}function Zf(){return ul().enabled}function fw(...t){ll("log",...t)}function pw(...t){ll("warn",...t)}function gw(...t){ll("error",...t)}function ll(t,...e){k&&Zf()&&Ui(()=>{W.console[t](`${uw}[${t}]:`,...e)})}function ul(){return k?Fi("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const E={enable:dw,disable:hw,isEnabled:Zf,log:fw,warn:pw,error:gw},ep=50,Fn="?",cd=/\(error: (.*)\)/,ld=/captureMessage|captureException/;function tp(...t){const e=t.sort((n,i)=>n[0]-i[0]).map(n=>n[1]);return(n,i=0,s=0)=>{const r=[],o=n.split(`
`);for(let a=i;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=cd.test(c)?c.replace(cd,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=ep+s)break}}return _w(r.slice(s))}}function mw(t){return Array.isArray(t)?tp(...t):t}function _w(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(dr(e).function||"")&&e.pop(),e.reverse(),ld.test(dr(e).function||"")&&(e.pop(),ld.test(dr(e).function||"")&&e.pop()),e.slice(0,ep).map(n=>({...n,filename:n.filename||dr(e).filename,function:n.function||Fn}))}function dr(t){return t[t.length-1]||{}}const ya="<anonymous>";function on(t){try{return!t||typeof t!="function"?ya:t.name||ya}catch{return ya}}function ud(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(i=>{i.stacktrace.frames&&n.push(...i.stacktrace.frames)}),n}catch{return}}}function np(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Tr={},dd={};function Zn(t,e){Tr[t]=Tr[t]||[],Tr[t].push(e)}function ei(t,e){if(!dd[t]){dd[t]=!0;try{e()}catch(n){k&&E.error(`Error while instrumenting ${t}`,n)}}}function st(t,e){const n=t&&Tr[t];if(n)for(const i of n)try{i(e)}catch(s){k&&E.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${on(i)}
Error:`,s)}}let wa=null;function yw(t){const e="error";Zn(e,t),ei(e,ww)}function ww(){wa=W.onerror,W.onerror=function(t,e,n,i,s){return st("error",{column:i,error:s,line:n,msg:t,url:e}),wa?wa.apply(this,arguments):!1},W.onerror.__SENTRY_INSTRUMENTED__=!0}let va=null;function vw(t){const e="unhandledrejection";Zn(e,t),ei(e,bw)}function bw(){va=W.onunhandledrejection,W.onunhandledrejection=function(t){return st("unhandledrejection",t),va?va.apply(this,arguments):!0},W.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const ip=Object.prototype.toString;function So(t){switch(ip.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return an(t,Error)}}function $i(t,e){return ip.call(t)===`[object ${e}]`}function sp(t){return $i(t,"ErrorEvent")}function hd(t){return $i(t,"DOMError")}function Ew(t){return $i(t,"DOMException")}function At(t){return $i(t,"String")}function dl(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Io(t){return t===null||dl(t)||typeof t!="object"&&typeof t!="function"}function Is(t){return $i(t,"Object")}function ko(t){return typeof Event<"u"&&an(t,Event)}function Cw(t){return typeof Element<"u"&&an(t,Element)}function Tw(t){return $i(t,"RegExp")}function Gs(t){return!!(t?.then&&typeof t.then=="function")}function Sw(t){return Is(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function an(t,e){try{return t instanceof e}catch{return!1}}function rp(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function op(t){return typeof Request<"u"&&an(t,Request)}const hl=W,Iw=80;function ap(t,e={}){if(!t)return"<unknown>";try{let n=t;const i=5,s=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||Iw;for(;n&&r++<i&&(l=kw(n,u),!(l==="html"||r>1&&o+s.length*c+l.length>=d));)s.push(l),o+=l.length,n=n.parentNode;return s.reverse().join(a)}catch{return"<unknown>"}}function kw(t,e){const n=t,i=[];if(!n?.tagName)return"";if(hl.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}i.push(n.tagName.toLowerCase());const s=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(s?.length)s.forEach(o=>{i.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&i.push(`#${n.id}`);const o=n.className;if(o&&At(o)){const a=o.split(/\s+/);for(const c of a)i.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&i.push(`[${o}="${a}"]`)}return i.join("")}function fl(){try{return hl.document.location.href}catch{return""}}function Aw(t){if(!hl.HTMLElement)return null;let e=t;const n=5;for(let i=0;i<n;i++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Fe(t,e,n){if(!(e in t))return;const i=t[e];if(typeof i!="function")return;const s=n(i);typeof s=="function"&&cp(s,i);try{t[e]=s}catch{k&&E.log(`Failed to replace method "${e}" in object`,t)}}function cn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{k&&E.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function cp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,cn(t,"__sentry_original__",e)}catch{}}function pl(t){return t.__sentry_original__}function lp(t){if(So(t))return{message:t.message,name:t.name,stack:t.stack,...pd(t)};if(ko(t)){const e={type:t.type,target:fd(t.target),currentTarget:fd(t.currentTarget),...pd(t)};return typeof CustomEvent<"u"&&an(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function fd(t){try{return Cw(t)?ap(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function pd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function Rw(t){const e=Object.keys(lp(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let ii;function Ao(t){if(ii!==void 0)return ii?ii(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=W;return e in n&&typeof n[e]=="function"?(ii=n[e],ii(t)):(ii=null,t())}function $r(){return Ao(()=>Math.random())}function Ro(){return Ao(()=>Date.now())}function oc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function gd(t,e){if(!Array.isArray(t))return"";const n=[];for(let i=0;i<t.length;i++){const s=t[i];try{rp(s)?n.push(np(s)):n.push(String(s))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Sr(t,e,n=!1){return At(t)?Tw(e)?e.test(t):At(e)?n?t===e:t.includes(e):!1:!1}function No(t,e=[],n=!1){return e.some(i=>Sr(t,i,n))}function Nw(){const t=W;return t.crypto||t.msCrypto}let ba;function Pw(){return $r()*16}function qe(t=Nw()){try{if(t?.randomUUID)return Ao(()=>t.randomUUID()).replace(/-/g,"")}catch{}return ba||(ba="10000000100040008000"+1e11),ba.replace(/[018]/g,e=>(e^(Pw()&15)>>e/4).toString(16))}function up(t){return t.exception?.values?.[0]}function kn(t){const{message:e,event_id:n}=t;if(e)return e;const i=up(t);return i?i.type&&i.value?`${i.type}: ${i.value}`:i.type||i.value||n||"<unknown>":n||"<unknown>"}function ac(t,e,n){const i=t.exception=t.exception||{},s=i.values=i.values||[],r=s[0]=s[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Ci(t,e){const n=up(t);if(!n)return;const i={type:"generic",handled:!0},s=n.mechanism;if(n.mechanism={...i,...s,...e},e&&"data"in e){const r={...s?.data,...e.data};n.mechanism.data=r}}function md(t){if(Ow(t))return!0;try{cn(t,"__sentry_captured__",!0)}catch{}return!1}function Ow(t){try{return t.__sentry_captured__}catch{}}const dp=1e3;function Ks(){return Ro()/dp}function Lw(){const{performance:t}=W;if(!t?.now||!t.timeOrigin)return Ks;const e=t.timeOrigin;return()=>(e+Ao(()=>t.now()))/dp}let _d;function Rt(){return(_d??(_d=Lw()))()}function Dw(t){const e=Rt(),n={sid:qe(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>xw(n)};return t&&Ti(n,t),n}function Ti(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Rt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:qe()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Mw(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Ti(t,n)}function xw(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function Ys(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const i={...t};for(const s in e)Object.prototype.hasOwnProperty.call(e,s)&&(i[s]=Ys(i[s],e[s],n-1));return i}function yd(){return qe()}function hp(){return qe().substring(16)}const cc="_sentrySpan";function wd(t,e){e?cn(t,cc,e):delete t[cc]}function vd(t){return t[cc]}const Fw=100;class Lt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:yd(),sampleRand:$r()}}clone(){const e=new Lt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,wd(e,vd(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Ti(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,i=n instanceof Lt?n.getScopeData():Is(n)?e:void 0,{tags:s,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=i||{};return this._tags={...this._tags,...s},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,wd(this,void 0),this._attachments=[],this.setPropagationContext({traceId:yd(),sampleRand:$r()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const i=typeof n=="number"?n:Fw;if(i<=0)return this;const s={timestamp:Ks(),...e,message:e.message?oc(e.message,2048):e.message};return this._breadcrumbs.push(s),this._breadcrumbs.length>i&&(this._breadcrumbs=this._breadcrumbs.slice(-i),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:vd(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=Ys(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const i=n?.event_id||qe();if(!this._client)return k&&E.warn("No client configured on scope - will not capture exception!"),i;const s=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:s,...n,event_id:i},this),i}captureMessage(e,n,i){const s=i?.event_id||qe();if(!this._client)return k&&E.warn("No client configured on scope - will not capture message!"),s;const r=i?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...i,event_id:s},this),s}captureEvent(e,n){const i=n?.event_id||qe();return this._client?(this._client.captureEvent(e,{...n,event_id:i},this),i):(k&&E.warn("No client configured on scope - will not capture event!"),i)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Uw(){return Fi("defaultCurrentScope",()=>new Lt)}function $w(){return Fi("defaultIsolationScope",()=>new Lt)}class Bw{constructor(e,n){let i;e?i=e:i=new Lt;let s;n?s=n:s=new Lt,this._stack=[{scope:i}],this._isolationScope=s}withScope(e){const n=this._pushScope();let i;try{i=e(n)}catch(s){throw this._popScope(),s}return Gs(i)?i.then(s=>(this._popScope(),s),s=>{throw this._popScope(),s}):(this._popScope(),i)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Si(){const t=Co(),e=To(t);return e.stack=e.stack||new Bw(Uw(),$w())}function Hw(t){return Si().withScope(t)}function Ww(t,e){const n=Si();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function bd(t){return Si().withScope(()=>t(Si().getIsolationScope()))}function Vw(){return{withIsolationScope:bd,withScope:Hw,withSetScope:Ww,withSetIsolationScope:(t,e)=>bd(e),getCurrentScope:()=>Si().getScope(),getIsolationScope:()=>Si().getIsolationScope()}}function gl(t){const e=To(t);return e.acs?e.acs:Vw()}function gn(){const t=Co();return gl(t).getCurrentScope()}function Js(){const t=Co();return gl(t).getIsolationScope()}function jw(){return Fi("globalScope",()=>new Lt)}function qw(...t){const e=Co(),n=gl(e);if(t.length===2){const[i,s]=t;return i?n.withSetScope(i,s):n.withScope(s)}return n.withScope(t[0])}function Ce(){return gn().getClient()}function zw(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:i,propagationSpanId:s}=e,r={trace_id:n,span_id:s||hp()};return i&&(r.parent_span_id=i),r}const Gw="sentry.source",Kw="sentry.sample_rate",Yw="sentry.previous_trace_sample_rate",Jw="sentry.op",Xw="sentry.origin",fp="sentry.profile_id",pp="sentry.exclusive_time",Qw=0,Zw=1,ev="_sentryScope",tv="_sentryIsolationScope";function nv(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function gp(t){const e=t;return{scope:e[ev],isolationScope:nv(e[tv])}}const iv="sentry-",sv=/^sentry-/;function rv(t){const e=ov(t);if(!e)return;const n=Object.entries(e).reduce((i,[s,r])=>{if(s.match(sv)){const o=s.slice(iv.length);i[o]=r}return i},{});if(Object.keys(n).length>0)return n}function ov(t){if(!(!t||!At(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const i=Ed(n);return Object.entries(i).forEach(([s,r])=>{e[s]=r}),e},{}):Ed(t)}function Ed(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const i=e.slice(0,n),s=e.slice(n+1);return[i,s].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,i])=>(n&&i&&(e[n]=i),e),{})}const av=/^o(\d+)\./,cv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function lv(t){return t==="http"||t==="https"}function Xs(t,e=!1){const{host:n,path:i,pass:s,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&s?`:${s}`:""}@${n}${r?`:${r}`:""}/${i&&`${i}/`}${o}`}function uv(t){const e=cv.exec(t);if(!e){Ui(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,i,s="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return mp({host:r,pass:s,path:c,projectId:l,port:o,protocol:n,publicKey:i})}function mp(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function dv(t){if(!k)return!0;const{port:e,projectId:n,protocol:i}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(E.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?lv(i)?e&&isNaN(parseInt(e,10))?(E.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(E.error(`Invalid Sentry Dsn: Invalid protocol ${i}`),!1):(E.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function hv(t){return t.match(av)?.[1]}function fv(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let i;return e.orgId?i=String(e.orgId):n&&(i=hv(n)),i}function pv(t){const e=typeof t=="string"?uv(t):mp(t);if(!(!e||!dv(e)))return e}function gv(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const _p=1;let Cd=!1;function mv(t){const{spanId:e,traceId:n,isRemote:i}=t.spanContext(),s=i?e:ml(t).parent_span_id,r=gp(t).scope,o=i?r?.getPropagationContext().propagationSpanId||hp():e;return{parent_span_id:s,span_id:o,trace_id:n}}function _v(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:i,...s},attributes:r})=>({span_id:e,trace_id:n,sampled:i===_p,attributes:r,...s}))}function Td(t){return typeof t=="number"?Sd(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?Sd(t.getTime()):Rt()}function Sd(t){return t>9999999999?t/1e3:t}function ml(t){if(wv(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(yv(t)){const{attributes:i,startTime:s,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:i,description:r,parent_span_id:l,start_timestamp:Td(s),timestamp:Td(o)||void 0,status:bv(a),op:i[Jw],origin:i[Xw],links:_v(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function yv(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function wv(t){return typeof t.getSpanJSON=="function"}function vv(t){const{traceFlags:e}=t.spanContext();return e===_p}function bv(t){if(!(!t||t.code===Qw))return t.code===Zw?"ok":t.message||"internal_error"}const Ev="_sentryRootSpan";function yp(t){return t[Ev]||t}function Id(){Cd||(Ui(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),Cd=!0)}function Cv(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=Ce()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function kd(t){E.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function Ad(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(Sv(n)){if(Sr(t.description,n))return k&&kd(t),!0;continue}if(!n.name&&!n.op)continue;const i=n.name?Sr(t.description,n.name):!0,s=n.op?t.op&&Sr(t.op,n.op):!0;if(i&&s)return k&&kd(t),!0}return!1}function Tv(t,e){const n=e.parent_span_id,i=e.span_id;if(n)for(const s of t)s.parent_span_id===i&&(s.parent_span_id=n)}function Sv(t){return typeof t=="string"||t instanceof RegExp}const _l="production",Iv="_frozenDsc";function wp(t,e){const n=e.getOptions(),{publicKey:i}=e.getDsn()||{},s={environment:n.environment||_l,release:n.release,public_key:i,trace_id:t,org_id:fv(e)};return e.emit("createDsc",s),s}function kv(t,e){const n=e.getPropagationContext();return n.dsc||wp(n.traceId,t)}function Av(t){const e=Ce();if(!e)return{};const n=yp(t),i=ml(n),s=i.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??s[Kw]??s[Yw];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[Iv];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&rv(l);if(u)return a(u);const d=wp(t.spanContext().traceId,e),h=s[Gw],f=i.description;return h!=="url"&&f&&(d.transaction=f),Cv()&&(d.sampled=String(vv(n)),d.sample_rand=r?.get("sentry.sample_rand")??gp(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function vt(t,e=100,n=1/0){try{return lc("",t,e,n)}catch(i){return{ERROR:`**non-serializable** (${i})`}}}function vp(t,e=3,n=100*1024){const i=vt(t,e);return Ov(i)>n?vp(t,e-1,n):i}function lc(t,e,n=1/0,i=1/0,s=Lv()){const[r,o]=s;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=Rv(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return lc("",f,c-1,i,s)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=lp(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=i){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=lc(f,p,c-1,i,s),d++}return o(e),u}function Rv(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(rp(e))return np(e);if(Sw(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${on(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=Nv(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function Nv(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function Pv(t){return~-encodeURI(t).split(/%..|./).length}function Ov(t){return Pv(JSON.stringify(t))}function Lv(){const t=new WeakSet;function e(i){return t.has(i)?!0:(t.add(i),!1)}function n(i){t.delete(i)}return[e,n]}function Bi(t,e=[]){return[t,e]}function Dv(t,e){const[n,i]=t;return[n,[...i,e]]}function uc(t,e){const n=t[1];for(const i of n){const s=i[0].type;if(e(i,s))return!0}return!1}function Mv(t,e){return uc(t,(n,i)=>e.includes(i))}function dc(t){const e=To(W);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function xv(t){const[e,n]=t;let i=JSON.stringify(e);function s(r){typeof i=="string"?i=typeof r=="string"?i+r:[dc(i),r]:i.push(typeof r=="string"?dc(r):r)}for(const r of n){const[o,a]=r;if(s(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)s(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(vt(a))}s(c)}}return typeof i=="string"?i:Fv(i)}function Fv(t){const e=t.reduce((s,r)=>s+r.length,0),n=new Uint8Array(e);let i=0;for(const s of t)n.set(s,i),i+=s.length;return n}function Uv(t){const e=typeof t.data=="string"?dc(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const $v={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function Rd(t){return $v[t]}function bp(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function Bv(t,e,n,i){const s=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&i&&{dsn:Xs(i)},...s&&{trace:s}}}function Hv(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Wv(t,e,n,i){const s=bp(n),r={sent_at:new Date().toISOString(),...s&&{sdk:s},...!!i&&e&&{dsn:Xs(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return Bi(r,[o])}function Vv(t,e,n,i){const s=bp(n),r=t.type&&t.type!=="replay_event"?t.type:"event";Hv(t,n?.sdk);const o=Bv(t,s,i,e);return delete t.sdkProcessingMetadata,Bi(o,[[{type:r},t]])}const Ea=0,Nd=1,Pd=2;function Po(t){return new ks(e=>{e(t)})}function yl(t){return new ks((e,n)=>{n(t)})}class ks{constructor(e){this._state=Ea,this._handlers=[],this._runExecutor(e)}then(e,n){return new ks((i,s)=>{this._handlers.push([!1,r=>{if(!e)i(r);else try{i(e(r))}catch(o){s(o)}},r=>{if(!n)s(r);else try{i(n(r))}catch(o){s(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new ks((n,i)=>{let s,r;return this.then(o=>{r=!1,s=o,e&&e()},o=>{r=!0,s=o,e&&e()}).then(()=>{if(r){i(s);return}n(s)})})}_executeHandlers(){if(this._state===Ea)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===Nd&&n[1](this._value),this._state===Pd&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===Ea){if(Gs(o)){o.then(i,s);return}this._state=r,this._value=o,this._executeHandlers()}},i=r=>{n(Nd,r)},s=r=>{n(Pd,r)};try{e(i,s)}catch(r){s(r)}}}function jv(t,e,n,i=0){try{const s=hc(e,n,t,i);return Gs(s)?s:Po(s)}catch(s){return yl(s)}}function hc(t,e,n,i){const s=n[i];if(!t||!s)return t;const r=s({...t},e);return k&&r===null&&E.log(`Event processor "${s.id||"?"}" dropped event`),Gs(r)?r.then(o=>hc(o,e,n,i+1)):hc(r,e,n,i+1)}let bn,Od,Ld,Vt;function qv(t){const e=W._sentryDebugIds,n=W._debugIds;if(!e&&!n)return{};const i=e?Object.keys(e):[],s=n?Object.keys(n):[];if(Vt&&i.length===Od&&s.length===Ld)return Vt;Od=i.length,Ld=s.length,Vt={},bn||(bn={});const r=(o,a)=>{for(const c of o){const l=a[c],u=bn?.[c];if(u&&Vt&&l)Vt[u[0]]=l,bn&&(bn[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&Vt&&bn){Vt[p]=l,bn[c]=[p,l];break}}}}};return e&&r(i,e),n&&r(s,n),Vt}function zv(t,e){const{fingerprint:n,span:i,breadcrumbs:s,sdkProcessingMetadata:r}=e;Kv(t,e),i&&Xv(t,i),Qv(t,n),Yv(t,s),Jv(t,r)}function Dd(t,e){const{extra:n,tags:i,attributes:s,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:_}=e;ns(t,"extra",n),ns(t,"tags",i),ns(t,"attributes",s),ns(t,"user",r),ns(t,"contexts",o),t.sdkProcessingMetadata=Ys(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),_&&(t.span=_),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function ns(t,e,n){t[e]=Ys(t[e],n,1)}function Gv(t,e){const n=jw().getScopeData();return t&&Dd(n,t.getScopeData()),e&&Dd(n,e.getScopeData()),n}function Kv(t,e){const{extra:n,tags:i,user:s,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(i).length&&(t.tags={...i,...t.tags}),Object.keys(s).length&&(t.user={...s,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Yv(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Jv(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Xv(t,e){t.contexts={trace:mv(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:Av(e),...t.sdkProcessingMetadata};const n=yp(e),i=ml(n).description;i&&!t.transaction&&t.type==="transaction"&&(t.transaction=i)}function Qv(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function Zv(t,e,n,i,s,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||qe(),timestamp:e.timestamp||Ks()},l=n.integrations||t.integrations.map(m=>m.name);eb(c,t),ib(c,l),s&&s.emit("applyFrameMetadata",e),e.type===void 0&&tb(c,t.stackParser);const u=rb(i,n.captureContext);n.mechanism&&Ci(c,n.mechanism);const d=s?s.getEventProcessors():[],h=Gv(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),zv(c,h);const p=[...d,...h.eventProcessors];return jv(p,c,n).then(m=>(m&&nb(m),typeof o=="number"&&o>0?sb(m,o,a):m))}function eb(t,e){const{environment:n,release:i,dist:s,maxValueLength:r}=e;t.environment=t.environment||n||_l,!t.release&&i&&(t.release=i),!t.dist&&s&&(t.dist=s);const o=t.request;o?.url&&r&&(o.url=oc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=oc(a.value,r))})}function tb(t,e){const n=qv(e);t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.filename&&(s.debug_id=n[s.filename])})})}function nb(t){const e={};if(t.exception?.values?.forEach(i=>{i.stacktrace?.frames?.forEach(s=>{s.debug_id&&(s.abs_path?e[s.abs_path]=s.debug_id:s.filename&&(e[s.filename]=s.debug_id),delete s.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([i,s])=>{n.push({type:"sourcemap",code_file:i,debug_id:s})})}function ib(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function sb(t,e,n){if(!t)return null;const i={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(s=>({...s,...s.data&&{data:vt(s.data,e,n)}}))},...t.user&&{user:vt(t.user,e,n)},...t.contexts&&{contexts:vt(t.contexts,e,n)},...t.extra&&{extra:vt(t.extra,e,n)}};return t.contexts?.trace&&i.contexts&&(i.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(i.contexts.trace.data=vt(t.contexts.trace.data,e,n))),t.spans&&(i.spans=t.spans.map(s=>({...s,...s.data&&{data:vt(s.data,e,n)}}))),t.contexts?.flags&&i.contexts&&(i.contexts.flags=vt(t.contexts.flags,3,n)),i}function rb(t,e){if(!e)return t;const n=t?t.clone():new Lt;return n.update(e),n}function ob(t,e){return gn().captureException(t,void 0)}function Ep(t,e){return gn().captureEvent(t,e)}function Md(t){const e=Js(),n=gn(),{userAgent:i}=W.navigator||{},s=Dw({user:n.getUser()||e.getUser(),...i&&{userAgent:i},...t}),r=e.getSession();return r?.status==="ok"&&Ti(r,{status:"exited"}),Cp(),e.setSession(s),s}function Cp(){const t=Js(),n=gn().getSession()||t.getSession();n&&Mw(n),Tp(),t.setSession()}function Tp(){const t=Js(),e=Ce(),n=t.getSession();n&&e&&e.captureSession(n)}function xd(t=!1){if(t){Cp();return}Tp()}const ab="7";function cb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function lb(t){return`${cb(t)}${t.projectId}/envelope/`}function ub(t,e){const n={sentry_version:ab};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function db(t,e,n){return e||`${lb(t)}?${ub(t,n)}`}const Fd=[];function hb(t){const e={};return t.forEach(n=>{const{name:i}=n,s=e[i];s&&!s.isDefaultInstance&&n.isDefaultInstance||(e[i]=n)}),Object.values(e)}function fb(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(s=>{s.isDefaultInstance=!0});let i;if(Array.isArray(n))i=[...e,...n];else if(typeof n=="function"){const s=n(e);i=Array.isArray(s)?s:[s]}else i=e;return hb(i)}function pb(t,e){const n={};return e.forEach(i=>{i&&Sp(t,i,n)}),n}function Ud(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Sp(t,e,n){if(n[e.name]){k&&E.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Fd.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Fd.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const i=e.preprocessEvent.bind(e);t.on("preprocessEvent",(s,r)=>i(s,r,t))}if(typeof e.processEvent=="function"){const i=e.processEvent.bind(e),s=Object.assign((r,o)=>i(r,o,t),{id:e.name});t.addEventProcessor(s)}k&&E.log(`Integration installed: ${e.name}`)}function gb(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function mb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=Xs(i)),Bi(s,[gb(t)])}function Ip(t,e){const n=e??_b(t)??[];if(n.length===0)return;const i=t.getOptions(),s=mb(n,i._metadata,i.tunnel,t.getDsn());kp().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(s)}function _b(t){return kp().get(t)}function kp(){return Fi("clientToLogBufferMap",()=>new WeakMap)}function yb(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function wb(t,e,n,i){const s={};return e?.sdk&&(s.sdk={name:e.sdk.name,version:e.sdk.version}),n&&i&&(s.dsn=Xs(i)),Bi(s,[yb(t)])}function Ap(t,e){const n=e??vb(t)??[];if(n.length===0)return;const i=t.getOptions(),s=wb(n,i._metadata,i.tunnel,t.getDsn());Rp().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(s)}function vb(t){return Rp().get(t)}function Rp(){return Fi("clientToMetricBufferMap",()=>new WeakMap)}const wl=Symbol.for("SentryBufferFullError");function vl(t=100){const e=new Set;function n(){return e.size<t}function i(o){e.delete(o)}function s(o){if(!n())return yl(wl);const a=o();return e.add(a),a.then(()=>i(a),()=>i(a)),a}function r(o){if(!e.size)return Po(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:s,drain:r}}const bb=60*1e3;function Eb(t,e=Ro()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const i=Date.parse(`${t}`);return isNaN(i)?bb:i-e}function Cb(t,e){return t[e]||t.all||0}function Tb(t,e,n=Ro()){return Cb(t,e)>n}function Sb(t,{statusCode:e,headers:n},i=Ro()){const s={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)s.all=i+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(s[f]=i+h):s[f]=i+h}else o?s.all=i+Eb(o,i):e===429&&(s.all=i+60*1e3);return s}const Np=64;function Ib(t,e,n=vl(t.bufferSize||Np)){let i={};const s=o=>n.drain(o);function r(o){const a=[];if(uc(o,(d,h)=>{const f=Rd(h);Tb(i,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=Bi(o[0],a),l=d=>{if(Mv(c,["client_report"])){k&&E.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}uc(c,(h,f)=>{t.recordDroppedEvent(d,Rd(f))})},u=()=>e({body:xv(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&k&&E.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),i=Sb(i,d),d),d=>{throw l("network_error"),k&&E.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===wl)return k&&E.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:s}}function kb(t,e,n){const i=[{type:"client_report"},{timestamp:Ks(),discarded_events:t}];return Bi(e?{dsn:e}:{},[i])}function Pp(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function Ab(t){const{trace_id:e,parent_span_id:n,span_id:i,status:s,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:i??"",start_timestamp:t.start_timestamp??0,status:s,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[fp],exclusive_time:o?.[pp],measurements:t.measurements,is_segment:!0}}function Rb(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[fp]:t.profile_id},...t.exclusive_time&&{[pp]:t.exclusive_time}}}},measurements:t.measurements}}const $d="Not capturing exception because it's already been captured.",Bd="Discarded session because of missing or non-string release",Op=Symbol.for("SentryInternalError"),Lp=Symbol.for("SentryDoNotSendEventError"),Nb=5e3;function Ir(t){return{message:t,[Op]:!0}}function Ca(t){return{message:t,[Lp]:!0}}function Hd(t){return!!t&&typeof t=="object"&&Op in t}function Wd(t){return!!t&&typeof t=="object"&&Lp in t}function Vd(t,e,n,i,s){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=i(c),r>=8e5?s(t):a||(a=!0,o=setTimeout(()=>{s(t)},Nb))}),t.on("flush",()=>{s(t)})}class Pb{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=vl(e.transportOptions?.bufferSize??Np),e.dsn?this._dsn=pv(e.dsn):k&&E.warn("No DSN provided, client will not send events."),this._dsn){const i=db(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:i})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&Vd(this,"afterCaptureLog","flushLogs",Mb,Ip),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Vd(this,"afterCaptureMetric","flushMetrics",Db,Ap)}captureException(e,n,i){const s=qe();if(md(e))return k&&E.log($d),s;const r={event_id:s,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,i)).then(o=>o),"error"),r.event_id}captureMessage(e,n,i,s){const r={event_id:qe(),...i},o=dl(e)?e:String(e),a=Io(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,s)),a?"unknown":"error"),r.event_id}captureEvent(e,n,i){const s=qe();if(n?.originalException&&md(n.originalException))return k&&E.log($d),s;const r={event_id:s,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=jd(e.type);return this._process(()=>this._captureEvent(e,r,a||i,c),l),r.event_id}captureSession(e){this.sendSession(e),Ti(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const i=await this._isClientDoneProcessing(e),s=await n.flush(e);return i&&s}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Sp(this,e,this._integrations),n||Ud(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let i=Vv(e,this._dsn,this._options._metadata,this._options.tunnel);for(const s of n.attachments||[])i=Dv(i,Uv(s));this.sendEnvelope(i).then(s=>this.emit("afterSendEvent",e,s))}sendSession(e){const{release:n,environment:i=_l}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){k&&E.warn(Bd);return}r.release=r.release||n,r.environment=r.environment||i,e.attrs=r}else{if(!e.release&&!n){k&&E.warn(Bd);return}e.release=e.release||n,e.environment=e.environment||i}this.emit("beforeSendSession",e);const s=Wv(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(s)}recordDroppedEvent(e,n,i=1){if(this._options.sendClientReports){const s=`${e}:${n}`;k&&E.log(`Recording outcome: "${s}"${i>1?` (${i} times)`:""}`),this._outcomes[s]=(this._outcomes[s]||0)+i}}on(e,n){const i=this._hooks[e]=this._hooks[e]||new Set,s=(...r)=>n(...r);return i.add(s),()=>{i.delete(s)}}emit(e,...n){const i=this._hooks[e];i&&i.forEach(s=>s(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return k&&E.error("Error while sending envelope:",n),{}}return k&&E.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=pb(this,e),Ud(this,e)}_updateSessionFromEvent(e,n){let i=n.level==="fatal",s=!1;const r=n.exception?.values;if(r){s=!0,i=!1;for(const c of r)if(c.mechanism?.handled===!1){i=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&i)&&(Ti(e,{...i&&{status:"crashed"},errors:e.errors||Number(s||i)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(i=>setTimeout(i,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,i,s){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||s.setLastEventId(e.event_id||n.event_id),Zv(r,e,n,i,this,s).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:zw(i),...a.contexts};const c=kv(this,i);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},i=gn(),s=Js()){return k&&fc(e)&&E.log(`Captured error event \`${Pp(e)[0]||"<unknown>"}\``),this._processEvent(e,n,i,s).then(r=>r.event_id,r=>{k&&(Wd(r)?E.log(r.message):Hd(r)?E.warn(r.message):E.warn(r))})}_processEvent(e,n,i,s){const r=this.getOptions(),{sampleRate:o}=r,a=Dp(e),c=fc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:gv(o);if(c&&typeof d=="number"&&$r()>d)return this.recordDroppedEvent("sample_rate","error"),yl(Ca(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=jd(e.type);return this._prepareEvent(e,n,i,s).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ca("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const _=Lb(this,r,f,n);return Ob(_,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const R=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",R)}throw Ca(`${u} returned \`null\`, will not send event.`)}const p=i.getSession()||s.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,R=f.spans?f.spans.length:0,B=m-R;B>0&&this.recordDroppedEvent("before_send","span",B)}const _=f.transaction_info;if(a&&_&&f.transaction!==e.transaction){const m="custom";f.transaction_info={..._,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Wd(f)||Hd(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Ir(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(i=>(this._numProcessing--,i),i=>(this._numProcessing--,i===wl&&this.recordDroppedEvent("queue_overflow",n),i))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,i])=>{const[s,r]=n.split(":");return{reason:s,category:r,quantity:i}})}_flushOutcomes(){k&&E.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){k&&E.log("No outcomes to send");return}if(!this._dsn){k&&E.log("No dsn provided, will not send outcomes");return}k&&E.log("Sending outcomes:",e);const n=kb(e,this._options.tunnel&&Xs(this._dsn));this.sendEnvelope(n)}}function jd(t){return t==="replay_event"?"replay":t||"error"}function Ob(t,e){const n=`${e} must return \`null\` or a valid event.`;if(Gs(t))return t.then(i=>{if(!Is(i)&&i!==null)throw Ir(n);return i},i=>{throw Ir(`${e} rejected with ${i}`)});if(!Is(t)&&t!==null)throw Ir(n);return t}function Lb(t,e,n,i){const{beforeSend:s,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(fc(c)&&s)return s(c,i);if(Dp(c)){if(o||a){const l=Ab(c);if(a?.length&&Ad(l,a))return null;if(o){const u=o(l);u?c=Ys(n,Rb(u)):Id()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&Ad(f,a)){Tv(d,f);continue}if(o){const p=o(f);p?u.push(p):(Id(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,i)}}return c}function fc(t){return t.type===void 0}function Dp(t){return t.type==="transaction"}function Db(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+Mp(t.attributes)}function Mb(t){let e=0;return t.message&&(e+=t.message.length*2),e+Mp(t.attributes)}function Mp(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*qd(n[0]):Io(n)?e+=qd(n):e+=100}),e}function qd(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function xb(t){return So(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function zd(t){return xb(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function Fb(t,e){e.debug===!0&&(k?E.enable():Ui(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),gn().update(e.initialScope);const i=new t(e);return Ub(i),i.init(),i}function Ub(t){gn().setClient(t)}function Ta(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",i=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:i,relative:e[5]+n+i}}function $b(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function Bb(t,e,n=[e],i="npm"){const s=t._metadata||{};s.sdk||(s.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${i}:@sentry/${r}`,version:On})),version:On}),t._metadata=s}const Hb=100;function Un(t,e){const n=Ce(),i=Js();if(!n)return;const{beforeBreadcrumb:s=null,maxBreadcrumbs:r=Hb}=n.getOptions();if(r<=0)return;const a={timestamp:Ks(),...t},c=s?Ui(()=>s(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),i.addBreadcrumb(c,r))}let Gd;const Wb="FunctionToString",Kd=new WeakMap,Vb=(()=>({name:Wb,setupOnce(){Gd=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=pl(this),n=Kd.has(Ce())&&e!==void 0?e:this;return Gd.apply(n,t)}}catch{}},setup(t){Kd.set(t,!0)}})),jb=Vb,qb=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],zb="EventFilters",Gb=(t={})=>{let e;return{name:zb,setup(n){const i=n.getOptions();e=Yd(t,i)},processEvent(n,i,s){if(!e){const r=s.getOptions();e=Yd(t,r)}return Yb(n,e)?null:n}}},Kb=((t={})=>({...Gb(t),name:"InboundFilters"}));function Yd(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:qb],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function Yb(t,e){if(t.type){if(t.type==="transaction"&&Xb(t,e.ignoreTransactions))return k&&E.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${kn(t)}`),!0}else{if(Jb(t,e.ignoreErrors))return k&&E.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${kn(t)}`),!0;if(tE(t))return k&&E.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${kn(t)}`),!0;if(Qb(t,e.denyUrls))return k&&E.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${kn(t)}.
Url: ${Br(t)}`),!0;if(!Zb(t,e.allowUrls))return k&&E.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${kn(t)}.
Url: ${Br(t)}`),!0}return!1}function Jb(t,e){return e?.length?Pp(t).some(n=>No(n,e)):!1}function Xb(t,e){if(!e?.length)return!1;const n=t.transaction;return n?No(n,e):!1}function Qb(t,e){if(!e?.length)return!1;const n=Br(t);return n?No(n,e):!1}function Zb(t,e){if(!e?.length)return!0;const n=Br(t);return n?No(n,e):!0}function eE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function Br(t){try{const n=[...t.exception?.values??[]].reverse().find(i=>i.mechanism?.parent_id===void 0&&i.stacktrace?.frames?.length)?.stacktrace?.frames;return n?eE(n):null}catch{return k&&E.error(`Cannot extract url for event ${kn(t)}`),null}}function tE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function nE(t,e,n,i,s,r){if(!s.exception?.values||!r||!an(r.originalException,Error))return;const o=s.exception.values.length>0?s.exception.values[s.exception.values.length-1]:void 0;o&&(s.exception.values=pc(t,e,i,r.originalException,n,s.exception.values,o,0))}function pc(t,e,n,i,s,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(an(i[s],Error)){Jd(o,a);const l=t(e,i[s]),u=c.length;Xd(l,s,u,a),c=pc(t,e,n,i[s],s,[l,...c],l,u)}return Array.isArray(i.errors)&&i.errors.forEach((l,u)=>{if(an(l,Error)){Jd(o,a);const d=t(e,l),h=c.length;Xd(d,`errors[${u}]`,h,a),c=pc(t,e,n,l,s,[d,...c],d,h)}}),c}function Jd(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Xd(t,e,n,i){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:i}}function iE(t){const e="console";Zn(e,t),ei(e,sE)}function sE(){"console"in W&&lw.forEach(function(t){t in W.console&&Fe(W.console,t,function(e){return Ur[t]=e,function(...n){st("console",{args:n,level:t}),Ur[t]?.apply(W.console,n)}})})}function rE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const oE="Dedupe",aE=(()=>{let t;return{name:oE,processEvent(e){if(e.type)return e;try{if(lE(e,t))return k&&E.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),cE=aE;function lE(t,e){return e?!!(uE(t,e)||dE(t,e)):!1}function uE(t,e){const n=t.message,i=e.message;return!(!n&&!i||n&&!i||!n&&i||n!==i||!Fp(t,e)||!xp(t,e))}function dE(t,e){const n=Qd(e),i=Qd(t);return!(!n||!i||n.type!==i.type||n.value!==i.value||!Fp(t,e)||!xp(t,e))}function xp(t,e){let n=ud(t),i=ud(e);if(!n&&!i)return!0;if(n&&!i||!n&&i||(n=n,i=i,i.length!==n.length))return!1;for(let s=0;s<i.length;s++){const r=i[s],o=n[s];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function Fp(t,e){let n=t.fingerprint,i=e.fingerprint;if(!n&&!i)return!0;if(n&&!i||!n&&i)return!1;n=n,i=i;try{return n.join("")===i.join("")}catch{return!1}}function Qd(t){return t.exception?.values?.[0]}function Up(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const As=W;function hE(){return"history"in As&&!!As.history}function fE(){if(!("fetch"in As))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function gc(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function pE(){if(typeof EdgeRuntime=="string")return!0;if(!fE())return!1;if(gc(As.fetch))return!0;let t=!1;const e=As.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=gc(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){k&&E.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function gE(t,e){const n="fetch";Zn(n,t),ei(n,()=>mE(void 0,e))}function mE(t,e=!1){e&&!pE()||Fe(W,"fetch",function(n){return function(...i){const s=new Error,{method:r,url:o}=_E(i),a={args:i,fetchData:{method:r,url:o},startTimestamp:Rt()*1e3,virtualError:s,headers:yE(i)};return st("fetch",{...a}),n.apply(W,i).then(async c=>(st("fetch",{...a,endTimestamp:Rt()*1e3,response:c}),c),c=>{st("fetch",{...a,endTimestamp:Rt()*1e3,error:c}),So(c)&&c.stack===void 0&&(c.stack=s.stack,cn(c,"framesToPop",1));const u=Ce()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:cn(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function kr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Zd(t){return typeof t=="string"?t:t?kr(t,"url")?t.url:t.toString?t.toString():"":""}function _E(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,i]=t;return{url:Zd(n),method:kr(i,"method")?String(i.method).toUpperCase():op(n)&&kr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:Zd(e),method:kr(e,"method")?String(e.method).toUpperCase():"GET"}}function yE(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(op(e))return new Headers(e.headers)}catch{}}function wE(){return"npm"}const ie=W;let mc=0;function $p(){return mc>0}function vE(){mc++,setTimeout(()=>{mc--})}function Ii(t,e={}){function n(s){return typeof s=="function"}if(!n(t))return t;try{const s=t.__sentry_wrapped__;if(s)return typeof s=="function"?s:t;if(pl(t))return t}catch{return t}const i=function(...s){try{const r=s.map(o=>Ii(o,e));return t.apply(this,r)}catch(r){throw vE(),qw(o=>{o.addEventProcessor(a=>(e.mechanism&&(ac(a,void 0),Ci(a,e.mechanism)),a.extra={...a.extra,arguments:s},a)),ob(r)}),r}};try{for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s])}catch{}cp(i,t),cn(t,"__sentry_wrapped__",i);try{Object.getOwnPropertyDescriptor(i,"name").configurable&&Object.defineProperty(i,"name",{get(){return t.name}})}catch{}return i}function bE(){const t=fl(),{referrer:e}=ie.document||{},{userAgent:n}=ie.navigator||{},i={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:i}}function bl(t,e){const n=El(t,e),i={type:IE(e),value:kE(e)};return n.length&&(i.stacktrace={frames:n}),i.type===void 0&&i.value===""&&(i.value="Unrecoverable error caught"),i}function EE(t,e,n,i){const r=Ce()?.getOptions().normalizeDepth,o=OE(e),a={__serialized__:vp(e,r)};if(o)return{exception:{values:[bl(t,o)]},extra:a};const c={exception:{values:[{type:ko(e)?e.constructor.name:i?"UnhandledRejection":"Error",value:NE(e,{isUnhandledRejection:i})}]},extra:a};if(n){const l=El(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function Sa(t,e){return{exception:{values:[bl(t,e)]}}}function El(t,e){const n=e.stacktrace||e.stack||"",i=TE(e),s=SE(e);try{return t(n,i,s)}catch{}return[]}const CE=/Minified React error #\d+;/i;function TE(t){return t&&CE.test(t.message)?1:0}function SE(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Bp(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function IE(t){const e=t?.name;return!e&&Bp(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function kE(t){const e=t?.message;return Bp(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?zd(e.error):zd(t):"No error message"}function AE(t,e,n,i){const s=n?.syntheticException||void 0,r=Cl(t,e,s,i);return Ci(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),Po(r)}function RE(t,e,n="info",i,s){const r=i?.syntheticException||void 0,o=_c(t,e,r,s);return o.level=n,i?.event_id&&(o.event_id=i.event_id),Po(o)}function Cl(t,e,n,i,s){let r;if(sp(e)&&e.error)return Sa(t,e.error);if(hd(e)||Ew(e)){const o=e;if("stack"in e)r=Sa(t,e);else{const a=o.name||(hd(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=_c(t,c,n,i),ac(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return So(e)?Sa(t,e):Is(e)||ko(e)?(r=EE(t,e,n,s),Ci(r,{synthetic:!0}),r):(r=_c(t,e,n,i),ac(r,`${e}`),Ci(r,{synthetic:!0}),r)}function _c(t,e,n,i){const s={};if(i&&n){const r=El(t,n);r.length&&(s.exception={values:[{value:e,stacktrace:{frames:r}}]}),Ci(s,{synthetic:!0})}if(dl(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return s.logentry={message:r,params:o},s}return s.message=e,s}function NE(t,{isUnhandledRejection:e}){const n=Rw(t),i=e?"promise rejection":"exception";return sp(t)?`Event \`ErrorEvent\` captured as ${i} with message \`${t.message}\``:ko(t)?`Event \`${PE(t)}\` (type=${t.type}) captured as ${i}`:`Object captured as ${i} with keys: ${n}`}function PE(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function OE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class LE extends Pb{constructor(e){const n=DE(e),i=ie.SENTRY_SDK_SOURCE||wE();Bb(n,"browser",["browser"],i),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:s,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;ie.document&&(r||o||l)&&ie.document.addEventListener("visibilitychange",()=>{ie.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&Ip(this),l&&Ap(this))}),s&&this.on("beforeSendSession",$b)}eventFromException(e,n){return AE(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",i){return RE(this._options.stackParser,e,n,i,this._options.attachStacktrace)}_prepareEvent(e,n,i,s){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,i,s)}}function DE(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:ie.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const ME=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Ie=W,xE=1e3;let eh,yc,wc;function FE(t){Zn("dom",t),ei("dom",UE)}function UE(){if(!Ie.document)return;const t=st.bind(null,"dom"),e=th(t,!0);Ie.document.addEventListener("click",e,!1),Ie.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const s=Ie[n]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(Fe(s,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=th(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),Fe(s,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function $E(t){if(t.type!==yc)return!1;try{if(!t.target||t.target._sentryId!==wc)return!1}catch{}return!0}function BE(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function th(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const i=HE(n);if(BE(n.type,i))return;cn(n,"_sentryCaptured",!0),i&&!i._sentryId&&cn(i,"_sentryId",qe());const s=n.type==="keypress"?"input":n.type;$E(n)||(t({event:n,name:s,global:e}),yc=n.type,wc=i?i._sentryId:void 0),clearTimeout(eh),eh=Ie.setTimeout(()=>{wc=void 0,yc=void 0},xE)}}function HE(t){try{return t.target}catch{return null}}let hr;function Hp(t){const e="history";Zn(e,t),ei(e,WE)}function WE(){if(Ie.addEventListener("popstate",()=>{const e=Ie.location.href,n=hr;if(hr=e,n===e)return;st("history",{from:n,to:e})}),!hE())return;function t(e){return function(...n){const i=n.length>2?n[2]:void 0;if(i){const s=hr,r=VE(String(i));if(hr=r,s===r)return e.apply(this,n);st("history",{from:s,to:r})}return e.apply(this,n)}}Fe(Ie.history,"pushState",t),Fe(Ie.history,"replaceState",t)}function VE(t){try{return new URL(t,Ie.location.origin).toString()}catch{return t}}const Ar={};function jE(t){const e=Ar[t];if(e)return e;let n=Ie[t];if(gc(n))return Ar[t]=n.bind(Ie);const i=Ie.document;if(i&&typeof i.createElement=="function")try{const s=i.createElement("iframe");s.hidden=!0,i.head.appendChild(s);const r=s.contentWindow;r?.[t]&&(n=r[t]),i.head.removeChild(s)}catch(s){ME&&E.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,s)}return n&&(Ar[t]=n.bind(Ie))}function qE(t){Ar[t]=void 0}const us="__sentry_xhr_v3__";function zE(t){Zn("xhr",t),ei("xhr",GE)}function GE(){if(!Ie.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,i){const s=new Error,r=Rt()*1e3,o=At(i[0])?i[0].toUpperCase():void 0,a=KE(i[1]);if(!o||!a)return e.apply(n,i);n[us]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[us];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Rt()*1e3,startTimestamp:r,xhr:n,virtualError:s};st("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[us];return p&&At(h)&&At(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,i)}}),t.send=new Proxy(t.send,{apply(e,n,i){const s=n[us];if(!s)return e.apply(n,i);i[0]!==void 0&&(s.body=i[0]);const r={startTimestamp:Rt()*1e3,xhr:n};return st("xhr",r),e.apply(n,i)}})}function KE(t){if(At(t))return t;try{return t.toString()}catch{}}const YE=40;function JE(t,e=jE("fetch")){let n=0,i=0;async function s(r){const o=r.body.length;n+=o,i++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&i<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw qE("fetch"),c}finally{n-=o,i--}}return Ib(t,s,vl(t.bufferSize||YE))}const Oo=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,XE=30,QE=50;function vc(t,e,n,i){const s={filename:t,function:e==="<anonymous>"?Fn:e,in_app:!0};return n!==void 0&&(s.lineno=n),i!==void 0&&(s.colno=i),s}const ZE=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,eC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,tC=/\((\S*)(?::(\d+))(?::(\d+))\)/,nC=/at (.+?) ?\(data:(.+?),/,iC=t=>{const e=t.match(nC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=ZE.exec(t);if(n){const[,s,r,o]=n;return vc(s,Fn,+r,+o)}const i=eC.exec(t);if(i){if(i[2]&&i[2].indexOf("eval")===0){const a=tC.exec(i[2]);a&&(i[2]=a[1],i[3]=a[2],i[4]=a[3])}const[r,o]=Wp(i[1]||Fn,i[2]);return vc(o,r,i[3]?+i[3]:void 0,i[4]?+i[4]:void 0)}},sC=[XE,iC],rC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,oC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,aC=t=>{const e=rC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=oC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let i=e[3],s=e[1]||Fn;return[s,i]=Wp(s,i),vc(i,s,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},cC=[QE,aC],lC=[sC,cC],uC=tp(...lC),Wp=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,i=t.indexOf("safari-web-extension")!==-1;return n||i?[t.indexOf("@")!==-1?t.split("@")[0]:Fn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},fr=1024,dC="Breadcrumbs",hC=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:dC,setup(n){e.console&&iE(mC(n)),e.dom&&FE(gC(n,e.dom)),e.xhr&&zE(_C(n)),e.fetch&&gE(yC(n)),e.history&&Hp(wC(n)),e.sentry&&n.on("beforeSendEvent",pC(n))}}}),fC=hC;function pC(t){return function(n){Ce()===t&&Un({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:kn(n)},{event:n})}}function gC(t,e){return function(i){if(Ce()!==t)return;let s,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>fr&&(Oo&&E.warn(`\`dom.maxStringLength\` cannot exceed ${fr}, but a value of ${a} was configured. Sentry will use ${fr} instead.`),a=fr),typeof o=="string"&&(o=[o]);try{const l=i.event,u=vC(l)?l.target:l;s=ap(u,{keyAttrs:o,maxStringLength:a}),r=Aw(u)}catch{s="<unknown>"}if(s.length===0)return;const c={category:`ui.${i.name}`,message:s};r&&(c.data={"ui.component_name":r}),Un(c,{event:i.event,name:i.name,global:i.global})}}function mC(t){return function(n){if(Ce()!==t)return;const i={category:"console",data:{arguments:n.args,logger:"console"},level:rE(n.level),message:gd(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)i.message=`Assertion failed: ${gd(n.args.slice(1)," ")||"console.assert"}`,i.data.arguments=n.args.slice(1);else return;Un(i,{input:n.args,level:n.level})}}function _C(t){return function(n){if(Ce()!==t)return;const{startTimestamp:i,endTimestamp:s}=n,r=n.xhr[us];if(!i||!s||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:i,endTimestamp:s},h={category:"xhr",data:u,type:"http",level:Up(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Un(h,d)}}function yC(t){return function(n){if(Ce()!==t)return;const{startTimestamp:i,endTimestamp:s}=n;if(s&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:i,endTimestamp:s},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Un(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:i,endTimestamp:s},c={category:"fetch",data:o,type:"http",level:Up(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Un(c,a)}}}function wC(t){return function(n){if(Ce()!==t)return;let i=n.from,s=n.to;const r=Ta(ie.location.href);let o=i?Ta(i):void 0;const a=Ta(s);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(s=a.relative),r.protocol===o.protocol&&r.host===o.host&&(i=o.relative),Un({category:"navigation",data:{from:i,to:s}})}}function vC(t){return!!t&&!!t.target}const bC=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],EC="BrowserApiErrors",CC=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:EC,setupOnce(){e.setTimeout&&Fe(ie,"setTimeout",nh),e.setInterval&&Fe(ie,"setInterval",nh),e.requestAnimationFrame&&Fe(ie,"requestAnimationFrame",SC),e.XMLHttpRequest&&"XMLHttpRequest"in ie&&Fe(XMLHttpRequest.prototype,"send",IC);const n=e.eventTarget;n&&(Array.isArray(n)?n:bC).forEach(s=>kC(s,e))}}}),TC=CC;function nh(t){return function(...e){const n=e[0];return e[0]=Ii(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${on(t)}`}}),t.apply(this,e)}}function SC(t){return function(e){return t.apply(this,[Ii(e,{mechanism:{data:{handler:on(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function IC(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(s=>{s in n&&typeof n[s]=="function"&&Fe(n,s,function(r){const o={mechanism:{data:{handler:on(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${s}`}},a=pl(r);return a&&(o.mechanism.data.handler=on(a)),Ii(r,o)})}),t.apply(this,e)}}function kC(t,e){const i=ie[t]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Fe(i,"addEventListener",function(s){return function(r,o,a){try{AC(o)&&(o.handleEvent=Ii(o.handleEvent,{mechanism:{data:{handler:on(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&RC(this,r,o),s.apply(this,[r,Ii(o,{mechanism:{data:{handler:on(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Fe(i,"removeEventListener",function(s){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&s.call(this,r,c,a)}catch{}return s.call(this,r,o,a)}}))}function AC(t){return typeof t.handleEvent=="function"}function RC(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const NC=()=>({name:"BrowserSession",setupOnce(){if(typeof ie.document>"u"){Oo&&E.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}Md({ignoreDuration:!0}),xd(),Hp(({from:t,to:e})=>{t!==void 0&&t!==e&&(Md({ignoreDuration:!0}),xd())})}}),PC="GlobalHandlers",OC=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:PC,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(DC(n),ih("onerror")),e.onunhandledrejection&&(MC(n),ih("onunhandledrejection"))}}}),LC=OC;function DC(t){yw(e=>{const{stackParser:n,attachStacktrace:i}=Vp();if(Ce()!==t||$p())return;const{msg:s,url:r,line:o,column:a,error:c}=e,l=UC(Cl(n,c||s,void 0,i,!1),r,o,a);l.level="error",Ep(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function MC(t){vw(e=>{const{stackParser:n,attachStacktrace:i}=Vp();if(Ce()!==t||$p())return;const s=xC(e),r=Io(s)?FC(s):Cl(n,s,void 0,i,!0);r.level="error",Ep(r,{originalException:s,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function xC(t){if(Io(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function FC(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function UC(t,e,n,i){const s=t.exception=t.exception||{},r=s.values=s.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=i,u=n,d=$C(e)??fl();return c.length===0&&c.push({colno:l,filename:d,function:Fn,in_app:!0,lineno:u}),t}function ih(t){Oo&&E.log(`Global Handler attached: ${t}`)}function Vp(){return Ce()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function $C(t){if(!(!At(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",i=t.includes("base64,");return`<data:${n}${i?",base64":""}>`}return t}}const BC=()=>({name:"HttpContext",preprocessEvent(t){if(!ie.navigator&&!ie.location&&!ie.document)return;const e=bE(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),HC="cause",WC=5,VC="LinkedErrors",jC=((t={})=>{const e=t.limit||WC,n=t.key||HC;return{name:VC,preprocessEvent(i,s,r){const o=r.getOptions();nE(bl,o.stackParser,n,e,i,s)}}}),qC=jC;function zC(){return GC()?(Oo&&Ui(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function GC(){if(typeof ie.window>"u")return!1;const t=ie;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=fl(),i=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(ie===ie.top&&i.some(r=>n.startsWith(`${r}://`)))}function KC(t){return[Kb(),jb(),TC(),fC(),LC(),qC(),cE(),BC(),NC()]}function YC(t={}){const e=!t.skipBrowserExtensionCheck&&zC();let n=t.defaultIntegrations==null?KC():t.defaultIntegrations;const i={...t,enabled:e?!1:t.enabled,stackParser:mw(t.stackParser||uC),integrations:fb({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||JE};return Fb(LE,i)}const JC="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";YC({dsn:JC,sendDefaultPii:!0});/**
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
 */const XC=()=>{};var sh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jp={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw Hi(e)},Hi=function(t){return new Error("Firebase Database ("+jp.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},QC=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Lo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,c=s+2<t.length,l=c?t[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(n[u],n[d],n[h],n[f])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(qp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):QC(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const l=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new ZC;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const p=l<<6&192|d;i.push(p)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ZC extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zp=function(t){const e=qp(t);return Lo.encodeByteArray(e,!0)},Hr=function(t){return zp(t).replace(/\./g,"")},Wr=function(t){try{return Lo.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eT(t){return Gp(void 0,t)}function Gp(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!tT(n)||(t[n]=Gp(t[n],e[n]));return t}function tT(t){return t!=="__proto__"}/**
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
 */function Kp(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const nT=()=>Kp().__FIREBASE_DEFAULTS__,iT=()=>{if(typeof process>"u"||typeof sh>"u")return;const t=sh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},sT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Wr(t[1]);return e&&JSON.parse(e)},Tl=()=>{try{return XC()||nT()||iT()||sT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Yp=t=>Tl()?.emulatorHosts?.[t],rT=t=>{const e=Yp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Jp=()=>Tl()?.config,Xp=t=>Tl()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
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
 */function Wi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Qp(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function oT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[Hr(JSON.stringify(n)),Hr(JSON.stringify(o)),""].join(".")}const hs={};function aT(){const t={prod:[],emulator:[]};for(const e of Object.keys(hs))hs[e]?t.emulator.push(e):t.prod.push(e);return t}function cT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let rh=!1;function Zp(t,e){if(typeof window>"u"||typeof document>"u"||!Wi(window.location.host)||hs[t]===e||hs[t]||rh)return;hs[t]=e;function n(h){return`__firebase__banner__${h}`}const i="__firebase__banner",r=aT().prod.length>0;function o(){const h=document.getElementById(i);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{rh=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=cT(i),f=n("text"),p=document.getElementById(f)||document.createElement("span"),_=n("learnmore"),m=document.getElementById(_)||document.createElement("a"),R=n("preprendIcon"),B=document.getElementById(R)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const N=h.element;a(N),u(m,_);const b=l();c(B,R),N.append(B,p,m,b),document.body.appendChild(N)}r?(p.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(B.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
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
 */function Ne(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Sl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ne())}function lT(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uT(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function eg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dT(){const t=Ne();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function hT(){return jp.NODE_ADMIN===!0}function Do(){try{return typeof indexedDB=="object"}catch{return!1}}function tg(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(n){e(n)}})}function fT(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT="FirebaseError";class $t extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=pT,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,mn.prototype.create)}}class mn{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?gT(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new $t(s,a,i)}}function gT(t,e){return t.replace(mT,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const mT=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(t){return JSON.parse(t)}function ce(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ng=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=Rs(Wr(r[0])||""),n=Rs(Wr(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},_T=function(t){const e=ng(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},yT=function(t){const e=ng(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function ki(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Vr(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function jr(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function $n(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(oh(r)&&oh(o)){if(!$n(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function oh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vi(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)i[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function vT(t,e){const n=new bT(t,e);return n.subscribe.bind(n)}class bT{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let s;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");ET(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:i},s.next===void 0&&(s.next=Ia),s.error===void 0&&(s.error=Ia),s.complete===void 0&&(s.complete=Ia);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ET(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ia(){}function Ai(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,g(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Mo=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const TT=1e3,ST=2,IT=14400*1e3,kT=.5;function AT(t,e=TT,n=ST){const i=e*Math.pow(n,t),s=Math.round(kT*i*(Math.random()-.5)*2);return Math.min(IT,i+s)}/**
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
 */function ne(t){return t&&t._delegate?t._delegate:t}class Be{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Sn="[DEFAULT]";/**
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
 */class RT{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new Pe;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(PT(e))try{this.getOrInitializeService({instanceIdentifier:Sn})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Sn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Sn){return this.instances.has(e)}getOptions(e=Sn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){const i=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:NT(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Sn){return this.component?this.component.multipleInstances?e:Sn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function NT(t){return t===Sn?void 0:t}function PT(t){return t.instantiationMode==="EAGER"}/**
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
 */class OT{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new RT(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(j||(j={}));const LT={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},DT=j.INFO,MT={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},xT=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=MT[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xo{constructor(e){this.name=e,this._logLevel=DT,this._logHandler=xT,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?LT[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const FT=(t,e)=>e.some(n=>t instanceof n);let ah,ch;function UT(){return ah||(ah=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $T(){return ch||(ch=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ig=new WeakMap,bc=new WeakMap,sg=new WeakMap,ka=new WeakMap,Il=new WeakMap;function BT(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(Nt(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&ig.set(n,t)}).catch(()=>{}),Il.set(e,t),e}function HT(t){if(bc.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});bc.set(t,e)}let Ec={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return bc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||sg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Nt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function WT(t){Ec=t(Ec)}function VT(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(Aa(this),e,...n);return sg.set(i,e.sort?e.sort():[e]),Nt(i)}:$T().includes(t)?function(...e){return t.apply(Aa(this),e),Nt(ig.get(this))}:function(...e){return Nt(t.apply(Aa(this),e))}}function jT(t){return typeof t=="function"?VT(t):(t instanceof IDBTransaction&&HT(t),FT(t,UT())?new Proxy(t,Ec):t)}function Nt(t){if(t instanceof IDBRequest)return BT(t);if(ka.has(t))return ka.get(t);const e=jT(t);return e!==t&&(ka.set(t,e),Il.set(e,t)),e}const Aa=t=>Il.get(t);function Fo(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=Nt(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Nt(o.result),c.oldVersion,c.newVersion,Nt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function Ra(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),Nt(n).then(()=>{})}const qT=["get","getKey","getAll","getAllKeys","count"],zT=["put","add","delete","clear"],Na=new Map;function lh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Na.get(e))return Na.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=zT.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||qT.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),s&&c.done]))[0]};return Na.set(e,r),r}WT(t=>({...t,get:(e,n,i)=>lh(e,n)||t.get(e,n,i),has:(e,n)=>!!lh(e,n)||t.has(e,n)}));/**
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
 */class GT{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(KT(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function KT(t){return t.getComponent()?.type==="VERSION"}const Cc="@firebase/app",uh="0.14.7";/**
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
 */const Dt=new xo("@firebase/app"),YT="@firebase/app-compat",JT="@firebase/analytics-compat",XT="@firebase/analytics",QT="@firebase/app-check-compat",ZT="@firebase/app-check",eS="@firebase/auth",tS="@firebase/auth-compat",nS="@firebase/database",iS="@firebase/data-connect",sS="@firebase/database-compat",rS="@firebase/functions",oS="@firebase/functions-compat",aS="@firebase/installations",cS="@firebase/installations-compat",lS="@firebase/messaging",uS="@firebase/messaging-compat",dS="@firebase/performance",hS="@firebase/performance-compat",fS="@firebase/remote-config",pS="@firebase/remote-config-compat",gS="@firebase/storage",mS="@firebase/storage-compat",_S="@firebase/firestore",yS="@firebase/ai",wS="@firebase/firestore-compat",vS="firebase",bS="12.8.0";/**
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
 */const Tc="[DEFAULT]",ES={[Cc]:"fire-core",[YT]:"fire-core-compat",[XT]:"fire-analytics",[JT]:"fire-analytics-compat",[ZT]:"fire-app-check",[QT]:"fire-app-check-compat",[eS]:"fire-auth",[tS]:"fire-auth-compat",[nS]:"fire-rtdb",[iS]:"fire-data-connect",[sS]:"fire-rtdb-compat",[rS]:"fire-fn",[oS]:"fire-fn-compat",[aS]:"fire-iid",[cS]:"fire-iid-compat",[lS]:"fire-fcm",[uS]:"fire-fcm-compat",[dS]:"fire-perf",[hS]:"fire-perf-compat",[fS]:"fire-rc",[pS]:"fire-rc-compat",[gS]:"fire-gcs",[mS]:"fire-gcs-compat",[_S]:"fire-fst",[wS]:"fire-fst-compat",[yS]:"fire-vertex","fire-js":"fire-js",[vS]:"fire-js-all"};/**
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
 */const qr=new Map,CS=new Map,Sc=new Map;function dh(t,e){try{t.container.addComponent(e)}catch(n){Dt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ye(t){const e=t.name;if(Sc.has(e))return Dt.debug(`There were multiple attempts to register component ${e}.`),!1;Sc.set(e,t);for(const n of qr.values())dh(n,t);for(const n of CS.values())dh(n,t);return!0}function _n(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ze(t){return t==null?!1:t.settings!==void 0}/**
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
 */const TS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},en=new mn("app","Firebase",TS);/**
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
 */class SS{constructor(e,n,i){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Be("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw en.create("app-deleted",{appName:this._name})}}/**
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
 */const ji=bS;function rg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i={name:Tc,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw en.create("bad-app-name",{appName:String(s)});if(n||(n=Jp()),!n)throw en.create("no-options");const r=qr.get(s);if(r){if($n(n,r.options)&&$n(i,r.config))return r;throw en.create("duplicate-app",{appName:s})}const o=new OT(s);for(const c of Sc.values())o.addComponent(c);const a=new SS(n,i,o);return qr.set(s,a),a}function Uo(t=Tc){const e=qr.get(t);if(!e&&t===Tc&&Jp())return rg();if(!e)throw en.create("no-app",{appName:t});return e}function $e(t,e,n){let i=ES[t]??t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Dt.warn(o.join(" "));return}Ye(new Be(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const IS="firebase-heartbeat-database",kS=1,Ns="firebase-heartbeat-store";let Pa=null;function og(){return Pa||(Pa=Fo(IS,kS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ns)}catch(n){console.warn(n)}}}}).catch(t=>{throw en.create("idb-open",{originalErrorMessage:t.message})})),Pa}async function AS(t){try{const n=(await og()).transaction(Ns),i=await n.objectStore(Ns).get(ag(t));return await n.done,i}catch(e){if(e instanceof $t)Dt.warn(e.message);else{const n=en.create("idb-get",{originalErrorMessage:e?.message});Dt.warn(n.message)}}}async function hh(t,e){try{const i=(await og()).transaction(Ns,"readwrite");await i.objectStore(Ns).put(e,ag(t)),await i.done}catch(n){if(n instanceof $t)Dt.warn(n.message);else{const i=en.create("idb-set",{originalErrorMessage:n?.message});Dt.warn(i.message)}}}function ag(t){return`${t.name}!${t.options.appId}`}/**
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
 */const RS=1024,NS=30;class PS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new LS(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=fh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:n}),this._heartbeatsCache.heartbeats.length>NS){const s=DS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Dt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=fh(),{heartbeatsToSend:n,unsentEntries:i}=OS(this._heartbeatsCache.heartbeats),s=Hr(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Dt.warn(e),""}}}function fh(){return new Date().toISOString().substring(0,10)}function OS(t,e=RS){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),ph(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),ph(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class LS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Do()?tg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await AS(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return hh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return hh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ph(t){return Hr(JSON.stringify({version:2,heartbeats:t})).length}function DS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let i=1;i<t.length;i++)t[i].date<n&&(n=t[i].date,e=i);return e}/**
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
 */function MS(t){Ye(new Be("platform-logger",e=>new GT(e),"PRIVATE")),Ye(new Be("heartbeat",e=>new PS(e),"PRIVATE")),$e(Cc,uh,t),$e(Cc,uh,"esm2020"),$e("fire-js","")}MS("");var gh={};const mh="@firebase/database",_h="1.1.0";/**
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
 */let cg="";function lg(t){cg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ce(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Rs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return wt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new xS(e)}}catch{}return new FS},Rn=ug("localStorage"),US=ug("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=new xo("@firebase/database"),$S=(function(){let t=1;return function(){return t++}})(),dg=function(t){const e=CT(t),n=new wT;n.update(e);const i=n.digest();return Lo.encodeByteArray(i)},Qs=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Qs.apply(null,i):typeof i=="object"?e+=ce(i):e+=i,e+=" "}return e};let fs=null,yh=!0;const BS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),ui.logLevel=j.VERBOSE,fs=ui.log.bind(ui)},pe=function(...t){if(yh===!0&&(yh=!1,fs===null&&US.get("logging_enabled")===!0&&BS()),fs){const e=Qs.apply(null,t);fs(e)}},Zs=function(t){return function(...e){pe(t,...e)}},Ic=function(...t){const e="FIREBASE INTERNAL ERROR: "+Qs(...t);ui.error(e)},Mt=function(...t){const e=`FIREBASE FATAL ERROR: ${Qs(...t)}`;throw ui.error(e),new Error(e)},Re=function(...t){const e="FIREBASE WARNING: "+Qs(...t);ui.warn(e)},HS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Re("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},$o=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},WS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Ri="[MIN_NAME]",Bn="[MAX_NAME]",ti=function(t,e){if(t===e)return 0;if(t===Ri||e===Bn)return-1;if(e===Ri||t===Bn)return 1;{const n=wh(t),i=wh(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},VS=function(t,e){return t===e?0:t<e?-1:1},is=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ce(e))},kl=function(t){if(typeof t!="object"||t===null)return ce(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=ce(e[i]),n+=":",n+=kl(t[e[i]]);return n+="}",n},hg=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function ye(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const fg=function(t){g(!$o(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,c;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},jS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},qS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function zS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const GS=new RegExp("^-?(0*)\\d{1,10}$"),KS=-2147483648,YS=2147483647,wh=function(t){if(GS.test(t)){const e=Number(t);if(e>=KS&&e<=YS)return e}return null},qi=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Re("Exception was thrown by user callback.",n),e},Math.floor(0))}},JS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},ps=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class XS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Ze(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Re(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(pe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Re(e)}}class Rr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Rr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Al="5",pg="v",gg="s",mg="r",_g="f",yg=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,wg="ls",vg="p",kc="ac",bg="websocket",Eg="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cg{constructor(e,n,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Rn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Rn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function ZS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Tg(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let i;if(e===bg)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Eg)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ZS(t)&&(n.ns=t.namespace);const s=[];return ye(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eI{constructor(){this.counters_={}}incrementCounter(e,n=1){wt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return eT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa={},La={};function Rl(t){const e=t.toString();return Oa[e]||(Oa[e]=new eI),Oa[e]}function tI(t,e){const n=t.toString();return La[n]||(La[n]=e()),La[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&qi(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh="start",iI="close",sI="pLPCommand",rI="pRTLPCB",Sg="id",Ig="pw",kg="ser",oI="cb",aI="seg",cI="ts",lI="d",uI="dframe",Ag=1870,Rg=30,dI=Ag-Rg,hI=25e3,fI=3e4;class ai{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Zs(e),this.stats_=Rl(n),this.urlFn=c=>(this.appCheckToken&&(c[kc]=this.appCheckToken),Tg(n,Eg,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new nI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(fI)),WS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Nl((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===vh)this.id=a,this.password=c;else if(o===iI)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[vh]="t",i[kg]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[oI]=this.scriptTagHolder.uniqueCallbackIdentifier),i[pg]=Al,this.transportSessionId&&(i[gg]=this.transportSessionId),this.lastSessionId&&(i[wg]=this.lastSessionId),this.applicationId&&(i[vg]=this.applicationId),this.appCheckToken&&(i[kc]=this.appCheckToken),typeof location<"u"&&location.hostname&&yg.test(location.hostname)&&(i[mg]=_g);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ai.forceAllow_=!0}static forceDisallow(){ai.forceDisallow_=!0}static isAvailable(){return ai.forceAllow_?!0:!ai.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!jS()&&!qS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ce(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=zp(n),s=hg(i,dI);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[uI]="t",i[Sg]=e,i[Ig]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ce(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Nl{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=$S(),window[sI+this.uniqueCallbackIdentifier]=e,window[rI+this.uniqueCallbackIdentifier]=n,this.myIFrame=Nl.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){pe("frame writing exception"),a.stack&&pe(a.stack),pe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||pe("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Sg]=this.myID,e[Ig]=this.myPW,e[kg]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Rg+i.length<=Ag;){const o=this.pendingSegs.shift();i=i+"&"+aI+s+"="+o.seg+"&"+cI+s+"="+o.ts+"&"+lI+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(hI)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{pe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pI=16384,gI=45e3;let zr=null;typeof MozWebSocket<"u"?zr=MozWebSocket:typeof WebSocket<"u"&&(zr=WebSocket);class et{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Zs(this.connId),this.stats_=Rl(n),this.connURL=et.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[pg]=Al,typeof location<"u"&&location.hostname&&yg.test(location.hostname)&&(o[mg]=_g),n&&(o[gg]=n),i&&(o[wg]=i),s&&(o[kc]=s),r&&(o[vg]=r),Tg(e,bg,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Rn.set("previous_websocket_failure",!0);try{let i;hT(),this.mySock=new zr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){et.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&zr!==null&&!et.forceDisallow_}static previouslyFailed(){return Rn.isInMemoryStorage||Rn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Rn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=Rs(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=ce(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=hg(n,pI);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(gI))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}et.responsesRequiredToBeHealthy=2;et.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{static get ALL_TRANSPORTS(){return[ai,et]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=et&&et.isAvailable();let i=n&&!et.previouslyFailed();if(e.webSocketOnly&&(n||Re("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[et];else{const s=this.transports_=[];for(const r of Ps.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Ps.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ps.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI=6e4,_I=5e3,yI=10*1024,wI=100*1024,Da="t",bh="d",vI="s",Eh="r",bI="e",Ch="o",Th="a",Sh="n",Ih="p",EI="h";class CI{constructor(e,n,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Zs("c:"+this.id+":"),this.transportManager_=new Ps(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=ps(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>wI?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>yI?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Da in e){const n=e[Da];n===Th?this.upgradeIfSecondaryHealthy_():n===Eh?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Ch&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=is("t",e),i=is("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ih,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Th,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Sh,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=is("t",e),i=is("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=is(Da,e);if(bh in e){const i=e[bh];if(n===EI){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Sh){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===vI?this.onConnectionShutdown_(i):n===Eh?this.onReset_(i):n===bI?Ic("Server Error: "+i):n===Ch?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ic("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Al!==i&&Re("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),ps(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(mI))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):ps(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(_I))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ih,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Rn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gr extends Pg{static getInstance(){return new Gr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Sl()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh=32,Ah=768;class V{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function U(){return new V("")}function P(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function ln(t){return t.pieces_.length-t.pieceNum_}function z(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new V(t.pieces_,e)}function Pl(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function TI(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Os(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Og(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new V(e,0)}function X(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof V)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new V(n,0)}function O(t){return t.pieceNum_>=t.pieces_.length}function ke(t,e){const n=P(t),i=P(e);if(n===null)return e;if(n===i)return ke(z(t),z(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function SI(t,e){const n=Os(t,0),i=Os(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=ti(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function Ol(t,e){if(ln(t)!==ln(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function je(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(ln(t)>ln(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class II{constructor(e,n){this.errorPrefix_=n,this.parts_=Os(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Mo(this.parts_[i]);Lg(this)}}function kI(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Mo(e),Lg(t)}function AI(t){const e=t.parts_.pop();t.byteLength_-=Mo(e),t.parts_.length>0&&(t.byteLength_-=1)}function Lg(t){if(t.byteLength_>Ah)throw new Error(t.errorPrefix_+"has a key path longer than "+Ah+" bytes ("+t.byteLength_+").");if(t.parts_.length>kh)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+kh+") or object contains a cycle "+In(t))}function In(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll extends Pg{static getInstance(){return new Ll}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss=1e3,RI=300*1e3,Rh=30*1e3,NI=1.3,PI=3e4,OI="server_kill",Nh=3;class Pt extends Ng{constructor(e,n,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Pt.nextPersistentConnectionId_++,this.log_=Zs("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ss,this.maxReconnectDelay_=RI,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ll.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Gr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(ce(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new Pe,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Pt.warnOnListenWarnings_(c,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&wt(e,"w")){const i=ki(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();Re(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||yT(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Rh)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=_T(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ce(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Ic("Unrecognized action received from server: "+ce(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ss,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ss,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>PI&&(this.reconnectDelay_=ss),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*NI)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Pt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?pe("getToken() completed but was canceled"):(pe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new CI(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,f=>{Re(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(OI)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Re(d),c())}}}interrupt(e){pe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){pe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Vr(this.interruptReasons_)&&(this.reconnectDelay_=ss,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>kl(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new V(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){pe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Nh&&(this.reconnectDelay_=Rh,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){pe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Nh&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+cg.replace(/\./g,"-")]=1,Sl()?e["framework.cordova"]=1:eg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Gr.getInstance().currentlyOnline();return Vr(this.interruptReasons_)&&e}}Pt.nextPersistentConnectionId_=0;Pt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new L(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new L(Ri,e),s=new L(Ri,n);return this.compare(i,s)!==0}minPost(){return L.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pr;class Dg extends Bo{static get __EMPTY_NODE(){return pr}static set __EMPTY_NODE(e){pr=e}compare(e,n){return ti(e.name,n.name)}isDefinedOn(e){throw Hi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return L.MIN}maxPost(){return new L(Bn,pr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new L(e,pr)}toString(){return".key"}}const di=new Dg;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class fe{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??fe.RED,this.left=s??Oe.EMPTY_NODE,this.right=r??Oe.EMPTY_NODE}copy(e,n,i,s,r){return new fe(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Oe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return Oe.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}fe.RED=!0;fe.BLACK=!1;class LI{copy(e,n,i,s,r){return this}insert(e,n,i){return new fe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Oe{constructor(e,n=Oe.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Oe(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,fe.BLACK,null,null))}remove(e){return new Oe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,fe.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new gr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new gr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new gr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new gr(this.root_,null,this.comparator_,!0,e)}}Oe.EMPTY_NODE=new LI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DI(t,e){return ti(t.name,e.name)}function Dl(t,e){return ti(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ac;function MI(t){Ac=t}const Mg=function(t){return typeof t=="number"?"number:"+fg(t):"string:"+t},xg=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&wt(e,".sv"),"Priority must be a string or number.")}else g(t===Ac||t.isEmpty(),"priority of unexpected type.");g(t===Ac||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ph;class he{static set __childrenNodeConstructor(e){Ph=e}static get __childrenNodeConstructor(){return Ph}constructor(e,n=he.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),xg(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new he(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return O(e)?this:P(e)===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:he.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=P(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(g(i!==".priority"||ln(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,he.__childrenNodeConstructor.EMPTY_NODE.updateChild(z(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Mg(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=fg(this.value_):e+=this.value_,this.lazyHash_=dg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===he.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof he.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=he.VALUE_TYPE_ORDER.indexOf(n),r=he.VALUE_TYPE_ORDER.indexOf(i);return g(s>=0,"Unknown leaf type: "+n),g(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}he.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fg,Ug;function xI(t){Fg=t}function FI(t){Ug=t}class UI extends Bo{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?ti(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return L.MIN}maxPost(){return new L(Bn,new he("[PRIORITY-POST]",Ug))}makePost(e,n){const i=Fg(e);return new L(n,new he("[PRIORITY-POST]",i))}toString(){return".priority"}}const Q=new UI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $I=Math.log(2);class BI{constructor(e){const n=r=>parseInt(Math.log(r)/$I,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Kr=function(t,e,n,i){t.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new fe(h,d.node,fe.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=s(c,f),_=s(f+1,l);return d=t[f],h=n?n(d):d,new fe(h,d.node,fe.BLACK,p,_)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,_){const m=d-p,R=d;d-=p;const B=s(m+1,R),N=t[m],b=n?n(N):N;f(new fe(b,N.node,_,null,B))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const _=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));_?h(m,fe.BLACK):(h(m,fe.BLACK),h(m,fe.RED))}return u},o=new BI(t.length),a=r(o);return new Oe(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ma;const si={};class Ct{static get Default(){return g(si&&Q,"ChildrenNode.ts has not been loaded"),Ma=Ma||new Ct({".priority":si},{".priority":Q}),Ma}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=ki(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Oe?n:null}hasIndex(e){return wt(this.indexSet_,e.toString())}addIndex(e,n){g(e!==di,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(L.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Kr(i,e.getCompare()):a=si;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Ct(u,l)}addToIndexes(e,n){const i=jr(this.indexes_,(s,r)=>{const o=ki(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),s===si)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(L.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Kr(a,o.getCompare())}else return si;else{const a=n.get(e.name);let c=s;return a&&(c=c.remove(new L(e.name,a))),c.insert(e,e.node)}});return new Ct(i,this.indexSet_)}removeFromIndexes(e,n){const i=jr(this.indexes_,s=>{if(s===si)return s;{const r=n.get(e.name);return r?s.remove(new L(e.name,r)):s}});return new Ct(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rs;class v{static get EMPTY_NODE(){return rs||(rs=new v(new Oe(Dl),null,Ct.Default))}constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&xg(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||rs}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?rs:n}}getChild(e){const n=P(e);return n===null?this:this.getImmediateChild(n).getChild(z(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new L(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?rs:this.priorityNode_;return new v(s,o,r)}}updateChild(e,n){const i=P(e);if(i===null)return n;{g(P(e)!==".priority"||ln(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(z(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(Q,(o,a)=>{n[o]=a.val(e),i++,r&&v.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Mg(this.getPriority().val())+":"),this.forEachChild(Q,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":dg(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new L(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new L(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new L(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,L.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,L.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===er?-1:0}withIndex(e){if(e===di||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===di||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(Q),s=n.getIterator(Q);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===di?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class HI extends v{constructor(){super(new Oe(Dl),v.EMPTY_NODE,Ct.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const er=new HI;Object.defineProperties(L,{MIN:{value:new L(Ri,v.EMPTY_NODE)},MAX:{value:new L(Bn,er)}});Dg.__EMPTY_NODE=v.EMPTY_NODE;he.__childrenNodeConstructor=v;MI(er);FI(er);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WI=!0;function Z(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new he(n,Z(e))}if(!(t instanceof Array)&&WI){const n=[];let i=!1;if(ye(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=Z(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),n.push(new L(o,c)))}}),n.length===0)return v.EMPTY_NODE;const r=Kr(n,DI,o=>o.name,Dl);if(i){const o=Kr(n,Q.getCompare());return new v(r,Z(e),new Ct({".priority":o},{".priority":Q}))}else return new v(r,Z(e),Ct.Default)}else{let n=v.EMPTY_NODE;return ye(t,(i,s)=>{if(wt(t,i)&&i.substring(0,1)!=="."){const r=Z(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(Z(e))}}xI(Z);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI extends Bo{constructor(e){super(),this.indexPath_=e,g(!O(e)&&P(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?ti(e.name,n.name):r}makePost(e,n){const i=Z(e),s=v.EMPTY_NODE.updateChild(this.indexPath_,i);return new L(n,s)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,er);return new L(Bn,e)}toString(){return Os(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jI extends Bo{compare(e,n){const i=e.node.compareTo(n.node);return i===0?ti(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return L.MIN}maxPost(){return L.MAX}makePost(e,n){const i=Z(e);return new L(n,i)}toString(){return".value"}}const qI=new jI;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(t){return{type:"value",snapshotNode:t}}function Ni(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Ls(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Ds(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function zI(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(Ls(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ni(n,i)):o.trackChildChange(Ds(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(Q,(s,r)=>{n.hasChild(s)||i.trackChildChange(Ls(s,r))}),n.isLeafNode()||n.forEachChild(Q,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Ds(s,r,o))}else i.trackChildChange(Ni(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e){this.indexedFilter_=new Ml(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Ms.getStartPost_(e),this.endPost_=Ms.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new L(n,i))||(i=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=v.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(v.EMPTY_NODE);const r=this;return n.forEachChild(Q,(o,a)=>{r.matches(new L(o,a))||(s=s.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GI{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Ms(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new L(n,i))||(i=v.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=v.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(v.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new L(n,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(Ds(n,i,d)),a.updateImmediateChild(n,i);{r?.trackChildChange(Ls(n,d));const _=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Ni(h.name,h.node)),_.updateImmediateChild(h.name,h.node)):_}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Ls(l.name,l.node)),r.trackChildChange(Ni(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Q}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ri}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Bn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===Q}copy(){const e=new Ho;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function KI(t){return t.loadsAllData()?new Ml(t.getIndex()):t.hasLimit()?new GI(t):new Ms(t)}function Oh(t){const e={};if(t.isDefault())return e;let n;if(t.index_===Q?n="$priority":t.index_===qI?n="$value":t.index_===di?n="$key":(g(t.index_ instanceof VI,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ce(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=ce(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+ce(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=ce(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+ce(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Lh(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==Q&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr extends Ng{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Zs("p:rest:"),this.listens_={}}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Yr.getListenId_(e,i),a={};this.listens_[o]=a;const c=Oh(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),ki(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,n){const i=Yr.getListenId_(e,n);delete this.listens_[i]}get(e){const n=Oh(e._queryParams),i=e._path.toString(),s=new Pe;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Vi(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Rs(a.responseText)}catch{Re("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&Re("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YI{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jr(){return{value:null,children:new Map}}function zi(t,e,n){if(O(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=P(e);t.children.has(i)||t.children.set(i,Jr());const s=t.children.get(i);e=z(e),zi(s,e,n)}}function Rc(t,e){if(O(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(Q,(i,s)=>{zi(t,new V(i),s)}),Rc(t,e)}}else if(t.children.size>0){const n=P(e);return e=z(e),t.children.has(n)&&Rc(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function Nc(t,e,n){t.value!==null?n(e,t.value):JI(t,(i,s)=>{const r=new V(e.toString()+"/"+i);Nc(s,r,n)})}function JI(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XI{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ye(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh=10*1e3,QI=30*1e3,ZI=300*1e3;class ek{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new XI(e);const i=Dh+(QI-Dh)*Math.random();ps(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;ye(e,(s,r)=>{r>0&&wt(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),ps(this.reportStats_.bind(this),Math.floor(Math.random()*2*ZI))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var tt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(tt||(tt={}));function xl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Fl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ul(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xr{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=tt.ACK_USER_WRITE,this.source=xl()}operationForChild(e){if(O(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new V(e));return new Xr(U(),n,this.revert)}}else return g(P(this.path)===e,"operationForChild called for unrelated child."),new Xr(z(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e,n){this.source=e,this.path=n,this.type=tt.LISTEN_COMPLETE}operationForChild(e){return O(this.path)?new xs(this.source,U()):new xs(this.source,z(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=tt.OVERWRITE}operationForChild(e){return O(this.path)?new Hn(this.source,U(),this.snap.getImmediateChild(e)):new Hn(this.source,z(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pi{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=tt.MERGE}operationForChild(e){if(O(this.path)){const n=this.children.subtree(new V(e));return n.isEmpty()?null:n.value?new Hn(this.source,U(),n.value):new Pi(this.source,U(),n)}else return g(P(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Pi(this.source,z(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(O(e))return this.isFullyInitialized()&&!this.filtered_;const n=P(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function nk(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(zI(o.childName,o.snapshotNode))}),os(t,s,"child_removed",e,i,n),os(t,s,"child_added",e,i,n),os(t,s,"child_moved",r,i,n),os(t,s,"child_changed",e,i,n),os(t,s,"value",e,i,n),s}function os(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,c)=>sk(t,a,c)),o.forEach(a=>{const c=ik(t,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function ik(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function sk(t,e,n){if(e.childName==null||n.childName==null)throw Hi("Should only compare child_ events.");const i=new L(e.childName,e.snapshotNode),s=new L(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wo(t,e){return{eventCache:t,serverCache:e}}function gs(t,e,n,i){return Wo(new un(e,n,i),t.serverCache)}function Bg(t,e,n,i){return Wo(t.eventCache,new un(e,n,i))}function Qr(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Wn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xa;const rk=()=>(xa||(xa=new Oe(VS)),xa);class G{static fromObject(e){let n=new G(null);return ye(e,(i,s)=>{n=n.set(new V(i),s)}),n}constructor(e,n=rk()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:U(),value:this.value};if(O(e))return null;{const i=P(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(z(e),n);return r!=null?{path:X(new V(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(O(e))return this;{const n=P(e),i=this.children.get(n);return i!==null?i.subtree(z(e)):new G(null)}}set(e,n){if(O(e))return new G(n,this.children);{const i=P(e),r=(this.children.get(i)||new G(null)).set(z(e),n),o=this.children.insert(i,r);return new G(this.value,o)}}remove(e){if(O(e))return this.children.isEmpty()?new G(null):new G(null,this.children);{const n=P(e),i=this.children.get(n);if(i){const s=i.remove(z(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new G(null):new G(this.value,r)}else return this}}get(e){if(O(e))return this.value;{const n=P(e),i=this.children.get(n);return i?i.get(z(e)):null}}setTree(e,n){if(O(e))return n;{const i=P(e),r=(this.children.get(i)||new G(null)).setTree(z(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new G(this.value,o)}}fold(e){return this.fold_(U(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(X(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,U(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(O(e))return null;{const r=P(e),o=this.children.get(r);return o?o.findOnPath_(z(e),X(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,U(),n)}foreachOnPath_(e,n,i){if(O(e))return this;{this.value&&i(n,this.value);const s=P(e),r=this.children.get(s);return r?r.foreachOnPath_(z(e),X(n,s),i):new G(null)}}foreach(e){this.foreach_(U(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(X(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e){this.writeTree_=e}static empty(){return new rt(new G(null))}}function ms(t,e,n){if(O(e))return new rt(new G(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=ke(s,e);return r=r.updateChild(o,n),new rt(t.writeTree_.set(s,r))}else{const s=new G(n),r=t.writeTree_.setTree(e,s);return new rt(r)}}}function Pc(t,e,n){let i=t;return ye(n,(s,r)=>{i=ms(i,X(e,s),r)}),i}function Mh(t,e){if(O(e))return rt.empty();{const n=t.writeTree_.setTree(e,new G(null));return new rt(n)}}function Oc(t,e){return ni(t,e)!=null}function ni(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ke(n.path,e)):null}function xh(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(Q,(i,s)=>{e.push(new L(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new L(i,s.value))}),e}function tn(t,e){if(O(e))return t;{const n=ni(t,e);return n!=null?new rt(new G(n)):new rt(t.writeTree_.subtree(e))}}function Lc(t){return t.writeTree_.isEmpty()}function Oi(t,e){return Hg(U(),t.writeTree_,e)}function Hg(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Hg(X(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(X(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vo(t,e){return qg(e,t)}function ok(t,e,n,i,s){g(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=ms(t.visibleWrites,e,n)),t.lastWriteId=i}function ak(t,e,n,i){g(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=Pc(t.visibleWrites,e,n),t.lastWriteId=i}function ck(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function lk(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&uk(a,i.path)?s=!1:je(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return dk(t),!0;if(i.snap)t.visibleWrites=Mh(t.visibleWrites,i.path);else{const a=i.children;ye(a,c=>{t.visibleWrites=Mh(t.visibleWrites,X(i.path,c))})}return!0}else return!1}function uk(t,e){if(t.snap)return je(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&je(X(t.path,n),e))return!0;return!1}function dk(t){t.visibleWrites=Wg(t.allWrites,hk,U()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function hk(t){return t.visible}function Wg(t,e,n){let i=rt.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)je(n,o)?(a=ke(n,o),i=ms(i,a,r.snap)):je(o,n)&&(a=ke(o,n),i=ms(i,U(),r.snap.getChild(a)));else if(r.children){if(je(n,o))a=ke(n,o),i=Pc(i,a,r.children);else if(je(o,n))if(a=ke(o,n),O(a))i=Pc(i,U(),r.children);else{const c=ki(r.children,P(a));if(c){const l=c.getChild(z(a));i=ms(i,U(),l)}}}else throw Hi("WriteRecord should have .snap or .children")}}return i}function Vg(t,e,n,i,s){if(!i&&!s){const r=ni(t.visibleWrites,e);if(r!=null)return r;{const o=tn(t.visibleWrites,e);if(Lc(o))return n;if(n==null&&!Oc(o,U()))return null;{const a=n||v.EMPTY_NODE;return Oi(o,a)}}}else{const r=tn(t.visibleWrites,e);if(!s&&Lc(r))return n;if(!s&&n==null&&!Oc(r,U()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(je(l.path,e)||je(e,l.path))},a=Wg(t.allWrites,o,e),c=n||v.EMPTY_NODE;return Oi(a,c)}}}function fk(t,e,n){let i=v.EMPTY_NODE;const s=ni(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(Q,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=tn(t.visibleWrites,e);return n.forEachChild(Q,(o,a)=>{const c=Oi(tn(r,new V(o)),a);i=i.updateImmediateChild(o,c)}),xh(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=tn(t.visibleWrites,e);return xh(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function pk(t,e,n,i,s){g(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=X(e,n);if(Oc(t.visibleWrites,r))return null;{const o=tn(t.visibleWrites,r);return Lc(o)?s.getChild(n):Oi(o,s.getChild(n))}}function gk(t,e,n,i){const s=X(e,n),r=ni(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=tn(t.visibleWrites,s);return Oi(o,i.getNode().getImmediateChild(n))}else return null}function mk(t,e){return ni(t.visibleWrites,e)}function _k(t,e,n,i,s,r,o){let a;const c=tn(t.visibleWrites,e),l=ni(c,U());if(l!=null)a=l;else if(n!=null)a=Oi(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function yk(){return{visibleWrites:rt.empty(),allWrites:[],lastWriteId:-1}}function Zr(t,e,n,i){return Vg(t.writeTree,t.treePath,e,n,i)}function $l(t,e){return fk(t.writeTree,t.treePath,e)}function Fh(t,e,n,i){return pk(t.writeTree,t.treePath,e,n,i)}function eo(t,e){return mk(t.writeTree,X(t.treePath,e))}function wk(t,e,n,i,s,r){return _k(t.writeTree,t.treePath,e,n,i,s,r)}function Bl(t,e,n){return gk(t.writeTree,t.treePath,e,n)}function jg(t,e){return qg(X(t.treePath,e),t.writeTree)}function qg(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vk{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,Ds(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ls(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,Ni(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,Ds(i,e.snapshotNode,s.oldSnap));else throw Hi("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bk{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const zg=new bk;class Hl{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new un(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Bl(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Wn(this.viewCache_),r=wk(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ek(t){return{filter:t}}function Ck(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function Tk(t,e,n,i,s){const r=new vk;let o,a;if(n.type===tt.OVERWRITE){const l=n;l.source.fromUser?o=Dc(t,e,l.path,l.snap,i,s,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!O(l.path),o=to(t,e,l.path,l.snap,i,s,a,r))}else if(n.type===tt.MERGE){const l=n;l.source.fromUser?o=Ik(t,e,l.path,l.children,i,s,r):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Mc(t,e,l.path,l.children,i,s,a,r))}else if(n.type===tt.ACK_USER_WRITE){const l=n;l.revert?o=Rk(t,e,l.path,i,s,r):o=kk(t,e,l.path,l.affectedTree,i,s,r)}else if(n.type===tt.LISTEN_COMPLETE)o=Ak(t,e,n.path,i,r);else throw Hi("Unknown operation type: "+n.type);const c=r.getChanges();return Sk(e,o,c),{viewCache:o,changes:c}}function Sk(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Qr(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push($g(Qr(e)))}}function Gg(t,e,n,i,s,r){const o=e.eventCache;if(eo(i,n)!=null)return e;{let a,c;if(O(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Wn(e),u=l instanceof v?l:v.EMPTY_NODE,d=$l(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Zr(i,Wn(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=P(n);if(l===".priority"){g(ln(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=Fh(i,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=z(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=Fh(i,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Bl(i,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return gs(e,a,o.isFullyInitialized()||O(n),t.filter.filtersNodes())}}function to(t,e,n,i,s,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(O(n))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=P(n);if(!c.isCompleteForPath(n)&&ln(n)>1)return e;const p=z(n),m=c.getNode().getImmediateChild(f).updateChild(p,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,zg,null)}const d=Bg(e,l,c.isFullyInitialized()||O(n),u.filtersNodes()),h=new Hl(s,d,r);return Gg(t,d,n,s,h,a)}function Dc(t,e,n,i,s,r,o){const a=e.eventCache;let c,l;const u=new Hl(s,e,r);if(O(n))l=t.filter.updateFullNode(e.eventCache.getNode(),i,o),c=gs(e,l,!0,t.filter.filtersNodes());else{const d=P(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),i),c=gs(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=z(n),f=a.getNode().getImmediateChild(d);let p;if(O(h))p=i;else{const _=u.getCompleteChild(d);_!=null?Pl(h)===".priority"&&_.getChild(Og(h)).isEmpty()?p=_:p=_.updateChild(h,i):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const _=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=gs(e,_,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Uh(t,e){return t.eventCache.isCompleteForChild(e)}function Ik(t,e,n,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=X(n,c);Uh(e,P(u))&&(a=Dc(t,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=X(n,c);Uh(e,P(u))||(a=Dc(t,a,u,l,s,r,o))}),a}function $h(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Mc(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;O(n)?l=i:l=new G(null).setTree(n,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=$h(t,f,h);c=to(t,c,new V(d),p,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),_=$h(t,p,h);c=to(t,c,new V(d),_,s,r,o,a)}}),c}function kk(t,e,n,i,s,r,o){if(eo(s,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(O(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return to(t,e,n,c.getNode().getChild(n),s,r,a,o);if(O(n)){let l=new G(null);return c.getNode().forEachChild(di,(u,d)=>{l=l.set(new V(u),d)}),Mc(t,e,n,l,s,r,a,o)}else return e}else{let l=new G(null);return i.foreach((u,d)=>{const h=X(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Mc(t,e,n,l,s,r,a,o)}}function Ak(t,e,n,i,s){const r=e.serverCache,o=Bg(e,r.getNode(),r.isFullyInitialized()||O(n),r.isFiltered());return Gg(t,o,n,i,zg,s)}function Rk(t,e,n,i,s,r){let o;if(eo(i,n)!=null)return e;{const a=new Hl(i,e,s),c=e.eventCache.getNode();let l;if(O(n)||P(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Zr(i,Wn(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=$l(i,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=P(n);let d=Bl(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,z(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,z(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Zr(i,Wn(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||eo(i,U())!=null,gs(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ml(i.getIndex()),r=KI(i);this.processor_=Ek(r);const o=n.serverCache,a=n.eventCache,c=s.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new un(c,o.isFullyInitialized(),s.filtersNodes()),d=new un(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Wo(d,u),this.eventGenerator_=new tk(this.query_)}get query(){return this.query_}}function Pk(t){return t.viewCache_.serverCache.getNode()}function Ok(t){return Qr(t.viewCache_)}function Lk(t,e){const n=Wn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!O(e)&&!n.getImmediateChild(P(e)).isEmpty())?n.getChild(e):null}function Bh(t){return t.eventRegistrations_.length===0}function Dk(t,e){t.eventRegistrations_.push(e)}function Hh(t,e,n){const i=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function Wh(t,e,n,i){e.type===tt.MERGE&&e.source.queryId!==null&&(g(Wn(t.viewCache_),"We should always have a full cache before handling merges"),g(Qr(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=Tk(t.processor_,s,e,n,i);return Ck(t.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Kg(t,r.changes,r.viewCache.eventCache.getNode(),null)}function Mk(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(Q,(r,o)=>{i.push(Ni(r,o))}),n.isFullyInitialized()&&i.push($g(n.getNode())),Kg(t,i,n.getNode(),e)}function Kg(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return nk(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let no;class Yg{constructor(){this.views=new Map}}function xk(t){g(!no,"__referenceConstructor has already been defined"),no=t}function Fk(){return g(no,"Reference.ts has not been loaded"),no}function Uk(t){return t.views.size===0}function Wl(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return g(r!=null,"SyncTree gave us an op for an invalid query."),Wh(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(Wh(o,e,n,i));return r}}function Jg(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Zr(n,s?i:null),c=!1;a?c=!0:i instanceof v?(a=$l(n,i),c=!1):(a=v.EMPTY_NODE,c=!1);const l=Wo(new un(a,c,!1),new un(i,s,!1));return new Nk(e,l)}return o}function $k(t,e,n,i,s,r){const o=Jg(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),Dk(o,n),Mk(o,n)}function Bk(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=dn(t);if(s==="default")for(const[c,l]of t.views.entries())o=o.concat(Hh(l,n,i)),Bh(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(s);c&&(o=o.concat(Hh(c,n,i)),Bh(c)&&(t.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!dn(t)&&r.push(new(Fk())(e._repo,e._path)),{removed:r,events:o}}function Xg(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function nn(t,e){let n=null;for(const i of t.views.values())n=n||Lk(i,e);return n}function Qg(t,e){if(e._queryParams.loadsAllData())return jo(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Zg(t,e){return Qg(t,e)!=null}function dn(t){return jo(t)!=null}function jo(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let io;function Hk(t){g(!io,"__referenceConstructor has already been defined"),io=t}function Wk(){return g(io,"Reference.ts has not been loaded"),io}let Vk=1;class Vh{constructor(e){this.listenProvider_=e,this.syncPointTree_=new G(null),this.pendingWriteTree_=yk(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function em(t,e,n,i,s){return ok(t.pendingWriteTree_,e,n,i,s),s?Gi(t,new Hn(xl(),e,n)):[]}function jk(t,e,n,i){ak(t.pendingWriteTree_,e,n,i);const s=G.fromObject(n);return Gi(t,new Pi(xl(),e,s))}function Yt(t,e,n=!1){const i=ck(t.pendingWriteTree_,e);if(lk(t.pendingWriteTree_,e)){let r=new G(null);return i.snap!=null?r=r.set(U(),!0):ye(i.children,o=>{r=r.set(new V(o),!0)}),Gi(t,new Xr(i.path,r,n))}else return[]}function tr(t,e,n){return Gi(t,new Hn(Fl(),e,n))}function qk(t,e,n){const i=G.fromObject(n);return Gi(t,new Pi(Fl(),e,i))}function zk(t,e){return Gi(t,new xs(Fl(),e))}function Gk(t,e,n){const i=jl(t,n);if(i){const s=ql(i),r=s.path,o=s.queryId,a=ke(r,e),c=new xs(Ul(o),a);return zl(t,r,c)}else return[]}function so(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Zg(o,e))){const c=Bk(o,e,n,i);Uk(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>dn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=Jk(h);for(let p=0;p<f.length;++p){const _=f[p],m=_.query,R=sm(t,_);t.listenProvider_.startListening(_s(m),Fs(t,m),R.hashFn,R.onComplete)}}}!d&&l.length>0&&!i&&(u?t.listenProvider_.stopListening(_s(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(qo(h));t.listenProvider_.stopListening(_s(h),f)}))}Xk(t,l)}return a}function tm(t,e,n,i){const s=jl(t,i);if(s!=null){const r=ql(s),o=r.path,a=r.queryId,c=ke(o,e),l=new Hn(Ul(a),c,n);return zl(t,o,l)}else return[]}function Kk(t,e,n,i){const s=jl(t,i);if(s){const r=ql(s),o=r.path,a=r.queryId,c=ke(o,e),l=G.fromObject(n),u=new Pi(Ul(a),c,l);return zl(t,o,u)}else return[]}function xc(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(h,f)=>{const p=ke(h,s);r=r||nn(f,p),o=o||dn(f)});let a=t.syncPointTree_.get(s);a?(o=o||dn(a),r=r||nn(a,U())):(a=new Yg,t.syncPointTree_=t.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=v.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((f,p)=>{const _=nn(p,U());_&&(r=r.updateImmediateChild(f,_))}));const l=Zg(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=qo(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=Qk();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=Vo(t.pendingWriteTree_,s);let d=$k(a,e,n,u,r,c);if(!l&&!o&&!i){const h=Qg(a,e);d=d.concat(Zk(t,e,h))}return d}function Vl(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=ke(o,e),l=nn(a,c);if(l)return l});return Vg(s,e,r,n,!0)}function Yk(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=ke(l,n);i=i||nn(u,d)});let s=t.syncPointTree_.get(n);s?i=i||nn(s,U()):(s=new Yg,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new un(i,!0,!1):null,a=Vo(t.pendingWriteTree_,e._path),c=Jg(s,e,a,r?o.getNode():v.EMPTY_NODE,r);return Ok(c)}function Gi(t,e){return nm(e,t.syncPointTree_,null,Vo(t.pendingWriteTree_,U()))}function nm(t,e,n,i){if(O(t.path))return im(t,e,n,i);{const s=e.get(U());n==null&&s!=null&&(n=nn(s,U()));let r=[];const o=P(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=jg(i,o);r=r.concat(nm(a,c,l,u))}return s&&(r=r.concat(Wl(s,t,i,n))),r}}function im(t,e,n,i){const s=e.get(U());n==null&&s!=null&&(n=nn(s,U()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=jg(i,o),u=t.operationForChild(o);u&&(r=r.concat(im(u,a,c,l)))}),s&&(r=r.concat(Wl(s,t,i,n))),r}function sm(t,e){const n=e.query,i=Fs(t,n);return{hashFn:()=>(Pk(e)||v.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Gk(t,n._path,i):zk(t,n._path);{const r=zS(s,n);return so(t,n,null,r)}}}}function Fs(t,e){const n=qo(e);return t.queryToTagMap.get(n)}function qo(t){return t._path.toString()+"$"+t._queryIdentifier}function jl(t,e){return t.tagToQueryMap.get(e)}function ql(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new V(t.substr(0,e))}}function zl(t,e,n){const i=t.syncPointTree_.get(e);g(i,"Missing sync point for query tag that we're tracking");const s=Vo(t.pendingWriteTree_,e);return Wl(i,n,s,null)}function Jk(t){return t.fold((e,n,i)=>{if(n&&dn(n))return[jo(n)];{let s=[];return n&&(s=Xg(n)),ye(i,(r,o)=>{s=s.concat(o)}),s}})}function _s(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(Wk())(t._repo,t._path):t}function Xk(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=qo(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function Qk(){return Vk++}function Zk(t,e,n){const i=e._path,s=Fs(t,e),r=sm(t,n),o=t.listenProvider_.startListening(_s(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)g(!dn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!O(l)&&u&&dn(u))return[jo(u).query];{let h=[];return u&&(h=h.concat(Xg(u).map(f=>f.query))),ye(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(_s(u),Fs(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Gl(n)}node(){return this.node_}}class Kl{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=X(this.path_,e);return new Kl(this.syncTree_,n)}node(){return Vl(this.syncTree_,this.path_)}}const eA=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},jh=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return tA(t[".sv"],e,n);if(typeof t[".sv"]=="object")return nA(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},tA=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},nA=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&g(!1,"Unexpected increment value: "+i);const s=e.node();if(g(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},rm=function(t,e,n,i){return Yl(e,new Kl(n,t),i)},om=function(t,e,n){return Yl(t,new Gl(e),n)};function Yl(t,e,n){const i=t.getPriority().val(),s=jh(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=jh(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new he(a,Z(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new he(s))),o.forEachChild(Q,(a,c)=>{const l=Yl(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Xl(t,e){let n=e instanceof V?e:new V(e),i=t,s=P(n);for(;s!==null;){const r=ki(i.node.children,s)||{children:{},childCount:0};i=new Jl(s,i,r),n=z(n),s=P(n)}return i}function Ki(t){return t.node.value}function am(t,e){t.node.value=e,Fc(t)}function cm(t){return t.node.childCount>0}function iA(t){return Ki(t)===void 0&&!cm(t)}function zo(t,e){ye(t.node.children,(n,i)=>{e(new Jl(n,t,i))})}function lm(t,e,n,i){n&&e(t),zo(t,s=>{lm(s,e,!0)})}function sA(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function nr(t){return new V(t.parent===null?t.name:nr(t.parent)+"/"+t.name)}function Fc(t){t.parent!==null&&rA(t.parent,t.name,t)}function rA(t,e,n){const i=iA(n),s=wt(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Fc(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Fc(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA=/[\[\].#$\/\u0000-\u001F\u007F]/,aA=/[\[\].#$\u0000-\u001F\u007F]/,Fa=10*1024*1024,Ql=function(t){return typeof t=="string"&&t.length!==0&&!oA.test(t)},um=function(t){return typeof t=="string"&&t.length!==0&&!aA.test(t)},cA=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),um(t)},dm=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!$o(t)||t&&typeof t=="object"&&wt(t,".sv")},ro=function(t,e,n,i){i&&e===void 0||Go(Ai(t,"value"),e,n)},Go=function(t,e,n){const i=n instanceof V?new II(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+In(i));if(typeof e=="function")throw new Error(t+"contains a function "+In(i)+" with contents = "+e.toString());if($o(e))throw new Error(t+"contains "+e.toString()+" "+In(i));if(typeof e=="string"&&e.length>Fa/3&&Mo(e)>Fa)throw new Error(t+"contains a string greater than "+Fa+" utf8 bytes "+In(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(ye(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Ql(o)))throw new Error(t+" contains an invalid key ("+o+") "+In(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);kI(i,o),Go(t,a,i),AI(i)}),s&&r)throw new Error(t+' contains ".value" child '+In(i)+" in addition to actual children.")}},lA=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=Os(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Ql(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(SI);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&je(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},hm=function(t,e,n,i){const s=Ai(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];ye(e,(o,a)=>{const c=new V(o);if(Go(s,a,X(n,c)),Pl(c)===".priority"&&!dm(a))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),lA(s,r)},uA=function(t,e,n){if($o(e))throw new Error(Ai(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!dm(e))throw new Error(Ai(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Zl=function(t,e,n,i){if(!um(n))throw new Error(Ai(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},dA=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Zl(t,e,n)},Jt=function(t,e){if(P(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},hA=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Ql(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!cA(n))throw new Error(Ai(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ko(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!Ol(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function fm(t,e,n){Ko(t,n),pm(t,i=>Ol(i,e))}function Je(t,e,n){Ko(t,n),pm(t,i=>je(i,e)||je(e,i))}function pm(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(pA(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function pA(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();fs&&pe("event: "+n.toString()),qi(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gA="repo_interrupt",mA=25;class _A{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new fA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Jr(),this.transactionQueueTree_=new Jl,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function yA(t,e,n){if(t.stats_=Rl(t.repoInfo_),t.forceRestClient_||JS())t.server_=new Yr(t.repoInfo_,(i,s,r,o)=>{qh(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>zh(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ce(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new Pt(t.repoInfo_,e,(i,s,r,o)=>{qh(t,i,s,r,o)},i=>{zh(t,i)},i=>{wA(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=tI(t.repoInfo_,()=>new ek(t.stats_,t.server_)),t.infoData_=new YI,t.infoSyncTree_=new Vh({startListening:(i,s,r,o)=>{let a=[];const c=t.infoData_.getNode(i._path);return c.isEmpty()||(a=tr(t.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),eu(t,"connected",!1),t.serverSyncTree_=new Vh({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);Je(t.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function gm(t){const n=t.infoData_.getNode(new V(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Yo(t){return eA({timestamp:gm(t)})}function qh(t,e,n,i,s){t.dataUpdateCount++;const r=new V(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const c=jr(n,l=>Z(l));o=Kk(t.serverSyncTree_,r,c,s)}else{const c=Z(n);o=tm(t.serverSyncTree_,r,c,s)}else if(i){const c=jr(n,l=>Z(l));o=qk(t.serverSyncTree_,r,c)}else{const c=Z(n);o=tr(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Li(t,r)),Je(t.eventQueue_,a,o)}function zh(t,e){eu(t,"connected",e),e===!1&&CA(t)}function wA(t,e){ye(e,(n,i)=>{eu(t,n,i)})}function eu(t,e,n){const i=new V("/.info/"+e),s=Z(n);t.infoData_.updateSnapshot(i,s);const r=tr(t.infoSyncTree_,i,s);Je(t.eventQueue_,i,r)}function tu(t){return t.nextWriteId_++}function vA(t,e,n){const i=Yk(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=Z(s).withIndex(e._queryParams.getIndex());xc(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=tr(t.serverSyncTree_,e._path,r);else{const a=Fs(t.serverSyncTree_,e);o=tm(t.serverSyncTree_,e._path,r,a)}return Je(t.eventQueue_,e._path,o),so(t.serverSyncTree_,e,n,null,!0),r},s=>(ir(t,"get for query "+ce(e)+" failed: "+s),Promise.reject(new Error(s))))}function bA(t,e,n,i,s){ir(t,"set",{path:e.toString(),value:n,priority:i});const r=Yo(t),o=Z(n,i),a=Vl(t.serverSyncTree_,e),c=om(o,a,r),l=tu(t),u=em(t.serverSyncTree_,e,c,l,!0);Ko(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||Re("set at "+e+" failed: "+h);const _=Yt(t.serverSyncTree_,l,!p);Je(t.eventQueue_,e,_),hn(t,s,h,f)});const d=iu(t,e);Li(t,d),Je(t.eventQueue_,d,[])}function EA(t,e,n,i){ir(t,"update",{path:e.toString(),value:n});let s=!0;const r=Yo(t),o={};if(ye(n,(a,c)=>{s=!1,o[a]=rm(X(e,a),Z(c),t.serverSyncTree_,r)}),s)pe("update() called with empty data.  Don't do anything."),hn(t,i,"ok",void 0);else{const a=tu(t),c=jk(t.serverSyncTree_,e,o,a);Ko(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||Re("update at "+e+" failed: "+l);const h=Yt(t.serverSyncTree_,a,!d),f=h.length>0?Li(t,e):e;Je(t.eventQueue_,f,h),hn(t,i,l,u)}),ye(n,l=>{const u=iu(t,X(e,l));Li(t,u)}),Je(t.eventQueue_,e,[])}}function CA(t){ir(t,"onDisconnectEvents");const e=Yo(t),n=Jr();Nc(t.onDisconnect_,U(),(s,r)=>{const o=rm(s,r,t.serverSyncTree_,e);zi(n,s,o)});let i=[];Nc(n,U(),(s,r)=>{i=i.concat(tr(t.serverSyncTree_,s,r));const o=iu(t,s);Li(t,o)}),t.onDisconnect_=Jr(),Je(t.eventQueue_,U(),i)}function TA(t,e,n){t.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Rc(t.onDisconnect_,e),hn(t,n,i,s)})}function Gh(t,e,n,i){const s=Z(n);t.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&zi(t.onDisconnect_,e,s),hn(t,i,r,o)})}function SA(t,e,n,i,s){const r=Z(n,i);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&zi(t.onDisconnect_,e,r),hn(t,s,o,a)})}function IA(t,e,n,i){if(Vr(n)){pe("onDisconnect().update() called with empty data.  Don't do anything."),hn(t,i,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(s,r)=>{s==="ok"&&ye(n,(o,a)=>{const c=Z(a);zi(t.onDisconnect_,X(e,o),c)}),hn(t,i,s,r)})}function kA(t,e,n){let i;P(e._path)===".info"?i=xc(t.infoSyncTree_,e,n):i=xc(t.serverSyncTree_,e,n),fm(t.eventQueue_,e._path,i)}function mm(t,e,n){let i;P(e._path)===".info"?i=so(t.infoSyncTree_,e,n):i=so(t.serverSyncTree_,e,n),fm(t.eventQueue_,e._path,i)}function AA(t){t.persistentConnection_&&t.persistentConnection_.interrupt(gA)}function ir(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),pe(n,...e)}function hn(t,e,n,i){e&&qi(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function _m(t,e,n){return Vl(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function nu(t,e=t.transactionQueueTree_){if(e||Jo(t,e),Ki(e)){const n=wm(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&RA(t,nr(e),n)}else cm(e)&&zo(e,n=>{nu(t,n)})}function RA(t,e,n){const i=n.map(l=>l.currentWriteId),s=_m(t,e,i);let r=s;const o=s.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=ke(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{ir(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Yt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();Jo(t,Xl(t.transactionQueueTree_,e)),nu(t,t.transactionQueueTree_),Je(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)qi(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Re("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Li(t,e)}},o)}function Li(t,e){const n=ym(t,e),i=nr(n),s=wm(t,n);return NA(t,s,i),i}function NA(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=ke(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(Yt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=mA)u=!0,d="maxretry",s=s.concat(Yt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=_m(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Go("transaction failed: Data returned ",f,c.path);let p=Z(f);typeof f=="object"&&f!=null&&wt(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,R=Yo(t),B=om(p,h,R);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=B,c.currentWriteId=tu(t),o.splice(o.indexOf(m),1),s=s.concat(em(t.serverSyncTree_,c.path,B,c.currentWriteId,c.applyLocally)),s=s.concat(Yt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(Yt(t.serverSyncTree_,c.currentWriteId,!0))}Je(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}Jo(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)qi(i[a]);nu(t,t.transactionQueueTree_)}function ym(t,e){let n,i=t.transactionQueueTree_;for(n=P(e);n!==null&&Ki(i)===void 0;)i=Xl(i,n),e=z(e),n=P(e);return i}function wm(t,e){const n=[];return vm(t,e,n),n.sort((i,s)=>i.order-s.order),n}function vm(t,e,n){const i=Ki(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);zo(e,s=>{vm(t,s,n)})}function Jo(t,e){const n=Ki(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,am(e,n.length>0?n:void 0)}zo(e,i=>{Jo(t,i)})}function iu(t,e){const n=nr(ym(t,e)),i=Xl(t.transactionQueueTree_,e);return sA(i,s=>{Ua(t,s)}),Ua(t,i),lm(i,s=>{Ua(t,s)}),n}function Ua(t,e){const n=Ki(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Yt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?am(e,void 0):n.length=r+1,Je(t.eventQueue_,nr(e),s);for(let o=0;o<i.length;o++)qi(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function PA(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function OA(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Re(`Invalid query segment '${n}' in query '${t}'`)}return e}const Kh=function(t,e){const n=LA(t),i=n.namespace;n.domain==="firebase.com"&&Mt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&Mt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||HS();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Cg(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new V(n.pathString)}},LA=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(s=PA(t.substring(u,d)));const h=OA(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",DA=(function(){let t=0;const e=[];return function(n){const i=n===t;t=n;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Yh.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Yh.charAt(e[s]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ce(this.snapshot.exportVal())}}class Em{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Cm{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Pe;return TA(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Jt("OnDisconnect.remove",this._path);const e=new Pe;return Gh(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Jt("OnDisconnect.set",this._path),ro("OnDisconnect.set",e,this._path,!1);const n=new Pe;return Gh(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Jt("OnDisconnect.setWithPriority",this._path),ro("OnDisconnect.setWithPriority",e,this._path,!1),uA("OnDisconnect.setWithPriority",n);const i=new Pe;return SA(this._repo,this._path,e,n,i.wrapCallback(()=>{})),i.promise}update(e){Jt("OnDisconnect.update",this._path),hm("OnDisconnect.update",e,this._path);const n=new Pe;return IA(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
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
 */class Xo{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return O(this._path)?null:Pl(this._path)}get ref(){return new dt(this._repo,this._path)}get _queryIdentifier(){const e=Lh(this._queryParams),n=kl(e);return n==="{}"?"default":n}get _queryObject(){return Lh(this._queryParams)}isEqual(e){if(e=ne(e),!(e instanceof Xo))return!1;const n=this._repo===e._repo,i=Ol(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+TI(this._path)}}class dt extends Xo{constructor(e,n){super(e,n,new Ho,!1)}get parent(){const e=Og(this._path);return e===null?null:new dt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Vn{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new V(e),i=jn(this.ref,e);return new Vn(this._node.getChild(n),i,Q)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Vn(s,jn(this.ref,i),Q)))}hasChild(e){const n=new V(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function S(t,e){return t=ne(t),t._checkNotDeleted("ref"),e!==void 0?jn(t._root,e):t._root}function jn(t,e){return t=ne(t),P(t._path)===null?dA("child","path",e):Zl("child","path",e),new dt(t._repo,X(t._path,e))}function Tm(t){return t=ne(t),new Cm(t._repo,t._path)}function Us(t,e){t=ne(t),Jt("push",t._path),ro("push",e,t._path,!0);const n=gm(t._repo),i=DA(n),s=jn(t,i),r=jn(t,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function He(t){return Jt("remove",t._path),te(t,null)}function te(t,e){t=ne(t),Jt("set",t._path),ro("set",e,t._path,!1);const n=new Pe;return bA(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function Ln(t,e){hm("update",e,t._path);const n=new Pe;return EA(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function ze(t){t=ne(t);const e=new su(()=>{}),n=new sr(e);return vA(t._repo,t,n).then(i=>new Vn(i,new dt(t._repo,t._path),t._queryParams.getIndex()))}class sr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new bm("value",this,new Vn(e.snapshotNode,new dt(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Em(this,e,n):null}matches(e){return e instanceof sr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Qo{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Em(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const i=jn(new dt(n._repo,n._path),e.childName),s=n._queryParams.getIndex();return new bm(e.type,this,new Vn(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Qo?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Zo(t,e,n,i,s){const r=new su(n,void 0),o=e==="value"?new sr(r):new Qo(e,r);return kA(t._repo,t,o),()=>mm(t._repo,t,o)}function ru(t,e,n,i){return Zo(t,"value",e)}function Di(t,e,n,i){return Zo(t,"child_added",e)}function Sm(t,e,n,i){return Zo(t,"child_changed",e)}function Im(t,e,n,i){return Zo(t,"child_removed",e)}function Ot(t,e,n){let i=null;const s=n?new su(n):null;e==="value"?i=new sr(s):e&&(i=new Qo(e,s)),mm(t._repo,t,i)}xk(dt);Hk(dt);/**
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
 */const MA="FIREBASE_DATABASE_EMULATOR_HOST",Uc={};let xA=!1;function FA(t,e,n,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Wi(r);t.repoInfo_=new Cg(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),i&&(t.authTokenProvider_=i)}function km(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||Mt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),pe("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Kh(r,s),a=o.repoInfo,c;typeof process<"u"&&gh&&(c=gh[MA]),c?(r=`http://${c}?ns=${a.namespace}`,o=Kh(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new QS(t.name,t.options,e);hA("Invalid Firebase Database URL",o),O(o.path)||Mt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=$A(a,t,l,new XS(t,n));return new Am(u,t)}function UA(t,e){const n=Uc[e];(!n||n[t.key]!==t)&&Mt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),AA(t),delete n[t.key]}function $A(t,e,n,i){let s=Uc[e.name];s||(s={},Uc[e.name]=s);let r=s[t.toURLString()];return r&&Mt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new _A(t,xA,n,i),s[t.toURLString()]=r,r}class Am{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(yA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new dt(this._repo,U())),this._rootInternal}_delete(){return this._rootInternal!==null&&(UA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Mt("Cannot call "+e+" on a deleted database.")}}function Rm(t=Uo(),e){const n=_n(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=rT("database");i&&Nm(n,...i)}return n}function Nm(t,e,n,i={}){t=ne(t),t._checkNotDeleted("useEmulator");const s=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(s===t._repoInternal.repoInfo_.host&&$n(i,r.repoInfo_.emulatorOptions))return;Mt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Mt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Rr(Rr.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:oT(i.mockUserToken,t.app.options.projectId);o=new Rr(a)}Wi(e)&&(Qp(e),Zp("Database",!0)),FA(r,s,i,o)}/**
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
 */function BA(t){lg(ji),Ye(new Be("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return km(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),$e(mh,_h,t),$e(mh,_h,"esm2020")}/**
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
 */const HA={".sv":"timestamp"};function Dn(){return HA}Pt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Pt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};BA();const WA=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Vn,Database:Am,OnDisconnect:Cm,_QueryImpl:Xo,_QueryParams:Ho,_ReferenceImpl:dt,_repoManagerDatabaseFromApp:km,_setSDKVersion:lg,_validatePathString:Zl,_validateWritablePath:Jt,child:jn,connectDatabaseEmulator:Nm,get:ze,getDatabase:Rm,off:Ot,onChildAdded:Di,onChildChanged:Sm,onChildRemoved:Im,onDisconnect:Tm,onValue:ru,push:Us,ref:S,remove:He,serverTimestamp:Dn,set:te,update:Ln},Symbol.toStringTag,{value:"Module"}));var VA="firebase",jA="12.8.0";/**
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
 */$e(VA,jA,"app");/**
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
 */const $c=new Map,Pm={activated:!1,tokenObservers:[]},qA={initialized:!1,enabled:!1};function le(t){return $c.get(t)||{...Pm}}function zA(t,e){return $c.set(t,e),$c.get(t)}function ea(){return qA}/**
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
 */const Om="https://content-firebaseappcheck.googleapis.com/v1",GA="exchangeRecaptchaEnterpriseToken",KA="exchangeDebugToken",Jh={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},YA=1440*60*1e3;/**
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
 */class JA{constructor(e,n,i,s,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=i,this.lowerBound=s,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=s,s>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Pe,this.pending.promise.catch(n=>{}),await XA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Pe,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function XA(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */const QA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Le=new mn("appCheck","AppCheck",QA);/**
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
 */function Xh(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function ou(t){if(!le(t).activated)throw Le.create("use-before-activation",{appName:t.name})}function Lm(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),i=Math.floor((e-n*3600*24)/3600),s=Math.floor((e-n*3600*24-i*3600)/60),r=e-n*3600*24-i*3600-s*60;let o="";return n&&(o+=mr(n)+"d:"),i&&(o+=mr(i)+"h:"),o+=mr(s)+"m:"+mr(r)+"s",o}function mr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
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
 */async function au({url:t,body:e},n){const i={"Content-Type":"application/json"},s=n.getImmediate({optional:!0});if(s){const d=await s.getHeartbeatsHeader();d&&(i["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:i};let o;try{o=await fetch(t,r)}catch(d){throw Le.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Le.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Le.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Le.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function ZA(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${Om}/projects/${n}/apps/${i}:${GA}?key=${s}`,body:{recaptcha_enterprise_token:e}}}function Dm(t,e){const{projectId:n,appId:i,apiKey:s}=t.options;return{url:`${Om}/projects/${n}/apps/${i}:${KA}?key=${s}`,body:{debug_token:e}}}/**
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
 */const eR="firebase-app-check-database",tR=1,$s="firebase-app-check-store",Mm="debug-token";let _r=null;function xm(){return _r||(_r=new Promise((t,e)=>{try{const n=indexedDB.open(eR,tR);n.onsuccess=i=>{t(i.target.result)},n.onerror=i=>{e(Le.create("storage-open",{originalErrorMessage:i.target.error?.message}))},n.onupgradeneeded=i=>{const s=i.target.result;switch(i.oldVersion){case 0:s.createObjectStore($s,{keyPath:"compositeKey"})}}}catch(n){e(Le.create("storage-open",{originalErrorMessage:n?.message}))}}),_r)}function nR(t){return Um($m(t))}function iR(t,e){return Fm($m(t),e)}function sR(t){return Fm(Mm,t)}function rR(){return Um(Mm)}async function Fm(t,e){const i=(await xm()).transaction($s,"readwrite"),r=i.objectStore($s).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},i.onerror=c=>{a(Le.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function Um(t){const n=(await xm()).transaction($s,"readonly"),s=n.objectStore($s).get(t);return new Promise((r,o)=>{s.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(Le.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function $m(t){return`${t.options.appId}-${t.name}`}/**
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
 */const Xt=new xo("@firebase/app-check");/**
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
 */async function oR(t){if(Do()){let e;try{e=await nR(t)}catch(n){Xt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function $a(t,e){return Do()?iR(t,e).catch(n=>{Xt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function aR(){let t;try{t=await rR()}catch{}if(t)return t;{const e=crypto.randomUUID();return sR(e).catch(n=>Xt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
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
 */function cu(){return ea().enabled}async function lu(){const t=ea();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function cR(){const t=Kp(),e=ea();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Pe;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(aR())}/**
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
 */const lR={error:"UNKNOWN_ERROR"};function uR(t){return Lo.encodeString(JSON.stringify(t),!1)}async function Bc(t,e=!1,n=!1){const i=t.app;ou(i);const s=le(i);let r=s.token,o;if(r&&!ci(r)&&(s.token=void 0,r=void 0),!r){const l=await s.cachedTokenPromise;l&&(ci(l)?r=l:await $a(i,void 0))}if(!e&&r&&ci(r))return{token:r.token};let a=!1;if(cu())try{s.exchangeTokenPromise||(s.exchangeTokenPromise=au(Dm(i,await lu()),t.heartbeatServiceProvider).finally(()=>{s.exchangeTokenPromise=void 0}),a=!0);const l=await s.exchangeTokenPromise;return await $a(i,l),s.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Xt.warn(l.message):n&&Xt.error(l),Ba(l)}try{s.exchangeTokenPromise||(s.exchangeTokenPromise=s.provider.getToken().finally(()=>{s.exchangeTokenPromise=void 0}),a=!0),r=await le(i).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Xt.warn(l.message):n&&Xt.error(l),o=l}let c;return r?o?ci(r)?c={token:r.token,internalError:o}:c=Ba(o):(c={token:r.token},s.token=r,await $a(i,r)):c=Ba(o),a&&Wm(i,c),c}async function dR(t){const e=t.app;ou(e);const{provider:n}=le(e);if(cu()){const i=await lu(),{token:s}=await au(Dm(e,i),t.heartbeatServiceProvider);return{token:s}}else{const{token:i}=await n.getToken();return{token:i}}}function Bm(t,e,n,i){const{app:s}=t,r=le(s),o={next:n,error:i,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&ci(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),Qh(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>Qh(t))}function Hm(t,e){const n=le(t),i=n.tokenObservers.filter(s=>s.next!==e);i.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=i}function Qh(t){const{app:e}=t,n=le(e);let i=n.tokenRefresher;i||(i=hR(t),n.tokenRefresher=i),!i.isRunning()&&n.isTokenAutoRefreshEnabled&&i.start()}function hR(t){const{app:e}=t;return new JA(async()=>{const n=le(e);let i;if(n.token?i=await Bc(t,!0):i=await Bc(t),i.error)throw i.error;if(i.internalError)throw i.internalError},()=>!0,()=>{const n=le(e);if(n.token){let i=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const s=n.token.expireTimeMillis-300*1e3;return i=Math.min(i,s),Math.max(0,i-Date.now())}else return 0},Jh.RETRIAL_MIN_WAIT,Jh.RETRIAL_MAX_WAIT)}function Wm(t,e){const n=le(t).tokenObservers;for(const i of n)try{i.type==="EXTERNAL"&&e.error!=null?i.error(e.error):i.next(e)}catch{}}function ci(t){return t.expireTimeMillis-Date.now()>0}function Ba(t){return{token:uR(lR),error:t}}/**
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
 */class fR{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=le(this.app);for(const n of e)Hm(this.app,n.next);return Promise.resolve()}}function pR(t,e){return new fR(t,e)}function gR(t){return{getToken:e=>Bc(t,e),getLimitedUseToken:()=>dR(t),addTokenListener:e=>Bm(t,"INTERNAL",e),removeTokenListener:e=>Hm(t.app,e)}}const mR="@firebase/app-check",_R="0.11.0",yR="https://www.google.com/recaptcha/enterprise.js";function wR(t,e){const n=new Pe,i=le(t);i.reCAPTCHAState={initialized:n};const s=vR(t),r=Xh(!0);return r?Zh(t,e,r,s,n):CR(()=>{const o=Xh(!0);if(!o)throw new Error("no recaptcha");Zh(t,e,o,s,n)}),n.promise}function Zh(t,e,n,i,s){n.ready(()=>{ER(t,e,n,i),s.resolve(n)})}function vR(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function bR(t){ou(t);const n=await le(t).reCAPTCHAState.initialized.promise;return new Promise((i,s)=>{const r=le(t).reCAPTCHAState;n.ready(()=>{i(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function ER(t,e,n,i){const s=n.render(i,{sitekey:e,size:"invisible",callback:()=>{le(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{le(t).reCAPTCHAState.succeeded=!1}}),r=le(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:s}}function CR(t){const e=document.createElement("script");e.src=yR,e.onload=t,document.head.appendChild(e)}class uu{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){SR(this._throttleData);const e=await bR(this._app).catch(i=>{throw Le.create("recaptcha-error")});if(!le(this._app).reCAPTCHAState?.succeeded)throw Le.create("recaptcha-error");let n;try{n=await au(ZA(this._app,e),this._heartbeatServiceProvider)}catch(i){throw i.code?.includes("fetch-status-error")?(this._throttleData=TR(Number(i.customData?.httpStatus),this._throttleData),Le.create("initial-throttle",{time:Lm(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):i}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=_n(e,"heartbeat"),wR(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof uu?this._siteKey===e._siteKey:!1}}function TR(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+YA,httpStatus:t};{const n=e?e.backoffCount:0,i=AT(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+i,httpStatus:t}}}function SR(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Le.create("throttled",{time:Lm(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
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
 */function IR(t=Uo(),e){t=ne(t);const n=_n(t,"app-check");if(ea().initialized||cR(),cu()&&lu().then(s=>console.log(`App Check debug token: ${s}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return s;throw Le.create("already-initialized",{appName:t.name})}const i=n.initialize({options:e});return kR(t,e.provider,e.isTokenAutoRefreshEnabled),le(t).isTokenAutoRefreshEnabled&&Bm(i,"INTERNAL",()=>{}),i}function kR(t,e,n=!1){const i=zA(t,{...Pm});i.activated=!0,i.provider=e,i.cachedTokenPromise=oR(t).then(s=>(s&&ci(s)&&(i.token=s,Wm(t,{token:s.token})),s)),i.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Xt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),i.provider.initialize(t)}const AR="app-check",ef="app-check-internal";function RR(){Ye(new Be(AR,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return pR(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(ef).initialize()})),Ye(new Be(ef,t=>{const e=t.getProvider("app-check").getImmediate();return gR(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),$e(mR,_R)}RR();const NR={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},ta=rg(NR),PR="BIk-HpbCt3Vn7GtQtnFfv0h-hvj_2moy04xGYbmXoqH-AsfQVtiTyxl-QZG1plpYHUysu3yaK7jm1wE0OC6Byys",tf="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let Hc;if(tf.trim()!=="")Hc=new uu(tf),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(Hc)try{IR(ta,{provider:Hc,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const I=Rm(ta),nt=[];function An(t,e,n,i=null,s=null,r=null){e==="value"?ru(t,n):e==="child_added"?Di(t,n):e==="child_removed"?Im(t,n):console.warn(`Unknown listener type: ${e}`),nt.push({ref:t,type:e,callback:n,roomId:i,userId:s,category:r})}function OR(){nt.forEach(({ref:t,type:e,callback:n})=>{try{Ot(t,e,n)}catch(i){console.warn("Failed to remove firebase rtdb listener",i)}}),nt.length=0}function na(t){if(!t)return;nt.filter(i=>i.roomId===t).forEach(({ref:i,type:s,callback:r})=>{try{Ot(i,s,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=nt.filter(i=>i.roomId!==t);nt.length=0,nt.push(...n)}function LR(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;nt.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{Ot(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const s=nt.filter(r=>!n(r));nt.length=0,nt.push(...s)}function ys(t,e,n=null){An(t,"value",e,n)}const En=t=>S(I,`rooms/${t}`),yr=t=>S(I,`rooms/${t}/members`),nf=(t,e)=>S(I,`rooms/${t}/members/${e}`),DR=t=>S(I,`rooms/${t}/cancellation`),ia=t=>S(I,`rooms/${t}/watch`),sa=t=>S(I,`rooms/${t}/watch/fileRequest`),MR=t=>S(I,`users/${t}/recentCalls`),du=(t,e)=>S(I,`users/${t}/recentCalls/${e}`),hu=t=>S(I,`users/${t}/outgoingCall`),Vm=t=>S(I,`rooms/${t}/offerCandidates`),jm=t=>S(I,`rooms/${t}/answerCandidates`);function qm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xR=qm,zm=new mn("auth","Firebase",qm());/**
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
 */const oo=new xo("@firebase/auth");function FR(t,...e){oo.logLevel<=j.WARN&&oo.warn(`Auth (${ji}): ${t}`,...e)}function Nr(t,...e){oo.logLevel<=j.ERROR&&oo.error(`Auth (${ji}): ${t}`,...e)}/**
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
 */function yt(t,...e){throw pu(t,...e)}function ot(t,...e){return pu(t,...e)}function fu(t,e,n){const i={...xR(),[e]:n};return new mn("auth","Firebase",i).create(e,{appName:t.name})}function Mn(t){return fu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function UR(t,e,n){const i=n;if(!(e instanceof i))throw i.name!==e.constructor.name&&yt(t,"argument-error"),fu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function pu(t,...e){if(typeof t!="string"){const n=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=t.name),t._errorFactory.create(n,...i)}return zm.create(t,...e)}function T(t,e,...n){if(!t)throw pu(e,...n)}function Tt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Nr(e),new Error(e)}function xt(t,e){t||Tt(e)}/**
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
 */function Wc(){return typeof self<"u"&&self.location?.href||""}function $R(){return sf()==="http:"||sf()==="https:"}function sf(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function BR(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($R()||uT()||"connection"in navigator)?navigator.onLine:!0}function HR(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class rr{constructor(e,n){this.shortDelay=e,this.longDelay=n,xt(n>e,"Short delay should be less than long delay!"),this.isMobile=Sl()||eg()}get(){return BR()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function gu(t,e){xt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Gm{static initialize(e,n,i){this.fetchImpl=e,n&&(this.headersImpl=n),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Tt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Tt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Tt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const WR={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const VR=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],jR=new rr(3e4,6e4);function mu(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Yi(t,e,n,i,s={}){return Km(t,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Vi({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return lT()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&Wi(t.emulatorConfig.host)&&(l.credentials="include"),Gm.fetch()(await Ym(t,t.config.apiHost,n,a),l)})}async function Km(t,e,n){t._canInitEmulator=!1;const i={...WR,...e};try{const s=new zR(t),r=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw wr(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw wr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw wr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw wr(t,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw fu(t,u,l);yt(t,u)}}catch(s){if(s instanceof $t)throw s;yt(t,"network-request-failed",{message:String(s)})}}async function qR(t,e,n,i,s={}){const r=await Yi(t,e,n,i,s);return"mfaPendingCredential"in r&&yt(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function Ym(t,e,n,i){const s=`${e}${n}?${i}`,r=t,o=r.config.emulator?gu(t.config,s):`${t.config.apiScheme}://${s}`;return VR.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class zR{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,i)=>{this.timer=setTimeout(()=>i(ot(this.auth,"network-request-failed")),jR.get())})}}function wr(t,e,n){const i={appName:t.name};n.email&&(i.email=n.email),n.phoneNumber&&(i.phoneNumber=n.phoneNumber);const s=ot(t,e,i);return s.customData._tokenResponse=n,s}/**
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
 */async function GR(t,e){return Yi(t,"POST","/v1/accounts:delete",e)}async function ao(t,e){return Yi(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function ws(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function KR(t,e=!1){const n=ne(t),i=await n.getIdToken(e),s=_u(i);T(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:ws(Ha(s.auth_time)),issuedAtTime:ws(Ha(s.iat)),expirationTime:ws(Ha(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Ha(t){return Number(t)*1e3}function _u(t){const[e,n,i]=t.split(".");if(e===void 0||n===void 0||i===void 0)return Nr("JWT malformed, contained fewer than 3 sections"),null;try{const s=Wr(n);return s?JSON.parse(s):(Nr("Failed to decode base64 JWT payload"),null)}catch(s){return Nr("Caught error parsing JWT payload as JSON",s?.toString()),null}}function rf(t){const e=_u(t);return T(e,"internal-error"),T(typeof e.exp<"u","internal-error"),T(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Bs(t,e,n=!1){if(n)return e;try{return await e}catch(i){throw i instanceof $t&&YR(i)&&t.auth.currentUser===t&&await t.auth.signOut(),i}}function YR({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class JR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Vc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ws(this.lastLoginAt),this.creationTime=ws(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function co(t){const e=t.auth,n=await t.getIdToken(),i=await Bs(t,ao(e,{idToken:n}));T(i?.users.length,e,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const r=s.providerUserInfo?.length?Jm(s.providerUserInfo):[],o=QR(t.providerData,r),a=t.isAnonymous,c=!(t.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Vc(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function XR(t){const e=ne(t);await co(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function QR(t,e){return[...t.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Jm(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
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
 */async function ZR(t,e){const n=await Km(t,{},async()=>{const i=Vi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=await Ym(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return t.emulatorConfig&&Wi(t.emulatorConfig.host)&&(c.credentials="include"),Gm.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function eN(t,e){return Yi(t,"POST","/v2/accounts:revokeToken",mu(t,e))}/**
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
 */class hi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){T(e.idToken,"internal-error"),T(typeof e.idToken<"u","internal-error"),T(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):rf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){T(e.length!==0,"internal-error");const n=rf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(T(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:i,refreshToken:s,expiresIn:r}=await ZR(e,n);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,n,i){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,n){const{refreshToken:i,accessToken:s,expirationTime:r}=n,o=new hi;return i&&(T(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(T(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(T(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new hi,this.toJSON())}_performRefresh(){return Tt("not implemented")}}/**
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
 */function jt(t,e){T(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class it{constructor({uid:e,auth:n,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new JR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Vc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Bs(this,this.stsTokenManager.getToken(this.auth,e));return T(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return KR(this,e)}reload(){return XR(this)}_assign(e){this!==e&&(T(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new it({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){T(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),n&&await co(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ze(this.auth.app))return Promise.reject(Mn(this.auth));const e=await this.getIdToken();return await Bs(this,GR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const i=n.displayName??void 0,s=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:_}=n;T(d&&_,e,"internal-error");const m=hi.fromJSON(this.name,_);T(typeof d=="string",e,"internal-error"),jt(i,e.name),jt(s,e.name),T(typeof h=="boolean",e,"internal-error"),T(typeof f=="boolean",e,"internal-error"),jt(r,e.name),jt(o,e.name),jt(a,e.name),jt(c,e.name),jt(l,e.name),jt(u,e.name);const R=new it({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(R.providerData=p.map(B=>({...B}))),c&&(R._redirectEventId=c),R}static async _fromIdTokenResponse(e,n,i=!1){const s=new hi;s.updateFromServerResponse(n);const r=new it({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await co(r),r}static async _fromGetAccountInfoResponse(e,n,i){const s=n.users[0];T(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Jm(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new hi;a.updateFromIdToken(i);const c=new it({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Vc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
 */const of=new Map;function St(t){xt(t instanceof Function,"Expected a class definition");let e=of.get(t);return e?(xt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,of.set(t,e),e)}/**
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
 */class Xm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Xm.type="NONE";const jc=Xm;/**
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
 */function Pr(t,e,n){return`firebase:${t}:${e}:${n}`}class fi{constructor(e,n,i){this.persistence=e,this.auth=n,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Pr(this.userKey,s.apiKey,r),this.fullPersistenceKey=Pr("persistence",s.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await ao(this.auth,{idToken:e}).catch(()=>{});return n?it._fromGetAccountInfoResponse(this.auth,n,e):null}return it._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,i="authUser"){if(!n.length)return new fi(St(jc),e,i);const s=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||St(jc);const o=Pr(i,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await ao(e,{idToken:u}).catch(()=>{});if(!h)break;d=await it._fromGetAccountInfoResponse(e,h,u)}else d=it._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new fi(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new fi(r,e,i))}}/**
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
 */function af(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(t_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Qm(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(i_(e))return"Blackberry";if(s_(e))return"Webos";if(Zm(e))return"Safari";if((e.includes("chrome/")||e_(e))&&!e.includes("edge/"))return"Chrome";if(n_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=t.match(n);if(i?.length===2)return i[1]}return"Other"}function Qm(t=Ne()){return/firefox\//i.test(t)}function Zm(t=Ne()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function e_(t=Ne()){return/crios\//i.test(t)}function t_(t=Ne()){return/iemobile/i.test(t)}function n_(t=Ne()){return/android/i.test(t)}function i_(t=Ne()){return/blackberry/i.test(t)}function s_(t=Ne()){return/webos/i.test(t)}function yu(t=Ne()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function tN(t=Ne()){return yu(t)&&!!window.navigator?.standalone}function nN(){return dT()&&document.documentMode===10}function r_(t=Ne()){return yu(t)||n_(t)||s_(t)||i_(t)||/windows phone/i.test(t)||t_(t)}/**
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
 */function o_(t,e=[]){let n;switch(t){case"Browser":n=af(Ne());break;case"Worker":n=`${af(Ne())}-${t}`;break;default:n=t}const i=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ji}/${i}`}/**
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
 */class iN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=n,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const i of this.queue)await i(e),i.onAbort&&n.push(i.onAbort)}catch(i){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function sN(t,e={}){return Yi(t,"GET","/v2/passwordPolicy",mu(t,e))}/**
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
 */const rN=6;class oN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??rN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(n.meetsMinPasswordLength=e.length>=i),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,n,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class aN{constructor(e,n,i,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cf(this),this.idTokenSubscription=new cf(this),this.beforeStateQueue=new iN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zm,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=St(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await fi.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await ao(this,{idToken:e}),i=await it._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(i)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ze(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return T(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await co(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=HR()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ze(this.app))return Promise.reject(Mn(this));const n=e?ne(e):null;return n&&T(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&T(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ze(this.app)?Promise.reject(Mn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ze(this.app)?Promise.reject(Mn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(St(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await sN(this),n=new oN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new mn("auth","Firebase",e())}onAuthStateChanged(e,n,i){return this.registerStateListener(this.authStateSubscription,e,n,i)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,i){return this.registerStateListener(this.idTokenSubscription,e,n,i)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(i.tenantId=this.tenantId),await eN(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const i=await this.getOrInitRedirectPersistenceManager(n);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&St(e)||this._popupRedirectResolver;T(n,this,"argument-error"),this.redirectPersistenceManager=await fi.create(this,[St(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,i,s){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(T(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return T(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=o_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(Ze(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&FR(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Ji(t){return ne(t)}class cf{constructor(e){this.auth=e,this.observer=null,this.addObserver=vT(n=>this.observer=n)}get next(){return T(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let wu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function cN(t){wu=t}function lN(t){return wu.loadJS(t)}function uN(){return wu.gapiScript}function dN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function hN(t,e){const n=_n(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),r=n.getOptions();if($n(r,e??{}))return s;yt(s,"already-initialized")}return n.initialize({options:e})}function fN(t,e){const n=e?.persistence||[],i=(Array.isArray(n)?n:[n]).map(St);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(i,e?.popupRedirectResolver)}function pN(t,e,n){const i=Ji(t);T(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=a_(e),{host:o,port:a}=gN(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){T(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),T($n(l,i.config.emulator)&&$n(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,Wi(o)?(Qp(`${r}//${o}${c}`),Zp("Auth",!0)):mN()}function a_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function gN(t){const e=a_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const i=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:lf(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:lf(o)}}}function lf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function mN(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class c_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Tt("not implemented")}_getIdTokenResponse(e){return Tt("not implemented")}_linkToIdToken(e,n){return Tt("not implemented")}_getReauthenticationResolver(e){return Tt("not implemented")}}/**
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
 */async function pi(t,e){return qR(t,"POST","/v1/accounts:signInWithIdp",mu(t,e))}/**
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
 */const _N="http://localhost";class qn extends c_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new qn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):yt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=n;if(!i||!s)return null;const o=new qn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return pi(e,n)}_linkToIdToken(e,n){const i=this.buildRequest();return i.idToken=n,pi(e,i)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,pi(e,n)}buildRequest(){const e={requestUri:_N,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Vi(n)}return e}}/**
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
 */class vu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class or extends vu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class qt extends or{constructor(){super("facebook.com")}static credential(e){return qn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";qt.PROVIDER_ID="facebook.com";/**
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
 */class gt extends or{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return qn._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:i}=e;if(!n&&!i)return null;try{return gt.credential(n,i)}catch{return null}}}gt.GOOGLE_SIGN_IN_METHOD="google.com";gt.PROVIDER_ID="google.com";/**
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
 */class zt extends or{constructor(){super("github.com")}static credential(e){return qn._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return zt.credential(e.oauthAccessToken)}catch{return null}}}zt.GITHUB_SIGN_IN_METHOD="github.com";zt.PROVIDER_ID="github.com";/**
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
 */class Gt extends or{constructor(){super("twitter.com")}static credential(e,n){return qn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:i}=e;if(!n||!i)return null;try{return Gt.credential(n,i)}catch{return null}}}Gt.TWITTER_SIGN_IN_METHOD="twitter.com";Gt.PROVIDER_ID="twitter.com";/**
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
 */class Mi{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,i,s=!1){const r=await it._fromIdTokenResponse(e,i,s),o=uf(i);return new Mi({user:r,providerId:o,_tokenResponse:i,operationType:n})}static async _forOperation(e,n,i){await e._updateTokensIfNecessary(i,!0);const s=uf(i);return new Mi({user:e,providerId:s,_tokenResponse:i,operationType:n})}}function uf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class lo extends $t{constructor(e,n,i,s){super(n.code,n.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,lo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,n,i,s){return new lo(e,n,i,s)}}function l_(t,e,n,i){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?lo._fromErrorAndOperation(t,r,e,i):r})}async function yN(t,e,n=!1){const i=await Bs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Mi._forOperation(t,"link",i)}/**
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
 */async function wN(t,e,n=!1){const{auth:i}=t;if(Ze(i.app))return Promise.reject(Mn(i));const s="reauthenticate";try{const r=await Bs(t,l_(i,s,e,t),n);T(r.idToken,i,"internal-error");const o=_u(r.idToken);T(o,i,"internal-error");const{sub:a}=o;return T(t.uid===a,i,"user-mismatch"),Mi._forOperation(t,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&yt(i,"user-mismatch"),r}}/**
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
 */async function u_(t,e,n=!1){if(Ze(t.app))return Promise.reject(Mn(t));const i="signIn",s=await l_(t,i,e),r=await Mi._fromIdTokenResponse(t,i,s);return n||await t._updateCurrentUser(r.user),r}async function vN(t,e){return u_(Ji(t),e)}/**
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
 */function Wa(t,e){return ne(t).setPersistence(e)}function bN(t,e,n,i){return ne(t).onIdTokenChanged(e,n,i)}function EN(t,e,n){return ne(t).beforeAuthStateChanged(e,n)}function d_(t,e,n,i){return ne(t).onAuthStateChanged(e,n,i)}function CN(t){return ne(t).signOut()}const uo="__sak";/**
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
 */class h_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(uo,"1"),this.storage.removeItem(uo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const TN=1e3,SN=10;class f_ extends h_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=r_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const i=this.storage.getItem(n),s=this.localCache[n];i!==s&&e(n,s,i)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!n&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);nN()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,SN):s()}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:i}),!0)})},TN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}f_.type="LOCAL";const p_=f_;/**
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
 */class g_ extends h_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}g_.type="SESSION";const m_=g_;/**
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
 */function IN(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class ra{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const i=new ra(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:i,eventType:s,data:r}=n.data,o=this.handlersMap[s];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await IN(a);n.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ra.receivers=[];/**
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
 */function bu(t="",e=10){let n="";for(let i=0;i<e;i++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class kN{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=bu("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function _t(){return window}function AN(t){_t().location.href=t}/**
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
 */function __(){return typeof _t().WorkerGlobalScope<"u"&&typeof _t().importScripts=="function"}async function RN(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function NN(){return navigator?.serviceWorker?.controller||null}function PN(){return __()?self:null}/**
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
 */const y_="firebaseLocalStorageDb",ON=1,ho="firebaseLocalStorage",w_="fbase_key";class ar{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function oa(t,e){return t.transaction([ho],e?"readwrite":"readonly").objectStore(ho)}function LN(){const t=indexedDB.deleteDatabase(y_);return new ar(t).toPromise()}function qc(){const t=indexedDB.open(y_,ON);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const i=t.result;try{i.createObjectStore(ho,{keyPath:w_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const i=t.result;i.objectStoreNames.contains(ho)?e(i):(i.close(),await LN(),e(await qc()))})})}async function df(t,e,n){const i=oa(t,!0).put({[w_]:e,value:n});return new ar(i).toPromise()}async function DN(t,e){const n=oa(t,!1).get(e),i=await new ar(n).toPromise();return i===void 0?null:i.value}function hf(t,e){const n=oa(t,!0).delete(e);return new ar(n).toPromise()}const MN=800,xN=3;class v_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await qc(),this.db)}async _withRetries(e){let n=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(n++>xN)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return __()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ra._getInstance(PN()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await RN(),!this.activeServiceWorker)return;this.sender=new kN(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||NN()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await qc();return await df(e,uo,"1"),await hf(e,uo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(i=>df(i,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(i=>DN(i,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>hf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=oa(s,!1).getAll();return new ar(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),MN)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}v_.type="LOCAL";const b_=v_;new rr(3e4,6e4);/**
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
 */function E_(t,e){return e?St(e):(T(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Eu extends c_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return pi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return pi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return pi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function FN(t){return u_(t.auth,new Eu(t),t.bypassAuthState)}function UN(t){const{auth:e,user:n}=t;return T(n,e,"internal-error"),wN(n,new Eu(t),t.bypassAuthState)}async function $N(t){const{auth:e,user:n}=t;return T(n,e,"internal-error"),yN(n,new Eu(t),t.bypassAuthState)}/**
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
 */class C_{constructor(e,n,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return FN;case"linkViaPopup":case"linkViaRedirect":return $N;case"reauthViaPopup":case"reauthViaRedirect":return UN;default:yt(this.auth,"internal-error")}}resolve(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const BN=new rr(2e3,1e4);async function HN(t,e,n){if(Ze(t.app))return Promise.reject(ot(t,"operation-not-supported-in-this-environment"));const i=Ji(t);UR(t,e,vu);const s=E_(i,n);return new Nn(i,"signInViaPopup",e,s).executeNotNull()}class Nn extends C_{constructor(e,n,i,s,r){super(e,n,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Nn.currentPopupAction&&Nn.currentPopupAction.cancel(),Nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return T(e,this.auth,"internal-error"),e}async onExecution(){xt(this.filter.length===1,"Popup operations only handle one event");const e=bu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ot(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ot(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ot(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,BN.get())};e()}}Nn.currentPopupAction=null;/**
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
 */const WN="pendingRedirect",Or=new Map;class VN extends C_{constructor(e,n,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,i),this.eventId=null}async execute(){let e=Or.get(this.auth._key());if(!e){try{const i=await jN(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(n){e=()=>Promise.reject(n)}Or.set(this.auth._key(),e)}return this.bypassAuthState||Or.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function jN(t,e){const n=GN(e),i=zN(t);if(!await i._isAvailable())return!1;const s=await i._get(n)==="true";return await i._remove(n),s}function qN(t,e){Or.set(t._key(),e)}function zN(t){return St(t._redirectPersistence)}function GN(t){return Pr(WN,t.config.apiKey,t.name)}async function KN(t,e){return await Ji(t)._initializationPromise,T_(t,e,!1)}async function T_(t,e,n=!1){if(Ze(t.app))return Promise.reject(Mn(t));const i=Ji(t),s=E_(i,e),o=await new VN(i,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const YN=600*1e3;class JN{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(n=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!XN(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!S_(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";n.onError(ot(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const i=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=YN&&this.cachedEventUids.clear(),this.cachedEventUids.has(ff(e))}saveEventToCache(e){this.cachedEventUids.add(ff(e)),this.lastProcessedEventTime=Date.now()}}function ff(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function S_({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function XN(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return S_(t);default:return!1}}/**
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
 */async function QN(t,e={}){return Yi(t,"GET","/v1/projects",e)}/**
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
 */const ZN=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,eP=/^https?/;async function tP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await QN(t);for(const n of e)try{if(nP(n))return}catch{}yt(t,"unauthorized-domain")}function nP(t){const e=Wc(),{protocol:n,hostname:i}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&i===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===i}if(!eP.test(n))return!1;if(ZN.test(t))return i===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const iP=new rr(3e4,6e4);function pf(){const t=_t().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function sP(t){return new Promise((e,n)=>{function i(){pf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{pf(),n(ot(t,"network-request-failed"))},timeout:iP.get()})}if(_t().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(_t().gapi?.load)i();else{const s=dN("iframefcb");return _t()[s]=()=>{gapi.load?i():n(ot(t,"network-request-failed"))},lN(`${uN()}?onload=${s}`).catch(r=>n(r))}}).catch(e=>{throw Lr=null,e})}let Lr=null;function rP(t){return Lr=Lr||sP(t),Lr}/**
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
 */const oP=new rr(5e3,15e3),aP="__/auth/iframe",cP="emulator/auth/iframe",lP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},uP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function dP(t){const e=t.config;T(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?gu(e,cP):`https://${t.config.authDomain}/${aP}`,i={apiKey:e.apiKey,appName:t.name,v:ji},s=uP.get(t.config.apiHost);s&&(i.eid=s);const r=t._getFrameworks();return r.length&&(i.fw=r.join(",")),`${n}?${Vi(i).slice(1)}`}async function hP(t){const e=await rP(t),n=_t().gapi;return T(n,t,"internal-error"),e.open({where:document.body,url:dP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:lP,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ot(t,"network-request-failed"),a=_t().setTimeout(()=>{r(o)},oP.get());function c(){_t().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const fP={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},pP=500,gP=600,mP="_blank",_P="http://localhost";class gf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function yP(t,e,n,i=pP,s=gP){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...fP,width:i.toString(),height:s.toString(),top:r,left:o},l=Ne().toLowerCase();n&&(a=e_(l)?mP:n),Qm(l)&&(e=e||_P,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(tN(l)&&a!=="_self")return wP(e||"",a),new gf(null);const d=window.open(e||"",a,u);T(d,t,"popup-blocked");try{d.focus()}catch{}return new gf(d)}function wP(t,e){const n=document.createElement("a");n.href=t,n.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(i)}/**
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
 */const vP="__/auth/handler",bP="emulator/auth/handler",EP=encodeURIComponent("fac");async function mf(t,e,n,i,s,r){T(t.config.authDomain,t,"auth-domain-config-required"),T(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:i,v:ji,eventId:s};if(e instanceof vu){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Vr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof or){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${EP}=${encodeURIComponent(c)}`:"";return`${CP(t)}?${Vi(a).slice(1)}${l}`}function CP({config:t}){return t.emulator?gu(t,bP):`https://${t.authDomain}/${vP}`}/**
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
 */const Va="webStorageSupport";class TP{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=m_,this._completeRedirectFn=T_,this._overrideRedirectResult=qN}async _openPopup(e,n,i,s){xt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await mf(e,n,i,Wc(),s);return yP(e,r,bu())}async _openRedirect(e,n,i,s){await this._originValidation(e);const r=await mf(e,n,i,Wc(),s);return AN(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:r}=this.eventManagers[n];return s?Promise.resolve(s):(xt(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[n]={promise:i},i.catch(()=>{delete this.eventManagers[n]}),i}async initAndGetManager(e){const n=await hP(e),i=new JN(e);return n.register("authEvent",s=>(T(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=n,i}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Va,{type:Va},s=>{const r=s?.[0]?.[Va];r!==void 0&&n(!!r),yt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=tP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return r_()||Zm()||yu()}}const SP=TP;var _f="@firebase/auth",yf="1.12.0";/**
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
 */class IP{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){T(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function kP(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function AP(t){Ye(new Be("auth",(e,{options:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;T(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:o_(t)},l=new aN(i,s,r,c);return fN(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,i)=>{e.getProvider("auth-internal").initialize()})),Ye(new Be("auth-internal",e=>{const n=Ji(e.getProvider("auth").getImmediate());return(i=>new IP(i))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(_f,yf,kP(t)),$e(_f,yf,"esm2020")}/**
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
 */const RP=300,NP=Xp("authIdTokenMaxAge")||RP;let wf=null;const PP=t=>async e=>{const n=e&&await e.getIdTokenResult(),i=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(i&&i>NP)return;const s=n?.token;wf!==s&&(wf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function OP(t=Uo()){const e=_n(t,"auth");if(e.isInitialized())return e.getImmediate();const n=hN(t,{popupRedirectResolver:SP,persistence:[b_,p_,m_]}),i=Xp("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=PP(r.toString());EN(n,o,()=>o(n.currentUser)),bN(n,a=>o(a))}}const s=Yp("auth");return s&&pN(n,`http://${s}`),n}function LP(){return document.getElementsByTagName("head")?.[0]??document}cN({loadJS(t){return new Promise((e,n)=>{const i=document.createElement("script");i.setAttribute("src",t),i.onload=e,i.onerror=s=>{const r=ot("internal-error");r.customData=s,n(r)},i.type="text/javascript",i.charset="UTF-8",LP().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});AP("Browser");const qD=()=>!1,DP=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},$=(...t)=>{},MP=(...t)=>{localStorage.getItem("debug:console")},xP="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",vs=new Set;function FP(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function UP(t){return $("[ONE TAP] Callback registered, total callbacks:",vs.size+1),vs.add(t),()=>vs.delete(t)}function oi(t){$("[ONE TAP] Notifying status:",t,"to",vs.size,"callbacks"),vs.forEach(e=>{try{e(t)}catch{}})}function I_(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>I_(),100);return}FP(),google.accounts.id.initialize({client_id:xP,callback:$P,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function k_(){if(Cu()){oi("not_needed");return}window.google?.accounts?.id&&(oi("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?oi("skipped"):e==="dismissed"?oi("dismissed"):e==="display"&&oi("displayed")}))}async function $P(t){try{$("[ONE TAP] Received credential, signing in with Firebase..."),oi("signing_in");const e=gt.credential(t.credential),n=await vN(Ue,e);$("[ONE TAP] ✅ Successfully signed in:",n.user.email),Hs(!1)}catch(e){const n=e?.code||"unknown",i=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${i}`)}}let zc=!1;async function BP(){const t=H();if(!t||zc)return;const e=S(I,`users/${t}/presence`);try{await te(e,{state:"online",lastChanged:Dn()}),await Tm(e).set({state:"offline",lastSeen:Dn(),lastChanged:Dn()}),zc=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function HP(){const t=H();if(!t)return;const e=S(I,`users/${t}/presence`);try{await te(e,{state:"offline",lastSeen:Dn(),lastChanged:Dn()}),zc=!1}catch(n){console.error("Failed to set offline:",n)}}function A_(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();return btoa(unescape(encodeURIComponent(e))).replace(/\//g,"-")}async function WP(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=A_(t.email),n=S(I,`usersByEmail/${e}`),i={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await te(n,i),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(s){throw console.error("[USER DISCOVERY] Failed to register user:",s),s}}async function R_(t){if(!t||typeof t!="string")return null;try{const e=A_(t),n=S(I,`usersByEmail/${e}`),i=await ze(n);return i.exists()?i.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function VP(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async i=>{const s=await R_(i);e[i]=s});return await Promise.all(n),e}const Ue=OP(ta),jP=typeof import.meta<"u"&&!0;function N_(t,e,n={}){const i=typeof window<"u"?window.location.origin:"n/a";jP?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:i,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:i})}const P_=(async()=>{try{await Wa(Ue,b_)}catch{try{await Wa(Ue,p_)}catch{await Wa(Ue,jc)}}try{(await KN(Ue))?.user&&$("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){$("[AUTH] No redirect result:",t.code)}setTimeout(()=>{I_(),k_()},500)})();let O_=!1;function Hs(t){O_=t}function qP(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function L_(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,i=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:i,isIOSStandalone:n&&i}}function zP(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:i}=L_();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&i){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),Hs(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const s=t?.customData?.email;if(N_("Google sign-in",t,{email:s?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let as=null;const GP=()=>Math.random().toString(36).substring(2,15),Gc="guestUser",KP=2880*60*1e3;function YP(){try{const t=typeof localStorage<"u"?localStorage.getItem(Gc):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(Gc)}catch{}return null}return e}catch{return null}}function JP(t,e=KP){const n=Date.now(),i={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(Gc,JSON.stringify(i))}catch{}return i}function ge(){const t=H();if(t)return t;if(!as){const e=YP();e&&e.id?as=e.id:(as=GP(),JP(as))}return as}function zn(){return Ue.currentUser}function Cu(){return Ue.currentUser!==null}function H(){return Ue.currentUser?.uid??null}function XP(){return new Promise(t=>{const e=d_(Ue,n=>{e(),t(n)})})}function Tu(t,{truncate:e=7}={}){return d_(Ue,n=>{const i=!!n,s=n?.displayName||"Guest User",r=typeof s=="string"&&s.length>e?s.slice(0,e)+"...":s;i&&(BP().catch(o=>{console.warn("Failed to initialize presence:",o)}),WP(n).catch(o=>{console.warn("Failed to register user in directory:",o)}));try{t({user:n,isLoggedIn:i,userName:r})}catch{}})}const D_=async()=>{const t=new gt;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=L_();try{if(e&&O_){$("[AUTH] Using Safari external fallback"),Hs(!1),qP();return}$("[AUTH] Starting popup sign-in flow...");const n=await HN(Ue,t);return $("[AUTH] Popup sign-in successful:",n.user.email),Hs(!1),n}catch(n){zP(n)}};async function M_(){try{await HP(),await CN(Ue),console.info("User signed out"),setTimeout(()=>k_(),1500)}catch(t){throw N_("Sign out",t),t}}const QP="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com";function x_(){return new Promise((t,e)=>{if(typeof google>"u"||!google.accounts?.oauth2){e(new Error("Google Identity Services not loaded"));return}const n=zn();console.log("[AUTH] Requesting contacts access via GIS Token Model..."),google.accounts.oauth2.initTokenClient({client_id:QP,scope:"https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly",hint:n?.email||void 0,callback:s=>{if(s.error){console.error("[AUTH] Token request error:",s.error),s.error==="access_denied"?e(new Error("Authorization cancelled")):e(new Error(s.error_description||s.error));return}if(!s.access_token){e(new Error("No access token received"));return}console.log("[AUTH] Contacts access granted"),t(s.access_token)},error_callback:s=>{console.error("[AUTH] Token client error:",s),s.type==="popup_closed"?e(new Error("Authorization cancelled")):e(new Error(s.message||"Authorization failed"))}}).requestAccessToken()})}const F_=Object.freeze(Object.defineProperty({__proto__:null,auth:Ue,authReady:P_,getCurrentUser:zn,getCurrentUserAsync:XP,getLoggedInUserId:H,getUserId:ge,isLoggedIn:Cu,onAuthChange:Tu,requestContactsAccess:x_,setSafariExternalOpenArmed:Hs,signInWithAccountSelection:D_,signOutUser:M_},Symbol.toStringTag,{value:"Module"}));function aa(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class ZP{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}}const vf=100;class e0 extends ZP{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const i=H();if(!i)throw new Error("Cannot send message: not logged in");const r=zn()?.displayName||"Guest User",o=this._getConversationId(i,e),a=Us(S(I,`conversations/${o}/messages`));await te(a,{text:n,from:i,fromName:r,sentAt:Dn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const i=H();if(!i)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const s=this._getConversationId(i,e),r=S(I,`conversations/${s}/messages`),o=new Set,a=c=>{const l=c.key,u=c.val();if(!u||o.has(l))return;o.add(l);const d=u.from===i;n(u.text,u,d)};return Di(r,a),()=>{Ot(r,"child_added",a)}}async getUnreadCount(e){const n=H();if(!n)return 0;const i=this._getConversationId(n,e),s=S(I,`conversations/${i}/messages`),{get:r}=await Me(async()=>{const{get:o}=await Promise.resolve().then(()=>WA);return{get:o}},void 0);try{const o=await r(s);if(!o.exists())return 0;const a=o.val();return Object.values(a).filter(c=>!c.read&&c.from===e).length}catch(o){return console.warn("[RTDBTransport] Failed to get unread count:",o),0}}async markAsRead(e){const n=H();if(!n)return;const i=this._getConversationId(n,e),s=S(I,`conversations/${i}/messages`);try{const r=await ze(s);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${i}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await Ln(S(I),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const i=H();if(!i)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const s=this._getConversationId(i,e),r=S(I,`conversations/${s}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Di(r,a),Sm(r,c),()=>{Ot(r,"child_added",a),Ot(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=S(I,`conversations/${e}/messages`),i=await ze(n);if(!i.exists())return;const s=i.val(),r=Object.keys(s).length;if(r<=vf)return;const o=r-vf,a=Object.entries(s).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await Ln(S(I),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}}class t0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:i}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const s=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&i&&typeof i=="function"&&this.transport.getUnreadCount(e).then(l=>i(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},_unsubscribe:s};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const sn=new t0(new e0);function fo(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,i]=[t,e].sort(),s=`${n}_${i}`;let r=0;for(let u=0;u<s.length;u++){const d=s.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<s.length;u++)o=(o<<5)+o+s.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class n0{constructor(e,{loop:n=!1,volume:i=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,i)),this.isPlaying=!1,this.audio.onerror=s=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,s),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class i0{constructor({incomingSrc:e,outgoingSrc:n,volume:i}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=i??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:i}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),i!==void 0&&(this.defaultVolume=i)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new n0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const i=await this.currentPlayer.play();return i?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),i}catch(i){return console.error(`[Ringtone] Error playing ${e} ringtone:`,i),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const gi=new i0,Ws=new WeakMap;function Su(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(Ws.has(t)||Ws.set(t,[]),e==="initiator")bf(t,"offerCandidates",n),Ef(t,"answerCandidates",n);else if(e==="joiner")bf(t,"answerCandidates",n),Ef(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function bf(t,e,n){t.onicecandidate=i=>{if(i.candidate){const s=Us(e==="offerCandidates"?Vm(n):jm(n));te(s,i.candidate.toJSON())}}}function Ef(t,e,n){const i=e==="offerCandidates"?Vm(n):jm(n);let s=!1;const r=()=>{if(s)return;s=!0;const a=()=>{t.remoteDescription&&(Iu(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};An(i,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=Ws.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function Iu(t){if(!t||!Ws.has(t))return;const e=Ws.get(t);if(e.length!==0){$(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(i=>{$("Error adding queued ICE candidate:",i)})}catch{}e.length=0}}const s0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:Iu,setupIceCandidates:Su},Symbol.toStringTag,{value:"Module"}));class mi{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,i={}){if(!this.isEnabled)return;const s={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...i},id:this.generateLogId()};this.logs.push(s),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,i)}logListenerAttachment(e,n,i,s={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:i,...s})}logListenerCleanup(e,n,i={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...i})}logDuplicateListener(e,n,i={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...i})}logIncomingCallEvent(e,n,i,s={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:i.isFresh,validationMethod:i.method,age:i.age,reason:i.reason,...s})}logNotificationDecision(e,n,i,s={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:i,...s})}logCallingUILifecycle(e,n,i={}){this.log("CALLING_UI",e,{roomId:n,...i})}logFirebaseOperation(e,n,i=null,s={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:i?{message:i.message,code:i.code,stack:i.stack}:null,...s})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,i,s={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:i.creationTime,listenerAttachTime:i.listenerAttachTime,timeDiff:i.listenerAttachTime-i.creationTime,...s})}logMemberJoinEvent(e,n,i,s={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:i.joinedAt,role:i.role,...s})}logContactSave(e,n,i={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...i})}logContactCall(e,n,i,s={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:i,...s})}logFreshnessValidation(e,n,i,s={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:i.isFresh,age:i.age,threshold:i.threshold,reason:i.reason},...s})}logRaceCondition(e,n,i,s={}){this.log("RACE_CONDITION",e,{roomId:n,events:i,...s})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(i=>i.category===e.category)),e.event&&(n=n.filter(i=>i.event===e.event)),e.roomId&&(n=n.filter(i=>i.data.roomId===e.roomId)),e.since&&(n=n.filter(i=>i.timestamp>=e.since)),e.until&&(n=n.filter(i=>i.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,i)=>n.timestamp-i.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(i=>i.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),i=new Blob([n],{type:"application/json"}),s=document.createElement("a");s.href=URL.createObjectURL(i),s.download=e,s.click(),URL.revokeObjectURL(s.href)}getLogsInTimeRange(e,n){return this.logs.filter(i=>i.timestamp>=e&&i.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(i=>i.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const i=JSON.parse(n);if(i.logs&&Array.isArray(i.logs)){const s=new Set(this.logs.map(o=>o.id)),r=i.logs.filter(o=>!s.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const i=localStorage.key(n);i&&i.startsWith("diagnostic-logs-")&&e.push(i)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;mi.getPersistedLogKeys().forEach(s=>{try{const r=localStorage.getItem(s);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(s)}}catch{localStorage.removeItem(s)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const i=this.logs.find(s=>s.category==="TIMING"&&s.event==="START"&&s.data.timingId===e);if(i){const s=Date.now()-i.timestamp;return this.log("TIMING","END",{timingId:e,duration:s,operation:i.data.operation,...n}),s}return null}}let ja=null;function y(){return ja||(ja=new mi),ja}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>y(),exportLogs:()=>{const e=y().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{y().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=y().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=y().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=y().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=y().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const i=y().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,i),i},persistLogs:()=>{const e=y().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=y().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=mi.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{y().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{y().enable(),console.log("Diagnostic logging enabled")},disable:()=>{y().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=y(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=y();t.logs.length>0&&t.persistLogs(),mi.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=y(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=mi.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class r0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,i=null){const s=Date.now();i||(i=Math.random().toString(36).substring(2,15)),y().log("ROOM","CREATE_START",{roomId:i,userId:n,hasOffer:!!e,timestamp:s});const r=En(i);try{return await te(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),y().logFirebaseOperation("create_room",!0,null,{roomId:i,userId:n,duration:Date.now()-s}),await this.joinRoom(i,n),y().log("ROOM","CREATE_COMPLETE",{roomId:i,userId:n,totalDuration:Date.now()-s}),i}catch(o){throw y().logFirebaseOperation("create_room",!1,o,{roomId:i,userId:n,duration:Date.now()-s}),o}}async checkRoomStatus(e){const n=En(e),i=await ze(n);if(!i.exists())return{exists:!1,hasMembers:!1,memberCount:0};const s=i.val(),r=s.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:s}}async getRoomData(e){const n=En(e),i=await ze(n);if(!i.exists())throw new Error("Room does not exist");return i.val()}async saveAnswer(e,n){const i=En(e);await Ln(i,{answer:n})}async joinRoom(e,n,i="Guest User"){const s=nf(e,n);await te(s,{displayName:i,joinedAt:Date.now()}),y().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:i=!0}={}){const s=n||this.currentRoomId;if(!s||!e)return;const r=nf(s,e),o=yr(s),a=En(s);try{await He(r)}catch(c){y().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:s,userId:e})}if(i)try{const c=await ze(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await He(a).catch(d=>{y().logFirebaseOperation("delete_empty_room",!1,d,{roomId:s})})}catch(c){y().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:s})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,i="user_rejected"){if(!e||!n)return;const s=En(e),r={rejection:{by:n,reason:i,at:Date.now()}};try{await Ln(s,r),y().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}async cancelCall(e,n,i="caller_cancelled"){if(!e||!n)return;const s=En(e),r={cancellation:{by:n,reason:i,at:Date.now()}};try{await Ln(s,r),y().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:i})}catch(o){throw y().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:i,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const i=DR(e);An(i,"value",n,e),y().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const i=yr(e);An(i,"child_added",n,e),y().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const i=yr(e);An(i,"child_removed",n,e),y().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,i){const s=yr(e),r=a=>{i("join",a.key,a.val())},o=a=>{i("leave",a.key,a.val())};return An(s,"child_added",r,e,n),An(s,"child_removed",o,e,n),()=>LR(n,e)}get roomId(){return this.currentRoomId}}const ee=new r0,Ft={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=Ft.view;document.body.dataset.mainContent=Ft.currentMedia;const po=3e4;let Et=null,ds=null;async function o0(t,e=null){const n=ge(),i=H();if(!i)return;const s=hu(i);await te(s,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function go(){const t=H();if(!t)return;const e=hu(t);await He(e).catch(()=>{})}async function U_(t,e){if(!t)return!1;try{const n=hu(t),i=await ze(n);if(!i.exists())return!1;const s=i.val();return s.roomId!==e?!1:Date.now()-s.initiatedAt<po}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function $_(t){if(!t)return!1;try{const e=S(I,`rooms/${t}/createdAt`),n=await ze(e);if(!n.exists())return!1;const i=n.val();return typeof i!="number"?!1:Date.now()-i<po}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function B_(t,e,n){const i=y(),s=Date.now();xn(),await o0(t,e),Ft.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{i.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-s});try{await Promise.all([go(),ee.cancelCall(t,ge(),"caller_cancelled"),ee.leaveRoom(ge(),t)])}catch(d){i.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}gi.stop(),xn()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,Et=r,gi.playOutgoing(),ds=setTimeout(async()=>{i.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-s,timeoutMs:po});try{await Promise.all([go(),ee.cancelCall(t,ge(),"auto_timeout"),ee.leaveRoom(ge(),t)])}catch(d){i.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}gi.stop(),xn()},po)}function xn(){if(gi.stop(),Ft.view==="calling"&&Ft.setView("lobby"),Et){const t=Et.dataset?.roomId||"unknown";y().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!ds,timestamp:Date.now()})}ds&&(clearTimeout(ds),ds=null),Et&&(Et.remove(),Et=null)}async function ku(){if(Et){const t=Et.dataset?.roomId||"unknown";y().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await go(),xn()}async function a0(t="user_rejected"){const e=y(),n=Et?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await go(),xn()}const c0=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:xn,isOutgoingCallFresh:U_,isRoomCallFresh:$_,onCallAnswered:ku,onCallRejected:a0,showCallingUI:B_},Symbol.toStringTag,{value:"Module"})),q=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Xe=null,yn=null,ca=null,Au=null,Ve=null,me=null,se=null,re=null,x=null,Ae=null,Ge=null,at=null,ct=null,Xi=null,H_=null,lt=null,la=null,fn=null,Qi=null,Zi=null,Gn=null,Ru=null,Nu=null,Pu=null,Ou=null,_i=null,Vs=null,Lu=null;function Cf(){Xe=q("lobby"),yn=q("lobby-call-btn"),ca=q("title-auth-bar"),Au=q("videos"),Ve=q("local-video-el"),me=q("local-video-box"),se=q("remote-video-el"),re=q("remote-video-box"),x=q("shared-video-el"),Ae=q("shared-video-box"),Ge=q("chat-controls"),at=q("call-btn"),ct=q("hang-up-btn"),Xi=q("switch-camera-btn"),lt=q("mute-btn"),la=q("fullscreen-partner-btn"),fn=q("remote-pip-btn"),Qi=q("mic-btn"),Zi=q("camera-btn"),Gn=q("exit-watch-mode-btn"),Ru=q("app-pip-btn"),Nu=q("app-title-h1"),Pu=q("app-title-a"),Ou=q("app-title-span"),_i=q("paste-join-btn"),Vs=q("add-contact-btn"),Lu=q("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Cf):Cf();const W_=()=>({lobbyDiv:Xe,lobbyCallBtn:yn,titleAuthBar:ca,videosWrapper:Au,localVideoEl:Ve,localBoxEl:me,remoteVideoEl:se,remoteBoxEl:re,sharedVideoEl:x,sharedBoxEl:Ae,chatControls:Ge,callBtn:at,hangUpBtn:ct,switchCameraBtn:Xi,installBtn:H_,mutePartnerBtn:lt,fullscreenPartnerBtn:la,remotePipBtn:fn,micBtn:Qi,cameraBtn:Zi,exitWatchModeBtn:Gn,appPipBtn:Ru,appTitleH1:Nu,appTitleA:Pu,appTitleSpan:Ou,pasteJoinBtn:_i,addContactBtn:Vs,testNotificationsBtn:Lu});function V_(t,e=3,n=100){return new Promise(i=>{let s=0;const r=()=>{const o=document.getElementById(t);if(o){i(o);return}if(s++,s>=e){console.warn(`Element ${t} not found after ${e} attempts`),i(null);return}setTimeout(r,n)};r()})}async function j_(t,e=3,n=100){const i={},s=t.map(async r=>{const o=await V_(r,e,n);return i[r]=o,o});return await Promise.all(s),i}async function l0(){const t=await j_(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([i,s])=>!s).map(([i])=>i);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const u0=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return Vs},get appPipBtn(){return Ru},get appTitleA(){return Pu},get appTitleH1(){return Nu},get appTitleSpan(){return Ou},get callBtn(){return at},get cameraBtn(){return Zi},get chatControls(){return Ge},get exitWatchModeBtn(){return Gn},get fullscreenPartnerBtn(){return la},getElements:W_,get hangUpBtn(){return ct},initializeYouTubeElements:l0,installBtn:H_,get lobbyCallBtn(){return yn},get lobbyDiv(){return Xe},get localBoxEl(){return me},get localVideoEl(){return Ve},get micBtn(){return Qi},get mutePartnerBtn(){return lt},get pasteJoinBtn(){return _i},get remoteBoxEl(){return re},get remotePipBtn(){return fn},get remoteVideoEl(){return se},robustElementAccess:V_,get sharedBoxEl(){return Ae},get sharedVideoEl(){return x},get switchCameraBtn(){return Xi},get testNotificationsBtn(){return Lu},get titleAuthBar(){return ca},get videosWrapper(){return Au},waitForElements:j_},Symbol.toStringTag,{value:"Module"})),Du=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),mo=t=>{if(Du(t))return t.classList.contains("hidden")},M=t=>{Du(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},w=t=>{Du(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},q_=t=>t.classList.contains("small-frame"),js=t=>{if(t&&!q_(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},rn=t=>{if(q_(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function Mu(t){return document.pictureInPictureElement===t}function d0(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:i=null,onHide:s=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){M(t);try{typeof i=="function"&&i()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{w(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{w(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(R){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",R)}}}n.addEventListener("mouseout",h);function f(m){if(r&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),w(t);try{typeof s=="function"&&s()}catch(R){console.warn("showHideOnInactivity onHide (esc) callback error:",R)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),w(t);function _(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return _}let It=null,kt=null,z_="user";function Kc(){return z_}function G_(t){z_=t}function ua(){return It instanceof MediaStream}function xu(){return!It||!(It instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",It),null):It}function K_(t){It=t}function Y_(){It&&(It.getTracks().forEach(t=>t.stop()),It=null)}function J_(){return kt instanceof MediaStream}function da(){return!kt||!(kt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",kt),console.error("Call createLocalStream() before accessing local stream."),null):kt}function _o(t){kt=t}function X_(){kt&&(kt.getTracks().forEach(t=>t.stop()),kt=null)}const h0=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:X_,cleanupRemoteStream:Y_,getFacingMode:Kc,getLocalStream:da,getRemoteStream:xu,hasLocalStream:J_,hasRemoteStream:ua,setFacingMode:G_,setLocalStream:_o,setRemoteStream:K_},Symbol.toStringTag,{value:"Module"})),Tf="yt-video-box",Yc="yt-player-root";let J=null,Bt=!1;const bs=()=>J,f0=()=>Bt,Q_=t=>Bt=t,yi=()=>{const t=document.getElementById(Tf);if(!t)throw new Error(`Container #${Tf} not found`);return t};function p0(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Z_(){const t=yi();if(!document.getElementById(Yc)){const e=document.createElement("div");e.id=Yc,t.appendChild(e)}M(t)}function yo(){const t=yi();w(t)}function qa(){const t=yi();return t&&!t.classList.contains("hidden")}function Jc(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function ey(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const i=t.match(n);if(i&&i[1])return i[1]}return null}async function g0({url:t,onReady:e,onStateChange:n}){const i=ey(t);if(!i)throw new Error("Invalid YouTube URL");if(await p0(),J){try{J.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}J=null}const s=(o=!0)=>{const a=yi(),c=J.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=yi(),h=J.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),J.getPlayerState()!==window.YT.PlayerState.PLAYING?Uu():cr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=yi(),a=J.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Z_(),new Promise((o,a)=>{try{J=new window.YT.Player(Yc,{videoId:i,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{Bt=!0,e&&e(c),o(J)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&s(!1),c.data===window.YT.PlayerState.PAUSED&&s(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Fu(){if(J){try{yo(),J.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}J=null,Bt=!1}}function Uu(){J&&Bt&&J.playVideo()}function cr(){J&&Bt&&J.pauseVideo()}function m0(t){J&&Bt&&J.seekTo(t,!0)}function wo(){return J&&Bt?J.getCurrentTime():0}function $u(){return J&&Bt?J.getPlayerState():-1}const Qt={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},ty=()=>{if(!ua())return!1;const t=xu();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function _0(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function y0(){Kn()||(iy(!0),w(Xe),w(yn),Ge.classList.remove("bottom"),Ge.classList.add("watch-mode"),Qc()?(w(at),M(ct)):(w(ct),w(Qi),w(lt),M(at)),w(Zi),w(Xi),M(Gn),M(Ge),Qc()&&(w(me),rn(me),w(re),Mu(se)?rn(re):_0()?se.requestPictureInPicture().then(()=>{rn(re)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),js(re),M(re)}):(js(re),M(re))))}function w0(){Kn()&&(w(Gn),M(at),M(ct),M(Qi),M(lt),M(Zi),M(Xi),Ge.classList.remove("watch-mode"),Ge.classList.add("bottom"),M(Ge),ty()&&(Mu(se)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),rn(re),M(re)),Qc()?(js(me),M(me)):(M(Xe),M(yn),rn(me),w(me)),iy(!1))}function vo(){Ft.setMainContent("ytVideo"),y0()}function Es(){Ft.setMainContent("remoteStream"),w0()}let we=null,Ut=null,ny=!1,ut="none",Cs=null,Ke=null;const Kn=()=>ny,iy=t=>ny=t,ft=()=>ut,v0=t=>{["yt","url","file","none"].includes(t)?ut=t:console.warn("Invalid lastWatched platform:",t)};let Zt=!1,Ts=null,wi=0,za=!1;async function vi(t){if(!we)return;console.debug("Updating watch sync state, roomId:",we);const e=ia(we);try{await Ln(e,{...t,updatedBy:Ut})}catch(n){console.error("Failed to update watch state:",n)}}function b0(t,e,n){if(!t)return;we=t,Ut=n;const i=ia(t),s=sa(t);ys(i,S0,t),ys(s,T0,t),O0()}function Bu(t){return typeof t=="string"&&t.startsWith("blob:")}async function E0(t,e){if(!we||!Ut)return!1;const n=sa(we);try{return await te(n,{fileName:t,requestedBy:Ut,timestamp:Date.now()}),Ke&&clearTimeout(Ke),Ke=setTimeout(()=>{Xc()},300*1e3),!0}catch(i){return console.error("Failed to create watch request:",i),!1}}async function C0(t){if(!we)return!1;const e=sa(we);try{await He(e)}catch(n){console.warn("Failed to remove watch request:",n)}return Ke&&(clearTimeout(Ke),Ke=null),await qs(t)}async function Xc(){if(!we)return;Ke&&(clearTimeout(Ke),Ke=null);const t=sa(we);try{await He(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function T0(t){const e=t.val();if(!e){Ke&&(clearTimeout(Ke),Ke=null);return}e.requestedBy!==Ut&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function S0(t){const e=t.val();e&&e.updatedBy!==Ut&&(Date.now()-wi<500||(e.url&&e.url!==Cs&&!Bu(e.url)&&I0(e.url),e.isYouTube?k0(e):P0(e)))}function I0(t){Cs=t,Jc(t)?(w(Ae),sy(t),ut="yt"):(Fu(),M(Ae),x.src=t,ut="url"),vo()}function k0(t){!bs()||!f0()||(A0(t),R0(t))}function A0(t){const e=$u(),n=e===Qt.PLAYING;if([Qt.BUFFERING,Qt.UNSTARTED].includes(e)){N0();return}Zt||(t.playing&&!n?(Uu(),ut="yt"):!t.playing&&n&&(cr(),ut="yt"))}function R0(t){if(t.currentTime===void 0)return;const e=wo();Math.abs(e-t.currentTime)>.3&&!Zt&&(m0(t.currentTime),setTimeout(()=>{t.playing?Uu():cr(),ut="yt"},500))}function N0(){Zt=!0,clearTimeout(Ts),Ts=setTimeout(async()=>{Zt=!1;const t=$u()===Qt.PLAYING;await vi({playing:t,currentTime:wo()})},700)}function P0(t){wi=Date.now(),t.playing!==void 0&&(t.playing&&x.paused?x.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!x.paused&&x.pause()),t.currentTime!==void 0&&Math.abs(x.currentTime-t.currentTime)>1&&(x.currentTime=t.currentTime,t.playing?x.play().catch(n=>console.warn("Play failed:",n)):x.pause())}function O0(){const t=()=>{ut!=="file"&&(ut="url")};x.addEventListener("play",async()=>{!bs()&&we&&(wi=Date.now(),await vi({playing:!0,currentTime:x.currentTime,isYouTube:!1})),t()}),x.addEventListener("pause",async()=>{x.seeking||(!bs()&&we&&(wi=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:x.currentTime}),await vi({playing:!1,currentTime:x.currentTime,isYouTube:!1})),t())}),x.addEventListener("playing",()=>{za=!0}),x.addEventListener("pause",()=>{x.seeking||(za=!1)},!0),x.addEventListener("seeked",async()=>{!bs()&&we&&(wi=Date.now(),await vi({currentTime:x.currentTime,playing:za,isYouTube:!1})),t()})}async function L0(t){if(!t)return!1;wi=Date.now();const e=Bu(t);if(Jc(t)){if(w(Ae),!await sy(t))return!1;ut="yt"}else Fu(),M(Ae),x.src=t,ut=e?"file":"url";if(we){const n=ia(we);e?await te(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Ut}):te(n,{url:t,playing:!1,currentTime:0,isYouTube:Jc(t),updatedBy:Ut})}return vo(),!0}async function qs(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;Cs=e;const n=await L0(e);return n||Bu(Cs)&&t instanceof File&&(URL.revokeObjectURL(e),Cs=null),n}async function sy(t){if(!ey(t))return console.error("Invalid YouTube URL:",t),!1;try{return await g0({url:t,onReady:n=>{if(Q_(!0),we){const i=ia(we);te(i,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Ut})}},onStateChange:async n=>{if(!bs())return;const s=n.data===Qt.PLAYING,r=n.data===Qt.PAUSED;if(n.data===Qt.BUFFERING){Zt=!0,Ts&&clearTimeout(Ts),Ts=setTimeout(async()=>{Zt=!1;const c=$u()===Qt.PLAYING;await vi({playing:c,currentTime:wo()})},700);return}r&&Zt||!Zt&&(s||r)&&await vi({playing:s,currentTime:wo()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let bi=!1,vr=!1,Sf=null,If=null,Ss=null;const Qc=()=>bi,ry=()=>{if(!bi){if(!se||!ua()||se.paused||se.readyState<2){vr||(vr=!0,se.addEventListener("playing",()=>{vr=!1,ry()},{once:!0}));return}if(vr=!1,bi=!0,M(re),M(me),js(me),w(Xe),w(yn),at.disabled=!0,at.classList.add("disabled"),ct.disabled=!1,ct.classList.remove("disabled"),lt.disabled=!1,lt.classList.remove("disabled"),fn.disabled=!1,fn.classList.remove("disabled"),Ss||(Ss=d0(Ge,{inactivityMs:2500,hideOnEsc:!0})),!Sf){const t=()=>{bi&&(Kn()?js(re):rn(re),M(re))};se.addEventListener("leavepictureinpicture",t),Sf=()=>se.removeEventListener("leavepictureinpicture",t)}if(!If){const t=()=>w(re);se.addEventListener("enterpictureinpicture",t),If=()=>se.removeEventListener("enterpictureinpicture",t)}}},D0=()=>{bi&&(bi=!1,Mu(se)&&document.exitPictureInPicture().catch(()=>{}),rn(me),w(me),rn(re),w(re),at.disabled=!1,at.classList.remove("disabled"),ct.disabled=!0,ct.classList.add("disabled"),lt.disabled=!0,lt.classList.add("disabled"),fn.disabled=!0,fn.classList.add("disabled"),Ss&&(Ss(),Ss=null),Kn()||(M(yn),M(Xe),M(Ge)))};function oy(){Ft.setView("connected"),ry()}function ay(){Ft.setView("lobby"),D0()}let ht=null,kf=null;function cy(t){kf=t,t.onconnectionstatechange=()=>{$("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(oy(),ku().catch(e=>console.warn("Failed to clear calling state on connect:",e)),ht&&(clearTimeout(ht),ht=null)):t.connectionState==="disconnected"?(ht&&clearTimeout(ht),ht=setTimeout(()=>{t===kf&&t.connectionState==="disconnected"&&_e.cleanupCall({reason:"connection_lost"}),ht=null},3e3)):t.connectionState==="failed"&&(aa(),ht&&(clearTimeout(ht),ht=null),_e.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{$("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Hu={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Ga=new WeakMap;function ly(t,e,n){Ga.has(t)||Ga.set(t,{});const i=Ga.get(t),s=e==="offer"?"lastOffer":"lastAnswer";return i[s]===n?!0:(i[s]=n,!1)}function uy(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Wu(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function dy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function hy(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function fy(t,e,n){if(ly(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!uy(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(i){return console.error(`Failed to set remote description (${e.type}):`,i),!1}}function py(){return Math.random().toString(36).substring(2,9)}const M0=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Wu,createAnswer:hy,createOffer:dy,generateRoomId:py,isDuplicateSdp:ly,isValidSignalingState:uy,rtcConfig:Hu,setRemoteDescription:fy},Symbol.toStringTag,{value:"Module"}));async function x0({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:i,setupWatchSync:s,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Hu),a="initiator",c=r||py(),l=ge();Wu(o,t);const u=o.createDataChannel("files");if(!i(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Su(o,a,c),cy(o);const h=await dy(o);await ee.createNewRoom(h,l,c),s(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function F0({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:i,setupRemoteStream:s,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await ee.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await ee.getRoomData(t)}catch(m){return $("Error: "+m.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Hu),d="joiner",h=ge();Wu(u,e);let f=null;if(u.ondatachannel=m=>{f=m.channel,$("[Call Flow] DataChannel received by joiner",{label:f.label})},!s(u,n,i))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Su(u,d,t),cy(u),await fy(u,l,Iu);const _=await hy(u);try{await ee.saveAnswer(t,_)}catch(m){return console.error("Failed to save answer to Firebase:",m),u.close(),{success:!1}}return r(t,d,h),await ee.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class U0{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const $0={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function B0(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function H0(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const i=new DataView(t).getUint32(0,!0),s=4+i;if(t.byteLength<s)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",s,"got:",t.byteLength),null;const r=new Uint8Array(t,4,i),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+i,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const W0=1024;function V0(t,e,n){let i=0,s=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(s++,i+=c.byteLength):r.push(l)});const o=e-i;return{isComplete:s===n&&Math.abs(o)<=W0,validChunks:s,totalSize:i,missingChunks:r,sizeDifference:o}}const Ka=$0.FILE_CONFIG.NETWORK_CHUNK_SIZE,Af=9e3*1024*1024;class j0{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>Af)throw new Error(`File too large (max ${Af/(1024*1024)} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const i=`${e.name}-${e.size}-${Date.now()}`,s=Math.ceil(e.size/Ka);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:i,name:e.name,size:e.size,mimeType:e.type,totalChunks:s}));for(let r=0;r<s;r++){const o=r*Ka,a=Math.min(o+Ka,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:i,chunkIndex:r,totalChunks:s},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/s);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await B0(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const i=H0(n);if(!i){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:s,chunkData:r}=i,o=this.receivedChunks.get(s.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",s.fileId);return}if(o[s.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/s.totalChunks)}o.filter(a=>a).length===s.totalChunks&&this.assembleFile(s.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),i=this.receivedChunks.get(e),s=V0(i,n.size,n.totalChunks);if(!s.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...s}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:s});return}const r=new Blob(i,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class q0 extends U0{constructor(e){if(super(),!e)throw new Error("DataChannelFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new j0(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function bo(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:i=[],esc:s=!0,events:r=["mousedown","touchstart"]}=n,o=Array.isArray(i)?i.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{s&&l.key==="Escape"&&e(l)};return r.forEach(l=>document.addEventListener(l,a,{passive:!0})),s&&document.addEventListener("keydown",c),function(){r.forEach(u=>document.removeEventListener(u,a,{passive:!0})),s&&document.removeEventListener("keydown",c)}}const z0=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),G0=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,i)=>{const s=i.trim(),r=s.split(".").reduce((a,c)=>a?.[c],e);return r==null?"":s.endsWith("Html")?String(r):z0(String(r))}),K0=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=G0(t,e),n.content.cloneNode(!0)},Y0=(t,e)=>{const n=[];let i=e;for(;i&&i!==t;){const s=i.parentElement;if(!s)break;const r=Array.prototype.indexOf.call(s.children,i);n.push(r),i=s}return n.reverse()},J0=(t,e)=>e.reduce((n,i)=>n&&n.children?n.children[i]:null,t),X0=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:Y0(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),Q0=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),Z0=(t,e)=>{e.forEach(n=>{let i=null;if(n.name){const s=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of s)if(r.getAttribute("name")===n.name){i=r;break}}else if(n.id)try{i=t.querySelector("#"+Q0(n.id))}catch{i=t.querySelector(`#${n.id}`)}else n.path&&(i=J0(t,n.path));if(i){if(i.value=n.value,n.checked!==void 0&&(i.checked=n.checked),n.selectionStart!=null&&i.setSelectionRange)try{i.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{i.focus()}catch{}}})},eO=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),tO=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const i of n)if(i.currentSrc===e||i.src===e)return i;return null},nO=(t,e)=>{e.forEach(n=>{if(!n.src)return;const i=tO(t,n.src);i&&(i.currentTime=n.currentTime,i.volume=n.volume,i.playbackRate=n.playbackRate,i.muted=n.muted,n.paused||i.play().catch(()=>{}))})},iO=()=>document.readyState!=="loading",Vu=({initialProps:t={},template:e="",handlers:n={},parent:i=null,containerTag:s="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!iO())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(s);r&&(u.className=r);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const b=p[1].trim().split(".")[0];h.add(b)}const _=[],m=[],R={},B=()=>{let b=[],oe=[];l&&(b=X0(u),oe=eO(u)),u.textContent="";const We=K0(e,d);u.appendChild(We),Object.keys(n).forEach(Qe=>{const Te=u.querySelectorAll(`[onclick="${Qe}"]`),Ht=n[Qe];Te.forEach(ur=>{ur.removeAttribute("onclick"),typeof Ht=="function"&&ur.addEventListener("click",Ht)})}),l&&(Z0(u,b),nO(u,oe)),_.forEach(Qe=>Qe({...d}))},N=b=>{if(!Array.isArray(b)||b.length===0)return;const oe={props:{...d},changedKeys:b};m.forEach(We=>We(oe))};for(const b of Object.keys(t))R[b]=[],Object.defineProperty(u,b,{get(){return d[b]},set(oe){d[b]!==oe&&(d[b]=oe,h.has(b)&&B(),R[b].forEach(We=>We(oe)),N([b]))},configurable:!0,enumerable:!0});if(u.update=b=>{let oe=!1,We=!1;const Qe=[];for(const Te in b)b[Te]!==d[Te]&&(d[Te]=b[Te],h.has(Te)&&(We=!0),R[Te]&&R[Te].forEach(Ht=>Ht(b[Te])),oe=!0,Qe.push(Te));oe&&We&&B(),Qe.length>0&&N(Qe)},u.onRender=b=>{typeof b=="function"&&_.push(b)},u.onAnyPropUpdated=b=>{typeof b=="function"&&m.push(b)},u.onPropUpdated=(b,oe)=>{typeof oe=="function"&&R[b]&&R[b].push(oe)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(b=>{typeof b=="function"&&b()}):typeof a=="function"&&a()),_.length=0,m.length=0;for(const b in R)R[b].length=0;u.remove()},B(),c&&i&&!i.contains(u)&&i.appendChild(u),typeof o=="function")try{o(u)}catch(b){MP("[createComponent]: Error in onMount handler of component",b)}return u};function gy({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:i=0,id:s=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Vu({initialProps:{unreadCount:i},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(s&&o&&typeof s=="string")try{o.id=s}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=i>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function Rf(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),i=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(n||i)&&!window.MSStream,r=/Android/i.test(e),o=s||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:i,isMobileDevice:o}),o}function sO(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",i=null;try{i=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=i.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(i&&!i.hostname)return null;const s=n.toLowerCase();return s!=="http:"&&s!=="https:"?null:e}function rO(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let i=0,s;for(;(s=n.exec(t))!==null;){const r=s[0],o=s.index;o>i&&e.appendChild(document.createTextNode(t.slice(i,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=sO(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}i=o+r.length}return i<t.length&&e.appendChild(document.createTextNode(t.slice(i))),e}function oO(){const t=document.createElement("div");t.innerHTML=`
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
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),i=t.querySelector("#messages-form"),s=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(s&&s.tagName==="TEXTAREA"&&!r){const a=()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`};s.addEventListener("input",a,{passive:!0}),o=()=>{s.style.height=""},requestAnimationFrame(a)}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:i,messagesInput:s,resetInputHeight:o}}const aO=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function cO(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function lO(){let t=!1,e=null,n=null,i=!1,s=new Map;const r=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),o=gy({parent:r,onToggle:()=>ma(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!o)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const a=o.element,{messagesBoxContainer:c,messagesBox:l,messagesMessages:u,messagesForm:d,messagesInput:h,resetInputHeight:f}=oO();if(!a||!l||!u||!d||!h)return console.error("Messages UI elements not found."),null;const p=document.getElementById("attach-file-btn"),_=document.getElementById("file-input"),m=d.querySelector('button[type="submit"]');w(p),p.addEventListener("click",()=>{_.click()}),_.addEventListener("change",async C=>{const A=C.target.files[0];if(!A||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const D=m.textContent;m.textContent="Sending...";try{await n.sendFile(A,F=>{m.textContent=`${Math.round(F*100)}%`}),A.type.startsWith("video/")&&s.set(A.name,A),be(`📎 Sent: ${A.name}`,{isSentByMe:!0})}catch(F){console.error("[MessagesUI] File send failed:",F),be("❌ Failed to send file")}finally{m.textContent=D,_.value=""}});async function R(C){return new Promise(A=>{const D=document.createElement("div");D.className="file-action-overlay",D.style.cssText=`
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
      `,D.appendChild(F),document.body.appendChild(D);const ue=F.querySelector("#file-name-display");ue.textContent=C;const de=F.querySelector("#download-file-btn"),ae=F.querySelector("#watch-together-btn");de.addEventListener("mouseenter",()=>{de.style.background="var(--bg-hover, #333)"}),de.addEventListener("mouseleave",()=>{de.style.background="var(--bg-secondary, #2a2a2a)"}),ae.addEventListener("mouseenter",()=>{ae.style.opacity="0.9"}),ae.addEventListener("mouseleave",()=>{ae.style.opacity="1"}),de.addEventListener("click",()=>{D.remove(),A("download")}),ae.addEventListener("click",()=>{D.remove(),A("watch")}),D.addEventListener("click",Wt=>{Wt.target===D&&(D.remove(),A("download"))})})}async function B(C){return new Promise(A=>{const D=document.createElement("div");D.className="watch-request-overlay",D.style.cssText=`
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
      `,D.appendChild(F),document.body.appendChild(D);const ue=F.querySelector("#watch-request-filename");ue.textContent=C;const de=F.querySelector("#decline-watch-btn"),ae=F.querySelector("#accept-watch-btn");de.addEventListener("mouseenter",()=>{de.style.background="var(--bg-hover, #333)"}),de.addEventListener("mouseleave",()=>{de.style.background="var(--bg-secondary, #2a2a2a)"}),ae.addEventListener("mouseenter",()=>{ae.style.opacity="0.9"}),ae.addEventListener("mouseleave",()=>{ae.style.opacity="1"}),de.addEventListener("click",()=>{D.remove(),A(!1)}),ae.addEventListener("click",()=>{D.remove(),A(!0)}),D.addEventListener("click",Wt=>{Wt.target===D&&(D.remove(),A(!1))})})}window.onFileWatchRequestReceived=async C=>{const A=s.get(C);if(!A){be(`❌ File not available to watch together: ${C}`),await Xc();return}be(`🎬 Partner wants to watch: ${C}`),await B(C)?(be("✅ Joining watch together..."),await C0(A)||be("❌ Failed to load video")):(be("❌ Declined watch together request"),await Xc())};function N(){if(!a||!l||l.classList.contains("hidden"))return;const C=a.getBoundingClientRect(),A=l.getBoundingClientRect(),D=8;let F=C.top-A.height-D;F<8&&(F=C.bottom+D);let ue=C.left+C.width/2-A.width/2;const de=window.innerWidth-A.width-8;ue<8&&(ue=8),ue>de&&(ue=de),l.style.top=`${Math.round(F)}px`,l.style.left=`${Math.round(ue)}px`}function b(){t||(t=!0,window.addEventListener("resize",N,{passive:!0}),window.addEventListener("scroll",N,{passive:!0}),window.addEventListener("orientationchange",N,{passive:!0}))}function oe(){t&&(t=!1,window.removeEventListener("resize",N),window.removeEventListener("scroll",N),window.removeEventListener("orientationchange",N))}let We=null;const Qe=new MutationObserver(C=>{C.forEach(A=>{A.type==="attributes"&&A.attributeName==="class"&&(l.classList.contains("hidden")||(o.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});Qe.observe(l,{attributes:!0});function Te(){return!l.classList.contains("hidden")}function Ht(){return document.activeElement===h}function ur(){Ht()||h.focus()}function Qy(){Ht()&&h.blur()}function ma(){l.classList.toggle("hidden"),Te()?(Rf()||h.focus(),aO?requestAnimationFrame(()=>{cO(l)||(N(),b())}):(N(),b()),nd()):(document.activeElement===h&&h.blur(),oe(),l.style.top="",l.style.left="",l.style.bottom="",l.style.right="")}Rf()||(We=bo(l,()=>{w(l),oe(),l.style.top="",l.style.left="",l.style.bottom="",l.style.right=""},{ignore:[o.element],esc:!0}));function Zy(){M(o.element)}function td(){w(o.element)}function be(C,A={}){const{isSentByMe:D,senderDisplay:F,fileDownload:ue}=A,de=F??(D===!0?"Me":""),ae=document.createElement("p");D===!0?ae.classList.add("message-local"):D===!1&&ae.classList.add("message-remote");const Wt=document.createElement("span");Wt.className="sender-avatar"+(D===!0?" sender-avatar--me":""),Wt.textContent=de,Wt.setAttribute("aria-hidden","true");const es=document.createElement("span");if(es.className="message-text",!F&&typeof D>"u"&&ae.classList.add("message-system"),ue){const{fileName:ts,url:rd}=ue,od=C.split(ts)[0];od&&es.appendChild(document.createTextNode(od));const vn=document.createElement("a");vn.textContent=ts,vn.href=rd,vn.download=ts,vn.style.cursor="pointer",vn.style.textDecoration="underline",vn.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(rd),100)}),es.appendChild(vn)}else{const ts=rO(C);es.appendChild(ts)}ue&&ae.classList.add("message-system"),ae.appendChild(Wt),ae.appendChild(es),u.appendChild(ae),nd()}let wn=null;function nd(){u&&(wn!==null&&cancelAnimationFrame(wn),wn=requestAnimationFrame(()=>{u.scrollTop=u.scrollHeight,wn=null}))}function ew(C,{isUnread:A=!0,senderDisplay:D="U"}={}){if(be(C,{isSentByMe:!1,senderDisplay:D}),mo(l)&&A){const F=o.element.unreadCount||0;o.setUnreadCount(F+1)}}function id(){const C=h.value.trim();C&&(e?(e.send(C),h.value="",f&&f()):console.warn("[MessagesUI] No active session to send message"))}d.addEventListener("submit",C=>{C.preventDefault(),id()}),h.addEventListener("keydown",C=>{C.key==="Enter"&&!C.shiftKey&&(C.preventDefault(),id())});const tw=()=>{const C=document.activeElement;return C&&(C.tagName==="INPUT"||C.tagName==="TEXTAREA"||C.isContentEditable)},sd=C=>{(C.key==="m"||C.key==="M")&&!Te()&&!tw()&&(C.preventDefault(),ma())};document.addEventListener("keydown",sd);function _a(){wn!==null&&(cancelAnimationFrame(wn),wn=null),u.innerHTML="",u.scrollTop=0}function nw(C){e!==null&&e!==C&&_a(),e=C}function iw(){return e}function sw(C){n=C,n?(M(p),n.onFileReceived=async A=>{const D=URL.createObjectURL(A);if(A.type.startsWith("video/"))if(await R(A.name)==="watch"){if(be(`📹 Received video: ${A.name}`,{isSentByMe:!1}),be("🎬 Requesting partner to join watch together..."),!await qs(A)){be("❌ Failed to load video");return}const de=await E0(A.name);be(de?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const ue=document.createElement("a");ue.href=D,ue.download=A.name,ue.click(),setTimeout(()=>URL.revokeObjectURL(D),1e3),be(`📎 Downloaded: ${A.name}`)}else be(`📎 Received: ${A.name}`,{isSentByMe:!1,fileDownload:{fileName:A.name,url:D}});if(mo(l)){const F=o.element.unreadCount||0;o.setUnreadCount(F+1)}i&&(m.textContent="Send",i=!1)},n.onReceiveProgress=A=>{i=!0,m.textContent=`${Math.round(A*100)}%`}):w(p)}function rw(){_a(),e=null,n=null,i=!1,td(),w(l),o.clearBadge(),h.value="",f&&f(),m&&(m.textContent="Send"),w(p),l.style.top="",l.style.left="",l.style.bottom="",l.style.right="",oe()}function ow(){if(o&&o.cleanup(),oe(),typeof We=="function")try{We()}catch(C){console.error("Error removing messages box outside click handler:",C)}Qe.disconnect(),document.removeEventListener("keydown",sd),c&&c.parentNode&&c.parentNode.removeChild(c)}return{appendChatMessage:be,receiveMessage:ew,isMessagesUIOpen:Te,toggleMessages:ma,showMessagesToggle:Zy,hideMessagesToggle:td,isMessageInputFocused:Ht,focusMessageInput:ur,unfocusMessageInput:Qy,setSession:nw,getCurrentSession:iw,clearMessages:_a,setFileTransfer:sw,reset:rw,cleanup:ow}}const Se=lO();class uO{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const i of Array.from(this.listeners.get(e)))try{i(n)}catch(s){console.warn("CallController listener error",s)}}}class dO{constructor(){this.emitter=new uO,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=S(I,`rooms/${e}/cancellation`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i){i=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};ys(n,s,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:s,roomId:e})}setupAnswerListener(e,n,i){if(!e||!n)return;const s=S(I,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Me(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>M0);return{setRemoteDescription:l}},void 0);await c(n,a,i)}};ys(s,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:s,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=S(I,`rooms/${e}/rejection`);let i=!1;const s=async r=>{const o=r.val();if(o&&!i&&(i=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Me(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>c0);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await ee.leaveRoom(ge(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};ys(n,s,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:s,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=ge(),i=s=>{s.key!==n&&(this.setPartnerId(s.key),this.emitter.emit("memberJoined",{memberId:s.key,roomId:e}))};ee.onMemberJoined(e,i),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:i,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=ge(),i=s=>{s.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:s.key,roomId:e})};ee.onMemberLeft(e,i),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:i,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const i of n)try{i.ref&&Ot(i.ref,"value",i.callback)}catch(s){console.warn(`Failed to remove ${e} listener`,s)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{na(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await x0(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:i}=await Me(async()=>{const{drainIceCandidateQueue:s}=await Promise.resolve().then(()=>s0);return{drainIceCandidateQueue:s}},void 0);return this.setupAnswerListener(this.roomId,this.pc,i),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const i=await F0({...e,onMessagesUIReady:s=>{this.messagesUI=s}});return!i||!i.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:i}),this.emitCallFailed("answerCall",i),i):(this.pc=i.pc,this.roomId=i.roomId,this.role=i.role||"joiner",this.dataChannel=i.dataChannel||null,!this.messagesUI&&i.messagesUI&&(this.messagesUI=i.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=s=>{this.dataChannel=s.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),i)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const i=new q0(e);sn.setFileTransport(i),Se.setFileTransfer(i.fileTransfer),$("[CallController] File transport initialized")}catch(i){console.error("[CallController] Failed to setup file transport:",i)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await ee.cancelCall(this.roomId,ge(),n)}catch(i){console.warn("CallController: cancelCall failed (non-fatal)",i)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(i){throw this.emitter.emit("error",{phase:"hangUp",error:i}),i}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(i=>e.includes(i)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,i=this.partnerId,s=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await ee.leaveRoom(ge(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await Me(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>h0);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await Me(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>jD);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:i,reason:e});try{sn.clearFileTransport(),Se.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:s,wasConnected:r,partnerId:i,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const _e=new dO,Zc={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function my(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(i=>t[i])?Zc.withVoiceIsolationIfSupported:Zc.default}const hO=()=>Zc.default,fO={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},pO=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function ju(t){const e=pO()?"portrait":"landscape",i=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",s=fO[i][e];return{facingMode:t,...s}}function gO(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function mO(){return gO()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function _O(){const t=await mO();let e=!1,n=!1;return t.forEach(i=>{const s=i.label.toLowerCase();(s.includes("front")||s.includes("user"))&&(e=!0),(s.includes("back")||s.includes("rear")||s.includes("environment"))&&(n=!0)}),e&&n}async function yO({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:i=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const s=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:ju(s),audio:my()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),i){const h=i.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=i.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:s}}catch(r){return console.error("Failed to switch camera:",r),null}}let Ya=!1,Cn=null,Tn=null;function wO({getLocalStream:t,getFacingMode:e}){return Cn&&Tn&&Cn.removeEventListener("change",Tn),Cn=window.matchMedia("(orientation: portrait)"),Tn=()=>{try{const n=typeof t=="function"?t():null,i=typeof e=="function"?e():"user";vO({localStream:n,currentFacingMode:i})}catch(n){console.error("Orientation handler failed:",n)}},Cn.addEventListener("change",Tn),()=>{Cn&&Tn&&Cn.removeEventListener("change",Tn),Cn=null,Tn=null}}async function vO({localStream:t,currentFacingMode:e}){if(!(Ya||!t?.getVideoTracks()[0])){Ya=!0;try{const n=t.getVideoTracks()[0],i=ju(e);$("Applying constraints:",i),await n.applyConstraints(i),$("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{Ya=!1}}}let el=[];function bO(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function EO({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:i=()=>null,setLocalStream:s=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,bO(!f.enabled,r))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=wO({getLocalStream:t,getFacingMode:Kc});el.push(d),a&&(a.onclick=async()=>{const h=await yO({localStream:t(),localVideo:e(),currentFacingMode:Kc(),peerConnection:i()||null});h?(G_(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof s=="function"&&s(h.newStream)):console.error("Camera switch failed.")},(async()=>await _O()?M(a):w(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function CO(){el.forEach(t=>t()),el=[]}const TO=async()=>{if(J_())return console.debug("Reusing existing local MediaStream."),da();const t=ju("user"),e=my();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return _o(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const i=hO(),s=await navigator.mediaDevices.getUserMedia({video:!0,audio:i});return _o(s),s}throw n}};async function SO(t){const e=await TO(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function IO(t,e,n){return t.ontrack=i=>{$(`REMOTE TRACK RECEIVED: ${i.track.kind}`);const s=ua()?xu():null;let r;i.streams&&i.streams[0]&&i.streams[0]instanceof MediaStream?r=i.streams[0]:(console.warn("No stream in track event, using fallback track handling"),s?(s.addTrack(i.track),r=s):r=new MediaStream([i.track])),K_(r),e.srcObject=r,s!==r||$(`Added ${i.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let Dr=null,pt=null;async function _y(t,e="User"){const n=H(),i=zn();if(!n||!i)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const s=fo(n,t),r=S(I,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:i.displayName||"Anonymous",fromEmail:i.email||"",fromPhotoURL:i.photoURL||null,roomId:s,timestamp:Date.now(),status:"pending"};await te(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function kO(t){const e=H();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};tl();const n=S(I,`users/${e}/incomingInvites`);return Dr=Di(n,i=>{const s=i.key,r=i.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(s,r))}),console.log("[INVITATIONS] Listening for incoming invites"),tl}async function AO(t,e){const n=H(),i=zn();if(!n||!i)throw new Error("Must be logged in to accept invites");const s=S(I,`users/${n}/contacts/${t}`);await te(s,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=S(I,`users/${t}/acceptedInvites/${n}`);await te(r,{acceptedByUserId:n,acceptedByName:i.displayName||"User",acceptedByEmail:i.email||"",acceptedByPhotoURL:i.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=S(I,`users/${n}/incomingInvites/${t}`);await He(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function RO(t){const e=H();if(!e)throw new Error("Must be logged in to decline invites");const n=S(I,`users/${e}/incomingInvites/${t}`);await He(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function NO(t){const e=H();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};pt&&(pt(),pt=null);const n=S(I,`users/${e}/acceptedInvites`);return pt=Di(n,async i=>{const s=i.key,r=i.val();if(r)try{const o=S(I,`users/${e}/contacts/${s}`);await te(o,{contactId:s,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=S(I,`users/${e}/acceptedInvites/${s}`);await He(a),t&&t(s,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{pt&&(pt(),pt=null)}}function tl(){Dr&&(Dr(),Dr=null),pt&&(pt(),pt=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}let Ei=null;function ha(t,e={}){return new Promise(n=>{const i=document.createElement("dialog");i.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,i.classList.add("confirm-dialog");const s=i.querySelector('[data-action="confirm"]'),r=i.querySelector('[data-action="cancel"]');if(!s||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),i.close(),i.remove(),Ei===a&&(Ei=null),n(c)}s.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),i.addEventListener("cancel",()=>a(!1)),document.body.appendChild(i),i.showModal(),Ei=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function PO(){if(typeof Ei=="function"){try{Ei(!1)}catch{}return Ei=null,!0}return!1}const OO=Object.freeze(Object.defineProperty({__proto__:null,default:ha,dismissActiveConfirmDialog:PO},Symbol.toStringTag,{value:"Module"})),Ja=new Map,Xa=new Map,li=new Map,Nf=14;async function nl(t,e,n){const i=H();if(i){const s=S(I,`users/${i}/contacts/${t}`);await te(s,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const s=localStorage.getItem("contacts")||"{}",r=JSON.parse(s);r[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(r))}catch(s){console.warn("Failed to save contact to localStorage",s)}}async function Yn(){const t=H();if(t)try{const e=S(I,`users/${t}/contacts`),n=await ze(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function yy(t){if(!t)return null;try{const e=await Yn();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function wy(t,e){if(!t)return e||"Unknown";try{const n=await Yn();for(const i of Object.values(n||{}))if(i?.roomId===t)return i.contactName||i.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function vy(t,e,n){if(!t||!e)return;const s=(await Yn())?.[t];if(s){s.roomId!==e&&(await nl(t,s.contactName,e),await pn(n)),xi(e);return}if(!await ha("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await nl(t,o,e),xi(e),await pn(n)}async function pn(t){if(!t)return;const e=await Yn(),n=Object.keys(e);let i=t.querySelector(".contacts-container");if(i||(i=document.createElement("div"),i.className="contacts-container",t.appendChild(i)),n.length===0){i.innerHTML="<p>No saved contacts yet.</p>",w(i);return}M(i),i.innerHTML=`
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
                ${r.contactName&&r.contactName.length>Nf?r.contactName.slice(0,Nf-2)+"..":r.contactName}
              </span>
              <button
                class="contact-delete-btn"
                data-contact-id="${s}"
                title="Delete contact"
              >
                ✕
              </button>
            </div>
          `}).join("")}
    </div>
  `,LO(i,t),DO(n),await MO(i,n,e)}function LO(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=i=>{i.stopPropagation();const s=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");s&&fa(s,r)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let i=n.getAttribute("data-room-id");const s=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");if(!i&&r){const o=H();if(o)try{i=fo(o,r),console.log("[CONTACTS] Generated deterministic room ID:",i),await nl(r,s,i),n.setAttribute("data-room-id",i)}catch(a){console.error("[CONTACTS] Failed to generate or save room ID:",a);return}}i&&(xi(i),await lr(i,{forceInitiator:!0}).catch(a=>(console.warn("Failed to call contact:",a),!1))&&await B_(i,s))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const i=n.getAttribute("data-contact-id");!i||!window.confirm("Delete this contact?")||(await xO(i),await pn(e))}})}function fa(t,e,n=!1){if(!H()){alert("Please sign in to send messages");return}if(sn.getSession(t)){Se.showMessagesToggle(),n&&!Se.isMessagesUIOpen()&&Se.toggleMessages();return}sn.getAllSessions().forEach(a=>{a.close()}),Se.clearMessages(),Se.setSession(null);const r=sn.openSession(t,{onMessage:(a,c,l)=>{if(l)Se.appendChatMessage(`${a}`,{isSentByMe:!0});else{const u=!c.read;Se.receiveMessage(a,{isUnread:u})}}});r.contactName=e,r.toggle=li.get(t),Se.setSession(r),Se.showMessagesToggle(),n&&!Se.isMessagesUIOpen()&&Se.toggleMessages(),r.markAsRead().catch(a=>{console.warn("Failed to mark messages as read:",a)});const o=li.get(t);o&&o.clearBadge()}function DO(t){Ja.forEach(({ref:e,callback:n})=>{Ot(e,"value",n)}),Ja.clear(),H()&&t.forEach(e=>{const n=S(I,`users/${e}/presence`),i=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!i)return;const s=r=>{const a=r.val()?.state==="online";i.style.backgroundColor=a?"#00d26a":"#444",i.title=a?"Online":"Offline"};ru(n,s),Ja.set(e,{ref:n,callback:s})})}let cs=!1,ri=null;async function MO(t,e,n){if(!H())return;const i=10;let s=0;for(;cs&&s<i;)await new Promise(r=>setTimeout(r,100)),s++;if(cs){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}cs=!0,ri&&clearTimeout(ri),ri=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),cs=!1},5e3);try{li.forEach(o=>{o.cleanup()}),li.clear(),Xa.forEach(o=>{o()}),Xa.clear();const r=H();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=gy({parent:c,onToggle:()=>fa(o,a.contactName,!0),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}li.set(o,l);const u=sn.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});Xa.set(o,u)}Promise.all(e.map(o=>sn.getUnreadCount(o).then(a=>{const c=li.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{ri&&(clearTimeout(ri),ri=null),cs=!1}}async function xO(t){const e=H();if(e){try{await He(S(I,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("contacts",JSON.stringify(i)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}const Pf=Object.freeze(Object.defineProperty({__proto__:null,getContactByRoomId:yy,getContacts:Yn,openContactMessages:fa,renderContactsList:pn,resolveCallerName:wy,saveContact:vy},Symbol.toStringTag,{value:"Module"}));function FO(){w(re),w(me),w(Ae),w(Ge)}function UO(t){t.on("memberJoined",oy),t.on("cleanup",()=>{xn(),ay()})}let Qa=null,Kt=null,Y=null,K=null,Of=!1,br=!1,mt=[],il="",Ee=-1,sl=[];const $O="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",BO="https://www.googleapis.com/youtube/v3";async function HO(){if(Of||br)return!1;br=!0;const{initializeYouTubeElements:t}=await Me(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>u0);return{initializeYouTubeElements:o}},void 0),e=await t();if(Qa=e.searchContainer,Kt=e.searchBtn,Y=e.searchQuery,K=e.searchResults,!Qa||!Kt||!Y||!K)return console.error("YouTube search elements not found in DOM"),br=!1,!1;const n=o=>/^https?:\/\//i.test(o),i=o=>{(K?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),Ee=o??-1};Kt.onclick=async()=>{const o=Y.value.trim();if(mo(Y)){M(Y),Y.focus();return}if(!o){Mr(),w(Y);return}if(Mf()&&o===il)rl(mt);else if(!n(o))await Lf(o);else{await qs({url:o,title:o,channel:"",thumbnail:"",id:o}),w(K),Y.value="",w(Y),Ee=-1;return}},Qa.addEventListener("keydown",async o=>{const a=K.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=Ee+1;c>=a.length&&(c=0),i(c)}else if(o.key==="ArrowUp"){let c=Ee-1;c<0&&(c=Ee===-1?0:a.length-1),i(c)}return}if(o.key==="Enter"){if(a.length>0&&Ee>=0){a[Ee].click(),w(Y),w(K),Ee=-1;return}const c=Y.value.trim();if(c)if(Mf()&&c===il)rl(mt);else if(!n(c))await Lf(c);else{await qs({url:c,title:c,channel:"",thumbnail:"",id:c}),w(K),Ee=-1,Y.value="",w(Y);return}}else o.key==="Escape"&&(VO()?Mr():Y.value?Y.value="":w(Y))}),Y.addEventListener("input",()=>{Y.value.trim()===""&&Mr(),Ee=-1});const s=bo(Y,()=>w(Y),{ignore:[Kt],esc:!1});sl.push(s);const r=bo(K,()=>w(K),{ignore:[Kt],esc:!1});return sl.push(r),br=!1,Of=!0,!0}async function Lf(t){if(!Kt||!K){console.error("Search elements not initialized");return}mt=[],il=t,Kt.disabled=!0,K.innerHTML='<div class="search-loading">Searching YouTube...</div>',M(K);try{const e=await fetch(`${BO}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${$O}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Df("No videos found"),mt=[];return}mt=n.items.map(i=>({id:i.id.videoId,title:i.snippet.title,thumbnail:i.snippet.thumbnails.medium.url,channel:i.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${i.id.videoId}`})),rl(mt)}catch(e){console.error("YouTube search failed:",e),Df(e.message||"Search failed. Please try again.")}finally{Kt.disabled=!1}}function rl(t){if(!K){console.error("Search results element not initialized");return}if(!t||t.length===0){K.innerHTML='<div class="search-no-results">No results found</div>',mt=[],Ee=-1;return}K.innerHTML="",t.forEach(n=>{const i=document.createElement("div");i.className="search-result-item",i.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,i.onclick=async()=>{if(await qs(n),w(K),Ee=-1,!Y){console.error("Search query element not initialized");return}Y.value="",w(Y)},K.appendChild(i)}),M(K),Ee=0,K.querySelectorAll(".search-result-item").forEach((n,i)=>{i===Ee?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Df(t){if(mt=[],Ee=-1,!K){console.error("Search results element not initialized");return}K.innerHTML=`<div class="search-error">${t}</div>`,M(K)}function Mr(){mt=[],Ee=-1,K&&(K.innerHTML="",w(K))}function WO(){Mr(),sl.forEach(t=>t())}function VO(){return!mo(K)}function Mf(){return mt.length>0}function jO({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:i=!1}={}){let s=e;const r=Vu({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():s&&s.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():i&&r.hide()},r.setManager=a=>{s=a},r.hide(),r}class qO{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=bo(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const i=n._originalDispose;n.dispose=()=>{i&&i.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=i,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const zO=new qO;const by="@firebase/installations",qu="0.6.19";/**
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
 */const Ey=1e4,Cy=`w:${qu}`,Ty="FIS_v2",GO="https://firebaseinstallations.googleapis.com/v1",KO=3600*1e3,YO="installations",JO="Installations";/**
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
 */const XO={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},Jn=new mn(YO,JO,XO);function Sy(t){return t instanceof $t&&t.code.includes("request-failed")}/**
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
 */function Iy({projectId:t}){return`${GO}/projects/${t}/installations`}function ky(t){return{token:t.token,requestStatus:2,expiresIn:ZO(t.expiresIn),creationTime:Date.now()}}async function Ay(t,e){const i=(await e.json()).error;return Jn.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function Ry({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function QO(t,{refreshToken:e}){const n=Ry(t);return n.append("Authorization",eL(e)),n}async function Ny(t){const e=await t();return e.status>=500&&e.status<600?t():e}function ZO(t){return Number(t.replace("s","000"))}function eL(t){return`${Ty} ${t}`}/**
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
 */async function tL({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const i=Iy(t),s=Ry(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={fid:n,authVersion:Ty,appId:t.appId,sdkVersion:Cy},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ny(()=>fetch(i,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:ky(l.authToken)}}else throw await Ay("Create Installation",c)}/**
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
 */function Py(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function nL(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const iL=/^[cdef][\w-]{21}$/,ol="";function sL(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=rL(t);return iL.test(n)?n:ol}catch{return ol}}function rL(t){return nL(t).substr(0,22)}/**
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
 */function pa(t){return`${t.appName}!${t.appId}`}/**
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
 */const Oy=new Map;function Ly(t,e){const n=pa(t);Dy(n,e),oL(n,e)}function Dy(t,e){const n=Oy.get(t);if(n)for(const i of n)i(e)}function oL(t,e){const n=aL();n&&n.postMessage({key:t,fid:e}),cL()}let Pn=null;function aL(){return!Pn&&"BroadcastChannel"in self&&(Pn=new BroadcastChannel("[Firebase] FID Change"),Pn.onmessage=t=>{Dy(t.data.key,t.data.fid)}),Pn}function cL(){Oy.size===0&&Pn&&(Pn.close(),Pn=null)}/**
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
 */const lL="firebase-installations-database",uL=1,Xn="firebase-installations-store";let Za=null;function zu(){return Za||(Za=Fo(lL,uL,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Xn)}}})),Za}async function Eo(t,e){const n=pa(t),s=(await zu()).transaction(Xn,"readwrite"),r=s.objectStore(Xn),o=await r.get(n);return await r.put(e,n),await s.done,(!o||o.fid!==e.fid)&&Ly(t,e.fid),e}async function My(t){const e=pa(t),i=(await zu()).transaction(Xn,"readwrite");await i.objectStore(Xn).delete(e),await i.done}async function ga(t,e){const n=pa(t),s=(await zu()).transaction(Xn,"readwrite"),r=s.objectStore(Xn),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await s.done,a&&(!o||o.fid!==a.fid)&&Ly(t,a.fid),a}/**
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
 */async function Gu(t){let e;const n=await ga(t.appConfig,i=>{const s=dL(i),r=hL(t,s);return e=r.registrationPromise,r.installationEntry});return n.fid===ol?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function dL(t){const e=t||{fid:sL(),registrationStatus:0};return xy(e)}function hL(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(Jn.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},i=fL(t,n);return{installationEntry:n,registrationPromise:i}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pL(t)}:{installationEntry:e}}async function fL(t,e){try{const n=await tL(t,e);return Eo(t.appConfig,n)}catch(n){throw Sy(n)&&n.customData.serverCode===409?await My(t.appConfig):await Eo(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function pL(t){let e=await xf(t.appConfig);for(;e.registrationStatus===1;)await Py(100),e=await xf(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:i}=await Gu(t);return i||n}return e}function xf(t){return ga(t,e=>{if(!e)throw Jn.create("installation-not-found");return xy(e)})}function xy(t){return gL(t)?{fid:t.fid,registrationStatus:0}:t}function gL(t){return t.registrationStatus===1&&t.registrationTime+Ey<Date.now()}/**
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
 */async function mL({appConfig:t,heartbeatServiceProvider:e},n){const i=_L(t,n),s=QO(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const o={installation:{sdkVersion:Cy,appId:t.appId}},a={method:"POST",headers:s,body:JSON.stringify(o)},c=await Ny(()=>fetch(i,a));if(c.ok){const l=await c.json();return ky(l)}else throw await Ay("Generate Auth Token",c)}function _L(t,{fid:e}){return`${Iy(t)}/${e}/authTokens:generate`}/**
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
 */async function Ku(t,e=!1){let n;const i=await ga(t.appConfig,r=>{if(!Fy(r))throw Jn.create("not-registered");const o=r.authToken;if(!e&&vL(o))return r;if(o.requestStatus===1)return n=yL(t,e),r;{if(!navigator.onLine)throw Jn.create("app-offline");const a=EL(r);return n=wL(t,a),a}});return n?await n:i.authToken}async function yL(t,e){let n=await Ff(t.appConfig);for(;n.authToken.requestStatus===1;)await Py(100),n=await Ff(t.appConfig);const i=n.authToken;return i.requestStatus===0?Ku(t,e):i}function Ff(t){return ga(t,e=>{if(!Fy(e))throw Jn.create("not-registered");const n=e.authToken;return CL(n)?{...e,authToken:{requestStatus:0}}:e})}async function wL(t,e){try{const n=await mL(t,e),i={...e,authToken:n};return await Eo(t.appConfig,i),n}catch(n){if(Sy(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await My(t.appConfig);else{const i={...e,authToken:{requestStatus:0}};await Eo(t.appConfig,i)}throw n}}function Fy(t){return t!==void 0&&t.registrationStatus===2}function vL(t){return t.requestStatus===2&&!bL(t)}function bL(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+KO}function EL(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function CL(t){return t.requestStatus===1&&t.requestTime+Ey<Date.now()}/**
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
 */async function TL(t){const e=t,{installationEntry:n,registrationPromise:i}=await Gu(e);return i?i.catch(console.error):Ku(e).catch(console.error),n.fid}/**
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
 */async function SL(t,e=!1){const n=t;return await IL(n),(await Ku(n,e)).token}async function IL(t){const{registrationPromise:e}=await Gu(t);e&&await e}/**
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
 */function kL(t){if(!t||!t.options)throw ec("App Configuration");if(!t.name)throw ec("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw ec(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function ec(t){return Jn.create("missing-app-config-values",{valueName:t})}/**
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
 */const Uy="installations",AL="installations-internal",RL=t=>{const e=t.getProvider("app").getImmediate(),n=kL(e),i=_n(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:i,_delete:()=>Promise.resolve()}},NL=t=>{const e=t.getProvider("app").getImmediate(),n=_n(e,Uy).getImmediate();return{getId:()=>TL(n),getToken:s=>SL(n,s)}};function PL(){Ye(new Be(Uy,RL,"PUBLIC")),Ye(new Be(AL,NL,"PRIVATE"))}PL();$e(by,qu);$e(by,qu,"esm2020");/**
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
 */const OL="/firebase-messaging-sw.js",LL="/firebase-cloud-messaging-push-scope",$y="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",DL="https://fcmregistrations.googleapis.com/v1",By="google.c.a.c_id",ML="google.c.a.c_l",xL="google.c.a.ts",FL="google.c.a.e",Uf=1e4;var $f;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})($f||($f={}));/**
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
 */var zs;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(zs||(zs={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function UL(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),i=atob(n),s=new Uint8Array(i.length);for(let r=0;r<i.length;++r)s[r]=i.charCodeAt(r);return s}/**
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
 */const tc="fcm_token_details_db",$L=5,Bf="fcm_token_object_Store";async function BL(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(tc))return null;let e=null;return(await Fo(tc,$L,{upgrade:async(i,s,r,o)=>{if(s<2||!i.objectStoreNames.contains(Bf))return;const a=o.objectStore(Bf),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(s===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:bt(l.vapidKey)}}}else if(s===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:bt(l.auth),p256dh:bt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:bt(l.vapidKey)}}}else if(s===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:bt(l.auth),p256dh:bt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:bt(l.vapidKey)}}}}}})).close(),await Ra(tc),await Ra("fcm_vapid_details_db"),await Ra("undefined"),HL(e)?e:null}function HL(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const WL="firebase-messaging-database",VL=1,Qn="firebase-messaging-store";let nc=null;function Yu(){return nc||(nc=Fo(WL,VL,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Qn)}}})),nc}async function Hy(t){const e=Xu(t),i=await(await Yu()).transaction(Qn).objectStore(Qn).get(e);if(i)return i;{const s=await BL(t.appConfig.senderId);if(s)return await Ju(t,s),s}}async function Ju(t,e){const n=Xu(t),s=(await Yu()).transaction(Qn,"readwrite");return await s.objectStore(Qn).put(e,n),await s.done,e}async function jL(t){const e=Xu(t),i=(await Yu()).transaction(Qn,"readwrite");await i.objectStore(Qn).delete(e),await i.done}function Xu({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qL={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},ve=new mn("messaging","Messaging",qL);/**
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
 */async function zL(t,e){const n=await Zu(t),i=Vy(e),s={method:"POST",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(Qu(t.appConfig),s)).json()}catch(o){throw ve.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw ve.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw ve.create("token-subscribe-no-token");return r.token}async function GL(t,e){const n=await Zu(t),i=Vy(e.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(i)};let r;try{r=await(await fetch(`${Qu(t.appConfig)}/${e.token}`,s)).json()}catch(o){throw ve.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw ve.create("token-update-failed",{errorInfo:o})}if(!r.token)throw ve.create("token-update-no-token");return r.token}async function Wy(t,e){const i={method:"DELETE",headers:await Zu(t)};try{const r=await(await fetch(`${Qu(t.appConfig)}/${e}`,i)).json();if(r.error){const o=r.error.message;throw ve.create("token-unsubscribe-failed",{errorInfo:o})}}catch(s){throw ve.create("token-unsubscribe-failed",{errorInfo:s?.toString()})}}function Qu({projectId:t}){return`${DL}/projects/${t}/registrations`}async function Zu({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Vy({p256dh:t,auth:e,endpoint:n,vapidKey:i}){const s={web:{endpoint:n,auth:e,p256dh:t}};return i!==$y&&(s.web.applicationPubKey=i),s}/**
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
 */const KL=10080*60*1e3;async function YL(t){const e=await QL(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:bt(e.getKey("auth")),p256dh:bt(e.getKey("p256dh"))},i=await Hy(t.firebaseDependencies);if(i){if(ZL(i.subscriptionOptions,n))return Date.now()>=i.createTime+KL?XL(t,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await Wy(t.firebaseDependencies,i.token)}catch(s){console.warn(s)}return Hf(t.firebaseDependencies,n)}else return Hf(t.firebaseDependencies,n)}async function JL(t){const e=await Hy(t.firebaseDependencies);e&&(await Wy(t.firebaseDependencies,e.token),await jL(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function XL(t,e){try{const n=await GL(t.firebaseDependencies,e),i={...e,token:n,createTime:Date.now()};return await Ju(t.firebaseDependencies,i),n}catch(n){throw n}}async function Hf(t,e){const i={token:await zL(t,e),createTime:Date.now(),subscriptionOptions:e};return await Ju(t,i),i.token}async function QL(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:UL(e)})}function ZL(t,e){const n=e.vapidKey===t.vapidKey,i=e.endpoint===t.endpoint,s=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&i&&s&&r}/**
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
 */function Wf(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return eD(e,t),tD(e,t),nD(e,t),e}function eD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const i=e.notification.body;i&&(t.notification.body=i);const s=e.notification.image;s&&(t.notification.image=s);const r=e.notification.icon;r&&(t.notification.icon=r)}function tD(t,e){e.data&&(t.data=e.data)}function nD(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const i=e.fcmOptions?.analytics_label;i&&(t.fcmOptions.analyticsLabel=i)}/**
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
 */function iD(t){return typeof t=="object"&&!!t&&By in t}/**
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
 */function sD(t){if(!t||!t.options)throw ic("App Configuration Object");if(!t.name)throw ic("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const i of e)if(!n[i])throw ic(i);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function ic(t){return ve.create("missing-app-config-values",{valueName:t})}/**
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
 */class rD{constructor(e,n,i){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=sD(e);this.firebaseDependencies={app:e,appConfig:s,installations:n,analyticsProvider:i}}_delete(){return Promise.resolve()}}/**
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
 */async function jy(t){try{t.swRegistration=await navigator.serviceWorker.register(OL,{scope:LL}),t.swRegistration.update().catch(()=>{}),await oD(t.swRegistration)}catch(e){throw ve.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function oD(t){return new Promise((e,n)=>{const i=setTimeout(()=>n(new Error(`Service worker not registered after ${Uf} ms`)),Uf),s=t.installing||t.waiting;t.active?(clearTimeout(i),e()):s?s.onstatechange=r=>{r.target?.state==="activated"&&(s.onstatechange=null,clearTimeout(i),e())}:(clearTimeout(i),n(new Error("No incoming service worker found.")))})}/**
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
 */async function aD(t,e){if(!e&&!t.swRegistration&&await jy(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw ve.create("invalid-sw-registration");t.swRegistration=e}}/**
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
 */async function cD(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=$y)}/**
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
 */async function qy(t,e){if(!navigator)throw ve.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw ve.create("permission-blocked");return await cD(t,e?.vapidKey),await aD(t,e?.serviceWorkerRegistration),YL(t)}/**
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
 */async function lD(t,e,n){const i=uD(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n[By],message_name:n[ML],message_time:n[xL],message_device_time:Math.floor(Date.now()/1e3)})}function uD(t){switch(t){case zs.NOTIFICATION_CLICKED:return"notification_open";case zs.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===zs.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(Wf(n)):t.onMessageHandler.next(Wf(n)));const i=n.data;iD(i)&&i[FL]==="1"&&await lD(t,n.messageType,i)}const Vf="@firebase/messaging",jf="0.12.23";/**
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
 */const hD=t=>{const e=new rD(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>dD(e,n)),e},fD=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:i=>qy(e,i)}};function pD(){Ye(new Be("messaging",hD,"PUBLIC")),Ye(new Be("messaging-internal",fD,"PRIVATE")),$e(Vf,jf),$e(Vf,jf,"esm2020")}/**
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
 */async function gD(){try{await tg()}catch{return!1}return typeof window<"u"&&Do()&&fT()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */async function mD(t){if(!navigator)throw ve.create("only-available-in-window");return t.swRegistration||await jy(t),JL(t)}/**
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
 */function _D(t,e){if(!navigator)throw ve.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yD(t=Uo()){return gD().then(e=>{if(!e)throw ve.create("unsupported-browser")},e=>{throw ve.create("indexed-db-unsupported")}),_n(ne(t),"messaging").getImmediate()}async function wD(t,e){return t=ne(t),qy(t,e)}function qf(t){return t=ne(t),mD(t)}function vD(t,e){return t=ne(t),_D(t,e)}pD();class bD{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=PR,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return!("serviceWorker"in navigator)||!("Notification"in window)?(console.warn("[FCMTransport] FCM not supported in this environment"),!1):this.vapidKey?(this.messaging=yD(ta),vD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in message callback:",i)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&!await this.initialize())return null;try{const e=await wD(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained:",e.substring(0,20)+"..."),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await qf(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[FCMTransport] Error in token refresh callback:",i)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await qf(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=H();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const i=S(I,`users/${n}/fcmTokens/${this.getTokenId(e)}`),s={token:e,deviceInfo:{userAgent:navigator.userAgent,platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await te(i,s),console.log("[FCMTransport] Token stored in RTDB")}catch(i){console.error("[FCMTransport] Failed to store token in RTDB:",i)}}async removeUserToken(e){const n=H();if(n)try{const i=S(I,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await He(i),console.log("[FCMTransport] Token removed from RTDB")}catch(i){console.error("[FCMTransport] Failed to remove token from RTDB:",i)}}async getUserTokens(e){try{const n=S(I,`users/${e}/fcmTokens`),i=await ze(n);if(i.exists()){const s=i.val();return Object.values(s)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:"/icons/play-arrows-v1/icon-192.png",badge:"/icons/play-arrows-v1/icon-192.png"},data:o};return this.sendNotification(e,a)}async sendMissedCallNotification(e,n){const{roomId:i,callerId:s,callerName:r}=n,o={type:"missed_call",roomId:i,callerId:s,callerName:r,timestamp:Date.now().toString()},a={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:"/icons/play-arrows-v1/icon-192.png",badge:"/icons/play-arrows-v1/icon-192.png"},data:o};return this.sendNotification(e,a)}async sendMessageNotification(e,n){const{senderId:i,senderName:s,messageText:r}=n,o=r.length>50?r.substring(0,47)+"...":r,a={type:"message",senderId:i,senderName:s,messagePreview:o,timestamp:Date.now().toString()},c={notification:{title:`New message from ${s}`,body:o,icon:"/icons/play-arrows-v1/icon-192.png",badge:"/icons/play-arrows-v1/icon-192.png"},data:a};return this.sendNotification(e,c)}async sendNotification(e,n){try{{const a=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUserId:e,callData:n.data})});if(a.ok){const c=await a.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,c),!0}else return console.error("[FCMTransport] FCM function failed:",a.status),!1}if((await this.getUserTokens(e)).length===0)return console.warn(`[FCMTransport] No tokens found for user ${e}`),!1;const s=S(I,`notifications/${e}`),r=Us(s).key,o={id:r,payload:n,createdAt:Date.now(),delivered:!1};return await te(S(I,`notifications/${e}/${r}`),o),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(i){return console.error("[FCMTransport] Failed to send notification:",i),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window}}class ED{constructor(e=null,n={}){this.transport=e||new bD,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[NotificationController] Initialized successfully"),!0):(console.warn("[NotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[NotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:i="Get notified of incoming calls and messages even when the app is closed.",onGranted:s=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[NotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(a==="granted")return await this.enable(),s?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[NotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),s?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enable(){if(this.permissionState!=="granted")return console.warn("[NotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[NotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(i){console.error("[NotificationController] Error in permission callback:",i)}}),!0):(console.warn("[NotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[NotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[NotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[NotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[NotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending call notification (app in foreground)"),!1;try{const i=await this.transport.sendCallNotification(e,n);if(i){const s=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(s,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Call notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send call notification:",i),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[NotificationController] Call notifications disabled (missed call masked)"),!1;try{const i=await this.transport.sendMissedCallNotification(e,n);return i&&console.log(`[NotificationController] Missed call notification sent to ${e}`),i}catch(i){return console.error("[NotificationController] Failed to send missed call notification:",i),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[NotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[NotificationController] Not sending message notification (app in foreground)"),!1;try{const i=await this.transport.sendMessageNotification(e,n);if(i){const s=`message_${e}_${Date.now()}`;this.activeNotifications.set(s,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[NotificationController] Message notification sent to ${e}`)}return i}catch(i){return console.error("[NotificationController] Failed to send message notification:",i),!1}}async dismissCallNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="call"&&s.roomId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[i,s]of this.activeNotifications)s.type==="message"&&s.senderId===e&&n.push(i);n.forEach(i=>this.activeNotifications.delete(i)),n.length>0&&console.log(`[NotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[NotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,i=[];for(const[s,r]of this.activeNotifications)e-r.timestamp>n&&i.push(s);i.forEach(s=>this.activeNotifications.delete(s)),i.length>0&&console.log(`[NotificationController] Cleaned up ${i.length} old notifications`)}handleForegroundMessage(e){console.log("[NotificationController] Foreground message received:",e),this.notificationCallbacks.forEach(n=>{try{n(e)}catch(i){console.error("[NotificationController] Error in notification callback:",i)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){return"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[NotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData?.brands){const n=navigator.userAgentData.brands.map(i=>i.brand);if(n.some(i=>i.includes("Microsoft Edge")))return"Edge";if(n.some(i=>i.includes("Google Chrome")))return"Chrome";if(n.some(i=>i.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:i,callerName:s}=e;let r=s;try{const{resolveCallerName:o}=await Me(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>Pf);return{resolveCallerName:a}},void 0);r=await o(n,i)}catch(o){console.warn("[NotificationController] Failed to resolve caller name:",o),r=s||i||"Unknown caller"}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:i,messageText:s}=e;let r=i,o=s;try{const{getContacts:a}=await Me(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>Pf);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||i)}catch(a){console.warn("[NotificationController] Failed to resolve sender name:",a),r=i||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const De=new ED;let ls=null;const CD=(t,e=null)=>{if(ls)return ls;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,i=null,s=10;typeof e=="number"&&(s=e);const r=Cu();return ls=Vu({initialProps:{isLoggedIn:r,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:s},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:D_,handleLogout:M_},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(r),n=Tu(({isLoggedIn:c,userName:l})=>{$("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),i=UP(c=>{$("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),i&&(i(),i=null),ls=null},className:"auth-component",parent:t}),ls},TD="https://people.googleapis.com/v1/people/me/connections",SD="https://people.googleapis.com/v1/otherContacts";async function ID(t){if(!t)throw new Error("Access token is required");const e=[],n=await zf(t,TD,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const i=await zf(t,SD,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${i.length}`),e.push(...i),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const s=new Set;return e.filter(o=>s.has(o.email)?!1:(s.add(o.email),!0))}async function zf(t,e,n){const i=[];let s=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),s&&r.searchParams.set("pageToken",s);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),i;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&i.push({email:f.value.toLowerCase().trim(),name:h})}s=a.nextPageToken}while(s);return i}async function kD(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
      <h2>Add Contact</h2>

      <div class="import-section">
        <button type="button" id="import-google-btn" class="import-btn">
          <i class="fa fa-google"></i> Import from Google Contacts
        </button>
        <div id="import-status" class="import-status"></div>
        <div id="import-results" class="import-results"></div>
      </div>

      <hr class="divider" />

      <p>Or search by email:</p>
      <form id="add-contact-form">
        <input
          type="email"
          id="contact-email-input"
          placeholder="friend@example.com"
          required
        />
        <div id="search-status" class="search-status"></div>
        <div class="modal-actions">
          <button type="button" data-action="cancel">Cancel</button>
          <button type="submit" data-action="search">Search</button>
        </div>
      </form>
    `;const n=e.querySelector("#add-contact-form"),i=e.querySelector("#contact-email-input"),s=e.querySelector("#search-status"),r=e.querySelector('[data-action="cancel"]'),o=e.querySelector('[data-action="search"]'),a=e.querySelector("#import-google-btn"),c=e.querySelector("#import-status"),l=e.querySelector("#import-results");function u(){e.close(),e.remove(),t()}r.addEventListener("click",u),e.addEventListener("cancel",u),n.addEventListener("submit",async d=>{d.preventDefault();const h=i.value.trim();if(h){o.disabled=!0,i.disabled=!0,s.textContent="Searching...",s.className="search-status searching";try{const f=await R_(h);if(!f){s.textContent=`${h} is not on HangVidU yet.`,s.className="search-status not-found",o.disabled=!1,i.disabled=!1;return}const p=zn();if(p&&f.uid===p.uid){s.textContent="That's your own email address!",s.className="search-status error",o.disabled=!1,i.disabled=!1;return}s.textContent=`Found ${f.displayName}! Sending invitation...`,s.className="search-status found",await _y(f.uid,f.displayName),s.textContent=`✓ Invitation sent to ${f.displayName}!`,s.className="search-status success",setTimeout(u,1500)}catch(f){console.error("[ADD CONTACT] Error searching for user:",f),s.textContent="Error searching for user. Please try again.",s.className="search-status error",o.disabled=!1,i.disabled=!1}}}),a.addEventListener("click",async()=>{a.disabled=!0,c.textContent="Requesting access...",c.className="import-status loading",l.innerHTML="";try{const d=await x_();c.textContent="Fetching contacts...";const h=await ID(d);if(h.length===0){c.textContent="No contacts with email addresses found.",c.className="import-status not-found",a.disabled=!1;return}c.textContent=`Found ${h.length} contacts. Checking HangVidU...`;const f=h.map(B=>B.email),p=await VP(f),_=zn(),m=[],R=[];for(const B of h){const N=p[B.email];N&&N.uid!==_?.uid?m.push({...B,user:N}):N||R.push(B)}c.textContent=`${m.length} on HangVidU, ${R.length} not yet`,c.className="import-status success",AD(l,m,R),a.disabled=!1}catch(d){console.error("[ADD CONTACT] Import error:",d),d.message==="Authorization cancelled"?(c.textContent="Import cancelled.",c.className="import-status cancelled"):(c.textContent=`Error: ${d.message}`,c.className="import-status error"),a.disabled=!1}}),document.body.appendChild(e),e.showModal()})}function AD(t,e,n){if(t.innerHTML="",e.length>0){const i=document.createElement("div");i.className="results-section",i.innerHTML=`<h4>On HangVidU (${e.length})</h4>`;const s=document.createElement("ul");s.className="contact-list";for(const{name:r,email:o,user:a}of e){const c=document.createElement("li");c.className="contact-item",c.innerHTML=`
        <span class="contact-info">
          <strong>${Er(r)}</strong>
          <small>${Er(o)}</small>
        </span>
        <button type="button" class="invite-btn" data-uid="${Er(a.uid)}" data-name="${Er(a.displayName)}">
          Invite
        </button>
      `;const l=c.querySelector(".invite-btn");l.addEventListener("click",async()=>{l.disabled=!0,l.textContent="Sending...";try{await _y(a.uid,a.displayName),l.textContent="✓ Sent",l.classList.add("sent")}catch(u){console.error("[ADD CONTACT] Invite error:",u),l.textContent="Error",l.disabled=!1}}),s.appendChild(c)}i.appendChild(s),t.appendChild(i)}if(e.length===0&&n.length>0){const i=document.createElement("div");i.className="empty-state",i.innerHTML=`
      <p>None of your ${n.length} contacts are on HangVidU yet.</p>
      <p>Be the first to invite them!</p>
    `,t.appendChild(i)}if(n.length>0&&e.length>0){const i=document.createElement("div");i.className="results-section not-on-app",i.innerHTML=`<p class="muted-text">${n.length} contacts not on HangVidU yet</p>`,t.appendChild(i)}}function Er(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function RD(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class ND{constructor(){this.originalTitle=document.title,this.originalFavicon=RD(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const Gf=new ND;let Kf=!1;function PD(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const i=document.createElement("div");i.className="copy-link-dialog__content";const s=document.createElement("h2");s.className="copy-link-dialog__title",s.textContent=e.title,i.appendChild(s);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),i.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),i.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),i.appendChild(u),n.appendChild(i),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function OD(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};LD();const{dialog:i,input:s,copyButton:r,cancelButton:o,feedback:a}=PD(t,n);DD(i);let c=!1;const l=async()=>{await MD(t,s)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{i.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),s.readOnly=!1,s.addEventListener("click",()=>{s.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),i.close()}),i.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),i.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{i.remove()},300)}),document.body.appendChild(i),i.showModal(),i}function LD(){if(Kf)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Kf=!0}function DD(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function MD(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function xD(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const i="https://vidu-aae11.web.app",s=i.replace(/\/$/,"");let r;try{r=new URL(s).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",i,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,s).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}xD();DP(!0);y().disable();let ed=[];async function FD(){FO();const t=W_(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(i=>!t[i]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:r}=await Me(async()=>{const{setupPWA:o}=await import("./PWA-3wTFBrEB.js");return{setupPWA:o}},[]);await r()}HO(),BD(),await P_;const i=CD(ca);i&&ed.push(i.dispose);const s=document.querySelector(".top-right-menu");if(s){const r=jO({parent:s,hideWhenAllRead:!0});zO.setToggle(r)}try{await De.initialize()?console.log("[MAIN] FCM notifications initialized successfully"):console.warn("[MAIN] FCM notifications failed to initialize")}catch(r){console.error("[MAIN] FCM initialization error:",r)}return!0}catch(i){return console.error("Initialization error:",i),!1}}let al=!1;function zy(){al=!1}async function Gy(){al||(al=!0,await SO(Ve),EO({getLocalStream:da,getLocalVideo:()=>Ve,getRemoteVideo:()=>se,getPeerConnection:()=>_e.getState().pc,setLocalStream:_o,micBtn:Qi,cameraBtn:Zi,switchCameraBtn:Xi,mutePartnerBtn:lt,fullscreenPartnerBtn:la,remotePipBtn:fn}),Ve&&(Ve.addEventListener("enterpictureinpicture",()=>me&&w(me)),Ve.addEventListener("leavepictureinpicture",()=>{me&&!(Kn()&&ty())&&M(me)})))}function Ky(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),zy()}function xr(t=null){return{localStream:da(),localVideoEl:Ve,remoteVideoEl:se,mutePartnerBtn:lt,setupRemoteStream:IO,setupWatchSync:b0,targetRoomId:t}}function Fr(t,e=!1){return t.success?(e&&t.roomLink&&OD(t.roomLink,{onCopy:()=>$("Link ready! Share with your partner."),onCancel:()=>$("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function lr(t,{forceInitiator:e=!1}={}){try{await Gy()}catch(r){return console.error("Failed to initialize local media stream:",r),Ky(r),!1}const n=Date.now();if(e){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await _e.createCall(xr(t));return Fr(r,!1)}let i=await ee.checkRoomStatus(t);if(i.exists&&!i.hasMembers){let o=0;for(;o<3&&!i.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),i=await ee.checkRoomStatus(t),o++}if(!i.exists||!i.hasMembers){y().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:i.exists,memberCount:i.memberCount||0});const r=await _e.createCall(xr(t));return Fr(r,!0)}y().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:i.memberCount,roomExists:i.exists});const s=await _e.answerCall({roomId:t,...xr()});return Fr(s,!1)}const xe=new Set,Yy=new Map;function Yf(t){t&&(na(t),xe.delete(t),Yy.delete(t),y().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:xe.size}))}function UD(){$(`[LISTENER] Removing all incoming listeners (${xe.size} rooms)`);const t=Array.from(xe);t.forEach(e=>{na(e)}),xe.clear(),Yy.clear(),y().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function $D(t){const e=Date.now(),n=e+1440*60*1e3,i=H();if(i){const s=du(i,t);await te(s,{roomId:t,savedAt:e,expiresAt:n});return}try{const s=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(s);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(s){console.warn("Failed to save recent call to localStorage",s)}}async function sc(t){const e=H();if(e){try{await He(du(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n);i[t]&&(delete i[t],localStorage.setItem("recentCalls",JSON.stringify(i)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function xi(t){t&&(xe.has(t)&&(xe.delete(t),na(t)),$(`[LISTENER] Attaching listener for room: ${t} (total: ${xe.size+1})`),xe.add(t),y().logListenerAttachment(t,"member_join",xe.size,{action:"incoming_call_listener_attached"}),ee.onMemberJoined(t,async e=>{const n=e.key,i=e.val?e.val():null,s=ge();if(n&&n!==s){y().logMemberJoinEvent(t,n,i||{},{detectedBy:"incoming_call_listener",currentUserId:s});const r=i&&typeof i.joinedAt=="number"?i.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const N=await U_(n,t),b=await $_(t);a=N||b,c=N?"outgoingState":b?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(y().logIncomingCallEvent(n,t,u,{memberData:i,joinedAt:r,CALL_FRESH_MS:o}),!a){y().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await ee.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===s)return;const _=_e.getState();if(!!_.pc&&_.pc.connectionState==="connected"){y().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:_.pc?.connectionState});return}y().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const R=await wy(t,n);if(De.isNotificationEnabled()&&De.shouldSendNotification())try{const N=await De.formatCallNotification({roomId:t,callerId:n,callerName:R});console.log("[MAIN] Would send call notification:",N)}catch(N){console.warn("[MAIN] Failed to send call notification:",N)}gi.playIncoming(),Gf.startCallIndicators(R);let B=!1;try{B=await ha(`Incoming call from ${R}.

Accept?`)}finally{gi.stop(),Gf.stopCallIndicators()}if(B)Yf(t),De.isNotificationEnabled()&&await De.dismissCallNotifications(t),y().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),lr(t).catch(N=>{console.warn("Failed to answer incoming call:",N),y().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{De.isNotificationEnabled()&&await De.dismissCallNotifications(t),y().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await ee.rejectCall(t,ge(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}await sc(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),ee.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:i}=await Me(async()=>{const{dismissActiveConfirmDialog:s}=await Promise.resolve().then(()=>OO);return{dismissActiveConfirmDialog:s}},void 0);typeof i=="function"&&i()}catch{}await sc(t).catch(()=>{})}}),ee.onMemberLeft(t,async e=>{const n=e.key,i=ge();if(!(!n||n===i))try{(await ee.checkRoomStatus(t)).hasMembers||(await sc(t),Yf(t),$(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(s){console.warn("Failed to evaluate room status on member leave",s)}}))}async function Jf(){const t=Date.now();y().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:xe.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Me(async()=>{const{getCurrentUserAsync:i}=await Promise.resolve().then(()=>F_);return{getCurrentUserAsync:i}},void 0);await n()}}catch{}const e=H();if(y().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=MR(e);try{const i=await ze(n),s=i.exists()?i.val():null,r=new Set;if(s)for(const[o,a]of Object.entries(s)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await He(du(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await Yn();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=fo(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>xi(o)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:xe.size,duration:Date.now()-t})}catch(i){console.warn("Failed to read recent calls from RTDB",i),y().logFirebaseOperation("read_recent_calls",!1,i,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(n),s={},r=new Set;for(const[o,a]of Object.entries(i||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(s[o]=a,r.add(o));try{const o=await Yn(),a=ge();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=fo(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>xi(o)),localStorage.setItem("recentCalls",JSON.stringify(s)),y().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:xe.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(i||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),y().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Cr(){return x&&Ae&&!Ae.classList.contains("hidden")&&x.src&&x.src.trim()!==""}let Xf=!1;function BD(){if(Xf)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",ft()),console.log("isYTVisible():",qa()),console.log("isSharedVideoVisible():",Cr()),console.log("isWatchModeActive():",Kn()),ft()==="yt"?qa()?(yo(),Es()):(Z_(),vo()):(ft()==="url"||ft()==="file")&&(Cr()?(w(Ae),Es()):(M(Ae),vo()))),e.key==="Escape"&&Kn()&&(ft()==="yt"&&qa()?(cr(),yo()):(ft()==="url"&&Cr()||ft()==="file"&&Cr())&&(x.pause(),w(Ae)),Es())}),Xf=!0}const Jy=async()=>{try{await Gy();const t=await _e.createCall(xr());Fr(t,!0)}catch(t){console.error("Failed to start call:",t),Ky(t)}};at.onclick=Jy;yn.onclick=Jy;_i&&(navigator.clipboard&&navigator.clipboard.readText?_i.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=HD(t);if(!e){alert("No valid room link found in clipboard.");return}await lr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(_i.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));Vs&&(Vs.onclick=async()=>{await kD()});Gn&&(Gn.onclick=()=>{ft()==="yt"?(cr(),yo()):(ft()==="url"||ft()==="file")&&(x.pause(),x.src.startsWith("blob:")&&URL.revokeObjectURL(x.src),w(Ae)),Es()});ct.onclick=async()=>{console.debug("Hanging up..."),await _e.hangUp({emitCancel:!0,reason:"user_hung_up"})};function HD(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),i=n.searchParams.get("room");if(i)return i;const s=n.hash.match(/room=([^&]+)/);return s?decodeURIComponent(s[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function WD(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await lr(e);return n||(aa(),ay()),n}const cl=[];let rc=!1;async function Xy(){if(rc||cl.length===0)return;rc=!0;const{fromUserId:t,inviteData:e}=cl.shift();try{if(await ha(`${e.fromName||"Someone"} wants to connect.

Accept contact invitation?`))try{await AO(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await pn(Xe).catch(()=>{}),alert(`Added ${e.fromName} to your contacts!`)}catch(i){console.error("[INVITATIONS] Failed to accept invite:",i),alert("Failed to add contact. Please try again.")}else try{await RO(t),console.log("[INVITATIONS] Invite declined")}catch(i){console.error("[INVITATIONS] Failed to decline invite:",i)}}finally{rc=!1,Xy()}}function Qf(){kO((t,e)=>{cl.push({fromUserId:t,inviteData:e}),Xy()}),NO(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await pn(Xe).catch(()=>{}),alert(`${e.acceptedByName} accepted your invitation!`)})}window.onload=async()=>{if(!await FD())return;UO(_e),await Jf().catch(s=>console.warn("Failed to start saved-room listeners",s)),pn(Xe).catch(s=>{console.warn("Failed to render contacts list:",s)});let e=null;const n=Tu(async({isLoggedIn:s,user:r})=>{try{const o=e===null,a=e===!0&&!s,c=e===!1&&s;e=s,await pn(Xe),a?($("[AUTH] User logged out - cleaning up messaging and listeners"),Se.reset(),sn.closeAllSessions(),De.isNotificationEnabled()&&await De.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),UD(),tl()):c?($("[AUTH] User logged in - re-attaching incoming listeners"),await Jf().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l)),Qf()):o&&s&&($("[AUTH] Initial load with logged-in user"),Qf())}catch(o){console.warn("Failed to handle auth change:",o)}});ed.push(()=>{try{typeof n=="function"&&n()}catch{}}),await WD()};window.addEventListener("beforeunload",async t=>{const e=_e.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await VD()});_e.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),_e.setPartnerId(t),Se.showMessagesToggle(),fa(t,t),ku().catch(n=>console.warn("Failed to clear calling state:",n)),$D(e).catch(n=>console.warn("Failed to save recent call:",n))});_e.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});_e.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:i,wasConnected:s})=>{if(i==="initiator"&&!e&&!s&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const a=await yy(t);if(a&&a.contactId){const{getLoggedInUser:c}=await Me(async()=>{const{getLoggedInUser:d}=await Promise.resolve().then(()=>F_);return{getLoggedInUser:d}},void 0),u=c()?.displayName||"Friend";console.log(`[MAIN] Sending missed call notification to ${a.contactName} (${a.contactId})`),await De.sendMissedCallNotification(a.contactId,{roomId:t,callerId:ge(),callerName:u})}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&De.isNotificationEnabled()&&De.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=_e.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),Y_(),aa(),e&&t&&setTimeout(()=>{vy(e,t,Xe).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function VD(){await _e.hangUp({emitCancel:!0,reason:"page_unload"}),CO(),OR(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=_e.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),x.src="",X_(),Ve&&Ve.srcObject&&(Ve.srcObject=null),se&&se.srcObject&&(se.srcObject=null),Es(),v0("none"),Fu(),WO(),aa(),Q_(!1),ed.forEach(e=>e())}const jD=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:lr,listenForIncomingOnRoom:xi,resetLocalStreamInitFlag:zy},Symbol.toStringTag,{value:"Module"}));export{Me as _,Vu as c,$ as d,w as h,qD as i,zO as n,M as s};
