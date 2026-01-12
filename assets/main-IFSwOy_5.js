(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const jm="modulepreload",zm=function(t){return"/HangVidU/"+t},ql={},Xe=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){let c=function(l){return Promise.all(l.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=c(n.map(l=>{if(l=zm(l),l in ql)return;ql[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":jm,u||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),u)return new Promise((f,p)=>{h.addEventListener("load",f),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})},C=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,M=globalThis,ln="10.26.0";function Bi(){return Hi(M),M}function Hi(t){const e=t.__SENTRY__=t.__SENTRY__||{};return e.version=e.version||ln,e[ln]=e[ln]||{}}function as(t,e,n=M){const s=n.__SENTRY__=n.__SENTRY__||{},r=s[ln]=s[ln]||{};return r[t]||(r[t]=e())}const Gm=["debug","info","warn","error","log","assert","trace"],qm="Sentry Logger ",ii={};function cs(t){if(!("console"in M))return t();const e=M.console,n={},s=Object.keys(ii);s.forEach(r=>{const i=ii[r];n[r]=e[r],e[r]=i});try{return t()}finally{s.forEach(r=>{e[r]=n[r]})}}function Ym(){rc().enabled=!0}function Km(){rc().enabled=!1}function Ch(){return rc().enabled}function Jm(...t){sc("log",...t)}function Xm(...t){sc("warn",...t)}function Qm(...t){sc("error",...t)}function sc(t,...e){C&&Ch()&&cs(()=>{M.console[t](`${qm}[${t}]:`,...e)})}function rc(){return C?as("loggerSettings",()=>({enabled:!1})):{enabled:!1}}const b={enable:Ym,disable:Km,isEnabled:Ch,log:Jm,warn:Xm,error:Qm},Th=50,fn="?",Yl=/\(error: (.*)\)/,Kl=/captureMessage|captureException/;function Ih(...t){const e=t.sort((n,s)=>n[0]-s[0]).map(n=>n[1]);return(n,s=0,r=0)=>{const i=[],o=n.split(`
`);for(let a=s;a<o.length;a++){let c=o[a];c.length>1024&&(c=c.slice(0,1024));const l=Yl.test(c)?c.replace(Yl,"$1"):c;if(!l.match(/\S*Error: /)){for(const u of e){const d=u(l);if(d){i.push(d);break}}if(i.length>=Th+r)break}}return e_(i.slice(r))}}function Zm(t){return Array.isArray(t)?Ih(...t):t}function e_(t){if(!t.length)return[];const e=Array.from(t);return/sentryWrapped/.test(Or(e).function||"")&&e.pop(),e.reverse(),Kl.test(Or(e).function||"")&&(e.pop(),Kl.test(Or(e).function||"")&&e.pop()),e.slice(0,Th).map(n=>({...n,filename:n.filename||Or(e).filename,function:n.function||fn}))}function Or(t){return t[t.length-1]||{}}const Co="<anonymous>";function Bt(t){try{return!t||typeof t!="function"?Co:t.name||Co}catch{return Co}}function Jl(t){const e=t.exception;if(e){const n=[];try{return e.values.forEach(s=>{s.stacktrace.frames&&n.push(...s.stacktrace.frames)}),n}catch{return}}}function kh(t){return"__v_isVNode"in t&&t.__v_isVNode?"[VueVNode]":"[VueViewModel]"}const zr={},Xl={};function Tn(t,e){zr[t]=zr[t]||[],zr[t].push(e)}function In(t,e){if(!Xl[t]){Xl[t]=!0;try{e()}catch(n){C&&b.error(`Error while instrumenting ${t}`,n)}}}function Ve(t,e){const n=t&&zr[t];if(n)for(const s of n)try{s(e)}catch(r){C&&b.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Bt(s)}
Error:`,r)}}let To=null;function t_(t){const e="error";Tn(e,t),In(e,n_)}function n_(){To=M.onerror,M.onerror=function(t,e,n,s,r){return Ve("error",{column:s,error:r,line:n,msg:t,url:e}),To?To.apply(this,arguments):!1},M.onerror.__SENTRY_INSTRUMENTED__=!0}let Io=null;function s_(t){const e="unhandledrejection";Tn(e,t),In(e,r_)}function r_(){Io=M.onunhandledrejection,M.onunhandledrejection=function(t){return Ve("unhandledrejection",t),Io?Io.apply(this,arguments):!0},M.onunhandledrejection.__SENTRY_INSTRUMENTED__=!0}const Rh=Object.prototype.toString;function ic(t){switch(Rh.call(t)){case"[object Error]":case"[object Exception]":case"[object DOMException]":case"[object WebAssembly.Exception]":return!0;default:return Ht(t,Error)}}function ls(t,e){return Rh.call(t)===`[object ${e}]`}function Ah(t){return ls(t,"ErrorEvent")}function Ql(t){return ls(t,"DOMError")}function i_(t){return ls(t,"DOMException")}function ft(t){return ls(t,"String")}function oc(t){return typeof t=="object"&&t!==null&&"__sentry_template_string__"in t&&"__sentry_template_values__"in t}function Wi(t){return t===null||oc(t)||typeof t!="object"&&typeof t!="function"}function Xs(t){return ls(t,"Object")}function Vi(t){return typeof Event<"u"&&Ht(t,Event)}function o_(t){return typeof Element<"u"&&Ht(t,Element)}function a_(t){return ls(t,"RegExp")}function gr(t){return!!(t?.then&&typeof t.then=="function")}function c_(t){return Xs(t)&&"nativeEvent"in t&&"preventDefault"in t&&"stopPropagation"in t}function Ht(t,e){try{return t instanceof e}catch{return!1}}function Ph(t){return!!(typeof t=="object"&&t!==null&&(t.__isVue||t._isVue||t.__v_isVNode))}function l_(t){return typeof Request<"u"&&Ht(t,Request)}const ac=M,u_=80;function Nh(t,e={}){if(!t)return"<unknown>";try{let n=t;const s=5,r=[];let i=0,o=0;const a=" > ",c=a.length;let l;const u=Array.isArray(e)?e:e.keyAttrs,d=!Array.isArray(e)&&e.maxStringLength||u_;for(;n&&i++<s&&(l=d_(n,u),!(l==="html"||i>1&&o+r.length*c+l.length>=d));)r.push(l),o+=l.length,n=n.parentNode;return r.reverse().join(a)}catch{return"<unknown>"}}function d_(t,e){const n=t,s=[];if(!n?.tagName)return"";if(ac.HTMLElement&&n instanceof HTMLElement&&n.dataset){if(n.dataset.sentryComponent)return n.dataset.sentryComponent;if(n.dataset.sentryElement)return n.dataset.sentryElement}s.push(n.tagName.toLowerCase());const r=e?.length?e.filter(o=>n.getAttribute(o)).map(o=>[o,n.getAttribute(o)]):null;if(r?.length)r.forEach(o=>{s.push(`[${o[0]}="${o[1]}"]`)});else{n.id&&s.push(`#${n.id}`);const o=n.className;if(o&&ft(o)){const a=o.split(/\s+/);for(const c of a)s.push(`.${c}`)}}const i=["aria-label","type","name","title","alt"];for(const o of i){const a=n.getAttribute(o);a&&s.push(`[${o}="${a}"]`)}return s.join("")}function cc(){try{return ac.document.location.href}catch{return""}}function h_(t){if(!ac.HTMLElement)return null;let e=t;const n=5;for(let s=0;s<n;s++){if(!e)return null;if(e instanceof HTMLElement){if(e.dataset.sentryComponent)return e.dataset.sentryComponent;if(e.dataset.sentryElement)return e.dataset.sentryElement}e=e.parentNode}return null}function ke(t,e,n){if(!(e in t))return;const s=t[e];if(typeof s!="function")return;const r=n(s);typeof r=="function"&&Lh(r,s);try{t[e]=r}catch{C&&b.log(`Failed to replace method "${e}" in object`,t)}}function pn(t,e,n){try{Object.defineProperty(t,e,{value:n,writable:!0,configurable:!0})}catch{C&&b.log(`Failed to add non-enumerable property "${e}" to object`,t)}}function Lh(t,e){try{const n=e.prototype||{};t.prototype=e.prototype=n,pn(t,"__sentry_original__",e)}catch{}}function lc(t){return t.__sentry_original__}function Oh(t){if(ic(t))return{message:t.message,name:t.name,stack:t.stack,...eu(t)};if(Vi(t)){const e={type:t.type,target:Zl(t.target),currentTarget:Zl(t.currentTarget),...eu(t)};return typeof CustomEvent<"u"&&Ht(t,CustomEvent)&&(e.detail=t.detail),e}else return t}function Zl(t){try{return o_(t)?Nh(t):Object.prototype.toString.call(t)}catch{return"<unknown>"}}function eu(t){if(typeof t=="object"&&t!==null){const e={};for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}else return{}}function f_(t){const e=Object.keys(Oh(t));return e.sort(),e[0]?e.join(", "):"[object has no keys]"}function Dh(t,e=0){return typeof t!="string"||e===0||t.length<=e?t:`${t.slice(0,e)}...`}function tu(t,e){if(!Array.isArray(t))return"";const n=[];for(let s=0;s<t.length;s++){const r=t[s];try{Ph(r)?n.push(kh(r)):n.push(String(r))}catch{n.push("[value cannot be serialized]")}}return n.join(e)}function Gr(t,e,n=!1){return ft(t)?a_(e)?e.test(t):ft(e)?n?t===e:t.includes(e):!1:!1}function ji(t,e=[],n=!1){return e.some(s=>Gr(t,s,n))}function p_(){const t=M;return t.crypto||t.msCrypto}let ko;function g_(){return Math.random()*16}function Le(t=p_()){try{if(t?.randomUUID)return t.randomUUID().replace(/-/g,"")}catch{}return ko||(ko="10000000100040008000"+1e11),ko.replace(/[018]/g,e=>(e^(g_()&15)>>e/4).toString(16))}function Mh(t){return t.exception?.values?.[0]}function sn(t){const{message:e,event_id:n}=t;if(e)return e;const s=Mh(t);return s?s.type&&s.value?`${s.type}: ${s.value}`:s.type||s.value||n||"<unknown>":n||"<unknown>"}function ra(t,e,n){const s=t.exception=t.exception||{},r=s.values=s.values||[],i=r[0]=r[0]||{};i.value||(i.value=e||""),i.type||(i.type="Error")}function qn(t,e){const n=Mh(t);if(!n)return;const s={type:"generic",handled:!0},r=n.mechanism;if(n.mechanism={...s,...r,...e},e&&"data"in e){const i={...r?.data,...e.data};n.mechanism.data=i}}function nu(t){if(m_(t))return!0;try{pn(t,"__sentry_captured__",!0)}catch{}return!1}function m_(t){try{return t.__sentry_captured__}catch{}}const xh=1e3;function mr(){return Date.now()/xh}function __(){const{performance:t}=M;if(!t?.now||!t.timeOrigin)return mr;const e=t.timeOrigin;return()=>(e+t.now())/xh}let su;function pt(){return(su??(su=__()))()}function y_(t){const e=pt(),n={sid:Le(),init:!0,timestamp:e,started:e,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>v_(n)};return t&&Yn(n,t),n}function Yn(t,e={}){if(e.user&&(!t.ipAddress&&e.user.ip_address&&(t.ipAddress=e.user.ip_address),!t.did&&!e.did&&(t.did=e.user.id||e.user.email||e.user.username)),t.timestamp=e.timestamp||pt(),e.abnormal_mechanism&&(t.abnormal_mechanism=e.abnormal_mechanism),e.ignoreDuration&&(t.ignoreDuration=e.ignoreDuration),e.sid&&(t.sid=e.sid.length===32?e.sid:Le()),e.init!==void 0&&(t.init=e.init),!t.did&&e.did&&(t.did=`${e.did}`),typeof e.started=="number"&&(t.started=e.started),t.ignoreDuration)t.duration=void 0;else if(typeof e.duration=="number")t.duration=e.duration;else{const n=t.timestamp-t.started;t.duration=n>=0?n:0}e.release&&(t.release=e.release),e.environment&&(t.environment=e.environment),!t.ipAddress&&e.ipAddress&&(t.ipAddress=e.ipAddress),!t.userAgent&&e.userAgent&&(t.userAgent=e.userAgent),typeof e.errors=="number"&&(t.errors=e.errors),e.status&&(t.status=e.status)}function E_(t,e){let n={};t.status==="ok"&&(n={status:"exited"}),Yn(t,n)}function v_(t){return{sid:`${t.sid}`,init:t.init,started:new Date(t.started*1e3).toISOString(),timestamp:new Date(t.timestamp*1e3).toISOString(),status:t.status,errors:t.errors,did:typeof t.did=="number"||typeof t.did=="string"?`${t.did}`:void 0,duration:t.duration,abnormal_mechanism:t.abnormal_mechanism,attrs:{release:t.release,environment:t.environment,ip_address:t.ipAddress,user_agent:t.userAgent}}}function _r(t,e,n=2){if(!e||typeof e!="object"||n<=0)return e;if(t&&Object.keys(e).length===0)return t;const s={...t};for(const r in e)Object.prototype.hasOwnProperty.call(e,r)&&(s[r]=_r(s[r],e[r],n-1));return s}function ru(){return Le()}function Fh(){return Le().substring(16)}const ia="_sentrySpan";function iu(t,e){e?pn(t,ia,e):delete t[ia]}function ou(t){return t[ia]}const w_=100;class yt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={},this._propagationContext={traceId:ru(),sampleRand:Math.random()}}clone(){const e=new yt;return e._breadcrumbs=[...this._breadcrumbs],e._tags={...this._tags},e._extra={...this._extra},e._contexts={...this._contexts},this._contexts.flags&&(e._contexts.flags={values:[...this._contexts.flags.values]}),e._user=this._user,e._level=this._level,e._session=this._session,e._transactionName=this._transactionName,e._fingerprint=this._fingerprint,e._eventProcessors=[...this._eventProcessors],e._attachments=[...this._attachments],e._sdkProcessingMetadata={...this._sdkProcessingMetadata},e._propagationContext={...this._propagationContext},e._client=this._client,e._lastEventId=this._lastEventId,iu(e,ou(this)),e}setClient(e){this._client=e}setLastEventId(e){this._lastEventId=e}getClient(){return this._client}lastEventId(){return this._lastEventId}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{email:void 0,id:void 0,ip_address:void 0,username:void 0},this._session&&Yn(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,n){return this.setTags({[e]:n})}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,n){return this._extra={...this._extra,[e]:n},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,n){return n===null?delete this._contexts[e]:this._contexts[e]=n,this._notifyScopeListeners(),this}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this;const n=typeof e=="function"?e(this):e,s=n instanceof yt?n.getScopeData():Xs(n)?e:void 0,{tags:r,extra:i,user:o,contexts:a,level:c,fingerprint:l=[],propagationContext:u}=s||{};return this._tags={...this._tags,...r},this._extra={...this._extra,...i},this._contexts={...this._contexts,...a},o&&Object.keys(o).length&&(this._user=o),c&&(this._level=c),l.length&&(this._fingerprint=l),u&&(this._propagationContext=u),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._session=void 0,iu(this,void 0),this._attachments=[],this.setPropagationContext({traceId:ru(),sampleRand:Math.random()}),this._notifyScopeListeners(),this}addBreadcrumb(e,n){const s=typeof n=="number"?n:w_;if(s<=0)return this;const r={timestamp:mr(),...e,message:e.message?Dh(e.message,2048):e.message};return this._breadcrumbs.push(r),this._breadcrumbs.length>s&&(this._breadcrumbs=this._breadcrumbs.slice(-s),this._client?.recordDroppedEvent("buffer_overflow","log_item")),this._notifyScopeListeners(),this}getLastBreadcrumb(){return this._breadcrumbs[this._breadcrumbs.length-1]}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}clearAttachments(){return this._attachments=[],this}getScopeData(){return{breadcrumbs:this._breadcrumbs,attachments:this._attachments,contexts:this._contexts,tags:this._tags,extra:this._extra,user:this._user,level:this._level,fingerprint:this._fingerprint||[],eventProcessors:this._eventProcessors,propagationContext:this._propagationContext,sdkProcessingMetadata:this._sdkProcessingMetadata,transactionName:this._transactionName,span:ou(this)}}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata=_r(this._sdkProcessingMetadata,e,2),this}setPropagationContext(e){return this._propagationContext=e,this}getPropagationContext(){return this._propagationContext}captureException(e,n){const s=n?.event_id||Le();if(!this._client)return C&&b.warn("No client configured on scope - will not capture exception!"),s;const r=new Error("Sentry syntheticException");return this._client.captureException(e,{originalException:e,syntheticException:r,...n,event_id:s},this),s}captureMessage(e,n,s){const r=s?.event_id||Le();if(!this._client)return C&&b.warn("No client configured on scope - will not capture message!"),r;const i=s?.syntheticException??new Error(e);return this._client.captureMessage(e,n,{originalException:e,syntheticException:i,...s,event_id:r},this),r}captureEvent(e,n){const s=n?.event_id||Le();return this._client?(this._client.captureEvent(e,{...n,event_id:s},this),s):(C&&b.warn("No client configured on scope - will not capture event!"),s)}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}}function b_(){return as("defaultCurrentScope",()=>new yt)}function S_(){return as("defaultIsolationScope",()=>new yt)}class C_{constructor(e,n){let s;e?s=e:s=new yt;let r;n?r=n:r=new yt,this._stack=[{scope:s}],this._isolationScope=r}withScope(e){const n=this._pushScope();let s;try{s=e(n)}catch(r){throw this._popScope(),r}return gr(s)?s.then(r=>(this._popScope(),r),r=>{throw this._popScope(),r}):(this._popScope(),s)}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getIsolationScope(){return this._isolationScope}getStackTop(){return this._stack[this._stack.length-1]}_pushScope(){const e=this.getScope().clone();return this._stack.push({client:this.getClient(),scope:e}),e}_popScope(){return this._stack.length<=1?!1:!!this._stack.pop()}}function Kn(){const t=Bi(),e=Hi(t);return e.stack=e.stack||new C_(b_(),S_())}function T_(t){return Kn().withScope(t)}function I_(t,e){const n=Kn();return n.withScope(()=>(n.getStackTop().scope=t,e(t)))}function au(t){return Kn().withScope(()=>t(Kn().getIsolationScope()))}function k_(){return{withIsolationScope:au,withScope:T_,withSetScope:I_,withSetIsolationScope:(t,e)=>au(e),getCurrentScope:()=>Kn().getScope(),getIsolationScope:()=>Kn().getIsolationScope()}}function uc(t){const e=Hi(t);return e.acs?e.acs:k_()}function Yt(){const t=Bi();return uc(t).getCurrentScope()}function yr(){const t=Bi();return uc(t).getIsolationScope()}function R_(){return as("globalScope",()=>new yt)}function A_(...t){const e=Bi(),n=uc(e);if(t.length===2){const[s,r]=t;return s?n.withSetScope(s,r):n.withScope(r)}return n.withScope(t[0])}function ye(){return Yt().getClient()}function P_(t){const e=t.getPropagationContext(),{traceId:n,parentSpanId:s,propagationSpanId:r}=e,i={trace_id:n,span_id:r||Fh()};return s&&(i.parent_span_id=s),i}const N_="sentry.source",L_="sentry.sample_rate",O_="sentry.previous_trace_sample_rate",D_="sentry.op",M_="sentry.origin",Uh="sentry.profile_id",$h="sentry.exclusive_time",x_=0,F_=1,U_="_sentryScope",$_="_sentryIsolationScope";function B_(t){if(t){if(typeof t=="object"&&"deref"in t&&typeof t.deref=="function")try{return t.deref()}catch{return}return t}}function Bh(t){const e=t;return{scope:e[U_],isolationScope:B_(e[$_])}}const H_="sentry-",W_=/^sentry-/;function V_(t){const e=j_(t);if(!e)return;const n=Object.entries(e).reduce((s,[r,i])=>{if(r.match(W_)){const o=r.slice(H_.length);s[o]=i}return s},{});if(Object.keys(n).length>0)return n}function j_(t){if(!(!t||!ft(t)&&!Array.isArray(t)))return Array.isArray(t)?t.reduce((e,n)=>{const s=cu(n);return Object.entries(s).forEach(([r,i])=>{e[r]=i}),e},{}):cu(t)}function cu(t){return t.split(",").map(e=>{const n=e.indexOf("=");if(n===-1)return[];const s=e.slice(0,n),r=e.slice(n+1);return[s,r].map(i=>{try{return decodeURIComponent(i.trim())}catch{return}})}).reduce((e,[n,s])=>(n&&s&&(e[n]=s),e),{})}const z_=/^o(\d+)\./,G_=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;function q_(t){return t==="http"||t==="https"}function Er(t,e=!1){const{host:n,path:s,pass:r,port:i,projectId:o,protocol:a,publicKey:c}=t;return`${a}://${c}${e&&r?`:${r}`:""}@${n}${i?`:${i}`:""}/${s&&`${s}/`}${o}`}function Y_(t){const e=G_.exec(t);if(!e){cs(()=>{console.error(`Invalid Sentry Dsn: ${t}`)});return}const[n,s,r="",i="",o="",a=""]=e.slice(1);let c="",l=a;const u=l.split("/");if(u.length>1&&(c=u.slice(0,-1).join("/"),l=u.pop()),l){const d=l.match(/^\d+/);d&&(l=d[0])}return Hh({host:i,pass:r,path:c,projectId:l,port:o,protocol:n,publicKey:s})}function Hh(t){return{protocol:t.protocol,publicKey:t.publicKey||"",pass:t.pass||"",host:t.host,port:t.port||"",path:t.path||"",projectId:t.projectId}}function K_(t){if(!C)return!0;const{port:e,projectId:n,protocol:s}=t;return["protocol","publicKey","host","projectId"].find(o=>t[o]?!1:(b.error(`Invalid Sentry Dsn: ${o} missing`),!0))?!1:n.match(/^\d+$/)?q_(s)?e&&isNaN(parseInt(e,10))?(b.error(`Invalid Sentry Dsn: Invalid port ${e}`),!1):!0:(b.error(`Invalid Sentry Dsn: Invalid protocol ${s}`),!1):(b.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),!1)}function J_(t){return t.match(z_)?.[1]}function X_(t){const e=t.getOptions(),{host:n}=t.getDsn()||{};let s;return e.orgId?s=String(e.orgId):n&&(s=J_(n)),s}function Q_(t){const e=typeof t=="string"?Y_(t):Hh(t);if(!(!e||!K_(e)))return e}function Z_(t){if(typeof t=="boolean")return Number(t);const e=typeof t=="string"?parseFloat(t):t;if(!(typeof e!="number"||isNaN(e)||e<0||e>1))return e}const Wh=1;let lu=!1;function ey(t){const{spanId:e,traceId:n,isRemote:s}=t.spanContext(),r=s?e:dc(t).parent_span_id,i=Bh(t).scope,o=s?i?.getPropagationContext().propagationSpanId||Fh():e;return{parent_span_id:r,span_id:o,trace_id:n}}function ty(t){if(t&&t.length>0)return t.map(({context:{spanId:e,traceId:n,traceFlags:s,...r},attributes:i})=>({span_id:e,trace_id:n,sampled:s===Wh,attributes:i,...r}))}function uu(t){return typeof t=="number"?du(t):Array.isArray(t)?t[0]+t[1]/1e9:t instanceof Date?du(t.getTime()):pt()}function du(t){return t>9999999999?t/1e3:t}function dc(t){if(sy(t))return t.getSpanJSON();const{spanId:e,traceId:n}=t.spanContext();if(ny(t)){const{attributes:s,startTime:r,name:i,endTime:o,status:a,links:c}=t,l="parentSpanId"in t?t.parentSpanId:"parentSpanContext"in t?t.parentSpanContext?.spanId:void 0;return{span_id:e,trace_id:n,data:s,description:i,parent_span_id:l,start_timestamp:uu(r),timestamp:uu(o)||void 0,status:iy(a),op:s[D_],origin:s[M_],links:ty(c)}}return{span_id:e,trace_id:n,start_timestamp:0,data:{}}}function ny(t){const e=t;return!!e.attributes&&!!e.startTime&&!!e.name&&!!e.endTime&&!!e.status}function sy(t){return typeof t.getSpanJSON=="function"}function ry(t){const{traceFlags:e}=t.spanContext();return e===Wh}function iy(t){if(!(!t||t.code===x_))return t.code===F_?"ok":t.message||"internal_error"}const oy="_sentryRootSpan";function Vh(t){return t[oy]||t}function hu(){lu||(cs(()=>{console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.")}),lu=!0)}function ay(t){if(typeof __SENTRY_TRACING__=="boolean"&&!__SENTRY_TRACING__)return!1;const e=ye()?.getOptions();return!!e&&(e.tracesSampleRate!=null||!!e.tracesSampler)}function fu(t){b.log(`Ignoring span ${t.op} - ${t.description} because it matches \`ignoreSpans\`.`)}function pu(t,e){if(!e?.length||!t.description)return!1;for(const n of e){if(ly(n)){if(Gr(t.description,n))return C&&fu(t),!0;continue}if(!n.name&&!n.op)continue;const s=n.name?Gr(t.description,n.name):!0,r=n.op?t.op&&Gr(t.op,n.op):!0;if(s&&r)return C&&fu(t),!0}return!1}function cy(t,e){const n=e.parent_span_id,s=e.span_id;if(n)for(const r of t)r.parent_span_id===s&&(r.parent_span_id=n)}function ly(t){return typeof t=="string"||t instanceof RegExp}const hc="production",uy="_frozenDsc";function jh(t,e){const n=e.getOptions(),{publicKey:s}=e.getDsn()||{},r={environment:n.environment||hc,release:n.release,public_key:s,trace_id:t,org_id:X_(e)};return e.emit("createDsc",r),r}function dy(t,e){const n=e.getPropagationContext();return n.dsc||jh(n.traceId,t)}function hy(t){const e=ye();if(!e)return{};const n=Vh(t),s=dc(n),r=s.data,i=n.spanContext().traceState,o=i?.get("sentry.sample_rate")??r[L_]??r[O_];function a(p){return(typeof o=="number"||typeof o=="string")&&(p.sample_rate=`${o}`),p}const c=n[uy];if(c)return a(c);const l=i?.get("sentry.dsc"),u=l&&V_(l);if(u)return a(u);const d=jh(t.spanContext().traceId,e),h=r[N_],f=s.description;return h!=="url"&&f&&(d.transaction=f),ay()&&(d.sampled=String(ry(n)),d.sample_rand=i?.get("sentry.sample_rand")??Bh(n).scope?.getPropagationContext().sampleRand.toString()),a(d),e.emit("createDsc",d,n),d}function it(t,e=100,n=1/0){try{return oa("",t,e,n)}catch(s){return{ERROR:`**non-serializable** (${s})`}}}function zh(t,e=3,n=100*1024){const s=it(t,e);return my(s)>n?zh(t,e-1,n):s}function oa(t,e,n=1/0,s=1/0,r=_y()){const[i,o]=r;if(e==null||["boolean","string"].includes(typeof e)||typeof e=="number"&&Number.isFinite(e))return e;const a=fy(t,e);if(!a.startsWith("[object "))return a;if(e.__sentry_skip_normalization__)return e;const c=typeof e.__sentry_override_normalization_depth__=="number"?e.__sentry_override_normalization_depth__:n;if(c===0)return a.replace("object ","");if(i(e))return"[Circular ~]";const l=e;if(l&&typeof l.toJSON=="function")try{const f=l.toJSON();return oa("",f,c-1,s,r)}catch{}const u=Array.isArray(e)?[]:{};let d=0;const h=Oh(e);for(const f in h){if(!Object.prototype.hasOwnProperty.call(h,f))continue;if(d>=s){u[f]="[MaxProperties ~]";break}const p=h[f];u[f]=oa(f,p,c-1,s,r),d++}return o(e),u}function fy(t,e){try{if(t==="domain"&&e&&typeof e=="object"&&e._events)return"[Domain]";if(t==="domainEmitter")return"[DomainEmitter]";if(typeof global<"u"&&e===global)return"[Global]";if(typeof window<"u"&&e===window)return"[Window]";if(typeof document<"u"&&e===document)return"[Document]";if(Ph(e))return kh(e);if(c_(e))return"[SyntheticEvent]";if(typeof e=="number"&&!Number.isFinite(e))return`[${e}]`;if(typeof e=="function")return`[Function: ${Bt(e)}]`;if(typeof e=="symbol")return`[${String(e)}]`;if(typeof e=="bigint")return`[BigInt: ${String(e)}]`;const n=py(e);return/^HTML(\w*)Element$/.test(n)?`[HTMLElement: ${n}]`:`[object ${n}]`}catch(n){return`**non-serializable** (${n})`}}function py(t){const e=Object.getPrototypeOf(t);return e?.constructor?e.constructor.name:"null prototype"}function gy(t){return~-encodeURI(t).split(/%..|./).length}function my(t){return gy(JSON.stringify(t))}function _y(){const t=new WeakSet;function e(s){return t.has(s)?!0:(t.add(s),!1)}function n(s){t.delete(s)}return[e,n]}function us(t,e=[]){return[t,e]}function yy(t,e){const[n,s]=t;return[n,[...s,e]]}function gu(t,e){const n=t[1];for(const s of n){const r=s[0].type;if(e(s,r))return!0}return!1}function aa(t){const e=Hi(M);return e.encodePolyfill?e.encodePolyfill(t):new TextEncoder().encode(t)}function Ey(t){const[e,n]=t;let s=JSON.stringify(e);function r(i){typeof s=="string"?s=typeof i=="string"?s+i:[aa(s),i]:s.push(typeof i=="string"?aa(i):i)}for(const i of n){const[o,a]=i;if(r(`
${JSON.stringify(o)}
`),typeof a=="string"||a instanceof Uint8Array)r(a);else{let c;try{c=JSON.stringify(a)}catch{c=JSON.stringify(it(a))}r(c)}}return typeof s=="string"?s:vy(s)}function vy(t){const e=t.reduce((r,i)=>r+i.length,0),n=new Uint8Array(e);let s=0;for(const r of t)n.set(r,s),s+=r.length;return n}function wy(t){const e=typeof t.data=="string"?aa(t.data):t.data;return[{type:"attachment",length:e.length,filename:t.filename,content_type:t.contentType,attachment_type:t.attachmentType},e]}const by={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default",profile:"profile",profile_chunk:"profile",replay_event:"replay",replay_recording:"replay",check_in:"monitor",feedback:"feedback",span:"span",raw_security:"security",log:"log_item",metric:"metric",trace_metric:"metric"};function mu(t){return by[t]}function Gh(t){if(!t?.sdk)return;const{name:e,version:n}=t.sdk;return{name:e,version:n}}function Sy(t,e,n,s){const r=t.sdkProcessingMetadata?.dynamicSamplingContext;return{event_id:t.event_id,sent_at:new Date().toISOString(),...e&&{sdk:e},...!!n&&s&&{dsn:Er(s)},...r&&{trace:r}}}function Cy(t,e){if(!e)return t;const n=t.sdk||{};return t.sdk={...n,name:n.name||e.name,version:n.version||e.version,integrations:[...t.sdk?.integrations||[],...e.integrations||[]],packages:[...t.sdk?.packages||[],...e.packages||[]],settings:t.sdk?.settings||e.settings?{...t.sdk?.settings,...e.settings}:void 0},t}function Ty(t,e,n,s){const r=Gh(n),i={sent_at:new Date().toISOString(),...r&&{sdk:r},...!!s&&e&&{dsn:Er(e)}},o="aggregates"in t?[{type:"sessions"},t]:[{type:"session"},t.toJSON()];return us(i,[o])}function Iy(t,e,n,s){const r=Gh(n),i=t.type&&t.type!=="replay_event"?t.type:"event";Cy(t,n?.sdk);const o=Sy(t,r,s,e);return delete t.sdkProcessingMetadata,us(o,[[{type:i},t]])}const Ro=0,_u=1,yu=2;function zi(t){return new Qs(e=>{e(t)})}function fc(t){return new Qs((e,n)=>{n(t)})}class Qs{constructor(e){this._state=Ro,this._handlers=[],this._runExecutor(e)}then(e,n){return new Qs((s,r)=>{this._handlers.push([!1,i=>{if(!e)s(i);else try{s(e(i))}catch(o){r(o)}},i=>{if(!n)r(i);else try{s(n(i))}catch(o){r(o)}}]),this._executeHandlers()})}catch(e){return this.then(n=>n,e)}finally(e){return new Qs((n,s)=>{let r,i;return this.then(o=>{i=!1,r=o,e&&e()},o=>{i=!0,r=o,e&&e()}).then(()=>{if(i){s(r);return}n(r)})})}_executeHandlers(){if(this._state===Ro)return;const e=this._handlers.slice();this._handlers=[],e.forEach(n=>{n[0]||(this._state===_u&&n[1](this._value),this._state===yu&&n[2](this._value),n[0]=!0)})}_runExecutor(e){const n=(i,o)=>{if(this._state===Ro){if(gr(o)){o.then(s,r);return}this._state=i,this._value=o,this._executeHandlers()}},s=i=>{n(_u,i)},r=i=>{n(yu,i)};try{e(s,r)}catch(i){r(i)}}}function ky(t,e,n,s=0){try{const r=ca(e,n,t,s);return gr(r)?r:zi(r)}catch(r){return fc(r)}}function ca(t,e,n,s){const r=n[s];if(!t||!r)return t;const i=r({...t},e);return C&&i===null&&b.log(`Event processor "${r.id||"?"}" dropped event`),gr(i)?i.then(o=>ca(o,e,n,s+1)):ca(i,e,n,s+1)}function Ry(t,e){const{fingerprint:n,span:s,breadcrumbs:r,sdkProcessingMetadata:i}=e;Ay(t,e),s&&Ly(t,s),Oy(t,n),Py(t,r),Ny(t,i)}function Eu(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,sdkProcessingMetadata:a,breadcrumbs:c,fingerprint:l,eventProcessors:u,attachments:d,propagationContext:h,transactionName:f,span:p}=e;Dr(t,"extra",n),Dr(t,"tags",s),Dr(t,"user",r),Dr(t,"contexts",i),t.sdkProcessingMetadata=_r(t.sdkProcessingMetadata,a,2),o&&(t.level=o),f&&(t.transactionName=f),p&&(t.span=p),c.length&&(t.breadcrumbs=[...t.breadcrumbs,...c]),l.length&&(t.fingerprint=[...t.fingerprint,...l]),u.length&&(t.eventProcessors=[...t.eventProcessors,...u]),d.length&&(t.attachments=[...t.attachments,...d]),t.propagationContext={...t.propagationContext,...h}}function Dr(t,e,n){t[e]=_r(t[e],n,1)}function Ay(t,e){const{extra:n,tags:s,user:r,contexts:i,level:o,transactionName:a}=e;Object.keys(n).length&&(t.extra={...n,...t.extra}),Object.keys(s).length&&(t.tags={...s,...t.tags}),Object.keys(r).length&&(t.user={...r,...t.user}),Object.keys(i).length&&(t.contexts={...i,...t.contexts}),o&&(t.level=o),a&&t.type!=="transaction"&&(t.transaction=a)}function Py(t,e){const n=[...t.breadcrumbs||[],...e];t.breadcrumbs=n.length?n:void 0}function Ny(t,e){t.sdkProcessingMetadata={...t.sdkProcessingMetadata,...e}}function Ly(t,e){t.contexts={trace:ey(e),...t.contexts},t.sdkProcessingMetadata={dynamicSamplingContext:hy(e),...t.sdkProcessingMetadata};const n=Vh(e),s=dc(n).description;s&&!t.transaction&&t.type==="transaction"&&(t.transaction=s)}function Oy(t,e){t.fingerprint=t.fingerprint?Array.isArray(t.fingerprint)?t.fingerprint:[t.fingerprint]:[],e&&(t.fingerprint=t.fingerprint.concat(e)),t.fingerprint.length||delete t.fingerprint}let Xt,vu,wu,Ct;function Dy(t){const e=M._sentryDebugIds,n=M._debugIds;if(!e&&!n)return{};const s=e?Object.keys(e):[],r=n?Object.keys(n):[];if(Ct&&s.length===vu&&r.length===wu)return Ct;vu=s.length,wu=r.length,Ct={},Xt||(Xt={});const i=(o,a)=>{for(const c of o){const l=a[c],u=Xt?.[c];if(u&&Ct&&l)Ct[u[0]]=l,Xt&&(Xt[c]=[u[0],l]);else if(l){const d=t(c);for(let h=d.length-1;h>=0;h--){const p=d[h]?.filename;if(p&&Ct&&Xt){Ct[p]=l,Xt[c]=[p,l];break}}}}};return e&&i(s,e),n&&i(r,n),Ct}function My(t,e,n,s,r,i){const{normalizeDepth:o=3,normalizeMaxBreadth:a=1e3}=t,c={...e,event_id:e.event_id||n.event_id||Le(),timestamp:e.timestamp||mr()},l=n.integrations||t.integrations.map(m=>m.name);xy(c,t),$y(c,l),r&&r.emit("applyFrameMetadata",e),e.type===void 0&&Fy(c,t.stackParser);const u=Hy(s,n.captureContext);n.mechanism&&qn(c,n.mechanism);const d=r?r.getEventProcessors():[],h=R_().getScopeData();if(i){const m=i.getScopeData();Eu(h,m)}if(u){const m=u.getScopeData();Eu(h,m)}const f=[...n.attachments||[],...h.attachments];f.length&&(n.attachments=f),Ry(c,h);const p=[...d,...h.eventProcessors];return ky(p,c,n).then(m=>(m&&Uy(m),typeof o=="number"&&o>0?By(m,o,a):m))}function xy(t,e){const{environment:n,release:s,dist:r,maxValueLength:i}=e;t.environment=t.environment||n||hc,!t.release&&s&&(t.release=s),!t.dist&&r&&(t.dist=r);const o=t.request;o?.url&&(o.url=i?Dh(o.url,i):o.url)}function Fy(t,e){const n=Dy(e);t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.filename&&(r.debug_id=n[r.filename])})})}function Uy(t){const e={};if(t.exception?.values?.forEach(s=>{s.stacktrace?.frames?.forEach(r=>{r.debug_id&&(r.abs_path?e[r.abs_path]=r.debug_id:r.filename&&(e[r.filename]=r.debug_id),delete r.debug_id)})}),Object.keys(e).length===0)return;t.debug_meta=t.debug_meta||{},t.debug_meta.images=t.debug_meta.images||[];const n=t.debug_meta.images;Object.entries(e).forEach(([s,r])=>{n.push({type:"sourcemap",code_file:s,debug_id:r})})}function $y(t,e){e.length>0&&(t.sdk=t.sdk||{},t.sdk.integrations=[...t.sdk.integrations||[],...e])}function By(t,e,n){if(!t)return null;const s={...t,...t.breadcrumbs&&{breadcrumbs:t.breadcrumbs.map(r=>({...r,...r.data&&{data:it(r.data,e,n)}}))},...t.user&&{user:it(t.user,e,n)},...t.contexts&&{contexts:it(t.contexts,e,n)},...t.extra&&{extra:it(t.extra,e,n)}};return t.contexts?.trace&&s.contexts&&(s.contexts.trace=t.contexts.trace,t.contexts.trace.data&&(s.contexts.trace.data=it(t.contexts.trace.data,e,n))),t.spans&&(s.spans=t.spans.map(r=>({...r,...r.data&&{data:it(r.data,e,n)}}))),t.contexts?.flags&&s.contexts&&(s.contexts.flags=it(t.contexts.flags,3,n)),s}function Hy(t,e){if(!e)return t;const n=t?t.clone():new yt;return n.update(e),n}function Wy(t,e){return Yt().captureException(t,void 0)}function qh(t,e){return Yt().captureEvent(t,e)}function bu(t){const e=yr(),n=Yt(),{userAgent:s}=M.navigator||{},r=y_({user:n.getUser()||e.getUser(),...s&&{userAgent:s},...t}),i=e.getSession();return i?.status==="ok"&&Yn(i,{status:"exited"}),Yh(),e.setSession(r),r}function Yh(){const t=yr(),n=Yt().getSession()||t.getSession();n&&E_(n),Kh(),t.setSession()}function Kh(){const t=yr(),e=ye(),n=t.getSession();n&&e&&e.captureSession(n)}function Su(t=!1){if(t){Yh();return}Kh()}const Vy="7";function jy(t){const e=t.protocol?`${t.protocol}:`:"",n=t.port?`:${t.port}`:"";return`${e}//${t.host}${n}${t.path?`/${t.path}`:""}/api/`}function zy(t){return`${jy(t)}${t.projectId}/envelope/`}function Gy(t,e){const n={sentry_version:Vy};return t.publicKey&&(n.sentry_key=t.publicKey),e&&(n.sentry_client=`${e.name}/${e.version}`),new URLSearchParams(n).toString()}function qy(t,e,n){return e||`${zy(t)}?${Gy(t,n)}`}const Cu=[];function Yy(t){const e={};return t.forEach(n=>{const{name:s}=n,r=e[s];r&&!r.isDefaultInstance&&n.isDefaultInstance||(e[s]=n)}),Object.values(e)}function Ky(t){const e=t.defaultIntegrations||[],n=t.integrations;e.forEach(r=>{r.isDefaultInstance=!0});let s;if(Array.isArray(n))s=[...e,...n];else if(typeof n=="function"){const r=n(e);s=Array.isArray(r)?r:[r]}else s=e;return Yy(s)}function Jy(t,e){const n={};return e.forEach(s=>{s&&Jh(t,s,n)}),n}function Tu(t,e){for(const n of e)n?.afterAllSetup&&n.afterAllSetup(t)}function Jh(t,e,n){if(n[e.name]){C&&b.log(`Integration skipped because it was already installed: ${e.name}`);return}if(n[e.name]=e,!Cu.includes(e.name)&&typeof e.setupOnce=="function"&&(e.setupOnce(),Cu.push(e.name)),e.setup&&typeof e.setup=="function"&&e.setup(t),typeof e.preprocessEvent=="function"){const s=e.preprocessEvent.bind(e);t.on("preprocessEvent",(r,i)=>s(r,i,t))}if(typeof e.processEvent=="function"){const s=e.processEvent.bind(e),r=Object.assign((i,o)=>s(i,o,t),{id:e.name});t.addEventProcessor(r)}C&&b.log(`Integration installed: ${e.name}`)}function Xy(t){return[{type:"log",item_count:t.length,content_type:"application/vnd.sentry.items.log+json"},{items:t}]}function Qy(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Er(s)),us(r,[Xy(t)])}function Xh(t,e){const n=e??Zy(t)??[];if(n.length===0)return;const s=t.getOptions(),r=Qy(n,s._metadata,s.tunnel,t.getDsn());Qh().set(t,[]),t.emit("flushLogs"),t.sendEnvelope(r)}function Zy(t){return Qh().get(t)}function Qh(){return as("clientToLogBufferMap",()=>new WeakMap)}function eE(t){return[{type:"trace_metric",item_count:t.length,content_type:"application/vnd.sentry.items.trace-metric+json"},{items:t}]}function tE(t,e,n,s){const r={};return e?.sdk&&(r.sdk={name:e.sdk.name,version:e.sdk.version}),n&&s&&(r.dsn=Er(s)),us(r,[eE(t)])}function Zh(t,e){const n=e??nE(t)??[];if(n.length===0)return;const s=t.getOptions(),r=tE(n,s._metadata,s.tunnel,t.getDsn());ef().set(t,[]),t.emit("flushMetrics"),t.sendEnvelope(r)}function nE(t){return ef().get(t)}function ef(){return as("clientToMetricBufferMap",()=>new WeakMap)}function sE(t,e,n){const s=[{type:"client_report"},{timestamp:mr(),discarded_events:t}];return us(e?{dsn:e}:{},[s])}function tf(t){const e=[];t.message&&e.push(t.message);try{const n=t.exception.values[t.exception.values.length-1];n?.value&&(e.push(n.value),n.type&&e.push(`${n.type}: ${n.value}`))}catch{}return e}function rE(t){const{trace_id:e,parent_span_id:n,span_id:s,status:r,origin:i,data:o,op:a}=t.contexts?.trace??{};return{data:o??{},description:t.transaction,op:a,parent_span_id:n,span_id:s??"",start_timestamp:t.start_timestamp??0,status:r,timestamp:t.timestamp,trace_id:e??"",origin:i,profile_id:o?.[Uh],exclusive_time:o?.[$h],measurements:t.measurements,is_segment:!0}}function iE(t){return{type:"transaction",timestamp:t.timestamp,start_timestamp:t.start_timestamp,transaction:t.description,contexts:{trace:{trace_id:t.trace_id,span_id:t.span_id,parent_span_id:t.parent_span_id,op:t.op,status:t.status,origin:t.origin,data:{...t.data,...t.profile_id&&{[Uh]:t.profile_id},...t.exclusive_time&&{[$h]:t.exclusive_time}}}},measurements:t.measurements}}const Iu="Not capturing exception because it's already been captured.",ku="Discarded session because of missing or non-string release",nf=Symbol.for("SentryInternalError"),sf=Symbol.for("SentryDoNotSendEventError"),oE=5e3;function qr(t){return{message:t,[nf]:!0}}function Ao(t){return{message:t,[sf]:!0}}function Ru(t){return!!t&&typeof t=="object"&&nf in t}function Au(t){return!!t&&typeof t=="object"&&sf in t}function Pu(t,e,n,s,r){let i=0,o,a=!1;t.on(n,()=>{i=0,clearTimeout(o),a=!1}),t.on(e,c=>{i+=s(c),i>=8e5?r(t):a||(a=!0,o=setTimeout(()=>{r(t)},oE))}),t.on("flush",()=>{r(t)})}class aE{constructor(e){if(this._options=e,this._integrations={},this._numProcessing=0,this._outcomes={},this._hooks={},this._eventProcessors=[],e.dsn?this._dsn=Q_(e.dsn):C&&b.warn("No DSN provided, client will not send events."),this._dsn){const s=qy(this._dsn,e.tunnel,e._metadata?e._metadata.sdk:void 0);this._transport=e.transport({tunnel:this._options.tunnel,recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:s})}this._options.enableLogs&&Pu(this,"afterCaptureLog","flushLogs",dE,Xh),(this._options.enableMetrics??this._options._experiments?.enableMetrics??!0)&&Pu(this,"afterCaptureMetric","flushMetrics",uE,Zh)}captureException(e,n,s){const r=Le();if(nu(e))return C&&b.log(Iu),r;const i={event_id:r,...n};return this._process(this.eventFromException(e,i).then(o=>this._captureEvent(o,i,s))),i.event_id}captureMessage(e,n,s,r){const i={event_id:Le(),...s},o=oc(e)?e:String(e),a=Wi(e)?this.eventFromMessage(o,n,i):this.eventFromException(e,i);return this._process(a.then(c=>this._captureEvent(c,i,r))),i.event_id}captureEvent(e,n,s){const r=Le();if(n?.originalException&&nu(n.originalException))return C&&b.log(Iu),r;const i={event_id:r,...n},o=e.sdkProcessingMetadata||{},a=o.capturedSpanScope,c=o.capturedSpanIsolationScope;return this._process(this._captureEvent(e,i,a||s,c)),i.event_id}captureSession(e){this.sendSession(e),Yn(e,{init:!1})}getDsn(){return this._dsn}getOptions(){return this._options}getSdkMetadata(){return this._options._metadata}getTransport(){return this._transport}async flush(e){const n=this._transport;if(!n)return!0;this.emit("flush");const s=await this._isClientDoneProcessing(e),r=await n.flush(e);return s&&r}async close(e){const n=await this.flush(e);return this.getOptions().enabled=!1,this.emit("close"),n}getEventProcessors(){return this._eventProcessors}addEventProcessor(e){this._eventProcessors.push(e)}init(){(this._isEnabled()||this._options.integrations.some(({name:e})=>e.startsWith("Spotlight")))&&this._setupIntegrations()}getIntegrationByName(e){return this._integrations[e]}addIntegration(e){const n=this._integrations[e.name];Jh(this,e,this._integrations),n||Tu(this,[e])}sendEvent(e,n={}){this.emit("beforeSendEvent",e,n);let s=Iy(e,this._dsn,this._options._metadata,this._options.tunnel);for(const r of n.attachments||[])s=yy(s,wy(r));this.sendEnvelope(s).then(r=>this.emit("afterSendEvent",e,r))}sendSession(e){const{release:n,environment:s=hc}=this._options;if("aggregates"in e){const i=e.attrs||{};if(!i.release&&!n){C&&b.warn(ku);return}i.release=i.release||n,i.environment=i.environment||s,e.attrs=i}else{if(!e.release&&!n){C&&b.warn(ku);return}e.release=e.release||n,e.environment=e.environment||s}this.emit("beforeSendSession",e);const r=Ty(e,this._dsn,this._options._metadata,this._options.tunnel);this.sendEnvelope(r)}recordDroppedEvent(e,n,s=1){if(this._options.sendClientReports){const r=`${e}:${n}`;C&&b.log(`Recording outcome: "${r}"${s>1?` (${s} times)`:""}`),this._outcomes[r]=(this._outcomes[r]||0)+s}}on(e,n){const s=this._hooks[e]=this._hooks[e]||new Set,r=(...i)=>n(...i);return s.add(r),()=>{s.delete(r)}}emit(e,...n){const s=this._hooks[e];s&&s.forEach(r=>r(...n))}async sendEnvelope(e){if(this.emit("beforeEnvelope",e),this._isEnabled()&&this._transport)try{return await this._transport.send(e)}catch(n){return C&&b.error("Error while sending envelope:",n),{}}return C&&b.error("Transport disabled"),{}}_setupIntegrations(){const{integrations:e}=this._options;this._integrations=Jy(this,e),Tu(this,e)}_updateSessionFromEvent(e,n){let s=n.level==="fatal",r=!1;const i=n.exception?.values;if(i){r=!0,s=!1;for(const c of i)if(c.mechanism?.handled===!1){s=!0;break}}const o=e.status==="ok";(o&&e.errors===0||o&&s)&&(Yn(e,{...s&&{status:"crashed"},errors:e.errors||Number(r||s)}),this.captureSession(e))}async _isClientDoneProcessing(e){let n=0;for(;!e||n<e;){if(await new Promise(s=>setTimeout(s,1)),!this._numProcessing)return!0;n++}return!1}_isEnabled(){return this.getOptions().enabled!==!1&&this._transport!==void 0}_prepareEvent(e,n,s,r){const i=this.getOptions(),o=Object.keys(this._integrations);return!n.integrations&&o?.length&&(n.integrations=o),this.emit("preprocessEvent",e,n),e.type||r.setLastEventId(e.event_id||n.event_id),My(i,e,n,s,this,r).then(a=>{if(a===null)return a;this.emit("postprocessEvent",a,n),a.contexts={trace:P_(s),...a.contexts};const c=dy(this,s);return a.sdkProcessingMetadata={dynamicSamplingContext:c,...a.sdkProcessingMetadata},a})}_captureEvent(e,n={},s=Yt(),r=yr()){return C&&la(e)&&b.log(`Captured error event \`${tf(e)[0]||"<unknown>"}\``),this._processEvent(e,n,s,r).then(i=>i.event_id,i=>{C&&(Au(i)?b.log(i.message):Ru(i)?b.warn(i.message):b.warn(i))})}_processEvent(e,n,s,r){const i=this.getOptions(),{sampleRate:o}=i,a=rf(e),c=la(e),l=e.type||"error",u=`before send for type \`${l}\``,d=typeof o>"u"?void 0:Z_(o);if(c&&typeof d=="number"&&Math.random()>d)return this.recordDroppedEvent("sample_rate","error"),fc(Ao(`Discarding event because it's not included in the random sample (sampling rate = ${o})`));const h=l==="replay_event"?"replay":l;return this._prepareEvent(e,n,s,r).then(f=>{if(f===null)throw this.recordDroppedEvent("event_processor",h),Ao("An event processor returned `null`, will not send event.");if(n.data&&n.data.__sentry__===!0)return f;const y=lE(this,i,f,n);return cE(y,u)}).then(f=>{if(f===null){if(this.recordDroppedEvent("before_send",h),a){const T=1+(e.spans||[]).length;this.recordDroppedEvent("before_send","span",T)}throw Ao(`${u} returned \`null\`, will not send event.`)}const p=s.getSession()||r.getSession();if(c&&p&&this._updateSessionFromEvent(p,f),a){const m=f.sdkProcessingMetadata?.spanCountBeforeProcessing||0,T=f.spans?f.spans.length:0,B=m-T;B>0&&this.recordDroppedEvent("before_send","span",B)}const y=f.transaction_info;if(a&&y&&f.transaction!==e.transaction){const m="custom";f.transaction_info={...y,source:m}}return this.sendEvent(f,n),f}).then(null,f=>{throw Au(f)||Ru(f)?f:(this.captureException(f,{mechanism:{handled:!1,type:"internal"},data:{__sentry__:!0},originalException:f}),qr(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${f}`))})}_process(e){this._numProcessing++,e.then(n=>(this._numProcessing--,n),n=>(this._numProcessing--,n))}_clearOutcomes(){const e=this._outcomes;return this._outcomes={},Object.entries(e).map(([n,s])=>{const[r,i]=n.split(":");return{reason:r,category:i,quantity:s}})}_flushOutcomes(){C&&b.log("Flushing outcomes...");const e=this._clearOutcomes();if(e.length===0){C&&b.log("No outcomes to send");return}if(!this._dsn){C&&b.log("No dsn provided, will not send outcomes");return}C&&b.log("Sending outcomes:",e);const n=sE(e,this._options.tunnel&&Er(this._dsn));this.sendEnvelope(n)}}function cE(t,e){const n=`${e} must return \`null\` or a valid event.`;if(gr(t))return t.then(s=>{if(!Xs(s)&&s!==null)throw qr(n);return s},s=>{throw qr(`${e} rejected with ${s}`)});if(!Xs(t)&&t!==null)throw qr(n);return t}function lE(t,e,n,s){const{beforeSend:r,beforeSendTransaction:i,beforeSendSpan:o,ignoreSpans:a}=e;let c=n;if(la(c)&&r)return r(c,s);if(rf(c)){if(o||a){const l=rE(c);if(a?.length&&pu(l,a))return null;if(o){const u=o(l);u?c=_r(n,iE(u)):hu()}if(c.spans){const u=[],d=c.spans;for(const f of d){if(a?.length&&pu(f,a)){cy(d,f);continue}if(o){const p=o(f);p?u.push(p):(hu(),u.push(f))}else u.push(f)}const h=c.spans.length-u.length;h&&t.recordDroppedEvent("before_send","span",h),c.spans=u}}if(i){if(c.spans){const l=c.spans.length;c.sdkProcessingMetadata={...n.sdkProcessingMetadata,spanCountBeforeProcessing:l}}return i(c,s)}}return c}function la(t){return t.type===void 0}function rf(t){return t.type==="transaction"}function uE(t){let e=0;return t.name&&(e+=t.name.length*2),e+=8,e+of(t.attributes)}function dE(t){let e=0;return t.message&&(e+=t.message.length*2),e+of(t.attributes)}function of(t){if(!t)return 0;let e=0;return Object.values(t).forEach(n=>{Array.isArray(n)?e+=n.length*Nu(n[0]):Wi(n)?e+=Nu(n):e+=100}),e}function Nu(t){return typeof t=="string"?t.length*2:typeof t=="number"?8:typeof t=="boolean"?4:0}function hE(t,e){e.debug===!0&&(C?b.enable():cs(()=>{console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.")})),Yt().update(e.initialScope);const s=new t(e);return fE(s),s.init(),s}function fE(t){Yt().setClient(t)}const af=Symbol.for("SentryBufferFullError");function cf(t=100){const e=new Set;function n(){return e.size<t}function s(o){e.delete(o)}function r(o){if(!n())return fc(af);const a=o();return e.add(a),a.then(()=>s(a),()=>s(a)),a}function i(o){if(!e.size)return zi(!0);const a=Promise.allSettled(Array.from(e)).then(()=>!0);if(!o)return a;const c=[a,new Promise(l=>setTimeout(()=>l(!1),o))];return Promise.race(c)}return{get $(){return Array.from(e)},add:r,drain:i}}const pE=60*1e3;function gE(t,e=Date.now()){const n=parseInt(`${t}`,10);if(!isNaN(n))return n*1e3;const s=Date.parse(`${t}`);return isNaN(s)?pE:s-e}function mE(t,e){return t[e]||t.all||0}function _E(t,e,n=Date.now()){return mE(t,e)>n}function yE(t,{statusCode:e,headers:n},s=Date.now()){const r={...t},i=n?.["x-sentry-rate-limits"],o=n?.["retry-after"];if(i)for(const a of i.trim().split(",")){const[c,l,,,u]=a.split(":",5),d=parseInt(c,10),h=(isNaN(d)?60:d)*1e3;if(!l)r.all=s+h;else for(const f of l.split(";"))f==="metric_bucket"?(!u||u.split(";").includes("custom"))&&(r[f]=s+h):r[f]=s+h}else o?r.all=s+gE(o,s):e===429&&(r.all=s+60*1e3);return r}const EE=64;function vE(t,e,n=cf(t.bufferSize||EE)){let s={};const r=o=>n.drain(o);function i(o){const a=[];if(gu(o,(d,h)=>{const f=mu(h);_E(s,f)?t.recordDroppedEvent("ratelimit_backoff",f):a.push(d)}),a.length===0)return Promise.resolve({});const c=us(o[0],a),l=d=>{gu(c,(h,f)=>{t.recordDroppedEvent(d,mu(f))})},u=()=>e({body:Ey(c)}).then(d=>(d.statusCode!==void 0&&(d.statusCode<200||d.statusCode>=300)&&C&&b.warn(`Sentry responded with status code ${d.statusCode} to sent event.`),s=yE(s,d),d),d=>{throw l("network_error"),C&&b.error("Encountered error running transport request:",d),d});return n.add(u).then(d=>d,d=>{if(d===af)return C&&b.error("Skipped sending event because buffer is full."),l("queue_overflow"),Promise.resolve({});throw d})}return{send:i,flush:r}}function Po(t){if(!t)return{};const e=t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!e)return{};const n=e[6]||"",s=e[8]||"";return{host:e[4],path:e[5],protocol:e[2],search:n,hash:s,relative:e[5]+n+s}}function wE(t){"aggregates"in t?t.attrs?.ip_address===void 0&&(t.attrs={...t.attrs,ip_address:"{{auto}}"}):t.ipAddress===void 0&&(t.ipAddress="{{auto}}")}function bE(t,e,n=[e],s="npm"){const r=t._metadata||{};r.sdk||(r.sdk={name:`sentry.javascript.${e}`,packages:n.map(i=>({name:`${s}:@sentry/${i}`,version:ln})),version:ln}),t._metadata=r}const SE=100;function gn(t,e){const n=ye(),s=yr();if(!n)return;const{beforeBreadcrumb:r=null,maxBreadcrumbs:i=SE}=n.getOptions();if(i<=0)return;const a={timestamp:mr(),...t},c=r?cs(()=>r(a,e)):a;c!==null&&(n.emit&&n.emit("beforeAddBreadcrumb",c,e),s.addBreadcrumb(c,i))}let Lu;const CE="FunctionToString",Ou=new WeakMap,TE=(()=>({name:CE,setupOnce(){Lu=Function.prototype.toString;try{Function.prototype.toString=function(...t){const e=lc(this),n=Ou.has(ye())&&e!==void 0?e:this;return Lu.apply(n,t)}}catch{}},setup(t){Ou.set(t,!0)}})),IE=TE,kE=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/,/^ResizeObserver loop completed with undelivered notifications.$/,/^Cannot redefine property: googletag$/,/^Can't find variable: gmo$/,/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,`can't redefine non-configurable property "solana"`,"vv().getRestrictions is not a function. (In 'vv().getRestrictions(1,a)', 'vv().getRestrictions' is undefined)","Can't find variable: _AutofillCallbackHandler",/^Non-Error promise rejection captured with value: Object Not Found Matching Id:\d+, MethodName:simulateEvent, ParamCount:\d+$/,/^Java exception was raised during method invocation$/],RE="EventFilters",AE=(t={})=>{let e;return{name:RE,setup(n){const s=n.getOptions();e=Du(t,s)},processEvent(n,s,r){if(!e){const i=r.getOptions();e=Du(t,i)}return NE(n,e)?null:n}}},PE=((t={})=>({...AE(t),name:"InboundFilters"}));function Du(t={},e={}){return{allowUrls:[...t.allowUrls||[],...e.allowUrls||[]],denyUrls:[...t.denyUrls||[],...e.denyUrls||[]],ignoreErrors:[...t.ignoreErrors||[],...e.ignoreErrors||[],...t.disableErrorDefaults?[]:kE],ignoreTransactions:[...t.ignoreTransactions||[],...e.ignoreTransactions||[]]}}function NE(t,e){if(t.type){if(t.type==="transaction"&&OE(t,e.ignoreTransactions))return C&&b.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${sn(t)}`),!0}else{if(LE(t,e.ignoreErrors))return C&&b.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${sn(t)}`),!0;if(FE(t))return C&&b.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${sn(t)}`),!0;if(DE(t,e.denyUrls))return C&&b.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${sn(t)}.
Url: ${oi(t)}`),!0;if(!ME(t,e.allowUrls))return C&&b.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${sn(t)}.
Url: ${oi(t)}`),!0}return!1}function LE(t,e){return e?.length?tf(t).some(n=>ji(n,e)):!1}function OE(t,e){if(!e?.length)return!1;const n=t.transaction;return n?ji(n,e):!1}function DE(t,e){if(!e?.length)return!1;const n=oi(t);return n?ji(n,e):!1}function ME(t,e){if(!e?.length)return!0;const n=oi(t);return n?ji(n,e):!0}function xE(t=[]){for(let e=t.length-1;e>=0;e--){const n=t[e];if(n&&n.filename!=="<anonymous>"&&n.filename!=="[native code]")return n.filename||null}return null}function oi(t){try{const n=[...t.exception?.values??[]].reverse().find(s=>s.mechanism?.parent_id===void 0&&s.stacktrace?.frames?.length)?.stacktrace?.frames;return n?xE(n):null}catch{return C&&b.error(`Cannot extract url for event ${sn(t)}`),null}}function FE(t){return t.exception?.values?.length?!t.message&&!t.exception.values.some(e=>e.stacktrace||e.type&&e.type!=="Error"||e.value):!1}function UE(t,e,n,s,r,i){if(!r.exception?.values||!i||!Ht(i.originalException,Error))return;const o=r.exception.values.length>0?r.exception.values[r.exception.values.length-1]:void 0;o&&(r.exception.values=ua(t,e,s,i.originalException,n,r.exception.values,o,0))}function ua(t,e,n,s,r,i,o,a){if(i.length>=n+1)return i;let c=[...i];if(Ht(s[r],Error)){Mu(o,a);const l=t(e,s[r]),u=c.length;xu(l,r,u,a),c=ua(t,e,n,s[r],r,[l,...c],l,u)}return Array.isArray(s.errors)&&s.errors.forEach((l,u)=>{if(Ht(l,Error)){Mu(o,a);const d=t(e,l),h=c.length;xu(d,`errors[${u}]`,h,a),c=ua(t,e,n,l,r,[d,...c],d,h)}}),c}function Mu(t,e){t.mechanism={handled:!0,type:"auto.core.linked_errors",...t.mechanism,...t.type==="AggregateError"&&{is_exception_group:!0},exception_id:e}}function xu(t,e,n,s){t.mechanism={handled:!0,...t.mechanism,type:"chained",source:e,exception_id:n,parent_id:s}}function $E(t){const e="console";Tn(e,t),In(e,BE)}function BE(){"console"in M&&Gm.forEach(function(t){t in M.console&&ke(M.console,t,function(e){return ii[t]=e,function(...n){Ve("console",{args:n,level:t}),ii[t]?.apply(M.console,n)}})})}function HE(t){return t==="warn"?"warning":["fatal","error","warning","log","info","debug"].includes(t)?t:"log"}const WE="Dedupe",VE=(()=>{let t;return{name:WE,processEvent(e){if(e.type)return e;try{if(zE(e,t))return C&&b.warn("Event dropped due to being a duplicate of previously captured event."),null}catch{}return t=e}}}),jE=VE;function zE(t,e){return e?!!(GE(t,e)||qE(t,e)):!1}function GE(t,e){const n=t.message,s=e.message;return!(!n&&!s||n&&!s||!n&&s||n!==s||!uf(t,e)||!lf(t,e))}function qE(t,e){const n=Fu(e),s=Fu(t);return!(!n||!s||n.type!==s.type||n.value!==s.value||!uf(t,e)||!lf(t,e))}function lf(t,e){let n=Jl(t),s=Jl(e);if(!n&&!s)return!0;if(n&&!s||!n&&s||(n=n,s=s,s.length!==n.length))return!1;for(let r=0;r<s.length;r++){const i=s[r],o=n[r];if(i.filename!==o.filename||i.lineno!==o.lineno||i.colno!==o.colno||i.function!==o.function)return!1}return!0}function uf(t,e){let n=t.fingerprint,s=e.fingerprint;if(!n&&!s)return!0;if(n&&!s||!n&&s)return!1;n=n,s=s;try{return n.join("")===s.join("")}catch{return!1}}function Fu(t){return t.exception?.values?.[0]}function df(t){if(t!==void 0)return t>=400&&t<500?"warning":t>=500?"error":void 0}const Zs=M;function YE(){return"history"in Zs&&!!Zs.history}function KE(){if(!("fetch"in Zs))return!1;try{return new Headers,new Request("data:,"),new Response,!0}catch{return!1}}function da(t){return t&&/^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())}function JE(){if(typeof EdgeRuntime=="string")return!0;if(!KE())return!1;if(da(Zs.fetch))return!0;let t=!1;const e=Zs.document;if(e&&typeof e.createElement=="function")try{const n=e.createElement("iframe");n.hidden=!0,e.head.appendChild(n),n.contentWindow?.fetch&&(t=da(n.contentWindow.fetch)),e.head.removeChild(n)}catch(n){C&&b.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return t}function XE(t,e){const n="fetch";Tn(n,t),In(n,()=>QE(void 0,e))}function QE(t,e=!1){e&&!JE()||ke(M,"fetch",function(n){return function(...s){const r=new Error,{method:i,url:o}=ZE(s),a={args:s,fetchData:{method:i,url:o},startTimestamp:pt()*1e3,virtualError:r,headers:ev(s)};return Ve("fetch",{...a}),n.apply(M,s).then(async c=>(Ve("fetch",{...a,endTimestamp:pt()*1e3,response:c}),c),c=>{if(Ve("fetch",{...a,endTimestamp:pt()*1e3,error:c}),ic(c)&&c.stack===void 0&&(c.stack=r.stack,pn(c,"framesToPop",1)),c instanceof TypeError&&(c.message==="Failed to fetch"||c.message==="Load failed"||c.message==="NetworkError when attempting to fetch resource."))try{const l=new URL(a.fetchData.url);c.message=`${c.message} (${l.host})`}catch{}throw c})}})}function ha(t,e){return!!t&&typeof t=="object"&&!!t[e]}function Uu(t){return typeof t=="string"?t:t?ha(t,"url")?t.url:t.toString?t.toString():"":""}function ZE(t){if(t.length===0)return{method:"GET",url:""};if(t.length===2){const[n,s]=t;return{url:Uu(n),method:ha(s,"method")?String(s.method).toUpperCase():"GET"}}const e=t[0];return{url:Uu(e),method:ha(e,"method")?String(e.method).toUpperCase():"GET"}}function ev(t){const[e,n]=t;try{if(typeof n=="object"&&n!==null&&"headers"in n&&n.headers)return new Headers(n.headers);if(l_(e))return new Headers(e.headers)}catch{}}function tv(){return"npm"}const Z=M;let fa=0;function hf(){return fa>0}function nv(){fa++,setTimeout(()=>{fa--})}function Jn(t,e={}){function n(r){return typeof r=="function"}if(!n(t))return t;try{const r=t.__sentry_wrapped__;if(r)return typeof r=="function"?r:t;if(lc(t))return t}catch{return t}const s=function(...r){try{const i=r.map(o=>Jn(o,e));return t.apply(this,i)}catch(i){throw nv(),A_(o=>{o.addEventProcessor(a=>(e.mechanism&&(ra(a,void 0),qn(a,e.mechanism)),a.extra={...a.extra,arguments:r},a)),Wy(i)}),i}};try{for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=t[r])}catch{}Lh(s,t),pn(t,"__sentry_wrapped__",s);try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get(){return t.name}})}catch{}return s}function sv(){const t=cc(),{referrer:e}=Z.document||{},{userAgent:n}=Z.navigator||{},s={...e&&{Referer:e},...n&&{"User-Agent":n}};return{url:t,headers:s}}function pc(t,e){const n=gc(t,e),s={type:cv(e),value:lv(e)};return n.length&&(s.stacktrace={frames:n}),s.type===void 0&&s.value===""&&(s.value="Unrecoverable error caught"),s}function rv(t,e,n,s){const i=ye()?.getOptions().normalizeDepth,o=pv(e),a={__serialized__:zh(e,i)};if(o)return{exception:{values:[pc(t,o)]},extra:a};const c={exception:{values:[{type:Vi(e)?e.constructor.name:s?"UnhandledRejection":"Error",value:hv(e,{isUnhandledRejection:s})}]},extra:a};if(n){const l=gc(t,n);l.length&&(c.exception.values[0].stacktrace={frames:l})}return c}function No(t,e){return{exception:{values:[pc(t,e)]}}}function gc(t,e){const n=e.stacktrace||e.stack||"",s=ov(e),r=av(e);try{return t(n,s,r)}catch{}return[]}const iv=/Minified React error #\d+;/i;function ov(t){return t&&iv.test(t.message)?1:0}function av(t){return typeof t.framesToPop=="number"?t.framesToPop:0}function ff(t){return typeof WebAssembly<"u"&&typeof WebAssembly.Exception<"u"?t instanceof WebAssembly.Exception:!1}function cv(t){const e=t?.name;return!e&&ff(t)?t.message&&Array.isArray(t.message)&&t.message.length==2?t.message[0]:"WebAssembly.Exception":e}function lv(t){const e=t?.message;return ff(t)?Array.isArray(t.message)&&t.message.length==2?t.message[1]:"wasm exception":e?e.error&&typeof e.error.message=="string"?e.error.message:e:"No error message"}function uv(t,e,n,s){const r=n?.syntheticException||void 0,i=mc(t,e,r,s);return qn(i),i.level="error",n?.event_id&&(i.event_id=n.event_id),zi(i)}function dv(t,e,n="info",s,r){const i=s?.syntheticException||void 0,o=pa(t,e,i,r);return o.level=n,s?.event_id&&(o.event_id=s.event_id),zi(o)}function mc(t,e,n,s,r){let i;if(Ah(e)&&e.error)return No(t,e.error);if(Ql(e)||i_(e)){const o=e;if("stack"in e)i=No(t,e);else{const a=o.name||(Ql(o)?"DOMError":"DOMException"),c=o.message?`${a}: ${o.message}`:a;i=pa(t,c,n,s),ra(i,c)}return"code"in o&&(i.tags={...i.tags,"DOMException.code":`${o.code}`}),i}return ic(e)?No(t,e):Xs(e)||Vi(e)?(i=rv(t,e,n,r),qn(i,{synthetic:!0}),i):(i=pa(t,e,n,s),ra(i,`${e}`),qn(i,{synthetic:!0}),i)}function pa(t,e,n,s){const r={};if(s&&n){const i=gc(t,n);i.length&&(r.exception={values:[{value:e,stacktrace:{frames:i}}]}),qn(r,{synthetic:!0})}if(oc(e)){const{__sentry_template_string__:i,__sentry_template_values__:o}=e;return r.logentry={message:i,params:o},r}return r.message=e,r}function hv(t,{isUnhandledRejection:e}){const n=f_(t),s=e?"promise rejection":"exception";return Ah(t)?`Event \`ErrorEvent\` captured as ${s} with message \`${t.message}\``:Vi(t)?`Event \`${fv(t)}\` (type=${t.type}) captured as ${s}`:`Object captured as ${s} with keys: ${n}`}function fv(t){try{const e=Object.getPrototypeOf(t);return e?e.constructor.name:void 0}catch{}}function pv(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)){const n=t[e];if(n instanceof Error)return n}}class gv extends aE{constructor(e){const n=mv(e),s=Z.SENTRY_SDK_SOURCE||tv();bE(n,"browser",["browser"],s),n._metadata?.sdk&&(n._metadata.sdk.settings={infer_ip:n.sendDefaultPii?"auto":"never",...n._metadata.sdk.settings}),super(n);const{sendDefaultPii:r,sendClientReports:i,enableLogs:o,_experiments:a,enableMetrics:c}=this._options,l=c??a?.enableMetrics??!0;Z.document&&(i||o||l)&&Z.document.addEventListener("visibilitychange",()=>{Z.document.visibilityState==="hidden"&&(i&&this._flushOutcomes(),o&&Xh(this),l&&Zh(this))}),r&&this.on("beforeSendSession",wE)}eventFromException(e,n){return uv(this._options.stackParser,e,n,this._options.attachStacktrace)}eventFromMessage(e,n="info",s){return dv(this._options.stackParser,e,n,s,this._options.attachStacktrace)}_prepareEvent(e,n,s,r){return e.platform=e.platform||"javascript",super._prepareEvent(e,n,s,r)}}function mv(t){return{release:typeof __SENTRY_RELEASE__=="string"?__SENTRY_RELEASE__:Z.SENTRY_RELEASE?.id,sendClientReports:!0,parentSpanIsAlwaysRootSpan:!0,...t}}const _v=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,pe=M,yv=1e3;let $u,ga,ma;function Ev(t){Tn("dom",t),In("dom",vv)}function vv(){if(!pe.document)return;const t=Ve.bind(null,"dom"),e=Bu(t,!0);pe.document.addEventListener("click",e,!1),pe.document.addEventListener("keypress",e,!1),["EventTarget","Node"].forEach(n=>{const r=pe[n]?.prototype;r?.hasOwnProperty?.("addEventListener")&&(ke(r,"addEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__=this.__sentry_instrumentation_handlers__||{},u=l[o]=l[o]||{refCount:0};if(!u.handler){const d=Bu(t);u.handler=d,i.call(this,o,d,c)}u.refCount++}catch{}return i.call(this,o,a,c)}}),ke(r,"removeEventListener",function(i){return function(o,a,c){if(o==="click"||o=="keypress")try{const l=this.__sentry_instrumentation_handlers__||{},u=l[o];u&&(u.refCount--,u.refCount<=0&&(i.call(this,o,u.handler,c),u.handler=void 0,delete l[o]),Object.keys(l).length===0&&delete this.__sentry_instrumentation_handlers__)}catch{}return i.call(this,o,a,c)}}))})}function wv(t){if(t.type!==ga)return!1;try{if(!t.target||t.target._sentryId!==ma)return!1}catch{}return!0}function bv(t,e){return t!=="keypress"?!1:e?.tagName?!(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable):!0}function Bu(t,e=!1){return n=>{if(!n||n._sentryCaptured)return;const s=Sv(n);if(bv(n.type,s))return;pn(n,"_sentryCaptured",!0),s&&!s._sentryId&&pn(s,"_sentryId",Le());const r=n.type==="keypress"?"input":n.type;wv(n)||(t({event:n,name:r,global:e}),ga=n.type,ma=s?s._sentryId:void 0),clearTimeout($u),$u=pe.setTimeout(()=>{ma=void 0,ga=void 0},yv)}}function Sv(t){try{return t.target}catch{return null}}let Mr;function pf(t){const e="history";Tn(e,t),In(e,Cv)}function Cv(){if(pe.addEventListener("popstate",()=>{const e=pe.location.href,n=Mr;if(Mr=e,n===e)return;Ve("history",{from:n,to:e})}),!YE())return;function t(e){return function(...n){const s=n.length>2?n[2]:void 0;if(s){const r=Mr,i=Tv(String(s));if(Mr=i,r===i)return e.apply(this,n);Ve("history",{from:r,to:i})}return e.apply(this,n)}}ke(pe.history,"pushState",t),ke(pe.history,"replaceState",t)}function Tv(t){try{return new URL(t,pe.location.origin).toString()}catch{return t}}const Yr={};function Iv(t){const e=Yr[t];if(e)return e;let n=pe[t];if(da(n))return Yr[t]=n.bind(pe);const s=pe.document;if(s&&typeof s.createElement=="function")try{const r=s.createElement("iframe");r.hidden=!0,s.head.appendChild(r);const i=r.contentWindow;i?.[t]&&(n=i[t]),s.head.removeChild(r)}catch(r){_v&&b.warn(`Could not create sandbox iframe for ${t} check, bailing to window.${t}: `,r)}return n&&(Yr[t]=n.bind(pe))}function kv(t){Yr[t]=void 0}const Ds="__sentry_xhr_v3__";function Rv(t){Tn("xhr",t),In("xhr",Av)}function Av(){if(!pe.XMLHttpRequest)return;const t=XMLHttpRequest.prototype;t.open=new Proxy(t.open,{apply(e,n,s){const r=new Error,i=pt()*1e3,o=ft(s[0])?s[0].toUpperCase():void 0,a=Pv(s[1]);if(!o||!a)return e.apply(n,s);n[Ds]={method:o,url:a,request_headers:{}},o==="POST"&&a.match(/sentry_key/)&&(n.__sentry_own_request__=!0);const c=()=>{const l=n[Ds];if(l&&n.readyState===4){try{l.status_code=n.status}catch{}const u={endTimestamp:pt()*1e3,startTimestamp:i,xhr:n,virtualError:r};Ve("xhr",u)}};return"onreadystatechange"in n&&typeof n.onreadystatechange=="function"?n.onreadystatechange=new Proxy(n.onreadystatechange,{apply(l,u,d){return c(),l.apply(u,d)}}):n.addEventListener("readystatechange",c),n.setRequestHeader=new Proxy(n.setRequestHeader,{apply(l,u,d){const[h,f]=d,p=u[Ds];return p&&ft(h)&&ft(f)&&(p.request_headers[h.toLowerCase()]=f),l.apply(u,d)}}),e.apply(n,s)}}),t.send=new Proxy(t.send,{apply(e,n,s){const r=n[Ds];if(!r)return e.apply(n,s);s[0]!==void 0&&(r.body=s[0]);const i={startTimestamp:pt()*1e3,xhr:n};return Ve("xhr",i),e.apply(n,s)}})}function Pv(t){if(ft(t))return t;try{return t.toString()}catch{}}const Nv=40;function Lv(t,e=Iv("fetch")){let n=0,s=0;async function r(i){const o=i.body.length;n+=o,s++;const a={body:i.body,method:"POST",referrerPolicy:"strict-origin",headers:t.headers,keepalive:n<=6e4&&s<15,...t.fetchOptions};try{const c=await e(t.url,a);return{statusCode:c.status,headers:{"x-sentry-rate-limits":c.headers.get("X-Sentry-Rate-Limits"),"retry-after":c.headers.get("Retry-After")}}}catch(c){throw kv("fetch"),c}finally{n-=o,s--}}return vE(t,r,cf(t.bufferSize||Nv))}const Ov=30,Dv=50;function _a(t,e,n,s){const r={filename:t,function:e==="<anonymous>"?fn:e,in_app:!0};return n!==void 0&&(r.lineno=n),s!==void 0&&(r.colno=s),r}const Mv=/^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,xv=/^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,Fv=/\((\S*)(?::(\d+))(?::(\d+))\)/,Uv=/at (.+?) ?\(data:(.+?),/,$v=t=>{const e=t.match(Uv);if(e)return{filename:`<data:${e[2]}>`,function:e[1]};const n=Mv.exec(t);if(n){const[,r,i,o]=n;return _a(r,fn,+i,+o)}const s=xv.exec(t);if(s){if(s[2]&&s[2].indexOf("eval")===0){const a=Fv.exec(s[2]);a&&(s[2]=a[1],s[3]=a[2],s[4]=a[3])}const[i,o]=gf(s[1]||fn,s[2]);return _a(o,i,s[3]?+s[3]:void 0,s[4]?+s[4]:void 0)}},Bv=[Ov,$v],Hv=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,Wv=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,Vv=t=>{const e=Hv.exec(t);if(e){if(e[3]&&e[3].indexOf(" > eval")>-1){const i=Wv.exec(e[3]);i&&(e[1]=e[1]||"eval",e[3]=i[1],e[4]=i[2],e[5]="")}let s=e[3],r=e[1]||fn;return[r,s]=gf(r,s),_a(s,r,e[4]?+e[4]:void 0,e[5]?+e[5]:void 0)}},jv=[Dv,Vv],zv=[Bv,jv],Gv=Ih(...zv),gf=(t,e)=>{const n=t.indexOf("safari-extension")!==-1,s=t.indexOf("safari-web-extension")!==-1;return n||s?[t.indexOf("@")!==-1?t.split("@")[0]:fn,n?`safari-extension:${e}`:`safari-web-extension:${e}`]:[t,e]},Gi=typeof __SENTRY_DEBUG__>"u"||__SENTRY_DEBUG__,xr=1024,qv="Breadcrumbs",Yv=((t={})=>{const e={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...t};return{name:qv,setup(n){e.console&&$E(Qv(n)),e.dom&&Ev(Xv(n,e.dom)),e.xhr&&Rv(Zv(n)),e.fetch&&XE(ew(n)),e.history&&pf(tw(n)),e.sentry&&n.on("beforeSendEvent",Jv(n))}}}),Kv=Yv;function Jv(t){return function(n){ye()===t&&gn({category:`sentry.${n.type==="transaction"?"transaction":"event"}`,event_id:n.event_id,level:n.level,message:sn(n)},{event:n})}}function Xv(t,e){return function(s){if(ye()!==t)return;let r,i,o=typeof e=="object"?e.serializeAttribute:void 0,a=typeof e=="object"&&typeof e.maxStringLength=="number"?e.maxStringLength:void 0;a&&a>xr&&(Gi&&b.warn(`\`dom.maxStringLength\` cannot exceed ${xr}, but a value of ${a} was configured. Sentry will use ${xr} instead.`),a=xr),typeof o=="string"&&(o=[o]);try{const l=s.event,u=nw(l)?l.target:l;r=Nh(u,{keyAttrs:o,maxStringLength:a}),i=h_(u)}catch{r="<unknown>"}if(r.length===0)return;const c={category:`ui.${s.name}`,message:r};i&&(c.data={"ui.component_name":i}),gn(c,{event:s.event,name:s.name,global:s.global})}}function Qv(t){return function(n){if(ye()!==t)return;const s={category:"console",data:{arguments:n.args,logger:"console"},level:HE(n.level),message:tu(n.args," ")};if(n.level==="assert")if(n.args[0]===!1)s.message=`Assertion failed: ${tu(n.args.slice(1)," ")||"console.assert"}`,s.data.arguments=n.args.slice(1);else return;gn(s,{input:n.args,level:n.level})}}function Zv(t){return function(n){if(ye()!==t)return;const{startTimestamp:s,endTimestamp:r}=n,i=n.xhr[Ds];if(!s||!r||!i)return;const{method:o,url:a,status_code:c,body:l}=i,u={method:o,url:a,status_code:c},d={xhr:n.xhr,input:l,startTimestamp:s,endTimestamp:r},h={category:"xhr",data:u,type:"http",level:df(c)};t.emit("beforeOutgoingRequestBreadcrumb",h,d),gn(h,d)}}function ew(t){return function(n){if(ye()!==t)return;const{startTimestamp:s,endTimestamp:r}=n;if(r&&!(n.fetchData.url.match(/sentry_key/)&&n.fetchData.method==="POST"))if(n.fetchData.method,n.fetchData.url,n.error){const i=n.fetchData,o={data:n.error,input:n.args,startTimestamp:s,endTimestamp:r},a={category:"fetch",data:i,level:"error",type:"http"};t.emit("beforeOutgoingRequestBreadcrumb",a,o),gn(a,o)}else{const i=n.response,o={...n.fetchData,status_code:i?.status};n.fetchData.request_body_size,n.fetchData.response_body_size,i?.status;const a={input:n.args,response:i,startTimestamp:s,endTimestamp:r},c={category:"fetch",data:o,type:"http",level:df(o.status_code)};t.emit("beforeOutgoingRequestBreadcrumb",c,a),gn(c,a)}}}function tw(t){return function(n){if(ye()!==t)return;let s=n.from,r=n.to;const i=Po(Z.location.href);let o=s?Po(s):void 0;const a=Po(r);o?.path||(o=i),i.protocol===a.protocol&&i.host===a.host&&(r=a.relative),i.protocol===o.protocol&&i.host===o.host&&(s=o.relative),gn({category:"navigation",data:{from:s,to:r}})}}function nw(t){return!!t&&!!t.target}const sw=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","BroadcastChannel","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"],rw="BrowserApiErrors",iw=((t={})=>{const e={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,unregisterOriginalCallbacks:!1,...t};return{name:rw,setupOnce(){e.setTimeout&&ke(Z,"setTimeout",Hu),e.setInterval&&ke(Z,"setInterval",Hu),e.requestAnimationFrame&&ke(Z,"requestAnimationFrame",aw),e.XMLHttpRequest&&"XMLHttpRequest"in Z&&ke(XMLHttpRequest.prototype,"send",cw);const n=e.eventTarget;n&&(Array.isArray(n)?n:sw).forEach(r=>lw(r,e))}}}),ow=iw;function Hu(t){return function(...e){const n=e[0];return e[0]=Jn(n,{mechanism:{handled:!1,type:`auto.browser.browserapierrors.${Bt(t)}`}}),t.apply(this,e)}}function aw(t){return function(e){return t.apply(this,[Jn(e,{mechanism:{data:{handler:Bt(t)},handled:!1,type:"auto.browser.browserapierrors.requestAnimationFrame"}})])}}function cw(t){return function(...e){const n=this;return["onload","onerror","onprogress","onreadystatechange"].forEach(r=>{r in n&&typeof n[r]=="function"&&ke(n,r,function(i){const o={mechanism:{data:{handler:Bt(i)},handled:!1,type:`auto.browser.browserapierrors.xhr.${r}`}},a=lc(i);return a&&(o.mechanism.data.handler=Bt(a)),Jn(i,o)})}),t.apply(this,e)}}function lw(t,e){const s=Z[t]?.prototype;s?.hasOwnProperty?.("addEventListener")&&(ke(s,"addEventListener",function(r){return function(i,o,a){try{uw(o)&&(o.handleEvent=Jn(o.handleEvent,{mechanism:{data:{handler:Bt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.handleEvent"}}))}catch{}return e.unregisterOriginalCallbacks&&dw(this,i,o),r.apply(this,[i,Jn(o,{mechanism:{data:{handler:Bt(o),target:t},handled:!1,type:"auto.browser.browserapierrors.addEventListener"}}),a])}}),ke(s,"removeEventListener",function(r){return function(i,o,a){try{const c=o.__sentry_wrapped__;c&&r.call(this,i,c,a)}catch{}return r.call(this,i,o,a)}}))}function uw(t){return typeof t.handleEvent=="function"}function dw(t,e,n){t&&typeof t=="object"&&"removeEventListener"in t&&typeof t.removeEventListener=="function"&&t.removeEventListener(e,n)}const hw=()=>({name:"BrowserSession",setupOnce(){if(typeof Z.document>"u"){Gi&&b.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");return}bu({ignoreDuration:!0}),Su(),pf(({from:t,to:e})=>{t!==void 0&&t!==e&&(bu({ignoreDuration:!0}),Su())})}}),fw="GlobalHandlers",pw=((t={})=>{const e={onerror:!0,onunhandledrejection:!0,...t};return{name:fw,setupOnce(){Error.stackTraceLimit=50},setup(n){e.onerror&&(mw(n),Wu("onerror")),e.onunhandledrejection&&(_w(n),Wu("onunhandledrejection"))}}}),gw=pw;function mw(t){t_(e=>{const{stackParser:n,attachStacktrace:s}=mf();if(ye()!==t||hf())return;const{msg:r,url:i,line:o,column:a,error:c}=e,l=vw(mc(n,c||r,void 0,s,!1),i,o,a);l.level="error",qh(l,{originalException:c,mechanism:{handled:!1,type:"auto.browser.global_handlers.onerror"}})})}function _w(t){s_(e=>{const{stackParser:n,attachStacktrace:s}=mf();if(ye()!==t||hf())return;const r=yw(e),i=Wi(r)?Ew(r):mc(n,r,void 0,s,!0);i.level="error",qh(i,{originalException:r,mechanism:{handled:!1,type:"auto.browser.global_handlers.onunhandledrejection"}})})}function yw(t){if(Wi(t))return t;try{if("reason"in t)return t.reason;if("detail"in t&&"reason"in t.detail)return t.detail.reason}catch{}return t}function Ew(t){return{exception:{values:[{type:"UnhandledRejection",value:`Non-Error promise rejection captured with value: ${String(t)}`}]}}}function vw(t,e,n,s){const r=t.exception=t.exception||{},i=r.values=r.values||[],o=i[0]=i[0]||{},a=o.stacktrace=o.stacktrace||{},c=a.frames=a.frames||[],l=s,u=n,d=ww(e)??cc();return c.length===0&&c.push({colno:l,filename:d,function:fn,in_app:!0,lineno:u}),t}function Wu(t){Gi&&b.log(`Global Handler attached: ${t}`)}function mf(){return ye()?.getOptions()||{stackParser:()=>[],attachStacktrace:!1}}function ww(t){if(!(!ft(t)||t.length===0)){if(t.startsWith("data:")){const e=t.match(/^data:([^;]+)/),n=e?e[1]:"text/javascript",s=t.includes("base64,");return`<data:${n}${s?",base64":""}>`}return t}}const bw=()=>({name:"HttpContext",preprocessEvent(t){if(!Z.navigator&&!Z.location&&!Z.document)return;const e=sv(),n={...e.headers,...t.request?.headers};t.request={...e,...t.request,headers:n}}}),Sw="cause",Cw=5,Tw="LinkedErrors",Iw=((t={})=>{const e=t.limit||Cw,n=t.key||Sw;return{name:Tw,preprocessEvent(s,r,i){const o=i.getOptions();UE(pc,o.stackParser,n,e,s,r)}}}),kw=Iw;function Rw(){return Aw()?(Gi&&cs(()=>{console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/")}),!0):!1}function Aw(){if(typeof Z.window>"u")return!1;const t=Z;if(t.nw||!(t.chrome||t.browser)?.runtime?.id)return!1;const n=cc(),s=["chrome-extension","moz-extension","ms-browser-extension","safari-web-extension"];return!(Z===Z.top&&s.some(i=>n.startsWith(`${i}://`)))}function Pw(t){return[PE(),IE(),ow(),Kv(),gw(),kw(),jE(),bw(),hw()]}function Nw(t={}){const e=!t.skipBrowserExtensionCheck&&Rw();let n=t.defaultIntegrations==null?Pw():t.defaultIntegrations;const s={...t,enabled:e?!1:t.enabled,stackParser:Zm(t.stackParser||Gv),integrations:Ky({integrations:t.integrations,defaultIntegrations:n}),transport:t.transport||Lv};return hE(gv,s)}const Lw="https://adc1b5518c6a55273a1398d1b8b9cd3e@o4510415124496384.ingest.de.sentry.io/4510415129083984";Nw({dsn:Lw,sendDefaultPii:!0});/**
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
 */const Ow=()=>{};var Vu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _f={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g=function(t,e){if(!t)throw ds(e)},ds=function(t){return new Error("Firebase Database ("+_f.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yf=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Dw=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},qi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,u=i>>2,d=(i&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),s.push(n[u],n[d],n[h],n[f])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(yf(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Dw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const l=r<t.length?n[t.charAt(r)]:64;++r;const d=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||d==null)throw new Mw;const h=i<<2|a>>4;if(s.push(h),l!==64){const f=a<<4&240|l>>2;if(s.push(f),d!==64){const p=l<<6&192|d;s.push(p)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Mw extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ef=function(t){const e=yf(t);return qi.encodeByteArray(e,!0)},ai=function(t){return Ef(t).replace(/\./g,"")},ci=function(t){try{return qi.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xw(t){return vf(void 0,t)}function vf(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!Fw(n)||(t[n]=vf(t[n],e[n]));return t}function Fw(t){return t!=="__proto__"}/**
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
 */function wf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Uw=()=>wf().__FIREBASE_DEFAULTS__,$w=()=>{if(typeof process>"u"||typeof Vu>"u")return;const t=Vu.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Bw=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ci(t[1]);return e&&JSON.parse(e)},_c=()=>{try{return Ow()||Uw()||$w()||Bw()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},bf=t=>_c()?.emulatorHosts?.[t],Hw=t=>{const e=bf(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},Sf=()=>_c()?.config,Cf=t=>_c()?.[`_${t}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function hs(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Tf(t){return(await fetch(t,{credentials:"include"})).ok}/**
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
 */function Ww(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...t};return[ai(JSON.stringify(n)),ai(JSON.stringify(o)),""].join(".")}const Fs={};function Vw(){const t={prod:[],emulator:[]};for(const e of Object.keys(Fs))Fs[e]?t.emulator.push(e):t.prod.push(e);return t}function jw(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let ju=!1;function If(t,e){if(typeof window>"u"||typeof document>"u"||!hs(window.location.host)||Fs[t]===e||Fs[t]||ju)return;Fs[t]=e;function n(h){return`__firebase__banner__${h}`}const s="__firebase__banner",i=Vw().prod.length>0;function o(){const h=document.getElementById(s);h&&h.remove()}function a(h){h.style.display="flex",h.style.background="#7faaf0",h.style.position="fixed",h.style.bottom="5px",h.style.left="5px",h.style.padding=".5em",h.style.borderRadius="5px",h.style.alignItems="center"}function c(h,f){h.setAttribute("width","24"),h.setAttribute("id",f),h.setAttribute("height","24"),h.setAttribute("viewBox","0 0 24 24"),h.setAttribute("fill","none"),h.style.marginLeft="-6px"}function l(){const h=document.createElement("span");return h.style.cursor="pointer",h.style.marginLeft="16px",h.style.fontSize="24px",h.innerHTML=" &times;",h.onclick=()=>{ju=!0,o()},h}function u(h,f){h.setAttribute("id",f),h.innerText="Learn more",h.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",h.setAttribute("target","__blank"),h.style.paddingLeft="5px",h.style.textDecoration="underline"}function d(){const h=jw(s),f=n("text"),p=document.getElementById(f)||document.createElement("span"),y=n("learnmore"),m=document.getElementById(y)||document.createElement("a"),T=n("preprendIcon"),B=document.getElementById(T)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(h.created){const j=h.element;a(j),u(m,y);const w=l();c(B,T),j.append(B,p,m,w),document.body.appendChild(j)}i?(p.innerText="Preview backend disconnected.",B.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
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
 */function _e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function yc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_e())}function zw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function kf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function qw(){const t=_e();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Yw(){return _f.NODE_ADMIN===!0}function Ec(){try{return typeof indexedDB=="object"}catch{return!1}}function Kw(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{e(r.error?.message||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jw="FirebaseError";class Kt extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Jw,Object.setPrototypeOf(this,Kt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fs.prototype.create)}}class fs{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Xw(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new Kt(r,a,s)}}function Xw(t,e){return t.replace(Qw,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const Qw=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t){return JSON.parse(t)}function ne(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf=function(t){let e={},n={},s={},r="";try{const i=t.split(".");e=er(ci(i[0])||""),n=er(ci(i[1])||""),r=i[2],s=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:s,signature:r}},Zw=function(t){const e=Rf(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},eb=function(t){const e=Rf(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Xn(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function li(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ui(t,e,n){const s={};for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&(s[r]=e.call(n,t[r],r,t));return s}function mn(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(zu(i)&&zu(o)){if(!mn(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function zu(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const s=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)s[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)s[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const h=s[d-3]^s[d-8]^s[d-14]^s[d-16];s[d]=(h<<1|h>>>31)&4294967295}let r=this.chain_[0],i=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^i&(o^a),u=1518500249):(l=i^o^a,u=1859775393):d<60?(l=i&o|a&(i|o),u=2400959708):(l=i^o^a,u=3395469782);const h=(r<<5|r>>>27)+l+c+u+s[d]&4294967295;c=a,a=o,o=(i<<30|i>>>2)&4294967295,i=r,r=h}this.chain_[0]=this.chain_[0]+r&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const s=n-this.blockSize;let r=0;const i=this.buf_;let o=this.inbuf_;for(;r<n;){if(o===0)for(;r<=s;)this.compress_(e,r),r+=this.blockSize;if(typeof e=="string"){for(;r<n;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<n;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let r=this.blockSize-1;r>=56;r--)this.buf_[r]=n&255,n/=256;this.compress_(this.buf_);let s=0;for(let r=0;r<5;r++)for(let i=24;i>=0;i-=8)e[s]=this.chain_[r]>>i&255,++s;return e}}function nb(t,e){const n=new sb(t,e);return n.subscribe.bind(n)}class sb{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");rb(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Lo),r.error===void 0&&(r.error=Lo),r.complete===void 0&&(r.complete=Lo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function rb(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Lo(){}function Qn(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ib=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);if(r>=55296&&r<=56319){const i=r-55296;s++,g(s<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(s)-56320;r=65536+(i<<10)+o}r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):r<65536?(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Yi=function(t){let e=0;for(let n=0;n<t.length;n++){const s=t.charCodeAt(n);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ob=1e3,ab=2,cb=14400*1e3,lb=.5;function ub(t,e=ob,n=ab){const s=e*Math.pow(n,t),r=Math.round(lb*s*(Math.random()-.5)*2);return Math.min(cb,s+r)}/**
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
 */function ce(t){return t&&t._delegate?t._delegate:t}class Et{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new Ee;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e?.identifier),s=e?.optional??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(fb(e))try{this.getOrInitializeService({instanceIdentifier:tn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=tn){return this.instances.has(e)}getOptions(e=tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){const s=this.normalizeInstanceIdentifier(n),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:hb(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=tn){return this.component?this.component.multipleInstances?e:tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function hb(t){return t===tn?void 0:t}function fb(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new db(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(O||(O={}));const gb={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},mb=O.INFO,_b={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},yb=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=_b[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ki{constructor(e){this.name=e,this._logLevel=mb,this._logHandler=yb,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?gb[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const Eb=(t,e)=>e.some(n=>t instanceof n);let Gu,qu;function vb(){return Gu||(Gu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function wb(){return qu||(qu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Af=new WeakMap,ya=new WeakMap,Pf=new WeakMap,Oo=new WeakMap,vc=new WeakMap;function bb(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Mt(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Af.set(n,t)}).catch(()=>{}),vc.set(e,t),e}function Sb(t){if(ya.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});ya.set(t,e)}let Ea={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return ya.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Pf.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Mt(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Cb(t){Ea=t(Ea)}function Tb(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Do(this),e,...n);return Pf.set(s,e.sort?e.sort():[e]),Mt(s)}:wb().includes(t)?function(...e){return t.apply(Do(this),e),Mt(Af.get(this))}:function(...e){return Mt(t.apply(Do(this),e))}}function Ib(t){return typeof t=="function"?Tb(t):(t instanceof IDBTransaction&&Sb(t),Eb(t,vb())?new Proxy(t,Ea):t)}function Mt(t){if(t instanceof IDBRequest)return bb(t);if(Oo.has(t))return Oo.get(t);const e=Ib(t);return e!==t&&(Oo.set(t,e),vc.set(e,t)),e}const Do=t=>vc.get(t);function kb(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Mt(o);return s&&o.addEventListener("upgradeneeded",c=>{s(Mt(o.result),c.oldVersion,c.newVersion,Mt(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Rb=["get","getKey","getAll","getAllKeys","count"],Ab=["put","add","delete","clear"],Mo=new Map;function Yu(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Mo.get(e))return Mo.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=Ab.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Rb.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return Mo.set(e,i),i}Cb(t=>({...t,get:(e,n,s)=>Yu(e,n)||t.get(e,n,s),has:(e,n)=>!!Yu(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pb{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Nb(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function Nb(t){return t.getComponent()?.type==="VERSION"}const va="@firebase/app",Ku="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt=new Ki("@firebase/app"),Lb="@firebase/app-compat",Ob="@firebase/analytics-compat",Db="@firebase/analytics",Mb="@firebase/app-check-compat",xb="@firebase/app-check",Fb="@firebase/auth",Ub="@firebase/auth-compat",$b="@firebase/database",Bb="@firebase/data-connect",Hb="@firebase/database-compat",Wb="@firebase/functions",Vb="@firebase/functions-compat",jb="@firebase/installations",zb="@firebase/installations-compat",Gb="@firebase/messaging",qb="@firebase/messaging-compat",Yb="@firebase/performance",Kb="@firebase/performance-compat",Jb="@firebase/remote-config",Xb="@firebase/remote-config-compat",Qb="@firebase/storage",Zb="@firebase/storage-compat",eS="@firebase/firestore",tS="@firebase/ai",nS="@firebase/firestore-compat",sS="firebase",rS="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa="[DEFAULT]",iS={[va]:"fire-core",[Lb]:"fire-core-compat",[Db]:"fire-analytics",[Ob]:"fire-analytics-compat",[xb]:"fire-app-check",[Mb]:"fire-app-check-compat",[Fb]:"fire-auth",[Ub]:"fire-auth-compat",[$b]:"fire-rtdb",[Bb]:"fire-data-connect",[Hb]:"fire-rtdb-compat",[Wb]:"fire-fn",[Vb]:"fire-fn-compat",[jb]:"fire-iid",[zb]:"fire-iid-compat",[Gb]:"fire-fcm",[qb]:"fire-fcm-compat",[Yb]:"fire-perf",[Kb]:"fire-perf-compat",[Jb]:"fire-rc",[Xb]:"fire-rc-compat",[Qb]:"fire-gcs",[Zb]:"fire-gcs-compat",[eS]:"fire-fst",[nS]:"fire-fst-compat",[tS]:"fire-vertex","fire-js":"fire-js",[sS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di=new Map,oS=new Map,ba=new Map;function Ju(t,e){try{t.container.addComponent(e)}catch(n){vt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Wt(t){const e=t.name;if(ba.has(e))return vt.debug(`There were multiple attempts to register component ${e}.`),!1;ba.set(e,t);for(const n of di.values())Ju(n,t);for(const n of oS.values())Ju(n,t);return!0}function vr(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ue(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},xt=new fs("app","Firebase",aS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cS{constructor(e,n,s){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new Et("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw xt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs=rS;function Nf(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s={name:wa,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw xt.create("bad-app-name",{appName:String(r)});if(n||(n=Sf()),!n)throw xt.create("no-options");const i=di.get(r);if(i){if(mn(n,i.options)&&mn(s,i.config))return i;throw xt.create("duplicate-app",{appName:r})}const o=new pb(r);for(const c of ba.values())o.addComponent(c);const a=new cS(n,s,o);return di.set(r,a),a}function wc(t=wa){const e=di.get(t);if(!e&&t===wa&&Sf())return Nf();if(!e)throw xt.create("no-app",{appName:t});return e}function gt(t,e,n){let s=iS[t]??t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),vt.warn(o.join(" "));return}Wt(new Et(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const lS="firebase-heartbeat-database",uS=1,tr="firebase-heartbeat-store";let xo=null;function Lf(){return xo||(xo=kb(lS,uS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(tr)}catch(n){console.warn(n)}}}}).catch(t=>{throw xt.create("idb-open",{originalErrorMessage:t.message})})),xo}async function dS(t){try{const n=(await Lf()).transaction(tr),s=await n.objectStore(tr).get(Of(t));return await n.done,s}catch(e){if(e instanceof Kt)vt.warn(e.message);else{const n=xt.create("idb-get",{originalErrorMessage:e?.message});vt.warn(n.message)}}}async function Xu(t,e){try{const s=(await Lf()).transaction(tr,"readwrite");await s.objectStore(tr).put(e,Of(t)),await s.done}catch(n){if(n instanceof Kt)vt.warn(n.message);else{const s=xt.create("idb-set",{originalErrorMessage:n?.message});vt.warn(s.message)}}}function Of(t){return`${t.name}!${t.options.appId}`}/**
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
 */const hS=1024,fS=30;class pS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new mS(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Qu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats.length>fS){const r=_S(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(r,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){vt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Qu(),{heartbeatsToSend:n,unsentEntries:s}=gS(this._heartbeatsCache.heartbeats),r=ai(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(e){return vt.warn(e),""}}}function Qu(){return new Date().toISOString().substring(0,10)}function gS(t,e=hS){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Zu(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Zu(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class mS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ec()?Kw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await dS(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Xu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Xu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Zu(t){return ai(JSON.stringify({version:2,heartbeats:t})).length}function _S(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let s=1;s<t.length;s++)t[s].date<n&&(n=t[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yS(t){Wt(new Et("platform-logger",e=>new Pb(e),"PRIVATE")),Wt(new Et("heartbeat",e=>new pS(e),"PRIVATE")),gt(va,Ku,t),gt(va,Ku,"esm2020"),gt("fire-js","")}yS("");var ed={};const td="@firebase/database",nd="1.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Df="";function Mf(t){Df=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ES{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ne(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:er(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return st(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new ES(e)}}catch{}return new vS},an=xf("localStorage"),wS=xf("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=new Ki("@firebase/database"),bS=(function(){let t=1;return function(){return t++}})(),Ff=function(t){const e=ib(t),n=new tb;n.update(e);const s=n.digest();return qi.encodeByteArray(s)},wr=function(...t){let e="";for(let n=0;n<t.length;n++){const s=t[n];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=wr.apply(null,s):typeof s=="object"?e+=ne(s):e+=s,e+=" "}return e};let Us=null,sd=!0;const SS=function(t,e){g(!0,"Can't turn on custom loggers persistently."),xn.logLevel=O.VERBOSE,Us=xn.log.bind(xn)},oe=function(...t){if(sd===!0&&(sd=!1,Us===null&&wS.get("logging_enabled")===!0&&SS()),Us){const e=wr.apply(null,t);Us(e)}},br=function(t){return function(...e){oe(t,...e)}},Sa=function(...t){const e="FIREBASE INTERNAL ERROR: "+wr(...t);xn.error(e)},wt=function(...t){const e=`FIREBASE FATAL ERROR: ${wr(...t)}`;throw xn.error(e),new Error(e)},me=function(...t){const e="FIREBASE WARNING: "+wr(...t);xn.warn(e)},CS=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&me("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Ji=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},TS=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Zn="[MIN_NAME]",_n="[MAX_NAME]",kn=function(t,e){if(t===e)return 0;if(t===Zn||e===_n)return-1;if(e===Zn||t===_n)return 1;{const n=rd(t),s=rd(e);return n!==null?s!==null?n-s===0?t.length-e.length:n-s:-1:s!==null?1:t<e?-1:1}},IS=function(t,e){return t===e?0:t<e?-1:1},ks=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ne(e))},bc=function(t){if(typeof t!="object"||t===null)return ne(t);const e=[];for(const s in t)e.push(s);e.sort();let n="{";for(let s=0;s<e.length;s++)s!==0&&(n+=","),n+=ne(e[s]),n+=":",n+=bc(t[e[s]]);return n+="}",n},Uf=function(t,e){const n=t.length;if(n<=e)return[t];const s=[];for(let r=0;r<n;r+=e)r+e>n?s.push(t.substring(r,n)):s.push(t.substring(r,r+e));return s};function ae(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const $f=function(t){g(!Ji(t),"Invalid JSON number");const e=11,n=52,s=(1<<e-1)-1;let r,i,o,a,c;t===0?(i=0,o=0,r=1/t===-1/0?1:0):(r=t<0,t=Math.abs(t),t>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),s),i=a+s,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-s-n))));const l=[];for(c=n;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(i%2?1:0),i=Math.floor(i/2);l.push(r?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},kS=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},RS=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function AS(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const s=new Error(t+" at "+e._path.toString()+": "+n);return s.code=t.toUpperCase(),s}const PS=new RegExp("^-?(0*)\\d{1,10}$"),NS=-2147483648,LS=2147483647,rd=function(t){if(PS.test(t)){const e=Number(t);if(e>=NS&&e<=LS)return e}return null},ms=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw me("Exception was thrown by user callback.",n),e},Math.floor(0))}},OS=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},$s=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class DS{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,Ue(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n?.getImmediate({optional:!0}),this.appCheck||n?.get().then(s=>this.appCheck=s)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){me(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class MS{constructor(e,n,s){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(r=>this.auth_=r)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(oe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,s):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',me(e)}}class Kr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Kr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc="5",Bf="v",Hf="s",Wf="r",Vf="f",jf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,zf="ls",Gf="p",Ca="ac",qf="websocket",Yf="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e,n,s,r,i=!1,o="",a=!1,c=!1,l=null){this.secure=n,this.namespace=s,this.webSocketOnly=r,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=an.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&an.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function xS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function Jf(t,e,n){g(typeof e=="string","typeof type must == string"),g(typeof n=="object","typeof params must == object");let s;if(e===qf)s=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===Yf)s=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);xS(t)&&(n.ns=t.namespace);const r=[];return ae(n,(i,o)=>{r.push(i+"="+o)}),s+r.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS{constructor(){this.counters_={}}incrementCounter(e,n=1){st(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return xw(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo={},Uo={};function Cc(t){const e=t.toString();return Fo[e]||(Fo[e]=new FS),Fo[e]}function US(t,e){const n=t.toString();return Uo[n]||(Uo[n]=e()),Uo[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $S{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let r=0;r<s.length;++r)s[r]&&ms(()=>{this.onMessage_(s[r])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="start",BS="close",HS="pLPCommand",WS="pRTLPCB",Xf="id",Qf="pw",Zf="ser",VS="cb",jS="seg",zS="ts",GS="d",qS="dframe",ep=1870,tp=30,YS=ep-tp,KS=25e3,JS=3e4;class On{constructor(e,n,s,r,i,o,a){this.connId=e,this.repoInfo=n,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=br(e),this.stats_=Cc(n),this.urlFn=c=>(this.appCheckToken&&(c[Ca]=this.appCheckToken),Jf(n,Yf,c))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new $S(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(JS)),TS(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Tc((...i)=>{const[o,a,c,l,u]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===id)this.id=a,this.password=c;else if(o===BS)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,a]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[id]="t",s[Zf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[VS]=this.scriptTagHolder.uniqueCallbackIdentifier),s[Bf]=Sc,this.transportSessionId&&(s[Hf]=this.transportSessionId),this.lastSessionId&&(s[zf]=this.lastSessionId),this.applicationId&&(s[Gf]=this.applicationId),this.appCheckToken&&(s[Ca]=this.appCheckToken),typeof location<"u"&&location.hostname&&jf.test(location.hostname)&&(s[Wf]=Vf);const r=this.urlFn(s);this.log_("Connecting via long-poll to "+r),this.scriptTagHolder.addTag(r,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){On.forceAllow_=!0}static forceDisallow(){On.forceDisallow_=!0}static isAvailable(){return On.forceAllow_?!0:!On.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!kS()&&!RS()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Ef(n),r=Uf(s,YS);for(let i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const s={};s[qS]="t",s[Xf]=e,s[Qf]=n,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ne(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Tc{constructor(e,n,s,r){this.onDisconnect=s,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=bS(),window[HS+this.uniqueCallbackIdentifier]=e,window[WS+this.uniqueCallbackIdentifier]=n,this.myIFrame=Tc.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){oe("frame writing exception"),a.stack&&oe(a.stack),oe(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||oe("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Xf]=this.myID,e[Qf]=this.myPW,e[Zf]=this.currentSerial;let n=this.urlFn(e),s="",r=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+tp+s.length<=ep;){const o=this.pendingSegs.shift();s=s+"&"+jS+r+"="+o.seg+"&"+zS+r+"="+o.ts+"&"+GS+r+"="+o.d,r++}return n=n+s,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,s){this.pendingSegs.push({seg:e,ts:n,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const s=()=>{this.outstandingRequests.delete(n),this.newRequest_()},r=setTimeout(s,Math.floor(KS)),i=()=>{clearTimeout(r),s()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const r=s.readyState;(!r||r==="loaded"||r==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),n())},s.onerror=()=>{oe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XS=16384,QS=45e3;let hi=null;typeof MozWebSocket<"u"?hi=MozWebSocket:typeof WebSocket<"u"&&(hi=WebSocket);class $e{constructor(e,n,s,r,i,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=r,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=br(this.connId),this.stats_=Cc(n),this.connURL=$e.connectionURL_(n,o,a,r,s),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,s,r,i){const o={};return o[Bf]=Sc,typeof location<"u"&&location.hostname&&jf.test(location.hostname)&&(o[Wf]=Vf),n&&(o[Hf]=n),s&&(o[zf]=s),r&&(o[Ca]=r),i&&(o[Gf]=i),Jf(e,qf,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,an.set("previous_websocket_failure",!0);try{let s;Yw(),this.mySock=new hi(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const r=s.message||s.data;r&&this.log_(r),this.onClosed_()}}start(){}static forceDisallow(){$e.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(n);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&hi!==null&&!$e.forceDisallow_}static previouslyFailed(){return an.isInMemoryStorage||an.get("previous_websocket_failure")===!0}markConnectionHealthy(){an.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const s=er(n);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const s=this.extractFrameCount_(n);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const n=ne(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const s=Uf(n,XS);s.length>1&&this.sendString_(String(s.length));for(let r=0;r<s.length;r++)this.sendString_(s[r])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(QS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}$e.responsesRequiredToBeHealthy=2;$e.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nr{static get ALL_TRANSPORTS(){return[On,$e]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=$e&&$e.isAvailable();let s=n&&!$e.previouslyFailed();if(e.webSocketOnly&&(n||me("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[$e];else{const r=this.transports_=[];for(const i of nr.ALL_TRANSPORTS)i&&i.isAvailable()&&r.push(i);nr.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}nr.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZS=6e4,eC=5e3,tC=10*1024,nC=100*1024,$o="t",od="d",sC="s",ad="r",rC="e",cd="o",ld="a",ud="n",dd="p",iC="h";class oC{constructor(e,n,s,r,i,o,a,c,l,u){this.id=e,this.repoInfo_=n,this.applicationId_=s,this.appCheckToken_=r,this.authToken_=i,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=br("c:"+this.id+":"),this.transportManager_=new nr(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,s)},Math.floor(0));const r=e.healthyTimeout||0;r>0&&(this.healthyTimeout_=$s(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>nC?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>tC?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(r)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if($o in e){const n=e[$o];n===ld?this.upgradeIfSecondaryHealthy_():n===ad?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===cd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ks("t",e),s=ks("d",e);if(n==="c")this.onSecondaryControl_(s);else if(n==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:dd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ld,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:ud,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ks("t",e),s=ks("d",e);n==="c"?this.onControl_(s):n==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ks($o,e);if(od in e){const s=e[od];if(n===iC){const r={...s};this.repoInfo_.isUsingEmulator&&(r.h=this.repoInfo_.host),this.onHandshake_(r)}else if(n===ud){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===sC?this.onConnectionShutdown_(s):n===ad?this.onReset_(s):n===rC?Sa("Server Error: "+s):n===cd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Sa("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,s=e.v,r=e.h;this.sessionId=e.s,this.repoInfo_.host=r,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Sc!==s&&me("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,s),$s(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ZS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):$s(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(eC))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:dd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(an.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{put(e,n,s,r){}merge(e,n,s,r){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,s){}onDisconnectMerge(e,n,s){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let r=0;r<s.length;r++)s[r].callback.apply(s[r].context,n)}}on(e,n,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:s});const r=this.getInitialEvent(e);r&&n.apply(s,r)}off(e,n,s){this.validateEventType_(e);const r=this.listeners_[e]||[];for(let i=0;i<r.length;i++)if(r[i].callback===n&&(!s||s===r[i].context)){r.splice(i,1);return}}validateEventType_(e){g(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi extends sp{static getInstance(){return new fi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!yc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd=32,fd=768;class L{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let s=0;for(let r=0;r<this.pieces_.length;r++)this.pieces_[r].length>0&&(this.pieces_[s]=this.pieces_[r],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function P(){return new L("")}function I(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function Vt(t){return t.pieces_.length-t.pieceNum_}function x(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new L(t.pieces_,e)}function Ic(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function aC(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function sr(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function rp(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new L(e,0)}function Y(t,e){const n=[];for(let s=t.pieceNum_;s<t.pieces_.length;s++)n.push(t.pieces_[s]);if(e instanceof L)for(let s=e.pieceNum_;s<e.pieces_.length;s++)n.push(e.pieces_[s]);else{const s=e.split("/");for(let r=0;r<s.length;r++)s[r].length>0&&n.push(s[r])}return new L(n,0)}function k(t){return t.pieceNum_>=t.pieces_.length}function ge(t,e){const n=I(t),s=I(e);if(n===null)return e;if(n===s)return ge(x(t),x(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function cC(t,e){const n=sr(t,0),s=sr(e,0);for(let r=0;r<n.length&&r<s.length;r++){const i=kn(n[r],s[r]);if(i!==0)return i}return n.length===s.length?0:n.length<s.length?-1:1}function kc(t,e){if(Vt(t)!==Vt(e))return!1;for(let n=t.pieceNum_,s=e.pieceNum_;n<=t.pieces_.length;n++,s++)if(t.pieces_[n]!==e.pieces_[s])return!1;return!0}function Ne(t,e){let n=t.pieceNum_,s=e.pieceNum_;if(Vt(t)>Vt(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[s])return!1;++n,++s}return!0}class lC{constructor(e,n){this.errorPrefix_=n,this.parts_=sr(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Yi(this.parts_[s]);ip(this)}}function uC(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Yi(e),ip(t)}function dC(t){const e=t.parts_.pop();t.byteLength_-=Yi(e),t.parts_.length>0&&(t.byteLength_-=1)}function ip(t){if(t.byteLength_>fd)throw new Error(t.errorPrefix_+"has a key path longer than "+fd+" bytes ("+t.byteLength_+").");if(t.parts_.length>hd)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+hd+") or object contains a cycle "+nn(t))}function nn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc extends sp{static getInstance(){return new Rc}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=1e3,hC=300*1e3,pd=30*1e3,fC=1.3,pC=3e4,gC="server_kill",gd=3;class mt extends np{constructor(e,n,s,r,i,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=s,this.onConnectStatus_=r,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=mt.nextPersistentConnectionId_++,this.log_=br("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Rs,this.maxReconnectDelay_=hC,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Rc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&fi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,s){const r=++this.requestNumber_,i={r,a:e,b:n};this.log_(ne(i)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),s&&(this.requestCBHash_[r]=s)}get(e){this.initConnection_();const n=new Ee,r={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(r),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,s,r){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const a={onComplete:r,hashFn:n,query:e,tag:s};this.listens.get(o).set(i,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(s)})}sendListen_(e){const n=e.query,s=n._path.toString(),r=n._queryIdentifier;this.log_("Listen on "+s+" for "+r);const i={p:s},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,a=>{const c=a.d,l=a.s;mt.warnOnListenWarnings_(c,n),(this.listens.get(s)&&this.listens.get(s).get(r))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(s,r),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&st(e,"w")){const s=Xn(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const r='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();me(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${r} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||eb(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=pd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Zw(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(n,s,r=>{const i=r.s,o=r.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,s=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,s)})}unlisten(e,n){const s=e._path.toString(),r=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+r),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,r)&&this.connected_&&this.sendUnlisten_(s,r,e._queryObject,n)}sendUnlisten_(e,n,s,r){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";r&&(i.q=s,i.t=r),this.sendRequest(o,i)}onDisconnectPut(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:s})}onDisconnectMerge(e,n,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:s})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,s,r){const i={p:n,d:s};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{r&&setTimeout(()=>{r(o.s,o.d)},Math.floor(0))})}put(e,n,s,r){this.putInternal("p",e,n,s,r)}merge(e,n,s,r){this.putInternal("m",e,n,s,r)}putInternal(e,n,s,r,i){this.initConnection_();const o={p:n,d:s};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:r}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,r=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,s,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),r&&r(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,s=>{if(s.s!=="ok"){const i=s.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ne(e));const n=e.r,s=this.requestCBHash_[n];s&&(delete this.requestCBHash_[n],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Sa("Unrecognized action received from server: "+ne(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Rs,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Rs,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>pC&&(this.reconnectDelay_=Rs),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*fC)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),r=this.id+":"+mt.nextConnectionId_++,i=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,s())},l=function(d){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?oe("getToken() completed but was canceled"):(oe("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new oC(r,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,s,f=>{me(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(gC)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&me(d),c())}}}interrupt(e){oe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){oe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],li(this.interruptReasons_)&&(this.reconnectDelay_=Rs,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let s;n?s=n.map(i=>bc(i)).join("$"):s="default";const r=this.removeListen_(e,s);r&&r.onComplete&&r.onComplete("permission_denied")}removeListen_(e,n){const s=new L(e).toString();let r;if(this.listens.has(s)){const i=this.listens.get(s);r=i.get(n),i.delete(n),i.size===0&&this.listens.delete(s)}else r=void 0;return r}onAuthRevoked_(e,n){oe("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=gd&&(this.reconnectDelay_=pd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){oe("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=gd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+Df.replace(/\./g,"-")]=1,yc()?e["framework.cordova"]=1:kf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=fi.getInstance().currentlyOnline();return li(this.interruptReasons_)&&e}}mt.nextPersistentConnectionId_=0;mt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new R(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const s=new R(Zn,e),r=new R(Zn,n);return this.compare(s,r)!==0}minPost(){return R.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fr;class op extends Xi{static get __EMPTY_NODE(){return Fr}static set __EMPTY_NODE(e){Fr=e}compare(e,n){return kn(e.name,n.name)}isDefinedOn(e){throw ds("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return R.MIN}maxPost(){return new R(_n,Fr)}makePost(e,n){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new R(e,Fr)}toString(){return".key"}}const Fn=new op;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,n,s,r,i=null){this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?s(e.key,n):1,r&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ie{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??ie.RED,this.left=r??ve.EMPTY_NODE,this.right=i??ve.EMPTY_NODE}copy(e,n,s,r,i){return new ie(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return i<0?r=r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r=r.copy(null,n,null,null,null):r=r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp_()}removeMin_(){if(this.left.isEmpty())return ve.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let s,r;if(s=this,n(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),n(e,s.key)===0){if(s.right.isEmpty())return ve.EMPTY_NODE;r=s.right.min_(),s=s.copy(r.key,r.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ie.RED=!0;ie.BLACK=!1;class mC{copy(e,n,s,r,i){return this}insert(e,n,s){return new ie(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ve{constructor(e,n=ve.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new ve(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,ie.BLACK,null,null))}remove(e){return new ve(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ie.BLACK,null,null))}get(e){let n,s=this.root_;for(;!s.isEmpty();){if(n=this.comparator_(e,s.key),n===0)return s.value;n<0?s=s.left:n>0&&(s=s.right)}return null}getPredecessorKey(e){let n,s=this.root_,r=null;for(;!s.isEmpty();)if(n=this.comparator_(e,s.key),n===0){if(s.left.isEmpty())return r?r.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else n<0?s=s.left:n>0&&(r=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ur(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Ur(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Ur(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Ur(this.root_,null,this.comparator_,!0,e)}}ve.EMPTY_NODE=new mC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _C(t,e){return kn(t.name,e.name)}function Ac(t,e){return kn(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ta;function yC(t){Ta=t}const ap=function(t){return typeof t=="number"?"number:"+$f(t):"string:"+t},cp=function(t){if(t.isLeafNode()){const e=t.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&st(e,".sv"),"Priority must be a string or number.")}else g(t===Ta||t.isEmpty(),"priority of unexpected type.");g(t===Ta||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let md;class re{static set __childrenNodeConstructor(e){md=e}static get __childrenNodeConstructor(){return md}constructor(e,n=re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),cp(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return k(e)?this:I(e)===".priority"?this.priorityNode_:re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const s=I(e);return s===null?n:n.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||Vt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,re.__childrenNodeConstructor.EMPTY_NODE.updateChild(x(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+ap(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=$f(this.value_):e+=this.value_,this.lazyHash_=Ff(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof re.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,s=typeof this.value_,r=re.VALUE_TYPE_ORDER.indexOf(n),i=re.VALUE_TYPE_ORDER.indexOf(s);return g(r>=0,"Unknown leaf type: "+n),g(i>=0,"Unknown leaf type: "+s),r===i?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-r}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lp,up;function EC(t){lp=t}function vC(t){up=t}class wC extends Xi{compare(e,n){const s=e.node.getPriority(),r=n.node.getPriority(),i=s.compareTo(r);return i===0?kn(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return R.MIN}maxPost(){return new R(_n,new re("[PRIORITY-POST]",up))}makePost(e,n){const s=lp(e);return new R(n,new re("[PRIORITY-POST]",s))}toString(){return".priority"}}const K=new wC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bC=Math.log(2);class SC{constructor(e){const n=i=>parseInt(Math.log(i)/bC,10),s=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const r=s(this.count);this.bits_=e+1&r}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const pi=function(t,e,n,s){t.sort(e);const r=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=t[c],h=n?n(d):d,new ie(h,d.node,ie.BLACK,null,null);{const f=parseInt(u/2,10)+c,p=r(c,f),y=r(f+1,l);return d=t[f],h=n?n(d):d,new ie(h,d.node,ie.BLACK,p,y)}},i=function(c){let l=null,u=null,d=t.length;const h=function(p,y){const m=d-p,T=d;d-=p;const B=r(m+1,T),j=t[m],w=n?n(j):j;f(new ie(w,j.node,y,null,B))},f=function(p){l?(l.left=p,l=p):(u=p,l=p)};for(let p=0;p<c.count;++p){const y=c.nextBitIsOne(),m=Math.pow(2,c.count-(p+1));y?h(m,ie.BLACK):(h(m,ie.BLACK),h(m,ie.RED))}return u},o=new SC(t.length),a=i(o);return new ve(s||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bo;const Pn={};class at{static get Default(){return g(Pn&&K,"ChildrenNode.ts has not been loaded"),Bo=Bo||new at({".priority":Pn},{".priority":K}),Bo}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=Xn(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof ve?n:null}hasIndex(e){return st(this.indexSet_,e.toString())}addIndex(e,n){g(e!==Fn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let r=!1;const i=n.getIterator(R.Wrap);let o=i.getNext();for(;o;)r=r||e.isDefinedOn(o.node),s.push(o),o=i.getNext();let a;r?a=pi(s,e.getCompare()):a=Pn;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new at(u,l)}addToIndexes(e,n){const s=ui(this.indexes_,(r,i)=>{const o=Xn(this.indexSet_,i);if(g(o,"Missing index implementation for "+i),r===Pn)if(o.isDefinedOn(e.node)){const a=[],c=n.getIterator(R.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),pi(a,o.getCompare())}else return Pn;else{const a=n.get(e.name);let c=r;return a&&(c=c.remove(new R(e.name,a))),c.insert(e,e.node)}});return new at(s,this.indexSet_)}removeFromIndexes(e,n){const s=ui(this.indexes_,r=>{if(r===Pn)return r;{const i=n.get(e.name);return i?r.remove(new R(e.name,i)):r}});return new at(s,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let As;class v{static get EMPTY_NODE(){return As||(As=new v(new ve(Ac),null,at.Default))}constructor(e,n,s){this.children_=e,this.priorityNode_=n,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&cp(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||As}updatePriority(e){return this.children_.isEmpty()?this:new v(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?As:n}}getChild(e){const n=I(e);return n===null?this:this.getImmediateChild(n).getChild(x(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(g(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const s=new R(e,n);let r,i;n.isEmpty()?(r=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(s,this.children_)):(r=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(s,this.children_));const o=r.isEmpty()?As:this.priorityNode_;return new v(r,o,i)}}updateChild(e,n){const s=I(e);if(s===null)return n;{g(I(e)!==".priority"||Vt(e)===1,".priority must be the last token in a path");const r=this.getImmediateChild(s).updateChild(x(e),n);return this.updateImmediateChild(s,r)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let s=0,r=0,i=!0;if(this.forEachChild(K,(o,a)=>{n[o]=a.val(e),s++,i&&v.INTEGER_REGEXP_.test(o)?r=Math.max(r,Number(o)):i=!1}),!e&&i&&r<2*s){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+ap(this.getPriority().val())+":"),this.forEachChild(K,(n,s)=>{const r=s.hash();r!==""&&(e+=":"+n+":"+r)}),this.lazyHash_=e===""?"":Ff(e)}return this.lazyHash_}getPredecessorChildName(e,n,s){const r=this.resolveIndex_(s);if(r){const i=r.getPredecessorKey(new R(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new R(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const s=n.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new R(n,this.children_.get(n)):null}forEachChild(e,n){const s=this.resolveIndex_(e);return s?s.inorderTraversal(r=>n(r.name,r.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getIteratorFrom(e,r=>r);{const r=this.children_.getIteratorFrom(e.name,R.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)<0;)r.getNext(),i=r.peek();return r}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const s=this.resolveIndex_(n);if(s)return s.getReverseIteratorFrom(e,r=>r);{const r=this.children_.getReverseIteratorFrom(e.name,R.Wrap);let i=r.peek();for(;i!=null&&n.compare(i,e)>0;)r.getNext(),i=r.peek();return r}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Sr?-1:0}withIndex(e){if(e===Fn||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new v(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Fn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const s=this.getIterator(K),r=n.getIterator(K);let i=s.getNext(),o=r.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=s.getNext(),o=r.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Fn?null:this.indexMap_.get(e.toString())}}v.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class CC extends v{constructor(){super(new ve(Ac),v.EMPTY_NODE,at.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return v.EMPTY_NODE}isEmpty(){return!1}}const Sr=new CC;Object.defineProperties(R,{MIN:{value:new R(Zn,v.EMPTY_NODE)},MAX:{value:new R(_n,Sr)}});op.__EMPTY_NODE=v.EMPTY_NODE;re.__childrenNodeConstructor=v;yC(Sr);vC(Sr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TC=!0;function J(t,e=null){if(t===null)return v.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new re(n,J(e))}if(!(t instanceof Array)&&TC){const n=[];let s=!1;if(ae(t,(o,a)=>{if(o.substring(0,1)!=="."){const c=J(a);c.isEmpty()||(s=s||!c.getPriority().isEmpty(),n.push(new R(o,c)))}}),n.length===0)return v.EMPTY_NODE;const i=pi(n,_C,o=>o.name,Ac);if(s){const o=pi(n,K.getCompare());return new v(i,J(e),new at({".priority":o},{".priority":K}))}else return new v(i,J(e),at.Default)}else{let n=v.EMPTY_NODE;return ae(t,(s,r)=>{if(st(t,s)&&s.substring(0,1)!=="."){const i=J(r);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(s,i))}}),n.updatePriority(J(e))}}EC(J);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC extends Xi{constructor(e){super(),this.indexPath_=e,g(!k(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const s=this.extractChild(e.node),r=this.extractChild(n.node),i=s.compareTo(r);return i===0?kn(e.name,n.name):i}makePost(e,n){const s=J(e),r=v.EMPTY_NODE.updateChild(this.indexPath_,s);return new R(n,r)}maxPost(){const e=v.EMPTY_NODE.updateChild(this.indexPath_,Sr);return new R(_n,e)}toString(){return sr(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kC extends Xi{compare(e,n){const s=e.node.compareTo(n.node);return s===0?kn(e.name,n.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return R.MIN}maxPost(){return R.MAX}makePost(e,n){const s=J(e);return new R(n,s)}toString(){return".value"}}const RC=new kC;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(t){return{type:"value",snapshotNode:t}}function es(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function rr(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function ir(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function AC(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pc{constructor(e){this.index_=e}updateChild(e,n,s,r,i,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(r).equals(s.getChild(r))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(n)?o.trackChildChange(rr(n,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(es(n,s)):o.trackChildChange(ir(n,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(n,s).withIndex(this.index_)}updateFullNode(e,n,s){return s!=null&&(e.isLeafNode()||e.forEachChild(K,(r,i)=>{n.hasChild(r)||s.trackChildChange(rr(r,i))}),n.isLeafNode()||n.forEachChild(K,(r,i)=>{if(e.hasChild(r)){const o=e.getImmediateChild(r);o.equals(i)||s.trackChildChange(ir(r,i,o))}else s.trackChildChange(es(r,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?v.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e){this.indexedFilter_=new Pc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=or.getStartPost_(e),this.endPost_=or.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&s}updateChild(e,n,s,r,i,o){return this.matches(new R(n,s))||(s=v.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,s,r,i,o)}updateFullNode(e,n,s){n.isLeafNode()&&(n=v.EMPTY_NODE);let r=n.withIndex(this.index_);r=r.updatePriority(v.EMPTY_NODE);const i=this;return n.forEachChild(K,(o,a)=>{i.matches(new R(o,a))||(r=r.updateImmediateChild(o,v.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PC{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=n=>{const s=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new or(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,s,r,i,o){return this.rangedFilter_.matches(new R(n,s))||(s=v.EMPTY_NODE),e.getImmediateChild(n).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,s,r,i,o):this.fullLimitUpdateChild_(e,n,s,i,o)}updateFullNode(e,n,s){let r;if(n.isLeafNode()||n.isEmpty())r=v.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){r=v.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const a=i.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))r=r.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{r=n.withIndex(this.index_),r=r.updatePriority(v.EMPTY_NODE);let i;this.reverse_?i=r.getReverseIterator(this.index_):i=r.getIterator(this.index_);let o=0;for(;i.hasNext();){const a=i.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:r=r.updateImmediateChild(a.name,v.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,r,s)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,s,r,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const c=new R(n,s),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(n)){const d=a.getImmediateChild(n);let h=r.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===n||a.hasChild(h.name));)h=r.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!s.isEmpty()&&f>=0)return i?.trackChildChange(ir(n,s,d)),a.updateImmediateChild(n,s);{i?.trackChildChange(rr(n,d));const y=a.updateImmediateChild(n,v.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(i?.trackChildChange(es(h.name,h.node)),y.updateImmediateChild(h.name,h.node)):y}}else return s.isEmpty()?e:u&&o(l,c)>=0?(i!=null&&(i.trackChildChange(rr(l.name,l.node)),i.trackChildChange(es(n,s))),a.updateImmediateChild(n,s).updateImmediateChild(l.name,v.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=K}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Zn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:_n}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===K}copy(){const e=new Qi;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function NC(t){return t.loadsAllData()?new Pc(t.getIndex()):t.hasLimit()?new PC(t):new or(t)}function _d(t){const e={};if(t.isDefault())return e;let n;if(t.index_===K?n="$priority":t.index_===RC?n="$value":t.index_===Fn?n="$key":(g(t.index_ instanceof IC,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ne(n),t.startSet_){const s=t.startAfterSet_?"startAfter":"startAt";e[s]=ne(t.indexStartValue_),t.startNameSet_&&(e[s]+=","+ne(t.indexStartName_))}if(t.endSet_){const s=t.endBeforeSet_?"endBefore":"endAt";e[s]=ne(t.indexEndValue_),t.endNameSet_&&(e[s]+=","+ne(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function yd(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==K&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi extends np{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,s,r){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=s,this.appCheckTokenProvider_=r,this.log_=br("p:rest:"),this.listens_={}}listen(e,n,s,r){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=gi.getListenId_(e,s),a={};this.listens_[o]=a;const c=_d(e._queryParams);this.restRequest_(i+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(i,d,!1,s),Xn(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",r(h,null)}})}unlisten(e,n){const s=gi.getListenId_(e,n);delete this.listens_[s]}get(e){const n=_d(e._queryParams),s=e._path.toString(),r=new Ee;return this.restRequest_(s+".json",n,(i,o)=>{let a=o;i===404&&(a=null,i=null),i===null?(this.onDataUpdate_(s,a,!1,null),r.resolve(a)):r.reject(new Error(a))}),r.promise}refreshAuthToken(e){}restRequest_(e,n={},s){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([r,i])=>{r&&r.accessToken&&(n.auth=r.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ps(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=er(a.responseText)}catch{me("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,c)}else a.status!==401&&a.status!==404&&me("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(){this.rootNode_=v.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(){return{value:null,children:new Map}}function _s(t,e,n){if(k(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const s=I(e);t.children.has(s)||t.children.set(s,mi());const r=t.children.get(s);e=x(e),_s(r,e,n)}}function Ia(t,e){if(k(e))return t.value=null,t.children.clear(),!0;if(t.value!==null){if(t.value.isLeafNode())return!1;{const n=t.value;return t.value=null,n.forEachChild(K,(s,r)=>{_s(t,new L(s),r)}),Ia(t,e)}}else if(t.children.size>0){const n=I(e);return e=x(e),t.children.has(n)&&Ia(t.children.get(n),e)&&t.children.delete(n),t.children.size===0}else return!0}function ka(t,e,n){t.value!==null?n(e,t.value):OC(t,(s,r)=>{const i=new L(e.toString()+"/"+s);ka(r,i,n)})}function OC(t,e){t.children.forEach((n,s)=>{e(s,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DC{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&ae(this.last_,(s,r)=>{n[s]=n[s]-r}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ed=10*1e3,MC=30*1e3,xC=300*1e3;class FC{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new DC(e);const s=Ed+(MC-Ed)*Math.random();$s(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),n={};let s=!1;ae(e,(r,i)=>{i>0&&st(this.statsToReport_,r)&&(n[r]=i,s=!0)}),s&&this.server_.reportStats(n),$s(this.reportStats_.bind(this),Math.floor(Math.random()*2*xC))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Be;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Be||(Be={}));function Nc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Lc(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Oc(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,n,s){this.path=e,this.affectedTree=n,this.revert=s,this.type=Be.ACK_USER_WRITE,this.source=Nc()}operationForChild(e){if(k(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new L(e));return new _i(P(),n,this.revert)}}else return g(I(this.path)===e,"operationForChild called for unrelated child."),new _i(x(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(e,n){this.source=e,this.path=n,this.type=Be.LISTEN_COMPLETE}operationForChild(e){return k(this.path)?new ar(this.source,P()):new ar(this.source,x(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,n,s){this.source=e,this.path=n,this.snap=s,this.type=Be.OVERWRITE}operationForChild(e){return k(this.path)?new yn(this.source,P(),this.snap.getImmediateChild(e)):new yn(this.source,x(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e,n,s){this.source=e,this.path=n,this.children=s,this.type=Be.MERGE}operationForChild(e){if(k(this.path)){const n=this.children.subtree(new L(e));return n.isEmpty()?null:n.value?new yn(this.source,P(),n.value):new ts(this.source,P(),n)}else return g(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ts(this.source,x(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jt{constructor(e,n,s){this.node_=e,this.fullyInitialized_=n,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(k(e))return this.isFullyInitialized()&&!this.filtered_;const n=I(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UC{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function $C(t,e,n,s){const r=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(AC(o.childName,o.snapshotNode))}),Ps(t,r,"child_removed",e,s,n),Ps(t,r,"child_added",e,s,n),Ps(t,r,"child_moved",i,s,n),Ps(t,r,"child_changed",e,s,n),Ps(t,r,"value",e,s,n),r}function Ps(t,e,n,s,r,i){const o=s.filter(a=>a.type===n);o.sort((a,c)=>HC(t,a,c)),o.forEach(a=>{const c=BC(t,a,i);r.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,t.query_))})})}function BC(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function HC(t,e,n){if(e.childName==null||n.childName==null)throw ds("Should only compare child_ events.");const s=new R(e.childName,e.snapshotNode),r=new R(n.childName,n.snapshotNode);return t.index_.compare(s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(t,e){return{eventCache:t,serverCache:e}}function Bs(t,e,n,s){return Zi(new jt(e,n,s),t.serverCache)}function hp(t,e,n,s){return Zi(t.eventCache,new jt(e,n,s))}function yi(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function En(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ho;const WC=()=>(Ho||(Ho=new ve(IS)),Ho);class U{static fromObject(e){let n=new U(null);return ae(e,(s,r)=>{n=n.set(new L(s),r)}),n}constructor(e,n=WC()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:P(),value:this.value};if(k(e))return null;{const s=I(e),r=this.children.get(s);if(r!==null){const i=r.findRootMostMatchingPathAndValue(x(e),n);return i!=null?{path:Y(new L(s),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(k(e))return this;{const n=I(e),s=this.children.get(n);return s!==null?s.subtree(x(e)):new U(null)}}set(e,n){if(k(e))return new U(n,this.children);{const s=I(e),i=(this.children.get(s)||new U(null)).set(x(e),n),o=this.children.insert(s,i);return new U(this.value,o)}}remove(e){if(k(e))return this.children.isEmpty()?new U(null):new U(null,this.children);{const n=I(e),s=this.children.get(n);if(s){const r=s.remove(x(e));let i;return r.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,r),this.value===null&&i.isEmpty()?new U(null):new U(this.value,i)}else return this}}get(e){if(k(e))return this.value;{const n=I(e),s=this.children.get(n);return s?s.get(x(e)):null}}setTree(e,n){if(k(e))return n;{const s=I(e),i=(this.children.get(s)||new U(null)).setTree(x(e),n);let o;return i.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,i),new U(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,n){const s={};return this.children.inorderTraversal((r,i)=>{s[r]=i.fold_(Y(e,r),n)}),n(e,this.value,s)}findOnPath(e,n){return this.findOnPath_(e,P(),n)}findOnPath_(e,n,s){const r=this.value?s(n,this.value):!1;if(r)return r;if(k(e))return null;{const i=I(e),o=this.children.get(i);return o?o.findOnPath_(x(e),Y(n,i),s):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,P(),n)}foreachOnPath_(e,n,s){if(k(e))return this;{this.value&&s(n,this.value);const r=I(e),i=this.children.get(r);return i?i.foreachOnPath_(x(e),Y(n,r),s):new U(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,n){this.children.inorderTraversal((s,r)=>{r.foreach_(Y(e,s),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,s)=>{s.value&&e(n,s.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this.writeTree_=e}static empty(){return new je(new U(null))}}function Hs(t,e,n){if(k(e))return new je(new U(n));{const s=t.writeTree_.findRootMostValueAndPath(e);if(s!=null){const r=s.path;let i=s.value;const o=ge(r,e);return i=i.updateChild(o,n),new je(t.writeTree_.set(r,i))}else{const r=new U(n),i=t.writeTree_.setTree(e,r);return new je(i)}}}function Ra(t,e,n){let s=t;return ae(n,(r,i)=>{s=Hs(s,Y(e,r),i)}),s}function vd(t,e){if(k(e))return je.empty();{const n=t.writeTree_.setTree(e,new U(null));return new je(n)}}function Aa(t,e){return Rn(t,e)!=null}function Rn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(ge(n.path,e)):null}function wd(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(K,(s,r)=>{e.push(new R(s,r))}):t.writeTree_.children.inorderTraversal((s,r)=>{r.value!=null&&e.push(new R(s,r.value))}),e}function Ft(t,e){if(k(e))return t;{const n=Rn(t,e);return n!=null?new je(new U(n)):new je(t.writeTree_.subtree(e))}}function Pa(t){return t.writeTree_.isEmpty()}function ns(t,e){return fp(P(),t.writeTree_,e)}function fp(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let s=null;return e.children.inorderTraversal((r,i)=>{r===".priority"?(g(i.value!==null,"Priority writes must always be leaf nodes"),s=i.value):n=fp(Y(t,r),i,n)}),!n.getChild(t).isEmpty()&&s!==null&&(n=n.updateChild(Y(t,".priority"),s)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(t,e){return _p(e,t)}function VC(t,e,n,s,r){g(s>t.lastWriteId,"Stacking an older write on top of newer ones"),r===void 0&&(r=!0),t.allWrites.push({path:e,snap:n,writeId:s,visible:r}),r&&(t.visibleWrites=Hs(t.visibleWrites,e,n)),t.lastWriteId=s}function jC(t,e,n,s){g(s>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:s,visible:!0}),t.visibleWrites=Ra(t.visibleWrites,e,n),t.lastWriteId=s}function zC(t,e){for(let n=0;n<t.allWrites.length;n++){const s=t.allWrites[n];if(s.writeId===e)return s}return null}function GC(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);g(n>=0,"removeWrite called with nonexistent writeId.");const s=t.allWrites[n];t.allWrites.splice(n,1);let r=s.visible,i=!1,o=t.allWrites.length-1;for(;r&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&qC(a,s.path)?r=!1:Ne(s.path,a.path)&&(i=!0)),o--}if(r){if(i)return YC(t),!0;if(s.snap)t.visibleWrites=vd(t.visibleWrites,s.path);else{const a=s.children;ae(a,c=>{t.visibleWrites=vd(t.visibleWrites,Y(s.path,c))})}return!0}else return!1}function qC(t,e){if(t.snap)return Ne(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&Ne(Y(t.path,n),e))return!0;return!1}function YC(t){t.visibleWrites=pp(t.allWrites,KC,P()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function KC(t){return t.visible}function pp(t,e,n){let s=je.empty();for(let r=0;r<t.length;++r){const i=t[r];if(e(i)){const o=i.path;let a;if(i.snap)Ne(n,o)?(a=ge(n,o),s=Hs(s,a,i.snap)):Ne(o,n)&&(a=ge(o,n),s=Hs(s,P(),i.snap.getChild(a)));else if(i.children){if(Ne(n,o))a=ge(n,o),s=Ra(s,a,i.children);else if(Ne(o,n))if(a=ge(o,n),k(a))s=Ra(s,P(),i.children);else{const c=Xn(i.children,I(a));if(c){const l=c.getChild(x(a));s=Hs(s,P(),l)}}}else throw ds("WriteRecord should have .snap or .children")}}return s}function gp(t,e,n,s,r){if(!s&&!r){const i=Rn(t.visibleWrites,e);if(i!=null)return i;{const o=Ft(t.visibleWrites,e);if(Pa(o))return n;if(n==null&&!Aa(o,P()))return null;{const a=n||v.EMPTY_NODE;return ns(o,a)}}}else{const i=Ft(t.visibleWrites,e);if(!r&&Pa(i))return n;if(!r&&n==null&&!Aa(i,P()))return null;{const o=function(l){return(l.visible||r)&&(!s||!~s.indexOf(l.writeId))&&(Ne(l.path,e)||Ne(e,l.path))},a=pp(t.allWrites,o,e),c=n||v.EMPTY_NODE;return ns(a,c)}}}function JC(t,e,n){let s=v.EMPTY_NODE;const r=Rn(t.visibleWrites,e);if(r)return r.isLeafNode()||r.forEachChild(K,(i,o)=>{s=s.updateImmediateChild(i,o)}),s;if(n){const i=Ft(t.visibleWrites,e);return n.forEachChild(K,(o,a)=>{const c=ns(Ft(i,new L(o)),a);s=s.updateImmediateChild(o,c)}),wd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const i=Ft(t.visibleWrites,e);return wd(i).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function XC(t,e,n,s,r){g(s||r,"Either existingEventSnap or existingServerSnap must exist");const i=Y(e,n);if(Aa(t.visibleWrites,i))return null;{const o=Ft(t.visibleWrites,i);return Pa(o)?r.getChild(n):ns(o,r.getChild(n))}}function QC(t,e,n,s){const r=Y(e,n),i=Rn(t.visibleWrites,r);if(i!=null)return i;if(s.isCompleteForChild(n)){const o=Ft(t.visibleWrites,r);return ns(o,s.getNode().getImmediateChild(n))}else return null}function ZC(t,e){return Rn(t.visibleWrites,e)}function eT(t,e,n,s,r,i,o){let a;const c=Ft(t.visibleWrites,e),l=Rn(c,P());if(l!=null)a=l;else if(n!=null)a=ns(c,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=i?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=h.getNext();for(;f&&u.length<r;)d(f,s)!==0&&u.push(f),f=h.getNext();return u}else return[]}function tT(){return{visibleWrites:je.empty(),allWrites:[],lastWriteId:-1}}function Ei(t,e,n,s){return gp(t.writeTree,t.treePath,e,n,s)}function Dc(t,e){return JC(t.writeTree,t.treePath,e)}function bd(t,e,n,s){return XC(t.writeTree,t.treePath,e,n,s)}function vi(t,e){return ZC(t.writeTree,Y(t.treePath,e))}function nT(t,e,n,s,r,i){return eT(t.writeTree,t.treePath,e,n,s,r,i)}function Mc(t,e,n){return QC(t.writeTree,t.treePath,e,n)}function mp(t,e){return _p(Y(t.treePath,e),t.writeTree)}function _p(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,s=e.childName;g(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const r=this.changeMap.get(s);if(r){const i=r.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(s,ir(s,e.snapshotNode,r.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(s);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(s,rr(s,r.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(s,es(s,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(s,ir(s,e.snapshotNode,r.oldSnap));else throw ds("Illegal combination of changes: "+e+" occurred after "+r)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{getCompleteChild(e){return null}getChildAfterChild(e,n,s){return null}}const yp=new rT;class xc{constructor(e,n,s=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=s}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new jt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Mc(this.writes_,e,s)}}getChildAfterChild(e,n,s){const r=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:En(this.viewCache_),i=nT(this.writes_,r,n,1,s,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iT(t){return{filter:t}}function oT(t,e){g(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function aT(t,e,n,s,r){const i=new sT;let o,a;if(n.type===Be.OVERWRITE){const l=n;l.source.fromUser?o=Na(t,e,l.path,l.snap,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!k(l.path),o=wi(t,e,l.path,l.snap,s,r,a,i))}else if(n.type===Be.MERGE){const l=n;l.source.fromUser?o=lT(t,e,l.path,l.children,s,r,i):(g(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=La(t,e,l.path,l.children,s,r,a,i))}else if(n.type===Be.ACK_USER_WRITE){const l=n;l.revert?o=hT(t,e,l.path,s,r,i):o=uT(t,e,l.path,l.affectedTree,s,r,i)}else if(n.type===Be.LISTEN_COMPLETE)o=dT(t,e,n.path,s,i);else throw ds("Unknown operation type: "+n.type);const c=i.getChanges();return cT(e,o,c),{viewCache:o,changes:c}}function cT(t,e,n){const s=e.eventCache;if(s.isFullyInitialized()){const r=s.getNode().isLeafNode()||s.getNode().isEmpty(),i=yi(t);(n.length>0||!t.eventCache.isFullyInitialized()||r&&!s.getNode().equals(i)||!s.getNode().getPriority().equals(i.getPriority()))&&n.push(dp(yi(e)))}}function Ep(t,e,n,s,r,i){const o=e.eventCache;if(vi(s,n)!=null)return e;{let a,c;if(k(n))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=En(e),u=l instanceof v?l:v.EMPTY_NODE,d=Dc(s,u);a=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const l=Ei(s,En(e));a=t.filter.updateFullNode(e.eventCache.getNode(),l,i)}else{const l=I(n);if(l===".priority"){g(Vt(n)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=bd(s,n,u,c);d!=null?a=t.filter.updatePriority(u,d):a=o.getNode()}else{const u=x(n);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=bd(s,n,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Mc(s,l,e.serverCache);d!=null?a=t.filter.updateChild(o.getNode(),l,d,u,r,i):a=o.getNode()}}return Bs(e,a,o.isFullyInitialized()||k(n),t.filter.filtersNodes())}}function wi(t,e,n,s,r,i,o,a){const c=e.serverCache;let l;const u=o?t.filter:t.filter.getIndexedFilter();if(k(n))l=u.updateFullNode(c.getNode(),s,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(n,s);l=u.updateFullNode(c.getNode(),f,null)}else{const f=I(n);if(!c.isCompleteForPath(n)&&Vt(n)>1)return e;const p=x(n),m=c.getNode().getImmediateChild(f).updateChild(p,s);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,p,yp,null)}const d=hp(e,l,c.isFullyInitialized()||k(n),u.filtersNodes()),h=new xc(r,d,i);return Ep(t,d,n,r,h,a)}function Na(t,e,n,s,r,i,o){const a=e.eventCache;let c,l;const u=new xc(r,e,i);if(k(n))l=t.filter.updateFullNode(e.eventCache.getNode(),s,o),c=Bs(e,l,!0,t.filter.filtersNodes());else{const d=I(n);if(d===".priority")l=t.filter.updatePriority(e.eventCache.getNode(),s),c=Bs(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=x(n),f=a.getNode().getImmediateChild(d);let p;if(k(h))p=s;else{const y=u.getCompleteChild(d);y!=null?Ic(h)===".priority"&&y.getChild(rp(h)).isEmpty()?p=y:p=y.updateChild(h,s):p=v.EMPTY_NODE}if(f.equals(p))c=e;else{const y=t.filter.updateChild(a.getNode(),d,p,h,u,o);c=Bs(e,y,a.isFullyInitialized(),t.filter.filtersNodes())}}}return c}function Sd(t,e){return t.eventCache.isCompleteForChild(e)}function lT(t,e,n,s,r,i,o){let a=e;return s.foreach((c,l)=>{const u=Y(n,c);Sd(e,I(u))&&(a=Na(t,a,u,l,r,i,o))}),s.foreach((c,l)=>{const u=Y(n,c);Sd(e,I(u))||(a=Na(t,a,u,l,r,i,o))}),a}function Cd(t,e,n){return n.foreach((s,r)=>{e=e.updateChild(s,r)}),e}function La(t,e,n,s,r,i,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;k(n)?l=s:l=new U(null).setTree(n,s);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),p=Cd(t,f,h);c=wi(t,c,new L(d),p,r,i,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const p=e.serverCache.getNode().getImmediateChild(d),y=Cd(t,p,h);c=wi(t,c,new L(d),y,r,i,o,a)}}),c}function uT(t,e,n,s,r,i,o){if(vi(r,n)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(s.value!=null){if(k(n)&&c.isFullyInitialized()||c.isCompleteForPath(n))return wi(t,e,n,c.getNode().getChild(n),r,i,a,o);if(k(n)){let l=new U(null);return c.getNode().forEachChild(Fn,(u,d)=>{l=l.set(new L(u),d)}),La(t,e,n,l,r,i,a,o)}else return e}else{let l=new U(null);return s.foreach((u,d)=>{const h=Y(n,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),La(t,e,n,l,r,i,a,o)}}function dT(t,e,n,s,r){const i=e.serverCache,o=hp(e,i.getNode(),i.isFullyInitialized()||k(n),i.isFiltered());return Ep(t,o,n,s,yp,r)}function hT(t,e,n,s,r,i){let o;if(vi(s,n)!=null)return e;{const a=new xc(s,e,r),c=e.eventCache.getNode();let l;if(k(n)||I(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Ei(s,En(e));else{const d=e.serverCache.getNode();g(d instanceof v,"serverChildren would be complete if leaf node"),u=Dc(s,d)}u=u,l=t.filter.updateFullNode(c,u,i)}else{const u=I(n);let d=Mc(s,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=t.filter.updateChild(c,u,d,x(n),a,i):e.eventCache.getNode().hasChild(u)?l=t.filter.updateChild(c,u,v.EMPTY_NODE,x(n),a,i):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ei(s,En(e)),o.isLeafNode()&&(l=t.filter.updateFullNode(l,o,i)))}return o=e.serverCache.isFullyInitialized()||vi(s,P())!=null,Bs(e,l,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,r=new Pc(s.getIndex()),i=NC(s);this.processor_=iT(i);const o=n.serverCache,a=n.eventCache,c=r.updateFullNode(v.EMPTY_NODE,o.getNode(),null),l=i.updateFullNode(v.EMPTY_NODE,a.getNode(),null),u=new jt(c,o.isFullyInitialized(),r.filtersNodes()),d=new jt(l,a.isFullyInitialized(),i.filtersNodes());this.viewCache_=Zi(d,u),this.eventGenerator_=new UC(this.query_)}get query(){return this.query_}}function pT(t){return t.viewCache_.serverCache.getNode()}function gT(t){return yi(t.viewCache_)}function mT(t,e){const n=En(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!k(e)&&!n.getImmediateChild(I(e)).isEmpty())?n.getChild(e):null}function Td(t){return t.eventRegistrations_.length===0}function _T(t,e){t.eventRegistrations_.push(e)}function Id(t,e,n){const s=[];if(n){g(e==null,"A cancel should cancel all event registrations.");const r=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,r);o&&s.push(o)})}if(e){let r=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))r.push(o);else if(e.hasAnyCallback()){r=r.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=r}else t.eventRegistrations_=[];return s}function kd(t,e,n,s){e.type===Be.MERGE&&e.source.queryId!==null&&(g(En(t.viewCache_),"We should always have a full cache before handling merges"),g(yi(t.viewCache_),"Missing event cache, even though we have a server cache"));const r=t.viewCache_,i=aT(t.processor_,r,e,n,s);return oT(t.processor_,i.viewCache),g(i.viewCache.serverCache.isFullyInitialized()||!r.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,vp(t,i.changes,i.viewCache.eventCache.getNode(),null)}function yT(t,e){const n=t.viewCache_.eventCache,s=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(K,(i,o)=>{s.push(es(i,o))}),n.isFullyInitialized()&&s.push(dp(n.getNode())),vp(t,s,n.getNode(),e)}function vp(t,e,n,s){const r=s?[s]:t.eventRegistrations_;return $C(t.eventGenerator_,e,n,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bi;class wp{constructor(){this.views=new Map}}function ET(t){g(!bi,"__referenceConstructor has already been defined"),bi=t}function vT(){return g(bi,"Reference.ts has not been loaded"),bi}function wT(t){return t.views.size===0}function Fc(t,e,n,s){const r=e.source.queryId;if(r!==null){const i=t.views.get(r);return g(i!=null,"SyncTree gave us an op for an invalid query."),kd(i,e,n,s)}else{let i=[];for(const o of t.views.values())i=i.concat(kd(o,e,n,s));return i}}function bp(t,e,n,s,r){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let a=Ei(n,r?s:null),c=!1;a?c=!0:s instanceof v?(a=Dc(n,s),c=!1):(a=v.EMPTY_NODE,c=!1);const l=Zi(new jt(a,c,!1),new jt(s,r,!1));return new fT(e,l)}return o}function bT(t,e,n,s,r,i){const o=bp(t,e,s,r,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),_T(o,n),yT(o,n)}function ST(t,e,n,s){const r=e._queryIdentifier,i=[];let o=[];const a=zt(t);if(r==="default")for(const[c,l]of t.views.entries())o=o.concat(Id(l,n,s)),Td(l)&&(t.views.delete(c),l.query._queryParams.loadsAllData()||i.push(l.query));else{const c=t.views.get(r);c&&(o=o.concat(Id(c,n,s)),Td(c)&&(t.views.delete(r),c.query._queryParams.loadsAllData()||i.push(c.query)))}return a&&!zt(t)&&i.push(new(vT())(e._repo,e._path)),{removed:i,events:o}}function Sp(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ut(t,e){let n=null;for(const s of t.views.values())n=n||mT(s,e);return n}function Cp(t,e){if(e._queryParams.loadsAllData())return to(t);{const s=e._queryIdentifier;return t.views.get(s)}}function Tp(t,e){return Cp(t,e)!=null}function zt(t){return to(t)!=null}function to(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Si;function CT(t){g(!Si,"__referenceConstructor has already been defined"),Si=t}function TT(){return g(Si,"Reference.ts has not been loaded"),Si}let IT=1;class Rd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new U(null),this.pendingWriteTree_=tT(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ip(t,e,n,s,r){return VC(t.pendingWriteTree_,e,n,s,r),r?ys(t,new yn(Nc(),e,n)):[]}function kT(t,e,n,s){jC(t.pendingWriteTree_,e,n,s);const r=U.fromObject(n);return ys(t,new ts(Nc(),e,r))}function Pt(t,e,n=!1){const s=zC(t.pendingWriteTree_,e);if(GC(t.pendingWriteTree_,e)){let i=new U(null);return s.snap!=null?i=i.set(P(),!0):ae(s.children,o=>{i=i.set(new L(o),!0)}),ys(t,new _i(s.path,i,n))}else return[]}function Cr(t,e,n){return ys(t,new yn(Lc(),e,n))}function RT(t,e,n){const s=U.fromObject(n);return ys(t,new ts(Lc(),e,s))}function AT(t,e){return ys(t,new ar(Lc(),e))}function PT(t,e,n){const s=$c(t,n);if(s){const r=Bc(s),i=r.path,o=r.queryId,a=ge(i,e),c=new ar(Oc(o),a);return Hc(t,i,c)}else return[]}function Ci(t,e,n,s,r=!1){const i=e._path,o=t.syncPointTree_.get(i);let a=[];if(o&&(e._queryIdentifier==="default"||Tp(o,e))){const c=ST(o,e,n,s);wT(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const l=c.removed;if(a=c.events,!r){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(h,f)=>zt(f));if(u&&!d){const h=t.syncPointTree_.subtree(i);if(!h.isEmpty()){const f=OT(h);for(let p=0;p<f.length;++p){const y=f[p],m=y.query,T=Pp(t,y);t.listenProvider_.startListening(Ws(m),cr(t,m),T.hashFn,T.onComplete)}}}!d&&l.length>0&&!s&&(u?t.listenProvider_.stopListening(Ws(e),null):l.forEach(h=>{const f=t.queryToTagMap.get(no(h));t.listenProvider_.stopListening(Ws(h),f)}))}DT(t,l)}return a}function kp(t,e,n,s){const r=$c(t,s);if(r!=null){const i=Bc(r),o=i.path,a=i.queryId,c=ge(o,e),l=new yn(Oc(a),c,n);return Hc(t,o,l)}else return[]}function NT(t,e,n,s){const r=$c(t,s);if(r){const i=Bc(r),o=i.path,a=i.queryId,c=ge(o,e),l=U.fromObject(n),u=new ts(Oc(a),c,l);return Hc(t,o,u)}else return[]}function Oa(t,e,n,s=!1){const r=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(r,(h,f)=>{const p=ge(h,r);i=i||Ut(f,p),o=o||zt(f)});let a=t.syncPointTree_.get(r);a?(o=o||zt(a),i=i||Ut(a,P())):(a=new wp,t.syncPointTree_=t.syncPointTree_.set(r,a));let c;i!=null?c=!0:(c=!1,i=v.EMPTY_NODE,t.syncPointTree_.subtree(r).foreachChild((f,p)=>{const y=Ut(p,P());y&&(i=i.updateImmediateChild(f,y))}));const l=Tp(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=no(e);g(!t.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=MT();t.queryToTagMap.set(h,f),t.tagToQueryMap.set(f,h)}const u=eo(t.pendingWriteTree_,r);let d=bT(a,e,n,u,i,c);if(!l&&!o&&!s){const h=Cp(a,e);d=d.concat(xT(t,e,h))}return d}function Uc(t,e,n){const r=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,a)=>{const c=ge(o,e),l=Ut(a,c);if(l)return l});return gp(r,e,i,n,!0)}function LT(t,e){const n=e._path;let s=null;t.syncPointTree_.foreachOnPath(n,(l,u)=>{const d=ge(l,n);s=s||Ut(u,d)});let r=t.syncPointTree_.get(n);r?s=s||Ut(r,P()):(r=new wp,t.syncPointTree_=t.syncPointTree_.set(n,r));const i=s!=null,o=i?new jt(s,!0,!1):null,a=eo(t.pendingWriteTree_,e._path),c=bp(r,e,a,i?o.getNode():v.EMPTY_NODE,i);return gT(c)}function ys(t,e){return Rp(e,t.syncPointTree_,null,eo(t.pendingWriteTree_,P()))}function Rp(t,e,n,s){if(k(t.path))return Ap(t,e,n,s);{const r=e.get(P());n==null&&r!=null&&(n=Ut(r,P()));let i=[];const o=I(t.path),a=t.operationForChild(o),c=e.children.get(o);if(c&&a){const l=n?n.getImmediateChild(o):null,u=mp(s,o);i=i.concat(Rp(a,c,l,u))}return r&&(i=i.concat(Fc(r,t,s,n))),i}}function Ap(t,e,n,s){const r=e.get(P());n==null&&r!=null&&(n=Ut(r,P()));let i=[];return e.children.inorderTraversal((o,a)=>{const c=n?n.getImmediateChild(o):null,l=mp(s,o),u=t.operationForChild(o);u&&(i=i.concat(Ap(u,a,c,l)))}),r&&(i=i.concat(Fc(r,t,s,n))),i}function Pp(t,e){const n=e.query,s=cr(t,n);return{hashFn:()=>(pT(e)||v.EMPTY_NODE).hash(),onComplete:r=>{if(r==="ok")return s?PT(t,n._path,s):AT(t,n._path);{const i=AS(r,n);return Ci(t,n,null,i)}}}}function cr(t,e){const n=no(e);return t.queryToTagMap.get(n)}function no(t){return t._path.toString()+"$"+t._queryIdentifier}function $c(t,e){return t.tagToQueryMap.get(e)}function Bc(t){const e=t.indexOf("$");return g(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new L(t.substr(0,e))}}function Hc(t,e,n){const s=t.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const r=eo(t.pendingWriteTree_,e);return Fc(s,n,r,null)}function OT(t){return t.fold((e,n,s)=>{if(n&&zt(n))return[to(n)];{let r=[];return n&&(r=Sp(n)),ae(s,(i,o)=>{r=r.concat(o)}),r}})}function Ws(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(TT())(t._repo,t._path):t}function DT(t,e){for(let n=0;n<e.length;++n){const s=e[n];if(!s._queryParams.loadsAllData()){const r=no(s),i=t.queryToTagMap.get(r);t.queryToTagMap.delete(r),t.tagToQueryMap.delete(i)}}}function MT(){return IT++}function xT(t,e,n){const s=e._path,r=cr(t,e),i=Pp(t,n),o=t.listenProvider_.startListening(Ws(e),r,i.hashFn,i.onComplete),a=t.syncPointTree_.subtree(s);if(r)g(!zt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!k(l)&&u&&zt(u))return[to(u).query];{let h=[];return u&&(h=h.concat(Sp(u).map(f=>f.query))),ae(d,(f,p)=>{h=h.concat(p)}),h}});for(let l=0;l<c.length;++l){const u=c[l];t.listenProvider_.stopListening(Ws(u),cr(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wc{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new Wc(n)}node(){return this.node_}}class Vc{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=Y(this.path_,e);return new Vc(this.syncTree_,n)}node(){return Uc(this.syncTree_,this.path_)}}const FT=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Ad=function(t,e,n){if(!t||typeof t!="object")return t;if(g(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return UT(t[".sv"],e,n);if(typeof t[".sv"]=="object")return $T(t[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},UT=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:g(!1,"Unexpected server value: "+t)}},$T=function(t,e,n){t.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const s=t.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const r=e.node();if(g(r!==null&&typeof r<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!r.isLeafNode())return s;const o=r.getValue();return typeof o!="number"?s:o+s},Np=function(t,e,n,s){return jc(e,new Vc(n,t),s)},Lp=function(t,e,n){return jc(t,new Wc(e),n)};function jc(t,e,n){const s=t.getPriority().val(),r=Ad(s,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,a=Ad(o.getValue(),e,n);return a!==o.getValue()||r!==o.getPriority().val()?new re(a,J(r)):t}else{const o=t;return i=o,r!==o.getPriority().val()&&(i=i.updatePriority(new re(r))),o.forEachChild(K,(a,c)=>{const l=jc(c,e.getImmediateChild(a),n);l!==c&&(i=i.updateImmediateChild(a,l))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e="",n=null,s={children:{},childCount:0}){this.name=e,this.parent=n,this.node=s}}function Gc(t,e){let n=e instanceof L?e:new L(e),s=t,r=I(n);for(;r!==null;){const i=Xn(s.node.children,r)||{children:{},childCount:0};s=new zc(r,s,i),n=x(n),r=I(n)}return s}function Es(t){return t.node.value}function Op(t,e){t.node.value=e,Da(t)}function Dp(t){return t.node.childCount>0}function BT(t){return Es(t)===void 0&&!Dp(t)}function so(t,e){ae(t.node.children,(n,s)=>{e(new zc(n,t,s))})}function Mp(t,e,n,s){n&&e(t),so(t,r=>{Mp(r,e,!0)})}function HT(t,e,n){let s=t.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Tr(t){return new L(t.parent===null?t.name:Tr(t.parent)+"/"+t.name)}function Da(t){t.parent!==null&&WT(t.parent,t.name,t)}function WT(t,e,n){const s=BT(n),r=st(t.node.children,e);s&&r?(delete t.node.children[e],t.node.childCount--,Da(t)):!s&&!r&&(t.node.children[e]=n.node,t.node.childCount++,Da(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VT=/[\[\].#$\/\u0000-\u001F\u007F]/,jT=/[\[\].#$\u0000-\u001F\u007F]/,Wo=10*1024*1024,qc=function(t){return typeof t=="string"&&t.length!==0&&!VT.test(t)},xp=function(t){return typeof t=="string"&&t.length!==0&&!jT.test(t)},zT=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),xp(t)},Fp=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Ji(t)||t&&typeof t=="object"&&st(t,".sv")},Ti=function(t,e,n,s){s&&e===void 0||ro(Qn(t,"value"),e,n)},ro=function(t,e,n){const s=n instanceof L?new lC(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+nn(s));if(typeof e=="function")throw new Error(t+"contains a function "+nn(s)+" with contents = "+e.toString());if(Ji(e))throw new Error(t+"contains "+e.toString()+" "+nn(s));if(typeof e=="string"&&e.length>Wo/3&&Yi(e)>Wo)throw new Error(t+"contains a string greater than "+Wo+" utf8 bytes "+nn(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let r=!1,i=!1;if(ae(e,(o,a)=>{if(o===".value")r=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!qc(o)))throw new Error(t+" contains an invalid key ("+o+") "+nn(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);uC(s,o),ro(t,a,s),dC(s)}),r&&i)throw new Error(t+' contains ".value" child '+nn(s)+" in addition to actual children.")}},GT=function(t,e){let n,s;for(n=0;n<e.length;n++){s=e[n];const i=sr(s);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!qc(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(cC);let r=null;for(n=0;n<e.length;n++){if(s=e[n],r!==null&&Ne(r,s))throw new Error(t+"contains a path "+r.toString()+" that is ancestor of another path "+s.toString());r=s}},Up=function(t,e,n,s){const r=Qn(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(r+" must be an object containing the children to replace.");const i=[];ae(e,(o,a)=>{const c=new L(o);if(ro(r,a,Y(n,c)),Ic(c)===".priority"&&!Fp(a))throw new Error(r+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(c)}),GT(r,i)},qT=function(t,e,n){if(Ji(e))throw new Error(Qn(t,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Fp(e))throw new Error(Qn(t,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Yc=function(t,e,n,s){if(!xp(n))throw new Error(Qn(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},YT=function(t,e,n,s){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Yc(t,e,n)},Nt=function(t,e){if(I(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},KT=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!qc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!zT(n))throw new Error(Qn(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function io(t,e){let n=null;for(let s=0;s<e.length;s++){const r=e[s],i=r.getPath();n!==null&&!kc(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(r)}n&&t.eventLists_.push(n)}function $p(t,e,n){io(t,n),Bp(t,s=>kc(s,e))}function Me(t,e,n){io(t,n),Bp(t,s=>Ne(s,e)||Ne(e,s))}function Bp(t,e){t.recursionDepth_++;let n=!0;for(let s=0;s<t.eventLists_.length;s++){const r=t.eventLists_[s];if(r){const i=r.path;e(i)?(XT(t.eventLists_[s]),t.eventLists_[s]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function XT(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const s=n.getEventRunner();Us&&oe("event: "+n.toString()),ms(s)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT="repo_interrupt",ZT=25;class eI{constructor(e,n,s,r){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=s,this.appCheckProvider_=r,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new JT,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=mi(),this.transactionQueueTree_=new zc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function tI(t,e,n){if(t.stats_=Cc(t.repoInfo_),t.forceRestClient_||OS())t.server_=new gi(t.repoInfo_,(s,r,i,o)=>{Pd(t,s,r,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Nd(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ne(n)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}t.persistentConnection_=new mt(t.repoInfo_,e,(s,r,i,o)=>{Pd(t,s,r,i,o)},s=>{Nd(t,s)},s=>{nI(t,s)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(s=>{t.server_.refreshAuthToken(s)}),t.appCheckProvider_.addTokenChangeListener(s=>{t.server_.refreshAppCheckToken(s.token)}),t.statsReporter_=US(t.repoInfo_,()=>new FC(t.stats_,t.server_)),t.infoData_=new LC,t.infoSyncTree_=new Rd({startListening:(s,r,i,o)=>{let a=[];const c=t.infoData_.getNode(s._path);return c.isEmpty()||(a=Cr(t.infoSyncTree_,s._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Kc(t,"connected",!1),t.serverSyncTree_=new Rd({startListening:(s,r,i,o)=>(t.server_.listen(s,i,r,(a,c)=>{const l=o(a,c);Me(t.eventQueue_,s._path,l)}),[]),stopListening:(s,r)=>{t.server_.unlisten(s,r)}})}function Hp(t){const n=t.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function oo(t){return FT({timestamp:Hp(t)})}function Pd(t,e,n,s,r){t.dataUpdateCount++;const i=new L(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(r)if(s){const c=ui(n,l=>J(l));o=NT(t.serverSyncTree_,i,c,r)}else{const c=J(n);o=kp(t.serverSyncTree_,i,c,r)}else if(s){const c=ui(n,l=>J(l));o=RT(t.serverSyncTree_,i,c)}else{const c=J(n);o=Cr(t.serverSyncTree_,i,c)}let a=i;o.length>0&&(a=ss(t,i)),Me(t.eventQueue_,a,o)}function Nd(t,e){Kc(t,"connected",e),e===!1&&oI(t)}function nI(t,e){ae(e,(n,s)=>{Kc(t,n,s)})}function Kc(t,e,n){const s=new L("/.info/"+e),r=J(n);t.infoData_.updateSnapshot(s,r);const i=Cr(t.infoSyncTree_,s,r);Me(t.eventQueue_,s,i)}function Jc(t){return t.nextWriteId_++}function sI(t,e,n){const s=LT(t.serverSyncTree_,e);return s!=null?Promise.resolve(s):t.server_.get(e).then(r=>{const i=J(r).withIndex(e._queryParams.getIndex());Oa(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Cr(t.serverSyncTree_,e._path,i);else{const a=cr(t.serverSyncTree_,e);o=kp(t.serverSyncTree_,e._path,i,a)}return Me(t.eventQueue_,e._path,o),Ci(t.serverSyncTree_,e,n,null,!0),i},r=>(Ir(t,"get for query "+ne(e)+" failed: "+r),Promise.reject(new Error(r))))}function rI(t,e,n,s,r){Ir(t,"set",{path:e.toString(),value:n,priority:s});const i=oo(t),o=J(n,s),a=Uc(t.serverSyncTree_,e),c=Lp(o,a,i),l=Jc(t),u=Ip(t.serverSyncTree_,e,c,l,!0);io(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(h,f)=>{const p=h==="ok";p||me("set at "+e+" failed: "+h);const y=Pt(t.serverSyncTree_,l,!p);Me(t.eventQueue_,e,y),Gt(t,r,h,f)});const d=Qc(t,e);ss(t,d),Me(t.eventQueue_,d,[])}function iI(t,e,n,s){Ir(t,"update",{path:e.toString(),value:n});let r=!0;const i=oo(t),o={};if(ae(n,(a,c)=>{r=!1,o[a]=Np(Y(e,a),J(c),t.serverSyncTree_,i)}),r)oe("update() called with empty data.  Don't do anything."),Gt(t,s,"ok",void 0);else{const a=Jc(t),c=kT(t.serverSyncTree_,e,o,a);io(t.eventQueue_,c),t.server_.merge(e.toString(),n,(l,u)=>{const d=l==="ok";d||me("update at "+e+" failed: "+l);const h=Pt(t.serverSyncTree_,a,!d),f=h.length>0?ss(t,e):e;Me(t.eventQueue_,f,h),Gt(t,s,l,u)}),ae(n,l=>{const u=Qc(t,Y(e,l));ss(t,u)}),Me(t.eventQueue_,e,[])}}function oI(t){Ir(t,"onDisconnectEvents");const e=oo(t),n=mi();ka(t.onDisconnect_,P(),(r,i)=>{const o=Np(r,i,t.serverSyncTree_,e);_s(n,r,o)});let s=[];ka(n,P(),(r,i)=>{s=s.concat(Cr(t.serverSyncTree_,r,i));const o=Qc(t,r);ss(t,o)}),t.onDisconnect_=mi(),Me(t.eventQueue_,P(),s)}function aI(t,e,n){t.server_.onDisconnectCancel(e.toString(),(s,r)=>{s==="ok"&&Ia(t.onDisconnect_,e),Gt(t,n,s,r)})}function Ld(t,e,n,s){const r=J(n);t.server_.onDisconnectPut(e.toString(),r.val(!0),(i,o)=>{i==="ok"&&_s(t.onDisconnect_,e,r),Gt(t,s,i,o)})}function cI(t,e,n,s,r){const i=J(n,s);t.server_.onDisconnectPut(e.toString(),i.val(!0),(o,a)=>{o==="ok"&&_s(t.onDisconnect_,e,i),Gt(t,r,o,a)})}function lI(t,e,n,s){if(li(n)){oe("onDisconnect().update() called with empty data.  Don't do anything."),Gt(t,s,"ok",void 0);return}t.server_.onDisconnectMerge(e.toString(),n,(r,i)=>{r==="ok"&&ae(n,(o,a)=>{const c=J(a);_s(t.onDisconnect_,Y(e,o),c)}),Gt(t,s,r,i)})}function uI(t,e,n){let s;I(e._path)===".info"?s=Oa(t.infoSyncTree_,e,n):s=Oa(t.serverSyncTree_,e,n),$p(t.eventQueue_,e._path,s)}function Wp(t,e,n){let s;I(e._path)===".info"?s=Ci(t.infoSyncTree_,e,n):s=Ci(t.serverSyncTree_,e,n),$p(t.eventQueue_,e._path,s)}function dI(t){t.persistentConnection_&&t.persistentConnection_.interrupt(QT)}function Ir(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),oe(n,...e)}function Gt(t,e,n,s){e&&ms(()=>{if(n==="ok")e(null);else{const r=(n||"error").toUpperCase();let i=r;s&&(i+=": "+s);const o=new Error(i);o.code=r,e(o)}})}function Vp(t,e,n){return Uc(t.serverSyncTree_,e,n)||v.EMPTY_NODE}function Xc(t,e=t.transactionQueueTree_){if(e||ao(t,e),Es(e)){const n=zp(t,e);g(n.length>0,"Sending zero length transaction queue"),n.every(r=>r.status===0)&&hI(t,Tr(e),n)}else Dp(e)&&so(e,n=>{Xc(t,n)})}function hI(t,e,n){const s=n.map(l=>l.currentWriteId),r=Vp(t,e,s);let i=r;const o=r.hash();for(let l=0;l<n.length;l++){const u=n[l];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=ge(e,u.path);i=i.updateChild(d,u.currentOutputSnapshotRaw)}const a=i.val(!0),c=e;t.server_.put(c.toString(),a,l=>{Ir(t,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<n.length;h++)n[h].status=2,u=u.concat(Pt(t.serverSyncTree_,n[h].currentWriteId)),n[h].onComplete&&d.push(()=>n[h].onComplete(null,!0,n[h].currentOutputSnapshotResolved)),n[h].unwatcher();ao(t,Gc(t.transactionQueueTree_,e)),Xc(t,t.transactionQueueTree_),Me(t.eventQueue_,e,u);for(let h=0;h<d.length;h++)ms(d[h])}else{if(l==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{me("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=l}ss(t,e)}},o)}function ss(t,e){const n=jp(t,e),s=Tr(n),r=zp(t,n);return fI(t,r,s),s}function fI(t,e,n){if(e.length===0)return;const s=[];let r=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=ge(n,c.path);let u=!1,d;if(g(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,r=r.concat(Pt(t.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=ZT)u=!0,d="maxretry",r=r.concat(Pt(t.serverSyncTree_,c.currentWriteId,!0));else{const h=Vp(t,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){ro("transaction failed: Data returned ",f,c.path);let p=J(f);typeof f=="object"&&f!=null&&st(f,".priority")||(p=p.updatePriority(h.getPriority()));const m=c.currentWriteId,T=oo(t),B=Lp(p,h,T);c.currentOutputSnapshotRaw=p,c.currentOutputSnapshotResolved=B,c.currentWriteId=Jc(t),o.splice(o.indexOf(m),1),r=r.concat(Ip(t.serverSyncTree_,c.path,B,c.currentWriteId,c.applyLocally)),r=r.concat(Pt(t.serverSyncTree_,m,!0))}else u=!0,d="nodata",r=r.concat(Pt(t.serverSyncTree_,c.currentWriteId,!0))}Me(t.eventQueue_,n,r),r=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(d),!1,null))))}ao(t,t.transactionQueueTree_);for(let a=0;a<s.length;a++)ms(s[a]);Xc(t,t.transactionQueueTree_)}function jp(t,e){let n,s=t.transactionQueueTree_;for(n=I(e);n!==null&&Es(s)===void 0;)s=Gc(s,n),e=x(e),n=I(e);return s}function zp(t,e){const n=[];return Gp(t,e,n),n.sort((s,r)=>s.order-r.order),n}function Gp(t,e,n){const s=Es(e);if(s)for(let r=0;r<s.length;r++)n.push(s[r]);so(e,r=>{Gp(t,r,n)})}function ao(t,e){const n=Es(e);if(n){let s=0;for(let r=0;r<n.length;r++)n[r].status!==2&&(n[s]=n[r],s++);n.length=s,Op(e,n.length>0?n:void 0)}so(e,s=>{ao(t,s)})}function Qc(t,e){const n=Tr(jp(t,e)),s=Gc(t.transactionQueueTree_,e);return HT(s,r=>{Vo(t,r)}),Vo(t,s),Mp(s,r=>{Vo(t,r)}),n}function Vo(t,e){const n=Es(e);if(n){const s=[];let r=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(g(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(g(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),r=r.concat(Pt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&s.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?Op(e,void 0):n.length=i+1,Me(t.eventQueue_,Tr(e),r);for(let o=0;o<s.length;o++)ms(s[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pI(t){let e="";const n=t.split("/");for(let s=0;s<n.length;s++)if(n[s].length>0){let r=n[s];try{r=decodeURIComponent(r.replace(/\+/g," "))}catch{}e+="/"+r}return e}function gI(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const s=n.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):me(`Invalid query segment '${n}' in query '${t}'`)}return e}const Od=function(t,e){const n=mI(t),s=n.namespace;n.domain==="firebase.com"&&wt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&n.domain!=="localhost"&&wt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||CS();const r=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new Kf(n.host,n.secure,s,r,e,"",s!==n.subdomain),path:new L(n.pathString)}},mI=function(t){let e="",n="",s="",r="",i="",o=!0,a="https",c=443;if(typeof t=="string"){let l=t.indexOf("//");l>=0&&(a=t.substring(0,l-1),t=t.substring(l+2));let u=t.indexOf("/");u===-1&&(u=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(u,d)),u<d&&(r=pI(t.substring(u,d)));const h=gI(t.substring(Math.min(t.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")n="localhost";else if(f.split(".").length<=2)n=f;else{const p=e.indexOf(".");s=e.substring(0,p).toLowerCase(),n=e.substring(p+1),i=s}"ns"in h&&(i=h.ns)}return{host:e,port:c,domain:n,subdomain:s,secure:o,scheme:a,pathString:r,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",_I=(function(){let t=0;const e=[];return function(n){const s=n===t;t=n;let r;const i=new Array(8);for(r=7;r>=0;r--)i[r]=Dd.charAt(n%64),n=Math.floor(n/64);g(n===0,"Cannot push at time == 0");let o=i.join("");if(s){for(r=11;r>=0&&e[r]===63;r--)e[r]=0;e[r]++}else for(r=0;r<12;r++)e[r]=Math.floor(Math.random()*64);for(r=0;r<12;r++)o+=Dd.charAt(e[r]);return g(o.length===20,"nextPushId: Length should be 20."),o}})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{constructor(e,n,s,r){this.eventType=e,this.eventRegistration=n,this.snapshot=s,this.prevName=r}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ne(this.snapshot.exportVal())}}class Yp{constructor(e,n,s){this.eventRegistration=e,this.error=n,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Kp{constructor(e,n){this._repo=e,this._path=n}cancel(){const e=new Ee;return aI(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Nt("OnDisconnect.remove",this._path);const e=new Ee;return Ld(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Nt("OnDisconnect.set",this._path),Ti("OnDisconnect.set",e,this._path,!1);const n=new Ee;return Ld(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}setWithPriority(e,n){Nt("OnDisconnect.setWithPriority",this._path),Ti("OnDisconnect.setWithPriority",e,this._path,!1),qT("OnDisconnect.setWithPriority",n);const s=new Ee;return cI(this._repo,this._path,e,n,s.wrapCallback(()=>{})),s.promise}update(e){Nt("OnDisconnect.update",this._path),Up("OnDisconnect.update",e,this._path);const n=new Ee;return lI(this._repo,this._path,e,n.wrapCallback(()=>{})),n.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co{constructor(e,n,s,r){this._repo=e,this._path=n,this._queryParams=s,this._orderByCalled=r}get key(){return k(this._path)?null:Ic(this._path)}get ref(){return new Ke(this._repo,this._path)}get _queryIdentifier(){const e=yd(this._queryParams),n=bc(e);return n==="{}"?"default":n}get _queryObject(){return yd(this._queryParams)}isEqual(e){if(e=ce(e),!(e instanceof co))return!1;const n=this._repo===e._repo,s=kc(this._path,e._path),r=this._queryIdentifier===e._queryIdentifier;return n&&s&&r}toJSON(){return this.toString()}toString(){return this._repo.toString()+aC(this._path)}}class Ke extends co{constructor(e,n){super(e,n,new Qi,!1)}get parent(){const e=rp(this._path);return e===null?null:new Ke(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class vn{constructor(e,n,s){this._node=e,this.ref=n,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new L(e),s=wn(this.ref,e);return new vn(this._node.getChild(n),s,K)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,r)=>e(new vn(r,wn(this.ref,s),K)))}hasChild(e){const n=new L(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function N(t,e){return t=ce(t),t._checkNotDeleted("ref"),e!==void 0?wn(t._root,e):t._root}function wn(t,e){return t=ce(t),I(t._path)===null?YT("child","path",e):Yc("child","path",e),new Ke(t._repo,Y(t._path,e))}function Jp(t){return t=ce(t),new Kp(t._repo,t._path)}function Ii(t,e){t=ce(t),Nt("push",t._path),Ti("push",e,t._path,!0);const n=Hp(t._repo),s=_I(n),r=wn(t,s),i=wn(t,s);let o;return o=Promise.resolve(i),r.then=o.then.bind(o),r.catch=o.then.bind(o,void 0),r}function bn(t){return Nt("remove",t._path),Ae(t,null)}function Ae(t,e){t=ce(t),Nt("set",t._path),Ti("set",e,t._path,!1);const n=new Ee;return rI(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function un(t,e){Up("update",e,t._path);const n=new Ee;return iI(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function Ze(t){t=ce(t);const e=new Zc(()=>{}),n=new kr(e);return sI(t._repo,t,n).then(s=>new vn(s,new Ke(t._repo,t._path),t._queryParams.getIndex()))}class kr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const s=n._queryParams.getIndex();return new qp("value",this,new vn(e.snapshotNode,new Ke(n._repo,n._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Yp(this,e,n):null}matches(e){return e instanceof kr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class lo{constructor(e,n){this.eventType=e,this.callbackContext=n}respondsTo(e){let n=e==="children_added"?"child_added":e;return n=n==="children_removed"?"child_removed":n,this.eventType===n}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Yp(this,e,n):null}createEvent(e,n){g(e.childName!=null,"Child events should have a childName.");const s=wn(new Ke(n._repo,n._path),e.childName),r=n._queryParams.getIndex();return new qp(e.type,this,new vn(e.snapshotNode,s,r),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof lo?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function uo(t,e,n,s,r){const i=new Zc(n,void 0),o=e==="value"?new kr(i):new lo(e,i);return uI(t._repo,t,o),()=>Wp(t._repo,t,o)}function el(t,e,n,s){return uo(t,"value",e)}function ki(t,e,n,s){return uo(t,"child_added",e)}function Xp(t,e,n,s){return uo(t,"child_changed",e)}function Qp(t,e,n,s){return uo(t,"child_removed",e)}function _t(t,e,n){let s=null;const r=n?new Zc(n):null;e==="value"?s=new kr(r):e&&(s=new lo(e,r)),Wp(t._repo,t,s)}ET(Ke);CT(Ke);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI="FIREBASE_DATABASE_EMULATOR_HOST",Ma={};let EI=!1;function vI(t,e,n,s){const r=e.lastIndexOf(":"),i=e.substring(0,r),o=hs(i);t.repoInfo_=new Kf(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),s&&(t.authTokenProvider_=s)}function Zp(t,e,n,s,r){let i=s||t.options.databaseURL;i===void 0&&(t.options.projectId||wt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),oe("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Od(i,r),a=o.repoInfo,c;typeof process<"u"&&ed&&(c=ed[yI]),c?(i=`http://${c}?ns=${a.namespace}`,o=Od(i,r),a=o.repoInfo):o.repoInfo.secure;const l=new MS(t.name,t.options,e);KT("Invalid Firebase Database URL",o),k(o.path)||wt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=bI(a,t,l,new DS(t,n));return new eg(u,t)}function wI(t,e){const n=Ma[e];(!n||n[t.key]!==t)&&wt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),dI(t),delete n[t.key]}function bI(t,e,n,s){let r=Ma[e.name];r||(r={},Ma[e.name]=r);let i=r[t.toURLString()];return i&&wt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new eI(t,EI,n,s),r[t.toURLString()]=i,i}class eg{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(tI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ke(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(wI(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&wt("Cannot call "+e+" on a deleted database.")}}function tg(t=wc(),e){const n=vr(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const s=Hw("database");s&&ng(n,...s)}return n}function ng(t,e,n,s={}){t=ce(t),t._checkNotDeleted("useEmulator");const r=`${e}:${n}`,i=t._repoInternal;if(t._instanceStarted){if(r===t._repoInternal.repoInfo_.host&&mn(s,i.repoInfo_.emulatorOptions))return;wt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&wt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Kr(Kr.OWNER);else if(s.mockUserToken){const a=typeof s.mockUserToken=="string"?s.mockUserToken:Ww(s.mockUserToken,t.app.options.projectId);o=new Kr(a)}hs(e)&&(Tf(e),If("Database",!0)),vI(i,r,s,o)}/**
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
 */function SI(t){Mf(gs),Wt(new Et("database",(e,{instanceIdentifier:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return Zp(s,r,i,n)},"PUBLIC").setMultipleInstances(!0)),gt(td,nd,t),gt(td,nd,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI={".sv":"timestamp"};function dn(){return CI}mt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};mt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};SI();const TI=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:vn,Database:eg,OnDisconnect:Kp,_QueryImpl:co,_QueryParams:Qi,_ReferenceImpl:Ke,_repoManagerDatabaseFromApp:Zp,_setSDKVersion:Mf,_validatePathString:Yc,_validateWritablePath:Nt,child:wn,connectDatabaseEmulator:ng,get:Ze,getDatabase:tg,off:_t,onChildAdded:ki,onChildChanged:Xp,onChildRemoved:Qp,onDisconnect:Jp,onValue:el,push:Ii,ref:N,remove:bn,serverTimestamp:dn,set:Ae,update:un},Symbol.toStringTag,{value:"Module"}));var II="firebase",kI="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */gt(II,kI,"app");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa=new Map,sg={activated:!1,tokenObservers:[]},RI={initialized:!1,enabled:!1};function se(t){return xa.get(t)||{...sg}}function AI(t,e){return xa.set(t,e),xa.get(t)}function ho(){return RI}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rg="https://content-firebaseappcheck.googleapis.com/v1",PI="exchangeRecaptchaEnterpriseToken",NI="exchangeDebugToken",Md={RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:960*1e3},LI=1440*60*1e3;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(e,n,s,r,i){if(this.operation=e,this.retryPolicy=n,this.getWaitDuration=s,this.lowerBound=r,this.upperBound=i,this.pending=null,this.nextErrorWaitInterval=r,r>i)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new Ee,this.pending.promise.catch(n=>{}),await DI(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new Ee,this.pending.promise.catch(n=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(n){this.retryPolicy(n)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{const n=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),n}}}function DI(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},we=new fs("appCheck","AppCheck",MI);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(t=!1){return t?self.grecaptcha?.enterprise:self.grecaptcha}function tl(t){if(!se(t).activated)throw we.create("use-before-activation",{appName:t.name})}function ig(t){const e=Math.round(t/1e3),n=Math.floor(e/(3600*24)),s=Math.floor((e-n*3600*24)/3600),r=Math.floor((e-n*3600*24-s*3600)/60),i=e-n*3600*24-s*3600-r*60;let o="";return n&&(o+=$r(n)+"d:"),s&&(o+=$r(s)+"h:"),o+=$r(r)+"m:"+$r(i)+"s",o}function $r(t){return t===0?"00":t>=10?t.toString():"0"+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nl({url:t,body:e},n){const s={"Content-Type":"application/json"},r=n.getImmediate({optional:!0});if(r){const d=await r.getHeartbeatsHeader();d&&(s["X-Firebase-Client"]=d)}const i={method:"POST",body:JSON.stringify(e),headers:s};let o;try{o=await fetch(t,i)}catch(d){throw we.create("fetch-network-error",{originalErrorMessage:d?.message})}if(o.status!==200)throw we.create("fetch-status-error",{httpStatus:o.status});let a;try{a=await o.json()}catch(d){throw we.create("fetch-parse-error",{originalErrorMessage:d?.message})}const c=a.ttl.match(/^([\d.]+)(s)$/);if(!c||!c[2]||isNaN(Number(c[1])))throw we.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${a.ttl}`});const l=Number(c[1])*1e3,u=Date.now();return{token:a.token,expireTimeMillis:u+l,issuedAtTimeMillis:u}}function xI(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${rg}/projects/${n}/apps/${s}:${PI}?key=${r}`,body:{recaptcha_enterprise_token:e}}}function og(t,e){const{projectId:n,appId:s,apiKey:r}=t.options;return{url:`${rg}/projects/${n}/apps/${s}:${NI}?key=${r}`,body:{debug_token:e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FI="firebase-app-check-database",UI=1,lr="firebase-app-check-store",ag="debug-token";let Br=null;function cg(){return Br||(Br=new Promise((t,e)=>{try{const n=indexedDB.open(FI,UI);n.onsuccess=s=>{t(s.target.result)},n.onerror=s=>{e(we.create("storage-open",{originalErrorMessage:s.target.error?.message}))},n.onupgradeneeded=s=>{const r=s.target.result;switch(s.oldVersion){case 0:r.createObjectStore(lr,{keyPath:"compositeKey"})}}}catch(n){e(we.create("storage-open",{originalErrorMessage:n?.message}))}}),Br)}function $I(t){return ug(dg(t))}function BI(t,e){return lg(dg(t),e)}function HI(t){return lg(ag,t)}function WI(){return ug(ag)}async function lg(t,e){const s=(await cg()).transaction(lr,"readwrite"),i=s.objectStore(lr).put({compositeKey:t,value:e});return new Promise((o,a)=>{i.onsuccess=c=>{o()},s.onerror=c=>{a(we.create("storage-set",{originalErrorMessage:c.target.error?.message}))}})}async function ug(t){const n=(await cg()).transaction(lr,"readonly"),r=n.objectStore(lr).get(t);return new Promise((i,o)=>{r.onsuccess=a=>{const c=a.target.result;i(c?c.value:void 0)},n.onerror=a=>{o(we.create("storage-get",{originalErrorMessage:a.target.error?.message}))}})}function dg(t){return`${t.options.appId}-${t.name}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=new Ki("@firebase/app-check");/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VI(t){if(Ec()){let e;try{e=await $I(t)}catch(n){Lt.warn(`Failed to read token from IndexedDB. Error: ${n}`)}return e}}function jo(t,e){return Ec()?BI(t,e).catch(n=>{Lt.warn(`Failed to write token to IndexedDB. Error: ${n}`)}):Promise.resolve()}async function jI(){let t;try{t=await WI()}catch{}if(t)return t;{const e=crypto.randomUUID();return HI(e).catch(n=>Lt.warn(`Failed to persist debug token to IndexedDB. Error: ${n}`)),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(){return ho().enabled}async function rl(){const t=ho();if(t.enabled&&t.token)return t.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function zI(){const t=wf(),e=ho();if(e.initialized=!0,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&t.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;const n=new Ee;e.token=n,typeof t.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?n.resolve(t.FIREBASE_APPCHECK_DEBUG_TOKEN):n.resolve(jI())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GI={error:"UNKNOWN_ERROR"};function qI(t){return qi.encodeString(JSON.stringify(t),!1)}async function Fa(t,e=!1,n=!1){const s=t.app;tl(s);const r=se(s);let i=r.token,o;if(i&&!Dn(i)&&(r.token=void 0,i=void 0),!i){const l=await r.cachedTokenPromise;l&&(Dn(l)?i=l:await jo(s,void 0))}if(!e&&i&&Dn(i))return{token:i.token};let a=!1;if(sl())try{r.exchangeTokenPromise||(r.exchangeTokenPromise=nl(og(s,await rl()),t.heartbeatServiceProvider).finally(()=>{r.exchangeTokenPromise=void 0}),a=!0);const l=await r.exchangeTokenPromise;return await jo(s,l),r.token=l,{token:l.token}}catch(l){return l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Lt.warn(l.message):n&&Lt.error(l),zo(l)}try{r.exchangeTokenPromise||(r.exchangeTokenPromise=r.provider.getToken().finally(()=>{r.exchangeTokenPromise=void 0}),a=!0),i=await se(s).exchangeTokenPromise}catch(l){l.code==="appCheck/throttled"||l.code==="appCheck/initial-throttle"?Lt.warn(l.message):n&&Lt.error(l),o=l}let c;return i?o?Dn(i)?c={token:i.token,internalError:o}:c=zo(o):(c={token:i.token},r.token=i,await jo(s,i)):c=zo(o),a&&pg(s,c),c}async function YI(t){const e=t.app;tl(e);const{provider:n}=se(e);if(sl()){const s=await rl(),{token:r}=await nl(og(e,s),t.heartbeatServiceProvider);return{token:r}}else{const{token:s}=await n.getToken();return{token:s}}}function hg(t,e,n,s){const{app:r}=t,i=se(r),o={next:n,error:s,type:e};if(i.tokenObservers=[...i.tokenObservers,o],i.token&&Dn(i.token)){const a=i.token;Promise.resolve().then(()=>{n({token:a.token}),Fd(t)}).catch(()=>{})}i.cachedTokenPromise.then(()=>Fd(t))}function fg(t,e){const n=se(t),s=n.tokenObservers.filter(r=>r.next!==e);s.length===0&&n.tokenRefresher&&n.tokenRefresher.isRunning()&&n.tokenRefresher.stop(),n.tokenObservers=s}function Fd(t){const{app:e}=t,n=se(e);let s=n.tokenRefresher;s||(s=KI(t),n.tokenRefresher=s),!s.isRunning()&&n.isTokenAutoRefreshEnabled&&s.start()}function KI(t){const{app:e}=t;return new OI(async()=>{const n=se(e);let s;if(n.token?s=await Fa(t,!0):s=await Fa(t),s.error)throw s.error;if(s.internalError)throw s.internalError},()=>!0,()=>{const n=se(e);if(n.token){let s=n.token.issuedAtTimeMillis+(n.token.expireTimeMillis-n.token.issuedAtTimeMillis)*.5+3e5;const r=n.token.expireTimeMillis-300*1e3;return s=Math.min(s,r),Math.max(0,s-Date.now())}else return 0},Md.RETRIAL_MIN_WAIT,Md.RETRIAL_MAX_WAIT)}function pg(t,e){const n=se(t).tokenObservers;for(const s of n)try{s.type==="EXTERNAL"&&e.error!=null?s.error(e.error):s.next(e)}catch{}}function Dn(t){return t.expireTimeMillis-Date.now()>0}function zo(t){return{token:qI(GI),error:t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(e,n){this.app=e,this.heartbeatServiceProvider=n}_delete(){const{tokenObservers:e}=se(this.app);for(const n of e)fg(this.app,n.next);return Promise.resolve()}}function XI(t,e){return new JI(t,e)}function QI(t){return{getToken:e=>Fa(t,e),getLimitedUseToken:()=>YI(t),addTokenListener:e=>hg(t,"INTERNAL",e),removeTokenListener:e=>fg(t.app,e)}}const ZI="@firebase/app-check",ek="0.11.0",tk="https://www.google.com/recaptcha/enterprise.js";function nk(t,e){const n=new Ee,s=se(t);s.reCAPTCHAState={initialized:n};const r=sk(t),i=xd(!0);return i?Ud(t,e,i,r,n):ok(()=>{const o=xd(!0);if(!o)throw new Error("no recaptcha");Ud(t,e,o,r,n)}),n.promise}function Ud(t,e,n,s,r){n.ready(()=>{ik(t,e,n,s),r.resolve(n)})}function sk(t){const e=`fire_app_check_${t.name}`,n=document.createElement("div");return n.id=e,n.style.display="none",document.body.appendChild(n),e}async function rk(t){tl(t);const n=await se(t).reCAPTCHAState.initialized.promise;return new Promise((s,r)=>{const i=se(t).reCAPTCHAState;n.ready(()=>{s(n.execute(i.widgetId,{action:"fire_app_check"}))})})}function ik(t,e,n,s){const r=n.render(s,{sitekey:e,size:"invisible",callback:()=>{se(t).reCAPTCHAState.succeeded=!0},"error-callback":()=>{se(t).reCAPTCHAState.succeeded=!1}}),i=se(t);i.reCAPTCHAState={...i.reCAPTCHAState,widgetId:r}}function ok(t){const e=document.createElement("script");e.src=tk,e.onload=t,document.head.appendChild(e)}class il{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){ck(this._throttleData);const e=await rk(this._app).catch(s=>{throw we.create("recaptcha-error")});if(!se(this._app).reCAPTCHAState?.succeeded)throw we.create("recaptcha-error");let n;try{n=await nl(xI(this._app,e),this._heartbeatServiceProvider)}catch(s){throw s.code?.includes("fetch-status-error")?(this._throttleData=ak(Number(s.customData?.httpStatus),this._throttleData),we.create("initial-throttle",{time:ig(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):s}return this._throttleData=null,n}initialize(e){this._app=e,this._heartbeatServiceProvider=vr(e,"heartbeat"),nk(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof il?this._siteKey===e._siteKey:!1}}function ak(t,e){if(t===404||t===403)return{backoffCount:1,allowRequestsAfter:Date.now()+LI,httpStatus:t};{const n=e?e.backoffCount:0,s=ub(n,1e3,2);return{backoffCount:n+1,allowRequestsAfter:Date.now()+s,httpStatus:t}}}function ck(t){if(t&&Date.now()-t.allowRequestsAfter<=0)throw we.create("throttled",{time:ig(t.allowRequestsAfter-Date.now()),httpStatus:t.httpStatus})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lk(t=wc(),e){t=ce(t);const n=vr(t,"app-check");if(ho().initialized||zI(),sl()&&rl().then(r=>console.log(`App Check debug token: ${r}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(i.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&i.provider.isEqual(e.provider))return r;throw we.create("already-initialized",{appName:t.name})}const s=n.initialize({options:e});return uk(t,e.provider,e.isTokenAutoRefreshEnabled),se(t).isTokenAutoRefreshEnabled&&hg(s,"INTERNAL",()=>{}),s}function uk(t,e,n=!1){const s=AI(t,{...sg});s.activated=!0,s.provider=e,s.cachedTokenPromise=VI(t).then(r=>(r&&Dn(r)&&(s.token=r,pg(t,{token:r.token})),r)),s.isTokenAutoRefreshEnabled=n&&t.automaticDataCollectionEnabled,!t.automaticDataCollectionEnabled&&n&&Lt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),s.provider.initialize(t)}const dk="app-check",$d="app-check-internal";function hk(){Wt(new Et(dk,t=>{const e=t.getProvider("app").getImmediate(),n=t.getProvider("heartbeat");return XI(e,n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,e,n)=>{t.getProvider($d).initialize()})),Wt(new Et($d,t=>{const e=t.getProvider("app-check").getImmediate();return QI(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),gt(ZI,ek)}hk();const fk={apiKey:"AIzaSyA-fvCaKCjyEFX__YAVr1oPGdVsUEhFehA",authDomain:"vidu-aae11.firebaseapp.com",projectId:"vidu-aae11",databaseURL:"https://vidu-aae11-default-rtdb.europe-west1.firebasedatabase.app",storageBucket:"vidu-aae11.firebasestorage.app",messagingSenderId:"765724787439",appId:"1:765724787439:web:61a3b5dd538149564c911a",measurementId:"G-EGJ53HLGY4"},ol=Nf(fk),Bd="6LdBIBgsAAAAAB4zIcXaZI-FD4kt21TWs9Zx9_fp";let Ua;if(Bd.trim()!=="")Ua=new il(Bd),console.info("[Firebase App Check: PROD] Initializing with ReCAPTCHA Enterprise (invisible mode).");else throw console.error("[Firebase App Check: PROD] VITE_RECAPTCHA_ENTERPRISE_SITE_KEY is missing or empty. App Check will NOT be initialized, leaving Firebase services unprotected!"),new Error("Firebase App Check configuration missing in production.");if(Ua)try{lk(ol,{provider:Ua,isTokenAutoRefreshEnabled:!0})}catch(t){console.error("[Firebase App Check] initializeAppCheck call failed:",t)}const D=tg(ol),He=[];function rn(t,e,n,s=null,r=null,i=null){e==="value"?el(t,n):e==="child_added"?ki(t,n):e==="child_removed"?Qp(t,n):console.warn(`Unknown listener type: ${e}`),He.push({ref:t,type:e,callback:n,roomId:s,userId:r,category:i})}function pk(){He.forEach(({ref:t,type:e,callback:n})=>{try{_t(t,e,n)}catch(s){console.warn("Failed to remove firebase rtdb listener",s)}}),He.length=0}function fo(t){if(!t)return;He.filter(s=>s.roomId===t).forEach(({ref:s,type:r,callback:i})=>{try{_t(s,r,i)}catch(o){console.warn(`Failed to remove listener for room ${t}`,o)}});const n=He.filter(s=>s.roomId!==t);He.length=0,He.push(...n)}function gk(t,e){if(!t||!e)return;const n=i=>i.userId===t&&i.roomId===e;He.filter(n).forEach(({ref:i,type:o,callback:a})=>{try{_t(i,o,a)}catch(c){console.warn(`Failed to remove listener for user ${t} in room ${e}`,c)}});const r=He.filter(i=>!n(i));He.length=0,He.push(...r)}function Jr(t,e,n=null){rn(t,"value",e,n)}const Qt=t=>N(D,`rooms/${t}`),Hr=t=>N(D,`rooms/${t}/members`),Hd=(t,e)=>N(D,`rooms/${t}/members/${e}`),mk=t=>N(D,`rooms/${t}/cancellation`),po=t=>N(D,`rooms/${t}/watch`),_k=t=>N(D,`users/${t}/recentCalls`),al=(t,e)=>N(D,`users/${t}/recentCalls/${e}`),cl=t=>N(D,`users/${t}/outgoingCall`),gg=t=>N(D,`rooms/${t}/offerCandidates`),mg=t=>N(D,`rooms/${t}/answerCandidates`);function _g(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const yk=_g,yg=new fs("auth","Firebase",_g());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=new Ki("@firebase/auth");function Ek(t,...e){Ri.logLevel<=O.WARN&&Ri.warn(`Auth (${gs}): ${t}`,...e)}function Xr(t,...e){Ri.logLevel<=O.ERROR&&Ri.error(`Auth (${gs}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(t,...e){throw ul(t,...e)}function ze(t,...e){return ul(t,...e)}function ll(t,e,n){const s={...yk(),[e]:n};return new fs("auth","Firebase",s).create(e,{appName:t.name})}function hn(t){return ll(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vk(t,e,n){const s=n;if(!(e instanceof s))throw s.name!==e.constructor.name&&tt(t,"argument-error"),ll(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ul(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return yg.create(t,...e)}function S(t,e,...n){if(!t)throw ul(e,...n)}function ct(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Xr(e),new Error(e)}function bt(t,e){t||ct(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $a(){return typeof self<"u"&&self.location?.href||""}function wk(){return Wd()==="http:"||Wd()==="https:"}function Wd(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(wk()||Gw()||"connection"in navigator)?navigator.onLine:!0}function Sk(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,n){this.shortDelay=e,this.longDelay=n,bt(n>e,"Short delay should be less than long delay!"),this.isMobile=yc()||kf()}get(){return bk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(t,e){bt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eg{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ct("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ct("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ct("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ck={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tk=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ik=new Rr(3e4,6e4);function hl(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function vs(t,e,n,s,r={}){return vg(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=ps({key:t.config.apiKey,...o}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const l={method:e,headers:c,...i};return zw()||(l.referrerPolicy="no-referrer"),t.emulatorConfig&&hs(t.emulatorConfig.host)&&(l.credentials="include"),Eg.fetch()(await wg(t,t.config.apiHost,n,a),l)})}async function vg(t,e,n){t._canInitEmulator=!1;const s={...Ck,...e};try{const r=new Rk(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Wr(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Wr(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Wr(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Wr(t,"user-disabled",o);const u=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ll(t,u,l);tt(t,u)}}catch(r){if(r instanceof Kt)throw r;tt(t,"network-request-failed",{message:String(r)})}}async function kk(t,e,n,s,r={}){const i=await vs(t,e,n,s,r);return"mfaPendingCredential"in i&&tt(t,"multi-factor-auth-required",{_serverResponse:i}),i}async function wg(t,e,n,s){const r=`${e}${n}?${s}`,i=t,o=i.config.emulator?dl(t.config,r):`${t.config.apiScheme}://${r}`;return Tk.includes(n)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}class Rk{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(ze(this.auth,"network-request-failed")),Ik.get())})}}function Wr(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=ze(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ak(t,e){return vs(t,"POST","/v1/accounts:delete",e)}async function Ai(t,e){return vs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Pk(t,e=!1){const n=ce(t),s=await n.getIdToken(e),r=fl(s);S(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i?.sign_in_provider;return{claims:r,token:s,authTime:Vs(Go(r.auth_time)),issuedAtTime:Vs(Go(r.iat)),expirationTime:Vs(Go(r.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function Go(t){return Number(t)*1e3}function fl(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return Xr("JWT malformed, contained fewer than 3 sections"),null;try{const r=ci(n);return r?JSON.parse(r):(Xr("Failed to decode base64 JWT payload"),null)}catch(r){return Xr("Caught error parsing JWT payload as JSON",r?.toString()),null}}function Vd(t){const e=fl(t);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ur(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof Kt&&Nk(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function Nk({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lk{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vs(this.lastLoginAt),this.creationTime=Vs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pi(t){const e=t.auth,n=await t.getIdToken(),s=await ur(t,Ai(e,{idToken:n}));S(s?.users.length,e,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const i=r.providerUserInfo?.length?bg(r.providerUserInfo):[],o=Dk(t.providerData,i),a=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!o?.length,l=a?c:!1,u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new Ba(r.createdAt,r.lastLoginAt),isAnonymous:l};Object.assign(t,u)}async function Ok(t){const e=ce(t);await Pi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Dk(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function bg(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mk(t,e){const n=await vg(t,{},async()=>{const s=ps({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=await wg(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return t.emulatorConfig&&hs(t.emulatorConfig.host)&&(c.credentials="include"),Eg.fetch()(o,c)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function xk(t,e){return vs(t,"POST","/v2/accounts:revokeToken",hl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){S(e.length!==0,"internal-error");const n=Vd(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await Mk(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new Un;return s&&(S(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(S(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(S(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Un,this.toJSON())}_performRefresh(){return ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(t,e){S(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class We{constructor({uid:e,auth:n,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new Lk(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ba(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const n=await ur(this,this.stsTokenManager.getToken(this.auth,e));return S(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Pk(this,e)}reload(){return Ok(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new We({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await Pi(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ue(this.auth.app))return Promise.reject(hn(this.auth));const e=await this.getIdToken();return await ur(this,Ak(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const s=n.displayName??void 0,r=n.email??void 0,i=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:p,stsTokenManager:y}=n;S(d&&y,e,"internal-error");const m=Un.fromJSON(this.name,y);S(typeof d=="string",e,"internal-error"),Tt(s,e.name),Tt(r,e.name),S(typeof h=="boolean",e,"internal-error"),S(typeof f=="boolean",e,"internal-error"),Tt(i,e.name),Tt(o,e.name),Tt(a,e.name),Tt(c,e.name),Tt(l,e.name),Tt(u,e.name);const T=new We({uid:d,auth:e,email:r,emailVerified:h,displayName:s,isAnonymous:f,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return p&&Array.isArray(p)&&(T.providerData=p.map(B=>({...B}))),c&&(T._redirectEventId=c),T}static async _fromIdTokenResponse(e,n,s=!1){const r=new Un;r.updateFromServerResponse(n);const i=new We({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await Pi(i),i}static async _fromGetAccountInfoResponse(e,n,s){const r=n.users[0];S(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?bg(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!i?.length,a=new Un;a.updateFromIdToken(s);const c=new We({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new Ba(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!i?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jd=new Map;function lt(t){bt(t instanceof Function,"Expected a class definition");let e=jd.get(t);return e?(bt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,jd.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Sg.type="NONE";const Ha=Sg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(t,e,n){return`firebase:${t}:${e}:${n}`}class $n{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=Qr(this.userKey,r.apiKey,i),this.fullPersistenceKey=Qr("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Ai(this.auth,{idToken:e}).catch(()=>{});return n?We._fromGetAccountInfoResponse(this.auth,n,e):null}return We._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new $n(lt(Ha),e,s);const r=(await Promise.all(n.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let i=r[0]||lt(Ha);const o=Qr(s,e.config.apiKey,e.name);let a=null;for(const l of n)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Ai(e,{idToken:u}).catch(()=>{});if(!h)break;d=await We._fromGetAccountInfoResponse(e,h,u)}else d=We._fromJSON(e,u);l!==i&&(a=d),i=l;break}}catch{}const c=r.filter(l=>l._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new $n(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async l=>{if(l!==i)try{await l._remove(o)}catch{}})),new $n(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(kg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Cg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ag(e))return"Blackberry";if(Pg(e))return"Webos";if(Tg(e))return"Safari";if((e.includes("chrome/")||Ig(e))&&!e.includes("edge/"))return"Chrome";if(Rg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if(s?.length===2)return s[1]}return"Other"}function Cg(t=_e()){return/firefox\//i.test(t)}function Tg(t=_e()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Ig(t=_e()){return/crios\//i.test(t)}function kg(t=_e()){return/iemobile/i.test(t)}function Rg(t=_e()){return/android/i.test(t)}function Ag(t=_e()){return/blackberry/i.test(t)}function Pg(t=_e()){return/webos/i.test(t)}function pl(t=_e()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Fk(t=_e()){return pl(t)&&!!window.navigator?.standalone}function Uk(){return qw()&&document.documentMode===10}function Ng(t=_e()){return pl(t)||Rg(t)||Pg(t)||Ag(t)||/windows phone/i.test(t)||kg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lg(t,e=[]){let n;switch(t){case"Browser":n=zd(_e());break;case"Worker":n=`${zd(_e())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${gs}/${s}`}/**
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
 */class $k{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s?.message})}}}/**
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
 */async function Bk(t,e={}){return vs(t,"GET","/v2/passwordPolicy",hl(t,e))}/**
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
 */const Hk=6;class Wk{constructor(e){const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Hk,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(n.meetsMinPasswordLength=e.length>=s),r&&(n.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(n,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,n,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vk{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Gd(this),this.idTokenSubscription=new Gd(this),this.beforeStateQueue=new $k(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=yg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=lt(n)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await $n.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Ai(this,{idToken:e}),s=await We._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(s)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ue(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=s?._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===o)&&a?.user&&(s=a.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(i){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Pi(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Sk()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ue(this.app))return Promise.reject(hn(this));const n=e?ce(e):null;return n&&S(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ue(this.app)?Promise.reject(hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ue(this.app)?Promise.reject(hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(lt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Bk(this),n=new Wk(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new fs("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(s.tenantId=this.tenantId),await xk(this,s)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&lt(e)||this._popupRedirectResolver;S(n,this,"argument-error"),this.redirectPersistenceManager=await $n.create(this,[lt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Lg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();n&&(e["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){if(Ue(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Ek(`Error while retrieving App Check token: ${e.error}`),e?.token}}function ws(t){return ce(t)}class Gd{constructor(e){this.auth=e,this.observer=null,this.addObserver=nb(n=>this.observer=n)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function jk(t){gl=t}function zk(t){return gl.loadJS(t)}function Gk(){return gl.gapiScript}function qk(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yk(t,e){const n=vr(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(mn(i,e??{}))return r;tt(r,"already-initialized")}return n.initialize({options:e})}function Kk(t,e){const n=e?.persistence||[],s=(Array.isArray(n)?n:[n]).map(lt);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e?.popupRedirectResolver)}function Jk(t,e,n){const s=ws(t);S(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=Og(e),{host:o,port:a}=Xk(e),c=a===null?"":`:${a}`,l={url:`${i}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){S(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),S(mn(l,s.config.emulator)&&mn(u,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=l,s.emulatorConfig=u,s.settings.appVerificationDisabledForTesting=!0,hs(o)?(Tf(`${i}//${o}${c}`),If("Auth",!0)):Qk()}function Og(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Xk(t){const e=Og(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:qd(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:qd(o)}}}function qd(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Qk(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ct("not implemented")}_getIdTokenResponse(e){return ct("not implemented")}_linkToIdToken(e,n){return ct("not implemented")}_getReauthenticationResolver(e){return ct("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bn(t,e){return kk(t,"POST","/v1/accounts:signInWithIdp",hl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zk="http://localhost";class Sn extends Dg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):tt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=n;if(!s||!r)return null;const o=new Sn(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Bn(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Bn(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Bn(e,n)}buildRequest(){const e={requestUri:Zk,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=ps(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ar extends ml{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It extends Ar{constructor(){super("facebook.com")}static credential(e){return Sn._fromParams({providerId:It.PROVIDER_ID,signInMethod:It.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return It.credentialFromTaggedObject(e)}static credentialFromError(e){return It.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return It.credential(e.oauthAccessToken)}catch{return null}}}It.FACEBOOK_SIGN_IN_METHOD="facebook.com";It.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe extends Ar{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Sn._fromParams({providerId:Pe.PROVIDER_ID,signInMethod:Pe.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Pe.credentialFromTaggedObject(e)}static credentialFromError(e){return Pe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Pe.credential(n,s)}catch{return null}}}Pe.GOOGLE_SIGN_IN_METHOD="google.com";Pe.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends Ar{constructor(){super("github.com")}static credential(e){return Sn._fromParams({providerId:kt.PROVIDER_ID,signInMethod:kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return kt.credentialFromTaggedObject(e)}static credentialFromError(e){return kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return kt.credential(e.oauthAccessToken)}catch{return null}}}kt.GITHUB_SIGN_IN_METHOD="github.com";kt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Ar{constructor(){super("twitter.com")}static credential(e,n){return Sn._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Rt.credential(n,s)}catch{return null}}}Rt.TWITTER_SIGN_IN_METHOD="twitter.com";Rt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await We._fromIdTokenResponse(e,s,r),o=Yd(s);return new rs({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Yd(s);return new rs({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Yd(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends Kt{constructor(e,n,s,r){super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Ni.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Ni(e,n,s,r)}}function Mg(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ni._fromErrorAndOperation(t,i,e,s):i})}async function eR(t,e,n=!1){const s=await ur(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return rs._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tR(t,e,n=!1){const{auth:s}=t;if(Ue(s.app))return Promise.reject(hn(s));const r="reauthenticate";try{const i=await ur(t,Mg(s,r,e,t),n);S(i.idToken,s,"internal-error");const o=fl(i.idToken);S(o,s,"internal-error");const{sub:a}=o;return S(t.uid===a,s,"user-mismatch"),rs._forOperation(t,r,i)}catch(i){throw i?.code==="auth/user-not-found"&&tt(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xg(t,e,n=!1){if(Ue(t.app))return Promise.reject(hn(t));const s="signIn",r=await Mg(t,s,e),i=await rs._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function nR(t,e){return xg(ws(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(t,e){return ce(t).setPersistence(e)}function sR(t,e,n,s){return ce(t).onIdTokenChanged(e,n,s)}function rR(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}function Fg(t,e,n,s){return ce(t).onAuthStateChanged(e,n,s)}function iR(t){return ce(t).signOut()}const Li="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Li,"1"),this.storage.removeItem(Li),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oR=1e3,aR=10;class $g extends Ug{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ng(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;n?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);Uk()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,aR):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},oR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}$g.type="LOCAL";const Bg=$g;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg extends Ug{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Hg.type="SESSION";const Wg=Hg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new go(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!o?.size)return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async l=>l(n.origin,i)),c=await cR(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}go.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _l(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const l=_l("",20);r.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(h.data.response);break;default:clearTimeout(u),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){return window}function uR(t){et().location.href=t}/**
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
 */function Vg(){return typeof et().WorkerGlobalScope<"u"&&typeof et().importScripts=="function"}async function dR(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function hR(){return navigator?.serviceWorker?.controller||null}function fR(){return Vg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg="firebaseLocalStorageDb",pR=1,Oi="firebaseLocalStorage",zg="fbase_key";class Pr{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function mo(t,e){return t.transaction([Oi],e?"readwrite":"readonly").objectStore(Oi)}function gR(){const t=indexedDB.deleteDatabase(jg);return new Pr(t).toPromise()}function Wa(){const t=indexedDB.open(jg,pR);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Oi,{keyPath:zg})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Oi)?e(s):(s.close(),await gR(),e(await Wa()))})})}async function Kd(t,e,n){const s=mo(t,!0).put({[zg]:e,value:n});return new Pr(s).toPromise()}async function mR(t,e){const n=mo(t,!1).get(e),s=await new Pr(n).toPromise();return s===void 0?null:s.value}function Jd(t,e){const n=mo(t,!0).delete(e);return new Pr(n).toPromise()}const _R=800,yR=3;class Gg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Wa(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>yR)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=go._getInstance(fR()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await dR(),!this.activeServiceWorker)return;this.sender=new lR(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||hR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Wa();return await Kd(e,Li,"1"),await Jd(e,Li),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Kd(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>mR(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Jd(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=mo(r,!1).getAll();return new Pr(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_R)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Gg.type="LOCAL";const qg=Gg;new Rr(3e4,6e4);/**
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
 */function Yg(t,e){return e?lt(e):(S(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl extends Dg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Bn(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Bn(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Bn(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function ER(t){return xg(t.auth,new yl(t),t.bypassAuthState)}function vR(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),tR(n,new yl(t),t.bypassAuthState)}async function wR(t){const{auth:e,user:n}=t;return S(n,e,"internal-error"),eR(n,new yl(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kg{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ER;case"linkViaPopup":case"linkViaRedirect":return wR;case"reauthViaPopup":case"reauthViaRedirect":return vR;default:tt(this.auth,"internal-error")}}resolve(e){bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){bt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bR=new Rr(2e3,1e4);async function SR(t,e,n){if(Ue(t.app))return Promise.reject(ze(t,"operation-not-supported-in-this-environment"));const s=ws(t);vk(t,e,ml);const r=Yg(s,n);return new cn(s,"signInViaPopup",e,r).executeNotNull()}class cn extends Kg{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,cn.currentPopupAction&&cn.currentPopupAction.cancel(),cn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){bt(this.filter.length===1,"Popup operations only handle one event");const e=_l();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,cn.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,bR.get())};e()}}cn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CR="pendingRedirect",Zr=new Map;class TR extends Kg{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=Zr.get(this.auth._key());if(!e){try{const s=await IR(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}Zr.set(this.auth._key(),e)}return this.bypassAuthState||Zr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function IR(t,e){const n=AR(e),s=RR(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function kR(t,e){Zr.set(t._key(),e)}function RR(t){return lt(t._redirectPersistence)}function AR(t){return Qr(CR,t.config.apiKey,t.name)}async function PR(t,e){return await ws(t)._initializationPromise,Jg(t,e,!1)}async function Jg(t,e,n=!1){if(Ue(t.app))return Promise.reject(hn(t));const s=ws(t),r=Yg(s,e),o=await new TR(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NR=600*1e3;class LR{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!OR(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){if(e.error&&!Xg(e)){const s=e.error.code?.split("auth/")[1]||"internal-error";n.onError(ze(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=NR&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xd(e))}saveEventToCache(e){this.cachedEventUids.add(Xd(e)),this.lastProcessedEventTime=Date.now()}}function Xd(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Xg({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function OR(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xg(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DR(t,e={}){return vs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MR=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xR=/^https?/;async function FR(t){if(t.config.emulator)return;const{authorizedDomains:e}=await DR(t);for(const n of e)try{if(UR(n))return}catch{}tt(t,"unauthorized-domain")}function UR(t){const e=$a(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!xR.test(n))return!1;if(MR.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const $R=new Rr(3e4,6e4);function Qd(){const t=et().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function BR(t){return new Promise((e,n)=>{function s(){Qd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Qd(),n(ze(t,"network-request-failed"))},timeout:$R.get()})}if(et().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(et().gapi?.load)s();else{const r=qk("iframefcb");return et()[r]=()=>{gapi.load?s():n(ze(t,"network-request-failed"))},zk(`${Gk()}?onload=${r}`).catch(i=>n(i))}}).catch(e=>{throw ei=null,e})}let ei=null;function HR(t){return ei=ei||BR(t),ei}/**
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
 */const WR=new Rr(5e3,15e3),VR="__/auth/iframe",jR="emulator/auth/iframe",zR={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},GR=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function qR(t){const e=t.config;S(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?dl(e,jR):`https://${t.config.authDomain}/${VR}`,s={apiKey:e.apiKey,appName:t.name,v:gs},r=GR.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${ps(s).slice(1)}`}async function YR(t){const e=await HR(t),n=et().gapi;return S(n,t,"internal-error"),e.open({where:document.body,url:qR(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zR,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=ze(t,"network-request-failed"),a=et().setTimeout(()=>{i(o)},WR.get());function c(){et().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
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
 */const KR={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},JR=500,XR=600,QR="_blank",ZR="http://localhost";class Zd{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function eA(t,e,n,s=JR,r=XR){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...KR,width:s.toString(),height:r.toString(),top:i,left:o},l=_e().toLowerCase();n&&(a=Ig(l)?QR:n),Cg(l)&&(e=e||ZR,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,p])=>`${h}${f}=${p},`,"");if(Fk(l)&&a!=="_self")return tA(e||"",a),new Zd(null);const d=window.open(e||"",a,u);S(d,t,"popup-blocked");try{d.focus()}catch{}return new Zd(d)}function tA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const nA="__/auth/handler",sA="emulator/auth/handler",rA=encodeURIComponent("fac");async function eh(t,e,n,s,r,i){S(t.config.authDomain,t,"auth-domain-config-required"),S(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:gs,eventId:r};if(e instanceof ml){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",li(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof Ar){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await t._getAppCheckToken(),l=c?`#${rA}=${encodeURIComponent(c)}`:"";return`${iA(t)}?${ps(a).slice(1)}${l}`}function iA({config:t}){return t.emulator?dl(t,sA):`https://${t.authDomain}/${nA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="webStorageSupport";class oA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wg,this._completeRedirectFn=Jg,this._overrideRedirectResult=kR}async _openPopup(e,n,s,r){bt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await eh(e,n,s,$a(),r);return eA(e,i,_l())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await eh(e,n,s,$a(),r);return uR(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(bt(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await YR(e),s=new LR(e);return n.register("authEvent",r=>(S(r?.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Yo,{type:Yo},r=>{const i=r?.[0]?.[Yo];i!==void 0&&n(!!i),tt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=FR(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ng()||Tg()||pl()}}const aA=oA;var th="@firebase/auth",nh="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e(s?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function uA(t){Wt(new Et("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Lg(t)},l=new Vk(s,r,i,c);return Kk(l,n),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Wt(new Et("auth-internal",e=>{const n=ws(e.getProvider("auth").getImmediate());return(s=>new cA(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),gt(th,nh,lA(t)),gt(th,nh,"esm2020")}/**
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
 */const dA=300,hA=Cf("authIdTokenMaxAge")||dA;let sh=null;const fA=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>hA)return;const r=n?.token;sh!==r&&(sh=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function pA(t=wc()){const e=vr(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Yk(t,{popupRedirectResolver:aA,persistence:[qg,Bg,Wg]}),s=Cf("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=fA(i.toString());rR(n,o,()=>o(n.currentUser)),sR(n,a=>o(a))}}const r=bf("auth");return r&&Jk(n,`http://${r}`),n}function gA(){return document.getElementsByTagName("head")?.[0]??document}jk({loadJS(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=ze("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",gA().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});uA("Browser");const bN=()=>!1,mA=t=>{try{t&&localStorage.setItem("debug:console","1")}catch{}},H=(...t)=>{},_A=(...t)=>{localStorage.getItem("debug:console")},yA="765724787439-21p8n3e2tsfq2qk4oriq7ipp7m4o50ad.apps.googleusercontent.com",js=new Set;function EA(){const t=console.error;console.error=(...e)=>{const n=e.join(" ");n.includes("FedCM")&&n.includes("AbortError")&&n.includes("signal is aborted without reason")||e.length===1&&typeof e[0]=="string"&&e[0].trim()==="The request has been aborted."||t.apply(console,e)}}function vA(t){return H("[ONE TAP] Callback registered, total callbacks:",js.size+1),js.add(t),()=>js.delete(t)}function Ln(t){H("[ONE TAP] Notifying status:",t,"to",js.size,"callbacks"),js.forEach(e=>{try{e(t)}catch{}})}function Qg(){if(typeof google>"u"||!google.accounts?.id){setTimeout(()=>Qg(),100);return}EA(),google.accounts.id.initialize({client_id:yA,callback:wA,auto_select:!1,cancel_on_tap_outside:!0,context:"signin",use_fedcm_for_prompt:!0,itp_support:!0})}function Zg(){if(El()){Ln("not_needed");return}window.google?.accounts?.id&&(Ln("prompting"),window.google.accounts.id.prompt(t=>{const e=t.getMomentType();e==="skipped"?Ln("skipped"):e==="dismissed"?Ln("dismissed"):e==="display"&&Ln("displayed")}))}async function wA(t){try{H("[ONE TAP] Received credential, signing in with Firebase..."),Ln("signing_in");const e=Pe.credential(t.credential),n=await nR(Re,e);H("[ONE TAP] ✅ Successfully signed in:",n.user.email),tm(!1)}catch(e){const n=e?.code||"unknown",s=e?.message||String(e);alert(n==="auth/account-exists-with-different-credential"?"An account already exists with the same email but different sign-in credentials.":`One Tap sign-in failed: ${s}`)}}let Va=!1;async function bA(){const t=Q();if(!t||Va)return;const e=N(D,`users/${t}/presence`);try{await Ae(e,{state:"online",lastChanged:dn()}),await Jp(e).set({state:"offline",lastSeen:dn(),lastChanged:dn()}),Va=!0,console.log("Presence initialized for user:",t)}catch(n){console.error("Failed to initialize presence:",n)}}async function SA(){const t=Q();if(!t)return;const e=N(D,`users/${t}/presence`);try{await Ae(e,{state:"offline",lastSeen:dn(),lastChanged:dn()}),Va=!1}catch(n){console.error("Failed to set offline:",n)}}const Re=pA(ol),em=(async()=>{try{await qo(Re,qg)}catch{try{await qo(Re,Bg)}catch{await qo(Re,Ha)}}try{const t=await PR(Re);t?.user&&console.log("[AUTH] ✅ Sign-in completed (via Safari fallback), user:",t.user.email||t.user.uid)}catch(t){H("[AUTH] No redirect result:",t.code)}setTimeout(()=>{Qg(),Zg()},500)})();let Ms=!1;function tm(t){Ms=t}function CA(){try{const t=document.createElement("a");t.href=window.location.href,t.target="_blank",t.rel="noopener noreferrer external",document.body.appendChild(t),t.click(),document.body.removeChild(t)}catch{}}let Ns=null;const TA=()=>Math.random().toString(36).substring(2,15),ja="guestUser",IA=2880*60*1e3;function kA(){try{const t=typeof localStorage<"u"?localStorage.getItem(ja):null;if(!t)return null;const e=JSON.parse(t);if(!e||typeof e!="object"||!e.id)return null;if(e.expiresAt&&Date.now()>e.expiresAt){try{localStorage.removeItem(ja)}catch{}return null}return e}catch{return null}}function RA(t,e=IA){const n=Date.now(),s={id:t,createdAt:n,expiresAt:n+e};try{typeof localStorage<"u"&&localStorage.setItem(ja,JSON.stringify(s))}catch{}return s}function fe(){const t=Q();if(t)return t;if(!Ns){const e=kA();e&&e.id?Ns=e.id:(Ns=TA(),RA(Ns))}return Ns}function nm(){return Re.currentUser}function El(){return Re.currentUser!==null}function Q(){return Re.currentUser?.uid??null}function AA(){return new Promise(t=>{const e=Fg(Re,n=>{e(),t(n)})})}function vl(t,{truncate:e=7}={}){return Fg(Re,n=>{const s=!!n,r=n?.displayName||"Guest User",i=typeof r=="string"&&r.length>e?r.slice(0,e)+"...":r;s&&bA().catch(o=>{console.warn("Failed to initialize presence:",o)});try{t({user:n,isLoggedIn:s,userName:i})}catch{}})}async function sm(){const t=new Pe;t.setCustomParameters({prompt:"select_account"});const n=(()=>{try{return typeof window<"u"&&window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||typeof navigator<"u"&&navigator.standalone===!0}catch{return!1}})()&&/iphone|ipad|ipod/i.test(navigator.userAgent||"");try{if(n&&Ms){Ms=!1,CA();return}console.log("[AUTH] Starting popup sign-in flow...");const s=await SR(Re,t),i=Pe.credentialFromResult(s).accessToken,o=s.user;console.log("Signed in user:",o),H("Google Access Token exists:",!!i),Ms=!1}catch(s){const r=s?.code||"unknown",i=s?.message||String(s);if(r==="auth/popup-closed-by-user"||r==="auth/cancelled-popup-request"){console.log("Sign-in cancelled by user");return}if((r==="auth/network-request-failed"||r==="auth/popup-blocked")&&n){console.warn(`[AUTH] ${r} inside iOS standalone PWA. Arming Safari fallback.`),Ms=!0,alert(`Sign-in is blocked in the installed app on iOS.

Tap the Login button again to open in Safari and complete sign-in.`);return}if(r==="auth/popup-blocked"){alert("Pop-up blocked. Please enable pop-ups for this site in your browser settings, or try signing in from a desktop browser.");return}const o=s?.customData?.email,a=Pe.credentialFromError(s);if(console.error("Error during Google sign-in:",{errorCode:r,errorMessage:i,email:o,credential:a,origin:typeof window<"u"?window.location.origin:"n/a"}),r==="auth/unauthorized-domain"){const c=typeof window<"u"?window.location.origin:"",l=["This app's host is not whitelisted in Firebase Authentication.","Fix: In Firebase Console, go to Build → Authentication → Settings → Authorized domains and add this origin:",c?`• ${c}`:"• <your dev origin>","","Common dev hosts to add:","• http://localhost (covers any port)","• http://127.0.0.1","• http://[::1] (IPv6 localhost)","• Your LAN IP, e.g. http://192.168.x.y","","Tip: avoid opening index.html directly from the filesystem (file://). Use a dev server instead."];c&&typeof navigator<"u"&&navigator.clipboard?.writeText&&navigator.clipboard.writeText(c).catch(()=>{}),alert(`Sign-in failed: Unauthorized domain.

${l.join(`
`)}`);return}alert(`Sign-in failed: ${i}`)}}async function rm(){try{await SA(),await iR(Re),console.info("User signed out"),setTimeout(()=>Zg(),1500)}catch(t){throw console.error("Error signing out:",t),t}}const PA=Object.freeze(Object.defineProperty({__proto__:null,auth:Re,authReady:em,getCurrentUser:nm,getCurrentUserAsync:AA,getLoggedInUserId:Q,getUserId:fe,isLoggedIn:El,onAuthChange:vl,setSafariExternalOpenArmed:tm,signInWithGoogle:sm,signOutUser:rm},Symbol.toStringTag,{value:"Module"})),NA=t=>String(t).replace(/[&<>"'`=\/]/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#x60;","=":"&#x3D;","/":"&#x2F;"})[n]),LA=(t,e)=>t.replace(/\$\{([^}]+)\}/g,(n,s)=>{const r=s.trim(),i=r.split(".").reduce((a,c)=>a?.[c],e);return i==null?"":r.endsWith("Html")?String(i):NA(String(i))}),OA=(t,e={})=>{const n=document.createElement("template");return n.innerHTML=LA(t,e),n.content.cloneNode(!0)},DA=(t,e)=>{const n=[];let s=e;for(;s&&s!==t;){const r=s.parentElement;if(!r)break;const i=Array.prototype.indexOf.call(r.children,s);n.push(i),s=r}return n.reverse()},MA=(t,e)=>e.reduce((n,s)=>n&&n.children?n.children[s]:null,t),xA=t=>Array.from(t.querySelectorAll("input, textarea, select")).map(e=>({name:e.name,id:e.id,path:DA(t,e),value:e.value,checked:e.checked,selectionStart:e.selectionStart,selectionEnd:e.selectionEnd,wasFocused:document.activeElement===e})),FA=t=>typeof CSS<"u"&&typeof CSS.escape=="function"?CSS.escape(String(t)):String(t).replace(/[^_a-zA-Z0-9-]/g,e=>"\\"+e),UA=(t,e)=>{e.forEach(n=>{let s=null;if(n.name){const r=t.querySelectorAll("input[name], textarea[name], select[name]");for(const i of r)if(i.getAttribute("name")===n.name){s=i;break}}else if(n.id)try{s=t.querySelector("#"+FA(n.id))}catch{s=t.querySelector(`#${n.id}`)}else n.path&&(s=MA(t,n.path));if(s){if(s.value=n.value,n.checked!==void 0&&(s.checked=n.checked),n.selectionStart!=null&&s.setSelectionRange)try{s.setSelectionRange(n.selectionStart,n.selectionEnd)}catch{}if(n.wasFocused)try{s.focus()}catch{}}})},$A=t=>Array.from(t.querySelectorAll("video, audio")).map(e=>({src:e.currentSrc||e.src,currentTime:e.currentTime,paused:e.paused,volume:e.volume,playbackRate:e.playbackRate,muted:e.muted})),BA=(t,e)=>{const n=t.querySelectorAll("video, audio");for(const s of n)if(s.currentSrc===e||s.src===e)return s;return null},HA=(t,e)=>{e.forEach(n=>{if(!n.src)return;const s=BA(t,n.src);s&&(s.currentTime=n.currentTime,s.volume=n.volume,s.playbackRate=n.playbackRate,s.muted=n.muted,n.paused||s.play().catch(()=>{}))})},WA=()=>document.readyState!=="loading",wl=({initialProps:t={},template:e="",handlers:n={},parent:s=null,containerTag:r="div",className:i="",onMount:o=null,onCleanup:a=null,autoAppend:c=!0,preserveInputState:l=!0}={})=>{if(!WA())return console.error("createComponent: DOM must be ready before creating components."),null;const u=document.createElement(r);i&&(u.className=i);let d={...t};const h=new Set,f=/\$\{([^}]+)\}/g;let p;for(;(p=f.exec(e))!==null;){const w=p[1].trim().split(".")[0];h.add(w)}const y=[],m=[],T={},B=()=>{let w=[],le=[];l&&(w=xA(u),le=$A(u)),u.textContent="";const Se=OA(e,d);u.appendChild(Se),Object.keys(n).forEach(Fe=>{const Ce=u.querySelectorAll(`[onclick="${Fe}"]`),An=n[Fe];Ce.forEach(Ts=>{Ts.removeAttribute("onclick"),typeof An=="function"&&Ts.addEventListener("click",An)})}),l&&(UA(u,w),HA(u,le)),y.forEach(Fe=>Fe({...d}))},j=w=>{if(!Array.isArray(w)||w.length===0)return;const le={props:{...d},changedKeys:w};m.forEach(Se=>Se(le))};for(const w of Object.keys(t))T[w]=[],Object.defineProperty(u,w,{get(){return d[w]},set(le){d[w]!==le&&(d[w]=le,h.has(w)&&B(),T[w].forEach(Se=>Se(le)),j([w]))},configurable:!0,enumerable:!0});if(u.update=w=>{let le=!1,Se=!1;const Fe=[];for(const Ce in w)w[Ce]!==d[Ce]&&(d[Ce]=w[Ce],h.has(Ce)&&(Se=!0),T[Ce]&&T[Ce].forEach(An=>An(w[Ce])),le=!0,Fe.push(Ce));le&&Se&&B(),Fe.length>0&&j(Fe)},u.onRender=w=>{typeof w=="function"&&y.push(w)},u.onAnyPropUpdated=w=>{typeof w=="function"&&m.push(w)},u.onPropUpdated=(w,le)=>{typeof le=="function"&&T[w]&&T[w].push(le)},u.dispose=()=>{a&&(Array.isArray(a)?a.forEach(w=>{typeof w=="function"&&w()}):typeof a=="function"&&a()),y.length=0,m.length=0;for(const w in T)T[w].length=0;u.remove()},B(),c&&s&&!s.contains(u)&&s.appendChild(u),typeof o=="function")try{o(u)}catch(w){_A("[createComponent]: Error in onMount handler of component",w)}return u};let Ls=null;const VA=(t,e=null)=>{if(Ls)return Ls;if(!t)return console.error("Auth UI: Parent element is required"),null;let n=null,s=null,r=10;typeof e=="number"&&(r=e);const i=El();return Ls=wl({initialProps:{isLoggedIn:i,userName:"Guest User",signingInDisplay:"none",loginBtnMarginRightPx:r},template:`
      <button style="margin-right: \${loginBtnMarginRightPx}px" id="goog-login-btn" class="login-btn" onclick="handleLogin" disabled>Login</button>
      <button id="goog-logout-btn" class="logout-btn" onclick="handleLogout" disabled>Logout</button>
      <span class="signing-in-indicator" style="display: \${signingInDisplay}; color: var(--text-secondary, #888); font-size: 0.9rem;">Signing in...</span>
      <div class="user-info">\${isLoggedIn ? 'Logged in: ' + userName : 'Logged out'}</div>
    `,handlers:{handleLogin:sm,handleLogout:rm},onMount:o=>{const a=c=>{const l=o.querySelector("#goog-login-btn"),u=o.querySelector("#goog-logout-btn");l&&u&&(l.disabled=c,u.disabled=!c)};a(i),n=vl(({isLoggedIn:c,userName:l})=>{H("[AuthComponent] Auth state changed:",{isLoggedIn:c,userName:l}),a(c),o.update({isLoggedIn:c,userName:l,signingInDisplay:"none"})}),s=vA(c=>{H("[AuthComponent] One Tap status:",c),c==="signing_in"?o.update({signingInDisplay:"inline-block"}):o.update({signingInDisplay:"none"})})},onCleanup:()=>{n&&(n(),n=null),s&&(s(),s=null),Ls=null},className:"auth-component",parent:t}),Ls},bl=t=>t?!0:(console.warn("Element not found. el.id: =>",t?.id??"(no id)","el: =>",t),console.trace(),!1),Sl=t=>{if(bl(t))return t.classList.contains("hidden")},A=t=>{bl(t)&&t.classList.contains("hidden")&&t.classList.remove("hidden")},E=t=>{bl(t)&&!t.classList.contains("hidden")&&t.classList.add("hidden")},im=t=>t.classList.contains("small-frame"),Hn=t=>{if(t&&!im(t)){t.classList.add("small-frame");const e=document.createElement("div");e.classList.add("small-frame-toggle-div");const n=document.createElement("span");n.classList.add("small-frame-toggle-icon"),n.textContent="❮",e.appendChild(n),t.appendChild(e),e.addEventListener("click",()=>{t.classList.contains("closed")?(t.classList.remove("closed"),e.classList.remove("closed"),n.classList.remove("closed")):(t.classList.add("closed"),e.classList.add("closed"),n.classList.add("closed"))})}},ut=t=>{if(im(t)){t.classList.remove("small-frame");const e=document.querySelector(".small-frame-close");e&&e.remove()}};function za(t){return document.pictureInPictureElement===t}function _o(t="room"){const e=new URL(window.location);e.searchParams.delete(t),window.history.replaceState({},"",e)}const W=t=>{const e=document.getElementById(t);return e||(console.warn(`Element with id: ${t} not found.`),null)};let nt=null,Jt=null,yo=null,Cl=null,Te=null,ee=null,te=null,G=null,V=null,be=null,Oe=null,xe=null,qe=null,bs=null,om=null,Ye=null,Eo=null,qt=null,Ss=null,Cs=null,Cn=null,Tl=null,Il=null,kl=null,Rl=null;function rh(){nt=W("lobby"),Jt=W("lobby-call-btn"),yo=W("title-auth-bar"),Cl=W("videos"),Te=W("local-video-el"),ee=W("local-video-box"),te=W("remote-video-el"),G=W("remote-video-box"),V=W("shared-video-el"),be=W("shared-video-box"),Oe=W("chat-controls"),xe=W("call-btn"),qe=W("hang-up-btn"),bs=W("switch-camera-btn"),Ye=W("mute-btn"),Eo=W("fullscreen-partner-btn"),qt=W("remote-pip-btn"),Ss=W("mic-btn"),Cs=W("camera-btn"),Cn=W("exit-watch-mode-btn"),Tl=W("app-pip-btn"),Il=W("app-title-h1"),kl=W("app-title-a"),Rl=W("app-title-span")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",rh):rh();const am=()=>({lobbyDiv:nt,lobbyCallBtn:Jt,titleAuthBar:yo,videosWrapper:Cl,localVideoEl:Te,localBoxEl:ee,remoteVideoEl:te,remoteBoxEl:G,sharedVideoEl:V,sharedBoxEl:be,chatControls:Oe,callBtn:xe,hangUpBtn:qe,switchCameraBtn:bs,installBtn:om,mutePartnerBtn:Ye,fullscreenPartnerBtn:Eo,remotePipBtn:qt,micBtn:Ss,cameraBtn:Cs,exitWatchModeBtn:Cn,appPipBtn:Tl,appTitleH1:Il,appTitleA:kl,appTitleSpan:Rl});function cm(t,e=3,n=100){return new Promise(s=>{let r=0;const i=()=>{const o=document.getElementById(t);if(o){s(o);return}if(r++,r>=e){console.warn(`Element ${t} not found after ${e} attempts`),s(null);return}setTimeout(i,n)};i()})}async function lm(t,e=3,n=100){const s={},r=t.map(async i=>{const o=await cm(i,e,n);return s[i]=o,o});return await Promise.all(r),s}async function jA(){const t=await lm(["searchBtn","searchQuery","searchResults"],5,200),e=document.querySelector(".search-section");t.searchContainer=e;const n=Object.entries(t).filter(([s,r])=>!r).map(([s])=>s);return n.length>0&&console.warn("Some YouTube elements not found:",n),t}const zA=Object.freeze(Object.defineProperty({__proto__:null,get appPipBtn(){return Tl},get appTitleA(){return kl},get appTitleH1(){return Il},get appTitleSpan(){return Rl},get callBtn(){return xe},get cameraBtn(){return Cs},get chatControls(){return Oe},get exitWatchModeBtn(){return Cn},get fullscreenPartnerBtn(){return Eo},getElements:am,get hangUpBtn(){return qe},initializeYouTubeElements:jA,installBtn:om,get lobbyCallBtn(){return Jt},get lobbyDiv(){return nt},get localBoxEl(){return ee},get localVideoEl(){return Te},get micBtn(){return Ss},get mutePartnerBtn(){return Ye},get remoteBoxEl(){return G},get remotePipBtn(){return qt},get remoteVideoEl(){return te},robustElementAccess:cm,get sharedBoxEl(){return be},get sharedVideoEl(){return V},get switchCameraBtn(){return bs},get titleAuthBar(){return yo},get videosWrapper(){return Cl},waitForElements:lm},Symbol.toStringTag,{value:"Module"})),ih="yt-video-box",Ga="yt-player-root";let q=null,St=!1;const zs=()=>q,GA=()=>St,um=t=>St=t,Wn=()=>{const t=document.getElementById(ih);if(!t)throw new Error(`Container #${ih} not found`);return t};function qA(){return new Promise(t=>{window.YT&&window.YT.Player?t():window.onYouTubeIframeAPIReady=()=>{t()}})}function dm(){const t=Wn();if(!document.getElementById(Ga)){const e=document.createElement("div");e.id=Ga,t.appendChild(e)}A(t)}function Di(){const t=Wn();E(t)}function Ko(){const t=Wn();return t&&!t.classList.contains("hidden")}function qa(t){return t?t.includes("youtube.com")||t.includes("youtu.be"):!1}function hm(t){if(!t)return null;const e=[/(?:youtube\.com\/watch\?v=)([\w-]+)/,/(?:youtu\.be\/)([\w-]+)/,/(?:youtube\.com\/embed\/)([\w-]+)/,/(?:youtube\.com\/shorts\/)([\w-]+)/];for(const n of e){const s=t.match(n);if(s&&s[1])return s[1]}return null}async function YA({url:t,onReady:e,onStateChange:n}){const s=hm(t);if(!s)throw new Error("Invalid YouTube URL");if(await qA(),q){try{q.destroy()}catch(o){console.warn("Error destroying previous YouTube player:",o)}q=null}const r=(o=!0)=>{const a=Wn(),c=q.getIframe();if(c&&a){try{a.tabIndex=-1,a.focus({preventScroll:!0})}catch{if(document.activeElement===c)try{c.blur()}catch{}}if(o){const l=u=>{if(u.code==="Space"){const d=Wn(),h=q.getIframe();if(document.activeElement===h||document.activeElement===d)return;u.preventDefault(),console.debug("Space pressed, refocusing iframe"),q.getPlayerState()!==window.YT.PlayerState.PLAYING?Pl():Nr()}};document.addEventListener("keydown",l,{once:!0})}}},i=()=>{const o=Wn(),a=q.getIframe();if(o&&a&&document.activeElement!==a)try{a.focus()}catch{}};return dm(),new Promise((o,a)=>{try{q=new window.YT.Player(Ga,{videoId:s,playerVars:{autoplay:1,mute:0,controls:1,fs:1,rel:0,modestbranding:1,disablekb:0,origin:window.location.origin},events:{onReady:c=>{St=!0,e&&e(c),o(q)},onStateChange:c=>{c.data===window.YT.PlayerState.ENDED&&r(!1),c.data===window.YT.PlayerState.PAUSED&&r(),c.data===window.YT.PlayerState.PLAYING&&i(),n&&n(c)},onError:c=>{console.error("YouTube player error:",c.data),a(new Error(`YouTube error: ${c.data}`))}}})}catch(c){a(c)}})}function Al(){if(q){try{Di(),q.destroy()}catch(t){console.warn("Error destroying YouTube player:",t)}q=null,St=!1}}function Pl(){q&&St&&q.playVideo()}function Nr(){q&&St&&q.pauseVideo()}function KA(t){q&&St&&q.seekTo(t,!0)}function Mi(){return q&&St?q.getCurrentTime():0}function Nl(){return q&&St?q.getPlayerState():-1}const Ot={UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5};let Ge=null,Lr=null,fm=!1,De="none",Ll=null;const is=()=>fm,pm=t=>fm=t,on=()=>De,JA=t=>{["yt","url","none"].includes(t)?De=t:console.warn("Invalid lastWatched platform:",t)};let Dt=!1,Gs=null,qs=0;async function Vn(t){if(!Ge)return;console.debug("Updating watch sync state, roomId:",Ge);const e=po(Ge);try{await un(e,{...t,updatedBy:Lr})}catch(n){console.error("Failed to update watch state:",n)}}function XA(t,e,n){if(!t)return;Ge=t,Lr=n;const s=po(t);Jr(s,QA,t),iP()}function QA(t){const e=t.val();e&&e.updatedBy!==Lr&&(Date.now()-qs<500||(e.url&&e.url!==Ll&&ZA(e.url),e.isYouTube?eP(e):rP(e)))}function ZA(t){Ll=t,qa(t)?(E(be),gm(t),De="yt"):(Al(),A(be),V.src=t,De="url")}function eP(t){!zs()||!GA()||(tP(t),nP(t))}function tP(t){const e=Nl(),n=e===Ot.PLAYING;if([Ot.BUFFERING,Ot.UNSTARTED].includes(e)){sP();return}Dt||(t.playing&&!n?(Pl(),De="yt"):!t.playing&&n&&(Nr(),De="yt"))}function nP(t){if(t.currentTime===void 0)return;const e=Mi();Math.abs(e-t.currentTime)>.3&&!Dt&&(KA(t.currentTime),setTimeout(()=>{t.playing?Pl():Nr(),De="yt"},500))}function sP(){Dt=!0,clearTimeout(Gs),Gs=setTimeout(async()=>{Dt=!1;const t=Nl()===Ot.PLAYING;await Vn({playing:t,currentTime:Mi()})},700)}function rP(t){t.playing!==void 0&&(t.playing&&V.paused?V.play().catch(e=>console.warn("Play failed:",e)):!t.playing&&!V.paused&&V.pause()),t.currentTime!==void 0&&Math.abs(V.currentTime-t.currentTime)>1&&(V.currentTime=t.currentTime,t.playing?V.play().catch(n=>console.warn("Play failed:",n)):V.pause())}function iP(){V.addEventListener("play",async()=>{!zs()&&Ge&&(qs=Date.now(),await Vn({playing:!0,isYouTube:!1})),De="url"}),V.addEventListener("pause",async()=>{!zs()&&Ge&&(qs=Date.now(),await Vn({playing:!1,isYouTube:!1})),De="url"}),V.addEventListener("seeked",async()=>{!zs()&&Ge&&(qs=Date.now(),await Vn({currentTime:V.currentTime,playing:!V.paused,isYouTube:!1})),De="url"})}async function oP(t){if(!t)return!1;if(qs=Date.now(),qa(t)){if(E(be),!await gm(t))return!1;De="yt"}else Al(),A(be),V.src=t,De="url";if(Ge){const e=po(Ge);Ae(e,{url:t,playing:!1,currentTime:0,isYouTube:qa(t),updatedBy:Lr})}return!0}async function Ya(t){if(!t||!t.url)return console.warn("Non-existing or invalid video."),!1;Ll=t.url;const e=await oP(t.url);return Ja(),e}async function gm(t){if(!hm(t))return console.error("Invalid YouTube URL:",t),!1;try{return await YA({url:t,onReady:n=>{if(um(!0),Ge){const s=po(Ge);Ae(s,{url:t,playing:!1,currentTime:0,isYouTube:!0,updatedBy:Lr})}},onStateChange:async n=>{if(!zs())return;const r=n.data===Ot.PLAYING,i=n.data===Ot.PAUSED;if(n.data===Ot.BUFFERING){Dt=!0,Gs&&clearTimeout(Gs),Gs=setTimeout(async()=>{Dt=!1;const c=Nl()===Ot.PLAYING;await Vn({playing:c,currentTime:Mi()})},700);return}i&&Dt||!Dt&&(r||i)&&await Vn({playing:r,currentTime:Mi()})}}),!0}catch(n){return console.error("Failed to load YouTube video:",n),!1}}function aP(t,{inactivityMs:e=3e3,listenTarget:n=document,onShow:s=null,onHide:r=null,hideOnEsc:i=!1,excludeEvents:o=["keydown"]}={}){if(!t)return()=>{};let a=null;const l=["pointermove","pointerdown","pointerup","touchstart","touchmove","mousemove","mousedown","keydown"].filter(m=>!Array.isArray(o)||!o.includes(m));function u(){A(t);try{typeof s=="function"&&s()}catch(m){console.warn("showHideOnInactivity onShow callback error:",m)}a&&clearTimeout(a),a=setTimeout(()=>{E(t);try{typeof r=="function"&&r()}catch(m){console.warn("showHideOnInactivity onHide callback error:",m)}a=null},e)}l.forEach(m=>n.addEventListener(m,u,{passive:!0}));function d(){if(document.hidden){a&&(clearTimeout(a),a=null);try{E(t)}catch(m){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",m)}}else u()}document.addEventListener("visibilitychange",d);function h(m){if(!m.relatedTarget){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(T){console.warn("showHideOnInactivity onHide (visibilitychange) callback error:",T)}}}n.addEventListener("mouseout",h);function f(m){if(i&&(m.key==="Escape"||m.key==="Esc")){a&&(clearTimeout(a),a=null),E(t);try{typeof r=="function"&&r()}catch(T){console.warn("showHideOnInactivity onHide (esc) callback error:",T)}}}document.addEventListener("keydown",f);function p(){a||u()}n.addEventListener("touchend",p,{passive:!0}),E(t);function y(){l.forEach(m=>n.removeEventListener(m,u)),document.removeEventListener("visibilitychange",d),n.removeEventListener("mouseout",h),n.removeEventListener("touchend",p),document.removeEventListener("keydown",f),a&&(clearTimeout(a),a=null)}return y}let dt=null,ht=null,mm="user";function Ka(){return mm}function _m(t){mm=t}function vo(){return dt instanceof MediaStream}function Ol(){return!dt||!(dt instanceof MediaStream)?(console.error("Invalid remote MediaStream accessed:",dt),null):dt}function ym(t){dt=t}function Em(){dt&&(dt.getTracks().forEach(t=>t.stop()),dt=null)}function vm(){return ht instanceof MediaStream}function wo(){return!ht||!(ht instanceof MediaStream)?(console.error("Invalid local MediaStream accessed:",ht),console.error("Call createLocalStream() before accessing local stream."),null):ht}function xi(t){ht=t}function wm(){ht&&(ht.getTracks().forEach(t=>t.stop()),ht=null)}const cP=Object.freeze(Object.defineProperty({__proto__:null,cleanupLocalStream:wm,cleanupRemoteStream:Em,getFacingMode:Ka,getLocalStream:wo,getRemoteStream:Ol,hasLocalStream:vm,hasRemoteStream:vo,setFacingMode:_m,setLocalStream:xi,setRemoteStream:ym},Symbol.toStringTag,{value:"Module"}));let dr=!1,Vr=!1,oh=null,ah=null,Ys=null;const bm=()=>dr;let Dl=()=>{if(!dr){if(!te||!vo()||te.paused||te.readyState<2){Vr||(Vr=!0,te.addEventListener("playing",()=>{Vr=!1,Dl()},{once:!0}));return}if(Vr=!1,dr=!0,A(G),A(ee),Hn(ee),E(nt),E(Jt),xe.disabled=!0,xe.classList.add("disabled"),qe.disabled=!1,qe.classList.remove("disabled"),Ye.disabled=!1,Ye.classList.remove("disabled"),qt.disabled=!1,qt.classList.remove("disabled"),Ys||(Ys=aP(Oe,{inactivityMs:2500,hideOnEsc:!0})),!oh){const t=()=>{is()?Hn(G):ut(G),A(G)};te.addEventListener("leavepictureinpicture",t),oh=()=>te.removeEventListener("leavepictureinpicture",t)}if(!ah){const t=()=>E(G);te.addEventListener("enterpictureinpicture",t),ah=()=>te.removeEventListener("enterpictureinpicture",t)}}},Sm=()=>{dr&&(dr=!1,ut(ee),E(ee),ut(G),E(G),xe.disabled=!1,xe.classList.remove("disabled"),A(Jt),qe.disabled=!0,qe.classList.add("disabled"),Ye.disabled=!0,Ye.classList.add("disabled"),qt.disabled=!0,qt.classList.add("disabled"),Ys&&(Ys(),Ys=null),A(nt),A(Oe))};const Ml=()=>{if(!vo())return!1;const t=Ol();return t&&t.getVideoTracks().length>0&&t.getVideoTracks()[0].enabled&&t.getVideoTracks()[0].readyState==="live"};function lP(){return"pictureInPictureEnabled"in document&&typeof document.pictureInPictureEnabled=="boolean"&&document.pictureInPictureEnabled}function Ja(){if(!is()){if(pm(!0),E(nt),E(Jt),Oe.classList.remove("bottom"),Oe.classList.add("watch-mode"),bm()?(E(xe),A(qe)):(E(qe),E(Ss),E(Ye),A(xe)),E(Cs),E(bs),A(Cn),A(Oe),!Ml()){E(G),ut(G),za(Te)||(A(ee),Hn(ee));return}E(ee),ut(ee),za(te)?(E(G),ut(G)):lP()?te.requestPictureInPicture().then(()=>{E(G),ut(G)}).catch(t=>{console.warn("Failed to enter Picture-in-Picture:",t),Hn(G),A(G)}):(Hn(G),A(G))}}function Ks(){is()&&(E(Cn),A(xe),A(qe),A(Ss),A(Ye),A(Cs),A(bs),Oe.classList.remove("watch-mode"),Oe.classList.add("bottom"),A(Oe),Ml()&&(za(te)&&document.exitPictureInPicture().catch(t=>{console.error("Failed to exit Picture-in-Picture:",t)}),ut(G),A(G)),bm()?(Hn(ee),A(ee)):(A(nt),A(Jt),ut(ee),E(ee)),pm(!1))}class jn{constructor(){this.logs=[],this.isEnabled=!0,this.maxLogs=1e3,this.sessionId=this.generateSessionId()}log(e,n,s={}){if(!this.isEnabled)return;const r={timestamp:performance.now(),sessionId:this.sessionId,category:e,event:n,data:{...s},id:this.generateLogId()};this.logs.push(r),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs)),typeof window<"u"&&window.location?.hostname==="localhost"&&console.log(`[DIAG] ${e}:${n}`,s)}logListenerAttachment(e,n,s,r={}){this.log("LISTENER","ATTACHED",{roomId:e,listenerType:n,currentCount:s,...r})}logListenerCleanup(e,n,s={}){this.log("LISTENER","CLEANUP",{removedCount:e.length,preservedCount:n.length,removedRoomIds:e,preservedRoomIds:n,...s})}logDuplicateListener(e,n,s={}){this.log("LISTENER","DUPLICATE_PREVENTED",{roomId:e,listenerType:n,...s})}logIncomingCallEvent(e,n,s,r={}){this.log("INCOMING_CALL","DETECTED",{callerId:e,roomId:n,isFresh:s.isFresh,validationMethod:s.method,age:s.age,reason:s.reason,...r})}logNotificationDecision(e,n,s,r={}){this.log("INCOMING_CALL","NOTIFICATION_DECISION",{decision:e,reason:n,roomId:s,...r})}logCallingUILifecycle(e,n,s={}){this.log("CALLING_UI",e,{roomId:n,...s})}logFirebaseOperation(e,n,s=null,r={}){this.log("FIREBASE","OPERATION",{operation:e,success:n,error:s?{message:s.message,code:s.code,stack:s.stack}:null,...r})}logFirebaseConnectionState(e,n={}){this.log("FIREBASE","CONNECTION_STATE",{state:e,...n})}logRoomCreation(e,n,s,r={}){this.log("ROOM","CREATED",{roomId:e,isInitiator:n,creationTime:s.creationTime,listenerAttachTime:s.listenerAttachTime,timeDiff:s.listenerAttachTime-s.creationTime,...r})}logMemberJoinEvent(e,n,s,r={}){this.log("ROOM","MEMBER_JOINED",{roomId:e,memberId:n,joinedAt:s.joinedAt,role:s.role,...r})}logContactSave(e,n,s={}){this.log("CONTACT","SAVED",{contactId:e,roomId:n,...s})}logContactCall(e,n,s,r={}){this.log("CONTACT","CALL_INITIATED",{contactId:e,roomId:n,forceInitiator:s,...r})}logFreshnessValidation(e,n,s,r={}){this.log("FRESHNESS","VALIDATION",{roomId:e,method:n,result:{isFresh:s.isFresh,age:s.age,threshold:s.threshold,reason:s.reason},...r})}logRaceCondition(e,n,s,r={}){this.log("RACE_CONDITION",e,{roomId:n,events:s,...r})}getLogs(e={}){let n=[...this.logs];return e.category&&(n=n.filter(s=>s.category===e.category)),e.event&&(n=n.filter(s=>s.event===e.event)),e.roomId&&(n=n.filter(s=>s.data.roomId===e.roomId)),e.since&&(n=n.filter(s=>s.timestamp>=e.since)),e.until&&(n=n.filter(s=>s.timestamp<=e.until)),n}getCallFlowTrace(e){return this.getLogs({roomId:e}).sort((n,s)=>n.timestamp-s.timestamp)}getListenerDiagnostics(e=null){const n=this.getLogs({category:"LISTENER"});return e?n.filter(s=>s.data.roomId===e):n}getFailureAnalysis(){const e=this.logs.filter(n=>n.category==="FIREBASE"&&n.data.success===!1||n.category==="INCOMING_CALL"&&n.data.decision==="REJECT"||n.category==="LISTENER"&&n.event==="DUPLICATE_PREVENTED");return{totalFailures:e.length,firebaseFailures:e.filter(n=>n.category==="FIREBASE").length,rejectedCalls:e.filter(n=>n.category==="INCOMING_CALL"&&n.data.decision==="REJECT").length,duplicateListeners:e.filter(n=>n.event==="DUPLICATE_PREVENTED").length,failures:e}}exportDiagnostics(){return{sessionId:this.sessionId,exportTime:Date.now(),logCount:this.logs.length,logs:[...this.logs],summary:this.getFailureAnalysis()}}exportLogsAsJSON(){return JSON.stringify(this.exportDiagnostics(),null,2)}downloadLogs(e=null){e||(e=`diagnostic-logs-${this.sessionId}-${Date.now()}.json`);const n=this.exportLogsAsJSON(),s=new Blob([n],{type:"application/json"}),r=document.createElement("a");r.href=URL.createObjectURL(s),r.download=e,r.click(),URL.revokeObjectURL(r.href)}getLogsInTimeRange(e,n){return this.logs.filter(s=>s.timestamp>=e&&s.timestamp<=n)}getLogsSince(e){return this.logs.filter(n=>n.timestamp>=e)}clearOldLogs(e=1440*60*1e3){const n=Date.now()-e;this.logs=this.logs.filter(s=>s.timestamp>=n)}clearLogs(){this.logs=[]}persistLogs(){try{const e=`diagnostic-logs-${this.sessionId}`;return localStorage.setItem(e,this.exportLogsAsJSON()),e}catch(e){return console.warn("Failed to persist logs to localStorage:",e),null}}loadPersistedLogs(e){try{const n=localStorage.getItem(e);if(n){const s=JSON.parse(n);if(s.logs&&Array.isArray(s.logs)){const r=new Set(this.logs.map(o=>o.id)),i=s.logs.filter(o=>!r.has(o.id));return this.logs=[...this.logs,...i].sort((o,a)=>o.timestamp-a.timestamp),i.length}}return 0}catch(n){return console.warn("Failed to load persisted logs:",n),0}}static getPersistedLogKeys(){const e=[];for(let n=0;n<localStorage.length;n++){const s=localStorage.key(n);s&&s.startsWith("diagnostic-logs-")&&e.push(s)}return e}static cleanupPersistedLogs(e=1440*60*1e3){const n=Date.now()-e;jn.getPersistedLogKeys().forEach(r=>{try{const i=localStorage.getItem(r);if(i){const o=JSON.parse(i);o.exportTime&&o.exportTime<n&&localStorage.removeItem(r)}}catch{localStorage.removeItem(r)}})}enable(){this.isEnabled=!0}disable(){this.isEnabled=!1}generateSessionId(){return`session_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}generateLogId(){return`log_${performance.now()}_${Math.random().toString(36).substr(2,9)}`}formatTimestamp(e){return new Date(e).toISOString()}startTiming(e){const n=`timing_${e}_${Date.now()}`;return this.log("TIMING","START",{operation:e,timingId:n}),n}endTiming(e,n={}){const s=this.logs.find(r=>r.category==="TIMING"&&r.event==="START"&&r.data.timingId===e);if(s){const r=Date.now()-s.timestamp;return this.log("TIMING","END",{timingId:e,duration:r,operation:s.data.operation,...n}),r}return null}}let Jo=null;function _(){return Jo||(Jo=new jn),Jo}typeof window<"u"&&(window.diagnosticLogger={getInstance:()=>_(),exportLogs:()=>{const e=_().exportLogsAsJSON();return console.log("Diagnostic logs exported:"),console.log(e),e},downloadLogs:t=>{_().downloadLogs(t),console.log("Diagnostic logs downloaded")},getRoomLogs:t=>{const n=_().getCallFlowTrace(t);return console.log(`Logs for room ${t}:`,n),n},getFailures:()=>{const e=_().getFailureAnalysis();return console.log("Failure analysis:",e),e},getListenerDiagnostics:t=>{const n=_().getListenerDiagnostics(t);return console.log("Listener diagnostics:",n),n},getLogsSince:t=>{const n=_().getLogsSince(t);return console.log(`Logs since ${new Date(t).toISOString()}:`,n),n},getLogsInRange:(t,e)=>{const s=_().getLogsInTimeRange(t,e);return console.log(`Logs from ${new Date(t).toISOString()} to ${new Date(e).toISOString()}:`,s),s},persistLogs:()=>{const e=_().persistLogs();return console.log(`Logs persisted with key: ${e}`),e},loadPersistedLogs:t=>{const n=_().loadPersistedLogs(t);return console.log(`Loaded ${n} persisted logs`),n},getPersistedKeys:()=>{const t=jn.getPersistedLogKeys();return console.log("Persisted log keys:",t),t},clearLogs:()=>{_().clearLogs(),console.log("Diagnostic logs cleared")},enable:()=>{_().enable(),console.log("Diagnostic logging enabled")},disable:()=>{_().disable(),console.log("Diagnostic logging disabled")},getSessionInfo:()=>{const t=_(),e={sessionId:t.sessionId,logCount:t.logs.length,isEnabled:t.isEnabled,maxLogs:t.maxLogs};return console.log("Session info:",e),e},help:()=>{console.log(`
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
      `)}},window.addEventListener("beforeunload",()=>{try{const t=_();t.logs.length>0&&t.persistLogs(),jn.cleanupPersistedLogs()}catch{}}),(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&setTimeout(()=>{try{const t=_(),e=typeof localStorage<"u"&&localStorage.getItem("debug:console")==="1";if(!t.isEnabled||!e)return;const n=jn.getPersistedLogKeys();n.length>0&&(console.log(`Found ${n.length} persisted diagnostic log sessions. Use diagnosticLogger.loadPersistedLogs(key) to load them.`),console.log("Available keys:",n))}catch{}},1e3));class uP{constructor(){this.currentRoomId=null}async createNewRoom(e,n,s=null){const r=Date.now();s||(s=Math.random().toString(36).substring(2,15)),_().log("ROOM","CREATE_START",{roomId:s,userId:n,hasOffer:!!e,timestamp:r});const i=Qt(s);try{return await Ae(i,{offer:{type:e.type,sdp:e.sdp},createdAt:Date.now(),createdBy:n}),_().logFirebaseOperation("create_room",!0,null,{roomId:s,userId:n,duration:Date.now()-r}),await this.joinRoom(s,n),_().log("ROOM","CREATE_COMPLETE",{roomId:s,userId:n,totalDuration:Date.now()-r}),s}catch(o){throw _().logFirebaseOperation("create_room",!1,o,{roomId:s,userId:n,duration:Date.now()-r}),o}}async checkRoomStatus(e){const n=Qt(e),s=await Ze(n);if(!s.exists())return{exists:!1,hasMembers:!1,memberCount:0};const r=s.val(),i=r.members||{},o=Object.keys(i).length;return{exists:!0,hasMembers:o>0,memberCount:o,roomData:r}}async getRoomData(e){const n=Qt(e),s=await Ze(n);if(!s.exists())throw new Error("Room does not exist");return s.val()}async saveAnswer(e,n){const s=Qt(e);await un(s,{answer:n})}async joinRoom(e,n,s="Guest User"){const r=Hd(e,n);await Ae(r,{displayName:s,joinedAt:Date.now()}),_().logFirebaseOperation("set","joinRoom",`rooms/${e}/members/${n}`)}async leaveRoom(e,n=null,{deleteRoomIfEmpty:s=!0}={}){const r=n||this.currentRoomId;if(!r||!e)return;const i=Hd(r,e),o=Hr(r),a=Qt(r);try{await bn(i)}catch(c){_().logFirebaseOperation("leave_room_remove_member",!1,c,{roomId:r,userId:e})}if(s)try{const c=await Ze(o),l=c.exists()?c.val():{};(l?Object.keys(l).length:0)===0&&await bn(a).catch(d=>{_().logFirebaseOperation("delete_empty_room",!1,d,{roomId:r})})}catch(c){_().logFirebaseOperation("check_members_after_leave",!1,c,{roomId:r})}(!n||n===this.currentRoomId)&&(this.currentRoomId=null)}async rejectCall(e,n,s="user_rejected"){if(!e||!n)return;const r=Qt(e),i={rejection:{by:n,reason:s,at:Date.now()}};try{await un(r,i),_().log("ROOM","REJECT_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw _().log("ROOM","REJECT_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}async cancelCall(e,n,s="caller_cancelled"){if(!e||!n)return;const r=Qt(e),i={cancellation:{by:n,reason:s,at:Date.now()}};try{await un(r,i),_().log("ROOM","CANCEL_SET",{roomId:e,byUserId:n,reason:s})}catch(o){throw _().log("ROOM","CANCEL_SET_FAILED",{roomId:e,byUserId:n,reason:s,error:String(o?.message||o)}),o}}onCallCancelled(e,n){const s=mk(e);rn(s,"value",n,e),_().logFirebaseOperation("on","onCallCancelled",`rooms/${e}/cancellation`,{event:"value"})}onMemberJoined(e,n){const s=Hr(e);rn(s,"child_added",n,e),_().logFirebaseOperation("on","onMemberJoined",`rooms/${e}/members`,{event:"child_added"})}onMemberLeft(e,n){const s=Hr(e);rn(s,"child_removed",n,e),_().logFirebaseOperation("on","onMemberLeft",`rooms/${e}/members`,{event:"child_removed"})}onIncomingCall(e,n,s){const r=Hr(e),i=a=>{s("join",a.key,a.val())},o=a=>{s("leave",a.key,a.val())};return rn(r,"child_added",i,e,n),rn(r,"child_removed",o,e,n),()=>gk(n,e)}get roomId(){return this.currentRoomId}}const X=new uP;class dP{constructor(e,{loop:n=!1,volume:s=.5}={}){this.src=e,this.audio=new Audio(e),this.audio.loop=n,this.audio.volume=Math.max(0,Math.min(1,s)),this.isPlaying=!1,this.audio.onerror=r=>{console.error(`[AudioPlayer] Failed to load audio: ${e}`,r),this.isPlaying=!1},this.audio.onplay=()=>{this.isPlaying=!0},this.audio.onpause=()=>{this.isPlaying=!1},this.audio.onended=()=>{this.isPlaying=!1}}async play(){if(!this.audio)return!1;if(this.isPlaying)return!0;try{return await this.audio.play(),this.isPlaying=!0,!0}catch(e){return e.name==="NotAllowedError"?console.warn("[AudioPlayer] Autoplay blocked - user interaction required first",{src:this.src}):e.name==="NotSupportedError"?console.error("[AudioPlayer] Audio format not supported",{src:this.src}):console.error("[AudioPlayer] Playback error:",e),this.isPlaying=!1,!1}}stop(){this.audio&&(this.audio.pause(),this.audio.currentTime=0,this.isPlaying=!1)}pause(){this.audio&&(this.audio.pause(),this.isPlaying=!1)}setVolume(e){this.audio&&(this.audio.volume=Math.max(0,Math.min(1,e)))}getVolume(){return this.audio?.volume??0}dispose(){this.stop(),this.audio&&(this.audio.onerror=null,this.audio.onplay=null,this.audio.onpause=null,this.audio.onended=null,this.audio.src="",this.audio=null),this.isPlaying=!1}}class hP{constructor({incomingSrc:e,outgoingSrc:n,volume:s}={}){this.incomingSrc=e??"/sounds/incoming.mp3",this.outgoingSrc=n??"/sounds/outgoing.mp3",this.defaultVolume=s??.7,this.currentPlayer=null,this.currentType=null}configure({incomingSrc:e,outgoingSrc:n,volume:s}={}){e!==void 0&&(this.incomingSrc=e),n!==void 0&&(this.outgoingSrc=n),s!==void 0&&(this.defaultVolume=s)}setIncomingRingtone(e){this.incomingSrc=e}setOutgoingRingtone(e){this.outgoingSrc=e}setVolume(e){this.defaultVolume=Math.max(0,Math.min(1,e))}async playIncoming(){return this._play("incoming",this.incomingSrc)}async playOutgoing(){return this._play("outgoing",this.outgoingSrc)}async _play(e,n){this.stop();try{this.currentPlayer=new dP(n,{loop:!0,volume:this.defaultVolume}),this.currentType=e;const s=await this.currentPlayer.play();return s?console.log(`[Ringtone] Playing ${e} ringtone`):(console.warn(`[Ringtone] Failed to start ${e} ringtone (likely autoplay blocked)`),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null),s}catch(s){return console.error(`[Ringtone] Error playing ${e} ringtone:`,s),this.currentPlayer?.dispose(),this.currentPlayer=null,this.currentType=null,!1}}stop(){this.currentPlayer&&(console.log(`[Ringtone] Stopping ${this.currentType} ringtone`),this.currentPlayer.stop(),this.currentPlayer.dispose(),this.currentPlayer=null,this.currentType=null)}isPlaying(){return this.currentPlayer?.isPlaying??!1}getCurrentType(){return this.currentType}}const zn=new hP,Fi=3e4;let ot=null,xs=null;async function fP(t,e=null){const n=fe(),s=Q();if(!s)return;const r=cl(s);await Ae(r,{roomId:t,targetContactName:e,initiatedAt:Date.now(),callerUserId:n})}async function Ui(){const t=Q();if(!t)return;const e=cl(t);await bn(e).catch(()=>{})}async function Cm(t,e){if(!t)return!1;try{const n=cl(t),s=await Ze(n);if(!s.exists())return!1;const r=s.val();return r.roomId!==e?!1:Date.now()-r.initiatedAt<Fi}catch(n){return console.warn("Failed to check outgoing call freshness",n),!1}}async function Tm(t){if(!t)return!1;try{const e=N(D,`rooms/${t}/createdAt`),n=await Ze(e);if(!n.exists())return!1;const s=n.val();return typeof s!="number"?!1:Date.now()-s<Fi}catch(e){return console.warn("Failed to check room freshness",e),!1}}async function Im(t,e,n){const s=_(),r=Date.now();$t(),await fP(t,e);const i=document.createElement("div");i.id="calling-modal",i.style.cssText=`
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
  `;const u=async()=>{s.logCallingUILifecycle("CANCEL",t,{contactName:e,reason:"user_cancelled",duration:Date.now()-r});try{await Promise.all([Ui(),X.cancelCall(t,fe(),"caller_cancelled"),X.leaveRoom(fe(),t)])}catch(d){s.log("ROOM","CALLER_CANCELLED_CLEANUP_FAIL",{roomId:t,error:String(d)})}zn.stop(),$t()};l.onclick=u,o.appendChild(a),o.appendChild(c),o.appendChild(l),i.appendChild(o),document.body.appendChild(i),i.dataset.roomId=t,ot=i,zn.playOutgoing(),xs=setTimeout(async()=>{s.logCallingUILifecycle("TIMEOUT",t,{contactName:e,reason:"auto_timeout",duration:Date.now()-r,timeoutMs:Fi});try{await Promise.all([Ui(),X.cancelCall(t,fe(),"auto_timeout"),X.leaveRoom(fe(),t)])}catch(d){s.log("ROOM","CALLER_TIMEOUT_CLEANUP_FAIL",{roomId:t,error:String(d)})}zn.stop(),$t()},Fi)}function $t(){if(zn.stop(),ot){const t=ot.dataset?.roomId||"unknown";_().logCallingUILifecycle("HIDE",t,{reason:"hide_called",hadTimeout:!!xs,timestamp:Date.now()})}xs&&(clearTimeout(xs),xs=null),ot&&(ot.remove(),ot=null)}async function xl(){if(ot){const t=ot.dataset?.roomId||"unknown";_().logCallingUILifecycle("ANSWERED",t,{reason:"call_answered",timestamp:Date.now()})}await Ui(),$t()}async function pP(t="user_rejected"){const e=_(),n=ot?.dataset?.roomId||"unknown";e.logCallingUILifecycle("REJECTED",n,{reason:t,timestamp:Date.now()}),await Ui(),$t()}const gP=Object.freeze(Object.defineProperty({__proto__:null,hideCallingUI:$t,isOutgoingCallFresh:Cm,isRoomCallFresh:Tm,onCallAnswered:xl,onCallRejected:pP,showCallingUI:Im},Symbol.toStringTag,{value:"Module"}));let Gn=null;function Fl(t,e={}){return new Promise(n=>{const s=document.createElement("dialog");s.innerHTML=`
      <p>${t}</p>
      <div class="confirm-dialog-actions">
        <button data-action="cancel">Cancel</button>
        <button data-action="confirm" autofocus>Confirm</button>
      </div>
    `,s.classList.add("confirm-dialog");const r=s.querySelector('[data-action="confirm"]'),i=s.querySelector('[data-action="cancel"]');if(!r||!i){console.error("dialog element not found!"),n(!1);return}let o=null;function a(c){o&&clearTimeout(o),s.close(),s.remove(),Gn===a&&(Gn=null),n(c)}r.addEventListener("click",()=>{a(!0)}),i.addEventListener("click",()=>{a(!1)}),s.addEventListener("cancel",()=>a(!1)),document.body.appendChild(s),s.showModal(),Gn=a,e.autoRemoveSeconds&&typeof e.autoRemoveSeconds=="number"&&e.autoRemoveSeconds>0&&(o=setTimeout(()=>{a(!1)},e.autoRemoveSeconds*1e3))})}function mP(){if(typeof Gn=="function"){try{Gn(!1)}catch{}return Gn=null,!0}return!1}const _P=Object.freeze(Object.defineProperty({__proto__:null,default:Fl,dismissActiveConfirmDialog:mP},Symbol.toStringTag,{value:"Module"}));class yP{async send(e,n){throw new Error("MessagingTransport.send() must be implemented by subclass")}listen(e,n){throw new Error("MessagingTransport.listen() must be implemented by subclass")}async getUnreadCount(e){throw new Error("MessagingTransport.getUnreadCount() must be implemented by subclass")}async markAsRead(e){throw new Error("MessagingTransport.markAsRead() must be implemented by subclass")}listenToUnreadCount(e,n){throw new Error("MessagingTransport.listenToUnreadCount() must be implemented by subclass")}}const ch=100;class EP extends yP{_getConversationId(e,n){return[e,n].sort().join("_")}async send(e,n){const s=Q();if(!s)throw new Error("Cannot send message: not logged in");const i=nm()?.displayName||"Guest User",o=this._getConversationId(s,e),a=Ii(N(D,`conversations/${o}/messages`));await Ae(a,{text:n,from:s,fromName:i,sentAt:dn(),read:!1}),this._cleanupOldMessages(o).catch(c=>{console.warn("[RTDBTransport] Failed to cleanup old messages:",c)})}listen(e,n){const s=Q();if(!s)return console.warn("[RTDBTransport] Cannot listen to messages: not logged in"),()=>{};const r=this._getConversationId(s,e),i=N(D,`conversations/${r}/messages`),o=new Set,a=c=>{const l=c.key,u=c.val();if(!u||o.has(l))return;o.add(l);const d=u.from===s;n(u.text,u,d)};return ki(i,a),()=>{_t(i,"child_added",a)}}async getUnreadCount(e){const n=Q();if(!n)return 0;const s=this._getConversationId(n,e),r=N(D,`conversations/${s}/messages`),{get:i}=await Xe(async()=>{const{get:o}=await Promise.resolve().then(()=>TI);return{get:o}},void 0);try{const o=await i(r);if(!o.exists())return 0;const a=o.val();return Object.values(a).filter(c=>!c.read&&c.from===e).length}catch(o){return console.warn("[RTDBTransport] Failed to get unread count:",o),0}}async markAsRead(e){const n=Q();if(!n)return;const s=this._getConversationId(n,e),r=N(D,`conversations/${s}/messages`);try{const i=await Ze(r);if(!i.exists())return;const o=i.val(),a={};Object.entries(o).forEach(([c,l])=>{!l.read&&l.from===e&&(a[`conversations/${s}/messages/${c}/read`]=!0)}),Object.keys(a).length>0&&await un(N(D),a)}catch(i){console.warn("[RTDBTransport] Failed to mark messages as read:",i)}}listenToUnreadCount(e,n){const s=Q();if(!s)return console.warn("[RTDBTransport] Cannot listen to unread count: not logged in"),()=>{};const r=this._getConversationId(s,e),i=N(D,`conversations/${r}/messages`),o=async()=>{try{const l=await this.getUnreadCount(e);n(l)}catch(l){console.warn("[RTDBTransport] Failed to get unread count:",l)}},a=async l=>{const u=l.val();u&&u.from===e&&!u.read&&await o()},c=async l=>{const u=l.val();u&&u.from===e&&await o()};return ki(i,a),Xp(i,c),()=>{_t(i,"child_added",a),_t(i,"child_changed",c)}}async _cleanupOldMessages(e){const n=N(D,`conversations/${e}/messages`),s=await Ze(n);if(!s.exists())return;const r=s.val(),i=Object.keys(r).length;if(i<=ch)return;const o=i-ch,a=Object.entries(r).sort((l,u)=>(l[1].sentAt||0)-(u[1].sentAt||0)),c={};for(let l=0;l<o;l++){const[u]=a[l];c[`conversations/${e}/messages/${u}`]=null}await un(N(D),c),console.log(`[RTDBTransport] Cleaned up ${o} old messages from conversation ${e}`)}}class vP{constructor(e){if(!e)throw new Error("MessagingController requires a transport implementation");this.transport=e,this.sessions=new Map}openSession(e,{onMessage:n,onUnreadChange:s}={}){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(this.sessions.has(e))return console.warn(`[MessagingController] Session already open for ${e}`),this.sessions.get(e);const r=this.transport.listen(e,(o,a,c)=>{n&&typeof n=="function"&&n(o,a,c),!c&&s&&typeof s=="function"&&this.transport.getUnreadCount(e).then(l=>s(l)).catch(l=>console.warn("[MessagingController] Failed to get unread count:",l))}),i={contactId:e,send:o=>!o||typeof o!="string"?Promise.reject(new Error("Message text must be a non-empty string")):this.transport.send(e,o),markAsRead:()=>this.transport.markAsRead(e),getUnreadCount:()=>this.transport.getUnreadCount(e),close:()=>{this.closeSession(e)},_unsubscribe:r};return this.sessions.set(e,i),i}closeSession(e){const n=this.sessions.get(e);n&&(n._unsubscribe&&typeof n._unsubscribe=="function"&&n._unsubscribe(),this.sessions.delete(e))}getSession(e){return this.sessions.get(e)}getAllSessions(){return Array.from(this.sessions.values())}closeAllSessions(){this.sessions.forEach(e=>{e._unsubscribe&&typeof e._unsubscribe=="function"&&e._unsubscribe()}),this.sessions.clear()}async getUnreadCount(e){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");return this.transport.getUnreadCount(e)}listenToUnreadCount(e,n){if(!e||typeof e!="string")throw new Error("contactId must be a non-empty string");if(typeof n!="function")throw new Error("onCountChange must be a function");return this.transport.listenToUnreadCount(e,n)}}const Js=new vP(new EP);function $i(t,e,n={}){if(!t||typeof e!="function")throw new Error("closeOnClickOutside: valid element and onClose callback required");const{ignore:s=[],esc:r=!0,events:i=["mousedown","touchstart"]}=n,o=Array.isArray(s)?s.filter(Boolean):[],a=l=>{try{const u=l.target;if(t.contains(u))return;for(const d of o)if(d&&d.contains&&d.contains(u)||d===u)return;e(l)}catch(u){console.error("closeOnClickOutside handler error:",u)}},c=l=>{r&&l.key==="Escape"&&e(l)};return i.forEach(l=>document.addEventListener(l,a,{passive:!0})),r&&document.addEventListener("keydown",c),function(){i.forEach(u=>document.removeEventListener(u,a,{passive:!0})),r&&document.removeEventListener("keydown",c)}}function km({parent:t,onToggle:e,icon:n="💬",initialUnreadCount:s=0,id:r=null,startHidden:i=!1}={}){if(!t)return console.error("createMessageToggle: parent element is required"),null;if(typeof e!="function")return console.error("createMessageToggle: onToggle callback is required"),null;const o=wl({initialProps:{unreadCount:s},template:`
      <div class="messages-toggle-btn">
        <button onclick="handleToggle">
          ${n}
          <span class="notification-badge">
            \${unreadCount}
          </span>
        </button>
      </div>
    `,handlers:{handleToggle:c=>{c.preventDefault(),c.stopPropagation(),e()}},className:"messages-toggle-container"+(i?" hidden":""),autoAppend:!1});if(r&&o&&typeof r=="string")try{o.id=r}catch(c){console.warn("createMessageToggle: failed to set id on toggleContainer",c)}let a=o.querySelector(".notification-badge");return a&&(a.style.display=s>0?"flex":"none"),o.onPropUpdated("unreadCount",c=>{const l=o.querySelector(".notification-badge");if(l&&(l.style.display=c>0?"flex":"none"),c>0){const u=o.querySelector(".messages-toggle-btn");u&&(u.classList.add("new-message"),setTimeout(()=>{u.classList.remove("new-message")},4e3))}}),t.appendChild(o),{element:o,setUnreadCount(c){let l=Number(c);(!Number.isFinite(l)||l<0)&&(l=0),o.unreadCount=l},clearBadge(){this.setUnreadCount(0)},cleanup(){if(o&&typeof o.dispose=="function")try{o.dispose()}catch(c){console.warn("createMessageToggle: error during dispose()",c)}if(o&&o.parentNode)try{o.parentNode.removeChild(o)}catch{}}}}function lh(){if(typeof window>"u"||typeof navigator>"u")return!1;const t=navigator.userAgent||navigator.vendor||"",e=/iPad|iPhone|iPod/.test(t),n=/Macintosh/.test(t)&&typeof navigator.maxTouchPoints=="number"&&navigator.maxTouchPoints>1,s=(e||n)&&!window.MSStream,r=/Android/i.test(t),i=s||r;return console.table({"User Agent":t,isAndroid:r,isiOSUA:e,isiPadOSDesktopUA:n,isMobileDevice:i}),i}function wP(){const t=document.createElement("div");t.innerHTML=`
    <div id="messages-box" class="messages-box hidden">
      <div id="messages"></div>
      <form id="messages-form">
        <input id="messages-input" placeholder="Type a message...">
        <button type="submit">Send</button>
      </form>
    </div>
  `,document.body.appendChild(t);const e=t.querySelector("#messages-box"),n=t.querySelector("#messages"),s=t.querySelector("#messages-form"),r=t.querySelector("#messages-input");return"virtualKeyboard"in navigator&&(navigator.virtualKeyboard.overlaysContent=!0),{messagesBoxContainer:t,messagesBox:e,messagesMessages:n,messagesForm:s,messagesInput:r}}const bP=CSS.supports?.("position-anchor: --msg-toggle")&&CSS.supports?.("right: anchor(right)")&&CSS.supports?.("bottom: anchor(top)");function SP(t){const e=t.getBoundingClientRect();return e.top>=0&&e.left>=0&&e.bottom<=window.innerHeight&&e.right<=window.innerWidth}function CP(){let t=!1,e=null;const n=document.querySelector(".top-bar .top-right-menu")||document.querySelector(".top-right-menu"),s=km({parent:n,onToggle:()=>B(),icon:"💬",initialUnreadCount:0,id:"main-messages-toggle-btn",startHidden:!0});if(!s)return console.error("Messages UI: failed to initialize message toggle; aborting messages UI initialization."),null;const r=s.element,{messagesBoxContainer:i,messagesBox:o,messagesMessages:a,messagesForm:c,messagesInput:l}=wP();if(!r||!o||!a||!c||!l)return console.error("Messages UI elements not found."),null;function u(){if(!r||!o||o.classList.contains("hidden"))return;const F=r.getBoundingClientRect(),de=o.getBoundingClientRect(),zl=8;let So=F.top-de.height-zl;So<8&&(So=F.bottom+zl);let Is=F.left+F.width/2-de.width/2;const Gl=window.innerWidth-de.width-8;Is<8&&(Is=8),Is>Gl&&(Is=Gl),o.style.top=`${Math.round(So)}px`,o.style.left=`${Math.round(Is)}px`}function d(){t||(t=!0,window.addEventListener("resize",u,{passive:!0}),window.addEventListener("scroll",u,{passive:!0}),window.addEventListener("orientationchange",u,{passive:!0}))}function h(){t&&(t=!1,window.removeEventListener("resize",u),window.removeEventListener("scroll",u),window.removeEventListener("orientationchange",u))}const f=new MutationObserver(F=>{F.forEach(de=>{de.type==="attributes"&&de.attributeName==="class"&&(o.classList.contains("hidden")||(s.clearBadge(),e?.toggle&&e.toggle.clearBadge()))})});f.observe(o,{attributes:!0});function p(){return!o.classList.contains("hidden")}function y(){return document.activeElement===l}function m(){y()||l.focus()}function T(){y()&&l.blur()}function B(){o.classList.toggle("hidden"),p()?(lh()||l.focus(),bP?requestAnimationFrame(()=>{SP(o)||(u(),d())}):(u(),d()),Fe()):(document.activeElement===l&&l.blur(),h(),o.style.top="",o.style.left="",o.style.bottom="",o.style.right="")}lh()||$i(o,()=>{E(o),h(),o.style.top="",o.style.left="",o.style.bottom="",o.style.right=""},{ignore:[s.element],esc:!0});function j(){A(s.element)}function w(){E(s.element)}function le(F){const de=document.createElement("p");de.textContent=F,F.startsWith("You:")?de.style.textAlign="right":F.startsWith("Partner:")&&(de.style.textAlign="left"),a.appendChild(de),Fe()}let Se=null;function Fe(){a&&(Se!==null&&cancelAnimationFrame(Se),Se=requestAnimationFrame(()=>{a.scrollTop=a.scrollHeight,Se=null}))}function Ce(F){if(le(`Partner: ${F}`),Sl(o)){const de=s.element.unreadCount||0;s.setUnreadCount(de+1)}}c.addEventListener("submit",F=>{F.preventDefault();const de=l.value.trim();de&&(e?(e.send(de),l.value=""):console.warn("[MessagesUI] No active session to send message"))});const An=()=>{const F=document.activeElement;return F&&(F.tagName==="INPUT"||F.tagName==="TEXTAREA"||F.isContentEditable)},Ts=F=>{(F.key==="m"||F.key==="M")&&!p()&&!An()&&(F.preventDefault(),B())};document.addEventListener("keydown",Ts);function jl(){a.innerHTML="",a.scrollTop=0}function Hm(F){e!==null&&e!==F&&jl(),e=F}function Wm(){return e}function Vm(){s&&s.cleanup(),h(),f.disconnect(),document.removeEventListener("keydown",Ts),i&&i.parentNode&&i.parentNode.removeChild(i)}return{appendChatMessage:le,receiveMessage:Ce,isMessagesUIOpen:p,toggleMessages:B,showMessagesToggle:j,hideMessagesToggle:w,isMessageInputFocused:y,focusMessageInput:m,unfocusMessageInput:T,setSession:Hm,getCurrentSession:Wm,clearMessages:jl,cleanup:Vm}}const rt=CP(),Xo=new Map,Qo=new Map,Mn=new Map,uh=14;async function dh(t,e,n){const s=Q();if(s){const r=N(D,`users/${s}/contacts/${t}`);await Ae(r,{contactId:t,contactName:e,roomId:n,savedAt:Date.now()});return}try{const r=localStorage.getItem("contacts")||"{}",i=JSON.parse(r);i[t]={contactId:t,contactName:e,roomId:n,savedAt:Date.now()},localStorage.setItem("contacts",JSON.stringify(i))}catch(r){console.warn("Failed to save contact to localStorage",r)}}async function hr(){const t=Q();if(t)try{const e=N(D,`users/${t}/contacts`),n=await Ze(e);return n.exists()?n.val():{}}catch(e){return console.warn("Failed to read contacts from RTDB",e),{}}try{const e=localStorage.getItem("contacts")||"{}";return JSON.parse(e)}catch(e){return console.warn("Failed to read contacts from localStorage",e),{}}}async function TP(t,e){if(!t)return e||"Unknown";try{const n=await hr();for(const s of Object.values(n||{}))if(s?.roomId===t)return s.contactName||s.contactId||e}catch(n){console.warn("Failed to resolve caller name",n)}return e||"Unknown"}async function IP(t,e,n){if(!t||!e)return;const r=(await hr())?.[t];if(r){r.roomId!==e&&(await dh(t,r.contactName,e),await fr(n)),os(e);return}if(!await Fl("Save contact?",{autoRemoveSeconds:15}))return;const o=window.prompt("Enter a name for this contact:",t)||t;await dh(t,o,e),os(e),await fr(n)}async function fr(t){if(!t)return;const e=await hr(),n=Object.keys(e);let s=t.querySelector(".contacts-container");if(s||(s=document.createElement("div"),s.className="contacts-container",t.appendChild(s)),n.length===0){s.innerHTML="<p>No saved contacts yet.</p>",E(s);return}A(s),s.innerHTML=`
    <h3>Contacts</h3>
    <div class="contacts-list">
      ${n.map(r=>{const i=e[r];return`
            <div class="contact-entry">
              <div class="contact-msg-toggle-container" data-contact-id="${r}"></div>
              <span
                class="contact-name"
                data-room-id="${i.roomId}"
                data-contact-name="${i.contactName}"
                data-contact-id="${r}"
                title="Call ${i.contactName}"
              >
                <span class="presence-indicator" data-contact-id="${r}"></span>
                <i class="fa fa-phone"></i>
                ${i.contactName&&i.contactName.length>uh?i.contactName.slice(0,uh-2)+"..":i.contactName}
              </span>
              <button
                class="contact-delete-btn"
                data-contact-id="${r}"
                title="Delete contact"
              >
                ✕
              </button>
            </div>
          `}).join("")}
    </div>
  `,kP(s,t),RP(n),await AP(s,n,e)}function kP(t,e){t.querySelectorAll(".contact-message-btn").forEach(n=>{n.onclick=s=>{s.stopPropagation();const r=n.getAttribute("data-contact-id"),i=n.getAttribute("data-contact-name");r&&Rm(r,i)}}),t.querySelectorAll(".contact-name").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-room-id"),r=n.getAttribute("data-contact-name");s&&(os(s),await Im(s,r),bo(s,{forceInitiator:!0}).catch(i=>{console.warn("Failed to call contact:",i),$t()}))}}),t.querySelectorAll(".contact-delete-btn").forEach(n=>{n.onclick=async()=>{const s=n.getAttribute("data-contact-id");!s||!window.confirm("Delete this contact?")||(await PP(s),await fr(e))}})}function Rm(t,e){if(!Q()){alert("Please sign in to send messages");return}if(Js.getSession(t)){rt.isMessagesUIOpen()||rt.toggleMessages();return}Js.getAllSessions().forEach(o=>{o.close()}),rt.clearMessages(),rt.setSession(null);const r=Js.openSession(t,{onMessage:(o,a,c)=>{c?rt.appendChatMessage(`You: ${o}`):rt.receiveMessage(o)}});r.contactName=e,r.toggle=Mn.get(t),rt.setSession(r),rt.showMessagesToggle(),rt.toggleMessages(),r.markAsRead().catch(o=>{console.warn("Failed to mark messages as read:",o)});const i=Mn.get(t);i&&i.clearBadge()}function RP(t){Xo.forEach(({ref:e,callback:n})=>{_t(e,"value",n)}),Xo.clear(),Q()&&t.forEach(e=>{const n=N(D,`users/${e}/presence`),s=document.querySelector(`.presence-indicator[data-contact-id="${e}"]`);if(!s)return;const r=i=>{const a=i.val()?.state==="online";s.style.backgroundColor=a?"#00d26a":"#444",s.title=a?"Online":"Offline"};el(n,r),Xo.set(e,{ref:n,callback:r})})}let Os=!1,Nn=null;async function AP(t,e,n){if(!Q())return;const s=10;let r=0;for(;Os&&r<s;)await new Promise(i=>setTimeout(i,100)),r++;if(Os){console.debug("[CONTACTS] Toggle replacement still in progress after waiting, skipping");return}Os=!0,Nn&&clearTimeout(Nn),Nn=setTimeout(()=>{console.warn("[CONTACTS] Toggle replacement timeout - forcing flag reset"),Os=!1},5e3);try{Mn.forEach(o=>{o.cleanup()}),Mn.clear(),Qo.forEach(o=>{o()}),Qo.clear();const i=Q();for(const o of e){const a=n[o],c=t.querySelector(`.contact-msg-toggle-container[data-contact-id="${o}"]`);if(!c){console.warn(`[CONTACTS] No toggle container found for contact ${o}`);continue}const l=km({parent:c,onToggle:()=>Rm(o,a.contactName),icon:"💬",initialUnreadCount:0});if(!l){console.error(`[CONTACTS] Failed to create toggle for contact ${o}`);continue}Mn.set(o,l);const u=Js.listenToUnreadCount(o,d=>{l.setUnreadCount(d)});Qo.set(o,u)}Promise.all(e.map(o=>Js.getUnreadCount(o).then(a=>{const c=Mn.get(o);c&&c.setUnreadCount(a)}).catch(a=>console.warn(`[CONTACTS] Failed to get unread count for ${o}:`,a))))}finally{Nn&&(clearTimeout(Nn),Nn=null),Os=!1}}async function PP(t){const e=Q();if(e){try{await bn(N(D,`users/${e}/contacts/${t}`))}catch(n){console.warn("Failed to delete contact from RTDB",n)}return}try{const n=localStorage.getItem("contacts")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("contacts",JSON.stringify(s)))}catch(n){console.warn("Failed to delete contact from localStorage",n)}}function NP(){const t=document.querySelector("link[rel~='icon']");return t?t.href:"/favicon.ico"}class LP{constructor(){this.originalTitle=document.title,this.originalFavicon=NP(),this.titleFlashInterval=null,this.isFlashing=!1,this.wakeLock=null,this.setupVisibilityListener()}setupVisibilityListener(){document.addEventListener("visibilitychange",()=>{!document.hidden&&this.isFlashing&&this.stopTitleFlashing()})}startCallIndicators(e){console.log(`[VisibilityManager] Starting call indicators for: ${e}`),this.startTitleFlashing(e),this.setFavicon("/icons/phone-ringing.svg"),this.setBadge(1),this.requestWakeLock()}stopCallIndicators(){console.log("[VisibilityManager] Stopping call indicators"),this.stopTitleFlashing(),this.restoreFavicon(),this.clearBadge(),this.releaseWakeLock()}startTitleFlashing(e){this.stopTitleFlashing();let n=!0;this.isFlashing=!0,document.title=`📞 Call from ${e}!`,this.titleFlashInterval=setInterval(()=>{this.isFlashing&&(document.title=n?`📞 Call from ${e}!`:this.originalTitle,n=!n)},1e3)}stopTitleFlashing(){this.titleFlashInterval&&(clearInterval(this.titleFlashInterval),this.titleFlashInterval=null),this.isFlashing=!1,document.title=this.originalTitle}setFavicon(e){const n=document.querySelector("link[rel~='icon']");n&&(n.href=e,console.log(`[VisibilityManager] Favicon changed to: ${e}`))}restoreFavicon(){this.setFavicon(this.originalFavicon)}setBadge(e){"setAppBadge"in navigator&&navigator.setAppBadge(e).then(()=>{console.log(`[VisibilityManager] Badge set to: ${e}`)}).catch(n=>{console.warn("[VisibilityManager] Badge not supported:",n)})}clearBadge(){"clearAppBadge"in navigator&&navigator.clearAppBadge().then(()=>{console.log("[VisibilityManager] Badge cleared")}).catch(e=>{console.warn("[VisibilityManager] Badge clear failed:",e)})}async requestWakeLock(){if("wakeLock"in navigator)try{this.wakeLock=await navigator.wakeLock.request("screen"),console.log("[VisibilityManager] Wake lock active"),this.wakeLock.addEventListener("release",()=>{console.log("[VisibilityManager] Wake lock released"),this.wakeLock=null},{once:!0})}catch(e){console.warn("[VisibilityManager] Wake lock failed:",e)}}releaseWakeLock(){if(this.wakeLock){const e=this.wakeLock;this.wakeLock=null,e.release().then(()=>{console.log("[VisibilityManager] Wake lock released manually")}).catch(n=>{console.warn("[VisibilityManager] Wake lock release failed:",n)})}}}const hh=new LP,pr=new WeakMap;function Ul(t,e,n){if(!t||!n)throw new Error("setupIceCandidates: pc and roomId are required");if(pr.has(t)||pr.set(t,[]),e==="initiator")fh(t,"offerCandidates",n),ph(t,"answerCandidates",n);else if(e==="joiner")fh(t,"answerCandidates",n),ph(t,"offerCandidates",n);else throw new Error(`Invalid role: ${e} specified for ICE candidate setup.`)}function fh(t,e,n){t.onicecandidate=s=>{if(s.candidate){const r=Ii(e==="offerCandidates"?gg(n):mg(n));Ae(r,s.candidate.toJSON())}}}function ph(t,e,n){const s=e==="offerCandidates"?gg(n):mg(n);let r=!1;const i=()=>{if(r)return;r=!0;const a=()=>{t.remoteDescription&&($l(t),t.removeEventListener("signalingstatechange",a))};t.addEventListener("signalingstatechange",a)};rn(s,"child_added",a=>{const c=a.val();if(!(!t||t.signalingState==="closed")&&c)if(t.remoteDescription)try{t.addIceCandidate(new RTCIceCandidate(c))}catch{}else{const l=pr.get(t);l&&(l.push(c),l.length===1&&i())}},n)}function $l(t){if(!t||!pr.has(t))return;const e=pr.get(t);if(e.length!==0){H(`🔄 Draining ${e.length} queued ICE candidate(s)`);for(const n of e)try{t.addIceCandidate(new RTCIceCandidate(n)).catch(s=>{H("Error adding queued ICE candidate:",s)})}catch{}e.length=0}}const OP=Object.freeze(Object.defineProperty({__proto__:null,drainIceCandidateQueue:$l,setupIceCandidates:Ul},Symbol.toStringTag,{value:"Module"}));let Je=null,gh=null;function Am(t){gh=t,t.onconnectionstatechange=()=>{H("onconnectionstatechange:",t.connectionState),t.connectionState==="connected"?(Dl(),xl().catch(e=>console.warn("Failed to clear calling state on connect:",e)),Je&&(clearTimeout(Je),Je=null)):t.connectionState==="disconnected"?(Je&&clearTimeout(Je),Je=setTimeout(()=>{t===gh&&t.connectionState==="disconnected"&&ue.cleanupCall({reason:"connection_lost"}),Je=null},3e3)):t.connectionState==="failed"&&(_o(),Je&&(clearTimeout(Je),Je=null),ue.cleanupCall({reason:"connection_failed"}))},t.addEventListener("iceconnectionstatechange",e=>{H("ICE iceconnectionstatechange:",t.iceConnectionState),t.iceConnectionState==="failed"&&(console.warn("ICE connection failed, restarting ICE..."),t.restartIce())})}const Bl={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},Zo=new WeakMap;function Pm(t,e,n){Zo.has(t)||Zo.set(t,{});const s=Zo.get(t),r=e==="offer"?"lastOffer":"lastAnswer";return s[r]===n?!0:(s[r]=n,!1)}function Nm(t,e){return t?e==="offer"?t.signalingState==="stable":t.signalingState==="have-local-offer"||t.signalingState==="stable":!1}function Hl(t,e){e.getTracks().forEach(n=>{t.addTrack(n,e)})}async function Lm(t){const e=await t.createOffer();return await t.setLocalDescription(e),e}async function Om(t){const e=await t.createAnswer();return await t.setLocalDescription(e),e}async function Dm(t,e,n){if(Pm(t,e.type,e.sdp))return console.debug(`Ignoring duplicate ${e.type} - already processed`),!1;if(!Nm(t,e.type))return console.warn(`Ignoring ${e.type} - unexpected signaling state:`,t.signalingState),!1;try{return await t.setRemoteDescription(new RTCSessionDescription(e)),n(t),console.debug(`Remote description set (${e.type})`),!0}catch(s){return console.error(`Failed to set remote description (${e.type}):`,s),!1}}function Mm(){return Math.random().toString(36).substring(2,9)}const DP=Object.freeze(Object.defineProperty({__proto__:null,addLocalTracks:Hl,createAnswer:Om,createOffer:Lm,generateRoomId:Mm,isDuplicateSdp:Pm,isValidSignalingState:Nm,rtcConfig:Bl,setRemoteDescription:Dm},Symbol.toStringTag,{value:"Module"}));async function MP({localStream:t,remoteVideoEl:e,mutePartnerBtn:n,setupRemoteStream:s,setupWatchSync:r,targetRoomId:i=null}){if(!t)return{success:!1};const o=new RTCPeerConnection(Bl),a="initiator",c=i||Mm(),l=fe();Hl(o,t);const u=null,d=null;if(!s(o,e,n))return console.error("Error setting up remote stream"),o.close(),{success:!1};Ul(o,a,c),Am(o);const f=await Lm(o);await X.createNewRoom(f,l,c),r(c,a,l);const p=`${window.location.origin}${window.location.pathname}?room=${c}`;return{success:!0,pc:o,roomId:c,roomLink:p,dataChannel:u,messagesUI:d,role:a}}async function xP({roomId:t,localStream:e,remoteVideoEl:n,mutePartnerBtn:s,setupRemoteStream:r,setupWatchSync:i,onMessagesUIReady:o=null}){if(!e)return{success:!1};if(!t)return{success:!1};const a=await X.checkRoomStatus(t);if(!a.exists)return{success:!1};if(!a.hasMembers)return{success:!1};let c;try{c=await X.getRoomData(t)}catch(T){return H("Error: "+T.message),{success:!1}}const l=c.offer;if(!l)return{success:!1};const u=new RTCPeerConnection(Bl),d="joiner",h=fe();Hl(u,e);const f=null,p=null;if(!r(u,n,s))return console.error("Error setting up remote stream for joiner"),u.close(),{success:!1};Ul(u,d,t),Am(u),await Dm(u,l,$l);const m=await Om(u);try{await X.saveAnswer(t,m)}catch(T){return console.error("Failed to save answer to Firebase:",T),u.close(),{success:!1}}return i(t,d,h),await X.joinRoom(t,h),{success:!0,pc:u,roomId:t,dataChannel:f,messagesUI:p,role:d}}class FP{constructor(){this.listeners=new Map}on(e,n){this.listeners.has(e)||this.listeners.set(e,new Set),this.listeners.get(e).add(n)}off(e,n){this.listeners.has(e)&&this.listeners.get(e).delete(n)}emit(e,n){if(this.listeners.has(e))for(const s of Array.from(this.listeners.get(e)))try{s(n)}catch(r){console.warn("CallController listener error",r)}}}class UP{constructor(){this.emitter=new FP,this.resetState()}resetState(){this.state="idle",this.roomId=null,this.roomLink=null,this.role=null,this.partnerId=null,this.pc=null,this.dataChannel=null,this.messagesUI=null,this.localVideoEl=null,this.remoteVideoEl=null,this.isHangingUp=!1,this.isCleaningUp=!1,this.listeners=new Map}getState(){return{state:this.state,roomId:this.roomId,roomLink:this.roomLink,role:this.role,partnerId:this.partnerId,hasPc:!!this.pc,isHangingUp:this.isHangingUp,isCleaningUp:this.isCleaningUp}}on(e,n){this.emitter.on(e,n)}off(e,n){this.emitter.off(e,n)}setPartnerId(e){this.partnerId=e}setupCancellationListener(e){if(!e)return;const n=N(D,`rooms/${e}/cancellation`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s){s=!0;try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(a){console.warn("Failed to clear remote video after cancellation",a)}try{this.pc&&this.pc.close()}catch{}try{await this.cleanupCall({reason:o.reason||"remote_cancelled"})}catch(a){console.warn("Failed to trigger CallController cleanup",a)}}};Jr(n,r,e),this.listeners.has("cancellation")||this.listeners.set("cancellation",[]),this.listeners.get("cancellation").push({ref:n,callback:r,roomId:e})}setupAnswerListener(e,n,s){if(!e||!n)return;const r=N(D,`rooms/${e}/answer`),i=async o=>{const a=o.val();if(a){const{setRemoteDescription:c}=await Xe(async()=>{const{setRemoteDescription:l}=await Promise.resolve().then(()=>DP);return{setRemoteDescription:l}},void 0);await c(n,a,s)}};Jr(r,i,e),this.listeners.has("answer")||this.listeners.set("answer",[]),this.listeners.get("answer").push({ref:r,callback:i,roomId:e})}setupRejectionListener(e){if(!e)return;const n=N(D,`rooms/${e}/rejection`);let s=!1;const r=async i=>{const o=i.val();if(o&&!s&&(s=!0,this.pc?.connectionState!=="connected")){try{const{onCallRejected:a}=await Xe(async()=>{const{onCallRejected:c}=await Promise.resolve().then(()=>gP);return{onCallRejected:c}},void 0);await a(o.reason||"user_rejected")}catch{}try{await X.leaveRoom(fe(),e)}catch{}try{this.pc&&this.pc.close()}catch{}}};Jr(n,r,e),this.listeners.has("rejection")||this.listeners.set("rejection",[]),this.listeners.get("rejection").push({ref:n,callback:r,roomId:e})}setupMemberJoinedListener(e){if(!e)return;const n=fe(),s=r=>{r.key!==n&&(this.setPartnerId(r.key),this.emitter.emit("memberJoined",{memberId:r.key,roomId:e}))};X.onMemberJoined(e,s),this.listeners.has("member-joined")||this.listeners.set("member-joined",[]),this.listeners.get("member-joined").push({callback:s,roomId:e})}setupMemberLeftListener(e){if(!e)return;const n=fe(),s=r=>{r.key!==n&&this.pc?.connectionState==="connected"&&this.emitter.emit("memberLeft",{memberId:r.key,roomId:e})};X.onMemberLeft(e,s),this.listeners.has("member-left")||this.listeners.set("member-left",[]),this.listeners.get("member-left").push({callback:s,roomId:e})}removeTrackedListeners(){try{for(const[e,n]of this.listeners.entries())for(const s of n)try{s.ref&&_t(s.ref,"value",s.callback)}catch(r){console.warn(`Failed to remove ${e} listener`,r)}}catch(e){console.warn("Failed to remove tracked listeners",e)}finally{this.listeners.clear()}if(this.roomId)try{fo(this.roomId)}catch(e){console.warn("Failed to remove RTDB listeners for room",e)}}async createCall(e={}){this.state="creating";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const n=await MP(e);if(!n||!n.success)return this.state="idle",this.emitter.emit("error",{phase:"createCall",detail:n}),this.emitCallFailed("createCall",n),n;this.pc=n.pc,this.roomId=n.roomId,this.roomLink=n.roomLink||null,this.role=n.role||"initiator",this.dataChannel=n.dataChannel||null,this.messagesUI=n.messagesUI||null,this.state="waiting";const{drainIceCandidateQueue:s}=await Xe(async()=>{const{drainIceCandidateQueue:r}=await Promise.resolve().then(()=>OP);return{drainIceCandidateQueue:r}},void 0);return this.setupAnswerListener(this.roomId,this.pc,s),this.setupCancellationListener(this.roomId),this.setupRejectionListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("created",{roomId:this.roomId,roomLink:this.roomLink,role:this.role}),n}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"createCall",error:n}),this.emitCallFailed("createCall",n),n}}async answerCall(e={}){this.state="joining";try{e.localVideoEl&&(this.localVideoEl=e.localVideoEl),e.remoteVideoEl&&(this.remoteVideoEl=e.remoteVideoEl);const s=await xP({...e,onMessagesUIReady:r=>{this.messagesUI=r}});return!s||!s.success?(this.state="idle",this.emitter.emit("error",{phase:"answerCall",detail:s}),this.emitCallFailed("answerCall",s),s):(this.pc=s.pc,this.roomId=s.roomId,this.role=s.role||"joiner",this.dataChannel=s.dataChannel||null,!this.messagesUI&&s.messagesUI&&(this.messagesUI=s.messagesUI),this.state="connected",this.setupCancellationListener(this.roomId),this.setupMemberJoinedListener(this.roomId),this.setupMemberLeftListener(this.roomId),this.emitter.emit("answered",{roomId:this.roomId,role:this.role}),s)}catch(n){throw this.state="idle",this.emitter.emit("error",{phase:"answerCall",error:n}),this.emitCallFailed("answerCall",n),n}}async hangUp({emitCancel:e=!0,reason:n="user_hung_up"}={}){if(!this.isHangingUp){this.isHangingUp=!0;try{if(e&&this.roomId)try{await X.cancelCall(this.roomId,fe(),n)}catch(s){console.warn("CallController: cancelCall failed (non-fatal)",s)}await this.cleanupCall({reason:n}),this.emitter.emit("hangup",{roomId:this.roomId,reason:n})}catch(s){throw this.emitter.emit("error",{phase:"hangUp",error:s}),s}finally{this.isHangingUp=!1}}}isRemoteHangup(e){return e?["remote","cancelled","partner_disconnected","connection_failed"].some(s=>e.includes(s)):!1}emitCallFailed(e,n){this.emitter.emit("callFailed",{phase:e,error:n?.message||n?.error||n||"Unknown error"})}async cleanupCall({reason:e}={}){if(!this.isCleaningUp){this.isCleaningUp=!0;try{const n=this.roomId,s=this.partnerId;this.removeTrackedListeners();try{await X.leaveRoom(fe(),this.roomId)}catch{}try{if(this.pc){try{this.pc.close()}catch{}this.pc=null}}catch{}try{this.remoteVideoEl&&(this.remoteVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear remote video",r)}try{this.localVideoEl&&(this.localVideoEl.srcObject=null)}catch(r){console.warn("CallController: failed to clear local video",r)}try{const{cleanupLocalStream:r}=await Xe(async()=>{const{cleanupLocalStream:i}=await Promise.resolve().then(()=>cP);return{cleanupLocalStream:i}},void 0);r()}catch(r){console.warn("CallController: failed to cleanup local stream",r)}try{const{resetLocalStreamInitFlag:r}=await Xe(async()=>{const{resetLocalStreamInitFlag:i}=await Promise.resolve().then(()=>wN);return{resetLocalStreamInitFlag:i}},void 0);r()}catch{}if(this.isRemoteHangup(e)&&this.emitter.emit("remoteHangup",{roomId:n,partnerId:s,reason:e}),this.messagesUI&&this.messagesUI.cleanup)try{this.messagesUI.cleanup()}catch(r){console.warn("CallController: failed to cleanup messages UI",r)}this.resetState(),this.emitter.emit("cleanup",{roomId:n,partnerId:s,reason:e})}catch(n){throw this.emitter.emit("error",{phase:"cleanupCall",error:n}),n}finally{this.isCleaningUp=!1}}}}const ue=new UP,Xa={default:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0},withVoiceIsolationIfSupported:{echoCancellation:!0,noiseSuppression:!0,autoGainControl:!0,voiceIsolation:!0,restrictOwnAudio:!0,googHighpassFilter:!0,googTypingNoiseDetection:!0,highpassFilter:!0,typingNoiseDetection:!0}};function xm(){const t=navigator.mediaDevices.getSupportedConstraints();return["voiceIsolation","highpassFilter","typingNoiseDetection"].every(s=>t[s])?Xa.withVoiceIsolationIfSupported:Xa.default}const $P=()=>Xa.default,BP={desktop:{landscape:{width:{ideal:1920},height:{ideal:1080},frameRate:{min:10,ideal:30},aspectRatio:{ideal:16/9}},portrait:{width:{ideal:1080},height:{ideal:1920},frameRate:{min:10,ideal:30},aspectRatio:{ideal:9/16}}},mobile:{portrait:{width:{ideal:1080},height:{ideal:1920},aspectRatio:{ideal:9/16},frameRate:{ideal:30}},landscape:{width:{ideal:1920},height:{ideal:1080},aspectRatio:{ideal:16/9},frameRate:{ideal:30}}}},HP=()=>window.screen?.orientation?.type?.includes("portrait")||window.orientation===0||window.orientation===180;function Wl(t){const e=HP()?"portrait":"landscape",s=/Mobi|Android/i.test(navigator.userAgent)?"mobile":"desktop",r=BP[s][e];return{facingMode:t,...r}}function WP(){return!!(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices)}async function VP(){return WP()?(await navigator.mediaDevices.enumerateDevices()).filter(e=>e.kind==="videoinput"):[]}async function jP(){const t=await VP();let e=!1,n=!1;return t.forEach(s=>{const r=s.label.toLowerCase();(r.includes("front")||r.includes("user"))&&(e=!0),(r.includes("back")||r.includes("rear")||r.includes("environment"))&&(n=!0)}),e&&n}async function zP({localStream:t,localVideo:e,currentFacingMode:n,peerConnection:s=null}){if(!t||!e)return console.error("switchCamera: missing localStream or localVideo"),null;const r=n==="user"?"environment":"user";try{const i=await navigator.mediaDevices.getUserMedia({video:Wl(r),audio:xm()}),o=i.getVideoTracks()[0],a=i.getAudioTracks()[0],c=t.getVideoTracks()[0],l=c?c.enabled:!0,u=t.getAudioTracks()[0],d=u?!u.enabled:!1;if(o&&(o.enabled=l),a&&(a.enabled=!d),t.getTracks().forEach(h=>h.stop()),s){const h=s.getSenders().find(p=>p.track&&p.track.kind==="video");h&&await h.replaceTrack(o);const f=s.getSenders().find(p=>p.track&&p.track.kind==="audio");f&&a&&await f.replaceTrack(a)}return e.srcObject=new MediaStream([o].filter(Boolean)),{newStream:i,facingMode:r}}catch(i){return console.error("Failed to switch camera:",i),null}}let ea=!1,Zt=null,en=null;function GP({getLocalStream:t,getFacingMode:e}){return Zt&&en&&Zt.removeEventListener("change",en),Zt=window.matchMedia("(orientation: portrait)"),en=()=>{try{const n=typeof t=="function"?t():null,s=typeof e=="function"?e():"user";qP({localStream:n,currentFacingMode:s})}catch(n){console.error("Orientation handler failed:",n)}},Zt.addEventListener("change",en),()=>{Zt&&en&&Zt.removeEventListener("change",en),Zt=null,en=null}}async function qP({localStream:t,currentFacingMode:e}){if(!(ea||!t?.getVideoTracks()[0])){ea=!0;try{const n=t.getVideoTracks()[0],s=Wl(e);H("Applying constraints:",s),await n.applyConstraints(s),H("Video constraints updated successfully")}catch(n){console.error("Failed to apply orientation constraints:",n)}finally{ea=!1}}}let Qa=[];function YP(t,e){const n=e.querySelector("i");n.className=t?"fa fa-microphone-slash":"fa fa-microphone"}function KP({getLocalStream:t,getLocalVideo:e,getRemoteVideo:n,getPeerConnection:s=()=>null,setLocalStream:r=null,micBtn:i,cameraBtn:o,switchCameraBtn:a,mutePartnerBtn:c,fullscreenPartnerBtn:l,remotePipBtn:u}){i&&(i.onclick=()=>{const h=t();if(!h)return;const f=h.getAudioTracks()[0];f&&(f.enabled=!f.enabled,YP(!f.enabled,i))}),o&&(o.onclick=()=>{const h=t();if(!h)return;const f=h.getVideoTracks()[0];if(f){f.enabled=!f.enabled;const p=o.querySelector("i");p.className=f.enabled?"fa fa-video":"fa fa-video-slash"}});const d=GP({getLocalStream:t,getFacingMode:Ka});Qa.push(d),a&&(a.onclick=async()=>{const h=await zP({localStream:t(),localVideo:e(),currentFacingMode:Ka(),peerConnection:s()||null});h?(_m(h.facingMode),console.log("Switched camera to facingMode:",h.facingMode),h.newStream&&typeof r=="function"&&r(h.newStream)):console.error("Camera switch failed.")},(async()=>await jP()?A(a):E(a))()),c&&(c.onclick=()=>{const h=n();if(!h)return;h.muted=!h.muted;const f=c.querySelector("i");f.className=h.muted?"fa fa-volume-mute":"fa fa-volume-up"}),l&&(l.onclick=()=>{const h=n();h.requestFullscreen?h.requestFullscreen():h.webkitRequestFullscreen&&h.webkitRequestFullscreen()}),u&&(u.onclick=async()=>{const h=n();if(h)try{document.pictureInPictureElement===h?await document.exitPictureInPicture():h.requestPictureInPicture&&await h.requestPictureInPicture()}catch(f){console.error("Picture-in-Picture failed:",f)}})}function JP(){Qa.forEach(t=>t()),Qa=[]}let ta=null,At=null,z=null,$=null,mh=!1,jr=!1,Qe=[],Za="",he=-1,ec=[];const XP="AIzaSyBPUjW7ac277WIYTbN4M8dUomK39qRQjhA",QP="https://www.googleapis.com/youtube/v3";async function ZP(){if(mh||jr)return!1;jr=!0;const{initializeYouTubeElements:t}=await Xe(async()=>{const{initializeYouTubeElements:o}=await Promise.resolve().then(()=>zA);return{initializeYouTubeElements:o}},void 0),e=await t();if(ta=e.searchContainer,At=e.searchBtn,z=e.searchQuery,$=e.searchResults,!ta||!At||!z||!$)return console.error("YouTube search elements not found in DOM"),jr=!1,!1;const n=o=>/^https?:\/\//i.test(o),s=o=>{($?.querySelectorAll(".search-result-item")||[]).forEach((c,l)=>{l===o?(c.classList.add("focused"),c.scrollIntoView({block:"nearest"})):c.classList.remove("focused")}),he=o??-1};At.onclick=async()=>{const o=z.value.trim();if(Sl(z)){A(z),z.focus();return}if(!o){ti(),E(z);return}if(Eh()&&o===Za)tc(Qe);else if(!n(o))await _h(o);else{await Ya({url:o}),E($),z.value="",E(z),he=-1;return}},ta.addEventListener("keydown",async o=>{const a=$.querySelectorAll(".search-result-item");if(a.length>0&&(o.key==="ArrowDown"||o.key==="ArrowUp")){if(o.key==="ArrowDown"){let c=he+1;c>=a.length&&(c=0),s(c)}else if(o.key==="ArrowUp"){let c=he-1;c<0&&(c=he===-1?0:a.length-1),s(c)}return}if(o.key==="Enter"){if(a.length>0&&he>=0){a[he].click(),E(z),E($),he=-1;return}const c=z.value.trim();if(c)if(Eh()&&c===Za)tc(Qe);else if(!n(c))await _h(c);else{await Ya({url:c}),E($),he=-1,z.value="",E(z);return}}else o.key==="Escape"&&(tN()?ti():z.value?z.value="":E(z))}),z.addEventListener("input",()=>{z.value.trim()===""&&ti(),he=-1});const r=$i(z,()=>E(z),{ignore:[At],esc:!1});ec.push(r);const i=$i($,()=>E($),{ignore:[At],esc:!1});return ec.push(i),jr=!1,mh=!0,!0}async function _h(t){if(!At||!$){console.error("Search elements not initialized");return}Qe=[],Za=t,At.disabled=!0,$.innerHTML='<div class="search-loading">Searching YouTube...</div>',A($);try{const e=await fetch(`${QP}/search?part=snippet&maxResults=10&q=${encodeURIComponent(t)}&type=video&key=${XP}`);if(!e.ok)throw e.status===403?new Error("YouTube API quota exceeded. Please try again later."):e.status===400?new Error("Invalid API key or request."):new Error(`YouTube API error: ${e.status}`);const n=await e.json();if(!n.items||n.items.length===0){yh("No videos found"),Qe=[];return}Qe=n.items.map(s=>({id:s.id.videoId,title:s.snippet.title,thumbnail:s.snippet.thumbnails.medium.url,channel:s.snippet.channelTitle,url:`https://www.youtube.com/watch?v=${s.id.videoId}`})),tc(Qe)}catch(e){console.error("YouTube search failed:",e),yh(e.message||"Search failed. Please try again.")}finally{At.disabled=!1}}function tc(t){if(!$){console.error("Search results element not initialized");return}if(!t||t.length===0){$.innerHTML='<div class="search-no-results">No results found</div>',Qe=[],he=-1;return}$.innerHTML="",t.forEach(n=>{const s=document.createElement("div");s.className="search-result-item",s.innerHTML=`
      <img src="${n.thumbnail}" alt="${n.title}" class="result-thumbnail">
      <div class="search-result-info">
        <div class="search-result-title">${n.title}</div>
        <div class="search-result-channel">${n.channel}</div>
      </div>
    `,s.onclick=async()=>{if(await Ya(n),E($),he=-1,!z){console.error("Search query element not initialized");return}z.value="",E(z)},$.appendChild(s)}),A($),he=0,$.querySelectorAll(".search-result-item").forEach((n,s)=>{s===he?(n.classList.add("focused"),n.scrollIntoView({block:"nearest"})):n.classList.remove("focused")})}function yh(t){if(Qe=[],he=-1,!$){console.error("Search results element not initialized");return}$.innerHTML=`<div class="search-error">${t}</div>`,A($)}function ti(){Qe=[],he=-1,$&&($.innerHTML="",E($))}function eN(){ti(),ec.forEach(t=>t())}function tN(){return!Sl($)}function Eh(){return Qe.length>0}function nN({parent:t,manager:e=null,onClick:n=null,hideWhenAllRead:s=!1}={}){let r=e;const i=wl({initialProps:{unreadCount:0,isHidden:!0},template:`
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
    `,handlers:{handleClick:()=>{n?n():r&&r.toggleList()}},className:"notifications-toggle-container",parent:t});let o=i.querySelector(".notification-badge");return o&&(o.style.display="none"),i.onPropUpdated("unreadCount",a=>{const c=i.querySelector(".notification-badge");c&&(c.style.display=a>0?"flex":"none")}),i.show=()=>{i.isHidden=!1,i.style.display="block"},i.hide=()=>{i.isHidden=!0,i.style.display="none"},i.setUnread=a=>{i.unreadCount=a,a>0?i.show():s&&i.hide()},i.setManager=a=>{r=a},i.hide(),i}class sN{constructor(){this.notifications=new Map,this.toggle=null,this.container=null,this.clickOutsideCleanup=null}setToggle(e){this.toggle=e,this.toggle.setManager&&this.toggle.setManager(this),this.createContainer(),this.updateToggle()}createContainer(){this.container||(this.container=document.createElement("div"),this.container.className="notifications-list-container",this.container.style.display="none",document.body.appendChild(this.container))}showList(){this.container&&(this.container.style.display="flex",this.setupClickOutside())}hideList(){this.container&&(this.container.style.display="none",this.cleanupClickOutside())}setupClickOutside(){this.clickOutsideCleanup||(this.clickOutsideCleanup=$i(this.container,()=>this.hideList(),{ignore:this.toggle?[this.toggle]:[],esc:!0}))}cleanupClickOutside(){this.clickOutsideCleanup&&(this.clickOutsideCleanup(),this.clickOutsideCleanup=null)}toggleList(){this.container&&(this.container.style.display==="none"?this.showList():this.hideList())}isListVisible(){return this.container&&this.container.style.display!=="none"}add(e,n){this.notifications.has(e)&&this.remove(e),this.container||this.createContainer(),n.parentElement===document.body&&n.remove(),this.container.prepend(n),this.notifications.set(e,n),this.updateToggle(),n._originalDispose||(n._originalDispose=n.dispose);const s=n._originalDispose;n.dispose=()=>{s&&s.call(n),n.parentElement&&n.remove(),this.notifications.delete(e),this.updateToggle(),n.dispose=s,delete n._originalDispose}}remove(e){const n=this.notifications.get(e);n&&(n.dispose&&n.dispose(),this.notifications.delete(e),this.updateToggle())}getCount(){return this.notifications.size}has(e){return this.notifications.has(e)}clear(){this.notifications.forEach(e=>{e.dispose&&e.dispose()}),this.notifications.clear(),this.updateToggle()}updateToggle(){this.toggle&&this.toggle.setUnread(this.getCount())}}const rN=new sN;const iN=async()=>{if(vm())return console.debug("Reusing existing local MediaStream."),wo();const t=Wl("user"),e=xm();try{const n=await navigator.mediaDevices.getUserMedia({video:t,audio:e});return xi(n),n}catch(n){if(n.name==="OverconstrainedError"){console.warn(`❌ Constraint failed on property: ${n.constraint}, falling back to basic constraints`);const s=$P(),r=await navigator.mediaDevices.getUserMedia({video:!0,audio:s});return xi(r),r}throw n}};async function oN(t){const e=await iN(),n=new MediaStream(e.getVideoTracks());return t.srcObject=n,!0}function aN(t,e,n){return t.ontrack=s=>{H(`REMOTE TRACK RECEIVED: ${s.track.kind}`);const r=vo()?Ol():null;let i;s.streams&&s.streams[0]&&s.streams[0]instanceof MediaStream?i=s.streams[0]:(console.warn("No stream in track event, using fallback track handling"),r?(r.addTrack(s.track),i=r):i=new MediaStream([s.track])),ym(i),e.srcObject=i,r!==i||H(`Added ${s.track.kind} track to existing remote stream`);try{const o=document.getElementById("remote-video-box")||e.parentElement;o&&(o.classList?.remove("hidden"),e.classList?.remove("hidden"),o.style.visibility="visible",o.style.opacity="1",o.style.position="",o.style.left="",o.style.top="",e.style.visibility="visible",e.style.opacity="1")}catch(o){console.warn("Visibility override failed:",o)}},!0}let vh=!1;function cN(t,e){const n=document.createElement("dialog");n.className="copy-link-dialog";const s=document.createElement("div");s.className="copy-link-dialog__content";const r=document.createElement("h2");r.className="copy-link-dialog__title",r.textContent=e.title,s.appendChild(r);const i=document.createElement("div");i.className="copy-link-dialog__input-container";const o=document.createElement("input");o.type="text",o.className="copy-link-dialog__input",o.value=t,o.readOnly=!0,o.setAttribute("aria-label","Link to copy"),i.appendChild(o),s.appendChild(i);const a=document.createElement("div");a.className="copy-link-dialog__buttons";const c=document.createElement("button");c.className="copy-link-dialog__button copy-link-dialog__button--primary",c.textContent=e.buttonText,c.autofocus=!0;const l=document.createElement("button");l.className="copy-link-dialog__button copy-link-dialog__button--secondary",l.textContent=e.cancelText,a.appendChild(c),a.appendChild(l),s.appendChild(a);const u=document.createElement("p");return u.className="copy-link-dialog__feedback",u.setAttribute("aria-live","polite"),s.appendChild(u),n.appendChild(s),{dialog:n,input:o,copyButton:c,cancelButton:l,feedback:u}}function lN(t,e={}){const n={title:"Share this link",buttonText:"Copy",cancelText:"Cancel",successMessage:"✓ Copied to clipboard!",errorMessage:"Failed to copy. Click the link to select it manually.",autoClose:!0,autoCloseDelay:1200,onCopy:null,onError:null,onCancel:null,onClose:null,...e};uN();const{dialog:s,input:r,copyButton:i,cancelButton:o,feedback:a}=cN(t,n);dN(s);let c=!1;const l=async()=>{await hN(t,r)?(c=!0,a.textContent=n.successMessage,a.classList.remove("copy-link-dialog__feedback--error"),n.onCopy&&n.onCopy(t),n.autoClose&&setTimeout(()=>{s.close()},n.autoCloseDelay)):(a.textContent=n.errorMessage,a.classList.add("copy-link-dialog__feedback--error"),r.readOnly=!1,r.addEventListener("click",()=>{r.select()}),n.onError&&n.onError())};return i.addEventListener("click",l),o.addEventListener("click",()=>{n.onCancel&&n.onCancel(),s.close()}),s.addEventListener("keydown",u=>{u.key==="Enter"&&!u.shiftKey&&!u.ctrlKey&&!u.altKey&&!u.metaKey&&(u.preventDefault(),l())}),s.addEventListener("close",()=>{!c&&n.onCancel&&n.onCancel(),n.onClose&&n.onClose(),setTimeout(()=>{s.remove()},300)}),document.body.appendChild(s),s.showModal(),s}function uN(){if(vh)return;const t=document.createElement("style");t.textContent=`
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
  `,document.head.appendChild(t),vh=!0}function dN(t){t.showModal||(t.showModal=function(){this.setAttribute("open",""),this.style.display="block",this.style.position="fixed",this.style.top="50%",this.style.left="50%",this.style.transform="translate(-50%, -50%)";const e=getComputedStyle(document.documentElement).getPropertyValue("--z-ui-overlay").trim();this.style.zIndex=e||"1000"},t.close=function(){this.removeAttribute("open"),this.style.display="none"})}async function hN(t,e=null){if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(t),!0}catch(n){return console.warn("Clipboard API failed, using fallback:",n),!1}if(!e)return!1;try{return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")}catch(n){return console.error("Fallback copy failed:",n),!1}}function fN(){const t=window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,e=/iphone|ipad|ipod/i.test(navigator.userAgent||"");if(!t||!e||!window.location.hostname.includes("github.io"))return;const s="https://vidu-aae11.web.app",r=s.replace(/\/$/,"");let i;try{i=new URL(r).hostname}catch(l){console.error("[PWA Redirect] Invalid VITE_APP_HOSTING_URL:",s,l);return}if(window.location.hostname===i)return;const o="/HangVidU/";let a=window.location.pathname;a.startsWith(o)?a="/"+a.slice(o.length):a==="/HangVidU"&&(a="/");let c;try{c=new URL(a+window.location.search+window.location.hash,r).toString()}catch(l){console.error("[PWA Redirect] Failed to construct target URL:",l);return}console.log("[PWA Redirect] iOS standalone PWA on gh-pages → redirecting to Firebase Hosting:",c),window.location.replace(c)}mA(!0);_().disable();let Vl=[];async function pN(){gN();const t=am(),n=["localVideoEl","remoteVideoEl","localBoxEl","remoteBoxEl","chatControls","lobbyDiv","titleAuthBar"].filter(s=>!t[s]);if(n.length>0)return console.error("Critical elements missing:",n),!1;try{{const{setupPWA:i}=await Xe(async()=>{const{setupPWA:o}=await import("./PWA-CQl1uHFR.js");return{setupPWA:o}},[]);await i()}ZP(),yN(),await em;const s=VA(yo);s&&Vl.push(s.dispose);const r=document.querySelector(".top-right-menu");if(r){const i=nN({parent:r,hideWhenAllRead:!0});rN.setToggle(i)}return!0}catch(s){return console.error("Initialization error:",s),!1}}let nc=!1;function Fm(){nc=!1}async function ni(){nc||(nc=!0,await oN(Te),KP({getLocalStream:wo,getLocalVideo:()=>Te,getRemoteVideo:()=>te,getPeerConnection:()=>ue.getState().pc,setLocalStream:xi,micBtn:Ss,cameraBtn:Cs,switchCameraBtn:bs,mutePartnerBtn:Ye,fullscreenPartnerBtn:Eo,remotePipBtn:qt}),Te&&(Te.addEventListener("enterpictureinpicture",()=>ee&&E(ee)),Te.addEventListener("leavepictureinpicture",()=>{ee&&!(is()&&Ml())&&A(ee)})))}function gN(){E(G),E(ee),E(be),E(Oe)}function Um(t){(t?.name==="NotAllowedError"||t?.name==="PermissionDeniedError")&&alert('Camera/microphone access is required for video calls. Please click "Allow" when prompted, or check your browser settings.'),Fm()}function si(t=null){return{localStream:wo(),localVideoEl:Te,remoteVideoEl:te,mutePartnerBtn:Ye,setupRemoteStream:aN,setupWatchSync:XA,targetRoomId:t}}function ri(t,e=!1){return t.success?(e&&t.roomLink&&lN(t.roomLink,{onCopy:()=>H("Link ready! Share with your partner."),onCancel:()=>H("Link ready! Use the copy button to use it, or create a new one.")}),!0):!1}async function bo(t,{forceInitiator:e=!1}={}){try{await ni()}catch(i){return console.error("Failed to initialize local media stream:",i),Um(i),!1}const n=Date.now();if(e){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"force_initiator",reason:"calling_saved_contact"}),await ni();const i=await ue.createCall(si(t));return ri(i,!1)}let s=await X.checkRoomStatus(t);if(s.exists&&!s.hasMembers){let o=0;for(;o<3&&!s.hasMembers;)await new Promise(a=>setTimeout(a,250*(o+1))),s=await X.checkRoomStatus(t),o++}if(!s.exists||!s.hasMembers){_().logRoomCreation(t,!0,{creationTime:n,listenerAttachTime:n,timeDiff:0},{trigger:"room_empty_or_nonexistent",roomExists:s.exists,memberCount:s.memberCount||0}),await ni();const i=await ue.createCall(si(t));return ri(i,!0)}_().log("ROOM","JOINING_EXISTING",{roomId:t,memberCount:s.memberCount,roomExists:s.exists});const r=await ue.answerCall({roomId:t,...si()});return ri(r,!1)}const Ie=new Set,$m=new Map;function wh(t){t&&(fo(t),Ie.delete(t),$m.delete(t),_().log("LISTENER","INCOMING_CLEANUP",{roomId:t,remainingListeners:Ie.size}))}function mN(){H(`[LISTENER] Removing all incoming listeners (${Ie.size} rooms)`);const t=Array.from(Ie);t.forEach(e=>{fo(e)}),Ie.clear(),$m.clear(),_().log("LISTENER","ALL_INCOMING_CLEANUP",{roomsCleared:t.length})}async function _N(t){const e=Date.now(),n=e+1440*60*1e3,s=Q();if(s){const r=al(s,t);await Ae(r,{roomId:t,savedAt:e,expiresAt:n});return}try{const r=localStorage.getItem("recentCalls")||"{}",i=JSON.parse(r);i[t]={roomId:t,savedAt:e,expiresAt:n},localStorage.setItem("recentCalls",JSON.stringify(i))}catch(r){console.warn("Failed to save recent call to localStorage",r)}}async function na(t){const e=Q();if(e){try{await bn(al(e,t))}catch(n){console.warn("Failed to remove recent call from RTDB",n)}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n);s[t]&&(delete s[t],localStorage.setItem("recentCalls",JSON.stringify(s)))}catch(n){console.warn("Failed to remove recent call from localStorage",n)}}function os(t){t&&(Ie.has(t)&&(Ie.delete(t),fo(t)),H(`[LISTENER] Attaching listener for room: ${t} (total: ${Ie.size+1})`),Ie.add(t),_().logListenerAttachment(t,"member_join",Ie.size,{action:"incoming_call_listener_attached"}),X.onMemberJoined(t,async e=>{const n=e.key,s=e.val?e.val():null,r=fe();if(n&&n!==r){_().logMemberJoinEvent(t,n,s||{},{detectedBy:"incoming_call_listener",currentUserId:r});const i=s&&typeof s.joinedAt=="number"?s.joinedAt:null,o=2e4;let a=!1,c="none",l=0;if(i&&(l=Date.now()-i,a=l<o,c="joinedAt"),!a){const j=await Cm(n,t),w=await Tm(t);a=j||w,c=j?"outgoingState":w?"roomCreatedAt":"failed"}const u={isFresh:a,method:c,age:l,reason:a?"call_is_fresh":"call_is_stale"};if(_().logIncomingCallEvent(n,t,u,{memberData:s,joinedAt:i,CALL_FRESH_MS:o}),!a){_().logNotificationDecision("REJECT","stale_call",t,{age:l,validationMethod:c,joiningUserId:n});return}let d;try{d=await X.getRoomData(t)}catch{return}if(!d||typeof d!="object")return;const h=!!d.offer,f=!!d.answer,p=d.createdBy;if(!h||f||p===r)return;const y=ue.getState();if(!!y.pc&&y.pc.connectionState==="connected"){_().logNotificationDecision("REJECT","already_in_call",t,{joiningUserId:n,currentCallState:y.pc?.connectionState});return}_().logNotificationDecision("SHOW","fresh_call_detected",t,{joiningUserId:n,freshnessResult:u});const T=await TP(t,n);zn.playIncoming(),hh.startCallIndicators(T);let B=!1;try{B=await Fl(`Incoming call from ${T}.

Accept?`)}finally{zn.stop(),hh.stopCallIndicators()}if(B)wh(t),_().logNotificationDecision("ACCEPT","user_accepted",t,{joiningUserId:n}),bo(t).catch(j=>{console.warn("Failed to answer incoming call:",j),_().logFirebaseOperation("join_room_on_accept",!1,j,{roomId:t,joiningUserId:n})});else{_().logNotificationDecision("REJECT","user_rejected",t,{joiningUserId:n});try{await X.rejectCall(t,fe(),"user_rejected")}catch(j){console.warn("Failed to signal rejection via RTDB:",j)}await na(t).catch(j=>{console.warn("Failed to remove recent call on rejection:",j)})}}}),X.onCallCancelled(t,async e=>{if(e&&typeof e.val=="function"&&e.val()){try{const{dismissActiveConfirmDialog:s}=await Xe(async()=>{const{dismissActiveConfirmDialog:r}=await Promise.resolve().then(()=>_P);return{dismissActiveConfirmDialog:r}},void 0);typeof s=="function"&&s()}catch{}await na(t).catch(()=>{})}}),X.onMemberLeft(t,async e=>{const n=e.key,s=fe();if(!(!n||n===s))try{(await X.checkRoomStatus(t)).hasMembers||(await na(t),wh(t),H(`Removed saved recent call and listeners for room ${t} because it is now empty`))}catch(r){console.warn("Failed to evaluate room status on member leave",r)}}))}async function bh(){const t=Date.now();_().log("LISTENER","STARTUP_BEGIN",{timestamp:t,currentListenerCount:Ie.size});try{if(typeof window<"u"){const{getCurrentUserAsync:n}=await Xe(async()=>{const{getCurrentUserAsync:s}=await Promise.resolve().then(()=>PA);return{getCurrentUserAsync:s}},void 0);await n()}}catch{}const e=Q();if(_().log("LISTENER","AUTH_STATE_DETERMINED",{isLoggedIn:!!e,userId:e||"guest"}),e){const n=_k(e);try{const s=await Ze(n),r=s.exists()?s.val():null,i=new Set;if(r)for(const[o,a]of Object.entries(r)){if(!a||a.expiresAt&&a.expiresAt<Date.now()){await bn(al(e,o)).catch(()=>{});continue}i.add(o)}try{const o=await hr();Object.values(o||{}).forEach(a=>{a?.roomId&&i.add(a.roomId)})}catch{}i.forEach(o=>os(o)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"rtdb",roomsToListen:Array.from(i),totalListeners:Ie.size,duration:Date.now()-t})}catch(s){console.warn("Failed to read recent calls from RTDB",s),_().logFirebaseOperation("read_recent_calls",!1,s,{storage:"rtdb",userId:e})}return}try{const n=localStorage.getItem("recentCalls")||"{}",s=JSON.parse(n),r={},i=new Set;for(const[o,a]of Object.entries(s||{}))!a||a.expiresAt&&a.expiresAt<Date.now()||(r[o]=a,i.add(o));try{const o=await hr();Object.values(o||{}).forEach(a=>{a?.roomId&&i.add(a.roomId)})}catch{}i.forEach(o=>os(o)),localStorage.setItem("recentCalls",JSON.stringify(r)),_().log("LISTENER","STARTUP_COMPLETE",{storage:"localStorage",roomsToListen:Array.from(i),totalListeners:Ie.size,duration:Date.now()-t,expiredRoomsRemoved:Object.keys(s||{}).length-i.size})}catch(n){console.warn("Failed to read recent calls from localStorage",n),_().logFirebaseOperation("read_recent_calls",!1,n,{storage:"localStorage"})}}function sa(){return V&&be&&!be.classList.contains("hidden")&&V.src&&V.src.trim()!==""}let Sh=!1;function yN(){if(Sh)return;const t=()=>{const e=document.activeElement;return e&&(e.tagName==="INPUT"||e.tagName==="TEXTAREA"||e.isContentEditable)};document.addEventListener("keydown",e=>{t()||(e.key==="w"||e.key==="W")&&(console.log("=== W KEY PRESSED ==="),console.log("lastWatched:",on()),console.log("isYTVisible():",Ko()),console.log("isSharedVideoVisible():",sa()),console.log("isWatchModeActive():",is()),on()==="yt"?Ko()?(Di(),Ks()):(dm(),Ja()):on()==="url"&&(sa()?(E(be),Ks()):(A(be),Ja()))),e.key==="Escape"&&is()&&(on()==="yt"&&Ko()?(Nr(),Di()):on()==="url"&&sa()&&(V.pause(),E(be)),Ks())}),Sh=!0}const Bm=async()=>{try{await ni();const t=await ue.createCall(si());ri(t,!0)}catch(t){console.error("Failed to start call:",t),Um(t)}};xe.onclick=Bm;Jt.onclick=Bm;Cn&&(Cn.onclick=()=>{on()==="yt"?(Nr(),Di()):on()==="url"&&(V.pause(),E(be)),Ks()});qe.onclick=async()=>{console.debug("Hanging up..."),await ue.hangUp({emitCancel:!0,reason:"user_hung_up"})};async function EN(){const e=new URLSearchParams(window.location.search).get("room");if(!e)return!1;const n=await bo(e);return n||(_o(),Sm()),n}fN();window.onload=async()=>{if(!await pN()){xe.disabled=!0,console.error("Initialization failed. Cannot start chat.");return}await bh().catch(r=>console.warn("Failed to start saved-room listeners",r)),fr(nt).catch(r=>{console.warn("Failed to render contacts list:",r)});let e=null;const n=vl(async({isLoggedIn:r,user:i})=>{try{const o=e===null,a=e===!0&&!r,c=e===!1&&r;e=r,await fr(nt),a?(H("[AUTH] User logged out - cleaning up incoming listeners"),mN()):c?(H("[AUTH] User logged in - re-attaching incoming listeners"),await bh().catch(l=>console.warn("Failed to re-attach saved-room listeners on login",l))):o&&r&&H("[AUTH] Initial load with logged-in user")}catch(o){console.warn("Failed to handle auth change:",o)}});Vl.push(()=>{try{typeof n=="function"&&n()}catch{}}),await EN()};window.addEventListener("beforeunload",async t=>{const e=ue.getState();if(e.pc&&e.pc.connectionState==="connected")return t.preventDefault(),t.returnValue="You are in an active call. Are you sure you want to leave?",t.returnValue;await vN()});ue.on("memberJoined",({memberId:t,roomId:e})=>{console.debug("CallController memberJoined event",{memberId:t,roomId:e}),ue.setPartnerId(t),Dl(),xl().catch(n=>console.warn("Failed to clear calling state:",n)),_N(e).catch(n=>console.warn("Failed to save recent call:",n))});ue.on("memberLeft",({memberId:t})=>{console.info("Partner has left the call")});ue.on("cleanup",({roomId:t,partnerId:e,reason:n})=>{$t(),Em(),Sm(),_o();const s=ue.getState();s.messagesUI&&typeof s.messagesUI.cleanup=="function"&&(s.messagesUI.cleanup(),s.messagesUI=null),e&&t&&setTimeout(()=>{IP(e,t,nt).catch(r=>{console.warn("Failed to save contact after cleanup:",r)})},500)});async function vN(){await ue.hangUp({emitCancel:!0,reason:"page_unload"}),JP(),pk(),document.pictureInPictureElement&&document.exitPictureInPicture().catch(e=>console.error(e));const t=ue.getState();t.messagesUI&&t.messagesUI.cleanup&&t.messagesUI.cleanup(),window.history.replaceState({},document.title,window.location.pathname),V.src="",wm(),Te&&Te.srcObject&&(Te.srcObject=null),te&&te.srcObject&&(te.srcObject=null),Ks(),_o(),JA("none"),Al(),um(!1),eN(),Vl.forEach(e=>e())}const wN=Object.freeze(Object.defineProperty({__proto__:null,joinOrCreateRoomWithId:bo,listenForIncomingOnRoom:os,resetLocalStreamInitFlag:Fm},Symbol.toStringTag,{value:"Module"}));export{Xe as _,wl as c,H as d,E as h,bN as i,rN as n,A as s};
