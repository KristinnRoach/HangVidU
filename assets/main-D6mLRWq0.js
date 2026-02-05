(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Xw="modulepreload",Qw=function(t){return"/HangVidU/"+t},jd={},fe=function(e,n,s){let i=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");i=c(n.map(l=>{if(l=Qw(l),l in jd)return;jd[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":Xw,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})},D=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,z=globalThis,zn="10.36.0";function zo(){return Go(z),z}function Go(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||zn,e[zn]=e[zn]||{}}function ti(t,e,n=z){const s=n.__SENTRY__=n.__SENTRY__||{},i=s[zn]=s[zn]||{};return i[t]||(i[t]=e())}const Zw=["debug","info","warn","error","log","assert","trace"],ev="Sentry Logger ",uo={};function ni(t){if(!("console"in z))return t();const e=z.console,n={},s=Object.keys(uo);s.forEach(i=>{const r=uo[i];n[i]=e[i],e[i]=r});try{return t()}finally{s.forEach(i=>{e[i]=n[i]})}}function tv(){jl().enabled=!0}function nv(){jl().enabled=!1}function Fp(){return jl().enabled}function sv(...t){Hl("log",...t)}function iv(...t){Hl("warn",...t)}function rv(...t){Hl("error",...t)}function Hl(t,...e){D&&Fp()&&ni(()=>{z.console[t](`${ev}[${t}]:`,...e)})}function jl(){return D?ti("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const A={enable:tv,disable:nv,isEnabled:Fp,log:sv,warn:iv,error:rv},Up=50,Xn="?",Vd=/\(error: (.*)\)/,Wd=/captureMessage|captureException/;function $p(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,i=0)=>{const r=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Vd.test(c)?c.replace(Vd,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){r.push(d);break}}if(r.length>=Up+i)break}}return av(r.slice(i))}}function ov(t){return Array.isArray(t)?$p(...t):t}function av(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Ur(e).function||"")&&e.pop(),e.reverse(),Wd.test(Ur(e).function||"")&&(e.pop(),Wd.test(Ur(e).function||"")&&e.pop()),e.slice(0,Up).map(n=>({...n,filename:n.filename||Ur(e).filename,function:n.function||Xn}))}function Ur(t){return t[t.length-1]||{}}const Ka="<anonymous>";function Cn(t){try{return!t||typeof t!="function"?Ka:t.name||Ka}catch{return Ka}}function qd(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function Bp(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const Yr={},zd={};function hs(t,e){Yr[t]=Yr[t]||[],Yr[t].push(e)}function fs(t,e){if(!zd[t]){zd[t]=!0;try{e()}catch(n){D&&A.error(`Error while instrumenting ${t}`,n)}}}function mt(t,e){const n=t&&Yr[t];if(n)for(const s of n)try{s(e)}catch(i){D&&A.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Cn(s)}
Error:`,i)}}let Ya=null;function cv(t){const e="error";hs(e,t),fs(e,lv)}function lv(){Ya=z.onerror,z.onerror=function(t,e,n,s,i){return mt("error",{column:s,error:i,line:n,msg:t,url:e}),Ya?Ya.apply(this,arguments):!1},z.onerror.__SENTRY_INSTRUMENTED__=!0}let Ja=null;function uv(t){const e="unhandledrejection";hs(e,t),fs(e,dv)}function dv(){Ja=z.onunhandledrejection,z.onunhandledrejection=function(t){return mt("unhandledrejection",t),Ja?Ja.apply(this,arguments):!0},z.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Hp=Object.prototype.toString;function Ko(t){switch(Hp.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Tn(t,Error)}}function si(t,e){return Hp.call(t)===`[object ${e}]`}function jp(t){return si(t,"ErrorEvent")}function Gd(t){return si(t,"DOMError")}function hv(t){return si(t,"DOMException")}function Vt(t){return si(t,"String")}function Vl(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Yo(t){return t===null||Vl(t)||typeof t!="object"&&typeof t!="function"}function zi(t){return si(t,"Object")}function Jo(t){return typeof Event<"u"&&Tn(t,Event)}function fv(t){return typeof Element<"u"&&Tn(t,Element)}function pv(t){return si(t,"RegExp")}function mr(t){return!!(t?.then&&typeof t.then=="function")}function gv(t){return zi(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Tn(t,e){try{return t instanceof e}catch{return!1}}function Vp(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function Wp(t){return typeof Request<"u"&&Tn(t,Request)}const Wl=z,mv=80;function qp(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,i=[];let r=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||mv;for(;n&&r++<s&&(l=_v(n,u),!(l==="html"||r>1&&o+i.length*c+l.length>=d));)i.push(l),o+=l.length,n=n.parentNode;return i.reverse().join(a)}catch{return"<unknown>"}}function _v(t,e){const n=t,s=[];if(!n?.tagName)return"";if(Wl.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const i=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(i?.length)i.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&Vt(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const r=["aria-label","type","name","title","alt"];for(const o of r){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function ql(){try{return Wl.document.location.href}catch{return""}}function yv(t){if(!Wl.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function Xe(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const i=n(s);typeof i=="function"&&zp(i,s);try{t[e]=i}catch{D&&A.log(`Failed to replace method "${e}" in object`,t)}}function Sn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{D&&A.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function zp(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,Sn(t,"__sentry_original__",e)}catch{}}function zl(t){return t.__sentry_original__}function Gp(t){if(Ko(t))return{message:t.message,name:t.name,stack:t.stack,...Yd(t)};if(Jo(t)){const e={type:t.type,target:Kd(t.target),currentTarget:Kd(t.currentTarget),...Yd(t)};return typeof CustomEvent<"u"&&Tn(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Kd(t){try{return fv(t)?qp(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function Yd(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function wv(t){const e=Object.keys(Gp(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}let ws;function Xo(t){if(ws!==void 0)return ws?ws(t):t();const e=Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"),n=z;return e in n&&typeof n[e]=="function"?(ws=n[e],ws(t)):(ws=null,t())}function ho(){return Xo(()=>Math.random())}function Qo(){return Xo(()=>Date.now())}function Dc(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function Jd(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const i=t[s];try{Vp(i)?n.push(Bp(i)):n.push(String(i))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Jr(t,e,n=!1){return Vt(t)?pv(e)?e.test(t):Vt(e)?n?t===e:t.includes(e):!1:!1}function Zo(t,e=[],n=!1){return e.some(s=>Jr(t,s,n))}function vv(){const t=z;return t.crypto||t.msCrypto}let Xa;function bv(){return ho()*16}function rt(t=vv()){try{if(t?.randomUUID)return Xo(()=>t.randomUUID()).replace(/-/g,"")}catch{}return Xa||(Xa="10000000100040008000"+1e11),Xa.replace(/[018]/g,e=>(e^(bv()&15)>>e/4).toString(16))}function Kp(t){return t.exception?.values?.[0]}function jn(t){const{message:e,event_id:n}=t;if(e)return e;const s=Kp(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function Mc(t,e,n){const s=t.exception=t.exception||{},i=s.values=s.values||[],r=i[0]=i[0]||{};r.value||(r.value=e||""),r.type||(r.type="Error")}function Bs(t,e){const n=Kp(t);if(!n)return;const s={type:"generic",handled:!0},i=n.mechanism;if(n.mechanism={...s,...i,...e},e&&"data"in e){const r={...i?.data,...e.data};n.mechanism.data=r}}function Xd(t){if(Ev(t))return!0;try{Sn(t,"__sentry_captured__",!0)}catch{}return!1}function Ev(t){try{return t.__sentry_captured__}catch{}}const Yp=1e3;function _r(){return Qo()/Yp}function Cv(){const{performance:t}=z;if(!t?.now||!t.timeOrigin)return _r;const e=t.timeOrigin;return()=>(e+Xo(()=>t.now()))/Yp}let Qd;function Wt(){return(Qd??(Qd=Cv()))()}function Tv(t){const e=Wt(),n={sid:rt(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>Iv(n)};return t&&Hs(n,t),n}function Hs(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||Wt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:rt()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function Sv(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Hs(t,n)}function Iv(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function yr(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const i in e)Object.prototype.hasOwnProperty.call(e,i)&&(s[i]=yr(s[i],e[i],n-1));return s}function Zd(){return rt()}function Jp(){return rt().substring(16)}const xc="_sentrySpan";function eh(t,e){e?Sn(t,xc,e):delete t[xc]}function th(t){return t[xc]}const kv=100;class Gt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._attributes={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:Zd(),sampleRand:ho()}}clone(){const e=new Gt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._attributes={...this._attributes},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,eh(e,th(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Hs(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setAttributes(e){return this._attributes={...this._attributes,...e},this._notifyScopeListeners(),this}setAttribute(e,n){return this.setAttributes({[e]:n})}removeAttribute(e){return e in this._attributes&&(delete this._attributes[e],this._notifyScopeListeners()),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof Gt?n.getScopeData():zi(n)?e:void 0,{tags:i,attributes:r,extra:o,user:a,contexts:c,level:l,fingerprint:u=[],propagationContext:d}=s||{};return this._tags={...this._tags,...i},this._attributes={...this._attributes,...r},this._extra={...this._extra,...o},this._contexts={...this._contexts,...c},a&&Object.keys(a).length&&(this._user=a),l&&(this._level=l),u.length&&(this._fingerprint=u),d&&(this._propagationContext=d),this}clear(){return this._breadcrumbs=[],this._tags={},this._attributes={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,eh(this,void 0),this._attachments=[],this.setPropagationContext({traceId:Zd(),sampleRand:ho()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:kv;if(s<=0)return this;const i={timestamp:_r(),...e,message:e.message?Dc(e.message,2048):e.message};return this._breadcrumbs.push(i),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,attributes:this._attributes,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:th(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=yr(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||rt();if(!this._client)return D&&A.warn("No client configured on scope - will not capture exception!"),s;const i=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:i,...n,event_id:s},this),s}captureMessage(e,n,s){const i=s?.event_id||rt();if(!this._client)return D&&A.warn("No client configured on scope - will not capture message!"),i;const r=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:r,...s,event_id:i},this),i}captureEvent(e,n){const s=n?.event_id||rt();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(D&&A.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function Rv(){return ti("defaultCurrentScope",()=>new Gt)}function Av(){return ti("defaultIsolationScope",()=>new Gt)}class Nv{constructor(e,n){let s;e?s=e:s=new Gt;let i;n?i=n:i=new Gt,this._stack=[{scope:s}],this._isolationScope=i}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(i){throw this._popScope(),i}return mr(s)?s.then(i=>(this._popScope(),i),i=>{throw this._popScope(),i}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function js(){const t=zo(),e=Go(t);return e.stack=e.stack||new Nv(Rv(),Av())}function Pv(t){return js().withScope(t)}function Lv(t,e){const n=js();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function nh(t){return js().withScope(()=>t(js().getIsolationScope()))}function Ov(){return{withIsolationScope:nh,withScope:Pv,withSetScope:Lv,withSetIsolationScope:(t,e)=>nh(e),getCurrentScope:()=>js().getScope(),getIsolationScope:()=>js().getIsolationScope()}}function Gl(t){const e=Go(t);return e.acs?e.acs:Ov()}function On(){const t=zo();return Gl(t).getCurrentScope()}function wr(){const t=zo();return Gl(t).getIsolationScope()}function Dv(){return ti("globalScope",()=>new Gt)}function Mv(...t){const e=zo(),n=Gl(e);if(t.length===2){const[s,i]=t;return s?n.withSetScope(s,i):n.withScope(i)}return n.withScope(t[0])}function xe(){return On().getClient()}function xv(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:i}=e,r={trace_id:n,span_id:i||Jp()};return s&&(r.parent_span_id=s),r}const Fv="sentry.source",Uv="sentry.sample_rate",$v="sentry.previous_trace_sample_rate",Bv="sentry.op",Hv="sentry.origin",Xp="sentry.profile_id",Qp="sentry.exclusive_time",jv=0,Vv=1,Wv="_sentryScope",qv="_sentryIsolationScope";function zv(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Zp(t){const e=t;return{scope:e[Wv],isolationScope:zv(e[qv])}}const Gv="sentry-",Kv=/^sentry-/;function Yv(t){const e=Jv(t);if(!e)return;const n=Object.entries(e).reduce((s,[i,r])=>{if(i.match(Kv)){const o=i.slice(Gv.length);s[o]=r}return s},{});if(Object.keys(n).length>0)return n}function Jv(t){if(!(!t||!Vt(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=sh(n);return Object.entries(s).forEach(([i,r])=>{e[i]=r}),e},{}):sh(t)}function sh(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),i=e.slice(n+1);return[s,i].map(r=>{try{return decodeURIComponent(r.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const Xv=/^o(\d+)\./,Qv=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;function Zv(t){return t==="http"||t==="https"}function vr(t,e=!1){const{host:n,path:s,pass:i,port:r,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&i?`:${i}`:""}@${n}${r?`:${r}`:""}/${s&&`${s}/`}${o}`}function eb(t){const e=Qv.exec(t);if(!e){ni(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,i="",r="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return eg({host:r,pass:i,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function eg(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function tb(t){if(!D)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(A.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?Zv(s)?e&&isNaN(parseInt(e,10))?(A.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(A.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(A.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function nb(t){return t.match(Xv)?.[1]}function sb(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=nb(n)),s}function ib(t){const e=typeof t=="string"?eb(t):eg(t);if(!(!e||!tb(e)))return e}function rb(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const tg=1;let ih=!1;function ob(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),i=s?e:Kl(t).parent_span_id,r=Zp(t).scope,o=s?r?.getPropagationContext().propagationSpanId||Jp():e;return{parent_span_id:i,span_id:o,trace_id:n}}function ab(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...i},attributes:r})=>({span_id:e,trace_id:n,sampled:s===tg,attributes:r,...i}))}function rh(t){return typeof t=="number"?oh(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?oh(t.getTime()):Wt()}function oh(t){return t>9999999999?t/1e3:t}function Kl(t){if(lb(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(cb(t)){const{attributes:s,startTime:i,name:r,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:r,parent_span_id:l,start_timestamp:rh(i),timestamp:rh(o)||void 0,status:db(a),op:s[Bv],origin:s[Hv],links:ab(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function cb(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function lb(t){return typeof t.getSpanJSON=="function"}function ub(t){const{traceFlags:e}=t.spanContext();return e===tg}function db(t){if(!(!t||t.code===jv))return t.code===Vv?"ok":t.message||"internal_error"}const hb="_sentryRootSpan";function ng(t){return t[hb]||t}function ah(){ih||(ni(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),ih=!0)}function fb(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=xe()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function ch(t){A.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function lh(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(gb(n)){if(Jr(t.description,n))return D&&ch(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?Jr(t.description,n.name):!0,i=n.op?t.op&&Jr(t.op,n.op):!0;if(s&&i)return D&&ch(t),!0}return!1}function pb(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const i of t)i.parent_span_id===s&&(i.parent_span_id=n)}function gb(t){return typeof t=="string"||t instanceof RegExp}const Yl="production",mb="_frozenDsc";function sg(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},i={environment:n.environment||Yl,release:n.release,public_key:s,trace_id:t,org_id:sb(e)};return e.emit("createDsc",i),i}function _b(t,e){const n=e.getPropagationContext();return n.dsc||sg(n.traceId,t)}function yb(t){const e=xe();if(!e)return{};const n=ng(t),s=Kl(n),i=s.data,r=n.spanContext().traceState,o=r?.get("sentry.sample_rate")??i[Uv]??i[$v];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[mb];if(c)return a(c);const l=r?.get("sentry.dsc"),u=l&&Yv(l);if(u)return a(u);const d=sg(t.spanContext().traceId,e),h=i[Fv],f=s.description;return h!=="url"&&f&&(d.transaction=f),fb()&&(d.sampled=String(ub(n)),d.sample_rand=r?.get("sentry.sample_rand")??Zp(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function Mt(t,e=100,n=1/0){try{return Fc("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function ig(t,e=3,n=100*1024){const s=Mt(t,e);return Eb(s)>n?ig(t,e-1,n):s}function Fc(t,e,n=1/0,s=1/0,i=Cb()){const[r,o]=i;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=wb(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(r(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return Fc("",f,c-1,s,i)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Gp(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=Fc(f,p,c-1,s,i),d++}return o(e),u}function wb(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Vp(e))return Bp(e);if(gv(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Cn(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=vb(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function vb(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function bb(t){return~-encodeURI(t).split(/%..|./).length}function Eb(t){return bb(JSON.stringify(t))}function Cb(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function ii(t,e=[]){return[t,e]}function Tb(t,e){const[n,s]=t;return[n,[...s,e]]}function Uc(t,e){const n=t[1];for(const s of n){const i=s[0].type;if(e(s,i))return!0}return!1}function Sb(t,e){return Uc(t,(n,s)=>e.includes(s))}function $c(t){const e=Go(z);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function Ib(t){const[e,n]=t;let s=JSON.stringify(e);function i(r){typeof s=="string"?s=typeof r=="string"?s+r:[$c(s),r]:s.push(typeof r=="string"?$c(r):r)}for(const r of n){const[o,a]=r;if(i(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)i(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(Mt(a))}i(c)}}return typeof s=="string"?s:kb(s)}function kb(t){const e=t.reduce((i,r)=>i+r.length,0),n=new Uint8Array(e);let s=0;for(const i of t)n.set(i,s),s+=i.length;return n}function Rb(t){const e=typeof t.data=="string"?$c(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const Ab={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function uh(t){return Ab[t]}function rg(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function Nb(t,e,n,s){const i=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:vr(s)},...i&&{trace:i}}}function Pb(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Lb(t,e,n,s){const i=rg(n),r={sent_at:new Date().toISOString(),...i&&{sdk:i},...!!s&&e&&{dsn:vr(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return ii(r,[o])}function Ob(t,e,n,s){const i=rg(n),r=t.type&&t.type!=="replay_event"?t.type:"event";Pb(t,n?.sdk);const o=Nb(t,i,s,e);return delete t.sdkProcessingMetadata,ii(o,[[{type:r},t]])}const Qa=0,dh=1,hh=2;function ea(t){return new Gi(e=>{e(t)})}function Jl(t){return new Gi((e,n)=>{n(t)})}class Gi{constructor(e){this._state=Qa,this._handlers=[],this._runExecutor(e)}then(e,n){return new Gi((s,i)=>{this._handlers.push([!1,r=>{if(!e)s(r);else try{s(e(r))}catch(o){i(o)}},r=>{if(!n)i(r);else try{s(n(r))}catch(o){i(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Gi((n,s)=>{let i,r;return this.then(o=>{r=!1,i=o,e&&e()},o=>{r=!0,i=o,e&&e()}).then(()=>{if(r){s(i);return}n(i)})})}_executeHandlers(){if(this._state===Qa)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===dh&&n[1](this._value),this._state===hh&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(r,o)=>{if(this._state===Qa){if(mr(o)){o.then(s,i);return}this._state=r,this._value=o,this._executeHandlers()}},s=r=>{n(dh,r)},i=r=>{n(hh,r)};try{e(s,i)}catch(r){i(r)}}}function Db(t,e,n,s=0){try{const i=Bc(e,n,t,s);return mr(i)?i:ea(i)}catch(i){return Jl(i)}}function Bc(t,e,n,s){const i=n[s];if(!t||!i)return t;const r=i({...t},e);return D&&r===null&&A.log(`Event processor "${i.id||"?"}" dropped event`),mr(r)?r.then(o=>Bc(o,e,n,s+1)):Bc(r,e,n,s+1)}let Un,fh,ph,sn;function Mb(t){const e=z._sentryDebugIds,n=z._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],i=n?Object.keys(n):[];if(sn&&s.length===fh&&i.length===ph)return sn;fh=s.length,ph=i.length,sn={},Un||(Un={});const r=(o,a)=>{for(const c of o){const l=a[c],u=Un?.[c];if(u&&sn&&l)sn[u[0]]=l,Un&&(Un[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&sn&&Un){sn[p]=l,Un[c]=[p,l];break}}}}};return e&&r(s,e),n&&r(i,n),sn}function xb(t,e){const{fingerprint:n,span:s,breadcrumbs:i,sdkProcessingMetadata:r}=e;Ub(t,e),s&&Hb(t,s),jb(t,n),$b(t,i),Bb(t,r)}function gh(t,e){const{extra:n,tags:s,attributes:i,user:r,contexts:o,level:a,sdkProcessingMetadata:c,breadcrumbs:l,fingerprint:u,eventProcessors:d,attachments:h,propagationContext:f,transactionName:p,span:m}=e;yi(t,"extra",n),yi(t,"tags",s),yi(t,"attributes",i),yi(t,"user",r),yi(t,"contexts",o),t.sdkProcessingMetadata=yr(t.sdkProcessingMetadata,c,2),a&&(t.level=a),p&&(t.transactionName=p),m&&(t.span=m),l.length&&(t.breadcrumbs=[...t.breadcrumbs,...l]),u.length&&(t.fingerprint=[...t.fingerprint,...u]),d.length&&(t.eventProcessors=[...t.eventProcessors,...d]),h.length&&(t.attachments=[...t.attachments,...h]),t.propagationContext={...t.propagationContext,...f}}function yi(t,e,n){t[e]=yr(t[e],n,1)}function Fb(t,e){const n=Dv().getScopeData();return t&&gh(n,t.getScopeData()),e&&gh(n,e.getScopeData()),n}function Ub(t,e){const{extra:n,tags:s,user:i,contexts:r,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(i).length&&(t.user={...i,...t.user}),Object.keys(r).length&&(t.contexts={...r,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function $b(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Bb(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Hb(t,e){t.contexts={trace:ob(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:yb(e),...t.sdkProcessingMetadata};const n=ng(e),s=Kl(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function jb(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}function Vb(t,e,n,s,i,r){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||rt(),timestamp:e.timestamp||_r()},l=n.integrations||t.integrations.map(g=>g.name);Wb(c,t),Gb(c,l),i&&i.emit("applyFrameMetadata",e),e.type===void 0&&qb(c,t.stackParser);const u=Yb(s,n.captureContext);n.mechanism&&Bs(c,n.mechanism);const d=i?i.getEventProcessors():[],h=Fb(r,u),f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),xb(c,h);const p=[...d,...h.eventProcessors];return Db(p,c,n).then(g=>(g&&zb(g),typeof o=="number"&&o>0?Kb(g,o,a):g))}function Wb(t,e){const{environment:n,release:s,dist:i,maxValueLength:r}=e;t.environment=t.environment||n||Yl,!t.release&&s&&(t.release=s),!t.dist&&i&&(t.dist=i);const o=t.request;o?.url&&r&&(o.url=Dc(o.url,r)),r&&t.exception?.values?.forEach(a=>{a.value&&(a.value=Dc(a.value,r))})}function qb(t,e){const n=Mb(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(i=>{i.filename&&(i.debug_id=n[i.filename])})})}function zb(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(i=>{i.debug_id&&(i.abs_path?e[i.abs_path]=i.debug_id:i.filename&&(e[i.filename]=i.debug_id),delete i.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,i])=>{n.push({type:"sourcemap",code_file:s,debug_id:i})})}function Gb(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function Kb(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(i=>({...i,...i.data&&{data:Mt(i.data,e,n)}}))},...t.user&&{user:Mt(t.user,e,n)},...t.contexts&&{contexts:Mt(t.contexts,e,n)},...t.extra&&{extra:Mt(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=Mt(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(i=>({...i,...i.data&&{data:Mt(i.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=Mt(t.contexts.flags,3,n)),s}function Yb(t,e){if(!e)return t;const n=t?t.clone():new Gt;return n.update(e),n}function Jb(t,e){return On().captureException(t,void 0)}function og(t,e){return On().captureEvent(t,e)}function mh(t){const e=wr(),n=On(),{userAgent:s}=z.navigator||{},i=Tv({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),r=e.getSession();return r?.status==="ok"&&Hs(r,{status:"exited"}),ag(),e.setSession(i),i}function ag(){const t=wr(),n=On().getSession()||t.getSession();n&&Sv(n),cg(),t.setSession()}function cg(){const t=wr(),e=xe(),n=t.getSession();n&&e&&e.captureSession(n)}function _h(t=!1){if(t){ag();return}cg()}const Xb="7";function Qb(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function Zb(t){return`${Qb(t)}${t.projectId}/envelope/`}function eE(t,e){const n={sentry_version:Xb};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function tE(t,e,n){return e||`${Zb(t)}?${eE(t,n)}`}const yh=[];function nE(t){const e={};return t.forEach(n=>{const{name:s}=n,i=e[s];i&&!i.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function sE(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(i=>{i.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const i=n(e);s=Array.isArray(i)?i:[i]}else s=e;return nE(s)}function iE(t,e){const n={};return e.forEach(s=>{s&&lg(t,s,n)}),n}function wh(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function lg(t,e,n){if(n[e.name]){D&&A.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!yh.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),yh.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(i,r)=>s(i,r,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),i=Object.assign((r,o)=>s(r,o,t),{id:e.name});t.addEventProcessor(i)}D&&A.log(`Integration installed: ${e.name}`)}function rE(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function oE(t,e,n,s){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(i.dsn=vr(s)),ii(i,[rE(t)])}function ug(t,e){const n=e??aE(t)??[];if(n.length===0)return;const s=t.getOptions(),i=oE(n,s._metadata,s.tunnel,t.getDsn());dg().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(i)}function aE(t){return dg().get(t)}function dg(){return ti("clientToLogBufferMap",()=>new WeakMap)}function cE(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function lE(t,e,n,s){const i={};return e?.sdk&&(i.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(i.dsn=vr(s)),ii(i,[cE(t)])}function hg(t,e){const n=e??uE(t)??[];if(n.length===0)return;const s=t.getOptions(),i=lE(n,s._metadata,s.tunnel,t.getDsn());fg().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(i)}function uE(t){return fg().get(t)}function fg(){return ti("clientToMetricBufferMap",()=>new WeakMap)}const Xl=Symbol.for("SentryBufferFullError");function Ql(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function i(o){if(!n())return Jl(Xl);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function r(o){if(!e.size)return ea(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:i,drain:r}}const dE=60*1e3;function hE(t,e=Qo()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?dE:s-e}function fE(t,e){return t[e]||t.all||0}function pE(t,e,n=Qo()){return fE(t,e)>n}function gE(t,{statusCode:e,headers:n},s=Qo()){const i={...t},r=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(r)for(const a of r.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)i.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(i[f]=s+h):i[f]=s+h}else o?i.all=s+hE(o,s):e===429&&(i.all=s+60*1e3);return i}const pg=64;function mE(t,e,n=Ql(t.bufferSize||pg)){let s={};const i=o=>n.drain(o);function r(o){const a=[];if(Uc(o,(d,h)=>{const f=uh(h);pE(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=ii(o[0],a),l=d=>{if(Sb(c,["client_report"])){D&&A.warn(`Dropping client report. Will not send outcomes (reason: ${d}).`);return}Uc(c,(h,f)=>{t.recordDroppedEvent(d,uh(f))})},u=()=>e({body:Ib(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&D&&A.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=gE(s,d),d),d=>{throw l("network_error"),D&&A.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===Xl)return D&&A.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:r,flush:i}}function _E(t,e,n){const s=[{type:"client_report"},{timestamp:_r(),discarded_events:t}];return ii(e?{dsn:e}:{},[s])}function gg(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function yE(t){const{trace_id:e,parent_span_id:n,span_id:s,status:i,origin:r,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:i,timestamp:t.timestamp,trace_id:e??"",origin:r,profile_id:o?.[Xp],exclusive_time:o?.[Qp],measurements:t.measurements,is_segment:!0}}function wE(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Xp]:t.profile_id},...t.exclusive_time&&{[Qp]:t.exclusive_time}}}},measurements:t.measurements}}const vh="Not capturing exception because it's already been captured.",bh="Discarded session because of missing or non-string release",mg=Symbol.for("SentryInternalError"),_g=Symbol.for("SentryDoNotSendEventError"),vE=5e3;function Xr(t){return{message:t,[mg]:!0}}function Za(t){return{message:t,[_g]:!0}}function Eh(t){return!!t&&typeof t=="object"&&mg in t}function Ch(t){return!!t&&typeof t=="object"&&_g in t}function Th(t,e,n,s,i){let r=0,o,a=!1;t.on(n,()=>{r=0,clearTimeout(o),a=!1}),t.on(e,c=>{r+=s(c),r>=8e5?i(t):a||(a=!0,o=setTimeout(()=>{i(t)},vE))}),t.on("flush",()=>{i(t)})}class bE{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],this._promiseBuffer=Ql(e.transportOptions?.bufferSize??pg),e.dsn?this._dsn=ib(e.dsn):D&&A.warn("No DSN provided, client will not send events."),this._dsn){const s=tE(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs=this._options.enableLogs??this._options._experiments?.enableLogs,this._options.enableLogs&&Th(this,"afterCaptureLog","flushLogs",SE,ug),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Th(this,"afterCaptureMetric","flushMetrics",TE,hg)}captureException(e,n,s){const i=rt();if(Xd(e))return D&&A.log(vh),i;const r={event_id:i,...n};return this._process(()=>this.eventFromException(e,r).then(o=>this._captureEvent(o,r,s)).then(o=>o),"error"),r.event_id}captureMessage(e,n,s,i){const r={event_id:rt(),...s},o=Vl(e)?e:String(e),a=Yo(e),c=a?this.eventFromMessage(o,n,r):this.eventFromException(e,r);return this._process(()=>c.then(l=>this._captureEvent(l,r,i)),a?"unknown":"error"),r.event_id}captureEvent(e,n,s){const i=rt();if(n?.originalException&&Xd(n.originalException))return D&&A.log(vh),i;const r={event_id:i,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope,l=Sh(e.type);return this._process(()=>this._captureEvent(e,r,a||s,c),l),r.event_id}captureSession(e){this.sendSession(e),Hs(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),i=await n.flush(e);return s&&i}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];lg(this,e,this._integrations),n||wh(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=Ob(e,this._dsn,this._options._metadata,this._options.tunnel);for(const i of n.attachments||[])s=Tb(s,Rb(i));this.sendEnvelope(s).then(i=>this.emit("afterSendEvent",e,i))}sendSession(e){const{release:n,environment:s=Yl}=this._options;if("aggregates"in e){const r=e.attrs||{};if(!r.release&&!n){D&&A.warn(bh);return}r.release=r.release||n,r.environment=r.environment||s,e.attrs=r}else{if(!e.release&&!n){D&&A.warn(bh);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const i=Lb(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(i)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const i=`${e}:${n}`;D&&A.log(`Recording outcome: "${i}"${s>1?` (${s} times)`:""}`),this._outcomes[i]=(this._outcomes[i]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,i=(...r)=>n(...r);return s.add(i),()=>{s.delete(i)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(i=>i(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return D&&A.error("Error while sending envelope:",n),{}}return D&&A.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=iE(this,e),wh(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",i=!1;const r=n.exception?.values;if(r){i=!0,s=!1;for(const c of r)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(Hs(e,{...s&&{status:"crashed"},errors:e.errors||Number(i||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,i){const r=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||i.setLastEventId(e.event_id||n.event_id),Vb(r,e,n,s,this,i).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:xv(s),...a.contexts};const c=_b(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=On(),i=wr()){return D&&Hc(e)&&A.log(`Captured error event \`${gg(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,i).then(r=>r.event_id,r=>{D&&(Ch(r)?A.log(r.message):Eh(r)?A.warn(r.message):A.warn(r))})}_processEvent(e,n,s,i){const r=this.getOptions(),{sampleRate:o}=r,a=yg(e),c=Hc(e),u=`before send for type \`${e.type||"error"}\``,d=typeof o>"u"?void 0:rb(o);if(c&&typeof d=="number"&&ho()>d)return this.recordDroppedEvent("sample_rate","error"),Jl(Za(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=Sh(e.type);return this._prepareEvent(e,n,s,i).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Za("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const m=CE(this,r,f,n);return EE(m,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw Za(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||i.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const g=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,B=g-T;B>0&&this.recordDroppedEvent("before_send","span",B)}const m=f.transaction_info;if(a&&m&&f.transaction!==e.transaction){const g="custom";f.transaction_info={...m,source:g}}return this.sendEvent(f,n),f}).then(null,f=>{throw Ch(f)||Eh(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),Xr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e,n){this._numProcessing++,this._promiseBuffer.add(e).then(s=>(this._numProcessing--,s),s=>(this._numProcessing--,s===Xl&&this.recordDroppedEvent("queue_overflow",n),s))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[i,r]=n.split(":");return{reason:i,category:r,quantity:s}})}_flushOutcomes(){D&&A.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){D&&A.log("No outcomes to send");return}if(!this._dsn){D&&A.log("No dsn provided, will not send outcomes");return}D&&A.log("Sending outcomes:",e);const n=_E(e,this._options.tunnel&&vr(this._dsn));this.sendEnvelope(n)}}function Sh(t){return t==="replay_event"?"replay":t||"error"}function EE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(mr(t))return t.then(s=>{if(!zi(s)&&s!==null)throw Xr(n);return s},s=>{throw Xr(`${e} rejected with ${s}`)});if(!zi(t)&&t!==null)throw Xr(n);return t}function CE(t,e,n,s){const{beforeSend:i,beforeSendTransaction:r,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(Hc(c)&&i)return i(c,s);if(yg(c)){if(o||a){const l=yE(c);if(a?.length&&lh(l,a))return null;if(o){const u=o(l);u?c=yr(n,wE(u)):ah()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&lh(f,a)){pb(d,f);continue}if(o){const p=o(f);p?u.push(p):(ah(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(r){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return r(c,s)}}return c}function Hc(t){return t.type===void 0}function yg(t){return t.type==="transaction"}function TE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+wg(t.attributes)}function SE(t){let e=0;return t.message&&(e+=t.message.length*2),e+wg(t.attributes)}function wg(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*Ih(n[0]):Yo(n)?e+=Ih(n):e+=100}),e}function Ih(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function IE(t){return Ko(t)&&"__sentry_fetch_url_host__"in t&&typeof t.__sentry_fetch_url_host__=="string"}function kh(t){return IE(t)?`${t.message} (${t.__sentry_fetch_url_host__})`:t.message}function kE(t,e){e.debug===!0&&(D?A.enable():ni(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),On().update(e.initialScope);const s=new t(e);return RE(s),s.init(),s}function RE(t){On().setClient(t)}function ec(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function AE(t,e=!0){if(t.startsWith("data:")){const n=t.match(/^data:([^;,]+)/),s=n?n[1]:"text/plain",i=t.includes(";base64,"),r=t.indexOf(",");let o="";if(e&&r!==-1){const a=t.slice(r+1);o=a.length>10?`${a.slice(0,10)}... [truncated]`:a}return`data:${s}${i?",base64":""}${o?`,${o}`:""}`}return t}function NE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function PE(t,e,n=[e],s="npm"){const i=t._metadata||{};i.sdk||(i.sdk={name:`sentry.javascript.${e}`,packages:n.map(r=>({name:`${s}:@sentry/${r}`,version:zn})),version:zn}),t._metadata=i}const LE=100;function Qn(t,e){const n=xe(),s=wr();if(!n)return;const{beforeBreadcrumb:i=null,maxBreadcrumbs:r=LE}=n.getOptions();if(r<=0)return;const a={timestamp:_r(),...t},c=i?ni(()=>i(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,r))}let Rh;const OE="FunctionToString",Ah=new WeakMap,DE=(()=>({name:OE,setupOnce(){Rh=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=zl(this),n=Ah.has(xe())&&e!==void 0?e:this;return Rh.apply(n,t)}}catch{}},setup(t){Ah.set(t,!0)}})),ME=DE,xE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],FE="EventFilters",UE=(t={})=>{let e;return{name:FE,setup(n){const s=n.getOptions();e=Nh(t,s)},processEvent(n,s,i){if(!e){const r=i.getOptions();e=Nh(t,r)}return BE(n,e)?null:n}}},$E=((t={})=>({...UE(t),name:"InboundFilters"}));function Nh(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:xE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function BE(t,e){if(t.type){if(t.type==="transaction"&&jE(t,e.ignoreTransactions))return D&&A.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${jn(t)}`),!0}else{if(HE(t,e.ignoreErrors))return D&&A.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${jn(t)}`),!0;if(zE(t))return D&&A.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${jn(t)}`),!0;if(VE(t,e.denyUrls))return D&&A.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${jn(t)}.
Url: ${fo(t)}`),!0;if(!WE(t,e.allowUrls))return D&&A.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${jn(t)}.
Url: ${fo(t)}`),!0}return!1}function HE(t,e){return e?.length?gg(t).some(n=>Zo(n,e)):!1}function jE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?Zo(n,e):!1}function VE(t,e){if(!e?.length)return!1;const n=fo(t);return n?Zo(n,e):!1}function WE(t,e){if(!e?.length)return!0;const n=fo(t);return n?Zo(n,e):!0}function qE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function fo(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?qE(n):null}catch{return D&&A.error(`Cannot extract url for event ${jn(t)}`),null}}function zE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function GE(t,e,n,s,i,r){if(!i.exception?.values||!r||!Tn(r.originalException,Error))return;const o=i.exception.values.length>0?i.exception.values[i.exception.values.length-1]:void 0;o&&(i.exception.values=jc(t,e,s,r.originalException,n,i.exception.values,o,0))}function jc(t,e,n,s,i,r,o,a){if(r.length>=n+1)return r;let c=[...r];if(Tn(s[i],Error)){Ph(o,a);const l=t(e,s[i]),u=c.length;Lh(l,i,u,a),c=jc(t,e,n,s[i],i,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(Tn(l,Error)){Ph(o,a);const d=t(e,l),h=c.length;Lh(d,`errors[${u}]`,h,a),c=jc(t,e,n,l,i,[d,...c],d,h)}}),c}function Ph(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function Lh(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function KE(t){const e="console";hs(e,t),fs(e,YE)}function YE(){"console"in z&&Zw.forEach(function(t){t in z.console&&Xe(z.console,t,function(e){return uo[t]=e,function(...n){mt("console",{args:n,level:t}),uo[t]?.apply(z.console,n)}})})}function JE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const XE="Dedupe",QE=(()=>{let t;return{name:XE,processEvent(e){if(e.type)return e;try{if(eC(e,t))return D&&A.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),ZE=QE;function eC(t,e){return e?!!(tC(t,e)||nC(t,e)):!1}function tC(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!bg(t,e)||!vg(t,e))}function nC(t,e){const n=Oh(e),s=Oh(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!bg(t,e)||!vg(t,e))}function vg(t,e){let n=qd(t),s=qd(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let i=0;i<s.length;i++){const r=s[i],o=n[i];if(r.filename!==o.filename||r.lineno!==o.lineno||r.colno!==o.colno||r.function!==o.function)return!1}return!0}function bg(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function Oh(t){return t.exception?.values?.[0]}function Eg(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Ki=z;function sC(){return"history"in Ki&&!!Ki.history}function iC(){if(!("fetch"in Ki))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function Vc(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function rC(){if(typeof EdgeRuntime=="string")return!0;if(!iC())return!1;if(Vc(Ki.fetch))return!0;let t=!1;const e=Ki.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=Vc(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){D&&A.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function oC(t,e){const n="fetch";hs(n,t),fs(n,()=>aC(void 0,e))}function aC(t,e=!1){e&&!rC()||Xe(z,"fetch",function(n){return function(...s){const i=new Error,{method:r,url:o}=cC(s),a={args:s,fetchData:{method:r,url:o},startTimestamp:Wt()*1e3,virtualError:i,headers:lC(s)};return mt("fetch",{...a}),n.apply(z,s).then(async c=>(mt("fetch",{...a,endTimestamp:Wt()*1e3,response:c}),c),c=>{mt("fetch",{...a,endTimestamp:Wt()*1e3,error:c}),Ko(c)&&c.stack===void 0&&(c.stack=i.stack,Sn(c,"framesToPop",1));const u=xe()?.getOptions().enhanceFetchErrorMessages??"always";if(u!==!1&&c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const f=new URL(a.fetchData.url).host;u==="always"?c.message=`${c.message} (${f})`:Sn(c,"__sentry_fetch_url_host__",f)}catch{}throw c})}})}function Qr(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Dh(t){return typeof t=="string"?t:t?Qr(t,"url")?t.url:t.toString?t.toString():"":""}function cC(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:Dh(n),method:Qr(s,"method")?String(s.method).toUpperCase():Wp(n)&&Qr(n,"method")?String(n.method).toUpperCase():"GET"}}const e=t[0];return{url:Dh(e),method:Qr(e,"method")?String(e.method).toUpperCase():"GET"}}function lC(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(Wp(e))return new Headers(e.headers)}catch{}}function uC(){return"npm"}const me=z;let Wc=0;function Cg(){return Wc>0}function dC(){Wc++,setTimeout(()=>{Wc--})}function Vs(t,e={}){function n(i){return typeof i=="function"}if(!n(t))return t;try{const i=t.__sentry_wrapped__;if(i)return typeof i=="function"?i:t;if(zl(t))return t}catch{return t}const s=function(...i){try{const r=i.map(o=>Vs(o,e));return t.apply(this,r)}catch(r){throw dC(),Mv(o=>{o.addEventProcessor(a=>(e.mechanism&&(Mc(a,void 0),Bs(a,e.mechanism)),a.extra={...a.extra,arguments:i},a)),Jb(r)}),r}};try{for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=t[i])}catch{}zp(s,t),Sn(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function hC(){const t=ql(),{referrer:e}=me.document||{},{userAgent:n}=me.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function Zl(t,e){const n=eu(t,e),s={type:_C(e),value:yC(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function fC(t,e,n,s){const r=xe()?.getOptions().normalizeDepth,o=CC(e),a={__serialized__:ig(e,r)};if(o)return{exception:{values:[Zl(t,o)]},extra:a};const c={exception:{values:[{type:Jo(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:bC(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=eu(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function tc(t,e){return{exception:{values:[Zl(t,e)]}}}function eu(t,e){const n=e.stacktrace||e.stack||"",s=gC(e),i=mC(e);try{return t(n,s,i)}catch{}return[]}const pC=/Minified React error #\d+;/i;function gC(t){return t&&pC.test(t.message)?1:0}function mC(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function Tg(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function _C(t){const e=t?.name;return!e&&Tg(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function yC(t){const e=t?.message;return Tg(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?kh(e.error):kh(t):"No error message"}function wC(t,e,n,s){const i=n?.syntheticException||void 0,r=tu(t,e,i,s);return Bs(r),r.level="error",n?.event_id&&(r.event_id=n.event_id),ea(r)}function vC(t,e,n="info",s,i){const r=s?.syntheticException||void 0,o=qc(t,e,r,i);return o.level=n,s?.event_id&&(o.event_id=s.event_id),ea(o)}function tu(t,e,n,s,i){let r;if(jp(e)&&e.error)return tc(t,e.error);if(Gd(e)||hv(e)){const o=e;if("stack"in e)r=tc(t,e);else{const a=o.name||(Gd(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;r=qc(t,c,n,s),Mc(r,c)}return"code"in o&&(r.tags={...r.tags,"DOMException.code":`${o.code}`}),r}return Ko(e)?tc(t,e):zi(e)||Jo(e)?(r=fC(t,e,n,i),Bs(r,{synthetic:!0}),r):(r=qc(t,e,n,s),Mc(r,`${e}`),Bs(r,{synthetic:!0}),r)}function qc(t,e,n,s){const i={};if(s&&n){const r=eu(t,n);r.length&&(i.exception={values:[{value:e,stacktrace:{frames:r}}]}),Bs(i,{synthetic:!0})}if(Vl(e)){const{__sentry_template_string__:r,__sentry_template_values__:o}=e;return i.logentry={message:r,params:o},i}return i.message=e,i}function bC(t,{isUnhandledRejection:e}){const n=wv(t),s=e?"promise rejection":"exception";return jp(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:Jo(t)?`Event \`${EC(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function EC(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function CC(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class TC extends bE{constructor(e){const n=SC(e),s=me.SENTRY_SDK_SOURCE||uC();PE(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:i,sendClientReports:r,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;me.document&&(r||o||l)&&me.document.addEventListener("visibilitychange",()=>{me.document.visibilityState==="hidden"&&(r&&this._flushOutcomes(),o&&ug(this),l&&hg(this))}),i&&this.on("beforeSendSession",NE)}eventFromException(e,n){return wC(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return vC(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,i){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,i)}}function SC(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:me.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const IC=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,Ue=z,kC=1e3;let Mh,zc,Gc;function RC(t){hs("dom",t),fs("dom",AC)}function AC(){if(!Ue.document)return;const t=mt.bind(null,"dom"),e=xh(t,!0);Ue.document.addEventListener("click",e,!1),Ue.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const i=Ue[n]?.prototype;i?.hasOwnProperty?.("addEventListener")&&(Xe(i,"addEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=xh(t);u.handler=d,r.call(this,o,d,c)}u.refCount++}catch{}return r.call(this,o,a,c)}}),Xe(i,"removeEventListener",function(r){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(r.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return r.call(this,o,a,c)}}))})}function NC(t){if(t.type!==zc)return!1;try{if(!t.target||t.target._sentryId!==Gc)return!1}catch{}return!0}function PC(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function xh(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=LC(n);if(PC(n.type,s))return;Sn(n,"_sentryCaptured",!0),s&&!s._sentryId&&Sn(s,"_sentryId",rt());const i=n.type==="keypress"?"input":n.type;NC(n)||(t({event:n,name:i,global:e}),zc=n.type,Gc=s?s._sentryId:void 0),clearTimeout(Mh),Mh=Ue.setTimeout(()=>{Gc=void 0,zc=void 0},kC)}}function LC(t){try{return t.target}catch{return null}}let $r;function Sg(t){const e="history";hs(e,t),fs(e,OC)}function OC(){if(Ue.addEventListener("popstate",()=>{const e=Ue.location.href,n=$r;if($r=e,n===e)return;mt("history",{from:n,to:e})}),!sC())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const i=$r,r=DC(String(s));if($r=r,i===r)return e.apply(this,n);mt("history",{from:i,to:r})}return e.apply(this,n)}}Xe(Ue.history,"pushState",t),Xe(Ue.history,"replaceState",t)}function DC(t){try{return new URL(t,Ue.location.origin).toString()}catch{return t}}const Zr={};function MC(t){const e=Zr[t];if(e)return e;let n=Ue[t];if(Vc(n))return Zr[t]=n.bind(Ue);const s=Ue.document;if(s&&typeof s.createElement=="function")try{const i=s.createElement("iframe");i.hidden=!0,s.head.appendChild(i);const r=i.contentWindow;r?.[t]&&(n=r[t]),s.head.removeChild(i)}catch(i){IC&&A.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,i)}return n&&(Zr[t]=n.bind(Ue))}function xC(t){Zr[t]=void 0}const ki="__sentry_xhr_v3__";function FC(t){hs("xhr",t),fs("xhr",UC)}function UC(){if(!Ue.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const i=new Error,r=Wt()*1e3,o=Vt(s[0])?s[0].toUpperCase():void 0,a=$C(s[1]);if(!o||!a)return e.apply(n,s);n[ki]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[ki];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:Wt()*1e3,startTimestamp:r,xhr:n,virtualError:i};mt("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[ki];return p&&Vt(h)&&Vt(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const i=n[ki];if(!i)return e.apply(n,s);s[0]!==void 0&&(i.body=s[0]);const r={startTimestamp:Wt()*1e3,xhr:n};return mt("xhr",r),e.apply(n,s)}})}function $C(t){if(Vt(t))return t;try{return t.toString()}catch{}}const BC=40;function HC(t,e=MC("fetch")){let n=0,s=0;async function i(r){const o=r.body.length;n+=o,s++;const a={body:r.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw xC("fetch"),c}finally{n-=o,s--}}return mE(t,i,Ql(t.bufferSize||BC))}const ta=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,jC=30,VC=50;function Kc(t,e,n,s){const i={filename:t,function:e==="<anonymous>"?Xn:e,in_app:!0};return n!==void 0&&(i.lineno=n),s!==void 0&&(i.colno=s),i}const WC=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,qC=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,zC=/\((\S*)(?::(\d+))(?::(\d+))\)/,GC=/at (.+?) ?\(data:(.+?),/,KC=t=>{const e=t.match(GC);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=WC.exec(t);if(n){const[,i,r,o]=n;return Kc(i,Xn,+r,+o)}const s=qC.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=zC.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[r,o]=Ig(s[1]||Xn,s[2]);return Kc(o,r,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},YC=[jC,KC],JC=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,XC=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,QC=t=>{const e=JC.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const r=XC.exec(e[3]);r&&(e[1]=e[1]||"eval",e[3]=r[1],e[4]=r[2],e[5]="")}let s=e[3],i=e[1]||Xn;return[i,s]=Ig(i,s),Kc(s,i,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},ZC=[VC,QC],eT=[YC,ZC],tT=$p(...eT),Ig=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:Xn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Br=1024,nT="Breadcrumbs",sT=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:nT,setup(n){e.console&&KE(aT(n)),e.dom&&RC(oT(n,e.dom)),e.xhr&&FC(cT(n)),e.fetch&&oC(lT(n)),e.history&&Sg(uT(n)),e.sentry&&n.on("beforeSendEvent",rT(n))}}}),iT=sT;function rT(t){return function(n){xe()===t&&Qn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:jn(n)},{event:n})}}function oT(t,e){return function(s){if(xe()!==t)return;let i,r,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>Br&&(ta&&A.warn(`\`dom.maxStringLength\` cannot exceed ${Br}, but a value of ${a} was configured. Sentry will use ${Br} instead.`),a=Br),typeof o=="string"&&(o=[o]);try{const l=s.event,u=dT(l)?l.target:l;i=qp(u,{keyAttrs:o,maxStringLength:a}),r=yv(u)}catch{i="<unknown>"}if(i.length===0)return;const c={category:`ui.${s.name}`,message:i};r&&(c.data={"ui.component_name":r}),Qn(c,{event:s.event,name:s.name,global:s.global})}}function aT(t){return function(n){if(xe()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:JE(n.level),message:Jd(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${Jd(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;Qn(s,{input:n.args,level:n.level})}}function cT(t){return function(n){if(xe()!==t)return;const{startTimestamp:s,endTimestamp:i}=n,r=n.xhr[ki];if(!s||!i||!r)return;const{method:o,url:a,status_code:c,body:l}=r,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:i},h={category:"xhr",data:u,type:"http",level:Eg(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),Qn(h,d)}}function lT(t){return function(n){if(xe()!==t)return;const{startTimestamp:s,endTimestamp:i}=n;if(i&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const r=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:i},a={category:"fetch",data:r,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),Qn(a,o)}else{const r=n.response,o={...n.fetchData,status_code:r?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,r?.status;const a={input:n.args,response:r,startTimestamp:s,endTimestamp:i},c={category:"fetch",data:o,type:"http",level:Eg(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),Qn(c,a)}}}function uT(t){return function(n){if(xe()!==t)return;let s=n.from,i=n.to;const r=ec(me.location.href);let o=s?ec(s):void 0;const a=ec(i);o?.path||(o=r),r.protocol===a.protocol&&r.host===a.host&&(i=a.relative),r.protocol===o.protocol&&r.host===o.host&&(s=o.relative),Qn({category:"navigation",data:{from:s,to:i}})}}function dT(t){return!!t&&!!t.target}const hT=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],fT="BrowserApiErrors",pT=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:fT,setupOnce(){e.setTimeout&&Xe(me,"setTimeout",Fh),e.setInterval&&Xe(me,"setInterval",Fh),e.requestAnimationFrame&&Xe(me,"requestAnimationFrame",mT),e.XMLHttpRequest&&"XMLHttpRequest"in me&&Xe(XMLHttpRequest.prototype,"send",_T);const n=e.eventTarget;n&&(Array.isArray(n)?n:hT).forEach(i=>yT(i,e))}}}),gT=pT;function Fh(t){return function(...e){const n=e[0];return e[0]=Vs(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Cn(t)}`}}),t.apply(this,e)}}function mT(t){return function(e){return t.apply(this,[Vs(e,{mechanism:{data:{handler:Cn(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function _T(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(i=>{i in n&&typeof n[i]=="function"&&Xe(n,i,function(r){const o={mechanism:{data:{handler:Cn(r)},handled:!1,type:`auto.browser.browserapierrors.xhr.${i}`}},a=zl(r);return a&&(o.mechanism.data.handler=Cn(a)),Vs(r,o)})}),t.apply(this,e)}}function yT(t,e){const s=me[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(Xe(s,"addEventListener",function(i){return function(r,o,a){try{wT(o)&&(o.handleEvent=Vs(o.handleEvent,{mechanism:{data:{handler:Cn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&vT(this,r,o),i.apply(this,[r,Vs(o,{mechanism:{data:{handler:Cn(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),Xe(s,"removeEventListener",function(i){return function(r,o,a){try{const c=o.__sentry_wrapped__;c&&i.call(this,r,c,a)}catch{}return i.call(this,r,o,a)}}))}function wT(t){return typeof t.handleEvent=="function"}function vT(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const bT=()=>({name:"BrowserSession",setupOnce(){if(typeof me.document>"u"){ta&&A.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}mh({ignoreDuration:!0}),_h(),Sg(({from:t,to:e})=>{t!==void 0&&t!==e&&(mh({ignoreDuration:!0}),_h())})}}),ET="GlobalHandlers",CT=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:ET,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(ST(n),Uh("onerror")),e.onunhandledrejection&&(IT(n),Uh("onunhandledrejection"))}}}),TT=CT;function ST(t){cv(e=>{const{stackParser:n,attachStacktrace:s}=kg();if(xe()!==t||Cg())return;const{msg:i,url:r,line:o,column:a,error:c}=e,l=AT(tu(n,c||i,void 0,s,!1),r,o,a);l.level="error",og(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function IT(t){uv(e=>{const{stackParser:n,attachStacktrace:s}=kg();if(xe()!==t||Cg())return;const i=kT(e),r=Yo(i)?RT(i):tu(n,i,void 0,s,!0);r.level="error",og(r,{originalException:i,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function kT(t){if(Yo(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function RT(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function AT(t,e,n,s){const i=t.exception=t.exception||{},r=i.values=i.values||[],o=r[0]=r[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=NT(e)??ql();return c.length===0&&c.push({colno:l,filename:d,function:Xn,in_app:!0,lineno:u}),t}function Uh(t){ta&&A.log(`Global Handler attached: ${t}`)}function kg(){return xe()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function NT(t){if(!(!Vt(t)||t.length===0))return t.startsWith("data:")?`<${AE(t,!1)}>`:t}const PT=()=>({name:"HttpContext",preprocessEvent(t){if(!me.navigator&&!me.location&&!me.document)return;const e=hC(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),LT="cause",OT=5,DT="LinkedErrors",MT=((t={})=>{const e=t.limit||OT,n=t.key||LT;return{name:DT,preprocessEvent(s,i,r){const o=r.getOptions();GE(Zl,o.stackParser,n,e,s,i)}}}),xT=MT;function FT(){return UT()?(ta&&ni(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function UT(){if(typeof me.window>"u")return!1;const t=me;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=ql(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(me===me.top&&s.some(r=>n.startsWith(`${r}://`)))}function $T(t){return[$E(),ME(),gT(),iT(),TT(),xT(),ZE(),PT(),bT()]}function BT(t={}){const e=!t.skipBrowserExtensionCheck&&FT();let n=t.defaultIntegrations==null?$T():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:ov(t.stackParser||tT),integrations:sE({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||HC};return kE(TC,s)}const HT="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";BT({dsn:HT,sendDefaultPii:!0});/**
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
 */const jT=()=>{};var $h={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _=function(t,e){if(!t)throw ri(e)},ri=function(t){return new Error("Firebase Database ("+Rg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ag=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},VT=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const i=t[n++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=t[n++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=t[n++],o=t[n++],a=t[n++],c=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const r=t[n++],o=t[n++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},na={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<t.length;i+=3){const r=t[i],o=i+1<t.length,a=o?t[i+1]:0,c=i+2<t.length,l=c?t[i+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Ag(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):VT(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<t.length;){const r=n[t.charAt(i++)],a=i<t.length?n[t.charAt(i)]:0;++i;const l=i<t.length?n[t.charAt(i)]:64;++i;const d=i<t.length?n[t.charAt(i)]:64;if(++i,r==null||a==null||l==null||d==null)throw new WT;const h=r<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class WT extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ng=function(t){const e=Ag(t);return na.encodeByteArray(e,!0)},po=function(t){return Ng(t).replace(/\./g,"")},go=function(t){try{return na.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qT(t){return Pg(void 0,t)}function Pg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!zT(n)||(t[n]=Pg(t[n],e[n]));return t}function zT(t){return t!=="__proto__"}/**
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
 */function Lg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const GT=()=>Lg().__FIREBASE_DEFAULTS__,KT=()=>{if(typeof process>"u"||typeof $h>"u")return;const t=$h.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},YT=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&go(t[1]);return e&&JSON.parse(e)},nu=()=>{try{return jT()||GT()||KT()||YT()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Og=t=>nu()?.emulatorHosts?.[t],JT=t=>{const e=Og(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Dg=()=>nu()?.config,Mg=t=>nu()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function oi(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function xg(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function XT(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",i=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...t};return[po(JSON.stringify(n)),po(JSON.stringify(o)),""].join(".")}const Ni={};function QT(){const t={prod:[],emulator:[]};for(const e of Object.keys(Ni))Ni[e]?t.emulator.push(e):t.prod.push(e);return t}function ZT(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let Bh=!1;function Fg(t,e){if(typeof window>"u"||typeof document>"u"||!oi(window.location.host)||Ni[t]===e||Ni[t]||Bh)return;Ni[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",r=QT().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{Bh=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=ZT(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),m=n("learnmore"),g=document.getElementById(m)||document.createElement("a"),T=n("preprendIcon"),B=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const N=h.element;a(N),u(g,m);const w=l();c(B,T),N.append(B,p,g,w),document.body.appendChild(N)}r?(p.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function Ve(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function su(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ve())}function eS(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function tS(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ug(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function nS(){const t=Ve();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function sS(){return Rg.NODE_ADMIN===!0}function sa(){try{return typeof indexedDB=="object"}catch{return!1}}function $g(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(n){e(n)}})}function iS(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rS="FirebaseError";class en extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=rS,Object.setPrototypeOf(this,en.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Dn.prototype.create)}}class Dn{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?oS(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new en(i,a,s)}}function oS(t,e){return t.replace(aS,(n,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const aS=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(t){return JSON.parse(t)}function ve(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bg=function(t){let e={},n={},s={},i="";try{const r=t.split(".");e=Yi(go(r[0])||""),n=Yi(go(r[1])||""),i=r[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:i}},cS=function(t){const e=Bg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},lS=function(t){const e=Bg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Ws(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function mo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function _o(t,e,n){const s={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(s[i]=e.call(n,t[i],i,t));return s}function Zn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const i of n){if(!s.includes(i))return!1;const r=t[i],o=e[i];if(Hh(r)&&Hh(o)){if(!Zn(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!n.includes(i))return!1;return!0}function Hh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uS{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(i<<5|i>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=h}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<n;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function dS(t,e){const n=new hS(t,e);return n.subscribe.bind(n)}class hS{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let i;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");fS(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:s},i.next===void 0&&(i.next=nc),i.error===void 0&&(i.error=nc),i.complete===void 0&&(i.complete=nc);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fS(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function nc(){}function qs(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pS=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let i=t.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,_(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},ia=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
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
 */const gS=1e3,mS=2,_S=14400*1e3,yS=.5;function wS(t,e=gS,n=mS){const s=e*Math.pow(n,t),i=Math.round(yS*s*(Math.random()-.5)*2);return Math.min(_S,s+i)}/**
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
 */function ae(t){return t&&t._delegate?t._delegate:t}class et{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const $n="[DEFAULT]";/**
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
 */class vS{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new qe;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ES(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(s)??new Set;i.add(e),this.onInitCallbacks.set(s,i);const r=this.instances.get(s);return r&&e(r,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const i of s)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:bS(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function bS(t){return t===$n?void 0:t}function ES(t){return t.instantiationMode==="EAGER"}/**
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
 */class CS{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new vS(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Y||(Y={}));const TS={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},SS=Y.INFO,IS={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},kS=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),i=IS[e];if(i)console[i](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ra{constructor(e){this.name=e,this._logLevel=SS,this._logHandler=kS,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?TS[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const RS=(t,e)=>e.some(n=>t instanceof n);let jh,Vh;function AS(){return jh||(jh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function NS(){return Vh||(Vh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Hg=new WeakMap,Yc=new WeakMap,jg=new WeakMap,sc=new WeakMap,iu=new WeakMap;function PS(t){const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(qt(t.result)),i()},o=()=>{s(t.error),i()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Hg.set(n,t)}).catch(()=>{}),iu.set(e,t),e}function LS(t){if(Yc.has(t))return;const e=new Promise((n,s)=>{const i=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),i()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});Yc.set(t,e)}let Jc={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Yc.get(t);if(e==="objectStoreNames")return t.objectStoreNames||jg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return qt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function OS(t){Jc=t(Jc)}function DS(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(ic(this),e,...n);return jg.set(s,e.sort?e.sort():[e]),qt(s)}:NS().includes(t)?function(...e){return t.apply(ic(this),e),qt(Hg.get(this))}:function(...e){return qt(t.apply(ic(this),e))}}function MS(t){return typeof t=="function"?DS(t):(t instanceof IDBTransaction&&LS(t),RS(t,AS())?new Proxy(t,Jc):t)}function qt(t){if(t instanceof IDBRequest)return PS(t);if(sc.has(t))return sc.get(t);const e=MS(t);return e!==t&&(sc.set(t,e),iu.set(e,t)),e}const ic=t=>iu.get(t);function oa(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(t,e),a=qt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(qt(o.result),c.oldVersion,c.newVersion,qt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),i&&c.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}function rc(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",s=>e(s.oldVersion,s)),qt(n).then(()=>{})}const xS=["get","getKey","getAll","getAllKeys","count"],FS=["put","add","delete","clear"],oc=new Map;function Wh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(oc.get(e))return oc.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=FS.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(i||xS.includes(n)))return;const r=async function(o,...a){const c=this.transaction(o,i?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),i&&c.done]))[0]};return oc.set(e,r),r}OS(t=>({...t,get:(e,n,s)=>Wh(e,n)||t.get(e,n,s),has:(e,n)=>!!Wh(e,n)||t.has(e,n)}));/**
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
 */class US{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if($S(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function $S(t){return t.getComponent()?.type==="VERSION"}const Xc="@firebase/app",qh="0.14.7";/**
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
 */const Kt=new ra("@firebase/app"),BS="@firebase/app-compat",HS="@firebase/analytics-compat",jS="@firebase/analytics",VS="@firebase/app-check-compat",WS="@firebase/app-check",qS="@firebase/auth",zS="@firebase/auth-compat",GS="@firebase/database",KS="@firebase/data-connect",YS="@firebase/database-compat",JS="@firebase/functions",XS="@firebase/functions-compat",QS="@firebase/installations",ZS="@firebase/installations-compat",eI="@firebase/messaging",tI="@firebase/messaging-compat",nI="@firebase/performance",sI="@firebase/performance-compat",iI="@firebase/remote-config",rI="@firebase/remote-config-compat",oI="@firebase/storage",aI="@firebase/storage-compat",cI="@firebase/firestore",lI="@firebase/ai",uI="@firebase/firestore-compat",dI="firebase",hI="12.8.0";/**
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
 */const Qc="[DEFAULT]",fI={[Xc]:"fire-core",[BS]:"fire-core-compat",[jS]:"fire-analytics",[HS]:"fire-analytics-compat",[WS]:"fire-app-check",[VS]:"fire-app-check-compat",[qS]:"fire-auth",[zS]:"fire-auth-compat",[GS]:"fire-rtdb",[KS]:"fire-data-connect",[YS]:"fire-rtdb-compat",[JS]:"fire-fn",[XS]:"fire-fn-compat",[QS]:"fire-iid",[ZS]:"fire-iid-compat",[eI]:"fire-fcm",[tI]:"fire-fcm-compat",[nI]:"fire-perf",[sI]:"fire-perf-compat",[iI]:"fire-rc",[rI]:"fire-rc-compat",[oI]:"fire-gcs",[aI]:"fire-gcs-compat",[cI]:"fire-fst",[uI]:"fire-fst-compat",[lI]:"fire-vertex","fire-js":"fire-js",[dI]:"fire-js-all"};/**
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
 */const yo=new Map,pI=new Map,Zc=new Map;function zh(t,e){try{t.container.addComponent(e)}catch(n){Kt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ct(t){const e=t.name;if(Zc.has(e))return Kt.debug(`There were multiple attempts to register component ${e}.`),!1;Zc.set(e,t);for(const n of yo.values())zh(n,t);for(const n of pI.values())zh(n,t);return!0}function Mn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function ut(t){return t==null?!1:t.settings!==void 0}/**
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
 */const gI={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},yn=new Dn("app","Firebase",gI);/**
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
 */class mI{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new et("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw yn.create("app-deleted",{appName:this._name})}}/**
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
 */const ci=hI;function Vg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:Qc,automaticDataCollectionEnabled:!0,...e},i=s.name;if(typeof i!="string"||!i)throw yn.create("bad-app-name",{appName:String(i)});if(n||(n=Dg()),!n)throw yn.create("no-options");const r=yo.get(i);if(r){if(Zn(n,r.options)&&Zn(s,r.config))return r;throw yn.create("duplicate-app",{appName:i})}const o=new CS(i);for(const c of Zc.values())o.addComponent(c);const a=new mI(n,s,o);return yo.set(i,a),a}function aa(t=Qc){const e=yo.get(t);if(!e&&t===Qc&&Dg())return Vg();if(!e)throw yn.create("no-app",{appName:t});return e}function Qe(t,e,n){let s=fI[t]??t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),r=e.match(/\s|\//);if(i||r){const o=[`Unable to register library "${s}" with version "${e}":`];i&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Kt.warn(o.join(" "));return}ct(new et(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const _I="firebase-heartbeat-database",yI=1,Ji="firebase-heartbeat-store";let ac=null;function Wg(){return ac||(ac=oa(_I,yI,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ji)}catch(n){console.warn(n)}}}}).catch(t=>{throw yn.create("idb-open",{originalErrorMessage:t.message})})),ac}async function wI(t){try{const n=(await Wg()).transaction(Ji),s=await n.objectStore(Ji).get(qg(t));return await n.done,s}catch(e){if(e instanceof en)Kt.warn(e.message);else{const n=yn.create("idb-get",{originalErrorMessage:e?.message});Kt.warn(n.message)}}}async function Gh(t,e){try{const s=(await Wg()).transaction(Ji,"readwrite");await s.objectStore(Ji).put(e,qg(t)),await s.done}catch(n){if(n instanceof en)Kt.warn(n.message);else{const s=yn.create("idb-set",{originalErrorMessage:n?.message});Kt.warn(s.message)}}}function qg(t){return`${t.name}!${t.options.appId}`}/**
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
 */const vI=1024,bI=30;class EI{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new TI(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Kh();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>bI){const i=SI(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Kt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Kh(),{heartbeatsToSend:n,unsentEntries:s}=CI(this._heartbeatsCache.heartbeats),i=po(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Kt.warn(e),""}}}function Kh(){return new Date().toISOString().substring(0,10)}function CI(t,e=vI){const n=[];let s=t.slice();for(const i of t){const r=n.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),Yh(n)>e){r.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Yh(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class TI{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return sa()?$g().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await wI(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Gh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Gh(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Yh(t){return po(JSON.stringify({version:2,heartbeats:t})).length}function SI(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
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
 */function II(t){ct(new et("platform-logger",e=>new US(e),"PRIVATE")),ct(new et("heartbeat",e=>new EI(e),"PRIVATE")),Qe(Xc,qh,t),Qe(Xc,qh,"esm2020"),Qe("fire-js","")}II("");var Jh={};const Xh="@firebase/database",Qh="1.1.0";/**
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
 */let zg="";function Gg(t){zg=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kI{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ve(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Yi(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return Dt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new kI(e)}}catch{}return new RI},Vn=Kg("localStorage"),AI=Kg("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=new ra("@firebase/database"),NI=(function(){let t=1;return function(){return t++}})(),Yg=function(t){const e=pS(t),n=new uS;n.update(e);const s=n.digest();return na.encodeByteArray(s)},br=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=br.apply(null,s):typeof s=="object"?e+=ve(s):e+=s,e+=" "}return e};let Pi=null,Zh=!0;const PI=function(t,e){_(!0,"Can't turn on custom loggers persistently."),ks.logLevel=Y.VERBOSE,Pi=ks.log.bind(ks)},Te=function(...t){if(Zh===!0&&(Zh=!1,Pi===null&&AI.get("logging_enabled")===!0&&PI()),Pi){const e=br.apply(null,t);Pi(e)}},Er=function(t){return function(...e){Te(t,...e)}},el=function(...t){const e="FIREBASE INTERNAL ERROR: "+br(...t);ks.error(e)},Yt=function(...t){const e=`FIREBASE FATAL ERROR: ${br(...t)}`;throw ks.error(e),new Error(e)},je=function(...t){const e="FIREBASE WARNING: "+br(...t);ks.warn(e)},LI=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&je("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ca=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},OI=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},zs="[MIN_NAME]",es="[MAX_NAME]",ps=function(t,e){if(t===e)return 0;if(t===zs||e===es)return-1;if(e===zs||t===es)return 1;{const n=ef(t),s=ef(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},DI=function(t,e){return t===e?0:t<e?-1:1},wi=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ve(e))},ru=function(t){if(typeof t!="object"||t===null)return ve(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ve(e[s]),n+=":",n+=ru(t[e[s]]);return n+="}",n},Jg=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let i=0;i<n;i+=e)i+e>n?s.push(t.substring(i,n)):s.push(t.substring(i,i+e));return s};function ke(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Xg=function(t){_(!ca(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let i,r,o,a,c;t===0?(r=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),r=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(i?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},MI=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},xI=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function FI(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const UI=new RegExp("^-?(0*)\\d{1,10}$"),$I=-2147483648,BI=2147483647,ef=function(t){if(UI.test(t)){const e=Number(t);if(e>=$I&&e<=BI)return e}return null},li=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw je("Exception was thrown by user callback.",n),e},Math.floor(0))}},HI=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Li=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class jI{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,ut(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){je(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VI{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(Te("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',je(e)}}class eo{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}eo.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="5",Qg="v",Zg="s",em="r",tm="f",nm=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,sm="ls",im="p",tl="ac",rm="websocket",om="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class am{constructor(e,n,s,i,r=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Vn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Vn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function WI(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function cm(t,e,n){_(typeof e=="string","typeof type must == string"),_(typeof n=="object","typeof params must == object");let s;if(e===rm)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===om)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);WI(t)&&(n.ns=t.namespace);const i=[];return ke(n,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(){this.counters_={}}incrementCounter(e,n=1){Dt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return qT(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc={},lc={};function au(t){const e=t.toString();return cc[e]||(cc[e]=new qI),cc[e]}function zI(t,e){const n=t.toString();return lc[n]||(lc[n]=e()),lc[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GI{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&li(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf="start",KI="close",YI="pLPCommand",JI="pRTLPCB",lm="id",um="pw",dm="ser",XI="cb",QI="seg",ZI="ts",ek="d",tk="dframe",hm=1870,fm=30,nk=hm-fm,sk=25e3,ik=3e4;class Ts{constructor(e,n,s,i,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Er(e),this.stats_=au(n),this.urlFn=c=>(this.appCheckToken&&(c[tl]=this.appCheckToken),cm(n,om,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new GI(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(ik)),OI(()=>{if(this.isClosed_)return;this.scriptTagHolder=new cu((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===tf)this.id=a,this.password=c;else if(o===KI)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[tf]="t",s[dm]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[XI]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Qg]=ou,this.transportSessionId&&(s[Zg]=this.transportSessionId),this.lastSessionId&&(s[sm]=this.lastSessionId),this.applicationId&&(s[im]=this.applicationId),this.appCheckToken&&(s[tl]=this.appCheckToken),typeof location<"u"&&location.hostname&&nm.test(location.hostname)&&(s[em]=tm);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ts.forceAllow_=!0}static forceDisallow(){Ts.forceDisallow_=!0}static isAvailable(){return Ts.forceAllow_?!0:!Ts.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!MI()&&!xI()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ve(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Ng(n),i=Jg(s,nk);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[tk]="t",s[lm]=e,s[um]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ve(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class cu{constructor(e,n,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=NI(),window[YI+this.uniqueCallbackIdentifier]=e,window[JI+this.uniqueCallbackIdentifier]=n,this.myIFrame=cu.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){Te("frame writing exception"),a.stack&&Te(a.stack),Te(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Te("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[lm]=this.myID,e[um]=this.myPW,e[dm]=this.currentSerial;let n=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+fm+s.length<=hm;){const o=this.pendingSegs.shift();s=s+"&"+QI+i+"="+o.seg+"&"+ZI+i+"="+o.ts+"&"+ek+i+"="+o.d,i++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(s,Math.floor(sk)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{Te("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rk=16384,ok=45e3;let wo=null;typeof MozWebSocket<"u"?wo=MozWebSocket:typeof WebSocket<"u"&&(wo=WebSocket);class dt{constructor(e,n,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Er(this.connId),this.stats_=au(n),this.connURL=dt.connectionURL_(n,o,a,i,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,i,r){const o={};return o[Qg]=ou,typeof location<"u"&&location.hostname&&nm.test(location.hostname)&&(o[em]=tm),n&&(o[Zg]=n),s&&(o[sm]=s),i&&(o[tl]=i),r&&(o[im]=r),cm(e,rm,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Vn.set("previous_websocket_failure",!0);try{let s;sS(),this.mySock=new wo(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){dt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&wo!==null&&!dt.forceDisallow_}static previouslyFailed(){return Vn.isInMemoryStorage||Vn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Vn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=Yi(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(_(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ve(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Jg(n,rk);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ok))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}dt.responsesRequiredToBeHealthy=2;dt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{static get ALL_TRANSPORTS(){return[Ts,dt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=dt&&dt.isAvailable();let s=n&&!dt.previouslyFailed();if(e.webSocketOnly&&(n||je("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[dt];else{const i=this.transports_=[];for(const r of Xi.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Xi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Xi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ak=6e4,ck=5e3,lk=10*1024,uk=100*1024,uc="t",nf="d",dk="s",sf="r",hk="e",rf="o",of="a",af="n",cf="p",fk="h";class pk{constructor(e,n,s,i,r,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Er("c:"+this.id+":"),this.transportManager_=new Xi(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Li(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>uk?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>lk?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(uc in e){const n=e[uc];n===of?this.upgradeIfSecondaryHealthy_():n===sf?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===rf&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=wi("t",e),s=wi("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:cf,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:of,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:af,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=wi("t",e),s=wi("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=wi(uc,e);if(nf in e){const s=e[nf];if(n===fk){const i={...s};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===af){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===dk?this.onConnectionShutdown_(s):n===sf?this.onReset_(s):n===hk?el("Server Error: "+s):n===rf?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):el("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),ou!==s&&je("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),Li(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ak))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Li(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(ck))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:cf,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Vn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{put(e,n,s,i){}merge(e,n,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(e){this.allowedEvents_=e,this.listeners_={},_(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const i=this.getInitialEvent(e);i&&n.apply(s,i)}off(e,n,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===n&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){_(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo extends gm{static getInstance(){return new vo}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!su()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return _(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lf=32,uf=768;class K{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function V(){return new K("")}function x(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function In(t){return t.pieces_.length-t.pieceNum_}function Z(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new K(t.pieces_,e)}function lu(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function gk(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function Qi(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function mm(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new K(e,0)}function re(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof K)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&n.push(s[i])}return new K(n,0)}function U(t){return t.pieceNum_>=t.pieces_.length}function $e(t,e){const n=x(t),s=x(e);if(n===null)return e;if(n===s)return $e(Z(t),Z(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function mk(t,e){const n=Qi(t,0),s=Qi(e,0);for(let i=0;i<n.length&&i<s.length;i++){const r=ps(n[i],s[i]);if(r!==0)return r}return n.length===s.length?0:n.length<s.length?-1:1}function uu(t,e){if(In(t)!==In(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function it(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(In(t)>In(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class _k{constructor(e,n){this.errorPrefix_=n,this.parts_=Qi(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=ia(this.parts_[s]);_m(this)}}function yk(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=ia(e),_m(t)}function wk(t){const e=t.parts_.pop();t.byteLength_-=ia(e),t.parts_.length>0&&(t.byteLength_-=1)}function _m(t){if(t.byteLength_>uf)throw new Error(t.errorPrefix_+"has a key path longer than "+uf+" bytes ("+t.byteLength_+").");if(t.parts_.length>lf)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+lf+") or object contains a cycle "+Bn(t))}function Bn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du extends gm{static getInstance(){return new du}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return _(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi=1e3,vk=300*1e3,df=30*1e3,bk=1.3,Ek=3e4,Ck="server_kill",hf=3;class zt extends pm{constructor(e,n,s,i,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=zt.nextPersistentConnectionId_++,this.log_=Er("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=vi,this.maxReconnectDelay_=vk,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");du.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&vo.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const i=++this.requestNumber_,r={r:i,a:e,b:n};this.log_(ve(r)),_(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const n=new qe,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),_(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:n,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;zt.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&Dt(e,"w")){const s=Ws(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();je(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||lS(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=df)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=cS(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),_(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,n)}sendUnlisten_(e,n,s,i){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,i){const r={p:n,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,s,i){this.putInternal("p",e,n,s,i)}merge(e,n,s,i){this.putInternal("m",e,n,s,i)}putInternal(e,n,s,i,r){this.initConnection_();const o={p:n,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ve(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):el("Unrecognized action received from server: "+ve(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){_(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ek&&(this.reconnectDelay_=vi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*bk)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+zt.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){_(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?Te("getToken() completed but was canceled"):(Te("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new pk(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{je(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Ck)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&je(d),c())}}}interrupt(e){Te("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Te("Resuming connection for reason: "+e),delete this.interruptReasons_[e],mo(this.interruptReasons_)&&(this.reconnectDelay_=vi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(r=>ru(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const s=new K(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(n),r.delete(n),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,n){Te("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=hf&&(this.reconnectDelay_=df,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){Te("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=hf&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+zg.replace(/\./g,"-")]=1,su()?e["framework.cordova"]=1:Ug()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=vo.getInstance().currentlyOnline();return mo(this.interruptReasons_)&&e}}zt.nextPersistentConnectionId_=0;zt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new $(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new $(zs,e),i=new $(zs,n);return this.compare(s,i)!==0}minPost(){return $.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Hr;class ym extends la{static get __EMPTY_NODE(){return Hr}static set __EMPTY_NODE(e){Hr=e}compare(e,n){return ps(e.name,n.name)}isDefinedOn(e){throw ri("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return $.MIN}maxPost(){return new $(es,Hr)}makePost(e,n){return _(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,Hr)}toString(){return".key"}}const Rs=new ym;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,n,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ce{constructor(e,n,s,i,r){this.key=e,this.value=n,this.color=s??Ce.RED,this.left=i??ze.EMPTY_NODE,this.right=r??ze.EMPTY_NODE}copy(e,n,s,i,r){return new Ce(e??this.key,n??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,n,s),null):r===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return ze.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,i;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return ze.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ce.RED=!0;Ce.BLACK=!1;class Tk{copy(e,n,s,i,r){return this}insert(e,n,s){return new Ce(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ze{constructor(e,n=ze.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ze(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Ce.BLACK,null,null))}remove(e){return new ze(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ce.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,i=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new jr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new jr(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new jr(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new jr(this.root_,null,this.comparator_,!0,e)}}ze.EMPTY_NODE=new Tk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sk(t,e){return ps(t.name,e.name)}function hu(t,e){return ps(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nl;function Ik(t){nl=t}const wm=function(t){return typeof t=="number"?"number:"+Xg(t):"string:"+t},vm=function(t){if(t.isLeafNode()){const e=t.val();_(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Dt(e,".sv"),"Priority must be a string or number.")}else _(t===nl||t.isEmpty(),"priority of unexpected type.");_(t===nl||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ff;class Ee{static set __childrenNodeConstructor(e){ff=e}static get __childrenNodeConstructor(){return ff}constructor(e,n=Ee.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,_(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),vm(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ee(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ee.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return U(e)?this:x(e)===".priority"?this.priorityNode_:Ee.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:Ee.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=x(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(_(s!==".priority"||In(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,Ee.__childrenNodeConstructor.EMPTY_NODE.updateChild(Z(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+wm(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Xg(this.value_):e+=this.value_,this.lazyHash_=Yg(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ee.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ee.__childrenNodeConstructor?-1:(_(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,i=Ee.VALUE_TYPE_ORDER.indexOf(n),r=Ee.VALUE_TYPE_ORDER.indexOf(s);return _(i>=0,"Unknown leaf type: "+n),_(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}Ee.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bm,Em;function kk(t){bm=t}function Rk(t){Em=t}class Ak extends la{compare(e,n){const s=e.node.getPriority(),i=n.node.getPriority(),r=s.compareTo(i);return r===0?ps(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return $.MIN}maxPost(){return new $(es,new Ee("[PRIORITY-POST]",Em))}makePost(e,n){const s=bm(e);return new $(n,new Ee("[PRIORITY-POST]",s))}toString(){return".priority"}}const oe=new Ak;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nk=Math.log(2);class Pk{constructor(e){const n=r=>parseInt(Math.log(r)/Nk,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const bo=function(t,e,n,s){t.sort(e);const i=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new Ce(h,d.node,Ce.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=i(c,f),m=i(f+1,l);return d=t[f],h=n?n(d):d,new Ce(h,d.node,Ce.BLACK,p,m)}},r=function(c){let l=null,u=null,d=t.length;const h=function(p,m){const g=d-p,T=d;d-=p;const B=i(g+1,T),N=t[g],w=n?n(N):N;f(new Ce(w,N.node,m,null,B))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const m=c.nextBitIsOne(),g=Math.pow(2,c.count-(p+1));m?h(g,Ce.BLACK):(h(g,Ce.BLACK),h(g,Ce.RED))}return u},o=new Pk(t.length),a=r(o);return new ze(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dc;const vs={};class Ut{static get Default(){return _(vs&&oe,"ChildrenNode.ts has not been loaded"),dc=dc||new Ut({".priority":vs},{".priority":oe}),dc}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Ws(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ze?n:null}hasIndex(e){return Dt(this.indexSet_,e.toString())}addIndex(e,n){_(e!==Rs,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=n.getIterator($.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=bo(s,e.getCompare()):a=vs;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Ut(u,l)}addToIndexes(e,n){const s=_o(this.indexes_,(i,r)=>{const o=Ws(this.indexSet_,r);if(_(o,"Missing index implementation for "+r),i===vs)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator($.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),bo(a,o.getCompare())}else return vs;else{const a=n.get(e.name);let c=i;return a&&(c=c.remove(new $(e.name,a))),c.insert(e,e.node)}});return new Ut(s,this.indexSet_)}removeFromIndexes(e,n){const s=_o(this.indexes_,i=>{if(i===vs)return i;{const r=n.get(e.name);return r?i.remove(new $(e.name,r)):i}});return new Ut(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bi;class k{static get EMPTY_NODE(){return bi||(bi=new k(new ze(hu),null,Ut.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&vm(this.priorityNode_),this.children_.isEmpty()&&_(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||bi}updatePriority(e){return this.children_.isEmpty()?this:new k(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?bi:n}}getChild(e){const n=x(e);return n===null?this:this.getImmediateChild(n).getChild(Z(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(_(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new $(e,n);let i,r;n.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?bi:this.priorityNode_;return new k(i,o,r)}}updateChild(e,n){const s=x(e);if(s===null)return n;{_(x(e)!==".priority"||In(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(Z(e),n);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,i=0,r=!0;if(this.forEachChild(oe,(o,a)=>{n[o]=a.val(e),s++,r&&k.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+wm(this.getPriority().val())+":"),this.forEachChild(oe,(n,s)=>{const i=s.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":Yg(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new $(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new $(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new $(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&n.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Cr?-1:0}withIndex(e){if(e===Rs||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new k(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Rs||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(oe),i=n.getIterator(oe);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Rs?null:this.indexMap_.get(e.toString())}}k.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Lk extends k{constructor(){super(new ze(hu),k.EMPTY_NODE,Ut.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return k.EMPTY_NODE}isEmpty(){return!1}}const Cr=new Lk;Object.defineProperties($,{MIN:{value:new $(zs,k.EMPTY_NODE)},MAX:{value:new $(es,Cr)}});ym.__EMPTY_NODE=k.EMPTY_NODE;Ee.__childrenNodeConstructor=k;Ik(Cr);Rk(Cr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ok=!0;function ue(t,e=null){if(t===null)return k.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),_(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new Ee(n,ue(e))}if(!(t instanceof Array)&&Ok){const n=[];let s=!1;if(ke(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=ue(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new $(o,c)))}}),n.length===0)return k.EMPTY_NODE;const r=bo(n,Sk,o=>o.name,hu);if(s){const o=bo(n,oe.getCompare());return new k(r,ue(e),new Ut({".priority":o},{".priority":oe}))}else return new k(r,ue(e),Ut.Default)}else{let n=k.EMPTY_NODE;return ke(t,(s,i)=>{if(Dt(t,s)&&s.substring(0,1)!=="."){const r=ue(i);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(s,r))}}),n.updatePriority(ue(e))}}kk(ue);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dk extends la{constructor(e){super(),this.indexPath_=e,_(!U(e)&&x(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),i=this.extractChild(n.node),r=s.compareTo(i);return r===0?ps(e.name,n.name):r}makePost(e,n){const s=ue(e),i=k.EMPTY_NODE.updateChild(this.indexPath_,s);return new $(n,i)}maxPost(){const e=k.EMPTY_NODE.updateChild(this.indexPath_,Cr);return new $(es,e)}toString(){return Qi(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mk extends la{compare(e,n){const s=e.node.compareTo(n.node);return s===0?ps(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,n){const s=ue(e);return new $(n,s)}toString(){return".value"}}const xk=new Mk;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cm(t){return{type:"value",snapshotNode:t}}function Gs(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Zi(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function er(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function Fk(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e){this.index_=e}updateChild(e,n,s,i,r,o){_(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(Zi(n,a)):_(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Gs(n,s)):o.trackChildChange(er(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(oe,(i,r)=>{n.hasChild(i)||s.trackChildChange(Zi(i,r))}),n.isLeafNode()||n.forEachChild(oe,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(er(i,r,o))}else s.trackChildChange(Gs(i,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?k.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e){this.indexedFilter_=new fu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=tr.getStartPost_(e),this.endPost_=tr.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,i,r,o){return this.matches(new $(n,s))||(s=k.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,i,r,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=k.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(k.EMPTY_NODE);const r=this;return n.forEachChild(oe,(o,a)=>{r.matches(new $(o,a))||(i=i.updateImmediateChild(o,k.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uk{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new tr(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,i,r,o){return this.rangedFilter_.matches(new $(n,s))||(s=k.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,i,r,o):this.fullLimitUpdateChild_(e,n,s,r,o)}updateFullNode(e,n,s){let i;if(n.isLeafNode()||n.isEmpty())i=k.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=k.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(k.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,k.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,i,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;_(a.numChildren()===this.limit_,"");const c=new $(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=i.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=i.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return r?.trackChildChange(er(n,s,d)),a.updateImmediateChild(n,s);{r?.trackChildChange(Zi(n,d));const m=a.updateImmediateChild(n,k.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Gs(h.name,h.node)),m.updateImmediateChild(h.name,h.node)):m}}else return s.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Zi(l.name,l.node)),r.trackChildChange(Gs(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,k.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=oe}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return _(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return _(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:zs}hasEnd(){return this.endSet_}getIndexEndValue(){return _(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return _(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:es}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return _(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===oe}copy(){const e=new ua;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function $k(t){return t.loadsAllData()?new fu(t.getIndex()):t.hasLimit()?new Uk(t):new tr(t)}function pf(t){const e={};if(t.isDefault())return e;let n;if(t.index_===oe?n="$priority":t.index_===xk?n="$value":t.index_===Rs?n="$key":(_(t.index_ instanceof Dk,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ve(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ve(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ve(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ve(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ve(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function gf(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==oe&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo extends pm{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(_(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Er("p:rest:"),this.listens_={}}listen(e,n,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Eo.getListenId_(e,s),a={};this.listens_[o]=a;const c=pf(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,s),Ws(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",i(h,null)}})}unlisten(e,n){const s=Eo.getListenId_(e,n);delete this.listens_[s]}get(e){const n=pf(e._queryParams),s=e._path.toString(),i=new qe;return this.restRequest_(s+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(n.auth=i.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ai(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Yi(a.responseText)}catch{je("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&je("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bk{constructor(){this.rootNode_=k.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(){return{value:null,children:new Map}}function ui(t,e,n){if(U(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=x(e);t.children.has(s)||t.children.set(s,Co());const i=t.children.get(s);e=Z(e),ui(i,e,n)}}function sl(t,e){if(U(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(oe,(s,i)=>{ui(t,new K(s),i)}),sl(t,e)}}else if(t.children.size>0){const n=x(e);return e=Z(e),t.children.has(n)&&sl(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function il(t,e,n){t.value!==null?n(e,t.value):Hk(t,(s,i)=>{const r=new K(e.toString()+"/"+s);il(i,r,n)})}function Hk(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jk{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ke(this.last_,(s,i)=>{n[s]=n[s]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf=10*1e3,Vk=30*1e3,Wk=300*1e3;class qk{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new jk(e);const s=mf+(Vk-mf)*Math.random();Li(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;ke(e,(i,r)=>{r>0&&Dt(this.statsToReport_,i)&&(n[i]=r,s=!0)}),s&&this.server_.reportStats(n),Li(this.reportStats_.bind(this),Math.floor(Math.random()*2*Wk))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ht;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ht||(ht={}));function pu(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function gu(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function mu(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=ht.ACK_USER_WRITE,this.source=pu()}operationForChild(e){if(U(this.path)){if(this.affectedTree.value!=null)return _(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new K(e));return new To(V(),n,this.revert)}}else return _(x(this.path)===e,"operationForChild called for unrelated child."),new To(Z(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{constructor(e,n){this.source=e,this.path=n,this.type=ht.LISTEN_COMPLETE}operationForChild(e){return U(this.path)?new nr(this.source,V()):new nr(this.source,Z(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=ht.OVERWRITE}operationForChild(e){return U(this.path)?new ts(this.source,V(),this.snap.getImmediateChild(e)):new ts(this.source,Z(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=ht.MERGE}operationForChild(e){if(U(this.path)){const n=this.children.subtree(new K(e));return n.isEmpty()?null:n.value?new ts(this.source,V(),n.value):new Ks(this.source,V(),n)}else return _(x(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ks(this.source,Z(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(U(e))return this.isFullyInitialized()&&!this.filtered_;const n=x(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zk{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Gk(t,e,n,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Fk(o.childName,o.snapshotNode))}),Ei(t,i,"child_removed",e,s,n),Ei(t,i,"child_added",e,s,n),Ei(t,i,"child_moved",r,s,n),Ei(t,i,"child_changed",e,s,n),Ei(t,i,"value",e,s,n),i}function Ei(t,e,n,s,i,r){const o=s.filter(a=>a.type===n);o.sort((a,c)=>Yk(t,a,c)),o.forEach(a=>{const c=Kk(t,a,r);i.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function Kk(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Yk(t,e,n){if(e.childName==null||n.childName==null)throw ri("Should only compare child_ events.");const s=new $(e.childName,e.snapshotNode),i=new $(n.childName,n.snapshotNode);return t.index_.compare(s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(t,e){return{eventCache:t,serverCache:e}}function Oi(t,e,n,s){return da(new kn(e,n,s),t.serverCache)}function Tm(t,e,n,s){return da(t.eventCache,new kn(e,n,s))}function So(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ns(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hc;const Jk=()=>(hc||(hc=new ze(DI)),hc);class ee{static fromObject(e){let n=new ee(null);return ke(e,(s,i)=>{n=n.set(new K(s),i)}),n}constructor(e,n=Jk()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:V(),value:this.value};if(U(e))return null;{const s=x(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(Z(e),n);return r!=null?{path:re(new K(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(U(e))return this;{const n=x(e),s=this.children.get(n);return s!==null?s.subtree(Z(e)):new ee(null)}}set(e,n){if(U(e))return new ee(n,this.children);{const s=x(e),r=(this.children.get(s)||new ee(null)).set(Z(e),n),o=this.children.insert(s,r);return new ee(this.value,o)}}remove(e){if(U(e))return this.children.isEmpty()?new ee(null):new ee(null,this.children);{const n=x(e),s=this.children.get(n);if(s){const i=s.remove(Z(e));let r;return i.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,i),this.value===null&&r.isEmpty()?new ee(null):new ee(this.value,r)}else return this}}get(e){if(U(e))return this.value;{const n=x(e),s=this.children.get(n);return s?s.get(Z(e)):null}}setTree(e,n){if(U(e))return n;{const s=x(e),r=(this.children.get(s)||new ee(null)).setTree(Z(e),n);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new ee(this.value,o)}}fold(e){return this.fold_(V(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(re(e,i),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,V(),n)}findOnPath_(e,n,s){const i=this.value?s(n,this.value):!1;if(i)return i;if(U(e))return null;{const r=x(e),o=this.children.get(r);return o?o.findOnPath_(Z(e),re(n,r),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,V(),n)}foreachOnPath_(e,n,s){if(U(e))return this;{this.value&&s(n,this.value);const i=x(e),r=this.children.get(i);return r?r.foreachOnPath_(Z(e),re(n,i),s):new ee(null)}}foreach(e){this.foreach_(V(),e)}foreach_(e,n){this.children.inorderTraversal((s,i)=>{i.foreach_(re(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.writeTree_=e}static empty(){return new _t(new ee(null))}}function Di(t,e,n){if(U(e))return new _t(new ee(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=$e(i,e);return r=r.updateChild(o,n),new _t(t.writeTree_.set(i,r))}else{const i=new ee(n),r=t.writeTree_.setTree(e,i);return new _t(r)}}}function rl(t,e,n){let s=t;return ke(n,(i,r)=>{s=Di(s,re(e,i),r)}),s}function _f(t,e){if(U(e))return _t.empty();{const n=t.writeTree_.setTree(e,new ee(null));return new _t(n)}}function ol(t,e){return gs(t,e)!=null}function gs(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild($e(n.path,e)):null}function yf(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(oe,(s,i)=>{e.push(new $(s,i))}):t.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new $(s,i.value))}),e}function wn(t,e){if(U(e))return t;{const n=gs(t,e);return n!=null?new _t(new ee(n)):new _t(t.writeTree_.subtree(e))}}function al(t){return t.writeTree_.isEmpty()}function Ys(t,e){return Sm(V(),t.writeTree_,e)}function Sm(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(_(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):n=Sm(re(t,i),r,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(re(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(t,e){return Am(e,t)}function Xk(t,e,n,s,i){_(s>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:i}),i&&(t.visibleWrites=Di(t.visibleWrites,e,n)),t.lastWriteId=s}function Qk(t,e,n,s){_(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=rl(t.visibleWrites,e,n),t.lastWriteId=s}function Zk(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function eR(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);_(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let i=s.visible,r=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&tR(a,s.path)?i=!1:it(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return nR(t),!0;if(s.snap)t.visibleWrites=_f(t.visibleWrites,s.path);else{const a=s.children;ke(a,c=>{t.visibleWrites=_f(t.visibleWrites,re(s.path,c))})}return!0}else return!1}function tR(t,e){if(t.snap)return it(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&it(re(t.path,n),e))return!0;return!1}function nR(t){t.visibleWrites=Im(t.allWrites,sR,V()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function sR(t){return t.visible}function Im(t,e,n){let s=_t.empty();for(let i=0;i<t.length;++i){const r=t[i];if(e(r)){const o=r.path;let a;if(r.snap)it(n,o)?(a=$e(n,o),s=Di(s,a,r.snap)):it(o,n)&&(a=$e(o,n),s=Di(s,V(),r.snap.getChild(a)));else if(r.children){if(it(n,o))a=$e(n,o),s=rl(s,a,r.children);else if(it(o,n))if(a=$e(o,n),U(a))s=rl(s,V(),r.children);else{const c=Ws(r.children,x(a));if(c){const l=c.getChild(Z(a));s=Di(s,V(),l)}}}else throw ri("WriteRecord should have .snap or .children")}}return s}function km(t,e,n,s,i){if(!s&&!i){const r=gs(t.visibleWrites,e);if(r!=null)return r;{const o=wn(t.visibleWrites,e);if(al(o))return n;if(n==null&&!ol(o,V()))return null;{const a=n||k.EMPTY_NODE;return Ys(o,a)}}}else{const r=wn(t.visibleWrites,e);if(!i&&al(r))return n;if(!i&&n==null&&!ol(r,V()))return null;{const o=function(l){return(l.visible||i)&&(!s||!~s.indexOf(l.writeId))&&(it(l.path,e)||it(e,l.path))},a=Im(t.allWrites,o,e),c=n||k.EMPTY_NODE;return Ys(a,c)}}}function iR(t,e,n){let s=k.EMPTY_NODE;const i=gs(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(oe,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(n){const r=wn(t.visibleWrites,e);return n.forEachChild(oe,(o,a)=>{const c=Ys(wn(r,new K(o)),a);s=s.updateImmediateChild(o,c)}),yf(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=wn(t.visibleWrites,e);return yf(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function rR(t,e,n,s,i){_(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=re(e,n);if(ol(t.visibleWrites,r))return null;{const o=wn(t.visibleWrites,r);return al(o)?i.getChild(n):Ys(o,i.getChild(n))}}function oR(t,e,n,s){const i=re(e,n),r=gs(t.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(n)){const o=wn(t.visibleWrites,i);return Ys(o,s.getNode().getImmediateChild(n))}else return null}function aR(t,e){return gs(t.visibleWrites,e)}function cR(t,e,n,s,i,r,o){let a;const c=wn(t.visibleWrites,e),l=gs(c,V());if(l!=null)a=l;else if(n!=null)a=Ys(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<i;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function lR(){return{visibleWrites:_t.empty(),allWrites:[],lastWriteId:-1}}function Io(t,e,n,s){return km(t.writeTree,t.treePath,e,n,s)}function _u(t,e){return iR(t.writeTree,t.treePath,e)}function wf(t,e,n,s){return rR(t.writeTree,t.treePath,e,n,s)}function ko(t,e){return aR(t.writeTree,re(t.treePath,e))}function uR(t,e,n,s,i,r){return cR(t.writeTree,t.treePath,e,n,s,i,r)}function yu(t,e,n){return oR(t.writeTree,t.treePath,e,n)}function Rm(t,e){return Am(re(t.treePath,e),t.writeTree)}function Am(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dR{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;_(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),_(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(s,er(s,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(s,Zi(s,i.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(s,Gs(s,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(s,er(s,e.snapshotNode,i.oldSnap));else throw ri("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const Nm=new hR;class wu{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new kn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return yu(this.writes_,e,s)}}getChildAfterChild(e,n,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ns(this.viewCache_),r=uR(this.writes_,i,n,1,s,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fR(t){return{filter:t}}function pR(t,e){_(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),_(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function gR(t,e,n,s,i){const r=new dR;let o,a;if(n.type===ht.OVERWRITE){const l=n;l.source.fromUser?o=cl(t,e,l.path,l.snap,s,i,r):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!U(l.path),o=Ro(t,e,l.path,l.snap,s,i,a,r))}else if(n.type===ht.MERGE){const l=n;l.source.fromUser?o=_R(t,e,l.path,l.children,s,i,r):(_(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=ll(t,e,l.path,l.children,s,i,a,r))}else if(n.type===ht.ACK_USER_WRITE){const l=n;l.revert?o=vR(t,e,l.path,s,i,r):o=yR(t,e,l.path,l.affectedTree,s,i,r)}else if(n.type===ht.LISTEN_COMPLETE)o=wR(t,e,n.path,s,r);else throw ri("Unknown operation type: "+n.type);const c=r.getChanges();return mR(e,o,c),{viewCache:o,changes:c}}function mR(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=So(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&n.push(Cm(So(e)))}}function Pm(t,e,n,s,i,r){const o=e.eventCache;if(ko(s,n)!=null)return e;{let a,c;if(U(n))if(_(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=ns(e),u=l instanceof k?l:k.EMPTY_NODE,d=_u(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Io(s,ns(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=x(n);if(l===".priority"){_(In(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=wf(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=Z(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=wf(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=yu(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,i,r):a=o.getNode()}}return Oi(e,a,o.isFullyInitialized()||U(n),t.filter.filtersNodes())}}function Ro(t,e,n,s,i,r,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(U(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=x(n);if(!c.isCompleteForPath(n)&&In(n)>1)return e;const p=Z(n),g=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),g):l=u.updateChild(c.getNode(),f,g,p,Nm,null)}const d=Tm(e,l,c.isFullyInitialized()||U(n),u.filtersNodes()),h=new wu(i,d,r);return Pm(t,d,n,i,h,a)}function cl(t,e,n,s,i,r,o){const a=e.eventCache;let c,l;const u=new wu(i,e,r);if(U(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=Oi(e,l,!0,t.filter.filtersNodes());else{const d=x(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=Oi(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=Z(n),f=a.getNode().getImmediateChild(d);let p;if(U(h))p=s;else{const m=u.getCompleteChild(d);m!=null?lu(h)===".priority"&&m.getChild(mm(h)).isEmpty()?p=m:p=m.updateChild(h,s):p=k.EMPTY_NODE}if(f.equals(p))c=e;else{const m=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Oi(e,m,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function vf(t,e){return t.eventCache.isCompleteForChild(e)}function _R(t,e,n,s,i,r,o){let a=e;return s.foreach((c,l)=>{const u=re(n,c);vf(e,x(u))&&(a=cl(t,a,u,l,i,r,o))}),s.foreach((c,l)=>{const u=re(n,c);vf(e,x(u))||(a=cl(t,a,u,l,i,r,o))}),a}function bf(t,e,n){return n.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function ll(t,e,n,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;U(n)?l=s:l=new ee(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=bf(t,f,h);c=Ro(t,c,new K(d),p,i,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),m=bf(t,p,h);c=Ro(t,c,new K(d),m,i,r,o,a)}}),c}function yR(t,e,n,s,i,r,o){if(ko(i,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(U(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return Ro(t,e,n,c.getNode().getChild(n),i,r,a,o);if(U(n)){let l=new ee(null);return c.getNode().forEachChild(Rs,(u,d)=>{l=l.set(new K(u),d)}),ll(t,e,n,l,i,r,a,o)}else return e}else{let l=new ee(null);return s.foreach((u,d)=>{const h=re(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),ll(t,e,n,l,i,r,a,o)}}function wR(t,e,n,s,i){const r=e.serverCache,o=Tm(e,r.getNode(),r.isFullyInitialized()||U(n),r.isFiltered());return Pm(t,o,n,s,Nm,i)}function vR(t,e,n,s,i,r){let o;if(ko(s,n)!=null)return e;{const a=new wu(s,e,i),c=e.eventCache.getNode();let l;if(U(n)||x(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Io(s,ns(e));else{const d=e.serverCache.getNode();_(d instanceof k,"serverChildren would be complete if leaf node"),u=_u(s,d)}u=u,l=t.filter.updateFullNode(c,u,r)}else{const u=x(n);let d=yu(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,Z(n),a,r):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,k.EMPTY_NODE,Z(n),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Io(s,ns(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||ko(s,V())!=null,Oi(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new fu(s.getIndex()),r=$k(s);this.processor_=fR(r);const o=n.serverCache,a=n.eventCache,c=i.updateFullNode(k.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(k.EMPTY_NODE,a.getNode(),null),u=new kn(c,o.isFullyInitialized(),i.filtersNodes()),d=new kn(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=da(d,u),this.eventGenerator_=new zk(this.query_)}get query(){return this.query_}}function ER(t){return t.viewCache_.serverCache.getNode()}function CR(t){return So(t.viewCache_)}function TR(t,e){const n=ns(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!U(e)&&!n.getImmediateChild(x(e)).isEmpty())?n.getChild(e):null}function Ef(t){return t.eventRegistrations_.length===0}function SR(t,e){t.eventRegistrations_.push(e)}function Cf(t,e,n){const s=[];if(n){_(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return s}function Tf(t,e,n,s){e.type===ht.MERGE&&e.source.queryId!==null&&(_(ns(t.viewCache_),"We should always have a full cache before handling merges"),_(So(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,r=gR(t.processor_,i,e,n,s);return pR(t.processor_,r.viewCache),_(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,Lm(t,r.changes,r.viewCache.eventCache.getNode(),null)}function IR(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(oe,(r,o)=>{s.push(Gs(r,o))}),n.isFullyInitialized()&&s.push(Cm(n.getNode())),Lm(t,s,n.getNode(),e)}function Lm(t,e,n,s){const i=s?[s]:t.eventRegistrations_;return Gk(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ao;class Om{constructor(){this.views=new Map}}function kR(t){_(!Ao,"__referenceConstructor has already been defined"),Ao=t}function RR(){return _(Ao,"Reference.ts has not been loaded"),Ao}function AR(t){return t.views.size===0}function vu(t,e,n,s){const i=e.source.queryId;if(i!==null){const r=t.views.get(i);return _(r!=null,"SyncTree gave us an op for an invalid query."),Tf(r,e,n,s)}else{let r=[];for(const o of t.views.values())r=r.concat(Tf(o,e,n,s));return r}}function Dm(t,e,n,s,i){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Io(n,i?s:null),c=!1;a?c=!0:s instanceof k?(a=_u(n,s),c=!1):(a=k.EMPTY_NODE,c=!1);const l=da(new kn(a,c,!1),new kn(s,i,!1));return new bR(e,l)}return o}function NR(t,e,n,s,i,r){const o=Dm(t,e,s,i,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),SR(o,n),IR(o,n)}function PR(t,e,n,s){const i=e._queryIdentifier,r=[];let o=[];const a=Rn(t);if(i==="default")for(const[c,l]of t.views.entries())o=o.concat(Cf(l,n,s)),Ef(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=t.views.get(i);c&&(o=o.concat(Cf(c,n,s)),Ef(c)&&(t.views.delete(i),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Rn(t)&&r.push(new(RR())(e._repo,e._path)),{removed:r,events:o}}function Mm(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function vn(t,e){let n=null;for(const s of t.views.values())n=n||TR(s,e);return n}function xm(t,e){if(e._queryParams.loadsAllData())return fa(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Fm(t,e){return xm(t,e)!=null}function Rn(t){return fa(t)!=null}function fa(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let No;function LR(t){_(!No,"__referenceConstructor has already been defined"),No=t}function OR(){return _(No,"Reference.ts has not been loaded"),No}let DR=1;class Sf{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ee(null),this.pendingWriteTree_=lR(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Um(t,e,n,s,i){return Xk(t.pendingWriteTree_,e,n,s,i),i?di(t,new ts(pu(),e,n)):[]}function MR(t,e,n,s){Qk(t.pendingWriteTree_,e,n,s);const i=ee.fromObject(n);return di(t,new Ks(pu(),e,i))}function fn(t,e,n=!1){const s=Zk(t.pendingWriteTree_,e);if(eR(t.pendingWriteTree_,e)){let r=new ee(null);return s.snap!=null?r=r.set(V(),!0):ke(s.children,o=>{r=r.set(new K(o),!0)}),di(t,new To(s.path,r,n))}else return[]}function Tr(t,e,n){return di(t,new ts(gu(),e,n))}function xR(t,e,n){const s=ee.fromObject(n);return di(t,new Ks(gu(),e,s))}function FR(t,e){return di(t,new nr(gu(),e))}function UR(t,e,n){const s=Eu(t,n);if(s){const i=Cu(s),r=i.path,o=i.queryId,a=$e(r,e),c=new nr(mu(o),a);return Tu(t,r,c)}else return[]}function Po(t,e,n,s,i=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Fm(o,e))){const c=PR(o,e,n,s);AR(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!i){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(r,(h,f)=>Rn(f));if(u&&!d){const h=t.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=HR(h);for(let p=0;p<f.length;++p){const m=f[p],g=m.query,T=jm(t,m);t.listenProvider_.startListening(Mi(g),sr(t,g),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(Mi(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(pa(h));t.listenProvider_.stopListening(Mi(h),f)}))}jR(t,l)}return a}function $m(t,e,n,s){const i=Eu(t,s);if(i!=null){const r=Cu(i),o=r.path,a=r.queryId,c=$e(o,e),l=new ts(mu(a),c,n);return Tu(t,o,l)}else return[]}function $R(t,e,n,s){const i=Eu(t,s);if(i){const r=Cu(i),o=r.path,a=r.queryId,c=$e(o,e),l=ee.fromObject(n),u=new Ks(mu(a),c,l);return Tu(t,o,u)}else return[]}function ul(t,e,n,s=!1){const i=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(i,(h,f)=>{const p=$e(h,i);r=r||vn(f,p),o=o||Rn(f)});let a=t.syncPointTree_.get(i);a?(o=o||Rn(a),r=r||vn(a,V())):(a=new Om,t.syncPointTree_=t.syncPointTree_.set(i,a));let c;r!=null?c=!0:(c=!1,r=k.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((f,p)=>{const m=vn(p,V());m&&(r=r.updateImmediateChild(f,m))}));const l=Fm(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=pa(e);_(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=VR();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=ha(t.pendingWriteTree_,i);let d=NR(a,e,n,u,r,c);if(!l&&!o&&!s){const h=xm(a,e);d=d.concat(WR(t,e,h))}return d}function bu(t,e,n){const i=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=$e(o,e),l=vn(a,c);if(l)return l});return km(i,e,r,n,!0)}function BR(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=$e(l,n);s=s||vn(u,d)});let i=t.syncPointTree_.get(n);i?s=s||vn(i,V()):(i=new Om,t.syncPointTree_=t.syncPointTree_.set(n,i));const r=s!=null,o=r?new kn(s,!0,!1):null,a=ha(t.pendingWriteTree_,e._path),c=Dm(i,e,a,r?o.getNode():k.EMPTY_NODE,r);return CR(c)}function di(t,e){return Bm(e,t.syncPointTree_,null,ha(t.pendingWriteTree_,V()))}function Bm(t,e,n,s){if(U(t.path))return Hm(t,e,n,s);{const i=e.get(V());n==null&&i!=null&&(n=vn(i,V()));let r=[];const o=x(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=Rm(s,o);r=r.concat(Bm(a,c,l,u))}return i&&(r=r.concat(vu(i,t,s,n))),r}}function Hm(t,e,n,s){const i=e.get(V());n==null&&i!=null&&(n=vn(i,V()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=Rm(s,o),u=t.operationForChild(o);u&&(r=r.concat(Hm(u,a,c,l)))}),i&&(r=r.concat(vu(i,t,s,n))),r}function jm(t,e){const n=e.query,s=sr(t,n);return{hashFn:()=>(ER(e)||k.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?UR(t,n._path,s):FR(t,n._path);{const r=FI(i,n);return Po(t,n,null,r)}}}}function sr(t,e){const n=pa(e);return t.queryToTagMap.get(n)}function pa(t){return t._path.toString()+"$"+t._queryIdentifier}function Eu(t,e){return t.tagToQueryMap.get(e)}function Cu(t){const e=t.indexOf("$");return _(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new K(t.substr(0,e))}}function Tu(t,e,n){const s=t.syncPointTree_.get(e);_(s,"Missing sync point for query tag that we're tracking");const i=ha(t.pendingWriteTree_,e);return vu(s,n,i,null)}function HR(t){return t.fold((e,n,s)=>{if(n&&Rn(n))return[fa(n)];{let i=[];return n&&(i=Mm(n)),ke(s,(r,o)=>{i=i.concat(o)}),i}})}function Mi(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(OR())(t._repo,t._path):t}function jR(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const i=pa(s),r=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(r)}}}function VR(){return DR++}function WR(t,e,n){const s=e._path,i=sr(t,e),r=jm(t,n),o=t.listenProvider_.startListening(Mi(e),i,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(s);if(i)_(!Rn(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!U(l)&&u&&Rn(u))return[fa(u).query];{let h=[];return u&&(h=h.concat(Mm(u).map(f=>f.query))),ke(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Mi(u),sr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Su(n)}node(){return this.node_}}class Iu{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=re(this.path_,e);return new Iu(this.syncTree_,n)}node(){return bu(this.syncTree_,this.path_)}}const qR=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},If=function(t,e,n){if(!t||typeof t!="object")return t;if(_(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return zR(t[".sv"],e,n);if(typeof t[".sv"]=="object")return GR(t[".sv"],e);_(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},zR=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:_(!1,"Unexpected server value: "+t)}},GR=function(t,e,n){t.hasOwnProperty("increment")||_(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&_(!1,"Unexpected increment value: "+s);const i=e.node();if(_(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},Vm=function(t,e,n,s){return ku(e,new Iu(n,t),s)},Wm=function(t,e,n){return ku(t,new Su(e),n)};function ku(t,e,n){const s=t.getPriority().val(),i=If(s,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=If(o.getValue(),e,n);return a!==o.getValue()||i!==o.getPriority().val()?new Ee(a,ue(i)):t}else{const o=t;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Ee(i))),o.forEachChild(oe,(a,c)=>{const l=ku(c,e.getImmediateChild(a),n);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Au(t,e){let n=e instanceof K?e:new K(e),s=t,i=x(n);for(;i!==null;){const r=Ws(s.node.children,i)||{children:{},childCount:0};s=new Ru(i,s,r),n=Z(n),i=x(n)}return s}function hi(t){return t.node.value}function qm(t,e){t.node.value=e,dl(t)}function zm(t){return t.node.childCount>0}function KR(t){return hi(t)===void 0&&!zm(t)}function ga(t,e){ke(t.node.children,(n,s)=>{e(new Ru(n,t,s))})}function Gm(t,e,n,s){n&&e(t),ga(t,i=>{Gm(i,e,!0)})}function YR(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Sr(t){return new K(t.parent===null?t.name:Sr(t.parent)+"/"+t.name)}function dl(t){t.parent!==null&&JR(t.parent,t.name,t)}function JR(t,e,n){const s=KR(n),i=Dt(t.node.children,e);s&&i?(delete t.node.children[e],t.node.childCount--,dl(t)):!s&&!i&&(t.node.children[e]=n.node,t.node.childCount++,dl(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XR=/[\[\].#$\/\u0000-\u001F\u007F]/,QR=/[\[\].#$\u0000-\u001F\u007F]/,fc=10*1024*1024,Nu=function(t){return typeof t=="string"&&t.length!==0&&!XR.test(t)},Km=function(t){return typeof t=="string"&&t.length!==0&&!QR.test(t)},ZR=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Km(t)},Ym=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!ca(t)||t&&typeof t=="object"&&Dt(t,".sv")},Lo=function(t,e,n,s){s&&e===void 0||ma(qs(t,"value"),e,n)},ma=function(t,e,n){const s=n instanceof K?new _k(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Bn(s));if(typeof e=="function")throw new Error(t+"contains a function "+Bn(s)+" with contents = "+e.toString());if(ca(e))throw new Error(t+"contains "+e.toString()+" "+Bn(s));if(typeof e=="string"&&e.length>fc/3&&ia(e)>fc)throw new Error(t+"contains a string greater than "+fc+" utf8 bytes "+Bn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(ke(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Nu(o)))throw new Error(t+" contains an invalid key ("+o+") "+Bn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);yk(s,o),ma(t,a,s),wk(s)}),i&&r)throw new Error(t+' contains ".value" child '+Bn(s)+" in addition to actual children.")}},eA=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const r=Qi(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Nu(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(mk);let i=null;for(n=0;n<e.length;n++){if(s=e[n],i!==null&&it(i,s))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},Jm=function(t,e,n,s){const i=qs(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];ke(e,(o,a)=>{const c=new K(o);if(ma(i,a,re(n,c)),lu(c)===".priority"&&!Ym(a))throw new Error(i+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),eA(i,r)},tA=function(t,e,n){if(ca(e))throw new Error(qs(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Ym(e))throw new Error(qs(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Pu=function(t,e,n,s){if(!Km(n))throw new Error(qs(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},nA=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Pu(t,e,n)},pn=function(t,e){if(x(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},sA=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Nu(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!ZR(n))throw new Error(qs(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function _a(t,e){let n=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();n!==null&&!uu(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(i)}n&&t.eventLists_.push(n)}function Xm(t,e,n){_a(t,n),Qm(t,s=>uu(s,e))}function lt(t,e,n){_a(t,n),Qm(t,s=>it(s,e)||it(e,s))}function Qm(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const i=t.eventLists_[s];if(i){const r=i.path;e(r)?(rA(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function rA(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Pi&&Te("event: "+n.toString()),li(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oA="repo_interrupt",aA=25;class cA{constructor(e,n,s,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new iA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Co(),this.transactionQueueTree_=new Ru,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function lA(t,e,n){if(t.stats_=au(t.repoInfo_),t.forceRestClient_||HI())t.server_=new Eo(t.repoInfo_,(s,i,r,o)=>{kf(t,s,i,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Rf(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ve(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new zt(t.repoInfo_,e,(s,i,r,o)=>{kf(t,s,i,r,o)},s=>{Rf(t,s)},s=>{uA(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=zI(t.repoInfo_,()=>new qk(t.stats_,t.server_)),t.infoData_=new Bk,t.infoSyncTree_=new Sf({startListening:(s,i,r,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=Tr(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Lu(t,"connected",!1),t.serverSyncTree_=new Sf({startListening:(s,i,r,o)=>(t.server_.listen(s,r,i,(a,c)=>{const l=o(a,c);lt(t.eventQueue_,s._path,l)}),[]),stopListening:(s,i)=>{t.server_.unlisten(s,i)}})}function Zm(t){const n=t.infoData_.getNode(new K(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function ya(t){return qR({timestamp:Zm(t)})}function kf(t,e,n,s,i){t.dataUpdateCount++;const r=new K(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(s){const c=_o(n,l=>ue(l));o=$R(t.serverSyncTree_,r,c,i)}else{const c=ue(n);o=$m(t.serverSyncTree_,r,c,i)}else if(s){const c=_o(n,l=>ue(l));o=xR(t.serverSyncTree_,r,c)}else{const c=ue(n);o=Tr(t.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=Js(t,r)),lt(t.eventQueue_,a,o)}function Rf(t,e){Lu(t,"connected",e),e===!1&&pA(t)}function uA(t,e){ke(e,(n,s)=>{Lu(t,n,s)})}function Lu(t,e,n){const s=new K("/.info/"+e),i=ue(n);t.infoData_.updateSnapshot(s,i);const r=Tr(t.infoSyncTree_,s,i);lt(t.eventQueue_,s,r)}function Ou(t){return t.nextWriteId_++}function dA(t,e,n){const s=BR(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(i=>{const r=ue(i).withIndex(e._queryParams.getIndex());ul(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Tr(t.serverSyncTree_,e._path,r);else{const a=sr(t.serverSyncTree_,e);o=$m(t.serverSyncTree_,e._path,r,a)}return lt(t.eventQueue_,e._path,o),Po(t.serverSyncTree_,e,n,null,!0),r},i=>(Ir(t,"get for query "+ve(e)+" failed: "+i),Promise.reject(new Error(i))))}function hA(t,e,n,s,i){Ir(t,"set",{path:e.toString(),value:n,priority:s});const r=ya(t),o=ue(n,s),a=bu(t.serverSyncTree_,e),c=Wm(o,a,r),l=Ou(t),u=Um(t.serverSyncTree_,e,c,l,!0);_a(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||je("set at "+e+" failed: "+h);const m=fn(t.serverSyncTree_,l,!p);lt(t.eventQueue_,e,m),An(t,i,h,f)});const d=Mu(t,e);Js(t,d),lt(t.eventQueue_,d,[])}function fA(t,e,n,s){Ir(t,"update",{path:e.toString(),value:n});let i=!0;const r=ya(t),o={};if(ke(n,(a,c)=>{i=!1,o[a]=Vm(re(e,a),ue(c),t.serverSyncTree_,r)}),i)Te("update() called with empty data.  Don't do anything."),An(t,s,"ok",void 0);else{const a=Ou(t),c=MR(t.serverSyncTree_,e,o,a);_a(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||je("update at "+e+" failed: "+l);const h=fn(t.serverSyncTree_,a,!d),f=h.length>0?Js(t,e):e;lt(t.eventQueue_,f,h),An(t,s,l,u)}),ke(n,l=>{const u=Mu(t,re(e,l));Js(t,u)}),lt(t.eventQueue_,e,[])}}function pA(t){Ir(t,"onDisconnectEvents");const e=ya(t),n=Co();il(t.onDisconnect_,V(),(i,r)=>{const o=Vm(i,r,t.serverSyncTree_,e);ui(n,i,o)});let s=[];il(n,V(),(i,r)=>{s=s.concat(Tr(t.serverSyncTree_,i,r));const o=Mu(t,i);Js(t,o)}),t.onDisconnect_=Co(),lt(t.eventQueue_,V(),s)}function gA(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,i)=>{s==="ok"&&sl(t.onDisconnect_,e),An(t,n,s,i)})}function Af(t,e,n,s){const i=ue(n);t.server_.onDisconnectPut(e.toString(),i.val(!0),(r,o)=>{r==="ok"&&ui(t.onDisconnect_,e,i),An(t,s,r,o)})}function mA(t,e,n,s,i){const r=ue(n,s);t.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&ui(t.onDisconnect_,e,r),An(t,i,o,a)})}function _A(t,e,n,s){if(mo(n)){Te("onDisconnect().update() called with empty data.  Don't do anything."),An(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(i,r)=>{i==="ok"&&ke(n,(o,a)=>{const c=ue(a);ui(t.onDisconnect_,re(e,o),c)}),An(t,s,i,r)})}function yA(t,e,n){let s;x(e._path)===".info"?s=ul(t.infoSyncTree_,e,n):s=ul(t.serverSyncTree_,e,n),Xm(t.eventQueue_,e._path,s)}function e_(t,e,n){let s;x(e._path)===".info"?s=Po(t.infoSyncTree_,e,n):s=Po(t.serverSyncTree_,e,n),Xm(t.eventQueue_,e._path,s)}function wA(t){t.persistentConnection_&&t.persistentConnection_.interrupt(oA)}function Ir(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),Te(n,...e)}function An(t,e,n,s){e&&li(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function t_(t,e,n){return bu(t.serverSyncTree_,e,n)||k.EMPTY_NODE}function Du(t,e=t.transactionQueueTree_){if(e||wa(t,e),hi(e)){const n=s_(t,e);_(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&vA(t,Sr(e),n)}else zm(e)&&ga(e,n=>{Du(t,n)})}function vA(t,e,n){const s=n.map(l=>l.currentWriteId),i=t_(t,e,s);let r=i;const o=i.hash();for(let l=0;l<n.length;l++){const u=n[l];_(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=$e(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Ir(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(fn(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();wa(t,Au(t.transactionQueueTree_,e)),Du(t,t.transactionQueueTree_),lt(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)li(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{je("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}Js(t,e)}},o)}function Js(t,e){const n=n_(t,e),s=Sr(n),i=s_(t,n);return bA(t,i,s),s}function bA(t,e,n){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=$e(n,c.path);let u=!1,d;if(_(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,i=i.concat(fn(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=aA)u=!0,d="maxretry",i=i.concat(fn(t.serverSyncTree_,c.currentWriteId,!0));else{const h=t_(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){ma("transaction failed: Data returned ",f,c.path);let p=ue(f);typeof f=="object"&&f!=null&&Dt(f,".priority")||(p=p.updatePriority(h.getPriority()));const g=c.currentWriteId,T=ya(t),B=Wm(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=B,c.currentWriteId=Ou(t),o.splice(o.indexOf(g),1),i=i.concat(Um(t.serverSyncTree_,c.path,B,c.currentWriteId,c.applyLocally)),i=i.concat(fn(t.serverSyncTree_,g,!0))}else u=!0,d="nodata",i=i.concat(fn(t.serverSyncTree_,c.currentWriteId,!0))}lt(t.eventQueue_,n,i),i=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}wa(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)li(s[a]);Du(t,t.transactionQueueTree_)}function n_(t,e){let n,s=t.transactionQueueTree_;for(n=x(e);n!==null&&hi(s)===void 0;)s=Au(s,n),e=Z(e),n=x(e);return s}function s_(t,e){const n=[];return i_(t,e,n),n.sort((s,i)=>s.order-i.order),n}function i_(t,e,n){const s=hi(e);if(s)for(let i=0;i<s.length;i++)n.push(s[i]);ga(e,i=>{i_(t,i,n)})}function wa(t,e){const n=hi(e);if(n){let s=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[s]=n[i],s++);n.length=s,qm(e,n.length>0?n:void 0)}ga(e,s=>{wa(t,s)})}function Mu(t,e){const n=Sr(n_(t,e)),s=Au(t.transactionQueueTree_,e);return YR(s,i=>{pc(t,i)}),pc(t,s),Gm(s,i=>{pc(t,i)}),n}function pc(t,e){const n=hi(e);if(n){const s=[];let i=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(_(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(_(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(fn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?qm(e,void 0):n.length=r+1,lt(t.eventQueue_,Sr(e),i);for(let o=0;o<s.length;o++)li(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function EA(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let i=n[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function CA(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):je(`Invalid query segment '${n}' in query '${t}'`)}return e}const Nf=function(t,e){const n=TA(t),s=n.namespace;n.domain==="firebase.com"&&Yt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&Yt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||LI();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new am(n.host,n.secure,s,i,e,"",s!==n.subdomain),path:new K(n.pathString)}},TA=function(t){let e="",n="",s="",i="",r="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(i=EA(t.substring(u,d)));const h=CA(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),r=s}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",SA=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let i;const r=new Array(8);for(i=7;i>=0;i--)r[i]=Pf.charAt(n%64),n=Math.floor(n/64);_(n===0,"Cannot push at time == 0");let o=r.join("");if(s){for(i=11;i>=0&&e[i]===63;i--)e[i]=0;e[i]++}else for(i=0;i<12;i++)e[i]=Math.floor(Math.random()*64);for(i=0;i<12;i++)o+=Pf.charAt(e[i]);return _(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,n,s,i){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ve(this.snapshot.exportVal())}}class o_{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return _(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class a_{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new qe;return gA(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){pn("OnDisconnect.remove",this._path);const e=new qe;return Af(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){pn("OnDisconnect.set",this._path),Lo("OnDisconnect.set",e,this._path,!1);const n=new qe;return Af(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){pn("OnDisconnect.setWithPriority",this._path),Lo("OnDisconnect.setWithPriority",e,this._path,!1),tA("OnDisconnect.setWithPriority",n);const s=new qe;return mA(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){pn("OnDisconnect.update",this._path),Jm("OnDisconnect.update",e,this._path);const n=new qe;return _A(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,n,s,i){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=i}get key(){return U(this._path)?null:lu(this._path)}get ref(){return new Et(this._repo,this._path)}get _queryIdentifier(){const e=gf(this._queryParams),n=ru(e);return n==="{}"?"default":n}get _queryObject(){return gf(this._queryParams)}isEqual(e){if(e=ae(e),!(e instanceof va))return!1;const n=this._repo===e._repo,s=uu(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+gk(this._path)}}class Et extends va{constructor(e,n){super(e,n,new ua,!1)}get parent(){const e=mm(this._path);return e===null?null:new Et(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ss{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new K(e),s=is(this.ref,e);return new ss(this._node.getChild(n),s,oe)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new ss(i,is(this.ref,s),oe)))}hasChild(e){const n=new K(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function b(t,e){return t=ae(t),t._checkNotDeleted("ref"),e!==void 0?is(t._root,e):t._root}function is(t,e){return t=ae(t),x(t._path)===null?nA("child","path",e):Pu("child","path",e),new Et(t._repo,re(t._path,e))}function c_(t){return t=ae(t),new a_(t._repo,t._path)}function Xs(t,e){t=ae(t),pn("push",t._path),Lo("push",e,t._path,!0);const n=Zm(t._repo),s=SA(n),i=is(t,s),r=is(t,s);let o;return o=Promise.resolve(r),i.then=o.then.bind(o),i.catch=o.then.bind(o,void 0),i}function tt(t){return pn("remove",t._path),ne(t,null)}function ne(t,e){t=ae(t),pn("set",t._path),Lo("set",e,t._path,!1);const n=new qe;return hA(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function bn(t,e){Jm("update",e,t._path);const n=new qe;return fA(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Me(t){t=ae(t);const e=new xu(()=>{}),n=new kr(e);return dA(t._repo,t,n).then(s=>new ss(s,new Et(t._repo,t._path),t._queryParams.getIndex()))}class kr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new r_("value",this,new ss(e.snapshotNode,new Et(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new o_(this,e,n):null}matches(e){return e instanceof kr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ba{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new o_(this,e,n):null}createEvent(e,n){_(e.childName!=null,"Child events should have a childName.");const s=is(new Et(n._repo,n._path),e.childName),i=n._queryParams.getIndex();return new r_(e.type,this,new ss(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ba?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Ea(t,e,n,s,i){const r=new xu(n,void 0),o=e==="value"?new kr(r):new ba(e,r);return yA(t._repo,t,o),()=>e_(t._repo,t,o)}function Fu(t,e,n,s){return Ea(t,"value",e)}function Qs(t,e,n,s){return Ea(t,"child_added",e)}function hl(t,e,n,s){return Ea(t,"child_changed",e)}function l_(t,e,n,s){return Ea(t,"child_removed",e)}function ft(t,e,n){let s=null;const i=n?new xu(n):null;e==="value"?s=new kr(i):e&&(s=new ba(e,i)),e_(t._repo,t,s)}kR(Et);LR(Et);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IA="FIREBASE_DATABASE_EMULATOR_HOST",fl={};let kA=!1;function RA(t,e,n,s){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=oi(r);t.repoInfo_=new am(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function u_(t,e,n,s,i){let r=s||t.options.databaseURL;r===void 0&&(t.options.projectId||Yt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Te("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Nf(r,i),a=o.repoInfo,c;typeof process<"u"&&Jh&&(c=Jh[IA]),c?(r=`http://${c}?ns=${a.namespace}`,o=Nf(r,i),a=o.repoInfo):o.repoInfo.secure;const l=new VI(t.name,t.options,e);sA("Invalid Firebase Database URL",o),U(o.path)||Yt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=NA(a,t,l,new jI(t,n));return new d_(u,t)}function AA(t,e){const n=fl[e];(!n||n[t.key]!==t)&&Yt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),wA(t),delete n[t.key]}function NA(t,e,n,s){let i=fl[e.name];i||(i={},fl[e.name]=i);let r=i[t.toURLString()];return r&&Yt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new cA(t,kA,n,s),i[t.toURLString()]=r,r}class d_{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(lA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Et(this._repo,V())),this._rootInternal}_delete(){return this._rootInternal!==null&&(AA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Yt("Cannot call "+e+" on a deleted database.")}}function h_(t=aa(),e){const n=Mn(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=JT("database");s&&f_(n,...s)}return n}function f_(t,e,n,s={}){t=ae(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,r=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&Zn(s,r.repoInfo_.emulatorOptions))return;Yt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)s.mockUserToken&&Yt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new eo(eo.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:XT(s.mockUserToken,t.app.options.projectId);o=new eo(a)}oi(e)&&(xg(e),Fg("Database",!0)),RA(r,i,s,o)}/**
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
 */function PA(t){Gg(ci),ct(new et("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return u_(s,i,r,n)},"PUBLIC").setMultipleInstances(!0)),Qe(Xh,Qh,t),Qe(Xh,Qh,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LA={".sv":"timestamp"};function En(){return LA}zt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};zt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};PA();const p_=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:ss,Database:d_,OnDisconnect:a_,_QueryImpl:va,_QueryParams:ua,_ReferenceImpl:Et,_repoManagerDatabaseFromApp:u_,_setSDKVersion:Gg,_validatePathString:Pu,_validateWritablePath:pn,child:is,connectDatabaseEmulator:f_,get:Me,getDatabase:h_,off:ft,onChildAdded:Qs,onChildChanged:hl,onChildRemoved:l_,onDisconnect:c_,onValue:Fu,push:Xs,ref:b,remove:tt,serverTimestamp:En,set:ne,update:bn},Symbol.toStringTag,{value:"Module"}));var OA="firebase",DA="12.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qe(OA,DA,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl=new Map,g_={activated:!1,tokenObservers:[]},MA={initialized:!1,enabled:!1};function be(t){return pl.get(t)||{...g_}}function xA(t,e){return pl.set(t,e),pl.get(t)}function Ca(){return MA}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_="https://content-firebaseappcheck.googleapis.com/v1",FA="exchangeRecaptchaEnterpriseToken",UA="exchangeDebugToken",Lf={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},$A=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(e,n,s,i,r){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=i,this.upperBound=r,this.pending=null,this.nextErrorWaitInterval=i,i>r)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new qe,this.pending.promise.catch(n=>{}),await HA(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new qe,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function HA(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},Ge=new Dn("appCheck","AppCheck",jA);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Of(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function Uu(t){if(!be(t).activated)throw Ge.create("use-before-activation",{appName:t.name})}function __(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),i=Math.floor((e-n*3600*24-s*3600)/60),r=e-n*3600*24-s*3600-i*60;let o="";return n&&(o+=Vr(n)+"d:"),s&&(o+=Vr(s)+"h:"),o+=Vr(i)+"m:"+Vr(r)+"s",o}function Vr(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $u({url:t,body:e},n){const s={"Content-Type":"application/json"},i=n.getImmediate({optional:!0});if(i){const d=await i.getHeartbeatsHeader();d&&(s["X-Firebase-Client"]=d)}const r={method:"POST",body:JSON.stringify(e),headers:s};let o;try{o=await fetch(t,r)}catch(d){throw Ge.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw Ge.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw Ge.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw Ge.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function VA(t,e){const{projectId:n,appId:s,apiKey:i}=t.options;return{url:`${m_}/projects/${n}/apps/${s}:${FA}?key=${i}`,body:{recaptcha_enterprise_token:e}}}function y_(t,e){const{projectId:n,appId:s,apiKey:i}=t.options;return{url:`${m_}/projects/${n}/apps/${s}:${UA}?key=${i}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WA="firebase-app-check-database",qA=1,ir="firebase-app-check-store",w_="debug-token";let Wr=null;function v_(){return Wr||(Wr=new Promise((t,e)=>{try{const n=indexedDB.open(WA,qA);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{e(Ge.create("storage-open",{originalErrorMessage:s.target.error?.message}))},n.onupgradeneeded=s=>{const i=s.target.result;switch(s.oldVersion){case 0:i.createObjectStore(ir,{keyPath:"compositeKey"})}}}catch(n){e(Ge.create("storage-open",{originalErrorMessage:n?.message}))}}),Wr)}function zA(t){return E_(C_(t))}function GA(t,e){return b_(C_(t),e)}function KA(t){return b_(w_,t)}function YA(){return E_(w_)}async function b_(t,e){const s=(await v_()).transaction(ir,"readwrite"),r=s.objectStore(ir).put({compositeKey:t,value:e});return new Promise((o,a)=>{r.onsuccess=c=>{o()},s.onerror=c=>{a(Ge.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function E_(t){const n=(await v_()).transaction(ir,"readonly"),i=n.objectStore(ir).get(t);return new Promise((r,o)=>{i.onsuccess=a=>{const c=a.target.result;r(c?c.value:void 0)},n.onerror=a=>{o(Ge.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function C_(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gn=new ra("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JA(t){if(sa()){let e;try{e=await zA(t)}catch(n){gn.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function gc(t,e){return sa()?GA(t,e).catch(n=>{gn.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function XA(){let t;try{t=await YA()}catch{}if(t)return t;{const e=crypto.randomUUID();return KA(e).catch(n=>gn.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bu(){return Ca().enabled}async function Hu(){const t=Ca();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function QA(){const t=Lg(),e=Ca();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new qe;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(XA())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZA={error:"UNKNOWN_ERROR"};function eN(t){return na.encodeString(JSON.stringify(t),!1)}async function gl(t,e=!1,n=!1){const s=t.app;Uu(s);const i=be(s);let r=i.token,o;if(r&&!Ss(r)&&(i.token=void 0,r=void 0),!r){const l=await i.cachedTokenPromise;l&&(Ss(l)?r=l:await gc(s,void 0))}if(!e&&r&&Ss(r))return{token:r.token};let a=!1;if(Bu())try{i.exchangeTokenPromise||(i.exchangeTokenPromise=$u(y_(s,await Hu()),t.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),a=!0);const l=await i.exchangeTokenPromise;return await gc(s,l),i.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?gn.warn(l.message):n&&gn.error(l),mc(l)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),a=!0),r=await be(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?gn.warn(l.message):n&&gn.error(l),o=l}let c;return r?o?Ss(r)?c={token:r.token,internalError:o}:c=mc(o):(c={token:r.token},i.token=r,await gc(s,r)):c=mc(o),a&&I_(s,c),c}async function tN(t){const e=t.app;Uu(e);const{provider:n}=be(e);if(Bu()){const s=await Hu(),{token:i}=await $u(y_(e,s),t.heartbeatServiceProvider);return{token:i}}else{const{token:s}=await n.getToken();return{token:s}}}function T_(t,e,n,s){const{app:i}=t,r=be(i),o={next:n,error:s,type:e};if(r.tokenObservers=[...r.tokenObservers,o],r.token&&Ss(r.token)){const a=r.token;Promise.resolve().then(()=>{n({token:a.token}),Df(t)}).catch(()=>{})}r.cachedTokenPromise.then(()=>Df(t))}function S_(t,e){const n=be(t),s=n.tokenObservers.filter(i=>i.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Df(t){const{app:e}=t,n=be(e);let s=n.tokenRefresher;s||(s=nN(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function nN(t){const{app:e}=t;return new BA(async()=>{const n=be(e);let s;if(n.token?s=await gl(t,!0):s=await gl(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=be(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const i=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,i),Math.max(0,s-Date.now())}else return 0},Lf.RETRIAL_MIN_WAIT,Lf.RETRIAL_MAX_WAIT)}function I_(t,e){const n=be(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Ss(t){return t.expireTimeMillis-Date.now()>0}function mc(t){return{token:eN(ZA),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sN{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=be(this.app);for(const n of e)S_(this.app,n.next);return Promise.resolve()}}function iN(t,e){return new sN(t,e)}function rN(t){return{getToken:e=>gl(t,e),getLimitedUseToken:()=>tN(t),addTokenListener:e=>T_(t,"INTERNAL",e),removeTokenListener:e=>S_(t.app,e)}}const oN="@firebase/app-check",aN="0.11.0",cN="https://www.google.com/recaptcha/enterprise.js";function lN(t,e){const n=new qe,s=be(t);s.reCAPTCHAState={initialized:n};const i=uN(t),r=Of(!0);return r?Mf(t,e,r,i,n):fN(()=>{const o=Of(!0);if(!o)throw new Error("no recaptcha");Mf(t,e,o,i,n)}),n.promise}function Mf(t,e,n,s,i){n.ready(()=>{hN(t,e,n,s),i.resolve(n)})}function uN(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function dN(t){Uu(t);const n=await be(t).reCAPTCHAState.initialized.promise;return new Promise((s,i)=>{const r=be(t).reCAPTCHAState;n.ready(()=>{s(n.execute(r.widgetId,{action:"fire_app_check"}))})})}function hN(t,e,n,s){const i=n.render(s,{sitekey:e,size:"invisible",callback:()=>{be(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{be(t).reCAPTCHAState.succeeded=!1}}),r=be(t);r.reCAPTCHAState={...r.reCAPTCHAState,widgetId:i}}function fN(t){const e=document.createElement("script");e.src=cN,e.onload=t,document.head.appendChild(e)}class ju{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){gN(this._throttleData);const e=await dN(this._app).catch(s=>{throw Ge.create("recaptcha-error")});if(!be(this._app).reCAPTCHAState?.succeeded)throw Ge.create("recaptcha-error");let n;try{n=await $u(VA(this._app,e),this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=pN(Number(s.customData?.httpStatus),this._throttleData),Ge.create("initial-throttle",{time:__(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=Mn(e,"heartbeat"),lN(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof ju?this._siteKey===e._siteKey:!1}}function pN(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+$A,httpStatus:t};{const n=e?e.backoffCount:0,s=wS(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function gN(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw Ge.create("throttled",{time:__(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mN(t=aa(),e){t=ae(t);const n=Mn(t,"app-check");if(Ca().initialized||QA(),Bu()&&Hu().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const i=n.getImmediate(),r=n.getOptions();if(r.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&r.provider.isEqual(e.provider))return i;throw Ge.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return _N(t,e.provider,e.isTokenAutoRefreshEnabled),be(t).isTokenAutoRefreshEnabled&&T_(s,"INTERNAL",()=>{}),s}function _N(t,e,n=!1){const s=xA(t,{...g_});s.activated=!0,s.provider=e,s.cachedTokenPromise=JA(t).then(i=>(i&&Ss(i)&&(s.token=i,I_(t,{token:i.token})),i)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&gn.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const yN="app-check",xf="app-check-internal";function wN(){ct(new et(yN,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return iN(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider(xf).initialize()})),ct(new et(xf,t=>{const e=t.getProvider("app-check").getImmediate();return rN(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Qe(oN,aN)}wN();const vN={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.web.app",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},Ta=Vg(vN),bN=void 0;console.error("Missing VITE_FCM_VAPID_KEY: required for FCM web push");const Ff="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let ml;if(Ff.trim()!=="")ml=new ju(Ff),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(ml)try{mN(Ta,{provider:ml,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const E=h_(Ta),pt=[];function an(t,e,n,s=null,i=null,r=null){e==="value"?Fu(t,n):e==="child_added"?Qs(t,n):e==="child_removed"?l_(t,n):console.warn(`Unknown listener type: ${e}`),pt.push({ref:t,type:e,callback:n,roomId:s,userId:i,category:r})}function k_(){pt.forEach(({ref:t,type:e,callback:n})=>{try{ft(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),pt.length=0}function Rr(t){if(!t)return;pt.filter(s=>s.roomId===t).forEach(({ref:s,type:i,callback:r})=>{try{ft(s,i,r)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=pt.filter(s=>s.roomId!==t);pt.length=0,pt.push(...n)}function R_(t,e){if(!t||!e)return;const n=r=>r.userId===t&&r.roomId===e;pt.filter(n).forEach(({ref:r,type:o,callback:a})=>{try{ft(r,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const i=pt.filter(r=>!n(r));pt.length=0,pt.push(...i)}function As(t,e,n=null){an(t,"value",e,n)}const on=t=>b(E,`rooms/${t}`),Ri=t=>b(E,`rooms/${t}/members`),_l=(t,e)=>b(E,`rooms/${t}/members/${e}`),A_=t=>b(E,`rooms/${t}/cancellation`),Ar=t=>b(E,`rooms/${t}/watch`),Nr=t=>b(E,`rooms/${t}/watch/fileRequest`),N_=t=>b(E,`users/${t}/recentCalls`),Sa=(t,e)=>b(E,`users/${t}/recentCalls/${e}`),Vu=t=>b(E,`users/${t}/outgoingCall`),Wu=t=>b(E,`rooms/${t}/offerCandidates`),qu=t=>b(E,`rooms/${t}/answerCandidates`),EN=Object.freeze(Object.defineProperty({__proto__:null,addRTDBListener:an,getAnswerCandidatesRef:qu,getOfferCandidatesRef:Wu,getRoomCancellationRef:A_,getRoomMemberRef:_l,getRoomMembersRef:Ri,getRoomRef:on,getUserOutgoingCallRef:Vu,getUserRecentCallRef:Sa,getUserRecentCallsRef:N_,getWatchRef:Ar,getWatchRequestRef:Nr,onDataChange:As,removeAllRTDBListeners:k_,removeRTDBListenersForRoom:Rr,removeRTDBListenersForUser:R_,rtdb:E},Symbol.toStringTag,{value:"Module"}));function P_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const CN=P_,L_=new Dn("auth","Firebase",P_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo=new ra("@firebase/auth");function TN(t,...e){Oo.logLevel<=Y.WARN&&Oo.warn(`Auth (${ci}): ${t}`,...e)}function to(t,...e){Oo.logLevel<=Y.ERROR&&Oo.error(`Auth (${ci}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ot(t,...e){throw Gu(t,...e)}function yt(t,...e){return Gu(t,...e)}function zu(t,e,n){const s={...CN(),[e]:n};return new Dn("auth","Firebase",s).create(e,{appName:t.name})}function Gn(t){return zu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function SN(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&Ot(t,"argument-error"),zu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Gu(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return L_.create(t,...e)}function P(t,e,...n){if(!t)throw Gu(e,...n)}function $t(t){const e="INTERNAL ASSERTION FAILED: "+t;throw to(e),new Error(e)}function Jt(t,e){t||$t(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(){return typeof self<"u"&&self.location?.href||""}function IN(){return Uf()==="http:"||Uf()==="https:"}function Uf(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kN(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(IN()||tS()||"connection"in navigator)?navigator.onLine:!0}function RN(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,n){this.shortDelay=e,this.longDelay=n,Jt(n>e,"Short delay should be less than long delay!"),this.isMobile=su()||Ug()}get(){return kN()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(t,e){Jt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AN={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NN=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],PN=new Pr(3e4,6e4);function Yu(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function fi(t,e,n,s,i={}){return D_(t,i,async()=>{let r={},o={};s&&(e==="GET"?o=s:r={body:JSON.stringify(s)});const a=ai({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...r};return eS()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&oi(t.emulatorConfig.host)&&(l.credentials="include"),O_.fetch()(await M_(t,t.config.apiHost,n,a),l)})}async function D_(t,e,n){t._canInitEmulator=!1;const s={...AN,...e};try{const i=new ON(t),r=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw qr(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw qr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw qr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw qr(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw zu(t,u,l);Ot(t,u)}}catch(i){if(i instanceof en)throw i;Ot(t,"network-request-failed",{message:String(i)})}}async function LN(t,e,n,s,i={}){const r=await fi(t,e,n,s,i);return"mfaPendingCredential"in r&&Ot(t,"multi-factor-auth-required",{_serverResponse:r}),r}async function M_(t,e,n,s){const i=`${e}${n}?${s}`,r=t,o=r.config.emulator?Ku(t.config,i):`${t.config.apiScheme}://${i}`;return NN.includes(n)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class ON{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(yt(this.auth,"network-request-failed")),PN.get())})}}function qr(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const i=yt(t,e,s);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DN(t,e){return fi(t,"POST","/v1/accounts:delete",e)}async function Do(t,e){return fi(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function MN(t,e=!1){const n=ae(t),s=await n.getIdToken(e),i=Ju(s);P(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const r=typeof i.firebase=="object"?i.firebase:void 0,o=r?.sign_in_provider;return{claims:i,token:s,authTime:xi(_c(i.auth_time)),issuedAtTime:xi(_c(i.iat)),expirationTime:xi(_c(i.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function _c(t){return Number(t)*1e3}function Ju(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return to("JWT malformed, contained fewer than 3 sections"),null;try{const i=go(n);return i?JSON.parse(i):(to("Failed to decode base64 JWT payload"),null)}catch(i){return to("Caught error parsing JWT payload as JSON",i?.toString()),null}}function $f(t){const e=Ju(t);return P(e,"internal-error"),P(typeof e.exp<"u","internal-error"),P(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rr(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof en&&xN(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function xN({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FN{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=xi(this.lastLoginAt),this.creationTime=xi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Mo(t){const e=t.auth,n=await t.getIdToken(),s=await rr(t,Do(e,{idToken:n}));P(s?.users.length,e,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const r=i.providerUserInfo?.length?x_(i.providerUserInfo):[],o=$N(t.providerData,r),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!o?.length,l=a?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new wl(i.createdAt,i.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function UN(t){const e=ae(t);await Mo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $N(t,e){return[...t.filter(s=>!e.some(i=>i.providerId===s.providerId)),...e]}function x_(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BN(t,e){const n=await D_(t,{},async()=>{const s=ai({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:r}=t.config,o=await M_(t,i,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&oi(t.emulatorConfig.host)&&(c.credentials="include"),O_.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function HN(t,e){return fi(t,"POST","/v2/accounts:revokeToken",Yu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){P(e.idToken,"internal-error"),P(typeof e.idToken<"u","internal-error"),P(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$f(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){P(e.length!==0,"internal-error");const n=$f(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(P(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:i,expiresIn:r}=await BN(e,n);this.updateTokensAndExpiration(s,i,Number(r))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:i,expirationTime:r}=n,o=new Ns;return s&&(P(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),i&&(P(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),r&&(P(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ns,this.toJSON())}_performRefresh(){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,e){P(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class gt{constructor({uid:e,auth:n,stsTokenManager:s,...i}){this.providerId="firebase",this.proactiveRefresh=new FN(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new wl(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await rr(this,this.stsTokenManager.getToken(this.auth,e));return P(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return MN(this,e)}reload(){return UN(this)}_assign(e){this!==e&&(P(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new gt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){P(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Mo(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ut(this.auth.app))return Promise.reject(Gn(this.auth));const e=await this.getIdToken();return await rr(this,DN(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,i=n.email??void 0,r=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:m}=n;P(d&&m,e,"internal-error");const g=Ns.fromJSON(this.name,m);P(typeof d=="string",e,"internal-error"),rn(s,e.name),rn(i,e.name),P(typeof h=="boolean",e,"internal-error"),P(typeof f=="boolean",e,"internal-error"),rn(r,e.name),rn(o,e.name),rn(a,e.name),rn(c,e.name),rn(l,e.name),rn(u,e.name);const T=new gt({uid:d,auth:e,email:i,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:g,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(B=>({...B}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,s=!1){const i=new Ns;i.updateFromServerResponse(n);const r=new gt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:s});return await Mo(r),r}static async _fromGetAccountInfoResponse(e,n,s){const i=n.users[0];P(i.localId!==void 0,"internal-error");const r=i.providerUserInfo!==void 0?x_(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!r?.length,a=new Ns;a.updateFromIdToken(s);const c=new gt({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:r,metadata:new wl(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bf=new Map;function Bt(t){Jt(t instanceof Function,"Expected a class definition");let e=Bf.get(t);return e?(Jt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Bf.set(t,e),e)}/**
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
 */class F_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}F_.type="NONE";const vl=F_;/**
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
 */function no(t,e,n){return`firebase:${t}:${e}:${n}`}class Ps{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:i,name:r}=this.auth;this.fullUserKey=no(this.userKey,i.apiKey,r),this.fullPersistenceKey=no("persistence",i.apiKey,r),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Do(this.auth,{idToken:e}).catch(()=>{});return n?gt._fromGetAccountInfoResponse(this.auth,n,e):null}return gt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Ps(Bt(vl),e,s);const i=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=i[0]||Bt(vl);const o=no(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Do(e,{idToken:u}).catch(()=>{});if(!h)break;d=await gt._fromGetAccountInfoResponse(e,h,u)}else d=gt._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=i.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Ps(r,e,s):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Ps(r,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(H_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(U_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(V_(e))return"Blackberry";if(W_(e))return"Webos";if($_(e))return"Safari";if((e.includes("chrome/")||B_(e))&&!e.includes("edge/"))return"Chrome";if(j_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function U_(t=Ve()){return/firefox\//i.test(t)}function $_(t=Ve()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function B_(t=Ve()){return/crios\//i.test(t)}function H_(t=Ve()){return/iemobile/i.test(t)}function j_(t=Ve()){return/android/i.test(t)}function V_(t=Ve()){return/blackberry/i.test(t)}function W_(t=Ve()){return/webos/i.test(t)}function Xu(t=Ve()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function jN(t=Ve()){return Xu(t)&&!!window.navigator?.standalone}function VN(){return nS()&&document.documentMode===10}function q_(t=Ve()){return Xu(t)||j_(t)||W_(t)||V_(t)||/windows phone/i.test(t)||H_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z_(t,e=[]){let n;switch(t){case"Browser":n=Hf(Ve());break;case"Worker":n=`${Hf(Ve())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ci}/${s}`}/**
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
 */class WN{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function qN(t,e={}){return fi(t,"GET","/v2/passwordPolicy",Yu(t,e))}/**
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
 */const zN=6;class GN{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??zN,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let i=0;i<e.length;i++)s=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,i,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KN{constructor(e,n,s,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new jf(this),this.idTokenSubscription=new jf(this),this.beforeStateQueue=new WN(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=L_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Bt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Ps.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Do(this,{idToken:e}),s=await gt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ut(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(r){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return P(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Mo(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=RN()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ut(this.app))return Promise.reject(Gn(this));const n=e?ae(e):null;return n&&P(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&P(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ut(this.app)?Promise.reject(Gn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ut(this.app)?Promise.reject(Gn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Bt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await qN(this),n=new GN(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Dn("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await HN(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Bt(e)||this._popupRedirectResolver;P(n,this,"argument-error"),this.redirectPersistenceManager=await Ps.create(this,[Bt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,i){if(this._deleted)return()=>{};const r=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(P(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,i);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return P(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=z_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(ut(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&TN(`Error while retrieving App Check token: ${e.error}`),e?.token}}function pi(t){return ae(t)}class jf{constructor(e){this.auth=e,this.observer=null,this.addObserver=dS(n=>this.observer=n)}get next(){return P(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function YN(t){Qu=t}function JN(t){return Qu.loadJS(t)}function XN(){return Qu.gapiScript}function QN(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZN(t,e){const n=Mn(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),r=n.getOptions();if(Zn(r,e??{}))return i;Ot(i,"already-initialized")}return n.initialize({options:e})}function eP(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(Bt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function tP(t,e,n){const s=pi(t);P(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const i=!1,r=G_(e),{host:o,port:a}=nP(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!s._canInitEmulator){P(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),P(Zn(l,s.config.emulator)&&Zn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,oi(o)?(xg(`${r}//${o}${c}`),Fg("Auth",!0)):sP()}function G_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function nP(t){const e=G_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(s);if(i){const r=i[1];return{host:r,port:Vf(s.substr(r.length+1))}}else{const[r,o]=s.split(":");return{host:r,port:Vf(o)}}}function Vf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function sP(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return $t("not implemented")}_getIdTokenResponse(e){return $t("not implemented")}_linkToIdToken(e,n){return $t("not implemented")}_getReauthenticationResolver(e){return $t("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ls(t,e){return LN(t,"POST","/v1/accounts:signInWithIdp",Yu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iP="http://localhost";class rs extends K_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new rs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ot("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:i,...r}=n;if(!s||!i)return null;const o=new rs(s,i);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Ls(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Ls(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Ls(e,n)}buildRequest(){const e={requestUri:iP,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ai(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Lr extends Zu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn extends Lr{constructor(){super("facebook.com")}static credential(e){return rs._fromParams({providerId:cn.PROVIDER_ID,signInMethod:cn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return cn.credentialFromTaggedObject(e)}static credentialFromError(e){return cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return cn.credential(e.oauthAccessToken)}catch{return null}}}cn.FACEBOOK_SIGN_IN_METHOD="facebook.com";cn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Lr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return rs._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Rt.credential(n,s)}catch{return null}}}Rt.GOOGLE_SIGN_IN_METHOD="google.com";Rt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln extends Lr{constructor(){super("github.com")}static credential(e){return rs._fromParams({providerId:ln.PROVIDER_ID,signInMethod:ln.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ln.credentialFromTaggedObject(e)}static credentialFromError(e){return ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ln.credential(e.oauthAccessToken)}catch{return null}}}ln.GITHUB_SIGN_IN_METHOD="github.com";ln.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un extends Lr{constructor(){super("twitter.com")}static credential(e,n){return rs._fromParams({providerId:un.PROVIDER_ID,signInMethod:un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return un.credentialFromTaggedObject(e)}static credentialFromError(e){return un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return un.credential(n,s)}catch{return null}}}un.TWITTER_SIGN_IN_METHOD="twitter.com";un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,i=!1){const r=await gt._fromIdTokenResponse(e,s,i),o=Wf(s);return new Zs({user:r,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const i=Wf(s);return new Zs({user:e,providerId:i,_tokenResponse:s,operationType:n})}}function Wf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo extends en{constructor(e,n,s,i){super(n.code,n.message),this.operationType=s,this.user=i,Object.setPrototypeOf(this,xo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,i){return new xo(e,n,s,i)}}function Y_(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?xo._fromErrorAndOperation(t,r,e,s):r})}async function rP(t,e,n=!1){const s=await rr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Zs._forOperation(t,"link",s)}/**
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
 */async function oP(t,e,n=!1){const{auth:s}=t;if(ut(s.app))return Promise.reject(Gn(s));const i="reauthenticate";try{const r=await rr(t,Y_(s,i,e,t),n);P(r.idToken,s,"internal-error");const o=Ju(r.idToken);P(o,s,"internal-error");const{sub:a}=o;return P(t.uid===a,s,"user-mismatch"),Zs._forOperation(t,i,r)}catch(r){throw r?.code==="auth/user-not-found"&&Ot(s,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J_(t,e,n=!1){if(ut(t.app))return Promise.reject(Gn(t));const s="signIn",i=await Y_(t,s,e),r=await Zs._fromIdTokenResponse(t,s,i);return n||await t._updateCurrentUser(r.user),r}async function aP(t,e){return J_(pi(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc(t,e){return ae(t).setPersistence(e)}function cP(t,e,n,s){return ae(t).onIdTokenChanged(e,n,s)}function lP(t,e,n){return ae(t).beforeAuthStateChanged(e,n)}function X_(t,e,n,s){return ae(t).onAuthStateChanged(e,n,s)}function uP(t){return ae(t).signOut()}async function dP(t){return ae(t).delete()}const Fo="__sak";/**
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
 */class Q_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Fo,"1"),this.storage.removeItem(Fo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hP=1e3,fP=10;class Z_ extends Q_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=q_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),i=this.localCache[n];s!==i&&e(n,i,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},r=this.storage.getItem(s);VN()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,fP):i()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},hP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Z_.type="LOCAL";const ey=Z_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty extends Q_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}ty.type="SESSION";const ny=ty;/**
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
 */function pP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Ia{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const s=new Ia(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:i,data:r}=n.data,o=this.handlersMap[i];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:i});const a=Array.from(o).map(async l=>l(n.origin,r)),c=await pP(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:i,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ia.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class gP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=ed("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:i,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(){return window}function mP(t){Nt().location.href=t}/**
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
 */function sy(){return typeof Nt().WorkerGlobalScope<"u"&&typeof Nt().importScripts=="function"}async function _P(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function yP(){return navigator?.serviceWorker?.controller||null}function wP(){return sy()?self:null}/**
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
 */const iy="firebaseLocalStorageDb",vP=1,Uo="firebaseLocalStorage",ry="fbase_key";class Or{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ka(t,e){return t.transaction([Uo],e?"readwrite":"readonly").objectStore(Uo)}function bP(){const t=indexedDB.deleteDatabase(iy);return new Or(t).toPromise()}function bl(){const t=indexedDB.open(iy,vP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Uo,{keyPath:ry})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Uo)?e(s):(s.close(),await bP(),e(await bl()))})})}async function qf(t,e,n){const s=ka(t,!0).put({[ry]:e,value:n});return new Or(s).toPromise()}async function EP(t,e){const n=ka(t,!1).get(e),s=await new Or(n).toPromise();return s===void 0?null:s.value}function zf(t,e){const n=ka(t,!0).delete(e);return new Or(n).toPromise()}const CP=800,TP=3;class oy{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await bl(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>TP)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return sy()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ia._getInstance(wP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await _P(),!this.activeServiceWorker)return;this.sender=new gP(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||yP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await bl();return await qf(e,Fo,"1"),await zf(e,Fo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>qf(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>EP(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>zf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const r=ka(i,!1).getAll();return new Or(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:i,value:r}of e)s.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(r)&&(this.notifyListeners(i,r),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!s.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const i of Array.from(s))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),CP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}oy.type="LOCAL";const ay=oy;new Pr(3e4,6e4);/**
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
 */function cy(t,e){return e?Bt(e):(P(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class td extends K_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ls(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Ls(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Ls(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function SP(t){return J_(t.auth,new td(t),t.bypassAuthState)}function IP(t){const{auth:e,user:n}=t;return P(n,e,"internal-error"),oP(n,new td(t),t.bypassAuthState)}async function kP(t){const{auth:e,user:n}=t;return P(n,e,"internal-error"),rP(n,new td(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ly{constructor(e,n,s,i,r=!1){this.auth=e,this.resolver=s,this.user=i,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:i,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:r||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return SP;case"linkViaPopup":case"linkViaRedirect":return kP;case"reauthViaPopup":case"reauthViaRedirect":return IP;default:Ot(this.auth,"internal-error")}}resolve(e){Jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RP=new Pr(2e3,1e4);async function AP(t,e,n){if(ut(t.app))return Promise.reject(yt(t,"operation-not-supported-in-this-environment"));const s=pi(t);SN(t,e,Zu);const i=cy(s,n);return new Wn(s,"signInViaPopup",e,i).executeNotNull()}class Wn extends ly{constructor(e,n,s,i,r){super(e,n,i,r),this.provider=s,this.authWindow=null,this.pollId=null,Wn.currentPopupAction&&Wn.currentPopupAction.cancel(),Wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return P(e,this.auth,"internal-error"),e}async onExecution(){Jt(this.filter.length===1,"Popup operations only handle one event");const e=ed();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(yt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(yt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(yt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,RP.get())};e()}}Wn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NP="pendingRedirect",so=new Map;class PP extends ly{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=so.get(this.auth._key());if(!e){try{const s=await LP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}so.set(this.auth._key(),e)}return this.bypassAuthState||so.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function LP(t,e){const n=MP(e),s=DP(t);if(!await s._isAvailable())return!1;const i=await s._get(n)==="true";return await s._remove(n),i}function OP(t,e){so.set(t._key(),e)}function DP(t){return Bt(t._redirectPersistence)}function MP(t){return no(NP,t.config.apiKey,t.name)}async function xP(t,e){return await pi(t)._initializationPromise,uy(t,e,!1)}async function uy(t,e,n=!1){if(ut(t.app))return Promise.reject(Gn(t));const s=pi(t),i=cy(s,e),o=await new PP(s,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FP=600*1e3;class UP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!$P(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!dy(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(yt(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=FP&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gf(e))}saveEventToCache(e){this.cachedEventUids.add(Gf(e)),this.lastProcessedEventTime=Date.now()}}function Gf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function dy({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function $P(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return dy(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BP(t,e={}){return fi(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,jP=/^https?/;async function VP(t){if(t.config.emulator)return;const{authorizedDomains:e}=await BP(t);for(const n of e)try{if(WP(n))return}catch{}Ot(t,"unauthorized-domain")}function WP(t){const e=yl(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!jP.test(n))return!1;if(HP.test(t))return s===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(s)}/**
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
 */const qP=new Pr(3e4,6e4);function Kf(){const t=Nt().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function zP(t){return new Promise((e,n)=>{function s(){Kf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Kf(),n(yt(t,"network-request-failed"))},timeout:qP.get()})}if(Nt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Nt().gapi?.load)s();else{const i=QN("iframefcb");return Nt()[i]=()=>{gapi.load?s():n(yt(t,"network-request-failed"))},JN(`${XN()}?onload=${i}`).catch(r=>n(r))}}).catch(e=>{throw io=null,e})}let io=null;function GP(t){return io=io||zP(t),io}/**
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
 */const KP=new Pr(5e3,15e3),YP="__/auth/iframe",JP="emulator/auth/iframe",XP={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},QP=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function ZP(t){const e=t.config;P(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Ku(e,JP):`https://${t.config.authDomain}/${YP}`,s={apiKey:e.apiKey,appName:t.name,v:ci},i=QP.get(t.config.apiHost);i&&(s.eid=i);const r=t._getFrameworks();return r.length&&(s.fw=r.join(",")),`${n}?${ai(s).slice(1)}`}async function e0(t){const e=await GP(t),n=Nt().gapi;return P(n,t,"internal-error"),e.open({where:document.body,url:ZP(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:XP,dontclear:!0},s=>new Promise(async(i,r)=>{await s.restyle({setHideOnLeave:!1});const o=yt(t,"network-request-failed"),a=Nt().setTimeout(()=>{r(o)},KP.get());function c(){Nt().clearTimeout(a),i(s)}s.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const t0={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},n0=500,s0=600,i0="_blank",r0="http://localhost";class Yf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function o0(t,e,n,s=n0,i=s0){const r=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...t0,width:s.toString(),height:i.toString(),top:r,left:o},l=Ve().toLowerCase();n&&(a=B_(l)?i0:n),U_(l)&&(e=e||r0,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(jN(l)&&a!=="_self")return a0(e||"",a),new Yf(null);const d=window.open(e||"",a,u);P(d,t,"popup-blocked");try{d.focus()}catch{}return new Yf(d)}function a0(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const c0="__/auth/handler",l0="emulator/auth/handler",u0=encodeURIComponent("fac");async function Jf(t,e,n,s,i,r){P(t.config.authDomain,t,"auth-domain-config-required"),P(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:ci,eventId:i};if(e instanceof Zu){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",mo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Lr){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${u0}=${encodeURIComponent(c)}`:"";return`${d0(t)}?${ai(a).slice(1)}${l}`}function d0({config:t}){return t.emulator?Ku(t,l0):`https://${t.authDomain}/${c0}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="webStorageSupport";class h0{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ny,this._completeRedirectFn=uy,this._overrideRedirectResult=OP}async _openPopup(e,n,s,i){Jt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Jf(e,n,s,yl(),i);return o0(e,r,ed())}async _openRedirect(e,n,s,i){await this._originValidation(e);const r=await Jf(e,n,s,yl(),i);return mP(r),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:r}=this.eventManagers[n];return i?Promise.resolve(i):(Jt(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await e0(e),s=new UP(e);return n.register("authEvent",i=>(P(i?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(wc,{type:wc},i=>{const r=i?.[0]?.[wc];r!==void 0&&n(!!r),Ot(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=VP(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return q_()||$_()||Xu()}}const f0=h0;var Xf="@firebase/auth",Qf="1.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){P(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g0(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function m0(t){ct(new et("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;P(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:z_(t)},l=new KN(s,i,r,c);return eP(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),ct(new et("auth-internal",e=>{const n=pi(e.getProvider("auth").getImmediate());return(s=>new p0(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qe(Xf,Qf,g0(t)),Qe(Xf,Qf,"esm2020")}/**
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
 */const _0=300,y0=Mg("authIdTokenMaxAge")||_0;let Zf=null;const w0=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>y0)return;const i=n?.token;Zf!==i&&(Zf=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function v0(t=aa()){const e=Mn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=ZN(t,{popupRedirectResolver:f0,persistence:[ay,ey,ny]}),s=Mg("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(s,location.origin);if(location.origin===r.origin){const o=w0(r.toString());lP(n,o,()=>o(n.currentUser)),cP(n,a=>o(a))}}const i=Og("auth");return i&&tP(n,`http://${i}`),n}function b0(){return document.getElementsByTagName("head")?.[0]??document}YN({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=i=>{const r=yt("internal-error");r.customData=i,n(r)},s.type="text/javascript",s.charset="UTF-8",b0().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});m0("Browser");const E0=()=>!1,C0=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},G=(...t)=>{},T0=(...t)=>{localStorage.getItem("debug:console")},S0="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",Fi=new Set;function I0(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function k0(t){return G("[ONE TAP] Callback registered, total callbacks:",Fi.size+1),Fi.add(t),()=>Fi.delete(t)}function Cs(t){G("[ONE TAP] Notifying status:",t,"to",Fi.size,"callbacks"),Fi.forEach(e=>{try{e(t)}catch{}})}function Hn(){if(Hn.retryCount||(Hn.retryCount=0),typeof google>"u"||!google.accounts?.id){if(Hn.retryCount++,Hn.retryCount>50)return;setTimeout(()=>Hn(),100);return}Hn.retryCount=0,I0(),google.accounts.id.initialize({client_id:S0,callback:R0,auto_select:!1,cancel_on_tap_outside:!1,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function nd(){if(rd()){Cs("not_needed");return}window.google?.accounts?.id&&(Cs("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?Cs("skipped"):e==="dismissed"?Cs("dismissed"):e==="display"&&Cs("displayed")}))}async function R0(t){try{G("[ONE TAP] Received credential, signing in with Firebase..."),Cs("signing_in");const e=Rt.credential(t.credential),n=await aP(Be,e);G("[ONE TAP] ✅ Successfully signed in:",n.user.email),or(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}function A0(){typeof google<"u"&&google.accounts?.id&&google.accounts.id.cancel()}let El=!1;async function N0(){const t=M();if(!t||El)return;const e=b(E,`users/${t}/presence`);try{await ne(e,{state:"online",lastChanged:En()}),await c_(e).set({state:"offline",lastSeen:En(),lastChanged:En()}),El=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function hy(){const t=M();if(!t)return;const e=b(E,`users/${t}/presence`);try{await ne(e,{state:"offline",lastSeen:En(),lastChanged:En()}),El=!1}catch(n){console.error("Failed to set offline:",n)}}function Ra(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");const e=t.toLowerCase().trim();let n="";for(const i of new TextEncoder().encode(e))n+=String.fromCharCode(i);return btoa(n).replace(/\//g,"-")}async function fy(t){if(!t||!t.uid||!t.email)throw new Error("Invalid user: must have uid and email");const e=Ra(t.email),n=b(E,`usersByEmail/${e}`),s={uid:t.uid,displayName:t.displayName||"Anonymous",photoURL:t.photoURL||null,registeredAt:Date.now()};try{await ne(n,s),console.log("[USER DISCOVERY] Registered user in directory:",t.email)}catch(i){throw console.error("[USER DISCOVERY] Failed to register user:",i),i}}async function py(t){if(!t||typeof t!="string")return null;try{const e=Ra(t),n=b(E,`usersByEmail/${e}`),s=await Me(n);return s.exists()?s.val():null}catch(e){return console.error("[USER DISCOVERY] Failed to find user by email:",e),null}}async function gy(t){if(!Array.isArray(t))throw new Error("Invalid emails: must be an array");const e={},n=t.map(async s=>{const i=await py(s);e[s]=i});return await Promise.all(n),e}async function P0(t){if(!t||typeof t!="string")throw new Error("Invalid email: must be a non-empty string");try{const e=Ra(t),n=b(E,`usersByEmail/${e}`),{remove:s}=await fe(async()=>{const{remove:i}=await Promise.resolve().then(()=>p_);return{remove:i}},void 0);await s(n),console.log("[USER DISCOVERY] Removed user from directory:",t)}catch(e){throw console.error("[USER DISCOVERY] Failed to remove user from directory:",e),e}}const L0=Object.freeze(Object.defineProperty({__proto__:null,findUserByEmail:py,findUsersByEmails:gy,hashEmail:Ra,registerUserInDirectory:fy,removeUserFromDirectory:P0},Symbol.toStringTag,{value:"Module"}));async function O0(t){if(!t?.uid)return;const e=b(E,`users/${t.uid}/profile`);try{await ne(e,{displayName:t.displayName||null,photoURL:t.photoURL||null})}catch(n){console.error("Failed to save user profile:",n)}}async function sd(t){if(!t)return null;try{const e=await Me(b(E,`users/${t}/profile`));return e.exists()?e.val():null}catch(e){return console.error("Failed to fetch user profile:",e),null}}const Be=v0(Ta);async function D0(){const t=Be.currentUser;return t?t.getIdToken(!1):null}const M0=typeof import.meta<"u"&&!0;function id(t,e,n={}){const s=typeof window<"u"?window.location.origin:"n/a";M0?console.error(`[AUTH] ${t}:`,{code:e?.code||"unknown",message:e?.message||String(e),origin:s,...n}):console.error(`[AUTH] ${t}:`,e,n,{origin:s})}const my=(async()=>{try{await yc(Be,ay)}catch{try{await yc(Be,ey)}catch{await yc(Be,vl)}}try{(await xP(Be))?.user&&G("[AUTH] ✅ Sign-in completed (via Safari fallback)")}catch(t){G("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Hn(),nd()},500)})();let _y=!1;function or(t){_y=t}function x0(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}function yy(){const t=typeof window<"u"&&window.matchMedia?.("(display-mode: standalone)").matches,e=typeof navigator<"u"&&navigator.standalone===!0,n=t||e,s=/iphone|ipad|ipod/i.test(navigator.userAgent||"");return{isStandalonePWA:n,isIOS:s,isIOSStandalone:n&&s}}function F0(t){const e=t?.code||"unknown",n=t?.message||String(t);if(e==="auth/popup-closed-by-user"||e==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}const{isIOSStandalone:s}=yy();if((e==="auth/network-request-failed"||e==="auth/popup-blocked")&&s){console.warn(`[AUTH] ${e} inside iOS standalone PWA. Arming Safari fallback.`),or(!0),alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(e==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const i=t?.customData?.email;if(id("Google sign-in",t,{email:i?"<redacted>":void 0}),e==="auth/unauthorized-domain"){const r=typeof window<"u"?window.location.origin:"",o=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",r?`• ${r}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];r&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(r).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${o.join(`
`)}`);return}alert(`Sign-in failed: ${n}`)}let Ci=null;const U0=()=>Math.random().toString(36).substring(2,15),Cl="guestUser",$0=2880*60*1e3;function B0(){try{const t=typeof localStorage<"u"?localStorage.getItem(Cl):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(Cl)}catch{}return null}return e}catch{return null}}function H0(t,e=$0){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(Cl,JSON.stringify(s))}catch{}return s}function de(){const t=M();if(t)return t;if(!Ci){const e=B0();e&&e.id?Ci=e.id:(Ci=U0(),H0(Ci))}return Ci}function Nn(){return Be.currentUser}function rd(){return Be.currentUser!==null}function M(){return Be.currentUser?.uid??null}function wy(){return new Promise(t=>{const e=X_(Be,n=>{e(),t(n)})})}function od(t,{truncate:e=7}={}){return X_(Be,n=>{const s=!!n,i=n?.displayName||"Guest User",r=typeof i=="string"&&i.length>e?i.slice(0,e)+"...":i;s?(N0().catch(o=>{console.warn("Failed to initialize presence:",o)}),O0(n).catch(o=>{console.warn("Failed to save user profile:",o)}),fy(n).catch(o=>{console.warn("Failed to register user in directory:",o)})):Aa();try{t({user:n,isLoggedIn:s,userName:r})}catch{}})}const $o=async()=>{const t=new Rt;t.setCustomParameters({prompt:"select_account"});const{isIOSStandalone:e}=yy();try{if(e&&_y){G("[AUTH] Using Safari external fallback"),or(!1),x0();return}G("[AUTH] Starting popup sign-in flow...");const n=await AP(Be,t);return G("[AUTH] Popup sign-in successful:",n.user.email),or(!1),n}catch(n){F0(n)}};async function vy(){try{await hy(),Aa(),await uP(Be),console.info("User signed out"),setTimeout(()=>nd(),1500)}catch(t){throw id("Sign out",t),t}}async function by(){const t=Be.currentUser;if(!t)throw new Error("No user logged in");const e=t.uid;try{console.info("[AUTH] Starting account deletion for user:",e),await hy(),Aa();const{ref:n,remove:s}=await fe(async()=>{const{ref:r,remove:o}=await Promise.resolve().then(()=>p_);return{ref:r,remove:o}},void 0),{rtdb:i}=await fe(async()=>{const{rtdb:r}=await Promise.resolve().then(()=>EN);return{rtdb:r}},void 0);console.info("[AUTH] Cleaning up user data from RTDB...");try{await s(n(i,`users/${e}`))}catch(r){console.warn("[AUTH] Failed to remove user node from RTDB:",r)}try{const{FCMTransport:r}=await fe(async()=>{const{FCMTransport:a}=await Promise.resolve().then(()=>eM);return{FCMTransport:a}},void 0);await new r().deleteToken()}catch(r){console.warn("[AUTH] Failed to delete FCM token:",r)}if(t.email)try{const{removeUserFromDirectory:r}=await fe(async()=>{const{removeUserFromDirectory:o}=await Promise.resolve().then(()=>L0);return{removeUserFromDirectory:o}},void 0);await r(t.email)}catch(r){console.warn("[AUTH] Failed to remove user from discovery directory:",r)}console.info("[AUTH] Deleting Firebase Auth account..."),await dP(t),console.info("[AUTH] Account deleted successfully"),setTimeout(()=>nd(),1500)}catch(n){throw id("Delete account",n),n.code==="auth/requires-recent-login"?new Error("For security, please sign out and sign in again before deleting your account."):n}}const ep="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",j0=6e4,ar={};function V0(t){const e=ar[t];return e&&Date.now()<e.expiresAt?e.token:(delete ar[t],null)}function W0(t,e,n){const s=n>0?n:3600;ar[t]={token:e,expiresAt:Date.now()+s*1e3-j0}}function Aa(){for(const t in ar)delete ar[t]}function Ey(t,e,{interactive:n=!1}={}){const s=V0(t);return s?(console.log(`[AUTH] Using cached ${t} token`),Promise.resolve(s)):new Promise((i,r)=>{if(typeof google>"u"||!google.accounts?.oauth2){r(new Error("Google Identity Services not loaded"));return}const a=Nn()?.email||void 0;function c(d,h){if(d.error){if(h){console.log(`[AUTH] Silent ${t} token failed (${d.error}), trying interactive...`),h();return}console.error(`[AUTH] ${t} token request error:`,d.error),d.error==="access_denied"?r(new Error("Authorization cancelled")):r(new Error(d.error_description||d.error));return}if(!d.access_token){r(new Error("No access token received"));return}console.log(`[AUTH] ${t} access granted`),W0(t,d.access_token,d.expires_in||3600),i(d.access_token)}function l(){console.log(`[AUTH] Requesting ${t} access via interactive popup...`),google.accounts.oauth2.initTokenClient({client_id:ep,scope:e,hint:a,callback:h=>c(h,null),error_callback:h=>{console.error(`[AUTH] ${t} interactive error:`,h),h.type==="popup_closed"?r(new Error("Authorization cancelled")):r(new Error(h.message||"Authorization failed"))}}).requestAccessToken()}if(n){l();return}console.log(`[AUTH] Attempting silent ${t} token acquisition...`),google.accounts.oauth2.initTokenClient({client_id:ep,scope:e,hint:a,callback:d=>c(d,l),error_callback:()=>{console.log(`[AUTH] Silent ${t} error_callback, trying interactive...`),l()}}).requestAccessToken({prompt:"none"})})}function Cy(){return Ey("contacts","https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/contacts.other.readonly")}function Ty(){return Ey("gmail-send","https://www.googleapis.com/auth/gmail.send",{interactive:!0})}const Na=Object.freeze(Object.defineProperty({__proto__:null,auth:Be,authReady:my,clearGISTokenCache:Aa,deleteAccount:by,getCurrentUser:Nn,getCurrentUserAsync:wy,getLoggedInUserId:M,getLoggedInUserToken:D0,getUserId:de,isLoggedIn:rd,onAuthChange:od,requestContactsAccess:Cy,requestGmailSendAccess:Ty,setSafariExternalOpenArmed:or,signInWithAccountSelection:$o,signOutUser:vy},Symbol.toStringTag,{value:"Module"}));function Pa(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}class q0{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}async addReaction(e,n,s){throw new Error("MessagingTransport.addReaction() must be implemented by subclass")}async removeReaction(e,n,s){throw new Error("MessagingTransport.removeReaction() must be implemented by subclass")}async getReactions(e,n){throw new Error("MessagingTransport.getReactions() must be implemented by subclass")}}const tp=100;class z0 extends q0{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const s=M();if(!s)throw new Error("Cannot send message: not logged in");const r=Nn()?.displayName||"Guest User",o=this._getConversationId(s,e),a=Xs(b(E,`conversations/${o}/messages`));await ne(a,{text:n,from:s,fromName:r,sentAt:En(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}async writeCallEventMessage(e,n,s={}){const i=M();if(!i)throw new Error("Cannot write call event: not logged in");const r=this._getConversationId(i,e),o=Xs(b(E,`conversations/${r}/messages`));await ne(o,{type:"call_event",eventType:n,callId:s.roomId||null,callerId:s.callerId||i,callerName:s.callerName||"Someone",from:i,sentAt:En(),read:!1}),this._cleanupOldMessages(r).catch(a=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",a)})}listen(e,n){const s=M();if(!s)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const i=this._getConversationId(s,e),r=b(E,`conversations/${i}/messages`),o=new Set,a=l=>{const u=l.key,d=l.val();if(!d||o.has(u))return;o.add(u);const h=d.from===s,f={...d,messageId:u};n(d.text,f,h)},c=l=>{const u=l.key,d=l.val();if(!(!d||!o.has(u))&&d.reactions!==void 0){const h=d.from===s,f={...d,messageId:u,_reactionUpdate:!0};n(d.text,f,h)}};return Qs(r,a),hl(r,c),()=>{ft(r,"child_added",a),ft(r,"child_changed",c)}}async getUnreadCount(e){const n=M();if(!n)return 0;const s=this._getConversationId(n,e),i=b(E,`conversations/${s}/messages`);try{const r=await Me(i);if(!r.exists())return 0;const o=r.val();return Object.values(o).filter(a=>!a.read&&a.from===e).length}catch(r){return console.warn("[RTDBTransport] Failed to get unread count:",r),0}}async markAsRead(e){const n=M();if(!n)return;const s=this._getConversationId(n,e),i=b(E,`conversations/${s}/messages`);try{const r=await Me(i);if(!r.exists())return;const o=r.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${s}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await bn(b(E),a)}catch(r){console.warn("[RTDBTransport] Failed to mark messages as read:",r)}}listenToUnreadCount(e,n){const s=M();if(!s)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const i=this._getConversationId(s,e),r=b(E,`conversations/${i}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return Qs(r,a),hl(r,c),()=>{ft(r,"child_added",a),ft(r,"child_changed",c)}}async _cleanupOldMessages(e){const n=b(E,`conversations/${e}/messages`),s=await Me(n);if(!s.exists())return;const i=s.val(),r=Object.keys(i).length;if(r<=tp)return;const o=r-tp,a=Object.entries(i).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await bn(b(E),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}async addReaction(e,n,s){const i=M();if(!i)throw new Error("Cannot add reaction: not logged in");const o=`conversations/${this._getConversationId(i,e)}/messages/${n}/reactions/${s}/${i}`;await ne(b(E,o),!0)}async removeReaction(e,n,s){const i=M();if(!i)throw new Error("Cannot remove reaction: not logged in");const o=`conversations/${this._getConversationId(i,e)}/messages/${n}/reactions/${s}/${i}`;await ne(b(E,o),null)}async getReactions(e,n){const s=M();if(!s)return{};const i=this._getConversationId(s,e),r=b(E,`conversations/${i}/messages/${n}/reactions`);try{const o=await Me(r);if(!o.exists())return{};const a=o.val(),c={};for(const[l,u]of Object.entries(a))c[l]=Object.keys(u);return c}catch(o){return console.warn("[RTDBTransport] Failed to get reactions:",o),{}}}async hasMyReaction(e,n,s){const i=M();if(!i)return!1;const o=`conversations/${this._getConversationId(i,e)}/messages/${n}/reactions/${s}/${i}`;try{return(await Me(b(E,o))).exists()}catch{return!1}}}class G0{constructor(e,n=null){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.fileTransport=n,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:s}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.info(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const i=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&s&&typeof s=="function"&&this.transport.getUnreadCount(e).then(l=>s(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),r={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},addReaction:(o,a)=>this.transport.addReaction(e,o,a),removeReaction:(o,a)=>this.transport.removeReaction(e,o,a),hasMyReaction:(o,a)=>this.transport.hasMyReaction(e,o,a),getReactions:o=>this.transport.getReactions(e,o),_unsubscribe:i};return this.sessions.set(e,r),r}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}async sendCallEventMessage(e,n,s={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(!n||typeof n!="string")throw new Error("eventType must be a non-empty string");return this.transport.writeCallEventMessage(e,n,s)}setFileTransport(e){this.fileTransport=e}canSendFiles(){return this.fileTransport!==null&&this.fileTransport.isReady()}async sendFile(e,n){if(!this.fileTransport)throw new Error("File transport not available. Files can only be sent during active calls.");if(!this.fileTransport.isReady())throw new Error("File transport not ready");return this.fileTransport.sendFile(e,n)}onFileReceived(e){if(!this.fileTransport)throw new Error("File transport not available");if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransport.onFileReceived(e)}clearFileTransport(){this.fileTransport&&(this.fileTransport.cleanup(),this.fileTransport=null)}}const Pt=new G0(new z0);function cr(t,e){if(!t||!e)throw new Error("Both user IDs are required");if(t===e)throw new Error("Cannot create room ID for same user");const[n,s]=[t,e].sort(),i=`${n}_${s}`;let r=0;for(let u=0;u<i.length;u++){const d=i.charCodeAt(u);r=(r<<5)-r+d,r=r&r}let o=5381;for(let u=0;u<i.length;u++)o=(o<<5)+o+i.charCodeAt(u);const a=Math.abs(r).toString(36),c=Math.abs(o).toString(36);return(a+c).slice(0,16).padEnd(16,"0")}class K0{constructor(e,{loop:n=!1,volume:s=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,s)),this.isPlaying=!1,this.audio.onerror=i=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,i),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class Y0{constructor({incomingSrc:e,outgoingSrc:n,volume:s}={}){const i="/HangVidU/";this.incomingSrc=e??`${i}sounds/incoming.mp3`,this.outgoingSrc=n??`${i}sounds/outgoing.mp3`,this.defaultVolume=s??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:s}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),s!==void 0&&(this.defaultVolume=s)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new K0(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const s=await this.currentPlayer.play();return s?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),s}catch(s){return console.error(`[Ringtone] Error playing ${e} ringtone:`,s),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const Kn=new Y0,lr=new WeakMap;function ad(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(lr.has(t)||lr.set(t,[]),e==="initiator")np(t,"offerCandidates",n),sp(t,"answerCandidates",n);else if(e==="joiner")np(t,"answerCandidates",n),sp(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function np(t,e,n){t.onicecandidate=s=>{if(s.candidate){const i=Xs(e==="offerCandidates"?Wu(n):qu(n));ne(i,s.candidate.toJSON())}}}function sp(t,e,n){const s=e==="offerCandidates"?Wu(n):qu(n);let i=!1;const r=()=>{if(i)return;i=!0;const a=()=>{t.remoteDescription&&(cd(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};an(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=lr.get(t);l&&(l.push(c),l.length===1&&r())}},n)}function cd(t){if(!t||!lr.has(t))return;const e=lr.get(t);if(e.length!==0){G(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{G("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const J0=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:cd,setupIceCandidates:ad},Symbol.toStringTag,{value:"Module"}));class Os{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const i={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(i),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,i={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...i})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,i={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...i})}logNotificationDecision(e,n,s,i={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...i})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,i={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...i})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,i={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...i})}logMemberJoinEvent(e,n,s,i={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...i})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,i={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...i})}logFreshnessValidation(e,n,s,i={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...i})}logRaceCondition(e,n,s,i={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...i})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),i=document.createElement("a");i.href=URL.createObjectURL(s),i.download=e,i.click(),URL.revokeObjectURL(i.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const i=new Set(this.logs.map(o=>o.id)),r=s.logs.filter(o=>!i.has(o.id));return this.logs=[...this.logs,...r].sort((o,a)=>o.timestamp-a.timestamp),r.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;Os.getPersistedLogKeys().forEach(i=>{try{const r=localStorage.getItem(i);if(r){const o=JSON.parse(r);o.exportTime&&o.exportTime<n&&localStorage.removeItem(i)}}catch{localStorage.removeItem(i)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(i=>i.category==="TIMING"&&i.event==="START"&&i.data.timingId===e);if(s){const i=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:i,operation:s.data.operation,...n}),i}return null}}let vc=null;function v(){return vc||(vc=new Os),vc}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>v(),exportLogs:()=>{const e=v().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{v().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=v().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=v().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=v().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=v().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=v().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=v().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=v().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=Os.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{v().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{v().enable(),console.log("Diagnostic logging enabled")},disable:()=>{v().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=v(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=v();t.logs.length>0&&t.persistLogs(),Os.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=v(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=Os.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class X0{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const i=Date.now();s||(s=Math.random().toString(36).substring(2,15)),v().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:i});const r=on(s);try{return await ne(r,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),v().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-i}),await this.joinRoom(s,n),v().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-i}),s}catch(o){throw v().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-i}),o}}async checkRoomStatus(e){const n=on(e),s=await Me(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const i=s.val(),r=i.members||{},o=Object.keys(r).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:i}}async getRoomData(e){const n=on(e),s=await Me(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=on(e);await bn(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const i=_l(e,n);await ne(i,{displayName:s,joinedAt:Date.now()}),v().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const i=n||this.currentRoomId;if(!i||!e)return;const r=_l(i,e),o=Ri(i),a=on(i);try{await tt(r)}catch(c){v().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:i,userId:e})}if(s)try{const c=await Me(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await tt(a).catch(d=>{v().logFirebaseOperation("delete_empty_room",!1,d,{roomId:i})})}catch(c){v().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:i})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const i=on(e),r={rejection:{by:n,reason:s,at:Date.now()}};try{await bn(i,r),v().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw v().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const i=on(e),r={cancellation:{by:n,reason:s,at:Date.now()}};try{await bn(i,r),v().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw v().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=A_(e);an(s,"value",n,e),v().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=Ri(e);an(s,"child_added",n,e),v().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=Ri(e);an(s,"child_removed",n,e),v().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const i=Ri(e),r=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return an(i,"child_added",r,e,n),an(i,"child_removed",o,e,n),()=>R_(n,e)}get roomId(){return this.currentRoomId}}const he=new X0,Xt={view:"lobby",currentMedia:"none",setView(t){t!==this.view&&(this.view=t,document.body.dataset.view=t)},setMainContent(t){t!==this.currentMedia&&(this.currentMedia=t,document.body.dataset.mainContent=t)}};document.body.dataset.view=Xt.view;document.body.dataset.mainContent=Xt.currentMedia;const Tl=3e4;let Ft=null,Ai=null;async function Q0(t,e=null){const n=de(),s=M();if(!s)return;const i=Vu(s);await ne(i,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function Bo(){const t=M();if(!t)return;const e=Vu(t);await tt(e).catch(()=>{})}async function Sy(t){if(!t)return!1;try{const e=b(E,`rooms/${t}/createdAt`),n=await Me(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<Tl}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Z0(t,e,n){const s=v(),i=Date.now();Yn(),await Q0(t,e),Xt.setView("calling");const r=document.createElement("div");r.id="calling-modal",r.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-i});try{await Promise.all([Bo(),he.cancelCall(t,de(),"caller_cancelled"),he.leaveRoom(de(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}Kn.stop(),Yn(),n&&n()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),r.appendChild(o),document.body.appendChild(r),r.dataset.roomId=t,Ft=r,Kn.playOutgoing(),Ai=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-i,timeoutMs:Tl});try{await Promise.all([Bo(),he.cancelCall(t,de(),"auto_timeout"),he.leaveRoom(de(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}Kn.stop(),Yn(),n&&n()},Tl)}function Yn(){if(Kn.stop(),Xt.view==="calling"&&Xt.setView("lobby"),Ft){const t=Ft.dataset?.roomId||"unknown";v().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!Ai,timestamp:Date.now()})}Ai&&(clearTimeout(Ai),Ai=null),Ft&&(Ft.remove(),Ft=null)}async function ld(){if(Ft){const t=Ft.dataset?.roomId||"unknown";v().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await Bo(),Yn()}async function eL(t="user_rejected"){const e=v(),n=Ft?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await Bo(),Yn()}const Iy=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:Yn,isRoomCallFresh:Sy,onCallAnswered:ld,onCallRejected:eL,showCallingUI:Z0},Symbol.toStringTag,{value:"Module"})),Q=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let Ze=null,ms=null,La=null,ud=null,nt=null,Se=null,ye=null,Fe=null,j=null,He=null,ot=null,Ke=null,wt=null,gi=null,ky=null,vt=null,Oa=null,Pn=null,mi=null,_i=null,os=null,dd=null,hd=null,fd=null,pd=null,Ds=null,ur=null,gd=null;function ip(){Ze=Q("lobby"),ms=Q("lobby-call-btn"),La=Q("title-auth-bar"),ud=Q("videos"),nt=Q("local-video-el"),Se=Q("local-video-box"),ye=Q("remote-video-el"),Fe=Q("remote-video-box"),j=Q("shared-video-el"),He=Q("shared-video-box"),ot=Q("chat-controls"),Ke=Q("call-btn"),wt=Q("hang-up-btn"),gi=Q("switch-camera-btn"),vt=Q("mute-btn"),Oa=Q("fullscreen-partner-btn"),Pn=Q("remote-pip-btn"),mi=Q("mic-btn"),_i=Q("camera-btn"),os=Q("exit-watch-mode-btn"),dd=Q("app-pip-btn"),hd=Q("app-title-h1"),fd=Q("app-title-a"),pd=Q("app-title-span"),Ds=Q("paste-join-btn"),ur=Q("add-contact-btn"),gd=Q("test-notifications-btn")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ip):ip();const Ry=()=>({lobbyDiv:Ze,lobbyCallBtn:ms,titleAuthBar:La,videosWrapper:ud,localVideoEl:nt,localBoxEl:Se,remoteVideoEl:ye,remoteBoxEl:Fe,sharedVideoEl:j,sharedBoxEl:He,chatControls:ot,callBtn:Ke,hangUpBtn:wt,switchCameraBtn:gi,installBtn:ky,mutePartnerBtn:vt,fullscreenPartnerBtn:Oa,remotePipBtn:Pn,micBtn:mi,cameraBtn:_i,exitWatchModeBtn:os,appPipBtn:dd,appTitleH1:hd,appTitleA:fd,appTitleSpan:pd,pasteJoinBtn:Ds,addContactBtn:ur,testNotificationsBtn:gd});function Ay(t,e=3,n=100){return new Promise(s=>{let i=0;const r=()=>{const o=document.getElementById(t);if(o){s(o);return}if(i++,i>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(r,n)};r()})}async function Ny(t,e=3,n=100){const s={},i=t.map(async r=>{const o=await Ay(r,e,n);return s[r]=o,o});return await Promise.all(i),s}async function tL(){const t=await Ny(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,i])=>!i).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const nL=Object.freeze(Object.defineProperty({__proto__:null,get addContactBtn(){return ur},get appPipBtn(){return dd},get appTitleA(){return fd},get appTitleH1(){return hd},get appTitleSpan(){return pd},get callBtn(){return Ke},get cameraBtn(){return _i},get chatControls(){return ot},get exitWatchModeBtn(){return os},get fullscreenPartnerBtn(){return Oa},getElements:Ry,get hangUpBtn(){return wt},initializeYouTubeElements:tL,installBtn:ky,get lobbyCallBtn(){return ms},get lobbyDiv(){return Ze},get localBoxEl(){return Se},get localVideoEl(){return nt},get micBtn(){return mi},get mutePartnerBtn(){return vt},get pasteJoinBtn(){return Ds},get remoteBoxEl(){return Fe},get remotePipBtn(){return Pn},get remoteVideoEl(){return ye},robustElementAccess:Ay,get sharedBoxEl(){return He},get sharedVideoEl(){return j},get switchCameraBtn(){return gi},get testNotificationsBtn(){return gd},get titleAuthBar(){return La},get videosWrapper(){return ud},waitForElements:Ny},Symbol.toStringTag,{value:"Module"})),md=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Ui=t=>{if(md(t))return t.classList.contains("hidden")},H=t=>{md(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},C=t=>{md(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},Py=t=>t.classList.contains("small-frame"),dr=t=>{if(t&&!Py(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},Ln=t=>{if(Py(t)){t.classList.remove("small-frame"),t.classList.remove("closed");const e=t.querySelector(".small-frame-toggle-div");e&&e.remove()}};function _d(t){return document.pictureInPictureElement===t}function sL(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}async function Ly(t,e){if(!t||!e)return"small-frame";if(_d(t))return Ln(e),"already-pip";if(!sL())return dr(e),H(e),"small-frame";try{return await t.requestPictureInPicture(),Ln(e),"pip"}catch(n){return console.warn("Failed to enter Picture-in-Picture:",n),dr(e),H(e),"small-frame"}}async function Da(t){try{if(t&&!_d(t))return;document.pictureInPictureElement&&await document.exitPictureInPicture()}catch(e){console.warn("Failed to exit Picture-in-Picture:",e)}}function iL(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:i=null,hideOnEsc:r=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(g=>!Array.isArray(o)||!o.includes(g));function u(){H(t);try{typeof s=="function"&&s()}catch(g){console.warn("showHideOnInactivity onShow callback error:",g)}a&&clearTimeout(a),a=setTimeout(()=>{C(t);try{typeof i=="function"&&i()}catch(g){console.warn("showHideOnInactivity onHide callback error:",g)}a=null},e)}l.forEach(g=>n.addEventListener(g,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{C(t)}catch(g){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",g)}}else u()}document.addEventListener("visibilitychange",d);function h(g){if(!g.relatedTarget){a&&(clearTimeout(a),a=null),C(t);try{typeof i=="function"&&i()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(g){if(r&&(g.key==="Escape"||g.key==="Esc")){a&&(clearTimeout(a),a=null),C(t);try{typeof i=="function"&&i()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),C(t);function m(){l.forEach(g=>n.removeEventListener(g,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return m}let Ht=null,jt=null,Oy="user";function Dy(){return Oy}function My(t){Oy=t}function Ma(){return Ht instanceof MediaStream}function yd(){return!Ht||!(Ht instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",Ht),null):Ht}function xy(t){Ht=t}function Fy(){Ht&&(Ht.getTracks().forEach(t=>t.stop()),Ht=null)}function Uy(){return jt instanceof MediaStream}function xa(){return!jt||!(jt instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",jt),console.error("Call createLocalStream() before accessing local stream."),null):jt}function Ho(t){jt=t}function $y(){jt&&(jt.getTracks().forEach(t=>t.stop()),jt=null)}const rL=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:$y,cleanupRemoteStream:Fy,getFacingMode:Dy,getLocalStream:xa,getRemoteStream:yd,hasLocalStream:Uy,hasRemoteStream:Ma,setFacingMode:My,setLocalStream:Ho,setRemoteStream:xy},Symbol.toStringTag,{value:"Module"})),rp="yt-video-box",Sl="yt-player-root";let ie=null,tn=!1;const $i=()=>ie,oL=()=>tn,By=t=>tn=t,Ms=()=>{const t=document.getElementById(rp);if(!t)throw new Error(`Container #${rp} not found`);return t};function aL(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function Hy(){const t=Ms();if(!document.getElementById(Sl)){const e=document.createElement("div");e.id=Sl,t.appendChild(e)}H(t)}function jo(){const t=Ms();C(t)}function bc(){const t=Ms();return t&&!t.classList.contains("hidden")}function Il(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function jy(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function cL({url:t,onReady:e,onStateChange:n}){const s=jy(t);if(!s)throw new Error("Invalid YouTube URL");if(await aL(),ie){try{ie.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}ie=null}const i=(o=!0)=>{const a=Ms(),c=ie.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Ms(),h=ie.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),ie.getPlayerState()!==window.YT.PlayerState.PLAYING?vd():Dr()}};document.addEventListener("keydown",l,{once:!0})}}},r=()=>{const o=Ms(),a=ie.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return Hy(),new Promise((o,a)=>{try{ie=new window.YT.Player(Sl,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{tn=!0,e&&e(c),o(ie)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&i(!1),c.data===window.YT.PlayerState.PAUSED&&i(),c.data===window.YT.PlayerState.PLAYING&&r(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function wd(){if(ie){try{jo(),ie.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}ie=null,tn=!1}}function vd(){ie&&tn&&ie.playVideo()}function Dr(){ie&&tn&&ie.pauseVideo()}function lL(t){ie&&tn&&ie.seekTo(t,!0)}function Vo(){return ie&&tn?ie.getCurrentTime():0}function bd(){return ie&&tn?ie.getPlayerState():-1}const mn={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},Vy=()=>{if(!Ma())return!1;const t=yd();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function uL(){as()||(qy(!0),C(Ze),C(ms),ot.classList.remove("bottom"),ot.classList.add("watch-mode"),Rl()?(C(Ke),H(wt)):(C(wt),C(mi),C(vt),H(Ke)),C(_i),C(gi),H(os),H(ot),Rl()&&(C(Se),Ln(Se),C(Fe),Ly(ye,Fe)))}function dL(){as()&&(C(os),H(Ke),H(wt),H(mi),H(vt),H(_i),H(gi),ot.classList.remove("watch-mode"),ot.classList.add("bottom"),H(ot),Vy()&&(Da(ye),Ln(Fe),H(Fe)),Rl()?(dr(Se),H(Se)):(H(Ze),H(ms),Ln(Se),C(Se)),qy(!1))}function Wo(){Xt.setMainContent("ytVideo"),uL()}function Bi(){Xt.setMainContent("remoteStream"),dL()}let Ne=null,Qt=null,Wy=!1,bt="none",Hi=null,at=null;const as=()=>Wy,qy=t=>Wy=t,It=()=>bt,hL=t=>{["yt","url","file","none"].includes(t)?bt=t:console.warn("Invalid lastWatched platform:",t)};let _n=!1,ji=null,xs=0,Ec=!1;async function Fs(t){if(!Ne)return;console.debug("Updating watch sync state, roomId:",Ne);const e=Ar(Ne);try{await bn(e,{...t,updatedBy:Qt})}catch(n){console.error("Failed to update watch state:",n)}}function fL(t,e,n){if(!t)return;Ne=t,Qt=n;const s=Ar(t),i=Nr(t);As(s,_L,t),As(i,mL,t),TL()}function Ed(t){return typeof t=="string"&&t.startsWith("blob:")}async function pL(t,e){if(!Ne||!Qt)return!1;const n=Nr(Ne);try{return await ne(n,{fileName:t,requestedBy:Qt,timestamp:Date.now()}),at&&clearTimeout(at),at=setTimeout(()=>{kl()},300*1e3),!0}catch(s){return console.error("Failed to create watch request:",s),!1}}async function gL(t){if(!Ne)return!1;const e=Nr(Ne);try{await tt(e)}catch(n){console.warn("Failed to remove watch request:",n)}return at&&(clearTimeout(at),at=null),await hr(t)}async function kl(){if(!Ne)return;at&&(clearTimeout(at),at=null);const t=Nr(Ne);try{await tt(t)}catch(e){console.warn("Failed to cancel watch request:",e)}}function mL(t){const e=t.val();if(!e){at&&(clearTimeout(at),at=null);return}e.requestedBy!==Qt&&window.onFileWatchRequestReceived&&window.onFileWatchRequestReceived(e.fileName)}function _L(t){const e=t.val();e&&e.updatedBy!==Qt&&(Date.now()-xs<500||(e.url&&e.url!==Hi&&!Ed(e.url)&&yL(e.url),e.isYouTube?wL(e):CL(e)))}function yL(t){Hi=t,Il(t)?(C(He),zy(t),bt="yt"):(wd(),H(He),j.src=t,bt="url"),Wo()}function wL(t){!$i()||!oL()||(vL(t),bL(t))}function vL(t){const e=bd(),n=e===mn.PLAYING;if([mn.BUFFERING,mn.UNSTARTED].includes(e)){EL();return}_n||(t.playing&&!n?(vd(),bt="yt"):!t.playing&&n&&(Dr(),bt="yt"))}function bL(t){if(t.currentTime===void 0)return;const e=Vo();Math.abs(e-t.currentTime)>.3&&!_n&&(lL(t.currentTime),setTimeout(()=>{t.playing?vd():Dr(),bt="yt"},500))}function EL(){_n=!0,clearTimeout(ji),ji=setTimeout(async()=>{_n=!1;const t=bd()===mn.PLAYING;await Fs({playing:t,currentTime:Vo()})},700)}function CL(t){xs=Date.now(),t.playing!==void 0&&(t.playing&&j.paused?j.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!j.paused&&j.pause()),t.currentTime!==void 0&&Math.abs(j.currentTime-t.currentTime)>1&&(j.currentTime=t.currentTime,t.playing?j.play().catch(n=>console.warn("Play failed:",n)):j.pause())}function TL(){const t=()=>{bt!=="file"&&(bt="url")};j.addEventListener("play",async()=>{!$i()&&Ne&&(xs=Date.now(),await Fs({playing:!0,currentTime:j.currentTime,isYouTube:!1})),t()}),j.addEventListener("pause",async()=>{j.seeking||(!$i()&&Ne&&(xs=Date.now(),console.log("[SYNC DEBUG] Local pause event:",{currentTime:j.currentTime}),await Fs({playing:!1,currentTime:j.currentTime,isYouTube:!1})),t())}),j.addEventListener("playing",()=>{Ec=!0}),j.addEventListener("pause",()=>{j.seeking||(Ec=!1)},!0),j.addEventListener("seeked",async()=>{!$i()&&Ne&&(xs=Date.now(),await Fs({currentTime:j.currentTime,playing:Ec,isYouTube:!1})),t()})}async function SL(t){if(!t)return!1;xs=Date.now();const e=Ed(t);if(Il(t)){if(C(He),!await zy(t))return!1;bt="yt"}else wd(),H(He),j.src=t,bt=e?"file":"url";if(Ne){const n=Ar(Ne);e?await ne(n,{playing:!1,currentTime:0,isYouTube:!1,updatedBy:Qt}):ne(n,{url:t,playing:!1,currentTime:0,isYouTube:Il(t),updatedBy:Qt})}return Wo(),!0}async function hr(t){let e;if(t instanceof File){if(!t.type.startsWith("video/"))return console.warn("Invalid file type:",t.type),!1;e=URL.createObjectURL(t)}else if(typeof t=="string")e=t;else if(t?.url)e=t.url;else return console.warn("Invalid video source:",t),!1;Hi=e;const n=await SL(e);return n||Ed(Hi)&&t instanceof File&&(URL.revokeObjectURL(e),Hi=null),n}async function zy(t){if(!jy(t))return console.error("Invalid YouTube URL:",t),!1;try{return await cL({url:t,onReady:n=>{if(By(!0),Ne){const s=Ar(Ne);ne(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Qt})}},onStateChange:async n=>{if(!$i())return;const i=n.data===mn.PLAYING,r=n.data===mn.PAUSED;if(n.data===mn.BUFFERING){_n=!0,ji&&clearTimeout(ji),ji=setTimeout(async()=>{_n=!1;const c=bd()===mn.PLAYING;await Fs({playing:c,currentTime:Vo()})},700);return}r&&_n||!_n&&(i||r)&&await Fs({playing:i,currentTime:Vo()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}let Us=!1,zr=!1,op=null,ap=null,Vi=null;const Rl=()=>Us,Gy=()=>{if(!Us){if(!ye||!Ma()||ye.paused||ye.readyState<2){zr||(zr=!0,ye.addEventListener("playing",()=>{zr=!1,Gy()},{once:!0}));return}if(zr=!1,Us=!0,H(Fe),H(Se),dr(Se),C(Ze),C(ms),Ke.disabled=!0,Ke.classList.add("disabled"),wt.disabled=!1,wt.classList.remove("disabled"),vt.disabled=!1,vt.classList.remove("disabled"),Pn.disabled=!1,Pn.classList.remove("disabled"),Vi||(Vi=iL(ot,{inactivityMs:2500,hideOnEsc:!0})),!op){const t=()=>{Us&&(as()?dr(Fe):Ln(Fe),H(Fe))};ye.addEventListener("leavepictureinpicture",t),op=()=>ye.removeEventListener("leavepictureinpicture",t)}if(!ap){const t=()=>C(Fe);ye.addEventListener("enterpictureinpicture",t),ap=()=>ye.removeEventListener("enterpictureinpicture",t)}}},IL=()=>{Us&&(Us=!1,Da(ye),Ln(Se),C(Se),Ln(Fe),C(Fe),C(ot),Vi&&(Vi(),Vi=null),as()||H(Ze),Ke.disabled=!1,Ke.classList.remove("disabled"),wt.disabled=!0,wt.classList.add("disabled"),vt.disabled=!0,vt.classList.add("disabled"),Pn.disabled=!0,Pn.classList.add("disabled"))};function Ky(){Xt.setView("connected"),Gy()}function Yy(){Xt.setView("lobby"),IL()}let St=null,cp=null;function Jy(t){cp=t,t.onconnectionstatechange=()=>{G("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Ky(),ld().catch(e=>console.warn("Failed to clear calling state on connect:",e)),St&&(clearTimeout(St),St=null)):t.connectionState==="disconnected"?(St&&clearTimeout(St),St=setTimeout(()=>{t===cp&&t.connectionState==="disconnected"&&Ie.cleanupCall({reason:"connection_lost"}),St=null},3e3)):t.connectionState==="failed"&&(Pa(),St&&(clearTimeout(St),St=null),Ie.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{G("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Cd={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Cc=new WeakMap;function Xy(t,e,n){Cc.has(t)||Cc.set(t,{});const s=Cc.get(t),i=e==="offer"?"lastOffer":"lastAnswer";return s[i]===n?!0:(s[i]=n,!1)}function Qy(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Td(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Zy(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function ew(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function tw(t,e,n){if(Xy(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Qy(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function nw(){return Math.random().toString(36).substring(2,9)}const kL=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Td,createAnswer:ew,createOffer:Zy,generateRoomId:nw,isDuplicateSdp:Xy,isValidSignalingState:Qy,rtcConfig:Cd,setRemoteDescription:tw},Symbol.toStringTag,{value:"Module"}));async function RL({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:i,targetRoomId:r=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Cd),a="initiator",c=r||nw(),l=de();Td(o,t);const u=o.createDataChannel("files");if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};ad(o,a,c),Jy(o);const h=await Zy(o);await he.createNewRoom(h,l,c),i(c,a,l);const f=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:f,dataChannel:u,role:a}}async function AL({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:i,setupWatchSync:r,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await he.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await he.getRoomData(t)}catch(g){return G("Error: "+g.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Cd),d="joiner",h=de();Td(u,e);let f=null;if(u.ondatachannel=g=>{f=g.channel,G("[Call Flow] DataChannel received by joiner",{label:f.label})},!i(u,n,s))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};ad(u,d,t),Jy(u),await tw(u,l,cd);const m=await ew(u);try{await he.saveAnswer(t,m)}catch(g){return console.error("Failed to save answer to Firebase:",g),u.close(),{success:!1}}return r(t,d,h),await he.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,role:d}}class NL{async sendFile(e,n){throw new Error("FileTransport.sendFile() must be implemented by subclass")}onFileReceived(e){throw new Error("FileTransport.onFileReceived() must be implemented by subclass")}onReceiveProgress(e){throw new Error("FileTransport.onReceiveProgress() must be implemented by subclass")}isReady(){throw new Error("FileTransport.isReady() must be implemented by subclass")}cleanup(){throw new Error("FileTransport.cleanup() must be implemented by subclass")}}const PL={FILE_CONFIG:{NETWORK_CHUNK_SIZE:65536}};async function LL(t){if(t instanceof ArrayBuffer)return t;if(t instanceof Blob)try{return await t.arrayBuffer()}catch(e){return console.error("[ChunkProcessor] Blob conversion failed:",e),null}else if(t instanceof Uint8Array||ArrayBuffer.isView(t))try{const e=t instanceof Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),n=new ArrayBuffer(e.length);return new Uint8Array(n).set(e),n}catch(e){return console.error("[ChunkProcessor] TypedArray conversion failed:",e),null}else return console.error("[ChunkProcessor] Unknown data type:",Object.prototype.toString.call(t)),null}function OL(t){try{if(t.byteLength<4)return console.error("[ChunkProcessor] Invalid embedded packet - too small:",t.byteLength),null;const s=new DataView(t).getUint32(0,!0),i=4+s;if(t.byteLength<i)return console.error("[ChunkProcessor] Incomplete embedded packet - expected:",i,"got:",t.byteLength),null;const r=new Uint8Array(t,4,s),o=new TextDecoder().decode(r),a=JSON.parse(o),c=4+s,l=t.slice(c);return{chunkMeta:a,chunkData:l}}catch(e){return console.error("[ChunkProcessor] Failed to parse embedded packet:",e),null}}const DL=1024;function ML(t,e,n){let s=0,i=0;const r=[];t.forEach((c,l)=>{c instanceof ArrayBuffer?(i++,s+=c.byteLength):r.push(l)});const o=e-s;return{isComplete:i===n&&Math.abs(o)<=DL,validChunks:i,totalSize:s,missingChunks:r,sizeDifference:o}}const Tc=PL.FILE_CONFIG.NETWORK_CHUNK_SIZE,lp=5e3;class xL{constructor(e){this.dataChannel=e,this.receivedChunks=new Map,this.fileMetadata=new Map,this.onFileError=null,this.onReceiveProgress=null}async sendFile(e,n){if(e.size>lp*1024*1024)throw new Error(`File too large (max ${lp} MB)`);if(this.dataChannel.readyState!=="open")throw new Error("DataChannel not ready");const s=`${e.name}-${e.size}-${Date.now()}`,i=Math.ceil(e.size/Tc);this.dataChannel.send(JSON.stringify({type:"FILE_META",fileId:s,name:e.name,size:e.size,mimeType:e.type,totalChunks:i}));for(let r=0;r<i;r++){const o=r*Tc,a=Math.min(o+Tc,e.size),c=await e.slice(o,a).arrayBuffer(),l={type:"FILE_CHUNK",fileId:s,chunkIndex:r,totalChunks:i},u=new TextEncoder().encode(JSON.stringify(l)),d=new ArrayBuffer(4+u.length+c.byteLength),h=new Uint8Array(d);for(new DataView(d).setUint32(0,u.length,!0),h.set(u,4),h.set(new Uint8Array(c),4+u.length),this.dataChannel.send(d),n&&n((r+1)/i);this.dataChannel.bufferedAmount>256*1024;)await new Promise(p=>setTimeout(p,10))}}async handleMessage(e){if(typeof e=="string"){const n=JSON.parse(e);n.type==="FILE_META"&&(this.fileMetadata.set(n.fileId,n),this.receivedChunks.set(n.fileId,[]),this.onFileMetaReceived?.(n))}else{const n=await LL(e);if(!n){console.error("[FileTransfer] Failed to convert binary data to ArrayBuffer");return}const s=OL(n);if(!s){console.error("[FileTransfer] Failed to parse embedded chunk packet");return}const{chunkMeta:i,chunkData:r}=s,o=this.receivedChunks.get(i.fileId);if(!o){console.error("[FileTransfer] Received chunk for unknown file:",i.fileId);return}if(o[i.chunkIndex]=r,this.onReceiveProgress){const a=o.filter(c=>c).length;this.onReceiveProgress(a/i.totalChunks)}o.filter(a=>a).length===i.totalChunks&&this.assembleFile(i.fileId)}}assembleFile(e){const n=this.fileMetadata.get(e),s=this.receivedChunks.get(e),i=ML(s,n.size,n.totalChunks);if(!i.isComplete){console.error("[FileTransfer] File assembly failed:",{fileId:e,fileName:n.name,...i}),this.onFileError&&this.onFileError({fileName:n.name,reason:"incomplete",details:i});return}const r=new Blob(s,{type:n.mimeType}),o=new File([r],n.name,{type:n.mimeType});this.onFileReceived?.(o),this.receivedChunks.delete(e),this.fileMetadata.delete(e)}}class FL extends NL{constructor(e){if(super(),!e)throw new Error("WebRTCFileTransport requires a DataChannel");this.dataChannel=e,this.fileTransfer=new xL(e),this._setupMessageHandling()}_setupMessageHandling(){this.dataChannel.onmessage=e=>{if(typeof e.data=="string")try{const n=JSON.parse(e.data);if(n.type==="FILE_META"||n.type==="FILE_CHUNK"){this.fileTransfer.handleMessage(e.data);return}}catch{}else this.fileTransfer.handleMessage(e.data)}}async sendFile(e,n){if(!this.isReady())throw new Error("DataChannel not ready");return this.fileTransfer.sendFile(e,n)}onFileReceived(e){if(typeof e!="function")throw new Error("onFileReceived callback must be a function");this.fileTransfer.onFileReceived=e}onReceiveProgress(e){if(typeof e!="function")throw new Error("onReceiveProgress callback must be a function");this.fileTransfer.onReceiveProgress=e}isReady(){return this.dataChannel&&this.dataChannel.readyState==="open"}cleanup(){this.dataChannel&&(this.dataChannel.onmessage=null),this.fileTransfer&&(this.fileTransfer.onFileReceived=null,this.fileTransfer.onFileMetaReceived=null),this.dataChannel=null,this.fileTransfer=null}}function fr(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:i=!0,events:r=["mousedown","touchstart"],ignoreInputBlur:o=!1}=n,a=()=>{let f=n.ignore||[];return typeof f=="function"&&(f=f()),Array.isArray(f)?f.filter(Boolean):[]};let c=!1;const l=f=>{try{const p=f.target;if(t.contains(p))return;const m=a();for(const g of m)if(g&&g.contains&&g.contains(p)||g===p)return;if(o&&c&&!(p.tagName==="INPUT"||p.tagName==="TEXTAREA"||p.isContentEditable)){c=!1;return}e(f)}catch(p){console.error("closeOnClickOutside handler error:",p)}},u=f=>{i&&f.key==="Escape"&&e(f)},d=()=>{c=!0},h=()=>{setTimeout(()=>{c=!1},0)};return r.forEach(f=>document.addEventListener(f,l,{passive:!0})),i&&document.addEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(p=>{p.addEventListener("focus",d),p.addEventListener("blur",h)}),function(){r.forEach(p=>document.removeEventListener(p,l,{passive:!0})),i&&document.removeEventListener("keydown",u),o&&t.querySelectorAll("input, textarea, [contenteditable]").forEach(m=>{m.removeEventListener("focus",d),m.removeEventListener("blur",h)})}}function Is(t,{name:e="",photoURL:n="",customFallbackText:s=null,imageClass:i="sender-avatar--image"}={}){if(!t)return;const r=s||(e?e[0].toUpperCase():"U");n?(t.style.backgroundImage=`url("${n}")`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.classList.add(i),t.textContent=""):(t.style.backgroundImage="",t.style.backgroundSize="",t.style.backgroundPosition="",t.classList.remove(i),t.textContent=r)}const UL=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),$L=/\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g,BL=(t,e)=>t.replace($L,(n,s,i)=>{const r=(s??i).trim(),o=r.split(".").reduce((c,l)=>c?.[l],e);return o==null?"":r.endsWith("Html")?String(o):UL(String(o))}),HL=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=BL(t,e),n.content.cloneNode(!0)},jL=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const i=s.parentElement;if(!i)break;const r=Array.prototype.indexOf.call(i.children,s);n.push(r),s=i}return n.reverse()},VL=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),WL=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:jL(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),qL=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),zL=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const i=t.querySelectorAll("input[name], textarea[name], select[name]");for(const r of i)if(r.getAttribute("name")===n.name){s=r;break}}else if(n.id)try{s=t.querySelector("#"+qL(n.id))}catch{s=t.querySelector(`#${n.id}`)}else n.path&&(s=VL(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},GL=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),KL=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},YL=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=KL(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},JL=()=>document.readyState!=="loading";function st(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Fa=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:i="div",className:r="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!JL())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(i);r&&(u.className=r);let d={...t};const h=new Set,f=/\[\[([^\]]+)\]\]|\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const w=(p[1]||p[2]).trim().split(".")[0];h.add(w)}const m=[],g=[],T={},B=()=>{let w=[],F=[];l&&(w=WL(u),F=GL(u)),u.textContent="";const W=HL(e,d);u.appendChild(W),Object.keys(n).forEach(Le=>{const pe=u.querySelectorAll(`[onclick="${Le}"]`),Re=n[Le];pe.forEach(nn=>{nn.removeAttribute("onclick"),typeof Re=="function"&&nn.addEventListener("click",Re)})}),l&&(zL(u,w),YL(u,F)),m.forEach(Le=>Le({...d}))},N=w=>{if(!Array.isArray(w)||w.length===0)return;const F={props:{...d},changedKeys:w};g.forEach(W=>W(F))};for(const w of Object.keys(t))T[w]=[],Object.defineProperty(u,w,{get(){return d[w]},set(F){d[w]!==F&&(d[w]=F,h.has(w)&&B(),T[w].forEach(W=>W(F)),N([w]))},configurable:!0,enumerable:!0});if(u.update=w=>{let F=!1,W=!1;const Le=[];for(const pe in w)w[pe]!==d[pe]&&(d[pe]=w[pe],h.has(pe)&&(W=!0),T[pe]&&T[pe].forEach(Re=>Re(w[pe])),F=!0,Le.push(pe));F&&W&&B(),Le.length>0&&N(Le)},u.onRender=w=>{typeof w=="function"&&m.push(w)},u.onAnyPropUpdated=w=>{typeof w=="function"&&g.push(w)},u.onPropUpdated=(w,F)=>{typeof F=="function"&&T[w]&&T[w].push(F)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(w=>{typeof w=="function"&&w()}):typeof a=="function"&&a()),m.length=0,g.length=0;for(const w in T)T[w].length=0;u.remove()},B(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(w){T0("[createComponent]: Error in onMount handler of component",w)}return u};function sw({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:s=0,id:i=null,startHidden:r=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=Fa({initialProps:{icon:n,unreadCount:s},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          [[icon]]
          <span class="notification-badge">
            [[unreadCount]]
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(r?" hidden":""),autoAppend:!1});if(i&&o&&typeof i=="string")try{o.id=i}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=s>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function up(t=!1){if(typeof window>"u"||typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.vendor||"",n=/iPad|iPhone|iPod/.test(e),s=/Macintosh/.test(e)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,i=(n||s)&&!window.MSStream,r=/Android/i.test(e),o=i||r;return t&&console.table({"User Agent":e,isAndroid:r,isiOSUA:n,isiPadOSDesktopUA:s,isMobileDevice:o}),o}function XL(t){if(!t)return null;let e=String(t).trim();if(!e)return null;/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(e)||(e="http://"+e);let n="",s=null;try{s=new URL(e,window.location&&window.location.origin?window.location.origin:void 0),n=s.protocol}catch{const o=e.match(/^([a-zA-Z][a-zA-Z0-9+.-]*:)/);n=o?o[1].toLowerCase():""}if(s&&!s.hostname)return null;const i=n.toLowerCase();return i!=="http:"&&i!=="https:"?null:e}function QL(t){const e=document.createDocumentFragment();if(!t)return e;const n=/((?:https?:\/\/|www\.)[^\s<>]+\.[^\s<>]+)/g;let s=0,i;for(;(i=n.exec(t))!==null;){const r=i[0],o=i.index;o>s&&e.appendChild(document.createTextNode(t.slice(s,o)));const a=r.replace(/[.,!?:;\)\]\}]+$/g,""),c=r.slice(a.length),l=XL(a);if(!l)e.appendChild(document.createTextNode(r));else{const u=document.createElement("a");u.href=l,u.textContent=a,u.target="_blank",u.rel="noopener noreferrer",u.className="message-link",e.appendChild(u),c&&e.appendChild(document.createTextNode(c))}s=o+r.length}return s<t.length&&e.appendChild(document.createTextNode(t.slice(s))),e}const Al={heart:"❤️",thumbsUp:"👍",laugh:"😂"},Jn={doubleTapDelay:300,longPressDelay:500,defaultReaction:"heart",maxReactionsPerMessage:0,enableAnimations:!0};function dp(t){return Al[t]||Al.heart}function ZL(){return{...Al}}class eO{constructor(){this.reactions=new Map}addReaction(e,n=Jn.defaultReaction,s){if(!e)throw new Error("messageId is required");this.reactions.has(e)||this.reactions.set(e,{});const i=this.reactions.get(e);return i[n]||(i[n]=new Set),s?i[n].add(s):i[n].add(`_anon_${Date.now()}_${Math.random()}`),this.getReactions(e)}removeReaction(e,n=Jn.defaultReaction,s){if(!e)throw new Error("messageId is required");const i=this.reactions.get(e);if(!i)return{};const r=i[n];if(!r||r.size===0)return this.getReactions(e);if(s)r.delete(s);else{console.debug("[ReactionManager] removeReaction called without userId - using legacy fallback");const o=r.values().next().value;o&&r.delete(o)}return r.size===0&&delete i[n],Object.keys(i).length===0&&this.reactions.delete(e),this.getReactions(e)}hasUserReaction(e,n,s){const i=this.reactions.get(e);return!i||!i[n]?!1:i[n].has(s)}getUserReactionType(e,n){const s=this.reactions.get(e);if(!s)return null;for(const[i,r]of Object.entries(s))if(r.has(n))return i;return null}getReactions(e){const n=this.reactions.get(e);if(!n)return{};const s={};for(const[i,r]of Object.entries(n))s[i]=r.size;return s}syncFromRemote(e,n){if(!e)throw new Error("messageId is required");if(this.reactions.delete(e),!n||Object.keys(n).length===0)return;const s={};for(const[i,r]of Object.entries(n))Array.isArray(r)&&r.length>0&&(s[i]=new Set(r));Object.keys(s).length>0&&this.reactions.set(e,s)}hasReactions(e){const n=this.reactions.get(e);return!!(n&&Object.keys(n).length>0)}getReactionCount(e,n){const s=this.reactions.get(e);return!s||!s[n]?0:s[n].size}clearReactions(e){this.reactions.delete(e)}clearAll(){this.reactions.clear()}}class tO{constructor(e){this.reactionManager=e,this.doubleTapTimers=new Map,this.longPressTimers=new Map,this.activePicker=null,this.activePickerMessageElement=null,this.pickerJustShown=!1}enableDoubleTap(e,n,s){if(!e||!n){console.warn("[ReactionUI] Invalid parameters for enableDoubleTap");return}const i="ontouchstart"in window,r=i?"touchend":"click",o=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=Date.now(),d=this.doubleTapTimers.get(e);d&&u-d<Jn.doubleTapDelay?(l.preventDefault(),this.handleDoubleTap(e,n,s),this.doubleTapTimers.delete(e)):this.doubleTapTimers.set(e,u)},a=l=>{if(l.target.tagName==="A"||l.target.tagName==="BUTTON")return;const u=setTimeout(()=>{this.showPicker(e,n,s)},Jn.longPressDelay);this.longPressTimers.set(e,u)},c=()=>{const l=this.longPressTimers.get(e);l&&(clearTimeout(l),this.longPressTimers.delete(e),this.activePicker||(e.style.userSelect="",e.style.webkitUserSelect=""))};e.addEventListener(r,o,{passive:!1}),i?(e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",c,{passive:!0}),e.addEventListener("touchmove",c,{passive:!0}),e.addEventListener("touchcancel",c,{passive:!0})):(e.addEventListener("mousedown",a),e.addEventListener("mouseup",c),e.addEventListener("mouseleave",c)),e._reactionCleanup=()=>{e.removeEventListener(r,o),i?(e.removeEventListener("touchstart",a),e.removeEventListener("touchend",c),e.removeEventListener("touchmove",c),e.removeEventListener("touchcancel",c)):(e.removeEventListener("mousedown",a),e.removeEventListener("mouseup",c),e.removeEventListener("mouseleave",c)),this.doubleTapTimers.delete(e),c()}}async handleDoubleTap(e,n,s){const i=Jn.defaultReaction;s&&await s(i,e,n,"doubleTap")}renderReactions(e,n,s){let i=e.querySelector(".message-reactions");if(!i){i=document.createElement("div"),i.className="message-reactions";const o=e.querySelector(".message-text");o?o.appendChild(i):e.appendChild(i)}if(i.innerHTML="",!Object.values(s).some(o=>o>0)){i.style.display="none";return}i.style.display="";for(const[o,a]of Object.entries(s))if(a>0){const c=this.createReactionBadge(o);i.appendChild(c)}}createReactionBadge(e){const n=document.createElement("span");return n.className="reaction-badge",n.dataset.reactionType=e,n.textContent=dp(e),n}showReactionAnimation(e,n){const s=dp(n),i=document.createElement("div");i.className="reaction-animation",i.textContent=s;const r=e.getBoundingClientRect();i.style.position="fixed",i.style.left=`${r.left+r.width/2}px`,i.style.top=`${r.top+r.height/2}px`,document.body.appendChild(i),setTimeout(()=>{i.remove()},1e3)}showPicker(e,n,s){this.hidePicker();const i=document.createElement("div");i.className="reaction-picker";const r=ZL();for(const[a,c]of Object.entries(r)){const l=document.createElement("button");l.type="button",l.className="reaction-picker-btn",l.textContent=c,l.dataset.reactionType=a,l.addEventListener("click",async u=>{u.stopPropagation(),s&&await s(a,e,n,"picker"),this.hidePicker()}),i.appendChild(l)}const o=e.getBoundingClientRect();i.style.position="fixed",i.style.left=`${o.left+o.width/2}px`,i.style.top=`${o.top-8}px`,document.body.appendChild(i),this.activePicker=i,this.activePickerMessageElement=e,this.pickerJustShown=!0,setTimeout(()=>{this.pickerCleanup=fr(i,()=>{if(this.pickerJustShown){this.pickerJustShown=!1;return}this.hidePicker()})},0)}hidePicker(){this.activePicker&&(this.activePicker.remove(),this.activePicker=null,this.activePickerMessageElement&&(this.activePickerMessageElement.style.userSelect="",this.activePickerMessageElement.style.webkitUserSelect="",this.activePickerMessageElement=null)),this.pickerCleanup&&(this.pickerCleanup(),this.pickerCleanup=null),this.pickerJustShown=!1}cleanup(e){e._reactionCleanup&&e._reactionCleanup()}}function Ua(t,e={}){const{duration:n=3e3,type:s="info",position:i="bottom",onClick:r}=e,o=document.createElement("div");o.className=`toast toast-${s} toast-${i}`,o.textContent=t,r&&(o.classList.add("toast-clickable"),o.addEventListener("click",()=>{r(),c()})),document.body.appendChild(o),requestAnimationFrame(()=>{o.classList.add("toast-show")});let a=!1;function c(){a||(a=!0,o.classList.remove("toast-show"),setTimeout(()=>o.remove(),300))}setTimeout(c,n)}function $a(t,e={}){Ua(t,{...e,type:"success"})}function nO(t,e={}){Ua(t,{...e,type:"error"})}function Nl(t,e={}){Ua(t,{...e,type:"info"})}function sO(t,e={}){Ua(t,{...e,type:"warning"})}function iO(){const t=document.createElement("div");t.innerHTML=`
    <div id="messages-box" class="messages-box hidden">
      
      <div id="messages"></div>
    

      <form id="messages-form">

        <textarea id="messages-input" placeholder="Type a message..." rows="1"></textarea>

        <div class="message-attachments">
          <input type="file" id="file-input" style="display: none" />
          <button type="button" id="attach-file-btn" title="Attach file">
            <i class="fa fa-paperclip" aria-hidden="true"></i>
          </button>
        </div>
        
        <button type="submit">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </form>

    </div>
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),s=t.querySelector("#messages-form"),i=t.querySelector("#messages-input");"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0);const r=CSS.supports?.("field-sizing","content");let o=null;if(i&&i.tagName==="TEXTAREA"&&!r){const a=()=>{i.style.height="auto",i.style.height=`${i.scrollHeight}px`};i.addEventListener("input",a,{passive:!0}),o=()=>{i.style.height=""},requestAnimationFrame(()=>{requestAnimationFrame(a)})}return{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:s,messagesInput:i,resetInputHeight:o}}function rO(){const t=document.createElement("div");t.className="messages-top-bar",t.innerHTML=`
    <button type="button" class="messages-topbar-back" aria-label="Back">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </button>
    <div class="messages-topbar-contact">
      <span class="messages-topbar-avatar" aria-hidden="true"></span>
      <span class="messages-topbar-name"></span>
    </div>
    <button type="button" class="messages-topbar-call" aria-label="Call">
      <i class="fa fa-phone" aria-hidden="true"></i>
    </button>
  `;const e=t.querySelector(".messages-topbar-back"),n=t.querySelector(".messages-topbar-call"),s=t.querySelector(".messages-topbar-avatar"),i=t.querySelector(".messages-topbar-name");return{element:t,setContact:({name:l="",photoURL:u=""}={})=>{i.textContent=l||"Unknown",Is(s,{name:l,photoURL:u,imageClass:"has-image"})},setBackHandler:l=>{e.onclick=l||null},setCallHandler:l=>{n.onclick=l||null},cleanup:()=>{e.onclick=null,n.onclick=null,t.remove()}}}const oO=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function aO(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function cO(t,{name:e,photoURL:n}){if(!t)return;t.querySelectorAll("p.message-remote .sender-avatar:not(.sender-avatar--me)").forEach(i=>Is(i,{name:e,photoURL:n}))}function lO(){let t=!1,e=null,n=null,s=!1,i=new Map;const r=new eO,o=new tO(r),a=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),c=sw({parent:a,onToggle:()=>ys(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!c)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const l=c.element,{messagesBoxContainer:u,messagesBox:d,messagesMessages:h,messagesForm:f,messagesInput:p,resetInputHeight:m}=iO(),g=rO();if(!l||!d||!h||!f||!p)return console.error("Messages UI elements not found."),null;g?.element&&(d.prepend(g.element),g.setBackHandler(()=>{_s()&&ys()}),g.setCallHandler(()=>{d.dispatchEvent(new CustomEvent("contact:call",{bubbles:!0,detail:{contactId:e?.contactId||null,contactName:e?.contactName||null}}))}));const T=document.getElementById("attach-file-btn"),B=document.getElementById("file-input"),N=f.querySelector('button[type="submit"]');C(T),T.addEventListener("click",()=>{B.click()}),B.addEventListener("change",async y=>{const S=y.target.files[0];if(!S||!n){n||console.warn("[MessagesUI] FileTransfer not initialized");return}const R=N.textContent;N.textContent="Sending...";try{await n.sendFile(S,L=>{N.textContent=`${Math.round(L*100)}%`}),S.type.startsWith("video/")&&i.set(S.name,S),Ae(`📎 Sent: ${S.name}`,{isSentByMe:!0})}catch(L){console.error("[MessagesUI] File send failed:",L),Ae("❌ Failed to send file")}finally{N.textContent=R,B.value=""}});async function w(y){return new Promise(S=>{const R=document.createElement("div");R.className="file-action-overlay",R.style.cssText=`
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
      `;const L=document.createElement("div");L.className="file-action-prompt",L.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,L.innerHTML=`
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
      `,R.appendChild(L),document.body.appendChild(R);const J=L.querySelector("#file-name-display");J.textContent=y;const I=L.querySelector("#download-file-btn"),O=L.querySelector("#watch-together-btn");I.addEventListener("mouseenter",()=>{I.style.background="var(--bg-hover, #333)"}),I.addEventListener("mouseleave",()=>{I.style.background="var(--bg-secondary, #2a2a2a)"}),O.addEventListener("mouseenter",()=>{O.style.opacity="0.9"}),O.addEventListener("mouseleave",()=>{O.style.opacity="1"}),I.addEventListener("click",()=>{R.remove(),S("download")}),O.addEventListener("click",()=>{R.remove(),S("watch")}),R.addEventListener("click",q=>{q.target===R&&(R.remove(),S("download"))})})}async function F(y){return new Promise(S=>{const R=document.createElement("div");R.className="watch-request-overlay",R.style.cssText=`
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
      `;const L=document.createElement("div");L.className="watch-request-prompt",L.style.cssText=`
        background: var(--bg-primary, #1a1a1a);
        border: 1px solid var(--border-color, #333);
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      `,L.innerHTML=`
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
      `,R.appendChild(L),document.body.appendChild(R);const J=L.querySelector("#watch-request-filename");J.textContent=y;const I=L.querySelector("#decline-watch-btn"),O=L.querySelector("#accept-watch-btn");I.addEventListener("mouseenter",()=>{I.style.background="var(--bg-hover, #333)"}),I.addEventListener("mouseleave",()=>{I.style.background="var(--bg-secondary, #2a2a2a)"}),O.addEventListener("mouseenter",()=>{O.style.opacity="0.9"}),O.addEventListener("mouseleave",()=>{O.style.opacity="1"}),I.addEventListener("click",()=>{R.remove(),S(!1)}),O.addEventListener("click",()=>{R.remove(),S(!0)}),R.addEventListener("click",q=>{q.target===R&&(R.remove(),S(!1))})})}window.onFileWatchRequestReceived=async y=>{const S=i.get(y);if(!S){Ae(`❌ File not available to watch together: ${y}`),await kl();return}Ae(`🎬 Partner wants to watch: ${y}`),await F(y)?(Ae("✅ Joining watch together..."),await gL(S)||Ae("❌ Failed to load video")):(Ae("❌ Declined watch together request"),await kl())};function W(){if(!l||!d||d.classList.contains("hidden"))return;const y=l.getBoundingClientRect(),S=d.getBoundingClientRect(),R=8;let L=y.top-S.height-R;L<8&&(L=y.bottom+R);let J=y.left+y.width/2-S.width/2;const I=window.innerWidth-S.width-8;J<8&&(J=8),J>I&&(J=I),d.style.top=`${Math.round(L)}px`,d.style.left=`${Math.round(J)}px`}function Le(){t||(t=!0,window.addEventListener("resize",W,{passive:!0}),window.addEventListener("scroll",W,{passive:!0}),window.addEventListener("orientationchange",W,{passive:!0}))}function pe(){t&&(t=!1,window.removeEventListener("resize",W),window.removeEventListener("scroll",W),window.removeEventListener("orientationchange",W))}let Re=null;const nn=new MutationObserver(y=>{y.forEach(S=>{S.type==="attributes"&&S.attributeName==="class"&&(d.classList.contains("hidden")||c.clearBadge())})});nn.observe(d,{attributes:!0});function _s(){return!d.classList.contains("hidden")}function Wa(){return document.activeElement===p}function jw(){Wa()||p.focus()}function Vw(){Wa()&&p.blur()}function ys(){d.classList.toggle("hidden"),_s()?(up()||p.focus(),oO?requestAnimationFrame(()=>{aO(d)||(W(),Le())}):(W(),Le()),Ga(),Re=fr(d,()=>{C(d),pe(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",Re&&(Re(),Re=null)},{ignore:()=>[c.element,o.activePicker].filter(Boolean),esc:!0,ignoreInputBlur:up()})):(document.activeElement===p&&p.blur(),pe(),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",Re&&(Re(),Re=null))}function qa(){H(c.element)}function Fd(){C(c.element)}const za=new Map;function Ae(y,S={}){const{isSentByMe:R,senderDisplay:L,fileDownload:J,messageId:I,reactions:O}=S,q=L??(R===!0?"Me":""),ge=document.createElement("p");R===!0?ge.classList.add("message-local"):R===!1&&ge.classList.add("message-remote");const Oe=document.createElement("span");if(Oe.className="sender-avatar"+(R===!0?" sender-avatar--me":""),Oe.setAttribute("aria-hidden","true"),R===!0)Is(Oe,{customFallbackText:"Me"});else if(R===!1){const X=e?.contactName||q,_e=e?.contactPhotoURL||e?.contactProfile?.photoURL||null;Is(Oe,{name:X,photoURL:_e})}else Oe.textContent=q;const ce=document.createElement("span");if(ce.className="message-text",!L&&typeof R>"u"&&ge.classList.add("message-system"),J){const{fileName:X,url:_e}=J,le=y.split(X)[0];le&&ce.appendChild(document.createTextNode(le));const Ye=document.createElement("a");Ye.textContent=X,Ye.href=_e,Ye.download=X,Ye.style.cursor="pointer",Ye.style.textDecoration="underline",Ye.addEventListener("click",()=>{setTimeout(()=>URL.revokeObjectURL(_e),100)}),ce.appendChild(Ye)}else{const X=QL(y);ce.appendChild(X)}if(J&&ge.classList.add("message-system"),ge.appendChild(Oe),ge.appendChild(ce),typeof R<"u"&&!J&&I){if(ge.dataset.messageId=I,za.set(I,ge),O&&Object.keys(O).length>0){r.syncFromRemote(I,O);const X=r.getReactions(I);o.renderReactions(ge,I,X)}o.enableDoubleTap(ge,I,async(X,_e,le,Ye)=>{if(!e){console.warn("[MessagesUI] No current session for reaction");return}const Ct=M();if(!Ct){console.warn("[MessagesUI] No userId available for reaction");return}try{if(Ye==="doubleTap"){const Tt=r.getUserReactionType(le,Ct);let Fn;Tt?(await e.removeReaction(le,Tt),Fn=r.removeReaction(le,Tt,Ct)):(await e.addReaction(le,X),Fn=r.addReaction(le,X,Ct),Jn.enableAnimations&&o.showReactionAnimation(_e,X)),o.renderReactions(_e,le,Fn)}else if(Ye==="picker"){const Tt=r.getUserReactionType(le,Ct);let Fn;Tt===X?(await e.removeReaction(le,X),Fn=r.removeReaction(le,X,Ct)):(Tt&&(await e.removeReaction(le,Tt),r.removeReaction(le,Tt,Ct)),await e.addReaction(le,X),Fn=r.addReaction(le,X,Ct),Jn.enableAnimations&&o.showReactionAnimation(_e,X)),o.renderReactions(_e,le,Fn)}}catch(Tt){console.warn("[MessagesUI] Failed to handle reaction:",Tt)}})}h.appendChild(ge),Ga()}function Ww(y,S={}){const{isUnread:R=!1,onCallBack:L}=S,J=M(),I=y.callerId===J,O=document.createElement("p");O.classList.add("message-call-event"),I?O.classList.add("message-local"):O.classList.add("message-remote");const q=document.createElement("span");if(q.className="sender-avatar"+(I?" sender-avatar--me":""),q.setAttribute("aria-hidden","true"),I)Is(q,{customFallbackText:"Me"});else{const _e=e?.contactName||y.callerName,le=e?.contactPhotoURL||e?.contactProfile?.photoURL||null;Is(q,{name:_e,photoURL:le})}const ge=document.createElement("span");ge.className="message-text call-event-content";const Oe=document.createElement("span");Oe.className="call-event-text",Oe.textContent=I?"No Answer":"Missed Call";const ce=document.createElement("button");ce.className="call-back-btn",ce.type="button";const X=document.createElement("i");if(X.className="fa fa-phone call-event-icon",X.setAttribute("aria-hidden","true"),ce.appendChild(X),ce.appendChild(document.createTextNode(I?"Try again":"Call back")),ce.addEventListener("click",async()=>{if(L)await L();else try{const{callContact:_e}=await fe(async()=>{const{callContact:Ct}=await Promise.resolve().then(()=>Hw);return{callContact:Ct}},void 0),le=I?e?.contactId:y.callerId,Ye=I?e?.contactName:y.callerName;le&&Ye&&await _e(le,Ye)}catch(_e){console.warn("[MessagesUI] Failed to initiate call back:",_e),Nl("Unable to call. Please try again.")}}),ge.appendChild(Oe),ge.appendChild(ce),O.appendChild(q),O.appendChild(ge),h.appendChild(O),R&&!I&&Ui(d)){const _e=c.element.unreadCount||0;c.setUnreadCount(_e+1)}Ga()}let xn=null;function Ga(){h&&(xn!==null&&cancelAnimationFrame(xn),xn=requestAnimationFrame(()=>{h.scrollTop=h.scrollHeight,xn=null}))}function Ud(y,{isUnread:S=!0,senderDisplay:R="U",messageId:L,reactions:J}={}){if(Ae(y,{isSentByMe:!1,senderDisplay:R,messageId:L,reactions:J}),Ui(d)&&S){const I=c.element.unreadCount||0;c.setUnreadCount(I+1)}}function $d(){const y=p.value.trim();y&&(e?(e.send(y),p.value="",m&&m()):console.warn("[MessagesUI] No active session to send message"))}f.addEventListener("submit",y=>{y.preventDefault(),$d()}),p.addEventListener("keydown",y=>{y.key==="Enter"&&!y.shiftKey&&(y.preventDefault(),$d())});const qw=()=>{const y=document.activeElement;return y&&(y.tagName==="INPUT"||y.tagName==="TEXTAREA"||y.isContentEditable)},Bd=y=>{(y.key==="m"||y.key==="M")&&!_s()&&!qw()&&(y.preventDefault(),ys())};document.addEventListener("keydown",Bd);function xr(){xn!==null&&(cancelAnimationFrame(xn),xn=null),h.innerHTML="",h.scrollTop=0}function Fr(y){e!==null&&e!==y&&xr(),e=y,g&&g.setContact({name:y?.contactName||"",photoURL:y?.contactPhotoURL||y?.contactProfile?.photoURL||""})}function zw(){return e}function Gw(y){n=y,n?(H(T),n.onFileReceived=async S=>{const R=URL.createObjectURL(S);if(S.type.startsWith("video/"))if(await w(S.name)==="watch"){if(Ae(`📹 Received video: ${S.name}`,{isSentByMe:!1}),Ae("🎬 Requesting partner to join watch together..."),!await hr(S)){Ae("❌ Failed to load video");return}const I=await pL(S.name);Ae(I?"⏳ Waiting for partner to join...":"❌ Failed to send watch request")}else{const J=document.createElement("a");J.href=R,J.download=S.name,J.click(),setTimeout(()=>URL.revokeObjectURL(R),1e3),Ae(`📎 Downloaded: ${S.name}`)}else Ae(`📎 Received: ${S.name}`,{isSentByMe:!1,fileDownload:{fileName:S.name,url:R}});if(Ui(d)){const L=c.element.unreadCount||0;c.setUnreadCount(L+1)}s&&(N.textContent="Send",s=!1)},n.onReceiveProgress=S=>{s=!0,N.textContent=`${Math.round(S*100)}%`}):C(T)}function Kw(){xr(),e=null,n=null,s=!1,Fd(),C(d),c.clearBadge(),p.value="",m&&m(),N&&(N.textContent="Send"),C(T),d.style.top="",d.style.left="",d.style.bottom="",d.style.right="",pe(),za.clear(),r.clearAll(),g&&g.setContact({name:"",photoURL:""})}function Hd(y,S){const R=za.get(y);if(!R)return;const L={};for(const[O,q]of Object.entries(S||{}))L[O]=q.length;const J=r.getReactions(y);((O,q)=>{const ge=Object.keys(O),Oe=Object.keys(q);return ge.length===Oe.length&&ge.every(ce=>O[ce]===q[ce])})(L,J)||(console.debug(`[MessagesUI] Syncing reaction state for ${y}:`,{local:J,remote:L}),r.syncFromRemote(y,S),o.renderReactions(R,y,L))}function Yw(){if(c&&c.cleanup(),g&&g.cleanup(),pe(),typeof Re=="function")try{Re()}catch(y){console.error("Error removing messages box outside click handler:",y)}nn.disconnect(),document.removeEventListener("keydown",Bd),u&&u.parentNode&&u.parentNode.removeChild(u)}function Jw(y,S,R=!1){if(!M()){Nl("Please sign in to send messages");return}const L=Pt.getSession(y);if(L){Fr(L),qa(),R&&!_s()&&ys(),L.markAsRead().catch(O=>{console.warn("Failed to mark messages as read:",O)});return}Pt.getAllSessions().forEach(O=>{O.close()}),xr(),Fr(null);const I=Pt.openSession(y,{onMessage:(O,q,ge)=>{if(q._reactionUpdate){const ce={};if(q.reactions)for(const[X,_e]of Object.entries(q.reactions))ce[X]=Object.keys(_e);Hd(q.messageId,ce);return}if(q.type==="call_event"){Ww(q,{isUnread:!q.read});return}const Oe={};if(q.reactions)for(const[ce,X]of Object.entries(q.reactions))Oe[ce]=Object.keys(X);if(ge)Ae(O,{isSentByMe:!0,messageId:q.messageId,reactions:Oe});else{const ce=!q.read;Ud(O,{isUnread:ce,messageId:q.messageId,reactions:Oe})}}});I.contactId=y,I.contactName=S,g&&g.setContact({name:S||"",photoURL:""}),sd(y).then(O=>{O&&(I.contactProfile=O,!I.contactName&&O.displayName&&(I.contactName=O.displayName),O.photoURL&&(I.contactPhotoURL=O.photoURL),g&&g.setContact({name:I.contactName||"",photoURL:I.contactPhotoURL||""}),cO(h,{name:I.contactName,photoURL:I.contactPhotoURL}))}).catch(()=>{}),Fr(I),qa(),R&&!_s()&&ys(),I.markAsRead().catch(O=>{console.warn("Failed to mark messages as read:",O)})}return{appendChatMessage:Ae,receiveMessage:Ud,updateMessageReactions:Hd,isMessagesUIOpen:_s,toggleMessages:ys,showMessagesToggle:qa,hideMessagesToggle:Fd,isMessageInputFocused:Wa,focusMessageInput:jw,unfocusMessageInput:Vw,setSession:Fr,getCurrentSession:zw,clearMessages:xr,setFileTransfer:Gw,openContactMessages:Jw,reset:Kw,cleanup:Yw}}const cs=lO();class uO{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(i){console.warn("CallController listener error",i)}}}class dO{constructor(){this.emitter=new uO,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map,this.wasConnected=!1}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}getPeerConnection(){if(!this.pc)return console.warn("CallController.getPeerConnection: pc is null",{state:this.state,roomId:this.roomId,role:this.role,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}),null;const{connectionState:e,iceConnectionState:n,signalingState:s}=this.pc;return(e==="closed"||n==="closed")&&console.warn("CallController.getPeerConnection: pc is closed",{connectionState:e,iceConnectionState:n,signalingState:s}),this.pc}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=b(E,`rooms/${e}/cancellation`);let s=!1;const i=async r=>{const o=r.val();if(!o||s)return;const a=de();if(o.by!==a){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(c){console.warn("Failed to clear remote video after cancellation",c)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(c){console.warn("Failed to trigger CallController cleanup",c)}}};As(n,i,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:i,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const i=b(E,`rooms/${e}/answer`),r=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await fe(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>kL);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};As(i,r,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:i,callback:r,roomId:e})}setupRejectionListener(e){if(!e)return;const n=b(E,`rooms/${e}/rejection`);let s=!1;const i=async r=>{const o=r.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await fe(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>Iy);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await he.leaveRoom(de(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};As(n,i,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:i,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=de(),s=i=>{i.key!==n&&(this.setPartnerId(i.key),this.emitter.emit("memberJoined",{memberId:i.key,roomId:e}))};he.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=de(),s=i=>{i.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:i.key,roomId:e})};he.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&ft(s.ref,"value",s.callback)}catch(i){console.warn(`Failed to remove ${e} listener`,i)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{Rr(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await RL(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting",this.pc&&typeof this.pc.addEventListener=="function"&&this.pc.addEventListener("connectionstatechange",()=>{this.pc.connectionState==="connected"&&(this.wasConnected=!0,this.state!=="connected"&&(this.state="connected"))}),this.dataChannel&&this.setupFileTransport(this.dataChannel);const{drainIceCandidateQueue:s}=await fe(async()=>{const{drainIceCandidateQueue:i}=await Promise.resolve().then(()=>J0);return{drainIceCandidateQueue:i}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const s=await AL({...e,onMessagesUIReady:i=>{this.messagesUI=i}});return!s||!s.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:s}),this.emitCallFailed("answerCall",s),s):(this.pc=s.pc,this.roomId=s.roomId,this.role=s.role||"joiner",this.dataChannel=s.dataChannel||null,!this.messagesUI&&s.messagesUI&&(this.messagesUI=s.messagesUI),this.state="connected",this.wasConnected=!0,this.dataChannel?this.setupFileTransport(this.dataChannel):this.role==="joiner"&&this.pc&&(this.pc.ondatachannel=i=>{this.dataChannel=i.channel,this.setupFileTransport(this.dataChannel)}),this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),s)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}setupFileTransport(e){if(!e)return;const n=()=>{try{const s=new FL(e);Pt.setFileTransport(s),cs.setFileTransfer(s.fileTransfer),G("[CallController] File transport initialized")}catch(s){console.error("[CallController] Failed to setup file transport:",s)}};e.readyState==="open"?n():e.addEventListener("open",n,{once:!0})}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await he.cancelCall(this.roomId,de(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId,i=this.role,r=this.wasConnected;this.removeTrackedListeners();try{await he.leaveRoom(de(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear remote video",o)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(o){console.warn("CallController: failed to clear local video",o)}try{const{cleanupLocalStream:o}=await fe(async()=>{const{cleanupLocalStream:a}=await Promise.resolve().then(()=>rL);return{cleanupLocalStream:a}},void 0);o()}catch(o){console.warn("CallController: failed to cleanup local stream",o)}try{const{resetLocalStreamInitFlag:o}=await fe(async()=>{const{resetLocalStreamInitFlag:a}=await Promise.resolve().then(()=>Hw);return{resetLocalStreamInitFlag:a}},void 0);o()}catch{}this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e});try{Pt.clearFileTransport(),cs.setFileTransfer(null)}catch(o){console.warn("CallController: failed to cleanup file transport",o)}if(this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(o){console.warn("CallController: failed to cleanup messages UI",o)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,role:i,wasConnected:r,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const Ie=new dO,Pl={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function iw(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?Pl.withVoiceIsolationIfSupported:Pl.default}const hO=()=>Pl.default,fO={landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30}}},pO=()=>{const t=window.matchMedia?.("(orientation: portrait)");if(t)return t.matches;const e=window.screen?.orientation?.type;return typeof e=="string"?e.includes("portrait"):window.innerHeight>=window.innerWidth};function rw(t,e=null){if(e===null&&(e=pO()?"portrait":"landscape"),/Mobi|Android/i.test(navigator.userAgent))return{facingMode:t};const s=fO[e];return{facingMode:t,...s}}const gO=async()=>{if(Uy())return console.debug("Reusing existing local MediaStream."),xa();const t=rw("user"),e=iw();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return Ho(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const s=hO(),i=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return Ho(i),i}throw n}};async function mO(t){const e=await gO(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function _O(t,e,n){return t.ontrack=s=>{G(`REMOTE TRACK RECEIVED: ${s.track.kind}`);const i=Ma()?yd():null;let r;s.streams&&s.streams[0]&&s.streams[0]instanceof MediaStream?r=s.streams[0]:(console.warn("No stream in track event, using fallback track handling"),i?(i.addTrack(s.track),r=i):r=new MediaStream([s.track])),xy(r),e.srcObject=r,s.track.kind==="video"&&(e.readyState>=1?e.style.opacity="1":(e.style.opacity="0",e.addEventListener("loadedmetadata",()=>{e.style.opacity="1"},{once:!0}))),i!==r||G(`Added ${s.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible")}catch(o){console.warn("Visibility override failed:",o)}},!0}let ro=null,kt=null;async function hp(t,e="User"){const n=M(),s=Nn();if(!n||!s)throw new Error("Must be logged in to send invites");if(!t)throw new Error("Recipient user ID is required");const i=cr(n,t),r=b(E,`users/${t}/incomingInvites/${n}`),o={fromUserId:n,fromName:s.displayName||"Anonymous",fromEmail:s.email||"",fromPhotoURL:s.photoURL||null,roomId:i,timestamp:Date.now(),status:"pending"};await ne(r,o),console.log(`[INVITATIONS] Sent invite to ${e} (${t})`)}function yO(t){const e=M();if(!e)return console.warn("[INVITATIONS] Cannot listen for invites - not logged in"),()=>{};Ll();const n=b(E,`users/${e}/incomingInvites`);return ro=Qs(n,s=>{const i=s.key,r=s.val();r&&r.status==="pending"&&(console.log(`[INVITATIONS] New invite from ${r.fromName}`),t(i,r))}),console.log("[INVITATIONS] Listening for incoming invites"),Ll}async function ow(t,e){const n=M(),s=Nn();if(!n||!s)throw new Error("Must be logged in to accept invites");const i=b(E,`users/${n}/contacts/${t}`);await ne(i,{contactId:t,contactName:e.fromName||"User",roomId:e.roomId,savedAt:Date.now()});const r=b(E,`users/${t}/acceptedInvites/${n}`);await ne(r,{acceptedByUserId:n,acceptedByName:s.displayName||"User",acceptedByEmail:s.email||"",acceptedByPhotoURL:s.photoURL||null,roomId:e.roomId,timestamp:Date.now()});const o=b(E,`users/${n}/incomingInvites/${t}`);await tt(o),console.log(`[INVITATIONS] Accepted invite from ${e.fromName} and notified sender`)}async function wO(t){const e=M();if(!e)throw new Error("Must be logged in to decline invites");const n=b(E,`users/${e}/incomingInvites/${t}`);await tt(n),console.log(`[INVITATIONS] Declined invite from ${t}`)}function vO(t){const e=M();if(!e)return console.warn("[INVITATIONS] Cannot listen for accepted invites - not logged in"),()=>{};kt&&(kt(),kt=null);const n=b(E,`users/${e}/acceptedInvites`);return kt=Qs(n,async s=>{const i=s.key,r=s.val();if(r)try{const o=b(E,`users/${e}/contacts/${i}`);await ne(o,{contactId:i,contactName:r.acceptedByName||"User",roomId:r.roomId,savedAt:Date.now()}),console.log(`[INVITATIONS] Auto-saved contact: ${r.acceptedByName} (invite accepted)`);const a=b(E,`users/${e}/acceptedInvites/${i}`);await tt(a),t&&t(i,r)}catch(o){console.error("[INVITATIONS] Failed to auto-save contact from accepted invite:",o)}}),console.log("[INVITATIONS] Listening for accepted invites"),()=>{kt&&(kt(),kt=null)}}function Ll(){ro&&(ro(),ro=null),kt&&(kt(),kt=null),console.log("[INVITATIONS] Cleaned up all invite listeners")}function Sd({template:t,handlers:e={},className:n="notification",parent:s=document.body,initialProps:i={},...r}){return Fa({template:t,handlers:e,className:n,parent:s,initialProps:i,containerTag:"div",autoAppend:!1,...r})}function bO({referrerName:t,referrerPhotoURL:e,onSignIn:n}){const s=t||"Someone",i=e?`<img src="${st(e)}" alt="${st(s)}" class="notification-avatar" />`:'<span class="notification-icon">👤</span>';return Sd({template:`
      <div class="notification-content">
        <div class="notification-header">
          ${i}
          <span class="notification-title">You've been invited</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${st(s)}</strong> invited you to connect
          </p>
          <p class="notification-detail">Sign in to add them as a contact</p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleSignIn">
            Sign in
          </button>
        </div>
      </div>
    `,className:"notification referral-notification",handlers:{handleSignIn:async r=>{const o=r.target;o.disabled=!0,o.textContent="Signing in...";try{n&&await n()}catch(a){console.error("[REFERRAL NOTIFICATION] Sign-in failed:",a),o.disabled=!1,o.textContent="Sign in"}}}})}class EO{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=fr(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const s=n._originalDispose;n.dispose=()=>{s&&s.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=s,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const We=new EO;async function CO(){const e=new URLSearchParams(window.location.search).get("ref");if(e){console.log("[REFERRAL] Captured referrer ID:",e),localStorage.setItem("referredBy",e);const n=new URL(window.location.href);n.searchParams.delete("ref"),window.history.replaceState({},"",n.toString());const s=await sd(e),i=s?.displayName||null,r=s?.photoURL||null,o=i?`${i} invited you — tap here to sign in and connect`:"Tap here to sign in and connect with your inviter";Nl(o,{duration:8e3,onClick:()=>$o()});const a=bO({referrerName:i,referrerPhotoURL:r,onSignIn:()=>$o()});We.add(`referral-${e}`,a)}}async function fp(){const t=localStorage.getItem("referredBy"),e=M();if(!(!t||!e)){if(t===e){console.log("[REFERRAL] Self-referral detected, skipping"),localStorage.removeItem("referredBy");return}try{console.log("[REFERRAL] Processing referral from:",t);const n=await sd(t),s=n?.displayName||t,i=n?.photoURL||null,r=cr(e,t),o={fromUserId:t,fromName:s,fromEmail:"",fromPhotoURL:i,roomId:r,timestamp:Date.now(),status:"pending"};await ow(t,o),console.log(`[REFERRAL] ✅ Connected with ${s} via referral link!`),$a(`✅ Connected with ${s}!`),We.remove(`referral-${t}`),localStorage.removeItem("referredBy")}catch(n){console.error("[REFERRAL] Failed to process referral:",n)}}}let $s=null;function Ba(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const i=s.querySelector('[data-action="confirm"]'),r=s.querySelector('[data-action="cancel"]');if(!i||!r){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),$s===a&&($s=null),n(c)}i.addEventListener("click",()=>{a(!0)}),r.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),$s=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function TO(){if(typeof $s=="function"){try{$s(!1)}catch{}return $s=null,!0}return!1}const SO=Object.freeze(Object.defineProperty({__proto__:null,default:Ba,dismissActiveConfirmDialog:TO},Symbol.toStringTag,{value:"Module"})),aw="@firebase/installations",Id="0.6.19";/**
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
 */const cw=1e4,lw=`w:${Id}`,uw="FIS_v2",IO="https://firebaseinstallations.googleapis.com/v1",kO=3600*1e3,RO="installations",AO="Installations";/**
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
 */const NO={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ls=new Dn(RO,AO,NO);function dw(t){return t instanceof en&&t.code.includes("request-failed")}/**
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
 */function hw({projectId:t}){return`${IO}/projects/${t}/installations`}function fw(t){return{token:t.token,requestStatus:2,expiresIn:LO(t.expiresIn),creationTime:Date.now()}}async function pw(t,e){const s=(await e.json()).error;return ls.create("request-failed",{requestName:t,serverCode:s.code,serverMessage:s.message,serverStatus:s.status})}function gw({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function PO(t,{refreshToken:e}){const n=gw(t);return n.append("Authorization",OO(e)),n}async function mw(t){const e=await t();return e.status>=500&&e.status<600?t():e}function LO(t){return Number(t.replace("s","000"))}function OO(t){return`${uw} ${t}`}/**
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
 */async function DO({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const s=hw(t),i=gw(t),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={fid:n,authVersion:uw,appId:t.appId,sdkVersion:lw},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await mw(()=>fetch(s,a));if(c.ok){const l=await c.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:fw(l.authToken)}}else throw await pw("Create Installation",c)}/**
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
 */function _w(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function MO(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const xO=/^[cdef][\w-]{21}$/,Ol="";function FO(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=UO(t);return xO.test(n)?n:Ol}catch{return Ol}}function UO(t){return MO(t).substr(0,22)}/**
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
 */function Ha(t){return`${t.appName}!${t.appId}`}/**
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
 */const yw=new Map;function ww(t,e){const n=Ha(t);vw(n,e),$O(n,e)}function vw(t,e){const n=yw.get(t);if(n)for(const s of n)s(e)}function $O(t,e){const n=BO();n&&n.postMessage({key:t,fid:e}),HO()}let qn=null;function BO(){return!qn&&"BroadcastChannel"in self&&(qn=new BroadcastChannel("[Firebase] FID Change"),qn.onmessage=t=>{vw(t.data.key,t.data.fid)}),qn}function HO(){yw.size===0&&qn&&(qn.close(),qn=null)}/**
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
 */const jO="firebase-installations-database",VO=1,us="firebase-installations-store";let Sc=null;function kd(){return Sc||(Sc=oa(jO,VO,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(us)}}})),Sc}async function qo(t,e){const n=Ha(t),i=(await kd()).transaction(us,"readwrite"),r=i.objectStore(us),o=await r.get(n);return await r.put(e,n),await i.done,(!o||o.fid!==e.fid)&&ww(t,e.fid),e}async function bw(t){const e=Ha(t),s=(await kd()).transaction(us,"readwrite");await s.objectStore(us).delete(e),await s.done}async function ja(t,e){const n=Ha(t),i=(await kd()).transaction(us,"readwrite"),r=i.objectStore(us),o=await r.get(n),a=e(o);return a===void 0?await r.delete(n):await r.put(a,n),await i.done,a&&(!o||o.fid!==a.fid)&&ww(t,a.fid),a}/**
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
 */async function Rd(t){let e;const n=await ja(t.appConfig,s=>{const i=WO(s),r=qO(t,i);return e=r.registrationPromise,r.installationEntry});return n.fid===Ol?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function WO(t){const e=t||{fid:FO(),registrationStatus:0};return Ew(e)}function qO(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(ls.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},s=zO(t,n);return{installationEntry:n,registrationPromise:s}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:GO(t)}:{installationEntry:e}}async function zO(t,e){try{const n=await DO(t,e);return qo(t.appConfig,n)}catch(n){throw dw(n)&&n.customData.serverCode===409?await bw(t.appConfig):await qo(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function GO(t){let e=await pp(t.appConfig);for(;e.registrationStatus===1;)await _w(100),e=await pp(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:s}=await Rd(t);return s||n}return e}function pp(t){return ja(t,e=>{if(!e)throw ls.create("installation-not-found");return Ew(e)})}function Ew(t){return KO(t)?{fid:t.fid,registrationStatus:0}:t}function KO(t){return t.registrationStatus===1&&t.registrationTime+cw<Date.now()}/**
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
 */async function YO({appConfig:t,heartbeatServiceProvider:e},n){const s=JO(t,n),i=PO(t,n),r=e.getImmediate({optional:!0});if(r){const l=await r.getHeartbeatsHeader();l&&i.append("x-firebase-client",l)}const o={installation:{sdkVersion:lw,appId:t.appId}},a={method:"POST",headers:i,body:JSON.stringify(o)},c=await mw(()=>fetch(s,a));if(c.ok){const l=await c.json();return fw(l)}else throw await pw("Generate Auth Token",c)}function JO(t,{fid:e}){return`${hw(t)}/${e}/authTokens:generate`}/**
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
 */async function Ad(t,e=!1){let n;const s=await ja(t.appConfig,r=>{if(!Cw(r))throw ls.create("not-registered");const o=r.authToken;if(!e&&ZO(o))return r;if(o.requestStatus===1)return n=XO(t,e),r;{if(!navigator.onLine)throw ls.create("app-offline");const a=tD(r);return n=QO(t,a),a}});return n?await n:s.authToken}async function XO(t,e){let n=await gp(t.appConfig);for(;n.authToken.requestStatus===1;)await _w(100),n=await gp(t.appConfig);const s=n.authToken;return s.requestStatus===0?Ad(t,e):s}function gp(t){return ja(t,e=>{if(!Cw(e))throw ls.create("not-registered");const n=e.authToken;return nD(n)?{...e,authToken:{requestStatus:0}}:e})}async function QO(t,e){try{const n=await YO(t,e),s={...e,authToken:n};return await qo(t.appConfig,s),n}catch(n){if(dw(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await bw(t.appConfig);else{const s={...e,authToken:{requestStatus:0}};await qo(t.appConfig,s)}throw n}}function Cw(t){return t!==void 0&&t.registrationStatus===2}function ZO(t){return t.requestStatus===2&&!eD(t)}function eD(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+kO}function tD(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function nD(t){return t.requestStatus===1&&t.requestTime+cw<Date.now()}/**
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
 */async function sD(t){const e=t,{installationEntry:n,registrationPromise:s}=await Rd(e);return s?s.catch(console.error):Ad(e).catch(console.error),n.fid}/**
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
 */async function iD(t,e=!1){const n=t;return await rD(n),(await Ad(n,e)).token}async function rD(t){const{registrationPromise:e}=await Rd(t);e&&await e}/**
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
 */function oD(t){if(!t||!t.options)throw Ic("App Configuration");if(!t.name)throw Ic("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ic(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ic(t){return ls.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tw="installations",aD="installations-internal",cD=t=>{const e=t.getProvider("app").getImmediate(),n=oD(e),s=Mn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:s,_delete:()=>Promise.resolve()}},lD=t=>{const e=t.getProvider("app").getImmediate(),n=Mn(e,Tw).getImmediate();return{getId:()=>sD(n),getToken:i=>iD(n,i)}};function uD(){ct(new et(Tw,cD,"PUBLIC")),ct(new et(aD,lD,"PRIVATE"))}uD();Qe(aw,Id);Qe(aw,Id,"esm2020");/**
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
 */const dD="/firebase-messaging-sw.js",hD="/firebase-cloud-messaging-push-scope",Sw="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",fD="https://fcmregistrations.googleapis.com/v1",Iw="google.c.a.c_id",pD="google.c.a.c_l",gD="google.c.a.ts",mD="google.c.a.e",mp=1e4;var _p;(function(t){t[t.DATA_MESSAGE=1]="DATA_MESSAGE",t[t.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(_p||(_p={}));/**
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
 */var pr;(function(t){t.PUSH_RECEIVED="push-received",t.NOTIFICATION_CLICKED="notification-clicked"})(pr||(pr={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(t){const e=new Uint8Array(t);return btoa(String.fromCharCode(...e)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function _D(t){const e="=".repeat((4-t.length%4)%4),n=(t+e).replace(/\-/g,"+").replace(/_/g,"/"),s=atob(n),i=new Uint8Array(s.length);for(let r=0;r<s.length;++r)i[r]=s.charCodeAt(r);return i}/**
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
 */const kc="fcm_token_details_db",yD=5,yp="fcm_token_object_Store";async function wD(t){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(kc))return null;let e=null;return(await oa(kc,yD,{upgrade:async(s,i,r,o)=>{if(i<2||!s.objectStoreNames.contains(yp))return;const a=o.objectStore(yp),c=await a.index("fcmSenderId").get(t);if(await a.clear(),!!c){if(i===2){const l=c;if(!l.auth||!l.p256dh||!l.endpoint)return;e={token:l.fcmToken,createTime:l.createTime??Date.now(),subscriptionOptions:{auth:l.auth,p256dh:l.p256dh,endpoint:l.endpoint,swScope:l.swScope,vapidKey:typeof l.vapidKey=="string"?l.vapidKey:xt(l.vapidKey)}}}else if(i===3){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:xt(l.auth),p256dh:xt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:xt(l.vapidKey)}}}else if(i===4){const l=c;e={token:l.fcmToken,createTime:l.createTime,subscriptionOptions:{auth:xt(l.auth),p256dh:xt(l.p256dh),endpoint:l.endpoint,swScope:l.swScope,vapidKey:xt(l.vapidKey)}}}}}})).close(),await rc(kc),await rc("fcm_vapid_details_db"),await rc("undefined"),vD(e)?e:null}function vD(t){if(!t||!t.subscriptionOptions)return!1;const{subscriptionOptions:e}=t;return typeof t.createTime=="number"&&t.createTime>0&&typeof t.token=="string"&&t.token.length>0&&typeof e.auth=="string"&&e.auth.length>0&&typeof e.p256dh=="string"&&e.p256dh.length>0&&typeof e.endpoint=="string"&&e.endpoint.length>0&&typeof e.swScope=="string"&&e.swScope.length>0&&typeof e.vapidKey=="string"&&e.vapidKey.length>0}/**
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
 */const bD="firebase-messaging-database",ED=1,ds="firebase-messaging-store";let Rc=null;function Nd(){return Rc||(Rc=oa(bD,ED,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ds)}}})),Rc}async function kw(t){const e=Ld(t),s=await(await Nd()).transaction(ds).objectStore(ds).get(e);if(s)return s;{const i=await wD(t.appConfig.senderId);if(i)return await Pd(t,i),i}}async function Pd(t,e){const n=Ld(t),i=(await Nd()).transaction(ds,"readwrite");return await i.objectStore(ds).put(e,n),await i.done,e}async function CD(t){const e=Ld(t),s=(await Nd()).transaction(ds,"readwrite");await s.objectStore(ds).delete(e),await s.done}function Ld({appConfig:t}){return t.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TD={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},Pe=new Dn("messaging","Messaging",TD);/**
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
 */async function SD(t,e){const n=await Dd(t),s=Aw(e),i={method:"POST",headers:n,body:JSON.stringify(s)};let r;try{r=await(await fetch(Od(t.appConfig),i)).json()}catch(o){throw Pe.create("token-subscribe-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Pe.create("token-subscribe-failed",{errorInfo:o})}if(!r.token)throw Pe.create("token-subscribe-no-token");return r.token}async function ID(t,e){const n=await Dd(t),s=Aw(e.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(s)};let r;try{r=await(await fetch(`${Od(t.appConfig)}/${e.token}`,i)).json()}catch(o){throw Pe.create("token-update-failed",{errorInfo:o?.toString()})}if(r.error){const o=r.error.message;throw Pe.create("token-update-failed",{errorInfo:o})}if(!r.token)throw Pe.create("token-update-no-token");return r.token}async function Rw(t,e){const s={method:"DELETE",headers:await Dd(t)};try{const r=await(await fetch(`${Od(t.appConfig)}/${e}`,s)).json();if(r.error){const o=r.error.message;throw Pe.create("token-unsubscribe-failed",{errorInfo:o})}}catch(i){throw Pe.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}}function Od({projectId:t}){return`${fD}/projects/${t}/registrations`}async function Dd({appConfig:t,installations:e}){const n=await e.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Aw({p256dh:t,auth:e,endpoint:n,vapidKey:s}){const i={web:{endpoint:n,auth:e,p256dh:t}};return s!==Sw&&(i.web.applicationPubKey=s),i}/**
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
 */const kD=10080*60*1e3;async function RD(t){const e=await PD(t.swRegistration,t.vapidKey),n={vapidKey:t.vapidKey,swScope:t.swRegistration.scope,endpoint:e.endpoint,auth:xt(e.getKey("auth")),p256dh:xt(e.getKey("p256dh"))},s=await kw(t.firebaseDependencies);if(s){if(LD(s.subscriptionOptions,n))return Date.now()>=s.createTime+kD?ND(t,{token:s.token,createTime:Date.now(),subscriptionOptions:n}):s.token;try{await Rw(t.firebaseDependencies,s.token)}catch(i){console.warn(i)}return wp(t.firebaseDependencies,n)}else return wp(t.firebaseDependencies,n)}async function AD(t){const e=await kw(t.firebaseDependencies);e&&(await Rw(t.firebaseDependencies,e.token),await CD(t.firebaseDependencies));const n=await t.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function ND(t,e){try{const n=await ID(t.firebaseDependencies,e),s={...e,token:n,createTime:Date.now()};return await Pd(t.firebaseDependencies,s),n}catch(n){throw n}}async function wp(t,e){const s={token:await SD(t,e),createTime:Date.now(),subscriptionOptions:e};return await Pd(t,s),s.token}async function PD(t,e){const n=await t.pushManager.getSubscription();return n||t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:_D(e)})}function LD(t,e){const n=e.vapidKey===t.vapidKey,s=e.endpoint===t.endpoint,i=e.auth===t.auth,r=e.p256dh===t.p256dh;return n&&s&&i&&r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(t){const e={from:t.from,collapseKey:t.collapse_key,messageId:t.fcmMessageId};return OD(e,t),DD(e,t),MD(e,t),e}function OD(t,e){if(!e.notification)return;t.notification={};const n=e.notification.title;n&&(t.notification.title=n);const s=e.notification.body;s&&(t.notification.body=s);const i=e.notification.image;i&&(t.notification.image=i);const r=e.notification.icon;r&&(t.notification.icon=r)}function DD(t,e){e.data&&(t.data=e.data)}function MD(t,e){if(!e.fcmOptions&&!e.notification?.click_action)return;t.fcmOptions={};const n=e.fcmOptions?.link??e.notification?.click_action;n&&(t.fcmOptions.link=n);const s=e.fcmOptions?.analytics_label;s&&(t.fcmOptions.analyticsLabel=s)}/**
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
 */function xD(t){return typeof t=="object"&&!!t&&Iw in t}/**
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
 */function FD(t){if(!t||!t.options)throw Ac("App Configuration Object");if(!t.name)throw Ac("App Name");const e=["projectId","apiKey","appId","messagingSenderId"],{options:n}=t;for(const s of e)if(!n[s])throw Ac(s);return{appName:t.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Ac(t){return Pe.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UD{constructor(e,n,s){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=FD(e);this.firebaseDependencies={app:e,appConfig:i,installations:n,analyticsProvider:s}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nw(t){try{t.swRegistration=await navigator.serviceWorker.register(dD,{scope:hD}),t.swRegistration.update().catch(()=>{}),await $D(t.swRegistration)}catch(e){throw Pe.create("failed-service-worker-registration",{browserErrorMessage:e?.message})}}async function $D(t){return new Promise((e,n)=>{const s=setTimeout(()=>n(new Error(`Service worker not registered after ${mp} ms`)),mp),i=t.installing||t.waiting;t.active?(clearTimeout(s),e()):i?i.onstatechange=r=>{r.target?.state==="activated"&&(i.onstatechange=null,clearTimeout(s),e())}:(clearTimeout(s),n(new Error("No incoming service worker found.")))})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BD(t,e){if(!e&&!t.swRegistration&&await Nw(t),!(!e&&t.swRegistration)){if(!(e instanceof ServiceWorkerRegistration))throw Pe.create("invalid-sw-registration");t.swRegistration=e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function HD(t,e){e?t.vapidKey=e:t.vapidKey||(t.vapidKey=Sw)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pw(t,e){if(!navigator)throw Pe.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw Pe.create("permission-blocked");return await HD(t,e?.vapidKey),await BD(t,e?.serviceWorkerRegistration),RD(t)}/**
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
 */async function jD(t,e,n){const s=VD(e);(await t.firebaseDependencies.analyticsProvider.get()).logEvent(s,{message_id:n[Iw],message_name:n[pD],message_time:n[gD],message_device_time:Math.floor(Date.now()/1e3)})}function VD(t){switch(t){case pr.NOTIFICATION_CLICKED:return"notification_open";case pr.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function WD(t,e){const n=e.data;if(!n.isFirebaseMessaging)return;t.onMessageHandler&&n.messageType===pr.PUSH_RECEIVED&&(typeof t.onMessageHandler=="function"?t.onMessageHandler(vp(n)):t.onMessageHandler.next(vp(n)));const s=n.data;xD(s)&&s[mD]==="1"&&await jD(t,n.messageType,s)}const bp="@firebase/messaging",Ep="0.12.23";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qD=t=>{const e=new UD(t.getProvider("app").getImmediate(),t.getProvider("installations-internal").getImmediate(),t.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>WD(e,n)),e},zD=t=>{const e=t.getProvider("messaging").getImmediate();return{getToken:s=>Pw(e,s)}};function GD(){ct(new et("messaging",qD,"PUBLIC")),ct(new et("messaging-internal",zD,"PRIVATE")),Qe(bp,Ep),Qe(bp,Ep,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function KD(){try{await $g()}catch{return!1}return typeof window<"u"&&sa()&&iS()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function YD(t){if(!navigator)throw Pe.create("only-available-in-window");return t.swRegistration||await Nw(t),AD(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JD(t,e){if(!navigator)throw Pe.create("only-available-in-window");return t.onMessageHandler=e,()=>{t.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XD(t=aa()){return KD().then(e=>{if(!e)throw Pe.create("unsupported-browser")},e=>{throw Pe.create("indexed-db-unsupported")}),Mn(ae(t),"messaging").getImmediate()}async function QD(t,e){return t=ae(t),Pw(t,e)}function Cp(t){return t=ae(t),YD(t)}function ZD(t,e){return t=ae(t),JD(t,e)}GD();class Va{constructor(){this.messaging=null,this.currentToken=null,this.vapidKey=bN,this.isInitialized=!1,this.messageCallbacks=new Set,this.tokenRefreshCallbacks=new Set}async initialize(){if(this.isInitialized)return!0;try{return Va.isSupported()?this.vapidKey?(this.messaging=XD(Ta),ZD(this.messaging,e=>{console.log("[FCMTransport] Foreground message received:",e),this.messageCallbacks.forEach(n=>{try{n(e)}catch(s){console.error("[FCMTransport] Error in message callback:",s)}})}),this.isInitialized=!0,console.log("[FCMTransport] Initialized successfully"),!0):(console.warn("[FCMTransport] VAPID key not configured"),!1):(console.warn("[FCMTransport] FCM not supported in this environment"),!1)}catch(e){return console.error("[FCMTransport] Initialization failed:",e),!1}}async getToken(){if(!this.isInitialized&&(console.log("[FCMTransport] Not initialized, initializing now..."),!await this.initialize()))return console.error("[FCMTransport] Initialization failed, cannot get token"),null;try{console.log("[FCMTransport] Requesting FCM token..."),console.log("[FCMTransport] VAPID key present:",!!this.vapidKey),console.log("[FCMTransport] Messaging instance:",!!this.messaging);const e=await QD(this.messaging,{vapidKey:this.vapidKey});return e?(this.currentToken=e,console.log("[FCMTransport] Token obtained successfully"),console.log("[FCMTransport] Token (truncated):",e.substring(0,20)+"..."),await this.storeUserToken(e),e):(console.warn("[FCMTransport] No registration token available"),console.warn("[FCMTransport] This usually means:"),console.warn("[FCMTransport]   1. Service worker is not registered"),console.warn("[FCMTransport]   2. Notification permission not granted"),console.warn("[FCMTransport]   3. VAPID key is incorrect"),null)}catch(e){return console.error("[FCMTransport] Failed to get token:",e),console.error("[FCMTransport] Error name:",e.name),console.error("[FCMTransport] Error code:",e.code),console.error("[FCMTransport] Error message:",e.message),e.code==="messaging/unsupported-browser"?console.error("[FCMTransport] Browser does not support FCM"):e.code==="messaging/permission-blocked"?console.error("[FCMTransport] Notification permission is blocked"):e.code==="messaging/failed-service-worker-registration"&&(console.error("[FCMTransport] Service worker registration failed"),console.error("[FCMTransport] Make sure service worker is registered before calling getToken()")),null}}async refreshToken(){if(console.log("[FCMTransport] Refreshing token..."),this.currentToken)try{await Cp(this.messaging),await this.removeUserToken(this.currentToken)}catch(n){console.warn("[FCMTransport] Failed to delete old token:",n)}this.currentToken=null;const e=await this.getToken();return e&&this.tokenRefreshCallbacks.forEach(n=>{try{n(e)}catch(s){console.error("[FCMTransport] Error in token refresh callback:",s)}}),e}async deleteToken(){if(!this.messaging||!this.currentToken)return!0;try{return await Cp(this.messaging),await this.removeUserToken(this.currentToken),this.currentToken=null,console.log("[FCMTransport] Token deleted successfully"),!0}catch(e){return console.error("[FCMTransport] Failed to delete token:",e),!1}}async storeUserToken(e){const n=M();if(!n){console.warn("[FCMTransport] Cannot store token: user not logged in");return}try{const s=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`),i={token:e,deviceInfo:{platform:this.getPlatform(),timestamp:Date.now()},createdAt:Date.now(),lastUsed:Date.now()};await ne(s,i),console.log("[FCMTransport] Token stored in RTDB")}catch(s){console.error("[FCMTransport] Failed to store token in RTDB:",s)}}async removeUserToken(e){const n=M();if(n)try{const s=b(E,`users/${n}/fcmTokens/${this.getTokenId(e)}`);await tt(s),console.log("[FCMTransport] Token removed from RTDB")}catch(s){console.error("[FCMTransport] Failed to remove token from RTDB:",s)}}async getUserTokens(e){try{const n=b(E,`users/${e}/fcmTokens`),s=await Me(n);if(s.exists()){const i=s.val();return Object.values(i)}return[]}catch(n){return console.error("[FCMTransport] Failed to get user tokens:",n),[]}}async sendCallNotification(e,n){const{roomId:s,callerId:i,callerName:r}=n,o={type:"call",roomId:s,callerId:i,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Incoming call from ${r}`,body:"Tap to answer or decline",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMissedCallNotification(e,n){const{roomId:s,callerId:i,callerName:r}=n,o={type:"missed_call",roomId:s,callerId:i,callerName:r,timestamp:Date.now().toString()},a="/HangVidU/",c={notification:{title:`Missed call from ${r}`,body:"Tap to call back",icon:`${a}icons/play-arrows-v1/icon-192.png`,badge:`${a}icons/play-arrows-v1/icon-192.png`},data:o};return this.sendNotification(e,c)}async sendMessageNotification(e,n){const{senderId:s,senderName:i,messageText:r}=n,o=typeof r=="string"?r:String(r||""),a=o.length>50?o.substring(0,47)+"...":o,c={type:"message",senderId:s,senderName:i,messagePreview:a,timestamp:Date.now().toString()},l="/HangVidU/",u={notification:{title:`New message from ${i}`,body:a,icon:`${l}icons/play-arrows-v1/icon-192.png`,badge:`${l}icons/play-arrows-v1/icon-192.png`},data:c};return this.sendNotification(e,u)}async sendNotification(e,n){try{{let o=null;try{const{getLoggedInUserToken:l}=await fe(async()=>{const{getLoggedInUserToken:u}=await Promise.resolve().then(()=>Na);return{getLoggedInUserToken:u}},void 0);o=await l()}catch(l){console.warn("[FCMTransport] Failed to get auth token:",l)}const a={"Content-Type":"application/json"};o&&(a.Authorization=`Bearer ${o}`);const c=await fetch("https://europe-west1-vidu-aae11.cloudfunctions.net/sendCallNotification",{method:"POST",headers:a,body:JSON.stringify({targetUserId:e,callData:n.data})});if(c.ok){const l=await c.json();return console.log(`[FCMTransport] FCM notification sent to ${e}:`,l),!0}else return console.error("[FCMTransport] FCM function failed:",c.status),!1}const s=b(E,`notifications/${e}`),i=Xs(s).key,r={id:i,payload:n,createdAt:Date.now(),delivered:!1};return await ne(b(E,`notifications/${e}/${i}`),r),console.log(`[FCMTransport] Notification queued for user ${e} (dev mode)`),!0}catch(s){return console.error("[FCMTransport] Failed to send notification:",s),!1}}onMessage(e){return this.messageCallbacks.add(e),()=>this.messageCallbacks.delete(e)}onTokenRefresh(e){return this.tokenRefreshCallbacks.add(e),()=>this.tokenRefreshCallbacks.delete(e)}getTokenId(e){return btoa(e).replace(/[^a-zA-Z0-9]/g,"").substring(0,20)}getPlatform(){const e=navigator.userAgent;return/iPhone|iPad|iPod/.test(e)?"ios":/Android/.test(e)?"android":/Macintosh/.test(e)?"macos":/Windows/.test(e)?"windows":"unknown"}static isSupported(){return"serviceWorker"in navigator&&"Notification"in window&&"PushManager"in window}}const eM=Object.freeze(Object.defineProperty({__proto__:null,FCMTransport:Va},Symbol.toStringTag,{value:"Module"}));class tM{constructor(e=null,n={}){this.transport=e||new Va,this.isEnabled=!1,this.permissionState="default",this.options={enableCallNotifications:!0,enableMessageNotifications:!0,privacyMode:!1,autoHideSuccessMs:6e3,...n},this.activeNotifications=new Map,this.permissionCallbacks=new Set,this.notificationCallbacks=new Set}async initialize(){try{return await this.transport.initialize()?(this.permissionState=this.getPermissionState(),this.transport.onMessage(n=>{this.handleForegroundMessage(n)}),console.log("[PushNotificationController] Initialized successfully"),!0):(console.warn("[PushNotificationController] Transport initialization failed"),!1)}catch(e){return console.error("[PushNotificationController] Initialization failed:",e),!1}}async requestPermission(e={}){const{title:n="Enable notifications",explain:s="Get notified of incoming calls and messages even when the app is closed.",onGranted:i=null,onDenied:r=null,onDismissed:o=null}=e;if(!this.isNotificationSupported())return console.warn("[PushNotificationController] Notifications not supported"),{state:"denied",reason:"unsupported"};this.detectBrowser();const a=Notification.permission;if(this.permissionState=a,a==="granted")return await this.enable(),i?.(),{state:"granted"};if(a==="denied")return r?.("already-denied"),{state:"denied",reason:"already-denied"};let c;try{c=await Notification.requestPermission()}catch(l){console.error("[PushNotificationController] Permission request failed:",l),c=Notification.permission}return this.permissionState=c,c==="granted"?(await this.enable(),i?.(),{state:"granted"}):a==="default"&&c==="denied"?(r?.("silent-block"),{state:"denied",reason:"silent-block"}):c==="default"?(o?.(),{state:"dismissed"}):(r?.(),{state:"denied"})}async enableIfGranted(){return this.isNotificationSupported()?(this.permissionState=Notification.permission,this.permissionState==="granted"?await this.enable()?{state:"enabled"}:{state:"error",reason:"enable-failed"}:this.permissionState==="denied"?{state:"denied"}:{state:"prompt-needed"}):{state:"unsupported"}}async enable(){if(this.permissionState!=="granted")return console.warn("[PushNotificationController] Cannot enable: permission not granted"),!1;try{return await this.transport.getToken()?(this.isEnabled=!0,console.log("[PushNotificationController] Notifications enabled"),this.permissionCallbacks.forEach(n=>{try{n("enabled")}catch(s){console.error("[PushNotificationController] Error in permission callback:",s)}}),!0):(console.warn("[PushNotificationController] Failed to get FCM token"),!1)}catch(e){return console.error("[PushNotificationController] Failed to enable notifications:",e),!1}}async disable(){try{return await this.transport.deleteToken(),this.isEnabled=!1,this.activeNotifications.clear(),console.log("[PushNotificationController] Notifications disabled"),this.permissionCallbacks.forEach(e=>{try{e("disabled")}catch(n){console.error("[PushNotificationController] Error in permission callback:",n)}}),!0}catch(e){return console.error("[PushNotificationController] Failed to disable notifications:",e),!1}}async sendCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[PushNotificationController] Call notifications disabled"),!1;try{const s=await this.transport.sendCallNotification(e,n);if(s){const i=`call_${n.roomId}_${Date.now()}`;this.activeNotifications.set(i,{type:"call",roomId:n.roomId,targetUserId:e,timestamp:Date.now()}),console.log(`[PushNotificationController] Call notification sent to ${e}`)}return s}catch(s){return console.error("[PushNotificationController] Failed to send call notification:",s),!1}}async sendMissedCallNotification(e,n){if(!this.options.enableCallNotifications)return console.log("[PushNotificationController] Call notifications disabled (missed call masked)"),!1;try{const s=await this.transport.sendMissedCallNotification(e,n);return s&&console.log(`[PushNotificationController] Missed call notification sent to ${e}`),s}catch(s){return console.error("[PushNotificationController] Failed to send missed call notification:",s),!1}}async sendMessageNotification(e,n){if(!this.options.enableMessageNotifications)return console.log("[PushNotificationController] Message notifications disabled"),!1;if(!this.shouldSendNotification())return console.log("[PushNotificationController] Not sending message notification (app in foreground)"),!1;try{const s=await this.transport.sendMessageNotification(e,n);if(s){const i=`message_${e}_${Date.now()}`;this.activeNotifications.set(i,{type:"message",senderId:n.senderId,targetUserId:e,timestamp:Date.now()}),console.log(`[PushNotificationController] Message notification sent to ${e}`)}return s}catch(s){return console.error("[PushNotificationController] Failed to send message notification:",s),!1}}async dismissCallNotifications(e){try{const n=[];for(const[s,i]of this.activeNotifications)i.type==="call"&&i.roomId===e&&n.push(s);n.forEach(s=>this.activeNotifications.delete(s)),n.length>0&&console.log(`[PushNotificationController] Dismissed ${n.length} call notifications for room ${e}`)}catch(n){console.error("[PushNotificationController] Failed to dismiss call notifications:",n)}}async dismissMessageNotifications(e){try{const n=[];for(const[s,i]of this.activeNotifications)i.type==="message"&&i.senderId===e&&n.push(s);n.forEach(s=>this.activeNotifications.delete(s)),n.length>0&&console.log(`[PushNotificationController] Dismissed ${n.length} message notifications from ${e}`)}catch(n){console.error("[PushNotificationController] Failed to dismiss message notifications:",n)}}async cleanupOldNotifications(){const e=Date.now(),n=1440*60*1e3,s=[];for(const[i,r]of this.activeNotifications)e-r.timestamp>n&&s.push(i);s.forEach(i=>this.activeNotifications.delete(i)),s.length>0&&console.log(`[PushNotificationController] Cleaned up ${s.length} old notifications`)}handleForegroundMessage(e){console.log("[PushNotificationController] Foreground message received:",e);const n=e?.data?.senderId||e?.data?.callerId,s=M();if(n&&s&&n===s){console.log("[PushNotificationController] Ignoring self-notification");return}this.notificationCallbacks.forEach(i=>{try{i(e)}catch(r){console.error("[PushNotificationController] Error in notification callback:",r)}})}shouldSendNotification(){return document.hidden||!document.hasFocus()}getPermissionState(){return this.isNotificationSupported()?Notification.permission:"unsupported"}isNotificationEnabled(){return this.isEnabled&&this.permissionState==="granted"}isNotificationSupported(){const e=this.transport?.constructor;return typeof e?.isSupported=="function"?e.isSupported():"Notification"in window&&"serviceWorker"in navigator}updateOptions(e){this.options={...this.options,...e},console.log("[PushNotificationController] Options updated:",this.options)}onPermissionChange(e){return this.permissionCallbacks.add(e),()=>this.permissionCallbacks.delete(e)}onNotification(e){return this.notificationCallbacks.add(e),()=>this.notificationCallbacks.delete(e)}detectBrowser(){if(navigator.userAgentData&&navigator.userAgentData.brands){const n=navigator.userAgentData.brands.map(s=>s.brand);if(n.some(s=>s.includes("Microsoft Edge")))return"Edge";if(n.some(s=>s.includes("Google Chrome")))return"Chrome";if(n.some(s=>s.includes("Chromium")))return"Chromium"}const e=navigator.userAgent;return e.includes("Edg/")?"Edge":e.includes("Chrome/")?"Chrome":e.includes("Safari/")&&!e.includes("Chrome")?"Safari":e.includes("Firefox/")?"Firefox":"Your browser"}async formatCallNotification(e){const{roomId:n,callerId:s,callerName:i}=e;let r=i||s||"Unknown caller";if(!i)try{const{resolveCallerName:o}=await fe(async()=>{const{resolveCallerName:a}=await Promise.resolve().then(()=>Ml);return{resolveCallerName:a}},void 0);r=await o(n,s)}catch(o){console.warn("[PushNotificationController] Failed to resolve caller name:",o)}return this.options.privacyMode&&(r="Someone"),{...e,callerName:r}}async formatMessageNotification(e){const{senderId:n,senderName:s,messageText:i}=e;let r=s,o=i;try{const{getContacts:a}=await fe(async()=>{const{getContacts:l}=await Promise.resolve().then(()=>Ml);return{getContacts:l}},void 0),c=await a();c&&c[n]&&(r=c[n].name||s)}catch(a){console.warn("[PushNotificationController] Failed to resolve sender name:",a),r=s||n||"Unknown sender"}return this.options.privacyMode?(r="Someone",o="New message"):o&&o.length>50&&(o=o.substring(0,47)+"..."),{...e,senderName:r,messageText:o}}}const we=new tM,Wi=new Map,qi=new Map,dn=new Map,Tp=14;function nM(t){return Object.keys(t).sort((e,n)=>{const s=t[e]?.lastInteractionAt||t[e]?.savedAt||0;return(t[n]?.lastInteractionAt||t[n]?.savedAt||0)-s})}async function gr(t,e,n){const s=M(),i=Date.now();if(s){const r=b(E,`users/${s}/contacts/${t}`);await ne(r,{contactId:t,contactName:e,roomId:n,savedAt:i,lastInteractionAt:i});return}try{const r=localStorage.getItem("contacts")||"{}",o=JSON.parse(r);o[t]={contactId:t,contactName:e,roomId:n,savedAt:i,lastInteractionAt:i},localStorage.setItem("contacts",JSON.stringify(o))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function Md(t){const e=M();if(e)try{const n=b(E,`users/${e}/contacts/${t}`);await bn(n,{lastInteractionAt:Date.now()})}catch(n){console.warn("Failed to update lastInteractionAt",n)}}async function Zt(){const t=M();if(t)try{const e=b(E,`users/${t}/contacts`),n=await Me(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function Dl(t){if(!t)return null;try{const e=await Zt();for(const n of Object.values(e||{}))if(n?.roomId===t)return n}catch(e){console.warn("Failed to get contact by roomId",e)}return null}async function Lw(t,e){if(!t)return e||"Unknown";try{const n=await Zt();for(const s of Object.values(n||{}))if(s?.roomId===t)return s.contactName||s.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function Ow(t,e,n){if(!t||!e)return;const i=(await Zt())?.[t];if(i){i.roomId!==e&&(await gr(t,i.contactName,e),await Lt(n)),document.dispatchEvent(new CustomEvent("contact:saved",{detail:{roomId:e}}));return}if(!await Ba("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await gr(t,o,e),document.dispatchEvent(new CustomEvent("contact:saved",{detail:{roomId:e}})),await Lt(n)}async function Lt(t){if(!t)return;const e=await Zt(),n=nM(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",C(s);return}H(s),s.innerHTML=`
    <h3>Contacts</h3>
    <div class="contacts-list">
      ${n.map(i=>{const r=e[i];return`
            <div class="contact-entry">
              <div class="contact-msg-toggle-container" data-contact-id="${i}"></div>
              <span
                class="contact-name"
                data-room-id="${r.roomId||""}"
                data-contact-name="${r.contactName}"
                data-contact-id="${i}"
                title="Call ${r.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${i}"></span>
                <i class="fa fa-phone"></i>
                ${r.contactName&&r.contactName.length>Tp?r.contactName.slice(0,Tp-2)+"..":r.contactName}
              </span>

              <button
                class="contact-edit-btn"
                data-contact-id="${i}"
                title="Edit contact name"
              >
                ✏️
              </button>

              <button
                class="contact-delete-btn"
                data-contact-id="${i}"
                title="Delete contact"
              >
                ✕
              </button>

            </div>
          `}).join("")}
    </div>
  `,sM(s,t),iM(n),await rM(s,n,e),M()&&Promise.all(n.map(async i=>{if(!(await Me(b(E,`users/${i}/presence`))).exists()){const o=s.querySelector(`.contact-entry:has([data-contact-id="${i}"])`);o&&o.remove()}})).catch(i=>console.warn("[CONTACTS] Background presence check failed:",i))}function sM(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=s=>{s.stopPropagation();const i=n.getAttribute("data-contact-id"),r=n.getAttribute("data-contact-name");if(i){cs.openContactMessages(i,r);const o=dn.get(i);o&&o.clearBadge()}}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{let s=n.getAttribute("data-room-id");const i=n.getAttribute("data-contact-name"),r=n.getAttribute("data-contact-id");(s||r)&&document.dispatchEvent(new CustomEvent("contact:call",{detail:{contactId:r,contactName:i,roomId:s}}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!await Ba("Delete this contact?")||(await oM(s),await Lt(e))}}),t.querySelectorAll(".contact-edit-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");if(!s)return;const r=(await Zt())[s];if(!r)return;const o=prompt("Enter new name for this contact:",r.contactName);o&&o.trim()&&o.trim()!==r.contactName&&(await gr(s,o.trim(),r.roomId),await Lt(e))}})}function iM(t){Wi.forEach(({ref:e,callback:n})=>{ft(e,"value",n)}),Wi.clear(),M()&&t.forEach(e=>{const n=b(E,`users/${e}/presence`),s=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!s)return;const i=r=>{const a=r.val()?.state==="online";s.classList.toggle("online",a),s.title=a?"Online":"Offline"};Fu(n,i),Wi.set(e,{ref:n,callback:i})})}let Ti=!1,bs=null;async function rM(t,e,n){if(!M())return;const s=10;let i=0;for(;Ti&&i<s;)await new Promise(r=>setTimeout(r,100)),i++;if(Ti){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}Ti=!0,bs&&clearTimeout(bs),bs=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),Ti=!1},5e3);try{dn.forEach(o=>{o.cleanup()}),dn.clear(),qi.forEach(o=>{o()}),qi.clear();const r=M();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=sw({parent:c,onToggle:()=>{cs.openContactMessages(o,a.contactName,!0);const d=dn.get(o);d&&d.clearBadge()},icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}dn.set(o,l);const u=Pt.listenToUnreadCount(o,d=>{l.setUnreadCount(d),d>0&&Md(o)});qi.set(o,u)}Promise.all(e.map(o=>Pt.getUnreadCount(o).then(a=>{const c=dn.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{bs&&(clearTimeout(bs),bs=null),Ti=!1}}async function oM(t){const e=M();if(e){try{await tt(b(E,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function Dw(){Wi.forEach(({ref:t,callback:e})=>{ft(t,"value",e)}),Wi.clear(),qi.forEach(t=>t()),qi.clear(),dn.forEach(t=>t.cleanup()),dn.clear()}const Ml=Object.freeze(Object.defineProperty({__proto__:null,cleanupContacts:Dw,getContactByRoomId:Dl,getContacts:Zt,renderContactsList:Lt,resolveCallerName:Lw,saveContact:Ow,saveContactData:gr,updateLastInteraction:Md},Symbol.toStringTag,{value:"Module"})),Es="enable-notifications";function Sp(){if(We.has(Es))return We.notifications.get(Es);const t=Sd({template:`
      <div class="notification-content">
        <div class="notification-header">
          <span class="notification-icon">🔔</span>
          <span class="notification-title">Enable Notifications</span>
          <button class="notification-dismiss" onclick="handleDismiss" title="Dismiss">×</button>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            Get notified when someone calls you, even when the app is closed.
          </p>
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-primary" onclick="handleEnable">
            Enable
          </button>
        </div>
      </div>
    `,className:"notification enable-notifications-notification",handlers:{handleEnable:async e=>{const n=e.target;n.disabled=!0,n.textContent="Enabling...";try{const s=await we.requestPermission();s.state==="granted"?($a("Notifications enabled"),We.remove(Es)):s.state==="denied"?(sO("Notifications blocked. Check browser settings."),We.remove(Es)):(n.disabled=!1,n.textContent="Enable")}catch(s){console.error("[ENABLE NOTIFICATIONS] Failed:",s),n.disabled=!1,n.textContent="Enable"}},handleDismiss:()=>{We.remove(Es)}}});return We.add(Es,t),t}function aM(){C(Fe),C(Se),C(He),C(ot)}function cM(t){t.on("memberJoined",Ky),t.on("cleanup",()=>{Yn(),Yy()})}function lM(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function uM(){return lM()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function dM(){const t=await uM();let e=!1,n=!1;return t.forEach(s=>{const i=s.label.toLowerCase();(i.includes("front")||i.includes("user"))&&(e=!0),(i.includes("back")||i.includes("rear")||i.includes("environment"))&&(n=!0)}),e&&n}async function hM({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const i=n==="user"?"environment":"user";try{const r=await navigator.mediaDevices.getUserMedia({video:rw(i),audio:iw()}),o=r.getVideoTracks()[0],a=r.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:r,facingMode:i}}catch(r){return console.error("Failed to switch camera:",r),null}}let Ip=[];function fM(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function pM({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:i=null,micBtn:r,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){r&&(r.onclick=()=>{const d=t();if(!d)return;const h=d.getAudioTracks()[0];h&&(h.enabled=!h.enabled,fM(!h.enabled,r))}),o&&(o.onclick=()=>{const d=t();if(!d)return;const h=d.getVideoTracks()[0];if(h){h.enabled=!h.enabled;const f=o.querySelector("i");f.className=h.enabled?"fa fa-video":"fa fa-video-slash"}}),a&&(a.onclick=async()=>{const d=await hM({localStream:t(),localVideo:e(),currentFacingMode:Dy(),peerConnection:s()||null});d?(My(d.facingMode),console.log("Switched camera to facingMode:",d.facingMode),d.newStream&&typeof i=="function"&&i(d.newStream)):console.error("Camera switch failed.")},(async()=>await dM()?H(a):C(a))()),c&&(c.onclick=()=>{const d=n();if(!d)return;d.muted=!d.muted;const h=c.querySelector("i");h.className=d.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const d=n();d.requestFullscreen?d.requestFullscreen():d.webkitRequestFullscreen&&d.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const d=n();d&&(_d(d)?await Da(d):await Ly(d,d.parentElement))})}function gM(){Ip.forEach(t=>t()),Ip=[]}let Nc=null,hn=null,se=null,te=null,kp=!1,Gr=!1,At=[],xl="",De=-1,Fl=[];const mM="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",_M="https://www.googleapis.com/youtube/v3";async function yM(){if(kp||Gr)return!1;Gr=!0;const{initializeYouTubeElements:t}=await fe(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>nL);return{initializeYouTubeElements:o}},void 0),e=await t();if(Nc=e.searchContainer,hn=e.searchBtn,se=e.searchQuery,te=e.searchResults,!Nc||!hn||!se||!te)return console.error("YouTube search elements not found in DOM"),Gr=!1,!1;const n=o=>/^https?:\/\//i.test(o),s=o=>{(te?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),De=o??-1};hn.onclick=async()=>{const o=se.value.trim();if(Ui(se)){H(se),se.focus();return}if(!o){oo(),C(se);return}if(Np()&&o===xl)Ul(At);else if(!n(o))await Rp(o);else{await hr({url:o,title:o,channel:"",thumbnail:"",id:o}),C(te),se.value="",C(se),De=-1;return}},Nc.addEventListener("keydown",async o=>{const a=te.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=De+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=De-1;c<0&&(c=De===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&De>=0){a[De].click(),C(se),C(te),De=-1;return}const c=se.value.trim();if(c)if(Np()&&c===xl)Ul(At);else if(!n(c))await Rp(c);else{await hr({url:c,title:c,channel:"",thumbnail:"",id:c}),C(te),De=-1,se.value="",C(se);return}}else o.key==="Escape"&&(vM()?oo():se.value?se.value="":C(se))}),se.addEventListener("input",()=>{se.value.trim()===""&&oo(),De=-1});const i=fr(se,()=>C(se),{ignore:[hn],esc:!1});Fl.push(i);const r=fr(te,()=>C(te),{ignore:[hn],esc:!1});return Fl.push(r),Gr=!1,kp=!0,!0}async function Rp(t){if(!hn||!te){console.error("Search elements not initialized");return}At=[],xl=t,hn.disabled=!0,te.innerHTML='<div class="search-loading">Searching YouTube...</div>',H(te);try{const e=await fetch(`${_M}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${mM}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){Ap("No videos found"),At=[];return}At=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),Ul(At)}catch(e){console.error("YouTube search failed:",e),Ap(e.message||"Search failed. Please try again.")}finally{hn.disabled=!1}}function Ul(t){if(!te){console.error("Search results element not initialized");return}if(!t||t.length===0){te.innerHTML='<div class="search-no-results">No results found</div>',At=[],De=-1;return}te.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(await hr(n),C(te),De=-1,!se){console.error("Search query element not initialized");return}se.value="",C(se)},te.appendChild(s)}),H(te),De=0,te.querySelectorAll(".search-result-item").forEach((n,s)=>{s===De?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function Ap(t){if(At=[],De=-1,!te){console.error("Search results element not initialized");return}te.innerHTML=`<div class="search-error">${t}</div>`,H(te)}function oo(){At=[],De=-1,te&&(te.innerHTML="",C(te))}function wM(){oo(),Fl.forEach(t=>t())}function vM(){return!Ui(te)}function Np(){return At.length>0}function bM({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:s=!1}={}){let i=e;const r=Fa({initialProps:{unreadCount:0,isHidden:!0},template:`
      <button
        class="notifications-toggle-btn"
        title="Notifications"
        onclick="handleClick"
      >
        <i class="fa fa-bell"></i>
        <span class="notification-badge">
          [[unreadCount]]
        </span>
      </button>
    `,handlers:{handleClick:()=>{n?n():i&&i.toggleList()}},className:"notifications-toggle-container",parent:t});let o=r.querySelector(".notification-badge");return o&&(o.style.display="none"),r.onPropUpdated("unreadCount",a=>{const c=r.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),r.show=()=>{r.isHidden=!1,r.style.display="block"},r.hide=()=>{r.isHidden=!0,r.style.display="none"},r.setUnread=a=>{r.unreadCount=a,a>0?r.show():s&&r.hide()},r.setManager=a=>{i=a},r}function EM({fromUserId:t,inviteData:e,onAccept:n,onDecline:s}){const i=e.fromName||"Someone",r=e.fromEmail||"",o=e.fromPhotoURL,a=o?`<img src="${st(o)}" alt="${st(i)}" class="notification-avatar" />`:'<span class="notification-icon">👤</span>';return Sd({template:`
      <div class="notification-content">
        <div class="notification-header">
          ${a}
          <span class="notification-title">Contact Invitation</span>
        </div>
        <div class="notification-body">
          <p class="notification-message">
            <strong>${st(i)}</strong> wants to connect
          </p>
          ${r?`<p class="notification-detail">${st(r)}</p>`:""}
        </div>
        <div class="notification-actions">
          <button class="notification-btn notification-btn-accept" onclick="handleAccept">
            Accept
          </button>
          <button class="notification-btn notification-btn-decline" onclick="handleDecline">
            Decline
          </button>
        </div>
      </div>
    `,className:"notification invite-notification",handlers:{handleAccept:async l=>{const u=l.target;u.disabled=!0,u.textContent="Accepting...";try{n&&await n()}catch(d){console.error("[INVITE NOTIFICATION] Accept failed:",d),u.disabled=!1,u.textContent="Accept"}},handleDecline:async l=>{const u=l.target;u.disabled=!0,u.textContent="Declining...";try{s&&await s()}catch(d){console.error("[INVITE NOTIFICATION] Decline failed:",d),u.disabled=!1,u.textContent="Decline"}}}})}let Si=null;const CM=!1;function TM(t,e=20){if(!t||t.length<=e)return t;const s=t.split(" ")[0];return s.length<=e?s:s.slice(0,e-3)+"..."}const SM=(t,e=null)=>{if(Si)return Si;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,i=10;typeof e=="number"&&(i=e);const r=rd();return Si=Fa({initialProps:{isLoggedIn:r,userName:"Guest User",userPhotoURL:"",userPhotoDisplay:"none",userInfoDisplay:"none",avatarDisplay:"none",signingInDisplay:"none",loginBtnMarginRightPx:i,loginBtnDisplay:r?"none":"inline-block",logoutBtnDisplay:r?"inline-block":"none"},template:`
      <button style="margin-right: [[loginBtnMarginRightPx]]px; display: [[loginBtnDisplay]]" id="goog-login-btn" class="login-btn" onclick="handleLogin">Login</button>
      <button style="display: [[logoutBtnDisplay]]" id="goog-logout-btn" class="logout-btn" onclick="handleLogout">Logout</button>
      ${E0()&&CM?'<button id="delete-account-btn" class="delete-account-btn" onclick="handleDeleteAccount">Delete Account</button>':""}
      <span class="signing-in-indicator" style="display: [[signingInDisplay]]; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info" style="display: [[userInfoDisplay]]">
        <img src="[[userPhotoURL]]" alt="[[userName]]" class="user-avatar" style="display: [[userPhotoDisplay]]" />
        <span class="user-avatar-placeholder" style="display: [[avatarDisplay]]">👤</span>
        <span class="user-name">[[userName]]</span>
      </div>
    `,handlers:{handleLogin:async o=>{try{await $o(o)}catch(a){console.error("[AuthComponent] Handle login error:",a),alert("Login failed. Please refresh the page, check your connection and try again.")}},handleLogout:vy,handleDeleteAccount:async()=>{if(confirm(`Are you sure you want to delete your account?

This will permanently delete:
• Your account
• All contacts
• Call history
• All associated data

This action cannot be undone.`))try{await by(),alert("Your account has been deleted successfully.")}catch(a){console.error("[AuthComponent] Delete account error:",a),alert(a.message||"Failed to delete account. Please try again.")}}},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.style.display=c?"none":"inline-block",u.style.display=c?"inline-block":"none");const d=o.querySelector("#delete-account-btn");d&&(d.style.display=c?"inline-block":"none")};a(r),n=od(({isLoggedIn:c,userName:l,user:u})=>{const d=TM(u?.displayName||l),h=u?.photoURL||"";G("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:d,photoURL:h}),c&&A0(),a(c),o.update({isLoggedIn:c,userName:d,userPhotoURL:h,userPhotoDisplay:h?"block":"none",userInfoDisplay:c?"flex":"none",avatarDisplay:h?"none":"flex",signingInDisplay:"none",loginBtnDisplay:c?"none":"inline-block",logoutBtnDisplay:c?"inline-block":"none"})}),s=k0(c=>{G("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),Si=null},className:"auth-component",parent:t}),Si},IM="https://people.googleapis.com/v1/people/me/connections",kM="https://people.googleapis.com/v1/otherContacts";async function RM(t){if(!t)throw new Error("Access token is required");const e=[],n=await Pp(t,IM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] My Contacts: ${n.length}`),e.push(...n);const s=await Pp(t,kM,"names,emailAddresses");console.log(`[GOOGLE CONTACTS] Other Contacts: ${s.length}`),e.push(...s),console.log(`[GOOGLE CONTACTS] Total: ${e.length} contacts with email addresses`);const i=new Set;return e.filter(o=>i.has(o.email)?!1:(i.add(o.email),!0))}async function Pp(t,e,n){const s=[];let i=null;do{const r=new URL(e);r.searchParams.set("pageSize","100"),e.includes("otherContacts")?r.searchParams.set("readMask",n):r.searchParams.set("personFields",n),i&&r.searchParams.set("pageToken",i);const o=await fetch(r.toString(),{headers:{Authorization:`Bearer ${t}`}});if(!o.ok){const l=await o.json().catch(()=>({}));if(e.includes("otherContacts"))return console.warn("[GOOGLE CONTACTS] Other contacts fetch failed (may need additional scope):",l.error?.message),s;throw console.error("[GOOGLE CONTACTS] API error:",l),new Error(l.error?.message||`API error: ${o.status}`)}const a=await o.json(),c=a.connections||a.otherContacts||[];for(const l of c){const u=l.emailAddresses||[],h=(l.names||[])[0]?.displayName||"Unknown";for(const f of u)f.value&&s.push({email:f.value.toLowerCase().trim(),name:h})}i=a.nextPageToken}while(i);return s}function AM(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function NM(t,e,n,s){const r=[`To: ${(Array.isArray(e)?e:[e]).join(", ")}`,`Subject: ${n}`,"Content-Type: text/plain; charset=utf-8","",s].join(`\r
`),o=AM(new TextEncoder().encode(r)),a=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{method:"POST",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({raw:o})});if(!a.ok){const l=await a.json().catch(()=>({}));throw new Error(l.error?.message||`Gmail API error: ${a.status}`)}const c=await a.json();return console.log("[GMAIL] Email sent successfully:",c.id),c}async function PM(t,e,n,s){const i={sent:0,failed:0,errors:[]};for(let r=0;r<e.length;r++){const o=e[r];try{await NM(t,o.email,n,s),i.sent++,console.log(`[GMAIL] Sent to ${o.name} (${o.email})`)}catch(a){i.failed++;const c=a&&a.message||String(a);i.errors.push({email:o.email,name:o.name,error:c}),console.error(`[GMAIL] Failed to send to ${o.name}:`,c)}r<e.length-1&&await new Promise(a=>setTimeout(a,150))}return console.log(`[GMAIL] Bulk send complete: ${i.sent} sent, ${i.failed} failed`),i}async function LM(){return new Promise(t=>{const e=document.createElement("dialog");e.classList.add("add-contact-modal"),e.innerHTML=`
      <h2>Add Contacts</h2>

      <div class="platform-selector">
        <button type="button" class="platform-btn active" data-platform="google" title="Import from Google Contacts">
          <i class="fa-brands fa-google"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="facebook" title="Import from Facebook (Coming soon)" disabled>
          <i class="fa-brands fa-facebook"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="instagram" title="Import from Instagram (Coming soon)" disabled>
          <i class="fa-brands fa-instagram"></i>
        </button>
        <button type="button" class="platform-btn" data-platform="tiktok" title="Import from TikTok (Coming soon)" disabled>
          <i class="fa-brands fa-tiktok"></i>
        </button>
      </div>

      <div class="search-section">
        <input
          type="text"
          id="contact-search-input"
          class="contact-search-input"
          placeholder="Search..."
        />
      </div>

      <div id="contacts-container" class="contacts-container-modal">
        <p class="empty-state">Select a platform above to import contacts</p>
      </div>

      <div id="import-status" class="import-status"></div>

      <div id="bulk-actions-container" class="bulk-actions-container"></div>

      <div class="modal-footer">
        <button type="button" data-action="cancel" class="cancel-btn">Close</button>
      </div>
    `;const n=e.querySelector('[data-action="cancel"]'),s=e.querySelector("#contact-search-input"),i=e.querySelector("#import-status"),r=e.querySelector("#contacts-container"),o=e.querySelector("#bulk-actions-container"),a=e.querySelectorAll(".platform-btn");let c="google",l=[],u=[];const d=new Set;function h(){e.close(),e.remove(),t()}n.addEventListener("click",h),e.addEventListener("cancel",h),a.forEach(p=>{p.addEventListener("click",async()=>{if(p.disabled)return;const m=p.getAttribute("data-platform");a.forEach(g=>g.classList.remove("active")),p.classList.add("active"),c=m,m==="google"&&await f()})}),s.addEventListener("input",()=>{const p=s.value.trim().toLowerCase();p?u=l.filter(m=>{const g=(m.name||"").toLowerCase().includes(p),T=(m.email||"").toLowerCase().includes(p);return g||T}):u=l,Lp(r,o,u,d)});async function f(){i.textContent="Requesting access...",i.className="import-status loading",r.innerHTML="",l=[],u=[];try{const p=await Cy();i.textContent="Fetching contacts...";const m=await RM(p);if(m.length===0){i.textContent="No contacts with email addresses found.",i.className="import-status not-found",r.innerHTML='<p class="empty-state">No contacts found.</p>';return}i.textContent=`Found ${m.length} contacts. Checking HangVidU...`;const g=await Zt(),T=new Set(Object.keys(g||{})),B=m.map(F=>F.email),N=await gy(B),w=Nn();l=[];for(const F of m){const W=N[F.email],Le=W&&W.uid===w?.uid,pe=W&&T.has(W.uid);Le||l.push({...F,user:W,isAlreadySaved:pe})}l.sort((F,W)=>{const Le=nn=>nn.user&&!nn.isAlreadySaved?1:2,pe=Le(F),Re=Le(W);return pe!==Re?pe-Re:(F.name||"").localeCompare(W.name||"",void 0,{sensitivity:"base"})}),u=l,i.textContent=`Found ${l.length} contacts`,i.className="import-status success",Lp(r,o,u,d)}catch(p){console.error("[ADD CONTACT] Import error:",p),p.message==="Authorization cancelled"?(i.textContent="Import cancelled.",i.className="import-status cancelled"):(i.textContent=`Error: ${p.message}`,i.className="import-status error"),r.innerHTML='<p class="empty-state">Failed to load contacts.</p>'}}document.body.appendChild(e),e.showModal(),c==="google"&&f()})}function Lp(t,e,n,s){if(t.innerHTML="",n.length===0){t.innerHTML='<p class="empty-state">No contacts found.</p>';return}const i=document.createElement("div");i.className="results-header",i.innerHTML=`
    <label class="select-all-label">
      <input type="checkbox" id="select-all-checkbox" />
      <span>Select All (${n.length})</span>
    </label>
  `,t.appendChild(i);const r=document.createElement("div");r.className="contacts-scroll-list";const o=document.createElement("ul");o.className="contact-list";for(const h of n){const{name:f,email:p,user:m,isAlreadySaved:g}=h,T=document.createElement("li");T.className="contact-item";let B="",N="";if(g?(B='<span class="status-badge saved">✓ Saved</span>',N=""):m?(B='<span class="status-badge on-app">On HangVidU</span>',N=`
        <button type="button" class="invite-btn" data-uid="${st(m.uid)}" data-name="${st(m.displayName)}">
          Invite
        </button>
      `):(B='<span class="status-badge not-on-app">Not on app</span>',N=""),T.innerHTML=`
      <label class="contact-item-label">
        <input type="checkbox" class="contact-checkbox" data-email="${st(p)}" ${g?"disabled":""} />
        <span class="contact-info">
          <strong class="contact-name">${st(f)}</strong>
          <small class="contact-email">${st(p)}</small>
        </span>
        ${B}
      </label>
      ${N}
    `,m&&!g){const F=T.querySelector(".invite-btn");F.addEventListener("click",async()=>{F.disabled=!0,F.textContent="Sending...";try{await hp(m.uid,m.displayName),F.textContent="✓ Sent",F.classList.add("sent")}catch(W){console.error("[ADD CONTACT] Invite error:",W),F.textContent="Error",F.disabled=!1}})}const w=T.querySelector(".contact-checkbox");w&&!g&&(w.checked=s.has(h),w.addEventListener("change",()=>{w.checked?s.add(h):s.delete(h),u()})),o.appendChild(T)}r.appendChild(o),t.appendChild(r);const a=i.querySelector("#select-all-checkbox");a.addEventListener("change",()=>{o.querySelectorAll(".contact-checkbox:not([disabled])").forEach(f=>{f.checked=a.checked;const p=f.getAttribute("data-email"),m=n.find(g=>g.email===p);m&&(a.checked?s.add(m):s.delete(m))}),u()}),e.innerHTML=`
    <div class="bulk-actions">
      <button type="button" id="invite-selected-btn" class="action-btn" disabled>
        Invite Selected (0)
      </button>
      <button type="button" id="share-link-btn" class="action-btn secondary" disabled>
        Email Invite (0)
      </button>
    </div>
  `;const c=e.querySelector("#invite-selected-btn"),l=e.querySelector("#share-link-btn");function u(){const h=Array.from(s),f=h.filter(m=>m.user&&!m.isAlreadySaved).length,p=h.filter(m=>!m.user).length;c.disabled=f===0,c.textContent=`Invite Selected (${f})`,l.disabled=p===0,l.textContent=`Email Invite (${p})`}c.addEventListener("click",async()=>{const h=Array.from(s).filter(p=>p.user&&!p.isAlreadySaved);if(h.length===0)return;c.disabled=!0,c.textContent="Sending invites...";let f=0;for(const p of h)try{await hp(p.user.uid,p.user.displayName),f++}catch(m){console.error("[ADD CONTACT] Failed to invite:",p.name,m)}c.textContent=`✓ Sent ${f} invite${f!==1?"s":""}`,setTimeout(()=>{s.clear(),u(),o.querySelectorAll(".contact-checkbox").forEach(p=>p.checked=!1),a.checked=!1},2e3)}),l.addEventListener("click",async()=>{const h=Array.from(s).filter(f=>!f.user);if(h.length!==0){l.disabled=!0,l.textContent="Requesting permission...";try{const f=await Ty();l.textContent="Sending emails...";const p=M(),m=p?`${window.location.origin}/?ref=${p}`:window.location.origin,T=Nn()?.displayName||"A friend",B="Join me on HangVidU!",N=`Hi!

${T} invited you to join HangVidU - an app for text messaging, video calls and video sharing.

Click here to get started:
${m}

See you there!`,w=await PM(f,h,B,N);w.sent>0?(l.textContent=`✓ Sent ${w.sent} email${w.sent!==1?"s":""}!`,l.classList.add("success"),setTimeout(()=>{s.clear(),u(),o.querySelectorAll(".contact-checkbox").forEach(F=>F.checked=!1),a.checked=!1,l.classList.remove("success")},3e3)):(l.textContent="Failed to send emails",l.disabled=!1),w.failed>0&&console.warn(`[ADD CONTACT] ${w.failed} emails failed:`,w.errors)}catch(f){console.error("[ADD CONTACT] Gmail send error:",f),f.message==="Authorization cancelled"?(l.textContent="Permission denied - using email client...",setTimeout(()=>{d(h),l.textContent=`Email Invite (${h.length})`,l.disabled=!1},1500)):(l.textContent="Error - try again",l.disabled=!1,alert(`Failed to send emails: ${f.message}

Please try again or use your email client.`))}}});function d(h){const f=M(),p=f?`${window.location.origin}/?ref=${f}`:window.location.origin,g=Nn()?.displayName||"A friend",T=encodeURIComponent("Join me on HangVidU!"),B=encodeURIComponent(`Hi!

${g} invited you to join HangVidU - an app for text messaging, video calls and video sharing.

Click here to get started:
${p}

See you there!
`);let N;h.length===1?N=`mailto:${h[0].email}?subject=${T}&body=${B}`:N=`mailto:?bcc=${h.map(F=>F.email).join(",")}&subject=${T}&body=${B}`,window.location.href=N}}function OM(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class DM{constructor(){this.originalTitle=document.title,this.originalFavicon=OM(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[CallIndicators] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/HangVidU/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[CallIndicators] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[CallIndicators] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[CallIndicators] Badge set to: ${e}`)}).catch(n=>{console.warn("[CallIndicators] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[CallIndicators] Badge cleared")}).catch(e=>{console.warn("[CallIndicators] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[CallIndicators] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[CallIndicators] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[CallIndicators] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[CallIndicators] Wake lock released manually")}).catch(n=>{console.warn("[CallIndicators] Wake lock release failed:",n)})}}}const Pc=new DM;let Op=!1;function MM(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const i=document.createElement("h2");i.className="copy-link-dialog__title",i.textContent=e.title,s.appendChild(i);const r=document.createElement("div");r.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),r.appendChild(o),s.appendChild(r);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function xM(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};FM();const{dialog:s,input:i,copyButton:r,cancelButton:o,feedback:a}=MM(t,n);UM(s);let c=!1;const l=async()=>{await $M(t,i)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),i.readOnly=!1,i.addEventListener("click",()=>{i.select()}),n.onError&&n.onError())};return r.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function FM(){if(Op)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),Op=!0}function UM(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function $M(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function BM(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",i=s.replace(/\/$/,"");let r;try{r=new URL(i).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===r)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,i).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}BM();C0(!0);v().disable();let xd=[];async function HM(){aM();const t=Ry(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{yM(),WM(),await my;const s=SM(La);s&&xd.push(s.dispose);const i=document.querySelector(".top-right-menu");if(i){const r=bM({parent:i,hideWhenAllRead:!0});We.setToggle(r)}try{if(await we.initialize())console.log("[MAIN] FCM notifications initialized successfully");else if(console.warn("[MAIN] FCM notifications failed to initialize"),!we.isNotificationSupported()){const{showPushUnsupportedNotification:o}=await fe(async()=>{const{showPushUnsupportedNotification:a}=await import("./push-unsupported-notification-DHGfKebk.js");return{showPushUnsupportedNotification:a}},[]);o()}}catch(r){console.error("[MAIN] FCM initialization error:",r)}return window.pushNotificationController=we,window.notificationController=we,window.getLoggedInUserId=M,!0}catch(s){return console.error("Initialization error:",s,s&&s.stack),!1}}let $l=!1;function Mw(){$l=!1}async function xw(){$l||($l=!0,await mO(nt),pM({getLocalStream:xa,getLocalVideo:()=>nt,getRemoteVideo:()=>ye,getPeerConnection:()=>Ie.getPeerConnection(),setLocalStream:Ho,micBtn:mi,cameraBtn:_i,switchCameraBtn:gi,mutePartnerBtn:vt,fullscreenPartnerBtn:Oa,remotePipBtn:Pn}),nt&&(nt.addEventListener("enterpictureinpicture",()=>Se&&C(Se)),nt.addEventListener("leavepictureinpicture",()=>{Se&&!(as()&&Vy())&&H(Se)})))}function Fw(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Mw()}function ao(t=null){return{localStream:xa(),localVideoEl:nt,remoteVideoEl:ye,mutePartnerBtn:vt,setupRemoteStream:_O,setupWatchSync:fL,targetRoomId:t}}function co(t,e=!1){return t.success?(e&&t.roomLink&&xM(t.roomLink,{onCopy:()=>G("Link ready! Share with your partner."),onCancel:()=>G("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function Mr(t,{forceInitiator:e=!1}={}){try{await xw()}catch(r){return console.error("Failed to initialize local media stream:",r),Fw(r),!1}const n=Date.now();if(e){v().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"});const r=await Ie.createCall(ao(t));return co(r,!1)}let s=await he.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await he.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){v().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0});const r=await Ie.createCall(ao(t));return co(r,!0)}v().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const i=await Ie.answerCall({roomId:t,...ao()});return co(i,!1)}async function Uw(t,e,n=null){const s=de();if(t&&s===t)return console.warn("[CALL] Cannot call yourself"),!1;if(!n&&t&&s){try{n=cr(s,t),console.log("[CALL] Generated deterministic room ID:",n)}catch(r){return console.error("[CALL] Failed to generate room ID:",r),!1}try{await gr(t,e,n)}catch(r){console.warn("[CALL] Failed to persist room ID (continuing):",r)}}if(!n)return console.error("[CALL] Cannot initiate call: No Room ID available"),!1;ei(n);const i=await Mr(n,{forceInitiator:!0}).catch(r=>(console.warn("[CALL] Failed to join or create room:",r),!1));if(i){Md(t).catch(()=>{});const{showCallingUI:r}=await fe(async()=>{const{showCallingUI:o}=await Promise.resolve().then(()=>Iy);return{showCallingUI:o}},void 0);await r(n,e);try{const o=await wy(),a=o?.displayName||o?.email||s;await we.sendCallNotification(t,{roomId:n,callerId:s,callerName:a}),console.log("[CALL] Push notification sent to:",e)}catch(o){console.warn("[CALL] Failed to send push notification:",o)}}return i}const Je=new Set,$w=new Map;function Lc(t){t&&(Rr(t),Je.delete(t),$w.delete(t),v().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Je.size}))}function jM(){G(`[LISTENER] Removing all incoming listeners (${Je.size} rooms)`);const t=Array.from(Je);t.forEach(e=>{Rr(e)}),Je.clear(),$w.clear(),v().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function VM(t){const e=Date.now(),n=e+1440*60*1e3,s=M();if(s){const i=Sa(s,t);await ne(i,{roomId:t,savedAt:e,expiresAt:n});return}try{const i=localStorage.getItem("recentCalls")||"{}",r=JSON.parse(i);r[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(r))}catch(i){console.warn("Failed to save recent call to localStorage",i)}}async function Oc(t){const e=M();if(e){try{await tt(Sa(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function ei(t){t&&(Je.has(t)&&(Je.delete(t),Rr(t)),G(`[LISTENER] Attaching listener for room: ${t} (total: ${Je.size+1})`),Je.add(t),v().logListenerAttachment(t,"member_join",Je.size,{action:"incoming_call_listener_attached"}),he.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,i=de();if(n&&n!==i){v().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:i});const r=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(r&&(l=Date.now()-r,a=l<o,c="joinedAt"),!a){const N=await Sy(t);a=N,c=N?"roomCreatedAt":"failed",l=null}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(v().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:r,CALL_FRESH_MS:o}),!a){v().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await he.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===i)return;const m=Ie.getState();if(!!m.pc&&m.pc.connectionState==="connected"){v().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:m.pc?.connectionState});return}v().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await Lw(t,n);Kn.playIncoming(),Pc.startCallIndicators(T);let B=!1;try{B=await Ba(`Incoming call from ${T}.

Accept?`)}finally{Kn.stop(),Pc.stopCallIndicators()}if(B)Lc(t),we.isNotificationEnabled()&&await we.dismissCallNotifications(t),v().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),Mr(t).catch(N=>{console.warn("Failed to answer incoming call:",N),v().logFirebaseOperation("join_room_on_accept",!1,N,{roomId:t,joiningUserId:n})});else{we.isNotificationEnabled()&&await we.dismissCallNotifications(t),v().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await he.rejectCall(t,de(),"user_rejected")}catch(N){console.warn("Failed to signal rejection via RTDB:",N)}try{const{getCurrentUser:N}=await fe(async()=>{const{getCurrentUser:W}=await Promise.resolve().then(()=>Na);return{getCurrentUser:W}},void 0),F=N()?.displayName||"Someone";await Pt.sendCallEventMessage(n,"rejected_call",{roomId:t,callerId:n,callerName:T,rejectedBy:de(),rejectedByName:F}),console.log("[MAIN] Rejected call message written to chat history")}catch(N){console.warn("[MAIN] Failed to write rejected call message:",N)}await Oc(t).catch(N=>{console.warn("Failed to remove recent call on rejection:",N)})}}}),he.onCallCancelled(t,async e=>{if(!(e&&typeof e.val=="function"?e.val():null))return;Kn.stop(),Pc.stopCallIndicators(),we.isNotificationEnabled()&&await we.dismissCallNotifications(t).catch(()=>{});try{const{dismissActiveConfirmDialog:i}=await fe(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>SO);return{dismissActiveConfirmDialog:r}},void 0);typeof i=="function"&&i()}catch{}await Oc(t).catch(()=>{});let s=null;try{s=await Dl(t)}catch(i){console.warn("[LISTENER] Failed to check saved contact:",i)}s||Lc(t)}),he.onMemberLeft(t,async e=>{const n=e.key,s=de();if(!(!n||n===s))try{(await he.checkRoomStatus(t)).hasMembers||(await Oc(t),await Dl(t)?G(`Removed recent call but PRESERVED listeners for saved contact room ${t}`):(Lc(t),G(`Removed saved recent call and listeners for room ${t} because it is now empty`)))}catch(i){console.warn("Failed to evaluate room status on member leave",i)}}))}async function Dp(){const t=Date.now();v().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Je.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await fe(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>Na);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=M();if(v().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=N_(e);try{const s=await Me(n),i=s.exists()?s.val():null,r=new Set;if(i)for(const[o,a]of Object.entries(i)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await tt(Sa(e,o)).catch(()=>{});continue}r.add(o)}try{const o=await Zt();Object.entries(o||{}).forEach(([a,c])=>{if(c?.roomId)r.add(c.roomId);else if(a&&e)try{const l=cr(e,a);r.add(l)}catch{}})}catch{}r.forEach(o=>ei(o)),v().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(r),totalListeners:Je.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),v().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),i={},r=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(i[o]=a,r.add(o));try{const o=await Zt(),a=de();Object.entries(o||{}).forEach(([c,l])=>{if(l?.roomId)r.add(l.roomId);else if(c&&a)try{const u=cr(a,c);r.add(u)}catch{}})}catch{}r.forEach(o=>ei(o)),localStorage.setItem("recentCalls",JSON.stringify(i)),v().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(r),totalListeners:Je.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-r.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),v().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function Kr(){return j&&He&&!He.classList.contains("hidden")&&j.src&&j.src.trim()!==""}let Mp=!1;function WM(){if(Mp)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",It()),console.log("isYTVisible():",bc()),console.log("isSharedVideoVisible():",Kr()),console.log("isWatchModeActive():",as()),It()==="yt"?bc()?(jo(),Bi()):(Hy(),Wo()):(It()==="url"||It()==="file")&&(Kr()?(C(He),Bi()):(H(He),Wo()))),e.key==="Escape"&&as()&&(It()==="yt"&&bc()?(Dr(),jo()):(It()==="url"&&Kr()||It()==="file"&&Kr())&&(j.pause(),C(He)),Bi())}),Mp=!0}const Bw=async()=>{try{await xw();const t=await Ie.createCall(ao());co(t,!0)}catch(t){console.error("Failed to start call:",t),Fw(t)}};Ke.onclick=Bw;ms.onclick=Bw;Ds&&(navigator.clipboard&&navigator.clipboard.readText?Ds.onclick=async()=>{try{const t=await navigator.clipboard.readText(),e=qM(t);if(!e){alert("No valid room link found in clipboard.");return}await Mr(e)}catch(t){t.name==="NotAllowedError"?alert("Clipboard access denied. Please allow clipboard access or paste the link manually."):(console.error("Paste & Join failed:",t),alert("Failed to read clipboard. Please try again."))}}:(Ds.style.display="none",console.warn("Paste & Join button hidden: Clipboard API not available in this context (requires HTTPS).")));ur&&(ur.onclick=async()=>{await LM()});os&&(os.onclick=()=>{It()==="yt"?(Dr(),jo()):(It()==="url"||It()==="file")&&(j.pause(),j.src.startsWith("blob:")&&URL.revokeObjectURL(j.src),C(He)),Bi()});wt.onclick=async()=>{console.debug("Hanging up..."),await Ie.hangUp({emitCancel:!0,reason:"user_hung_up"})};function qM(t){let e=t.trim();if(!e)return"";try{const n=new URL(e,window.location.origin),s=n.searchParams.get("room");if(s)return s;const i=n.hash.match(/room=([^&]+)/);return i?decodeURIComponent(i[1]):n.pathname.replace(/^\//,"")||e}catch{return e}}async function zM(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await Mr(e);return n||(Pa(),Yy()),n}const Bl=[];let Ii=!1;async function lo(){if(Ii||Bl.length===0)return;Ii=!0;const{fromUserId:t,inviteData:e}=Bl.shift();try{const n=EM({fromUserId:t,inviteData:e,onAccept:async()=>{try{await ow(t,e),console.log("[INVITATIONS] Contact added:",e.fromName),await Lt(Ze).catch(()=>{}),$a(`✅ ${e.fromName} added to contacts!`),We.remove(`invite-${t}`)}catch(s){console.error("[INVITATIONS] Failed to accept invite:",s),nO("Failed to add contact. Please try again.")}finally{Ii=!1,lo()}},onDecline:async()=>{try{await wO(t),console.log("[INVITATIONS] Invite declined"),We.remove(`invite-${t}`)}catch(s){console.error("[INVITATIONS] Failed to decline invite:",s)}finally{Ii=!1,lo()}}});We.add(`invite-${t}`,n),We.isListVisible()||We.showList()}catch(n){console.error("[INVITATIONS] Failed to process invite:",n),Ii=!1,lo()}}function xp(){yO((t,e)=>{Bl.push({fromUserId:t,inviteData:e}),lo()}),vO(async(t,e)=>{console.log("[INVITATIONS] Your invite was accepted by:",e.acceptedByName),await Lt(Ze).catch(()=>{}),$a(`✅ ${e.acceptedByName} is now in your contacts!`)})}window.onload=async()=>{if(await CO(),!await HM()){Ke&&(Ke.disabled=!0,Ke.title="Initialization failed. Please reload the page or check your camera/microphone permissions."),console.error("Initialization failed. Call functionality disabled. Please reload the page."),alert(`Hangvidu could not initialize properly.

Please check your camera/microphone permissions and reload the page.`);return}cM(Ie),document.addEventListener("contact:call",i=>{const{contactId:r,contactName:o,roomId:a}=i.detail;Uw(r,o,a)}),document.addEventListener("contact:saved",i=>{ei(i.detail.roomId)}),await Dp().catch(i=>console.warn("Failed to start saved-room listeners",i)),Lt(Ze).catch(i=>{console.warn("Failed to render contacts list:",i)});let e=null;const n=od(async({isLoggedIn:i,user:r})=>{try{const o=e===null,a=e===!0&&!i,c=e===!1&&i;e=i,await Lt(Ze),a?(G("[AUTH] User logged out - cleaning up messaging and listeners"),cs.reset(),Pt.closeAllSessions(),we.isNotificationEnabled()&&await we.disable().catch(l=>{console.warn("[AUTH] Failed to disable notifications on logout:",l)}),jM(),Ll()):c?(G("[AUTH] User logged in - re-attaching incoming listeners"),await fp().catch(u=>console.warn("[REFERRAL] Failed to process referral on login:",u)),await Lt(Ze).catch(()=>{}),await Dp().catch(u=>console.warn("Failed to re-attach saved-room listeners on login",u)),xp(),(await we.enableIfGranted().catch(u=>(console.warn("[AUTH] Push notification setup failed:",u),{state:"error"}))).state==="prompt-needed"&&Sp()):o&&i&&(G("[AUTH] Initial load with logged-in user"),await fp().catch(u=>console.warn("[REFERRAL] Failed to process referral on initial load:",u)),xp(),(await we.enableIfGranted().catch(u=>(console.warn("[AUTH] Push notification setup failed:",u),{state:"error"}))).state==="prompt-needed"&&Sp())}catch(o){console.warn("Failed to handle auth change:",o)}});xd.push(()=>{try{typeof n=="function"&&n()}catch{}}),await zM()};window.addEventListener("beforeunload",async t=>{const e=Ie.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await GM()});Ie.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),Ie.setPartnerId(t),cs.showMessagesToggle(),cs.openContactMessages(t,t),ld().catch(n=>console.warn("Failed to clear calling state:",n)),VM(e).catch(n=>console.warn("Failed to save recent call:",n))});Ie.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});Ie.on("cleanup",async({roomId:t,partnerId:e,reason:n,role:s,wasConnected:i})=>{if(s==="initiator"&&!e&&!i&&t){console.log("[MAIN] Potential missed call detected for room:",t);try{const{getContactByRoomId:a}=await fe(async()=>{const{getContactByRoomId:l}=await Promise.resolve().then(()=>Ml);return{getContactByRoomId:l}},void 0),c=await a(t);if(c&&c.contactId){const{getCurrentUser:l}=await fe(async()=>{const{getCurrentUser:h}=await Promise.resolve().then(()=>Na);return{getCurrentUser:h}},void 0),d=l()?.displayName||"Friend";console.log(`[MAIN] Sending missed call push notification to ${c.contactName} (${c.contactId})`),await we.sendMissedCallNotification(c.contactId,{roomId:t,callerId:de(),callerName:d});try{await Pt.sendCallEventMessage(c.contactId,"missed_call",{roomId:t,callerId:de(),callerName:d}),console.log("[MAIN] Missed call message written to chat history")}catch(h){console.warn("[MAIN] Failed to write missed call message:",h)}}else console.log("[MAIN] No saved contact found for room, skipping missed call notification")}catch(a){console.warn("[MAIN] Failed to handle missed call:",a)}}t&&we.isNotificationEnabled()&&we.dismissCallNotifications(t).catch(a=>{console.warn("[MAIN] Failed to dismiss call notifications:",a)});const o=Ie.getState();o.messagesUI&&typeof o.messagesUI.cleanup=="function"&&(o.messagesUI.cleanup(),o.messagesUI=null),Fy(),Pa(),t&&n!=="page_unload"&&ei(t),e&&t&&setTimeout(()=>{Ow(e,t,Ze).catch(a=>{console.warn("Failed to save contact after cleanup:",a)})},500)});async function GM(){await Ie.hangUp({emitCancel:!0,reason:"page_unload"}),gM(),k_(),Dw(),Da();const t=Ie.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),j.src="",$y(),nt&&nt.srcObject&&(nt.srcObject=null),ye&&ye.srcObject&&(ye.srcObject=null),Bi(),hL("none"),wd(),wM(),Pa(),By(!1),xd.forEach(e=>e())}const Hw=Object.freeze(Object.defineProperty({__proto__:null,callContact:Uw,joinOrCreateRoomWithId:Mr,listenForIncomingOnRoom:ei,resetLocalStreamInitFlag:Mw},Symbol.toStringTag,{value:"Module"}));export{Fa as a,E0 as b,Sd as c,G as d,C as h,We as i,H as s};
